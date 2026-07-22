import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── Management stratégique ──────────────────────────────────────────────
  { code: 'mgt_diagnostic_swot', name: "Accord de service de diagnostic stratégique (SWOT/PESTEL)", category: 'gestion_management', price: 6000, priceMax: 18000,
    description: "Accord cadrant une mission de diagnostic stratégique par analyse SWOT et PESTEL pour PME/GE en zone OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale du client",type:'text',required:true},
      {key:'secteur_activite',label:"Secteur d'activité",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
      {key:'duree_mission',label:"Durée estimée de la mission",type:'text',required:true},
      {key:'nom_consultant',label:"Nom du cabinet / consultant",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DIAGNOSTIC STRATÉGIQUE</h1><h2>(Analyse SWOT &amp; PESTEL)</h2><p>Entre <strong>{{raison_sociale}}</strong> (ci-après « le Client ») et <strong>{{nom_consultant}}</strong> (ci-après « le Prestataire »), il est convenu ce qui suit :</p><h3>Article 1 – Objet</h3><p>Le Prestataire s'engage à réaliser un diagnostic stratégique complet de l'entreprise Cliente, comprenant une analyse SWOT (Forces, Faiblesses, Opportunités, Menaces) et une analyse PESTEL (Politique, Économique, Socioculturel, Technologique, Environnemental, Légal), applicable au contexte {{secteur_activite}} en Afrique de l'Ouest.</p><h3>Article 2 – Durée</h3><p>La mission débutera le <strong>{{date_debut}}</strong> pour une durée de <strong>{{duree_mission}}</strong>.</p><h3>Article 3 – Livrables</h3><p>Le Prestataire remettra : (i) un rapport de diagnostic stratégique, (ii) une matrice SWOT commentée, (iii) une synthèse PESTEL et (iv) des recommandations priorisées.</p><h3>Article 4 – Confidentialité</h3><p>Toutes les informations communiquées par le Client sont strictement confidentielles et ne peuvent être divulguées à des tiers sans accord écrit préalable.</p><h3>Article 5 – Droit applicable</h3><p>Le présent accord est régi par le droit OHADA et les législations nationales applicables.</p><p><em>Fait en deux exemplaires originaux.</em></p></div>` },

  { code: 'mgt_plan_strategique', name: "Accord de service de plan stratégique d'entreprise (3-5 ans)", category: 'gestion_management', price: 8000, priceMax: 24000,
    description: "Accord de mission pour l'élaboration d'un plan stratégique pluriannuel (3 à 5 ans) adapté au contexte africain.", templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale du client",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (ex : 2025-2030)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet / consultant",type:'text',required:true},
      {key:'vision_cible',label:"Vision cible communiquée par le client",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PLAN STRATÉGIQUE D'ENTREPRISE</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Élaboration d'un plan stratégique couvrant la période <strong>{{horizon_plan}}</strong>, incluant : analyse de l'environnement, définition de la vision/mission/valeurs, axes stratégiques, feuille de route et indicateurs clés de performance (KPI).</p><h3>Article 2 – Vision partagée</h3><p>{{vision_cible}}</p><h3>Article 3 – Démarrage</h3><p>La mission démarre le <strong>{{date_lancement}}</strong>.</p><h3>Article 4 – Méthodologie</h3><p>Le Prestataire appliquera les meilleures pratiques internationales adaptées au contexte OHADA (gouvernance, contraintes réglementaires, marché régional CEDEAO/UEMOA).</p><h3>Article 5 – Livrables</h3><p>Document de plan stratégique, tableaux de bord de suivi, présentation direction.</p><h3>Article 6 – Propriété intellectuelle</h3><p>Le plan stratégique est la propriété exclusive du Client dès complet paiement.</p></div>` },

  { code: 'mgt_transformation_org', name: "Accord de service de conseil en transformation organisationnelle", category: 'gestion_management', price: 9000, priceMax: 28000,
    description: "Accord de mission de conseil pour accompagner une transformation organisationnelle profonde (structure, culture, processus).", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'perimetre_transformation',label:"Périmètre de la transformation",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet de conseil",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN TRANSFORMATION ORGANISATIONNELLE</h1><p>Entre <strong>{{raison_sociale}}</strong> (« le Client ») et <strong>{{nom_consultant}}</strong> (« le Prestataire ») :</p><h3>Article 1 – Objet</h3><p>Accompagnement de la transformation organisationnelle portant sur : {{perimetre_transformation}}.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Approche</h3><p>Le Prestataire utilisera une approche systémique intégrant les dimensions structurelles, culturelles, humaines et technologiques, en tenant compte des spécificités du contexte africain.</p><h3>Article 4 – Gouvernance de la mission</h3><p>Un comité de pilotage sera constitué avec les représentants du Client et du Prestataire, se réunissant au moins une fois par mois.</p><h3>Article 5 – Obligations réciproques</h3><p>Le Client s'engage à mettre à disposition les informations nécessaires. Le Prestataire garantit la confidentialité et l'objectivité de ses recommandations.</p></div>` },

  { code: 'mgt_change_management', name: "Accord de service de conduite du changement (change management)", category: 'gestion_management', price: 7000, priceMax: 20000,
    description: "Accord pour une mission de conduite du changement accompagnant une évolution majeure (outil, organisation, stratégie).", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nature_changement',label:"Nature du changement à conduire",type:'textarea',required:true},
      {key:'nombre_collaborateurs',label:"Nombre de collaborateurs concernés",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet de conseil",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONDUITE DU CHANGEMENT</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Mission de conduite du changement relative à : <em>{{nature_changement}}</em>, impliquant <strong>{{nombre_collaborateurs}}</strong> collaborateurs.</p><h3>Article 2 – Démarrage</h3><p>La mission débutera le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Livrables</h3><p>Plan de communication, cartographie des parties prenantes, plan de formation, suivi de l'adoption et rapport de clôture.</p><h3>Article 4 – Modèle de référence</h3><p>Le Prestataire s'appuiera sur les modèles reconnus (Kotter, ADKAR, Prosci) adaptés au contexte culturel et organisationnel africain.</p><h3>Article 5 – Indicateurs de succès</h3><p>Taux d'adoption cible, niveau d'engagement des équipes, délai de transition maîtrisé.</p></div>` },

  { code: 'mgt_bpr_reengineering', name: "Accord de service de reengineering des processus (BPR)", category: 'gestion_management', price: 8000, priceMax: 22000,
    description: "Accord de mission BPR (Business Process Reengineering) pour refonte et optimisation des processus clés d'une organisation.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'processus_cibles',label:"Processus ciblés par le reengineering",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REENGINEERING DES PROCESSUS (BPR)</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Refonte en profondeur des processus suivants : {{processus_cibles}}, dans une logique d'amélioration radicale des performances et de réduction des coûts.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Phases de la mission</h3><p>Phase 1 : cartographie des processus actuels (AS-IS). Phase 2 : conception des processus cibles (TO-BE). Phase 3 : plan de déploiement et accompagnement.</p><h3>Article 4 – Gains attendus</h3><p>Réduction des délais de traitement, suppression des tâches sans valeur ajoutée, amélioration de la satisfaction client.</p><h3>Article 5 – Responsabilités</h3><p>Le Client désignera un référent interne pour chaque processus. Le Prestataire assurera la coordination globale de la démarche.</p></div>` },

  { code: 'mgt_lean_management', name: "Accord de service de lean management (amélioration continue)", category: 'gestion_management', price: 6000, priceMax: 18000,
    description: "Accord pour déployer une démarche lean management et d'amélioration continue au sein d'une organisation.", templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'perimetre_lean',label:"Périmètre d'application du lean",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet lean",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LEAN MANAGEMENT</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Déploiement d'une démarche lean management sur le périmètre suivant : {{perimetre_lean}}.</p><h3>Article 2 – Durée</h3><p>Mission du <strong>{{date_debut}}</strong> pour une durée de <strong>{{duree_mission}}</strong>.</p><h3>Article 3 – Outils déployés</h3><p>5S, VSM (cartographie de la chaîne de valeur), Kaizen, résolution de problèmes (A3, 8D), indicateurs de performance opérationnelle.</p><h3>Article 4 – Formation des équipes</h3><p>Le Prestataire assurera la formation et le coaching des équipes terrain pour ancrer la culture de l'amélioration continue.</p><h3>Article 5 – Résultats attendus</h3><p>Réduction des gaspillages (muda), amélioration de la productivité, meilleure qualité de service.</p></div>` },

  { code: 'mgt_qualite_iso9001', name: "Accord de service de management de la qualité (ISO 9001)", category: 'gestion_management', price: 7000, priceMax: 20000,
    description: "Accord de mission pour mettre en place un système de management de la qualité conforme à la norme ISO 9001.", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'version_norme',label:"Version de la norme (ex : ISO 9001:2015)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet qualité",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MANAGEMENT DE LA QUALITÉ</h1><h2>Norme {{version_norme}}</h2><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Mise en place et accompagnement du système de management de la qualité (SMQ) selon la norme {{version_norme}}.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Livrables</h3><p>Manuel qualité, procédures documentées, cartographie des processus, plan d'audit interne, revue de direction.</p><h3>Article 4 – Engagement du Client</h3><p>Le Client s'engage à impliquer sa direction et à désigner un Responsable Qualité interne.</p><h3>Article 5 – Confidentialité et propriété</h3><p>Les documents produits sont la propriété du Client. Le Prestataire en garantit la confidentialité.</p></div>` },

  { code: 'mgt_smi_qse', name: "Accord de service de système de management intégré (QSE)", category: 'gestion_management', price: 9000, priceMax: 26000,
    description: "Accord pour la mise en place d'un système de management intégré Qualité-Sécurité-Environnement (QSE).", templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'normes_applicables',label:"Normes applicables (ISO 9001, 14001, 45001...)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet QSE",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — SYSTÈME DE MANAGEMENT INTÉGRÉ (SMI/QSE)</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Accompagnement à la mise en place d'un Système de Management Intégré couvrant les référentiels : <strong>{{normes_applicables}}</strong>.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Approche intégrée</h3><p>Le Prestataire concevra un SMI mutualisé évitant la duplication des systèmes documentaires, optimisant les ressources et facilitant les audits croisés.</p><h3>Article 4 – Pilotage</h3><p>Comité de pilotage trimestriel et tableau de bord QSE consolidé.</p><h3>Article 5 – Droit applicable</h3><p>Droit OHADA et réglementations sectorielles nationales applicables.</p></div>` },

  { code: 'mgt_certif_iso9001', name: "Accord de service de certification ISO 9001 (accompagnement)", category: 'gestion_management', price: 7500, priceMax: 22000,
    description: "Accord de mission d'accompagnement à la certification ISO 9001 jusqu'à l'audit de certification.", templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'organisme_certificateur',label:"Organisme certificateur visé",type:'text',required:true},
      {key:'date_audit_prevue',label:"Date d'audit de certification prévue",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet d'accompagnement",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ACCOMPAGNEMENT À LA CERTIFICATION ISO 9001</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Accompagnement complet du Client jusqu'à l'obtention de la certification ISO 9001 auprès de <strong>{{organisme_certificateur}}</strong>.</p><h3>Article 2 – Calendrier</h3><p>Audit de certification planifié au <strong>{{date_audit_prevue}}</strong>.</p><h3>Article 3 – Prestations incluses</h3><p>Diagnostic initial, mise à niveau du SMQ, audits blancs, préparation des équipes, assistance lors de l'audit externe.</p><h3>Article 4 – Engagement de résultat</h3><p>Le Prestataire s'engage sur la qualité de l'accompagnement. La décision de certification reste du ressort de l'organisme certificateur.</p><h3>Article 5 – Durée de validité</h3><p>La certification obtenue sera valable 3 ans sous réserve des audits de suivi annuels.</p></div>` },

  { code: 'mgt_erp_deploiement', name: "Accord de service de déploiement d'un ERP (SAP, Odoo, Sage)", category: 'gestion_management', price: 10000, priceMax: 40000,
    description: "Accord de mission pour le déploiement et le paramétrage d'un ERP (SAP, Odoo ou Sage) en entreprise.", templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'solution_erp',label:"Solution ERP choisie (SAP / Odoo / Sage / autre)",type:'text',required:true},
      {key:'modules_deployes',label:"Modules à déployer",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_integrateur',label:"Intégrateur / cabinet",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPLOIEMENT ERP</h1><h2>Solution : {{solution_erp}}</h2><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_integrateur}}</strong> :</p><h3>Article 1 – Objet</h3><p>Déploiement et paramétrage de la solution ERP <strong>{{solution_erp}}</strong> pour les modules suivants : {{modules_deployes}}.</p><h3>Article 2 – Démarrage</h3><p>Projet initié le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Livrables</h3><p>Cahier des charges fonctionnel, ERP paramétré, migration des données, formation utilisateurs, documentation technique et fonctionnelle.</p><h3>Article 4 – Garantie</h3><p>Période de garantie de 3 mois post mise en production, incluant la correction des anomalies.</p><h3>Article 5 – Confidentialité des données</h3><p>Les données du Client traitées dans l'ERP sont strictement confidentielles et protégées conformément aux lois applicables.</p></div>` },

  { code: 'mgt_bsc_tableau_bord', name: "Accord de service de tableau de bord stratégique (BSC Balanced Scorecard)", category: 'gestion_management', price: 6000, priceMax: 18000,
    description: "Accord de mission pour concevoir et déployer un tableau de bord stratégique de type Balanced Scorecard.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'axes_strategiques',label:"Axes stratégiques retenus",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet de conseil",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TABLEAU DE BORD STRATÉGIQUE (BALANCED SCORECARD)</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Conception et déploiement d'un Balanced Scorecard (BSC) couvrant les 4 perspectives classiques (Financière, Client, Processus internes, Apprentissage organisationnel), adaptées aux axes : {{axes_strategiques}}.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Livrables</h3><p>Carte stratégique, sélection des KPI, tableaux de bord par niveau (Direction, Managers, Opérationnel), outil de reporting paramétré.</p><h3>Article 4 – Formation</h3><p>Formation des responsables à la lecture et à l'utilisation du BSC.</p></div>` },

  { code: 'mgt_pca_continuite', name: "Accord de service de plan de continuité des activités (PCA)", category: 'gestion_management', price: 8000, priceMax: 24000,
    description: "Accord de mission pour l'élaboration d'un Plan de Continuité des Activités (PCA/BCP) adapté aux risques africains.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'activites_critiques',label:"Activités critiques à protéger",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet spécialisé",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PLAN DE CONTINUITÉ DES ACTIVITÉS (PCA)</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Élaboration d'un Plan de Continuité des Activités (PCA) couvrant les activités critiques suivantes : {{activites_critiques}}.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Composantes du PCA</h3><p>Analyse des risques et impacts (BIA), stratégies de continuité, procédures de reprise, plan de test et d'exercice, documentation et formation.</p><h3>Article 4 – Contexte africain</h3><p>Le PCA tiendra compte des risques spécifiques au contexte : coupures d'électricité, instabilité réseau, risques climatiques, contraintes logistiques régionales.</p><h3>Article 5 – Revue annuelle</h3><p>Le PCA sera revu et mis à jour annuellement ou après tout incident majeur.</p></div>` },

  // ── Gestion de projet ───────────────────────────────────────────────────
  { code: 'mgt_mgmt_projet_pmi', name: "Accord de service de management de projet (PMI/PRINCE2)", category: 'gestion_management', price: 7000, priceMax: 20000,
    description: "Accord de mission de management de projet selon les standards PMI (PMBOK) ou PRINCE2 pour tout type de projet.", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale du client",type:'text',required:true},
      {key:'nom_projet',label:"Nom du projet",type:'text',required:true},
      {key:'methode_choisie',label:"Méthode retenue (PMI / PRINCE2)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_chef_projet',label:"Nom du chef de projet / cabinet",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MANAGEMENT DE PROJET</h1><h2>Méthode : {{methode_choisie}}</h2><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_chef_projet}}</strong> :</p><h3>Article 1 – Objet</h3><p>Mission de management du projet <strong>«&nbsp;{{nom_projet}}&nbsp;»</strong> selon la méthode <strong>{{methode_choisie}}</strong>.</p><h3>Article 2 – Démarrage</h3><p>Projet initié le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Périmètre de la mission</h3><p>Planification, coordination des équipes, gestion des délais, des coûts, des risques et de la qualité, reporting au commanditaire.</p><h3>Article 4 – Livrables</h3><p>Charte de projet, plan de management, rapports d'avancement périodiques, rapport de clôture.</p><h3>Article 5 – Droit applicable</h3><p>Accord régi par le droit OHADA et les législations nationales.</p></div>` },

  { code: 'mgt_agile_scrum', name: "Accord de service de gestion de projet agile (Scrum/Kanban)", category: 'gestion_management', price: 6000, priceMax: 18000,
    description: "Accord de mission pour le pilotage d'un projet en mode agile (Scrum, Kanban) avec coaching des équipes.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nom_projet',label:"Nom du projet agile",type:'text',required:true},
      {key:'cadre_agile',label:"Cadre agile (Scrum / Kanban / SAFe...)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Agile coach / cabinet",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE PROJET AGILE</h1><h2>Cadre : {{cadre_agile}}</h2><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Pilotage agile du projet <strong>«&nbsp;{{nom_projet}}&nbsp;»</strong> selon le cadre <strong>{{cadre_agile}}</strong>.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Rôles et cérémonies</h3><p>Le Prestataire assumera ou coachera les rôles agiles définis (Scrum Master, Product Owner support), animera les sprints, rétrospectives et revues.</p><h3>Article 4 – Outils</h3><p>Utilisation d'outils collaboratifs adaptés (tableau Kanban, backlog priorisé, burndown chart).</p><h3>Article 5 – Amélioration continue</h3><p>Chaque sprint donnera lieu à une rétrospective d'amélioration continue des pratiques de l'équipe.</p></div>` },

  { code: 'mgt_pmo_bureau_projets', name: "Accord de service de bureau des projets (PMO)", category: 'gestion_management', price: 9000, priceMax: 28000,
    description: "Accord de mission pour la mise en place ou l'animation d'un Project Management Office (PMO) au sein d'une organisation.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'type_pmo',label:"Type de PMO (supportif / de contrôle / directif)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet PMO",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — BUREAU DES PROJETS (PMO)</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Mise en place et animation d'un PMO de type <strong>{{type_pmo}}</strong> pour gouverner le portefeuille de projets du Client.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Missions du PMO</h3><p>Standardisation des méthodes, reporting consolidé, gestion des ressources inter-projets, capitalisation des bonnes pratiques.</p><h3>Article 4 – Gouvernance</h3><p>Le PMO rendra compte au Comité de Direction selon un rythme défini conjointement.</p><h3>Article 5 – Transfert de compétences</h3><p>Le Prestataire assurera le transfert progressif des compétences PMO aux équipes internes du Client.</p></div>` },

  { code: 'mgt_planification_gantt', name: "Accord de service de planification projet (Gantt, jalons)", category: 'gestion_management', price: 4500, priceMax: 12000,
    description: "Accord de service pour la planification détaillée d'un projet avec diagramme de Gantt et jalons de suivi.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nom_projet',label:"Nom du projet",type:'text',required:true},
      {key:'date_debut_projet',label:"Date de début du projet",type:'date',required:true},
      {key:'date_fin_projet',label:"Date de fin prévue",type:'date',required:true},
      {key:'nom_planificateur',label:"Planificateur / cabinet",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PLANIFICATION PROJET</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_planificateur}}</strong> :</p><h3>Article 1 – Objet</h3><p>Élaboration du plan de projet détaillé pour <strong>«&nbsp;{{nom_projet}}&nbsp;»</strong>, incluant le diagramme de Gantt, les jalons clés et le chemin critique.</p><h3>Article 2 – Période du projet</h3><p>Du <strong>{{date_debut_projet}}</strong> au <strong>{{date_fin_projet}}</strong>.</p><h3>Article 3 – Livrables de planification</h3><p>WBS (structure de découpage du projet), diagramme de Gantt, calendrier des jalons, plan de charge des ressources.</p><h3>Article 4 – Mise à jour</h3><p>Le planning sera mis à jour à chaque réunion d'avancement et après tout événement impactant le délai.</p></div>` },

  { code: 'mgt_risques_projet', name: "Accord de service de gestion des risques projet", category: 'gestion_management', price: 5000, priceMax: 14000,
    description: "Accord de mission pour l'identification, l'évaluation et le traitement des risques d'un projet.", templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nom_projet',label:"Nom du projet",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Expert risques / cabinet",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES RISQUES PROJET</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Mission de gestion des risques du projet <strong>«&nbsp;{{nom_projet}}&nbsp;»</strong> : identification, analyse qualitative et quantitative, définition des stratégies de réponse et suivi.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Livrables</h3><p>Registre des risques, matrice de criticité, plans de mitigation, rapports de suivi des risques.</p><h3>Article 4 – Revue des risques</h3><p>Les risques seront revus à chaque comité de pilotage et après tout événement déclencheur.</p></div>` },

  { code: 'mgt_suivi_evaluation', name: "Accord de service de suivi-évaluation de projet (cadre logique)", category: 'gestion_management', price: 5500, priceMax: 16000,
    description: "Accord de mission de suivi et évaluation d'un projet de développement selon le cadre logique.", templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'raison_sociale',label:"Organisation cliente",type:'text',required:true},
      {key:'nom_projet',label:"Nom du projet",type:'text',required:true},
      {key:'financeur',label:"Bailleur / financeur du projet",type:'text',required:false},
      {key:'date_debut',label:"Date de démarrage du suivi",type:'date',required:true},
      {key:'nom_evaluateur',label:"Cabinet d'évaluation",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUIVI-ÉVALUATION DE PROJET</h1><h2>Cadre logique</h2><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_evaluateur}}</strong> :</p><h3>Article 1 – Objet</h3><p>Mission de suivi et d'évaluation du projet <strong>«&nbsp;{{nom_projet}}&nbsp;»</strong> financé par <strong>{{financeur}}</strong>, sur la base du cadre logique validé.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Cadre de référence</h3><p>Matrice du cadre logique (objectifs, résultats, activités, indicateurs, sources de vérification, hypothèses).</p><h3>Article 4 – Rapports</h3><p>Rapports trimestriels de suivi, évaluation à mi-parcours et évaluation finale selon les exigences du bailleur.</p></div>` },

  { code: 'mgt_rapport_avancement', name: "Accord de service de rapport d'avancement projet", category: 'gestion_management', price: 4000, priceMax: 10000,
    description: "Accord de service pour la rédaction périodique des rapports d'avancement d'un projet.", templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nom_projet',label:"Nom du projet",type:'text',required:true},
      {key:'periodicite',label:"Périodicité des rapports (mensuel / trimestriel...)",type:'text',required:true},
      {key:'date_premier_rapport',label:"Date du premier rapport",type:'date',required:true},
      {key:'nom_prestataire',label:"Prestataire rédacteur",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RAPPORTS D'AVANCEMENT PROJET</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_prestataire}}</strong> :</p><h3>Article 1 – Objet</h3><p>Rédaction des rapports d'avancement <strong>{{periodicite}}</strong> du projet <strong>«&nbsp;{{nom_projet}}&nbsp;»</strong>.</p><h3>Article 2 – Premier rapport</h3><p>Le premier rapport sera remis le <strong>{{date_premier_rapport}}</strong>.</p><h3>Article 3 – Contenu type</h3><p>Chaque rapport comprendra : avancement physique et financier, activités réalisées, écarts par rapport au plan, risques actifs, prochaines étapes.</p><h3>Article 4 – Format et diffusion</h3><p>Format convenu entre les parties ; diffusion aux parties prenantes désignées par le Client.</p></div>` },

  { code: 'mgt_cloture_projet', name: "Accord de service de clôture et bilan de projet", category: 'gestion_management', price: 4500, priceMax: 12000,
    description: "Accord de service pour la clôture administrative, technique et financière d'un projet et la rédaction du bilan final.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nom_projet',label:"Nom du projet",type:'text',required:true},
      {key:'date_cloture',label:"Date de clôture effective",type:'date',required:true},
      {key:'nom_prestataire',label:"Prestataire",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CLÔTURE ET BILAN DE PROJET</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_prestataire}}</strong> :</p><h3>Article 1 – Objet</h3><p>Mission de clôture du projet <strong>«&nbsp;{{nom_projet}}&nbsp;»</strong> incluant la clôture administrative, technique et financière, ainsi que la rédaction du bilan final.</p><h3>Article 2 – Date de clôture</h3><p>Clôture effective le <strong>{{date_cloture}}</strong>.</p><h3>Article 3 – Livrables de clôture</h3><p>Rapport de clôture, bilan des réalisations vs. objectifs, leçons apprises (lessons learned), archivage documentaire, transfert aux équipes opérationnelles.</p><h3>Article 4 – Capitalisation</h3><p>Les leçons apprises seront formalisées et partagées pour améliorer les projets futurs.</p></div>` },

  { code: 'mgt_programme_multiprojets', name: "Accord de service de gestion de programme (multi-projets)", category: 'gestion_management', price: 9000, priceMax: 28000,
    description: "Accord de mission de gestion de programme regroupant plusieurs projets liés à un objectif stratégique commun.", templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nom_programme',label:"Nom du programme",type:'text',required:true},
      {key:'nombre_projets',label:"Nombre de projets composant le programme",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_directeur_programme',label:"Directeur de programme / cabinet",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE PROGRAMME (MULTI-PROJETS)</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_directeur_programme}}</strong> :</p><h3>Article 1 – Objet</h3><p>Direction du programme <strong>«&nbsp;{{nom_programme}}&nbsp;»</strong> composé de <strong>{{nombre_projets}}</strong> projets interdépendants, depuis le <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Gouvernance du programme</h3><p>Comité de direction du programme, coordination des chefs de projet, gestion des interfaces et des dépendances inter-projets.</p><h3>Article 3 – Livrables</h3><p>Plan directeur du programme, tableau de bord consolidé, rapport de programme mensuel, bilan final.</p><h3>Article 4 – Bénéfices attendus</h3><p>Cohérence stratégique, synergies entre projets, optimisation des ressources partagées.</p></div>` },

  { code: 'mgt_portefeuille_projets', name: "Accord de service de gestion de portefeuille de projets", category: 'gestion_management', price: 10000, priceMax: 30000,
    description: "Accord de mission pour la gestion stratégique du portefeuille de projets d'une organisation.", templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nombre_projets_portefeuille',label:"Nombre de projets dans le portefeuille",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage de la mission",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — GESTION DE PORTEFEUILLE DE PROJETS</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Mission de gestion et d'optimisation du portefeuille de <strong>{{nombre_projets_portefeuille}}</strong> projets de l'organisation, depuis le <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Périmètre</h3><p>Priorisation stratégique des projets, allocation optimale des ressources, arbitrages budgétaires, alignement sur la stratégie d'entreprise.</p><h3>Article 3 – Gouvernance</h3><p>Revue de portefeuille trimestrielle en Comité de Direction, tableau de bord synthétique.</p><h3>Article 4 – Livrables</h3><p>Cartographie du portefeuille, critères de priorisation, rapport de portefeuille, recommandations stratégiques.</p></div>` },

  // ── Consulting RH avancé ────────────────────────────────────────────────
  { code: 'mgt_conseil_org_rh', name: "Accord de service de conseil en organisation et RH (organigramme)", category: 'gestion_management', price: 6000, priceMax: 18000,
    description: "Accord de mission de conseil en organisation et ressources humaines incluant la conception de l'organigramme.", templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'effectif_total',label:"Effectif total de l'entreprise",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet RH",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN ORGANISATION ET RH</h1><p>Entre <strong>{{raison_sociale}}</strong> (effectif : <strong>{{effectif_total}}</strong> personnes) et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Audit organisationnel, conception de la structure optimale et élaboration de l'organigramme cible, incluant la définition des fonctions et des lignes d'autorité.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Livrables</h3><p>Rapport d'audit organisationnel, organigramme actuel vs. cible, fiches de poste-clés, plan de transition organisationnelle.</p><h3>Article 4 – Concertation sociale</h3><p>Le Prestataire s'assurera que la démarche est conduite en cohérence avec les obligations légales OHADA en matière de dialogue social.</p></div>` },

  { code: 'mgt_evaluation_postes', name: "Accord de service d'évaluation des postes et classification (grille)", category: 'gestion_management', price: 6500, priceMax: 18000,
    description: "Accord de mission pour l'évaluation des postes de travail et la mise en place d'une grille de classification.", templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nombre_postes',label:"Nombre de postes à évaluer",type:'text',required:true},
      {key:'methode_evaluation',label:"Méthode d'évaluation (Hay / Mercer / autre)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet RH",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉVALUATION DES POSTES ET CLASSIFICATION</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Évaluation de <strong>{{nombre_postes}}</strong> postes selon la méthode <strong>{{methode_evaluation}}</strong> et élaboration d'une grille de classification adaptée au contexte OHADA.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Livrables</h3><p>Fiches d'évaluation par poste, grille de classification et de coefficients, rapport de recommandations.</p><h3>Article 4 – Confidentialité</h3><p>Les résultats d'évaluation sont strictement confidentiels et réservés à l'usage interne du Client.</p></div>` },

  { code: 'mgt_politique_remuneration', name: "Accord de service de politique de rémunération (benchmark salaires CI)", category: 'gestion_management', price: 7000, priceMax: 20000,
    description: "Accord de mission pour définir une politique de rémunération compétitive, avec benchmark des salaires en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'secteur_reference',label:"Secteur de référence pour le benchmark",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet RH",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — POLITIQUE DE RÉMUNÉRATION</h1><h2>Benchmark salaires — Côte d'Ivoire</h2><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Définition d'une politique de rémunération globale (fixe, variable, avantages) compétitive sur le marché ivoirien, secteur <strong>{{secteur_reference}}</strong>.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Méthodologie</h3><p>Benchmark des rémunérations de marché (CI et zone UEMOA), analyse de l'équité interne, recommandations structurelles et plan de mise en œuvre.</p><h3>Article 4 – Livrables</h3><p>Rapport de benchmark, grille de salaires recommandée, politique de rémunération variable, plan de communication interne.</p></div>` },

  { code: 'mgt_plan_succession', name: "Accord de service de plan de succession (talent management)", category: 'gestion_management', price: 7000, priceMax: 20000,
    description: "Accord de mission pour élaborer un plan de succession des postes clés et une politique de gestion des talents.", templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'postes_cles',label:"Postes clés concernés",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet RH",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PLAN DE SUCCESSION ET TALENT MANAGEMENT</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Élaboration d'un plan de succession pour les postes clés suivants : {{postes_cles}}, et mise en place d'un processus de gestion des talents.</p><h3>Article 2 – Démarrage</h3><p>Mission initiée le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Livrables</h3><p>Cartographie des talents, plan de succession formalisé, plans de développement individuels (PDI), critères d'identification des hauts potentiels.</p><h3>Article 4 – Confidentialité</h3><p>Les informations relatives aux collaborateurs évalués sont strictement confidentielles.</p></div>` },

  { code: 'mgt_assessment_center', name: "Accord de service d'assessment center (évaluation dirigeants)", category: 'gestion_management', price: 8000, priceMax: 25000,
    description: "Accord de mission pour la réalisation d'un assessment center destiné à l'évaluation de dirigeants ou de cadres supérieurs.", templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nombre_evaluations',label:"Nombre de personnes à évaluer",type:'text',required:true},
      {key:'poste_vise',label:"Poste(s) visé(s)",type:'text',required:true},
      {key:'date_session',label:"Date de la session",type:'date',required:true},
      {key:'nom_cabinet',label:"Cabinet d'évaluation",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ASSESSMENT CENTER</h1><h2>Évaluation de dirigeants</h2><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_cabinet}}</strong> :</p><h3>Article 1 – Objet</h3><p>Organisation d'un assessment center pour <strong>{{nombre_evaluations}}</strong> candidats au(x) poste(s) de <strong>{{poste_vise}}</strong>.</p><h3>Article 2 – Date de session</h3><p>Session planifiée le <strong>{{date_session}}</strong>.</p><h3>Article 3 – Méthodes utilisées</h3><p>Mises en situation, études de cas, entretiens structurés, tests psychométriques, exercices de groupe ; le tout adapté au contexte africain.</p><h3>Article 4 – Restitution</h3><p>Rapport individuel confidentiel par participant, recommandation de sélection ou de développement.</p><h3>Article 5 – Déontologie</h3><p>Le Prestataire s'engage à respecter les principes déontologiques de l'évaluation professionnelle.</p></div>` },

  { code: 'mgt_coaching_executif', name: "Accord de service de coaching exécutif (PDG, DG)", category: 'gestion_management', price: 8000, priceMax: 24000,
    description: "Accord de mission de coaching exécutif individuel pour un dirigeant (PDG, DG, Directeur).", templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nom_coache',label:"Nom du dirigeant coaché",type:'text',required:true},
      {key:'fonction_coache',label:"Fonction du coaché",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'date_debut',label:"Date de la première séance",type:'date',required:true},
      {key:'nom_coach',label:"Nom du coach",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COACHING EXÉCUTIF</h1><p>Entre <strong>{{raison_sociale}}</strong>, représentée par <strong>{{nom_coache}}</strong>, <strong>{{fonction_coache}}</strong>, et le Coach <strong>{{nom_coach}}</strong> :</p><h3>Article 1 – Objet</h3><p>Accompagnement en coaching individuel de <strong>{{nom_coache}}</strong>, sur <strong>{{nombre_seances}}</strong> séances, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Cadre déontologique</h3><p>La relation de coaching est fondée sur la confidentialité totale, le respect de l'autonomie du coaché et la non-ingérence dans les décisions de l'organisation.</p><h3>Article 3 – Objectifs de développement</h3><p>Définis conjointement lors de la première séance et formalisés dans un plan de développement individuel.</p><h3>Article 4 – Résiliation</h3><p>Chaque partie peut mettre fin au coaching à tout moment, avec un préavis de 15 jours.</p></div>` },

  { code: 'mgt_team_building', name: "Accord de service de team building et cohésion d'équipe", category: 'gestion_management', price: 5000, priceMax: 15000,
    description: "Accord de service pour l'organisation et l'animation d'un séminaire de team building et cohésion d'équipe.", templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nombre_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'lieu_evenement',label:"Lieu de l'événement",type:'text',required:true},
      {key:'nom_prestataire',label:"Prestataire animateur",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TEAM BUILDING</h1><h2>Cohésion et performance d'équipe</h2><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_prestataire}}</strong> :</p><h3>Article 1 – Objet</h3><p>Organisation et animation d'un événement de team building pour <strong>{{nombre_participants}}</strong> participants, le <strong>{{date_evenement}}</strong> à <strong>{{lieu_evenement}}</strong>.</p><h3>Article 2 – Programme</h3><p>Le Prestataire concevra un programme adapté aux objectifs du Client (cohésion, communication, leadership, coopération), incluant des activités culturellement appropriées au contexte africain.</p><h3>Article 3 – Livrables</h3><p>Programme détaillé, animation de la journée, compte rendu et recommandations post-événement.</p><h3>Article 4 – Logistique</h3><p>La responsabilité logistique (transport, repas, hébergement) sera définie en annexe.</p></div>` },

  { code: 'mgt_mediation_org', name: "Accord de service de médiation organisationnelle (conflits inter-équipes)", category: 'gestion_management', price: 5500, priceMax: 16000,
    description: "Accord de mission de médiation organisationnelle pour résoudre des conflits entre équipes ou services.", templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'parties_en_conflit',label:"Équipes / services en conflit",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la médiation",type:'date',required:true},
      {key:'nom_mediateur',label:"Médiateur / cabinet",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MÉDIATION ORGANISATIONNELLE</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_mediateur}}</strong> :</p><h3>Article 1 – Objet</h3><p>Mission de médiation organisationnelle entre les parties suivantes : {{parties_en_conflit}}, démarrée le <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Principes de la médiation</h3><p>Neutralité, impartialité, confidentialité, volontariat des parties, respect mutuel.</p><h3>Article 3 – Processus</h3><p>Entretiens individuels, sessions de médiation conjointe, élaboration d'un accord de sortie de conflit signé par les parties.</p><h3>Article 4 – Confidentialité</h3><p>Toutes les informations divulguées lors de la médiation sont strictement confidentielles.</p><h3>Article 5 – Issue</h3><p>En cas d'accord, un protocole de résolution sera formalisé. En cas d'échec, le médiateur en informera la Direction sans en divulguer les détails.</p></div>` },

  { code: 'mgt_outplacement', name: "Accord de service d'outplacement (reclassement cadre)", category: 'gestion_management', price: 6000, priceMax: 18000,
    description: "Accord de service d'outplacement pour accompagner le reclassement professionnel d'un cadre en transition.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale (entreprise mandante)",type:'text',required:true},
      {key:'nom_beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'poste_quitte',label:"Poste quitté",type:'text',required:true},
      {key:'date_debut',label:"Date de début du programme",type:'date',required:true},
      {key:'nom_cabinet',label:"Cabinet d'outplacement",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'OUTPLACEMENT</h1><h2>Reclassement de cadre</h2><p>Entre <strong>{{raison_sociale}}</strong> (mandante) et <strong>{{nom_cabinet}}</strong> pour le bénéfice de <strong>{{nom_beneficiaire}}</strong>, ancien(ne) <strong>{{poste_quitte}}</strong> :</p><h3>Article 1 – Objet</h3><p>Programme d'outplacement individuel démarrant le <strong>{{date_debut}}</strong>, visant le reclassement professionnel du bénéficiaire.</p><h3>Article 2 – Services inclus</h3><p>Bilan de compétences, définition du projet professionnel, techniques de recherche d'emploi, activation du réseau, coaching individuel, accompagnement jusqu'à la prise de poste.</p><h3>Article 3 – Durée</h3><p>Programme d'une durée maximale de 6 mois, renouvelable selon accord.</p><h3>Article 4 – Confidentialité</h3><p>L'identité et la situation du bénéficiaire sont strictement confidentielles.</p></div>` },

  { code: 'mgt_bilan_360', name: "Accord de service de bilan professionnel 360°", category: 'gestion_management', price: 5000, priceMax: 14000,
    description: "Accord de mission pour la réalisation d'un bilan professionnel 360° destiné à un manager ou cadre.", templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nom_evalue',label:"Nom du collaborateur évalué",type:'text',required:true},
      {key:'nombre_evaluateurs',label:"Nombre d'évaluateurs (pairs, supérieurs, subordonnés)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du processus",type:'date',required:true},
      {key:'nom_cabinet',label:"Cabinet",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BILAN PROFESSIONNEL 360°</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_cabinet}}</strong> pour le bénéfice de <strong>{{nom_evalue}}</strong> :</p><h3>Article 1 – Objet</h3><p>Réalisation d'un bilan professionnel 360° impliquant <strong>{{nombre_evaluateurs}}</strong> évaluateurs (pairs, supérieurs hiérarchiques, collaborateurs directs), démarrant le <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Outil d'évaluation</h3><p>Questionnaire 360° anonymisé, couvrant les compétences managériales, comportementales et relationnelles.</p><h3>Article 3 – Restitution</h3><p>Rapport individuel complet, séance de restitution individuelle, plan de développement personnalisé.</p><h3>Article 4 – Confidentialité</h3><p>Les réponses des évaluateurs sont anonymisées. Le rapport est remis exclusivement au bénéficiaire et, avec son accord, à la DRH.</p></div>` },

  // ── Gestion administrative ──────────────────────────────────────────────
  { code: 'mgt_secretariat_direction', name: "Accord de service de secrétariat de direction externalisé", category: 'gestion_management', price: 4000, priceMax: 10000,
    description: "Accord de service pour l'externalisation du secrétariat de direction (assistance, agenda, courriers).", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'volume_heures',label:"Volume d'heures mensuelles",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_prestataire',label:"Prestataire secrétariat",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SECRÉTARIAT DE DIRECTION EXTERNALISÉ</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_prestataire}}</strong> :</p><h3>Article 1 – Objet</h3><p>Prestation de secrétariat de direction externalisé à hauteur de <strong>{{volume_heures}}</strong> heures par mois, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Prestations incluses</h3><p>Gestion de l'agenda de la Direction, rédaction de courriers et comptes rendus, accueil téléphonique, gestion du courrier entrant/sortant, organisation de réunions.</p><h3>Article 3 – Confidentialité</h3><p>Le Prestataire s'engage à la plus stricte confidentialité sur toutes les informations traitées.</p><h3>Article 4 – Matériel</h3><p>Le Client met à disposition les outils nécessaires à l'exercice de la mission (téléphone, ordinateur, accès systèmes).</p></div>` },

  { code: 'mgt_ged_documentaire', name: "Accord de service de gestion documentaire (GED)", category: 'gestion_management', price: 5500, priceMax: 16000,
    description: "Accord de service pour la mise en place et l'exploitation d'un système de gestion électronique des documents (GED).", templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'volume_documents',label:"Volume estimé de documents à gérer",type:'text',required:true},
      {key:'solution_ged',label:"Solution GED retenue",type:'text',required:false},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_prestataire',label:"Prestataire GED",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DOCUMENTAIRE (GED)</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_prestataire}}</strong> :</p><h3>Article 1 – Objet</h3><p>Mise en place et exploitation d'un système GED pour un volume de <strong>{{volume_documents}}</strong> documents, solution retenue : <strong>{{solution_ged}}</strong>, démarrant le <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Périmètre</h3><p>Numérisation, indexation, classement, gestion des droits d'accès, workflow de validation, archivage électronique.</p><h3>Article 3 – Conformité</h3><p>Le système respectera les obligations légales en matière d'archivage et de protection des données (droit OHADA, réglementations nationales).</p><h3>Article 4 – Sauvegarde</h3><p>Des sauvegardes régulières garantiront l'intégrité et la disponibilité des documents.</p></div>` },

  { code: 'mgt_archives_records', name: "Accord de service de gestion des archives (records management)", category: 'gestion_management', price: 5000, priceMax: 14000,
    description: "Accord de service pour la gestion professionnelle des archives physiques et numériques d'une organisation.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'type_archives',label:"Types d'archives concernées",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_prestataire',label:"Prestataire archives",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES ARCHIVES (RECORDS MANAGEMENT)</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_prestataire}}</strong> :</p><h3>Article 1 – Objet</h3><p>Gestion professionnelle des archives suivantes : {{type_archives}}, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Prestations</h3><p>Tri, classement, cotation, inventaire, conditionnement, traitement des délais de conservation, destruction sécurisée des documents arrivés à échéance.</p><h3>Article 3 – Plan de classement</h3><p>Le Prestataire établira un plan de classement conforme aux bonnes pratiques et aux obligations légales ivoiriennes.</p><h3>Article 4 – Confidentialité</h3><p>Les archives du Client sont strictement confidentielles. Aucun document ne sera communiqué à des tiers sans autorisation écrite.</p></div>` },

  { code: 'mgt_reporting_direction', name: "Accord de service de reporting direction (management report)", category: 'gestion_management', price: 5000, priceMax: 14000,
    description: "Accord de service pour la conception et la production régulière du rapport de management à destination de la Direction.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'periodicite',label:"Périodicité du reporting (mensuel / trimestriel...)",type:'text',required:true},
      {key:'destinataires',label:"Destinataires du rapport",type:'text',required:true},
      {key:'date_premier_rapport',label:"Date du premier rapport",type:'date',required:true},
      {key:'nom_prestataire',label:"Prestataire reporting",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REPORTING DIRECTION</h1><h2>Management Report</h2><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_prestataire}}</strong> :</p><h3>Article 1 – Objet</h3><p>Production du rapport de management <strong>{{periodicite}}</strong> à destination de : <strong>{{destinataires}}</strong>, premier rapport attendu le <strong>{{date_premier_rapport}}</strong>.</p><h3>Article 2 – Contenu type</h3><p>Synthèse financière, indicateurs opérationnels, tableaux de bord commerciaux, alertes et faits marquants, recommandations.</p><h3>Article 3 – Données sources</h3><p>Le Client fournit les données brutes dans les délais convenus. Le Prestataire en assure le traitement et la mise en forme.</p><h3>Article 4 – Délais de remise</h3><p>Le rapport sera remis dans un délai maximum de 5 jours ouvrables après réception des données sources.</p></div>` },

  { code: 'mgt_procedures_qualite', name: "Accord de service de rédaction de procédures (manuel qualité)", category: 'gestion_management', price: 5500, priceMax: 15000,
    description: "Accord de service pour la rédaction et la formalisation des procédures et du manuel qualité d'une organisation.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nombre_procedures',label:"Nombre de procédures à rédiger",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_prestataire',label:"Prestataire rédacteur",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉDACTION DE PROCÉDURES</h1><h2>Manuel qualité</h2><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_prestataire}}</strong> :</p><h3>Article 1 – Objet</h3><p>Rédaction de <strong>{{nombre_procedures}}</strong> procédures et du manuel qualité, démarrée le <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Méthode</h3><p>Interviews des responsables de processus, formalisation selon le standard ISO (logigramme, description narrative, responsabilités, indicateurs).</p><h3>Article 3 – Validation</h3><p>Chaque procédure sera soumise à validation par le responsable de processus avant finalisation.</p><h3>Article 4 – Propriété</h3><p>Les procédures rédigées sont la propriété exclusive du Client dès complet paiement.</p></div>` },

  { code: 'mgt_contract_management', name: "Accord de service de gestion des contrats (contract management)", category: 'gestion_management', price: 6000, priceMax: 17000,
    description: "Accord de service pour la gestion centralisée et le suivi du portefeuille de contrats d'une organisation.", templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'volume_contrats',label:"Volume de contrats à gérer",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_prestataire',label:"Prestataire contract management",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES CONTRATS</h1><h2>Contract Management</h2><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_prestataire}}</strong> :</p><h3>Article 1 – Objet</h3><p>Gestion du portefeuille de <strong>{{volume_contrats}}</strong> contrats du Client, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Prestations</h3><p>Inventaire et référencement des contrats, suivi des échéances, alertes de renouvellement, analyse des clauses critiques, reporting contractuel.</p><h3>Article 3 – Outil de suivi</h3><p>Mise en place d'un tableau de bord contractuel actualisé mensuellement.</p><h3>Article 4 – Conformité OHADA</h3><p>La gestion des contrats respecte les dispositions de l'Acte uniforme OHADA sur le droit des obligations et des contrats.</p></div>` },

  { code: 'mgt_processus_admin', name: "Accord de service d'amélioration des processus administratifs", category: 'gestion_management', price: 5500, priceMax: 15000,
    description: "Accord de mission pour analyser et améliorer les processus administratifs d'une organisation.", templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'processus_cibles',label:"Processus administratifs ciblés",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet de conseil",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AMÉLIORATION DES PROCESSUS ADMINISTRATIFS</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Diagnostic et amélioration des processus administratifs suivants : {{processus_cibles}}, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Méthodologie</h3><p>Cartographie des processus actuels (AS-IS), identification des dysfonctionnements, conception des processus optimisés (TO-BE), plan de déploiement.</p><h3>Article 3 – Livrables</h3><p>Rapport de diagnostic, cartographies des processus, nouvelles procédures, formation des équipes.</p><h3>Article 4 – Gains attendus</h3><p>Réduction des délais, suppression des doublons, meilleure traçabilité des opérations administratives.</p></div>` },

  { code: 'mgt_compliance', name: "Accord de service de conformité réglementaire (compliance)", category: 'gestion_management', price: 7000, priceMax: 20000,
    description: "Accord de mission pour l'évaluation et la mise en conformité réglementaire d'une organisation (OHADA, fiscalité, CNIL locale).", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'domaines_compliance',label:"Domaines de conformité concernés",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_consultant',label:"Cabinet compliance",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONFORMITÉ RÉGLEMENTAIRE (COMPLIANCE)</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_consultant}}</strong> :</p><h3>Article 1 – Objet</h3><p>Mission de compliance portant sur : {{domaines_compliance}}, démarrée le <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Référentiels applicables</h3><p>Droit OHADA, législation ivoirienne, réglementations sectorielles (BCEAO, ARTCI, AMF-UMOA selon secteur), normes internationales (ISO 37301).</p><h3>Article 3 – Livrables</h3><p>Diagnostic de conformité, gap analysis, plan de mise en conformité, politique de conformité interne, formation des équipes.</p><h3>Article 4 – Responsabilité</h3><p>Le Prestataire apporte son expertise conseil ; la responsabilité de la mise en conformité effective incombe au Client.</p></div>` },

  { code: 'mgt_vendor_management', name: "Accord de service de gestion des fournisseurs (vendor management)", category: 'gestion_management', price: 5500, priceMax: 15000,
    description: "Accord de service pour la gestion et l'évaluation du panel fournisseurs d'une organisation.", templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'nombre_fournisseurs',label:"Nombre de fournisseurs dans le panel",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_prestataire',label:"Prestataire vendor management",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES FOURNISSEURS (VENDOR MANAGEMENT)</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_prestataire}}</strong> :</p><h3>Article 1 – Objet</h3><p>Gestion et évaluation du panel de <strong>{{nombre_fournisseurs}}</strong> fournisseurs du Client, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Prestations</h3><p>Référencement des fournisseurs, grille d'évaluation des performances, audits fournisseurs, gestion des non-conformités, tableau de bord achats.</p><h3>Article 3 – Critères d'évaluation</h3><p>Qualité, délais, prix, conformité réglementaire, stabilité financière, responsabilité sociale.</p><h3>Article 4 – Reporting</h3><p>Rapport d'évaluation semestriel des fournisseurs et recommandations de requalification ou exclusion.</p></div>` },

  { code: 'mgt_moyens_generaux', name: "Accord de service de gestion des moyens généraux", category: 'gestion_management', price: 5000, priceMax: 14000,
    description: "Accord de service pour la gestion externalisée des moyens généraux d'une entreprise (parc auto, immobilier, fournitures, sécurité).", templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'perimetre_mg',label:"Périmètre des moyens généraux",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'nom_prestataire',label:"Prestataire",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES MOYENS GÉNÉRAUX</h1><p>Entre <strong>{{raison_sociale}}</strong> et <strong>{{nom_prestataire}}</strong> :</p><h3>Article 1 – Objet</h3><p>Gestion des moyens généraux suivants : {{perimetre_mg}}, à compter du <strong>{{date_debut}}</strong>.</p><h3>Article 2 – Prestations</h3><p>Gestion du parc véhicules, suivi immobilier et maintenance des locaux, gestion des stocks de fournitures, coordination des prestataires de services généraux, contrôle des accès.</p><h3>Article 3 – Reporting</h3><p>Rapport mensuel des dépenses de moyens généraux et indicateurs de performance (disponibilité, coûts, consommations).</p><h3>Article 4 – Budget</h3><p>Le Prestataire gère les moyens généraux dans le cadre du budget annuel validé par le Client.</p></div>` },

  // ── Documents de synthèse ───────────────────────────────────────────────
  { code: 'mgt_rapport_diagnostic_org', name: "Rapport de diagnostic organisationnel", category: 'gestion_management', price: 6000, priceMax: 18000,
    description: "Rapport formalisé de diagnostic organisationnel couvrant la structure, les processus, les ressources humaines et la gouvernance.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale diagnostiquée",type:'text',required:true},
      {key:'date_diagnostic',label:"Date du diagnostic",type:'date',required:true},
      {key:'nom_cabinet',label:"Cabinet ayant conduit le diagnostic",type:'text',required:true},
      {key:'principales_conclusions',label:"Principales conclusions du diagnostic",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE DIAGNOSTIC ORGANISATIONNEL</h1><h2>{{raison_sociale}}</h2><p><strong>Date :</strong> {{date_diagnostic}} | <strong>Cabinet :</strong> {{nom_cabinet}}</p><h3>1. Résumé Exécutif</h3><p>{{principales_conclusions}}</p><h3>2. Méthodologie</h3><p>Le diagnostic a combiné des entretiens individuels avec les managers clés, l'analyse documentaire, des observations terrain et des benchmarks sectoriels.</p><h3>3. Analyse de la structure organisationnelle</h3><p>Évaluation de l'organigramme, des lignes d'autorité, des spans of control et de l'adéquation structure/stratégie.</p><h3>4. Analyse des processus clés</h3><p>Cartographie et évaluation des processus opérationnels, de support et de pilotage.</p><h3>5. Analyse des ressources humaines</h3><p>Compétences disponibles, gaps identifiés, climat social, politique RH.</p><h3>6. Gouvernance et système de management</h3><p>Évaluation des mécanismes de gouvernance, de reporting et de prise de décision.</p><h3>7. Forces et axes d'amélioration</h3><p>Synthèse SWOT organisationnelle et plan d'action prioritaire.</p><p><em>Document confidentiel — usage interne exclusif.</em></p></div>` },

  { code: 'mgt_rapport_performance_annuel', name: "Rapport de performance annuel (tableaux de bord direction)", category: 'gestion_management', price: 6000, priceMax: 18000,
    description: "Rapport de performance annuel consolidant les tableaux de bord de direction pour présentation aux organes de gouvernance.", templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'annee_reference',label:"Année de référence",type:'text',required:true},
      {key:'date_rapport',label:"Date d'arrêté du rapport",type:'date',required:true},
      {key:'auteur_rapport',label:"Auteur / Direction en charge",type:'text',required:true},
      {key:'faits_marquants',label:"Faits marquants de l'année",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE ANNUEL {{annee_reference}}</h1><h2>{{raison_sociale}}</h2><p><strong>Date d'arrêté :</strong> {{date_rapport}} | <strong>Auteur :</strong> {{auteur_rapport}}</p><h3>1. Faits marquants de l'exercice</h3><p>{{faits_marquants}}</p><h3>2. Résultats financiers</h3><p>Chiffre d'affaires, résultat net, marges, trésorerie — analyse des écarts vs. budget et vs. année précédente.</p><h3>3. Performance commerciale</h3><p>Volume d'affaires, nouveaux clients, taux de fidélisation, satisfaction client.</p><h3>4. Performance opérationnelle</h3><p>Productivité, qualité, délais, indicateurs de processus clés.</p><h3>5. Performance RH</h3><p>Effectifs, turnover, formation, masse salariale, absentéisme.</p><h3>6. Perspectives {{annee_reference}}</h3><p>Objectifs de l'exercice suivant et leviers d'action prioritaires.</p><p><em>Rapport confidentiel — usage interne et présentation aux organes de gouvernance.</em></p></div>` },

  { code: 'mgt_plan_developpement_org', name: "Plan de développement organisationnel", category: 'gestion_management', price: 7000, priceMax: 22000,
    description: "Document formalisant le plan de développement organisationnel pluriannuel d'une entreprise ou institution.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (ex : 2025-2028)",type:'text',required:true},
      {key:'vision_organisation',label:"Vision de l'organisation",type:'textarea',required:true},
      {key:'date_validation',label:"Date de validation du plan",type:'date',required:true},
      {key:'directeur_general',label:"Nom du Directeur Général",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT ORGANISATIONNEL</h1><h2>{{raison_sociale}} — {{horizon_plan}}</h2><p><strong>Validé le :</strong> {{date_validation}} par <strong>{{directeur_general}}</strong>, Directeur Général</p><h3>1. Notre Vision</h3><p>{{vision_organisation}}</p><h3>2. Analyse de la situation actuelle</h3><p>Forces et faiblesses organisationnelles identifiées ; opportunités et menaces de l'environnement.</p><h3>3. Orientations stratégiques de développement</h3><p>Axes prioritaires retenus pour la période {{horizon_plan}} : développement des capacités, optimisation des processus, renforcement de la gouvernance, développement humain, innovation.</p><h3>4. Feuille de route</h3><p>Initiatives prioritaires, responsables, ressources, indicateurs de suivi et jalons annuels.</p><h3>5. Budget de développement</h3><p>Enveloppe budgétaire allouée et sources de financement.</p><h3>6. Gouvernance du plan</h3><p>Mécanismes de suivi, revue annuelle et ajustements.</p><p><em>Approuvé par le Conseil d'Administration / organe de gouvernance compétent.</em></p></div>` },

  { code: 'mgt_manuel_gouvernance', name: "Manuel de gestion et de gouvernance d'entreprise", category: 'gestion_management', price: 8000, priceMax: 25000,
    description: "Manuel formalisant les règles de gestion et de gouvernance d'entreprise, applicable dans le contexte OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'forme_juridique',label:"Forme juridique (SA / SARL / SAS OHADA...)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption du manuel",type:'date',required:true},
      {key:'president_dg',label:"Président / Directeur Général",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>MANUEL DE GESTION ET DE GOUVERNANCE D'ENTREPRISE</h1><h2>{{raison_sociale}} — {{forme_juridique}}</h2><p><strong>Adopté le :</strong> {{date_adoption}} | <strong>Signé par :</strong> {{president_dg}}</p><h3>Chapitre 1 — Gouvernance et organes de direction</h3><p>Composition et rôles du Conseil d'Administration / Conseil de Surveillance, du Directoire, de la Direction Générale. Règles de convocation, de délibération et de quorum, conformément à l'Acte uniforme OHADA sur les sociétés commerciales.</p><h3>Chapitre 2 — Délégations de pouvoirs et de signatures</h3><p>Matrice des délégations : seuils d'engagement, pouvoirs de signature, règles de co-signature.</p><h3>Chapitre 3 — Gestion financière et contrôle interne</h3><p>Procédures budgétaires, contrôle des dépenses, gestion de trésorerie, audit interne, gestion des risques financiers.</p><h3>Chapitre 4 — Gestion des ressources humaines</h3><p>Politique RH, recrutement, évaluation, rémunération, formation, gestion des conflits, discipline.</p><h3>Chapitre 5 — Éthique et conformité</h3><p>Code de conduite, politique anticorruption, gestion des conflits d'intérêts, protection des données.</p><h3>Chapitre 6 — Communication et relations avec les parties prenantes</h3><p>Communication interne et externe, relations actionnaires, politique RSE.</p><p><em>Ce manuel est révisable annuellement par la Direction Générale.</em></p></div>` },

  { code: 'mgt_charte_excellence', name: "Charte de l'excellence opérationnelle et du management responsable en Afrique", category: 'gestion_management', price: 5000, priceMax: 15000,
    description: "Charte engageant une organisation envers l'excellence opérationnelle et le management responsable dans le contexte africain.", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'secteur_activite',label:"Secteur d'activité",type:'text',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true},
      {key:'dirigeant_signataire',label:"Nom du dirigeant signataire",type:'text',required:true},
      {key:'pays_siege',label:"Pays du siège social",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'EXCELLENCE OPÉRATIONNELLE ET DU MANAGEMENT RESPONSABLE EN AFRIQUE</h1><h2>{{raison_sociale}} — {{secteur_activite}}</h2><p><strong>Pays :</strong> {{pays_siege}} | <strong>Signée le :</strong> {{date_signature}} par <strong>{{dirigeant_signataire}}</strong></p><h3>Préambule</h3><p>Convaincue que l'excellence opérationnelle et le management responsable constituent les piliers d'une croissance durable et inclusive en Afrique, <strong>{{raison_sociale}}</strong> adopte la présente Charte et s'engage solennellement en faveur des principes ci-après.</p><h3>Principe 1 — Excellence opérationnelle</h3><p>Nous nous engageons à l'amélioration continue de nos processus, à la qualité irréprochable de nos produits et services, et à la satisfaction de nos clients et partenaires.</p><h3>Principe 2 — Leadership et management responsable</h3><p>Nos dirigeants et managers exercent leur autorité avec intégrité, transparence et respect de la dignité humaine. Ils développent les talents et valorisent la diversité africaine.</p><h3>Principe 3 — Performance durable et création de valeur</h3><p>Nous créons de la valeur partagée pour nos actionnaires, collaborateurs, clients, fournisseurs et communautés locales, en intégrant les enjeux environnementaux et sociaux dans nos décisions.</p><h3>Principe 4 — Ancrage local et rayonnement panafricain</h3><p>Nous valorisons les savoir-faire locaux, contribuons au développement des écosystèmes africains et promouvons l'intégration économique régionale (CEDEAO, UEMOA, UA).</p><h3>Principe 5 — Innovation et agilité</h3><p>Nous cultivons une culture d'innovation adaptée aux réalités africaines : frugale, inclusive et tournée vers les solutions du futur.</p><h3>Principe 6 — Gouvernance et conformité</h3><p>Nous respectons scrupuleusement le droit OHADA, les lois nationales et les standards internationaux de bonne gouvernance. Nous luttons contre la corruption sous toutes ses formes.</p><h3>Engagement solennel</h3><p>Par sa signature, <strong>{{dirigeant_signataire}}</strong> engage <strong>{{raison_sociale}}</strong> à incarner ces principes au quotidien et à en rendre compte annuellement à toutes ses parties prenantes.</p><p><em>Fait à {{pays_siege}}, le {{date_signature}}.</em></p><p>________________________________<br/><strong>{{dirigeant_signataire}}</strong><br/>Dirigeant de {{raison_sociale}}</p></div>` },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 114b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
