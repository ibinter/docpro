// Mentions légales — identification de l'éditeur IBIG SARL.
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';

export const metadata = {
  title: 'Mentions légales — IBIG DocPro',
  description: 'Mentions légales de la plateforme IBIG DocPro, éditée par IBIG SARL.',
};

export default function MentionsLegalesPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mt-3 mb-3" style={{ maxWidth: 860, minHeight: '60vh' }}>
        <h1>Mentions légales</h1>
        <p className="text-muted mt-1 mb-3">
          Informations légales relatives à la plateforme IBIG DocPro, accessible à
          l&apos;adresse docpro.ibigsoft.com.
        </p>

        <div className="card mb-2">
          <h2>Éditeur de la plateforme</h2>
          <p className="mt-1">
            La plateforme IBIG DocPro est éditée par <strong>IBIG SARL</strong>, société à
            responsabilité limitée, spécialisée dans l&apos;édition de solutions logicielles
            et la génération intelligente de documents professionnels.
          </p>
          <ul className="mt-1" style={{ paddingLeft: 20, display: 'grid', gap: 6 }}>
            <li><strong>Dénomination sociale</strong> : IBIG SARL</li>
            <li><strong>Site web</strong> : <a href="https://docpro.ibigsoft.com">docpro.ibigsoft.com</a></li>
            <li><strong>E-mail</strong> : <a href="mailto:docpro@ibigsoft.com">docpro@ibigsoft.com</a></li>
            <li><strong>Téléphone</strong> : +225 22 27 60 14 | +225 05 55 05 99 01</li>
          </ul>
        </div>

        <div className="card mb-2">
          <h2>Directeur de la publication</h2>
          <p className="mt-1">
            Le directeur de la publication est le représentant légal d&apos;IBIG SARL,
            joignable via les coordonnées officielles indiquées ci-dessus.
          </p>
        </div>

        <div className="card mb-2">
          <h2>Hébergement</h2>
          <p className="mt-1">
            La plateforme est hébergée sur l&apos;infrastructure d&apos;IBIG SARL et de ses
            prestataires techniques, dans des centres de données sécurisés. Les preuves de
            paiement et documents des utilisateurs sont conservés sur un stockage privé,
            jamais exposé par URL publique directe.
          </p>
        </div>

        <div className="card mb-2">
          <h2>Propriété intellectuelle</h2>
          <p className="mt-1">
            L&apos;ensemble des éléments composant la plateforme (marque IBIG DocPro, logos,
            charte graphique, textes, logiciels, modèles de documents, bases de données) est
            protégé par le droit de la propriété intellectuelle et demeure la propriété
            exclusive d&apos;IBIG SARL ou de ses concédants. Toute reproduction,
            représentation, adaptation ou exploitation, totale ou partielle, sans
            autorisation écrite préalable est interdite et constitutive de contrefaçon. Les
            documents générés par les utilisateurs sont concédés sous licence
            d&apos;utilisation personnelle non exclusive, dans les conditions définies par
            les <Link href="/cgu">conditions générales d&apos;utilisation</Link>.
          </p>
        </div>

        <div className="card mb-2">
          <h2>Données personnelles</h2>
          <p className="mt-1">
            Les traitements de données personnelles réalisés via la plateforme sont décrits
            dans la <Link href="/confidentialite">politique de confidentialité</Link>. Pour
            exercer vos droits, contactez le DPO à l&apos;adresse{' '}
            <a href="mailto:docpro@ibigsoft.com">docpro@ibigsoft.com</a>.
          </p>
        </div>

        <div className="card mb-2">
          <h2>Vérification d&apos;authenticité des documents</h2>
          <p className="mt-1">
            Chaque document généré par IBIG DocPro comporte un code de vérification unique
            (QR code) permettant à tout destinataire d&apos;en confirmer l&apos;authenticité
            sur la plateforme. Tout document dépourvu d&apos;un code de vérification valide
            ne peut être considéré comme émis par IBIG DocPro.
          </p>
        </div>

        <div className="card">
          <h2>Contact et assistance</h2>
          <p className="mt-1">
            Pour toute question, réclamation ou demande d&apos;assistance (notamment en
            matière de facturation), vous pouvez :
          </p>
          <ul className="mt-1" style={{ paddingLeft: 20, display: 'grid', gap: 6 }}>
            <li>utiliser l&apos;assistance intégrée de votre <Link href="/compte/assistance">espace client</Link> ;</li>
            <li>écrire à <a href="mailto:docpro@ibigsoft.com">docpro@ibigsoft.com</a> ;</li>
            <li>appeler le +225 22 27 60 14 ou le +225 05 55 05 99 01.</li>
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
