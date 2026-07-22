import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates = [
  // ── FINANCE (fin4_) ──────────────────────────────────────────────────────
  {
    code: 'fin4_balance_comptes',
    name: 'Balance des comptes simplifiée',
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: 'Document de synthèse des soldes débiteurs et créditeurs par compte comptable sur une période donnée.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'entreprise', label: 'Raison sociale', type: 'text', required: true },
      { key: 'periode', label: 'Période comptable', type: 'text', required: true },
      { key: 'devise', label: 'Devise', type: 'text', required: true },
      { key: 'comptes', label: 'Liste des comptes', type: 'textarea', required: true },
    ]),
    body: `<h1>Balance des Comptes Simplifiée</h1>
<p><strong>Entreprise :</strong> {{entreprise}}</p>
<p><strong>Période :</strong> {{periode}} &nbsp;|&nbsp; <strong>Devise :</strong> {{devise}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>N° Compte</th><th>Intitulé</th><th>Débit</th><th>Crédit</th><th>Solde débiteur</th><th>Solde créditeur</th></tr></thead>
  <tbody><tr><td colspan="6">{{comptes}}</td></tr></tbody>
  <tfoot><tr><th colspan="2">TOTAUX</th><th></th><th></th><th></th><th></th></tr></tfoot>
</table>`,
  },
  {
    code: 'fin4_tableau_immobilisations',
    name: 'Tableau des immobilisations',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Tableau récapitulatif des immobilisations corporelles et incorporelles avec dotations aux amortissements.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'entreprise', label: 'Raison sociale', type: 'text', required: true },
      { key: 'exercice', label: 'Exercice fiscal', type: 'text', required: true },
      { key: 'liste_immobilisations', label: 'Détail des immobilisations', type: 'textarea', required: true },
    ]),
    body: `<h1>Tableau des Immobilisations</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Exercice :</strong> {{exercice}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Désignation</th><th>Date acquisition</th><th>Valeur brute</th><th>Amort. cumulés</th><th>Valeur nette</th></tr></thead>
  <tbody><tr><td colspan="5">{{liste_immobilisations}}</td></tr></tbody>
</table>`,
  },
  {
    code: 'fin4_rapprochement_bancaire',
    name: 'État de rapprochement bancaire',
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10000,
    description: "Document permettant de réconcilier le solde comptable de trésorerie avec le relevé bancaire officiel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'entreprise', label: 'Raison sociale', type: 'text', required: true },
      { key: 'banque', label: 'Nom de la banque', type: 'text', required: true },
      { key: 'date_arrete', label: "Date d'arrêté", type: 'date', required: true },
      { key: 'solde_banque', label: 'Solde relevé bancaire', type: 'number', required: true },
      { key: 'solde_comptable', label: 'Solde comptable', type: 'number', required: true },
    ]),
    body: `<h1>État de Rapprochement Bancaire</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Banque :</strong> {{banque}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_arrete}}</p>
<h2>Solde selon relevé bancaire</h2><p>{{solde_banque}}</p>
<h2>Solde selon comptabilité</h2><p>{{solde_comptable}}</p>
<p><em>Différences à justifier et réconcilier ci-dessous.</em></p>`,
  },
  {
    code: 'fin4_declaration_tva_mensuelle',
    name: 'Déclaration TVA mensuelle',
    category: 'commercial_financier',
    price: 4500,
    priceMax: 13000,
    description: "Formulaire de déclaration mensuelle de la Taxe sur la Valeur Ajoutée collectée et déductible.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'contribuable', label: 'Nom du contribuable', type: 'text', required: true },
      { key: 'nif', label: 'Numéro Identification Fiscale', type: 'text', required: true },
      { key: 'mois', label: 'Mois de déclaration', type: 'text', required: true },
      { key: 'tva_collectee', label: 'TVA collectée', type: 'number', required: true },
      { key: 'tva_deductible', label: 'TVA déductible', type: 'number', required: true },
    ]),
    body: `<h1>Déclaration TVA Mensuelle</h1>
<p><strong>Contribuable :</strong> {{contribuable}} &nbsp;|&nbsp; <strong>NIF :</strong> {{nif}} &nbsp;|&nbsp; <strong>Mois :</strong> {{mois}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <tr><td>TVA collectée</td><td>{{tva_collectee}}</td></tr>
  <tr><td>TVA déductible</td><td>{{tva_deductible}}</td></tr>
  <tr><td><strong>TVA nette à payer</strong></td><td><strong>= TVA collectée − TVA déductible</strong></td></tr>
</table>`,
  },
  {
    code: 'fin4_declaration_cnps',
    name: 'Déclaration CNPS',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 14000,
    description: "Déclaration des cotisations sociales patronales et salariales auprès de la Caisse Nationale de Prévoyance Sociale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'employeur', label: 'Nom employeur', type: 'text', required: true },
      { key: 'numero_cnps', label: 'Numéro CNPS', type: 'text', required: true },
      { key: 'trimestre', label: 'Trimestre concerné', type: 'text', required: true },
      { key: 'masse_salariale', label: 'Masse salariale brute', type: 'number', required: true },
    ]),
    body: `<h1>Déclaration CNPS</h1>
<p><strong>Employeur :</strong> {{employeur}} &nbsp;|&nbsp; <strong>N° CNPS :</strong> {{numero_cnps}} &nbsp;|&nbsp; <strong>Trimestre :</strong> {{trimestre}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <tr><td>Masse salariale brute</td><td>{{masse_salariale}}</td></tr>
  <tr><td>Taux patronal (16,75 %)</td><td></td></tr>
  <tr><td>Taux salarial (3,2 %)</td><td></td></tr>
  <tr><td><strong>Total cotisations dues</strong></td><td></td></tr>
</table>`,
  },
  {
    code: 'fin4_acompte_is',
    name: "Acompte sur Impôt sur les Sociétés",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Bordereau de versement d'acompte provisionnel sur l'Impôt sur les Sociétés (IS).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'societe', label: 'Dénomination sociale', type: 'text', required: true },
      { key: 'nif', label: 'NIF', type: 'text', required: true },
      { key: 'exercice', label: 'Exercice de référence', type: 'text', required: true },
      { key: 'montant_acompte', label: "Montant de l'acompte", type: 'number', required: true },
    ]),
    body: `<h1>Bordereau de Versement — Acompte IS</h1>
<p><strong>Société :</strong> {{societe}} &nbsp;|&nbsp; <strong>NIF :</strong> {{nif}} &nbsp;|&nbsp; <strong>Exercice :</strong> {{exercice}}</p>
<p><strong>Montant de l'acompte :</strong> {{montant_acompte}} FCFA</p>
<p>Conformément aux dispositions du Code Général des Impôts, la société déclare verser le présent acompte provisionnel sur l'IS.</p>`,
  },
  {
    code: 'fin4_suivi_creances_clients',
    name: 'Tableau de suivi des créances clients',
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Outil de suivi et de gestion des créances clients par échéance et par niveau de risque.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'date_situation', label: 'Date de situation', type: 'date', required: true },
      { key: 'clients', label: 'Liste des clients débiteurs', type: 'textarea', required: true },
    ]),
    body: `<h1>Tableau de Suivi des Créances Clients</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_situation}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Client</th><th>Facture N°</th><th>Montant</th><th>Échéance</th><th>Retard (jours)</th><th>Statut</th></tr></thead>
  <tbody><tr><td colspan="6">{{clients}}</td></tr></tbody>
</table>`,
  },
  {
    code: 'fin4_suivi_dettes_fournisseurs',
    name: 'Tableau de suivi des dettes fournisseurs',
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Outil de suivi des dettes fournisseurs permettant une gestion optimale de la trésorerie sortante.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'date_situation', label: 'Date de situation', type: 'date', required: true },
      { key: 'fournisseurs', label: 'Liste des fournisseurs créanciers', type: 'textarea', required: true },
    ]),
    body: `<h1>Tableau de Suivi des Dettes Fournisseurs</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_situation}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Fournisseur</th><th>Facture N°</th><th>Montant</th><th>Échéance</th><th>Retard (jours)</th><th>Statut</th></tr></thead>
  <tbody><tr><td colspan="6">{{fournisseurs}}</td></tr></tbody>
</table>`,
  },
  {
    code: 'fin4_plan_remboursement_emprunt',
    name: 'Plan de remboursement emprunt',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Tableau d'amortissement d'emprunt présentant les échéances, intérêts et capital restant dû.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'emprunteur', label: 'Nom emprunteur', type: 'text', required: true },
      { key: 'preteur', label: 'Nom prêteur / banque', type: 'text', required: true },
      { key: 'montant', label: 'Montant emprunté', type: 'number', required: true },
      { key: 'taux', label: "Taux d'intérêt annuel (%)", type: 'number', required: true },
      { key: 'duree', label: 'Durée (mois)', type: 'number', required: true },
    ]),
    body: `<h1>Plan de Remboursement — Emprunt</h1>
<p><strong>Emprunteur :</strong> {{emprunteur}} &nbsp;|&nbsp; <strong>Prêteur :</strong> {{preteur}}</p>
<p><strong>Montant :</strong> {{montant}} FCFA &nbsp;|&nbsp; <strong>Taux :</strong> {{taux}} % &nbsp;|&nbsp; <strong>Durée :</strong> {{duree}} mois</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Échéance</th><th>Date</th><th>Capital</th><th>Intérêts</th><th>Mensualité</th><th>Capital restant dû</th></tr></thead>
  <tbody><tr><td colspan="6"><em>Tableau généré automatiquement</em></td></tr></tbody>
</table>`,
  },
  {
    code: 'fin4_rapport_tresorerie_quotidien',
    name: 'Rapport de trésorerie quotidien',
    category: 'commercial_financier',
    price: 2500,
    priceMax: 7500,
    description: "Rapport journalier présentant les flux de trésorerie, les soldes bancaires et les prévisions immédiates.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      { key: 'solde_ouverture', label: "Solde d'ouverture", type: 'number', required: true },
      { key: 'encaissements', label: 'Total encaissements du jour', type: 'number', required: true },
      { key: 'decaissements', label: 'Total décaissements du jour', type: 'number', required: true },
    ]),
    body: `<h1>Rapport de Trésorerie Quotidien</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_rapport}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="60%">
  <tr><td>Solde d'ouverture</td><td>{{solde_ouverture}}</td></tr>
  <tr><td>+ Encaissements</td><td>{{encaissements}}</td></tr>
  <tr><td>− Décaissements</td><td>{{decaissements}}</td></tr>
  <tr><td><strong>Solde de clôture</strong></td><td><strong>= Calculé</strong></td></tr>
</table>`,
  },
  {
    code: 'fin4_note_synthese_financiere',
    name: 'Note de synthèse financière',
    category: 'commercial_financier',
    price: 8000,
    priceMax: 25000,
    description: "Document de synthèse analysant la situation financière de l'entreprise : rentabilité, liquidité et solvabilité.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'periode', label: 'Période analysée', type: 'text', required: true },
      { key: 'redacteur', label: 'Rédacteur / Analyste', type: 'text', required: true },
      { key: 'synthese', label: 'Synthèse des principaux indicateurs', type: 'textarea', required: true },
      { key: 'recommandations', label: 'Recommandations', type: 'textarea', required: false },
    ]),
    body: `<h1>Note de Synthèse Financière</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Période :</strong> {{periode}}</p>
<p><strong>Rédacteur :</strong> {{redacteur}}</p>
<h2>Synthèse des indicateurs</h2><p>{{synthese}}</p>
<h2>Recommandations</h2><p>{{recommandations}}</p>`,
  },
  {
    code: 'fin4_cahier_caisse',
    name: 'Cahier de caisse',
    category: 'commercial_financier',
    price: 1500,
    priceMax: 4500,
    description: "Registre de caisse enregistrant chronologiquement toutes les entrées et sorties d'espèces.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'caissier', label: 'Nom du caissier', type: 'text', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'solde_initial', label: 'Solde initial', type: 'number', required: true },
    ]),
    body: `<h1>Cahier de Caisse</h1>
<p><strong>Caissier :</strong> {{caissier}} &nbsp;|&nbsp; <strong>Date :</strong> {{date}} &nbsp;|&nbsp; <strong>Solde initial :</strong> {{solde_initial}} FCFA</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Heure</th><th>Libellé</th><th>Entrées</th><th>Sorties</th><th>Solde</th></tr></thead>
  <tbody>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
  </tbody>
</table>`,
  },
  {
    code: 'fin4_journal_achats',
    name: "Journal des achats",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Journal comptable enregistrant toutes les factures d'achats fournisseurs sur une période.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'mois', label: 'Mois concerné', type: 'text', required: true },
    ]),
    body: `<h1>Journal des Achats</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Mois :</strong> {{mois}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Date</th><th>N° Facture</th><th>Fournisseur</th><th>HT</th><th>TVA</th><th>TTC</th><th>Compte</th></tr></thead>
  <tbody>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
  </tbody>
</table>`,
  },
  {
    code: 'fin4_journal_ventes',
    name: 'Journal des ventes',
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Journal comptable enregistrant toutes les factures de ventes clients sur une période.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'mois', label: 'Mois concerné', type: 'text', required: true },
    ]),
    body: `<h1>Journal des Ventes</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Mois :</strong> {{mois}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Date</th><th>N° Facture</th><th>Client</th><th>HT</th><th>TVA</th><th>TTC</th><th>Compte</th></tr></thead>
  <tbody>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
  </tbody>
</table>`,
  },
  {
    code: 'fin4_retenues_source',
    name: 'Déclaration retenues à la source',
    category: 'commercial_financier',
    price: 5500,
    priceMax: 16000,
    description: "Déclaration périodique des retenues à la source opérées sur les honoraires, loyers et autres revenus.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise débitrice', type: 'text', required: true },
      { key: 'nif', label: 'NIF', type: 'text', required: true },
      { key: 'periode', label: 'Période de déclaration', type: 'text', required: true },
      { key: 'beneficiaires', label: 'Détail des bénéficiaires et retenues', type: 'textarea', required: true },
    ]),
    body: `<h1>Déclaration des Retenues à la Source</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>NIF :</strong> {{nif}} &nbsp;|&nbsp; <strong>Période :</strong> {{periode}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Bénéficiaire</th><th>Nature revenus</th><th>Montant brut</th><th>Taux retenue</th><th>Montant retenu</th></tr></thead>
  <tbody><tr><td colspan="5">{{beneficiaires}}</td></tr></tbody>
</table>`,
  },

  // ── COMMERCE (com4_) ─────────────────────────────────────────────────────
  {
    code: 'com4_contrat_commission',
    name: 'Contrat de commission commerciale',
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Contrat définissant la relation entre un commettant et un commissionnaire pour la vente de produits ou services.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'commettant', label: 'Nom du commettant', type: 'text', required: true },
      { key: 'commissionnaire', label: 'Nom du commissionnaire', type: 'text', required: true },
      { key: 'produits', label: 'Produits / services concernés', type: 'textarea', required: true },
      { key: 'taux_commission', label: 'Taux de commission (%)', type: 'number', required: true },
      { key: 'territoire', label: 'Territoire de vente', type: 'text', required: false },
    ]),
    body: `<h1>Contrat de Commission Commerciale</h1>
<p>Entre <strong>{{commettant}}</strong> (le Commettant) et <strong>{{commissionnaire}}</strong> (le Commissionnaire).</p>
<h2>Article 1 — Objet</h2>
<p>Le Commissionnaire est chargé de vendre les produits/services suivants : {{produits}}</p>
<h2>Article 2 — Commission</h2>
<p>Le taux de commission est fixé à <strong>{{taux_commission}} %</strong> du chiffre d'affaires réalisé.</p>
<h2>Article 3 — Territoire</h2>
<p>{{territoire}}</p>`,
  },
  {
    code: 'com4_contrat_courtage',
    name: 'Contrat de courtage',
    category: 'commercial_financier',
    price: 9000,
    priceMax: 27000,
    description: "Contrat par lequel un courtier met en relation des parties en vue de la conclusion d'une transaction.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 54,
    fieldsJson: F([
      { key: 'donneur_ordre', label: "Donneur d'ordre", type: 'text', required: true },
      { key: 'courtier', label: 'Courtier', type: 'text', required: true },
      { key: 'objet_courtage', label: 'Objet du courtage', type: 'textarea', required: true },
      { key: 'honoraires', label: "Honoraires / frais de courtage", type: 'text', required: true },
    ]),
    body: `<h1>Contrat de Courtage</h1>
<p>Entre <strong>{{donneur_ordre}}</strong> (le Donneur d'ordre) et <strong>{{courtier}}</strong> (le Courtier).</p>
<h2>Article 1 — Mission</h2><p>{{objet_courtage}}</p>
<h2>Article 2 — Honoraires</h2><p>{{honoraires}}</p>`,
  },
  {
    code: 'com4_facture_proforma_export',
    name: 'Facture proforma export',
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Document préalable à la facturation définitive, utilisé dans le commerce international pour les douanes et le financement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'exportateur', label: 'Exportateur', type: 'text', required: true },
      { key: 'importateur', label: 'Importateur', type: 'text', required: true },
      { key: 'incoterm', label: 'Incoterm', type: 'text', required: true },
      { key: 'devise', label: 'Devise de facturation', type: 'text', required: true },
      { key: 'marchandises', label: 'Description des marchandises', type: 'textarea', required: true },
    ]),
    body: `<h1>FACTURE PROFORMA</h1>
<p><strong>Exportateur :</strong> {{exportateur}}</p>
<p><strong>Importateur :</strong> {{importateur}}</p>
<p><strong>Incoterm :</strong> {{incoterm}} &nbsp;|&nbsp; <strong>Devise :</strong> {{devise}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Désignation</th><th>Qté</th><th>PU</th><th>Montant</th></tr></thead>
  <tbody><tr><td colspan="4">{{marchandises}}</td></tr></tbody>
</table>`,
  },
  {
    code: 'com4_offre_commerciale',
    name: 'Offre commerciale détaillée',
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10000,
    description: "Document professionnel présentant une offre commerciale complète avec tarification, délais et conditions.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'fournisseur', label: 'Nom du fournisseur', type: 'text', required: true },
      { key: 'client', label: 'Client destinataire', type: 'text', required: true },
      { key: 'reference_offre', label: "Référence de l'offre", type: 'text', required: true },
      { key: 'validite', label: "Durée de validité de l'offre", type: 'text', required: true },
      { key: 'produits_services', label: 'Produits / Services proposés', type: 'textarea', required: true },
    ]),
    body: `<h1>Offre Commerciale</h1>
<p><strong>De :</strong> {{fournisseur}} &nbsp;|&nbsp; <strong>À :</strong> {{client}}</p>
<p><strong>Réf. :</strong> {{reference_offre}} &nbsp;|&nbsp; <strong>Valable jusqu'au :</strong> {{validite}}</p>
<h2>Détail de l'offre</h2>
<p>{{produits_services}}</p>
<p><em>Cette offre est faite sous réserve de disponibilité des produits et d'accord final des parties.</em></p>`,
  },
  {
    code: 'com4_confirmation_commande',
    name: 'Confirmation de commande',
    category: 'commercial_financier',
    price: 2500,
    priceMax: 7500,
    description: "Accusé de réception et confirmation formelle d'une commande client avec récapitulatif des articles commandés.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'vendeur', label: 'Vendeur', type: 'text', required: true },
      { key: 'client', label: 'Client', type: 'text', required: true },
      { key: 'numero_commande', label: 'Numéro de commande', type: 'text', required: true },
      { key: 'date_commande', label: 'Date de la commande', type: 'date', required: true },
      { key: 'articles', label: 'Articles commandés', type: 'textarea', required: true },
    ]),
    body: `<h1>Confirmation de Commande</h1>
<p><strong>Vendeur :</strong> {{vendeur}} &nbsp;|&nbsp; <strong>Client :</strong> {{client}}</p>
<p><strong>Commande N° :</strong> {{numero_commande}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_commande}}</p>
<p>Nous vous confirmons la bonne réception de votre commande portant sur :</p>
<p>{{articles}}</p>`,
  },
  {
    code: 'com4_bon_retour_marchandises',
    name: 'Bon de retour marchandises',
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Document officialisant le retour de marchandises non conformes ou défectueuses au fournisseur.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'client', label: 'Client retournant', type: 'text', required: true },
      { key: 'fournisseur', label: 'Fournisseur destinataire', type: 'text', required: true },
      { key: 'date_retour', label: 'Date du retour', type: 'date', required: true },
      { key: 'motif', label: 'Motif du retour', type: 'textarea', required: true },
      { key: 'articles', label: 'Articles retournés', type: 'textarea', required: true },
    ]),
    body: `<h1>Bon de Retour Marchandises</h1>
<p><strong>Client :</strong> {{client}} &nbsp;|&nbsp; <strong>Fournisseur :</strong> {{fournisseur}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_retour}}</p>
<h2>Motif du retour</h2><p>{{motif}}</p>
<h2>Articles retournés</h2><p>{{articles}}</p>`,
  },
  {
    code: 'com4_avis_expedition',
    name: "Avis d'expédition",
    category: 'commercial_financier',
    price: 1800,
    priceMax: 5400,
    description: "Document informant le client de l'expédition de sa commande avec les détails logistiques.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur', type: 'text', required: true },
      { key: 'destinataire', label: 'Destinataire', type: 'text', required: true },
      { key: 'date_expedition', label: "Date d'expédition", type: 'date', required: true },
      { key: 'transporteur', label: 'Transporteur', type: 'text', required: true },
      { key: 'numero_suivi', label: 'Numéro de suivi', type: 'text', required: false },
      { key: 'contenu', label: 'Contenu du colis', type: 'textarea', required: true },
    ]),
    body: `<h1>Avis d'Expédition</h1>
<p><strong>Expéditeur :</strong> {{expediteur}} &nbsp;|&nbsp; <strong>Destinataire :</strong> {{destinataire}}</p>
<p><strong>Date :</strong> {{date_expedition}} &nbsp;|&nbsp; <strong>Transporteur :</strong> {{transporteur}} &nbsp;|&nbsp; <strong>Suivi :</strong> {{numero_suivi}}</p>
<h2>Contenu</h2><p>{{contenu}}</p>`,
  },
  {
    code: 'com4_attestation_conformite_marchandises',
    name: 'Attestation de conformité marchandises',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Attestation certifiant que les marchandises livrées sont conformes aux spécifications contractuelles.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'fournisseur', label: 'Fournisseur', type: 'text', required: true },
      { key: 'client', label: 'Client / Acheteur', type: 'text', required: true },
      { key: 'date_livraison', label: 'Date de livraison', type: 'date', required: true },
      { key: 'description_marchandises', label: 'Description des marchandises', type: 'textarea', required: true },
      { key: 'specifications', label: 'Spécifications de référence', type: 'textarea', required: true },
    ]),
    body: `<h1>Attestation de Conformité des Marchandises</h1>
<p>Je soussigné(e), représentant de <strong>{{fournisseur}}</strong>, certifie que les marchandises livrées à <strong>{{client}}</strong> le <strong>{{date_livraison}}</strong> sont conformes aux spécifications contractuelles.</p>
<h2>Marchandises concernées</h2><p>{{description_marchandises}}</p>
<h2>Spécifications de référence</h2><p>{{specifications}}</p>`,
  },
  {
    code: 'com4_certificat_garantie_produit',
    name: 'Certificat de garantie produit',
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Certificat de garantie remis à l'acheteur précisant les conditions et la durée de la garantie produit.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'fabricant', label: 'Fabricant / Vendeur', type: 'text', required: true },
      { key: 'acheteur', label: 'Acheteur', type: 'text', required: true },
      { key: 'produit', label: 'Désignation du produit', type: 'text', required: true },
      { key: 'numero_serie', label: 'Numéro de série', type: 'text', required: false },
      { key: 'date_achat', label: "Date d'achat", type: 'date', required: true },
      { key: 'duree_garantie', label: 'Durée de garantie', type: 'text', required: true },
    ]),
    body: `<h1>Certificat de Garantie</h1>
<p><strong>Fabricant :</strong> {{fabricant}} &nbsp;|&nbsp; <strong>Acheteur :</strong> {{acheteur}}</p>
<p><strong>Produit :</strong> {{produit}} &nbsp;|&nbsp; <strong>N° série :</strong> {{numero_serie}}</p>
<p><strong>Date d'achat :</strong> {{date_achat}} &nbsp;|&nbsp; <strong>Garantie :</strong> {{duree_garantie}}</p>
<p>Ce certificat garantit le bon fonctionnement du produit pour les défauts de fabrication pendant la période indiquée.</p>`,
  },
  {
    code: 'com4_contrat_maintenance_materiel',
    name: 'Contrat de maintenance matériel',
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Contrat encadrant les prestations de maintenance préventive et curative sur un parc de matériels.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire de maintenance', type: 'text', required: true },
      { key: 'client', label: 'Client', type: 'text', required: true },
      { key: 'materiel', label: 'Matériel concerné', type: 'textarea', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'montant_annuel', label: 'Montant annuel de maintenance', type: 'number', required: true },
    ]),
    body: `<h1>Contrat de Maintenance Matériel</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong></p>
<h2>Article 1 — Matériel couvert</h2><p>{{materiel}}</p>
<h2>Article 2 — Durée</h2><p>{{duree_contrat}}</p>
<h2>Article 3 — Tarification</h2><p>Montant annuel : <strong>{{montant_annuel}} FCFA</strong></p>`,
  },
  {
    code: 'com4_accord_partenariat_commercial',
    name: 'Accord de partenariat commercial',
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Convention de partenariat définissant les modalités d'une collaboration commerciale entre deux entités.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'partenaire_a', label: 'Partenaire A', type: 'text', required: true },
      { key: 'partenaire_b', label: 'Partenaire B', type: 'text', required: true },
      { key: 'objet', label: 'Objet du partenariat', type: 'textarea', required: true },
      { key: 'engagements', label: 'Engagements réciproques', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée du partenariat', type: 'text', required: true },
    ]),
    body: `<h1>Accord de Partenariat Commercial</h1>
<p>Entre <strong>{{partenaire_a}}</strong> et <strong>{{partenaire_b}}</strong></p>
<h2>Article 1 — Objet</h2><p>{{objet}}</p>
<h2>Article 2 — Engagements</h2><p>{{engagements}}</p>
<h2>Article 3 — Durée</h2><p>{{duree}}</p>`,
  },
  {
    code: 'com4_lettre_reclamation_client',
    name: 'Lettre de réclamation client',
    category: 'commercial_financier',
    price: 1500,
    priceMax: 4500,
    description: "Modèle de lettre formelle permettant à un client d'exprimer une réclamation auprès d'un fournisseur.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'client', label: 'Nom du client', type: 'text', required: true },
      { key: 'fournisseur', label: 'Nom du fournisseur', type: 'text', required: true },
      { key: 'date_lettre', label: 'Date', type: 'date', required: true },
      { key: 'objet_reclamation', label: 'Objet de la réclamation', type: 'text', required: true },
      { key: 'description', label: 'Description du problème', type: 'textarea', required: true },
    ]),
    body: `<p style="text-align:right">{{client}}<br>{{date_lettre}}</p>
<p><strong>À :</strong> {{fournisseur}}</p>
<p><strong>Objet :</strong> Réclamation — {{objet_reclamation}}</p>
<p>Madame, Monsieur,</p>
<p>{{description}}</p>
<p>Nous vous demandons de bien vouloir prendre les mesures nécessaires dans les meilleurs délais.</p>
<p>Veuillez agréer nos salutations distinguées.</p>`,
  },
  {
    code: 'com4_reponse_reclamation',
    name: 'Lettre de réponse à réclamation',
    category: 'commercial_financier',
    price: 1500,
    priceMax: 4500,
    description: "Modèle de réponse formelle d'un fournisseur à la suite d'une réclamation client.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'fournisseur', label: 'Nom du fournisseur', type: 'text', required: true },
      { key: 'client', label: 'Client réclamant', type: 'text', required: true },
      { key: 'date_reponse', label: 'Date de la réponse', type: 'date', required: true },
      { key: 'reference_reclamation', label: 'Référence de la réclamation', type: 'text', required: false },
      { key: 'reponse', label: 'Contenu de la réponse', type: 'textarea', required: true },
    ]),
    body: `<p style="text-align:right">{{fournisseur}}<br>{{date_reponse}}</p>
<p><strong>À :</strong> {{client}}</p>
<p><strong>Réf. :</strong> {{reference_reclamation}}</p>
<p>Madame, Monsieur,</p>
<p>Nous accusons réception de votre réclamation et vous apportons la réponse suivante :</p>
<p>{{reponse}}</p>
<p>Veuillez agréer nos salutations distinguées.</p>`,
  },
  {
    code: 'com4_cgv',
    name: 'Conditions générales de vente',
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Document contractuel définissant les règles et conditions applicables à toutes les ventes réalisées par l'entreprise.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 83,
    fieldsJson: F([
      { key: 'vendeur', label: 'Vendeur / Prestataire', type: 'text', required: true },
      { key: 'siege_social', label: 'Siège social', type: 'text', required: true },
      { key: 'rccm', label: 'N° RCCM', type: 'text', required: false },
      { key: 'domaine_activite', label: "Domaine d'activité", type: 'text', required: true },
    ]),
    body: `<h1>Conditions Générales de Vente</h1>
<p><strong>Vendeur :</strong> {{vendeur}} — {{siege_social}} — RCCM : {{rccm}}</p>
<h2>Article 1 — Champ d'application</h2>
<p>Les présentes CGV s'appliquent à toutes les ventes de {{domaine_activite}} conclues par {{vendeur}}.</p>
<h2>Article 2 — Prix</h2>
<p>Les prix sont indiqués en FCFA TTC. Ils peuvent être modifiés à tout moment.</p>
<h2>Article 3 — Paiement</h2>
<p>Le paiement est exigible à la commande, sauf accord contraire.</p>
<h2>Article 4 — Livraison</h2>
<p>Les délais de livraison sont donnés à titre indicatif.</p>
<h2>Article 5 — Garantie</h2>
<p>Conformément à la loi, le vendeur est tenu à la garantie légale.</p>`,
  },
  {
    code: 'com4_cga',
    name: "Conditions générales d'achat",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Document fixant les conditions dans lesquelles l'entreprise achète des biens et services auprès de ses fournisseurs.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'acheteur', label: 'Acheteur', type: 'text', required: true },
      { key: 'siege_social', label: 'Siège social', type: 'text', required: true },
      { key: 'secteur', label: "Secteur d'activité", type: 'text', required: true },
    ]),
    body: `<h1>Conditions Générales d'Achat</h1>
<p><strong>Acheteur :</strong> {{acheteur}} — {{siege_social}}</p>
<h2>Article 1 — Objet</h2>
<p>Les présentes CGA régissent les relations entre {{acheteur}} et ses fournisseurs dans le secteur {{secteur}}.</p>
<h2>Article 2 — Commandes</h2>
<p>Toute commande doit faire l'objet d'un bon de commande signé par un représentant habilité.</p>
<h2>Article 3 — Facturation</h2>
<p>Les factures doivent mentionner le numéro de bon de commande correspondant.</p>
<h2>Article 4 — Paiement</h2>
<p>Le règlement s'effectue à 30 jours fin de mois sauf stipulation contraire.</p>`,
  },

  // ── RH AVANCÉ (rh3_) ─────────────────────────────────────────────────────
  {
    code: 'rh3_politique_teletravail',
    name: 'Politique de télétravail',
    category: 'rh_emploi',
    price: 8000,
    priceMax: 24000,
    description: "Document définissant les règles, conditions et modalités du télétravail au sein de l'entreprise.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 79,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'date_entree_vigueur', label: "Date d'entrée en vigueur", type: 'date', required: true },
      { key: 'jours_max', label: 'Nombre maximum de jours de télétravail par semaine', type: 'number', required: true },
    ]),
    body: `<h1>Politique de Télétravail</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>En vigueur le :</strong> {{date_entree_vigueur}}</p>
<h2>Article 1 — Objet</h2>
<p>La présente politique définit les conditions de recours au télétravail.</p>
<h2>Article 2 — Modalités</h2>
<p>Le télétravail est autorisé dans la limite de {{jours_max}} jour(s) par semaine.</p>
<h2>Article 3 — Équipements</h2>
<p>L'entreprise met à disposition les outils nécessaires à l'exercice du télétravail.</p>
<h2>Article 4 — Confidentialité</h2>
<p>Le salarié s'engage à respecter les règles de confidentialité en vigueur.</p>`,
  },
  {
    code: 'rh3_charte_ethique',
    name: "Charte éthique entreprise",
    category: 'rh_emploi',
    price: 10000,
    priceMax: 30000,
    description: "Charte définissant les valeurs, principes éthiques et comportements attendus de tous les collaborateurs.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'direction', label: 'Direction générale', type: 'text', required: true },
      { key: 'valeurs', label: "Valeurs fondamentales de l'entreprise", type: 'textarea', required: true },
    ]),
    body: `<h1>Charte Éthique</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Direction :</strong> {{direction}}</p>
<h2>Nos valeurs</h2><p>{{valeurs}}</p>
<h2>Principes de conduite</h2>
<ul>
  <li>Intégrité et transparence dans toutes les actions</li>
  <li>Respect des personnes et de la diversité</li>
  <li>Responsabilité individuelle et collective</li>
  <li>Lutte contre toute forme de corruption</li>
</ul>`,
  },
  {
    code: 'rh3_procedure_recrutement',
    name: 'Procédure de recrutement',
    category: 'rh_emploi',
    price: 7000,
    priceMax: 21000,
    description: "Document décrivant les étapes officielles du processus de recrutement de l'identification du besoin à l'intégration.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'responsable_rh', label: 'Responsable RH', type: 'text', required: true },
      { key: 'date_version', label: 'Date de la version', type: 'date', required: true },
    ]),
    body: `<h1>Procédure de Recrutement</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>RH :</strong> {{responsable_rh}} &nbsp;|&nbsp; <strong>Version du :</strong> {{date_version}}</p>
<h2>Étape 1 — Identification du besoin</h2><p>Le manager identifie le besoin et établit une fiche de poste.</p>
<h2>Étape 2 — Publication de l'offre</h2><p>La DRH publie l'offre sur les canaux appropriés.</p>
<h2>Étape 3 — Présélection des candidatures</h2><p>Analyse des CV et lettres de motivation.</p>
<h2>Étape 4 — Entretiens</h2><p>Conduite des entretiens selon le guide d'entretien en vigueur.</p>
<h2>Étape 5 — Décision et intégration</h2><p>Validation de la décision et mise en place du parcours d'intégration.</p>`,
  },
  {
    code: 'rh3_guide_entretien_recrutement',
    name: 'Guide entretien de recrutement',
    category: 'rh_emploi',
    price: 5000,
    priceMax: 15000,
    description: "Guide structuré aidant les recruteurs à conduire des entretiens d'embauche objectifs et standardisés.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'poste', label: 'Poste à pourvoir', type: 'text', required: true },
      { key: 'recruteur', label: 'Recruteur', type: 'text', required: true },
      { key: 'date_entretien', label: "Date de l'entretien", type: 'date', required: true },
      { key: 'candidat', label: 'Nom du candidat', type: 'text', required: true },
    ]),
    body: `<h1>Guide d'Entretien de Recrutement</h1>
<p><strong>Poste :</strong> {{poste}} &nbsp;|&nbsp; <strong>Recruteur :</strong> {{recruteur}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_entretien}} &nbsp;|&nbsp; <strong>Candidat :</strong> {{candidat}}</p>
<h2>Questions d'ouverture</h2>
<ul><li>Pouvez-vous vous présenter brièvement ?</li><li>Quelles sont vos motivations pour ce poste ?</li></ul>
<h2>Questions techniques</h2>
<ul><li>Décrivez une situation professionnelle difficile et comment vous l'avez résolue.</li></ul>
<h2>Questions comportementales</h2>
<ul><li>Comment travaillez-vous en équipe ?</li><li>Quelles sont vos attentes salariales ?</li></ul>`,
  },
  {
    code: 'rh3_suivi_absences',
    name: 'Tableau de suivi des absences',
    category: 'rh_emploi',
    price: 3000,
    priceMax: 9000,
    description: "Outil de suivi et de gestion des absences du personnel par type, durée et service.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'mois', label: 'Mois / Période', type: 'text', required: true },
      { key: 'responsable', label: 'Responsable RH', type: 'text', required: true },
    ]),
    body: `<h1>Tableau de Suivi des Absences</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Période :</strong> {{mois}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{responsable}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Employé</th><th>Service</th><th>Type absence</th><th>Du</th><th>Au</th><th>Jours</th><th>Justificatif</th></tr></thead>
  <tbody>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
  </tbody>
</table>`,
  },
  {
    code: 'rh3_note_service_rh',
    name: 'Note de service RH',
    category: 'rh_emploi',
    price: 1200,
    priceMax: 3600,
    description: "Modèle de note de service destiné au département RH pour communiquer des informations ou des décisions au personnel.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'emetteur', label: 'Émetteur', type: 'text', required: true },
      { key: 'destinataires', label: 'Destinataires', type: 'text', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'objet', label: 'Objet de la note', type: 'text', required: true },
      { key: 'corps', label: 'Corps de la note', type: 'textarea', required: true },
    ]),
    body: `<h1>NOTE DE SERVICE</h1>
<p><strong>De :</strong> {{emetteur}} &nbsp;|&nbsp; <strong>À :</strong> {{destinataires}}</p>
<p><strong>Date :</strong> {{date}} &nbsp;|&nbsp; <strong>Objet :</strong> {{objet}}</p>
<hr>
<p>{{corps}}</p>`,
  },
  {
    code: 'rh3_signalement_harcelement',
    name: 'Fiche de signalement harcèlement',
    category: 'rh_emploi',
    price: 4000,
    priceMax: 12000,
    description: "Formulaire confidentiel permettant à un salarié de signaler une situation de harcèlement moral ou sexuel.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'signalant', label: 'Nom du signalant (optionnel)', type: 'text', required: false },
      { key: 'date_signalement', label: 'Date du signalement', type: 'date', required: true },
      { key: 'description_faits', label: 'Description des faits', type: 'textarea', required: true },
      { key: 'temoins', label: 'Témoins éventuels', type: 'textarea', required: false },
    ]),
    body: `<h1>Fiche de Signalement — Harcèlement</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_signalement}}</p>
<p><strong>Signalant :</strong> {{signalant}} <em>(Informations confidentielles)</em></p>
<h2>Description des faits</h2><p>{{description_faits}}</p>
<h2>Témoins</h2><p>{{temoins}}</p>
<p><em>Cette fiche est traitée en toute confidentialité par la Direction des Ressources Humaines.</em></p>`,
  },
  {
    code: 'rh3_procedure_mediation',
    name: 'Procédure de médiation interne',
    category: 'rh_emploi',
    price: 6000,
    priceMax: 18000,
    description: "Cadre procédural pour la résolution amiable des conflits internes par le biais de la médiation.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'mediateur', label: 'Médiateur désigné', type: 'text', required: true },
      { key: 'date_procedure', label: 'Date de la procédure', type: 'date', required: true },
      { key: 'parties', label: 'Parties impliquées', type: 'textarea', required: true },
    ]),
    body: `<h1>Procédure de Médiation Interne</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Médiateur :</strong> {{mediateur}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_procedure}}</p>
<h2>Parties impliquées</h2><p>{{parties}}</p>
<h2>Étapes de la médiation</h2>
<ol>
  <li>Prise de contact et accord sur la médiation</li>
  <li>Réunion préliminaire individuelle avec chaque partie</li>
  <li>Séance de médiation commune</li>
  <li>Rédaction et signature de l'accord de médiation</li>
</ol>`,
  },
  {
    code: 'rh3_accord_temps_travail',
    name: 'Accord entreprise sur le temps de travail',
    category: 'rh_emploi',
    price: 12000,
    priceMax: 36000,
    description: "Accord collectif organisant le temps de travail, les horaires et les heures supplémentaires au sein de l'entreprise.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'syndicats', label: "Organisations syndicales signataires", type: 'textarea', required: true },
      { key: 'duree_hebdo', label: 'Durée hebdomadaire (heures)', type: 'number', required: true },
      { key: 'date_entree_vigueur', label: "Date d'entrée en vigueur", type: 'date', required: true },
    ]),
    body: `<h1>Accord d'Entreprise sur le Temps de Travail</h1>
<p>Entre <strong>{{entreprise}}</strong> et les organisations syndicales suivantes : {{syndicats}}</p>
<h2>Article 1 — Durée du travail</h2>
<p>La durée hebdomadaire de travail est fixée à <strong>{{duree_hebdo}} heures</strong>.</p>
<h2>Article 2 — Heures supplémentaires</h2>
<p>Toute heure effectuée au-delà de la durée légale est une heure supplémentaire soumise à majoration.</p>
<h2>Article 3 — Entrée en vigueur</h2>
<p>Le présent accord entre en vigueur le <strong>{{date_entree_vigueur}}</strong>.</p>`,
  },
  {
    code: 'rh3_plan_developpement_individuel',
    name: 'Plan de développement individuel',
    category: 'rh_emploi',
    price: 4000,
    priceMax: 12000,
    description: "Outil RH permettant de planifier le développement des compétences d'un collaborateur sur une période donnée.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'collaborateur', label: 'Nom du collaborateur', type: 'text', required: true },
      { key: 'poste', label: 'Poste occupé', type: 'text', required: true },
      { key: 'manager', label: 'Manager / Responsable', type: 'text', required: true },
      { key: 'periode', label: 'Période du plan', type: 'text', required: true },
      { key: 'objectifs', label: 'Objectifs de développement', type: 'textarea', required: true },
      { key: 'actions', label: "Actions à mettre en œuvre", type: 'textarea', required: true },
    ]),
    body: `<h1>Plan de Développement Individuel</h1>
<p><strong>Collaborateur :</strong> {{collaborateur}} &nbsp;|&nbsp; <strong>Poste :</strong> {{poste}} &nbsp;|&nbsp; <strong>Manager :</strong> {{manager}}</p>
<p><strong>Période :</strong> {{periode}}</p>
<h2>Objectifs de développement</h2><p>{{objectifs}}</p>
<h2>Plan d'actions</h2><p>{{actions}}</p>`,
  },

  // ── SECRÉTARIAT / FORMULAIRES (sec_) ─────────────────────────────────────
  {
    code: 'sec_repertoire_telephonique',
    name: 'Répertoire téléphonique officiel',
    category: 'juridique_admin',
    price: 1500,
    priceMax: 4500,
    description: "Annuaire téléphonique interne recensant les contacts officiels de l'organisation par service.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation', type: 'text', required: true },
      { key: 'date_maj', label: 'Date de mise à jour', type: 'date', required: true },
      { key: 'responsable', label: 'Responsable du répertoire', type: 'text', required: true },
    ]),
    body: `<h1>Répertoire Téléphonique Officiel</h1>
<p><strong>Organisation :</strong> {{organisation}} &nbsp;|&nbsp; <strong>Mis à jour le :</strong> {{date_maj}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{responsable}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Service / Direction</th><th>Nom & Prénom</th><th>Fonction</th><th>Téléphone fixe</th><th>Mobile</th><th>Email</th></tr></thead>
  <tbody>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
  </tbody>
</table>`,
  },
  {
    code: 'sec_registre_deliberations',
    name: 'Registre des délibérations',
    category: 'juridique_admin',
    price: 6000,
    priceMax: 18000,
    description: "Registre officiel consignant les délibérations et décisions des organes délibérants d'une organisation.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation', type: 'text', required: true },
      { key: 'organe', label: 'Organe délibérant', type: 'text', required: true },
      { key: 'date_seance', label: 'Date de la séance', type: 'date', required: true },
      { key: 'president_seance', label: 'Président de séance', type: 'text', required: true },
      { key: 'ordre_du_jour', label: "Ordre du jour", type: 'textarea', required: true },
      { key: 'deliberations', label: 'Délibérations adoptées', type: 'textarea', required: true },
    ]),
    body: `<h1>Registre des Délibérations</h1>
<p><strong>Organisation :</strong> {{organisation}} &nbsp;|&nbsp; <strong>Organe :</strong> {{organe}}</p>
<p><strong>Date :</strong> {{date_seance}} &nbsp;|&nbsp; <strong>Président :</strong> {{president_seance}}</p>
<h2>Ordre du jour</h2><p>{{ordre_du_jour}}</p>
<h2>Délibérations</h2><p>{{deliberations}}</p>`,
  },
  {
    code: 'sec_gestion_fournitures',
    name: 'Fiche de gestion des fournitures',
    category: 'juridique_admin',
    price: 1200,
    priceMax: 3600,
    description: "Fiche de suivi des stocks de fournitures de bureau permettant de gérer les entrées, sorties et commandes.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'service', label: 'Service gestionnaire', type: 'text', required: true },
      { key: 'responsable', label: 'Responsable', type: 'text', required: true },
      { key: 'periode', label: 'Période', type: 'text', required: true },
    ]),
    body: `<h1>Fiche de Gestion des Fournitures</h1>
<p><strong>Service :</strong> {{service}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{responsable}} &nbsp;|&nbsp; <strong>Période :</strong> {{periode}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Article</th><th>Référence</th><th>Stock initial</th><th>Entrées</th><th>Sorties</th><th>Stock final</th><th>Seuil alerte</th></tr></thead>
  <tbody>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
  </tbody>
</table>`,
  },
  {
    code: 'sec_planning_reunions',
    name: 'Planning de réunions mensuelles',
    category: 'juridique_admin',
    price: 1000,
    priceMax: 3000,
    description: "Calendrier mensuel des réunions planifiées par service ou direction avec les participants et ordres du jour.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation', type: 'text', required: true },
      { key: 'mois', label: 'Mois concerné', type: 'text', required: true },
    ]),
    body: `<h1>Planning de Réunions — {{mois}}</h1>
<p><strong>Organisation :</strong> {{organisation}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Date</th><th>Heure</th><th>Intitulé réunion</th><th>Lieu / Salle</th><th>Organisateur</th><th>Participants</th></tr></thead>
  <tbody>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
  </tbody>
</table>`,
  },
  {
    code: 'sec_demande_conge',
    name: 'Formulaire de demande de congé',
    category: 'juridique_admin',
    price: 800,
    priceMax: 2400,
    description: "Formulaire standardisé permettant à un employé de soumettre une demande de congé à son responsable.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 90,
    fieldsJson: F([
      { key: 'employe', label: 'Nom et prénom', type: 'text', required: true },
      { key: 'service', label: 'Service', type: 'text', required: true },
      { key: 'type_conge', label: 'Type de congé', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { key: 'motif', label: 'Motif (facultatif)', type: 'text', required: false },
    ]),
    body: `<h1>Demande de Congé</h1>
<p><strong>Employé :</strong> {{employe}} &nbsp;|&nbsp; <strong>Service :</strong> {{service}}</p>
<p><strong>Type :</strong> {{type_conge}} &nbsp;|&nbsp; <strong>Du :</strong> {{date_debut}} &nbsp;|&nbsp; <strong>Au :</strong> {{date_fin}}</p>
<p><strong>Motif :</strong> {{motif}}</p>
<br>
<table width="100%"><tr>
  <td><strong>Signature employé :</strong><br><br>___________________</td>
  <td><strong>Avis responsable :</strong> ☐ Accordé &nbsp;&nbsp; ☐ Refusé<br><br>___________________</td>
</tr></table>`,
  },
  {
    code: 'sec_formulaire_reclamation',
    name: 'Formulaire de réclamation',
    category: 'juridique_admin',
    price: 1000,
    priceMax: 3000,
    description: "Formulaire officiel permettant à toute personne de déposer une réclamation auprès d'une organisation.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation destinataire', type: 'text', required: true },
      { key: 'reclamant', label: 'Nom du réclamant', type: 'text', required: true },
      { key: 'contact', label: 'Contact (téléphone / email)', type: 'text', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'objet', label: 'Objet de la réclamation', type: 'text', required: true },
      { key: 'description', label: 'Description détaillée', type: 'textarea', required: true },
    ]),
    body: `<h1>Formulaire de Réclamation</h1>
<p><strong>Destinataire :</strong> {{organisation}}</p>
<p><strong>Réclamant :</strong> {{reclamant}} &nbsp;|&nbsp; <strong>Contact :</strong> {{contact}} &nbsp;|&nbsp; <strong>Date :</strong> {{date}}</p>
<p><strong>Objet :</strong> {{objet}}</p>
<h2>Description</h2><p>{{description}}</p>
<br><p>Signature du réclamant : ___________________</p>`,
  },
  {
    code: 'sec_questionnaire_satisfaction',
    name: 'Questionnaire de satisfaction client',
    category: 'juridique_admin',
    price: 1500,
    priceMax: 4500,
    description: "Questionnaire structuré pour mesurer la satisfaction des clients sur les produits et services.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 81,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'periode_enquete', label: "Période de l'enquête", type: 'text', required: true },
    ]),
    body: `<h1>Questionnaire de Satisfaction Client</h1>
<p><strong>Entreprise :</strong> {{entreprise}} &nbsp;|&nbsp; <strong>Enquête :</strong> {{periode_enquete}}</p>
<p><em>Veuillez noter chaque aspect de 1 (très insatisfait) à 5 (très satisfait).</em></p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Critère</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>Commentaire</th></tr></thead>
  <tbody>
    <tr><td>Qualité des produits/services</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td></td></tr>
    <tr><td>Délai de livraison</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td></td></tr>
    <tr><td>Accueil et service client</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td></td></tr>
    <tr><td>Rapport qualité/prix</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td></td></tr>
  </tbody>
</table>`,
  },
  {
    code: 'sec_inscription_formation',
    name: 'Fiche inscription formation',
    category: 'juridique_admin',
    price: 1000,
    priceMax: 3000,
    description: "Formulaire d'inscription à une formation professionnelle interne ou externe.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'organisme', label: 'Organisme / Service formation', type: 'text', required: true },
      { key: 'intitule_formation', label: 'Intitulé de la formation', type: 'text', required: true },
      { key: 'dates_formation', label: 'Dates de la formation', type: 'text', required: true },
      { key: 'participant', label: 'Nom du participant', type: 'text', required: true },
      { key: 'service', label: 'Service / Département', type: 'text', required: true },
      { key: 'telephone', label: 'Téléphone / Email', type: 'text', required: true },
    ]),
    body: `<h1>Fiche d'Inscription à une Formation</h1>
<p><strong>Organisme :</strong> {{organisme}}</p>
<p><strong>Formation :</strong> {{intitule_formation}} &nbsp;|&nbsp; <strong>Dates :</strong> {{dates_formation}}</p>
<p><strong>Participant :</strong> {{participant}} &nbsp;|&nbsp; <strong>Service :</strong> {{service}} &nbsp;|&nbsp; <strong>Contact :</strong> {{telephone}}</p>
<br><table width="100%"><tr>
  <td><strong>Signature participant :</strong><br><br>___________________</td>
  <td><strong>Visa responsable :</strong><br><br>___________________</td>
</tr></table>`,
  },
  {
    code: 'sec_accueil_visiteur',
    name: "Formulaire d'accueil visiteur",
    category: 'juridique_admin',
    price: 800,
    priceMax: 2400,
    description: "Registre et formulaire d'enregistrement des visiteurs à l'entrée d'une organisation.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation hôte', type: 'text', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
    ]),
    body: `<h1>Registre des Visiteurs</h1>
<p><strong>Organisation :</strong> {{organisation}} &nbsp;|&nbsp; <strong>Date :</strong> {{date}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>N°</th><th>Nom visiteur</th><th>Société</th><th>Personne visitée</th><th>Heure arrivée</th><th>Heure départ</th><th>Signature</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>2</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>3</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
  </tbody>
</table>`,
  },
  {
    code: 'sec_evaluation_fournisseur',
    name: 'Fiche évaluation fournisseur',
    category: 'juridique_admin',
    price: 2000,
    priceMax: 6000,
    description: "Grille d'évaluation périodique des fournisseurs selon des critères de qualité, délai, prix et service.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'acheteur', label: 'Organisation acheteuse', type: 'text', required: true },
      { key: 'fournisseur', label: 'Fournisseur évalué', type: 'text', required: true },
      { key: 'periode', label: "Période d'évaluation", type: 'text', required: true },
      { key: 'evaluateur', label: 'Évaluateur', type: 'text', required: true },
    ]),
    body: `<h1>Fiche d'Évaluation Fournisseur</h1>
<p><strong>Acheteur :</strong> {{acheteur}} &nbsp;|&nbsp; <strong>Fournisseur :</strong> {{fournisseur}}</p>
<p><strong>Période :</strong> {{periode}} &nbsp;|&nbsp; <strong>Évaluateur :</strong> {{evaluateur}}</p>
<table border="1" cellpadding="6" cellspacing="0" width="100%">
  <thead><tr><th>Critère</th><th>Pondération</th><th>Note /20</th><th>Score</th><th>Commentaire</th></tr></thead>
  <tbody>
    <tr><td>Qualité des produits/services</td><td>30%</td><td></td><td></td><td></td></tr>
    <tr><td>Respect des délais</td><td>25%</td><td></td><td></td><td></td></tr>
    <tr><td>Compétitivité des prix</td><td>20%</td><td></td><td></td><td></td></tr>
    <tr><td>Réactivité / SAV</td><td>15%</td><td></td><td></td><td></td></tr>
    <tr><td>Communication</td><td>10%</td><td></td><td></td><td></td></tr>
    <tr><th colspan="3">Score global</th><td></td><td></td></tr>
  </tbody>
</table>`,
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
  console.log(`Batch 06b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
