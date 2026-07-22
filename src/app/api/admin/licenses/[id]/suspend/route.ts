// POST /api/admin/licenses/[id]/suspend — suspension via lib/license.suspendLicense (motif obligatoire).
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { suspendLicense } from '@/lib/license';
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
    if (license.status === 'suspendue') {
      return NextResponse.json({ error: 'Licence déjà suspendue' }, { status: 400 });
    }

    const updated = await suspendLicense(id, reason, admin.id);
    return NextResponse.json({ ok: true, license: updated });
  } catch (e) {
    return apiError(e);
  }
}
