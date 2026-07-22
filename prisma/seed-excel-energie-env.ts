import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  // ─── ÉNERGIE (xl_enr_) ───────────────────────────────────────────────────

  // 1. xl_enr_audit_energetique — Audit énergétique bâtiment
  {
    code: 'xl_enr_audit_energetique',
    name: 'Audit énergétique bâtiment',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Usages énergétiques, consommation, coût et économies potentielles par poste',
    price: 1200, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_batiment', label: 'Nom du bâtiment / site', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable énergie', type: 'text', required: true },
      { name: 'annee', label: 'Année de référence', type: 'text', required: true },
      { name: 'surface', label: 'Surface (m²)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Audit Énergétique',
          title: 'Audit Énergétique Bâtiment',
          colorHeader: '1B5E20',
          headers: ['Usage / Poste', 'Consommation kWh/an', 'Coût unitaire (FCFA/kWh)', 'Coût annuel (FCFA)', 'Part %', 'Économie potentielle kWh', 'Gain potentiel (FCFA)'],
          rows: [
            ['Climatisation', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D10*100,0)', 0, '=F{r}*C{r}'],
            ['Éclairage', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D10*100,0)', 0, '=F{r}*C{r}'],
            ['Équipements bureautiques', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D10*100,0)', 0, '=F{r}*C{r}'],
            ['Production d\'eau chaude', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D10*100,0)', 0, '=F{r}*C{r}'],
            ['Ventilation & CTA', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D10*100,0)', 0, '=F{r}*C{r}'],
            ['Groupe électrogène', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D10*100,0)', 0, '=F{r}*C{r}'],
            ['Pompage & eau', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D10*100,0)', 0, '=F{r}*C{r}'],
            ['Divers', 0, 0, '=B{r}*C{r}', '=IFERROR(D{r}/D10*100,0)', 0, '=F{r}*C{r}'],
            ['TOTAL', '=SUM(B2:B9)', '', '=SUM(D2:D9)', '100%', '=SUM(F2:F9)', '=SUM(G2:G9)'],
          ],
          totalsRow: true,
          colWidths: [28, 22, 22, 20, 10, 24, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 68,
  },

  // 2. xl_enr_solaire_dimensionnement — Dimensionnement installation solaire
  {
    code: 'xl_enr_solaire_dimensionnement',
    name: 'Dimensionnement installation solaire',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Calcul des besoins, panneaux, batteries, onduleur et coût d\'une installation solaire',
    price: 1500, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_site', label: 'Nom du site', type: 'text', required: true },
      { name: 'localite', label: 'Localité / pays', type: 'text', required: true },
      { name: 'irradiation', label: 'Irradiation moyenne (kWh/m²/j)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Besoins',
          title: 'Analyse des Besoins Énergétiques',
          colorHeader: '1B5E20',
          headers: ['Équipement', 'Puissance (W)', 'Heures/jour', 'Consommation Wh/j', 'Quantité', 'Total Wh/j'],
          rows: [
            ['Éclairage LED', 0, 0, '=B{r}*C{r}', 1, '=D{r}*E{r}'],
            ['Climatiseur', 0, 0, '=B{r}*C{r}', 1, '=D{r}*E{r}'],
            ['Réfrigérateur', 0, 0, '=B{r}*C{r}', 1, '=D{r}*E{r}'],
            ['Ordinateurs', 0, 0, '=B{r}*C{r}', 1, '=D{r}*E{r}'],
            ['Télévision', 0, 0, '=B{r}*C{r}', 1, '=D{r}*E{r}'],
            ['Pompe à eau', 0, 0, '=B{r}*C{r}', 1, '=D{r}*E{r}'],
            ['Divers', 0, 0, '=B{r}*C{r}', 1, '=D{r}*E{r}'],
            ['TOTAL BESOINS', '', '', '=SUM(D2:D8)', '', '=SUM(F2:F8)'],
          ],
          totalsRow: true,
          colWidths: [26, 16, 14, 20, 12, 18],
        },
        {
          name: 'Dimensionnement',
          title: 'Dimensionnement Système Solaire',
          colorHeader: '2E7D32',
          headers: ['Composant', 'Paramètre', 'Valeur', 'Unité', 'Coût unitaire (FCFA)', 'Coût total (FCFA)'],
          rows: [
            ['Panneaux solaires', 'Puissance totale nécessaire', 0, 'Wc', 0, '=C{r}*E{r}/1000'],
            ['Batteries', 'Capacité totale', 0, 'Ah', 0, '=C{r}*E{r}'],
            ['Onduleur', 'Puissance', 0, 'W', 0, '=E{r}'],
            ['Régulateur MPPT', 'Courant max', 0, 'A', 0, '=E{r}'],
            ['Câblage & accessoires', 'Forfait', 1, '', 0, '=C{r}*E{r}'],
            ['Installation & pose', 'Forfait', 1, '', 0, '=C{r}*E{r}'],
            ['COÛT TOTAL PROJET', '', '', '', '', '=SUM(F2:F7)'],
          ],
          totalsRow: false,
          colWidths: [26, 28, 12, 10, 22, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 75,
  },

  // 3. xl_enr_production_solaire — Suivi production solaire mensuelle
  {
    code: 'xl_enr_production_solaire',
    name: 'Suivi production solaire mensuelle',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi mensuel : jours solaires, irradiation, production kWh et autoconsommation',
    price: 800, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_installation', label: 'Nom de l\'installation', type: 'text', required: true },
      { name: 'puissance_installee', label: 'Puissance installée (kWc)', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Production Solaire',
          title: 'Suivi Production Solaire Mensuelle',
          colorHeader: '1B5E20',
          headers: ['Mois', 'Jours solaires', 'Irradiation moy. (kWh/m²/j)', 'Production kWh', 'Prévision kWh', 'Écart %', 'Autoconsommation kWh', 'Taux autoconso %'],
          rows: [
            ['Janvier', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/E{r}*100,0)', 0, '=IFERROR(G{r}/D{r}*100,0)'],
            ['Février', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/E{r}*100,0)', 0, '=IFERROR(G{r}/D{r}*100,0)'],
            ['Mars', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/E{r}*100,0)', 0, '=IFERROR(G{r}/D{r}*100,0)'],
            ['Avril', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/E{r}*100,0)', 0, '=IFERROR(G{r}/D{r}*100,0)'],
            ['Mai', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/E{r}*100,0)', 0, '=IFERROR(G{r}/D{r}*100,0)'],
            ['Juin', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/E{r}*100,0)', 0, '=IFERROR(G{r}/D{r}*100,0)'],
            ['Juillet', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/E{r}*100,0)', 0, '=IFERROR(G{r}/D{r}*100,0)'],
            ['Août', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/E{r}*100,0)', 0, '=IFERROR(G{r}/D{r}*100,0)'],
            ['Septembre', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/E{r}*100,0)', 0, '=IFERROR(G{r}/D{r}*100,0)'],
            ['Octobre', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/E{r}*100,0)', 0, '=IFERROR(G{r}/D{r}*100,0)'],
            ['Novembre', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/E{r}*100,0)', 0, '=IFERROR(G{r}/D{r}*100,0)'],
            ['Décembre', 0, 0, 0, 0, '=IFERROR((D{r}-E{r})/E{r}*100,0)', 0, '=IFERROR(G{r}/D{r}*100,0)'],
            ['TOTAL', '=SUM(B2:B13)', '', '=SUM(D2:D13)', '=SUM(E2:E13)', '', '=SUM(G2:G13)', '=IFERROR(G14/D14*100,0)'],
          ],
          totalsRow: false,
          colWidths: [14, 16, 26, 18, 18, 12, 22, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  // 4. xl_enr_factures_electricite — Analyse factures électricité
  {
    code: 'xl_enr_factures_electricite',
    name: 'Analyse factures électricité',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi mensuel des factures : consommation, coût, heures de pointe, base et taxes',
    price: 600, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_abonne', label: 'Nom de l\'abonné', type: 'text', required: true },
      { name: 'reference_compteur', label: 'Référence compteur', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Factures Électricité',
          title: 'Analyse des Factures Électricité',
          colorHeader: '1B5E20',
          headers: ['Mois', 'Consommation kWh', 'Pointe kWh', 'Base kWh', 'Coût HT (FCFA)', 'Taxes (FCFA)', 'Coût TTC (FCFA)', 'Coût/kWh (FCFA)'],
          rows: [
            ['Janvier', 0, 0, '=B{r}-C{r}', 0, '=E{r}*0.18', '=E{r}+F{r}', '=IFERROR(G{r}/B{r},0)'],
            ['Février', 0, 0, '=B{r}-C{r}', 0, '=E{r}*0.18', '=E{r}+F{r}', '=IFERROR(G{r}/B{r},0)'],
            ['Mars', 0, 0, '=B{r}-C{r}', 0, '=E{r}*0.18', '=E{r}+F{r}', '=IFERROR(G{r}/B{r},0)'],
            ['Avril', 0, 0, '=B{r}-C{r}', 0, '=E{r}*0.18', '=E{r}+F{r}', '=IFERROR(G{r}/B{r},0)'],
            ['Mai', 0, 0, '=B{r}-C{r}', 0, '=E{r}*0.18', '=E{r}+F{r}', '=IFERROR(G{r}/B{r},0)'],
            ['Juin', 0, 0, '=B{r}-C{r}', 0, '=E{r}*0.18', '=E{r}+F{r}', '=IFERROR(G{r}/B{r},0)'],
            ['Juillet', 0, 0, '=B{r}-C{r}', 0, '=E{r}*0.18', '=E{r}+F{r}', '=IFERROR(G{r}/B{r},0)'],
            ['Août', 0, 0, '=B{r}-C{r}', 0, '=E{r}*0.18', '=E{r}+F{r}', '=IFERROR(G{r}/B{r},0)'],
            ['Septembre', 0, 0, '=B{r}-C{r}', 0, '=E{r}*0.18', '=E{r}+F{r}', '=IFERROR(G{r}/B{r},0)'],
            ['Octobre', 0, 0, '=B{r}-C{r}', 0, '=E{r}*0.18', '=E{r}+F{r}', '=IFERROR(G{r}/B{r},0)'],
            ['Novembre', 0, 0, '=B{r}-C{r}', 0, '=E{r}*0.18', '=E{r}+F{r}', '=IFERROR(G{r}/B{r},0)'],
            ['Décembre', 0, 0, '=B{r}-C{r}', 0, '=E{r}*0.18', '=E{r}+F{r}', '=IFERROR(G{r}/B{r},0)'],
            ['TOTAL', '=SUM(B2:B13)', '=SUM(C2:C13)', '=SUM(D2:D13)', '=SUM(E2:E13)', '=SUM(F2:F13)', '=SUM(G2:G13)', '=IFERROR(G14/B14,0)'],
          ],
          totalsRow: false,
          colWidths: [14, 20, 14, 14, 18, 16, 18, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 66,
  },

  // 5. xl_enr_economies_energie — Plan économies d'énergie
  {
    code: 'xl_enr_economies_energie',
    name: "Plan d'économies d'énergie",
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: "Actions d'efficacité énergétique avec investissement, économie annuelle, ROI et payback",
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année de référence', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable énergie', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Plan Économies Énergie',
          title: "Plan d'Économies d'Énergie",
          colorHeader: '1B5E20',
          headers: ['Action / Mesure', 'Poste concerné', 'Investissement (FCFA)', 'Économie kWh/an', 'Économie FCFA/an', 'ROI %', 'Payback (ans)', 'Priorité'],
          rows: [
            ['Remplacement éclairage LED', 'Éclairage', 0, 0, 0, '=IFERROR(E{r}/C{r}*100,0)', '=IFERROR(C{r}/E{r},0)', 'Haute'],
            ['Isolation thermique', 'Climatisation', 0, 0, 0, '=IFERROR(E{r}/C{r}*100,0)', '=IFERROR(C{r}/E{r},0)', 'Haute'],
            ['Remplacement climatiseurs inverter', 'Climatisation', 0, 0, 0, '=IFERROR(E{r}/C{r}*100,0)', '=IFERROR(C{r}/E{r},0)', 'Moyenne'],
            ['Gestion automatique éclairage', 'Éclairage', 0, 0, 0, '=IFERROR(E{r}/C{r}*100,0)', '=IFERROR(C{r}/E{r},0)', 'Moyenne'],
            ['Installation panneaux solaires', 'Production', 0, 0, 0, '=IFERROR(E{r}/C{r}*100,0)', '=IFERROR(C{r}/E{r},0)', 'Haute'],
            ['Variateurs de vitesse moteurs', 'Équipements', 0, 0, 0, '=IFERROR(E{r}/C{r}*100,0)', '=IFERROR(C{r}/E{r},0)', 'Basse'],
            ['Sensibilisation personnel', 'Comportement', 0, 0, 0, '=IFERROR(E{r}/C{r}*100,0)', '=IFERROR(C{r}/E{r},0)', 'Haute'],
            ['TOTAL', '', '=SUM(C2:C8)', '=SUM(D2:D8)', '=SUM(E2:E8)', '=IFERROR(E9/C9*100,0)', '=IFERROR(C9/E9,0)', ''],
          ],
          totalsRow: true,
          colWidths: [34, 20, 22, 20, 20, 12, 16, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 72,
  },

  // 6. xl_enr_groupe_electrogene — Suivi groupe électrogène
  {
    code: 'xl_enr_groupe_electrogene',
    name: 'Suivi groupe électrogène',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi mensuel : heures de marche, carburant consommé, entretien, coût/heure et incidents',
    price: 700, priceMax: 1100, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'reference_groupe', label: 'Référence / marque du groupe', type: 'text', required: true },
      { name: 'puissance_kva', label: 'Puissance (kVA)', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi GE',
          title: 'Suivi Groupe Électrogène',
          colorHeader: '1B5E20',
          headers: ['Mois', 'Heures marche', 'Carburant (L)', 'Coût carburant (FCFA)', 'Coût entretien (FCFA)', 'Coût total (FCFA)', 'Coût/heure (FCFA)', 'Incidents'],
          rows: [
            ['Janvier', 0, 0, '=C{r}*650', 0, '=D{r}+E{r}', '=IFERROR(F{r}/B{r},0)', 0],
            ['Février', 0, 0, '=C{r}*650', 0, '=D{r}+E{r}', '=IFERROR(F{r}/B{r},0)', 0],
            ['Mars', 0, 0, '=C{r}*650', 0, '=D{r}+E{r}', '=IFERROR(F{r}/B{r},0)', 0],
            ['Avril', 0, 0, '=C{r}*650', 0, '=D{r}+E{r}', '=IFERROR(F{r}/B{r},0)', 0],
            ['Mai', 0, 0, '=C{r}*650', 0, '=D{r}+E{r}', '=IFERROR(F{r}/B{r},0)', 0],
            ['Juin', 0, 0, '=C{r}*650', 0, '=D{r}+E{r}', '=IFERROR(F{r}/B{r},0)', 0],
            ['Juillet', 0, 0, '=C{r}*650', 0, '=D{r}+E{r}', '=IFERROR(F{r}/B{r},0)', 0],
            ['Août', 0, 0, '=C{r}*650', 0, '=D{r}+E{r}', '=IFERROR(F{r}/B{r},0)', 0],
            ['Septembre', 0, 0, '=C{r}*650', 0, '=D{r}+E{r}', '=IFERROR(F{r}/B{r},0)', 0],
            ['Octobre', 0, 0, '=C{r}*650', 0, '=D{r}+E{r}', '=IFERROR(F{r}/B{r},0)', 0],
            ['Novembre', 0, 0, '=C{r}*650', 0, '=D{r}+E{r}', '=IFERROR(F{r}/B{r},0)', 0],
            ['Décembre', 0, 0, '=C{r}*650', 0, '=D{r}+E{r}', '=IFERROR(F{r}/B{r},0)', 0],
            ['TOTAL', '=SUM(B2:B13)', '=SUM(C2:C13)', '=SUM(D2:D13)', '=SUM(E2:E13)', '=SUM(F2:F13)', '=IFERROR(F14/B14,0)', '=SUM(H2:H13)'],
          ],
          totalsRow: false,
          colWidths: [14, 16, 16, 22, 22, 20, 20, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 64,
  },

  // 7. xl_enr_bilan_carbone — Bilan carbone entreprise
  {
    code: 'xl_enr_bilan_carbone',
    name: 'Bilan carbone entreprise',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Inventaire GES : sources, facteurs d\'émission, quantités, CO2 équivalent et part %',
    price: 1200, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année de référence', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable RSE / QHSE', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Bilan Carbone',
          title: 'Bilan Carbone Entreprise',
          colorHeader: '1B5E20',
          headers: ['Source d\'émission', 'Scope', 'Unité', 'Quantité', 'Facteur émission (kgCO2eq/unité)', 'Émissions tCO2eq', 'Part %'],
          rows: [
            ['Électricité consommée', 'Scope 2', 'kWh', 0, 0.5, '=D{r}*E{r}/1000', '=IFERROR(F{r}/F11*100,0)'],
            ['Carburant véhicules (essence)', 'Scope 1', 'L', 0, 2.37, '=D{r}*E{r}/1000', '=IFERROR(F{r}/F11*100,0)'],
            ['Carburant groupe électrogène (gasoil)', 'Scope 1', 'L', 0, 2.68, '=D{r}*E{r}/1000', '=IFERROR(F{r}/F11*100,0)'],
            ['Gaz naturel / propane', 'Scope 1', 'kg', 0, 2.94, '=D{r}*E{r}/1000', '=IFERROR(F{r}/F11*100,0)'],
            ['Déplacements aériens', 'Scope 3', 'km', 0, 0.255, '=D{r}*E{r}/1000', '=IFERROR(F{r}/F11*100,0)'],
            ['Achats matières premières', 'Scope 3', 'tonne', 0, 0, '=D{r}*E{r}/1000', '=IFERROR(F{r}/F11*100,0)'],
            ['Déchets générés', 'Scope 3', 'tonne', 0, 0.5, '=D{r}*E{r}/1000', '=IFERROR(F{r}/F11*100,0)'],
            ['Eau consommée', 'Scope 3', 'm³', 0, 0.3, '=D{r}*E{r}/1000', '=IFERROR(F{r}/F11*100,0)'],
            ['Fluides frigorigènes', 'Scope 1', 'kg', 0, 0, '=D{r}*E{r}/1000', '=IFERROR(F{r}/F11*100,0)'],
            ['TOTAL ÉMISSIONS', '', '', '', '', '=SUM(F2:F10)', '100%'],
          ],
          totalsRow: true,
          colWidths: [34, 12, 12, 12, 30, 20, 10],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 67,
  },

  // 8. xl_enr_cout_kwh — Comparatif coût des énergies
  {
    code: 'xl_enr_cout_kwh',
    name: 'Comparatif coût des énergies',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Comparaison des sources d\'énergie : puissance, coût/kWh, disponibilité et TCO',
    price: 600, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_site', label: 'Site / entreprise', type: 'text', required: true },
      { name: 'date_analyse', label: 'Date d\'analyse', type: 'date', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Comparatif Énergies',
          title: 'Comparatif Coût des Énergies',
          colorHeader: '1B5E20',
          headers: ['Source d\'énergie', 'Puissance (kW)', 'Coût investissement (FCFA)', 'Coût/kWh (FCFA)', 'Disponibilité %', 'Durée de vie (ans)', 'TCO sur 10 ans (FCFA)', 'Émissions gCO2/kWh'],
          rows: [
            ['Réseau électrique SODECI/CIE', 0, 0, 0, 0, 0, '=C{r}+D{r}*B{r}*8760*10', 500],
            ['Groupe électrogène gasoil', 0, 0, 0, 0, 0, '=C{r}+D{r}*B{r}*8760*10', 680],
            ['Système solaire photovoltaïque', 0, 0, 0, 0, 0, '=C{r}+D{r}*B{r}*8760*10', 25],
            ['Solaire hybride (PV + GE)', 0, 0, 0, 0, 0, '=C{r}+D{r}*B{r}*8760*10', 200],
            ['Éolienne', 0, 0, 0, 0, 0, '=C{r}+D{r}*B{r}*8760*10', 7],
            ['Biogaz / biomasse', 0, 0, 0, 0, 0, '=C{r}+D{r}*B{r}*8760*10', 100],
          ],
          totalsRow: false,
          colWidths: [36, 14, 26, 18, 16, 18, 24, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  // 9. xl_enr_financement_solaire — Plan financement projet solaire
  {
    code: 'xl_enr_financement_solaire',
    name: 'Plan financement projet solaire',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Financement d\'un projet solaire : coût, apport, emprunt, subvention et amortissement',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'porteur', label: 'Porteur de projet', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de démarrage', type: 'date', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Financement',
          title: 'Plan de Financement Projet Solaire',
          colorHeader: '1B5E20',
          headers: ['Rubrique', 'Montant (FCFA)', 'Part %', 'Commentaire'],
          rows: [
            ['Coût total du projet', 0, '100%', 'Équipements + installation'],
            ['Apport personnel / fonds propres', 0, '=IFERROR(B{r}/B2*100,0)', ''],
            ['Emprunt bancaire', 0, '=IFERROR(B{r}/B2*100,0)', 'Taux et durée à préciser'],
            ['Subvention État / bailleur', 0, '=IFERROR(B{r}/B2*100,0)', 'ANARE, FER, AFD...'],
            ['Crédit-bail équipements', 0, '=IFERROR(B{r}/B2*100,0)', ''],
            ['TOTAL FINANCEMENT', '=SUM(B3:B6)', '=IFERROR(B7/B2*100,0)', ''],
            ['SOLDE (Financement - Coût)', '=B7-B2', '', ''],
          ],
          totalsRow: false,
          colWidths: [30, 22, 12, 30],
        },
        {
          name: 'Amortissement',
          title: 'Amortissement & Retour sur Investissement',
          colorHeader: '2E7D32',
          headers: ['Année', 'Économies réalisées (FCFA)', 'Remboursement emprunt (FCFA)', 'Flux net (FCFA)', 'Cumul flux (FCFA)'],
          rows: [
            [1, 0, 0, '=B{r}-C{r}', '=D{r}'],
            [2, 0, 0, '=B{r}-C{r}', '=E2+D{r}'],
            [3, 0, 0, '=B{r}-C{r}', '=E3+D{r}'],
            [4, 0, 0, '=B{r}-C{r}', '=E4+D{r}'],
            [5, 0, 0, '=B{r}-C{r}', '=E5+D{r}'],
            [7, 0, 0, '=B{r}-C{r}', '=E6+D{r}'],
            [10, 0, 0, '=B{r}-C{r}', '=E7+D{r}'],
            [15, 0, 0, '=B{r}-C{r}', '=E8+D{r}'],
            ['TOTAL', '=SUM(B2:B9)', '=SUM(C2:C9)', '=SUM(D2:D9)', ''],
          ],
          totalsRow: false,
          colWidths: [10, 28, 28, 20, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 69,
  },

  // 10. xl_enr_reseau_hybride — Dimensionnement réseau hybride mini-grid
  {
    code: 'xl_enr_reseau_hybride',
    name: 'Dimensionnement réseau hybride mini-grid',
    category: 'commercial_financier',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Mini-grid hybride : charge, solaire, diesel, stockage et coût total de système',
    price: 1500, priceMax: 1800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_village', label: 'Village / site', type: 'text', required: true },
      { name: 'nombre_menages', label: 'Nombre de ménages', type: 'text', required: true },
      { name: 'irradiation', label: 'Irradiation (kWh/m²/j)', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Charge',
          title: 'Analyse de la Charge du Mini-Grid',
          colorHeader: '1B5E20',
          headers: ['Catégorie abonné', 'Nombre', 'Puissance moy. (W)', 'Heures/jour', 'Énergie/jour (Wh)', 'Énergie/mois (kWh)'],
          rows: [
            ['Ménages résidentiels', 0, 0, 0, '=B{r}*C{r}*D{r}', '=E{r}*30/1000'],
            ['Boutiques / commerces', 0, 0, 0, '=B{r}*C{r}*D{r}', '=E{r}*30/1000'],
            ['Établissement scolaire', 0, 0, 0, '=B{r}*C{r}*D{r}', '=E{r}*30/1000'],
            ['Centre de santé', 0, 0, 0, '=B{r}*C{r}*D{r}', '=E{r}*30/1000'],
            ['Pompe à eau', 0, 0, 0, '=B{r}*C{r}*D{r}', '=E{r}*30/1000'],
            ['Artisanat / PME', 0, 0, 0, '=B{r}*C{r}*D{r}', '=E{r}*30/1000'],
            ['TOTAL', '=SUM(B2:B7)', '', '', '=SUM(E2:E7)', '=SUM(F2:F7)'],
          ],
          totalsRow: true,
          colWidths: [28, 12, 20, 14, 20, 20],
        },
        {
          name: 'Dimensionnement',
          title: 'Dimensionnement Réseau Hybride',
          colorHeader: '2E7D32',
          headers: ['Composant', 'Capacité / Puissance', 'Unité', 'Quantité', 'Coût unitaire (FCFA)', 'Coût total (FCFA)'],
          rows: [
            ['Panneaux PV', 0, 'kWc', 0, 0, '=C{r}*D{r}*E{r}/1000'],
            ['Groupe électrogène diesel', 0, 'kVA', 0, 0, '=D{r}*E{r}'],
            ['Batteries de stockage', 0, 'kWh', 0, 0, '=C{r}*D{r}*E{r}/1000'],
            ['Onduleur hybride', 0, 'kW', 0, 0, '=D{r}*E{r}'],
            ['Régulateur de charge', 0, 'A', 0, 0, '=D{r}*E{r}'],
            ['Réseau de distribution', 0, 'ml', 0, 0, '=D{r}*E{r}'],
            ['Installation & génie civil', 1, 'forfait', 1, 0, '=E{r}'],
            ['COÛT TOTAL MINI-GRID', '', '', '', '', '=SUM(F2:F8)'],
          ],
          totalsRow: false,
          colWidths: [28, 22, 12, 12, 22, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 71,
  },

  // ─── ENVIRONNEMENT (xl_env_) ──────────────────────────────────────────────

  // 11. xl_env_dechets_entreprise — Bilan déchets entreprise
  {
    code: 'xl_env_dechets_entreprise',
    name: 'Bilan déchets entreprise',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Types de déchets, quantités, filières de valorisation, coûts et indicateurs de performance',
    price: 800, priceMax: 1300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable QHSE', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Bilan Déchets',
          title: 'Bilan Déchets Entreprise',
          colorHeader: '2E7D32',
          headers: ['Type de déchet', 'Code déchet', 'Quantité (kg/mois)', 'Filière', 'Prestataire', 'Coût traitement (FCFA)', 'Valorisation (FCFA)', 'Bilan net (FCFA)'],
          rows: [
            ['Déchets industriels banals (DIB)', '', 0, 'Enfouissement', '', 0, 0, '=G{r}-F{r}'],
            ['Déchets dangereux', '', 0, 'Élimination spécialisée', '', 0, 0, '=G{r}-F{r}'],
            ['Déchets métalliques', '', 0, 'Recyclage', '', 0, 0, '=G{r}-F{r}'],
            ['Papier / carton', '', 0, 'Recyclage', '', 0, 0, '=G{r}-F{r}'],
            ['Plastiques', '', 0, 'Recyclage', '', 0, 0, '=G{r}-F{r}'],
            ['Huiles usagées', '', 0, 'Régénération', '', 0, 0, '=G{r}-F{r}'],
            ['Déchets organiques', '', 0, 'Compostage', '', 0, 0, '=G{r}-F{r}'],
            ['DECHETS D\'EAU (boues)', '', 0, 'Épandage', '', 0, 0, '=G{r}-F{r}'],
            ['TOTAL', '', '=SUM(C2:C9)', '', '', '=SUM(F2:F9)', '=SUM(G2:G9)', '=SUM(H2:H9)'],
          ],
          totalsRow: true,
          colWidths: [30, 16, 20, 22, 20, 24, 20, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  // 12. xl_env_eau_consommation — Suivi consommation eau
  {
    code: 'xl_env_eau_consommation',
    name: 'Suivi consommation eau',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Relevés par points de mesure, pertes identifiées, coût et objectifs de réduction',
    price: 600, priceMax: 1000, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_site', label: 'Nom du site', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Consommation Eau',
          title: 'Suivi Consommation Eau',
          colorHeader: '2E7D32',
          headers: ['Mois', 'Relevé compteur principal (m³)', 'Usages process (m³)', 'Sanitaires (m³)', 'Arrosage (m³)', 'Pertes estimées (m³)', 'Coût (FCFA)', 'Objectif (m³)'],
          rows: [
            ['Janvier', 0, 0, 0, 0, '=B{r}-C{r}-D{r}-E{r}', '=B{r}*500', 0],
            ['Février', 0, 0, 0, 0, '=B{r}-C{r}-D{r}-E{r}', '=B{r}*500', 0],
            ['Mars', 0, 0, 0, 0, '=B{r}-C{r}-D{r}-E{r}', '=B{r}*500', 0],
            ['Avril', 0, 0, 0, 0, '=B{r}-C{r}-D{r}-E{r}', '=B{r}*500', 0],
            ['Mai', 0, 0, 0, 0, '=B{r}-C{r}-D{r}-E{r}', '=B{r}*500', 0],
            ['Juin', 0, 0, 0, 0, '=B{r}-C{r}-D{r}-E{r}', '=B{r}*500', 0],
            ['Juillet', 0, 0, 0, 0, '=B{r}-C{r}-D{r}-E{r}', '=B{r}*500', 0],
            ['Août', 0, 0, 0, 0, '=B{r}-C{r}-D{r}-E{r}', '=B{r}*500', 0],
            ['Septembre', 0, 0, 0, 0, '=B{r}-C{r}-D{r}-E{r}', '=B{r}*500', 0],
            ['Octobre', 0, 0, 0, 0, '=B{r}-C{r}-D{r}-E{r}', '=B{r}*500', 0],
            ['Novembre', 0, 0, 0, 0, '=B{r}-C{r}-D{r}-E{r}', '=B{r}*500', 0],
            ['Décembre', 0, 0, 0, 0, '=B{r}-C{r}-D{r}-E{r}', '=B{r}*500', 0],
            ['TOTAL', '=SUM(B2:B13)', '=SUM(C2:C13)', '=SUM(D2:D13)', '=SUM(E2:E13)', '=SUM(F2:F13)', '=SUM(G2:G13)', '=SUM(H2:H13)'],
          ],
          totalsRow: false,
          colWidths: [14, 28, 20, 16, 14, 22, 18, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // 13. xl_env_emissions_polluantes — Registre émissions polluantes
  {
    code: 'xl_env_emissions_polluantes',
    name: 'Registre émissions polluantes',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Suivi des rejets atmosphériques et liquides : sources, polluants, mesures, seuils et conformité',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
      { name: 'organisme_mesure', label: 'Organisme de mesure', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Émissions',
          title: 'Registre des Émissions Polluantes',
          colorHeader: '2E7D32',
          headers: ['Source d\'émission', 'Milieu', 'Polluant', 'Valeur mesurée', 'Unité', 'Seuil réglementaire', 'Conformité', 'Date mesure', 'Actions correctives'],
          rows: [
            ['Cheminée four', 'Air', 'Poussières', 0, 'mg/m³', 150, '=IF(D{r}<=F{r},"Conforme","NON CONFORME")', '', ''],
            ['Cheminée four', 'Air', 'SO2', 0, 'mg/m³', 500, '=IF(D{r}<=F{r},"Conforme","NON CONFORME")', '', ''],
            ['Cheminée four', 'Air', 'NOx', 0, 'mg/m³', 400, '=IF(D{r}<=F{r},"Conforme","NON CONFORME")', '', ''],
            ['Rejet effluents', 'Eau', 'DBO5', 0, 'mg/L', 30, '=IF(D{r}<=F{r},"Conforme","NON CONFORME")', '', ''],
            ['Rejet effluents', 'Eau', 'DCO', 0, 'mg/L', 90, '=IF(D{r}<=F{r},"Conforme","NON CONFORME")', '', ''],
            ['Rejet effluents', 'Eau', 'MES', 0, 'mg/L', 35, '=IF(D{r}<=F{r},"Conforme","NON CONFORME")', '', ''],
            ['Rejet effluents', 'Eau', 'pH', 0, '', '6-9', '', '', ''],
            ['Stockage produits', 'Sol', 'Hydrocarbures', 0, 'mg/kg', 500, '=IF(D{r}<=F{r},"Conforme","NON CONFORME")', '', ''],
          ],
          totalsRow: false,
          colWidths: [24, 10, 16, 18, 10, 22, 20, 16, 28],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  // 14. xl_env_biodiversite — Plan de gestion biodiversité
  {
    code: 'xl_env_biodiversite',
    name: 'Plan de gestion biodiversité',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Espèces inventoriées, habitats, menaces identifiées, actions de conservation et indicateurs',
    price: 1000, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_site', label: 'Nom du site / projet', type: 'text', required: true },
      { name: 'zone', label: 'Zone géographique', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable environnement', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Inventaire Espèces',
          title: 'Inventaire de la Biodiversité',
          colorHeader: '2E7D32',
          headers: ['Espèce', 'Groupe', 'Statut UICN', 'Habitat', 'Population estimée', 'Menace principale', 'Indice sensibilité (1-5)'],
          rows: [
            ['', 'Mammifères', '', '', 0, '', 0],
            ['', 'Oiseaux', '', '', 0, '', 0],
            ['', 'Reptiles', '', '', 0, '', 0],
            ['', 'Amphibiens', '', '', 0, '', 0],
            ['', 'Poissons', '', '', 0, '', 0],
            ['', 'Flore endémique', '', '', 0, '', 0],
            ['', 'Invertébrés', '', '', 0, '', 0],
            ['', 'Flore menacée', '', '', 0, '', 0],
            ['', 'Espèces patrimoniales', '', '', 0, '', 0],
            ['', 'Espèces exotiques envahissantes', '', '', 0, '', 0],
          ],
          totalsRow: false,
          colWidths: [26, 22, 16, 22, 20, 26, 22],
        },
        {
          name: 'Plan Actions',
          title: 'Plan d\'Actions Biodiversité',
          colorHeader: '388E3C',
          headers: ['Action de conservation', 'Espèce / Habitat ciblé', 'Responsable', 'Budget (FCFA)', 'Délai', 'Indicateur', 'Résultat attendu'],
          rows: [
            ['', '', '', 0, '', '', ''],
            ['', '', '', 0, '', '', ''],
            ['', '', '', 0, '', '', ''],
            ['', '', '', 0, '', '', ''],
            ['', '', '', 0, '', '', ''],
            ['', '', '', 0, '', '', ''],
            ['TOTAL BUDGET', '', '', '=SUM(D2:D7)', '', '', ''],
          ],
          totalsRow: true,
          colWidths: [30, 26, 20, 18, 14, 24, 26],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  // 15. xl_env_eie_suivi — Suivi PGES
  {
    code: 'xl_env_eie_suivi',
    name: 'Suivi PGES (Plan de Gestion Environnementale)',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Mesures environnementales et sociales : responsable, calendrier, indicateur et taux de réalisation',
    price: 1200, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'maitre_ouvrage', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { name: 'periode', label: 'Période de suivi', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi PGES',
          title: 'Suivi du Plan de Gestion Environnementale et Sociale',
          colorHeader: '2E7D32',
          headers: ['N°', 'Mesure environnementale / sociale', 'Impact visé', 'Responsable', 'Calendrier', 'Coût prévu (FCFA)', 'Indicateur de suivi', 'Valeur cible', 'Valeur réalisée', 'Taux réalisation %', 'Statut'],
          rows: [
            [1, 'Gestion des déblais et remblais', 'Sol', '', 'Phase travaux', 0, 'Zones de dépôt conformes', '', '', '=IFERROR(I{r}/H{r}*100,0)', '=IF(J{r}>=80,"OK","À améliorer")'],
            [2, 'Protection des cours d\'eau', 'Eau', '', 'Phase travaux', 0, 'Aucun rejet direct', '', '', '=IFERROR(I{r}/H{r}*100,0)', '=IF(J{r}>=80,"OK","À améliorer")'],
            [3, 'Gestion des déchets de chantier', 'Déchets', '', 'Phase travaux', 0, 'Déchets triés et évacués', '', '', '=IFERROR(I{r}/H{r}*100,0)', '=IF(J{r}>=80,"OK","À améliorer")'],
            [4, 'Lutte anti-poussière', 'Air', '', 'Phase travaux', 0, 'Arrosage régulier', '', '', '=IFERROR(I{r}/H{r}*100,0)', '=IF(J{r}>=80,"OK","À améliorer")'],
            [5, 'Sensibilisation communautaire', 'Social', '', 'Phase travaux', 0, 'Sessions réalisées', '', '', '=IFERROR(I{r}/H{r}*100,0)', '=IF(J{r}>=80,"OK","À améliorer")'],
            [6, 'Reboisement compensatoire', 'Végétation', '', 'Phase réhabilitation', 0, 'Plants mis en terre', '', '', '=IFERROR(I{r}/H{r}*100,0)', '=IF(J{r}>=80,"OK","À améliorer")'],
            [7, 'Surveillance qualité eau', 'Eau', '', 'Phase exploitation', 0, 'Analyses conformes', '', '', '=IFERROR(I{r}/H{r}*100,0)', '=IF(J{r}>=80,"OK","À améliorer")'],
            [8, 'Gestion faune & biodiversité', 'Biodiversité', '', 'Phase travaux', 0, 'Plan sauvegarde appliqué', '', '', '=IFERROR(I{r}/H{r}*100,0)', '=IF(J{r}>=80,"OK","À améliorer")'],
            ['TOTAL', '', '', '', '', '=SUM(F2:F9)', '', '', '', '', ''],
          ],
          totalsRow: true,
          colWidths: [6, 38, 18, 18, 20, 20, 30, 18, 18, 18, 16],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  // 16. xl_env_reboisement — Suivi reboisement
  {
    code: 'xl_env_reboisement',
    name: 'Suivi reboisement',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Espèces plantées, plants produits, mis en terre, taux de survie et surface reboisée',
    price: 700, priceMax: 1200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Nom du projet de reboisement', type: 'text', required: true },
      { name: 'zone', label: 'Zone / localité', type: 'text', required: true },
      { name: 'annee', label: 'Année', type: 'text', required: true },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi Reboisement',
          title: 'Suivi du Reboisement',
          colorHeader: '2E7D32',
          headers: ['Espèce', 'Famille', 'Plants produits', 'Plants mis en terre', 'Plants survivants', 'Taux survie %', 'Surface plantée (ha)', 'Densité (plants/ha)'],
          rows: [
            ['Teck (Tectona grandis)', 'Lamiaceae', 0, 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR(D{r}/G{r},0)'],
            ['Eucalyptus', 'Myrtaceae', 0, 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR(D{r}/G{r},0)'],
            ['Acacia', 'Fabaceae', 0, 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR(D{r}/G{r},0)'],
            ['Karité (Vitellaria paradoxa)', 'Sapotaceae', 0, 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR(D{r}/G{r},0)'],
            ['Néré (Parkia biglobosa)', 'Fabaceae', 0, 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR(D{r}/G{r},0)'],
            ['Moringa oleifera', 'Moringaceae', 0, 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR(D{r}/G{r},0)'],
            ['Gmelina arborea', 'Lamiaceae', 0, 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR(D{r}/G{r},0)'],
            ['Autres espèces locales', '', 0, 0, 0, '=IFERROR(E{r}/D{r}*100,0)', 0, '=IFERROR(D{r}/G{r},0)'],
            ['TOTAL', '', '=SUM(C2:C9)', '=SUM(D2:D9)', '=SUM(E2:E9)', '=IFERROR(E10/D10*100,0)', '=SUM(G2:G9)', '=IFERROR(D10/G10,0)'],
          ],
          totalsRow: true,
          colWidths: [28, 16, 18, 20, 20, 14, 22, 18],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  // 17. xl_env_qualite_eau — Analyses qualité eau
  {
    code: 'xl_env_qualite_eau',
    name: 'Analyses qualité eau',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Résultats d\'analyses par points de prélèvement : paramètres, valeurs mesurées, normes et conformité',
    price: 900, priceMax: 1400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_projet', label: 'Projet / programme', type: 'text', required: true },
      { name: 'date_analyse', label: 'Date des analyses', type: 'date', required: true },
      { name: 'laboratoire', label: 'Laboratoire d\'analyse', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Qualité Eau',
          title: 'Analyses Qualité Eau',
          colorHeader: '2E7D32',
          headers: ['Point de prélèvement', 'Paramètre', 'Valeur mesurée', 'Unité', 'Norme OMS / nationale', 'Conformité', 'Observation'],
          rows: [
            ['', 'pH', 0, '', '6.5 - 8.5', '=IF(AND(C{r}>=6.5,C{r}<=8.5),"Conforme","NON CONFORME")', ''],
            ['', 'Turbidité', 0, 'NTU', 5, '=IF(C{r}<=F{r},"Conforme","NON CONFORME")', ''],
            ['', 'Conductivité', 0, 'µS/cm', 1500, '=IF(C{r}<=F{r},"Conforme","NON CONFORME")', ''],
            ['', 'Coliformes fécaux', 0, 'UFC/100mL', 0, '=IF(C{r}<=F{r},"Conforme","NON CONFORME")', ''],
            ['', 'E. coli', 0, 'UFC/100mL', 0, '=IF(C{r}<=F{r},"Conforme","NON CONFORME")', ''],
            ['', 'Nitrates (NO3-)', 0, 'mg/L', 50, '=IF(C{r}<=F{r},"Conforme","NON CONFORME")', ''],
            ['', 'Nitrites (NO2-)', 0, 'mg/L', 3, '=IF(C{r}<=F{r},"Conforme","NON CONFORME")', ''],
            ['', 'Fer total', 0, 'mg/L', 0.3, '=IF(C{r}<=F{r},"Conforme","NON CONFORME")', ''],
            ['', 'Arsenic', 0, 'mg/L', 0.01, '=IF(C{r}<=F{r},"Conforme","NON CONFORME")', ''],
            ['', 'Fluorures', 0, 'mg/L', 1.5, '=IF(C{r}<=F{r},"Conforme","NON CONFORME")', ''],
          ],
          totalsRow: false,
          colWidths: [26, 24, 18, 12, 24, 22, 24],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 63,
  },

  // 18. xl_env_sols_contamines — Inventaire sites contaminés
  {
    code: 'xl_env_sols_contamines',
    name: 'Inventaire sites contaminés',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Répertoire des sites contaminés : contaminants, superficie, niveau de risque et actions de dépollution',
    price: 1200, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'pays_region', label: 'Pays / Région', type: 'text', required: true },
      { name: 'annee', label: 'Année d\'inventaire', type: 'text', required: true },
      { name: 'responsable', label: 'Responsable technique', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Sites Contaminés',
          title: 'Inventaire Sites et Sols Contaminés',
          colorHeader: '2E7D32',
          headers: ['Nom du site', 'Commune / localité', 'Activité source', 'Contaminants', 'Superficie (ha)', 'Profondeur atteinte (m)', 'Niveau risque (1-5)', 'Coût dépollution estimé (FCFA)', 'Actions engagées', 'Statut'],
          rows: [
            ['', '', 'Ancienne station-service', 'Hydrocarbures', 0, 0, 3, 0, '', 'En cours'],
            ['', '', 'Décharge non contrôlée', 'Métaux lourds, lixiviats', 0, 0, 4, 0, '', 'Inventorié'],
            ['', '', 'Site industriel', 'Solvants chlorés', 0, 0, 0, 0, '', 'Inventorié'],
            ['', '', 'Agriculture intensive', 'Pesticides', 0, 0, 0, 0, '', 'Inventorié'],
            ['', '', 'Site minier', 'Métaux lourds, cyanures', 0, 0, 0, 0, '', 'Inventorié'],
            ['', '', 'Tannerie', 'Chrome, sulfures', 0, 0, 0, 0, '', 'Inventorié'],
            ['', '', 'Atelier peinture', 'Plomb, solvants', 0, 0, 0, 0, '', 'Inventorié'],
            ['TOTAL', '', '', '', '=SUM(E2:E8)', '', '', '=SUM(H2:H8)', '', ''],
          ],
          totalsRow: true,
          colWidths: [22, 20, 24, 22, 16, 22, 18, 28, 24, 14],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 56,
  },

  // 19. xl_env_certification_iso14001 — Suivi certification ISO 14001
  {
    code: 'xl_env_certification_iso14001',
    name: 'Suivi certification ISO 14001',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Exigences ISO 14001, niveau de conformité, preuves documentaires, actions correctives et statut',
    price: 1200, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_audit', label: 'Date d\'audit interne', type: 'date', required: true },
      { name: 'auditeur', label: 'Auditeur interne', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Suivi ISO 14001',
          title: 'Suivi Certification ISO 14001:2015',
          colorHeader: '2E7D32',
          headers: ['Chapitre ISO', 'Exigence', 'Niveau conformité (0-3)', 'Preuves / documents', 'Écarts identifiés', 'Actions correctives', 'Responsable', 'Délai', 'Statut'],
          rows: [
            ['4 - Contexte', 'Enjeux internes et externes (4.1)', 0, '', '', '', '', '', '=IF(C{r}=3,"Conforme",IF(C{r}>=1,"Partiel","Non conforme"))'],
            ['4 - Contexte', 'Parties intéressées (4.2)', 0, '', '', '', '', '', '=IF(C{r}=3,"Conforme",IF(C{r}>=1,"Partiel","Non conforme"))'],
            ['5 - Leadership', 'Politique environnementale (5.2)', 0, '', '', '', '', '', '=IF(C{r}=3,"Conforme",IF(C{r}>=1,"Partiel","Non conforme"))'],
            ['6 - Planification', 'Aspects environnementaux (6.1.2)', 0, '', '', '', '', '', '=IF(C{r}=3,"Conforme",IF(C{r}>=1,"Partiel","Non conforme"))'],
            ['6 - Planification', 'Objectifs environnementaux (6.2)', 0, '', '', '', '', '', '=IF(C{r}=3,"Conforme",IF(C{r}>=1,"Partiel","Non conforme"))'],
            ['7 - Support', 'Compétences et sensibilisation (7.2/7.3)', 0, '', '', '', '', '', '=IF(C{r}=3,"Conforme",IF(C{r}>=1,"Partiel","Non conforme"))'],
            ['8 - Réalisation', 'Maîtrise opérationnelle (8.1)', 0, '', '', '', '', '', '=IF(C{r}=3,"Conforme",IF(C{r}>=1,"Partiel","Non conforme"))'],
            ['9 - Évaluation', 'Surveillance et mesure (9.1)', 0, '', '', '', '', '', '=IF(C{r}=3,"Conforme",IF(C{r}>=1,"Partiel","Non conforme"))'],
            ['9 - Évaluation', 'Audit interne (9.2)', 0, '', '', '', '', '', '=IF(C{r}=3,"Conforme",IF(C{r}>=1,"Partiel","Non conforme"))'],
            ['10 - Amélioration', 'Non-conformités et actions correctives (10.2)', 0, '', '', '', '', '', '=IF(C{r}=3,"Conforme",IF(C{r}>=1,"Partiel","Non conforme"))'],
            ['SCORE GLOBAL', '', '=SUM(C2:C11)', '', '', '', '', '', '=IFERROR(C12/30*100,0)&"% de conformité"'],
          ],
          totalsRow: false,
          colWidths: [22, 40, 22, 24, 24, 28, 18, 14, 20],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 59,
  },

  // 20. xl_env_compensation_carbone — Plan compensation carbone
  {
    code: 'xl_env_compensation_carbone',
    name: 'Plan compensation carbone',
    category: 'agro_environnement',
    templateType: 'excel',
    formatsJson: '["xlsx"]',
    description: 'Émissions résiduelles, projets de compensation, crédits carbone, coût et bilan net',
    price: 1200, priceMax: 1500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année de référence', type: 'text', required: true },
      { name: 'objectif_neutralite', label: 'Objectif neutralité carbone', type: 'text', required: false },
    ]),
    body: JSON.stringify({
      sheets: [
        {
          name: 'Émissions',
          title: 'Inventaire Émissions & Réductions',
          colorHeader: '2E7D32',
          headers: ['Scope', 'Source', 'Émissions brutes (tCO2eq)', 'Réductions internes (tCO2eq)', 'Émissions nettes (tCO2eq)'],
          rows: [
            ['Scope 1', 'Combustion directe', 0, 0, '=C{r}-D{r}'],
            ['Scope 1', 'Fuites frigorigènes', 0, 0, '=C{r}-D{r}'],
            ['Scope 2', 'Électricité achetée', 0, 0, '=C{r}-D{r}'],
            ['Scope 3', 'Chaîne d\'approvisionnement', 0, 0, '=C{r}-D{r}'],
            ['Scope 3', 'Déplacements professionnels', 0, 0, '=C{r}-D{r}'],
            ['TOTAL', '', '=SUM(C2:C6)', '=SUM(D2:D6)', '=SUM(E2:E6)'],
          ],
          totalsRow: true,
          colWidths: [12, 30, 26, 26, 24],
        },
        {
          name: 'Compensation',
          title: 'Plan de Compensation Carbone',
          colorHeader: '388E3C',
          headers: ['Projet de compensation', 'Type', 'Localisation', 'Crédits carbone (tCO2eq)', 'Prix/crédit (FCFA)', 'Coût total (FCFA)', 'Standard certification', 'Statut'],
          rows: [
            ['', 'Reboisement REDD+', '', 0, 0, '=D{r}*E{r}', 'Gold Standard', 'En cours'],
            ['', 'Énergie renouvelable', '', 0, 0, '=D{r}*E{r}', 'VCS', 'Validé'],
            ['', 'Biogaz ménager', '', 0, 0, '=D{r}*E{r}', 'CDM', 'Validé'],
            ['', 'Efficacité énergétique', '', 0, 0, '=D{r}*E{r}', 'VCS', 'En cours'],
            ['TOTAL CRÉDITS', '', '', '=SUM(D2:D5)', '', '=SUM(F2:F5)', '', ''],
            ['BILAN CARBONE NET (tCO2eq)', '', '', '=\'Émissions\'!E7-D7', '', '', '', ''],
          ],
          totalsRow: false,
          colWidths: [28, 22, 18, 22, 18, 20, 20, 12],
        },
      ],
    }),
    countriesJson: COUNTRIES, active: true, popularity: 61,
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
  console.log(`✅ Excel Énergie/Env: ${created} créés — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
