import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  // ─── SANTÉ (color: 880E4F) ───────────────────────────────────────────────
  {
    code: 'xl_san_rdv',
    name: 'Planning rendez-vous cabinet médical',
    category: 'sante',
    description: 'Gérer les rendez-vous patients : dates, types de consultation et statuts',
    price: 500, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_cabinet', label: 'Nom du cabinet / clinique', type: 'text', required: true },
      { name: 'medecin', label: 'Nom du médecin', type: 'text', required: true },
      { name: 'periode', label: 'Période (ex: Semaine 28 – Juillet 2025)', type: 'text', required: true },
      { name: 'specialite', label: 'Spécialité médicale', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Planning RDV',
          title: 'Planning Rendez-vous — {{nom_cabinet}} ({{medecin}})',
          colorHeader: '880E4F',
          headers: ['N°', 'Patient', 'Date', 'Heure', 'Type consultation', 'Statut', 'Observations'],
          rows: [
            [1, 'Konan Amélie', '2025-07-14', '08h00', 'Consultation générale', 'Confirmé', ''],
            [2, 'Traoré Moussa', '2025-07-14', '09h00', 'Suivi tension', 'Confirmé', 'Apporter carnet'],
            [3, 'Diallo Fatou', '2025-07-14', '10h00', 'Pédiatrie', 'En attente', ''],
            [4, 'Kouassi Jean', '2025-07-15', '08h30', 'Bilan sanguin', 'Annulé', 'Reporter'],
            [5, 'Bamba Awa', '2025-07-15', '09h30', 'Consultation générale', 'Confirmé', ''],
            [6, 'Ouédraogo Paul', '2025-07-16', '10h00', 'Suivi diabète', 'Confirmé', 'Résultats labo'],
            [7, 'Ndiaye Rama', '2025-07-16', '11h00', 'Gynécologie', 'En attente', ''],
            [8, 'Coulibaly Sidi', '2025-07-17', '08h00', 'Ophtalmologie', 'Confirmé', ''],
          ],
          totalsRow: false,
          colWidths: [8, 28, 16, 10, 25, 16, 24],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'xl_san_facturation',
    name: 'Facturation soins médicaux',
    category: 'sante',
    description: 'Facturer les actes médicaux : quantités, prix, total et part assurance',
    price: 700, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_cabinet', label: 'Cabinet / Établissement', type: 'text', required: true },
      { name: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { name: 'date_facture', label: 'Date de la facture', type: 'date', required: true },
      { name: 'num_facture', label: 'Numéro de facture', type: 'text', required: false },
      { name: 'assurance', label: 'Assurance / mutuelle', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Facturation',
          title: 'Facture Soins — {{nom_patient}} — {{date_facture}}',
          colorHeader: '880E4F',
          headers: ['Acte / Prestation', 'Code', 'Qté', 'Prix unitaire (FCFA)', 'Total (FCFA)', 'Part assurance (FCFA)', 'Part patient (FCFA)'],
          rows: [
            ['Consultation générale', 'CG001', 1, 5000, 5000, 3000, 2000],
            ['Bilan sanguin complet', 'BS002', 1, 15000, 15000, 10000, 5000],
            ['Radiographie thorax', 'RX003', 1, 20000, 20000, 15000, 5000],
            ['Injection IV', 'IJ004', 2, 2500, 5000, 2500, 2500],
            ['Pansement', 'PN005', 3, 1500, 4500, 0, 4500],
            ['Médicaments prescrits', 'MK006', 1, 8000, 8000, 4000, 4000],
          ],
          totalsRow: true,
          colWidths: [30, 12, 8, 22, 18, 24, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  {
    code: 'xl_san_medicaments',
    name: 'Gestion pharmacie / médicaments',
    category: 'sante',
    description: 'Suivre le stock de médicaments, seuils d\'alerte et valeur de stock',
    price: 800, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_pharmacie', label: 'Pharmacie / Établissement', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable stock', type: 'text', required: true },
      { name: 'date_inventaire', label: 'Date inventaire', type: 'date', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Stock Médicaments',
          title: 'Inventaire Médicaments — {{nom_pharmacie}} — {{date_inventaire}}',
          colorHeader: '880E4F',
          headers: ['Référence', 'Dénomination', 'Forme', 'Stock actuel', 'Seuil alerte', 'Statut stock', 'Prix unit. (FCFA)', 'Valeur stock (FCFA)'],
          rows: [
            ['MED001', 'Paracétamol 500mg', 'Comprimé', 200, 50, 'OK', 150, 30000],
            ['MED002', 'Amoxicilline 500mg', 'Gélule', 80, 30, 'OK', 350, 28000],
            ['MED003', 'Ibuprofène 400mg', 'Comprimé', 45, 50, 'ALERTE', 200, 9000],
            ['MED004', 'Métronidazole 250mg', 'Comprimé', 120, 40, 'OK', 180, 21600],
            ['MED005', 'Sérum physiologique', 'Flacon 500ml', 15, 20, 'CRITIQUE', 1200, 18000],
            ['MED006', 'Gants chirurgicaux L', 'Boîte 100', 8, 10, 'ALERTE', 3500, 28000],
            ['MED007', 'Bétadine 1L', 'Flacon', 22, 15, 'OK', 4500, 99000],
            ['MED008', 'Tramadol 100mg', 'Ampoule', 30, 20, 'OK', 800, 24000],
          ],
          totalsRow: true,
          colWidths: [12, 28, 14, 14, 14, 14, 20, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'xl_san_personnel',
    name: 'Planning personnel soignant',
    category: 'sante',
    description: 'Planifier les équipes, gardes et remplacements du personnel soignant',
    price: 600, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Établissement de santé', type: 'text', required: true },
      { name: 'service', label: 'Service / Unité', type: 'text', required: true },
      { name: 'mois_planning', label: 'Mois du planning', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Planning Personnel',
          title: 'Planning Soignants — {{service}} — {{mois_planning}}',
          colorHeader: '880E4F',
          headers: ['Agent', 'Poste / Grade', 'Lun 14', 'Mar 15', 'Mer 16', 'Jeu 17', 'Ven 18', 'Sam 19', 'Dim 20', 'Total h/sem'],
          rows: [
            ['Dr Konan Aimée', 'Médecin généraliste', 'M', 'S', 'M', 'S', 'M', 'G', 'R', 40],
            ['Inf. Traoré Ali', 'Infirmier chef', 'M', 'M', 'S', 'S', 'R', 'M', 'G', 40],
            ['Inf. Diallo Binta', 'Infirmière', 'S', 'M', 'M', 'R', 'S', 'G', 'M', 40],
            ['AS Coulibaly Yves', 'Aide-soignant', 'M', 'R', 'M', 'M', 'G', 'S', 'S', 35],
            ['Sage-f. Bamba Adj.', 'Sage-femme', 'S', 'S', 'R', 'M', 'M', 'M', 'G', 40],
            ['Secr. Ouatt. Nina', 'Secrétaire méd.', 'M', 'M', 'M', 'M', 'M', 'R', 'R', 35],
          ],
          totalsRow: false,
          colWidths: [24, 24, 10, 10, 10, 10, 10, 10, 10, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'xl_san_recettes',
    name: 'Suivi recettes cabinet médical',
    category: 'sante',
    description: 'Suivre les encaissements, actes réalisés et identifier les impayés',
    price: 750, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_cabinet', label: 'Nom du cabinet', type: 'text', required: true },
      { name: 'mois', label: 'Mois / Année', type: 'text', required: true },
      { name: 'medecin', label: 'Médecin responsable', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Recettes Cabinet',
          title: 'Suivi Recettes — {{nom_cabinet}} — {{mois}}',
          colorHeader: '880E4F',
          headers: ['Date', 'Patient', 'Acte réalisé', 'Montant facturé (FCFA)', 'Encaissé (FCFA)', 'Assurance (FCFA)', 'Impayé (FCFA)', 'Mode règlement'],
          rows: [
            ['14/07/2025', 'Kouassi M.', 'Consultation', 5000, 5000, 0, 0, 'Espèces'],
            ['14/07/2025', 'Bamba A.', 'Bilan labo', 18000, 10000, 8000, 0, 'Chèque'],
            ['15/07/2025', 'Diallo F.', 'Radiographie', 22000, 0, 15000, 7000, 'Assurance'],
            ['15/07/2025', 'Traoré Y.', 'Consultation', 5000, 5000, 0, 0, 'Mobile money'],
            ['16/07/2025', 'Ouédraogo S.', 'Pédiatrie', 7500, 7500, 0, 0, 'Espèces'],
            ['16/07/2025', 'Konan R.', 'Suivi chronique', 5000, 0, 0, 5000, 'Impayé'],
            ['17/07/2025', 'N\'Guessan P.', 'Bilan complet', 35000, 20000, 15000, 0, 'Mixte'],
          ],
          totalsRow: true,
          colWidths: [14, 22, 24, 24, 20, 20, 16, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // ─── ÉDUCATION (color: 1A237E) ──────────────────────────────────────────
  {
    code: 'xl_edu_notes',
    name: 'Bulletin de notes élèves',
    category: 'academique',
    description: 'Saisir les notes par matière avec coefficients, calculer moyennes et rangs',
    price: 600, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Établissement scolaire', type: 'text', required: true },
      { name: 'classe', label: 'Classe', type: 'text', required: true },
      { name: 'trimestre', label: 'Trimestre / Semestre', type: 'text', required: true },
      { name: 'annee_scolaire', label: 'Année scolaire', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Bulletin Notes',
          title: 'Bulletin de Notes — Classe {{classe}} — {{trimestre}} {{annee_scolaire}}',
          colorHeader: '1A237E',
          headers: ['Matière', 'Coeff.', 'Note /20', 'Moy. ponderée', 'Appréciation', 'Enseignant'],
          rows: [
            ['Mathématiques', 4, 14.5, 58, 'Bien', 'M. Koné'],
            ['Français', 4, 12.0, 48, 'Assez bien', 'Mme Traoré'],
            ['Histoire-Géo', 2, 13.5, 27, 'Bien', 'M. Diallo'],
            ['Sciences de la Vie', 3, 15.0, 45, 'Bien', 'Mme Bamba'],
            ['Anglais', 2, 11.0, 22, 'Passable', 'M. Coulibaly'],
            ['Éducation physique', 1, 17.0, 17, 'Très bien', 'M. Ouédraogo'],
            ['Arts plastiques', 1, 16.0, 16, 'Très bien', 'Mme Ndiaye'],
          ],
          totalsRow: true,
          colWidths: [28, 10, 12, 18, 20, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 80,
  },

  {
    code: 'xl_edu_effectifs',
    name: 'Suivi effectifs classes',
    category: 'academique',
    description: 'Suivre les inscrits, présents et taux de présence par classe',
    price: 400, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Établissement', type: 'text', required: true },
      { name: 'annee_scolaire', label: 'Année scolaire', type: 'text', required: true },
      { name: 'date_releve', label: 'Date du relevé', type: 'date', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Effectifs',
          title: 'Suivi Effectifs — {{nom_etablissement}} — {{annee_scolaire}}',
          colorHeader: '1A237E',
          headers: ['Classe', 'Niveau', 'Inscrits total', 'Garçons', 'Filles', 'Présents aujourd\'hui', 'Absents', 'Taux présence (%)'],
          rows: [
            ['6ème A', 'Collège', 45, 23, 22, 42, 3, 93.3],
            ['6ème B', 'Collège', 43, 21, 22, 40, 3, 93.0],
            ['5ème A', 'Collège', 47, 25, 22, 44, 3, 93.6],
            ['5ème B', 'Collège', 44, 22, 22, 43, 1, 97.7],
            ['4ème A', 'Collège', 42, 20, 22, 38, 4, 90.5],
            ['3ème A', 'Collège', 40, 19, 21, 36, 4, 90.0],
            ['3ème B', 'Collège', 38, 18, 20, 35, 3, 92.1],
          ],
          totalsRow: true,
          colWidths: [12, 12, 16, 12, 12, 22, 12, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  {
    code: 'xl_edu_frais_scol',
    name: 'Gestion frais de scolarité',
    category: 'academique',
    description: 'Suivre les frais scolaires : montant dû, payé et reste à recouvrer',
    price: 700, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Établissement', type: 'text', required: true },
      { name: 'annee_scolaire', label: 'Année scolaire', type: 'text', required: true },
      { name: 'classe', label: 'Classe / Niveau', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Frais Scolarité',
          title: 'Suivi Frais de Scolarité — {{nom_etablissement}} — {{annee_scolaire}}',
          colorHeader: '1A237E',
          headers: ['N° matricule', 'Nom & Prénoms', 'Classe', 'Montant dû (FCFA)', 'Versement 1', 'Versement 2', 'Versement 3', 'Total payé (FCFA)', 'Reste dû (FCFA)', 'Statut'],
          rows: [
            ['2025001', 'Konan Aimée', '6ème A', 85000, 40000, 30000, 15000, 85000, 0, 'Soldé'],
            ['2025002', 'Traoré Moussa', '6ème A', 85000, 40000, 25000, 0, 65000, 20000, 'Partiel'],
            ['2025003', 'Bamba Fatoumata', '5ème B', 85000, 40000, 40000, 0, 80000, 5000, 'Partiel'],
            ['2025004', 'Diallo Seydou', '3ème A', 95000, 0, 0, 0, 0, 95000, 'Impayé'],
            ['2025005', 'Coulibaly Rokia', '4ème A', 90000, 45000, 45000, 0, 90000, 0, 'Soldé'],
            ['2025006', 'Ouédraogo Paul', '5ème A', 85000, 50000, 20000, 0, 70000, 15000, 'Partiel'],
          ],
          totalsRow: true,
          colWidths: [14, 26, 12, 20, 14, 14, 14, 20, 16, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  {
    code: 'xl_edu_budget_ecole',
    name: 'Budget établissement scolaire',
    category: 'academique',
    description: 'Gérer le budget de l\'école : dépenses par poste, recettes et équilibre',
    price: 900, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Établissement', type: 'text', required: true },
      { name: 'annee_scolaire', label: 'Année scolaire', type: 'text', required: true },
      { name: 'directeur', label: 'Directeur / Proviseur', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Budget École',
          title: 'Budget Établissement — {{nom_etablissement}} — {{annee_scolaire}}',
          colorHeader: '1A237E',
          headers: ['Poste budgétaire', 'Catégorie', 'Budget prévu (FCFA)', 'Réalisé T1 (FCFA)', 'Réalisé T2 (FCFA)', 'Réalisé T3 (FCFA)', 'Total réalisé (FCFA)', 'Écart (FCFA)'],
          rows: [
            ['Salaires enseignants', 'Dépenses', 48000000, 12000000, 12000000, 12000000, 36000000, 12000000],
            ['Salaires personnel admin', 'Dépenses', 12000000, 3000000, 3000000, 3000000, 9000000, 3000000],
            ['Fournitures scolaires', 'Dépenses', 3500000, 1800000, 900000, 500000, 3200000, 300000],
            ['Entretien bâtiments', 'Dépenses', 2000000, 500000, 400000, 600000, 1500000, 500000],
            ['Frais de scolarité reçus', 'Recettes', 55000000, 20000000, 18000000, 15000000, 53000000, -2000000],
            ['Subventions État', 'Recettes', 8000000, 4000000, 0, 4000000, 8000000, 0],
            ['Autres recettes', 'Recettes', 2000000, 800000, 600000, 400000, 1800000, 200000],
          ],
          totalsRow: true,
          colWidths: [30, 14, 22, 20, 20, 20, 22, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'xl_edu_planning_cours',
    name: 'Planning emploi du temps hebdomadaire',
    category: 'academique',
    description: 'Organiser l\'emploi du temps : créneaux, matières et salles',
    price: 500, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Établissement', type: 'text', required: true },
      { name: 'classe', label: 'Classe', type: 'text', required: true },
      { name: 'semaine', label: 'Semaine du (date)', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Emploi du temps',
          title: 'Emploi du temps — Classe {{classe}} — Semaine du {{semaine}}',
          colorHeader: '1A237E',
          headers: ['Horaire', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
          rows: [
            ['07h30 – 08h30', 'Maths (Salle 3)', 'Français (Salle 1)', 'Anglais (Salle 4)', 'Hist-Géo (Salle 2)', 'Maths (Salle 3)', 'SVT (Labo)'],
            ['08h30 – 09h30', 'Maths (Salle 3)', 'Français (Salle 1)', 'Maths (Salle 3)', 'Physique (Labo)', 'Français (Salle 1)', 'SVT (Labo)'],
            ['09h30 – 10h30', 'SVT (Labo)', 'Anglais (Salle 4)', 'Hist-Géo (Salle 2)', 'Maths (Salle 3)', 'Hist-Géo (Salle 2)', 'Récréation'],
            ['10h30 – 11h30', 'Hist-Géo (Salle 2)', 'Physique (Labo)', 'SVT (Labo)', 'Français (Salle 1)', 'Physique (Labo)', '—'],
            ['11h30 – 12h30', 'Pause déjeuner', 'Pause déjeuner', 'Pause déjeuner', 'Pause déjeuner', 'Pause déjeuner', '—'],
            ['14h00 – 15h00', 'Anglais (Salle 4)', 'EPS (Terrain)', '—', 'Anglais (Salle 4)', 'Arts (Salle 5)', '—'],
            ['15h00 – 16h00', 'EPS (Terrain)', 'EPS (Terrain)', '—', 'EPS (Terrain)', 'Arts (Salle 5)', '—'],
          ],
          totalsRow: false,
          colWidths: [18, 22, 22, 22, 22, 22, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // ─── TOURISME / HÔTELLERIE (color: 004D40) ──────────────────────────────
  {
    code: 'xl_tour_occupation',
    name: 'Taux d\'occupation hôtel',
    category: 'commercial_financier',
    description: 'Suivre les chambres disponibles, occupées et le chiffre d\'affaires par jour',
    price: 900, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: 'Nom de l\'hôtel', type: 'text', required: true },
      { name: 'mois', label: 'Mois / Année', type: 'text', required: true },
      { name: 'nb_chambres_total', label: 'Nombre total de chambres', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Occupation Hôtel',
          title: 'Taux d\'occupation — {{nom_hotel}} — {{mois}}',
          colorHeader: '004D40',
          headers: ['Date', 'Chambres disponibles', 'Chambres occupées', 'Chambres libres', 'Taux occupation (%)', 'CA jour (FCFA)', 'Prix moyen/nuit (FCFA)'],
          rows: [
            ['14/07/2025', 50, 42, 8, 84.0, 2100000, 50000],
            ['15/07/2025', 50, 47, 3, 94.0, 2350000, 50000],
            ['16/07/2025', 50, 38, 12, 76.0, 1900000, 50000],
            ['17/07/2025', 50, 50, 0, 100.0, 2700000, 54000],
            ['18/07/2025', 50, 45, 5, 90.0, 2250000, 50000],
            ['19/07/2025', 48, 48, 0, 100.0, 2640000, 55000],
            ['20/07/2025', 48, 30, 18, 62.5, 1500000, 50000],
          ],
          totalsRow: true,
          colWidths: [14, 22, 22, 16, 22, 20, 24],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 73,
  },

  {
    code: 'xl_tour_reservations',
    name: 'Suivi réservations hôtel',
    category: 'commercial_financier',
    description: 'Gérer les réservations clients : dates, chambres, montants et statuts',
    price: 800, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: 'Nom de l\'hôtel', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable réservations', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Réservations',
          title: 'Suivi Réservations — {{nom_hotel}} — {{periode}}',
          colorHeader: '004D40',
          headers: ['N° réserv.', 'Client', 'Chambre', 'Type chambre', 'Arrivée', 'Départ', 'Nuits', 'Montant (FCFA)', 'Statut', 'Canal'],
          rows: [
            ['RES2025001', 'Kouassi Armel', '101', 'Standard', '14/07', '16/07', 2, 100000, 'Confirmée', 'Direct'],
            ['RES2025002', 'Famille Traoré', '205', 'Suite', '15/07', '20/07', 5, 450000, 'Confirmée', 'Booking'],
            ['RES2025003', 'Bamba Cécile', '312', 'Supérieure', '16/07', '17/07', 1, 65000, 'Arrivée', 'Direct'],
            ['RES2025004', 'M. Diallo', '110', 'Standard', '17/07', '19/07', 2, 100000, 'En attente', 'WhatsApp'],
            ['RES2025005', 'Société ABC', '401', 'Suite affaires', '18/07', '22/07', 4, 480000, 'Confirmée', 'Email'],
            ['RES2025006', 'Ouédraogo Marie', '218', 'Supérieure', '19/07', '21/07', 2, 130000, 'Annulée', 'Booking'],
          ],
          totalsRow: true,
          colWidths: [16, 22, 10, 18, 12, 12, 8, 18, 14, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 78,
  },

  {
    code: 'xl_tour_caisse',
    name: 'Caisse journalière hôtel',
    category: 'commercial_financier',
    description: 'Enregistrer les recettes et dépenses quotidiennes et calculer le solde',
    price: 600, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: 'Nom de l\'hôtel', type: 'text', required: true },
      { name: 'date_caisse', label: 'Date de caisse', type: 'date', required: true },
      { name: 'caissier', label: 'Caissier responsable', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Caisse Journalière',
          title: 'Caisse Journalière — {{nom_hotel}} — {{date_caisse}}',
          colorHeader: '004D40',
          headers: ['Heure', 'Libellé', 'Catégorie', 'Entrée (FCFA)', 'Sortie (FCFA)', 'Solde cumulé (FCFA)', 'Mode paiement'],
          rows: [
            ['07h00', 'Solde ouverture', 'Ouverture', 150000, 0, 150000, '—'],
            ['08h30', 'Règlement chambre 101', 'Hébergement', 100000, 0, 250000, 'Espèces'],
            ['09h00', 'Petit-déjeuner buffet (12 pers.)', 'Restaurant', 72000, 0, 322000, 'Espèces'],
            ['10h30', 'Achat produits ménagers', 'Approvisionnement', 0, 25000, 297000, 'Espèces'],
            ['12h00', 'Déjeuner restaurant', 'Restaurant', 96000, 0, 393000, 'Mobile money'],
            ['14h00', 'Paiement blanchisserie', 'Services', 18000, 0, 411000, 'Espèces'],
            ['16h00', 'Salaire journalier extra', 'Charges personnel', 0, 15000, 396000, 'Espèces'],
            ['18h00', 'Bar soirée', 'Bar/Boissons', 54000, 0, 450000, 'Carte'],
          ],
          totalsRow: true,
          colWidths: [10, 30, 20, 18, 18, 22, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 66,
  },

  {
    code: 'xl_tour_restaurant',
    name: 'Gestion restaurant hôtel',
    category: 'commercial_financier',
    description: 'Gérer la carte restaurant : coûts, prix de vente et marges',
    price: 700, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_hotel', label: 'Hôtel / Restaurant', type: 'text', required: true },
      { name: 'responsable_cuisine', label: 'Chef cuisinier / Responsable', type: 'text', required: false },
      { name: 'mois', label: 'Mois de référence', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Gestion Restaurant',
          title: 'Gestion Restaurant — {{nom_hotel}} — {{mois}}',
          colorHeader: '004D40',
          headers: ['Plat / Boisson', 'Catégorie', 'Coût matières (FCFA)', 'Prix vente (FCFA)', 'Marge brute (FCFA)', 'Taux marge (%)', 'Ventes mois', 'CA mensuel (FCFA)'],
          rows: [
            ['Riz au poisson', 'Plat principal', 2500, 6000, 3500, 58.3, 120, 720000],
            ['Poulet yassa', 'Plat principal', 3000, 7500, 4500, 60.0, 95, 712500],
            ['Attiéké poisson grillé', 'Plat principal', 2200, 5500, 3300, 60.0, 140, 770000],
            ['Salade mixte', 'Entrée', 800, 2500, 1700, 68.0, 80, 200000],
            ['Jus de bissap', 'Boisson', 200, 1000, 800, 80.0, 200, 200000],
            ['Eau minérale 1L', 'Boisson', 300, 800, 500, 62.5, 350, 280000],
            ['Café espresso', 'Boisson chaude', 150, 700, 550, 78.6, 180, 126000],
            ['Gâteau local', 'Dessert', 500, 1500, 1000, 66.7, 60, 90000],
          ],
          totalsRow: true,
          colWidths: [26, 18, 22, 20, 22, 18, 14, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 71,
  },

  {
    code: 'xl_tour_budget_voyage',
    name: 'Budget voyage client',
    category: 'commercial_financier',
    description: 'Planifier le budget d\'un voyage : hébergement, transport, activités et total',
    price: 500, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_client', label: 'Nom du voyageur / groupe', type: 'text', required: true },
      { name: 'destination', label: 'Destination', type: 'text', required: true },
      { name: 'dates_voyage', label: 'Dates du voyage', type: 'text', required: true },
      { name: 'nb_personnes', label: 'Nombre de personnes', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Budget Voyage',
          title: 'Budget Voyage — {{destination}} — {{nom_client}}',
          colorHeader: '004D40',
          headers: ['Poste de dépense', 'Catégorie', 'Budget prévu (FCFA)', 'Coût réel (FCFA)', 'Écart (FCFA)', 'Prestataire / Remarque'],
          rows: [
            ['Billet d\'avion aller-retour', 'Transport', 350000, 360000, -10000, 'Air Côte d\'Ivoire'],
            ['Taxi aéroport × 2', 'Transport', 20000, 18000, 2000, 'VTC local'],
            ['Hôtel 5 nuits × 2 pers.', 'Hébergement', 250000, 250000, 0, 'Hôtel Eden'],
            ['Repas journaliers × 5 jours', 'Restauration', 75000, 82000, -7000, 'Restaurants locaux'],
            ['Visite musée + guide', 'Activités', 30000, 30000, 0, 'Office tourisme'],
            ['Excursion safari', 'Activités', 80000, 80000, 0, 'Safari Tours'],
            ['Souvenirs / shopping', 'Divers', 50000, 65000, -15000, '—'],
            ['Assurance voyage', 'Assurance', 15000, 15000, 0, 'Allianz'],
          ],
          totalsRow: true,
          colWidths: [30, 18, 22, 20, 14, 28],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 64,
  },

  // ─── IMMOBILIER (color: 37474F) ─────────────────────────────────────────
  {
    code: 'xl_immo_locatif',
    name: 'Rentabilité investissement locatif',
    category: 'immobilier',
    description: 'Analyser la rentabilité d\'un bien : prix achat, loyers, charges et rendement',
    price: 1200, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_investisseur', label: 'Investisseur', type: 'text', required: true },
      { name: 'adresse_bien', label: 'Adresse du bien', type: 'text', required: true },
      { name: 'date_analyse', label: 'Date de l\'analyse', type: 'date', required: true },
      { name: 'type_bien', label: 'Type de bien', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Rentabilité Locative',
          title: 'Analyse Rentabilité Locative — {{adresse_bien}}',
          colorHeader: '37474F',
          headers: ['Paramètre', 'Valeur (FCFA)', 'Observation'],
          rows: [
            ['Prix d\'acquisition', 45000000, 'Net vendeur'],
            ['Frais de notaire / enregistrement', 2700000, '6% du prix'],
            ['Travaux de rénovation', 3000000, 'Mise en état'],
            ['Coût total investissement', 50700000, '= Achat + frais + travaux'],
            ['Loyer mensuel brut', 300000, 'Valeur locative marché'],
            ['Loyer annuel brut', 3600000, '= Loyer × 12'],
            ['Charges annuelles (taxe, entretien)', 600000, 'Estimé 15% loyers'],
            ['Loyer annuel net', 3000000, '= Brut - charges'],
            ['Rendement brut (%)', 7.1, '= Loyer brut / coût total × 100'],
            ['Rendement net (%)', 5.9, '= Loyer net / coût total × 100'],
          ],
          totalsRow: false,
          colWidths: [38, 22, 32],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 85,
  },

  {
    code: 'xl_immo_loyers',
    name: 'Suivi paiement loyers',
    category: 'immobilier',
    description: 'Suivre les locataires, encaissements, retards et cautions',
    price: 800, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_bailleur', label: 'Nom du bailleur / gestionnaire', type: 'text', required: true },
      { name: 'immeuble', label: 'Immeuble / Adresse', type: 'text', required: true },
      { name: 'mois_suivi', label: 'Mois de suivi', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi Loyers',
          title: 'Suivi Loyers — {{immeuble}} — {{mois_suivi}}',
          colorHeader: '37474F',
          headers: ['Locataire', 'Appartement', 'Loyer mensuel (FCFA)', 'Caution versée (FCFA)', 'Loyer dû (FCFA)', 'Loyer payé (FCFA)', 'Retard (jours)', 'Solde restant (FCFA)', 'Statut'],
          rows: [
            ['Konan Armel', 'App. A1', 120000, 240000, 120000, 120000, 0, 0, 'Soldé'],
            ['Traoré Mamie', 'App. A2', 100000, 200000, 100000, 50000, 15, 50000, 'Partiel'],
            ['Bamba Karim', 'App. B1', 150000, 300000, 150000, 0, 22, 150000, 'Impayé'],
            ['Diallo Assia', 'App. B2', 120000, 240000, 120000, 120000, 0, 0, 'Soldé'],
            ['Coulibaly Issa', 'App. C1', 200000, 400000, 200000, 200000, 0, 0, 'Soldé'],
            ['Ouédraogo Rita', 'App. C2', 130000, 260000, 130000, 80000, 8, 50000, 'Partiel'],
          ],
          totalsRow: true,
          colWidths: [22, 14, 22, 22, 18, 18, 16, 22, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 88,
  },

  {
    code: 'xl_immo_charges_copro',
    name: 'Charges de copropriété',
    category: 'immobilier',
    description: 'Suivre les postes de charges, budget voté, réalisé et appels de fonds',
    price: 900, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_copropriete', label: 'Nom de la copropriété', type: 'text', required: true },
      { name: 'syndic', label: 'Syndic / Gestionnaire', type: 'text', required: true },
      { name: 'annee', label: 'Exercice / Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Charges Copropriété',
          title: 'Charges Copropriété — {{nom_copropriete}} — {{annee}}',
          colorHeader: '37474F',
          headers: ['Poste de charge', 'Budget voté (FCFA)', 'T1 réalisé (FCFA)', 'T2 réalisé (FCFA)', 'T3 réalisé (FCFA)', 'Total réalisé (FCFA)', 'Écart (FCFA)', 'Appel fonds T4 (FCFA)'],
          rows: [
            ['Gardiennage / Sécurité', 3600000, 900000, 900000, 900000, 2700000, 900000, 900000],
            ['Nettoyage parties communes', 1800000, 450000, 450000, 450000, 1350000, 450000, 450000],
            ['Entretien ascenseur', 600000, 150000, 150000, 150000, 450000, 150000, 150000],
            ['Eau parties communes', 480000, 120000, 130000, 110000, 360000, 120000, 120000],
            ['Électricité parties communes', 360000, 90000, 95000, 85000, 270000, 90000, 90000],
            ['Assurance immeuble', 1200000, 0, 1200000, 0, 1200000, 0, 0],
            ['Travaux et réparations', 2000000, 800000, 400000, 500000, 1700000, 300000, 300000],
          ],
          totalsRow: true,
          colWidths: [28, 20, 18, 18, 18, 20, 16, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 67,
  },

  {
    code: 'xl_immo_travaux',
    name: 'Suivi travaux immobilier',
    category: 'immobilier',
    description: 'Suivre les chantiers : lots, entreprises, devis, factures et soldes',
    price: 1000, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet / chantier', type: 'text', required: true },
      { name: 'maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début des travaux', type: 'date', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi Travaux',
          title: 'Suivi Travaux — {{nom_projet}}',
          colorHeader: '37474F',
          headers: ['Lot de travaux', 'Entreprise', 'Devis (FCFA)', 'Acompte versé (FCFA)', 'Factures reçues (FCFA)', 'Solde à payer (FCFA)', 'Avancement (%)', 'Statut'],
          rows: [
            ['Fondations & gros œuvre', 'Entreprise Konan BTP', 12000000, 4000000, 8000000, 0, 100, 'Terminé'],
            ['Maçonnerie & élévation', 'Traoré Construction', 8500000, 3000000, 5000000, 500000, 95, 'En cours'],
            ['Toiture & charpente', 'Bamba Toit', 3500000, 1500000, 2000000, 0, 100, 'Terminé'],
            ['Plomberie & sanitaires', 'Diallo Plomberie', 2800000, 1000000, 1500000, 300000, 80, 'En cours'],
            ['Électricité', 'Coulibaly Élec', 2200000, 800000, 0, 1400000, 40, 'En cours'],
            ['Carrelage & finitions', 'Ouédraogo Finitions', 4500000, 0, 0, 4500000, 0, 'Non démarré'],
            ['Peinture & enduits', 'Ndiaye Peinture', 1800000, 0, 0, 1800000, 0, 'Non démarré'],
          ],
          totalsRow: true,
          colWidths: [28, 26, 18, 22, 22, 18, 16, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 76,
  },

  {
    code: 'xl_immo_patrimoine',
    name: 'Tableau patrimoine immobilier',
    category: 'immobilier',
    description: 'Inventorier son parc immobilier : valeurs, crédits en cours et fonds propres',
    price: 1200, currency: 'XOF',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    fieldsJson: JSON.stringify([
      { name: 'nom_proprietaire', label: 'Nom du propriétaire', type: 'text', required: true },
      { name: 'date_inventaire', label: 'Date de l\'inventaire', type: 'date', required: true },
      { name: 'commentaire', label: 'Commentaire général', type: 'textarea', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Patrimoine Immobilier',
          title: 'Tableau Patrimoine Immobilier — {{nom_proprietaire}} — {{date_inventaire}}',
          colorHeader: '37474F',
          headers: ['Bien immobilier', 'Localisation', 'Valeur vénale (FCFA)', 'Crédit restant dû (FCFA)', 'Fonds propres (FCFA)', 'Revenu locatif/an (FCFA)', 'Rendement (%)', 'Statut'],
          rows: [
            ['Appartement T3 — Cocody', 'Abidjan, CI', 45000000, 20000000, 25000000, 3600000, 8.0, 'Loué'],
            ['Villa 4 pièces — Marcory', 'Abidjan, CI', 85000000, 0, 85000000, 0, 0, 'Résidence princ.'],
            ['Studio — Plateau', 'Abidjan, CI', 30000000, 15000000, 15000000, 2400000, 8.0, 'Loué'],
            ['Terrain nu — Bingerville', 'Abidjan, CI', 20000000, 0, 20000000, 0, 0, 'Vacant'],
            ['Local commercial — Yopougon', 'Abidjan, CI', 55000000, 30000000, 25000000, 6000000, 10.9, 'Loué'],
          ],
          totalsRow: true,
          colWidths: [30, 20, 24, 24, 22, 24, 16, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 82,
  },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    if (existing) {
      await prisma.documentTemplate.update({ where: { code: t.code }, data: t });
      updated++;
    } else {
      await prisma.documentTemplate.create({ data: t });
      created++;
    }
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Excel Secteurs: ${created} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
