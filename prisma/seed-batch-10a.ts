import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates: any[] = [
  // ─── COMMERCE INTERNATIONAL (imex_) ───────────────────────────────────────
  {
    code: 'imex_contrat_vente_fob',
    name: 'Contrat de vente internationale FOB',
    category: 'commercial_financier',
    price: 4500,
    priceMax: 13500,
    description: "Contrat de vente internationale aux conditions FOB (Free On Board) définissant les obligations du vendeur jusqu'à la mise à bord de la marchandise.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'vendeur_raison', label: 'Raison sociale vendeur', type: 'text', required: true },
      { key: 'acheteur_raison', label: 'Raison sociale acheteur', type: 'text', required: true },
      { key: 'port_embarquement', label: "Port d'embarquement", type: 'text', required: true },
      { key: 'description_marchandise', label: 'Description de la marchandise', type: 'textarea', required: true },
      { key: 'quantite', label: 'Quantité', type: 'text', required: true },
      { key: 'prix_unitaire', label: 'Prix unitaire (USD)', type: 'number', required: true },
      { key: 'devise', label: 'Devise de paiement', type: 'text', required: true },
      { key: 'date_livraison', label: 'Date de livraison prévue', type: 'date', required: true },
      { key: 'modalite_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
      { key: 'juridiction', label: 'Juridiction compétente', type: 'text', required: false },
    ]),
    body: `<h1>CONTRAT DE VENTE INTERNATIONALE — CONDITIONS FOB</h1>
<p>Entre les soussignés :</p>
<p><strong>LE VENDEUR :</strong> {{vendeur_raison}}</p>
<p><strong>L'ACHETEUR :</strong> {{acheteur_raison}}</p>
<h2>Article 1 — Objet du contrat</h2>
<p>Le Vendeur s'engage à livrer, aux conditions FOB port {{port_embarquement}}, la marchandise suivante : {{description_marchandise}}, en quantité de {{quantite}}.</p>
<h2>Article 2 — Prix et paiement</h2>
<p>Le prix unitaire est fixé à {{prix_unitaire}} {{devise}}. Les modalités de paiement sont les suivantes : {{modalite_paiement}}.</p>
<h2>Article 3 — Livraison</h2>
<p>La livraison est prévue au plus tard le {{date_livraison}}. Le transfert des risques s'opère au moment de la mise à bord au port d'embarquement.</p>
<h2>Article 4 — Juridiction</h2>
<p>Tout litige sera soumis à la juridiction de {{juridiction}}, avec application des Incoterms® 2020 de la CCI.</p>`,
  },
  {
    code: 'imex_contrat_cif',
    name: 'Contrat de vente internationale CIF',
    category: 'commercial_financier',
    price: 4800,
    priceMax: 14400,
    description: "Contrat de vente internationale aux conditions CIF (Cost, Insurance and Freight) incluant le coût, l'assurance et le fret jusqu'au port de destination.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'vendeur_raison', label: 'Raison sociale vendeur', type: 'text', required: true },
      { key: 'acheteur_raison', label: 'Raison sociale acheteur', type: 'text', required: true },
      { key: 'port_destination', label: 'Port de destination', type: 'text', required: true },
      { key: 'description_marchandise', label: 'Description de la marchandise', type: 'textarea', required: true },
      { key: 'montant_total', label: 'Montant total CIF (USD)', type: 'number', required: true },
      { key: 'compagnie_assurance', label: "Compagnie d'assurance", type: 'text', required: true },
      { key: 'date_expedition', label: "Date d'expédition", type: 'date', required: true },
      { key: 'modalite_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
    ]),
    body: `<h1>CONTRAT DE VENTE INTERNATIONALE — CONDITIONS CIF</h1>
<p><strong>VENDEUR :</strong> {{vendeur_raison}}</p>
<p><strong>ACHETEUR :</strong> {{acheteur_raison}}</p>
<h2>Article 1 — Marchandise</h2>
<p>{{description_marchandise}} — livraison CIF port {{port_destination}}.</p>
<h2>Article 2 — Prix CIF</h2>
<p>Le montant total CIF est de {{montant_total}} USD, assurance souscrite auprès de {{compagnie_assurance}}.</p>
<h2>Article 3 — Expédition et paiement</h2>
<p>Expédition prévue le {{date_expedition}}. Paiement : {{modalite_paiement}}.</p>`,
  },
  {
    code: 'imex_lettre_credit_documentaire',
    name: 'Lettre de crédit documentaire',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Instrument de paiement sécurisé émis par la banque de l'acheteur garantissant le paiement du vendeur contre remise de documents conformes.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'banque_emettrice', label: 'Banque émettrice', type: 'text', required: true },
      { key: 'beneficiaire', label: 'Bénéficiaire (exportateur)', type: 'text', required: true },
      { key: 'donneur_ordre', label: "Donneur d'ordre (importateur)", type: 'text', required: true },
      { key: 'montant', label: 'Montant du crédit (USD)', type: 'number', required: true },
      { key: 'date_expiration', label: "Date d'expiration", type: 'date', required: true },
      { key: 'documents_requis', label: 'Documents requis', type: 'textarea', required: true },
      { key: 'port_expedition', label: "Port d'expédition", type: 'text', required: true },
      { key: 'port_destination', label: 'Port de destination', type: 'text', required: true },
    ]),
    body: `<h1>LETTRE DE CRÉDIT DOCUMENTAIRE IRRÉVOCABLE</h1>
<p><strong>Banque émettrice :</strong> {{banque_emettrice}}</p>
<p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p>
<p><strong>Donneur d'ordre :</strong> {{donneur_ordre}}</p>
<h2>Conditions du crédit</h2>
<p>Montant : {{montant}} USD — Validité : {{date_expiration}}</p>
<p>Expédition de {{port_expedition}} vers {{port_destination}}.</p>
<h2>Documents requis</h2>
<p>{{documents_requis}}</p>`,
  },
  {
    code: 'imex_garantie_bancaire_internationale',
    name: 'Garantie bancaire internationale',
    category: 'commercial_financier',
    price: 7500,
    priceMax: 22500,
    description: "Engagement irrévocable d'une banque de payer un montant déterminé à un bénéficiaire en cas de défaillance du donneur d'ordre dans une transaction internationale.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'banque_garante', label: 'Banque garante', type: 'text', required: true },
      { key: 'donneur_ordre', label: "Donneur d'ordre", type: 'text', required: true },
      { key: 'beneficiaire', label: 'Bénéficiaire', type: 'text', required: true },
      { key: 'montant_garanti', label: 'Montant garanti (USD)', type: 'number', required: true },
      { key: 'type_garantie', label: 'Type de garantie', type: 'text', required: true },
      { key: 'date_echeance', label: "Date d'échéance", type: 'date', required: true },
      { key: 'contrat_reference', label: 'Contrat de référence', type: 'text', required: true },
    ]),
    body: `<h1>GARANTIE BANCAIRE INTERNATIONALE</h1>
<p>La <strong>{{banque_garante}}</strong> s'engage irrévocablement envers <strong>{{beneficiaire}}</strong>, à la demande de <strong>{{donneur_ordre}}</strong>, à payer la somme de {{montant_garanti}} USD.</p>
<h2>Objet de la garantie</h2>
<p>Type : {{type_garantie}} — Contrat de référence : {{contrat_reference}}</p>
<h2>Validité</h2>
<p>Cette garantie expire le {{date_echeance}}. Toute demande de paiement devra être présentée avant cette date.</p>`,
  },
  {
    code: 'imex_certificat_origine_forma',
    name: 'Certificat origine Form A',
    category: 'commercial_financier',
    price: 1500,
    priceMax: 4500,
    description: "Certificat d'origine Form A (SPG) permettant aux exportateurs des pays en développement de bénéficier de tarifs préférentiels à l'importation.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'exportateur', label: 'Exportateur', type: 'text', required: true },
      { key: 'importateur', label: 'Importateur', type: 'text', required: true },
      { key: 'pays_origine', label: "Pays d'origine", type: 'text', required: true },
      { key: 'pays_destination', label: 'Pays de destination', type: 'text', required: true },
      { key: 'description_produit', label: 'Description du produit', type: 'textarea', required: true },
      { key: 'code_sh', label: 'Code SH', type: 'text', required: true },
      { key: 'poids_brut', label: 'Poids brut (kg)', type: 'number', required: true },
      { key: 'numero_facture', label: 'Numéro de facture commerciale', type: 'text', required: true },
    ]),
    body: `<h1>CERTIFICAT D'ORIGINE — FORM A (SPG)</h1>
<table border="1" style="width:100%">
<tr><td><strong>Exportateur</strong></td><td>{{exportateur}}</td></tr>
<tr><td><strong>Importateur</strong></td><td>{{importateur}}</td></tr>
<tr><td><strong>Pays d'origine</strong></td><td>{{pays_origine}}</td></tr>
<tr><td><strong>Pays de destination</strong></td><td>{{pays_destination}}</td></tr>
<tr><td><strong>Description</strong></td><td>{{description_produit}}</td></tr>
<tr><td><strong>Code SH</strong></td><td>{{code_sh}}</td></tr>
<tr><td><strong>Poids brut</strong></td><td>{{poids_brut}} kg</td></tr>
<tr><td><strong>Facture N°</strong></td><td>{{numero_facture}}</td></tr>
</table>
<p>Je soussigné certifie que les marchandises décrites ci-dessus sont originaires du pays indiqué conformément aux règles d'origine SPG.</p>`,
  },
  {
    code: 'imex_manifeste_fret_maritime',
    name: 'Manifeste de fret maritime',
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Document récapitulatif de toutes les marchandises chargées à bord d'un navire, requis par les autorités douanières des ports d'escale.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_navire', label: 'Nom du navire', type: 'text', required: true },
      { key: 'numero_voyage', label: 'Numéro de voyage', type: 'text', required: true },
      { key: 'port_chargement', label: 'Port de chargement', type: 'text', required: true },
      { key: 'port_dechargement', label: 'Port de déchargement', type: 'text', required: true },
      { key: 'date_appareillage', label: "Date d'appareillage", type: 'date', required: true },
      { key: 'armateur', label: 'Armateur / Compagnie maritime', type: 'text', required: true },
      { key: 'liste_cargaison', label: 'Liste de la cargaison', type: 'textarea', required: true },
    ]),
    body: `<h1>MANIFESTE DE FRET MARITIME</h1>
<p><strong>Navire :</strong> {{nom_navire}} — Voyage N° {{numero_voyage}}</p>
<p><strong>Armateur :</strong> {{armateur}}</p>
<p><strong>Port de chargement :</strong> {{port_chargement}} — <strong>Port de déchargement :</strong> {{port_dechargement}}</p>
<p><strong>Date d'appareillage :</strong> {{date_appareillage}}</p>
<h2>Détail de la cargaison</h2>
<p>{{liste_cargaison}}</p>`,
  },
  {
    code: 'imex_liste_colisage_export',
    name: "Liste de colisage export",
    category: 'commercial_financier',
    price: 800,
    priceMax: 2400,
    description: "Document détaillant le contenu, le poids et les dimensions de chaque colis constituant une expédition à l'exportation.",
    templateType: 'pdf',
    classe: 'BASIQUE',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'exportateur', label: 'Exportateur', type: 'text', required: true },
      { key: 'importateur', label: 'Importateur', type: 'text', required: true },
      { key: 'numero_commande', label: 'Numéro de commande', type: 'text', required: true },
      { key: 'nombre_colis', label: 'Nombre total de colis', type: 'number', required: true },
      { key: 'poids_total_brut', label: 'Poids total brut (kg)', type: 'number', required: true },
      { key: 'poids_total_net', label: 'Poids total net (kg)', type: 'number', required: true },
      { key: 'volume_total', label: 'Volume total (m³)', type: 'number', required: false },
      { key: 'detail_colis', label: 'Détail par colis', type: 'textarea', required: true },
    ]),
    body: `<h1>LISTE DE COLISAGE — EXPORT</h1>
<p><strong>Exportateur :</strong> {{exportateur}}</p>
<p><strong>Importateur :</strong> {{importateur}}</p>
<p><strong>Commande N° :</strong> {{numero_commande}}</p>
<h2>Récapitulatif</h2>
<table border="1" style="width:100%">
<tr><th>Nombre de colis</th><th>Poids brut</th><th>Poids net</th><th>Volume</th></tr>
<tr><td>{{nombre_colis}}</td><td>{{poids_total_brut}} kg</td><td>{{poids_total_net}} kg</td><td>{{volume_total}} m³</td></tr>
</table>
<h2>Détail par colis</h2>
<p>{{detail_colis}}</p>`,
  },
  {
    code: 'imex_proforma_douaniere',
    name: 'Pro forma douanière',
    category: 'commercial_financier',
    price: 1200,
    priceMax: 3600,
    description: "Facture pro forma établie aux fins douanières, précisant la valeur, l'origine et la nature des marchandises importées ou exportées.",
    templateType: 'pdf',
    classe: 'BASIQUE',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'vendeur', label: 'Vendeur', type: 'text', required: true },
      { key: 'acheteur', label: 'Acheteur', type: 'text', required: true },
      { key: 'date_proforma', label: 'Date de la pro forma', type: 'date', required: true },
      { key: 'description_marchandise', label: 'Description de la marchandise', type: 'textarea', required: true },
      { key: 'valeur_totale', label: 'Valeur totale (USD)', type: 'number', required: true },
      { key: 'incoterm', label: 'Incoterm applicable', type: 'text', required: true },
      { key: 'pays_origine', label: "Pays d'origine", type: 'text', required: true },
    ]),
    body: `<h1>FACTURE PRO FORMA DOUANIÈRE</h1>
<p><strong>Vendeur :</strong> {{vendeur}}</p>
<p><strong>Acheteur :</strong> {{acheteur}}</p>
<p><strong>Date :</strong> {{date_proforma}}</p>
<h2>Marchandises</h2>
<p>{{description_marchandise}}</p>
<p><strong>Valeur totale :</strong> {{valeur_totale}} USD ({{incoterm}})</p>
<p><strong>Pays d'origine :</strong> {{pays_origine}}</p>`,
  },
  {
    code: 'imex_certificat_phytosanitaire',
    name: 'Certificat phytosanitaire export',
    category: 'commercial_financier',
    price: 1800,
    priceMax: 5400,
    description: "Certificat officiel attestant que les végétaux et produits végétaux exportés sont exempts d'organismes nuisibles réglementés.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'exportateur', label: 'Exportateur', type: 'text', required: true },
      { key: 'pays_exportation', label: "Pays d'exportation", type: 'text', required: true },
      { key: 'pays_importation', label: "Pays d'importation déclaré", type: 'text', required: true },
      { key: 'description_produits', label: 'Description des produits végétaux', type: 'textarea', required: true },
      { key: 'quantite', label: 'Quantité', type: 'text', required: true },
      { key: 'traitement', label: 'Traitement phytosanitaire appliqué', type: 'text', required: false },
      { key: 'autorite_emettrice', label: 'Autorité phytosanitaire émettrice', type: 'text', required: true },
    ]),
    body: `<h1>CERTIFICAT PHYTOSANITAIRE D'EXPORTATION</h1>
<p>Délivré par : <strong>{{autorite_emettrice}}</strong></p>
<p><strong>Exportateur :</strong> {{exportateur}}</p>
<p><strong>Pays d'exportation :</strong> {{pays_exportation}} — <strong>Destination :</strong> {{pays_importation}}</p>
<h2>Description des marchandises</h2>
<p>{{description_produits}} — Quantité : {{quantite}}</p>
<h2>Déclaration</h2>
<p>Les produits végétaux décrits ci-dessus ont été examinés et sont, à ce jour, exempts d'organismes nuisibles réglementés. Traitement appliqué : {{traitement}}.</p>`,
  },
  {
    code: 'imex_accord_representation_internationale',
    name: 'Accord de représentation internationale',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat désignant un représentant commercial pour promouvoir et vendre des produits ou services sur un marché étranger déterminé.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'mandant', label: 'Mandant (entreprise représentée)', type: 'text', required: true },
      { key: 'representant', label: 'Représentant commercial', type: 'text', required: true },
      { key: 'territoire', label: 'Territoire de représentation', type: 'text', required: true },
      { key: 'produits_services', label: 'Produits / Services concernés', type: 'textarea', required: true },
      { key: 'taux_commission', label: 'Taux de commission (%)', type: 'number', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'exclusivite', label: "Exclusivité accordée (oui/non)", type: 'text', required: true },
    ]),
    body: `<h1>ACCORD DE REPRÉSENTATION INTERNATIONALE</h1>
<p><strong>Mandant :</strong> {{mandant}}</p>
<p><strong>Représentant :</strong> {{representant}}</p>
<h2>Article 1 — Territoire et produits</h2>
<p>Le Représentant est nommé pour le territoire {{territoire}} concernant : {{produits_services}}. Exclusivité : {{exclusivite}}.</p>
<h2>Article 2 — Commission</h2>
<p>Taux de commission : {{taux_commission}}% sur le chiffre d'affaires réalisé.</p>
<h2>Article 3 — Durée</h2>
<p>Durée du présent accord : {{duree_contrat}}.</p>`,
  },
  {
    code: 'imex_contrat_distributeur_exclusif',
    name: 'Contrat distributeur exclusif international',
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Contrat accordant à un distributeur le droit exclusif de commercialiser des produits sur un territoire défini à l'international.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'fournisseur', label: 'Fournisseur', type: 'text', required: true },
      { key: 'distributeur', label: 'Distributeur exclusif', type: 'text', required: true },
      { key: 'territoire_exclusif', label: 'Territoire exclusif', type: 'text', required: true },
      { key: 'produits', label: 'Gamme de produits', type: 'textarea', required: true },
      { key: 'objectif_annuel', label: "Objectif annuel minimum (USD)", type: 'number', required: true },
      { key: 'duree', label: 'Durée initiale du contrat', type: 'text', required: true },
      { key: 'conditions_resiliation', label: 'Conditions de résiliation', type: 'textarea', required: false },
    ]),
    body: `<h1>CONTRAT DE DISTRIBUTION EXCLUSIVE INTERNATIONALE</h1>
<p><strong>Fournisseur :</strong> {{fournisseur}}</p>
<p><strong>Distributeur exclusif :</strong> {{distributeur}}</p>
<h2>Article 1 — Exclusivité territoriale</h2>
<p>Le Fournisseur concède au Distributeur le droit exclusif de commercialiser {{produits}} sur le territoire {{territoire_exclusif}}.</p>
<h2>Article 2 — Objectifs</h2>
<p>Le Distributeur s'engage à réaliser un chiffre d'affaires minimum annuel de {{objectif_annuel}} USD.</p>
<h2>Article 3 — Durée et résiliation</h2>
<p>Durée : {{duree}}. Conditions de résiliation : {{conditions_resiliation}}.</p>`,
  },
  {
    code: 'imex_accord_agence_commerciale_internationale',
    name: 'Accord agence commerciale internationale',
    category: 'commercial_financier',
    price: 6500,
    priceMax: 19500,
    description: "Convention établissant la relation entre un commettant et un agent commercial indépendant chargé de négocier des contrats en son nom à l'étranger.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'commettant', label: 'Commettant', type: 'text', required: true },
      { key: 'agent', label: 'Agent commercial', type: 'text', required: true },
      { key: 'zone_geographique', label: 'Zone géographique', type: 'text', required: true },
      { key: 'produits_services', label: 'Produits / Services', type: 'textarea', required: true },
      { key: 'commission_taux', label: 'Taux de commission (%)', type: 'number', required: true },
      { key: 'preavis_resiliation', label: 'Préavis de résiliation (mois)', type: 'number', required: true },
      { key: 'indemnite_clientele', label: "Indemnité de clientèle prévue (oui/non)", type: 'text', required: true },
    ]),
    body: `<h1>ACCORD D'AGENCE COMMERCIALE INTERNATIONALE</h1>
<p><strong>Commettant :</strong> {{commettant}}</p>
<p><strong>Agent commercial :</strong> {{agent}}</p>
<h2>Mission</h2>
<p>L'Agent est mandaté pour négocier et conclure des contrats relatifs à {{produits_services}} sur la zone {{zone_geographique}}.</p>
<h2>Rémunération</h2>
<p>Commission : {{commission_taux}}% sur les affaires conclues.</p>
<h2>Résiliation</h2>
<p>Préavis : {{preavis_resiliation}} mois. Indemnité de clientèle : {{indemnite_clientele}}.</p>`,
  },
  {
    code: 'imex_contrat_licence_technologie_export',
    name: 'Contrat de licence technologie export',
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Contrat accordant à un licencié étranger le droit d'utiliser une technologie, un brevet ou un savoir-faire industriel contre redevances.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'concedant', label: 'Concédant (titulaire)', type: 'text', required: true },
      { key: 'licencie', label: 'Licencié', type: 'text', required: true },
      { key: 'technologie', label: 'Technologie / Brevet / Savoir-faire', type: 'textarea', required: true },
      { key: 'territoire_licence', label: 'Territoire de la licence', type: 'text', required: true },
      { key: 'redevance_taux', label: 'Taux de redevance (%)', type: 'number', required: true },
      { key: 'minimum_garanti', label: 'Minimum garanti annuel (USD)', type: 'number', required: false },
      { key: 'duree', label: 'Durée de la licence', type: 'text', required: true },
    ]),
    body: `<h1>CONTRAT DE LICENCE DE TECHNOLOGIE — EXPORT</h1>
<p><strong>Concédant :</strong> {{concedant}}</p>
<p><strong>Licencié :</strong> {{licencie}}</p>
<h2>Objet de la licence</h2>
<p>{{technologie}} — Territoire : {{territoire_licence}}</p>
<h2>Redevances</h2>
<p>Taux : {{redevance_taux}}% sur le chiffre d'affaires net. Minimum garanti : {{minimum_garanti}} USD/an.</p>
<h2>Durée</h2>
<p>{{duree}}</p>`,
  },
  {
    code: 'imex_joint_venture_internationale',
    name: 'Joint venture internationale',
    category: 'commercial_financier',
    price: 15000,
    priceMax: 50000,
    description: "Accord de coentreprise entre deux ou plusieurs sociétés de nationalités différentes pour mener un projet commercial ou industriel commun.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'partenaire_a', label: 'Partenaire A', type: 'text', required: true },
      { key: 'partenaire_b', label: 'Partenaire B', type: 'text', required: true },
      { key: 'objet_jv', label: 'Objet de la joint venture', type: 'textarea', required: true },
      { key: 'quote_part_a', label: 'Quote-part Partenaire A (%)', type: 'number', required: true },
      { key: 'quote_part_b', label: 'Quote-part Partenaire B (%)', type: 'number', required: true },
      { key: 'apport_capital', label: 'Capital social total (USD)', type: 'number', required: true },
      { key: 'pays_incorporation', label: "Pays d'incorporation", type: 'text', required: true },
      { key: 'gouvernance', label: 'Modalités de gouvernance', type: 'textarea', required: false },
    ]),
    body: `<h1>ACCORD DE JOINT VENTURE INTERNATIONALE</h1>
<p><strong>Partenaire A :</strong> {{partenaire_a}} ({{quote_part_a}}%)</p>
<p><strong>Partenaire B :</strong> {{partenaire_b}} ({{quote_part_b}}%)</p>
<h2>Objet</h2>
<p>{{objet_jv}}</p>
<h2>Capital et gouvernance</h2>
<p>Capital social : {{apport_capital}} USD — Pays d'incorporation : {{pays_incorporation}}</p>
<p>Gouvernance : {{gouvernance}}</p>`,
  },
  {
    code: 'imex_memorandum_accord_transfrontalier',
    name: 'Mémorandum accord commercial transfrontalier',
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Mémorandum d'entente formalisant les intentions de coopération commerciale entre partenaires de pays différents avant la signature d'un contrat définitif.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'partie_a', label: 'Partie A', type: 'text', required: true },
      { key: 'partie_b', label: 'Partie B', type: 'text', required: true },
      { key: 'objet_cooperation', label: 'Objet de la coopération', type: 'textarea', required: true },
      { key: 'engagements_a', label: 'Engagements Partie A', type: 'textarea', required: true },
      { key: 'engagements_b', label: 'Engagements Partie B', type: 'textarea', required: true },
      { key: 'calendrier', label: 'Calendrier prévisionnel', type: 'textarea', required: false },
      { key: 'confidentialite', label: 'Clause de confidentialité', type: 'text', required: false },
    ]),
    body: `<h1>MÉMORANDUM D'ACCORD COMMERCIAL TRANSFRONTALIER</h1>
<p><strong>Partie A :</strong> {{partie_a}}</p>
<p><strong>Partie B :</strong> {{partie_b}}</p>
<h2>Objet</h2>
<p>{{objet_cooperation}}</p>
<h2>Engagements</h2>
<p><strong>Partie A :</strong> {{engagements_a}}</p>
<p><strong>Partie B :</strong> {{engagements_b}}</p>
<h2>Calendrier et confidentialité</h2>
<p>{{calendrier}} — Confidentialité : {{confidentialite}}</p>`,
  },
  {
    code: 'imex_rapport_veille_marches_export',
    name: "Rapport veille marchés export",
    category: 'commercial_financier',
    price: 5500,
    priceMax: 16500,
    description: "Rapport de veille stratégique sur les marchés à l'exportation, analysant les tendances, concurrents, réglementations et opportunités commerciales.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'marche_cible', label: 'Marché cible', type: 'text', required: true },
      { key: 'periode_analyse', label: "Période d'analyse", type: 'text', required: true },
      { key: 'secteur', label: "Secteur d'activité", type: 'text', required: true },
      { key: 'tendances_marche', label: 'Tendances du marché', type: 'textarea', required: true },
      { key: 'analyse_concurrence', label: 'Analyse de la concurrence', type: 'textarea', required: true },
      { key: 'opportunites', label: 'Opportunités identifiées', type: 'textarea', required: true },
      { key: 'risques', label: 'Risques et contraintes', type: 'textarea', required: false },
    ]),
    body: `<h1>RAPPORT DE VEILLE MARCHÉS EXPORT</h1>
<p><strong>Marché :</strong> {{marche_cible}} — <strong>Secteur :</strong> {{secteur}} — <strong>Période :</strong> {{periode_analyse}}</p>
<h2>1. Tendances du marché</h2>
<p>{{tendances_marche}}</p>
<h2>2. Analyse concurrentielle</h2>
<p>{{analyse_concurrence}}</p>
<h2>3. Opportunités</h2>
<p>{{opportunites}}</p>
<h2>4. Risques et contraintes</h2>
<p>{{risques}}</p>`,
  },
  {
    code: 'imex_plan_export_marche_africain',
    name: 'Plan export marché africain',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 21000,
    description: "Plan stratégique détaillé pour le développement des exportations vers les marchés africains, incluant analyse de marché, stratégie de pénétration et plan d'action.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise exportatrice', type: 'text', required: true },
      { key: 'pays_cibles', label: 'Pays africains cibles', type: 'text', required: true },
      { key: 'produits_export', label: 'Produits / Services à exporter', type: 'textarea', required: true },
      { key: 'budget_export', label: "Budget d'exportation (USD)", type: 'number', required: true },
      { key: 'strategie_distribution', label: 'Stratégie de distribution', type: 'textarea', required: true },
      { key: 'objectifs_3ans', label: 'Objectifs sur 3 ans', type: 'textarea', required: true },
      { key: 'actions_prioritaires', label: 'Actions prioritaires', type: 'textarea', required: true },
    ]),
    body: `<h1>PLAN EXPORT — MARCHÉS AFRICAINS</h1>
<p><strong>Entreprise :</strong> {{entreprise}}</p>
<p><strong>Pays cibles :</strong> {{pays_cibles}}</p>
<h2>Offre export</h2>
<p>{{produits_export}}</p>
<h2>Stratégie de distribution</h2>
<p>{{strategie_distribution}}</p>
<h2>Objectifs 3 ans</h2>
<p>{{objectifs_3ans}}</p>
<h2>Actions prioritaires</h2>
<p>{{actions_prioritaires}}</p>
<p><strong>Budget alloué :</strong> {{budget_export}} USD</p>`,
  },
  {
    code: 'imex_etude_marche_cedeao',
    name: "Étude de marché export CEDEAO",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 27000,
    description: "Étude de marché approfondie ciblant les pays membres de la CEDEAO, analysant les débouchés, barrières douanières et opportunités d'affaires régionales.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'commanditaire', label: "Commanditaire de l'étude", type: 'text', required: true },
      { key: 'produit_secteur', label: 'Produit / Secteur analysé', type: 'text', required: true },
      { key: 'pays_cedeao_analyses', label: 'Pays CEDEAO analysés', type: 'text', required: true },
      { key: 'taille_marche', label: 'Taille du marché estimée', type: 'textarea', required: true },
      { key: 'barrieres_entree', label: "Barrières à l'entrée", type: 'textarea', required: true },
      { key: 'recommandations', label: 'Recommandations stratégiques', type: 'textarea', required: true },
    ]),
    body: `<h1>ÉTUDE DE MARCHÉ EXPORT — CEDEAO</h1>
<p><strong>Commanditaire :</strong> {{commanditaire}}</p>
<p><strong>Produit/Secteur :</strong> {{produit_secteur}} — <strong>Zone :</strong> {{pays_cedeao_analyses}}</p>
<h2>Taille et potentiel du marché</h2>
<p>{{taille_marche}}</p>
<h2>Barrières à l'entrée</h2>
<p>{{barrieres_entree}}</p>
<h2>Recommandations</h2>
<p>{{recommandations}}</p>`,
  },
  {
    code: 'imex_accord_co_exportation_regional',
    name: "Accord de co-exportation régional",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Accord entre plusieurs entreprises de la même région pour mutualiser leurs ressources et capacités afin de pénétrer conjointement des marchés à l'exportation.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'membres_consortium', label: 'Membres du consortium', type: 'textarea', required: true },
      { key: 'chef_file', label: 'Entreprise chef de file', type: 'text', required: true },
      { key: 'marches_vises', label: 'Marchés visés', type: 'text', required: true },
      { key: 'produits_communs', label: 'Produits / Services communs', type: 'textarea', required: true },
      { key: 'repartition_revenus', label: 'Répartition des revenus', type: 'textarea', required: true },
      { key: 'duree_accord', label: "Durée de l'accord", type: 'text', required: true },
    ]),
    body: `<h1>ACCORD DE CO-EXPORTATION RÉGIONAL</h1>
<p><strong>Chef de file :</strong> {{chef_file}}</p>
<p><strong>Membres du consortium :</strong> {{membres_consortium}}</p>
<h2>Marchés et produits visés</h2>
<p>Marchés : {{marches_vises}} — Produits : {{produits_communs}}</p>
<h2>Répartition des revenus</h2>
<p>{{repartition_revenus}}</p>
<h2>Durée</h2>
<p>{{duree_accord}}</p>`,
  },
  {
    code: 'imex_credit_documentaire_stand_by',
    name: 'Crédit documentaire stand-by',
    category: 'commercial_financier',
    price: 8500,
    priceMax: 25500,
    description: "Instrument de garantie bancaire de type stand-by letter of credit (SBLC) utilisé pour sécuriser des engagements commerciaux ou financiers internationaux.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'banque_emettrice', label: 'Banque émettrice', type: 'text', required: true },
      { key: 'beneficiaire', label: 'Bénéficiaire', type: 'text', required: true },
      { key: 'donneur_ordre', label: "Donneur d'ordre", type: 'text', required: true },
      { key: 'montant', label: 'Montant (USD)', type: 'number', required: true },
      { key: 'date_expiration', label: "Date d'expiration", type: 'date', required: true },
      { key: 'conditions_tirage', label: 'Conditions de tirage', type: 'textarea', required: true },
      { key: 'regles_applicables', label: 'Règles applicables (ISP98/PBAS)', type: 'text', required: false },
    ]),
    body: `<h1>CRÉDIT DOCUMENTAIRE STAND-BY (SBLC)</h1>
<p><strong>Banque émettrice :</strong> {{banque_emettrice}}</p>
<p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p>
<p><strong>Donneur d'ordre :</strong> {{donneur_ordre}}</p>
<h2>Conditions</h2>
<p>Montant : {{montant}} USD — Expiration : {{date_expiration}}</p>
<p>Conditions de tirage : {{conditions_tirage}}</p>
<p>Règles applicables : {{regles_applicables}}</p>`,
  },
  {
    code: 'imex_contrat_transit_international',
    name: 'Contrat de transit international',
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10500,
    description: "Contrat organisant le passage de marchandises à travers un ou plusieurs pays tiers, avec définition des responsabilités du transitaire et des formalités douanières.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur', type: 'text', required: true },
      { key: 'transitaire', label: 'Transitaire', type: 'text', required: true },
      { key: 'pays_depart', label: 'Pays de départ', type: 'text', required: true },
      { key: 'pays_transit', label: 'Pays de transit', type: 'text', required: true },
      { key: 'pays_destination', label: 'Pays de destination finale', type: 'text', required: true },
      { key: 'description_cargaison', label: 'Description de la cargaison', type: 'textarea', required: true },
      { key: 'delai_transit', label: 'Délai de transit (jours)', type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT DE TRANSIT INTERNATIONAL</h1>
<p><strong>Expéditeur :</strong> {{expediteur}} — <strong>Transitaire :</strong> {{transitaire}}</p>
<h2>Itinéraire</h2>
<p>{{pays_depart}} → {{pays_transit}} → {{pays_destination}}</p>
<h2>Cargaison</h2>
<p>{{description_cargaison}}</p>
<h2>Délai</h2>
<p>Transit à effectuer en {{delai_transit}} jours.</p>`,
  },
  {
    code: 'imex_declaration_valeur_douaniere',
    name: 'Déclaration de valeur douanière',
    category: 'commercial_financier',
    price: 1000,
    priceMax: 3000,
    description: "Formulaire officiel déclarant la valeur en douane des marchandises importées selon les méthodes de valorisation de l'OMC (Accord sur la valeur en douane).",
    templateType: 'pdf',
    classe: 'BASIQUE',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'importateur', label: 'Importateur déclarant', type: 'text', required: true },
      { key: 'vendeur_etranger', label: 'Vendeur étranger', type: 'text', required: true },
      { key: 'description_marchandise', label: 'Description de la marchandise', type: 'textarea', required: true },
      { key: 'valeur_transactionnelle', label: 'Valeur transactionnelle (FCFA)', type: 'number', required: true },
      { key: 'frais_transport', label: 'Frais de transport (FCFA)', type: 'number', required: true },
      { key: 'frais_assurance', label: "Frais d'assurance (FCFA)", type: 'number', required: false },
      { key: 'methode_valorisation', label: 'Méthode de valorisation OMC', type: 'text', required: true },
    ]),
    body: `<h1>DÉCLARATION DE VALEUR EN DOUANE</h1>
<p><strong>Importateur :</strong> {{importateur}}</p>
<p><strong>Vendeur étranger :</strong> {{vendeur_etranger}}</p>
<h2>Marchandise</h2>
<p>{{description_marchandise}}</p>
<h2>Éléments de valorisation</h2>
<table border="1" style="width:100%">
<tr><th>Valeur transactionnelle</th><th>Transport</th><th>Assurance</th></tr>
<tr><td>{{valeur_transactionnelle}} FCFA</td><td>{{frais_transport}} FCFA</td><td>{{frais_assurance}} FCFA</td></tr>
</table>
<p><strong>Méthode :</strong> {{methode_valorisation}}</p>`,
  },
  {
    code: 'imex_autorisation_prealable_import',
    name: "Autorisation préalable d'importation",
    category: 'commercial_financier',
    price: 1500,
    priceMax: 4500,
    description: "Demande d'autorisation préalable auprès des autorités compétentes pour l'importation de marchandises soumises à des restrictions ou contingents.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'importateur', label: 'Importateur demandeur', type: 'text', required: true },
      { key: 'autorite_competente', label: 'Autorité compétente', type: 'text', required: true },
      { key: 'produits_concernes', label: 'Produits concernés', type: 'textarea', required: true },
      { key: 'pays_fournisseur', label: 'Pays fournisseur', type: 'text', required: true },
      { key: 'valeur_estimee', label: 'Valeur estimée (FCFA)', type: 'number', required: true },
      { key: 'usage_prevu', label: 'Usage prévu', type: 'textarea', required: true },
      { key: 'justification', label: 'Justification de la demande', type: 'textarea', required: false },
    ]),
    body: `<h1>DEMANDE D'AUTORISATION PRÉALABLE D'IMPORTATION</h1>
<p>À l'attention de : <strong>{{autorite_competente}}</strong></p>
<p><strong>Importateur :</strong> {{importateur}}</p>
<h2>Produits concernés</h2>
<p>{{produits_concernes}} — Origine : {{pays_fournisseur}}</p>
<p>Valeur estimée : {{valeur_estimee}} FCFA</p>
<h2>Usage prévu et justification</h2>
<p>{{usage_prevu}}</p>
<p>{{justification}}</p>`,
  },
  {
    code: 'imex_rapport_conformite_douaniere',
    name: 'Rapport de conformité douanière',
    category: 'commercial_financier',
    price: 4200,
    priceMax: 12600,
    description: "Rapport évaluant la conformité des procédures d'importation/exportation d'une entreprise aux réglementations douanières en vigueur.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'entreprise_auditee', label: 'Entreprise auditée', type: 'text', required: true },
      { key: 'auditeur', label: 'Auditeur douanier', type: 'text', required: true },
      { key: 'periode_audit', label: "Période d'audit", type: 'text', required: true },
      { key: 'operations_auditees', label: 'Opérations douanières auditées', type: 'textarea', required: true },
      { key: 'constats', label: 'Constats de conformité', type: 'textarea', required: true },
      { key: 'non_conformites', label: 'Non-conformités identifiées', type: 'textarea', required: false },
      { key: 'recommandations', label: 'Recommandations', type: 'textarea', required: true },
    ]),
    body: `<h1>RAPPORT DE CONFORMITÉ DOUANIÈRE</h1>
<p><strong>Entreprise :</strong> {{entreprise_auditee}} — <strong>Auditeur :</strong> {{auditeur}}</p>
<p><strong>Période :</strong> {{periode_audit}}</p>
<h2>Opérations auditées</h2>
<p>{{operations_auditees}}</p>
<h2>Constats</h2>
<p>{{constats}}</p>
<h2>Non-conformités</h2>
<p>{{non_conformites}}</p>
<h2>Recommandations</h2>
<p>{{recommandations}}</p>`,
  },
  {
    code: 'imex_fiche_technique_produit_export',
    name: 'Fiche technique produit export',
    category: 'commercial_financier',
    price: 900,
    priceMax: 2700,
    description: "Fiche technique standardisée décrivant les caractéristiques, normes et certifications d'un produit destiné à l'exportation sur des marchés internationaux.",
    templateType: 'pdf',
    classe: 'BASIQUE',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'nom_produit', label: 'Nom du produit', type: 'text', required: true },
      { key: 'fabricant', label: 'Fabricant', type: 'text', required: true },
      { key: 'description_technique', label: 'Description technique', type: 'textarea', required: true },
      { key: 'specifications', label: 'Spécifications techniques', type: 'textarea', required: true },
      { key: 'normes_certifications', label: 'Normes et certifications', type: 'text', required: false },
      { key: 'conditions_stockage', label: 'Conditions de stockage', type: 'text', required: false },
      { key: 'pays_exportation_cibles', label: "Pays d'exportation cibles", type: 'text', required: true },
    ]),
    body: `<h1>FICHE TECHNIQUE PRODUIT — EXPORT</h1>
<h2>{{nom_produit}}</h2>
<p><strong>Fabricant :</strong> {{fabricant}}</p>
<h2>Description</h2>
<p>{{description_technique}}</p>
<h2>Spécifications</h2>
<p>{{specifications}}</p>
<p><strong>Normes/Certifications :</strong> {{normes_certifications}}</p>
<p><strong>Stockage :</strong> {{conditions_stockage}}</p>
<p><strong>Marchés cibles :</strong> {{pays_exportation_cibles}}</p>`,
  },

  // ─── ÉNERGIE & MINES (enrg_) ──────────────────────────────────────────────
  {
    code: 'enrg_convention_concession_miniere',
    name: 'Convention de concession minière',
    category: 'agro_environnement',
    price: 25000,
    priceMax: 75000,
    description: "Convention accordant à une société minière le droit exclusif d'exploiter un gisement sur un périmètre et une durée définis, avec obligations de redevances et de protection environnementale.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'etat_concedant', label: 'État concédant', type: 'text', required: true },
      { key: 'societe_miniere', label: 'Société minière concessionnaire', type: 'text', required: true },
      { key: 'perimetre_concession', label: 'Périmètre de la concession (km²)', type: 'number', required: true },
      { key: 'minerai_concerne', label: 'Minerai(s) concerné(s)', type: 'text', required: true },
      { key: 'duree_concession', label: 'Durée de la concession (années)', type: 'number', required: true },
      { key: 'redevance_superficie', label: 'Redevance superficiaire (USD/km²/an)', type: 'number', required: true },
      { key: 'taux_royalties', label: 'Taux de royalties (%)', type: 'number', required: true },
      { key: 'obligations_environnementales', label: 'Obligations environnementales', type: 'textarea', required: true },
    ]),
    body: `<h1>CONVENTION DE CONCESSION MINIÈRE</h1>
<p>Entre <strong>{{etat_concedant}}</strong> et <strong>{{societe_miniere}}</strong></p>
<h2>Article 1 — Objet de la concession</h2>
<p>L'État concède à la Société le droit exclusif d'exploiter {{minerai_concerne}} sur un périmètre de {{perimetre_concession}} km², pour une durée de {{duree_concession}} ans.</p>
<h2>Article 2 — Redevances et royalties</h2>
<p>Redevance superficiaire : {{redevance_superficie}} USD/km²/an — Royalties : {{taux_royalties}}% de la production.</p>
<h2>Article 3 — Obligations environnementales</h2>
<p>{{obligations_environnementales}}</p>`,
  },
  {
    code: 'enrg_contrat_fourniture_electricite',
    name: "Contrat de fourniture d'électricité",
    category: 'agro_environnement',
    price: 8000,
    priceMax: 24000,
    description: "Contrat régissant la fourniture d'électricité entre un producteur ou distributeur et un client industriel ou commercial, définissant les tarifs, puissance souscrite et conditions de service.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur d'électricité", type: 'text', required: true },
      { key: 'client', label: 'Client abonné', type: 'text', required: true },
      { key: 'puissance_souscrite', label: 'Puissance souscrite (kVA)', type: 'number', required: true },
      { key: 'tarif_kwh', label: 'Tarif par kWh (FCFA)', type: 'number', required: true },
      { key: 'tension_livraison', label: 'Tension de livraison (V)', type: 'text', required: true },
      { key: 'point_livraison', label: 'Point de livraison', type: 'text', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat', type: 'text', required: true },
      { key: 'penalites_coupure', label: 'Pénalités en cas de coupure', type: 'textarea', required: false },
    ]),
    body: `<h1>CONTRAT DE FOURNITURE D'ÉLECTRICITÉ</h1>
<p><strong>Fournisseur :</strong> {{fournisseur}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Conditions de fourniture</h2>
<p>Puissance souscrite : {{puissance_souscrite}} kVA — Tension : {{tension_livraison}} V — Point de livraison : {{point_livraison}}</p>
<h2>Article 2 — Tarification</h2>
<p>Tarif : {{tarif_kwh}} FCFA/kWh</p>
<h2>Article 3 — Durée et pénalités</h2>
<p>Durée : {{duree_contrat}} — Pénalités de coupure : {{penalites_coupure}}</p>`,
  },
  {
    code: 'enrg_contrat_fourniture_solaire',
    name: 'Contrat de fourniture solaire',
    category: 'agro_environnement',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de fourniture d'énergie solaire photovoltaïque incluant l'installation, la maintenance et la vente de l'électricité produite par une centrale solaire.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'installateur', label: 'Installateur / Fournisseur solaire', type: 'text', required: true },
      { key: 'client', label: 'Client bénéficiaire', type: 'text', required: true },
      { key: 'puissance_installee', label: 'Puissance installée (kWc)', type: 'number', required: true },
      { key: 'production_estimee', label: 'Production annuelle estimée (kWh)', type: 'number', required: true },
      { key: 'tarif_kwh', label: 'Tarif solaire (FCFA/kWh)', type: 'number', required: true },
      { key: 'garantie_performance', label: 'Garantie de performance (%)', type: 'number', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat (années)', type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT DE FOURNITURE D'ÉNERGIE SOLAIRE</h1>
<p><strong>Installateur :</strong> {{installateur}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Installation</h2>
<p>Puissance : {{puissance_installee}} kWc — Production estimée : {{production_estimee}} kWh/an</p>
<h2>Tarification et garanties</h2>
<p>Tarif : {{tarif_kwh}} FCFA/kWh — Garantie de performance : {{garantie_performance}}%</p>
<h2>Durée</h2>
<p>{{duree_contrat}} ans</p>`,
  },
  {
    code: 'enrg_accord_partage_production_petrolier',
    name: 'Accord de partage de production pétrolière',
    category: 'agro_environnement',
    price: 20000,
    priceMax: 60000,
    description: "Production Sharing Agreement (PSA) définissant les modalités de partage de la production pétrolière entre l'État et une compagnie pétrolière internationale.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'etat', label: 'État hôte', type: 'text', required: true },
      { key: 'compagnie_petroliere', label: 'Compagnie pétrolière', type: 'text', required: true },
      { key: 'bloc_petrolier', label: 'Bloc pétrolier', type: 'text', required: true },
      { key: 'cost_oil', label: "Plafond Cost Oil (%)", type: 'number', required: true },
      { key: 'profit_oil_etat', label: "Partage Profit Oil État (%)", type: 'number', required: true },
      { key: 'profit_oil_compagnie', label: 'Partage Profit Oil Compagnie (%)', type: 'number', required: true },
      { key: 'bonus_signature', label: 'Bonus de signature (USD)', type: 'number', required: true },
      { key: 'duree_exploration', label: "Durée exploration (années)", type: 'number', required: true },
    ]),
    body: `<h1>ACCORD DE PARTAGE DE PRODUCTION PÉTROLIÈRE</h1>
<p><strong>État :</strong> {{etat}} — <strong>Compagnie :</strong> {{compagnie_petroliere}}</p>
<p><strong>Bloc :</strong> {{bloc_petrolier}}</p>
<h2>Modalités de partage</h2>
<p>Cost Oil plafonné à {{cost_oil}}%</p>
<p>Profit Oil : État {{profit_oil_etat}}% / Compagnie {{profit_oil_compagnie}}%</p>
<h2>Bonus et durée</h2>
<p>Bonus de signature : {{bonus_signature}} USD — Exploration : {{duree_exploration}} ans</p>`,
  },
  {
    code: 'enrg_etude_faisabilite_energie_renouvelable',
    name: "Étude de faisabilité énergie renouvelable",
    category: 'agro_environnement',
    price: 12000,
    priceMax: 36000,
    description: "Étude de faisabilité technique, économique et environnementale pour un projet d'énergie renouvelable (solaire, éolien, hydraulique, biomasse).",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'promoteur', label: 'Promoteur du projet', type: 'text', required: true },
      { key: 'type_energie', label: "Type d'énergie renouvelable", type: 'text', required: true },
      { key: 'puissance_projetee', label: 'Puissance projetée (MW)', type: 'number', required: true },
      { key: 'localisation', label: 'Localisation du projet', type: 'text', required: true },
      { key: 'investissement_estime', label: 'Investissement estimé (USD)', type: 'number', required: true },
      { key: 'rentabilite_sri', label: 'Taux de rentabilité interne SRI (%)', type: 'number', required: false },
      { key: 'impact_environnemental', label: 'Impact environnemental', type: 'textarea', required: true },
      { key: 'conclusion', label: 'Conclusion de faisabilité', type: 'textarea', required: true },
    ]),
    body: `<h1>ÉTUDE DE FAISABILITÉ — ÉNERGIE RENOUVELABLE</h1>
<p><strong>Promoteur :</strong> {{promoteur}}</p>
<p><strong>Type :</strong> {{type_energie}} — <strong>Puissance :</strong> {{puissance_projetee}} MW — <strong>Lieu :</strong> {{localisation}}</p>
<h2>Viabilité économique</h2>
<p>Investissement estimé : {{investissement_estime}} USD — TRI : {{rentabilite_sri}}%</p>
<h2>Impact environnemental</h2>
<p>{{impact_environnemental}}</p>
<h2>Conclusion</h2>
<p>{{conclusion}}</p>`,
  },
  {
    code: 'enrg_plan_gestion_environnementale_mine',
    name: 'Plan de gestion environnementale mine',
    category: 'agro_environnement',
    price: 15000,
    priceMax: 45000,
    description: "Plan de gestion environnementale et sociale (PGES) décrivant les mesures de prévention, atténuation et compensation des impacts environnementaux d'une exploitation minière.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'societe_miniere', label: 'Société minière', type: 'text', required: true },
      { key: 'site_minier', label: 'Site minier', type: 'text', required: true },
      { key: 'surface_exploitation', label: "Surface d'exploitation (ha)", type: 'number', required: true },
      { key: 'impacts_identifies', label: 'Impacts environnementaux identifiés', type: 'textarea', required: true },
      { key: 'mesures_attenuation', label: "Mesures d'atténuation", type: 'textarea', required: true },
      { key: 'programme_suivi', label: 'Programme de suivi environnemental', type: 'textarea', required: true },
      { key: 'budget_environnemental', label: 'Budget environnemental (USD)', type: 'number', required: true },
    ]),
    body: `<h1>PLAN DE GESTION ENVIRONNEMENTALE ET SOCIALE — MINE</h1>
<p><strong>Société :</strong> {{societe_miniere}} — <strong>Site :</strong> {{site_minier}} ({{surface_exploitation}} ha)</p>
<h2>Impacts identifiés</h2>
<p>{{impacts_identifies}}</p>
<h2>Mesures d'atténuation</h2>
<p>{{mesures_attenuation}}</p>
<h2>Programme de suivi</h2>
<p>{{programme_suivi}}</p>
<p><strong>Budget environnemental :</strong> {{budget_environnemental}} USD</p>`,
  },
  {
    code: 'enrg_rapport_conformite_reglementaire_energie',
    name: 'Rapport de conformité réglementaire énergie',
    category: 'agro_environnement',
    price: 7000,
    priceMax: 21000,
    description: "Rapport évaluant la conformité d'une installation ou d'une entreprise du secteur énergétique aux réglementations nationales et internationales applicables.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise évaluée', type: 'text', required: true },
      { key: 'type_installation', label: "Type d'installation", type: 'text', required: true },
      { key: 'auditeur', label: 'Auditeur', type: 'text', required: true },
      { key: 'referentiels', label: 'Référentiels réglementaires', type: 'textarea', required: true },
      { key: 'constats_conformite', label: 'Constats de conformité', type: 'textarea', required: true },
      { key: 'ecarts', label: 'Écarts identifiés', type: 'textarea', required: false },
      { key: 'plan_mise_en_conformite', label: 'Plan de mise en conformité', type: 'textarea', required: true },
    ]),
    body: `<h1>RAPPORT DE CONFORMITÉ RÉGLEMENTAIRE — ÉNERGIE</h1>
<p><strong>Entreprise :</strong> {{entreprise}} — <strong>Installation :</strong> {{type_installation}}</p>
<p><strong>Auditeur :</strong> {{auditeur}}</p>
<h2>Référentiels</h2>
<p>{{referentiels}}</p>
<h2>Constats</h2>
<p>{{constats_conformite}}</p>
<h2>Écarts et plan de mise en conformité</h2>
<p>{{ecarts}}</p>
<p>{{plan_mise_en_conformite}}</p>`,
  },
  {
    code: 'enrg_contrat_epc_centrale_electrique',
    name: 'Contrat EPC centrale électrique',
    category: 'agro_environnement',
    price: 20000,
    priceMax: 60000,
    description: "Contrat Engineering-Procurement-Construction pour la conception, l'approvisionnement et la construction d'une centrale électrique sur une base clé en main.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'contractant_epc', label: 'Contractant EPC', type: 'text', required: true },
      { key: 'type_centrale', label: 'Type de centrale', type: 'text', required: true },
      { key: 'puissance_mw', label: 'Puissance (MW)', type: 'number', required: true },
      { key: 'montant_contrat', label: 'Montant du contrat (USD)', type: 'number', required: true },
      { key: 'delai_realisation', label: 'Délai de réalisation (mois)', type: 'number', required: true },
      { key: 'garantie_performance', label: 'Garantie de performance technique', type: 'textarea', required: true },
      { key: 'penalites_retard', label: 'Pénalités de retard (%/semaine)', type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT EPC — CENTRALE ÉLECTRIQUE</h1>
<p><strong>Maître d'ouvrage :</strong> {{maitre_ouvrage}}</p>
<p><strong>Contractant EPC :</strong> {{contractant_epc}}</p>
<h2>Objet</h2>
<p>Centrale {{type_centrale}} de {{puissance_mw}} MW — clé en main</p>
<h2>Conditions financières</h2>
<p>Montant : {{montant_contrat}} USD — Délai : {{delai_realisation}} mois</p>
<p>Pénalités de retard : {{penalites_retard}}%/semaine</p>
<h2>Garanties de performance</h2>
<p>{{garantie_performance}}</p>`,
  },
  {
    code: 'enrg_permis_exploitation_miniere',
    name: "Modèle de permis d'exploitation minière",
    category: 'agro_environnement',
    price: 10000,
    priceMax: 30000,
    description: "Modèle de permis d'exploitation minière délivré par l'autorité minière nationale, définissant les droits, obligations et conditions techniques de l'exploitation.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'autorite_miniere', label: 'Autorité minière nationale', type: 'text', required: true },
      { key: 'titulaire', label: 'Titulaire du permis', type: 'text', required: true },
      { key: 'numero_permis', label: 'Numéro du permis', type: 'text', required: true },
      { key: 'localisation', label: 'Localisation du gisement', type: 'text', required: true },
      { key: 'substances_autorisees', label: 'Substances autorisées', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { key: 'date_expiration', label: "Date d'expiration", type: 'date', required: true },
      { key: 'conditions_speciales', label: 'Conditions spéciales', type: 'textarea', required: false },
    ]),
    body: `<h1>PERMIS D'EXPLOITATION MINIÈRE N° {{numero_permis}}</h1>
<p>Délivré par : <strong>{{autorite_miniere}}</strong></p>
<p><strong>Titulaire :</strong> {{titulaire}}</p>
<h2>Détails du permis</h2>
<p>Localisation : {{localisation}}</p>
<p>Substances : {{substances_autorisees}}</p>
<p>Validité : du {{date_debut}} au {{date_expiration}}</p>
<h2>Conditions spéciales</h2>
<p>{{conditions_speciales}}</p>`,
  },
  {
    code: 'enrg_plan_fermeture_mine',
    name: 'Plan de fermeture de mine',
    category: 'agro_environnement',
    price: 18000,
    priceMax: 54000,
    description: "Plan détaillé de fermeture et de réhabilitation d'un site minier en fin de vie, incluant les mesures de sécurité, de décontamination et de restauration environnementale.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'societe_miniere', label: 'Société minière', type: 'text', required: true },
      { key: 'mine_concernee', label: 'Mine concernée', type: 'text', required: true },
      { key: 'date_fermeture_prevue', label: 'Date de fermeture prévue', type: 'date', required: true },
      { key: 'surface_rehabiliter', label: 'Surface à réhabiliter (ha)', type: 'number', required: true },
      { key: 'mesures_securite', label: 'Mesures de sécurisation', type: 'textarea', required: true },
      { key: 'rehabilitation_sol', label: 'Plan de réhabilitation des sols', type: 'textarea', required: true },
      { key: 'provision_financiere', label: 'Provision financière (USD)', type: 'number', required: true },
    ]),
    body: `<h1>PLAN DE FERMETURE ET RÉHABILITATION DE MINE</h1>
<p><strong>Société :</strong> {{societe_miniere}} — <strong>Site :</strong> {{mine_concernee}}</p>
<p><strong>Fermeture prévue :</strong> {{date_fermeture_prevue}} — <strong>Surface :</strong> {{surface_rehabiliter}} ha</p>
<h2>Mesures de sécurisation</h2>
<p>{{mesures_securite}}</p>
<h2>Réhabilitation des sols</h2>
<p>{{rehabilitation_sol}}</p>
<p><strong>Provision financière constituée :</strong> {{provision_financiere}} USD</p>`,
  },
  {
    code: 'enrg_accord_prestation_geologique',
    name: 'Accord de prestation géologique',
    category: 'agro_environnement',
    price: 5000,
    priceMax: 15000,
    description: "Accord de prestation de services géologiques pour la réalisation d'études, de cartographies ou de travaux de terrain dans le cadre d'un projet minier ou pétrolier.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'client', label: 'Client', type: 'text', required: true },
      { key: 'prestataire', label: 'Prestataire géologique', type: 'text', required: true },
      { key: 'mission', label: 'Description de la mission', type: 'textarea', required: true },
      { key: 'zone_intervention', label: "Zone d'intervention", type: 'text', required: true },
      { key: 'honoraires', label: 'Honoraires (USD)', type: 'number', required: true },
      { key: 'duree_mission', label: 'Durée de la mission (jours)', type: 'number', required: true },
      { key: 'livrables', label: 'Livrables attendus', type: 'textarea', required: true },
    ]),
    body: `<h1>ACCORD DE PRESTATION GÉOLOGIQUE</h1>
<p><strong>Client :</strong> {{client}}</p>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<h2>Mission</h2>
<p>{{mission}} — Zone : {{zone_intervention}}</p>
<h2>Conditions</h2>
<p>Durée : {{duree_mission}} jours — Honoraires : {{honoraires}} USD</p>
<h2>Livrables</h2>
<p>{{livrables}}</p>`,
  },
  {
    code: 'enrg_contrat_forage_petrolier',
    name: 'Contrat de forage pétrolier',
    category: 'agro_environnement',
    price: 18000,
    priceMax: 54000,
    description: "Contrat de services de forage pétrolier confié à un prestataire spécialisé, définissant les spécifications techniques, le day-rate et les obligations HSE.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'operateur', label: 'Opérateur pétrolier', type: 'text', required: true },
      { key: 'contractant_forage', label: 'Contractant de forage', type: 'text', required: true },
      { key: 'puits_concerne', label: 'Puits concerné', type: 'text', required: true },
      { key: 'profondeur_cible', label: 'Profondeur cible (m)', type: 'number', required: true },
      { key: 'day_rate', label: 'Day rate (USD/jour)', type: 'number', required: true },
      { key: 'duree_estimee', label: 'Durée estimée (jours)', type: 'number', required: true },
      { key: 'specifications_hse', label: 'Spécifications HSE', type: 'textarea', required: true },
    ]),
    body: `<h1>CONTRAT DE FORAGE PÉTROLIER</h1>
<p><strong>Opérateur :</strong> {{operateur}}</p>
<p><strong>Contractant de forage :</strong> {{contractant_forage}}</p>
<h2>Spécifications techniques</h2>
<p>Puits : {{puits_concerne}} — Profondeur cible : {{profondeur_cible}} m</p>
<h2>Conditions commerciales</h2>
<p>Day rate : {{day_rate}} USD/jour — Durée estimée : {{duree_estimee}} jours</p>
<h2>Exigences HSE</h2>
<p>{{specifications_hse}}</p>`,
  },
  {
    code: 'enrg_rapport_hse_energie',
    name: 'Rapport HSE énergie',
    category: 'agro_environnement',
    price: 6000,
    priceMax: 18000,
    description: "Rapport Hygiène, Sécurité et Environnement (HSE) d'une installation énergétique, documentant les performances, incidents et plans d'amélioration.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'installation', label: 'Installation concernée', type: 'text', required: true },
      { key: 'responsable_hse', label: 'Responsable HSE', type: 'text', required: true },
      { key: 'periode', label: 'Période du rapport', type: 'text', required: true },
      { key: 'statistiques_securite', label: 'Statistiques de sécurité', type: 'textarea', required: true },
      { key: 'incidents_declares', label: 'Incidents déclarés', type: 'textarea', required: false },
      { key: 'performance_environnementale', label: 'Performance environnementale', type: 'textarea', required: true },
      { key: 'plan_amelioration', label: "Plan d'amélioration HSE", type: 'textarea', required: true },
    ]),
    body: `<h1>RAPPORT HSE — ÉNERGIE</h1>
<p><strong>Installation :</strong> {{installation}} — <strong>Responsable HSE :</strong> {{responsable_hse}} — <strong>Période :</strong> {{periode}}</p>
<h2>Statistiques de sécurité</h2>
<p>{{statistiques_securite}}</p>
<h2>Incidents déclarés</h2>
<p>{{incidents_declares}}</p>
<h2>Performance environnementale</h2>
<p>{{performance_environnementale}}</p>
<h2>Plan d'amélioration</h2>
<p>{{plan_amelioration}}</p>`,
  },
  {
    code: 'enrg_plan_rehabilitation_carriere',
    name: 'Plan de réhabilitation de carrière',
    category: 'agro_environnement',
    price: 9000,
    priceMax: 27000,
    description: "Plan de remise en état et de réhabilitation d'une carrière exploitée, définissant les travaux de modelage, revegetation et restauration paysagère.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'exploitant', label: 'Exploitant de la carrière', type: 'text', required: true },
      { key: 'localisation_carriere', label: 'Localisation de la carrière', type: 'text', required: true },
      { key: 'superficie', label: 'Superficie à réhabiliter (ha)', type: 'number', required: true },
      { key: 'usage_futur', label: 'Usage futur du site', type: 'text', required: true },
      { key: 'travaux_modelage', label: 'Travaux de modelage du terrain', type: 'textarea', required: true },
      { key: 'plan_revegetation', label: 'Plan de revégétation', type: 'textarea', required: true },
      { key: 'budget_rehabilitation', label: 'Budget de réhabilitation (FCFA)', type: 'number', required: true },
    ]),
    body: `<h1>PLAN DE RÉHABILITATION DE CARRIÈRE</h1>
<p><strong>Exploitant :</strong> {{exploitant}} — <strong>Site :</strong> {{localisation_carriere}} ({{superficie}} ha)</p>
<p><strong>Usage futur prévu :</strong> {{usage_futur}}</p>
<h2>Travaux de modelage</h2>
<p>{{travaux_modelage}}</p>
<h2>Plan de revégétation</h2>
<p>{{plan_revegetation}}</p>
<p><strong>Budget total :</strong> {{budget_rehabilitation}} FCFA</p>`,
  },
  {
    code: 'enrg_accord_cession_droits_miniers',
    name: 'Accord de cession de droits miniers',
    category: 'agro_environnement',
    price: 12000,
    priceMax: 36000,
    description: "Contrat de cession de titres ou droits miniers entre un cédant et un cessionnaire, soumis à l'approbation de l'autorité minière compétente.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'cedant', label: 'Cédant (titulaire actuel)', type: 'text', required: true },
      { key: 'cessionnaire', label: 'Cessionnaire', type: 'text', required: true },
      { key: 'titre_minier', label: 'Titre minier cédé', type: 'text', required: true },
      { key: 'prix_cession', label: 'Prix de cession (USD)', type: 'number', required: true },
      { key: 'conditions_paiement', label: 'Conditions de paiement', type: 'textarea', required: true },
      { key: 'obligations_transferees', label: 'Obligations transférées', type: 'textarea', required: true },
      { key: 'conditions_suspensives', label: 'Conditions suspensives', type: 'textarea', required: false },
    ]),
    body: `<h1>ACCORD DE CESSION DE DROITS MINIERS</h1>
<p><strong>Cédant :</strong> {{cedant}}</p>
<p><strong>Cessionnaire :</strong> {{cessionnaire}}</p>
<h2>Objet de la cession</h2>
<p>Titre minier : {{titre_minier}} — Prix : {{prix_cession}} USD</p>
<h2>Paiement et obligations</h2>
<p>{{conditions_paiement}}</p>
<p>Obligations transférées : {{obligations_transferees}}</p>
<h2>Conditions suspensives</h2>
<p>{{conditions_suspensives}}</p>`,
  },
  {
    code: 'enrg_convention_exploration_geologique',
    name: 'Convention exploration géologique',
    category: 'agro_environnement',
    price: 10000,
    priceMax: 30000,
    description: "Convention accordant à une société le droit d'effectuer des travaux d'exploration géologique sur un périmètre défini, en vue de l'identification de ressources minérales.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'etat', label: 'État ou autorité concédante', type: 'text', required: true },
      { key: 'explorateur', label: 'Société exploratrice', type: 'text', required: true },
      { key: 'perimetre_km2', label: "Périmètre d'exploration (km²)", type: 'number', required: true },
      { key: 'substances_explorees', label: 'Substances minérales recherchées', type: 'text', required: true },
      { key: 'duree_exploration', label: "Durée d'exploration (années)", type: 'number', required: true },
      { key: 'programme_travaux', label: 'Programme minimum de travaux', type: 'textarea', required: true },
      { key: 'budget_minimum', label: 'Budget minimum engagé (USD)', type: 'number', required: true },
    ]),
    body: `<h1>CONVENTION D'EXPLORATION GÉOLOGIQUE</h1>
<p><strong>Autorité concédante :</strong> {{etat}}</p>
<p><strong>Explorateur :</strong> {{explorateur}}</p>
<h2>Périmètre et substances</h2>
<p>Surface : {{perimetre_km2}} km² — Substances : {{substances_explorees}}</p>
<h2>Programme de travaux</h2>
<p>Durée : {{duree_exploration}} ans — Budget minimum : {{budget_minimum}} USD</p>
<p>{{programme_travaux}}</p>`,
  },
  {
    code: 'enrg_rapport_production_mensuel_mine',
    name: 'Rapport de production mensuel mine',
    category: 'agro_environnement',
    price: 3000,
    priceMax: 9000,
    description: "Rapport mensuel de production minière transmis à l'autorité régulatrice, détaillant les tonnages extraits, la qualité des minerais et les indicateurs opérationnels.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'societe', label: 'Société minière', type: 'text', required: true },
      { key: 'mine', label: 'Mine / Site', type: 'text', required: true },
      { key: 'mois_rapport', label: 'Mois du rapport', type: 'text', required: true },
      { key: 'tonnage_extrait', label: 'Tonnage extrait (t)', type: 'number', required: true },
      { key: 'teneur_moyenne', label: 'Teneur moyenne (%)', type: 'number', required: true },
      { key: 'production_metal', label: 'Production de métal (t)', type: 'number', required: true },
      { key: 'observations', label: 'Observations opérationnelles', type: 'textarea', required: false },
    ]),
    body: `<h1>RAPPORT DE PRODUCTION MENSUEL — MINE</h1>
<p><strong>Société :</strong> {{societe}} — <strong>Site :</strong> {{mine}} — <strong>Mois :</strong> {{mois_rapport}}</p>
<h2>Indicateurs de production</h2>
<table border="1" style="width:100%">
<tr><th>Tonnage extrait</th><th>Teneur moyenne</th><th>Production métal</th></tr>
<tr><td>{{tonnage_extrait}} t</td><td>{{teneur_moyenne}}%</td><td>{{production_metal}} t</td></tr>
</table>
<h2>Observations</h2>
<p>{{observations}}</p>`,
  },
  {
    code: 'enrg_fiche_controle_qualite_minerai',
    name: 'Fiche de contrôle qualité minerai',
    category: 'agro_environnement',
    price: 1200,
    priceMax: 3600,
    description: "Fiche de contrôle qualité documentant les analyses chimiques et physiques réalisées sur des échantillons de minerai prélevés en production.",
    templateType: 'pdf',
    classe: 'BASIQUE',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'site_prelevement', label: 'Site de prélèvement', type: 'text', required: true },
      { key: 'reference_echantillon', label: "Référence de l'échantillon", type: 'text', required: true },
      { key: 'date_prelevement', label: 'Date de prélèvement', type: 'date', required: true },
      { key: 'type_minerai', label: 'Type de minerai', type: 'text', required: true },
      { key: 'teneur_element_principal', label: 'Teneur élément principal (%)', type: 'number', required: true },
      { key: 'impuretes', label: 'Impuretés détectées', type: 'textarea', required: false },
      { key: 'resultat_conformite', label: 'Résultat de conformité', type: 'text', required: true },
    ]),
    body: `<h1>FICHE DE CONTRÔLE QUALITÉ MINERAI</h1>
<p><strong>Site :</strong> {{site_prelevement}} — <strong>Référence :</strong> {{reference_echantillon}} — <strong>Date :</strong> {{date_prelevement}}</p>
<h2>Caractéristiques</h2>
<p>Type : {{type_minerai}} — Teneur principale : {{teneur_element_principal}}%</p>
<p>Impuretés : {{impuretes}}</p>
<h2>Verdict qualité</h2>
<p><strong>Résultat :</strong> {{resultat_conformite}}</p>`,
  },
  {
    code: 'enrg_plan_urgence_installation_industrielle',
    name: "Plan d'urgence installation industrielle",
    category: 'agro_environnement',
    price: 8000,
    priceMax: 24000,
    description: "Plan d'urgence et de gestion des situations d'accident ou de catastrophe sur un site industriel du secteur de l'énergie ou des mines.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'installation', label: 'Installation concernée', type: 'text', required: true },
      { key: 'responsable_urgence', label: "Responsable plan d'urgence", type: 'text', required: true },
      { key: 'risques_identifies', label: 'Risques majeurs identifiés', type: 'textarea', required: true },
      { key: 'procedures_evacuation', label: "Procédures d'évacuation", type: 'textarea', required: true },
      { key: 'contacts_urgence', label: "Contacts d'urgence", type: 'textarea', required: true },
      { key: 'moyens_intervention', label: "Moyens d'intervention disponibles", type: 'textarea', required: true },
      { key: 'exercices_prevus', label: 'Exercices et simulations prévus', type: 'textarea', required: false },
    ]),
    body: `<h1>PLAN D'URGENCE — INSTALLATION INDUSTRIELLE</h1>
<p><strong>Installation :</strong> {{installation}}</p>
<p><strong>Responsable :</strong> {{responsable_urgence}}</p>
<h2>Risques majeurs</h2>
<p>{{risques_identifies}}</p>
<h2>Procédures d'évacuation</h2>
<p>{{procedures_evacuation}}</p>
<h2>Contacts et moyens d'intervention</h2>
<p>{{contacts_urgence}}</p>
<p>{{moyens_intervention}}</p>
<h2>Exercices prévus</h2>
<p>{{exercices_prevus}}</p>`,
  },
  {
    code: 'enrg_rapport_bilan_carbone',
    name: 'Rapport bilan carbone entreprise',
    category: 'agro_environnement',
    price: 9000,
    priceMax: 27000,
    description: "Rapport de bilan carbone évaluant les émissions de gaz à effet de serre d'une entreprise selon les scopes 1, 2 et 3, avec plan de réduction.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise', type: 'text', required: true },
      { key: 'annee_reference', label: 'Année de référence', type: 'text', required: true },
      { key: 'emissions_scope1', label: 'Émissions Scope 1 (tCO2e)', type: 'number', required: true },
      { key: 'emissions_scope2', label: 'Émissions Scope 2 (tCO2e)', type: 'number', required: true },
      { key: 'emissions_scope3', label: 'Émissions Scope 3 (tCO2e)', type: 'number', required: false },
      { key: 'objectif_reduction', label: 'Objectif de réduction (%)', type: 'number', required: true },
      { key: 'plan_action', label: 'Plan d\'action de réduction', type: 'textarea', required: true },
    ]),
    body: `<h1>RAPPORT BILAN CARBONE — {{entreprise}}</h1>
<p><strong>Année de référence :</strong> {{annee_reference}}</p>
<h2>Émissions de GES</h2>
<table border="1" style="width:100%">
<tr><th>Scope 1</th><th>Scope 2</th><th>Scope 3</th></tr>
<tr><td>{{emissions_scope1}} tCO2e</td><td>{{emissions_scope2}} tCO2e</td><td>{{emissions_scope3}} tCO2e</td></tr>
</table>
<h2>Plan de réduction (objectif : {{objectif_reduction}}%)</h2>
<p>{{plan_action}}</p>`,
  },
  {
    code: 'enrg_contrat_maintenance_centrale_solaire',
    name: 'Contrat de maintenance centrale solaire',
    category: 'agro_environnement',
    price: 4500,
    priceMax: 13500,
    description: "Contrat de maintenance préventive et corrective d'une centrale photovoltaïque, définissant les interventions planifiées et les niveaux de disponibilité garantis.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'proprietaire', label: 'Propriétaire de la centrale', type: 'text', required: true },
      { key: 'mainteneur', label: 'Prestataire de maintenance', type: 'text', required: true },
      { key: 'centrale', label: 'Centrale solaire concernée', type: 'text', required: true },
      { key: 'puissance_nominale', label: 'Puissance nominale (kWc)', type: 'number', required: true },
      { key: 'disponibilite_garantie', label: 'Disponibilité garantie (%)', type: 'number', required: true },
      { key: 'frequence_maintenance', label: 'Fréquence des visites préventives', type: 'text', required: true },
      { key: 'montant_annuel', label: 'Montant annuel du contrat (FCFA)', type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT DE MAINTENANCE — CENTRALE SOLAIRE</h1>
<p><strong>Propriétaire :</strong> {{proprietaire}}</p>
<p><strong>Mainteneur :</strong> {{mainteneur}}</p>
<h2>Centrale</h2>
<p>{{centrale}} — {{puissance_nominale}} kWc</p>
<h2>Engagements de service</h2>
<p>Disponibilité garantie : {{disponibilite_garantie}}% — Fréquence : {{frequence_maintenance}}</p>
<h2>Rémunération</h2>
<p>Montant annuel : {{montant_annuel}} FCFA</p>`,
  },
  {
    code: 'enrg_accord_power_purchase_ppa',
    name: 'Accord Power Purchase Agreement (PPA)',
    category: 'agro_environnement',
    price: 15000,
    priceMax: 45000,
    description: "Contrat d'achat d'électricité à long terme entre un producteur d'énergie renouvelable et un acheteur, garantissant un tarif stable pour la durée de l'accord.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 79,
    fieldsJson: F([
      { key: 'producteur', label: "Producteur d'énergie", type: 'text', required: true },
      { key: 'acheteur', label: "Acheteur d'énergie", type: 'text', required: true },
      { key: 'centrale_concernee', label: 'Centrale concernée', type: 'text', required: true },
      { key: 'puissance_contractee', label: 'Puissance contractée (MW)', type: 'number', required: true },
      { key: 'tarif_ppa', label: 'Tarif PPA (USD/MWh)', type: 'number', required: true },
      { key: 'duree_ppa', label: 'Durée du PPA (années)', type: 'number', required: true },
      { key: 'indexation', label: "Clause d'indexation du tarif", type: 'textarea', required: false },
      { key: 'take_or_pay', label: 'Clause take-or-pay', type: 'textarea', required: true },
    ]),
    body: `<h1>POWER PURCHASE AGREEMENT (PPA)</h1>
<p><strong>Producteur :</strong> {{producteur}}</p>
<p><strong>Acheteur :</strong> {{acheteur}}</p>
<h2>Objet</h2>
<p>Centrale : {{centrale_concernee}} — Puissance : {{puissance_contractee}} MW</p>
<h2>Tarification</h2>
<p>Tarif PPA : {{tarif_ppa}} USD/MWh — Durée : {{duree_ppa}} ans</p>
<p>Indexation : {{indexation}}</p>
<h2>Clause take-or-pay</h2>
<p>{{take_or_pay}}</p>`,
  },
  {
    code: 'enrg_plan_gestion_dechets_miniers',
    name: 'Plan de gestion des déchets miniers',
    category: 'agro_environnement',
    price: 10000,
    priceMax: 30000,
    description: "Plan définissant les procédures de collecte, traitement, stockage et élimination des déchets générés par une exploitation minière, conformément aux normes environnementales.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'exploitant', label: 'Exploitant minier', type: 'text', required: true },
      { key: 'site', label: 'Site minier', type: 'text', required: true },
      { key: 'types_dechets', label: 'Types de déchets générés', type: 'textarea', required: true },
      { key: 'volumes_annuels', label: 'Volumes annuels estimés (t)', type: 'number', required: true },
      { key: 'methodes_traitement', label: 'Méthodes de traitement', type: 'textarea', required: true },
      { key: 'zones_stockage', label: 'Zones de stockage désignées', type: 'textarea', required: true },
      { key: 'monitoring', label: 'Programme de monitoring', type: 'textarea', required: true },
    ]),
    body: `<h1>PLAN DE GESTION DES DÉCHETS MINIERS</h1>
<p><strong>Exploitant :</strong> {{exploitant}} — <strong>Site :</strong> {{site}}</p>
<h2>Déchets concernés</h2>
<p>{{types_dechets}} — Volume annuel : {{volumes_annuels}} t</p>
<h2>Traitement et stockage</h2>
<p>{{methodes_traitement}}</p>
<p>Zones de stockage : {{zones_stockage}}</p>
<h2>Programme de monitoring</h2>
<p>{{monitoring}}</p>`,
  },
  {
    code: 'enrg_rapport_audit_energetique',
    name: 'Rapport audit énergétique',
    category: 'agro_environnement',
    price: 8500,
    priceMax: 25500,
    description: "Rapport d'audit énergétique évaluant la consommation d'énergie d'une installation industrielle ou tertiaire et proposant des mesures d'efficacité énergétique.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise auditée', type: 'text', required: true },
      { key: 'auditeur', label: 'Auditeur énergétique', type: 'text', required: true },
      { key: 'date_audit', label: "Date de l'audit", type: 'date', required: true },
      { key: 'consommation_actuelle', label: 'Consommation actuelle (MWh/an)', type: 'number', required: true },
      { key: 'postes_consommateurs', label: 'Principaux postes consommateurs', type: 'textarea', required: true },
      { key: 'potentiel_economies', label: "Potentiel d'économies (%)", type: 'number', required: true },
      { key: 'recommandations', label: 'Recommandations prioritaires', type: 'textarea', required: true },
      { key: 'investissements_requis', label: 'Investissements requis (FCFA)', type: 'number', required: false },
    ]),
    body: `<h1>RAPPORT D'AUDIT ÉNERGÉTIQUE</h1>
<p><strong>Entreprise :</strong> {{entreprise}} — <strong>Auditeur :</strong> {{auditeur}} — <strong>Date :</strong> {{date_audit}}</p>
<h2>Consommation actuelle</h2>
<p>{{consommation_actuelle}} MWh/an</p>
<h2>Principaux postes consommateurs</h2>
<p>{{postes_consommateurs}}</p>
<h2>Potentiel d'économies et recommandations</h2>
<p>Potentiel : {{potentiel_economies}}% — Investissements : {{investissements_requis}} FCFA</p>
<p>{{recommandations}}</p>`,
  },
  {
    code: 'enrg_convention_exploitation_agricole_durable',
    name: "Convention d'exploitation agricole durable",
    category: 'agro_environnement',
    price: 5500,
    priceMax: 16500,
    description: "Convention encadrant une exploitation agricole selon les principes du développement durable, intégrant gestion des ressources naturelles, pratiques agro-écologiques et obligations environnementales.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'exploitant_agricole', label: 'Exploitant agricole', type: 'text', required: true },
      { key: 'autorite_tutelle', label: 'Autorité de tutelle', type: 'text', required: true },
      { key: 'superficie_exploitation', label: "Superficie d'exploitation (ha)", type: 'number', required: true },
      { key: 'cultures_pratiquees', label: 'Cultures pratiquées', type: 'textarea', required: true },
      { key: 'pratiques_durables', label: 'Pratiques durables engagées', type: 'textarea', required: true },
      { key: 'gestion_eau', label: "Plan de gestion de l'eau", type: 'textarea', required: true },
      { key: 'certifications_visees', label: 'Certifications visées', type: 'text', required: false },
      { key: 'duree_convention', label: 'Durée de la convention', type: 'text', required: true },
    ]),
    body: `<h1>CONVENTION D'EXPLOITATION AGRICOLE DURABLE</h1>
<p><strong>Exploitant :</strong> {{exploitant_agricole}}</p>
<p><strong>Autorité de tutelle :</strong> {{autorite_tutelle}}</p>
<h2>Exploitation</h2>
<p>Surface : {{superficie_exploitation}} ha — Cultures : {{cultures_pratiquees}}</p>
<h2>Engagements durables</h2>
<p>{{pratiques_durables}}</p>
<h2>Gestion de l'eau</h2>
<p>{{gestion_eau}}</p>
<p><strong>Certifications visées :</strong> {{certifications_visees}}</p>
<p><strong>Durée :</strong> {{duree_convention}}</p>`,
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
  console.log(`Batch 10a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
