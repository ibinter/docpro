import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  // 1. xl_fin_budget — Budget prévisionnel entreprise
  {
    code: 'xl_fin_budget',
    name: 'Budget prévisionnel entreprise',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification budgétaire annuelle avec suivi mensuel par département',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année budgétaire', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable financier', type: 'text', required: true },
      { name: 'devise', label: 'Devise', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Budget Annuel',
          title: 'Budget Prévisionnel Annuel',
          colorHeader: '1565C0',
          headers: ['Poste budgétaire', 'Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc', 'Total'],
          rows: [
            ['Chiffre d\'affaires', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '=SUM(B{r}:M{r})'],
            ['Coût des ventes', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '=SUM(B{r}:M{r})'],
            ['Marge brute', '=B2-B3', '=C2-C3', '=D2-D3', '=E2-E3', '=F2-F3', '=G2-G3', '=H2-H3', '=I2-I3', '=J2-J3', '=K2-K3', '=L2-L3', '=M2-M3', '=SUM(B{r}:M{r})'],
            ['Charges de personnel', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '=SUM(B{r}:M{r})'],
            ['Charges locatives', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '=SUM(B{r}:M{r})'],
            ['Marketing & communication', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '=SUM(B{r}:M{r})'],
            ['Frais administratifs', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '=SUM(B{r}:M{r})'],
            ['Amortissements', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '=SUM(B{r}:M{r})'],
            ['Résultat d\'exploitation', '=B4-SUM(B5:B9)', '=C4-SUM(C5:C9)', '=D4-SUM(D5:D9)', '=E4-SUM(E5:E9)', '=F4-SUM(F5:F9)', '=G4-SUM(G5:G9)', '=H4-SUM(H5:H9)', '=I4-SUM(I5:I9)', '=J4-SUM(J5:J9)', '=K4-SUM(K5:K9)', '=L4-SUM(L5:L9)', '=M4-SUM(M5:M9)', '=SUM(B{r}:M{r})'],
          ],
          totalsRow: true,
          colWidths: [28, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 14],
        },
        {
          name: 'Résumé',
          title: 'Résumé budgétaire annuel',
          colorHeader: '0D47A1',
          headers: ['Rubrique', 'Prévisionnel', 'Réalisé', 'Écart', 'Écart %'],
          rows: [
            ['Chiffre d\'affaires total', 0, 0, '=C{r}-B{r}', '=IFERROR((C{r}-B{r})/B{r}*100,0)'],
            ['Total charges', 0, 0, '=C{r}-B{r}', '=IFERROR((C{r}-B{r})/B{r}*100,0)'],
            ['Résultat net', '=B2-B3', '=C2-C3', '=C{r}-B{r}', '=IFERROR((C{r}-B{r})/B{r}*100,0)'],
            ['Taux de marge', '=IFERROR(B4/B2*100,0)', '=IFERROR(C4/C2*100,0)', '=C{r}-B{r}', 0],
          ],
          totalsRow: false,
          colWidths: [30, 18, 18, 18, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 2. xl_fin_tresorerie — Plan de trésorerie 12 mois
  {
    code: 'xl_fin_tresorerie',
    name: 'Plan de trésorerie 12 mois',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi mensuel des flux de trésorerie : encaissements, décaissements et solde',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'solde_initial', label: 'Solde initial (FCFA)', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Trésorerie',
          title: 'Plan de Trésorerie 12 Mois',
          colorHeader: '00695C',
          headers: ['Rubrique', 'Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
          rows: [
            ['SOLDE DÉBUT DE PÉRIODE', 0, '=M{r}', '=M{r}', '=M{r}', '=M{r}', '=M{r}', '=M{r}', '=M{r}', '=M{r}', '=M{r}', '=M{r}', '=M{r}'],
            ['Ventes / Prestations', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ['Autres encaissements', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ['TOTAL ENCAISSEMENTS', '=SUM(B3:B4)', '=SUM(C3:C4)', '=SUM(D3:D4)', '=SUM(E3:E4)', '=SUM(F3:F4)', '=SUM(G3:G4)', '=SUM(H3:H4)', '=SUM(I3:I4)', '=SUM(J3:J4)', '=SUM(K3:K4)', '=SUM(L3:L4)', '=SUM(M3:M4)'],
            ['Fournisseurs', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ['Salaires & charges', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ['Loyers & charges fixes', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ['Impôts & taxes', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ['TOTAL DÉCAISSEMENTS', '=SUM(B6:B9)', '=SUM(C6:C9)', '=SUM(D6:D9)', '=SUM(E6:E9)', '=SUM(F6:F9)', '=SUM(G6:G9)', '=SUM(H6:H9)', '=SUM(I6:I9)', '=SUM(J6:J9)', '=SUM(K6:K9)', '=SUM(L6:L9)', '=SUM(M6:M9)'],
            ['SOLDE FIN DE PÉRIODE', '=B2+B5-B10', '=C2+C5-C10', '=D2+D5-D10', '=E2+E5-E10', '=F2+F5-F10', '=G2+G5-G10', '=H2+H5-H10', '=I2+I5-I10', '=J2+J5-J10', '=K2+K5-K10', '=L2+L5-L10', '=M2+M5-M10'],
          ],
          totalsRow: false,
          colWidths: [28, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  // 3. xl_fin_bilan — Bilan simplifié
  {
    code: 'xl_fin_bilan',
    name: 'Bilan comptable simplifié',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Bilan comptable structuré : Actif, Passif et Capitaux propres',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_bilan', label: 'Date du bilan', type: 'date', required: true },
      { name: 'exercice', label: 'Exercice comptable', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Actif',
          title: 'Bilan — Actif',
          colorHeader: '1B5E20',
          headers: ['Poste', 'Brut', 'Amortissements', 'Net N', 'Net N-1'],
          rows: [
            ['Immobilisations incorporelles', 0, 0, '=B{r}-C{r}', 0],
            ['Immobilisations corporelles', 0, 0, '=B{r}-C{r}', 0],
            ['Immobilisations financières', 0, 0, '=B{r}-C{r}', 0],
            ['Stocks & encours', 0, 0, '=B{r}-C{r}', 0],
            ['Créances clients', 0, 0, '=B{r}-C{r}', 0],
            ['Disponibilités', 0, 0, '=B{r}-C{r}', 0],
            ['Autres actifs circulants', 0, 0, '=B{r}-C{r}', 0],
            ['TOTAL ACTIF', '=SUM(B2:B8)', '=SUM(C2:C8)', '=SUM(D2:D8)', '=SUM(E2:E8)'],
          ],
          totalsRow: true,
          colWidths: [32, 16, 18, 16, 16],
        },
        {
          name: 'Passif',
          title: 'Bilan — Passif & Capitaux propres',
          colorHeader: 'B71C1C',
          headers: ['Poste', 'Montant N', 'Montant N-1'],
          rows: [
            ['Capital social', 0, 0],
            ['Réserves', 0, 0],
            ['Résultat de l\'exercice', 0, 0],
            ['CAPITAUX PROPRES', '=SUM(B2:B4)', '=SUM(C2:C4)'],
            ['Dettes financières LT', 0, 0],
            ['Dettes fournisseurs', 0, 0],
            ['Dettes fiscales & sociales', 0, 0],
            ['Autres dettes CT', 0, 0],
            ['TOTAL PASSIF', '=SUM(B5:B9)', '=SUM(C5:C9)'],
          ],
          totalsRow: true,
          colWidths: [32, 18, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 4. xl_fin_compte_resultat — Compte de résultat
  {
    code: 'xl_fin_compte_resultat',
    name: 'Compte de résultat',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'État des produits et charges pour déterminer le résultat net',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'exercice', label: 'Exercice (année)', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Compte Résultat',
          title: 'Compte de Résultat',
          colorHeader: '4A148C',
          headers: ['Rubrique', 'Exercice N', 'Exercice N-1', 'Variation'],
          rows: [
            ['Chiffre d\'affaires', 0, 0, '=B{r}-C{r}'],
            ['Production stockée', 0, 0, '=B{r}-C{r}'],
            ['TOTAL PRODUITS D\'EXPLOITATION', '=SUM(B2:B3)', '=SUM(C2:C3)', '=B{r}-C{r}'],
            ['Achats & variation stocks', 0, 0, '=B{r}-C{r}'],
            ['Charges de personnel', 0, 0, '=B{r}-C{r}'],
            ['Dotations amortissements', 0, 0, '=B{r}-C{r}'],
            ['Autres charges d\'exploitation', 0, 0, '=B{r}-C{r}'],
            ['TOTAL CHARGES D\'EXPLOITATION', '=SUM(B5:B8)', '=SUM(C5:C8)', '=B{r}-C{r}'],
            ['RÉSULTAT D\'EXPLOITATION', '=B4-B9', '=C4-C9', '=B{r}-C{r}'],
            ['Produits financiers', 0, 0, '=B{r}-C{r}'],
            ['Charges financières', 0, 0, '=B{r}-C{r}'],
            ['RÉSULTAT FINANCIER', '=B11-B12', '=C11-C12', '=B{r}-C{r}'],
            ['Impôt sur les bénéfices', 0, 0, '=B{r}-C{r}'],
            ['RÉSULTAT NET', '=B10+B13-B14', '=C10+C13-C14', '=B{r}-C{r}'],
          ],
          totalsRow: false,
          colWidths: [36, 18, 18, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 5. xl_fin_suivi_depenses — Suivi dépenses mensuel
  {
    code: 'xl_fin_suivi_depenses',
    name: 'Suivi des dépenses mensuel',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Comparatif mensuel budgeté vs réalisé par catégorie de dépenses',
    price: 600, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise / Responsable', type: 'text', required: true },
      { name: 'mois', label: 'Mois', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi Dépenses',
          title: 'Suivi des Dépenses Mensuel',
          colorHeader: 'E65100',
          headers: ['Catégorie', 'Budgété (FCFA)', 'Réalisé (FCFA)', 'Écart', 'Écart %', 'Statut'],
          rows: [
            ['Loyer & charges locatives', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', '=IF(D{r}>=0,"OK","DÉPASSÉ")'],
            ['Salaires & charges sociales', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', '=IF(D{r}>=0,"OK","DÉPASSÉ")'],
            ['Achats & fournitures', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', '=IF(D{r}>=0,"OK","DÉPASSÉ")'],
            ['Marketing & publicité', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', '=IF(D{r}>=0,"OK","DÉPASSÉ")'],
            ['Transport & déplacements', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', '=IF(D{r}>=0,"OK","DÉPASSÉ")'],
            ['Téléphone & internet', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', '=IF(D{r}>=0,"OK","DÉPASSÉ")'],
            ['Assurances', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', '=IF(D{r}>=0,"OK","DÉPASSÉ")'],
            ['Frais bancaires', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', '=IF(D{r}>=0,"OK","DÉPASSÉ")'],
            ['Divers', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', '=IF(D{r}>=0,"OK","DÉPASSÉ")'],
          ],
          totalsRow: true,
          colWidths: [30, 18, 18, 16, 12, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  // 6. xl_fin_tableau_bord — Tableau de bord financier KPIs
  {
    code: 'xl_fin_tableau_bord',
    name: 'Tableau de bord financier KPIs',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Indicateurs clés de performance financière : CA, marges, ratios',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'periode', label: 'Période d\'analyse', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'KPIs Financiers',
          title: 'Tableau de Bord Financier',
          colorHeader: '1A237E',
          headers: ['Indicateur', 'Objectif', 'Réalisé', 'Écart', 'Performance'],
          rows: [
            ['Chiffre d\'affaires (FCFA)', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)&"%"'],
            ['Marge brute (FCFA)', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)&"%"'],
            ['Taux de marge brute (%)', 0, 0, '=C{r}-B{r}', ''],
            ['Charges d\'exploitation (FCFA)', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)&"%"'],
            ['EBITDA (FCFA)', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)&"%"'],
            ['Résultat net (FCFA)', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)&"%"'],
            ['Trésorerie nette (FCFA)', 0, 0, '=C{r}-B{r}', ''],
            ['Délai moyen encaissement (jours)', 0, 0, '=C{r}-B{r}', ''],
            ['Ratio charges/CA (%)', 0, 0, '=C{r}-B{r}', ''],
          ],
          totalsRow: false,
          colWidths: [34, 18, 18, 16, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 80,
  },

  // 7. xl_fin_rentabilite — Analyse rentabilité produit/service
  {
    code: 'xl_fin_rentabilite',
    name: 'Analyse de rentabilité produit/service',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Calcul de la rentabilité par produit ou service avec marges détaillées',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'unite', label: 'Unité de mesure', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Rentabilité',
          title: 'Analyse de Rentabilité par Produit/Service',
          colorHeader: '2E7D32',
          headers: ['Produit / Service', 'Qté vendue', 'Prix vente unit.', 'Coût direct unit.', 'CA total', 'Coût total', 'Marge brute', 'Taux marge %'],
          rows: [
            ['Produit A', 0, 0, 0, '=B{r}*C{r}', '=B{r}*D{r}', '=E{r}-F{r}', '=IFERROR(G{r}/E{r}*100,0)'],
            ['Produit B', 0, 0, 0, '=B{r}*C{r}', '=B{r}*D{r}', '=E{r}-F{r}', '=IFERROR(G{r}/E{r}*100,0)'],
            ['Produit C', 0, 0, 0, '=B{r}*C{r}', '=B{r}*D{r}', '=E{r}-F{r}', '=IFERROR(G{r}/E{r}*100,0)'],
            ['Service A', 0, 0, 0, '=B{r}*C{r}', '=B{r}*D{r}', '=E{r}-F{r}', '=IFERROR(G{r}/E{r}*100,0)'],
            ['Service B', 0, 0, 0, '=B{r}*C{r}', '=B{r}*D{r}', '=E{r}-F{r}', '=IFERROR(G{r}/E{r}*100,0)'],
            ['Service C', 0, 0, 0, '=B{r}*C{r}', '=B{r}*D{r}', '=E{r}-F{r}', '=IFERROR(G{r}/E{r}*100,0)'],
          ],
          totalsRow: true,
          colWidths: [26, 14, 18, 18, 16, 16, 16, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 66,
  },

  // 8. xl_fin_amortissement — Tableau amortissement emprunt
  {
    code: 'xl_fin_amortissement',
    name: 'Tableau d\'amortissement d\'emprunt',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Calcul des mensualités, capital remboursé et intérêts sur la durée du crédit',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_emprunteur', label: 'Nom de l\'emprunteur', type: 'text', required: true },
      { name: 'montant_emprunt', label: 'Montant de l\'emprunt (FCFA)', type: 'text', required: true },
      { name: 'taux_annuel', label: 'Taux d\'intérêt annuel (%)', type: 'text', required: true },
      { name: 'duree_mois', label: 'Durée (mois)', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Amortissement',
          title: 'Tableau d\'Amortissement d\'Emprunt',
          colorHeader: '37474F',
          headers: ['Mois', 'Capital restant dû', 'Mensualité', 'Capital remboursé', 'Intérêts', 'Capital restant fin'],
          rows: [
            [1, 0, 0, '=C{r}-E{r}', '=B{r}*($C$1/100/12)', '=B{r}-D{r}'],
            [2, '=F2', 0, '=C{r}-E{r}', '=B{r}*($C$1/100/12)', '=B{r}-D{r}'],
            [3, '=F3', 0, '=C{r}-E{r}', '=B{r}*($C$1/100/12)', '=B{r}-D{r}'],
            [6, '=F5', 0, '=C{r}-E{r}', '=B{r}*($C$1/100/12)', '=B{r}-D{r}'],
            [12, '=F7', 0, '=C{r}-E{r}', '=B{r}*($C$1/100/12)', '=B{r}-D{r}'],
            [24, '=F9', 0, '=C{r}-E{r}', '=B{r}*($C$1/100/12)', '=B{r}-D{r}'],
            [36, '=F11', 0, '=C{r}-E{r}', '=B{r}*($C$1/100/12)', '=B{r}-D{r}'],
            ['TOTAL', '', '', '=SUM(D2:D8)', '=SUM(E2:E8)', ''],
          ],
          totalsRow: false,
          colWidths: [10, 22, 18, 22, 18, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // 9. xl_fin_tva — Déclaration TVA mensuelle
  {
    code: 'xl_fin_tva',
    name: 'Déclaration TVA mensuelle',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Calcul de la TVA collectée, déductible et du solde à reverser',
    price: 600, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'mois', label: 'Mois déclaré', type: 'text', required: true },
      { name: 'taux_tva', label: 'Taux TVA applicable (%)', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'TVA',
          title: 'Déclaration TVA Mensuelle',
          colorHeader: 'BF360C',
          headers: ['Opération', 'Base HT (FCFA)', 'Taux TVA %', 'TVA (FCFA)'],
          rows: [
            ['Ventes locales imposables', 0, 18, '=B{r}*C{r}/100'],
            ['Prestations de services', 0, 18, '=B{r}*C{r}/100'],
            ['Autres produits taxables', 0, 18, '=B{r}*C{r}/100'],
            ['TVA COLLECTÉE TOTALE', '=SUM(B2:B4)', '', '=SUM(D2:D4)'],
            ['Achats matières & marchandises', 0, 18, '=B{r}*C{r}/100'],
            ['Charges d\'exploitation', 0, 18, '=B{r}*C{r}/100'],
            ['Investissements', 0, 18, '=B{r}*C{r}/100'],
            ['TVA DÉDUCTIBLE TOTALE', '=SUM(B6:B8)', '', '=SUM(D6:D8)'],
            ['TVA NETTE À REVERSER', '', '', '=D5-D9'],
          ],
          totalsRow: false,
          colWidths: [35, 22, 14, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // 10. xl_fin_facturation — Suivi facturation clients
  {
    code: 'xl_fin_facturation',
    name: 'Suivi facturation clients',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de suivi des factures clients : émission, échéances et règlements',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Facturation',
          title: 'Suivi Facturation Clients',
          colorHeader: '1565C0',
          headers: ['N° Facture', 'Client', 'Date émission', 'Date échéance', 'Montant HT', 'TVA', 'Montant TTC', 'Réglé', 'Solde', 'Statut'],
          rows: [
            ['FAC-001', '', '', '', 0, '=E{r}*0.18', '=E{r}+F{r}', 0, '=G{r}-H{r}', '=IF(I{r}=0,"SOLDÉ",IF(I{r}<0,"EN RETARD","EN COURS"))'],
            ['FAC-002', '', '', '', 0, '=E{r}*0.18', '=E{r}+F{r}', 0, '=G{r}-H{r}', '=IF(I{r}=0,"SOLDÉ",IF(I{r}<0,"EN RETARD","EN COURS"))'],
            ['FAC-003', '', '', '', 0, '=E{r}*0.18', '=E{r}+F{r}', 0, '=G{r}-H{r}', '=IF(I{r}=0,"SOLDÉ",IF(I{r}<0,"EN RETARD","EN COURS"))'],
            ['FAC-004', '', '', '', 0, '=E{r}*0.18', '=E{r}+F{r}', 0, '=G{r}-H{r}', '=IF(I{r}=0,"SOLDÉ",IF(I{r}<0,"EN RETARD","EN COURS"))'],
            ['FAC-005', '', '', '', 0, '=E{r}*0.18', '=E{r}+F{r}', 0, '=G{r}-H{r}', '=IF(I{r}=0,"SOLDÉ",IF(I{r}<0,"EN RETARD","EN COURS"))'],
            ['FAC-006', '', '', '', 0, '=E{r}*0.18', '=E{r}+F{r}', 0, '=G{r}-H{r}', '=IF(I{r}=0,"SOLDÉ",IF(I{r}<0,"EN RETARD","EN COURS"))'],
          ],
          totalsRow: true,
          colWidths: [12, 20, 14, 14, 16, 14, 16, 14, 14, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 74,
  },

  // 11. xl_fin_fournisseurs — Gestion fournisseurs
  {
    code: 'xl_fin_fournisseurs',
    name: 'Gestion fournisseurs',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des commandes, factures et paiements fournisseurs',
    price: 600, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Fournisseurs',
          title: 'Gestion des Fournisseurs',
          colorHeader: '4E342E',
          headers: ['Fournisseur', 'N° Commande', 'Date commande', 'Montant HT', 'N° Facture', 'Date facture', 'Montant TTC', 'Date paiement', 'Montant payé', 'Solde restant'],
          rows: [
            ['', '', '', 0, '', '', '=D{r}*1.18', '', 0, '=G{r}-I{r}'],
            ['', '', '', 0, '', '', '=D{r}*1.18', '', 0, '=G{r}-I{r}'],
            ['', '', '', 0, '', '', '=D{r}*1.18', '', 0, '=G{r}-I{r}'],
            ['', '', '', 0, '', '', '=D{r}*1.18', '', 0, '=G{r}-I{r}'],
            ['', '', '', 0, '', '', '=D{r}*1.18', '', 0, '=G{r}-I{r}'],
            ['', '', '', 0, '', '', '=D{r}*1.18', '', 0, '=G{r}-I{r}'],
            ['', '', '', 0, '', '', '=D{r}*1.18', '', 0, '=G{r}-I{r}'],
          ],
          totalsRow: true,
          colWidths: [22, 16, 14, 16, 14, 14, 16, 14, 16, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  // 12. xl_fin_marge — Calcul marges commerciales
  {
    code: 'xl_fin_marge',
    name: 'Calcul des marges commerciales',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Calcul de la marge brute, nette et du taux de marge par article',
    price: 500, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'categorie', label: 'Catégorie de produits', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Marges',
          title: 'Calcul des Marges Commerciales',
          colorHeader: '006064',
          headers: ['Article / Référence', 'Prix achat HT', 'Prix vente HT', 'Marge brute', 'Taux marge %', 'Taux marque %', 'Coefficient'],
          rows: [
            ['Article 1', 0, 0, '=C{r}-B{r}', '=IFERROR(D{r}/B{r}*100,0)', '=IFERROR(D{r}/C{r}*100,0)', '=IFERROR(C{r}/B{r},0)'],
            ['Article 2', 0, 0, '=C{r}-B{r}', '=IFERROR(D{r}/B{r}*100,0)', '=IFERROR(D{r}/C{r}*100,0)', '=IFERROR(C{r}/B{r},0)'],
            ['Article 3', 0, 0, '=C{r}-B{r}', '=IFERROR(D{r}/B{r}*100,0)', '=IFERROR(D{r}/C{r}*100,0)', '=IFERROR(C{r}/B{r},0)'],
            ['Article 4', 0, 0, '=C{r}-B{r}', '=IFERROR(D{r}/B{r}*100,0)', '=IFERROR(D{r}/C{r}*100,0)', '=IFERROR(C{r}/B{r},0)'],
            ['Article 5', 0, 0, '=C{r}-B{r}', '=IFERROR(D{r}/B{r}*100,0)', '=IFERROR(D{r}/C{r}*100,0)', '=IFERROR(C{r}/B{r},0)'],
            ['Article 6', 0, 0, '=C{r}-B{r}', '=IFERROR(D{r}/B{r}*100,0)', '=IFERROR(D{r}/C{r}*100,0)', '=IFERROR(C{r}/B{r},0)'],
            ['Article 7', 0, 0, '=C{r}-B{r}', '=IFERROR(D{r}/B{r}*100,0)', '=IFERROR(D{r}/C{r}*100,0)', '=IFERROR(C{r}/B{r},0)'],
            ['Article 8', 0, 0, '=C{r}-B{r}', '=IFERROR(D{r}/B{r}*100,0)', '=IFERROR(D{r}/C{r}*100,0)', '=IFERROR(C{r}/B{r},0)'],
          ],
          totalsRow: true,
          colWidths: [26, 16, 16, 16, 14, 14, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 67,
  },

  // 13. xl_fin_seuil — Calcul seuil de rentabilité
  {
    code: 'xl_fin_seuil',
    name: 'Calcul du seuil de rentabilité',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Détermination du point mort et de la date de couverture des charges fixes',
    price: 600, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Exercice', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Seuil Rentabilité',
          title: 'Calcul du Seuil de Rentabilité (Point Mort)',
          colorHeader: '880E4F',
          headers: ['Paramètre', 'Montant (FCFA)', 'Commentaire'],
          rows: [
            ['Chiffre d\'affaires prévisionnel', 0, 'CA annuel estimé'],
            ['Charges variables totales', 0, 'Proportionnelles au CA'],
            ['Taux de marge sur coût variable', '=IFERROR((B2-B3)/B2*100,0)', 'En %'],
            ['Charges fixes totales', 0, 'Loyer, salaires, assurances...'],
            ['SEUIL DE RENTABILITÉ (FCFA)', '=IFERROR(B5/((B2-B3)/B2),0)', 'CA minimum à atteindre'],
            ['Point mort (jours)', '=IFERROR(B6/B2*365,0)', 'Jours pour couvrir charges fixes'],
            ['Marge de sécurité (FCFA)', '=B2-B6', 'CA réel - Seuil'],
            ['Indice de sécurité (%)', '=IFERROR((B2-B6)/B2*100,0)', '% du CA au-dessus du seuil'],
          ],
          totalsRow: false,
          colWidths: [36, 22, 35],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 64,
  },

  // 14. xl_fin_investissement — Plan d'investissement
  {
    code: 'xl_fin_investissement',
    name: "Plan d'investissement",
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: "Évaluation d'un investissement : coût, financement, retour sur investissement",
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début prévue', type: 'date', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Investissement',
          title: "Plan d'Investissement",
          colorHeader: '263238',
          headers: ['Rubrique', 'Montant (FCFA)', 'Source financement', 'Durée amort. (ans)'],
          rows: [
            ['Terrain & construction', 0, 'Fonds propres', 20],
            ['Équipements & matériels', 0, 'Crédit bancaire', 5],
            ['Véhicules', 0, 'Crédit-bail', 5],
            ['Matériel informatique', 0, 'Fonds propres', 3],
            ['Fonds de commerce', 0, 'Fonds propres', 10],
            ['Besoin en fonds de roulement', 0, 'Crédit court terme', 1],
            ['Frais d\'établissement', 0, 'Fonds propres', 3],
            ['TOTAL INVESTISSEMENT', '=SUM(B2:B8)', '', ''],
            ['Fonds propres apportés', 0, '', ''],
            ['Emprunts bancaires', 0, '', ''],
            ['Subventions & aides', 0, '', ''],
            ['TOTAL FINANCEMENT', '=SUM(B10:B12)', '', ''],
          ],
          totalsRow: false,
          colWidths: [32, 20, 22, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 61,
  },

  // 15. xl_fin_flux — Tableau des flux de trésorerie
  {
    code: 'xl_fin_flux',
    name: 'Tableau des flux de trésorerie',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'État des flux de trésorerie : activités opérationnelles, investissement et financement',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'exercice', label: 'Exercice', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Flux Trésorerie',
          title: 'Tableau des Flux de Trésorerie',
          colorHeader: '1A237E',
          headers: ['Rubrique', 'Exercice N', 'Exercice N-1'],
          rows: [
            ['Résultat net de l\'exercice', 0, 0],
            ['Dotations amortissements', 0, 0],
            ['Variation stocks', 0, 0],
            ['Variation créances clients', 0, 0],
            ['Variation dettes fournisseurs', 0, 0],
            ['FLUX OPÉRATIONNELS', '=SUM(B2:B6)', '=SUM(C2:C6)'],
            ['Acquisitions immobilisations', 0, 0],
            ['Cessions d\'actifs', 0, 0],
            ['FLUX D\'INVESTISSEMENT', '=B8-B9', '=C8-C9'],
            ['Nouveaux emprunts contractés', 0, 0],
            ['Remboursements d\'emprunts', 0, 0],
            ['Dividendes versés', 0, 0],
            ['FLUX DE FINANCEMENT', '=B11-B12-B13', '=C11-C12-C13'],
            ['VARIATION NETTE DE TRÉSORERIE', '=B7+B10+B14', '=C7+C10+C14'],
            ['Trésorerie début de période', 0, 0],
            ['TRÉSORERIE FIN DE PÉRIODE', '=B15+B16', '=C15+C16'],
          ],
          totalsRow: false,
          colWidths: [38, 18, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // 16. xl_fin_plan_financement — Plan de financement 3 ans
  {
    code: 'xl_fin_plan_financement',
    name: 'Plan de financement 3 ans',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Plan de financement pluriannuel : besoins et ressources sur 3 exercices',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee_debut', label: 'Année de démarrage', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur d\'activité', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Plan Financement',
          title: 'Plan de Financement sur 3 Ans',
          colorHeader: '004D40',
          headers: ['Rubrique', 'Année 1', 'Année 2', 'Année 3', 'Total'],
          rows: [
            ['BESOINS', 0, 0, 0, '=SUM(B{r}:D{r})'],
            ['Investissements', 0, 0, 0, '=SUM(B{r}:D{r})'],
            ['Besoin en fonds de roulement', 0, 0, 0, '=SUM(B{r}:D{r})'],
            ['Remboursement emprunts', 0, 0, 0, '=SUM(B{r}:D{r})'],
            ['Distribution de bénéfices', 0, 0, 0, '=SUM(B{r}:D{r})'],
            ['TOTAL BESOINS', '=SUM(B2:B6)', '=SUM(C2:C6)', '=SUM(D2:D6)', '=SUM(E2:E6)'],
            ['RESSOURCES', 0, 0, 0, '=SUM(B{r}:D{r})'],
            ['Capitaux propres apportés', 0, 0, 0, '=SUM(B{r}:D{r})'],
            ['Emprunts bancaires', 0, 0, 0, '=SUM(B{r}:D{r})'],
            ['Subventions reçues', 0, 0, 0, '=SUM(B{r}:D{r})'],
            ['Capacité autofinancement', 0, 0, 0, '=SUM(B{r}:D{r})'],
            ['TOTAL RESSOURCES', '=SUM(B8:B12)', '=SUM(C8:C12)', '=SUM(D8:D12)', '=SUM(E8:E12)'],
            ['SOLDE (Ressources - Besoins)', '=B13-B7', '=C13-C7', '=D13-D7', '=E13-E7'],
          ],
          totalsRow: false,
          colWidths: [32, 16, 16, 16, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 59,
  },

  // 17. xl_fin_charges_fixes — Répartition charges fixes
  {
    code: 'xl_fin_charges_fixes',
    name: 'Répartition des charges fixes',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Inventaire et suivi mensuel des charges fixes de l\'entreprise',
    price: 500, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Charges Fixes',
          title: 'Répartition des Charges Fixes',
          colorHeader: '5D4037',
          headers: ['Nature de la charge', 'Mensuel (FCFA)', 'Annuel (FCFA)', '% du total', 'Fréquence'],
          rows: [
            ['Loyer / charges locatives', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', 'Mensuel'],
            ['Salaires fixes & charges sociales', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', 'Mensuel'],
            ['Assurances', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', 'Annuel'],
            ['Abonnements (téléphone, internet)', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', 'Mensuel'],
            ['Comptabilité / expertise', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', 'Mensuel'],
            ['Amortissements', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', 'Mensuel'],
            ['Frais bancaires fixes', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', 'Mensuel'],
            ['Impôts & taxes fixes', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', 'Annuel'],
            ['Entretien & maintenance', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', 'Mensuel'],
            ['Divers charges fixes', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', 'Mensuel'],
            ['TOTAL CHARGES FIXES', '=SUM(B2:B11)', '=SUM(C2:C11)', '100%', ''],
          ],
          totalsRow: false,
          colWidths: [32, 18, 18, 12, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  // 18. xl_fin_suivi_ca — Suivi chiffre d'affaires mensuel
  {
    code: 'xl_fin_suivi_ca',
    name: "Suivi du chiffre d'affaires mensuel",
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: "Comparatif mensuel objectif vs réalisé du chiffre d'affaires",
    price: 600, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'commercial', label: 'Responsable commercial', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi CA',
          title: "Suivi du Chiffre d'Affaires Mensuel",
          colorHeader: '1B5E20',
          headers: ['Mois', 'Objectif (FCFA)', 'Réalisé (FCFA)', 'Écart (FCFA)', 'Taux réalisation %', 'Cumul objectif', 'Cumul réalisé'],
          rows: [
            ['Janvier', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=B{r}', '=C{r}'],
            ['Février', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=F2+B{r}', '=G2+C{r}'],
            ['Mars', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=F3+B{r}', '=G3+C{r}'],
            ['Avril', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=F4+B{r}', '=G4+C{r}'],
            ['Mai', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=F5+B{r}', '=G5+C{r}'],
            ['Juin', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=F6+B{r}', '=G6+C{r}'],
            ['Juillet', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=F7+B{r}', '=G7+C{r}'],
            ['Août', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=F8+B{r}', '=G8+C{r}'],
            ['Septembre', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=F9+B{r}', '=G9+C{r}'],
            ['Octobre', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=F10+B{r}', '=G10+C{r}'],
            ['Novembre', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=F11+B{r}', '=G11+C{r}'],
            ['Décembre', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=F12+B{r}', '=G12+C{r}'],
            ['TOTAL ANNUEL', '=SUM(B2:B13)', '=SUM(C2:C13)', '=SUM(D2:D13)', '=IFERROR(C14/B14*100,0)', '', ''],
          ],
          totalsRow: false,
          colWidths: [14, 18, 18, 16, 18, 18, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 76,
  },

  // 19. xl_fin_comparatif — Comparatif budgétaire N vs N-1
  {
    code: 'xl_fin_comparatif',
    name: 'Comparatif budgétaire N vs N-1',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Analyse comparative des indicateurs financiers entre deux exercices',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee_n', label: 'Exercice N', type: 'text', required: true },
      { name: 'annee_n1', label: 'Exercice N-1', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Comparatif N vs N-1',
          title: 'Comparatif Budgétaire N vs N-1',
          colorHeader: '0277BD',
          headers: ['Indicateur', 'Exercice N', 'Exercice N-1', 'Évolution (FCFA)', 'Évolution %', 'Tendance'],
          rows: [
            ['Chiffre d\'affaires', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/C{r}*100,0)', '=IF(D{r}>0,"▲","▼")'],
            ['Marge brute', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/C{r}*100,0)', '=IF(D{r}>0,"▲","▼")'],
            ['Taux de marge brute (%)', 0, 0, '=B{r}-C{r}', '', '=IF(D{r}>0,"▲","▼")'],
            ['Charges d\'exploitation', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/C{r}*100,0)', '=IF(D{r}<0,"▲","▼")'],
            ['Résultat d\'exploitation', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/C{r}*100,0)', '=IF(D{r}>0,"▲","▼")'],
            ['Résultat net', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/C{r}*100,0)', '=IF(D{r}>0,"▲","▼")'],
            ['Effectif (personnes)', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/C{r}*100,0)', '=IF(D{r}>0,"▲","▼")'],
            ['CA par employé', '=IFERROR(B2/B8,0)', '=IFERROR(C2/C8,0)', '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/C{r}*100,0)', '=IF(D{r}>0,"▲","▼")'],
          ],
          totalsRow: false,
          colWidths: [30, 16, 16, 18, 14, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 20. xl_fin_ratios — Tableau de ratios financiers
  {
    code: 'xl_fin_ratios',
    name: 'Tableau de ratios financiers',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Calcul automatique des ratios de liquidité, solvabilité et rentabilité',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'exercice', label: 'Exercice', type: 'text', required: true },
      { name: 'analyste', label: 'Analyste financier', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Données',
          title: 'Données financières de base',
          colorHeader: '37474F',
          headers: ['Poste comptable', 'Montant (FCFA)'],
          rows: [
            ['Actif courant', 0],
            ['Stocks', 0],
            ['Passif courant', 0],
            ['Total actif', 0],
            ['Capitaux propres', 0],
            ['Dettes totales', 0],
            ['Chiffre d\'affaires', 0],
            ['Résultat net', 0],
            ['EBITDA', 0],
            ['Charges financières', 0],
          ],
          totalsRow: false,
          colWidths: [35, 22],
        },
        {
          name: 'Ratios',
          title: 'Tableau des Ratios Financiers',
          colorHeader: '1A237E',
          headers: ['Ratio', 'Valeur calculée', 'Norme sectorielle', 'Interprétation'],
          rows: [
            ['Ratio de liquidité générale', '=IFERROR(Données!B1/Données!B3,0)', '>1', '=IF(B{r}>1,"Satisfaisant","Insuffisant")'],
            ['Ratio de liquidité réduite', '=IFERROR((Données!B1-Données!B2)/Données!B3,0)', '>0.8', '=IF(B{r}>0.8,"Satisfaisant","Insuffisant")'],
            ['Ratio d\'endettement', '=IFERROR(Données!B6/Données!B5,0)', '<1', '=IF(B{r}<1,"Satisfaisant","Élevé")'],
            ['Autonomie financière (%)', '=IFERROR(Données!B5/Données!B4*100,0)', '>30%', '=IF(B{r}>30,"Satisfaisant","Insuffisant")'],
            ['Rentabilité des capitaux propres (%)', '=IFERROR(Données!B8/Données!B5*100,0)', '>10%', '=IF(B{r}>10,"Satisfaisant","Insuffisant")'],
            ['Marge nette (%)', '=IFERROR(Données!B8/Données!B7*100,0)', '>5%', '=IF(B{r}>5,"Satisfaisant","Insuffisant")'],
            ['Ratio couverture intérêts', '=IFERROR(Données!B9/Données!B10,0)', '>3', '=IF(B{r}>3,"Satisfaisant","Insuffisant")'],
          ],
          totalsRow: false,
          colWidths: [36, 18, 18, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },
];

async function main() {
  let created = 0;
  for (const t of templates) {
    await prisma.documentTemplate.upsert({
      where: { code: t.code },
      update: t,
      create: t,
    });
    created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Excel Finance: ${created} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
