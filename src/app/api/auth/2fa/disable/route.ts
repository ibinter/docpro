// POST /api/auth/2fa/disable {code} — désactive la 2FA (un code TOTP valide est requis).
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

  if (!user.totpEnabled || !user.totpSecret) return back(req, '?erreur=non_active');

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

  await prisma.user.update({
    where: { id: user.id },
    data: { totpEnabled: false, totpSecret: null },
  });
  await audit({
    actorId: user.id,
    action: '2fa.disable',
    entityType: 'User',
    entityId: user.id,
    before: { totpEnabled: true },
    after: { totpEnabled: false },
  });
  await notifyUser({
    userId: user.id,
    event: '2fa_desactivee',
    title: 'Double authentification désactivée',
    body: 'La vérification en deux étapes (TOTP) a été désactivée sur votre compte. Si vous n’êtes pas à l’origine de cette action, changez immédiatement votre mot de passe.',
  });

  return back(req, '?ok=desactivee');
}
