// POST /api/manual-payments/admin/[transactionId]/reject — Rejet d'une preuve (motif OBLIGATOIRE).
// Body JSON : { reason } → transaction 'rejetee', preuves 'rejetee', commande 'rejetee',
// audit + notification client avec le motif.
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
    const reason: string = typeof body.reason === 'string' ? body.reason.trim() : '';
    if (!reason) return badRequest('Le motif de rejet est obligatoire.');

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { order: true },
    });
    if (!transaction) return notFoundJson('Transaction introuvable.');
    if (!['a_verifier', 'complement_demande'].includes(transaction.status)) {
      return badRequest(`Transaction non rejetable (statut actuel : ${transaction.status}).`);
    }

    await prisma.$transaction(async (tx) => {
      await tx.transaction.update({
        where: { id: transaction.id },
        data: { status: 'rejetee', rejectReason: reason, validatedById: admin.id },
      });
      await tx.paymentProof.updateMany({
        where: { transactionId: transaction.id },
        data: { status: 'rejetee', adminComment: reason },
      });
      await tx.order.update({ where: { id: transaction.orderId }, data: { status: 'rejetee' } });
    });

    await audit({
      actorId: admin.id,
      action: 'proof.reject',
      entityType: 'Transaction',
      entityId: transaction.id,
      before: { status: transaction.status },
      after: { status: 'rejetee' },
      reason,
    });
    await notifyUser({
      userId: transaction.userId,
      event: 'preuve_rejetee',
      title: 'Preuve de paiement rejetée',
      body: `Votre preuve de paiement (commande ${transaction.order.number}) a été rejetée. Motif : ${reason}. Vous pouvez contacter notre support pour plus d'informations.`,
    });

    return NextResponse.json({ ok: true, transactionId: transaction.id, status: 'rejetee' });
  } catch (err) {
    return errorResponse(err);
  }
}
