import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates Infrastructures routières ───
  {
    code: 'rout_001', name: "Accord de service de construction de route bitumée (AGEROUTE CI)", category: 'btp_construction', price: 18000, priceMax: 54000,
    description: "Accord encadrant les prestations de construction de route bitumée conformément aux standards AGEROUTE Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entreprise_btp',label:"Entreprise BTP",type:'text',required:true},
      {key:'localisation_route',label:"Localisation / Axe routier",type:'text',required:true},
      {key:'longueur_km',label:"Longueur (km)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true},
      {key:'delai_execution',label:"Délai d'exécution (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSTRUCTION DE ROUTE BITUMÉE</h1><h2>(AGEROUTE CI)</h2><p>Entre le maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> et l'entreprise : <strong>{{entreprise_btp}}</strong>.</p><h3>Article 1 – Objet</h3><p>Le présent accord a pour objet la construction d'une route bitumée sur l'axe : {{localisation_route}}, d'une longueur de {{longueur_km}} km, conformément aux normes techniques de l'AGEROUTE Côte d'Ivoire.</p><h3>Article 2 – Durée</h3><p>Les travaux débuteront le {{date_debut}} pour une durée de {{delai_execution}} mois.</p><h3>Article 3 – Obligations des parties</h3><p>L'entreprise s'engage à réaliser les travaux dans les règles de l'art, dans le respect des délais contractuels et des normes environnementales en vigueur.</p><h3>Article 4 – Réception des travaux</h3><p>La réception provisoire sera prononcée après contrôle qualité par les services compétents de l'AGEROUTE CI.</p></div>`
  },
  {
    code: 'rout_002', name: "Accord de service de construction de route en terre", category: 'btp_construction', price: 10000, priceMax: 30000,
    description: "Accord de service pour la construction d'une route en terre, incluant terrassement, compactage et drainage de base.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entreprise_btp',label:"Entreprise BTP",type:'text',required:true},
      {key:'localisation_route',label:"Localisation / Axe",type:'text',required:true},
      {key:'longueur_km',label:"Longueur (km)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSTRUCTION DE ROUTE EN TERRE</h1><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Entreprise : <strong>{{entreprise_btp}}</strong>.</p><h3>Article 1 – Objet</h3><p>Construction d'une route en terre sur l'axe {{localisation_route}}, longueur : {{longueur_km}} km.</p><h3>Article 2 – Démarrage</h3><p>Date de démarrage prévue : {{date_debut}}.</p><h3>Article 3 – Normes techniques</h3><p>Les travaux comprennent le dégagement d'emprise, le terrassement général, le compactage des couches de fondation et la mise en place d'ouvrages de drainage élémentaires.</p><h3>Article 4 – Réception</h3><p>La réception est prononcée par le maître d'ouvrage sur la base d'un procès-verbal contradictoire.</p></div>`
  },
  {
    code: 'rout_003', name: "Accord de service d'entretien routier périodique", category: 'btp_construction', price: 8000, priceMax: 24000,
    description: "Accord cadre pour les prestations d'entretien routier périodique (reprofilage, rechargement, réparation structurelle).", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'reseau_concerne',label:"Réseau concerné",type:'text',required:true},
      {key:'lineaire_km',label:"Linéaire (km)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ENTRETIEN ROUTIER PÉRIODIQUE</h1><p>Prestataire : <strong>{{prestataire}}</strong> — Réseau : <strong>{{reseau_concerne}}</strong>.</p><h3>Article 1 – Objet</h3><p>Entretien périodique d'un linéaire de {{lineaire_km}} km à compter du {{date_debut}} pour une durée de {{duree_contrat}}.</p><h3>Article 2 – Prestations</h3><p>Les prestations comprennent le reprofilage, le rechargement en matériaux latéritiques, la réparation des dégradations structurelles et le nettoyage des ouvrages hydrauliques.</p><h3>Article 3 – Contrôle qualité</h3><p>Les travaux feront l'objet d'un suivi mensuel par le maître d'œuvre délégué.</p></div>`
  },
  {
    code: 'rout_004', name: "Accord de service d'entretien routier courant", category: 'btp_construction', price: 6000, priceMax: 18000,
    description: "Accord de service pour l'entretien routier courant (curage de fossés, fauchage, bouchage de nids de poule).", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'axe_routier',label:"Axe routier",type:'text',required:true},
      {key:'lineaire_km',label:"Linéaire (km)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ENTRETIEN ROUTIER COURANT</h1><p>Prestataire : <strong>{{prestataire}}</strong> — Axe : <strong>{{axe_routier}}</strong>.</p><h3>Article 1 – Objet</h3><p>Entretien courant du réseau routier sur {{lineaire_km}} km à compter du {{date_debut}}.</p><h3>Article 2 – Prestations courantes</h3><p>Fauchage des accotements, curage des fossés et caniveaux, bouchage de nids de poule, remplacement de panneaux de signalisation défectueux.</p><h3>Article 3 – Fréquence</h3><p>Les opérations d'entretien courant sont réalisées selon un programme mensuel validé par le maître d'ouvrage.</p></div>`
  },
  {
    code: 'rout_005', name: "Accord de service de réhabilitation de route", category: 'btp_construction', price: 14000, priceMax: 42000,
    description: "Accord de service pour la réhabilitation complète d'une route dégradée, incluant remise en état de la structure et des équipements.", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entreprise_btp',label:"Entreprise BTP",type:'text',required:true},
      {key:'axe_routier',label:"Axe routier",type:'text',required:true},
      {key:'lineaire_km',label:"Linéaire (km)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_marche',label:"Montant du marché (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉHABILITATION DE ROUTE</h1><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Entreprise : <strong>{{entreprise_btp}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réhabilitation de la route {{axe_routier}}, linéaire : {{lineaire_km}} km. Montant du marché : {{montant_marche}} FCFA.</p><h3>Article 2 – Démarrage</h3><p>Date de démarrage : {{date_debut}}.</p><h3>Article 3 – Portée des travaux</h3><p>Les travaux de réhabilitation couvrent la remise en état de la plate-forme, la reconstruction de la chaussée, la réfection des ouvrages de drainage et la pose de signalisation neuve.</p><h3>Article 4 – Garantie</h3><p>L'entreprise garantit les ouvrages pour une durée de cinq (5) ans à compter de la réception définitive.</p></div>`
  },
  {
    code: 'rout_006', name: "Accord de service de construction de pont", category: 'btp_construction', price: 20000, priceMax: 60000,
    description: "Accord de service pour la construction d'un ouvrage de franchissement (pont), conforme aux normes OHADA et aux standards du BNETD.", templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entreprise_btp',label:"Entreprise BTP",type:'text',required:true},
      {key:'localisation_pont',label:"Localisation du pont",type:'text',required:true},
      {key:'longueur_m',label:"Longueur de l'ouvrage (m)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSTRUCTION DE PONT</h1><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Entreprise : <strong>{{entreprise_btp}}</strong>.</p><h3>Article 1 – Objet</h3><p>Construction d'un pont situé à {{localisation_pont}}, d'une longueur de {{longueur_m}} m.</p><h3>Article 2 – Démarrage</h3><p>Démarrage prévu le {{date_debut}}.</p><h3>Article 3 – Normes applicables</h3><p>Les travaux seront réalisés conformément aux normes techniques du BNETD et aux règles de l'art en matière d'ouvrages d'art.</p><h3>Article 4 – Réception</h3><p>La réception provisoire intervient après vérification structurelle et essais de charge.</p></div>`
  },
  {
    code: 'rout_007', name: "Accord de service de réhabilitation de pont", category: 'btp_construction', price: 16000, priceMax: 48000,
    description: "Accord de service pour la réhabilitation d'un pont existant (renforcement, réfection du tablier, garde-corps).", templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entreprise_btp',label:"Entreprise BTP",type:'text',required:true},
      {key:'designation_pont',label:"Désignation du pont",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'delai_execution',label:"Délai d'exécution (semaines)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉHABILITATION DE PONT</h1><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Entreprise : <strong>{{entreprise_btp}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réhabilitation de l'ouvrage : {{designation_pont}}. Démarrage le {{date_debut}} pour une durée de {{delai_execution}} semaines.</p><h3>Article 2 – Travaux inclus</h3><p>Renforcement structurel des piles et culées, réfection du tablier, remplacement des garde-corps, reprise de l'étanchéité et réfection des joints de dilatation.</p><h3>Article 3 – Contrôle</h3><p>Un bureau de contrôle agréé assurera le suivi des travaux structurels.</p></div>`
  },
  {
    code: 'rout_008', name: "Accord de service de construction d'échangeur routier", category: 'btp_construction', price: 20000, priceMax: 60000,
    description: "Accord de service pour la conception et la construction d'un échangeur routier en milieu urbain (Abidjan).", templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entreprise_btp',label:"Entreprise BTP",type:'text',required:true},
      {key:'localisation',label:"Localisation de l'échangeur",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_marche',label:"Montant du marché (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSTRUCTION D'ÉCHANGEUR ROUTIER</h1><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Entreprise : <strong>{{entreprise_btp}}</strong>.</p><h3>Article 1 – Objet</h3><p>Construction d'un échangeur routier à {{localisation}}. Montant du marché : {{montant_marche}} FCFA. Démarrage : {{date_debut}}.</p><h3>Article 2 – Composantes</h3><p>Viaducs, bretelles d'accès et de sortie, aménagement des carrefours adjacents, signalisation horizontale et verticale, éclairage public.</p><h3>Article 3 – Coordination</h3><p>L'entreprise coordonnera ses interventions avec les concessionnaires de réseaux et les services de la ville d'Abidjan.</p></div>`
  },
  {
    code: 'rout_009', name: "Accord de service de construction de tunnel", category: 'btp_construction', price: 20000, priceMax: 60000,
    description: "Accord de service pour la réalisation de travaux de construction d'un tunnel routier en zone urbaine ou suburbaine.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entreprise_btp',label:"Entreprise BTP",type:'text',required:true},
      {key:'localisation_tunnel',label:"Localisation du tunnel",type:'text',required:true},
      {key:'longueur_m',label:"Longueur (m)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSTRUCTION DE TUNNEL</h1><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Entreprise : <strong>{{entreprise_btp}}</strong>.</p><h3>Article 1 – Objet</h3><p>Construction du tunnel {{localisation_tunnel}}, d'une longueur de {{longueur_m}} m. Démarrage : {{date_debut}}.</p><h3>Article 2 – Méthodes d'exécution</h3><p>Les méthodes de terrassement, de soutènement et de revêtement seront définies dans le Plan d'Assurance Qualité soumis avant le démarrage des travaux.</p><h3>Article 3 – Sécurité</h3><p>Un Plan Particulier de Sécurité et de Protection de la Santé (PPSPS) sera établi conformément à la réglementation ivoirienne.</p></div>`
  },
  {
    code: 'rout_010', name: "Accord de service de déport de réseaux (chaussée)", category: 'btp_construction', price: 8000, priceMax: 24000,
    description: "Accord de service pour le déplacement et la protection des réseaux concessionnaires (eau, électricité, télécom) lors de travaux routiers.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'concessionnaire',label:"Concessionnaire concerné",type:'text',required:true},
      {key:'axe_travaux',label:"Axe des travaux",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'delai_execution',label:"Délai d'exécution (jours)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPORT DE RÉSEAUX (CHAUSSÉE)</h1><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Concessionnaire : <strong>{{concessionnaire}}</strong>.</p><h3>Article 1 – Objet</h3><p>Déplacement et protection des réseaux existants sur l'axe {{axe_travaux}}. Démarrage : {{date_debut}} pour {{delai_execution}} jours.</p><h3>Article 2 – Responsabilités</h3><p>Le concessionnaire fournit les plans de récolement. L'entreprise est responsable de tout dommage causé aux réseaux non signalés.</p><h3>Article 3 – Coordination</h3><p>Une réunion de coordination hebdomadaire est organisée en présence de toutes les parties prenantes.</p></div>`
  },
  {
    code: 'rout_011', name: "Accord de service de signalisation routière horizontale", category: 'btp_construction', price: 6000, priceMax: 18000,
    description: "Accord de service pour la pose et le renouvellement de la signalisation horizontale (marquage au sol) sur voies urbaines et interurbaines.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'axe_routier',label:"Axe routier / Zone",type:'text',required:true},
      {key:'lineaire_km',label:"Linéaire à marquer (km)",type:'text',required:true},
      {key:'date_intervention',label:"Date d'intervention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SIGNALISATION ROUTIÈRE HORIZONTALE</h1><p>Prestataire : <strong>{{prestataire}}</strong> — Axe / Zone : <strong>{{axe_routier}}</strong>.</p><h3>Article 1 – Objet</h3><p>Pose et renouvellement du marquage au sol sur {{lineaire_km}} km. Date d'intervention : {{date_intervention}}.</p><h3>Article 2 – Prestations</h3><p>Lignes axiales, lignes de rive, passages piétons, zébras, flèches de direction, mentions peintes, conformément aux normes ivoiriennes de signalisation.</p><h3>Article 3 – Matériaux</h3><p>Peinture routière réflectorisée de classe II minimum, durée de vie garantie 24 mois.</p></div>`
  },
  {
    code: 'rout_012', name: "Accord de service de signalisation routière verticale", category: 'btp_construction', price: 6000, priceMax: 18000,
    description: "Accord de service pour la fourniture et pose de panneaux de signalisation verticale (danger, prescription, indication).", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'axe_routier',label:"Axe routier",type:'text',required:true},
      {key:'nombre_panneaux',label:"Nombre de panneaux",type:'text',required:true},
      {key:'date_pose',label:"Date de pose",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SIGNALISATION ROUTIÈRE VERTICALE</h1><p>Prestataire : <strong>{{prestataire}}</strong> — Axe : <strong>{{axe_routier}}</strong>.</p><h3>Article 1 – Objet</h3><p>Fourniture et pose de {{nombre_panneaux}} panneaux de signalisation verticale. Date de pose : {{date_pose}}.</p><h3>Article 2 – Catégories</h3><p>Panneaux de danger, de prescription (interdiction, obligation), d'indication, et panneaux de services, conformément au code de la route ivoirien.</p><h3>Article 3 – Garantie</h3><p>Les panneaux sont garantis en termes de réflectorisation classe 1 pendant 7 ans minimum.</p></div>`
  },
  {
    code: 'rout_013', name: "Accord de service de glissières de sécurité (barrières)", category: 'btp_construction', price: 7000, priceMax: 21000,
    description: "Accord de service pour la fourniture et la pose de glissières de sécurité métalliques sur routes nationales et voies express.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'axe_routier',label:"Axe routier",type:'text',required:true},
      {key:'lineaire_ml',label:"Linéaire (ml)",type:'text',required:true},
      {key:'date_pose',label:"Date de pose",type:'date',required:true},
      {key:'type_glissiere',label:"Type de glissière",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GLISSIÈRES DE SÉCURITÉ</h1><p>Prestataire : <strong>{{prestataire}}</strong> — Axe : <strong>{{axe_routier}}</strong>.</p><h3>Article 1 – Objet</h3><p>Fourniture et pose de {{lineaire_ml}} ml de glissières de type {{type_glissiere}}. Date de pose : {{date_pose}}.</p><h3>Article 2 – Normes</h3><p>Les glissières répondent aux normes NF EN 1317 relatives aux dispositifs de retenue routiers.</p><h3>Article 3 – Ancrage</h3><p>L'ancrage dans le sol est réalisé conformément aux prescriptions du fournisseur et aux recommandations du SETRA.</p></div>`
  },
  {
    code: 'rout_014', name: "Accord de service de drainage routier (fossés, caniveaux)", category: 'btp_construction', price: 7000, priceMax: 21000,
    description: "Accord de service pour la construction et la réhabilitation d'ouvrages de drainage routier (fossés, caniveaux, dalots).", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entreprise_btp',label:"Entreprise BTP",type:'text',required:true},
      {key:'axe_routier',label:"Axe routier",type:'text',required:true},
      {key:'lineaire_ml',label:"Linéaire (ml)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DRAINAGE ROUTIER</h1><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Entreprise : <strong>{{entreprise_btp}}</strong>.</p><h3>Article 1 – Objet</h3><p>Construction et réhabilitation de fossés et caniveaux sur l'axe {{axe_routier}}, linéaire : {{lineaire_ml}} ml. Démarrage : {{date_debut}}.</p><h3>Article 2 – Travaux</h3><p>Terrassement, coffrage et bétonnage des fossés en béton armé, pose de dalots, réfection des descentes d'eau et des exutoires.</p><h3>Article 3 – Maintenance</h3><p>Le prestataire assure la maintenance des ouvrages pendant 12 mois après réception.</p></div>`
  },
  {
    code: 'rout_015', name: "Accord de service de géotechnique routière (études de sol)", category: 'btp_construction', price: 10000, priceMax: 30000,
    description: "Accord de service pour la réalisation d'études géotechniques préalables à la construction ou réhabilitation routière.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'bureau_etude',label:"Bureau d'étude géotechnique",type:'text',required:true},
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'axe_routier',label:"Axe routier / Zone d'étude",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement de l'étude",type:'date',required:true},
      {key:'delai_remise',label:"Délai de remise du rapport (semaines)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GÉOTECHNIQUE ROUTIÈRE</h1><p>Bureau d'étude : <strong>{{bureau_etude}}</strong> — Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réalisation d'études de sol sur l'axe {{axe_routier}}. Lancement : {{date_lancement}}. Rapport attendu sous {{delai_remise}} semaines.</p><h3>Article 2 – Prestations</h3><p>Sondages et forages, essais en laboratoire (CBR, Proctor, granulométrie, limites d'Atterberg), cartographie géotechnique et recommandations pour la structure de chaussée.</p><h3>Article 3 – Rapport</h3><p>Le rapport géotechnique est établi en trois (3) exemplaires et transmis au maître d'ouvrage.</p></div>`
  },
  {
    code: 'rout_016', name: "Accord de service de topographie routière", category: 'btp_construction', price: 8000, priceMax: 24000,
    description: "Accord de service pour les levés topographiques et implantation d'axes routiers dans le cadre de projets de construction ou réhabilitation.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'bureau_topographe',label:"Bureau de topographie",type:'text',required:true},
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'axe_routier',label:"Axe routier",type:'text',required:true},
      {key:'longueur_km',label:"Longueur (km)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des levés",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TOPOGRAPHIE ROUTIÈRE</h1><p>Bureau de topographie : <strong>{{bureau_topographe}}</strong> — Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong>.</p><h3>Article 1 – Objet</h3><p>Levés topographiques et implantation de l'axe {{axe_routier}}, longueur : {{longueur_km}} km. Début des levés : {{date_debut}}.</p><h3>Article 2 – Prestations</h3><p>Levés planimétriques et altimétriques, profils en long et en travers, calcul de cubatures, établissement des plans d'exécution.</p><h3>Article 3 – Livrables</h3><p>Plans au format numérique (DWG/SHP) et papier, rapport de calcul et fichiers de points en projection UTM.</p></div>`
  },
  {
    code: 'rout_017', name: "Accord de service de contrôle de qualité travaux routiers (LNB CI)", category: 'btp_construction', price: 10000, priceMax: 30000,
    description: "Accord de service confiant au Laboratoire National du Bâtiment (LNB CI) le contrôle de qualité des matériaux et travaux routiers.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'axe_routier',label:"Axe routier",type:'text',required:true},
      {key:'nature_travaux',label:"Nature des travaux",type:'text',required:true},
      {key:'date_debut_controle',label:"Date de début du contrôle",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONTRÔLE DE QUALITÉ TRAVAUX ROUTIERS</h1><h2>(LNB CI)</h2><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong>.</p><h3>Article 1 – Objet</h3><p>Le Laboratoire National du Bâtiment de Côte d'Ivoire (LNB CI) est mandaté pour le contrôle de qualité des travaux de {{nature_travaux}} sur l'axe {{axe_routier}}. Début du contrôle : {{date_debut_controle}}.</p><h3>Article 2 – Missions</h3><p>Prélèvements et essais contradictoires sur les matériaux, contrôle de compactage (densité en place), essais de portance (CBR), contrôle des bétons, rédaction de procès-verbaux d'essais.</p><h3>Article 3 – Rapports</h3><p>Le LNB CI remet des rapports périodiques hebdomadaires et un rapport de fin de mission.</p></div>`
  },
  {
    code: 'rout_018', name: "Accord de service de supervision travaux routiers (BNETD)", category: 'btp_construction', price: 12000, priceMax: 36000,
    description: "Accord de service confiant au BNETD la mission de supervision et de maîtrise d'œuvre déléguée de travaux routiers.", templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'axe_routier',label:"Axe routier",type:'text',required:true},
      {key:'montant_travaux',label:"Montant des travaux (FCFA)",type:'text',required:true},
      {key:'date_debut_mission',label:"Date de début de mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUPERVISION TRAVAUX ROUTIERS</h1><h2>(BNETD)</h2><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong>.</p><h3>Article 1 – Objet</h3><p>Le Bureau National d'Études Techniques et de Développement (BNETD) est chargé de la supervision et de la maîtrise d'œuvre déléguée des travaux de l'axe {{axe_routier}}, d'un montant de {{montant_travaux}} FCFA. Démarrage de mission : {{date_debut_mission}}.</p><h3>Article 2 – Missions</h3><p>Visa des études d'exécution, contrôle des travaux, approbation des situations de travaux, participation aux réunions de chantier, réception provisoire et définitive.</p><h3>Article 3 – Honoraires</h3><p>Les honoraires de supervision sont calculés selon le barème BNETD en vigueur.</p></div>`
  },
  {
    code: 'rout_019', name: "Accord de concession d'autoroute (péage)", category: 'btp_construction', price: 20000, priceMax: 60000,
    description: "Accord de concession autoroutière avec droit de percevoir des droits de péage, conforme au droit OHADA et à la législation ivoirienne.", templateType: 'pdf', classe: 'A', active: true, popularity: 86,
    fieldsJson: F([
      {key:'autorite_concedante',label:"Autorité concédante",type:'text',required:true},
      {key:'concessionnaire',label:"Concessionnaire",type:'text',required:true},
      {key:'axe_autoroute',label:"Axe autoroutier",type:'text',required:true},
      {key:'duree_concession',label:"Durée de la concession (ans)",type:'text',required:true},
      {key:'date_entree_vigueur',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCESSION D'AUTOROUTE (PÉAGE)</h1><p>Autorité concédante : <strong>{{autorite_concedante}}</strong> — Concessionnaire : <strong>{{concessionnaire}}</strong>.</p><h3>Article 1 – Objet</h3><p>Concession pour l'exploitation de l'autoroute {{axe_autoroute}} avec droit de perception de droits de péage. Durée : {{duree_concession}} ans à compter du {{date_entree_vigueur}}.</p><h3>Article 2 – Obligations du concessionnaire</h3><p>Entretien et exploitation de l'infrastructure, perception des droits de péage selon le barème approuvé, reversement de la redevance de concession à l'État.</p><h3>Article 3 – Fin de concession</h3><p>À l'expiration, l'infrastructure est remise à l'État en bon état d'entretien, sans indemnité.</p></div>`
  },
  {
    code: 'rout_020', name: "Accord de service de pesage routier (surcharge)", category: 'btp_construction', price: 6000, priceMax: 18000,
    description: "Accord de service pour l'exploitation de stations de pesage routier et le contrôle des véhicules en surcharge.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'autorite_mandante',label:"Autorité mandante",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'localisation_station',label:"Localisation de la station",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PESAGE ROUTIER (SURCHARGE)</h1><p>Autorité mandante : <strong>{{autorite_mandante}}</strong> — Prestataire : <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Objet</h3><p>Exploitation de la station de pesage de {{localisation_station}}. Démarrage : {{date_debut}}.</p><h3>Article 2 – Missions</h3><p>Pesage des véhicules poids lourds, constatation des infractions de surcharge, délivrance de reçus officiels, transmission des données statistiques.</p><h3>Article 3 – Reversements</h3><p>Les amendes perçues sont reversées au Trésor Public selon les délais fixés par l'autorité mandante.</p></div>`
  },
  {
    code: 'rout_021', name: "Rapport de performance route nationale", category: 'btp_construction', price: 5000, priceMax: 15000,
    description: "Modèle de rapport annuel de performance pour la gestion et l'entretien des routes nationales en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'direction_routes',label:"Direction des routes",type:'text',required:true},
      {key:'axe_routier',label:"Axe routier",type:'text',required:true},
      {key:'annee_rapport',label:"Année du rapport",type:'text',required:true},
      {key:'responsable',label:"Responsable de la rédaction",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE ROUTE NATIONALE</h1><p>Direction : <strong>{{direction_routes}}</strong> — Axe : <strong>{{axe_routier}}</strong> — Année : <strong>{{annee_rapport}}</strong>.</p><h3>1. Introduction</h3><p>Le présent rapport de performance est établi par {{responsable}} en date du {{date_rapport}}.</p><h3>2. État du réseau</h3><p>Description de l'état général de la route nationale, longueur en bon état, longueur dégradée, ouvrages d'art concernés.</p><h3>3. Travaux réalisés</h3><p>Récapitulatif des travaux d'entretien courant et périodique exécutés au cours de l'exercice.</p><h3>4. Indicateurs de performance</h3><p>IRI moyen, taux de linéaire en bon état, taux d'exécution budgétaire, accidents liés à l'état de la route.</p><h3>5. Recommandations</h3><p>Priorisation des interventions pour l'exercice suivant.</p></div>`
  },
  {
    code: 'rout_022', name: "Plan pluriannuel d'entretien routier", category: 'btp_construction', price: 8000, priceMax: 24000,
    description: "Modèle de plan pluriannuel d'entretien routier (PPER) pour la programmation sur 3 à 5 ans des interventions sur le réseau.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'direction_routes',label:"Direction responsable",type:'text',required:true},
      {key:'reseau_concerne',label:"Réseau concerné",type:'text',required:true},
      {key:'periode',label:"Période couverte (ex: 2025-2029)",type:'text',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN PLURIANNUEL D'ENTRETIEN ROUTIER</h1><p>Direction : <strong>{{direction_routes}}</strong> — Réseau : <strong>{{reseau_concerne}}</strong> — Période : <strong>{{periode}}</strong>.</p><h3>1. Contexte</h3><p>Plan validé le {{date_validation}} dans le cadre de la politique nationale d'entretien routier.</p><h3>2. Inventaire du réseau</h3><p>Linéaire total, répartition par type de revêtement, état actuel, trafic moyen journalier.</p><h3>3. Programme annuel d'entretien</h3><p>Tableau des interventions planifiées par axe, par type de travaux et par enveloppe budgétaire.</p><h3>4. Besoins financiers</h3><p>Estimation des besoins annuels et sources de financement (FER, budget national, bailleurs).</p><h3>5. Suivi et évaluation</h3><p>Indicateurs de suivi, fréquence des révisions du plan.</p></div>`
  },
  {
    code: 'rout_023', name: "Accord de service de réhabilitation de piste agricole", category: 'btp_construction', price: 7000, priceMax: 21000,
    description: "Accord de service pour la réhabilitation de pistes rurales et agricoles afin d'améliorer l'accessibilité des zones de production.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entreprise_btp',label:"Entreprise BTP",type:'text',required:true},
      {key:'localisation_piste',label:"Localisation de la piste",type:'text',required:true},
      {key:'longueur_km',label:"Longueur (km)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉHABILITATION DE PISTE AGRICOLE</h1><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Entreprise : <strong>{{entreprise_btp}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réhabilitation de la piste agricole de {{localisation_piste}}, longueur : {{longueur_km}} km. Démarrage : {{date_debut}}.</p><h3>Article 2 – Travaux</h3><p>Dégagement de l'emprise, reprofilage, rechargement en latérite, construction de buses et franchissements, aménagement des chasse-roues.</p><h3>Article 3 – Bénéficiaires</h3><p>Les communautés agricoles riveraines seront consultées lors de la réception des travaux.</p></div>`
  },
  {
    code: 'rout_024', name: "Accord de partenariat AGEROUTE-entreprise de BTP", category: 'btp_construction', price: 10000, priceMax: 30000,
    description: "Accord de partenariat stratégique entre l'AGEROUTE Côte d'Ivoire et une entreprise de BTP pour le développement d'un programme routier.", templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'representant_ageroute',label:"Représentant AGEROUTE",type:'text',required:true},
      {key:'entreprise_btp',label:"Entreprise BTP partenaire",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT AGEROUTE — ENTREPRISE DE BTP</h1><p>AGEROUTE CI représentée par : <strong>{{representant_ageroute}}</strong> — Partenaire : <strong>{{entreprise_btp}}</strong>.</p><h3>Article 1 – Objet</h3><p>{{objet_partenariat}}</p><h3>Article 2 – Durée</h3><p>Le partenariat prend effet le {{date_signature}} pour une durée de {{duree_partenariat}} ans renouvelable.</p><h3>Article 3 – Engagements des parties</h3><p>AGEROUTE CI : accès aux marchés, accompagnement technique, partage d'informations. L'entreprise : respect des normes qualité, formation du personnel, transfert de compétences.</p><h3>Article 4 – Gouvernance</h3><p>Un comité de pilotage paritaire se réunit trimestriellement pour évaluer l'avancement du partenariat.</p></div>`
  },
  {
    code: 'rout_025', name: "Charte de la qualité des travaux routiers", category: 'btp_construction', price: 5000, priceMax: 15000,
    description: "Charte d'engagement qualité entre le maître d'ouvrage, le maître d'œuvre et l'entreprise pour des travaux routiers conformes aux normes.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'maitre_oeuvre',label:"Maître d'œuvre",type:'text',required:true},
      {key:'entreprise_btp',label:"Entreprise BTP",type:'text',required:true},
      {key:'projet_routier',label:"Projet routier concerné",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA QUALITÉ DES TRAVAUX ROUTIERS</h1><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Maître d'œuvre : <strong>{{maitre_oeuvre}}</strong> — Entreprise : <strong>{{entreprise_btp}}</strong>.</p><h3>Préambule</h3><p>La présente charte, signée le {{date_signature}}, formalise les engagements communs des parties en matière de qualité pour le projet : {{projet_routier}}.</p><h3>Engagement 1 – Qualité des matériaux</h3><p>Tous les matériaux utilisés feront l'objet d'essais de réception avant mise en œuvre.</p><h3>Engagement 2 – Qualité d'exécution</h3><p>Les travaux sont réalisés selon les règles de l'art et les normes techniques en vigueur en Côte d'Ivoire.</p><h3>Engagement 3 – Transparence</h3><p>Les procès-verbaux d'essais et de contrôle sont accessibles à toutes les parties signataires.</p></div>`
  },

  // ─── 25 templates Transport fluvial/Maritime ───
  {
    code: 'flu_001', name: "Accord de service de transport fluvial (lagune Ébrié)", category: 'transport_logistique', price: 6000, priceMax: 18000,
    description: "Accord de service pour le transport de personnes ou de marchandises sur la lagune Ébrié d'Abidjan.", templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'transporteur',label:"Transporteur fluvial",type:'text',required:true},
      {key:'client',label:"Client / Donneur d'ordre",type:'text',required:true},
      {key:'trajet',label:"Trajet (départ — arrivée)",type:'text',required:true},
      {key:'frequence',label:"Fréquence de service",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT FLUVIAL</h1><h2>(Lagune Ébrié — Abidjan)</h2><p>Transporteur : <strong>{{transporteur}}</strong> — Client : <strong>{{client}}</strong>.</p><h3>Article 1 – Objet</h3><p>Transport fluvial sur le trajet {{trajet}} selon la fréquence {{frequence}}. Démarrage : {{date_debut}}.</p><h3>Article 2 – Conditions de transport</h3><p>Le transporteur s'engage à respecter les capacités de charge autorisées, les règles de sécurité lagunaire et les horaires convenus.</p><h3>Article 3 – Responsabilité</h3><p>Le transporteur est responsable des marchandises ou personnes transportées de l'embarquement au débarquement.</p></div>`
  },
  {
    code: 'flu_002', name: "Accord de service de bac de traversée (ferry fluvial)", category: 'transport_logistique', price: 7000, priceMax: 21000,
    description: "Accord de service pour l'exploitation d'un service de bac de traversée fluviale (ferry) reliant deux rives.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'exploitant',label:"Exploitant du bac",type:'text',required:true},
      {key:'autorite_mandante',label:"Autorité mandante",type:'text',required:true},
      {key:'point_traversee',label:"Point de traversée",type:'text',required:true},
      {key:'capacite_vehicules',label:"Capacité (véhicules)",type:'text',required:true},
      {key:'date_debut',label:"Date de début d'exploitation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BAC DE TRAVERSÉE (FERRY FLUVIAL)</h1><p>Exploitant : <strong>{{exploitant}}</strong> — Autorité mandante : <strong>{{autorite_mandante}}</strong>.</p><h3>Article 1 – Objet</h3><p>Exploitation du service de ferry au point de traversée : {{point_traversee}}, capacité : {{capacite_vehicules}} véhicules. Démarrage : {{date_debut}}.</p><h3>Article 2 – Service</h3><p>Service journalier de 6h00 à 22h00, avec priorité aux véhicules d'urgence. Tarifs fixés par l'autorité mandante.</p><h3>Article 3 – Sécurité</h3><p>L'exploitant maintient les équipements de sauvetage à bord et forme son personnel aux procédures d'urgence.</p></div>`
  },
  {
    code: 'flu_003', name: "Accord de service de pirogue motorisée (transport lagunaire)", category: 'transport_logistique', price: 4000, priceMax: 12000,
    description: "Accord encadrant le service de transport lagunaire par pirogue motorisée pour les passagers des quartiers lacustres d'Abidjan.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'conducteur_pirogue',label:"Conducteur de pirogue",type:'text',required:true},
      {key:'association',label:"Association / Groupement",type:'text',required:true},
      {key:'trajet',label:"Trajet desservi",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PIROGUE MOTORISÉE</h1><h2>(Transport lagunaire)</h2><p>Conducteur : <strong>{{conducteur_pirogue}}</strong> — Association : <strong>{{association}}</strong>.</p><h3>Article 1 – Objet</h3><p>Service de transport lagunaire par pirogue motorisée sur le trajet {{trajet}} à compter du {{date_debut}}.</p><h3>Article 2 – Sécurité</h3><p>Port du gilet de sauvetage obligatoire. Capacité maximale affichée à bord. Interdiction de naviguer par mauvais temps.</p><h3>Article 3 – Tarification</h3><p>Les tarifs sont affichés à quai et ne peuvent être modifiés sans accord de l'association.</p></div>`
  },
  {
    code: 'flu_004', name: "Accord de service de navire fluvial de fret", category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Accord de service pour le transport de fret par navire fluvial, applicable aux voies navigables et lagunes ivoiriennes.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'armateur',label:"Armateur / Transporteur",type:'text',required:true},
      {key:'chargeur',label:"Chargeur / Client",type:'text',required:true},
      {key:'nature_fret',label:"Nature du fret",type:'text',required:true},
      {key:'tonnage',label:"Tonnage (tonnes)",type:'text',required:true},
      {key:'date_chargement',label:"Date de chargement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NAVIRE FLUVIAL DE FRET</h1><p>Armateur : <strong>{{armateur}}</strong> — Chargeur : <strong>{{chargeur}}</strong>.</p><h3>Article 1 – Objet</h3><p>Transport de {{tonnage}} tonnes de {{nature_fret}}. Date de chargement : {{date_chargement}}.</p><h3>Article 2 – Responsabilité</h3><p>L'armateur est responsable du fret de l'embarquement jusqu'à la livraison au port de déchargement.</p><h3>Article 3 – Assurance</h3><p>Le fret doit être couvert par une assurance transport dont l'attestation est remise avant l'embarquement.</p></div>`
  },
  {
    code: 'flu_005', name: "Accord de service de dragage de voie navigable", category: 'transport_logistique', price: 14000, priceMax: 42000,
    description: "Accord de service pour les travaux de dragage d'entretien ou de création d'une voie navigable (lagune, canal, fleuve).", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entreprise_dragage',label:"Entreprise de dragage",type:'text',required:true},
      {key:'voie_navigable',label:"Voie navigable",type:'text',required:true},
      {key:'volume_m3',label:"Volume à draguer (m³)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DRAGAGE DE VOIE NAVIGABLE</h1><p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Entreprise : <strong>{{entreprise_dragage}}</strong>.</p><h3>Article 1 – Objet</h3><p>Dragage de {{volume_m3}} m³ sur la voie navigable {{voie_navigable}}. Démarrage : {{date_debut}}.</p><h3>Article 2 – Techniques</h3><p>Dragage par suceuse refoulante ou drague à benne, dépôt des sédiments en zone agréée par l'autorité environnementale.</p><h3>Article 3 – Environnement</h3><p>Une étude d'impact environnemental est obligatoire avant le démarrage des travaux.</p></div>`
  },
  {
    code: 'flu_006', name: "Accord de service de balisage de voie navigable", category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Accord de service pour la mise en place et l'entretien du balisage lumineux et non lumineux sur une voie navigable.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'autorite_portuaire',label:"Autorité portuaire / fluviale",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'voie_navigable',label:"Voie navigable",type:'text',required:true},
      {key:'nombre_balises',label:"Nombre de balises",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BALISAGE DE VOIE NAVIGABLE</h1><p>Autorité : <strong>{{autorite_portuaire}}</strong> — Prestataire : <strong>{{prestataire}}</strong>.</p><h3>Article 1 – Objet</h3><p>Pose et entretien de {{nombre_balises}} balises sur la voie {{voie_navigable}}. Démarrage : {{date_debut}}.</p><h3>Article 2 – Normes</h3><p>Le balisage est conforme aux prescriptions de l'AISM (Association Internationale de Signalisation Maritime) et aux instructions de la capitainerie.</p><h3>Article 3 – Maintenance</h3><p>Inspection mensuelle des balises, remplacement sous 48h en cas de défaillance signalée.</p></div>`
  },
  {
    code: 'flu_007', name: "Accord de service de port fluvial (terminal)", category: 'transport_logistique', price: 12000, priceMax: 36000,
    description: "Accord de service pour l'exploitation d'un terminal de port fluvial (manutention, stockage, accostage).", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'gestionnaire_port',label:"Gestionnaire du port",type:'text',required:true},
      {key:'operateur_terminal',label:"Opérateur du terminal",type:'text',required:true},
      {key:'localisation_port',label:"Localisation du port",type:'text',required:true},
      {key:'date_debut',label:"Date de prise en charge",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PORT FLUVIAL (TERMINAL)</h1><p>Gestionnaire : <strong>{{gestionnaire_port}}</strong> — Opérateur : <strong>{{operateur_terminal}}</strong>.</p><h3>Article 1 – Objet</h3><p>Exploitation du terminal portuaire de {{localisation_port}} à compter du {{date_debut}} pour {{duree_contrat}} ans.</p><h3>Article 2 – Prestations</h3><p>Accostage des navires, manutention des marchandises, gestion des aires de stockage, services aux équipages.</p><h3>Article 3 – Redevances</h3><p>L'opérateur verse au gestionnaire les redevances de concession définies à l'annexe tarifaire.</p></div>`
  },
  {
    code: 'flu_008', name: "Accord de service de port de pêche (quai)", category: 'transport_logistique', price: 7000, priceMax: 21000,
    description: "Accord de service pour la gestion et l'exploitation d'un quai de port de pêche artisanale ou industrielle.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'gestionnaire',label:"Gestionnaire du quai",type:'text',required:true},
      {key:'cooperative_pecheurs',label:"Coopérative de pêcheurs",type:'text',required:true},
      {key:'localisation',label:"Localisation du quai",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PORT DE PÊCHE (QUAI)</h1><p>Gestionnaire : <strong>{{gestionnaire}}</strong> — Coopérative : <strong>{{cooperative_pecheurs}}</strong>.</p><h3>Article 1 – Objet</h3><p>Gestion du quai de pêche de {{localisation}} à compter du {{date_debut}}.</p><h3>Article 2 – Services</h3><p>Mise à disposition des quais d'accostage, de la criée, des installations de conservation du poisson, de l'approvisionnement en carburant et en glace.</p><h3>Article 3 – Redevances</h3><p>Les droits de quai sont fixés par accord entre les parties et révisables annuellement.</p></div>`
  },
  {
    code: 'flu_009', name: "Accord de service de port sec (dry port)", category: 'transport_logistique', price: 12000, priceMax: 36000,
    description: "Accord de service pour l'exploitation d'un port sec (plateforme logistique intérieure) en connexion avec le Port Autonome d'Abidjan.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'gestionnaire_paa',label:"Représentant PAA",type:'text',required:true},
      {key:'operateur_port_sec',label:"Opérateur du port sec",type:'text',required:true},
      {key:'localisation',label:"Localisation du port sec",type:'text',required:true},
      {key:'date_debut',label:"Date de début d'exploitation",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PORT SEC (DRY PORT)</h1><p>PAA : <strong>{{gestionnaire_paa}}</strong> — Opérateur : <strong>{{operateur_port_sec}}</strong>.</p><h3>Article 1 – Objet</h3><p>Exploitation de la plateforme logistique intérieure (port sec) de {{localisation}}. Démarrage : {{date_debut}}. Durée : {{duree_contrat}}.</p><h3>Article 2 – Connexion PAA</h3><p>Le port sec est relié au PAA par corridor ferroviaire ou routier dédié, permettant la dépotation et le dédouanement des conteneurs en dehors du port maritime.</p><h3>Article 3 – Services</h3><p>Réception et livraison de conteneurs, dépotage, entreposage sous douane, pesage, inspection phytosanitaire.</p></div>`
  },
  {
    code: 'flu_010', name: "Accord de service de shipchandler (avitaillement navire)", category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Accord de service entre un shipchandler et un armateur pour l'avitaillement en provisions, carburant et consommables d'un navire.", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'shipchandler',label:"Shipchandler",type:'text',required:true},
      {key:'armateur',label:"Armateur / Agent maritime",type:'text',required:true},
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'date_escale',label:"Date d'escale prévue",type:'date',required:true},
      {key:'port_escale',label:"Port d'escale",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SHIPCHANDLER</h1><h2>(Avitaillement navire)</h2><p>Shipchandler : <strong>{{shipchandler}}</strong> — Armateur : <strong>{{armateur}}</strong>.</p><h3>Article 1 – Objet</h3><p>Avitaillement du navire {{nom_navire}} lors de son escale au port {{port_escale}} prévue le {{date_escale}}.</p><h3>Article 2 – Prestations</h3><p>Fourniture de vivres, eau potable, huiles moteur, pièces de rechange courantes, matériaux d'entretien et articles sanitaires selon la liste de commande validée.</p><h3>Article 3 – Livraison</h3><p>Livraison à bord dans un délai maximum de 4 heures après confirmation de commande, accompagnée de bons de livraison signés.</p></div>`
  },
  {
    code: 'flu_011', name: "Accord de service d'agence maritime", category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Accord de service entre un armateur et une agence maritime pour la représentation et la gestion des escales au port d'Abidjan.", templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'armateur',label:"Armateur",type:'text',required:true},
      {key:'agence_maritime',label:"Agence maritime",type:'text',required:true},
      {key:'port_representation',label:"Port de représentation",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true},
      {key:'commission',label:"Taux de commission (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AGENCE MARITIME</h1><p>Armateur : <strong>{{armateur}}</strong> — Agence maritime : <strong>{{agence_maritime}}</strong>.</p><h3>Article 1 – Objet</h3><p>L'agence {{agence_maritime}} représente l'armateur au port de {{port_representation}} à compter du {{date_debut}}.</p><h3>Article 2 – Missions</h3><p>Gestion des escales, formalités douanières et portuaires, coordination du chargement et déchargement, recouvrement du fret, émission des connaissements.</p><h3>Article 3 – Rémunération</h3><p>Commission de {{commission}}% sur le fret perçu, plus frais de débours remboursés sur justificatifs.</p></div>`
  },
  {
    code: 'flu_012', name: "Accord de service de capitainerie (pilotage portuaire)", category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Accord de service de pilotage portuaire pour l'assistance obligatoire à l'entrée, la sortie et les mouvements de navires dans le port.", templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'capitainerie',label:"Capitainerie du port",type:'text',required:true},
      {key:'armateur_agent',label:"Armateur / Agent maritime",type:'text',required:true},
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'date_mouvement',label:"Date du mouvement",type:'date',required:true},
      {key:'type_mouvement',label:"Type de mouvement (entrée/sortie/déhalage)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CAPITAINERIE</h1><h2>(Pilotage portuaire)</h2><p>Capitainerie : <strong>{{capitainerie}}</strong> — Armateur / Agent : <strong>{{armateur_agent}}</strong>.</p><h3>Article 1 – Objet</h3><p>Pilotage obligatoire du navire {{nom_navire}} pour {{type_mouvement}} prévu le {{date_mouvement}}.</p><h3>Article 2 – Déroulement</h3><p>Le pilote de port est embarqué au poste de pilotage et assiste le commandant pour les manœuvres portuaires jusqu'à l'amarrage.</p><h3>Article 3 – Droits de pilotage</h3><p>Les droits de pilotage sont calculés selon le jauge brut du navire et le barème en vigueur au port.</p></div>`
  },
  {
    code: 'flu_013', name: "Accord de service de remorqueur portuaire", category: 'transport_logistique', price: 9000, priceMax: 27000,
    description: "Accord de service pour la mise à disposition d'un remorqueur portuaire lors des manœuvres de navires dans le port d'Abidjan.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'prestataire_remorquage',label:"Prestataire de remorquage",type:'text',required:true},
      {key:'armateur_agent',label:"Armateur / Agent maritime",type:'text',required:true},
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'date_prestation',label:"Date de la prestation",type:'date',required:true},
      {key:'puissance_tbp',label:"Puissance du remorqueur (TBP)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REMORQUEUR PORTUAIRE</h1><p>Prestataire : <strong>{{prestataire_remorquage}}</strong> — Armateur / Agent : <strong>{{armateur_agent}}</strong>.</p><h3>Article 1 – Objet</h3><p>Mise à disposition d'un remorqueur de {{puissance_tbp}} TBP pour les manœuvres du navire {{nom_navire}} le {{date_prestation}}.</p><h3>Article 2 – Conditions</h3><p>Le remorqueur est disponible 30 minutes avant l'heure de la manœuvre. Toute annulation tardive (moins de 2h) est facturée à 50%.</p><h3>Article 3 – Responsabilité</h3><p>La responsabilité du remorqueur est limitée aux dommages causés par faute prouvée de son équipage.</p></div>`
  },
  {
    code: 'flu_014', name: "Accord de service de lamanage (amarrage)", category: 'transport_logistique', price: 6000, priceMax: 18000,
    description: "Accord de service de lamanage pour l'amarrage et le désamarrage des navires à quai dans les ports ivoiriens.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prestataire_lamanage',label:"Prestataire de lamanage",type:'text',required:true},
      {key:'armateur_agent',label:"Armateur / Agent maritime",type:'text',required:true},
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'quai_accostage',label:"Quai d'accostage",type:'text',required:true},
      {key:'date_prestation',label:"Date de la prestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LAMANAGE (AMARRAGE)</h1><p>Prestataire : <strong>{{prestataire_lamanage}}</strong> — Armateur / Agent : <strong>{{armateur_agent}}</strong>.</p><h3>Article 1 – Objet</h3><p>Service de lamanage (amarrage/désamarrage) du navire {{nom_navire}} au {{quai_accostage}} le {{date_prestation}}.</p><h3>Article 2 – Prestations</h3><p>Réception des aussières à quai, amarrage sur bollards, veille des amarres pendant l'escale, largage lors du départ.</p><h3>Article 3 – Tarification</h3><p>Droits de lamanage calculés selon le barème portuaire officiel en vigueur.</p></div>`
  },
  {
    code: 'flu_015', name: "Accord de service de lavage et nettoyage de navire", category: 'transport_logistique', price: 5000, priceMax: 15000,
    description: "Accord de service pour le nettoyage des cales, pont et superstructures d'un navire en escale dans un port ivoirien.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de nettoyage",type:'text',required:true},
      {key:'armateur_agent',label:"Armateur / Agent maritime",type:'text',required:true},
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'date_intervention',label:"Date d'intervention",type:'date',required:true},
      {key:'zones_nettoyage',label:"Zones à nettoyer",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LAVAGE ET NETTOYAGE DE NAVIRE</h1><p>Prestataire : <strong>{{prestataire}}</strong> — Armateur / Agent : <strong>{{armateur_agent}}</strong>.</p><h3>Article 1 – Objet</h3><p>Nettoyage du navire {{nom_navire}} le {{date_intervention}}.</p><h3>Article 2 – Zones concernées</h3><p>{{zones_nettoyage}}</p><h3>Article 3 – Environnement</h3><p>Les eaux de lavage et déchets sont collectés et traités conformément aux exigences de la convention MARPOL et des autorités portuaires.</p></div>`
  },
  {
    code: 'flu_016', name: "Accord de service de dégazage et déballastage", category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Accord de service pour les opérations de dégazage de citernes et de déballastage de navires en conformité avec la convention MARPOL.", templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire spécialisé",type:'text',required:true},
      {key:'armateur_agent',label:"Armateur / Agent maritime",type:'text',required:true},
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'date_operation',label:"Date de l'opération",type:'date',required:true},
      {key:'volume_m3',label:"Volume traité (m³)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉGAZAGE ET DÉBALLASTAGE</h1><p>Prestataire : <strong>{{prestataire}}</strong> — Armateur / Agent : <strong>{{armateur_agent}}</strong>.</p><h3>Article 1 – Objet</h3><p>Opérations de dégazage et déballastage du navire {{nom_navire}}, volume : {{volume_m3}} m³. Date : {{date_operation}}.</p><h3>Article 2 – Conformité MARPOL</h3><p>Les opérations sont réalisées dans le strict respect de la convention MARPOL 73/78 et des instructions de la capitainerie du port.</p><h3>Article 3 – Certification</h3><p>Un certificat de dégazage/déballastage est délivré à l'issue des opérations et consigné dans le livre de bord huileux.</p></div>`
  },
  {
    code: 'flu_017', name: "Accord de service de réparation navale (chantier naval)", category: 'transport_logistique', price: 14000, priceMax: 42000,
    description: "Accord de service pour la réalisation de travaux de réparation navale en cale sèche ou à quai dans un chantier naval ivoirien.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'chantier_naval',label:"Chantier naval",type:'text',required:true},
      {key:'armateur',label:"Armateur propriétaire",type:'text',required:true},
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'nature_reparation',label:"Nature des réparations",type:'textarea',required:true},
      {key:'date_entree_cale',label:"Date d'entrée en cale sèche",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉPARATION NAVALE</h1><h2>(Chantier naval)</h2><p>Chantier naval : <strong>{{chantier_naval}}</strong> — Armateur : <strong>{{armateur}}</strong>.</p><h3>Article 1 – Objet</h3><p>Réparation du navire {{nom_navire}} entré en cale sèche le {{date_entree_cale}}.</p><h3>Article 2 – Nature des réparations</h3><p>{{nature_reparation}}</p><h3>Article 3 – Garantie</h3><p>Le chantier naval garantit les réparations effectuées pour une durée de 12 mois à compter de la remise du navire à l'armateur.</p></div>`
  },
  {
    code: 'flu_018', name: "Accord de service de classification de navire (Bureau Veritas)", category: 'transport_logistique', price: 12000, priceMax: 36000,
    description: "Accord de service entre un armateur et Bureau Veritas pour la classification et la visite périodique d'un navire.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'armateur',label:"Armateur",type:'text',required:true},
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'type_navire',label:"Type de navire",type:'text',required:true},
      {key:'date_visite',label:"Date de visite de classification",type:'date',required:true},
      {key:'port_visite',label:"Port de visite",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CLASSIFICATION DE NAVIRE</h1><h2>(Bureau Veritas)</h2><p>Armateur : <strong>{{armateur}}</strong> — Navire : <strong>{{nom_navire}}</strong> ({{type_navire}}).</p><h3>Article 1 – Objet</h3><p>Visite de classification du navire {{nom_navire}} à {{port_visite}} le {{date_visite}}.</p><h3>Article 2 – Portée de la visite</h3><p>Visite de coque, machines, équipements de sécurité et systèmes électriques selon les règles de classification Bureau Veritas en vigueur.</p><h3>Article 3 – Certificats</h3><p>Les certificats de classe sont délivrés après levée de toutes les remarques obligatoires.</p></div>`
  },
  {
    code: 'flu_019', name: "Accord de service de formation en navigation maritime", category: 'transport_logistique', price: 7000, priceMax: 21000,
    description: "Accord de service entre un centre de formation maritime et un armateur ou opérateur pour la formation des gens de mer.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'centre_formation',label:"Centre de formation maritime",type:'text',required:true},
      {key:'employeur',label:"Armateur / Employeur",type:'text',required:true},
      {key:'intitule_formation',label:"Intitulé de la formation",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN NAVIGATION MARITIME</h1><p>Centre de formation : <strong>{{centre_formation}}</strong> — Employeur : <strong>{{employeur}}</strong>.</p><h3>Article 1 – Objet</h3><p>Formation {{intitule_formation}} pour {{nombre_stagiaires}} stagiaires. Démarrage : {{date_debut}}.</p><h3>Article 2 – Programme</h3><p>La formation est dispensée conformément aux exigences de la convention internationale STCW et agréée par l'autorité maritime ivoirienne.</p><h3>Article 3 – Certification</h3><p>Un certificat reconnu au niveau national et international est délivré à chaque stagiaire ayant satisfait aux évaluations.</p></div>`
  },
  {
    code: 'flu_020', name: "Accord de convention de transport maritime (charte-partie)", category: 'transport_logistique', price: 14000, priceMax: 42000,
    description: "Charte-partie (contrat d'affrètement) conforme au droit OHADA pour le transport de fret maritime entre un fréteur et un affréteur.", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'freteur',label:"Fréteur (armateur)",type:'text',required:true},
      {key:'affreteur',label:"Affréteur",type:'text',required:true},
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'port_chargement',label:"Port de chargement",type:'text',required:true},
      {key:'port_dechargement',label:"Port de déchargement",type:'text',required:true},
      {key:'date_mise_disposition',label:"Date de mise à disposition",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE-PARTIE</h1><h2>(Convention de transport maritime)</h2><p>Fréteur : <strong>{{freteur}}</strong> — Affréteur : <strong>{{affreteur}}</strong>.</p><h3>Article 1 – Navire</h3><p>Le fréteur met à disposition de l'affréteur le navire {{nom_navire}} à compter du {{date_mise_disposition}}.</p><h3>Article 2 – Voyage</h3><p>Port de chargement : {{port_chargement}} — Port de déchargement : {{port_dechargement}}.</p><h3>Article 3 – Fret</h3><p>Le fret est payable au moment du chargement. Surestaries calculées à compter du dépassement du délai de planche convenu.</p><h3>Article 4 – Droit applicable</h3><p>Le présent contrat est régi par le droit OHADA et les conventions internationales applicables au transport maritime.</p></div>`
  },
  {
    code: 'flu_021', name: "Accord de transport maritime à la ligne régulière (bill of lading)", category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Modèle de connaissement maritime (bill of lading) pour le transport de marchandises à la ligne régulière depuis ou vers les ports ivoiriens.", templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'armateur_ligne',label:"Armateur de ligne",type:'text',required:true},
      {key:'chargeur',label:"Chargeur",type:'text',required:true},
      {key:'destinataire',label:"Destinataire",type:'text',required:true},
      {key:'description_marchandise',label:"Description de la marchandise",type:'textarea',required:true},
      {key:'date_chargement',label:"Date de chargement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONNAISSEMENT MARITIME (BILL OF LADING)</h1><h2>(Transport à la ligne régulière)</h2><p>Armateur : <strong>{{armateur_ligne}}</strong> — Chargeur : <strong>{{chargeur}}</strong> — Destinataire : <strong>{{destinataire}}</strong>.</p><h3>1. Marchandise</h3><p>{{description_marchandise}}</p><h3>2. Date de chargement</h3><p>{{date_chargement}}</p><h3>3. Conditions de transport</h3><p>Le transport est effectué selon les conditions générales de l'armateur, sous réserve des règles de La Haye-Visby applicables au commerce international.</p><h3>4. Livraison</h3><p>La marchandise sera délivrée au destinataire ou à son représentant désigné contre présentation de l'original du présent connaissement.</p></div>`
  },
  {
    code: 'flu_022', name: "Rapport de performance trafic portuaire", category: 'transport_logistique', price: 6000, priceMax: 18000,
    description: "Modèle de rapport annuel de performance du trafic portuaire pour le Port Autonome d'Abidjan ou tout autre port ivoirien.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'port_concerne',label:"Port concerné",type:'text',required:true},
      {key:'annee_rapport',label:"Année du rapport",type:'text',required:true},
      {key:'directeur_port',label:"Directeur général du port",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE TRAFIC PORTUAIRE</h1><p>Port : <strong>{{port_concerne}}</strong> — Année : <strong>{{annee_rapport}}</strong>.</p><h3>1. Présentation</h3><p>Rapport établi par le Directeur Général {{directeur_port}} le {{date_rapport}}.</p><h3>2. Trafic global</h3><p>Volume total de marchandises (tonnes), nombre de navires reçus, nombre de conteneurs traités (EVP), trafic de vrac solide, vrac liquide, marchandises diverses.</p><h3>3. Indicateurs de performance</h3><p>Productivité à quai, temps d'attente moyen, taux d'occupation des postes à quai, temps de rotation des navires.</p><h3>4. Évolution annuelle</h3><p>Comparaison avec l'exercice précédent, analyse des tendances, part de marché régional.</p><h3>5. Perspectives</h3><p>Projets d'investissement, objectifs de l'exercice suivant.</p></div>`
  },
  {
    code: 'flu_023', name: "Plan de développement port fluvial", category: 'transport_logistique', price: 10000, priceMax: 30000,
    description: "Modèle de plan de développement stratégique pour un port fluvial ou lagunaire en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'autorite_portuaire',label:"Autorité portuaire",type:'text',required:true},
      {key:'port_fluvial',label:"Nom du port fluvial",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (ex: 2025-2030)",type:'text',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT PORT FLUVIAL</h1><p>Autorité portuaire : <strong>{{autorite_portuaire}}</strong> — Port : <strong>{{port_fluvial}}</strong> — Période : <strong>{{horizon_plan}}</strong>.</p><h3>1. Diagnostic</h3><p>État des infrastructures existantes, analyse du trafic actuel, identification des contraintes et opportunités.</p><h3>2. Orientations stratégiques</h3><p>Modernisation des quais, extension des capacités de stockage, développement des services aux navires, amélioration de la connectivité terrestre.</p><h3>3. Programme d'investissements</h3><p>Projets prioritaires, montants estimatifs, sources de financement, calendrier de réalisation.</p><h3>4. Gouvernance</h3><p>Modèle de gestion, partenariats public-privé envisagés.</p><h3>5. Validation</h3><p>Plan approuvé le {{date_validation}}.</p></div>`
  },
  {
    code: 'flu_024', name: "Accord de partenariat PAA-opérateur", category: 'transport_logistique', price: 14000, priceMax: 42000,
    description: "Accord de partenariat stratégique entre le Port Autonome d'Abidjan (PAA) et un opérateur privé pour le développement de services portuaires.", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'representant_paa',label:"Représentant PAA",type:'text',required:true},
      {key:'operateur_prive',label:"Opérateur privé partenaire",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PAA — OPÉRATEUR</h1><p>Port Autonome d'Abidjan représenté par : <strong>{{representant_paa}}</strong> — Opérateur : <strong>{{operateur_prive}}</strong>.</p><h3>Article 1 – Objet</h3><p>{{objet_partenariat}}</p><h3>Article 2 – Durée</h3><p>Partenariat conclu le {{date_signature}} pour {{duree_partenariat}} ans renouvelable par accord exprès.</p><h3>Article 3 – Engagements du PAA</h3><p>Mise à disposition des infrastructures portuaires, accompagnement réglementaire, facilitation des procédures douanières.</p><h3>Article 4 – Engagements de l'opérateur</h3><p>Investissements convenus, respect des normes de sécurité et environnementales, paiement des redevances contractuelles.</p></div>`
  },
  {
    code: 'flu_025', name: "Charte du transport maritime durable", category: 'transport_logistique', price: 5000, priceMax: 15000,
    description: "Charte d'engagement pour un transport maritime respectueux de l'environnement, conforme aux objectifs de l'OMI et aux politiques ivoiriennes.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'signataire_principal',label:"Signataire principal",type:'text',required:true},
      {key:'autres_signataires',label:"Autres signataires",type:'textarea',required:false},
      {key:'port_ancrage',label:"Port d'ancrage",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU TRANSPORT MARITIME DURABLE</h1><p>Signataire principal : <strong>{{signataire_principal}}</strong> — Port : <strong>{{port_ancrage}}</strong>.</p><h3>Préambule</h3><p>Signée le {{date_signature}}, la présente charte formalise les engagements des acteurs du transport maritime pour un secteur plus respectueux de l'environnement.</p><h3>Engagement 1 – Réduction des émissions</h3><p>Les signataires s'engagent à réduire progressivement leurs émissions de GES conformément à la stratégie de l'OMI visant une décarbonation de 50% à l'horizon 2050.</p><h3>Engagement 2 – Gestion des déchets</h3><p>Zéro rejet de déchets plastiques en mer. Utilisation des installations portuaires de réception des déchets.</p><h3>Engagement 3 – Formation</h3><p>Formation annuelle de l'ensemble du personnel navigant aux bonnes pratiques environnementales.</p><h3>Autres signataires</h3><p>{{autres_signataires}}</p></div>`
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
  console.log(`Batch 81a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
