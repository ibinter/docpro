import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 templates RH Stratégique / DRH ──
  {
    code: 'drh_remuneration_globale',
    name: "Politique de Rémunération Globale (Total Rewards)",
    category: 'rh_emploi', price: 12000, priceMax: 36000,
    description: "Politique complète de rémunération globale couvrant salaire fixe, variable, avantages en nature et reconnaissance non-financière selon les pratiques OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
      {key:'dg_nom',label:"Nom du Directeur Général",type:'text',required:true},
      {key:'drh_nom',label:"Nom du DRH",type:'text',required:true},
      {key:'effectif',label:"Effectif concerné",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE RÉMUNÉRATION GLOBALE</h1><h2>TOTAL REWARDS</h2><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><p><strong>Directeur Général :</strong> {{dg_nom}}</p><p><strong>DRH :</strong> {{drh_nom}}</p><h2>1. OBJET ET CHAMP D'APPLICATION</h2><p>La présente politique de rémunération globale définit les principes, règles et pratiques régissant l'ensemble des éléments de rémunération et avantages accordés aux collaborateurs de {{entreprise}}, en conformité avec le droit du travail en vigueur et les usages OHADA.</p><h2>2. COMPOSANTES DE LA RÉMUNÉRATION GLOBALE</h2><h3>2.1 Rémunération fixe</h3><p>Le salaire de base est déterminé en fonction de la classification du poste, des responsabilités exercées, de l'expérience et du marché de référence.</p><h3>2.2 Rémunération variable</h3><p>Des primes et bonus peuvent être attribués en fonction des performances individuelles et collectives.</p><h3>2.3 Avantages en nature et périphériques</h3><p>Véhicule de fonction, logement, couverture santé, prévoyance et retraite complémentaire.</p><h2>3. PRINCIPES DIRECTEURS</h2><p>Équité interne, compétitivité externe, performance et transparence constituent les piliers de cette politique.</p><p><strong>Effectif concerné :</strong> {{effectif}}</p></div>`
  },
  {
    code: 'drh_grille_salaires',
    name: "Accord de Grille de Salaires et Classifications",
    category: 'rh_emploi', price: 10000, priceMax: 28000,
    description: "Grille de classification des emplois et barème des salaires minima par catégorie professionnelle, conforme aux conventions collectives locales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'secteur',label:"Secteur d'activité",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'smig_reference',label:"SMIG de référence (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GRILLE DE SALAIRES ET CLASSIFICATIONS</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Secteur :</strong> {{secteur}}</p><p><strong>Date :</strong> {{date_signature}}</p><h2>1. CHAMP D'APPLICATION</h2><p>Le présent accord s'applique à l'ensemble du personnel de {{entreprise}} opérant dans le secteur {{secteur}}.</p><h2>2. CLASSIFICATIONS PROFESSIONNELLES</h2><p>Les emplois sont classifiés en catégories selon le niveau de qualification, de responsabilité et d'autonomie requis.</p><h2>3. GRILLE DE SALAIRES</h2><p>Le SMIG de référence est fixé à {{smig_reference}} FCFA. Les salaires minima par catégorie sont déterminés en application de coefficients multiplicateurs.</p><h2>4. RÉVISION</h2><p>La grille est révisable annuellement, en tenant compte de l'évolution du coût de la vie et des résultats de l'entreprise.</p></div>`
  },
  {
    code: 'drh_primes_bonus',
    name: "Accord de Politique de Primes et Bonus Annuels",
    category: 'rh_emploi', price: 9000, priceMax: 24000,
    description: "Politique encadrant l'attribution des primes de performance, bonus annuels et gratifications exceptionnelles pour les salariés.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'annee',label:"Année de référence",type:'text',required:true},
      {key:'budget_prime',label:"Enveloppe budgétaire (FCFA)",type:'text',required:true},
      {key:'date_versement',label:"Date de versement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE POLITIQUE DE PRIMES ET BONUS ANNUELS</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Année :</strong> {{annee}}</p><h2>1. OBJET</h2><p>La présente politique définit les conditions d'attribution, de calcul et de versement des primes et bonus annuels au sein de {{entreprise}}.</p><h2>2. TYPES DE PRIMES</h2><p>Prime de performance individuelle, prime collective liée aux résultats, gratification de fin d'année, prime d'ancienneté.</p><h2>3. CRITÈRES D'ATTRIBUTION</h2><p>L'attribution repose sur l'évaluation de la performance individuelle et les résultats globaux de l'entreprise pour l'année {{annee}}.</p><h2>4. MODALITÉS DE VERSEMENT</h2><p>L'enveloppe globale de {{budget_prime}} FCFA sera versée le {{date_versement}}.</p></div>`
  },
  {
    code: 'drh_vehicule_fonction',
    name: "Accord de Politique de Véhicule de Fonction",
    category: 'rh_emploi', price: 7000, priceMax: 20000,
    description: "Politique définissant les conditions d'attribution, d'utilisation et de gestion des véhicules de fonction mis à disposition des cadres.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'categorie_beneficiaires',label:"Catégories bénéficiaires",type:'text',required:true},
      {key:'plafond_vehicule',label:"Plafond valeur véhicule (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE POLITIQUE DE VÉHICULE DE FONCTION</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. BÉNÉFICIAIRES</h2><p>Le bénéfice d'un véhicule de fonction est réservé aux : {{categorie_beneficiaires}}.</p><h2>2. DOTATION</h2><p>Le plafond de valeur du véhicule est fixé à {{plafond_vehicule}} FCFA selon la catégorie.</p><h2>3. CONDITIONS D'UTILISATION</h2><p>Le véhicule est mis à disposition à titre professionnel et peut être utilisé à titre personnel dans des limites définies.</p><h2>4. OBLIGATIONS DU BÉNÉFICIAIRE</h2><p>Entretien courant, respect des règles de conduite, déclaration des sinistres, restitution en bon état.</p></div>`
  },
  {
    code: 'drh_logement_fonction',
    name: "Accord de Politique de Logement de Fonction",
    category: 'rh_emploi', price: 8000, priceMax: 22000,
    description: "Politique d'attribution et de gestion des logements de fonction pour les cadres dirigeants et expatriés.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'type_logement',label:"Type de logement (villa/appartement)",type:'text',required:true},
      {key:'plafond_loyer',label:"Plafond loyer mensuel (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE POLITIQUE DE LOGEMENT DE FONCTION</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. OBJET</h2><p>La présente politique définit les conditions d'attribution d'un logement de fonction de type {{type_logement}} aux cadres dirigeants de {{entreprise}}.</p><h2>2. PLAFOND ET CHARGES</h2><p>Le loyer mensuel pris en charge est plafonné à {{plafond_loyer}} FCFA. Les charges courantes (eau, électricité) font l'objet d'une prise en charge partielle définie en annexe.</p><h2>3. CONDITIONS D'OCCUPATION</h2><p>Le logement est attribué à titre professionnel. Sa jouissance cesse à la date de fin de fonctions.</p><h2>4. FISCALITÉ</h2><p>L'avantage en nature est déclaré et soumis aux cotisations sociales et impôts applicables.</p></div>`
  },
  {
    code: 'drh_frais_representation',
    name: "Accord de Politique de Frais de Représentation",
    category: 'rh_emploi', price: 6000, priceMax: 16000,
    description: "Politique encadrant l'allocation et le remboursement des frais de représentation pour les fonctions dirigeantes et commerciales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'plafond_mensuel',label:"Plafond mensuel (FCFA)",type:'text',required:true},
      {key:'justificatif_requis',label:"Seuil justificatif (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE POLITIQUE DE FRAIS DE REPRÉSENTATION</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. OBJET ET BÉNÉFICIAIRES</h2><p>La présente politique encadre le remboursement des frais de représentation engagés dans l'intérêt de {{entreprise}}.</p><h2>2. PLAFONDS</h2><p>Le plafond mensuel de remboursement est fixé à {{plafond_mensuel}} FCFA par bénéficiaire.</p><h2>3. JUSTIFICATIFS</h2><p>Tout frais supérieur à {{justificatif_requis}} FCFA doit être justifié par une facture ou reçu nominatif mentionnant la nature et l'objet de la dépense.</p><h2>4. PROCÉDURE DE REMBOURSEMENT</h2><p>La demande de remboursement est soumise mensuellement au service comptabilité accompagnée des pièces justificatives.</p></div>`
  },
  {
    code: 'drh_voyage_deplacement',
    name: "Accord de Politique de Voyage et Déplacements Professionnels",
    category: 'rh_emploi', price: 7000, priceMax: 18000,
    description: "Politique complète régissant les voyages d'affaires, déplacements professionnels, per diem et remboursement de frais de mission.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'per_diem_local',label:"Per diem déplacement local (FCFA/jour)",type:'text',required:true},
      {key:'per_diem_international',label:"Per diem déplacement international (USD/jour)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE POLITIQUE DE VOYAGE ET DÉPLACEMENTS PROFESSIONNELS</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. CHAMP D'APPLICATION</h2><p>La présente politique s'applique à tout déplacement professionnel effectué pour le compte de {{entreprise}}.</p><h2>2. AUTORISATION PRÉALABLE</h2><p>Tout voyage doit faire l'objet d'un ordre de mission préalablement signé par le responsable hiérarchique.</p><h2>3. PER DIEM</h2><p>Le per diem journalier est fixé à {{per_diem_local}} FCFA pour les déplacements locaux et {{per_diem_international}} USD pour les déplacements internationaux.</p><h2>4. TRANSPORT ET HÉBERGEMENT</h2><p>Les billets d'avion et frais d'hôtel sont pris en charge sur présentation des justificatifs, dans le respect des standards définis par catégorie.</p></div>`
  },
  {
    code: 'drh_teletravail',
    name: "Accord de Charte de Télétravail",
    category: 'rh_emploi', price: 8000, priceMax: 20000,
    description: "Charte encadrant le télétravail régulier et occasionnel, les droits et obligations des télétravailleurs et les modalités de contrôle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'jours_teletravail',label:"Nombre de jours de télétravail par semaine",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
      {key:'materiel_fourni',label:"Matériel fourni par l'entreprise",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>CHARTE DE TÉLÉTRAVAIL</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. OBJET ET DÉFINITION</h2><p>Le télétravail désigne toute forme d'organisation du travail dans laquelle un travail qui aurait pu être exécuté dans les locaux de {{entreprise}} est effectué hors de ces locaux, de façon volontaire, en utilisant les technologies de l'information et de la communication.</p><h2>2. MODALITÉS</h2><p>Le télétravail est autorisé à hauteur de {{jours_teletravail}} jour(s) par semaine, selon les postes éligibles définis en annexe.</p><h2>3. ÉQUIPEMENT</h2><p>L'entreprise met à disposition : {{materiel_fourni}}. Le télétravailleur doit disposer d'une connexion internet fiable.</p><h2>4. DROITS ET OBLIGATIONS</h2><p>Le télétravailleur bénéficie des mêmes droits que le salarié en présentiel. Il s'engage à respecter les horaires convenus et la confidentialité des informations.</p></div>`
  },
  {
    code: 'drh_formation_competences',
    name: "Accord de Politique de Formation et Développement des Compétences",
    category: 'rh_emploi', price: 9000, priceMax: 24000,
    description: "Politique de formation professionnelle continue incluant le plan de formation, le budget, les modalités d'accès et le suivi des compétences.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 84,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'budget_formation',label:"Budget formation annuel (FCFA)",type:'text',required:true},
      {key:'heures_formation',label:"Heures de formation par an et par salarié",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE POLITIQUE DE FORMATION ET DÉVELOPPEMENT DES COMPÉTENCES</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. OBJET</h2><p>La présente politique vise à garantir le développement permanent des compétences des collaborateurs de {{entreprise}}, en adéquation avec les besoins stratégiques de l'entreprise.</p><h2>2. BUDGET ET INDICATEURS</h2><p>Le budget annuel consacré à la formation est de {{budget_formation}} FCFA, soit un minimum de {{heures_formation}} heures de formation par salarié et par an.</p><h2>3. PLAN DE FORMATION</h2><p>Un plan de formation annuel est élaboré sur la base des entretiens professionnels, des besoins identifiés par les managers et des orientations stratégiques.</p><h2>4. ACCÈS ET MODALITÉS</h2><p>Les formations peuvent être réalisées en présentiel, à distance ou en situation de travail. Tout salarié peut faire une demande de formation dans le cadre de son entretien annuel.</p></div>`
  },
  {
    code: 'drh_mobilite_internationale',
    name: "Accord de Politique de Mobilité Internationale (Expatriation)",
    category: 'rh_emploi', price: 14000, priceMax: 40000,
    description: "Politique complète de mobilité internationale couvrant les conditions d'expatriation, packages, retour et réintégration.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'zones_expatriation',label:"Zones d'expatriation couvertes",type:'text',required:true},
      {key:'prime_expatriation',label:"Prime d'expatriation (% du salaire)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE POLITIQUE DE MOBILITÉ INTERNATIONALE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Zones couvertes :</strong> {{zones_expatriation}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. OBJET</h2><p>La présente politique définit les conditions de mobilité internationale des collaborateurs de {{entreprise}} dans les zones : {{zones_expatriation}}.</p><h2>2. PACKAGE D'EXPATRIATION</h2><p>Le package comprend : salaire de base maintenu, prime d'expatriation de {{prime_expatriation}}% du salaire brut, logement de fonction, véhicule, couverture santé internationale, frais de scolarité des enfants.</p><h2>3. PROTECTION SOCIALE</h2><p>Le salarié expatrié bénéficie d'une couverture sociale conforme à la convention bilatérale applicable ou, à défaut, d'une assurance internationale.</p><h2>4. RETOUR ET RÉINTÉGRATION</h2><p>À l'issue de la mission, le salarié est réintégré dans un poste équivalent ou supérieur à celui qu'il occupait avant son départ.</p></div>`
  },
  {
    code: 'drh_detachement_etranger',
    name: "Contrat de Détachement à l'Étranger",
    category: 'rh_emploi', price: 12000, priceMax: 32000,
    description: "Contrat formalisant le détachement temporaire d'un salarié à l'étranger, précisant les conditions de travail, de rémunération et de protection sociale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'salarié',label:"Nom et prénom du salarié",type:'text',required:true},
      {key:'pays_accueil',label:"Pays d'accueil",type:'text',required:true},
      {key:'duree_detachement',label:"Durée du détachement",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DÉTACHEMENT À L'ÉTRANGER</h1><p><strong>Salarié :</strong> {{salarié}}</p><p><strong>Pays d'accueil :</strong> {{pays_accueil}}</p><p><strong>Durée :</strong> {{duree_detachement}}</p><p><strong>Date de début :</strong> {{date_debut}}</p><h2>1. OBJET DU DÉTACHEMENT</h2><p>Le salarié {{salarié}} est détaché temporairement auprès de l'entité partenaire au {{pays_accueil}} pour une durée de {{duree_detachement}} à compter du {{date_debut}}.</p><h2>2. CONDITIONS DE TRAVAIL</h2><p>Pendant le détachement, le salarié reste lié par son contrat de travail initial. Il exerce ses fonctions selon les directives de l'entité d'accueil tout en restant soumis au droit disciplinaire de l'entreprise d'origine.</p><h2>3. RÉMUNÉRATION</h2><p>La rémunération est maintenue et complétée d'indemnités de détachement conformément à la politique de mobilité internationale.</p><h2>4. FIN DU DÉTACHEMENT</h2><p>À l'issue du détachement, le salarié retrouve son poste d'origine ou un poste équivalent.</p></div>`
  },
  {
    code: 'drh_retraite_complementaire',
    name: "Accord de Politique de Retraite Complémentaire (CIMA)",
    category: 'rh_emploi', price: 10000, priceMax: 28000,
    description: "Politique de retraite complémentaire volontaire conforme aux dispositions du Code CIMA, définissant les cotisations et droits des bénéficiaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'assureur',label:"Compagnie d'assurance (CIMA)",type:'text',required:true},
      {key:'taux_cotisation',label:"Taux de cotisation employeur (%)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE POLITIQUE DE RETRAITE COMPLÉMENTAIRE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Assureur :</strong> {{assureur}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. OBJET</h2><p>La présente politique définit le régime de retraite complémentaire mis en place par {{entreprise}} auprès de {{assureur}}, conformément aux dispositions du Code CIMA.</p><h2>2. BÉNÉFICIAIRES ET ADHÉSION</h2><p>Le régime est ouvert à l'ensemble des salariés permanents ayant au moins 6 mois d'ancienneté. L'adhésion est obligatoire.</p><h2>3. COTISATIONS</h2><p>L'employeur prend en charge {{taux_cotisation}}% de la rémunération brute. Le salarié peut effectuer des versements volontaires supplémentaires.</p><h2>4. PRESTATIONS</h2><p>Les droits constitués sont convertibles en rente viagère ou en capital au départ à la retraite selon les options définies au contrat groupe.</p></div>`
  },
  {
    code: 'drh_prevoyance_complementaire',
    name: "Accord de Politique de Prévoyance Complémentaire (Décès-Invalidité)",
    category: 'rh_emploi', price: 9000, priceMax: 24000,
    description: "Politique de prévoyance complémentaire couvrant les risques décès, invalidité permanente et incapacité temporaire de travail.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'assureur',label:"Compagnie d'assurance",type:'text',required:true},
      {key:'capital_deces',label:"Capital décès (multiple du salaire annuel)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE POLITIQUE DE PRÉVOYANCE COMPLÉMENTAIRE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Assureur :</strong> {{assureur}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. GARANTIES</h2><p>Le régime de prévoyance complémentaire couvre les risques suivants : décès toutes causes, invalidité permanente totale ou partielle, incapacité temporaire de travail.</p><h2>2. CAPITAL DÉCÈS</h2><p>En cas de décès, un capital de {{capital_deces}} fois le salaire annuel brut est versé aux bénéficiaires désignés.</p><h2>3. INVALIDITÉ</h2><p>En cas d'invalidité permanente, une rente proportionnelle au taux d'invalidité reconnu est servie jusqu'à l'âge de la retraite.</p><h2>4. FINANCEMENT</h2><p>Les cotisations sont réparties entre l'employeur et le salarié selon les termes du contrat groupe souscrit auprès de {{assureur}}.</p></div>`
  },
  {
    code: 'drh_couverture_maladie',
    name: "Accord de Politique de Couverture Maladie Complémentaire",
    category: 'rh_emploi', price: 8000, priceMax: 22000,
    description: "Politique de mutuelle santé complémentaire définissant les niveaux de garanties, les plafonds de remboursement et les modalités d'adhésion.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'organisme_assureur',label:"Organisme assureur / mutuelle",type:'text',required:true},
      {key:'part_employeur',label:"Part employeur (%)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE POLITIQUE DE COUVERTURE MALADIE COMPLÉMENTAIRE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Organisme :</strong> {{organisme_assureur}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. OBJET</h2><p>La présente politique instaure une couverture maladie complémentaire au régime obligatoire CNPS/AMU au bénéfice des salariés et ayants droit de {{entreprise}}.</p><h2>2. BÉNÉFICIAIRES</h2><p>L'adhésion est obligatoire pour l'ensemble des salariés. Elle peut être étendue au conjoint et aux enfants à charge.</p><h2>3. FINANCEMENT</h2><p>L'employeur prend en charge {{part_employeur}}% de la cotisation. Le solde est prélevé sur le salaire du salarié.</p><h2>4. GARANTIES</h2><p>Les garanties couvrent les frais d'hospitalisation, de soins ambulatoires, de pharmacie, d'optique et de maternité selon les tableaux de prestations définis en annexe.</p></div>`
  },
  {
    code: 'drh_conges_speciaux',
    name: "Accord de Politique de Congés Spéciaux",
    category: 'rh_emploi', price: 6000, priceMax: 16000,
    description: "Politique définissant les congés pour événements familiaux (mariage, décès, naissance) et autres congés spéciaux accordés par l'entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'jours_mariage',label:"Jours de congé mariage",type:'text',required:true},
      {key:'jours_naissance',label:"Jours de congé naissance",type:'text',required:true},
      {key:'jours_deces',label:"Jours de congé décès (parent proche)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE POLITIQUE DE CONGÉS SPÉCIAUX</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><h2>1. MARIAGE</h2><p>Le salarié bénéficie de {{jours_mariage}} jours ouvrables de congé exceptionnel pour son propre mariage, sur présentation d'un justificatif.</p><h2>2. NAISSANCE ET ADOPTION</h2><p>Le salarié bénéficie de {{jours_naissance}} jours ouvrables à l'occasion de chaque naissance ou adoption d'un enfant.</p><h2>3. DÉCÈS</h2><p>En cas de décès d'un parent proche (conjoint, enfant, père, mère), le salarié bénéficie de {{jours_deces}} jours ouvrables de congé exceptionnel.</p><h2>4. MODALITÉS</h2><p>Ces congés doivent être pris dans les délais raisonnables suivant l'événement et sont accordés sur présentation d'un document justificatif.</p></div>`
  },
  {
    code: 'drh_reglement_interieur',
    name: "Règlement Intérieur d'Entreprise (Version Complète)",
    category: 'rh_emploi', price: 15000, priceMax: 40000,
    description: "Règlement intérieur complet conforme au Code du travail OHADA, couvrant discipline, hygiène, sécurité, relations au travail et sanctions.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true},
      {key:'date_application',label:"Date d'application",type:'date',required:true},
      {key:'dg_nom',label:"Nom du Directeur Général",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT INTÉRIEUR</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Siège :</strong> {{siege_social}}</p><p><strong>Date d'application :</strong> {{date_application}}</p><h2>PRÉAMBULE</h2><p>Le présent règlement intérieur est établi conformément aux dispositions du Code du travail applicable. Il s'applique à l'ensemble du personnel de {{entreprise}}.</p><h2>TITRE I – HORAIRES ET ORGANISATION DU TRAVAIL</h2><p>Les horaires de travail sont fixés par la direction. Tout retard ou absence doit être signalé au responsable hiérarchique.</p><h2>TITRE II – HYGIÈNE ET SÉCURITÉ</h2><p>Le personnel est tenu de respecter les consignes d'hygiène et de sécurité. Le port des équipements de protection individuelle est obligatoire dans les zones concernées.</p><h2>TITRE III – DISCIPLINE</h2><p>Tout manquement aux obligations professionnelles peut faire l'objet de sanctions disciplinaires graduées selon la gravité de la faute.</p><h2>TITRE IV – PROCÉDURE DISCIPLINAIRE</h2><p>Avant toute sanction, le salarié est convoqué à un entretien préalable et peut se faire assister.</p><p><strong>Fait par :</strong> {{dg_nom}}</p></div>`
  },
  {
    code: 'drh_code_conduite',
    name: "Accord de Code de Conduite et Éthique des Affaires",
    category: 'rh_emploi', price: 10000, priceMax: 28000,
    description: "Code de conduite et d'éthique professionnelle définissant les comportements attendus, les conflits d'intérêts et les règles de bonne gouvernance.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'groupe',label:"Groupe d'appartenance (le cas échéant)",type:'text',required:false},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'responsable_conformite',label:"Responsable conformité / compliance officer",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CODE DE CONDUITE ET ÉTHIQUE DES AFFAIRES</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'adoption :</strong> {{date_adoption}}</p><h2>1. PRINCIPES FONDAMENTAUX</h2><p>{{entreprise}} s'engage à mener ses activités dans le respect des lois, des normes éthiques les plus élevées et des droits humains fondamentaux.</p><h2>2. INTÉGRITÉ ET HONNÊTETÉ</h2><p>Chaque collaborateur est tenu d'agir avec honnêteté, intégrité et professionnalisme dans toutes ses interactions professionnelles.</p><h2>3. CONFLITS D'INTÉRÊTS</h2><p>Tout collaborateur doit éviter les situations pouvant créer un conflit entre ses intérêts personnels et ceux de {{entreprise}}. Tout conflit potentiel doit être déclaré au responsable conformité.</p><h2>4. PROTECTION DES ACTIFS</h2><p>Les actifs et ressources de l'entreprise doivent être utilisés exclusivement à des fins professionnelles.</p><p><strong>Responsable conformité :</strong> {{responsable_conformite}}</p></div>`
  },
  {
    code: 'drh_anti_corruption',
    name: "Accord de Politique Anti-Corruption et Conformité",
    category: 'rh_emploi', price: 12000, priceMax: 32000,
    description: "Politique de prévention de la corruption et de la fraude conforme aux conventions internationales anticorruption applicables en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'compliance_officer',label:"Compliance Officer",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
      {key:'canal_alerte',label:"Canal d'alerte éthique",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE ANTI-CORRUPTION ET CONFORMITÉ</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Compliance Officer :</strong> {{compliance_officer}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. OBJET ET PORTÉE</h2><p>La présente politique a pour objet de prévenir et détecter tout acte de corruption, de fraude ou de malversation au sein de {{entreprise}} et dans ses relations avec des tiers.</p><h2>2. INTERDICTIONS</h2><p>Il est strictement interdit d'offrir, de promettre, de donner, de solliciter ou d'accepter, directement ou indirectement, un avantage indu à toute personne en vue d'obtenir un traitement favorable.</p><h2>3. PROCÉDURE D'ALERTE</h2><p>Tout collaborateur ayant connaissance d'un acte de corruption peut le signaler confidentiellement via : {{canal_alerte}}.</p><h2>4. SANCTIONS</h2><p>Tout manquement à la présente politique expose son auteur à des sanctions disciplinaires pouvant aller jusqu'au licenciement pour faute grave, sans préjudice des poursuites pénales.</p></div>`
  },
  {
    code: 'drh_cadeaux_avantages',
    name: "Accord de Politique Cadeaux et Avantages (Anti-Corruption)",
    category: 'rh_emploi', price: 7000, priceMax: 18000,
    description: "Politique encadrant l'offre et la réception de cadeaux, hospitalités et avantages divers dans le cadre des relations d'affaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'plafond_cadeau',label:"Plafond valeur cadeau acceptable (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE CADEAUX ET AVANTAGES</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. PRINCIPES</h2><p>La présente politique encadre les cadeaux, hospitalités et avantages dans le cadre des relations d'affaires de {{entreprise}}.</p><h2>2. CADEAUX AUTORISÉS</h2><p>Les cadeaux d'une valeur inférieure à {{plafond_cadeau}} FCFA peuvent être acceptés ou offerts à des fins de courtoisie commerciale, à condition qu'ils ne créent aucune obligation réciproque.</p><h2>3. CADEAUX INTERDITS</h2><p>Les espèces, cartes-cadeaux, actions ou tout avantage pouvant être perçu comme une tentative d'influence sont strictement interdits.</p><h2>4. DÉCLARATION</h2><p>Tout cadeau reçu dont la valeur dépasse le seuil défini doit être déclaré au compliance officer et, le cas échéant, remis à l'entreprise.</p></div>`
  },
  {
    code: 'drh_procedure_disciplinaire',
    name: "Accord de Procédure Disciplinaire Interne",
    category: 'rh_emploi', price: 9000, priceMax: 24000,
    description: "Procédure disciplinaire interne définissant les niveaux de sanctions, les droits de la défense et les délais de prescription.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'autorite_disciplinaire',label:"Autorité disciplinaire",type:'text',required:true},
      {key:'delai_entretien',label:"Délai convocation entretien préalable (jours)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROCÉDURE DISCIPLINAIRE INTERNE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. CHAMP D'APPLICATION</h2><p>La présente procédure s'applique à tout manquement aux obligations professionnelles commis par un salarié de {{entreprise}}.</p><h2>2. NIVEAUX DE SANCTIONS</h2><p>Les sanctions sont graduées : avertissement écrit, mise à pied conservatoire, mise à pied disciplinaire, mutation, rétrogradation, licenciement pour faute simple ou grave.</p><h2>3. PROCÉDURE</h2><p>L'autorité disciplinaire ({{autorite_disciplinaire}}) convoque le salarié par lettre recommandée ou remise en mains propres au moins {{delai_entretien}} jours ouvrables avant l'entretien préalable.</p><h2>4. DROITS DU SALARIÉ</h2><p>Le salarié peut se faire assister lors de l'entretien par un représentant du personnel ou un conseiller de son choix. Il dispose d'un délai pour présenter ses observations.</p></div>`
  },
  {
    code: 'drh_procedure_licenciement',
    name: "Accord de Procédure de Licenciement",
    category: 'rh_emploi', price: 10000, priceMax: 28000,
    description: "Procédure interne de licenciement individuel conforme au Code du travail OHADA, définissant les étapes, délais et droits des parties.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 83,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'preavis_cadre',label:"Durée préavis cadres (mois)",type:'text',required:true},
      {key:'preavis_employe',label:"Durée préavis employés (mois)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROCÉDURE DE LICENCIEMENT</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. MOTIFS DE LICENCIEMENT</h2><p>Le licenciement peut intervenir pour motif personnel (faute simple, faute grave, faute lourde, insuffisance professionnelle) ou pour motif économique.</p><h2>2. PROCÉDURE PRÉALABLE</h2><p>Avant tout licenciement pour motif personnel, l'employeur est tenu de convoquer le salarié à un entretien préalable, de l'informer de son droit à assistance et d'observer les délais légaux.</p><h2>3. PRÉAVIS</h2><p>La durée du préavis est fixée à {{preavis_cadre}} mois pour les cadres et {{preavis_employe}} mois pour les employés et agents de maîtrise, sauf faute grave ou lourde.</p><h2>4. INDEMNITÉS</h2><p>Le salarié licencié pour motif autre que la faute grave ou lourde a droit aux indemnités légales de licenciement, calculées selon l'ancienneté et le salaire de référence.</p></div>`
  },
  {
    code: 'drh_conflits_interets',
    name: "Accord de Gestion des Conflits d'Intérêts",
    category: 'rh_emploi', price: 8000, priceMax: 20000,
    description: "Politique de prévention et de gestion des conflits d'intérêts réels, potentiels ou apparents au sein de l'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'responsable_conformite',label:"Responsable conformité",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE GESTION DES CONFLITS D'INTÉRÊTS</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. DÉFINITION</h2><p>Un conflit d'intérêts survient lorsqu'un collaborateur est en situation de devoir choisir entre ses intérêts personnels (financiers, familiaux, professionnels) et les intérêts de {{entreprise}}.</p><h2>2. SITUATIONS VISÉES</h2><p>Participation dans une entreprise concurrente, relation commerciale avec un proche, exercice d'une activité complémentaire non déclarée, réception d'avantages indus.</p><h2>3. OBLIGATION DE DÉCLARATION</h2><p>Tout collaborateur identifiant un conflit d'intérêts potentiel est tenu de le déclarer immédiatement à {{responsable_conformite}} et de se récuser des décisions concernées.</p><h2>4. TRAITEMENT</h2><p>La déclaration est traitée confidentiellement. Des mesures d'organisation peuvent être prises pour neutraliser le conflit.</p></div>`
  },
  {
    code: 'drh_confidentialite',
    name: "Accord de Politique de Confidentialité et Secret Professionnel",
    category: 'rh_emploi', price: 8000, priceMax: 22000,
    description: "Politique de confidentialité et de protection du secret professionnel s'appliquant à tous les collaborateurs et sous-traitants.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'duree_obligation',label:"Durée de l'obligation après départ (années)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE CONFIDENTIALITÉ ET SECRET PROFESSIONNEL</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. INFORMATIONS CONFIDENTIELLES</h2><p>Sont considérées comme confidentielles toutes les informations de nature commerciale, technique, financière, stratégique ou personnelle auxquelles le collaborateur a accès dans le cadre de ses fonctions chez {{entreprise}}.</p><h2>2. OBLIGATIONS</h2><p>Le collaborateur s'engage à ne pas divulguer, publier, communiquer ou utiliser à des fins personnelles les informations confidentielles auxquelles il a accès, que ce soit pendant ou après son contrat de travail.</p><h2>3. DURÉE</h2><p>L'obligation de confidentialité s'étend sur une période de {{duree_obligation}} années après la fin du contrat de travail.</p><h2>4. SANCTIONS</h2><p>Toute violation engage la responsabilité civile et pénale du collaborateur, sans préjudice des dommages et intérêts dus à {{entreprise}}.</p></div>`
  },
  {
    code: 'drh_gestion_performance',
    name: "Accord de Gestion de la Performance Individuelle (Entretiens Annuels)",
    category: 'rh_emploi', price: 9000, priceMax: 24000,
    description: "Politique de gestion de la performance individuelle définissant le cycle d'évaluation, les critères de notation et les entretiens annuels.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 86,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'periode_evaluation',label:"Période d'évaluation",type:'text',required:true},
      {key:'date_campagne',label:"Date de lancement de la campagne",type:'date',required:true},
      {key:'echelle_notation',label:"Échelle de notation (ex: 1-5)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE GESTION DE LA PERFORMANCE INDIVIDUELLE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Période d'évaluation :</strong> {{periode_evaluation}}</p><h2>1. OBJECTIF</h2><p>Le système d'évaluation de la performance a pour objectif d'aligner les contributions individuelles sur la stratégie de {{entreprise}}, de reconnaître les performances et d'identifier les axes de développement.</p><h2>2. CYCLE D'ÉVALUATION</h2><p>La campagne d'évaluation est lancée le {{date_campagne}}. Elle comprend : fixation des objectifs en début d'année, entretien de mi-parcours, entretien annuel d'évaluation.</p><h2>3. CRITÈRES ET NOTATION</h2><p>L'évaluation porte sur l'atteinte des objectifs quantitatifs et qualitatifs, ainsi que sur les comportements professionnels. La notation utilise l'échelle : {{echelle_notation}}.</p><h2>4. CONSÉQUENCES</h2><p>Les résultats de l'évaluation alimentent les décisions d'augmentation salariale, de promotion, de formation et de mobilité.</p></div>`
  },
  {
    code: 'drh_charte_valeurs',
    name: "Charte des Valeurs et Culture d'Entreprise",
    category: 'rh_emploi', price: 7000, priceMax: 18000,
    description: "Charte définissant les valeurs fondamentales, la vision, la mission et la culture d'entreprise pour fédérer les collaborateurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'vision',label:"Vision de l'entreprise",type:'textarea',required:true},
      {key:'valeurs',label:"Valeurs fondamentales (liste)",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DES VALEURS ET CULTURE D'ENTREPRISE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'adoption :</strong> {{date_adoption}}</p><h2>NOTRE VISION</h2><p>{{vision}}</p><h2>NOS VALEURS FONDAMENTALES</h2><p>{{valeurs}}</p><h2>NOTRE ENGAGEMENT COLLECTIF</h2><p>Chaque collaborateur de {{entreprise}} est ambassadeur de ces valeurs dans son quotidien professionnel, dans ses relations avec les clients, les partenaires et la communauté.</p><h2>VIVRE NOS VALEURS</h2><p>Les valeurs ne sont pas de simples mots. Elles guident nos décisions, nos comportements et notre façon de travailler ensemble. Elles constituent le socle de notre culture commune et le fondement de notre succès partagé.</p></div>`
  },

  // ── 25 templates Développement des Talents ──
  {
    code: 'talent_pdi',
    name: "Accord de Plan de Développement Individuel (PDI)",
    category: 'rh_emploi', price: 6000, priceMax: 16000,
    description: "Plan de développement individuel structuré pour formaliser les objectifs de carrière, les actions de formation et les étapes de progression d'un collaborateur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'collaborateur',label:"Nom et prénom du collaborateur",type:'text',required:true},
      {key:'poste',label:"Poste actuel",type:'text',required:true},
      {key:'manager',label:"Nom du manager",type:'text',required:true},
      {key:'annee',label:"Année du PDI",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT INDIVIDUEL (PDI)</h1><p><strong>Collaborateur :</strong> {{collaborateur}}</p><p><strong>Poste :</strong> {{poste}}</p><p><strong>Manager :</strong> {{manager}}</p><p><strong>Année :</strong> {{annee}}</p><h2>1. BILAN DES COMPÉTENCES</h2><p>Forces identifiées, axes d'amélioration prioritaires et compétences à développer pour atteindre les objectifs de carrière de {{collaborateur}}.</p><h2>2. OBJECTIFS DE DÉVELOPPEMENT</h2><p>Définir 2 à 3 objectifs de développement SMART pour l'année {{annee}}, alignés sur les aspirations professionnelles et les besoins de l'entreprise.</p><h2>3. ACTIONS DE DÉVELOPPEMENT</h2><p>Formations, coaching, missions transversales, projets spéciaux, lectures professionnelles, conférences, mentoring.</p><h2>4. SUIVI</h2><p>Le PDI fait l'objet d'un bilan trimestriel avec {{manager}} et est mis à jour lors de l'entretien annuel d'évaluation.</p></div>`
  },
  {
    code: 'talent_parcours_carriere',
    name: "Accord de Parcours de Carrière et Évolution",
    category: 'rh_emploi', price: 7000, priceMax: 18000,
    description: "Document formalisant les parcours de carrière possibles, les critères de promotion et les étapes d'évolution professionnelle au sein de l'entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'filiere',label:"Filière métier concernée",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARCOURS DE CARRIÈRE ET ÉVOLUTION</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Filière :</strong> {{filiere}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. OBJECTIF</h2><p>Offrir à chaque collaborateur de la filière {{filiere}} une visibilité claire sur les opportunités d'évolution et les conditions de progression au sein de {{entreprise}}.</p><h2>2. NIVEAUX ET ÉTAPES</h2><p>La filière est organisée en niveaux successifs, chacun correspondant à un profil de compétences, une expérience minimale et une grille de rémunération.</p><h2>3. CRITÈRES DE PROMOTION</h2><p>La promotion repose sur la performance soutenue sur 2 exercices consécutifs, la maîtrise des compétences requises au niveau supérieur et la disponibilité d'un poste.</p><h2>4. ENTRETIEN DE CARRIÈRE</h2><p>Un entretien de carrière dédié est organisé tous les 2 ans pour faire le point sur les aspirations et définir un plan d'action.</p></div>`
  },
  {
    code: 'talent_hauts_potentiels',
    name: "Accord de Programme de Hauts Potentiels (High Pot)",
    category: 'rh_emploi', price: 10000, priceMax: 28000,
    description: "Programme de détection et de développement accéléré des collaborateurs à fort potentiel, incluant les critères de sélection et les parcours dédiés.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'quota_highpot',label:"Quota de hauts potentiels (% de l'effectif)",type:'text',required:true},
      {key:'duree_programme',label:"Durée du programme (mois)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROGRAMME DE HAUTS POTENTIELS</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date de lancement :</strong> {{date_lancement}}</p><h2>1. DÉFINITION DU HAUT POTENTIEL</h2><p>Est considéré comme haut potentiel tout collaborateur démontrant une capacité à progresser de deux niveaux hiérarchiques en moins de 5 ans et à exercer des fonctions de leader.</p><h2>2. CRITÈRES DE SÉLECTION</h2><p>Performance exceptionnelle sur les 2 derniers exercices, score de leadership élevé en assessment, capacité d'apprentissage rapide et agilité comportementale.</p><h2>3. PROGRAMME</h2><p>Le programme d'une durée de {{duree_programme}} mois comprend : coaching exécutif, formation leadership, missions projets transverses, exposition à la direction générale, networking externe.</p><h2>4. POPULATION CIBLE</h2><p>Le programme concerne {{quota_highpot}}% de l'effectif, soit les collaborateurs les plus prometteurs identifiés lors de la revue de talents annuelle.</p></div>`
  },
  {
    code: 'talent_vivier_succession',
    name: "Accord de Vivier de Succession Management",
    category: 'rh_emploi', price: 12000, priceMax: 32000,
    description: "Plan de succession pour les postes clés, définissant les viviers de successeurs potentiels et les plans de préparation associés.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'postes_cles',label:"Postes clés couverts",type:'textarea',required:true},
      {key:'date_revue',label:"Date de la revue de succession",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE SUCCESSION MANAGEMENT</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date de revue :</strong> {{date_revue}}</p><h2>1. OBJECTIF</h2><p>Garantir la continuité managériale et opérationnelle de {{entreprise}} en anticipant les départs et en préparant des successeurs pour les postes clés.</p><h2>2. POSTES CLÉS COUVERTS</h2><p>{{postes_cles}}</p><h2>3. CATÉGORIES DE SUCCESSEURS</h2><p>Successeurs immédiats (prêts dans 0-12 mois), successeurs à court terme (12-24 mois), successeurs à long terme (24-48 mois).</p><h2>4. PLANS DE PRÉPARATION</h2><p>Pour chaque successeur identifié, un plan de développement individualisé est élaboré, comprenant missions préparatoires, formations ciblées et coaching.</p></div>`
  },
  {
    code: 'talent_mentorat_interne',
    name: "Accord de Programme de Mentorat Interne",
    category: 'rh_emploi', price: 6000, priceMax: 16000,
    description: "Programme de mentorat interne formalisant la relation mentor-mentee, les engagements mutuels et le suivi du programme.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'duree_programme',label:"Durée du programme de mentorat (mois)",type:'text',required:true},
      {key:'frequence_rencontres',label:"Fréquence des rencontres",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROGRAMME DE MENTORAT INTERNE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date de lancement :</strong> {{date_lancement}}</p><h2>1. OBJECTIF DU PROGRAMME</h2><p>Le programme de mentorat interne vise à accélérer le développement des collaborateurs juniors en les mettant en relation avec des cadres expérimentés de {{entreprise}}.</p><h2>2. PAIRAGES</h2><p>Les pairages mentor-mentee sont réalisés sur la base des objectifs de développement du mentee, de la complémentarité des profils et de la disponibilité du mentor.</p><h2>3. ENGAGEMENTS MUTUELS</h2><p>Les parties s'engagent à se rencontrer {{frequence_rencontres}} pendant {{duree_programme}} mois, à respecter la confidentialité des échanges et à s'investir sincèrement dans la relation.</p><h2>4. SUIVI</h2><p>Un bilan intermédiaire et final est réalisé avec les binômes pour évaluer les apprentissages et l'atteinte des objectifs.</p></div>`
  },
  {
    code: 'talent_coaching_dirigeant',
    name: "Accord de Coaching de Dirigeant Senior",
    category: 'rh_emploi', price: 14000, priceMax: 40000,
    description: "Contrat de coaching exécutif pour dirigeants seniors, définissant les objectifs, le cadre déontologique et les modalités de la démarche.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'coache',label:"Nom du coaché",type:'text',required:true},
      {key:'coach',label:"Nom du coach",type:'text',required:true},
      {key:'duree_coaching',label:"Durée du coaching (séances)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE COACHING DE DIRIGEANT SENIOR</h1><p><strong>Coaché :</strong> {{coache}}</p><p><strong>Coach :</strong> {{coach}}</p><p><strong>Date de début :</strong> {{date_debut}}</p><h2>1. OBJECTIFS DU COACHING</h2><p>Le présent coaching vise à soutenir {{coache}} dans le développement de son leadership, la gestion de situations complexes et l'atteinte de ses objectifs de transformation personnelle et professionnelle.</p><h2>2. CADRE DÉONTOLOGIQUE</h2><p>Le coaching est fondé sur la confidentialité absolue, le respect mutuel et la liberté du coaché. Le coach s'engage à ne pas partager le contenu des séances sans accord du coaché.</p><h2>3. MODALITÉS</h2><p>Le programme comprend {{duree_coaching}} séances de coaching individuel de 90 minutes chacune.</p><h2>4. ÉVALUATION</h2><p>Un bilan est réalisé à mi-parcours et en fin de programme pour mesurer les progrès et ajuster les objectifs si nécessaire.</p></div>`
  },
  {
    code: 'talent_360_feedback',
    name: "Accord de 360 Degrés Feedback (Évaluation Multi-Sources)",
    category: 'rh_emploi', price: 8000, priceMax: 22000,
    description: "Dispositif d'évaluation 360 degrés permettant de recueillir des feedbacks de toutes les parties prenantes sur les compétences managériales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'population_evaluee',label:"Population évaluée",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement de la campagne",type:'date',required:true},
      {key:'nb_evaluateurs',label:"Nombre minimum d'évaluateurs par évalué",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DISPOSITIF 360 DEGRÉS FEEDBACK</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Population évaluée :</strong> {{population_evaluee}}</p><p><strong>Date de lancement :</strong> {{date_lancement}}</p><h2>1. OBJECTIF</h2><p>Le 360 degrés feedback est un outil de développement qui permet à chaque manager de {{entreprise}} de recevoir des feedbacks structurés de la part de ses collaborateurs, pairs, supérieurs et clients internes.</p><h2>2. PROCESSUS</h2><p>Chaque évalué identifie minimum {{nb_evaluateurs}} évaluateurs représentant différentes parties prenantes. Les feedbacks sont collectés via un questionnaire anonyme.</p><h2>3. CONFIDENTIALITÉ</h2><p>Les résultats individuels sont strictement confidentiels et partagés uniquement avec l'évalué et son coach/RH de référence.</p><h2>4. UTILISATION</h2><p>Les résultats alimentent le plan de développement individuel. Ils ne sont pas utilisés comme critère d'évaluation de performance ni comme base de décision RH.</p></div>`
  },
  {
    code: 'talent_assessment_center',
    name: "Accord d'Assessment Center de Talents",
    category: 'rh_emploi', price: 12000, priceMax: 32000,
    description: "Protocole d'assessment center pour l'évaluation des compétences et du potentiel dans le cadre de recrutements ou de promotions internes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'postes_cibles',label:"Postes ciblés par l'assessment",type:'text',required:true},
      {key:'date_session',label:"Date de la session",type:'date',required:true},
      {key:'prestataire',label:"Prestataire assessment (interne/externe)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PROTOCOLE D'ASSESSMENT CENTER</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Postes ciblés :</strong> {{postes_cibles}}</p><p><strong>Date de session :</strong> {{date_session}}</p><h2>1. OBJECTIF</h2><p>L'assessment center a pour objectif d'évaluer objectivement les compétences comportementales, managériales et techniques des candidats aux postes : {{postes_cibles}}.</p><h2>2. MÉTHODES D'ÉVALUATION</h2><p>Jeux de rôle, études de cas, mises en situation, tests psychométriques, entretiens structurés par compétences.</p><h2>3. ÉVALUATEURS</h2><p>La session est conduite par {{prestataire}} avec la participation d'observateurs formés issus de la ligne managériale de {{entreprise}}.</p><h2>4. RESTITUTION</h2><p>Un rapport individuel est remis à chaque participant dans un délai de 10 jours ouvrables après la session, accompagné d'un entretien de restitution.</p></div>`
  },
  {
    code: 'talent_onboarding',
    name: "Accord de Programme d'Intégration Nouveaux Collaborateurs (Onboarding)",
    category: 'rh_emploi', price: 7000, priceMax: 18000,
    description: "Programme structuré d'intégration des nouveaux collaborateurs, définissant les étapes, les acteurs et les indicateurs de succès de l'onboarding.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'duree_onboarding',label:"Durée du programme d'onboarding",type:'text',required:true},
      {key:'referent_rh',label:"Référent RH onboarding",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROGRAMME D'INTÉGRATION DES NOUVEAUX COLLABORATEURS</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Durée :</strong> {{duree_onboarding}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. OBJECTIF</h2><p>Assurer une intégration réussie de chaque nouveau collaborateur en lui donnant les moyens de comprendre l'entreprise, sa culture, ses outils et son rôle dans les meilleurs délais.</p><h2>2. ÉTAPES DU PROGRAMME</h2><p>Pré-onboarding (avant le premier jour), accueil le Jour J, semaine de découverte, période d'intégration opérationnelle sur {{duree_onboarding}}, bilan d'intégration à l'issue de la période d'essai.</p><h2>3. ACTEURS</h2><p>Le référent RH ({{referent_rh}}), le manager direct et un parrain/marraine désigné accompagnent le nouveau collaborateur tout au long de son intégration.</p><h2>4. ÉVALUATION</h2><p>Un entretien de bilan est réalisé à 30, 60 et 90 jours pour s'assurer de la bonne intégration et lever les éventuels obstacles.</p></div>`
  },
  {
    code: 'talent_graduate',
    name: "Accord de Programme de Graduate (Jeunes Diplômés)",
    category: 'rh_emploi', price: 8000, priceMax: 22000,
    description: "Programme de recrutement et d'intégration accélérée des jeunes diplômés de grandes écoles et universités, avec parcours de rotation et formation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'duree_programme',label:"Durée du programme graduate (mois)",type:'text',required:true},
      {key:'nb_rotations',label:"Nombre de rotations métier",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement de la promo",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROGRAMME GRADUATE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date de lancement :</strong> {{date_lancement}}</p><h2>1. OBJECTIF</h2><p>Le programme Graduate de {{entreprise}} a pour vocation d'attirer, de former et de fidéliser les meilleurs jeunes diplômés pour en faire les futurs leaders de l'entreprise.</p><h2>2. STRUCTURE DU PROGRAMME</h2><p>Programme de {{duree_programme}} mois comprenant {{nb_rotations}} rotations dans différents métiers et départements de l'entreprise, complétées par des modules de formation interne et externe.</p><h2>3. ENCADREMENT</h2><p>Chaque Graduate bénéficie d'un mentor senior, d'un suivi RH dédié et d'une exposition aux décideurs de l'entreprise.</p><h2>4. PERSPECTIVE</h2><p>À l'issue du programme, les Graduates sont affectés sur un poste de responsabilité adapté à leurs compétences et aux besoins de l'entreprise.</p></div>`
  },
  {
    code: 'talent_stage_longue_duree',
    name: "Accord de Programme de Stage de Longue Durée",
    category: 'rh_emploi', price: 5000, priceMax: 14000,
    description: "Convention de stage de longue durée (6 à 12 mois) avec programme d'apprentissage structuré et accompagnement pédagogique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'stagiaire',label:"Nom et prénom du stagiaire",type:'text',required:true},
      {key:'ecole',label:"Établissement d'enseignement",type:'text',required:true},
      {key:'date_debut',label:"Date de début du stage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE STAGE DE LONGUE DURÉE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Stagiaire :</strong> {{stagiaire}}</p><p><strong>École :</strong> {{ecole}}</p><p><strong>Date de début :</strong> {{date_debut}}</p><h2>1. OBJET</h2><p>La présente convention encadre le stage de longue durée de {{stagiaire}}, étudiant(e) à {{ecole}}, au sein de {{entreprise}}.</p><h2>2. OBJECTIFS PÉDAGOGIQUES</h2><p>Le stage vise à permettre à {{stagiaire}} de mettre en pratique ses acquis académiques, de développer ses compétences professionnelles et de découvrir l'environnement de l'entreprise.</p><h2>3. PROGRAMME</h2><p>Un programme d'apprentissage structuré est défini en concertation avec l'établissement d'enseignement. Il prévoit des missions opérationnelles progressives et des points de suivi réguliers avec le maître de stage.</p><h2>4. CONDITIONS</h2><p>Le stagiaire bénéficie d'une gratification de stage et d'un suivi académique-entreprise conjoint incluant un rapport de stage et une soutenance.</p></div>`
  },
  {
    code: 'talent_vie',
    name: "Accord de VIE (Volontaire International en Entreprise)",
    category: 'rh_emploi', price: 9000, priceMax: 24000,
    description: "Accord encadrant l'accueil et l'intégration d'un Volontaire International en Entreprise, précisant les missions, l'encadrement et les conditions.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'vie_nom',label:"Nom et prénom du VIE",type:'text',required:true},
      {key:'mission',label:"Intitulé de la mission VIE",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACCUEIL VIE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>VIE :</strong> {{vie_nom}}</p><p><strong>Mission :</strong> {{mission}}</p><p><strong>Date de début :</strong> {{date_debut}}</p><h2>1. CONTEXTE</h2><p>{{entreprise}} accueille {{vie_nom}} dans le cadre d'une mission de Volontaire International en Entreprise (VIE) sur la mission : {{mission}}.</p><h2>2. ENCADREMENT</h2><p>Un tuteur référent est désigné au sein de {{entreprise}} pour assurer l'intégration, le suivi opérationnel et le développement professionnel du VIE.</p><h2>3. MISSIONS ET LIVRABLES</h2><p>Les missions confiées sont détaillées dans la fiche de poste annexée. Des points de suivi mensuels sont organisés avec le tuteur.</p><h2>4. CONDITIONS MATÉRIELLES</h2><p>Le VIE bénéficie des conditions définies dans son contrat VIE, complétées par les avantages accordés par {{entreprise}} (équipement, accès aux locaux, participation aux événements internes).</p></div>`
  },
  {
    code: 'talent_alternance',
    name: "Accord de Programme d'Alternance Entreprise",
    category: 'rh_emploi', price: 6000, priceMax: 16000,
    description: "Accord définissant le programme d'alternance entreprise, les conditions d'accueil des alternants et les engagements pédagogiques mutuels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'alternant',label:"Nom et prénom de l'alternant",type:'text',required:true},
      {key:'ecole',label:"Établissement partenaire",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROGRAMME D'ALTERNANCE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Alternant :</strong> {{alternant}}</p><p><strong>École :</strong> {{ecole}}</p><p><strong>Date de début :</strong> {{date_debut}}</p><h2>1. OBJET</h2><p>Le présent accord formalise la politique d'alternance de {{entreprise}} et les conditions d'accueil de {{alternant}} en alternance avec {{ecole}}.</p><h2>2. TUTEUR D'ENTREPRISE</h2><p>Un tuteur expérimenté est désigné pour accompagner l'alternant dans ses missions, favoriser ses apprentissages et assurer le lien avec l'établissement de formation.</p><h2>3. MISSIONS</h2><p>Les missions confiées à l'alternant sont définies en cohérence avec son cursus de formation et permettent une montée en compétences progressive et opérationnelle.</p><h2>4. ENGAGEMENT ENTREPRISE</h2><p>{{entreprise}} s'engage à offrir à {{alternant}} un environnement d'apprentissage bienveillant, des missions valorisantes et un réel investissement dans son développement.</p></div>`
  },
  {
    code: 'talent_partenariat_ecole',
    name: "Accord de Partenariat École-Entreprise (Talent Pipeline)",
    category: 'rh_emploi', price: 9000, priceMax: 24000,
    description: "Convention de partenariat entre une entreprise et un établissement d'enseignement supérieur pour construire un vivier de talents.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'ecole',label:"Nom de l'établissement partenaire",type:'text',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat (années)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ÉCOLE-ENTREPRISE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>École :</strong> {{ecole}}</p><p><strong>Durée :</strong> {{duree_partenariat}} ans</p><p><strong>Date de signature :</strong> {{date_signature}}</p><h2>1. OBJET</h2><p>Le présent partenariat a pour objectif de construire une relation durable entre {{entreprise}} et {{ecole}} pour former et recruter les talents de demain.</p><h2>2. ENGAGEMENTS DE L'ENTREPRISE</h2><p>Accueil de stagiaires et alternants, interventions de managers en cours, financement de bourses, participation aux forums emploi, visites d'entreprise, co-construction de cas pédagogiques.</p><h2>3. ENGAGEMENTS DE L'ÉCOLE</h2><p>Accès privilégié au vivier d'étudiants, promotion des offres de l'entreprise, association aux conseils d'orientation pédagogique, co-développement de modules de formation.</p><h2>4. GOUVERNANCE</h2><p>Un comité de pilotage paritaire se réunit semestriellement pour évaluer la mise en oeuvre du partenariat et définir les priorités de l'année à venir.</p></div>`
  },
  {
    code: 'talent_reconversion',
    name: "Accord de Programme de Reconversion Professionnelle",
    category: 'rh_emploi', price: 8000, priceMax: 20000,
    description: "Programme de reconversion professionnelle interne permettant à des collaborateurs de changer de métier au sein de l'entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'collaborateur',label:"Nom du collaborateur concerné",type:'text',required:true},
      {key:'metier_cible',label:"Métier cible de la reconversion",type:'text',required:true},
      {key:'date_debut',label:"Date de début du programme",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROGRAMME DE RECONVERSION PROFESSIONNELLE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Collaborateur :</strong> {{collaborateur}}</p><p><strong>Métier cible :</strong> {{metier_cible}}</p><p><strong>Date de début :</strong> {{date_debut}}</p><h2>1. CONTEXTE ET OBJECTIF</h2><p>Le présent programme accompagne {{collaborateur}} dans une reconversion vers le métier de {{metier_cible}}, en valorisant ses compétences transférables et en comblant les écarts identifiés.</p><h2>2. PARCOURS DE RECONVERSION</h2><p>Le programme comprend une phase de bilan de compétences, un plan de formation personnalisé, une période d'immersion dans le nouveau métier et un accompagnement en situation de travail.</p><h2>3. ENGAGEMENTS</h2><p>{{entreprise}} s'engage à maintenir la rémunération pendant la période de transition. {{collaborateur}} s'engage à s'investir pleinement dans le parcours de formation et de développement.</p><h2>4. BILAN ET TITULARISATION</h2><p>Un bilan de reconversion est réalisé à l'issue du programme pour valider l'acquisition des compétences requises et officialiser la prise de fonction dans le nouveau métier.</p></div>`
  },
  {
    code: 'talent_retour_expatriation',
    name: "Accord de Programme de Retour d'Expatriation",
    category: 'rh_emploi', price: 9000, priceMax: 24000,
    description: "Programme structuré de réintégration des collaborateurs de retour d'expatriation, préservant les acquis et facilitant la transition.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'collaborateur',label:"Nom et prénom du collaborateur",type:'text',required:true},
      {key:'pays_origine',label:"Pays d'expatriation",type:'text',required:true},
      {key:'duree_reintegration',label:"Durée de la période de réintégration",type:'text',required:true},
      {key:'date_retour',label:"Date de retour prévue",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROGRAMME DE RETOUR D'EXPATRIATION</h1><p><strong>Collaborateur :</strong> {{collaborateur}}</p><p><strong>Pays d'expatriation :</strong> {{pays_origine}}</p><p><strong>Date de retour :</strong> {{date_retour}}</p><h2>1. OBJECTIF</h2><p>Faciliter la réintégration de {{collaborateur}}, de retour de {{pays_origine}}, dans l'organisation locale, en valorisant les compétences acquises à l'international.</p><h2>2. POSTE DE RETOUR</h2><p>Un poste de retour est identifié et proposé à {{collaborateur}} au minimum 3 mois avant la date de fin de mission expatriée, en adéquation avec son profil enrichi.</p><h2>3. ACCOMPAGNEMENT</h2><p>Une période de réintégration de {{duree_reintegration}} est prévue, incluant un débriefing d'expatriation, un coaching de transition et une mise à jour des connaissances du contexte local.</p><h2>4. VALORISATION DE L'EXPÉRIENCE</h2><p>L'expérience internationale est formellement valorisée dans le dossier de carrière du collaborateur et prise en compte dans les décisions de mobilité et de promotion.</p></div>`
  },
  {
    code: 'talent_retraite_progressive',
    name: "Accord de Programme de Retraite Progressive",
    category: 'rh_emploi', price: 8000, priceMax: 20000,
    description: "Programme de transition vers la retraite permettant une réduction progressive du temps de travail pour les seniors en fin de carrière.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'collaborateur',label:"Nom du collaborateur concerné",type:'text',required:true},
      {key:'duree_transition',label:"Durée de la période de transition (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la retraite progressive",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE RETRAITE PROGRESSIVE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Collaborateur :</strong> {{collaborateur}}</p><p><strong>Date de début :</strong> {{date_debut}}</p><h2>1. OBJET</h2><p>La présente convention organise la transition progressive de {{collaborateur}} vers la retraite sur une période de {{duree_transition}} mois, permettant une réduction graduelle du temps de travail.</p><h2>2. MODALITÉS DE RÉDUCTION</h2><p>Le temps de travail est réduit progressivement selon un calendrier défini en annexe, passant de temps plein à mi-temps, puis à quart-temps avant le départ effectif à la retraite.</p><h2>3. TRANSMISSION DES SAVOIRS</h2><p>Pendant la période de transition, {{collaborateur}} assure la transmission de ses connaissances et son expertise à son successeur désigné.</p><h2>4. MAINTIEN DES DROITS</h2><p>Les droits à la retraite continuent de s'accumuler selon les dispositions légales et conventionnelles applicables pendant toute la durée de la retraite progressive.</p></div>`
  },
  {
    code: 'talent_parrainage_interne',
    name: "Accord de Programme de Parrainage Interne",
    category: 'rh_emploi', price: 5000, priceMax: 14000,
    description: "Programme de parrainage interne mettant en relation des collaborateurs expérimentés avec des profils sous-représentés ou en difficulté d'intégration.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'parrain',label:"Nom du parrain",type:'text',required:true},
      {key:'filleul',label:"Nom du filleul",type:'text',required:true},
      {key:'date_debut',label:"Date de début du parrainage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARRAINAGE INTERNE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Parrain :</strong> {{parrain}}</p><p><strong>Filleul :</strong> {{filleul}}</p><p><strong>Date de début :</strong> {{date_debut}}</p><h2>1. OBJECTIF</h2><p>Le programme de parrainage interne de {{entreprise}} vise à favoriser l'intégration et le développement de profils ciblés grâce au soutien d'un collaborateur expérimenté.</p><h2>2. RÔLE DU PARRAIN</h2><p>{{parrain}} s'engage à accompagner {{filleul}} dans sa prise de repères au sein de l'entreprise, à partager son réseau, à offrir des conseils de carrière et à être disponible pour des échanges réguliers.</p><h2>3. ENGAGEMENTS MUTUELS</h2><p>Le parrainage repose sur la confiance, la confidentialité et le volontariat. Les deux parties s'engagent à respecter la fréquence de rencontres définie et à donner du feedback constructif.</p><h2>4. SUIVI</h2><p>Un bilan de mi-parcours et un bilan final sont organisés par les RH pour évaluer la qualité et l'efficacité du parrainage.</p></div>`
  },
  {
    code: 'talent_reconnaissance_non_financiere',
    name: "Accord de Programme de Reconnaissance Non-Financière",
    category: 'rh_emploi', price: 7000, priceMax: 18000,
    description: "Programme de reconnaissance non-financière valorisant les contributions exceptionnelles des collaborateurs par des marques de reconnaissance symboliques et expérientielles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'formes_reconnaissance',label:"Formes de reconnaissance prévues",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement du programme",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROGRAMME DE RECONNAISSANCE NON-FINANCIÈRE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date de lancement :</strong> {{date_lancement}}</p><h2>1. PHILOSOPHIE</h2><p>{{entreprise}} croit que la reconnaissance sincère et régulière est un levier puissant d'engagement, de motivation et de fidélisation des collaborateurs.</p><h2>2. FORMES DE RECONNAISSANCE</h2><p>{{formes_reconnaissance}}</p><h2>3. CRITÈRES D'ATTRIBUTION</h2><p>La reconnaissance est attribuée pour des contributions exceptionnelles, des comportements exemplaires incarnant les valeurs de l'entreprise, des innovations et des réussites collectives.</p><h2>4. FRÉQUENCE ET VISIBILITÉ</h2><p>Les marques de reconnaissance sont formalisées trimestriellement et célébrées lors d'événements internes (réunions d'équipe, soirées de gala, newsletter interne).</p></div>`
  },
  {
    code: 'talent_bienetre_qvt',
    name: "Accord de Programme de Bien-Être au Travail (QVT)",
    category: 'rh_emploi', price: 8000, priceMax: 22000,
    description: "Accord sur la qualité de vie au travail (QVT) définissant les actions de bien-être, de prévention des risques psychosociaux et d'amélioration des conditions de travail.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'budget_qvt',label:"Budget QVT annuel (FCFA)",type:'text',required:true},
      {key:'referent_qvt',label:"Référent QVT",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD SUR LA QUALITÉ DE VIE AU TRAVAIL (QVT)</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. OBJET</h2><p>La présente politique vise à améliorer la qualité de vie au travail des collaborateurs de {{entreprise}} par des actions concrètes sur les conditions de travail, l'environnement de travail et l'équilibre vie professionnelle-vie personnelle.</p><h2>2. AXES D'INTERVENTION</h2><p>Aménagement des espaces de travail, prévention des risques psychosociaux (RPS), actions de bien-être (sport, nutrition, relaxation), flexibilité des horaires, droit à la déconnexion.</p><h2>3. BUDGET ET GOUVERNANCE</h2><p>Un budget de {{budget_qvt}} FCFA est alloué annuellement. Le référent QVT ({{referent_qvt}}) pilote le programme et anime un comité QVT trimestriel.</p><h2>4. MESURE DE L'IMPACT</h2><p>Un baromètre annuel de bien-être au travail mesure la satisfaction des collaborateurs et l'évolution des indicateurs RH (absentéisme, turnover, engagement).</p></div>`
  },
  {
    code: 'talent_diversite_inclusion',
    name: "Accord de Politique de Diversité et Inclusion",
    category: 'rh_emploi', price: 10000, priceMax: 28000,
    description: "Politique de diversité et d'inclusion engageant l'entreprise sur l'égalité des chances, la lutte contre les discriminations et la valorisation des différences.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'objectif_parite',label:"Objectif de parité femmes/hommes (postes direction)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
      {key:'referent_di',label:"Référent Diversité et Inclusion",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE DIVERSITÉ ET INCLUSION</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. ENGAGEMENT</h2><p>{{entreprise}} affirme son engagement en faveur de la diversité, de l'équité et de l'inclusion dans toutes ses pratiques RH : recrutement, formation, promotion, rémunération et conditions de travail.</p><h2>2. AXES PRIORITAIRES</h2><p>Égalité femmes/hommes (objectif : {{objectif_parite}}% de femmes aux postes de direction), inclusion des personnes handicapées, équité intergénérationnelle, ouverture aux diversités culturelles et sociales.</p><h2>3. ACTIONS</h2><p>Formation des managers à la lutte contre les biais inconscients, processus de recrutement neutralisé, indicateurs de suivi publiés annuellement, réseau interne de diversité.</p><h2>4. GOUVERNANCE</h2><p>{{referent_di}} pilote la politique D&I et rend compte annuellement à la direction générale et aux partenaires sociaux des progrès réalisés.</p></div>`
  },
  {
    code: 'talent_leadership_accelere',
    name: "Accord de Programme de Leadership Accéléré",
    category: 'rh_emploi', price: 12000, priceMax: 32000,
    description: "Programme de développement accéléré du leadership pour les futurs dirigeants, combinant formation, coaching et immersions terrain.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'duree_programme',label:"Durée du programme (mois)",type:'text',required:true},
      {key:'nb_participants',label:"Nombre de participants par promotion",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROGRAMME DE LEADERSHIP ACCÉLÉRÉ</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date de lancement :</strong> {{date_lancement}}</p><h2>1. VISION DU PROGRAMME</h2><p>Le programme de leadership accéléré de {{entreprise}} forge la prochaine génération de dirigeants en combinant développement de compétences, expériences challengeantes et réseautage de haut niveau.</p><h2>2. STRUCTURE</h2><p>Programme de {{duree_programme}} mois pour {{nb_participants}} participants sélectionnés, articulé autour de modules de leadership, de projets de transformation stratégique, d'immersions dans d'autres entités et de coaching individuel.</p><h2>3. COMPÉTENCES DÉVELOPPÉES</h2><p>Vision stratégique, management d'équipes diversifiées, gestion du changement, prise de décision en environnement complexe, communication d'influence, résilience et agilité.</p><h2>4. RÉSULTATS ATTENDUS</h2><p>À l'issue du programme, les participants sont prêts à prendre des responsabilités de direction et intègrent le vivier de succession des postes clés de {{entreprise}}.</p></div>`
  },
  {
    code: 'talent_formation_manageriale',
    name: "Accord de Programme de Formation Managériale",
    category: 'rh_emploi', price: 9000, priceMax: 24000,
    description: "Programme de formation au management destiné aux managers de proximité et middle managers, couvrant les fondamentaux du management d'équipe.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 81,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'population_cible',label:"Population cible (ex: managers N-1, N-2)",type:'text',required:true},
      {key:'duree_parcours',label:"Durée du parcours de formation (jours)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement de la première session",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROGRAMME DE FORMATION MANAGÉRIALE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Population cible :</strong> {{population_cible}}</p><p><strong>Date de lancement :</strong> {{date_lancement}}</p><h2>1. OBJECTIF</h2><p>Développer les compétences managériales essentielles des managers de {{entreprise}} pour améliorer l'efficacité des équipes, l'engagement des collaborateurs et la performance opérationnelle.</p><h2>2. CONTENU DU PARCOURS</h2><p>Parcours de {{duree_parcours}} jours couvrant : fondamentaux du management, entretiens individuels efficaces, gestion des performances, management à distance, gestion des conflits, délégation et feedback, développement des talents.</p><h2>3. MODALITÉS PÉDAGOGIQUES</h2><p>Alternance de formations en salle, mises en situation, ateliers de co-développement, e-learning et séances de coaching collectif entre pairs managers.</p><h2>4. SUIVI ET CERTIFICATION</h2><p>Une certification interne est délivrée à l'issue du parcours. Des sessions de renforcement annuelles sont organisées pour maintenir et approfondir les compétences.</p></div>`
  },
  {
    code: 'talent_transparence_salariale',
    name: "Accord de Politique de Transparence Salariale",
    category: 'rh_emploi', price: 9000, priceMax: 24000,
    description: "Politique de transparence salariale définissant le niveau d'information communiqué aux collaborateurs sur la structure des rémunérations.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'niveau_transparence',label:"Niveau de transparence (partielle/totale)",type:'text',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
      {key:'responsable_publication',label:"Responsable de la publication des données",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>POLITIQUE DE TRANSPARENCE SALARIALE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Niveau de transparence :</strong> {{niveau_transparence}}</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h2>1. PRINCIPES</h2><p>{{entreprise}} s'engage à une politique de transparence salariale {{niveau_transparence}} permettant à chaque collaborateur de comprendre comment sa rémunération est déterminée et de la situer par rapport aux pratiques internes.</p><h2>2. INFORMATIONS COMMUNIQUÉES</h2><p>Grille de classification et fourchettes salariales par catégorie, principes de détermination du salaire individuel, critères d'augmentation et d'évolution, politique de bonus et avantages.</p><h2>3. MODALITÉS DE COMMUNICATION</h2><p>Les informations salariales sont publiées sur l'intranet RH et présentées lors des entretiens annuels par {{responsable_publication}}.</p><h2>4. CONFIDENTIALITÉ INDIVIDUELLE</h2><p>La transparence des structures ne porte pas atteinte à la confidentialité du salaire individuel, qui reste une information personnelle.</p></div>`
  },
  {
    code: 'talent_charte_developpement_humain',
    name: "Charte du Développement Humain en Entreprise",
    category: 'rh_emploi', price: 8000, priceMax: 20000,
    description: "Charte engageant l'entreprise dans une philosophie de développement humain durable, plaçant l'épanouissement des collaborateurs au coeur de la stratégie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'dg_nom',label:"Nom du Directeur Général signataire",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'philosophie',label:"Philosophie RH en quelques mots",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>CHARTE DU DÉVELOPPEMENT HUMAIN EN ENTREPRISE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date d'adoption :</strong> {{date_adoption}}</p><h2>PRÉAMBULE</h2><p>{{philosophie}}</p><p>Chez {{entreprise}}, nous croyons profondément que la performance durable de l'entreprise repose sur l'épanouissement et le développement de chaque collaborateur. Cette charte formalise cet engagement.</p><h2>NOS ENGAGEMENTS</h2><p>1. Investir durablement dans la formation et le développement des compétences de chacun.</p><p>2. Offrir des perspectives d'évolution claires et des opportunités de mobilité.</p><p>3. Reconnaître et valoriser les contributions individuelles et collectives.</p><p>4. Garantir un environnement de travail sain, inclusif et respectueux de la dignité de chacun.</p><p>5. Écouter, dialoguer et adapter nos pratiques RH aux besoins réels de nos collaborateurs.</p><h2>SIGNATURE</h2><p>La présente charte est signée par {{dg_nom}}, Directeur Général de {{entreprise}}, et constitue un engagement solennel de la direction envers l'ensemble des collaborateurs.</p></div>`
  },
];
async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 63b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
