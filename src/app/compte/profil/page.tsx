// Mon profil — infos de compte + Profil Utilisateur Intelligent (CDC §6.2).
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { updateProfile } from './actions';

export const dynamic = 'force-dynamic';

const COUNTRIES: [string, string][] = [
  ['CI', 'Côte d’Ivoire'], ['SN', 'Sénégal'], ['CM', 'Cameroun'], ['BF', 'Burkina Faso'],
  ['ML', 'Mali'], ['TG', 'Togo'], ['BJ', 'Bénin'], ['NE', 'Niger'], ['GN', 'Guinée'],
  ['CD', 'RD Congo'], ['GA', 'Gabon'], ['CG', 'Congo'], ['MA', 'Maroc'], ['TN', 'Tunisie'],
  ['DZ', 'Algérie'], ['NG', 'Nigéria'], ['GH', 'Ghana'], ['FR', 'France'], ['BE', 'Belgique'],
  ['CA', 'Canada'], ['US', 'États-Unis'],
];

const LANGUAGES: [string, string][] = [
  ['fr', 'Français'], ['en', 'English'], ['es', 'Español'], ['pt', 'Português'], ['ar', 'العربية'],
];

export default async function ProfilPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect('/connexion');
  const sp = await searchParams;
  const saved = sp.ok === '1';

  const profile: Record<string, string> = (() => {
    try { return user.profileJson ? JSON.parse(user.profileJson) : {}; }
    catch { return {}; }
  })();

  return (
    <div>
      <h1 className="mb-2">Mon profil</h1>

      {saved && <div className="alert alert-success">Profil enregistré avec succès.</div>}

      <form action={updateProfile}>
        <div className="card mb-2">
          <div className="card-title">Informations du compte</div>
          <div className="grid grid-2">
            <div className="field">
              <label className="label" htmlFor="name">Nom complet</label>
              <input id="name" name="name" className="input" defaultValue={user.name} required />
            </div>
            <div className="field">
              <label className="label" htmlFor="email">Adresse e-mail</label>
              <input id="email" className="input" value={user.email} disabled />
              <p className="form-hint">L&apos;adresse e-mail ne peut pas être modifiée.</p>
            </div>
            <div className="field">
              <label className="label" htmlFor="phone">Téléphone</label>
              <input id="phone" name="phone" className="input" defaultValue={user.phone ?? ''} placeholder="+225 07 00 00 00 00" />
            </div>
            <div className="field">
              <label className="label" htmlFor="country">Pays</label>
              <select id="country" name="country" className="select" defaultValue={user.country ?? ''}>
                <option value="">— Sélectionner —</option>
                {COUNTRIES.map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="language">Langue</label>
              <select id="language" name="language" className="select" defaultValue={user.language}>
                {LANGUAGES.map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="card mb-2">
          <div className="card-title">Profil intelligent</div>
          <div className="alert alert-info">
            <strong>Renseignez une seule fois</strong> — tous vos documents (CV, contrats, lettres…)
            seront automatiquement pré-remplis avec ces informations. Fin de la saisie répétitive.
          </div>
          <div className="grid grid-2">
            <div className="field">
              <label className="label" htmlFor="prenom">Prénom</label>
              <input id="prenom" name="prenom" className="input" defaultValue={profile.prenom ?? ''} />
            </div>
            <div className="field">
              <label className="label" htmlFor="nom">Nom</label>
              <input id="nom" name="nom" className="input" defaultValue={profile.nom ?? ''} />
            </div>
            <div className="field">
              <label className="label" htmlFor="adresse">Adresse</label>
              <input id="adresse" name="adresse" className="input" defaultValue={profile.adresse ?? ''} placeholder="Rue, quartier, commune…" />
            </div>
            <div className="field">
              <label className="label" htmlFor="ville">Ville</label>
              <input id="ville" name="ville" className="input" defaultValue={profile.ville ?? ''} />
            </div>
            <div className="field">
              <label className="label" htmlFor="profession">Profession</label>
              <input id="profession" name="profession" className="input" defaultValue={profile.profession ?? ''} />
            </div>
            <div className="field">
              <label className="label" htmlFor="entreprise">Entreprise</label>
              <input id="entreprise" name="entreprise" className="input" defaultValue={profile.entreprise ?? ''} />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg">Enregistrer mon profil</button>
      </form>
    </div>
  );
}
