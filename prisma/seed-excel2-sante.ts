import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let created = 0, updated = 0;

  const templates = [
    // ─── 1. Suivi stocks médicaments ───────────────────────────────────────────
    {
      code: 'sante_xl_001',
      name: 'Suivi Stocks Médicaments',
      description: 'Suivi des stocks de médicaments pour pharmacie ou formation sanitaire avec alertes automatiques.',
      category: 'sante',
      templateType: 'excel',
      price: 4500,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
        { name: 'mois',             label: 'Mois de référence',        type: 'text', required: true },
        { name: 'stock_parac',      label: 'Stock initial Paracétamol', type: 'text', required: true },
        { name: 'entrees_parac',    label: 'Entrées Paracétamol',       type: 'text', required: true },
        { name: 'sorties_parac',    label: 'Sorties Paracétamol',       type: 'text', required: true },
        { name: 'stock_amox',       label: 'Stock initial Amoxicilline', type: 'text', required: true },
        { name: 'entrees_amox',     label: 'Entrées Amoxicilline',      type: 'text', required: true },
        { name: 'sorties_amox',     label: 'Sorties Amoxicilline',      type: 'text', required: true },
        { name: 'stock_cotri',      label: 'Stock initial Cotrimoxazole', type: 'text', required: false },
        { name: 'entrees_cotri',    label: 'Entrées Cotrimoxazole',     type: 'text', required: false },
        { name: 'sorties_cotri',    label: 'Sorties Cotrimoxazole',     type: 'text', required: false },
        { name: 'stock_metronid',   label: 'Stock initial Métronidazole', type: 'text', required: false },
        { name: 'entrees_metronid', label: 'Entrées Métronidazole',     type: 'text', required: false },
        { name: 'sorties_metronid', label: 'Sorties Métronidazole',     type: 'text', required: false },
        { name: 'responsable',      label: 'Responsable pharmacie',     type: 'text', required: true },
        { name: 'date_rapport',     label: 'Date du rapport',           type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Stock Médicaments',
            title: '{{nom_etablissement}} — Stock {{mois}}',
            colorHeader: 'C62828',
            headers: ['Médicament', 'Stock initial', 'Entrées', 'Sorties', 'Stock final', 'Seuil alerte', 'Statut'],
            rows: [
              ['Paracétamol 500mg',    '{{stock_parac}}',    '{{entrees_parac}}',    '{{sorties_parac}}',    '=B{r}+C{r}-D{r}', 50, '=IF(E{r}<F{r},"ALERTE","OK")'],
              ['Amoxicilline 250mg',   '{{stock_amox}}',     '{{entrees_amox}}',     '{{sorties_amox}}',     '=B{r}+C{r}-D{r}', 30, '=IF(E{r}<F{r},"ALERTE","OK")'],
              ['Cotrimoxazole 480mg',  '{{stock_cotri}}',    '{{entrees_cotri}}',    '{{sorties_cotri}}',    '=B{r}+C{r}-D{r}', 40, '=IF(E{r}<F{r},"ALERTE","OK")'],
              ['Métronidazole 250mg',  '{{stock_metronid}}', '{{entrees_metronid}}', '{{sorties_metronid}}', '=B{r}+C{r}-D{r}', 20, '=IF(E{r}<F{r},"ALERTE","OK")'],
            ],
            totalsRow: false,
            colWidths: [32, 14, 12, 12, 14, 14, 12],
            footer: 'Responsable: {{responsable}} — Date: {{date_rapport}}',
          },
        ],
      }),
    },

    // ─── 2. Tableau de bord épidémiologique ────────────────────────────────────
    {
      code: 'sante_xl_002',
      name: 'Tableau de Bord Épidémiologique',
      description: 'Suivi des cas, guérisons et décès par maladie pour la surveillance épidémiologique.',
      category: 'sante',
      templateType: 'excel',
      price: 6000,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_district',     label: 'Nom du district sanitaire', type: 'text', required: true },
        { name: 'semaine',          label: 'Semaine épidémiologique',    type: 'text', required: true },
        { name: 'annee',            label: 'Année',                     type: 'text', required: true },
        { name: 'cas_paludisme',    label: 'Cas Paludisme',             type: 'text', required: true },
        { name: 'gueris_paludisme', label: 'Guérisons Paludisme',       type: 'text', required: true },
        { name: 'deces_paludisme',  label: 'Décès Paludisme',           type: 'text', required: true },
        { name: 'cas_covid',        label: 'Cas COVID-19',              type: 'text', required: false },
        { name: 'gueris_covid',     label: 'Guérisons COVID-19',        type: 'text', required: false },
        { name: 'deces_covid',      label: 'Décès COVID-19',            type: 'text', required: false },
        { name: 'cas_cholera',      label: 'Cas Choléra',               type: 'text', required: false },
        { name: 'gueris_cholera',   label: 'Guérisons Choléra',         type: 'text', required: false },
        { name: 'deces_cholera',    label: 'Décès Choléra',             type: 'text', required: false },
        { name: 'cas_rougeole',     label: 'Cas Rougeole',              type: 'text', required: false },
        { name: 'gueris_rougeole',  label: 'Guérisons Rougeole',        type: 'text', required: false },
        { name: 'deces_rougeole',   label: 'Décès Rougeole',            type: 'text', required: false },
        { name: 'epidemiologiste',  label: 'Épidémiologiste responsable', type: 'text', required: true },
        { name: 'date_rapport',     label: 'Date du rapport',           type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Données Épidémio',
            title: 'Tableau de Bord Épidémiologique — {{nom_district}} — Semaine {{semaine}}/{{annee}}',
            colorHeader: '1A237E',
            headers: ['Maladie', 'Nouveaux cas', 'Guérisons', 'Décès', 'Létalité (%)', 'Tx guérison (%)'],
            rows: [
              ['Paludisme',  '{{cas_paludisme}}',  '{{gueris_paludisme}}', '{{deces_paludisme}}', '=IF(B{r}=0,0,ROUND(D{r}/B{r}*100,1))', '=IF(B{r}=0,0,ROUND(C{r}/B{r}*100,1))'],
              ['COVID-19',   '{{cas_covid}}',      '{{gueris_covid}}',     '{{deces_covid}}',     '=IF(B{r}=0,0,ROUND(D{r}/B{r}*100,1))', '=IF(B{r}=0,0,ROUND(C{r}/B{r}*100,1))'],
              ['Choléra',    '{{cas_cholera}}',    '{{gueris_cholera}}',   '{{deces_cholera}}',   '=IF(B{r}=0,0,ROUND(D{r}/B{r}*100,1))', '=IF(B{r}=0,0,ROUND(C{r}/B{r}*100,1))'],
              ['Rougeole',   '{{cas_rougeole}}',   '{{gueris_rougeole}}',  '{{deces_rougeole}}',  '=IF(B{r}=0,0,ROUND(D{r}/B{r}*100,1))', '=IF(B{r}=0,0,ROUND(C{r}/B{r}*100,1))'],
              ['TOTAL',      '=SUM(B2:B5)',         '=SUM(C2:C5)',          '=SUM(D2:D5)',          '=IF(B{r}=0,0,ROUND(D{r}/B{r}*100,1))', '=IF(B{r}=0,0,ROUND(C{r}/B{r}*100,1))'],
            ],
            totalsRow: false,
            colWidths: [24, 14, 14, 12, 16, 18],
            footer: 'Épidémiologiste: {{epidemiologiste}} — Rapport du {{date_rapport}}',
          },
        ],
      }),
    },

    // ─── 3. Budget clinique / hôpital ──────────────────────────────────────────
    {
      code: 'sante_xl_003',
      name: 'Budget Clinique / Hôpital',
      description: 'Suivi mensuel des recettes et dépenses d\'une clinique ou d\'un hôpital avec solde automatique.',
      category: 'sante',
      templateType: 'excel',
      price: 7500,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_etablissement',   label: 'Nom de l\'établissement',   type: 'text', required: true },
        { name: 'mois',               label: 'Mois de référence',         type: 'text', required: true },
        { name: 'rec_consultations',  label: 'Recettes consultations',    type: 'text', required: true },
        { name: 'rec_hospitalisations', label: 'Recettes hospitalisations', type: 'text', required: true },
        { name: 'rec_pharmacie',      label: 'Recettes pharmacie',        type: 'text', required: true },
        { name: 'rec_labo',           label: 'Recettes laboratoire',      type: 'text', required: false },
        { name: 'rec_autres',         label: 'Autres recettes',           type: 'text', required: false },
        { name: 'dep_salaires',       label: 'Dépenses salaires',         type: 'text', required: true },
        { name: 'dep_medicaments',    label: 'Dépenses médicaments',      type: 'text', required: true },
        { name: 'dep_consommables',   label: 'Dépenses consommables',     type: 'text', required: true },
        { name: 'dep_maintenance',    label: 'Dépenses maintenance',      type: 'text', required: false },
        { name: 'dep_energie',        label: 'Dépenses énergie',          type: 'text', required: false },
        { name: 'dep_autres',         label: 'Autres dépenses',           type: 'text', required: false },
        { name: 'directeur',          label: 'Directeur administratif',   type: 'text', required: true },
        { name: 'date_rapport',       label: 'Date du rapport',           type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Recettes',
            title: '{{nom_etablissement}} — Recettes {{mois}}',
            colorHeader: '2E7D32',
            headers: ['Poste de recette', 'Montant (FCFA)'],
            rows: [
              ['Consultations',     '{{rec_consultations}}'],
              ['Hospitalisations',  '{{rec_hospitalisations}}'],
              ['Pharmacie',         '{{rec_pharmacie}}'],
              ['Laboratoire',       '{{rec_labo}}'],
              ['Autres recettes',   '{{rec_autres}}'],
              ['TOTAL RECETTES',    '=SUM(B2:B6)'],
            ],
            totalsRow: false,
            colWidths: [36, 20],
          },
          {
            name: 'Dépenses',
            title: '{{nom_etablissement}} — Dépenses {{mois}}',
            colorHeader: 'B71C1C',
            headers: ['Poste de dépense', 'Montant (FCFA)'],
            rows: [
              ['Salaires et charges',     '{{dep_salaires}}'],
              ['Médicaments',             '{{dep_medicaments}}'],
              ['Consommables médicaux',   '{{dep_consommables}}'],
              ['Maintenance équipements', '{{dep_maintenance}}'],
              ['Énergie (eau/élec/carb)', '{{dep_energie}}'],
              ['Autres dépenses',         '{{dep_autres}}'],
              ['TOTAL DÉPENSES',          '=SUM(B2:B7)'],
            ],
            totalsRow: false,
            colWidths: [36, 20],
          },
          {
            name: 'Synthèse',
            title: '{{nom_etablissement}} — Synthèse Budgétaire {{mois}}',
            colorHeader: '37474F',
            headers: ['Indicateur', 'Montant (FCFA)'],
            rows: [
              ['Total Recettes',   '=Recettes!B7'],
              ['Total Dépenses',   '=Dépenses!B8'],
              ['SOLDE NET',        '=B2-B3'],
              ['Taux couverture (%)', '=IF(B3=0,0,ROUND(B2/B3*100,1))'],
            ],
            totalsRow: false,
            colWidths: [36, 20],
            footer: 'Directeur: {{directeur}} — {{date_rapport}}',
          },
        ],
      }),
    },

    // ─── 4. Planning personnel médical ─────────────────────────────────────────
    {
      code: 'sante_xl_004',
      name: 'Planning Personnel Médical',
      description: 'Tableau de planning mensuel des gardes et astreintes du personnel médical et paramédical.',
      category: 'sante',
      templateType: 'excel',
      price: 5000,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
        { name: 'mois',             label: 'Mois de planning',         type: 'text', required: true },
        { name: 'annee',            label: 'Année',                    type: 'text', required: true },
        { name: 'medecin_1',        label: 'Médecin 1 (nom)',          type: 'text', required: true },
        { name: 'medecin_2',        label: 'Médecin 2 (nom)',          type: 'text', required: true },
        { name: 'medecin_3',        label: 'Médecin 3 (nom)',          type: 'text', required: false },
        { name: 'infirmier_1',      label: 'Infirmier 1 (nom)',        type: 'text', required: true },
        { name: 'infirmier_2',      label: 'Infirmier 2 (nom)',        type: 'text', required: true },
        { name: 'infirmier_3',      label: 'Infirmier 3 (nom)',        type: 'text', required: false },
        { name: 'sage_femme_1',     label: 'Sage-femme 1 (nom)',       type: 'text', required: false },
        { name: 'sage_femme_2',     label: 'Sage-femme 2 (nom)',       type: 'text', required: false },
        { name: 'chef_service',     label: 'Chef de service',          type: 'text', required: true },
        { name: 'date_validation',  label: 'Date de validation',       type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Planning Gardes',
            title: 'Planning Gardes & Astreintes — {{nom_etablissement}} — {{mois}} {{annee}}',
            colorHeader: '4527A0',
            headers: ['Personnel', 'Poste', 'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Total gardes'],
            rows: [
              ['{{medecin_1}}',    'Médecin',     'G', 'R', 'G', 'R', '-', '=COUNTIF(C{r}:G{r},"G")'],
              ['{{medecin_2}}',    'Médecin',     'R', 'G', 'R', 'G', 'G', '=COUNTIF(C{r}:G{r},"G")'],
              ['{{medecin_3}}',    'Médecin',     'A', 'A', 'G', 'R', 'R', '=COUNTIF(C{r}:G{r},"G")'],
              ['{{infirmier_1}}',  'Infirmier(e)', 'G', 'G', 'R', 'A', 'G', '=COUNTIF(C{r}:G{r},"G")'],
              ['{{infirmier_2}}',  'Infirmier(e)', 'R', 'A', 'G', 'G', 'R', '=COUNTIF(C{r}:G{r},"G")'],
              ['{{infirmier_3}}',  'Infirmier(e)', 'A', 'G', 'A', 'R', 'G', '=COUNTIF(C{r}:G{r},"G")'],
              ['{{sage_femme_1}}', 'Sage-femme',  'G', 'R', 'A', 'G', 'A', '=COUNTIF(C{r}:G{r},"G")'],
              ['{{sage_femme_2}}', 'Sage-femme',  'R', 'G', 'G', 'A', 'R', '=COUNTIF(C{r}:G{r},"G")'],
            ],
            totalsRow: false,
            colWidths: [28, 16, 10, 10, 10, 10, 10, 14],
            notes: 'G=Garde  R=Repos  A=Astreinte',
            footer: 'Chef de service: {{chef_service}} — Validé le {{date_validation}}',
          },
        ],
      }),
    },

    // ─── 5. Suivi consultations et recettes journalières ───────────────────────
    {
      code: 'sante_xl_005',
      name: 'Suivi Consultations et Recettes Journalières',
      description: 'Suivi quotidien du nombre de consultations par type et des recettes associées.',
      category: 'sante',
      templateType: 'excel',
      price: 3500,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
        { name: 'mois',             label: 'Mois de référence',        type: 'text', required: true },
        { name: 'tarif_curatif',    label: 'Tarif consultation curative (FCFA)', type: 'text', required: true },
        { name: 'tarif_prenatal',   label: 'Tarif CPN (FCFA)',         type: 'text', required: true },
        { name: 'tarif_vaccination', label: 'Tarif vaccination (FCFA)', type: 'text', required: false },
        { name: 'tarif_planning',   label: 'Tarif planning familial (FCFA)', type: 'text', required: false },
        { name: 'caissier',         label: 'Responsable caisse',       type: 'text', required: true },
        { name: 'date_rapport',     label: 'Date du rapport',          type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Consultations Journalières',
            title: '{{nom_etablissement}} — Consultations & Recettes {{mois}}',
            colorHeader: '00695C',
            headers: ['Jour', 'Consult. curatives', 'CPN', 'Vaccinations', 'Planning familial', 'Total consult.', 'Recettes (FCFA)'],
            rows: [
              ['01', 0, 0, 0, 0, '=SUM(B{r}:E{r})', '=B{r}*{{tarif_curatif}}+C{r}*{{tarif_prenatal}}+D{r}*{{tarif_vaccination}}+E{r}*{{tarif_planning}}'],
              ['02', 0, 0, 0, 0, '=SUM(B{r}:E{r})', '=B{r}*{{tarif_curatif}}+C{r}*{{tarif_prenatal}}+D{r}*{{tarif_vaccination}}+E{r}*{{tarif_planning}}'],
              ['03', 0, 0, 0, 0, '=SUM(B{r}:E{r})', '=B{r}*{{tarif_curatif}}+C{r}*{{tarif_prenatal}}+D{r}*{{tarif_vaccination}}+E{r}*{{tarif_planning}}'],
              ['04', 0, 0, 0, 0, '=SUM(B{r}:E{r})', '=B{r}*{{tarif_curatif}}+C{r}*{{tarif_prenatal}}+D{r}*{{tarif_vaccination}}+E{r}*{{tarif_planning}}'],
              ['05', 0, 0, 0, 0, '=SUM(B{r}:E{r})', '=B{r}*{{tarif_curatif}}+C{r}*{{tarif_prenatal}}+D{r}*{{tarif_vaccination}}+E{r}*{{tarif_planning}}'],
              ['TOTAL', '=SUM(B2:B6)', '=SUM(C2:C6)', '=SUM(D2:D6)', '=SUM(E2:E6)', '=SUM(F2:F6)', '=SUM(G2:G6)'],
            ],
            totalsRow: false,
            colWidths: [8, 20, 12, 16, 20, 16, 18],
            footer: 'Caissier: {{caissier}} — Rapport du {{date_rapport}}',
          },
        ],
      }),
    },

    // ─── 6. Inventaire matériel médical ────────────────────────────────────────
    {
      code: 'sante_xl_006',
      name: 'Inventaire Matériel Médical',
      description: 'Inventaire complet des équipements et matériels médicaux avec état et valeur résiduelle.',
      category: 'sante',
      templateType: 'excel',
      price: 5500,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
        { name: 'date_inventaire',  label: 'Date de l\'inventaire',    type: 'date', required: true },
        { name: 'service',          label: 'Service / Département',    type: 'text', required: true },
        { name: 'responsable',      label: 'Responsable inventaire',   type: 'text', required: true },
        { name: 'validateur',       label: 'Validateur (Directeur)',   type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Inventaire Matériel',
            title: '{{nom_etablissement}} — Inventaire Matériel Médical — {{service}}',
            colorHeader: 'E65100',
            headers: ['N°', 'Désignation', 'Marque/Modèle', 'N° série', 'Qté', 'État', 'Valeur achat (FCFA)', 'Année acq.', 'Valeur résiduelle', 'Observations'],
            rows: [
              [1,  'Tensiomètre électronique', '',  '', 2, 'Bon',         150000, 2022, '=IF(H{r}="","",ROUND(G{r}*(1-0.1*(2024-H{r})),0))', ''],
              [2,  'Stéthoscope',              '',  '', 5, 'Bon',          45000, 2023, '=IF(H{r}="","",ROUND(G{r}*(1-0.1*(2024-H{r})),0))', ''],
              [3,  'Glucomètre',               '',  '', 3, 'Bon',          80000, 2021, '=IF(H{r}="","",ROUND(G{r}*(1-0.1*(2024-H{r})),0))', ''],
              [4,  'Oxymètre de pouls',        '',  '', 4, 'Bon',          60000, 2023, '=IF(H{r}="","",ROUND(G{r}*(1-0.1*(2024-H{r})),0))', ''],
              [5,  'Thermomètre infrarouge',   '',  '', 6, 'Bon',          35000, 2022, '=IF(H{r}="","",ROUND(G{r}*(1-0.1*(2024-H{r})),0))', ''],
              [6,  'Échographe portable',      '',  '', 1, 'Bon',        4500000, 2020, '=IF(H{r}="","",ROUND(G{r}*(1-0.1*(2024-H{r})),0))', ''],
              [7,  'Table d\'examen',           '',  '', 3, 'Satisfaisant', 280000, 2019, '=IF(H{r}="","",ROUND(G{r}*(1-0.1*(2024-H{r})),0))', ''],
              [8,  'Autoclave',                '',  '', 1, 'Bon',         850000, 2021, '=IF(H{r}="","",ROUND(G{r}*(1-0.1*(2024-H{r})),0))', ''],
              ['', 'TOTAL VALEUR',             '',  '', '=SUM(E2:E9)', '', '=SUM(G2:G9)', '', '=SUM(I2:I9)', ''],
            ],
            totalsRow: false,
            colWidths: [6, 30, 20, 16, 8, 14, 20, 12, 20, 22],
            footer: 'Responsable: {{responsable}} — Validé par: {{validateur}} — {{date_inventaire}}',
          },
        ],
      }),
    },

    // ─── 7. Tableau de bord indicateurs santé publique ─────────────────────────
    {
      code: 'sante_xl_007',
      name: 'Tableau de Bord Indicateurs Santé Publique',
      description: 'Tableau de bord trimestriel des indicateurs clés de santé publique (couverture vaccinale, mortalité, etc.).',
      category: 'sante',
      templateType: 'excel',
      price: 9000,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_region',          label: 'Nom de la région / district', type: 'text', required: true },
        { name: 'trimestre',           label: 'Trimestre (ex: T1 2025)',      type: 'text', required: true },
        { name: 'population_cible',    label: 'Population cible',            type: 'text', required: true },
        { name: 'enfants_vaccines',    label: 'Enfants vaccinés (0-11 mois)', type: 'text', required: true },
        { name: 'femmes_cpn',          label: 'Femmes ayant fait ≥4 CPN',    type: 'text', required: true },
        { name: 'accouchements_assists', label: 'Accouchements assistés',    type: 'text', required: true },
        { name: 'naissances_vivantes', label: 'Naissances vivantes',         type: 'text', required: true },
        { name: 'deces_maternels',     label: 'Décès maternels',             type: 'text', required: true },
        { name: 'deces_neonatals',     label: 'Décès néonatals',             type: 'text', required: true },
        { name: 'enfants_malnutris',   label: 'Enfants malnutris (<5 ans)',  type: 'text', required: true },
        { name: 'enfants_moins5',      label: 'Enfants <5 ans (effectif)',   type: 'text', required: true },
        { name: 'latrines_villages',   label: 'Villages avec latrines',      type: 'text', required: false },
        { name: 'total_villages',      label: 'Total villages',              type: 'text', required: false },
        { name: 'directeur_sante',     label: 'Directeur Santé Régional',    type: 'text', required: true },
        { name: 'date_rapport',        label: 'Date du rapport',             type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Indicateurs Santé',
            title: 'Tableau de Bord Santé Publique — {{nom_region}} — {{trimestre}}',
            colorHeader: '006064',
            headers: ['Indicateur', 'Numérateur', 'Dénominateur', 'Valeur calculée', 'Cible (%)', 'Écart (%)', 'Statut'],
            rows: [
              ['Couverture vaccinale (PEV)',       '{{enfants_vaccines}}',    '{{population_cible}}',     '=ROUND(B{r}/C{r}*100,1)', 95, '=D{r}-E{r}', '=IF(D{r}>=E{r},"ATTEINT","À améliorer")'],
              ['Couverture CPN ≥4 visites',        '{{femmes_cpn}}',          '{{naissances_vivantes}}',  '=ROUND(B{r}/C{r}*100,1)', 80, '=D{r}-E{r}', '=IF(D{r}>=E{r},"ATTEINT","À améliorer")'],
              ['Accouchements assistés',           '{{accouchements_assists}}', '{{naissances_vivantes}}', '=ROUND(B{r}/C{r}*100,1)', 90, '=D{r}-E{r}', '=IF(D{r}>=E{r},"ATTEINT","À améliorer")'],
              ['Taux mortalité maternelle (/100K)', '{{deces_maternels}}',    '{{naissances_vivantes}}',  '=ROUND(B{r}/C{r}*100000,0)', 300, '=E{r}-D{r}', '=IF(D{r}<=E{r},"ATTEINT","À améliorer")'],
              ['Taux mortalité néonatale (/1000)',  '{{deces_neonatals}}',    '{{naissances_vivantes}}',  '=ROUND(B{r}/C{r}*1000,1)', 15, '=E{r}-D{r}', '=IF(D{r}<=E{r},"ATTEINT","À améliorer")'],
              ['Prévalence malnutrition (<5 ans)', '{{enfants_malnutris}}',   '{{enfants_moins5}}',       '=ROUND(B{r}/C{r}*100,1)', 10, '=E{r}-D{r}', '=IF(D{r}<=E{r},"ATTEINT","À améliorer")'],
              ['Couverture assainissement',        '{{latrines_villages}}',   '{{total_villages}}',       '=ROUND(B{r}/C{r}*100,1)', 70, '=D{r}-E{r}', '=IF(D{r}>=E{r},"ATTEINT","À améliorer")'],
            ],
            totalsRow: false,
            colWidths: [38, 14, 16, 18, 12, 12, 18],
            footer: 'Directeur Santé: {{directeur_sante}} — Rapport du {{date_rapport}}',
          },
        ],
      }),
    },
  ];

  for (const t of templates) {
    const r = await prisma.documentTemplate.upsert({
      where:  { code: t.code },
      update: t,
      create: t,
    });
    if (r.createdAt.getTime() === r.updatedAt.getTime()) {
      created++;
    } else {
      updated++;
    }
  }

  console.log(
    `Excel Santé OK — créés:${created} mis-à-jour:${updated} TOTAL:${await prisma.documentTemplate.count()}`
  );
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
