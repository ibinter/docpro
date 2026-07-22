import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── TRANSPORT MARITIME / AÉRIEN (mar_) ───
  {
    code: 'mar_connaissement',
    name: "Connaissement Maritime",
    category: 'transport_logistique',
    price: 8000, priceMax: 20000,
    description: "Document de transport maritime attestant la prise en charge des marchandises par le transporteur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'expediteur',label:"Expéditeur",type:'text',required:true},
      {key:'destinataire',label:"Destinataire",type:'text',required:true},
      {key:'port_chargement',label:"Port de chargement",type:'text',required:true},
      {key:'port_dechargement',label:"Port de déchargement",type:'text',required:true},
      {key:'description_marchandises',label:"Description des marchandises",type:'textarea',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONNAISSEMENT MARITIME</h1><p><strong>Expéditeur :</strong> {{expediteur}}</p><p><strong>Destinataire :</strong> {{destinataire}}</p><p><strong>Port de chargement :</strong> {{port_chargement}}</p><p><strong>Port de déchargement :</strong> {{port_dechargement}}</p><p><strong>Description des marchandises :</strong> {{description_marchandises}}</p><p><strong>Date d'émission :</strong> {{date_emission}}</p></div>`
  },
  {
    code: 'mar_charte_partie',
    name: "Charte-Partie",
    category: 'transport_logistique',
    price: 10000, priceMax: 30000,
    description: "Contrat d'affrètement définissant les conditions de location d'un navire entre armateur et affréteur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'armateur',label:"Armateur",type:'text',required:true},
      {key:'affreteur',label:"Affréteur",type:'text',required:true},
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'voyage',label:"Voyage prévu",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE-PARTIE</h1><p><strong>Armateur :</strong> {{armateur}}</p><p><strong>Affréteur :</strong> {{affreteur}}</p><p><strong>Navire :</strong> {{nom_navire}}</p><p><strong>Voyage :</strong> {{voyage}}</p><p><strong>Date de signature :</strong> {{date_signature}}</p></div>`
  },
  {
    code: 'mar_manifeste_cargo',
    name: "Manifeste Cargo Maritime",
    category: 'transport_logistique',
    price: 6000, priceMax: 15000,
    description: "Document listant l'ensemble des marchandises à bord d'un navire à destination d'un port.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'port_destination',label:"Port de destination",type:'text',required:true},
      {key:'liste_cargaison',label:"Liste de la cargaison",type:'textarea',required:true},
      {key:'poids_total',label:"Poids total (tonnes)",type:'text',required:true},
      {key:'date_manifeste',label:"Date du manifeste",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>MANIFESTE CARGO MARITIME</h1><p><strong>Navire :</strong> {{nom_navire}}</p><p><strong>Port de destination :</strong> {{port_destination}}</p><p><strong>Cargaison :</strong> {{liste_cargaison}}</p><p><strong>Poids total :</strong> {{poids_total}}</p><p><strong>Date :</strong> {{date_manifeste}}</p></div>`
  },
  {
    code: 'mar_surestaries',
    name: "Rapport de Surestaries",
    category: 'transport_logistique',
    price: 7000, priceMax: 18000,
    description: "Rapport établissant le calcul des pénalités dues pour dépassement du temps de chargement ou déchargement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'navire',label:"Nom du navire",type:'text',required:true},
      {key:'armateur',label:"Armateur",type:'text',required:true},
      {key:'jours_surestaries',label:"Nombre de jours de surestaries",type:'text',required:true},
      {key:'taux_journalier',label:"Taux journalier (FCFA)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SURESTARIES</h1><p><strong>Navire :</strong> {{navire}}</p><p><strong>Armateur :</strong> {{armateur}}</p><p><strong>Jours de surestaries :</strong> {{jours_surestaries}}</p><p><strong>Taux journalier :</strong> {{taux_journalier}} FCFA</p><p><strong>Date :</strong> {{date_rapport}}</p></div>`
  },
  {
    code: 'mar_pv_avaries',
    name: "PV Avaries Marchandises",
    category: 'transport_logistique',
    price: 6000, priceMax: 15000,
    description: "Procès-verbal constatant les avaries subies par les marchandises lors du transport maritime.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'expediteur',label:"Expéditeur",type:'text',required:true},
      {key:'nature_avarie',label:"Nature de l'avarie",type:'textarea',required:true},
      {key:'valeur_estimee',label:"Valeur estimée du préjudice (FCFA)",type:'text',required:true},
      {key:'lieu_constat',label:"Lieu du constat",type:'text',required:true},
      {key:'date_constat',label:"Date du constat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL D'AVARIES MARCHANDISES</h1><p><strong>Expéditeur :</strong> {{expediteur}}</p><p><strong>Nature de l'avarie :</strong> {{nature_avarie}}</p><p><strong>Valeur estimée :</strong> {{valeur_estimee}} FCFA</p><p><strong>Lieu du constat :</strong> {{lieu_constat}}</p><p><strong>Date :</strong> {{date_constat}}</p></div>`
  },
  {
    code: 'mar_certificat_pesee',
    name: "Certificat de Pesée",
    category: 'transport_logistique',
    price: 4000, priceMax: 10000,
    description: "Certificat attestant le poids officiel des marchandises avant embarquement maritime.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'expediteur',label:"Expéditeur",type:'text',required:true},
      {key:'description_marchandises',label:"Description des marchandises",type:'textarea',required:true},
      {key:'poids_brut',label:"Poids brut (kg)",type:'text',required:true},
      {key:'poids_net',label:"Poids net (kg)",type:'text',required:true},
      {key:'date_pesee',label:"Date de pesée",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CERTIFICAT DE PESÉE</h1><p><strong>Expéditeur :</strong> {{expediteur}}</p><p><strong>Marchandises :</strong> {{description_marchandises}}</p><p><strong>Poids brut :</strong> {{poids_brut}} kg</p><p><strong>Poids net :</strong> {{poids_net}} kg</p><p><strong>Date de pesée :</strong> {{date_pesee}}</p></div>`
  },
  {
    code: 'mar_certificat_fumigation',
    name: "Certificat de Fumigation",
    category: 'transport_logistique',
    price: 5000, priceMax: 12000,
    description: "Certificat attestant le traitement phytosanitaire par fumigation des marchandises avant exportation.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'exportateur',label:"Exportateur",type:'text',required:true},
      {key:'produit_traite',label:"Produit traité",type:'text',required:true},
      {key:'produit_fumigation',label:"Produit de fumigation utilisé",type:'text',required:true},
      {key:'dose_appliquee',label:"Dose appliquée",type:'text',required:true},
      {key:'date_traitement',label:"Date du traitement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CERTIFICAT DE FUMIGATION</h1><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Produit traité :</strong> {{produit_traite}}</p><p><strong>Produit de fumigation :</strong> {{produit_fumigation}}</p><p><strong>Dose appliquée :</strong> {{dose_appliquee}}</p><p><strong>Date de traitement :</strong> {{date_traitement}}</p></div>`
  },
  {
    code: 'mar_pointage_cargaison',
    name: "Rapport de Pointage Cargaison",
    category: 'transport_logistique',
    price: 5000, priceMax: 12000,
    description: "Rapport de vérification et de comptage des unités de cargaison lors des opérations portuaires.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'navire',label:"Navire",type:'text',required:true},
      {key:'port',label:"Port",type:'text',required:true},
      {key:'details_cargaison',label:"Détails de la cargaison pointée",type:'textarea',required:true},
      {key:'pointeur',label:"Nom du pointeur",type:'text',required:true},
      {key:'date_pointage',label:"Date de pointage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE POINTAGE CARGAISON</h1><p><strong>Navire :</strong> {{navire}}</p><p><strong>Port :</strong> {{port}}</p><p><strong>Cargaison :</strong> {{details_cargaison}}</p><p><strong>Pointeur :</strong> {{pointeur}}</p><p><strong>Date :</strong> {{date_pointage}}</p></div>`
  },
  {
    code: 'mar_contrat_agence',
    name: "Contrat Agence Maritime",
    category: 'transport_logistique',
    price: 12000, priceMax: 35000,
    description: "Contrat définissant les droits et obligations de l'agent maritime mandaté par l'armateur dans un port.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'armateur',label:"Armateur mandant",type:'text',required:true},
      {key:'agent_maritime',label:"Agent maritime mandataire",type:'text',required:true},
      {key:'port_competence',label:"Port de compétence",type:'text',required:true},
      {key:'missions',label:"Missions de l'agent",type:'textarea',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'AGENCE MARITIME</h1><p><strong>Armateur :</strong> {{armateur}}</p><p><strong>Agent maritime :</strong> {{agent_maritime}}</p><p><strong>Port de compétence :</strong> {{port_competence}}</p><p><strong>Missions :</strong> {{missions}}</p><p><strong>Date :</strong> {{date_contrat}}</p></div>`
  },
  {
    code: 'mar_convention_consignation',
    name: "Convention de Consignation",
    category: 'transport_logistique',
    price: 10000, priceMax: 28000,
    description: "Convention encadrant la représentation du navire et de son chargement par le consignataire en port.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'armateur',label:"Armateur",type:'text',required:true},
      {key:'consignataire',label:"Consignataire",type:'text',required:true},
      {key:'navires_concernes',label:"Navires concernés",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CONSIGNATION</h1><p><strong>Armateur :</strong> {{armateur}}</p><p><strong>Consignataire :</strong> {{consignataire}}</p><p><strong>Navires concernés :</strong> {{navires_concernes}}</p><p><strong>Honoraires :</strong> {{honoraires}} FCFA</p><p><strong>Date :</strong> {{date_convention}}</p></div>`
  },
  {
    code: 'mar_contrat_pilotage',
    name: "Contrat Pilotage Portuaire",
    category: 'transport_logistique',
    price: 8000, priceMax: 20000,
    description: "Contrat de prestation de pilotage pour l'entrée et la sortie des navires dans un port.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'autorite_portuaire',label:"Autorité portuaire",type:'text',required:true},
      {key:'prestataire_pilotage',label:"Prestataire de pilotage",type:'text',required:true},
      {key:'port',label:"Port concerné",type:'text',required:true},
      {key:'tarifs',label:"Tarifs de pilotage",type:'textarea',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PILOTAGE PORTUAIRE</h1><p><strong>Autorité portuaire :</strong> {{autorite_portuaire}}</p><p><strong>Prestataire :</strong> {{prestataire_pilotage}}</p><p><strong>Port :</strong> {{port}}</p><p><strong>Tarifs :</strong> {{tarifs}}</p><p><strong>Date :</strong> {{date_contrat}}</p></div>`
  },
  {
    code: 'mar_inspection_navire',
    name: "Rapport Inspection Navire",
    category: 'transport_logistique',
    price: 9000, priceMax: 25000,
    description: "Rapport d'inspection technique d'un navire couvrant l'état de la coque, des machines et équipements.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_navire',label:"Nom du navire",type:'text',required:true},
      {key:'inspecteur',label:"Inspecteur",type:'text',required:true},
      {key:'etat_navire',label:"État général du navire",type:'textarea',required:true},
      {key:'anomalies',label:"Anomalies constatées",type:'textarea',required:true},
      {key:'date_inspection',label:"Date d'inspection",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'INSPECTION NAVIRE</h1><p><strong>Navire :</strong> {{nom_navire}}</p><p><strong>Inspecteur :</strong> {{inspecteur}}</p><p><strong>État général :</strong> {{etat_navire}}</p><p><strong>Anomalies :</strong> {{anomalies}}</p><p><strong>Date :</strong> {{date_inspection}}</p></div>`
  },
  {
    code: 'mar_protocole_securite_port',
    name: "Protocole Sécurité Portuaire",
    category: 'transport_logistique',
    price: 7000, priceMax: 18000,
    description: "Document définissant les procédures et règles de sécurité applicables dans l'enceinte portuaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'port',label:"Port concerné",type:'text',required:true},
      {key:'responsable_securite',label:"Responsable sécurité",type:'text',required:true},
      {key:'mesures_securite',label:"Mesures de sécurité",type:'textarea',required:true},
      {key:'zones_interdites',label:"Zones interdites",type:'textarea',required:true},
      {key:'date_validite',label:"Date de validité",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE SÉCURITÉ PORTUAIRE</h1><p><strong>Port :</strong> {{port}}</p><p><strong>Responsable sécurité :</strong> {{responsable_securite}}</p><p><strong>Mesures de sécurité :</strong> {{mesures_securite}}</p><p><strong>Zones interdites :</strong> {{zones_interdites}}</p><p><strong>Validité :</strong> {{date_validite}}</p></div>`
  },
  {
    code: 'mar_lta',
    name: "Lettre de Transport Aérien (LTA)",
    category: 'transport_logistique',
    price: 7000, priceMax: 18000,
    description: "Document de transport aérien de marchandises constituant le contrat entre expéditeur et transporteur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'expediteur',label:"Expéditeur",type:'text',required:true},
      {key:'destinataire',label:"Destinataire",type:'text',required:true},
      {key:'aeroport_depart',label:"Aéroport de départ",type:'text',required:true},
      {key:'aeroport_arrivee',label:"Aéroport d'arrivée",type:'text',required:true},
      {key:'description_fret',label:"Description du fret",type:'textarea',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>LETTRE DE TRANSPORT AÉRIEN (LTA)</h1><p><strong>Expéditeur :</strong> {{expediteur}}</p><p><strong>Destinataire :</strong> {{destinataire}}</p><p><strong>Aéroport de départ :</strong> {{aeroport_depart}}</p><p><strong>Aéroport d'arrivée :</strong> {{aeroport_arrivee}}</p><p><strong>Description du fret :</strong> {{description_fret}}</p><p><strong>Date :</strong> {{date_emission}}</p></div>`
  },
  {
    code: 'mar_fiche_chargement_aerien',
    name: "Fiche de Chargement Aérien",
    category: 'transport_logistique',
    price: 5000, priceMax: 12000,
    description: "Fiche technique détaillant la répartition du fret à bord d'un aéronef pour l'équilibre de charge.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'vol',label:"Numéro de vol",type:'text',required:true},
      {key:'appareil',label:"Type d'appareil",type:'text',required:true},
      {key:'detail_chargement',label:"Détail du chargement",type:'textarea',required:true},
      {key:'poids_total',label:"Poids total (kg)",type:'text',required:true},
      {key:'date_chargement',label:"Date de chargement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>FICHE DE CHARGEMENT AÉRIEN</h1><p><strong>Vol :</strong> {{vol}}</p><p><strong>Appareil :</strong> {{appareil}}</p><p><strong>Détail du chargement :</strong> {{detail_chargement}}</p><p><strong>Poids total :</strong> {{poids_total}} kg</p><p><strong>Date :</strong> {{date_chargement}}</p></div>`
  },
  {
    code: 'mar_marchandises_dangereuses_air',
    name: "Déclaration Marchandises Dangereuses Air",
    category: 'transport_logistique',
    price: 6000, priceMax: 15000,
    description: "Déclaration obligatoire pour le transport aérien de matières dangereuses conformément aux normes IATA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'expediteur',label:"Expéditeur",type:'text',required:true},
      {key:'nature_produit',label:"Nature du produit dangereux",type:'text',required:true},
      {key:'classe_danger',label:"Classe de danger IATA",type:'text',required:true},
      {key:'quantite',label:"Quantité déclarée",type:'text',required:true},
      {key:'date_declaration',label:"Date de déclaration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION MARCHANDISES DANGEREUSES - TRANSPORT AÉRIEN</h1><p><strong>Expéditeur :</strong> {{expediteur}}</p><p><strong>Produit :</strong> {{nature_produit}}</p><p><strong>Classe de danger :</strong> {{classe_danger}}</p><p><strong>Quantité :</strong> {{quantite}}</p><p><strong>Date :</strong> {{date_declaration}}</p></div>`
  },
  {
    code: 'mar_dommages_fret_aerien',
    name: "Rapport Dommages Fret Aérien",
    category: 'transport_logistique',
    price: 6000, priceMax: 15000,
    description: "Rapport constatant les dommages subis par le fret lors du transport aérien pour mise en jeu de la responsabilité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'compagnie_aerienne',label:"Compagnie aérienne",type:'text',required:true},
      {key:'numero_lta',label:"Numéro de LTA",type:'text',required:true},
      {key:'nature_dommages',label:"Nature des dommages",type:'textarea',required:true},
      {key:'valeur_estimee',label:"Valeur estimée (FCFA)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE DOMMAGES FRET AÉRIEN</h1><p><strong>Compagnie aérienne :</strong> {{compagnie_aerienne}}</p><p><strong>Numéro LTA :</strong> {{numero_lta}}</p><p><strong>Nature des dommages :</strong> {{nature_dommages}}</p><p><strong>Valeur estimée :</strong> {{valeur_estimee}} FCFA</p><p><strong>Date :</strong> {{date_rapport}}</p></div>`
  },
  {
    code: 'mar_contrat_handling',
    name: "Contrat Handling Aéroport",
    category: 'transport_logistique',
    price: 10000, priceMax: 28000,
    description: "Contrat de prestation d'assistance en escale et de manutention du fret dans un aéroport.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'compagnie_aerienne',label:"Compagnie aérienne",type:'text',required:true},
      {key:'handler',label:"Société de handling",type:'text',required:true},
      {key:'aeroport',label:"Aéroport",type:'text',required:true},
      {key:'prestations',label:"Prestations incluses",type:'textarea',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE HANDLING AÉROPORTUAIRE</h1><p><strong>Compagnie aérienne :</strong> {{compagnie_aerienne}}</p><p><strong>Handler :</strong> {{handler}}</p><p><strong>Aéroport :</strong> {{aeroport}}</p><p><strong>Prestations :</strong> {{prestations}}</p><p><strong>Date :</strong> {{date_contrat}}</p></div>`
  },
  {
    code: 'mar_convention_fret_aerien',
    name: "Convention de Fret Aérien",
    category: 'transport_logistique',
    price: 9000, priceMax: 25000,
    description: "Convention encadrant les conditions générales de transport de fret par voie aérienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'chargeur',label:"Chargeur",type:'text',required:true},
      {key:'transporteur',label:"Transporteur aérien",type:'text',required:true},
      {key:'destinations',label:"Destinations couvertes",type:'textarea',required:true},
      {key:'tarif_kg',label:"Tarif par kg (FCFA)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FRET AÉRIEN</h1><p><strong>Chargeur :</strong> {{chargeur}}</p><p><strong>Transporteur :</strong> {{transporteur}}</p><p><strong>Destinations :</strong> {{destinations}}</p><p><strong>Tarif/kg :</strong> {{tarif_kg}} FCFA</p><p><strong>Date :</strong> {{date_convention}}</p></div>`
  },
  {
    code: 'mar_transit_aeroport',
    name: "Rapport Transit Aéroportuaire",
    category: 'transport_logistique',
    price: 5000, priceMax: 12000,
    description: "Rapport de suivi des marchandises en transit dans un aéroport avec statut des opérations douanières.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'aeroport_transit',label:"Aéroport de transit",type:'text',required:true},
      {key:'expediteur',label:"Expéditeur",type:'text',required:true},
      {key:'etat_transit',label:"État des opérations de transit",type:'textarea',required:true},
      {key:'agence_transit',label:"Agence de transit",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE TRANSIT AÉROPORTUAIRE</h1><p><strong>Aéroport de transit :</strong> {{aeroport_transit}}</p><p><strong>Expéditeur :</strong> {{expediteur}}</p><p><strong>État du transit :</strong> {{etat_transit}}</p><p><strong>Agence de transit :</strong> {{agence_transit}}</p><p><strong>Date :</strong> {{date_rapport}}</p></div>`
  },
  {
    code: 'mar_certificat_poids_aerien',
    name: "Certificat de Poids Aérien",
    category: 'transport_logistique',
    price: 4000, priceMax: 10000,
    description: "Certificat officiel attestant le poids réel et volumétrique du fret aérien avant embarquement.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'expediteur',label:"Expéditeur",type:'text',required:true},
      {key:'description_fret',label:"Description du fret",type:'text',required:true},
      {key:'poids_reel',label:"Poids réel (kg)",type:'text',required:true},
      {key:'poids_volumetrique',label:"Poids volumétrique (kg)",type:'text',required:true},
      {key:'date_pesee',label:"Date de pesée",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CERTIFICAT DE POIDS AÉRIEN</h1><p><strong>Expéditeur :</strong> {{expediteur}}</p><p><strong>Fret :</strong> {{description_fret}}</p><p><strong>Poids réel :</strong> {{poids_reel}} kg</p><p><strong>Poids volumétrique :</strong> {{poids_volumetrique}} kg</p><p><strong>Date :</strong> {{date_pesee}}</p></div>`
  },
  {
    code: 'mar_declaration_douaniere',
    name: "Déclaration Douanière Import/Export",
    category: 'transport_logistique',
    price: 8000, priceMax: 20000,
    description: "Déclaration douanière formelle pour l'importation ou l'exportation de marchandises selon le régime OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'declarant',label:"Déclarant",type:'text',required:true},
      {key:'regime_douanier',label:"Régime douanier",type:'text',required:true},
      {key:'description_marchandises',label:"Description des marchandises",type:'textarea',required:true},
      {key:'valeur_en_douane',label:"Valeur en douane (FCFA)",type:'text',required:true},
      {key:'date_declaration',label:"Date de déclaration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DOUANIÈRE IMPORT/EXPORT</h1><p><strong>Déclarant :</strong> {{declarant}}</p><p><strong>Régime douanier :</strong> {{regime_douanier}}</p><p><strong>Marchandises :</strong> {{description_marchandises}}</p><p><strong>Valeur en douane :</strong> {{valeur_en_douane}} FCFA</p><p><strong>Date :</strong> {{date_declaration}}</p></div>`
  },
  {
    code: 'mar_contrat_transport_maritime',
    name: "Contrat de Transport Maritime",
    category: 'transport_logistique',
    price: 12000, priceMax: 35000,
    description: "Contrat formalisant l'accord entre chargeur et armateur pour le transport de marchandises par mer.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'chargeur',label:"Chargeur",type:'text',required:true},
      {key:'armateur',label:"Armateur",type:'text',required:true},
      {key:'marchandises',label:"Nature des marchandises",type:'textarea',required:true},
      {key:'fret',label:"Montant du fret (USD)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRANSPORT MARITIME</h1><p><strong>Chargeur :</strong> {{chargeur}}</p><p><strong>Armateur :</strong> {{armateur}}</p><p><strong>Marchandises :</strong> {{marchandises}}</p><p><strong>Fret :</strong> {{fret}} USD</p><p><strong>Date :</strong> {{date_contrat}}</p></div>`
  },
  {
    code: 'mar_protocole_securite_maritime',
    name: "Protocole de Sécurité Maritime",
    category: 'transport_logistique',
    price: 7000, priceMax: 18000,
    description: "Protocole définissant les procédures de sécurité à bord d'un navire conformément aux conventions SOLAS.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'navire',label:"Nom du navire",type:'text',required:true},
      {key:'capitaine',label:"Capitaine",type:'text',required:true},
      {key:'procedures_securite',label:"Procédures de sécurité",type:'textarea',required:true},
      {key:'equipements_securite',label:"Équipements de sécurité",type:'textarea',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE SÉCURITÉ MARITIME</h1><p><strong>Navire :</strong> {{navire}}</p><p><strong>Capitaine :</strong> {{capitaine}}</p><p><strong>Procédures :</strong> {{procedures_securite}}</p><p><strong>Équipements :</strong> {{equipements_securite}}</p><p><strong>Validé le :</strong> {{date_validation}}</p></div>`
  },
  {
    code: 'mar_rapport_voyage',
    name: "Rapport de Voyage Maritime",
    category: 'transport_logistique',
    price: 6000, priceMax: 15000,
    description: "Rapport de fin de voyage rédigé par le capitaine résumant les conditions et incidents du trajet maritime.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'navire',label:"Nom du navire",type:'text',required:true},
      {key:'capitaine',label:"Capitaine",type:'text',required:true},
      {key:'route_suivie',label:"Route suivie",type:'textarea',required:true},
      {key:'incidents',label:"Incidents et observations",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE VOYAGE MARITIME</h1><p><strong>Navire :</strong> {{navire}}</p><p><strong>Capitaine :</strong> {{capitaine}}</p><p><strong>Route suivie :</strong> {{route_suivie}}</p><p><strong>Incidents :</strong> {{incidents}}</p><p><strong>Date :</strong> {{date_rapport}}</p></div>`
  },

  // ─── LOGISTIQUE AVANCÉE (log2_) ───
  {
    code: 'log2_plan_logistique',
    name: "Plan Logistique Opérationnel",
    category: 'transport_logistique',
    price: 10000, priceMax: 30000,
    description: "Document stratégique décrivant l'organisation et les ressources logistiques pour une période donnée.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'objectifs_logistiques',label:"Objectifs logistiques",type:'textarea',required:true},
      {key:'ressources_allouees',label:"Ressources allouées",type:'textarea',required:true},
      {key:'date_elaboration',label:"Date d'élaboration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN LOGISTIQUE OPÉRATIONNEL</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Période :</strong> {{periode}}</p><p><strong>Objectifs :</strong> {{objectifs_logistiques}}</p><p><strong>Ressources :</strong> {{ressources_allouees}}</p><p><strong>Date :</strong> {{date_elaboration}}</p></div>`
  },
  {
    code: 'log2_gestion_stocks',
    name: "Procédure de Gestion des Stocks",
    category: 'transport_logistique',
    price: 7000, priceMax: 18000,
    description: "Document définissant les règles et méthodes de gestion des stocks dans un entrepôt ou magasin.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'entrepot',label:"Entrepôt / site",type:'text',required:true},
      {key:'responsable',label:"Responsable des stocks",type:'text',required:true},
      {key:'methode_gestion',label:"Méthode de gestion retenue",type:'textarea',required:true},
      {key:'seuils_alerte',label:"Seuils d'alerte et de réapprovisionnement",type:'textarea',required:true},
      {key:'date_mise_en_vigueur',label:"Date de mise en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÉDURE DE GESTION DES STOCKS</h1><p><strong>Entrepôt :</strong> {{entrepot}}</p><p><strong>Responsable :</strong> {{responsable}}</p><p><strong>Méthode :</strong> {{methode_gestion}}</p><p><strong>Seuils d'alerte :</strong> {{seuils_alerte}}</p><p><strong>En vigueur le :</strong> {{date_mise_en_vigueur}}</p></div>`
  },
  {
    code: 'log2_reception_marchandises',
    name: "Fiche de Réception Marchandises",
    category: 'transport_logistique',
    price: 4000, priceMax: 10000,
    description: "Fiche de contrôle et d'enregistrement des marchandises reçues par rapport aux bons de commande.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 85,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur",type:'text',required:true},
      {key:'bon_commande',label:"Numéro de bon de commande",type:'text',required:true},
      {key:'articles_recus',label:"Articles reçus",type:'textarea',required:true},
      {key:'observations',label:"Observations et réserves",type:'textarea',required:false},
      {key:'date_reception',label:"Date de réception",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>FICHE DE RÉCEPTION MARCHANDISES</h1><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>BC N° :</strong> {{bon_commande}}</p><p><strong>Articles reçus :</strong> {{articles_recus}}</p><p><strong>Observations :</strong> {{observations}}</p><p><strong>Date :</strong> {{date_reception}}</p></div>`
  },
  {
    code: 'log2_bon_sortie_stock',
    name: "Bon de Sortie de Stock",
    category: 'transport_logistique',
    price: 3000, priceMax: 8000,
    description: "Document autorisant et enregistrant la sortie de produits du stock pour livraison ou usage interne.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 88,
    fieldsJson: F([
      {key:'demandeur',label:"Service demandeur",type:'text',required:true},
      {key:'articles_sortis',label:"Articles sortis",type:'textarea',required:true},
      {key:'destination',label:"Destination",type:'text',required:true},
      {key:'responsable_stock',label:"Responsable stock",type:'text',required:true},
      {key:'date_sortie',label:"Date de sortie",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BON DE SORTIE DE STOCK</h1><p><strong>Demandeur :</strong> {{demandeur}}</p><p><strong>Articles :</strong> {{articles_sortis}}</p><p><strong>Destination :</strong> {{destination}}</p><p><strong>Responsable stock :</strong> {{responsable_stock}}</p><p><strong>Date :</strong> {{date_sortie}}</p></div>`
  },
  {
    code: 'log2_inventaire_tournant',
    name: "Inventaire Tournant",
    category: 'transport_logistique',
    price: 5000, priceMax: 12000,
    description: "Rapport d'inventaire partiel et rotatif permettant un contrôle continu des stocks sans arrêter l'activité.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entrepot',label:"Entrepôt",type:'text',required:true},
      {key:'zone_inventoriee',label:"Zone inventoriée",type:'text',required:true},
      {key:'resultats_inventaire',label:"Résultats de l'inventaire",type:'textarea',required:true},
      {key:'ecarts_constates',label:"Écarts constatés",type:'textarea',required:false},
      {key:'date_inventaire',label:"Date de l'inventaire",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>INVENTAIRE TOURNANT</h1><p><strong>Entrepôt :</strong> {{entrepot}}</p><p><strong>Zone :</strong> {{zone_inventoriee}}</p><p><strong>Résultats :</strong> {{resultats_inventaire}}</p><p><strong>Écarts :</strong> {{ecarts_constates}}</p><p><strong>Date :</strong> {{date_inventaire}}</p></div>`
  },
  {
    code: 'log2_rapport_entrepot',
    name: "Rapport de Gestion d'Entrepôt",
    category: 'transport_logistique',
    price: 6000, priceMax: 15000,
    description: "Rapport périodique sur les activités de l'entrepôt incluant flux, taux d'occupation et performance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'entrepot',label:"Entrepôt",type:'text',required:true},
      {key:'responsable',label:"Responsable",type:'text',required:true},
      {key:'activites_periode',label:"Activités de la période",type:'textarea',required:true},
      {key:'taux_occupation',label:"Taux d'occupation (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE GESTION D'ENTREPÔT</h1><p><strong>Entrepôt :</strong> {{entrepot}}</p><p><strong>Responsable :</strong> {{responsable}}</p><p><strong>Activités :</strong> {{activites_periode}}</p><p><strong>Taux d'occupation :</strong> {{taux_occupation}} %</p><p><strong>Date :</strong> {{date_rapport}}</p></div>`
  },
  {
    code: 'log2_procedure_picking',
    name: "Procédure de Picking",
    category: 'transport_logistique',
    price: 5000, priceMax: 12000,
    description: "Document décrivant les étapes et règles de prélèvement des articles pour préparer les commandes clients.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'entrepot',label:"Entrepôt",type:'text',required:true},
      {key:'methode_picking',label:"Méthode de picking",type:'text',required:true},
      {key:'etapes',label:"Étapes de la procédure",type:'textarea',required:true},
      {key:'responsable',label:"Responsable",type:'text',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÉDURE DE PICKING</h1><p><strong>Entrepôt :</strong> {{entrepot}}</p><p><strong>Méthode :</strong> {{methode_picking}}</p><p><strong>Étapes :</strong> {{etapes}}</p><p><strong>Responsable :</strong> {{responsable}}</p><p><strong>Validée le :</strong> {{date_validation}}</p></div>`
  },
  {
    code: 'log2_preparation_commande',
    name: "Fiche de Préparation Commande",
    category: 'transport_logistique',
    price: 3000, priceMax: 8000,
    description: "Fiche opérationnelle guidant le préparateur dans le prélèvement et l'emballage des articles commandés.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 82,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'numero_commande',label:"Numéro de commande",type:'text',required:true},
      {key:'articles_preparer',label:"Articles à préparer",type:'textarea',required:true},
      {key:'preparateur',label:"Préparateur",type:'text',required:true},
      {key:'date_preparation',label:"Date de préparation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>FICHE DE PRÉPARATION COMMANDE</h1><p><strong>Client :</strong> {{client}}</p><p><strong>Commande N° :</strong> {{numero_commande}}</p><p><strong>Articles :</strong> {{articles_preparer}}</p><p><strong>Préparateur :</strong> {{preparateur}}</p><p><strong>Date :</strong> {{date_preparation}}</p></div>`
  },
  {
    code: 'log2_performance_logistique',
    name: "Rapport de Performance Logistique",
    category: 'transport_logistique',
    price: 7000, priceMax: 18000,
    description: "Rapport d'analyse des indicateurs de performance logistique sur une période pour identifier les axes d'amélioration.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'periode_analyse',label:"Période d'analyse",type:'text',required:true},
      {key:'indicateurs_cles',label:"Indicateurs clés de performance",type:'textarea',required:true},
      {key:'analyse_resultats',label:"Analyse des résultats",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE LOGISTIQUE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Période :</strong> {{periode_analyse}}</p><p><strong>KPI :</strong> {{indicateurs_cles}}</p><p><strong>Analyse :</strong> {{analyse_resultats}}</p><p><strong>Date :</strong> {{date_rapport}}</p></div>`
  },
  {
    code: 'log2_tableau_kpi',
    name: "Tableau KPI Logistique",
    category: 'transport_logistique',
    price: 6000, priceMax: 15000,
    description: "Tableau de bord synthétique des indicateurs clés de performance de la chaîne logistique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'entite',label:"Entité logistique",type:'text',required:true},
      {key:'periode',label:"Période",type:'text',required:true},
      {key:'kpi_transport',label:"KPI Transport",type:'textarea',required:true},
      {key:'kpi_entrepot',label:"KPI Entrepôt",type:'textarea',required:true},
      {key:'date_edition',label:"Date d'édition",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>TABLEAU KPI LOGISTIQUE</h1><p><strong>Entité :</strong> {{entite}}</p><p><strong>Période :</strong> {{periode}}</p><p><strong>KPI Transport :</strong> {{kpi_transport}}</p><p><strong>KPI Entrepôt :</strong> {{kpi_entrepot}}</p><p><strong>Édité le :</strong> {{date_edition}}</p></div>`
  },
  {
    code: 'log2_plan_transport_annuel',
    name: "Plan de Transport Annuel",
    category: 'transport_logistique',
    price: 10000, priceMax: 28000,
    description: "Plan prévisionnel annuel des besoins et opérations de transport pour une entreprise ou une région.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'annee',label:"Année",type:'text',required:true},
      {key:'previsions_transport',label:"Prévisions de transport",type:'textarea',required:true},
      {key:'budget_alloue',label:"Budget alloué (FCFA)",type:'text',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE TRANSPORT ANNUEL</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Année :</strong> {{annee}}</p><p><strong>Prévisions :</strong> {{previsions_transport}}</p><p><strong>Budget :</strong> {{budget_alloue}} FCFA</p><p><strong>Validé le :</strong> {{date_validation}}</p></div>`
  },
  {
    code: 'log2_appel_offres_transport',
    name: "Appel d'Offres Transport",
    category: 'transport_logistique',
    price: 9000, priceMax: 25000,
    description: "Document d'appel à la concurrence pour la sélection de prestataires de transport selon les besoins.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'acheteur',label:"Acheteur / Donneur d'ordre",type:'text',required:true},
      {key:'objet_appel',label:"Objet de l'appel d'offres",type:'textarea',required:true},
      {key:'criteres_selection',label:"Critères de sélection",type:'textarea',required:true},
      {key:'volume_estime',label:"Volume estimé (tonnes/mois)",type:'text',required:true},
      {key:'date_cloture',label:"Date de clôture",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>APPEL D'OFFRES TRANSPORT</h1><p><strong>Acheteur :</strong> {{acheteur}}</p><p><strong>Objet :</strong> {{objet_appel}}</p><p><strong>Critères :</strong> {{criteres_selection}}</p><p><strong>Volume estimé :</strong> {{volume_estime}} T/mois</p><p><strong>Date de clôture :</strong> {{date_cloture}}</p></div>`
  },
  {
    code: 'log2_commission_transport',
    name: "Contrat de Commission de Transport",
    category: 'transport_logistique',
    price: 10000, priceMax: 28000,
    description: "Contrat par lequel le commissionnaire de transport organise le transport pour compte du commettant.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'commettant',label:"Commettant",type:'text',required:true},
      {key:'commissionnaire',label:"Commissionnaire de transport",type:'text',required:true},
      {key:'missions',label:"Missions du commissionnaire",type:'textarea',required:true},
      {key:'commission',label:"Commission (% ou FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMMISSION DE TRANSPORT</h1><p><strong>Commettant :</strong> {{commettant}}</p><p><strong>Commissionnaire :</strong> {{commissionnaire}}</p><p><strong>Missions :</strong> {{missions}}</p><p><strong>Commission :</strong> {{commission}}</p><p><strong>Date :</strong> {{date_contrat}}</p></div>`
  },
  {
    code: 'log2_transport_multimodal',
    name: "Bordereau de Transport Multimodal",
    category: 'transport_logistique',
    price: 7000, priceMax: 18000,
    description: "Document unique couvrant le transport de marchandises utilisant plusieurs modes de transport successifs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'expediteur',label:"Expéditeur",type:'text',required:true},
      {key:'destinataire',label:"Destinataire",type:'text',required:true},
      {key:'modes_transport',label:"Modes de transport utilisés",type:'textarea',required:true},
      {key:'description_marchandises',label:"Description des marchandises",type:'textarea',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BORDEREAU DE TRANSPORT MULTIMODAL</h1><p><strong>Expéditeur :</strong> {{expediteur}}</p><p><strong>Destinataire :</strong> {{destinataire}}</p><p><strong>Modes de transport :</strong> {{modes_transport}}</p><p><strong>Marchandises :</strong> {{description_marchandises}}</p><p><strong>Date :</strong> {{date_emission}}</p></div>`
  },
  {
    code: 'log2_messagerie_express',
    name: "Contrat de Messagerie Express",
    category: 'transport_logistique',
    price: 8000, priceMax: 20000,
    description: "Contrat encadrant les prestations de collecte et de livraison express de colis et documents.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'prestataire',label:"Prestataire de messagerie",type:'text',required:true},
      {key:'zones_couvertes',label:"Zones de livraison couvertes",type:'textarea',required:true},
      {key:'delai_livraison',label:"Délai de livraison garanti",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MESSAGERIE EXPRESS</h1><p><strong>Client :</strong> {{client}}</p><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Zones :</strong> {{zones_couvertes}}</p><p><strong>Délai garanti :</strong> {{delai_livraison}}</p><p><strong>Date :</strong> {{date_contrat}}</p></div>`
  },
  {
    code: 'log2_depot_marchandises',
    name: "Convention de Dépôt Marchandises",
    category: 'transport_logistique',
    price: 9000, priceMax: 25000,
    description: "Convention fixant les conditions de stockage temporaire de marchandises dans un entrepôt tiers.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'deposant',label:"Déposant",type:'text',required:true},
      {key:'depositaire',label:"Dépositaire",type:'text',required:true},
      {key:'description_marchandises',label:"Description des marchandises",type:'textarea',required:true},
      {key:'tarif_stockage',label:"Tarif de stockage (FCFA/m²/mois)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE DÉPÔT MARCHANDISES</h1><p><strong>Déposant :</strong> {{deposant}}</p><p><strong>Dépositaire :</strong> {{depositaire}}</p><p><strong>Marchandises :</strong> {{description_marchandises}}</p><p><strong>Tarif :</strong> {{tarif_stockage}} FCFA/m²/mois</p><p><strong>Date :</strong> {{date_convention}}</p></div>`
  },
  {
    code: 'log2_rapport_tournees',
    name: "Rapport de Tournées Livraison",
    category: 'transport_logistique',
    price: 5000, priceMax: 12000,
    description: "Rapport journalier ou hebdomadaire synthétisant les tournées de livraison effectuées par les chauffeurs.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 78,
    fieldsJson: F([
      {key:'chauffeur',label:"Chauffeur",type:'text',required:true},
      {key:'vehicule',label:"Véhicule immatriculé",type:'text',required:true},
      {key:'tournees_effectuees',label:"Tournées effectuées",type:'textarea',required:true},
      {key:'observations',label:"Observations",type:'textarea',required:false},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE TOURNÉES LIVRAISON</h1><p><strong>Chauffeur :</strong> {{chauffeur}}</p><p><strong>Véhicule :</strong> {{vehicule}}</p><p><strong>Tournées :</strong> {{tournees_effectuees}}</p><p><strong>Observations :</strong> {{observations}}</p><p><strong>Date :</strong> {{date_rapport}}</p></div>`
  },
  {
    code: 'log2_non_conformite_transport',
    name: "Fiche de Non-Conformité Transport",
    category: 'transport_logistique',
    price: 4000, priceMax: 10000,
    description: "Fiche de signalement et de traitement d'une non-conformité détectée dans le processus de transport.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'signalant',label:"Signalant",type:'text',required:true},
      {key:'nature_non_conformite',label:"Nature de la non-conformité",type:'textarea',required:true},
      {key:'impact',label:"Impact constaté",type:'textarea',required:true},
      {key:'action_corrective',label:"Action corrective proposée",type:'textarea',required:true},
      {key:'date_fiche',label:"Date de la fiche",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>FICHE DE NON-CONFORMITÉ TRANSPORT</h1><p><strong>Signalant :</strong> {{signalant}}</p><p><strong>Non-conformité :</strong> {{nature_non_conformite}}</p><p><strong>Impact :</strong> {{impact}}</p><p><strong>Action corrective :</strong> {{action_corrective}}</p><p><strong>Date :</strong> {{date_fiche}}</p></div>`
  },
  {
    code: 'log2_retour_marchandises',
    name: "Procédure de Retour Marchandises",
    category: 'transport_logistique',
    price: 5000, priceMax: 12000,
    description: "Procédure encadrant le processus de retour des marchandises du client vers le fournisseur ou l'entrepôt.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'reference_commande',label:"Référence commande d'origine",type:'text',required:true},
      {key:'motif_retour',label:"Motif du retour",type:'textarea',required:true},
      {key:'articles_retournes',label:"Articles retournés",type:'textarea',required:true},
      {key:'date_retour',label:"Date du retour",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÉDURE DE RETOUR MARCHANDISES</h1><p><strong>Client :</strong> {{client}}</p><p><strong>Commande d'origine :</strong> {{reference_commande}}</p><p><strong>Motif :</strong> {{motif_retour}}</p><p><strong>Articles retournés :</strong> {{articles_retournes}}</p><p><strong>Date :</strong> {{date_retour}}</p></div>`
  },
  {
    code: 'log2_plan_chargement',
    name: "Plan de Chargement Véhicule",
    category: 'transport_logistique',
    price: 4000, priceMax: 10000,
    description: "Document technique précisant la disposition optimale des marchandises à bord d'un véhicule de transport.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'vehicule',label:"Véhicule immatriculé",type:'text',required:true},
      {key:'chauffeur',label:"Chauffeur",type:'text',required:true},
      {key:'marchandises_chargees',label:"Marchandises chargées",type:'textarea',required:true},
      {key:'poids_total',label:"Poids total chargé (kg)",type:'text',required:true},
      {key:'date_chargement',label:"Date de chargement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CHARGEMENT VÉHICULE</h1><p><strong>Véhicule :</strong> {{vehicule}}</p><p><strong>Chauffeur :</strong> {{chauffeur}}</p><p><strong>Marchandises :</strong> {{marchandises_chargees}}</p><p><strong>Poids total :</strong> {{poids_total}} kg</p><p><strong>Date :</strong> {{date_chargement}}</p></div>`
  },
  {
    code: 'log2_entretien_vehicule',
    name: "Fiche d'Entretien Véhicule",
    category: 'transport_logistique',
    price: 4000, priceMax: 10000,
    description: "Fiche de suivi des opérations de maintenance préventive et corrective d'un véhicule de la flotte.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 75,
    fieldsJson: F([
      {key:'vehicule',label:"Véhicule immatriculé",type:'text',required:true},
      {key:'kilometrage',label:"Kilométrage actuel",type:'text',required:true},
      {key:'operations_effectuees',label:"Opérations d'entretien effectuées",type:'textarea',required:true},
      {key:'prochain_entretien',label:"Date du prochain entretien",type:'date',required:true},
      {key:'date_entretien',label:"Date de l'entretien",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>FICHE D'ENTRETIEN VÉHICULE</h1><p><strong>Véhicule :</strong> {{vehicule}}</p><p><strong>Kilométrage :</strong> {{kilometrage}} km</p><p><strong>Opérations :</strong> {{operations_effectuees}}</p><p><strong>Prochain entretien :</strong> {{prochain_entretien}}</p><p><strong>Date :</strong> {{date_entretien}}</p></div>`
  },
  {
    code: 'log2_accident_transport',
    name: "Rapport d'Accident de Transport",
    category: 'transport_logistique',
    price: 6000, priceMax: 15000,
    description: "Rapport circonstancié d'un accident impliquant un véhicule de transport pour déclaration assurance et enquête.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'chauffeur',label:"Chauffeur impliqué",type:'text',required:true},
      {key:'vehicule',label:"Véhicule immatriculé",type:'text',required:true},
      {key:'circonstances',label:"Circonstances de l'accident",type:'textarea',required:true},
      {key:'degats_constates',label:"Dégâts constatés",type:'textarea',required:true},
      {key:'date_accident',label:"Date de l'accident",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ACCIDENT DE TRANSPORT</h1><p><strong>Chauffeur :</strong> {{chauffeur}}</p><p><strong>Véhicule :</strong> {{vehicule}}</p><p><strong>Circonstances :</strong> {{circonstances}}</p><p><strong>Dégâts :</strong> {{degats_constates}}</p><p><strong>Date :</strong> {{date_accident}}</p></div>`
  },
  {
    code: 'log2_cooperation_logistique',
    name: "Convention de Coopération Logistique",
    category: 'transport_logistique',
    price: 12000, priceMax: 35000,
    description: "Convention de partenariat entre deux entités pour mutualiser des ressources et capacités logistiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'partenaire_a',label:"Partenaire A",type:'text',required:true},
      {key:'partenaire_b',label:"Partenaire B",type:'text',required:true},
      {key:'objet_cooperation',label:"Objet de la coopération",type:'textarea',required:true},
      {key:'ressources_mutualisees',label:"Ressources mutualisées",type:'textarea',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE COOPÉRATION LOGISTIQUE</h1><p><strong>Partenaire A :</strong> {{partenaire_a}}</p><p><strong>Partenaire B :</strong> {{partenaire_b}}</p><p><strong>Objet :</strong> {{objet_cooperation}}</p><p><strong>Ressources mutualisées :</strong> {{ressources_mutualisees}}</p><p><strong>Date :</strong> {{date_convention}}</p></div>`
  },
  {
    code: 'log2_continuite_logistique',
    name: "Plan de Continuité Logistique",
    category: 'transport_logistique',
    price: 10000, priceMax: 28000,
    description: "Plan assurant la continuité des opérations logistiques en cas de crise ou d'événement perturbateur majeur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'scenarios_risques',label:"Scénarios de risques identifiés",type:'textarea',required:true},
      {key:'mesures_continuite',label:"Mesures de continuité",type:'textarea',required:true},
      {key:'responsable_plan',label:"Responsable du plan",type:'text',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CONTINUITÉ LOGISTIQUE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Scénarios de risques :</strong> {{scenarios_risques}}</p><p><strong>Mesures de continuité :</strong> {{mesures_continuite}}</p><p><strong>Responsable :</strong> {{responsable_plan}}</p><p><strong>Validé le :</strong> {{date_validation}}</p></div>`
  },
  {
    code: 'log2_prestation_logistique',
    name: "Contrat de Prestation Logistique",
    category: 'transport_logistique',
    price: 12000, priceMax: 35000,
    description: "Contrat global encadrant l'externalisation de tout ou partie de la chaîne logistique à un prestataire spécialisé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'client',label:"Client donneur d'ordre",type:'text',required:true},
      {key:'prestataire',label:"Prestataire logistique",type:'text',required:true},
      {key:'perimetre_mission',label:"Périmètre de la mission",type:'textarea',required:true},
      {key:'remuneration',label:"Rémunération (FCFA/mois)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRESTATION LOGISTIQUE</h1><p><strong>Client :</strong> {{client}}</p><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Périmètre :</strong> {{perimetre_mission}}</p><p><strong>Rémunération :</strong> {{remuneration}} FCFA/mois</p><p><strong>Date :</strong> {{date_contrat}}</p></div>`
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
  console.log(`Batch 14a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
