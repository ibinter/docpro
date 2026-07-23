import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import Link from 'next/link';

export const metadata = { title: "RGPD — Protection des données · IBIG DocPro" };
const ANNEE = new Date().getFullYear();

export default function RgpdPage() {
  return (
    <>
      <SiteHeader />
      <div className="container" style={{ maxWidth: 820, padding: '48px 16px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Règlement Général sur la Protection des Données (RGPD)</h1>
        <p style={{ color: '#888', marginBottom: 32, fontSize: '.85rem' }}>Dernière mise à jour : janvier {ANNEE} · IBIG Soft / IBIG SARL</p>

        {[
          { titre: "Responsable du traitement", texte: "IBIG Soft (marque de IBIG SARL — Intermark Business International Group), dont le siège social est à Abidjan, Côte d'Ivoire. Contact DPO : docpro@ibigsoft.com" },
          { titre: "Données collectées", texte: "Nous collectons : (1) Données d'identification — nom, email, téléphone, pays. (2) Données de paiement — références de transaction (jamais les codes secrets). (3) Données d'utilisation — documents générés, historique de connexion, adresses IP. (4) Données de communication — messages de support, tickets." },
          { titre: "Finalités du traitement", texte: "Vos données sont utilisées pour : la fourniture du service de génération de documents, la gestion de votre compte et de votre licence, l'envoi de notifications (confirmation, relances, sécurité), la prévention de la fraude, l'amélioration de nos services (données agrégées, anonymisées), et la facturation." },
          { titre: "Base légale", texte: "Exécution du contrat (art. 6.1.b RGPD) pour les traitements liés à la fourniture du service. Intérêt légitime (art. 6.1.f) pour la sécurité et la prévention de la fraude. Consentement (art. 6.1.a) pour les cookies optionnels et les communications marketing." },
          { titre: "Durée de conservation", texte: "Données de compte : conservées pendant la durée du contrat + 30 jours après résiliation. Données de facturation : 10 ans (obligation légale). Logs de connexion : 12 mois. Cookies de session : 7 jours." },
          { titre: "Vos droits", texte: "Conformément au RGPD, vous disposez des droits suivants : droit d'accès à vos données (art. 15), droit de rectification (art. 16), droit à l'effacement (art. 17), droit à la portabilité (art. 20), droit d'opposition (art. 21), droit de limitation du traitement (art. 18). Pour exercer ces droits : docpro@ibigsoft.com" },
          { titre: "Transferts hors UE", texte: "Certains sous-traitants techniques peuvent être localisés hors de l'Union Européenne. Dans ce cas, des garanties contractuelles appropriées (clauses types de la Commission européenne) sont mises en place." },
          { titre: "Sécurité", texte: "Nous appliquons des mesures techniques et organisationnelles pour protéger vos données : chiffrement HTTPS, authentification 2FA, journal d'audit complet, accès restreint aux données sensibles, hébergement sécurisé." },
          { titre: "Contact et réclamations", texte: "Pour toute demande relative à vos données personnelles : docpro@ibigsoft.com. Vous pouvez également adresser une réclamation à l'autorité de contrôle compétente dans votre pays de résidence." },
        ].map(s => (
          <div key={s.titre} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.05rem', color: 'var(--navy)', marginBottom: 8 }}>{s.titre}</h2>
            <p style={{ color: '#444', lineHeight: 1.8, fontSize: '.9rem', margin: 0 }}>{s.texte}</p>
          </div>
        ))}

        <div style={{ borderTop: '1px solid #e0e6ed', paddingTop: 20, marginTop: 32, fontSize: '.82rem', color: '#888' }}>
          <Link href="/confidentialite" style={{ color: 'var(--cobalt)' }}>Politique de confidentialité complète</Link> ·{' '}
          <Link href="/cookies" style={{ color: 'var(--cobalt)' }}>Cookies</Link> ·{' '}
          <Link href="/mentions-legales" style={{ color: 'var(--cobalt)' }}>Mentions légales</Link>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
