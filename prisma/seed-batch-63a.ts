import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── PÉTROLE / GAZ (25 templates) ───────────────────────────────────────────
  {
    code: 'petr2_psc',
    name: "Contrat de Partage de Production (PSC/PSA)",
    category: 'commercial_financier',
    price: 35000, priceMax: 120000,
    description: "Contrat de partage de production entre un Etat africain et une compagnie pétrolière internationale, conforme aux pratiques OHADA et PETROCI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      { key: 'compagnie', label: "Nom de la compagnie pétrolière", type: 'text', required: true },
      { key: 'bloc', label: "Désignation du bloc pétrolier", type: 'text', required: true },
      { key: 'duree_exploration', label: "Durée phase exploration (années)", type: 'text', required: true },
      { key: 'part_etat', label: "Part de l'Etat sur profit oil (%)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PARTAGE DE PRODUCTION</h1><p>Entre l'Etat de Côte d'Ivoire, représenté par le Ministre des Hydrocarbures, et <strong>{{compagnie}}</strong>, ci-après dénommée le Contractant.</p><h2>Article 1 — Objet</h2><p>Le présent Contrat de Partage de Production (PSA) porte sur le <strong>Bloc {{bloc}}</strong> tel que délimité en annexe cartographique.</p><h2>Article 2 — Durée</h2><p>La phase d'exploration est fixée à <strong>{{duree_exploration}}</strong> ans à compter de la date d'entrée en vigueur.</p><h2>Article 3 — Partage du Profit Oil</h2><p>L'Etat perçoit <strong>{{part_etat}} %</strong> du profit oil après déduction du cost oil conformément aux modalités de l'annexe fiscale.</p><h2>Article 4 — Entrée en vigueur</h2><p>Signé le <strong>{{date_signature}}</strong>.</p></div>` },

  {
    code: 'petr2_concession',
    name: "Accord de Concession Pétrolière",
    category: 'commercial_financier',
    price: 30000, priceMax: 95000,
    description: "Accord de concession octroyant des droits exclusifs d'exploration et d'exploitation d'hydrocarbures sur un périmètre défini.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      { key: 'titulaire', label: "Titulaire de la concession", type: 'text', required: true },
      { key: 'perimetre', label: "Périmètre de la concession", type: 'text', required: true },
      { key: 'redevance', label: "Taux de redevance superficiaire (FCFA/km²)", type: 'text', required: true },
      { key: 'date_octroi', label: "Date d'octroi", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCESSION PÉTROLIÈRE</h1><p>L'Etat concède à <strong>{{titulaire}}</strong> des droits exclusifs sur le périmètre <strong>{{perimetre}}</strong>.</p><h2>Article 1 — Droits accordés</h2><p>Le titulaire est autorisé à mener toutes opérations d'exploration, d'appréciation, de développement et de production d'hydrocarbures.</p><h2>Article 2 — Redevance</h2><p>La redevance superficiaire est fixée à <strong>{{redevance}}</strong> FCFA par km² par an, révisable annuellement.</p><h2>Article 3 — Date d'effet</h2><p>Concession octroyée le <strong>{{date_octroi}}</strong>.</p></div>` },

  {
    code: 'petr2_licence_exploration',
    name: "Accord de Licence d'Exploration Pétrolière",
    category: 'commercial_financier',
    price: 25000, priceMax: 80000,
    description: "Licence autorisant des travaux géologiques et géophysiques préliminaires sur un bloc offshore ou onshore en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'operateur', label: "Société opératrice", type: 'text', required: true },
      { key: 'superficie', label: "Superficie du bloc (km²)", type: 'text', required: true },
      { key: 'programme_min', label: "Programme de travaux minimum", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE D'EXPLORATION</h1><p>Licence accordée à <strong>{{operateur}}</strong> pour explorer une superficie de <strong>{{superficie}}</strong> km².</p><h2>Article 1 — Programme minimum</h2><p>{{programme_min}}</p><h2>Article 2 — Obligations financières</h2><p>Le titulaire s'engage à réaliser les dépenses minimales prévues à l'annexe budgétaire.</p><h2>Article 3 — Prise d'effet</h2><p>La présente licence prend effet le <strong>{{date_debut}}</strong>.</p></div>` },

  {
    code: 'petr2_joa',
    name: "Accord de Joint Operating Agreement (JOA)",
    category: 'commercial_financier',
    price: 28000, priceMax: 90000,
    description: "Accord régissant les droits et obligations des coparticipants dans les opérations pétrolières conjointes sur un bloc donné.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      { key: 'operateur_designe', label: "Opérateur désigné", type: 'text', required: true },
      { key: 'coparticipants', label: "Liste des coparticipants et parts (%)", type: 'textarea', required: true },
      { key: 'bloc_reference', label: "Référence du bloc", type: 'text', required: true },
      { key: 'date_joa', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>JOINT OPERATING AGREEMENT (JOA)</h1><p>Conclu entre les parties dont <strong>{{operateur_designe}}</strong> agit en qualité d'opérateur désigné.</p><h2>Article 1 — Coparticipants</h2><p>{{coparticipants}}</p><h2>Article 2 — Bloc</h2><p>Le présent JOA porte sur le bloc <strong>{{bloc_reference}}</strong>.</p><h2>Article 3 — Responsabilité de l'opérateur</h2><p>L'opérateur mène les opérations pétrolières au nom et pour le compte de l'ensemble des coparticipants, conformément au programme de travaux approuvé.</p><h2>Article 4 — Date</h2><p>Signé le <strong>{{date_joa}}</strong>.</p></div>` },

  {
    code: 'petr2_unitisation',
    name: "Accord de Unitisation de Gisement",
    category: 'commercial_financier',
    price: 32000, priceMax: 100000,
    description: "Accord de mise en commun d'un gisement transfrontalier ou chevauchant plusieurs blocs pétroliers.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'parties', label: "Parties à l'accord (noms et titres)", type: 'textarea', required: true },
      { key: 'gisement', label: "Nom/référence du gisement", type: 'text', required: true },
      { key: 'facteur_participation', label: "Facteurs de participation unitisée (%)", type: 'textarea', required: true },
      { key: 'date_effet', label: "Date d'effet", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE UNITISATION DE GISEMENT</h1><h2>Article 1 — Parties</h2><p>{{parties}}</p><h2>Article 2 — Gisement concerné</h2><p>Le gisement <strong>{{gisement}}</strong> fait l'objet du présent accord de unitisation.</p><h2>Article 3 — Facteurs de participation</h2><p>{{facteur_participation}}</p><h2>Article 4 — Entrée en vigueur</h2><p>Le présent accord prend effet le <strong>{{date_effet}}</strong>.</p></div>` },

  {
    code: 'petr2_forage',
    name: "Accord de Service de Forage Pétrolier",
    category: 'commercial_financier',
    price: 20000, priceMax: 65000,
    description: "Contrat de service pour la réalisation de forages pétroliers exploratoires ou de développement, incluant la fourniture d'équipements et de personnels spécialisés.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'prestataire_forage', label: "Société de forage prestataire", type: 'text', required: true },
      { key: 'client_operateur', label: "Société opératrice cliente", type: 'text', required: true },
      { key: 'nombre_puits', label: "Nombre de puits à forer", type: 'text', required: true },
      { key: 'tarif_journalier', label: "Tarif journalier de location rig (USD)", type: 'text', required: true },
      { key: 'date_mobilisation', label: "Date de mobilisation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE FORAGE PÉTROLIER</h1><p>Entre <strong>{{client_operateur}}</strong> (ci-après le Client) et <strong>{{prestataire_forage}}</strong> (ci-après le Prestataire).</p><h2>Article 1 — Objet</h2><p>Le Prestataire s'engage à forer <strong>{{nombre_puits}}</strong> puits conformément aux spécifications techniques annexées.</p><h2>Article 2 — Rémunération</h2><p>Le tarif journalier de location du rig est fixé à <strong>{{tarif_journalier}}</strong> USD, hors coûts variables.</p><h2>Article 3 — Mobilisation</h2><p>La mobilisation est prévue le <strong>{{date_mobilisation}}</strong>.</p></div>` },

  {
    code: 'petr2_completion',
    name: "Accord de Service de Complétion de Puits",
    category: 'commercial_financier',
    price: 18000, priceMax: 55000,
    description: "Contrat de service pour les opérations de complétion de puits pétroliers, incluant la pose de colonnes de production et d'équipements de tête de puits.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'prestataire', label: "Société prestataire de complétion", type: 'text', required: true },
      { key: 'puits_reference', label: "Référence du puits", type: 'text', required: true },
      { key: 'programme_completion', label: "Programme de complétion retenu", type: 'textarea', required: true },
      { key: 'date_debut_ops', label: "Date de début des opérations", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPLÉTION DE PUITS</h1><p>Prestataire : <strong>{{prestataire}}</strong> — Puits : <strong>{{puits_reference}}</strong>.</p><h2>Article 1 — Programme</h2><p>{{programme_completion}}</p><h2>Article 2 — Garanties</h2><p>Le Prestataire garantit la conformité des travaux aux normes API et aux spécifications du Client.</p><h2>Article 3 — Délai</h2><p>Opérations débutant le <strong>{{date_debut_ops}}</strong>.</p></div>` },

  {
    code: 'petr2_stimulation',
    name: "Accord de Service de Stimulation de Puits (Fracturation)",
    category: 'commercial_financier',
    price: 22000, priceMax: 70000,
    description: "Contrat de prestation pour les opérations de stimulation de puits par fracturation hydraulique ou acidification, visant à améliorer les débits de production.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'prestataire_stimulation', label: "Société de stimulation prestataire", type: 'text', required: true },
      { key: 'puits_cible', label: "Puits cible de la stimulation", type: 'text', required: true },
      { key: 'methode', label: "Méthode de stimulation retenue", type: 'text', required: true },
      { key: 'debit_objectif', label: "Débit de production objectif (bbl/jour)", type: 'text', required: true },
      { key: 'date_operation', label: "Date d'opération prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STIMULATION DE PUITS</h1><p>Prestataire : <strong>{{prestataire_stimulation}}</strong> — Puits cible : <strong>{{puits_cible}}</strong>.</p><h2>Article 1 — Méthode</h2><p>La stimulation sera réalisée par <strong>{{methode}}</strong> conformément au design technique validé.</p><h2>Article 2 — Objectif de production</h2><p>Débit objectif post-stimulation : <strong>{{debit_objectif}}</strong> bbl/jour.</p><h2>Article 3 — Planning</h2><p>Opération prévue le <strong>{{date_operation}}</strong>.</p></div>` },

  {
    code: 'petr2_production_brute',
    name: "Accord de Service de Production de Pétrole Brut",
    category: 'commercial_financier',
    price: 20000, priceMax: 62000,
    description: "Contrat de service couvrant la production, le traitement et la stabilisation du pétrole brut sur installation fixe ou flottante (FPSO).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'operateur_production', label: "Opérateur de production", type: 'text', required: true },
      { key: 'installation', label: "Nom de l'installation (plateforme/FPSO)", type: 'text', required: true },
      { key: 'capacite_traitement', label: "Capacité de traitement (bbl/jour)", type: 'text', required: true },
      { key: 'date_premiere_huile', label: "Date de première huile prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE PÉTROLE BRUT</h1><p>Opérateur : <strong>{{operateur_production}}</strong> — Installation : <strong>{{installation}}</strong>.</p><h2>Article 1 — Capacité</h2><p>La capacité de traitement est de <strong>{{capacite_traitement}}</strong> bbl/jour.</p><h2>Article 2 — Qualité du brut</h2><p>Le brut produit devra respecter les spécifications API et BS&W contractuelles.</p><h2>Article 3 — Première huile</h2><p>Date de première huile prévue : <strong>{{date_premiere_huile}}</strong>.</p></div>` },

  {
    code: 'petr2_pipeline',
    name: "Accord de Service de Pipeline (Transport de Brut)",
    category: 'commercial_financier',
    price: 25000, priceMax: 78000,
    description: "Contrat de transport de pétrole brut par pipeline, incluant les termes de tarification, d'accès des tiers et de responsabilité en cas de déversement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      { key: 'gestionnaire_pipeline', label: "Gestionnaire du pipeline", type: 'text', required: true },
      { key: 'expediteur', label: "Expéditeur (shipper)", type: 'text', required: true },
      { key: 'capacite_nominale', label: "Capacité nominale (bbl/jour)", type: 'text', required: true },
      { key: 'tarif_transport', label: "Tarif de transport (USD/bbl)", type: 'text', required: true },
      { key: 'date_contrat', label: "Date du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PIPELINE</h1><p>Gestionnaire : <strong>{{gestionnaire_pipeline}}</strong> — Expéditeur : <strong>{{expediteur}}</strong>.</p><h2>Article 1 — Capacité</h2><p>Capacité nominale allouée : <strong>{{capacite_nominale}}</strong> bbl/jour.</p><h2>Article 2 — Tarification</h2><p>Tarif de transport : <strong>{{tarif_transport}}</strong> USD par baril transporté.</p><h2>Article 3 — Responsabilités</h2><p>En cas de déversement accidentel, la responsabilité du gestionnaire est engagée conformément aux dispositions de l'annexe environnementale.</p><h2>Article 4 — Date</h2><p>Contrat conclu le <strong>{{date_contrat}}</strong>.</p></div>` },

  {
    code: 'petr2_stockage',
    name: "Accord de Service de Stockage Pétrole (Terminal Pétrolier)",
    category: 'commercial_financier',
    price: 18000, priceMax: 55000,
    description: "Contrat de stockage de pétrole brut ou produits raffinés dans un terminal pétrolier, avec gestion des cuves, mesures et opérations de chargement/déchargement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'terminal', label: "Nom du terminal pétrolier", type: 'text', required: true },
      { key: 'client_stockage', label: "Client bénéficiaire du stockage", type: 'text', required: true },
      { key: 'capacite_cuve', label: "Capacité de stockage allouée (m³)", type: 'text', required: true },
      { key: 'tarif_stockage', label: "Tarif de stockage (FCFA/m³/mois)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STOCKAGE PÉTROLIER</h1><p>Terminal : <strong>{{terminal}}</strong> — Client : <strong>{{client_stockage}}</strong>.</p><h2>Article 1 — Capacité allouée</h2><p>Capacité de stockage : <strong>{{capacite_cuve}}</strong> m³ réservés exclusivement au Client.</p><h2>Article 2 — Tarif</h2><p>Tarif mensuel : <strong>{{tarif_stockage}}</strong> FCFA par m³ stocké.</p><h2>Article 3 — Opérations</h2><p>Les opérations de réception, mesurage et expédition seront effectuées conformément aux normes ASTM et à la réglementation douanière ivoirienne.</p></div>` },

  {
    code: 'petr2_raffinage',
    name: "Accord de Service de Raffinage (Toll Processing)",
    category: 'commercial_financier',
    price: 22000, priceMax: 68000,
    description: "Contrat de prestation de raffinage à façon (toll refining), dans lequel le propriétaire du brut confie le traitement à une raffinerie partenaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'raffinerie', label: "Nom de la raffinerie", type: 'text', required: true },
      { key: 'proprietaire_brut', label: "Propriétaire du brut", type: 'text', required: true },
      { key: 'volume_mensuel', label: "Volume mensuel confié (bbl)", type: 'text', required: true },
      { key: 'frais_processing', label: "Frais de processing (USD/bbl)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RAFFINAGE À FAÇON</h1><p>Raffinerie : <strong>{{raffinerie}}</strong> — Propriétaire du brut : <strong>{{proprietaire_brut}}</strong>.</p><h2>Article 1 — Volume</h2><p>Volume mensuel confié au traitement : <strong>{{volume_mensuel}}</strong> barils.</p><h2>Article 2 — Frais de processing</h2><p>Frais de toll refining : <strong>{{frais_processing}}</strong> USD par baril traité.</p><h2>Article 3 — Rendement</h2><p>Le plan de rendement (yield plan) est établi en annexe technique et constitue la base de comptabilisation des produits finis restitués.</p></div>` },

  {
    code: 'petr2_vente_brut',
    name: "Accord de Vente de Pétrole Brut (Crude Oil Sale Agreement)",
    category: 'commercial_financier',
    price: 28000, priceMax: 88000,
    description: "Contrat de vente de pétrole brut entre un producteur et un acheteur international, avec formule de prix indexée sur un brut de référence (Brent ou WTI).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      { key: 'vendeur', label: "Vendeur (producteur)", type: 'text', required: true },
      { key: 'acheteur', label: "Acheteur (trader ou raffineur)", type: 'text', required: true },
      { key: 'volume_contractuel', label: "Volume contractuel (bbl/mois)", type: 'text', required: true },
      { key: 'formule_prix', label: "Formule de prix (ex: Brent -2 USD)", type: 'text', required: true },
      { key: 'port_chargement', label: "Port de chargement", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CRUDE OIL SALE AGREEMENT</h1><p>Vendeur : <strong>{{vendeur}}</strong> — Acheteur : <strong>{{acheteur}}</strong>.</p><h2>Article 1 — Volume</h2><p>Volume contractuel : <strong>{{volume_contractuel}}</strong> barils par mois sur la durée du contrat.</p><h2>Article 2 — Prix</h2><p>Prix = <strong>{{formule_prix}}</strong>, calculé sur la moyenne des cotations des cinq jours ouvrables précédant la date de chargement.</p><h2>Article 3 — Livraison</h2><p>Livraison FOB au port de <strong>{{port_chargement}}</strong>. Transfert du titre et des risques au moment du passage du manifold du navire.</p></div>` },

  {
    code: 'petr2_distribution',
    name: "Accord de Service de Distribution de Produits Pétroliers",
    category: 'commercial_financier',
    price: 15000, priceMax: 45000,
    description: "Contrat de distribution de carburants et lubrifiants entre un distributeur agréé et un réseau de points de vente en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'distributeur', label: "Distributeur agréé", type: 'text', required: true },
      { key: 'territoire', label: "Territoire de distribution", type: 'text', required: true },
      { key: 'produits', label: "Produits couverts (super, gasoil, etc.)", type: 'textarea', required: true },
      { key: 'volume_minimum', label: "Volume minimum mensuel (litres)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION DE PRODUITS PÉTROLIERS</h1><p>Distributeur : <strong>{{distributeur}}</strong> — Territoire : <strong>{{territoire}}</strong>.</p><h2>Article 1 — Produits</h2><p>{{produits}}</p><h2>Article 2 — Volume minimum</h2><p>Le distributeur s'engage à enlever un minimum de <strong>{{volume_minimum}}</strong> litres par mois.</p><h2>Article 3 — Prix de cession</h2><p>Les prix de cession sont fixés conformément à la structure officielle des prix publiée par le PETROCI et révisable mensuellement.</p></div>` },

  {
    code: 'petr2_gerance_station',
    name: "Accord de Service de Station-Service (Gérance)",
    category: 'commercial_financier',
    price: 12000, priceMax: 36000,
    description: "Contrat de gérance d'une station-service entre une compagnie pétrolière propriétaire et un gérant indépendant, définissant les conditions d'exploitation et de rémunération.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'compagnie_mandante', label: "Compagnie mandante", type: 'text', required: true },
      { key: 'gerant', label: "Nom du gérant", type: 'text', required: true },
      { key: 'adresse_station', label: "Adresse de la station", type: 'text', required: true },
      { key: 'commission_litre', label: "Commission du gérant (FCFA/litre)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GÉRANCE DE STATION-SERVICE</h1><p>Mandant : <strong>{{compagnie_mandante}}</strong> — Gérant : <strong>{{gerant}}</strong>.</p><h2>Article 1 — Station concernée</h2><p>La station objet du présent contrat est située à <strong>{{adresse_station}}</strong>.</p><h2>Article 2 — Rémunération</h2><p>Le gérant perçoit une commission de <strong>{{commission_litre}}</strong> FCFA par litre de carburant vendu.</p><h2>Article 3 — Obligations du gérant</h2><p>Le gérant s'engage à respecter les standards qualité, sécurité et image de marque de la compagnie mandante, à tenir une comptabilité séparée et à transmettre les rapports de vente hebdomadaires.</p></div>` },

  {
    code: 'petr2_lubrifiants',
    name: "Accord de Service de Lubrifiants Industriels",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Contrat de fourniture et de service de lubrifiants industriels pour les équipements miniers, industriels ou de production pétrolière.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'fournisseur_lubrifiant', label: "Fournisseur de lubrifiants", type: 'text', required: true },
      { key: 'client_industriel', label: "Client industriel", type: 'text', required: true },
      { key: 'gamme_produits', label: "Gamme de produits (grades et spécifications)", type: 'textarea', required: true },
      { key: 'delai_livraison', label: "Délai de livraison (jours)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LUBRIFIANTS INDUSTRIELS</h1><p>Fournisseur : <strong>{{fournisseur_lubrifiant}}</strong> — Client : <strong>{{client_industriel}}</strong>.</p><h2>Article 1 — Produits</h2><p>{{gamme_produits}}</p><h2>Article 2 — Livraison</h2><p>Délai de livraison garanti : <strong>{{delai_livraison}}</strong> jours ouvrés après réception de la commande.</p><h2>Article 3 — Assistance technique</h2><p>Le fournisseur assure une assistance technique gratuite pour la sélection et l'optimisation des lubrifiants, incluant des visites de lubrification préventive trimestrielles.</p></div>` },

  {
    code: 'petr2_partenariat_petroci',
    name: "Accord de Partenariat PETROCI - Compagnie Internationale",
    category: 'commercial_financier',
    price: 30000, priceMax: 95000,
    description: "Accord-cadre de partenariat stratégique entre PETROCI (Société Nationale d'Opérations Pétrolières de la Côte d'Ivoire) et une major pétrolière internationale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      { key: 'partenaire_international', label: "Compagnie internationale partenaire", type: 'text', required: true },
      { key: 'domaines_partenariat', label: "Domaines de partenariat", type: 'textarea', required: true },
      { key: 'apport_petroci', label: "Apport de PETROCI", type: 'textarea', required: true },
      { key: 'duree_partenariat', label: "Durée du partenariat (années)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PETROCI - COMPAGNIE INTERNATIONALE</h1><p>Partenaire : <strong>{{partenaire_international}}</strong> et PETROCI, Société Nationale d'Opérations Pétrolières.</p><h2>Article 1 — Domaines de coopération</h2><p>{{domaines_partenariat}}</p><h2>Article 2 — Apports de PETROCI</h2><p>{{apport_petroci}}</p><h2>Article 3 — Durée</h2><p>Partenariat établi pour une durée de <strong>{{duree_partenariat}}</strong> ans, renouvelable par accord exprès des parties.</p></div>` },

  {
    code: 'petr2_project_finance',
    name: "Accord de Financement Projet Oil and Gas (Project Finance)",
    category: 'commercial_financier',
    price: 38000, priceMax: 120000,
    description: "Convention de financement structuré d'un projet pétrolier sur la base de ses flux futurs, impliquant des banques de développement et des prêteurs commerciaux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'emprunteur', label: "Entité emprunteuse (SPV)", type: 'text', required: true },
      { key: 'banque_chef_file', label: "Banque chef de file", type: 'text', required: true },
      { key: 'montant_financement', label: "Montant total du financement (USD)", type: 'text', required: true },
      { key: 'ratio_dette_fonds', label: "Ratio dette/fonds propres", type: 'text', required: true },
      { key: 'date_signature_fc', label: "Date de signature du FC", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FINANCEMENT PROJET OIL AND GAS</h1><p>Emprunteur : <strong>{{emprunteur}}</strong> — Chef de file : <strong>{{banque_chef_file}}</strong>.</p><h2>Article 1 — Montant</h2><p>Financement total : <strong>{{montant_financement}}</strong> USD.</p><h2>Article 2 — Structure</h2><p>Ratio dette / fonds propres : <strong>{{ratio_dette_fonds}}</strong>, conformément aux exigences des prêteurs.</p><h2>Article 3 — Conditions suspensives</h2><p>Le décaissement est subordonné à l'obtention de toutes les autorisations gouvernementales, à la mise en place des sûretés et à la signature des documents de sécurité.</p><h2>Article 4 — Date de Financial Close</h2><p>Financial Close prévu le <strong>{{date_signature_fc}}</strong>.</p></div>` },

  {
    code: 'petr2_audit_reserves',
    name: "Accord de Service d'Audit des Réserves Pétrolières",
    category: 'commercial_financier',
    price: 18000, priceMax: 55000,
    description: "Contrat pour la réalisation d'un audit indépendant des réserves d'hydrocarbures conformément aux normes SPE-PRMS.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'auditeur_reserves', label: "Société d'audit des réserves", type: 'text', required: true },
      { key: 'mandant', label: "Société mandante", type: 'text', required: true },
      { key: 'champs_audites', label: "Champs à auditer", type: 'textarea', required: true },
      { key: 'date_remise_rapport', label: "Date de remise du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT DES RÉSERVES PÉTROLIÈRES</h1><p>Auditeur : <strong>{{auditeur_reserves}}</strong> — Mandant : <strong>{{mandant}}</strong>.</p><h2>Article 1 — Périmètre</h2><p>{{champs_audites}}</p><h2>Article 2 — Norme applicable</h2><p>L'audit sera réalisé conformément aux normes SPE-PRMS (Petroleum Resources Management System) dans leur version en vigueur.</p><h2>Article 3 — Rapport</h2><p>Le rapport d'audit certifié sera remis au plus tard le <strong>{{date_remise_rapport}}</strong>.</p></div>` },

  {
    code: 'petr2_abandonment',
    name: "Accord de Service de Déclassement de Puits (Abandonment)",
    category: 'commercial_financier',
    price: 20000, priceMax: 62000,
    description: "Contrat pour l'abandon et le déclassement définitifs de puits pétroliers en fin de vie, conformément aux réglementations environnementales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'prestataire_abandonment', label: "Société prestataire d'abandonment", type: 'text', required: true },
      { key: 'puits_a_abandonner', label: "Liste des puits à abandonner", type: 'textarea', required: true },
      { key: 'methode_bouchage', label: "Méthode de bouchage retenue", type: 'text', required: true },
      { key: 'date_fin_travaux', label: "Date de fin des travaux", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉCLASSEMENT DE PUITS</h1><p>Prestataire : <strong>{{prestataire_abandonment}}</strong>.</p><h2>Article 1 — Puits concernés</h2><p>{{puits_a_abandonner}}</p><h2>Article 2 — Méthode</h2><p>Bouchage par <strong>{{methode_bouchage}}</strong>, conforme aux recommandations de l'Autorité nationale des hydrocarbures.</p><h2>Article 3 — Certification environnementale</h2><p>À l'issue des travaux, le Prestataire remet une attestation de bonne exécution et un rapport environnemental final au plus tard le <strong>{{date_fin_travaux}}</strong>.</p></div>` },

  {
    code: 'petr2_rapport_perf',
    name: "Rapport de Performance Exploitation Pétrolière",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Modèle de rapport périodique de performance des opérations de production pétrolière, incluant les KPIs de production, maintenance et HSE.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'champ_production', label: "Nom du champ de production", type: 'text', required: true },
      { key: 'periode_rapport', label: "Période du rapport (mois/année)", type: 'text', required: true },
      { key: 'production_reelle', label: "Production réelle (bbl)", type: 'text', required: true },
      { key: 'production_objectif', label: "Production objectif (bbl)", type: 'text', required: true },
      { key: 'incidents_hse', label: "Incidents HSE notables", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE EXPLOITATION PÉTROLIÈRE</h1><h2>Champ : {{champ_production}} — Période : {{periode_rapport}}</h2><h2>1. Production</h2><p>Production réelle : <strong>{{production_reelle}}</strong> bbl — Objectif : <strong>{{production_objectif}}</strong> bbl.</p><h2>2. HSE</h2><p>{{incidents_hse}}</p><h2>3. Maintenance</h2><p>Taux de disponibilité des équipements et actions correctives en cours détaillés en annexe opérationnelle.</p></div>` },

  {
    code: 'petr2_plan_developpement',
    name: "Plan de Développement de Champ Pétrolier",
    category: 'commercial_financier',
    price: 35000, priceMax: 110000,
    description: "Document-cadre du plan de développement d'un champ pétrolier soumis à l'approbation des autorités ivoiriennes, incluant schéma de développement et plan de gestion environnementale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 83,
    fieldsJson: F([
      { key: 'nom_champ', label: "Nom du champ pétrolier", type: 'text', required: true },
      { key: 'operateur_champ', label: "Société opératrice", type: 'text', required: true },
      { key: 'reserves_certifiees', label: "Réserves certifiées (MMbbl)", type: 'text', required: true },
      { key: 'investissement_total', label: "Investissement total prévu (USD)", type: 'text', required: true },
      { key: 'date_fid', label: "Date de décision finale d'investissement (FID)", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DE CHAMP PÉTROLIER</h1><p>Champ : <strong>{{nom_champ}}</strong> — Opérateur : <strong>{{operateur_champ}}</strong>.</p><h2>1. Réserves</h2><p>Réserves certifiées : <strong>{{reserves_certifiees}}</strong> MMbbl (catégorie 2P, audit SPE-PRMS).</p><h2>2. Investissements</h2><p>Investissement total : <strong>{{investissement_total}}</strong> USD répartis sur le calendrier de développement.</p><h2>3. Schéma de développement</h2><p>Nombre de puits producteurs, injecteurs et lignes de collecte définis dans l'annexe technique.</p><h2>4. FID</h2><p>Décision finale d'investissement prévue le <strong>{{date_fid}}</strong>.</p></div>` },

  {
    code: 'petr2_sismique',
    name: "Accord de Service d'Etude Géologique et Géophysique (Sismique)",
    category: 'commercial_financier',
    price: 22000, priceMax: 68000,
    description: "Contrat de prestation pour l'acquisition, le traitement et l'interprétation de données sismiques 2D/3D en vue de l'exploration pétrolière.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'prestataire_sismique', label: "Société de sismique prestataire", type: 'text', required: true },
      { key: 'type_sismique', label: "Type de sismique (2D/3D/4D)", type: 'text', required: true },
      { key: 'superficie_couverte', label: "Superficie à couvrir (km²)", type: 'text', required: true },
      { key: 'delai_interpretation', label: "Délai d'interprétation finale (mois)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SISMIQUE PÉTROLIÈRE</h1><p>Prestataire : <strong>{{prestataire_sismique}}</strong> — Type : <strong>{{type_sismique}}</strong>.</p><h2>Article 1 — Superficie</h2><p>Zone d'acquisition : <strong>{{superficie_couverte}}</strong> km².</p><h2>Article 2 — Livrables</h2><p>Données brutes, données traitées et rapport d'interprétation finale remis dans un délai de <strong>{{delai_interpretation}}</strong> mois après fin d'acquisition.</p><h2>Article 3 — Propriété des données</h2><p>Les données sismiques acquises dans le cadre de la présente convention sont la propriété exclusive du Client et de l'Etat conformément au Code pétrolier ivoirien.</p></div>` },

  {
    code: 'petr2_hse_offshore',
    name: "Accord de Service de HSE Plateforme Pétrolière Offshore",
    category: 'commercial_financier',
    price: 15000, priceMax: 45000,
    description: "Contrat de service HSE (Hygiène, Sécurité, Environnement) pour la gestion des risques sur plateforme offshore pétrolière, incluant plans d'urgence et formation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'prestataire_hse', label: "Société HSE prestataire", type: 'text', required: true },
      { key: 'plateforme', label: "Nom de la plateforme offshore", type: 'text', required: true },
      { key: 'effectif_plateforme', label: "Effectif moyen de la plateforme", type: 'text', required: true },
      { key: 'objectif_accident', label: "Objectif TRIR (taux d'accidents)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE HSE - PLATEFORME OFFSHORE</h1><p>Prestataire : <strong>{{prestataire_hse}}</strong> — Plateforme : <strong>{{plateforme}}</strong>.</p><h2>Article 1 — Périmètre HSE</h2><p>Effectif couvert : <strong>{{effectif_plateforme}}</strong> personnes. Le prestataire assure la gestion documentaire HSE, les audits, les exercices d'urgence et les formations réglementaires.</p><h2>Article 2 — Objectif de performance</h2><p>TRIR cible : <strong>{{objectif_accident}}</strong> — Zero LTI est l'objectif absolu.</p><h2>Article 3 — Reporting</h2><p>Rapport HSE mensuel transmis au Client et à l'Autorité nationale des hydrocarbures dans les 10 jours suivant la fin de chaque mois.</p></div>` },

  {
    code: 'petr2_eiti',
    name: "Charte de Responsabilité Sociale Pétrolière (EITI)",
    category: 'commercial_financier',
    price: 12000, priceMax: 36000,
    description: "Charte d'engagement de responsabilité sociale et de transparence des paiements d'une compagnie pétrolière conforme aux exigences de l'Initiative pour la Transparence dans les Industries Extractives (ITIE/EITI).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      { key: 'compagnie_signataire', label: "Compagnie signataire", type: 'text', required: true },
      { key: 'programmes_rse', label: "Programmes RSE engagés", type: 'textarea', required: true },
      { key: 'budget_rse_annuel', label: "Budget RSE annuel (FCFA)", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE RESPONSABILITÉ SOCIALE PÉTROLIÈRE (EITI)</h1><p>Adoptée par <strong>{{compagnie_signataire}}</strong> en conformité avec le standard EITI et le Code pétrolier ivoirien.</p><h2>Article 1 — Engagements de transparence</h2><p>La compagnie s'engage à publier annuellement tous les paiements effectués à l'Etat (taxes, redevances, bonus de signature).</p><h2>Article 2 — Programmes RSE</h2><p>{{programmes_rse}}</p><h2>Article 3 — Budget</h2><p>Budget RSE annuel engagé : <strong>{{budget_rse_annuel}}</strong> FCFA.</p><h2>Article 4 — Adoption</h2><p>Charte adoptée par le Conseil d'administration le <strong>{{date_adoption}}</strong>.</p></div>` },

  // ─── MARITIME / NAVAL / PÊCHE INDUSTRIELLE (25 templates) ──────────────────
  {
    code: 'mar_affretement_voyage',
    name: "Accord d'Affretement Maritime au Voyage (Charte-Partie Voyage)",
    category: 'transport_logistique',
    price: 18000, priceMax: 55000,
    description: "Contrat d'affrètement pour un ou plusieurs voyages déterminés, régissant les droits et obligations de l'armateur et de l'affréteur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      { key: 'armateur', label: "Armateur (nom et pavillon)", type: 'text', required: true },
      { key: 'affreteur', label: "Affréteur", type: 'text', required: true },
      { key: 'nom_navire', label: "Nom du navire", type: 'text', required: true },
      { key: 'fret_par_tonne', label: "Fret unitaire (USD/tonne)", type: 'text', required: true },
      { key: 'port_chargement_mar', label: "Port de chargement", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE-PARTIE AU VOYAGE</h1><p>Armateur : <strong>{{armateur}}</strong> — Affréteur : <strong>{{affreteur}}</strong> — Navire : <strong>{{nom_navire}}</strong>.</p><h2>Article 1 — Voyage</h2><p>Chargement au port de <strong>{{port_chargement_mar}}</strong> à destination du port convenu, pour la cargaison désignée en annexe.</p><h2>Article 2 — Fret</h2><p>Fret : <strong>{{fret_par_tonne}}</strong> USD par tonne métrique, payable 90 % à l'émission du connaissement, solde à la livraison.</p><h2>Article 3 — Staries et surestaries</h2><p>Les staries et surestaries sont calculées conformément à la clause Laytime de la présente charte-partie.</p></div>` },

  {
    code: 'mar_affretement_temps',
    name: "Accord d'Affretement Maritime a Temps (Charte-Partie Temps)",
    category: 'transport_logistique',
    price: 20000, priceMax: 62000,
    description: "Contrat d'affrètement à temps mettant à disposition d'un affréteur un navire avec équipage pour une durée déterminée.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      { key: 'armateur_tc', label: "Armateur", type: 'text', required: true },
      { key: 'affreteur_tc', label: "Affréteur", type: 'text', required: true },
      { key: 'navire_tc', label: "Nom et type du navire", type: 'text', required: true },
      { key: 'hire_rate', label: "Loyer journalier (USD/jour)", type: 'text', required: true },
      { key: 'duree_tc', label: "Durée de l'affrètement", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>TIME CHARTER PARTY</h1><p>Armateur : <strong>{{armateur_tc}}</strong> — Affréteur : <strong>{{affreteur_tc}}</strong>.</p><h2>Article 1 — Navire</h2><p>Navire : <strong>{{navire_tc}}</strong>, mis à disposition pour <strong>{{duree_tc}}</strong>.</p><h2>Article 2 — Loyer</h2><p>Hire rate : <strong>{{hire_rate}}</strong> USD par jour, payable semi-mensuellement d'avance.</p><h2>Article 3 — Off-hire</h2><p>Le loyer est suspendu durant les périodes d'indisponibilité du navire imputables à l'armateur selon les conditions NYPE ou Baltime annexées.</p></div>` },

  {
    code: 'mar_cabotage',
    name: "Accord de Service de Navigation de Cabotage",
    category: 'transport_logistique',
    price: 12000, priceMax: 36000,
    description: "Contrat de service pour le transport maritime de marchandises entre ports ivoiriens et régionaux (cabotage national et régional CEDEAO).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'armateur_cabotage', label: "Armateur de cabotage", type: 'text', required: true },
      { key: 'chargeur', label: "Chargeur (expéditeur)", type: 'text', required: true },
      { key: 'routes_desservies', label: "Routes desservies (ports)", type: 'textarea', required: true },
      { key: 'frequence_escale', label: "Fréquence des escales", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CABOTAGE MARITIME</h1><p>Armateur : <strong>{{armateur_cabotage}}</strong> — Chargeur : <strong>{{chargeur}}</strong>.</p><h2>Article 1 — Routes</h2><p>{{routes_desservies}}</p><h2>Article 2 — Fréquence</h2><p>Fréquence d'escale : <strong>{{frequence_escale}}</strong>.</p><h2>Article 3 — Conformité</h2><p>Toutes les opérations de cabotage sont menées conformément au Code de la Marine Marchande ivoirien et aux conventions CEDEAO sur le transport maritime régional.</p></div>` },

  {
    code: 'mar_conteneurs',
    name: "Accord de Service de Transport de Conteneurs",
    category: 'transport_logistique',
    price: 15000, priceMax: 45000,
    description: "Contrat de service de transport maritime de conteneurs EVP/20 pieds entre le Port Autonome d'Abidjan et les ports de destination.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'liner', label: "Compagnie de ligne (liner)", type: 'text', required: true },
      { key: 'shipper', label: "Chargeur (shipper)", type: 'text', required: true },
      { key: 'volume_conteneurs', label: "Volume annuel contractuel (EVP)", type: 'text', required: true },
      { key: 'tarif_boite', label: "Tarif par boite (USD/EVP)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>SERVICE CONTRACT - TRANSPORT DE CONTENEURS</h1><p>Liner : <strong>{{liner}}</strong> — Shipper : <strong>{{shipper}}</strong>.</p><h2>Article 1 — Volumes</h2><p>Volume minimum garanti : <strong>{{volume_conteneurs}}</strong> EVP par an.</p><h2>Article 2 — Tarif</h2><p>Tarif océanique : <strong>{{tarif_boite}}</strong> USD par EVP, hors surcharges.</p><h2>Article 3 — Connaissements</h2><p>Les connaissements (Bill of Lading) émis dans le cadre du présent contrat sont régis par les Règles de La Haye-Visby.</p></div>` },

  {
    code: 'mar_vrac_sec',
    name: "Accord de Service de Transport de Vrac Sec",
    category: 'transport_logistique',
    price: 16000, priceMax: 50000,
    description: "Contrat d'affrètement pour le transport de cargaisons sèches en vrac (céréales, engrais, minerais) au départ ou à destination d'Abidjan.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      { key: 'armateur_vrac', label: "Armateur vrac sec", type: 'text', required: true },
      { key: 'affreteur_vrac', label: "Affréteur", type: 'text', required: true },
      { key: 'marchandise', label: "Nature de la marchandise", type: 'text', required: true },
      { key: 'quantite_cargo', label: "Quantité (tonnes)", type: 'text', required: true },
      { key: 'port_destination', label: "Port de destination", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE-PARTIE VRAC SEC</h1><p>Armateur : <strong>{{armateur_vrac}}</strong> — Affréteur : <strong>{{affreteur_vrac}}</strong>.</p><h2>Article 1 — Cargaison</h2><p>Marchandise : <strong>{{marchandise}}</strong> — Quantité : <strong>{{quantite_cargo}}</strong> tonnes MOLOO.</p><h2>Article 2 — Port de destination</h2><p>Livraison à <strong>{{port_destination}}</strong>, quai sûr et accessible.</p><h2>Article 3 — Qualité</h2><p>La qualité de la cargaison est attestée par un certificat de conformité délivré par un organisme indépendant au port de chargement.</p></div>` },

  {
    code: 'mar_vrac_liquide',
    name: "Accord de Service de Transport de Vrac Liquide (Pétrolier)",
    category: 'transport_logistique',
    price: 20000, priceMax: 62000,
    description: "Charte-partie pour le transport de produits liquides en vrac (brut, produits raffinés, produits chimiques) par tanker.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'armateur_tanker', label: "Armateur du tanker", type: 'text', required: true },
      { key: 'affreteur_tanker', label: "Affréteur", type: 'text', required: true },
      { key: 'produit_liquide', label: "Produit transporté", type: 'text', required: true },
      { key: 'capacite_tanker', label: "Capacité du tanker (DWT)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE-PARTIE TANKER - VRAC LIQUIDE</h1><p>Armateur : <strong>{{armateur_tanker}}</strong> — Affréteur : <strong>{{affreteur_tanker}}</strong>.</p><h2>Article 1 — Produit</h2><p>Produit : <strong>{{produit_liquide}}</strong> transporté dans des citernes dédiées et inertées.</p><h2>Article 2 — Navire</h2><p>Capacité : <strong>{{capacite_tanker}}</strong> DWT — navire qualifié selon standards SIRE/CDI en vigueur.</p><h2>Article 3 — Clauses Intertanko</h2><p>La présente charte-partie est régie par les clauses standard Intertanko applicables au produit transporté.</p></div>` },

  {
    code: 'mar_remorquage',
    name: "Contrat de Service de Remorquage Portuaire",
    category: 'transport_logistique',
    price: 10000, priceMax: 30000,
    description: "Contrat de service de remorquage pour l'assistance des navires a la manoeuvre dans le port d'Abidjan, conforme aux règles du PAA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'societe_remorquage', label: "Société de remorquage", type: 'text', required: true },
      { key: 'navire_assiste', label: "Navire assisté", type: 'text', required: true },
      { key: 'type_operation', label: "Type d'opération (entrée/sortie/déhalage)", type: 'text', required: true },
      { key: 'tarif_remorquage', label: "Tarif de remorquage (FCFA/opération)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE REMORQUAGE PORTUAIRE</h1><p>Remorqueur : <strong>{{societe_remorquage}}</strong> — Navire assisté : <strong>{{navire_assiste}}</strong>.</p><h2>Article 1 — Nature de l'opération</h2><p>Operation : <strong>{{type_operation}}</strong> dans le port d'Abidjan.</p><h2>Article 2 — Tarif</h2><p>Tarif forfaitaire : <strong>{{tarif_remorquage}}</strong> FCFA par opération, conformément au tarif homologué par le Port Autonome d'Abidjan.</p><h2>Article 3 — Responsabilité</h2><p>La responsabilité du remorqueur est limitée conformément aux Règles de Rotterdam et aux conventions de remorquage portuaire.</p></div>` },

  {
    code: 'mar_lamanage',
    name: "Accord de Service de Lamanage",
    category: 'transport_logistique',
    price: 8000, priceMax: 24000,
    description: "Contrat pour les services de lamanage (amarrage et désamarrage des navires) au Port Autonome d'Abidjan ou dans les ports secondaires ivoiriens.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'entreprise_lamanage', label: "Entreprise de lamanage", type: 'text', required: true },
      { key: 'armateur_lamanage', label: "Armateur ou agent maritime bénéficiaire", type: 'text', required: true },
      { key: 'port', label: "Port concerné", type: 'text', required: true },
      { key: 'tarif_lamanage', label: "Tarif par mouvement (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LAMANAGE</h1><p>Lamaneur : <strong>{{entreprise_lamanage}}</strong> — Bénéficiaire : <strong>{{armateur_lamanage}}</strong> — Port : <strong>{{port}}</strong>.</p><h2>Article 1 — Prestations</h2><p>L'entreprise assure les opérations d'amarrage, désamarrage et déhalage des navires selon les instructions du capitaine et du pilote.</p><h2>Article 2 — Tarif</h2><p>Tarif : <strong>{{tarif_lamanage}}</strong> FCFA par mouvement navire.</p><h2>Article 3 — Disponibilité</h2><p>Service disponible 24h/24, 7j/7, jours fériés inclus.</p></div>` },

  {
    code: 'mar_consignataire',
    name: "Accord de Service de Consignataire de Navire",
    category: 'transport_logistique',
    price: 12000, priceMax: 36000,
    description: "Contrat de mandat confiant à un consignataire agréé la représentation d'un armateur et la gestion de l'escale de son navire à Abidjan.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'consignataire', label: "Société consignataire agréée", type: 'text', required: true },
      { key: 'armateur_mandant', label: "Armateur mandant", type: 'text', required: true },
      { key: 'navire_consigne', label: "Navire consigné", type: 'text', required: true },
      { key: 'honoraires_escale', label: "Honoraires de consignation par escale (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSIGNATION DE NAVIRE</h1><p>Consignataire : <strong>{{consignataire}}</strong> — Armateur : <strong>{{armateur_mandant}}</strong> — Navire : <strong>{{navire_consigne}}</strong>.</p><h2>Article 1 — Mission</h2><p>Le consignataire représente l'armateur auprès des autorités portuaires, coordonne toutes les opérations d'escale et gère le dispatching des documents.</p><h2>Article 2 — Honoraires</h2><p>Honoraires : <strong>{{honoraires_escale}}</strong> FCFA par escale, débours en sus sur justificatifs.</p><h2>Article 3 — Reddition de compte</h2><p>Le compte d'escale est transmis à l'armateur dans les 5 jours ouvrés suivant le départ du navire.</p></div>` },

  {
    code: 'mar_commissionnaire_douane',
    name: "Accord de Service de Commissionnaire Agréé en Douane Maritime",
    category: 'transport_logistique',
    price: 10000, priceMax: 30000,
    description: "Contrat de prestation de déclaration en douane et de dédouanement de marchandises importées ou exportées par voie maritime à Abidjan.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'commissionnaire', label: "Commissionnaire en douane agréé", type: 'text', required: true },
      { key: 'importateur', label: "Importateur / exportateur mandant", type: 'text', required: true },
      { key: 'regime_douanier', label: "Régime douanier (mise à la consommation, transit, etc.)", type: 'text', required: true },
      { key: 'honoraires_dossier', label: "Honoraires par dossier (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMMISSIONNAIRE EN DOUANE MARITIME</h1><p>Commissionnaire : <strong>{{commissionnaire}}</strong> — Mandant : <strong>{{importateur}}</strong>.</p><h2>Article 1 — Régime</h2><p>Régime douanier applicable : <strong>{{regime_douanier}}</strong>.</p><h2>Article 2 — Obligations</h2><p>Le commissionnaire s'engage à établir les déclarations en douane, à suivre les procédures DGD/SGS et à obtenir la mainlevée dans les délais.</p><h2>Article 3 — Honoraires</h2><p>Honoraires : <strong>{{honoraires_dossier}}</strong> FCFA par dossier, débours en sus.</p></div>` },

  {
    code: 'mar_courtier',
    name: "Accord de Service de Courtier Maritime",
    category: 'transport_logistique',
    price: 10000, priceMax: 30000,
    description: "Contrat de courtage maritime par lequel un courtier agréé met en relation armateurs et affréteurs pour la négociation de chartes-parties.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'courtier', label: "Courtier maritime", type: 'text', required: true },
      { key: 'mandant_courtage', label: "Partie mandante (armateur ou affréteur)", type: 'text', required: true },
      { key: 'commission_courtage', label: "Commission de courtage (%)", type: 'text', required: true },
      { key: 'type_contrat_negocie', label: "Type de contrat à négocier", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COURTAGE MARITIME</h1><p>Courtier : <strong>{{courtier}}</strong> — Mandant : <strong>{{mandant_courtage}}</strong>.</p><h2>Article 1 — Mission</h2><p>Le courtier est mandaté pour négocier un <strong>{{type_contrat_negocie}}</strong> dans les meilleures conditions du marché.</p><h2>Article 2 — Commission</h2><p>Commission : <strong>{{commission_courtage}}</strong> % du fret brut perçue à la fixation de la charte-partie.</p><h2>Article 3 — Exclusivité</h2><p>Le mandant s'engage à ne pas traiter directement ou par un autre courtier le même navire pendant la durée de la négociation en cours.</p></div>` },

  {
    code: 'mar_ship_management',
    name: "Accord de Ship Management (Gestion de Navire)",
    category: 'transport_logistique',
    price: 18000, priceMax: 55000,
    description: "Contrat de gestion technique et/ou commerciale d'un navire confié à une société de ship management (modèle BIMCO SHIPMAN).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'gestionnaire', label: "Société de ship management", type: 'text', required: true },
      { key: 'proprietaire', label: "Propriétaire du navire", type: 'text', required: true },
      { key: 'navire_gere', label: "Navire géré (nom et IMO)", type: 'text', required: true },
      { key: 'honoraires_gestion', label: "Honoraires de gestion mensuelle (USD)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>SHIP MANAGEMENT AGREEMENT</h1><p>Gestionnaire : <strong>{{gestionnaire}}</strong> — Propriétaire : <strong>{{proprietaire}}</strong> — Navire : <strong>{{navire_gere}}</strong>.</p><h2>Article 1 — Prestations</h2><p>Le gestionnaire assure la gestion technique (maintenance, classification, ISM), la gestion des équipages et, le cas échéant, la gestion commerciale (affrètement).</p><h2>Article 2 — Honoraires</h2><p>Honoraires de gestion : <strong>{{honoraires_gestion}}</strong> USD par mois, révisables annuellement.</p><h2>Article 3 — Modèle BIMCO</h2><p>La présente convention est rédigée sur la base du modèle BIMCO SHIPMAN 2009 dont les clauses standard s'appliquent en l'absence de dispositions contraires.</p></div>` },

  {
    code: 'mar_contrat_marin',
    name: "Accord de Contrat d'Equipage (Contrat Marin)",
    category: 'transport_logistique',
    price: 8000, priceMax: 24000,
    description: "Contrat d'engagement maritime pour marins ivoiriens ou étrangers embarqués sur des navires battant pavillon ivoirien, conforme au Code du Travail Maritime.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'marin', label: "Nom complet du marin", type: 'text', required: true },
      { key: 'grade_bord', label: "Grade à bord", type: 'text', required: true },
      { key: 'navire_embarquement', label: "Navire d'embarquement", type: 'text', required: true },
      { key: 'salaire_mensuel', label: "Salaire mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_embarquement', label: "Date d'embarquement", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ENGAGEMENT MARITIME</h1><p>Marin : <strong>{{marin}}</strong> — Grade : <strong>{{grade_bord}}</strong> — Navire : <strong>{{navire_embarquement}}</strong>.</p><h2>Article 1 — Salaire</h2><p>Salaire mensuel de base : <strong>{{salaire_mensuel}}</strong> FCFA, plus primes et avantages en nature conformément à la convention collective de la marine marchande.</p><h2>Article 2 — Durée</h2><p>Contrat à durée déterminée, embarquement le <strong>{{date_embarquement}}</strong>, durée maximale conforme au Code du Travail Maritime ivoirien.</p><h2>Article 3 — Rapatriement</h2><p>L'armateur prend en charge les frais de rapatriement en fin de contrat ou en cas d'incapacité survenue à bord.</p></div>` },

  {
    code: 'mar_classification',
    name: "Accord de Service de Classification de Navire (BV, Lloyd)",
    category: 'transport_logistique',
    price: 12000, priceMax: 36000,
    description: "Contrat de classification et de surveillance technique d'un navire par une société de classification internationale (Bureau Veritas, Lloyd's Register ou DNV).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'societe_classification', label: "Société de classification", type: 'text', required: true },
      { key: 'armateur_classe', label: "Armateur", type: 'text', required: true },
      { key: 'navire_classe', label: "Navire à classer (nom et type)", type: 'text', required: true },
      { key: 'notation_visee', label: "Notation de classe visée", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CLASSIFICATION DE NAVIRE</h1><p>Société de classification : <strong>{{societe_classification}}</strong> — Armateur : <strong>{{armateur_classe}}</strong>.</p><h2>Article 1 — Navire</h2><p>Navire : <strong>{{navire_classe}}</strong> soumis aux visites de classification et de renouvellement.</p><h2>Article 2 — Notation visée</h2><p>Notation cible : <strong>{{notation_visee}}</strong>, incluant les marques de service applicables.</p><h2>Article 3 — Visites</h2><p>Programme de visites périodiques (annuelle, intermédiaire, de renouvellement de classe) établi par la société de classification conformément à ses règles.</p></div>` },

  {
    code: 'mar_inspection_achat',
    name: "Accord de Service d'Inspection Navire Avant Achat",
    category: 'transport_logistique',
    price: 10000, priceMax: 30000,
    description: "Contrat pour la réalisation d'une inspection technique (pre-purchase survey) d'un navire avant acquisition, par un expert maritime indépendant.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'inspecteur_naval', label: "Expert maritime indépendant", type: 'text', required: true },
      { key: 'acheteur_potentiel', label: "Acheteur potentiel mandant", type: 'text', required: true },
      { key: 'navire_inspecte', label: "Navire à inspecter (nom, IMO, âge)", type: 'text', required: true },
      { key: 'date_inspection', label: "Date d'inspection", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'INSPECTION NAVIRE AVANT ACHAT</h1><p>Expert : <strong>{{inspecteur_naval}}</strong> — Mandant : <strong>{{acheteur_potentiel}}</strong> — Navire : <strong>{{navire_inspecte}}</strong>.</p><h2>Article 1 — Objet</h2><p>L'expert réalise une inspection visuelle complète de la structure, des machines, des équipements et des documents du navire.</p><h2>Article 2 — Rapport</h2><p>Rapport d'inspection transmis dans les 48 heures suivant la visite du <strong>{{date_inspection}}</strong>, avec liste des observations et recommandations.</p><h2>Article 3 — Indépendance</h2><p>L'expert déclare n'avoir aucun conflit d'intérêt avec le vendeur ni l'acheteur.</p></div>` },

  {
    code: 'mar_reparation_navale',
    name: "Accord de Service de Réparation Navale (Chantier Naval)",
    category: 'transport_logistique',
    price: 15000, priceMax: 45000,
    description: "Contrat de réparation d'un navire dans un chantier naval, incluant mise en cale sèche, travaux de coque, machines et équipements.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'chantier_naval', label: "Chantier naval prestataire", type: 'text', required: true },
      { key: 'armateur_rep', label: "Armateur", type: 'text', required: true },
      { key: 'travaux_prevus', label: "Description des travaux prévus", type: 'textarea', required: true },
      { key: 'delai_reparation', label: "Délai de réparation (jours)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RÉPARATION NAVALE</h1><p>Chantier : <strong>{{chantier_naval}}</strong> — Armateur : <strong>{{armateur_rep}}</strong>.</p><h2>Article 1 — Travaux</h2><p>{{travaux_prevus}}</p><h2>Article 2 — Délai</h2><p>Durée des travaux : <strong>{{delai_reparation}}</strong> jours à compter de l'accostage au chantier.</p><h2>Article 3 — Garantie</h2><p>Le chantier garantit ses travaux pour une durée de 12 mois à compter de la restitution du navire.</p></div>` },

  {
    code: 'mar_vente_navire',
    name: "Accord de Vente de Navire (MoA - Bill of Sale)",
    category: 'transport_logistique',
    price: 22000, priceMax: 68000,
    description: "Protocole d'accord et acte de vente d'un navire de commerce conforme au modèle NSF 1993 (Norwegian Sale Form) et au droit OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'vendeur_navire', label: "Vendeur du navire", type: 'text', required: true },
      { key: 'acheteur_navire', label: "Acheteur du navire", type: 'text', required: true },
      { key: 'navire_vendu', label: "Navire vendu (nom, IMO, pavillon)", type: 'text', required: true },
      { key: 'prix_achat', label: "Prix de vente (USD)", type: 'text', required: true },
      { key: 'date_livraison_navire', label: "Date de livraison du navire", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>MEMORANDUM OF AGREEMENT - VENTE DE NAVIRE</h1><p>Vendeur : <strong>{{vendeur_navire}}</strong> — Acheteur : <strong>{{acheteur_navire}}</strong>.</p><h2>Article 1 — Navire</h2><p>Navire : <strong>{{navire_vendu}}</strong> vendu en l'état.</p><h2>Article 2 — Prix</h2><p>Prix : <strong>{{prix_achat}}</strong> USD, payé par virement SWIFT sur compte séquestre.</p><h2>Article 3 — Livraison</h2><p>Livraison prévue le <strong>{{date_livraison_navire}}</strong> dans un port convenu, avec transfert de pavillon et remise des documents de bord.</p></div>` },

  {
    code: 'mar_peche_industrielle',
    name: "Accord de Service de Pêche Industrielle (Concession)",
    category: 'transport_logistique',
    price: 20000, priceMax: 60000,
    description: "Accord de concession de pêche industrielle octroyant à une entreprise le droit d'exploiter les ressources halieutiques dans la Zone Economique Exclusive ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'armateur_peche', label: "Armateur de pêche industrielle", type: 'text', required: true },
      { key: 'zone_peche', label: "Zone de pêche autorisée", type: 'text', required: true },
      { key: 'especes_cibles', label: "Espèces cibles autorisées", type: 'textarea', required: true },
      { key: 'quota_annuel', label: "Quota annuel de capture (tonnes)", type: 'text', required: true },
      { key: 'duree_concession', label: "Durée de la concession (ans)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCESSION DE PÊCHE INDUSTRIELLE</h1><p>Armateur : <strong>{{armateur_peche}}</strong> — Zone : <strong>{{zone_peche}}</strong>.</p><h2>Article 1 — Espèces autorisées</h2><p>{{especes_cibles}}</p><h2>Article 2 — Quota</h2><p>Quota annuel de capture : <strong>{{quota_annuel}}</strong> tonnes, révisable en fonction de l'état des stocks.</p><h2>Article 3 — Durée</h2><p>Concession valable <strong>{{duree_concession}}</strong> ans, renouvelable sous réserve du respect des obligations environnementales.</p></div>` },

  {
    code: 'mar_transformation_poisson',
    name: "Accord de Service de Transformation du Poisson (Usine)",
    category: 'transport_logistique',
    price: 15000, priceMax: 45000,
    description: "Contrat de service entre un armateur et une unité de transformation de poisson pour le traitement, la conservation et la commercialisation des captures.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'usine_transformation', label: "Usine de transformation", type: 'text', required: true },
      { key: 'fournisseur_poisson', label: "Armateur fournisseur", type: 'text', required: true },
      { key: 'volume_min_mensuel', label: "Volume minimum mensuel (tonnes)", type: 'text', required: true },
      { key: 'produits_finis', label: "Produits finis attendus (conserve, filet, farine)", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSFORMATION DU POISSON</h1><p>Usine : <strong>{{usine_transformation}}</strong> — Fournisseur : <strong>{{fournisseur_poisson}}</strong>.</p><h2>Article 1 — Volume</h2><p>Volume minimum mensuel confié à la transformation : <strong>{{volume_min_mensuel}}</strong> tonnes.</p><h2>Article 2 — Produits finis</h2><p>{{produits_finis}}</p><h2>Article 3 — Normes sanitaires</h2><p>L'usine s'engage à respecter les normes HACCP, les réglementations sanitaires ivoiriennes et les exigences d'exportation vers l'Union Européenne.</p></div>` },

  {
    code: 'mar_peche_artisanale',
    name: "Accord de Service de Pêche Artisanale Améliorée",
    category: 'transport_logistique',
    price: 8000, priceMax: 22000,
    description: "Convention d'appui à la modernisation de la pêche artisanale, incluant fourniture d'équipements améliorés, formation et accès au financement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'structure_appui', label: "Structure d'appui (ONG, projet, ministère)", type: 'text', required: true },
      { key: 'groupement_pecheurs', label: "Groupement de pêcheurs bénéficiaire", type: 'text', required: true },
      { key: 'equipements_fournis', label: "Equipements fournis", type: 'textarea', required: true },
      { key: 'village_pecheur', label: "Village de pêche concerné", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PÊCHE ARTISANALE AMÉLIORÉE</h1><p>Structure d'appui : <strong>{{structure_appui}}</strong> — Bénéficiaire : <strong>{{groupement_pecheurs}}</strong> — Village : <strong>{{village_pecheur}}</strong>.</p><h2>Article 1 — Equipements</h2><p>{{equipements_fournis}}</p><h2>Article 2 — Formation</h2><p>Les membres du groupement bénéficient de formations sur les techniques de pêche améliorées, la conservation du poisson et la gestion financière.</p><h2>Article 3 — Contreparties</h2><p>Le groupement s'engage à adopter des pratiques de pêche durable et à participer aux programmes de suivi des ressources halieutiques.</p></div>` },

  {
    code: 'mar_rapport_armateur',
    name: "Rapport de Performance Armateur",
    category: 'transport_logistique',
    price: 7000, priceMax: 20000,
    description: "Modèle de rapport de performance de flotte d'un armateur, couvrant les indicateurs de disponibilité, de consommation et de rentabilité des navires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'armateur_rapport', label: "Société armateur", type: 'text', required: true },
      { key: 'periode_rapport_mar', label: "Période couverte", type: 'text', required: true },
      { key: 'flotte', label: "Composition de la flotte", type: 'textarea', required: true },
      { key: 'taux_disponibilite', label: "Taux de disponibilité moyen (%)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE ARMATEUR</h1><h2>Armateur : {{armateur_rapport}} — Période : {{periode_rapport_mar}}</h2><h2>1. Flotte</h2><p>{{flotte}}</p><h2>2. Disponibilité</h2><p>Taux de disponibilité moyen : <strong>{{taux_disponibilite}}</strong> %.</p><h2>3. Consommation et coûts</h2><p>Analyses de la consommation en soutes, des coûts d'équipage et de maintenance détaillées dans les annexes financières.</p></div>` },

  {
    code: 'mar_plan_flotte',
    name: "Plan de Développement de Flotte Maritime",
    category: 'transport_logistique',
    price: 25000, priceMax: 75000,
    description: "Plan stratégique de développement et de renouvellement de la flotte maritime d'un armateur africain, avec analyse financière et plan de financement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'armateur_plan', label: "Société armateur", type: 'text', required: true },
      { key: 'horizon_plan', label: "Horizon du plan (années)", type: 'text', required: true },
      { key: 'acquisitions_prevues', label: "Acquisitions de navires prévues", type: 'textarea', required: true },
      { key: 'budget_acquisition', label: "Budget d'acquisition total (USD)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DE FLOTTE MARITIME</h1><p>Armateur : <strong>{{armateur_plan}}</strong> — Horizon : <strong>{{horizon_plan}}</strong> ans.</p><h2>1. Acquisitions planifiées</h2><p>{{acquisitions_prevues}}</p><h2>2. Budget</h2><p>Enveloppe d'acquisition totale : <strong>{{budget_acquisition}}</strong> USD, financée via une combinaison de fonds propres et de crédit naval.</p><h2>3. Rentabilité prévisionnelle</h2><p>Modèle financier avec projections de taux de fret, taux d'utilisation et EBITDA sur l'horizon du plan présentées en annexe.</p></div>` },

  {
    code: 'mar_surveillance_mcs',
    name: "Accord de Service de Surveillance Maritime (MCS)",
    category: 'transport_logistique',
    price: 18000, priceMax: 54000,
    description: "Convention de service de surveillance, contrôle et suivi des activités de pêche (MCS - Monitoring Control and Surveillance) dans la ZEE ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'agence_mcs', label: "Agence ou société MCS", type: 'text', required: true },
      { key: 'autorite_mandante', label: "Autorité mandante (Ministère)", type: 'text', required: true },
      { key: 'zone_surveillance', label: "Zone de surveillance (miles nautiques)", type: 'text', required: true },
      { key: 'moyens_deployes', label: "Moyens déployés (patrouilleurs, satellites, VMS)", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SURVEILLANCE MARITIME (MCS)</h1><p>Agence MCS : <strong>{{agence_mcs}}</strong> — Autorité mandante : <strong>{{autorite_mandante}}</strong>.</p><h2>Article 1 — Zone</h2><p>Zone de surveillance : <strong>{{zone_surveillance}}</strong> milles nautiques de la côte ivoirienne.</p><h2>Article 2 — Moyens</h2><p>{{moyens_deployes}}</p><h2>Article 3 — Reporting</h2><p>Rapport mensuel de surveillance transmis au Ministère des Ressources Halieutiques avec données VMS, nombre d'infractions et suites judiciaires.</p></div>` },

  {
    code: 'mar_partenariat_peche',
    name: "Accord de Partenariat Pecheurs Artisanaux - Industrie",
    category: 'transport_logistique',
    price: 10000, priceMax: 30000,
    description: "Accord-cadre de partenariat entre une entreprise de pêche industrielle et des associations de pêcheurs artisanaux pour la valorisation commune des ressources halieutiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      { key: 'entreprise_industrielle', label: "Entreprise de pêche industrielle", type: 'text', required: true },
      { key: 'association_artisans', label: "Association de pêcheurs artisanaux", type: 'text', required: true },
      { key: 'engagements_industrie', label: "Engagements de l'industrie", type: 'textarea', required: true },
      { key: 'engagements_artisans', label: "Engagements des artisans", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PÊCHE ARTISANALE - INDUSTRIE</h1><p>Industrie : <strong>{{entreprise_industrielle}}</strong> — Association : <strong>{{association_artisans}}</strong>.</p><h2>Article 1 — Engagements de l'industrie</h2><p>{{engagements_industrie}}</p><h2>Article 2 — Engagements des artisans</h2><p>{{engagements_artisans}}</p><h2>Article 3 — Gouvernance</h2><p>Un comité paritaire de suivi se réunit trimestriellement pour évaluer l'exécution du partenariat et adapter les termes si nécessaire.</p></div>` },

  {
    code: 'mar_charte_peche_durable',
    name: "Charte de la Pêche Durable en Afrique",
    category: 'transport_logistique',
    price: 8000, priceMax: 24000,
    description: "Charte d'engagement volontaire en faveur d'une pêche durable et responsable en Afrique de l'Ouest, alignée sur le Code de Conduite pour une Pêche Responsable de la FAO.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'signataire_charte', label: "Organisation signataire", type: 'text', required: true },
      { key: 'engagements_durabilite', label: "Engagements de durabilité pris", type: 'textarea', required: true },
      { key: 'indicateurs_suivi', label: "Indicateurs de suivi retenus", type: 'textarea', required: true },
      { key: 'date_adoption_charte', label: "Date d'adoption de la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA PÊCHE DURABLE EN AFRIQUE</h1><p>Signataire : <strong>{{signataire_charte}}</strong>.</p><h2>Préambule</h2><p>Considérant l'importance des ressources halieutiques pour la sécurité alimentaire et les économies d'Afrique de l'Ouest, le signataire adopte la présente charte en référence au Code FAO de Conduite pour une Pêche Responsable.</p><h2>Article 1 — Engagements</h2><p>{{engagements_durabilite}}</p><h2>Article 2 — Indicateurs</h2><p>{{indicateurs_suivi}}</p><h2>Article 3 — Date</h2><p>Adoptée le <strong>{{date_adoption_charte}}</strong>.</p></div>` },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 63a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
