// GET /api/affiliate/track?code=X — point d'entrée des liens de parrainage.
// Code valide → cookie 'docpro_ref' httpOnly 30 jours + redirection vers /.
// Code inconnu → redirection vers / sans cookie.
import { NextResponse } from 'next/server';
import { findReferrerByCode } from '@/lib/affiliate';

const REF_COOKIE = 'docpro_ref';
const REF_MAX_AGE = 60 * 60 * 24 * 30; // 30 jours

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = (url.searchParams.get('code') ?? '').trim().toUpperCase();

  const res = NextResponse.redirect(new URL('/', req.url), 303);
  if (code) {
    const referrer = await findReferrerByCode(code);
    if (referrer) {
      res.cookies.set(REF_COOKIE, referrer.referralCode!, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: REF_MAX_AGE,
        path: '/',
      });
    }
  }
  return res;
}
