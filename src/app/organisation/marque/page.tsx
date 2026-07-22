// /organisation/marque — White Label (CDC §6.2). Propriétaire uniquement,
// nécessite une licence active de l'org sur un plan éligible (White label / ENTREPRISE).
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { getUserOrg, orgWhiteLabelAllowed, parseBranding } from '@/lib/org';
import { saveBranding, clearBranding } from '../actions';
import BrandingForm from './BrandingForm';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Marque blanche — IBIG DocPro' };

const OK_MESSAGES: Record<string, string> = {
  '1': 'Marque enregistrée. Vos prochains documents téléchargés porteront votre identité.',
  supprime: 'White Label désactivé — vos documents reprennent l’identité IBIG DocPro.',
};

const ERR_MESSAGES: Record<string, string> = {
  plan_insuffisant: 'Votre forfait ne permet pas le White Label.',
  nom_invalide: 'Le nom affiché doit contenir au moins 2 caractères.',
  logo_invalide: 'L’URL du logo doit commencer par http:// ou https://.',
  couleur_invalide: 'La couleur doit être au format hexadécimal (ex. : #0D2B4E).',
};

export default async function MarquePage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; erreur?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');
  const sp = await searchParams;

  const info = await getUserOrg(user.id);
  if (!info) redirect('/organisation');

  if (info.role !== 'owner') {
    return (
      <>
        <h1 className="mb-2">Marque blanche</h1>
        <div className="alert alert-warning">
          Cette page est réservée au propriétaire de l’organisation.
        </div>
        <Link href="/organisation" className="btn btn-outline">← Retour à l’organisation</Link>
      </>
    );
  }

  const allowed = await orgWhiteLabelAllowed(info.org.id);
  if (!allowed) {
    // Écran d'upsell.
    return (
      <>
        <h1 className="mb-2">Marque blanche</h1>
        <div className="card text-center" style={{ maxWidth: 560, margin: '24px auto', padding: 40 }}>
          <span className="badge badge-gold mb-2" style={{ display: 'inline-block' }}>
            Fonctionnalité ENTREPRISE
          </span>
          <h2 style={{ fontSize: '1.3rem', margin: '12px 0' }}>
            Vos documents à votre marque
          </h2>
          <p className="text-muted">
            Avec le White Label, remplacez le logo et le nom IBIG DocPro par votre propre
            identité (nom, logo, couleur) sur tous les documents générés par votre
            organisation — l’authenticité reste garantie par le QR code IBIG.
          </p>
          <p className="text-muted text-small mt-1">
            Cette fonctionnalité nécessite une licence active sur le forfait
            <strong> ENTREPRISE</strong> (ou un plan incluant « White label »).
          </p>
          <Link href="/#forfaits" className="btn btn-gold btn-lg mt-2">
            Passer au forfait ENTREPRISE
          </Link>
        </div>
      </>
    );
  }

  const okMsg = sp.ok ? OK_MESSAGES[sp.ok] : null;
  const errMsg = sp.erreur ? (ERR_MESSAGES[sp.erreur] ?? 'Une erreur est survenue.') : null;
  const branding = parseBranding(info.org.brandingJson);

  return (
    <>
      <div className="flex-between mb-2">
        <h1>Marque blanche</h1>
        <span className={`badge ${branding ? 'badge-success' : 'badge-neutral'}`}>
          {branding ? 'Activée' : 'Non configurée'}
        </span>
      </div>
      {okMsg && <div className="alert alert-success">{okMsg}</div>}
      {errMsg && <div className="alert alert-danger">{errMsg}</div>}
      <p className="text-muted mb-3">
        Personnalisez l’en-tête des documents téléchargés par les membres de «{' '}
        {info.org.name} ». Le pied de page de vérification IBIG (QR code d’authenticité)
        est toujours conservé.
      </p>
      <BrandingForm initial={branding} saveAction={saveBranding} clearAction={clearBranding} />
    </>
  );
}
