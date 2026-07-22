// Page d'inscription — création de compte client.
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import { COUNTRIES_AFRIQUE_FR, COUNTRIES_AUTRES } from '@/components/public/countries';
import { authErrorMessage } from '@/components/public/authMessages';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Créer un compte — IBIG DocPro',
};

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string; next?: string }>;
}) {
  const { erreur, next } = await searchParams;
  // `next` : chemin interne uniquement (ex. /rejoindre/[token] — invitation d'organisation).
  const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : null;
  const user = await getSessionUser();
  if (user) {
    redirect(safeNext ?? (user.role === 'admin' || user.role === 'superadmin' ? '/admin' : '/compte'));
  }
  const message = authErrorMessage(erreur);

  return (
    <>
      <SiteHeader />
      <main className="container mt-4" style={{ minHeight: '60vh' }}>
        <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.5rem' }}>Créer un compte</h1>
          <p className="text-muted text-small mb-2">
            Gratuit — remplissez votre profil une fois, générez tous vos documents pré-remplis.
          </p>

          {message && <div className="alert alert-danger">{message}</div>}

          <form method="POST" action="/api/auth/inscription">
            {safeNext && <input type="hidden" name="next" value={safeNext} />}
            <div className="field">
              <label className="label" htmlFor="name">Nom complet *</label>
              <input className="input" id="name" name="name" type="text" required minLength={2} maxLength={120} autoComplete="name" placeholder="Ex. : Aïcha Koné" />
            </div>
            <div className="field">
              <label className="label" htmlFor="email">Adresse email *</label>
              <input className="input" id="email" name="email" type="email" required maxLength={190} autoComplete="email" placeholder="vous@exemple.com" />
            </div>
            <div className="field">
              <label className="label" htmlFor="password">Mot de passe *</label>
              <input className="input" id="password" name="password" type="password" required minLength={8} maxLength={100} autoComplete="new-password" />
              <p className="form-hint">8 caractères minimum.</p>
            </div>
            <div className="field">
              <label className="label" htmlFor="country">Pays *</label>
              <select className="select" id="country" name="country" required defaultValue="">
                <option value="" disabled>— Sélectionnez votre pays —</option>
                <optgroup label="Afrique francophone">
                  {COUNTRIES_AFRIQUE_FR.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Autres pays">
                  {COUNTRIES_AUTRES.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="phone">Téléphone *</label>
              <input className="input" id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="Ex. : +225 07 00 00 00 00" />
              <p className="form-hint">Format international recommandé (+225, +221…).</p>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Créer mon compte
            </button>
          </form>

          <p className="text-center text-small mt-2">
            Déjà inscrit&nbsp;? <Link href="/connexion">Connectez-vous</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
