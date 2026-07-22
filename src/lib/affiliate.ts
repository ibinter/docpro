// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMME AFFILIÉ 15 % (CDC §7.3).
// - ensureReferralCode : code de parrainage court, unique, stable par utilisateur.
// - computeAffiliateEarnings : calcul IDEMPOTENT des commissions (15 % des
//   commandes payées des filleuls). L'unicité AffiliateEarning.orderId garantit
//   qu'une commande ne génère JAMAIS deux commissions, même en cas d'exécutions
//   concurrentes du job.
// ─────────────────────────────────────────────────────────────────────────────
import { randomInt } from 'crypto';
import { prisma } from './db';
import { notifyUser } from './notify';
import { formatMoney } from './money';

/** Taux de commission du programme affilié (CDC §7.3). */
export const AFFILIATE_RATE = 0.15;

/** Seuil de paiement Mobile Money (FCFA). */
export const AFFILIATE_PAYOUT_THRESHOLD = 5000;

// Alphabet sans caractères ambigus (pas de O/0, I/1/L) — 8 caractères majuscules.
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const CODE_LENGTH = 8;

function generateCode(): string {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  }
  return code;
}

/**
 * Garantit que l'utilisateur possède un code de parrainage unique (8 caractères
 * alphanumériques majuscules) et le retourne. Idempotent : le code existant est
 * conservé.
 */
export async function ensureReferralCode(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { referralCode: true },
  });
  if (!user) throw new Error('Utilisateur introuvable');
  if (user.referralCode) return user.referralCode;

  // Boucle courte : collision très improbable (31^8 combinaisons).
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode();
    try {
      await prisma.user.update({ where: { id: userId }, data: { referralCode: code } });
      return code;
    } catch {
      // Collision sur l'unicité → nouvel essai.
    }
  }
  throw new Error('Impossible de générer un code de parrainage unique');
}

/** Résout un code de parrainage vers son propriétaire (ou null). */
export async function findReferrerByCode(code: string) {
  const cleaned = code.trim().toUpperCase();
  if (!/^[A-Z0-9]{4,16}$/.test(cleaned)) return null;
  return prisma.user.findUnique({ where: { referralCode: cleaned } });
}

export type AffiliateComputation = { created: number; totalAmount: number };

/**
 * LE CŒUR DU PROGRAMME — calcul idempotent des commissions.
 * Parcourt les commandes payées ('payee') dont l'acheteur a un parrain
 * (referredById) et sans AffiliateEarning existant (orderId unique), crée la
 * commission (15 % du total, arrondi) en 'en_attente' et notifie le parrain.
 */
export async function computeAffiliateEarnings(): Promise<AffiliateComputation> {
  const orders = await prisma.order.findMany({
    where: { status: 'payee', total: { gt: 0 } },
    select: {
      id: true,
      total: true,
      currency: true,
      number: true,
      user: { select: { id: true, name: true, referredById: true } },
    },
  });
  const eligible = orders.filter((o) => !!o.user.referredById);
  if (eligible.length === 0) return { created: 0, totalAmount: 0 };

  // Idempotence : commandes déjà commissionnées → exclues.
  const existing = await prisma.affiliateEarning.findMany({
    where: { orderId: { in: eligible.map((o) => o.id) } },
    select: { orderId: true },
  });
  const done = new Set(existing.map((e) => e.orderId));

  let created = 0;
  let totalAmount = 0;
  for (const order of eligible) {
    if (done.has(order.id)) continue;
    const amount = Math.round(order.total * AFFILIATE_RATE);
    if (amount <= 0) continue;
    const affiliateId = order.user.referredById!;
    try {
      await prisma.affiliateEarning.create({
        data: {
          affiliateId,
          orderId: order.id, // unique → une seule commission par commande
          referredId: order.user.id,
          amount,
          currency: order.currency,
          status: 'en_attente',
        },
      });
    } catch {
      // Contrainte d'unicité (exécution concurrente) → déjà traité, on ignore.
      continue;
    }
    created++;
    totalAmount += amount;
    await notifyUser({
      userId: affiliateId,
      event: 'commission_affiliation',
      title: 'Nouvelle commission de parrainage',
      body: `Vous avez gagné ${formatMoney(amount, order.currency)} grâce au paiement de votre filleul ${order.user.name} (commande ${order.number}). Commission en attente de validation.`,
    });
  }
  return { created, totalAmount };
}
