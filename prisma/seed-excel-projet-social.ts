import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  // ─── GESTION DE PROJET (xl_prj_) ───────────────────────────────────────────

  // 1. xl_prj_cadre_logique — Cadre logique projet
  {
    code: 'xl_prj_cadre_logique',
    name: 'Cadre logique projet',
    category: 'gestion_projet',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Matrice du cadre logique : objectifs, résultats, activités, indicateurs, sources et hypothèses',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'organisation', label: 'Organisation', type: 'text', required: true },
      { name: 'periode', label: 'Période du projet', type: 'text', required: true },
      { name: 'responsable', label: 'Chef de projet', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Cadre Logique',
          title: 'Cadre Logique du Projet',
          colorHeader: '880E4F',
          headers: ['Niveau', 'Description', 'Indicateurs objectivement vérifiables', 'Sources de vérification', 'Hypothèses / Risques'],
          rows: [
            ['Objectif général', '', '', '', ''],
            ['Objectif spécifique 1', '', '', '', ''],
            ['Objectif spécifique 2', '', '', '', ''],
            ['Résultat 1', '', '', '', ''],
            ['Résultat 2', '', '', '', ''],
            ['Résultat 3', '', '', '', ''],
            ['Activité 1.1', '', '', '', ''],
            ['Activité 1.2', '', '', '', ''],
            ['Activité 2.1', '', '', '', ''],
            ['Activité 2.2', '', '', '', ''],
          ],
          totalsRow: false,
          colWidths: [24, 36, 30, 26, 28],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  // 2. xl_prj_budget_projet — Budget projet détaillé
  {
    code: 'xl_prj_budget_projet',
    name: 'Budget projet détaillé',
    category: 'gestion_projet',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi budgétaire détaillé par activité : budget initial, révisé, décaissé, solde et taux d\'exécution',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'organisation', label: 'Organisation', type: 'text', required: true },
      { name: 'annee', label: 'Année budgétaire', type: 'text', required: true },
      { name: 'devise', label: 'Devise', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Budget Projet',
          title: 'Budget Projet Détaillé',
          colorHeader: '880E4F',
          headers: ['Activité / Rubrique', 'Budget initial', 'Budget révisé', 'Décaissé', 'Solde', 'Taux exécution %'],
          rows: [
            ['Activité 1 : Coordination', 0, 0, 0, '=C{r}-D{r}', '=IFERROR(D{r}/C{r}*100,0)'],
            ['Activité 2 : Formation', 0, 0, 0, '=C{r}-D{r}', '=IFERROR(D{r}/C{r}*100,0)'],
            ['Activité 3 : Équipements', 0, 0, 0, '=C{r}-D{r}', '=IFERROR(D{r}/C{r}*100,0)'],
            ['Activité 4 : Communication', 0, 0, 0, '=C{r}-D{r}', '=IFERROR(D{r}/C{r}*100,0)'],
            ['Activité 5 : Suivi-évaluation', 0, 0, 0, '=C{r}-D{r}', '=IFERROR(D{r}/C{r}*100,0)'],
            ['Frais de personnel', 0, 0, 0, '=C{r}-D{r}', '=IFERROR(D{r}/C{r}*100,0)'],
            ['Frais de fonctionnement', 0, 0, 0, '=C{r}-D{r}', '=IFERROR(D{r}/C{r}*100,0)'],
            ['Imprévus (5%)', '=B2*0.05', '=C2*0.05', 0, '=C{r}-D{r}', '=IFERROR(D{r}/C{r}*100,0)'],
            ['TOTAL', '=SUM(B2:B9)', '=SUM(C2:C9)', '=SUM(D2:D9)', '=SUM(E2:E9)', '=IFERROR(D10/C10*100,0)'],
          ],
          totalsRow: true,
          colWidths: [30, 18, 18, 16, 16, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 78,
  },

  // 3. xl_prj_plan_travail — Plan de travail annuel
  {
    code: 'xl_prj_plan_travail',
    name: 'Plan de travail annuel',
    category: 'gestion_projet',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification annuelle des activités par trimestre avec responsables et statut d\'avancement',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'organisation', label: 'Organisation', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Plan de Travail',
          title: 'Plan de Travail Annuel',
          colorHeader: '880E4F',
          headers: ['Activité', 'Responsable', 'T1 (Jan-Mar)', 'T2 (Avr-Jun)', 'T3 (Jul-Sep)', 'T4 (Oct-Déc)', 'Statut'],
          rows: [
            ['Planification & démarrage', '', 'X', '', '', '', 'Planifié'],
            ['Recrutement équipe projet', '', 'X', '', '', '', 'Planifié'],
            ['Ateliers de formation', '', '', 'X', '', '', 'Planifié'],
            ['Mise en oeuvre activités terrain', '', '', 'X', 'X', '', 'Planifié'],
            ['Suivi-évaluation mi-parcours', '', '', '', 'X', '', 'Planifié'],
            ['Rapport intermédiaire', '', '', '', 'X', '', 'Planifié'],
            ['Phase de consolidation', '', '', '', '', 'X', 'Planifié'],
            ['Rapport final & clôture', '', '', '', '', 'X', 'Planifié'],
            ['Audit financier', '', '', '', '', 'X', 'Planifié'],
            ['Évaluation finale', '', '', '', '', 'X', 'Planifié'],
          ],
          totalsRow: false,
          colWidths: [32, 22, 14, 14, 14, 14, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 4. xl_prj_suivi_indicateurs — Suivi indicateurs de performance
  {
    code: 'xl_prj_suivi_indicateurs',
    name: 'Suivi indicateurs de performance',
    category: 'gestion_projet',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de suivi des indicateurs avec baseline, cibles trimestrielles et taux d\'atteinte',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'annee', label: 'Année de suivi', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable S&E', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi Indicateurs',
          title: 'Suivi des Indicateurs de Performance',
          colorHeader: '880E4F',
          headers: ['Indicateur', 'Baseline', 'Cible annuelle', 'T1', 'T2', 'T3', 'T4', 'Réalisé total', 'Taux atteinte %'],
          rows: [
            ['Indicateur 1', 0, 0, 0, 0, 0, 0, '=SUM(D{r}:G{r})', '=IFERROR(H{r}/C{r}*100,0)'],
            ['Indicateur 2', 0, 0, 0, 0, 0, 0, '=SUM(D{r}:G{r})', '=IFERROR(H{r}/C{r}*100,0)'],
            ['Indicateur 3', 0, 0, 0, 0, 0, 0, '=SUM(D{r}:G{r})', '=IFERROR(H{r}/C{r}*100,0)'],
            ['Indicateur 4', 0, 0, 0, 0, 0, 0, '=SUM(D{r}:G{r})', '=IFERROR(H{r}/C{r}*100,0)'],
            ['Indicateur 5', 0, 0, 0, 0, 0, 0, '=SUM(D{r}:G{r})', '=IFERROR(H{r}/C{r}*100,0)'],
            ['Indicateur 6', 0, 0, 0, 0, 0, 0, '=SUM(D{r}:G{r})', '=IFERROR(H{r}/C{r}*100,0)'],
            ['Indicateur 7', 0, 0, 0, 0, 0, 0, '=SUM(D{r}:G{r})', '=IFERROR(H{r}/C{r}*100,0)'],
            ['Indicateur 8', 0, 0, 0, 0, 0, 0, '=SUM(D{r}:G{r})', '=IFERROR(H{r}/C{r}*100,0)'],
          ],
          totalsRow: false,
          colWidths: [30, 12, 16, 10, 10, 10, 10, 16, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 5. xl_prj_gestion_risques — Registre des risques projet
  {
    code: 'xl_prj_gestion_risques',
    name: 'Registre des risques projet',
    category: 'gestion_projet',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Identification, évaluation et mitigation des risques : probabilité, impact, score et plan de réponse',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'organisation', label: 'Organisation', type: 'text', required: true },
      { name: 'date_revision', label: 'Date de révision', type: 'date', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Registre Risques',
          title: 'Registre des Risques Projet',
          colorHeader: '880E4F',
          headers: ['ID', 'Risque identifié', 'Catégorie', 'Probabilité (1-5)', 'Impact (1-5)', 'Score (P×I)', 'Niveau', 'Mesure de mitigation', 'Responsable', 'Statut'],
          rows: [
            ['R-01', 'Retard de financement', 'Financier', 3, 5, '=D{r}*E{r}', '=IF(F{r}>=15,"ÉLEVÉ",IF(F{r}>=8,"MOYEN","FAIBLE"))', '', '', 'Ouvert'],
            ['R-02', 'Départ personnel clé', 'RH', 2, 4, '=D{r}*E{r}', '=IF(F{r}>=15,"ÉLEVÉ",IF(F{r}>=8,"MOYEN","FAIBLE"))', '', '', 'Ouvert'],
            ['R-03', 'Instabilité politique', 'Contextuel', 2, 5, '=D{r}*E{r}', '=IF(F{r}>=15,"ÉLEVÉ",IF(F{r}>=8,"MOYEN","FAIBLE"))', '', '', 'Ouvert'],
            ['R-04', 'Changement réglementation', 'Juridique', 2, 3, '=D{r}*E{r}', '=IF(F{r}>=15,"ÉLEVÉ",IF(F{r}>=8,"MOYEN","FAIBLE"))', '', '', 'Ouvert'],
            ['R-05', 'Résistance des bénéficiaires', 'Social', 3, 3, '=D{r}*E{r}', '=IF(F{r}>=15,"ÉLEVÉ",IF(F{r}>=8,"MOYEN","FAIBLE"))', '', '', 'Ouvert'],
            ['R-06', 'Pénurie de matériaux', 'Opérationnel', 2, 3, '=D{r}*E{r}', '=IF(F{r}>=15,"ÉLEVÉ",IF(F{r}>=8,"MOYEN","FAIBLE"))', '', '', 'Ouvert'],
            ['R-07', 'Conditions météo défavorables', 'Environnemental', 3, 2, '=D{r}*E{r}', '=IF(F{r}>=15,"ÉLEVÉ",IF(F{r}>=8,"MOYEN","FAIBLE"))', '', '', 'Ouvert'],
            ['R-08', 'Fraude / mauvaise gestion', 'Financier', 2, 5, '=D{r}*E{r}', '=IF(F{r}>=15,"ÉLEVÉ",IF(F{r}>=8,"MOYEN","FAIBLE"))', '', '', 'Ouvert'],
          ],
          totalsRow: false,
          colWidths: [8, 28, 16, 14, 12, 12, 12, 30, 18, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 6. xl_prj_rapport_financier — Rapport financier projet
  {
    code: 'xl_prj_rapport_financier',
    name: 'Rapport financier projet',
    category: 'gestion_projet',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Rapport financier d\'exécution : lignes budgétaires, montants alloués, dépensés, soldes et taux',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'bailleur', label: 'Bailleur de fonds', type: 'text', required: true },
      { name: 'periode', label: 'Période couverte', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable financier', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Rapport Financier',
          title: 'Rapport Financier d\'Exécution',
          colorHeader: '880E4F',
          headers: ['Ligne budgétaire', 'Budget alloué', 'Dépenses période', 'Dépenses cumulées', 'Solde disponible', 'Taux exécution %'],
          rows: [
            ['1. Personnel & consultants', 0, 0, 0, '=B{r}-D{r}', '=IFERROR(D{r}/B{r}*100,0)'],
            ['2. Équipements & matériels', 0, 0, 0, '=B{r}-D{r}', '=IFERROR(D{r}/B{r}*100,0)'],
            ['3. Formation & ateliers', 0, 0, 0, '=B{r}-D{r}', '=IFERROR(D{r}/B{r}*100,0)'],
            ['4. Transport & déplacements', 0, 0, 0, '=B{r}-D{r}', '=IFERROR(D{r}/B{r}*100,0)'],
            ['5. Communication & visibilité', 0, 0, 0, '=B{r}-D{r}', '=IFERROR(D{r}/B{r}*100,0)'],
            ['6. Suivi-évaluation', 0, 0, 0, '=B{r}-D{r}', '=IFERROR(D{r}/B{r}*100,0)'],
            ['7. Frais administratifs', 0, 0, 0, '=B{r}-D{r}', '=IFERROR(D{r}/B{r}*100,0)'],
            ['8. Imprévus', 0, 0, 0, '=B{r}-D{r}', '=IFERROR(D{r}/B{r}*100,0)'],
            ['TOTAL', '=SUM(B2:B9)', '=SUM(C2:C9)', '=SUM(D2:D9)', '=SUM(E2:E9)', '=IFERROR(D10/B10*100,0)'],
          ],
          totalsRow: true,
          colWidths: [30, 18, 20, 22, 18, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 74,
  },

  // 7. xl_prj_chronogramme — Chronogramme Gantt
  {
    code: 'xl_prj_chronogramme',
    name: 'Chronogramme Gantt',
    category: 'gestion_projet',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification Gantt des tâches : durée, semaines, avancement et responsables',
    price: 500, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de démarrage', type: 'date', required: true },
      { name: 'responsable', label: 'Chef de projet', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Chronogramme',
          title: 'Chronogramme des Activités (Gantt)',
          colorHeader: '880E4F',
          headers: ['Tâche / Activité', 'Responsable', 'Durée (sem.)', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'Avancement %'],
          rows: [
            ['Phase 1 : Démarrage', '', 2, 'X', 'X', '', '', '', '', '', '', 0],
            ['1.1 Réunion de lancement', '', 1, 'X', '', '', '', '', '', '', '', 0],
            ['1.2 Recrutement équipe', '', 2, 'X', 'X', '', '', '', '', '', '', 0],
            ['Phase 2 : Mise en oeuvre', '', 4, '', '', 'X', 'X', 'X', 'X', '', '', 0],
            ['2.1 Formation des acteurs', '', 2, '', '', 'X', 'X', '', '', '', '', 0],
            ['2.2 Activités terrain', '', 4, '', '', '', 'X', 'X', 'X', 'X', '', 0],
            ['Phase 3 : Suivi', '', 2, '', '', '', '', '', 'X', 'X', '', 0],
            ['3.1 Collecte données', '', 1, '', '', '', '', '', 'X', '', '', 0],
            ['3.2 Rapport intermédiaire', '', 1, '', '', '', '', '', '', 'X', '', 0],
            ['Phase 4 : Clôture', '', 2, '', '', '', '', '', '', 'X', 'X', 0],
          ],
          totalsRow: false,
          colWidths: [28, 18, 14, 8, 8, 8, 8, 8, 8, 8, 8, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 66,
  },

  // ─── STRATÉGIE & PERFORMANCE (xl_str_) ────────────────────────────────────

  // 8. xl_str_bsc — Balanced Scorecard
  {
    code: 'xl_str_bsc',
    name: 'Balanced Scorecard',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de bord équilibré : perspectives financière, client, processus et apprentissage avec KPIs et cibles',
    price: 1500, priceMax: 2000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisation', label: 'Nom de l\'organisation', type: 'text', required: true },
      { name: 'periode', label: 'Période stratégique', type: 'text', required: true },
      { name: 'directeur', label: 'Directeur général', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Balanced Scorecard',
          title: 'Balanced Scorecard (Tableau de Bord Équilibré)',
          colorHeader: '1A237E',
          headers: ['Perspective', 'Objectif stratégique', 'KPI', 'Unité', 'Cible', 'Réalisé', 'Performance %', 'Statut'],
          rows: [
            ['Financière', 'Croissance du CA', 'Chiffre d\'affaires', 'FCFA', 0, 0, '=IFERROR(F{r}/E{r}*100,0)', '=IF(G{r}>=100,"ATTEINT",IF(G{r}>=80,"PARTIEL","INSUFFISANT"))'],
            ['Financière', 'Maîtrise des coûts', 'Taux de marge', '%', 0, 0, '=IFERROR(F{r}/E{r}*100,0)', '=IF(G{r}>=100,"ATTEINT",IF(G{r}>=80,"PARTIEL","INSUFFISANT"))'],
            ['Client', 'Satisfaction client', 'Score satisfaction', '/10', 0, 0, '=IFERROR(F{r}/E{r}*100,0)', '=IF(G{r}>=100,"ATTEINT",IF(G{r}>=80,"PARTIEL","INSUFFISANT"))'],
            ['Client', 'Fidélisation', 'Taux de rétention', '%', 0, 0, '=IFERROR(F{r}/E{r}*100,0)', '=IF(G{r}>=100,"ATTEINT",IF(G{r}>=80,"PARTIEL","INSUFFISANT"))'],
            ['Processus', 'Efficacité opérationnelle', 'Délai moyen livraison', 'jours', 0, 0, '=IFERROR(E{r}/F{r}*100,0)', '=IF(G{r}>=100,"ATTEINT",IF(G{r}>=80,"PARTIEL","INSUFFISANT"))'],
            ['Processus', 'Qualité des produits', 'Taux de défauts', '%', 0, 0, '=IFERROR(E{r}/F{r}*100,0)', '=IF(G{r}>=100,"ATTEINT",IF(G{r}>=80,"PARTIEL","INSUFFISANT"))'],
            ['Apprentissage', 'Formation des équipes', 'Heures de formation', 'h', 0, 0, '=IFERROR(F{r}/E{r}*100,0)', '=IF(G{r}>=100,"ATTEINT",IF(G{r}>=80,"PARTIEL","INSUFFISANT"))'],
            ['Apprentissage', 'Innovation', 'Nouveaux produits lancés', 'nb', 0, 0, '=IFERROR(F{r}/E{r}*100,0)', '=IF(G{r}>=100,"ATTEINT",IF(G{r}>=80,"PARTIEL","INSUFFISANT"))'],
          ],
          totalsRow: false,
          colWidths: [18, 28, 26, 10, 14, 14, 14, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 76,
  },

  // 9. xl_str_swot — Analyse SWOT chiffrée
  {
    code: 'xl_str_swot',
    name: 'Analyse SWOT chiffrée',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Matrice SWOT structurée avec évaluation de l\'impact et priorisation des facteurs',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisation', label: 'Nom de l\'organisation', type: 'text', required: true },
      { name: 'date_analyse', label: 'Date de l\'analyse', type: 'date', required: true },
      { name: 'analyste', label: 'Analyste / Équipe', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'SWOT',
          title: 'Analyse SWOT Chiffrée',
          colorHeader: '1A237E',
          headers: ['Facteur', 'Description', 'Type', 'Impact (1-5)', 'Probabilité (1-5)', 'Score', 'Priorité'],
          rows: [
            ['Force 1', 'Expertise technique solide', 'FORCE', 4, 5, '=D{r}*E{r}', '=IF(F{r}>=15,"HAUTE",IF(F{r}>=8,"MOYENNE","FAIBLE"))'],
            ['Force 2', 'Réseau de partenaires étendu', 'FORCE', 4, 4, '=D{r}*E{r}', '=IF(F{r}>=15,"HAUTE",IF(F{r}>=8,"MOYENNE","FAIBLE"))'],
            ['Faiblesse 1', 'Ressources financières limitées', 'FAIBLESSE', 4, 5, '=D{r}*E{r}', '=IF(F{r}>=15,"HAUTE",IF(F{r}>=8,"MOYENNE","FAIBLE"))'],
            ['Faiblesse 2', 'Système d\'information obsolète', 'FAIBLESSE', 3, 4, '=D{r}*E{r}', '=IF(F{r}>=15,"HAUTE",IF(F{r}>=8,"MOYENNE","FAIBLE"))'],
            ['Opportunité 1', 'Croissance du marché régional', 'OPPORTUNITÉ', 5, 4, '=D{r}*E{r}', '=IF(F{r}>=15,"HAUTE",IF(F{r}>=8,"MOYENNE","FAIBLE"))'],
            ['Opportunité 2', 'Digitalisation du secteur', 'OPPORTUNITÉ', 4, 4, '=D{r}*E{r}', '=IF(F{r}>=15,"HAUTE",IF(F{r}>=8,"MOYENNE","FAIBLE"))'],
            ['Menace 1', 'Concurrence internationale', 'MENACE', 4, 3, '=D{r}*E{r}', '=IF(F{r}>=15,"HAUTE",IF(F{r}>=8,"MOYENNE","FAIBLE"))'],
            ['Menace 2', 'Instabilité économique', 'MENACE', 5, 3, '=D{r}*E{r}', '=IF(F{r}>=15,"HAUTE",IF(F{r}>=8,"MOYENNE","FAIBLE"))'],
          ],
          totalsRow: false,
          colWidths: [16, 30, 14, 14, 16, 10, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 71,
  },

  // 10. xl_str_business_plan — Business plan financier 3 ans
  {
    code: 'xl_str_business_plan',
    name: 'Business plan financier 3 ans',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Projection financière sur 3 ans : CA, charges, EBITDA, résultat net et trésorerie',
    price: 2000, priceMax: 2000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur d\'activité', type: 'text', required: true },
      { name: 'annee_debut', label: 'Année de démarrage', type: 'text', required: true },
      { name: 'porteur', label: 'Porteur du projet', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Business Plan',
          title: 'Business Plan Financier 3 Ans',
          colorHeader: '1A237E',
          headers: ['Rubrique', 'Année 1', 'Année 2', 'Croissance A1→A2', 'Année 3', 'Croissance A2→A3'],
          rows: [
            ['Chiffre d\'affaires', 0, 0, '=IFERROR((C{r}-B{r})/B{r}*100,0)', 0, '=IFERROR((E{r}-C{r})/C{r}*100,0)'],
            ['Coût des ventes', 0, 0, '=IFERROR((C{r}-B{r})/B{r}*100,0)', 0, '=IFERROR((E{r}-C{r})/C{r}*100,0)'],
            ['MARGE BRUTE', '=B2-B3', '=C2-C3', '=IFERROR((C{r}-B{r})/B{r}*100,0)', '=E2-E3', '=IFERROR((E{r}-C{r})/C{r}*100,0)'],
            ['Charges de personnel', 0, 0, '=IFERROR((C{r}-B{r})/B{r}*100,0)', 0, '=IFERROR((E{r}-C{r})/C{r}*100,0)'],
            ['Charges opérationnelles', 0, 0, '=IFERROR((C{r}-B{r})/B{r}*100,0)', 0, '=IFERROR((E{r}-C{r})/C{r}*100,0)'],
            ['EBITDA', '=B4-B5-B6', '=C4-C5-C6', '=IFERROR((C{r}-B{r})/B{r}*100,0)', '=E4-E5-E6', '=IFERROR((E{r}-C{r})/C{r}*100,0)'],
            ['Amortissements', 0, 0, '=IFERROR((C{r}-B{r})/B{r}*100,0)', 0, '=IFERROR((E{r}-C{r})/C{r}*100,0)'],
            ['Résultat d\'exploitation', '=B7-B8', '=C7-C8', '=IFERROR((C{r}-B{r})/B{r}*100,0)', '=E7-E8', '=IFERROR((E{r}-C{r})/C{r}*100,0)'],
            ['Impôts sur bénéfices', '=B9*0.25', '=C9*0.25', '', '=E9*0.25', ''],
            ['RÉSULTAT NET', '=B9-B10', '=C9-C10', '=IFERROR((C{r}-B{r})/B{r}*100,0)', '=E9-E10', '=IFERROR((E{r}-C{r})/C{r}*100,0)'],
            ['Trésorerie nette', 0, 0, '=IFERROR((C{r}-B{r})/B{r}*100,0)', 0, '=IFERROR((E{r}-C{r})/C{r}*100,0)'],
          ],
          totalsRow: false,
          colWidths: [30, 16, 16, 18, 16, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 82,
  },

  // 11. xl_str_plan_action — Plan d'action stratégique
  {
    code: 'xl_str_plan_action',
    name: "Plan d'action stratégique",
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Déclinaison opérationnelle des axes stratégiques : actions, budgets, responsables, délais et avancement',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisation', label: 'Nom de l\'organisation', type: 'text', required: true },
      { name: 'periode', label: 'Période stratégique', type: 'text', required: true },
      { name: 'directeur', label: 'Directeur général', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: "Plan d'Action",
          title: "Plan d'Action Stratégique",
          colorHeader: '1A237E',
          headers: ['Axe stratégique', 'Action prioritaire', 'Budget (FCFA)', 'Responsable', 'Délai', 'Avancement %', 'Statut'],
          rows: [
            ['Axe 1 : Croissance', '', 0, '', '', 0, '=IF(F{r}=100,"TERMINÉ",IF(F{r}>0,"EN COURS","À DÉMARRER"))'],
            ['Axe 1 : Croissance', '', 0, '', '', 0, '=IF(F{r}=100,"TERMINÉ",IF(F{r}>0,"EN COURS","À DÉMARRER"))'],
            ['Axe 2 : Qualité', '', 0, '', '', 0, '=IF(F{r}=100,"TERMINÉ",IF(F{r}>0,"EN COURS","À DÉMARRER"))'],
            ['Axe 2 : Qualité', '', 0, '', '', 0, '=IF(F{r}=100,"TERMINÉ",IF(F{r}>0,"EN COURS","À DÉMARRER"))'],
            ['Axe 3 : Innovation', '', 0, '', '', 0, '=IF(F{r}=100,"TERMINÉ",IF(F{r}>0,"EN COURS","À DÉMARRER"))'],
            ['Axe 3 : Innovation', '', 0, '', '', 0, '=IF(F{r}=100,"TERMINÉ",IF(F{r}>0,"EN COURS","À DÉMARRER"))'],
            ['Axe 4 : RH & Organisation', '', 0, '', '', 0, '=IF(F{r}=100,"TERMINÉ",IF(F{r}>0,"EN COURS","À DÉMARRER"))'],
            ['Axe 4 : RH & Organisation', '', 0, '', '', 0, '=IF(F{r}=100,"TERMINÉ",IF(F{r}>0,"EN COURS","À DÉMARRER"))'],
          ],
          totalsRow: false,
          colWidths: [24, 30, 16, 18, 14, 14, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 73,
  },

  // 12. xl_str_tableau_bord_dg — Tableau de bord direction générale
  {
    code: 'xl_str_tableau_bord_dg',
    name: 'Tableau de bord direction générale',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'KPIs stratégiques pour la direction : financiers, commerciaux, RH et opérationnels avec cibles et tendances',
    price: 1500, priceMax: 2000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisation', label: 'Nom de l\'organisation', type: 'text', required: true },
      { name: 'periode', label: 'Période d\'analyse', type: 'text', required: true },
      { name: 'directeur', label: 'Directeur général', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Tableau de Bord DG',
          title: 'Tableau de Bord Direction Générale',
          colorHeader: '1A237E',
          headers: ['Domaine', 'KPI', 'Unité', 'Cible', 'Réalisé', 'Écart', 'Performance %', 'Tendance'],
          rows: [
            ['Financier', 'Chiffre d\'affaires', 'FCFA', 0, 0, '=E{r}-D{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(F{r}>0,"▲","▼")'],
            ['Financier', 'EBITDA', 'FCFA', 0, 0, '=E{r}-D{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(F{r}>0,"▲","▼")'],
            ['Financier', 'Taux de marge nette', '%', 0, 0, '=E{r}-D{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(F{r}>0,"▲","▼")'],
            ['Commercial', 'Nouveaux clients', 'nb', 0, 0, '=E{r}-D{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(F{r}>0,"▲","▼")'],
            ['Commercial', 'Taux de satisfaction', '%', 0, 0, '=E{r}-D{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(F{r}>0,"▲","▼")'],
            ['RH', 'Taux d\'absentéisme', '%', 0, 0, '=E{r}-D{r}', '=IFERROR(D{r}/E{r}*100,0)', '=IF(F{r}<0,"▲","▼")'],
            ['RH', 'Turnover du personnel', '%', 0, 0, '=E{r}-D{r}', '=IFERROR(D{r}/E{r}*100,0)', '=IF(F{r}<0,"▲","▼")'],
            ['Opérationnel', 'Taux de livraison à temps', '%', 0, 0, '=E{r}-D{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(F{r}>0,"▲","▼")'],
            ['Opérationnel', 'Taux de défauts qualité', '%', 0, 0, '=E{r}-D{r}', '=IFERROR(D{r}/E{r}*100,0)', '=IF(F{r}<0,"▲","▼")'],
          ],
          totalsRow: false,
          colWidths: [18, 28, 10, 14, 14, 14, 14, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 80,
  },

  // 13. xl_str_capacite — Plan développement des capacités
  {
    code: 'xl_str_capacite',
    name: 'Plan développement des capacités',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Évaluation et plan de renforcement des compétences : niveau actuel, cible, formations et coûts',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisation', label: 'Nom de l\'organisation', type: 'text', required: true },
      { name: 'departement', label: 'Département / Service', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Plan Capacités',
          title: 'Plan de Développement des Capacités',
          colorHeader: '1A237E',
          headers: ['Compétence / Domaine', 'Niveau actuel (1-5)', 'Niveau cible (1-5)', 'Écart', 'Actions de formation', 'Coût estimé (FCFA)', 'Priorité'],
          rows: [
            ['Management & leadership', 0, 0, '=C{r}-B{r}', '', 0, '=IF(D{r}>=3,"HAUTE",IF(D{r}>=2,"MOYENNE","FAIBLE"))'],
            ['Gestion financière', 0, 0, '=C{r}-B{r}', '', 0, '=IF(D{r}>=3,"HAUTE",IF(D{r}>=2,"MOYENNE","FAIBLE"))'],
            ['Suivi-évaluation', 0, 0, '=C{r}-B{r}', '', 0, '=IF(D{r}>=3,"HAUTE",IF(D{r}>=2,"MOYENNE","FAIBLE"))'],
            ['Gestion de projet', 0, 0, '=C{r}-B{r}', '', 0, '=IF(D{r}>=3,"HAUTE",IF(D{r}>=2,"MOYENNE","FAIBLE"))'],
            ['Communication', 0, 0, '=C{r}-B{r}', '', 0, '=IF(D{r}>=3,"HAUTE",IF(D{r}>=2,"MOYENNE","FAIBLE"))'],
            ['Informatique & digital', 0, 0, '=C{r}-B{r}', '', 0, '=IF(D{r}>=3,"HAUTE",IF(D{r}>=2,"MOYENNE","FAIBLE"))'],
            ['Technique métier', 0, 0, '=C{r}-B{r}', '', 0, '=IF(D{r}>=3,"HAUTE",IF(D{r}>=2,"MOYENNE","FAIBLE"))'],
            ['TOTAL BUDGET FORMATION', '', '', '', '', '=SUM(F2:F8)', ''],
          ],
          totalsRow: false,
          colWidths: [26, 18, 16, 10, 28, 18, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 67,
  },

  // 14. xl_str_etude_marche — Grille étude de marché
  {
    code: 'xl_str_etude_marche',
    name: 'Grille étude de marché',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Analyse des segments de marché : taille, croissance, parts de marché et potentiel de CA',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur / Produit étudié', type: 'text', required: true },
      { name: 'date_etude', label: 'Date de l\'étude', type: 'date', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Étude de Marché',
          title: 'Grille d\'Étude de Marché',
          colorHeader: '1A237E',
          headers: ['Segment de marché', 'Taille du marché (FCFA)', 'Taux de croissance %', 'Part de marché actuelle %', 'Part cible %', 'Potentiel CA (FCFA)', 'Attractivité'],
          rows: [
            ['Segment A : Grande entreprise', 0, 0, 0, 0, '=B{r}*E{r}/100', '=IF(C{r}>=10,"FORT",IF(C{r}>=5,"MOYEN","FAIBLE"))'],
            ['Segment B : PME', 0, 0, 0, 0, '=B{r}*E{r}/100', '=IF(C{r}>=10,"FORT",IF(C{r}>=5,"MOYEN","FAIBLE"))'],
            ['Segment C : TPE / Artisans', 0, 0, 0, 0, '=B{r}*E{r}/100', '=IF(C{r}>=10,"FORT",IF(C{r}>=5,"MOYEN","FAIBLE"))'],
            ['Segment D : Particuliers', 0, 0, 0, 0, '=B{r}*E{r}/100', '=IF(C{r}>=10,"FORT",IF(C{r}>=5,"MOYEN","FAIBLE"))'],
            ['Segment E : Administrations', 0, 0, 0, 0, '=B{r}*E{r}/100', '=IF(C{r}>=10,"FORT",IF(C{r}>=5,"MOYEN","FAIBLE"))'],
            ['Segment F : ONG / Associations', 0, 0, 0, 0, '=B{r}*E{r}/100', '=IF(C{r}>=10,"FORT",IF(C{r}>=5,"MOYEN","FAIBLE"))'],
            ['TOTAL', '=SUM(B2:B7)', '', '', '', '=SUM(F2:F7)', ''],
          ],
          totalsRow: true,
          colWidths: [28, 22, 18, 22, 14, 20, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  // ─── ONG / SOCIAL (xl_ong_) ───────────────────────────────────────────────

  // 15. xl_ong_beneficiaires — Base données bénéficiaires
  {
    code: 'xl_ong_beneficiaires',
    name: 'Base données bénéficiaires',
    category: 'association',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Registre des bénéficiaires ONG : localité, profil de vulnérabilité, aides reçues et statut',
    price: 400, priceMax: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisation', label: 'Nom de l\'organisation', type: 'text', required: true },
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Bénéficiaires',
          title: 'Base de Données Bénéficiaires',
          colorHeader: '006064',
          headers: ['N°', 'Nom & Prénoms', 'Sexe', 'Âge', 'Localité / Village', 'Profil de vulnérabilité', 'Type d\'aide reçue', 'Date de prise en charge', 'Statut'],
          rows: [
            [1, '', 'F', 0, '', '', '', '', 'Actif'],
            [2, '', 'M', 0, '', '', '', '', 'Actif'],
            [3, '', 'F', 0, '', '', '', '', 'Actif'],
            [4, '', 'M', 0, '', '', '', '', 'Actif'],
            [5, '', 'F', 0, '', '', '', '', 'Actif'],
            [6, '', 'M', 0, '', '', '', '', 'Actif'],
            [7, '', 'F', 0, '', '', '', '', 'Actif'],
            [8, '', 'M', 0, '', '', '', '', 'Actif'],
            [9, '', 'F', 0, '', '', '', '', 'Actif'],
            [10, '', 'M', 0, '', '', '', '', 'Actif'],
          ],
          totalsRow: false,
          colWidths: [6, 26, 8, 8, 20, 24, 22, 20, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 16. xl_ong_rapport_activites — Rapport activités ONG
  {
    code: 'xl_ong_rapport_activites',
    name: 'Rapport activités ONG',
    category: 'association',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Rapport de suivi des activités : bénéficiaires touchés, résultats obtenus, indicateurs et taux de réalisation',
    price: 500, priceMax: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisation', label: 'Nom de l\'organisation', type: 'text', required: true },
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'periode', label: 'Période du rapport', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Rapport Activités',
          title: 'Rapport des Activités ONG',
          colorHeader: '006064',
          headers: ['Activité', 'Bénéficiaires prévus', 'Bénéficiaires touchés', 'dont Femmes', 'dont Hommes', 'Résultats obtenus', 'Indicateur clé', 'Taux réalisation %'],
          rows: [
            ['Formation professionnelle', 0, 0, 0, '=D{r}-C{r}', '', '', '=IFERROR(C{r}/B{r}*100,0)'],
            ['Sensibilisation communautaire', 0, 0, 0, '=D{r}-C{r}', '', '', '=IFERROR(C{r}/B{r}*100,0)'],
            ['Distribution de kits', 0, 0, 0, '=D{r}-C{r}', '', '', '=IFERROR(C{r}/B{r}*100,0)'],
            ['Appui nutritionnel', 0, 0, 0, '=D{r}-C{r}', '', '', '=IFERROR(C{r}/B{r}*100,0)'],
            ['Accompagnement psychosocial', 0, 0, 0, '=D{r}-C{r}', '', '', '=IFERROR(C{r}/B{r}*100,0)'],
            ['Accès à l\'eau potable', 0, 0, 0, '=D{r}-C{r}', '', '', '=IFERROR(C{r}/B{r}*100,0)'],
            ['Soins de santé', 0, 0, 0, '=D{r}-C{r}', '', '', '=IFERROR(C{r}/B{r}*100,0)'],
            ['TOTAL', '=SUM(B2:B8)', '=SUM(C2:C8)', '=SUM(D2:D8)', '=SUM(E2:E8)', '', '', '=IFERROR(C9/B9*100,0)'],
          ],
          totalsRow: true,
          colWidths: [28, 18, 20, 14, 14, 26, 20, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 17. xl_ong_collecte_fonds — Suivi collecte de fonds
  {
    code: 'xl_ong_collecte_fonds',
    name: 'Suivi collecte de fonds',
    category: 'association',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des financements ONG : bailleurs, montants promis, reçus, affectation et solde disponible',
    price: 500, priceMax: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisation', label: 'Nom de l\'organisation', type: 'text', required: true },
      { name: 'annee', label: 'Exercice', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable financier', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Collecte Fonds',
          title: 'Suivi de la Collecte de Fonds',
          colorHeader: '006064',
          headers: ['Bailleur / Donateur', 'Type', 'Montant promis', 'Montant reçu', 'Date réception', 'Affectation projet', 'Montant affecté', 'Solde disponible'],
          rows: [
            ['', 'Institutionnel', 0, 0, '', '', 0, '=D{r}-G{r}'],
            ['', 'Institutionnel', 0, 0, '', '', 0, '=D{r}-G{r}'],
            ['', 'Privé', 0, 0, '', '', 0, '=D{r}-G{r}'],
            ['', 'Privé', 0, 0, '', '', 0, '=D{r}-G{r}'],
            ['', 'Cotisations membres', 0, 0, '', '', 0, '=D{r}-G{r}'],
            ['', 'Évènement / Gala', 0, 0, '', '', 0, '=D{r}-G{r}'],
            ['', 'Don en ligne', 0, 0, '', '', 0, '=D{r}-G{r}'],
            ['TOTAL', '', '=SUM(C2:C8)', '=SUM(D2:D8)', '', '', '=SUM(G2:G8)', '=SUM(H2:H8)'],
          ],
          totalsRow: true,
          colWidths: [24, 18, 18, 16, 16, 22, 18, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  // 18. xl_ong_distributions — Suivi distributions
  {
    code: 'xl_ong_distributions',
    name: 'Suivi distributions',
    category: 'association',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Registre de distribution des articles aux bénéficiaires : quantités, dates et confirmation de réception',
    price: 200, priceMax: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisation', label: 'Nom de l\'organisation', type: 'text', required: true },
      { name: 'nom_activite', label: 'Activité de distribution', type: 'text', required: true },
      { name: 'date_distribution', label: 'Date de distribution', type: 'date', required: true },
      { name: 'lieu', label: 'Lieu de distribution', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Distributions',
          title: 'Registre des Distributions',
          colorHeader: '006064',
          headers: ['N°', 'Nom du bénéficiaire', 'Localité', 'Article distribué', 'Quantité reçue', 'Unité', 'Date de réception', 'Signature / Empreinte', 'Remarques'],
          rows: [
            [1, '', '', '', 0, 'unité', '', '', ''],
            [2, '', '', '', 0, 'unité', '', '', ''],
            [3, '', '', '', 0, 'unité', '', '', ''],
            [4, '', '', '', 0, 'unité', '', '', ''],
            [5, '', '', '', 0, 'unité', '', '', ''],
            [6, '', '', '', 0, 'unité', '', '', ''],
            [7, '', '', '', 0, 'unité', '', '', ''],
            [8, '', '', '', 0, 'unité', '', '', ''],
            [9, '', '', '', 0, 'unité', '', '', ''],
            [10, '', '', '', 0, 'unité', '', '', ''],
            ['TOTAL', '', '', '', '=SUM(E2:E11)', '', '', '', ''],
          ],
          totalsRow: false,
          colWidths: [6, 26, 18, 22, 14, 10, 18, 20, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // 19. xl_ong_budget_projet_social — Budget projet social
  {
    code: 'xl_ong_budget_projet_social',
    name: 'Budget projet social',
    category: 'association',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Budget détaillé d\'un projet social : rubriques, coût unitaire, quantité, total et sources de financement',
    price: 400, priceMax: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisation', label: 'Nom de l\'organisation', type: 'text', required: true },
      { name: 'nom_projet', label: 'Nom du projet social', type: 'text', required: true },
      { name: 'bailleur', label: 'Bailleur principal', type: 'text', required: false },
      { name: 'periode', label: 'Période du projet', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Budget Social',
          title: 'Budget Projet Social',
          colorHeader: '006064',
          headers: ['Rubrique budgétaire', 'Coût unitaire (FCFA)', 'Quantité', 'Durée (mois)', 'Total (FCFA)', 'Financement bailleur', 'Contrepartie locale', 'Observations'],
          rows: [
            ['1. Personnel du projet', 0, 1, 12, '=B{r}*C{r}*D{r}', '=E{r}*0.8', '=E{r}*0.2', ''],
            ['2. Consultants / Formateurs', 0, 1, 1, '=B{r}*C{r}*D{r}', '=E{r}', 0, ''],
            ['3. Équipements & matériels', 0, 1, 1, '=B{r}*C{r}*D{r}', '=E{r}', 0, ''],
            ['4. Fournitures de bureau', 0, 1, 12, '=B{r}*C{r}*D{r}', '=E{r}', 0, ''],
            ['5. Transport & logistique', 0, 1, 12, '=B{r}*C{r}*D{r}', '=E{r}*0.9', '=E{r}*0.1', ''],
            ['6. Communication', 0, 1, 12, '=B{r}*C{r}*D{r}', '=E{r}', 0, ''],
            ['7. Activités communautaires', 0, 1, 1, '=B{r}*C{r}*D{r}', '=E{r}*0.7', '=E{r}*0.3', ''],
            ['8. Suivi-évaluation', 0, 1, 1, '=B{r}*C{r}*D{r}', '=E{r}', 0, ''],
            ['9. Audit & rapportage', 0, 1, 1, '=B{r}*C{r}*D{r}', '=E{r}', 0, ''],
            ['TOTAL GÉNÉRAL', '', '', '', '=SUM(E2:E10)', '=SUM(F2:F10)', '=SUM(G2:G10)', ''],
          ],
          totalsRow: true,
          colWidths: [28, 18, 12, 14, 16, 20, 18, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 66,
  },

  // 20. xl_ong_evaluation_impact — Évaluation impact social
  {
    code: 'xl_ong_evaluation_impact',
    name: 'Évaluation impact social',
    category: 'association',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Mesure de l\'impact social d\'un projet : indicateurs, baseline, valeurs finales, variation et taux d\'atteinte',
    price: 600, priceMax: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisation', label: 'Nom de l\'organisation', type: 'text', required: true },
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'date_evaluation', label: 'Date d\'évaluation', type: 'date', required: true },
      { name: 'evaluateur', label: 'Évaluateur', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Évaluation Impact',
          title: 'Évaluation de l\'Impact Social',
          colorHeader: '006064',
          headers: ['Indicateur d\'impact', 'Unité', 'Valeur baseline', 'Cible fin projet', 'Valeur finale', 'Variation absolue', 'Taux d\'atteinte %', 'Appréciation'],
          rows: [
            ['Nb de bénéficiaires directs', 'personnes', 0, 0, 0, '=E{r}-C{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(G{r}>=100,"EXCELLENT",IF(G{r}>=80,"BON","INSUFFISANT"))'],
            ['Taux d\'accès aux services', '%', 0, 0, 0, '=E{r}-C{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(G{r}>=100,"EXCELLENT",IF(G{r}>=80,"BON","INSUFFISANT"))'],
            ['Revenu moyen bénéficiaires', 'FCFA', 0, 0, 0, '=E{r}-C{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(G{r}>=100,"EXCELLENT",IF(G{r}>=80,"BON","INSUFFISANT"))'],
            ['Taux de malnutrition', '%', 0, 0, 0, '=C{r}-E{r}', '=IFERROR((C{r}-E{r})/(C{r}-D{r})*100,0)', '=IF(G{r}>=100,"EXCELLENT",IF(G{r}>=80,"BON","INSUFFISANT"))'],
            ['Taux de scolarisation', '%', 0, 0, 0, '=E{r}-C{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(G{r}>=100,"EXCELLENT",IF(G{r}>=80,"BON","INSUFFISANT"))'],
            ['Nb de femmes autonomisées', 'personnes', 0, 0, 0, '=E{r}-C{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(G{r}>=100,"EXCELLENT",IF(G{r}>=80,"BON","INSUFFISANT"))'],
            ['Accès eau potable', '%', 0, 0, 0, '=E{r}-C{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(G{r}>=100,"EXCELLENT",IF(G{r}>=80,"BON","INSUFFISANT"))'],
            ['Satisfaction bénéficiaires', '/10', 0, 0, 0, '=E{r}-C{r}', '=IFERROR(E{r}/D{r}*100,0)', '=IF(G{r}>=100,"EXCELLENT",IF(G{r}>=80,"BON","INSUFFISANT"))'],
          ],
          totalsRow: false,
          colWidths: [30, 12, 16, 16, 14, 18, 16, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 64,
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
  console.log(`✅ Excel Projet/Social: ${created} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
