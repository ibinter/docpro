import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── HÔTELLERIE 5 ÉTOILES / LUXE (hotel2_) ───
  {
    code: 'hotel2_gestion_hoteliere',
    name: "Accord de Gestion Hôtelière (Management Hotel)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 40000,
    description: "Contrat de management délégant l'exploitation d'un établissement hôtelier à une société spécialisée, conforme au droit OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'nom_proprietaire',label:"Nom du Propriétaire",type:'text',required:true},
      {key:'nom_operateur',label:"Nom de l'Opérateur Hôtelier",type:'text',required:true},
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat (années)",type:'text',required:true},
      {key:'taux_gestion',label:"Taux de frais de gestion (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION HÔTELIÈRE</h1><h2>CONTRAT DE MANAGEMENT</h2><p>Entre <strong>{{nom_proprietaire}}</strong>, ci-après dénommé le Propriétaire, et <strong>{{nom_operateur}}</strong>, ci-après dénommé l'Opérateur.</p><h3>Article 1 — Objet</h3><p>Le Propriétaire confie à l'Opérateur la gestion exclusive de l'établissement dénommé <strong>{{nom_hotel}}</strong>, pour une durée de {{duree_contrat}} ans à compter du {{date_debut}}.</p><h3>Article 2 — Frais de Gestion</h3><p>L'Opérateur percevra des frais de gestion de {{taux_gestion}}% du chiffre d'affaires brut mensuel.</p><h3>Article 3 — Obligations de l'Opérateur</h3><p>L'Opérateur s'engage à exploiter l'établissement selon les standards de l'hôtellerie de luxe et à rendre compte mensuellement au Propriétaire.</p><h3>Article 4 — Droit Applicable</h3><p>Le présent accord est soumis au droit OHADA et aux juridictions compétentes de Côte d'Ivoire.</p></div>`
  },
  {
    code: 'hotel2_franchise_hoteliere',
    name: "Accord de Franchise Hôtelière (Modèle Afrique)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 45000,
    description: "Contrat de franchise hôtelière sur le modèle des grandes enseignes internationales (Marriott, Hilton) adapté au marché africain et au droit OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      {key:'nom_franchiseur',label:"Nom du Franchiseur",type:'text',required:true},
      {key:'nom_franchise',label:"Nom du Franchisé",type:'text',required:true},
      {key:'marque_hotel',label:"Marque Hôtelière",type:'text',required:true},
      {key:'territoire',label:"Territoire (pays/région)",type:'text',required:true},
      {key:'duree_franchise',label:"Durée de la franchise (années)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FRANCHISE HÔTELIÈRE</h1><h2>MARQUE : {{marque_hotel}}</h2><p>Entre <strong>{{nom_franchiseur}}</strong> (le Franchiseur) et <strong>{{nom_franchise}}</strong> (le Franchisé), pour l'exploitation de la marque {{marque_hotel}} sur le territoire de {{territoire}}.</p><h3>Article 1 — Concession de Franchise</h3><p>Le Franchiseur concède au Franchisé le droit d'exploiter la marque {{marque_hotel}} pour une durée de {{duree_franchise}} ans.</p><h3>Article 2 — Redevances</h3><p>Le Franchisé versera les redevances initiales et continues selon les modalités définies en Annexe A.</p><h3>Article 3 — Standards de la Marque</h3><p>Le Franchisé s'engage à respecter l'intégralité des standards opérationnels et de service définis par le Franchiseur.</p><h3>Article 4 — Formation et Assistance</h3><p>Le Franchiseur fournira la formation initiale et un support continu au Franchisé.</p><h3>Article 5 — Droit Applicable</h3><p>Le présent accord est régi par le droit OHADA.</p></div>`
  },
  {
    code: 'hotel2_licence_marque',
    name: "Accord de Licence de Marque Hôtelière",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 35000,
    description: "Contrat de licence autorisant l'utilisation d'une marque hôtelière pour l'exploitation d'un établissement, avec conditions et redevances.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'concedant',label:"Concédant (titulaire de la marque)",type:'text',required:true},
      {key:'licencie',label:"Licencié",type:'text',required:true},
      {key:'marque',label:"Marque concédée",type:'text',required:true},
      {key:'redevance_annuelle',label:"Redevance annuelle (FCFA)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE MARQUE HÔTELIÈRE</h1><p>Entre <strong>{{concedant}}</strong> (le Concédant) et <strong>{{licencie}}</strong> (le Licencié).</p><h3>Article 1 — Objet</h3><p>Le Concédant accorde au Licencié le droit non exclusif d'utiliser la marque <strong>{{marque}}</strong> à compter du {{date_effet}}.</p><h3>Article 2 — Redevances</h3><p>En contrepartie, le Licencié versera une redevance annuelle de {{redevance_annuelle}} FCFA.</p><h3>Article 3 — Conditions d'Utilisation</h3><p>La marque ne pourra être utilisée que dans le respect strict des directives du Concédant et des normes de qualité hôtelière établies.</p><h3>Article 4 — Résiliation</h3><p>Tout manquement aux conditions d'utilisation pourra entraîner la résiliation immédiate du présent accord.</p></div>`
  },
  {
    code: 'hotel2_reservation_centrale',
    name: "Accord de Service de Réservation Centrale (GDS/OTA)",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Convention de service pour l'intégration aux systèmes de distribution globaux (GDS) et aux agences de voyage en ligne (OTA).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'prestataire_gds',label:"Prestataire GDS/OTA",type:'text',required:true},
      {key:'commission_ota',label:"Commission OTA (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉSERVATION CENTRALE</h1><h2>GDS ET OTA</h2><p>Entre <strong>{{nom_hotel}}</strong> (l'Hôtel) et <strong>{{prestataire_gds}}</strong> (le Prestataire).</p><h3>Article 1 — Objet</h3><p>Le Prestataire s'engage à référencer et distribuer les disponibilités et tarifs de l'Hôtel via ses canaux de distribution à compter du {{date_debut}}.</p><h3>Article 2 — Commission</h3><p>L'Hôtel versera au Prestataire une commission de {{commission_ota}}% sur chaque réservation confirmée.</p><h3>Article 3 — Disponibilités et Parité Tarifaire</h3><p>L'Hôtel garantit la mise à jour en temps réel des disponibilités et le respect de la parité tarifaire.</p></div>`
  },
  {
    code: 'hotel2_partenariat_ota',
    name: "Accord de Partenariat OTA (Booking, Expedia, Airbnb Pro)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de partenariat avec les principales plateformes OTA pour la distribution des chambres et services hôteliers.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'plateforme_ota',label:"Plateforme OTA (Booking, Expedia, etc.)",type:'text',required:true},
      {key:'taux_commission',label:"Taux de commission (%)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'conditions_speciales',label:"Conditions particulières",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT OTA</h1><p>Entre <strong>{{nom_hotel}}</strong> et la plateforme <strong>{{plateforme_ota}}</strong>, signé le {{date_signature}}.</p><h3>Article 1 — Distribution</h3><p>{{plateforme_ota}} s'engage à promouvoir et distribuer les offres de {{nom_hotel}} sur sa plateforme.</p><h3>Article 2 — Commission</h3><p>Une commission de {{taux_commission}}% sera prélevée sur chaque réservation confirmée.</p><h3>Article 3 — Conditions Particulières</h3><p>{{conditions_speciales}}</p></div>`
  },
  {
    code: 'hotel2_revenue_management',
    name: "Accord de Service de Revenue Management (Yield)",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 22000,
    description: "Convention de prestation pour l'optimisation des revenus hôteliers par techniques de yield management et tarification dynamique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'prestataire_rm',label:"Prestataire Revenue Management",type:'text',required:true},
      {key:'honoraires_mensuels',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'objectif_revpar',label:"Objectif RevPAR cible (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REVENUE MANAGEMENT</h1><p>Entre <strong>{{nom_hotel}}</strong> (le Client) et <strong>{{prestataire_rm}}</strong> (le Prestataire).</p><h3>Article 1 — Mission</h3><p>Le Prestataire assurera l'optimisation tarifaire et la gestion des disponibilités de l'Hôtel selon les techniques de yield management.</p><h3>Article 2 — Honoraires</h3><p>Des honoraires mensuels de {{honoraires_mensuels}} FCFA seront versés au Prestataire.</p><h3>Article 3 — Objectifs</h3><p>Les parties conviennent d'un objectif de RevPAR cible de {{objectif_revpar}} FCFA.</p></div>`
  },
  {
    code: 'hotel2_concierge_luxe',
    name: "Accord de Service de Conciergerie de Luxe",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: "Contrat de prestation de service de conciergerie haut de gamme pour hôtel 5 étoiles, incluant services personnalisés et accès VIP.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'prestataire_concierge',label:"Société de Conciergerie",type:'text',required:true},
      {key:'services_inclus',label:"Services inclus",type:'textarea',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONCIERGERIE DE LUXE</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{prestataire_concierge}}</strong>.</p><h3>Article 1 — Services</h3><p>Le Prestataire fournit les services de conciergerie suivants : {{services_inclus}}</p><h3>Article 2 — Tarification</h3><p>Le tarif mensuel est fixé à {{tarif_mensuel}} FCFA.</p><h3>Article 3 — Disponibilité</h3><p>Le service de conciergerie est disponible 24h/24, 7j/7, pour toute la clientèle de l'établissement.</p></div>`
  },
  {
    code: 'hotel2_restauration_gastronomique',
    name: "Accord de Service de Restauration Gastronomique (Chef Étoilé)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 25000,
    description: "Convention de service pour la mise en place et l'exploitation d'un restaurant gastronomique au sein d'un hôtel de luxe avec chef reconnu.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'nom_chef',label:"Nom du Chef",type:'text',required:true},
      {key:'nom_restaurant',label:"Nom du Restaurant",type:'text',required:true},
      {key:'remuneration_chef',label:"Rémunération du Chef (FCFA/mois)",type:'text',required:true},
      {key:'pourcentage_ca',label:"Pourcentage sur CA (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RESTAURATION GASTRONOMIQUE</h1><p>Entre <strong>{{nom_hotel}}</strong> (l'Hôtel) et <strong>{{nom_chef}}</strong> (le Chef).</p><h3>Article 1 — Objet</h3><p>Le Chef assure la direction artistique et culinaire du restaurant <strong>{{nom_restaurant}}</strong> au sein de l'Hôtel.</p><h3>Article 2 — Rémunération</h3><p>Le Chef percevra une rémunération mensuelle de {{remuneration_chef}} FCFA, complétée par {{pourcentage_ca}}% du chiffre d'affaires du restaurant.</p><h3>Article 3 — Création et Carte</h3><p>Le Chef a pleine autorité sur la création de la carte et la sélection des produits, dans le respect des standards de l'Hôtel.</p></div>`
  },
  {
    code: 'hotel2_room_service_premium',
    name: "Accord de Service en Chambre Premium (Room Service)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de prestation de service en chambre haut de gamme pour hôtel 5 étoiles, incluant standards de qualité et délais de livraison.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'prestataire',label:"Prestataire de Service",type:'text',required:true},
      {key:'delai_livraison',label:"Délai de livraison garanti (minutes)",type:'text',required:true},
      {key:'tarif_service',label:"Tarif de service (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE EN CHAMBRE PREMIUM</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{prestataire}}</strong>.</p><h3>Article 1 — Prestation</h3><p>Le Prestataire assure le service en chambre 24h/24 avec un délai de livraison garanti de {{delai_livraison}} minutes.</p><h3>Article 2 — Tarification</h3><p>Un tarif de service de {{tarif_service}} FCFA est appliqué par commande.</p><h3>Article 3 — Standards Qualité</h3><p>La présentation, la température des mets et la courtoisie du personnel sont soumises aux standards 5 étoiles de l'établissement.</p></div>`
  },
  {
    code: 'hotel2_laverie_pressing',
    name: "Accord de Service de Laverie et Pressing Hôtelier",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Convention de service pour la prise en charge du linge client et des uniformes du personnel dans un établissement hôtelier de luxe.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'prestataire_laverie',label:"Prestataire Laverie/Pressing",type:'text',required:true},
      {key:'delai_retour',label:"Délai de retour standard (heures)",type:'text',required:true},
      {key:'tarif_forfait',label:"Tarif forfaitaire mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LAVERIE ET PRESSING HÔTELIER</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{prestataire_laverie}}</strong>.</p><h3>Article 1 — Services</h3><p>Le Prestataire assure la collecte, le nettoyage et la restitution du linge client et des uniformes du personnel avec un délai de retour de {{delai_retour}} heures.</p><h3>Article 2 — Tarification</h3><p>Un forfait mensuel de {{tarif_forfait}} FCFA est appliqué pour l'ensemble des prestations.</p><h3>Article 3 — Responsabilité</h3><p>Le Prestataire est responsable de tout dommage causé au linge confié et procède au remboursement selon barème annexé.</p></div>`
  },
  {
    code: 'hotel2_floriculture',
    name: "Accord de Service de Floriculture Hôtelière",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10000,
    description: "Contrat de prestation florale pour la décoration des espaces communs et des chambres d'un hôtel de luxe.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'fleuriste',label:"Société Florale",type:'text',required:true},
      {key:'frequence_livraison',label:"Fréquence de livraison",type:'text',required:true},
      {key:'budget_mensuel',label:"Budget mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FLORICULTURE HÔTELIÈRE</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{fleuriste}}</strong>.</p><h3>Article 1 — Prestation</h3><p>Le Fleuriste assure la fourniture et le renouvellement des compositions florales avec une fréquence de {{frequence_livraison}}.</p><h3>Article 2 — Budget</h3><p>Le budget mensuel alloué est de {{budget_mensuel}} FCFA.</p><h3>Article 3 — Créations</h3><p>Les compositions sont réalisées sur mesure selon la charte graphique et l'identité visuelle de l'Hôtel.</p></div>`
  },
  {
    code: 'hotel2_securite_privee',
    name: "Accord de Service de Sécurité Privée Hôtelière (24/7)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 25000,
    description: "Contrat de sécurité privée pour hôtel de luxe incluant surveillance continue, gestion des accès et protection des personnes.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'societe_securite',label:"Société de Sécurité",type:'text',required:true},
      {key:'nombre_agents',label:"Nombre d'agents",type:'text',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ PRIVÉE HÔTELIÈRE</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{societe_securite}}</strong>, à compter du {{date_debut}}.</p><h3>Article 1 — Mission</h3><p>La Société de Sécurité déploie {{nombre_agents}} agents qualifiés pour assurer la surveillance 24h/24, 7j/7 de l'établissement.</p><h3>Article 2 — Tarification</h3><p>Les services sont facturés {{tarif_mensuel}} FCFA par mois.</p><h3>Article 3 — Protocole</h3><p>Un protocole de sécurité spécifique sera établi conjointement et révisé trimestriellement.</p></div>`
  },
  {
    code: 'hotel2_blanchisserie_externalisee',
    name: "Accord de Service de Blanchisserie Hôtelière Externalisée",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Convention d'externalisation de la blanchisserie industrielle pour linge de lit, serviettes et uniformes d'un hôtel de luxe.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'prestataire',label:"Prestataire Blanchisserie",type:'text',required:true},
      {key:'volume_kg_jour',label:"Volume estimé (kg/jour)",type:'text',required:true},
      {key:'tarif_kg',label:"Tarif au kg (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BLANCHISSERIE HÔTELIÈRE EXTERNALISÉE</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{prestataire}}</strong>.</p><h3>Article 1 — Objet</h3><p>Le Prestataire prend en charge le traitement du linge (linge de lit, serviettes, uniformes) pour un volume estimé de {{volume_kg_jour}} kg/jour.</p><h3>Article 2 — Tarification</h3><p>La facturation est effectuée au poids à raison de {{tarif_kg}} FCFA/kg.</p><h3>Article 3 — Enlèvement et Livraison</h3><p>Le Prestataire assure l'enlèvement et la restitution du linge traité selon le planning convenu.</p></div>`
  },
  {
    code: 'hotel2_minibar_cave',
    name: "Accord de Service de Gestion de Mini-Bar et Cave",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de gestion et approvisionnement des mini-bars en chambre et de la cave à vins d'un hôtel de luxe.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur Boissons/Cave",type:'text',required:true},
      {key:'nombre_chambres',label:"Nombre de chambres équipées",type:'text',required:true},
      {key:'valeur_stock_initial',label:"Valeur stock initial (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE MINI-BAR ET CAVE</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{fournisseur}}</strong>.</p><h3>Article 1 — Approvisionnement</h3><p>Le Fournisseur assure l'approvisionnement et la gestion des {{nombre_chambres}} mini-bars et de la cave à vins de l'établissement.</p><h3>Article 2 — Stock Initial</h3><p>La valeur du stock initial est estimée à {{valeur_stock_initial}} FCFA.</p><h3>Article 3 — Suivi Inventaire</h3><p>Un inventaire hebdomadaire est réalisé conjointement pour le suivi des consommations et le réapprovisionnement.</p></div>`
  },
  {
    code: 'hotel2_banquet_mice',
    name: "Accord de Service de Banquet et Réception (MICE Hôtel)",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 22000,
    description: "Convention de service pour l'organisation de banquets, séminaires et événements d'entreprise (MICE) dans un hôtel de luxe.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'nom_client',label:"Nom du Client Organisateur",type:'text',required:true},
      {key:'type_evenement',label:"Type d'événement",type:'text',required:true},
      {key:'nombre_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BANQUET ET RÉCEPTION — MICE</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{nom_client}}</strong>.</p><h3>Article 1 — Événement</h3><p>L'Hôtel prend en charge l'organisation de l'événement de type <strong>{{type_evenement}}</strong> pour {{nombre_participants}} participants le {{date_evenement}}.</p><h3>Article 2 — Budget</h3><p>Le budget total convenu est de {{budget_total}} FCFA, incluant restauration, décoration et services annexes.</p><h3>Article 3 — Prestations</h3><p>Les prestations détaillées sont précisées en Annexe (salle, équipements, menu, animation).</p></div>`
  },
  {
    code: 'hotel2_location_salle_reunion',
    name: "Accord de Service de Location de Salle de Réunion Hôtelière",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de location de salles de réunion et de conférence dans un hôtel de luxe, avec services inclus.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'nom_locataire',label:"Nom du Locataire",type:'text',required:true},
      {key:'nom_salle',label:"Nom/Référence de la Salle",type:'text',required:true},
      {key:'tarif_demi_journee',label:"Tarif demi-journée (FCFA)",type:'text',required:true},
      {key:'date_reservation',label:"Date de réservation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LOCATION DE SALLE DE RÉUNION</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{nom_locataire}}</strong>.</p><h3>Article 1 — Location</h3><p>L'Hôtel met à disposition la salle <strong>{{nom_salle}}</strong> le {{date_reservation}} au tarif de {{tarif_demi_journee}} FCFA la demi-journée.</p><h3>Article 2 — Services Inclus</h3><p>La location inclut : équipements audiovisuels, connexion internet haut débit, accueil et pause-café.</p><h3>Article 3 — Conditions</h3><p>Tout dommage causé aux équipements sera facturé au Locataire selon barème en vigueur.</p></div>`
  },
  {
    code: 'hotel2_spa_bien_etre',
    name: "Accord de Service de Spa et Bien-Être Hôtelier",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 22000,
    description: "Convention de service pour l'exploitation du spa et des installations de bien-être intégrés à un hôtel de luxe.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'operateur_spa',label:"Opérateur Spa",type:'text',required:true},
      {key:'superficie_spa',label:"Superficie du Spa (m²)",type:'text',required:true},
      {key:'redevance_mensuelle',label:"Redevance mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SPA ET BIEN-ÊTRE HÔTELIER</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{operateur_spa}}</strong>.</p><h3>Article 1 — Exploitation</h3><p>L'Opérateur Spa gère l'espace bien-être de {{superficie_spa}} m² intégré à l'Hôtel.</p><h3>Article 2 — Redevance</h3><p>Une redevance mensuelle de {{redevance_mensuelle}} FCFA est versée à l'Hôtel.</p><h3>Article 3 — Standards</h3><p>L'ensemble des prestations doit respecter les standards 5 étoiles de l'établissement et les réglementations sanitaires en vigueur.</p></div>`
  },
  {
    code: 'hotel2_piscine_sport',
    name: "Accord de Service de Piscine et Installations Sportives",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de gestion et maintenance des piscines et installations sportives d'un hôtel de luxe.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'prestataire',label:"Prestataire Gestion Piscine/Sport",type:'text',required:true},
      {key:'installations',label:"Installations concernées",type:'textarea',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PISCINE ET INSTALLATIONS SPORTIVES</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{prestataire}}</strong>.</p><h3>Article 1 — Périmètre</h3><p>Le Prestataire assure la gestion et la maintenance des installations suivantes : {{installations}}</p><h3>Article 2 — Tarification</h3><p>Les prestations sont facturées {{tarif_mensuel}} FCFA par mois.</p><h3>Article 3 — Sécurité</h3><p>Le Prestataire garantit la conformité aux normes de sécurité aquatique et sportive et fournit les maîtres-nageurs sauveteurs diplômés requis.</p></div>`
  },
  {
    code: 'hotel2_shuttle_aeroport',
    name: "Accord de Service de Shuttle Aéroport-Hôtel",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Convention de transport VIP entre l'aéroport et l'hôtel de luxe, incluant accueil personnalisé et véhicules haut de gamme.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'societe_transport',label:"Société de Transport",type:'text',required:true},
      {key:'tarif_aller_simple',label:"Tarif aller simple (FCFA)",type:'text',required:true},
      {key:'type_vehicule',label:"Type de véhicule",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SHUTTLE AÉROPORT-HÔTEL</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{societe_transport}}</strong>.</p><h3>Article 1 — Service</h3><p>La Société de Transport assure le transfert des clients de l'Hôtel entre l'aéroport et l'établissement à bord de véhicules de type {{type_vehicule}}.</p><h3>Article 2 — Tarification</h3><p>Le tarif pour un aller simple est de {{tarif_aller_simple}} FCFA par personne.</p><h3>Article 3 — Accueil</h3><p>Un représentant en uniforme de l'Hôtel accueille les clients à la sortie bagages avec panneau nominatif.</p></div>`
  },
  {
    code: 'hotel2_partenariat_aerien',
    name: "Accord de Partenariat Hôtel-Compagnie Aérienne (Corporate Rate)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 25000,
    description: "Convention de partenariat entre un hôtel de luxe et une compagnie aérienne pour tarifs corporatifs et avantages réciproques.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'compagnie_aerienne',label:"Compagnie Aérienne",type:'text',required:true},
      {key:'taux_reduction_hotel',label:"Taux de réduction hôtel (%)",type:'text',required:true},
      {key:'avantages_compagnie',label:"Avantages accordés à la compagnie",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT HÔTEL-COMPAGNIE AÉRIENNE</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{compagnie_aerienne}}</strong>.</p><h3>Article 1 — Tarifs Corporatifs</h3><p>L'Hôtel accorde à la Compagnie Aérienne une réduction de {{taux_reduction_hotel}}% sur ses tarifs standards pour les équipages et passagers en transit.</p><h3>Article 2 — Avantages Réciproques</h3><p>En contrepartie, la Compagnie Aérienne s'engage à : {{avantages_compagnie}}</p><h3>Article 3 — Durée</h3><p>Le présent accord est conclu pour une durée d'un an, renouvelable par tacite reconduction.</p></div>`
  },
  {
    code: 'hotel2_accueil_vip',
    name: "Accord de Service d'Accueil VIP (Protocole d'État)",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 30000,
    description: "Convention de service pour l'accueil de personnalités de haut rang, chefs d'État et délégations officielles dans un hôtel de luxe.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'organisme_client',label:"Organisme/Délégation Cliente",type:'text',required:true},
      {key:'niveau_protocole',label:"Niveau de protocole (État/Diplomatique/Corporate)",type:'text',required:true},
      {key:'tarif_journalier',label:"Tarif journalier VIP (FCFA)",type:'text',required:true},
      {key:'date_sejour',label:"Date de séjour",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ACCUEIL VIP — PROTOCOLE D'ÉTAT</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{organisme_client}}</strong>.</p><h3>Article 1 — Niveau de Service</h3><p>L'Hôtel s'engage à fournir un accueil de niveau <strong>{{niveau_protocole}}</strong> pour le séjour du {{date_sejour}}.</p><h3>Article 2 — Tarification</h3><p>Le tarif journalier VIP est fixé à {{tarif_journalier}} FCFA, toutes prestations incluses.</p><h3>Article 3 — Confidentialité</h3><p>Toutes les informations relatives au séjour sont strictement confidentielles. Toute divulgation est interdite sous peine de sanctions.</p></div>`
  },
  {
    code: 'hotel2_rapport_performance',
    name: "Rapport de Performance Hôtelière",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Rapport standardisé d'analyse des indicateurs clés de performance d'un hôtel (KPI, RevPAR, taux d'occupation, satisfaction client).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'taux_occupation',label:"Taux d'occupation (%)",type:'text',required:true},
      {key:'revpar',label:"RevPAR (FCFA)",type:'text',required:true},
      {key:'score_satisfaction',label:"Score satisfaction client (/10)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE HÔTELIÈRE</h1><h2>{{nom_hotel}} — Période : {{periode}}</h2><h3>Indicateurs Clés</h3><ul><li>Taux d'occupation : {{taux_occupation}}%</li><li>RevPAR : {{revpar}} FCFA</li><li>Score satisfaction client : {{score_satisfaction}}/10</li></ul><h3>Analyse</h3><p>Ce rapport présente les performances de l'établissement pour la période considérée et formule des recommandations d'amélioration.</p></div>`
  },
  {
    code: 'hotel2_plan_dev_resort',
    name: "Plan de Développement Resort 5 Étoiles",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 40000,
    description: "Document stratégique de planification pour le développement ou l'extension d'un resort de luxe en Afrique francophone.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_projet',label:"Nom du Projet Resort",type:'text',required:true},
      {key:'localisation',label:"Localisation",type:'text',required:true},
      {key:'capacite_chambres',label:"Capacité (nombre de chambres)",type:'text',required:true},
      {key:'investissement_total',label:"Investissement total estimé (FCFA)",type:'text',required:true},
      {key:'date_ouverture_prevue',label:"Date d'ouverture prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT RESORT 5 ÉTOILES</h1><h2>Projet : {{nom_projet}}</h2><p>Localisation : {{localisation}} | Capacité : {{capacite_chambres}} chambres | Ouverture prévue : {{date_ouverture_prevue}}</p><h3>1. Vision et Positionnement</h3><p>Développement d'un resort de luxe positionné sur le segment haut de gamme du marché touristique africain.</p><h3>2. Investissement</h3><p>Budget total estimé : {{investissement_total}} FCFA.</p><h3>3. Phases de Développement</h3><p>Le projet se déroule en 3 phases : conception, construction et lancement commercial.</p></div>`
  },
  {
    code: 'hotel2_formation_hoteliere',
    name: "Accord de Service de Formation Hôtelière (École Hôtelière)",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Convention de partenariat entre un hôtel de luxe et une école hôtelière pour la formation et l'accueil de stagiaires.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'ecole_hoteliere',label:"École Hôtelière",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires par promotion",type:'text',required:true},
      {key:'duree_stage',label:"Durée du stage (mois)",type:'text',required:true},
      {key:'gratification_stagiaire',label:"Gratification mensuelle stagiaire (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION HÔTELIÈRE</h1><p>Entre <strong>{{nom_hotel}}</strong> et <strong>{{ecole_hoteliere}}</strong>.</p><h3>Article 1 — Accueil de Stagiaires</h3><p>L'Hôtel accueille {{nombre_stagiaires}} stagiaires par promotion pour une durée de {{duree_stage}} mois chacun.</p><h3>Article 2 — Gratification</h3><p>Chaque stagiaire perçoit une gratification mensuelle de {{gratification_stagiaire}} FCFA.</p><h3>Article 3 — Encadrement</h3><p>L'Hôtel désigne un maître de stage pour chaque stagiaire et fournit un rapport d'évaluation à l'issue du stage.</p></div>`
  },
  {
    code: 'hotel2_charte_luxe_durable',
    name: "Charte de l'Hôtellerie de Luxe et du Tourisme Durable",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Charte d'engagement pour un développement hôtelier responsable, intégrant les principes de durabilité et de respect de l'environnement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'directeur_general',label:"Directeur Général",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques de l'établissement",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'HÔTELLERIE DE LUXE ET DU TOURISME DURABLE</h1><p>L'établissement <strong>{{nom_hotel}}</strong>, sous la direction de <strong>{{directeur_general}}</strong>, adopte la présente charte le {{date_adoption}}.</p><h3>Nos Engagements</h3><ul><li>Réduction de l'empreinte carbone de l'établissement</li><li>Approvisionnement local et saisonnier pour la restauration</li><li>Gestion responsable de l'eau et de l'énergie</li><li>Soutien aux communautés locales</li></ul><p>{{engagements_specifiques}}</p></div>`
  },

  // ─── SPA / BIEN-ÊTRE AVANCÉ (spa2_) ───
  {
    code: 'spa2_medical_thermalisme',
    name: "Accord de Service de Spa Médical (Thermalisme)",
    category: 'sante',
    price: 9000,
    priceMax: 28000,
    description: "Convention de service pour l'exploitation d'un établissement thermal et de spa médical, encadrée par les normes sanitaires OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_etablissement',label:"Nom de l'Établissement Thermal",type:'text',required:true},
      {key:'medecin_directeur',label:"Médecin Directeur",type:'text',required:true},
      {key:'numero_agrement',label:"Numéro d'agrément sanitaire",type:'text',required:true},
      {key:'soins_proposes',label:"Soins proposés",type:'textarea',required:true},
      {key:'tarif_cure',label:"Tarif cure standard (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SPA MÉDICAL</h1><h2>THERMALISME ET SOINS MÉDICAUX</h2><p>Établissement : <strong>{{nom_etablissement}}</strong> — Médecin Directeur : <strong>{{medecin_directeur}}</strong> — Agrément N° {{numero_agrement}}</p><h3>Article 1 — Prestations</h3><p>L'établissement propose les soins suivants : {{soins_proposes}}</p><h3>Article 2 — Tarification</h3><p>Le tarif d'une cure standard est fixé à {{tarif_cure}} FCFA.</p><h3>Article 3 — Encadrement Médical</h3><p>Tout soin est précédé d'une consultation médicale obligatoire et d'un bilan de santé adapté.</p></div>`
  },
  {
    code: 'spa2_balneotherapie',
    name: "Accord de Service de Balnéothérapie et Hydrothérapie",
    category: 'sante',
    price: 7000,
    priceMax: 22000,
    description: "Contrat de prestation de soins par l'eau (balnéothérapie, jets, bains thérapeutiques) dans un centre de bien-être.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'centre_soin',label:"Centre de Soins",type:'text',required:true},
      {key:'client_beneficiaire',label:"Client Bénéficiaire",type:'text',required:true},
      {key:'protocole_soins',label:"Protocole de soins",type:'textarea',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BALNÉOTHÉRAPIE ET HYDROTHÉRAPIE</h1><p>Entre <strong>{{centre_soin}}</strong> et <strong>{{client_beneficiaire}}</strong>.</p><h3>Article 1 — Protocole</h3><p>{{protocole_soins}}</p><h3>Article 2 — Tarification</h3><p>Le tarif par séance est de {{tarif_seance}} FCFA.</p><h3>Article 3 — Contre-Indications</h3><p>Le Centre informe le client de toutes les contre-indications et obtient son consentement éclairé préalablement à chaque séance.</p></div>`
  },
  {
    code: 'spa2_cryotherapie',
    name: "Accord de Service de Cryothérapie",
    category: 'sante',
    price: 7000,
    priceMax: 20000,
    description: "Convention de prestation de soins par le froid (cryothérapie corps entier, locale) dans un centre de bien-être ou médical.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'centre_soin',label:"Centre de Soins",type:'text',required:true},
      {key:'praticien',label:"Praticien Certifié",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances prescrites",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CRYOTHÉRAPIE</h1><p>Entre <strong>{{centre_soin}}</strong> et son client, pris en charge par <strong>{{praticien}}</strong>.</p><h3>Article 1 — Programme</h3><p>Un programme de {{nombre_seances}} séances de cryothérapie est prescrit au tarif unitaire de {{tarif_seance}} FCFA.</p><h3>Article 2 — Protocole de Sécurité</h3><p>Chaque séance est précédée d'une évaluation médicale. Les températures et durées d'exposition sont strictement contrôlées.</p><h3>Article 3 — Consentement</h3><p>Le client reconnaît avoir été informé des bénéfices et des risques inhérents à la cryothérapie.</p></div>`
  },
  {
    code: 'spa2_halotherapie',
    name: "Accord de Service de Halothérapie (Grotte de Sel)",
    category: 'sante',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de prestation de soins par l'aérosol salin (halothérapie) en grotte de sel naturelle ou artificielle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'centre_soin',label:"Centre de Soins",type:'text',required:true},
      {key:'type_grotte',label:"Type de grotte (naturelle/artificielle)",type:'text',required:true},
      {key:'indication_therapeutique',label:"Indication thérapeutique principale",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE HALOTHÉRAPIE</h1><h2>GROTTE DE SEL — {{type_grotte}}</h2><p>Centre : <strong>{{centre_soin}}</strong></p><h3>Article 1 — Indication</h3><p>Les séances de halothérapie sont recommandées pour : {{indication_therapeutique}}</p><h3>Article 2 — Tarification</h3><p>Le tarif par séance est de {{tarif_seance}} FCFA.</p><h3>Article 3 — Conditions d'Accès</h3><p>L'accès à la grotte de sel est interdit aux personnes souffrant de certaines affections. Un questionnaire de santé est rempli avant la première séance.</p></div>`
  },
  {
    code: 'spa2_flottaison_sensorielle',
    name: "Accord de Service de Flottaison Sensorielle",
    category: 'sante',
    price: 5000,
    priceMax: 15000,
    description: "Convention de prestation de séances de flottaison en caisson sensoriel (float tank) pour la relaxation profonde et la récupération.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'centre_soin',label:"Centre de Flottaison",type:'text',required:true},
      {key:'nombre_caissons',label:"Nombre de caissons disponibles",type:'text',required:true},
      {key:'duree_seance',label:"Durée standard d'une séance (minutes)",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FLOTTAISON SENSORIELLE</h1><p>Centre : <strong>{{centre_soin}}</strong> — {{nombre_caissons}} caissons disponibles.</p><h3>Article 1 — Prestation</h3><p>Le Centre propose des séances de flottaison sensorielle d'une durée de {{duree_seance}} minutes au tarif de {{tarif_seance}} FCFA par séance.</p><h3>Article 2 — Hygiène</h3><p>Chaque caisson est nettoyé et désinfecté après chaque utilisation selon le protocole certifié du Centre.</p><h3>Article 3 — Contre-Indications</h3><p>La liste des contre-indications est remise à chaque nouveau client avant la première séance.</p></div>`
  },
  {
    code: 'spa2_osteopathie',
    name: "Accord de Service d'Ostéopathie",
    category: 'sante',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de prestation de soins ostéopathiques par un praticien certifié dans un centre de bien-être ou une structure médicale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'cabinet_osteo',label:"Cabinet/Centre d'Ostéopathie",type:'text',required:true},
      {key:'osteopathe',label:"Nom de l'Ostéopathe",type:'text',required:true},
      {key:'numero_certification',label:"Numéro de certification",type:'text',required:true},
      {key:'tarif_consultation',label:"Tarif consultation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'OSTÉOPATHIE</h1><p>Praticien : <strong>{{osteopathe}}</strong> — Certification N° {{numero_certification}} — Cabinet : <strong>{{cabinet_osteo}}</strong></p><h3>Article 1 — Prestation</h3><p>L'Ostéopathe réalise des consultations et soins ostéopathiques au tarif de {{tarif_consultation}} FCFA par séance.</p><h3>Article 2 — Dossier Patient</h3><p>Un dossier patient confidentiel est constitué et tenu à jour pour chaque consultation.</p><h3>Article 3 — Déontologie</h3><p>Le praticien s'engage à respecter le code de déontologie de sa profession et à orienter le patient vers un médecin si nécessaire.</p></div>`
  },
  {
    code: 'spa2_naturopathie',
    name: "Accord de Service de Naturopathie",
    category: 'sante',
    price: 4500,
    priceMax: 14000,
    description: "Convention de prestation de soins naturopathiques incluant bilan de vitalité, conseils hygiéno-diététiques et techniques naturelles.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'centre_naturo',label:"Centre de Naturopathie",type:'text',required:true},
      {key:'naturopathe',label:"Nom du Naturopathe",type:'text',required:true},
      {key:'bilan_initial',label:"Contenu du bilan initial",type:'textarea',required:true},
      {key:'tarif_bilan',label:"Tarif bilan initial (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NATUROPATHIE</h1><p>Centre : <strong>{{centre_naturo}}</strong> — Naturopathe : <strong>{{naturopathe}}</strong></p><h3>Article 1 — Bilan Initial</h3><p>La première consultation comprend : {{bilan_initial}} — Tarif : {{tarif_bilan}} FCFA.</p><h3>Article 2 — Approche</h3><p>La naturopathie utilise des méthodes naturelles (alimentation, phytothérapie, gestion du stress) pour soutenir la vitalité du client.</p><h3>Article 3 — Limites</h3><p>La naturopathie est complémentaire à la médecine conventionnelle et ne se substitue en aucun cas au traitement médical prescrit.</p></div>`
  },
  {
    code: 'spa2_ayurveda',
    name: "Accord de Service d'Ayurvéda",
    category: 'sante',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de prestation de soins ayurvédiques authentiques (massages, panchakarma, conseils de vie) dans un centre spécialisé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'centre_ayurveda',label:"Centre Ayurvédique",type:'text',required:true},
      {key:'praticien_ayurveda',label:"Praticien Ayurvédique",type:'text',required:true},
      {key:'type_prakriti',label:"Type de constitution (Prakriti)",type:'text',required:false},
      {key:'programme_soins',label:"Programme de soins",type:'textarea',required:true},
      {key:'tarif_programme',label:"Tarif du programme (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AYURVÉDA</h1><p>Centre : <strong>{{centre_ayurveda}}</strong> — Praticien : <strong>{{praticien_ayurveda}}</strong></p><h3>Article 1 — Bilan Ayurvédique</h3><p>Constitution du client (Prakriti) : {{type_prakriti}}</p><h3>Article 2 — Programme</h3><p>{{programme_soins}}</p><h3>Article 3 — Tarification</h3><p>Le tarif du programme est de {{tarif_programme}} FCFA.</p></div>`
  },
  {
    code: 'spa2_medecine_traditionnelle_africaine',
    name: "Accord de Service de Médecine Traditionnelle Africaine (MTI)",
    category: 'sante',
    price: 5000,
    priceMax: 16000,
    description: "Convention de service intégrant la médecine traditionnelle africaine (MTI) selon les directives de l'OMS et les réglementations nationales.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'centre_mti',label:"Centre MTI",type:'text',required:true},
      {key:'tradipraticien',label:"Tradipraticien Certifié",type:'text',required:true},
      {key:'numero_enregistrement',label:"Numéro d'enregistrement officiel",type:'text',required:true},
      {key:'soins_traditionnels',label:"Soins traditionnels proposés",type:'textarea',required:true},
      {key:'tarif_consultation',label:"Tarif consultation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MÉDECINE TRADITIONNELLE AFRICAINE</h1><p>Centre : <strong>{{centre_mti}}</strong> — Tradipraticien : <strong>{{tradipraticien}}</strong> — Enregistrement N° {{numero_enregistrement}}</p><h3>Article 1 — Soins Proposés</h3><p>{{soins_traditionnels}}</p><h3>Article 2 — Tarification</h3><p>La consultation est facturée {{tarif_consultation}} FCFA.</p><h3>Article 3 — Conformité</h3><p>Tous les soins sont pratiqués conformément aux directives de l'OMS sur la médecine traditionnelle et aux réglementations sanitaires locales.</p></div>`
  },
  {
    code: 'spa2_massage_therapeutique',
    name: "Accord de Service de Massage Thérapeutique Professionnel",
    category: 'sante',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de prestation de massages thérapeutiques professionnels par des praticiens certifiés dans un spa ou centre de bien-être.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'centre_massage',label:"Centre de Massage",type:'text',required:true},
      {key:'masseur_therapeute',label:"Masseur-Thérapeute Certifié",type:'text',required:true},
      {key:'type_massage',label:"Type de massage (suédois, deep tissue, etc.)",type:'text',required:true},
      {key:'duree_seance',label:"Durée de la séance (minutes)",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MASSAGE THÉRAPEUTIQUE PROFESSIONNEL</h1><p>Centre : <strong>{{centre_massage}}</strong> — Thérapeute : <strong>{{masseur_therapeute}}</strong></p><h3>Article 1 — Prestation</h3><p>Type de massage : <strong>{{type_massage}}</strong> — Durée : {{duree_seance}} minutes — Tarif : {{tarif_seance}} FCFA.</p><h3>Article 2 — Protocole</h3><p>Chaque séance débute par une anamnèse courte et un recueil des zones douloureuses du client.</p><h3>Article 3 — Hygiène</h3><p>Le praticien respecte les règles d'hygiène strictes et utilise exclusivement des produits homologués.</p></div>`
  },
  {
    code: 'spa2_reflexologie_plantaire',
    name: "Accord de Service de Réflexologie Plantaire",
    category: 'sante',
    price: 4000,
    priceMax: 12000,
    description: "Convention de prestation de réflexologie plantaire par un praticien certifié dans un spa ou cabinet de bien-être.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'centre',label:"Centre de Bien-Être",type:'text',required:true},
      {key:'reflexologue',label:"Réflexologue Certifié",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances du programme",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉFLEXOLOGIE PLANTAIRE</h1><p>Centre : <strong>{{centre}}</strong> — Réflexologue : <strong>{{reflexologue}}</strong></p><h3>Article 1 — Programme</h3><p>Un programme de {{nombre_seances}} séances de réflexologie plantaire est proposé au tarif de {{tarif_seance}} FCFA par séance.</p><h3>Article 2 — Objectifs</h3><p>La réflexologie plantaire vise à stimuler les zones réflexes correspondant aux organes pour favoriser l'équilibre et le bien-être global.</p></div>`
  },
  {
    code: 'spa2_shiatsu_acupression',
    name: "Accord de Service de Shiatsu et Acupression",
    category: 'sante',
    price: 4500,
    priceMax: 14000,
    description: "Contrat de prestation de shiatsu et techniques d'acupression par un praticien diplômé pour l'harmonisation des énergies vitales.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'centre',label:"Centre de Pratique",type:'text',required:true},
      {key:'praticien',label:"Praticien Shiatsu Diplômé",type:'text',required:true},
      {key:'technique_utilisee',label:"Technique principale (shiatsu/acupression)",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SHIATSU ET ACUPRESSION</h1><p>Centre : <strong>{{centre}}</strong> — Praticien : <strong>{{praticien}}</strong></p><h3>Article 1 — Technique</h3><p>Le praticien applique la technique de <strong>{{technique_utilisee}}</strong> pour harmoniser les méridiens énergétiques du client.</p><h3>Article 2 — Tarification</h3><p>Chaque séance est facturée {{tarif_seance}} FCFA.</p><h3>Article 3 — Consentement</h3><p>Le client confirme n'avoir aucune contre-indication connue à la pratique du shiatsu/acupression.</p></div>`
  },
  {
    code: 'spa2_acupuncture',
    name: "Accord de Service d'Acupuncture",
    category: 'sante',
    price: 5000,
    priceMax: 16000,
    description: "Convention de service d'acupuncture médicale réalisée par un praticien diplômé, conforme aux réglementations sanitaires en vigueur.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet d'Acupuncture",type:'text',required:true},
      {key:'acupuncteur',label:"Acupuncteur Diplômé",type:'text',required:true},
      {key:'numero_diplome',label:"Numéro de diplôme/autorisation",type:'text',required:true},
      {key:'indication',label:"Indication thérapeutique",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ACUPUNCTURE</h1><p>Cabinet : <strong>{{cabinet}}</strong> — Praticien : <strong>{{acupuncteur}}</strong> — Diplôme N° {{numero_diplome}}</p><h3>Article 1 — Indication</h3><p>Les séances d'acupuncture sont prescrites pour : {{indication}}</p><h3>Article 2 — Tarification</h3><p>Le tarif par séance est de {{tarif_seance}} FCFA.</p><h3>Article 3 — Matériel</h3><p>Le praticien utilise exclusivement des aiguilles à usage unique stériles, conformément aux normes sanitaires.</p></div>`
  },
  {
    code: 'spa2_meditation_yoga_retraite',
    name: "Accord de Service de Méditation et Yoga (Retraite)",
    category: 'sante',
    price: 6000,
    priceMax: 20000,
    description: "Contrat d'organisation de retraites de méditation et de yoga, incluant hébergement, repas végétariens et programme de pratique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'centre_retraite',label:"Centre de Retraite",type:'text',required:true},
      {key:'instructeur',label:"Instructeur Principal",type:'text',required:true},
      {key:'duree_retraite',label:"Durée de la retraite (jours)",type:'text',required:true},
      {key:'tarif_total',label:"Tarif tout inclus (FCFA)",type:'text',required:true},
      {key:'date_retraite',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MÉDITATION ET YOGA</h1><h2>RETRAITE DE BIEN-ÊTRE</h2><p>Centre : <strong>{{centre_retraite}}</strong> — Instructeur : <strong>{{instructeur}}</strong></p><h3>Article 1 — Programme</h3><p>Retraite de {{duree_retraite}} jours débutant le {{date_retraite}}, comprenant sessions de méditation, cours de yoga, repas végétariens et hébergement.</p><h3>Article 2 — Tarification</h3><p>Tarif tout inclus : {{tarif_total}} FCFA par participant.</p><h3>Article 3 — Annulation</h3><p>Toute annulation moins de 15 jours avant le début entraîne la perte de l'acompte versé.</p></div>`
  },
  {
    code: 'spa2_coaching_vie',
    name: "Accord de Service de Coaching de Vie (Life Coaching)",
    category: 'sante',
    price: 5000,
    priceMax: 16000,
    description: "Convention de service de coaching de vie individuel ou en groupe pour l'accompagnement personnel et professionnel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'coach',label:"Coach Certifié",type:'text',required:true},
      {key:'client',label:"Nom du Client",type:'text',required:true},
      {key:'objectif_coaching',label:"Objectif principal du coaching",type:'textarea',required:true},
      {key:'nombre_seances',label:"Nombre de séances",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COACHING DE VIE</h1><p>Coach : <strong>{{coach}}</strong> — Client : <strong>{{client}}</strong></p><h3>Article 1 — Objectif</h3><p>{{objectif_coaching}}</p><h3>Article 2 — Programme</h3><p>Un programme de {{nombre_seances}} séances est convenu au tarif de {{tarif_seance}} FCFA par séance.</p><h3>Article 3 — Confidentialité</h3><p>Toutes les informations échangées lors des séances sont strictement confidentielles.</p></div>`
  },
  {
    code: 'spa2_jeune_detox',
    name: "Accord de Service de Jeûne et Détox (Cure)",
    category: 'sante',
    price: 7000,
    priceMax: 22000,
    description: "Convention de cure de jeûne thérapeutique et de détoxification accompagnée par des professionnels de santé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'centre_detox',label:"Centre Détox",type:'text',required:true},
      {key:'accompagnateur_medical',label:"Accompagnateur Médical",type:'text',required:true},
      {key:'type_cure',label:"Type de cure (jeûne hydrique, sec, jus...)",type:'text',required:true},
      {key:'duree_cure',label:"Durée de la cure (jours)",type:'text',required:true},
      {key:'tarif_cure',label:"Tarif de la cure (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE JEÛNE ET DÉTOX</h1><p>Centre : <strong>{{centre_detox}}</strong> — Accompagnement médical : <strong>{{accompagnateur_medical}}</strong></p><h3>Article 1 — Cure</h3><p>Type de cure : <strong>{{type_cure}}</strong> — Durée : {{duree_cure}} jours — Tarif : {{tarif_cure}} FCFA.</p><h3>Article 2 — Suivi Médical</h3><p>Un suivi médical quotidien est assuré tout au long de la cure. Le programme est interrompu si l'état de santé du client le requiert.</p><h3>Article 3 — Contre-Indications</h3><p>La cure est contre-indiquée pour les personnes souffrant de pathologies graves. Un bilan médical préalable est obligatoire.</p></div>`
  },
  {
    code: 'spa2_nutrition_sante',
    name: "Accord de Service de Nutrition et Alimentation Santé",
    category: 'sante',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de consultation et suivi nutritionnel par un diététicien-nutritionniste diplômé pour une alimentation santé personnalisée.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'nutritionniste',label:"Diététicien-Nutritionniste",type:'text',required:true},
      {key:'client',label:"Nom du Client",type:'text',required:true},
      {key:'objectif_nutritionnel',label:"Objectif nutritionnel",type:'text',required:true},
      {key:'duree_suivi',label:"Durée du suivi (mois)",type:'text',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NUTRITION ET ALIMENTATION SANTÉ</h1><p>Nutritionniste : <strong>{{nutritionniste}}</strong> — Client : <strong>{{client}}</strong></p><h3>Article 1 — Objectif</h3><p>Objectif nutritionnel : {{objectif_nutritionnel}}</p><h3>Article 2 — Suivi</h3><p>Un suivi personnalisé sur {{duree_suivi}} mois est proposé au tarif de {{tarif_mensuel}} FCFA par mois.</p><h3>Article 3 — Plan Alimentaire</h3><p>Un plan alimentaire personnalisé est établi et révisé mensuellement selon les progrès du client.</p></div>`
  },
  {
    code: 'spa2_sophrologie',
    name: "Accord de Service de Sophrologie",
    category: 'sante',
    price: 4500,
    priceMax: 14000,
    description: "Convention de prestation sophrologique pour la gestion du stress, la préparation mentale et le développement personnel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      {key:'sophrologue',label:"Sophrologue Certifié",type:'text',required:true},
      {key:'client',label:"Nom du Client",type:'text',required:true},
      {key:'objectif_seances',label:"Objectif des séances",type:'textarea',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOPHROLOGIE</h1><p>Sophrologue : <strong>{{sophrologue}}</strong> — Client : <strong>{{client}}</strong></p><h3>Article 1 — Objectif</h3><p>{{objectif_seances}}</p><h3>Article 2 — Tarification</h3><p>Le tarif par séance est de {{tarif_seance}} FCFA.</p><h3>Article 3 — Méthode</h3><p>La sophrologie combine des techniques de relaxation, de respiration et de visualisation positive pour atteindre les objectifs définis.</p></div>`
  },
  {
    code: 'spa2_hypnotherapie',
    name: "Accord de Service d'Hypnothérapie",
    category: 'sante',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de prestation d'hypnothérapie clinique par un praticien certifié pour accompagner les changements comportementaux.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'hypnotherapeute',label:"Hypnothérapeute Certifié",type:'text',required:true},
      {key:'client',label:"Nom du Client",type:'text',required:true},
      {key:'problematique',label:"Problématique traitée",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances estimé",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'HYPNOTHÉRAPIE</h1><p>Praticien : <strong>{{hypnotherapeute}}</strong> — Client : <strong>{{client}}</strong></p><h3>Article 1 — Problématique</h3><p>Les séances d'hypnothérapie visent à traiter : {{problematique}}</p><h3>Article 2 — Programme</h3><p>Estimation de {{nombre_seances}} séances à {{tarif_seance}} FCFA l'unité.</p><h3>Article 3 — Limites</h3><p>L'hypnothérapie est une pratique complémentaire. Elle ne remplace pas un traitement psychiatrique ou médical prescrit.</p></div>`
  },
  {
    code: 'spa2_musicotherapie',
    name: "Accord de Service de Musicothérapie",
    category: 'sante',
    price: 4500,
    priceMax: 14000,
    description: "Convention de prestation musicothérapeutique utilisant la musique comme outil thérapeutique pour le soin et le bien-être.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'musicotherapeute',label:"Musicothérapeute Certifié",type:'text',required:true},
      {key:'structure',label:"Structure d'Accueil",type:'text',required:true},
      {key:'public_cible',label:"Public cible (adultes, enfants, seniors)",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MUSICOTHÉRAPIE</h1><p>Praticien : <strong>{{musicotherapeute}}</strong> — Structure : <strong>{{structure}}</strong></p><h3>Article 1 — Public</h3><p>Les séances de musicothérapie sont destinées à : {{public_cible}}</p><h3>Article 2 — Tarification</h3><p>Le tarif par séance est de {{tarif_seance}} FCFA.</p><h3>Article 3 — Approche</h3><p>La musicothérapie alterne des approches réceptives (écoute musicale) et actives (improvisation, création) selon les besoins du groupe.</p></div>`
  },
  {
    code: 'spa2_chromo_luminotherapie',
    name: "Accord de Service de Chromo et Luminothérapie",
    category: 'sante',
    price: 4500,
    priceMax: 14000,
    description: "Contrat de prestation de chromothérapie (couleurs) et de luminothérapie (lumière) pour l'harmonisation et le bien-être.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'centre',label:"Centre de Bien-Être",type:'text',required:true},
      {key:'praticien',label:"Praticien en Luminothérapie",type:'text',required:true},
      {key:'type_soin',label:"Type de soin (chromo/lumino/combiné)",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CHROMO ET LUMINOTHÉRAPIE</h1><p>Centre : <strong>{{centre}}</strong> — Praticien : <strong>{{praticien}}</strong></p><h3>Article 1 — Soin</h3><p>Type de soin proposé : <strong>{{type_soin}}</strong> — Tarif : {{tarif_seance}} FCFA par séance.</p><h3>Article 2 — Équipements</h3><p>Le Centre utilise des équipements certifiés conformes aux normes de sécurité pour les dispositifs lumineux et chromatiques.</p><h3>Article 3 — Bienfaits</h3><p>Les soins visent à rééquilibrer les énergies, améliorer l'humeur et soulager certains troubles saisonniers ou émotionnels.</p></div>`
  },
  {
    code: 'spa2_soin_visage_corps_premium',
    name: "Accord de Service de Soin du Visage et Corps Premium",
    category: 'sante',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de prestation de soins esthétiques haut de gamme du visage et du corps dans un spa de luxe.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'spa',label:"Nom du Spa",type:'text',required:true},
      {key:'estheticienne',label:"Esthéticienne Diplômée",type:'text',required:true},
      {key:'soins_choisis',label:"Soins choisis",type:'textarea',required:true},
      {key:'tarif_total',label:"Tarif total forfait (FCFA)",type:'text',required:true},
      {key:'date_prestation',label:"Date de prestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOIN DU VISAGE ET CORPS PREMIUM</h1><p>Spa : <strong>{{spa}}</strong> — Esthéticienne : <strong>{{estheticienne}}</strong> — Date : {{date_prestation}}</p><h3>Article 1 — Soins</h3><p>{{soins_choisis}}</p><h3>Article 2 — Tarification</h3><p>Le forfait soin est facturé {{tarif_total}} FCFA.</p><h3>Article 3 — Produits</h3><p>Uniquement des produits cosmétiques certifiés, adaptés aux peaux africaines, sont utilisés lors des soins.</p></div>`
  },
  {
    code: 'spa2_partenariat_spa_hotel',
    name: "Accord de Partenariat Spa-Hôtel de Luxe",
    category: 'sante',
    price: 9000,
    priceMax: 28000,
    description: "Convention de partenariat entre un spa indépendant et un hôtel de luxe pour offrir des services de bien-être à la clientèle hôtelière.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'nom_spa',label:"Nom du Spa",type:'text',required:true},
      {key:'nom_hotel',label:"Nom de l'Hôtel",type:'text',required:true},
      {key:'commission_hotel',label:"Commission reversée à l'Hôtel (%)",type:'text',required:true},
      {key:'services_offerts',label:"Services offerts aux clients de l'Hôtel",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du partenariat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT SPA-HÔTEL DE LUXE</h1><p>Entre <strong>{{nom_spa}}</strong> (le Spa) et <strong>{{nom_hotel}}</strong> (l'Hôtel), à compter du {{date_debut}}.</p><h3>Article 1 — Services</h3><p>Le Spa propose les services suivants à la clientèle de l'Hôtel : {{services_offerts}}</p><h3>Article 2 — Commission</h3><p>Le Spa reverse à l'Hôtel une commission de {{commission_hotel}}% sur chaque réservation issue de la clientèle hôtelière.</p><h3>Article 3 — Promotion</h3><p>L'Hôtel s'engage à promouvoir activement les services du Spa auprès de ses clients via tous ses canaux de communication.</p></div>`
  },
  {
    code: 'spa2_rapport_performance_bien_etre',
    name: "Rapport de Performance Centre de Bien-Être",
    category: 'sante',
    price: 3500,
    priceMax: 10000,
    description: "Rapport d'analyse des indicateurs de performance d'un centre de bien-être ou spa (taux de remplissage, CA, satisfaction client).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'nom_centre',label:"Nom du Centre",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'taux_remplissage',label:"Taux de remplissage (%)",type:'text',required:true},
      {key:'ca_periode',label:"Chiffre d'affaires de la période (FCFA)",type:'text',required:true},
      {key:'score_satisfaction',label:"Score satisfaction client (/10)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE — CENTRE DE BIEN-ÊTRE</h1><h2>{{nom_centre}} — Période : {{periode}}</h2><h3>Indicateurs Clés</h3><ul><li>Taux de remplissage : {{taux_remplissage}}%</li><li>Chiffre d'affaires : {{ca_periode}} FCFA</li><li>Score satisfaction : {{score_satisfaction}}/10</li></ul><h3>Analyse et Recommandations</h3><p>Ce rapport présente les résultats du Centre pour la période et formule des axes d'amélioration pour optimiser les performances.</p></div>`
  },
  {
    code: 'spa2_charte_bien_etre_holistique',
    name: "Charte du Bien-Être et de la Santé Holistique en Afrique",
    category: 'sante',
    price: 3000,
    priceMax: 9000,
    description: "Charte d'engagement pour une pratique éthique, inclusive et culturellement ancrée du bien-être et de la santé holistique en Afrique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_centre',label:"Nom du Centre / Établissement",type:'text',required:true},
      {key:'directeur',label:"Directeur / Responsable",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'valeurs_specifiques',label:"Valeurs et engagements spécifiques",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CHARTE DU BIEN-ÊTRE ET DE LA SANTÉ HOLISTIQUE EN AFRIQUE</h1><p>L'établissement <strong>{{nom_centre}}</strong>, sous la responsabilité de <strong>{{directeur}}</strong>, adopte la présente charte le {{date_adoption}}.</p><h3>Nos Valeurs</h3><ul><li>Respect de la dignité et de la diversité culturelle africaine</li><li>Intégration des savoirs traditionnels et des pratiques modernes</li><li>Accessibilité et inclusion de toutes les couches de la population</li><li>Pratique éthique et déontologique de toutes les disciplines</li><li>Formation continue des praticiens</li></ul><p>{{valeurs_specifiques}}</p></div>`
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
  console.log(`Batch 97a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
