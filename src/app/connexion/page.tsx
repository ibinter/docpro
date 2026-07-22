// Page de connexion.
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import { authErrorMessage } from '@/components/public/authMessages';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Connexion — IBIG DocPro',
};

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const user = await getSessionUser();
  if (user) {
    redirect(user.role === 'admin' || user.role === 'superadmin' ? '/admin' : '/compte');
  }
  const { erreur } = await searchParams;
  const message = authErrorMessage(erreur);

  return (
    <>
      <SiteHeader />
      <main className="container mt-4" style={{ minHeight: '60vh' }}>
        <div className="card" style={{ maxWidth: 440, margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.5rem' }}>Connexion</h1>
          <p className="text-muted text-small mb-2">
            Accédez à votre espace : documents, commandes, licences et profil.
          </p>

          {message && <div className="alert alert-danger">{message}</div>}

          <form method="POST" action="/api/auth/connexion">
            <div className="field">
              <label className="label" htmlFor="email">Adresse email</label>
              <input className="input" id="email" name="email" type="email" required maxLength={190} autoComplete="email" placeholder="vous@exemple.com" />
            </div>
            <div className="field">
              <label className="label" htmlFor="password">Mot de passe</label>
              <input className="input" id="password" name="password" type="password" required autoComplete="current-password" />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Se connecter
            </button>
          </form>

          <p className="text-center text-small mt-2">
            Pas encore de compte&nbsp;? <Link href="/inscription">Créez-en un gratuitement</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
