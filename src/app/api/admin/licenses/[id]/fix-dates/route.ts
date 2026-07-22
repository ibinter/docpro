// POST /api/admin/licenses/[id]/fix-dates — correction de dates.
// SUPERADMIN uniquement — avant/après consignés au journal d'audit (CDC §17.2).
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { apiError, readJson, requiredString } from '@/app/api/admin/_utils';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireRole('superadmin');
    const { id } = await params;
    const body = await readJson(req);
    const reason = requiredString(body, 'reason');
    if (!reason) return NextResponse.json({ error: 'Motif obligatoire' }, { status: 400 });

    const startRaw = typeof body.startDate === 'string' ? body.startDate : '';
    const endRaw = typeof body.endDate === 'string' ? body.endDate : '';
    if (!startRaw && !endRaw) {
      return NextResponse.json({ error: 'Au moins une date (début ou fin) est requise' }, { status: 400 });
    }
    const startDate = startRaw ? new Date(startRaw) : undefined;
    const endDate = endRaw ? new Date(endRaw) : undefined;
    if ((startDate && isNaN(startDate.getTime())) || (endDate && isNaN(endDate.getTime()))) {
      return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
    }
    if (startDate && endDate && endDate <= startDate) {
      return NextResponse.json({ error: 'La date de fin doit être postérieure à la date de début' }, { status: 400 });
    }

    const license = await prisma.license.findUnique({ where: { id } });
    if (!license) return NextResponse.json({ error: 'Licence introuvable' }, { status: 404 });

    const before = { startDate: license.startDate, endDate: license.endDate };
    const updated = await prisma.license.update({
      where: { id },
      data: {
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),
      },
    });
    await prisma.licenseEvent.create({
      data: {
        licenseId: id,
        type: 'correction_dates',
        actorId: admin.id,
        reason,
        detailsJson: JSON.stringify({ before, after: { startDate: updated.startDate, endDate: updated.endDate } }),
      },
    });
    await audit({
      actorId: admin.id,
      action: 'license.fix_dates',
      entityType: 'License',
      entityId: id,
      before,
      after: { startDate: updated.startDate, endDate: updated.endDate },
      reason,
    });
    return NextResponse.json({ ok: true, license: updated });
  } catch (e) {
    return apiError(e);
  }
}
