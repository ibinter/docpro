// POST /api/auth/2fa/enable {code} — active la 2FA après vérification d'un premier code TOTP.
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { AuthError, requireUser } from '@/lib/auth';
import { verifyTotp } from '@/lib/totp';
import { audit } from '@/lib/audit';
import { notifyUser } from '@/lib/notify';

function back(req: Request, params = '') {
  return NextResponse.redirect(new URL(`/compte/securite${params}`, req.url), 303);
}

export async function POST(req: Request) {
  let user;
  try {
    user = await requireUser();
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.redirect(new URL('/connexion', req.url), 303);
    throw e;
  }

  if (user.totpEnabled) return back(req, '?erreur=deja_active');
  if (!user.totpSecret) return back(req, '?erreur=pas_de_secret');

  let code = '';
  try {
    const form = await req.formData();
    code = String(form.get('code') ?? '').replace(/\D/g, '');
  } catch {
    return back(req, '?erreur=code_invalide');
  }

  if (!verifyTotp(user.totpSecret, code)) return back(req, '?erreur=code_invalide');

  // TODO anti-replay TOTP: le champ totpLastCode n'existe pas encore dans le schema Prisma.
  // Ajouter `totpLastCode String?` au model User, puis décommenter le bloc suivant :
  // if (user.totpLastCode === code) {
  //   return NextResponse.json({ error: 'Code déjà utilisé' }, { status: 400 });
  // }

  await prisma.user.update({ where: { id: user.id }, data: { totpEnabled: true } });
  await audit({
    actorId: user.id,
    action: '2fa.enable',
    entityType: 'User',
    entityId: user.id,
    before: { totpEnabled: false },
    after: { totpEnabled: true },
  });
  await notifyUser({
    userId: user.id,
    event: '2fa_activee',
    title: 'Double authentification activée',
    body: 'La vérification en deux étapes (TOTP) est désormais active sur votre compte. Un code de votre application d’authentification sera demandé à chaque connexion.',
  });

  return back(req, '?ok=activee');
}
