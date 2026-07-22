import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  // ── IMMOBILIER AVANCÉ ──────────────────────────────────────────────────────

  // 1. xl_imv_promotion — Bilan promotion immobilière
  {
    code: 'xl_imv_promotion',
    name: 'Bilan promotion immobilière',
    category: 'immobilier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Bilan complet d\'une opération de promotion : coûts foncier, construction, commercialisation et marge',
    price: 1500, priceMax: 2000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_programme', label: 'Nom du programme', type: 'text', required: true },
      { name: 'promoteur', label: 'Promoteur', type: 'text', required: true },
      { name: 'date_lancement', label: 'Date de lancement', type: 'date', required: false },
      { name: 'nb_lots', label: 'Nombre de lots', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Bilan Promotion',
          title: 'Bilan de Promotion Immobilière',
          colorHeader: '37474F',
          headers: ['Poste', 'Montant (FCFA)', '% du coût total', 'Commentaire'],
          rows: [
            ['FONCIER', '', '', ''],
            ['Prix d\'acquisition terrain', 0, '=IFERROR(B{r}/B14*100,0)', ''],
            ['Frais notariés & taxes foncières', 0, '=IFERROR(B{r}/B14*100,0)', ''],
            ['CONSTRUCTION', '', '', ''],
            ['Gros œuvre & fondations', 0, '=IFERROR(B{r}/B14*100,0)', ''],
            ['Second œuvre & finitions', 0, '=IFERROR(B{r}/B14*100,0)', ''],
            ['VRD & aménagements extérieurs', 0, '=IFERROR(B{r}/B14*100,0)', ''],
            ['Honoraires maîtrise d\'œuvre', 0, '=IFERROR(B{r}/B14*100,0)', ''],
            ['COMMERCIALISATION', '', '', ''],
            ['Frais commerciaux & agence', 0, '=IFERROR(B{r}/B14*100,0)', ''],
            ['Marketing & publicité', 0, '=IFERROR(B{r}/B14*100,0)', ''],
            ['Frais financiers & intérêts', 0, '=IFERROR(B{r}/B14*100,0)', ''],
            ['Divers & imprévus (5%)', '=SUM(B2:B12)*0.05', '=IFERROR(B{r}/B14*100,0)', '5% des coûts'],
            ['TOTAL COÛTS', '=SUM(B2:B13)', '100%', ''],
            ['CHIFFRE D\'AFFAIRES VENTES', 0, '', 'Prix de vente total TTC'],
            ['MARGE BRUTE', '=B15-B14', '=IFERROR(B{r}/B15*100,0)', 'CA - Total coûts'],
            ['TAUX DE MARGE (%)', '=IFERROR(B16/B15*100,0)', '', '% sur CA'],
          ],
          totalsRow: false,
          colWidths: [36, 22, 18, 30],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  // 2. xl_imv_prix_revient — Prix de revient construction
  {
    code: 'xl_imv_prix_revient',
    name: 'Prix de revient construction',
    category: 'immobilier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Décomposition détaillée du prix de revient par poste : terrain, VRD, gros œuvre, second œuvre',
    price: 1200, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'surface_shon', label: 'Surface SHON (m²)', type: 'text', required: true },
      { name: 'nb_niveaux', label: 'Nombre de niveaux', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Prix de Revient',
          title: 'Prix de Revient Construction',
          colorHeader: '37474F',
          headers: ['Poste de coût', 'Montant (FCFA)', 'Surface (m²)', 'Coût/m²', '% total'],
          rows: [
            ['Terrain & acquisition', 0, 0, '=IFERROR(B{r}/C{r},0)', '=IFERROR(B{r}/B12*100,0)'],
            ['VRD (voirie, réseaux, divers)', 0, 0, '=IFERROR(B{r}/C{r},0)', '=IFERROR(B{r}/B12*100,0)'],
            ['Gros œuvre (fondations, structure)', 0, 0, '=IFERROR(B{r}/C{r},0)', '=IFERROR(B{r}/B12*100,0)'],
            ['Charpente & couverture', 0, 0, '=IFERROR(B{r}/C{r},0)', '=IFERROR(B{r}/B12*100,0)'],
            ['Menuiseries (portes, fenêtres)', 0, 0, '=IFERROR(B{r}/C{r},0)', '=IFERROR(B{r}/B12*100,0)'],
            ['Plomberie & sanitaires', 0, 0, '=IFERROR(B{r}/C{r},0)', '=IFERROR(B{r}/B12*100,0)'],
            ['Électricité & domotique', 0, 0, '=IFERROR(B{r}/C{r},0)', '=IFERROR(B{r}/B12*100,0)'],
            ['Peinture & revêtements', 0, 0, '=IFERROR(B{r}/C{r},0)', '=IFERROR(B{r}/B12*100,0)'],
            ['Honoraires & frais divers', 0, 0, '=IFERROR(B{r}/C{r},0)', '=IFERROR(B{r}/B12*100,0)'],
            ['Taxes & assurances', 0, 0, '=IFERROR(B{r}/C{r},0)', '=IFERROR(B{r}/B12*100,0)'],
            ['Imprévus (5%)', '=SUM(B2:B11)*0.05', 0, '=IFERROR(B{r}/C{r},0)', '=IFERROR(B{r}/B12*100,0)'],
            ['TOTAL PRIX DE REVIENT', '=SUM(B2:B12)', '', '=IFERROR(B{r}/C2,0)', '100%'],
          ],
          totalsRow: true,
          colWidths: [32, 20, 16, 16, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 3. xl_imv_commercialisation — Suivi commercialisation programme
  {
    code: 'xl_imv_commercialisation',
    name: 'Suivi commercialisation programme',
    category: 'immobilier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de suivi des lots : surface, prix, statut, acquéreur et date de vente',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_programme', label: 'Nom du programme', type: 'text', required: true },
      { name: 'promoteur', label: 'Promoteur', type: 'text', required: true },
      { name: 'ville', label: 'Ville / Quartier', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Commercialisation',
          title: 'Suivi Commercialisation Programme',
          colorHeader: '37474F',
          headers: ['N° Lot', 'Type', 'Surface (m²)', 'Prix unitaire (FCFA)', 'Prix total (FCFA)', 'Statut', 'Acquéreur', 'Date vente', 'Observations'],
          rows: [
            ['LOT-001', 'Villa', 0, 0, '=C{r}*D{r}', 'Disponible', '', '', ''],
            ['LOT-002', 'Villa', 0, 0, '=C{r}*D{r}', 'Réservé', '', '', ''],
            ['LOT-003', 'Appartement', 0, 0, '=C{r}*D{r}', 'Vendu', '', '', ''],
            ['LOT-004', 'Appartement', 0, 0, '=C{r}*D{r}', 'Disponible', '', '', ''],
            ['LOT-005', 'Studio', 0, 0, '=C{r}*D{r}', 'Vendu', '', '', ''],
            ['LOT-006', 'Commerce', 0, 0, '=C{r}*D{r}', 'Disponible', '', '', ''],
            ['LOT-007', 'Bureau', 0, 0, '=C{r}*D{r}', 'Réservé', '', '', ''],
            ['LOT-008', 'Villa', 0, 0, '=C{r}*D{r}', 'Disponible', '', '', ''],
            ['TOTAUX', '', '=SUM(C2:C9)', '', '=SUM(E2:E9)', '', '', '', ''],
          ],
          totalsRow: false,
          colWidths: [12, 14, 14, 20, 22, 14, 22, 14, 20],
        },
        {
          name: 'Tableau de Bord',
          title: 'Tableau de bord commercialisation',
          colorHeader: '546E7A',
          headers: ['Indicateur', 'Valeur', 'Unité'],
          rows: [
            ['Total lots programme', 0, 'lots'],
            ['Lots vendus', 0, 'lots'],
            ['Lots réservés', 0, 'lots'],
            ['Lots disponibles', '=B2-B3-B4', 'lots'],
            ['Taux de vente (%)', '=IFERROR(B3/B2*100,0)', '%'],
            ['CA total programme (FCFA)', 0, 'FCFA'],
            ['CA encaissé (FCFA)', 0, 'FCFA'],
            ['Taux encaissement (%)', '=IFERROR(B8/B7*100,0)', '%'],
          ],
          totalsRow: false,
          colWidths: [30, 20, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  // 4. xl_imv_planning_ventes — Planning ventes et encaissements
  {
    code: 'xl_imv_planning_ventes',
    name: 'Planning ventes et encaissements',
    category: 'immobilier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des appels de fonds par lot : dépôt de garantie, appels, livraison et solde',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_programme', label: 'Nom du programme', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Planning Encaissements',
          title: 'Planning Ventes et Encaissements',
          colorHeader: '37474F',
          headers: ['N° Lot', 'Acquéreur', 'Prix total (FCFA)', 'Dépôt garanti', 'Appel 1 (30%)', 'Appel 2 (30%)', 'Appel 3 (20%)', 'Livraison (10%)', 'Solde (10%)', 'Total encaissé', 'Reste dû'],
          rows: [
            ['LOT-001', '', 0, '=C{r}*0.1', '=C{r}*0.3', '=C{r}*0.3', '=C{r}*0.2', '=C{r}*0.1', '=C{r}*0.1', 0, '=C{r}-J{r}'],
            ['LOT-002', '', 0, '=C{r}*0.1', '=C{r}*0.3', '=C{r}*0.3', '=C{r}*0.2', '=C{r}*0.1', '=C{r}*0.1', 0, '=C{r}-J{r}'],
            ['LOT-003', '', 0, '=C{r}*0.1', '=C{r}*0.3', '=C{r}*0.3', '=C{r}*0.2', '=C{r}*0.1', '=C{r}*0.1', 0, '=C{r}-J{r}'],
            ['LOT-004', '', 0, '=C{r}*0.1', '=C{r}*0.3', '=C{r}*0.3', '=C{r}*0.2', '=C{r}*0.1', '=C{r}*0.1', 0, '=C{r}-J{r}'],
            ['LOT-005', '', 0, '=C{r}*0.1', '=C{r}*0.3', '=C{r}*0.3', '=C{r}*0.2', '=C{r}*0.1', '=C{r}*0.1', 0, '=C{r}-J{r}'],
            ['LOT-006', '', 0, '=C{r}*0.1', '=C{r}*0.3', '=C{r}*0.3', '=C{r}*0.2', '=C{r}*0.1', '=C{r}*0.1', 0, '=C{r}-J{r}'],
            ['TOTAUX', '', '=SUM(C2:C7)', '=SUM(D2:D7)', '=SUM(E2:E7)', '=SUM(F2:F7)', '=SUM(G2:G7)', '=SUM(H2:H7)', '=SUM(I2:I7)', '=SUM(J2:J7)', '=SUM(K2:K7)'],
          ],
          totalsRow: false,
          colWidths: [12, 20, 18, 16, 16, 16, 16, 16, 14, 16, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 5. xl_imv_gestion_locative_park — Gestion parc locatif
  {
    code: 'xl_imv_gestion_locative_park',
    name: 'Gestion parc locatif',
    category: 'immobilier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi complet du parc locatif : biens, locataires, loyers, charges et taux d\'occupation',
    price: 1200, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'proprietaire', label: 'Propriétaire / Gestionnaire', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'nb_biens', label: 'Nombre de biens total', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Parc Locatif',
          title: 'Gestion Parc Locatif',
          colorHeader: '37474F',
          headers: ['Référence bien', 'Type', 'Surface (m²)', 'Locataire', 'Loyer HC (FCFA)', 'Charges (FCFA)', 'Loyer CC (FCFA)', 'Statut', 'Net perçu (FCFA)', 'Observations'],
          rows: [
            ['BIEN-001', 'Appartement', 0, '', 0, 0, '=E{r}+F{r}', 'Loué', 0, ''],
            ['BIEN-002', 'Villa', 0, '', 0, 0, '=E{r}+F{r}', 'Loué', 0, ''],
            ['BIEN-003', 'Studio', 0, '', 0, 0, '=E{r}+F{r}', 'Vacant', 0, ''],
            ['BIEN-004', 'Bureau', 0, '', 0, 0, '=E{r}+F{r}', 'Loué', 0, ''],
            ['BIEN-005', 'Commerce', 0, '', 0, 0, '=E{r}+F{r}', 'Loué', 0, ''],
            ['BIEN-006', 'Appartement', 0, '', 0, 0, '=E{r}+F{r}', 'Vacant', 0, ''],
            ['BIEN-007', 'Villa', 0, '', 0, 0, '=E{r}+F{r}', 'Loué', 0, ''],
            ['BIEN-008', 'Studio', 0, '', 0, 0, '=E{r}+F{r}', 'Loué', 0, ''],
            ['TOTAUX', '', '=SUM(C2:C9)', '', '=SUM(E2:E9)', '=SUM(F2:F9)', '=SUM(G2:G9)', '', '=SUM(I2:I9)', ''],
          ],
          totalsRow: false,
          colWidths: [14, 14, 14, 22, 18, 16, 18, 12, 16, 20],
        },
        {
          name: 'Indicateurs',
          title: 'Indicateurs du Parc Locatif',
          colorHeader: '546E7A',
          headers: ['Indicateur', 'Valeur', 'Commentaire'],
          rows: [
            ['Nombre de biens total', 0, ''],
            ['Biens loués', 0, ''],
            ['Biens vacants', '=B2-B3', ''],
            ['Taux d\'occupation (%)', '=IFERROR(B3/B2*100,0)', ''],
            ['Loyer brut mensuel total (FCFA)', 0, ''],
            ['Charges mensuelles totales (FCFA)', 0, ''],
            ['Loyer net mensuel (FCFA)', '=B6-B7', ''],
            ['Rendement brut annuel (%)', 0, 'Loyer annuel / Valeur patrimoine'],
          ],
          totalsRow: false,
          colWidths: [32, 20, 30],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 78,
  },

  // 6. xl_imv_budget_exploitation — Budget exploitation immeuble
  {
    code: 'xl_imv_budget_exploitation',
    name: 'Budget exploitation immeuble',
    category: 'immobilier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Budget annuel des charges d\'exploitation d\'un immeuble : gardiennage, eau, énergie, entretien',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_immeuble', label: 'Nom de l\'immeuble', type: 'text', required: true },
      { name: 'annee', label: 'Année budgétaire', type: 'text', required: true },
      { name: 'gestionnaire', label: 'Gestionnaire', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Budget Exploitation',
          title: 'Budget Exploitation Immeuble',
          colorHeader: '37474F',
          headers: ['Nature de charge', 'Budgété (FCFA)', 'Réalisé (FCFA)', 'Écart', 'Écart %', 'Fréquence'],
          rows: [
            ['Gardiennage & sécurité', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', 'Mensuel'],
            ['Eau (consommation commune)', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', 'Mensuel'],
            ['Électricité parties communes', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', 'Mensuel'],
            ['Entretien ascenseur', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', 'Trimestriel'],
            ['Nettoyage & hygiène', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', 'Mensuel'],
            ['Espaces verts', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', 'Mensuel'],
            ['Maintenance & réparations', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', 'Ponctuel'],
            ['Assurance immeuble', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', 'Annuel'],
            ['Honoraires gestion', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', 'Mensuel'],
            ['Divers & imprévus', 0, 0, '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
            ['TOTAL CHARGES', '=SUM(B2:B11)', '=SUM(C2:C11)', '=B{r}-C{r}', '=IFERROR((B{r}-C{r})/B{r}*100,0)', ''],
          ],
          totalsRow: false,
          colWidths: [30, 18, 18, 16, 12, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 7. xl_imv_evaluation_patrimoine — Évaluation patrimoine immobilier
  {
    code: 'xl_imv_evaluation_patrimoine',
    name: 'Évaluation patrimoine immobilier',
    category: 'immobilier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau d\'évaluation du patrimoine : surface, valeur vénale, valeur locative et rendement (yield)',
    price: 1000, priceMax: 1600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'proprietaire', label: 'Propriétaire', type: 'text', required: true },
      { name: 'date_evaluation', label: 'Date d\'évaluation', type: 'date', required: true },
      { name: 'evaluateur', label: 'Évaluateur / Expert', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Patrimoine',
          title: 'Évaluation Patrimoine Immobilier',
          colorHeader: '37474F',
          headers: ['Bien', 'Type', 'Surface (m²)', 'Localisation', 'Valeur vénale (FCFA)', 'Valeur locative mois (FCFA)', 'Loyer annuel (FCFA)', 'Yield brut (%)', 'Statut'],
          rows: [
            ['BIEN-001', 'Résidentiel', 0, '', 0, 0, '=F{r}*12', '=IFERROR(G{r}/E{r}*100,0)', 'Loué'],
            ['BIEN-002', 'Commercial', 0, '', 0, 0, '=F{r}*12', '=IFERROR(G{r}/E{r}*100,0)', 'Loué'],
            ['BIEN-003', 'Bureaux', 0, '', 0, 0, '=F{r}*12', '=IFERROR(G{r}/E{r}*100,0)', 'Vacant'],
            ['BIEN-004', 'Résidentiel', 0, '', 0, 0, '=F{r}*12', '=IFERROR(G{r}/E{r}*100,0)', 'Loué'],
            ['BIEN-005', 'Terrain', 0, '', 0, 0, '=F{r}*12', '=IFERROR(G{r}/E{r}*100,0)', 'Non exploité'],
            ['BIEN-006', 'Mixte', 0, '', 0, 0, '=F{r}*12', '=IFERROR(G{r}/E{r}*100,0)', 'Loué'],
            ['TOTAUX', '', '=SUM(C2:C7)', '', '=SUM(E2:E7)', '=SUM(F2:F7)', '=SUM(G2:G7)', '=IFERROR(G8/E8*100,0)', ''],
          ],
          totalsRow: false,
          colWidths: [14, 14, 14, 20, 22, 22, 20, 14, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 67,
  },

  // 8. xl_imv_financement_projet — Plan financement projet immobilier
  {
    code: 'xl_imv_financement_projet',
    name: 'Plan financement projet immobilier',
    category: 'immobilier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Structure de financement d\'un projet immobilier : fonds propres, crédit, subvention et tableau de flux',
    price: 1200, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'cout_total', label: 'Coût total estimé (FCFA)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Plan Financement',
          title: 'Plan de Financement Projet Immobilier',
          colorHeader: '37474F',
          headers: ['Source de financement', 'Montant (FCFA)', '% du total', 'Taux (%)', 'Durée (ans)', 'Mensualité (FCFA)'],
          rows: [
            ['Fonds propres', 0, '=IFERROR(B{r}/B6*100,0)', 0, 0, 0],
            ['Crédit bancaire', 0, '=IFERROR(B{r}/B6*100,0)', 0, 0, '=IFERROR(B{r}*(C{r}/100/12)/(1-(1+C{r}/100/12)^(-E{r}*12)),0)'],
            ['Subvention / Aide état', 0, '=IFERROR(B{r}/B6*100,0)', 0, 0, 0],
            ['Ventes en l\'état futur (VEFA)', 0, '=IFERROR(B{r}/B6*100,0)', 0, 0, 0],
            ['Autres ressources', 0, '=IFERROR(B{r}/B6*100,0)', 0, 0, 0],
            ['TOTAL FINANCEMENT', '=SUM(B2:B6)', '100%', '', '', '=SUM(F2:F6)'],
          ],
          totalsRow: false,
          colWidths: [30, 22, 14, 12, 14, 20],
        },
        {
          name: 'Flux Prévisionnels',
          title: 'Tableau des Flux Prévisionnels',
          colorHeader: '455A64',
          headers: ['Période', 'Investissements (FCFA)', 'Recettes (FCFA)', 'Flux net (FCFA)', 'Cumul (FCFA)'],
          rows: [
            ['Année 1', 0, 0, '=C{r}-B{r}', '=D{r}'],
            ['Année 2', 0, 0, '=C{r}-B{r}', '=E2+D{r}'],
            ['Année 3', 0, 0, '=C{r}-B{r}', '=E3+D{r}'],
            ['Année 4', 0, 0, '=C{r}-B{r}', '=E4+D{r}'],
            ['Année 5', 0, 0, '=C{r}-B{r}', '=E5+D{r}'],
            ['Année 6', 0, 0, '=C{r}-B{r}', '=E6+D{r}'],
            ['Année 7', 0, 0, '=C{r}-B{r}', '=E7+D{r}'],
            ['TOTAL', '=SUM(B2:B8)', '=SUM(C2:C8)', '=SUM(D2:D8)', ''],
          ],
          totalsRow: false,
          colWidths: [14, 22, 20, 20, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 71,
  },

  // 9. xl_imv_rapprochement_syndic — Rapprochement comptes syndic
  {
    code: 'xl_imv_rapprochement_syndic',
    name: 'Rapprochement comptes syndic',
    category: 'immobilier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Rapprochement des appels de fonds, règlements et impayés des copropriétaires',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_copropriete', label: 'Nom de la copropriété', type: 'text', required: true },
      { name: 'syndic', label: 'Syndic', type: 'text', required: true },
      { name: 'exercice', label: 'Exercice', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Comptes Syndic',
          title: 'Rapprochement Comptes Syndic',
          colorHeader: '37474F',
          headers: ['Copropriétaire', 'N° Lot', 'Tantièmes', 'Appels fonds (FCFA)', 'Règlements (FCFA)', 'Impayés (FCFA)', 'Solde (FCFA)', 'Statut'],
          rows: [
            ['', 'LOT-001', 0, 0, 0, '=IFERROR(D{r}-E{r},0)', '=E{r}-D{r}', '=IF(F{r}>0,"IMPAYÉ","OK")'],
            ['', 'LOT-002', 0, 0, 0, '=IFERROR(D{r}-E{r},0)', '=E{r}-D{r}', '=IF(F{r}>0,"IMPAYÉ","OK")'],
            ['', 'LOT-003', 0, 0, 0, '=IFERROR(D{r}-E{r},0)', '=E{r}-D{r}', '=IF(F{r}>0,"IMPAYÉ","OK")'],
            ['', 'LOT-004', 0, 0, 0, '=IFERROR(D{r}-E{r},0)', '=E{r}-D{r}', '=IF(F{r}>0,"IMPAYÉ","OK")'],
            ['', 'LOT-005', 0, 0, 0, '=IFERROR(D{r}-E{r},0)', '=E{r}-D{r}', '=IF(F{r}>0,"IMPAYÉ","OK")'],
            ['', 'LOT-006', 0, 0, 0, '=IFERROR(D{r}-E{r},0)', '=E{r}-D{r}', '=IF(F{r}>0,"IMPAYÉ","OK")'],
            ['', 'LOT-007', 0, 0, 0, '=IFERROR(D{r}-E{r},0)', '=E{r}-D{r}', '=IF(F{r}>0,"IMPAYÉ","OK")'],
            ['', 'LOT-008', 0, 0, 0, '=IFERROR(D{r}-E{r},0)', '=E{r}-D{r}', '=IF(F{r}>0,"IMPAYÉ","OK")'],
            ['TOTAUX', '', '=SUM(C2:C9)', '=SUM(D2:D9)', '=SUM(E2:E9)', '=SUM(F2:F9)', '=SUM(G2:G9)', ''],
          ],
          totalsRow: false,
          colWidths: [22, 12, 12, 20, 20, 18, 16, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // 10. xl_imv_diagnostic_technique — Suivi diagnostics techniques
  {
    code: 'xl_imv_diagnostic_technique',
    name: 'Suivi diagnostics techniques',
    category: 'immobilier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de bord des diagnostics obligatoires : DPE, amiante, plomb, électricité et dates d\'expiration',
    price: 600, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'gestionnaire', label: 'Gestionnaire / Propriétaire', type: 'text', required: true },
      { name: 'date_maj', label: 'Date de mise à jour', type: 'date', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Diagnostics',
          title: 'Suivi Diagnostics Techniques',
          colorHeader: '37474F',
          headers: ['Référence bien', 'Adresse', 'DPE (classe)', 'Amiante', 'Plomb (CREP)', 'Électricité', 'Gaz', 'Termites', 'Date expiration', 'Statut'],
          rows: [
            ['BIEN-001', '', 'B', 'Conforme', 'Conforme', 'Valide', 'N/A', 'Conforme', '', '=IF(I{r}<TODAY(),"EXPIRÉ","VALIDE")'],
            ['BIEN-002', '', 'C', 'À refaire', 'Valide', 'À refaire', 'Valide', 'Conforme', '', '=IF(I{r}<TODAY(),"EXPIRÉ","VALIDE")'],
            ['BIEN-003', '', 'D', 'Conforme', 'Conforme', 'Valide', 'N/A', 'À refaire', '', '=IF(I{r}<TODAY(),"EXPIRÉ","VALIDE")'],
            ['BIEN-004', '', 'E', 'Valide', 'À refaire', 'Conforme', 'Valide', 'Conforme', '', '=IF(I{r}<TODAY(),"EXPIRÉ","VALIDE")'],
            ['BIEN-005', '', 'B', 'Conforme', 'Valide', 'Valide', 'Valide', 'Conforme', '', '=IF(I{r}<TODAY(),"EXPIRÉ","VALIDE")'],
            ['BIEN-006', '', 'C', 'Conforme', 'Conforme', 'À refaire', 'N/A', 'Conforme', '', '=IF(I{r}<TODAY(),"EXPIRÉ","VALIDE")'],
            ['BIEN-007', '', 'A', 'Conforme', 'Valide', 'Valide', 'Valide', 'Conforme', '', '=IF(I{r}<TODAY(),"EXPIRÉ","VALIDE")'],
            ['BIEN-008', '', 'F', 'À refaire', 'À refaire', 'À refaire', 'N/A', 'À refaire', '', '=IF(I{r}<TODAY(),"EXPIRÉ","VALIDE")'],
          ],
          totalsRow: false,
          colWidths: [14, 24, 12, 14, 14, 14, 10, 14, 16, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // ── BTP AVANCÉ ────────────────────────────────────────────────────────────

  // 11. xl_btv_dpgf — DPGF décomposition prix globale forfaitaire
  {
    code: 'xl_btv_dpgf',
    name: 'DPGF — Décomposition prix globale forfaitaire',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Décomposition du prix global forfaitaire par lots, sous-lots, unités, quantités et prix unitaires',
    price: 1500, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_marche', label: 'Intitulé du marché', type: 'text', required: true },
      { name: 'maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'entreprise', label: 'Entreprise soumissionnaire', type: 'text', required: true },
      { name: 'date_offre', label: 'Date de l\'offre', type: 'date', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'DPGF',
          title: 'Décomposition du Prix Global et Forfaitaire (DPGF)',
          colorHeader: 'E65100',
          headers: ['N°', 'Désignation', 'Unité', 'Quantité', 'Prix unitaire HT (FCFA)', 'Total HT (FCFA)', 'Observations'],
          rows: [
            ['1', 'LOT 1 — TERRASSEMENTS', '', '', '', '', ''],
            ['1.1', 'Terrassements généraux m³', 'm³', 0, 0, '=D{r}*E{r}', ''],
            ['1.2', 'Évacuation déblais', 'm³', 0, 0, '=D{r}*E{r}', ''],
            ['2', 'LOT 2 — GROS ŒUVRE', '', '', '', '', ''],
            ['2.1', 'Béton de propreté', 'm³', 0, 0, '=D{r}*E{r}', ''],
            ['2.2', 'Semelles filantes BA', 'ml', 0, 0, '=D{r}*E{r}', ''],
            ['2.3', 'Murs en parpaings', 'm²', 0, 0, '=D{r}*E{r}', ''],
            ['2.4', 'Dalle de compression', 'm²', 0, 0, '=D{r}*E{r}', ''],
            ['3', 'LOT 3 — SECOND ŒUVRE', '', '', '', '', ''],
            ['3.1', 'Enduits intérieurs', 'm²', 0, 0, '=D{r}*E{r}', ''],
            ['3.2', 'Carrelage sol', 'm²', 0, 0, '=D{r}*E{r}', ''],
            ['TOTAL HT', '', '', '', '', '=SUM(F3:F12)', ''],
            ['TVA (18%)', '', '', '', '', '=F13*0.18', ''],
            ['TOTAL TTC', '', '', '', '', '=F13+F14', ''],
          ],
          totalsRow: false,
          colWidths: [8, 38, 10, 12, 22, 20, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 82,
  },

  // 12. xl_btv_planning_general — Planning général travaux
  {
    code: 'xl_btv_planning_general',
    name: 'Planning général travaux',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planning général des travaux : phases, tâches, durée, début, fin, prédécesseurs et avancement',
    price: 1200, priceMax: 1600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier', label: 'Nom du chantier', type: 'text', required: true },
      { name: 'maitre_oeuvre', label: 'Maître d\'œuvre', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'delai_total', label: 'Délai total (semaines)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Planning',
          title: 'Planning Général des Travaux',
          colorHeader: 'E65100',
          headers: ['N°', 'Tâche / Phase', 'Durée (sem)', 'Date début', 'Date fin', 'Prédécesseur', 'Responsable', 'Avancement %', 'Statut'],
          rows: [
            ['1', 'PHASE 1 — PRÉPARATION', '', '', '', '', '', 0, ''],
            ['1.1', 'Installation de chantier', 1, '', '=IFERROR(D{r}+C{r}*7,"")', '', 'Chef chantier', 0, '=IF(H{r}=100,"TERMINÉ",IF(H{r}>0,"EN COURS","À FAIRE"))'],
            ['1.2', 'Piquetage & implantation', 1, '', '=IFERROR(D{r}+C{r}*7,"")', '1.1', 'Géomètre', 0, '=IF(H{r}=100,"TERMINÉ",IF(H{r}>0,"EN COURS","À FAIRE"))'],
            ['2', 'PHASE 2 — TERRASSEMENTS', '', '', '', '', '', 0, ''],
            ['2.1', 'Décapage & terrassements', 2, '', '=IFERROR(D{r}+C{r}*7,"")', '1.2', 'Terrassier', 0, '=IF(H{r}=100,"TERMINÉ",IF(H{r}>0,"EN COURS","À FAIRE"))'],
            ['3', 'PHASE 3 — GROS ŒUVRE', '', '', '', '', '', 0, ''],
            ['3.1', 'Fondations & semelles', 3, '', '=IFERROR(D{r}+C{r}*7,"")', '2.1', 'Maçon GO', 0, '=IF(H{r}=100,"TERMINÉ",IF(H{r}>0,"EN COURS","À FAIRE"))'],
            ['3.2', 'Élévation murs', 4, '', '=IFERROR(D{r}+C{r}*7,"")', '3.1', 'Maçon GO', 0, '=IF(H{r}=100,"TERMINÉ",IF(H{r}>0,"EN COURS","À FAIRE"))'],
            ['3.3', 'Dalle et charpente', 3, '', '=IFERROR(D{r}+C{r}*7,"")', '3.2', 'Maçon GO', 0, '=IF(H{r}=100,"TERMINÉ",IF(H{r}>0,"EN COURS","À FAIRE"))'],
            ['4', 'PHASE 4 — SECOND ŒUVRE', '', '', '', '', '', 0, ''],
            ['4.1', 'Plomberie & électricité', 4, '', '=IFERROR(D{r}+C{r}*7,"")', '3.3', 'Sous-traitants', 0, '=IF(H{r}=100,"TERMINÉ",IF(H{r}>0,"EN COURS","À FAIRE"))'],
            ['4.2', 'Revêtements & finitions', 3, '', '=IFERROR(D{r}+C{r}*7,"")', '4.1', 'Finisseur', 0, '=IF(H{r}=100,"TERMINÉ",IF(H{r}>0,"EN COURS","À FAIRE"))'],
          ],
          totalsRow: false,
          colWidths: [8, 32, 14, 14, 14, 14, 18, 14, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 80,
  },

  // 13. xl_btv_pv_reunion — Registre PV réunions chantier
  {
    code: 'xl_btv_pv_reunion',
    name: 'Registre PV réunions chantier',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Registre des procès-verbaux de réunions de chantier : décisions, délais, responsables et statuts',
    price: 600, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier', label: 'Nom du chantier', type: 'text', required: true },
      { name: 'maitre_oeuvre', label: 'Maître d\'œuvre', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'PV Réunions',
          title: 'Registre des PV de Réunions Chantier',
          colorHeader: 'E65100',
          headers: ['N° PV', 'Date réunion', 'Participants', 'Décision / Action', 'Responsable', 'Délai prévu', 'Statut', 'Observations'],
          rows: [
            ['PV-001', '', '', '', '', '', 'En cours', ''],
            ['PV-001', '', '', '', '', '', 'Réalisé', ''],
            ['PV-002', '', '', '', '', '', 'En cours', ''],
            ['PV-002', '', '', '', '', '', 'En attente', ''],
            ['PV-003', '', '', '', '', '', 'En cours', ''],
            ['PV-003', '', '', '', '', '', 'Réalisé', ''],
            ['PV-004', '', '', '', '', '', 'En attente', ''],
            ['PV-004', '', '', '', '', '', 'En cours', ''],
            ['PV-005', '', '', '', '', '', 'En cours', ''],
            ['PV-005', '', '', '', '', '', 'En attente', ''],
          ],
          totalsRow: false,
          colWidths: [10, 14, 24, 40, 20, 14, 14, 24],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 14. xl_btv_controle_betons — Contrôle qualité bétons
  {
    code: 'xl_btv_controle_betons',
    name: 'Contrôle qualité bétons',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de contrôle qualité des bétons : résistances prévues, mesurées, conformité et actions correctives',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier', label: 'Nom du chantier', type: 'text', required: true },
      { name: 'laboratoire', label: 'Laboratoire de contrôle', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Contrôle Bétons',
          title: 'Contrôle Qualité Bétons',
          colorHeader: 'E65100',
          headers: ['N° Éprouvette', 'Élément bétonné', 'Date coulage', 'Date essai', 'Classe visée', 'Résistance prévue (MPa)', 'Résistance mesurée (MPa)', 'Écart (MPa)', 'Conformité', 'Actions correctives'],
          rows: [
            ['EB-001', 'Semelles filantes', '', '', 'C25/30', 25, 0, '=G{r}-F{r}', '=IF(G{r}>=F{r},"CONFORME","NON CONFORME")', ''],
            ['EB-002', 'Poteaux RDC', '', '', 'C30/37', 30, 0, '=G{r}-F{r}', '=IF(G{r}>=F{r},"CONFORME","NON CONFORME")', ''],
            ['EB-003', 'Dalle 1er étage', '', '', 'C25/30', 25, 0, '=G{r}-F{r}', '=IF(G{r}>=F{r},"CONFORME","NON CONFORME")', ''],
            ['EB-004', 'Poutres portiques', '', '', 'C30/37', 30, 0, '=G{r}-F{r}', '=IF(G{r}>=F{r},"CONFORME","NON CONFORME")', ''],
            ['EB-005', 'Murs refend', '', '', 'C20/25', 20, 0, '=G{r}-F{r}', '=IF(G{r}>=F{r},"CONFORME","NON CONFORME")', ''],
            ['EB-006', 'Voile béton', '', '', 'C25/30', 25, 0, '=G{r}-F{r}', '=IF(G{r}>=F{r},"CONFORME","NON CONFORME")', ''],
            ['EB-007', 'Dalle toiture', '', '', 'C25/30', 25, 0, '=G{r}-F{r}', '=IF(G{r}>=F{r},"CONFORME","NON CONFORME")', ''],
            ['EB-008', 'Escaliers', '', '', 'C20/25', 20, 0, '=G{r}-F{r}', '=IF(G{r}>=F{r},"CONFORME","NON CONFORME")', ''],
            ['MOYENNE', '', '', '', '', '=AVERAGE(F2:F9)', '=AVERAGE(G2:G9)', '=AVERAGE(H2:H9)', '', ''],
          ],
          totalsRow: false,
          colWidths: [14, 20, 14, 14, 12, 20, 22, 14, 18, 24],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 73,
  },

  // 15. xl_btv_reception_materiaux — Contrôle réception matériaux
  {
    code: 'xl_btv_reception_materiaux',
    name: 'Contrôle réception matériaux',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Registre de réception et contrôle qualité des matériaux : livraisons, conformité et observations',
    price: 700, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier', label: 'Nom du chantier', type: 'text', required: true },
      { name: 'responsable_reception', label: 'Responsable réception', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Réception Matériaux',
          title: 'Contrôle Réception Matériaux',
          colorHeader: 'E65100',
          headers: ['N° BL', 'Date livraison', 'Matériau / Produit', 'Fournisseur', 'Quantité commandée', 'Quantité livrée', 'Unité', 'Conformité qualité', 'Conformité quantité', 'Observations', 'Visa réception'],
          rows: [
            ['BL-001', '', 'Ciment CEM II 42,5', '', 0, 0, 'sac 50kg', 'Conforme', '=IF(F{r}=E{r},"OK","ÉCART")', '', ''],
            ['BL-002', '', 'Sable de rivière', '', 0, 0, 'm³', 'Conforme', '=IF(F{r}=E{r},"OK","ÉCART")', '', ''],
            ['BL-003', '', 'Graviers 20/40', '', 0, 0, 'm³', 'Conforme', '=IF(F{r}=E{r},"OK","ÉCART")', '', ''],
            ['BL-004', '', 'Fer à béton HA10', '', 0, 0, 'kg', 'Non conforme', '=IF(F{r}=E{r},"OK","ÉCART")', '', ''],
            ['BL-005', '', 'Fer à béton HA12', '', 0, 0, 'kg', 'Conforme', '=IF(F{r}=E{r},"OK","ÉCART")', '', ''],
            ['BL-006', '', 'Parpaings 15x20x40', '', 0, 0, 'pièce', 'Conforme', '=IF(F{r}=E{r},"OK","ÉCART")', '', ''],
            ['BL-007', '', 'Carrelage 40x40', '', 0, 0, 'm²', 'Conforme', '=IF(F{r}=E{r},"OK","ÉCART")', '', ''],
            ['BL-008', '', 'Peinture façade', '', 0, 0, 'bidon', 'Conforme', '=IF(F{r}=E{r},"OK","ÉCART")', '', ''],
          ],
          totalsRow: false,
          colWidths: [10, 14, 24, 20, 18, 16, 12, 18, 18, 22, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 16. xl_btv_sous_traitants — Gestion sous-traitants
  {
    code: 'xl_btv_sous_traitants',
    name: 'Gestion sous-traitants',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des sous-traitants : entreprises, lots, montants, avancement, paiements et retenue de garantie',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier', label: 'Nom du chantier', type: 'text', required: true },
      { name: 'entreprise_generale', label: 'Entreprise générale', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Sous-traitants',
          title: 'Gestion des Sous-traitants',
          colorHeader: 'E65100',
          headers: ['Entreprise', 'Lot sous-traité', 'Montant marché HT', 'Avancement %', 'Montant dû (FCFA)', 'Acomptes versés', 'Retenue garantie (5%)', 'Solde à payer', 'Statut'],
          rows: [
            ['', 'Plomberie', 0, 0, '=C{r}*D{r}/100', 0, '=C{r}*0.05', '=E{r}-F{r}-G{r}', '=IF(D{r}=100,"TERMINÉ",IF(D{r}>0,"EN COURS","À DÉMARRER"))'],
            ['', 'Électricité', 0, 0, '=C{r}*D{r}/100', 0, '=C{r}*0.05', '=E{r}-F{r}-G{r}', '=IF(D{r}=100,"TERMINÉ",IF(D{r}>0,"EN COURS","À DÉMARRER"))'],
            ['', 'Menuiserie bois', 0, 0, '=C{r}*D{r}/100', 0, '=C{r}*0.05', '=E{r}-F{r}-G{r}', '=IF(D{r}=100,"TERMINÉ",IF(D{r}>0,"EN COURS","À DÉMARRER"))'],
            ['', 'Menuiserie alu', 0, 0, '=C{r}*D{r}/100', 0, '=C{r}*0.05', '=E{r}-F{r}-G{r}', '=IF(D{r}=100,"TERMINÉ",IF(D{r}>0,"EN COURS","À DÉMARRER"))'],
            ['', 'Carrelage', 0, 0, '=C{r}*D{r}/100', 0, '=C{r}*0.05', '=E{r}-F{r}-G{r}', '=IF(D{r}=100,"TERMINÉ",IF(D{r}>0,"EN COURS","À DÉMARRER"))'],
            ['', 'Peinture', 0, 0, '=C{r}*D{r}/100', 0, '=C{r}*0.05', '=E{r}-F{r}-G{r}', '=IF(D{r}=100,"TERMINÉ",IF(D{r}>0,"EN COURS","À DÉMARRER"))'],
            ['', 'VRD', 0, 0, '=C{r}*D{r}/100', 0, '=C{r}*0.05', '=E{r}-F{r}-G{r}', '=IF(D{r}=100,"TERMINÉ",IF(D{r}>0,"EN COURS","À DÉMARRER"))'],
            ['TOTAUX', '', '=SUM(C2:C8)', '', '=SUM(E2:E8)', '=SUM(F2:F8)', '=SUM(G2:G8)', '=SUM(H2:H8)', ''],
          ],
          totalsRow: false,
          colWidths: [22, 18, 20, 14, 20, 18, 20, 18, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 76,
  },

  // 17. xl_btv_courbe_s — Courbe S avancement
  {
    code: 'xl_btv_courbe_s',
    name: 'Courbe S avancement chantier',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau et données pour la courbe S : avancement prévu cumulé, réalisé cumulé, écart et tendance',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier', label: 'Nom du chantier', type: 'text', required: true },
      { name: 'duree_totale', label: 'Durée totale (semaines)', type: 'text', required: true },
      { name: 'maitre_oeuvre', label: 'Maître d\'œuvre', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Courbe S',
          title: 'Courbe S — Avancement Chantier',
          colorHeader: 'E65100',
          headers: ['Période', 'Avancement prévu (%)', 'Prévu cumulé (%)', 'Avancement réalisé (%)', 'Réalisé cumulé (%)', 'Écart cumulé (%)', 'Tendance'],
          rows: [
            ['Semaine 1', 0, '=B{r}', 0, '=D{r}', '=E{r}-C{r}', '=IF(F{r}>=0,"Dans les délais","En retard")'],
            ['Semaine 2', 0, '=C2+B{r}', 0, '=E2+D{r}', '=E{r}-C{r}', '=IF(F{r}>=0,"Dans les délais","En retard")'],
            ['Semaine 3', 0, '=C3+B{r}', 0, '=E3+D{r}', '=E{r}-C{r}', '=IF(F{r}>=0,"Dans les délais","En retard")'],
            ['Semaine 4', 0, '=C4+B{r}', 0, '=E4+D{r}', '=E{r}-C{r}', '=IF(F{r}>=0,"Dans les délais","En retard")'],
            ['Semaine 6', 0, '=C5+B{r}', 0, '=E5+D{r}', '=E{r}-C{r}', '=IF(F{r}>=0,"Dans les délais","En retard")'],
            ['Semaine 8', 0, '=C6+B{r}', 0, '=E6+D{r}', '=E{r}-C{r}', '=IF(F{r}>=0,"Dans les délais","En retard")'],
            ['Semaine 10', 0, '=C7+B{r}', 0, '=E7+D{r}', '=E{r}-C{r}', '=IF(F{r}>=0,"Dans les délais","En retard")'],
            ['Semaine 12', 0, '=C8+B{r}', 0, '=E8+D{r}', '=E{r}-C{r}', '=IF(F{r}>=0,"Dans les délais","En retard")'],
            ['Semaine 14', 0, '=C9+B{r}', 0, '=E9+D{r}', '=E{r}-C{r}', '=IF(F{r}>=0,"Dans les délais","En retard")'],
            ['Semaine 16 (fin)', 0, '=C10+B{r}', 0, '=E10+D{r}', '=E{r}-C{r}', '=IF(F{r}>=0,"Dans les délais","En retard")'],
          ],
          totalsRow: false,
          colWidths: [14, 20, 18, 22, 18, 18, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 77,
  },

  // 18. xl_btv_dac — Dossier des ouvrages exécutés
  {
    code: 'xl_btv_dac',
    name: 'Dossier des ouvrages exécutés (DOE)',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi du DOE : lots, documents à fournir, réception, réserves, levée de réserves et statut',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier', label: 'Nom du chantier', type: 'text', required: true },
      { name: 'date_reception', label: 'Date de réception', type: 'date', required: false },
      { name: 'maitre_oeuvre', label: 'Maître d\'œuvre', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'DOE',
          title: 'Dossier des Ouvrages Exécutés (DOE)',
          colorHeader: 'E65100',
          headers: ['Lot', 'Entreprise', 'Documents requis', 'Documents reçus', 'Date réception', 'Réserves', 'Délai levée', 'Levée réserves', 'Statut DOE'],
          rows: [
            ['Gros œuvre', '', 'Plans exécution, notes calcul', 'Non', '', 'Oui', '', 'Non', '=IF(AND(D{r}="Oui",H{r}="Oui"),"COMPLET","EN ATTENTE")'],
            ['Charpente', '', 'Plans, PV essais', 'Non', '', 'Non', '', 'N/A', '=IF(AND(D{r}="Oui",H{r}="Oui"),"COMPLET","EN ATTENTE")'],
            ['Plomberie', '', 'Schémas, PV étanchéité', 'Non', '', 'Oui', '', 'Non', '=IF(AND(D{r}="Oui",H{r}="Oui"),"COMPLET","EN ATTENTE")'],
            ['Électricité', '', 'Schémas électriques, CONSUEL', 'Non', '', 'Non', '', 'N/A', '=IF(AND(D{r}="Oui",H{r}="Oui"),"COMPLET","EN ATTENTE")'],
            ['Menuiserie', '', 'Fiches techniques, PV', 'Non', '', 'Oui', '', 'Non', '=IF(AND(D{r}="Oui",H{r}="Oui"),"COMPLET","EN ATTENTE")'],
            ['Carrelage', '', 'Fiches produit, DOE', 'Non', '', 'Non', '', 'N/A', '=IF(AND(D{r}="Oui",H{r}="Oui"),"COMPLET","EN ATTENTE")'],
            ['Peinture', '', 'Fiches produit, garanties', 'Non', '', 'Non', '', 'N/A', '=IF(AND(D{r}="Oui",H{r}="Oui"),"COMPLET","EN ATTENTE")'],
            ['VRD', '', 'Plans récolement, essais', 'Non', '', 'Oui', '', 'Non', '=IF(AND(D{r}="Oui",H{r}="Oui"),"COMPLET","EN ATTENTE")'],
          ],
          totalsRow: false,
          colWidths: [16, 20, 30, 16, 16, 12, 16, 18, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 19. xl_btv_gestion_eau — Gestion eau chantier
  {
    code: 'xl_btv_gestion_eau',
    name: 'Gestion eau chantier',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi de la gestion de l\'eau sur chantier : besoins, sources, consommation, traitement et coûts',
    price: 700, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_chantier', label: 'Nom du chantier', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable HSE', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Gestion Eau',
          title: 'Gestion Eau Chantier',
          colorHeader: 'E65100',
          headers: ['Poste de consommation', 'Besoins estimés (m³/mois)', 'Source approvisionnement', 'Consommation réelle (m³)', 'Traitement requis', 'Coût unit. (FCFA/m³)', 'Coût mensuel (FCFA)', 'Observations'],
          rows: [
            ['Eau de gâchage béton', 0, 'Réseau SODECI', 0, 'Aucun', 0, '=D{r}*F{r}', ''],
            ['Eau de cure béton', 0, 'Citerne', 0, 'Aucun', 0, '=D{r}*F{r}', ''],
            ['Eau sanitaire personnel', 0, 'Réseau SODECI', 0, 'Chloration', 0, '=D{r}*F{r}', ''],
            ['Eau nettoyage chantier', 0, 'Citerne', 0, 'Aucun', 0, '=D{r}*F{r}', ''],
            ['Eau lutte incendie', 0, 'Réseau & stockage', 0, 'Aucun', 0, '=D{r}*F{r}', ''],
            ['Eau piscine / compactage', 0, 'Camion citerne', 0, 'Aucun', 0, '=D{r}*F{r}', ''],
            ['Eau test équipements', 0, 'Réseau SODECI', 0, 'Aucun', 0, '=D{r}*F{r}', ''],
            ['TOTAUX', '=SUM(B2:B8)', '', '=SUM(D2:D8)', '', '', '=SUM(G2:G8)', ''],
          ],
          totalsRow: false,
          colWidths: [28, 22, 22, 22, 18, 18, 20, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // 20. xl_btv_revision_prix — Tableau révision de prix
  {
    code: 'xl_btv_revision_prix',
    name: 'Tableau révision de prix',
    category: 'btp_construction',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Calcul de la révision de prix par formule paramétrique : index de base, index actuels et coefficient de révision',
    price: 1200, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_marche', label: 'Intitulé du marché', type: 'text', required: true },
      { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'date_base', label: 'Date de base des prix', type: 'date', required: true },
      { name: 'date_revision', label: 'Date de révision', type: 'date', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Révision Prix',
          title: 'Tableau de Révision de Prix',
          colorHeader: 'E65100',
          headers: ['Paramètre / Index', 'Coefficient pondération', 'Index base (I0)', 'Index actuel (In)', 'Rapport In/I0', 'Contribution', 'Observations'],
          rows: [
            ['Main d\'œuvre (Mo)', 0.35, 0, 0, '=IFERROR(D{r}/C{r},0)', '=B{r}*E{r}', 'BTP Indice MO'],
            ['Matériaux (Ma)', 0.30, 0, 0, '=IFERROR(D{r}/C{r},0)', '=B{r}*E{r}', 'Indice granulats'],
            ['Matières premières (Mp)', 0.20, 0, 0, '=IFERROR(D{r}/C{r},0)', '=B{r}*E{r}', 'Indice ciment'],
            ['Énergie (Ee)', 0.10, 0, 0, '=IFERROR(D{r}/C{r},0)', '=B{r}*E{r}', 'Indice carburant'],
            ['Frais fixes (P)', 0.05, 1, 1, '=IFERROR(D{r}/C{r},0)', '=B{r}*E{r}', 'Partie fixe'],
            ['SOMME PONDÉRATIONS', '=SUM(B2:B6)', '', '', '', '=SUM(F2:F6)', ''],
            ['COEFFICIENT DE RÉVISION (Cr)', '', '', '', '', '=F7', 'Cr = Σ(ai × In/I0)'],
            ['MONTANT MARCHÉ INITIAL (FCFA)', 0, '', '', '', '', ''],
            ['MONTANT RÉVISÉ (FCFA)', '', '', '', '', '=F7*B9', 'Montant × Cr'],
            ['PLUS-VALUE RÉVISION (FCFA)', '', '', '', '', '=F9-B9', 'Montant révisé - Initial'],
          ],
          totalsRow: false,
          colWidths: [28, 22, 16, 16, 16, 18, 26],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 74,
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
  console.log(`✅ Excel Immo/BTP2: ${created} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
