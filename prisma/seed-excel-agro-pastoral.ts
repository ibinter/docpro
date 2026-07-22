import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  // ─── AGRICULTURE AVANCÉE (xl_agp_) ───────────────────────────────────────

  // 1. xl_agp_parcellaire — Registre parcellaire
  {
    code: 'xl_agp_parcellaire',
    name: 'Registre parcellaire',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des parcelles agricoles : surface, culture, semis, récolte prévue et rendement',
    price: 500, priceMax: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { name: 'campagne', label: 'Campagne agricole', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Parcelles',
          title: 'Registre Parcellaire',
          colorHeader: '558B2F',
          headers: ['N° Parcelle', 'Lieu / Village', 'Surface (ha)', 'Culture', 'Date semis', 'Récolte prévue', 'Rendement prévu (kg/ha)', 'Rendement réel (kg/ha)', 'Production totale (kg)'],
          rows: [
            ['P-001', '', 0, '', '', '', 0, 0, '=C{r}*H{r}'],
            ['P-002', '', 0, '', '', '', 0, 0, '=C{r}*H{r}'],
            ['P-003', '', 0, '', '', '', 0, 0, '=C{r}*H{r}'],
            ['P-004', '', 0, '', '', '', 0, 0, '=C{r}*H{r}'],
            ['P-005', '', 0, '', '', '', 0, 0, '=C{r}*H{r}'],
            ['P-006', '', 0, '', '', '', 0, 0, '=C{r}*H{r}'],
            ['P-007', '', 0, '', '', '', 0, 0, '=C{r}*H{r}'],
            ['P-008', '', 0, '', '', '', 0, 0, '=C{r}*H{r}'],
            ['TOTAL', '', '=SUM(C2:C9)', '', '', '', '', '', '=SUM(I2:I9)'],
          ],
          totalsRow: true,
          colWidths: [12, 18, 14, 16, 14, 16, 22, 22, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 2. xl_agp_irrigation — Plan irrigation
  {
    code: 'xl_agp_irrigation',
    name: 'Plan d\'irrigation',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification de l\'irrigation par parcelle : besoins en eau, fréquence, débit et coût',
    price: 600, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { name: 'saison', label: 'Saison', type: 'text', required: true },
      { name: 'source_eau', label: 'Source d\'eau', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Irrigation',
          title: 'Plan d\'Irrigation',
          colorHeader: '558B2F',
          headers: ['Parcelle', 'Culture', 'Surface (ha)', 'Besoin eau (m³/ha)', 'Fréquence (j)', 'Débit (m³/h)', 'Durée/tour (h)', 'Coût eau/ha (FCFA)', 'Coût total (FCFA)'],
          rows: [
            ['P-001', '', 0, 0, 0, 0, '=IFERROR(D{r}/F{r},0)', 0, '=C{r}*H{r}'],
            ['P-002', '', 0, 0, 0, 0, '=IFERROR(D{r}/F{r},0)', 0, '=C{r}*H{r}'],
            ['P-003', '', 0, 0, 0, 0, '=IFERROR(D{r}/F{r},0)', 0, '=C{r}*H{r}'],
            ['P-004', '', 0, 0, 0, 0, '=IFERROR(D{r}/F{r},0)', 0, '=C{r}*H{r}'],
            ['P-005', '', 0, 0, 0, 0, '=IFERROR(D{r}/F{r},0)', 0, '=C{r}*H{r}'],
            ['P-006', '', 0, 0, 0, 0, '=IFERROR(D{r}/F{r},0)', 0, '=C{r}*H{r}'],
            ['TOTAL', '', '=SUM(C2:C7)', '', '', '', '', '', '=SUM(I2:I7)'],
          ],
          totalsRow: true,
          colWidths: [12, 16, 14, 18, 14, 14, 16, 20, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // 3. xl_agp_fertilisation — Plan fertilisation
  {
    code: 'xl_agp_fertilisation',
    name: 'Plan de fertilisation',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Besoins NPK par culture, choix des engrais, doses et coût à l\'hectare',
    price: 600, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { name: 'campagne', label: 'Campagne', type: 'text', required: true },
      { name: 'analyste', label: 'Conseiller agricole', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Fertilisation',
          title: 'Plan de Fertilisation',
          colorHeader: '558B2F',
          headers: ['Culture', 'Surface (ha)', 'Besoin N (kg/ha)', 'Besoin P (kg/ha)', 'Besoin K (kg/ha)', 'Engrais recommandé', 'Dose (kg/ha)', 'Prix engrais (FCFA/kg)', 'Coût/ha (FCFA)', 'Coût total (FCFA)'],
          rows: [
            ['Maïs', 0, 120, 60, 60, 'NPK 15-15-15', 200, 0, '=G{r}*H{r}', '=B{r}*I{r}'],
            ['Riz', 0, 90, 40, 40, 'Urée 46%', 150, 0, '=G{r}*H{r}', '=B{r}*I{r}'],
            ['Coton', 0, 80, 50, 50, 'NPK 14-23-14', 180, 0, '=G{r}*H{r}', '=B{r}*I{r}'],
            ['Manioc', 0, 60, 30, 90, 'NPK 0-20-20', 120, 0, '=G{r}*H{r}', '=B{r}*I{r}'],
            ['Légumes', 0, 100, 70, 80, 'NPK 12-12-17', 160, 0, '=G{r}*H{r}', '=B{r}*I{r}'],
            ['Arachide', 0, 40, 60, 40, 'Superphosphate', 100, 0, '=G{r}*H{r}', '=B{r}*I{r}'],
            ['TOTAL', '=SUM(B2:B7)', '', '', '', '', '', '', '', '=SUM(J2:J7)'],
          ],
          totalsRow: true,
          colWidths: [14, 14, 16, 16, 16, 22, 14, 20, 16, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // 4. xl_agp_phytosanitaire — Registre traitements phytosanitaires
  {
    code: 'xl_agp_phytosanitaire',
    name: 'Registre traitements phytosanitaires',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Traçabilité des traitements phytosanitaires : ravageur, produit, dose, date et IRA',
    price: 700, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { name: 'campagne', label: 'Campagne', type: 'text', required: true },
      { name: 'operateur', label: 'Opérateur certifié', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Phytosanitaire',
          title: 'Registre des Traitements Phytosanitaires',
          colorHeader: '558B2F',
          headers: ['Date', 'Parcelle', 'Culture', 'Ravageur / Maladie', 'Produit utilisé', 'Dose (L ou kg/ha)', 'Surface traitée (ha)', 'Coût produit (FCFA/L)', 'Coût total (FCFA)', 'IRA (jours)'],
          rows: [
            ['', 'P-001', '', '', '', 0, 0, 0, '=F{r}*G{r}*H{r}', 0],
            ['', 'P-002', '', '', '', 0, 0, 0, '=F{r}*G{r}*H{r}', 0],
            ['', 'P-003', '', '', '', 0, 0, 0, '=F{r}*G{r}*H{r}', 0],
            ['', 'P-004', '', '', '', 0, 0, 0, '=F{r}*G{r}*H{r}', 0],
            ['', 'P-005', '', '', '', 0, 0, 0, '=F{r}*G{r}*H{r}', 0],
            ['', 'P-006', '', '', '', 0, 0, 0, '=F{r}*G{r}*H{r}', 0],
            ['', 'P-007', '', '', '', 0, 0, 0, '=F{r}*G{r}*H{r}', 0],
            ['', 'P-008', '', '', '', 0, 0, 0, '=F{r}*G{r}*H{r}', 0],
            ['TOTAL', '', '', '', '', '', '=SUM(G2:G9)', '', '=SUM(I2:I9)', ''],
          ],
          totalsRow: true,
          colWidths: [12, 12, 14, 22, 22, 16, 18, 18, 16, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  // 5. xl_agp_semences — Gestion semences
  {
    code: 'xl_agp_semences',
    name: 'Gestion des semences',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Stock de semences par variété : prix, taux de germination et besoins saisonniers',
    price: 400, priceMax: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { name: 'campagne', label: 'Campagne', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Semences',
          title: 'Gestion des Semences',
          colorHeader: '558B2F',
          headers: ['Variété', 'Espèce', 'Stock disponible (kg)', 'Prix unitaire (FCFA/kg)', 'Valeur stock (FCFA)', 'Taux germination (%)', 'Dose semis (kg/ha)', 'Surface prévue (ha)', 'Besoins saison (kg)', 'Solde (kg)'],
          rows: [
            ['', 'Maïs', 0, 0, '=C{r}*D{r}', 0, 0, 0, '=G{r}*H{r}', '=C{r}-I{r}'],
            ['', 'Riz', 0, 0, '=C{r}*D{r}', 0, 0, 0, '=G{r}*H{r}', '=C{r}-I{r}'],
            ['', 'Sorgho', 0, 0, '=C{r}*D{r}', 0, 0, 0, '=G{r}*H{r}', '=C{r}-I{r}'],
            ['', 'Niébé', 0, 0, '=C{r}*D{r}', 0, 0, 0, '=G{r}*H{r}', '=C{r}-I{r}'],
            ['', 'Arachide', 0, 0, '=C{r}*D{r}', 0, 0, 0, '=G{r}*H{r}', '=C{r}-I{r}'],
            ['', 'Manioc boutures', 0, 0, '=C{r}*D{r}', 0, 0, 0, '=G{r}*H{r}', '=C{r}-I{r}'],
            ['TOTAL', '', '=SUM(C2:C7)', '', '=SUM(E2:E7)', '', '', '=SUM(H2:H7)', '=SUM(I2:I7)', '=SUM(J2:J7)'],
          ],
          totalsRow: true,
          colWidths: [18, 16, 20, 18, 16, 18, 16, 16, 18, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  // 6. xl_agp_main_oeuvre_agri — Main d'œuvre agricole
  {
    code: 'xl_agp_main_oeuvre_agri',
    name: 'Main d\'œuvre agricole',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification de la main d\'œuvre agricole : tâches, période, effectif et coût total',
    price: 400, priceMax: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { name: 'campagne', label: 'Campagne', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Main Oeuvre',
          title: 'Main d\'Œuvre Agricole',
          colorHeader: '558B2F',
          headers: ['Tâche agricole', 'Période', 'Nb de jours', 'Nb actifs', 'Salaire/jour (FCFA)', 'Coût MO (FCFA)', 'Observations'],
          rows: [
            ['Défrichage / Labour', '', 0, 0, 0, '=C{r}*D{r}*E{r}', ''],
            ['Semis / Repiquage', '', 0, 0, 0, '=C{r}*D{r}*E{r}', ''],
            ['Sarclage 1', '', 0, 0, 0, '=C{r}*D{r}*E{r}', ''],
            ['Sarclage 2', '', 0, 0, 0, '=C{r}*D{r}*E{r}', ''],
            ['Application engrais', '', 0, 0, 0, '=C{r}*D{r}*E{r}', ''],
            ['Traitement phytosanitaire', '', 0, 0, 0, '=C{r}*D{r}*E{r}', ''],
            ['Récolte', '', 0, 0, 0, '=C{r}*D{r}*E{r}', ''],
            ['Post-récolte (séchage, stockage)', '', 0, 0, 0, '=C{r}*D{r}*E{r}', ''],
            ['TOTAL', '', '=SUM(C2:C9)', '=SUM(D2:D9)', '', '=SUM(F2:F9)', ''],
          ],
          totalsRow: true,
          colWidths: [30, 16, 14, 12, 18, 18, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // 7. xl_agp_cout_production_agri — Coût de production par culture
  {
    code: 'xl_agp_cout_production_agri',
    name: 'Coût de production par culture',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Décomposition des coûts de production agricole : intrants, MO, mécanisation et marge',
    price: 700, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { name: 'culture', label: 'Culture principale', type: 'text', required: true },
      { name: 'campagne', label: 'Campagne', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Coût Production',
          title: 'Coût de Production par Culture',
          colorHeader: '558B2F',
          headers: ['Poste de coût', 'Coût/ha (FCFA)', 'Surface (ha)', 'Coût total (FCFA)', '% du coût'],
          rows: [
            ['Semences / plants', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D12*100,0)'],
            ['Engrais & amendements', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D12*100,0)'],
            ['Produits phytosanitaires', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D12*100,0)'],
            ['Main d\'œuvre (travaux culturaux)', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D12*100,0)'],
            ['Labour mécanisé', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D12*100,0)'],
            ['Irrigation', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D12*100,0)'],
            ['Récolte & post-récolte', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D12*100,0)'],
            ['Transport & commercialisation', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D12*100,0)'],
            ['TOTAL CHARGES', '=SUM(B2:B9)', '=C2', '=SUM(D2:D9)', '100%'],
            ['Recette brute (production × prix)', 0, 0, '=B{r}*C{r}', ''],
            ['MARGE BRUTE', '=B11-B10', '', '=D11-D10', '=IFERROR((D11-D10)/D11*100,0)'],
          ],
          totalsRow: false,
          colWidths: [34, 18, 14, 18, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 8. xl_agp_commercialisation — Suivi commercialisation récoltes
  {
    code: 'xl_agp_commercialisation',
    name: 'Suivi commercialisation récoltes',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des ventes de récoltes : produits, quantité, prix, acheteur et recette totale',
    price: 400, priceMax: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { name: 'campagne', label: 'Campagne', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Commercialisation',
          title: 'Suivi Commercialisation des Récoltes',
          colorHeader: '558B2F',
          headers: ['Date vente', 'Produit', 'Quantité (kg)', 'Prix unitaire (FCFA/kg)', 'Recette (FCFA)', 'Acheteur', 'Lieu vente', 'Mode paiement', 'Observ.'],
          rows: [
            ['', 'Maïs', 0, 0, '=C{r}*D{r}', '', '', 'Espèces', ''],
            ['', 'Riz', 0, 0, '=C{r}*D{r}', '', '', 'Espèces', ''],
            ['', 'Arachide', 0, 0, '=C{r}*D{r}', '', '', 'Mobile money', ''],
            ['', 'Coton', 0, 0, '=C{r}*D{r}', '', '', 'Chèque', ''],
            ['', 'Manioc', 0, 0, '=C{r}*D{r}', '', '', 'Espèces', ''],
            ['', 'Légumes', 0, 0, '=C{r}*D{r}', '', '', 'Espèces', ''],
            ['', 'Sorgho', 0, 0, '=C{r}*D{r}', '', '', 'Espèces', ''],
            ['', 'Niébé', 0, 0, '=C{r}*D{r}', '', '', 'Espèces', ''],
            ['TOTAL', '', '=SUM(C2:C9)', '', '=SUM(E2:E9)', '', '', '', ''],
          ],
          totalsRow: true,
          colWidths: [14, 14, 16, 20, 16, 20, 16, 16, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  // 9. xl_agp_calendrier_cultural — Calendrier cultural annuel
  {
    code: 'xl_agp_calendrier_cultural',
    name: 'Calendrier cultural annuel',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planning annuel des opérations culturales par mois, culture et responsable',
    price: 300, priceMax: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Calendrier Cultural',
          title: 'Calendrier Cultural Annuel',
          colorHeader: '558B2F',
          headers: ['Opération / Culture', 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc', 'Responsable'],
          rows: [
            ['Défrichage / Labour', '', '', 'X', 'X', '', '', '', '', '', 'X', 'X', '', 'Chef exploitation'],
            ['Semis maïs saison 1', '', '', '', 'X', '', '', '', '', '', '', '', '', 'Équipe semis'],
            ['Semis riz', '', '', '', '', 'X', '', '', '', '', '', '', '', 'Équipe semis'],
            ['Sarclage 1', '', '', '', '', 'X', 'X', '', '', '', '', 'X', 'X', 'MO journalière'],
            ['Application engrais', '', '', '', 'X', 'X', '', '', '', '', 'X', 'X', '', 'Technicien agri'],
            ['Traitement phytosanitaire', '', '', '', '', 'X', 'X', 'X', '', '', '', 'X', 'X', 'Opérateur certifié'],
            ['Récolte maïs saison 1', '', '', '', '', '', '', 'X', 'X', '', '', '', '', 'MO saisonnière'],
            ['Récolte riz', '', '', '', '', '', '', '', 'X', 'X', '', '', '', 'MO saisonnière'],
            ['Post-récolte & stockage', '', '', '', '', '', '', '', 'X', 'X', 'X', '', '', 'Magasinier'],
            ['Commercialisation', '', '', '', '', '', '', 'X', 'X', 'X', 'X', 'X', '', 'Responsable comm.'],
          ],
          totalsRow: false,
          colWidths: [30, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 57,
  },

  // 10. xl_agp_credit_agricole — Plan remboursement crédit agricole
  {
    code: 'xl_agp_credit_agricole',
    name: 'Plan remboursement crédit agricole',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Échéancier de remboursement crédit agricole : capital, intérêts et solde restant',
    price: 600, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_emprunteur', label: 'Nom emprunteur / exploitation', type: 'text', required: true },
      { name: 'organisme', label: 'Organisme prêteur', type: 'text', required: true },
      { name: 'montant_credit', label: 'Montant du crédit (FCFA)', type: 'text', required: true },
      { name: 'taux_annuel', label: 'Taux d\'intérêt annuel (%)', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Crédit Agricole',
          title: 'Plan de Remboursement Crédit Agricole',
          colorHeader: '558B2F',
          headers: ['Échéance N°', 'Date échéance', 'Capital restant dû', 'Annuité', 'Capital remboursé', 'Intérêts', 'Capital restant fin', 'Statut'],
          rows: [
            [1, '', 0, 0, '=D{r}-F{r}', '=C{r}*($D$1/100)', '=C{r}-E{r}', 'À payer'],
            [2, '', '=G2', 0, '=D{r}-F{r}', '=C{r}*($D$1/100)', '=C{r}-E{r}', 'À payer'],
            [3, '', '=G3', 0, '=D{r}-F{r}', '=C{r}*($D$1/100)', '=C{r}-E{r}', 'À payer'],
            [4, '', '=G4', 0, '=D{r}-F{r}', '=C{r}*($D$1/100)', '=C{r}-E{r}', 'À payer'],
            [5, '', '=G5', 0, '=D{r}-F{r}', '=C{r}*($D$1/100)', '=C{r}-E{r}', 'À payer'],
            [6, '', '=G6', 0, '=D{r}-F{r}', '=C{r}*($D$1/100)', '=C{r}-E{r}', 'À payer'],
            [7, '', '=G7', 0, '=D{r}-F{r}', '=C{r}*($D$1/100)', '=C{r}-E{r}', 'À payer'],
            [8, '', '=G8', 0, '=D{r}-F{r}', '=C{r}*($D$1/100)', '=C{r}-E{r}', 'À payer'],
            ['TOTAL', '', '', '=SUM(D2:D9)', '=SUM(E2:E9)', '=SUM(F2:F9)', '', ''],
          ],
          totalsRow: false,
          colWidths: [14, 16, 22, 16, 20, 16, 20, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // ─── ÉLEVAGE / PASTORAL (xl_elv_) ────────────────────────────────────────

  // 11. xl_elv_cheptel — Registre du cheptel
  {
    code: 'xl_elv_cheptel',
    name: 'Registre du cheptel',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Inventaire du cheptel par espèce : effectif mâles/femelles/jeunes, valeur et total',
    price: 500, priceMax: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_elevage', label: 'Nom de l\'élevage', type: 'text', required: true },
      { name: 'date_inventaire', label: 'Date d\'inventaire', type: 'date', required: true },
      { name: 'responsable', label: 'Responsable élevage', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Cheptel',
          title: 'Registre du Cheptel',
          colorHeader: '6D4C41',
          headers: ['Espèce', 'Mâles adultes', 'Femelles adultes', 'Jeunes (< 1 an)', 'Effectif total', 'Valeur unitaire (FCFA)', 'Valeur totale (FCFA)'],
          rows: [
            ['Bovins', 0, 0, 0, '=SUM(B{r}:D{r})', 0, '=E{r}*F{r}'],
            ['Ovins', 0, 0, 0, '=SUM(B{r}:D{r})', 0, '=E{r}*F{r}'],
            ['Caprins', 0, 0, 0, '=SUM(B{r}:D{r})', 0, '=E{r}*F{r}'],
            ['Porcins', 0, 0, 0, '=SUM(B{r}:D{r})', 0, '=E{r}*F{r}'],
            ['Équins / Asins', 0, 0, 0, '=SUM(B{r}:D{r})', 0, '=E{r}*F{r}'],
            ['Camelins', 0, 0, 0, '=SUM(B{r}:D{r})', 0, '=E{r}*F{r}'],
            ['Volailles', 0, 0, 0, '=SUM(B{r}:D{r})', 0, '=E{r}*F{r}'],
            ['Lapins', 0, 0, 0, '=SUM(B{r}:D{r})', 0, '=E{r}*F{r}'],
            ['TOTAL', '=SUM(B2:B9)', '=SUM(C2:C9)', '=SUM(D2:D9)', '=SUM(E2:E9)', '', '=SUM(G2:G9)'],
          ],
          totalsRow: true,
          colWidths: [18, 16, 18, 16, 14, 20, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 12. xl_elv_naissances — Suivi naissances et mortalité
  {
    code: 'xl_elv_naissances',
    name: 'Suivi naissances et mortalité',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Enregistrement des naissances, mortalités et taux de survie du troupeau',
    price: 400, priceMax: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_elevage', label: 'Nom de l\'élevage', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'espece', label: 'Espèce', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Naissances Mortalité',
          title: 'Suivi Naissances et Mortalité',
          colorHeader: '6D4C41',
          headers: ['Mois', 'Effectif début', 'Naissances', 'Achats', 'Mortalités', 'Ventes/Abattages', 'Effectif fin', 'Taux natalité %', 'Taux mortalité %'],
          rows: [
            ['Janvier', 0, 0, 0, 0, 0, '=B{r}+C{r}+D{r}-E{r}-F{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IFERROR(E{r}/B{r}*100,0)'],
            ['Février', '=G2', 0, 0, 0, 0, '=B{r}+C{r}+D{r}-E{r}-F{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IFERROR(E{r}/B{r}*100,0)'],
            ['Mars', '=G3', 0, 0, 0, 0, '=B{r}+C{r}+D{r}-E{r}-F{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IFERROR(E{r}/B{r}*100,0)'],
            ['Avril', '=G4', 0, 0, 0, 0, '=B{r}+C{r}+D{r}-E{r}-F{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IFERROR(E{r}/B{r}*100,0)'],
            ['Mai', '=G5', 0, 0, 0, 0, '=B{r}+C{r}+D{r}-E{r}-F{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IFERROR(E{r}/B{r}*100,0)'],
            ['Juin', '=G6', 0, 0, 0, 0, '=B{r}+C{r}+D{r}-E{r}-F{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IFERROR(E{r}/B{r}*100,0)'],
            ['Juillet', '=G7', 0, 0, 0, 0, '=B{r}+C{r}+D{r}-E{r}-F{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IFERROR(E{r}/B{r}*100,0)'],
            ['Août', '=G8', 0, 0, 0, 0, '=B{r}+C{r}+D{r}-E{r}-F{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IFERROR(E{r}/B{r}*100,0)'],
            ['Septembre', '=G9', 0, 0, 0, 0, '=B{r}+C{r}+D{r}-E{r}-F{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IFERROR(E{r}/B{r}*100,0)'],
            ['Octobre', '=G10', 0, 0, 0, 0, '=B{r}+C{r}+D{r}-E{r}-F{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IFERROR(E{r}/B{r}*100,0)'],
            ['Novembre', '=G11', 0, 0, 0, 0, '=B{r}+C{r}+D{r}-E{r}-F{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IFERROR(E{r}/B{r}*100,0)'],
            ['Décembre', '=G12', 0, 0, 0, 0, '=B{r}+C{r}+D{r}-E{r}-F{r}', '=IFERROR(C{r}/B{r}*100,0)', '=IFERROR(E{r}/B{r}*100,0)'],
            ['TOTAL / MOYEN', '', '=SUM(C2:C13)', '=SUM(D2:D13)', '=SUM(E2:E13)', '=SUM(F2:F13)', '', '=AVERAGE(H2:H13)', '=AVERAGE(I2:I13)'],
          ],
          totalsRow: false,
          colWidths: [14, 16, 14, 12, 14, 18, 14, 16, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // 13. xl_elv_alimentation — Plan alimentation troupeau
  {
    code: 'xl_elv_alimentation',
    name: 'Plan alimentation troupeau',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Rations alimentaires du troupeau : espèces, aliments, doses journalières, stock et coût',
    price: 500, priceMax: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_elevage', label: 'Nom de l\'élevage', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'nb_tetes', label: 'Nombre de têtes', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Alimentation',
          title: 'Plan d\'Alimentation du Troupeau',
          colorHeader: '6D4C41',
          headers: ['Espèce / Catégorie', 'Aliment principal', 'Dose/tête/jour (kg)', 'Nb de têtes', 'Consommation/jour (kg)', 'Stock disponible (kg)', 'Autonomie (jours)', 'Coût aliment (FCFA/kg)', 'Coût/jour (FCFA)'],
          rows: [
            ['Vaches laitières', 'Foin + concentré', 0, 0, '=C{r}*D{r}', 0, '=IFERROR(F{r}/E{r},0)', 0, '=E{r}*H{r}'],
            ['Bovins à l\'embouche', 'Tourteau + son', 0, 0, '=C{r}*D{r}', 0, '=IFERROR(F{r}/E{r},0)', 0, '=E{r}*H{r}'],
            ['Ovins adultes', 'Paille + foin', 0, 0, '=C{r}*D{r}', 0, '=IFERROR(F{r}/E{r},0)', 0, '=E{r}*H{r}'],
            ['Caprins adultes', 'Feuillages + foin', 0, 0, '=C{r}*D{r}', 0, '=IFERROR(F{r}/E{r},0)', 0, '=E{r}*H{r}'],
            ['Porcins', 'Déchets + concentré', 0, 0, '=C{r}*D{r}', 0, '=IFERROR(F{r}/E{r},0)', 0, '=E{r}*H{r}'],
            ['Volailles', 'Maïs concassé + son', 0, 0, '=C{r}*D{r}', 0, '=IFERROR(F{r}/E{r},0)', 0, '=E{r}*H{r}'],
            ['Jeunes / veaux', 'Lait + foin', 0, 0, '=C{r}*D{r}', 0, '=IFERROR(F{r}/E{r},0)', 0, '=E{r}*H{r}'],
            ['TOTAL', '', '', '=SUM(D2:D8)', '=SUM(E2:E8)', '=SUM(F2:F8)', '', '', '=SUM(I2:I8)'],
          ],
          totalsRow: true,
          colWidths: [22, 22, 18, 14, 22, 18, 16, 18, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 14. xl_elv_sante_animale — Registre santé animale
  {
    code: 'xl_elv_sante_animale',
    name: 'Registre santé animale',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi sanitaire du cheptel : vaccins, maladies, traitements et coûts vétérinaires',
    price: 600, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_elevage', label: 'Nom de l\'élevage', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'veterinaire', label: 'Vétérinaire référent', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Santé Animale',
          title: 'Registre Santé Animale',
          colorHeader: '6D4C41',
          headers: ['Date', 'Animal / Lot', 'Espèce', 'Type acte', 'Maladie / Vaccin', 'Traitement / Produit', 'Dose', 'Nb animaux traités', 'Coût unitaire (FCFA)', 'Coût total (FCFA)'],
          rows: [
            ['', 'Bovin B-001', 'Bovin', 'Vaccination', 'CBPP', '', '', 0, 0, '=H{r}*I{r}'],
            ['', 'Lot ovins', 'Ovin', 'Déparasitage', 'Vers intestinaux', '', '', 0, 0, '=H{r}*I{r}'],
            ['', 'Bovin B-005', 'Bovin', 'Curatif', 'Trypanosomose', '', '', 0, 0, '=H{r}*I{r}'],
            ['', 'Lot caprins', 'Caprin', 'Vaccination', 'PPR', '', '', 0, 0, '=H{r}*I{r}'],
            ['', 'Porc P-003', 'Porcin', 'Curatif', 'PPA', '', '', 0, 0, '=H{r}*I{r}'],
            ['', 'Lot volailles', 'Volaille', 'Vaccination', 'Newcastle', '', '', 0, 0, '=H{r}*I{r}'],
            ['', 'Vache V-012', 'Bovin', 'Curatif', 'Mammite', '', '', 0, 0, '=H{r}*I{r}'],
            ['', 'Lot ovins', 'Ovin', 'Prophylaxie', 'Fièvre aphteuse', '', '', 0, 0, '=H{r}*I{r}'],
            ['TOTAL', '', '', '', '', '', '', '=SUM(H2:H9)', '', '=SUM(J2:J9)'],
          ],
          totalsRow: true,
          colWidths: [12, 16, 12, 14, 20, 22, 10, 18, 18, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 67,
  },

  // 15. xl_elv_production_lait — Suivi production laitière
  {
    code: 'xl_elv_production_lait',
    name: 'Suivi production laitière',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi journalier de la production de lait par vache : qualité, recettes et charges',
    price: 600, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_elevage', label: 'Nom de l\'élevage', type: 'text', required: true },
      { name: 'mois', label: 'Mois', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Production Lait',
          title: 'Suivi Production Laitière',
          colorHeader: '6D4C41',
          headers: ['Vache / ID', 'Race', 'Production matin (L)', 'Production soir (L)', 'Total/jour (L)', 'Qualité (MG %)', 'Lait vendu (L)', 'Prix/L (FCFA)', 'Recette (FCFA)', 'Charges/vache (FCFA)'],
          rows: [
            ['V-001', '', 0, 0, '=C{r}+D{r}', 0, 0, 0, '=G{r}*H{r}', 0],
            ['V-002', '', 0, 0, '=C{r}+D{r}', 0, 0, 0, '=G{r}*H{r}', 0],
            ['V-003', '', 0, 0, '=C{r}+D{r}', 0, 0, 0, '=G{r}*H{r}', 0],
            ['V-004', '', 0, 0, '=C{r}+D{r}', 0, 0, 0, '=G{r}*H{r}', 0],
            ['V-005', '', 0, 0, '=C{r}+D{r}', 0, 0, 0, '=G{r}*H{r}', 0],
            ['V-006', '', 0, 0, '=C{r}+D{r}', 0, 0, 0, '=G{r}*H{r}', 0],
            ['V-007', '', 0, 0, '=C{r}+D{r}', 0, 0, 0, '=G{r}*H{r}', 0],
            ['V-008', '', 0, 0, '=C{r}+D{r}', 0, 0, 0, '=G{r}*H{r}', 0],
            ['TOTAL', '', '=SUM(C2:C9)', '=SUM(D2:D9)', '=SUM(E2:E9)', '=AVERAGE(F2:F9)', '=SUM(G2:G9)', '', '=SUM(I2:I9)', '=SUM(J2:J9)'],
          ],
          totalsRow: true,
          colWidths: [12, 14, 18, 18, 16, 14, 14, 14, 16, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 66,
  },

  // 16. xl_elv_ventes_animaux — Suivi ventes animaux
  {
    code: 'xl_elv_ventes_animaux',
    name: 'Suivi ventes animaux',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Enregistrement des ventes d\'animaux : dates, espèces, prix unitaire et recettes',
    price: 400, priceMax: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_elevage', label: 'Nom de l\'élevage', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Ventes Animaux',
          title: 'Suivi Ventes d\'Animaux',
          colorHeader: '6D4C41',
          headers: ['Date', 'Espèce', 'Identification', 'Poids vif (kg)', 'Nb animaux', 'Prix unitaire (FCFA)', 'Recette totale (FCFA)', 'Acheteur', 'Lieu vente', 'Mode paiement'],
          rows: [
            ['', 'Bovin', '', 0, 1, 0, '=E{r}*F{r}', '', 'Marché', 'Espèces'],
            ['', 'Ovin', '', 0, 1, 0, '=E{r}*F{r}', '', 'Marché', 'Espèces'],
            ['', 'Caprin', '', 0, 1, 0, '=E{r}*F{r}', '', 'À la ferme', 'Mobile money'],
            ['', 'Bovin', '', 0, 1, 0, '=E{r}*F{r}', '', 'Marché', 'Espèces'],
            ['', 'Porcin', '', 0, 1, 0, '=E{r}*F{r}', '', 'Marché', 'Espèces'],
            ['', 'Ovin', '', 0, 1, 0, '=E{r}*F{r}', '', 'Marché', 'Espèces'],
            ['', 'Caprin', '', 0, 1, 0, '=E{r}*F{r}', '', 'À la ferme', 'Chèque'],
            ['', 'Bovin', '', 0, 1, 0, '=E{r}*F{r}', '', 'Abattoir', 'Virement'],
            ['TOTAL', '', '', '', '=SUM(E2:E9)', '', '=SUM(G2:G9)', '', '', ''],
          ],
          totalsRow: true,
          colWidths: [12, 12, 16, 14, 12, 20, 18, 20, 14, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 64,
  },

  // 17. xl_elv_charges_elevage — Budget charges élevage
  {
    code: 'xl_elv_charges_elevage',
    name: 'Budget charges élevage',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Budget annuel des charges d\'élevage : alimentation, santé, main d\'œuvre et amortissement',
    price: 700, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_elevage', label: 'Nom de l\'élevage', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'especes', label: 'Espèces élevées', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Charges Élevage',
          title: 'Budget Charges Élevage',
          colorHeader: '6D4C41',
          headers: ['Poste de charge', 'Mensuel (FCFA)', 'Annuel (FCFA)', '% du total', 'Observ.'],
          rows: [
            ['Aliments & fourrages', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', ''],
            ['Eau d\'abreuvement', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', ''],
            ['Soins vétérinaires & médicaments', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', ''],
            ['Vaccins & prophylaxie', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', ''],
            ['Main d\'œuvre (bergers, ouvriers)', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', ''],
            ['Amortissement infrastructures', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', ''],
            ['Amortissement matériel', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', ''],
            ['Transport animaux', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', ''],
            ['Taxes & frais divers', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', ''],
            ['Entretien & réparations', 0, '=B{r}*12', '=IFERROR(C{r}/C13*100,0)', ''],
            ['TOTAL CHARGES', '=SUM(B2:B11)', '=SUM(C2:C11)', '100%', ''],
          ],
          totalsRow: false,
          colWidths: [34, 18, 18, 14, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  // 18. xl_elv_transhumance — Plan transhumance
  {
    code: 'xl_elv_transhumance',
    name: 'Plan de transhumance',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Organisation de la transhumance : zones, saisons, distances, points d\'eau et risques',
    price: 300, priceMax: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_eleveur', label: 'Nom de l\'éleveur', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'especes', label: 'Espèces transhumantes', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Transhumance',
          title: 'Plan de Transhumance',
          colorHeader: '6D4C41',
          headers: ['Étape', 'Zone / Village', 'Départ', 'Arrivée', 'Distance (km)', 'Pâturage dispo.', 'Points d\'eau', 'Couloir balisé', 'Risques identifiés', 'Observations'],
          rows: [
            [1, 'Zone départ', '', '', 0, 'Bon', 'Mare', 'Oui', '', ''],
            [2, '', '', '', 0, 'Moyen', 'Forage', 'Oui', 'Conflits agri-éleveurs', ''],
            [3, '', '', '', 0, 'Bon', 'Rivière', 'Non', 'Piste étroite', ''],
            [4, '', '', '', 0, 'Excellent', 'Fleuve', 'Oui', '', ''],
            [5, '', '', '', 0, 'Moyen', 'Forage', 'Oui', 'Zone insécure', ''],
            [6, '', '', '', 0, 'Bon', 'Mare', 'Non', '', ''],
            [7, 'Zone retour', '', '', 0, 'Bon', 'Forage', 'Oui', '', ''],
            ['TOTAL', '', '', '', '=SUM(E2:E8)', '', '', '', '', ''],
          ],
          totalsRow: false,
          colWidths: [10, 18, 12, 12, 14, 16, 16, 14, 24, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  // 19. xl_elv_aviculture — Gestion aviculture
  {
    code: 'xl_elv_aviculture',
    name: 'Gestion aviculture',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des lots de volailles : effectif, mortalité, consommation aliment, poids moyen et marge',
    price: 600, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_elevage', label: 'Nom de l\'élevage avicole', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'espece', label: 'Espèce (poulet, dinde, pintade...)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Aviculture',
          title: 'Gestion Aviculture',
          colorHeader: '6D4C41',
          headers: ['Lot', 'Effectif entrée', 'Mortalités', 'Effectif sortie', 'Taux survie %', 'Aliment consommé (kg)', 'Indice de consommation', 'Poids moyen sortie (kg)', 'Prix de vente (FCFA/kg)', 'Recette (FCFA)', 'Charges (FCFA)', 'Marge (FCFA)'],
          rows: [
            ['Lot 1', 0, 0, '=B{r}-C{r}', '=IFERROR(D{r}/B{r}*100,0)', 0, '=IFERROR(F{r}/(D{r}*H{r}),0)', 0, 0, '=D{r}*H{r}*I{r}', 0, '=J{r}-K{r}'],
            ['Lot 2', 0, 0, '=B{r}-C{r}', '=IFERROR(D{r}/B{r}*100,0)', 0, '=IFERROR(F{r}/(D{r}*H{r}),0)', 0, 0, '=D{r}*H{r}*I{r}', 0, '=J{r}-K{r}'],
            ['Lot 3', 0, 0, '=B{r}-C{r}', '=IFERROR(D{r}/B{r}*100,0)', 0, '=IFERROR(F{r}/(D{r}*H{r}),0)', 0, 0, '=D{r}*H{r}*I{r}', 0, '=J{r}-K{r}'],
            ['Lot 4', 0, 0, '=B{r}-C{r}', '=IFERROR(D{r}/B{r}*100,0)', 0, '=IFERROR(F{r}/(D{r}*H{r}),0)', 0, 0, '=D{r}*H{r}*I{r}', 0, '=J{r}-K{r}'],
            ['Lot 5', 0, 0, '=B{r}-C{r}', '=IFERROR(D{r}/B{r}*100,0)', 0, '=IFERROR(F{r}/(D{r}*H{r}),0)', 0, 0, '=D{r}*H{r}*I{r}', 0, '=J{r}-K{r}'],
            ['Lot 6', 0, 0, '=B{r}-C{r}', '=IFERROR(D{r}/B{r}*100,0)', 0, '=IFERROR(F{r}/(D{r}*H{r}),0)', 0, 0, '=D{r}*H{r}*I{r}', 0, '=J{r}-K{r}'],
            ['TOTAL', '=SUM(B2:B7)', '=SUM(C2:C7)', '=SUM(D2:D7)', '=IFERROR(D8/B8*100,0)', '=SUM(F2:F7)', '', '', '', '=SUM(J2:J7)', '=SUM(K2:K7)', '=SUM(L2:L7)'],
          ],
          totalsRow: true,
          colWidths: [10, 14, 12, 14, 14, 20, 20, 20, 18, 16, 16, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 20. xl_elv_pisciculture — Gestion pisciculture
  {
    code: 'xl_elv_pisciculture',
    name: 'Gestion pisciculture',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des bassins piscicoles : alevins, alimentation, récolte et marge par bassin',
    price: 700, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_pisciculture', label: 'Nom de la pisciculture', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'espece', label: 'Espèce principale (tilapia, clarias...)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Pisciculture',
          title: 'Gestion Pisciculture',
          colorHeader: '6D4C41',
          headers: ['Bassin', 'Surface (m²)', 'Espèce', 'Alevins mis en charge', 'Mortalité (%)', 'Alevins récoltables', 'Aliment consommé (kg)', 'Durée cycle (jours)', 'Poids moyen récolte (kg)', 'Récolte totale (kg)', 'Prix de vente (FCFA/kg)', 'Recette (FCFA)', 'Charges totales (FCFA)', 'Marge (FCFA)'],
          rows: [
            ['B-001', 0, 'Tilapia', 0, 0, '=ROUND(D{r}*(1-E{r}/100),0)', 0, 0, 0, '=F{r}*I{r}', 0, '=J{r}*K{r}', 0, '=L{r}-M{r}'],
            ['B-002', 0, 'Tilapia', 0, 0, '=ROUND(D{r}*(1-E{r}/100),0)', 0, 0, 0, '=F{r}*I{r}', 0, '=J{r}*K{r}', 0, '=L{r}-M{r}'],
            ['B-003', 0, 'Clarias', 0, 0, '=ROUND(D{r}*(1-E{r}/100),0)', 0, 0, 0, '=F{r}*I{r}', 0, '=J{r}*K{r}', 0, '=L{r}-M{r}'],
            ['B-004', 0, 'Clarias', 0, 0, '=ROUND(D{r}*(1-E{r}/100),0)', 0, 0, 0, '=F{r}*I{r}', 0, '=J{r}*K{r}', 0, '=L{r}-M{r}'],
            ['B-005', 0, 'Tilapia', 0, 0, '=ROUND(D{r}*(1-E{r}/100),0)', 0, 0, 0, '=F{r}*I{r}', 0, '=J{r}*K{r}', 0, '=L{r}-M{r}'],
            ['B-006', 0, 'Carpe', 0, 0, '=ROUND(D{r}*(1-E{r}/100),0)', 0, 0, 0, '=F{r}*I{r}', 0, '=J{r}*K{r}', 0, '=L{r}-M{r}'],
            ['TOTAL', '=SUM(B2:B7)', '', '=SUM(D2:D7)', '', '=SUM(F2:F7)', '=SUM(G2:G7)', '', '', '=SUM(J2:J7)', '', '=SUM(L2:L7)', '=SUM(M2:M7)', '=SUM(N2:N7)'],
          ],
          totalsRow: true,
          colWidths: [10, 12, 12, 18, 14, 18, 20, 16, 20, 18, 18, 16, 18, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
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
  console.log(`✅ Excel Agro/Pastoral: ${created} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
