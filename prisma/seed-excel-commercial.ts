import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);
const COLOR = 'B71C1C';

const templates = [
  // 1. Devis automatisé
  {
    code: 'xl_com_devis',
    name: 'Devis automatisé',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Devis avec calcul automatique : produits, quantités, prix unitaire, TVA et total',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'client_nom', label: 'Nom du client', type: 'text', required: true },
      { name: 'numero_devis', label: 'Numéro de devis', type: 'text', required: true },
      { name: 'date_devis', label: 'Date du devis', type: 'date', required: true },
      { name: 'validite_jours', label: 'Validité (jours)', type: 'text', required: false },
      { name: 'taux_tva', label: 'Taux TVA (%)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Devis',
          title: 'DEVIS AUTOMATISÉ',
          colorHeader: COLOR,
          headers: ['Désignation', 'Quantité', 'Prix Unitaire (FCFA)', 'Montant HT (FCFA)', 'TVA (%)', 'Montant TTC (FCFA)'],
          rows: [
            ['Produit / Service A', 1, 50000, '=B{r}*C{r}', 18, '=D{r}*(1+E{r}/100)'],
            ['Produit / Service B', 2, 30000, '=B{r}*C{r}', 18, '=D{r}*(1+E{r}/100)'],
            ['Produit / Service C', 5, 15000, '=B{r}*C{r}', 18, '=D{r}*(1+E{r}/100)'],
            ['Prestation D', 1, 75000, '=B{r}*C{r}', 0, '=D{r}*(1+E{r}/100)'],
            ['Frais divers', 1, 10000, '=B{r}*C{r}', 18, '=D{r}*(1+E{r}/100)'],
          ],
          totalsRow: true,
          colWidths: [35, 12, 22, 22, 12, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  // 2. Facture avec calcul automatique
  {
    code: 'xl_com_facture',
    name: 'Facture avec calcul automatique',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Facture professionnelle avec lignes, TVA, remise et calcul du net à payer',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'client_nom', label: 'Nom du client', type: 'text', required: true },
      { name: 'numero_facture', label: 'Numéro de facture', type: 'text', required: true },
      { name: 'date_facture', label: 'Date de facturation', type: 'date', required: true },
      { name: 'echeance', label: 'Date d\'échéance', type: 'date', required: false },
      { name: 'remise_globale', label: 'Remise globale (%)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Facture',
          title: 'FACTURE',
          colorHeader: COLOR,
          headers: ['Désignation', 'Qté', 'PU HT (FCFA)', 'Remise (%)', 'Montant HT', 'TVA (%)', 'Montant TTC'],
          rows: [
            ['Article 1', 2, 45000, 5, '=C{r}*B{r}*(1-D{r}/100)', 18, '=E{r}*(1+F{r}/100)'],
            ['Article 2', 1, 80000, 0, '=C{r}*B{r}*(1-D{r}/100)', 18, '=E{r}*(1+F{r}/100)'],
            ['Prestation service', 3, 25000, 10, '=C{r}*B{r}*(1-D{r}/100)', 0, '=E{r}*(1+F{r}/100)'],
            ['Frais livraison', 1, 5000, 0, '=C{r}*B{r}*(1-D{r}/100)', 18, '=E{r}*(1+F{r}/100)'],
          ],
          totalsRow: true,
          colWidths: [35, 8, 18, 12, 18, 10, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 80,
  },

  // 3. Suivi des ventes mensuelles
  {
    code: 'xl_com_suivi_ventes',
    name: 'Suivi des ventes mensuelles',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de suivi mensuel des ventes par produit : CA réalisé, objectif et écart',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'periode', label: 'Mois / Période', type: 'text', required: true },
      { name: 'equipe', label: 'Équipe / Agence', type: 'text', required: false },
      { name: 'devise', label: 'Devise', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Ventes',
          title: 'SUIVI DES VENTES MENSUELLES',
          colorHeader: COLOR,
          headers: ['Produit / Famille', 'Qté Vendue', 'PU Moyen (FCFA)', 'CA Réalisé (FCFA)', 'Objectif (FCFA)', 'Écart (FCFA)', 'Taux Réalisation (%)'],
          rows: [
            ['Produit A', 120, 15000, '=B{r}*C{r}', 2000000, '=D{r}-E{r}', '=D{r}/E{r}*100'],
            ['Produit B', 85, 25000, '=B{r}*C{r}', 2500000, '=D{r}-E{r}', '=D{r}/E{r}*100'],
            ['Produit C', 200, 8000, '=B{r}*C{r}', 1500000, '=D{r}-E{r}', '=D{r}/E{r}*100'],
            ['Service Premium', 30, 50000, '=B{r}*C{r}', 2000000, '=D{r}-E{r}', '=D{r}/E{r}*100'],
            ['Accessoires', 500, 3000, '=B{r}*C{r}', 1800000, '=D{r}-E{r}', '=D{r}/E{r}*100'],
          ],
          totalsRow: true,
          colWidths: [30, 14, 20, 22, 20, 18, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 4. Pipeline commercial
  {
    code: 'xl_com_pipeline',
    name: 'Pipeline commercial',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Gestion du pipeline commercial : prospects, stade d\'avancement, probabilité et valeur estimée',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'commercial', label: 'Commercial responsable', type: 'text', required: true },
      { name: 'periode', label: 'Période (trimestre/année)', type: 'text', required: true },
      { name: 'objectif_global', label: 'Objectif global (FCFA)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Pipeline',
          title: 'PIPELINE COMMERCIAL',
          colorHeader: COLOR,
          headers: ['Prospect / Client', 'Opportunité', 'Stade', 'Probabilité (%)', 'Valeur Estimée (FCFA)', 'Valeur Pondérée (FCFA)', 'Date Clôture Prévue'],
          rows: [
            ['Client Alpha', 'Contrat annuel ERP', 'Proposition', 60, 5000000, '=D{r}/100*E{r}', '2024-03-31'],
            ['Client Beta', 'Fourniture matériel', 'Négociation', 80, 2500000, '=D{r}/100*E{r}', '2024-02-15'],
            ['Client Gamma', 'Prestation conseil', 'Qualification', 30, 1200000, '=D{r}/100*E{r}', '2024-04-30'],
            ['Prospect Delta', 'Maintenance annuelle', 'Prospection', 20, 800000, '=D{r}/100*E{r}', '2024-05-15'],
            ['Client Epsilon', 'Extension contrat', 'Closing', 90, 3500000, '=D{r}/100*E{r}', '2024-01-31'],
          ],
          totalsRow: true,
          colWidths: [25, 30, 18, 18, 24, 24, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 5. Suivi relances clients
  {
    code: 'xl_com_relance',
    name: 'Suivi relances clients',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de suivi des relances pour factures impayées : dates, montants et statut',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'responsable', label: 'Responsable recouvrement', type: 'text', required: true },
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'seuil_alerte_jours', label: 'Seuil alerte (jours)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Relances',
          title: 'SUIVI DES RELANCES CLIENTS',
          colorHeader: COLOR,
          headers: ['Client', 'N° Facture', 'Montant (FCFA)', 'Date Facture', 'Date Échéance', 'Jours Retard', 'Statut Relance'],
          rows: [
            ['Client A', 'FAC-2024-001', 450000, '2024-01-05', '2024-02-04', 25, 'Relance 1 envoyée'],
            ['Client B', 'FAC-2024-008', 1200000, '2023-12-15', '2024-01-14', 45, 'Relance 2 — Mise en demeure'],
            ['Client C', 'FAC-2024-012', 350000, '2024-01-20', '2024-02-19', 10, 'En attente'],
            ['Client D', 'FAC-2023-098', 780000, '2023-11-01', '2023-11-30', 70, 'Contentieux'],
            ['Client E', 'FAC-2024-015', 200000, '2024-01-25', '2024-02-24', 5, 'Relance 1 envoyée'],
          ],
          totalsRow: true,
          colWidths: [25, 18, 20, 16, 16, 14, 28],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 6. Catalogue tarifaire
  {
    code: 'xl_com_catalogue_prix',
    name: 'Catalogue tarifaire',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Catalogue des prix avec prix d\'achat, prix de vente, marge et remise maximale autorisée',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_application', label: 'Date d\'application', type: 'date', required: true },
      { name: 'version', label: 'Version du catalogue', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Catalogue',
          title: 'CATALOGUE TARIFAIRE',
          colorHeader: COLOR,
          headers: ['Référence', 'Désignation', 'PA (FCFA)', 'PV Public (FCFA)', 'Marge Brute (FCFA)', 'Taux Marge (%)', 'Remise Max (%)'],
          rows: [
            ['REF-001', 'Produit Standard A', 12000, 20000, '=D{r}-C{r}', '=E{r}/D{r}*100', 10],
            ['REF-002', 'Produit Premium B', 35000, 65000, '=D{r}-C{r}', '=E{r}/D{r}*100', 15],
            ['REF-003', 'Service Basique', 8000, 18000, '=D{r}-C{r}', '=E{r}/D{r}*100', 5],
            ['REF-004', 'Service Expert', 25000, 55000, '=D{r}-C{r}', '=E{r}/D{r}*100', 20],
            ['REF-005', 'Pack Complet', 60000, 120000, '=D{r}-C{r}', '=E{r}/D{r}*100', 12],
          ],
          totalsRow: true,
          colWidths: [15, 30, 18, 20, 22, 18, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // 7. Calcul commissions vendeurs
  {
    code: 'xl_com_commissions',
    name: 'Calcul commissions vendeurs',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Calcul automatique des commissions par vendeur : CA, taux, montant et cumul',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'periode', label: 'Période (mois/trimestre)', type: 'text', required: true },
      { name: 'taux_base', label: 'Taux commission de base (%)', type: 'text', required: false },
      { name: 'objectif_commun', label: 'Objectif équipe (FCFA)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Commissions',
          title: 'CALCUL COMMISSIONS VENDEURS',
          colorHeader: COLOR,
          headers: ['Vendeur', 'CA Réalisé (FCFA)', 'Objectif (FCFA)', 'Taux Comm. (%)', 'Commission Période (FCFA)', 'Bonus Objectif (FCFA)', 'Total Commission (FCFA)'],
          rows: [
            ['Kouassi Amed', 4500000, 4000000, 5, '=B{r}*D{r}/100', 150000, '=E{r}+F{r}'],
            ['Diallo Fatou', 3200000, 4000000, 5, '=B{r}*D{r}/100', 0, '=E{r}+F{r}'],
            ['Bamba Issouf', 5800000, 4000000, 5, '=B{r}*D{r}/100', 250000, '=E{r}+F{r}'],
            ['Koné Marie', 2900000, 4000000, 4, '=B{r}*D{r}/100', 0, '=E{r}+F{r}'],
            ['Traoré Seydou', 6200000, 4000000, 6, '=B{r}*D{r}/100', 300000, '=E{r}+F{r}'],
          ],
          totalsRow: true,
          colWidths: [25, 22, 18, 16, 28, 22, 26],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  // 8. Tableau objectifs ventes
  {
    code: 'xl_com_objectifs',
    name: 'Tableau objectifs ventes',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des objectifs de vente par vendeur : objectifs, réalisé et taux d\'atteinte',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'manager', label: 'Manager commercial', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Objectifs',
          title: 'TABLEAU OBJECTIFS VENTES',
          colorHeader: COLOR,
          headers: ['Vendeur', 'Objectif CA (FCFA)', 'CA Réalisé (FCFA)', 'Écart (FCFA)', 'Taux Atteinte (%)', 'Nb Visites Obj.', 'Nb Visites Réal.'],
          rows: [
            ['Commercial 1', 5000000, 4800000, '=C{r}-B{r}', '=C{r}/B{r}*100', 80, 75],
            ['Commercial 2', 4000000, 4500000, '=C{r}-B{r}', '=C{r}/B{r}*100', 60, 68],
            ['Commercial 3', 6000000, 5200000, '=C{r}-B{r}', '=C{r}/B{r}*100', 90, 85],
            ['Commercial 4', 3500000, 3800000, '=C{r}-B{r}', '=C{r}/B{r}*100', 55, 60],
            ['Commercial 5', 4500000, 4500000, '=C{r}-B{r}', '=C{r}/B{r}*100', 70, 72],
          ],
          totalsRow: true,
          colWidths: [25, 22, 22, 18, 20, 18, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // 9. Portefeuille clients
  {
    code: 'xl_com_portefeuille',
    name: 'Portefeuille clients',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Analyse du portefeuille clients : CA, fréquence d\'achat, potentiel et segmentation',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'commercial', label: 'Commercial propriétaire', type: 'text', required: true },
      { name: 'date_analyse', label: 'Date d\'analyse', type: 'date', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Portefeuille',
          title: 'PORTEFEUILLE CLIENTS',
          colorHeader: COLOR,
          headers: ['Client', 'Secteur', 'CA Annuel (FCFA)', 'Nb Commandes/An', 'Panier Moyen (FCFA)', 'Potentiel Estimé (FCFA)', 'Segment'],
          rows: [
            ['Entreprise Alpha', 'BTP', 12000000, 24, '=C{r}/D{r}', 18000000, 'Grand compte'],
            ['SARL Beta', 'Commerce', 5500000, 12, '=C{r}/D{r}', 8000000, 'Moyen compte'],
            ['PME Gamma', 'Industrie', 2800000, 6, '=C{r}/D{r}', 4000000, 'Petit compte'],
            ['Cabinet Delta', 'Services', 800000, 4, '=C{r}/D{r}', 1500000, 'Prospect à développer'],
            ['Groupe Epsilon', 'Distribution', 25000000, 48, '=C{r}/D{r}', 35000000, 'Stratégique'],
          ],
          totalsRow: true,
          colWidths: [25, 18, 22, 18, 22, 24, 25],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  // 10. Gestion stock commercial
  {
    code: 'xl_com_stocks',
    name: 'Gestion stock commercial',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi du stock : entrées, sorties, stock disponible et alertes de réapprovisionnement',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'depot', label: 'Dépôt / Magasin', type: 'text', required: true },
      { name: 'date_inventaire', label: 'Date d\'inventaire', type: 'date', required: true },
      { name: 'responsable', label: 'Responsable stock', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Stocks',
          title: 'GESTION STOCK COMMERCIAL',
          colorHeader: COLOR,
          headers: ['Référence', 'Désignation', 'Stock Initial', 'Entrées', 'Sorties', 'Stock Disponible', 'Stock Alerte', 'Statut'],
          rows: [
            ['REF-A01', 'Produit Standard A', 150, 50, 80, '=C{r}+D{r}-E{r}', 30, 'OK'],
            ['REF-A02', 'Produit Premium B', 80, 20, 75, '=C{r}+D{r}-E{r}', 20, 'ALERTE'],
            ['REF-A03', 'Pièce détachée X', 500, 100, 420, '=C{r}+D{r}-E{r}', 100, 'ALERTE'],
            ['REF-A04', 'Emballage Standard', 1000, 500, 800, '=C{r}+D{r}-E{r}', 200, 'OK'],
            ['REF-A05', 'Accessoire Premium', 200, 30, 15, '=C{r}+D{r}-E{r}', 50, 'OK'],
          ],
          totalsRow: true,
          colWidths: [15, 30, 14, 12, 12, 20, 14, 15],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 11. Bon de commande fournisseur
  {
    code: 'xl_com_bon_commande',
    name: 'Bon de commande fournisseur',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Bon de commande fournisseur avec articles, quantités, prix unitaire et total',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'fournisseur', label: 'Nom du fournisseur', type: 'text', required: true },
      { name: 'numero_bc', label: 'Numéro bon de commande', type: 'text', required: true },
      { name: 'date_commande', label: 'Date de commande', type: 'date', required: true },
      { name: 'delai_livraison', label: 'Délai de livraison souhaité', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Bon Commande',
          title: 'BON DE COMMANDE FOURNISSEUR',
          colorHeader: COLOR,
          headers: ['Référence Art.', 'Désignation', 'Unité', 'Quantité', 'PU HT (FCFA)', 'Montant HT (FCFA)', 'TVA (%)', 'Montant TTC (FCFA)'],
          rows: [
            ['FRN-001', 'Matière première A', 'kg', 500, 2500, '=D{r}*E{r}', 18, '=F{r}*(1+G{r}/100)'],
            ['FRN-002', 'Composant B', 'Unité', 200, 8500, '=D{r}*E{r}', 18, '=F{r}*(1+G{r}/100)'],
            ['FRN-003', 'Emballage carton', 'Lot 100', 50, 15000, '=D{r}*E{r}', 18, '=F{r}*(1+G{r}/100)'],
            ['FRN-004', 'Consommable C', 'Unité', 1000, 500, '=D{r}*E{r}', 18, '=F{r}*(1+G{r}/100)'],
          ],
          totalsRow: true,
          colWidths: [16, 30, 10, 12, 18, 22, 10, 22],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // 12. Comparatif offres fournisseurs
  {
    code: 'xl_com_comparatif_offres',
    name: 'Comparatif offres fournisseurs',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Comparatif multi-critères des offres fournisseurs avec notation et score pondéré',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'objet_appel', label: 'Objet de l\'appel d\'offres', type: 'text', required: true },
      { name: 'date_analyse', label: 'Date d\'analyse', type: 'date', required: true },
      { name: 'responsable', label: 'Responsable achats', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Comparatif',
          title: 'COMPARATIF OFFRES FOURNISSEURS',
          colorHeader: COLOR,
          headers: ['Critère d\'évaluation', 'Pondération (%)', 'Fournisseur A (note/10)', 'Fournisseur B (note/10)', 'Fournisseur C (note/10)', 'Score A Pondéré', 'Score B Pondéré', 'Score C Pondéré'],
          rows: [
            ['Prix / Tarif', 30, 8, 7, 9, '=B{r}*C{r}/100', '=B{r}*D{r}/100', '=B{r}*E{r}/100'],
            ['Qualité produit', 25, 9, 8, 7, '=B{r}*C{r}/100', '=B{r}*D{r}/100', '=B{r}*E{r}/100'],
            ['Délai de livraison', 20, 7, 9, 8, '=B{r}*C{r}/100', '=B{r}*D{r}/100', '=B{r}*E{r}/100'],
            ['Service après-vente', 15, 8, 6, 9, '=B{r}*C{r}/100', '=B{r}*D{r}/100', '=B{r}*E{r}/100'],
            ['Solidité financière', 10, 9, 7, 6, '=B{r}*C{r}/100', '=B{r}*D{r}/100', '=B{r}*E{r}/100'],
          ],
          totalsRow: true,
          colWidths: [30, 16, 24, 24, 24, 18, 18, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  // 13. Prévisions ventes trimestrielles
  {
    code: 'xl_com_previsions',
    name: 'Prévisions ventes trimestrielles',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de prévisions des ventes par trimestre avec historique et projection',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'annee', label: 'Année de prévision', type: 'text', required: true },
      { name: 'methode', label: 'Méthode de prévision', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Prévisions',
          title: 'PRÉVISIONS VENTES TRIMESTRIELLES',
          colorHeader: COLOR,
          headers: ['Produit / Ligne', 'Réel T1 N-1', 'Réel T2 N-1', 'Réel T3 N-1', 'Réel T4 N-1', 'CA Annuel N-1', 'Croissance (%)', 'Projection Annuelle N'],
          rows: [
            ['Ligne Produit A', 1200000, 1500000, 1800000, 1400000, '=B{r}+C{r}+D{r}+E{r}', 10, '=F{r}*(1+G{r}/100)'],
            ['Ligne Produit B', 800000, 950000, 750000, 900000, '=B{r}+C{r}+D{r}+E{r}', 15, '=F{r}*(1+G{r}/100)'],
            ['Services', 2000000, 2200000, 1900000, 2500000, '=B{r}+C{r}+D{r}+E{r}', 8, '=F{r}*(1+G{r}/100)'],
            ['Exports', 500000, 600000, 700000, 550000, '=B{r}+C{r}+D{r}+E{r}', 20, '=F{r}*(1+G{r}/100)'],
          ],
          totalsRow: true,
          colWidths: [25, 16, 16, 16, 16, 18, 16, 26],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // 14. Enquête satisfaction clients
  {
    code: 'xl_com_satisfaction',
    name: 'Enquête satisfaction clients',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Grille d\'analyse de satisfaction clients avec critères, notes et calcul du NPS',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'periode', label: 'Période d\'enquête', type: 'text', required: true },
      { name: 'nb_repondants', label: 'Nombre de répondants', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Satisfaction',
          title: 'ENQUÊTE SATISFACTION CLIENTS',
          colorHeader: COLOR,
          headers: ['Critère d\'évaluation', 'Note Moy. /10', 'Nb Promoteurs', 'Nb Neutres', 'Nb Détracteurs', '% Promoteurs', '% Détracteurs', 'NPS'],
          rows: [
            ['Qualité des produits', 8.2, 45, 30, 10, '=C{r}/(C{r}+D{r}+E{r})*100', '=E{r}/(C{r}+D{r}+E{r})*100', '=F{r}-G{r}'],
            ['Rapidité de livraison', 7.5, 35, 35, 15, '=C{r}/(C{r}+D{r}+E{r})*100', '=E{r}/(C{r}+D{r}+E{r})*100', '=F{r}-G{r}'],
            ['Service client', 8.8, 55, 20, 5, '=C{r}/(C{r}+D{r}+E{r})*100', '=E{r}/(C{r}+D{r}+E{r})*100', '=F{r}-G{r}'],
            ['Rapport qualité/prix', 7.2, 30, 40, 15, '=C{r}/(C{r}+D{r}+E{r})*100', '=E{r}/(C{r}+D{r}+E{r})*100', '=F{r}-G{r}'],
            ['Facilité de commande', 9.0, 60, 18, 2, '=C{r}/(C{r}+D{r}+E{r})*100', '=E{r}/(C{r}+D{r}+E{r})*100', '=F{r}-G{r}'],
          ],
          totalsRow: true,
          colWidths: [30, 16, 16, 14, 18, 16, 18, 10],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 52,
  },

  // 15. KPIs commerciaux
  {
    code: 'xl_com_kpi',
    name: 'KPIs commerciaux',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Tableau de bord KPIs : taux de conversion, panier moyen, cycle de vente et performance',
    price: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'periode', label: 'Période d\'analyse', type: 'text', required: true },
      { name: 'equipe', label: 'Équipe commerciale', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'KPIs',
          title: 'KPIs COMMERCIAUX',
          colorHeader: COLOR,
          headers: ['Indicateur KPI', 'Valeur Période', 'Objectif', 'Écart', 'Taux Atteinte (%)', 'Tendance', 'Observation'],
          rows: [
            ['Taux de conversion (%)', 22, 25, '=B{r}-C{r}', '=B{r}/C{r}*100', 'Stable', 'Améliorer prospection'],
            ['Panier moyen (FCFA)', 185000, 200000, '=B{r}-C{r}', '=B{r}/C{r}*100', 'Hausse', 'Upselling en cours'],
            ['Cycle de vente (jours)', 18, 15, '=B{r}-C{r}', '=C{r}/B{r}*100', 'Hausse', 'Trop long — process à revoir'],
            ['Nb nouveaux clients', 12, 15, '=B{r}-C{r}', '=B{r}/C{r}*100', 'Stable', 'Prospection à intensifier'],
            ['Taux rétention clients (%)', 87, 90, '=B{r}-C{r}', '=B{r}/C{r}*100', 'Stable', 'Programme fidélité OK'],
          ],
          totalsRow: false,
          colWidths: [35, 18, 14, 12, 18, 14, 30],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 16. Plan tournée commerciale
  {
    code: 'xl_com_tournee',
    name: 'Plan tournée commerciale',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Organisation et suivi des tournées commerciales : visites, distances, coûts et résultats',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'commercial', label: 'Commercial', type: 'text', required: true },
      { name: 'semaine', label: 'Semaine / Période', type: 'text', required: true },
      { name: 'vehicule', label: 'Véhicule utilisé', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Tournée',
          title: 'PLAN TOURNÉE COMMERCIALE',
          colorHeader: COLOR,
          headers: ['Client / Prospect', 'Ville', 'Type Visite', 'Distance A/R (km)', 'Coût Carburant (FCFA)', 'CA Généré (FCFA)', 'Résultat'],
          rows: [
            ['Client Alpha', 'Abidjan Plateau', 'Suivi commande', 15, '=D{r}*150', 850000, 'Commande confirmée'],
            ['Prospect Beta', 'Yopougon', 'Prospection', 22, '=D{r}*150', 0, 'Devis demandé'],
            ['Client Gamma', 'Cocody', 'Présentation offre', 10, '=D{r}*150', 1200000, 'En négociation'],
            ['Client Delta', 'Marcory', 'Recouvrement', 18, '=D{r}*150', 0, 'Paiement partiel'],
            ['Prospect Epsilon', 'Abobo', 'Prospection', 30, '=D{r}*150', 0, 'À rappeler'],
          ],
          totalsRow: true,
          colWidths: [25, 18, 22, 18, 22, 22, 25],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  // 17. Budget animation commerciale
  {
    code: 'xl_com_animation',
    name: 'Budget animation commerciale',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Planification et suivi du budget d\'animation commerciale : actions, coûts et impact CA',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'periode', label: 'Période', type: 'text', required: true },
      { name: 'budget_total', label: 'Budget total alloué (FCFA)', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Animation',
          title: 'BUDGET ANIMATION COMMERCIALE',
          colorHeader: COLOR,
          headers: ['Action Commerciale', 'Type', 'Coût Prévu (FCFA)', 'Coût Réel (FCFA)', 'Écart (FCFA)', 'CA Impact Estimé (FCFA)', 'ROI (%)'],
          rows: [
            ['Salon professionnel', 'Événement', 500000, 520000, '=D{r}-C{r}', 3000000, '=F{r}/D{r}*100'],
            ['Campagne SMS/Email', 'Digital', 150000, 145000, '=D{r}-C{r}', 1200000, '=F{r}/D{r}*100'],
            ['PLV point de vente', 'Merchandising', 200000, 200000, '=D{r}-C{r}', 800000, '=F{r}/D{r}*100'],
            ['Formation réseau', 'Formation', 100000, 95000, '=D{r}-C{r}', 1500000, '=F{r}/D{r}*100'],
            ['Opération promo flash', 'Promotion', 80000, 90000, '=D{r}-C{r}', 600000, '=F{r}/D{r}*100'],
          ],
          totalsRow: true,
          colWidths: [28, 18, 22, 20, 16, 25, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  // 18. Grille de remises commerciales
  {
    code: 'xl_com_remises',
    name: 'Grille de remises commerciales',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Grille tarifaire de remises par tranche de CA, segment client et conditions',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année de validité', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable commercial', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Remises',
          title: 'GRILLE DE REMISES COMMERCIALES',
          colorHeader: COLOR,
          headers: ['Tranche CA Annuel (FCFA)', 'Segment Client', 'Remise Prod. A (%)', 'Remise Prod. B (%)', 'Remise Services (%)', 'Remise Max Autorisée (%)', 'Conditions Particulières'],
          rows: [
            ['0 - 1 000 000', 'Petit', 0, 0, 0, 5, 'Paiement comptant uniquement'],
            ['1 000 001 - 5 000 000', 'Standard', 3, 2, 2, 10, '30 jours net'],
            ['5 000 001 - 15 000 000', 'Privilège', 5, 4, 4, 15, '45 jours — escompte 2%'],
            ['15 000 001 - 50 000 000', 'Gold', 8, 7, 6, 20, '60 jours — conditions négociables'],
            ['> 50 000 000', 'Stratégique', 12, 10, 8, 25, 'Contrat cadre annuel obligatoire'],
          ],
          totalsRow: false,
          colWidths: [28, 16, 18, 18, 18, 22, 35],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  // 19. Plan de recouvrement créances
  {
    code: 'xl_com_recouvrement',
    name: 'Plan de recouvrement créances',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi et plan d\'action pour le recouvrement des créances : débiteurs, montants et échéances',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'responsable', label: 'Responsable recouvrement', type: 'text', required: true },
      { name: 'date_arrete', label: 'Date d\'arrêté', type: 'date', required: true },
      { name: 'objectif_mensuel', label: 'Objectif recouvrement mensuel (FCFA)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Recouvrement',
          title: 'PLAN DE RECOUVREMENT CRÉANCES',
          colorHeader: COLOR,
          headers: ['Débiteur', 'Montant Dû (FCFA)', 'Ancienneté (jours)', 'Provision (%)', 'Provision (FCFA)', 'Plan Remboursement', 'Date Engagement'],
          rows: [
            ['Débiteur Alpha', 2500000, 90, 20, '=B{r}*D{r}/100', 'Mensualités 500 000', '2024-02-01'],
            ['Débiteur Beta', 800000, 45, 10, '=B{r}*D{r}/100', 'Paiement total sous 30j', '2024-02-15'],
            ['Débiteur Gamma', 5000000, 180, 50, '=B{r}*D{r}/100', 'Protocole judiciaire', '—'],
            ['Débiteur Delta', 350000, 30, 5, '=B{r}*D{r}/100', 'Relance simple', '2024-02-28'],
            ['Débiteur Epsilon', 1200000, 120, 30, '=B{r}*D{r}/100', 'Mensualités 200 000', '2024-03-01'],
          ],
          totalsRow: true,
          colWidths: [25, 22, 18, 14, 20, 28, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  // 20. Rapport commercial mensuel
  {
    code: 'xl_com_rapport_mensuel',
    name: 'Rapport commercial mensuel',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Rapport de synthèse mensuelle : CA, tendances, actions commerciales et perspectives',
    price: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'mois_annee', label: 'Mois / Année', type: 'text', required: true },
      { name: 'directeur_commercial', label: 'Directeur commercial', type: 'text', required: true },
      { name: 'zone', label: 'Zone / Région', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Synthèse',
          title: 'RAPPORT COMMERCIAL MENSUEL — SYNTHÈSE',
          colorHeader: COLOR,
          headers: ['Indicateur', 'Mois N-1 (FCFA)', 'Mois N (FCFA)', 'Évolution (FCFA)', 'Évolution (%)', 'Objectif', 'Taux vs Objectif (%)'],
          rows: [
            ['CA Total', 18500000, 21000000, '=C{r}-B{r}', '=(C{r}-B{r})/B{r}*100', 20000000, '=C{r}/F{r}*100'],
            ['CA Nouveaux clients', 2500000, 3200000, '=C{r}-B{r}', '=(C{r}-B{r})/B{r}*100', 3000000, '=C{r}/F{r}*100'],
            ['CA Clients existants', 16000000, 17800000, '=C{r}-B{r}', '=(C{r}-B{r})/B{r}*100', 17000000, '=C{r}/F{r}*100'],
            ['Marge brute', 6500000, 7400000, '=C{r}-B{r}', '=(C{r}-B{r})/B{r}*100', 7000000, '=C{r}/F{r}*100'],
            ['Nb commandes', 125, 142, '=C{r}-B{r}', '=(C{r}-B{r})/B{r}*100', 135, '=C{r}/F{r}*100'],
          ],
          totalsRow: true,
          colWidths: [28, 20, 20, 18, 16, 18, 22],
        },
        {
          name: 'Actions',
          title: 'ACTIONS COMMERCIALES DU MOIS',
          colorHeader: COLOR,
          headers: ['Action', 'Responsable', 'Statut', 'Impact CA (FCFA)', 'Date Réalisation', 'Prochaine Action'],
          rows: [
            ['Campagne relance clients inactifs', 'Commercial 1', 'Terminé', 1500000, '2024-01-15', 'Suivi J+30'],
            ['Négociation contrat cadre Groupe X', 'Dir. Commercial', 'En cours', 8000000, '—', 'Réunion 2024-02-05'],
            ['Formation équipe nouvelles offres', 'Manager', 'Planifié', 0, '2024-02-10', 'Lancer la formation'],
            ['Salon professionnel régional', 'Équipe', 'Planifié', 2000000, '2024-02-20', 'Préparer stands'],
          ],
          totalsRow: false,
          colWidths: [38, 20, 15, 22, 20, 28],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 78,
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
  console.log(`✅ Excel Commercial: ${created} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
