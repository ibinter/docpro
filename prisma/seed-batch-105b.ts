import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 RSE / Développement durable (catégorie: commercial_financier) ───
  {
    code: 'rse_politique_declaration',
    name: "Accord de Politique RSE Entreprise (Déclaration)",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Déclaration officielle de politique RSE définissant les engagements, valeurs et orientations stratégiques en matière de responsabilité sociétale de l'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true},
      {key:'secteur_activite',label:"Secteur d'activité",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la politique",type:'date',required:true},
      {key:'representant_legal',label:"Nom du représentant légal",type:'text',required:true},
      {key:'engagements_principaux',label:"Engagements RSE principaux",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE POLITIQUE RSE</h1><h2>{{raison_sociale}}</h2><p>Siège social : {{siege_social}}</p><p>Secteur : {{secteur_activite}}</p><h3>Engagements RSE</h3><p>{{engagements_principaux}}</p><p>Fait à Abidjan, le {{date_adoption}}</p><p>Le Représentant Légal : {{representant_legal}}</p></div>`
  },
  {
    code: 'rse_charte_ethique',
    name: "Accord de Charte Éthique et Conduite des Affaires",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Charte éthique définissant les principes de conduite des affaires, d'intégrité et de conformité applicables à l'ensemble des collaborateurs et partenaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'date_entree_vigueur',label:"Date d'entrée en vigueur",type:'date',required:true},
      {key:'directeur_general',label:"Nom du Directeur Général",type:'text',required:true},
      {key:'valeurs_cles',label:"Valeurs clés de l'entreprise",type:'textarea',required:true},
      {key:'sanctions_applicables',label:"Sanctions en cas de manquement",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CHARTE ÉTHIQUE ET CONDUITE DES AFFAIRES</h1><h2>{{entreprise}}</h2><p>En vigueur à compter du : {{date_entree_vigueur}}</p><h3>Nos Valeurs Clés</h3><p>{{valeurs_cles}}</p><h3>Sanctions</h3><p>{{sanctions_applicables}}</p><p>Le Directeur Général : {{directeur_general}}</p></div>`
  },
  {
    code: 'rse_rapport_annuel_gri',
    name: "Accord de Rapport RSE Annuel (GRI Standard)",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Rapport RSE annuel conforme aux normes GRI (Global Reporting Initiative) couvrant les indicateurs environnementaux, sociaux et de gouvernance.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'exercice',label:"Exercice fiscal concerné",type:'text',required:true},
      {key:'perimetre_rapport',label:"Périmètre du rapport",type:'textarea',required:true},
      {key:'indicateurs_gri',label:"Indicateurs GRI retenus",type:'textarea',required:true},
      {key:'date_publication',label:"Date de publication",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT RSE ANNUEL — GRI STANDARD</h1><h2>{{entreprise}} — Exercice {{exercice}}</h2><h3>Périmètre</h3><p>{{perimetre_rapport}}</p><h3>Indicateurs GRI</h3><p>{{indicateurs_gri}}</p><p>Publié le : {{date_publication}}</p></div>`
  },
  {
    code: 'rse_rapport_durabilite_csrd',
    name: "Accord de Rapport de Durabilité (CSRD Modèle)",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Rapport de durabilité adapté au modèle CSRD (Corporate Sustainability Reporting Directive) pour les entreprises souhaitant s'aligner sur les standards européens.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'entreprise',label:"Dénomination sociale",type:'text',required:true},
      {key:'annee_rapport',label:"Année du rapport",type:'text',required:true},
      {key:'double_materialite',label:"Résultats de l'analyse de double matérialité",type:'textarea',required:true},
      {key:'objectifs_durabilite',label:"Objectifs de durabilité",type:'textarea',required:true},
      {key:'auditeur',label:"Nom de l'auditeur externe",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE DURABILITÉ — MODÈLE CSRD</h1><h2>{{entreprise}} — {{annee_rapport}}</h2><h3>Double Matérialité</h3><p>{{double_materialite}}</p><h3>Objectifs de Durabilité</h3><p>{{objectifs_durabilite}}</p><p>Auditeur : {{auditeur}}</p></div>`
  },
  {
    code: 'rse_plan_strategique_materialite',
    name: "Accord de Plan RSE Stratégique (Matérialité)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Plan RSE stratégique fondé sur l'analyse de matérialité identifiant les enjeux prioritaires et les axes d'action pour les 3 à 5 prochaines années.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (ex: 2025-2030)",type:'text',required:true},
      {key:'enjeux_materiels',label:"Enjeux matériels identifiés",type:'textarea',required:true},
      {key:'axes_action',label:"Axes d'action prioritaires",type:'textarea',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel RSE",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>PLAN RSE STRATÉGIQUE</h1><h2>{{entreprise}} — {{horizon_plan}}</h2><h3>Enjeux Matériels</h3><p>{{enjeux_materiels}}</p><h3>Axes d'Action</h3><p>{{axes_action}}</p><p>Budget prévisionnel : {{budget_previsionnel}}</p></div>`
  },
  {
    code: 'rse_service_audit_esg',
    name: "Accord de Service d'Audit RSE et ESG",
    category: 'commercial_financier',
    price: 9000, priceMax: 25000,
    description: "Contrat de prestation d'audit RSE et ESG permettant l'évaluation indépendante des pratiques de l'entreprise et la production d'un rapport de conformité.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'auditeur',label:"Cabinet d'audit",type:'text',required:true},
      {key:'perimetre_audit',label:"Périmètre de l'audit",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
      {key:'honoraires',label:"Honoraires convenus (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT RSE ET ESG</h1><p>Entre <strong>{{client}}</strong> (Client) et <strong>{{auditeur}}</strong> (Auditeur)</p><h3>Périmètre</h3><p>{{perimetre_audit}}</p><p>Date de début : {{date_debut}}</p><p>Honoraires : {{honoraires}} FCFA</p></div>`
  },
  {
    code: 'rse_service_notation_esg',
    name: "Accord de Service de Notation ESG (Agence)",
    category: 'commercial_financier',
    price: 8500, priceMax: 24000,
    description: "Contrat de prestation avec une agence de notation ESG pour l'évaluation et la publication d'un score ESG de l'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'entreprise_notee',label:"Entreprise notée",type:'text',required:true},
      {key:'agence_notation',label:"Agence de notation ESG",type:'text',required:true},
      {key:'referentiel_notation',label:"Référentiel de notation utilisé",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison du score",type:'date',required:true},
      {key:'montant_prestation',label:"Montant de la prestation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NOTATION ESG</h1><p>Entre <strong>{{entreprise_notee}}</strong> et <strong>{{agence_notation}}</strong></p><p>Référentiel : {{referentiel_notation}}</p><p>Date de livraison : {{date_livraison}}</p><p>Montant : {{montant_prestation}} FCFA</p></div>`
  },
  {
    code: 'rse_partenariat_communaute',
    name: "Accord de Partenariat RSE Entreprise-Communauté",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Convention de partenariat entre une entreprise et une communauté locale définissant les engagements réciproques en matière de développement social et environnemental.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'communaute',label:"Nom de la communauté / village",type:'text',required:true},
      {key:'localite',label:"Localité / Département",type:'text',required:true},
      {key:'projets_prevus',label:"Projets communautaires prévus",type:'textarea',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT RSE ENTREPRISE-COMMUNAUTÉ</h1><p>Entre <strong>{{entreprise}}</strong> et la communauté de <strong>{{communaute}}</strong> ({{localite}})</p><h3>Projets Prévus</h3><p>{{projets_prevus}}</p><p>Durée : {{duree_partenariat}}</p><p>Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'rse_contribution_sociale_mecenat',
    name: "Accord de Contribution à un Projet Social (Mécénat d'Entreprise)",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Contrat de mécénat d'entreprise formalisant la contribution financière ou en nature à un projet social, culturel ou humanitaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'mecenat_entreprise',label:"Entreprise mécène",type:'text',required:true},
      {key:'beneficiaire',label:"Organisation bénéficiaire",type:'text',required:true},
      {key:'nature_contribution',label:"Nature de la contribution",type:'textarea',required:true},
      {key:'montant_ou_valeur',label:"Montant ou valeur estimée (FCFA)",type:'text',required:true},
      {key:'date_versement',label:"Date de versement prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉCÉNAT D'ENTREPRISE</h1><p><strong>{{mecenat_entreprise}}</strong> (Mécène) en faveur de <strong>{{beneficiaire}}</strong></p><h3>Nature de la Contribution</h3><p>{{nature_contribution}}</p><p>Valeur : {{montant_ou_valeur}} FCFA</p><p>Date de versement : {{date_versement}}</p></div>`
  },
  {
    code: 'rse_sponsoring_sportif',
    name: "Accord de Convention de Sponsoring Sportif RSE",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Convention de sponsoring sportif intégrant une dimension RSE, associant l'image de l'entreprise à des valeurs sportives et citoyennes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'sponsor',label:"Entreprise sponsor",type:'text',required:true},
      {key:'entite_sportive',label:"Club / Fédération sportive sponsorisée",type:'text',required:true},
      {key:'discipline',label:"Discipline sportive",type:'text',required:true},
      {key:'montant_sponsoring',label:"Montant du sponsoring (FCFA)",type:'text',required:true},
      {key:'duree_convention',label:"Durée de la convention",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SPONSORING SPORTIF RSE</h1><p><strong>{{sponsor}}</strong> (Sponsor) et <strong>{{entite_sportive}}</strong></p><p>Discipline : {{discipline}}</p><p>Montant : {{montant_sponsoring}} FCFA</p><p>Durée : {{duree_convention}} — à compter du {{date_debut}}</p></div>`
  },
  {
    code: 'rse_gestion_plaintes_communautes',
    name: "Accord de Service de Gestion des Plaintes Communautés",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Contrat de mise en place d'un mécanisme de gestion des plaintes et réclamations des communautés riveraines conformément aux standards internationaux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise commanditaire",type:'text',required:true},
      {key:'prestataire',label:"Prestataire du mécanisme",type:'text',required:true},
      {key:'zones_couvertes',label:"Zones communautaires couvertes",type:'textarea',required:true},
      {key:'delai_traitement',label:"Délai de traitement des plaintes",type:'text',required:true},
      {key:'date_mise_en_oeuvre',label:"Date de mise en oeuvre",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES PLAINTES COMMUNAUTAIRES</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{prestataire}}</strong></p><h3>Zones Couvertes</h3><p>{{zones_couvertes}}</p><p>Délai de traitement : {{delai_traitement}}</p><p>Date de mise en oeuvre : {{date_mise_en_oeuvre}}</p></div>`
  },
  {
    code: 'rse_diligence_droits_humains',
    name: "Accord de Service de Diligence Raisonnable Droits Humains (Due Diligence)",
    category: 'commercial_financier',
    price: 10000, priceMax: 28000,
    description: "Contrat de prestation de due diligence droits humains permettant d'identifier, prévenir et atténuer les risques liés aux droits fondamentaux dans la chaîne de valeur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 53,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'cabinet',label:"Cabinet spécialisé",type:'text',required:true},
      {key:'perimetre_chaine',label:"Périmètre de la chaîne de valeur",type:'textarea',required:true},
      {key:'risques_identifies',label:"Risques droits humains identifiés",type:'textarea',required:true},
      {key:'date_rapport',label:"Date prévue du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DUE DILIGENCE DROITS HUMAINS</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{cabinet}}</strong></p><h3>Périmètre</h3><p>{{perimetre_chaine}}</p><h3>Risques Identifiés</h3><p>{{risques_identifies}}</p><p>Rapport attendu le : {{date_rapport}}</p></div>`
  },
  {
    code: 'rse_achat_responsable_supply',
    name: "Accord de Politique d'Achat Responsable (Supply Chain)",
    category: 'commercial_financier',
    price: 5500, priceMax: 15000,
    description: "Politique d'achats responsables intégrant des critères sociaux, environnementaux et éthiques dans la sélection et l'évaluation des fournisseurs.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'criteres_selection',label:"Critères RSE de sélection fournisseurs",type:'textarea',required:true},
      {key:'processus_evaluation',label:"Processus d'évaluation des fournisseurs",type:'textarea',required:true},
      {key:'date_application',label:"Date d'application",type:'date',required:true},
      {key:'responsable_achats',label:"Responsable des achats",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>POLITIQUE D'ACHAT RESPONSABLE</h1><h2>{{entreprise}}</h2><h3>Critères de Sélection</h3><p>{{criteres_selection}}</p><h3>Processus d'Évaluation</h3><p>{{processus_evaluation}}</p><p>En vigueur le : {{date_application}} — Responsable : {{responsable_achats}}</p></div>`
  },
  {
    code: 'rse_reporting_dpef',
    name: "Accord de Service de Reporting DPEF (Déclaration de Performance Extra-Financière)",
    category: 'commercial_financier',
    price: 7500, priceMax: 20000,
    description: "Contrat d'accompagnement à la rédaction de la Déclaration de Performance Extra-Financière (DPEF) conforme aux exigences légales et aux attentes des parties prenantes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'consultant',label:"Cabinet consultant",type:'text',required:true},
      {key:'exercice_cible',label:"Exercice fiscal ciblé",type:'text',required:true},
      {key:'themes_dpef',label:"Thèmes DPEF à traiter",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REPORTING DPEF</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{consultant}}</strong></p><p>Exercice : {{exercice_cible}}</p><h3>Thèmes DPEF</h3><p>{{themes_dpef}}</p><p>Livraison le : {{date_livraison}}</p></div>`
  },
  {
    code: 'rse_impact_social_sroi',
    name: "Accord de Service d'Évaluation de l'Impact Social (SROI)",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Contrat d'évaluation du retour social sur investissement (SROI) mesurant la valeur sociale, environnementale et économique créée par les activités RSE de l'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise évaluée",type:'text',required:true},
      {key:'evaluateur',label:"Organisme évaluateur",type:'text',required:true},
      {key:'programmes_evalues',label:"Programmes RSE évalués",type:'textarea',required:true},
      {key:'periode_evaluation',label:"Période d'évaluation",type:'text',required:true},
      {key:'date_rapport_final',label:"Date du rapport final",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ÉVALUATION SROI</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{evaluateur}}</strong></p><h3>Programmes Évalués</h3><p>{{programmes_evalues}}</p><p>Période : {{periode_evaluation}}</p><p>Rapport final le : {{date_rapport_final}}</p></div>`
  },
  {
    code: 'rse_formation_employes',
    name: "Accord de Service de Formation RSE Employés",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Contrat de formation des collaborateurs aux enjeux RSE, développement durable et éthique des affaires pour une culture d'entreprise responsable.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'modules_formation',label:"Modules de formation RSE",type:'textarea',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION RSE EMPLOYÉS</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{organisme_formation}}</strong></p><p>Nombre de stagiaires : {{nombre_stagiaires}}</p><h3>Modules</h3><p>{{modules_formation}}</p><p>Date : {{date_formation}}</p></div>`
  },
  {
    code: 'rse_partenariat_universite',
    name: "Accord de Partenariat Entreprise-Université (RSE)",
    category: 'commercial_financier',
    price: 4000, priceMax: 11000,
    description: "Convention de partenariat RSE entre une entreprise et une université pour des projets de recherche, stages, chaires ou programmes d'enseignement sur le développement durable.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise partenaire",type:'text',required:true},
      {key:'universite',label:"Université / Établissement",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat RSE",type:'textarea',required:true},
      {key:'apports_entreprise',label:"Apports de l'entreprise",type:'textarea',required:true},
      {key:'duree',label:"Durée du partenariat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ENTREPRISE-UNIVERSITÉ (RSE)</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{universite}}</strong></p><h3>Objet</h3><p>{{objet_partenariat}}</p><h3>Apports de l'Entreprise</h3><p>{{apports_entreprise}}</p><p>Durée : {{duree}}</p></div>`
  },
  {
    code: 'rse_accompagnement_pme',
    name: "Accord de Service d'Accompagnement PME vers RSE",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Contrat d'accompagnement spécialisé pour aider les PME à intégrer la RSE dans leur stratégie et leurs opérations selon une approche progressive et adaptée.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'pme_beneficiaire',label:"PME bénéficiaire",type:'text',required:true},
      {key:'consultant_rse',label:"Consultant RSE",type:'text',required:true},
      {key:'diagnostic_initial',label:"Résultats du diagnostic initial",type:'textarea',required:true},
      {key:'plan_accompagnement',label:"Plan d'accompagnement",type:'textarea',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACCOMPAGNEMENT PME VERS LA RSE</h1><p>Entre <strong>{{pme_beneficiaire}}</strong> et <strong>{{consultant_rse}}</strong></p><h3>Diagnostic Initial</h3><p>{{diagnostic_initial}}</p><h3>Plan d'Accompagnement</h3><p>{{plan_accompagnement}}</p><p>Durée : {{duree_mission}}</p></div>`
  },
  {
    code: 'rse_prix_concours',
    name: "Accord de Service de Prix RSE (Concours)",
    category: 'commercial_financier',
    price: 3500, priceMax: 9000,
    description: "Accord organisant un prix ou concours RSE pour récompenser les meilleures pratiques de responsabilité sociétale au sein d'un secteur ou territoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 49,
    fieldsJson: F([
      {key:'organisateur',label:"Organisateur du prix RSE",type:'text',required:true},
      {key:'nom_prix',label:"Nom du prix / concours",type:'text',required:true},
      {key:'categories_prix',label:"Catégories du prix",type:'textarea',required:true},
      {key:'criteres_jury',label:"Critères d'évaluation du jury",type:'textarea',required:true},
      {key:'date_remise',label:"Date de remise des prix",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRIX RSE</h1><h2>{{nom_prix}}</h2><p>Organisateur : {{organisateur}}</p><h3>Catégories</h3><p>{{categories_prix}}</p><h3>Critères d'Évaluation</h3><p>{{criteres_jury}}</p><p>Remise des prix : {{date_remise}}</p></div>`
  },
  {
    code: 'rse_communication_campagne',
    name: "Accord de Service de Communication RSE (Campagne)",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Contrat de prestation de communication RSE pour la conception et la diffusion d'une campagne valorisant les engagements et réalisations de l'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise commanditaire",type:'text',required:true},
      {key:'agence_comm',label:"Agence de communication",type:'text',required:true},
      {key:'messages_cles',label:"Messages clés de la campagne",type:'textarea',required:true},
      {key:'supports_prevus',label:"Supports de communication prévus",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement de la campagne",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMMUNICATION RSE</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{agence_comm}}</strong></p><h3>Messages Clés</h3><p>{{messages_cles}}</p><h3>Supports Prévus</h3><p>{{supports_prevus}}</p><p>Lancement : {{date_lancement}}</p></div>`
  },
  {
    code: 'rse_reboisement_entreprise',
    name: "Accord de Service de Projet de Reboisement d'Entreprise",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat de service pour la mise en oeuvre d'un projet de reboisement par une entreprise dans le cadre de sa politique RSE environnementale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise commanditaire",type:'text',required:true},
      {key:'prestataire_reboisement',label:"Opérateur de reboisement",type:'text',required:true},
      {key:'zone_reboisement',label:"Zone de reboisement",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie (hectares)",type:'text',required:true},
      {key:'essences_plantees',label:"Essences d'arbres plantées",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REBOISEMENT D'ENTREPRISE</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{prestataire_reboisement}}</strong></p><p>Zone : {{zone_reboisement}} — Superficie : {{superficie_ha}} ha</p><h3>Essences</h3><p>{{essences_plantees}}</p><p>Lancement : {{date_lancement}}</p></div>`
  },
  {
    code: 'rse_solidarite_don_rtt',
    name: "Accord de Service de Solidarité Employé (Don de RTT)",
    category: 'commercial_financier',
    price: 3000, priceMax: 8000,
    description: "Accord encadrant le dispositif de don de jours de RTT entre collègues ou à des associations, dans le cadre d'une démarche de solidarité interne RSE.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'representant_syndical',label:"Représentant syndical / DRH",type:'text',required:true},
      {key:'modalites_don',label:"Modalités du don de RTT",type:'textarea',required:true},
      {key:'beneficiaires_eligibles',label:"Bénéficiaires éligibles",type:'textarea',required:true},
      {key:'date_entree_vigueur',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOLIDARITÉ EMPLOYÉ — DON DE RTT</h1><h2>{{entreprise}}</h2><h3>Modalités du Don</h3><p>{{modalites_don}}</p><h3>Bénéficiaires Éligibles</h3><p>{{beneficiaires_eligibles}}</p><p>En vigueur le : {{date_entree_vigueur}}</p></div>`
  },
  {
    code: 'rse_rapport_bilan',
    name: "Rapport de Bilan RSE",
    category: 'commercial_financier',
    price: 6000, priceMax: 17000,
    description: "Rapport de bilan RSE présentant les réalisations, indicateurs de performance et résultats obtenus au regard des engagements RSE de l'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'periode_bilan',label:"Période couverte par le bilan",type:'text',required:true},
      {key:'realisations',label:"Principales réalisations RSE",type:'textarea',required:true},
      {key:'indicateurs_performance',label:"Indicateurs de performance clés",type:'textarea',required:true},
      {key:'perspectives',label:"Perspectives pour la prochaine période",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE BILAN RSE</h1><h2>{{entreprise}} — {{periode_bilan}}</h2><h3>Réalisations</h3><p>{{realisations}}</p><h3>Indicateurs de Performance</h3><p>{{indicateurs_performance}}</p><h3>Perspectives</h3><p>{{perspectives}}</p></div>`
  },
  {
    code: 'rse_plan_action',
    name: "Plan d'Action RSE",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Document de planification opérationnelle RSE déclinant les objectifs en actions concrètes, responsables, délais et ressources pour la mise en oeuvre de la stratégie RSE.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'annee_plan',label:"Année du plan d'action",type:'text',required:true},
      {key:'pilier_environnement',label:"Actions pilier Environnement",type:'textarea',required:true},
      {key:'pilier_social',label:"Actions pilier Social",type:'textarea',required:true},
      {key:'pilier_gouvernance',label:"Actions pilier Gouvernance",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN D'ACTION RSE {{annee_plan}}</h1><h2>{{entreprise}}</h2><h3>Environnement</h3><p>{{pilier_environnement}}</p><h3>Social</h3><p>{{pilier_social}}</p><h3>Gouvernance</h3><p>{{pilier_gouvernance}}</p></div>`
  },
  {
    code: 'rse_charte_developpement_durable',
    name: "Charte du Développement Durable et de la Responsabilité des Entreprises",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Charte engageant l'entreprise dans une démarche de développement durable couvrant les dimensions économique, sociale et environnementale conformément aux principes du Pacte Mondial.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'pdg',label:"Président Directeur Général",type:'text',required:true},
      {key:'engagements_environnementaux',label:"Engagements environnementaux",type:'textarea',required:true},
      {key:'engagements_sociaux',label:"Engagements sociaux",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU DÉVELOPPEMENT DURABLE ET DE LA RESPONSABILITÉ DES ENTREPRISES</h1><h2>{{entreprise}}</h2><h3>Engagements Environnementaux</h3><p>{{engagements_environnementaux}}</p><h3>Engagements Sociaux</h3><p>{{engagements_sociaux}}</p><p>Adopté le {{date_adoption}} par {{pdg}}</p></div>`
  },
  // ─── 25 Bilan carbone / Offset / Climat (catégorie: agro_environnement) ───
  {
    code: 'carb_bilan_carbone_ghg',
    name: "Accord de Service de Bilan Carbone Entreprise (GHG Protocol)",
    category: 'agro_environnement',
    price: 8000, priceMax: 22000,
    description: "Contrat de réalisation d'un bilan carbone entreprise selon le protocole GHG, couvrant les émissions de gaz à effet de serre des scopes 1, 2 et 3.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'bureau_etude',label:"Bureau d'étude carbone",type:'text',required:true},
      {key:'annee_reference',label:"Année de référence du bilan",type:'text',required:true},
      {key:'perimetre_organisationnel',label:"Périmètre organisationnel",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BILAN CARBONE (GHG PROTOCOL)</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{bureau_etude}}</strong></p><p>Année de référence : {{annee_reference}}</p><h3>Périmètre Organisationnel</h3><p>{{perimetre_organisationnel}}</p><p>Livraison : {{date_livraison}}</p></div>`
  },
  {
    code: 'carb_audit_emissions_scopes',
    name: "Accord de Service d'Audit des Émissions (Scope 1, 2, 3)",
    category: 'agro_environnement',
    price: 9000, priceMax: 25000,
    description: "Contrat d'audit indépendant des émissions de GES couvrant les trois scopes d'émissions selon la méthodologie GHG Protocol, avec rapport de vérification.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise auditée",type:'text',required:true},
      {key:'cabinet_audit',label:"Cabinet d'audit",type:'text',required:true},
      {key:'scopes_audites',label:"Scopes audités",type:'text',required:true},
      {key:'methodologie',label:"Méthodologie d'audit utilisée",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport d'audit",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'AUDIT DES ÉMISSIONS GES</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{cabinet_audit}}</strong></p><p>Scopes : {{scopes_audites}}</p><h3>Méthodologie</h3><p>{{methodologie}}</p><p>Rapport le : {{date_rapport}}</p></div>`
  },
  {
    code: 'carb_plan_reduction_15deg',
    name: "Accord de Service de Plan de Réduction des Émissions (Trajectoire 1,5°C)",
    category: 'agro_environnement',
    price: 10000, priceMax: 28000,
    description: "Contrat d'élaboration d'un plan de réduction des émissions aligné sur une trajectoire de réchauffement limité à 1,5°C, conforme aux Science Based Targets (SBTi).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'consultant',label:"Consultant climatique",type:'text',required:true},
      {key:'objectifs_reduction',label:"Objectifs de réduction (%)",type:'text',required:true},
      {key:'horizon_temporel',label:"Horizon temporel (ex: 2030, 2050)",type:'text',required:true},
      {key:'mesures_cles',label:"Mesures clés de réduction",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE RÉDUCTION DES ÉMISSIONS — TRAJECTOIRE 1,5°C</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{consultant}}</strong></p><p>Objectif : {{objectifs_reduction}} de réduction d'ici {{horizon_temporel}}</p><h3>Mesures Clés</h3><p>{{mesures_cles}}</p></div>`
  },
  {
    code: 'carb_compensation_reforestation_vcs',
    name: "Accord de Compensation Carbone par Reforestation (VCS)",
    category: 'agro_environnement',
    price: 7000, priceMax: 20000,
    description: "Contrat d'achat de crédits carbone issus de projets de reforestation certifiés VCS (Verified Carbon Standard) pour la compensation des émissions résiduelles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'acheteur',label:"Entreprise acheteuse",type:'text',required:true},
      {key:'fournisseur_credits',label:"Fournisseur de crédits VCS",type:'text',required:true},
      {key:'volume_credits',label:"Volume de crédits (tCO2eq)",type:'text',required:true},
      {key:'projet_reforestation',label:"Nom du projet de reforestation",type:'text',required:true},
      {key:'prix_credit',label:"Prix unitaire par crédit (FCFA/tCO2eq)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison des crédits",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COMPENSATION CARBONE — REFORESTATION VCS</h1><p>Entre <strong>{{acheteur}}</strong> et <strong>{{fournisseur_credits}}</strong></p><p>Projet : {{projet_reforestation}}</p><p>Volume : {{volume_credits}} tCO2eq — Prix unitaire : {{prix_credit}} FCFA/tCO2eq</p><p>Livraison : {{date_livraison}}</p></div>`
  },
  {
    code: 'carb_compensation_energie_renouvelable',
    name: "Accord de Compensation Carbone par Énergie Renouvelable (Crédits Carbone)",
    category: 'agro_environnement',
    price: 6500, priceMax: 18000,
    description: "Contrat d'achat de crédits carbone issus de projets d'énergie renouvelable pour la compensation des émissions, avec certificats d'origine garantie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise compensatrice",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur de crédits",type:'text',required:true},
      {key:'type_energie',label:"Type d'énergie renouvelable",type:'text',required:true},
      {key:'volume_mwh',label:"Volume d'énergie (MWh ou tCO2eq)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COMPENSATION CARBONE — ÉNERGIE RENOUVELABLE</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{fournisseur}}</strong></p><p>Type d'énergie : {{type_energie}}</p><p>Volume : {{volume_mwh}}</p><p>Date : {{date_contrat}}</p></div>`
  },
  {
    code: 'carb_marche_volontaire_gold_standard',
    name: "Accord de Service de Marché Volontaire Carbone (Gold Standard)",
    category: 'agro_environnement',
    price: 8500, priceMax: 23000,
    description: "Contrat d'intermédiation sur le marché volontaire du carbone pour l'achat de crédits certifiés Gold Standard garantissant impact climatique et développement durable.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise acheteuse",type:'text',required:true},
      {key:'intermediaire',label:"Intermédiaire / Courtier carbone",type:'text',required:true},
      {key:'volume_credits_gs',label:"Volume de crédits Gold Standard (tCO2eq)",type:'text',required:true},
      {key:'projets_eligibles',label:"Types de projets éligibles",type:'textarea',required:true},
      {key:'date_transaction',label:"Date de la transaction",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD MARCHÉ VOLONTAIRE CARBONE — GOLD STANDARD</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{intermediaire}}</strong></p><p>Volume : {{volume_credits_gs}} tCO2eq</p><h3>Projets Éligibles</h3><p>{{projets_eligibles}}</p><p>Transaction le : {{date_transaction}}</p></div>`
  },
  {
    code: 'carb_certification_verification_tierce',
    name: "Accord de Service de Certification Carbone (Vérification Tierce Partie)",
    category: 'agro_environnement',
    price: 9500, priceMax: 26000,
    description: "Contrat de vérification et certification tierce partie des réductions d'émissions de GES selon les standards internationaux reconnus.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'porteur_projet',label:"Porteur du projet carbone",type:'text',required:true},
      {key:'verificateur',label:"Organisme de vérification",type:'text',required:true},
      {key:'standard_certification',label:"Standard de certification",type:'text',required:true},
      {key:'emissions_reductions',label:"Réductions d'émissions à certifier (tCO2eq)",type:'text',required:true},
      {key:'date_verification',label:"Date de vérification",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION CARBONE — VÉRIFICATION TIERCE PARTIE</h1><p>Entre <strong>{{porteur_projet}}</strong> et <strong>{{verificateur}}</strong></p><p>Standard : {{standard_certification}}</p><p>Réductions à certifier : {{emissions_reductions}} tCO2eq</p><p>Vérification le : {{date_verification}}</p></div>`
  },
  {
    code: 'carb_neutralite_net_zero',
    name: "Accord de Service de Neutralité Carbone (Net Zero Déclaration)",
    category: 'agro_environnement',
    price: 11000, priceMax: 30000,
    description: "Contrat d'accompagnement vers la neutralité carbone (Net Zero) incluant la définition d'une trajectoire, la mise en oeuvre de réductions et la compensation des émissions résiduelles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'cabinet_netzero',label:"Cabinet Net Zero",type:'text',required:true},
      {key:'annee_objectif',label:"Année cible de neutralité carbone",type:'text',required:true},
      {key:'strategie_reduction',label:"Stratégie de réduction des émissions",type:'textarea',required:true},
      {key:'strategie_compensation',label:"Stratégie de compensation résiduelle",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NEUTRALITÉ CARBONE (NET ZERO)</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{cabinet_netzero}}</strong></p><p>Objectif Net Zero : {{annee_objectif}}</p><h3>Stratégie de Réduction</h3><p>{{strategie_reduction}}</p><h3>Compensation Résiduelle</h3><p>{{strategie_compensation}}</p></div>`
  },
  {
    code: 'carb_bilan_energetique',
    name: "Accord de Service de Bilan Énergétique Entreprise",
    category: 'agro_environnement',
    price: 6000, priceMax: 17000,
    description: "Contrat de réalisation d'un bilan énergétique complet de l'entreprise permettant d'identifier les postes de consommation et les gisements d'économies d'énergie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'bureau_energie',label:"Bureau d'études énergie",type:'text',required:true},
      {key:'sites_audites',label:"Sites à auditer",type:'textarea',required:true},
      {key:'consommation_actuelle',label:"Consommation énergétique actuelle (kWh/an)",type:'text',required:false},
      {key:'date_audit',label:"Date de l'audit énergétique",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BILAN ÉNERGÉTIQUE</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{bureau_energie}}</strong></p><h3>Sites Audités</h3><p>{{sites_audites}}</p><p>Consommation actuelle : {{consommation_actuelle}}</p><p>Date d'audit : {{date_audit}}</p></div>`
  },
  {
    code: 'carb_sobriete_energetique',
    name: "Accord de Service de Sobriété Énergétique (Plan de Réduction)",
    category: 'agro_environnement',
    price: 5500, priceMax: 15000,
    description: "Contrat d'élaboration et de mise en oeuvre d'un plan de sobriété énergétique visant à réduire la consommation d'énergie de l'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'objectif_reduction_energie',label:"Objectif de réduction (%)",type:'text',required:true},
      {key:'mesures_sobriete',label:"Mesures de sobriété prévues",type:'textarea',required:true},
      {key:'horizon_plan',label:"Horizon du plan",type:'text',required:true},
      {key:'responsable_suivi',label:"Responsable du suivi énergétique",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOBRIÉTÉ ÉNERGÉTIQUE</h1><h2>{{entreprise}}</h2><p>Objectif de réduction : {{objectif_reduction_energie}}</p><h3>Mesures de Sobriété</h3><p>{{mesures_sobriete}}</p><p>Horizon : {{horizon_plan}} — Responsable : {{responsable_suivi}}</p></div>`
  },
  {
    code: 'carb_installation_solaire',
    name: "Accord de Service d'Installation Solaire pour Décarbonation",
    category: 'agro_environnement',
    price: 12000, priceMax: 35000,
    description: "Contrat de fourniture et d'installation de panneaux solaires photovoltaïques dans le cadre d'une stratégie de décarbonation et d'autonomie énergétique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'client',label:"Client entreprise",type:'text',required:true},
      {key:'installateur',label:"Entreprise installatrice",type:'text',required:true},
      {key:'puissance_kwc',label:"Puissance installée (kWc)",type:'text',required:true},
      {key:'site_installation',label:"Site d'installation",type:'text',required:true},
      {key:'cout_total',label:"Coût total HT (FCFA)",type:'text',required:true},
      {key:'date_mise_en_service',label:"Date de mise en service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'INSTALLATION SOLAIRE POUR DÉCARBONATION</h1><p>Entre <strong>{{client}}</strong> et <strong>{{installateur}}</strong></p><p>Puissance : {{puissance_kwc}} kWc — Site : {{site_installation}}</p><p>Coût total : {{cout_total}} FCFA HT</p><p>Mise en service : {{date_mise_en_service}}</p></div>`
  },
  {
    code: 'carb_transport_vert_flotte',
    name: "Accord de Service de Transport Vert (Flotte Électrique)",
    category: 'agro_environnement',
    price: 10000, priceMax: 28000,
    description: "Contrat de service pour le verdissement de la flotte de véhicules d'entreprise par l'adoption de véhicules électriques ou hybrides dans le cadre de la décarbonation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'fournisseur_vehicules',label:"Fournisseur de véhicules",type:'text',required:true},
      {key:'nombre_vehicules',label:"Nombre de véhicules à électrifier",type:'text',required:true},
      {key:'type_vehicules',label:"Type de véhicules (électriques/hybrides)",type:'text',required:true},
      {key:'calendrier_transition',label:"Calendrier de transition",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT VERT — FLOTTE ÉLECTRIQUE</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{fournisseur_vehicules}}</strong></p><p>Véhicules : {{nombre_vehicules}} unités ({{type_vehicules}})</p><h3>Calendrier de Transition</h3><p>{{calendrier_transition}}</p></div>`
  },
  {
    code: 'carb_credit_redd_foret_ci',
    name: "Accord de Service de Crédit Carbone REDD+ (Forêt CI)",
    category: 'agro_environnement',
    price: 9000, priceMax: 24000,
    description: "Contrat relatif à l'achat ou à la mise en oeuvre de crédits carbone REDD+ issus de projets de protection des forêts en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'gestionnaire_projet',label:"Gestionnaire du projet REDD+",type:'text',required:true},
      {key:'foret_concernee',label:"Forêt concernée (nom, localisation)",type:'text',required:true},
      {key:'superficie_foret',label:"Superficie protégée (ha)",type:'text',required:true},
      {key:'volume_credits_redd',label:"Volume de crédits REDD+ (tCO2eq)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CRÉDIT CARBONE REDD+ — FORÊT CI</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{gestionnaire_projet}}</strong></p><p>Forêt : {{foret_concernee}} — {{superficie_foret}} ha</p><p>Volume REDD+ : {{volume_credits_redd}} tCO2eq</p><p>Signé le : {{date_contrat}}</p></div>`
  },
  {
    code: 'carb_bilan_carbone_produit_acv',
    name: "Accord de Service de Bilan Carbone Produit (ACV)",
    category: 'agro_environnement',
    price: 7500, priceMax: 21000,
    description: "Contrat de réalisation d'une analyse du cycle de vie (ACV) pour le calcul de l'empreinte carbone d'un produit de la matière première jusqu'à sa fin de vie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'bureau_acv',label:"Bureau d'études ACV",type:'text',required:true},
      {key:'produit_etudie',label:"Produit étudié",type:'text',required:true},
      {key:'frontiere_systeme',label:"Frontière du système (du berceau au...)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport ACV",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE BILAN CARBONE PRODUIT — ACV</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{bureau_acv}}</strong></p><p>Produit : {{produit_etudie}}</p><p>Frontière : {{frontiere_systeme}}</p><p>Rapport le : {{date_rapport}}</p></div>`
  },
  {
    code: 'carb_label_empreinte_produit',
    name: "Accord de Service de Label Carbone Produit (Empreinte)",
    category: 'agro_environnement',
    price: 6500, priceMax: 18000,
    description: "Contrat d'obtention d'un label carbone pour affichage de l'empreinte environnementale d'un produit sur son emballage ou sa communication.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise candidate",type:'text',required:true},
      {key:'organisme_label',label:"Organisme de labellisation",type:'text',required:true},
      {key:'produit_labellise',label:"Produit à labeliser",type:'text',required:true},
      {key:'empreinte_carbone_kg',label:"Empreinte carbone (kgCO2eq/unité)",type:'text',required:false},
      {key:'date_obtention',label:"Date d'obtention prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LABEL CARBONE PRODUIT</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{organisme_label}}</strong></p><p>Produit : {{produit_labellise}}</p><p>Empreinte : {{empreinte_carbone_kg}} kgCO2eq/unité</p><p>Obtention prévue : {{date_obtention}}</p></div>`
  },
  {
    code: 'carb_achat_credit_registre',
    name: "Accord de Service d'Achat de Crédit Carbone (Registre)",
    category: 'agro_environnement',
    price: 7000, priceMax: 19000,
    description: "Contrat d'achat de crédits carbone via un registre accrédité, avec transfert de propriété, annulation des crédits et délivrance des certificats de compensation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'acheteur',label:"Entreprise acheteuse",type:'text',required:true},
      {key:'gestionnaire_registre',label:"Gestionnaire du registre",type:'text',required:true},
      {key:'registre_utilise',label:"Registre utilisé (Gold Standard, VCS...)",type:'text',required:true},
      {key:'quantite_achetee',label:"Quantité achetée (tCO2eq)",type:'text',required:true},
      {key:'date_annulation',label:"Date d'annulation des crédits",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACHAT DE CRÉDIT CARBONE VIA REGISTRE</h1><p>Entre <strong>{{acheteur}}</strong> et <strong>{{gestionnaire_registre}}</strong></p><p>Registre : {{registre_utilise}}</p><p>Quantité : {{quantite_achetee}} tCO2eq</p><p>Annulation : {{date_annulation}}</p></div>`
  },
  {
    code: 'carb_integration_si_carbone',
    name: "Accord de Service d'Intégration Carbone dans la Gestion (SI)",
    category: 'agro_environnement',
    price: 12000, priceMax: 32000,
    description: "Contrat d'intégration d'un module carbone dans le système d'information de l'entreprise pour le suivi en temps réel des émissions de GES.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'editeur_logiciel',label:"Éditeur du logiciel / intégrateur",type:'text',required:true},
      {key:'si_existant',label:"Système d'information existant",type:'text',required:true},
      {key:'fonctionnalites',label:"Fonctionnalités carbone requises",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'INTÉGRATION CARBONE DANS LE SYSTÈME D'INFORMATION</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{editeur_logiciel}}</strong></p><p>SI existant : {{si_existant}}</p><h3>Fonctionnalités Requises</h3><p>{{fonctionnalites}}</p><p>Livraison : {{date_livraison}}</p></div>`
  },
  {
    code: 'carb_formation_equipes_carbone',
    name: "Accord de Service de Formation des Équipes au Carbone",
    category: 'agro_environnement',
    price: 4500, priceMax: 13000,
    description: "Contrat de formation des collaborateurs aux enjeux climatiques, au calcul du bilan carbone et aux mécanismes de compensation pour une culture carbone interne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'formateur',label:"Organisme formateur",type:'text',required:true},
      {key:'profils_formes',label:"Profils de collaborateurs à former",type:'textarea',required:true},
      {key:'programme_formation',label:"Programme de la formation carbone",type:'textarea',required:true},
      {key:'dates_formation',label:"Dates de formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION DES ÉQUIPES AU CARBONE</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{formateur}}</strong></p><h3>Profils Formés</h3><p>{{profils_formes}}</p><h3>Programme</h3><p>{{programme_formation}}</p><p>Dates : {{dates_formation}}</p></div>`
  },
  {
    code: 'carb_rapport_alignement_tcfd',
    name: "Accord de Service de Rapport d'Alignement TCFD",
    category: 'agro_environnement',
    price: 9000, priceMax: 25000,
    description: "Contrat d'accompagnement à la rédaction d'un rapport d'alignement sur les recommandations de la Task Force on Climate-related Financial Disclosures (TCFD).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 56,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'consultant_tcfd',label:"Consultant TCFD",type:'text',required:true},
      {key:'quatre_piliers',label:"Couverture des 4 piliers TCFD",type:'textarea',required:true},
      {key:'risques_climatiques',label:"Risques climatiques identifiés",type:'textarea',required:true},
      {key:'date_publication',label:"Date de publication du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RAPPORT D'ALIGNEMENT TCFD</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{consultant_tcfd}}</strong></p><h3>Couverture des 4 Piliers TCFD</h3><p>{{quatre_piliers}}</p><h3>Risques Climatiques</h3><p>{{risques_climatiques}}</p><p>Publication : {{date_publication}}</p></div>`
  },
  {
    code: 'carb_strategie_adaptation_csrd',
    name: "Accord de Service de Stratégie Adaptation Climatique (CSRD)",
    category: 'agro_environnement',
    price: 10500, priceMax: 29000,
    description: "Contrat d'élaboration d'une stratégie d'adaptation aux risques climatiques physiques et de transition, intégrée dans le cadre CSRD.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'cabinet_adaptation',label:"Cabinet spécialisé",type:'text',required:true},
      {key:'risques_physiques',label:"Risques climatiques physiques identifiés",type:'textarea',required:true},
      {key:'risques_transition',label:"Risques de transition identifiés",type:'textarea',required:true},
      {key:'mesures_adaptation',label:"Mesures d'adaptation prévues",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE STRATÉGIE D'ADAPTATION CLIMATIQUE (CSRD)</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{cabinet_adaptation}}</strong></p><h3>Risques Physiques</h3><p>{{risques_physiques}}</p><h3>Risques de Transition</h3><p>{{risques_transition}}</p><h3>Mesures d'Adaptation</h3><p>{{mesures_adaptation}}</p></div>`
  },
  {
    code: 'carb_partenariat_ong_carbone',
    name: "Accord de Partenariat ONG-Entreprise (Projet Carbone)",
    category: 'agro_environnement',
    price: 5000, priceMax: 14000,
    description: "Convention de partenariat entre une ONG et une entreprise pour la co-développement et la mise en oeuvre d'un projet de compensation ou réduction carbone.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise partenaire",type:'text',required:true},
      {key:'ong',label:"ONG partenaire",type:'text',required:true},
      {key:'projet_carbone',label:"Nom du projet carbone",type:'text',required:true},
      {key:'localisation',label:"Localisation du projet",type:'text',required:true},
      {key:'objectif_tco2',label:"Objectif de réduction/séquestration (tCO2eq)",type:'text',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ONG-ENTREPRISE — PROJET CARBONE</h1><p>Entre <strong>{{entreprise}}</strong> et <strong>{{ong}}</strong></p><p>Projet : {{projet_carbone}} — {{localisation}}</p><p>Objectif : {{objectif_tco2}} tCO2eq</p><p>Durée : {{duree_partenariat}}</p></div>`
  },
  {
    code: 'carb_biocarbone_sols_agricoles',
    name: "Accord de Service de Mesure Biocarbone (Sols Agricoles)",
    category: 'agro_environnement',
    price: 7000, priceMax: 19000,
    description: "Contrat de mesure et suivi du carbone organique des sols agricoles (biocarbone) en vue de la génération de crédits carbone par séquestration dans les terres.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'agriculteur_ou_cooperative',label:"Agriculteur / Coopérative",type:'text',required:true},
      {key:'prestataire_mesure',label:"Prestataire de mesure biocarbone",type:'text',required:true},
      {key:'surface_agricole',label:"Surface agricole (ha)",type:'text',required:true},
      {key:'pratiques_sequestration',label:"Pratiques agricoles de séquestration",type:'textarea',required:true},
      {key:'date_premiere_mesure',label:"Date de la première mesure",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MESURE BIOCARBONE — SOLS AGRICOLES</h1><p>Entre <strong>{{agriculteur_ou_cooperative}}</strong> et <strong>{{prestataire_mesure}}</strong></p><p>Surface : {{surface_agricole}} ha</p><h3>Pratiques de Séquestration</h3><p>{{pratiques_sequestration}}</p><p>Première mesure : {{date_premiere_mesure}}</p></div>`
  },
  {
    code: 'carb_rapport_bilan_ges_annuel',
    name: "Rapport de Bilan GES Annuel",
    category: 'agro_environnement',
    price: 6500, priceMax: 18000,
    description: "Rapport annuel consolidé des émissions de gaz à effet de serre de l'entreprise, présentant les données par scope, les évolutions et les progrès accomplis.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'annee_rapport',label:"Année du rapport GES",type:'text',required:true},
      {key:'emissions_scope1',label:"Émissions Scope 1 (tCO2eq)",type:'text',required:true},
      {key:'emissions_scope2',label:"Émissions Scope 2 (tCO2eq)",type:'text',required:true},
      {key:'emissions_scope3',label:"Émissions Scope 3 (tCO2eq)",type:'text',required:false},
      {key:'evolution_vs_annee_prec',label:"Évolution vs année précédente (%)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE BILAN GES ANNUEL</h1><h2>{{entreprise}} — {{annee_rapport}}</h2><p>Scope 1 : {{emissions_scope1}} tCO2eq</p><p>Scope 2 : {{emissions_scope2}} tCO2eq</p><p>Scope 3 : {{emissions_scope3}} tCO2eq</p><p>Évolution : {{evolution_vs_annee_prec}}</p></div>`
  },
  {
    code: 'carb_plan_transition_bas_carbone',
    name: "Plan de Transition Bas-Carbone",
    category: 'agro_environnement',
    price: 8500, priceMax: 24000,
    description: "Document stratégique définissant la trajectoire de décarbonation de l'entreprise avec des jalons, objectifs mesurables et plans d'action opérationnels.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'annee_reference_carbone',label:"Année de référence carbone",type:'text',required:true},
      {key:'objectif_2030',label:"Objectif de réduction 2030 (%)",type:'text',required:true},
      {key:'objectif_2050',label:"Objectif de réduction 2050 (%)",type:'text',required:true},
      {key:'leviers_decarbonation',label:"Leviers de décarbonation principaux",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE TRANSITION BAS-CARBONE</h1><h2>{{entreprise}}</h2><p>Année de référence : {{annee_reference_carbone}}</p><p>Objectif 2030 : {{objectif_2030}} — Objectif 2050 : {{objectif_2050}}</p><h3>Leviers de Décarbonation</h3><p>{{leviers_decarbonation}}</p></div>`
  },
  {
    code: 'carb_charte_entreprises_climat_afrique',
    name: "Charte des Entreprises pour le Climat en Afrique",
    category: 'agro_environnement',
    price: 4500, priceMax: 13000,
    description: "Charte d'engagement climatique pour les entreprises opérant en Afrique, définissant des engagements concrets pour la réduction des émissions et l'adaptation au changement climatique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise signataire",type:'text',required:true},
      {key:'pays_operation',label:"Pays d'opération principaux",type:'text',required:true},
      {key:'engagement_reduction',label:"Engagement de réduction des émissions",type:'textarea',required:true},
      {key:'engagement_adaptation',label:"Engagement pour l'adaptation climatique",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DES ENTREPRISES POUR LE CLIMAT EN AFRIQUE</h1><h2>{{entreprise}} — {{pays_operation}}</h2><h3>Engagement Réduction des Émissions</h3><p>{{engagement_reduction}}</p><h3>Engagement Adaptation Climatique</h3><p>{{engagement_adaptation}}</p><p>Signé le : {{date_signature}}</p></div>`
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
  console.log(`Batch 105b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
