// POST /api/auth/2fa/setup — génère un secret TOTP (stocké NON activé) pour l'utilisateur
// connecté, puis retour sur /compte/securite qui affiche le QR + le secret.
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { AuthError, requireUser } from '@/lib/auth';
import { generateSecret } from '@/lib/totp';
import { makeUrl } from '@/lib/redirect';

function back(req: Request, params = '') {
  return NextResponse.redirect(makeUrl(`/compte/securite${params}`), 303);
}

export async function POST(req: Request) {
  let user;
  try {
    user = await requireUser();
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.redirect(makeUrl('/connexion'), 303);
    throw e;
  }

  if (user.totpEnabled) return back(req, '?erreur=deja_active');

  const secret = generateSecret();
  await prisma.user.update({ where: { id: user.id }, data: { totpSecret: secret, totpEnabled: false } });
  return back(req, '?ok=secret');
}
