// POST /api/admin/licenses/[id]/activate — activation manuelle (motif obligatoire).
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { notifyUser } from '@/lib/notify';
import { apiError, readJson, requiredString, computeEnd } from '@/app/api/admin/_utils';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireRole('admin');
    const { id } = await params;
    const body = await readJson(req);
    const reason = requiredString(body, 'reason');
    if (!reason) return NextResponse.json({ error: 'Motif obligatoire' }, { status: 400 });

    const license = await prisma.license.findUnique({ where: { id }, include: { plan: true } });
    if (!license) return NextResponse.json({ error: 'Licence introuvable' }, { status: 404 });
    if (license.status === 'active') {
      return NextResponse.json({ error: 'Licence déjà active' }, { status: 400 });
    }
    if (license.status === 'revoquee') {
      return NextResponse.json({ error: 'Licence révoquée — activation impossible' }, { status: 400 });
    }

    const before = { status: license.status, endDate: license.endDate };
    const now = new Date();
    // Suspension/grâce avec date de fin encore valide → réactivation sans toucher aux dates.
    const keepDates = license.endDate != null && license.endDate > now;
    const endDate = keepDates
      ? license.endDate
      : computeEnd(now, license.plan.durationType, license.plan.durationValue);

    const updated = await prisma.license.update({
      where: { id },
      data: {
        status: 'active',
        startDate: keepDates ? license.startDate : now,
        endDate,
        graceUntil: null,
        provisionalUntil: null,
        suspendedReason: null,
      },
    });
    await prisma.licenseEvent.create({
      data: {
        licenseId: id,
        type: license.status === 'suspendue' ? 'reactivation' : 'activation',
        actorId: admin.id,
        reason,
        detailsJson: JSON.stringify({ manual: true, endDate }),
      },
    });
    if (license.orderId) {
      await prisma.order.update({ where: { id: license.orderId }, data: { status: 'payee' } });
    }
    await audit({
      actorId: admin.id,
      action: 'license.activate_manual',
      entityType: 'License',
      entityId: id,
      before,
      after: { status: 'active', endDate },
      reason,
    });
    await notifyUser({
      userId: license.userId,
      event: 'licence_activee',
      title: 'Licence activée',
      body: `Votre licence ${license.plan.name} a été activée par notre équipe.`,
    });
    return NextResponse.json({ ok: true, license: updated });
  } catch (e) {
    return apiError(e);
  }
}
