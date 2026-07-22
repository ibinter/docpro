// GET /api/payments/orders/[id]/status — statut réel côté serveur (jamais de
// confiance dans le retour client, CDC §10). Utilisé par la page de retour (poll).
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { handleApiError, jsonError } from '@/lib/billing/http';

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await ctx.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        plan: true,
        license: true,
        transactions: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });
    if (!order) return jsonError('Commande introuvable', 404);
    const isAdmin = user.role === 'admin' || user.role === 'superadmin';
    if (order.userId !== user.id && !isAdmin) return jsonError('Accès refusé', 403);

    const lastTx = order.transactions[0] ?? null;

    // Lien de téléchargement (achat de document à l'unité déjà payé)
    let downloadUrl: string | null = null;
    if (order.documentId && order.status === 'payee') {
      const link = await prisma.downloadLink.findFirst({
        where: { documentId: order.documentId, expiresAt: { gt: new Date() } },
        orderBy: { createdAt: 'desc' },
      });
      if (link) downloadUrl = `/api/documents/download/${link.token}`;
    }

    return NextResponse.json({
      orderId: order.id,
      number: order.number,
      status: order.status,
      total: order.total,
      currency: order.currency,
      planCode: order.plan?.code ?? null,
      planName: order.plan?.name ?? null,
      documentId: order.documentId,
      licenseStatus: order.license?.status ?? null,
      lastTransactionStatus: lastTx?.status ?? null,
      downloadUrl,
    });
  } catch (e) {
    return handleApiError(e);
  }
}
