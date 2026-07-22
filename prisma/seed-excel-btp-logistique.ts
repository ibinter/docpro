// Seed « Excel BTP / Logistique / Agro-industrie — 20 templates » IBIG DocPro
// Exécution : npx tsx prisma/seed-excel-btp-logistique.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

// Couleurs sectorielles
const BTP_COLOR   = 'E65100'; // orange BTP
const AGRO_COLOR  = '4E342E'; // marron agro
const LOG_COLOR   = '006064'; // teal logistique

const templates = [
  // ═══════════════════════════════════════════════════════════════
  // BTP / CONSTRUCTION (8 templates)
  // ═══════════════════════════════════════════════════════════════

  {
    code: 'xl_btp_metre',
    name: 'Métré quantitatif estimatif',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de métré avec postes, unités, quantités, prix unitaires et totaux',
    price: 800, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 70,
    fieldsJson: JSON.stringify([
      { name: 'nom_projet',    label: 'Nom du projet / chantier', type: 'text',     required: true },
      { name: 'maitre_ouvrage', label: 'Maître d\'ouvrage',       type: 'text',     required: true },
      { name: 'date_metre',   label: 'Date du métré',             type: 'date',     required: true },
      { name: 'lot',          label: 'Lot / corps d\'état',       type: 'text',     required: false },
      { name: 'redacteur',    label: 'Rédacteur / BET',           type: 'text',     required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Métré',
          title: 'MÉTRÉ QUANTITATIF ESTIMATIF — {{nom_projet}}',
          colorHeader: BTP_COLOR,
          headers: ['N°', 'Désignation des travaux', 'Unité', 'Quantité', 'Prix Unit. (FCFA)', 'Total (FCFA)', 'Observations'],
          rows: [
            ['1', 'Installation de chantier', 'Fft', 1, 0, '=D4*E4', ''],
            ['2', 'Démolition / Décapage', 'm²', 0, 0, '=D5*E5', ''],
            ['3', 'Fouilles en masse', 'm³', 0, 0, '=D6*E6', ''],
            ['4', 'Béton de propreté (e=5cm)', 'm²', 0, 0, '=D7*E7', ''],
            ['5', 'Semelles filantes béton armé', 'm³', 0, 0, '=D8*E8', ''],
            ['6', 'Poteaux béton armé', 'm³', 0, 0, '=D9*E9', ''],
            ['7', 'Poutrelles / chainages', 'm³', 0, 0, '=D10*E10', ''],
            ['8', 'Maçonnerie parpaings creux', 'm²', 0, 0, '=D11*E11', ''],
            ['9', 'Enduit intérieur + extérieur', 'm²', 0, 0, '=D12*E12', ''],
            ['10', 'Carrelage sol', 'm²', 0, 0, '=D13*E13', ''],
            ['', 'TOTAL GÉNÉRAL', '', '', '', '=SUM(F4:F13)', ''],
          ],
          totalsRow: true,
          colWidths: [6, 40, 10, 12, 18, 18, 24],
        },
      ],
    }),
  },

  {
    code: 'xl_btp_suivi_chantier',
    name: 'Suivi avancement chantier',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de suivi des tâches avec prévu, réalisé et taux d\'avancement',
    price: 600, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 75,
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier',  label: 'Nom du chantier',       type: 'text', required: true },
      { name: 'chef_chantier', label: 'Chef de chantier',      type: 'text', required: true },
      { name: 'semaine',       label: 'Semaine / Période',     type: 'text', required: true },
      { name: 'entreprise',    label: 'Entreprise exécutante', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Avancement',
          title: 'SUIVI AVANCEMENT CHANTIER — {{nom_chantier}} — {{semaine}}',
          colorHeader: BTP_COLOR,
          headers: ['N°', 'Tâche / Activité', 'Responsable', 'Date début prévue', 'Date fin prévue', 'Réalisé (%)', 'Statut', 'Observations'],
          rows: [
            ['1', 'Terrassement / Fouilles', '', '', '', 0, 'En cours', ''],
            ['2', 'Fondations', '', '', '', 0, 'Planifié', ''],
            ['3', 'Élévation maçonnerie', '', '', '', 0, 'Planifié', ''],
            ['4', 'Charpente / Toiture', '', '', '', 0, 'Planifié', ''],
            ['5', 'Menuiseries extérieures', '', '', '', 0, 'Planifié', ''],
            ['6', 'Plomberie / sanitaires', '', '', '', 0, 'Planifié', ''],
            ['7', 'Électricité', '', '', '', 0, 'Planifié', ''],
            ['8', 'Carrelage / revêtements', '', '', '', 0, 'Planifié', ''],
            ['9', 'Peinture / finitions', '', '', '', 0, 'Planifié', ''],
            ['10', 'VRD / clôture', '', '', '', 0, 'Planifié', ''],
          ],
          totalsRow: false,
          colWidths: [6, 35, 20, 18, 18, 14, 14, 28],
        },
      ],
    }),
  },

  {
    code: 'xl_btp_budget_travaux',
    name: 'Budget travaux détaillé',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Budget par lots avec prévisionnel, réalisé et écart',
    price: 900, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 68,
    fieldsJson: JSON.stringify([
      { name: 'nom_projet',    label: 'Nom du projet',       type: 'text', required: true },
      { name: 'maitre_ouvrage', label: 'Maître d\'ouvrage',  type: 'text', required: true },
      { name: 'date_budget',  label: 'Date du budget',       type: 'date', required: true },
      { name: 'budget_total', label: 'Budget total (FCFA)',  type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Budget',
          title: 'BUDGET TRAVAUX DÉTAILLÉ — {{nom_projet}}',
          colorHeader: BTP_COLOR,
          headers: ['N°', 'Lot / Poste', 'Prévisionnel (FCFA)', 'Réalisé (FCFA)', 'Écart (FCFA)', '% Réalisation', 'Observations'],
          rows: [
            ['1', 'Terrassement', 0, 0, '=C4-D4', '=IFERROR(D4/C4,0)', ''],
            ['2', 'Gros œuvre / Structure', 0, 0, '=C5-D5', '=IFERROR(D5/C5,0)', ''],
            ['3', 'Charpente / Couverture', 0, 0, '=C6-D6', '=IFERROR(D6/C6,0)', ''],
            ['4', 'Menuiseries bois et alu', 0, 0, '=C7-D7', '=IFERROR(D7/C7,0)', ''],
            ['5', 'Plomberie / Sanitaires', 0, 0, '=C8-D8', '=IFERROR(D8/C8,0)', ''],
            ['6', 'Électricité / CFO/CFA', 0, 0, '=C9-D9', '=IFERROR(D9/C9,0)', ''],
            ['7', 'Carrelage / Revêtements', 0, 0, '=C10-D10', '=IFERROR(D10/C10,0)', ''],
            ['8', 'Peinture / Finitions', 0, 0, '=C11-D11', '=IFERROR(D11/C11,0)', ''],
            ['9', 'VRD / Aménagements ext.', 0, 0, '=C12-D12', '=IFERROR(D12/C12,0)', ''],
            ['10', 'Frais divers / Imprévus', 0, 0, '=C13-D13', '=IFERROR(D13/C13,0)', ''],
            ['', 'TOTAL', '=SUM(C4:C13)', '=SUM(D4:D13)', '=SUM(E4:E13)', '=IFERROR(D14/C14,0)', ''],
          ],
          totalsRow: true,
          colWidths: [6, 35, 22, 22, 22, 16, 24],
        },
      ],
    }),
  },

  {
    code: 'xl_btp_main_oeuvre',
    name: 'Suivi main d\'œuvre chantier',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de suivi du personnel avec heures, taux horaires et coûts',
    price: 700, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 62,
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier', label: 'Nom du chantier',   type: 'text', required: true },
      { name: 'semaine',      label: 'Semaine / Période', type: 'text', required: true },
      { name: 'entreprise',   label: 'Entreprise',        type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Main d\'oeuvre',
          title: 'SUIVI MAIN D\'ŒUVRE — {{nom_chantier}} — {{semaine}}',
          colorHeader: BTP_COLOR,
          headers: ['N°', 'Nom & Prénom', 'Qualification', 'Jours travaillés', 'Heures/jour', 'Total heures', 'Taux horaire (FCFA)', 'Coût total (FCFA)', 'Présences'],
          rows: [
            ['1', '', 'Maçon', 0, 8, '=D4*E4', 0, '=F4*G4', ''],
            ['2', '', 'Maçon', 0, 8, '=D5*E5', 0, '=F5*G5', ''],
            ['3', '', 'Ferrailleur', 0, 8, '=D6*E6', 0, '=F6*G6', ''],
            ['4', '', 'Menuisier', 0, 8, '=D7*E7', 0, '=F7*G7', ''],
            ['5', '', 'Plombier', 0, 8, '=D8*E8', 0, '=F8*G8', ''],
            ['6', '', 'Électricien', 0, 8, '=D9*E9', 0, '=F9*G9', ''],
            ['7', '', 'Carreleur', 0, 8, '=D10*E10', 0, '=F10*G10', ''],
            ['8', '', 'Manœuvre', 0, 8, '=D11*E11', 0, '=F11*G11', ''],
            ['', 'TOTAL', '', '=SUM(D4:D11)', '', '=SUM(F4:F11)', '', '=SUM(H4:H11)', ''],
          ],
          totalsRow: true,
          colWidths: [6, 28, 18, 16, 12, 14, 20, 20, 18],
        },
      ],
    }),
  },

  {
    code: 'xl_btp_materiaux',
    name: 'Gestion matériaux chantier',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des matériaux commandés, livrés et restant à livrer',
    price: 600, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 65,
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier',  label: 'Nom du chantier',       type: 'text', required: true },
      { name: 'periode',       label: 'Période',               type: 'text', required: true },
      { name: 'responsable',   label: 'Responsable magasin',   type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Matériaux',
          title: 'GESTION MATÉRIAUX — {{nom_chantier}} — {{periode}}',
          colorHeader: BTP_COLOR,
          headers: ['N°', 'Désignation matériau', 'Unité', 'Qté commandée', 'Qté livrée', 'Qté restante', 'PU (FCFA)', 'Valeur stock (FCFA)', 'Fournisseur'],
          rows: [
            ['1', 'Ciment (sacs 50 kg)', 'Sac', 0, 0, '=D4-E4', 0, '=E4*G4', ''],
            ['2', 'Sable (m³)', 'm³', 0, 0, '=D5-E5', 0, '=E5*G5', ''],
            ['3', 'Gravier (m³)', 'm³', 0, 0, '=D6-E6', 0, '=E6*G6', ''],
            ['4', 'Fer à béton HA 10', 'Barre', 0, 0, '=D7-E7', 0, '=E7*G7', ''],
            ['5', 'Fer à béton HA 12', 'Barre', 0, 0, '=D8-E8', 0, '=E8*G8', ''],
            ['6', 'Parpaings creux 20x20x40', 'Unité', 0, 0, '=D9-E9', 0, '=E9*G9', ''],
            ['7', 'Briques de verre', 'Unité', 0, 0, '=D10-E10', 0, '=E10*G10', ''],
            ['8', 'Carrelage sol', 'm²', 0, 0, '=D11-E11', 0, '=E11*G11', ''],
            ['9', 'Tôle bac acier', 'ml', 0, 0, '=D12-E12', 0, '=E12*G12', ''],
            ['10', 'Tube PVC D110', 'ml', 0, 0, '=D13-E13', 0, '=E13*G13', ''],
            ['', 'TOTAL', '', '=SUM(D4:D13)', '=SUM(E4:E13)', '=SUM(F4:F13)', '', '=SUM(H4:H13)', ''],
          ],
          totalsRow: true,
          colWidths: [6, 36, 8, 16, 14, 14, 16, 22, 24],
        },
      ],
    }),
  },

  {
    code: 'xl_btp_planification',
    name: 'Planning Gantt simplifié',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planning Gantt avec tâches, dates, durées et taux d\'avancement',
    price: 1000, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 72,
    fieldsJson: JSON.stringify([
      { name: 'nom_projet',    label: 'Nom du projet',         type: 'text', required: true },
      { name: 'date_debut',    label: 'Date début chantier',   type: 'date', required: true },
      { name: 'duree_totale',  label: 'Durée totale (semaines)', type: 'text', required: true },
      { name: 'chef_projet',   label: 'Chef de projet',        type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Planning Gantt',
          title: 'PLANNING GANTT — {{nom_projet}}',
          colorHeader: BTP_COLOR,
          headers: ['N°', 'Tâche / Lot', 'Responsable', 'Début prévu', 'Fin prévue', 'Durée (j)', 'Début réel', 'Fin réelle', 'Avancement (%)', 'Commentaire'],
          rows: [
            ['1', 'Installation chantier', '', '', '', 5, '', '', 0, ''],
            ['2', 'Terrassement', '', '', '', 10, '', '', 0, ''],
            ['3', 'Fondations', '', '', '', 15, '', '', 0, ''],
            ['4', 'Gros œuvre — RDC', '', '', '', 30, '', '', 0, ''],
            ['5', 'Gros œuvre — Niveaux', '', '', '', 45, '', '', 0, ''],
            ['6', 'Charpente / Toiture', '', '', '', 20, '', '', 0, ''],
            ['7', 'Menuiseries extérieures', '', '', '', 15, '', '', 0, ''],
            ['8', 'Plomberie', '', '', '', 20, '', '', 0, ''],
            ['9', 'Électricité', '', '', '', 20, '', '', 0, ''],
            ['10', 'Revêtements / Finitions', '', '', '', 25, '', '', 0, ''],
            ['11', 'VRD / Aménagements ext.', '', '', '', 15, '', '', 0, ''],
            ['12', 'Réception des travaux', '', '', '', 3, '', '', 0, ''],
          ],
          totalsRow: false,
          colWidths: [6, 35, 20, 16, 16, 12, 16, 16, 16, 28],
        },
      ],
    }),
  },

  {
    code: 'xl_btp_attachement',
    name: 'Attachement travaux mensuel',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Relevé mensuel des prestations réalisées avec quantités et prix',
    price: 800, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 58,
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier',  label: 'Nom du chantier',         type: 'text', required: true },
      { name: 'entreprise',    label: 'Entreprise exécutante',   type: 'text', required: true },
      { name: 'mois',          label: 'Mois de l\'attachement',  type: 'text', required: true },
      { name: 'n_attachement', label: 'N° d\'attachement',       type: 'text', required: true },
      { name: 'redacteur',     label: 'Établi par',              type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Attachement',
          title: 'ATTACHEMENT TRAVAUX N°{{n_attachement}} — {{mois}} — {{nom_chantier}}',
          colorHeader: BTP_COLOR,
          headers: ['N°', 'Désignation des prestations', 'Unité', 'Qté marché', 'Qté mois', 'Cumul qté', 'Prix unit. (FCFA)', 'Montant mois (FCFA)', 'Montant cumul (FCFA)'],
          rows: [
            ['1', 'Terrassement général', 'm³', 0, 0, 0, 0, '=E4*G4', '=F4*G4'],
            ['2', 'Béton de fondation', 'm³', 0, 0, 0, 0, '=E5*G5', '=F5*G5'],
            ['3', 'Maçonnerie parpaings', 'm²', 0, 0, 0, 0, '=E6*G6', '=F6*G6'],
            ['4', 'Béton armé poteaux', 'm³', 0, 0, 0, 0, '=E7*G7', '=F7*G7'],
            ['5', 'Enduit ciment', 'm²', 0, 0, 0, 0, '=E8*G8', '=F8*G8'],
            ['6', 'Carrelage sol', 'm²', 0, 0, 0, 0, '=E9*G9', '=F9*G9'],
            ['7', 'Peinture intérieure', 'm²', 0, 0, 0, 0, '=E10*G10', '=F10*G10'],
            ['', 'TOTAL DU MOIS / CUMUL', '', '', '', '', '', '=SUM(H4:H10)', '=SUM(I4:I10)'],
          ],
          totalsRow: true,
          colWidths: [6, 38, 8, 14, 12, 12, 20, 22, 22],
        },
      ],
    }),
  },

  {
    code: 'xl_btp_situation',
    name: 'Situation de travaux',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Décompte de situation avec cumul, acomptes, retenue de garantie et net à payer',
    price: 1200, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 55,
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier',    label: 'Nom du chantier',          type: 'text', required: true },
      { name: 'entreprise',      label: 'Entreprise exécutante',    type: 'text', required: true },
      { name: 'n_situation',     label: 'N° de situation',          type: 'text', required: true },
      { name: 'date_situation',  label: 'Date de la situation',     type: 'date', required: true },
      { name: 'montant_marche',  label: 'Montant marché (FCFA)',    type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Situation travaux',
          title: 'SITUATION DE TRAVAUX N°{{n_situation}} — {{nom_chantier}}',
          colorHeader: BTP_COLOR,
          headers: ['Rubrique', 'Situation précédente (FCFA)', 'Situation actuelle (FCFA)', 'Différence (FCFA)', '% du marché'],
          rows: [
            ['Montant des travaux exécutés (HT)', 0, 0, '=C4-B4', '=IFERROR(C4/{{montant_marche}},0)'],
            ['Révision des prix', 0, 0, '=C5-B5', ''],
            ['Travaux supplémentaires', 0, 0, '=C6-B6', ''],
            ['TOTAL BRUT', '=SUM(B4:B6)', '=SUM(C4:C6)', '=SUM(D4:D6)', ''],
            ['Retenue de garantie (5%)', '=B8*0.05', '=C8*0.05', '=C9-B9', ''],
            ['Acompte sur approvisionnements', 0, 0, '=C10-B10', ''],
            ['Acomptes déjà versés', 0, 0, '=C11-B11', ''],
            ['NET À PAYER', '=B8-B9-B10-B11', '=C8-C9-C10-C11', '=C12-B12', ''],
          ],
          totalsRow: true,
          colWidths: [40, 28, 28, 24, 16],
        },
      ],
    }),
  },

  // ═══════════════════════════════════════════════════════════════
  // LOGISTIQUE / TRANSPORT (6 templates)
  // ═══════════════════════════════════════════════════════════════

  {
    code: 'xl_log_inventaire',
    name: 'Gestion inventaire entrepôt',
    category: 'transport_logistique',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des stocks avec niveaux min/max, stock réel et valeur',
    price: 700, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 80,
    fieldsJson: JSON.stringify([
      { name: 'nom_entrepot',  label: 'Nom de l\'entrepôt',      type: 'text', required: true },
      { name: 'date_inventaire', label: 'Date de l\'inventaire', type: 'date', required: true },
      { name: 'responsable',   label: 'Responsable stock',       type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Inventaire',
          title: 'INVENTAIRE ENTREPÔT — {{nom_entrepot}} — {{date_inventaire}}',
          colorHeader: LOG_COLOR,
          headers: ['Réf.', 'Désignation article', 'Unité', 'Stock min', 'Stock max', 'Stock réel', 'PU (FCFA)', 'Valeur stock (FCFA)', 'Alerte'],
          rows: [
            ['REF001', 'Article 1', 'Unité', 10, 100, 0, 0, '=F4*G4', '=IF(F4<D4,"⚠ RUPTURE",IF(F4>E4,"⚠ SURPLUS","OK"))'],
            ['REF002', 'Article 2', 'Unité', 5, 50, 0, 0, '=F5*G5', '=IF(F5<D5,"⚠ RUPTURE",IF(F5>E5,"⚠ SURPLUS","OK"))'],
            ['REF003', 'Article 3', 'Kg', 20, 200, 0, 0, '=F6*G6', '=IF(F6<D6,"⚠ RUPTURE",IF(F6>E6,"⚠ SURPLUS","OK"))'],
            ['REF004', 'Article 4', 'Litre', 10, 80, 0, 0, '=F7*G7', '=IF(F7<D7,"⚠ RUPTURE",IF(F7>E7,"⚠ SURPLUS","OK"))'],
            ['REF005', 'Article 5', 'Carton', 5, 40, 0, 0, '=F8*G8', '=IF(F8<D8,"⚠ RUPTURE",IF(F8>E8,"⚠ SURPLUS","OK"))'],
            ['REF006', 'Article 6', 'Pièce', 15, 120, 0, 0, '=F9*G9', '=IF(F9<D9,"⚠ RUPTURE",IF(F9>E9,"⚠ SURPLUS","OK"))'],
            ['REF007', 'Article 7', 'Sac', 8, 60, 0, 0, '=F10*G10', '=IF(F10<D10,"⚠ RUPTURE",IF(F10>E10,"⚠ SURPLUS","OK"))'],
            ['REF008', 'Article 8', 'Boîte', 20, 150, 0, 0, '=F11*G11', '=IF(F11<D11,"⚠ RUPTURE",IF(F11>E11,"⚠ SURPLUS","OK"))'],
            ['', 'TOTAL VALEUR', '', '', '', '', '', '=SUM(H4:H11)', ''],
          ],
          totalsRow: true,
          colWidths: [12, 36, 8, 12, 12, 12, 16, 22, 14],
        },
      ],
    }),
  },

  {
    code: 'xl_log_tournees',
    name: 'Optimisation tournées livraison',
    category: 'transport_logistique',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de planification des tournées avec véhicules, km et coûts',
    price: 800, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 65,
    fieldsJson: JSON.stringify([
      { name: 'nom_societe',  label: 'Société de transport',    type: 'text', required: true },
      { name: 'date_tournee', label: 'Date de la tournée',      type: 'date', required: true },
      { name: 'zone',         label: 'Zone géographique',       type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Tournées',
          title: 'TOURNÉES LIVRAISON — {{nom_societe}} — {{date_tournee}}',
          colorHeader: LOG_COLOR,
          headers: ['N°', 'Véhicule / Immatric.', 'Chauffeur', 'Zone / Secteur', 'Nb livraisons', 'Km prévus', 'Km réels', 'Coût/km (FCFA)', 'Coût total (FCFA)', 'Statut'],
          rows: [
            ['1', '', '', '', 0, 0, 0, 250, '=G4*H4', 'Planifié'],
            ['2', '', '', '', 0, 0, 0, 250, '=G5*H5', 'Planifié'],
            ['3', '', '', '', 0, 0, 0, 250, '=G6*H6', 'Planifié'],
            ['4', '', '', '', 0, 0, 0, 250, '=G7*H7', 'Planifié'],
            ['5', '', '', '', 0, 0, 0, 250, '=G8*H8', 'Planifié'],
            ['6', '', '', '', 0, 0, 0, 250, '=G9*H9', 'Planifié'],
            ['', 'TOTAL', '', '', '=SUM(E4:E9)', '=SUM(F4:F9)', '=SUM(G4:G9)', '', '=SUM(I4:I9)', ''],
          ],
          totalsRow: true,
          colWidths: [6, 20, 22, 20, 14, 12, 12, 16, 20, 14],
        },
      ],
    }),
  },

  {
    code: 'xl_log_reception',
    name: 'Bon réception marchandises',
    category: 'transport_logistique',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Contrôle des réceptions avec quantités commandées, reçues et écarts',
    price: 400, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 72,
    fieldsJson: JSON.stringify([
      { name: 'nom_entrepot',  label: 'Entrepôt réceptionnaire', type: 'text', required: true },
      { name: 'fournisseur',   label: 'Fournisseur',             type: 'text', required: true },
      { name: 'n_bl',          label: 'N° bon de livraison',     type: 'text', required: true },
      { name: 'date_reception', label: 'Date de réception',      type: 'date', required: true },
      { name: 'receptionnaire', label: 'Réceptionnaire',         type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Réception',
          title: 'BON DE RÉCEPTION BL N°{{n_bl}} — {{fournisseur}} — {{date_reception}}',
          colorHeader: LOG_COLOR,
          headers: ['N°', 'Désignation article', 'Réf.', 'Unité', 'Qté commandée', 'Qté reçue', 'Écart', 'État (conforme / NC)', 'Observations'],
          rows: [
            ['1', '', '', '', 0, 0, '=E4-F4', 'Conforme', ''],
            ['2', '', '', '', 0, 0, '=E5-F5', 'Conforme', ''],
            ['3', '', '', '', 0, 0, '=E6-F6', 'Conforme', ''],
            ['4', '', '', '', 0, 0, '=E7-F7', 'Conforme', ''],
            ['5', '', '', '', 0, 0, '=E8-F8', 'Conforme', ''],
            ['6', '', '', '', 0, 0, '=E9-F9', 'Conforme', ''],
            ['7', '', '', '', 0, 0, '=E10-F10', 'Conforme', ''],
            ['8', '', '', '', 0, 0, '=E11-F11', 'Conforme', ''],
            ['', 'TOTAL', '', '', '=SUM(E4:E11)', '=SUM(F4:F11)', '=SUM(G4:G11)', '', ''],
          ],
          totalsRow: true,
          colWidths: [6, 35, 14, 8, 16, 14, 12, 22, 28],
        },
      ],
    }),
  },

  {
    code: 'xl_log_flotte',
    name: 'Gestion flotte véhicules',
    category: 'transport_logistique',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi de la flotte avec kilométrage, entretiens et coûts d\'exploitation',
    price: 900, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 68,
    fieldsJson: JSON.stringify([
      { name: 'nom_societe', label: 'Société / Propriétaire',  type: 'text', required: true },
      { name: 'mois_annee',  label: 'Mois / Année de suivi',  type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Flotte',
          title: 'GESTION FLOTTE — {{nom_societe}} — {{mois_annee}}',
          colorHeader: LOG_COLOR,
          headers: ['Immatric.', 'Marque / Modèle', 'Chauffeur', 'Km début', 'Km fin', 'Km parcourus', 'Carburant (L)', 'Coût carburant (FCFA)', 'Entretien (FCFA)', 'Coût total (FCFA)', 'Statut'],
          rows: [
            ['', '', '', 0, 0, '=E4-D4', 0, 0, 0, '=H4+I4', 'Opérationnel'],
            ['', '', '', 0, 0, '=E5-D5', 0, 0, 0, '=H5+I5', 'Opérationnel'],
            ['', '', '', 0, 0, '=E6-D6', 0, 0, 0, '=H6+I6', 'Opérationnel'],
            ['', '', '', 0, 0, '=E7-D7', 0, 0, 0, '=H7+I7', 'Opérationnel'],
            ['', '', '', 0, 0, '=E8-D8', 0, 0, 0, '=H8+I8', 'Opérationnel'],
            ['TOTAL', '', '', '', '', '=SUM(F4:F8)', '=SUM(G4:G8)', '=SUM(H4:H8)', '=SUM(I4:I8)', '=SUM(J4:J8)', ''],
          ],
          totalsRow: true,
          colWidths: [14, 22, 20, 12, 12, 14, 14, 22, 20, 20, 14],
        },
      ],
    }),
  },

  {
    code: 'xl_log_expedition',
    name: 'Suivi expéditions',
    category: 'transport_logistique',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de bord des expéditions avec statuts, destinations et délais',
    price: 600, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 60,
    fieldsJson: JSON.stringify([
      { name: 'nom_societe',   label: 'Société expéditrice',   type: 'text', required: true },
      { name: 'periode',       label: 'Période de suivi',      type: 'text', required: true },
      { name: 'responsable',   label: 'Responsable logistique', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Expéditions',
          title: 'SUIVI EXPÉDITIONS — {{nom_societe}} — {{periode}}',
          colorHeader: LOG_COLOR,
          headers: ['N° colis / BL', 'Client destinataire', 'Destination', 'Date expédition', 'Délai promis (j)', 'Date livraison réelle', 'Délai réel (j)', 'Poids (kg)', 'Transporteur', 'Statut', 'Observations'],
          rows: [
            ['', '', '', '', 3, '', 0, 0, '', 'En transit', ''],
            ['', '', '', '', 3, '', 0, 0, '', 'En transit', ''],
            ['', '', '', '', 3, '', 0, 0, '', 'Livré', ''],
            ['', '', '', '', 5, '', 0, 0, '', 'Livré', ''],
            ['', '', '', '', 5, '', 0, 0, '', 'Planifié', ''],
            ['', '', '', '', 2, '', 0, 0, '', 'Planifié', ''],
            ['', '', '', '', 7, '', 0, 0, '', 'Planifié', ''],
            ['', '', '', '', 3, '', 0, 0, '', 'Planifié', ''],
          ],
          totalsRow: false,
          colWidths: [16, 28, 22, 18, 14, 20, 12, 12, 20, 14, 28],
        },
      ],
    }),
  },

  {
    code: 'xl_log_couts',
    name: 'Analyse coûts logistiques',
    category: 'transport_logistique',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau d\'analyse des coûts logistiques par poste et en % du CA',
    price: 1000, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 55,
    fieldsJson: JSON.stringify([
      { name: 'nom_societe',  label: 'Société',                  type: 'text', required: true },
      { name: 'periode',      label: 'Période d\'analyse',       type: 'text', required: true },
      { name: 'ca_periode',   label: 'CA de la période (FCFA)', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Coûts logistiques',
          title: 'ANALYSE COÛTS LOGISTIQUES — {{nom_societe}} — {{periode}}',
          colorHeader: LOG_COLOR,
          headers: ['Poste de coût', 'Montant (FCFA)', '% du CA', 'Vs période préc. (FCFA)', 'Évolution (%)', 'Commentaire'],
          rows: [
            ['Transport amont (approvisionnement)', 0, '=B4/{{ca_periode}}', 0, '=IFERROR((B4-D4)/D4,0)', ''],
            ['Transport aval (livraison clients)', 0, '=B5/{{ca_periode}}', 0, '=IFERROR((B5-D5)/D5,0)', ''],
            ['Stockage / entreposage', 0, '=B6/{{ca_periode}}', 0, '=IFERROR((B6-D6)/D6,0)', ''],
            ['Manutention', 0, '=B7/{{ca_periode}}', 0, '=IFERROR((B7-D7)/D7,0)', ''],
            ['Emballage / conditionnement', 0, '=B8/{{ca_periode}}', 0, '=IFERROR((B8-D8)/D8,0)', ''],
            ['Assurances transport', 0, '=B9/{{ca_periode}}', 0, '=IFERROR((B9-D9)/D9,0)', ''],
            ['Carburant / énergie', 0, '=B10/{{ca_periode}}', 0, '=IFERROR((B10-D10)/D10,0)', ''],
            ['Maintenance flotte', 0, '=B11/{{ca_periode}}', 0, '=IFERROR((B11-D11)/D11,0)', ''],
            ['Personnel logistique', 0, '=B12/{{ca_periode}}', 0, '=IFERROR((B12-D12)/D12,0)', ''],
            ['Douanes / transit', 0, '=B13/{{ca_periode}}', 0, '=IFERROR((B13-D13)/D13,0)', ''],
            ['TOTAL COÛTS LOGISTIQUES', '=SUM(B4:B13)', '=SUM(C4:C13)', '=SUM(D4:D13)', '=IFERROR((B14-D14)/D14,0)', ''],
          ],
          totalsRow: true,
          colWidths: [38, 22, 12, 24, 14, 28],
        },
      ],
    }),
  },

  // ═══════════════════════════════════════════════════════════════
  // AGRO-INDUSTRIE (6 templates)
  // ═══════════════════════════════════════════════════════════════

  {
    code: 'xl_agr_campagne',
    name: 'Budget campagne agricole',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Budget de campagne avec intrants, main d\'œuvre, récolte et marge',
    price: 700, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 75,
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { name: 'campagne',         label: 'Campagne (ex: 2025/2026)', type: 'text', required: true },
      { name: 'culture',          label: 'Culture principale',      type: 'text', required: true },
      { name: 'surface_ha',       label: 'Surface totale (ha)',     type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Budget campagne',
          title: 'BUDGET CAMPAGNE {{campagne}} — {{culture}} — {{nom_exploitation}}',
          colorHeader: AGRO_COLOR,
          headers: ['Poste', 'Unité', 'Quantité', 'PU (FCFA)', 'Montant (FCFA)', '% du coût total', 'Observations'],
          rows: [
            ['INTRANTS', '', '', '', '', '', ''],
            ['Semences / Plants', 'kg', 0, 0, '=C5*D5', '', ''],
            ['Engrais NPK', 'Sac 50kg', 0, 0, '=C6*D6', '', ''],
            ['Urée', 'Sac 50kg', 0, 0, '=C7*D7', '', ''],
            ['Herbicides', 'L', 0, 0, '=C8*D8', '', ''],
            ['Insecticides / fongicides', 'L', 0, 0, '=C9*D9', '', ''],
            ['MAIN D\'OEUVRE', '', '', '', '', '', ''],
            ['Préparation sol', 'j/h', 0, 0, '=C11*D11', '', ''],
            ['Semis / plantation', 'j/h', 0, 0, '=C12*D12', '', ''],
            ['Entretien / désherbage', 'j/h', 0, 0, '=C13*D13', '', ''],
            ['Récolte', 'j/h', 0, 0, '=C14*D14', '', ''],
            ['TOTAL CHARGES', '', '', '', '=SUM(E5:E14)', '100%', ''],
            ['RECETTES', '', '', '', '', '', ''],
            ['Production principale', 'kg', 0, 0, '=C17*D17', '', ''],
            ['Sous-produits', 'Fft', 1, 0, '=C18*D18', '', ''],
            ['TOTAL RECETTES', '', '', '', '=SUM(E17:E18)', '', ''],
            ['MARGE BRUTE', '', '', '', '=E19-E15', '', ''],
          ],
          totalsRow: true,
          colWidths: [35, 12, 12, 16, 20, 16, 28],
        },
      ],
    }),
  },

  {
    code: 'xl_agr_stocks',
    name: 'Gestion stocks produits agricoles',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des entrées, sorties et soldes de stocks de produits agricoles',
    price: 600, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 70,
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Exploitation / Entrepôt', type: 'text', required: true },
      { name: 'periode',          label: 'Période',                type: 'text', required: true },
      { name: 'gestionnaire',     label: 'Gestionnaire de stock',  type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Stocks agro',
          title: 'GESTION STOCKS AGRICOLES — {{nom_exploitation}} — {{periode}}',
          colorHeader: AGRO_COLOR,
          headers: ['Produit', 'Unité', 'Stock initial', 'Entrées', 'Sorties', 'Stock final', 'PU (FCFA)', 'Valeur stock (FCFA)', 'Observations'],
          rows: [
            ['Maïs', 'Sac 100kg', 0, 0, 0, '=C4+D4-E4', 0, '=F4*G4', ''],
            ['Riz paddy', 'Sac 100kg', 0, 0, 0, '=C5+D5-E5', 0, '=F5*G5', ''],
            ['Café (cerises)', 'kg', 0, 0, 0, '=C6+D6-E6', 0, '=F6*G6', ''],
            ['Cacao (fèves)', 'kg', 0, 0, 0, '=C7+D7-E7', 0, '=F7*G7', ''],
            ['Igname', 'kg', 0, 0, 0, '=C8+D8-E8', 0, '=F8*G8', ''],
            ['Manioc', 'Tonne', 0, 0, 0, '=C9+D9-E9', 0, '=F9*G9', ''],
            ['Légumes feuilles', 'kg', 0, 0, 0, '=C10+D10-E10', 0, '=F10*G10', ''],
            ['Ananas', 'Unité', 0, 0, 0, '=C11+D11-E11', 0, '=F11*G11', ''],
            ['TOTAL', '', '=SUM(C4:C11)', '=SUM(D4:D11)', '=SUM(E4:E11)', '=SUM(F4:F11)', '', '=SUM(H4:H11)', ''],
          ],
          totalsRow: true,
          colWidths: [22, 12, 14, 12, 12, 14, 16, 22, 24],
        },
      ],
    }),
  },

  {
    code: 'xl_agr_rendement',
    name: 'Suivi rendements parcelles',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des rendements par parcelle avec surfaces, cultures et prix',
    price: 800, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 65,
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { name: 'campagne',         label: 'Campagne',              type: 'text', required: true },
      { name: 'zone',             label: 'Zone / Localité',       type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Rendements',
          title: 'SUIVI RENDEMENTS PARCELLES — {{nom_exploitation}} — {{campagne}}',
          colorHeader: AGRO_COLOR,
          headers: ['N° parcelle', 'Localisation', 'Culture', 'Surface (ha)', 'Production (kg)', 'Rendement (kg/ha)', 'PU bord champ (FCFA/kg)', 'Recette brute (FCFA)', 'Observations'],
          rows: [
            ['P01', '', 'Maïs', 0, 0, '=IFERROR(E4/D4,0)', 0, '=E4*G4', ''],
            ['P02', '', 'Riz', 0, 0, '=IFERROR(E5/D5,0)', 0, '=E5*G5', ''],
            ['P03', '', 'Manioc', 0, 0, '=IFERROR(E6/D6,0)', 0, '=E6*G6', ''],
            ['P04', '', 'Igname', 0, 0, '=IFERROR(E7/D7,0)', 0, '=E7*G7', ''],
            ['P05', '', 'Café', 0, 0, '=IFERROR(E8/D8,0)', 0, '=E8*G8', ''],
            ['P06', '', 'Cacao', 0, 0, '=IFERROR(E9/D9,0)', 0, '=E9*G9', ''],
            ['TOTAL / MOYENNE', '', '', '=SUM(D4:D9)', '=SUM(E4:E9)', '=IFERROR(E10/D10,0)', '', '=SUM(H4:H9)', ''],
          ],
          totalsRow: true,
          colWidths: [12, 22, 14, 14, 16, 18, 22, 22, 26],
        },
      ],
    }),
  },

  {
    code: 'xl_agr_elevage',
    name: 'Suivi troupeau',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de suivi du troupeau avec naissances, ventes, pertes et valeur',
    price: 700, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 60,
    fieldsJson: JSON.stringify([
      { name: 'nom_elevage',  label: 'Nom de l\'élevage',     type: 'text', required: true },
      { name: 'type_elevage', label: 'Type d\'élevage',       type: 'text', required: true },
      { name: 'annee',        label: 'Année de suivi',        type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi troupeau',
          title: 'SUIVI TROUPEAU — {{type_elevage}} — {{nom_elevage}} — {{annee}}',
          colorHeader: AGRO_COLOR,
          headers: ['Catégorie', 'Effectif début', 'Naissances', 'Achats', 'Ventes', 'Pertes/Abattage', 'Effectif fin', 'Valeur unit. (FCFA)', 'Valeur totale (FCFA)'],
          rows: [
            ['Mâles adultes', 0, 0, 0, 0, 0, '=B4+C4+D4-E4-F4', 0, '=G4*H4'],
            ['Femelles adultes', 0, 0, 0, 0, 0, '=B5+C5+D5-E5-F5', 0, '=G5*H5'],
            ['Jeunes (< 1 an)', 0, 0, 0, 0, 0, '=B6+C6+D6-E6-F6', 0, '=G6*H6'],
            ['Vaches laitières', 0, 0, 0, 0, 0, '=B7+C7+D7-E7-F7', 0, '=G7*H7'],
            ['Reproducteurs', 0, 0, 0, 0, 0, '=B8+C8+D8-E8-F8', 0, '=G8*H8'],
            ['TOTAL', '=SUM(B4:B8)', '=SUM(C4:C8)', '=SUM(D4:D8)', '=SUM(E4:E8)', '=SUM(F4:F8)', '=SUM(G4:G8)', '', '=SUM(I4:I8)'],
          ],
          totalsRow: true,
          colWidths: [22, 16, 14, 12, 12, 18, 14, 20, 20],
        },
      ],
    }),
  },

  {
    code: 'xl_agr_approvisionnement',
    name: 'Plan approvisionnement intrants',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Plan d\'approvisionnement en intrants agricoles avec quantités, coûts et fournisseurs',
    price: 500, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 58,
    fieldsJson: JSON.stringify([
      { name: 'nom_exploitation', label: 'Exploitation agricole',    type: 'text', required: true },
      { name: 'campagne',         label: 'Campagne',                type: 'text', required: true },
      { name: 'responsable',      label: 'Responsable achats',      type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Approvisionnement',
          title: 'PLAN APPROVISIONNEMENT INTRANTS — {{nom_exploitation}} — {{campagne}}',
          colorHeader: AGRO_COLOR,
          headers: ['N°', 'Intrant', 'Unité', 'Qté nécessaire', 'Qté commandée', 'PU (FCFA)', 'Coût total (FCFA)', 'Fournisseur', 'Date livraison', 'Statut'],
          rows: [
            ['1', 'Semences certifiées', 'kg', 0, 0, 0, '=E4*F4', '', '', 'Planifié'],
            ['2', 'Engrais NPK 15-15-15', 'Sac 50kg', 0, 0, 0, '=E5*F5', '', '', 'Planifié'],
            ['3', 'Urée 46%', 'Sac 50kg', 0, 0, 0, '=E6*F6', '', '', 'Planifié'],
            ['4', 'Herbicide sélectif', 'Litre', 0, 0, 0, '=E7*F7', '', '', 'Planifié'],
            ['5', 'Insecticide', 'Litre', 0, 0, 0, '=E8*F8', '', '', 'Planifié'],
            ['6', 'Fongicide', 'Litre', 0, 0, 0, '=E9*F9', '', '', 'Planifié'],
            ['7', 'Matériel irrigation', 'Fft', 1, 1, 0, '=E10*F10', '', '', 'Planifié'],
            ['8', 'Sacs de conditionnement', 'Unité', 0, 0, 0, '=E11*F11', '', '', 'Planifié'],
            ['', 'TOTAL', '', '', '', '', '=SUM(G4:G11)', '', '', ''],
          ],
          totalsRow: true,
          colWidths: [6, 30, 10, 16, 16, 16, 20, 24, 18, 14],
        },
      ],
    }),
  },

  {
    code: 'xl_agr_transformation',
    name: 'Coûts de transformation agricole',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Analyse des coûts de transformation avec matières, process, emballage et marge',
    price: 900, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true, popularity: 55,
    fieldsJson: JSON.stringify([
      { name: 'nom_unite',   label: 'Unité de transformation',  type: 'text', required: true },
      { name: 'produit',     label: 'Produit transformé',       type: 'text', required: true },
      { name: 'periode',     label: 'Période d\'analyse',       type: 'text', required: true },
      { name: 'volume_prod', label: 'Volume produit (unités)',  type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Coûts transformation',
          title: 'COÛTS DE TRANSFORMATION — {{produit}} — {{nom_unite}} — {{periode}}',
          colorHeader: AGRO_COLOR,
          headers: ['Poste de coût', 'Unité', 'Quantité', 'PU (FCFA)', 'Montant (FCFA)', '% du coût total', 'Coût unitaire (FCFA/unité)', 'Observations'],
          rows: [
            ['MATIÈRES PREMIÈRES', '', '', '', '', '', '', ''],
            ['Matière première principale', 'kg', 0, 0, '=C5*D5', '', '', ''],
            ['Matières auxiliaires', 'kg', 0, 0, '=C6*D6', '', '', ''],
            ['Eau process', 'm³', 0, 0, '=C7*D7', '', '', ''],
            ['TRANSFORMATION', '', '', '', '', '', '', ''],
            ['Main d\'œuvre directe', 'j/h', 0, 0, '=C9*D9', '', '', ''],
            ['Énergie (électricité/fuel)', 'kWh/L', 0, 0, '=C10*D10', '', '', ''],
            ['Entretien équipements', 'Fft', 1, 0, '=C11*D11', '', '', ''],
            ['EMBALLAGE', '', '', '', '', '', '', ''],
            ['Emballage primaire', 'Unité', 0, 0, '=C13*D13', '', '', ''],
            ['Emballage secondaire', 'Unité', 0, 0, '=C14*D14', '', '', ''],
            ['Étiquetage', 'Unité', 0, 0, '=C15*D15', '', '', ''],
            ['TOTAL COÛTS', '', '', '', '=SUM(E5:E15)', '100%', '=IFERROR(E16/{{volume_prod}},0)', ''],
            ['PRIX DE VENTE', '', '', '', 0, '', '', ''],
            ['MARGE SUR COÛTS', '', '', '', '=E17-E16', '', '=IFERROR((E17-E16)/E16,0)', ''],
          ],
          totalsRow: true,
          colWidths: [34, 10, 12, 16, 20, 14, 26, 24],
        },
      ],
    }),
  },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    if (existing) {
      await prisma.documentTemplate.update({ where: { code: t.code }, data: t as any });
      updated++;
    } else {
      await prisma.documentTemplate.create({ data: t as any });
      created++;
    }
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Excel BTP/Log/Agro: ${created + updated} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
