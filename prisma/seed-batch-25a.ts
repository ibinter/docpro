import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── IMPORT / EXPORT (imex2_) ───────────────────────────────────────────────
  {
    code: 'imex2_contrat_vente_intl',
    name: "Contrat de Vente Internationale CISG/OHADA",
    category: 'commercial_financier',
    price: 12000, priceMax: 36000,
    description: "Contrat de vente internationale conforme à la Convention de Vienne (CISG) et au droit OHADA, avec clauses de livraison, paiement et arbitrage.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      { key: 'vendeur', label: "Dénomination du vendeur", type: 'text', required: true },
      { key: 'acheteur', label: "Dénomination de l'acheteur", type: 'text', required: true },
      { key: 'marchandise', label: "Description de la marchandise", type: 'textarea', required: true },
      { key: 'prix_total', label: "Prix total (devise)", type: 'text', required: true },
      { key: 'date_contrat', label: "Date du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE INTERNATIONALE</h1><p><strong>Vendeur :</strong> {{vendeur}}</p><p><strong>Acheteur :</strong> {{acheteur}}</p><p><strong>Marchandise :</strong> {{marchandise}}</p><p><strong>Prix total :</strong> {{prix_total}}</p><p><strong>Date :</strong> {{date_contrat}}</p><p>Le présent contrat est régi par la Convention des Nations Unies sur les contrats de vente internationale de marchandises (CISG) et, subsidiairement, par le droit OHADA.</p></div>`
  },
  {
    code: 'imex2_incoterm_exw',
    name: "Conditions de Livraison Incoterm EXW Détaillé",
    category: 'commercial_financier',
    price: 6000, priceMax: 16000,
    description: "Document d'application de l'Incoterm EXW (Ex Works) détaillant les responsabilités du vendeur et de l'acheteur à l'usine ou au magasin du vendeur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'vendeur', label: "Nom du vendeur", type: 'text', required: true },
      { key: 'lieu_livraison', label: "Lieu de mise à disposition (EXW)", type: 'text', required: true },
      { key: 'marchandise', label: "Désignation de la marchandise", type: 'textarea', required: true },
      { key: 'date_disponibilite', label: "Date de disponibilité", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONDITIONS DE LIVRAISON — INCOTERM EXW</h1><p><strong>Vendeur :</strong> {{vendeur}}</p><p><strong>Lieu EXW :</strong> {{lieu_livraison}}</p><p><strong>Marchandise :</strong> {{marchandise}}</p><p><strong>Date de disponibilité :</strong> {{date_disponibilite}}</p><p>Aux termes de l'Incoterm EXW (Incoterms® 2020), le vendeur met la marchandise à disposition de l'acheteur au lieu convenu. Tous les frais et risques au-delà de ce point incombent à l'acheteur.</p></div>`
  },
  {
    code: 'imex2_incoterm_cip',
    name: "Conditions de Livraison Incoterm CIP",
    category: 'commercial_financier',
    price: 6000, priceMax: 16000,
    description: "Document d'application de l'Incoterm CIP (Carriage and Insurance Paid To) avec détail des obligations d'assurance et de transport jusqu'au lieu de destination.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'vendeur', label: "Nom du vendeur", type: 'text', required: true },
      { key: 'lieu_destination', label: "Lieu de destination (CIP)", type: 'text', required: true },
      { key: 'marchandise', label: "Désignation de la marchandise", type: 'textarea', required: true },
      { key: 'transporteur', label: "Nom du transporteur désigné", type: 'text', required: true },
      { key: 'date_expedition', label: "Date d'expédition prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONDITIONS DE LIVRAISON — INCOTERM CIP</h1><p><strong>Vendeur :</strong> {{vendeur}}</p><p><strong>Lieu de destination :</strong> {{lieu_destination}}</p><p><strong>Marchandise :</strong> {{marchandise}}</p><p><strong>Transporteur :</strong> {{transporteur}}</p><p><strong>Date d'expédition :</strong> {{date_expedition}}</p><p>Le vendeur supporte le fret et l'assurance minimale jusqu'au lieu de destination convenu (Incoterms® 2020 — CIP). Le risque est transféré à l'acheteur lors de la remise au transporteur.</p></div>`
  },
  {
    code: 'imex2_incoterm_ddp',
    name: "Conditions de Livraison Incoterm DDP",
    category: 'commercial_financier',
    price: 7000, priceMax: 18000,
    description: "Document d'application de l'Incoterm DDP (Delivered Duty Paid) avec prise en charge intégrale par le vendeur jusqu'à la destination finale, droits de douane inclus.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'vendeur', label: "Nom du vendeur", type: 'text', required: true },
      { key: 'acheteur', label: "Nom de l'acheteur", type: 'text', required: true },
      { key: 'adresse_livraison', label: "Adresse de livraison finale (DDP)", type: 'textarea', required: true },
      { key: 'valeur_marchandise', label: "Valeur de la marchandise (USD/EUR)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONDITIONS DE LIVRAISON — INCOTERM DDP</h1><p><strong>Vendeur :</strong> {{vendeur}}</p><p><strong>Acheteur :</strong> {{acheteur}}</p><p><strong>Adresse DDP :</strong> {{adresse_livraison}}</p><p><strong>Valeur :</strong> {{valeur_marchandise}}</p><p><strong>Date de livraison :</strong> {{date_livraison}}</p><p>Le vendeur supporte l'intégralité des frais, risques et droits de douane jusqu'à la livraison à l'adresse convenue (Incoterms® 2020 — DDP).</p></div>`
  },
  {
    code: 'imex2_accord_representation_intl',
    name: "Accord de Représentation Commerciale Internationale",
    category: 'commercial_financier',
    price: 10000, priceMax: 28000,
    description: "Convention encadrant la représentation commerciale d'un exportateur par un agent ou représentant sur un territoire étranger, avec commission et exclusivité.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'mandant', label: "Raison sociale du mandant (exportateur)", type: 'text', required: true },
      { key: 'representant', label: "Raison sociale du représentant", type: 'text', required: true },
      { key: 'territoire', label: "Territoire de représentation", type: 'text', required: true },
      { key: 'taux_commission', label: "Taux de commission (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE REPRÉSENTATION COMMERCIALE INTERNATIONALE</h1><p><strong>Mandant :</strong> {{mandant}}</p><p><strong>Représentant :</strong> {{representant}}</p><p><strong>Territoire :</strong> {{territoire}}</p><p><strong>Commission :</strong> {{taux_commission}}%</p><p><strong>Date de début :</strong> {{date_debut}}</p><p>Le mandant confie au représentant la promotion et la vente de ses produits sur le territoire désigné, selon les modalités définies ci-après.</p></div>`
  },
  {
    code: 'imex2_contrat_agent_export',
    name: "Contrat d'Agent à l'Export",
    category: 'commercial_financier',
    price: 9000, priceMax: 25000,
    description: "Contrat encadrant la mission d'un agent commercial mandaté par un exportateur pour prospecter et conclure des ventes à l'étranger en son nom.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'exportateur', label: "Nom de l'exportateur", type: 'text', required: true },
      { key: 'agent', label: "Nom de l'agent commercial", type: 'text', required: true },
      { key: 'zone_prospection', label: "Zone géographique de prospection", type: 'text', required: true },
      { key: 'produits', label: "Produits ou services concernés", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT D'AGENT À L'EXPORT</h1><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Agent :</strong> {{agent}}</p><p><strong>Zone :</strong> {{zone_prospection}}</p><p><strong>Produits :</strong> {{produits}}</p><p><strong>Date :</strong> {{date_signature}}</p><p>L'agent s'engage à prospecter et à développer les ventes des produits de l'exportateur dans la zone géographique définie, conformément aux instructions et objectifs convenus.</p></div>`
  },
  {
    code: 'imex2_distribution_exclusive_pays_tiers',
    name: "Convention de Distribution Exclusive Pays Tiers",
    category: 'commercial_financier',
    price: 11000, priceMax: 30000,
    description: "Convention accordant à un distributeur un droit exclusif de revente des produits d'un fournisseur dans un ou plusieurs pays tiers, avec objectifs de vente.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'fournisseur', label: "Raison sociale du fournisseur", type: 'text', required: true },
      { key: 'distributeur', label: "Raison sociale du distributeur", type: 'text', required: true },
      { key: 'pays_exclusivite', label: "Pays ou territoire d'exclusivité", type: 'text', required: true },
      { key: 'objectif_annuel', label: "Objectif annuel de vente (valeur)", type: 'text', required: true },
      { key: 'duree_contrat', label: "Durée du contrat (années)", type: 'text', required: true },
      { key: 'date_effet', label: "Date d'entrée en vigueur", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE DISTRIBUTION EXCLUSIVE — PAYS TIERS</h1><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>Distributeur :</strong> {{distributeur}}</p><p><strong>Territoire exclusif :</strong> {{pays_exclusivite}}</p><p><strong>Objectif annuel :</strong> {{objectif_annuel}}</p><p><strong>Durée :</strong> {{duree_contrat}} an(s)</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><p>Le fournisseur concède au distributeur le droit exclusif de commercialiser ses produits sur le territoire désigné, sous réserve de l'atteinte des objectifs de vente convenus.</p></div>`
  },
  {
    code: 'imex2_licence_importation',
    name: "Licence d'Importation",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Document de demande et d'octroi de licence d'importation conforme aux réglementations douanières et commerciales en vigueur en Côte d'Ivoire et en zone CEDEAO.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'importateur', label: "Raison sociale de l'importateur", type: 'text', required: true },
      { key: 'pays_origine', label: "Pays d'origine des marchandises", type: 'text', required: true },
      { key: 'marchandise', label: "Nature des marchandises", type: 'textarea', required: true },
      { key: 'valeur_cif', label: "Valeur CIF estimée (FCFA)", type: 'text', required: true },
      { key: 'date_demande', label: "Date de la demande", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>LICENCE D'IMPORTATION</h1><p><strong>Importateur :</strong> {{importateur}}</p><p><strong>Pays d'origine :</strong> {{pays_origine}}</p><p><strong>Marchandises :</strong> {{marchandise}}</p><p><strong>Valeur CIF :</strong> {{valeur_cif}} FCFA</p><p><strong>Date de la demande :</strong> {{date_demande}}</p><p>La présente licence autorise l'importateur à procéder à l'importation des marchandises décrites ci-dessus, conformément à la réglementation en vigueur.</p></div>`
  },
  {
    code: 'imex2_licence_exportation',
    name: "Licence d'Exportation",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Document de demande et d'octroi de licence d'exportation pour les marchandises soumises à contrôle à l'export, conforme à la réglementation CEDEAO et nationale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      { key: 'exportateur', label: "Raison sociale de l'exportateur", type: 'text', required: true },
      { key: 'pays_destination', label: "Pays de destination", type: 'text', required: true },
      { key: 'marchandise', label: "Nature des marchandises à exporter", type: 'textarea', required: true },
      { key: 'valeur_fob', label: "Valeur FOB (FCFA)", type: 'text', required: true },
      { key: 'date_demande', label: "Date de la demande", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>LICENCE D'EXPORTATION</h1><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Pays de destination :</strong> {{pays_destination}}</p><p><strong>Marchandises :</strong> {{marchandise}}</p><p><strong>Valeur FOB :</strong> {{valeur_fob}} FCFA</p><p><strong>Date de la demande :</strong> {{date_demande}}</p><p>La présente licence autorise l'exportateur à procéder à l'exportation des marchandises décrites, sous réserve du respect des conditions réglementaires applicables.</p></div>`
  },
  {
    code: 'imex2_certificat_phytosanitaire',
    name: "Certificat Phytosanitaire Export",
    category: 'commercial_financier',
    price: 4000, priceMax: 10000,
    description: "Certificat phytosanitaire attestant que les végétaux et produits végétaux exportés sont conformes aux exigences sanitaires du pays importateur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'exportateur', label: "Nom et adresse de l'exportateur", type: 'text', required: true },
      { key: 'produit', label: "Dénomination botanique du produit", type: 'text', required: true },
      { key: 'quantite', label: "Quantité et unité de mesure", type: 'text', required: true },
      { key: 'pays_destination', label: "Pays de destination", type: 'text', required: true },
      { key: 'date_inspection', label: "Date d'inspection", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CERTIFICAT PHYTOSANITAIRE EXPORT</h1><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Produit :</strong> {{produit}}</p><p><strong>Quantité :</strong> {{quantite}}</p><p><strong>Pays de destination :</strong> {{pays_destination}}</p><p><strong>Date d'inspection :</strong> {{date_inspection}}</p><p>Les services phytosanitaires compétents certifient que les végétaux et produits végétaux décrits ont été inspectés et sont conformes aux exigences phytosanitaires du pays importateur.</p></div>`
  },
  {
    code: 'imex2_certificat_veterinaire',
    name: "Certificat Vétérinaire Export",
    category: 'commercial_financier',
    price: 4000, priceMax: 10000,
    description: "Certificat sanitaire vétérinaire attestant que les animaux ou produits d'origine animale exportés répondent aux normes sanitaires du pays destinataire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      { key: 'exportateur', label: "Nom de l'exportateur", type: 'text', required: true },
      { key: 'produit_animal', label: "Nature du produit ou animal", type: 'text', required: true },
      { key: 'quantite', label: "Quantité / Poids brut", type: 'text', required: true },
      { key: 'pays_destination', label: "Pays de destination", type: 'text', required: true },
      { key: 'date_certificat', label: "Date du certificat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CERTIFICAT VÉTÉRINAIRE EXPORT</h1><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Produit / Animal :</strong> {{produit_animal}}</p><p><strong>Quantité :</strong> {{quantite}}</p><p><strong>Destination :</strong> {{pays_destination}}</p><p><strong>Date :</strong> {{date_certificat}}</p><p>Le vétérinaire officiel soussigné certifie que les animaux ou produits d'origine animale décrits ci-dessus satisfont aux conditions sanitaires requises par les autorités du pays importateur.</p></div>`
  },
  {
    code: 'imex2_rapport_inspection_ovs',
    name: "Rapport d'Inspection Avant Embarquement (OVS)",
    category: 'commercial_financier',
    price: 7000, priceMax: 18000,
    description: "Rapport d'inspection avant embarquement établi par un organisme de vérification agréé (OVS), attestant la conformité des marchandises en qualité, quantité et prix.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      { key: 'exportateur', label: "Exportateur inspecté", type: 'text', required: true },
      { key: 'marchandise', label: "Description des marchandises", type: 'textarea', required: true },
      { key: 'valeur_declaree', label: "Valeur déclarée (USD)", type: 'text', required: true },
      { key: 'lieu_inspection', label: "Lieu d'inspection", type: 'text', required: true },
      { key: 'date_inspection', label: "Date de l'inspection", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT D'INSPECTION AVANT EMBARQUEMENT</h1><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Marchandises :</strong> {{marchandise}}</p><p><strong>Valeur déclarée :</strong> {{valeur_declaree}} USD</p><p><strong>Lieu :</strong> {{lieu_inspection}}</p><p><strong>Date :</strong> {{date_inspection}}</p><p>L'organisme de vérification soussigné atteste avoir procédé à l'inspection des marchandises susmentionnées et confirme leur conformité aux spécifications contractuelles et réglementaires.</p></div>`
  },
  {
    code: 'imex2_lettre_credit_documentaire',
    name: "Lettre de Crédit Documentaire (LC)",
    category: 'commercial_financier',
    price: 12000, priceMax: 35000,
    description: "Modèle de lettre de crédit documentaire irrévocable émis par une banque en faveur d'un exportateur, conditionnant le paiement à la présentation de documents conformes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      { key: 'banque_emettrice', label: "Banque émettrice", type: 'text', required: true },
      { key: 'beneficiaire', label: "Bénéficiaire (exportateur)", type: 'text', required: true },
      { key: 'montant', label: "Montant du crédit (devise)", type: 'text', required: true },
      { key: 'date_expiration', label: "Date d'expiration du crédit", type: 'date', required: true },
      { key: 'documents_requis', label: "Documents requis (liste)", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>LETTRE DE CRÉDIT DOCUMENTAIRE (LC)</h1><p><strong>Banque émettrice :</strong> {{banque_emettrice}}</p><p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p><p><strong>Montant :</strong> {{montant}}</p><p><strong>Date d'expiration :</strong> {{date_expiration}}</p><p><strong>Documents requis :</strong> {{documents_requis}}</p><p>La présente lettre de crédit irrévocable est émise conformément aux Règles et Usances Uniformes de la CCI (RUU 600). Le paiement sera effectué contre présentation des documents conformes dans les délais impartis.</p></div>`
  },
  {
    code: 'imex2_lettre_credit_standby',
    name: "Lettre de Crédit Standby (SBLC)",
    category: 'commercial_financier',
    price: 12000, priceMax: 35000,
    description: "Garantie bancaire sous forme de lettre de crédit standby utilisée comme instrument de sûreté dans les transactions commerciales internationales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      { key: 'banque_garante', label: "Banque garante (émettrice SBLC)", type: 'text', required: true },
      { key: 'beneficiaire', label: "Bénéficiaire", type: 'text', required: true },
      { key: 'donneur_ordre', label: "Donneur d'ordre", type: 'text', required: true },
      { key: 'montant_garanti', label: "Montant garanti (devise)", type: 'text', required: true },
      { key: 'date_expiration', label: "Date d'expiration", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>LETTRE DE CRÉDIT STANDBY (SBLC)</h1><p><strong>Banque garante :</strong> {{banque_garante}}</p><p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p><p><strong>Donneur d'ordre :</strong> {{donneur_ordre}}</p><p><strong>Montant :</strong> {{montant_garanti}}</p><p><strong>Expiration :</strong> {{date_expiration}}</p><p>La présente SBLC constitue un engagement irrévocable de la banque garante de payer le bénéficiaire sur simple demande conforme, en cas de défaillance du donneur d'ordre.</p></div>`
  },
  {
    code: 'imex2_garantie_bancaire_export',
    name: "Garantie Bancaire Export",
    category: 'commercial_financier',
    price: 10000, priceMax: 28000,
    description: "Acte de garantie bancaire émis au profit d'un acheteur étranger couvrant la bonne exécution d'un contrat d'exportation ou le remboursement d'avances.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'banque', label: "Banque émettrice de la garantie", type: 'text', required: true },
      { key: 'exportateur', label: "Exportateur (débiteur principal)", type: 'text', required: true },
      { key: 'acheteur_etranger', label: "Acheteur étranger (bénéficiaire)", type: 'text', required: true },
      { key: 'montant_garantie', label: "Montant de la garantie", type: 'text', required: true },
      { key: 'date_validite', label: "Date de validité", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>GARANTIE BANCAIRE EXPORT</h1><p><strong>Banque :</strong> {{banque}}</p><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Bénéficiaire :</strong> {{acheteur_etranger}}</p><p><strong>Montant :</strong> {{montant_garantie}}</p><p><strong>Validité :</strong> {{date_validite}}</p><p>La banque soussignée s'engage irrévocablement à payer au bénéficiaire la somme indiquée sur première demande conforme, en couverture des obligations de l'exportateur au titre du contrat sous-jacent.</p></div>`
  },
  {
    code: 'imex2_assurance_credit_export',
    name: "Assurance Crédit Export (type COFACE)",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Police d'assurance crédit à l'exportation couvrant le risque de non-paiement par l'acheteur étranger, sur le modèle des organismes publics de crédit export.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'assureur', label: "Assureur crédit export", type: 'text', required: true },
      { key: 'exportateur', label: "Exportateur assuré", type: 'text', required: true },
      { key: 'acheteur', label: "Acheteur étranger assuré", type: 'text', required: true },
      { key: 'encours_max', label: "Encours maximum garanti", type: 'text', required: true },
      { key: 'date_prise_effet', label: "Date de prise d'effet", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ASSURANCE CRÉDIT EXPORT</h1><p><strong>Assureur :</strong> {{assureur}}</p><p><strong>Exportateur assuré :</strong> {{exportateur}}</p><p><strong>Acheteur couvert :</strong> {{acheteur}}</p><p><strong>Encours maximum :</strong> {{encours_max}}</p><p><strong>Date d'effet :</strong> {{date_prise_effet}}</p><p>La présente police garantit l'exportateur contre le risque d'insolvabilité ou de défaut de paiement de l'acheteur étranger, dans les limites et conditions définies aux conditions particulières.</p></div>`
  },
  {
    code: 'imex2_accord_compensation_barter',
    name: "Accord de Compensation Commerciale (Barter)",
    category: 'commercial_financier',
    price: 9000, priceMax: 24000,
    description: "Convention de compensation commerciale bilatérale par laquelle deux parties échangent des marchandises ou services de valeur équivalente sans flux monétaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'partie_a', label: "Partie A (raison sociale)", type: 'text', required: true },
      { key: 'partie_b', label: "Partie B (raison sociale)", type: 'text', required: true },
      { key: 'fournitures_a', label: "Fournitures de la Partie A", type: 'textarea', required: true },
      { key: 'fournitures_b', label: "Fournitures de la Partie B", type: 'textarea', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COMPENSATION COMMERCIALE (BARTER)</h1><p><strong>Partie A :</strong> {{partie_a}}</p><p><strong>Partie B :</strong> {{partie_b}}</p><p><strong>Fournitures A :</strong> {{fournitures_a}}</p><p><strong>Fournitures B :</strong> {{fournitures_b}}</p><p><strong>Date :</strong> {{date_accord}}</p><p>Les parties conviennent d'échanger les fournitures décrites ci-dessus selon le principe de la compensation commerciale. Aucun flux monétaire net ne sera généré entre les parties sauf déséquilibre de valeur.</p></div>`
  },
  {
    code: 'imex2_contrat_troc_international',
    name: "Contrat de Troc International",
    category: 'commercial_financier',
    price: 8000, priceMax: 20000,
    description: "Contrat formalisant un échange direct de biens entre deux opérateurs de pays différents, sans utilisation de monnaie, avec valorisation des lots échangés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'fournisseur_a', label: "Fournisseur A (pays et société)", type: 'text', required: true },
      { key: 'fournisseur_b', label: "Fournisseur B (pays et société)", type: 'text', required: true },
      { key: 'lot_a', label: "Description du lot A", type: 'textarea', required: true },
      { key: 'lot_b', label: "Description du lot B", type: 'textarea', required: true },
      { key: 'date_echange', label: "Date prévue de l'échange", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TROC INTERNATIONAL</h1><p><strong>Fournisseur A :</strong> {{fournisseur_a}}</p><p><strong>Fournisseur B :</strong> {{fournisseur_b}}</p><p><strong>Lot A :</strong> {{lot_a}}</p><p><strong>Lot B :</strong> {{lot_b}}</p><p><strong>Date d'échange :</strong> {{date_echange}}</p><p>Les parties s'engagent à livrer leurs lots respectifs aux conditions convenues. La valeur de chaque lot a été évaluée d'un commun accord et figure en annexe.</p></div>`
  },
  {
    code: 'imex2_accord_joint_venture_export',
    name: "Accord de Joint-Venture Export",
    category: 'commercial_financier',
    price: 14000, priceMax: 40000,
    description: "Convention de coentreprise constituée entre deux sociétés pour mener conjointement des opérations d'exportation, avec partage des risques, apports et bénéfices.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'partenaire_1', label: "Partenaire 1 (raison sociale et pays)", type: 'text', required: true },
      { key: 'partenaire_2', label: "Partenaire 2 (raison sociale et pays)", type: 'text', required: true },
      { key: 'objet_jv', label: "Objet de la joint-venture", type: 'textarea', required: true },
      { key: 'quote_part', label: "Répartition des parts (%)", type: 'text', required: true },
      { key: 'date_creation', label: "Date de création", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE JOINT-VENTURE EXPORT</h1><p><strong>Partenaire 1 :</strong> {{partenaire_1}}</p><p><strong>Partenaire 2 :</strong> {{partenaire_2}}</p><p><strong>Objet :</strong> {{objet_jv}}</p><p><strong>Répartition :</strong> {{quote_part}}</p><p><strong>Date :</strong> {{date_creation}}</p><p>Les parties fondent la présente joint-venture afin de mener conjointement les opérations d'exportation définies ci-dessus, partageant les apports, risques et résultats dans les proportions convenues.</p></div>`
  },
  {
    code: 'imex2_licence_technologique_export',
    name: "Contrat de Licence Technologique Export",
    category: 'commercial_financier',
    price: 13000, priceMax: 38000,
    description: "Contrat concédant à un licencié étranger le droit d'utiliser une technologie, un brevet ou un savoir-faire dans le cadre d'opérations à l'exportation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'concedant', label: "Concédant (titulaire de la technologie)", type: 'text', required: true },
      { key: 'licencie', label: "Licencié (bénéficiaire étranger)", type: 'text', required: true },
      { key: 'technologie', label: "Description de la technologie concédée", type: 'textarea', required: true },
      { key: 'redevance', label: "Taux de redevance (royalty %)", type: 'text', required: true },
      { key: 'date_contrat', label: "Date du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE LICENCE TECHNOLOGIQUE EXPORT</h1><p><strong>Concédant :</strong> {{concedant}}</p><p><strong>Licencié :</strong> {{licencie}}</p><p><strong>Technologie :</strong> {{technologie}}</p><p><strong>Redevance :</strong> {{redevance}}%</p><p><strong>Date :</strong> {{date_contrat}}</p><p>Le concédant accorde au licencié une licence non exclusive (ou exclusive selon option) d'utilisation de la technologie décrite, dans les territoires et pour les usages définis aux conditions particulières.</p></div>`
  },
  {
    code: 'imex2_accord_franchise_internationale',
    name: "Accord de Franchise Internationale",
    category: 'commercial_financier',
    price: 15000, priceMax: 42000,
    description: "Contrat de franchise internationale permettant à un franchisé étranger d'exploiter la marque et le concept du franchiseur, avec obligations de redevances et de normes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      { key: 'franchiseur', label: "Franchiseur (raison sociale)", type: 'text', required: true },
      { key: 'franchise', label: "Franchisé (raison sociale et pays)", type: 'text', required: true },
      { key: 'concept', label: "Concept ou marque franchisée", type: 'text', required: true },
      { key: 'droit_entree', label: "Droit d'entrée (montant)", type: 'text', required: true },
      { key: 'date_contrat', label: "Date du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE FRANCHISE INTERNATIONALE</h1><p><strong>Franchiseur :</strong> {{franchiseur}}</p><p><strong>Franchisé :</strong> {{franchise}}</p><p><strong>Concept :</strong> {{concept}}</p><p><strong>Droit d'entrée :</strong> {{droit_entree}}</p><p><strong>Date :</strong> {{date_contrat}}</p><p>Le franchiseur concède au franchisé le droit d'exploiter le concept et la marque définis ci-dessus sur le territoire convenu, selon le manuel opératoire et les normes du réseau.</p></div>`
  },
  {
    code: 'imex2_contrat_master_franchise_afrique',
    name: "Contrat de Master Franchise Afrique",
    category: 'commercial_financier',
    price: 18000, priceMax: 50000,
    description: "Contrat de master franchise conférant à un opérateur africain le droit de développer et de sous-franchiser un réseau sur un territoire régional africain.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'franchiseur_principal', label: "Franchiseur principal", type: 'text', required: true },
      { key: 'master_franchisee', label: "Master franchisé", type: 'text', required: true },
      { key: 'territoire_afrique', label: "Territoire africain couvert", type: 'text', required: true },
      { key: 'quota_ouvertures', label: "Quota d'ouvertures contractuelles", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MASTER FRANCHISE AFRIQUE</h1><p><strong>Franchiseur principal :</strong> {{franchiseur_principal}}</p><p><strong>Master franchisé :</strong> {{master_franchisee}}</p><p><strong>Territoire :</strong> {{territoire_afrique}}</p><p><strong>Quota :</strong> {{quota_ouvertures}} ouvertures</p><p><strong>Date :</strong> {{date_signature}}</p><p>Le franchiseur principal concède au master franchisé le droit exclusif de développer et de sous-franchiser le réseau sur le territoire africain désigné, selon les modalités et le calendrier définis.</p></div>`
  },
  {
    code: 'imex2_convention_cedeao_commerce',
    name: "Convention CEDEAO Commerce",
    category: 'commercial_financier',
    price: 7000, priceMax: 18000,
    description: "Convention commerciale entre opérateurs de la zone CEDEAO bénéficiant des préférences tarifaires et des facilités prévues par le Schéma de Libéralisation des Échanges.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'entreprise_a', label: "Entreprise A (pays CEDEAO)", type: 'text', required: true },
      { key: 'entreprise_b', label: "Entreprise B (pays CEDEAO)", type: 'text', required: true },
      { key: 'produits', label: "Produits échangés", type: 'textarea', required: true },
      { key: 'regime_tarifaire', label: "Régime tarifaire applicable (SLE-CEDEAO)", type: 'text', required: true },
      { key: 'date_convention', label: "Date de la convention", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION COMMERCIALE CEDEAO</h1><p><strong>Entreprise A :</strong> {{entreprise_a}}</p><p><strong>Entreprise B :</strong> {{entreprise_b}}</p><p><strong>Produits :</strong> {{produits}}</p><p><strong>Régime tarifaire :</strong> {{regime_tarifaire}}</p><p><strong>Date :</strong> {{date_convention}}</p><p>Les parties bénéficient des préférences commerciales accordées par le Schéma de Libéralisation des Échanges de la CEDEAO et s'engagent à respecter les règles d'origine et procédures applicables.</p></div>`
  },
  {
    code: 'imex2_accord_commercial_bilateral',
    name: "Accord Commercial Bilatéral",
    category: 'commercial_financier',
    price: 9000, priceMax: 24000,
    description: "Accord cadre bilatéral entre deux entreprises de pays différents définissant les conditions générales de leurs échanges commerciaux sur une période pluriannuelle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'societe_1', label: "Société 1 (pays et dénomination)", type: 'text', required: true },
      { key: 'societe_2', label: "Société 2 (pays et dénomination)", type: 'text', required: true },
      { key: 'domaines', label: "Domaines de coopération commerciale", type: 'textarea', required: true },
      { key: 'duree', label: "Durée de l'accord (années)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD COMMERCIAL BILATÉRAL</h1><p><strong>Société 1 :</strong> {{societe_1}}</p><p><strong>Société 2 :</strong> {{societe_2}}</p><p><strong>Domaines :</strong> {{domaines}}</p><p><strong>Durée :</strong> {{duree}} an(s)</p><p><strong>Date :</strong> {{date_signature}}</p><p>Les parties conviennent de développer leurs échanges commerciaux dans les domaines définis, selon les conditions générales établies au présent accord et ses annexes.</p></div>`
  },
  {
    code: 'imex2_rapport_veille_marche_export',
    name: "Rapport de Veille Marché Export",
    category: 'commercial_financier',
    price: 6000, priceMax: 16000,
    description: "Rapport structuré de veille et d'intelligence économique sur un marché export ciblé, couvrant la concurrence, les tendances et les opportunités commerciales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'redacteur', label: "Rédacteur du rapport", type: 'text', required: true },
      { key: 'marche_cible', label: "Marché export ciblé (pays/région)", type: 'text', required: true },
      { key: 'secteur', label: "Secteur d'activité analysé", type: 'text', required: true },
      { key: 'synthese', label: "Synthèse des conclusions", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE VEILLE MARCHÉ EXPORT</h1><p><strong>Rédacteur :</strong> {{redacteur}}</p><p><strong>Marché ciblé :</strong> {{marche_cible}}</p><p><strong>Secteur :</strong> {{secteur}}</p><p><strong>Synthèse :</strong> {{synthese}}</p><p><strong>Date :</strong> {{date_rapport}}</p><p>Le présent rapport présente une analyse structurée de l'environnement commercial, concurrentiel et réglementaire du marché ciblé, afin d'orienter la stratégie export de l'entreprise.</p></div>`
  },

  // ─── DOUANES / TRANSIT (dou_) ────────────────────────────────────────────────
  {
    code: 'dou_declaration_importation_dai',
    name: "Déclaration en Douane d'Importation (DAI)",
    category: 'transport_logistique',
    price: 5000, priceMax: 14000,
    description: "Formulaire de déclaration en douane d'importation (DAI) conforme aux procédures de la Direction Générale des Douanes de Côte d'Ivoire via le système SYDAM World.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 92,
    fieldsJson: F([
      { key: 'declarant', label: "Déclarant / Commissionnaire agréé", type: 'text', required: true },
      { key: 'importateur', label: "Importateur (destinataire réel)", type: 'text', required: true },
      { key: 'marchandise', label: "Désignation des marchandises", type: 'textarea', required: true },
      { key: 'valeur_cif', label: "Valeur CIF (FCFA)", type: 'text', required: true },
      { key: 'date_depot', label: "Date de dépôt de la déclaration", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>DÉCLARATION EN DOUANE D'IMPORTATION (DAI)</h1><p><strong>Déclarant :</strong> {{declarant}}</p><p><strong>Importateur :</strong> {{importateur}}</p><p><strong>Marchandises :</strong> {{marchandise}}</p><p><strong>Valeur CIF :</strong> {{valeur_cif}} FCFA</p><p><strong>Date de dépôt :</strong> {{date_depot}}</p><p>Je soussigné certifie l'exactitude des informations figurant dans la présente déclaration et m'engage à acquitter les droits et taxes exigibles conformément à la réglementation douanière en vigueur.</p></div>`
  },
  {
    code: 'dou_declaration_exportation_dae',
    name: "Déclaration en Douane d'Exportation (DAE)",
    category: 'transport_logistique',
    price: 5000, priceMax: 14000,
    description: "Formulaire de déclaration en douane d'exportation (DAE) permettant la formalisation de la sortie de marchandises du territoire douanier national.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 88,
    fieldsJson: F([
      { key: 'declarant', label: "Déclarant / Commissionnaire agréé", type: 'text', required: true },
      { key: 'exportateur', label: "Exportateur (expéditeur réel)", type: 'text', required: true },
      { key: 'marchandise', label: "Désignation des marchandises", type: 'textarea', required: true },
      { key: 'valeur_fob', label: "Valeur FOB (FCFA)", type: 'text', required: true },
      { key: 'date_depot', label: "Date de dépôt", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>DÉCLARATION EN DOUANE D'EXPORTATION (DAE)</h1><p><strong>Déclarant :</strong> {{declarant}}</p><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Marchandises :</strong> {{marchandise}}</p><p><strong>Valeur FOB :</strong> {{valeur_fob}} FCFA</p><p><strong>Date :</strong> {{date_depot}}</p><p>Le soussigné déclare que les marchandises décrites sont destinées à l'exportation et que les informations fournies sont exactes et conformes aux documents présentés.</p></div>`
  },
  {
    code: 'dou_declaration_transit_t1',
    name: "Déclaration de Transit (T1)",
    category: 'transport_logistique',
    price: 4000, priceMax: 10000,
    description: "Déclaration de transit douanier T1 permettant le transport de marchandises non communautaires ou non dédouanées sous scellement d'un bureau à un autre.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'declarant', label: "Déclarant en douane", type: 'text', required: true },
      { key: 'bureau_depart', label: "Bureau de douane de départ", type: 'text', required: true },
      { key: 'bureau_destination', label: "Bureau de douane de destination", type: 'text', required: true },
      { key: 'marchandise', label: "Désignation des marchandises en transit", type: 'textarea', required: true },
      { key: 'date_declaration', label: "Date de la déclaration", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE TRANSIT (T1)</h1><p><strong>Déclarant :</strong> {{declarant}}</p><p><strong>Bureau départ :</strong> {{bureau_depart}}</p><p><strong>Bureau destination :</strong> {{bureau_destination}}</p><p><strong>Marchandises :</strong> {{marchandise}}</p><p><strong>Date :</strong> {{date_declaration}}</p><p>Les marchandises susmentionnées sont placées sous le régime du transit douanier. Le déclarant s'engage à les présenter intactes au bureau de destination dans le délai prescrit.</p></div>`
  },
  {
    code: 'dou_carnet_ata',
    name: "Carnet ATA",
    category: 'transport_logistique',
    price: 5000, priceMax: 13000,
    description: "Document douanier international (Carnet ATA) permettant l'admission temporaire de marchandises dans un pays étranger sans paiement de droits et taxes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'titulaire', label: "Titulaire du carnet ATA", type: 'text', required: true },
      { key: 'chambre_commerce', label: "Chambre de commerce émettrice", type: 'text', required: true },
      { key: 'marchandise', label: "Description des marchandises temporaires", type: 'textarea', required: true },
      { key: 'pays_destination', label: "Pays de destination", type: 'text', required: true },
      { key: 'date_emission', label: "Date d'émission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CARNET ATA — ADMISSION TEMPORAIRE</h1><p><strong>Titulaire :</strong> {{titulaire}}</p><p><strong>Chambre émettrice :</strong> {{chambre_commerce}}</p><p><strong>Marchandises :</strong> {{marchandise}}</p><p><strong>Pays de destination :</strong> {{pays_destination}}</p><p><strong>Date d'émission :</strong> {{date_emission}}</p><p>Le présent carnet ATA garantit la réexportation des marchandises dans les délais impartis et couvre les droits et taxes susceptibles d'être exigibles en cas de non-réexportation.</p></div>`
  },
  {
    code: 'dou_carnet_tir',
    name: "Carnet TIR",
    category: 'transport_logistique',
    price: 4000, priceMax: 11000,
    description: "Carnet TIR (Transports Internationaux Routiers) permettant le transport sous scellés douaniers de marchandises par route à travers plusieurs pays signataires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'transporteur', label: "Transporteur routier international", type: 'text', required: true },
      { key: 'pays_chargement', label: "Pays de chargement", type: 'text', required: true },
      { key: 'pays_dechargement', label: "Pays de déchargement final", type: 'text', required: true },
      { key: 'plaque_vehicule', label: "Immatriculation du véhicule", type: 'text', required: true },
      { key: 'date_depart', label: "Date de départ", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CARNET TIR — TRANSPORT INTERNATIONAL ROUTIER</h1><p><strong>Transporteur :</strong> {{transporteur}}</p><p><strong>Pays de chargement :</strong> {{pays_chargement}}</p><p><strong>Pays de déchargement :</strong> {{pays_dechargement}}</p><p><strong>Immatriculation :</strong> {{plaque_vehicule}}</p><p><strong>Date de départ :</strong> {{date_depart}}</p><p>Le présent carnet TIR, émis sous l'égide de la Convention TIR de 1975, permet au transporteur de franchir les frontières des pays signataires sans contrôle douanier intermédiaire des marchandises sous scellés.</p></div>`
  },
  {
    code: 'dou_certificat_origine_form_a',
    name: "Certificat d'Origine Form A (SGP)",
    category: 'transport_logistique',
    price: 3000, priceMax: 8000,
    description: "Certificat d'origine Form A permettant aux exportateurs des pays en développement de bénéficier des préférences tarifaires accordées dans le cadre du Système de Préférences Généralisées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'exportateur', label: "Exportateur (nom et adresse)", type: 'text', required: true },
      { key: 'destinataire', label: "Destinataire (nom et pays)", type: 'text', required: true },
      { key: 'produit', label: "Description du produit", type: 'textarea', required: true },
      { key: 'critere_origine', label: "Critère d'origine (P, W, F...)", type: 'text', required: true },
      { key: 'date_emission', label: "Date d'émission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CERTIFICAT D'ORIGINE FORM A — SGP</h1><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Destinataire :</strong> {{destinataire}}</p><p><strong>Produit :</strong> {{produit}}</p><p><strong>Critère d'origine :</strong> {{critere_origine}}</p><p><strong>Date :</strong> {{date_emission}}</p><p>L'autorité compétente soussignée certifie que les marchandises décrites satisfont aux règles d'origine du Système de Préférences Généralisées et peuvent bénéficier des préférences tarifaires accordées.</p></div>`
  },
  {
    code: 'dou_certificat_eur1',
    name: "Certificat EUR.1",
    category: 'transport_logistique',
    price: 3000, priceMax: 8000,
    description: "Certificat de circulation EUR.1 permettant aux exportateurs de bénéficier des préférences tarifaires prévues par les accords de partenariat économique (APE) avec l'Union Européenne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'exportateur', label: "Exportateur (nom et adresse)", type: 'text', required: true },
      { key: 'destinataire', label: "Destinataire dans l'UE", type: 'text', required: true },
      { key: 'marchandise', label: "Description des marchandises", type: 'textarea', required: true },
      { key: 'masse_brute', label: "Masse brute (kg)", type: 'text', required: true },
      { key: 'date_emission', label: "Date d'émission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CERTIFICAT EUR.1</h1><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Destinataire :</strong> {{destinataire}}</p><p><strong>Marchandises :</strong> {{marchandise}}</p><p><strong>Masse brute :</strong> {{masse_brute}} kg</p><p><strong>Date :</strong> {{date_emission}}</p><p>L'autorité douanière compétente certifie que les marchandises décrites sont originaires du pays exportateur et satisfont aux règles d'origine de l'Accord de Partenariat Économique applicable.</p></div>`
  },
  {
    code: 'dou_declaration_valeur_dv1',
    name: "Déclaration de Valeur en Douane (DV1)",
    category: 'transport_logistique',
    price: 4000, priceMax: 10000,
    description: "Formulaire DV1 de déclaration de la valeur en douane des marchandises importées, permettant de justifier la valeur transactionnelle retenue pour le calcul des droits.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'importateur', label: "Importateur (déclarant)", type: 'text', required: true },
      { key: 'fournisseur', label: "Fournisseur étranger", type: 'text', required: true },
      { key: 'marchandise', label: "Désignation des marchandises", type: 'textarea', required: true },
      { key: 'valeur_transaction', label: "Valeur de la transaction (USD)", type: 'text', required: true },
      { key: 'date_facture', label: "Date de la facture commerciale", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE VALEUR EN DOUANE (DV1)</h1><p><strong>Importateur :</strong> {{importateur}}</p><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>Marchandises :</strong> {{marchandise}}</p><p><strong>Valeur transaction :</strong> {{valeur_transaction}} USD</p><p><strong>Date facture :</strong> {{date_facture}}</p><p>Le déclarant certifie que la valeur indiquée correspond au prix effectivement payé ou à payer pour les marchandises importées, conformément à l'Accord sur l'évaluation en douane de l'OMC.</p></div>`
  },
  {
    code: 'dou_procuration_douaniere',
    name: "Procuration Douanière",
    category: 'transport_logistique',
    price: 3000, priceMax: 8000,
    description: "Procuration par laquelle un importateur ou exportateur mandate un commissionnaire en douane agréé pour accomplir toutes formalités douanières en son nom.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      { key: 'mandant', label: "Mandant (importateur ou exportateur)", type: 'text', required: true },
      { key: 'mandataire', label: "Commissionnaire en douane mandaté", type: 'text', required: true },
      { key: 'numero_agrement', label: "Numéro d'agrément douanier du mandataire", type: 'text', required: true },
      { key: 'duree_validite', label: "Durée de validité de la procuration", type: 'text', required: true },
      { key: 'date_etablissement', label: "Date d'établissement", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PROCURATION DOUANIÈRE</h1><p><strong>Mandant :</strong> {{mandant}}</p><p><strong>Mandataire :</strong> {{mandataire}}</p><p><strong>Agrément :</strong> {{numero_agrement}}</p><p><strong>Durée :</strong> {{duree_validite}}</p><p><strong>Date :</strong> {{date_etablissement}}</p><p>Le mandant donne au commissionnaire en douane désigné tous pouvoirs pour accomplir en son nom et pour son compte l'ensemble des formalités douanières liées à ses opérations d'importation et d'exportation.</p></div>`
  },
  {
    code: 'dou_contrat_commissionnaire_agree',
    name: "Contrat de Commissionnaire en Douane Agréé",
    category: 'transport_logistique',
    price: 8000, priceMax: 22000,
    description: "Contrat de prestation encadrant la mission d'un commissionnaire en douane agréé chargé d'accomplir les formalités douanières pour le compte de son client.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 83,
    fieldsJson: F([
      { key: 'commissionnaire', label: "Commissionnaire en douane agréé", type: 'text', required: true },
      { key: 'client', label: "Client (importateur/exportateur)", type: 'text', required: true },
      { key: 'prestations', label: "Prestations convenues", type: 'textarea', required: true },
      { key: 'honoraires', label: "Honoraires et tarifs convenus", type: 'text', required: true },
      { key: 'date_contrat', label: "Date du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMMISSIONNAIRE EN DOUANE AGRÉÉ</h1><p><strong>Commissionnaire :</strong> {{commissionnaire}}</p><p><strong>Client :</strong> {{client}}</p><p><strong>Prestations :</strong> {{prestations}}</p><p><strong>Honoraires :</strong> {{honoraires}}</p><p><strong>Date :</strong> {{date_contrat}}</p><p>Le commissionnaire s'engage à accomplir les formalités douanières décrites avec diligence, dans le respect de la réglementation en vigueur, et sous sa responsabilité professionnelle d'agréé en douane.</p></div>`
  },
  {
    code: 'dou_mandat_representation_douaniere',
    name: "Mandat de Représentation Douanière",
    category: 'transport_logistique',
    price: 3000, priceMax: 8000,
    description: "Mandat de représentation douanière directe ou indirecte permettant à un déclarant agréé d'agir au nom et pour le compte de son client devant les services douaniers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 81,
    fieldsJson: F([
      { key: 'representant', label: "Représentant douanier agréé", type: 'text', required: true },
      { key: 'representé', label: "Personne représentée (mandant)", type: 'text', required: true },
      { key: 'type_representation', label: "Type de représentation (directe / indirecte)", type: 'text', required: true },
      { key: 'operations', label: "Opérations douanières couvertes", type: 'textarea', required: true },
      { key: 'date_mandat', label: "Date du mandat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>MANDAT DE REPRÉSENTATION DOUANIÈRE</h1><p><strong>Représentant :</strong> {{representant}}</p><p><strong>Mandant :</strong> {{representé}}</p><p><strong>Type :</strong> {{type_representation}}</p><p><strong>Opérations :</strong> {{operations}}</p><p><strong>Date :</strong> {{date_mandat}}</p><p>Le mandant confie au représentant douanier désigné le pouvoir d'agir en son nom pour l'ensemble des opérations douanières mentionnées, dans les limites fixées par la réglementation.</p></div>`
  },
  {
    code: 'dou_accord_depot_douanier',
    name: "Accord de Dépôt Douanier",
    category: 'transport_logistique',
    price: 7000, priceMax: 18000,
    description: "Accord encadrant le placement de marchandises en dépôt douanier temporaire dans l'enceinte d'un entrepôt autorisé, en attente de leur destination douanière.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'gestionnaire', label: "Gestionnaire du dépôt douanier", type: 'text', required: true },
      { key: 'deposant', label: "Déposant (importateur)", type: 'text', required: true },
      { key: 'marchandise', label: "Nature des marchandises déposées", type: 'textarea', required: true },
      { key: 'duree_depot', label: "Durée maximale de dépôt", type: 'text', required: true },
      { key: 'date_depot', label: "Date de mise en dépôt", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉPÔT DOUANIER</h1><p><strong>Gestionnaire :</strong> {{gestionnaire}}</p><p><strong>Déposant :</strong> {{deposant}}</p><p><strong>Marchandises :</strong> {{marchandise}}</p><p><strong>Durée max :</strong> {{duree_depot}}</p><p><strong>Date de dépôt :</strong> {{date_depot}}</p><p>Les marchandises décrites sont placées en dépôt douanier temporaire sous la responsabilité du gestionnaire, conformément aux dispositions du Code des Douanes et aux conditions définies au présent accord.</p></div>`
  },
  {
    code: 'dou_autorisation_entrepot_sous_douane',
    name: "Autorisation d'Entrepôt Sous Douane",
    category: 'transport_logistique',
    price: 8000, priceMax: 20000,
    description: "Autorisation administrative permettant à un opérateur d'exploiter un entrepôt de douane pour le stockage de marchandises non dédouanées sous contrôle douanier.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'beneficiaire', label: "Bénéficiaire de l'autorisation", type: 'text', required: true },
      { key: 'localisation', label: "Localisation de l'entrepôt", type: 'text', required: true },
      { key: 'type_entrepot', label: "Type d'entrepôt (public/privé/spécial)", type: 'text', required: true },
      { key: 'capacite', label: "Capacité de stockage (m³ ou tonnes)", type: 'text', required: true },
      { key: 'date_autorisation', label: "Date d'autorisation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>AUTORISATION D'ENTREPÔT SOUS DOUANE</h1><p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p><p><strong>Localisation :</strong> {{localisation}}</p><p><strong>Type :</strong> {{type_entrepot}}</p><p><strong>Capacité :</strong> {{capacite}}</p><p><strong>Date :</strong> {{date_autorisation}}</p><p>La Direction Générale des Douanes autorise le bénéficiaire à exploiter l'entrepôt de douane désigné pour le stockage de marchandises non dédouanées, sous les conditions et contrôles définis.</p></div>`
  },
  {
    code: 'dou_autorisation_perfectionnement_actif',
    name: "Autorisation de Perfectionnement Actif",
    category: 'transport_logistique',
    price: 9000, priceMax: 24000,
    description: "Autorisation douanière permettant d'importer des matières premières en suspension de droits pour les transformer et réexporter les produits compensateurs.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur bénéficiaire", type: 'text', required: true },
      { key: 'matieres_premieres', label: "Matières premières importées", type: 'textarea', required: true },
      { key: 'produits_compensateurs', label: "Produits compensateurs à réexporter", type: 'textarea', required: true },
      { key: 'taux_rendement', label: "Taux de rendement prévu (%)", type: 'text', required: true },
      { key: 'date_autorisation', label: "Date d'autorisation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>AUTORISATION DE PERFECTIONNEMENT ACTIF</h1><p><strong>Opérateur :</strong> {{operateur}}</p><p><strong>Matières premières :</strong> {{matieres_premieres}}</p><p><strong>Produits compensateurs :</strong> {{produits_compensateurs}}</p><p><strong>Taux de rendement :</strong> {{taux_rendement}}%</p><p><strong>Date :</strong> {{date_autorisation}}</p><p>L'opérateur est autorisé à importer les matières premières en suspension de droits de douane et taxes, à condition de réexporter les produits compensateurs dans les délais et proportions convenus.</p></div>`
  },
  {
    code: 'dou_autorisation_perfectionnement_passif',
    name: "Autorisation de Perfectionnement Passif",
    category: 'transport_logistique',
    price: 9000, priceMax: 24000,
    description: "Autorisation douanière permettant d'exporter temporairement des marchandises nationales pour transformation à l'étranger et réimportation avec exonération partielle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur bénéficiaire", type: 'text', required: true },
      { key: 'marchandises_exportees', label: "Marchandises temporairement exportées", type: 'textarea', required: true },
      { key: 'operations_effectuees', label: "Opérations de perfectionnement effectuées à l'étranger", type: 'textarea', required: true },
      { key: 'pays_transformation', label: "Pays de transformation", type: 'text', required: true },
      { key: 'date_autorisation', label: "Date d'autorisation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>AUTORISATION DE PERFECTIONNEMENT PASSIF</h1><p><strong>Opérateur :</strong> {{operateur}}</p><p><strong>Marchandises exportées :</strong> {{marchandises_exportees}}</p><p><strong>Opérations effectuées :</strong> {{operations_effectuees}}</p><p><strong>Pays :</strong> {{pays_transformation}}</p><p><strong>Date :</strong> {{date_autorisation}}</p><p>L'opérateur est autorisé à exporter temporairement les marchandises désignées pour perfectionnement à l'étranger et à les réimporter en bénéficiant d'une exonération totale ou partielle des droits à l'importation.</p></div>`
  },
  {
    code: 'dou_accord_zone_franche_douaniere',
    name: "Accord de Zone Franche Douanière",
    category: 'transport_logistique',
    price: 12000, priceMax: 32000,
    description: "Convention encadrant l'installation et les activités d'un opérateur dans une zone franche douanière, avec les avantages fiscaux et douaniers applicables.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'autorite_zone', label: "Autorité gestionnaire de la zone franche", type: 'text', required: true },
      { key: 'operateur', label: "Opérateur installé dans la zone", type: 'text', required: true },
      { key: 'activites', label: "Activités exercées en zone franche", type: 'textarea', required: true },
      { key: 'avantages', label: "Avantages douaniers accordés", type: 'textarea', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE ZONE FRANCHE DOUANIÈRE</h1><p><strong>Autorité :</strong> {{autorite_zone}}</p><p><strong>Opérateur :</strong> {{operateur}}</p><p><strong>Activités :</strong> {{activites}}</p><p><strong>Avantages :</strong> {{avantages}}</p><p><strong>Date :</strong> {{date_accord}}</p><p>L'opérateur est autorisé à s'installer et à exercer ses activités dans la zone franche désignée, en bénéficiant des avantages douaniers, fiscaux et administratifs accordés conformément à la législation applicable.</p></div>`
  },
  {
    code: 'dou_demande_remboursement_droits',
    name: "Demande de Remboursement de Droits de Douane",
    category: 'transport_logistique',
    price: 5000, priceMax: 13000,
    description: "Formulaire de demande de remboursement ou de crédit de droits de douane indûment payés ou payés en excès, adressé à la Direction Générale des Douanes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'demandeur', label: "Entreprise demanderesse", type: 'text', required: true },
      { key: 'reference_declaration', label: "Référence de la déclaration douanière", type: 'text', required: true },
      { key: 'montant_reclame', label: "Montant réclamé (FCFA)", type: 'text', required: true },
      { key: 'motif', label: "Motif de la demande de remboursement", type: 'textarea', required: true },
      { key: 'date_demande', label: "Date de la demande", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>DEMANDE DE REMBOURSEMENT DE DROITS DE DOUANE</h1><p><strong>Demandeur :</strong> {{demandeur}}</p><p><strong>Référence déclaration :</strong> {{reference_declaration}}</p><p><strong>Montant réclamé :</strong> {{montant_reclame}} FCFA</p><p><strong>Motif :</strong> {{motif}}</p><p><strong>Date :</strong> {{date_demande}}</p><p>Le demandeur sollicite le remboursement des droits de douane payés en excès ou indûment perçus, conformément aux dispositions du Code des Douanes autorisant la répétition des droits trop payés.</p></div>`
  },
  {
    code: 'dou_demande_franchise_douaniere',
    name: "Demande de Franchise Douanière",
    category: 'transport_logistique',
    price: 5000, priceMax: 13000,
    description: "Demande d'exonération ou de réduction de droits de douane pour des marchandises éligibles à un régime de franchise au titre de dispositions légales ou conventionnelles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'demandeur', label: "Importateur demandeur", type: 'text', required: true },
      { key: 'marchandise', label: "Nature des marchandises concernées", type: 'textarea', required: true },
      { key: 'base_legale', label: "Base légale ou conventionnelle invoquée", type: 'text', required: true },
      { key: 'droits_exoneres', label: "Droits et taxes sollicités en exonération", type: 'text', required: true },
      { key: 'date_demande', label: "Date de la demande", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>DEMANDE DE FRANCHISE DOUANIÈRE</h1><p><strong>Demandeur :</strong> {{demandeur}}</p><p><strong>Marchandises :</strong> {{marchandise}}</p><p><strong>Base légale :</strong> {{base_legale}}</p><p><strong>Exonération sollicitée :</strong> {{droits_exoneres}}</p><p><strong>Date :</strong> {{date_demande}}</p><p>L'importateur sollicite la franchise douanière au titre de la base légale invoquée et s'engage à produire tous les documents justificatifs requis par les services des douanes.</p></div>`
  },
  {
    code: 'dou_accord_dgd',
    name: "Accord avec la Direction Générale des Douanes (DGD)",
    category: 'transport_logistique',
    price: 10000, priceMax: 28000,
    description: "Convention de coopération ou protocole d'accord entre un opérateur économique et la Direction Générale des Douanes de Côte d'Ivoire pour faciliter les procédures.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur économique signataire", type: 'text', required: true },
      { key: 'objet_accord', label: "Objet de l'accord avec la DGD", type: 'textarea', required: true },
      { key: 'engagements_operateur', label: "Engagements de l'opérateur", type: 'textarea', required: true },
      { key: 'facilitations', label: "Facilitations accordées par la DGD", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD AVEC LA DIRECTION GÉNÉRALE DES DOUANES (DGD)</h1><p><strong>Opérateur :</strong> {{operateur}}</p><p><strong>Objet :</strong> {{objet_accord}}</p><p><strong>Engagements opérateur :</strong> {{engagements_operateur}}</p><p><strong>Facilitations DGD :</strong> {{facilitations}}</p><p><strong>Date :</strong> {{date_signature}}</p><p>Le présent accord établit les termes de la coopération entre l'opérateur et la DGD, dans le but de fluidifier les procédures douanières tout en assurant le respect de la réglementation.</p></div>`
  },
  {
    code: 'dou_rapport_audit_douanier',
    name: "Rapport d'Audit Douanier",
    category: 'transport_logistique',
    price: 10000, priceMax: 28000,
    description: "Rapport d'audit des procédures douanières d'un opérateur, évaluant la conformité de ses déclarations, sa gestion des régimes suspensifs et son exposition aux risques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'auditeur', label: "Cabinet ou expert auditeur", type: 'text', required: true },
      { key: 'entreprise_auditee', label: "Entreprise auditée", type: 'text', required: true },
      { key: 'perimetre', label: "Périmètre de l'audit (années, opérations)", type: 'text', required: true },
      { key: 'conclusions', label: "Conclusions et recommandations principales", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT DOUANIER</h1><p><strong>Auditeur :</strong> {{auditeur}}</p><p><strong>Entreprise auditée :</strong> {{entreprise_auditee}}</p><p><strong>Périmètre :</strong> {{perimetre}}</p><p><strong>Conclusions :</strong> {{conclusions}}</p><p><strong>Date :</strong> {{date_rapport}}</p><p>Le présent rapport présente les résultats de l'audit douanier conduit sur la période définie, incluant l'évaluation de la conformité des déclarations, des régimes douaniers utilisés et du niveau de risque résiduel.</p></div>`
  },
  {
    code: 'dou_plan_conformite_douaniere',
    name: "Plan de Conformité Douanière",
    category: 'transport_logistique',
    price: 9000, priceMax: 24000,
    description: "Document structuré définissant les actions à mettre en oeuvre par un opérateur pour améliorer ou maintenir sa conformité aux obligations douanières.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise concernée", type: 'text', required: true },
      { key: 'responsable', label: "Responsable douanier désigné", type: 'text', required: true },
      { key: 'axes_amelioration', label: "Axes d'amélioration identifiés", type: 'textarea', required: true },
      { key: 'calendrier', label: "Calendrier de mise en oeuvre", type: 'text', required: true },
      { key: 'date_plan', label: "Date d'établissement du plan", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE CONFORMITÉ DOUANIÈRE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Responsable :</strong> {{responsable}}</p><p><strong>Axes d'amélioration :</strong> {{axes_amelioration}}</p><p><strong>Calendrier :</strong> {{calendrier}}</p><p><strong>Date :</strong> {{date_plan}}</p><p>Le présent plan définit les actions prioritaires à déployer pour renforcer la conformité douanière de l'entreprise, réduire les risques de contentieux et préparer une éventuelle demande de statut OEA.</p></div>`
  },
  {
    code: 'dou_accord_statut_oea',
    name: "Accord de Statut OEA (Opérateur Économique Agréé)",
    category: 'transport_logistique',
    price: 14000, priceMax: 40000,
    description: "Convention d'octroi du statut d'Opérateur Économique Agréé (OEA) permettant à une entreprise de bénéficier de facilitations douanières en reconnaissance de sa fiabilité.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'autorite_douaniere', label: "Autorité douanière accordant le statut", type: 'text', required: true },
      { key: 'operateur', label: "Opérateur économique agréé", type: 'text', required: true },
      { key: 'type_oea', label: "Type OEA (sécurité / sûreté / complet)", type: 'text', required: true },
      { key: 'facilitations', label: "Facilitations douanières accordées", type: 'textarea', required: true },
      { key: 'date_octroi', label: "Date d'octroi du statut", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE STATUT OEA — OPÉRATEUR ÉCONOMIQUE AGRÉÉ</h1><p><strong>Autorité douanière :</strong> {{autorite_douaniere}}</p><p><strong>Opérateur :</strong> {{operateur}}</p><p><strong>Type OEA :</strong> {{type_oea}}</p><p><strong>Facilitations :</strong> {{facilitations}}</p><p><strong>Date d'octroi :</strong> {{date_octroi}}</p><p>L'opérateur est reconnu OEA au titre de sa fiabilité douanière, de la qualité de ses systèmes de contrôle interne et du respect continu de ses obligations douanières. Il bénéficiera des facilitations énumérées pendant toute la durée de validité du statut.</p></div>`
  },
  {
    code: 'dou_contrat_transit_routier_trie',
    name: "Contrat de Transit Routier TRIE-CEDEAO",
    category: 'transport_logistique',
    price: 6000, priceMax: 16000,
    description: "Contrat de transport en transit routier inter-états utilisant la Convention TRIE de la CEDEAO, facilitant la circulation des marchandises entre pays membres.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      { key: 'expediteur', label: "Expéditeur (chargeur)", type: 'text', required: true },
      { key: 'transporteur', label: "Transporteur routier", type: 'text', required: true },
      { key: 'pays_transit', label: "Pays traversés en transit TRIE", type: 'text', required: true },
      { key: 'marchandise', label: "Nature et poids de la marchandise", type: 'textarea', required: true },
      { key: 'date_depart', label: "Date de départ", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRANSIT ROUTIER TRIE-CEDEAO</h1><p><strong>Expéditeur :</strong> {{expediteur}}</p><p><strong>Transporteur :</strong> {{transporteur}}</p><p><strong>Pays de transit :</strong> {{pays_transit}}</p><p><strong>Marchandise :</strong> {{marchandise}}</p><p><strong>Date de départ :</strong> {{date_depart}}</p><p>Le transport est effectué sous le couvert de la Convention TRIE de la CEDEAO, dispensant le transporteur de cautionnement dans chaque pays traversé et facilitant les formalités aux postes frontière.</p></div>`
  },
  {
    code: 'dou_declaration_marchandises_scelles',
    name: "Déclaration de Marchandises Sous Scellés",
    category: 'transport_logistique',
    price: 3000, priceMax: 8000,
    description: "Déclaration attestant que des marchandises sont transportées sous scellés douaniers officieux ou officiels, avec engagement de les présenter intactes au bureau de destination.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'declarant', label: "Déclarant ou transporteur", type: 'text', required: true },
      { key: 'nature_marchandise', label: "Nature des marchandises scellées", type: 'textarea', required: true },
      { key: 'numero_scelles', label: "Numéro(s) de plombs ou de scellés", type: 'text', required: true },
      { key: 'bureau_destination', label: "Bureau de douane de destination", type: 'text', required: true },
      { key: 'date_declaration', label: "Date de la déclaration", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE MARCHANDISES SOUS SCELLÉS</h1><p><strong>Déclarant :</strong> {{declarant}}</p><p><strong>Marchandises :</strong> {{nature_marchandise}}</p><p><strong>Numéros de scellés :</strong> {{numero_scelles}}</p><p><strong>Bureau de destination :</strong> {{bureau_destination}}</p><p><strong>Date :</strong> {{date_declaration}}</p><p>Je soussigné m'engage à présenter les marchandises scellées intactes et en quantité conforme au bureau de douane de destination, sous peine des sanctions prévues par la réglementation douanière.</p></div>`
  },
  {
    code: 'dou_rapport_controle_posteriori',
    name: "Rapport de Contrôle a Posteriori Douanier",
    category: 'transport_logistique',
    price: 8000, priceMax: 22000,
    description: "Rapport établi à l'issue d'un contrôle douanier a posteriori documentant les vérifications effectuées, les anomalies constatées et les suites à donner.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'service_douanier', label: "Service douanier ayant effectué le contrôle", type: 'text', required: true },
      { key: 'entreprise_controlee', label: "Entreprise contrôlée", type: 'text', required: true },
      { key: 'periode_controlee', label: "Période couverte par le contrôle", type: 'text', required: true },
      { key: 'anomalies', label: "Anomalies ou irrégularités constatées", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date du rapport de contrôle", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONTRÔLE A POSTERIORI DOUANIER</h1><p><strong>Service :</strong> {{service_douanier}}</p><p><strong>Entreprise :</strong> {{entreprise_controlee}}</p><p><strong>Période :</strong> {{periode_controlee}}</p><p><strong>Anomalies :</strong> {{anomalies}}</p><p><strong>Date :</strong> {{date_rapport}}</p><p>Le présent rapport consigne les résultats du contrôle douanier a posteriori effectué dans les locaux de l'entreprise, conformément aux dispositions des articles du Code des Douanes relatifs au droit de communication et au contrôle différé.</p></div>`
  },
];
async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 25a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
