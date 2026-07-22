// ─────────────────────────────────────────────────────────────────────────────
// IBIG DocPro — Smoke tests du module paiement/licences (CDC §20.2).
// Exécution : npx tsx scripts/smoke-tests.ts
// Auto-suffisant : crée ses données (users, plans, commandes), vérifie les
// règles absolues (idempotence, renouvellement sans perte de jours, provisoire,
// conversion, suspension, upgrade, unicité webhook, jobs cron idempotents),
// puis NETTOIE tout ce qu'il a créé. Code de sortie 1 si au moins un échec.
// ─────────────────────────────────────────────────────────────────────────────
import path from 'node:path';
import { PrismaClient } from '@prisma/client';

// Client pointé explicitement sur la base dev, pré-installé AVANT d'importer
// src/lib/db (qui réutilise le client global) pour ne pas dépendre du .env.
const dbFile = path.resolve(__dirname, '../prisma/dev.db').replace(/\\/g, '/');
const baseClient = new PrismaClient({
  datasourceUrl: `file:${dbFile}?socket_timeout=60`,
});
(globalThis as unknown as { prisma?: PrismaClient }).prisma = baseClient;

const uniq = `smoke${Date.now().toString(36)}`;
let passed = 0;
let failed = 0;

function assert(cond: boolean, label: string, detail = '') {
  if (cond) {
    passed += 1;
    console.log(`  ✅ ${label}`);
  } else {
    failed += 1;
    console.log(`  ❌ ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

function addMonths(from: Date, months: number): Date {
  const d = new Date(from);
  d.setMonth(d.getMonth() + months);
  return d;
}

async function main() {
  // Imports dynamiques APRÈS l'installation du client global (voir en-tête).
  const { prisma } = await import('../src/lib/db');
  const { activateLicenseForOrder, suspendLicense } = await import('../src/lib/license');
  const { runJob } = await import('../src/app/api/cron/jobs');

  console.log(`\n═══ SMOKE TESTS IBIG DocPro (run ${uniq}) ═══\n`);

  // ── Données de test ──
  const user1 = await prisma.user.create({
    data: { email: `${uniq}-a@test.local`, passwordHash: 'x', name: 'Smoke Test A', country: 'CI' },
  });
  const user2 = await prisma.user.create({
    data: { email: `${uniq}-b@test.local`, passwordHash: 'x', name: 'Smoke Test B', country: 'SN' },
  });
  const planA = await prisma.plan.create({
    data: {
      code: `TEST_${uniq}_A`.toUpperCase(), name: 'Plan Test A', price: 5000,
      durationType: 'months', durationValue: 1,
    },
  });
  const planB = await prisma.plan.create({
    data: {
      code: `TEST_${uniq}_B`.toUpperCase(), name: 'Plan Test B', price: 10000,
      durationType: 'months', durationValue: 1,
    },
  });
  const userIds = [user1.id, user2.id];
  const planIds = [planA.id, planB.id];
  let seq = 0;

  async function mkOrder(userId: string, planId: string, price: number, extra: Record<string, unknown> = {}) {
    seq += 1;
    const order = await prisma.order.create({
      data: {
        number: `TST-${uniq}-${seq}`, userId, planId,
        status: 'en_attente_paiement', amount: price, total: price, currency: 'XOF',
        paymentMethod: 'virement_national',
        ...extra,
      },
    });
    const txn = await prisma.transaction.create({
      data: {
        orderId: order.id, userId, provider: 'test', method: 'virement_national',
        internalRef: `TSTTX-${uniq}-${seq}`, amountExpected: price, currency: 'XOF',
        status: 'a_verifier',
      },
    });
    return { order, txn };
  }

  const countLicenses = (userId: string) => prisma.license.count({ where: { userId } });

  try {
    // ── Test 1 : commande + activation → licence active, facture cohérente ──
    console.log('Test 1 — Activation via activateLicenseForOrder');
    const { order: o1, txn: t1 } = await mkOrder(user1.id, planA.id, planA.price);
    const r1 = await activateLicenseForOrder({ orderId: o1.id, transactionId: t1.id, reason: 'test activation' });
    const o1After = await prisma.order.findUniqueOrThrow({ where: { id: o1.id } });
    assert(r1.created === true && r1.license.status === 'active', 'Licence créée et active');
    assert(o1After.status === 'payee', 'Commande passée à « payee »');
    assert(
      o1After.total === planA.price && o1After.total === o1After.amount - o1After.discount + o1After.tax,
      'Montants de facturation cohérents (total = montant − remise + taxe = prix du forfait)',
      `total=${o1After.total}`,
    );
    assert(!!r1.license.endDate, 'Date de fin calculée');

    // ── Test 2 : IDEMPOTENCE — 2e appel même commande → pas de 2e licence ──
    console.log('Test 2 — Idempotence (double activation refusée)');
    const before2 = await countLicenses(user1.id);
    const r2 = await activateLicenseForOrder({ orderId: o1.id, transactionId: t1.id, reason: 'rappel test' });
    const after2 = await countLicenses(user1.id);
    assert(r2.created === false, 'Aucune nouvelle licence créée (created=false)');
    assert(r2.license.id === r1.license.id, 'Même licence retournée');
    assert(before2 === after2 && after2 === 1, 'Nombre de licences inchangé', `avant=${before2} après=${after2}`);

    // ── Test 3 : renouvellement → prolonge depuis l'ancienne date de fin ──
    console.log('Test 3 — Renouvellement sans perte de jours');
    const oldEnd = r1.license.endDate!;
    const { order: o2, txn: t2 } = await mkOrder(user1.id, planA.id, planA.price);
    const r3 = await activateLicenseForOrder({ orderId: o2.id, transactionId: t2.id, reason: 'test renouvellement' });
    const expectedEnd = addMonths(oldEnd, 1);
    assert(r3.renewed === true && r3.license.id === r1.license.id, 'Licence existante prolongée (pas de nouvelle)');
    assert(
      r3.license.endDate?.getTime() === expectedEnd.getTime(),
      'Nouvelle fin = ancienne fin + 1 mois (pas de perte de jours)',
      `attendu=${expectedEnd.toISOString()} obtenu=${r3.license.endDate?.toISOString()}`,
    );
    assert((await countLicenses(user1.id)) === 1, 'Toujours une seule licence');

    // ── Test 7 (avant suspension) : upgrade → ancienne résiliée, nouvelle active ──
    console.log('Test 7 — Upgrade de forfait');
    const { order: o3, txn: t3 } = await mkOrder(user1.id, planB.id, planB.price);
    const r7 = await activateLicenseForOrder({ orderId: o3.id, transactionId: t3.id, reason: 'test upgrade' });
    const oldLic = await prisma.license.findUniqueOrThrow({ where: { id: r1.license.id } });
    const oldEvents = await prisma.licenseEvent.count({ where: { licenseId: r1.license.id } });
    assert(r7.created === true && r7.license.id !== r1.license.id, 'Nouvelle licence créée pour le nouveau forfait');
    assert(r7.license.status === 'active' && r7.license.planId === planB.id, 'Nouvelle licence active sur le forfait B');
    assert(oldLic.status === 'resiliee', 'Ancienne licence résiliée (historique conservé)');
    assert(oldEvents >= 3, 'Historique LicenseEvent de l’ancienne licence conservé', `events=${oldEvents}`);

    // ── Test 6 : suspendLicense → suspendue + LicenseEvent ──
    console.log('Test 6 — Suspension');
    await suspendLicense(r7.license.id, 'test suspension smoke');
    const suspended = await prisma.license.findUniqueOrThrow({ where: { id: r7.license.id } });
    const suspEvent = await prisma.licenseEvent.findFirst({
      where: { licenseId: r7.license.id, type: 'suspension' },
    });
    assert(suspended.status === 'suspendue' && suspended.suspendedReason === 'test suspension smoke', 'Statut « suspendue » + motif');
    assert(!!suspEvent, 'LicenseEvent « suspension » créé');

    // ── Test 4 : activation provisoire (user2) ──
    console.log('Test 4 — Activation provisoire (≤ 7 jours)');
    const { order: o4, txn: t4 } = await mkOrder(user2.id, planA.id, planA.price);
    const r4 = await activateLicenseForOrder({
      orderId: o4.id, transactionId: t4.id, provisional: true, provisionalDays: 5,
      actorId: null, reason: 'virement international en attente',
    });
    const maxUntil = Date.now() + 7 * 86400_000 + 60_000;
    assert(r4.license.status === 'provisoire', 'Statut « provisoire »');
    assert(
      !!r4.license.provisionalUntil && r4.license.provisionalUntil.getTime() <= maxUntil,
      'provisionalUntil ≤ 7 jours',
      `until=${r4.license.provisionalUntil?.toISOString()}`,
    );
    const o4After = await prisma.order.findUniqueOrThrow({ where: { id: o4.id } });
    assert(o4After.status === 'a_verifier', 'Commande maintenue « a_verifier » (fonds non confirmés)');

    // ── Test 5 : conversion provisoire → définitive (même licence) ──
    console.log('Test 5 — Conversion provisoire → définitive');
    const before5 = await countLicenses(user2.id);
    const r5 = await activateLicenseForOrder({ orderId: o4.id, transactionId: t4.id, reason: 'fonds confirmés' });
    const after5 = await countLicenses(user2.id);
    assert(r5.license.id === r4.license.id, 'Même licence (pas de 2e licence créée)');
    assert(r5.license.status === 'active' && r5.license.provisionalUntil === null, 'Statut « active », provisoire levé');
    assert(before5 === after5 && after5 === 1, 'Nombre de licences user2 inchangé');
    const convEvent = await prisma.licenseEvent.findFirst({
      where: { licenseId: r4.license.id, type: 'conversion_definitive' },
    });
    assert(!!convEvent, 'LicenseEvent « conversion_definitive » créé');

    // ── Test 8 : WebhookEvent unique (provider, eventId) ──
    console.log('Test 8 — Unicité WebhookEvent (idempotence webhook)');
    await prisma.webhookEvent.create({
      data: { provider: 'smoke_test', eventId: uniq, payloadJson: '{}' },
    });
    let dupRejected = false;
    try {
      await prisma.webhookEvent.create({
        data: { provider: 'smoke_test', eventId: uniq, payloadJson: '{}' },
      });
    } catch {
      dupRejected = true; // P2002 attendu
    }
    assert(dupRejected, 'Second insert du même (provider, eventId) rejeté');

    // ── Test 9 : job cron expire_orders idempotent ──
    console.log('Test 9 — Job cron expire_orders idempotent (2 exécutions)');
    const { order: o5 } = await mkOrder(user2.id, planA.id, planA.price, {
      expiresAt: new Date(Date.now() - 3600_000),
    });
    const run1 = await runJob('expire_orders');
    const o5After1 = await prisma.order.findUniqueOrThrow({ where: { id: o5.id } });
    assert(run1.status === 'ok' && o5After1.status === 'expiree', '1re exécution : commande expirée');
    const run2 = await runJob('expire_orders');
    const o5After2 = await prisma.order.findUniqueOrThrow({ where: { id: o5.id } });
    assert(
      run2.status === 'ok' && run2.details.expired === 0 && o5After2.status === 'expiree',
      '2e exécution : aucun effet de bord (0 commande touchée, statut inchangé)',
      `expired=${String(run2.details.expired)}`,
    );
  } finally {
    // ── Nettoyage des données de test ──
    console.log('\nNettoyage des données de test…');
    const lics = await prisma.license.findMany({ where: { userId: { in: userIds } }, select: { id: true } });
    const licIds = lics.map((l) => l.id);
    const orders = await prisma.order.findMany({ where: { userId: { in: userIds } }, select: { id: true } });
    const orderIds = orders.map((o) => o.id);
    await prisma.licenseEvent.deleteMany({ where: { licenseId: { in: licIds } } });
    await prisma.license.deleteMany({ where: { id: { in: licIds } } });
    await prisma.transaction.deleteMany({ where: { userId: { in: userIds } } });
    await prisma.order.deleteMany({ where: { id: { in: orderIds } } });
    await prisma.notification.deleteMany({
      where: { OR: [{ userId: { in: userIds } }, { body: { contains: uniq } }] },
    });
    await prisma.auditLog.deleteMany({ where: { entityId: { in: [...licIds, ...orderIds] } } });
    await prisma.webhookEvent.deleteMany({ where: { provider: 'smoke_test' } });
    await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    await prisma.plan.deleteMany({ where: { id: { in: planIds } } });
    console.log('Nettoyage terminé.');
  }

  console.log(`\n═══ RÉSUMÉ : ${passed} réussi(s), ${failed} échoué(s) ═══\n`);
  if (failed > 0) process.exitCode = 1;
}

main()
  .catch((e) => {
    console.error('\n💥 Erreur fatale des smoke tests :', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await baseClient.$disconnect();
  });
