// Politique de confidentialité — protection des données (esprit RGPD / lois locales).
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';

export const metadata = {
  title: 'Politique de confidentialité — IBIG DocPro',
  description: 'Comment IBIG DocPro collecte, utilise et protège vos données personnelles.',
};

export default function ConfidentialitePage() {
  return (
    <>
      <SiteHeader />
      <main className="container mt-3 mb-3" style={{ maxWidth: 860, minHeight: '60vh' }}>
        <h1>Politique de confidentialité</h1>
        <p className="text-muted mt-1 mb-3">
          Dernière mise à jour : 1<sup>er</sup> janvier 2026. IBIG SARL, éditeur de la
          plateforme IBIG DocPro, accorde la plus grande importance à la protection de vos
          données personnelles, dans le respect des réglementations applicables (RGPD pour
          les utilisateurs concernés, lois nationales de protection des données).
        </p>

        <div className="card mb-2">
          <h2>1. Responsable du traitement</h2>
          <p className="mt-1">
            Le responsable du traitement est <strong>IBIG SARL</strong>, exploitant la
            plateforme docpro.ibigsoft.com. Pour toute question relative à vos données, vous
            pouvez contacter notre délégué à la protection des données (DPO) à
            l&apos;adresse <a href="mailto:docpro@ibigsoft.com">docpro@ibigsoft.com</a>.
          </p>
        </div>

        <div className="card mb-2">
          <h2>2. Données collectées</h2>
          <p className="mt-1">Nous collectons uniquement les données nécessaires au fonctionnement du service :</p>
          <ul className="mt-1" style={{ paddingLeft: 20, display: 'grid', gap: 6 }}>
            <li><strong>Données de compte</strong> : nom, adresse e-mail, téléphone (facultatif), pays, langue, mot de passe (stocké exclusivement sous forme hachée).</li>
            <li><strong>Données de profil documentaire</strong> : informations que vous renseignez pour pré-remplir vos documents (parcours, coordonnées professionnelles…).</li>
            <li><strong>Contenu des documents</strong> : réponses aux questionnaires et documents générés, conservés dans votre espace personnel.</li>
            <li><strong>Données de facturation</strong> : commandes, transactions, références de paiement, preuves de paiement soumises, factures et reçus. Nous ne stockons jamais vos numéros de carte bancaire ni vos codes Mobile Money.</li>
            <li><strong>Données techniques</strong> : journaux de connexion, adresse IP, type de navigateur, à des fins de sécurité et de prévention de la fraude.</li>
          </ul>
        </div>

        <div className="card mb-2">
          <h2>3. Finalités et bases légales</h2>
          <ul className="mt-1" style={{ paddingLeft: 20, display: 'grid', gap: 6 }}>
            <li><strong>Fourniture du service</strong> (génération, stockage et téléchargement de documents, gestion des licences) — exécution du contrat.</li>
            <li><strong>Facturation et comptabilité</strong> (commandes, factures, reçus) — obligation légale.</li>
            <li><strong>Sécurité et lutte contre la fraude</strong> (vérification des paiements, détection d&apos;anomalies, traçabilité des documents) — intérêt légitime.</li>
            <li><strong>Notifications de service</strong> (confirmation de paiement, expiration de licence, réponses de l&apos;assistance) — exécution du contrat.</li>
            <li><strong>Communications commerciales</strong> — uniquement avec votre consentement, révocable à tout moment.</li>
          </ul>
        </div>

        <div className="card mb-2">
          <h2>4. Durées de conservation</h2>
          <ul className="mt-1" style={{ paddingLeft: 20, display: 'grid', gap: 6 }}>
            <li><strong>Compte et documents</strong> : pendant toute la durée de vie du compte, puis suppression ou anonymisation dans les 12 mois suivant sa clôture.</li>
            <li><strong>Factures et pièces comptables</strong> : 10 ans, conformément aux obligations comptables.</li>
            <li><strong>Preuves de paiement et journaux anti-fraude</strong> : 5 ans à compter de la transaction.</li>
            <li><strong>Journaux techniques de connexion</strong> : 12 mois.</li>
          </ul>
        </div>

        <div className="card mb-2">
          <h2>5. Destinataires des données</h2>
          <p className="mt-1">
            Vos données sont traitées par le personnel habilité d&apos;IBIG SARL et par nos
            sous-traitants techniques strictement nécessaires au service : hébergement,
            prestataires de paiement (par exemple Moneroo et les opérateurs Mobile Money,
            pour la seule exécution des transactions) et outils d&apos;envoi de
            notifications. Vos données ne sont <strong>jamais vendues</strong> ni louées à
            des tiers. Un encadrement contractuel conforme est mis en place en cas de
            transfert hors de votre juridiction.
          </p>
        </div>

        <div className="card mb-2">
          <h2>6. Sécurité</h2>
          <p className="mt-1">
            Nous mettons en œuvre des mesures techniques et organisationnelles adaptées :
            chiffrement des échanges (HTTPS), hachage des mots de passe, cloisonnement des
            accès selon les rôles, journal d&apos;audit des actions sensibles, stockage privé
            des preuves de paiement (jamais accessibles par URL publique) et surveillance
            anti-fraude. En cas de violation de données susceptible d&apos;engendrer un
            risque pour vos droits, vous serez informé conformément à la réglementation.
          </p>
        </div>

        <div className="card mb-2">
          <h2>7. Vos droits</h2>
          <p className="mt-1">
            Vous disposez des droits d&apos;accès, de rectification, d&apos;effacement, de
            limitation du traitement, de portabilité de vos données et d&apos;opposition pour
            motif légitime, ainsi que du droit de retirer votre consentement à tout moment
            pour les traitements qui en dépendent. Vous pouvez exercer ces droits :
          </p>
          <ul className="mt-1" style={{ paddingLeft: 20, display: 'grid', gap: 6 }}>
            <li>directement depuis votre espace client (rubrique « Mon profil ») ;</li>
            <li>par e-mail auprès du DPO : <a href="mailto:docpro@ibigsoft.com">docpro@ibigsoft.com</a> ;</li>
            <li>par téléphone : +225 22 27 60 14 ou +225 05 55 05 99 01.</li>
          </ul>
          <p className="mt-1">
            Nous répondons dans un délai maximal de 30 jours. Vous disposez également du
            droit d&apos;introduire une réclamation auprès de l&apos;autorité de protection
            des données compétente de votre pays.
          </p>
        </div>

        <div className="card mb-2">
          <h2>8. Cookies</h2>
          <p className="mt-1">
            La plateforme utilise uniquement des cookies strictement nécessaires au
            fonctionnement du service (cookie de session d&apos;authentification, sécurisé et
            inaccessible aux scripts). Aucun cookie publicitaire ou de pistage tiers
            n&apos;est déposé sans votre consentement.
          </p>
        </div>

        <div className="card">
          <h2>9. Modifications de la présente politique</h2>
          <p className="mt-1">
            Toute évolution substantielle de cette politique sera notifiée dans votre espace
            client et publiée sur cette page. Voir aussi nos{' '}
            <Link href="/cgu">conditions générales d&apos;utilisation</Link> et nos{' '}
            <Link href="/mentions-legales">mentions légales</Link>.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
