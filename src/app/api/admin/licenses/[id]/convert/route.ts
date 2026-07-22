// POST /api/admin/licenses/[id]/convert — conversion provisoire → définitive
// via activateLicenseForOrder sur la commande liée (CDC §15.2 : jamais de 2e licence).
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { activateLicenseForOrder } from '@/lib/license';
import { apiError, readJson, requiredString } from '@/app/api/admin/_utils';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireRole('admin');
    const { id } = await params;
    const body = await readJson(req);
    const reason = requiredString(body, 'reason');
    if (!reason) return NextResponse.json({ error: 'Motif obligatoire' }, { status: 400 });

    const license = await prisma.license.findUnique({ where: { id } });
    if (!license) return NextResponse.json({ error: 'Licence introuvable' }, { status: 404 });
    if (license.status !== 'provisoire') {
      return NextResponse.json({ error: 'Seule une licence provisoire peut être convertie' }, { status: 400 });
    }
    if (!license.orderId) {
      return NextResponse.json({ error: 'Aucune commande liée — conversion impossible' }, { status: 400 });
    }

    const txn = await prisma.transaction.findFirst({
      where: { orderId: license.orderId },
      orderBy: { createdAt: 'desc' },
    });
    const result = await activateLicenseForOrder({
      orderId: license.orderId,
      transactionId: txn?.id ?? 'conversion_manuelle',
      actorId: admin.id,
      reason,
    });
    return NextResponse.json({ ok: true, license: result.license });
  } catch (e) {
    return apiError(e);
  }
}
