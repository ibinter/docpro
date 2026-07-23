// POST /api/admin/licenses/[id]/extend — prolongation (durée + motif obligatoires).
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { audit } from '@/lib/audit';
import { notifyUser } from '@/lib/notify';
import { apiError, readJson, requiredString } from '@/app/api/admin/_utils';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireRole('admin');
    const { id } = await params;
    const body = await readJson(req);
    const reason = requiredString(body, 'reason');
    const days = typeof body.days === 'number' ? Math.floor(body.days) : NaN;
    if (!reason) return NextResponse.json({ error: 'Motif obligatoire' }, { status: 400 });
    if (!days || days < 1 || days > 3650) return NextResponse.json({ error: 'Durée invalide (entre 1 et 3650 jours).' }, { status: 400 })
    if (!Number.isFinite(days) || days < 1) {
      return NextResponse.json({ error: 'Durée (jours) invalide' }, { status: 400 });
    }

    const license = await prisma.license.findUnique({ where: { id } });
    if (!license) return NextResponse.json({ error: 'Licence introuvable' }, { status: 404 });

    const now = new Date();
    // Pas de perte de jours : on prolonge depuis la fin actuelle si elle est future.
    const base = license.endDate && license.endDate > now ? license.endDate : now;
    const endDate = new Date(base.getTime() + days * 86400_000);
    const before = { status: license.status, endDate: license.endDate };

    const updated = await prisma.license.update({
      where: { id },
      data: { endDate, status: license.status === 'expiree' || license.status === 'grace' ? 'active' : license.status, graceUntil: null },
    });
    await prisma.licenseEvent.create({
      data: {
        licenseId: id,
        type: 'prolongation',
        actorId: admin.id,
        reason,
        detailsJson: JSON.stringify({ days, from: base, endDate }),
      },
    });
    await audit({
      actorId: admin.id,
      action: 'license.extend',
      entityType: 'License',
      entityId: id,
      before,
      after: { status: updated.status, endDate },
      reason,
    });
    await notifyUser({
      userId: license.userId,
      event: 'licence_prolongee',
      title: 'Licence prolongée',
      body: `Votre licence est prolongée de ${days} jour(s), jusqu'au ${endDate.toLocaleDateString('fr-FR')}.`,
    });
    return NextResponse.json({ ok: true, license: updated });
  } catch (e) {
    return apiError(e);
  }
}
