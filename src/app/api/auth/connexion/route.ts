// POST /api/auth/connexion — vérification des identifiants + ouverture de session.
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { createSession } from '@/lib/auth';
import { encodePending2fa, PENDING_2FA_COOKIE, PENDING_2FA_MAX_AGE } from '@/lib/totp';
import { makeUrl } from '@/lib/redirect';
import { notifyUser } from '@/lib/notify';

function back(req: Request, code: string) {
  return NextResponse.redirect(makeUrl(`/connexion?erreur=${code}`), 303);
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
      const res = NextResponse.redirect(makeUrl('/connexion/2fa'), 303);
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

    // Notification sécurité — best-effort, ne bloque pas la connexion
    void notifyUser({
      userId: user.id,
      event: 'connexion_nouvelle',
      title: 'Nouvelle connexion à votre compte',
      body: 'Une connexion a été effectuée sur votre compte IBIG DocPro.',
      vars: {
        date: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Abidjan' }),
        ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'inconnue',
        device: req.headers.get('user-agent')?.slice(0, 80) ?? 'inconnu',
      },
    }).catch(() => {});

    const nextParam = new URL(req.url).searchParams.get('next') ?? '';
    if (nextParam.startsWith('/') && !nextParam.startsWith('//')) {
      return NextResponse.redirect(makeUrl(nextParam), 303);
    }
    const destination = user.role === 'admin' || user.role === 'superadmin' ? '/admin' : '/compte';
    return NextResponse.redirect(makeUrl(destination), 303);
  } catch {
    return back(req, 'erreur_serveur');
  }
}
