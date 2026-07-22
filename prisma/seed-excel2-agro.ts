import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let created = 0, updated = 0;

  const templates = [
    // ─── 1. Suivi stock agricole ───────────────────────────────────────────────
    {
      code: 'agro_xl_001',
      name: 'Suivi Stock Agricole',
      description: 'Suivi des stocks de récoltes, semences et intrants agricoles par campagne.',
      category: 'agro_environnement',
      templateType: 'excel',
      price: 4500,
      active: true,
      fieldsJson: JSON.stringify([
        { key: 'nom_exploitation', label: "Nom de l'exploitation", type: 'text' },
        { key: 'campagne',        label: 'Campagne agricole',       type: 'text' },
        { key: 'stock_cacao',     label: 'Stock initial cacao (kg)', type: 'text' },
        { key: 'entrees_cacao',   label: 'Entrées cacao (kg)',       type: 'text' },
        { key: 'sorties_cacao',   label: 'Sorties cacao (kg)',       type: 'text' },
        { key: 'stock_cafe',      label: 'Stock initial café (kg)',  type: 'text' },
        { key: 'entrees_cafe',    label: 'Entrées café (kg)',        type: 'text' },
        { key: 'sorties_cafe',    label: 'Sorties café (kg)',        type: 'text' },
        { key: 'stock_semences',  label: 'Stock semences (kg)',      type: 'text' },
        { key: 'stock_engrais',   label: 'Stock engrais (kg)',       type: 'text' },
        { key: 'date_inventaire', label: "Date d'inventaire",        type: 'date' },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Stock',
            title: '{{nom_exploitation}} — {{campagne}}',
            colorHeader: '2E7D32',
            headers: ['Produit', 'Stock initial', 'Entrées', 'Sorties', 'Stock final', 'Valeur (FCFA)'],
            rows: [
              ['Cacao',    '{{stock_cacao}}',    '{{entrees_cacao}}',   '{{sorties_cacao}}',   '=B{r}+C{r}-D{r}', '=E{r}*500'],
              ['Café',     '{{stock_cafe}}',     '{{entrees_cafe}}',    '{{sorties_cafe}}',    '=B{r}+C{r}-D{r}', '=E{r}*800'],
              ['Semences', '{{stock_semences}}', '0',                   '0',                   '=B{r}+C{r}-D{r}', '=E{r}*200'],
              ['Engrais',  '{{stock_engrais}}',  '0',                   '0',                   '=B{r}+C{r}-D{r}', '=E{r}*350'],
            ],
            totalsRow: true,
            colWidths: [28, 14, 12, 12, 14, 18],
          },
        ],
      }),
    },

    // ─── 2. Plan de campagne agricole (budget) ────────────────────────────────
    {
      code: 'agro_xl_002',
      name: 'Plan de Campagne Agricole',
      description: 'Budget prévisionnel et suivi des charges et recettes par campagne agricole.',
      category: 'agro_environnement',
      templateType: 'excel',
      price: 6000,
      active: true,
      fieldsJson: JSON.stringify([
        { key: 'nom_exploitation',   label: "Nom de l'exploitation",       type: 'text' },
        { key: 'campagne',           label: 'Campagne',                    type: 'text' },
        { key: 'superficie_ha',      label: 'Superficie totale (ha)',       type: 'text' },
        { key: 'culture_principale', label: 'Culture principale',           type: 'text' },
        { key: 'budget_semences',    label: 'Budget semences (FCFA)',       type: 'text' },
        { key: 'budget_engrais',     label: 'Budget engrais (FCFA)',        type: 'text' },
        { key: 'budget_main_oeuvre', label: "Budget main d'œuvre (FCFA)",  type: 'text' },
        { key: 'budget_materiel',    label: 'Budget matériel (FCFA)',       type: 'text' },
        { key: 'recette_prevue',     label: 'Recette prévisionnelle (FCFA)', type: 'text' },
        { key: 'date_debut',         label: 'Date début campagne',          type: 'date' },
        { key: 'date_fin',           label: 'Date fin campagne',            type: 'date' },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Budget Campagne',
            title: 'Plan de campagne — {{nom_exploitation}} ({{campagne}})',
            colorHeader: '388E3C',
            headers: ['Poste de charge', 'Montant prévu (FCFA)', 'Montant réel (FCFA)', 'Écart (FCFA)', 'Écart (%)'],
            rows: [
              ['Semences',        '{{budget_semences}}',    '0', '=B{r}-C{r}', '=IF(B{r}=0,0,(D{r}/B{r})*100)'],
              ['Engrais',         '{{budget_engrais}}',     '0', '=B{r}-C{r}', '=IF(B{r}=0,0,(D{r}/B{r})*100)'],
              ["Main d'œuvre",    '{{budget_main_oeuvre}}', '0', '=B{r}-C{r}', '=IF(B{r}=0,0,(D{r}/B{r})*100)'],
              ['Matériel/Outils', '{{budget_materiel}}',    '0', '=B{r}-C{r}', '=IF(B{r}=0,0,(D{r}/B{r})*100)'],
              ['Recette prévue',  '{{recette_prevue}}',     '0', '=B{r}-C{r}', '=IF(B{r}=0,0,(D{r}/B{r})*100)'],
            ],
            totalsRow: true,
            colWidths: [30, 22, 22, 16, 12],
          },
        ],
      }),
    },

    // ─── 3. Tableau de bord coopérative agricole ──────────────────────────────
    {
      code: 'agro_xl_003',
      name: 'Tableau de Bord Coopérative Agricole',
      description: 'Indicateurs clés de gestion pour une coopérative agricole (membres, production, ventes).',
      category: 'agro_environnement',
      templateType: 'excel',
      price: 9000,
      active: true,
      fieldsJson: JSON.stringify([
        { key: 'nom_cooperative',    label: 'Nom de la coopérative',       type: 'text' },
        { key: 'region',             label: 'Région',                       type: 'text' },
        { key: 'campagne',           label: 'Campagne',                     type: 'text' },
        { key: 'nombre_membres',     label: 'Nombre de membres',            type: 'text' },
        { key: 'superficie_totale',  label: 'Superficie totale (ha)',        type: 'text' },
        { key: 'production_cacao',   label: 'Production cacao (T)',          type: 'text' },
        { key: 'production_cafe',    label: 'Production café (T)',           type: 'text' },
        { key: 'ventes_totales',     label: 'Ventes totales (FCFA)',         type: 'text' },
        { key: 'charges_totales',    label: 'Charges totales (FCFA)',        type: 'text' },
        { key: 'date_rapport',       label: 'Date du rapport',              type: 'date' },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Tableau de Bord',
            title: '{{nom_cooperative}} — Tableau de bord {{campagne}}',
            colorHeader: '1B5E20',
            headers: ['Indicateur', 'Valeur', 'Unité', 'Objectif', 'Taux atteinte (%)'],
            rows: [
              ['Nombre de membres',      '{{nombre_membres}}',    'membres', '0', '=IF(D{r}=0,0,(B{r}/D{r})*100)'],
              ['Superficie cultivée',    '{{superficie_totale}}', 'ha',      '0', '=IF(D{r}=0,0,(B{r}/D{r})*100)'],
              ['Production cacao',       '{{production_cacao}}',  'T',       '0', '=IF(D{r}=0,0,(B{r}/D{r})*100)'],
              ['Production café',        '{{production_cafe}}',   'T',       '0', '=IF(D{r}=0,0,(B{r}/D{r})*100)'],
              ['Ventes totales',         '{{ventes_totales}}',    'FCFA',    '0', '=IF(D{r}=0,0,(B{r}/D{r})*100)'],
              ['Charges totales',        '{{charges_totales}}',   'FCFA',    '0', '=IF(D{r}=0,0,(B{r}/D{r})*100)'],
              ['Résultat net',           '=B5-B6',                'FCFA',    '0', '=IF(D{r}=0,0,(B{r}/D{r})*100)'],
            ],
            totalsRow: false,
            colWidths: [30, 18, 12, 16, 20],
          },
        ],
      }),
    },

    // ─── 4. Suivi bétail ──────────────────────────────────────────────────────
    {
      code: 'agro_xl_004',
      name: 'Suivi Bétail — Inventaire, Croissance et Ventes',
      description: "Suivi de l'inventaire du bétail, de la croissance et des ventes par espèce.",
      category: 'agro_environnement',
      templateType: 'excel',
      price: 5500,
      active: true,
      fieldsJson: JSON.stringify([
        { key: 'nom_elevage',      label: "Nom de l'élevage",          type: 'text' },
        { key: 'proprietaire',     label: 'Propriétaire',               type: 'text' },
        { key: 'periode',          label: 'Période de suivi',           type: 'text' },
        { key: 'nb_bovins',        label: 'Nombre bovins',              type: 'text' },
        { key: 'nb_ovins',         label: 'Nombre ovins',               type: 'text' },
        { key: 'nb_caprins',       label: 'Nombre caprins',             type: 'text' },
        { key: 'nb_porcins',       label: 'Nombre porcins',             type: 'text' },
        { key: 'nb_volailles',     label: 'Nombre volailles',           type: 'text' },
        { key: 'ventes_periode',   label: 'Ventes sur la période (FCFA)', type: 'text' },
        { key: 'date_inventaire',  label: "Date d'inventaire",          type: 'date' },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Inventaire Bétail',
            title: '{{nom_elevage}} — Suivi bétail {{periode}}',
            colorHeader: '4CAF50',
            headers: ['Espèce', 'Effectif début', 'Naissances', 'Achats', 'Décès', 'Ventes', 'Effectif fin', 'Valeur unitaire (FCFA)', 'Valeur totale (FCFA)'],
            rows: [
              ['Bovins',    '{{nb_bovins}}',    '0', '0', '0', '0', '=B{r}+C{r}+D{r}-E{r}-F{r}', '150000', '=G{r}*H{r}'],
              ['Ovins',     '{{nb_ovins}}',     '0', '0', '0', '0', '=B{r}+C{r}+D{r}-E{r}-F{r}', '35000',  '=G{r}*H{r}'],
              ['Caprins',   '{{nb_caprins}}',   '0', '0', '0', '0', '=B{r}+C{r}+D{r}-E{r}-F{r}', '25000',  '=G{r}*H{r}'],
              ['Porcins',   '{{nb_porcins}}',   '0', '0', '0', '0', '=B{r}+C{r}+D{r}-E{r}-F{r}', '45000',  '=G{r}*H{r}'],
              ['Volailles', '{{nb_volailles}}', '0', '0', '0', '0', '=B{r}+C{r}+D{r}-E{r}-F{r}', '3500',   '=G{r}*H{r}'],
            ],
            totalsRow: true,
            colWidths: [14, 14, 12, 10, 10, 10, 14, 22, 20],
          },
        ],
      }),
    },

    // ─── 5. Budget exploitation agricole annuel ───────────────────────────────
    {
      code: 'agro_xl_005',
      name: "Budget Exploitation Agricole Annuel",
      description: "Budget annuel complet d'une exploitation agricole : charges, recettes et résultat.",
      category: 'agro_environnement',
      templateType: 'excel',
      price: 7500,
      active: true,
      fieldsJson: JSON.stringify([
        { key: 'nom_exploitation',  label: "Nom de l'exploitation",     type: 'text' },
        { key: 'annee',             label: 'Année',                      type: 'text' },
        { key: 'exploitant',        label: "Nom de l'exploitant",        type: 'text' },
        { key: 'superficie_ha',     label: 'Superficie (ha)',             type: 'text' },
        { key: 'charges_foncier',   label: 'Charges foncières (FCFA)',   type: 'text' },
        { key: 'charges_intrants',  label: 'Charges intrants (FCFA)',    type: 'text' },
        { key: 'charges_mdo',       label: "Charges main-d'œuvre (FCFA)", type: 'text' },
        { key: 'charges_materiel',  label: 'Charges matériel (FCFA)',    type: 'text' },
        { key: 'charges_transport', label: 'Charges transport (FCFA)',   type: 'text' },
        { key: 'recettes_cacao',    label: 'Recettes cacao (FCFA)',      type: 'text' },
        { key: 'recettes_cafe',     label: 'Recettes café (FCFA)',       type: 'text' },
        { key: 'recettes_autres',   label: 'Autres recettes (FCFA)',     type: 'text' },
        { key: 'date_bilan',        label: 'Date du bilan',              type: 'date' },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Budget Annuel',
            title: "Budget {{annee}} — {{nom_exploitation}}",
            colorHeader: '33691E',
            headers: ['Rubrique', 'Montant prévu (FCFA)', 'Montant réel (FCFA)', 'Écart'],
            rows: [
              ['CHARGES', '', '', ''],
              ['Foncier',         '{{charges_foncier}}',   '0', '=B{r}-C{r}'],
              ['Intrants',        '{{charges_intrants}}',  '0', '=B{r}-C{r}'],
              ["Main-d'œuvre",    '{{charges_mdo}}',       '0', '=B{r}-C{r}'],
              ['Matériel',        '{{charges_materiel}}',  '0', '=B{r}-C{r}'],
              ['Transport',       '{{charges_transport}}', '0', '=B{r}-C{r}'],
              ['TOTAL CHARGES',   '=B2+B3+B4+B5+B6',      '=C2+C3+C4+C5+C6', '=B{r}-C{r}'],
              ['RECETTES', '', '', ''],
              ['Cacao',           '{{recettes_cacao}}',    '0', '=B{r}-C{r}'],
              ['Café',            '{{recettes_cafe}}',     '0', '=B{r}-C{r}'],
              ['Autres',          '{{recettes_autres}}',   '0', '=B{r}-C{r}'],
              ['TOTAL RECETTES',  '=B9+B10+B11',           '=C9+C10+C11', '=B{r}-C{r}'],
              ['RÉSULTAT NET',    '=B12-B7',               '=C12-C7', '=B{r}-C{r}'],
            ],
            totalsRow: false,
            colWidths: [28, 22, 22, 16],
          },
        ],
      }),
    },

    // ─── 6. Suivi cultures et rendements par parcelle ─────────────────────────
    {
      code: 'agro_xl_006',
      name: 'Suivi Cultures et Rendements par Parcelle',
      description: 'Suivi agronomique détaillé des cultures et des rendements par parcelle.',
      category: 'agro_environnement',
      templateType: 'excel',
      price: 6500,
      active: true,
      fieldsJson: JSON.stringify([
        { key: 'nom_exploitation', label: "Nom de l'exploitation",  type: 'text' },
        { key: 'campagne',         label: 'Campagne',                type: 'text' },
        { key: 'responsable',      label: 'Responsable technique',   type: 'text' },
        { key: 'parcelle_1',       label: 'Nom parcelle 1',          type: 'text' },
        { key: 'superficie_p1',    label: 'Superficie parcelle 1 (ha)', type: 'text' },
        { key: 'culture_p1',       label: 'Culture parcelle 1',      type: 'text' },
        { key: 'parcelle_2',       label: 'Nom parcelle 2',          type: 'text' },
        { key: 'superficie_p2',    label: 'Superficie parcelle 2 (ha)', type: 'text' },
        { key: 'culture_p2',       label: 'Culture parcelle 2',      type: 'text' },
        { key: 'date_semis',       label: 'Date de semis',           type: 'date' },
        { key: 'date_recolte',     label: 'Date de récolte prévue',  type: 'date' },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Suivi Parcelles',
            title: '{{nom_exploitation}} — Suivi parcelles {{campagne}}',
            colorHeader: '558B2F',
            headers: ['Parcelle', 'Superficie (ha)', 'Culture', 'Rendement prévu (T/ha)', 'Production prévue (T)', 'Rendement réel (T/ha)', 'Production réelle (T)', 'Écart production (T)'],
            rows: [
              ['{{parcelle_1}}', '{{superficie_p1}}', '{{culture_p1}}', '0', '=B{r}*D{r}', '0', '=B{r}*F{r}', '=G{r}-E{r}'],
              ['{{parcelle_2}}', '{{superficie_p2}}', '{{culture_p2}}', '0', '=B{r}*D{r}', '0', '=B{r}*F{r}', '=G{r}-E{r}'],
              ['Parcelle 3',     '0',                 '',               '0', '=B{r}*D{r}', '0', '=B{r}*F{r}', '=G{r}-E{r}'],
              ['Parcelle 4',     '0',                 '',               '0', '=B{r}*D{r}', '0', '=B{r}*F{r}', '=G{r}-E{r}'],
            ],
            totalsRow: true,
            colWidths: [20, 16, 18, 22, 20, 22, 20, 20],
          },
        ],
      }),
    },

    // ─── 7. Plan d'affaires agro-industrie ────────────────────────────────────
    {
      code: 'agro_xl_007',
      name: "Plan d'Affaires Agro-Industrie",
      description: "Plan d'affaires structuré pour une unité de transformation agro-industrielle.",
      category: 'agro_environnement',
      templateType: 'excel',
      price: 18000,
      active: true,
      fieldsJson: JSON.stringify([
        { key: 'nom_entreprise',      label: "Nom de l'entreprise",          type: 'text' },
        { key: 'produit_phare',       label: 'Produit phare',                type: 'text' },
        { key: 'promoteur',           label: 'Nom du promoteur',             type: 'text' },
        { key: 'localisation',        label: 'Localisation',                 type: 'text' },
        { key: 'capacite_prod_j',     label: 'Capacité de production/j (kg)', type: 'text' },
        { key: 'prix_vente_kg',       label: 'Prix de vente/kg (FCFA)',      type: 'text' },
        { key: 'invest_equipements',  label: 'Investissements équipements (FCFA)', type: 'text' },
        { key: 'invest_infrastructure', label: 'Investissements infrastructure (FCFA)', type: 'text' },
        { key: 'fonds_roulement',     label: 'Fonds de roulement (FCFA)',    type: 'text' },
        { key: 'charges_fixes_mois',  label: 'Charges fixes/mois (FCFA)',    type: 'text' },
        { key: 'charges_var_kg',      label: 'Charges variables/kg (FCFA)',  type: 'text' },
        { key: 'date_lancement',      label: 'Date de lancement prévue',     type: 'date' },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Investissements',
            title: "Plan d'affaires — {{nom_entreprise}}",
            colorHeader: '1A237E',
            headers: ['Poste', 'Montant (FCFA)', '% du total', 'Source de financement'],
            rows: [
              ['Équipements',       '{{invest_equipements}}',    '=B{r}/B5*100', 'Fonds propres'],
              ['Infrastructure',    '{{invest_infrastructure}}', '=B{r}/B5*100', 'Crédit bancaire'],
              ['Fonds de roulement','{{fonds_roulement}}',       '=B{r}/B5*100', 'Subvention'],
              ['Divers (5%)',        '=B2*0.05',                  '=B{r}/B5*100', ''],
              ['TOTAL INVEST.',     '=B2+B3+B4+B5',              '100',           ''],
            ],
            totalsRow: false,
            colWidths: [28, 20, 14, 24],
          },
          {
            name: 'Compte Exploitation',
            title: "Compte d'exploitation prévisionnel — {{nom_entreprise}}",
            colorHeader: '283593',
            headers: ['Rubrique', 'An 1 (FCFA)', 'An 2 (FCFA)', 'An 3 (FCFA)'],
            rows: [
              ['Capacité prod. annuelle (kg)', '={{capacite_prod_j}}*250', '={{capacite_prod_j}}*280', '={{capacite_prod_j}}*300'],
              ['Chiffre d\'affaires',          '=B2*{{prix_vente_kg}}',    '=C2*{{prix_vente_kg}}',    '=D2*{{prix_vente_kg}}'],
              ['Charges variables',            '=B2*{{charges_var_kg}}',   '=C2*{{charges_var_kg}}',   '=D2*{{charges_var_kg}}'],
              ['Charges fixes',                '={{charges_fixes_mois}}*12','={{charges_fixes_mois}}*12','={{charges_fixes_mois}}*12'],
              ['Résultat brut',                '=B3-B4-B5',                '=C3-C4-C5',                '=D3-D4-D5'],
              ['Amortissements',               '=B1*0.1',                  '=C1*0.1',                  '=D1*0.1'],
              ['Résultat net',                 '=B6-B7',                   '=C6-C7',                   '=D6-D7'],
            ],
            totalsRow: false,
            colWidths: [32, 18, 18, 18],
          },
        ],
      }),
    },

    // ─── 8. Tableau de bord environnemental ──────────────────────────────────
    {
      code: 'agro_xl_008',
      name: 'Tableau de Bord Environnemental',
      description: "Suivi des indicateurs environnementaux d'une exploitation : eau, sol, biodiversité, carbone.",
      category: 'agro_environnement',
      templateType: 'excel',
      price: 8500,
      active: true,
      fieldsJson: JSON.stringify([
        { key: 'nom_exploitation',    label: "Nom de l'exploitation",       type: 'text' },
        { key: 'responsable_env',     label: 'Responsable environnement',   type: 'text' },
        { key: 'periode',             label: 'Période de reporting',        type: 'text' },
        { key: 'superficie_totale',   label: 'Superficie totale (ha)',       type: 'text' },
        { key: 'superficie_boisee',   label: 'Superficie boisée (ha)',       type: 'text' },
        { key: 'conso_eau_m3',        label: "Consommation eau (m³/ha)",     type: 'text' },
        { key: 'pesticides_kg_ha',    label: 'Pesticides utilisés (kg/ha)', type: 'text' },
        { key: 'engrais_kg_ha',       label: 'Engrais utilisés (kg/ha)',    type: 'text' },
        { key: 'emissions_co2',       label: 'Émissions CO₂ estimées (T)',  type: 'text' },
        { key: 'sequestration_c',     label: 'Séquestration carbone (T)',   type: 'text' },
        { key: 'date_rapport',        label: 'Date du rapport',             type: 'date' },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Indicateurs Env.',
            title: '{{nom_exploitation}} — Bilan environnemental {{periode}}',
            colorHeader: '00695C',
            headers: ['Indicateur', 'Valeur mesurée', 'Unité', 'Seuil acceptable', 'Statut', 'Tendance'],
            rows: [
              ['Superficie boisée',         '{{superficie_boisee}}',  'ha',    '={{superficie_totale}}*0.3', '=IF(B{r}>=D{r},"OK","Alerte")', '→'],
              ["Consommation eau",           '{{conso_eau_m3}}',       'm³/ha', '500',                       '=IF(B{r}<=D{r},"OK","Alerte")', '→'],
              ['Pesticides',                 '{{pesticides_kg_ha}}',   'kg/ha', '5',                         '=IF(B{r}<=D{r},"OK","Alerte")', '→'],
              ['Engrais chimiques',          '{{engrais_kg_ha}}',      'kg/ha', '100',                       '=IF(B{r}<=D{r},"OK","Alerte")', '→'],
              ['Émissions CO₂',             '{{emissions_co2}}',      'T',     '={{superficie_totale}}*2',  '=IF(B{r}<=D{r},"OK","Alerte")', '→'],
              ['Séquestration carbone',      '{{sequestration_c}}',    'T',     '={{superficie_totale}}*1',  '=IF(B{r}>=D{r},"OK","Alerte")', '→'],
              ['Bilan carbone net',          '=B5-B6',                  'T',     '0',                         '=IF(B{r}<=D{r},"OK","Alerte")', '→'],
            ],
            totalsRow: false,
            colWidths: [28, 18, 10, 20, 12, 12],
          },
        ],
      }),
    },

    // ─── 9. Suivi intrants et fertilisants ───────────────────────────────────
    {
      code: 'agro_xl_009',
      name: 'Suivi Intrants et Fertilisants',
      description: 'Registre de suivi des achats, utilisations et stocks des intrants et fertilisants agricoles.',
      category: 'agro_environnement',
      templateType: 'excel',
      price: 4000,
      active: true,
      fieldsJson: JSON.stringify([
        { key: 'nom_exploitation',   label: "Nom de l'exploitation",       type: 'text' },
        { key: 'campagne',           label: 'Campagne',                    type: 'text' },
        { key: 'responsable',        label: 'Responsable des stocks',      type: 'text' },
        { key: 'stock_uree',         label: 'Stock initial urée (kg)',     type: 'text' },
        { key: 'stock_npk',          label: 'Stock initial NPK (kg)',      type: 'text' },
        { key: 'stock_insecticide',  label: 'Stock insecticide (L)',       type: 'text' },
        { key: 'stock_herbicide',    label: 'Stock herbicide (L)',         type: 'text' },
        { key: 'stock_fongicide',    label: 'Stock fongicide (kg)',        type: 'text' },
        { key: 'budget_intrants',    label: 'Budget intrants total (FCFA)', type: 'text' },
        { key: 'date_inventaire',    label: "Date d'inventaire",           type: 'date' },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Stock Intrants',
            title: '{{nom_exploitation}} — Suivi intrants {{campagne}}',
            colorHeader: 'F57F17',
            headers: ['Intrant', 'Unité', 'Stock initial', 'Achats', 'Utilisations', 'Stock final', 'Coût unitaire (FCFA)', 'Valeur stock (FCFA)'],
            rows: [
              ['Urée 46%',      'kg', '{{stock_uree}}',        '0', '0', '=C{r}+D{r}-E{r}', '500',  '=F{r}*G{r}'],
              ['NPK 15-15-15',  'kg', '{{stock_npk}}',         '0', '0', '=C{r}+D{r}-E{r}', '450',  '=F{r}*G{r}'],
              ['Insecticide',   'L',  '{{stock_insecticide}}', '0', '0', '=C{r}+D{r}-E{r}', '8000', '=F{r}*G{r}'],
              ['Herbicide',     'L',  '{{stock_herbicide}}',   '0', '0', '=C{r}+D{r}-E{r}', '5500', '=F{r}*G{r}'],
              ['Fongicide',     'kg', '{{stock_fongicide}}',   '0', '0', '=C{r}+D{r}-E{r}', '3200', '=F{r}*G{r}'],
            ],
            totalsRow: true,
            colWidths: [18, 8, 14, 10, 14, 12, 20, 20],
          },
        ],
      }),
    },

    // ─── 10. Analyse rentabilité filière agricole ─────────────────────────────
    {
      code: 'agro_xl_010',
      name: 'Analyse Rentabilité Filière Agricole',
      description: "Analyse de la rentabilité économique d'une filière agricole : marges, seuils de rentabilité, ROI.",
      category: 'agro_environnement',
      templateType: 'excel',
      price: 12000,
      active: true,
      fieldsJson: JSON.stringify([
        { key: 'nom_filiere',        label: 'Nom de la filière',           type: 'text' },
        { key: 'produit',            label: 'Produit principal',           type: 'text' },
        { key: 'analyste',           label: 'Analyste',                    type: 'text' },
        { key: 'campagne',           label: 'Campagne de référence',       type: 'text' },
        { key: 'prix_prod_kg',       label: 'Prix producteur/kg (FCFA)',   type: 'text' },
        { key: 'prix_marche_kg',     label: 'Prix marché/kg (FCFA)',       type: 'text' },
        { key: 'cout_prod_kg',       label: 'Coût de production/kg (FCFA)', type: 'text' },
        { key: 'volume_prod_t',      label: 'Volume de production (T)',    type: 'text' },
        { key: 'volume_exporte_t',   label: 'Volume exporté (T)',          type: 'text' },
        { key: 'charges_fixes_tot',  label: 'Charges fixes totales (FCFA)', type: 'text' },
        { key: 'subventions',        label: 'Subventions reçues (FCFA)',   type: 'text' },
        { key: 'date_analyse',       label: "Date de l'analyse",          type: 'date' },
      ]),
      body: JSON.stringify({
        sheets: [
          {
            name: 'Rentabilité',
            title: 'Analyse rentabilité — {{nom_filiere}} ({{campagne}})',
            colorHeader: 'BF360C',
            headers: ['Indicateur', 'Valeur', 'Unité', 'Interprétation'],
            rows: [
              ['Prix producteur',              '{{prix_prod_kg}}',                         'FCFA/kg', ''],
              ['Prix marché',                  '{{prix_marche_kg}}',                        'FCFA/kg', ''],
              ['Coût de production',           '{{cout_prod_kg}}',                          'FCFA/kg', ''],
              ['Marge brute/kg',               '=B{r-3}-B{r-1}',                            'FCFA/kg', '=IF(B{r}>0,"Rentable","Déficitaire")'],
              ['Volume produit',               '{{volume_prod_t}}',                         'T',       ''],
              ['Volume exporté',               '{{volume_exporte_t}}',                      'T',       '=TEXT(B{r}/B{r-1}*100,"0.0")&"% exporté"'],
              ['Chiffre d\'affaires total',    '={{volume_prod_t}}*1000*{{prix_prod_kg}}',  'FCFA',    ''],
              ['Charges variables totales',    '={{volume_prod_t}}*1000*{{cout_prod_kg}}',  'FCFA',    ''],
              ['Charges fixes totales',        '{{charges_fixes_tot}}',                     'FCFA',    ''],
              ['Subventions',                  '{{subventions}}',                           'FCFA',    ''],
              ['Résultat net',                 '=B{r-4}-B{r-3}-B{r-2}+B{r-1}',            'FCFA',    '=IF(B{r}>0,"Bénéfice","Perte")'],
              ['Marge nette (%)',              '=IF(B{r-5}=0,0,B{r-1}/B{r-5}*100)',        '%',       '=IF(B{r}>15,"Très rentable",IF(B{r}>5,"Rentable","Faible"))'],
              ['Seuil de rentabilité',         '=IF((B1-B3)=0,0,B9/(B1-B3))',              'kg',      ''],
            ],
            totalsRow: false,
            colWidths: [32, 22, 12, 24],
          },
          {
            name: 'Comparaison Acteurs',
            title: 'Répartition de la valeur ajoutée — {{nom_filiere}}',
            colorHeader: 'D84315',
            headers: ['Maillon', 'Prix achat (FCFA/kg)', 'Prix vente (FCFA/kg)', 'Marge (FCFA/kg)', 'Part valeur ajoutée (%)'],
            rows: [
              ['Producteur',      '0',                     '{{prix_prod_kg}}',  '={{prix_prod_kg}}-B{r}',  '=D{r}/D6*100'],
              ['Collecteur',      '{{prix_prod_kg}}',      '0',                 '=C{r}-B{r}',              '=D{r}/D6*100'],
              ['Transformateur',  '0',                     '0',                 '=C{r}-B{r}',              '=D{r}/D6*100'],
              ['Grossiste',       '0',                     '0',                 '=C{r}-B{r}',              '=D{r}/D6*100'],
              ['Détaillant',      '0',                     '{{prix_marche_kg}}','=C{r}-B{r}',              '=D{r}/D6*100'],
              ['TOTAL MARGE',     '0',                     '{{prix_marche_kg}}','=D2+D3+D4+D5+D6',        '100'],
            ],
            totalsRow: false,
            colWidths: [18, 22, 22, 18, 22],
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

  console.log(
    `Excel Agro OK — créés:${created} mis à jour:${updated} TOTAL:${await prisma.documentTemplate.count()}`,
  );
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
