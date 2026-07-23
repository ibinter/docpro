// POST /api/auth/2fa/disable {code} — désactive la 2FA (un code TOTP valide est requis).
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { AuthError, requireUser } from '@/lib/auth';
import { verifyTotp } from '@/lib/totp';
import { audit } from '@/lib/audit';
import { notifyUser } from '@/lib/notify';
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

  if (!user.totpEnabled || !user.totpSecret) return back(req, '?erreur=non_active');

  let code = '';
  try {
    const form = await req.formData();
    code = String(form.get('code') ?? '').replace(/\D/g, '');
  } catch {
    return back(req, '?erreur=code_invalide');
  }

  if (!verifyTotp(user.totpSecret, code)) return back(req, '?erreur=code_invalide');

  // Anti-replay TOTP : rejette un code déjà utilisé dans la même fenêtre de 30s
  if (user.totpLastCode === code) return back(req, '?erreur=code_deja_utilise');

  await prisma.user.update({
    where: { id: user.id },
    data: { totpEnabled: false, totpSecret: null, totpLastCode: code, totpLastCodeAt: new Date() },
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
    event: ‘2fa_desactivee’,
    title: ‘Double authentification désactivée’,
    body: ‘La vérification en deux étapes (TOTP) a été désactivée sur votre compte. Si vous n\’êtes pas à l\’origine de cette action, changez immédiatement votre mot de passe.’,
    vars: { date: new Date().toLocaleString(‘fr-FR’, { timeZone: ‘Africa/Abidjan’ }) },
  });

  return back(req, '?ok=desactivee');
}
