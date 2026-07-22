// ─────────────────────────────────────────────────────────────────────────────
// Facture + reçu après paiement confirmé (CDC §16.2).
// Numéros séquentiels FAC-2026-NNNNNN / REC-2026-NNNNNN.
// Idempotent : ne crée jamais deux factures pour la même commande.
// ─────────────────────────────────────────────────────────────────────────────
import type { Invoice } from '@prisma/client';
import { prisma } from '@/lib/db';
import { refNumber } from '@/lib/money';

async function createInvoiceWithNumber(
  type: 'facture' | 'recu',
  prefix: 'FAC' | 'REC',
  data: {
    orderId: string;
    userId: string;
    amount: number;
    discount: number;
    tax: number;
    total: number;
    currency: string;
    periodStart: Date | null;
    periodEnd: Date | null;
    detailsJson: string;
  },
): Promise<Invoice> {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < 5; attempt++) {
    const count = await prisma.invoice.count({ where: { type } });
    const number = refNumber(prefix, count + 1 + attempt);
    try {
      return await prisma.invoice.create({ data: { ...data, type, number } });
    } catch (e) {
      if ((e as { code?: string }).code === 'P2002') { lastError = e; continue; }
      throw e;
    }
  }
  throw lastError ?? new Error(`Impossible de générer un numéro ${prefix} unique`);
}

/**
 * Crée la facture ET le reçu d'une commande payée.
 * periodStart/periodEnd renseignés uniquement pour un forfait (durée de licence).
 */
export async function createInvoicesForPaidOrder(params: {
  orderId: string;
  transactionId: string;
  periodStart?: Date | null;
  periodEnd?: Date | null;
}): Promise<{ facture: Invoice | null; recu: Invoice | null }> {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: params.orderId },
    include: { plan: true, user: true },
  });

  // Idempotence : jamais deux factures pour la même commande
  const existing = await prisma.invoice.findMany({
    where: { orderId: order.id, type: { in: ['facture', 'recu'] } },
  });
  if (existing.length > 0) {
    return {
      facture: existing.find((i) => i.type === 'facture') ?? null,
      recu: existing.find((i) => i.type === 'recu') ?? null,
    };
  }

  const transaction = await prisma.transaction.findUnique({ where: { id: params.transactionId } });

  const details = JSON.stringify({
    emetteur: { nom: 'IBIG DocPro', site: 'docpro.ibigsoft.com', email: 'docpro@ibigsoft.com' },
    client: { nom: order.user.name, email: order.user.email, pays: order.billingCountry },
    commande: order.number,
    transaction: transaction?.internalRef ?? params.transactionId,
    moyenPaiement: order.paymentMethod ?? 'moneroo',
    forfait: order.plan?.name ?? null,
    documentId: order.documentId ?? null,
  });

  const base = {
    orderId: order.id,
    userId: order.userId,
    amount: order.amount,
    discount: order.discount,
    tax: order.tax,
    total: order.total,
    currency: order.currency,
    periodStart: order.planId ? (params.periodStart ?? null) : null,
    periodEnd: order.planId ? (params.periodEnd ?? null) : null,
    detailsJson: details,
  };

  const facture = await createInvoiceWithNumber('facture', 'FAC', base);
  const recu = await createInvoiceWithNumber('recu', 'REC', base);
  return { facture, recu };
}
