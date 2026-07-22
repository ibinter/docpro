// POST /api/account/notifications/read — marque toutes les notifications de l'utilisateur comme lues.
import { NextRequest, NextResponse } from 'next/server';
import { requireUser, AuthError } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    await prisma.notification.updateMany({
      where: { userId: user.id, read: false },
      data: { read: true },
    });
    return NextResponse.redirect(new URL('/compte/notifications', req.url), 303);
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.redirect(new URL('/connexion', req.url), 303);
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
