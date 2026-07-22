import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  {
    code: 'scm_prestataire_3pl',
    name: "Contrat de prestataire logistique (3PL)",
    category: 'transport_logistique',
    price: 8000,
    priceMax: 24000,
    description: "Contrat encadrant la délégation complète des opérations logistiques à un prestataire tiers (stockage, transport, préparation de commandes).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'nom_donneur_ordre',label:"Nom du donneur d'ordre",type:'text',required:true},
      {key:'nom_prestataire_3pl',label:"Nom du prestataire 3PL",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat (mois)",type:'text',required:true},
      {key:'perimetre_prestations',label:"Périmètre des prestations",type:'textarea',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRESTATAIRE LOGISTIQUE (3PL)</h1><p>Entre <strong>{{nom_donneur_ordre}}</strong> (ci-après le Donneur d'ordre) et <strong>{{nom_prestataire_3pl}}</strong> (ci-après le Prestataire 3PL), il est convenu ce qui suit :</p><h2>Article 1 – Objet</h2><p>Le Prestataire s'engage à fournir des services logistiques complets incluant : {{perimetre_prestations}}</p><h2>Article 2 – Durée</h2><p>Le présent contrat prend effet le {{date_debut}} pour une durée de {{duree_contrat}} mois, renouvelable par tacite reconduction.</p><h2>Article 3 – Rémunération</h2><p>Le Donneur d'ordre versera au Prestataire la somme mensuelle de {{montant_mensuel}} FCFA, payable le 5 de chaque mois.</p><h2>Article 4 – Obligations du Prestataire</h2><p>Le Prestataire s'engage à respecter les niveaux de service convenus, à maintenir les infrastructures en bon état et à fournir des rapports mensuels de performance.</p><h2>Article 5 – Droit applicable</h2><p>Le présent contrat est soumis au droit OHADA et aux lois en vigueur en Côte d'Ivoire.</p><p><br/>Fait en deux exemplaires originaux.</p><p>Signature Donneur d'ordre : _________________ Signature Prestataire : _________________</p></div>`
  },
  {
    code: 'scm_prestataire_4pl',
    name: "Accord de prestataire logistique (4PL)",
    category: 'transport_logistique',
    price: 10000,
    priceMax: 30000,
    description: "Accord de pilotage de l'ensemble de la chaîne logistique par un intégrateur 4PL, coordinateur de tous les prestataires.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_integrateur_4pl',label:"Nom de l'intégrateur 4PL",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true},
      {key:'perimetre_gestion',label:"Périmètre de gestion logistique",type:'textarea',required:true},
      {key:'honoraires_annuels',label:"Honoraires annuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRESTATAIRE LOGISTIQUE (4PL)</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_integrateur_4pl}}</strong>, il est convenu :</p><h2>Article 1 – Mission 4PL</h2><p>L'Intégrateur assume la coordination globale de la supply chain du Client : {{perimetre_gestion}}</p><h2>Article 2 – Date d'effet</h2><p>L'accord prend effet le {{date_prise_effet}}.</p><h2>Article 3 – Rémunération</h2><p>Les honoraires annuels s'élèvent à {{honoraires_annuels}} FCFA.</p><h2>Article 4 – Responsabilités</h2><p>L'Intégrateur sélectionne, coordonne et évalue tous les prestataires logistiques pour le compte du Client.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_gestion_entrepot',
    name: "Contrat de gestion d'entrepôt",
    category: 'transport_logistique',
    price: 7000,
    priceMax: 21000,
    description: "Contrat de gestion opérationnelle d'un entrepôt logistique incluant réception, stockage et expédition des marchandises.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_proprietaire',label:"Nom du propriétaire/mandant",type:'text',required:true},
      {key:'nom_gestionnaire',label:"Nom du gestionnaire d'entrepôt",type:'text',required:true},
      {key:'adresse_entrepot',label:"Adresse de l'entrepôt",type:'text',required:true},
      {key:'superficie',label:"Superficie (m²)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_gestion',label:"Tarif mensuel de gestion (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GESTION D'ENTREPOT</h1><p><strong>{{nom_proprietaire}}</strong> (Mandant) confie la gestion de son entrepôt situé à <strong>{{adresse_entrepot}}</strong> (superficie : {{superficie}} m²) à <strong>{{nom_gestionnaire}}</strong> (Gestionnaire).</p><h2>Article 1 – Missions du Gestionnaire</h2><p>Réception des marchandises, contrôle qualité, stockage, gestion des stocks, préparation et expédition des commandes.</p><h2>Article 2 – Date d'entrée en vigueur</h2><p>Le {{date_debut}}.</p><h2>Article 3 – Rémunération</h2><p>{{tarif_gestion}} FCFA par mois.</p><h2>Article 4 – Inventaire</h2><p>Un inventaire contradictoire est réalisé trimestriellement.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_centre_distribution',
    name: "Accord d'exploitation de centre de distribution",
    category: 'transport_logistique',
    price: 12000,
    priceMax: 36000,
    description: "Accord pour l'exploitation d'un centre de distribution régional en Afrique de l'Ouest.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_exploitant',label:"Nom de l'exploitant",type:'text',required:true},
      {key:'nom_mandant',label:"Nom du mandant/donneur d'ordre",type:'text',required:true},
      {key:'localisation_centre',label:"Localisation du centre de distribution",type:'text',required:true},
      {key:'date_ouverture',label:"Date d'ouverture",type:'date',required:true},
      {key:'zones_couverts',label:"Zones géographiques couvertes",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'EXPLOITATION DE CENTRE DE DISTRIBUTION</h1><p>Entre <strong>{{nom_mandant}}</strong> et <strong>{{nom_exploitant}}</strong>, pour le centre situé à <strong>{{localisation_centre}}</strong>.</p><h2>Article 1 – Objet</h2><p>L'Exploitant assure le fonctionnement du centre de distribution couvrant les zones suivantes : {{zones_couverts}}</p><h2>Article 2 – Ouverture</h2><p>Le centre ouvre le {{date_ouverture}}.</p><h2>Article 3 – Obligations</h2><p>Respect des délais de livraison, maintien d'un taux de service minimum de 98%, reporting hebdomadaire.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_preparation_commandes',
    name: "Contrat de service de préparation de commandes",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de sous-traitance de la préparation et du colisage des commandes clients.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'volume_commandes',label:"Volume mensuel estimé de commandes",type:'text',required:true},
      {key:'tarif_par_commande',label:"Tarif par commande préparée (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE PREPARATION DE COMMANDES</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_prestataire}}</strong>, il est convenu :</p><h2>Article 1 – Objet</h2><p>Le Prestataire assure la préparation, le contrôle et le colisage des commandes du Client.</p><h2>Article 2 – Volume et tarif</h2><p>Volume mensuel estimé : {{volume_commandes}} commandes. Tarif unitaire : {{tarif_par_commande}} FCFA.</p><h2>Article 3 – Date d'effet</h2><p>Le {{date_debut}}.</p><h2>Article 4 – Qualité</h2><p>Taux d'erreur maximal toléré : 0,5% des commandes préparées.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_cross_docking',
    name: "Accord de service de cross-docking",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Accord pour la mise en place d'un service de cross-docking permettant le transfert direct des marchandises sans stockage.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_operateur',label:"Nom de l'opérateur cross-docking",type:'text',required:true},
      {key:'plateforme_localisation',label:"Localisation de la plateforme",type:'text',required:true},
      {key:'delai_transit',label:"Délai de transit maximal (heures)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CROSS-DOCKING</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_operateur}}</strong>, pour la plateforme de <strong>{{plateforme_localisation}}</strong>.</p><h2>Article 1 – Objet</h2><p>L'Opérateur assure le transbordement direct des marchandises sans stockage intermédiaire.</p><h2>Article 2 – Délai de transit</h2><p>Les marchandises doivent être réexpédiées dans un délai maximal de {{delai_transit}} heures.</p><h2>Article 3 – Prise d'effet</h2><p>Le {{date_debut}}.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_conditionnement_repackaging',
    name: "Contrat de service de conditionnement/repackaging",
    category: 'transport_logistique',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de prestation de reconditionnement et repackaging de produits pour la distribution locale.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'nom_donneur_ordre',label:"Nom du donneur d'ordre",type:'text',required:true},
      {key:'nom_prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'description_produits',label:"Description des produits à reconditionner",type:'textarea',required:true},
      {key:'tarif_unitaire',label:"Tarif unitaire de reconditionnement (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE CONDITIONNEMENT ET REPACKAGING</h1><p>Entre <strong>{{nom_donneur_ordre}}</strong> et <strong>{{nom_prestataire}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire assure le reconditionnement des produits suivants : {{description_produits}}</p><h2>Article 2 – Tarification</h2><p>Tarif unitaire : {{tarif_unitaire}} FCFA.</p><h2>Article 3 – Prise d'effet</h2><p>Le {{date_debut}}.</p><h2>Article 4 – Qualité</h2><p>Le Prestataire garantit la conformité des emballages aux normes en vigueur.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_colisage_international',
    name: "Accord de service de colisage international",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Accord pour la prestation de colisage et palettisation de marchandises destinées à l'export international.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'nom_exportateur',label:"Nom de l'exportateur",type:'text',required:true},
      {key:'nom_prestataire',label:"Nom du prestataire de colisage",type:'text',required:true},
      {key:'pays_destination',label:"Pays de destination",type:'text',required:true},
      {key:'normes_emballage',label:"Normes d'emballage applicables",type:'textarea',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COLISAGE INTERNATIONAL</h1><p>Entre <strong>{{nom_exportateur}}</strong> et <strong>{{nom_prestataire}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire assure le colisage des marchandises destinées à {{pays_destination}} selon les normes suivantes : {{normes_emballage}}</p><h2>Article 2 – Responsabilité</h2><p>Le Prestataire est responsable de la conformité des colis jusqu'à remise au transporteur.</p><h2>Article 3 – Date</h2><p>Conclu le {{date_contrat}}.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_transport_multimodal',
    name: "Contrat de transport multimodal",
    category: 'transport_logistique',
    price: 9000,
    priceMax: 27000,
    description: "Contrat de transport multimodal combinant route, rail et mer pour l'acheminement de marchandises en Afrique de l'Ouest.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 77,
    fieldsJson: F([
      {key:'nom_expediteur',label:"Nom de l'expéditeur",type:'text',required:true},
      {key:'nom_transporteur',label:"Nom de l'opérateur de transport multimodal",type:'text',required:true},
      {key:'origine',label:"Lieu d'origine",type:'text',required:true},
      {key:'destination',label:"Lieu de destination",type:'text',required:true},
      {key:'description_marchandises',label:"Description des marchandises",type:'textarea',required:true},
      {key:'delai_livraison',label:"Délai de livraison (jours)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRANSPORT MULTIMODAL</h1><p>Entre <strong>{{nom_expediteur}}</strong> et <strong>{{nom_transporteur}}</strong> (Opérateur de Transport Multimodal - OTM).</p><h2>Article 1 – Objet</h2><p>L'OTM s'engage à acheminer les marchandises suivantes : {{description_marchandises}}</p><h2>Article 2 – Itinéraire</h2><p>De <strong>{{origine}}</strong> à <strong>{{destination}}</strong> par combinaison de modes de transport.</p><h2>Article 3 – Délai</h2><p>Livraison garantie sous {{delai_livraison}} jours ouvrables.</p><h2>Article 4 – Responsabilité</h2><p>L'OTM est responsable des marchandises de la prise en charge à la livraison finale, conformément aux règles CNUCED/CCI.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_gestion_flotte',
    name: "Accord de gestion de flotte de véhicules",
    category: 'transport_logistique',
    price: 7000,
    priceMax: 21000,
    description: "Accord de gestion externalisée d'une flotte de véhicules de livraison incluant maintenance et suivi.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'nom_proprietaire_flotte',label:"Nom du propriétaire de flotte",type:'text',required:true},
      {key:'nom_gestionnaire_flotte',label:"Nom du gestionnaire de flotte",type:'text',required:true},
      {key:'nombre_vehicules',label:"Nombre de véhicules",type:'text',required:true},
      {key:'types_vehicules',label:"Types de véhicules",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE FLOTTE DE VEHICULES</h1><p>Entre <strong>{{nom_proprietaire_flotte}}</strong> et <strong>{{nom_gestionnaire_flotte}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>Gestion de {{nombre_vehicules}} véhicules : {{types_vehicules}}</p><h2>Article 2 – Missions</h2><p>Planification des tournées, suivi des maintenances, gestion des conducteurs, optimisation des coûts carburant, reporting mensuel.</p><h2>Article 3 – Prise d'effet</h2><p>Le {{date_debut}}.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_geolocalisation_flotte',
    name: "Contrat de service de géolocalisation flotte",
    category: 'transport_logistique',
    price: 3000,
    priceMax: 9000,
    description: "Contrat d'installation et de gestion d'un système de géolocalisation GPS pour flotte de véhicules.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_fournisseur_gps',label:"Nom du fournisseur de solution GPS",type:'text',required:true},
      {key:'nombre_vehicules_equipes',label:"Nombre de véhicules équipés",type:'text',required:true},
      {key:'cout_mensuel',label:"Coût mensuel par véhicule (FCFA)",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE GEOLOCALISATION FLOTTE</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_fournisseur_gps}}</strong>.</p><h2>Article 1 – Objet</h2><p>Installation de boitiers GPS sur {{nombre_vehicules_equipes}} véhicules et fourniture d'une plateforme de suivi en temps réel.</p><h2>Article 2 – Tarif</h2><p>{{cout_mensuel}} FCFA par véhicule par mois.</p><h2>Article 3 – Installation</h2><p>Réalisée le {{date_installation}}.</p><h2>Article 4 – Données</h2><p>Les données de géolocalisation restent la propriété exclusive du Client.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_gestion_stocks_wms',
    name: "Accord de service de gestion des stocks (WMS)",
    category: 'transport_logistique',
    price: 8000,
    priceMax: 24000,
    description: "Accord de mise en place et exploitation d'un Warehouse Management System (WMS) pour la gestion des stocks.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 71,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_editeur_wms',label:"Nom de l'éditeur/intégrateur WMS",type:'text',required:true},
      {key:'nom_solution_wms',label:"Nom de la solution WMS",type:'text',required:true},
      {key:'nombre_references',label:"Nombre de références gérées",type:'text',required:true},
      {key:'date_mise_en_service',label:"Date de mise en service",type:'date',required:true},
      {key:'cout_annuel',label:"Coût annuel de licence et maintenance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES STOCKS (WMS)</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_editeur_wms}}</strong>, pour la solution <strong>{{nom_solution_wms}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>Gestion de {{nombre_references}} références produits dans le WMS.</p><h2>Article 2 – Mise en service</h2><p>Le {{date_mise_en_service}}.</p><h2>Article 3 – Coût</h2><p>{{cout_annuel}} FCFA par an (licence + maintenance + support).</p><h2>Article 4 – Formation</h2><p>L'Editeur assure la formation initiale des utilisateurs et fournit la documentation.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_gestion_commandes_oms',
    name: "Contrat de service de gestion des commandes (OMS)",
    category: 'transport_logistique',
    price: 7000,
    priceMax: 21000,
    description: "Contrat de mise en place d'un Order Management System (OMS) pour la centralisation et le suivi des commandes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_prestataire_oms',label:"Nom du prestataire OMS",type:'text',required:true},
      {key:'canaux_vente',label:"Canaux de vente intégrés",type:'textarea',required:true},
      {key:'volume_commandes_mensuel',label:"Volume mensuel de commandes",type:'text',required:true},
      {key:'date_go_live',label:"Date de Go-Live",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE GESTION DES COMMANDES (OMS)</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_prestataire_oms}}</strong>.</p><h2>Article 1 – Objet</h2><p>Mise en place d'un OMS intégrant les canaux suivants : {{canaux_vente}}</p><h2>Article 2 – Volume</h2><p>Volume mensuel estimé : {{volume_commandes_mensuel}} commandes.</p><h2>Article 3 – Go-Live</h2><p>Le {{date_go_live}}.</p><h2>Article 4 – SLA</h2><p>Disponibilité du système garantie à 99,5% hors maintenance planifiée.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_ecommerce_fulfillment',
    name: "Accord de prestataire e-commerce fulfillment",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Accord de fulfillment e-commerce incluant stockage, préparation, expédition et gestion des retours pour boutiques en ligne.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      {key:'nom_marchand',label:"Nom du marchand e-commerce",type:'text',required:true},
      {key:'nom_fulfillment',label:"Nom du prestataire fulfillment",type:'text',required:true},
      {key:'plateformes_vente',label:"Plateformes de vente (ex: Jumia, site propre)",type:'text',required:true},
      {key:'tarif_preparation',label:"Tarif préparation par colis (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRESTATAIRE E-COMMERCE FULFILLMENT</h1><p>Entre <strong>{{nom_marchand}}</strong> et <strong>{{nom_fulfillment}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire assure le fulfillment complet des commandes issues de : {{plateformes_vente}}</p><h2>Article 2 – Services inclus</h2><p>Réception des stocks, stockage, préparation et expédition des colis, gestion des retours, rapports de stock quotidiens.</p><h2>Article 3 – Tarification</h2><p>{{tarif_preparation}} FCFA par colis préparé et expédié.</p><h2>Article 4 – Prise d'effet</h2><p>Le {{date_debut}}.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_retours_reverse_logistics',
    name: "Contrat de service de retours produits (reverse logistics)",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de gestion de la logistique inverse : collecte, tri, reconditionnement ou destruction des produits retournés.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 57,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_prestataire',label:"Nom du prestataire de reverse logistics",type:'text',required:true},
      {key:'taux_retour_estime',label:"Taux de retour estimé (%)",type:'text',required:true},
      {key:'procedure_traitement',label:"Procédure de traitement des retours",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE RETOURS PRODUITS (REVERSE LOGISTICS)</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_prestataire}}</strong>.</p><h2>Article 1 – Objet</h2><p>Gestion des flux retours avec un taux estimé à {{taux_retour_estime}}% du volume expédié.</p><h2>Article 2 – Procédure</h2><p>{{procedure_traitement}}</p><h2>Article 3 – Prise d'effet</h2><p>Le {{date_debut}}.</p><h2>Article 4 – Traçabilité</h2><p>Chaque retour fait l'objet d'un bon de retour numéroté et d'un rapport mensuel.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_planification_demande_sop',
    name: "Accord de service de planification de la demande (S&OP)",
    category: 'transport_logistique',
    price: 9000,
    priceMax: 27000,
    description: "Accord de mise en place d'un processus S&OP (Sales and Operations Planning) pour aligner la demande et la supply chain.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 61,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_cabinet_conseil',label:"Nom du cabinet conseil S&OP",type:'text',required:true},
      {key:'horizon_planification',label:"Horizon de planification (mois)",type:'text',required:true},
      {key:'frequence_revue',label:"Fréquence des revues S&OP",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PLANIFICATION DE LA DEMANDE (S&OP)</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_cabinet_conseil}}</strong>.</p><h2>Article 1 – Objet</h2><p>Mise en place et animation du processus S&OP sur un horizon de {{horizon_planification}} mois.</p><h2>Article 2 – Fréquence</h2><p>Revues S&OP {{frequence_revue}}.</p><h2>Article 3 – Lancement</h2><p>Le {{date_lancement}}.</p><h2>Article 4 – Livrables</h2><p>Plan de demande consolidé, plan d'approvisionnement, plan de production, tableau de bord S&OP mensuel.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_suivi_livraison_tracking',
    name: "Contrat de service de suivi de livraison (tracking)",
    category: 'transport_logistique',
    price: 3000,
    priceMax: 9000,
    description: "Contrat de fourniture d'une solution de tracking en temps réel des livraisons pour les clients finaux.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client (transporteur/e-commerçant)",type:'text',required:true},
      {key:'nom_fournisseur_tracking',label:"Nom du fournisseur de tracking",type:'text',required:true},
      {key:'volume_colis_mensuel',label:"Volume mensuel de colis trackés",type:'text',required:true},
      {key:'cout_par_colis',label:"Coût par colis tracké (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE SUIVI DE LIVRAISON (TRACKING)</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_fournisseur_tracking}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fourniture d'une solution de tracking temps réel pour {{volume_colis_mensuel}} colis par mois.</p><h2>Article 2 – Tarif</h2><p>{{cout_par_colis}} FCFA par colis tracké.</p><h2>Article 3 – Prise d'effet</h2><p>Le {{date_debut}}.</p><h2>Article 4 – Notifications</h2><p>Le client final reçoit des notifications SMS/email à chaque étape de livraison.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_chaine_froid_cold_chain',
    name: "Accord de service de chaine du froid (cold chain)",
    category: 'transport_logistique',
    price: 10000,
    priceMax: 30000,
    description: "Accord de maintien de la chaîne du froid pour le transport et le stockage de produits pharmaceutiques ou alimentaires.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 69,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_operateur_froid',label:"Nom de l'opérateur cold chain",type:'text',required:true},
      {key:'type_produits',label:"Type de produits (pharmaceutiques/alimentaires/autres)",type:'text',required:true},
      {key:'plage_temperature',label:"Plage de température requise (°C)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'zones_distribution',label:"Zones de distribution",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CHAINE DU FROID (COLD CHAIN)</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_operateur_froid}}</strong>.</p><h2>Article 1 – Objet</h2><p>Maintien de la chaîne du froid pour les produits suivants : {{type_produits}}</p><h2>Article 2 – Température</h2><p>Plage de température requise : {{plage_temperature}} °C en permanence.</p><h2>Article 3 – Zones</h2><p>{{zones_distribution}}</p><h2>Article 4 – Prise d'effet</h2><p>Le {{date_debut}}.</p><h2>Article 5 – Traçabilité</h2><p>Enregistrement continu des températures avec rapport d'alerte automatique en cas de rupture de chaîne.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_packaging_durable',
    name: "Contrat de service de packaging durable",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de fourniture d'emballages écologiques et durables pour réduire l'empreinte environnementale de la supply chain.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 54,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_fournisseur_packaging',label:"Nom du fournisseur de packaging durable",type:'text',required:true},
      {key:'types_emballages',label:"Types d'emballages durables souhaités",type:'textarea',required:true},
      {key:'volume_annuel',label:"Volume annuel estimé",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE PACKAGING DURABLE</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_fournisseur_packaging}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fourniture d'emballages respectueux de l'environnement : {{types_emballages}}</p><h2>Article 2 – Volume</h2><p>Volume annuel estimé : {{volume_annuel}}.</p><h2>Article 3 – Prise d'effet</h2><p>Le {{date_debut}}.</p><h2>Article 4 – Certifications</h2><p>Le fournisseur garantit que les emballages sont certifiés conformes aux normes environnementales applicables en Côte d'Ivoire et dans la sous-région.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_demenagement_entreprise',
    name: "Accord de service de déménagement d'entreprise",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Accord de prestation de déménagement professionnel pour le transfert de bureaux, entrepôts ou usines.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'nom_client_demenagement',label:"Nom du client",type:'text',required:true},
      {key:'nom_prestataire_demenagement',label:"Nom du prestataire de déménagement",type:'text',required:true},
      {key:'adresse_depart',label:"Adresse de départ",type:'text',required:true},
      {key:'adresse_arrivee',label:"Adresse d'arrivée",type:'text',required:true},
      {key:'date_demenagement',label:"Date de déménagement",type:'date',required:true},
      {key:'montant_forfait',label:"Montant forfaitaire (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DEMENAGEMENT D'ENTREPRISE</h1><p>Entre <strong>{{nom_client_demenagement}}</strong> et <strong>{{nom_prestataire_demenagement}}</strong>.</p><h2>Article 1 – Objet</h2><p>Déménagement des locaux de <strong>{{adresse_depart}}</strong> vers <strong>{{adresse_arrivee}}</strong>.</p><h2>Article 2 – Date</h2><p>Le {{date_demenagement}}.</p><h2>Article 3 – Montant</h2><p>Forfait de {{montant_forfait}} FCFA incluant emballage, transport, déchargement et installation.</p><h2>Article 4 – Assurance</h2><p>Le Prestataire prend en charge l'assurance des biens pendant le transport.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_plan_continuite_supply_chain',
    name: "Plan de continuité de la supply chain",
    category: 'transport_logistique',
    price: 8000,
    priceMax: 24000,
    description: "Document de planification de la continuité des opérations de la chaîne logistique en cas de crise ou perturbation majeure.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 59,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'responsable_plan',label:"Responsable du plan de continuité",type:'text',required:true},
      {key:'scenarios_risques',label:"Scénarios de risques identifiés",type:'textarea',required:true},
      {key:'date_elaboration',label:"Date d'élaboration",type:'date',required:true},
      {key:'date_prochaine_revision',label:"Date de prochaine révision",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CONTINUITE DE LA SUPPLY CHAIN</h1><h2>Entreprise : {{nom_entreprise}}</h2><p>Responsable : {{responsable_plan}}</p><p>Date d'élaboration : {{date_elaboration}} | Prochaine révision : {{date_prochaine_revision}}</p><h2>1. Objectif</h2><p>Garantir la continuité des opérations logistiques en cas de perturbation majeure.</p><h2>2. Scénarios de risques</h2><p>{{scenarios_risques}}</p><h2>3. Mesures de continuité</h2><p>Identification de fournisseurs alternatifs, constitution de stocks de sécurité, plans de communication de crise, procédures de réacheminement des flux.</p><h2>4. Activation</h2><p>Le plan est activé par le Responsable Supply Chain après validation de la Direction Générale.</p><p>Validation : _________________ Date : _________________</p></div>`
  },
  {
    code: 'scm_rapport_performance_kpi',
    name: "Rapport de performance logistique (KPIs)",
    category: 'transport_logistique',
    price: 4000,
    priceMax: 12000,
    description: "Modèle de rapport mensuel de performance logistique avec tableaux de bord KPIs pour la direction.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'periode_rapport',label:"Période du rapport (ex: Juillet 2025)",type:'text',required:true},
      {key:'responsable_logistique',label:"Responsable logistique",type:'text',required:true},
      {key:'taux_service',label:"Taux de service atteint (%)",type:'text',required:true},
      {key:'commentaires_performance',label:"Commentaires et analyse de performance",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE LOGISTIQUE (KPIs)</h1><h2>{{nom_entreprise}} – Période : {{periode_rapport}}</h2><p>Responsable : {{responsable_logistique}}</p><h2>1. Taux de service</h2><p><strong>{{taux_service}}%</strong></p><h2>2. Indicateurs clés</h2><p>Taux de livraison à temps (OTD), Taux de commandes parfaites, Coût logistique/CA, Rotation des stocks, Taux de rupture.</p><h2>3. Analyse</h2><p>{{commentaires_performance}}</p><h2>4. Plan d'action</h2><p>Actions correctives identifiées et jalons de suivi pour la période suivante.</p><p>Signature : _________________ Date : _________________</p></div>`
  },
  {
    code: 'scm_consultant_supply_chain',
    name: "Accord de service de consultant supply chain",
    category: 'transport_logistique',
    price: 10000,
    priceMax: 30000,
    description: "Accord de mission de conseil en supply chain pour l'optimisation des opérations logistiques.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_consultant',label:"Nom du consultant / cabinet",type:'text',required:true},
      {key:'mission_description',label:"Description de la mission",type:'textarea',required:true},
      {key:'duree_mission',label:"Durée de la mission (semaines)",type:'text',required:true},
      {key:'honoraires_journaliers',label:"Honoraires journaliers (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSULTANT SUPPLY CHAIN</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_consultant}}</strong>.</p><h2>Article 1 – Mission</h2><p>{{mission_description}}</p><h2>Article 2 – Durée</h2><p>{{duree_mission}} semaines à compter du {{date_debut}}.</p><h2>Article 3 – Rémunération</h2><p>{{honoraires_journaliers}} FCFA par jour travaillé.</p><h2>Article 4 – Livrables</h2><p>Rapport de diagnostic, recommandations, plan d'action priorisé, présentation à la Direction.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_logistique_humanitaire',
    name: "Contrat de service de logistique humanitaire",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de prestation logistique pour ONG/organisations humanitaires incluant transport et distribution d'aide.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG / organisation humanitaire",type:'text',required:true},
      {key:'nom_prestataire',label:"Nom du prestataire logistique",type:'text',required:true},
      {key:'zones_intervention',label:"Zones d'intervention",type:'textarea',required:true},
      {key:'nature_aide',label:"Nature de l'aide à distribuer",type:'text',required:true},
      {key:'date_debut_operation',label:"Date de début des opérations",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE LOGISTIQUE HUMANITAIRE</h1><p>Entre <strong>{{nom_ong}}</strong> et <strong>{{nom_prestataire}}</strong>.</p><h2>Article 1 – Objet</h2><p>Transport et distribution de : {{nature_aide}}</p><h2>Article 2 – Zones d'intervention</h2><p>{{zones_intervention}}</p><h2>Article 3 – Début</h2><p>Le {{date_debut_operation}}.</p><h2>Article 4 – Principes humanitaires</h2><p>Le Prestataire respecte les principes humanitaires d'humanité, d'impartialité et de neutralité dans l'exécution de ses prestations.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'scm_charte_rse_supply_chain',
    name: "Charte de responsabilité sociale de la supply chain",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Charte RSE encadrant les engagements sociaux, environnementaux et éthiques de tous les partenaires de la chaîne logistique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'nom_entreprise_donneuse',label:"Nom de l'entreprise donneuse d'ordre",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'engagements_sociaux',label:"Engagements sociaux clés",type:'textarea',required:true},
      {key:'engagements_environnementaux',label:"Engagements environnementaux clés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE RESPONSABILITE SOCIALE DE LA SUPPLY CHAIN</h1><h2>{{nom_entreprise_donneuse}}</h2><p>Adoptée le {{date_adoption}}</p><h2>1. Engagements sociaux</h2><p>{{engagements_sociaux}}</p><h2>2. Engagements environnementaux</h2><p>{{engagements_environnementaux}}</p><h2>3. Engagements éthiques</h2><p>Tolérance zéro pour la corruption, le travail des enfants et toute forme de discrimination dans la supply chain.</p><h2>4. Audit et conformité</h2><p>Tout partenaire de la supply chain s'engage à accepter des audits RSE et à corriger les non-conformités dans les délais convenus.</p><p>Signature Direction Générale : _________________ Date : _________________</p></div>`
  },
  {
    code: 'dou_declaration_importation',
    name: "Déclaration d'importation en douane (DUM)",
    category: 'transport_logistique',
    price: 4000,
    priceMax: 12000,
    description: "Modèle de déclaration unique de marchandises (DUM) pour l'importation de produits en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 82,
    fieldsJson: F([
      {key:'nom_importateur',label:"Nom et raison sociale de l'importateur",type:'text',required:true},
      {key:'pays_origine',label:"Pays d'origine des marchandises",type:'text',required:true},
      {key:'description_marchandises',label:"Description des marchandises",type:'textarea',required:true},
      {key:'valeur_declaree',label:"Valeur déclarée (FCFA)",type:'text',required:true},
      {key:'date_declaration',label:"Date de la déclaration",type:'date',required:true},
      {key:'numero_connaissement',label:"Numéro de connaissement/LTA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>DECLARATION D'IMPORTATION EN DOUANE (DUM)</h1><h2>REPUBLIQUE DE COTE D'IVOIRE – Direction Générale des Douanes</h2><p>Importateur : <strong>{{nom_importateur}}</strong></p><p>Pays d'origine : <strong>{{pays_origine}}</strong></p><p>N° Connaissement / LTA : <strong>{{numero_connaissement}}</strong></p><p>Date : <strong>{{date_declaration}}</strong></p><h2>1. Description des marchandises</h2><p>{{description_marchandises}}</p><h2>2. Valeur en douane</h2><p><strong>{{valeur_declaree}} FCFA</strong></p><h2>3. Attestation</h2><p>Je soussigné(e) certifie l'exactitude des informations portées sur la présente déclaration et m'engage à acquitter les droits et taxes dus.</p><p>Signature et cachet : _________________ Date : _________________</p></div>`
  },
  {
    code: 'dou_declaration_exportation',
    name: "Déclaration d'exportation en douane (DUE)",
    category: 'transport_logistique',
    price: 4000,
    priceMax: 12000,
    description: "Modèle de déclaration unique de marchandises à l'exportation pour les opérateurs ivoiriens.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'nom_exportateur',label:"Nom et raison sociale de l'exportateur",type:'text',required:true},
      {key:'pays_destination',label:"Pays de destination",type:'text',required:true},
      {key:'description_marchandises',label:"Description des marchandises exportées",type:'textarea',required:true},
      {key:'valeur_fob',label:"Valeur FOB (FCFA)",type:'text',required:true},
      {key:'date_declaration',label:"Date de la déclaration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DECLARATION D'EXPORTATION EN DOUANE (DUE)</h1><h2>REPUBLIQUE DE COTE D'IVOIRE – Direction Générale des Douanes</h2><p>Exportateur : <strong>{{nom_exportateur}}</strong></p><p>Pays de destination : <strong>{{pays_destination}}</strong></p><p>Date : <strong>{{date_declaration}}</strong></p><h2>1. Marchandises</h2><p>{{description_marchandises}}</p><h2>2. Valeur FOB</h2><p><strong>{{valeur_fob}} FCFA</strong></p><h2>3. Attestation de l'exportateur</h2><p>Je certifie l'exactitude des informations déclarées et m'engage à fournir tous justificatifs sur demande des services douaniers.</p><p>Signature et cachet : _________________ Date : _________________</p></div>`
  },
  {
    code: 'dou_declaration_transit',
    name: "Déclaration de transit douanier (T1)",
    category: 'transport_logistique',
    price: 3000,
    priceMax: 9000,
    description: "Déclaration de transit douanier pour le mouvement de marchandises sous contrôle douanier entre pays de la CEDEAO.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'nom_declarant',label:"Nom du déclarant/transitaire",type:'text',required:true},
      {key:'bureau_depart',label:"Bureau de douane de départ",type:'text',required:true},
      {key:'bureau_destination',label:"Bureau de douane de destination",type:'text',required:true},
      {key:'description_marchandises',label:"Description des marchandises en transit",type:'textarea',required:true},
      {key:'date_declaration',label:"Date de la déclaration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DECLARATION DE TRANSIT DOUANIER (T1)</h1><h2>CEDEAO – Transit Inter-Etats</h2><p>Déclarant : <strong>{{nom_declarant}}</strong></p><p>Bureau départ : <strong>{{bureau_depart}}</strong> | Bureau destination : <strong>{{bureau_destination}}</strong></p><p>Date : <strong>{{date_declaration}}</strong></p><h2>1. Marchandises en transit</h2><p>{{description_marchandises}}</p><h2>2. Garantie</h2><p>Le déclarant fournit la garantie requise couvrant les droits et taxes susceptibles d'être exigibles.</p><h2>3. Engagement</h2><p>Le déclarant s'engage à présenter les marchandises intactes au bureau de destination dans le délai imparti.</p><p>Visa bureau départ : _________________ Visa bureau destination : _________________</p></div>`
  },
  {
    code: 'dou_contrat_commissionnaire_douane',
    name: "Contrat de commissionnaire en douane (transitaire)",
    category: 'transport_logistique',
    price: 7000,
    priceMax: 21000,
    description: "Contrat encadrant la mission du commissionnaire en douane agissant pour le compte de l'importateur/exportateur.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'nom_mandant',label:"Nom du mandant (importateur/exportateur)",type:'text',required:true},
      {key:'nom_transitaire',label:"Nom du commissionnaire en douane / transitaire",type:'text',required:true},
      {key:'agrement_douane',label:"Numéro d'agrément douane du transitaire",type:'text',required:true},
      {key:'operations_couvertes',label:"Types d'opérations couvertes",type:'textarea',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMMISSIONNAIRE EN DOUANE (TRANSITAIRE)</h1><p>Entre <strong>{{nom_mandant}}</strong> (Mandant) et <strong>{{nom_transitaire}}</strong> (Commissionnaire en douane agréé n° {{agrement_douane}}).</p><h2>Article 1 – Mandat</h2><p>Le Mandant confie au Commissionnaire les opérations suivantes : {{operations_couvertes}}</p><h2>Article 2 – Obligations du Commissionnaire</h2><p>Agir au mieux des intérêts du Mandant, accomplir les formalités douanières dans les délais légaux, tenir le Mandant informé.</p><h2>Article 3 – Responsabilité</h2><p>Le Commissionnaire répond des conséquences de ses déclarations inexactes.</p><h2>Article 4 – Date</h2><p>Conclu le {{date_contrat}}.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'dou_accord_agent_douane_agree',
    name: "Accord de service d'agent en douane agréé",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Accord de représentation en douane par un agent agréé pour la totalité des opérations douanières d'une entreprise.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise représentée",type:'text',required:true},
      {key:'nom_agent_agree',label:"Nom de l'agent en douane agréé",type:'text',required:true},
      {key:'numero_agrement',label:"Numéro d'agrément",type:'text',required:true},
      {key:'honoraires_dossier',label:"Honoraires par dossier (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AGENT EN DOUANE AGREE</h1><p>Entre <strong>{{nom_entreprise}}</strong> et <strong>{{nom_agent_agree}}</strong> (Agréé n° {{numero_agrement}}).</p><h2>Article 1 – Mission</h2><p>L'Agent représente l'Entreprise auprès de la Direction Générale des Douanes pour toutes ses opérations d'importation et d'exportation.</p><h2>Article 2 – Honoraires</h2><p>{{honoraires_dossier}} FCFA par dossier traité.</p><h2>Article 3 – Prise d'effet</h2><p>Le {{date_debut}}.</p><h2>Article 4 – Procuration</h2><p>Une procuration générale est annexée au présent accord.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'dou_accord_magasin_sous_douane',
    name: "Accord de magasin et dépôt sous douane",
    category: 'transport_logistique',
    price: 8000,
    priceMax: 24000,
    description: "Accord d'utilisation d'un magasin ou entrepôt sous douane pour le stockage temporaire de marchandises non dédouanées.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_deposant',label:"Nom du déposant",type:'text',required:true},
      {key:'nom_gestionnaire_entrepot',label:"Nom du gestionnaire d'entrepôt sous douane",type:'text',required:true},
      {key:'autorisation_douane',label:"Numéro d'autorisation douane de l'entrepôt",type:'text',required:true},
      {key:'duree_depot_max',label:"Durée maximale de dépôt (jours)",type:'text',required:true},
      {key:'tarif_stockage',label:"Tarif de stockage journalier (FCFA/tonne ou m3)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAGASIN ET DEPOT SOUS DOUANE</h1><p>Entre <strong>{{nom_deposant}}</strong> et <strong>{{nom_gestionnaire_entrepot}}</strong> (Entrepôt autorisé n° {{autorisation_douane}}).</p><h2>Article 1 – Objet</h2><p>Stockage temporaire de marchandises sous contrôle douanier.</p><h2>Article 2 – Durée de dépôt</h2><p>Durée maximale : {{duree_depot_max}} jours.</p><h2>Article 3 – Tarif</h2><p>{{tarif_stockage}} FCFA par jour.</p><h2>Article 4 – Responsabilité</h2><p>Le Gestionnaire est responsable de l'intégrité des marchandises sous douane et de leur présentation aux agents des douanes.</p><p>Accord conclu le {{date_accord}}.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'dou_dedouanement_express',
    name: "Contrat de service de dédouanement express",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de prestation de dédouanement accéléré pour les envois express et le fret urgent.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_prestataire_express',label:"Nom du prestataire dédouanement express",type:'text',required:true},
      {key:'delai_dedouanement',label:"Délai de dédouanement garanti (heures)",type:'text',required:true},
      {key:'tarif_par_envoi',label:"Tarif par envoi express (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE DEDOUANEMENT EXPRESS</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_prestataire_express}}</strong>.</p><h2>Article 1 – Objet</h2><p>Dédouanement accéléré des envois express dans un délai garanti de {{delai_dedouanement}} heures.</p><h2>Article 2 – Tarif</h2><p>{{tarif_par_envoi}} FCFA par envoi traité en express.</p><h2>Article 3 – Prise d'effet</h2><p>Le {{date_debut}}.</p><h2>Article 4 – Pénalités</h2><p>En cas de dépassement du délai garanti imputable au Prestataire, une pénalité de 10% du tarif est appliquée par heure de retard.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'dou_procedure_dedouanement_simplifie',
    name: "Accord de procédure de dédouanement simplifié",
    category: 'transport_logistique',
    price: 7000,
    priceMax: 21000,
    description: "Accord cadre pour l'utilisation de procédures douanières simplifiées accordées aux opérateurs fiables.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'nom_operateur',label:"Nom de l'opérateur économique",type:'text',required:true},
      {key:'numero_identification_douane',label:"Numéro d'identification douane (NIF/RC)",type:'text',required:true},
      {key:'type_procedure_simplifiee',label:"Type de procédure simplifiée accordée",type:'textarea',required:true},
      {key:'date_autorisation',label:"Date d'autorisation",type:'date',required:true},
      {key:'date_validite',label:"Date de fin de validité",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROCEDURE DE DEDOUANEMENT SIMPLIFIE</h1><p>La Direction Générale des Douanes de Côte d'Ivoire accorde à <strong>{{nom_operateur}}</strong> (N° {{numero_identification_douane}}) le bénéfice de procédures douanières simplifiées.</p><h2>1. Procédures accordées</h2><p>{{type_procedure_simplifiee}}</p><h2>2. Validité</h2><p>Du {{date_autorisation}} au {{date_validite}}.</p><h2>3. Conditions</h2><p>L'Opérateur s'engage à maintenir ses obligations douanières, à tenir une comptabilité transparente et à se soumettre aux contrôles douaniers.</p><h2>4. Retrait</h2><p>L'autorisation peut être retirée en cas de non-respect des conditions ou de fraude avérée.</p><p>Visa Direction Douanes : _________________ Date : _________________</p></div>`
  },
  {
    code: 'dou_conseil_reglementation_douaniere',
    name: "Contrat de service de conseil en réglementation douanière",
    category: 'transport_logistique',
    price: 8000,
    priceMax: 24000,
    description: "Contrat de conseil et d'accompagnement en matière de réglementation douanière et de commerce international.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_cabinet_conseil',label:"Nom du cabinet conseil douanier",type:'text',required:true},
      {key:'domaines_conseil',label:"Domaines de conseil (réglementations, tarifs, procédures...)",type:'textarea',required:true},
      {key:'honoraires_mensuels',label:"Honoraires mensuels de conseil (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE CONSEIL EN REGLEMENTATION DOUANIERE</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_cabinet_conseil}}</strong>.</p><h2>Article 1 – Mission</h2><p>Conseil et accompagnement dans les domaines suivants : {{domaines_conseil}}</p><h2>Article 2 – Honoraires</h2><p>{{honoraires_mensuels}} FCFA par mois.</p><h2>Article 3 – Prise d'effet</h2><p>Le {{date_debut}}.</p><h2>Article 4 – Confidentialité</h2><p>Le Cabinet s'engage à la confidentialité absolue sur les informations commerciales et douanières du Client.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'dou_operateur_economique_agree_oea',
    name: "Accord d'opérateur économique agréé (OEA)",
    category: 'transport_logistique',
    price: 12000,
    priceMax: 36000,
    description: "Accord de statut d'Opérateur Economique Agréé (OEA) accordé par les douanes ivoiriennes aux opérateurs fiables.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      {key:'nom_operateur',label:"Raison sociale de l'opérateur",type:'text',required:true},
      {key:'numero_oea',label:"Numéro de certificat OEA",type:'text',required:true},
      {key:'type_autorisation_oea',label:"Type d'autorisation OEA",type:'text',required:true},
      {key:'date_octroi',label:"Date d'octroi",type:'date',required:true},
      {key:'date_expiration',label:"Date d'expiration",type:'date',required:true},
      {key:'avantages_accordes',label:"Avantages accordés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'OPERATEUR ECONOMIQUE AGREE (OEA)</h1><h2>DIRECTION GENERALE DES DOUANES DE COTE D'IVOIRE</h2><p>Certifie que <strong>{{nom_operateur}}</strong> est titulaire du statut OEA (Certificat n° {{numero_oea}}).</p><h2>1. Type d'autorisation</h2><p>{{type_autorisation_oea}}</p><h2>2. Validité</h2><p>Du {{date_octroi}} au {{date_expiration}}.</p><h2>3. Avantages accordés</h2><p>{{avantages_accordes}}</p><h2>4. Obligations OEA</h2><p>L'Opérateur s'engage à maintenir les critères d'obtention du statut OEA, notamment en matière de solvabilité, de conformité douanière et de sûreté/sécurité de la chaîne logistique.</p><p>Signature Directeur Général des Douanes : _________________ Date : _________________</p></div>`
  },
  {
    code: 'dou_inspection_avant_embarquement',
    name: "Contrat de service d'inspection avant embarquement (PVI)",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de prestation d'inspection avant embarquement (PVI) par un organisme agréé pour vérification qualité et valeur.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'nom_importateur',label:"Nom de l'importateur",type:'text',required:true},
      {key:'nom_organisme_inspection',label:"Nom de l'organisme d'inspection agréé",type:'text',required:true},
      {key:'description_marchandises',label:"Description des marchandises à inspecter",type:'textarea',required:true},
      {key:'pays_inspection',label:"Pays où se réalise l'inspection",type:'text',required:true},
      {key:'date_inspection',label:"Date d'inspection prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'INSPECTION AVANT EMBARQUEMENT (PVI)</h1><p>Entre <strong>{{nom_importateur}}</strong> et <strong>{{nom_organisme_inspection}}</strong>.</p><h2>Article 1 – Objet</h2><p>Inspection avant embarquement des marchandises suivantes : {{description_marchandises}}</p><h2>Article 2 – Lieu et date</h2><p>Inspection au {{pays_inspection}} le {{date_inspection}}.</p><h2>Article 3 – Attestation</h2><p>L'Organisme émet une Attestation de Vérification (AV) après inspection conforme ou un Rapport de Non-Conformité (RNC) le cas échéant.</p><h2>Article 4 – Portée</h2><p>Vérification de la conformité qualité, de la quantité et de la valeur en douane des marchandises.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'dou_certification_origine',
    name: "Accord de service de certification d'origine",
    category: 'transport_logistique',
    price: 3000,
    priceMax: 9000,
    description: "Accord pour la délivrance de certificats d'origine par une chambre de commerce ou organisme agréé.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'nom_exportateur',label:"Nom de l'exportateur",type:'text',required:true},
      {key:'nom_organisme_certificateur',label:"Nom de l'organisme certificateur",type:'text',required:true},
      {key:'produits_concernes',label:"Produits concernés",type:'textarea',required:true},
      {key:'pays_destination',label:"Pays de destination",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION D'ORIGINE</h1><p>Entre <strong>{{nom_exportateur}}</strong> et <strong>{{nom_organisme_certificateur}}</strong>.</p><h2>Article 1 – Objet</h2><p>Délivrance de certificats d'origine pour les produits suivants exportés vers {{pays_destination}} : {{produits_concernes}}</p><h2>Article 2 – Procédure</h2><p>L'Exportateur soumet sa demande avec pièces justificatives. L'Organisme vérifie et délivre le certificat sous 48h ouvrables.</p><h2>Article 3 – Accord</h2><p>Conclu le {{date_accord}}.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'dou_certificat_origine_produit',
    name: "Certificat d'origine produit",
    category: 'transport_logistique',
    price: 2000,
    priceMax: 6000,
    description: "Modèle de certificat d'origine attestant que les marchandises sont originaires de Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'nom_exportateur',label:"Nom et adresse de l'exportateur",type:'text',required:true},
      {key:'pays_destination',label:"Pays de destination",type:'text',required:true},
      {key:'description_produits',label:"Description des produits",type:'textarea',required:true},
      {key:'poids_brut',label:"Poids brut (kg)",type:'text',required:true},
      {key:'numero_certificat',label:"Numéro du certificat",type:'text',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CERTIFICAT D'ORIGINE</h1><h2>CHAMBRE DE COMMERCE ET D'INDUSTRIE DE COTE D'IVOIRE</h2><p>Certificat N° <strong>{{numero_certificat}}</strong> – Émis le <strong>{{date_emission}}</strong></p><hr/><p><strong>Exportateur :</strong> {{nom_exportateur}}</p><p><strong>Pays de destination :</strong> {{pays_destination}}</p><h2>Description des marchandises</h2><p>{{description_produits}}</p><p><strong>Poids brut :</strong> {{poids_brut}} kg</p><h2>Déclaration</h2><p>La Chambre de Commerce et d'Industrie de Côte d'Ivoire certifie que les marchandises désignées ci-dessus sont originaires de la République de Côte d'Ivoire.</p><p>Cachet et signature : _________________ Date : _________________</p></div>`
  },
  {
    code: 'dou_expertise_douaniere_sydonia',
    name: "Accord de service d'expertise douanière (expert Sydonia)",
    category: 'transport_logistique',
    price: 9000,
    priceMax: 27000,
    description: "Accord de prestation d'expertise douanière par un expert certifié sur le logiciel SYDONIA (ASYCUDA).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_expert_sydonia',label:"Nom de l'expert SYDONIA",type:'text',required:true},
      {key:'certification_sydonia',label:"Certification SYDONIA (référence)",type:'text',required:true},
      {key:'missions_confiees',label:"Missions confiées",type:'textarea',required:true},
      {key:'date_debut_mission',label:"Date de début de mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXPERTISE DOUANIERE (EXPERT SYDONIA)</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_expert_sydonia}}</strong> (Certifié SYDONIA : {{certification_sydonia}}).</p><h2>Article 1 – Missions</h2><p>{{missions_confiees}}</p><h2>Article 2 – Prise d'effet</h2><p>Le {{date_debut_mission}}.</p><h2>Article 3 – Expertise</h2><p>L'Expert apporte son concours pour la saisie des déclarations douanières, la liquidation des droits et taxes dans SYDONIA, et la résolution des anomalies système.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'dou_plan_conformite_douaniere',
    name: "Plan de conformité douanière export-import",
    category: 'transport_logistique',
    price: 7000,
    priceMax: 21000,
    description: "Document de planification de la conformité douanière pour les opérations d'import-export d'une entreprise.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'responsable_conformite',label:"Responsable conformité douanière",type:'text',required:true},
      {key:'risques_identifies',label:"Risques douaniers identifiés",type:'textarea',required:true},
      {key:'mesures_conformite',label:"Mesures de conformité mises en place",type:'textarea',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CONFORMITE DOUANIERE EXPORT-IMPORT</h1><h2>{{nom_entreprise}}</h2><p>Responsable : {{responsable_conformite}} | Date : {{date_plan}}</p><h2>1. Risques identifiés</h2><p>{{risques_identifies}}</p><h2>2. Mesures de conformité</h2><p>{{mesures_conformite}}</p><h2>3. Formation</h2><p>Formation annuelle obligatoire de toutes les équipes impliquées dans les opérations douanières.</p><h2>4. Contrôle interne</h2><p>Audit interne semestriel de la conformité douanière et reporting à la Direction Générale.</p><p>Validation : _________________ Date : _________________</p></div>`
  },
  {
    code: 'dou_rapport_audit_douanier',
    name: "Rapport d'audit douanier",
    category: 'transport_logistique',
    price: 8000,
    priceMax: 24000,
    description: "Modèle de rapport d'audit douanier pour évaluer la conformité des opérations douanières d'une entreprise.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'nom_entreprise_auditee',label:"Nom de l'entreprise auditée",type:'text',required:true},
      {key:'nom_auditeur',label:"Nom de l'auditeur douanier",type:'text',required:true},
      {key:'periode_auditee',label:"Période auditée",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'constats_principaux',label:"Constats principaux",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT DOUANIER</h1><h2>Entreprise : {{nom_entreprise_auditee}}</h2><p>Auditeur : {{nom_auditeur}} | Période : {{periode_auditee}} | Date rapport : {{date_rapport}}</p><h2>1. Constats</h2><p>{{constats_principaux}}</p><h2>2. Recommandations</h2><p>{{recommandations}}</p><h2>3. Plan de remédiation</h2><p>Actions correctives à mettre en œuvre, responsables désignés et délais de mise en conformité.</p><h2>4. Conclusion</h2><p>L'audit a permis d'évaluer le niveau de conformité douanière et d'identifier les axes d'amélioration prioritaires.</p><p>Signature Auditeur : _________________ Date : _________________</p></div>`
  },
  {
    code: 'dou_restitution_droits_drawback',
    name: "Accord de restitution de droits de douane (drawback)",
    category: 'transport_logistique',
    price: 10000,
    priceMax: 30000,
    description: "Accord encadrant la procédure de remboursement des droits de douane payés sur des intrants réexportés après transformation.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 59,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom du bénéficiaire du drawback",type:'text',required:true},
      {key:'produits_importes',label:"Produits importés ayant servi à la fabrication",type:'textarea',required:true},
      {key:'produits_exportes',label:"Produits exportés après transformation",type:'textarea',required:true},
      {key:'montant_droits_rembourses',label:"Montant des droits à rembourser (FCFA)",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RESTITUTION DE DROITS DE DOUANE (DRAWBACK)</h1><p>La Direction Générale des Douanes de Côte d'Ivoire, au profit de <strong>{{nom_beneficiaire}}</strong>.</p><h2>1. Produits importés</h2><p>{{produits_importes}}</p><h2>2. Produits exportés</h2><p>{{produits_exportes}}</p><h2>3. Montant à restituer</h2><p><strong>{{montant_droits_rembourses}} FCFA</strong></p><h2>4. Demande</h2><p>Formulée le {{date_demande}}.</p><h2>5. Conditions</h2><p>Le bénéficiaire prouve le lien entre les intrants importés et les produits exportés par la fourniture des déclarations d'importation et d'exportation correspondantes.</p><p>Visa Direction Douanes : _________________ Date : _________________</p></div>`
  },
  {
    code: 'dou_service_valeur_douane',
    name: "Contrat de service de valeur en douane",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de conseil et d'assistance pour la détermination correcte de la valeur en douane selon les Accords de l'OMC.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      {key:'nom_importateur',label:"Nom de l'importateur",type:'text',required:true},
      {key:'nom_expert_valeur',label:"Nom de l'expert en valeur douanière",type:'text',required:true},
      {key:'types_marchandises',label:"Types de marchandises concernées",type:'textarea',required:true},
      {key:'honoraires_annuels',label:"Honoraires annuels (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE VALEUR EN DOUANE</h1><p>Entre <strong>{{nom_importateur}}</strong> et <strong>{{nom_expert_valeur}}</strong>.</p><h2>Article 1 – Objet</h2><p>Assistance à la détermination de la valeur en douane conformément aux Accords de l'OMC pour : {{types_marchandises}}</p><h2>Article 2 – Honoraires</h2><p>{{honoraires_annuels}} FCFA par an.</p><h2>Article 3 – Date</h2><p>Conclu le {{date_contrat}}.</p><h2>Article 4 – Missions</h2><p>Analyse des factures, détermination de la méthode de valorisation applicable, rédaction des déclarations de valeur, assistance en cas de contrôle douanier.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'dou_regime_economique_entrepot',
    name: "Accord de régime économique (entrepôt sous douane)",
    category: 'transport_logistique',
    price: 9000,
    priceMax: 27000,
    description: "Accord d'admission en régime économique d'entrepôt sous douane permettant la suspension des droits et taxes.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 61,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom du bénéficiaire du régime",type:'text',required:true},
      {key:'numero_autorisation',label:"Numéro d'autorisation",type:'text',required:true},
      {key:'localisation_entrepot',label:"Localisation de l'entrepôt",type:'text',required:true},
      {key:'nature_marchandises',label:"Nature des marchandises admises",type:'textarea',required:true},
      {key:'date_octroi',label:"Date d'octroi du régime",type:'date',required:true},
      {key:'duree_regime',label:"Durée du régime (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE REGIME ECONOMIQUE – ENTREPOT SOUS DOUANE</h1><p>Autorisation N° {{numero_autorisation}} accordée à <strong>{{nom_beneficiaire}}</strong> pour l'entrepôt de <strong>{{localisation_entrepot}}</strong>.</p><h2>1. Nature des marchandises admises</h2><p>{{nature_marchandises}}</p><h2>2. Durée</h2><p>Régime accordé le {{date_octroi}} pour une durée de {{duree_regime}} an(s) renouvelable.</p><h2>3. Suspension des droits</h2><p>Les droits et taxes sont suspendus pendant toute la durée du séjour en entrepôt sous douane.</p><h2>4. Obligations</h2><p>Tenue d'une comptabilité matière, inventaire périodique, accès permanent aux agents des douanes.</p><p>Visa DGD : _________________ Date : _________________</p></div>`
  },
  {
    code: 'dou_dedouanement_aerien_express',
    name: "Contrat de service de dédouanement aérien (fret express)",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de prestation spécialisée de dédouanement du fret aérien express à l'aéroport international.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nom_prestataire_aerien',label:"Nom du prestataire dédouanement aérien",type:'text',required:true},
      {key:'aeroport',label:"Aéroport de traitement",type:'text',required:true},
      {key:'volume_mensuel_envois',label:"Volume mensuel d'envois",type:'text',required:true},
      {key:'delai_traitement',label:"Délai de traitement garanti (heures)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE DEDOUANEMENT AERIEN (FRET EXPRESS)</h1><p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_prestataire_aerien}}</strong> à l'aéroport de <strong>{{aeroport}}</strong>.</p><h2>Article 1 – Objet</h2><p>Dédouanement du fret aérien express, volume mensuel : {{volume_mensuel_envois}} envois.</p><h2>Article 2 – Délai</h2><p>Traitement garanti en {{delai_traitement}} heures après réception du dossier complet.</p><h2>Article 3 – Prise d'effet</h2><p>Le {{date_debut}}.</p><h2>Article 4 – Modalités</h2><p>Le Prestataire assure la liaison avec les services douaniers de l'aéroport, la liquidation des droits et la livraison des marchandises à l'entrepôt désigné.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'dou_manifeste_chargement',
    name: "Accord de service de manifeste de chargement",
    category: 'transport_logistique',
    price: 4000,
    priceMax: 12000,
    description: "Accord pour la préparation et la transmission électronique des manifestes de chargement aux autorités douanières.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_transporteur',label:"Nom du transporteur / armateur",type:'text',required:true},
      {key:'nom_prestataire_manifeste',label:"Nom du prestataire de manifeste",type:'text',required:true},
      {key:'modes_transport_couverts',label:"Modes de transport couverts",type:'text',required:true},
      {key:'delai_transmission',label:"Délai de transmission avant arrivée (heures)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MANIFESTE DE CHARGEMENT</h1><p>Entre <strong>{{nom_transporteur}}</strong> et <strong>{{nom_prestataire_manifeste}}</strong>.</p><h2>Article 1 – Objet</h2><p>Préparation et transmission électronique des manifestes pour : {{modes_transport_couverts}}</p><h2>Article 2 – Délai</h2><p>Transmission {{delai_transmission}} heures avant l'arrivée du moyen de transport.</p><h2>Article 3 – Accord</h2><p>Conclu le {{date_accord}}.</p><h2>Article 4 – Conformité</h2><p>Les manifestes sont conformes aux exigences de la Direction Générale des Douanes de Côte d'Ivoire.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'dou_courtier_fret_maritime',
    name: "Contrat de service de courtier en fret maritime",
    category: 'transport_logistique',
    price: 7000,
    priceMax: 21000,
    description: "Contrat de courtage en fret maritime pour la négociation des contrats d'affrètement et de transport de marchandises.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 71,
    fieldsJson: F([
      {key:'nom_mandant',label:"Nom du mandant (chargeur/armateur)",type:'text',required:true},
      {key:'nom_courtier',label:"Nom du courtier en fret maritime",type:'text',required:true},
      {key:'type_fret',label:"Type de fret (conteneur/vrac/autre)",type:'text',required:true},
      {key:'routes_maritimes',label:"Routes maritimes concernées",type:'textarea',required:true},
      {key:'commission_courtage',label:"Commission de courtage (%)",type:'text',required:true},
      {key:'date_mandat',label:"Date du mandat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE COURTIER EN FRET MARITIME</h1><p>Entre <strong>{{nom_mandant}}</strong> et <strong>{{nom_courtier}}</strong> (Courtier en fret maritime).</p><h2>Article 1 – Mandat</h2><p>Le Courtier est mandaté pour négocier et conclure des contrats de fret maritime ({{type_fret}}) sur les routes suivantes : {{routes_maritimes}}</p><h2>Article 2 – Commission</h2><p>{{commission_courtage}}% du fret négocié.</p><h2>Article 3 – Date</h2><p>Mandat conclu le {{date_mandat}}.</p><h2>Article 4 – Indépendance</h2><p>Le Courtier agit de façon impartiale et dans le seul intérêt du Mandant.</p><p>Signatures : _________________ / _________________</p></div>`
  },
  {
    code: 'dou_tarif_preferentiel_cedeao',
    name: "Accord de traitement tarif préférentiel CEDEAO",
    category: 'transport_logistique',
    price: 8000,
    priceMax: 24000,
    description: "Accord d'application du Tarif Extérieur Commun (TEC) de la CEDEAO et des préférences tarifaires régionales.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'nom_exportateur',label:"Nom de l'exportateur",type:'text',required:true},
      {key:'pays_importateur',label:"Pays importateur (membre CEDEAO)",type:'text',required:true},
      {key:'produits_beneficiaires',label:"Produits bénéficiaires du tarif préférentiel",type:'textarea',required:true},
      {key:'taux_preferentiel',label:"Taux préférentiel applicable (%)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRAITEMENT TARIF PREFERENTIEL CEDEAO</h1><p>Entre <strong>{{nom_exportateur}}</strong> (Côte d'Ivoire) et les autorités douanières de <strong>{{pays_importateur}}</strong>.</p><h2>1. Produits concernés</h2><p>{{produits_beneficiaires}}</p><h2>2. Taux préférentiel</h2><p>{{taux_preferentiel}}% en application du Tarif Extérieur Commun (TEC) de la CEDEAO.</p><h2>3. Conditions d'origine</h2><p>Les marchandises doivent satisfaire aux règles d'origine CEDEAO et être accompagnées du certificat d'origine Form A.</p><h2>4. Date d'application</h2><p>A compter du {{date_accord}}.</p><p>Visas douaniers : _________________ / _________________ Date : _________________</p></div>`
  },
  {
    code: 'dou_rapport_conformite_sydonia',
    name: "Rapport de conformité SYDONIA (logiciel douane)",
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: "Rapport de vérification de la conformité des déclarations douanières dans le système SYDONIA/ASYCUDA.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'auditeur_sydonia',label:"Nom de l'auditeur SYDONIA",type:'text',required:true},
      {key:'periode_controle',label:"Période contrôlée",type:'text',required:true},
      {key:'nombre_declarations_verifiees',label:"Nombre de déclarations vérifiées",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'anomalies_detectees',label:"Anomalies détectées",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONFORMITE SYDONIA (LOGICIEL DOUANE)</h1><h2>Entreprise : {{nom_entreprise}}</h2><p>Auditeur : {{auditeur_sydonia}} | Période : {{periode_controle}} | Date : {{date_rapport}}</p><h2>1. Périmètre du contrôle</h2><p>{{nombre_declarations_verifiees}} déclarations douanières vérifiées dans SYDONIA.</p><h2>2. Anomalies détectées</h2><p>{{anomalies_detectees}}</p><h2>3. Recommandations</h2><p>Correction des déclarations erronées, formation des utilisateurs SYDONIA, mise en place d'un contrôle interne de qualité des saisies.</p><h2>4. Conclusion</h2><p>Le niveau de conformité SYDONIA de l'entreprise et les actions de remédiation prioritaires sont synthétisés dans le présent rapport.</p><p>Signature Auditeur : _________________ Date : _________________</p></div>`
  },
  {
    code: 'dou_charte_transit_routier_etats',
    name: "Charte du transit routier inter-États",
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: "Charte encadrant les règles et engagements des transporteurs pour le transit routier international en Afrique de l'Ouest.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 69,
    fieldsJson: F([
      {key:'nom_federation_transporteurs',label:"Nom de la fédération/association de transporteurs",type:'text',required:true},
      {key:'pays_membres',label:"Pays membres concernés par la charte",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'engagements_transporteurs',label:"Engagements des transporteurs signataires",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU TRANSIT ROUTIER INTER-ETATS</h1><h2>{{nom_federation_transporteurs}}</h2><p>Adoptée le {{date_adoption}}</p><h2>1. Pays membres</h2><p>{{pays_membres}}</p><h2>2. Engagements des transporteurs</h2><p>{{engagements_transporteurs}}</p><h2>3. Règles de transit</h2><p>Respect des corridors routiers officiels, présentation obligatoire du carnet de transit CEDEAO, signalement de tout incident aux autorités douanières compétentes, interdiction du chargement/déchargement non déclaré en cours de route.</p><h2>4. Sanctions</h2><p>Tout transporteur signataire contrevenant aux règles du présent accord est exclu de la fédération et signalé aux autorités douanières des pays membres.</p><p>Signatures des représentants : _________________ Date : _________________</p></div>`
  }
];
async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 43a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
