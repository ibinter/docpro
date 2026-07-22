// Gestion des clés API partenaires (session utilisateur requise).
// POST   /api/apikeys { label }  → { id, key (claire, montrée UNE fois), prefix, label }
// DELETE /api/apikeys { id }     → révocation (active: false) — jamais de suppression.
// GET    /api/apikeys            → liste des clés du compte (sans hash).
import { NextResponse } from 'next/server';
import { requireUser, AuthError } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { generateApiKey } from '@/lib/apikey';

export const dynamic = 'force-dynamic';

const MAX_KEYS_PER_USER = 10;

function handleError(e: unknown) {
  if (e instanceof AuthError) {
    return NextResponse.json({ error: e.message }, { status: e.status });
  }
  console.error('[apikeys] erreur :', e);
  return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
}

export async function GET() {
  try {
    const user = await requireUser();
    const keys = await prisma.apiKey.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, label: true, prefix: true, active: true,
        callCount: true, lastUsedAt: true, createdAt: true,
      },
    });
    return NextResponse.json({ keys });
  } catch (e) {
    return handleError(e);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json().catch(() => null)) as { label?: unknown } | null;
    const label = typeof body?.label === 'string' ? body.label.trim().slice(0, 80) : '';
    if (!label) {
      return NextResponse.json({ error: 'Le libellé de la clé est requis.' }, { status: 400 });
    }

    const activeCount = await prisma.apiKey.count({ where: { userId: user.id, active: true } });
    if (activeCount >= MAX_KEYS_PER_USER) {
      return NextResponse.json(
        { error: `Limite de ${MAX_KEYS_PER_USER} clés actives atteinte. Révoquez une clé avant d'en créer une nouvelle.` },
        { status: 400 }
      );
    }

    const { clear, hash, prefix } = generateApiKey();
    const created = await prisma.apiKey.create({
      data: { userId: user.id, label, keyHash: hash, prefix },
    });

    // La clé claire n'est JAMAIS stockée : c'est la seule fois où elle est transmise.
    return NextResponse.json(
      { id: created.id, key: clear, prefix: created.prefix, label: created.label },
      { status: 201 }
    );
  } catch (e) {
    return handleError(e);
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json().catch(() => null)) as { id?: unknown } | null;
    const id =
      typeof body?.id === 'string' ? body.id : new URL(req.url).searchParams.get('id') ?? '';
    if (!id) {
      return NextResponse.json({ error: 'Identifiant de clé requis.' }, { status: 400 });
    }

    const key = await prisma.apiKey.findUnique({ where: { id } });
    if (!key || key.userId !== user.id) {
      return NextResponse.json({ error: 'Clé introuvable.' }, { status: 404 });
    }

    await prisma.apiKey.update({ where: { id }, data: { active: false } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return handleError(e);
  }
}
