// POST /api/manual-payments/admin/[transactionId]/flag — Marquer doublon / suspect (CDC §14.2).
// Body JSON : { type: 'doublon' | 'suspect', reason } → FraudAlert + audit.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { errorResponse, badRequest, notFoundJson } from '../../../_utils';

export async function POST(req: NextRequest, ctx: { params: Promise<{ transactionId: string }> }) {
  try {
    const admin = await requireRole('admin');
    const { transactionId } = await ctx.params;
    const body = await req.json().catch(() => ({}));

    const type: string = typeof body.type === 'string' ? body.type : '';
    const reason: string = typeof body.reason === 'string' ? body.reason.trim() : '';
    if (!['doublon', 'suspect'].includes(type)) {
      return badRequest("Type invalide : 'doublon' ou 'suspect' attendu.");
    }
    if (!reason) return badRequest('Le motif est obligatoire.');

    const transaction = await prisma.transaction.findUnique({ where: { id: transactionId } });
    if (!transaction) return notFoundJson('Transaction introuvable.');

    const alert = await prisma.fraudAlert.create({
      data: {
        transactionId: transaction.id,
        userId: transaction.userId,
        type,
        severity: 'elevee',
        message: reason,
        status: 'ouverte',
        reviewedById: admin.id,
      },
    });

    await audit({
      actorId: admin.id,
      action: type === 'doublon' ? 'transaction.flag_duplicate' : 'transaction.flag_suspect',
      entityType: 'Transaction',
      entityId: transaction.id,
      after: { fraudAlertId: alert.id, type },
      reason,
    });

    return NextResponse.json({ ok: true, fraudAlertId: alert.id, type });
  } catch (err) {
    return errorResponse(err);
  }
}
