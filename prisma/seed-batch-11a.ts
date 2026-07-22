import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── SANTÉ AVANCÉE (san2_) ──────────────────────────────────────────────────
  { code: 'san2_dossier_medical', name: "Dossier médical patient complet", category: 'sante', price: 8000, priceMax: 24000,
    description: "Dossier médical complet regroupant les antécédents, traitements et suivis du patient.", templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'numero_dossier',label:"Numéro de dossier",type:'text',required:true},
      {key:'medecin_traitant',label:"Médecin traitant",type:'text',required:true},
      {key:'antecedents',label:"Antécédents médicaux",type:'textarea',required:true},
      {key:'date_ouverture',label:"Date d'ouverture du dossier",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>DOSSIER MÉDICAL PATIENT</h1><table><tr><td><strong>Patient :</strong> {{nom_patient}}</td><td><strong>Né(e) le :</strong> {{date_naissance}}</td></tr><tr><td><strong>N° Dossier :</strong> {{numero_dossier}}</td><td><strong>Médecin :</strong> {{medecin_traitant}}</td></tr></table><h2>Antécédents médicaux</h2><p>{{antecedents}}</p><p><em>Dossier ouvert le : {{date_ouverture}}</em></p></div>' },

  { code: 'san2_consentement_chirurgie', name: "Consentement éclairé chirurgie", category: 'sante', price: 5000, priceMax: 15000,
    description: "Formulaire de consentement éclairé signé par le patient avant toute intervention chirurgicale.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'type_intervention',label:"Type d'intervention chirurgicale",type:'text',required:true},
      {key:'chirurgien',label:"Nom du chirurgien",type:'text',required:true},
      {key:'date_intervention',label:"Date prévue de l'intervention",type:'date',required:true},
      {key:'risques_expliques',label:"Risques et alternatives expliqués",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ - CHIRURGIE</h1><p>Je soussigné(e), <strong>{{nom_patient}}</strong>, consens librement à l\'intervention chirurgicale suivante :</p><h2>{{type_intervention}}</h2><p>Réalisée par le Dr <strong>{{chirurgien}}</strong> le <strong>{{date_intervention}}</strong>.</p><h2>Informations communiquées</h2><p>{{risques_expliques}}</p><p>Je certifie avoir reçu toutes les informations nécessaires et consens à cette intervention.</p><p><strong>Signature du patient :</strong> _____________________ <strong>Date :</strong> _____________________</p></div>' },

  { code: 'san2_protocole_soins_infirmiers', name: "Protocole de soins infirmiers", category: 'sante', price: 4000, priceMax: 12000,
    description: "Protocole détaillant les soins infirmiers à dispenser à un patient hospitalisé.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'unite_soins',label:"Unité de soins",type:'text',required:true},
      {key:'infirmier_referent',label:"Infirmier(ère) référent(e)",type:'text',required:true},
      {key:'soins_prescrits',label:"Soins prescrits",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début des soins",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>PROTOCOLE DE SOINS INFIRMIERS</h1><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Unité :</strong> {{unite_soins}}</p><p><strong>Infirmier(ère) référent(e) :</strong> {{infirmier_referent}}</p><h2>Soins prescrits</h2><p>{{soins_prescrits}}</p><p><strong>Prise en charge à compter du :</strong> {{date_debut}}</p><p><em>Ce protocole doit être respecté scrupuleusement par toute l\'équipe soignante.</em></p></div>' },

  { code: 'san2_rapport_consultation_spe', name: "Rapport de consultation spécialisée", category: 'sante', price: 6000, priceMax: 18000,
    description: "Rapport établi par un spécialiste à l'issue d'une consultation médicale spécialisée.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'specialite',label:"Spécialité médicale",type:'text',required:true},
      {key:'medecin_specialiste',label:"Nom du médecin spécialiste",type:'text',required:true},
      {key:'date_consultation',label:"Date de la consultation",type:'date',required:true},
      {key:'conclusions',label:"Conclusions et recommandations",type:'textarea',required:true},
      {key:'traitement_propose',label:"Traitement proposé",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT DE CONSULTATION SPÉCIALISÉE</h1><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Spécialité :</strong> {{specialite}}</p><p><strong>Praticien :</strong> Dr {{medecin_specialiste}}</p><p><strong>Date :</strong> {{date_consultation}}</p><h2>Conclusions</h2><p>{{conclusions}}</p><h2>Traitement proposé</h2><p>{{traitement_propose}}</p><p><strong>Signature du spécialiste :</strong> _____________________</p></div>' },

  { code: 'san2_certificat_medical', name: "Certificat médical détaillé", category: 'sante', price: 3000, priceMax: 9000,
    description: "Certificat médical officiel délivré par un médecin agréé à des fins administratives ou légales.", templateType: 'pdf', classe: 'B', active: true, popularity: 90,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'constatations',label:"Constatations médicales",type:'textarea',required:true},
      {key:'nom_medecin',label:"Nom et qualité du médecin",type:'text',required:true},
      {key:'date_certificat',label:"Date du certificat",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CERTIFICAT MÉDICAL</h1><p>Je soussigné(e), <strong>Dr {{nom_medecin}}</strong>, certifie avoir examiné :</p><p><strong>Nom :</strong> {{nom_patient}} — <strong>Né(e) le :</strong> {{date_naissance}}</p><h2>Constatations</h2><p>{{constatations}}</p><p>Fait pour servir et valoir ce que de droit.</p><p><strong>Fait le :</strong> {{date_certificat}}</p><p><strong>Cachet et signature :</strong> _____________________</p></div>' },

  { code: 'san2_bon_transport_medicalise', name: "Bon de transport médicalisé", category: 'sante', price: 2500, priceMax: 7500,
    description: "Bon autorisant et organisant le transport médicalisé d'un patient entre établissements de santé.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'etablissement_depart',label:"Établissement de départ",type:'text',required:true},
      {key:'etablissement_destination',label:"Établissement de destination",type:'text',required:true},
      {key:'date_transport',label:"Date du transport",type:'date',required:true},
      {key:'motif_transport',label:"Motif du transport",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>BON DE TRANSPORT MÉDICALISÉ</h1><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Départ :</strong> {{etablissement_depart}}</p><p><strong>Destination :</strong> {{etablissement_destination}}</p><p><strong>Date :</strong> {{date_transport}}</p><h2>Motif du transport</h2><p>{{motif_transport}}</p><p><em>Document à remettre à l\'équipe de transport.</em></p><p><strong>Signature du médecin prescripteur :</strong> _____________________</p></div>' },

  { code: 'san2_rapport_autopsie', name: "Rapport d'autopsie", category: 'sante', price: 12000, priceMax: 36000,
    description: "Rapport médico-légal d'autopsie établi par un médecin légiste agréé.", templateType: 'pdf', classe: 'A', active: true, popularity: 40,
    fieldsJson: F([
      {key:'identite_defunt',label:"Identité du défunt",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'medecin_legiste',label:"Médecin légiste",type:'text',required:true},
      {key:'date_autopsie',label:"Date de l'autopsie",type:'date',required:true},
      {key:'conclusions',label:"Conclusions médico-légales",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'AUTOPSIE MÉDICO-LÉGALE</h1><p><strong>Défunt :</strong> {{identite_defunt}}</p><p><strong>Date du décès :</strong> {{date_deces}}</p><p><strong>Médecin légiste :</strong> Dr {{medecin_legiste}}</p><p><strong>Date de l\'autopsie :</strong> {{date_autopsie}}</p><h2>Conclusions</h2><p>{{conclusions}}</p><p><em>Document confidentiel à usage judiciaire et administratif.</em></p><p><strong>Signature et cachet :</strong> _____________________</p></div>' },

  { code: 'san2_protocole_sterilisation', name: "Protocole de stérilisation", category: 'sante', price: 5000, priceMax: 15000,
    description: "Protocole de stérilisation des équipements et instruments médicaux en établissement de santé.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'etablissement',label:"Nom de l'établissement",type:'text',required:true},
      {key:'responsable',label:"Responsable de stérilisation",type:'text',required:true},
      {key:'methode',label:"Méthode de stérilisation utilisée",type:'text',required:true},
      {key:'materiel_concerne',label:"Matériel concerné",type:'textarea',required:true},
      {key:'date_protocole',label:"Date du protocole",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>PROTOCOLE DE STÉRILISATION</h1><p><strong>Établissement :</strong> {{etablissement}}</p><p><strong>Responsable :</strong> {{responsable}}</p><p><strong>Méthode :</strong> {{methode}}</p><h2>Matériel concerné</h2><p>{{materiel_concerne}}</p><p><strong>Date :</strong> {{date_protocole}}</p><p><em>Ce protocole est obligatoire pour tout le personnel soignant concerné.</em></p></div>' },

  { code: 'san2_tracabilite_medicaments', name: "Fiche de traçabilité médicaments", category: 'sante', price: 3500, priceMax: 10500,
    description: "Fiche permettant la traçabilité complète des médicaments administrés à un patient hospitalisé.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'service',label:"Service hospitalier",type:'text',required:true},
      {key:'medicament',label:"Dénomination du médicament",type:'text',required:true},
      {key:'posologie',label:"Posologie et fréquence",type:'textarea',required:true},
      {key:'date_debut_traitement',label:"Date de début du traitement",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>FICHE DE TRAÇABILITÉ DES MÉDICAMENTS</h1><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Service :</strong> {{service}}</p><p><strong>Médicament :</strong> {{medicament}}</p><h2>Posologie</h2><p>{{posologie}}</p><p><strong>Début du traitement :</strong> {{date_debut_traitement}}</p><table border="1"><tr><th>Date</th><th>Heure</th><th>Dose</th><th>Administré par</th><th>Signature</th></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table></div>' },

  { code: 'san2_rapport_bloc_operatoire', name: "Rapport bloc opératoire", category: 'sante', price: 7000, priceMax: 21000,
    description: "Compte rendu opératoire détaillé rédigé par le chirurgien à l'issue d'une intervention.", templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'chirurgien',label:"Chirurgien opérateur",type:'text',required:true},
      {key:'type_operation',label:"Type d'opération",type:'text',required:true},
      {key:'date_intervention',label:"Date de l'intervention",type:'date',required:true},
      {key:'deroulement',label:"Déroulement de l'intervention",type:'textarea',required:true},
      {key:'suites_operatoires',label:"Suites opératoires prévues",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT DE BLOC OPÉRATOIRE</h1><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Chirurgien :</strong> Dr {{chirurgien}}</p><p><strong>Intervention :</strong> {{type_operation}}</p><p><strong>Date :</strong> {{date_intervention}}</p><h2>Déroulement</h2><p>{{deroulement}}</p><h2>Suites opératoires</h2><p>{{suites_operatoires}}</p><p><strong>Signature du chirurgien :</strong> _____________________</p></div>' },

  { code: 'san2_protocole_anesthesie', name: "Protocole anesthésie", category: 'sante', price: 8000, priceMax: 24000,
    description: "Protocole d'anesthésie établi par l'anesthésiste avant une intervention chirurgicale programmée.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'anesthesiste',label:"Anesthésiste responsable",type:'text',required:true},
      {key:'type_anesthesie',label:"Type d'anesthésie",type:'text',required:true},
      {key:'produits_utilises',label:"Produits anesthésiques utilisés",type:'textarea',required:true},
      {key:'date_intervention',label:"Date de l'intervention",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>PROTOCOLE D\'ANESTHÉSIE</h1><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Anesthésiste :</strong> Dr {{anesthesiste}}</p><p><strong>Type d\'anesthésie :</strong> {{type_anesthesie}}</p><p><strong>Date :</strong> {{date_intervention}}</p><h2>Produits anesthésiques</h2><p>{{produits_utilises}}</p><p><em>Ce protocole a été validé par l\'équipe médicale et approuvé par le patient.</em></p><p><strong>Signature :</strong> _____________________</p></div>' },

  { code: 'san2_rapport_laboratoire', name: "Rapport de laboratoire", category: 'sante', price: 4500, priceMax: 13500,
    description: "Rapport d'analyses biologiques et biochimiques réalisées en laboratoire médical agréé.", templateType: 'pdf', classe: 'B', active: true, popularity: 88,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'prescripteur',label:"Médecin prescripteur",type:'text',required:true},
      {key:'date_prelevement',label:"Date du prélèvement",type:'date',required:true},
      {key:'analyses_demandees',label:"Analyses demandées",type:'textarea',required:true},
      {key:'resultats',label:"Résultats des analyses",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT DE LABORATOIRE MÉDICAL</h1><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Prescripteur :</strong> Dr {{prescripteur}}</p><p><strong>Date du prélèvement :</strong> {{date_prelevement}}</p><h2>Analyses demandées</h2><p>{{analyses_demandees}}</p><h2>Résultats</h2><p>{{resultats}}</p><p><em>Rapport émis par le laboratoire. À interpréter par un médecin.</em></p><p><strong>Biologiste responsable :</strong> _____________________</p></div>' },

  { code: 'san2_demande_examen_radio', name: "Demande d'examen radiologique", category: 'sante', price: 2500, priceMax: 7500,
    description: "Formulaire de demande d'examen radiologique prescrit par un médecin à un patient.", templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'medecin_prescripteur',label:"Médecin prescripteur",type:'text',required:true},
      {key:'type_examen',label:"Type d'examen demandé",type:'text',required:true},
      {key:'motif_clinique',label:"Motif clinique",type:'textarea',required:true},
      {key:'date_prescription',label:"Date de prescription",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>DEMANDE D\'EXAMEN RADIOLOGIQUE</h1><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Prescripteur :</strong> Dr {{medecin_prescripteur}}</p><p><strong>Examen demandé :</strong> {{type_examen}}</p><h2>Motif clinique</h2><p>{{motif_clinique}}</p><p><strong>Date de prescription :</strong> {{date_prescription}}</p><p><strong>Signature et cachet du médecin :</strong> _____________________</p></div>' },

  { code: 'san2_cr_hospitalisation', name: "Compte rendu d'hospitalisation", category: 'sante', price: 6000, priceMax: 18000,
    description: "Compte rendu complet d'une hospitalisation, remis au patient et à son médecin traitant.", templateType: 'pdf', classe: 'B', active: true, popularity: 83,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'service',label:"Service d'hospitalisation",type:'text',required:true},
      {key:'date_entree',label:"Date d'entrée",type:'date',required:true},
      {key:'date_sortie',label:"Date de sortie",type:'date',required:true},
      {key:'bilan_sejour',label:"Bilan du séjour et traitement",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations à la sortie",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>COMPTE RENDU D\'HOSPITALISATION</h1><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Service :</strong> {{service}}</p><p><strong>Entrée :</strong> {{date_entree}} — <strong>Sortie :</strong> {{date_sortie}}</p><h2>Bilan du séjour</h2><p>{{bilan_sejour}}</p><h2>Recommandations</h2><p>{{recommandations}}</p><p><strong>Médecin responsable :</strong> _____________________</p></div>' },

  { code: 'san2_protocole_isolement', name: "Protocole isolement patient", category: 'sante', price: 4000, priceMax: 12000,
    description: "Protocole de mise en isolement sanitaire d'un patient présentant un risque infectieux.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'type_isolement',label:"Type d'isolement",type:'text',required:true},
      {key:'motif',label:"Motif de l'isolement",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de l'isolement",type:'date',required:true},
      {key:'mesures',label:"Mesures de protection requises",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>PROTOCOLE D\'ISOLEMENT PATIENT</h1><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Type d\'isolement :</strong> {{type_isolement}}</p><p><strong>Date de mise en isolement :</strong> {{date_debut}}</p><h2>Motif</h2><p>{{motif}}</p><h2>Mesures de protection</h2><p>{{mesures}}</p><p><em>Tout le personnel entrant dans la chambre doit respecter ce protocole.</em></p></div>' },

  { code: 'san2_surveillance_postop', name: "Fiche de surveillance post-opératoire", category: 'sante', price: 4500, priceMax: 13500,
    description: "Fiche de surveillance clinique du patient en salle de réveil après une intervention chirurgicale.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'type_intervention',label:"Intervention réalisée",type:'text',required:true},
      {key:'date_intervention',label:"Date de l'intervention",type:'date',required:true},
      {key:'infirmier_surveillance',label:"Infirmier(ère) de surveillance",type:'text',required:true},
      {key:'observations',label:"Observations post-opératoires",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>FICHE DE SURVEILLANCE POST-OPÉRATOIRE</h1><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Intervention :</strong> {{type_intervention}}</p><p><strong>Date :</strong> {{date_intervention}}</p><p><strong>Surveillé(e) par :</strong> {{infirmier_surveillance}}</p><h2>Observations</h2><p>{{observations}}</p><table border="1"><tr><th>Heure</th><th>TA</th><th>Pouls</th><th>SpO2</th><th>Douleur</th><th>Observations</th></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table></div>' },

  { code: 'san2_rapport_epidemiologique', name: "Rapport épidémiologique", category: 'sante', price: 10000, priceMax: 30000,
    description: "Rapport épidémiologique sur l'évolution d'une maladie ou d'un phénomène de santé publique.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'maladie_concernee',label:"Maladie ou pathologie concernée",type:'text',required:true},
      {key:'zone_geographique',label:"Zone géographique couverte",type:'text',required:true},
      {key:'periode',label:"Période d'observation",type:'text',required:true},
      {key:'donnees_epidemio',label:"Données épidémiologiques",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations de santé publique",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT ÉPIDÉMIOLOGIQUE</h1><p><strong>Maladie :</strong> {{maladie_concernee}}</p><p><strong>Zone :</strong> {{zone_geographique}}</p><p><strong>Période :</strong> {{periode}}</p><h2>Données épidémiologiques</h2><p>{{donnees_epidemio}}</p><h2>Recommandations</h2><p>{{recommandations}}</p><p><strong>Date du rapport :</strong> {{date_rapport}}</p></div>' },

  { code: 'san2_plan_vaccination', name: "Plan de vaccination", category: 'sante', price: 5000, priceMax: 15000,
    description: "Plan de vaccination individuel ou collectif établi conformément aux recommandations nationales.", templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'beneficiaire',label:"Bénéficiaire ou population cible",type:'text',required:true},
      {key:'vaccins_prevus',label:"Vaccins prévus et calendrier",type:'textarea',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'responsable',label:"Responsable du plan",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>PLAN DE VACCINATION</h1><p><strong>Bénéficiaire/Population cible :</strong> {{beneficiaire}}</p><p><strong>Zone :</strong> {{zone_intervention}}</p><p><strong>Responsable :</strong> {{responsable}}</p><p><strong>Début :</strong> {{date_debut}}</p><h2>Calendrier vaccinal</h2><p>{{vaccins_prevus}}</p></div>' },

  { code: 'san2_signalement_maladie', name: "Fiche de signalement de maladie", category: 'sante', price: 2500, priceMax: 7500,
    description: "Fiche officielle de signalement d'une maladie à déclaration obligatoire aux autorités sanitaires.", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'maladie',label:"Maladie signalée",type:'text',required:true},
      {key:'nom_patient',label:"Nom du patient (initiales)",type:'text',required:true},
      {key:'date_diagnostic',label:"Date du diagnostic",type:'date',required:true},
      {key:'declarant',label:"Médecin déclarant",type:'text',required:true},
      {key:'contexte_epidemio',label:"Contexte épidémiologique",type:'textarea',required:false}
    ]),
    body: '<div class="doc"><h1>FICHE DE SIGNALEMENT DE MALADIE À DÉCLARATION OBLIGATOIRE</h1><p><strong>Maladie :</strong> {{maladie}}</p><p><strong>Patient (initiales) :</strong> {{nom_patient}}</p><p><strong>Date du diagnostic :</strong> {{date_diagnostic}}</p><p><strong>Médecin déclarant :</strong> Dr {{declarant}}</p><h2>Contexte épidémiologique</h2><p>{{contexte_epidemio}}</p><p><em>Ce document est transmis confidentiellement aux autorités sanitaires compétentes.</em></p></div>' },

  { code: 'san2_convention_partenariat_med', name: "Convention de partenariat médical", category: 'sante', price: 15000, priceMax: 45000,
    description: "Convention de partenariat entre établissements de santé pour la mutualisation de ressources médicales.", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'etablissement1',label:"Premier établissement partenaire",type:'text',required:true},
      {key:'etablissement2',label:"Deuxième établissement partenaire",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'duree',label:"Durée de la convention",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CONVENTION DE PARTENARIAT MÉDICAL</h1><p>Entre les établissements :</p><p>- <strong>{{etablissement1}}</strong></p><p>- <strong>{{etablissement2}}</strong></p><h2>Objet du partenariat</h2><p>{{objet_partenariat}}</p><p><strong>Durée :</strong> {{duree}}</p><p><strong>Date :</strong> {{date_signature}}</p><p><strong>Directeur Établissement 1 :</strong> _____________________</p><p><strong>Directeur Établissement 2 :</strong> _____________________</p></div>' },

  { code: 'san2_reglement_clinique', name: "Règlement intérieur de clinique", category: 'sante', price: 8000, priceMax: 24000,
    description: "Règlement intérieur d'une clinique ou d'un établissement de santé privé, opposable à tous.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_clinique',label:"Nom de la clinique",type:'text',required:true},
      {key:'adresse',label:"Adresse de la clinique",type:'text',required:true},
      {key:'directeur',label:"Nom du Directeur",type:'text',required:true},
      {key:'regles_principales',label:"Principales règles de fonctionnement",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>RÈGLEMENT INTÉRIEUR</h1><h2>{{nom_clinique}}</h2><p><strong>Adresse :</strong> {{adresse}}</p><p><strong>Direction :</strong> {{directeur}}</p><h2>Dispositions générales</h2><p>{{regles_principales}}</p><p><strong>Adopté le :</strong> {{date_adoption}}</p><p><em>Le présent règlement est affiché et applicable à compter de la date d\'adoption.</em></p></div>' },

  { code: 'san2_contrat_praticien_liberal', name: "Contrat de praticien libéral", category: 'sante', price: 12000, priceMax: 36000,
    description: "Contrat encadrant l'exercice libéral d'un praticien au sein d'un établissement de santé.", templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_praticien',label:"Nom du praticien",type:'text',required:true},
      {key:'specialite',label:"Spécialité médicale",type:'text',required:true},
      {key:'nom_etablissement',label:"Nom de l'établissement",type:'text',required:true},
      {key:'conditions_exercice',label:"Conditions d'exercice",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CONTRAT DE PRATICIEN LIBÉRAL</h1><p>Entre <strong>{{nom_etablissement}}</strong> et le Dr <strong>{{nom_praticien}}</strong>, spécialiste en <strong>{{specialite}}</strong>.</p><h2>Conditions d\'exercice</h2><p>{{conditions_exercice}}</p><p><strong>Date d\'effet :</strong> {{date_debut}}</p><p><strong>Le Directeur :</strong> _____________________</p><p><strong>Le Praticien :</strong> _____________________</p></div>' },

  { code: 'san2_rapport_commission_med', name: "Rapport de commission médicale", category: 'sante', price: 7000, priceMax: 21000,
    description: "Rapport issu d'une commission médicale d'établissement sur des questions cliniques ou organisationnelles.", templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_etablissement',label:"Établissement de santé",type:'text',required:true},
      {key:'president_cme',label:"Président de la commission",type:'text',required:true},
      {key:'date_reunion',label:"Date de réunion",type:'date',required:true},
      {key:'ordre_du_jour',label:"Ordre du jour",type:'textarea',required:true},
      {key:'decisions',label:"Décisions et recommandations",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT DE COMMISSION MÉDICALE</h1><p><strong>Établissement :</strong> {{nom_etablissement}}</p><p><strong>Président :</strong> Dr {{president_cme}}</p><p><strong>Date de réunion :</strong> {{date_reunion}}</p><h2>Ordre du jour</h2><p>{{ordre_du_jour}}</p><h2>Décisions et recommandations</h2><p>{{decisions}}</p><p><strong>Signature du Président :</strong> _____________________</p></div>' },

  { code: 'san2_protocole_urgences', name: "Protocole urgences médicales", category: 'sante', price: 6000, priceMax: 18000,
    description: "Protocole de prise en charge des urgences médicales au sein d'un établissement de santé.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement de santé",type:'text',required:true},
      {key:'responsable_urgences',label:"Médecin responsable des urgences",type:'text',required:true},
      {key:'types_urgences',label:"Types d'urgences couverts",type:'textarea',required:true},
      {key:'procedure_alerte',label:"Procédure d'alerte et de triage",type:'textarea',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>PROTOCOLE URGENCES MÉDICALES</h1><p><strong>Établissement :</strong> {{etablissement}}</p><p><strong>Responsable :</strong> Dr {{responsable_urgences}}</p><h2>Types d\'urgences couverts</h2><p>{{types_urgences}}</p><h2>Procédure d\'alerte et de triage</h2><p>{{procedure_alerte}}</p><p><strong>Validé le :</strong> {{date_validation}}</p></div>' },

  { code: 'san2_plan_continuite_sanitaire', name: "Plan de continuité sanitaire", category: 'sante', price: 12000, priceMax: 36000,
    description: "Plan de continuité des activités sanitaires en cas de crise ou de perturbation majeure.", templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement concerné",type:'text',required:true},
      {key:'directeur',label:"Directeur responsable",type:'text',required:true},
      {key:'scenarios_crise',label:"Scénarios de crise identifiés",type:'textarea',required:true},
      {key:'mesures_continuite',label:"Mesures de continuité prévues",type:'textarea',required:true},
      {key:'date_plan',label:"Date d'élaboration du plan",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>PLAN DE CONTINUITÉ SANITAIRE</h1><p><strong>Établissement :</strong> {{etablissement}}</p><p><strong>Directeur :</strong> {{directeur}}</p><h2>Scénarios de crise identifiés</h2><p>{{scenarios_crise}}</p><h2>Mesures de continuité</h2><p>{{mesures_continuite}}</p><p><strong>Élaboré le :</strong> {{date_plan}}</p><p><em>Ce plan est révisé annuellement et testé lors d\'exercices de simulation.</em></p></div>' },

  // ── PHARMACIE (pharma_) ────────────────────────────────────────────────────
  { code: 'pharma_ordonnance_type', name: "Ordonnance médicale type", category: 'sante', price: 2000, priceMax: 6000,
    description: "Modèle d'ordonnance médicale conforme aux exigences réglementaires de la pharmacopée locale.", templateType: 'pdf', classe: 'B', active: true, popularity: 95,
    fieldsJson: F([
      {key:'nom_medecin',label:"Nom et qualité du médecin",type:'text',required:true},
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'date_ordonnance',label:"Date de l'ordonnance",type:'date',required:true},
      {key:'medicaments_prescrits',label:"Médicaments et posologies prescrits",type:'textarea',required:true},
      {key:'duree_traitement',label:"Durée du traitement",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>ORDONNANCE MÉDICALE</h1><p><strong>Dr {{nom_medecin}}</strong></p><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Date :</strong> {{date_ordonnance}}</p><h2>Prescription</h2><p>{{medicaments_prescrits}}</p><p><strong>Durée du traitement :</strong> {{duree_traitement}}</p><p><strong>Signature et cachet :</strong> _____________________</p><p><em>Ordonnance valable 3 mois à compter de la date de prescription.</em></p></div>' },

  { code: 'pharma_dispensation_medicaments', name: "Fiche de dispensation médicaments", category: 'sante', price: 3000, priceMax: 9000,
    description: "Fiche de dispensation pharmaceutique enregistrant la délivrance de médicaments à un patient.", templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'pharmacien',label:"Pharmacien dispensateur",type:'text',required:true},
      {key:'medicaments',label:"Médicaments dispensés",type:'textarea',required:true},
      {key:'date_dispensation',label:"Date de dispensation",type:'date',required:true},
      {key:'conseils',label:"Conseils délivrés au patient",type:'textarea',required:false}
    ]),
    body: '<div class="doc"><h1>FICHE DE DISPENSATION PHARMACEUTIQUE</h1><p><strong>Patient :</strong> {{nom_patient}}</p><p><strong>Pharmacien :</strong> {{pharmacien}}</p><p><strong>Date :</strong> {{date_dispensation}}</p><h2>Médicaments dispensés</h2><p>{{medicaments}}</p><h2>Conseils pharmaceutiques</h2><p>{{conseils}}</p><p><strong>Signature du pharmacien :</strong> _____________________</p></div>' },

  { code: 'pharma_registre_stupefiants', name: "Registre des stupéfiants", category: 'sante', price: 5000, priceMax: 15000,
    description: "Registre réglementaire de traçabilité des stupéfiants et substances psychotropes en pharmacie.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_pharmacie',label:"Nom de la pharmacie",type:'text',required:true},
      {key:'pharmacien_responsable',label:"Pharmacien responsable",type:'text',required:true},
      {key:'substance',label:"Substance stupéfiante",type:'text',required:true},
      {key:'periode',label:"Période du registre",type:'text',required:true},
      {key:'date_ouverture',label:"Date d'ouverture du registre",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>REGISTRE DES STUPÉFIANTS ET PSYCHOTROPES</h1><p><strong>Pharmacie :</strong> {{nom_pharmacie}}</p><p><strong>Pharmacien responsable :</strong> {{pharmacien_responsable}}</p><p><strong>Substance :</strong> {{substance}}</p><p><strong>Période :</strong> {{periode}}</p><p><strong>Ouvert le :</strong> {{date_ouverture}}</p><table border="1"><tr><th>Date</th><th>Entrée (qté)</th><th>Sortie (qté)</th><th>Stock</th><th>Ordonnance n°</th><th>Signature</th></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table></div>' },

  { code: 'pharma_rapport_inspection', name: "Rapport d'inspection de pharmacie", category: 'sante', price: 7000, priceMax: 21000,
    description: "Rapport établi à l'issue d'une inspection officielle d'une pharmacie par les autorités sanitaires.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_pharmacie',label:"Nom de la pharmacie",type:'text',required:true},
      {key:'inspecteur',label:"Nom de l'inspecteur",type:'text',required:true},
      {key:'date_inspection',label:"Date de l'inspection",type:'date',required:true},
      {key:'constats',label:"Constats et observations",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations et délais de mise en conformité",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'INSPECTION DE PHARMACIE</h1><p><strong>Pharmacie inspectée :</strong> {{nom_pharmacie}}</p><p><strong>Inspecteur :</strong> {{inspecteur}}</p><p><strong>Date :</strong> {{date_inspection}}</p><h2>Constats</h2><p>{{constats}}</p><h2>Recommandations</h2><p>{{recommandations}}</p><p><strong>Signature de l\'inspecteur :</strong> _____________________</p></div>' },

  { code: 'pharma_contrat_fourniture_med', name: "Contrat de fourniture de médicaments", category: 'sante', price: 10000, priceMax: 30000,
    description: "Contrat commercial de fourniture régulière de médicaments entre un grossiste et une pharmacie.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'fournisseur',label:"Nom du fournisseur",type:'text',required:true},
      {key:'pharmacie',label:"Nom de la pharmacie cliente",type:'text',required:true},
      {key:'produits',label:"Produits et conditions de fourniture",type:'textarea',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CONTRAT DE FOURNITURE DE MÉDICAMENTS</h1><p>Entre <strong>{{fournisseur}}</strong> (Fournisseur) et <strong>{{pharmacie}}</strong> (Client).</p><h2>Produits et conditions</h2><p>{{produits}}</p><p><strong>Durée :</strong> {{duree_contrat}}</p><p><strong>Signé le :</strong> {{date_signature}}</p><p><strong>Le Fournisseur :</strong> _____________________ <strong>Le Client :</strong> _____________________</p></div>' },

  { code: 'pharma_bon_commande_pharma', name: "Bon de commande produits pharmaceutiques", category: 'sante', price: 2500, priceMax: 7500,
    description: "Bon de commande officiel pour l'approvisionnement en produits pharmaceutiques et parapharmaceutiques.", templateType: 'pdf', classe: 'B', active: true, popularity: 88,
    fieldsJson: F([
      {key:'pharmacie',label:"Pharmacie commanditaire",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur",type:'text',required:true},
      {key:'produits_commandes',label:"Produits et quantités commandés",type:'textarea',required:true},
      {key:'date_commande',label:"Date de commande",type:'date',required:true},
      {key:'delai_livraison',label:"Délai de livraison souhaité",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>BON DE COMMANDE PHARMACEUTIQUE</h1><p><strong>Pharmacie :</strong> {{pharmacie}}</p><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>Date :</strong> {{date_commande}}</p><p><strong>Délai de livraison :</strong> {{delai_livraison}}</p><h2>Produits commandés</h2><p>{{produits_commandes}}</p><p><strong>Signature du pharmacien :</strong> _____________________</p></div>' },

  { code: 'pharma_fiche_rupture_stock', name: "Fiche de rupture de stock", category: 'sante', price: 2000, priceMax: 6000,
    description: "Fiche signalant la rupture de stock d'un médicament et les alternatives proposées au patient.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_pharmacie',label:"Nom de la pharmacie",type:'text',required:true},
      {key:'medicament_rupture',label:"Médicament en rupture de stock",type:'text',required:true},
      {key:'date_rupture',label:"Date de constatation de la rupture",type:'date',required:true},
      {key:'alternative',label:"Alternative(s) proposée(s)",type:'textarea',required:false},
      {key:'date_retablissement',label:"Date prévisionnelle de rétablissement",type:'text',required:false}
    ]),
    body: '<div class="doc"><h1>FICHE DE RUPTURE DE STOCK</h1><p><strong>Pharmacie :</strong> {{nom_pharmacie}}</p><p><strong>Médicament en rupture :</strong> {{medicament_rupture}}</p><p><strong>Constaté le :</strong> {{date_rupture}}</p><h2>Alternatives proposées</h2><p>{{alternative}}</p><p><strong>Rétablissement prévu :</strong> {{date_retablissement}}</p></div>' },

  { code: 'pharma_rapport_pharmacovigilance', name: "Rapport de pharmacovigilance", category: 'sante', price: 8000, priceMax: 24000,
    description: "Rapport de pharmacovigilance signalant un effet indésirable grave lié à un médicament.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'medicament',label:"Médicament suspecté",type:'text',required:true},
      {key:'effet_indesirable',label:"Effet indésirable observé",type:'textarea',required:true},
      {key:'patient_info',label:"Informations patient (initiales, âge)",type:'text',required:true},
      {key:'declarant',label:"Pharmacien ou médecin déclarant",type:'text',required:true},
      {key:'date_declaration',label:"Date de déclaration",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT DE PHARMACOVIGILANCE</h1><p><strong>Médicament suspecté :</strong> {{medicament}}</p><p><strong>Patient :</strong> {{patient_info}}</p><p><strong>Déclarant :</strong> {{declarant}}</p><p><strong>Date :</strong> {{date_declaration}}</p><h2>Effet indésirable observé</h2><p>{{effet_indesirable}}</p><p><em>Ce rapport est transmis à l\'autorité nationale de pharmacovigilance.</em></p></div>' },

  { code: 'pharma_protocole_stockage', name: "Protocole de stockage des médicaments", category: 'sante', price: 4000, priceMax: 12000,
    description: "Protocole définissant les conditions de stockage des médicaments en pharmacie ou en établissement de santé.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement concerné",type:'text',required:true},
      {key:'responsable',label:"Pharmacien responsable",type:'text',required:true},
      {key:'conditions_stockage',label:"Conditions de stockage requises",type:'textarea',required:true},
      {key:'produits_speciaux',label:"Produits nécessitant des conditions particulières",type:'textarea',required:false},
      {key:'date_protocole',label:"Date du protocole",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>PROTOCOLE DE STOCKAGE DES MÉDICAMENTS</h1><p><strong>Établissement :</strong> {{etablissement}}</p><p><strong>Responsable :</strong> {{responsable}}</p><h2>Conditions générales de stockage</h2><p>{{conditions_stockage}}</p><h2>Produits à conditions particulières</h2><p>{{produits_speciaux}}</p><p><strong>Élaboré le :</strong> {{date_protocole}}</p></div>' },

  { code: 'pharma_certificat_analyse', name: "Certificat d'analyse produit", category: 'sante', price: 5000, priceMax: 15000,
    description: "Certificat d'analyse attestant de la conformité d'un produit pharmaceutique aux normes en vigueur.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_produit',label:"Dénomination du produit",type:'text',required:true},
      {key:'numero_lot',label:"Numéro de lot",type:'text',required:true},
      {key:'laboratoire',label:"Laboratoire d'analyse",type:'text',required:true},
      {key:'resultats_analyse',label:"Résultats des analyses",type:'textarea',required:true},
      {key:'date_analyse',label:"Date de l'analyse",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CERTIFICAT D\'ANALYSE PRODUIT PHARMACEUTIQUE</h1><p><strong>Produit :</strong> {{nom_produit}}</p><p><strong>Numéro de lot :</strong> {{numero_lot}}</p><p><strong>Laboratoire :</strong> {{laboratoire}}</p><p><strong>Date d\'analyse :</strong> {{date_analyse}}</p><h2>Résultats</h2><p>{{resultats_analyse}}</p><p><strong>Conclusion :</strong> Le produit est conforme aux spécifications établies.</p><p><strong>Signature du biologiste :</strong> _____________________</p></div>' },

  { code: 'pharma_contrat_distribution', name: "Contrat de distribution pharmaceutique", category: 'sante', price: 12000, priceMax: 36000,
    description: "Contrat de distribution exclusive ou non exclusive de produits pharmaceutiques sur un territoire donné.", templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'fabricant',label:"Fabricant ou laboratoire",type:'text',required:true},
      {key:'distributeur',label:"Distributeur",type:'text',required:true},
      {key:'produits',label:"Produits concernés",type:'textarea',required:true},
      {key:'territoire',label:"Territoire de distribution",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CONTRAT DE DISTRIBUTION PHARMACEUTIQUE</h1><p>Entre <strong>{{fabricant}}</strong> (Fabricant) et <strong>{{distributeur}}</strong> (Distributeur).</p><p><strong>Territoire :</strong> {{territoire}}</p><h2>Produits concernés</h2><p>{{produits}}</p><p><strong>Date d\'effet :</strong> {{date_debut}}</p><p><strong>Le Fabricant :</strong> _____________________ <strong>Le Distributeur :</strong> _____________________</p></div>' },

  { code: 'pharma_procedure_rappel_lot', name: "Procédure de rappel de lot", category: 'sante', price: 7000, priceMax: 21000,
    description: "Procédure officielle de rappel d'un lot de médicaments défectueux ou potentiellement dangereux.", templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_produit',label:"Nom du produit rappelé",type:'text',required:true},
      {key:'numero_lot',label:"Numéro de lot concerné",type:'text',required:true},
      {key:'motif_rappel',label:"Motif du rappel",type:'textarea',required:true},
      {key:'responsable',label:"Responsable du rappel",type:'text',required:true},
      {key:'date_rappel',label:"Date de lancement du rappel",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>PROCÉDURE DE RAPPEL DE LOT</h1><p><strong>Produit :</strong> {{nom_produit}}</p><p><strong>Lot concerné :</strong> {{numero_lot}}</p><p><strong>Initiée le :</strong> {{date_rappel}}</p><p><strong>Responsable :</strong> {{responsable}}</p><h2>Motif du rappel</h2><p>{{motif_rappel}}</p><p><em>Toute distribution de ce lot est immédiatement suspendue. Les stocks doivent être retournés dans les plus brefs délais.</em></p></div>' },

  { code: 'pharma_rapport_destruction', name: "Rapport de destruction de médicaments", category: 'sante', price: 5000, priceMax: 15000,
    description: "Rapport officiel attestant la destruction de médicaments périmés ou non conformes selon les normes en vigueur.", templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'pharmacie',label:"Pharmacie ou établissement",type:'text',required:true},
      {key:'responsable',label:"Pharmacien responsable",type:'text',required:true},
      {key:'medicaments_detruits',label:"Médicaments détruits et quantités",type:'textarea',required:true},
      {key:'methode_destruction',label:"Méthode de destruction utilisée",type:'text',required:true},
      {key:'date_destruction',label:"Date de destruction",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT DE DESTRUCTION DE MÉDICAMENTS</h1><p><strong>Établissement :</strong> {{pharmacie}}</p><p><strong>Responsable :</strong> {{responsable}}</p><p><strong>Date :</strong> {{date_destruction}}</p><h2>Médicaments détruits</h2><p>{{medicaments_detruits}}</p><p><strong>Méthode de destruction :</strong> {{methode_destruction}}</p><p><em>La destruction a été effectuée conformément à la réglementation en vigueur.</em></p><p><strong>Signature :</strong> _____________________</p></div>' },

  { code: 'pharma_fiche_temperature', name: "Fiche de température de stockage", category: 'sante', price: 2000, priceMax: 6000,
    description: "Fiche de suivi quotidien des températures des zones de stockage des médicaments en pharmacie.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'pharmacie',label:"Nom de la pharmacie",type:'text',required:true},
      {key:'zone_stockage',label:"Zone ou équipement de stockage",type:'text',required:true},
      {key:'temperature_requise',label:"Plage de température requise (°C)",type:'text',required:true},
      {key:'responsable',label:"Agent responsable du suivi",type:'text',required:true},
      {key:'mois_suivi',label:"Mois de suivi",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>FICHE DE TEMPÉRATURE - STOCKAGE MÉDICAMENTS</h1><p><strong>Pharmacie :</strong> {{pharmacie}}</p><p><strong>Zone :</strong> {{zone_stockage}}</p><p><strong>Température requise :</strong> {{temperature_requise}}</p><p><strong>Responsable :</strong> {{responsable}}</p><p><strong>Mois :</strong> {{mois_suivi}}</p><table border="1"><tr><th>Date</th><th>Matin (°C)</th><th>Midi (°C)</th><th>Soir (°C)</th><th>Observations</th><th>Visa</th></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table></div>' },

  { code: 'pharma_agrement_pharmacie', name: "Agrément de pharmacie", category: 'sante', price: 15000, priceMax: 45000,
    description: "Document officiel d'agrément délivré par les autorités sanitaires pour l'ouverture d'une pharmacie.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_pharmacie',label:"Nom de la pharmacie",type:'text',required:true},
      {key:'pharmacien_titulaire',label:"Pharmacien titulaire",type:'text',required:true},
      {key:'adresse',label:"Adresse de la pharmacie",type:'text',required:true},
      {key:'autorite_delivrance',label:"Autorité de délivrance",type:'text',required:true},
      {key:'date_agrement',label:"Date de délivrance de l'agrément",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>AGRÉMENT DE PHARMACIE</h1><p>Les autorités sanitaires compétentes, représentées par <strong>{{autorite_delivrance}}</strong>, accordent le présent agrément à :</p><p><strong>Pharmacie :</strong> {{nom_pharmacie}}</p><p><strong>Pharmacien titulaire :</strong> {{pharmacien_titulaire}}</p><p><strong>Adresse :</strong> {{adresse}}</p><p>pour l\'exploitation d\'une officine de pharmacie conformément à la réglementation en vigueur.</p><p><strong>Délivré le :</strong> {{date_agrement}}</p><p><strong>Signature et cachet de l\'autorité :</strong> _____________________</p></div>' },

  { code: 'pharma_demande_amm', name: "Demande d'autorisation de mise sur le marché", category: 'sante', price: 18000, priceMax: 54000,
    description: "Dossier de demande d'autorisation de mise sur le marché d'un médicament auprès des autorités de santé.", templateType: 'pdf', classe: 'A', active: true, popularity: 42,
    fieldsJson: F([
      {key:'laboratoire',label:"Laboratoire demandeur",type:'text',required:true},
      {key:'nom_medicament',label:"Dénomination du médicament",type:'text',required:true},
      {key:'forme_pharmaceutique',label:"Forme pharmaceutique",type:'text',required:true},
      {key:'indication',label:"Indication thérapeutique",type:'textarea',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>DEMANDE D\'AUTORISATION DE MISE SUR LE MARCHÉ (AMM)</h1><p><strong>Laboratoire :</strong> {{laboratoire}}</p><p><strong>Médicament :</strong> {{nom_medicament}}</p><p><strong>Forme :</strong> {{forme_pharmaceutique}}</p><h2>Indication thérapeutique</h2><p>{{indication}}</p><p><strong>Date de dépôt :</strong> {{date_demande}}</p><p><em>Cette demande est accompagnée du dossier technique complet conformément aux exigences réglementaires.</em></p></div>' },

  { code: 'pharma_rapport_controle_qualite', name: "Rapport de contrôle qualité", category: 'sante', price: 8000, priceMax: 24000,
    description: "Rapport de contrôle qualité réalisé sur des produits pharmaceutiques en cours de fabrication ou à la réception.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'produit',label:"Produit contrôlé",type:'text',required:true},
      {key:'numero_lot',label:"Numéro de lot",type:'text',required:true},
      {key:'tests_effectues',label:"Tests effectués",type:'textarea',required:true},
      {key:'resultats',label:"Résultats obtenus",type:'textarea',required:true},
      {key:'date_controle',label:"Date du contrôle",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT DE CONTRÔLE QUALITÉ PHARMACEUTIQUE</h1><p><strong>Produit :</strong> {{produit}}</p><p><strong>Lot :</strong> {{numero_lot}}</p><p><strong>Date :</strong> {{date_controle}}</p><h2>Tests effectués</h2><p>{{tests_effectues}}</p><h2>Résultats</h2><p>{{resultats}}</p><p><strong>Conclusion :</strong> ☐ Conforme ☐ Non conforme</p><p><strong>Responsable qualité :</strong> _____________________</p></div>' },

  { code: 'pharma_convention_pharmacies', name: "Convention entre pharmacies", category: 'sante', price: 8000, priceMax: 24000,
    description: "Convention de coopération ou de dépannage mutuel entre officines de pharmacie.", templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'pharmacie1',label:"Première pharmacie",type:'text',required:true},
      {key:'pharmacie2',label:"Deuxième pharmacie",type:'text',required:true},
      {key:'objet_convention',label:"Objet de la convention",type:'textarea',required:true},
      {key:'duree',label:"Durée de la convention",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CONVENTION ENTRE PHARMACIES</h1><p>Entre <strong>{{pharmacie1}}</strong> et <strong>{{pharmacie2}}</strong>.</p><h2>Objet</h2><p>{{objet_convention}}</p><p><strong>Durée :</strong> {{duree}}</p><p><strong>Signée le :</strong> {{date_signature}}</p><p><strong>Pharmacien 1 :</strong> _____________________ <strong>Pharmacien 2 :</strong> _____________________</p></div>' },

  { code: 'pharma_fiche_technique_med', name: "Fiche technique médicament", category: 'sante', price: 3000, priceMax: 9000,
    description: "Fiche technique récapitulant les informations essentielles sur un médicament à l'usage des professionnels de santé.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_medicament',label:"Dénomination commune internationale",type:'text',required:true},
      {key:'nom_commercial',label:"Nom commercial",type:'text',required:true},
      {key:'indication',label:"Indications thérapeutiques",type:'textarea',required:true},
      {key:'posologie',label:"Posologie et mode d'administration",type:'textarea',required:true},
      {key:'effets_indesirables',label:"Principaux effets indésirables",type:'textarea',required:false}
    ]),
    body: '<div class="doc"><h1>FICHE TECHNIQUE MÉDICAMENT</h1><p><strong>DCI :</strong> {{nom_medicament}}</p><p><strong>Nom commercial :</strong> {{nom_commercial}}</p><h2>Indications</h2><p>{{indication}}</p><h2>Posologie</h2><p>{{posologie}}</p><h2>Effets indésirables</h2><p>{{effets_indesirables}}</p></div>' },

  { code: 'pharma_plan_gestion_dechets', name: "Plan de gestion des déchets pharmaceutiques", category: 'sante', price: 6000, priceMax: 18000,
    description: "Plan de gestion des déchets issus de l'activité pharmaceutique conformément aux normes environnementales.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement pharmaceutique",type:'text',required:true},
      {key:'responsable',label:"Responsable environnement",type:'text',required:true},
      {key:'types_dechets',label:"Types de déchets identifiés",type:'textarea',required:true},
      {key:'procedure_elimination',label:"Procédures d'élimination",type:'textarea',required:true},
      {key:'date_plan',label:"Date d'élaboration",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>PLAN DE GESTION DES DÉCHETS PHARMACEUTIQUES</h1><p><strong>Établissement :</strong> {{etablissement}}</p><p><strong>Responsable :</strong> {{responsable}}</p><h2>Types de déchets identifiés</h2><p>{{types_dechets}}</p><h2>Procédures d\'élimination</h2><p>{{procedure_elimination}}</p><p><strong>Élaboré le :</strong> {{date_plan}}</p></div>' },

  { code: 'pharma_procedure_reception', name: "Procédure de réception des médicaments", category: 'sante', price: 4000, priceMax: 12000,
    description: "Procédure standardisée de réception et de vérification des médicaments livrés en pharmacie ou établissement.", templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement réceptionnaire",type:'text',required:true},
      {key:'responsable_reception',label:"Agent responsable de la réception",type:'text',required:true},
      {key:'etapes_verification',label:"Étapes de vérification à la réception",type:'textarea',required:true},
      {key:'criteres_refus',label:"Critères de refus de la livraison",type:'textarea',required:true},
      {key:'date_procedure',label:"Date de la procédure",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>PROCÉDURE DE RÉCEPTION DES MÉDICAMENTS</h1><p><strong>Établissement :</strong> {{etablissement}}</p><p><strong>Responsable :</strong> {{responsable_reception}}</p><h2>Étapes de vérification</h2><p>{{etapes_verification}}</p><h2>Critères de refus</h2><p>{{criteres_refus}}</p><p><strong>Date :</strong> {{date_procedure}}</p></div>' },

  { code: 'pharma_rapport_inventaire', name: "Rapport d'inventaire annuel de pharmacie", category: 'sante', price: 6000, priceMax: 18000,
    description: "Rapport d'inventaire annuel des stocks d'une pharmacie ou d'un magasin pharmaceutique.", templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'pharmacie',label:"Nom de la pharmacie",type:'text',required:true},
      {key:'pharmacien',label:"Pharmacien responsable",type:'text',required:true},
      {key:'annee_inventaire',label:"Année de l'inventaire",type:'text',required:true},
      {key:'date_inventaire',label:"Date de l'inventaire",type:'date',required:true},
      {key:'observations',label:"Observations et anomalies constatées",type:'textarea',required:false}
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'INVENTAIRE ANNUEL</h1><h2>{{pharmacie}}</h2><p><strong>Pharmacien :</strong> {{pharmacien}}</p><p><strong>Exercice :</strong> {{annee_inventaire}}</p><p><strong>Date :</strong> {{date_inventaire}}</p><table border="1"><tr><th>Famille</th><th>Nb références</th><th>Valeur stock (FCFA)</th><th>Périmés</th></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table><h2>Observations</h2><p>{{observations}}</p><p><strong>Signature du pharmacien :</strong> _____________________</p></div>' },

  { code: 'pharma_contrat_prestataire_logistique', name: "Contrat de prestataire logistique pharma", category: 'sante', price: 12000, priceMax: 36000,
    description: "Contrat encadrant les prestations logistiques (transport, stockage) fournies à une structure pharmaceutique.", templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'pharmacie',label:"Structure pharmaceutique cliente",type:'text',required:true},
      {key:'prestataire',label:"Prestataire logistique",type:'text',required:true},
      {key:'prestations',label:"Prestations logistiques définies",type:'textarea',required:true},
      {key:'duree',label:"Durée du contrat",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CONTRAT DE PRESTATAIRE LOGISTIQUE PHARMACEUTIQUE</h1><p>Entre <strong>{{pharmacie}}</strong> (Client) et <strong>{{prestataire}}</strong> (Prestataire).</p><h2>Prestations convenues</h2><p>{{prestations}}</p><p><strong>Durée :</strong> {{duree}}</p><p><strong>Signé le :</strong> {{date_signature}}</p><p><strong>Le Client :</strong> _____________________ <strong>Le Prestataire :</strong> _____________________</p></div>' },

  { code: 'pharma_charte_ethique', name: "Charte éthique pharmaceutique", category: 'sante', price: 5000, priceMax: 15000,
    description: "Charte définissant les engagements éthiques et déontologiques des professionnels d'une officine pharmaceutique.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'pharmacie',label:"Nom de la pharmacie",type:'text',required:true},
      {key:'pharmacien_titulaire',label:"Pharmacien titulaire",type:'text',required:true},
      {key:'valeurs',label:"Valeurs et engagements éthiques",type:'textarea',required:true},
      {key:'engagements_deontologiques',label:"Engagements déontologiques",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CHARTE ÉTHIQUE PHARMACEUTIQUE</h1><h2>{{pharmacie}}</h2><p><strong>Pharmacien titulaire :</strong> {{pharmacien_titulaire}}</p><h2>Nos valeurs</h2><p>{{valeurs}}</p><h2>Engagements déontologiques</h2><p>{{engagements_deontologiques}}</p><p><strong>Adoptée le :</strong> {{date_adoption}}</p><p><em>Cette charte est affichée dans l\'officine et signée par tout le personnel.</em></p></div>' },

  { code: 'pharma_bilan_annuel', name: "Bilan annuel de pharmacie", category: 'sante', price: 8000, priceMax: 24000,
    description: "Bilan annuel complet d'une officine pharmaceutique couvrant les aspects financiers, d'activité et de qualité.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'pharmacie',label:"Nom de la pharmacie",type:'text',required:true},
      {key:'pharmacien',label:"Pharmacien titulaire",type:'text',required:true},
      {key:'annee',label:"Année du bilan",type:'text',required:true},
      {key:'bilan_activite',label:"Bilan d'activité et chiffres clés",type:'textarea',required:true},
      {key:'date_bilan',label:"Date d'établissement du bilan",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>BILAN ANNUEL DE PHARMACIE</h1><h2>{{pharmacie}}</h2><p><strong>Pharmacien :</strong> {{pharmacien}}</p><p><strong>Exercice :</strong> {{annee}}</p><h2>Bilan d\'activité</h2><p>{{bilan_activite}}</p><p><strong>Établi le :</strong> {{date_bilan}}</p><p><strong>Signature :</strong> _____________________</p></div>' },
];
async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 11a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
