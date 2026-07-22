// POST /api/auth/connexion — vérification des identifiants + ouverture de session.
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { createSession } from '@/lib/auth';
import { encodePending2fa, PENDING_2FA_COOKIE, PENDING_2FA_MAX_AGE } from '@/lib/totp';

function back(req: Request, code: string) {
  return NextResponse.redirect(new URL(`/connexion?erreur=${code}`, req.url), 303);
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return back(req, 'champs_manquants');
  }

  const email = String(form.get('email') ?? '').trim().toLowerCase();
  const password = String(form.get('password') ?? '');
  if (!email || !password) return back(req, 'champs_manquants');

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    // Comparaison même si l'utilisateur n'existe pas → temps de réponse constant.
    const hash = user?.passwordHash ?? '$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinva';
    const ok = await bcrypt.compare(password, hash);
    if (!user || !ok) return back(req, 'identifiants');

    // 2FA TOTP activé (CDC §19.1) : pas de session tout de suite — cookie temporaire
    // signé de 5 minutes puis vérification du code sur /connexion/2fa.
    if (user.totpEnabled) {
      const token = encodePending2fa({
        uid: user.id,
        fails: 0,
        exp: Math.floor(Date.now() / 1000) + PENDING_2FA_MAX_AGE,
      });
      const res = NextResponse.redirect(new URL('/connexion/2fa', req.url), 303);
      res.cookies.set(PENDING_2FA_COOKIE, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: PENDING_2FA_MAX_AGE,
        path: '/',
      });
      return res;
    }

    await createSession(user.id, user.role);
    const destination = user.role === 'admin' || user.role === 'superadmin' ? '/admin' : '/compte';
    return NextResponse.redirect(new URL(destination, req.url), 303);
  } catch {
    return back(req, 'erreur_serveur');
  }
}
