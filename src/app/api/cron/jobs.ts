// Tâches planifiées IDEMPOTENTES (CDC §20.1). Chaque exécution loggue un CronRun.
// Imports relatifs pour rester exécutable via tsx (scripts/smoke-tests.ts).
import { prisma } from '../../../lib/db';
import { suspendLicense } from '../../../lib/license';
import { notifyUser, notifyAdmins } from '../../../lib/notify';
import { formatMoney } from '../../../lib/money';

export const JOBS = [
  'expire_orders',
  'trial_end',
  'expiry_alerts',
  'grace',
  'suspend_expired',
  'provisional_expiry',
  'daily_report',
  'anomaly_scan',
] as const;
export type JobName = (typeof JOBS)[number];

export type JobResult = { job: string; status: 'ok' | 'erreur'; details: Record<string, unknown> };

function startOfToday(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

// ── Implémentations ──────────────────────────────────────────────────────────

/** Commandes en attente de paiement dont le délai est dépassé → expirée. */
async function expireOrders(): Promise<Record<string, unknown>> {
  const res = await prisma.order.updateMany({
    where: { status: 'en_attente_paiement', expiresAt: { not: null, lt: new Date() } },
    data: { status: 'expiree' },
  });
  return { expired: res.count };
}

/** Licences d'essai dont la date de fin est dépassée → suspendue + notification. */
async function trialEnd(): Promise<Record<string, unknown>> {
  const expired = await prisma.license.findMany({
    where: { status: 'essai', endDate: { not: null, lt: new Date() } },
  });
  for (const lic of expired) {
    await prisma.license.update({
      where: { id: lic.id },
      data: { status: 'suspendue', suspendedReason: 'Essai gratuit expiré' },
    });
    await prisma.licenseEvent.create({
      data: { licenseId: lic.id, type: 'suspension', reason: 'Essai gratuit expiré (tâche planifiée)' },
    });
    await notifyUser({
      userId: lic.userId,
      event: 'essai_expire',
      title: 'Votre essai a expiré',
      body: 'Votre essai gratuit IBIG DocPro est terminé — choisissez un forfait pour continuer.',
    });
  }
  return { suspended: expired.length };
}

/** Rappels J-7 / J-3 / J-1 avant expiration — jamais 2× le même jour. */
async function expiryAlerts(): Promise<Record<string, unknown>> {
  const now = new Date();
  const in8days = new Date(now.getTime() + 8 * 86400_000);
  const today = startOfToday();
  const candidates = await prisma.license.findMany({
    where: { status: 'active', endDate: { not: null, gt: now, lt: in8days } },
  });
  let sent = 0;
  for (const lic of candidates) {
    const daysLeft = Math.ceil((lic.endDate!.getTime() - now.getTime()) / 86400_000);
    if (![7, 3, 1].includes(daysLeft)) continue;
    const event = `expiration_j${daysLeft}`;
    const already = await prisma.notification.findFirst({
      where: { userId: lic.userId, event, createdAt: { gte: today } },
    });
    if (already) continue; // idempotence quotidienne
    await notifyUser({
      userId: lic.userId,
      event,
      title: `Votre licence expire dans ${daysLeft} jour${daysLeft > 1 ? 's' : ''}`,
      body: `Votre licence IBIG DocPro expire le ${lic.endDate!.toLocaleDateString('fr-FR')}. Renouvelez dès maintenant pour éviter toute interruption.`,
    });
    sent += 1;
  }
  return { checked: candidates.length, sent };
}

/** Licences actives arrivées à échéance → période de grâce de 7 jours + notification. */
async function grace(): Promise<Record<string, unknown>> {
  const now = new Date();
  const dueLicenses = await prisma.license.findMany({
    where: { status: 'active', endDate: { not: null, lt: now } },
  });
  for (const lic of dueLicenses) {
    const graceUntil = new Date(Math.max(lic.endDate!.getTime(), now.getTime()) + 7 * 86400_000);
    await prisma.license.update({
      where: { id: lic.id },
      data: { status: 'grace', graceUntil },
    });
    await prisma.licenseEvent.create({
      data: {
        licenseId: lic.id,
        type: 'grace',
        reason: 'Fin de licence — période de grâce de 7 jours (tâche planifiée)',
        detailsJson: JSON.stringify({ graceUntil }),
      },
    });
    await notifyUser({
      userId: lic.userId,
      event: 'periode_grace',
      title: 'Période de grâce activée',
      body: `Votre licence a expiré. Vous bénéficiez d'un accès partiel jusqu'au ${graceUntil.toLocaleDateString('fr-FR')} pour régulariser.`,
    });
  }
  return { moved_to_grace: dueLicenses.length };
}

/** Fin de période de grâce → expirée + notification. */
async function suspendExpired(): Promise<Record<string, unknown>> {
  const now = new Date();
  const overdue = await prisma.license.findMany({
    where: { status: 'grace', graceUntil: { not: null, lt: now } },
  });
  for (const lic of overdue) {
    await prisma.license.update({ where: { id: lic.id }, data: { status: 'expiree' } });
    await prisma.licenseEvent.create({
      data: { licenseId: lic.id, type: 'expiration', reason: 'Fin de période de grâce (tâche planifiée)' },
    });
    await notifyUser({
      userId: lic.userId,
      event: 'licence_expiree',
      title: 'Licence expirée',
      body: 'Votre période de grâce est terminée. Renouvelez votre forfait pour retrouver vos accès.',
    });
  }
  return { expired: overdue.length };
}

/** Provisoires à terme sans confirmation des fonds → suspension (CDC §15.2). */
async function provisionalExpiry(): Promise<Record<string, unknown>> {
  const now = new Date();
  const overdue = await prisma.license.findMany({
    where: { status: 'provisoire', provisionalUntil: { not: null, lt: now } },
  });
  for (const lic of overdue) {
    await suspendLicense(lic.id, 'fonds non confirmés', null);
  }
  return { suspended: overdue.length };
}

/** Résumé financier quotidien → notification admins (1 seul rapport par jour). */
async function dailyReport(): Promise<Record<string, unknown>> {
  const today = startOfToday();
  const already = await prisma.notification.findFirst({
    where: { forAdmin: true, event: 'rapport_journalier', createdAt: { gte: today } },
  });
  if (already) return { skipped: true, reason: 'Rapport déjà émis aujourd’hui' };

  const [paidToday, txOk, txPending, txVerify, proofsPending] = await Promise.all([
    prisma.order.findMany({ where: { status: 'payee', updatedAt: { gte: today } }, select: { total: true, currency: true } }),
    prisma.transaction.count({ where: { status: { in: ['reussie', 'validee_manuellement'] }, updatedAt: { gte: today } } }),
    prisma.transaction.count({ where: { status: { in: ['initialisee', 'en_attente', 'en_cours'] } } }),
    prisma.transaction.count({ where: { status: 'a_verifier' } }),
    prisma.paymentProof.count({ where: { status: { in: ['soumise', 'en_cours'] } } }),
  ]);
  const byCurrency = new Map<string, number>();
  for (const o of paidToday) byCurrency.set(o.currency, (byCurrency.get(o.currency) ?? 0) + o.total);
  const ca = [...byCurrency.entries()].map(([cur, sum]) => formatMoney(sum, cur)).join(' + ') || formatMoney(0, 'XOF');

  await notifyAdmins({
    event: 'rapport_journalier',
    title: `Rapport financier du ${today.toLocaleDateString('fr-FR')}`,
    body: `CA du jour : ${ca} · ${paidToday.length} commande(s) payée(s) · ${txOk} paiement(s) confirmé(s) · ${txPending} en attente · ${txVerify} à vérifier · ${proofsPending} preuve(s) à examiner.`,
  });
  return { orders_paid: paidToday.length, ca, tx_ok: txOk, tx_pending: txPending, tx_verify: txVerify };
}

/** Transactions « à vérifier » depuis plus de 48 h → alerte admins (1 fois par jour). */
async function anomalyScan(): Promise<Record<string, unknown>> {
  const cutoff = new Date(Date.now() - 48 * 3600_000);
  const stale = await prisma.transaction.findMany({
    where: { status: 'a_verifier', createdAt: { lt: cutoff } },
    select: { internalRef: true },
    take: 50,
  });
  if (stale.length === 0) return { stale: 0 };

  const today = startOfToday();
  const already = await prisma.notification.findFirst({
    where: { forAdmin: true, event: 'anomalies_paiement', createdAt: { gte: today } },
  });
  if (already) return { stale: stale.length, skipped: true, reason: 'Alerte déjà émise aujourd’hui' };

  const refs = stale.slice(0, 10).map((t) => t.internalRef).join(', ');
  await notifyAdmins({
    event: 'anomalies_paiement',
    title: `${stale.length} transaction(s) à vérifier depuis plus de 48 h`,
    body: `Ces paiements attendent une validation manuelle depuis plus de 48 h : ${refs}${stale.length > 10 ? '…' : ''}. Traitez la file de validation.`,
  });
  return { stale: stale.length, notified: true };
}

// ── Moteur ───────────────────────────────────────────────────────────────────

const IMPL: Record<JobName, () => Promise<Record<string, unknown>>> = {
  expire_orders: expireOrders,
  trial_end: trialEnd,
  expiry_alerts: expiryAlerts,
  grace,
  suspend_expired: suspendExpired,
  provisional_expiry: provisionalExpiry,
  daily_report: dailyReport,
  anomaly_scan: anomalyScan,
};

export function isJobName(job: string): job is JobName {
  return (JOBS as readonly string[]).includes(job);
}

/** Exécute un job, journalise un CronRun et retourne le résultat. */
export async function runJob(job: JobName): Promise<JobResult> {
  let status: 'ok' | 'erreur' = 'ok';
  let details: Record<string, unknown> = {};
  try {
    details = await IMPL[job]();
  } catch (e) {
    status = 'erreur';
    details = { error: e instanceof Error ? e.message : String(e) };
  }
  await prisma.cronRun.create({
    data: { job, status, detailsJson: JSON.stringify(details) },
  });
  return { job, status, details };
}

/** Exécute tous les jobs séquentiellement. */
export async function runAllJobs(): Promise<JobResult[]> {
  const results: JobResult[] = [];
  for (const job of JOBS) {
    results.push(await runJob(job));
  }
  return results;
}
