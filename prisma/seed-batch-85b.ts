import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 templates Logistique dernier km / Livraison ──
  {
    code: 'log3_last_mile', name: "Accord de service de livraison du dernier kilometre (last mile)", category: 'transport_logistique', price: 4000, priceMax: 12000,
    description: "Accord encadrant la prestation de livraison du dernier kilometre entre un prestataire logistique et un client en zone urbaine.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire logistique",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'zone_couverte',label:"Zone geographique couverte",type:'text',required:true},
      {key:'delai_livraison',label:"Delai de livraison garanti",type:'text',required:true},
      {key:'tarif_colis',label:"Tarif par colis (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LIVRAISON DU DERNIER KILOMETRE</h1><p>Entre <strong>{{prestataire}}</strong>, prestataire logistique, et <strong>{{client}}</strong>, ci-apres denomme le Client.</p><h2>Article 1 – Objet</h2><p>Le present accord definit les conditions de la prestation de livraison du dernier kilometre sur la zone : {{zone_couverte}}.</p><h2>Article 2 – Delai et tarif</h2><p>Le prestataire s'engage a livrer dans un delai de {{delai_livraison}}. Le tarif unitaire par colis est de {{tarif_colis}} FCFA.</p><h2>Article 3 – Prise d'effet</h2><p>Le contrat prend effet le {{date_debut}} et est conclu conformement aux dispositions de l'Acte Uniforme OHADA relatif au droit commercial general.</p></div>`
  },
  {
    code: 'log3_coursier_urbain', name: "Accord de service de coursier urbain (moto-taxi, velo)", category: 'transport_logistique', price: 3000, priceMax: 8000,
    description: "Accord de prestation de service de coursier urbain par moto-taxi ou velo pour la livraison de colis et documents en ville.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'coursier',label:"Nom ou raison sociale du coursier",type:'text',required:true},
      {key:'donneur_ordre',label:"Nom du donneur d'ordre",type:'text',required:true},
      {key:'type_vehicule',label:"Type de vehicule (moto-taxi / velo)",type:'text',required:true},
      {key:'ville',label:"Ville d'intervention",type:'text',required:true},
      {key:'tarif_course',label:"Tarif par course (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COURSIER URBAIN</h1><p>Entre <strong>{{coursier}}</strong> et <strong>{{donneur_ordre}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le coursier assure la livraison de colis et documents en milieu urbain sur la ville de {{ville}} au moyen d'un {{type_vehicule}}.</p><h2>Article 2 – Tarification</h2><p>Le tarif unitaire par course est fixe a {{tarif_course}} FCFA, hors frais exceptionnels.</p><h2>Article 3 – Responsabilite</h2><p>Le coursier est responsable des colis pris en charge jusqu'a la remise au destinataire. Tout litige sera soumis aux juridictions competentes de Cote d'Ivoire.</p></div>`
  },
  {
    code: 'log3_livraison_express', name: "Accord de service de livraison express (J+1)", category: 'transport_logistique', price: 4000, priceMax: 10000,
    description: "Accord de prestation de livraison express garantissant la remise du colis au destinataire le lendemain de l'expedition.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'expediteur',label:"Nom de l'expediteur",type:'text',required:true},
      {key:'prestataire',label:"Nom du prestataire express",type:'text',required:true},
      {key:'zone_livraison',label:"Zone de livraison",type:'text',required:true},
      {key:'plafond_poids',label:"Poids maximum par colis (kg)",type:'text',required:true},
      {key:'tarif_unitaire',label:"Tarif unitaire J+1 (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LIVRAISON EXPRESS (J+1)</h1><p>Conclu entre <strong>{{expediteur}}</strong> et <strong>{{prestataire}}</strong>.</p><h2>Article 1 – Engagement de delai</h2><p>Le prestataire garantit la livraison dans la zone {{zone_livraison}} au plus tard le lendemain ouvre de la prise en charge du colis.</p><h2>Article 2 – Conditions</h2><p>Le service s'applique aux colis n'excedant pas {{plafond_poids}} kg. Le tarif est de {{tarif_unitaire}} FCFA par envoi.</p><h2>Article 3 – Date d'effet</h2><p>Accord signe le {{date_contrat}}, regi par le droit ivoirien et les dispositions OHADA applicables.</p></div>`
  },
  {
    code: 'log3_livraison_programmee', name: "Accord de service de livraison programmee (creneaux)", category: 'transport_logistique', price: 3500, priceMax: 9000,
    description: "Accord encadrant la livraison sur rendez-vous par creneaux horaires definis avec le destinataire.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'creneaux_disponibles',label:"Creneaux horaires proposes",type:'text',required:true},
      {key:'frais_reprogrammation',label:"Frais de reprogrammation (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LIVRAISON PROGRAMMEE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le prestataire propose des creneaux de livraison : {{creneaux_disponibles}}. Le destinataire choisit son creneau lors de la confirmation de commande.</p><h2>Article 2 – Reprogrammation</h2><p>Toute reprogrammation a la demande du client entraine des frais de {{frais_reprogrammation}} FCFA.</p><h2>Article 3 – Prise d'effet</h2><p>Accord en vigueur a compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'log3_collect_ecommerce', name: "Accord de service de collecte et livraison e-commerce", category: 'transport_logistique', price: 4500, priceMax: 12000,
    description: "Accord de service logistique integre pour la collecte chez le vendeur et la livraison a l'acheteur dans le cadre du commerce electronique.", templateType: 'pdf', classe: 'B', active: true, popularity: 83,
    fieldsJson: F([
      {key:'marchand',label:"Nom du marchand en ligne",type:'text',required:true},
      {key:'logisticien',label:"Nom du prestataire logistique",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel estime (colis)",type:'text',required:true},
      {key:'delai_collecte',label:"Delai de collecte apres commande",type:'text',required:true},
      {key:'tarif_colis',label:"Tarif par colis collecte-livre (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COLLECTE ET LIVRAISON E-COMMERCE</h1><p>Entre <strong>{{marchand}}</strong> et <strong>{{logisticien}}</strong>.</p><h2>Article 1 – Perimetre</h2><p>Le logisticien assure la collecte des colis chez le marchand et leur livraison aux acheteurs finaux. Volume mensuel estime : {{volume_mensuel}} colis.</p><h2>Article 2 – Delais et tarifs</h2><p>Collecte sous {{delai_collecte}} apres confirmation de commande. Tarif : {{tarif_colis}} FCFA par colis collecte et livre.</p><h2>Article 3 – Prise d'effet</h2><p>Accord applicable a compter du {{date_debut}}, conforme au droit OHADA.</p></div>`
  },
  {
    code: 'log3_aggregateur', name: "Accord de service de plateforme de livraison (aggregateur)", category: 'transport_logistique', price: 5000, priceMax: 14000,
    description: "Accord entre une plateforme aggregatrice de services de livraison et un transporteur partenaire integre au reseau.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'plateforme',label:"Nom de la plateforme aggregatrice",type:'text',required:true},
      {key:'transporteur',label:"Nom du transporteur partenaire",type:'text',required:true},
      {key:'commission',label:"Taux de commission plateforme (%)",type:'text',required:true},
      {key:'zone',label:"Zone d'intervention",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhesion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PLATEFORME DE LIVRAISON (AGGREGATEUR)</h1><p>Entre <strong>{{plateforme}}</strong> et <strong>{{transporteur}}</strong>.</p><h2>Article 1 – Adhesion au reseau</h2><p>Le transporteur rejoint le reseau de la plateforme pour la zone {{zone}}. Il s'engage a respecter les standards de qualite et de suivi imposes par la plateforme.</p><h2>Article 2 – Commission</h2><p>La plateforme preleve une commission de {{commission}}% sur chaque livraison effectuee via le systeme.</p><h2>Article 3 – Prise d'effet</h2><p>Accord en vigueur a compter du {{date_adhesion}}.</p></div>`
  },
  {
    code: 'log3_food_delivery', name: "Accord de partenariat livreur-restaurant (food delivery)", category: 'transport_logistique', price: 3000, priceMax: 8000,
    description: "Accord de partenariat entre un livreur independant ou une societe de livraison et un restaurant pour la livraison de repas a domicile.", templateType: 'pdf', classe: 'B', active: true, popularity: 88,
    fieldsJson: F([
      {key:'restaurant',label:"Nom du restaurant",type:'text',required:true},
      {key:'livreur',label:"Nom ou raison sociale du livreur",type:'text',required:true},
      {key:'zone_livraison',label:"Rayon de livraison (km)",type:'text',required:true},
      {key:'delai_max',label:"Delai de livraison maximum (minutes)",type:'text',required:true},
      {key:'commission_commande',label:"Commission par commande (FCFA ou %)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT LIVREUR-RESTAURANT</h1><p>Entre <strong>{{restaurant}}</strong> et <strong>{{livreur}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le livreur assure la livraison des repas prepares par le restaurant dans un rayon de {{zone_livraison}} km, dans un delai maximum de {{delai_max}} minutes.</p><h2>Article 2 – Remuneration</h2><p>La remuneration du livreur est de {{commission_commande}} par commande livree.</p><h2>Article 3 – Qualite</h2><p>Le livreur s'engage a maintenir les repas dans des conditions hygieniques adequates jusqu'a la remise au client. Accord regi par le droit ivoirien.</p></div>`
  },
  {
    code: 'log3_pharmacie', name: "Accord de partenariat livreur-pharmacie (medicaments)", category: 'transport_logistique', price: 4000, priceMax: 10000,
    description: "Accord de partenariat entre une pharmacie et un prestataire de livraison pour la distribution de medicaments et produits de sante a domicile.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'pharmacie',label:"Nom de la pharmacie",type:'text',required:true},
      {key:'livreur',label:"Nom du prestataire de livraison",type:'text',required:true},
      {key:'zone',label:"Zone de livraison",type:'text',required:true},
      {key:'conditions_transport',label:"Conditions de transport specifiques",type:'textarea',required:true},
      {key:'tarif',label:"Tarif par livraison (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT LIVREUR-PHARMACIE</h1><p>Entre <strong>{{pharmacie}}</strong> et <strong>{{livreur}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le livreur assure la distribution de medicaments et produits de sante dans la zone {{zone}} selon les conditions de transport suivantes : {{conditions_transport}}.</p><h2>Article 2 – Tarification</h2><p>Le tarif par livraison est de {{tarif}} FCFA.</p><h2>Article 3 – Confidentialite</h2><p>Le livreur s'engage a respecter la confidentialite des informations patients. Accord du {{date_contrat}}, conforme au droit ivoirien.</p></div>`
  },
  {
    code: 'log3_supermarche_drive', name: "Accord de partenariat livreur-supermarche (drive)", category: 'transport_logistique', price: 4000, priceMax: 10000,
    description: "Accord de partenariat entre un supermarche et un prestataire logistique pour la livraison de courses a domicile (service drive).", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'supermarche',label:"Nom du supermarche",type:'text',required:true},
      {key:'logisticien',label:"Nom du prestataire logistique",type:'text',required:true},
      {key:'zone',label:"Zone de livraison",type:'text',required:true},
      {key:'delai',label:"Delai de livraison garanti",type:'text',required:true},
      {key:'tarif',label:"Tarif de livraison (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT LIVREUR-SUPERMARCHE (DRIVE)</h1><p>Entre <strong>{{supermarche}}</strong> et <strong>{{logisticien}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le logisticien assure la livraison des commandes de courses dans la zone {{zone}} dans un delai de {{delai}}.</p><h2>Article 2 – Tarification</h2><p>Le tarif de livraison est de {{tarif}} FCFA par commande.</p><h2>Article 3 – Gestion des produits</h2><p>Les produits frais sont transportes dans des conditions adequates. Tout dommage engage la responsabilite du logisticien.</p></div>`
  },
  {
    code: 'log3_reverse_logistics', name: "Accord de service de gestion de retours (reverse logistics)", category: 'transport_logistique', price: 4500, priceMax: 11000,
    description: "Accord encadrant la gestion des retours de marchandises par le prestataire logistique, de la collecte jusqu'au traitement.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'logisticien',label:"Nom du logisticien",type:'text',required:true},
      {key:'motifs_retour',label:"Motifs de retour admissibles",type:'textarea',required:true},
      {key:'delai_collecte',label:"Delai de collecte du retour",type:'text',required:true},
      {key:'tarif_retour',label:"Tarif par retour traite (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE RETOURS (REVERSE LOGISTICS)</h1><p>Entre <strong>{{client}}</strong> et <strong>{{logisticien}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le logisticien prend en charge la collecte et le traitement des retours de marchandises. Motifs admissibles : {{motifs_retour}}.</p><h2>Article 2 – Delai et tarif</h2><p>La collecte intervient sous {{delai_collecte}} apres signalement du retour. Le tarif est de {{tarif_retour}} FCFA par dossier traite.</p><h2>Article 3 – Droit applicable</h2><p>Accord soumis au droit OHADA et aux juridictions competentes de Cote d'Ivoire.</p></div>`
  },
  {
    code: 'log3_tracking', name: "Accord de service de suivi de colis en temps reel (tracking)", category: 'transport_logistique', price: 3500, priceMax: 9000,
    description: "Accord de prestation de service de suivi en temps reel des colis par systeme GPS et notifications automatiques.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire tracking",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'technologie',label:"Technologie utilisee (GPS, RFID, etc.)",type:'text',required:true},
      {key:'frequence_maj',label:"Frequence de mise a jour (minutes)",type:'text',required:true},
      {key:'tarif_mensuel',label:"Abonnement mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUIVI DE COLIS EN TEMPS REEL</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le prestataire fournit un systeme de tracking base sur la technologie {{technologie}}, avec une mise a jour de position toutes les {{frequence_maj}} minutes.</p><h2>Article 2 – Tarification</h2><p>Abonnement mensuel : {{tarif_mensuel}} FCFA.</p><h2>Article 3 – Donnees</h2><p>Les donnees de geolocalisation sont protegees et ne peuvent etre transmises a des tiers sans accord prealable.</p></div>`
  },
  {
    code: 'log3_locker', name: "Accord de service de boite a colis (locker)", category: 'transport_logistique', price: 4000, priceMax: 10000,
    description: "Accord de mise a disposition et gestion de casiers automatiques (lockers) pour la remise de colis sans contact.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'operateur',label:"Nom de l'operateur du locker",type:'text',required:true},
      {key:'partenaire',label:"Nom du partenaire (marchand / transporteur)",type:'text',required:true},
      {key:'emplacement',label:"Adresse d'implantation du locker",type:'text',required:true},
      {key:'nombre_casiers',label:"Nombre de casiers disponibles",type:'text',required:true},
      {key:'tarif_utilisation',label:"Tarif d'utilisation par depot (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BOITE A COLIS (LOCKER)</h1><p>Entre <strong>{{operateur}}</strong> et <strong>{{partenaire}}</strong>.</p><h2>Article 1 – Objet</h2><p>L'operateur met a disposition {{nombre_casiers}} casiers automatiques a l'adresse : {{emplacement}}.</p><h2>Article 2 – Tarification</h2><p>Le partenaire paie {{tarif_utilisation}} FCFA par depot effectue dans le systeme.</p><h2>Article 3 – Securite</h2><p>L'operateur garantit la securite physique des casiers et la confidentialite des codes d'acces.</p></div>`
  },
  {
    code: 'log3_senior', name: "Accord de service de livraison a domicile senior", category: 'transport_logistique', price: 3000, priceMax: 7000,
    description: "Accord de service de livraison a domicile adapte aux besoins specifiques des personnes agees, avec assistance a la remise.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'client_beneficiaire',label:"Nom du client ou structure commanditaire",type:'text',required:true},
      {key:'services_inclus',label:"Services inclus (portage, mise en place, etc.)",type:'textarea',required:true},
      {key:'zone',label:"Zone de livraison",type:'text',required:true},
      {key:'tarif',label:"Tarif par visite (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LIVRAISON A DOMICILE SENIOR</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client_beneficiaire}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le prestataire assure la livraison a domicile avec les services complementaires suivants : {{services_inclus}}, dans la zone {{zone}}.</p><h2>Article 2 – Tarification</h2><p>Tarif par visite de livraison : {{tarif}} FCFA.</p><h2>Article 3 – Formation</h2><p>Les livreurs sont formes a l'accueil et a l'assistance des personnes agees. Accord regi par le droit ivoirien.</p></div>`
  },
  {
    code: 'log3_chaine_froid', name: "Accord de service de livraison refrigeree (chaine du froid)", category: 'transport_logistique', price: 5000, priceMax: 14000,
    description: "Accord de service de transport et livraison en chaine du froid pour produits alimentaires, pharmaceutiques ou biologiques sensibles.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'fournisseur',label:"Nom du fournisseur expediteur",type:'text',required:true},
      {key:'transporteur',label:"Nom du transporteur frigorifique",type:'text',required:true},
      {key:'temperature_min',label:"Temperature minimale requise (degC)",type:'text',required:true},
      {key:'temperature_max',label:"Temperature maximale requise (degC)",type:'text',required:true},
      {key:'tarif_km',label:"Tarif au kilometre (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LIVRAISON REFRIGEREE</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{transporteur}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le transporteur assure le transport de produits sensibles en maintenant une temperature comprise entre {{temperature_min}}degC et {{temperature_max}}degC.</p><h2>Article 2 – Tarification</h2><p>Le tarif est de {{tarif_km}} FCFA par kilometre parcouru.</p><h2>Article 3 – Responsabilite</h2><p>Toute rupture de la chaine du froid engage la pleine responsabilite du transporteur. Accord du {{date_contrat}}.</p></div>`
  },
  {
    code: 'log3_drone', name: "Accord de service de drone de livraison (experimentation)", category: 'transport_logistique', price: 6000, priceMax: 16000,
    description: "Accord encadrant l'experimentation de livraison par drone dans un perimetre defini, avec dispositions sur l'autorisation et la securite.", templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'operateur',label:"Nom de l'operateur drone",type:'text',required:true},
      {key:'partenaire',label:"Nom du partenaire ou sponsor",type:'text',required:true},
      {key:'zone_experimentation',label:"Zone d'experimentation autorisee",type:'text',required:true},
      {key:'autorisation_anac',label:"Reference autorisation ANAC/autorite aerienne",type:'text',required:true},
      {key:'duree_experimentation',label:"Duree de la phase d'experimentation",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DRONE DE LIVRAISON (EXPERIMENTATION)</h1><p>Entre <strong>{{operateur}}</strong> et <strong>{{partenaire}}</strong>.</p><h2>Article 1 – Objet</h2><p>Les parties conviennent de mener une experimentation de livraison par drone dans la zone : {{zone_experimentation}}, pour une duree de {{duree_experimentation}}.</p><h2>Article 2 – Conformite reglementaire</h2><p>L'operation est menee sous l'autorisation reference {{autorisation_anac}} delivree par l'autorite aerienne competente.</p><h2>Article 3 – Securite et assurance</h2><p>L'operateur souscrit une assurance specifique couvrant les risques inherents aux vols de drones. Accord soumis au droit ivoirien.</p></div>`
  },
  {
    code: 'log3_camion_frigo', name: "Accord de service de camion frigorifique (distribution)", category: 'transport_logistique', price: 5000, priceMax: 13000,
    description: "Accord de mise a disposition d'un camion frigorifique avec chauffeur pour la distribution de marchandises sous temperature controlee.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'proprietaire',label:"Nom du proprietaire du vehicule",type:'text',required:true},
      {key:'utilisateur',label:"Nom de l'utilisateur",type:'text',required:true},
      {key:'capacite',label:"Capacite de chargement (m3 ou tonnes)",type:'text',required:true},
      {key:'temperature_cible',label:"Temperature de service (degC)",type:'text',required:true},
      {key:'tarif_journalier',label:"Tarif journalier avec chauffeur (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CAMION FRIGORIFIQUE</h1><p>Entre <strong>{{proprietaire}}</strong> et <strong>{{utilisateur}}</strong>.</p><h2>Article 1 – Mise a disposition</h2><p>Le proprietaire met a la disposition de l'utilisateur un camion frigorifique d'une capacite de {{capacite}}, maintenu a {{temperature_cible}}degC, avec chauffeur.</p><h2>Article 2 – Tarif</h2><p>Le tarif journalier toutes charges comprises est de {{tarif_journalier}} FCFA.</p><h2>Article 3 – Prise d'effet</h2><p>Accord applicable a compter du {{date_debut}}, regi par le droit OHADA.</p></div>`
  },
  {
    code: 'log3_groupage', name: "Accord de service de groupage/degroupage marchandises", category: 'transport_logistique', price: 4000, priceMax: 10000,
    description: "Accord de service de groupage et degroupage de marchandises permettant de mutualiser les couts de transport entre plusieurs expediteurs.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'transitaire',label:"Nom du transitaire ou transporteur",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'type_marchandise',label:"Type de marchandises",type:'text',required:true},
      {key:'tarif_m3',label:"Tarif au m3 groupe (FCFA)",type:'text',required:true},
      {key:'delai_consolidation',label:"Delai de consolidation (jours)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GROUPAGE/DEGROUPAGE MARCHANDISES</h1><p>Entre <strong>{{transitaire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le transitaire groupe les marchandises de type {{type_marchandise}} avec celles d'autres expediteurs afin de mutualiser les couts de transport.</p><h2>Article 2 – Tarification</h2><p>Tarif : {{tarif_m3}} FCFA par m3 groupe. Delai de consolidation : {{delai_consolidation}} jours ouvrables.</p><h2>Article 3 – Responsabilite</h2><p>Le transitaire est responsable des marchandises de la prise en charge jusqu'a la livraison finale.</p></div>`
  },
  {
    code: 'log3_dark_store', name: "Accord de service de centre de distribution urbain (dark store)", category: 'transport_logistique', price: 6000, priceMax: 15000,
    description: "Accord de service pour la gestion d'un entrepot de proximite urbaine (dark store) destine a la preparation rapide des commandes e-commerce.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'operateur',label:"Nom de l'operateur du dark store",type:'text',required:true},
      {key:'client',label:"Nom du client e-commerce",type:'text',required:true},
      {key:'adresse',label:"Adresse du dark store",type:'text',required:true},
      {key:'surface_m2',label:"Surface du dark store (m2)",type:'text',required:true},
      {key:'loyer_mensuel',label:"Loyer et charges mensuels (FCFA)",type:'text',required:true},
      {key:'date_ouverture',label:"Date d'ouverture prevue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CENTRE DE DISTRIBUTION URBAIN (DARK STORE)</h1><p>Entre <strong>{{operateur}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Mise a disposition</h2><p>L'operateur met a disposition un espace de {{surface_m2}} m2 situe a {{adresse}} pour la preparation et le stockage des commandes e-commerce.</p><h2>Article 2 – Cout</h2><p>Loyer et charges mensuels : {{loyer_mensuel}} FCFA. Ouverture prevue le {{date_ouverture}}.</p><h2>Article 3 – Exploitation</h2><p>Le dark store fonctionne 24h/24 pour garantir la livraison en moins de 2 heures. Accord soumis au droit ivoirien.</p></div>`
  },
  {
    code: 'log3_messagerie_nationale', name: "Accord de service de messagerie express nationale", category: 'transport_logistique', price: 4000, priceMax: 10000,
    description: "Accord de service de messagerie express couvrant l'ensemble du territoire national pour l'acheminement de documents et colis urgents.", templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'messager',label:"Nom de la societe de messagerie",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'couverture',label:"Villes et regions couvertes",type:'textarea',required:true},
      {key:'delai_max',label:"Delai de livraison maximum (heures)",type:'text',required:true},
      {key:'tarif_pli',label:"Tarif par pli/colis (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MESSAGERIE EXPRESS NATIONALE</h1><p>Entre <strong>{{messager}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Couverture</h2><p>Le messager assure la livraison express sur les zones suivantes : {{couverture}}, dans un delai maximum de {{delai_max}} heures.</p><h2>Article 2 – Tarification</h2><p>Tarif par pli ou colis : {{tarif_pli}} FCFA.</p><h2>Article 3 – Traçabilite</h2><p>Chaque envoi fait l'objet d'un numero de suivi unique. Accord soumis au droit ivoirien.</p></div>`
  },
  {
    code: 'log3_international', name: "Accord de service de livraison internationale (DHL UPS modele)", category: 'transport_logistique', price: 6000, priceMax: 16000,
    description: "Accord de service de livraison internationale entre un expediteur et un operateur express international, base sur les standards DHL/UPS.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'expediteur',label:"Nom de l'expediteur",type:'text',required:true},
      {key:'operateur',label:"Nom de l'operateur international",type:'text',required:true},
      {key:'pays_destination',label:"Pays de destination",type:'text',required:true},
      {key:'incoterm',label:"Incoterm applicable",type:'text',required:true},
      {key:'tarif_kg',label:"Tarif par kg (devise ou FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LIVRAISON INTERNATIONALE</h1><p>Entre <strong>{{expediteur}}</strong> et <strong>{{operateur}}</strong>.</p><h2>Article 1 – Objet</h2><p>L'operateur assure l'acheminement international de colis vers {{pays_destination}} selon l'Incoterm {{incoterm}}.</p><h2>Article 2 – Tarification</h2><p>Tarif : {{tarif_kg}} par kg. Des surcharges carburant et securite peuvent s'appliquer selon baremes en vigueur.</p><h2>Article 3 – Droit applicable</h2><p>Accord soumis aux conventions internationales de transport et au droit ivoirien. Signe le {{date_contrat}}.</p></div>`
  },
  {
    code: 'log3_transporteur_ecom', name: "Accord de partenariat transporteur-plateforme e-commerce", category: 'transport_logistique', price: 4500, priceMax: 11000,
    description: "Accord de partenariat entre un transporteur et une plateforme de commerce electronique pour la gestion integree des livraisons.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'transporteur',label:"Nom du transporteur",type:'text',required:true},
      {key:'plateforme',label:"Nom de la plateforme e-commerce",type:'text',required:true},
      {key:'volume_garanti',label:"Volume mensuel garanti (colis)",type:'text',required:true},
      {key:'sla_livraison',label:"SLA de livraison",type:'text',required:true},
      {key:'tarif_nego',label:"Tarif negocie par colis (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT TRANSPORTEUR-PLATEFORME E-COMMERCE</h1><p>Entre <strong>{{transporteur}}</strong> et <strong>{{plateforme}}</strong>.</p><h2>Article 1 – Volume garanti</h2><p>La plateforme garantit un volume mensuel minimum de {{volume_garanti}} colis au transporteur partenaire.</p><h2>Article 2 – SLA et tarif</h2><p>SLA de livraison : {{sla_livraison}}. Tarif par colis : {{tarif_nego}} FCFA.</p><h2>Article 3 – Integration technique</h2><p>Les deux parties s'engagent a interconnecter leurs systemes informatiques pour le suivi en temps reel des livraisons.</p></div>`
  },
  {
    code: 'log3_flotte_externalisation', name: "Accord de service de flotte de vehicules de livraison (externalisation)", category: 'transport_logistique', price: 6000, priceMax: 16000,
    description: "Accord d'externalisation de la flotte de vehicules de livraison, couvrant la mise a disposition, la maintenance et la gestion des conducteurs.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire de flotte",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'nombre_vehicules',label:"Nombre de vehicules mis a disposition",type:'text',required:true},
      {key:'type_vehicules',label:"Type de vehicules",type:'text',required:true},
      {key:'cout_mensuel',label:"Cout mensuel global (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FLOTTE DE VEHICULES DE LIVRAISON (EXTERNALISATION)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Mise a disposition</h2><p>Le prestataire met a disposition {{nombre_vehicules}} vehicules de type {{type_vehicules}}, avec conducteurs, carburant et maintenance inclus.</p><h2>Article 2 – Cout</h2><p>Cout mensuel global : {{cout_mensuel}} FCFA.</p><h2>Article 3 – Prise d'effet</h2><p>Accord en vigueur a compter du {{date_debut}}, regi par le droit OHADA.</p></div>`
  },
  {
    code: 'log3_rapport_performance', name: "Rapport de performance service de livraison", category: 'transport_logistique', price: 2500, priceMax: 6000,
    description: "Rapport periodique d'evaluation de la performance d'un service de livraison selon des indicateurs cles (KPIs) definis contractuellement.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire evalue",type:'text',required:true},
      {key:'client',label:"Nom du client evaluateur",type:'text',required:true},
      {key:'periode',label:"Periode couverte par le rapport",type:'text',required:true},
      {key:'taux_livraison',label:"Taux de livraison a temps (%)",type:'text',required:true},
      {key:'incidents',label:"Nombre d'incidents signales",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE SERVICE DE LIVRAISON</h1><p>Rapport etabli par <strong>{{client}}</strong> concernant le prestataire <strong>{{prestataire}}</strong> pour la periode : {{periode}}.</p><h2>1. Indicateurs cles</h2><p>Taux de livraison a temps : {{taux_livraison}}%. Incidents signales : {{incidents}}.</p><h2>2. Analyse</h2><p>Les performances sont analysees par rapport aux engagements contractuels. Les ecarts font l'objet d'un plan d'action corrective.</p><h2>3. Conclusion</h2><p>Rapport etabli le {{date_rapport}}.</p></div>`
  },
  {
    code: 'log3_plan_logistique_urbaine', name: "Plan de developpement logistique urbaine", category: 'transport_logistique', price: 5000, priceMax: 13000,
    description: "Document strategique definissant le plan de developpement des activites logistiques urbaines d'une entreprise sur un horizon de 3 a 5 ans.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'ville_cible',label:"Ville ou region cible",type:'text',required:true},
      {key:'horizon',label:"Horizon du plan (annees)",type:'text',required:true},
      {key:'objectifs',label:"Objectifs strategiques principaux",type:'textarea',required:true},
      {key:'investissement_prevu',label:"Investissement global prevu (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DEVELOPPEMENT LOGISTIQUE URBAINE</h1><p>Etabli par <strong>{{entreprise}}</strong> pour la zone : {{ville_cible}}, sur un horizon de {{horizon}} ans.</p><h2>1. Objectifs strategiques</h2><p>{{objectifs}}</p><h2>2. Investissements</h2><p>Investissement global prevu : {{investissement_prevu}} FCFA.</p><h2>3. Axes de developpement</h2><p>Le plan couvre l'extension du reseau, la digitalisation des operations, le recrutement de livreurs locaux et la reduction de l'empreinte carbone.</p></div>`
  },
  {
    code: 'log3_charte_livraison_durable', name: "Charte de la livraison durable et responsable", category: 'transport_logistique', price: 2000, priceMax: 5000,
    description: "Charte d'engagement pour une logistique de livraison durable, incluant des objectifs environnementaux, sociaux et de gouvernance.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'representant',label:"Nom et fonction du representant",type:'text',required:true},
      {key:'engagements_env',label:"Engagements environnementaux specifiques",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA LIVRAISON DURABLE ET RESPONSABLE</h1><p>Adoptee par <strong>{{organisation}}</strong>, representee par <strong>{{representant}}</strong>.</p><h2>Preambule</h2><p>Consciente de l'impact environnemental et social de ses activites logistiques, l'organisation s'engage a integrer les principes du developpement durable dans ses operations de livraison.</p><h2>Engagements environnementaux</h2><p>{{engagements_env}}</p><h2>Engagements sociaux</h2><p>L'organisation s'engage a garantir des conditions de travail dignes pour tous ses livreurs et partenaires.</p><h2>Signature</h2><p>Signee le {{date_signature}}.</p></div>`
  },

  // ── 25 templates Emballage / Conditionnement ──
  {
    code: 'emball_carton', name: "Accord de fabrication d'emballages en carton", category: 'commercial_financier', price: 3500, priceMax: 9000,
    description: "Accord de fabrication et fourniture d'emballages en carton entre un fabricant et un client industriel ou commercial.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'type_carton',label:"Type de carton (ondule, plein, etc.)",type:'text',required:true},
      {key:'quantite_mensuelle',label:"Quantite mensuelle (unites)",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix unitaire (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FABRICATION D'EMBALLAGES EN CARTON</h1><p>Entre <strong>{{fabricant}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le fabricant s'engage a produire et livrer des emballages en carton {{type_carton}} a raison de {{quantite_mensuelle}} unites par mois.</p><h2>Article 2 – Prix</h2><p>Prix unitaire : {{prix_unitaire}} FCFA. Revision possible en cas de variation significative du cout des matieres premieres.</p><h2>Article 3 – Prise d'effet</h2><p>Accord signe le {{date_contrat}}, regi par le droit OHADA et le droit ivoirien.</p></div>`
  },
  {
    code: 'emball_plastique', name: "Accord de fabrication d'emballages en plastique", category: 'commercial_financier', price: 3500, priceMax: 9000,
    description: "Accord de fabrication et fourniture d'emballages en plastique (sacs, films, blisters) entre un producteur et un donneur d'ordre.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'type_plastique',label:"Type de plastique (PE, PP, PET, etc.)",type:'text',required:true},
      {key:'specifications',label:"Specifications techniques",type:'textarea',required:true},
      {key:'prix_kg',label:"Prix au kilogramme (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FABRICATION D'EMBALLAGES EN PLASTIQUE</h1><p>Entre <strong>{{fabricant}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le fabricant produit des emballages en {{type_plastique}} selon les specifications suivantes : {{specifications}}.</p><h2>Article 2 – Prix</h2><p>Prix : {{prix_kg}} FCFA par kilogramme de matiere transformee.</p><h2>Article 3 – Conformite</h2><p>Les emballages doivent respecter les normes en vigueur en Cote d'Ivoire et les exigences OHADA applicables.</p></div>`
  },
  {
    code: 'emball_verre', name: "Accord de fabrication d'emballages en verre", category: 'commercial_financier', price: 4000, priceMax: 11000,
    description: "Accord de fabrication et fourniture de contenants en verre (bouteilles, bocaux, flacons) entre un verrier et un client industriel.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'verrier',label:"Nom du verrier",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'references',label:"References produits (bouteilles, bocaux, etc.)",type:'text',required:true},
      {key:'volume_annuel',label:"Volume annuel commande (unites)",type:'text',required:true},
      {key:'prix_piece',label:"Prix a la piece (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FABRICATION D'EMBALLAGES EN VERRE</h1><p>Entre <strong>{{verrier}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le verrier fabrique les contenants suivants : {{references}}, pour un volume annuel de {{volume_annuel}} unites.</p><h2>Article 2 – Prix</h2><p>Prix unitaire : {{prix_piece}} FCFA.</p><h2>Article 3 – Controle qualite</h2><p>Chaque lot fait l'objet d'un controle qualite avant expedition. Accord du {{date_debut}}.</p></div>`
  },
  {
    code: 'emball_metal', name: "Accord de fabrication d'emballages en metal (boites de conserve)", category: 'commercial_financier', price: 4500, priceMax: 12000,
    description: "Accord de fabrication de boites de conserve et autres emballages metalliques entre un emboutisseur et un industriel agroalimentaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'format_boite',label:"Format et contenance des boites",type:'text',required:true},
      {key:'quantite_mensuelle',label:"Quantite mensuelle (milliers d'unites)",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix unitaire (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FABRICATION D'EMBALLAGES EN METAL</h1><p>Entre <strong>{{fabricant}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le fabricant produit des boites de conserve de format {{format_boite}} a hauteur de {{quantite_mensuelle}} milliers d'unites par mois.</p><h2>Article 2 – Prix</h2><p>Prix unitaire : {{prix_unitaire}} FCFA.</p><h2>Article 3 – Normes alimentaires</h2><p>Les boites sont conformes aux normes de contact alimentaire en vigueur. Accord soumis au droit ivoirien.</p></div>`
  },
  {
    code: 'emball_kraft', name: "Accord de fabrication d'emballages en papier kraft", category: 'commercial_financier', price: 3000, priceMax: 8000,
    description: "Accord de fabrication et fourniture de sacs, sachets et emballages en papier kraft pour l'alimentaire, le commerce et l'artisanat.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'produits',label:"Produits commandes (sacs, sachets, etc.)",type:'text',required:true},
      {key:'quantite',label:"Quantite par commande",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix unitaire (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FABRICATION D'EMBALLAGES EN PAPIER KRAFT</h1><p>Entre <strong>{{fabricant}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le fabricant fournit les produits suivants : {{produits}}, pour des quantites de {{quantite}} par commande.</p><h2>Article 2 – Prix</h2><p>Prix unitaire : {{prix_unitaire}} FCFA.</p><h2>Article 3 – Livraison</h2><p>La livraison est effectuee dans les delais convenus. Accord soumis au droit OHADA.</p></div>`
  },
  {
    code: 'emball_biodegradable', name: "Accord de fabrication d'emballages biodegradables", category: 'commercial_financier', price: 4000, priceMax: 10000,
    description: "Accord de fabrication et fourniture d'emballages biodegradables et compostables repondant aux exigences environnementales actuelles.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'matiere',label:"Matiere biodegradable utilisee (PLA, amidon, etc.)",type:'text',required:true},
      {key:'certification',label:"Certification biodegradable obtenue",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix unitaire (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FABRICATION D'EMBALLAGES BIODEGRADABLES</h1><p>Entre <strong>{{fabricant}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le fabricant produit des emballages biodegradables a base de {{matiere}}, certifies {{certification}}.</p><h2>Article 2 – Prix</h2><p>Prix unitaire : {{prix_unitaire}} FCFA.</p><h2>Article 3 – Prise d'effet</h2><p>Accord du {{date_contrat}}, engage les parties sur le respect des engagements environnementaux.</p></div>`
  },
  {
    code: 'emball_design_graphique', name: "Accord de service de conception graphique d'emballage", category: 'commercial_financier', price: 3000, priceMax: 8000,
    description: "Accord de prestation de service de creation graphique et de design d'emballage entre un studio creatif et une marque cliente.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'studio',label:"Nom du studio ou designer",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'produit_concerne',label:"Produit concerne par le design",type:'text',required:true},
      {key:'livrables',label:"Livrables attendus (formats, maquettes)",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONCEPTION GRAPHIQUE D'EMBALLAGE</h1><p>Entre <strong>{{studio}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le studio realise la conception graphique de l'emballage du produit : {{produit_concerne}}. Livrables : {{livrables}}.</p><h2>Article 2 – Honoraires</h2><p>Honoraires convenus : {{honoraires}} FCFA, regles selon echeancier defini en annexe.</p><h2>Article 3 – Propriete intellectuelle</h2><p>Les droits de propriete intellectuelle sur les creations sont cedes au client apres paiement integral.</p></div>`
  },
  {
    code: 'emball_marquage', name: "Accord de service de marquage et etiquetage", category: 'commercial_financier', price: 3000, priceMax: 7000,
    description: "Accord de prestation de service de marquage, impression et etiquetage d'emballages selon les normes reglementaires et les exigences du client.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire de marquage",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'supports',label:"Supports a etiqueter",type:'text',required:true},
      {key:'informations_obligatoires',label:"Informations reglementaires a faire figurer",type:'textarea',required:true},
      {key:'tarif_1000',label:"Tarif pour 1000 etiquettes (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MARQUAGE ET ETIQUETAGE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le prestataire realise le marquage et l'etiquetage des supports suivants : {{supports}}. Informations reglementaires requises : {{informations_obligatoires}}.</p><h2>Article 2 – Tarification</h2><p>Tarif : {{tarif_1000}} FCFA pour 1000 etiquettes.</p><h2>Article 3 – Conformite</h2><p>Le prestataire garantit la conformite des etiquettes aux normes en vigueur. Accord soumis au droit ivoirien.</p></div>`
  },
  {
    code: 'emball_certification_alim', name: "Accord de certification emballage alimentaire (FSSAI/FDA)", category: 'commercial_financier', price: 5000, priceMax: 13000,
    description: "Accord de service de certification de conformite des emballages alimentaires selon les standards FSSAI, FDA ou equivalents africains.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'fabricant',label:"Nom du fabricant d'emballages",type:'text',required:true},
      {key:'organisme',label:"Nom de l'organisme certificateur",type:'text',required:true},
      {key:'norme',label:"Norme visee (FSSAI, FDA, autre)",type:'text',required:true},
      {key:'produits_testes',label:"Produits soumis a certification",type:'textarea',required:true},
      {key:'frais_certification',label:"Frais de certification (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION EMBALLAGE ALIMENTAIRE</h1><p>Entre <strong>{{fabricant}}</strong> et <strong>{{organisme}}</strong>.</p><h2>Article 1 – Objet</h2><p>L'organisme realise la certification des emballages suivants : {{produits_testes}} selon la norme {{norme}}.</p><h2>Article 2 – Frais</h2><p>Frais de certification : {{frais_certification}} FCFA.</p><h2>Article 3 – Validite</h2><p>La certification est valable 2 ans. Un audit de suivi annuel est inclus. Accord soumis au droit ivoirien.</p></div>`
  },
  {
    code: 'emball_test', name: "Accord de service de test d'emballage (resistance, etancheite)", category: 'commercial_financier', price: 3500, priceMax: 9000,
    description: "Accord de prestation de tests mecaniques et d'etancheite sur des emballages industriels ou alimentaires en laboratoire agree.", templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'laboratoire',label:"Nom du laboratoire de test",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'types_tests',label:"Types de tests (resistance, etancheite, chute, etc.)",type:'textarea',required:true},
      {key:'echantillons',label:"Nombre d'echantillons par serie",type:'text',required:true},
      {key:'cout_serie',label:"Cout par serie de tests (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TEST D'EMBALLAGE</h1><p>Entre <strong>{{laboratoire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le laboratoire realise les tests suivants sur {{echantillons}} echantillons par serie : {{types_tests}}.</p><h2>Article 2 – Tarification</h2><p>Cout par serie de tests : {{cout_serie}} FCFA. Un rapport ecrit est remis dans les 5 jours ouvrables.</p><h2>Article 3 – Responsabilite</h2><p>Les resultats sont bases sur les echantillons fournis. Accord soumis au droit ivoirien.</p></div>`
  },
  {
    code: 'emball_conditionnement_facon', name: "Accord de service de conditionnement a facon (sous-traitance)", category: 'commercial_financier', price: 4000, priceMax: 10000,
    description: "Accord de sous-traitance pour le conditionnement a facon de produits fournis par le donneur d'ordre sur une ligne de conditionnement tierce.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'sous_traitant',label:"Nom du sous-traitant",type:'text',required:true},
      {key:'donneur_ordre',label:"Nom du donneur d'ordre",type:'text',required:true},
      {key:'produit',label:"Produit a conditionner",type:'text',required:true},
      {key:'cadence',label:"Cadence de production (unites/heure)",type:'text',required:true},
      {key:'tarif_heure',label:"Tarif horaire de conditionnement (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONDITIONNEMENT A FACON</h1><p>Entre <strong>{{sous_traitant}}</strong> et <strong>{{donneur_ordre}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le sous-traitant assure le conditionnement a facon du produit {{produit}} a une cadence de {{cadence}} unites par heure.</p><h2>Article 2 – Tarification</h2><p>Tarif horaire : {{tarif_heure}} FCFA. Les matieres premieres et emballages sont fournis par le donneur d'ordre.</p><h2>Article 3 – Prise d'effet</h2><p>Accord en vigueur a compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'emball_sous_vide', name: "Accord de service d'emballage sous vide", category: 'commercial_financier', price: 3500, priceMax: 9000,
    description: "Accord de prestation de service d'emballage sous vide pour la conservation de produits alimentaires, industriels ou medicaux.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'produits',label:"Produits a emballer sous vide",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (unites ou kg)",type:'text',required:true},
      {key:'tarif_unite',label:"Tarif par unite (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EMBALLAGE SOUS VIDE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le prestataire realise l'emballage sous vide de : {{produits}}, a hauteur de {{volume_mensuel}} par mois.</p><h2>Article 2 – Tarification</h2><p>Tarif : {{tarif_unite}} FCFA par unite conditionnee.</p><h2>Article 3 – Hygiene</h2><p>Le prestataire respecte les bonnes pratiques d'hygiene BPH applicables aux ateliers de conditionnement alimentaire.</p></div>`
  },
  {
    code: 'emball_atm_modifiee', name: "Accord de service d'emballage sous atmosphere modifiee", category: 'commercial_financier', price: 4000, priceMax: 11000,
    description: "Accord de prestation de service d'emballage sous atmosphere modifiee (MAP) pour prolonger la duree de conservation des produits.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire MAP",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'produit',label:"Produit concerne",type:'text',required:true},
      {key:'melange_gazeux',label:"Composition du melange gazeux (%)",type:'text',required:true},
      {key:'tarif_unite',label:"Tarif par unite (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EMBALLAGE SOUS ATMOSPHERE MODIFIEE (MAP)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le prestataire conditionne le produit {{produit}} sous une atmosphere modifiee de composition : {{melange_gazeux}}.</p><h2>Article 2 – Tarification</h2><p>Tarif : {{tarif_unite}} FCFA par unite.</p><h2>Article 3 – Garantie</h2><p>Le prestataire garantit le maintien de l'atmosphere selon les specifications convenues. Accord soumis au droit ivoirien.</p></div>`
  },
  {
    code: 'emball_isotherme', name: "Accord de service d'emballage isotherme (produits sensibles)", category: 'commercial_financier', price: 4000, priceMax: 10000,
    description: "Accord de service de fourniture et de conditionnement en emballages isothermes pour produits sensibles (vaccins, medicaments, produits frais).", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'fournisseur',label:"Nom du fournisseur d'emballages isothermes",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'produit_transporte',label:"Nature du produit sensible",type:'text',required:true},
      {key:'plage_temperature',label:"Plage de temperature a maintenir (degC)",type:'text',required:true},
      {key:'duree_isolation',label:"Duree d'isolation garantie (heures)",type:'text',required:true},
      {key:'prix_unite',label:"Prix par unite d'emballage (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EMBALLAGE ISOTHERME</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le fournisseur fournit des emballages isothermes pour le transport de {{produit_transporte}}, maintenant une temperature de {{plage_temperature}} degC pendant {{duree_isolation}} heures.</p><h2>Article 2 – Prix</h2><p>Prix par unite : {{prix_unite}} FCFA.</p><h2>Article 3 – Certification</h2><p>Les emballages sont certifies conformes aux normes de transport de produits sensibles en vigueur.</p></div>`
  },
  {
    code: 'emball_luxe', name: "Accord de service d'emballage de luxe (coffrets cadeaux)", category: 'commercial_financier', price: 5000, priceMax: 13000,
    description: "Accord de fabrication et personnalisation d'emballages haut de gamme (coffrets, boites cadeaux, packaging premium) pour marques de luxe.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'atelier',label:"Nom de l'atelier ou fabricant",type:'text',required:true},
      {key:'marque',label:"Nom de la marque cliente",type:'text',required:true},
      {key:'produits',label:"Types d'emballages de luxe commandes",type:'text',required:true},
      {key:'matieres',label:"Matieres premieres utilisees",type:'text',required:true},
      {key:'prix_piece',label:"Prix a la piece (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EMBALLAGE DE LUXE</h1><p>Entre <strong>{{atelier}}</strong> et <strong>{{marque}}</strong>.</p><h2>Article 1 – Objet</h2><p>L'atelier fabrique les emballages de luxe suivants : {{produits}}, en utilisant les matieres : {{matieres}}.</p><h2>Article 2 – Prix</h2><p>Prix a la piece : {{prix_piece}} FCFA.</p><h2>Article 3 – Confidentialite</h2><p>L'atelier s'engage a ne pas reproduire les designs a des fins propres. Accord soumis au droit ivoirien.</p></div>`
  },
  {
    code: 'emball_personnalisation', name: "Accord de service de personnalisation d'emballage (impression)", category: 'commercial_financier', price: 3500, priceMax: 9000,
    description: "Accord de service d'impression et de personnalisation d'emballages (couleurs, logos, textes) selon les specifications de la marque cliente.", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'imprimeur',label:"Nom de l'imprimeur",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'supports',label:"Supports a personnaliser",type:'text',required:true},
      {key:'technique_impression',label:"Technique d'impression (flexo, numerique, offset)",type:'text',required:true},
      {key:'tarif_tirage',label:"Tarif par tirage minimum (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PERSONNALISATION D'EMBALLAGE</h1><p>Entre <strong>{{imprimeur}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>L'imprimeur personnalise les supports {{supports}} par technique {{technique_impression}} selon les visuels fournis par le client.</p><h2>Article 2 – Tarification</h2><p>Tarif par tirage minimum : {{tarif_tirage}} FCFA.</p><h2>Article 3 – BAT</h2><p>Un bon a tirer (BAT) est soumis a validation avant tout tirage definitif.</p></div>`
  },
  {
    code: 'emball_shrink_sleeve', name: "Accord de service de shrink sleeve (manchon thermoretractable)", category: 'commercial_financier', price: 4000, priceMax: 10000,
    description: "Accord de service d'application de manchons thermoretractables (shrink sleeves) sur bouteilles, flacons et autres contenants.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'contenant',label:"Type de contenant (bouteille, flacon, etc.)",type:'text',required:true},
      {key:'cadence_heure',label:"Cadence d'application (unites/heure)",type:'text',required:true},
      {key:'tarif_mille',label:"Tarif pour 1000 unites (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SHRINK SLEEVE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le prestataire applique des manchons thermoretractables sur les contenants de type {{contenant}} a une cadence de {{cadence_heure}} unites par heure.</p><h2>Article 2 – Tarification</h2><p>Tarif : {{tarif_mille}} FCFA pour 1000 unites traitees.</p><h2>Article 3 – Qualite</h2><p>Chaque lot fait l'objet d'un controle visuel. Accord soumis au droit ivoirien.</p></div>`
  },
  {
    code: 'emball_fourniture_materiel', name: "Accord de fourniture de materiel d'emballage (roll, pallet)", category: 'commercial_financier', price: 3000, priceMax: 8000,
    description: "Accord de fourniture reguliere de matieres premieres et materiels d'emballage (rouleaux de film, palettes, scotch, etc.) a un utilisateur industriel.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'fournisseur',label:"Nom du fournisseur",type:'text',required:true},
      {key:'acheteur',label:"Nom de l'acheteur",type:'text',required:true},
      {key:'references',label:"References produits commandes",type:'textarea',required:true},
      {key:'frequence_livraison',label:"Frequence de livraison",type:'text',required:true},
      {key:'conditions_paiement',label:"Conditions de paiement",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FOURNITURE DE MATERIEL D'EMBALLAGE</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{acheteur}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le fournisseur livre regulierement les materiels suivants : {{references}}, a la frequence convenue : {{frequence_livraison}}.</p><h2>Article 2 – Paiement</h2><p>Conditions de paiement : {{conditions_paiement}}.</p><h2>Article 3 – Rupture de stock</h2><p>Le fournisseur s'engage a notifier toute rupture previsible avec un preavis de 7 jours. Accord soumis au droit OHADA.</p></div>`
  },
  {
    code: 'emball_palette_film', name: "Accord de service de palette et film etirable", category: 'commercial_financier', price: 2500, priceMax: 6000,
    description: "Accord de prestation de service de palettisation et sanglage avec film etirable pour la securisation des charges avant transport.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'volume_palettes',label:"Nombre de palettes par mois",type:'text',required:true},
      {key:'tarif_palette',label:"Tarif par palette sangle (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PALETTE ET FILM ETIRABLE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le prestataire assure la palettisation et le sablage au film etirable de {{volume_palettes}} palettes par mois.</p><h2>Article 2 – Tarification</h2><p>Tarif : {{tarif_palette}} FCFA par palette traitee.</p><h2>Article 3 – Prise d'effet</h2><p>Accord signe le {{date_contrat}}.</p></div>`
  },
  {
    code: 'emball_eco_conception', name: "Accord de service d'optimisation des emballages (eco-conception)", category: 'commercial_financier', price: 5000, priceMax: 12000,
    description: "Accord de mission de conseil et d'optimisation des emballages selon les principes d'eco-conception pour reduire les impacts environnementaux.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'cabinet',label:"Nom du cabinet conseil",type:'text',required:true},
      {key:'entreprise',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'gamme_produits',label:"Gamme de produits concernee",type:'text',required:true},
      {key:'objectif_reduction',label:"Objectif de reduction de matiere (%)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires de la mission (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'OPTIMISATION DES EMBALLAGES (ECO-CONCEPTION)</h1><p>Entre <strong>{{cabinet}}</strong> et <strong>{{entreprise}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le cabinet realise un audit et une mission d'eco-conception des emballages de la gamme : {{gamme_produits}}, avec pour objectif une reduction de {{objectif_reduction}}% de la matiere utilisee.</p><h2>Article 2 – Honoraires</h2><p>Honoraires : {{honoraires}} FCFA pour la mission complete.</p><h2>Article 3 – Livrables</h2><p>Un rapport de recommandations et un plan de mise en oeuvre sont remis a l'issue de la mission.</p></div>`
  },
  {
    code: 'emball_recyclage', name: "Accord de service de recyclage des emballages usages", category: 'commercial_financier', price: 3500, priceMax: 9000,
    description: "Accord de service de collecte, tri et recyclage des emballages usages entre un producteur et un operateur de recyclage agrees.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'recycleur',label:"Nom de l'operateur de recyclage",type:'text',required:true},
      {key:'producteur',label:"Nom du producteur",type:'text',required:true},
      {key:'matieres_recyclee',label:"Matieres collectees (carton, plastique, verre, etc.)",type:'text',required:true},
      {key:'frequence_collecte',label:"Frequence de collecte",type:'text',required:true},
      {key:'tarif_tonne',label:"Tarif ou reprise par tonne (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECYCLAGE DES EMBALLAGES USAGES</h1><p>Entre <strong>{{recycleur}}</strong> et <strong>{{producteur}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le recycleur collecte et recycle les emballages usages de type {{matieres_recyclee}} chez le producteur, a la frequence : {{frequence_collecte}}.</p><h2>Article 2 – Tarification</h2><p>Tarif ou reprise : {{tarif_tonne}} FCFA par tonne collectee.</p><h2>Article 3 – Traçabilite</h2><p>Un bordereau de suivi de dechets est etabli a chaque collecte. Accord soumis au droit ivoirien.</p></div>`
  },
  {
    code: 'emball_partenariat_imprimeur', name: "Accord de partenariat producteur-imprimeur d'emballage", category: 'commercial_financier', price: 4000, priceMax: 10000,
    description: "Accord de partenariat commercial et technique entre un producteur de biens de consommation et un imprimeur specialise en emballages.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'producteur',label:"Nom du producteur",type:'text',required:true},
      {key:'imprimeur',label:"Nom de l'imprimeur partenaire",type:'text',required:true},
      {key:'volume_annuel',label:"Volume annuel estime (millions d'unites)",type:'text',required:true},
      {key:'remise_partenariat',label:"Remise partenariat accordee (%)",type:'text',required:true},
      {key:'duree_partenariat',label:"Duree du partenariat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PRODUCTEUR-IMPRIMEUR D'EMBALLAGE</h1><p>Entre <strong>{{producteur}}</strong> et <strong>{{imprimeur}}</strong>.</p><h2>Article 1 – Objet</h2><p>Les parties s'engagent dans un partenariat exclusif pour la production de {{volume_annuel}} millions d'unites par an.</p><h2>Article 2 – Avantages partenaire</h2><p>L'imprimeur consent une remise de {{remise_partenariat}}% sur ses tarifs standards.</p><h2>Article 3 – Duree</h2><p>Le partenariat est conclu pour une duree de {{duree_partenariat}}, renouvelable par accord mutuel.</p></div>`
  },
  {
    code: 'emball_rapport_performance', name: "Rapport de performance unite d'emballage", category: 'commercial_financier', price: 2500, priceMax: 6000,
    description: "Rapport periodique d'evaluation des performances d'une unite de production d'emballage selon les indicateurs de qualite, cout et delai.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'unite',label:"Nom de l'unite d'emballage",type:'text',required:true},
      {key:'responsable',label:"Nom du responsable",type:'text',required:true},
      {key:'periode',label:"Periode couverte",type:'text',required:true},
      {key:'taux_conformite',label:"Taux de conformite qualite (%)",type:'text',required:true},
      {key:'taux_productivite',label:"Taux de productivite (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE UNITE D'EMBALLAGE</h1><p>Unite : <strong>{{unite}}</strong>. Responsable : {{responsable}}. Periode : {{periode}}.</p><h2>1. Qualite</h2><p>Taux de conformite : {{taux_conformite}}%.</p><h2>2. Productivite</h2><p>Taux de productivite : {{taux_productivite}}%.</p><h2>3. Actions correctives</h2><p>Les ecarts identifies font l'objet d'un plan d'action presente en annexe.</p><h2>4. Validation</h2><p>Rapport etabli le {{date_rapport}}.</p></div>`
  },
  {
    code: 'emball_plan_developpement', name: "Plan de developpement emballage durable", category: 'commercial_financier', price: 5000, priceMax: 12000,
    description: "Document strategique definissant la feuille de route de transition vers des emballages durables sur un horizon de 3 a 5 ans.", templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'responsable',label:"Responsable du plan",type:'text',required:true},
      {key:'horizon',label:"Horizon du plan (annees)",type:'text',required:true},
      {key:'objectifs_durabilite',label:"Objectifs de durabilite",type:'textarea',required:true},
      {key:'budget_transition',label:"Budget de transition prevu (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DEVELOPPEMENT EMBALLAGE DURABLE</h1><p>Etabli par <strong>{{entreprise}}</strong>, sous la responsabilite de {{responsable}}, sur un horizon de {{horizon}} ans.</p><h2>1. Objectifs de durabilite</h2><p>{{objectifs_durabilite}}</p><h2>2. Budget</h2><p>Budget de transition : {{budget_transition}} FCFA.</p><h2>3. Etapes cles</h2><p>Le plan s'articule autour de la reduction des matieres, du recyclage et de l'innovation en emballages alternatifs adaptes aux marches africains.</p></div>`
  },
  {
    code: 'emball_charte_eco', name: "Charte de l'emballage eco-responsable en Afrique", category: 'commercial_financier', price: 2000, priceMax: 5000,
    description: "Charte d'engagement pour une politique d'emballage eco-responsable, adaptee aux contextes economiques et environnementaux africains.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'signataire',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'representant',label:"Nom et fonction du representant",type:'text',required:true},
      {key:'engagements',label:"Engagements specifiques de l'organisation",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'EMBALLAGE ECO-RESPONSABLE EN AFRIQUE</h1><p>Adoptee par <strong>{{signataire}}</strong>, representee par <strong>{{representant}}</strong>.</p><h2>Preambule</h2><p>Face aux defis environnementaux croissants en Afrique, notamment la pollution plastique et la gestion des dechets, l'organisation s'engage a adopter une politique d'emballage eco-responsable.</p><h2>Engagements</h2><p>{{engagements}}</p><h2>Suivi</h2><p>Un rapport annuel de mise en oeuvre sera publie. La charte prend effet a la date de signature : {{date_signature}}.</p></div>`
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
  console.log(`Batch 85b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
