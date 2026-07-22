import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let created = 0, updated = 0;

  const templates: any[] = [
    // ─── btp_xl_001 — Devis travaux de construction ───────────────────────────
    {
      code: 'btp_xl_001',
      name: 'Devis travaux de construction',
      description: 'Devis détaillé pour travaux de construction avec calcul automatique des totaux.',
      category: 'btp_construction',
      templateType: 'excel',
      price: 8000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise',  label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'numero_devis',    label: 'Numéro du devis',      type: 'text', required: true },
        { name: 'nom_client',      label: 'Nom du client',        type: 'text', required: true },
        { name: 'date_devis',      label: 'Date du devis',        type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Devis',
            title: '{{nom_entreprise}} — Devis N° {{numero_devis}}',
            colorHeader: '4E342E',
            headers: ['Désignation', 'Qté', 'Unité', 'P.U. (FCFA)', 'Total (FCFA)'],
            rows: [
              ['Terrassement',           '{{qte_terr}}', 'm³', '{{pu_terr}}', '=B{r}*D{r}'],
              ['Maçonnerie',             '{{qte_maco}}', 'm²', '{{pu_maco}}', '=B{r}*D{r}'],
              ['Charpente / couverture', '{{qte_char}}', 'm²', '{{pu_char}}', '=B{r}*D{r}'],
            ],
            totalsRow: true,
            colWidths: [30, 10, 10, 16, 18],
          },
        ],
      }),
    },

    // ─── btp_xl_002 — Planning chantier (Gantt simplifié) ─────────────────────
    {
      code: 'btp_xl_002',
      name: 'Planning chantier (Gantt simplifié)',
      description: 'Planning Gantt simplifié pour visualiser les phases et jalons d\'un chantier.',
      category: 'btp_construction',
      templateType: 'excel',
      price: 6000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_chantier',   label: 'Nom du chantier',   type: 'text', required: true },
        { name: 'date_debut',     label: 'Date de début',     type: 'date', required: true },
        { name: 'chef_chantier',  label: 'Chef de chantier',  type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Planning',
            title: 'Planning Chantier — {{nom_chantier}}',
            colorHeader: '1B5E20',
            headers: ['Phase / Tâche', 'Durée (jours)', 'Début prévu', 'Fin prévue', 'Statut'],
            rows: [
              ['Installation chantier', '7',  '{{date_debut}}', '', 'En cours'],
              ['Fondations',            '21', '',               '', 'Planifié'],
              ['Gros œuvre',            '45', '',               '', 'Planifié'],
            ],
            totalsRow: false,
            colWidths: [32, 16, 16, 16, 14],
          },
        ],
      }),
    },

    // ─── btp_xl_003 — Situation de travaux ────────────────────────────────────
    {
      code: 'btp_xl_003',
      name: 'Situation de travaux (avancement et facturation)',
      description: 'Tableau de situation de travaux indiquant l\'avancement par lot et les montants facturés.',
      category: 'btp_construction',
      templateType: 'excel',
      price: 9000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_chantier',    label: 'Nom du chantier',        type: 'text', required: true },
        { name: 'numero_situation',label: 'Numéro de la situation', type: 'text', required: true },
        { name: 'date_situation',  label: 'Date de situation',      type: 'date', required: true },
        { name: 'nom_maitre_ouvrage', label: 'Maître d\'ouvrage',   type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Situation',
            title: 'Situation N° {{numero_situation}} — {{nom_chantier}}',
            colorHeader: '0D47A1',
            headers: ['Lot', 'Montant marché (FCFA)', 'Avancement (%)', 'Montant dû (FCFA)', 'Déjà facturé (FCFA)', 'Solde (FCFA)'],
            rows: [
              ['Gros œuvre',   '{{mt_go}}',   '{{av_go}}',   '=B{r}*C{r}/100', '{{fac_go}}',   '=D{r}-E{r}'],
              ['Second œuvre', '{{mt_so}}',   '{{av_so}}',   '=B{r}*C{r}/100', '{{fac_so}}',   '=D{r}-E{r}'],
            ],
            totalsRow: true,
            colWidths: [22, 22, 16, 22, 22, 18],
          },
        ],
      }),
    },

    // ─── btp_xl_004 — Suivi budget chantier ───────────────────────────────────
    {
      code: 'btp_xl_004',
      name: 'Suivi budget chantier (prévu vs réalisé)',
      description: 'Tableau comparatif budget prévu / réalisé par poste de dépense pour un chantier.',
      category: 'btp_construction',
      templateType: 'excel',
      price: 10000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_chantier', label: 'Nom du chantier', type: 'text', required: true },
        { name: 'mois_suivi',   label: 'Mois de suivi',   type: 'text', required: true },
        { name: 'responsable',  label: 'Responsable',     type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Budget',
            title: 'Suivi Budget — {{nom_chantier}} ({{mois_suivi}})',
            colorHeader: '4A148C',
            headers: ['Poste de dépense', 'Budget prévu (FCFA)', 'Réalisé (FCFA)', 'Écart (FCFA)', 'Écart (%)'],
            rows: [
              ['Matériaux',    '{{prev_mat}}',  '{{real_mat}}',  '=B{r}-C{r}', '=D{r}/B{r}*100'],
              ['Main d\'œuvre','{{prev_mo}}',   '{{real_mo}}',   '=B{r}-C{r}', '=D{r}/B{r}*100'],
              ['Matériels',    '{{prev_matel}}','{{real_matel}}','=B{r}-C{r}', '=D{r}/B{r}*100'],
            ],
            totalsRow: true,
            colWidths: [28, 22, 18, 18, 12],
          },
        ],
      }),
    },

    // ─── btp_xl_005 — Bordereau des prix unitaires (BPU) ──────────────────────
    {
      code: 'btp_xl_005',
      name: 'Bordereau des prix unitaires (BPU)',
      description: 'BPU standard listant les ouvrages élémentaires avec leurs prix unitaires de référence.',
      category: 'btp_construction',
      templateType: 'excel',
      price: 7000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
        { name: 'reference_bpu',  label: 'Référence BPU',        type: 'text', required: true },
        { name: 'date_bpu',       label: 'Date d\'édition',      type: 'date', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'BPU',
            title: 'Bordereau des Prix Unitaires — {{nom_entreprise}}',
            colorHeader: 'BF360C',
            headers: ['Réf.', 'Désignation de l\'ouvrage', 'Unité', 'Prix unitaire (FCFA)'],
            rows: [
              ['01', 'Terrassement en déblai',         'm³', '{{pu_01}}'],
              ['02', 'Béton de propreté dosé à 150 kg','m³', '{{pu_02}}'],
              ['03', 'Béton armé fondations dosé 350 kg','m³','{{pu_03}}'],
            ],
            totalsRow: false,
            colWidths: [8, 40, 10, 20],
          },
        ],
      }),
    },

    // ─── btp_xl_006 — Calcul béton armé ───────────────────────────────────────
    {
      code: 'btp_xl_006',
      name: 'Calcul béton armé (quantités matériaux)',
      description: 'Feuille de calcul des quantités de ciment, sable, gravier et acier pour béton armé.',
      category: 'btp_construction',
      templateType: 'excel',
      price: 5000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_projet',   label: 'Nom du projet',   type: 'text', required: true },
        { name: 'element_beton',label: 'Élément en béton',type: 'text', required: true },
        { name: 'dosage',       label: 'Dosage (kg/m³)',  type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Calcul Béton',
            title: 'Calcul Béton Armé — {{nom_projet}} — {{element_beton}}',
            colorHeader: '37474F',
            headers: ['Matériau', 'Ratio / m³', 'Volume béton (m³)', 'Quantité', 'Unité'],
            rows: [
              ['Ciment CEM I 42.5', '350 kg', '{{vol_beton}}', '=C{r}*350', 'kg'],
              ['Sable',             '0.4 m³', '{{vol_beton}}', '=C{r}*0.4', 'm³'],
              ['Gravier',           '0.8 m³', '{{vol_beton}}', '=C{r}*0.8', 'm³'],
            ],
            totalsRow: false,
            colWidths: [24, 14, 20, 14, 10],
          },
        ],
      }),
    },

    // ─── btp_xl_007 — Suivi main d'œuvre chantier ─────────────────────────────
    {
      code: 'btp_xl_007',
      name: 'Suivi main d\'œuvre chantier (heures et coûts)',
      description: 'Tableau hebdomadaire de suivi des heures travaillées et du coût de la main d\'œuvre par corps de métier.',
      category: 'btp_construction',
      templateType: 'excel',
      price: 7500,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_chantier',  label: 'Nom du chantier',   type: 'text', required: true },
        { name: 'semaine',       label: 'Semaine (ex: S27)',  type: 'text', required: true },
        { name: 'chef_chantier', label: 'Chef de chantier',  type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Main Oeuvre',
            title: 'Suivi MO — {{nom_chantier}} — {{semaine}}',
            colorHeader: '006064',
            headers: ['Corps de métier', 'Effectif', 'Heures / jour', 'Jours travaillés', 'Total heures', 'Taux horaire (FCFA)', 'Coût total (FCFA)'],
            rows: [
              ['Maçons',    '{{eff_maco}}', '8', '{{jours}}', '=B{r}*C{r}*D{r}', '{{th_maco}}', '=E{r}*F{r}'],
              ['Manœuvres', '{{eff_mano}}', '8', '{{jours}}', '=B{r}*C{r}*D{r}', '{{th_mano}}', '=E{r}*F{r}'],
            ],
            totalsRow: true,
            colWidths: [20, 10, 14, 16, 14, 20, 18],
          },
        ],
      }),
    },

    // ─── btp_xl_008 — Tableau de bord sécurité chantier ──────────────────────
    {
      code: 'btp_xl_008',
      name: 'Tableau de bord sécurité chantier',
      description: 'Suivi mensuel des accidents, presques-accidents, heures travaillées et indicateurs de sécurité.',
      category: 'btp_construction',
      templateType: 'excel',
      price: 6500,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_chantier', label: 'Nom du chantier', type: 'text', required: true },
        { name: 'mois',         label: 'Mois concerné',   type: 'text', required: true },
        { name: 'responsable_hse', label: 'Responsable HSE', type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Sécurité',
            title: 'Tableau de Bord Sécurité — {{nom_chantier}} ({{mois}})',
            colorHeader: 'B71C1C',
            headers: ['Indicateur', 'Valeur', 'Objectif', 'Statut'],
            rows: [
              ['Accidents avec arrêt',      '{{nb_accidents}}',  '0',    ''],
              ['Presques-accidents déclarés','{{nb_preacc}}',     '{{obj_preacc}}', ''],
              ['Heures travaillées (cumul)', '{{heures_cum}}',    '',     ''],
            ],
            totalsRow: false,
            colWidths: [34, 12, 12, 14],
          },
        ],
      }),
    },

    // ─── btp_xl_009 — Inventaire matériels et équipements ─────────────────────
    {
      code: 'btp_xl_009',
      name: 'Inventaire matériels et équipements chantier',
      description: 'Registre d\'inventaire des engins, outils et équipements présents sur chantier avec état et valeur.',
      category: 'btp_construction',
      templateType: 'excel',
      price: 5000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_chantier',  label: 'Nom du chantier',  type: 'text', required: true },
        { name: 'date_inventaire', label: 'Date d\'inventaire', type: 'date', required: true },
        { name: 'responsable',   label: 'Responsable',      type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Inventaire',
            title: 'Inventaire Matériels — {{nom_chantier}}',
            colorHeader: '33691E',
            headers: ['N°', 'Désignation', 'Marque / Modèle', 'Qté', 'État (B/M/HS)', 'Valeur estimée (FCFA)', 'Observations'],
            rows: [
              ['1', 'Bétonnière 350 L',   '{{marque_bet}}', '{{qte_bet}}',  'B', '{{val_bet}}',  ''],
              ['2', 'Échafaudage cadre',  '{{marque_ech}}', '{{qte_ech}}',  'B', '{{val_ech}}',  ''],
              ['3', 'Compacteur à main',  '{{marque_comp}}','{{qte_comp}}', 'M', '{{val_comp}}', ''],
            ],
            totalsRow: false,
            colWidths: [6, 24, 18, 8, 16, 22, 20],
          },
        ],
      }),
    },

    // ─── btp_xl_010 — Plan de charge équipes (semaine) ────────────────────────
    {
      code: 'btp_xl_010',
      name: 'Plan de charge équipes (semaine)',
      description: 'Tableau hebdomadaire d\'affectation des équipes et ressources humaines par zone ou tâche de chantier.',
      category: 'btp_construction',
      templateType: 'excel',
      price: 6000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_chantier', label: 'Nom du chantier',  type: 'text', required: true },
        { name: 'semaine',      label: 'Semaine (ex: S27)', type: 'text', required: true },
        { name: 'date_lundi',   label: 'Date du lundi',    type: 'date', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Plan de Charge',
            title: 'Plan de Charge — {{nom_chantier}} — {{semaine}}',
            colorHeader: '0277BD',
            headers: ['Équipe / Ressource', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Total jours'],
            rows: [
              ['Équipe A — Maçonnerie', '{{ea_lun}}', '{{ea_mar}}', '{{ea_mer}}', '{{ea_jeu}}', '{{ea_ven}}', '{{ea_sam}}', '=B{r}+C{r}+D{r}+E{r}+F{r}+G{r}'],
              ['Équipe B — Ferraillage', '{{eb_lun}}', '{{eb_mar}}', '{{eb_mer}}', '{{eb_jeu}}', '{{eb_ven}}', '{{eb_sam}}', '=B{r}+C{r}+D{r}+E{r}+F{r}+G{r}'],
            ],
            totalsRow: false,
            colWidths: [28, 10, 10, 12, 10, 12, 10, 12],
          },
        ],
      }),
    },

    // ─── btp_xl_011 — Analyse comparative soumissionnaires ────────────────────
    {
      code: 'btp_xl_011',
      name: 'Appel d\'offres : analyse comparative des soumissionnaires',
      description: 'Tableau d\'analyse et de classement des offres reçues dans le cadre d\'un appel d\'offres BTP.',
      category: 'btp_construction',
      templateType: 'excel',
      price: 12000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'objet_ao',      label: 'Objet de l\'appel d\'offres', type: 'text', required: true },
        { name: 'date_ouverture',label: 'Date d\'ouverture',           type: 'date', required: true },
        { name: 'maitre_ouvrage',label: 'Maître d\'ouvrage',           type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Analyse AO',
            title: 'Analyse Comparative — {{objet_ao}}',
            colorHeader: '4A148C',
            headers: ['Critère de sélection', 'Soumissionnaire A', 'Soumissionnaire B', 'Soumissionnaire C', 'Meilleur score'],
            rows: [
              ['Offre financière (FCFA)', '{{of_a}}',   '{{of_b}}',   '{{of_c}}',   '=MIN(B{r},C{r},D{r})'],
              ['Délai d\'exécution (mois)','{{del_a}}', '{{del_b}}',  '{{del_c}}',  '=MIN(B{r},C{r},D{r})'],
              ['Note technique (/100)',    '{{nt_a}}',  '{{nt_b}}',   '{{nt_c}}',   '=MAX(B{r},C{r},D{r})'],
            ],
            totalsRow: false,
            colWidths: [30, 20, 20, 20, 16],
          },
        ],
      }),
    },

    // ─── btp_xl_012 — Tableau de bord KPI chantier ────────────────────────────
    {
      code: 'btp_xl_012',
      name: 'Tableau de bord KPI chantier (délai, qualité, coût)',
      description: 'Synthèse des indicateurs clés de performance d\'un chantier : délai, qualité et maîtrise des coûts.',
      category: 'btp_construction',
      templateType: 'excel',
      price: 15000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_chantier',   label: 'Nom du chantier',   type: 'text', required: true },
        { name: 'periode',        label: 'Période de reporting', type: 'text', required: true },
        { name: 'chef_projet',    label: 'Chef de projet',    type: 'text', required: true },
        { name: 'date_rapport',   label: 'Date du rapport',   type: 'date', required: false },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'KPI Chantier',
            title: 'Tableau de Bord KPI — {{nom_chantier}} ({{periode}})',
            colorHeader: '004D40',
            headers: ['KPI', 'Valeur cible', 'Valeur réelle', 'Écart', 'Tendance'],
            rows: [
              ['Avancement physique (%)',       '{{cible_av}}',   '{{reel_av}}',   '=C{r}-B{r}', ''],
              ['Respect budget (%)',             '100',            '{{reel_budget}}','=C{r}-B{r}', ''],
              ['Taux de non-conformité (%)',     '{{cible_nc}}',   '{{reel_nc}}',   '=C{r}-B{r}', ''],
            ],
            totalsRow: false,
            colWidths: [34, 16, 16, 12, 12],
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

  console.log(`Excel BTP OK — créés:${created} mis-à-jour:${updated}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
