// GET /api/manual-payments/admin/queue — File de validation manuelle (CDC §14.2).
// RBAC : admin minimum. Retourne les transactions 'a_verifier' / 'complement_demande'.
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { errorResponse } from '../../_utils';

export async function GET() {
  try {
    await requireRole('admin');

    const transactions = await prisma.transaction.findMany({
      where: { status: { in: ['a_verifier', 'complement_demande'] } },
      orderBy: { createdAt: 'asc' }, // premier arrivé, premier traité
      include: {
        user: { select: { name: true, email: true, country: true } },
        order: { include: { plan: { select: { name: true } } } },
        proofs: { select: { id: true, originalName: true, sizeBytes: true, status: true }, orderBy: { createdAt: 'asc' } },
      },
    });

    const ids = transactions.map((t) => t.id);
    const alerts = ids.length
      ? await prisma.fraudAlert.findMany({
          where: { transactionId: { in: ids } },
          orderBy: { createdAt: 'asc' },
        })
      : [];
    const alertsByTx = new Map<string, { type: string; message: string; severity: string }[]>();
    for (const a of alerts) {
      if (!a.transactionId) continue;
      const list = alertsByTx.get(a.transactionId) ?? [];
      list.push({ type: a.type, message: a.message, severity: a.severity });
      alertsByTx.set(a.transactionId, list);
    }

    const queue = transactions.map((t) => ({
      id: t.id,
      status: t.status,
      internalRef: t.internalRef,
      client: {
        name: t.user.name,
        email: t.user.email,
        country: t.user.country,
      },
      order: {
        number: t.order.number,
        total: t.order.total,
        currency: t.order.currency,
        planName: t.order.plan?.name ?? null,
      },
      amountDeclared: t.amountDeclared,
      provider: t.provider,
      method: t.method,
      externalRef: t.externalRef,
      proofs: t.proofs.map((p) => ({
        id: p.id,
        originalName: p.originalName,
        sizeBytes: p.sizeBytes,
        status: p.status,
      })),
      fraudAlerts: alertsByTx.get(t.id) ?? [],
      createdAt: t.createdAt,
    }));

    return NextResponse.json(queue);
  } catch (err) {
    return errorResponse(err);
  }
}
