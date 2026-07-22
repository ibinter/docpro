// GET /api/i18n/set?l=fr|en — pose le cookie de langue puis revient à la page d'origine.
import { NextResponse } from 'next/server';
import { LANG_COOKIE } from '@/lib/i18n';

const ONE_YEAR = 60 * 60 * 24 * 365;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = url.searchParams.get('l') === 'en' ? 'en' : 'fr';

  // Retour vers la page d'origine (même origine uniquement — jamais un domaine externe).
  let destination = '/';
  const referer = req.headers.get('referer');
  if (referer) {
    try {
      const ref = new URL(referer);
      if (ref.origin === url.origin) destination = ref.pathname + ref.search;
    } catch {
      /* referer invalide → accueil */
    }
  }

  const res = NextResponse.redirect(new URL(destination, req.url), 303);
  res.cookies.set(LANG_COOKIE, lang, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: ONE_YEAR,
    path: '/',
  });
  return res;
}
