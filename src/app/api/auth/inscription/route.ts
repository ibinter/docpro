// POST /api/auth/inscription — création de compte client + ouverture de session.
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { createSession } from '@/lib/auth';
import { findReferrerByCode } from '@/lib/affiliate';
import { ALL_COUNTRY_CODES } from '@/components/public/countries';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ().-]{8,20}$/;

function back(req: Request, code: string) {
  return NextResponse.redirect(new URL(`/inscription?erreur=${code}`, req.url), 303);
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return back(req, 'champs_manquants');
  }

  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  const password = String(form.get('password') ?? '');
  const country = String(form.get('country') ?? '').trim().toUpperCase();
  const phone = String(form.get('phone') ?? '').trim();

  // Validation serveur stricte
  if (!name || !email || !password || !country || !phone) return back(req, 'champs_manquants');
  if (name.length < 2 || name.length > 120) return back(req, 'nom_invalide');
  if (!EMAIL_RE.test(email) || email.length > 190) return back(req, 'email_invalide');
  if (password.length < 8 || password.length > 100) return back(req, 'mdp_court');
  if (!ALL_COUNTRY_CODES.includes(country)) return back(req, 'pays_invalide');
  if (!PHONE_RE.test(phone)) return back(req, 'telephone_invalide');

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return back(req, 'email_utilise');

    // Programme affilié (CDC §7.3) : cookie 'docpro_ref' posé par
    // GET /api/affiliate/track?code=X → rattachement du filleul à son parrain.
    let referredById: string | null = null;
    const refCode = (await cookies()).get('docpro_ref')?.value;
    if (refCode) {
      const referrer = await findReferrerByCode(refCode);
      if (referrer) referredById = referrer.id;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        country,
        phone,
        language: 'fr',
        role: 'client',
        ...(referredById ? { referredById } : {}),
      },
    });

    await createSession(user.id, user.role);
    // `next` : chemin interne uniquement (ex. /rejoindre/[token] — invitation d'organisation).
    const next = String(form.get('next') ?? '');
    const dest = next.startsWith('/') && !next.startsWith('//') ? next : '/compte';
    return NextResponse.redirect(new URL(dest, req.url), 303);
  } catch {
    return back(req, 'erreur_serveur');
  }
}
