import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let created = 0, updated = 0;

  const templates: any[] = [
    // fin_xl_014 — Suivi portefeuille d'actions
    {
      code: 'fin_xl_014',
      name: 'Suivi portefeuille d\'actions',
      description: 'Tableau de suivi des actions en portefeuille avec cours actuels et variation journalière.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 8000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'investisseur', label: 'Nom de l\'investisseur', type: 'text', required: true },
        { name: 'date_valorisation', label: 'Date de valorisation', type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Portefeuille',
            title: '{{investisseur}} — Portefeuille Actions au {{date_valorisation}}',
            colorHeader: '1A237E',
            headers: ['Ticker', 'Qté', 'Cours Achat', 'Cours Actuel', 'Variation (%)', 'P&L'],
            rows: [
              ['SONATEL', '{{qte_sonatel}}', '{{px_achat_sonatel}}', '{{px_actuel_sonatel}}', '=(D{r}-C{r})/C{r}*100', '=(D{r}-C{r})*B{r}'],
              ['ECOBANK', '{{qte_ecobank}}', '{{px_achat_ecobank}}', '{{px_actuel_ecobank}}', '=(D{r}-C{r})/C{r}*100', '=(D{r}-C{r})*B{r}'],
            ],
            totalsRow: true,
            colWidths: [14, 10, 16, 16, 16, 16],
          },
        ],
      }),
    },

    // fin_xl_015 — Analyse ratio de liquidité
    {
      code: 'fin_xl_015',
      name: 'Analyse ratio de liquidité',
      description: 'Calcul et analyse des ratios de liquidité : current ratio, quick ratio et cash ratio.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 6000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'exercice', label: 'Exercice fiscal', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Liquidité',
            title: '{{entreprise}} — Ratios de Liquidité {{exercice}}',
            colorHeader: '0D47A1',
            headers: ['Indicateur', 'Valeur (FCFA)', 'Ratio', 'Norme'],
            rows: [
              ['Actif Courant', '{{actif_courant}}', '', ''],
              ['Passif Courant', '{{passif_courant}}', '=B{r_actif}/B{r}', '>= 1.0'],
              ['Stock', '{{stock}}', '=(B{r_actif}-B{r})/B{r_passif}', '>= 0.5'],
            ],
            totalsRow: false,
            colWidths: [24, 20, 14, 14],
          },
        ],
      }),
    },

    // fin_xl_016 — Tableau de bord microfinance
    {
      code: 'fin_xl_016',
      name: 'Tableau de bord microfinance',
      description: 'Tableau de bord de suivi des indicateurs clés d\'une institution de microfinance.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 10000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'institution', label: 'Nom de l\'institution', type: 'text', required: true },
        { name: 'periode', label: 'Période de reporting', type: 'text', required: true },
        { name: 'agence', label: 'Agence / Caisse', type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Dashboard',
            title: '{{institution}} — Tableau de Bord Microfinance {{periode}}',
            colorHeader: '006064',
            headers: ['Indicateur', 'Objectif', 'Réalisé', 'Taux (%)'],
            rows: [
              ['Épargne collectée (FCFA)', '{{obj_epargne}}', '{{real_epargne}}', '=C{r}/B{r}*100'],
              ['Encours crédit (FCFA)', '{{obj_credit}}', '{{real_credit}}', '=C{r}/B{r}*100'],
              ['Taux de remboursement', '{{obj_remb}}', '{{real_remb}}', '=C{r}/B{r}*100'],
            ],
            totalsRow: false,
            colWidths: [30, 20, 20, 14],
          },
        ],
      }),
    },

    // fin_xl_017 — Calcul VAN projet
    {
      code: 'fin_xl_017',
      name: 'Calcul valeur actuelle nette (VAN)',
      description: 'Modèle de calcul de la VAN et du TRI d\'un projet d\'investissement sur 5 ans.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 12000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'projet', label: 'Nom du projet', type: 'text', required: true },
        { name: 'taux_actualisation', label: 'Taux d\'actualisation (%)', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'VAN',
            title: '{{projet}} — Analyse VAN (taux {{taux_actualisation}}%)',
            colorHeader: '1B5E20',
            headers: ['Année', 'Investissement', 'Cash-Flow', 'Cash-Flow Actualisé'],
            rows: [
              ['0', '{{investissement_initial}}', '={{investissement_initial}}*-1', '=C{r}'],
              ['1', '', '{{cf_an1}}', '=C{r}/(1+$B$2)^A{r}'],
              ['2', '', '{{cf_an2}}', '=C{r}/(1+$B$2)^A{r}'],
            ],
            totalsRow: true,
            colWidths: [10, 22, 18, 22],
          },
        ],
      }),
    },

    // fin_xl_018 — Plan de trésorerie 3 mois
    {
      code: 'fin_xl_018',
      name: 'Plan de trésorerie 3 mois',
      description: 'Projection hebdomadaire de la trésorerie sur un horizon de 3 mois.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 9000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
        { name: 'mois_debut', label: 'Mois de début', type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Trésorerie',
            title: '{{entreprise}} — Plan de Trésorerie 3 Mois à partir de {{mois_debut}}',
            colorHeader: '4A148C',
            headers: ['Semaine', 'Encaissement', 'Décaissement', 'Solde Net', 'Solde Cumulé'],
            rows: [
              ['S1', '{{enc_s1}}', '{{dec_s1}}', '=B{r}-C{r}', '=D{r}'],
              ['S2', '{{enc_s2}}', '{{dec_s2}}', '=B{r}-C{r}', '=E{r_prev}+D{r}'],
              ['S3', '{{enc_s3}}', '{{dec_s3}}', '=B{r}-C{r}', '=E{r_prev}+D{r}'],
            ],
            totalsRow: true,
            colWidths: [12, 18, 18, 16, 18],
          },
        ],
      }),
    },

    // fin_xl_019 — Comparatif offres de crédit bancaire
    {
      code: 'fin_xl_019',
      name: 'Comparatif offres de crédit bancaire',
      description: 'Tableau comparatif des offres de crédit de plusieurs banques pour un même besoin.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 5000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'client', label: 'Nom du client / entreprise', type: 'text', required: true },
        { name: 'montant_besoin', label: 'Montant du besoin (FCFA)', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Comparatif',
            title: '{{client}} — Comparatif Crédits Bancaires (Besoin : {{montant_besoin}} FCFA)',
            colorHeader: 'E65100',
            headers: ['Banque', 'Taux (%)', 'Durée (mois)', 'Mensualité (FCFA)', 'Coût Total'],
            rows: [
              ['{{banque_1}}', '{{taux_1}}', '{{duree_1}}', '=PMT(B{r}/12,C{r},{{montant_besoin}})*-1', '=D{r}*C{r}'],
              ['{{banque_2}}', '{{taux_2}}', '{{duree_2}}', '=PMT(B{r}/12,C{r},{{montant_besoin}})*-1', '=D{r}*C{r}'],
            ],
            totalsRow: false,
            colWidths: [20, 12, 16, 22, 20],
          },
        ],
      }),
    },

    // fin_xl_020 — Suivi dettes et créances
    {
      code: 'fin_xl_020',
      name: 'Suivi dettes et créances entreprise',
      description: 'Tableau de suivi des dettes fournisseurs et créances clients avec calcul des échéances.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 7000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
        { name: 'date_arrete', label: 'Date d\'arrêté', type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Créances',
            title: '{{entreprise}} — Créances Clients au {{date_arrete}}',
            colorHeader: '00695C',
            headers: ['Client', 'Montant (FCFA)', 'Échéance', 'Statut'],
            rows: [
              ['{{client_1}}', '{{mnt_1}}', '{{ech_1}}', '{{statut_1}}'],
              ['{{client_2}}', '{{mnt_2}}', '{{ech_2}}', '{{statut_2}}'],
            ],
            totalsRow: true,
            colWidths: [24, 20, 16, 14],
          },
          {
            name: 'Dettes',
            title: '{{entreprise}} — Dettes Fournisseurs au {{date_arrete}}',
            colorHeader: 'B71C1C',
            headers: ['Fournisseur', 'Montant (FCFA)', 'Échéance', 'Statut'],
            rows: [
              ['{{fourn_1}}', '{{mnt_f1}}', '{{ech_f1}}', '{{statut_f1}}'],
              ['{{fourn_2}}', '{{mnt_f2}}', '{{ech_f2}}', '{{statut_f2}}'],
            ],
            totalsRow: true,
            colWidths: [24, 20, 16, 14],
          },
        ],
      }),
    },

    // fin_xl_021 — Flux de trésorerie (indirect)
    {
      code: 'fin_xl_021',
      name: 'Tableau des flux de trésorerie (indirect)',
      description: 'État des flux de trésorerie selon la méthode indirecte (exploitation, investissement, financement).',
      category: 'finance_banque',
      templateType: 'excel',
      price: 11000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
        { name: 'exercice', label: 'Exercice', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Flux Trésorerie',
            title: '{{entreprise}} — Flux de Trésorerie {{exercice}}',
            colorHeader: '37474F',
            headers: ['Rubrique', 'Montant (FCFA)'],
            rows: [
              ['Résultat net', '{{resultat_net}}'],
              ['+ Amortissements', '{{amortissements}}'],
              ['± Variation BFR', '{{variation_bfr}}'],
            ],
            totalsRow: true,
            colWidths: [38, 22],
          },
        ],
      }),
    },

    // fin_xl_022 — Analyse WACC
    {
      code: 'fin_xl_022',
      name: 'Analyse coût du capital (WACC)',
      description: 'Calcul du coût moyen pondéré du capital (WACC) pour l\'évaluation d\'entreprise.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 13000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
        { name: 'date_calcul', label: 'Date de calcul', type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'WACC',
            title: '{{entreprise}} — Calcul WACC au {{date_calcul}}',
            colorHeader: '880E4F',
            headers: ['Composante', 'Montant (FCFA)', 'Poids (%)', 'Coût (%)', 'Contribution (%)'],
            rows: [
              ['Capitaux propres', '{{cp}}', '=B{r}/(B{r}+B{r_next})', '{{ke}}', '=C{r}*D{r}'],
              ['Dette financière', '{{dette}}', '=B{r}/(B{r_prev}+B{r})', '={{kd}}*(1-{{taux_is}})','=C{r}*D{r}'],
            ],
            totalsRow: true,
            colWidths: [24, 20, 14, 12, 18],
          },
        ],
      }),
    },

    // fin_xl_023 — Budget d'investissement
    {
      code: 'fin_xl_023',
      name: 'Budget d\'investissement et financement',
      description: 'Plan de financement et budget d\'investissement avec sources et emplois de fonds.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 9500,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'projet', label: 'Nom du projet', type: 'text', required: true },
        { name: 'annee', label: 'Année', type: 'text', required: true },
        { name: 'responsable', label: 'Responsable', type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Emplois',
            title: '{{projet}} — Budget Investissement {{annee}}',
            colorHeader: '1565C0',
            headers: ['Poste d\'investissement', 'Montant Prévu', 'Montant Réel', 'Écart'],
            rows: [
              ['{{poste_1}}', '{{prev_1}}', '{{reel_1}}', '=C{r}-B{r}'],
              ['{{poste_2}}', '{{prev_2}}', '{{reel_2}}', '=C{r}-B{r}'],
            ],
            totalsRow: true,
            colWidths: [30, 18, 18, 14],
          },
          {
            name: 'Ressources',
            title: '{{projet}} — Plan de Financement {{annee}}',
            colorHeader: '2E7D32',
            headers: ['Source de financement', 'Montant (FCFA)', 'Conditions'],
            rows: [
              ['Fonds propres', '{{fonds_propres}}', ''],
              ['Emprunt bancaire', '{{emprunt}}', '{{conditions_emprunt}}'],
            ],
            totalsRow: true,
            colWidths: [30, 20, 28],
          },
        ],
      }),
    },

    // fin_xl_024 — Taux de change et conversion devises
    {
      code: 'fin_xl_024',
      name: 'Taux de change et conversion devises',
      description: 'Tableau de taux de change EUR/USD/FCFA avec conversion automatique des montants.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 5500,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_banque', label: 'Nom de la banque', type: 'text', required: true },
        { name: 'date', label: 'Date du bulletin', type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Change',
            title: '{{nom_banque}} — Taux de Change au {{date}}',
            colorHeader: '1565C0',
            headers: ['Devise', 'Achat (FCFA)', 'Vente (FCFA)', 'Marge'],
            rows: [
              ['EUR', '{{achat_eur}}', '{{vente_eur}}', '=C{r}-B{r}'],
              ['USD', '{{achat_usd}}', '{{vente_usd}}', '=C{r}-B{r}'],
              ['GBP', '{{achat_gbp}}', '{{vente_gbp}}', '=C{r}-B{r}'],
            ],
            totalsRow: false,
            colWidths: [16, 18, 18, 14],
          },
        ],
      }),
    },

    // fin_xl_025 — Reporting financier mensuel consolidé
    {
      code: 'fin_xl_025',
      name: 'Reporting financier mensuel consolidé',
      description: 'Rapport financier mensuel consolidé avec compte de résultat, bilan simplifié et indicateurs clés.',
      category: 'finance_banque',
      templateType: 'excel',
      price: 20000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Groupe / Entreprise', type: 'text', required: true },
        { name: 'mois', label: 'Mois de reporting', type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Résultat',
            title: '{{entreprise}} — Compte de Résultat {{mois}}',
            colorHeader: '212121',
            headers: ['Rubrique', 'Mois (FCFA)', 'Cumul YTD (FCFA)', 'Budget (FCFA)', 'Écart (%)'],
            rows: [
              ['Chiffre d\'affaires', '{{ca_mois}}', '{{ca_ytd}}', '{{ca_budget}}', '=(C{r}-D{r})/D{r}*100'],
              ['Charges d\'exploitation', '{{charges_mois}}', '{{charges_ytd}}', '{{charges_budget}}', '=(C{r}-D{r})/D{r}*100'],
              ['Résultat net', '=B{r_ca}-B{r_ch}', '=C{r_ca}-C{r_ch}', '=D{r_ca}-D{r_ch}', '=(C{r}-D{r})/D{r}*100'],
            ],
            totalsRow: false,
            colWidths: [28, 20, 20, 20, 14],
          },
          {
            name: 'Indicateurs',
            title: '{{entreprise}} — KPIs Financiers {{mois}}',
            colorHeader: '4E342E',
            headers: ['Indicateur', 'Valeur', 'Cible', 'Statut'],
            rows: [
              ['Marge nette (%)', '{{marge_nette}}', '{{cible_marge}}', '{{statut_marge}}'],
              ['Ratio d\'endettement', '{{ratio_dette}}', '{{cible_dette}}', '{{statut_dette}}'],
            ],
            totalsRow: false,
            colWidths: [28, 16, 14, 12],
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
    if (r.createdAt.getTime() === r.updatedAt.getTime()) created++;
    else updated++;
  }

  console.log(`Excel Finance B OK — créés:${created} mis-à-jour:${updated}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
