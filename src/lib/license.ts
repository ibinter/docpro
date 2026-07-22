// ─────────────────────────────────────────────────────────────────────────────
// CŒUR DU MODULE PAIEMENT — Activation & renouvellement de licences.
// RÈGLES ABSOLUES (CDC §10, §15) :
//   • Une commande ne crée JAMAIS plus d'une licence définitive (idempotence).
//   • Jamais de double prolongation sur un même paiement.
//   • Activation UNIQUEMENT après confirmation serveur (webhook vérifié ou
//     validation manuelle admin) — jamais sur le retour client "page succès".
//   • L'historique des licences n'est jamais écrasé (LicenseEvent).
//   • Toute action passe au journal d'audit.
// Tous les agents (paiement électronique, paiement manuel, SuperAdmin, cron)
// DOIVENT passer par ces fonctions — ne pas réimplémenter cette logique.
//
// IMPORTANT (concurrence SQLite) : les écritures BDD critiques se font dans la
// transaction via `tx.*` ; les effets de bord (audit, notifications — qui
// utilisent le client Prisma global) sont COLLECTÉS puis exécutés APRÈS le
// commit, sinon interblocage systématique (P2028).
// ─────────────────────────────────────────────────────────────────────────────
import { prisma } from './db';
import { audit } from './audit';
import { notifyUser, notifyAdmins } from './notify';

function computeEndDate(from: Date, durationType: string, durationValue: number): Date | null {
  if (durationType === 'perpetual') return null;
  const d = new Date(from);
  if (durationType === 'days') d.setDate(d.getDate() + durationValue);
  else if (durationType === 'months') d.setMonth(d.getMonth() + durationValue);
  else if (durationType === 'years') d.setFullYear(d.getFullYear() + durationValue);
  return d;
}

type LicenseRecord = Awaited<ReturnType<typeof prisma.license.create>>;

export type ActivationResult = {
  license: LicenseRecord;
  created: boolean; // false si déjà activée (idempotence)
  renewed: boolean;
};

/** Effet de bord différé, exécuté après le commit de la transaction. */
type PostCommit = () => Promise<void>;

/** Exécute les effets post-commit ; un échec (audit/notif) ne remet pas en cause l'écriture commitée. */
async function runPostCommit(effects: PostCommit[]) {
  for (const run of effects) {
    try { await run(); } catch (e) { console.error('[license] effet post-commit échoué :', e); }
  }
}

/**
 * Active (ou renouvelle) la licence liée à une commande payée.
 * Idempotente : rappelée avec la même commande, retourne la licence existante.
 *
 * @param provisional si true → activation provisoire (max 7 jours), admin uniquement.
 */
export async function activateLicenseForOrder(params: {
  orderId: string;
  transactionId: string;
  actorId?: string | null; // null = webhook/système
  provisional?: boolean;
  provisionalDays?: number;
  reason?: string;
}): Promise<ActivationResult> {
  const { orderId, transactionId, actorId = null, provisional = false, reason } = params;
  const provisionalDays = Math.min(params.provisionalDays ?? 7, 7); // max 7 jours (CDC §15.2)

  const effects: PostCommit[] = [];

  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { plan: true, license: true, user: true },
    });
    if (!order.planId || !order.plan) throw new Error('Commande sans forfait — activation impossible');

    // ── IDEMPOTENCE : commande déjà payée + licence existante → ne rien recréer
    const existing = await tx.license.findUnique({ where: { orderId } });
    if (existing && order.status === 'payee' && !provisional) {
      return { license: existing, created: false, renewed: false };
    }

    const plan = order.plan;
    const now = new Date();

    // ── Conversion provisoire → définitive (fonds confirmés après activation provisoire)
    if (existing && existing.status === 'provisoire' && !provisional) {
      // Prolonger correctement à partir de la date de début provisoire — pas de 2e licence
      const endDate = computeEndDate(existing.startDate, plan.durationType, plan.durationValue);
      const updated = await tx.license.update({
        where: { id: existing.id },
        data: { status: 'active', endDate, provisionalUntil: null },
      });
      await tx.licenseEvent.create({
        data: {
          licenseId: existing.id, type: 'conversion_definitive', actorId, reason,
          detailsJson: JSON.stringify({ transactionId, endDate }),
        },
      });
      await tx.order.update({ where: { id: orderId }, data: { status: 'payee' } });
      effects.push(
        () => audit({ actorId, action: 'license.convert_definitive', entityType: 'License', entityId: existing.id, reason, after: { endDate } }),
        () => notifyUser({ userId: order.userId, event: 'licence_activee', title: 'Licence confirmée', body: `Votre licence ${plan.name} est désormais définitive.` }),
      );
      return { license: updated, created: false, renewed: true };
    }

    // Un pack (PACK_*) est une licence ADDITIVE : il coexiste avec un abonnement,
    // ne le remplace jamais et n'est jamais remplacé par lui.
    const isPackPlan = (p: { code: string; featuresJson: string | null }): boolean => {
      if (p.code.startsWith('PACK_')) return true;
      try { return Boolean(JSON.parse(p.featuresJson ?? '{}')?.isPack); } catch { return false; }
    };

    // ── Renouvellement : licence active existante pour le même utilisateur + MÊME forfait
    const activeLicense = await tx.license.findFirst({
      where: { userId: order.userId, planId: order.planId, status: { in: ['active', 'grace'] } },
      orderBy: { endDate: 'desc' },
    });

    if (activeLicense && !provisional && activeLicense.endDate) {
      // Renouvellement : prolonge la date de fin actuelle (pas de perte de jours restants)
      const base = activeLicense.endDate > now ? activeLicense.endDate : now;
      const endDate = computeEndDate(base, plan.durationType, plan.durationValue);
      const updated = await tx.license.update({
        where: { id: activeLicense.id },
        data: { status: 'active', endDate, graceUntil: null },
      });
      await tx.licenseEvent.create({
        data: {
          licenseId: activeLicense.id, type: 'renouvellement', actorId, reason,
          detailsJson: JSON.stringify({ orderId, transactionId, from: base, endDate }),
        },
      });
      await tx.order.update({ where: { id: orderId }, data: { status: 'payee' } });
      effects.push(
        () => audit({ actorId, action: 'license.renew', entityType: 'License', entityId: activeLicense.id, reason, after: { endDate } }),
        () => notifyUser({ userId: order.userId, event: 'licence_activee', title: 'Abonnement renouvelé', body: `Votre forfait ${plan.name} est prolongé jusqu'au ${endDate?.toLocaleDateString('fr-FR')}.` }),
      );
      return { license: updated, created: false, renewed: true };
    }

    // ── Upgrade/downgrade : uniquement entre ABONNEMENTS. Un pack acheté ne résilie
    // jamais l'abonnement en cours, et un abonnement ne résilie jamais un pack.
    if (!provisional && !isPackPlan(plan)) {
      const currentSub = await tx.license.findFirst({
        where: {
          userId: order.userId,
          status: { in: ['active', 'grace'] },
          planId: { not: order.planId },
        },
        include: { plan: true },
        orderBy: { endDate: 'desc' },
      });
      if (currentSub && !isPackPlan(currentSub.plan)) {
        await tx.license.update({ where: { id: currentSub.id }, data: { status: 'resiliee' } });
        await tx.licenseEvent.create({
          data: { licenseId: currentSub.id, type: 'upgrade', actorId, detailsJson: JSON.stringify({ toPlanId: order.planId, orderId }) },
        });
      }
    }

    // ── Création d'une nouvelle licence
    const endDate = provisional
      ? null
      : computeEndDate(now, plan.durationType, plan.durationValue);
    const provisionalUntil = provisional ? new Date(now.getTime() + provisionalDays * 86400_000) : null;

    const license = await tx.license.create({
      data: {
        userId: order.userId,
        organizationId: order.organizationId,
        planId: order.planId,
        orderId,
        status: provisional ? 'provisoire' : 'active',
        startDate: now,
        endDate: provisional ? provisionalUntil : endDate,
        provisionalUntil,
        provisionalReason: provisional ? reason : null,
      },
    });
    await tx.licenseEvent.create({
      data: {
        licenseId: license.id,
        type: provisional ? 'activation_provisoire' : 'activation',
        actorId, reason,
        detailsJson: JSON.stringify({ orderId, transactionId, endDate: license.endDate }),
      },
    });
    await tx.order.update({
      where: { id: orderId },
      data: { status: provisional ? 'a_verifier' : 'payee' },
    });

    effects.push(
      () => audit({
        actorId,
        action: provisional ? 'license.activate_provisional' : 'license.activate',
        entityType: 'License', entityId: license.id, reason,
        after: { status: license.status, endDate: license.endDate },
      }),
      () => notifyUser({
        userId: order.userId,
        event: provisional ? 'licence_provisoire' : 'licence_activee',
        title: provisional ? 'Activation provisoire accordée' : 'Licence activée 🎉',
        body: provisional
          ? `Accès provisoire ${provisionalDays} jours en attente de confirmation des fonds.`
          : `Votre forfait ${plan.name} est actif${license.endDate ? ` jusqu'au ${license.endDate.toLocaleDateString('fr-FR')}` : ''}.`,
      }),
      () => notifyAdmins({
        event: 'licence_activee',
        title: provisional ? 'Activation provisoire' : 'Nouvelle licence activée',
        body: `${order.user.email} — ${plan.name} — commande ${order.number}`,
      }),
    );

    return { license, created: true, renewed: false };
  });

  // Effets de bord APRÈS commit — jamais dans la transaction (interblocage SQLite).
  await runPostCommit(effects);

  return result;
}

/** Suspend une licence (admin ou cron). Motif obligatoire. */
export async function suspendLicense(licenseId: string, reason: string, actorId?: string | null) {
  // Écritures critiques atomiques (statut + historique), effets de bord après commit.
  const license = await prisma.$transaction(async (tx) => {
    const updated = await tx.license.update({
      where: { id: licenseId },
      data: { status: 'suspendue', suspendedReason: reason },
    });
    await tx.licenseEvent.create({ data: { licenseId, type: 'suspension', reason, actorId: actorId ?? null } });
    return updated;
  });

  await runPostCommit([
    () => audit({ actorId, action: 'license.suspend', entityType: 'License', entityId: licenseId, reason }),
    () => notifyUser({ userId: license.userId, event: 'licence_suspendue', title: 'Licence suspendue', body: `Motif : ${reason}` }),
  ]);
  return license;
}

/** Statut effectif d'accès d'un utilisateur : complet | partiel | bloque. */
export async function getAccessLevel(userId: string): Promise<'complet' | 'partiel' | 'bloque'> {
  const license = await prisma.license.findFirst({
    where: { userId, status: { in: ['active', 'provisoire', 'grace', 'essai', 'en_attente'] } },
    orderBy: { createdAt: 'desc' },
  });
  if (!license) return 'bloque';
  if (license.status === 'active' || license.status === 'provisoire') return 'complet';
  return 'partiel';
}
