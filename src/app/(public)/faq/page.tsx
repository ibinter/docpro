import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/public/SiteFooter';
import Link from 'next/link';

export const metadata = {
  title: 'FAQ — Questions fréquentes · IBIG DocPro',
  description: "Plus de 80 réponses sur IBIG DocPro : documents, paiement, compte, technique, juridique, entreprise.",
};

const FAQ: { cat: string; icon: string; id: string; items: { q: string; r: string }[] }[] = [
  {
    cat: 'Démarrage', icon: '🚀', id: 'demarrage',
    items: [
      { q: "Dois-je créer un compte pour générer un document ?", r: "Non. Vous pouvez générer et prévisualiser n'importe quel document gratuitement sans compte. Un compte est requis uniquement pour télécharger le document ou accéder à votre historique." },
      { q: "Comment créer un compte ?", r: "Cliquez sur « Créer un compte » en haut de la page. Renseignez votre nom, email et mot de passe. Votre compte est actif immédiatement." },
      { q: "Est-ce que la première utilisation est gratuite ?", r: "Oui. La prévisualisation de tout document est gratuite. Des crédits d'essai peuvent être disponibles sur votre compte pour tester la génération complète." },
      { q: "Combien de temps faut-il pour obtenir un document ?", r: "En général moins de 30 secondes pour le niveau Standard, 1 à 2 minutes pour Pro et Expert. Vous voyez le document se rédiger en temps réel." },
      { q: "Quels types de documents puis-je générer ?", r: "Contrats, CV, statuts de société, baux, business plans, rapports, cahiers des charges, politiques QHSE, lettres administratives, et bien plus — 12 700+ modèles dans 19 domaines." },
      { q: "Quelle est la différence entre Standard, Pro et Expert ?", r: "Standard : document complet en PDF, conforme OHADA. Pro : plus détaillé, PDF + Word (modifiable), personnalisation sectorielle, 2 régénérations. Expert : niveau notarial, tous formats, jurisprudence locale, relecture humaine." },
      { q: "Puis-je essayer avant d'acheter ?", r: "Oui. Chaque document peut être prévisualisé gratuitement avant paiement. Vous voyez exactement ce que vous recevrez." },
      { q: "Comment trouver le bon modèle ?", r: "Utilisez la recherche du catalogue, filtrez par domaine ou par pays, ou demandez à notre assistant SARA (bouton 💬 en bas à droite) de vous orienter." },
      { q: "Puis-je générer des documents pour plusieurs pays dans le même compte ?", r: "Oui. À chaque génération, vous sélectionnez le pays cible. Votre compte n'est pas lié à un seul pays." },
      { q: "Y a-t-il une limite au nombre de documents que je peux générer ?", r: "Non. Vous payez à l'acte, sans limite de volume. Chaque document est facturé selon sa classe (court/moyen/dossier) et son niveau (Standard/Pro/Expert)." },
    ],
  },
  {
    cat: 'Documents', icon: '📄', id: 'documents',
    items: [
      { q: "Les documents sont-ils conformes aux lois africaines ?", r: "Oui. Chaque document intègre les dispositions légales du pays sélectionné : Acte uniforme OHADA, codes du travail locaux, droit UEMOA, CEMAC, etc. Nos modèles sont régulièrement mis à jour." },
      { q: "Quels formats de fichier sont disponibles ?", r: "PDF (tous niveaux), Word / DOCX modifiable (Pro et Expert), PowerPoint / PPTX et Excel / XLSX pour les documents concernés (Expert et certains Pro)." },
      { q: "Puis-je modifier le document après génération ?", r: "Oui. Les niveaux Pro et Expert incluent le format Word (DOCX) éditable. Vous pouvez aussi demander une régénération avec de nouvelles instructions depuis votre espace documents." },
      { q: "Le document contient-il un QR code d'authenticité ?", r: "Oui. Chaque document payé obtient un QR code unique vérifiable sur notre site public. Il certifie l'origine du document et est impossible à falsifier." },
      { q: "Puis-je obtenir un document en anglais ?", r: "Oui. Lors de la génération, sélectionnez la langue souhaitée dans les options du formulaire. La disponibilité dépend du modèle." },
      { q: "Combien de fois puis-je télécharger mon document ?", r: "Un document payé peut être téléchargé autant de fois que nécessaire depuis votre espace compte, sans frais supplémentaires." },
      { q: "Mes documents sont-ils stockés en ligne ?", r: "Oui. Tous vos documents générés et payés sont conservés dans votre espace compte, accessibles à tout moment." },
      { q: "Puis-je générer un document identique pour plusieurs destinataires ?", r: "Oui. Il suffit de régénérer le document en changeant les informations des parties. Chaque génération est une commande distincte." },
      { q: "Le document est-il légalement valable sans notaire ?", r: "Les documents générés par IBIG DocPro sont conformes aux lois applicables et valables dans les contextes courants. Pour des actes nécessitant un officier public (acte notarié, enregistrement officiel), consultez un professionnel du droit." },
      { q: "Qu'est-ce que la classe A, B, ou C ?", r: "La classe désigne la longueur du document : A = court (1–2 pages, ex. CV, attestation), B = moyen (5–15 pages, ex. contrat, rapport), C = dossier (20+ pages, ex. business plan, étude de marché)." },
      { q: "Puis-je soumettre mes propres modèles ?", r: "Oui. Le programme de soumission de modèles permet à des juristes et professionnels de proposer des modèles. Contactez-nous pour plus d'informations." },
      { q: "Quelle est la durée de validité d'un lien de téléchargement ?", r: "Les liens de téléchargement publics (partagés par QR code) expirent après 30 jours. Vos documents restent disponibles indéfiniment dans votre espace compte." },
      { q: "Puis-je régénérer un document avec des corrections ?", r: "Oui. Le niveau Pro inclut 2 régénérations, Expert en inclut un nombre illimité. Le niveau Standard peut régénérer en payant à nouveau." },
      { q: "Les modèles couvrent-ils le droit OHADA ?", r: "Oui. Tous nos contrats, statuts et actes commerciaux respectent l'Acte uniforme OHADA en vigueur, ainsi que les particularités de chaque pays membre." },
      { q: "Puis-je générer un document sans avoir toutes les informations ?", r: "Oui. Certains champs peuvent être laissés vides — le document contiendra des espaces réservés à compléter. Nous recommandons de renseigner le maximum d'informations pour un document plus précis." },
    ],
  },
  {
    cat: 'Paiement', icon: '💳', id: 'paiement',
    items: [
      { q: "Quels modes de paiement sont acceptés ?", r: "Orange Money, MTN MoMo, Wave, Moov Money, virement bancaire et autres opérateurs Mobile Money via Moneroo. Aucune carte bancaire requise." },
      { q: "Comment payer avec Orange Money ?", r: "Au moment du paiement, sélectionnez Orange Money, entrez votre numéro, et confirmez la transaction via le menu *144# ou l'application Orange Money. Le document est disponible immédiatement après confirmation." },
      { q: "Le paiement est-il sécurisé ?", r: "Oui. Les paiements sont traités par Moneroo, un agrégateur Mobile Money certifié. Nous ne stockons jamais vos données bancaires ou de paiement." },
      { q: "Puis-je payer en dollars ou en euros ?", r: "Les prix sont affichés en FCFA et en USD. Le paiement s'effectue via Mobile Money (en FCFA). Les conversions sont indicatives." },
      { q: "J'ai payé mais mon document n'apparaît pas. Que faire ?", r: "Attendez 2 à 3 minutes — la confirmation peut prendre un peu de temps. Si le problème persiste, ouvrez un ticket support ou contactez-nous sur WhatsApp avec votre référence de transaction." },
      { q: "Puis-je demander un remboursement ?", r: "Les documents générés ne sont pas remboursables une fois téléchargés. Si votre document présente un défaut majeur, contactez notre support — nous le régénérons gratuitement." },
      { q: "Qu'est-ce que le portefeuille de crédits ?", r: "Le portefeuille vous permet de recharger votre compte à l'avance et d'obtenir des bonus jusqu'à +30 %. Exemple : rechargez 10 000 FCFA, recevez 12 000 FCFA (+20 %)." },
      { q: "Les bonus de recharge expirent-ils ?", r: "Vos crédits portefeuille n'expirent pas tant que votre compte est actif." },
      { q: "Puis-je payer avec le solde de mon portefeuille ?", r: "Oui. Si votre portefeuille contient le montant suffisant, vous pouvez l'utiliser directement au paiement sans transaction Mobile Money." },
      { q: "Puis-je obtenir une facture ?", r: "Oui. Chaque commande payée génère une facture téléchargeable depuis votre espace compte dans la section Factures." },
      { q: "Y a-t-il des frais cachés ?", r: "Non. Le prix affiché est le prix final. Aucun abonnement automatique, aucun frais d'activation." },
      { q: "Puis-je payer pour plusieurs documents en une seule transaction ?", r: "Oui. Ajoutez plusieurs documents à votre panier et effectuez un seul paiement pour l'ensemble." },
      { q: "Comment fonctionne le paiement manuel (virement) ?", r: "Vous déclarez votre virement dans l'interface, téléchargez votre preuve de paiement. Notre équipe valide sous 24 à 48 h et active vos accès." },
      { q: "Mon paiement est en attente de vérification. Combien de temps cela prend-il ?", r: "Les paiements Mobile Money sont confirmés automatiquement en 2 à 5 minutes. Les paiements manuels (virement) sont vérifiés sous 24 à 48 h ouvrées." },
      { q: "Puis-je partager mes crédits avec un collègue ?", r: "Les crédits sont liés à votre compte personnel. Pour le partage entre collaborateurs, utilisez les espaces organisation." },
    ],
  },
  {
    cat: 'Compte & Accès', icon: '👤', id: 'compte',
    items: [
      { q: "Comment réinitialiser mon mot de passe ?", r: "Sur la page de connexion, cliquez sur « Mot de passe oublié ». Un lien de réinitialisation est envoyé à votre adresse email." },
      { q: "Comment activer la double authentification (2FA) ?", r: "Allez dans Compte → Sécurité → Activer la 2FA. Scannez le QR code avec Google Authenticator ou Authy, puis saisissez le code pour confirmer." },
      { q: "Comment modifier mon adresse email ?", r: "Allez dans Compte → Profil → Modifier l'email. Une vérification par code est requise." },
      { q: "Puis-je avoir plusieurs utilisateurs sur le même compte ?", r: "Oui. Créez une Organisation et invitez des membres. Chaque membre a son propre accès avec les droits que vous définissez." },
      { q: "Comment renouvelez-je ma licence ?", r: "Allez dans Compte → Licences → Renouveler. Choisissez votre forfait et payez via Mobile Money. Le renouvellement est instantané." },
      { q: "Que se passe-t-il à l'expiration de ma licence ?", r: "Vous entrez en période de grâce de 7 jours avec accès limité. Après 7 jours sans renouvellement, votre compte est suspendu mais vos données sont conservées." },
      { q: "Comment supprimer mon compte ?", r: "Contactez notre support par ticket ou par email pour demander la suppression. Vos données sont effacées conformément à notre politique RGPD dans un délai de 30 jours." },
      { q: "Mes données sont-elles conservées après résiliation ?", r: "Vos données sont conservées pendant 30 jours après résiliation pour vous permettre de les exporter, puis supprimées définitivement." },
      { q: "Comment exporter mes données ?", r: "Allez dans Compte → Profil → Exporter mes données. Vous recevez un fichier ZIP avec vos documents, factures et données personnelles." },
      { q: "Comment changer la langue de l'interface ?", r: "Cliquez sur le sélecteur de langue en haut de page (FR / EN). Le changement est immédiat et mémorisé." },
    ],
  },
  {
    cat: 'Technique', icon: '⚙️', id: 'technique',
    items: [
      { q: "Le site est-il disponible 24h/24 ?", r: "Oui. IBIG DocPro est disponible en continu. Consultez /statut pour l'état en temps réel des services." },
      { q: "Puis-je utiliser IBIG DocPro sur mon téléphone ?", r: "Oui. Le site est entièrement responsive. Vous pouvez aussi l'installer comme application (PWA) depuis votre navigateur mobile." },
      { q: "Comment installer l'application sur mon téléphone ?", r: "Sur Chrome ou Safari, ouvrez le site et appuyez sur « Ajouter à l'écran d'accueil » dans le menu de votre navigateur. L'application s'installe sans passer par une boutique." },
      { q: "La génération a échoué. Que faire ?", r: "Rechargez la page et relancez la génération. Si le problème persiste, ouvrez un ticket support avec les détails (nom du modèle, pays, message d'erreur)." },
      { q: "Mon document s'affiche en blanc ou ne se télécharge pas.", r: "Désactivez temporairement votre bloqueur de publicités ou essayez un autre navigateur. Si le problème persiste, contactez le support avec votre référence de commande." },
      { q: "Puis-je accéder à IBIG DocPro sans connexion internet ?", r: "Non, la génération nécessite une connexion. Vos documents téléchargés sont accessibles hors ligne sur votre appareil." },
      { q: "Quelle est la taille maximale d'un document généré ?", r: "Il n'y a pas de limite imposée. Les business plans et dossiers complets peuvent dépasser 50 pages." },
      { q: "Puis-je utiliser l'API IBIG DocPro pour intégrer la génération dans mon logiciel ?", r: "Oui. Une API REST est disponible pour les développeurs. Consultez /api pour la documentation et créez une clé API depuis Compte → Clés API." },
      { q: "Quel navigateur est recommandé ?", r: "Chrome, Firefox, Edge ou Safari dans leurs versions récentes. Internet Explorer n'est pas supporté." },
      { q: "Puis-je générer plusieurs documents simultanément ?", r: "Oui. Plusieurs onglets peuvent être ouverts avec des générations en parallèle." },
    ],
  },
  {
    cat: 'Juridique & Conformité', icon: '⚖️', id: 'juridique',
    items: [
      { q: "Les documents IBIG DocPro remplacent-ils un avocat ?", r: "Non. IBIG DocPro aide à rédiger des documents professionnels standards conformes à la loi. Pour les situations complexes ou litigieuses, consultez un avocat ou un notaire." },
      { q: "Quels pays sont couverts ?", r: "15 pays africains : Côte d'Ivoire, Sénégal, Cameroun, Bénin, Togo, Burkina Faso, Mali, Guinée, Gabon, Congo, Niger, RDC, Maroc, Algérie, Tunisie. D'autres pays seront ajoutés progressivement." },
      { q: "Les documents sont-ils mis à jour quand les lois changent ?", r: "Oui. Notre équipe juridique surveille les évolutions législatives et met à jour les modèles en conséquence." },
      { q: "Un document IBIG DocPro peut-il être utilisé devant un tribunal ?", r: "Les documents générés sont valables pour les usages courants. Pour une procédure judiciaire, nous recommandons de faire valider le document par un professionnel du droit." },
      { q: "Vos données personnelles sont-elles partagées avec des tiers ?", r: "Non. Vos données ne sont jamais vendues ni partagées avec des tiers à des fins commerciales. Consultez notre politique de confidentialité pour tous les détails." },
      { q: "Comment IBIG DocPro respecte-t-il le RGPD ?", r: "IBIG DocPro applique les principes du RGPD : consentement éclairé, droit d'accès, rectification, suppression et portabilité des données. Voir /rgpd." },
      { q: "Puis-je obtenir un certificat blockchain pour mon document ?", r: "Oui. Certains niveaux incluent un enregistrement blockchain de l'empreinte (hash) du document, vérifiable publiquement pour une preuve d'antériorité." },
      { q: "Le QR code d'authenticité est-il légalement reconnu ?", r: "Le QR code permet de vérifier l'origine et l'intégrité du document sur notre plateforme. Sa valeur probante dépend du contexte légal — consultez un professionnel pour les usages judiciaires." },
      { q: "Puis-je utiliser un document IBIG DocPro pour une demande bancaire ?", r: "Oui. Nos business plans, états financiers et autres documents ont été acceptés par des institutions financières. La décision finale reste à la discrétion de la banque." },
      { q: "IBIG DocPro est-il enregistré comme éditeur de logiciel ?", r: "Oui. IBIG DocPro est édité par IBIG Soft, marque de IBIG SARL (Intermark Business International Group), société légalement enregistrée." },
    ],
  },
  {
    cat: 'Entreprise & B2B', icon: '🏢', id: 'entreprise',
    items: [
      { q: "IBIG DocPro propose-t-il des offres pour les entreprises ?", r: "Oui. Les espaces Organisation permettent de gérer plusieurs utilisateurs, centraliser les documents et obtenir des tarifs de volume. Contactez-nous pour un devis." },
      { q: "Puis-je créer plusieurs sous-comptes pour mon équipe ?", r: "Oui. Créez une Organisation, invitez vos collaborateurs et attribuez des rôles (administrateur, agent, client)." },
      { q: "Est-il possible d'obtenir une facturation mensuelle pour mon entreprise ?", r: "Oui. Un forfait entreprise avec facturation mensuelle est disponible. Contactez docpro@ibigsoft.com pour les modalités." },
      { q: "IBIG DocPro peut-il être intégré dans notre ERP ou CRM ?", r: "Oui. L'API REST permet d'intégrer la génération de documents dans n'importe quel logiciel. Consultez /api pour la documentation technique." },
      { q: "Y a-t-il des remises pour les volumes importants ?", r: "Oui. Des remises progressives sont disponibles pour les clients générant plus de 50 documents par mois. Contactez notre équipe commerciale." },
      { q: "Puis-je générer des documents avec le logo de mon entreprise ?", r: "Oui. Les niveaux Pro et Expert permettent d'ajouter votre logo et votre charte graphique dans certains types de documents." },
      { q: "Comment fonctionne le programme de partenariat IBIG PARTNERS ?", r: "IBIG PARTNERS permet de recommander les solutions IBIG et de percevoir des commissions sur les clients amenés. Inscription gratuite sur ibigpartners.com." },
      { q: "Proposez-vous des formations pour les équipes ?", r: "Oui. Des sessions de formation en ligne et sur site sont disponibles pour les équipes. Contactez-nous pour un programme personnalisé." },
      { q: "Existe-t-il un contrat SLA (niveaux de service) pour les entreprises ?", r: "Oui. Un SLA garantissant la disponibilité et les délais de support est proposé dans le cadre des contrats entreprise. Contactez notre équipe." },
      { q: "IBIG DocPro peut-il générer des documents en marque blanche ?", r: "Oui. Une solution en marque blanche (white-label) est disponible pour les revendeurs et partenaires. Contactez docpro@ibigsoft.com." },
    ],
  },
];

export default function FaqPage() {
  const total = FAQ.reduce((n, c) => n + c.items.length, 0);
  return (
    <>
      <SiteHeader />

      <section style={{ background: 'linear-gradient(135deg,#0D2B4E,#1565C0)', color: '#fff', padding: '48px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem,4vw,2.2rem)', marginBottom: 10 }}>Questions fréquentes</h1>
          <p style={{ opacity: .85, maxWidth: 520, margin: '0 auto' }}>
            {total} réponses sur IBIG DocPro — documents, paiement, compte, technique, juridique.
          </p>
        </div>
      </section>

      {/* Navigation catégories */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e0e6ed', padding: '12px 0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', gap: 8, overflowX: 'auto', flexWrap: 'nowrap' }}>
          {FAQ.map(cat => (
            <a key={cat.id} href={`#${cat.id}`} style={{
              display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
              background: '#f5f7fa', border: '1px solid #e0e6ed', borderRadius: 20,
              padding: '5px 14px', textDecoration: 'none', color: 'var(--navy)',
              fontSize: '.82rem', fontWeight: 600, whiteSpace: 'nowrap',
            }}>
              {cat.icon} {cat.cat}
            </a>
          ))}
        </div>
      </div>

      <div className="container" style={{ maxWidth: 800, padding: '48px 16px' }}>
        {FAQ.map(cat => (
          <section key={cat.id} id={cat.id} style={{ marginBottom: 48, scrollMarginTop: 60 }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>{cat.icon}</span> {cat.cat}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {cat.items.map((item, i) => (
                <details key={i} style={{ background: '#fff', border: '1px solid #e0e6ed', borderRadius: 8, overflow: 'hidden' }}>
                  <summary style={{
                    padding: '14px 18px', cursor: 'pointer', fontWeight: 600,
                    color: 'var(--navy)', fontSize: '.9rem', listStyle: 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    userSelect: 'none',
                  }}>
                    {item.q}
                    <span style={{ fontSize: '1.1rem', flexShrink: 0, marginLeft: 12, color: 'var(--cobalt)' }}>＋</span>
                  </summary>
                  <div style={{ padding: '0 18px 14px', fontSize: '.88rem', color: '#444', lineHeight: 1.75, borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
                    {item.r}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <div style={{ background: 'linear-gradient(135deg,#0D2B4E,#1565C0)', borderRadius: 12, padding: '28px 24px', textAlign: 'center', color: '#fff' }}>
          <p style={{ margin: '0 0 16px', fontSize: '1rem' }}>Vous n'avez pas trouvé votre réponse ?</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/2250555059901" target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', padding: '9px 20px', borderRadius: 7, textDecoration: 'none', fontWeight: 600, fontSize: '.9rem' }}>
              📲 WhatsApp
            </a>
            <Link href="/compte/assistance"
              style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.4)', color: '#fff', padding: '9px 20px', borderRadius: 7, textDecoration: 'none', fontWeight: 600, fontSize: '.9rem' }}>
              💬 Support
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
