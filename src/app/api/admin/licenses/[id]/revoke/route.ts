// POST /api/admin/licenses/[id]/revoke — révocation définitive (motif obligatoire).
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
    if (!reason) return NextResponse.json({ error: 'Motif obligatoire' }, { status: 400 });

    const license = await prisma.license.findUnique({ where: { id } });
    if (!license) return NextResponse.json({ error: 'Licence introuvable' }, { status: 404 });
    if (license.status === 'revoquee') {
      return NextResponse.json({ error: 'Licence déjà révoquée' }, { status: 400 });
    }

    const before = { status: license.status };
    const updated = await prisma.license.update({
      where: { id },
      data: { status: 'revoquee', revokedReason: reason },
    });
    await prisma.licenseEvent.create({
      data: { licenseId: id, type: 'revocation', actorId: admin.id, reason },
    });
    await audit({
      actorId: admin.id,
      action: 'license.revoke',
      entityType: 'License',
      entityId: id,
      before,
      after: { status: 'revoquee' },
      reason,
    });
    await notifyUser({
      userId: license.userId,
      event: 'licence_revoquee',
      title: 'Licence révoquée',
      body: `Votre licence a été révoquée. Motif : ${reason}`,
    });
    return NextResponse.json({ ok: true, license: updated });
  } catch (e) {
    return apiError(e);
  }
}
