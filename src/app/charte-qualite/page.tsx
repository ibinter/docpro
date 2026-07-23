import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';

export const metadata = { title: "Charte qualité — IBIG DocPro" };
const ANNEE = new Date().getFullYear();

const ENGAGEMENTS = [
  { icon: '⚖️', titre: 'Conformité juridique garantie', texte: 'Chaque document respecte les lois et réglementations du pays sélectionné (OHADA, codes locaux, UEMOA, CEMAC). Nos modèles sont vérifiés par des professionnels du droit et mis à jour à chaque évolution législative.' },
  { icon: '✍️', titre: 'Rédaction de niveau professionnel', texte: "Nos documents atteignent le standard d'un rédacteur juridique expérimenté : terminologie exacte, clauses complètes, structure conforme. Chaque modèle a été validé sur des cas réels." },
  { icon: '🔒', titre: 'Sécurité et confidentialité maximales', texte: 'Chiffrement HTTPS systématique, authentification 2FA, journal d\'audit complet, accès restreint aux données sensibles. Vos informations ne sont jamais revendues à des tiers.' },
  { icon: '⚡', titre: 'Disponibilité et réactivité', texte: 'La plateforme vise une disponibilité de 99,5 % (hors maintenances planifiées). Le support client répond en moins de 2 heures pour les questions simples, sous 24 h pour les demandes techniques.' },
  { icon: '📊', titre: 'Transparence des tarifs', texte: 'Aucun frais caché. Le prix affiché est le prix final. Pas d\'abonnement automatique. Les crédits portefeuille n\'expirent pas.' },
  { icon: '🔄', titre: 'Amélioration continue', texte: 'Nous collectons les retours utilisateurs et améliorons constamment nos modèles, notre interface et nos services. Les suggestions sont analysées chaque semaine par notre équipe produit.' },
  { icon: '🤝', titre: 'Satisfaction client', texte: 'En cas de document défectueux (erreur imputable à la plateforme), nous régénérons le document gratuitement ou procédons à un remboursement. Notre objectif : 100 % de clients satisfaits.' },
  { icon: '🌍', titre: 'Ancrage africain', texte: 'IBIG DocPro est conçu par et pour les professionnels d\'Afrique francophone. Nos documents intègrent les spécificités culturelles, économiques et légales du continent — pas des traductions génériques.' },
];

export default function CharteQualitePage() {
  return (
    <>
      <SiteHeader />
      <section style={{ background: 'linear-gradient(135deg,#0D2B4E,#1565C0)', color: '#fff', padding: '40px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.5rem,4vw,2rem)', marginBottom: 8 }}>Charte qualité IBIG DocPro</h1>
          <p style={{ opacity: .85, maxWidth: 480, margin: '0 auto' }}>Nos engagements envers vous — {ANNEE}</p>
        </div>
      </section>
      <div className="container" style={{ maxWidth: 820, padding: '48px 16px' }}>
        <p style={{ color: '#555', lineHeight: 1.8, marginBottom: 36, fontSize: '.95rem' }}>
          Chez IBIG DocPro, la qualité n'est pas une option — c'est notre standard. Voici les engagements fermes que nous prenons envers chacun de nos utilisateurs.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
          {ENGAGEMENTS.map(e => (
            <div key={e.titre} style={{ background: '#fff', border: '1px solid #e0e6ed', borderRadius: 12, padding: '22px 20px' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{e.icon}</div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 8, fontSize: '.95rem' }}>{e.titre}</div>
              <p style={{ margin: 0, fontSize: '.87rem', color: '#555', lineHeight: 1.7 }}>{e.texte}</p>
            </div>
          ))}
        </div>
        <div style={{ background: '#f5f7fa', borderRadius: 10, padding: '24px', marginTop: 40, textAlign: 'center' }}>
          <p style={{ margin: '0 0 12px', fontSize: '.9rem', color: '#555' }}>
            Un problème de qualité à nous signaler ?
          </p>
          <a href="mailto:docpro@ibigsoft.com?subject=[Qualité]" style={{ color: 'var(--cobalt)', fontWeight: 600 }}>
            docpro@ibigsoft.com — objet : [Qualité]
          </a>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
