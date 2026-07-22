import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  { code: 'ong2_convention_financement', name: "Convention de financement bailleur", category: 'association', price: 8000, priceMax: 24000,
    description: "Convention entre une ONG et un bailleur de fonds pour le financement d'un projet.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'nom_bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'montant_financement',label:"Montant du financement (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CONVENTION DE FINANCEMENT</h1><p>Entre <strong>{{nom_bailleur}}</strong>, ci-après dénommé "le Bailleur", et <strong>{{nom_ong}}</strong>, ci-après dénommée "l\'Organisation".</p><h2>Article 1 – Objet</h2><p>La présente convention a pour objet de définir les modalités de financement du projet <strong>{{titre_projet}}</strong>.</p><h2>Article 2 – Montant</h2><p>Le Bailleur s\'engage à verser la somme de <strong>{{montant_financement}} FCFA</strong> pour la réalisation du projet.</p><h2>Article 3 – Durée</h2><p>La convention prend effet le <strong>{{date_debut}}</strong> et prend fin le <strong>{{date_fin}}</strong>.</p><h2>Article 4 – Obligations des parties</h2><p>L\'Organisation s\'engage à utiliser les fonds conformément au budget approuvé et à soumettre des rapports périodiques au Bailleur.</p><p>Fait en double exemplaire.<br/>Signatures des parties</p></div>' },

  { code: 'ong2_rapport_narrative', name: "Rapport narratif projet", category: 'association', price: 5000, priceMax: 15000,
    description: "Rapport narratif décrivant les activités et résultats d'un projet ONG.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'periode_rapport',label:"Période du rapport",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'activites_realisees',label:"Activités réalisées",type:'textarea',required:true},
      {key:'resultats_obtenus',label:"Résultats obtenus",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT NARRATIF DE PROJET</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Organisation :</strong> {{nom_ong}}</p><p><strong>Période :</strong> {{periode_rapport}}</p><h2>1. Activités réalisées</h2><p>{{activites_realisees}}</p><h2>2. Résultats obtenus</h2><p>{{resultats_obtenus}}</p><h2>3. Défis et leçons apprises</h2><p>Des ajustements ont été apportés en cours d\'exécution pour garantir l\'atteinte des objectifs.</p><h2>4. Perspectives</h2><p>Les activités futures seront conduites conformément au plan de travail approuvé.</p></div>' },

  { code: 'ong2_rapport_financier', name: "Rapport financier projet", category: 'association', price: 6000, priceMax: 18000,
    description: "Rapport financier d'un projet ONG présentant les dépenses par poste budgétaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'budget_total',label:"Budget total approuvé (FCFA)",type:'text',required:true},
      {key:'depenses_totales',label:"Dépenses totales (FCFA)",type:'text',required:true},
      {key:'solde_disponible',label:"Solde disponible (FCFA)",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT FINANCIER DE PROJET</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Organisation :</strong> {{nom_ong}}</p><p><strong>Période :</strong> {{periode}}</p><h2>Synthèse financière</h2><table border="1" style="width:100%;border-collapse:collapse"><tr><th>Libellé</th><th>Montant (FCFA)</th></tr><tr><td>Budget total approuvé</td><td>{{budget_total}}</td></tr><tr><td>Dépenses totales engagées</td><td>{{depenses_totales}}</td></tr><tr><td>Solde disponible</td><td>{{solde_disponible}}</td></tr></table><h2>Certification</h2><p>Je soussigné(e), responsable financier de {{nom_ong}}, certifie l\'exactitude des informations contenues dans le présent rapport.</p></div>' },

  { code: 'ong2_plan_suivi_evaluation', name: "Plan de suivi et évaluation", category: 'association', price: 7000, priceMax: 21000,
    description: "Plan de suivi et évaluation définissant les indicateurs et mécanismes de mesure des résultats.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'objectif_general',label:"Objectif général",type:'textarea',required:true},
      {key:'indicateurs_cles',label:"Indicateurs clés de performance",type:'textarea',required:true},
      {key:'responsable_suivi',label:"Responsable du suivi",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>PLAN DE SUIVI ET ÉVALUATION</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Organisation :</strong> {{nom_ong}}</p><h2>1. Objectif général</h2><p>{{objectif_general}}</p><h2>2. Indicateurs clés</h2><p>{{indicateurs_cles}}</p><h2>3. Fréquence de suivi</h2><p>Le suivi sera effectué mensuellement, avec des évaluations trimestrielles et une évaluation finale.</p><h2>4. Responsabilités</h2><p>Le/La <strong>{{responsable_suivi}}</strong> est chargé(e) de coordonner la collecte et l\'analyse des données.</p></div>' },

  { code: 'ong2_cadre_logique', name: "Cadre logique projet", category: 'association', price: 7000, priceMax: 21000,
    description: "Cadre logique structurant la hiérarchie des objectifs, résultats et indicateurs d'un projet.", templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'objectif_global',label:"Objectif global",type:'textarea',required:true},
      {key:'objectifs_specifiques',label:"Objectifs spécifiques",type:'textarea',required:true},
      {key:'resultats_attendus',label:"Résultats attendus",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>CADRE LOGIQUE DU PROJET</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Organisation :</strong> {{nom_ong}}</p><table border="1" style="width:100%;border-collapse:collapse"><tr><th>Niveau</th><th>Description</th><th>Indicateurs</th><th>Sources de vérification</th></tr><tr><td>Objectif global</td><td>{{objectif_global}}</td><td>À définir</td><td>Rapports statistiques</td></tr><tr><td>Objectifs spécifiques</td><td>{{objectifs_specifiques}}</td><td>À définir</td><td>Rapports d\'activités</td></tr><tr><td>Résultats attendus</td><td>{{resultats_attendus}}</td><td>À définir</td><td>Enquêtes de terrain</td></tr></table></div>' },

  { code: 'ong2_plan_travail_annuel', name: "Plan de travail annuel (PTA)", category: 'association', price: 5000, priceMax: 15000,
    description: "Plan de travail annuel détaillant les activités planifiées par trimestre.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'annee',label:"Année",type:'text',required:true},
      {key:'activites_t1',label:"Activités Trimestre 1",type:'textarea',required:true},
      {key:'activites_t2',label:"Activités Trimestre 2",type:'textarea',required:false}
    ]),
    body: '<div class="doc"><h1>PLAN DE TRAVAIL ANNUEL {{annee}}</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Organisation :</strong> {{nom_ong}}</p><h2>Trimestre 1</h2><p>{{activites_t1}}</p><h2>Trimestre 2</h2><p>{{activites_t2}}</p><h2>Trimestre 3</h2><p>Activités à planifier selon l\'avancement du projet.</p><h2>Trimestre 4</h2><p>Clôture des activités et préparation du rapport annuel.</p></div>' },

  { code: 'ong2_demande_subvention', name: "Demande de subvention", category: 'association', price: 6000, priceMax: 18000,
    description: "Dossier de demande de subvention adressé à un bailleur de fonds ou institution.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'nom_bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'montant_sollicite',label:"Montant sollicité (FCFA)",type:'text',required:true},
      {key:'description_projet',label:"Description du projet",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>DEMANDE DE SUBVENTION</h1><p><strong>À l\'attention de :</strong> {{nom_bailleur}}</p><p><strong>De la part de :</strong> {{nom_ong}}</p><h2>Objet : Financement du projet {{titre_projet}}</h2><h2>1. Présentation de l\'organisation</h2><p>{{nom_ong}} est une organisation de la société civile intervenant dans le domaine du développement communautaire.</p><h2>2. Description du projet</h2><p>{{description_projet}}</p><h2>3. Budget sollicité</h2><p>Le montant total sollicité est de <strong>{{montant_sollicite}} FCFA</strong>.</p><h2>4. Conclusion</h2><p>Nous sollicitons votre appui financier pour la réalisation de ce projet à fort impact social.</p></div>' },

  { code: 'ong2_cr_comite_pilotage', name: "Compte rendu comité de pilotage", category: 'association', price: 3000, priceMax: 9000,
    description: "Compte rendu de réunion du comité de pilotage d'un projet ONG.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'date_reunion',label:"Date de la réunion",type:'date',required:true},
      {key:'lieu_reunion',label:"Lieu de la réunion",type:'text',required:true},
      {key:'participants',label:"Liste des participants",type:'textarea',required:true},
      {key:'decisions_prises',label:"Décisions prises",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>COMPTE RENDU DU COMITÉ DE PILOTAGE</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Date :</strong> {{date_reunion}}</p><p><strong>Lieu :</strong> {{lieu_reunion}}</p><h2>Participants</h2><p>{{participants}}</p><h2>Points discutés</h2><p>Le comité a passé en revue l\'état d\'avancement du projet et examiné les rapports d\'activités soumis.</p><h2>Décisions prises</h2><p>{{decisions_prises}}</p><h2>Prochaine réunion</h2><p>La prochaine réunion du comité de pilotage sera convoquée selon le calendrier établi.</p></div>' },

  { code: 'ong2_plan_capitalisation', name: "Plan de capitalisation", category: 'association', price: 5000, priceMax: 15000,
    description: "Plan définissant la stratégie de capitalisation des expériences et bonnes pratiques d'un projet.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'themes_capitalisation',label:"Thèmes de capitalisation",type:'textarea',required:true},
      {key:'methodes_collecte',label:"Méthodes de collecte",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>PLAN DE CAPITALISATION</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Organisation :</strong> {{nom_ong}}</p><h2>1. Objectifs de la capitalisation</h2><p>Documenter et partager les expériences, bonnes pratiques et leçons apprises du projet.</p><h2>2. Thèmes de capitalisation</h2><p>{{themes_capitalisation}}</p><h2>3. Méthodes de collecte</h2><p>{{methodes_collecte}}</p><h2>4. Diffusion</h2><p>Les résultats seront partagés via des ateliers, publications et plateformes numériques.</p></div>' },

  { code: 'ong2_rapport_final', name: "Rapport final projet", category: 'association', price: 8000, priceMax: 24000,
    description: "Rapport final complet d'un projet ONG présentant les résultats, impacts et recommandations.", templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'resultats_globaux',label:"Résultats globaux atteints",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT FINAL DE PROJET</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Organisation :</strong> {{nom_ong}}</p><p><strong>Période :</strong> {{date_debut}} au {{date_fin}}</p><h2>1. Résultats globaux</h2><p>{{resultats_globaux}}</p><h2>2. Impact</h2><p>Le projet a contribué de manière significative à l\'amélioration des conditions de vie des bénéficiaires ciblés.</p><h2>3. Recommandations</h2><p>{{recommandations}}</p><h2>4. Conclusion</h2><p>Ce rapport marque la clôture officielle du projet et documente les acquis pour les interventions futures.</p></div>' },

  { code: 'ong2_procedure_marches', name: "Procédure de passation de marchés ONG", category: 'association', price: 7000, priceMax: 21000,
    description: "Manuel de procédures de passation de marchés adapté aux ONG opérant en Afrique.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'seuil_consultation',label:"Seuil de consultation (FCFA)",type:'text',required:true},
      {key:'seuil_appel_offres',label:"Seuil d'appel d'offres (FCFA)",type:'text',required:true},
      {key:'responsable_marches',label:"Responsable des marchés",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>PROCÉDURE DE PASSATION DE MARCHÉS</h1><p><strong>Organisation :</strong> {{nom_ong}}</p><h2>1. Objet</h2><p>La présente procédure définit les règles de passation des marchés de {{nom_ong}} dans un souci de transparence et d\'efficacité.</p><h2>2. Seuils</h2><table border="1" style="width:100%;border-collapse:collapse"><tr><th>Type</th><th>Seuil (FCFA)</th></tr><tr><td>Consultation restreinte</td><td>{{seuil_consultation}}</td></tr><tr><td>Appel d\'offres ouvert</td><td>{{seuil_appel_offres}}</td></tr></table><h2>3. Responsabilités</h2><p>Le/La <strong>{{responsable_marches}}</strong> est responsable de l\'application de la présente procédure.</p></div>' },

  { code: 'ong2_politique_sauvegarde', name: "Politique de sauvegarde", category: 'association', price: 8000, priceMax: 24000,
    description: "Politique de sauvegarde sociale et environnementale d'une ONG.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'domaines_couverts',label:"Domaines couverts",type:'textarea',required:true},
      {key:'responsable_mise_oeuvre',label:"Responsable de mise en oeuvre",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>POLITIQUE DE SAUVEGARDE</h1><p><strong>Organisation :</strong> {{nom_ong}}</p><p><strong>Date d\'adoption :</strong> {{date_adoption}}</p><h2>1. Objet</h2><p>La présente politique définit les engagements de {{nom_ong}} en matière de sauvegarde sociale et environnementale.</p><h2>2. Domaines couverts</h2><p>{{domaines_couverts}}</p><h2>3. Mise en oeuvre</h2><p>Le/La <strong>{{responsable_mise_oeuvre}}</strong> veille à l\'application de cette politique dans toutes les interventions de l\'organisation.</p></div>' },

  { code: 'ong2_plan_gestion_env', name: "Plan de gestion environnementale", category: 'association', price: 7000, priceMax: 21000,
    description: "Plan de gestion environnementale et sociale d'un projet ONG.", templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'impacts_identifies',label:"Impacts environnementaux identifiés",type:'textarea',required:true},
      {key:'mesures_attenuation',label:"Mesures d'atténuation",type:'textarea',required:true},
      {key:'responsable',label:"Responsable environnement",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>PLAN DE GESTION ENVIRONNEMENTALE ET SOCIALE</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Organisation :</strong> {{nom_ong}}</p><h2>1. Impacts identifiés</h2><p>{{impacts_identifies}}</p><h2>2. Mesures d\'atténuation</h2><p>{{mesures_attenuation}}</p><h2>3. Suivi environnemental</h2><p>Le/La <strong>{{responsable}}</strong> assure le suivi de la mise en oeuvre des mesures environnementales.</p></div>' },

  { code: 'ong2_rapport_audit_interne', name: "Rapport d'audit interne ONG", category: 'association', price: 8000, priceMax: 24000,
    description: "Rapport d'audit interne évaluant les processus et contrôles d'une ONG.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'periode_auditee',label:"Période auditée",type:'text',required:true},
      {key:'auditeur',label:"Auditeur interne",type:'text',required:true},
      {key:'constats_principaux',label:"Constats principaux",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'AUDIT INTERNE</h1><p><strong>Organisation :</strong> {{nom_ong}}</p><p><strong>Période auditée :</strong> {{periode_auditee}}</p><p><strong>Auditeur :</strong> {{auditeur}}</p><h2>1. Constats principaux</h2><p>{{constats_principaux}}</p><h2>2. Recommandations</h2><p>{{recommandations}}</p><h2>3. Plan d\'action</h2><p>La direction s\'engage à mettre en oeuvre les recommandations dans les délais convenus.</p></div>' },

  { code: 'ong2_rapport_audit_externe', name: "Rapport d'audit financier externe", category: 'association', price: 10000, priceMax: 30000,
    description: "Rapport d'audit financier externe d'une ONG réalisé par un cabinet indépendant.", templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'cabinet_audit',label:"Cabinet d'audit",type:'text',required:true},
      {key:'exercice',label:"Exercice audité",type:'text',required:true},
      {key:'opinion',label:"Opinion de l'auditeur",type:'textarea',required:true},
      {key:'observations',label:"Observations",type:'textarea',required:false}
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'AUDIT FINANCIER EXTERNE</h1><p><strong>Organisation :</strong> {{nom_ong}}</p><p><strong>Cabinet d\'audit :</strong> {{cabinet_audit}}</p><p><strong>Exercice :</strong> {{exercice}}</p><h2>Opinion de l\'auditeur</h2><p>{{opinion}}</p><h2>Observations</h2><p>{{observations}}</p><h2>Certification</h2><p>Le présent rapport a été établi conformément aux normes internationales d\'audit (ISA).</p></div>' },

  { code: 'ong2_plan_communication', name: "Plan de communication projet", category: 'association', price: 5000, priceMax: 15000,
    description: "Plan de communication définissant les messages, canaux et audiences d'un projet ONG.", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'publics_cibles',label:"Publics cibles",type:'textarea',required:true},
      {key:'messages_cles',label:"Messages clés",type:'textarea',required:true},
      {key:'canaux_communication',label:"Canaux de communication",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>PLAN DE COMMUNICATION</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Organisation :</strong> {{nom_ong}}</p><h2>1. Publics cibles</h2><p>{{publics_cibles}}</p><h2>2. Messages clés</h2><p>{{messages_cles}}</p><h2>3. Canaux de communication</h2><p>{{canaux_communication}}</p><h2>4. Calendrier</h2><p>Les activités de communication seront conduites tout au long de la mise en oeuvre du projet.</p></div>' },

  { code: 'ong2_rapport_mission_terrain', name: "Rapport de mission terrain", category: 'association', price: 3000, priceMax: 9000,
    description: "Rapport de mission terrain documentant les observations et recommandations d'une visite de site.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'objet_mission',label:"Objet de la mission",type:'text',required:true},
      {key:'date_mission',label:"Date de la mission",type:'date',required:true},
      {key:'lieu_mission',label:"Lieu de la mission",type:'text',required:true},
      {key:'observations',label:"Observations",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT DE MISSION TERRAIN</h1><p><strong>Organisation :</strong> {{nom_ong}}</p><p><strong>Objet :</strong> {{objet_mission}}</p><p><strong>Date :</strong> {{date_mission}}</p><p><strong>Lieu :</strong> {{lieu_mission}}</p><h2>Observations</h2><p>{{observations}}</p><h2>Recommandations</h2><p>{{recommandations}}</p></div>' },

  { code: 'ong2_fiche_beneficiaire', name: "Fiche de bénéficiaire", category: 'association', price: 2000, priceMax: 6000,
    description: "Fiche d'enregistrement des bénéficiaires d'un programme ONG.", templateType: 'pdf', classe: 'C', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom et prénom du bénéficiaire",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'village_quartier',label:"Village / Quartier",type:'text',required:true},
      {key:'type_assistance',label:"Type d'assistance reçue",type:'text',required:true},
      {key:'date_enregistrement',label:"Date d'enregistrement",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>FICHE DE BÉNÉFICIAIRE</h1><table border="1" style="width:100%;border-collapse:collapse"><tr><td><strong>Nom et prénom</strong></td><td>{{nom_beneficiaire}}</td></tr><tr><td><strong>Date de naissance</strong></td><td>{{date_naissance}}</td></tr><tr><td><strong>Localité</strong></td><td>{{village_quartier}}</td></tr><tr><td><strong>Type d\'assistance</strong></td><td>{{type_assistance}}</td></tr><tr><td><strong>Date d\'enregistrement</strong></td><td>{{date_enregistrement}}</td></tr></table><p>Signature du bénéficiaire : ___________________</p><p>Signature de l\'agent : ___________________</p></div>' },

  { code: 'ong2_registre_plaintes', name: "Registre des plaintes", category: 'association', price: 3000, priceMax: 9000,
    description: "Registre de gestion des plaintes et réclamations des bénéficiaires d'un projet ONG.", templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'numero_plainte',label:"Numéro de la plainte",type:'text',required:true},
      {key:'date_reception',label:"Date de réception",type:'date',required:true},
      {key:'description_plainte',label:"Description de la plainte",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>REGISTRE DES PLAINTES</h1><p><strong>Organisation :</strong> {{nom_ong}}</p><p><strong>Projet :</strong> {{titre_projet}}</p><table border="1" style="width:100%;border-collapse:collapse"><tr><th>Champ</th><th>Information</th></tr><tr><td>Numéro de plainte</td><td>{{numero_plainte}}</td></tr><tr><td>Date de réception</td><td>{{date_reception}}</td></tr><tr><td>Description</td><td>{{description_plainte}}</td></tr><tr><td>Statut</td><td>En traitement</td></tr></table></div>' },

  { code: 'ong2_rapport_mensuel', name: "Rapport mensuel d'activités", category: 'association', price: 3000, priceMax: 9000,
    description: "Rapport mensuel résumant les activités réalisées par une ONG dans le cadre d'un projet.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'mois_annee',label:"Mois et année",type:'text',required:true},
      {key:'activites_realisees',label:"Activités réalisées",type:'textarea',required:true},
      {key:'difficultes',label:"Difficultés rencontrées",type:'textarea',required:false}
    ]),
    body: '<div class="doc"><h1>RAPPORT MENSUEL D\'ACTIVITÉS</h1><p><strong>Organisation :</strong> {{nom_ong}}</p><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Période :</strong> {{mois_annee}}</p><h2>Activités réalisées</h2><p>{{activites_realisees}}</p><h2>Difficultés rencontrées</h2><p>{{difficultes}}</p><h2>Planification du mois suivant</h2><p>Les activités du mois prochain seront conduites conformément au plan de travail annuel.</p></div>' },

  { code: 'ong2_convention_partenariat_op', name: "Convention de partenariat opérationnel", category: 'association', price: 7000, priceMax: 21000,
    description: "Convention définissant le partenariat opérationnel entre deux ONG pour la mise en oeuvre d'un projet.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'ong_principale',label:"ONG principale",type:'text',required:true},
      {key:'ong_partenaire',label:"ONG partenaire",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'roles_responsabilites',label:"Rôles et responsabilités",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CONVENTION DE PARTENARIAT OPÉRATIONNEL</h1><p>Entre <strong>{{ong_principale}}</strong> (organisation chef de file) et <strong>{{ong_partenaire}}</strong> (organisation partenaire).</p><h2>Article 1 – Objet</h2><p>La présente convention régit le partenariat pour la mise en oeuvre du projet <strong>{{titre_projet}}</strong>.</p><h2>Article 2 – Rôles et responsabilités</h2><p>{{roles_responsabilites}}</p><h2>Article 3 – Durée</h2><p>La convention prend effet à la date de signature.</p><p>Fait le {{date_signature}}, en double exemplaire.</p></div>' },

  { code: 'ong2_accord_sous_traitance', name: "Accord de sous-traitance ONG", category: 'association', price: 6000, priceMax: 18000,
    description: "Accord de sous-traitance entre une ONG et un prestataire pour l'exécution de prestations spécifiques.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'nom_prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'objet_prestation',label:"Objet de la prestation",type:'textarea',required:true},
      {key:'montant_contrat',label:"Montant du contrat (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>ACCORD DE SOUS-TRAITANCE</h1><p>Entre <strong>{{nom_ong}}</strong> (le Donneur d\'ordre) et <strong>{{nom_prestataire}}</strong> (le Sous-traitant).</p><h2>Article 1 – Objet</h2><p>{{objet_prestation}}</p><h2>Article 2 – Rémunération</h2><p>Le montant convenu est de <strong>{{montant_contrat}} FCFA</strong>.</p><h2>Article 3 – Durée</h2><p>L\'accord prend effet à compter du {{date_debut}}.</p><p>Signatures des parties</p></div>' },

  { code: 'ong2_plan_transition_sortie', name: "Plan de transition et sortie", category: 'association', price: 6000, priceMax: 18000,
    description: "Plan définissant la stratégie de transition et de sortie d'un projet ONG.", templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'date_sortie_prevue',label:"Date de sortie prévue",type:'date',required:true},
      {key:'activites_transition',label:"Activités de transition",type:'textarea',required:true},
      {key:'structures_relais',label:"Structures relais identifiées",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>PLAN DE TRANSITION ET SORTIE</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Organisation :</strong> {{nom_ong}}</p><p><strong>Date de sortie prévue :</strong> {{date_sortie_prevue}}</p><h2>1. Activités de transition</h2><p>{{activites_transition}}</p><h2>2. Structures relais</h2><p>{{structures_relais}}</p><h2>3. Durabilité</h2><p>Des mécanismes de durabilité ont été mis en place pour assurer la continuité des bénéfices après la sortie du projet.</p></div>' },

  { code: 'ong2_rapport_evaluation_mi_parcours', name: "Rapport d'évaluation à mi-parcours", category: 'association', price: 8000, priceMax: 24000,
    description: "Rapport d'évaluation à mi-parcours d'un projet ONG analysant les progrès et ajustements nécessaires.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'evaluateur',label:"Évaluateur",type:'text',required:true},
      {key:'progres_objectifs',label:"Progrès vers les objectifs",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'ÉVALUATION À MI-PARCOURS</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Organisation :</strong> {{nom_ong}}</p><p><strong>Évaluateur :</strong> {{evaluateur}}</p><h2>1. Progrès vers les objectifs</h2><p>{{progres_objectifs}}</p><h2>2. Analyse des écarts</h2><p>Des ajustements sont recommandés pour la seconde phase d\'exécution du projet.</p><h2>3. Recommandations</h2><p>{{recommandations}}</p></div>' },

  { code: 'ong2_fiche_lecons_apprises', name: "Fiche de leçons apprises", category: 'association', price: 2000, priceMax: 6000,
    description: "Fiche documentant les leçons apprises lors de la mise en oeuvre d'un projet ONG.", templateType: 'pdf', classe: 'C', active: true, popularity: 57,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'domaine',label:"Domaine concerné",type:'text',required:true},
      {key:'lecon_apprise',label:"Leçon apprise",type:'textarea',required:true},
      {key:'recommandation',label:"Recommandation",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>FICHE DE LEÇONS APPRISES</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p><strong>Organisation :</strong> {{nom_ong}}</p><p><strong>Domaine :</strong> {{domaine}}</p><h2>Leçon apprise</h2><p>{{lecon_apprise}}</p><h2>Recommandation</h2><p>{{recommandation}}</p><p>Cette fiche contribue à la capitalisation des expériences de l\'organisation.</p></div>' },

  // ---- ASSOCIATIONS (asso2_) ----

  { code: 'asso2_reglement_interieur', name: "Règlement intérieur association", category: 'association', price: 5000, priceMax: 15000,
    description: "Règlement intérieur définissant les règles de fonctionnement interne d'une association.", templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'objet_social',label:"Objet social",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RÈGLEMENT INTÉRIEUR</h1><h2>{{nom_association}}</h2><p><strong>Siège :</strong> {{siege_social}}</p><p><strong>Adopté le :</strong> {{date_adoption}}</p><h2>Article 1 – Objet</h2><p>{{objet_social}}</p><h2>Article 2 – Admission des membres</h2><p>Toute personne souhaitant adhérer à l\'association doit remplir le formulaire d\'adhésion et s\'acquitter de la cotisation annuelle.</p><h2>Article 3 – Cotisations</h2><p>Le montant des cotisations est fixé chaque année par l\'Assemblée Générale.</p><h2>Article 4 – Discipline</h2><p>Tout membre contrevenant aux présentes dispositions pourra faire l\'objet d\'une sanction disciplinaire.</p></div>' },

  { code: 'asso2_pv_ag_constitutive', name: "Procès-verbal AG constitutive", category: 'association', price: 4000, priceMax: 12000,
    description: "Procès-verbal de l'assemblée générale constitutive d'une association.", templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'date_ag',label:"Date de l'AG",type:'date',required:true},
      {key:'lieu_ag',label:"Lieu de l'AG",type:'text',required:true},
      {key:'nombre_fondateurs',label:"Nombre de membres fondateurs",type:'text',required:true},
      {key:'president_elu',label:"Président élu",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>PROCÈS-VERBAL DE L\'ASSEMBLÉE GÉNÉRALE CONSTITUTIVE</h1><p><strong>Association :</strong> {{nom_association}}</p><p><strong>Date :</strong> {{date_ag}}</p><p><strong>Lieu :</strong> {{lieu_ag}}</p><p>Les membres fondateurs, au nombre de {{nombre_fondateurs}}, se sont réunis en Assemblée Générale Constitutive.</p><h2>Décisions</h2><p>1. Création officielle de l\'association {{nom_association}}</p><p>2. Adoption des statuts et du règlement intérieur</p><p>3. Élection du bureau : Président : <strong>{{president_elu}}</strong></p><p>La séance est levée.</p></div>' },

  { code: 'asso2_pv_ag_ordinaire', name: "Procès-verbal AG ordinaire", category: 'association', price: 3000, priceMax: 9000,
    description: "Procès-verbal de l'assemblée générale ordinaire annuelle d'une association.", templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'date_ag',label:"Date de l'AG",type:'date',required:true},
      {key:'lieu_ag',label:"Lieu",type:'text',required:true},
      {key:'nombre_membres_presents',label:"Nombre de membres présents",type:'text',required:true},
      {key:'ordre_du_jour',label:"Ordre du jour",type:'textarea',required:true},
      {key:'decisions',label:"Décisions prises",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>PROCÈS-VERBAL D\'ASSEMBLÉE GÉNÉRALE ORDINAIRE</h1><p><strong>Association :</strong> {{nom_association}}</p><p><strong>Date :</strong> {{date_ag}} — <strong>Lieu :</strong> {{lieu_ag}}</p><p><strong>Membres présents :</strong> {{nombre_membres_presents}}</p><h2>Ordre du jour</h2><p>{{ordre_du_jour}}</p><h2>Délibérations</h2><p>Les points inscrits à l\'ordre du jour ont été examinés.</p><h2>Décisions</h2><p>{{decisions}}</p><p>La séance est levée. Le Président – Le Secrétaire</p></div>' },

  { code: 'asso2_pv_ag_extraordinaire', name: "Procès-verbal AG extraordinaire", category: 'association', price: 4000, priceMax: 12000,
    description: "Procès-verbal d'assemblée générale extraordinaire pour modification des statuts ou dissolution.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'date_ag',label:"Date de l'AGE",type:'date',required:true},
      {key:'lieu_ag',label:"Lieu",type:'text',required:true},
      {key:'objet_age',label:"Objet de l'AGE",type:'textarea',required:true},
      {key:'decisions',label:"Décisions prises",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>PROCÈS-VERBAL D\'ASSEMBLÉE GÉNÉRALE EXTRAORDINAIRE</h1><p><strong>Association :</strong> {{nom_association}}</p><p><strong>Date :</strong> {{date_ag}} — <strong>Lieu :</strong> {{lieu_ag}}</p><h2>Objet</h2><p>{{objet_age}}</p><h2>Délibérations et décisions</h2><p>{{decisions}}</p><p>Les décisions ont été adoptées à la majorité requise par les statuts.</p><p>Le Président – Le Secrétaire</p></div>' },

  { code: 'asso2_pv_bureau', name: "Procès-verbal bureau", category: 'association', price: 2000, priceMax: 6000,
    description: "Procès-verbal de réunion du bureau exécutif d'une association.", templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'date_reunion',label:"Date de la réunion",type:'date',required:true},
      {key:'lieu_reunion',label:"Lieu",type:'text',required:true},
      {key:'membres_bureau_presents',label:"Membres du bureau présents",type:'textarea',required:true},
      {key:'points_examines',label:"Points examinés",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>PROCÈS-VERBAL DE RÉUNION DU BUREAU</h1><p><strong>Association :</strong> {{nom_association}}</p><p><strong>Date :</strong> {{date_reunion}} — <strong>Lieu :</strong> {{lieu_reunion}}</p><h2>Membres présents</h2><p>{{membres_bureau_presents}}</p><h2>Points examinés</h2><p>{{points_examines}}</p><p>La séance est levée. Le Président</p></div>' },

  { code: 'asso2_rapport_moral', name: "Rapport moral président", category: 'association', price: 3000, priceMax: 9000,
    description: "Rapport moral du président présenté à l'assemblée générale annuelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_president',label:"Nom du président",type:'text',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
      {key:'bilan_activites',label:"Bilan des activités",type:'textarea',required:true},
      {key:'perspectives',label:"Perspectives",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT MORAL DU PRÉSIDENT</h1><p><strong>Association :</strong> {{nom_association}}</p><p><strong>Exercice :</strong> {{exercice}}</p><p>Présenté par : {{nom_president}}</p><h2>Bilan des activités</h2><p>{{bilan_activites}}</p><h2>Perspectives</h2><p>{{perspectives}}</p><h2>Conclusion</h2><p>Je remercie l\'ensemble des membres et partenaires pour leur confiance et leur engagement au service de notre association.</p></div>' },

  { code: 'asso2_rapport_financier_tresorier', name: "Rapport financier trésorier", category: 'association', price: 3000, priceMax: 9000,
    description: "Rapport financier présenté par le trésorier à l'assemblée générale.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_tresorier',label:"Nom du trésorier",type:'text',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
      {key:'total_recettes',label:"Total recettes (FCFA)",type:'text',required:true},
      {key:'total_depenses',label:"Total dépenses (FCFA)",type:'text',required:true},
      {key:'solde',label:"Solde (FCFA)",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT FINANCIER DU TRÉSORIER</h1><p><strong>Association :</strong> {{nom_association}}</p><p><strong>Exercice :</strong> {{exercice}}</p><p>Présenté par : {{nom_tresorier}}</p><h2>Synthèse financière</h2><table border="1" style="width:100%;border-collapse:collapse"><tr><th>Poste</th><th>Montant (FCFA)</th></tr><tr><td>Total recettes</td><td>{{total_recettes}}</td></tr><tr><td>Total dépenses</td><td>{{total_depenses}}</td></tr><tr><td><strong>Solde</strong></td><td><strong>{{solde}}</strong></td></tr></table></div>' },

  { code: 'asso2_budget_previsionnel', name: "Budget prévisionnel association", category: 'association', price: 3000, priceMax: 9000,
    description: "Budget prévisionnel annuel d'une association détaillant les postes de recettes et dépenses.", templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
      {key:'postes_recettes',label:"Postes de recettes",type:'textarea',required:true},
      {key:'postes_depenses',label:"Postes de dépenses",type:'textarea',required:true},
      {key:'total_budget',label:"Total budget (FCFA)",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>BUDGET PRÉVISIONNEL {{exercice}}</h1><p><strong>Association :</strong> {{nom_association}}</p><h2>Recettes prévisionnelles</h2><p>{{postes_recettes}}</p><h2>Dépenses prévisionnelles</h2><p>{{postes_depenses}}</p><h2>Total budget</h2><p><strong>{{total_budget}} FCFA</strong></p><p>Budget adopté en Assemblée Générale.</p></div>' },

  { code: 'asso2_plan_financement', name: "Plan de financement association", category: 'association', price: 4000, priceMax: 12000,
    description: "Plan de financement présentant les sources de financement d'une association.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'exercice',label:"Période",type:'text',required:true},
      {key:'sources_financement',label:"Sources de financement identifiées",type:'textarea',required:true},
      {key:'montant_total',label:"Montant total (FCFA)",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>PLAN DE FINANCEMENT</h1><p><strong>Association :</strong> {{nom_association}}</p><p><strong>Période :</strong> {{exercice}}</p><h2>Sources de financement</h2><p>{{sources_financement}}</p><h2>Montant total mobilisé</h2><p><strong>{{montant_total}} FCFA</strong></p></div>' },

  { code: 'asso2_convention_mise_disposition', name: "Convention de mise à disposition", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention de mise à disposition de personnel ou de matériel au bénéfice d'une association.", templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'organisme_preteur',label:"Organisme prêteur",type:'text',required:true},
      {key:'objet_mise_disposition',label:"Objet de la mise à disposition",type:'textarea',required:true},
      {key:'duree',label:"Durée",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CONVENTION DE MISE À DISPOSITION</h1><p>Entre <strong>{{organisme_preteur}}</strong> (le Prêteur) et <strong>{{nom_association}}</strong> (le Bénéficiaire).</p><h2>Article 1 – Objet</h2><p>{{objet_mise_disposition}}</p><h2>Article 2 – Durée</h2><p>La mise à disposition est consentie pour une durée de <strong>{{duree}}</strong> à compter du {{date_debut}}.</p><p>Signatures des parties</p></div>' },

  { code: 'asso2_contrat_benevolat', name: "Contrat de bénévolat", category: 'association', price: 2000, priceMax: 6000,
    description: "Contrat encadrant l'engagement d'un bénévole au sein d'une association.", templateType: 'pdf', classe: 'C', active: true, popularity: 71,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_benevole',label:"Nom du bénévole",type:'text',required:true},
      {key:'mission_benevole',label:"Mission du bénévole",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CONTRAT DE BÉNÉVOLAT</h1><p>Entre <strong>{{nom_association}}</strong> et <strong>{{nom_benevole}}</strong>.</p><h2>Mission</h2><p>{{mission_benevole}}</p><h2>Engagement</h2><p>Le bénévole s\'engage à accomplir sa mission de manière désintéressée à compter du {{date_debut}}. L\'association s\'engage à lui fournir les moyens nécessaires à l\'accomplissement de sa mission.</p><p>Signatures</p></div>' },

  { code: 'asso2_charte_benevole', name: "Charte du bénévole", category: 'association', price: 2000, priceMax: 6000,
    description: "Charte définissant les droits et devoirs des bénévoles d'une association.", templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'valeurs_association',label:"Valeurs de l'association",type:'textarea',required:true},
      {key:'engagements_association',label:"Engagements de l'association envers les bénévoles",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>CHARTE DU BÉNÉVOLE</h1><h2>{{nom_association}}</h2><h2>Nos valeurs</h2><p>{{valeurs_association}}</p><h2>Droits du bénévole</h2><p>Tout bénévole a droit au respect, à la formation et à la reconnaissance de son engagement.</p><h2>Devoirs du bénévole</h2><p>Le bénévole s\'engage à respecter les valeurs de l\'association, à agir avec intégrité et à accomplir les missions qui lui sont confiées.</p><h2>Engagements de l\'association</h2><p>{{engagements_association}}</p></div>' },

  { code: 'asso2_formulaire_adhesion', name: "Formulaire d'adhésion membre", category: 'association', price: 1000, priceMax: 3000,
    description: "Formulaire d'adhésion pour les nouveaux membres d'une association.", templateType: 'pdf', classe: 'C', active: true, popularity: 85,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_adherent',label:"Nom et prénom de l'adhérent",type:'text',required:true},
      {key:'date_naissance_adherent',label:"Date de naissance",type:'date',required:true},
      {key:'profession',label:"Profession",type:'text',required:false},
      {key:'montant_cotisation',label:"Montant de la cotisation (FCFA)",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>FORMULAIRE D\'ADHÉSION</h1><h2>{{nom_association}}</h2><table border="1" style="width:100%;border-collapse:collapse"><tr><td>Nom et prénom</td><td>{{nom_adherent}}</td></tr><tr><td>Date de naissance</td><td>{{date_naissance_adherent}}</td></tr><tr><td>Profession</td><td>{{profession}}</td></tr><tr><td>Cotisation</td><td>{{montant_cotisation}} FCFA</td></tr></table><p>Je soussigné(e) demande mon adhésion à {{nom_association}} et m\'engage à respecter ses statuts et règlement intérieur.</p><p>Date et signature : ___________________</p></div>' },

  { code: 'asso2_attestation_benevolat', name: "Attestation de bénévolat", category: 'association', price: 1000, priceMax: 3000,
    description: "Attestation certifiant l'engagement bénévole d'une personne au sein d'une association.", templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_benevole',label:"Nom du bénévole",type:'text',required:true},
      {key:'mission',label:"Mission accomplie",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>ATTESTATION DE BÉNÉVOLAT</h1><p>L\'association <strong>{{nom_association}}</strong> atteste que <strong>{{nom_benevole}}</strong> a effectué un service bénévole en qualité de <strong>{{mission}}</strong> du <strong>{{date_debut}}</strong> au <strong>{{date_fin}}</strong>.</p><p>Cette attestation est délivrée pour servir et valoir ce que de droit.</p><p>Le Président</p></div>' },

  { code: 'asso2_certificat_membership', name: "Certificat de membership", category: 'association', price: 1000, priceMax: 3000,
    description: "Certificat attestant l'appartenance d'un membre à une association.", templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_membre',label:"Nom du membre",type:'text',required:true},
      {key:'numero_membre',label:"Numéro de membre",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CERTIFICAT DE MEMBERSHIP</h1><p>Il est certifié que <strong>{{nom_membre}}</strong> est membre en règle de l\'association <strong>{{nom_association}}</strong> sous le numéro <strong>{{numero_membre}}</strong> depuis le <strong>{{date_adhesion}}</strong>.</p><p>Ce certificat est délivré en foi de quoi.</p><p>Le Président</p></div>' },

  { code: 'asso2_convention_parrainage', name: "Convention de parrainage", category: 'association', price: 5000, priceMax: 15000,
    description: "Convention de parrainage entre un parrain et une association bénéficiaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_parrain',label:"Nom du parrain",type:'text',required:true},
      {key:'objet_parrainage',label:"Objet du parrainage",type:'textarea',required:true},
      {key:'contreparties',label:"Contreparties offertes",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CONVENTION DE PARRAINAGE</h1><p>Entre <strong>{{nom_parrain}}</strong> (le Parrain) et <strong>{{nom_association}}</strong> (l\'Association).</p><h2>Article 1 – Objet</h2><p>{{objet_parrainage}}</p><h2>Article 2 – Contreparties</h2><p>{{contreparties}}</p><p>Fait le {{date_signature}}, en double exemplaire. Signatures des parties.</p></div>' },

  { code: 'asso2_accord_mecenat', name: "Accord de mécénat", category: 'association', price: 6000, priceMax: 18000,
    description: "Accord de mécénat entre une entreprise mécène et une association bénéficiaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_mecene',label:"Nom du mécène",type:'text',required:true},
      {key:'objet_mecenat',label:"Objet du mécénat",type:'textarea',required:true},
      {key:'montant_ou_nature',label:"Montant ou nature du soutien",type:'text',required:true},
      {key:'duree',label:"Durée",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>ACCORD DE MÉCÉNAT</h1><p>Entre <strong>{{nom_mecene}}</strong> (le Mécène) et <strong>{{nom_association}}</strong> (le Bénéficiaire).</p><h2>Article 1 – Objet</h2><p>{{objet_mecenat}}</p><h2>Article 2 – Soutien accordé</h2><p>Le mécène apporte un soutien de <strong>{{montant_ou_nature}}</strong> pour une durée de {{duree}}.</p><h2>Article 3 – Utilisation</h2><p>L\'association s\'engage à utiliser le soutien reçu exclusivement aux fins définies dans le présent accord.</p><p>Signatures des parties</p></div>' },

  { code: 'asso2_appel_projets', name: "Appel à projets associations", category: 'association', price: 4000, priceMax: 12000,
    description: "Document d'appel à projets lancé par une association ou institution à destination d'autres associations.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_lanceur',label:"Nom de l'organisation lançant l'appel",type:'text',required:true},
      {key:'theme_appel',label:"Thème de l'appel à projets",type:'text',required:true},
      {key:'montant_max_projet',label:"Montant maximum par projet (FCFA)",type:'text',required:true},
      {key:'date_cloture',label:"Date de clôture des candidatures",type:'date',required:true},
      {key:'criteres_eligibilite',label:"Critères d'éligibilité",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>APPEL À PROJETS</h1><p><strong>Lancé par :</strong> {{nom_lanceur}}</p><p><strong>Thème :</strong> {{theme_appel}}</p><h2>Financement</h2><p>Montant maximum par projet : <strong>{{montant_max_projet}} FCFA</strong></p><h2>Critères d\'éligibilité</h2><p>{{criteres_eligibilite}}</p><h2>Dépôt des candidatures</h2><p>Les dossiers doivent être soumis avant le <strong>{{date_cloture}}</strong>.</p></div>' },

  { code: 'asso2_dossier_candidature_subvention', name: "Dossier de candidature subvention", category: 'association', price: 5000, priceMax: 15000,
    description: "Dossier complet de candidature à une subvention pour une association.", templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'nom_bailleur',label:"Nom du bailleur",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'resume_projet',label:"Résumé du projet",type:'textarea',required:true},
      {key:'montant_sollicite',label:"Montant sollicité (FCFA)",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>DOSSIER DE CANDIDATURE À UNE SUBVENTION</h1><p><strong>Association :</strong> {{nom_association}}</p><p><strong>Bailleur :</strong> {{nom_bailleur}}</p><p><strong>Projet :</strong> {{titre_projet}}</p><h2>Résumé du projet</h2><p>{{resume_projet}}</p><h2>Budget sollicité</h2><p><strong>{{montant_sollicite}} FCFA</strong></p><h2>Pièces jointes</h2><p>Statuts, récépissé de déclaration, rapport d\'activités, comptes certifiés.</p></div>' },

  { code: 'asso2_rapport_activites_annuel', name: "Rapport d'activités annuel", category: 'association', price: 4000, priceMax: 12000,
    description: "Rapport d'activités annuel d'une association présenté en assemblée générale.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
      {key:'principales_activites',label:"Principales activités réalisées",type:'textarea',required:true},
      {key:'nombre_beneficiaires',label:"Nombre de bénéficiaires",type:'text',required:false},
      {key:'perspectives',label:"Perspectives",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'ACTIVITÉS {{exercice}}</h1><p><strong>Association :</strong> {{nom_association}}</p><h2>Principales activités</h2><p>{{principales_activites}}</p><h2>Bénéficiaires</h2><p>{{nombre_beneficiaires}} bénéficiaires atteints au cours de l\'exercice.</p><h2>Perspectives</h2><p>{{perspectives}}</p></div>' },

  { code: 'asso2_bilan_moral_financier', name: "Bilan moral et financier", category: 'association', price: 4000, priceMax: 12000,
    description: "Bilan moral et financier combiné présenté en assemblée générale d'une association.", templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
      {key:'bilan_moral',label:"Bilan moral",type:'textarea',required:true},
      {key:'total_recettes',label:"Total recettes (FCFA)",type:'text',required:true},
      {key:'total_depenses',label:"Total dépenses (FCFA)",type:'text',required:true}
    ]),
    body: '<div class="doc"><h1>BILAN MORAL ET FINANCIER {{exercice}}</h1><p><strong>Association :</strong> {{nom_association}}</p><h2>Bilan moral</h2><p>{{bilan_moral}}</p><h2>Bilan financier</h2><table border="1" style="width:100%;border-collapse:collapse"><tr><th>Libellé</th><th>Montant (FCFA)</th></tr><tr><td>Recettes</td><td>{{total_recettes}}</td></tr><tr><td>Dépenses</td><td>{{total_depenses}}</td></tr></table></div>' },

  { code: 'asso2_acte_donation', name: "Acte de donation à association", category: 'association', price: 5000, priceMax: 15000,
    description: "Acte de donation mobilière ou immobilière au bénéfice d'une association.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_donateur',label:"Nom du donateur",type:'text',required:true},
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'objet_donation',label:"Objet de la donation",type:'textarea',required:true},
      {key:'valeur_donation',label:"Valeur de la donation (FCFA)",type:'text',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>ACTE DE DONATION</h1><p>Je soussigné(e) <strong>{{nom_donateur}}</strong> fais don à l\'association <strong>{{nom_association}}</strong> de :</p><p>{{objet_donation}}</p><p>Valeur estimée : <strong>{{valeur_donation}} FCFA</strong></p><p>Cette donation est faite à titre définitif et irrévocable.</p><p>Fait le {{date_acte}}</p><p>Signature du donateur — Signature du représentant de l\'association</p></div>' },

  { code: 'asso2_convention_mise_en_reseau', name: "Convention de mise en réseau", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention de mise en réseau entre plusieurs associations pour mutualiser les ressources.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_reseau',label:"Nom du réseau",type:'text',required:true},
      {key:'associations_membres',label:"Associations membres",type:'textarea',required:true},
      {key:'objectifs_reseau',label:"Objectifs du réseau",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CONVENTION DE MISE EN RÉSEAU</h1><p><strong>Réseau :</strong> {{nom_reseau}}</p><h2>Membres du réseau</h2><p>{{associations_membres}}</p><h2>Objectifs</h2><p>{{objectifs_reseau}}</p><h2>Gouvernance</h2><p>Le réseau est animé par un comité de coordination composé de représentants de chaque association membre.</p><p>Fait le {{date_signature}}. Signatures des représentants.</p></div>' },

  { code: 'asso2_plan_developpement', name: "Plan de développement associatif", category: 'association', price: 6000, priceMax: 18000,
    description: "Plan stratégique de développement d'une association sur 3 à 5 ans.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'vision',label:"Vision",type:'textarea',required:true},
      {key:'axes_strategiques',label:"Axes stratégiques",type:'textarea',required:true},
      {key:'ressources_necessaires',label:"Ressources nécessaires",type:'textarea',required:true}
    ]),
    body: '<div class="doc"><h1>PLAN DE DÉVELOPPEMENT ASSOCIATIF {{periode}}</h1><p><strong>Association :</strong> {{nom_association}}</p><h2>Vision</h2><p>{{vision}}</p><h2>Axes stratégiques</h2><p>{{axes_strategiques}}</p><h2>Ressources nécessaires</h2><p>{{ressources_necessaires}}</p><h2>Suivi</h2><p>Le conseil d\'administration veille à la mise en oeuvre du présent plan et en rend compte à l\'assemblée générale.</p></div>' },

  { code: 'asso2_charte_valeurs', name: "Charte des valeurs associatives", category: 'association', price: 2000, priceMax: 6000,
    description: "Charte énonçant les valeurs fondatrices et principes d'action d'une association.", templateType: 'pdf', classe: 'C', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'valeurs_fondatrices',label:"Valeurs fondatrices",type:'textarea',required:true},
      {key:'principes_action',label:"Principes d'action",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: '<div class="doc"><h1>CHARTE DES VALEURS</h1><h2>{{nom_association}}</h2><p><strong>Adoptée le :</strong> {{date_adoption}}</p><h2>Nos valeurs fondatrices</h2><p>{{valeurs_fondatrices}}</p><h2>Nos principes d\'action</h2><p>{{principes_action}}</p><h2>Engagement collectif</h2><p>Chaque membre de {{nom_association}} s\'engage à incarner et à promouvoir ces valeurs dans toutes ses actions.</p></div>' },
];
async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 12b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
