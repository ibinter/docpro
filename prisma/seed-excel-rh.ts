import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);
const COLOR = '1B5E20';

const templates = [
  // 1. Fiche de paie détaillée
  {
    code: 'xl_rh_fiche_paie',
    name: 'Fiche de paie détaillée',
    description: 'Calcul du salaire brut, cotisations sociales et salaire net à payer',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 900, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'nom_employe', label: 'Nom de l\'employé', type: 'text', required: true },
      { name: 'mois_paie', label: 'Mois de paie', type: 'text', required: true },
      { name: 'poste', label: 'Poste / Fonction', type: 'text', required: true },
      { name: 'salaire_base', label: 'Salaire de base (FCFA)', type: 'text', required: true },
      { name: 'matricule', label: 'Matricule', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Fiche de Paie',
          title: 'FICHE DE PAIE',
          colorHeader: COLOR,
          headers: ['Rubrique', 'Base', 'Taux (%)', 'Montant (FCFA)'],
          rows: [
            ['Salaire de base', 350000, '', 350000],
            ['Sursalaire / Indemnité logement', 50000, '', 50000],
            ['Indemnité de transport', 30000, '', 30000],
            ['Prime d\'ancienneté', 350000, '5%', 17500],
            ['Heures supplémentaires', 0, '', 0],
            ['— Cotisation CNPS (salarié)', 447500, '5.75%', `=D{r}-C{r}*B{r}`],
            ['— IRPP retenu à la source', 447500, '10%', `=D{r}-C{r}*B{r}`],
            ['— Cotisation maladie', 447500, '2.5%', `=D{r}-C{r}*B{r}`],
            ['SALAIRE BRUT', '', '', `=SUM(D2:D5)`],
            ['TOTAL RETENUES', '', '', `=SUM(D6:D8)`],
            ['NET À PAYER', '', '', `=D9-D10`],
          ],
          totalsRow: false,
          colWidths: [35, 18, 14, 20],
        },
      ],
    }),
  },

  // 2. Masse salariale mensuelle
  {
    code: 'xl_rh_masse_salariale',
    name: 'Masse salariale mensuelle',
    description: 'Tableau récapitulatif de la masse salariale avec charges patronales',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 1000, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'mois', label: 'Mois concerné', type: 'text', required: true },
      { name: 'responsable_rh', label: 'Responsable RH', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Masse Salariale',
          title: 'MASSE SALARIALE MENSUELLE',
          colorHeader: COLOR,
          headers: ['Nom & Prénom', 'Poste', 'Salaire Brut', 'Charges Patronales', 'Coût Total Employeur'],
          rows: [
            ['DIALLO Amadou', 'Directeur', 850000, `=C{r}*0.18`, `=C{r}+D{r}`],
            ['KOUASSI Marie', 'Comptable', 450000, `=C{r}*0.18`, `=C{r}+D{r}`],
            ['BAMBA Souleymane', 'Commercial', 380000, `=C{r}*0.18`, `=C{r}+D{r}`],
            ['TOURE Fatima', 'Assistante RH', 320000, `=C{r}*0.18`, `=C{r}+D{r}`],
            ['KONE Ibrahim', 'Technicien', 290000, `=C{r}*0.18`, `=C{r}+D{r}`],
            ['CAMARA Aissatou', 'Chargée comm.', 350000, `=C{r}*0.18`, `=C{r}+D{r}`],
            ['OUEDRAOGO Paul', 'Chauffeur', 200000, `=C{r}*0.18`, `=C{r}+D{r}`],
            ['TRAORE Awa', 'Secrétaire', 250000, `=C{r}*0.18`, `=C{r}+D{r}`],
          ],
          totalsRow: true,
          colWidths: [28, 22, 18, 20, 22],
        },
      ],
    }),
  },

  // 3. Planning mensuel équipe
  {
    code: 'xl_rh_planning',
    name: 'Planning mensuel équipe',
    description: 'Planning des présences, absences et jours travaillés par employé',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 700, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'equipe', label: 'Équipe / Service', type: 'text', required: true },
      { name: 'mois', label: 'Mois', type: 'text', required: true },
      { name: 'jours_ouvres', label: 'Nombre de jours ouvrés', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Planning',
          title: 'PLANNING MENSUEL ÉQUIPE',
          colorHeader: COLOR,
          headers: ['Employé', 'Jours Ouvrés', 'Présences', 'Congés', 'Absences', 'Jours Travaillés'],
          rows: [
            ['DIALLO Amadou', 22, 20, 2, 0, `=C{r}-D{r}-E{r}`],
            ['KOUASSI Marie', 22, 22, 0, 0, `=C{r}-D{r}-E{r}`],
            ['BAMBA Souleymane', 22, 18, 0, 4, `=C{r}-D{r}-E{r}`],
            ['TOURE Fatima', 22, 21, 1, 0, `=C{r}-D{r}-E{r}`],
            ['KONE Ibrahim', 22, 19, 2, 1, `=C{r}-D{r}-E{r}`],
            ['CAMARA Aissatou', 22, 22, 0, 0, `=C{r}-D{r}-E{r}`],
            ['OUEDRAOGO Paul', 22, 20, 0, 2, `=C{r}-D{r}-E{r}`],
          ],
          totalsRow: true,
          colWidths: [28, 16, 14, 12, 14, 20],
        },
      ],
    }),
  },

  // 4. Suivi congés annuels
  {
    code: 'xl_rh_conges',
    name: 'Suivi des congés annuels',
    description: 'Tableau de suivi des droits à congés, jours pris et soldes',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 600, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'annee', label: 'Année de référence', type: 'text', required: true },
      { name: 'service', label: 'Service', type: 'text', required: false },
      { name: 'droits_annuels', label: 'Droits annuels (jours)', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi Congés',
          title: 'SUIVI CONGÉS ANNUELS',
          colorHeader: COLOR,
          headers: ['Employé', 'Droits (jours)', 'Congés Pris', 'Reportés N-1', 'Solde Restant'],
          rows: [
            ['DIALLO Amadou', 30, 15, 5, `=B{r}-C{r}+D{r}`],
            ['KOUASSI Marie', 30, 30, 0, `=B{r}-C{r}+D{r}`],
            ['BAMBA Souleymane', 30, 10, 3, `=B{r}-C{r}+D{r}`],
            ['TOURE Fatima', 30, 20, 2, `=B{r}-C{r}+D{r}`],
            ['KONE Ibrahim', 30, 5, 0, `=B{r}-C{r}+D{r}`],
            ['CAMARA Aissatou', 30, 25, 0, `=B{r}-C{r}+D{r}`],
            ['OUEDRAOGO Paul', 30, 12, 4, `=B{r}-C{r}+D{r}`],
            ['TRAORE Awa', 30, 18, 0, `=B{r}-C{r}+D{r}`],
          ],
          totalsRow: true,
          colWidths: [28, 16, 16, 16, 18],
        },
      ],
    }),
  },

  // 5. Suivi recrutement
  {
    code: 'xl_rh_recrutement',
    name: 'Suivi du recrutement',
    description: 'Tableau de bord des postes à pourvoir, candidats et étapes de sélection',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 800, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'periode', label: 'Période de recrutement', type: 'text', required: true },
      { name: 'budget_recrutement', label: 'Budget recrutement (FCFA)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi Recrutement',
          title: 'SUIVI DU RECRUTEMENT',
          colorHeader: COLOR,
          headers: ['Poste', 'Candidats reçus', 'Présélectionnés', 'Entretiens', 'Retenus', 'Statut'],
          rows: [
            ['Directeur Commercial', 25, 8, 4, 1, 'Clôturé'],
            ['Comptable Senior', 18, 6, 3, 1, 'Clôturé'],
            ['Ingénieur Informatique', 30, 10, 5, 0, 'En cours'],
            ['Chargé Marketing', 22, 7, 4, 1, 'Clôturé'],
            ['Assistant RH', 15, 5, 3, 0, 'En cours'],
            ['Juriste', 12, 4, 2, 0, 'En attente'],
          ],
          totalsRow: false,
          colWidths: [28, 18, 18, 14, 12, 16],
        },
      ],
    }),
  },

  // 6. Fiche évaluation annuelle
  {
    code: 'xl_rh_evaluation',
    name: 'Fiche d\'évaluation annuelle',
    description: 'Évaluation des performances avec objectifs, résultats et scores',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 750, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'nom_employe', label: 'Nom de l\'employé', type: 'text', required: true },
      { name: 'poste', label: 'Poste', type: 'text', required: true },
      { name: 'annee', label: 'Année d\'évaluation', type: 'text', required: true },
      { name: 'evaluateur', label: 'Évaluateur', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Évaluation',
          title: 'FICHE D\'ÉVALUATION ANNUELLE',
          colorHeader: COLOR,
          headers: ['Objectif / Critère', 'Pondération (%)', 'Score Obtenu (/10)', 'Score Pondéré'],
          rows: [
            ['Atteinte des objectifs quantitatifs', 30, 8, `=B{r}/100*C{r}`],
            ['Qualité du travail fourni', 20, 7, `=B{r}/100*C{r}`],
            ['Respect des délais', 15, 9, `=B{r}/100*C{r}`],
            ['Esprit d\'équipe & collaboration', 15, 8, `=B{r}/100*C{r}`],
            ['Initiative & autonomie', 10, 7, `=B{r}/100*C{r}`],
            ['Respect des procédures', 10, 9, `=B{r}/100*C{r}`],
            ['SCORE GLOBAL (/10)', 100, '', `=SUM(D2:D7)`],
          ],
          totalsRow: false,
          colWidths: [38, 18, 22, 18],
        },
      ],
    }),
  },

  // 7. Plan de formation
  {
    code: 'xl_rh_formation',
    name: 'Plan de formation',
    description: 'Planification des formations avec participants, coûts et calendrier',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 800, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'budget_formation', label: 'Budget formation total (FCFA)', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable formation', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Plan Formation',
          title: 'PLAN DE FORMATION',
          colorHeader: COLOR,
          headers: ['Formation', 'Participants', 'Durée (jours)', 'Coût Unitaire', 'Coût Total', 'Date Prévue'],
          rows: [
            ['Gestion de projet', 5, 3, 150000, `=B{r}*D{r}`, 'Mars'],
            ['Excel avancé', 8, 2, 80000, `=B{r}*D{r}`, 'Avril'],
            ['Leadership & Management', 4, 2, 200000, `=B{r}*D{r}`, 'Mai'],
            ['Sécurité informatique', 10, 1, 50000, `=B{r}*D{r}`, 'Juin'],
            ['Communication professionnelle', 6, 2, 90000, `=B{r}*D{r}`, 'Juillet'],
            ['Comptabilité OHADA', 3, 3, 180000, `=B{r}*D{r}`, 'Septembre'],
            ['Anglais des affaires', 5, 10, 60000, `=B{r}*D{r}`, 'Octobre'],
          ],
          totalsRow: true,
          colWidths: [32, 14, 16, 18, 16, 16],
        },
      ],
    }),
  },

  // 8. Suivi heures supplémentaires
  {
    code: 'xl_rh_heures_sup',
    name: 'Suivi des heures supplémentaires',
    description: 'Calcul des heures supplémentaires, taux et montants à payer',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 600, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'mois', label: 'Mois', type: 'text', required: true },
      { name: 'taux_normal', label: 'Taux normal horaire (FCFA)', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable validation', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Heures Sup',
          title: 'SUIVI HEURES SUPPLÉMENTAIRES',
          colorHeader: COLOR,
          headers: ['Employé', 'Heures (25%)', 'Heures (50%)', 'Taux Horaire', 'Montant 25%', 'Montant 50%', 'Total Dû'],
          rows: [
            ['DIALLO Amadou', 8, 4, 2100, `=B{r}*D{r}*1.25`, `=C{r}*D{r}*1.5`, `=E{r}+F{r}`],
            ['KOUASSI Marie', 6, 2, 1700, `=B{r}*D{r}*1.25`, `=C{r}*D{r}*1.5`, `=E{r}+F{r}`],
            ['BAMBA Souleymane', 10, 5, 1500, `=B{r}*D{r}*1.25`, `=C{r}*D{r}*1.5`, `=E{r}+F{r}`],
            ['TOURE Fatima', 4, 0, 1300, `=B{r}*D{r}*1.25`, `=C{r}*D{r}*1.5`, `=E{r}+F{r}`],
            ['KONE Ibrahim', 12, 6, 1200, `=B{r}*D{r}*1.25`, `=C{r}*D{r}*1.5`, `=E{r}+F{r}`],
            ['CAMARA Aissatou', 5, 2, 1400, `=B{r}*D{r}*1.25`, `=C{r}*D{r}*1.5`, `=E{r}+F{r}`],
          ],
          totalsRow: true,
          colWidths: [26, 14, 14, 16, 16, 16, 16],
        },
      ],
    }),
  },

  // 9. Taux d'absentéisme
  {
    code: 'xl_rh_absenteisme',
    name: 'Taux d\'absentéisme',
    description: 'Analyse de l\'absentéisme par motif, jours perdus et coût estimé',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 700, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'effectif_total', label: 'Effectif total', type: 'text', required: true },
      { name: 'jours_ouvres', label: 'Jours ouvrés théoriques', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Absentéisme',
          title: 'ANALYSE DE L\'ABSENTÉISME',
          colorHeader: COLOR,
          headers: ['Motif d\'Absence', 'Nb Employés', 'Jours Perdus', 'Coût Journalier Moy.', 'Coût Total', 'Taux (%)'],
          rows: [
            ['Maladie ordinaire', 8, 32, 15000, `=C{r}*D{r}`, `=C{r}/220*100`],
            ['Accident de travail', 2, 15, 15000, `=C{r}*D{r}`, `=C{r}/220*100`],
            ['Congé maternité', 1, 98, 15000, `=C{r}*D{r}`, `=C{r}/220*100`],
            ['Absence injustifiée', 5, 12, 15000, `=C{r}*D{r}`, `=C{r}/220*100`],
            ['Événement familial', 6, 18, 15000, `=C{r}*D{r}`, `=C{r}/220*100`],
            ['Formation externe', 4, 20, 15000, `=C{r}*D{r}`, `=C{r}/220*100`],
          ],
          totalsRow: true,
          colWidths: [30, 15, 15, 22, 18, 12],
        },
      ],
    }),
  },

  // 10. Calcul charges sociales patronales
  {
    code: 'xl_rh_charges_sociales',
    name: 'Calcul charges sociales patronales',
    description: 'Détail des charges patronales CNPS, IRPP et autres contributions',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 1000, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'mois', label: 'Mois', type: 'text', required: true },
      { name: 'effectif', label: 'Effectif salarié', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Charges Sociales',
          title: 'CHARGES SOCIALES PATRONALES',
          colorHeader: COLOR,
          headers: ['Cotisation', 'Base de Calcul', 'Taux Patronal (%)', 'Montant Patronal', 'Taux Salarial (%)', 'Montant Salarial'],
          rows: [
            ['CNPS — Vieillesse', 'Salaire plafonné', '5.75%', `=B{r}*0.0575`, '3.6%', `=B{r}*0.036`],
            ['CNPS — Maladie', 'Salaire brut', '3.5%', `=B{r}*0.035`, '2.5%', `=B{r}*0.025`],
            ['CNPS — AT/MP', 'Salaire brut', '1.75%', `=B{r}*0.0175`, '0%', 0],
            ['CNPS — Allocations familiales', 'Salaire brut', '5.6%', `=B{r}*0.056`, '0%', 0],
            ['Taxe d\'apprentissage', 'Masse salariale', '0.4%', `=B{r}*0.004`, '0%', 0],
            ['FNE (Fonds National Emploi)', 'Masse salariale', '1%', `=B{r}*0.01`, '1%', `=B{r}*0.01`],
            ['TOTAL CHARGES', '', '', `=SUM(D2:D7)`, '', `=SUM(F2:F7)`],
          ],
          totalsRow: false,
          colWidths: [32, 22, 18, 20, 18, 20],
        },
      ],
    }),
  },

  // 11. Tableau des effectifs
  {
    code: 'xl_rh_effectif',
    name: 'Tableau des effectifs',
    description: 'Répertoire des postes, niveaux, ancienneté et salaires de l\'entreprise',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 700, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'date_arrete', label: 'Date d\'arrêté', type: 'date', required: true },
      { name: 'service', label: 'Service / Direction', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Effectifs',
          title: 'TABLEAU DES EFFECTIFS',
          colorHeader: COLOR,
          headers: ['Nom & Prénom', 'Poste', 'Catégorie', 'Date Entrée', 'Ancienneté (ans)', 'Salaire Brut'],
          rows: [
            ['DIALLO Amadou', 'DG', 'Cadre supérieur', '01/06/2015', `=YEAR(TODAY())-YEAR(D{r})`, 1200000],
            ['KOUASSI Marie', 'DAF', 'Cadre', '15/03/2017', `=YEAR(TODAY())-YEAR(D{r})`, 850000],
            ['BAMBA Souleymane', 'Chef des ventes', 'Cadre', '01/09/2018', `=YEAR(TODAY())-YEAR(D{r})`, 650000],
            ['TOURE Fatima', 'RH Manager', 'Cadre', '10/01/2019', `=YEAR(TODAY())-YEAR(D{r})`, 580000],
            ['KONE Ibrahim', 'Technicien IT', 'Maîtrise', '05/04/2020', `=YEAR(TODAY())-YEAR(D{r})`, 380000],
            ['CAMARA Aissatou', 'Commerciale', 'Agent', '12/07/2021', `=YEAR(TODAY())-YEAR(D{r})`, 320000],
            ['OUEDRAOGO Paul', 'Agent sécurité', 'Agent', '01/02/2022', `=YEAR(TODAY())-YEAR(D{r})`, 200000],
            ['TRAORE Awa', 'Secrétaire', 'Employé', '20/11/2020', `=YEAR(TODAY())-YEAR(D{r})`, 250000],
          ],
          totalsRow: false,
          colWidths: [28, 22, 18, 15, 18, 18],
        },
      ],
    }),
  },

  // 12. Taux de turnover
  {
    code: 'xl_rh_turnover',
    name: 'Analyse du turnover',
    description: 'Calcul du taux de rotation du personnel avec entrées, sorties et analyse',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 800, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'effectif_debut', label: 'Effectif début d\'année', type: 'text', required: true },
      { name: 'effectif_fin', label: 'Effectif fin d\'année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Turnover',
          title: 'ANALYSE DU TURNOVER',
          colorHeader: COLOR,
          headers: ['Mois', 'Entrées', 'Sorties', 'Effectif Fin Mois', 'Taux Mensuel (%)'],
          rows: [
            ['Janvier', 2, 1, 52, `=(B{r}+C{r})/2/D{r}*100`],
            ['Février', 0, 1, 51, `=(B{r}+C{r})/2/D{r}*100`],
            ['Mars', 3, 0, 54, `=(B{r}+C{r})/2/D{r}*100`],
            ['Avril', 1, 2, 53, `=(B{r}+C{r})/2/D{r}*100`],
            ['Mai', 0, 1, 52, `=(B{r}+C{r})/2/D{r}*100`],
            ['Juin', 2, 3, 51, `=(B{r}+C{r})/2/D{r}*100`],
            ['Juillet', 1, 0, 52, `=(B{r}+C{r})/2/D{r}*100`],
            ['Août', 0, 2, 50, `=(B{r}+C{r})/2/D{r}*100`],
            ['Septembre', 4, 1, 53, `=(B{r}+C{r})/2/D{r}*100`],
            ['Octobre', 0, 0, 53, `=(B{r}+C{r})/2/D{r}*100`],
            ['Novembre', 1, 1, 53, `=(B{r}+C{r})/2/D{r}*100`],
            ['Décembre', 0, 3, 50, `=(B{r}+C{r})/2/D{r}*100`],
          ],
          totalsRow: true,
          colWidths: [16, 12, 12, 20, 20],
        },
      ],
    }),
  },

  // 13. Calcul indemnités de licenciement
  {
    code: 'xl_rh_indemnites',
    name: 'Calcul indemnités de licenciement',
    description: 'Calcul des indemnités légales de licenciement selon ancienneté et salaire',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 1000, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'pays', label: 'Pays (réglementation)', type: 'text', required: true },
      { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'date_calcul', label: 'Date de calcul', type: 'date', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Indemnités',
          title: 'CALCUL INDEMNITÉS DE LICENCIEMENT',
          colorHeader: COLOR,
          headers: ['Employé', 'Salaire Brut Moy.', 'Ancienneté (ans)', 'Indem. Légale (mois)', 'Montant Indem.', 'Préavis (mois)', 'Coût Total'],
          rows: [
            ['DIALLO Amadou', 850000, 10, `=IF(C{r}<=5,C{r}*0.3,C{r}*0.4)`, `=B{r}*D{r}`, 3, `=E{r}+B{r}*F{r}`],
            ['KOUASSI Marie', 580000, 7, `=IF(C{r}<=5,C{r}*0.3,C{r}*0.4)`, `=B{r}*D{r}`, 2, `=E{r}+B{r}*F{r}`],
            ['BAMBA Souleymane', 380000, 5, `=IF(C{r}<=5,C{r}*0.3,C{r}*0.4)`, `=B{r}*D{r}`, 1, `=E{r}+B{r}*F{r}`],
            ['TOURE Fatima', 320000, 6, `=IF(C{r}<=5,C{r}*0.3,C{r}*0.4)`, `=B{r}*D{r}`, 2, `=E{r}+B{r}*F{r}`],
            ['KONE Ibrahim', 290000, 4, `=IF(C{r}<=5,C{r}*0.3,C{r}*0.4)`, `=B{r}*D{r}`, 1, `=E{r}+B{r}*F{r}`],
          ],
          totalsRow: true,
          colWidths: [26, 20, 18, 22, 20, 16, 18],
        },
      ],
    }),
  },

  // 14. Feuille de pointage hebdomadaire
  {
    code: 'xl_rh_pointage',
    name: 'Feuille de pointage hebdomadaire',
    description: 'Relevé des heures d\'arrivée, départ, pauses et total hebdomadaire',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 500, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'nom_employe', label: 'Nom de l\'employé', type: 'text', required: true },
      { name: 'semaine', label: 'Semaine du ... au ...', type: 'text', required: true },
      { name: 'service', label: 'Service', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Pointage',
          title: 'FEUILLE DE POINTAGE HEBDOMADAIRE',
          colorHeader: COLOR,
          headers: ['Jour', 'Heure Arrivée', 'Heure Départ', 'Pause (h)', 'Heures Travaillées', 'Observations'],
          rows: [
            ['Lundi', '08:00', '17:30', 1, `=TIMEVALUE(C{r})-TIMEVALUE(B{r})-D{r}/24`, ''],
            ['Mardi', '08:15', '17:45', 1, `=TIMEVALUE(C{r})-TIMEVALUE(B{r})-D{r}/24`, ''],
            ['Mercredi', '08:00', '17:30', 1, `=TIMEVALUE(C{r})-TIMEVALUE(B{r})-D{r}/24`, 'Réunion 14h'],
            ['Jeudi', '08:30', '18:00', 1, `=TIMEVALUE(C{r})-TIMEVALUE(B{r})-D{r}/24`, ''],
            ['Vendredi', '08:00', '16:00', 0.5, `=TIMEVALUE(C{r})-TIMEVALUE(B{r})-D{r}/24`, ''],
            ['Samedi', '09:00', '13:00', 0, `=TIMEVALUE(C{r})-TIMEVALUE(B{r})-D{r}/24`, 'HS'],
            ['TOTAL SEMAINE', '', '', '', `=SUM(E2:E7)`, ''],
          ],
          totalsRow: false,
          colWidths: [16, 16, 16, 14, 22, 24],
        },
      ],
    }),
  },

  // 15. Gestion primes et bonus
  {
    code: 'xl_rh_primes',
    name: 'Gestion des primes et bonus',
    description: 'Tableau de calcul et suivi des primes selon critères et performances',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 700, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'budget_primes', label: 'Budget primes (FCFA)', type: 'text', required: true },
      { name: 'critere_principal', label: 'Critère principal', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Primes',
          title: 'GESTION DES PRIMES ET BONUS',
          colorHeader: COLOR,
          headers: ['Employé', 'Salaire Base', 'Score Perf. (%)', 'Prime Performance', 'Prime Ancienneté', 'Bonus Exceptionnel', 'Total Prime'],
          rows: [
            ['DIALLO Amadou', 850000, 95, `=B{r}*C{r}/100*0.15`, 50000, 100000, `=D{r}+E{r}+F{r}`],
            ['KOUASSI Marie', 580000, 88, `=B{r}*C{r}/100*0.15`, 30000, 0, `=D{r}+E{r}+F{r}`],
            ['BAMBA Souleymane', 380000, 75, `=B{r}*C{r}/100*0.15`, 20000, 0, `=D{r}+E{r}+F{r}`],
            ['TOURE Fatima', 320000, 92, `=B{r}*C{r}/100*0.15`, 15000, 50000, `=D{r}+E{r}+F{r}`],
            ['KONE Ibrahim', 290000, 80, `=B{r}*C{r}/100*0.15`, 10000, 0, `=D{r}+E{r}+F{r}`],
            ['CAMARA Aissatou', 350000, 85, `=B{r}*C{r}/100*0.15`, 12000, 0, `=D{r}+E{r}+F{r}`],
          ],
          totalsRow: true,
          colWidths: [26, 16, 16, 20, 18, 20, 16],
        },
      ],
    }),
  },

  // 16. Suivi avances sur salaire
  {
    code: 'xl_rh_avance',
    name: 'Suivi avances sur salaire',
    description: 'Gestion des demandes d\'avance, montants accordés et remboursements',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 500, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'plafond_avance', label: 'Plafond avance (% salaire)', type: 'text', required: false },
      { name: 'responsable', label: 'Responsable validation', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Avances Salaire',
          title: 'SUIVI AVANCES SUR SALAIRE',
          colorHeader: COLOR,
          headers: ['Employé', 'Date Demande', 'Montant Accordé', 'Nb Mensualités', 'Mensualité', 'Remboursé', 'Solde Restant'],
          rows: [
            ['DIALLO Amadou', '05/01/2025', 500000, 5, `=C{r}/D{r}`, 200000, `=C{r}-F{r}`],
            ['BAMBA Souleymane', '12/02/2025', 200000, 4, `=C{r}/D{r}`, 100000, `=C{r}-F{r}`],
            ['KONE Ibrahim', '01/03/2025', 150000, 3, `=C{r}/D{r}`, 50000, `=C{r}-F{r}`],
            ['TRAORE Awa', '20/03/2025', 100000, 2, `=C{r}/D{r}`, 50000, `=C{r}-F{r}`],
            ['OUEDRAOGO Paul', '10/04/2025', 80000, 2, `=C{r}/D{r}`, 40000, `=C{r}-F{r}`],
          ],
          totalsRow: true,
          colWidths: [26, 16, 18, 16, 16, 16, 18],
        },
      ],
    }),
  },

  // 17. Matrice des compétences
  {
    code: 'xl_rh_competences',
    name: 'Matrice des compétences',
    description: 'Cartographie des compétences par employé avec niveaux de maîtrise',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 900, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'service', label: 'Service / Équipe', type: 'text', required: true },
      { name: 'date_evaluation', label: 'Date d\'évaluation', type: 'date', required: true },
      { name: 'echelle', label: 'Échelle (ex: 1=Débutant, 4=Expert)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Compétences',
          title: 'MATRICE DES COMPÉTENCES (1=Débutant / 4=Expert)',
          colorHeader: COLOR,
          headers: ['Employé', 'Gestion projet', 'Excel/Bureautique', 'Anglais', 'Management', 'Comptabilité', 'Score Moyen'],
          rows: [
            ['DIALLO Amadou', 4, 3, 4, 4, 3, `=AVERAGE(B{r}:F{r})`],
            ['KOUASSI Marie', 3, 4, 3, 2, 4, `=AVERAGE(B{r}:F{r})`],
            ['BAMBA Souleymane', 3, 2, 2, 3, 1, `=AVERAGE(B{r}:F{r})`],
            ['TOURE Fatima', 3, 3, 3, 3, 2, `=AVERAGE(B{r}:F{r})`],
            ['KONE Ibrahim', 2, 4, 2, 1, 2, `=AVERAGE(B{r}:F{r})`],
            ['CAMARA Aissatou', 2, 3, 3, 2, 1, `=AVERAGE(B{r}:F{r})`],
            ['OUEDRAOGO Paul', 1, 1, 1, 1, 1, `=AVERAGE(B{r}:F{r})`],
          ],
          totalsRow: false,
          colWidths: [26, 16, 20, 12, 14, 14, 16],
        },
      ],
    }),
  },

  // 18. Budget RH annuel
  {
    code: 'xl_rh_budget_rh',
    name: 'Budget RH annuel',
    description: 'Planification du budget annuel RH : recrutement, formation, salaires',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 1200, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année budgétaire', type: 'text', required: true },
      { name: 'drh', label: 'Directeur RH', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Budget RH',
          title: 'BUDGET RH ANNUEL',
          colorHeader: COLOR,
          headers: ['Poste Budgétaire', 'Budget Prévu', 'Réalisé T1', 'Réalisé T2', 'Réalisé T3', 'Réalisé T4', 'Total Réalisé', 'Écart'],
          rows: [
            ['Masse salariale', 120000000, 30000000, 30000000, 30500000, 31000000, `=SUM(C{r}:F{r})`, `=B{r}-G{r}`],
            ['Recrutement', 5000000, 2000000, 1500000, 500000, 0, `=SUM(C{r}:F{r})`, `=B{r}-G{r}`],
            ['Formation professionnelle', 8000000, 1500000, 2000000, 2500000, 1000000, `=SUM(C{r}:F{r})`, `=B{r}-G{r}`],
            ['Primes et bonus', 15000000, 0, 0, 0, 15000000, `=SUM(C{r}:F{r})`, `=B{r}-G{r}`],
            ['Avantages sociaux', 6000000, 1500000, 1500000, 1500000, 1500000, `=SUM(C{r}:F{r})`, `=B{r}-G{r}`],
            ['Frais administratifs RH', 2000000, 500000, 500000, 500000, 500000, `=SUM(C{r}:F{r})`, `=B{r}-G{r}`],
            ['TOTAL BUDGET RH', `=SUM(B2:B7)`, `=SUM(C2:C7)`, `=SUM(D2:D7)`, `=SUM(E2:E7)`, `=SUM(F2:F7)`, `=SUM(G2:G7)`, `=SUM(H2:H7)`],
          ],
          totalsRow: false,
          colWidths: [30, 18, 16, 16, 16, 16, 18, 14],
        },
      ],
    }),
  },

  // 19. Calcul ancienneté et progression
  {
    code: 'xl_rh_anciennete',
    name: 'Calcul de l\'ancienneté et progression',
    description: 'Suivi des dates d\'entrée, calcul d\'ancienneté et progression d\'échelon',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 600, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'date_reference', label: 'Date de référence', type: 'date', required: true },
      { name: 'taux_prime_anciennete', label: 'Taux prime ancienneté (%/an)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Ancienneté',
          title: 'CALCUL ANCIENNETÉ ET PROGRESSION',
          colorHeader: COLOR,
          headers: ['Employé', 'Date Entrée', 'Ancienneté (ans)', 'Échelon Actuel', 'Prochain Avancement', 'Salaire Base', 'Prime Ancienneté'],
          rows: [
            ['DIALLO Amadou', '01/06/2015', `=YEAR(TODAY())-YEAR(B{r})`, 'E4', '01/06/2027', 850000, `=F{r}*C{r}*0.05`],
            ['KOUASSI Marie', '15/03/2017', `=YEAR(TODAY())-YEAR(B{r})`, 'E3', '15/03/2025', 580000, `=F{r}*C{r}*0.05`],
            ['BAMBA Souleymane', '01/09/2018', `=YEAR(TODAY())-YEAR(B{r})`, 'E2', '01/09/2026', 380000, `=F{r}*C{r}*0.05`],
            ['TOURE Fatima', '10/01/2019', `=YEAR(TODAY())-YEAR(B{r})`, 'E2', '10/01/2027', 320000, `=F{r}*C{r}*0.05`],
            ['KONE Ibrahim', '05/04/2020', `=YEAR(TODAY())-YEAR(B{r})`, 'E1', '05/04/2026', 290000, `=F{r}*C{r}*0.05`],
            ['CAMARA Aissatou', '12/07/2021', `=YEAR(TODAY())-YEAR(B{r})`, 'E1', '12/07/2027', 320000, `=F{r}*C{r}*0.05`],
            ['OUEDRAOGO Paul', '01/02/2022', `=YEAR(TODAY())-YEAR(B{r})`, 'E1', '01/02/2028', 200000, `=F{r}*C{r}*0.05`],
          ],
          totalsRow: false,
          colWidths: [26, 16, 18, 16, 20, 16, 20],
        },
      ],
    }),
  },

  // 20. Répertoire du personnel (organigramme)
  {
    code: 'xl_rh_organigramme',
    name: 'Répertoire du personnel',
    description: 'Annuaire complet du personnel avec postes, services et contacts',
    category: 'rh_emploi',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    price: 400, currency: 'XOF',
    countriesJson: COUNTRIES,
    active: true,
    fieldsJson: JSON.stringify([
      { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'date_mise_a_jour', label: 'Date de mise à jour', type: 'date', required: true },
      { name: 'responsable_rh', label: 'Responsable RH', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Répertoire',
          title: 'RÉPERTOIRE DU PERSONNEL',
          colorHeader: COLOR,
          headers: ['Nom & Prénom', 'Poste', 'Service', 'Téléphone', 'Email', 'Statut'],
          rows: [
            ['DIALLO Amadou', 'Directeur Général', 'Direction', '+225 07 00 00 01', 'a.diallo@entreprise.ci', 'CDI'],
            ['KOUASSI Marie', 'DAF', 'Finance', '+225 07 00 00 02', 'm.kouassi@entreprise.ci', 'CDI'],
            ['BAMBA Souleymane', 'Chef des Ventes', 'Commercial', '+225 07 00 00 03', 's.bamba@entreprise.ci', 'CDI'],
            ['TOURE Fatima', 'Manager RH', 'RH', '+225 07 00 00 04', 'f.toure@entreprise.ci', 'CDI'],
            ['KONE Ibrahim', 'Technicien IT', 'Informatique', '+225 07 00 00 05', 'i.kone@entreprise.ci', 'CDI'],
            ['CAMARA Aissatou', 'Commerciale', 'Commercial', '+225 07 00 00 06', 'a.camara@entreprise.ci', 'CDI'],
            ['OUEDRAOGO Paul', 'Agent Sécurité', 'Sécurité', '+225 07 00 00 07', 'p.ouedraogo@entreprise.ci', 'CDD'],
            ['TRAORE Awa', 'Secrétaire', 'Direction', '+225 07 00 00 08', 'a.traore@entreprise.ci', 'CDI'],
            ['DIABATE Seydou', 'Magasinier', 'Logistique', '+225 07 00 00 09', 's.diabate@entreprise.ci', 'CDI'],
            ['COULIBALY Nadia', 'Assistante Compta', 'Finance', '+225 07 00 00 10', 'n.coulibaly@entreprise.ci', 'Stagiaire'],
          ],
          totalsRow: false,
          colWidths: [28, 24, 18, 20, 32, 12],
        },
      ],
    }),
  },
];

async function main() {
  let created = 0;
  for (const t of templates) {
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    if (existing) {
      await prisma.documentTemplate.update({ where: { code: t.code }, data: t });
    } else {
      await prisma.documentTemplate.create({ data: t });
      created++;
    }
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Excel RH: ${created} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
