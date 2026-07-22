// POST /api/manual-payments/admin/[transactionId]/request-info — Demande de complément.
// Body JSON : { message } → preuves 'complement_demande', transaction 'complement_demande',
// commande 'informations_manquantes', notification client, audit.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { notifyUser } from '@/lib/notify';
import { errorResponse, badRequest, notFoundJson } from '../../../_utils';

export async function POST(req: NextRequest, ctx: { params: Promise<{ transactionId: string }> }) {
  try {
    const admin = await requireRole('admin');
    const { transactionId } = await ctx.params;
    const body = await req.json().catch(() => ({}));
    const message: string = typeof body.message === 'string' ? body.message.trim() : '';
    if (!message) return badRequest('Le message au client est obligatoire.');

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { order: true },
    });
    if (!transaction) return notFoundJson('Transaction introuvable.');
    if (!['a_verifier', 'complement_demande'].includes(transaction.status)) {
      return badRequest(`Demande de complément impossible (statut actuel : ${transaction.status}).`);
    }

    await prisma.$transaction(async (tx) => {
      await tx.transaction.update({
        where: { id: transaction.id },
        data: { status: 'complement_demande' },
      });
      await tx.paymentProof.updateMany({
        where: { transactionId: transaction.id, status: { notIn: ['rejetee', 'validee'] } },
        data: { status: 'complement_demande', adminComment: message },
      });
      await tx.order.update({
        where: { id: transaction.orderId },
        data: { status: 'informations_manquantes' },
      });
    });

    await audit({
      actorId: admin.id,
      action: 'proof.request_info',
      entityType: 'Transaction',
      entityId: transaction.id,
      after: { status: 'complement_demande', message },
    });
    await notifyUser({
      userId: transaction.userId,
      event: 'complement_demande',
      title: 'Complément d’information demandé',
      body: `Concernant votre paiement (commande ${transaction.order.number}) : ${message}. Vous pouvez ajouter une nouvelle preuve depuis la page de suivi de votre paiement.`,
    });

    return NextResponse.json({ ok: true, transactionId: transaction.id, status: 'complement_demande' });
  } catch (err) {
    return errorResponse(err);
  }
}
