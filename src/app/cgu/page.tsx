// Conditions générales d'utilisation — protection légale & contractuelle (CDC §21, couche 7).
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';

export const metadata = {
  title: 'Conditions générales d’utilisation — IBIG DocPro',
  description: 'Conditions générales d’utilisation de la plateforme IBIG DocPro.',
};

export default function CguPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mt-3 mb-3" style={{ maxWidth: 860, minHeight: '60vh' }}>
        <h1>Conditions générales d&apos;utilisation</h1>
        <p className="text-muted mt-1 mb-3">
          En vigueur au 1<sup>er</sup> janvier 2026 — applicables à tout utilisateur de la
          plateforme IBIG DocPro (docpro.ibigsoft.com), éditée par IBIG SARL.
        </p>

        <div className="card mb-2">
          <h2>1. Objet</h2>
          <p className="mt-1">
            Les présentes conditions générales d&apos;utilisation (« CGU ») définissent les
            règles d&apos;accès et d&apos;utilisation de la plateforme IBIG DocPro, service en
            ligne de génération intelligente de documents professionnels (CV, lettres,
            contrats, attestations et autres modèles), adaptés aux exigences légales du pays
            de l&apos;utilisateur. Toute création de compte, toute commande et toute
            utilisation du service impliquent l&apos;acceptation pleine et entière des
            présentes CGU.
          </p>
        </div>

        <div className="card mb-2">
          <h2>2. Accès au service et compte utilisateur</h2>
          <p className="mt-1">
            L&apos;accès aux fonctionnalités de génération nécessite la création d&apos;un
            compte personnel. L&apos;utilisateur s&apos;engage à fournir des informations
            exactes et à jour, à préserver la confidentialité de ses identifiants et à
            signaler sans délai toute utilisation non autorisée de son compte. Chaque compte
            est strictement personnel : le partage d&apos;identifiants ou la revente
            d&apos;accès sont interdits. IBIG SARL se réserve le droit de suspendre tout
            compte en cas de violation des présentes CGU, de fraude avérée ou de tentative de
            contournement des mécanismes de paiement.
          </p>
        </div>

        <div className="card mb-2">
          <h2>3. Forfaits, paiements et licences</h2>
          <p className="mt-1">
            Les documents peuvent être achetés à l&apos;unité ou dans le cadre d&apos;un
            abonnement (forfaits Starter, Pro, Entreprise ou offres spécifiques). Les prix
            sont affichés en FCFA (ou dans la devise applicable) toutes taxes comprises, sur
            la page <Link href="/tarifs">Tarifs &amp; forfaits</Link>. Une licence
            d&apos;utilisation n&apos;est activée qu&apos;après confirmation effective du
            paiement par nos serveurs (paiement électronique vérifié ou validation manuelle
            d&apos;une preuve de paiement). Un essai gratuit, lorsqu&apos;il est proposé, est
            limité à un seul essai par compte, pour la durée indiquée, sans reconduction ni
            prélèvement automatique.
          </p>
        </div>

        <div className="card mb-2">
          <h2>4. Licence d&apos;utilisation des documents générés</h2>
          <p className="mt-1">
            Chaque document généré et payé est concédé à l&apos;utilisateur sous une{' '}
            <strong>licence d&apos;utilisation personnelle, non exclusive et non
            transférable</strong>. Cette licence autorise l&apos;utilisateur à utiliser le
            document pour ses besoins propres (candidature, démarche administrative, activité
            professionnelle ou associative), y compris à le transmettre aux destinataires
            légitimes du document (employeur, administration, partenaire contractuel).
          </p>
          <p className="mt-1">
            <strong>Sont expressément interdites</strong> : la reproduction du document ou de
            sa structure à des fins de redistribution, la revente, la location, la cession ou
            la mise à disposition de tiers à titre gratuit ou onéreux, la réutilisation des
            modèles, trames ou contenus de la plateforme pour créer un service concurrent,
            ainsi que toute suppression ou altération des dispositifs d&apos;authenticité
            (filigrane numérique, QR code de vérification, métadonnées).
          </p>
          <p className="mt-1">
            Chaque document intègre des dispositifs de traçabilité (filigrane invisible
            identifiant l&apos;acheteur, code de vérification unique). Toute reproduction ou
            revente non autorisée pourra être détectée et donnera lieu à la révocation des
            licences concernées, sans remboursement, et le cas échéant à des poursuites au
            titre de la contrefaçon et de la responsabilité civile et pénale.
          </p>
        </div>

        <div className="card mb-2">
          <h2>5. Propriété intellectuelle de la plateforme</h2>
          <p className="mt-1">
            La plateforme, sa charte graphique, ses logiciels, ses modèles de documents, ses
            bases de données et ses contenus éditoriaux sont la propriété exclusive
            d&apos;IBIG SARL ou de ses concédants. Aucune disposition des présentes CGU ne
            saurait être interprétée comme une cession de droits de propriété intellectuelle
            au profit de l&apos;utilisateur, au-delà de la licence d&apos;utilisation
            personnelle définie à l&apos;article 4.
          </p>
        </div>

        <div className="card mb-2">
          <h2>6. Responsabilités</h2>
          <p className="mt-1">
            L&apos;utilisateur demeure seul responsable de l&apos;exactitude des informations
            qu&apos;il renseigne dans les questionnaires de génération et de l&apos;usage
            qu&apos;il fait des documents produits. IBIG DocPro fournit des modèles conformes
            aux usages et aux cadres légaux des pays couverts, mais ne fournit pas de conseil
            juridique individualisé : pour toute situation particulière, l&apos;utilisateur
            est invité à consulter un professionnel du droit. IBIG SARL met en œuvre tous les
            moyens raisonnables pour assurer la disponibilité du service, sans garantir une
            continuité absolue (maintenance, cas de force majeure).
          </p>
        </div>

        <div className="card mb-2">
          <h2>7. Données personnelles</h2>
          <p className="mt-1">
            Le traitement des données personnelles des utilisateurs est décrit dans la{' '}
            <Link href="/confidentialite">politique de confidentialité</Link>, qui fait
            partie intégrante des présentes CGU.
          </p>
        </div>

        <div className="card mb-2">
          <h2>8. Résiliation</h2>
          <p className="mt-1">
            Les abonnements sont sans engagement et résiliables à tout moment depuis
            l&apos;espace client ; la résiliation prend effet à la fin de la période déjà
            réglée. IBIG SARL peut résilier ou suspendre un compte en cas de manquement grave
            aux présentes CGU (fraude au paiement, revente de documents, atteinte à la
            sécurité de la plateforme), après notification motivée sauf urgence.
          </p>
        </div>

        <div className="card mb-2">
          <h2>9. Droit applicable et litiges</h2>
          <p className="mt-1">
            Les présentes CGU sont régies par le droit ivoirien et, le cas échéant, par les
            dispositions impératives du pays de résidence de l&apos;utilisateur. En cas de
            différend, les parties rechercheront prioritairement une solution amiable via
            l&apos;assistance client. À défaut d&apos;accord, le litige sera porté devant les
            juridictions compétentes.
          </p>
        </div>

        <div className="card">
          <h2>10. Contact</h2>
          <p className="mt-1">
            Pour toute question relative aux présentes CGU : IBIG SARL —{' '}
            <a href="mailto:docpro@ibigsoft.com">docpro@ibigsoft.com</a> — +225 22 27 60 14 /
            +225 05 55 05 99 01. Voir aussi les{' '}
            <Link href="/mentions-legales">mentions légales</Link>.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
