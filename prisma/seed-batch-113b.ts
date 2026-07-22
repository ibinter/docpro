import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── Finance d'entreprise ──────────────────────────────────────────────────
  {
    code: 'fin2_analyse_financiere',
    name: "Accord de service d'analyse financière (diagnostic entreprise)",
    category: 'finance_banque',
    price: 6000, priceMax: 20000,
    description: "Accord encadrant la mission de diagnostic et d'analyse financière d'une entreprise (ratios, soldes intermédiaires, recommandations).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'cabinet', label: "Cabinet financier", type: 'text', required: true },
      { key: 'entreprise', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'exercices', label: "Exercices analysés (ex: 2022-2024)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de mission", type: 'date', required: true },
      { key: 'honoraires', label: "Honoraires (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ANALYSE FINANCIÈRE</h1><h2>DIAGNOSTIC D'ENTREPRISE</h2><p><strong>Entre :</strong> le cabinet financier <strong>{{cabinet}}</strong>, prestataire, et la société <strong>{{entreprise}}</strong>, cliente.</p><h3>Article 1 – Objet</h3><p>Le cabinet s'engage à réaliser un diagnostic financier complet portant sur les exercices <strong>{{exercices}}</strong>, incluant l'analyse des soldes intermédiaires de gestion, des ratios de liquidité, de solvabilité et de rentabilité, conformément aux normes OHADA.</p><h3>Article 2 – Démarrage</h3><p>La mission débutera le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Honoraires</h3><p>Les honoraires convenus s'élèvent à <strong>{{honoraires}} FCFA</strong> hors taxes, payables selon l'échéancier annexé.</p><h3>Article 4 – Droit applicable</h3><p>Le présent accord est soumis au droit OHADA et aux lois en vigueur en Côte d'Ivoire.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_restructuration_financiere',
    name: "Accord de service de restructuration financière (plan de redressement)",
    category: 'finance_banque',
    price: 8000, priceMax: 30000,
    description: "Accord encadrant la mission de conseil en restructuration financière et élaboration d'un plan de redressement conforme au droit OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'conseil', label: "Cabinet conseil", type: 'text', required: true },
      { key: 'entreprise', label: "Entreprise en difficulté", type: 'text', required: true },
      { key: 'dette_totale', label: "Encours de dette (FCFA)", type: 'text', required: true },
      { key: 'duree_mission', label: "Durée de la mission", type: 'text', required: true },
      { key: 'honoraires', label: "Honoraires (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RESTRUCTURATION FINANCIÈRE</h1><h2>PLAN DE REDRESSEMENT</h2><p><strong>Entre :</strong> <strong>{{conseil}}</strong>, cabinet conseil, et <strong>{{entreprise}}</strong>, société à restructurer.</p><h3>Article 1 – Objet</h3><p>Le cabinet est mandaté pour élaborer et accompagner la mise en œuvre d'un plan de redressement financier. L'encours de dette à restructurer est estimé à <strong>{{dette_totale}} FCFA</strong>.</p><h3>Article 2 – Durée</h3><p>La mission s'étend sur une période de <strong>{{duree_mission}}</strong> à compter de la signature du présent accord.</p><h3>Article 3 – Honoraires</h3><p>Les honoraires s'élèvent à <strong>{{honoraires}} FCFA</strong>, auxquels peut s'ajouter un success fee défini en annexe.</p><h3>Article 4 – Confidentialité</h3><p>Toutes les informations communiquées sont strictement confidentielles.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_levee_fonds',
    name: "Accord de service de levée de fonds (capital-investissement)",
    category: 'finance_banque',
    price: 8000, priceMax: 35000,
    description: "Accord de mandat pour accompagner une entreprise dans sa levée de fonds auprès d'investisseurs en capital.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'mandataire', label: "Cabinet mandataire", type: 'text', required: true },
      { key: 'mandant', label: "Société recherchant des fonds", type: 'text', required: true },
      { key: 'montant_cible', label: "Montant cible de la levée (FCFA)", type: 'text', required: true },
      { key: 'date_lancement', label: "Date de lancement", type: 'date', required: true },
      { key: 'commission', label: "Commission de succès (%)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LEVÉE DE FONDS</h1><h2>CAPITAL-INVESTISSEMENT</h2><p><strong>Entre :</strong> <strong>{{mandataire}}</strong>, cabinet mandataire, et <strong>{{mandant}}</strong>, mandant.</p><h3>Article 1 – Objet</h3><p>Le mandataire est chargé d'identifier et de présenter des investisseurs potentiels pour une levée de fonds d'un montant cible de <strong>{{montant_cible}} FCFA</strong>.</p><h3>Article 2 – Démarrage</h3><p>La mission démarre le <strong>{{date_lancement}}</strong>.</p><h3>Article 3 – Rémunération</h3><p>Une commission de succès de <strong>{{commission}} %</strong> du montant effectivement levé sera versée au mandataire.</p><h3>Article 4 – Exclusivité</h3><p>Le mandant confère un mandat exclusif au mandataire pour la durée convenue.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_due_diligence',
    name: "Accord de service de due diligence financière (acquisition)",
    category: 'finance_banque',
    price: 7000, priceMax: 28000,
    description: "Accord encadrant la mission de due diligence financière préalable à une acquisition ou prise de participation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'cabinet', label: "Cabinet d'audit/conseil", type: 'text', required: true },
      { key: 'acquereur', label: "Société acquéreur", type: 'text', required: true },
      { key: 'cible', label: "Société cible", type: 'text', required: true },
      { key: 'date_remise', label: "Date de remise du rapport", type: 'date', required: true },
      { key: 'honoraires', label: "Honoraires (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DUE DILIGENCE FINANCIÈRE</h1><h2>PRÉALABLE À ACQUISITION</h2><p><strong>Cabinet :</strong> {{cabinet}}</p><p><strong>Acquéreur :</strong> {{acquereur}}</p><p><strong>Cible :</strong> {{cible}}</p><h3>Article 1 – Objet</h3><p>Le cabinet réalise une due diligence financière approfondie de la société cible incluant l'audit des états financiers, l'analyse des engagements hors bilan et la revue de la structure de capital.</p><h3>Article 2 – Livrable</h3><p>Le rapport de due diligence sera remis au plus tard le <strong>{{date_remise}}</strong>.</p><h3>Article 3 – Honoraires</h3><p>Honoraires forfaitaires : <strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_valorisation_entreprise',
    name: "Accord de service de valorisation d'entreprise (DCF, comparables)",
    category: 'finance_banque',
    price: 6000, priceMax: 25000,
    description: "Accord de mission pour la valorisation d'une entreprise par les méthodes DCF, multiples de marché et actif net réévalué.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'evaluateur', label: "Cabinet évaluateur", type: 'text', required: true },
      { key: 'entreprise', label: "Société à valoriser", type: 'text', required: true },
      { key: 'methodes', label: "Méthodes retenues (DCF, comparables...)", type: 'text', required: true },
      { key: 'date_rapport', label: "Date de remise du rapport", type: 'date', required: true },
      { key: 'honoraires', label: "Honoraires (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VALORISATION D'ENTREPRISE</h1><p><strong>Évaluateur :</strong> {{evaluateur}}</p><p><strong>Entreprise :</strong> {{entreprise}}</p><h3>Article 1 – Objet</h3><p>L'évaluateur s'engage à établir une valorisation de la société en utilisant les méthodes suivantes : <strong>{{methodes}}</strong>.</p><h3>Article 2 – Rapport</h3><p>Le rapport de valorisation sera remis le <strong>{{date_rapport}}</strong>.</p><h3>Article 3 – Honoraires</h3><p>Honoraires : <strong>{{honoraires}} FCFA</strong> HT.</p><h3>Article 4 – Usage</h3><p>Le rapport est établi exclusivement à l'usage du client et ne saurait engager l'évaluateur vis-à-vis de tiers.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_ma_conseil',
    name: "Accord de service de fusion-acquisition (M&A conseil)",
    category: 'finance_banque',
    price: 10000, priceMax: 40000,
    description: "Accord de mandat conseil pour accompagner une opération de fusion ou d'acquisition d'entreprise (sell-side ou buy-side).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      { key: 'conseil', label: "Banque/Cabinet conseil M&A", type: 'text', required: true },
      { key: 'client', label: "Client (cédant ou acquéreur)", type: 'text', required: true },
      { key: 'type_mandat', label: "Type de mandat (sell-side/buy-side)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'retainer', label: "Retainer mensuel (FCFA)", type: 'text', required: true },
      { key: 'success_fee', label: "Success fee (%)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FUSION-ACQUISITION</h1><h2>MANDAT M&A</h2><p><strong>Conseil :</strong> {{conseil}}</p><p><strong>Client :</strong> {{client}}</p><p><strong>Type de mandat :</strong> {{type_mandat}}</p><h3>Article 1 – Objet</h3><p>Le conseil est mandaté pour accompagner le client dans la réalisation de l'opération de M&A, depuis la phase de préparation jusqu'au closing.</p><h3>Article 2 – Démarrage</h3><p>Le mandat prend effet le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Rémunération</h3><p>Retainer mensuel : <strong>{{retainer}} FCFA</strong>. Success fee : <strong>{{success_fee}} %</strong> de la valeur de la transaction.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_lbo',
    name: "Accord de service de LBO (rachat par endettement)",
    category: 'finance_banque',
    price: 10000, priceMax: 42000,
    description: "Accord de conseil pour la structuration et la mise en œuvre d'un Leveraged Buy-Out (LBO) conforme au droit OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'conseil', label: "Cabinet structurateur", type: 'text', required: true },
      { key: 'holding', label: "Holding d'acquisition", type: 'text', required: true },
      { key: 'cible', label: "Société cible", type: 'text', required: true },
      { key: 'dette_senior', label: "Montant dette senior (FCFA)", type: 'text', required: true },
      { key: 'date_closing', label: "Date de closing prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LBO</h1><h2>RACHAT PAR ENDETTEMENT</h2><p><strong>Conseil :</strong> {{conseil}}</p><p><strong>Holding :</strong> {{holding}}</p><p><strong>Cible :</strong> {{cible}}</p><h3>Article 1 – Objet</h3><p>Le cabinet accompagne la structuration du LBO, incluant la négociation de la dette senior de <strong>{{dette_senior}} FCFA</strong>, la rédaction du term sheet et le closing.</p><h3>Article 2 – Closing</h3><p>La date de closing prévisionnelle est fixée au <strong>{{date_closing}}</strong>.</p><h3>Article 3 – Confidentialité</h3><p>Les parties s'engagent à la stricte confidentialité des informations échangées.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_venture_capital',
    name: "Accord de service de capital-risque (venture capital, startup)",
    category: 'finance_banque',
    price: 6000, priceMax: 22000,
    description: "Accord encadrant l'investissement d'un fonds de capital-risque dans une startup de l'écosystème africain.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'fonds', label: "Fonds de capital-risque", type: 'text', required: true },
      { key: 'startup', label: "Startup bénéficiaire", type: 'text', required: true },
      { key: 'montant', label: "Montant de l'investissement (FCFA)", type: 'text', required: true },
      { key: 'participation', label: "Participation au capital (%)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CAPITAL-RISQUE</h1><h2>VENTURE CAPITAL – STARTUP</h2><p><strong>Investisseur :</strong> {{fonds}}</p><p><strong>Startup :</strong> {{startup}}</p><h3>Article 1 – Investissement</h3><p>Le fonds investit <strong>{{montant}} FCFA</strong> en contrepartie d'une participation de <strong>{{participation}} %</strong> au capital de la startup.</p><h3>Article 2 – Gouvernance</h3><p>L'investisseur disposera d'un siège au conseil d'administration et de droits d'information renforcés.</p><h3>Article 3 – Sortie</h3><p>Les conditions de sortie (cession, introduction en bourse BRVM) sont définies dans le pacte d'actionnaires annexé.</p><p class="signature">Signé le <strong>{{date_signature}}</strong></p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_business_angel',
    name: "Accord de service de business angel (investisseur providentiel)",
    category: 'finance_banque',
    price: 4000, priceMax: 15000,
    description: "Convention entre un business angel et une startup portant sur les modalités d'investissement et d'accompagnement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'investisseur', label: "Nom du business angel", type: 'text', required: true },
      { key: 'startup', label: "Startup", type: 'text', required: true },
      { key: 'apport', label: "Apport financier (FCFA)", type: 'text', required: true },
      { key: 'participation', label: "Participation (%)", type: 'text', required: true },
      { key: 'date', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE BUSINESS ANGEL</h1><h2>INVESTISSEUR PROVIDENTIEL</h2><p><strong>Business Angel :</strong> {{investisseur}}</p><p><strong>Startup :</strong> {{startup}}</p><h3>Article 1 – Apport</h3><p>L'investisseur apporte la somme de <strong>{{apport}} FCFA</strong> en échange de <strong>{{participation}} %</strong> du capital.</p><h3>Article 2 – Accompagnement</h3><p>Au-delà du financement, l'investisseur apporte son expertise, son réseau et ses conseils stratégiques.</p><h3>Article 3 – Pacte</h3><p>Un pacte d'actionnaires définit les droits de préemption, de sortie conjointe et les clauses anti-dilution.</p><p class="signature">Signé le <strong>{{date}}</strong></p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_project_finance',
    name: "Accord de service de financement de projet (project finance)",
    category: 'finance_banque',
    price: 10000, priceMax: 45000,
    description: "Accord de conseil pour la structuration d'un financement de projet (infrastructures, énergie, agro-industrie) en Afrique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      { key: 'arrangeur', label: "Banque arrangeur", type: 'text', required: true },
      { key: 'porteur', label: "Porteur de projet (SPV)", type: 'text', required: true },
      { key: 'projet', label: "Nom du projet", type: 'text', required: true },
      { key: 'montant', label: "Montant total du financement (FCFA)", type: 'text', required: true },
      { key: 'date_fin', label: "Date de fin de construction", type: 'date', required: true },
      { key: 'garanties', label: "Garanties (ex: hypothèque, nantissement)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FINANCEMENT DE PROJET</h1><h2>PROJECT FINANCE</h2><p><strong>Arrangeur :</strong> {{arrangeur}}</p><p><strong>SPV Porteur :</strong> {{porteur}}</p><p><strong>Projet :</strong> {{projet}}</p><h3>Article 1 – Financement</h3><p>L'arrangeur structure un financement de <strong>{{montant}} FCFA</strong> pour la réalisation du projet.</p><h3>Article 2 – Garanties</h3><p>Les garanties suivantes sont constituées : <strong>{{garanties}}</strong>.</p><h3>Article 3 – Achèvement</h3><p>La date prévisionnelle d'achèvement des travaux est le <strong>{{date_fin}}</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  // ── Trésorerie ────────────────────────────────────────────────────────────
  {
    code: 'fin2_gestion_tresorerie_ct',
    name: "Accord de service de gestion de trésorerie court terme",
    category: 'finance_banque',
    price: 5000, priceMax: 18000,
    description: "Accord confiant à un prestataire la gestion quotidienne de la trésorerie court terme d'une entreprise (CI/OHADA).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'prestataire', label: "Prestataire trésorier", type: 'text', required: true },
      { key: 'client', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'solde_cible', label: "Solde cible quotidien (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'honoraires', label: "Honoraires mensuels (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE TRÉSORERIE COURT TERME</h1><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Client :</strong> {{client}}</p><h3>Article 1 – Objet</h3><p>Le prestataire assure la gestion quotidienne de la trésorerie de l'entreprise, en visant un solde cible de <strong>{{solde_cible}} FCFA</strong>.</p><h3>Article 2 – Démarrage</h3><p>La mission débute le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Honoraires</h3><p>Honoraires mensuels : <strong>{{honoraires}} FCFA</strong>.</p><h3>Article 4 – Reporting</h3><p>Un tableau de bord quotidien est communiqué au client avant 9h00.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_previsions_tresorerie',
    name: "Accord de service de prévisions de trésorerie (budget cash)",
    category: 'finance_banque',
    price: 5000, priceMax: 16000,
    description: "Accord de mission pour l'élaboration et le suivi des prévisions de trésorerie (budget cash flow) d'une entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      { key: 'cabinet', label: "Cabinet financier", type: 'text', required: true },
      { key: 'entreprise', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'horizon', label: "Horizon de prévision (ex: 12 mois)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison du budget", type: 'date', required: true },
      { key: 'honoraires', label: "Honoraires (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRÉVISIONS DE TRÉSORERIE</h1><h2>BUDGET CASH FLOW</h2><p><strong>Cabinet :</strong> {{cabinet}}</p><p><strong>Entreprise :</strong> {{entreprise}}</p><h3>Article 1 – Objet</h3><p>Le cabinet établit un budget de trésorerie prévisionnel sur un horizon de <strong>{{horizon}}</strong>, avec une granularité mensuelle.</p><h3>Article 2 – Livraison</h3><p>Le budget est livré le <strong>{{date_livraison}}</strong>.</p><h3>Article 3 – Honoraires</h3><p>Honoraires : <strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_credit_management',
    name: "Accord de service de credit management (gestion créances)",
    category: 'finance_banque',
    price: 5000, priceMax: 20000,
    description: "Accord confiant la gestion des créances clients et le recouvrement à un prestataire spécialisé en credit management.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'prestataire', label: "Prestataire credit manager", type: 'text', required: true },
      { key: 'client', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'encours_creances', label: "Encours de créances (FCFA)", type: 'text', required: true },
      { key: 'delai_cible', label: "DSO cible (jours)", type: 'text', required: true },
      { key: 'honoraires', label: "Honoraires mensuels (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CREDIT MANAGEMENT</h1><h2>GESTION DES CRÉANCES CLIENTS</h2><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Client :</strong> {{client}}</p><h3>Article 1 – Objet</h3><p>Le prestataire gère le portefeuille de créances clients d'un encours de <strong>{{encours_creances}} FCFA</strong>, avec pour objectif un DSO cible de <strong>{{delai_cible}} jours</strong>.</p><h3>Article 2 – Missions</h3><p>Relances amiables, gestion des litiges, reporting mensuel des impayés et suivi des procédures de recouvrement.</p><h3>Article 3 – Honoraires</h3><p>Honoraires mensuels : <strong>{{honoraires}} FCFA</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_factoring_ci',
    name: "Accord de service de factoring (affacturage CI)",
    category: 'finance_banque',
    price: 5000, priceMax: 18000,
    description: "Convention d'affacturage entre une entreprise et un factor agréé en Côte d'Ivoire pour le financement des créances commerciales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'factor', label: "Société d'affacturage (factor)", type: 'text', required: true },
      { key: 'adherent', label: "Entreprise adhérente", type: 'text', required: true },
      { key: 'plafond', label: "Plafond de financement (FCFA)", type: 'text', required: true },
      { key: 'taux_commission', label: "Taux de commission (%)", type: 'text', required: true },
      { key: 'date_effet', label: "Date d'effet", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION D'AFFACTURAGE</h1><h2>FACTORING – CÔTE D'IVOIRE</h2><p><strong>Factor :</strong> {{factor}}</p><p><strong>Adhérent :</strong> {{adherent}}</p><h3>Article 1 – Objet</h3><p>L'adhérent cède ses créances commerciales au factor qui assure leur financement dans la limite d'un plafond de <strong>{{plafond}} FCFA</strong>.</p><h3>Article 2 – Commission</h3><p>La commission d'affacturage est fixée à <strong>{{taux_commission}} %</strong> du montant des créances cédées.</p><h3>Article 3 – Prise d'effet</h3><p>La convention prend effet le <strong>{{date_effet}}</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_reverse_factoring',
    name: "Accord de service de reverse factoring (supply chain finance)",
    category: 'finance_banque',
    price: 5000, priceMax: 20000,
    description: "Accord de supply chain finance permettant aux fournisseurs d'être payés rapidement via un factor mandaté par l'acheteur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'acheteur', label: "Entreprise acheteur (donneur d'ordre)", type: 'text', required: true },
      { key: 'factor', label: "Factor / banque", type: 'text', required: true },
      { key: 'plafond', label: "Plafond du programme (FCFA)", type: 'text', required: true },
      { key: 'taux_escompte', label: "Taux d'escompte annuel (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de démarrage", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE REVERSE FACTORING</h1><h2>SUPPLY CHAIN FINANCE</h2><p><strong>Acheteur :</strong> {{acheteur}}</p><p><strong>Factor :</strong> {{factor}}</p><h3>Article 1 – Programme</h3><p>L'acheteur met en place un programme de reverse factoring d'un plafond de <strong>{{plafond}} FCFA</strong> au bénéfice de ses fournisseurs.</p><h3>Article 2 – Taux</h3><p>Le taux d'escompte appliqué aux fournisseurs est de <strong>{{taux_escompte}} % l'an</strong>.</p><h3>Article 3 – Démarrage</h3><p>Le programme démarre le <strong>{{date_debut}}</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_placement_tresorerie',
    name: "Accord de service de placement de trésorerie (FCP, SICAV BRVM)",
    category: 'finance_banque',
    price: 5000, priceMax: 18000,
    description: "Accord de gestion pour le placement des excédents de trésorerie en OPCVM agréés CREPMF sur la BRVM.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'sgc', label: "Société de gestion (SGC agréée CREPMF)", type: 'text', required: true },
      { key: 'client', label: "Entreprise investisseur", type: 'text', required: true },
      { key: 'montant', label: "Montant à placer (FCFA)", type: 'text', required: true },
      { key: 'opcvm', label: "Nom de l'OPCVM (FCP ou SICAV)", type: 'text', required: true },
      { key: 'date_souscription', label: "Date de souscription", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PLACEMENT DE TRÉSORERIE</h1><h2>FCP / SICAV – BRVM / UEMOA</h2><p><strong>SGC :</strong> {{sgc}}</p><p><strong>Client :</strong> {{client}}</p><h3>Article 1 – Objet</h3><p>Le client souscrit à l'OPCVM <strong>{{opcvm}}</strong> pour un montant de <strong>{{montant}} FCFA</strong>.</p><h3>Article 2 – Date</h3><p>La souscription intervient le <strong>{{date_souscription}}</strong>.</p><h3>Article 3 – Risques</h3><p>Le client reconnaît avoir pris connaissance du prospectus et des risques associés à l'investissement en OPCVM.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_credit_revolving',
    name: "Accord de service de ligne de crédit revolving (banque CI)",
    category: 'finance_banque',
    price: 6000, priceMax: 22000,
    description: "Convention de ligne de crédit revolving entre une banque ivoirienne et une entreprise pour le financement du cycle d'exploitation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'banque', label: "Banque (CI)", type: 'text', required: true },
      { key: 'emprunteur', label: "Société emprunteur", type: 'text', required: true },
      { key: 'plafond', label: "Plafond de la ligne (FCFA)", type: 'text', required: true },
      { key: 'taux', label: "Taux d'intérêt annuel (%)", type: 'text', required: true },
      { key: 'echeance', label: "Échéance de la ligne", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CRÉDIT REVOLVING</h1><p><strong>Banque :</strong> {{banque}}</p><p><strong>Emprunteur :</strong> {{emprunteur}}</p><h3>Article 1 – Ligne de crédit</h3><p>La banque met à disposition de l'emprunteur une ligne revolving d'un plafond de <strong>{{plafond}} FCFA</strong>, renouvelable par tirages successifs.</p><h3>Article 2 – Taux</h3><p>Taux d'intérêt : <strong>{{taux}} % l'an</strong>, révisable selon les conditions du marché UMOA.</p><h3>Article 3 – Échéance</h3><p>La ligne arrive à échéance le <strong>{{echeance}}</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_pool_tresorerie',
    name: "Accord de service de pool de trésorerie (groupe)",
    category: 'finance_banque',
    price: 6000, priceMax: 25000,
    description: "Convention de cash pooling entre la société mère et ses filiales pour l'optimisation de la trésorerie de groupe.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'mere', label: "Société mère (chef de file)", type: 'text', required: true },
      { key: 'filiales', label: "Filiales participantes", type: 'textarea', required: true },
      { key: 'banque', label: "Banque centralisatrice", type: 'text', required: true },
      { key: 'taux_intra', label: "Taux intra-groupe (%)", type: 'text', required: true },
      { key: 'date_effet', label: "Date d'effet", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE POOL DE TRÉSORERIE</h1><h2>CASH POOLING GROUPE</h2><p><strong>Chef de file :</strong> {{mere}}</p><p><strong>Filiales :</strong> {{filiales}}</p><p><strong>Banque :</strong> {{banque}}</p><h3>Article 1 – Mécanisme</h3><p>Les soldes de trésorerie des filiales sont centralisés quotidiennement sur le compte pivot de la société mère.</p><h3>Article 2 – Rémunération</h3><p>Les avances intra-groupe sont rémunérées au taux de <strong>{{taux_intra}} %</strong> l'an.</p><h3>Article 3 – Prise d'effet</h3><p>La convention prend effet le <strong>{{date_effet}}</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_swap_taux',
    name: "Accord de service de couverture taux d'intérêt (swap CI)",
    category: 'finance_banque',
    price: 7000, priceMax: 28000,
    description: "Convention de swap de taux d'intérêt pour la couverture du risque de taux sur un emprunt bancaire en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      { key: 'banque', label: "Banque contrepartiste", type: 'text', required: true },
      { key: 'entreprise', label: "Entreprise couverte", type: 'text', required: true },
      { key: 'nominal', label: "Montant nominal (FCFA)", type: 'text', required: true },
      { key: 'taux_fixe', label: "Taux fixe payé (%)", type: 'text', required: true },
      { key: 'date_echeance', label: "Date d'échéance du swap", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SWAP DE TAUX D'INTÉRÊT</h1><p><strong>Banque :</strong> {{banque}}</p><p><strong>Entreprise :</strong> {{entreprise}}</p><h3>Article 1 – Objet</h3><p>Les parties concluent un swap de taux sur un nominal de <strong>{{nominal}} FCFA</strong>.</p><h3>Article 2 – Flux</h3><p>L'entreprise paie le taux fixe de <strong>{{taux_fixe}} %</strong> et reçoit le taux variable de référence BCEAO.</p><h3>Article 3 – Échéance</h3><p>Le swap prend fin le <strong>{{date_echeance}}</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_netting_intragroupe',
    name: "Accord de service de netting (compensation intra-groupe)",
    category: 'finance_banque',
    price: 5000, priceMax: 18000,
    description: "Convention de compensation multilatérale (netting) des flux financiers intra-groupe pour réduire les transferts bancaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'agent', label: "Agent de netting (société mère ou banque)", type: 'text', required: true },
      { key: 'participants', label: "Entités participantes", type: 'textarea', required: true },
      { key: 'frequence', label: "Fréquence de compensation (ex: mensuelle)", type: 'text', required: true },
      { key: 'devise', label: "Devise de règlement", type: 'text', required: true },
      { key: 'date_debut', label: "Date de démarrage", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE NETTING INTRA-GROUPE</h1><h2>COMPENSATION MULTILATÉRALE</h2><p><strong>Agent :</strong> {{agent}}</p><p><strong>Participants :</strong> {{participants}}</p><h3>Article 1 – Mécanisme</h3><p>Les créances et dettes entre entités du groupe sont compensées <strong>{{frequence}}</strong>, seul le solde net étant réglé.</p><h3>Article 2 – Devise</h3><p>Les règlements sont effectués en <strong>{{devise}}</strong>.</p><h3>Article 3 – Démarrage</h3><p>La convention prend effet le <strong>{{date_debut}}</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  // ── Banque & Crédit ───────────────────────────────────────────────────────
  {
    code: 'fin2_credit_investissement',
    name: "Accord de service de crédit d'investissement (banque CI)",
    category: 'finance_banque',
    price: 6000, priceMax: 22000,
    description: "Convention de crédit d'investissement à moyen/long terme entre une banque ivoirienne et une entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'banque', label: "Banque prêteuse", type: 'text', required: true },
      { key: 'emprunteur', label: "Société emprunteur", type: 'text', required: true },
      { key: 'montant', label: "Montant du crédit (FCFA)", type: 'text', required: true },
      { key: 'duree', label: "Durée (mois)", type: 'text', required: true },
      { key: 'taux', label: "Taux d'intérêt annuel (%)", type: 'text', required: true },
      { key: 'date_deb', label: "Date de mise en place", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CRÉDIT D'INVESTISSEMENT</h1><p><strong>Banque :</strong> {{banque}}</p><p><strong>Emprunteur :</strong> {{emprunteur}}</p><h3>Article 1 – Crédit</h3><p>La banque accorde un crédit d'investissement de <strong>{{montant}} FCFA</strong> sur <strong>{{duree}} mois</strong> au taux de <strong>{{taux}} % l'an</strong>.</p><h3>Article 2 – Mise en place</h3><p>Le crédit est mis en place le <strong>{{date_deb}}</strong>.</p><h3>Article 3 – Remboursement</h3><p>Le remboursement s'effectue par amortissements mensuels constants selon le tableau annexé.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_credit_fonctionnement',
    name: "Accord de service de crédit de fonctionnement (BTP, commerce)",
    category: 'finance_banque',
    price: 5000, priceMax: 18000,
    description: "Convention de crédit de fonctionnement à court terme pour financer le cycle d'exploitation (BTP, négoce, commerce).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'banque', label: "Banque", type: 'text', required: true },
      { key: 'emprunteur', label: "Entreprise", type: 'text', required: true },
      { key: 'montant', label: "Plafond (FCFA)", type: 'text', required: true },
      { key: 'taux', label: "Taux d'intérêt (%)", type: 'text', required: true },
      { key: 'echeance', label: "Échéance", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CRÉDIT DE FONCTIONNEMENT</h1><p><strong>Banque :</strong> {{banque}}</p><p><strong>Emprunteur :</strong> {{emprunteur}}</p><h3>Article 1 – Crédit</h3><p>La banque met à disposition un crédit de fonctionnement de <strong>{{montant}} FCFA</strong> au taux de <strong>{{taux}} %</strong> l'an.</p><h3>Article 2 – Échéance</h3><p>Le crédit vient à échéance le <strong>{{echeance}}</strong>.</p><h3>Article 3 – Garanties</h3><p>Les garanties exigées sont définies en annexe.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_credit_bail',
    name: "Accord de service de crédit bail (leasing équipement CI)",
    category: 'finance_banque',
    price: 5000, priceMax: 20000,
    description: "Convention de crédit-bail mobilier pour le financement d'équipements professionnels en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'bailleur', label: "Société de leasing", type: 'text', required: true },
      { key: 'preneur', label: "Entreprise preneuse", type: 'text', required: true },
      { key: 'equipement', label: "Description de l'équipement", type: 'textarea', required: true },
      { key: 'loyer', label: "Loyer mensuel (FCFA)", type: 'text', required: true },
      { key: 'duree', label: "Durée du contrat (mois)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CRÉDIT-BAIL MOBILIER</h1><h2>LEASING ÉQUIPEMENT</h2><p><strong>Bailleur :</strong> {{bailleur}}</p><p><strong>Preneur :</strong> {{preneur}}</p><h3>Article 1 – Équipement</h3><p>{{equipement}}</p><h3>Article 2 – Loyer</h3><p>Le preneur paie un loyer mensuel de <strong>{{loyer}} FCFA</strong> sur une durée de <strong>{{duree}} mois</strong>.</p><h3>Article 3 – Option d'achat</h3><p>À l'issue du contrat, le preneur peut lever l'option d'achat au prix résiduel défini en annexe.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_credit_documentaire',
    name: "Accord de service de crédit documentaire import (L/C)",
    category: 'finance_banque',
    price: 6000, priceMax: 22000,
    description: "Convention encadrant l'ouverture d'un crédit documentaire import (lettre de crédit) par une banque ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'banque_emettrice', label: "Banque émettrice (CI)", type: 'text', required: true },
      { key: 'importateur', label: "Importateur (donneur d'ordre)", type: 'text', required: true },
      { key: 'exportateur', label: "Exportateur (bénéficiaire)", type: 'text', required: true },
      { key: 'montant', label: "Montant du L/C (FCFA ou USD)", type: 'text', required: true },
      { key: 'date_expiration', label: "Date d'expiration du L/C", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CRÉDIT DOCUMENTAIRE IMPORT</h1><h2>LETTRE DE CRÉDIT (L/C)</h2><p><strong>Banque émettrice :</strong> {{banque_emettrice}}</p><p><strong>Donneur d'ordre :</strong> {{importateur}}</p><p><strong>Bénéficiaire :</strong> {{exportateur}}</p><h3>Article 1 – Ouverture</h3><p>La banque ouvre un crédit documentaire irrévocable d'un montant de <strong>{{montant}}</strong>.</p><h3>Article 2 – Expiration</h3><p>Le crédit documentaire expire le <strong>{{date_expiration}}</strong>.</p><h3>Article 3 – Documents requis</h3><p>La liste des documents requis (facture, connaissement, certificat d'origine...) est détaillée en annexe.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_aval_bancaire',
    name: "Accord de service d'aval bancaire (caution de marché)",
    category: 'finance_banque',
    price: 5000, priceMax: 18000,
    description: "Convention d'aval bancaire ou de caution de soumission à marché public en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'banque', label: "Banque garante", type: 'text', required: true },
      { key: 'donneur_ordre', label: "Entreprise (donneur d'ordre)", type: 'text', required: true },
      { key: 'beneficiaire', label: "Maître d'ouvrage (bénéficiaire)", type: 'text', required: true },
      { key: 'montant', label: "Montant de la caution (FCFA)", type: 'text', required: true },
      { key: 'date_validite', label: "Date de validité", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION D'AVAL BANCAIRE</h1><h2>CAUTION DE MARCHÉ</h2><p><strong>Banque garante :</strong> {{banque}}</p><p><strong>Donneur d'ordre :</strong> {{donneur_ordre}}</p><p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p><h3>Article 1 – Engagement</h3><p>La banque se porte caution solidaire du donneur d'ordre à hauteur de <strong>{{montant}} FCFA</strong>.</p><h3>Article 2 – Validité</h3><p>La caution est valide jusqu'au <strong>{{date_validite}}</strong>.</p><h3>Article 3 – Appel en garantie</h3><p>Le bénéficiaire peut appeler la garantie sur simple demande écrite motivée.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_garantie_bonne_execution',
    name: "Accord de service de garantie de bonne exécution (marché CI)",
    category: 'finance_banque',
    price: 5000, priceMax: 18000,
    description: "Garantie bancaire de bonne exécution d'un marché public ou privé en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      { key: 'banque', label: "Banque émettrice", type: 'text', required: true },
      { key: 'entreprise', label: "Entreprise titulaire du marché", type: 'text', required: true },
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'marche', label: "Référence du marché", type: 'text', required: true },
      { key: 'montant', label: "Montant de la garantie (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>GARANTIE DE BONNE EXÉCUTION</h1><p><strong>Banque :</strong> {{banque}}</p><p><strong>Titulaire :</strong> {{entreprise}}</p><p><strong>Maître d'ouvrage :</strong> {{maitre_ouvrage}}</p><p><strong>Marché :</strong> {{marche}}</p><h3>Article 1 – Engagement</h3><p>La banque garantit la bonne exécution du marché référencé à hauteur de <strong>{{montant}} FCFA</strong>.</p><h3>Article 2 – Mise en jeu</h3><p>La garantie peut être mise en jeu par le maître d'ouvrage en cas de défaillance du titulaire.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_caution_restitution_avance',
    name: "Accord de service de caution de restitution d'avance (marché CI)",
    category: 'finance_banque',
    price: 4000, priceMax: 15000,
    description: "Caution bancaire garantissant la restitution de l'avance de démarrage versée dans le cadre d'un marché public ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'banque', label: "Banque émettrice", type: 'text', required: true },
      { key: 'entreprise', label: "Entreprise bénéficiaire de l'avance", type: 'text', required: true },
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'montant_avance', label: "Montant de l'avance (FCFA)", type: 'text', required: true },
      { key: 'date_validite', label: "Date de validité", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CAUTION DE RESTITUTION D'AVANCE</h1><p><strong>Banque :</strong> {{banque}}</p><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Maître d'ouvrage :</strong> {{maitre_ouvrage}}</p><h3>Article 1 – Engagement</h3><p>La banque garantit la restitution de l'avance de <strong>{{montant_avance}} FCFA</strong> versée au titre du marché.</p><h3>Article 2 – Validité</h3><p>La caution expire le <strong>{{date_validite}}</strong> sauf mainlevée anticipée.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_pret_hypothecaire',
    name: "Accord de service de prêt hypothécaire (immobilier CI)",
    category: 'finance_banque',
    price: 6000, priceMax: 24000,
    description: "Convention de prêt hypothécaire immobilier entre une banque ivoirienne et un particulier ou une entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      { key: 'banque', label: "Banque prêteuse", type: 'text', required: true },
      { key: 'emprunteur', label: "Emprunteur", type: 'text', required: true },
      { key: 'montant', label: "Montant du prêt (FCFA)", type: 'text', required: true },
      { key: 'taux', label: "Taux d'intérêt annuel (%)", type: 'text', required: true },
      { key: 'duree', label: "Durée (mois)", type: 'text', required: true },
      { key: 'bien', label: "Description du bien hypothéqué", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PRÊT HYPOTHÉCAIRE</h1><p><strong>Banque :</strong> {{banque}}</p><p><strong>Emprunteur :</strong> {{emprunteur}}</p><h3>Article 1 – Prêt</h3><p>La banque accorde un prêt de <strong>{{montant}} FCFA</strong> au taux de <strong>{{taux}} % l'an</strong> sur <strong>{{duree}} mois</strong>.</p><h3>Article 2 – Hypothèque</h3><p>En garantie, l'emprunteur constitue une hypothèque de premier rang sur : <strong>{{bien}}</strong>.</p><h3>Article 3 – Remboursement</h3><p>Remboursement par mensualités constantes, tableau d'amortissement annexé.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_micro_credit_imf',
    name: "Accord de service de micro-crédit professionnel (IMF CI)",
    category: 'finance_banque',
    price: 4000, priceMax: 12000,
    description: "Convention de micro-crédit professionnel accordé par une institution de micro-finance agréée en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'imf', label: "Institution de micro-finance (IMF)", type: 'text', required: true },
      { key: 'beneficiaire', label: "Micro-entrepreneur bénéficiaire", type: 'text', required: true },
      { key: 'montant', label: "Montant du micro-crédit (FCFA)", type: 'text', required: true },
      { key: 'taux', label: "Taux d'intérêt mensuel (%)", type: 'text', required: true },
      { key: 'date_remboursement', label: "Date de remboursement final", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MICRO-CRÉDIT PROFESSIONNEL</h1><p><strong>IMF :</strong> {{imf}}</p><p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p><h3>Article 1 – Crédit</h3><p>L'IMF accorde un micro-crédit de <strong>{{montant}} FCFA</strong> au taux mensuel de <strong>{{taux}} %</strong>.</p><h3>Article 2 – Remboursement</h3><p>Le crédit doit être intégralement remboursé au plus tard le <strong>{{date_remboursement}}</strong>.</p><h3>Article 3 – Utilisation</h3><p>Le crédit est affecté exclusivement à l'activité professionnelle du bénéficiaire.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_refinancement_dette',
    name: "Accord de service de refinancement dette (restructuration bancaire)",
    category: 'finance_banque',
    price: 7000, priceMax: 28000,
    description: "Accord de refinancement et de restructuration de la dette bancaire d'une entreprise en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'banque_chef_file', label: "Banque chef de file", type: 'text', required: true },
      { key: 'debiteur', label: "Société débitrice", type: 'text', required: true },
      { key: 'encours', label: "Encours de dette restructurée (FCFA)", type: 'text', required: true },
      { key: 'nouveau_taux', label: "Nouveau taux d'intérêt (%)", type: 'text', required: true },
      { key: 'nouvelle_echeance', label: "Nouvelle date d'échéance finale", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE REFINANCEMENT DE DETTE</h1><h2>RESTRUCTURATION BANCAIRE</h2><p><strong>Banque chef de file :</strong> {{banque_chef_file}}</p><p><strong>Débiteur :</strong> {{debiteur}}</p><h3>Article 1 – Restructuration</h3><p>Les parties conviennent de restructurer un encours de <strong>{{encours}} FCFA</strong> aux nouvelles conditions suivantes.</p><h3>Article 2 – Nouveau taux</h3><p>Taux d'intérêt révisé : <strong>{{nouveau_taux}} %</strong> l'an.</p><h3>Article 3 – Nouvelle échéance</h3><p>L'échéance finale est reportée au <strong>{{nouvelle_echeance}}</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  // ── Marchés financiers BRVM/UEMOA ─────────────────────────────────────────
  {
    code: 'fin2_gestion_portefeuille_brvm',
    name: "Accord de service de gestion de portefeuille BRVM (actions)",
    category: 'finance_banque',
    price: 6000, priceMax: 22000,
    description: "Mandat de gestion de portefeuille d'actions cotées sur la BRVM, confié à une SGI agréée CREPMF.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'sgi', label: "SGI mandataire (agréée CREPMF)", type: 'text', required: true },
      { key: 'client', label: "Client investisseur", type: 'text', required: true },
      { key: 'actif_initial', label: "Actif initial sous gestion (FCFA)", type: 'text', required: true },
      { key: 'profil', label: "Profil de risque (prudent/équilibré/dynamique)", type: 'text', required: true },
      { key: 'date_mandat', label: "Date du mandat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>MANDAT DE GESTION DE PORTEFEUILLE BRVM</h1><h2>ACTIONS COTÉES – UEMOA</h2><p><strong>SGI :</strong> {{sgi}}</p><p><strong>Client :</strong> {{client}}</p><h3>Article 1 – Mandat</h3><p>Le client confie à la SGI la gestion discrétionnaire d'un portefeuille d'actions BRVM d'une valeur initiale de <strong>{{actif_initial}} FCFA</strong>.</p><h3>Article 2 – Profil</h3><p>Profil de risque retenu : <strong>{{profil}}</strong>.</p><h3>Article 3 – Prise d'effet</h3><p>Le mandat prend effet le <strong>{{date_mandat}}</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_gestion_portefeuille_oblig',
    name: "Accord de service de gestion de portefeuille obligataire (bons du Trésor CI)",
    category: 'finance_banque',
    price: 6000, priceMax: 22000,
    description: "Mandat de gestion de portefeuille obligataire incluant bons du Trésor et obligations d'État de la BCEAO/UEMOA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'gestionnaire', label: "Société de gestion", type: 'text', required: true },
      { key: 'client', label: "Investisseur", type: 'text', required: true },
      { key: 'actif', label: "Encours à gérer (FCFA)", type: 'text', required: true },
      { key: 'duration_cible', label: "Duration cible (en années)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de démarrage", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>MANDAT DE GESTION OBLIGATAIRE</h1><h2>BONS DU TRÉSOR – UEMOA</h2><p><strong>Gestionnaire :</strong> {{gestionnaire}}</p><p><strong>Client :</strong> {{client}}</p><h3>Article 1 – Portefeuille</h3><p>Le gestionnaire gère un portefeuille obligataire de <strong>{{actif}} FCFA</strong>, investi principalement en titres d'État UEMOA.</p><h3>Article 2 – Duration</h3><p>La duration cible du portefeuille est de <strong>{{duration_cible}} ans</strong>.</p><h3>Article 3 – Démarrage</h3><p>Mandat en vigueur à compter du <strong>{{date_debut}}</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_introduction_bourse_brvm',
    name: "Accord de service d'introduction en bourse BRVM",
    category: 'finance_banque',
    price: 10000, priceMax: 45000,
    description: "Accord de conseil et d'accompagnement pour l'introduction en bourse d'une société sur la BRVM (Abidjan).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'chef_file', label: "SGI chef de file", type: 'text', required: true },
      { key: 'emetteur', label: "Société émettrice", type: 'text', required: true },
      { key: 'compartiment', label: "Compartiment BRVM visé", type: 'text', required: true },
      { key: 'montant_leve', label: "Montant à lever (FCFA)", type: 'text', required: true },
      { key: 'date_ipo', label: "Date d'introduction prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'INTRODUCTION EN BOURSE BRVM</h1><p><strong>SGI chef de file :</strong> {{chef_file}}</p><p><strong>Émetteur :</strong> {{emetteur}}</p><h3>Article 1 – Objet</h3><p>La SGI accompagne l'émetteur dans son introduction sur le compartiment <strong>{{compartiment}}</strong> de la BRVM, visant à lever <strong>{{montant_leve}} FCFA</strong>.</p><h3>Article 2 – Date</h3><p>L'introduction est prévue le <strong>{{date_ipo}}</strong>.</p><h3>Article 3 – Obligations réglementaires</h3><p>L'émetteur s'engage à respecter les obligations d'information et de gouvernance exigées par le CREPMF.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_emission_actions',
    name: "Accord de service d'émission d'actions (augmentation de capital)",
    category: 'finance_banque',
    price: 8000, priceMax: 32000,
    description: "Accord de placement pour une augmentation de capital par émission d'actions nouvelles sur la BRVM ou hors marché.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'arrangeur', label: "SGI / Banque arrangeur", type: 'text', required: true },
      { key: 'emetteur', label: "Société émettrice", type: 'text', required: true },
      { key: 'nb_actions', label: "Nombre d'actions nouvelles", type: 'text', required: true },
      { key: 'prix_emission', label: "Prix d'émission (FCFA/action)", type: 'text', required: true },
      { key: 'date_cloture', label: "Date de clôture de la souscription", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'ÉMISSION D'ACTIONS</h1><h2>AUGMENTATION DE CAPITAL</h2><p><strong>Arrangeur :</strong> {{arrangeur}}</p><p><strong>Émetteur :</strong> {{emetteur}}</p><h3>Article 1 – Émission</h3><p>L'émetteur émet <strong>{{nb_actions}}</strong> actions nouvelles au prix de <strong>{{prix_emission}} FCFA</strong> par action.</p><h3>Article 2 – Souscription</h3><p>La période de souscription se clôture le <strong>{{date_cloture}}</strong>.</p><h3>Article 3 – Placement</h3><p>L'arrangeur assure le placement des actions auprès des investisseurs institutionnels et du public.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_emission_obligataire',
    name: "Accord de service d'émission obligataire (emprunt obligataire CI)",
    category: 'finance_banque',
    price: 8000, priceMax: 35000,
    description: "Accord de placement pour l'émission d'un emprunt obligataire par une société ou un État membre de l'UEMOA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'arrangeur', label: "Arrangeur / chef de file", type: 'text', required: true },
      { key: 'emetteur', label: "Émetteur (société ou État)", type: 'text', required: true },
      { key: 'montant', label: "Montant de l'emprunt (FCFA)", type: 'text', required: true },
      { key: 'taux_coupon', label: "Taux du coupon (%)", type: 'text', required: true },
      { key: 'date_maturite', label: "Date de maturité", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'ÉMISSION OBLIGATAIRE</h1><h2>EMPRUNT OBLIGATAIRE – UEMOA</h2><p><strong>Arrangeur :</strong> {{arrangeur}}</p><p><strong>Émetteur :</strong> {{emetteur}}</p><h3>Article 1 – Émission</h3><p>L'émetteur émet un emprunt obligataire de <strong>{{montant}} FCFA</strong> à un coupon annuel de <strong>{{taux_coupon}} %</strong>.</p><h3>Article 2 – Maturité</h3><p>Les obligations arrivent à maturité le <strong>{{date_maturite}}</strong>.</p><h3>Article 3 – Placement</h3><p>L'arrangeur assure la structuration et le placement auprès d'investisseurs qualifiés UEMOA.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_tenue_registre_actionnaires',
    name: "Accord de service de tenue de registre des actionnaires",
    category: 'finance_banque',
    price: 4000, priceMax: 14000,
    description: "Convention de tenue de registre des actionnaires et de suivi des mouvements de titres pour une société cotée ou non.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'prestataire', label: "Teneur de registre", type: 'text', required: true },
      { key: 'emetteur', label: "Société émettrice", type: 'text', required: true },
      { key: 'nb_actionnaires', label: "Nombre d'actionnaires estimé", type: 'text', required: true },
      { key: 'date_debut', label: "Date de prise en charge", type: 'date', required: true },
      { key: 'honoraires', label: "Honoraires annuels (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE TENUE DE REGISTRE DES ACTIONNAIRES</h1><p><strong>Teneur de registre :</strong> {{prestataire}}</p><p><strong>Émetteur :</strong> {{emetteur}}</p><h3>Article 1 – Mission</h3><p>Le prestataire tient le registre des actionnaires de la société, pour un effectif estimé de <strong>{{nb_actionnaires}}</strong> actionnaires.</p><h3>Article 2 – Prise en charge</h3><p>La mission débute le <strong>{{date_debut}}</strong>.</p><h3>Article 3 – Honoraires</h3><p>Honoraires annuels : <strong>{{honoraires}} FCFA</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_cif_crepmf',
    name: "Accord de service de conseil en investissements financiers (CIF CREPMF)",
    category: 'finance_banque',
    price: 5000, priceMax: 18000,
    description: "Accord de conseil en investissements financiers délivré par un CIF agréé CREPMF à un investisseur de la zone UEMOA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'cif', label: "Conseiller en investissements (CIF agréé)", type: 'text', required: true },
      { key: 'client', label: "Client investisseur", type: 'text', required: true },
      { key: 'objectif', label: "Objectif d'investissement", type: 'textarea', required: true },
      { key: 'horizon', label: "Horizon de placement", type: 'text', required: true },
      { key: 'honoraires', label: "Honoraires (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSEIL EN INVESTISSEMENTS FINANCIERS</h1><h2>CIF – AGRÉÉ CREPMF</h2><p><strong>CIF :</strong> {{cif}}</p><p><strong>Client :</strong> {{client}}</p><h3>Article 1 – Objet</h3><p>Le CIF délivre des conseils personnalisés en investissements financiers adaptés à l'objectif suivant : <strong>{{objectif}}</strong>.</p><h3>Article 2 – Horizon</h3><p>Horizon de placement retenu : <strong>{{horizon}}</strong>.</p><h3>Article 3 – Honoraires</h3><p>Honoraires : <strong>{{honoraires}} FCFA</strong> HT.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_opcvm_uemoa',
    name: "Accord de service de gestion collective (OPCVM UEMOA)",
    category: 'finance_banque',
    price: 6000, priceMax: 22000,
    description: "Convention de gestion collective d'OPCVM (FCP ou SICAV) agréé par le CREPMF dans l'espace UEMOA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      { key: 'sgc', label: "Société de gestion collective (SGC)", type: 'text', required: true },
      { key: 'opcvm', label: "Dénomination de l'OPCVM", type: 'text', required: true },
      { key: 'type_opcvm', label: "Type (FCP/SICAV)", type: 'text', required: true },
      { key: 'actif_net', label: "Actif net initial (FCFA)", type: 'text', required: true },
      { key: 'date_agrement', label: "Date d'agrément CREPMF", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE GESTION COLLECTIVE</h1><h2>OPCVM – UEMOA / CREPMF</h2><p><strong>SGC :</strong> {{sgc}}</p><p><strong>OPCVM :</strong> {{opcvm}} ({{type_opcvm}})</p><h3>Article 1 – Objet</h3><p>La SGC assure la gestion de l'OPCVM dont l'actif net initial est de <strong>{{actif_net}} FCFA</strong>.</p><h3>Article 2 – Agrément</h3><p>L'OPCVM est agréé par le CREPMF depuis le <strong>{{date_agrement}}</strong>.</p><h3>Article 3 – Politique d'investissement</h3><p>La politique d'investissement est définie dans le prospectus approuvé par le CREPMF.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_teneur_compte_depositaire',
    name: "Accord de service de teneur de compte/dépositaire (BRVM)",
    category: 'finance_banque',
    price: 5000, priceMax: 18000,
    description: "Convention de tenue de compte-titres et de dépositaire pour des valeurs mobilières cotées sur la BRVM.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'depositaire', label: "Établissement dépositaire (SGI/banque)", type: 'text', required: true },
      { key: 'titulaire', label: "Titulaire du compte-titres", type: 'text', required: true },
      { key: 'valeur_portefeuille', label: "Valeur estimée du portefeuille (FCFA)", type: 'text', required: true },
      { key: 'date_ouverture', label: "Date d'ouverture du compte", type: 'date', required: true },
      { key: 'frais', label: "Frais de garde annuels (%)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE TENUE DE COMPTE-TITRES ET DE DÉPOSITAIRE</h1><h2>BRVM / UEMOA</h2><p><strong>Dépositaire :</strong> {{depositaire}}</p><p><strong>Titulaire :</strong> {{titulaire}}</p><h3>Article 1 – Ouverture</h3><p>Le dépositaire ouvre et tient un compte-titres au nom du titulaire à compter du <strong>{{date_ouverture}}</strong>.</p><h3>Article 2 – Portefeuille</h3><p>Valeur estimée du portefeuille : <strong>{{valeur_portefeuille}} FCFA</strong>.</p><h3>Article 3 – Frais</h3><p>Frais de garde annuels : <strong>{{frais}} %</strong> de la valeur du portefeuille.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_negociation_boursiere_sgi',
    name: "Accord de service de négociation boursière (SGI agréée BRVM)",
    category: 'finance_banque',
    price: 4000, priceMax: 14000,
    description: "Convention de service de négociation d'ordres de bourse confié à une SGI agréée sur la BRVM.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'sgi', label: "SGI agréée BRVM", type: 'text', required: true },
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'type_ordres', label: "Type d'ordres (achat/vente/les deux)", type: 'text', required: true },
      { key: 'commission', label: "Commission de négociation (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date d'effet", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE NÉGOCIATION BOURSIÈRE</h1><h2>SGI AGRÉÉE BRVM</h2><p><strong>SGI :</strong> {{sgi}}</p><p><strong>Client :</strong> {{client}}</p><h3>Article 1 – Objet</h3><p>La SGI exécute les ordres de bourse du client ({{type_ordres}}) sur la BRVM, selon les instructions transmises.</p><h3>Article 2 – Commission</h3><p>Commission de négociation : <strong>{{commission}} %</strong> du montant de chaque transaction.</p><h3>Article 3 – Prise d'effet</h3><p>Convention en vigueur à compter du <strong>{{date_debut}}</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  // ── Documents de synthèse ─────────────────────────────────────────────────
  {
    code: 'fin2_analyse_credit_scoring',
    name: "Accord de service d'analyse crédit scoring (banque)",
    category: 'finance_banque',
    price: 5000, priceMax: 18000,
    description: "Accord de mission pour la conception et la mise en œuvre d'un modèle de scoring crédit pour une banque en CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'prestataire', label: "Cabinet de scoring/data", type: 'text', required: true },
      { key: 'banque', label: "Banque cliente", type: 'text', required: true },
      { key: 'segments', label: "Segments de clientèle ciblés", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison du modèle", type: 'date', required: true },
      { key: 'honoraires', label: "Honoraires (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ANALYSE CRÉDIT SCORING</h1><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Banque :</strong> {{banque}}</p><h3>Article 1 – Objet</h3><p>Le prestataire développe un modèle de scoring crédit pour les segments <strong>{{segments}}</strong>.</p><h3>Article 2 – Livraison</h3><p>Le modèle est livré le <strong>{{date_livraison}}</strong>.</p><h3>Article 3 – Honoraires</h3><p>Honoraires : <strong>{{honoraires}} FCFA</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_rapport_solvabilite',
    name: "Accord de service de rapport de solvabilité Coris/BCI",
    category: 'finance_banque',
    price: 4000, priceMax: 14000,
    description: "Accord pour la production d'un rapport de solvabilité et de notation d'une entreprise à destination d'une banque de la place.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'agence', label: "Agence de notation / bureau de crédit", type: 'text', required: true },
      { key: 'entreprise', label: "Entreprise notée", type: 'text', required: true },
      { key: 'banque_destinataire', label: "Banque destinataire du rapport", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
      { key: 'honoraires', label: "Honoraires (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – RAPPORT DE SOLVABILITÉ</h1><p><strong>Agence :</strong> {{agence}}</p><p><strong>Entreprise évaluée :</strong> {{entreprise}}</p><p><strong>Banque destinataire :</strong> {{banque_destinataire}}</p><h3>Article 1 – Objet</h3><p>L'agence produit un rapport de solvabilité complet de l'entreprise, à l'usage exclusif de la banque destinataire.</p><h3>Article 2 – Date</h3><p>Rapport émis le <strong>{{date_rapport}}</strong>.</p><h3>Article 3 – Honoraires</h3><p>Honoraires : <strong>{{honoraires}} FCFA</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_plan_financement_projet',
    name: "Accord de service de plan de financement projet (banque développement)",
    category: 'finance_banque',
    price: 6000, priceMax: 24000,
    description: "Accord de conseil pour l'élaboration d'un plan de financement de projet à soumettre à une banque de développement (BOAD, BEI, AfDB).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'cabinet', label: "Cabinet financier", type: 'text', required: true },
      { key: 'porteur', label: "Porteur de projet", type: 'text', required: true },
      { key: 'banque_dev', label: "Banque de développement visée", type: 'text', required: true },
      { key: 'montant_projet', label: "Coût total du projet (FCFA)", type: 'text', required: true },
      { key: 'date_depot', label: "Date de dépôt du dossier", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PLAN DE FINANCEMENT PROJET</h1><p><strong>Cabinet :</strong> {{cabinet}}</p><p><strong>Porteur :</strong> {{porteur}}</p><p><strong>Banque de développement :</strong> {{banque_dev}}</p><h3>Article 1 – Objet</h3><p>Le cabinet élabore le plan de financement d'un projet d'un coût total de <strong>{{montant_projet}} FCFA</strong>.</p><h3>Article 2 – Dépôt</h3><p>Le dossier est déposé auprès de la banque de développement au plus tard le <strong>{{date_depot}}</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_rapport_roi',
    name: "Accord de service de rapport de rentabilité investissement (ROI)",
    category: 'finance_banque',
    price: 5000, priceMax: 18000,
    description: "Accord de mission pour l'analyse et le reporting de la rentabilité d'un investissement (ROI, TRI, VAN).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      { key: 'cabinet', label: "Cabinet financier", type: 'text', required: true },
      { key: 'client', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'investissement', label: "Description de l'investissement", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
      { key: 'honoraires', label: "Honoraires (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – RAPPORT DE RENTABILITÉ (ROI)</h1><p><strong>Cabinet :</strong> {{cabinet}}</p><p><strong>Client :</strong> {{client}}</p><h3>Article 1 – Investissement analysé</h3><p>{{investissement}}</p><h3>Article 2 – Indicateurs</h3><p>Le rapport inclut le calcul du ROI, du TRI et de la VAN selon les normes financières OHADA.</p><h3>Article 3 – Livrable</h3><p>Rapport remis le <strong>{{date_rapport}}</strong>. Honoraires : <strong>{{honoraires}} FCFA</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_modele_financier_excel',
    name: "Accord de service de modèle financier Excel (LBO, DCF, BP)",
    category: 'finance_banque',
    price: 5000, priceMax: 20000,
    description: "Accord de développement d'un modèle financier Excel sur mesure (LBO, DCF ou Business Plan) pour une entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'developpeur', label: "Développeur / cabinet financier", type: 'text', required: true },
      { key: 'client', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'type_modele', label: "Type de modèle (LBO/DCF/Business Plan)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison", type: 'date', required: true },
      { key: 'honoraires', label: "Honoraires (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MODÈLE FINANCIER EXCEL</h1><p><strong>Développeur :</strong> {{developpeur}}</p><p><strong>Client :</strong> {{client}}</p><h3>Article 1 – Objet</h3><p>Le développeur crée un modèle financier Excel de type <strong>{{type_modele}}</strong> sur mesure pour le client.</p><h3>Article 2 – Livraison</h3><p>Le modèle est livré le <strong>{{date_livraison}}</strong> avec une session de formation incluse.</p><h3>Article 3 – Honoraires</h3><p>Honoraires : <strong>{{honoraires}} FCFA</strong>.</p><p class="signature">Fait à Abidjan, le ............</p><p>Signatures des parties</p></div>` },

  {
    code: 'fin2_rapport_analyse_financiere',
    name: "Rapport d'analyse financière entreprise",
    category: 'finance_banque',
    price: 4000, priceMax: 14000,
    description: "Rapport standardisé d'analyse financière d'une entreprise (bilans, compte de résultat, ratios, recommandations).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      { key: 'analyste', label: "Analyste / cabinet", type: 'text', required: true },
      { key: 'entreprise', label: "Entreprise analysée", type: 'text', required: true },
      { key: 'periode', label: "Période analysée", type: 'text', required: true },
      { key: 'note_globale', label: "Note globale (A/B/C)", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ANALYSE FINANCIÈRE</h1><p><strong>Analyste :</strong> {{analyste}}</p><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Période :</strong> {{periode}}</p><p><strong>Note globale :</strong> {{note_globale}}</p><h2>1. Synthèse exécutive</h2><p>L'analyse des états financiers de la période couverte révèle les tendances et performances ci-après.</p><h2>2. Structure financière</h2><p>Le bilan présente une structure de financement équilibrée. Les ratios de liquidité générale et de solvabilité sont conformes aux normes sectorielles OHADA.</p><h2>3. Rentabilité</h2><p>Le compte de résultat indique une évolution positive de la marge opérationnelle.</p><h2>4. Recommandations</h2><p>Optimiser la gestion du BFR et diversifier les sources de financement.</p><p><em>Rapport établi le <strong>{{date_rapport}}</strong></em></p></div>` },

  {
    code: 'fin2_rapport_tresorerie_mensuel',
    name: "Rapport de gestion de trésorerie mensuel",
    category: 'finance_banque',
    price: 4000, priceMax: 12000,
    description: "Rapport mensuel standardisé de suivi et d'analyse de la trésorerie d'une entreprise (encaissements, décaissements, solde).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise", type: 'text', required: true },
      { key: 'mois', label: "Mois de reporting (ex: Juin 2025)", type: 'text', required: true },
      { key: 'solde_debut', label: "Solde début de période (FCFA)", type: 'text', required: true },
      { key: 'total_encaissements', label: "Total encaissements (FCFA)", type: 'text', required: true },
      { key: 'total_decaissements', label: "Total décaissements (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE GESTION DE TRÉSORERIE MENSUEL</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Mois :</strong> {{mois}}</p><table border="1" style="width:100%;border-collapse:collapse"><tr><th>Indicateur</th><th>Montant (FCFA)</th></tr><tr><td>Solde début de période</td><td>{{solde_debut}}</td></tr><tr><td>Total encaissements</td><td>{{total_encaissements}}</td></tr><tr><td>Total décaissements</td><td>{{total_decaissements}}</td></tr></table><h3>Analyse</h3><p>Le solde de trésorerie en fin de période est conforme aux prévisions budgétaires. Les écarts éventuels sont expliqués en annexe.</p><p><em>Document établi conformément aux normes OHADA.</em></p></div>` },

  {
    code: 'fin2_rapport_performance_brvm',
    name: "Rapport de performance portefeuille BRVM",
    category: 'finance_banque',
    price: 4000, priceMax: 14000,
    description: "Rapport périodique de performance d'un portefeuille d'actions et d'obligations cotés sur la BRVM.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'gestionnaire', label: "SGI gestionnaire", type: 'text', required: true },
      { key: 'client', label: "Investisseur", type: 'text', required: true },
      { key: 'periode', label: "Période de reporting", type: 'text', required: true },
      { key: 'valeur_portefeuille', label: "Valeur du portefeuille (FCFA)", type: 'text', required: true },
      { key: 'performance', label: "Performance sur la période (%)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE PORTEFEUILLE BRVM</h1><p><strong>Gestionnaire :</strong> {{gestionnaire}}</p><p><strong>Client :</strong> {{client}}</p><p><strong>Période :</strong> {{periode}}</p><h2>Synthèse de performance</h2><table border="1" style="width:100%;border-collapse:collapse"><tr><th>Indicateur</th><th>Valeur</th></tr><tr><td>Valeur du portefeuille</td><td>{{valeur_portefeuille}} FCFA</td></tr><tr><td>Performance période</td><td>{{performance}} %</td></tr></table><h3>Commentaires</h3><p>La performance du portefeuille est analysée au regard de l'indice BRVM Composite servant de benchmark. Les positions sont révisées selon les conditions de marché UEMOA.</p></div>` },

  {
    code: 'fin2_plan_financement_pluriannuel',
    name: "Plan de financement pluriannuel entreprise",
    category: 'finance_banque',
    price: 5000, priceMax: 18000,
    description: "Document de plan de financement pluriannuel (3 à 5 ans) d'une entreprise pour ses investissements et son exploitation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise", type: 'text', required: true },
      { key: 'horizon', label: "Horizon du plan (ex: 2025-2029)", type: 'text', required: true },
      { key: 'investissements', label: "Total investissements prévus (FCFA)", type: 'text', required: true },
      { key: 'sources', label: "Sources de financement envisagées", type: 'textarea', required: true },
      { key: 'date_document', label: "Date du document", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE FINANCEMENT PLURIANNUEL</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Horizon :</strong> {{horizon}}</p><h2>1. Programme d'investissements</h2><p>Total des investissements prévus : <strong>{{investissements}} FCFA</strong>.</p><h2>2. Sources de financement</h2><p>{{sources}}</p><h2>3. Équilibre financier</h2><p>Le plan de financement garantit l'équilibre entre les besoins et les ressources sur toute la période, conformément aux exigences des bailleurs de fonds et des banques partenaires.</p><p><em>Document établi le <strong>{{date_document}}</strong></em></p></div>` },

  {
    code: 'fin2_charte_finance_responsable',
    name: "Charte de la finance responsable et de la gouvernance financière en Afrique",
    category: 'finance_banque',
    price: 4000, priceMax: 14000,
    description: "Charte définissant les principes de finance responsable, d'ESG et de bonne gouvernance financière adoptés par une organisation en Afrique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'organisation', label: "Organisation signataire", type: 'text', required: true },
      { key: 'representant', label: "Représentant légal", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption", type: 'date', required: true },
      { key: 'perimetre', label: "Périmètre d'application", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA FINANCE RESPONSABLE</h1><h2>ET DE LA GOUVERNANCE FINANCIÈRE EN AFRIQUE</h2><p><strong>Organisation :</strong> {{organisation}}</p><p><strong>Représentant :</strong> {{representant}}</p><p><strong>Adoptée le :</strong> {{date_adoption}}</p><h3>Préambule</h3><p>Convaincue que la finance doit servir le développement durable de l'Afrique et de ses peuples, l'organisation adopte la présente charte.</p><h3>Article 1 – Périmètre</h3><p>{{perimetre}}</p><h3>Article 2 – Principes ESG</h3><p>L'organisation s'engage à intégrer les critères Environnementaux, Sociaux et de Gouvernance dans toutes ses décisions financières.</p><h3>Article 3 – Transparence</h3><p>Les états financiers sont publiés annuellement et certifiés par un commissaire aux comptes agréé OHADA.</p><h3>Article 4 – Lutte contre la corruption</h3><p>Zéro tolérance pour la corruption, le blanchiment d'argent et le financement du terrorisme, conformément aux directives BCEAO/GIABA.</p><p class="signature">Adoptée et signée par <strong>{{representant}}</strong></p></div>` },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 113b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
