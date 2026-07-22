// Seed Médias & Propriété Intellectuelle — Agent Templates-12
// 25 templates : 15 media_* (commercial_financier) + 10 pi_* (juridique_admin)
// Exécution : npx tsx prisma/seed-medias-pi.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const F = (fields: object[]) => JSON.stringify(fields);

type DriveTemplate = {
  code: string;
  name: string;
  category: string;
  price: number;
  priceMax: number;
  description: string;
  fieldsJson: string;
  body: string;
  popularity: number;
  formatsJson?: string;
};

const templates: DriveTemplate[] = [

  // ═══════════════════════════════════════════════════════════
  //  MÉDIAS & COMMUNICATION (15 templates media_)
  // ═══════════════════════════════════════════════════════════

  {
    code: 'media_contrat_journaliste',
    name: 'Contrat de pige journaliste / pigiste',
    category: 'commercial_financier',
    price: 1000, priceMax: 2000,
    description: 'Contrat de pige entre un organe de presse et un journaliste pigiste : mission, tarif à la pige, droits d\'auteur cédés, délais de livraison et conditions de paiement.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'organe_presse', label: 'Organe de presse (nom, adresse, forme juridique)', type: 'textarea', required: true },
      { key: 'journaliste', label: 'Journaliste pigiste (nom, adresse, n° carte de presse)', type: 'textarea', required: true },
      { key: 'mission', label: 'Mission confiée (sujet, rubriques, types d\'articles)', type: 'textarea', required: true },
      { key: 'tarif_pige', label: 'Tarif à la pige (montant par article / signe)', type: 'text', required: true },
      { key: 'delai_livraison', label: 'Délai de livraison des articles', type: 'text', required: true },
      { key: 'periodicite', label: 'Périodicité estimée des commandes', type: 'text', required: true },
      { key: 'droits_cedes', label: 'Droits cédés (support, territoire, durée)', type: 'textarea', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement (délai, mode)', type: 'text', required: true },
      { key: 'clause_exclusivite', label: 'Clause d\'exclusivité (oui/non + périmètre)', type: 'textarea', required: false },
      { key: 'juridiction', label: 'Droit applicable et juridiction compétente', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PIGE JOURNALISTIQUE</h1><p><strong>Entre :</strong> {{organe_presse}} (ci-après « l\'Éditeur »),</p><p><strong>Et :</strong> {{journaliste}} (ci-après « le Pigiste »).</p><p>Il est convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>L\'Éditeur confie au Pigiste la réalisation d\'articles et contenus journalistiques dans le cadre de la mission suivante : {{mission}}.</p><h2>Article 2 — Statut du pigiste</h2><p>Le Pigiste exerce son activité en qualité de journaliste professionnel au sens de la législation applicable. Le présent contrat ne crée pas de lien de subordination permanent entre les parties, le Pigiste conservant sa liberté de travail et pouvant refuser des commandes sans motiver sa décision, sous réserve des engagements pris.</p><h2>Article 3 — Rémunération</h2><p>Chaque article commandé et publié donnera lieu au versement d\'un tarif de pige de <strong>{{tarif_pige}}</strong>. Les factures sont réglées selon les modalités suivantes : {{modalites_paiement}}.</p><h2>Article 4 — Délai et périodicité</h2><p>Le Pigiste s\'engage à livrer chaque article dans un délai de <strong>{{delai_livraison}}</strong> à compter de la commande. La périodicité estimée des commandes est de {{periodicite}}.</p><h2>Article 5 — Droits d\'auteur</h2><p>Le Pigiste cède à l\'Éditeur les droits d\'exploitation suivants sur les articles livrés et payés : {{droits_cedes}}. Toute exploitation hors du périmètre cédé requiert un accord écrit et une rémunération complémentaire.</p><h2>Article 6 — Exclusivité</h2><p>{{clause_exclusivite}}</p><h2>Article 7 — Obligations du pigiste</h2><p>Le Pigiste s\'engage à respecter la charte déontologique de l\'Éditeur, à vérifier l\'exactitude des informations publiées, à signaler tout conflit d\'intérêts potentiel et à restituer les frais engagés sur avance si l\'article n\'est pas livré dans les délais sans motif valable.</p><h2>Article 8 — Obligations de l\'éditeur</h2><p>L\'Éditeur s\'engage à préciser les commandes par écrit, à fournir les accréditations nécessaires, à rembourser les frais professionnels justifiés et à payer les piges dans les délais convenus.</p><h2>Article 9 — Droit applicable</h2><p>Le présent contrat est soumis à {{juridiction}}. Tout litige non résolu à l\'amiable sera porté devant les juridictions compétentes.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>L\'ÉDITEUR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE PIGISTE<br/>Signature + cachet &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature</p></div>`,
    popularity: 32,
  },

  {
    code: 'media_contrat_photographe_presse',
    name: 'Contrat photographe de presse',
    category: 'commercial_financier',
    price: 1000, priceMax: 2000,
    description: 'Contrat entre un organe de presse et un photographe : missions de reportage, tarif par photo publiée, cession de droits image, crédit photo et conditions d\'archivage.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'editeur', label: 'Éditeur / organe de presse (nom, adresse)', type: 'textarea', required: true },
      { key: 'photographe', label: 'Photographe (nom, adresse, statut)', type: 'textarea', required: true },
      { key: 'missions', label: 'Missions confiées (reportages, événements, rubriques)', type: 'textarea', required: true },
      { key: 'tarif_photo', label: 'Tarif par photo publiée ou par reportage', type: 'text', required: true },
      { key: 'credit_photo', label: 'Mention du crédit photo (formule exacte)', type: 'text', required: true },
      { key: 'droits_cedes', label: 'Droits cédés (support, territoire, durée)', type: 'textarea', required: true },
      { key: 'format_livraison', label: 'Format de livraison des fichiers (résolution, format)', type: 'text', required: true },
      { key: 'delai_paiement', label: 'Délai et modalités de paiement', type: 'text', required: true },
      { key: 'archivage', label: 'Conditions d\'archivage et de réutilisation', type: 'textarea', required: false },
      { key: 'droit_applicable', label: 'Droit applicable et juridiction', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT PHOTOGRAPHE DE PRESSE</h1><p><strong>Éditeur :</strong> {{editeur}}</p><p><strong>Photographe :</strong> {{photographe}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>L\'Éditeur fait appel au Photographe pour réaliser des missions photographiques de presse dans le cadre suivant : {{missions}}.</p><h2>Article 2 — Rémunération</h2><p>Chaque photo publiée ou reportage livré donne lieu au versement de : <strong>{{tarif_photo}}</strong>. Le paiement intervient selon les modalités : {{delai_paiement}}.</p><h2>Article 3 — Crédit photo</h2><p>L\'Éditeur s\'engage à faire figurer la mention <em>{{credit_photo}}</em> sous chaque photographie publiée. L\'omission du crédit engage la responsabilité de l\'Éditeur et ouvre droit à une indemnisation complémentaire.</p><h2>Article 4 — Cession de droits</h2><p>Le Photographe cède à l\'Éditeur les droits d\'exploitation suivants sur les photographies livrées et payées : {{droits_cedes}}. Le Photographe conserve la pleine propriété de son fonds photographique et peut y inclure les images non publiées.</p><h2>Article 5 — Format et livraison</h2><p>Les fichiers sont livrés au format suivant : {{format_livraison}}. Tout fichier non conforme aux spécifications pourra être refusé avec notification motivée dans un délai de 48 heures.</p><h2>Article 6 — Archivage et réutilisation</h2><p>{{archivage}}</p><h2>Article 7 — Propriété et droits moraux</h2><p>Le Photographe conserve ses droits moraux sur les œuvres créées. Toute retouche substantielle modifiant l\'intégrité de l\'image requiert son accord préalable écrit.</p><h2>Article 8 — Matériel et frais</h2><p>Le Photographe fournit son propre matériel. Les frais de déplacement et d\'accréditation engagés dans le cadre des missions commandées sont remboursés sur justificatifs dans les 30 jours.</p><h2>Article 9 — Droit applicable</h2><p>Le présent contrat est soumis à {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>L\'ÉDITEUR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE PHOTOGRAPHE<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature</p></div>`,
    popularity: 28,
  },

  {
    code: 'media_accord_exclusivite_contenu',
    name: 'Accord d\'exclusivité éditoriale',
    category: 'commercial_financier',
    price: 1500, priceMax: 2500,
    description: 'Accord conférant à un éditeur l\'exclusivité de publication de contenus (articles, chroniques, séries) d\'un auteur ou créateur sur une période et un territoire définis.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'editeur', label: 'Éditeur bénéficiaire de l\'exclusivité (nom, adresse)', type: 'textarea', required: true },
      { key: 'createur', label: 'Créateur / auteur (nom, adresse)', type: 'textarea', required: true },
      { key: 'contenu', label: 'Description des contenus couverts par l\'exclusivité', type: 'textarea', required: true },
      { key: 'territoire', label: 'Territoire de l\'exclusivité', type: 'text', required: true },
      { key: 'duree', label: 'Durée de l\'accord d\'exclusivité', type: 'text', required: true },
      { key: 'contrepartie', label: 'Contrepartie financière (rémunération minimale garantie)', type: 'text', required: true },
      { key: 'volume_minimum', label: 'Volume minimum de contenus à produire', type: 'text', required: false },
      { key: 'exceptions', label: 'Exceptions à l\'exclusivité (anciens engagements, autres supports)', type: 'textarea', required: false },
      { key: 'resiliation', label: 'Conditions de résiliation anticipée', type: 'textarea', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD D'EXCLUSIVITÉ ÉDITORIALE</h1><p><strong>Éditeur :</strong> {{editeur}}</p><p><strong>Créateur :</strong> {{createur}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Par le présent accord, le Créateur s\'engage à réserver à l\'Éditeur, en exclusivité, la publication première des contenus suivants : {{contenu}}.</p><h2>Article 2 — Territoire</h2><p>L\'exclusivité s\'applique sur le territoire suivant : <strong>{{territoire}}</strong>.</p><h2>Article 3 — Durée</h2><p>Le présent accord est conclu pour une durée de <strong>{{duree}}</strong> à compter du {{date_jour}}. À l\'issue de cette période, il prend fin automatiquement sauf renouvellement écrit.</p><h2>Article 4 — Contrepartie</h2><p>En échange de l\'exclusivité accordée, l\'Éditeur verse au Créateur une rémunération de <strong>{{contrepartie}}</strong>, indépendamment du nombre de contenus effectivement publiés.</p><h2>Article 5 — Volume de production</h2><p>{{volume_minimum}}</p><h2>Article 6 — Exceptions</h2><p>{{exceptions}}</p><h2>Article 7 — Obligations de l\'éditeur</h2><p>L\'Éditeur s\'engage à publier les contenus livrés dans un délai raisonnable, à respecter l\'intégrité éditoriale des œuvres sauf modifications convenues, et à assurer une diffusion active des contenus auprès de son audience.</p><h2>Article 8 — Obligations du créateur</h2><p>Le Créateur s\'engage à ne pas publier ni céder à des tiers les contenus couverts par la présente exclusivité pendant la durée du contrat. Il garantit être titulaire de tous les droits nécessaires à la conclusion du présent accord.</p><h2>Article 9 — Résiliation</h2><p>{{resiliation}}</p><h2>Article 10 — Droit applicable</h2><p>Le présent accord est soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>L\'ÉDITEUR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE CRÉATEUR<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature</p></div>`,
    popularity: 25,
  },

  {
    code: 'media_contrat_podcast',
    name: 'Contrat de production de podcast',
    category: 'commercial_financier',
    price: 1000, priceMax: 2000,
    description: 'Contrat entre un commanditaire et un producteur de podcast : format, fréquence, droits de diffusion, monétisation et conditions de publication sur plateformes numériques.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'commanditaire', label: 'Commanditaire / donneur d\'ordre (nom, société)', type: 'textarea', required: true },
      { key: 'producteur', label: 'Producteur / studio (nom, société)', type: 'textarea', required: true },
      { key: 'titre_podcast', label: 'Titre et description du podcast', type: 'textarea', required: true },
      { key: 'format', label: 'Format (durée par épisode, style : interview, solo, débat…)', type: 'textarea', required: true },
      { key: 'nombre_episodes', label: 'Nombre d\'épisodes commandés', type: 'text', required: true },
      { key: 'frequence', label: 'Fréquence de publication', type: 'text', required: true },
      { key: 'remuneration', label: 'Rémunération (forfait, par épisode, partage de revenus)', type: 'textarea', required: true },
      { key: 'plateformes', label: 'Plateformes de diffusion autorisées', type: 'textarea', required: true },
      { key: 'droits', label: 'Droits de propriété (qui détient le podcast et les archives)', type: 'textarea', required: true },
      { key: 'monetisation', label: 'Règles de monétisation (publicité, sponsoring, abonnement)', type: 'textarea', required: false },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRODUCTION DE PODCAST</h1><p><strong>Commanditaire :</strong> {{commanditaire}}</p><p><strong>Producteur :</strong> {{producteur}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Le Commanditaire confie au Producteur la production du podcast intitulé <strong>{{titre_podcast}}</strong>, selon les conditions définies ci-après.</p><h2>Article 2 — Format</h2><p>{{format}}</p><h2>Article 3 — Volume et planning</h2><p>Le Producteur réalisera <strong>{{nombre_episodes}}</strong> épisodes à une fréquence de <strong>{{frequence}}</strong>. Le calendrier détaillé est établi d\'un commun accord avant le début de la production.</p><h2>Article 4 — Rémunération</h2><p>{{remuneration}}</p><h2>Article 5 — Diffusion</h2><p>Le Commanditaire est autorisé à diffuser le podcast sur les plateformes suivantes : {{plateformes}}. Toute diffusion sur un autre support requiert l\'accord préalable écrit du Producteur.</p><h2>Article 6 — Propriété des droits</h2><p>{{droits}}</p><h2>Article 7 — Monétisation</h2><p>{{monetisation}}</p><h2>Article 8 — Obligations du producteur</h2><p>Le Producteur s\'engage à livrer des épisodes conformes aux spécifications techniques (qualité audio, masterisation, métadonnées), au planning convenu et à la ligne éditoriale du podcast.</p><h2>Article 9 — Obligations du commanditaire</h2><p>Le Commanditaire s\'engage à valider les scripts ou briefs dans les délais convenus, à fournir les éléments nécessaires (logo, jingle, invités) et à payer les factures à échéance.</p><h2>Article 10 — Droit applicable</h2><p>Le présent contrat est soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE COMMANDITAIRE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE PRODUCTEUR<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature</p></div>`,
    popularity: 30,
  },

  {
    code: 'media_contrat_production_video',
    name: 'Contrat de production vidéo / audiovisuel',
    category: 'commercial_financier',
    price: 1500, priceMax: 2500,
    description: 'Contrat de prestation audiovisuelle entre un commanditaire et un producteur vidéo : brief créatif, livrables, planning de tournage, droits d\'exploitation et conditions de paiement.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'commanditaire', label: 'Commanditaire (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'producteur', label: 'Producteur / réalisateur (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'description_projet', label: 'Description du projet vidéo (type, thématique, usage)', type: 'textarea', required: true },
      { key: 'livrables', label: 'Livrables (formats, durées, versions)', type: 'textarea', required: true },
      { key: 'planning', label: 'Planning (dates de tournage, post-production, livraison)', type: 'textarea', required: true },
      { key: 'budget', label: 'Budget total et modalités de paiement', type: 'textarea', required: true },
      { key: 'droits_exploitation', label: 'Droits d\'exploitation cédés (supports, territoire, durée)', type: 'textarea', required: true },
      { key: 'validations', label: 'Processus de validation (nombre de retours, délais)', type: 'textarea', required: true },
      { key: 'credits', label: 'Mention des crédits et générique', type: 'text', required: false },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE PRODUCTION VIDÉO / AUDIOVISUEL</h1><p><strong>Commanditaire :</strong> {{commanditaire}}</p><p><strong>Producteur :</strong> {{producteur}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Le Commanditaire confie au Producteur la réalisation d\'une production audiovisuelle décrite comme suit : {{description_projet}}.</p><h2>Article 2 — Livrables</h2><p>{{livrables}}</p><h2>Article 3 — Planning</h2><p>{{planning}}</p><h2>Article 4 — Budget et paiement</h2><p>{{budget}}</p><h2>Article 5 — Droits d\'exploitation</h2><p>À complet paiement du prix, le Commanditaire acquiert les droits d\'exploitation suivants sur la production : {{droits_exploitation}}. Le Producteur conserve ses droits moraux et le droit de faire figurer la production dans son portfolio, sauf clause contraire.</p><h2>Article 6 — Processus de validation</h2><p>{{validations}}. Au-delà du nombre de retours prévu, toute demande de modification supplémentaire fait l\'objet d\'un avenant tarifaire.</p><h2>Article 7 — Crédits</h2><p>{{credits}}</p><h2>Article 8 — Obligations des parties</h2><p>Le Producteur s\'engage à respecter la charte créative du Commanditaire, à fournir les fichiers sources à la livraison finale et à assurer la confidentialité des éléments communiqués. Le Commanditaire s\'engage à valider les étapes dans les délais convenus.</p><h2>Article 9 — Force majeure et imprévus</h2><p>En cas d\'événement de force majeure ou de circonstances imprévues affectant le tournage, les parties conviennent de bonne foi d\'un nouveau calendrier sans pénalité.</p><h2>Article 10 — Droit applicable</h2><p>Le présent contrat est soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE COMMANDITAIRE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE PRODUCTEUR<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature</p></div>`,
    popularity: 35,
  },

  {
    code: 'media_accord_distribution_film',
    name: 'Accord de distribution de film',
    category: 'commercial_financier',
    price: 2000, priceMax: 3500,
    description: 'Accord entre un producteur de film et un distributeur : territoires, médias d\'exploitation, avance sur recettes, partage des revenus et obligations de promotion.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'producteur', label: 'Producteur (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'distributeur', label: 'Distributeur (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'titre_film', label: 'Titre et description du film', type: 'textarea', required: true },
      { key: 'territoires', label: 'Territoires de distribution concédés', type: 'textarea', required: true },
      { key: 'medias', label: 'Médias et fenêtres d\'exploitation (salles, VOD, TV, streaming…)', type: 'textarea', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat de distribution', type: 'text', required: true },
      { key: 'avance', label: 'Avance minimum garantie (MG)', type: 'text', required: true },
      { key: 'partage_revenus', label: 'Pourcentage de partage des revenus nets', type: 'text', required: true },
      { key: 'obligations_promo', label: 'Obligations de promotion et budget P&A', type: 'textarea', required: true },
      { key: 'reddition_comptes', label: 'Fréquence des relevés de compte et audits', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE DISTRIBUTION DE FILM</h1><p><strong>Producteur :</strong> {{producteur}}</p><p><strong>Distributeur :</strong> {{distributeur}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Le Producteur accorde au Distributeur le droit exclusif de distribuer l\'œuvre cinématographique suivante : {{titre_film}}, dans les conditions définies ci-après.</p><h2>Article 2 — Territoires</h2><p>{{territoires}}</p><h2>Article 3 — Médias et fenêtres d\'exploitation</h2><p>{{medias}}</p><h2>Article 4 — Durée</h2><p>Le présent accord est conclu pour une durée de <strong>{{duree_contrat}}</strong> à compter du {{date_jour}}.</p><h2>Article 5 — Avance minimum garantie</h2><p>Le Distributeur verse au Producteur une avance minimum garantie de <strong>{{avance}}</strong>, non remboursable sauf violation contractuelle. Cette avance est déductible des redevances futures.</p><h2>Article 6 — Partage des revenus</h2><p>Après récupération de l\'avance, les revenus nets d\'exploitation sont partagés comme suit : <strong>{{partage_revenus}}</strong> en faveur du Producteur, le solde revenant au Distributeur pour couvrir ses frais de distribution.</p><h2>Article 7 — Obligations de promotion</h2><p>{{obligations_promo}}</p><h2>Article 8 — Reddition des comptes</h2><p>Le Distributeur fournit des relevés de compte {{reddition_comptes}}, accompagnés des justificatifs de recettes. Le Producteur dispose d\'un droit d\'audit, exercé sur préavis de 15 jours.</p><h2>Article 9 — Propriété intellectuelle</h2><p>Le Producteur demeure titulaire de tous droits de propriété intellectuelle sur le film. Le présent accord constitue une licence d\'exploitation et non une cession de droits.</p><h2>Article 10 — Résiliation</h2><p>En cas de manquement grave non corrigé dans les 30 jours suivant mise en demeure, le Producteur peut résilier le contrat et récupérer les droits de distribution.</p><h2>Article 11 — Droit applicable</h2><p>Le présent accord est soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE PRODUCTEUR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE DISTRIBUTEUR<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 27,
  },

  {
    code: 'media_contrat_animateur_radio',
    name: 'Contrat animateur radio / présentateur TV',
    category: 'commercial_financier',
    price: 1000, priceMax: 2000,
    description: 'Contrat entre une station radio ou chaîne TV et un animateur / présentateur : émissions assurées, obligations d\'antenne, rémunération, droits à l\'image et clause de non-concurrence.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'employeur', label: 'Station / chaîne employeur (nom, adresse)', type: 'textarea', required: true },
      { key: 'animateur', label: 'Animateur / présentateur (nom, adresse)', type: 'textarea', required: true },
      { key: 'emissions', label: 'Émissions confiées (titre, format, créneaux horaires)', type: 'textarea', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'remuneration', label: 'Rémunération mensuelle et avantages', type: 'textarea', required: true },
      { key: 'obligations_antenne', label: 'Obligations d\'antenne (présence, répétitions, lancements)', type: 'textarea', required: true },
      { key: 'droits_image', label: 'Cession de droits à l\'image (supports, durée)', type: 'textarea', required: true },
      { key: 'non_concurrence', label: 'Clause de non-concurrence (périmètre, durée)', type: 'textarea', required: false },
      { key: 'confidentialite', label: 'Obligations de confidentialité', type: 'textarea', required: false },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT D'ANIMATEUR RADIO / PRÉSENTATEUR TV</h1><p><strong>Employeur :</strong> {{employeur}}</p><p><strong>Animateur :</strong> {{animateur}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>L\'Employeur engage l\'Animateur pour assurer les émissions suivantes : {{emissions}}.</p><h2>Article 2 — Durée</h2><p>Le contrat est conclu pour une durée de <strong>{{duree_contrat}}</strong> à compter du {{date_jour}}.</p><h2>Article 3 — Rémunération</h2><p>{{remuneration}}</p><h2>Article 4 — Obligations d\'antenne</h2><p>{{obligations_antenne}}</p><h2>Article 5 — Image et notoriété</h2><p>L\'Animateur autorise l\'Employeur à utiliser son nom, sa voix, son image et sa biographie dans le cadre suivant : {{droits_image}}. Cette autorisation est consentie sans rémunération distincte, sauf accord contraire.</p><h2>Article 6 — Non-concurrence</h2><p>{{non_concurrence}}</p><h2>Article 7 — Confidentialité</h2><p>{{confidentialite}}</p><h2>Article 8 — Obligations déontologiques</h2><p>L\'Animateur s\'engage à respecter la ligne éditoriale, les règles d\'éthique professionnelle et les obligations légales de la station, notamment en matière de respect de la vie privée, de pluralisme et de déontologie de l\'information.</p><h2>Article 9 — Résiliation</h2><p>En cas de faute grave ou de manquement persistant, le contrat peut être résilié avec effet immédiat. En dehors de ce cas, un préavis de 3 mois est requis de part et d\'autre.</p><h2>Article 10 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>L\'EMPLOYEUR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L\'ANIMATEUR<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature</p></div>`,
    popularity: 26,
  },

  {
    code: 'media_contrat_publicitaire',
    name: 'Contrat publicitaire (insertion / diffusion)',
    category: 'commercial_financier',
    price: 1000, priceMax: 2000,
    description: 'Contrat entre un annonceur et un support médiatique pour l\'insertion ou la diffusion de publicités : formats, fréquences, tarifs, conditions de livraison des créations et responsabilités.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'support', label: 'Support médiatique (nom, type : presse, radio, TV, digital)', type: 'textarea', required: true },
      { key: 'annonceur', label: 'Annonceur (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'campagne', label: 'Description de la campagne et objectifs', type: 'textarea', required: true },
      { key: 'formats', label: 'Formats publicitaires retenus (taille, durée, emplacement)', type: 'textarea', required: true },
      { key: 'frequence', label: 'Fréquence et planning de diffusion / parution', type: 'textarea', required: true },
      { key: 'tarif', label: 'Tarif total et conditions de paiement', type: 'textarea', required: true },
      { key: 'livraison_creation', label: 'Délai et spécifications de livraison des créations', type: 'textarea', required: true },
      { key: 'garanties_audience', label: 'Garanties d\'audience ou de diffusion (GRP, impressions…)', type: 'text', required: false },
      { key: 'responsabilites', label: 'Responsabilité sur le contenu publicitaire', type: 'textarea', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT PUBLICITAIRE</h1><p><strong>Support :</strong> {{support}}</p><p><strong>Annonceur :</strong> {{annonceur}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Le Support s\'engage à diffuser ou insérer les publicités de l\'Annonceur dans le cadre de la campagne suivante : {{campagne}}.</p><h2>Article 2 — Formats et emplacements</h2><p>{{formats}}</p><h2>Article 3 — Planning de diffusion</h2><p>{{frequence}}</p><h2>Article 4 — Tarif et paiement</h2><p>{{tarif}}</p><h2>Article 5 — Livraison des créations</h2><p>{{livraison_creation}}. Tout retard de livraison imputable à l\'Annonceur n\'ouvre pas droit à remboursement ou report, sauf accord écrit du Support.</p><h2>Article 6 — Garanties de diffusion</h2><p>{{garanties_audience}}</p><h2>Article 7 — Responsabilités</h2><p>{{responsabilites}}. L\'Annonceur garantit que les contenus publicitaires sont conformes à la législation en vigueur, ne portent pas atteinte aux droits de tiers et n\'induisent pas le consommateur en erreur. Il indemnisera le Support de tout préjudice résultant d\'une infraction à cette garantie.</p><h2>Article 8 — Justificatifs</h2><p>Le Support fournit à l\'Annonceur, dans les 15 jours suivant chaque insertion ou campagne, les justificatifs de diffusion (copie d\'écran, extrait audio/vidéo, impression, rapport d\'impressions digitales).</p><h2>Article 9 — Résiliation</h2><p>Toute annulation par l\'Annonceur moins de 15 jours avant la date de diffusion prévue entraîne la facturation de 50 % du tarif convenu, à titre de compensation forfaitaire.</p><h2>Article 10 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE SUPPORT MÉDIATIQUE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L\'ANNONCEUR<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 33,
  },

  {
    code: 'media_accord_partenariat_editorial',
    name: 'Accord de partenariat éditorial',
    category: 'commercial_financier',
    price: 1000, priceMax: 2000,
    description: 'Accord de coopération éditoriale entre deux organes de presse ou deux éditeurs : échange de contenus, co-production, partage de ressources et conditions de publication croisée.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'partenaire_a', label: 'Partenaire A (nom, support, adresse)', type: 'textarea', required: true },
      { key: 'partenaire_b', label: 'Partenaire B (nom, support, adresse)', type: 'textarea', required: true },
      { key: 'objet_partenariat', label: 'Objet du partenariat éditorial (échange, co-production, etc.)', type: 'textarea', required: true },
      { key: 'contenus_partages', label: 'Types de contenus partagés et périmètre thématique', type: 'textarea', required: true },
      { key: 'conditions_publication', label: 'Conditions de publication croisée (crédit, délai, format)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du partenariat', type: 'text', required: true },
      { key: 'contrepartie', label: 'Contrepartie financière ou en nature', type: 'textarea', required: false },
      { key: 'exclusivite', label: 'Clause d\'exclusivité thématique (oui/non + périmètre)', type: 'textarea', required: false },
      { key: 'resiliation', label: 'Conditions de résiliation', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE PARTENARIAT ÉDITORIAL</h1><p><strong>Partenaire A :</strong> {{partenaire_a}}</p><p><strong>Partenaire B :</strong> {{partenaire_b}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Les parties concluent un partenariat éditorial dont l\'objet est le suivant : {{objet_partenariat}}.</p><h2>Article 2 — Contenus partagés</h2><p>{{contenus_partages}}</p><h2>Article 3 — Conditions de publication croisée</h2><p>{{conditions_publication}}</p><h2>Article 4 — Durée</h2><p>Le partenariat est conclu pour une durée de <strong>{{duree}}</strong> à compter du {{date_jour}}.</p><h2>Article 5 — Contrepartie</h2><p>{{contrepartie}}</p><h2>Article 6 — Exclusivité</h2><p>{{exclusivite}}</p><h2>Article 7 — Propriété intellectuelle</h2><p>Chaque partie conserve la propriété de ses contenus. La publication croisée constitue une licence non-exclusive limitée à l\'usage défini à l\'article 3. Toute réutilisation hors périmètre requiert un accord exprès de l\'auteur.</p><h2>Article 8 — Image et réputation</h2><p>Chaque partie s\'engage à ne pas publier de contenus portant atteinte à la réputation de l\'autre, ni à utiliser sa marque en dehors du cadre du partenariat sans autorisation préalable.</p><h2>Article 9 — Résiliation</h2><p>{{resiliation}}</p><h2>Article 10 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>PARTENAIRE A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PARTENAIRE B<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 22,
  },

  {
    code: 'media_contrat_streaming',
    name: 'Accord de distribution en streaming',
    category: 'commercial_financier',
    price: 1500, priceMax: 2500,
    description: 'Accord entre un ayant droit (label, producteur) et une plateforme de streaming pour la mise à disposition de contenus audio ou vidéo : catalogue, redevances, reporting et conditions de retrait.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'ayant_droit', label: 'Ayant droit / fournisseur de contenus (nom, société)', type: 'textarea', required: true },
      { key: 'plateforme', label: 'Plateforme de streaming (nom, société, URL)', type: 'textarea', required: true },
      { key: 'catalogue', label: 'Description du catalogue mis à disposition', type: 'textarea', required: true },
      { key: 'territoire', label: 'Territoire de diffusion autorisé', type: 'text', required: true },
      { key: 'duree_accord', label: 'Durée de l\'accord', type: 'text', required: true },
      { key: 'modele_redevance', label: 'Modèle de redevance (par stream, forfait mensuel, partage revenus)', type: 'textarea', required: true },
      { key: 'reporting', label: 'Fréquence et format des rapports de streaming', type: 'text', required: true },
      { key: 'exclusivite', label: 'Exclusivité de plateforme (oui/non)', type: 'select', required: true, options: ['Exclusive', 'Non exclusive'] },
      { key: 'conditions_retrait', label: 'Conditions de retrait du catalogue', type: 'textarea', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE DISTRIBUTION EN STREAMING</h1><p><strong>Ayant droit :</strong> {{ayant_droit}}</p><p><strong>Plateforme :</strong> {{plateforme}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>L\'Ayant droit concède à la Plateforme le droit de diffuser en streaming le catalogue suivant : {{catalogue}}, sur le territoire : {{territoire}}, pour une durée de {{duree_accord}} à compter du {{date_jour}}.</p><h2>Article 2 — Licence</h2><p>La présente licence est <strong>{{exclusivite}}</strong>. Elle ne confère aucun droit de sous-licence sans accord préalable écrit de l\'Ayant droit.</p><h2>Article 3 — Redevances</h2><p>{{modele_redevance}}</p><h2>Article 4 — Reporting</h2><p>La Plateforme fournit des rapports {{reporting}} détaillant les flux de streaming par titre, les recettes brutes et nettes et le calcul des redevances dues.</p><h2>Article 5 — Protection des droits</h2><p>La Plateforme met en place des mesures techniques de protection (DRM ou équivalent) conformes aux standards de l\'industrie pour empêcher la copie non autorisée des contenus.</p><h2>Article 6 — Retrait du catalogue</h2><p>{{conditions_retrait}}</p><h2>Article 7 — Garanties de l\'ayant droit</h2><p>L\'Ayant droit garantit détenir tous les droits nécessaires à la conclusion du présent accord et indemnisera la Plateforme de toute réclamation de tiers liée aux contenus fournis.</p><h2>Article 8 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>L\'AYANT DROIT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LA PLATEFORME<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 31,
  },

  {
    code: 'media_cession_droits_image',
    name: 'Contrat de cession de droits à l\'image',
    category: 'commercial_financier',
    price: 500, priceMax: 1500,
    description: 'Autorisation et cession par une personne physique de ses droits à l\'image à des fins commerciales, publicitaires ou éditoriales : supports autorisés, durée, territoire et contrepartie.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'cedant', label: 'Cédant (nom, prénom, adresse, CNI)', type: 'textarea', required: true },
      { key: 'cessionnaire', label: 'Cessionnaire / utilisateur (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'description_photos', label: 'Description des photos / vidéos concernées (date, contexte)', type: 'textarea', required: true },
      { key: 'supports_autorises', label: 'Supports d\'utilisation autorisés (presse, affichage, web, publicité…)', type: 'textarea', required: true },
      { key: 'territoire', label: 'Territoire d\'utilisation', type: 'text', required: true },
      { key: 'duree', label: 'Durée d\'utilisation', type: 'text', required: true },
      { key: 'contrepartie', label: 'Contrepartie (montant ou nature)', type: 'text', required: true },
      { key: 'modifications', label: 'Autorisations de modification et de recadrage', type: 'select', required: true, options: ['Autorisées', 'Non autorisées', 'Autorisées avec accord préalable'] },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CESSION DE DROITS À L'IMAGE</h1><p><strong>Cédant :</strong> {{cedant}}</p><p><strong>Cessionnaire :</strong> {{cessionnaire}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Le Cédant autorise le Cessionnaire à reproduire, représenter et exploiter les photographies et/ou vidéos le représentant, décrites comme suit : {{description_photos}}.</p><h2>Article 2 — Supports autorisés</h2><p>{{supports_autorises}}</p><h2>Article 3 — Territoire</h2><p>L\'exploitation est autorisée sur le territoire suivant : <strong>{{territoire}}</strong>.</p><h2>Article 4 — Durée</h2><p>L\'autorisation est consentie pour une durée de <strong>{{duree}}</strong> à compter du {{date_jour}}.</p><h2>Article 5 — Contrepartie</h2><p>En échange de la présente autorisation, le Cessionnaire verse au Cédant : <strong>{{contrepartie}}</strong>.</p><h2>Article 6 — Modifications</h2><p>Les modifications, recadrages et retouches sont : <strong>{{modifications}}</strong>.</p><h2>Article 7 — Droits moraux</h2><p>Le Cédant conserve ses droits moraux. Le Cessionnaire s\'engage à ne pas utiliser l\'image de manière portant atteinte à sa dignité, à sa réputation ou à ses convictions.</p><h2>Article 8 — Révocabilité</h2><p>La présente autorisation est irrévocable pendant sa durée, sauf en cas de non-respect par le Cessionnaire des conditions d\'utilisation définies aux articles 2 à 6.</p><h2>Article 9 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE CÉDANT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE CESSIONNAIRE<br/>Signature&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 40,
  },

  {
    code: 'media_autorisation_tournage',
    name: 'Autorisation de tournage / prise de vue',
    category: 'commercial_financier',
    price: 500, priceMax: 1000,
    description: 'Autorisation accordée par le propriétaire d\'un lieu à une équipe de tournage ou de prise de vue : périmètre, dates, conditions d\'accès et contrepartie.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'autorisateur', label: 'Propriétaire / gestionnaire du lieu (nom, adresse)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Équipe de tournage / producteur bénéficiaire (nom, société)', type: 'textarea', required: true },
      { key: 'lieu', label: 'Description précise du lieu autorisé', type: 'textarea', required: true },
      { key: 'dates', label: 'Dates et horaires de tournage autorisés', type: 'textarea', required: true },
      { key: 'objet_tournage', label: 'Objet et nature du tournage (film, publicité, reportage…)', type: 'text', required: true },
      { key: 'conditions_acces', label: 'Conditions d\'accès et contraintes (parking, sécurité, équipes)', type: 'textarea', required: false },
      { key: 'contrepartie', label: 'Contrepartie financière ou en nature', type: 'text', required: true },
      { key: 'remise_en_etat', label: 'Obligations de remise en état après tournage', type: 'textarea', required: true },
      { key: 'assurance', label: 'Attestation d\'assurance requise', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>AUTORISATION DE TOURNAGE / PRISE DE VUE</h1><p><strong>Autorisateur :</strong> {{autorisateur}}</p><p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Autorisation</h2><p>L\'Autorisateur autorise l\'équipe de tournage du Bénéficiaire à accéder et à réaliser des prises de vue dans le lieu suivant : {{lieu}}.</p><h2>Article 2 — Objet du tournage</h2><p>Le tournage est réalisé dans le cadre de : <strong>{{objet_tournage}}</strong>.</p><h2>Article 3 — Dates et horaires</h2><p>{{dates}}</p><h2>Article 4 — Conditions d\'accès</h2><p>{{conditions_acces}}</p><h2>Article 5 — Contrepartie</h2><p>En échange de la présente autorisation, le Bénéficiaire verse à l\'Autorisateur : <strong>{{contrepartie}}</strong>.</p><h2>Article 6 — Remise en état</h2><p>{{remise_en_etat}}. Le Bénéficiaire est responsable de tout dommage causé au lieu pendant le tournage.</p><h2>Article 7 — Assurance</h2><p>Le Bénéficiaire fournit une attestation d\'assurance de responsabilité civile couvrant les risques liés au tournage, pour un montant minimum de {{assurance}}.</p><h2>Article 8 — Utilisation des images</h2><p>Le Bénéficiaire s\'engage à utiliser les images du lieu uniquement dans le cadre de l\'objet décrit à l\'article 2. Toute autre utilisation requiert un accord écrit préalable de l\'Autorisateur.</p><h2>Article 9 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>L\'AUTORISATEUR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE BÉNÉFICIAIRE<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 35,
  },

  {
    code: 'media_charte_redactionnelle',
    name: 'Charte éditoriale et rédactionnelle',
    category: 'commercial_financier',
    price: 500, priceMax: 1500,
    description: 'Document définissant les règles éditoriales d\'un organe de presse ou d\'une marque : ligne éditoriale, ton, cibles, formats, processus de validation et règles déontologiques.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation / média / marque (nom, mission)', type: 'textarea', required: true },
      { key: 'ligne_editoriale', label: 'Ligne éditoriale et positionnement (thèmes, angle)', type: 'textarea', required: true },
      { key: 'cibles', label: 'Publics cibles et personas', type: 'textarea', required: true },
      { key: 'ton_style', label: 'Ton et style rédactionnel (registre, vocabulaire, à éviter)', type: 'textarea', required: true },
      { key: 'formats', label: 'Formats éditoriaux utilisés (article, vidéo, infographie…)', type: 'textarea', required: true },
      { key: 'process_validation', label: 'Processus de validation et chaîne éditoriale', type: 'textarea', required: true },
      { key: 'deontologie', label: 'Règles déontologiques (sources, vérification, conflits d\'intérêts)', type: 'textarea', required: true },
      { key: 'seo_reseaux', label: 'Règles SEO et publication sur réseaux sociaux', type: 'textarea', required: false },
      { key: 'mise_a_jour', label: 'Fréquence de révision de la charte', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>CHARTE ÉDITORIALE ET RÉDACTIONNELLE</h1><p><strong>Organisation :</strong> {{organisation}}</p><p><strong>Date de version :</strong> {{date_jour}}</p><h2>1. Présentation et mission</h2><p>{{organisation}}</p><h2>2. Ligne éditoriale</h2><p>{{ligne_editoriale}}</p><h2>3. Publics cibles</h2><p>{{cibles}}</p><h2>4. Ton et style</h2><p>{{ton_style}}</p><h2>5. Formats éditoriaux</h2><p>{{formats}}</p><h2>6. Processus de validation</h2><p>{{process_validation}}</p><h2>7. Règles déontologiques</h2><p>{{deontologie}}</p><h2>8. SEO et réseaux sociaux</h2><p>{{seo_reseaux}}</p><h2>9. Révision de la charte</h2><p>La présente charte est révisée {{mise_a_jour}}. Toute modification est soumise à validation par la direction éditoriale et communiquée à l\'ensemble des contributeurs.</p><p class="signatures">Approuvé par la direction éditoriale, le {{date_jour}}.</p></div>`,
    popularity: 24,
  },

  {
    code: 'media_accord_syndicat_presse',
    name: 'Accord de partenariat presse / syndicat',
    category: 'commercial_financier',
    price: 1000, priceMax: 2000,
    description: 'Accord entre un organe de presse et un syndicat ou groupement professionnel : échange d\'informations, accès aux événements, publication de communiqués et conditions de collaboration.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'presse', label: 'Organe de presse (nom, type, adresse)', type: 'textarea', required: true },
      { key: 'syndicat', label: 'Syndicat / groupement professionnel (nom, adresse)', type: 'textarea', required: true },
      { key: 'objet', label: 'Objet de la collaboration', type: 'textarea', required: true },
      { key: 'engagements_presse', label: 'Engagements de l\'organe de presse', type: 'textarea', required: true },
      { key: 'engagements_syndicat', label: 'Engagements du syndicat', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de l\'accord', type: 'text', required: true },
      { key: 'indépendance', label: 'Clause d\'indépendance éditoriale', type: 'textarea', required: true },
      { key: 'resiliation', label: 'Conditions de résiliation', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE PARTENARIAT PRESSE / SYNDICAT</h1><p><strong>Organe de presse :</strong> {{presse}}</p><p><strong>Syndicat / groupement :</strong> {{syndicat}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>{{objet}}</p><h2>Article 2 — Engagements de l\'organe de presse</h2><p>{{engagements_presse}}</p><h2>Article 3 — Engagements du syndicat</h2><p>{{engagements_syndicat}}</p><h2>Article 4 — Durée</h2><p>Le présent accord est conclu pour une durée de <strong>{{duree}}</strong> à compter du {{date_jour}}, renouvelable par accord exprès des parties.</p><h2>Article 5 — Indépendance éditoriale</h2><p>{{indépendance}}. Le présent partenariat ne confère au Syndicat aucun droit de regard, de veto ou d\'influence sur la ligne éditoriale ou les décisions rédactionnelles de l\'organe de presse.</p><h2>Article 6 — Utilisation des logos et marques</h2><p>Chaque partie peut mentionner l\'existence du partenariat sur ses supports de communication et utiliser le logo de l\'autre partie dans ce cadre strict, sans en modifier la présentation.</p><h2>Article 7 — Résiliation</h2><p>{{resiliation}}</p><h2>Article 8 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>L\'ORGANE DE PRESSE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE SYNDICAT<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 18,
  },

  {
    code: 'media_contrat_traducteur',
    name: 'Contrat de traduction littéraire / éditoriale',
    category: 'commercial_financier',
    price: 1000, priceMax: 2000,
    description: 'Contrat entre un éditeur et un traducteur : œuvre à traduire, langues concernées, délai, rémunération, cession des droits sur la traduction et mention du nom du traducteur.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'editeur', label: 'Éditeur (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'traducteur', label: 'Traducteur (nom, prénom, adresse)', type: 'textarea', required: true },
      { key: 'oeuvre_originale', label: 'Œuvre originale (titre, auteur, langue source)', type: 'textarea', required: true },
      { key: 'langue_cible', label: 'Langue cible de la traduction', type: 'text', required: true },
      { key: 'volume', label: 'Volume estimé (nombre de mots ou de pages)', type: 'text', required: true },
      { key: 'delai', label: 'Délai de livraison de la traduction', type: 'text', required: true },
      { key: 'remuneration', label: 'Rémunération (forfait ou tarif au mot/signe + droits)', type: 'textarea', required: true },
      { key: 'droits_cedes', label: 'Droits sur la traduction cédés à l\'éditeur (supports, territoire, durée)', type: 'textarea', required: true },
      { key: 'mention_nom', label: 'Mention du nom du traducteur (emplacement)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE TRADUCTION LITTÉRAIRE / ÉDITORIALE</h1><p><strong>Éditeur :</strong> {{editeur}}</p><p><strong>Traducteur :</strong> {{traducteur}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>L\'Éditeur confie au Traducteur la traduction de l\'œuvre suivante : {{oeuvre_originale}}, en langue {{langue_cible}}, pour un volume estimé de {{volume}}.</p><h2>Article 2 — Délai de livraison</h2><p>Le Traducteur s\'engage à livrer la traduction au plus tard le <strong>{{delai}}</strong> à compter de la réception des éléments nécessaires (fichiers sources, glossaires, instructions).</p><h2>Article 3 — Rémunération</h2><p>{{remuneration}}</p><h2>Article 4 — Cession de droits sur la traduction</h2><p>Le Traducteur cède à l\'Éditeur les droits d\'exploitation sur la traduction dans les conditions suivantes : {{droits_cedes}}. La traduction constitue une œuvre originale protégée, dont le Traducteur est coauteur aux côtés de l\'auteur de l\'œuvre source.</p><h2>Article 5 — Mention du nom</h2><p>Le nom du Traducteur sera mentionné sur <strong>{{mention_nom}}</strong> de toutes les éditions publiées.</p><h2>Article 6 — Qualité et conformité</h2><p>Le Traducteur garantit une traduction fidèle, complète et de qualité littéraire professionnelle. L\'Éditeur peut signaler des insuffisances dans les 30 jours suivant la livraison ; le Traducteur dispose alors d\'un délai raisonnable pour y remédier.</p><h2>Article 7 — Droits moraux</h2><p>Le Traducteur conserve ses droits moraux sur la traduction. Toute modification substantielle requiert son accord préalable.</p><h2>Article 8 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>L\'ÉDITEUR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE TRADUCTEUR<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature</p></div>`,
    popularity: 22,
  },

  // ═══════════════════════════════════════════════════════════
  //  PROPRIÉTÉ INTELLECTUELLE (10 templates pi_)
  // ═══════════════════════════════════════════════════════════

  {
    code: 'pi_cession_droit_auteur',
    name: 'Cession de droits d\'auteur (littéraire, artistique)',
    category: 'juridique_admin',
    price: 1500, priceMax: 2500,
    description: 'Contrat de cession totale ou partielle de droits d\'auteur sur une œuvre littéraire ou artistique : droits cédés, supports, territoire, durée et prix de cession.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'cedant', label: 'Cédant / auteur (nom, prénom, adresse)', type: 'textarea', required: true },
      { key: 'cessionnaire', label: 'Cessionnaire (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'oeuvre', label: 'Description de l\'œuvre cédée (titre, nature, support)', type: 'textarea', required: true },
      { key: 'droits_cedes', label: 'Droits cédés (reproduction, représentation, adaptation, traduction…)', type: 'textarea', required: true },
      { key: 'type_cession', label: 'Type de cession', type: 'select', required: true, options: ['Cession exclusive', 'Cession non exclusive'] },
      { key: 'supports', label: 'Supports et modes d\'exploitation autorisés', type: 'textarea', required: true },
      { key: 'territoire', label: 'Territoire de la cession', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la cession', type: 'text', required: true },
      { key: 'prix', label: 'Prix de cession et modalités de paiement', type: 'textarea', required: true },
      { key: 'droits_moraux', label: 'Rappel des droits moraux conservés par l\'auteur', type: 'textarea', required: false },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE CESSION DE DROITS D'AUTEUR</h1><p><strong>Cédant :</strong> {{cedant}}</p><p><strong>Cessionnaire :</strong> {{cessionnaire}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Le Cédant, auteur de l\'œuvre décrite ci-après, cède au Cessionnaire les droits patrimoniaux d\'auteur dans les conditions définies au présent contrat.</p><h2>Article 2 — Œuvre concernée</h2><p>{{oeuvre}}</p><h2>Article 3 — Droits cédés</h2><p>La présente cession porte sur les droits suivants : {{droits_cedes}}, à titre <strong>{{type_cession}}</strong>.</p><h2>Article 4 — Supports et modes d\'exploitation</h2><p>{{supports}}</p><h2>Article 5 — Territoire</h2><p>La cession est consentie pour le territoire suivant : <strong>{{territoire}}</strong>.</p><h2>Article 6 — Durée</h2><p>La cession est consentie pour une durée de <strong>{{duree}}</strong> à compter du {{date_jour}}.</p><h2>Article 7 — Prix de cession</h2><p>{{prix}}</p><h2>Article 8 — Droits moraux</h2><p>{{droits_moraux}}. Le Cédant conserve l\'integralité de ses droits moraux sur l\'œuvre, notamment le droit de paternité (mention de son nom), le droit au respect de l\'intégrité et le droit de divulgation sur les œuvres futures.</p><h2>Article 9 — Garanties du cédant</h2><p>Le Cédant garantit être l\'unique auteur ou avoir l\'autorité pour céder les droits objets du présent contrat, que l\'œuvre est originale et ne porte pas atteinte aux droits de tiers.</p><h2>Article 10 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE CÉDANT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE CESSIONNAIRE<br/>Signature&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 42,
  },

  {
    code: 'pi_licence_droit_auteur',
    name: 'Licence de droits d\'auteur',
    category: 'juridique_admin',
    price: 1000, priceMax: 2000,
    description: 'Contrat de licence accordant à un tiers le droit d\'exploiter une œuvre protégée sans en céder la propriété : périmètre, redevances, sous-licence et conditions de résiliation.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'donneur_licence', label: 'Donneur de licence / auteur (nom, adresse)', type: 'textarea', required: true },
      { key: 'licencie', label: 'Licencié (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'oeuvre', label: 'Œuvre licenciée (titre, nature, description)', type: 'textarea', required: true },
      { key: 'droits_licencies', label: 'Droits couverts par la licence', type: 'textarea', required: true },
      { key: 'exclusivite', label: 'Exclusivité', type: 'select', required: true, options: ['Licence exclusive', 'Licence non exclusive'] },
      { key: 'territoire', label: 'Territoire d\'exploitation', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la licence', type: 'text', required: true },
      { key: 'redevances', label: 'Redevances (taux, assiette, fréquence de paiement)', type: 'textarea', required: true },
      { key: 'sous_licence', label: 'Droit de sous-licence (oui/non + conditions)', type: 'textarea', required: false },
      { key: 'resiliation', label: 'Conditions de résiliation et effets', type: 'textarea', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE LICENCE DE DROITS D'AUTEUR</h1><p><strong>Donneur de licence :</strong> {{donneur_licence}}</p><p><strong>Licencié :</strong> {{licencie}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Le Donneur de licence accorde au Licencié une licence d\'exploitation sur l\'œuvre suivante : {{oeuvre}}, dans les conditions définies ci-après.</p><h2>Article 2 — Droits licenciés</h2><p>{{droits_licencies}}</p><h2>Article 3 — Nature de la licence</h2><p>La présente licence est consentie à titre <strong>{{exclusivite}}</strong>.</p><h2>Article 4 — Territoire</h2><p>Territoire d\'exploitation : <strong>{{territoire}}</strong>.</p><h2>Article 5 — Durée</h2><p>Durée : <strong>{{duree}}</strong> à compter du {{date_jour}}.</p><h2>Article 6 — Redevances</h2><p>{{redevances}}</p><h2>Article 7 — Sous-licence</h2><p>{{sous_licence}}</p><h2>Article 8 — Obligations du licencié</h2><p>Le Licencié s\'engage à exploiter l\'œuvre dans le respect de l\'intégrité de l\'œuvre et des droits moraux de l\'auteur, à mentionner le nom de ce dernier sur toute exploitation et à fournir des comptes rendus réguliers au Donneur de licence.</p><h2>Article 9 — Résiliation</h2><p>{{resiliation}}</p><h2>Article 10 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE DONNEUR DE LICENCE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE LICENCIÉ<br/>Signature&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 36,
  },

  {
    code: 'pi_contrat_coauteur',
    name: 'Contrat entre co-auteurs',
    category: 'juridique_admin',
    price: 1000, priceMax: 2000,
    description: 'Convention entre plusieurs auteurs d\'une œuvre collective ou de collaboration : répartition des droits, gouvernance, exploitation commune et règles en cas de désaccord.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'coauteurs', label: 'Liste des co-auteurs (nom, prénom, contribution de chacun)', type: 'textarea', required: true },
      { key: 'oeuvre', label: 'Description de l\'œuvre en co-création (titre, nature)', type: 'textarea', required: true },
      { key: 'repartition_droits', label: 'Répartition des droits patrimoniaux entre co-auteurs (%)', type: 'textarea', required: true },
      { key: 'gouvernance', label: 'Règles de gouvernance (décisions unanimes vs majoritaires)', type: 'textarea', required: true },
      { key: 'exploitation', label: 'Modalités d\'exploitation commune', type: 'textarea', required: true },
      { key: 'droits_moraux', label: 'Gestion des droits moraux individuels', type: 'textarea', required: true },
      { key: 'resolution_conflits', label: 'Mécanisme de résolution des désaccords', type: 'textarea', required: true },
      { key: 'droit_sortie', label: 'Conditions de sortie d\'un co-auteur', type: 'textarea', required: false },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT ENTRE CO-AUTEURS</h1><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Identité des co-auteurs et contributions</h2><p>{{coauteurs}}</p><h2>Article 2 — Œuvre concernée</h2><p>{{oeuvre}}</p><h2>Article 3 — Répartition des droits patrimoniaux</h2><p>{{repartition_droits}}</p><h2>Article 4 — Gouvernance et prises de décision</h2><p>{{gouvernance}}</p><h2>Article 5 — Exploitation de l\'œuvre</h2><p>{{exploitation}}</p><h2>Article 6 — Droits moraux</h2><p>{{droits_moraux}}. Chaque co-auteur conserve ses droits moraux inaliénables sur la partie de l\'œuvre qui lui est propre.</p><h2>Article 7 — Résolution des désaccords</h2><p>{{resolution_conflits}}</p><h2>Article 8 — Sortie d\'un co-auteur</h2><p>{{droit_sortie}}</p><h2>Article 9 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}, par chacun des co-auteurs :<br/>{{coauteurs}}</p></div>`,
    popularity: 20,
  },

  {
    code: 'pi_depot_marque_oapi',
    name: 'Dossier de dépôt de marque (OAPI)',
    category: 'juridique_admin',
    price: 1500, priceMax: 2500,
    description: 'Dossier complet de dépôt de marque auprès de l\'OAPI : description de la marque, classes de produits et services, pièces jointes et déclaration du déposant.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'deposant', label: 'Déposant (nom ou raison sociale, adresse, nationalité)', type: 'textarea', required: true },
      { key: 'mandataire', label: 'Mandataire / conseil en PI (nom, adresse, n° d\'agrément)', type: 'textarea', required: false },
      { key: 'denomination_marque', label: 'Dénomination ou description de la marque', type: 'textarea', required: true },
      { key: 'type_marque', label: 'Type de marque', type: 'select', required: true, options: ['Marque verbale', 'Marque figurative', 'Marque semi-figurative', 'Marque sonore', 'Marque tridimensionnelle'] },
      { key: 'classes', label: 'Classes de produits/services (classification de Nice)', type: 'textarea', required: true },
      { key: 'couleurs', label: 'Couleurs revendiquées (le cas échéant)', type: 'text', required: false },
      { key: 'pays_membres', label: 'Pays membres OAPI désignés', type: 'textarea', required: true },
      { key: 'date_priorite', label: 'Date et pays de priorité (convention de Paris, si applicable)', type: 'text', required: false },
      { key: 'pieces_jointes', label: 'Pièces jointes (liste des documents accompagnant le dossier)', type: 'textarea', required: true },
      { key: 'declaration_deposant', label: 'Déclaration sur l\'honneur du déposant', type: 'textarea', required: true },
    ]),
    body: `<div class="document"><h1>DOSSIER DE DÉPÔT DE MARQUE — OAPI</h1><p><strong>Date de dépôt :</strong> {{date_jour}}</p><h2>1. Identité du déposant</h2><p>{{deposant}}</p><h2>2. Mandataire</h2><p>{{mandataire}}</p><h2>3. Marque déposée</h2><p><strong>Dénomination / Description :</strong> {{denomination_marque}}</p><p><strong>Type :</strong> {{type_marque}}</p><p><strong>Couleurs revendiquées :</strong> {{couleurs}}</p><h2>4. Produits et services (Classes de Nice)</h2><p>{{classes}}</p><h2>5. Désignation des pays membres OAPI</h2><p>{{pays_membres}}</p><h2>6. Revendication de priorité</h2><p>{{date_priorite}}</p><h2>7. Pièces jointes au dossier</h2><p>{{pieces_jointes}}</p><h2>8. Déclaration du déposant</h2><p>{{declaration_deposant}}</p><p>Je soussigné(e), déposant ou mandataire dûment habilité, déclare que les informations contenues dans le présent dossier sont exactes et que le déposant est titulaire du droit de déposer la marque décrite ci-dessus.</p><p class="signatures">Fait le {{date_jour}}<br/>Signature du déposant ou mandataire</p></div>`,
    popularity: 38,
  },

  {
    code: 'pi_contrat_licence_marque',
    name: 'Contrat de licence de marque',
    category: 'juridique_admin',
    price: 2000, priceMax: 3500,
    description: 'Contrat par lequel le titulaire d\'une marque en concède l\'usage à un licencié : territoire, produits concernés, redevances, contrôle qualité et conditions de résiliation.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'concedant', label: 'Concédant / titulaire de la marque (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'licencie', label: 'Licencié (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'marque', label: 'Description de la marque (dénomination, n° d\'enregistrement, classes)', type: 'textarea', required: true },
      { key: 'produits_services', label: 'Produits et services couverts par la licence', type: 'textarea', required: true },
      { key: 'territoire', label: 'Territoire de la licence', type: 'text', required: true },
      { key: 'exclusivite', label: 'Exclusivité', type: 'select', required: true, options: ['Licence exclusive', 'Licence non exclusive', 'Licence sole'] },
      { key: 'duree', label: 'Durée de la licence', type: 'text', required: true },
      { key: 'redevances', label: 'Redevances (taux, minimum garanti, fréquence)', type: 'textarea', required: true },
      { key: 'controle_qualite', label: 'Obligations de contrôle qualité du Concédant', type: 'textarea', required: true },
      { key: 'sous_licence', label: 'Autorisation de sous-licence (oui/non)', type: 'select', required: true, options: ['Autorisée', 'Non autorisée'] },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE LICENCE DE MARQUE</h1><p><strong>Concédant :</strong> {{concedant}}</p><p><strong>Licencié :</strong> {{licencie}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Le Concédant concède au Licencié le droit d\'utiliser la marque suivante dans les conditions définies ci-après : {{marque}}.</p><h2>Article 2 — Produits et services</h2><p>{{produits_services}}</p><h2>Article 3 — Territoire</h2><p>Territoire : <strong>{{territoire}}</strong>.</p><h2>Article 4 — Nature et exclusivité</h2><p>La licence est consentie à titre de <strong>{{exclusivite}}</strong>.</p><h2>Article 5 — Durée</h2><p>Durée : <strong>{{duree}}</strong> à compter du {{date_jour}}.</p><h2>Article 6 — Redevances</h2><p>{{redevances}}</p><h2>Article 7 — Contrôle qualité</h2><p>{{controle_qualite}}. Le Licencié s\'engage à fournir au Concédant, sur demande, des échantillons des produits et une documentation permettant de vérifier la conformité de l\'utilisation de la marque aux normes de qualité définies.</p><h2>Article 8 — Sous-licence</h2><p>La sous-licence est : <strong>{{sous_licence}}</strong>.</p><h2>Article 9 — Protection de la marque</h2><p>Le Licencié s\'engage à signaler immédiatement au Concédant toute contrefaçon ou usage abusif de la marque dont il aurait connaissance. Il coopère avec le Concédant dans toute action en protection de la marque.</p><h2>Article 10 — Résiliation</h2><p>En cas de violation des obligations de qualité ou de paiement, le Concédant peut résilier la licence par lettre recommandée avec préavis de 30 jours, réduit à 8 jours en cas de faute grave.</p><h2>Article 11 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE CONCÉDANT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE LICENCIÉ<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 32,
  },

  {
    code: 'pi_accord_secret_affaires',
    name: 'Accord de protection des secrets d\'affaires',
    category: 'juridique_admin',
    price: 1000, priceMax: 2000,
    description: 'Accord de confidentialité renforcé pour la protection des secrets d\'affaires : définition des secrets, mesures de protection requises, durée et sanctions en cas de divulgation.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'divulgateur', label: 'Partie divulgatrice (nom, société)', type: 'textarea', required: true },
      { key: 'recepteur', label: 'Partie réceptrice (nom, société)', type: 'textarea', required: true },
      { key: 'objet_accord', label: 'Contexte et objet de l\'accord', type: 'textarea', required: true },
      { key: 'secrets_couverts', label: 'Description des secrets d\'affaires protégés', type: 'textarea', required: true },
      { key: 'mesures_protection', label: 'Mesures de protection requises de la partie réceptrice', type: 'textarea', required: true },
      { key: 'personnes_autorisees', label: 'Personnes autorisées à accéder aux secrets', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de l\'obligation de confidentialité', type: 'text', required: true },
      { key: 'exceptions', label: 'Exceptions à la confidentialité (domaine public, obligation légale)', type: 'textarea', required: true },
      { key: 'sanctions', label: 'Sanctions et réparation en cas de violation', type: 'textarea', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE PROTECTION DES SECRETS D'AFFAIRES</h1><p><strong>Divulgateur :</strong> {{divulgateur}}</p><p><strong>Récepteur :</strong> {{recepteur}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>{{objet_accord}}</p><h2>Article 2 — Définition des secrets d\'affaires</h2><p>Constituent des secrets d\'affaires au sens du présent accord les informations suivantes : {{secrets_couverts}}. Ces informations répondent aux critères de secret, de valeur commerciale et de mesures raisonnables de protection.</p><h2>Article 3 — Obligations de la partie réceptrice</h2><p>La Partie réceptrice s\'engage à : {{mesures_protection}}. Elle ne peut utiliser les secrets d\'affaires qu\'aux fins strictement nécessaires à l\'objet du présent accord.</p><h2>Article 4 — Personnes autorisées</h2><p>{{personnes_autorisees}}. La Partie réceptrice est responsable de leurs manquements.</p><h2>Article 5 — Durée</h2><p>Les obligations de confidentialité s\'appliquent pendant <strong>{{duree}}</strong> à compter du {{date_jour}} et survivent à l\'expiration ou à la résiliation du présent accord.</p><h2>Article 6 — Exceptions</h2><p>{{exceptions}}</p><h2>Article 7 — Sanctions</h2><p>{{sanctions}}</p><h2>Article 8 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE DIVULGATEUR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE RÉCEPTEUR<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 28,
  },

  {
    code: 'pi_contrat_creation_oeuvre',
    name: 'Contrat de commande d\'œuvre (logiciel, design)',
    category: 'juridique_admin',
    price: 1500, priceMax: 2500,
    description: 'Contrat par lequel un commanditaire confie à un créateur la réalisation d\'une œuvre sur commande (logiciel, design, contenu) avec cession des droits à la livraison.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'commanditaire', label: 'Commanditaire (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'createur', label: 'Créateur / prestataire (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'description_oeuvre', label: 'Description détaillée de l\'œuvre commandée', type: 'textarea', required: true },
      { key: 'cahier_charges', label: 'Cahier des charges (fonctionnalités, spécifications, formats)', type: 'textarea', required: true },
      { key: 'delai', label: 'Délai de livraison et jalons', type: 'textarea', required: true },
      { key: 'prix', label: 'Prix et modalités de paiement', type: 'textarea', required: true },
      { key: 'droits_cedes', label: 'Droits cédés au commanditaire (supports, territoire, durée)', type: 'textarea', required: true },
      { key: 'garanties', label: 'Garanties de conformité et de bon fonctionnement', type: 'textarea', required: true },
      { key: 'maintenance', label: 'Maintenance et évolutions post-livraison (si applicable)', type: 'textarea', required: false },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE COMMANDE D'ŒUVRE</h1><p><strong>Commanditaire :</strong> {{commanditaire}}</p><p><strong>Créateur :</strong> {{createur}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Le Commanditaire commande au Créateur la réalisation de l\'œuvre suivante : {{description_oeuvre}}.</p><h2>Article 2 — Cahier des charges</h2><p>{{cahier_charges}}</p><h2>Article 3 — Planning et jalons</h2><p>{{delai}}</p><h2>Article 4 — Prix et paiement</h2><p>{{prix}}</p><h2>Article 5 — Cession des droits</h2><p>À complet paiement du prix convenu, le Créateur cède au Commanditaire les droits patrimoniaux suivants sur l\'œuvre livrée : {{droits_cedes}}. Le Créateur conserve son droit moral et peut mentionner cette réalisation dans ses références professionnelles, sauf clause contraire.</p><h2>Article 6 — Garanties</h2><p>{{garanties}}</p><h2>Article 7 — Maintenance</h2><p>{{maintenance}}</p><h2>Article 8 — Originalité</h2><p>Le Créateur garantit l\'originalité de l\'œuvre et s\'engage à n\'incorporer aucun élément tiers protégé sans les autorisations requises.</p><h2>Article 9 — Confidentialité</h2><p>Le Créateur s\'engage à garder confidentielles toutes les informations, données et documents transmis par le Commanditaire dans le cadre de la présente mission.</p><h2>Article 10 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE COMMANDITAIRE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE CRÉATEUR<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 38,
  },

  {
    code: 'pi_accord_know_how',
    name: 'Accord de transfert de savoir-faire (know-how)',
    category: 'juridique_admin',
    price: 2000, priceMax: 3500,
    description: 'Contrat de transfert de savoir-faire technique ou commercial entre une entreprise cédante et une entreprise réceptrice : description du savoir-faire, formation, confidentialité et redevances.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'cedant', label: 'Cédant du savoir-faire (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'recepteur', label: 'Récepteur (nom, société, adresse)', type: 'textarea', required: true },
      { key: 'description_kh', label: 'Description du savoir-faire transféré (procédés, méthodes, formules)', type: 'textarea', required: true },
      { key: 'modalites_transfert', label: 'Modalités de transfert (formation, documentation, assistance technique)', type: 'textarea', required: true },
      { key: 'territoire', label: 'Territoire d\'utilisation autorisé', type: 'text', required: true },
      { key: 'duree', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'redevances', label: 'Redevances (montant, assiette, fréquence)', type: 'textarea', required: true },
      { key: 'confidentialite', label: 'Obligations de confidentialité et de non-divulgation', type: 'textarea', required: true },
      { key: 'ameliorations', label: 'Clause sur les améliorations et innovations dérivées', type: 'textarea', required: false },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE TRANSFERT DE SAVOIR-FAIRE (KNOW-HOW)</h1><p><strong>Cédant :</strong> {{cedant}}</p><p><strong>Récepteur :</strong> {{recepteur}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Le Cédant transfère au Récepteur le savoir-faire suivant : {{description_kh}}. Ce savoir-faire est substantiel, secret et identifié.</p><h2>Article 2 — Modalités de transfert</h2><p>{{modalites_transfert}}</p><h2>Article 3 — Territoire</h2><p>L\'utilisation du savoir-faire est autorisée sur : <strong>{{territoire}}</strong>.</p><h2>Article 4 — Durée</h2><p>Le présent accord est conclu pour une durée de <strong>{{duree}}</strong> à compter du {{date_jour}}.</p><h2>Article 5 — Redevances</h2><p>{{redevances}}</p><h2>Article 6 — Confidentialité</h2><p>{{confidentialite}}. Cette obligation se prolonge pendant 5 ans après l\'expiration du contrat ou jusqu\'à ce que le savoir-faire tombe dans le domaine public.</p><h2>Article 7 — Améliorations</h2><p>{{ameliorations}}</p><h2>Article 8 — Garanties du cédant</h2><p>Le Cédant garantit être libre de transférer le savoir-faire décrit et que son utilisation par le Récepteur dans le cadre du présent contrat ne viole pas les droits de tiers.</p><h2>Article 9 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>LE CÉDANT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE RÉCEPTEUR<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 25,
  },

  {
    code: 'pi_contrat_recherche_developpement',
    name: 'Contrat de R&D collaboratif',
    category: 'juridique_admin',
    price: 2000, priceMax: 3500,
    description: 'Contrat de recherche et développement collaboratif entre deux entités : programme de R&D, apports de chaque partie, propriété des résultats, publication et exploitation commerciale.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'partenaire_a', label: 'Partenaire A (nom, société, laboratoire)', type: 'textarea', required: true },
      { key: 'partenaire_b', label: 'Partenaire B (nom, société, laboratoire)', type: 'textarea', required: true },
      { key: 'programme', label: 'Description du programme de R&D (objectifs, méthodes)', type: 'textarea', required: true },
      { key: 'apports', label: 'Apports de chaque partenaire (ressources, compétences, financement)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du programme de R&D', type: 'text', required: true },
      { key: 'propriete_resultats', label: 'Propriété des résultats (conjointe, répartie, selon inventeur)', type: 'textarea', required: true },
      { key: 'publication', label: 'Règles de publication scientifique (délai, accord préalable)', type: 'textarea', required: true },
      { key: 'exploitation_commerciale', label: 'Conditions d\'exploitation commerciale des résultats', type: 'textarea', required: true },
      { key: 'confidentialite', label: 'Périmètre de confidentialité', type: 'textarea', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE RECHERCHE ET DÉVELOPPEMENT COLLABORATIF</h1><p><strong>Partenaire A :</strong> {{partenaire_a}}</p><p><strong>Partenaire B :</strong> {{partenaire_b}}</p><p><strong>Date :</strong> {{date_jour}}</p><h2>Article 1 — Objet</h2><p>Les parties conviennent de conduire conjointement un programme de R&D dans les conditions définies au présent contrat.</p><h2>Article 2 — Programme de R&D</h2><p>{{programme}}</p><h2>Article 3 — Apports des partenaires</h2><p>{{apports}}</p><h2>Article 4 — Durée</h2><p>Le programme est conduit sur une durée de <strong>{{duree}}</strong> à compter du {{date_jour}}, avec des points d\'étape trimestriels.</p><h2>Article 5 — Propriété des résultats</h2><p>{{propriete_resultats}}</p><h2>Article 6 — Publication scientifique</h2><p>{{publication}}</p><h2>Article 7 — Exploitation commerciale</h2><p>{{exploitation_commerciale}}</p><h2>Article 8 — Confidentialité</h2><p>{{confidentialite}}</p><h2>Article 9 — Résiliation</h2><p>En cas de manquement grave d\'un partenaire, l\'autre peut résilier le contrat après mise en demeure restée sans effet pendant 30 jours. Les droits sur les résultats obtenus à la date de résiliation restent régis par l\'article 5.</p><h2>Article 10 — Droit applicable</h2><p>Soumis au droit de {{droit_applicable}}.</p><p class="signatures">Fait le {{date_jour}}<br/><br/>PARTENAIRE A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PARTENAIRE B<br/>Signature + cachet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature + cachet</p></div>`,
    popularity: 22,
  },

  {
    code: 'pi_politique_open_source',
    name: 'Politique d\'utilisation logiciels open source',
    category: 'juridique_admin',
    price: 500, priceMax: 1500,
    description: 'Document de politique interne encadrant l\'utilisation, la contribution et la distribution de logiciels open source au sein d\'une organisation : licences autorisées, procédures d\'approbation et obligations de conformité.',
    formatsJson: '["pdf","docx"]',
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation (nom, secteur d\'activité)', type: 'textarea', required: true },
      { key: 'perimetre', label: 'Périmètre d\'application de la politique', type: 'textarea', required: true },
      { key: 'licences_autorisees', label: 'Licences open source autorisées sans approbation préalable', type: 'textarea', required: true },
      { key: 'licences_soumises_approbation', label: 'Licences nécessitant une approbation préalable', type: 'textarea', required: true },
      { key: 'licences_interdites', label: 'Licences interdites (ex : GPL forte pour logiciels propriétaires)', type: 'textarea', required: true },
      { key: 'procedure_approbation', label: 'Procédure d\'approbation et de revue', type: 'textarea', required: true },
      { key: 'contribution_externe', label: 'Règles pour contribuer à des projets open source externes', type: 'textarea', required: false },
      { key: 'obligations_conformite', label: 'Obligations de conformité (attribution, mise à disposition du code)', type: 'textarea', required: true },
      { key: 'responsable', label: 'Responsable de la politique (poste, contact)', type: 'text', required: true },
      { key: 'date_revision', label: 'Fréquence de révision de la politique', type: 'text', required: true },
    ]),
    body: `<div class="document"><h1>POLITIQUE D'UTILISATION DES LOGICIELS OPEN SOURCE</h1><p><strong>Organisation :</strong> {{organisation}}</p><p><strong>Date d\'entrée en vigueur :</strong> {{date_jour}}</p><h2>1. Objet et périmètre</h2><p>La présente politique définit les règles applicables à l\'utilisation, l\'intégration et la contribution à des logiciels open source au sein de {{organisation}}. Elle s\'applique à : {{perimetre}}.</p><h2>2. Pourquoi une politique open source ?</h2><p>Les logiciels open source sont soumis à des licences qui peuvent imposer des obligations lors de leur utilisation, modification ou distribution. Le non-respect de ces licences expose l\'organisation à des risques juridiques, financiers et de réputation.</p><h2>3. Licences autorisées sans approbation préalable</h2><p>{{licences_autorisees}}</p><h2>4. Licences nécessitant une approbation préalable</h2><p>{{licences_soumises_approbation}}</p><h2>5. Licences interdites</h2><p>{{licences_interdites}}</p><h2>6. Procédure d\'approbation</h2><p>{{procedure_approbation}}</p><h2>7. Contribution à des projets open source externes</h2><p>{{contribution_externe}}</p><h2>8. Obligations de conformité</h2><p>{{obligations_conformite}}</p><h2>9. Responsabilité et contacts</h2><p>Responsable de la politique : <strong>{{responsable}}</strong>. Toute question doit lui être adressée avant d\'intégrer un nouveau composant open source dans un projet.</p><h2>10. Révision</h2><p>La présente politique est révisée {{date_revision}} et mise à jour en fonction de l\'évolution des licences et de la réglementation applicable.</p><p class="signatures">Approuvé par la direction, le {{date_jour}}.</p></div>`,
    popularity: 20,
  },

];

async function main() {
  let created = 0;
  let updated = 0;
  const byCategory: Record<string, number> = {};

  for (const t of templates) {
    const data: Record<string, unknown> = {
      code: t.code,
      name: t.name,
      category: t.category,
      description: t.description,
      price: t.price,
      priceMax: t.priceMax,
      fieldsJson: t.fieldsJson,
      body: t.body,
      popularity: t.popularity,
      formatsJson: t.formatsJson ?? '["pdf","docx"]',
    };
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: data, create: data });
    if (existing) updated += 1; else created += 1;
    byCategory[t.category] = (byCategory[t.category] ?? 0) + 1;
  }

  const total = await prisma.documentTemplate.count();

  console.log('✅ Seed Médias & Propriété Intellectuelle terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
