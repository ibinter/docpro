import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';

export const metadata = {
  title: 'Guide utilisateur — IBIG DocPro',
  description: "Guide complet pour utiliser IBIG DocPro : créer un compte, générer un document, payer, télécharger et gérer votre espace.",
};

const STEPS = [
  {
    id: 'compte', num: '01', icon: '👤', titre: "Créer votre compte",
    contenu: [
      { titre: "Inscription gratuite", texte: "Cliquez sur « Créer un compte » en haut de page. Renseignez votre nom, adresse email et mot de passe. Votre compte est actif immédiatement — aucune vérification obligatoire au départ." },
      { titre: "Connexion", texte: "Utilisez votre email et mot de passe sur /connexion. En cas d'oubli, cliquez « Mot de passe oublié » pour recevoir un lien de réinitialisation par email." },
      { titre: "Profil et préférences", texte: "Dans Compte → Profil, complétez vos informations (pays, langue, organisation). Ces données pré-remplissent automatiquement certains champs de vos futurs documents." },
    ],
  },
  {
    id: 'generation', num: '02', icon: '⚡', titre: "Générer votre premier document",
    contenu: [
      { titre: "Choisir un modèle", texte: "Naviguez sur /catalogue, filtrez par domaine (juridique, RH, commercial…) ou par pays. Utilisez la recherche pour trouver un document spécifique (ex. « contrat de travail CDI »)." },
      { titre: "Remplir le formulaire", texte: "Chaque modèle dispose d'un formulaire adapté. Renseignez les parties (noms, adresses, montants, dates…). Des exemples sont fournis pour chaque champ. La génération commence dès que vous soumettez." },
      { titre: "Sélectionner le pays et le niveau", texte: "Choisissez le pays cible pour adapter les clauses légales. Sélectionnez le niveau : Standard (PDF), Pro (PDF + Word), Expert (tous formats + relecture humaine)." },
      { titre: "Prévisualiser", texte: "Avant tout paiement, vous pouvez prévisualiser votre document gratuitement. Vérifiez le contenu, les noms des parties, les montants et les dates." },
    ],
  },
  {
    id: 'paiement-guide', num: '03', icon: '💳', titre: "Payer votre document",
    contenu: [
      { titre: "Choisir le mode de paiement", texte: "Sélectionnez votre opérateur : Orange Money, MTN MoMo, Wave, Moov Money, ou virement bancaire. Entrez votre numéro de téléphone et confirmez depuis votre application Mobile Money." },
      { titre: "Portefeuille de crédits (recommandé)", texte: "Rechargez votre portefeuille à l'avance pour bénéficier de bonus (+10 % à +30 % selon le montant). Le paiement depuis le portefeuille est instantané sans nouvelle transaction Mobile Money." },
      { titre: "Paiement manuel (virement)", texte: "Si vous optez pour un virement bancaire, déclarez la transaction dans l'interface et téléchargez votre preuve. Notre équipe valide sous 24–48 h." },
      { titre: "Confirmation", texte: "Après confirmation du paiement (automatique en 2–5 min pour Mobile Money), votre document est disponible immédiatement dans votre espace Compte → Documents." },
    ],
  },
  {
    id: 'telechargement', num: '04', icon: '📥', titre: "Télécharger vos documents",
    contenu: [
      { titre: "Depuis votre espace compte", texte: "Allez dans Compte → Documents. Chaque document payé affiche des boutons de téléchargement pour les formats disponibles (PDF, DOCX, PPTX, XLSX selon le niveau)." },
      { titre: "QR code d'authenticité", texte: "Chaque document payé porte un QR code unique. Scannez-le pour vérifier l'authenticité sur notre site public. Présentez-le aux tiers pour certifier l'origine du document." },
      { titre: "Partager par lien", texte: "Vous pouvez générer un lien de téléchargement temporaire (30 jours) à partager avec des tiers sans qu'ils aient besoin d'un compte." },
    ],
  },
  {
    id: 'organisation', num: '05', icon: '🏢', titre: "Gérer une organisation",
    contenu: [
      { titre: "Créer une organisation", texte: "Dans Compte → Organisation → Créer. Donnez un nom à votre organisation. Vous devenez automatiquement administrateur." },
      { titre: "Inviter des membres", texte: "Allez dans Organisation → Membres → Inviter. Renseignez l'email du collaborateur et son rôle (administrateur, agent, client). L'invitation est envoyée par email." },
      { titre: "Gérer les rôles", texte: "4 niveaux de droits : Superadmin (vous), Admin (gestion complète), Agent (génération et consultation), Client (consultation uniquement). Adaptez selon vos besoins." },
    ],
  },
  {
    id: 'securite', num: '06', icon: '🔐', titre: "Sécuriser votre compte",
    contenu: [
      { titre: "Double authentification (2FA)", texte: "Fortement recommandée. Allez dans Compte → Sécurité → Activer la 2FA. Scannez le QR code avec Google Authenticator ou Authy. Un code sera demandé à chaque connexion." },
      { titre: "Codes de secours", texte: "Lors de l'activation 2FA, sauvegardez vos codes de secours. Ils sont la seule façon de récupérer l'accès si vous perdez votre téléphone." },
      { titre: "Alertes de connexion", texte: "À chaque nouvelle connexion, vous recevez un email de notification. Si vous ne reconnaissez pas une connexion, changez immédiatement votre mot de passe." },
    ],
  },
];

export default function GuidePage() {
  return (
    <>
      <SiteHeader />

      <section style={{ background: 'linear-gradient(135deg,#0D2B4E,#1565C0)', color: '#fff', padding: '48px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem,4vw,2.2rem)', marginBottom: 10 }}>Guide utilisateur IBIG DocPro</h1>
          <p style={{ opacity: .85, maxWidth: 520, margin: '0 auto' }}>
            Tout ce qu'il faut savoir pour créer, générer et gérer vos documents professionnels.
          </p>
        </div>
      </section>

      {/* Table des matières */}
      <div style={{ background: '#f5f7fa', borderBottom: '1px solid #e0e6ed', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {STEPS.map(s => (
            <a key={s.id} href={`#${s.id}`} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#fff', border: '1px solid #e0e6ed', borderRadius: 20,
              padding: '5px 14px', textDecoration: 'none', color: 'var(--navy)',
              fontSize: '.82rem', fontWeight: 600,
            }}>
              {s.icon} {s.titre}
            </a>
          ))}
        </div>
      </div>

      <div className="container" style={{ maxWidth: 800, padding: '48px 16px' }}>
        {STEPS.map((step, idx) => (
          <section key={step.id} id={step.id} style={{ marginBottom: 48, scrollMarginTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'var(--cobalt)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem', flexShrink: 0, fontWeight: 800,
              }}>
                {step.icon}
              </div>
              <div>
                <div style={{ fontSize: '.75rem', color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Étape {step.num}</div>
                <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--navy)' }}>{step.titre}</h2>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {step.contenu.map((c, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e0e6ed', borderRadius: 10, padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 6, fontSize: '.95rem' }}>
                    {c.titre}
                  </div>
                  <p style={{ margin: 0, fontSize: '.88rem', color: '#444', lineHeight: 1.75 }}>{c.texte}</p>
                </div>
              ))}
            </div>
            {idx < STEPS.length - 1 && (
              <div style={{ textAlign: 'center', padding: '20px 0 0', color: '#ccc', fontSize: '1.4rem' }}>↓</div>
            )}
          </section>
        ))}

        <div style={{ background: '#f5f7fa', border: '1px solid #e0e6ed', borderRadius: 12, padding: '24px 20px' }}>
          <h3 style={{ marginBottom: 12, fontSize: '1.1rem' }}>Besoin d'aide supplémentaire ?</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/faq" className="btn btn-outline-primary btn-sm">❓ Voir la FAQ</Link>
            <Link href="/compte/assistance" className="btn btn-primary btn-sm">💬 Support ticket</Link>
            <a href="https://wa.me/2250555059901" target="_blank" rel="noopener noreferrer" className="btn btn-sm"
              style={{ background: '#25D366', color: '#fff', border: 'none' }}>📲 WhatsApp</a>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
