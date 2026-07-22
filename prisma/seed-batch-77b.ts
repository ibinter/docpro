import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── GÉNIE INDUSTRIEL / MAINTENANCE (gin_) ───────────────────────────────
  {
    code: 'gin_maint_prev', name: "Accord de service de maintenance préventive industrielle", category: 'btp_construction', price: 8000, priceMax: 24000,
    description: "Contrat OHADA de maintenance préventive définissant les interventions planifiées sur équipements industriels.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client / entreprise",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site industriel",type:'text',required:true},
      {key:'equipements',label:"Liste des équipements concernés",type:'textarea',required:true},
      {key:'periodicite',label:"Périodicité des interventions",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'date_fin',label:"Date de fin du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MAINTENANCE PRÉVENTIVE INDUSTRIELLE</h1><p><strong>Entre :</strong> {{client_nom}}, ci-après dénommé le CLIENT, et le prestataire, ci-après dénommé le PRESTATAIRE.</p><h2>Article 1 — Objet</h2><p>Le présent accord a pour objet la réalisation d'opérations de maintenance préventive sur les équipements industriels situés à l'adresse suivante : {{site_adresse}}.</p><h2>Article 2 — Équipements couverts</h2><p>{{equipements}}</p><h2>Article 3 — Périodicité</h2><p>Les interventions seront effectuées selon la périodicité suivante : {{periodicite}}.</p><h2>Article 4 — Durée</h2><p>Le présent accord est conclu du {{date_debut}} au {{date_fin}}, renouvelable par tacite reconduction.</p><h2>Article 5 — Droit applicable</h2><p>Le présent accord est soumis au droit ivoirien et aux dispositions de l'Acte Uniforme OHADA.</p></div>`
  },
  {
    code: 'gin_maint_corr', name: "Accord de service de maintenance corrective industrielle", category: 'btp_construction', price: 7000, priceMax: 21000,
    description: "Contrat OHADA encadrant les interventions correctives suite à pannes ou défaillances d'équipements industriels.", templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'delai_intervention',label:"Délai maximum d'intervention (heures)",type:'text',required:true},
      {key:'equipements',label:"Équipements concernés",type:'textarea',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MAINTENANCE CORRECTIVE INDUSTRIELLE</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Le PRESTATAIRE s'engage à réaliser des interventions de maintenance corrective sur les équipements défaillants dans un délai maximum de {{delai_intervention}} heures suivant le signalement.</p><h2>Article 2 — Équipements</h2><p>{{equipements}}</p><h2>Article 3 — Prise d'effet</h2><p>Le présent accord prend effet le {{date_debut}}.</p><h2>Article 4 — Responsabilité</h2><p>Le PRESTATAIRE est responsable des travaux effectués conformément aux règles de l'art et aux normes en vigueur en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'gin_maint_pred', name: "Accord de service de maintenance prédictive (condition monitoring)", category: 'btp_construction', price: 12000, priceMax: 40000,
    description: "Contrat de maintenance prédictive basé sur la surveillance des conditions d'exploitation des équipements industriels.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'technologies',label:"Technologies de surveillance utilisées (vibration, thermographie...)",type:'textarea',required:true},
      {key:'rapport_freq',label:"Fréquence des rapports d'analyse",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MAINTENANCE PRÉDICTIVE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Le présent accord porte sur la mise en place d'un programme de maintenance prédictive par condition monitoring.</p><h2>Article 2 — Technologies déployées</h2><p>{{technologies}}</p><h2>Article 3 — Rapports</h2><p>Des rapports d'analyse seront transmis au CLIENT selon la fréquence suivante : {{rapport_freq}}.</p><h2>Article 4 — Prise d'effet</h2><p>Accord effectif à compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_gmao', name: "Accord de service de GMAO (gestion de maintenance assistée par ordinateur)", category: 'btp_construction', price: 10000, priceMax: 35000,
    description: "Contrat de déploiement et d'exploitation d'un logiciel de GMAO pour la gestion des actifs industriels.", templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'logiciel_gmao',label:"Nom du logiciel GMAO",type:'text',required:true},
      {key:'nb_utilisateurs',label:"Nombre d'utilisateurs",type:'text',required:true},
      {key:'formation_duree',label:"Durée de la formation (jours)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GMAO</h1><p><strong>Client :</strong> {{client_nom}}</p><h2>Article 1 — Objet</h2><p>Déploiement et maintien opérationnel du logiciel {{logiciel_gmao}} pour la gestion de la maintenance assistée par ordinateur.</p><h2>Article 2 — Périmètre utilisateurs</h2><p>Le service couvrira {{nb_utilisateurs}} utilisateurs sur le site du CLIENT.</p><h2>Article 3 — Formation</h2><p>Une formation de {{formation_duree}} jours sera dispensée aux équipes du CLIENT.</p><h2>Article 4 — Démarrage</h2><p>Le projet démarre le {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_insp_machines', name: "Accord de service d'inspection de machines tournantes", category: 'btp_construction', price: 6000, priceMax: 18000,
    description: "Contrat d'inspection périodique des machines tournantes (moteurs, pompes, compresseurs) en milieu industriel.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'machines',label:"Liste des machines tournantes",type:'textarea',required:true},
      {key:'methodes',label:"Méthodes d'inspection (vibration, thermographie, analyse huile...)",type:'text',required:true},
      {key:'periodicite',label:"Périodicité des inspections",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INSPECTION DE MACHINES TOURNANTES</h1><p><strong>Client :</strong> {{client_nom}}</p><h2>Article 1 — Objet</h2><p>Le présent accord porte sur l'inspection périodique des machines tournantes listées ci-dessous.</p><h2>Article 2 — Machines concernées</h2><p>{{machines}}</p><h2>Article 3 — Méthodes</h2><p>{{methodes}}</p><h2>Article 4 — Périodicité</h2><p>Inspections réalisées selon la fréquence : {{periodicite}}, à compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_equilibrage', name: "Accord de service d'équilibrage dynamique de machines", category: 'btp_construction', price: 5000, priceMax: 15000,
    description: "Contrat de prestation d'équilibrage dynamique sur site pour roues, rotors et arbres de machines industrielles.", templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'rotors',label:"Rotors / machines à équilibrer",type:'textarea',required:true},
      {key:'norme',label:"Norme d'équilibrage applicable (ex. ISO 1940)",type:'text',required:true},
      {key:'date_intervention',label:"Date d'intervention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉQUILIBRAGE DYNAMIQUE DE MACHINES</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Réalisation d'opérations d'équilibrage dynamique sur les rotors et machines désignés.</p><h2>Article 2 — Équipements</h2><p>{{rotors}}</p><h2>Article 3 — Norme</h2><p>Les travaux sont réalisés conformément à la norme {{norme}}.</p><h2>Article 4 — Date d'intervention</h2><p>Intervention prévue le {{date_intervention}}.</p></div>`
  },
  {
    code: 'gin_lubrification', name: "Accord de service de lubrification industrielle", category: 'btp_construction', price: 4500, priceMax: 14000,
    description: "Contrat de gestion et d'application des lubrifiants sur les équipements industriels pour optimiser leur durée de vie.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'equipements',label:"Équipements à lubrifier",type:'textarea',required:true},
      {key:'plan_lubrification',label:"Description du plan de lubrification",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LUBRIFICATION INDUSTRIELLE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Le PRESTATAIRE assure la gestion et l'application des lubrifiants sur les équipements du CLIENT.</p><h2>Article 2 — Équipements concernés</h2><p>{{equipements}}</p><h2>Article 3 — Plan de lubrification</h2><p>{{plan_lubrification}}</p><h2>Article 4 — Prise d'effet</h2><p>Le présent accord prend effet le {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_soudure', name: "Accord de service de soudure et chaudronnerie industrielle", category: 'btp_construction', price: 7000, priceMax: 22000,
    description: "Contrat de prestation de soudure, assemblage et chaudronnerie industrielle pour équipements sous pression et structures métalliques.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'travaux',label:"Description des travaux de soudure/chaudronnerie",type:'textarea',required:true},
      {key:'procedes',label:"Procédés de soudage (TIG, MIG, électrode enrobée...)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOUDURE ET CHAUDRONNERIE INDUSTRIELLE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Le présent accord porte sur la réalisation de travaux de soudure et de chaudronnerie industrielle.</p><h2>Article 2 — Nature des travaux</h2><p>{{travaux}}</p><h2>Article 3 — Procédés utilisés</h2><p>{{procedes}}</p><h2>Article 4 — Calendrier</h2><p>Les travaux débutent le {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_tuyauterie', name: "Accord de service de tuyauterie industrielle et robinetterie", category: 'btp_construction', price: 8000, priceMax: 25000,
    description: "Contrat de pose, maintenance et réparation de réseaux de tuyauterie industrielle et d'équipements de robinetterie.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'fluides',label:"Nature des fluides transportés",type:'text',required:true},
      {key:'travaux',label:"Description des travaux de tuyauterie",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TUYAUTERIE INDUSTRIELLE ET ROBINETTERIE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Réalisation et maintenance de réseaux de tuyauterie industrielle pour le transport de : {{fluides}}.</p><h2>Article 2 — Travaux</h2><p>{{travaux}}</p><h2>Article 3 — Démarrage</h2><p>Début des travaux : {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_thermique', name: "Accord de service de génie thermique (chauffe-eau, vapeur)", category: 'btp_construction', price: 9000, priceMax: 28000,
    description: "Contrat de maintenance et d'exploitation des installations de génie thermique incluant chaudières, chauffe-eau industriels et réseaux vapeur.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'installations',label:"Description des installations thermiques",type:'textarea',required:true},
      {key:'pression_max',label:"Pression de service maximale (bar)",type:'text',required:true},
      {key:'date_debut',label:"Date de prise en charge",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GÉNIE THERMIQUE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Le PRESTATAIRE assure la maintenance des installations thermiques du CLIENT.</p><h2>Article 2 — Installations</h2><p>{{installations}}</p><h2>Article 3 — Paramètres techniques</h2><p>Pression de service maximale : {{pression_max}} bar.</p><h2>Article 4 — Prise en charge</h2><p>Effective le {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_compresseurs', name: "Accord de service de compresseurs d'air industriels", category: 'btp_construction', price: 6500, priceMax: 20000,
    description: "Contrat de maintenance préventive et corrective des compresseurs d'air et réseaux d'air comprimé en milieu industriel.", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'compresseurs',label:"Liste des compresseurs (marque, modèle, puissance)",type:'textarea',required:true},
      {key:'periodicite',label:"Périodicité de maintenance",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPRESSEURS D'AIR INDUSTRIELS</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Maintenance des compresseurs d'air industriels et du réseau d'air comprimé associé.</p><h2>Article 2 — Équipements</h2><p>{{compresseurs}}</p><h2>Article 3 — Périodicité</h2><p>{{periodicite}} — à compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_pompes', name: "Accord de service de pompes et surpresseurs", category: 'btp_construction', price: 6000, priceMax: 18000,
    description: "Contrat de maintenance des pompes centrifuges, volumétriques et surpresseurs utilisés dans les process industriels.", templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'pompes',label:"Liste des pompes et surpresseurs",type:'textarea',required:true},
      {key:'fluides',label:"Fluides pompés",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE POMPES ET SURPRESSEURS</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Maintenance préventive et corrective des pompes et surpresseurs pour le transport de : {{fluides}}.</p><h2>Article 2 — Équipements</h2><p>{{pompes}}</p><h2>Article 3 — Prise d'effet</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_convoyeurs', name: "Accord de service de convoyeurs et manutention industrielle", category: 'btp_construction', price: 7500, priceMax: 22000,
    description: "Contrat de maintenance des systèmes de convoyage et de manutention industrielle (tapis, rouleaux, chaînes).", templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'systemes',label:"Description des systèmes de convoyage",type:'textarea',required:true},
      {key:'capacite',label:"Capacité de transport (t/h)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONVOYEURS ET MANUTENTION INDUSTRIELLE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Maintenance des systèmes de convoyage et de manutention industrielle du CLIENT.</p><h2>Article 2 — Systèmes concernés</h2><p>{{systemes}} — Capacité nominale : {{capacite}} t/h.</p><h2>Article 3 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_grues', name: "Accord de service de grues et ponts roulants", category: 'btp_construction', price: 9000, priceMax: 30000,
    description: "Contrat de maintenance, vérification réglementaire et réparation de grues et ponts roulants industriels.", templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'engins',label:"Liste des grues et ponts roulants (capacité, marque)",type:'textarea',required:true},
      {key:'verif_reglementaire',label:"Organisme de vérification réglementaire",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GRUES ET PONTS ROULANTS</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Maintenance et vérifications réglementaires des engins de levage du CLIENT.</p><h2>Article 2 — Engins couverts</h2><p>{{engins}}</p><h2>Article 3 — Vérification réglementaire</h2><p>Les vérifications périodiques seront réalisées avec l'organisme : {{verif_reglementaire}}.</p><h2>Article 4 — Prise d'effet</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_traitement_surface', name: "Accord de service de traitement de surface (peinture anticorrosion)", category: 'btp_construction', price: 6000, priceMax: 18000,
    description: "Contrat de prestation de traitement de surface et application de systèmes anticorrosion sur structures métalliques industrielles.", templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'structures',label:"Structures à traiter",type:'textarea',required:true},
      {key:'systeme_peinture',label:"Système de peinture anticorrosion prévu",type:'text',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEMENT DE SURFACE ET PEINTURE ANTICORROSION</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Application de systèmes anticorrosion sur les structures métalliques du CLIENT.</p><h2>Article 2 — Structures</h2><p>{{structures}}</p><h2>Article 3 — Système de protection</h2><p>{{systeme_peinture}}</p><h2>Article 4 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_cvc', name: "Accord de service de génie climatique et froid industriel (CVC)", category: 'btp_construction', price: 8500, priceMax: 26000,
    description: "Contrat de maintenance des installations de climatisation, ventilation et froid industriel (CVC) en milieu professionnel.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'installations_cvc',label:"Description des installations CVC",type:'textarea',required:true},
      {key:'periodicite',label:"Périodicité de maintenance",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GÉNIE CLIMATIQUE ET FROID INDUSTRIEL (CVC)</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Maintenance préventive et corrective des installations de climatisation, ventilation et froid industriel.</p><h2>Article 2 — Installations</h2><p>{{installations_cvc}}</p><h2>Article 3 — Périodicité</h2><p>{{periodicite}}, à compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_traitement_eau', name: "Accord de service de traitement d'eau industrielle (station)", category: 'btp_construction', price: 10000, priceMax: 32000,
    description: "Contrat de gestion et de maintenance des stations de traitement d'eau industrielle (déminéralisation, osmose, clarification).", templateType: 'pdf', classe: 'A', active: true, popularity: 53,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'station',label:"Description de la station de traitement",type:'textarea',required:true},
      {key:'debit_nominal',label:"Débit nominal de traitement (m3/h)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEMENT D'EAU INDUSTRIELLE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Exploitation et maintenance de la station de traitement d'eau industrielle du CLIENT.</p><h2>Article 2 — Description station</h2><p>{{station}}</p><h2>Article 3 — Paramètres</h2><p>Débit nominal : {{debit_nominal}} m3/h.</p><h2>Article 4 — Prise d'effet</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_groupes_elec', name: "Accord de service de générateurs d'urgence (groupes électrogènes)", category: 'btp_construction', price: 7000, priceMax: 22000,
    description: "Contrat de maintenance des groupes électrogènes industriels et groupes de secours pour continuité de service.", templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'groupes',label:"Liste des groupes électrogènes (puissance, marque)",type:'textarea',required:true},
      {key:'test_freq',label:"Fréquence des tests de démarrage",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GÉNÉRATEURS D'URGENCE (GROUPES ÉLECTROGÈNES)</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Maintenance des groupes électrogènes de secours afin d'assurer la continuité de l'alimentation électrique du CLIENT.</p><h2>Article 2 — Équipements</h2><p>{{groupes}}</p><h2>Article 3 — Tests</h2><p>Tests de démarrage à vide et en charge effectués selon la fréquence : {{test_freq}}.</p><h2>Article 4 — Prise d'effet</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_transformateurs', name: "Accord de service de transformation électrique (transformateurs)", category: 'btp_construction', price: 9000, priceMax: 28000,
    description: "Contrat de maintenance des transformateurs de puissance, de distribution et des postes de transformation industriels.", templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'transformateurs',label:"Liste des transformateurs (puissance, ratio, marque)",type:'textarea',required:true},
      {key:'analyse_huile',label:"Fréquence d'analyse d'huile diélectrique",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSFORMATION ÉLECTRIQUE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Maintenance des transformateurs de puissance et postes de transformation du CLIENT.</p><h2>Article 2 — Équipements</h2><p>{{transformateurs}}</p><h2>Article 3 — Analyses</h2><p>Analyse de l'huile diélectrique : {{analyse_huile}}.</p><h2>Article 4 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_metrologie', name: "Accord de service de métrologie et calibration", category: 'btp_construction', price: 7000, priceMax: 20000,
    description: "Contrat de calibration et de raccordement métrologique des instruments de mesure industriels aux étalons nationaux.", templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'instruments',label:"Liste des instruments à calibrer",type:'textarea',required:true},
      {key:'laboratoire',label:"Laboratoire de métrologie accrédité",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MÉTROLOGIE ET CALIBRATION</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Calibration et raccordement métrologique des instruments de mesure du CLIENT.</p><h2>Article 2 — Instruments</h2><p>{{instruments}}</p><h2>Article 3 — Laboratoire</h2><p>Prestations réalisées par : {{laboratoire}}.</p><h2>Article 4 — Prise d'effet</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'gin_audit_usine', name: "Accord de service d'audit technique d'usine", category: 'btp_construction', price: 12000, priceMax: 40000,
    description: "Contrat de réalisation d'un audit technique complet d'une installation industrielle incluant équipements, process et organisation maintenance.", templateType: 'pdf', classe: 'A', active: true, popularity: 56,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse de l'usine",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de l'audit",type:'textarea',required:true},
      {key:'livrables',label:"Livrables attendus (rapport, plan d'action...)",type:'textarea',required:true},
      {key:'date_audit',label:"Date de réalisation de l'audit",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT TECHNIQUE D'USINE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Réalisation d'un audit technique complet de l'installation industrielle du CLIENT.</p><h2>Article 2 — Périmètre</h2><p>{{perimetre}}</p><h2>Article 3 — Livrables</h2><p>{{livrables}}</p><h2>Article 4 — Date de réalisation</h2><p>L'audit est prévu le {{date_audit}}.</p></div>`
  },
  {
    code: 'gin_rapport_perf', name: "Rapport de performance maintenance industrielle", category: 'btp_construction', price: 4000, priceMax: 12000,
    description: "Modèle de rapport périodique de performance de la maintenance industrielle incluant indicateurs KPI (TRS, MTBF, MTTR).", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'periode',label:"Période couverte par le rapport",type:'text',required:true},
      {key:'trs',label:"Taux de Rendement Synthétique (TRS %)",type:'text',required:true},
      {key:'mtbf',label:"MTBF moyen (heures)",type:'text',required:true},
      {key:'mttr',label:"MTTR moyen (heures)",type:'text',required:true},
      {key:'date_rapport',label:"Date d'émission du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE MAINTENANCE INDUSTRIELLE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Période :</strong> {{periode}}</p><h2>1. Indicateurs clés de performance</h2><table><tr><th>Indicateur</th><th>Valeur</th></tr><tr><td>TRS</td><td>{{trs}} %</td></tr><tr><td>MTBF</td><td>{{mtbf}} h</td></tr><tr><td>MTTR</td><td>{{mttr}} h</td></tr></table><h2>2. Commentaires</h2><p>Ce rapport a été établi le {{date_rapport}} et reflète les performances de la période indiquée.</p></div>`
  },
  {
    code: 'gin_plan_pluriannuel', name: "Plan de maintenance pluriannuel", category: 'btp_construction', price: 6000, priceMax: 18000,
    description: "Modèle de plan de maintenance pluriannuel définissant les grandes révisions, investissements et objectifs sur 3 à 5 ans.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'horizon',label:"Horizon du plan (ex. 2025-2028)",type:'text',required:true},
      {key:'objectifs',label:"Objectifs de maintenance pluriannuels",type:'textarea',required:true},
      {key:'budget_annuel',label:"Budget annuel estimé (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE MAINTENANCE PLURIANNUEL</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Horizon</h2><p>Ce plan couvre la période {{horizon}}.</p><h2>Article 2 — Objectifs</h2><p>{{objectifs}}</p><h2>Article 3 — Budget</h2><p>Budget annuel estimé : {{budget_annuel}} FCFA.</p><h2>Article 4 — Révision</h2><p>Le plan est révisé annuellement lors de la revue de direction maintenance.</p></div>`
  },
  {
    code: 'gin_formation_maint', name: "Accord de service de formation maintenance industrielle (CFAO)", category: 'btp_construction', price: 8000, priceMax: 25000,
    description: "Contrat de formation des équipes de maintenance aux techniques industrielles modernes incluant CFAO et outils numériques.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'modules',label:"Modules de formation (liste)",type:'textarea',required:true},
      {key:'duree_formation',label:"Durée totale de la formation (jours)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION MAINTENANCE INDUSTRIELLE</h1><p><strong>Client :</strong> {{client_nom}}</p><h2>Article 1 — Objet</h2><p>Formation de {{stagiaires}} stagiaires aux techniques de maintenance industrielle modernes.</p><h2>Article 2 — Modules</h2><p>{{modules}}</p><h2>Article 3 — Durée</h2><p>{{duree_formation}} jours, démarrant le {{date_debut}}.</p><h2>Article 4 — Attestation</h2><p>Une attestation de formation sera remise à chaque participant à l'issue du programme.</p></div>`
  },
  {
    code: 'gin_charte_durable', name: "Charte de la maintenance industrielle durable", category: 'btp_construction', price: 3000, priceMax: 9000,
    description: "Document de référence formalisant les engagements d'une entreprise en matière de maintenance industrielle responsable et durable.", templateType: 'pdf', classe: 'B', active: true, popularity: 45,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise signataire",type:'text',required:true},
      {key:'dirigeant',label:"Nom et titre du dirigeant signataire",type:'text',required:true},
      {key:'engagements',label:"Engagements spécifiques de l'entreprise",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA MAINTENANCE INDUSTRIELLE DURABLE</h1><p><strong>Entreprise :</strong> {{entreprise_nom}}</p><h2>Préambule</h2><p>La société {{entreprise_nom}}, représentée par {{dirigeant}}, s'engage à intégrer les principes du développement durable dans ses pratiques de maintenance industrielle.</p><h2>Nos engagements</h2><p>{{engagements}}</p><h2>Signature</h2><p>Fait à Abidjan, le {{date_signature}}.</p><p>{{dirigeant}}</p></div>`
  },

  // ─── ÉLECTRICITÉ INDUSTRIELLE (elec_) ────────────────────────────────────
  {
    code: 'elec_hta', name: "Accord de service d'installation électrique haute tension (HTA)", category: 'btp_construction', price: 15000, priceMax: 50000,
    description: "Contrat de réalisation et de maintenance d'installations électriques haute tension (HTA) selon les normes CI et OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'tension_nominale',label:"Tension nominale HTA (kV)",type:'text',required:true},
      {key:'travaux',label:"Description des travaux HTA",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INSTALLATION ÉLECTRIQUE HAUTE TENSION (HTA)</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Réalisation d'installations électriques haute tension à {{tension_nominale}} kV.</p><h2>Article 2 — Travaux</h2><p>{{travaux}}</p><h2>Article 3 — Normes</h2><p>Les travaux sont réalisés conformément aux normes électriques en vigueur en Côte d'Ivoire et aux prescriptions CIE/ANARE.</p><h2>Article 4 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_bt', name: "Accord de service d'installation électrique basse tension (BT)", category: 'btp_construction', price: 6000, priceMax: 18000,
    description: "Contrat de réalisation d'installations électriques basse tension pour locaux industriels, commerciaux et tertiaires en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse des travaux",type:'text',required:true},
      {key:'puissance',label:"Puissance souscrite (kVA)",type:'text',required:true},
      {key:'travaux',label:"Description des travaux BT",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INSTALLATION ÉLECTRIQUE BASSE TENSION (BT)</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Réalisation des installations électriques BT pour une puissance souscrite de {{puissance}} kVA.</p><h2>Article 2 — Travaux</h2><p>{{travaux}}</p><h2>Article 3 — Conformité</h2><p>Les installations seront conformes à la norme NFC 15-100 et aux exigences CONSUEL CI.</p><h2>Article 4 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_poste_transfo', name: "Accord de service de poste de transformation privé", category: 'btp_construction', price: 12000, priceMax: 40000,
    description: "Contrat de construction, mise en service et maintenance d'un poste de transformation privé HTA/BT.", templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du poste",type:'text',required:true},
      {key:'puissance_transfo',label:"Puissance du transformateur (kVA)",type:'text',required:true},
      {key:'ratio',label:"Ratio de transformation (ex. 15kV/400V)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE POSTE DE TRANSFORMATION PRIVÉ</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Construction et maintenance d'un poste de transformation HTA/BT de {{puissance_transfo}} kVA, ratio {{ratio}}.</p><h2>Article 2 — Normes</h2><p>Le poste sera construit selon les normes CIE et les prescriptions de l'ANARE-CI.</p><h2>Article 3 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_cable_souterrain', name: "Accord de service de câblage réseau électrique souterrain", category: 'btp_construction', price: 10000, priceMax: 35000,
    description: "Contrat de pose de câbles électriques souterrains pour distribution HTA et BT en milieu urbain et industriel.", templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse / tracé du câblage",type:'text',required:true},
      {key:'longueur',label:"Longueur totale de câble (mètres)",type:'text',required:true},
      {key:'section',label:"Section des câbles (mm²)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CÂBLAGE RÉSEAU ÉLECTRIQUE SOUTERRAIN</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Tracé :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Pose de {{longueur}} mètres de câbles électriques souterrains de section {{section}} mm².</p><h2>Article 2 — Normes</h2><p>Les travaux respectent les exigences de la CIE et les normes NFC 11-201 / NFC 13-200.</p><h2>Article 3 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_eclairage_public', name: "Accord de service d'éclairage public (LED)", category: 'btp_construction', price: 7000, priceMax: 22000,
    description: "Contrat de fourniture, pose et maintenance d'installations d'éclairage public à technologie LED pour communes et entreprises.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Nom de la commune / client",type:'text',required:true},
      {key:'localite',label:"Localité concernée",type:'text',required:true},
      {key:'nb_points',label:"Nombre de points lumineux",type:'text',required:true},
      {key:'puissance_led',label:"Puissance unitaire des luminaires LED (W)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉCLAIRAGE PUBLIC (LED)</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Localité :</strong> {{localite}}</p><h2>Article 1 — Objet</h2><p>Fourniture, pose et maintenance de {{nb_points}} points d'éclairage public à LED de {{puissance_led}} W unitaire.</p><h2>Article 2 — Garantie</h2><p>Les équipements bénéficient d'une garantie de 3 ans minimum conformément aux normes en vigueur.</p><h2>Article 3 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_domotique', name: "Accord de service de domotique et électricité tertiaire", category: 'btp_construction', price: 8000, priceMax: 25000,
    description: "Contrat d'installation et de maintenance des systèmes domotiques, GTB et courants faibles pour bâtiments tertiaires.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du bâtiment",type:'text',required:true},
      {key:'systemes',label:"Systèmes domotiques / GTB à installer",type:'textarea',required:true},
      {key:'superficie',label:"Superficie du bâtiment (m²)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DOMOTIQUE ET ÉLECTRICITÉ TERTIAIRE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Installation et maintenance des systèmes domotiques et de GTB pour un bâtiment de {{superficie}} m².</p><h2>Article 2 — Systèmes</h2><p>{{systemes}}</p><h2>Article 3 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_automatisme', name: "Accord de service d'automatisme industriel (API/SCADA)", category: 'btp_construction', price: 14000, priceMax: 45000,
    description: "Contrat de conception, installation et maintenance des systèmes d'automatisme industriel à base d'automates programmables (API) et de supervision SCADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'systeme_api',label:"Marque et modèle des automates (API)",type:'text',required:true},
      {key:'logiciel_scada',label:"Logiciel SCADA utilisé",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUTOMATISME INDUSTRIEL (API/SCADA)</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Conception, installation et maintenance du système d'automatisme industriel.</p><h2>Article 2 — Équipements</h2><p>Automates : {{systeme_api}} — Supervision : {{logiciel_scada}}.</p><h2>Article 3 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_variateur', name: "Accord de service de variateur de vitesse et motorisation", category: 'btp_construction', price: 7500, priceMax: 22000,
    description: "Contrat de fourniture, installation et maintenance des variateurs de vitesse électroniques et des motorisations industrielles.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'variateurs',label:"Liste des variateurs et moteurs concernés",type:'textarea',required:true},
      {key:'puissance_totale',label:"Puissance totale installée (kW)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VARIATEUR DE VITESSE ET MOTORISATION</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Fourniture et maintenance des variateurs de vitesse pour une puissance totale de {{puissance_totale}} kW.</p><h2>Article 2 — Équipements</h2><p>{{variateurs}}</p><h2>Article 3 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_armoire', name: "Accord de service de coffret et armoire électrique", category: 'btp_construction', price: 6000, priceMax: 18000,
    description: "Contrat de fabrication, installation et maintenance des coffrets et armoires électriques basse tension pour usage industriel et tertiaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'armoires',label:"Description des armoires / coffrets",type:'textarea',required:true},
      {key:'norme',label:"Norme applicable (ex. CEI 61439)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COFFRET ET ARMOIRE ÉLECTRIQUE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Fabrication, installation et maintenance des armoires et coffrets électriques.</p><h2>Article 2 — Équipements</h2><p>{{armoires}}</p><h2>Article 3 — Norme</h2><p>Conformes à la norme {{norme}}.</p><h2>Article 4 — Livraison</h2><p>Livraison prévue le {{date_livraison}}.</p></div>`
  },
  {
    code: 'elec_mise_terre', name: "Accord de service de mise à la terre et protection foudre", category: 'btp_construction', price: 5500, priceMax: 16000,
    description: "Contrat de réalisation des prises de terre, liaisons équipotentielles et systèmes de protection contre la foudre (parafoudres, paratonnerres).", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'resistance_cible',label:"Résistance de terre cible (ohms)",type:'text',required:true},
      {key:'systeme_foudre',label:"Type de système parafoudre / paratonnerre",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MISE À LA TERRE ET PROTECTION FOUDRE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Réalisation des systèmes de mise à la terre et de protection foudre.</p><h2>Article 2 — Spécifications</h2><p>Résistance cible : {{resistance_cible}} Ω — Système : {{systeme_foudre}}.</p><h2>Article 3 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_consuel', name: "Accord de service de vérification réglementaire électricité (CONSUEL CI)", category: 'btp_construction', price: 4000, priceMax: 12000,
    description: "Contrat d'accompagnement à la vérification réglementaire des installations électriques en vue de l'obtention de l'attestation CONSUEL Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse de l'installation",type:'text',required:true},
      {key:'type_local',label:"Type de local (habitation, industrie, ERP...)",type:'text',required:true},
      {key:'puissance',label:"Puissance de raccordement (kVA)",type:'text',required:true},
      {key:'date_visite',label:"Date de visite CONSUEL prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VÉRIFICATION RÉGLEMENTAIRE ÉLECTRICITÉ (CONSUEL CI)</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Accompagnement du CLIENT en vue de la vérification de conformité électrique par le CONSUEL CI.</p><h2>Article 2 — Informations</h2><p>Type de local : {{type_local}} — Puissance : {{puissance}} kVA.</p><h2>Article 3 — Visite</h2><p>Date de visite prévue : {{date_visite}}.</p></div>`
  },
  {
    code: 'elec_photovoltaique', name: "Accord de service d'installation photovoltaïque (panneaux solaires)", category: 'btp_construction', price: 10000, priceMax: 35000,
    description: "Contrat de fourniture, installation et maintenance de systèmes photovoltaïques (solaires) raccordés ou autonomes en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'puissance_crete',label:"Puissance crête de l'installation (kWc)",type:'text',required:true},
      {key:'type_systeme',label:"Type de système (raccordé réseau / autonome / hybride)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INSTALLATION PHOTOVOLTAÏQUE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Installation d'un système photovoltaïque de {{puissance_crete}} kWc — type : {{type_systeme}}.</p><h2>Article 2 — Garanties</h2><p>Les panneaux bénéficient d'une garantie produit de 10 ans et d'une garantie de performance de 25 ans.</p><h2>Article 3 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_raccordement_cie', name: "Accord de service de raccordement réseau CIE/ANARE", category: 'btp_construction', price: 5000, priceMax: 15000,
    description: "Contrat d'assistance pour le raccordement au réseau électrique de la CIE et la constitution du dossier ANARE-CI.", templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site à raccorder",type:'text',required:true},
      {key:'puissance',label:"Puissance de raccordement demandée (kVA)",type:'text',required:true},
      {key:'type_raccordement',label:"Type de raccordement (BT / HTA)",type:'text',required:true},
      {key:'date_dossier',label:"Date de dépôt du dossier",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RACCORDEMENT RÉSEAU CIE/ANARE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Assistance au raccordement {{type_raccordement}} de {{puissance}} kVA au réseau de la CIE.</p><h2>Article 2 — Démarches</h2><p>Constitution et dépôt du dossier technique auprès de l'ANARE-CI, prévu le {{date_dossier}}.</p><h2>Article 3 — Obligations</h2><p>Le PRESTATAIRE assure le suivi administratif et technique jusqu'à la mise sous tension effective.</p></div>`
  },
  {
    code: 'elec_groupe_permanent', name: "Accord de service de groupe électrogène permanent", category: 'btp_construction', price: 9000, priceMax: 28000,
    description: "Contrat de fourniture, installation et maintenance d'un groupe électrogène en fonctionnement permanent (cogénération ou alimentation principale).", templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'puissance',label:"Puissance nominale (kVA)",type:'text',required:true},
      {key:'carburant',label:"Type de carburant (diesel, gaz...)",type:'text',required:true},
      {key:'date_debut',label:"Date d'installation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GROUPE ÉLECTROGÈNE PERMANENT</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Fourniture et maintenance d'un groupe électrogène permanent de {{puissance}} kVA fonctionnant au {{carburant}}.</p><h2>Article 2 — Maintenance</h2><p>Entretien préventif selon le carnet constructeur, avec fourniture des pièces de rechange d'origine.</p><h2>Article 3 — Installation</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_ups', name: "Accord de service d'onduleur et alimentation sans interruption (ASI/UPS)", category: 'btp_construction', price: 6500, priceMax: 20000,
    description: "Contrat de fourniture, installation et maintenance d'onduleurs et systèmes d'alimentation sans interruption (ASI/UPS) pour locaux sensibles.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'puissance_ups',label:"Puissance de l'UPS (kVA)",type:'text',required:true},
      {key:'autonomie',label:"Autonomie requise (minutes)",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ONDULEUR ET ALIMENTATION SANS INTERRUPTION (ASI/UPS)</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Installation et maintenance d'un UPS de {{puissance_ups}} kVA avec une autonomie de {{autonomie}} minutes.</p><h2>Article 2 — Batteries</h2><p>Les batteries seront remplacées selon les préconisations du fabricant ou avant toute défaillance détectée lors des tests périodiques.</p><h2>Article 3 — Installation</h2><p>Le {{date_installation}}.</p></div>`
  },
  {
    code: 'elec_borne_ve', name: "Accord de service de borne de recharge véhicule électrique", category: 'btp_construction', price: 5000, priceMax: 15000,
    description: "Contrat de fourniture, installation et maintenance de bornes de recharge pour véhicules électriques (IRVE) en entreprise ou résidence.", templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse d'installation",type:'text',required:true},
      {key:'nb_bornes',label:"Nombre de bornes",type:'text',required:true},
      {key:'puissance_borne',label:"Puissance unitaire des bornes (kW)",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BORNES DE RECHARGE VÉHICULE ÉLECTRIQUE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Installation de {{nb_bornes}} bornes de recharge de {{puissance_borne}} kW unitaire.</p><h2>Article 2 — Normes</h2><p>Les équipements sont conformes aux normes IEC 61851 et aux exigences locales ANARE-CI.</p><h2>Article 3 — Installation</h2><p>Le {{date_installation}}.</p></div>`
  },
  {
    code: 'elec_supervision_scada', name: "Accord de service de supervision SCADA électrique", category: 'btp_construction', price: 13000, priceMax: 42000,
    description: "Contrat de déploiement et de maintenance d'un système de supervision SCADA dédié à la gestion de réseaux électriques industriels.", templateType: 'pdf', classe: 'A', active: true, popularity: 56,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du centre de supervision",type:'text',required:true},
      {key:'logiciel_scada',label:"Logiciel SCADA (marque / version)",type:'text',required:true},
      {key:'nb_points',label:"Nombre de points supervisés",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUPERVISION SCADA ÉLECTRIQUE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Centre :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Déploiement du système SCADA {{logiciel_scada}} pour la supervision de {{nb_points}} points électriques.</p><h2>Article 2 — Maintenance</h2><p>Le PRESTATAIRE assure la maintenance applicative et matérielle du système.</p><h2>Article 3 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_audit_energetique', name: "Accord de service d'audit énergétique électrique", category: 'btp_construction', price: 10000, priceMax: 32000,
    description: "Contrat de réalisation d'un audit énergétique électrique permettant d'identifier les gisements d'économies d'énergie en entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site audité",type:'text',required:true},
      {key:'conso_annuelle',label:"Consommation annuelle déclarée (kWh)",type:'text',required:true},
      {key:'livrables',label:"Livrables attendus",type:'textarea',required:true},
      {key:'date_audit',label:"Date de réalisation de l'audit",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT ÉNERGÉTIQUE ÉLECTRIQUE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Réalisation d'un audit énergétique électrique — consommation déclarée : {{conso_annuelle}} kWh/an.</p><h2>Article 2 — Livrables</h2><p>{{livrables}}</p><h2>Article 3 — Date d'audit</h2><p>Le {{date_audit}}.</p></div>`
  },
  {
    code: 'elec_compensation', name: "Accord de service de compensation d'énergie réactive", category: 'btp_construction', price: 7000, priceMax: 22000,
    description: "Contrat de fourniture et de maintenance d'équipements de compensation d'énergie réactive (batteries de condensateurs) pour améliorer le facteur de puissance.", templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'cos_phi_actuel',label:"Facteur de puissance actuel (cos φ)",type:'text',required:true},
      {key:'cos_phi_cible',label:"Facteur de puissance cible (cos φ)",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPENSATION D'ÉNERGIE RÉACTIVE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Installation d'un système de compensation d'énergie réactive pour améliorer le facteur de puissance de {{cos_phi_actuel}} à {{cos_phi_cible}}.</p><h2>Article 2 — Bénéfices</h2><p>Réduction des pénalités CIE sur l'énergie réactive et optimisation des coûts d'exploitation.</p><h2>Article 3 — Installation</h2><p>Le {{date_installation}}.</p></div>`
  },
  {
    code: 'elec_qualite_energie', name: "Accord de service de qualité de l'énergie (harmoniques)", category: 'btp_construction', price: 8000, priceMax: 25000,
    description: "Contrat d'analyse et de traitement des problèmes de qualité de l'énergie électrique (harmoniques, creux de tension, déséquilibres) en milieu industriel.", templateType: 'pdf', classe: 'A', active: true, popularity: 54,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'perturbations',label:"Types de perturbations identifiées",type:'textarea',required:true},
      {key:'equipements_sensibles',label:"Équipements sensibles affectés",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE QUALITÉ DE L'ÉNERGIE (HARMONIQUES)</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Objet</h2><p>Analyse et traitement des perturbations électriques affectant les installations du CLIENT.</p><h2>Article 2 — Perturbations identifiées</h2><p>{{perturbations}}</p><h2>Article 3 — Équipements sensibles</h2><p>{{equipements_sensibles}}</p><h2>Article 4 — Démarrage</h2><p>Mission débutant le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_rapport_audit', name: "Rapport d'audit installation électrique", category: 'btp_construction', price: 4000, priceMax: 12000,
    description: "Modèle de rapport d'audit complet d'une installation électrique incluant constats, non-conformités et recommandations de mise en conformité.", templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site audité",type:'text',required:true},
      {key:'auditeur',label:"Nom de l'auditeur / bureau d'études",type:'text',required:true},
      {key:'constats',label:"Principaux constats de l'audit",type:'textarea',required:true},
      {key:'date_audit',label:"Date de réalisation de l'audit",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT INSTALLATION ÉLECTRIQUE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><p><strong>Auditeur :</strong> {{auditeur}} — <strong>Date :</strong> {{date_audit}}</p><h2>1. Constats</h2><p>{{constats}}</p><h2>2. Non-conformités relevées</h2><p>Les non-conformités relevées feront l'objet d'un plan de mise en conformité prioritaire.</p><h2>3. Recommandations</h2><p>Ce rapport est remis au CLIENT sous 15 jours suivant la visite d'audit.</p></div>`
  },
  {
    code: 'elec_plan_conformite', name: "Plan de mise en conformité électrique", category: 'btp_construction', price: 5000, priceMax: 15000,
    description: "Document de planification de la mise en conformité réglementaire d'une installation électrique suite à un audit ou une inspection CONSUEL CI.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'site_adresse',label:"Adresse du site",type:'text',required:true},
      {key:'actions',label:"Actions de mise en conformité planifiées",type:'textarea',required:true},
      {key:'budget_total',label:"Budget total estimé (FCFA)",type:'text',required:true},
      {key:'date_fin',label:"Date de fin de mise en conformité prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE MISE EN CONFORMITÉ ÉLECTRIQUE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Site :</strong> {{site_adresse}}</p><h2>Article 1 — Contexte</h2><p>Suite à l'audit électrique réalisé sur le site, le présent plan définit les actions correctives nécessaires.</p><h2>Article 2 — Actions planifiées</h2><p>{{actions}}</p><h2>Article 3 — Budget</h2><p>Estimation totale : {{budget_total}} FCFA.</p><h2>Article 4 — Délai</h2><p>Mise en conformité complète avant le {{date_fin}}.</p></div>`
  },
  {
    code: 'elec_ingenierie', name: "Accord de service d'ingénierie électricité industrielle", category: 'btp_construction', price: 14000, priceMax: 45000,
    description: "Contrat de prestations d'ingénierie en électricité industrielle incluant études, calculs, dimensionnement et assistance à maîtrise d'ouvrage.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'projet',label:"Intitulé du projet",type:'text',required:true},
      {key:'prestations',label:"Prestations d'ingénierie commandées",type:'textarea',required:true},
      {key:'livrables',label:"Livrables attendus (plans, notes de calcul...)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INGÉNIERIE ÉLECTRICITÉ INDUSTRIELLE</h1><p><strong>Client :</strong> {{client_nom}} — <strong>Projet :</strong> {{projet}}</p><h2>Article 1 — Objet</h2><p>Prestations d'ingénierie en électricité industrielle dans le cadre du projet {{projet}}.</p><h2>Article 2 — Prestations</h2><p>{{prestations}}</p><h2>Article 3 — Livrables</h2><p>{{livrables}}</p><h2>Article 4 — Démarrage</h2><p>Le {{date_debut}}.</p></div>`
  },
  {
    code: 'elec_partenariat_cie', name: "Accord de partenariat CIE-installateur électricien", category: 'btp_construction', price: 6000, priceMax: 18000,
    description: "Convention de partenariat entre un installateur électricien agréé et la Compagnie Ivoirienne d'Électricité (CIE) pour la réalisation de travaux de raccordement.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'installateur_nom',label:"Raison sociale de l'installateur",type:'text',required:true},
      {key:'numero_agrement',label:"Numéro d'agrément ANARE-CI",type:'text',required:true},
      {key:'perimetre',label:"Périmètre géographique d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de prise d'effet du partenariat",type:'date',required:true},
      {key:'date_fin',label:"Date d'expiration du partenariat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CIE — INSTALLATEUR ÉLECTRICIEN</h1><p><strong>Installateur :</strong> {{installateur_nom}} — <strong>Agrément :</strong> {{numero_agrement}}</p><h2>Article 1 — Objet</h2><p>La présente convention organise le partenariat entre la CIE et l'installateur agréé pour la réalisation de travaux de raccordement dans le périmètre : {{perimetre}}.</p><h2>Article 2 — Durée</h2><p>Du {{date_debut}} au {{date_fin}}, renouvelable.</p><h2>Article 3 — Obligations</h2><p>L'installateur s'engage à respecter les cahiers des charges techniques et les procédures qualité de la CIE.</p></div>`
  },
  {
    code: 'elec_charte_installateur', name: "Charte de l'installateur électricien certifié", category: 'btp_construction', price: 3000, priceMax: 9000,
    description: "Document formalisant les engagements déontologiques et techniques d'un installateur électricien certifié en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 47,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise signataire",type:'text',required:true},
      {key:'dirigeant',label:"Nom et titre du dirigeant",type:'text',required:true},
      {key:'numero_agrement',label:"Numéro d'agrément / certification",type:'text',required:true},
      {key:'engagements',label:"Engagements spécifiques de l'entreprise",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'INSTALLATEUR ÉLECTRICIEN CERTIFIÉ</h1><p><strong>Entreprise :</strong> {{entreprise_nom}} — <strong>Agrément :</strong> {{numero_agrement}}</p><h2>Préambule</h2><p>La société {{entreprise_nom}}, représentée par {{dirigeant}}, s'engage à respecter les règles déontologiques et techniques de la profession d'installateur électricien en Côte d'Ivoire.</p><h2>Nos engagements</h2><p>{{engagements}}</p><h2>Signature</h2><p>Fait à Abidjan, le {{date_signature}} — {{dirigeant}}</p></div>`
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
  console.log(`Batch 77b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
