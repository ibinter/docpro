// Étape 2 de la connexion — saisie du code TOTP (CDC §19.1).
// Accessible uniquement avec un cookie 'docpro_2fa_pending' valide posé par /api/auth/connexion.
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import { decodePending2fa, PENDING_2FA_COOKIE, PENDING_2FA_MAX_FAILS } from '@/lib/totp';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Vérification en deux étapes — IBIG DocPro',
};

export default async function Deux2faPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string; verrouille?: string }>;
}) {
  const { erreur, verrouille } = await searchParams;
  const token = (await cookies()).get(PENDING_2FA_COOKIE)?.value;
  const pending = token ? decodePending2fa(token) : null;

  // 3 échecs (ou cookie expiré après verrouillage) → message dédié, retour connexion.
  if (!pending && verrouille === '1') {
    return (
      <>
        <SiteHeader />
        <main className="container mt-4" style={{ minHeight: '60vh' }}>
          <div className="card" style={{ maxWidth: 440, margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem' }}>Vérification échouée</h1>
            <div className="alert alert-danger mt-1">
              Trop de codes incorrects (3 tentatives). Par sécurité, veuillez vous reconnecter
              avec votre email et votre mot de passe.
            </div>
            <Link href="/connexion" className="btn btn-primary" style={{ width: '100%' }}>
              Retour à la connexion
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (!pending) redirect('/connexion');

  const restantes = PENDING_2FA_MAX_FAILS - pending.fails;

  return (
    <>
      <SiteHeader />
      <main className="container mt-4" style={{ minHeight: '60vh' }}>
        <div className="card" style={{ maxWidth: 440, margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.5rem' }}>Vérification en deux étapes</h1>
          <p className="text-muted text-small mb-2">
            Saisissez le code à 6 chiffres affiché par votre application
            d&apos;authentification (Google Authenticator, Aegis, 2FAS…).
          </p>

          {erreur === 'code_invalide' && (
            <div className="alert alert-danger">
              Code incorrect. Il vous reste {restantes} tentative{restantes > 1 ? 's' : ''}.
            </div>
          )}

          <form method="POST" action="/api/auth/2fa/verify">
            <div className="field">
              <label className="label" htmlFor="code">Code de vérification</label>
              <input
                className="input"
                id="code"
                name="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                minLength={6}
                required
                autoFocus
                placeholder="123456"
                style={{ letterSpacing: '0.4em', textAlign: 'center', fontSize: '1.3rem' }}
              />
              <p className="form-hint">Le code change toutes les 30 secondes.</p>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Vérifier et se connecter
            </button>
          </form>

          <p className="text-center text-small mt-2">
            <Link href="/connexion">← Revenir à la connexion</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
