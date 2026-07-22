import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let created = 0, updated = 0;

  const templates: any[] = [
    // entr_xl_001 — Business plan synthétique 3 ans
    {
      code: 'entr_xl_001',
      name: 'Business Plan Synthétique 3 ans',
      description: 'Résumé financier sur 3 ans : CA, charges et résultat net avec TCAM automatique.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 9000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
        { name: 'annee', label: 'Année de départ', type: 'text', required: true },
        { name: 'ca_an1', label: 'CA Année 1 (XOF)', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'Business Plan',
          title: '{{nom_entreprise}} — Business Plan {{annee}}',
          colorHeader: 'E65100',
          headers: ['Poste', 'Année 1', 'Année 2', 'Année 3', 'TCAM'],
          rows: [
            ["Chiffre d'affaires", '{{ca_an1}}', '={{ca_an1}}*1.2', '={{ca_an1}}*1.44', '=((D{r}/B{r})^(1/2)-1)*100&"%"'],
            ['Charges opérationnelles', '={{ca_an1}}*0.6', '={{ca_an1}}*0.7', '={{ca_an1}}*0.8', ''],
            ['Résultat net', '=B{r}-B{r-1}', '=C{r}-C{r-1}', '=D{r}-D{r-1}', ''],
          ],
          totalsRow: false,
          colWidths: [30, 14, 14, 14, 14],
        }],
      }),
    },

    // entr_xl_002 — Étude de marché (analyse concurrents, segments)
    {
      code: 'entr_xl_002',
      name: 'Étude de Marché — Concurrents & Segments',
      description: 'Grille comparative des concurrents et segmentation du marché cible.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 7500,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'marche', label: 'Nom du marché / secteur', type: 'text', required: true },
        { name: 'annee', label: 'Année de référence', type: 'text', required: true },
        { name: 'segment_principal', label: 'Segment principal ciblé', type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'Étude de Marché',
          title: '{{marche}} — Étude de Marché {{annee}}',
          colorHeader: '1565C0',
          headers: ['Concurrent', 'Part de marché (%)', 'Prix moyen', 'Points forts', 'Score /10'],
          rows: [
            ['Concurrent A', '{{part_a}}', '{{prix_a}}', 'Notoriété forte', '7'],
            ['Concurrent B', '{{part_b}}', '{{prix_b}}', 'Prix bas', '6'],
            ['Notre offre ({{segment_principal}})', '', '', '', ''],
          ],
          totalsRow: false,
          colWidths: [28, 18, 14, 28, 10],
        }],
      }),
    },

    // entr_xl_003 — Calcul besoin en fonds de roulement (BFR)
    {
      code: 'entr_xl_003',
      name: 'Calcul Besoin en Fonds de Roulement (BFR)',
      description: 'Tableau de calcul du BFR : stocks, créances clients et dettes fournisseurs.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 6000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
        { name: 'ca_annuel', label: 'CA annuel prévisionnel (XOF)', type: 'text', required: true },
        { name: 'date_calcul', label: 'Date de calcul', type: 'date', required: false },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'BFR',
          title: '{{nom_entreprise}} — Calcul BFR',
          colorHeader: '2E7D32',
          headers: ['Poste', 'Jours', 'Montant (XOF)', 'Formule'],
          rows: [
            ['Stock (actif circulant)', '30', '={{ca_annuel}}/365*30', 'CA/365 × jours stock'],
            ['Créances clients (actif)', '45', '={{ca_annuel}}/365*45', 'CA/365 × délai client'],
            ['Dettes fournisseurs (passif)', '60', '={{ca_annuel}}/365*60', 'CA/365 × délai fourn.'],
          ],
          totalsRow: true,
          colWidths: [30, 10, 20, 30],
        }],
      }),
    },

    // entr_xl_004 — Plan de financement startup
    {
      code: 'entr_xl_004',
      name: 'Plan de Financement Startup',
      description: 'Tableau emplois-ressources pour le financement initial de la startup.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 8500,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
        { name: 'montant_total', label: 'Montant total à financer (XOF)', type: 'text', required: true },
        { name: 'annee', label: 'Année de création', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'Plan Financement',
          title: '{{nom_startup}} — Plan de Financement {{annee}}',
          colorHeader: '6A1B9A',
          headers: ['Source / Emploi', 'Montant (XOF)', '% du total', 'Statut'],
          rows: [
            ['Apport fondateurs (RESSOURCES)', '{{apport_fondateurs}}', '=B{r}/{{montant_total}}*100&"%"', 'Confirmé'],
            ['Emprunt bancaire (RESSOURCES)', '{{emprunt}}', '=B{r}/{{montant_total}}*100&"%"', 'En cours'],
            ['Investissements (EMPLOIS)', '{{investissements}}', '=B{r}/{{montant_total}}*100&"%"', 'Prévu'],
          ],
          totalsRow: true,
          colWidths: [35, 18, 14, 14],
        }],
      }),
    },

    // entr_xl_005 — Tableau de bord startup KPI (MRR, churn, CAC)
    {
      code: 'entr_xl_005',
      name: 'Tableau de Bord Startup KPI',
      description: 'Suivi mensuel des KPI clés : MRR, churn rate, CAC et LTV.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 12000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
        { name: 'mois', label: 'Mois de référence (ex: Janvier 2025)', type: 'text', required: true },
        { name: 'mrr_debut', label: 'MRR début de mois (XOF)', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'KPI Dashboard',
          title: '{{nom_startup}} — KPIs {{mois}}',
          colorHeader: 'BF360C',
          headers: ['KPI', 'Valeur', 'Cible', 'Écart', 'Tendance'],
          rows: [
            ['MRR (Monthly Recurring Revenue)', '{{mrr_debut}}', '{{mrr_cible}}', '=B{r}-C{r}', '↗'],
            ['Churn Rate (%)', '{{churn}}', '5', '=B{r}-C{r}', ''],
            ['CAC (Coût Acquisition Client)', '{{cac}}', '{{cac_cible}}', '=B{r}-C{r}', ''],
          ],
          totalsRow: false,
          colWidths: [32, 16, 14, 12, 12],
        }],
      }),
    },

    // entr_xl_006 — Prévision de ventes (mensuelle)
    {
      code: 'entr_xl_006',
      name: 'Prévision de Ventes Mensuelle',
      description: 'Tableau de prévision des ventes mois par mois avec cumul et taux de réalisation.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 7000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
        { name: 'annee', label: 'Année', type: 'text', required: true },
        { name: 'objectif_annuel', label: 'Objectif annuel (XOF)', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'Prévision Ventes',
          title: '{{nom_entreprise}} — Prévision Ventes {{annee}}',
          colorHeader: '00695C',
          headers: ['Mois', 'Objectif (XOF)', 'Réalisé (XOF)', 'Taux (%)', 'Cumul (XOF)'],
          rows: [
            ['Janvier', '={{objectif_annuel}}/12', '{{realise_jan}}', '=C{r}/B{r}*100&"%"', '=C{r}'],
            ['Février', '={{objectif_annuel}}/12', '{{realise_fev}}', '=C{r}/B{r}*100&"%"', '=E{r-1}+C{r}'],
            ['Mars', '={{objectif_annuel}}/12', '{{realise_mar}}', '=C{r}/B{r}*100&"%"', '=E{r-1}+C{r}'],
          ],
          totalsRow: true,
          colWidths: [14, 18, 18, 12, 18],
        }],
      }),
    },

    // entr_xl_007 — Calcul prix de revient produit/service
    {
      code: 'entr_xl_007',
      name: 'Calcul Prix de Revient Produit/Service',
      description: 'Décomposition du coût de revient et calcul du prix de vente avec marge.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 5500,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'produit', label: 'Nom du produit / service', type: 'text', required: true },
        { name: 'quantite', label: 'Quantité produite', type: 'text', required: true },
        { name: 'marge_cible', label: 'Marge cible (%)', type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'Prix de Revient',
          title: '{{produit}} — Calcul Prix de Revient',
          colorHeader: '4527A0',
          headers: ['Composante coût', 'Montant unitaire (XOF)', '% du total', 'Notes'],
          rows: [
            ['Matières premières', '{{cout_matieres}}', '=B{r}/B5*100&"%"', 'Coût direct'],
            ['Main-d\'œuvre directe', '{{cout_mo}}', '=B{r}/B5*100&"%"', 'Heures × taux'],
            ['Frais généraux alloués', '{{frais_generaux}}', '=B{r}/B5*100&"%"', 'Indirect'],
          ],
          totalsRow: true,
          colWidths: [30, 22, 14, 22],
        }],
      }),
    },

    // entr_xl_008 — Analyse SWOT quantifiée
    {
      code: 'entr_xl_008',
      name: 'Analyse SWOT Quantifiée',
      description: 'Matrice SWOT avec pondération et score stratégique pour chaque facteur.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 6500,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
        { name: 'secteur', label: 'Secteur d\'activité', type: 'text', required: true },
        { name: 'date_analyse', label: "Date de l'analyse", type: 'date', required: false },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'SWOT',
          title: '{{nom_entreprise}} ({{secteur}}) — Analyse SWOT',
          colorHeader: 'E65100',
          headers: ['Facteur', 'Catégorie', 'Poids (1-5)', 'Score (1-5)', 'Score pondéré'],
          rows: [
            ['Expertise technique', 'Force', '4', '5', '=C{r}*D{r}'],
            ['Faible notoriété', 'Faiblesse', '3', '3', '=C{r}*D{r}'],
            ['Croissance du marché', 'Opportunité', '5', '4', '=C{r}*D{r}'],
          ],
          totalsRow: false,
          colWidths: [30, 14, 14, 14, 16],
        }],
      }),
    },

    // entr_xl_009 — Suivi levée de fonds (cap table simplifié)
    {
      code: 'entr_xl_009',
      name: 'Suivi Levée de Fonds — Cap Table Simplifié',
      description: 'Tableau de capitalisation : actionnaires, parts et valorisation post-money.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 15000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
        { name: 'valorisation_pre', label: 'Valorisation pré-money (XOF)', type: 'text', required: true },
        { name: 'montant_leve', label: 'Montant levé (XOF)', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'Cap Table',
          title: '{{nom_startup}} — Cap Table',
          colorHeader: '0D47A1',
          headers: ['Actionnaire', 'Actions', '% avant levée', '% après levée', 'Valeur parts (XOF)'],
          rows: [
            ['Fondateur 1', '{{actions_f1}}', '=B{r}/B5*100&"%"', '', '=B{r}/(B5+{{montant_leve}}/{{valorisation_pre}}*B5)*{{valorisation_pre}}'],
            ['Fondateur 2', '{{actions_f2}}', '=B{r}/B5*100&"%"', '', ''],
            ['Investisseur A', '{{actions_inv}}', '0%', '=B{r}/(B5+B{r})*100&"%"', '{{montant_leve}}'],
          ],
          totalsRow: true,
          colWidths: [24, 12, 16, 16, 22],
        }],
      }),
    },

    // entr_xl_010 — Plan de lancement produit (go-to-market)
    {
      code: 'entr_xl_010',
      name: 'Plan de Lancement Produit — Go-to-Market',
      description: 'Tableau de suivi des actions go-to-market avec budget, responsable et statut.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 8000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'produit', label: 'Nom du produit', type: 'text', required: true },
        { name: 'date_lancement', label: 'Date de lancement prévue', type: 'date', required: true },
        { name: 'budget_total', label: 'Budget marketing total (XOF)', type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'Go-to-Market',
          title: '{{produit}} — Plan de Lancement {{date_lancement}}',
          colorHeader: '00838F',
          headers: ['Action', 'Canal', 'Budget (XOF)', 'Responsable', 'Statut'],
          rows: [
            ['Campagne réseaux sociaux', 'Social Media', '{{budget_social}}', '{{resp_marketing}}', 'Planifié'],
            ['Relations presse / influenceurs', 'PR', '{{budget_pr}}', '{{resp_comm}}', 'Planifié'],
            ['Événement de lancement', 'Événementiel', '={{budget_total}}*0.3', '{{resp_event}}', 'À confirmer'],
          ],
          totalsRow: true,
          colWidths: [30, 18, 16, 20, 14],
        }],
      }),
    },

    // entr_xl_011 — Simulation résultat selon hypothèses CA
    {
      code: 'entr_xl_011',
      name: 'Simulation Résultat selon Hypothèses CA',
      description: 'Scénarios pessimiste, réaliste et optimiste du résultat net selon le CA.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 10000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
        { name: 'ca_base', label: 'CA de référence (XOF)', type: 'text', required: true },
        { name: 'annee', label: 'Année simulée', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'Simulation CA',
          title: '{{nom_entreprise}} — Simulation Résultat {{annee}}',
          colorHeader: 'AD1457',
          headers: ['Scénario', 'CA (XOF)', 'Charges (XOF)', 'Résultat net (XOF)', 'Marge nette (%)'],
          rows: [
            ['Pessimiste (−20%)', '={{ca_base}}*0.8', '={{ca_base}}*0.75', '=B{r}-C{r}', '=D{r}/B{r}*100&"%"'],
            ['Réaliste (base)', '{{ca_base}}', '={{ca_base}}*0.7', '=B{r}-C{r}', '=D{r}/B{r}*100&"%"'],
            ['Optimiste (+25%)', '={{ca_base}}*1.25', '={{ca_base}}*0.65', '=B{r}-C{r}', '=D{r}/B{r}*100&"%"'],
          ],
          totalsRow: false,
          colWidths: [24, 18, 18, 20, 16],
        }],
      }),
    },

    // entr_xl_012 — Tableau de bord e-commerce (commandes, CA, panier moyen)
    {
      code: 'entr_xl_012',
      name: 'Tableau de Bord E-commerce',
      description: 'Suivi mensuel des performances e-commerce : commandes, CA et panier moyen.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 11000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'boutique', label: 'Nom de la boutique', type: 'text', required: true },
        { name: 'mois', label: 'Mois de référence', type: 'text', required: true },
        { name: 'nb_commandes', label: 'Nombre de commandes', type: 'text', required: true },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'E-commerce Dashboard',
          title: '{{boutique}} — Tableau de Bord {{mois}}',
          colorHeader: 'F57F17',
          headers: ['Indicateur', 'Valeur', 'Mois précédent', 'Évolution (%)', 'Objectif'],
          rows: [
            ['Nombre de commandes', '{{nb_commandes}}', '{{cmd_prec}}', '=(B{r}-C{r})/C{r}*100&"%"', '{{obj_cmd}}'],
            ["Chiffre d'affaires (XOF)", '{{ca_mois}}', '{{ca_prec}}', '=(B{r}-C{r})/C{r}*100&"%"', '{{obj_ca}}'],
            ['Panier moyen (XOF)', '={{ca_mois}}/{{nb_commandes}}', '', '', ''],
          ],
          totalsRow: false,
          colWidths: [28, 16, 18, 16, 14],
        }],
      }),
    },

    // entr_xl_013 — Calcul valorisation startup (méthodes DCF, comparables)
    {
      code: 'entr_xl_013',
      name: 'Calcul Valorisation Startup (DCF & Comparables)',
      description: 'Estimation de la valorisation par les méthodes DCF et multiples comparables.',
      category: 'entrepreneuriat',
      templateType: 'excel',
      price: 18000,
      currency: 'XOF',
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_startup', label: 'Nom de la startup', type: 'text', required: true },
        { name: 'ca_actuel', label: 'CA actuel (XOF)', type: 'text', required: true },
        { name: 'taux_actualisation', label: "Taux d'actualisation (%)", type: 'text', required: false },
      ]),
      body: JSON.stringify({
        sheets: [{
          name: 'Valorisation',
          title: '{{nom_startup}} — Valorisation Startup',
          colorHeader: '1A237E',
          headers: ['Méthode', 'Hypothèse clé', 'Valorisation (XOF)', 'Pondération (%)', 'Valeur pondérée (XOF)'],
          rows: [
            ['DCF (flux actualisés)', 'Taux = {{taux_actualisation}}%', '={{ca_actuel}}*8', '50', '=C{r}*D{r}/100'],
            ['Multiples comparables (x CA)', 'Multiple = 5×', '={{ca_actuel}}*5', '30', '=C{r}*D{r}/100'],
            ['Berkus / actifs immatériels', 'Stade early-stage', '={{ca_actuel}}*3', '20', '=C{r}*D{r}/100'],
          ],
          totalsRow: true,
          colWidths: [28, 24, 22, 16, 22],
        }],
      }),
    },
  ];

  for (const t of templates) {
    const r = await prisma.documentTemplate.upsert({
      where: { code: t.code },
      update: t,
      create: t,
    });
    if (r.createdAt.getTime() === r.updatedAt.getTime()) created++;
    else updated++;
  }

  console.log(`Excel Entrepreneuriat A OK — créés:${created} mis-à-jour:${updated}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
