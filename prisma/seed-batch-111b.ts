import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── NGO2 : Gouvernance ONG/OSBL ───────────────────────────────────────────
  {
    code: 'ngo2_statuts_asso_1960',
    name: "Statuts d'association loi 1960 Côte d'Ivoire (modèle complet)",
    category: 'association', price: 3000, priceMax: 9000,
    description: "Modèle complet de statuts d'association régi par la loi ivoirienne de 1960, conforme aux exigences du Ministère de l'Intérieur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_asso',label:"Dénomination de l'association",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true},
      {key:'objet',label:"Objet et mission",type:'textarea',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true},
      {key:'president',label:"Nom du Président fondateur",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>STATUTS DE L'ASSOCIATION {{nom_asso}}</h1><h2>TITRE I — DÉNOMINATION, SIÈGE, OBJET ET DURÉE</h2><p><strong>Article 1 — Dénomination :</strong> Il est fondé entre les adhérents aux présents statuts une association régie par la loi du 1er août 1960 relative aux associations, dénommée : <strong>{{nom_asso}}</strong>.</p><p><strong>Article 2 — Siège social :</strong> Le siège social de l'association est fixé à : {{siege_social}}. Il peut être transféré par simple décision du Conseil d'Administration.</p><p><strong>Article 3 — Objet :</strong> L'association a pour objet : {{objet}}</p><p><strong>Article 4 — Durée :</strong> L'association est constituée pour une durée indéterminée à compter du {{date_creation}}.</p><h2>TITRE II — MEMBRES</h2><p><strong>Article 5 — Composition :</strong> L'association se compose de membres fondateurs, membres actifs et membres d'honneur.</p><h2>TITRE III — ADMINISTRATION</h2><p><strong>Article 6 — Conseil d'Administration :</strong> L'association est administrée par un Conseil d'Administration élu par l'Assemblée Générale.</p><p><strong>Article 7 — Bureau :</strong> Le Bureau est composé d'un Président, d'un Vice-Président, d'un Secrétaire Général et d'un Trésorier.</p><h2>TITRE IV — DISPOSITIONS DIVERSES</h2><p>Fait à {{siege_social}}, le {{date_creation}}.</p><p>Le Président fondateur : {{president}}</p></div>`
  },
  {
    code: 'ngo2_reglement_interieur',
    name: "Règlement intérieur d'association",
    category: 'association', price: 2500, priceMax: 7000,
    description: "Règlement intérieur précisant les modalités de fonctionnement interne d'une association, en complément des statuts.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_asso',label:"Nom de l'association",type:'text',required:true},
      {key:'cotisation_annuelle',label:"Montant de la cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'frequence_reunion',label:"Fréquence des réunions du CA",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT INTÉRIEUR DE {{nom_asso}}</h1><p>Le présent règlement intérieur est adopté conformément aux statuts de l'association {{nom_asso}}.</p><h2>ARTICLE 1 — ADHÉSION ET COTISATIONS</h2><p>La cotisation annuelle est fixée à {{cotisation_annuelle}} FCFA par membre actif. Elle est révisable par l'Assemblée Générale.</p><h2>ARTICLE 2 — RÉUNIONS</h2><p>Le Conseil d'Administration se réunit {{frequence_reunion}}. Les décisions sont prises à la majorité simple des membres présents.</p><h2>ARTICLE 3 — DISCIPLINE</h2><p>Tout membre contrevenant aux présents statuts ou règlement peut faire l'objet d'une exclusion prononcée par le Conseil d'Administration.</p><h2>ARTICLE 4 — ENTRÉE EN VIGUEUR</h2><p>Le présent règlement intérieur entre en vigueur à compter du {{date_adoption}}.</p></div>`
  },
  {
    code: 'ngo2_creation_federation',
    name: "Accord de création d'une fédération d'associations",
    category: 'association', price: 3500, priceMax: 10000,
    description: "Acte constitutif d'une fédération regroupant plusieurs associations partageant des objectifs communs, en droit ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_federation',label:"Nom de la fédération",type:'text',required:true},
      {key:'associations_membres',label:"Associations membres fondatrices",type:'textarea',required:true},
      {key:'siege_federation',label:"Siège de la fédération",type:'text',required:true},
      {key:'date_constitution',label:"Date de constitution",type:'date',required:true},
      {key:'president_federation',label:"Président de la fédération",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE CONSTITUTIF DE LA FÉDÉRATION {{nom_federation}}</h1><p>Les associations ci-après désignées ont décidé de créer entre elles une fédération dénommée <strong>{{nom_federation}}</strong>, dont le siège est fixé à {{siege_federation}}.</p><h2>ARTICLE 1 — ASSOCIATIONS MEMBRES FONDATRICES</h2><p>{{associations_membres}}</p><h2>ARTICLE 2 — OBJET DE LA FÉDÉRATION</h2><p>La fédération a pour objet de coordonner les activités de ses membres, de défendre leurs intérêts communs et de renforcer leur capacité d'action collective.</p><h2>ARTICLE 3 — GOUVERNANCE</h2><p>La fédération est administrée par un Conseil Fédéral composé de représentants de chaque association membre. Le Président de la fédération est : {{president_federation}}.</p><p>Fait à {{siege_federation}}, le {{date_constitution}}.</p></div>`
  },
  {
    code: 'ngo2_creation_union',
    name: "Accord de création d'une union d'associations",
    category: 'association', price: 3000, priceMax: 8500,
    description: "Acte constitutif d'une union d'associations en Côte d'Ivoire, structure de coordination souple entre entités associatives.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'nom_union',label:"Nom de l'union",type:'text',required:true},
      {key:'membres_fondateurs',label:"Associations membres fondatrices",type:'textarea',required:true},
      {key:'siege',label:"Siège social",type:'text',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE CONSTITUTIF DE L'UNION {{nom_union}}</h1><p>Les associations soussignées ont décidé de constituer une union dénommée <strong>{{nom_union}}</strong>, dont le siège est établi à {{siege}}.</p><h2>ARTICLE 1 — MEMBRES FONDATEURS</h2><p>{{membres_fondateurs}}</p><h2>ARTICLE 2 — OBJET</h2><p>L'union a pour objet de faciliter la coopération entre ses membres et de mutualiser les ressources pour une action plus efficace.</p><h2>ARTICLE 3 — FONCTIONNEMENT</h2><p>L'union est dotée d'un Comité de Direction composé d'un représentant par association membre.</p><p>Fait le {{date_creation}} à {{siege}}.</p></div>`
  },
  {
    code: 'ngo2_creation_groupement',
    name: "Accord de création d'un groupement d'associations",
    category: 'association', price: 2500, priceMax: 7000,
    description: "Document constitutif d'un groupement informel ou formel d'associations pour un projet ou objectif délimité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_groupement',label:"Nom du groupement",type:'text',required:true},
      {key:'objet_groupement',label:"Objet du groupement",type:'textarea',required:true},
      {key:'associations',label:"Associations participantes",type:'textarea',required:true},
      {key:'duree',label:"Durée du groupement",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CRÉATION DU GROUPEMENT {{nom_groupement}}</h1><p>Les associations signataires conviennent de constituer entre elles un groupement dénommé <strong>{{nom_groupement}}</strong> pour une durée de {{duree}}.</p><h2>ARTICLE 1 — OBJET</h2><p>{{objet_groupement}}</p><h2>ARTICLE 2 — MEMBRES</h2><p>{{associations}}</p><h2>ARTICLE 3 — COORDINATION</h2><p>Un coordinateur est désigné à la majorité des membres pour animer le groupement.</p><p>Fait le {{date_accord}}.</p></div>`
  },
  {
    code: 'ngo2_convention_partenariat_multi',
    name: "Convention de partenariat multi-acteurs ONG",
    category: 'association', price: 3500, priceMax: 9000,
    description: "Convention cadre entre ONG, collectivités, entreprises et institutions pour un partenariat structuré multi-acteurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'parties',label:"Parties prenantes (noms et qualités)",type:'textarea',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'lieu_signature',label:"Lieu de signature",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT MULTI-ACTEURS</h1><h2>ENTRE LES SOUSSIGNÉS :</h2><p>{{parties}}</p><h2>IL A ÉTÉ CONVENU CE QUI SUIT :</h2><h2>ARTICLE 1 — OBJET</h2><p>La présente convention a pour objet d'organiser le partenariat multi-acteurs portant sur : {{objet_partenariat}}</p><h2>ARTICLE 2 — DURÉE</h2><p>Le partenariat est conclu pour une durée de {{duree_partenariat}} à compter de la date de signature.</p><h2>ARTICLE 3 — ENGAGEMENTS DES PARTIES</h2><p>Chaque partie s'engage à contribuer selon ses capacités et rôles définis en annexe.</p><h2>ARTICLE 4 — GOUVERNANCE</h2><p>Un comité de pilotage multi-acteurs se réunit trimestriellement pour superviser la mise en oeuvre.</p><p>Fait à {{lieu_signature}}, le {{date_signature}}.</p></div>`
  },
  {
    code: 'ngo2_convention_sous_traitance',
    name: "Convention de sous-traitance ONG (activités)",
    category: 'association', price: 2500, priceMax: 7000,
    description: "Convention par laquelle une ONG confie l'exécution de certaines activités à une organisation sous-traitante.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'ong_principale',label:"ONG principale (donneur d'ordre)",type:'text',required:true},
      {key:'sous_traitant',label:"Organisation sous-traitante",type:'text',required:true},
      {key:'activites_sous_traitees',label:"Activités sous-traitées",type:'textarea',required:true},
      {key:'montant',label:"Montant (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SOUS-TRAITANCE</h1><p>Entre <strong>{{ong_principale}}</strong> (ci-après le Donneur d'Ordre) et <strong>{{sous_traitant}}</strong> (ci-après le Sous-Traitant).</p><h2>ARTICLE 1 — OBJET</h2><p>Le Donneur d'Ordre confie au Sous-Traitant l'exécution des activités suivantes : {{activites_sous_traitees}}</p><h2>ARTICLE 2 — RÉMUNÉRATION</h2><p>Le Donneur d'Ordre versera au Sous-Traitant la somme de {{montant}} FCFA selon le calendrier de décaissement défini en annexe.</p><h2>ARTICLE 3 — OBLIGATIONS DU SOUS-TRAITANT</h2><p>Le Sous-Traitant s'engage à exécuter les activités dans le respect des normes qualité du Donneur d'Ordre et des bailleurs.</p><h2>ARTICLE 4 — DATE D'EFFET</h2><p>La présente convention prend effet le {{date_debut}}.</p></div>`
  },
  {
    code: 'ngo2_convention_mise_oeuvre',
    name: "Convention de mise en oeuvre de projet ONG",
    category: 'association', price: 3000, priceMax: 8000,
    description: "Convention entre un bailleur et une ONG pour la mise en oeuvre d'un projet de développement, précisant les obligations de chaque partie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'bailleur',label:"Bailleur de fonds",type:'text',required:true},
      {key:'ong',label:"ONG bénéficiaire",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du projet",type:'date',required:true},
      {key:'date_fin',label:"Date de fin du projet",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MISE EN OEUVRE DE PROJET</h1><p><strong>Projet :</strong> {{titre_projet}}</p><p>Entre <strong>{{bailleur}}</strong> (ci-après le Bailleur) et <strong>{{ong}}</strong> (ci-après l'ONG Partenaire).</p><h2>ARTICLE 1 — OBJET</h2><p>La présente convention définit les modalités de mise en oeuvre du projet {{titre_projet}} sur la période du {{date_debut}} au {{date_fin}}.</p><h2>ARTICLE 2 — FINANCEMENT</h2><p>Le budget total du projet est de {{budget_total}} FCFA. Les tranches de décaissement sont définies en annexe financière.</p><h2>ARTICLE 3 — OBLIGATIONS DE L'ONG</h2><p>L'ONG s'engage à exécuter les activités, soumettre les rapports d'avancement et les justificatifs financiers conformément aux procédures du Bailleur.</p><h2>ARTICLE 4 — SUIVI ET ÉVALUATION</h2><p>Des missions de suivi conjointes seront organisées selon le plan de suivi-évaluation annexé.</p></div>`
  },
  {
    code: 'ngo2_service_audit_gouvernance',
    name: "Accord de service d'audit de gouvernance ONG",
    category: 'association', price: 4000, priceMax: 12000,
    description: "Contrat de prestation pour la réalisation d'un audit de gouvernance d'une ONG incluant l'évaluation des organes de direction.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'ong_cliente',label:"ONG cliente",type:'text',required:true},
      {key:'cabinet_auditeur',label:"Cabinet auditeur",type:'text',required:true},
      {key:'perimetre_audit',label:"Périmètre de l'audit",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT DE GOUVERNANCE ONG</h1><p>Entre <strong>{{ong_cliente}}</strong> (ci-après le Client) et <strong>{{cabinet_auditeur}}</strong> (ci-après le Prestataire).</p><h2>ARTICLE 1 — OBJET DE LA MISSION</h2><p>Le Prestataire est mandaté pour conduire un audit de gouvernance portant sur : {{perimetre_audit}}</p><h2>ARTICLE 2 — MÉTHODOLOGIE</h2><p>L'audit comprend : la revue documentaire des statuts, PV et rapports financiers ; les entretiens avec les parties prenantes ; l'évaluation des pratiques de gouvernance au regard des standards internationaux.</p><h2>ARTICLE 3 — LIVRABLES</h2><p>Le Prestataire remettra un rapport d'audit avec recommandations hiérarchisées dans les 30 jours suivant la fin des travaux.</p><h2>ARTICLE 4 — HONORAIRES</h2><p>Les honoraires de la mission sont fixés à {{honoraires}} FCFA, payables 50% à la commande et 50% à la remise du rapport final.</p><p>Mission débutant le {{date_debut}}.</p></div>`
  },
  {
    code: 'ngo2_service_formation_gouvernance',
    name: "Accord de service de formation gouvernance ONG (CA, direction)",
    category: 'association', price: 3000, priceMax: 8000,
    description: "Contrat de prestation de formation à destination des membres du Conseil d'Administration et de la direction exécutive d'une ONG.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'ong',label:"ONG bénéficiaire",type:'text',required:true},
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'themes_formation',label:"Thèmes de formation",type:'textarea',required:true},
      {key:'nombre_jours',label:"Durée (jours)",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN GOUVERNANCE ONG</h1><p>Entre <strong>{{ong}}</strong> (ci-après le Bénéficiaire) et <strong>{{organisme_formation}}</strong> (ci-après le Formateur).</p><h2>ARTICLE 1 — OBJET</h2><p>Le Formateur s'engage à dispenser une formation en gouvernance associative aux membres du CA et de la direction de {{ong}} portant sur : {{themes_formation}}</p><h2>ARTICLE 2 — MODALITÉS</h2><p>La formation se déroulera sur {{nombre_jours}} jour(s) à compter du {{date_formation}}, en présentiel ou hybride selon accord des parties.</p><h2>ARTICLE 3 — LIVRABLES</h2><p>Le Formateur remettra les supports de formation, un compte-rendu pédagogique et une attestation de formation à chaque participant.</p></div>`
  },
  {
    code: 'ngo2_service_plan_strategique',
    name: "Accord de service d'élaboration d'un plan stratégique ONG",
    category: 'association', price: 4000, priceMax: 12000,
    description: "Contrat de mission pour l'accompagnement à l'élaboration du plan stratégique pluriannuel d'une ONG.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'ong',label:"ONG cliente",type:'text',required:true},
      {key:'consultant',label:"Cabinet / consultant",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (ex: 2025-2030)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_demarrage',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ÉLABORATION DU PLAN STRATÉGIQUE</h1><p>Entre <strong>{{ong}}</strong> et <strong>{{consultant}}</strong>.</p><h2>ARTICLE 1 — OBJET</h2><p>Le Consultant accompagne {{ong}} dans l'élaboration de son plan stratégique {{horizon_plan}} selon une approche participative.</p><h2>ARTICLE 2 — MÉTHODOLOGIE</h2><p>La mission comprend : diagnostic organisationnel, ateliers participatifs, rédaction du plan stratégique et validation en Assemblée Générale.</p><h2>ARTICLE 3 — HONORAIRES</h2><p>Honoraires : {{honoraires}} FCFA, versés selon le calendrier de la mission.</p><p>Démarrage : {{date_demarrage}}.</p></div>`
  },
  {
    code: 'ngo2_service_suivi_evaluation',
    name: "Accord de service de système de suivi-évaluation ONG (SSES)",
    category: 'association', price: 3500, priceMax: 10000,
    description: "Contrat pour la conception et la mise en place d'un système de suivi-évaluation adapté aux projets et programmes d'une ONG.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'ong',label:"ONG cliente",type:'text',required:true},
      {key:'prestataire',label:"Prestataire SSES",type:'text',required:true},
      {key:'programmes_concernes',label:"Programmes concernés",type:'textarea',required:true},
      {key:'cout_mission',label:"Coût de la mission (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — SYSTÈME DE SUIVI-ÉVALUATION (SSES)</h1><p>Entre <strong>{{ong}}</strong> (Client) et <strong>{{prestataire}}</strong> (Prestataire).</p><h2>ARTICLE 1 — OBJET</h2><p>Le Prestataire est chargé de concevoir et de mettre en place un Système de Suivi-Évaluation couvrant les programmes suivants : {{programmes_concernes}}</p><h2>ARTICLE 2 — LIVRABLES</h2><p>Cadre de résultats, indicateurs SMART, outils de collecte de données, tableau de bord et guide d'utilisation du SSES.</p><h2>ARTICLE 3 — COÛT</h2><p>Coût global de la mission : {{cout_mission}} FCFA. Démarrage le {{date_debut}}.</p></div>`
  },
  {
    code: 'ngo2_service_gestion_financiere',
    name: "Accord de service de gestion financière ONG (comptabilité)",
    category: 'association', price: 2500, priceMax: 7000,
    description: "Contrat de prestation de services comptables et de gestion financière pour une ONG, incluant la tenue des comptes et les rapports financiers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'ong',label:"ONG cliente",type:'text',required:true},
      {key:'cabinet_comptable',label:"Cabinet comptable",type:'text',required:true},
      {key:'prestations',label:"Prestations incluses",type:'textarea',required:true},
      {key:'honoraires_mensuels',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION FINANCIÈRE ET COMPTABLE</h1><p>Entre <strong>{{ong}}</strong> et <strong>{{cabinet_comptable}}</strong>.</p><h2>ARTICLE 1 — PRESTATIONS</h2><p>Le Cabinet assure les prestations suivantes pour le compte de l'ONG : {{prestations}}</p><h2>ARTICLE 2 — HONORAIRES</h2><p>Les honoraires mensuels sont fixés à {{honoraires_mensuels}} FCFA, payables en fin de mois.</p><h2>ARTICLE 3 — CONFIDENTIALITÉ</h2><p>Le Cabinet s'engage à la stricte confidentialité des informations financières de l'ONG.</p><p>Contrat effectif à compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'ngo2_service_grh',
    name: "Accord de service de gestion des ressources humaines ONG",
    category: 'association', price: 2500, priceMax: 7000,
    description: "Contrat de prestation RH pour une ONG : gestion de la paie, contrats de travail, politique RH et conformité au Code du Travail ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'ong',label:"ONG cliente",type:'text',required:true},
      {key:'prestataire_rh',label:"Prestataire RH",type:'text',required:true},
      {key:'effectif',label:"Effectif concerné",type:'text',required:true},
      {key:'honoraires',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES RESSOURCES HUMAINES</h1><p>Entre <strong>{{ong}}</strong> et <strong>{{prestataire_rh}}</strong>.</p><h2>ARTICLE 1 — MISSION</h2><p>Le Prestataire assure la gestion RH de {{ong}} pour un effectif de {{effectif}} personnes : paie, contrats, registre du personnel, déclarations CNPS et conformité Code du Travail CI.</p><h2>ARTICLE 2 — RÉMUNÉRATION</h2><p>Honoraires mensuels : {{honoraires}} FCFA.</p><h2>ARTICLE 3 — OBLIGATIONS</h2><p>Le Prestataire garantit la conformité des pratiques RH avec la législation ivoirienne en vigueur.</p><p>Effectif à compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'ngo2_service_fundraising',
    name: "Accord de service de fundraising (levée de fonds) ONG",
    category: 'association', price: 3000, priceMax: 9000,
    description: "Contrat de mission de conseil et d'accompagnement à la levée de fonds pour une ONG auprès de bailleurs institutionnels et privés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'ong',label:"ONG cliente",type:'text',required:true},
      {key:'consultant_fundraising',label:"Consultant fundraising",type:'text',required:true},
      {key:'objectif_levee',label:"Objectif de levée (FCFA)",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FUNDRAISING</h1><p>Entre <strong>{{ong}}</strong> (Client) et <strong>{{consultant_fundraising}}</strong> (Consultant).</p><h2>ARTICLE 1 — OBJET</h2><p>Le Consultant accompagne l'ONG dans sa stratégie de levée de fonds pour atteindre un objectif de {{objectif_levee}} FCFA sur {{duree_mission}} mois.</p><h2>ARTICLE 2 — PRESTATIONS</h2><p>Cartographie des bailleurs potentiels, rédaction de dossiers de demande de financement, préparation des présentations et suivi des candidatures.</p><h2>ARTICLE 3 — RÉMUNÉRATION</h2><p>Forfait mensuel fixe + commission de succès selon les fonds effectivement levés, définis en annexe.</p><p>Mission débutant le {{date_debut}}.</p></div>`
  },
  {
    code: 'ngo2_service_reporting_bailleurs',
    name: "Accord de service de reporting bailleurs (AFD, UE, USAID)",
    category: 'association', price: 3000, priceMax: 8000,
    description: "Prestation d'appui à la production de rapports narratifs et financiers conformes aux exigences des bailleurs institutionnels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'ong',label:"ONG cliente",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'bailleurs_cibles',label:"Bailleurs ciblés (AFD, UE, USAID...)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REPORTING BAILLEURS</h1><p>Entre <strong>{{ong}}</strong> et <strong>{{prestataire}}</strong>.</p><h2>ARTICLE 1 — OBJET</h2><p>Le Prestataire accompagne {{ong}} dans la production de rapports narratifs et financiers conformes aux exigences de : {{bailleurs_cibles}}</p><h2>ARTICLE 2 — PRESTATIONS</h2><p>Revue des données de suivi, consolidation des justificatifs, rédaction des rapports d'avancement, de fin de phase et de clôture de projet.</p><h2>ARTICLE 3 — HONORAIRES</h2><p>{{honoraires}} FCFA, selon le calendrier de remise des rapports. Mission effective au {{date_debut}}.</p></div>`
  },
  {
    code: 'ngo2_service_communication',
    name: "Accord de service de communication ONG (réseaux sociaux)",
    category: 'association', price: 2000, priceMax: 5500,
    description: "Contrat de prestation de communication digitale pour une ONG : stratégie, contenus, réseaux sociaux et visibilité institutionnelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'ong',label:"ONG cliente",type:'text',required:true},
      {key:'agence',label:"Agence / prestataire communication",type:'text',required:true},
      {key:'plateformes',label:"Plateformes concernées",type:'text',required:true},
      {key:'budget_mensuel',label:"Budget mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMMUNICATION ONG</h1><p>Entre <strong>{{ong}}</strong> et <strong>{{agence}}</strong>.</p><h2>ARTICLE 1 — OBJET</h2><p>L'Agence assure la gestion de la communication digitale de {{ong}} sur les plateformes suivantes : {{plateformes}}</p><h2>ARTICLE 2 — PRESTATIONS MENSUELLES</h2><p>Production de contenus (textes, visuels), publication, animation de communauté, reporting mensuel des indicateurs de performance.</p><h2>ARTICLE 3 — BUDGET</h2><p>Budget mensuel : {{budget_mensuel}} FCFA. Contrat démarrant le {{date_debut}}.</p></div>`
  },
  {
    code: 'ngo2_service_protection_donnees',
    name: "Accord de service de protection des données bénéficiaires (RGPD/CI)",
    category: 'association', price: 3500, priceMax: 9000,
    description: "Contrat de mise en conformité avec les règles de protection des données personnelles des bénéficiaires d'une ONG selon la réglementation ivoirienne et RGPD.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'ong',label:"ONG cliente",type:'text',required:true},
      {key:'consultant_dpo',label:"Consultant / DPO",type:'text',required:true},
      {key:'perimetre',label:"Périmètre des données concernées",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PROTECTION DES DONNÉES BÉNÉFICIAIRES</h1><p>Entre <strong>{{ong}}</strong> (Responsable de traitement) et <strong>{{consultant_dpo}}</strong> (DPO/Consultant).</p><h2>ARTICLE 1 — OBJET</h2><p>Le Consultant accompagne {{ong}} dans la mise en conformité du traitement des données personnelles de ses bénéficiaires : {{perimetre}}</p><h2>ARTICLE 2 — MISSIONS</h2><p>Audit des traitements existants, cartographie des données, rédaction de la politique de confidentialité, formation des équipes et assistance ARTCI.</p><h2>ARTICLE 3 — HONORAIRES</h2><p>{{honoraires}} FCFA. Mission débutant le {{date_debut}}.</p></div>`
  },
  {
    code: 'ngo2_service_safeguarding',
    name: "Accord de service de sauvegarde (safeguarding ONG)",
    category: 'association', price: 3000, priceMax: 8000,
    description: "Contrat pour l'élaboration et la mise en oeuvre d'une politique de sauvegarde protégeant bénéficiaires et équipes d'une ONG contre abus et exploitation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'ong',label:"ONG cliente",type:'text',required:true},
      {key:'prestataire',label:"Prestataire safeguarding",type:'text',required:true},
      {key:'population_ciblee',label:"Population cible de la sauvegarde",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SAUVEGARDE (SAFEGUARDING)</h1><p>Entre <strong>{{ong}}</strong> et <strong>{{prestataire}}</strong>.</p><h2>ARTICLE 1 — OBJET</h2><p>Le Prestataire accompagne {{ong}} dans l'élaboration et la mise en oeuvre d'une politique de sauvegarde pour protéger : {{population_ciblee}}</p><h2>ARTICLE 2 — LIVRABLES</h2><p>Politique de sauvegarde, code de conduite, mécanisme de signalement, formation du personnel et des bénévoles, plan de réponse aux incidents.</p><h2>ARTICLE 3 — HONORAIRES</h2><p>{{honoraires}} FCFA. Démarrage le {{date_debut}}.</p></div>`
  },
  {
    code: 'ngo2_service_cartographie_parties',
    name: "Accord de service de cartographie des parties prenantes ONG",
    category: 'association', price: 2500, priceMax: 6500,
    description: "Mission de cartographie et d'analyse des parties prenantes d'une ONG pour optimiser ses stratégies d'engagement et de partenariat.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'ong',label:"ONG cliente",type:'text',required:true},
      {key:'consultant',label:"Consultant",type:'text',required:true},
      {key:'perimetre_geo',label:"Périmètre géographique",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_remise',label:"Date de remise du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CARTOGRAPHIE DES PARTIES PRENANTES</h1><p>Entre <strong>{{ong}}</strong> et <strong>{{consultant}}</strong>.</p><h2>ARTICLE 1 — OBJET</h2><p>Le Consultant réalise une cartographie des parties prenantes de {{ong}} sur le périmètre géographique suivant : {{perimetre_geo}}</p><h2>ARTICLE 2 — LIVRABLES</h2><p>Matrice des parties prenantes, analyse des influenceurs clés, stratégie d'engagement recommandée et visualisation cartographique.</p><h2>ARTICLE 3 — HONORAIRES ET DÉLAIS</h2><p>{{honoraires}} FCFA. Rapport remis le {{date_remise}}.</p></div>`
  },
  {
    code: 'ngo2_service_evaluation_externe',
    name: "Accord de service d'évaluation externe de programme ONG",
    category: 'association', price: 5000, priceMax: 15000,
    description: "Contrat pour la conduite d'une évaluation externe indépendante d'un programme ou projet d'une ONG selon les critères CAD/OCDE.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'ong',label:"ONG commanditaire",type:'text',required:true},
      {key:'evaluateur',label:"Évaluateur / cabinet",type:'text',required:true},
      {key:'programme_evalue',label:"Programme évalué",type:'text',required:true},
      {key:'budget_evaluation',label:"Budget de l'évaluation (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉVALUATION EXTERNE DE PROGRAMME</h1><p>Entre <strong>{{ong}}</strong> (Commanditaire) et <strong>{{evaluateur}}</strong> (Évaluateur).</p><h2>ARTICLE 1 — PROGRAMME ÉVALUÉ</h2><p>{{programme_evalue}}</p><h2>ARTICLE 2 — CRITÈRES D'ÉVALUATION</h2><p>L'évaluation portera sur les critères CAD/OCDE : pertinence, cohérence, efficacité, efficience, impact et durabilité.</p><h2>ARTICLE 3 — LIVRABLES</h2><p>Rapport d'inception, rapport final d'évaluation, résumé exécutif et présentation de restitution.</p><h2>ARTICLE 4 — BUDGET</h2><p>Budget de la mission : {{budget_evaluation}} FCFA. Démarrage : {{date_debut}}.</p></div>`
  },
  {
    code: 'ngo2_service_gestion_volontaires',
    name: "Accord de service de gestion des volontaires ONG",
    category: 'association', price: 2000, priceMax: 5500,
    description: "Contrat de prestation pour la mise en place d'un système de recrutement, d'encadrement et de gestion des volontaires d'une ONG.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'ong',label:"ONG cliente",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'nombre_volontaires',label:"Nombre de volontaires concernés",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES VOLONTAIRES</h1><p>Entre <strong>{{ong}}</strong> et <strong>{{prestataire}}</strong>.</p><h2>ARTICLE 1 — OBJET</h2><p>Le Prestataire met en place un système de gestion des volontaires pour {{ong}}, couvrant {{nombre_volontaires}} volontaires.</p><h2>ARTICLE 2 — PRESTATIONS</h2><p>Élaboration de la charte du volontaire, outils de recrutement, système de suivi des missions, formations d'accueil et certificats d'engagement.</p><h2>ARTICLE 3 — HONORAIRES</h2><p>{{honoraires}} FCFA. Démarrage le {{date_debut}}.</p></div>`
  },
  {
    code: 'ngo2_rapport_annuel',
    name: "Rapport annuel ONG",
    category: 'association', price: 2500, priceMax: 7000,
    description: "Modèle de rapport annuel d'activités et financier pour une ONG, à destination des membres, bailleurs et partenaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'annee',label:"Année du rapport",type:'text',required:true},
      {key:'faits_marquants',label:"Faits marquants de l'année",type:'textarea',required:true},
      {key:'president_dg',label:"Président / Directeur Général",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL {{annee}} — {{nom_ong}}</h1><h2>MOT DU PRÉSIDENT</h2><p>Chers partenaires, membres et bénéficiaires, nous avons le plaisir de vous présenter le rapport annuel {{annee}} de {{nom_ong}}.</p><h2>FAITS MARQUANTS</h2><p>{{faits_marquants}}</p><h2>NOS RÉALISATIONS</h2><p>Voir annexe détaillée des activités par programme.</p><h2>SITUATION FINANCIÈRE</h2><p>Voir états financiers certifiés en annexe.</p><h2>PERSPECTIVES</h2><p>Pour l'exercice à venir, {{nom_ong}} s'engage à poursuivre et approfondir ses actions au service des communautés.</p><p>Le Président : {{president_dg}}</p><p>Date : {{date_rapport}}</p></div>`
  },
  {
    code: 'ngo2_plan_strategique',
    name: "Plan stratégique ONG",
    category: 'association', price: 3000, priceMax: 8000,
    description: "Modèle de plan stratégique pluriannuel pour une ONG, incluant vision, mission, axes stratégiques et cadre de résultats.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'horizon',label:"Horizon du plan (ex: 2025-2030)",type:'text',required:true},
      {key:'vision',label:"Vision de l'ONG",type:'textarea',required:true},
      {key:'axes_strategiques',label:"Axes stratégiques",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN STRATÉGIQUE {{horizon}} — {{nom_ong}}</h1><h2>NOTRE VISION</h2><p>{{vision}}</p><h2>AXES STRATÉGIQUES</h2><p>{{axes_strategiques}}</p><h2>CADRE DE RÉSULTATS</h2><p>Les objectifs stratégiques, indicateurs de performance et ressources nécessaires sont détaillés en annexe matricielle.</p><h2>PILOTAGE</h2><p>Le plan est piloté par le Comité de Direction et évalué annuellement en Assemblée Générale.</p><p>Adopté le {{date_adoption}} par l'Assemblée Générale de {{nom_ong}}.</p></div>`
  },
  {
    code: 'ngo2_charte_gouvernance',
    name: "Charte de bonne gouvernance des ONG et de la transparence",
    category: 'association', price: 2000, priceMax: 5500,
    description: "Charte éthique et de transparence définissant les engagements de gouvernance d'une ONG envers ses parties prenantes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'valeurs',label:"Valeurs fondatrices",type:'textarea',required:true},
      {key:'president',label:"Président signataire",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE BONNE GOUVERNANCE ET DE TRANSPARENCE DE {{nom_ong}}</h1><h2>PRÉAMBULE</h2><p>{{nom_ong}} s'engage solennellement à exercer ses missions dans le respect des principes de bonne gouvernance, de transparence et de redevabilité envers toutes ses parties prenantes.</p><h2>NOS VALEURS</h2><p>{{valeurs}}</p><h2>ENGAGEMENTS DE GOUVERNANCE</h2><p>1. Séparation des pouvoirs entre Conseil d'Administration et direction exécutive.<br/>2. Publication annuelle des comptes certifiés.<br/>3. Prévention des conflits d'intérêts.<br/>4. Protection des lanceurs d'alerte.<br/>5. Participation des bénéficiaires à la gouvernance.</p><h2>ENGAGEMENTS DE TRANSPARENCE</h2><p>{{nom_ong}} publie chaque année son rapport d'activités et ses états financiers accessibles à tous.</p><p>Le Président : {{president}}<br/>Date : {{date_adoption}}</p></div>`
  },
  // ─── FOND2 : Fondations d'entreprise ───────────────────────────────────────
  {
    code: 'fond2_creation_fondation',
    name: "Accord de création d'une fondation d'entreprise (loi CI)",
    category: 'association', price: 5000, priceMax: 15000,
    description: "Acte constitutif d'une fondation d'entreprise en Côte d'Ivoire, encadrant la personnalité juridique, la gouvernance et l'objet philanthropique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'entreprise_fondatrice',label:"Entreprise fondatrice",type:'text',required:true},
      {key:'dotation_initiale',label:"Dotation initiale (FCFA)",type:'text',required:true},
      {key:'objet',label:"Objet philanthropique",type:'textarea',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE CONSTITUTIF DE LA FONDATION {{nom_fondation}}</h1><p>L'entreprise <strong>{{entreprise_fondatrice}}</strong> crée par le présent acte la fondation dénommée <strong>{{nom_fondation}}</strong>, dotée d'une personnalité juridique propre conformément à la législation ivoirienne.</p><h2>ARTICLE 1 — OBJET</h2><p>{{objet}}</p><h2>ARTICLE 2 — DOTATION INITIALE</h2><p>La fondation est dotée d'un capital initial de {{dotation_initiale}} FCFA apporté par {{entreprise_fondatrice}}.</p><h2>ARTICLE 3 — GOUVERNANCE</h2><p>La fondation est administrée par un Conseil d'Administration composé de représentants de l'entreprise fondatrice et de personnalités qualifiées indépendantes.</p><p>Fait le {{date_creation}}.</p></div>`
  },
  {
    code: 'fond2_statuts_fondation',
    name: "Accord de statuts fondation d'entreprise",
    category: 'association', price: 4000, priceMax: 12000,
    description: "Statuts détaillés d'une fondation d'entreprise définissant sa structure juridique, ses organes et ses modes de fonctionnement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'siege',label:"Siège social",type:'text',required:true},
      {key:'entreprise',label:"Entreprise fondatrice",type:'text',required:true},
      {key:'duree',label:"Durée de la fondation",type:'text',required:true},
      {key:'date_statuts',label:"Date des statuts",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>STATUTS DE LA FONDATION {{nom_fondation}}</h1><h2>TITRE I — DISPOSITIONS GÉNÉRALES</h2><p><strong>Article 1 :</strong> Il est créé une fondation d'entreprise dénommée <strong>{{nom_fondation}}</strong>, dont le siège est fixé à {{siege}}, constituée à l'initiative de {{entreprise}}.</p><p><strong>Article 2 — Durée :</strong> La fondation est créée pour une durée de {{duree}}.</p><h2>TITRE II — GOUVERNANCE</h2><p><strong>Article 3 :</strong> La fondation est dirigée par un Conseil d'Administration, un Bureau et un Directeur Exécutif.</p><h2>TITRE III — RESSOURCES</h2><p><strong>Article 4 :</strong> Les ressources de la fondation comprennent la dotation initiale, les versements de l'entreprise fondatrice et les dons et legs.</p><p>Statuts adoptés le {{date_statuts}}.</p></div>`
  },
  {
    code: 'fond2_dotation_initiale',
    name: "Accord de dotation initiale de fondation",
    category: 'association', price: 4000, priceMax: 12000,
    description: "Acte de dotation initiale par lequel l'entreprise fondatrice transfère les ressources nécessaires à la fondation pour son démarrage.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'entreprise_donatrice',label:"Entreprise donatrice",type:'text',required:true},
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'montant_dotation',label:"Montant de la dotation (FCFA)",type:'text',required:true},
      {key:'nature_apport',label:"Nature de l'apport (numéraire, immobilier...)",type:'text',required:true},
      {key:'date_dotation',label:"Date de la dotation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE DOTATION INITIALE</h1><p>Entre <strong>{{entreprise_donatrice}}</strong> (ci-après le Donateur) et la fondation <strong>{{nom_fondation}}</strong> (ci-après la Fondation).</p><h2>ARTICLE 1 — OBJET</h2><p>Le Donateur s'engage à doter la Fondation de la somme de {{montant_dotation}} FCFA sous forme de : {{nature_apport}}</p><h2>ARTICLE 2 — AFFECTATION</h2><p>Cette dotation est affectée exclusivement à la réalisation de l'objet statutaire de la Fondation et ne peut être remboursée au Donateur.</p><h2>ARTICLE 3 — MODALITÉS DE VERSEMENT</h2><p>Le versement intervient en une ou plusieurs tranches selon le calendrier annexé, à compter du {{date_dotation}}.</p></div>`
  },
  {
    code: 'fond2_programme_action',
    name: "Accord de programme d'action fondation",
    category: 'association', price: 3000, priceMax: 8500,
    description: "Document définissant le programme d'actions pluriannuel d'une fondation d'entreprise, avec objectifs, activités et budget prévisionnel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'periode',label:"Période du programme",type:'text',required:true},
      {key:'axes_action',label:"Axes d'action prioritaires",type:'textarea',required:true},
      {key:'budget_global',label:"Budget global (FCFA)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROGRAMME D'ACTION {{periode}} — {{nom_fondation}}</h1><h2>ARTICLE 1 — AXES PRIORITAIRES</h2><p>Pour la période {{periode}}, la fondation concentre son action sur : {{axes_action}}</p><h2>ARTICLE 2 — BUDGET PRÉVISIONNEL</h2><p>Budget global alloué : {{budget_global}} FCFA, réparti par axe selon l'annexe budgétaire.</p><h2>ARTICLE 3 — PILOTAGE</h2><p>Le programme est piloté par le Directeur Exécutif sous la supervision du Conseil d'Administration, avec un bilan semestriel.</p><p>Adopté le {{date_adoption}} par le Conseil d'Administration.</p></div>`
  },
  {
    code: 'fond2_partenariat_universite',
    name: "Accord de partenariat fondation-université",
    category: 'association', price: 3500, priceMax: 9000,
    description: "Convention de partenariat entre une fondation d'entreprise et une université pour des programmes de bourses, recherche ou formation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'universite',label:"Université partenaire",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'contribution_fondation',label:"Contribution de la fondation (FCFA/an)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT FONDATION-UNIVERSITÉ</h1><p>Entre <strong>{{nom_fondation}}</strong> et <strong>{{universite}}</strong>.</p><h2>ARTICLE 1 — OBJET</h2><p>{{objet_partenariat}}</p><h2>ARTICLE 2 — CONTRIBUTIONS</h2><p>La Fondation apporte une contribution annuelle de {{contribution_fondation}} FCFA. L'Université met à disposition ses infrastructures, enseignants et expertise académique.</p><h2>ARTICLE 3 — GOUVERNANCE DU PARTENARIAT</h2><p>Un comité de pilotage conjoint se réunit deux fois par an pour évaluer les résultats.</p><p>Signé le {{date_signature}}.</p></div>`
  },
  {
    code: 'fond2_partenariat_ecole',
    name: "Accord de partenariat fondation-école (éducation)",
    category: 'association', price: 3000, priceMax: 8000,
    description: "Convention de partenariat éducatif entre une fondation et un établissement scolaire pour améliorer l'accès et la qualité de l'éducation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'ecole',label:"Établissement scolaire partenaire",type:'text',required:true},
      {key:'programme_education',label:"Programme éducatif soutenu",type:'textarea',required:true},
      {key:'apport_fondation',label:"Apport de la fondation",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT FONDATION-ÉCOLE</h1><p>Entre <strong>{{nom_fondation}}</strong> et <strong>{{ecole}}</strong>.</p><h2>ARTICLE 1 — PROGRAMME SOUTENU</h2><p>{{programme_education}}</p><h2>ARTICLE 2 — APPORT DE LA FONDATION</h2><p>{{apport_fondation}}</p><h2>ARTICLE 3 — OBLIGATIONS DE L'ÉCOLE</h2><p>L'école s'engage à rendre compte de l'utilisation des ressources, à accueillir les visites de la fondation et à associer celle-ci aux événements clés.</p><p>Partenariat effectif au {{date_debut}}.</p></div>`
  },
  {
    code: 'fond2_partenariat_hopital',
    name: "Accord de partenariat fondation-hôpital (santé)",
    category: 'association', price: 3500, priceMax: 9500,
    description: "Convention de partenariat santé entre une fondation d'entreprise et un établissement hospitalier pour des programmes de santé communautaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'hopital',label:"Établissement hospitalier partenaire",type:'text',required:true},
      {key:'programme_sante',label:"Programme de santé soutenu",type:'textarea',required:true},
      {key:'financement',label:"Financement de la fondation (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT FONDATION-HÔPITAL</h1><p>Entre <strong>{{nom_fondation}}</strong> et <strong>{{hopital}}</strong>.</p><h2>ARTICLE 1 — PROGRAMME DE SANTÉ</h2><p>{{programme_sante}}</p><h2>ARTICLE 2 — FINANCEMENT</h2><p>La Fondation alloue {{financement}} FCFA pour la mise en oeuvre du programme.</p><h2>ARTICLE 3 — SUIVI MÉDICAL ET REPORTING</h2><p>L'hôpital fournit des rapports trimestriels sur les bénéficiaires touchés, les actes réalisés et l'impact sanitaire mesuré.</p><p>Démarrage : {{date_debut}}.</p></div>`
  },
  {
    code: 'fond2_partenariat_ong',
    name: "Accord de partenariat fondation-ONG (projet social)",
    category: 'association', price: 3000, priceMax: 8000,
    description: "Convention de partenariat entre une fondation d'entreprise et une ONG pour la co-mise en oeuvre d'un projet à impact social.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'ong',label:"ONG partenaire",type:'text',required:true},
      {key:'projet',label:"Intitulé du projet social",type:'text',required:true},
      {key:'budget',label:"Budget du projet (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT FONDATION-ONG</h1><p>Entre <strong>{{nom_fondation}}</strong> et <strong>{{ong}}</strong> pour la mise en oeuvre du projet : <strong>{{projet}}</strong>.</p><h2>ARTICLE 1 — RÔLES ET RESPONSABILITÉS</h2><p>La Fondation apporte le financement et la légitimité institutionnelle. L'ONG assure l'exécution opérationnelle et la relation avec les communautés.</p><h2>ARTICLE 2 — BUDGET</h2><p>Budget global : {{budget}} FCFA, géré selon les procédures financières convenues.</p><h2>ARTICLE 3 — REDEVABILITÉ</h2><p>L'ONG soumet des rapports narratifs et financiers trimestriels à la Fondation.</p><p>Démarrage : {{date_debut}}.</p></div>`
  },
  {
    code: 'fond2_service_bourse',
    name: "Accord de service de bourse fondation entreprise",
    category: 'association', price: 2500, priceMax: 7000,
    description: "Convention d'attribution de bourse entre une fondation d'entreprise et un étudiant ou chercheur bénéficiaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'boursier',label:"Nom du boursier",type:'text',required:true},
      {key:'programme_etude',label:"Programme d'études / recherche",type:'text',required:true},
      {key:'montant_bourse',label:"Montant de la bourse (FCFA/an)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la bourse",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE BOURSE — {{nom_fondation}}</h1><p>Entre <strong>{{nom_fondation}}</strong> (ci-après la Fondation) et <strong>{{boursier}}</strong> (ci-après le Boursier).</p><h2>ARTICLE 1 — OBJET DE LA BOURSE</h2><p>La Fondation octroie au Boursier une bourse d'études / de recherche pour le programme : {{programme_etude}}</p><h2>ARTICLE 2 — MONTANT ET VERSEMENTS</h2><p>La bourse est d'un montant de {{montant_bourse}} FCFA par an, versée mensuellement sur le compte du Boursier à compter du {{date_debut}}.</p><h2>ARTICLE 3 — OBLIGATIONS DU BOURSIER</h2><p>Le Boursier s'engage à maintenir ses résultats académiques, à informer la Fondation de tout changement de situation et à participer aux événements de la Fondation.</p></div>`
  },
  {
    code: 'fond2_service_pro_bono',
    name: "Accord de service de don de compétences salariés (pro bono)",
    category: 'association', price: 2500, priceMax: 6500,
    description: "Convention de mise à disposition pro bono de collaborateurs d'une entreprise au profit d'associations ou de fondations partenaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise mécène",type:'text',required:true},
      {key:'beneficiaire',label:"Organisation bénéficiaire",type:'text',required:true},
      {key:'competences_mises_a_dispo',label:"Compétences mises à disposition",type:'textarea',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE DON DE COMPÉTENCES (PRO BONO)</h1><p>Entre <strong>{{entreprise}}</strong> (Mécène) et <strong>{{beneficiaire}}</strong> (Bénéficiaire).</p><h2>ARTICLE 1 — COMPÉTENCES MISES À DISPOSITION</h2><p>{{competences_mises_a_dispo}}</p><h2>ARTICLE 2 — DURÉE</h2><p>{{duree_mission}}, à compter du {{date_debut}}.</p><h2>ARTICLE 3 — CONDITIONS</h2><p>Les collaborateurs conservent leur statut salarié. L'entreprise ne réclame aucune contrepartie financière. Le bénéficiaire s'engage à respecter les obligations de confidentialité.</p></div>`
  },
  {
    code: 'fond2_service_mecenat_culturel',
    name: "Accord de service de mécénat culturel (fondation)",
    category: 'association', price: 3000, priceMax: 8500,
    description: "Convention de mécénat culturel entre une fondation d'entreprise et un organisme culturel, avec contreparties et avantages fiscaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'fondation',label:"Fondation mécène",type:'text',required:true},
      {key:'organisme_culture',label:"Organisme culturel bénéficiaire",type:'text',required:true},
      {key:'projet_culturel',label:"Projet culturel soutenu",type:'text',required:true},
      {key:'montant_mecenat',label:"Montant du mécénat (FCFA)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MÉCÉNAT CULTUREL</h1><p>Entre <strong>{{fondation}}</strong> (Mécène) et <strong>{{organisme_culture}}</strong> (Bénéficiaire).</p><h2>ARTICLE 1 — PROJET SOUTENU</h2><p>Le Mécène apporte son soutien financier au projet culturel suivant : {{projet_culturel}}</p><h2>ARTICLE 2 — MONTANT</h2><p>{{montant_mecenat}} FCFA, versé selon l'échéancier annexé.</p><h2>ARTICLE 3 — CONTREPARTIES</h2><p>Le Bénéficiaire assure la visibilité du Mécène : mention dans les supports de communication, invitation aux événements, rapport d'impact.</p><p>Convention signée le {{date_convention}}.</p></div>`
  },
  {
    code: 'fond2_service_mecenat_sportif',
    name: "Accord de service de mécénat sportif",
    category: 'association', price: 2500, priceMax: 7000,
    description: "Convention de mécénat sportif entre une fondation ou entreprise et une organisation sportive, avec plan de visibilité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'mecenat',label:"Mécène (fondation / entreprise)",type:'text',required:true},
      {key:'organisation_sport',label:"Organisation sportive bénéficiaire",type:'text',required:true},
      {key:'evenement_sportif',label:"Événement / programme sportif",type:'text',required:true},
      {key:'montant',label:"Montant du mécénat (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MÉCÉNAT SPORTIF</h1><p>Entre <strong>{{mecenat}}</strong> et <strong>{{organisation_sport}}</strong>.</p><h2>ARTICLE 1 — PROGRAMME SOUTENU</h2><p>{{evenement_sportif}}</p><h2>ARTICLE 2 — APPORT DU MÉCÈNE</h2><p>{{montant}} FCFA pour financer les équipements, la formation et les déplacements des athlètes.</p><h2>ARTICLE 3 — PLAN DE VISIBILITÉ</h2><p>Logo du Mécène sur les maillots et supports de communication, accès VIP aux compétitions, communiqués de presse conjoints.</p><p>Démarrage : {{date_debut}}.</p></div>`
  },
  {
    code: 'fond2_service_mecenat_environnement',
    name: "Accord de service de mécénat environnemental",
    category: 'association', price: 3000, priceMax: 8500,
    description: "Convention de mécénat environnemental entre une fondation et une organisation de protection de l'environnement en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'fondation',label:"Fondation mécène",type:'text',required:true},
      {key:'ong_environnement',label:"ONG environnementale bénéficiaire",type:'text',required:true},
      {key:'programme_env',label:"Programme environnemental soutenu",type:'textarea',required:true},
      {key:'montant',label:"Montant (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MÉCÉNAT ENVIRONNEMENTAL</h1><p>Entre <strong>{{fondation}}</strong> et <strong>{{ong_environnement}}</strong>.</p><h2>ARTICLE 1 — PROGRAMME SOUTENU</h2><p>{{programme_env}}</p><h2>ARTICLE 2 — CONTRIBUTION</h2><p>{{montant}} FCFA affectés exclusivement au programme environnemental ci-dessus.</p><h2>ARTICLE 3 — IMPACT ET REPORTING</h2><p>Le Bénéficiaire s'engage à mesurer et à communiquer l'impact environnemental des actions financées (hectares restaurés, tonnes de CO2 évitées, espèces protégées...).</p><p>Démarrage : {{date_debut}}.</p></div>`
  },
  {
    code: 'fond2_service_philanthro_capitalisme',
    name: "Accord de service de philanthro-capitalisme (impact investing)",
    category: 'association', price: 5000, priceMax: 15000,
    description: "Convention d'investissement à impact social et financier entre une fondation et une entreprise à vocation sociale en Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'fondation_investisseur',label:"Fondation investisseur",type:'text',required:true},
      {key:'entreprise_sociale',label:"Entreprise à impact social",type:'text',required:true},
      {key:'montant_investissement',label:"Montant de l'investissement (FCFA)",type:'text',required:true},
      {key:'objectif_impact',label:"Objectif d'impact social visé",type:'textarea',required:true},
      {key:'date_investissement',label:"Date de l'investissement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION D'IMPACT INVESTING</h1><p>Entre <strong>{{fondation_investisseur}}</strong> (Investisseur) et <strong>{{entreprise_sociale}}</strong> (Bénéficiaire).</p><h2>ARTICLE 1 — INVESTISSEMENT</h2><p>L'Investisseur consent un investissement de {{montant_investissement}} FCFA dans l'entreprise sociale selon les modalités définies en annexe (dette, equity, hybride).</p><h2>ARTICLE 2 — IMPACT SOCIAL VISÉ</h2><p>{{objectif_impact}}</p><h2>ARTICLE 3 — MESURE D'IMPACT</h2><p>Un rapport d'impact annuel est produit selon le cadre IRIS+ ou équivalent. Le retour financier est plafonné pour préserver la mission sociale.</p><p>Investissement effectué le {{date_investissement}}.</p></div>`
  },
  {
    code: 'fond2_service_fonds_dotation',
    name: "Accord de service de fonds de dotation (capital perpétuel)",
    category: 'association', price: 5000, priceMax: 15000,
    description: "Convention de constitution et de gestion d'un fonds de dotation à capital perpétuel pour une fondation d'entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'fondation',label:"Fondation constituante",type:'text',required:true},
      {key:'gestionnaire_actifs',label:"Gestionnaire d'actifs mandaté",type:'text',required:true},
      {key:'capital_initial',label:"Capital initial du fonds (FCFA)",type:'text',required:true},
      {key:'politique_investissement',label:"Politique d'investissement",type:'textarea',required:true},
      {key:'date_constitution',label:"Date de constitution",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FONDS DE DOTATION À CAPITAL PERPÉTUEL</h1><p>Entre <strong>{{fondation}}</strong> (Constituant) et <strong>{{gestionnaire_actifs}}</strong> (Gestionnaire).</p><h2>ARTICLE 1 — CAPITAL DU FONDS</h2><p>Le fonds de dotation est constitué d'un capital initial de {{capital_initial}} FCFA, intangible et géré en vue de sa pérennité.</p><h2>ARTICLE 2 — POLITIQUE D'INVESTISSEMENT</h2><p>{{politique_investissement}}</p><h2>ARTICLE 3 — UTILISATION DES REVENUS</h2><p>Seuls les revenus du fonds (intérêts, dividendes, plus-values) peuvent être utilisés pour financer les programmes de la fondation. Le capital reste intact.</p><p>Constitué le {{date_constitution}}.</p></div>`
  },
  {
    code: 'fond2_convention_communication',
    name: "Accord de convention de communication fondation (presse)",
    category: 'association', price: 2500, priceMax: 6500,
    description: "Contrat de prestation de relations presse et communication institutionnelle pour une fondation d'entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'fondation',label:"Fondation cliente",type:'text',required:true},
      {key:'agence_rp',label:"Agence RP / prestataire",type:'text',required:true},
      {key:'prestations',label:"Prestations de communication prévues",type:'textarea',required:true},
      {key:'budget',label:"Budget annuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE COMMUNICATION FONDATION</h1><p>Entre <strong>{{fondation}}</strong> et <strong>{{agence_rp}}</strong>.</p><h2>ARTICLE 1 — PRESTATIONS</h2><p>{{prestations}}</p><h2>ARTICLE 2 — BUDGET</h2><p>Budget annuel : {{budget}} FCFA, réparti selon le plan de communication annexé.</p><h2>ARTICLE 3 — VALIDATION</h2><p>Tout communiqué ou contenu diffusé au nom de la Fondation est soumis à validation préalable du Directeur Exécutif.</p><p>Démarrage : {{date_debut}}.</p></div>`
  },
  {
    code: 'fond2_service_reporting_impact',
    name: "Accord de service de reporting et impact fondation",
    category: 'association', price: 3000, priceMax: 8000,
    description: "Contrat de prestation pour la mesure, l'évaluation et le reporting de l'impact social des programmes d'une fondation d'entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'fondation',label:"Fondation cliente",type:'text',required:true},
      {key:'prestataire_impact',label:"Prestataire mesure d'impact",type:'text',required:true},
      {key:'programmes',label:"Programmes évalués",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — REPORTING ET IMPACT FONDATION</h1><p>Entre <strong>{{fondation}}</strong> et <strong>{{prestataire_impact}}</strong>.</p><h2>ARTICLE 1 — PROGRAMMES COUVERTS</h2><p>{{programmes}}</p><h2>ARTICLE 2 — MÉTHODOLOGIE</h2><p>Le Prestataire utilise des cadres reconnus (SROI, IRIS+, ODD) pour mesurer et valoriser l'impact social des programmes de la Fondation.</p><h2>ARTICLE 3 — LIVRABLES</h2><p>Tableau de bord d'impact, rapport annuel d'impact et infographies de communication.</p><p>Honoraires : {{honoraires}} FCFA. Démarrage : {{date_debut}}.</p></div>`
  },
  {
    code: 'fond2_service_gouvernance_conseil',
    name: "Accord de service de gouvernance fondation (conseil)",
    category: 'association', price: 4000, priceMax: 11000,
    description: "Mission de conseil en gouvernance pour une fondation d'entreprise : évaluation du CA, charte de gouvernance et recommandations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'fondation',label:"Fondation cliente",type:'text',required:true},
      {key:'cabinet_conseil',label:"Cabinet conseil",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de la mission",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GOUVERNANCE FONDATION</h1><p>Entre <strong>{{fondation}}</strong> et <strong>{{cabinet_conseil}}</strong>.</p><h2>ARTICLE 1 — PÉRIMÈTRE</h2><p>{{perimetre}}</p><h2>ARTICLE 2 — LIVRABLES</h2><p>Diagnostic de gouvernance, charte de gouvernance actualisée, grille d'évaluation du Conseil d'Administration et plan d'amélioration priorité.</p><h2>ARTICLE 3 — HONORAIRES</h2><p>{{honoraires}} FCFA. Mission débutant le {{date_debut}}.</p></div>`
  },
  {
    code: 'fond2_service_conformite_fiscale',
    name: "Accord de service de conformité fiscale fondation (don déductible CI)",
    category: 'association', price: 3500, priceMax: 10000,
    description: "Mission d'audit et de mise en conformité fiscale d'une fondation pour bénéficier du régime de déductibilité des dons en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'fondation',label:"Fondation cliente",type:'text',required:true},
      {key:'cabinet_fiscal',label:"Cabinet fiscal",type:'text',required:true},
      {key:'perimetre_fiscal',label:"Périmètre de la mission fiscale",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CONFORMITÉ FISCALE FONDATION</h1><p>Entre <strong>{{fondation}}</strong> et <strong>{{cabinet_fiscal}}</strong>.</p><h2>ARTICLE 1 — OBJET</h2><p>{{perimetre_fiscal}}</p><h2>ARTICLE 2 — PRESTATIONS</h2><p>Analyse du statut fiscal de la fondation, démarches auprès de la DGI pour reconnaissance du droit à déduction des dons, rédaction des reçus fiscaux et assistance en cas de contrôle.</p><h2>ARTICLE 3 — HONORAIRES</h2><p>{{honoraires}} FCFA. Démarrage : {{date_debut}}.</p></div>`
  },
  {
    code: 'fond2_service_numerisation',
    name: "Accord de service de numérisation fondation (plateforme)",
    category: 'association', price: 4000, priceMax: 11000,
    description: "Contrat de développement d'une plateforme numérique pour une fondation : gestion des dons, candidatures aux bourses et reporting.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'fondation',label:"Fondation cliente",type:'text',required:true},
      {key:'prestataire_tech',label:"Prestataire technologique",type:'text',required:true},
      {key:'fonctionnalites',label:"Fonctionnalités requises",type:'textarea',required:true},
      {key:'budget_projet',label:"Budget du projet (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PLATEFORME NUMÉRIQUE FONDATION</h1><p>Entre <strong>{{fondation}}</strong> et <strong>{{prestataire_tech}}</strong>.</p><h2>ARTICLE 1 — FONCTIONNALITÉS</h2><p>{{fonctionnalites}}</p><h2>ARTICLE 2 — BUDGET</h2><p>Budget global du projet : {{budget_projet}} FCFA, selon le planning de livraison annexé.</p><h2>ARTICLE 3 — MAINTENANCE</h2><p>Le Prestataire assure une maintenance corrective et évolutive pendant 12 mois après la mise en production.</p><p>Livraison prévue le {{date_livraison}}.</p></div>`
  },
  {
    code: 'fond2_partenariat_institution_internationale',
    name: "Accord de partenariat fondation-institution internationale",
    category: 'association', price: 5000, priceMax: 14000,
    description: "Convention de partenariat stratégique entre une fondation d'entreprise africaine et une institution internationale (ONU, Banque Mondiale, etc.).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'fondation',label:"Fondation partenaire",type:'text',required:true},
      {key:'institution',label:"Institution internationale",type:'text',required:true},
      {key:'programme_commun',label:"Programme ou initiative commune",type:'textarea',required:true},
      {key:'apports_respectifs',label:"Apports respectifs des parties",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT STRATÉGIQUE</h1><p>Entre <strong>{{fondation}}</strong> et <strong>{{institution}}</strong>.</p><h2>ARTICLE 1 — PROGRAMME COMMUN</h2><p>{{programme_commun}}</p><h2>ARTICLE 2 — CONTRIBUTIONS DES PARTIES</h2><p>{{apports_respectifs}}</p><h2>ARTICLE 3 — GOUVERNANCE DU PARTENARIAT</h2><p>Un comité de coordination conjoint se réunit semestriellement. Les décisions sont prises par consensus.</p><p>Signé le {{date_signature}}.</p></div>`
  },
  {
    code: 'fond2_service_formation_philanthropie',
    name: "Accord de service de formation philanthropie",
    category: 'association', price: 3000, priceMax: 8000,
    description: "Contrat de formation sur la philanthropie stratégique, le mécénat et l'investissement social à destination des dirigeants d'entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'fondation',label:"Fondation / organisation cliente",type:'text',required:true},
      {key:'formateur',label:"Formateur / institution de formation",type:'text',required:true},
      {key:'contenu_formation',label:"Contenu de la formation",type:'textarea',required:true},
      {key:'cout',label:"Coût de la formation (FCFA)",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN PHILANTHROPIE</h1><p>Entre <strong>{{fondation}}</strong> et <strong>{{formateur}}</strong>.</p><h2>ARTICLE 1 — CONTENU</h2><p>{{contenu_formation}}</p><h2>ARTICLE 2 — MODALITÉS</h2><p>Formation en présentiel ou hybride. Remise de supports pédagogiques et attestation de participation.</p><h2>ARTICLE 3 — COÛT</h2><p>{{cout}} FCFA, payable avant la formation. Date de la formation : {{date_formation}}.</p></div>`
  },
  {
    code: 'fond2_rapport_annuel',
    name: "Rapport annuel fondation",
    category: 'association', price: 3000, priceMax: 8000,
    description: "Modèle de rapport annuel d'une fondation d'entreprise : bilan d'impact, états financiers et perspectives.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'annee',label:"Année du rapport",type:'text',required:true},
      {key:'president_ca',label:"Président du Conseil d'Administration",type:'text',required:true},
      {key:'chiffres_cles',label:"Chiffres clés de l'année",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL {{annee}} — {{nom_fondation}}</h1><h2>MESSAGE DU PRÉSIDENT DU CONSEIL D'ADMINISTRATION</h2><p>Cette année {{annee}}, la {{nom_fondation}} a confirmé son engagement en faveur du développement durable et de la solidarité en Côte d'Ivoire et en Afrique.</p><h2>CHIFFRES CLÉS</h2><p>{{chiffres_cles}}</p><h2>NOS PROGRAMMES</h2><p>Détail des programmes et de leur impact en annexe.</p><h2>GOUVERNANCE ET FINANCES</h2><p>États financiers audités disponibles en annexe.</p><h2>PERSPECTIVES</h2><p>La Fondation amplifiera ses actions en partenariat avec les acteurs publics, privés et associatifs.</p><p>Le Président CA : {{president_ca}}<br/>Date : {{date_rapport}}</p></div>`
  },
  {
    code: 'fond2_plan_action',
    name: "Plan d'action fondation",
    category: 'association', price: 2500, priceMax: 7000,
    description: "Modèle de plan d'action annuel ou pluriannuel d'une fondation d'entreprise, articulant objectifs, activités, ressources et indicateurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_fondation',label:"Nom de la fondation",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'objectifs',label:"Objectifs prioritaires",type:'textarea',required:true},
      {key:'budget_plan',label:"Budget du plan (FCFA)",type:'text',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN D'ACTION {{periode}} — {{nom_fondation}}</h1><h2>OBJECTIFS PRIORITAIRES</h2><p>{{objectifs}}</p><h2>ACTIVITÉS ET CALENDRIER</h2><p>Les activités détaillées, responsables et échéances sont présentés dans la matrice d'action annexée.</p><h2>RESSOURCES</h2><p>Budget alloué : {{budget_plan}} FCFA, réparti par programme selon l'annexe budgétaire.</p><h2>INDICATEURS DE SUIVI</h2><p>Les indicateurs de performance sont mesurés trimestriellement et reportés au Conseil d'Administration.</p><p>Validé le {{date_validation}}.</p></div>`
  },
  {
    code: 'fond2_charte_philanthropie',
    name: "Charte de la philanthropie et de la solidarité entrepreneuriale en Afrique",
    category: 'association', price: 2000, priceMax: 5500,
    description: "Charte d'engagement éthique définissant les principes de philanthropie responsable et de solidarité entrepreneuriale pour les fondations africaines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'fondation',label:"Fondation signataire",type:'text',required:true},
      {key:'entreprise',label:"Entreprise fondatrice",type:'text',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques de la fondation",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA PHILANTHROPIE ET DE LA SOLIDARITÉ ENTREPRENEURIALE EN AFRIQUE</h1><h2>PRÉAMBULE</h2><p>La <strong>{{fondation}}</strong>, émanation de <strong>{{entreprise}}</strong>, adhère solennellement aux principes de la philanthropie responsable et de la solidarité entrepreneuriale tels qu'énoncés dans la présente charte.</p><h2>PRINCIPES FONDAMENTAUX</h2><p>1. Agir avec intégrité et transparence dans l'utilisation des ressources philanthropiques.<br/>2. Respecter la dignité et l'agentivité des communautés bénéficiaires.<br/>3. Mesurer et communiquer honnêtement l'impact des actions menées.<br/>4. Contribuer aux ODD et aux priorités de développement africaines.<br/>5. Favoriser les partenariats inclusifs et la co-construction avec les acteurs locaux.</p><h2>ENGAGEMENTS DE LA FONDATION</h2><p>{{engagements_specifiques}}</p><p>Signé le {{date_signature}} par les représentants de {{fondation}}.</p></div>`
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
  console.log(`Batch 111b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
