// POST /api/manual-payments/admin/[transactionId]/provisional — Activation provisoire (CDC §15.2).
// Body JSON : { days, reason } — motif OBLIGATOIRE, days ≤ 7, jamais automatique.
// Passe par activateLicenseForOrder({ provisional: true }) — cœur commun, jamais réimplémenté.
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { activateLicenseForOrder } from '@/lib/license';
import { errorResponse, badRequest, notFoundJson } from '../../../_utils';

export async function POST(req: NextRequest, ctx: { params: Promise<{ transactionId: string }> }) {
  try {
    const admin = await requireRole('admin');
    const { transactionId } = await ctx.params;
    const body = await req.json().catch(() => ({}));

    const reason: string = typeof body.reason === 'string' ? body.reason.trim() : '';
    if (!reason) return badRequest("Le motif de l'activation provisoire est obligatoire.");
    const days = Math.round(Number(body.days));
    if (!Number.isFinite(days) || days < 1 || days > 7) {
      return badRequest('Durée invalide : entre 1 et 7 jours maximum.');
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { order: true },
    });
    if (!transaction) return notFoundJson('Transaction introuvable.');
    if (!transaction.order.planId) {
      return badRequest('Commande sans forfait — activation provisoire impossible.');
    }
    if (!['a_verifier', 'complement_demande'].includes(transaction.status)) {
      return badRequest(`Activation provisoire impossible (statut actuel : ${transaction.status}).`);
    }

    const result = await activateLicenseForOrder({
      orderId: transaction.orderId,
      transactionId: transaction.id,
      actorId: admin.id,
      provisional: true,
      provisionalDays: days,
      reason,
    });

    await audit({
      actorId: admin.id,
      action: 'license.provisional_grant',
      entityType: 'Transaction',
      entityId: transaction.id,
      after: { licenseId: result.license.id, days },
      reason,
    });

    return NextResponse.json({
      ok: true,
      transactionId: transaction.id,
      licenseId: result.license.id,
      provisionalUntil: result.license.provisionalUntil,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
