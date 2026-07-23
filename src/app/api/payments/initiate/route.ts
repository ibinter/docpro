// POST /api/payments/initiate — initialise un paiement électronique (Moneroo simulé).
// Body : { orderId: string, billingCountry?: string }
// Crée une Transaction (provider moneroo, method electronique, status en_cours),
// passe la commande en paiement_en_cours et renvoie l'URL du processeur simulé.
// Réponse : { transactionId, redirectUrl }
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { randomRef } from '@/lib/money';
import { audit } from '@/lib/audit';
import { handleApiError, jsonError, requestMeta } from '@/lib/billing/http';

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json().catch(() => null)) as
      | { orderId?: string; billingCountry?: string }
      | null;
    if (!body?.orderId) return jsonError('orderId requis');

    const order = await prisma.order.findUnique({ where: { id: body.orderId } });
    if (!order) return jsonError('Commande introuvable', 404);
    if (order.userId !== user.id) return jsonError('Accès refusé', 403);
    if (!['en_attente_paiement', 'paiement_en_cours'].includes(order.status)) {
      return jsonError(`Commande non payable (statut : ${order.status})`, 409);
    }
    if (order.expiresAt && order.expiresAt < new Date()) {
      await prisma.order.update({ where: { id: order.id }, data: { status: 'expiree' } });
      return jsonError('Commande expirée — veuillez recommencer votre achat', 410);
    }

    const country = body.billingCountry?.trim().toUpperCase();

    // Guard anti-double-débit : vérifie qu'aucune transaction active n'existe déjà
    const existingTx = await prisma.transaction.findFirst({
      where: { orderId: order.id, status: { in: ['en_cours', 'reussie'] } },
    });
    if (existingTx) {
      return NextResponse.json({ error: 'Paiement déjà initié pour cette commande.' }, { status: 409 });
    }

    const transaction = await prisma.transaction.create({
      data: {
        orderId: order.id,
        userId: user.id,
        provider: 'moneroo',
        method: 'electronique',
        internalRef: randomRef('TXN'),
        amountExpected: order.total,
        currency: order.currency,
        status: 'en_cours',
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'paiement_en_cours',
        paymentMethod: 'moneroo',
        ...(country && /^[A-Z]{2}$/.test(country) ? { billingCountry: country } : {}),
      },
    });

    const { ip } = requestMeta(req);
    await audit({
      actorId: user.id,
      action: 'payment.initiate',
      entityType: 'Transaction',
      entityId: transaction.id,
      after: { orderId: order.id, provider: 'moneroo', amountExpected: order.total, currency: order.currency },
      ip,
    });

    return NextResponse.json({
      transactionId: transaction.id,
      redirectUrl: `/checkout/processor/${transaction.id}`,
    });
  } catch (e) {
    return handleApiError(e);
  }
}
