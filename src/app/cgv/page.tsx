import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import Link from 'next/link';

export const metadata = { title: "Conditions Générales de Vente — IBIG DocPro" };
const ANNEE = new Date().getFullYear();

export default function CgvPage() {
  return (
    <>
      <SiteHeader />
      <div className="container" style={{ maxWidth: 820, padding: '48px 16px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 6 }}>Conditions Générales de Vente (CGV)</h1>
        <p style={{ color: '#888', marginBottom: 32, fontSize: '.85rem' }}>Version en vigueur au 1er janvier {ANNEE} · IBIG DocPro — IBIG Soft / IBIG SARL</p>

        {[
          { titre: "1. Objet", texte: "Les présentes Conditions Générales de Vente (CGV) régissent toutes les ventes de services numériques réalisées par IBIG Soft (marque de IBIG SARL, ci-après « l'Éditeur ») via la plateforme IBIG DocPro accessible à l'adresse docpro.ibigsoft.com. Toute commande implique l'acceptation pleine et entière des présentes CGV." },
          { titre: "2. Services proposés", texte: "IBIG DocPro propose la génération de documents professionnels à la demande (contrats, CV, statuts, business plans, etc.) selon plusieurs niveaux (Standard, Pro, Expert) définis dans la grille tarifaire disponible sur /tarifs. Les services sont fournis sous forme de fichiers numériques (PDF, DOCX, PPTX, XLSX)." },
          { titre: "3. Commandes et confirmation", texte: "Toute commande est passée via l'interface de la plateforme. La commande est réputée définitive après confirmation du paiement. L'Éditeur se réserve le droit d'annuler toute commande en cas de fraude avérée ou d'impossibilité technique, avec remboursement intégral le cas échéant." },
          { titre: "4. Prix et paiement", texte: "Les prix sont exprimés en Francs CFA (XOF) et en dollars américains (USD) à titre indicatif. Les paiements sont effectués via les opérateurs Mobile Money (Orange Money, MTN MoMo, Wave, Moov Money) ou par virement bancaire. Tout paiement est sécurisé via Moneroo. Les prix peuvent être modifiés à tout moment ; seul le prix affiché au moment de la commande est opposable." },
          { titre: "5. Livraison des services", texte: "Les documents numériques sont disponibles immédiatement après confirmation du paiement automatisé (Mobile Money), ou sous 24 à 48 heures pour les paiements manuels (virement). Les documents sont accessibles depuis l'espace compte de l'utilisateur." },
          { titre: "6. Droit de rétractation", texte: "Conformément aux usages applicables aux services numériques fournis immédiatement après le paiement, l'utilisateur renonce expressément à son droit de rétractation dès la génération du document. Toutefois, en cas de défaut avéré du document (erreur imputable à la plateforme), l'Éditeur s'engage à régénérer le document gratuitement ou à rembourser le client." },
          { titre: "7. Garanties et responsabilités", texte: "Les documents générés sont conformes aux lois et réglementations en vigueur au moment de la génération dans les pays couverts. L'Éditeur ne peut être tenu responsable d'un usage inapproprié du document, d'une évolution législative postérieure à la génération, ou d'une interprétation juridique erronée par l'utilisateur. IBIG DocPro ne se substitue pas à un conseil juridique professionnel." },
          { titre: "8. Données personnelles", texte: "Les données collectées lors de l'achat sont utilisées uniquement pour la fourniture du service et la gestion de la relation client. Elles ne sont jamais revendues. Pour exercer vos droits, consultez notre Politique de confidentialité disponible sur /confidentialite." },
          { titre: "9. Litige et droit applicable", texte: "En cas de litige, l'utilisateur est invité à contacter notre service client à l'adresse docpro@ibigsoft.com. À défaut de résolution amiable, les juridictions compétentes d'Abidjan (Côte d'Ivoire) seront saisies, le droit ivoirien étant applicable." },
          { titre: "10. Modifications", texte: "L'Éditeur se réserve le droit de modifier les présentes CGV à tout moment. L'utilisateur sera informé par email en cas de modification substantielle. La version applicable est celle en vigueur au moment de la commande." },
        ].map(s => (
          <div key={s.titre} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.05rem', color: 'var(--navy)', marginBottom: 8 }}>{s.titre}</h2>
            <p style={{ color: '#444', lineHeight: 1.8, fontSize: '.9rem', margin: 0 }}>{s.texte}</p>
          </div>
        ))}

        <div style={{ borderTop: '1px solid #e0e6ed', paddingTop: 20, marginTop: 32, fontSize: '.82rem', color: '#888' }}>
          <strong>IBIG Soft / IBIG SARL</strong> · docpro.ibigsoft.com · docpro@ibigsoft.com · +225 22 27 60 14
          <br />
          <Link href="/cgu" style={{ color: 'var(--cobalt)' }}>CGU</Link> ·{' '}
          <Link href="/confidentialite" style={{ color: 'var(--cobalt)' }}>Confidentialité</Link> ·{' '}
          <Link href="/mentions-legales" style={{ color: 'var(--cobalt)' }}>Mentions légales</Link>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
