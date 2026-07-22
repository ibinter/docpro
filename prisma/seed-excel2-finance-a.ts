import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let created = 0, updated = 0;

  const templates: any[] = [
    // ─── fin_xl_001 — Tableau de trésorerie mensuel ───────────────────────────
    {
      code: 'fin_xl_001',
      name: 'Tableau de trésorerie mensuel',
      description: 'Suivi mensuel des recettes, dépenses et solde de trésorerie.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 5000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'mois', label: 'Mois concerné (ex: Janvier 2025)', type: 'text', required: true },
        { name: 'solde_initial', label: 'Solde initial (FCFA)', type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Trésorerie',
            title: '{{nom_entreprise}} — Trésorerie {{mois}}',
            colorHeader: '0D47A1',
            headers: ['Libellé', 'Recettes', 'Dépenses', 'Solde'],
            rows: [
              ['Solde initial', '{{solde_initial}}', '', '=B{r}'],
              ['Encaissements clients', '{{encaissements}}', '', '=D{r-1}+B{r}'],
              ['Charges fixes', '', '{{charges_fixes}}', '=D{r-1}-C{r}'],
            ],
            totalsRow: true,
            colWidths: [32, 16, 16, 16],
          },
        ],
      }),
    },

    // ─── fin_xl_002 — Plan de financement projet ──────────────────────────────
    {
      code: 'fin_xl_002',
      name: 'Plan de financement projet',
      description: 'Tableau structurant besoins, apports propres et emprunts pour un projet.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 7000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
        { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
        { name: 'responsable', label: 'Responsable du projet', type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Financement',
            title: 'Plan de financement — {{nom_projet}}',
            colorHeader: '1B5E20',
            headers: ['Poste', 'Besoin (FCFA)', 'Apport propre', 'Emprunt'],
            rows: [
              ['Investissements', '{{total_invest}}', '{{apport}}', '=B{r}-C{r}'],
              ['Fonds de roulement', '{{fonds_roulement}}', '', '=B{r}'],
              ['Frais de démarrage', '{{frais_demarrage}}', '', '=B{r}'],
            ],
            totalsRow: true,
            colWidths: [30, 18, 18, 18],
          },
        ],
      }),
    },

    // ─── fin_xl_003 — Tableau de bord financier KPI ───────────────────────────
    {
      code: 'fin_xl_003',
      name: 'Tableau de bord financier KPI',
      description: 'Indicateurs clés : chiffre d\'affaires, charges totales et résultat net.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 8000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'periode', label: 'Période (ex: T1 2025)', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'KPI',
            title: '{{nom_entreprise}} — Tableau de bord {{periode}}',
            colorHeader: '4A148C',
            headers: ['Indicateur', 'Prévu', 'Réalisé', 'Écart (%)'],
            rows: [
              ['Chiffre d\'affaires', '{{ca_prevu}}', '{{ca_realise}}', '=(C{r}-B{r})/B{r}*100'],
              ['Charges totales', '{{charges_prevues}}', '{{charges_realisees}}', '=(C{r}-B{r})/B{r}*100'],
              ['Résultat net', '=B2-B3', '=C2-C3', '=(C{r}-B{r})/B{r}*100'],
            ],
            totalsRow: false,
            colWidths: [28, 16, 16, 14],
          },
        ],
      }),
    },

    // ─── fin_xl_004 — Bilan prévisionnel simplifié ────────────────────────────
    {
      code: 'fin_xl_004',
      name: 'Bilan prévisionnel simplifié',
      description: 'Bilan actif/passif prévisionnel pour une année donnée.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 9000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'annee', label: 'Année du bilan', type: 'text', required: true },
        { name: 'devise', label: 'Devise (ex: FCFA)', type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Actif',
            title: '{{nom_entreprise}} — Bilan Actif {{annee}}',
            colorHeader: '006064',
            headers: ['Poste Actif', 'Montant ({{devise}})'],
            rows: [
              ['Immobilisations nettes', '{{immobilisations}}'],
              ['Stocks', '{{stocks}}'],
              ['Créances clients', '{{creances}}'],
              ['Trésorerie', '{{tresorerie}}'],
            ],
            totalsRow: true,
            colWidths: [34, 20],
          },
          {
            name: 'Passif',
            title: '{{nom_entreprise}} — Bilan Passif {{annee}}',
            colorHeader: 'B71C1C',
            headers: ['Poste Passif', 'Montant ({{devise}})'],
            rows: [
              ['Capitaux propres', '{{capitaux_propres}}'],
              ['Dettes financières', '{{dettes_financieres}}'],
              ['Dettes fournisseurs', '{{dettes_fournisseurs}}'],
            ],
            totalsRow: true,
            colWidths: [34, 20],
          },
        ],
      }),
    },

    // ─── fin_xl_005 — Compte de résultat prévisionnel ─────────────────────────
    {
      code: 'fin_xl_005',
      name: 'Compte de résultat prévisionnel',
      description: 'Projection des produits et charges pour établir le résultat prévisionnel.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 8500,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'exercice', label: 'Exercice (ex: 2025)', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Résultat',
            title: '{{nom_entreprise}} — Compte de résultat {{exercice}}',
            colorHeader: 'E65100',
            headers: ['Libellé', 'Montant (FCFA)'],
            rows: [
              ['Chiffre d\'affaires', '{{chiffre_affaires}}'],
              ['Achats et charges externes', '{{achats_charges}}'],
              ['Charges de personnel', '{{charges_personnel}}'],
              ['Résultat d\'exploitation', '=B2-B3-B4'],
            ],
            totalsRow: false,
            colWidths: [36, 20],
          },
        ],
      }),
    },

    // ─── fin_xl_006 — Calcul de rentabilité investissement ───────────────────
    {
      code: 'fin_xl_006',
      name: 'Calcul de rentabilité investissement (ROI, VAN, TRI)',
      description: 'Analyse de la rentabilité d\'un investissement avec ROI, VAN et TRI.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 12000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
        { name: 'taux_actualisation', label: 'Taux d\'actualisation (%)', type: 'text', required: true },
        { name: 'duree_ans', label: 'Durée (années)', type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Rentabilité',
            title: 'Analyse rentabilité — {{nom_projet}}',
            colorHeader: '1A237E',
            headers: ['Indicateur', 'Valeur'],
            rows: [
              ['Investissement initial (FCFA)', '{{investissement_initial}}'],
              ['Flux nets annuels (FCFA)', '{{flux_nets}}'],
              ['ROI (%)', '=(B2/B1)*100'],
              ['VAN estimée (FCFA)', '{{van_estimee}}'],
              ['TRI (%)', '{{tri}}'],
            ],
            totalsRow: false,
            colWidths: [36, 20],
          },
        ],
      }),
    },

    // ─── fin_xl_007 — Suivi des encaissements clients ─────────────────────────
    {
      code: 'fin_xl_007',
      name: 'Suivi des encaissements clients',
      description: 'Registre de suivi des paiements reçus des clients.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 5000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'mois', label: 'Mois de suivi', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Encaissements',
            title: '{{nom_entreprise}} — Encaissements {{mois}}',
            colorHeader: '00695C',
            headers: ['Client', 'Facture N°', 'Montant dû', 'Montant reçu', 'Reste à payer'],
            rows: [
              ['{{client_1}}', '{{facture_1}}', '{{montant_du_1}}', '{{montant_recu_1}}', '=C{r}-D{r}'],
              ['{{client_2}}', '{{facture_2}}', '{{montant_du_2}}', '{{montant_recu_2}}', '=C{r}-D{r}'],
            ],
            totalsRow: true,
            colWidths: [26, 14, 16, 16, 16],
          },
        ],
      }),
    },

    // ─── fin_xl_008 — Suivi des décaissements fournisseurs ───────────────────
    {
      code: 'fin_xl_008',
      name: 'Suivi des décaissements fournisseurs',
      description: 'Registre de suivi des paiements effectués aux fournisseurs.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 5000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'mois', label: 'Mois de suivi', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Décaissements',
            title: '{{nom_entreprise}} — Décaissements {{mois}}',
            colorHeader: 'BF360C',
            headers: ['Fournisseur', 'Facture N°', 'Montant dû', 'Montant payé', 'Reste dû'],
            rows: [
              ['{{fournisseur_1}}', '{{facture_f1}}', '{{montant_du_f1}}', '{{montant_paye_f1}}', '=C{r}-D{r}'],
              ['{{fournisseur_2}}', '{{facture_f2}}', '{{montant_du_f2}}', '{{montant_paye_f2}}', '=C{r}-D{r}'],
            ],
            totalsRow: true,
            colWidths: [26, 14, 16, 16, 14],
          },
        ],
      }),
    },

    // ─── fin_xl_009 — Plan de remboursement emprunt ───────────────────────────
    {
      code: 'fin_xl_009',
      name: 'Plan de remboursement emprunt (tableau d\'amortissement)',
      description: 'Tableau d\'amortissement d\'un emprunt bancaire avec capital, intérêts et mensualité.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 10000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_emprunteur', label: 'Nom de l\'emprunteur', type: 'text', required: true },
        { name: 'date_debut', label: 'Date de début du remboursement', type: 'date', required: true },
        { name: 'taux_annuel', label: 'Taux annuel (%)', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Amortissement',
            title: '{{nom_emprunteur}} — Plan de remboursement',
            colorHeader: '263238',
            headers: ['Échéance', 'Capital restant dû', 'Intérêts', 'Amortissement', 'Mensualité'],
            rows: [
              ['1', '{{capital_initial}}', '={{capital_initial}}*{{taux_mensuel}}', '{{amortissement}}', '=C{r}+D{r}'],
              ['2', '=B{r-1}-D{r-1}', '=B{r}*{{taux_mensuel}}', '{{amortissement}}', '=C{r}+D{r}'],
              ['3', '=B{r-1}-D{r-1}', '=B{r}*{{taux_mensuel}}', '{{amortissement}}', '=C{r}+D{r}'],
            ],
            totalsRow: true,
            colWidths: [12, 22, 16, 18, 16],
          },
        ],
      }),
    },

    // ─── fin_xl_010 — Budget prévisionnel annuel ──────────────────────────────
    {
      code: 'fin_xl_010',
      name: 'Budget prévisionnel annuel (12 mois)',
      description: 'Budget mensuel sur 12 mois avec recettes, charges et solde cumulé.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 15000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'annee', label: 'Année budgétaire', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Budget annuel',
            title: '{{nom_entreprise}} — Budget {{annee}}',
            colorHeader: '0D47A1',
            headers: ['Poste', 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc', 'Total'],
            rows: [
              ['Recettes', '{{jan_r}}', '{{fev_r}}', '{{mar_r}}', '{{avr_r}}', '{{mai_r}}', '{{jun_r}}', '{{jul_r}}', '{{aou_r}}', '{{sep_r}}', '{{oct_r}}', '{{nov_r}}', '{{dec_r}}', '=SUM(B{r}:M{r})'],
              ['Charges', '{{jan_c}}', '{{fev_c}}', '{{mar_c}}', '{{avr_c}}', '{{mai_c}}', '{{jun_c}}', '{{jul_c}}', '{{aou_c}}', '{{sep_c}}', '{{oct_c}}', '{{nov_c}}', '{{dec_c}}', '=SUM(B{r}:M{r})'],
              ['Solde', '=B2-B3', '=C2-C3', '=D2-D3', '=E2-E3', '=F2-F3', '=G2-G3', '=H2-H3', '=I2-I3', '=J2-J3', '=K2-K3', '=L2-L3', '=M2-M3', '=N2-N3'],
            ],
            totalsRow: false,
            colWidths: [20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 14],
          },
        ],
      }),
    },

    // ─── fin_xl_011 — Analyse des risques financiers ──────────────────────────
    {
      code: 'fin_xl_011',
      name: 'Analyse des risques financiers',
      description: 'Matrice d\'identification et d\'évaluation des risques financiers de l\'entreprise.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 11000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'date_analyse', label: 'Date de l\'analyse', type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Risques',
            title: '{{nom_entreprise}} — Analyse des risques financiers',
            colorHeader: '880E4F',
            headers: ['Risque', 'Probabilité (1-5)', 'Impact (1-5)', 'Score', 'Mesure corrective'],
            rows: [
              ['Risque de liquidité', '{{prob_liquidite}}', '{{impact_liquidite}}', '=B{r}*C{r}', '{{mesure_liquidite}}'],
              ['Risque de crédit', '{{prob_credit}}', '{{impact_credit}}', '=B{r}*C{r}', '{{mesure_credit}}'],
              ['Risque de change', '{{prob_change}}', '{{impact_change}}', '=B{r}*C{r}', '{{mesure_change}}'],
            ],
            totalsRow: false,
            colWidths: [28, 18, 14, 10, 30],
          },
        ],
      }),
    },

    // ─── fin_xl_012 — Tableau de bord crédit bancaire ────────────────────────
    {
      code: 'fin_xl_012',
      name: 'Tableau de bord crédit bancaire',
      description: 'Suivi des lignes de crédit, encours et capacité d\'endettement résiduelle.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 9000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'date_arrete', label: 'Date d\'arrêté', type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Crédit',
            title: '{{nom_entreprise}} — Tableau de bord crédit',
            colorHeader: '1565C0',
            headers: ['Banque / Ligne', 'Plafond accordé', 'Encours utilisé', 'Disponible', 'Échéance'],
            rows: [
              ['{{banque_1}}', '{{plafond_1}}', '{{encours_1}}', '=B{r}-C{r}', '{{echeance_1}}'],
              ['{{banque_2}}', '{{plafond_2}}', '{{encours_2}}', '=B{r}-C{r}', '{{echeance_2}}'],
            ],
            totalsRow: true,
            colWidths: [28, 18, 18, 16, 14],
          },
        ],
      }),
    },

    // ─── fin_xl_013 — Calcul point mort / seuil de rentabilité ───────────────
    {
      code: 'fin_xl_013',
      name: 'Calcul point mort / seuil de rentabilité',
      description: 'Détermination du chiffre d\'affaires minimum pour couvrir toutes les charges.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 7500,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'annee', label: 'Année de référence', type: 'text', required: true },
        { name: 'taux_marge', label: 'Taux de marge sur coûts variables (%)', type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Point mort',
            title: '{{nom_entreprise}} — Seuil de rentabilité {{annee}}',
            colorHeader: '4E342E',
            headers: ['Paramètre', 'Valeur'],
            rows: [
              ['Chiffre d\'affaires total (FCFA)', '{{ca_total}}'],
              ['Charges variables (FCFA)', '{{charges_variables}}'],
              ['Charges fixes (FCFA)', '{{charges_fixes}}'],
              ['Marge sur coûts variables', '=B2-B3'],
              ['Taux de marge (%)', '=B5/B2*100'],
              ['Seuil de rentabilité (FCFA)', '=B4/B6*100'],
              ['Point mort (jours)', '=B7/B2*365'],
            ],
            totalsRow: false,
            colWidths: [38, 20],
          },
        ],
      }),
    },
  ];

  for (const t of templates) {
    const r = await prisma.documentTemplate.upsert({
      where: { code: t.code },
      update: t,
      create: t,
    });
    if (r.createdAt.getTime() === r.updatedAt.getTime()) {
      created++;
    } else {
      updated++;
    }
  }

  console.log(`Excel Finance A OK — créés:${created} mis-à-jour:${updated}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
