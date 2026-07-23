import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import { apiError, readJson } from '@/app/api/admin/_utils';

const VALID_STATUSES = ['nouveau', 'contacte', 'qualifie', 'demo_planifiee', 'converti', 'perdu'];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('admin');
    const { id } = await params;
    const body = await readJson(req);
    const update: Record<string, unknown> = {};

    if (body.status !== undefined) {
      if (!VALID_STATUSES.includes(String(body.status))) {
        return NextResponse.json({ error: 'Statut invalide.' }, { status: 400 });
      }
      update.status = String(body.status);
    }
    if (body.notesAdmin !== undefined) {
      update.notesAdmin = String(body.notesAdmin).trim() || null;
    }
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'Aucun champ à mettre à jour.' }, { status: 400 });
    }

    const demo = await prisma.demoRequest.update({ where: { id }, data: update });
    return NextResponse.json({ ok: true, demo });
  } catch (e) {
    return apiError(e);
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole('admin');
    const { id } = await params;
    await prisma.demoRequest.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return apiError(e);
  }
}
