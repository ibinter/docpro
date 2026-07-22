import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── SPORTS (25) ───────────────────────────────────────────────────────────
  {
    code: 'sport2_contrat_joueur_football',
    name: "Contrat de joueur de football professionnel",
    category: 'association',
    price: 8000,
    priceMax: 24000,
    description: "Contrat liant un footballeur professionnel à un club sportif pour une durée déterminée, selon les règles de la fédération nationale et de la FIFA.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 88,
    fieldsJson: F([
      {key:'nom_joueur',label:"Nom complet du joueur",type:'text',required:true},
      {key:'nom_club',label:"Dénomination du club",type:'text',required:true},
      {key:'poste',label:"Poste occupé",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'date_fin',label:"Date de fin du contrat",type:'date',required:true},
      {key:'salaire_mensuel',label:"Salaire mensuel brut (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE JOUEUR DE FOOTBALL PROFESSIONNEL</h1><p>Entre le club <strong>{{nom_club}}</strong> et le joueur <strong>{{nom_joueur}}</strong>, poste : {{poste}}.</p><p>Durée : du {{date_debut}} au {{date_fin}}.</p><p>Rémunération mensuelle brute : {{salaire_mensuel}} FCFA.</p><p>Le présent contrat est soumis aux règlements de la Fédération Ivoirienne de Football (FIF) et aux statuts FIFA.</p></div>`
  },
  {
    code: 'sport2_contrat_joueur_basketball',
    name: "Contrat de joueur de basketball professionnel",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Contrat encadrant l'engagement d'un joueur de basketball professionnel au sein d'un club affilié à la fédération nationale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'nom_joueur',label:"Nom complet du joueur",type:'text',required:true},
      {key:'nom_club',label:"Dénomination du club",type:'text',required:true},
      {key:'categorie',label:"Catégorie (Pro A / Pro B)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'salaire_mensuel',label:"Salaire mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE JOUEUR DE BASKETBALL PROFESSIONNEL</h1><p>Le club <strong>{{nom_club}}</strong> (catégorie {{categorie}}) engage le joueur <strong>{{nom_joueur}}</strong> du {{date_debut}} au {{date_fin}} pour un salaire mensuel de {{salaire_mensuel}} FCFA.</p><p>Soumis aux règlements de la Fédération Ivoirienne de Basketball (FIBB).</p></div>`
  },
  {
    code: 'sport2_contrat_entraineur_club',
    name: "Contrat d'entraîneur de club professionnel",
    category: 'association',
    price: 9000,
    priceMax: 27000,
    description: "Contrat définissant les obligations et la rémunération d'un entraîneur principal engagé par un club sportif professionnel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 82,
    fieldsJson: F([
      {key:'nom_entraineur',label:"Nom de l'entraîneur",type:'text',required:true},
      {key:'nom_club',label:"Nom du club",type:'text',required:true},
      {key:'sport',label:"Discipline sportive",type:'text',required:true},
      {key:'date_debut',label:"Date de prise de fonction",type:'date',required:true},
      {key:'date_fin',label:"Date de fin de contrat",type:'date',required:true},
      {key:'honoraires',label:"Honoraires mensuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ENTRAÎNEUR DE CLUB PROFESSIONNEL</h1><p>Le club <strong>{{nom_club}}</strong> engage en qualité d'entraîneur principal de {{sport}} M./Mme <strong>{{nom_entraineur}}</strong>.</p><p>Période : {{date_debut}} – {{date_fin}}. Honoraires : {{honoraires}} FCFA/mois.</p><p>L'entraîneur s'engage à préparer et encadrer les équipes selon les directives sportives du club.</p></div>`
  },
  {
    code: 'sport2_accord_transfert_joueur',
    name: "Accord de transfert de joueur (football)",
    category: 'association',
    price: 12000,
    priceMax: 40000,
    description: "Accord formalisant le transfert définitif d'un footballeur entre deux clubs, incluant l'indemnité de transfert et les conditions de règlement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 79,
    fieldsJson: F([
      {key:'club_cedant',label:"Club cédant",type:'text',required:true},
      {key:'club_acquereur',label:"Club acquéreur",type:'text',required:true},
      {key:'nom_joueur',label:"Nom du joueur transféré",type:'text',required:true},
      {key:'indemnite',label:"Indemnité de transfert (FCFA)",type:'text',required:true},
      {key:'date_transfert',label:"Date effective du transfert",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSFERT DE JOUEUR</h1><p>Le club <strong>{{club_cedant}}</strong> cède définitivement au club <strong>{{club_acquereur}}</strong> le joueur <strong>{{nom_joueur}}</strong>.</p><p>Indemnité de transfert : <strong>{{indemnite}} FCFA</strong>, payable selon les modalités convenues.</p><p>Date effective : {{date_transfert}}. Accord soumis aux règlements FIFA et FIF.</p></div>`
  },
  {
    code: 'sport2_accord_pret_joueur',
    name: "Accord de prêt de joueur entre clubs",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Convention de prêt temporaire d'un joueur entre deux clubs, avec maintien du lien contractuel avec le club prêteur.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 71,
    fieldsJson: F([
      {key:'club_preteur',label:"Club prêteur",type:'text',required:true},
      {key:'club_emprunteur',label:"Club emprunteur",type:'text',required:true},
      {key:'nom_joueur',label:"Nom du joueur",type:'text',required:true},
      {key:'date_debut',label:"Début du prêt",type:'date',required:true},
      {key:'date_fin',label:"Fin du prêt",type:'date',required:true},
      {key:'contribution_salariale',label:"Contribution salariale mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÊT DE JOUEUR ENTRE CLUBS</h1><p><strong>{{club_preteur}}</strong> prête temporairement le joueur <strong>{{nom_joueur}}</strong> au club <strong>{{club_emprunteur}}</strong> du {{date_debut}} au {{date_fin}}.</p><p>Contribution salariale mensuelle à la charge du club emprunteur : {{contribution_salariale}} FCFA.</p></div>`
  },
  {
    code: 'sport2_contrat_medecin_sportif',
    name: "Contrat de service de médecin sportif de club",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de prestation de services médicaux sportifs entre un médecin du sport et un club professionnel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_medecin',label:"Nom du médecin",type:'text',required:true},
      {key:'numero_ordre',label:"Numéro d'ordre médical",type:'text',required:true},
      {key:'nom_club',label:"Nom du club",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'honoraires_mensuels',label:"Honoraires mensuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE MÉDECIN SPORTIF</h1><p>Le Dr <strong>{{nom_medecin}}</strong> (n° Ordre : {{numero_ordre}}) assure les soins médicaux de l'effectif du club <strong>{{nom_club}}</strong> à compter du {{date_debut}}.</p><p>Honoraires mensuels : {{honoraires_mensuels}} FCFA. Déplacements en compétition inclus.</p></div>`
  },
  {
    code: 'sport2_contrat_kine_sportif',
    name: "Contrat de service de kinésithérapeute sportif",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de prestation de rééducation et de soins de kinésithérapie au profit des sportifs d'un club.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'nom_club',label:"Nom du club",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'honoraires',label:"Honoraires mensuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE KINÉSITHÉRAPEUTE SPORTIF</h1><p>M./Mme <strong>{{nom_kine}}</strong> intervient en qualité de kinésithérapeute officiel du club <strong>{{nom_club}}</strong> du {{date_debut}} au {{date_fin}}.</p><p>Honoraires : {{honoraires}} FCFA/mois. Présence obligatoire aux séances et matchs à domicile.</p></div>`
  },
  {
    code: 'sport2_accord_sponsor_naming',
    name: "Accord de partenariat club-sponsor principal (naming)",
    category: 'association',
    price: 15000,
    priceMax: 50000,
    description: "Accord de naming permettant à un sponsor principal d'apposer sa marque sur le nom officiel du club ou du stade.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'nom_club',label:"Nom du club",type:'text',required:true},
      {key:'nom_sponsor',label:"Nom du sponsor (entreprise)",type:'text',required:true},
      {key:'nom_commercial',label:"Nouveau nom commercial du club",type:'text',required:true},
      {key:'montant_annuel',label:"Montant annuel du sponsoring (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT NAMING</h1><p>Le club <strong>{{nom_club}}</strong> et la société <strong>{{nom_sponsor}}</strong> conviennent que le club sera désigné sous le nom commercial <strong>{{nom_commercial}}</strong> pour la durée du présent accord.</p><p>Montant annuel : {{montant_annuel}} FCFA. Période : {{date_debut}} – {{date_fin}}.</p></div>`
  },
  {
    code: 'sport2_accord_sponsor_officiel',
    name: "Accord de partenariat club-sponsor officiel",
    category: 'association',
    price: 10000,
    priceMax: 30000,
    description: "Convention de sponsoring officiel définissant les contreparties visibilité et les obligations financières du partenaire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'nom_club',label:"Nom du club",type:'text',required:true},
      {key:'nom_sponsor',label:"Nom du sponsor",type:'text',required:true},
      {key:'contreparties',label:"Contreparties accordées",type:'textarea',required:true},
      {key:'montant_annuel',label:"Montant annuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CLUB-SPONSOR OFFICIEL</h1><p>Le club <strong>{{nom_club}}</strong> et <strong>{{nom_sponsor}}</strong> concluent le présent accord de sponsoring officiel.</p><p>Contreparties : {{contreparties}}.</p><p>Montant annuel : {{montant_annuel}} FCFA à compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'sport2_accord_droits_tv',
    name: "Accord de service de diffusion de matchs (droits TV)",
    category: 'association',
    price: 15000,
    priceMax: 45000,
    description: "Accord de cession de droits audiovisuels pour la diffusion de matchs ou compétitions sportives sur des chaînes de télévision ou plateformes numériques.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'ayant_droit',label:"Ayant droit (club/fédération)",type:'text',required:true},
      {key:'diffuseur',label:"Nom du diffuseur",type:'text',required:true},
      {key:'competition',label:"Compétition concernée",type:'text',required:true},
      {key:'montant_droits',label:"Montant des droits (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Saison – date de début",type:'date',required:true},
      {key:'date_fin',label:"Saison – date de fin",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE DROITS AUDIOVISUELS (DROITS TV)</h1><p><strong>{{ayant_droit}}</strong> cède à <strong>{{diffuseur}}</strong> les droits exclusifs de diffusion des matchs de la compétition <strong>{{competition}}</strong>.</p><p>Droits : {{montant_droits}} FCFA. Saison : {{date_debut}} – {{date_fin}}.</p></div>`
  },
  {
    code: 'sport2_accord_billetterie',
    name: "Accord de service de billetterie événement sportif",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de prestation de gestion et de vente de billets pour un événement ou une compétition sportive.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'organisateur',label:"Organisateur de l'événement",type:'text',required:true},
      {key:'prestataire',label:"Prestataire billetterie",type:'text',required:true},
      {key:'evenement',label:"Nom de l'événement",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'commission',label:"Commission du prestataire (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BILLETTERIE SPORTIVE</h1><p><strong>{{prestataire}}</strong> assure la gestion de la billetterie de <strong>{{evenement}}</strong> organisé par <strong>{{organisateur}}</strong> le {{date_evenement}}.</p><p>Commission : {{commission}}% sur les recettes nettes de billetterie.</p></div>`
  },
  {
    code: 'sport2_accord_tournoi_regional',
    name: "Accord de service d'organisation de tournoi régional",
    category: 'association',
    price: 8000,
    priceMax: 25000,
    description: "Convention d'organisation entre une fédération ou ligue et un prestataire en charge de l'organisation logistique et sportive d'un tournoi régional.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'mandant',label:"Fédération / Ligue mandante",type:'text',required:true},
      {key:'organisateur',label:"Organisateur prestataire",type:'text',required:true},
      {key:'nom_tournoi',label:"Nom du tournoi",type:'text',required:true},
      {key:'lieu',label:"Lieu de déroulement",type:'text',required:true},
      {key:'date_tournoi',label:"Date du tournoi",type:'date',required:true},
      {key:'budget_alloue',label:"Budget alloué (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ORGANISATION DE TOURNOI RÉGIONAL</h1><p><strong>{{mandant}}</strong> confie à <strong>{{organisateur}}</strong> l'organisation du tournoi <strong>{{nom_tournoi}}</strong> prévu le {{date_tournoi}} à {{lieu}}.</p><p>Budget alloué : {{budget_alloue}} FCFA. Un rapport de clôture sera remis dans les 30 jours suivant l'événement.</p></div>`
  },
  {
    code: 'sport2_accord_camp_entrainement',
    name: "Accord de service de camp d'entraînement (académie de foot)",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Convention encadrant l'organisation d'un camp d'entraînement ou d'une académie de football pour jeunes joueurs.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      {key:'nom_academie',label:"Nom de l'académie",type:'text',required:true},
      {key:'nom_partenaire',label:"Partenaire ou bailleur",type:'text',required:true},
      {key:'nombre_jeunes',label:"Nombre de jeunes accueillis",type:'text',required:true},
      {key:'date_debut',label:"Date de début du camp",type:'date',required:true},
      {key:'date_fin',label:"Date de fin du camp",type:'date',required:true},
      {key:'cout_total',label:"Coût total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CAMP D'ENTRAÎNEMENT</h1><p><strong>{{nom_academie}}</strong> et <strong>{{nom_partenaire}}</strong> conviennent d'organiser un camp d'entraînement pour {{nombre_jeunes}} jeunes footballeurs du {{date_debut}} au {{date_fin}}.</p><p>Coût total : {{cout_total}} FCFA.</p></div>`
  },
  {
    code: 'sport2_accord_federation_etat',
    name: "Accord de partenariat fédération sportive-État",
    category: 'association',
    price: 12000,
    priceMax: 36000,
    description: "Convention-cadre de partenariat entre une fédération sportive nationale et l'État, fixant les subventions, objectifs et obligations de résultats.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 77,
    fieldsJson: F([
      {key:'nom_federation',label:"Nom de la fédération",type:'text',required:true},
      {key:'ministere',label:"Ministère partenaire",type:'text',required:true},
      {key:'montant_subvention',label:"Montant annuel de la subvention (FCFA)",type:'text',required:true},
      {key:'objectifs',label:"Objectifs de performance",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT FÉDÉRATION SPORTIVE – ÉTAT</h1><p>La <strong>{{nom_federation}}</strong> et le <strong>{{ministere}}</strong> s'engagent dans un partenariat stratégique pour le développement du sport en Côte d'Ivoire.</p><p>Subvention annuelle : {{montant_subvention}} FCFA. Objectifs : {{objectifs}}. Signé le {{date_signature}}.</p></div>`
  },
  {
    code: 'sport2_accord_scouting',
    name: "Accord de service de détection de talents (scouting)",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de prestation de service de détection et de recrutement de jeunes talents sportifs pour le compte d'un club ou d'une académie.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'nom_club',label:"Club ou académie mandant",type:'text',required:true},
      {key:'nom_scout',label:"Nom du scout",type:'text',required:true},
      {key:'zone_couverture',label:"Zone géographique couverte",type:'text',required:true},
      {key:'honoraires_mensuel',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'prime_recrutement',label:"Prime par talent recruté (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉTECTION DE TALENTS (SCOUTING)</h1><p><strong>{{nom_club}}</strong> mandate <strong>{{nom_scout}}</strong> pour la détection de jeunes talents dans la zone : {{zone_couverture}}.</p><p>Honoraires : {{honoraires_mensuel}} FCFA/mois + prime de {{prime_recrutement}} FCFA par talent recruté.</p></div>`
  },
  {
    code: 'sport2_accord_preparation_physique',
    name: "Accord de service de préparation physique athlètes",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de prestation de préparation physique et conditioning pour des athlètes individuels ou collectifs.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'nom_preparateur',label:"Nom du préparateur physique",type:'text',required:true},
      {key:'nom_client',label:"Athlète ou club bénéficiaire",type:'text',required:true},
      {key:'programme',label:"Description du programme",type:'textarea',required:true},
      {key:'duree_semaines',label:"Durée (semaines)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires totaux (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRÉPARATION PHYSIQUE</h1><p><strong>{{nom_preparateur}}</strong> assure la préparation physique de <strong>{{nom_client}}</strong> sur {{duree_semaines}} semaines.</p><p>Programme : {{programme}}. Honoraires : {{honoraires}} FCFA.</p></div>`
  },
  {
    code: 'sport2_contrat_athlete_haut_niveau',
    name: "Contrat d'athlète individuel de haut niveau",
    category: 'association',
    price: 9000,
    priceMax: 27000,
    description: "Contrat encadrant la relation entre un athlète individuel de haut niveau et son club ou fédération, incluant primes et obligations.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'nom_athlete',label:"Nom de l'athlète",type:'text',required:true},
      {key:'discipline',label:"Discipline sportive",type:'text',required:true},
      {key:'organisation',label:"Club ou Fédération",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'allocation_mensuelle',label:"Allocation mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ATHLÈTE INDIVIDUEL DE HAUT NIVEAU</h1><p><strong>{{nom_athlete}}</strong>, athlète de haut niveau en {{discipline}}, s'engage avec <strong>{{organisation}}</strong> du {{date_debut}} au {{date_fin}}.</p><p>Allocation mensuelle : {{allocation_mensuelle}} FCFA. Primes de résultats selon barème annexé.</p></div>`
  },
  {
    code: 'sport2_accord_gestion_image',
    name: "Accord de service de gestion d'image d'athlète",
    category: 'association',
    price: 8000,
    priceMax: 24000,
    description: "Contrat mandatant un agent ou une agence pour la gestion des droits à l'image, publicités et partenariats commerciaux d'un athlète.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_athlete',label:"Nom de l'athlète",type:'text',required:true},
      {key:'nom_agence',label:"Agence de gestion d'image",type:'text',required:true},
      {key:'commission',label:"Commission de l'agence (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION D'IMAGE D'ATHLÈTE</h1><p><strong>{{nom_athlete}}</strong> mandate <strong>{{nom_agence}}</strong> pour gérer ses droits à l'image et ses partenariats commerciaux du {{date_debut}} au {{date_fin}}.</p><p>Commission de l'agence : {{commission}}% sur tous les revenus générés.</p></div>`
  },
  {
    code: 'sport2_accord_kit_sportif',
    name: "Accord de service de kit sportif et équipements",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Convention de fourniture de tenues, chaussures et équipements sportifs entre un fournisseur et un club ou une fédération.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'nom_fournisseur',label:"Fournisseur d'équipements",type:'text',required:true},
      {key:'nom_club',label:"Club ou fédération bénéficiaire",type:'text',required:true},
      {key:'description_kits',label:"Description des kits fournis",type:'textarea',required:true},
      {key:'valeur_totale',label:"Valeur totale des équipements (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FOURNITURE DE KITS SPORTIFS ET ÉQUIPEMENTS</h1><p><strong>{{nom_fournisseur}}</strong> s'engage à fournir à <strong>{{nom_club}}</strong> les équipements suivants : {{description_kits}}.</p><p>Valeur totale : {{valeur_totale}} FCFA. Livraison prévue le : {{date_livraison}}.</p></div>`
  },
  {
    code: 'sport2_accord_transport_equipe',
    name: "Accord de service de transport d'équipe",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de prestation de transport d'une équipe sportive pour des déplacements en compétition nationale ou internationale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'nom_club',label:"Club bénéficiaire",type:'text',required:true},
      {key:'transporteur',label:"Nom du transporteur",type:'text',required:true},
      {key:'trajet',label:"Trajet (départ – destination)",type:'text',required:true},
      {key:'date_deplacement',label:"Date du déplacement",type:'date',required:true},
      {key:'cout',label:"Coût du transport (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT D'ÉQUIPE</h1><p><strong>{{transporteur}}</strong> assure le transport de l'équipe de <strong>{{nom_club}}</strong> sur le trajet {{trajet}} le {{date_deplacement}}.</p><p>Coût : {{cout}} FCFA. Véhicule adéquat et conducteur qualifié garantis.</p></div>`
  },
  {
    code: 'sport2_rapport_performance_club',
    name: "Rapport de performance club sportif (saison)",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Rapport de bilan sportif et financier d'un club professionnel à l'issue d'une saison, destiné aux dirigeants et partenaires.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      {key:'nom_club',label:"Nom du club",type:'text',required:true},
      {key:'saison',label:"Saison sportive (ex: 2024-2025)",type:'text',required:true},
      {key:'bilan_sportif',label:"Bilan sportif (résultats, classement)",type:'textarea',required:true},
      {key:'bilan_financier',label:"Bilan financier résumé",type:'textarea',required:true},
      {key:'perspectives',label:"Perspectives saison suivante",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – {{nom_club}} – SAISON {{saison}}</h1><h2>Bilan Sportif</h2><p>{{bilan_sportif}}</p><h2>Bilan Financier</h2><p>{{bilan_financier}}</p><h2>Perspectives</h2><p>{{perspectives}}</p></div>`
  },
  {
    code: 'sport2_plan_developpement_academie',
    name: "Plan de développement académie de football",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Document stratégique définissant les axes de développement, les ressources et le calendrier d'une académie de football.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'nom_academie',label:"Nom de l'académie",type:'text',required:true},
      {key:'localisation',label:"Localisation (ville, pays)",type:'text',required:true},
      {key:'objectifs_3ans',label:"Objectifs sur 3 ans",type:'textarea',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel annuel (FCFA)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT – {{nom_academie}}</h1><p>Localisation : {{localisation}}. Lancement prévu le {{date_lancement}}.</p><h2>Objectifs sur 3 ans</h2><p>{{objectifs_3ans}}</p><h2>Budget prévisionnel annuel</h2><p>{{budget_previsionnel}} FCFA</p></div>`
  },
  {
    code: 'sport2_accord_can2023',
    name: "Accord de partenariat CAN-2023 (modèle)",
    category: 'association',
    price: 12000,
    priceMax: 36000,
    description: "Modèle d'accord de partenariat événementiel inspiré de la CAN, utilisable pour tout grand événement sportif continental organisé en Afrique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 83,
    fieldsJson: F([
      {key:'organisateur',label:"Organisateur officiel",type:'text',required:true},
      {key:'partenaire',label:"Partenaire associé",type:'text',required:true},
      {key:'evenement',label:"Nom de l'événement",type:'text',required:true},
      {key:'droits_accordes',label:"Droits accordés au partenaire",type:'textarea',required:true},
      {key:'montant',label:"Montant du partenariat (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT – {{evenement}}</h1><p><strong>{{organisateur}}</strong> et <strong>{{partenaire}}</strong> formalisent leur partenariat dans le cadre de <strong>{{evenement}}</strong>.</p><p>Droits accordés : {{droits_accordes}}. Montant : {{montant}} FCFA. Signé le {{date_signature}}.</p></div>`
  },
  {
    code: 'sport2_accord_construction_stade',
    name: "Accord de service de construction de stade",
    category: 'association',
    price: 15000,
    priceMax: 50000,
    description: "Accord de maîtrise d'ouvrage délégué ou de concession pour la construction ou la rénovation d'une infrastructure sportive (stade, gymnase).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entreprise_construction',label:"Entreprise de construction",type:'text',required:true},
      {key:'nom_infrastructure',label:"Nom de l'infrastructure",type:'text',required:true},
      {key:'capacite',label:"Capacité (nombre de places)",type:'text',required:true},
      {key:'montant_marche',label:"Montant du marché (FCFA)",type:'text',required:true},
      {key:'delai_livraison',label:"Délai de livraison prévu",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSTRUCTION DE STADE</h1><p><strong>{{maitre_ouvrage}}</strong> confie à <strong>{{entreprise_construction}}</strong> la construction de <strong>{{nom_infrastructure}}</strong> (capacité : {{capacite}} places).</p><p>Montant : {{montant_marche}} FCFA. Livraison prévue : {{delai_livraison}}.</p></div>`
  },
  {
    code: 'sport2_charte_fair_play',
    name: "Charte de fair-play et éthique sportive",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Charte d'engagement éthique et de fair-play signée par les clubs, athlètes et officiels d'une compétition ou d'une ligue.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'nom_signataire',label:"Nom du signataire (club / athlète)",type:'text',required:true},
      {key:'nom_competition',label:"Compétition ou ligue concernée",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'representant',label:"Représentant légal ou capitaine",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE FAIR-PLAY ET D'ÉTHIQUE SPORTIVE</h1><p>Par la présente, <strong>{{nom_signataire}}</strong>, représenté(e) par <strong>{{representant}}</strong>, s'engage à respecter les valeurs du fair-play dans le cadre de <strong>{{nom_competition}}</strong>.</p><p>Signé le {{date_signature}}. Toute violation expose à des sanctions disciplinaires.</p></div>`
  },

  // ─── CULTURE / ARTS (25) ──────────────────────────────────────────────────
  {
    code: 'cult_contrat_artiste_musicien',
    name: "Contrat d'artiste musicien",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Contrat d'engagement d'un artiste musicien par un producteur ou un label, définissant les droits, obligations et rémunérations.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'nom_artiste',label:"Nom de l'artiste",type:'text',required:true},
      {key:'nom_label',label:"Label ou producteur",type:'text',required:true},
      {key:'genre_musical',label:"Genre musical",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat (années)",type:'text',required:true},
      {key:'avance_royalties',label:"Avance sur royalties (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ARTISTE MUSICIEN</h1><p>Le label <strong>{{nom_label}}</strong> et l'artiste <strong>{{nom_artiste}}</strong> (genre : {{genre_musical}}) concluent un contrat d'une durée de {{duree_contrat}} an(s).</p><p>Avance sur royalties : {{avance_royalties}} FCFA. Signé le {{date_signature}}.</p><p>Soumis aux dispositions du Bureau Ivoirien du Droit d'Auteur (BURIDA).</p></div>`
  },
  {
    code: 'cult_contrat_production_musicale',
    name: "Contrat de service de production musicale",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Convention entre un artiste et un producteur pour la réalisation d'un album ou d'un titre musical, précisant budget et droits.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'nom_artiste',label:"Nom de l'artiste",type:'text',required:true},
      {key:'nom_producteur',label:"Nom du producteur",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet musical",type:'text',required:true},
      {key:'budget_production',label:"Budget de production (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRODUCTION MUSICALE</h1><p><strong>{{nom_producteur}}</strong> prend en charge la production du projet <strong>{{titre_projet}}</strong> de l'artiste <strong>{{nom_artiste}}</strong>.</p><p>Budget : {{budget_production}} FCFA. Livraison prévue : {{date_livraison}}.</p></div>`
  },
  {
    code: 'cult_accord_licence_burida',
    name: "Accord de licence de droits musicaux (BURIDA)",
    category: 'association',
    price: 8000,
    priceMax: 24000,
    description: "Accord de licence autorisant l'utilisation d'une oeuvre musicale protégée, conformément aux droits gérés par le BURIDA en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 77,
    fieldsJson: F([
      {key:'nom_auteur',label:"Nom de l'auteur / compositeur",type:'text',required:true},
      {key:'nom_licencie',label:"Nom du licencié",type:'text',required:true},
      {key:'titre_oeuvre',label:"Titre de l'oeuvre",type:'text',required:true},
      {key:'usage_autorise',label:"Usage autorisé",type:'textarea',required:true},
      {key:'redevance',label:"Redevance (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la licence",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE DROITS MUSICAUX – BURIDA</h1><p>L'auteur <strong>{{nom_auteur}}</strong> accorde à <strong>{{nom_licencie}}</strong> une licence d'utilisation de l'oeuvre <strong>{{titre_oeuvre}}</strong>.</p><p>Usage autorisé : {{usage_autorise}}. Redevance : {{redevance}} FCFA. Début : {{date_debut}}.</p></div>`
  },
  {
    code: 'cult_accord_distribution_streaming',
    name: "Accord de service de distribution musicale numérique (streaming)",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de distribution numérique d'une oeuvre musicale sur les plateformes de streaming (Spotify, Apple Music, Boomplay, etc.).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 82,
    fieldsJson: F([
      {key:'nom_artiste',label:"Nom de l'artiste",type:'text',required:true},
      {key:'distributeur',label:"Distributeur numérique",type:'text',required:true},
      {key:'catalogue',label:"Catalogue / titres concernés",type:'textarea',required:true},
      {key:'pourcentage_reversement',label:"Pourcentage reversé à l'artiste (%)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION MUSICALE NUMÉRIQUE</h1><p><strong>{{distributeur}}</strong> distribue les oeuvres de <strong>{{nom_artiste}}</strong> sur les plateformes de streaming.</p><p>Catalogue : {{catalogue}}. Reversement : {{pourcentage_reversement}}% des revenus nets. Signé le {{date_signature}}.</p></div>`
  },
  {
    code: 'cult_accord_concert_spectacle',
    name: "Accord de service de concert et spectacle vivant",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Convention entre un artiste ou groupe et un organisateur de spectacle pour la tenue d'un concert ou d'un événement de spectacle vivant.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 84,
    fieldsJson: F([
      {key:'nom_artiste',label:"Artiste ou groupe",type:'text',required:true},
      {key:'organisateur',label:"Organisateur du spectacle",type:'text',required:true},
      {key:'lieu_concert',label:"Lieu du concert",type:'text',required:true},
      {key:'date_concert',label:"Date du concert",type:'date',required:true},
      {key:'cachet',label:"Cachet de l'artiste (FCFA)",type:'text',required:true},
      {key:'conditions_techniques',label:"Conditions techniques requises",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONCERT ET SPECTACLE VIVANT</h1><p><strong>{{nom_artiste}}</strong> se produit à <strong>{{lieu_concert}}</strong> le {{date_concert}}, sous l'organisation de <strong>{{organisateur}}</strong>.</p><p>Cachet : {{cachet}} FCFA. Conditions techniques : {{conditions_techniques}}.</p></div>`
  },
  {
    code: 'cult_accord_cession_theatre',
    name: "Accord de cession de droits de représentation théâtrale",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Accord par lequel un auteur ou producteur cède à une compagnie le droit de représenter une pièce de théâtre sur le territoire ivoirien.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_auteur',label:"Auteur / ayant droit",type:'text',required:true},
      {key:'nom_compagnie',label:"Compagnie théâtrale",type:'text',required:true},
      {key:'titre_piece',label:"Titre de la pièce",type:'text',required:true},
      {key:'nombre_representations',label:"Nombre de représentations autorisées",type:'text',required:true},
      {key:'redevance_par_representation',label:"Redevance par représentation (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des représentations",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE DROITS DE REPRÉSENTATION THÉÂTRALE</h1><p><strong>{{nom_auteur}}</strong> cède à la compagnie <strong>{{nom_compagnie}}</strong> le droit de représenter <strong>{{titre_piece}}</strong> pour {{nombre_representations}} représentation(s) à compter du {{date_debut}}.</p><p>Redevance : {{redevance_par_representation}} FCFA par représentation.</p></div>`
  },
  {
    code: 'cult_contrat_comedien_acteur',
    name: "Contrat de comédien/acteur",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Contrat d'engagement d'un comédien ou acteur pour une production théâtrale, cinématographique ou télévisuelle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_comedien',label:"Nom du comédien / acteur",type:'text',required:true},
      {key:'nom_production',label:"Nom de la production",type:'text',required:true},
      {key:'role',label:"Rôle interprété",type:'text',required:true},
      {key:'cachet',label:"Cachet (FCFA)",type:'text',required:true},
      {key:'date_tournage',label:"Date de début du tournage / répétitions",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMÉDIEN / ACTEUR</h1><p><strong>{{nom_comedien}}</strong> est engagé(e) pour interpréter le rôle de <strong>{{role}}</strong> dans la production <strong>{{nom_production}}</strong>.</p><p>Cachet : {{cachet}} FCFA. Début : {{date_tournage}}.</p></div>`
  },
  {
    code: 'cult_contrat_realisateur_film',
    name: "Contrat de réalisateur de film",
    category: 'association',
    price: 9000,
    priceMax: 27000,
    description: "Contrat définissant les droits et obligations d'un réalisateur de film dans le cadre d'une production cinématographique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'nom_realisateur',label:"Nom du réalisateur",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'producteur',label:"Société de production",type:'text',required:true},
      {key:'budget_film',label:"Budget total du film (FCFA)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires du réalisateur (FCFA)",type:'text',required:true},
      {key:'date_tournage',label:"Date de début de tournage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RÉALISATEUR DE FILM</h1><p><strong>{{nom_realisateur}}</strong> est engagé(e) par <strong>{{producteur}}</strong> pour réaliser le film <strong>{{titre_film}}</strong> (budget : {{budget_film}} FCFA).</p><p>Honoraires : {{honoraires}} FCFA. Tournage prévu le {{date_tournage}}.</p></div>`
  },
  {
    code: 'cult_accord_coproduction_cine',
    name: "Accord de coproduction cinématographique",
    category: 'association',
    price: 12000,
    priceMax: 36000,
    description: "Accord entre plusieurs producteurs pour le financement conjoint, la production et l'exploitation d'un film cinématographique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      {key:'producteur_principal',label:"Producteur principal",type:'text',required:true},
      {key:'coproducteur',label:"Coproducteur",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'apport_principal',label:"Apport producteur principal (FCFA)",type:'text',required:true},
      {key:'apport_coprod',label:"Apport coproducteur (FCFA)",type:'text',required:true},
      {key:'date_debut_prod',label:"Date de début de production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COPRODUCTION CINÉMATOGRAPHIQUE</h1><p><strong>{{producteur_principal}}</strong> et <strong>{{coproducteur}}</strong> s'associent pour la production du film <strong>{{titre_film}}</strong>.</p><p>Apports : {{apport_principal}} FCFA (principal) + {{apport_coprod}} FCFA (coproducteur). Production à compter du {{date_debut_prod}}.</p></div>`
  },
  {
    code: 'cult_accord_distribution_film_sodaci',
    name: "Accord de distribution de film (SODACI)",
    category: 'association',
    price: 9000,
    priceMax: 27000,
    description: "Accord de distribution cinématographique sur le marché ivoirien et sous-régional, en référence aux pratiques de la Société de Distribution de Cinéma (SODACI).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'producteur',label:"Producteur / Ayant droit",type:'text',required:true},
      {key:'distributeur',label:"Distributeur (SODACI ou autre)",type:'text',required:true},
      {key:'titre_film',label:"Titre du film",type:'text',required:true},
      {key:'territoire',label:"Territoire de distribution",type:'text',required:true},
      {key:'pourcentage_recettes',label:"Part du distributeur sur recettes (%)",type:'text',required:true},
      {key:'date_sortie',label:"Date de sortie prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION DE FILM</h1><p><strong>{{distributeur}}</strong> distribue le film <strong>{{titre_film}}</strong> de <strong>{{producteur}}</strong> sur le territoire : {{territoire}}.</p><p>Part distributeur : {{pourcentage_recettes}}% des recettes. Sortie prévue le {{date_sortie}}.</p></div>`
  },
  {
    code: 'cult_accord_festival_culturel',
    name: "Accord de service de festival culturel",
    category: 'association',
    price: 8000,
    priceMax: 24000,
    description: "Convention entre les organisateurs d'un festival culturel et leurs prestataires (artistes, techniciens, lieux) pour assurer le bon déroulement de l'événement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'nom_festival',label:"Nom du festival",type:'text',required:true},
      {key:'organisateur',label:"Organisme organisateur",type:'text',required:true},
      {key:'lieu',label:"Lieu du festival",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de clôture",type:'date',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FESTIVAL CULTUREL</h1><p><strong>{{organisateur}}</strong> organise le festival <strong>{{nom_festival}}</strong> à {{lieu}} du {{date_debut}} au {{date_fin}}.</p><p>Budget total alloué : {{budget_total}} FCFA. Les prestataires s'engagent à respecter le programme artistique validé.</p></div>`
  },
  {
    code: 'cult_accord_galerie_art',
    name: "Accord de service de galerie d'art et exposition",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Convention entre un artiste plasticien et une galerie d'art pour l'exposition et la vente d'oeuvres, avec définition de la commission galerie.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_artiste',label:"Nom de l'artiste",type:'text',required:true},
      {key:'nom_galerie',label:"Nom de la galerie",type:'text',required:true},
      {key:'nombre_oeuvres',label:"Nombre d'oeuvres exposées",type:'text',required:true},
      {key:'commission_galerie',label:"Commission galerie sur ventes (%)",type:'text',required:true},
      {key:'date_vernissage',label:"Date du vernissage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GALERIE D'ART ET EXPOSITION</h1><p>La galerie <strong>{{nom_galerie}}</strong> expose {{nombre_oeuvres}} oeuvre(s) de <strong>{{nom_artiste}}</strong> à partir du {{date_vernissage}}.</p><p>Commission galerie sur les ventes : {{commission_galerie}}%. Les oeuvres non vendues sont restituées en fin d'exposition.</p></div>`
  },
  {
    code: 'cult_accord_commande_artiste',
    name: "Accord de service d'artiste plasticien (commande)",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de commande artistique par lequel un commanditaire passe commande d'une oeuvre originale à un artiste plasticien.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'nom_artiste',label:"Nom de l'artiste",type:'text',required:true},
      {key:'commanditaire',label:"Nom du commanditaire",type:'text',required:true},
      {key:'description_oeuvre',label:"Description de l'oeuvre commandée",type:'textarea',required:true},
      {key:'prix_commande',label:"Prix de la commande (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison attendue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COMMANDE ARTISTIQUE</h1><p><strong>{{commanditaire}}</strong> commande à l'artiste <strong>{{nom_artiste}}</strong> l'oeuvre suivante : {{description_oeuvre}}.</p><p>Prix : {{prix_commande}} FCFA. Livraison attendue : {{date_livraison}}.</p></div>`
  },
  {
    code: 'cult_accord_tatouage_artistique',
    name: "Accord de service de tatouage artistique (studio)",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Contrat de prestation entre un studio de tatouage et un client, précisant le motif, le tarif et les conditions d'hygiène.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_studio',label:"Nom du studio",type:'text',required:true},
      {key:'description_tatouage',label:"Description du tatouage",type:'textarea',required:true},
      {key:'prix',label:"Prix convenu (FCFA)",type:'text',required:true},
      {key:'date_rdv',label:"Date du rendez-vous",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TATOUAGE ARTISTIQUE</h1><p>Le studio <strong>{{nom_studio}}</strong> réalise pour <strong>{{nom_client}}</strong> le tatouage suivant : {{description_tatouage}}.</p><p>Prix : {{prix}} FCFA. Date du rendez-vous : {{date_rdv}}. Le client certifie avoir plus de 18 ans et ne présenter aucune contre-indication médicale.</p></div>`
  },
  {
    code: 'cult_accord_ecole_musique',
    name: "Accord de service d'école de musique",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Contrat d'inscription et de formation musicale entre une école de musique et un élève (ou son représentant légal).",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'nom_eleve',label:"Nom de l'élève",type:'text',required:true},
      {key:'nom_ecole',label:"Nom de l'école de musique",type:'text',required:true},
      {key:'instrument',label:"Instrument ou discipline",type:'text',required:true},
      {key:'frais_inscription',label:"Frais d'inscription (FCFA)",type:'text',required:true},
      {key:'frais_mensuel',label:"Frais mensuels (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des cours",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉCOLE DE MUSIQUE</h1><p><strong>{{nom_ecole}}</strong> accueille <strong>{{nom_eleve}}</strong> pour des cours de {{instrument}} à compter du {{date_debut}}.</p><p>Frais d'inscription : {{frais_inscription}} FCFA. Mensualités : {{frais_mensuel}} FCFA/mois.</p></div>`
  },
  {
    code: 'cult_accord_ecole_danse',
    name: "Accord de service d'école de danse",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Contrat d'inscription et de formation à la danse entre une école de danse et un élève ou son représentant légal.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 61,
    fieldsJson: F([
      {key:'nom_eleve',label:"Nom de l'élève",type:'text',required:true},
      {key:'nom_ecole',label:"Nom de l'école de danse",type:'text',required:true},
      {key:'style_danse',label:"Style de danse (afrobeat, classique, etc.)",type:'text',required:true},
      {key:'frais_mensuel',label:"Frais mensuels (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉCOLE DE DANSE</h1><p><strong>{{nom_ecole}}</strong> accueille <strong>{{nom_eleve}}</strong> pour une formation en {{style_danse}} à compter du {{date_debut}}.</p><p>Frais mensuels : {{frais_mensuel}} FCFA. Présence régulière obligatoire.</p></div>`
  },
  {
    code: 'cult_contrat_dj_evenement',
    name: "Contrat de service de DJ pour événement",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Contrat encadrant la prestation d'un DJ professionnel lors d'un événement privé ou public (mariage, soirée, festival).",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_dj',label:"Nom du DJ",type:'text',required:true},
      {key:'organisateur',label:"Nom de l'organisateur",type:'text',required:true},
      {key:'type_evenement',label:"Type d'événement",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'cachet',label:"Cachet du DJ (FCFA)",type:'text',required:true},
      {key:'duree_prestation',label:"Durée de la prestation (heures)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE DJ POUR ÉVÉNEMENT</h1><p>Le DJ <strong>{{nom_dj}}</strong> s'engage à animer l'événement <strong>{{type_evenement}}</strong> organisé par <strong>{{organisateur}}</strong> le {{date_evenement}} pendant {{duree_prestation}} heure(s).</p><p>Cachet : {{cachet}} FCFA.</p></div>`
  },
  {
    code: 'cult_accord_photographie_artistique',
    name: "Accord de service de photographie artistique",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Contrat entre un photographe professionnel et un client pour une séance photo artistique, avec cession partielle des droits d'exploitation des images.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_photographe',label:"Nom du photographe",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'type_seance',label:"Type de séance photo",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_seance',label:"Date de la séance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE ARTISTIQUE</h1><p><strong>{{nom_photographe}}</strong> réalise une séance de {{type_seance}} pour <strong>{{nom_client}}</strong> le {{date_seance}}.</p><p>Honoraires : {{honoraires}} FCFA. Les images livrées peuvent être utilisées à titre personnel ; toute utilisation commerciale nécessite un accord complémentaire.</p></div>`
  },
  {
    code: 'cult_accord_mode_fashion_week',
    name: "Accord de service de mode et stylisme (fashion week)",
    category: 'association',
    price: 8000,
    priceMax: 24000,
    description: "Convention encadrant la participation d'un créateur ou styliste à une fashion week ou un défilé de mode en Afrique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'nom_createur',label:"Nom du créateur / styliste",type:'text',required:true},
      {key:'organisateur',label:"Organisateur de la fashion week",type:'text',required:true},
      {key:'nom_evenement',label:"Nom de l'événement",type:'text',required:true},
      {key:'date_defile',label:"Date du défilé",type:'date',required:true},
      {key:'cachetsupport',label:"Cachet ou soutien financier (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE MODE ET STYLISME</h1><p><strong>{{nom_createur}}</strong> présentera sa collection lors de <strong>{{nom_evenement}}</strong> organisé par <strong>{{organisateur}}</strong> le {{date_defile}}.</p><p>Soutien financier : {{cachetsupport}} FCFA.</p></div>`
  },
  {
    code: 'cult_accord_mannequin',
    name: "Accord de service de mannequin",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de prestation entre une agence ou un organisateur et un mannequin pour un défilé, une campagne publicitaire ou une séance photo.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'nom_mannequin',label:"Nom du mannequin",type:'text',required:true},
      {key:'agence_organisateur',label:"Agence ou organisateur",type:'text',required:true},
      {key:'type_prestation',label:"Type de prestation",type:'text',required:true},
      {key:'cachet',label:"Cachet (FCFA)",type:'text',required:true},
      {key:'date_prestation',label:"Date de la prestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MANNEQUIN</h1><p><strong>{{nom_mannequin}}</strong> effectue une prestation de {{type_prestation}} pour <strong>{{agence_organisateur}}</strong> le {{date_prestation}}.</p><p>Cachet : {{cachet}} FCFA. Le présent accord inclut la cession des droits à l'image pour la campagne concernée.</p></div>`
  },
  {
    code: 'cult_accord_licence_marque_artistique',
    name: "Accord de licence de marque artistique (merchandising)",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Accord autorisant l'exploitation commerciale de la marque ou de l'image d'un artiste sur des produits dérivés (merchandising).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_artiste',label:"Artiste / Titulaire de la marque",type:'text',required:true},
      {key:'licencie',label:"Licencié (fabricant / distributeur)",type:'text',required:true},
      {key:'produits_concernes',label:"Produits dérivés concernés",type:'textarea',required:true},
      {key:'redevance',label:"Redevance sur chiffre d'affaires (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la licence",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE MARQUE ARTISTIQUE (MERCHANDISING)</h1><p><strong>{{nom_artiste}}</strong> autorise <strong>{{licencie}}</strong> à commercialiser les produits dérivés suivants : {{produits_concernes}}.</p><p>Redevance : {{redevance}}% du chiffre d'affaires HT. Début : {{date_debut}}.</p></div>`
  },
  {
    code: 'cult_rapport_performance_festival',
    name: "Rapport de performance festival culturel",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Rapport de bilan d'un festival culturel destiné aux organisateurs, bailleurs de fonds et partenaires institutionnels.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'nom_festival',label:"Nom du festival",type:'text',required:true},
      {key:'edition',label:"Édition (ex: 5e édition 2025)",type:'text',required:true},
      {key:'bilan_artistique',label:"Bilan artistique et fréquentation",type:'textarea',required:true},
      {key:'bilan_financier',label:"Bilan financier résumé",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations pour l'édition suivante",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – {{nom_festival}} – {{edition}}</h1><h2>Bilan Artistique</h2><p>{{bilan_artistique}}</p><h2>Bilan Financier</h2><p>{{bilan_financier}}</p><h2>Recommandations</h2><p>{{recommandations}}</p></div>`
  },
  {
    code: 'cult_plan_developpement_industrie_culturelle',
    name: "Plan de développement industrie culturelle",
    category: 'association',
    price: 9000,
    priceMax: 27000,
    description: "Document de planification stratégique pour le développement de l'industrie culturelle et créative en Côte d'Ivoire ou dans un pays d'Afrique francophone.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      {key:'institution',label:"Institution ou organisation porteuse",type:'text',required:true},
      {key:'pays',label:"Pays / Région ciblé(e)",type:'text',required:true},
      {key:'axes_strategiques',label:"Axes stratégiques principaux",type:'textarea',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel (FCFA)",type:'text',required:true},
      {key:'horizon_temporel',label:"Horizon temporel du plan (ex: 2025-2030)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DE L'INDUSTRIE CULTURELLE</h1><p>Porté par <strong>{{institution}}</strong> pour {{pays}}. Horizon : {{horizon_temporel}}.</p><h2>Axes stratégiques</h2><p>{{axes_strategiques}}</p><h2>Budget prévisionnel</h2><p>{{budget_previsionnel}} FCFA</p></div>`
  },
  {
    code: 'cult_accord_partenariat_ministere_culture',
    name: "Accord de partenariat Ministère Culture-artiste",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Convention de partenariat entre le Ministère de la Culture et un artiste pour le soutien à la création et la promotion culturelle nationale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 69,
    fieldsJson: F([
      {key:'nom_artiste',label:"Nom de l'artiste",type:'text',required:true},
      {key:'discipline',label:"Discipline artistique",type:'text',required:true},
      {key:'projet_soutenu',label:"Projet culturel soutenu",type:'textarea',required:true},
      {key:'montant_soutien',label:"Montant du soutien (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT MINISTÈRE DE LA CULTURE – ARTISTE</h1><p>Le Ministère de la Culture et de la Francophonie soutient <strong>{{nom_artiste}}</strong> ({{discipline}}) dans le cadre du projet : {{projet_soutenu}}.</p><p>Montant du soutien : {{montant_soutien}} FCFA. Signé le {{date_signature}}.</p></div>`
  },
  {
    code: 'cult_charte_droits_artiste_afrique',
    name: "Charte des droits et devoirs de l'artiste en Afrique",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Charte de référence énonçant les droits fondamentaux et les obligations éthiques des artistes exerçant en Afrique francophone.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'nom_artiste',label:"Nom de l'artiste signataire",type:'text',required:true},
      {key:'discipline',label:"Discipline artistique",type:'text',required:true},
      {key:'pays',label:"Pays de résidence",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion à la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DES DROITS ET DEVOIRS DE L'ARTISTE EN AFRIQUE</h1><p>Je soussigné(e) <strong>{{nom_artiste}}</strong>, artiste en {{discipline}}, résidant en {{pays}}, adhère à la présente Charte le {{date_adhesion}}.</p><p>Je m'engage à respecter les droits d'auteur, à promouvoir les valeurs culturelles africaines, à exercer mon art avec intégrité et à contribuer au rayonnement de la culture africaine.</p></div>`
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
  console.log(`Batch 59a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
