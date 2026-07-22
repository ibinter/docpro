import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  // ── MINES ─────────────────────────────────────────────────────────────────

  // 1. xl_min_production — Rapport production mensuelle
  {
    code: 'xl_min_production',
    name: 'Rapport production mensuelle',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi mensuel de la production minière par zone : minerai extrait, teneurs et production métal',
    price: 1500, priceMax: 2000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_mine', label: 'Nom de la mine', type: 'text', required: true },
      { name: 'mois', label: 'Mois de production', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable production', type: 'text', required: true },
      { name: 'minerai', label: 'Type de minerai', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Production Mensuelle',
          title: 'Rapport de Production Mensuelle',
          colorHeader: '5D4037',
          headers: ['Zone / Bloc', 'Minerai extrait (t)', 'Teneur (g/t)', 'Production métal (kg)', 'Objectif (kg)', 'Réalisation %'],
          rows: [
            ['Zone A', 0, 0, '=B{r}*C{r}/1000', 0, '=IFERROR(D{r}/E{r}*100,0)'],
            ['Zone B', 0, 0, '=B{r}*C{r}/1000', 0, '=IFERROR(D{r}/E{r}*100,0)'],
            ['Zone C', 0, 0, '=B{r}*C{r}/1000', 0, '=IFERROR(D{r}/E{r}*100,0)'],
            ['Zone D', 0, 0, '=B{r}*C{r}/1000', 0, '=IFERROR(D{r}/E{r}*100,0)'],
            ['Zone E', 0, 0, '=B{r}*C{r}/1000', 0, '=IFERROR(D{r}/E{r}*100,0)'],
            ['Zone F', 0, 0, '=B{r}*C{r}/1000', 0, '=IFERROR(D{r}/E{r}*100,0)'],
            ['Zone G', 0, 0, '=B{r}*C{r}/1000', 0, '=IFERROR(D{r}/E{r}*100,0)'],
            ['Zone H', 0, 0, '=B{r}*C{r}/1000', 0, '=IFERROR(D{r}/E{r}*100,0)'],
            ['TOTAL', '=SUM(B2:B9)', '', '=SUM(D2:D9)', '=SUM(E2:E9)', '=IFERROR(D10/E10*100,0)'],
          ],
          totalsRow: true,
          colWidths: [20, 20, 14, 22, 16, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  // 2. xl_min_cout_extraction — Coût d'extraction
  {
    code: 'xl_min_cout_extraction',
    name: "Coût d'extraction minière",
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: "Analyse détaillée des coûts d'extraction par poste : main d'œuvre, énergie, matériaux",
    price: 1200, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_mine', label: 'Nom de la mine', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'unite', label: 'Unité de production', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Coût Extraction',
          title: "Coûts d'Extraction Minière",
          colorHeader: '5D4037',
          headers: ['Poste de coût', 'Unité', 'Coût unitaire (FCFA)', 'Volume', 'Total (FCFA)', '% du total'],
          rows: [
            ["Main d'œuvre exploitation", 'Heure', 0, 0, '=C{r}*D{r}', '=IFERROR(E{r}/E12*100,0)'],
            ['Explosifs & forages', 'Kg', 0, 0, '=C{r}*D{r}', '=IFERROR(E{r}/E12*100,0)'],
            ['Carburant engins', 'Litre', 0, 0, '=C{r}*D{r}', '=IFERROR(E{r}/E12*100,0)'],
            ['Maintenance équipements', 'Forfait', 0, 0, '=C{r}*D{r}', '=IFERROR(E{r}/E12*100,0)'],
            ['Transport minerai', 'Tonne', 0, 0, '=C{r}*D{r}', '=IFERROR(E{r}/E12*100,0)'],
            ['Traitement & concassage', 'Tonne', 0, 0, '=C{r}*D{r}', '=IFERROR(E{r}/E12*100,0)'],
            ['Eau & énergie', 'kWh', 0, 0, '=C{r}*D{r}', '=IFERROR(E{r}/E12*100,0)'],
            ['Réactifs chimiques', 'Kg', 0, 0, '=C{r}*D{r}', '=IFERROR(E{r}/E12*100,0)'],
            ['Sécurité & environnement', 'Forfait', 0, 0, '=C{r}*D{r}', '=IFERROR(E{r}/E12*100,0)'],
            ['Administration mine', 'Forfait', 0, 0, '=C{r}*D{r}', '=IFERROR(E{r}/E12*100,0)'],
            ['TOTAL COÛTS', '', '', '', '=SUM(E2:E11)', '100%'],
          ],
          totalsRow: true,
          colWidths: [28, 12, 20, 14, 20, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 3. xl_min_inventaire_equipements — Inventaire équipements miniers
  {
    code: 'xl_min_inventaire_equipements',
    name: 'Inventaire équipements miniers',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Inventaire complet des engins et équipements : valeur, état, maintenance et disponibilité',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_mine', label: 'Nom de la mine', type: 'text', required: true },
      { name: 'date_inventaire', label: "Date d'inventaire", type: 'date', required: true },
      { name: 'responsable', label: 'Responsable matériel', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Inventaire Équipements',
          title: 'Inventaire des Équipements Miniers',
          colorHeader: '5D4037',
          headers: ['Engin / Équipement', 'N° Série', 'Valeur achat (FCFA)', 'Valeur actuelle (FCFA)', 'État', 'Dernière maintenance', 'Prochaine maintenance', 'Disponibilité %'],
          rows: [
            ['Pelle hydraulique', '', 0, 0, 'Bon', '', '', 0],
            ['Camion benne 50t', '', 0, 0, 'Bon', '', '', 0],
            ['Foreuse rotative', '', 0, 0, 'Bon', '', '', 0],
            ['Bulldozer D9', '', 0, 0, 'Bon', '', '', 0],
            ['Chargeuse sur pneus', '', 0, 0, 'Bon', '', '', 0],
            ['Concasseur primaire', '', 0, 0, 'Bon', '', '', 0],
            ['Groupe électrogène', '', 0, 0, 'Bon', '', '', 0],
            ['Pompe de relevage', '', 0, 0, 'Bon', '', '', 0],
            ['Camion citerne eau', '', 0, 0, 'Bon', '', '', 0],
            ['TOTAL', '', '=SUM(C2:C10)', '=SUM(D2:D10)', '', '', '', '=AVERAGE(H2:H10)'],
          ],
          totalsRow: true,
          colWidths: [24, 14, 20, 20, 12, 20, 20, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 4. xl_min_consommation_carburant — Suivi consommation carburant
  {
    code: 'xl_min_consommation_carburant',
    name: 'Suivi consommation carburant',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi détaillé de la consommation carburant par véhicule/engin : litres, heures et coûts',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_mine', label: 'Nom de la mine / Chantier', type: 'text', required: true },
      { name: 'mois', label: 'Mois', type: 'text', required: true },
      { name: 'prix_litre', label: 'Prix du litre (FCFA)', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Consommation Carburant',
          title: 'Suivi Consommation Carburant',
          colorHeader: '5D4037',
          headers: ['Véhicule / Engin', 'Immatriculation', 'Litres consommés', 'Heures/km travaillés', 'Consommation unit.', 'Coût (FCFA)', 'Coût prévu (FCFA)', 'Écart (FCFA)'],
          rows: [
            ['Pelle CAT 390', '', 0, 0, '=IFERROR(C{r}/D{r},0)', '=C{r}*$C$1', 0, '=G{r}-F{r}'],
            ['Camion 001', '', 0, 0, '=IFERROR(C{r}/D{r},0)', '=C{r}*$C$1', 0, '=G{r}-F{r}'],
            ['Camion 002', '', 0, 0, '=IFERROR(C{r}/D{r},0)', '=C{r}*$C$1', 0, '=G{r}-F{r}'],
            ['Camion 003', '', 0, 0, '=IFERROR(C{r}/D{r},0)', '=C{r}*$C$1', 0, '=G{r}-F{r}'],
            ['Bulldozer D9', '', 0, 0, '=IFERROR(C{r}/D{r},0)', '=C{r}*$C$1', 0, '=G{r}-F{r}'],
            ['Chargeuse', '', 0, 0, '=IFERROR(C{r}/D{r},0)', '=C{r}*$C$1', 0, '=G{r}-F{r}'],
            ['Foreuse', '', 0, 0, '=IFERROR(C{r}/D{r},0)', '=C{r}*$C$1', 0, '=G{r}-F{r}'],
            ['Groupe électrogène', '', 0, 0, '=IFERROR(C{r}/D{r},0)', '=C{r}*$C$1', 0, '=G{r}-F{r}'],
            ['TOTAL', '', '=SUM(C2:C9)', '=SUM(D2:D9)', '', '=SUM(F2:F9)', '=SUM(G2:G9)', '=SUM(H2:H9)'],
          ],
          totalsRow: true,
          colWidths: [24, 16, 20, 22, 18, 18, 18, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 5. xl_min_main_oeuvre_mine — Main d'œuvre mine
  {
    code: 'xl_min_main_oeuvre_mine',
    name: "Main d'œuvre mine",
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: "Gestion de la masse salariale minière par catégorie : effectifs, salaires et charges sociales",
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_mine', label: 'Nom de la mine', type: 'text', required: true },
      { name: 'mois', label: 'Mois / Période', type: 'text', required: true },
      { name: 'taux_charges', label: 'Taux charges patronales (%)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Main Oeuvre Mine',
          title: "Main d'Œuvre — Mine",
          colorHeader: '5D4037',
          headers: ['Catégorie professionnelle', 'Effectif', 'Salaire moyen (FCFA)', 'Masse salariale', 'Charges patronales', 'Total charges', '% masse totale'],
          rows: [
            ['Ingénieurs mines', 0, 0, '=B{r}*C{r}', '=D{r}*0.3', '=D{r}+E{r}', '=IFERROR(F{r}/F11*100,0)'],
            ['Techniciens géologie', 0, 0, '=B{r}*C{r}', '=D{r}*0.3', '=D{r}+E{r}', '=IFERROR(F{r}/F11*100,0)'],
            ['Opérateurs engins', 0, 0, '=B{r}*C{r}', '=D{r}*0.3', '=D{r}+E{r}', '=IFERROR(F{r}/F11*100,0)'],
            ['Techniciens maintenance', 0, 0, '=B{r}*C{r}', '=D{r}*0.3', '=D{r}+E{r}', '=IFERROR(F{r}/F11*100,0)'],
            ['Agents de sécurité', 0, 0, '=B{r}*C{r}', '=D{r}*0.3', '=D{r}+E{r}', '=IFERROR(F{r}/F11*100,0)'],
            ['Manœuvres spécialisés', 0, 0, '=B{r}*C{r}', '=D{r}*0.3', '=D{r}+E{r}', '=IFERROR(F{r}/F11*100,0)'],
            ['Administration terrain', 0, 0, '=B{r}*C{r}', '=D{r}*0.3', '=D{r}+E{r}', '=IFERROR(F{r}/F11*100,0)'],
            ['Personnel médical', 0, 0, '=B{r}*C{r}', '=D{r}*0.3', '=D{r}+E{r}', '=IFERROR(F{r}/F11*100,0)'],
            ['TOTAL', '=SUM(B2:B9)', '', '=SUM(D2:D9)', '=SUM(E2:E9)', '=SUM(F2:F9)', '100%'],
          ],
          totalsRow: true,
          colWidths: [28, 10, 22, 22, 20, 18, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 67,
  },

  // 6. xl_min_qualite_minerai — Contrôle qualité minerai
  {
    code: 'xl_min_qualite_minerai',
    name: 'Contrôle qualité minerai',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: "Suivi des analyses et contrôles qualité du minerai par point de prélèvement",
    price: 1200, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_mine', label: 'Nom de la mine', type: 'text', required: true },
      { name: 'periode', label: 'Période analyse', type: 'text', required: true },
      { name: 'laboratoire', label: 'Laboratoire', type: 'text', required: false },
      { name: 'teneur_cible', label: 'Teneur cible (g/t)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Qualité Minerai',
          title: 'Contrôle Qualité Minerai',
          colorHeader: '5D4037',
          headers: ['N° Échantillon', 'Point prélèvement', 'Date analyse', 'Teneur or (g/t)', 'Teneur cible (g/t)', 'Écart', 'Conformité', 'Observations'],
          rows: [
            ['ECH-001', '', '', 0, 0, '=D{r}-E{r}', '=IF(ABS(F{r})<=0.5,"CONFORME","NON CONFORME")', ''],
            ['ECH-002', '', '', 0, 0, '=D{r}-E{r}', '=IF(ABS(F{r})<=0.5,"CONFORME","NON CONFORME")', ''],
            ['ECH-003', '', '', 0, 0, '=D{r}-E{r}', '=IF(ABS(F{r})<=0.5,"CONFORME","NON CONFORME")', ''],
            ['ECH-004', '', '', 0, 0, '=D{r}-E{r}', '=IF(ABS(F{r})<=0.5,"CONFORME","NON CONFORME")', ''],
            ['ECH-005', '', '', 0, 0, '=D{r}-E{r}', '=IF(ABS(F{r})<=0.5,"CONFORME","NON CONFORME")', ''],
            ['ECH-006', '', '', 0, 0, '=D{r}-E{r}', '=IF(ABS(F{r})<=0.5,"CONFORME","NON CONFORME")', ''],
            ['ECH-007', '', '', 0, 0, '=D{r}-E{r}', '=IF(ABS(F{r})<=0.5,"CONFORME","NON CONFORME")', ''],
            ['ECH-008', '', '', 0, 0, '=D{r}-E{r}', '=IF(ABS(F{r})<=0.5,"CONFORME","NON CONFORME")', ''],
            ['MOYENNE', '', '', '=AVERAGE(D2:D9)', '=AVERAGE(E2:E9)', '=AVERAGE(F2:F9)', '', ''],
          ],
          totalsRow: false,
          colWidths: [14, 20, 14, 16, 16, 12, 20, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  // 7. xl_min_pertes_dilution — Suivi pertes et dilution
  {
    code: 'xl_min_pertes_dilution',
    name: 'Suivi pertes et dilution',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Analyse des pertes minières et de la dilution par zone : teneur in situ vs extraite',
    price: 1000, priceMax: 1600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_mine', label: 'Nom de la mine', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'objectif_dilution', label: 'Objectif dilution max (%)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Pertes & Dilution',
          title: 'Suivi des Pertes et de la Dilution',
          colorHeader: '5D4037',
          headers: ['Zone exploitation', 'Tonnage prévu (t)', 'Tonnage extrait (t)', 'Teneur in situ (g/t)', 'Teneur extraite (g/t)', 'Dilution %', 'Pertes (t)', 'Métal perdu (kg)'],
          rows: [
            ['Zone A Nord', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/D{r}*100,0)', '=MAX(B{r}-C{r},0)', '=G{r}*D{r}/1000'],
            ['Zone A Sud', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/D{r}*100,0)', '=MAX(B{r}-C{r},0)', '=G{r}*D{r}/1000'],
            ['Zone B Est', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/D{r}*100,0)', '=MAX(B{r}-C{r},0)', '=G{r}*D{r}/1000'],
            ['Zone B Ouest', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/D{r}*100,0)', '=MAX(B{r}-C{r},0)', '=G{r}*D{r}/1000'],
            ['Zone C Centrale', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/D{r}*100,0)', '=MAX(B{r}-C{r},0)', '=G{r}*D{r}/1000'],
            ['Zone D Profonde', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/D{r}*100,0)', '=MAX(B{r}-C{r},0)', '=G{r}*D{r}/1000'],
            ['TOTAL / MOYENNE', '=SUM(B2:B7)', '=SUM(C2:C7)', '=AVERAGE(D2:D7)', '=AVERAGE(E2:E7)', '=AVERAGE(F2:F7)', '=SUM(G2:G7)', '=SUM(H2:H7)'],
          ],
          totalsRow: true,
          colWidths: [20, 18, 18, 18, 18, 12, 14, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 61,
  },

  // 8. xl_min_budget_mine — Budget exploitation minière
  {
    code: 'xl_min_budget_mine',
    name: 'Budget exploitation minière',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi budgétaire de l\'exploitation minière : prévisions, réalisations et écarts par rubrique',
    price: 1500, priceMax: 2000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_mine', label: 'Nom de la mine', type: 'text', required: true },
      { name: 'annee', label: 'Année budgétaire', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable budget', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Budget Mine',
          title: 'Budget Exploitation Minière',
          colorHeader: '5D4037',
          headers: ['Rubrique budgétaire', 'Budget (FCFA)', 'Réalisé (FCFA)', 'Écart (FCFA)', '% Réalisation', 'Statut'],
          rows: [
            ['Masse salariale', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IF(E{r}<=105,"OK","DÉPASSÉ")'],
            ['Carburant & lubrifiants', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IF(E{r}<=105,"OK","DÉPASSÉ")'],
            ['Explosifs & forages', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IF(E{r}<=105,"OK","DÉPASSÉ")'],
            ['Maintenance & réparations', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IF(E{r}<=105,"OK","DÉPASSÉ")'],
            ['Réactifs & consommables', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IF(E{r}<=105,"OK","DÉPASSÉ")'],
            ['Transport & logistique', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IF(E{r}<=105,"OK","DÉPASSÉ")'],
            ['Sécurité & environnement', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IF(E{r}<=105,"OK","DÉPASSÉ")'],
            ['Taxes & redevances', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IF(E{r}<=105,"OK","DÉPASSÉ")'],
            ['Réhabilitation mine', 0, 0, '=C{r}-B{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IF(E{r}<=105,"OK","DÉPASSÉ")'],
            ['TOTAL', '=SUM(B2:B10)', '=SUM(C2:C10)', '=SUM(D2:D10)', '=IFERROR(C11/B11*100,0)', '=IF(E11<=105,"OK","DÉPASSÉ")'],
          ],
          totalsRow: true,
          colWidths: [28, 18, 18, 16, 16, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 74,
  },

  // 9. xl_min_redevances — Calcul redevances minières
  {
    code: 'xl_min_redevances',
    name: 'Calcul redevances minières',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Calcul automatique des redevances minières dues à l\'État selon la production et les prix',
    price: 1200, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_mine', label: 'Nom de la mine', type: 'text', required: true },
      { name: 'periode', label: 'Période déclarée', type: 'text', required: true },
      { name: 'pays', label: 'Pays (code)', type: 'text', required: true },
      { name: 'taux_redevance', label: 'Taux redevance (%)', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Redevances Minières',
          title: 'Calcul des Redevances Minières',
          colorHeader: '5D4037',
          headers: ['Minerai / Produit', 'Production (kg/t)', 'Prix unitaire (FCFA)', 'Valeur brute (FCFA)', 'Taux redevance %', 'Montant État (FCFA)', 'Date versement', 'Statut'],
          rows: [
            ['Or (kg)', 0, 0, '=B{r}*C{r}', 3, '=D{r}*E{r}/100', '', 'À verser'],
            ['Argent (kg)', 0, 0, '=B{r}*C{r}', 3, '=D{r}*E{r}/100', '', 'À verser'],
            ['Cuivre (t)', 0, 0, '=B{r}*C{r}', 2, '=D{r}*E{r}/100', '', 'À verser'],
            ['Manganèse (t)', 0, 0, '=B{r}*C{r}', 2, '=D{r}*E{r}/100', '', 'À verser'],
            ['Bauxite (t)', 0, 0, '=B{r}*C{r}', 1.5, '=D{r}*E{r}/100', '', 'À verser'],
            ['Diamant (carats)', 0, 0, '=B{r}*C{r}', 5, '=D{r}*E{r}/100', '', 'À verser'],
            ['Autres minerais', 0, 0, '=B{r}*C{r}', 2, '=D{r}*E{r}/100', '', 'À verser'],
            ['TOTAL REDEVANCES', '', '', '=SUM(D2:D8)', '', '=SUM(F2:F8)', '', ''],
          ],
          totalsRow: true,
          colWidths: [20, 16, 20, 20, 16, 22, 16, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 69,
  },

  // 10. xl_min_rehabilitation — Plan réhabilitation mine
  {
    code: 'xl_min_rehabilitation',
    name: 'Plan réhabilitation mine',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification et suivi du budget de réhabilitation des zones minières exploitées',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_mine', label: 'Nom de la mine', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable environnement', type: 'text', required: true },
      { name: 'date_debut', label: 'Date début réhabilitation', type: 'date', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Plan Réhabilitation',
          title: 'Plan de Réhabilitation de la Mine',
          colorHeader: '5D4037',
          headers: ['Zone / Site', 'Superficie (ha)', 'Actions prévues', 'Coût estimé (FCFA)', 'Date début', 'Date fin', 'Avancement %', 'Coût réalisé (FCFA)'],
          rows: [
            ['Carrière principale', 0, 'Remblayage, revégétalisation', 0, '', '', 0, 0],
            ['Verses stériles', 0, 'Profilage, ensemencement', 0, '', '', 0, 0],
            ['Parc à résidus', 0, 'Couverture, étanchéification', 0, '', '', 0, 0],
            ['Zone traitement', 0, 'Décontamination sols', 0, '', '', 0, 0],
            ['Pistes minières', 0, 'Nivellement, végétalisation', 0, '', '', 0, 0],
            ['Bassins décantation', 0, 'Vidange, remblayage', 0, '', '', 0, 0],
            ['Zone habitation camp', 0, 'Démantèlement, nettoyage', 0, '', '', 0, 0],
            ['TOTAL', '=SUM(B2:B8)', '', '=SUM(D2:D8)', '', '', '=AVERAGE(G2:G8)', '=SUM(H2:H8)'],
          ],
          totalsRow: true,
          colWidths: [22, 14, 28, 20, 12, 12, 14, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // ── INDUSTRIE ─────────────────────────────────────────────────────────────

  // 11. xl_ind_production_usine — Tableau de bord production usine
  {
    code: 'xl_ind_production_usine',
    name: 'Tableau de bord production usine',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi de la production par ligne : objectifs, réalisations et taux de rendement',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_usine', label: "Nom de l'usine", type: 'text', required: true },
      { name: 'mois', label: 'Mois', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable production', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Production Usine',
          title: 'Tableau de Bord Production Usine',
          colorHeader: '263238',
          headers: ['Ligne de production', 'Objectif (unités)', 'Réalisé (unités)', 'Taux rendement %', 'Heures disponibles', 'Heures produites', 'Arrêts (h)', 'TRS %'],
          rows: [
            ['Ligne 1', 0, 0, '=IFERROR(C{r}/B{r}*100,0)', 0, 0, 0, '=IFERROR((E{r}-G{r})/E{r}*100,0)'],
            ['Ligne 2', 0, 0, '=IFERROR(C{r}/B{r}*100,0)', 0, 0, 0, '=IFERROR((E{r}-G{r})/E{r}*100,0)'],
            ['Ligne 3', 0, 0, '=IFERROR(C{r}/B{r}*100,0)', 0, 0, 0, '=IFERROR((E{r}-G{r})/E{r}*100,0)'],
            ['Ligne 4', 0, 0, '=IFERROR(C{r}/B{r}*100,0)', 0, 0, 0, '=IFERROR((E{r}-G{r})/E{r}*100,0)'],
            ['Ligne 5', 0, 0, '=IFERROR(C{r}/B{r}*100,0)', 0, 0, 0, '=IFERROR((E{r}-G{r})/E{r}*100,0)'],
            ['Ligne 6', 0, 0, '=IFERROR(C{r}/B{r}*100,0)', 0, 0, 0, '=IFERROR((E{r}-G{r})/E{r}*100,0)'],
            ['Ligne 7', 0, 0, '=IFERROR(C{r}/B{r}*100,0)', 0, 0, 0, '=IFERROR((E{r}-G{r})/E{r}*100,0)'],
            ['TOTAL / MOYENNE', '=SUM(B2:B8)', '=SUM(C2:C8)', '=IFERROR(C9/B9*100,0)', '=SUM(E2:E8)', '=SUM(F2:F8)', '=SUM(G2:G8)', '=AVERAGE(H2:H8)'],
          ],
          totalsRow: true,
          colWidths: [22, 16, 16, 16, 18, 18, 14, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 73,
  },

  // 12. xl_ind_maintenance_preventive — Plan maintenance préventive
  {
    code: 'xl_ind_maintenance_preventive',
    name: 'Plan maintenance préventive',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification et suivi de la maintenance préventive des équipements industriels',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_usine', label: "Nom de l'usine / Site", type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable maintenance', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Maintenance Préventive',
          title: 'Plan de Maintenance Préventive',
          colorHeader: '263238',
          headers: ['Équipement', 'Code', 'Fréquence', 'Dernière maintenance', 'Prochaine maintenance', 'Coût prévu (FCFA)', 'Coût réalisé (FCFA)', 'Statut'],
          rows: [
            ['Compresseur principal', 'COMP-01', 'Mensuelle', '', '', 0, 0, '=IF(F{r}=0,"PLANIFIÉ","RÉALISÉ")'],
            ['Pompe hydraulique', 'POMP-01', 'Trimestrielle', '', '', 0, 0, '=IF(F{r}=0,"PLANIFIÉ","RÉALISÉ")'],
            ['Convoyeur bande', 'CONV-01', 'Mensuelle', '', '', 0, 0, '=IF(F{r}=0,"PLANIFIÉ","RÉALISÉ")'],
            ['Tour de refroidissement', 'TOUR-01', 'Semestrielle', '', '', 0, 0, '=IF(F{r}=0,"PLANIFIÉ","RÉALISÉ")'],
            ['Transformateur élec.', 'TRAN-01', 'Annuelle', '', '', 0, 0, '=IF(F{r}=0,"PLANIFIÉ","RÉALISÉ")'],
            ['Chaudière vapeur', 'CHAU-01', 'Mensuelle', '', '', 0, 0, '=IF(F{r}=0,"PLANIFIÉ","RÉALISÉ")'],
            ['Groupe électrogène', 'GROU-01', 'Mensuelle', '', '', 0, 0, '=IF(F{r}=0,"PLANIFIÉ","RÉALISÉ")'],
            ['Réfrigérateur industriel', 'REFI-01', 'Trimestrielle', '', '', 0, 0, '=IF(F{r}=0,"PLANIFIÉ","RÉALISÉ")'],
            ['TOTAL MAINTENANCE', '', '', '', '', '=SUM(F2:F9)', '=SUM(G2:G9)', ''],
          ],
          totalsRow: true,
          colWidths: [26, 12, 16, 20, 20, 18, 18, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 13. xl_ind_consommation_energie — Suivi consommation énergétique
  {
    code: 'xl_ind_consommation_energie',
    name: 'Suivi consommation énergétique',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: "Suivi mensuel des consommations d'énergie par source : électricité, carburant, gaz",
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_usine', label: "Nom de l'usine", type: 'text', required: true },
      { name: 'mois', label: 'Mois', type: 'text', required: true },
      { name: 'production', label: 'Production du mois (unités)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Consommation Énergie',
          title: 'Suivi Consommation Énergétique',
          colorHeader: '263238',
          headers: ['Source énergie', 'Unité', 'Consommation', 'Coût unitaire (FCFA)', 'Coût total (FCFA)', 'Objectif conso.', 'Écart', 'Indice énergie'],
          rows: [
            ['Électricité réseau', 'kWh', 0, 0, '=C{r}*D{r}', 0, '=C{r}-F{r}', '=IFERROR(C{r}/$C$1,0)'],
            ['Groupe électrogène', 'Litre', 0, 0, '=C{r}*D{r}', 0, '=C{r}-F{r}', '=IFERROR(C{r}/$C$1,0)'],
            ['Gaz naturel', 'Nm3', 0, 0, '=C{r}*D{r}', 0, '=C{r}-F{r}', '=IFERROR(C{r}/$C$1,0)'],
            ['Fuel lourd', 'Litre', 0, 0, '=C{r}*D{r}', 0, '=C{r}-F{r}', '=IFERROR(C{r}/$C$1,0)'],
            ['Énergie solaire', 'kWh', 0, 0, '=C{r}*D{r}', 0, '=C{r}-F{r}', '=IFERROR(C{r}/$C$1,0)'],
            ['Biomasse', 'Tonne', 0, 0, '=C{r}*D{r}', 0, '=C{r}-F{r}', '=IFERROR(C{r}/$C$1,0)'],
            ['TOTAL', '', '', '', '=SUM(E2:E7)', '=SUM(F2:F7)', '=SUM(G2:G7)', ''],
          ],
          totalsRow: true,
          colWidths: [22, 10, 16, 20, 18, 16, 14, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 14. xl_ind_controle_qualite — Contrôle qualité produits finis
  {
    code: 'xl_ind_controle_qualite',
    name: 'Contrôle qualité produits finis',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des contrôles qualité : lots, critères de conformité, mesures et taux de rebus',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_usine', label: "Nom de l'usine", type: 'text', required: true },
      { name: 'produit', label: 'Produit contrôlé', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: false },
      { name: 'norme', label: 'Norme applicable', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Contrôle Qualité',
          title: 'Contrôle Qualité Produits Finis',
          colorHeader: '263238',
          headers: ['N° Lot', 'Date contrôle', 'Quantité (unités)', 'Critère mesuré', 'Valeur mesurée', 'Valeur cible', 'Conformes', 'Rebus', 'Rebus %'],
          rows: [
            ['LOT-001', '', 0, '', 0, 0, 0, '=C{r}-G{r}', '=IFERROR(H{r}/C{r}*100,0)'],
            ['LOT-002', '', 0, '', 0, 0, 0, '=C{r}-G{r}', '=IFERROR(H{r}/C{r}*100,0)'],
            ['LOT-003', '', 0, '', 0, 0, 0, '=C{r}-G{r}', '=IFERROR(H{r}/C{r}*100,0)'],
            ['LOT-004', '', 0, '', 0, 0, 0, '=C{r}-G{r}', '=IFERROR(H{r}/C{r}*100,0)'],
            ['LOT-005', '', 0, '', 0, 0, 0, '=C{r}-G{r}', '=IFERROR(H{r}/C{r}*100,0)'],
            ['LOT-006', '', 0, '', 0, 0, 0, '=C{r}-G{r}', '=IFERROR(H{r}/C{r}*100,0)'],
            ['LOT-007', '', 0, '', 0, 0, 0, '=C{r}-G{r}', '=IFERROR(H{r}/C{r}*100,0)'],
            ['TOTAL', '', '=SUM(C2:C8)', '', '', '', '=SUM(G2:G8)', '=SUM(H2:H8)', '=IFERROR(H9/C9*100,0)'],
          ],
          totalsRow: true,
          colWidths: [12, 14, 16, 20, 16, 14, 14, 12, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 15. xl_ind_matieres_premieres — Gestion matières premières
  {
    code: 'xl_ind_matieres_premieres',
    name: 'Gestion matières premières',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des stocks de matières premières : entrées, consommation et seuil de réapprovisionnement',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_usine', label: "Nom de l'usine", type: 'text', required: true },
      { name: 'mois', label: 'Mois', type: 'text', required: true },
      { name: 'responsable', label: 'Gestionnaire stock', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Matières Premières',
          title: 'Gestion des Matières Premières',
          colorHeader: '263238',
          headers: ['Matière première', 'Unité', 'Stock initial', 'Entrées', 'Consommation', 'Stock final', 'Seuil réappro.', 'Valeur stock (FCFA)', 'Alerte'],
          rows: [
            ['Matière 1', 'Tonne', 0, 0, 0, '=C{r}+D{r}-E{r}', 0, 0, '=IF(F{r}<=G{r},"RÉAPPRO URGENT","OK")'],
            ['Matière 2', 'Tonne', 0, 0, 0, '=C{r}+D{r}-E{r}', 0, 0, '=IF(F{r}<=G{r},"RÉAPPRO URGENT","OK")'],
            ['Matière 3', 'kg', 0, 0, 0, '=C{r}+D{r}-E{r}', 0, 0, '=IF(F{r}<=G{r},"RÉAPPRO URGENT","OK")'],
            ['Matière 4', 'Litre', 0, 0, 0, '=C{r}+D{r}-E{r}', 0, 0, '=IF(F{r}<=G{r},"RÉAPPRO URGENT","OK")'],
            ['Matière 5', 'Unité', 0, 0, 0, '=C{r}+D{r}-E{r}', 0, 0, '=IF(F{r}<=G{r},"RÉAPPRO URGENT","OK")'],
            ['Matière 6', 'Tonne', 0, 0, 0, '=C{r}+D{r}-E{r}', 0, 0, '=IF(F{r}<=G{r},"RÉAPPRO URGENT","OK")'],
            ['Matière 7', 'kg', 0, 0, 0, '=C{r}+D{r}-E{r}', 0, 0, '=IF(F{r}<=G{r},"RÉAPPRO URGENT","OK")'],
            ['TOTAL', '', '=SUM(C2:C8)', '=SUM(D2:D8)', '=SUM(E2:E8)', '=SUM(F2:F8)', '', '=SUM(H2:H8)', ''],
          ],
          totalsRow: true,
          colWidths: [20, 10, 14, 12, 16, 14, 16, 20, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 66,
  },

  // 16. xl_ind_arrets_production — Analyse arrêts production
  {
    code: 'xl_ind_arrets_production',
    name: 'Analyse arrêts production',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: "Analyse des causes et impacts des arrêts de production sur le chiffre d'affaires",
    price: 600, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_usine', label: "Nom de l'usine", type: 'text', required: true },
      { name: 'mois', label: 'Mois', type: 'text', required: true },
      { name: 'ca_horaire', label: "CA horaire moyen (FCFA/h)", type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Arrêts Production',
          title: 'Analyse des Arrêts de Production',
          colorHeader: '263238',
          headers: ['Cause arrêt', 'Type', 'Durée (h)', 'Fréquence', 'Durée totale (h)', 'Impact CA (FCFA)', 'Actions correctives', 'Priorité'],
          rows: [
            ['Panne mécanique', 'Curatif', 0, 0, '=C{r}*D{r}', '=E{r}*$C$1', '', 'Haute'],
            ['Panne électrique', 'Curatif', 0, 0, '=C{r}*D{r}', '=E{r}*$C$1', '', 'Haute'],
            ['Manque matières premières', 'Organisationnel', 0, 0, '=C{r}*D{r}', '=E{r}*$C$1', '', 'Moyenne'],
            ['Maintenance préventive', 'Préventif', 0, 0, '=C{r}*D{r}', '=E{r}*$C$1', '', 'Basse'],
            ['Défaut qualité produit', 'Qualité', 0, 0, '=C{r}*D{r}', '=E{r}*$C$1', '', 'Haute'],
            ['Problème sécurité', 'Sécurité', 0, 0, '=C{r}*D{r}', '=E{r}*$C$1', '', 'Critique'],
            ['Changement série', 'Organisationnel', 0, 0, '=C{r}*D{r}', '=E{r}*$C$1', '', 'Basse'],
            ['Autres causes', 'Divers', 0, 0, '=C{r}*D{r}', '=E{r}*$C$1', '', 'Moyenne'],
            ['TOTAL', '', '', '=SUM(D2:D9)', '=SUM(E2:E9)', '=SUM(F2:F9)', '', ''],
          ],
          totalsRow: true,
          colWidths: [28, 18, 12, 12, 16, 20, 28, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 64,
  },

  // 17. xl_ind_couts_production — Calcul coûts de production
  {
    code: 'xl_ind_couts_production',
    name: 'Calcul coûts de production',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Calcul complet du coût de revient : matières, main-d\'œuvre directe, frais généraux et prix de vente',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_usine', label: "Nom de l'usine", type: 'text', required: true },
      { name: 'produit', label: 'Produit fabriqué', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Coûts Production',
          title: 'Calcul des Coûts de Production',
          colorHeader: '263238',
          headers: ['Composante de coût', 'Coût unitaire (FCFA)', 'Quantité', 'Coût total (FCFA)', '% du coût total'],
          rows: [
            ['Matières premières', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D11*100,0)'],
            ['Emballages & consommables', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D11*100,0)'],
            ['Main-d\'œuvre directe', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D11*100,0)'],
            ['Charges sociales (MO)', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D11*100,0)'],
            ['Énergie & fluides', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D11*100,0)'],
            ['Maintenance', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D11*100,0)'],
            ['Amortissements', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D11*100,0)'],
            ['Frais généraux usine', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D11*100,0)'],
            ['Transport & logistique', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D11*100,0)'],
            ['COÛT DE REVIENT TOTAL', '', '', '=SUM(D2:D10)', '100%'],
            ['Prix de vente cible', 0, '', '', ''],
            ['Marge brute', '', '', '=D12-D11', '=IFERROR((D12-D11)/D12*100,0)'],
          ],
          totalsRow: false,
          colWidths: [30, 20, 14, 20, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  // 18. xl_ind_trs — Taux de Rendement Synthétique
  {
    code: 'xl_ind_trs',
    name: 'Taux de Rendement Synthétique (TRS)',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Calcul du TRS par équipement : disponibilité, performance et qualité combinés',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_usine', label: "Nom de l'usine", type: 'text', required: true },
      { name: 'mois', label: 'Mois', type: 'text', required: true },
      { name: 'objectif_trs', label: 'Objectif TRS (%)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'TRS',
          title: 'Taux de Rendement Synthétique (TRS)',
          colorHeader: '263238',
          headers: ['Équipement / Ligne', 'Temps ouverture (h)', 'Temps arrêts (h)', 'Disponibilité %', 'Cadence nominale', 'Cadence réelle', 'Performance %', 'Pièces bonnes', 'Pièces totales', 'Qualité %', 'TRS %'],
          rows: [
            ['Ligne A', 0, 0, '=IFERROR((B{r}-C{r})/B{r}*100,0)', 0, 0, '=IFERROR(F{r}/E{r}*100,0)', 0, 0, '=IFERROR(H{r}/I{r}*100,0)', '=D{r}/100*G{r}/100*J{r}/100*100'],
            ['Ligne B', 0, 0, '=IFERROR((B{r}-C{r})/B{r}*100,0)', 0, 0, '=IFERROR(F{r}/E{r}*100,0)', 0, 0, '=IFERROR(H{r}/I{r}*100,0)', '=D{r}/100*G{r}/100*J{r}/100*100'],
            ['Ligne C', 0, 0, '=IFERROR((B{r}-C{r})/B{r}*100,0)', 0, 0, '=IFERROR(F{r}/E{r}*100,0)', 0, 0, '=IFERROR(H{r}/I{r}*100,0)', '=D{r}/100*G{r}/100*J{r}/100*100'],
            ['Ligne D', 0, 0, '=IFERROR((B{r}-C{r})/B{r}*100,0)', 0, 0, '=IFERROR(F{r}/E{r}*100,0)', 0, 0, '=IFERROR(H{r}/I{r}*100,0)', '=D{r}/100*G{r}/100*J{r}/100*100'],
            ['Ligne E', 0, 0, '=IFERROR((B{r}-C{r})/B{r}*100,0)', 0, 0, '=IFERROR(F{r}/E{r}*100,0)', 0, 0, '=IFERROR(H{r}/I{r}*100,0)', '=D{r}/100*G{r}/100*J{r}/100*100'],
            ['MOYENNE USINE', '', '', '=AVERAGE(D2:D6)', '', '', '=AVERAGE(G2:G6)', '', '', '=AVERAGE(J2:J6)', '=AVERAGE(K2:K6)'],
          ],
          totalsRow: false,
          colWidths: [20, 18, 16, 16, 18, 14, 14, 14, 14, 12, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 71,
  },

  // 19. xl_ind_rebuts — Suivi rebuts et non-conformités
  {
    code: 'xl_ind_rebuts',
    name: 'Suivi rebuts et non-conformités',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des rebuts et pièces non conformes : défauts, coûts de retraitement et actions',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_usine', label: "Nom de l'usine", type: 'text', required: true },
      { name: 'produit', label: 'Produit / Famille', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Rebuts NC',
          title: 'Suivi des Rebuts et Non-Conformités',
          colorHeader: '263238',
          headers: ['Produit / Référence', 'N° Lot', 'Type défaut', 'Quantité produite', 'Quantité rebutée', 'Taux rebus %', 'Coût retraitement (FCFA)', 'Action corrective', 'Délai résolution'],
          rows: [
            ['', 'LOT-001', 'Dimensionnel', 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '', ''],
            ['', 'LOT-002', 'Surface', 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '', ''],
            ['', 'LOT-003', 'Poids hors tolérance', 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '', ''],
            ['', 'LOT-004', 'Aspect visuel', 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '', ''],
            ['', 'LOT-005', 'Fonctionnel', 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '', ''],
            ['', 'LOT-006', 'Étiquetage', 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '', ''],
            ['', 'LOT-007', 'Emballage', 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '', ''],
            ['TOTAL', '', '', '=SUM(D2:D8)', '=SUM(E2:E8)', '=IFERROR(E9/D9*100,0)', '=SUM(G2:G8)', '', ''],
          ],
          totalsRow: true,
          colWidths: [20, 12, 22, 18, 18, 12, 22, 26, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  // 20. xl_ind_plan_production — Plan de production mensuel
  {
    code: 'xl_ind_plan_production',
    name: 'Plan de production mensuel',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification mensuelle de la production : commandes, capacité disponible et suivi réalisation',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_usine', label: "Nom de l'usine", type: 'text', required: true },
      { name: 'mois', label: 'Mois de production', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable planning', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Plan Production',
          title: 'Plan de Production Mensuel',
          colorHeader: '263238',
          headers: ['Produit / Référence', 'Commandes (unités)', 'Capacité dispo. (unités)', 'Planifié (unités)', 'Réalisé (unités)', 'Taux réalisation %', 'Stock disponible', 'Livrable %'],
          rows: [
            ['Produit A', 0, 0, '=MIN(B{r},C{r})', 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR((E{r}+G{r})/B{r}*100,0)'],
            ['Produit B', 0, 0, '=MIN(B{r},C{r})', 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR((E{r}+G{r})/B{r}*100,0)'],
            ['Produit C', 0, 0, '=MIN(B{r},C{r})', 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR((E{r}+G{r})/B{r}*100,0)'],
            ['Produit D', 0, 0, '=MIN(B{r},C{r})', 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR((E{r}+G{r})/B{r}*100,0)'],
            ['Produit E', 0, 0, '=MIN(B{r},C{r})', 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR((E{r}+G{r})/B{r}*100,0)'],
            ['Produit F', 0, 0, '=MIN(B{r},C{r})', 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR((E{r}+G{r})/B{r}*100,0)'],
            ['Produit G', 0, 0, '=MIN(B{r},C{r})', 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR((E{r}+G{r})/B{r}*100,0)'],
            ['Produit H', 0, 0, '=MIN(B{r},C{r})', 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR((E{r}+G{r})/B{r}*100,0)'],
            ['TOTAL', '=SUM(B2:B9)', '=SUM(C2:C9)', '=SUM(D2:D9)', '=SUM(E2:E9)', '=IFERROR(E10/D10*100,0)', '=SUM(G2:G9)', ''],
          ],
          totalsRow: true,
          colWidths: [24, 18, 22, 18, 16, 18, 16, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 76,
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
  console.log(`✅ Excel Mines/Industrie: ${created} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
