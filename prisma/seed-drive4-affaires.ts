// Seed Drive4 Affaires — Agent Drive4-8/10 : PASSE PROFONDE n°3 sur JUR-001
// « Pack Droit des Affaires — 280 modèles » (sous-dossiers ACCORDS / CONVENTIONS / DIVERS).
// 20 modèles DISTINCTS ajoutés, absents du catalogue existant (~484 codes vérifiés).
// Sélection : accord de non-sollicitation & non-débauchage, licence de brevet & savoir-faire,
// coexistence de marques, compte courant d'associé, convention de croupier, portage d'actions,
// convention de vote, accord de standstill, exclusivité d'approvisionnement, accord-cadre d'achat,
// distribution sélective, assistance technique, lettre d'intention (LOI), term sheet, accord de
// confidentialité mutuel, protocole transactionnel, cession de clientèle, apport en industrie,
// lettre de confort, convention de prête-nom.
// Fusions opérées : non-sollicitation + non-débauchage → un seul accord ; licence marque (déjà
// couverte par jur_licence_nom_marque) fusionnée vers brevet + savoir-faire ; compte courant
// d'associé grounded sur « Accord de prêt d'un actionnaire » (ACCORDS) ; protocole transactionnel
// grounded sur « Accord de compromis sur dette » (élargi au litige général, distinct de
// aff_compromis_dette et aff_protocole_conciliation).
// Codes préfixés 'aff2_' pour éviter toute collision. Script ADDITIF : upsert par code.
// Exécution : npx tsx prisma/seed-drive4-affaires.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  countriesJson?: string;
};

const F = (fields: object[]) => JSON.stringify(fields);

const SOCIETES_COUNTRIES = JSON.stringify({
  OHADA: { note: "Acte uniforme relatif au droit des sociétés commerciales et du GIE (AUSCGIE révisé du 30/01/2014) — titres sociaux, pactes d'associés, comptes courants, dirigeants." },
  FR: { note: 'Code de commerce (livre II) et Code civil (art. 1832 s.) ; pactes extra-statutaires et conventions de vote.' },
});

const CONTRATS_COUNTRIES = JSON.stringify({
  OHADA: { note: "Acte uniforme portant sur le droit commercial général (AUDCG révisé du 15/12/2010) — vente commerciale, intermédiaires, distribution ; liberté contractuelle." },
  FR: { note: 'Code civil (droit des obligations, art. 1100 s.) et Code de commerce (pratiques restrictives de concurrence, art. L. 442-1 s.).' },
});

const PI_COUNTRIES = JSON.stringify({
  OHADA: { note: "Accord de Bangui révisé (OAPI) — marques, brevets, licences inscrites au registre spécial ; savoir-faire protégé par le droit commun." },
  FR: { note: 'Code de la propriété intellectuelle (marques art. L. 711-1 s., brevets art. L. 611-1 s.) ; licences et coexistence.' },
});

const OBLIGATIONS_COUNTRIES = JSON.stringify({
  OHADA: { note: "Acte uniforme portant organisation des procédures simplifiées de recouvrement et des voies d'exécution (AUPSRVE) ; transaction et concessions réciproques de droit commun." },
  FR: { note: 'Code civil : transaction (art. 2044 s.), cession de contrat et de créance ; effet extinctif et autorité de chose jugée.' },
});

const templates: DriveTemplate[] = [
  // ════════════════ RESTRICTIONS D'ACTIVITÉ & CONFIDENTIALITÉ (3) ════════════════
  {
    code: 'aff2_non_sollicitation',
    name: 'Accord de non-sollicitation et de non-débauchage',
    category: 'juridique_admin',
    price: 3000, priceMax: 6000,
    description: "Accord par lequel une partie s'interdit, pendant une durée déterminée, de solliciter ou de débaucher les salariés, sous-traitants et clients de l'autre partie : distinct d'une clause de non-concurrence (l'activité concurrente reste permise), engagement de non-sollicitation du personnel et de la clientèle, périmètre, durée, pénalité forfaitaire et confidentialité.",
    fieldsJson: F([
      { key: 'partie1', label: 'Partie protégée (nom / société + forme juridique + siège)', type: 'textarea', required: true },
      { key: 'partie2', label: 'Partie qui s’engage (nom / société + forme juridique + siège)', type: 'textarea', required: true },
      { key: 'contexte', label: 'Contexte de la relation (négociation, contrat de prestation, due diligence…)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de l’engagement (en mois, à compter de la fin de la relation)', type: 'text', required: true },
      { key: 'perimetre_personnel', label: 'Personnel visé (cadres, ingénieurs, commerciaux, sous-traitants…)', type: 'textarea', required: true },
      { key: 'penalite', label: 'Pénalité forfaitaire par violation constatée (montant + devise)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente (ville / ressort)', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE NON-SOLLICITATION ET DE NON-DÉBAUCHAGE</h1><p>Le présent accord est signé et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{partie1}} (la « Partie protégée »), d'une part,</p><p><strong>ET :</strong> {{partie2}} (la « Partie engagée »), d'autre part.</p><h2>Préambule</h2><p>Dans le cadre de {{contexte}}, la Partie engagée est amenée à connaître l'organisation, le personnel et la clientèle de la Partie protégée. Les parties conviennent d'encadrer cette relation par les engagements suivants, sans pour autant interdire à la Partie engagée l'exercice d'une activité concurrente.</p><h2>Article 1 — Non-débauchage du personnel</h2><p>Pendant toute la durée de la relation et pendant {{duree}} mois à compter de son terme, la Partie engagée s'interdit, directement ou par personne interposée, d'embaucher, de solliciter en vue d'une embauche ou d'inciter à quitter la Partie protégée les membres de son personnel suivants : {{perimetre_personnel}}. Cette interdiction couvre tout collaborateur avec lequel la Partie engagée est entrée en contact à l'occasion de la relation.</p><h2>Article 2 — Non-sollicitation de la clientèle</h2><p>Pendant la même durée, la Partie engagée s'interdit de solliciter, de détourner ou de tenter de détourner les clients et prospects de la Partie protégée dont elle a eu connaissance à l'occasion de la relation, aux fins de leur fournir des prestations concurrentes de celles de la Partie protégée.</p><h2>Article 3 — Distinction avec la non-concurrence</h2><p>Le présent accord n'emporte aucune interdiction générale d'exercer une activité concurrente ; il se limite aux engagements de non-débauchage et de non-sollicitation ci-dessus, proportionnés à la protection des intérêts légitimes de la Partie protégée.</p><h2>Article 4 — Pénalité</h2><p>Toute violation d'un engagement du présent accord donnera lieu au paiement d'une pénalité forfaitaire de <strong>{{penalite}}</strong> par infraction constatée, sans préjudice de la réparation du préjudice supplémentaire et de la cessation de l'agissement, au besoin sous astreinte.</p><h2>Article 5 — Confidentialité</h2><p>Les parties tiennent confidentiels l'existence et le contenu du présent accord ainsi que les informations échangées à l'occasion de la relation.</p><h2>Article 6 — Droit applicable et différends</h2><p>Le présent accord est régi par le droit de {{droit_applicable}}. Tout différend relève, à défaut d'accord amiable, de la compétence des juridictions de {{juridiction}}.</p><p class="signatures">Fait à ______________________, le {{date_jour}}, en deux exemplaires originaux.<br/><br/>LA PARTIE PROTÉGÉE — LA PARTIE ENGAGÉE<br/>Signature — Nom et fonction</p></div>`,
    popularity: 34,
    countriesJson: OBLIGATIONS_COUNTRIES,
  },
  {
    code: 'aff2_confidentialite_mutuelle',
    name: 'Accord de confidentialité mutuel (bilatéral / NDA réciproque)',
    category: 'juridique_admin',
    price: 2500, priceMax: 5000,
    description: "Accord de non-divulgation bilatéral où chaque partie est à la fois émettrice et réceptrice d'informations confidentielles : définition symétrique des informations protégées, exceptions, obligations d'usage limité, durée de l'obligation survivant à la relation, restitution ou destruction des supports et absence de licence. Distinct d'un NDA unilatéral.",
    fieldsJson: F([
      { key: 'partie1', label: 'Première partie (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'partie2', label: 'Seconde partie (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'objet', label: 'Finalité de l’échange (le « Projet »)', type: 'textarea', required: true },
      { key: 'duree_obligation', label: 'Durée de l’obligation de confidentialité (en années après la fin des échanges)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE CONFIDENTIALITÉ MUTUEL</h1><p>Le présent accord est signé et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{partie1}},</p><p><strong>ET :</strong> {{partie2}},</p><p>ci-après ensemble « les Parties » et individuellement « la Partie », chacune agissant tour à tour en qualité de Partie émettrice et de Partie réceptrice.</p><h2>Article 1 — Objet</h2><p>Les Parties souhaitent échanger des informations confidentielles dans le cadre de {{objet}} (le « Projet ») et entendent en organiser la protection réciproque.</p><h2>Article 2 — Informations confidentielles</h2><p>Constitue une « Information confidentielle » toute information, quels qu'en soient la forme et le support, communiquée par une Partie à l'autre à l'occasion du Projet, notamment les données techniques, commerciales, financières, stratégiques, les savoir-faire, fichiers clients et conditions de prix. Ne sont pas confidentielles les informations qui : (a) étaient licitement connues de la Partie réceptrice avant leur communication ; (b) sont ou deviennent publiques sans faute de sa part ; (c) sont reçues licitement d'un tiers non tenu au secret ; (d) sont développées de manière indépendante.</p><h2>Article 3 — Engagements réciproques</h2><p>Chaque Partie s'engage, pour les Informations confidentielles reçues de l'autre, à : les garder strictement confidentielles ; ne les utiliser que pour les besoins du Projet ; ne les divulguer qu'à ses collaborateurs et conseils ayant à en connaître et eux-mêmes tenus au secret ; apporter à leur protection au moins le même soin qu'à ses propres informations sensibles.</p><h2>Article 4 — Propriété et absence de licence</h2><p>Les Informations confidentielles restent la propriété de la Partie émettrice. Le présent accord n'emporte aucune cession ni licence de droit de propriété intellectuelle et ne crée aucune obligation de conclure le Projet.</p><h2>Article 5 — Durée</h2><p>Les obligations de confidentialité s'appliquent pendant les échanges et se poursuivent pendant {{duree_obligation}} an(s) après leur cessation.</p><h2>Article 6 — Restitution</h2><p>À première demande ou à la fin du Projet, chaque Partie restitue ou détruit les supports contenant les Informations confidentielles de l'autre et en atteste par écrit.</p><h2>Article 7 — Droit applicable et différends</h2><p>Le présent accord est régi par le droit de {{droit_applicable}} ; tout différend relève, à défaut d'accord amiable, des juridictions de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>LA PREMIÈRE PARTIE — LA SECONDE PARTIE<br/>Signature — Nom et fonction</p></div>`,
    popularity: 33,
    countriesJson: OBLIGATIONS_COUNTRIES,
  },
  {
    code: 'aff2_lettre_intention',
    name: "Lettre d'intention (LOI — negotiations d'acquisition ou de partenariat)",
    category: 'juridique_admin',
    price: 3500, priceMax: 7000,
    description: "Lettre d'intention encadrant une phase de négociation (acquisition, prise de participation, partenariat) : rappel du contexte, description sommaire de l'opération envisagée, prix ou fourchette indicative, conditions suspensives, exclusivité, période de due diligence, clauses expressément non contraignantes et clauses contraignantes (confidentialité, exclusivité, frais, droit applicable).",
    fieldsJson: F([
      { key: 'emetteur', label: 'Émetteur de la lettre / candidat repreneur (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'destinataire', label: 'Destinataire / cible ou vendeur (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'operation', label: 'Opération envisagée (acquisition de titres, d’actifs, partenariat…)', type: 'textarea', required: true },
      { key: 'prix_indicatif', label: 'Prix ou fourchette de valorisation indicative (avec devise)', type: 'text', required: true },
      { key: 'conditions', label: 'Principales conditions suspensives envisagées', type: 'textarea', required: true },
      { key: 'duree_exclusivite', label: 'Durée de l’exclusivité de négociation (en semaines / mois)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>LETTRE D'INTENTION</h1><p><strong>De :</strong> {{emetteur}} (l'« Émetteur »)</p><p><strong>À :</strong> {{destinataire}} (le « Destinataire »)</p><p>Fait le {{date_jour}}.</p><p>Madame, Monsieur,</p><p>La présente lettre d'intention (la « Lettre ») a pour objet de préciser le cadre et les principales conditions dans lesquelles nous envisageons de poursuivre nos discussions relatives à l'opération décrite ci-après.</p><h2>Article 1 — Opération envisagée</h2><p>L'Émetteur a manifesté son intérêt pour la réalisation de l'opération suivante : {{operation}} (l'« Opération »).</p><h2>Article 2 — Valorisation indicative</h2><p>Sous réserve des vérifications à intervenir, l'Opération serait envisagée sur la base d'une valorisation indicative de <strong>{{prix_indicatif}}</strong>, susceptible d'ajustement au vu des résultats de l'audit.</p><h2>Article 3 — Conditions</h2><p>La réalisation de l'Opération serait notamment subordonnée aux conditions suivantes : {{conditions}}, ainsi qu'à la conclusion d'une documentation définitive et à l'obtention des autorisations nécessaires.</p><h2>Article 4 — Audit (due diligence)</h2><p>Le Destinataire s'engage à donner à l'Émetteur et à ses conseils un accès raisonnable aux informations et documents nécessaires à l'audit comptable, juridique, fiscal et social de l'Opération.</p><h2>Article 5 — Dispositions non contraignantes</h2><p>Les articles 1 à 4 traduisent une simple intention et ne constituent ni une offre ferme ni un engagement de conclure. Aucune partie ne sera engagée à réaliser l'Opération avant la signature d'une documentation définitive.</p><h2>Article 6 — Dispositions contraignantes</h2><p>Les stipulations suivantes sont, en revanche, fermes et obligatoires : <strong>(i) Exclusivité —</strong> pendant {{duree_exclusivite}} à compter de la présente Lettre, le Destinataire s'interdit de solliciter ou de poursuivre toute négociation avec un tiers portant sur l'Opération ; <strong>(ii) Confidentialité —</strong> les parties tiennent confidentiels l'existence et le contenu des discussions ; <strong>(iii) Frais —</strong> chaque partie supporte ses propres frais ; <strong>(iv) Loi applicable —</strong> la présente Lettre est régie par le droit de {{droit_applicable}}.</p><p>Nous vous serions obligés de bien vouloir nous retourner un exemplaire de la présente Lettre revêtu de votre accord.</p><p class="signatures">Bon pour accord, le {{date_jour}}.<br/><br/>L'ÉMETTEUR — LE DESTINATAIRE<br/>Signature — Nom et fonction</p></div>`,
    popularity: 30,
    countriesJson: OBLIGATIONS_COUNTRIES,
  },
  // ════════════════ PROPRIÉTÉ INDUSTRIELLE & MARQUES (2) ════════════════
  {
    code: 'aff2_licence_brevet_savoir_faire',
    name: 'Accord de licence de brevet et de savoir-faire',
    category: 'juridique_admin',
    price: 5000, priceMax: 10000,
    description: "Contrat de licence par lequel le titulaire d'un brevet et d'un savoir-faire associé concède à un licencié le droit d'exploiter l'invention : objet et territoire, caractère exclusif ou non, transmission du savoir-faire et assistance, redevances (forfait + royalties sur chiffre d'affaires), obligation d'exploitation, garantie de jouissance et défense du brevet, confidentialité et sort en fin de contrat.",
    fieldsJson: F([
      { key: 'concedant', label: 'Concédant — titulaire du brevet (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'licencie', label: 'Licencié (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'brevet', label: 'Brevet concédé (numéro, intitulé, office de dépôt — OAPI / INPI…)', type: 'textarea', required: true },
      { key: 'savoir_faire', label: 'Savoir-faire et documentation technique transmis', type: 'textarea', required: true },
      { key: 'territoire', label: 'Territoire de la licence', type: 'text', required: true },
      { key: 'exclusivite', label: 'Caractère de la licence (exclusive / non exclusive)', type: 'text', required: true },
      { key: 'redevance_fixe', label: 'Redevance initiale forfaitaire (montant + devise)', type: 'text', required: true },
      { key: 'taux_royalties', label: 'Taux de redevance sur le chiffre d’affaires net (%)', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la licence (en années)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE LICENCE DE BREVET ET DE SAVOIR-FAIRE</h1><p>Le présent accord est signé et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{concedant}} (le « Concédant »), d'une part,</p><p><strong>ET :</strong> {{licencie}} (le « Licencié »), d'autre part.</p><h2>Article 1 — Objet et titres concédés</h2><p>Le Concédant, titulaire du brevet suivant : {{brevet}}, et du savoir-faire associé, concède au Licencié le droit d'exploiter cette invention. Le savoir-faire et la documentation transmis sont : {{savoir_faire}}.</p><h2>Article 2 — Étendue de la licence</h2><p>La licence est de nature <strong>{{exclusivite}}</strong> et est concédée pour le territoire de {{territoire}}. Elle couvre la fabrication, l'usage et la commercialisation des produits couverts par le brevet. Toute sous-licence requiert l'accord écrit préalable du Concédant.</p><h2>Article 3 — Transmission du savoir-faire et assistance</h2><p>Le Concédant remet au Licencié la documentation technique nécessaire et lui apporte une assistance raisonnable au démarrage de l'exploitation. Le Licencié tient le savoir-faire strictement confidentiel.</p><h2>Article 4 — Redevances</h2><p>En contrepartie, le Licencié verse : (a) une redevance initiale forfaitaire de <strong>{{redevance_fixe}}</strong> à la signature ; (b) une redevance proportionnelle de {{taux_royalties}} % du chiffre d'affaires net réalisé sur les produits sous licence, payable trimestriellement sur présentation d'un relevé. Le Concédant peut faire auditer les comptes correspondants.</p><h2>Article 5 — Obligation d'exploitation</h2><p>Le Licencié s'engage à exploiter le brevet de manière sérieuse et effective et à assurer la qualité des produits. À défaut d'exploitation, le Concédant peut résilier la licence ou la rendre non exclusive.</p><h2>Article 6 — Garantie et défense du brevet</h2><p>Le Concédant garantit être titulaire des droits concédés et assure au Licencié une jouissance paisible. Chaque partie informe l'autre de toute contrefaçon ; les modalités d'action en contrefaçon et de défense de la validité du brevet sont décidées d'un commun accord.</p><h2>Article 7 — Durée et fin</h2><p>La licence est consentie pour {{duree}} an(s). À son terme, le Licencié cesse toute exploitation, restitue la documentation et n'utilise plus le savoir-faire.</p><h2>Article 8 — Droit applicable</h2><p>Le présent accord est régi par le droit de {{droit_applicable}} et par les règles de propriété industrielle applicables au territoire concédé.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>LE CONCÉDANT — LE LICENCIÉ<br/>Signature — Nom et fonction</p></div>`,
    popularity: 28,
    countriesJson: PI_COUNTRIES,
  },
  {
    code: 'aff2_coexistence_marques',
    name: 'Accord de coexistence de marques',
    category: 'juridique_admin',
    price: 4000, priceMax: 8000,
    description: "Accord réglant l'usage concurrent de deux marques identiques ou similaires afin d'éviter tout risque de confusion : reconnaissance réciproque des droits, délimitation des produits/services et des territoires de chacun, engagements de non-extension et de non-opposition, règles d'usage distinctif (logos, couleurs, mentions), retrait des oppositions en cours et coopération pour la protection des marques.",
    fieldsJson: F([
      { key: 'partie1', label: 'Première partie (titulaire de la marque A — nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'marque1', label: 'Marque A (dénomination, classes, territoires d’enregistrement)', type: 'textarea', required: true },
      { key: 'partie2', label: 'Seconde partie (titulaire de la marque B — nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'marque2', label: 'Marque B (dénomination, classes, territoires d’enregistrement)', type: 'textarea', required: true },
      { key: 'delimitation', label: 'Délimitation convenue (produits / services et territoires de chacun)', type: 'textarea', required: true },
      { key: 'regles_usage', label: 'Règles d’usage distinctif (logo, couleurs, mentions différenciantes)', type: 'textarea', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE COEXISTENCE DE MARQUES</h1><p>Le présent accord est signé et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{partie1}}, titulaire de la marque « A » : {{marque1}},</p><p><strong>ET :</strong> {{partie2}}, titulaire de la marque « B » : {{marque2}}.</p><h2>Préambule</h2><p>Les parties exploitent des marques identiques ou similaires et souhaitent, afin de prévenir tout risque de confusion et tout contentieux, organiser leur coexistence pacifique.</p><h2>Article 1 — Reconnaissance des droits</h2><p>Chaque partie reconnaît à l'autre la titularité et la validité de sa marque dans le périmètre défini au présent accord et s'interdit d'en contester l'enregistrement ou l'usage dans ce périmètre.</p><h2>Article 2 — Délimitation des champs d'exploitation</h2><p>Les parties conviennent de la délimitation suivante de leurs produits, services et territoires respectifs : {{delimitation}}. Chaque partie s'interdit d'étendre l'usage de sa marque au champ réservé à l'autre.</p><h2>Article 3 — Règles d'usage distinctif</h2><p>Afin d'écarter tout risque de confusion, chaque partie s'engage à respecter les règles d'usage suivantes : {{regles_usage}} (logotype, couleurs, mentions différenciantes, présentation commerciale).</p><h2>Article 4 — Non-opposition et retrait des procédures</h2><p>Les parties s'engagent à ne former aucune opposition, action en nullité ou en contrefaçon l'une contre l'autre dans le respect du présent accord, et à se désister des procédures éventuellement en cours ayant le même objet.</p><h2>Article 5 — Coopération</h2><p>Les parties coopèrent de bonne foi pour la défense de leurs marques contre les tiers et s'informent de toute atteinte susceptible d'affecter leur coexistence.</p><h2>Article 6 — Durée et transmission</h2><p>Le présent accord est conclu sans limitation de durée ; il s'impose aux ayants droit, cessionnaires et licenciés de chaque partie, qui s'engage à le leur faire respecter.</p><h2>Article 7 — Droit applicable</h2><p>Le présent accord est régi par le droit de {{droit_applicable}}.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>LA PREMIÈRE PARTIE — LA SECONDE PARTIE<br/>Signature — Nom et fonction</p></div>`,
    popularity: 22,
    countriesJson: PI_COUNTRIES,
  },
  // ════════════════ CAPITAL, TITRES & GOUVERNANCE (5) ════════════════
  {
    code: 'aff2_compte_courant_associe',
    name: "Convention de compte courant d'associé",
    category: 'commercial_financier',
    price: 3000, priceMax: 6000,
    description: "Convention par laquelle un associé met des fonds à la disposition de sa société en compte courant : montant et modalités de versement, rémunération par intérêts dans la limite du taux fiscalement déductible, blocage éventuel, conditions de remboursement et de préavis, absence de position débitrice de l'associé et information de la collectivité des associés. Grounded sur « Accord de prêt d'un actionnaire » (Drive ACCORDS).",
    fieldsJson: F([
      { key: 'societe', label: 'Société bénéficiaire (dénomination + forme + siège + RCCM/RCS)', type: 'textarea', required: true },
      { key: 'associe', label: 'Associé apporteur (nom + domicile + nombre de titres détenus)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant mis à disposition en compte courant (avec devise)', type: 'text', required: true },
      { key: 'taux', label: 'Taux d’intérêt annuel (dans la limite du taux déductible)', type: 'text', required: true },
      { key: 'blocage', label: 'Durée de blocage éventuelle (ou « non bloqué »)', type: 'text', required: true },
      { key: 'preavis', label: 'Préavis de remboursement (en mois)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONVENTION DE COMPTE COURANT D'ASSOCIÉ</h1><p>La présente convention est signée et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{societe}} (la « Société »), d'une part,</p><p><strong>ET :</strong> {{associe}} (l'« Associé »), d'autre part.</p><h2>Article 1 — Objet</h2><p>L'Associé met à la disposition de la Société, en compte courant d'associé, une somme de <strong>{{montant}}</strong>, inscrite au crédit d'un compte ouvert à son nom dans les livres de la Société.</p><h2>Article 2 — Versement</h2><p>Les fonds sont versés par virement au compte bancaire de la Société. Le compte courant peut être alimenté par des versements complémentaires ultérieurs d'un commun accord.</p><h2>Article 3 — Intérêts</h2><p>Les sommes portées en compte courant produisent un intérêt annuel de {{taux}} %, calculé prorata temporis sur le solde créditeur, dans la limite du taux maximal fiscalement déductible. Les intérêts sont arrêtés en fin d'exercice.</p><h2>Article 4 — Blocage</h2><p>Modalité de blocage : {{blocage}}. Pendant la période de blocage éventuelle, l'Associé s'interdit d'exiger le remboursement des sommes concernées.</p><h2>Article 5 — Remboursement</h2><p>Hors période de blocage, le compte courant est remboursable à tout moment à la demande de l'Associé, moyennant un préavis de {{preavis}} mois, sous réserve que le remboursement ne compromette pas la continuité de l'exploitation ni la trésorerie de la Société. La Société peut également rembourser par anticipation.</p><h2>Article 6 — Interdiction de position débitrice</h2><p>Le compte courant ne peut jamais devenir débiteur : l'Associé ne saurait être tenu envers la Société au titre du présent compte.</p><h2>Article 7 — Convention réglementée</h2><p>La présente convention est soumise, le cas échéant, à la procédure de contrôle des conventions réglementées et portée à la connaissance de la collectivité des associés.</p><h2>Article 8 — Droit applicable</h2><p>La présente convention est régie par le droit de {{droit_applicable}}.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>LA SOCIÉTÉ — L'ASSOCIÉ<br/>Signature — Nom et fonction</p></div>`,
    popularity: 32,
    countriesJson: SOCIETES_COUNTRIES,
  },
  {
    code: 'aff2_croupier',
    name: 'Convention de croupier',
    category: 'commercial_financier',
    price: 3000, priceMax: 6000,
    description: "Convention par laquelle un associé (l'associé apparent) convient de partager avec un tiers (le croupier), resté extérieur à la société, les bénéfices et les pertes attachés à sa participation : le croupier n'acquiert aucun droit d'associé ni la qualité d'associé, l'associé apparent conserve seul l'exercice des droits sociaux et le droit de vote, partage des dividendes et du boni, information du croupier et confidentialité vis-à-vis de la société.",
    fieldsJson: F([
      { key: 'associe', label: 'Associé apparent (nom + domicile + société concernée + nombre de titres)', type: 'textarea', required: true },
      { key: 'croupier', label: 'Croupier (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'societe', label: 'Société dont les titres portent la participation', type: 'textarea', required: true },
      { key: 'quote_part', label: 'Quote-part des résultats attribuée au croupier (%)', type: 'text', required: true },
      { key: 'apport_croupier', label: 'Somme versée par le croupier à l’associé apparent (avec devise)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONVENTION DE CROUPIER</h1><p>La présente convention est signée et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{associe}} (l'« Associé apparent »), d'une part,</p><p><strong>ET :</strong> {{croupier}} (le « Croupier »), d'autre part.</p><h2>Préambule</h2><p>L'Associé apparent détient une participation dans la société {{societe}}. Il souhaite partager avec le Croupier, qui l'accepte, les profits et les risques attachés à cette participation, sans que le Croupier ne devienne associé de la société.</p><h2>Article 1 — Objet</h2><p>L'Associé apparent convient de faire participer le Croupier, à hauteur de {{quote_part}} %, aux bénéfices et aux pertes générés par sa participation dans la société, en contrepartie d'une somme de <strong>{{apport_croupier}}</strong> versée par le Croupier.</p><h2>Article 2 — Absence de qualité d'associé</h2><p>La présente convention produit ses effets entre les seules parties. Le Croupier n'acquiert aucun droit dans la société, n'en devient pas associé, ne peut se prévaloir d'aucun droit à son égard et n'est pas connu d'elle. L'Associé apparent demeure seul associé aux yeux de la société et des tiers.</p><h2>Article 3 — Exercice des droits sociaux</h2><p>L'Associé apparent conserve l'exercice exclusif de l'ensemble des droits attachés à ses titres, notamment le droit de vote. Il exerce ces droits librement ; il pourra, sans y être tenu, recueillir l'avis du Croupier.</p><h2>Article 4 — Partage des résultats</h2><p>L'Associé apparent reverse au Croupier sa quote-part des dividendes perçus et, le cas échéant, du boni de liquidation ou du prix de cession des titres, déduction faite de la même quote-part des pertes et charges. Les comptes sont établis à chaque distribution.</p><h2>Article 5 — Information</h2><p>L'Associé apparent tient le Croupier informé des distributions et des événements affectant significativement la participation.</p><h2>Article 6 — Confidentialité et durée</h2><p>Les parties tiennent la présente convention confidentielle à l'égard de la société et des tiers. La convention prend fin en cas de cession de la totalité de la participation ou de dissolution de la société.</p><h2>Article 7 — Droit applicable</h2><p>La présente convention est régie par le droit de {{droit_applicable}}.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>L'ASSOCIÉ APPARENT — LE CROUPIER<br/>Signature — Nom et fonction</p></div>`,
    popularity: 18,
    countriesJson: SOCIETES_COUNTRIES,
  },
  {
    code: 'aff2_portage_actions',
    name: "Convention de portage d'actions",
    category: 'commercial_financier',
    price: 4500, priceMax: 9000,
    description: "Convention par laquelle un porteur acquiert des actions pour le compte d'un donneur d'ordre et s'engage à les lui rétrocéder (ou à un tiers désigné) à un terme convenu et à un prix garantissant sa rémunération : acquisition, portage temporaire, rémunération du porteur, promesses croisées d'achat et de vente, exercice des droits sociaux pendant le portage, dénouement et défaillance.",
    fieldsJson: F([
      { key: 'porteur', label: 'Porteur (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'donneur_ordre', label: 'Donneur d’ordre (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'societe', label: 'Société émettrice des actions portées', type: 'textarea', required: true },
      { key: 'nombre_actions', label: 'Nombre et catégorie d’actions portées', type: 'text', required: true },
      { key: 'prix_acquisition', label: 'Prix d’acquisition par le porteur (avec devise)', type: 'text', required: true },
      { key: 'duree_portage', label: 'Durée du portage (en mois / années)', type: 'text', required: true },
      { key: 'remuneration', label: 'Rémunération du porteur (taux annuel ou prime de portage)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONVENTION DE PORTAGE D'ACTIONS</h1><p>La présente convention est signée et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{porteur}} (le « Porteur »), d'une part,</p><p><strong>ET :</strong> {{donneur_ordre}} (le « Donneur d'ordre »), d'autre part.</p><h2>Article 1 — Objet</h2><p>Le Porteur acquiert et détient, pour la durée du portage et pour le compte économique du Donneur d'ordre, {{nombre_actions}} de la société {{societe}} (les « Actions portées »), moyennant un prix d'acquisition de <strong>{{prix_acquisition}}</strong>.</p><h2>Article 2 — Caractère temporaire du portage</h2><p>La détention des Actions portées par le Porteur est temporaire ; elle a pour seule finalité leur rétrocession au Donneur d'ordre ou à toute personne qu'il désignera, au terme convenu.</p><h2>Article 3 — Durée</h2><p>Le portage est consenti pour une durée de {{duree_portage}}, à l'issue de laquelle interviendra le dénouement prévu à l'article 5.</p><h2>Article 4 — Rémunération du porteur</h2><p>En contrepartie du portage et de l'immobilisation des fonds, le Porteur perçoit une rémunération égale à {{remuneration}}, à la charge du Donneur d'ordre.</p><h2>Article 5 — Promesses croisées et dénouement</h2><p>Aux fins du dénouement : (a) le Porteur consent au Donneur d'ordre une promesse de vente des Actions portées ; (b) le Donneur d'ordre consent au Porteur une promesse d'achat de ces mêmes Actions. Le prix de rétrocession est égal au prix d'acquisition majoré de la rémunération du Porteur restant due et diminué des sommes déjà perçues. La levée de l'une ou l'autre promesse au terme emporte transfert de propriété.</p><h2>Article 6 — Exercice des droits sociaux</h2><p>Pendant le portage, le Porteur exerce les droits attachés aux Actions portées conformément aux instructions écrites du Donneur d'ordre et lui reverse les dividendes perçus, sous réserve des dispositions impératives applicables.</p><h2>Article 7 — Défaillance</h2><p>En cas de défaillance du Donneur d'ordre dans la levée de la promesse ou le paiement du prix, le Porteur retrouve la libre disposition des Actions portées, sans préjudice de ses recours.</p><h2>Article 8 — Droit applicable</h2><p>La présente convention est régie par le droit de {{droit_applicable}}.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>LE PORTEUR — LE DONNEUR D'ORDRE<br/>Signature — Nom et fonction</p></div>`,
    popularity: 20,
    countriesJson: SOCIETES_COUNTRIES,
  },
  {
    code: 'aff2_convention_vote',
    name: 'Convention de vote (accord entre associés)',
    category: 'juridique_admin',
    price: 3500, priceMax: 7000,
    description: "Convention extra-statutaire par laquelle des associés s'engagent à voter dans un sens déterminé lors des assemblées : concertation préalable, sens du vote convenu sur les décisions visées, désignation d'un mandataire commun éventuel, respect de l'intérêt social et de l'ordre public sociétaire, durée alignée sur la détention des titres, sanctions et confidentialité.",
    fieldsJson: F([
      { key: 'associes', label: 'Associés parties à la convention (nom + nombre de titres, un par ligne)', type: 'textarea', required: true },
      { key: 'societe', label: 'Société concernée (dénomination + forme + siège)', type: 'textarea', required: true },
      { key: 'decisions', label: 'Décisions couvertes (nomination des dirigeants, distribution, orientations…)', type: 'textarea', required: true },
      { key: 'mecanisme', label: 'Mécanisme de détermination du vote (concertation, majorité interne…)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de la convention (en années)', type: 'text', required: true },
      { key: 'penalite', label: 'Pénalité en cas de vote non conforme (montant + devise)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONVENTION DE VOTE</h1><p>La présente convention est signée et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE LES ASSOCIÉS SOUSSIGNÉS :</strong> {{associes}}, ci-après « les Parties », associés de la société {{societe}}.</p><h2>Préambule</h2><p>Les Parties souhaitent coordonner l'exercice de leurs droits de vote afin d'assurer une politique cohérente au sein de la société, dans le respect de l'intérêt social et des dispositions impératives du droit des sociétés.</p><h2>Article 1 — Objet</h2><p>Les Parties conviennent de se concerter préalablement à chaque assemblée et de voter dans un sens commun sur les décisions suivantes : {{decisions}}.</p><h2>Article 2 — Détermination du sens du vote</h2><p>Le sens du vote commun est déterminé selon le mécanisme suivant : {{mecanisme}}. Une fois arrêté, chaque Partie s'engage à voter conformément à la position commune, à participer aux assemblées ou à s'y faire représenter.</p><h2>Article 3 — Mandataire commun</h2><p>Les Parties peuvent désigner un mandataire commun chargé de représenter tout ou partie d'entre elles et de voter conformément à la position commune.</p><h2>Article 4 — Limites</h2><p>La présente convention ne saurait porter atteinte à l'intérêt social, contrevenir à l'ordre public sociétaire, ni conduire une Partie à voter contre l'intérêt de la société. Toute clause contraire serait réputée non écrite.</p><h2>Article 5 — Durée</h2><p>La convention est conclue pour {{duree}} an(s) et, pour chaque Partie, tant qu'elle demeure associée. Elle s'impose aux cessionnaires des titres, chaque Partie s'engageant à leur en faire reprendre les engagements.</p><h2>Article 6 — Sanction</h2><p>Tout vote émis en violation de la présente convention donne lieu au paiement d'une pénalité de <strong>{{penalite}}</strong>, sans préjudice de l'exécution forcée et de la réparation du préjudice.</p><h2>Article 7 — Confidentialité et droit applicable</h2><p>Les Parties tiennent la convention confidentielle. Elle est régie par le droit de {{droit_applicable}}.</p><p class="signatures">Fait en autant d'exemplaires que de Parties, le {{date_jour}}.<br/><br/>LES ASSOCIÉS<br/>Signatures — Noms</p></div>`,
    popularity: 21,
    countriesJson: SOCIETES_COUNTRIES,
  },
  {
    code: 'aff2_prete_nom',
    name: 'Convention de prête-nom (mandat)',
    category: 'juridique_admin',
    price: 3000, priceMax: 6000,
    description: "Convention par laquelle une personne (le prête-nom) accepte d'agir en son nom mais pour le compte d'un mandant occulte, en acquérant ou détenant un bien ou des titres : reconnaissance du caractère fictif de la propriété apparente, obligation de rétrocession à première demande, reversement des fruits, prise en charge des risques et charges par le mandant, contre-lettre et engagement de restitution. Distincte du portage (pas de terme ni de rémunération de portage).",
    fieldsJson: F([
      { key: 'prete_nom', label: 'Prête-nom / propriétaire apparent (nom + domicile)', type: 'textarea', required: true },
      { key: 'mandant', label: 'Mandant / véritable propriétaire (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'bien', label: 'Bien ou titres détenus au nom du prête-nom (description précise)', type: 'textarea', required: true },
      { key: 'origine_fonds', label: 'Origine des fonds ayant financé l’acquisition', type: 'textarea', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONVENTION DE PRÊTE-NOM</h1><p>La présente convention (valant contre-lettre) est signée et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{prete_nom}} (le « Prête-nom »), d'une part,</p><p><strong>ET :</strong> {{mandant}} (le « Mandant »), d'autre part.</p><h2>Article 1 — Objet</h2><p>Le Prête-nom accepte d'acquérir et/ou de détenir en son nom, mais exclusivement pour le compte du Mandant, le bien suivant : {{bien}}. Le Mandant est et demeure le véritable propriétaire.</p><h2>Article 2 — Financement</h2><p>L'acquisition a été intégralement financée par le Mandant ; origine des fonds : {{origine_fonds}}. Le Prête-nom reconnaît n'avoir supporté aucune charge financière à ce titre.</p><h2>Article 3 — Caractère fictif de la propriété apparente</h2><p>Les parties reconnaissent que la propriété du Prête-nom est purement apparente et n'a d'effet qu'à l'égard des tiers ; dans leurs rapports, seul le Mandant a la qualité de propriétaire et en assume les droits et obligations.</p><h2>Article 4 — Obligation de rétrocession</h2><p>Le Prête-nom s'engage à transférer le bien au Mandant, ou à toute personne désignée par lui, à première demande, sans contrepartie autre que le remboursement des frais éventuels avancés, et à signer tous actes nécessaires à ce transfert.</p><h2>Article 5 — Fruits, risques et charges</h2><p>Le Prête-nom reverse au Mandant l'intégralité des fruits, revenus et produits du bien. Le Mandant supporte les charges, impôts et risques afférents et garantit le Prête-nom de toute condamnation résultant de sa qualité de propriétaire apparent, sauf faute personnelle de ce dernier.</p><h2>Article 6 — Interdiction de disposer</h2><p>Le Prête-nom s'interdit d'aliéner, de grever ou de disposer du bien sans instruction écrite du Mandant.</p><h2>Article 7 — Droit applicable</h2><p>La présente convention, licite en ce qu'elle ne poursuit aucun but frauduleux, est régie par le droit de {{droit_applicable}}.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>LE PRÊTE-NOM — LE MANDANT<br/>Signature — Nom et fonction</p></div>`,
    popularity: 17,
    countriesJson: SOCIETES_COUNTRIES,
  },
  // ════════════════ RELATIONS COMMERCIALES (5) ════════════════
  {
    code: 'aff2_exclusivite_appro',
    name: "Accord d'exclusivité d'approvisionnement",
    category: 'commercial_financier',
    price: 3500, priceMax: 7000,
    description: "Accord par lequel un acheteur s'engage à s'approvisionner exclusivement auprès d'un fournisseur (ou un fournisseur à réserver l'exclusivité de fourniture à un acheteur) pour des produits déterminés : périmètre de l'exclusivité, volumes ou objectifs, conditions de prix et de commande, durée limitée, contreparties, exceptions et conséquences de la rupture.",
    fieldsJson: F([
      { key: 'fournisseur', label: 'Fournisseur (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'acheteur', label: 'Acheteur / distributeur (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'produits', label: 'Produits couverts par l’exclusivité', type: 'textarea', required: true },
      { key: 'sens_exclusivite', label: 'Sens de l’exclusivité (d’achat, de fourniture, ou réciproque)', type: 'text', required: true },
      { key: 'territoire', label: 'Territoire concerné', type: 'text', required: true },
      { key: 'objectifs', label: 'Volumes minimaux ou objectifs d’achat', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de l’accord (en années)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD D'EXCLUSIVITÉ D'APPROVISIONNEMENT</h1><p>Le présent accord est signé et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{fournisseur}} (le « Fournisseur »), d'une part,</p><p><strong>ET :</strong> {{acheteur}} (l'« Acheteur »), d'autre part.</p><h2>Article 1 — Objet et sens de l'exclusivité</h2><p>Les parties conviennent d'une exclusivité de nature <strong>{{sens_exclusivite}}</strong> portant sur les produits suivants : {{produits}}, sur le territoire de {{territoire}}.</p><h2>Article 2 — Portée de l'engagement</h2><p>Selon le sens convenu : l'Acheteur s'engage à s'approvisionner exclusivement auprès du Fournisseur pour les produits visés, et/ou le Fournisseur s'engage à ne pas fournir ces produits à un tiers sur le territoire. Chaque partie s'interdit tout contournement de l'exclusivité.</p><h2>Article 3 — Objectifs</h2><p>L'Acheteur s'engage sur les volumes ou objectifs suivants : {{objectifs}}. Le non-respect substantiel de ces objectifs peut entraîner la perte de l'exclusivité, sans préjudice des autres sanctions.</p><h2>Article 4 — Commandes et prix</h2><p>Les commandes sont passées et exécutées selon les conditions générales du Fournisseur en vigueur, sous réserve des conditions particulières convenues. Le Fournisseur garantit à l'Acheteur des conditions de prix au moins aussi favorables que celles consenties à ses autres clients de rang comparable.</p><h2>Article 5 — Durée</h2><p>L'exclusivité est consentie pour une durée limitée de {{duree}} an(s), renouvelable par accord exprès, dans le respect des règles de concurrence applicables.</p><h2>Article 6 — Exceptions</h2><p>L'exclusivité ne s'applique pas en cas de rupture d'approvisionnement du Fournisseur, d'inadéquation avérée des produits ou de défaillance de qualité, l'Acheteur pouvant alors se fournir temporairement ailleurs.</p><h2>Article 7 — Rupture</h2><p>En cas de manquement grave, la partie lésée peut résilier l'accord après mise en demeure restée sans effet, sans préjudice de dommages-intérêts.</p><h2>Article 8 — Droit applicable</h2><p>Le présent accord est régi par le droit de {{droit_applicable}} et par les règles de concurrence applicables.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>LE FOURNISSEUR — L'ACHETEUR<br/>Signature — Nom et fonction</p></div>`,
    popularity: 27,
    countriesJson: CONTRATS_COUNTRIES,
  },
  {
    code: 'aff2_accord_cadre_achat',
    name: "Accord-cadre d'achat / de fourniture",
    category: 'commercial_financier',
    price: 4000, priceMax: 8000,
    description: "Accord-cadre organisant des relations d'achats répétés exécutées par commandes ou contrats d'application : champ des produits/services, conditions générales applicables aux commandes, prix et révision, prévisions et engagements de volume, qualité et pénalités, responsabilité, durée et articulation entre l'accord-cadre et les commandes individuelles.",
    fieldsJson: F([
      { key: 'acheteur', label: 'Acheteur / donneur d’ordre (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'fournisseur', label: 'Fournisseur (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'perimetre', label: 'Produits / services couverts par l’accord-cadre', type: 'textarea', required: true },
      { key: 'conditions_prix', label: 'Modalités de prix et de révision', type: 'textarea', required: true },
      { key: 'volume_previsionnel', label: 'Volume prévisionnel ou engagement minimal', type: 'textarea', required: true },
      { key: 'penalites', label: 'Pénalités de retard / de non-qualité', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de l’accord-cadre (en années)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD-CADRE D'ACHAT / DE FOURNITURE</h1><p>Le présent accord-cadre est signé et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{acheteur}} (l'« Acheteur »), d'une part,</p><p><strong>ET :</strong> {{fournisseur}} (le « Fournisseur »), d'autre part.</p><h2>Article 1 — Objet</h2><p>Le présent accord-cadre définit les conditions générales dans lesquelles le Fournisseur livrera à l'Acheteur, au fur et à mesure de ses besoins et par voie de commandes, les produits ou services suivants : {{perimetre}}.</p><h2>Article 2 — Commandes d'application</h2><p>Chaque commande précise les références, quantités, délais et lieux de livraison. Les commandes sont régies par le présent accord-cadre ; en cas de contradiction, l'accord-cadre prévaut, sauf dérogation expresse acceptée par écrit. L'accord-cadre n'emporte, par lui-même, aucune obligation d'achat au-delà des engagements de volume ci-dessous.</p><h2>Article 3 — Prix et révision</h2><p>Les prix et leurs modalités de révision sont les suivants : {{conditions_prix}}.</p><h2>Article 4 — Prévisions et volumes</h2><p>L'Acheteur communique des prévisions indicatives. Engagement de volume : {{volume_previsionnel}}.</p><h2>Article 5 — Qualité et pénalités</h2><p>Le Fournisseur garantit la conformité et la qualité des produits. Pénalités applicables : {{penalites}}, sans préjudice du droit de refuser les produits non conformes.</p><h2>Article 6 — Responsabilité et assurances</h2><p>Le Fournisseur répond des dommages causés par ses produits ou prestations et justifie des assurances adaptées. Chaque partie supporte les conséquences de ses manquements dans les conditions du droit commun.</p><h2>Article 7 — Durée et résiliation</h2><p>L'accord-cadre est conclu pour {{duree}} an(s). Il peut être résilié pour manquement grave après mise en demeure. La résiliation n'affecte pas l'exécution des commandes en cours, sauf décision contraire.</p><h2>Article 8 — Droit applicable</h2><p>Le présent accord-cadre est régi par le droit de {{droit_applicable}}.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>L'ACHETEUR — LE FOURNISSEUR<br/>Signature — Nom et fonction</p></div>`,
    popularity: 29,
    countriesJson: CONTRATS_COUNTRIES,
  },
  {
    code: 'aff2_distribution_selective',
    name: 'Contrat de distribution sélective',
    category: 'commercial_financier',
    price: 4500, priceMax: 9000,
    description: "Contrat par lequel un fournisseur agrée des distributeurs répondant à des critères qualitatifs pour la revente de ses produits : critères de sélection (compétence, point de vente, service après-vente), interdiction de revente aux revendeurs non agréés, obligations promotionnelles et de stock, prix conseillés, protection de l'image de marque, territoire non exclusif, durée et résiliation.",
    fieldsJson: F([
      { key: 'fournisseur', label: 'Fournisseur / tête de réseau (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'distributeur', label: 'Distributeur agréé (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'produits', label: 'Produits distribués (gamme, marque)', type: 'textarea', required: true },
      { key: 'criteres', label: 'Critères qualitatifs d’agrément (point de vente, personnel, SAV…)', type: 'textarea', required: true },
      { key: 'obligations', label: 'Obligations du distributeur (stock, présentation, promotion)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du contrat (en années)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONTRAT DE DISTRIBUTION SÉLECTIVE</h1><p>Le présent contrat est signé et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{fournisseur}} (le « Fournisseur »), d'une part,</p><p><strong>ET :</strong> {{distributeur}} (le « Distributeur »), d'autre part.</p><h2>Article 1 — Objet et agrément</h2><p>Le Fournisseur agrée le Distributeur, qui l'accepte, en qualité de distributeur sélectif des produits suivants : {{produits}}. L'agrément est accordé au vu du respect des critères qualitatifs définis à l'article 2 ; il n'emporte aucune exclusivité territoriale.</p><h2>Article 2 — Critères de sélection</h2><p>Le Distributeur déclare satisfaire et s'engage à maintenir les critères qualitatifs suivants : {{criteres}}. Le Fournisseur applique ces critères de manière objective et non discriminatoire à tous les candidats.</p><h2>Article 3 — Interdiction de revente hors réseau</h2><p>Le Distributeur s'interdit de revendre les produits à des revendeurs non agréés par le réseau. Il ne peut vendre qu'aux utilisateurs finals et aux autres membres agréés du réseau.</p><h2>Article 4 — Obligations du distributeur</h2><p>Le Distributeur s'engage à : {{obligations}} — présentation valorisante des produits, tenue d'un stock suffisant, actions de promotion, formation du personnel de vente et service après-vente conforme aux standards du Fournisseur.</p><h2>Article 5 — Prix</h2><p>Le Distributeur fixe librement ses prix de revente ; le Fournisseur peut communiquer des prix conseillés sans caractère obligatoire.</p><h2>Article 6 — Image de marque</h2><p>Le Distributeur préserve l'image et la réputation des produits et de la marque, et respecte les chartes de présentation communiquées.</p><h2>Article 7 — Durée et résiliation</h2><p>Le contrat est conclu pour {{duree}} an(s). Il peut être résilié pour manquement aux critères ou obligations après mise en demeure. La perte durable d'un critère d'agrément entraîne la fin de l'agrément.</p><h2>Article 8 — Droit applicable</h2><p>Le présent contrat est régi par le droit de {{droit_applicable}} et par les règles de concurrence applicables.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>LE FOURNISSEUR — LE DISTRIBUTEUR<br/>Signature — Nom et fonction</p></div>`,
    popularity: 26,
    countriesJson: CONTRATS_COUNTRIES,
  },
  {
    code: 'aff2_assistance_technique',
    name: "Convention d'assistance technique",
    category: 'commercial_financier',
    price: 4000, priceMax: 8000,
    description: "Convention par laquelle un prestataire met à disposition d'une entreprise son expertise technique, ses méthodes et éventuellement son personnel : nature des prestations d'assistance (formation, mise en œuvre de procédés, support), moyens et personnel affecté, confidentialité du savoir-faire, rémunération (forfait ou honoraires), obligations de moyens, propriété des développements et durée. Distincte d'une assistance juridique.",
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire / assistant technique (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'beneficiaire', label: 'Entreprise bénéficiaire (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'domaine', label: 'Domaine technique de l’assistance (procédé, équipement, méthode…)', type: 'textarea', required: true },
      { key: 'prestations', label: 'Prestations d’assistance (formation, support, mise en œuvre, audit…)', type: 'textarea', required: true },
      { key: 'remuneration', label: 'Rémunération (forfait, taux journalier, redevance)', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la convention (en mois / années)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONVENTION D'ASSISTANCE TECHNIQUE</h1><p>La présente convention est signée et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{prestataire}} (le « Prestataire »), d'une part,</p><p><strong>ET :</strong> {{beneficiaire}} (le « Bénéficiaire »), d'autre part.</p><h2>Article 1 — Objet</h2><p>Le Prestataire apporte au Bénéficiaire son assistance technique dans le domaine suivant : {{domaine}}, afin de lui permettre d'améliorer ou de mettre en œuvre ses procédés et son organisation technique.</p><h2>Article 2 — Prestations</h2><p>L'assistance comprend notamment : {{prestations}}. Le Prestataire est tenu d'une obligation de moyens et met en œuvre le soin et la compétence attendus d'un professionnel de son domaine.</p><h2>Article 3 — Moyens et personnel</h2><p>Le Prestataire affecte à la mission un personnel qualifié. Le personnel demeure sous l'autorité et la responsabilité du Prestataire ; la convention n'emporte aucun transfert de contrat de travail.</p><h2>Article 4 — Confidentialité et savoir-faire</h2><p>Chaque partie tient confidentiels les informations, méthodes et savoir-faire de l'autre. Le savoir-faire transmis reste la propriété du Prestataire ; le Bénéficiaire ne l'utilise que pour ses besoins internes.</p><h2>Article 5 — Rémunération</h2><p>En contrepartie, le Bénéficiaire verse : {{remuneration}}, augmentée des frais et débours justifiés, selon la périodicité convenue.</p><h2>Article 6 — Propriété des développements</h2><p>Les développements spécifiques réalisés pour le Bénéficiaire et payés par lui lui sont acquis, sous réserve des droits et outils préexistants du Prestataire.</p><h2>Article 7 — Durée</h2><p>La convention est conclue pour {{duree}}. Elle peut être résiliée pour manquement grave après mise en demeure restée sans effet.</p><h2>Article 8 — Droit applicable</h2><p>La présente convention est régie par le droit de {{droit_applicable}}.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>LE PRESTATAIRE — LE BÉNÉFICIAIRE<br/>Signature — Nom et fonction</p></div>`,
    popularity: 25,
    countriesJson: CONTRATS_COUNTRIES,
  },
  {
    code: 'aff2_cession_clientele',
    name: 'Convention de cession de clientèle commerciale',
    category: 'commercial_financier',
    price: 4500, priceMax: 9000,
    description: "Convention de cession d'une clientèle (ou d'un fonds de clientèle) attachée à une activité : désignation de la clientèle et des éléments transmis (fichiers, contrats, achalandage), prix et modalités de paiement, présentation de la clientèle par le cédant, engagement de non-rétablissement, garantie de consistance et transfert des contrats en cours.",
    fieldsJson: F([
      { key: 'cedant', label: 'Cédant (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'cessionnaire', label: 'Cessionnaire (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'activite', label: 'Activité et clientèle cédées (description)', type: 'textarea', required: true },
      { key: 'elements', label: 'Éléments transmis (fichiers clients, contrats, achalandage, marque…)', type: 'textarea', required: true },
      { key: 'prix', label: 'Prix de cession (en chiffres et en lettres, avec devise)', type: 'text', required: true },
      { key: 'non_retablissement', label: 'Durée et territoire de l’engagement de non-rétablissement', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
      { key: 'juridiction', label: 'Juridiction compétente', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONVENTION DE CESSION DE CLIENTÈLE COMMERCIALE</h1><p>La présente convention est signée et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{cedant}} (le « Cédant »), d'une part,</p><p><strong>ET :</strong> {{cessionnaire}} (le « Cessionnaire »), d'autre part.</p><h2>Article 1 — Objet</h2><p>Le Cédant cède au Cessionnaire, qui l'accepte, la clientèle attachée à l'activité suivante : {{activite}}, avec les éléments qui s'y rattachent.</p><h2>Article 2 — Éléments transmis</h2><p>La cession comprend : {{elements}} — fichiers et données clients, contrats en cours transférables, achalandage et éléments d'exploitation nécessaires à la poursuite de la relation avec la clientèle.</p><h2>Article 3 — Prix</h2><p>La cession est consentie moyennant un prix de <strong>{{prix}}</strong>, payable selon les modalités convenues entre les parties.</p><h2>Article 4 — Présentation de la clientèle</h2><p>Le Cédant s'engage à présenter effectivement la clientèle au Cessionnaire, à faciliter le transfert des relations commerciales et à accomplir les diligences utiles à la continuité de l'activité pendant une période de transition.</p><h2>Article 5 — Non-rétablissement</h2><p>Le Cédant s'interdit de se rétablir dans une activité concurrente et de détourner la clientèle cédée pendant {{non_retablissement}}, à peine de dommages-intérêts.</p><h2>Article 6 — Garanties</h2><p>Le Cédant garantit la consistance et la réalité de la clientèle cédée, l'absence de charges ou de droits de tiers non déclarés, et la liberté de disposer des éléments transmis. Le transfert des contrats en cours s'opère sous réserve, le cas échéant, de l'accord des cocontractants.</p><h2>Article 7 — Droit applicable et différends</h2><p>La présente convention est régie par le droit de {{droit_applicable}} ; tout différend relève, à défaut d'accord amiable, des juridictions de {{juridiction}}.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>LE CÉDANT — LE CESSIONNAIRE<br/>Signature — Nom et fonction</p></div>`,
    popularity: 24,
    countriesJson: CONTRATS_COUNTRIES,
  },
  // ════════════════ FINANCEMENT, GARANTIES & RÈGLEMENT (5) ════════════════
  {
    code: 'aff2_standstill',
    name: 'Accord de standstill (statu quo / gel des poursuites)',
    category: 'commercial_financier',
    price: 4000, priceMax: 8000,
    description: "Accord de moratoire par lequel des créanciers (ou un créancier) s'engagent, pour une période déterminée, à suspendre l'exercice de leurs droits et poursuites contre un débiteur en difficulté afin de permettre la recherche d'une solution de restructuration : gel des exigibilités et des voies d'exécution, maintien des lignes, engagements du débiteur (information, non-aggravation), égalité de traitement des créanciers et conditions de fin du standstill.",
    fieldsJson: F([
      { key: 'debiteur', label: 'Débiteur / entreprise concernée (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'creanciers', label: 'Créancier(s) parties à l’accord (nom + créances, un par ligne)', type: 'textarea', required: true },
      { key: 'creances', label: 'Créances concernées par le gel (nature et montants)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de la période de standstill (en mois)', type: 'text', required: true },
      { key: 'engagements_debiteur', label: 'Engagements du débiteur (information, non-aggravation, plan…)', type: 'textarea', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>ACCORD DE STANDSTILL</h1><p>Le présent accord est signé et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{debiteur}} (le « Débiteur »), d'une part,</p><p><strong>ET :</strong> {{creanciers}} (ensemble « les Créanciers »), d'autre part.</p><h2>Préambule</h2><p>Le Débiteur connaît des difficultés financières. Les Créanciers acceptent, dans un objectif de préservation de la valeur et de recherche d'une solution consensuelle, de suspendre temporairement l'exercice de leurs droits dans les conditions ci-après.</p><h2>Article 1 — Créances concernées</h2><p>Le présent accord porte sur les créances suivantes : {{creances}}.</p><h2>Article 2 — Gel des poursuites (standstill)</h2><p>Pendant la période de standstill, chaque Créancier s'engage à : ne pas exiger le remboursement anticipé des créances gelées ; suspendre toute action en paiement, mesure conservatoire ou voie d'exécution ; ne pas se prévaloir des cas de défaut existants au titre des créances concernées ; maintenir, dans la mesure convenue, les concours et lignes en cours.</p><h2>Article 3 — Durée</h2><p>La période de standstill est de {{duree}} mois à compter de la signature, renouvelable par accord exprès des parties.</p><h2>Article 4 — Engagements du débiteur</h2><p>En contrepartie, le Débiteur s'engage à : {{engagements_debiteur}} — communiquer une information financière régulière et sincère, ne pas aggraver la situation des Créanciers, ne consentir aucune sûreté ni paiement préférentiel hors gestion courante, et coopérer de bonne foi à l'élaboration d'un plan.</p><h2>Article 5 — Égalité de traitement</h2><p>Les Créanciers signataires sont traités de manière égalitaire au prorata de leurs créances ; aucun avantage particulier ne peut être consenti à l'un d'eux sans en informer les autres.</p><h2>Article 6 — Fin du standstill</h2><p>Le standstill prend fin à son terme, en cas d'accord de restructuration, ou par anticipation en cas de manquement grave du Débiteur, d'ouverture d'une procédure collective ou de survenance d'un événement rendant la poursuite impossible. Chaque Créancier recouvre alors l'intégralité de ses droits.</p><h2>Article 7 — Confidentialité et droit applicable</h2><p>Les parties tiennent l'accord confidentiel. Il est régi par le droit de {{droit_applicable}}.</p><p class="signatures">Fait en autant d'exemplaires que de parties, le {{date_jour}}.<br/><br/>LE DÉBITEUR — LES CRÉANCIERS<br/>Signatures — Noms et fonctions</p></div>`,
    popularity: 21,
    countriesJson: OBLIGATIONS_COUNTRIES,
  },
  {
    code: 'aff2_protocole_transaction',
    name: 'Protocole transactionnel (transaction avec concessions réciproques)',
    category: 'juridique_admin',
    price: 3500, priceMax: 7000,
    description: "Protocole transactionnel réglant définitivement un litige par des concessions réciproques : rappel du différend et des positions, concessions de chaque partie (paiement, renonciations, actes à accomplir), désistement d'instance et d'action, renonciation à recours, portée extinctive et autorité de chose jugée en dernier ressort, confidentialité. Distinct d'un compromis limité à une dette ou d'un protocole de conciliation.",
    fieldsJson: F([
      { key: 'partie1', label: 'Première partie (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'partie2', label: 'Seconde partie (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'litige', label: 'Objet du litige et positions respectives des parties', type: 'textarea', required: true },
      { key: 'concessions1', label: 'Concessions de la première partie', type: 'textarea', required: true },
      { key: 'concessions2', label: 'Concessions de la seconde partie', type: 'textarea', required: true },
      { key: 'indemnite', label: 'Indemnité transactionnelle éventuelle (montant + devise + échéance)', type: 'text', required: false },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>PROTOCOLE TRANSACTIONNEL</h1><p>Le présent protocole est signé et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{partie1}} (la « Première partie »), d'une part,</p><p><strong>ET :</strong> {{partie2}} (la « Seconde partie »), d'autre part.</p><h2>Article 1 — Exposé du différend</h2><p>Les parties sont en désaccord sur les points suivants : {{litige}}. Chacune maintient sa position mais, pour mettre fin définitivement au litige et prévenir toute instance, elles ont décidé de transiger, par concessions réciproques, dans les conditions ci-après.</p><h2>Article 2 — Concessions réciproques</h2><p>2.1. La Première partie consent les concessions suivantes : {{concessions1}}.</p><p>2.2. La Seconde partie consent les concessions suivantes : {{concessions2}}.</p><p>2.3. Le cas échéant, une indemnité transactionnelle, forfaitaire et définitive, de <strong>{{indemnite}}</strong> est convenue, dont le paiement vaut solde de tout compte entre les parties au titre du litige.</p><h2>Article 3 — Désistement et renonciation</h2><p>Les parties se désistent réciproquement de toute instance et action relatives au litige et renoncent à tout recours, réclamation ou prétention, née ou à naître, ayant le même objet ou la même cause.</p><h2>Article 4 — Portée de la transaction</h2><p>Le présent protocole constitue une transaction ; il a, entre les parties, autorité de la chose jugée en dernier ressort et ne peut être attaqué pour cause d'erreur de droit ni de lésion. Il règle définitivement l'ensemble des différends visés à l'article 1.</p><h2>Article 5 — Confidentialité</h2><p>Les parties tiennent confidentiels l'existence et le contenu du présent protocole, sauf pour en assurer l'exécution ou le produire en justice.</p><h2>Article 6 — Droit applicable</h2><p>Le présent protocole est régi par le droit de {{droit_applicable}}.</p><p class="signatures">Fait en deux exemplaires originaux, un pour chaque partie, le {{date_jour}}.<br/><br/>LA PREMIÈRE PARTIE — LA SECONDE PARTIE<br/>Signature — Nom et fonction</p></div>`,
    popularity: 28,
    countriesJson: OBLIGATIONS_COUNTRIES,
  },
  {
    code: 'aff2_lettre_confort',
    name: "Lettre de confort (lettre d'intention à un créancier)",
    category: 'commercial_financier',
    price: 3000, priceMax: 6000,
    description: "Lettre de confort par laquelle une société mère manifeste à un créancier (banque, fournisseur) son soutien à une filiale débitrice : déclaration de la participation, engagements gradués (surveillance, maintien de la participation, obligation de moyens ou de faire le nécessaire pour que la filiale honore ses engagements), portée de l'engagement, durée et droit applicable. Alternative souple au cautionnement.",
    fieldsJson: F([
      { key: 'mere', label: 'Société mère émettrice (nom / société + forme + siège)', type: 'textarea', required: true },
      { key: 'creancier', label: 'Créancier destinataire (banque / fournisseur — nom + adresse)', type: 'textarea', required: true },
      { key: 'filiale', label: 'Filiale débitrice soutenue (dénomination + forme + siège + % de détention)', type: 'textarea', required: true },
      { key: 'operation', label: 'Opération concernée (crédit, ligne, marché) et montant', type: 'textarea', required: true },
      { key: 'niveau_engagement', label: 'Niveau d’engagement (surveillance / maintien de participation / obligation de faire)', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de validité de la lettre', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>LETTRE DE CONFORT</h1><p><strong>De :</strong> {{mere}} (la « Société mère »)</p><p><strong>À :</strong> {{creancier}} (le « Créancier »)</p><p>Fait le {{date_jour}}.</p><p>Madame, Monsieur,</p><p>Nous faisons référence aux relations que vous entretenez avec notre filiale {{filiale}} (la « Filiale »), et notamment à l'opération suivante : {{operation}}.</p><h2>Article 1 — Déclaration</h2><p>Nous vous confirmons détenir la participation indiquée ci-dessus dans le capital de la Filiale et avoir connaissance des engagements qu'elle contracte auprès de vous dans le cadre de l'opération visée.</p><h2>Article 2 — Engagement de la société mère</h2><p>Dans ce cadre, nous prenons à votre égard l'engagement suivant : {{niveau_engagement}}. Selon le niveau convenu, nous nous engageons notamment à exercer une surveillance de la Filiale, à maintenir notre participation pendant la durée de l'opération et à faire nos meilleurs efforts / le nécessaire pour que la Filiale dispose des moyens lui permettant de faire face à ses engagements envers vous.</p><h2>Article 3 — Portée</h2><p>La présente lettre traduit notre soutien à la Filiale dans les limites de l'engagement ci-dessus ; sa portée s'apprécie au regard des termes employés à l'article 2. Elle ne vaut engagement que dans cette mesure.</p><h2>Article 4 — Durée</h2><p>La présente lettre est valable jusqu'au {{duree}} et couvre les engagements de la Filiale nés pendant cette période au titre de l'opération visée.</p><h2>Article 5 — Droit applicable</h2><p>La présente lettre est régie par le droit de {{droit_applicable}}.</p><p>Nous vous prions d'agréer, Madame, Monsieur, l'expression de nos salutations distinguées.</p><p class="signatures">POUR LA SOCIÉTÉ MÈRE<br/>Signature — Nom et fonction</p></div>`,
    popularity: 20,
    countriesJson: OBLIGATIONS_COUNTRIES,
  },
  {
    code: 'aff2_apport_industrie',
    name: "Convention d'apport en industrie",
    category: 'commercial_financier',
    price: 3000, priceMax: 6000,
    description: "Convention constatant l'apport en industrie d'un associé qui met à la disposition de la société son travail, son savoir-faire ou ses connaissances : description des prestations apportées, parts sociales en industrie ne concourant pas à la formation du capital, droits aux bénéfices et au vote, obligation de non-concurrence et de mise à disposition effective, évaluation et durée, sort en cas de cessation.",
    fieldsJson: F([
      { key: 'societe', label: 'Société bénéficiaire (dénomination + forme + siège)', type: 'textarea', required: true },
      { key: 'apporteur', label: 'Associé apporteur en industrie (nom + domicile)', type: 'textarea', required: true },
      { key: 'prestations', label: 'Nature des prestations / savoir-faire apportés', type: 'textarea', required: true },
      { key: 'quote_part', label: 'Quote-part des bénéfices et droits de vote attribués', type: 'text', required: true },
      { key: 'duree', label: 'Durée de l’apport (en années)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>CONVENTION D'APPORT EN INDUSTRIE</h1><p>La présente convention est signée et prend effet à compter du {{date_jour}},</p><p><strong>ENTRE :</strong> {{societe}} (la « Société »), d'une part,</p><p><strong>ET :</strong> {{apporteur}} (l'« Apporteur »), d'autre part.</p><h2>Article 1 — Objet de l'apport</h2><p>L'Apporteur apporte à la Société son industrie, c'est-à-dire son travail, ses connaissances techniques et son savoir-faire, consistant en : {{prestations}}. Cet apport en industrie ne concourt pas à la formation du capital social.</p><h2>Article 2 — Mise à disposition effective</h2><p>L'Apporteur s'engage à exercer effectivement et personnellement l'activité apportée, à y consacrer le temps et le soin nécessaires et à faire bénéficier la Société des gains qu'il pourrait réaliser dans ce domaine.</p><h2>Article 3 — Droits de l'apporteur</h2><p>En contrepartie, l'Apporteur reçoit des parts en industrie lui conférant une quote-part de {{quote_part}} dans les bénéfices, dans le boni de liquidation et dans les droits de vote, dans les conditions prévues par les statuts. Ces parts sont incessibles.</p><h2>Article 4 — Contribution aux pertes</h2><p>L'Apporteur contribue aux pertes dans la même proportion que sa part de bénéfices, sauf stipulation statutaire contraire, sans que cette contribution ne puisse porter atteinte au caractère personnel de son apport.</p><h2>Article 5 — Non-concurrence</h2><p>Pendant la durée de l'apport, l'Apporteur s'interdit d'exercer, pour son compte ou celui d'un tiers, une activité concurrente de celle qu'il apporte à la Société.</p><h2>Article 6 — Durée et cessation</h2><p>L'apport est consenti pour {{duree}} an(s). En cas d'incapacité durable, de décès ou de cessation d'activité de l'Apporteur, les parts en industrie sont annulées et l'apport prend fin, sans remboursement.</p><h2>Article 7 — Droit applicable</h2><p>La présente convention est régie par le droit de {{droit_applicable}}.</p><p class="signatures">Fait en deux exemplaires originaux, le {{date_jour}}.<br/><br/>LA SOCIÉTÉ — L'APPORTEUR<br/>Signature — Nom et fonction</p></div>`,
    popularity: 19,
    countriesJson: SOCIETES_COUNTRIES,
  },
  {
    code: 'aff2_term_sheet',
    name: "Term sheet (feuille de conditions d'investissement)",
    category: 'commercial_financier',
    price: 4000, priceMax: 8000,
    description: "Feuille de conditions synthétisant les principaux termes d'une opération d'investissement en capital (levée de fonds) avant la documentation définitive : valorisation pre/post-money, montant investi et instruments (actions, obligations convertibles), gouvernance et droit d'information, clauses de liquidation préférentielle, anti-dilution, préemption, sortie conjointe et forcée, exclusivité et confidentialité, caractère non contraignant hors clauses expressément fermes.",
    fieldsJson: F([
      { key: 'societe', label: 'Société cible (dénomination + forme + siège)', type: 'textarea', required: true },
      { key: 'investisseur', label: 'Investisseur (nom / fonds + forme + siège)', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant de l’investissement (avec devise)', type: 'text', required: true },
      { key: 'valorisation', label: 'Valorisation pre-money retenue (avec devise)', type: 'text', required: true },
      { key: 'instrument', label: 'Instrument souscrit (actions de préférence, obligations convertibles…)', type: 'textarea', required: true },
      { key: 'gouvernance', label: 'Droits de gouvernance et d’information demandés', type: 'textarea', required: true },
      { key: 'duree_exclusivite', label: 'Durée d’exclusivité des négociations (en semaines)', type: 'text', required: true },
      { key: 'droit_applicable', label: 'Droit applicable', type: 'text', required: true },
    ]),
    body: `<div class="contrat"><h1>TERM SHEET — FEUILLE DE CONDITIONS D'INVESTISSEMENT</h1><p>Établie le {{date_jour}} entre :</p><p><strong>La Société :</strong> {{societe}} ;</p><p><strong>L'Investisseur :</strong> {{investisseur}}.</p><p>La présente feuille de conditions (« Term Sheet ») résume les principaux termes de l'investissement envisagé. Sous réserve de l'article 8, elle n'a pas de valeur contraignante.</p><h2>Article 1 — Investissement</h2><p>L'Investisseur envisage d'investir un montant de <strong>{{montant}}</strong> dans la Société, sur la base d'une valorisation pre-money de {{valorisation}}.</p><h2>Article 2 — Instrument</h2><p>L'investissement serait réalisé par souscription de : {{instrument}}.</p><h2>Article 3 — Gouvernance et information</h2><p>L'Investisseur bénéficierait des droits suivants : {{gouvernance}} — représentation aux organes, droit d'information renforcé et droits de veto sur les décisions significatives.</p><h2>Article 4 — Protection de l'investisseur</h2><p>La documentation prévoirait : une liquidation préférentielle en cas de cession ou de liquidation ; une protection anti-dilution ; un droit de préemption sur les titres ; des clauses de sortie conjointe (tag-along) et de sortie forcée (drag-along).</p><h2>Article 5 — Conditions</h2><p>La réalisation serait subordonnée à un audit satisfaisant, à l'obtention des autorisations nécessaires et à la signature d'un pacte d'associés et de la documentation définitive.</p><h2>Article 6 — Calendrier</h2><p>Les parties s'efforceront de finaliser la documentation dans les meilleurs délais après la présente Term Sheet.</p><h2>Article 7 — Absence de force obligatoire</h2><p>Les articles 1 à 6 expriment une simple intention et n'engagent pas les parties à réaliser l'opération avant la signature de la documentation définitive.</p><h2>Article 8 — Dispositions contraignantes</h2><p>Sont en revanche fermes : <strong>(i)</strong> l'exclusivité de négociation consentie à l'Investisseur pendant {{duree_exclusivite}} semaines ; <strong>(ii)</strong> la confidentialité des discussions ; <strong>(iii)</strong> la prise en charge par chaque partie de ses propres frais ; <strong>(iv)</strong> la loi applicable, à savoir le droit de {{droit_applicable}}.</p><p class="signatures">Bon pour accord, le {{date_jour}}.<br/><br/>LA SOCIÉTÉ — L'INVESTISSEUR<br/>Signature — Nom et fonction</p></div>`,
    popularity: 27,
    countriesJson: SOCIETES_COUNTRIES,
  },
];

async function main() {
  let created = 0;
  let updated = 0;
  const byCategory: Record<string, number> = {};

  for (const t of templates) {
    const data = {
      code: t.code,
      name: t.name,
      category: t.category,
      description: t.description,
      price: t.price,
      priceMax: t.priceMax,
      fieldsJson: t.fieldsJson,
      body: t.body,
      popularity: t.popularity,
      countriesJson: t.countriesJson ?? null,
    };
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: data, create: data });
    if (existing) updated += 1; else created += 1;
    byCategory[t.category] = (byCategory[t.category] ?? 0) + 1;
  }

  const total = await prisma.documentTemplate.count();
  const withCountries = templates.filter((t) => t.countriesJson).length;

  console.log('✅ Seed Drive4 Affaires (passe profonde n°3) terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   Variantes pays (countriesJson) : ${withCountries} templates`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
