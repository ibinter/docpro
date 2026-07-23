// POST /api/auth/2fa/verify {code} — 2e étape de connexion.
// Lit le cookie temporaire signé 'docpro_2fa_pending' (5 min), vérifie le code TOTP,
// puis crée la session (createSession — API publique de @/lib/auth).
// 3 échecs → cookie supprimé, retour à /connexion.
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { createSession } from '@/lib/auth';
import {
import { makeUrl } from '@/lib/redirect';
  decodePending2fa,
  encodePending2fa,
  PENDING_2FA_COOKIE,
  PENDING_2FA_MAX_FAILS,
  verifyTotp,
} from '@/lib/totp';

export async function POST(req: Request) {
  const store = await cookies();
  const token = store.get(PENDING_2FA_COOKIE)?.value;
  const pending = token ? decodePending2fa(token) : null;

  // Cookie absent, falsifié ou expiré → on repart de la connexion classique.
  if (!pending) {
    store.delete(PENDING_2FA_COOKIE);
    return NextResponse.redirect(makeUrl('/connexion'), 303);
  }

  const user = await prisma.user.findUnique({ where: { id: pending.uid } });
  if (!user || !user.totpEnabled || !user.totpSecret) {
    store.delete(PENDING_2FA_COOKIE);
    return NextResponse.redirect(makeUrl('/connexion'), 303);
  }

  let code = '';
  try {
    const form = await req.formData();
    code = String(form.get('code') ?? '').replace(/\D/g, '');
  } catch {
    /* formulaire illisible → traité comme un code invalide */
  }

  if (verifyTotp(user.totpSecret, code)) {
    await createSession(user.id, user.role);
    store.delete(PENDING_2FA_COOKIE);
    const destination = user.role === 'admin' || user.role === 'superadmin' ? '/admin' : '/compte';
    return NextResponse.redirect(makeUrl(destination), 303);
  }

  // Échec : compteur dans le cookie signé — 3 tentatives maximum.
  const fails = pending.fails + 1;
  if (fails >= PENDING_2FA_MAX_FAILS) {
    store.delete(PENDING_2FA_COOKIE);
    return NextResponse.redirect(makeUrl('/connexion/2fa?verrouille=1'), 303);
  }

  const remainingSeconds = Math.max(1, Math.floor(pending.exp - Date.now() / 1000));
  store.set(PENDING_2FA_COOKIE, encodePending2fa({ ...pending, fails }), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: remainingSeconds,
    path: '/',
  });
  return NextResponse.redirect(makeUrl('/connexion/2fa?erreur=code_invalide'), 303);
}
