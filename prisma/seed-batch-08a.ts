import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates = [
  // ─── STARTUP (20) ───────────────────────────────────────────────
  {
    code: 'stup_pitch_deck_resume',
    name: 'Pitch Deck Résumé',
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Résumé exécutif de pitch deck pour présentation aux investisseurs, synthétisant le problème, la solution, le marché et le modèle économique.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'secteur', label: "Secteur d'activité", type: 'text', required: true },
      { key: 'probleme', label: 'Problème adressé', type: 'textarea', required: true },
      { key: 'solution', label: 'Solution proposée', type: 'textarea', required: true },
      { key: 'marche_cible', label: 'Marché cible', type: 'text', required: true },
      { key: 'montant_leve', label: 'Montant recherché (FCFA)', type: 'number', required: true },
    ]),
    body: `<h1>PITCH DECK RÉSUMÉ</h1>
<h2>{{startup_name}}</h2>
<section><h3>Problème</h3><p>{{probleme}}</p></section>
<section><h3>Solution</h3><p>{{solution}}</p></section>
<section><h3>Marché cible</h3><p>{{marche_cible}}</p></section>
<section><h3>Secteur</h3><p>{{secteur}}</p></section>
<section><h3>Levée de fonds</h3><p>Montant recherché : <strong>{{montant_leve}} FCFA</strong></p></section>`,
  },
  {
    code: 'stup_executive_summary',
    name: "Executive Summary Investisseur",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 27000,
    description: "Document de synthèse destiné aux investisseurs, présentant l'opportunité, l'équipe fondatrice et les projections financières clés.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'fondateurs', label: 'Fondateurs', type: 'text', required: true },
      { key: 'vision', label: 'Vision', type: 'textarea', required: true },
      { key: 'revenus_projetes', label: 'Revenus projetés (an 1)', type: 'number', required: true },
      { key: 'date_creation', label: 'Date de création', type: 'date', required: true },
    ]),
    body: `<h1>EXECUTIVE SUMMARY</h1>
<h2>{{startup_name}}</h2>
<p><strong>Fondateurs :</strong> {{fondateurs}}</p>
<p><strong>Date de création :</strong> {{date_creation}}</p>
<section><h3>Vision</h3><p>{{vision}}</p></section>
<section><h3>Projections financières</h3><p>Revenus projetés année 1 : <strong>{{revenus_projetes}} FCFA</strong></p></section>`,
  },
  {
    code: 'stup_term_sheet',
    name: 'Term Sheet Investissement',
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Feuille de conditions d'investissement précisant la valorisation, les droits préférentiels et les clauses de protection de l'investisseur.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'investisseur', label: "Nom de l'investisseur", type: 'text', required: true },
      { key: 'montant', label: "Montant d'investissement (FCFA)", type: 'number', required: true },
      { key: 'valorisation_pre', label: 'Valorisation pré-money (FCFA)', type: 'number', required: true },
      { key: 'pourcentage', label: 'Pourcentage acquis (%)', type: 'number', required: true },
      { key: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>TERM SHEET</h1>
<p>Entre <strong>{{startup_name}}</strong> et <strong>{{investisseur}}</strong></p>
<table border="1" cellpadding="8">
  <tr><td>Montant</td><td>{{montant}} FCFA</td></tr>
  <tr><td>Valorisation pré-money</td><td>{{valorisation_pre}} FCFA</td></tr>
  <tr><td>Participation acquise</td><td>{{pourcentage}} %</td></tr>
  <tr><td>Date de signature</td><td>{{date_signature}}</td></tr>
</table>`,
  },
  {
    code: 'stup_pacte_fondateurs',
    name: 'Pacte de Fondateurs',
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Accord juridique entre les cofondateurs définissant la répartition du capital, les droits de préemption et les clauses de sortie.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'fondateur1', label: 'Fondateur 1', type: 'text', required: true },
      { key: 'fondateur2', label: 'Fondateur 2', type: 'text', required: true },
      { key: 'parts_fondateur1', label: 'Parts fondateur 1 (%)', type: 'number', required: true },
      { key: 'parts_fondateur2', label: 'Parts fondateur 2 (%)', type: 'number', required: true },
      { key: 'duree_vesting', label: 'Durée de vesting (mois)', type: 'number', required: true },
    ]),
    body: `<h1>PACTE DE FONDATEURS</h1>
<h2>{{startup_name}}</h2>
<p>Entre <strong>{{fondateur1}}</strong> ({{parts_fondateur1}}%) et <strong>{{fondateur2}}</strong> ({{parts_fondateur2}}%)</p>
<section><h3>Vesting</h3><p>Durée de vesting : {{duree_vesting}} mois.</p></section>
<section><h3>Clauses de préemption</h3><p>Toute cession de parts est soumise au droit de préemption des cofondateurs.</p></section>`,
  },
  {
    code: 'stup_accord_vesting',
    name: 'Accord de Vesting Fondateurs',
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Convention de vesting progressif des actions fondateurs, avec cliff initial et calendrier d'acquisition étalé sur plusieurs années.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'beneficiaire', label: 'Bénéficiaire', type: 'text', required: true },
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'nombre_actions', label: "Nombre d'actions", type: 'number', required: true },
      { key: 'cliff_mois', label: 'Cliff (mois)', type: 'number', required: true },
      { key: 'duree_totale', label: 'Durée totale (mois)', type: 'number', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<h1>ACCORD DE VESTING</h1>
<p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p>
<p><strong>Société :</strong> {{startup_name}}</p>
<table border="1" cellpadding="8">
  <tr><td>Nombre d'actions</td><td>{{nombre_actions}}</td></tr>
  <tr><td>Cliff</td><td>{{cliff_mois}} mois</td></tr>
  <tr><td>Durée totale</td><td>{{duree_totale}} mois</td></tr>
  <tr><td>Date de début</td><td>{{date_debut}}</td></tr>
</table>`,
  },
  {
    code: 'stup_loi_investisseurs',
    name: "Lettre d'Intention Investisseurs (LOI)",
    category: 'commercial_financier',
    price: 11000,
    priceMax: 33000,
    description: "Lettre d'intention non contraignante exprimant l'intérêt d'un investisseur et posant les bases d'une négociation formelle.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'investisseur', label: "Nom de l'investisseur", type: 'text', required: true },
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'montant_envisage', label: 'Montant envisagé (FCFA)', type: 'number', required: true },
      { key: 'conditions', label: 'Conditions préalables', type: 'textarea', required: false },
      { key: 'date_loi', label: 'Date de la lettre', type: 'date', required: true },
    ]),
    body: `<h1>LETTRE D'INTENTION (LOI)</h1>
<p>De : <strong>{{investisseur}}</strong><br>À : <strong>{{startup_name}}</strong><br>Date : {{date_loi}}</p>
<p>La présente lettre exprime notre intérêt à investir <strong>{{montant_envisage}} FCFA</strong> dans votre société.</p>
<section><h3>Conditions préalables</h3><p>{{conditions}}</p></section>
<p><em>Cette lettre est non contraignante et ne constitue pas un engagement ferme.</em></p>`,
  },
  {
    code: 'stup_memorandum_information',
    name: "Mémorandum d'Information",
    category: 'commercial_financier',
    price: 14000,
    priceMax: 42000,
    description: "Document confidentiel présentant en détail la société, son marché, sa stratégie et ses données financières aux investisseurs potentiels.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la société", type: 'text', required: true },
      { key: 'secteur', label: "Secteur d'activité", type: 'text', required: true },
      { key: 'description_activite', label: "Description de l'activité", type: 'textarea', required: true },
      { key: 'chiffre_affaires', label: 'Chiffre affaires (FCFA)', type: 'number', required: false },
      { key: 'date_document', label: 'Date du document', type: 'date', required: true },
    ]),
    body: `<h1>MÉMORANDUM D'INFORMATION</h1>
<h2>{{startup_name}}</h2>
<p><strong>Confidentiel — Date :</strong> {{date_document}}</p>
<section><h3>Présentation</h3><p>{{description_activite}}</p></section>
<section><h3>Secteur</h3><p>{{secteur}}</p></section>
<section><h3>Données financières</h3><p>Chiffre d'affaires : {{chiffre_affaires}} FCFA</p></section>`,
  },
  {
    code: 'stup_dossier_incubation',
    name: "Dossier de Candidature Incubation",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 21000,
    description: "Dossier complet de candidature à un programme d'incubation ou d'accélération startup, incluant présentation du projet et du profil fondateur.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'nom_fondateur', label: 'Nom du fondateur', type: 'text', required: true },
      { key: 'incubateur', label: "Nom de l'incubateur", type: 'text', required: true },
      { key: 'stade_projet', label: 'Stade du projet', type: 'text', required: true },
      { key: 'besoin_accompagnement', label: "Besoins en accompagnement", type: 'textarea', required: true },
    ]),
    body: `<h1>DOSSIER DE CANDIDATURE INCUBATION</h1>
<h2>{{incubateur}}</h2>
<p><strong>Startup :</strong> {{startup_name}}<br><strong>Fondateur :</strong> {{nom_fondateur}}</p>
<section><h3>Stade du projet</h3><p>{{stade_projet}}</p></section>
<section><h3>Besoins en accompagnement</h3><p>{{besoin_accompagnement}}</p></section>`,
  },
  {
    code: 'stup_rapport_traction',
    name: 'Rapport de Traction Mensuel',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Rapport mensuel de traction destiné aux investisseurs, récapitulant les indicateurs clés de croissance et les jalons atteints.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'mois', label: 'Mois du rapport', type: 'text', required: true },
      { key: 'utilisateurs_actifs', label: 'Utilisateurs actifs', type: 'number', required: true },
      { key: 'mrr', label: 'MRR (FCFA)', type: 'number', required: true },
      { key: 'croissance', label: 'Croissance MoM (%)', type: 'number', required: true },
      { key: 'jalons', label: 'Jalons atteints', type: 'textarea', required: false },
    ]),
    body: `<h1>RAPPORT DE TRACTION — {{mois}}</h1>
<h2>{{startup_name}}</h2>
<table border="1" cellpadding="8">
  <tr><td>Utilisateurs actifs</td><td>{{utilisateurs_actifs}}</td></tr>
  <tr><td>MRR</td><td>{{mrr}} FCFA</td></tr>
  <tr><td>Croissance MoM</td><td>{{croissance}} %</td></tr>
</table>
<section><h3>Jalons atteints</h3><p>{{jalons}}</p></section>`,
  },
  {
    code: 'stup_kpi_dashboard',
    name: 'KPI Dashboard Startup',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Tableau de bord des indicateurs de performance clés (KPI) pour startup, structuré par catégorie : croissance, finance, produit et équipe.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'periode', label: 'Période', type: 'text', required: true },
      { key: 'cac', label: "Coût d'acquisition client (FCFA)", type: 'number', required: true },
      { key: 'ltv', label: 'Valeur vie client (FCFA)', type: 'number', required: true },
      { key: 'churn', label: 'Taux de churn (%)', type: 'number', required: true },
      { key: 'nps', label: 'NPS', type: 'number', required: false },
    ]),
    body: `<h1>KPI DASHBOARD</h1>
<h2>{{startup_name}} — {{periode}}</h2>
<table border="1" cellpadding="8">
  <tr><th>Indicateur</th><th>Valeur</th></tr>
  <tr><td>CAC</td><td>{{cac}} FCFA</td></tr>
  <tr><td>LTV</td><td>{{ltv}} FCFA</td></tr>
  <tr><td>Churn</td><td>{{churn}} %</td></tr>
  <tr><td>NPS</td><td>{{nps}}</td></tr>
</table>`,
  },
  {
    code: 'stup_plan_go_to_market',
    name: 'Plan Go-To-Market',
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Plan stratégique de mise sur le marché définissant les segments cibles, les canaux de distribution et les actions commerciales prioritaires.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'produit', label: 'Produit / Service', type: 'text', required: true },
      { key: 'segment_cible', label: 'Segment cible', type: 'text', required: true },
      { key: 'canaux', label: 'Canaux de distribution', type: 'textarea', required: true },
      { key: 'budget_marketing', label: 'Budget marketing (FCFA)', type: 'number', required: false },
    ]),
    body: `<h1>PLAN GO-TO-MARKET</h1>
<h2>{{startup_name}} — {{produit}}</h2>
<section><h3>Segment cible</h3><p>{{segment_cible}}</p></section>
<section><h3>Canaux de distribution</h3><p>{{canaux}}</p></section>
<section><h3>Budget marketing</h3><p>{{budget_marketing}} FCFA</p></section>`,
  },
  {
    code: 'stup_roadmap_produit',
    name: 'Roadmap Produit',
    category: 'commercial_financier',
    price: 7500,
    priceMax: 22500,
    description: "Feuille de route produit trimestrielle détaillant les fonctionnalités planifiées, les priorités et les dépendances techniques.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'produit', label: 'Nom du produit', type: 'text', required: true },
      { key: 'annee', label: 'Année', type: 'number', required: true },
      { key: 'q1_features', label: 'Fonctionnalités Q1', type: 'textarea', required: true },
      { key: 'q2_features', label: 'Fonctionnalités Q2', type: 'textarea', required: false },
      { key: 'q3_features', label: 'Fonctionnalités Q3', type: 'textarea', required: false },
      { key: 'q4_features', label: 'Fonctionnalités Q4', type: 'textarea', required: false },
    ]),
    body: `<h1>ROADMAP PRODUIT {{annee}}</h1>
<h2>{{startup_name}} — {{produit}}</h2>
<section><h3>Q1</h3><p>{{q1_features}}</p></section>
<section><h3>Q2</h3><p>{{q2_features}}</p></section>
<section><h3>Q3</h3><p>{{q3_features}}</p></section>
<section><h3>Q4</h3><p>{{q4_features}}</p></section>`,
  },
  {
    code: 'stup_plan_levee_fonds',
    name: 'Plan de Levée de Fonds',
    category: 'commercial_financier',
    price: 13000,
    priceMax: 39000,
    description: "Document stratégique de préparation à une levée de fonds, couvrant le ciblage des investisseurs, le calendrier et les jalons de négociation.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'montant_cible', label: 'Montant cible (FCFA)', type: 'number', required: true },
      { key: 'type_tour', label: 'Type de tour (Seed, Série A…)', type: 'text', required: true },
      { key: 'investisseurs_cibles', label: 'Investisseurs ciblés', type: 'textarea', required: true },
      { key: 'date_cloture', label: 'Date de clôture visée', type: 'date', required: true },
    ]),
    body: `<h1>PLAN DE LEVÉE DE FONDS</h1>
<h2>{{startup_name}}</h2>
<table border="1" cellpadding="8">
  <tr><td>Type de tour</td><td>{{type_tour}}</td></tr>
  <tr><td>Montant cible</td><td>{{montant_cible}} FCFA</td></tr>
  <tr><td>Date de clôture</td><td>{{date_cloture}}</td></tr>
</table>
<section><h3>Investisseurs ciblés</h3><p>{{investisseurs_cibles}}</p></section>`,
  },
  {
    code: 'stup_accord_cofondateurs',
    name: 'Accord de Cofondateurs',
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Accord formalisé entre cofondateurs précisant les rôles, responsabilités, rémunérations initiales et modalités de prise de décision.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'cofondateur1', label: 'Cofondateur 1', type: 'text', required: true },
      { key: 'role1', label: 'Rôle cofondateur 1', type: 'text', required: true },
      { key: 'cofondateur2', label: 'Cofondateur 2', type: 'text', required: true },
      { key: 'role2', label: 'Rôle cofondateur 2', type: 'text', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<h1>ACCORD DE COFONDATEURS</h1>
<h2>{{startup_name}}</h2>
<p><strong>Date :</strong> {{date_accord}}</p>
<table border="1" cellpadding="8">
  <tr><th>Cofondateur</th><th>Rôle</th></tr>
  <tr><td>{{cofondateur1}}</td><td>{{role1}}</td></tr>
  <tr><td>{{cofondateur2}}</td><td>{{role2}}</td></tr>
</table>`,
  },
  {
    code: 'stup_convention_conseil_strat',
    name: 'Convention Conseil Stratégique',
    category: 'commercial_financier',
    price: 9000,
    priceMax: 27000,
    description: "Convention de mission de conseil stratégique avec un advisor, précisant les missions, la rémunération en equity ou cash et la durée.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'advisor', label: "Nom de l'advisor", type: 'text', required: true },
      { key: 'missions', label: 'Missions confiées', type: 'textarea', required: true },
      { key: 'remuneration', label: 'Rémunération (equity % ou FCFA)', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la convention (mois)', type: 'number', required: true },
    ]),
    body: `<h1>CONVENTION CONSEIL STRATÉGIQUE</h1>
<p>Entre <strong>{{startup_name}}</strong> et <strong>{{advisor}}</strong></p>
<section><h3>Missions</h3><p>{{missions}}</p></section>
<section><h3>Rémunération</h3><p>{{remuneration}}</p></section>
<section><h3>Durée</h3><p>{{duree}} mois</p></section>`,
  },
  {
    code: 'stup_rapport_investisseurs',
    name: 'Rapport Investisseurs Trimestriel',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 21000,
    description: "Rapport trimestriel à destination des investisseurs actionnaires, récapitulant les performances, les enjeux et les prochaines étapes.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'trimestre', label: 'Trimestre (ex: T1 2025)', type: 'text', required: true },
      { key: 'faits_marquants', label: 'Faits marquants', type: 'textarea', required: true },
      { key: 'performance_financiere', label: 'Performance financière', type: 'textarea', required: true },
      { key: 'prochaines_etapes', label: 'Prochaines étapes', type: 'textarea', required: true },
    ]),
    body: `<h1>RAPPORT INVESTISSEURS — {{trimestre}}</h1>
<h2>{{startup_name}}</h2>
<section><h3>Faits marquants</h3><p>{{faits_marquants}}</p></section>
<section><h3>Performance financière</h3><p>{{performance_financiere}}</p></section>
<section><h3>Prochaines étapes</h3><p>{{prochaines_etapes}}</p></section>`,
  },
  {
    code: 'stup_note_valorisation',
    name: 'Note de Valorisation',
    category: 'commercial_financier',
    price: 16000,
    priceMax: 48000,
    description: "Note de valorisation de startup utilisant des méthodes comparables, DCF et scorecard, destinée à cadrer les négociations de levée de fonds.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'methode', label: 'Méthode de valorisation', type: 'text', required: true },
      { key: 'valorisation', label: 'Valorisation estimée (FCFA)', type: 'number', required: true },
      { key: 'hypotheses', label: 'Hypothèses clés', type: 'textarea', required: true },
      { key: 'date_note', label: 'Date de la note', type: 'date', required: true },
    ]),
    body: `<h1>NOTE DE VALORISATION</h1>
<h2>{{startup_name}}</h2>
<p><strong>Date :</strong> {{date_note}}</p>
<section><h3>Méthode</h3><p>{{methode}}</p></section>
<section><h3>Hypothèses clés</h3><p>{{hypotheses}}</p></section>
<section><h3>Valorisation estimée</h3><p><strong>{{valorisation}} FCFA</strong></p></section>`,
  },
  {
    code: 'stup_accord_rachat_parts',
    name: 'Accord de Rachat de Parts',
    category: 'commercial_financier',
    price: 13000,
    priceMax: 39000,
    description: "Accord de rachat de parts sociales entre associés, fixant le prix de cession, les modalités de paiement et les garanties.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'cedant', label: 'Cédant', type: 'text', required: true },
      { key: 'acquereur', label: 'Acquéreur', type: 'text', required: true },
      { key: 'startup_name', label: "Nom de la société", type: 'text', required: true },
      { key: 'nombre_parts', label: 'Nombre de parts cédées', type: 'number', required: true },
      { key: 'prix_part', label: 'Prix par part (FCFA)', type: 'number', required: true },
      { key: 'date_cession', label: 'Date de cession', type: 'date', required: true },
    ]),
    body: `<h1>ACCORD DE RACHAT DE PARTS</h1>
<p>Entre <strong>{{cedant}}</strong> (cédant) et <strong>{{acquereur}}</strong> (acquéreur)</p>
<p><strong>Société :</strong> {{startup_name}}</p>
<table border="1" cellpadding="8">
  <tr><td>Nombre de parts</td><td>{{nombre_parts}}</td></tr>
  <tr><td>Prix par part</td><td>{{prix_part}} FCFA</td></tr>
  <tr><td>Date de cession</td><td>{{date_cession}}</td></tr>
</table>`,
  },
  {
    code: 'stup_plan_pivot',
    name: 'Plan de Pivot Stratégique',
    category: 'commercial_financier',
    price: 9000,
    priceMax: 27000,
    description: "Document structurant un pivot stratégique de la startup, analysant les raisons du pivot, le nouveau positionnement et le plan d'action.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la startup", type: 'text', required: true },
      { key: 'ancienne_vision', label: 'Ancienne vision', type: 'textarea', required: true },
      { key: 'raison_pivot', label: 'Raison du pivot', type: 'textarea', required: true },
      { key: 'nouvelle_vision', label: 'Nouvelle vision', type: 'textarea', required: true },
      { key: 'plan_action', label: "Plan d'action", type: 'textarea', required: true },
    ]),
    body: `<h1>PLAN DE PIVOT STRATÉGIQUE</h1>
<h2>{{startup_name}}</h2>
<section><h3>Ancienne vision</h3><p>{{ancienne_vision}}</p></section>
<section><h3>Raison du pivot</h3><p>{{raison_pivot}}</p></section>
<section><h3>Nouvelle vision</h3><p>{{nouvelle_vision}}</p></section>
<section><h3>Plan d'action</h3><p>{{plan_action}}</p></section>`,
  },
  {
    code: 'stup_rapport_board_meeting',
    name: 'Rapport Board Meeting',
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Compte rendu officiel de réunion du conseil d'administration (board), incluant l'ordre du jour, les résolutions votées et les actions à suivre.",
    templateType: 'pdf',
    classe: 'startup',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'startup_name', label: "Nom de la société", type: 'text', required: true },
      { key: 'date_reunion', label: 'Date de réunion', type: 'date', required: true },
      { key: 'participants', label: 'Participants', type: 'textarea', required: true },
      { key: 'ordre_du_jour', label: "Ordre du jour", type: 'textarea', required: true },
      { key: 'resolutions', label: 'Résolutions votées', type: 'textarea', required: true },
      { key: 'actions_suivre', label: 'Actions à suivre', type: 'textarea', required: false },
    ]),
    body: `<h1>RAPPORT BOARD MEETING</h1>
<h2>{{startup_name}}</h2>
<p><strong>Date :</strong> {{date_reunion}}</p>
<section><h3>Participants</h3><p>{{participants}}</p></section>
<section><h3>Ordre du jour</h3><p>{{ordre_du_jour}}</p></section>
<section><h3>Résolutions votées</h3><p>{{resolutions}}</p></section>
<section><h3>Actions à suivre</h3><p>{{actions_suivre}}</p></section>`,
  },

  // ─── GOUVERNANCE (15) ────────────────────────────────────────────
  {
    code: 'gov_charte_gouvernance',
    name: "Charte de Gouvernance Entreprise",
    category: 'juridique_admin',
    price: 18000,
    priceMax: 54000,
    description: "Charte formalisant les principes de gouvernance d'entreprise, les mécanismes de contrôle interne et les responsabilités des organes dirigeants.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'siegeSocial', label: 'Siège social', type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption", type: 'date', required: true },
      { key: 'president_ca', label: "Président du CA", type: 'text', required: true },
    ]),
    body: `<h1>CHARTE DE GOUVERNANCE</h1>
<h2>{{entreprise}}</h2>
<p><strong>Siège social :</strong> {{siegeSocial}}<br><strong>Adoptée le :</strong> {{date_adoption}}</p>
<section><h3>Article 1 — Objet</h3><p>La présente charte définit les principes de gouvernance applicables à {{entreprise}}.</p></section>
<section><h3>Article 2 — Organes de gouvernance</h3><p>Le Conseil d'Administration est présidé par {{president_ca}}.</p></section>`,
  },
  {
    code: 'gov_code_conduite',
    name: 'Code de Conduite',
    category: 'juridique_admin',
    price: 10000,
    priceMax: 30000,
    description: "Code de conduite professionnelle définissant les valeurs, comportements attendus et sanctions applicables à tous les collaborateurs.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'date_entree_vigueur', label: "Date d'entrée en vigueur", type: 'date', required: true },
      { key: 'valeurs', label: "Valeurs fondamentales", type: 'textarea', required: true },
    ]),
    body: `<h1>CODE DE CONDUITE</h1>
<h2>{{entreprise}}</h2>
<p><strong>En vigueur depuis le :</strong> {{date_entree_vigueur}}</p>
<section><h3>Nos valeurs</h3><p>{{valeurs}}</p></section>
<section><h3>Comportements attendus</h3><p>Tous les collaborateurs s'engagent à respecter les présentes règles de conduite.</p></section>`,
  },
  {
    code: 'gov_politique_anti_corruption',
    name: 'Politique Anti-Corruption',
    category: 'juridique_admin',
    price: 14000,
    priceMax: 42000,
    description: "Politique de tolérance zéro face à la corruption et aux conflits d'intérêts, conforme aux standards Sapin II et aux directives OCDE.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'responsable_conformite', label: 'Responsable conformité', type: 'text', required: true },
      { key: 'date_revision', label: 'Date de révision', type: 'date', required: true },
    ]),
    body: `<h1>POLITIQUE ANTI-CORRUPTION</h1>
<h2>{{entreprise}}</h2>
<p><strong>Responsable conformité :</strong> {{responsable_conformite}}<br><strong>Révisée le :</strong> {{date_revision}}</p>
<section><h3>Principe de tolérance zéro</h3><p>{{entreprise}} interdit tout acte de corruption, actif ou passif, dans l'ensemble de ses activités.</p></section>`,
  },
  {
    code: 'gov_declaration_conflit_interets',
    name: "Déclaration de Conflit d'Intérêts",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 15000,
    description: "Formulaire de déclaration de conflit d'intérêts à remplir par les dirigeants et administrateurs en cas de situation potentiellement conflictuelle.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'declarant', label: 'Nom du déclarant', type: 'text', required: true },
      { key: 'fonction', label: 'Fonction', type: 'text', required: true },
      { key: 'nature_conflit', label: "Nature du conflit d'intérêts", type: 'textarea', required: true },
      { key: 'date_declaration', label: 'Date de la déclaration', type: 'date', required: true },
    ]),
    body: `<h1>DÉCLARATION DE CONFLIT D'INTÉRÊTS</h1>
<p><strong>Déclarant :</strong> {{declarant}}<br><strong>Fonction :</strong> {{fonction}}<br><strong>Date :</strong> {{date_declaration}}</p>
<section><h3>Nature du conflit</h3><p>{{nature_conflit}}</p></section>
<p>Je soussigné(e) déclare sur l'honneur l'exactitude des informations ci-dessus.</p>`,
  },
  {
    code: 'gov_politique_whistleblowing',
    name: 'Politique Whistleblowing',
    category: 'juridique_admin',
    price: 12000,
    priceMax: 36000,
    description: "Politique de protection des lanceurs d'alerte, établissant les canaux de signalement, les garanties d'anonymat et les procédures de traitement.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'canal_signalement', label: 'Canal de signalement', type: 'text', required: true },
      { key: 'responsable_traitement', label: 'Responsable du traitement', type: 'text', required: true },
    ]),
    body: `<h1>POLITIQUE WHISTLEBLOWING</h1>
<h2>{{entreprise}}</h2>
<section><h3>Canal de signalement</h3><p>{{canal_signalement}}</p></section>
<section><h3>Responsable du traitement</h3><p>{{responsable_traitement}}</p></section>
<section><h3>Garanties</h3><p>L'anonymat du lanceur d'alerte est garanti. Aucune représaille ne sera tolérée.</p></section>`,
  },
  {
    code: 'gov_rapport_gouvernance_annuel',
    name: 'Rapport de Gouvernance Annuel',
    category: 'juridique_admin',
    price: 20000,
    priceMax: 60000,
    description: "Rapport annuel de gouvernance destiné aux actionnaires et parties prenantes, couvrant la composition des organes, les rémunérations et les risques.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'exercice', label: 'Exercice (ex: 2024)', type: 'text', required: true },
      { key: 'president_dg', label: 'Président-Directeur Général', type: 'text', required: true },
      { key: 'composition_ca', label: 'Composition du CA', type: 'textarea', required: true },
    ]),
    body: `<h1>RAPPORT DE GOUVERNANCE ANNUEL</h1>
<h2>{{entreprise}} — Exercice {{exercice}}</h2>
<p><strong>PDG :</strong> {{president_dg}}</p>
<section><h3>Composition du Conseil</h3><p>{{composition_ca}}</p></section>`,
  },
  {
    code: 'gov_politique_kyc',
    name: 'Politique KYC (Know Your Customer)',
    category: 'juridique_admin',
    price: 16000,
    priceMax: 48000,
    description: "Politique de connaissance client (KYC) définissant les procédures d'identification, de vérification et de surveillance des clients.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'responsable_kyc', label: 'Responsable KYC', type: 'text', required: true },
      { key: 'date_revision', label: 'Date de révision', type: 'date', required: true },
    ]),
    body: `<h1>POLITIQUE KYC</h1>
<h2>{{entreprise}}</h2>
<p><strong>Responsable KYC :</strong> {{responsable_kyc}}<br><strong>Révisée le :</strong> {{date_revision}}</p>
<section><h3>Identification des clients</h3><p>Tout nouveau client fait l'objet d'une vérification d'identité conforme aux dispositions légales.</p></section>
<section><h3>Surveillance continue</h3><p>Les relations d'affaires sont soumises à une surveillance continue et actualisée.</p></section>`,
  },
  {
    code: 'gov_procedure_aml',
    name: 'Procédure AML (Anti-Money Laundering)',
    category: 'juridique_admin',
    price: 18000,
    priceMax: 54000,
    description: "Procédure de lutte contre le blanchiment de capitaux (AML) définissant les obligations de vigilance, de déclaration et de formation du personnel.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'responsable_aml', label: 'Responsable AML / LCBFT', type: 'text', required: true },
      { key: 'seuil_declaration', label: 'Seuil de déclaration (FCFA)', type: 'number', required: true },
    ]),
    body: `<h1>PROCÉDURE AML / LCBFT</h1>
<h2>{{entreprise}}</h2>
<p><strong>Responsable AML :</strong> {{responsable_aml}}</p>
<section><h3>Seuil de déclaration</h3><p>Toute transaction supérieure à {{seuil_declaration}} FCFA fait l'objet d'une déclaration.</p></section>
<section><h3>Obligations de vigilance</h3><p>L'ensemble du personnel est formé aux obligations de vigilance renforcée.</p></section>`,
  },
  {
    code: 'gov_matrice_risques_conformite',
    name: 'Matrice des Risques de Conformité',
    category: 'juridique_admin',
    price: 15000,
    priceMax: 45000,
    description: "Matrice d'évaluation des risques de non-conformité, cartographiant les risques par probabilité et impact avec les mesures de mitigation associées.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'periode', label: 'Période couverte', type: 'text', required: true },
      { key: 'risques', label: 'Risques identifiés', type: 'textarea', required: true },
    ]),
    body: `<h1>MATRICE DES RISQUES DE CONFORMITÉ</h1>
<h2>{{entreprise}} — {{periode}}</h2>
<section><h3>Risques identifiés</h3><p>{{risques}}</p></section>
<table border="1" cellpadding="8">
  <tr><th>Risque</th><th>Probabilité</th><th>Impact</th><th>Mitigation</th></tr>
  <tr><td colspan="4"><em>À compléter selon l'analyse spécifique</em></td></tr>
</table>`,
  },
  {
    code: 'gov_bilan_conformite_annuel',
    name: 'Bilan de Conformité Annuel',
    category: 'juridique_admin',
    price: 17000,
    priceMax: 51000,
    description: "Bilan annuel de conformité réglementaire, récapitulant les contrôles effectués, les écarts identifiés et les plans de remédiation.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'exercice', label: 'Exercice', type: 'text', required: true },
      { key: 'responsable', label: 'Responsable conformité', type: 'text', required: true },
      { key: 'ecarts', label: 'Écarts identifiés', type: 'textarea', required: false },
      { key: 'remediation', label: 'Plans de remédiation', type: 'textarea', required: false },
    ]),
    body: `<h1>BILAN DE CONFORMITÉ ANNUEL</h1>
<h2>{{entreprise}} — {{exercice}}</h2>
<p><strong>Responsable :</strong> {{responsable}}</p>
<section><h3>Écarts identifiés</h3><p>{{ecarts}}</p></section>
<section><h3>Plans de remédiation</h3><p>{{remediation}}</p></section>`,
  },
  {
    code: 'gov_charte_conseil_administration',
    name: "Charte du Conseil d'Administration",
    category: 'juridique_admin',
    price: 16000,
    priceMax: 48000,
    description: "Charte interne du conseil d'administration définissant ses missions, sa composition, son fonctionnement et ses relations avec la direction générale.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'nombre_administrateurs', label: "Nombre d'administrateurs", type: 'number', required: true },
      { key: 'president_ca', label: "Président du CA", type: 'text', required: true },
      { key: 'frequence_reunion', label: 'Fréquence des réunions', type: 'text', required: true },
    ]),
    body: `<h1>CHARTE DU CONSEIL D'ADMINISTRATION</h1>
<h2>{{entreprise}}</h2>
<section><h3>Composition</h3><p>Le CA est composé de {{nombre_administrateurs}} membres, présidé par {{president_ca}}.</p></section>
<section><h3>Réunions</h3><p>Le CA se réunit {{frequence_reunion}}.</p></section>`,
  },
  {
    code: 'gov_reglement_interne_conseil',
    name: "Règlement Intérieur du Conseil",
    category: 'juridique_admin',
    price: 12000,
    priceMax: 36000,
    description: "Règlement intérieur régissant le fonctionnement pratique du conseil d'administration : convocation, quorum, vote et confidentialité.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'quorum', label: 'Quorum requis', type: 'text', required: true },
      { key: 'mode_vote', label: 'Mode de vote', type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption", type: 'date', required: true },
    ]),
    body: `<h1>RÈGLEMENT INTÉRIEUR DU CONSEIL</h1>
<h2>{{entreprise}}</h2>
<p><strong>Adopté le :</strong> {{date_adoption}}</p>
<section><h3>Quorum</h3><p>{{quorum}}</p></section>
<section><h3>Mode de vote</h3><p>{{mode_vote}}</p></section>`,
  },
  {
    code: 'gov_rapport_comite_audit',
    name: "Rapport du Comité d'Audit",
    category: 'juridique_admin',
    price: 15000,
    priceMax: 45000,
    description: "Rapport annuel du comité d'audit sur la qualité du contrôle interne, la fiabilité des états financiers et les relations avec les commissaires aux comptes.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'exercice', label: 'Exercice', type: 'text', required: true },
      { key: 'president_comite', label: "Président du comité d'audit", type: 'text', required: true },
      { key: 'observations', label: 'Observations et recommandations', type: 'textarea', required: true },
    ]),
    body: `<h1>RAPPORT DU COMITÉ D'AUDIT</h1>
<h2>{{entreprise}} — {{exercice}}</h2>
<p><strong>Président du comité :</strong> {{president_comite}}</p>
<section><h3>Observations et recommandations</h3><p>{{observations}}</p></section>`,
  },
  {
    code: 'gov_politique_dividendes',
    name: 'Politique de Distribution de Dividendes',
    category: 'juridique_admin',
    price: 10000,
    priceMax: 30000,
    description: "Politique formalisée de distribution de dividendes fixant les critères de distribution, la fréquence et les priorités entre réinvestissement et distribution.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 54,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'taux_distribution', label: 'Taux de distribution (%)', type: 'number', required: true },
      { key: 'frequence', label: 'Fréquence de distribution', type: 'text', required: true },
      { key: 'conditions', label: 'Conditions préalables', type: 'textarea', required: false },
    ]),
    body: `<h1>POLITIQUE DE DISTRIBUTION DE DIVIDENDES</h1>
<h2>{{entreprise}}</h2>
<section><h3>Taux de distribution</h3><p>{{taux_distribution}} % du résultat net distribuable.</p></section>
<section><h3>Fréquence</h3><p>{{frequence}}</p></section>
<section><h3>Conditions préalables</h3><p>{{conditions}}</p></section>`,
  },
  {
    code: 'gov_plan_continuite_activite',
    name: "Plan de Continuité d'Activité (PCA)",
    category: 'juridique_admin',
    price: 22000,
    priceMax: 66000,
    description: "Plan de continuité d'activité identifiant les processus critiques, les scénarios de crise et les procédures de reprise pour garantir la résilience opérationnelle.",
    templateType: 'pdf',
    classe: 'gouvernance',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'responsable_pca', label: 'Responsable PCA', type: 'text', required: true },
      { key: 'processus_critiques', label: 'Processus critiques', type: 'textarea', required: true },
      { key: 'rto', label: 'RTO cible (heures)', type: 'number', required: true },
      { key: 'rpo', label: 'RPO cible (heures)', type: 'number', required: true },
    ]),
    body: `<h1>PLAN DE CONTINUITÉ D'ACTIVITÉ</h1>
<h2>{{entreprise}}</h2>
<p><strong>Responsable PCA :</strong> {{responsable_pca}}</p>
<section><h3>Processus critiques</h3><p>{{processus_critiques}}</p></section>
<table border="1" cellpadding="8">
  <tr><td>RTO cible</td><td>{{rto}} heures</td></tr>
  <tr><td>RPO cible</td><td>{{rpo}} heures</td></tr>
</table>`,
  },

  // ─── BANQUE & MICROFINANCE (15) ──────────────────────────────────
  {
    code: 'bank_contrat_credit_personnel',
    name: 'Contrat de Crédit Personnel',
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Contrat de prêt personnel entre un établissement de crédit et un particulier, précisant le montant, le taux, la durée et les conditions de remboursement.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'emprunteur', label: 'Nom de l\'emprunteur', type: 'text', required: true },
      { key: 'montant', label: 'Montant du crédit (FCFA)', type: 'number', required: true },
      { key: 'taux_annuel', label: 'Taux annuel (%)', type: 'number', required: true },
      { key: 'duree_mois', label: 'Durée (mois)', type: 'number', required: true },
      { key: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE CRÉDIT PERSONNEL</h1>
<p>Entre <strong>{{banque}}</strong> (prêteur) et <strong>{{emprunteur}}</strong> (emprunteur)</p>
<table border="1" cellpadding="8">
  <tr><td>Montant</td><td>{{montant}} FCFA</td></tr>
  <tr><td>Taux annuel</td><td>{{taux_annuel}} %</td></tr>
  <tr><td>Durée</td><td>{{duree_mois}} mois</td></tr>
  <tr><td>Date de signature</td><td>{{date_signature}}</td></tr>
</table>`,
  },
  {
    code: 'bank_contrat_credit_pme',
    name: 'Contrat de Crédit PME',
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Contrat de financement destiné aux PME, incluant les conditions de tirage, les garanties exigées et les clauses de défaut.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'montant', label: 'Montant du crédit (FCFA)', type: 'number', required: true },
      { key: 'taux_annuel', label: 'Taux annuel (%)', type: 'number', required: true },
      { key: 'duree_mois', label: 'Durée (mois)', type: 'number', required: true },
      { key: 'garanties', label: 'Garanties exigées', type: 'textarea', required: true },
    ]),
    body: `<h1>CONTRAT DE CRÉDIT PME</h1>
<p>Entre <strong>{{banque}}</strong> et <strong>{{entreprise}}</strong></p>
<table border="1" cellpadding="8">
  <tr><td>Montant</td><td>{{montant}} FCFA</td></tr>
  <tr><td>Taux annuel</td><td>{{taux_annuel}} %</td></tr>
  <tr><td>Durée</td><td>{{duree_mois}} mois</td></tr>
</table>
<section><h3>Garanties</h3><p>{{garanties}}</p></section>`,
  },
  {
    code: 'bank_convention_ouverture_compte',
    name: "Convention d'Ouverture de Compte",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Convention régissant l'ouverture d'un compte bancaire, précisant les conditions de fonctionnement, les frais et les obligations du titulaire.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'titulaire', label: 'Nom du titulaire', type: 'text', required: true },
      { key: 'type_compte', label: 'Type de compte', type: 'text', required: true },
      { key: 'numero_compte', label: 'Numéro de compte', type: 'text', required: true },
      { key: 'date_ouverture', label: "Date d'ouverture", type: 'date', required: true },
    ]),
    body: `<h1>CONVENTION D'OUVERTURE DE COMPTE</h1>
<p>Entre <strong>{{banque}}</strong> et <strong>{{titulaire}}</strong></p>
<table border="1" cellpadding="8">
  <tr><td>Type de compte</td><td>{{type_compte}}</td></tr>
  <tr><td>Numéro de compte</td><td>{{numero_compte}}</td></tr>
  <tr><td>Date d'ouverture</td><td>{{date_ouverture}}</td></tr>
</table>`,
  },
  {
    code: 'bank_contrat_pret_hypothecaire',
    name: 'Contrat de Prêt Hypothécaire',
    category: 'commercial_financier',
    price: 18000,
    priceMax: 54000,
    description: "Contrat de prêt garanti par une hypothèque immobilière, avec clause d'exigibilité anticipée et modalités de réalisation de la garantie.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'emprunteur', label: 'Emprunteur', type: 'text', required: true },
      { key: 'montant', label: 'Montant (FCFA)', type: 'number', required: true },
      { key: 'bien_hypotheque', label: 'Bien hypothéqué', type: 'text', required: true },
      { key: 'taux_annuel', label: 'Taux annuel (%)', type: 'number', required: true },
      { key: 'duree_ans', label: 'Durée (ans)', type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT DE PRÊT HYPOTHÉCAIRE</h1>
<p>Entre <strong>{{banque}}</strong> et <strong>{{emprunteur}}</strong></p>
<table border="1" cellpadding="8">
  <tr><td>Montant</td><td>{{montant}} FCFA</td></tr>
  <tr><td>Bien hypothéqué</td><td>{{bien_hypotheque}}</td></tr>
  <tr><td>Taux annuel</td><td>{{taux_annuel}} %</td></tr>
  <tr><td>Durée</td><td>{{duree_ans}} ans</td></tr>
</table>`,
  },
  {
    code: 'bank_contrat_microcredit_solidaire',
    name: 'Contrat de Microcrédit Solidaire',
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de microcrédit solidaire destiné aux groupes de femmes ou associations, avec caution mutuelle et remboursements hebdomadaires.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'institution', label: 'Institution de microfinance', type: 'text', required: true },
      { key: 'groupe', label: 'Nom du groupe solidaire', type: 'text', required: true },
      { key: 'montant_groupe', label: 'Montant total du groupe (FCFA)', type: 'number', required: true },
      { key: 'duree_semaines', label: 'Durée (semaines)', type: 'number', required: true },
      { key: 'taux_interet', label: "Taux d'intérêt (%)", type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT DE MICROCRÉDIT SOLIDAIRE</h1>
<p>Entre <strong>{{institution}}</strong> et le groupe <strong>{{groupe}}</strong></p>
<table border="1" cellpadding="8">
  <tr><td>Montant total</td><td>{{montant_groupe}} FCFA</td></tr>
  <tr><td>Durée</td><td>{{duree_semaines}} semaines</td></tr>
  <tr><td>Taux d'intérêt</td><td>{{taux_interet}} %</td></tr>
</table>`,
  },
  {
    code: 'bank_dossier_demande_credit',
    name: 'Dossier de Demande de Crédit',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Dossier standardisé de demande de crédit bancaire, incluant les informations personnelles, professionnelles et financières du demandeur.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'demandeur', label: 'Nom du demandeur', type: 'text', required: true },
      { key: 'objet_credit', label: 'Objet du crédit', type: 'text', required: true },
      { key: 'montant_demande', label: 'Montant demandé (FCFA)', type: 'number', required: true },
      { key: 'revenus_mensuels', label: 'Revenus mensuels (FCFA)', type: 'number', required: true },
      { key: 'date_demande', label: 'Date de la demande', type: 'date', required: true },
    ]),
    body: `<h1>DOSSIER DE DEMANDE DE CRÉDIT</h1>
<p><strong>Banque :</strong> {{banque}}<br><strong>Date :</strong> {{date_demande}}</p>
<section><h3>Demandeur</h3><p>{{demandeur}}</p></section>
<section><h3>Objet du crédit</h3><p>{{objet_credit}}</p></section>
<table border="1" cellpadding="8">
  <tr><td>Montant demandé</td><td>{{montant_demande}} FCFA</td></tr>
  <tr><td>Revenus mensuels</td><td>{{revenus_mensuels}} FCFA</td></tr>
</table>`,
  },
  {
    code: 'bank_analyse_financiere_emprunteur',
    name: 'Analyse Financière Emprunteur',
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Fiche d'analyse financière de l'emprunteur évaluant sa capacité de remboursement, son taux d'endettement et sa notation de risque.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'emprunteur', label: 'Emprunteur', type: 'text', required: true },
      { key: 'revenu_net', label: 'Revenu net mensuel (FCFA)', type: 'number', required: true },
      { key: 'charges_mensuelles', label: 'Charges mensuelles (FCFA)', type: 'number', required: true },
      { key: 'taux_endettement', label: "Taux d'endettement (%)", type: 'number', required: true },
      { key: 'note_risque', label: 'Note de risque', type: 'text', required: false },
    ]),
    body: `<h1>ANALYSE FINANCIÈRE EMPRUNTEUR</h1>
<h2>{{banque}}</h2>
<p><strong>Emprunteur :</strong> {{emprunteur}}</p>
<table border="1" cellpadding="8">
  <tr><td>Revenu net mensuel</td><td>{{revenu_net}} FCFA</td></tr>
  <tr><td>Charges mensuelles</td><td>{{charges_mensuelles}} FCFA</td></tr>
  <tr><td>Taux d'endettement</td><td>{{taux_endettement}} %</td></tr>
  <tr><td>Note de risque</td><td>{{note_risque}}</td></tr>
</table>`,
  },
  {
    code: 'bank_tableau_amortissement',
    name: "Tableau d'Amortissement de Prêt",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Tableau d'amortissement mensuel d'un prêt, détaillant pour chaque échéance la part capital, la part intérêts et le capital restant dû.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 90,
    fieldsJson: F([
      { key: 'emprunteur', label: 'Emprunteur', type: 'text', required: true },
      { key: 'montant', label: 'Capital emprunté (FCFA)', type: 'number', required: true },
      { key: 'taux_mensuel', label: 'Taux mensuel (%)', type: 'number', required: true },
      { key: 'duree_mois', label: 'Durée (mois)', type: 'number', required: true },
      { key: 'date_premier_echeance', label: 'Date première échéance', type: 'date', required: true },
    ]),
    body: `<h1>TABLEAU D'AMORTISSEMENT</h1>
<p><strong>Emprunteur :</strong> {{emprunteur}}<br><strong>Capital :</strong> {{montant}} FCFA<br><strong>Taux mensuel :</strong> {{taux_mensuel}} %<br><strong>Durée :</strong> {{duree_mois}} mois</p>
<table border="1" cellpadding="6">
  <tr><th>Mois</th><th>Échéance</th><th>Capital</th><th>Intérêts</th><th>Capital restant dû</th></tr>
  <tr><td colspan="5"><em>Tableau généré automatiquement selon les paramètres saisis</em></td></tr>
</table>`,
  },
  {
    code: 'bank_mainlevee_hypotheque',
    name: "Mainlevée d'Hypothèque",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 27000,
    description: "Acte de mainlevée d'hypothèque attestant du remboursement intégral du prêt et autorisant la radiation de l'hypothèque au registre foncier.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'emprunteur', label: 'Emprunteur', type: 'text', required: true },
      { key: 'bien', label: 'Bien hypothéqué', type: 'text', required: true },
      { key: 'montant_rembourse', label: 'Montant remboursé (FCFA)', type: 'number', required: true },
      { key: 'date_mainlevee', label: 'Date de mainlevée', type: 'date', required: true },
    ]),
    body: `<h1>MAINLEVÉE D'HYPOTHÈQUE</h1>
<p>La banque <strong>{{banque}}</strong> donne mainlevée de l'hypothèque inscrite sur :<br><strong>{{bien}}</strong><br>au profit de <strong>{{emprunteur}}</strong>.</p>
<table border="1" cellpadding="8">
  <tr><td>Montant remboursé</td><td>{{montant_rembourse}} FCFA</td></tr>
  <tr><td>Date de mainlevée</td><td>{{date_mainlevee}}</td></tr>
</table>`,
  },
  {
    code: 'bank_quittance_remboursement',
    name: 'Quittance de Remboursement',
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Reçu officiel de remboursement de crédit attestant du paiement d'une échéance ou du solde total d'un prêt.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 83,
    fieldsJson: F([
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'emprunteur', label: 'Emprunteur', type: 'text', required: true },
      { key: 'montant_paye', label: 'Montant payé (FCFA)', type: 'number', required: true },
      { key: 'numero_credit', label: 'Numéro de crédit', type: 'text', required: true },
      { key: 'date_paiement', label: 'Date de paiement', type: 'date', required: true },
    ]),
    body: `<h1>QUITTANCE DE REMBOURSEMENT</h1>
<p>La banque <strong>{{banque}}</strong> reconnaît avoir reçu de <strong>{{emprunteur}}</strong> la somme de <strong>{{montant_paye}} FCFA</strong> au titre du crédit N° {{numero_credit}}, en date du {{date_paiement}}.</p>`,
  },
  {
    code: 'bank_contrat_garantie_bancaire',
    name: 'Contrat de Garantie Bancaire',
    category: 'commercial_financier',
    price: 14000,
    priceMax: 42000,
    description: "Contrat par lequel une banque accorde une garantie de paiement ou de bonne exécution à un bénéficiaire tiers pour le compte de son client.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'banque_garante', label: 'Banque garante', type: 'text', required: true },
      { key: 'donneur_ordre', label: "Donneur d'ordre", type: 'text', required: true },
      { key: 'beneficiaire', label: 'Bénéficiaire', type: 'text', required: true },
      { key: 'montant_garanti', label: 'Montant garanti (FCFA)', type: 'number', required: true },
      { key: 'type_garantie', label: 'Type de garantie', type: 'text', required: true },
      { key: 'date_expiration', label: "Date d'expiration", type: 'date', required: true },
    ]),
    body: `<h1>CONTRAT DE GARANTIE BANCAIRE</h1>
<p><strong>Banque garante :</strong> {{banque_garante}}<br><strong>Donneur d'ordre :</strong> {{donneur_ordre}}<br><strong>Bénéficiaire :</strong> {{beneficiaire}}</p>
<table border="1" cellpadding="8">
  <tr><td>Montant garanti</td><td>{{montant_garanti}} FCFA</td></tr>
  <tr><td>Type de garantie</td><td>{{type_garantie}}</td></tr>
  <tr><td>Date d'expiration</td><td>{{date_expiration}}</td></tr>
</table>`,
  },
  {
    code: 'bank_lettre_confort',
    name: 'Lettre de Confort Bancaire',
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Lettre de confort émise par une banque à l'intention d'un tiers, attestant de la solvabilité et du bon fonctionnement du compte d'un client.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'client', label: 'Nom du client', type: 'text', required: true },
      { key: 'destinataire', label: 'Destinataire', type: 'text', required: true },
      { key: 'objet', label: 'Objet de la lettre', type: 'text', required: true },
      { key: 'date_lettre', label: 'Date de la lettre', type: 'date', required: true },
    ]),
    body: `<h1>LETTRE DE CONFORT</h1>
<p><strong>{{banque}}</strong><br>Date : {{date_lettre}}</p>
<p>À l'attention de : <strong>{{destinataire}}</strong></p>
<p>Objet : {{objet}}</p>
<p>Nous attestons que notre client <strong>{{client}}</strong> entretient avec notre établissement une relation bancaire satisfaisante.</p>`,
  },
  {
    code: 'bank_avis_virement',
    name: 'Avis de Virement Bancaire',
    category: 'commercial_financier',
    price: 1500,
    priceMax: 4500,
    description: "Avis officiel de virement bancaire notifiant le bénéficiaire de la réception d'un transfert de fonds.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 87,
    fieldsJson: F([
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'beneficiaire', label: 'Bénéficiaire', type: 'text', required: true },
      { key: 'montant', label: 'Montant (FCFA)', type: 'number', required: true },
      { key: 'numero_virement', label: 'Numéro de virement', type: 'text', required: true },
      { key: 'date_valeur', label: 'Date de valeur', type: 'date', required: true },
      { key: 'donneur_ordre', label: "Donneur d'ordre", type: 'text', required: true },
    ]),
    body: `<h1>AVIS DE VIREMENT</h1>
<h2>{{banque}}</h2>
<p>Nous avons le plaisir de vous informer d'un virement reçu en votre faveur.</p>
<table border="1" cellpadding="8">
  <tr><td>Bénéficiaire</td><td>{{beneficiaire}}</td></tr>
  <tr><td>Donneur d'ordre</td><td>{{donneur_ordre}}</td></tr>
  <tr><td>Montant</td><td>{{montant}} FCFA</td></tr>
  <tr><td>N° virement</td><td>{{numero_virement}}</td></tr>
  <tr><td>Date de valeur</td><td>{{date_valeur}}</td></tr>
</table>`,
  },
  {
    code: 'bank_releve_compte_certifie',
    name: 'Relevé de Compte Certifié',
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Relevé de compte bancaire certifié conforme par la banque, incluant le solde à une date donnée et les mouvements de la période.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 84,
    fieldsJson: F([
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'titulaire', label: 'Titulaire du compte', type: 'text', required: true },
      { key: 'numero_compte', label: 'Numéro de compte', type: 'text', required: true },
      { key: 'periode', label: 'Période', type: 'text', required: true },
      { key: 'solde_final', label: 'Solde final (FCFA)', type: 'number', required: true },
      { key: 'date_certification', label: 'Date de certification', type: 'date', required: true },
    ]),
    body: `<h1>RELEVÉ DE COMPTE CERTIFIÉ</h1>
<h2>{{banque}}</h2>
<p><strong>Titulaire :</strong> {{titulaire}}<br><strong>Compte N° :</strong> {{numero_compte}}<br><strong>Période :</strong> {{periode}}</p>
<p><strong>Solde au {{date_certification}} :</strong> {{solde_final}} FCFA</p>
<p><em>Certifié conforme par {{banque}}, le {{date_certification}}</em></p>`,
  },
  {
    code: 'bank_convention_domiciliation_salaire',
    name: 'Convention de Domiciliation de Salaire',
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Convention entre un employeur, un salarié et une banque pour la domiciliation du salaire, facilitant l'octroi de crédits au salarié.",
    templateType: 'pdf',
    classe: 'banque',
    active: true,
    popularity: 79,
    fieldsJson: F([
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'employeur', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'salaire_net', label: 'Salaire net mensuel (FCFA)', type: 'number', required: true },
      { key: 'numero_compte', label: 'Numéro de compte', type: 'text', required: true },
      { key: 'date_convention', label: 'Date de la convention', type: 'date', required: true },
    ]),
    body: `<h1>CONVENTION DE DOMICILIATION DE SALAIRE</h1>
<p>Entre <strong>{{banque}}</strong>, <strong>{{employeur}}</strong> et <strong>{{salarie}}</strong></p>
<table border="1" cellpadding="8">
  <tr><td>Salaire net mensuel</td><td>{{salaire_net}} FCFA</td></tr>
  <tr><td>Compte de domiciliation</td><td>{{numero_compte}}</td></tr>
  <tr><td>Date</td><td>{{date_convention}}</td></tr>
</table>
<p>L'employeur s'engage à virer le salaire de {{salarie}} sur le compte susmentionné chaque mois.</p>`,
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
  console.log(`Batch 08a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
