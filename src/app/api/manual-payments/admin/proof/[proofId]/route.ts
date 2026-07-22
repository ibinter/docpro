// GET /api/manual-payments/admin/proof/[proofId] — Sert le FICHIER de preuve
// depuis le stockage privé (private-uploads/). RBAC admin + journalisation de
// CHAQUE consultation via audit() action 'proof.view' (CDC §14.1).
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { readStoredProof } from '@/lib/proofs';
import { errorResponse, notFoundJson } from '../../../_utils';

export async function GET(req: NextRequest, ctx: { params: Promise<{ proofId: string }> }) {
  try {
    const admin = await requireRole('admin');
    const { proofId } = await ctx.params;

    const proof = await prisma.paymentProof.findUnique({ where: { id: proofId } });
    if (!proof) return notFoundJson('Preuve introuvable.');

    let buffer: Buffer;
    try {
      buffer = await readStoredProof(proof.storedName);
    } catch {
      return notFoundJson('Fichier de preuve absent du stockage.');
    }

    // Journalisation obligatoire de chaque consultation
    await audit({
      actorId: admin.id,
      action: 'proof.view',
      entityType: 'PaymentProof',
      entityId: proof.id,
      after: { transactionId: proof.transactionId, storedName: proof.storedName },
      ip: req.headers.get('x-forwarded-for') ?? undefined,
    });

    const safeName = proof.originalName.replace(/[^\w.\- ]+/g, '_');
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': proof.mimeType,
        'Content-Length': String(buffer.length),
        'Content-Disposition': `inline; filename="${safeName}"`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err) {
    return errorResponse(err);
  }
}
