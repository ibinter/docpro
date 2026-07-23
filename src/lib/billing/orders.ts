// ─────────────────────────────────────────────────────────────────────────────
// Création de commandes (CDC §13.1) — forfait OU document à l'unité.
// • Numéro lisible séquentiel CMD-2026-NNNNNN.
// • Anti double-clic : réutilise une commande en_attente_paiement récente (<30 min).
// • Prix promo appliqué uniquement si la fenêtre promo est active.
// ─────────────────────────────────────────────────────────────────────────────
import type { Plan, Order } from '@prisma/client';
import { prisma } from '@/lib/db';
import { refNumber } from '@/lib/money';
import { audit } from '@/lib/audit';

const ORDER_TTL_MS = 24 * 60 * 60 * 1000; // expiration commande : +24h
const REUSE_WINDOW_MS = 30 * 60 * 1000; // anti double-clic : 30 min

/** Prix effectif d'un forfait : promoPrice si la promotion est active maintenant. */
export function effectivePlanPrice(plan: Plan, now = new Date()): { amount: number; discount: number; total: number } {
  const promoActive =
    plan.promoPrice != null &&
    plan.promoPrice < plan.price &&
    (!plan.promoStart || plan.promoStart <= now) &&
    (!plan.promoEnd || plan.promoEnd >= now);
  const total = promoActive ? (plan.promoPrice as number) : plan.price;
  return { amount: plan.price, discount: plan.price - total, total };
}

/** Crée la commande avec numéro séquentiel unique (retente en cas de collision). */
async function createOrderWithNumber(data: {
  userId: string;
  organizationId: string | null;
  planId?: string | null;
  documentId?: string | null;
  amount: number;
  discount: number;
  total: number;
  currency: string;
  billingCountry: string | null;
  metadataJson: string;
}): Promise<Order> {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < 5; attempt++) {
    const year = new Date().getFullYear();
    const count = await prisma.order.count({ where: { createdAt: { gte: new Date(year, 0, 1) } } });
    const number = refNumber('CMD', count + 1 + attempt);
    try {
      return await prisma.order.create({
        data: {
          number,
          userId: data.userId,
          organizationId: data.organizationId,
          planId: data.planId ?? null,
          documentId: data.documentId ?? null,
          status: 'en_attente_paiement',
          amount: data.amount,
          discount: data.discount,
          tax: 0,
          total: data.total,
          currency: data.currency,
          billingCountry: data.billingCountry,
          expiresAt: new Date(Date.now() + ORDER_TTL_MS),
          metadataJson: data.metadataJson,
        },
      });
    } catch (e) {
      // P2002 = collision sur le numéro unique → on retente avec le suivant
      if ((e as { code?: string }).code === 'P2002') { lastError = e; continue; }
      throw e;
    }
  }
  throw lastError ?? new Error('Impossible de générer un numéro de commande unique');
}

export type CreateOrderInput = {
  userId: string;
  organizationId?: string | null;
  billingCountry?: string | null;
  planCode?: string;
  documentId?: string;
  ip?: string;
  userAgent?: string;
};

/**
 * Crée (ou réutilise) une commande pour un forfait ou un document.
 * Anti double-clic : si une commande en_attente_paiement du même utilisateur
 * pour le même forfait/document existe depuis moins de 30 minutes, on la retourne.
 */
export async function createOrReuseOrder(input: CreateOrderInput): Promise<{ order: Order; reused: boolean }> {
  const { userId, planCode, documentId } = input;
  if (!planCode && !documentId) throw new Error('planCode ou documentId requis');
  if (planCode && documentId) throw new Error('planCode et documentId sont exclusifs');

  const now = new Date();
  const reuseSince = new Date(now.getTime() - REUSE_WINDOW_MS);

  let planId: string | null = null;
  let amount = 0, discount = 0, total = 0;
  let currency = 'XOF';

  if (planCode) {
    const plan = await prisma.plan.findUnique({ where: { code: planCode } });
    if (!plan || !plan.active) throw new Error('Forfait introuvable ou inactif');
    planId = plan.id;
    ({ amount, discount, total } = effectivePlanPrice(plan, now));
    currency = plan.currency;

    const existing = await prisma.order.findFirst({
      where: { userId, planId, status: 'en_attente_paiement', createdAt: { gte: reuseSince } },
      orderBy: { createdAt: 'desc' },
    });
    if (existing) return { order: existing, reused: true };
  } else if (documentId) {
    const doc = await prisma.generatedDocument.findUnique({ where: { id: documentId } });
    if (!doc) throw new Error('Document introuvable');
    if (doc.userId && doc.userId !== userId) throw new Error('Ce document ne vous appartient pas');
    if (doc.paid) throw new Error('Ce document est déjà payé');
    amount = doc.price; discount = 0; total = doc.price;
    currency = doc.currency;

    const existing = await prisma.order.findFirst({
      where: { userId, documentId, status: 'en_attente_paiement', createdAt: { gte: reuseSince } },
      orderBy: { createdAt: 'desc' },
    });
    if (existing) return { order: existing, reused: true };
  }

  const order = await createOrderWithNumber({
    userId,
    organizationId: input.organizationId ?? null,
    planId,
    documentId: documentId ?? null,
    amount, discount, total, currency,
    billingCountry: input.billingCountry ?? null,
    metadataJson: JSON.stringify({
      ip: input.ip ?? 'inconnue',
      userAgent: input.userAgent ?? 'inconnu',
      source: 'checkout',
    }),
  });

  await audit({
    actorId: userId,
    action: 'order.create',
    entityType: 'Order',
    entityId: order.id,
    after: { number: order.number, total: order.total, currency: order.currency, planId, documentId },
    ip: input.ip,
  });

  return { order, reused: false };
}
