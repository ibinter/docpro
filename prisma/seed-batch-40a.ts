import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ===== TEXTILE / MODE (25 templates) =====
  {
    code: 'text_confection_vetements',
    name: "Contrat de Confection de Vetements (Facon)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de sous-traitance de confection de vetements a facon entre un donneur d ordre et un atelier de couture en Cote d Ivoire.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'donneur_ordre', label: "Nom du donneur d ordre", type: 'text', required: true },
      { key: 'atelier_nom', label: "Nom de l atelier de couture", type: 'text', required: true },
      { key: 'description_modele', label: "Description du modele a confectionner", type: 'textarea', required: true },
      { key: 'quantite', label: "Quantite de pieces commandees", type: 'text', required: true },
      { key: 'prix_facon', label: "Prix de facon unitaire (FCFA)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison prevue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONFECTION DE VETEMENTS A FACON</h1>
<p>Entre les soussignes :</p>
<p><strong>Le Donneur d ordre :</strong> {{donneur_ordre}}</p>
<p><strong>L Atelier de couture :</strong> {{atelier_nom}}</p>
<h2>Article 1 - Objet</h2>
<p>Le present contrat a pour objet la confection a facon des vetements suivants : {{description_modele}}.</p>
<h2>Article 2 - Quantite et Prix</h2>
<p>Quantite commandee : {{quantite}} pieces. Prix de facon unitaire : {{prix_facon}} FCFA.</p>
<h2>Article 3 - Delai de Livraison</h2>
<p>Les vetements seront livres au plus tard le {{date_livraison}}.</p>
<h2>Article 4 - Qualite</h2>
<p>L atelier s engage a respecter les specifications techniques et les finitions exigees par le donneur d ordre.</p>
<h2>Article 5 - Propriete des Matieres</h2>
<p>Les matieres premieres fournies par le donneur d ordre demeurent sa propriete exclusive.</p>
<p>Fait a Abidjan, le {{date_livraison}}</p>
<p>Signatures des parties</p></div>`,
  },
  {
    code: 'text_sous_traitance_atelier',
    name: "Accord de Sous-Traitance Atelier de Couture",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10000,
    description: "Accord de sous-traitance entre une entreprise de mode et un atelier de couture partenaire pour la production de collections.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'entreprise_mode', label: "Nom de l entreprise de mode", type: 'text', required: true },
      { key: 'atelier_sous_traitant', label: "Nom de l atelier sous-traitant", type: 'text', required: true },
      { key: 'type_production', label: "Type de production sous-traitee", type: 'textarea', required: true },
      { key: 'capacite_mensuelle', label: "Capacite de production mensuelle", type: 'text', required: true },
      { key: 'date_debut', label: "Date de debut de l accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUS-TRAITANCE - ATELIER DE COUTURE</h1>
<p>Entre :</p>
<p><strong>L Entreprise donneure d ordre :</strong> {{entreprise_mode}}</p>
<p><strong>L Atelier sous-traitant :</strong> {{atelier_sous_traitant}}</p>
<h2>Article 1 - Objet de l Accord</h2>
<p>Le present accord encadre la sous-traitance de la production suivante : {{type_production}}.</p>
<h2>Article 2 - Capacite de Production</h2>
<p>L atelier s engage a fournir une capacite mensuelle de : {{capacite_mensuelle}}.</p>
<h2>Article 3 - Confidentialite</h2>
<p>L atelier s engage a garder confidentiels tous les modeles, patrons et informations commerciales transmis.</p>
<h2>Article 4 - Controle Qualite</h2>
<p>L entreprise se reserve le droit d effectuer des controles qualite inopines dans les locaux de l atelier.</p>
<p>Fait a Abidjan, le {{date_debut}}</p></div>`,
  },
  {
    code: 'text_contrat_styliste',
    name: "Contrat de Styliste-Createur",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de collaboration entre une maison de mode et un styliste-createur independant pour la conception de collections.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'maison_mode', label: "Nom de la maison de mode", type: 'text', required: true },
      { key: 'styliste_nom', label: "Nom et prenom du styliste", type: 'text', required: true },
      { key: 'collection_nom', label: "Nom de la collection", type: 'text', required: true },
      { key: 'honoraires', label: "Honoraires de creation (FCFA)", type: 'text', required: true },
      { key: 'date_rendu', label: "Date de remise des creations", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE STYLISTE-CREATEUR</h1>
<p>Entre la maison de mode <strong>{{maison_mode}}</strong> et le styliste <strong>{{styliste_nom}}</strong></p>
<h2>Article 1 - Mission Creative</h2>
<p>Le styliste est charge de concevoir la collection <strong>{{collection_nom}}</strong> comprenant les planches tendances, les croquis techniques et les cahiers des charges matiere.</p>
<h2>Article 2 - Remuneration</h2>
<p>Les honoraires de creation s elevent a {{honoraires}} FCFA, payables en deux versements.</p>
<h2>Article 3 - Propriete Intellectuelle</h2>
<p>Les creations realisees dans le cadre du present contrat sont cedees a titre exclusif a la maison de mode.</p>
<h2>Article 4 - Delai</h2>
<p>Le styliste remettra l integralite des creations au plus tard le {{date_rendu}}.</p>
<p>Fait a Abidjan</p></div>`,
  },
  {
    code: 'text_licence_marque_mode',
    name: "Accord de Licence de Marque Mode",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Accord de licence permettant l exploitation d une marque de mode en Afrique de l Ouest sous conditions contractuelles precises.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'concedant', label: "Nom du concedant de licence", type: 'text', required: true },
      { key: 'licencie', label: "Nom du licencie", type: 'text', required: true },
      { key: 'marque', label: "Denomination de la marque", type: 'text', required: true },
      { key: 'territoire', label: "Territoire d exploitation", type: 'text', required: true },
      { key: 'redevance', label: "Taux de redevance (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de debut de la licence", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE MARQUE MODE</h1>
<p><strong>Concedant :</strong> {{concedant}} | <strong>Licencie :</strong> {{licencie}}</p>
<h2>Article 1 - Objet</h2>
<p>Le concedant accorde au licencie le droit d exploiter la marque <strong>{{marque}}</strong> sur le territoire : {{territoire}}.</p>
<h2>Article 2 - Redevances</h2>
<p>Le licencie versera une redevance de {{redevance}}% du chiffre d affaires net realise sous la marque.</p>
<h2>Article 3 - Obligations du Licencie</h2>
<p>Le licencie s engage a respecter le positionnement, la charte graphique et les standards qualite de la marque.</p>
<h2>Article 4 - Duree</h2>
<p>La presente licence prend effet le {{date_debut}} pour une duree de 3 ans renouvelable.</p>
<p>Fait a Abidjan</p></div>`,
  },
  {
    code: 'text_distribution_vetements',
    name: "Contrat de Distribution de Vetements (Grossiste)",
    category: 'commercial_financier',
    price: 4500,
    priceMax: 13000,
    description: "Contrat de distribution exclusive ou non-exclusive de vetements entre un fabricant ou marque et un distributeur grossiste.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'fournisseur', label: "Nom du fournisseur/fabricant", type: 'text', required: true },
      { key: 'distributeur', label: "Nom du distributeur grossiste", type: 'text', required: true },
      { key: 'zone_distribution', label: "Zone de distribution", type: 'text', required: true },
      { key: 'remise', label: "Taux de remise grossiste (%)", type: 'text', required: true },
      { key: 'commande_minimum', label: "Montant minimum de commande (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DISTRIBUTION DE VETEMENTS</h1>
<p><strong>Fournisseur :</strong> {{fournisseur}} | <strong>Distributeur :</strong> {{distributeur}}</p>
<h2>Article 1 - Territoire</h2>
<p>Le distributeur est autorise a commercialiser les vetements dans la zone suivante : {{zone_distribution}}.</p>
<h2>Article 2 - Conditions Tarifaires</h2>
<p>Le distributeur beneficie d une remise de {{remise}}% sur les prix publics conseilles. La commande minimum est de {{commande_minimum}} FCFA.</p>
<h2>Article 3 - Obligations du Distributeur</h2>
<p>Le distributeur s engage a maintenir un stock adequat, a respecter les prix conseilles et a promouvoir activement les produits.</p>
<h2>Article 4 - Exclusivite</h2>
<p>Le present contrat est conclu a titre non-exclusif sauf accord ecrit contraire.</p></div>`,
  },
  {
    code: 'text_franchise_boutique',
    name: "Accord de Franchise Boutique Mode",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 20000,
    description: "Accord de franchise pour l ouverture et l exploitation d une boutique de mode sous enseigne en Cote d Ivoire.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'franchiseur', label: "Nom du franchiseur", type: 'text', required: true },
      { key: 'franchiseur_adresse', label: "Adresse du franchiseur", type: 'text', required: true },
      { key: 'franchise', label: "Nom du franchiseur", type: 'text', required: true },
      { key: 'enseigne', label: "Denomination de l enseigne", type: 'text', required: true },
      { key: 'droit_entree', label: "Droit d entree (FCFA)", type: 'text', required: true },
      { key: 'date_ouverture', label: "Date d ouverture prevue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE FRANCHISE BOUTIQUE MODE</h1>
<p><strong>Franchiseur :</strong> {{franchiseur}}, {{franchiseur_adresse}}</p>
<p><strong>Franchiseur :</strong> {{franchise}}</p>
<h2>Article 1 - Objet</h2>
<p>Le franchiseur accorde au franchiseur le droit d exploiter une boutique sous l enseigne <strong>{{enseigne}}</strong>.</p>
<h2>Article 2 - Droit d Entree</h2>
<p>Le franchiseur versera un droit d entree de {{droit_entree}} FCFA a la signature du present accord.</p>
<h2>Article 3 - Savoir-Faire</h2>
<p>Le franchiseur transmettra son savoir-faire commercial, ses standards visuels et sa methode de gestion.</p>
<h2>Article 4 - Ouverture</h2>
<p>La boutique sera operationnelle au plus tard le {{date_ouverture}}.</p></div>`,
  },
  {
    code: 'text_impression_serigraphie',
    name: "Contrat de Service d Impression Textile (Serigraphie)",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 7000,
    description: "Contrat de prestation de service de serigraphie et d impression sur textile entre un atelier specialise et un client.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'atelier_serigraphie', label: "Nom de l atelier de serigraphie", type: 'text', required: true },
      { key: 'description_motif', label: "Description du motif a imprimer", type: 'textarea', required: true },
      { key: 'quantite_pieces', label: "Nombre de pieces a imprimer", type: 'text', required: true },
      { key: 'prix_unitaire', label: "Prix unitaire d impression (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D IMPRESSION TEXTILE - SERIGRAPHIE</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{atelier_serigraphie}}</p>
<h2>Article 1 - Prestation</h2>
<p>L atelier s engage a realiser l impression serigraphique du motif suivant : {{description_motif}} sur {{quantite_pieces}} pieces.</p>
<h2>Article 2 - Prix</h2>
<p>Le prix unitaire d impression est de {{prix_unitaire}} FCFA. Le montant total sera facture a la livraison.</p>
<h2>Article 3 - Fichiers et BAT</h2>
<p>Le client fournira les fichiers graphiques en haute resolution. Un bon a tirer (BAT) sera valide avant lancement.</p>
<h2>Article 4 - Responsabilite</h2>
<p>L atelier n est pas responsable des defauts dus a des fichiers de mauvaise qualite fournis par le client.</p></div>`,
  },
  {
    code: 'text_broderie_industrielle',
    name: "Accord de Service de Broderie Industrielle",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Accord de prestation de broderie industrielle sur vetements et articles textiles pour professionnels.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'prestataire_broderie', label: "Nom du prestataire en broderie", type: 'text', required: true },
      { key: 'motif_broderie', label: "Description du motif a broder", type: 'textarea', required: true },
      { key: 'support_textile', label: "Type de support textile", type: 'text', required: true },
      { key: 'quantite', label: "Quantite de pieces", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BRODERIE INDUSTRIELLE</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Prestataire :</strong> {{prestataire_broderie}}</p>
<h2>Article 1 - Description de la Prestation</h2>
<p>Le prestataire s engage a realiser la broderie du motif suivant : {{motif_broderie}} sur {{support_textile}}, pour une quantite de {{quantite}} pieces.</p>
<h2>Article 2 - Qualite des Fils</h2>
<p>Le prestataire utilisera des fils de haute qualite adaptes au support. Les couleurs seront validees avec le client avant execution.</p>
<h2>Article 3 - Delais</h2>
<p>Le prestataire s engage a respecter les delais convenus d un commun accord et confirmes par bon de commande.</p></div>`,
  },
  {
    code: 'text_teinturerie_industrielle',
    name: "Contrat de Service de Teinturerie Industrielle",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Contrat de prestation de teinture industrielle de tissus ou vetements entre un atelier de teinturerie et un donneur d ordre.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'teinturerie_nom', label: "Nom de la teinturerie", type: 'text', required: true },
      { key: 'description_tissu', label: "Description du tissu a teindre", type: 'textarea', required: true },
      { key: 'couleur_souhaitee', label: "Couleur ou nuance souhaitee", type: 'text', required: true },
      { key: 'quantite_kg', label: "Quantite en kilogrammes", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE TEINTURERIE INDUSTRIELLE</h1>
<p><strong>Client :</strong> {{client_nom}} | <strong>Teinturerie :</strong> {{teinturerie_nom}}</p>
<h2>Article 1 - Objet</h2>
<p>La teinturerie s engage a teindre le tissu suivant : {{description_tissu}} dans la couleur {{couleur_souhaitee}}, pour une quantite de {{quantite_kg}} kg.</p>
<h2>Article 2 - Responsabilite Environnementale</h2>
<p>La teinturerie s engage a traiter ses effluents conformement aux normes en vigueur en Cote d Ivoire.</p>
<h2>Article 3 - Non-Conformite</h2>
<p>En cas de non-conformite de teinte constatee, la teinturerie s engage a reprendre la prestation a ses frais.</p></div>`,
  },
  {
    code: 'text_fournisseur_wax',
    name: "Accord de Fournisseur de Tissus Wax Africain",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Accord commercial entre un fournisseur de tissus wax africain et un acheteur professionnel ou detaillant.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'fournisseur_wax', label: "Nom du fournisseur de wax", type: 'text', required: true },
      { key: 'acheteur', label: "Nom de l acheteur", type: 'text', required: true },
      { key: 'references_wax', label: "References et motifs du wax", type: 'textarea', required: true },
      { key: 'prix_metre', label: "Prix au metre (FCFA)", type: 'text', required: true },
      { key: 'quantite_metres', label: "Quantite en metres", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE FOURNITURE DE TISSUS WAX AFRICAIN</h1>
<p><strong>Fournisseur :</strong> {{fournisseur_wax}} | <strong>Acheteur :</strong> {{acheteur}}</p>
<h2>Article 1 - Objet</h2>
<p>Le fournisseur s engage a livrer les tissus wax suivants : {{references_wax}} pour une quantite de {{quantite_metres}} metres au prix de {{prix_metre}} FCFA/m.</p>
<h2>Article 2 - Qualite et Authenticite</h2>
<p>Le fournisseur garantit l authenticite et la qualite des tissus wax, conformes aux standards du marche ouest-africain.</p>
<h2>Article 3 - Paiement</h2>
<p>Le paiement s effectue a 30% a la commande et 70% a la livraison sauf conditions specifiques negociees.</p></div>`,
  },
  {
    code: 'text_service_modelisme',
    name: "Contrat de Service de Modelisme",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10000,
    description: "Contrat entre un modeliste professionnel et une entreprise de mode pour la realisation de patrons et gabarits de vetements.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'client_mode', label: "Nom de l entreprise cliente", type: 'text', required: true },
      { key: 'modeliste', label: "Nom du modeliste", type: 'text', required: true },
      { key: 'modeles_a_realiser', label: "Description des modeles a patron", type: 'textarea', required: true },
      { key: 'honoraires_patron', label: "Honoraires par patron (FCFA)", type: 'text', required: true },
      { key: 'date_remise', label: "Date de remise des patrons", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE MODELISME</h1>
<p><strong>Client :</strong> {{client_mode}} | <strong>Modeliste :</strong> {{modeliste}}</p>
<h2>Article 1 - Prestation</h2>
<p>Le modeliste s engage a realiser les patrons industriels des modeles suivants : {{modeles_a_realiser}}.</p>
<h2>Article 2 - Remuneration</h2>
<p>Les honoraires sont de {{honoraires_patron}} FCFA par patron realise. La facturation intervient a la remise des patrons.</p>
<h2>Article 3 - Propriete</h2>
<p>Les patrons realises sont la propriete exclusive du client des leur paiement integral.</p>
<h2>Article 4 - Delai</h2>
<p>L ensemble des patrons sera remis au plus tard le {{date_remise}}.</p></div>`,
  },
  {
    code: 'text_defile_mode',
    name: "Accord de Participation a un Defile de Mode",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Accord encadrant la participation d un createur ou d une marque a un defile de mode organise en Afrique de l Ouest.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'organisateur_defile', label: "Nom de l organisateur du defile", type: 'text', required: true },
      { key: 'createur_marque', label: "Nom du createur ou de la marque", type: 'text', required: true },
      { key: 'date_defile', label: "Date du defile", type: 'date', required: true },
      { key: 'lieu_defile', label: "Lieu du defile", type: 'text', required: true },
      { key: 'nombre_looks', label: "Nombre de looks presentes", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTICIPATION A UN DEFILE DE MODE</h1>
<p><strong>Organisateur :</strong> {{organisateur_defile}} | <strong>Createur/Marque :</strong> {{createur_marque}}</p>
<h2>Article 1 - Objet</h2>
<p>Le present accord organise la participation du createur au defile prevu le {{date_defile}} au {{lieu_defile}}.</p>
<h2>Article 2 - Contenu de la Presentation</h2>
<p>Le createur presentera {{nombre_looks}} looks de sa collection. Les vetements seront fournis et recuperes par le createur.</p>
<h2>Article 3 - Droits Images</h2>
<p>L organisateur dispose du droit d utiliser les images du defile a des fins de communication evenementielle et promotionnelle.</p>
<h2>Article 4 - Logistique</h2>
<p>L organisateur prend en charge l organisation du plateau, les mannequins et la mise en scene du defile.</p></div>`,
  },
  {
    code: 'text_stylisme_publicitaire',
    name: "Contrat de Service de Stylisme Publicitaire",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de prestation de stylisme pour productions publicitaires, shoots photo ou tournages video en Afrique.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'agence_client', label: "Nom de l agence ou du client", type: 'text', required: true },
      { key: 'styliste_pub', label: "Nom du styliste", type: 'text', required: true },
      { key: 'description_production', label: "Description de la production", type: 'textarea', required: true },
      { key: 'honoraires_jour', label: "Honoraires journaliers (FCFA)", type: 'text', required: true },
      { key: 'date_tournage', label: "Date du tournage ou shooting", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE STYLISME PUBLICITAIRE</h1>
<p><strong>Client/Agence :</strong> {{agence_client}} | <strong>Styliste :</strong> {{styliste_pub}}</p>
<h2>Article 1 - Mission</h2>
<p>Le styliste est engage pour assurer le stylisme de la production suivante : {{description_production}}, prevue le {{date_tournage}}.</p>
<h2>Article 2 - Remuneration</h2>
<p>Les honoraires journaliers sont de {{honoraires_jour}} FCFA, auxquels s ajoutent les frais de location de vetements sur justificatifs.</p>
<h2>Article 3 - Preparation</h2>
<p>Le styliste procedera a une preparation en amont incluant les essayages, recherches tendances et constitution des looks.</p>
<h2>Article 4 - Droits</h2>
<p>Le client dispose de tous droits sur les visuels produits lors du shooting pour les usages commerciaux convenus.</p></div>`,
  },
  {
    code: 'text_production_kente_bogolan',
    name: "Accord de Production de Tissu Kente/Bogolan/Batik",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Accord de production de tissus traditionnels africains (kente, bogolan, batik) entre un artisan tisserand et un acheteur.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'tisserand', label: "Nom de l artisan tisserand", type: 'text', required: true },
      { key: 'acheteur_tissu', label: "Nom de l acheteur", type: 'text', required: true },
      { key: 'type_tissu', label: "Type de tissu (kente/bogolan/batik)", type: 'text', required: true },
      { key: 'specifications', label: "Specifications et motifs souhaites", type: 'textarea', required: true },
      { key: 'prix_unite', label: "Prix par piece ou metre (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRODUCTION DE TISSU TRADITIONNEL AFRICAIN</h1>
<p><strong>Tisserand :</strong> {{tisserand}} | <strong>Acheteur :</strong> {{acheteur_tissu}}</p>
<h2>Article 1 - Objet</h2>
<p>Le tisserand s engage a produire du tissu de type <strong>{{type_tissu}}</strong> selon les specifications suivantes : {{specifications}}.</p>
<h2>Article 2 - Prix et Paiement</h2>
<p>Le prix convenu est de {{prix_unite}} FCFA par unite. Un acompte de 40% est verse a la commande.</p>
<h2>Article 3 - Authenticite</h2>
<p>Le tisserand certifie que les tissus sont realises selon les techniques traditionnelles authentiques et avec des matieres naturelles.</p>
<h2>Article 4 - Propriete du Design</h2>
<p>Les motifs specifiques crees a la demande de l acheteur lui appartiennent de facon exclusive.</p></div>`,
  },
  {
    code: 'text_representation_marque_inter',
    name: "Contrat de Representation de Marque Internationale",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de representation et de distribution d une marque de mode internationale sur le marche ivoirien et ouest-africain.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'marque_internationale', label: "Nom de la marque internationale", type: 'text', required: true },
      { key: 'representant_local', label: "Nom du representant local", type: 'text', required: true },
      { key: 'pays_representation', label: "Pays ou territoire de representation", type: 'text', required: true },
      { key: 'commission', label: "Taux de commission (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de debut du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE REPRESENTATION DE MARQUE INTERNATIONALE</h1>
<p><strong>Marque :</strong> {{marque_internationale}} | <strong>Representant :</strong> {{representant_local}}</p>
<h2>Article 1 - Mandat de Representation</h2>
<p>Le representant est nomme agent exclusif de la marque sur le territoire : {{pays_representation}}, a compter du {{date_debut}}.</p>
<h2>Article 2 - Remuneration</h2>
<p>Le representant percevra une commission de {{commission}}% sur le chiffre d affaires genere dans sa zone.</p>
<h2>Article 3 - Obligations</h2>
<p>Le representant s engage a promouvoir activement la marque, a respecter son positionnement premium et a rendre compte mensuellement de ses activites.</p></div>`,
  },
  {
    code: 'text_label_made_africa',
    name: "Accord de Label Made in Africa",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 11000,
    description: "Accord d attribution et d utilisation d un label made in Africa pour des produits textiles ou de mode fabriques sur le continent.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'organisme_label', label: "Nom de l organisme certificateur", type: 'text', required: true },
      { key: 'entreprise_labelisee', label: "Nom de l entreprise labelisee", type: 'text', required: true },
      { key: 'produits_concernes', label: "Produits concernes par le label", type: 'textarea', required: true },
      { key: 'conditions_label', label: "Conditions requises pour le label", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LABEL MADE IN AFRICA</h1>
<p><strong>Organisme :</strong> {{organisme_label}} | <strong>Entreprise :</strong> {{entreprise_labelisee}}</p>
<h2>Article 1 - Attribution du Label</h2>
<p>L organisme certifie que les produits suivants : {{produits_concernes}} sont eligible au label "Made in Africa".</p>
<h2>Article 2 - Conditions de Maintien</h2>
<p>Le maintien du label est soumis au respect des conditions suivantes : {{conditions_label}}.</p>
<h2>Article 3 - Audits</h2>
<p>L organisme se reserve le droit d effectuer des audits annuels pour verifier le maintien des conditions d attribution.</p>
<h2>Article 4 - Usage</h2>
<p>L entreprise est autorisee a apposer le logo "Made in Africa" sur ses produits et supports de communication.</p></div>`,
  },
  {
    code: 'text_plan_collection_saisonniere',
    name: "Plan de Collection Saisonniere",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Document de planification d une collection de mode saisonniere incluant les objectifs, les references et le planning de production.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'marque_collection', label: "Nom de la marque", type: 'text', required: true },
      { key: 'nom_collection', label: "Nom de la collection", type: 'text', required: true },
      { key: 'saison', label: "Saison (ex: Ete 2025)", type: 'text', required: true },
      { key: 'nombre_references', label: "Nombre de references prevues", type: 'text', required: true },
      { key: 'budget_production', label: "Budget de production (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE COLLECTION SAISONNIERE</h1>
<p><strong>Marque :</strong> {{marque_collection}} | <strong>Collection :</strong> {{nom_collection}} | <strong>Saison :</strong> {{saison}}</p>
<h2>1. Objectifs de la Collection</h2>
<p>Cette collection vise a positionner la marque sur le segment cible avec {{nombre_references}} references distinctes.</p>
<h2>2. Budget Global</h2>
<p>Budget de production alloue : {{budget_production}} FCFA, reparti entre conception, matieres, fabrication et communication.</p>
<h2>3. Planning de Production</h2>
<p>- Conception et moodboard : Mois 1</p>
<p>- Realisation des patrons : Mois 2</p>
<p>- Production en serie : Mois 3-4</p>
<p>- Lancement commercial : Mois 5</p>
<h2>4. Indicateurs de Performance</h2>
<p>Objectif de vente, taux de couverture des references et retours clients seront suivis mensuellement.</p></div>`,
  },
  {
    code: 'text_rapport_performance_boutique',
    name: "Rapport de Performance Boutique Mode",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 7000,
    description: "Rapport periodique d analyse des performances commerciales d une boutique de mode : ventes, stocks, indicateurs cles.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'boutique_nom', label: "Nom de la boutique", type: 'text', required: true },
      { key: 'periode_rapport', label: "Periode analysee (ex: Janvier 2025)", type: 'text', required: true },
      { key: 'chiffre_affaires', label: "Chiffre d affaires realise (FCFA)", type: 'text', required: true },
      { key: 'nombre_transactions', label: "Nombre de transactions", type: 'text', required: true },
      { key: 'taux_transformation', label: "Taux de transformation (%)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE - BOUTIQUE MODE</h1>
<p><strong>Boutique :</strong> {{boutique_nom}} | <strong>Periode :</strong> {{periode_rapport}}</p>
<h2>1. Resultats Commerciaux</h2>
<p>Chiffre d affaires : {{chiffre_affaires}} FCFA</p>
<p>Nombre de transactions : {{nombre_transactions}}</p>
<p>Taux de transformation : {{taux_transformation}}%</p>
<h2>2. Analyse des Ventes</h2>
<p>Identification des meilleures ventes, des produits a rotation lente et des opportunites de reapprovisionnement.</p>
<h2>3. Gestion des Stocks</h2>
<p>Etat du stock au terme de la periode, taux de rupture et recommandations de commande.</p>
<h2>4. Actions Correctives</h2>
<p>Mise en place d actions commerciales pour la periode suivante : promotions, nouveaux arrivages, evenements en boutique.</p></div>`,
  },
  {
    code: 'text_blanchisserie_industrielle',
    name: "Contrat de Service de Blanchisserie Industrielle",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 7000,
    description: "Contrat de prestation de blanchisserie industrielle pour entreprises du secteur hotelier, hospitalier ou de l uniforme professionnel.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'client_blanchisserie', label: "Nom du client", type: 'text', required: true },
      { key: 'blanchisserie_nom', label: "Nom de la blanchisserie", type: 'text', required: true },
      { key: 'articles_traites', label: "Types d articles traites", type: 'textarea', required: true },
      { key: 'frequence_collecte', label: "Frequence de collecte et livraison", type: 'text', required: true },
      { key: 'tarif_mensuel', label: "Tarif mensuel forfaitaire (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE BLANCHISSERIE INDUSTRIELLE</h1>
<p><strong>Client :</strong> {{client_blanchisserie}} | <strong>Blanchisserie :</strong> {{blanchisserie_nom}}</p>
<h2>Article 1 - Objet</h2>
<p>La blanchisserie assure le traitement des articles suivants : {{articles_traites}} selon une frequence de {{frequence_collecte}}.</p>
<h2>Article 2 - Tarification</h2>
<p>Le tarif mensuel forfaitaire est de {{tarif_mensuel}} FCFA, facturable en debut de mois.</p>
<h2>Article 3 - Responsabilite</h2>
<p>La blanchisserie est responsable des articles pris en charge. En cas de perte ou deterioration, une indemnisation est prevue.</p></div>`,
  },
  {
    code: 'text_service_pressing',
    name: "Accord de Service de Pressing",
    category: 'commercial_financier',
    price: 1500,
    priceMax: 4500,
    description: "Accord de prestation de service de pressing et nettoyage a sec de vetements entre un pressing et ses clients professionnels.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 45,
    fieldsJson: F([
      { key: 'client_pressing', label: "Nom du client", type: 'text', required: true },
      { key: 'pressing_nom', label: "Nom du pressing", type: 'text', required: true },
      { key: 'types_vetements', label: "Types de vetements traites", type: 'text', required: true },
      { key: 'delai_traitement', label: "Delai de traitement standard", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRESSING</h1>
<p><strong>Client :</strong> {{client_pressing}} | <strong>Pressing :</strong> {{pressing_nom}}</p>
<h2>Article 1 - Services</h2>
<p>Le pressing assure le nettoyage et l entretien des articles suivants : {{types_vetements}}.</p>
<h2>Article 2 - Delais</h2>
<p>Le delai standard de traitement est de {{delai_traitement}} jours ouvres. Un service express est disponible sur demande.</p>
<h2>Article 3 - Etiquetage</h2>
<p>Le pressing s engage a respecter scrupuleusement les instructions d entretien figurant sur les etiquettes des vetements.</p>
<h2>Article 4 - Responsabilite</h2>
<p>Le pressing est responsable des articles remis et indemnise le client en cas de dommage prouve de son fait.</p></div>`,
  },
  {
    code: 'text_costume_film',
    name: "Contrat de Service de Costume pour Film",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de prestation de costumes pour productions cinematographiques, series televisees et evenements audiovisuels en Afrique.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'production_nom', label: "Nom de la production", type: 'text', required: true },
      { key: 'costumier', label: "Nom du costumier", type: 'text', required: true },
      { key: 'description_production', label: "Description de la production", type: 'textarea', required: true },
      { key: 'budget_costume', label: "Budget alloue aux costumes (FCFA)", type: 'text', required: true },
      { key: 'date_tournage', label: "Periode de tournage", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE COSTUME POUR PRODUCTION AUDIOVISUELLE</h1>
<p><strong>Production :</strong> {{production_nom}} | <strong>Costumier :</strong> {{costumier}}</p>
<h2>Article 1 - Mission</h2>
<p>Le costumier est charge de concevoir, sourcer et gerer l ensemble des costumes pour : {{description_production}}.</p>
<h2>Article 2 - Budget</h2>
<p>Le budget alloue est de {{budget_costume}} FCFA, incluant achats, locations, confections et entretien durant le tournage.</p>
<h2>Article 3 - Periode</h2>
<p>La mission se deroule autour de la periode de tournage prevue le {{date_tournage}}.</p>
<h2>Article 4 - Propriete</h2>
<p>Les costumes speciaux confectionnes pour la production restent la propriete de la production a l issue du tournage.</p></div>`,
  },
  {
    code: 'text_vente_pieces_collection',
    name: "Accord de Vente de Pieces de Collection",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Accord de vente de pieces de mode de collection ou d edition limitee entre un createur et un acheteur particulier ou professionnel.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'createur_vendeur', label: "Nom du createur vendeur", type: 'text', required: true },
      { key: 'acheteur_collection', label: "Nom de l acheteur", type: 'text', required: true },
      { key: 'description_piece', label: "Description de la piece de collection", type: 'textarea', required: true },
      { key: 'prix_vente', label: "Prix de vente (FCFA)", type: 'text', required: true },
      { key: 'date_vente', label: "Date de la transaction", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENTE DE PIECES DE COLLECTION</h1>
<p><strong>Vendeur/Createur :</strong> {{createur_vendeur}} | <strong>Acheteur :</strong> {{acheteur_collection}}</p>
<h2>Article 1 - Objet de la Vente</h2>
<p>Le createur cede a l acheteur la piece de collection suivante : {{description_piece}}.</p>
<h2>Article 2 - Prix</h2>
<p>Le prix de vente est fixe a {{prix_vente}} FCFA, payable integralement a la signature du present accord, le {{date_vente}}.</p>
<h2>Article 3 - Authenticite</h2>
<p>Le createur certifie que la piece est originale, de sa creation, et remet un certificat d authenticite a l acheteur.</p>
<h2>Article 4 - Transfert de Propriete</h2>
<p>Le transfert de propriete intervient apres paiement integral du prix convenu.</p></div>`,
  },
  {
    code: 'text_artisan_tailleur',
    name: "Contrat de Service d Artisan-Tailleur",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Contrat entre un artisan tailleur et un client pour la realisation sur mesure de vetements traditionnels ou contemporains.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'client_tailleur', label: "Nom du client", type: 'text', required: true },
      { key: 'tailleur_nom', label: "Nom de l artisan tailleur", type: 'text', required: true },
      { key: 'description_vetement', label: "Description du vetement a confectionner", type: 'textarea', required: true },
      { key: 'tissu_fourni', label: "Tissu fourni par (client/tailleur)", type: 'text', required: true },
      { key: 'prix_confection', label: "Prix de confection (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D ARTISAN-TAILLEUR</h1>
<p><strong>Client :</strong> {{client_tailleur}} | <strong>Tailleur :</strong> {{tailleur_nom}}</p>
<h2>Article 1 - Description</h2>
<p>Le tailleur s engage a confectionner le vetement suivant : {{description_vetement}}. Le tissu est fourni par : {{tissu_fourni}}.</p>
<h2>Article 2 - Prix et Paiement</h2>
<p>Le prix de confection est de {{prix_confection}} FCFA. Un acompte de 50% est verse avant la prise de mesures.</p>
<h2>Article 3 - Essayages</h2>
<p>Deux essayages sont inclus dans la prestation. Les retouches mineures post-livraison sont effectuees gratuitement dans les 7 jours.</p>
<h2>Article 4 - Delai</h2>
<p>Le vetement sera pret dans le delai convenu oralement lors de la commande.</p></div>`,
  },
  {
    code: 'text_cooperative_couturieres',
    name: "Accord de Cooperative de Couturieres",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 11000,
    description: "Accord constitutif ou de fonctionnement d une cooperative de couturieres regroupant des artisanes du secteur de la couture.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'cooperative_nom', label: "Denomination de la cooperative", type: 'text', required: true },
      { key: 'siege_social', label: "Siege social de la cooperative", type: 'text', required: true },
      { key: 'nombre_membres', label: "Nombre de membres fondateurs", type: 'text', required: true },
      { key: 'apport_membre', label: "Apport par membre (FCFA)", type: 'text', required: true },
      { key: 'date_creation', label: "Date de creation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPERATIVE DE COUTURIERES</h1>
<p><strong>Denomination :</strong> {{cooperative_nom}} | <strong>Siege :</strong> {{siege_social}}</p>
<h2>Article 1 - Constitution</h2>
<p>Les {{nombre_membres}} couturieres soussignees s accordent pour creer la cooperative dénommée {{cooperative_nom}}, avec effet au {{date_creation}}.</p>
<h2>Article 2 - Apports</h2>
<p>Chaque membre effectue un apport de {{apport_membre}} FCFA constitutif du capital social de la cooperative.</p>
<h2>Article 3 - Gouvernance</h2>
<p>La cooperative est dirigee par un bureau elu incluant une presidente, une secretaire et une tresoriere.</p>
<h2>Article 4 - Partage des Benefices</h2>
<p>Les benefices nets sont repartis equitablement entre les membres selon leur contribution au chiffre d affaires annuel.</p></div>`,
  },
  {
    code: 'text_charte_mode_durable',
    name: "Charte de Mode Durable Africaine",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Charte d engagement pour une mode durable, responsable et ethique respectant les valeurs africaines et l environnement.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'entreprise_mode', label: "Nom de l entreprise signataire", type: 'text', required: true },
      { key: 'representant', label: "Nom du representant legal", type: 'text', required: true },
      { key: 'engagements_specifiques', label: "Engagements specifiques de l entreprise", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature de la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE MODE DURABLE AFRICAINE</h1>
<p>L entreprise <strong>{{entreprise_mode}}</strong>, representee par <strong>{{representant}}</strong>, soussignee, s engage solennellement en faveur d une mode durable, responsable et ancrée dans les valeurs culturelles africaines.</p>
<h2>Engagement 1 - Matieres Durables</h2>
<p>Privilegier les fibres naturelles, les teintures vegetales et les matieres recyclee ou issues du commerce equitable.</p>
<h2>Engagement 2 - Production Ethique</h2>
<p>Garantir des conditions de travail dignes a tous les artisans et ouvriers de la chaine de production.</p>
<h2>Engagement 3 - Heritage Culturel</h2>
<p>Valoriser et proteger les techniques artisanales traditionnelles africaines.</p>
<h2>Engagements Specifiques</h2>
<p>{{engagements_specifiques}}</p>
<p>Fait a Abidjan, le {{date_signature}}</p>
<p>Signature et cachet</p></div>`,
  },

  // ===== ARTISANAT / ECONOMIE CREATIVE (25 templates) =====
  {
    code: 'artis_artisan_certifie',
    name: "Contrat d Artisan Certifie",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de certification d un artisan par un organisme professionnel en Cote d Ivoire, attestant de ses competences et qualifications.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'organisme_certification', label: "Nom de l organisme certificateur", type: 'text', required: true },
      { key: 'artisan_nom', label: "Nom et prenom de l artisan", type: 'text', required: true },
      { key: 'metier_artisan', label: "Metier artisanal exerce", type: 'text', required: true },
      { key: 'niveau_certification', label: "Niveau de certification obtenu", type: 'text', required: true },
      { key: 'date_certification', label: "Date de certification", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CERTIFICATION D ARTISAN</h1>
<p><strong>Organisme :</strong> {{organisme_certification}} | <strong>Artisan :</strong> {{artisan_nom}}</p>
<h2>Article 1 - Certification</h2>
<p>L organisme certifie que l artisan {{artisan_nom}}, exerçant le metier de {{metier_artisan}}, satisfait aux criteres de competences et de qualite requis pour le niveau : {{niveau_certification}}.</p>
<h2>Article 2 - Date et Validite</h2>
<p>La certification est delivree le {{date_certification}} et est valable 3 ans, sous reserve de renouvellement periodique.</p>
<h2>Article 3 - Obligations de l Artisan</h2>
<p>L artisan s engage a maintenir ses competences, a respecter le code de deontologie de sa profession et a participer aux formations continues.</p>
<h2>Article 4 - Usage de la Marque</h2>
<p>L artisan est autorise a utiliser le label de certification de l organisme sur ses supports professionnels.</p></div>`,
  },
  {
    code: 'artis_boutique_artisanat',
    name: "Accord de Boutique d Artisanat",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10000,
    description: "Accord commercial entre des artisans producteurs et une boutique d artisanat pour la mise en vente de leurs creations.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'boutique_nom', label: "Nom de la boutique d artisanat", type: 'text', required: true },
      { key: 'artisan_fournisseur', label: "Nom de l artisan fournisseur", type: 'text', required: true },
      { key: 'produits_deposes', label: "Description des produits deposes", type: 'textarea', required: true },
      { key: 'commission_boutique', label: "Commission de la boutique (%)", type: 'text', required: true },
      { key: 'duree_depot', label: "Duree du depot en boutique", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE BOUTIQUE D ARTISANAT - DEPOT-VENTE</h1>
<p><strong>Boutique :</strong> {{boutique_nom}} | <strong>Artisan :</strong> {{artisan_fournisseur}}</p>
<h2>Article 1 - Depot en Consignation</h2>
<p>L artisan depose en consignation dans la boutique les produits suivants : {{produits_deposes}}.</p>
<h2>Article 2 - Commission</h2>
<p>La boutique retient une commission de {{commission_boutique}}% sur chaque vente realisee. L artisan percoit le solde dans les 15 jours suivant la vente.</p>
<h2>Article 3 - Duree</h2>
<p>Le present depot est consenti pour une duree de {{duree_depot}}, renouvelable par tacite reconduction.</p>
<h2>Article 4 - Responsabilite</h2>
<p>La boutique prend soin des oeuvres deposees et est responsable de tout dommage survenu dans ses locaux.</p></div>`,
  },
  {
    code: 'artis_vente_oeuvres_art',
    name: "Contrat de Vente d Oeuvres d Art Artisanal",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de vente d une oeuvre d art artisanale originale entre un artisan createur et un acheteur, avec certificat d authenticite.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'artisan_createur', label: "Nom de l artisan createur", type: 'text', required: true },
      { key: 'acheteur_art', label: "Nom de l acheteur", type: 'text', required: true },
      { key: 'description_oeuvre', label: "Description detaillee de l oeuvre", type: 'textarea', required: true },
      { key: 'prix_oeuvre', label: "Prix de l oeuvre (FCFA)", type: 'text', required: true },
      { key: 'date_vente', label: "Date de la vente", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE D OEUVRE D ART ARTISANAL</h1>
<p><strong>Artisan/Vendeur :</strong> {{artisan_createur}} | <strong>Acheteur :</strong> {{acheteur_art}}</p>
<h2>Article 1 - Objet</h2>
<p>L artisan cede a l acheteur l oeuvre suivante : {{description_oeuvre}}, pour le prix de {{prix_oeuvre}} FCFA.</p>
<h2>Article 2 - Authenticite</h2>
<p>L artisan certifie que l oeuvre est de sa creation, originale et unique. Un certificat d authenticite numerote est remis a l acheteur.</p>
<h2>Article 3 - Droits d Auteur</h2>
<p>La vente porte sur l oeuvre physique uniquement. Les droits d auteur et droits de reproduction restent la propriete de l artisan.</p>
<h2>Article 4 - Paiement</h2>
<p>Le prix est regle integralement le {{date_vente}}. Le transfert de propriete intervient apres paiement integral.</p></div>`,
  },
  {
    code: 'artis_representation_agent',
    name: "Accord de Representation d Artisan (Agent Commercial)",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10000,
    description: "Accord par lequel un agent commercial est mandate pour representer et commercialiser les oeuvres d un artisan sur un territoire donne.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'artisan_mandant', label: "Nom de l artisan mandant", type: 'text', required: true },
      { key: 'agent_commercial', label: "Nom de l agent commercial", type: 'text', required: true },
      { key: 'territoire_agent', label: "Territoire de representation", type: 'text', required: true },
      { key: 'commission_agent', label: "Taux de commission de l agent (%)", type: 'text', required: true },
      { key: 'date_debut_mandat', label: "Date de prise d effet du mandat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE REPRESENTATION D ARTISAN - AGENT COMMERCIAL</h1>
<p><strong>Artisan :</strong> {{artisan_mandant}} | <strong>Agent :</strong> {{agent_commercial}}</p>
<h2>Article 1 - Mandat</h2>
<p>L artisan confie a l agent le mandat non-exclusif de representer et vendre ses creations sur le territoire : {{territoire_agent}}, a compter du {{date_debut_mandat}}.</p>
<h2>Article 2 - Commission</h2>
<p>L agent percevra une commission de {{commission_agent}}% sur chaque vente conclue. La commission est exigible apres paiement integral par le client final.</p>
<h2>Article 3 - Obligations de l Agent</h2>
<p>L agent s engage a promouvoir activement les oeuvres, a rendre compte mensuellement des demarches effectuees et a ne pas alterer les prix fixes par l artisan.</p></div>`,
  },
  {
    code: 'artis_sculpture_marqueterie',
    name: "Contrat de Service de Sculpture/Marqueterie",
    category: 'commercial_financier',
    price: 4500,
    priceMax: 13000,
    description: "Contrat de commande d une oeuvre de sculpture ou de marqueterie entre un artiste artisan et un client particulier ou institutionnel.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'client_sculpture', label: "Nom du client", type: 'text', required: true },
      { key: 'sculpteur_nom', label: "Nom du sculpteur/marqueteur", type: 'text', required: true },
      { key: 'description_oeuvre', label: "Description de l oeuvre commandee", type: 'textarea', required: true },
      { key: 'materiau', label: "Materiau utilise (bois, pierre, metal...)", type: 'text', required: true },
      { key: 'prix_commande', label: "Prix de la commande (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE SCULPTURE / MARQUETERIE</h1>
<p><strong>Client :</strong> {{client_sculpture}} | <strong>Artisan :</strong> {{sculpteur_nom}}</p>
<h2>Article 1 - Commande</h2>
<p>L artisan s engage a realiser l oeuvre suivante : {{description_oeuvre}}, en utilisant le materiau : {{materiau}}.</p>
<h2>Article 2 - Prix</h2>
<p>Le prix convenu est de {{prix_commande}} FCFA, avec un acompte de 50% a la commande et le solde a la livraison.</p>
<h2>Article 3 - Creation Originale</h2>
<p>L oeuvre est une creation originale de l artisan, realisee selon les specifications du client. Aucune reproduction ne pourra etre faite sans accord.</p></div>`,
  },
  {
    code: 'artis_bijouterie_joaillerie',
    name: "Accord de Service de Bijouterie-Joaillerie Artisanale",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Accord de commande de bijoux ou de joaillerie artisanale entre un bijoutier artisan et un client pour des creations sur mesure.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'client_bijou', label: "Nom du client", type: 'text', required: true },
      { key: 'bijoutier_nom', label: "Nom du bijoutier artisan", type: 'text', required: true },
      { key: 'description_bijou', label: "Description du bijou commande", type: 'textarea', required: true },
      { key: 'materiaux_precious', label: "Materiaux et pierres utilises", type: 'text', required: true },
      { key: 'prix_bijou', label: "Prix de la creation (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BIJOUTERIE-JOAILLERIE ARTISANALE</h1>
<p><strong>Client :</strong> {{client_bijou}} | <strong>Bijoutier :</strong> {{bijoutier_nom}}</p>
<h2>Article 1 - Creation sur Mesure</h2>
<p>Le bijoutier s engage a realiser : {{description_bijou}}, en utilisant les materiaux suivants : {{materiaux_precious}}.</p>
<h2>Article 2 - Prix</h2>
<p>Le prix total est de {{prix_bijou}} FCFA. Un acompte de 40% couvre les matieres premieres et sera verse avant le lancement de la creation.</p>
<h2>Article 3 - Garantie</h2>
<p>Le bijoutier garantit ses creations contre les defauts de fabrication pour une duree de 6 mois apres livraison.</p>
<h2>Article 4 - Authenticite</h2>
<p>Un certificat attestant la nature et la qualite des materiaux utilises est fourni avec le bijou.</p></div>`,
  },
  {
    code: 'artis_poterie_ceramique',
    name: "Contrat de Service de Poterie/Ceramique",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Contrat de commande de poteries ou ceramiques artisanales entre un artisan potier et un client pour des usages decoratifs ou utilitaires.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'client_poterie', label: "Nom du client", type: 'text', required: true },
      { key: 'potier_nom', label: "Nom de l artisan potier", type: 'text', required: true },
      { key: 'description_pieces', label: "Description des pieces commandees", type: 'textarea', required: true },
      { key: 'quantite_poterie', label: "Quantite de pieces", type: 'text', required: true },
      { key: 'prix_total', label: "Prix total (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE POTERIE / CERAMIQUE</h1>
<p><strong>Client :</strong> {{client_poterie}} | <strong>Potier :</strong> {{potier_nom}}</p>
<h2>Article 1 - Commande</h2>
<p>Le potier s engage a fabriquer les pieces suivantes : {{description_pieces}}, en quantite de {{quantite_poterie}} unites.</p>
<h2>Article 2 - Prix</h2>
<p>Le prix total est de {{prix_total}} FCFA, payable moitie a la commande, moitie a la livraison.</p>
<h2>Article 3 - Caracteristiques</h2>
<p>Les pieces seront realisees selon les techniques artisanales traditionnelles ivoiriennes. De legeres variations dans les dimensions et couleurs sont inherentes au caractere artisanal.</p></div>`,
  },
  {
    code: 'artis_vannerie_osier',
    name: "Accord de Service de Vannerie/Osier",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 7000,
    description: "Accord de commande d articles de vannerie ou de travaux en osier entre un artisan vannier et un client.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'client_vannerie', label: "Nom du client", type: 'text', required: true },
      { key: 'vannier_nom', label: "Nom de l artisan vannier", type: 'text', required: true },
      { key: 'articles_commandes', label: "Articles a realiser", type: 'textarea', required: true },
      { key: 'materiaux_vannerie', label: "Matieres premieres utilisees", type: 'text', required: true },
      { key: 'prix_commande', label: "Prix de la commande (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VANNERIE / OSIER</h1>
<p><strong>Client :</strong> {{client_vannerie}} | <strong>Artisan :</strong> {{vannier_nom}}</p>
<h2>Article 1 - Commande</h2>
<p>L artisan vannier s engage a realiser les articles suivants : {{articles_commandes}}, en utilisant les matieres : {{materiaux_vannerie}}.</p>
<h2>Article 2 - Prix et Acompte</h2>
<p>Le prix global est de {{prix_commande}} FCFA. Un acompte de 30% est verse a la commande.</p>
<h2>Article 3 - Qualite</h2>
<p>L artisan garantit la solidite et la finition des articles. Les produits sont realises selon les techniques traditionnelles africaines.</p></div>`,
  },
  {
    code: 'artis_menuiserie_artisanale',
    name: "Contrat de Service de Menuiserie Artisanale",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat entre un artisan menuisier et un client pour la realisation de meubles ou objets en bois sur mesure.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'client_menuiserie', label: "Nom du client", type: 'text', required: true },
      { key: 'menuisier_nom', label: "Nom du menuisier artisan", type: 'text', required: true },
      { key: 'description_meuble', label: "Description du meuble ou objet a realiser", type: 'textarea', required: true },
      { key: 'essence_bois', label: "Essence de bois utilisee", type: 'text', required: true },
      { key: 'prix_menuiserie', label: "Prix convenu (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE MENUISERIE ARTISANALE</h1>
<p><strong>Client :</strong> {{client_menuiserie}} | <strong>Menuisier :</strong> {{menuisier_nom}}</p>
<h2>Article 1 - Objet</h2>
<p>Le menuisier s engage a realiser : {{description_meuble}}, en bois de type {{essence_bois}}.</p>
<h2>Article 2 - Prix</h2>
<p>Le prix est fixe a {{prix_menuiserie}} FCFA, incluant materiaux et main d oeuvre. Acompte de 40% a la commande.</p>
<h2>Article 3 - Garantie</h2>
<p>Le menuisier garantit ses ouvrages contre les vices de fabrication pour une duree d un an a compter de la livraison.</p></div>`,
  },
  {
    code: 'artis_ferronnerie_artisanale',
    name: "Accord de Service de Ferronnerie Artisanale",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 11000,
    description: "Accord entre un ferronnier artisan et un client pour la realisation d ouvrages en fer forge ou metal travaille.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'client_ferronnerie', label: "Nom du client", type: 'text', required: true },
      { key: 'ferronnier_nom', label: "Nom du ferronnier artisan", type: 'text', required: true },
      { key: 'description_ouvrage', label: "Description de l ouvrage a realiser", type: 'textarea', required: true },
      { key: 'type_metal', label: "Type de metal utilise", type: 'text', required: true },
      { key: 'prix_ferronnerie', label: "Prix de l ouvrage (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FERRONNERIE ARTISANALE</h1>
<p><strong>Client :</strong> {{client_ferronnerie}} | <strong>Ferronnier :</strong> {{ferronnier_nom}}</p>
<h2>Article 1 - Commande</h2>
<p>Le ferronnier realise l ouvrage suivant : {{description_ouvrage}}, en {{type_metal}}, pour le prix de {{prix_ferronnerie}} FCFA.</p>
<h2>Article 2 - Execution</h2>
<p>L ouvrage est realise selon les regles de l art de la ferronnerie artisanale. Le client valide les plans ou croquis avant execution.</p>
<h2>Article 3 - Pose et Garantie</h2>
<p>La pose est incluse dans le prix convenu. Le ferronnier garantit l ouvrage contre les defauts de fabrication pendant 2 ans.</p></div>`,
  },
  {
    code: 'artis_maroquinerie_artisanale',
    name: "Contrat de Service de Maroquinerie Artisanale",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10000,
    description: "Contrat de commande d articles de maroquinerie artisanale (sacs, ceintures, portefeuilles) entre un maroquinier et un client.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'client_maroquinerie', label: "Nom du client", type: 'text', required: true },
      { key: 'maroquinier_nom', label: "Nom de l artisan maroquinier", type: 'text', required: true },
      { key: 'articles_cuir', label: "Articles en cuir a realiser", type: 'textarea', required: true },
      { key: 'type_cuir', label: "Type et qualite du cuir", type: 'text', required: true },
      { key: 'prix_articles', label: "Prix total des articles (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE MAROQUINERIE ARTISANALE</h1>
<p><strong>Client :</strong> {{client_maroquinerie}} | <strong>Maroquinier :</strong> {{maroquinier_nom}}</p>
<h2>Article 1 - Commande</h2>
<p>Le maroquinier s engage a realiser les articles suivants : {{articles_cuir}}, en cuir de type : {{type_cuir}}.</p>
<h2>Article 2 - Prix</h2>
<p>Le prix total est de {{prix_articles}} FCFA. La facturation intervient apres livraison et verification par le client.</p>
<h2>Article 3 - Qualite du Cuir</h2>
<p>Le maroquinier certifie utiliser un cuir authentique de la qualite convenue. Un echantillon du cuir est valide par le client avant fabrication.</p></div>`,
  },
  {
    code: 'artis_perlage_traditionnel',
    name: "Accord de Service de Perlage Traditionnel",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Accord pour la realisation d ouvrages de perlage traditionnel africain : bijoux, ornements, coiffes ceremoniales.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'client_perlage', label: "Nom du client", type: 'text', required: true },
      { key: 'artisan_perlage', label: "Nom de l artisan perler", type: 'text', required: true },
      { key: 'description_perlage', label: "Description de l ouvrage a perler", type: 'textarea', required: true },
      { key: 'type_perles', label: "Type de perles utilisees", type: 'text', required: true },
      { key: 'prix_perlage', label: "Prix de la creation (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PERLAGE TRADITIONNEL</h1>
<p><strong>Client :</strong> {{client_perlage}} | <strong>Artisan :</strong> {{artisan_perlage}}</p>
<h2>Article 1 - Commande</h2>
<p>L artisan s engage a realiser l ouvrage de perlage suivant : {{description_perlage}}, en utilisant des perles de type : {{type_perles}}.</p>
<h2>Article 2 - Prix</h2>
<p>Le prix convenu est de {{prix_perlage}} FCFA, incluant matieres et main d oeuvre artisanale.</p>
<h2>Article 3 - Heritage Culturel</h2>
<p>Les ouvrages de perlage sont realises selon les techniques traditionnelles transmises de generation en generation.</p></div>`,
  },
  {
    code: 'artis_peinture_soie_wax',
    name: "Contrat de Service de Peinture sur Soie/Wax",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10000,
    description: "Contrat de creation artistique de peinture sur soie ou tissu wax entre un artiste peintre textile et un client.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'client_peinture_textile', label: "Nom du client", type: 'text', required: true },
      { key: 'artiste_peintre', label: "Nom de l artiste peintre textile", type: 'text', required: true },
      { key: 'description_creation', label: "Description de la creation souhaitee", type: 'textarea', required: true },
      { key: 'support_textile', label: "Type de support (soie/wax/coton)", type: 'text', required: true },
      { key: 'prix_creation', label: "Prix de la creation (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE PEINTURE SUR SOIE / WAX</h1>
<p><strong>Client :</strong> {{client_peinture_textile}} | <strong>Artiste :</strong> {{artiste_peintre}}</p>
<h2>Article 1 - Creation</h2>
<p>L artiste s engage a realiser la creation suivante : {{description_creation}}, sur support {{support_textile}}.</p>
<h2>Article 2 - Prix</h2>
<p>Le prix de la creation est de {{prix_creation}} FCFA, payable 50% a la validation du projet, 50% a la livraison.</p>
<h2>Article 3 - Droits</h2>
<p>La creation physique est cedee au client. L artiste se reserve le droit de photographier l oeuvre pour son portfolio.</p></div>`,
  },
  {
    code: 'artis_decoration_raphia',
    name: "Accord de Service de Decoration en Raphia",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Accord pour la realisation de decorations, objets et creations artisanales en raphia pour l evenementiel ou la decoration interieure.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'client_raphia', label: "Nom du client", type: 'text', required: true },
      { key: 'artisan_raphia', label: "Nom de l artisan raphia", type: 'text', required: true },
      { key: 'description_decoration', label: "Description des decorations a realiser", type: 'textarea', required: true },
      { key: 'quantite_raphia', label: "Quantite ou surface a decorer", type: 'text', required: true },
      { key: 'prix_raphia', label: "Prix de la prestation (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DECORATION EN RAPHIA</h1>
<p><strong>Client :</strong> {{client_raphia}} | <strong>Artisan :</strong> {{artisan_raphia}}</p>
<h2>Article 1 - Prestation</h2>
<p>L artisan realise les decorations en raphia suivantes : {{description_decoration}}, pour une quantite/surface de {{quantite_raphia}}.</p>
<h2>Article 2 - Prix</h2>
<p>Le prix de la prestation est de {{prix_raphia}} FCFA, materiaux inclus.</p>
<h2>Article 3 - Installation</h2>
<p>L installation des decorations est assuree par l artisan sur le site du client dans les delais convenus.</p></div>`,
  },
  {
    code: 'artis_masques_traditionnels',
    name: "Contrat de Fabrication de Masques Traditionnels",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de commande de masques traditionnels africains entre un sculpteur artisan et un client collecteur ou institutionnel.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'client_masque', label: "Nom du client", type: 'text', required: true },
      { key: 'sculpteur_masque', label: "Nom du sculpteur", type: 'text', required: true },
      { key: 'description_masque', label: "Description et tradition du masque", type: 'textarea', required: true },
      { key: 'materiau_masque', label: "Materiau principal (bois, metal...)", type: 'text', required: true },
      { key: 'prix_masque', label: "Prix par masque (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FABRICATION DE MASQUES TRADITIONNELS</h1>
<p><strong>Client :</strong> {{client_masque}} | <strong>Sculpteur :</strong> {{sculpteur_masque}}</p>
<h2>Article 1 - Commande</h2>
<p>Le sculpteur s engage a realiser le masque traditionnel suivant : {{description_masque}}, en utilisant : {{materiau_masque}}.</p>
<h2>Article 2 - Prix</h2>
<p>Le prix est de {{prix_masque}} FCFA par masque, acompte de 50% a la commande.</p>
<h2>Article 3 - Authenticite Culturelle</h2>
<p>Le sculpteur certifie que les masques sont realises selon les traditions ancestrales africaines et n ont pas de caractere sacre contraignant.</p>
<h2>Article 4 - Propriete et Usage</h2>
<p>Le client est libre d utiliser les masques acquis a des fins decoratives, museales ou de collection privee.</p></div>`,
  },
  {
    code: 'artis_sculpture_bois',
    name: "Accord de Service de Sculpture sur Bois",
    category: 'commercial_financier',
    price: 4500,
    priceMax: 13000,
    description: "Accord entre un sculpteur sur bois et un client pour la realisation d une oeuvre sculptee sur commande.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'client_sculpture_bois', label: "Nom du client", type: 'text', required: true },
      { key: 'sculpteur_bois', label: "Nom du sculpteur sur bois", type: 'text', required: true },
      { key: 'description_sculpture', label: "Description de la sculpture souhaitee", type: 'textarea', required: true },
      { key: 'dimensions', label: "Dimensions approximatives", type: 'text', required: true },
      { key: 'prix_sculpture', label: "Prix de la sculpture (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SCULPTURE SUR BOIS</h1>
<p><strong>Client :</strong> {{client_sculpture_bois}} | <strong>Sculpteur :</strong> {{sculpteur_bois}}</p>
<h2>Article 1 - Commande</h2>
<p>Le sculpteur realise l oeuvre suivante : {{description_sculpture}}, aux dimensions de {{dimensions}}.</p>
<h2>Article 2 - Prix</h2>
<p>Le prix convenu est de {{prix_sculpture}} FCFA. Modalites de paiement : 50% a la commande, 50% a la livraison.</p>
<h2>Article 3 - Suivi</h2>
<p>Le client peut demander une visite d atelier a mi-parcours pour valider l avancement de l oeuvre.</p></div>`,
  },
  {
    code: 'artis_ebenisterie_traditionnelle',
    name: "Contrat de Service d Ebenisterie Traditionnelle",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de commande de meubles ou objets decoratifs d ebenisterie traditionnelle africaine entre un ébéniste et un client.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'client_ebenisterie', label: "Nom du client", type: 'text', required: true },
      { key: 'ebeniste_nom', label: "Nom de l ebeniste", type: 'text', required: true },
      { key: 'description_meuble_art', label: "Description du meuble ou objet", type: 'textarea', required: true },
      { key: 'essence_precieuse', label: "Essence de bois precieux utilise", type: 'text', required: true },
      { key: 'prix_ebenisterie', label: "Prix de la commande (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D EBENISTERIE TRADITIONNELLE</h1>
<p><strong>Client :</strong> {{client_ebenisterie}} | <strong>Ebeniste :</strong> {{ebeniste_nom}}</p>
<h2>Article 1 - Commande</h2>
<p>L ebeniste s engage a realiser : {{description_meuble_art}}, en bois precieux de type : {{essence_precieuse}}.</p>
<h2>Article 2 - Savoir-Faire</h2>
<p>L ouvrage est realise selon les techniques de l ebenisterie traditionnelle africaine, avec assemblages tenons-mortaises et finitions a la main.</p>
<h2>Article 3 - Prix</h2>
<p>Le prix est de {{prix_ebenisterie}} FCFA, acompte de 40% a la commande, solde a la reception.</p></div>`,
  },
  {
    code: 'artis_label_artisanat_ivoirien',
    name: "Accord de Label Artisanat Ivoirien",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 11000,
    description: "Accord de certification et d attribution du label Artisanat Ivoirien a un artisan ou une entreprise artisanale par un organisme habilite.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'organisme_artisanat', label: "Nom de l organisme de certification", type: 'text', required: true },
      { key: 'artisan_labellise', label: "Nom de l artisan ou entreprise", type: 'text', required: true },
      { key: 'produits_artisanat', label: "Produits concernes par le label", type: 'textarea', required: true },
      { key: 'criteres_label', label: "Criteres de labelisation remplis", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LABEL ARTISANAT IVOIRIEN</h1>
<p><strong>Organisme :</strong> {{organisme_artisanat}} | <strong>Beneficiaire :</strong> {{artisan_labellise}}</p>
<h2>Article 1 - Attribution</h2>
<p>Le label Artisanat Ivoirien est attribue pour les produits suivants : {{produits_artisanat}}.</p>
<h2>Article 2 - Criteres</h2>
<p>Le beneficiaire repond aux criteres suivants : {{criteres_label}}.</p>
<h2>Article 3 - Maintien</h2>
<p>Le label est renouvelable annuellement apres audit de verification. Tout manquement aux criteres entraine le retrait immediat du label.</p>
<h2>Article 4 - Promotion</h2>
<p>L organisme s engage a promouvoir les produits labellises lors des foires, salons et evenements nationaux et internationaux.</p></div>`,
  },
  {
    code: 'artis_rapport_performance_atelier',
    name: "Rapport de Performance Atelier Artisanal",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 7000,
    description: "Rapport d analyse des performances d un atelier artisanal : production, chiffre d affaires, emploi et perspectives.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'atelier_artisanal', label: "Nom de l atelier artisanal", type: 'text', required: true },
      { key: 'periode_rapport', label: "Periode du rapport", type: 'text', required: true },
      { key: 'production_realisee', label: "Volume de production realise", type: 'text', required: true },
      { key: 'ca_artisanal', label: "Chiffre d affaires artisanal (FCFA)", type: 'text', required: true },
      { key: 'nombre_employes', label: "Nombre d employes / apprentis", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE - ATELIER ARTISANAL</h1>
<p><strong>Atelier :</strong> {{atelier_artisanal}} | <strong>Periode :</strong> {{periode_rapport}}</p>
<h2>1. Production</h2>
<p>Volume de production realise : {{production_realisee}}</p>
<h2>2. Performance Commerciale</h2>
<p>Chiffre d affaires : {{ca_artisanal}} FCFA</p>
<h2>3. Ressources Humaines</h2>
<p>Effectif : {{nombre_employes}} personnes (employes et apprentis)</p>
<h2>4. Perspectives</h2>
<p>Identification des opportunites de developpement, besoins en formation et investissements a envisager pour la periode suivante.</p></div>`,
  },
  {
    code: 'artis_convention_village_artisanal',
    name: "Convention de Village Artisanal",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 14000,
    description: "Convention de creation et de gestion d un village artisanal regroupant plusieurs artisans sous une organisation collective.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'village_artisanal_nom', label: "Denomination du village artisanal", type: 'text', required: true },
      { key: 'localisation_village', label: "Localisation du village", type: 'text', required: true },
      { key: 'structure_gestion', label: "Structure de gestion du village", type: 'text', required: true },
      { key: 'nombre_artisans', label: "Nombre d artisans membres", type: 'text', required: true },
      { key: 'date_convention', label: "Date de signature de la convention", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE VILLAGE ARTISANAL</h1>
<p><strong>Village :</strong> {{village_artisanal_nom}} | <strong>Localisation :</strong> {{localisation_village}}</p>
<h2>Article 1 - Constitution</h2>
<p>La presente convention organise le fonctionnement du village artisanal regroup {{nombre_artisans}} artisans membres, signe le {{date_convention}}.</p>
<h2>Article 2 - Gouvernance</h2>
<p>Le village est gere par : {{structure_gestion}}, responsable de la coordination, de la promotion collective et de la gestion des infrastructures communes.</p>
<h2>Article 3 - Obligations des Membres</h2>
<p>Chaque artisan s engage a exercer son activite dans le village, a contribuer aux charges collectives et a respecter le reglement interieur.</p>
<h2>Article 4 - Promotion</h2>
<p>Une strategie de promotion commune est elaboree pour attirer les visiteurs, touristes et acheteurs professionnels.</p></div>`,
  },
  {
    code: 'artis_cooperative_artisanale',
    name: "Accord de Cooperative Artisanale",
    category: 'commercial_financier',
    price: 4500,
    priceMax: 13000,
    description: "Accord de creation ou d adhesion a une cooperative artisanale regissant les droits et obligations des artisans membres.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'cooperative_artisan_nom', label: "Denomination de la cooperative", type: 'text', required: true },
      { key: 'siege_cooperative', label: "Siege social", type: 'text', required: true },
      { key: 'specialite_artisanale', label: "Specialite artisanale de la cooperative", type: 'text', required: true },
      { key: 'capital_social', label: "Capital social initial (FCFA)", type: 'text', required: true },
      { key: 'date_fondation', label: "Date de fondation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPERATIVE ARTISANALE</h1>
<p><strong>Cooperative :</strong> {{cooperative_artisan_nom}} | <strong>Siege :</strong> {{siege_cooperative}}</p>
<h2>Article 1 - Objet et Specialite</h2>
<p>La cooperative regroupe des artisans specialises en {{specialite_artisanale}} pour le developpement collectif de leur activite.</p>
<h2>Article 2 - Capital</h2>
<p>Le capital social est constitue d un apport initial de {{capital_social}} FCFA reparti equitablement entre les membres fondateurs.</p>
<h2>Article 3 - Avantages Mutuels</h2>
<p>Les membres beneficient d achats groupes de matieres premieres, de la mutualisation des couts de promotion et d un acces facilite aux marches publics.</p>
<h2>Article 4 - Date de Creation</h2>
<p>La cooperative est creee le {{date_fondation}} conformement aux dispositions de l OHADA sur les cooperatives.</p></div>`,
  },
  {
    code: 'artis_formation_apprenti',
    name: "Contrat de Formation Apprenti Artisan",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Contrat d apprentissage entre un maitre artisan et un apprenti pour la transmission d un savoir-faire artisanal traditionnel.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'maitre_artisan', label: "Nom du maitre artisan", type: 'text', required: true },
      { key: 'apprenti_nom', label: "Nom et prenom de l apprenti", type: 'text', required: true },
      { key: 'metier_apprentissage', label: "Metier artisanal enseigne", type: 'text', required: true },
      { key: 'duree_apprentissage', label: "Duree de l apprentissage", type: 'text', required: true },
      { key: 'date_debut', label: "Date de debut", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FORMATION - APPRENTI ARTISAN</h1>
<p><strong>Maitre artisan :</strong> {{maitre_artisan}} | <strong>Apprenti :</strong> {{apprenti_nom}}</p>
<h2>Article 1 - Objet</h2>
<p>Le maitre artisan s engage a former l apprenti au metier de {{metier_apprentissage}} pour une duree de {{duree_apprentissage}}, a compter du {{date_debut}}.</p>
<h2>Article 2 - Enseignement</h2>
<p>La formation comprend les aspects theoriques et pratiques du metier, transmis progressivement selon un programme defini d un commun accord.</p>
<h2>Article 3 - Obligations de l Apprenti</h2>
<p>L apprenti s engage a etre assidu, respectueux, a appliquer les consignes du maitre et a ne pas exercer concurrence dans la zone d activite pendant la formation.</p>
<h2>Article 4 - Remuneration</h2>
<p>L apprenti perçoit une allocation mensuelle symbolique de participation, definie separement par accord oral.</p></div>`,
  },
  {
    code: 'artis_foire_artisanale',
    name: "Accord de Participation Foire Artisanale",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 7000,
    description: "Accord encadrant la participation d un artisan ou d une cooperative a une foire ou salon artisanal national ou international.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'organisateur_foire', label: "Nom de l organisateur de la foire", type: 'text', required: true },
      { key: 'artisan_exposant', label: "Nom de l artisan exposant", type: 'text', required: true },
      { key: 'foire_denomination', label: "Denomination de la foire", type: 'text', required: true },
      { key: 'date_foire', label: "Dates de la foire", type: 'date', required: true },
      { key: 'frais_participation', label: "Frais de participation (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTICIPATION - FOIRE ARTISANALE</h1>
<p><strong>Organisateur :</strong> {{organisateur_foire}} | <strong>Exposant :</strong> {{artisan_exposant}}</p>
<h2>Article 1 - Participation</h2>
<p>L artisan est admis a participer a la foire <strong>{{foire_denomination}}</strong>, qui se tient le {{date_foire}}.</p>
<h2>Article 2 - Stand et Frais</h2>
<p>L organisateur attribue un espace d exposition a l artisan. Les frais de participation sont de {{frais_participation}} FCFA, incluant le stand et la communication generale.</p>
<h2>Article 3 - Obligations de l Exposant</h2>
<p>L artisan s engage a tenir son stand pendant toute la duree de la foire, a presenter des produits artisanaux de qualite et a respecter le reglement interieur.</p></div>`,
  },
  {
    code: 'artis_commerce_equitable',
    name: "Contrat de Service de Commerce Equitable Artisanal",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 11000,
    description: "Contrat encadrant la commercialisation de produits artisanaux dans le cadre du commerce equitable entre producteurs et distributeurs.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'organisation_equitable', label: "Nom de l organisation de commerce equitable", type: 'text', required: true },
      { key: 'groupement_artisans', label: "Nom du groupement d artisans", type: 'text', required: true },
      { key: 'produits_equitables', label: "Produits artisanaux concernes", type: 'textarea', required: true },
      { key: 'prix_plancher', label: "Prix plancher garanti (FCFA/unite)", type: 'text', required: true },
      { key: 'date_accord', label: "Date de l accord", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMMERCE EQUITABLE ARTISANAL</h1>
<p><strong>Organisation :</strong> {{organisation_equitable}} | <strong>Producteurs :</strong> {{groupement_artisans}}</p>
<h2>Article 1 - Produits Concernes</h2>
<p>Le present accord porte sur les produits artisanaux suivants : {{produits_equitables}}.</p>
<h2>Article 2 - Prix Equitable</h2>
<p>L organisation garantit aux artisans un prix plancher de {{prix_plancher}} FCFA par unite, assure quelle que soit la fluctuation du marche.</p>
<h2>Article 3 - Principes du Commerce Equitable</h2>
<p>L accord respecte les principes fondamentaux : prix juste, transparence, soutien au developpement, conditions de travail dignes et respect de l environnement.</p>
<h2>Article 4 - Engagement</h2>
<p>Signe le {{date_accord}}, cet accord est renouvelable annuellement sur evaluation conjointe.</p></div>`,
  },
  {
    code: 'artis_charte_patrimoine',
    name: "Charte de Protection du Patrimoine Artisanal",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10000,
    description: "Charte d engagement pour la protection, la valorisation et la transmission du patrimoine artisanal ivoirien et africain.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'institution_signataire', label: "Nom de l institution ou entreprise signataire", type: 'text', required: true },
      { key: 'representant_charte', label: "Nom du representant", type: 'text', required: true },
      { key: 'domaines_patrimoine', label: "Domaines du patrimoine artisanal couverts", type: 'textarea', required: true },
      { key: 'date_signature_charte', label: "Date de signature de la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE PROTECTION DU PATRIMOINE ARTISANAL</h1>
<p>L institution <strong>{{institution_signataire}}</strong>, representee par <strong>{{representant_charte}}</strong>, s engage solennellement a proteger et valoriser le patrimoine artisanal africain, notamment dans les domaines suivants : {{domaines_patrimoine}}.</p>
<h2>Engagement 1 - Preservation des Techniques</h2>
<p>Documenter, preserver et promouvoir les techniques artisanales traditionnelles menacees de disparition.</p>
<h2>Engagement 2 - Formation et Transmission</h2>
<p>Soutenir la formation des jeunes artisans et faciliter la transmission intergenerationnelle des savoir-faire.</p>
<h2>Engagement 3 - Lutte contre la Contrefacon</h2>
<p>Combattre activement la contrefacon et l appropriation culturelle non autorisee des motifs et techniques artisanaux africains.</p>
<h2>Engagement 4 - Valorisation Economique</h2>
<p>Contribuer a la juste remuneration des artisans gardiens du patrimoine culturel.</p>
<p>Signe a Abidjan, le {{date_signature_charte}}</p></div>`,
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
  console.log(`Batch 40a OK — crees:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
