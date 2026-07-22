import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── INDUSTRIE CHIMIQUE (chim2_) ───────────────────────────────────────────
  {
    code: 'chim2_peintures_vernis',
    name: "Accord de service de production de peintures et vernis",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat de sous-traitance pour la production de peintures et vernis industriels ou décoratifs, conforme aux normes OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client_raison_sociale',label:"Raison sociale du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire industriel",type:'text',required:true},
      {key:'type_produit',label:"Type de peinture ou vernis",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel estimé (litres)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de production",type:'date',required:true},
      {key:'lieu_usine',label:"Lieu de l'usine de production",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE PEINTURES ET VERNIS</h1><p>Entre les soussignés :</p><p><strong>Client :</strong> {{client_raison_sociale}}</p><p><strong>Prestataire :</strong> {{prestataire_nom}}</p><h2>Article 1 – Objet</h2><p>Le présent accord a pour objet la production en sous-traitance de {{type_produit}}, pour un volume mensuel estimé de {{volume_mensuel}} litres, conformément aux spécifications techniques convenues entre les parties.</p><h2>Article 2 – Date d'entrée en vigueur</h2><p>Le présent accord prend effet à compter du {{date_debut}}.</p><h2>Article 3 – Lieu de production</h2><p>La production sera assurée dans les installations situées à {{lieu_usine}}.</p><h2>Article 4 – Normes et qualité</h2><p>Le prestataire s'engage à respecter les normes en vigueur (ISO, UEMOA) et à fournir des fiches de données de sécurité (FDS/SDS) pour chaque produit livré.</p><h2>Article 5 – Droit applicable</h2><p>Le présent accord est régi par le droit OHADA et les lois nationales applicables.</p><p>Fait en deux exemplaires originaux.</p><p>Signature Client : _____________________ Signature Prestataire : _____________________</p></div>`
  },
  {
    code: 'chim2_colles_industrielles',
    name: "Accord de service de production de colles industrielles",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Contrat encadrant la production de colles industrielles (époxy, polyuréthane, cyanoacrylate) pour le marché ivoirien et OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'famille_colle',label:"Famille de colle (époxy, PU, etc.)",type:'text',required:true},
      {key:'quantite_annuelle',label:"Quantité annuelle (tonnes)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE COLLES INDUSTRIELLES</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Prestataire :</strong> {{prestataire_nom}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la fabrication de colles industrielles de la famille {{famille_colle}}, pour une quantité annuelle estimée de {{quantite_annuelle}} tonnes.</p><h2>Article 2 – Entrée en vigueur</h2><p>L'accord prend effet le {{date_debut}}.</p><h2>Article 3 – Obligations du prestataire</h2><p>Le prestataire s'engage à respecter les formulations validées, les fiches de données de sécurité (GHS/SDS) et les délais convenus.</p><h2>Article 4 – Droit applicable</h2><p>Acte uniforme OHADA relatif au droit commercial général.</p><p>Signatures des parties : _____________________</p></div>`
  },
  {
    code: 'chim2_detergents_lessives',
    name: "Accord de service de production de détergents et lessives",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Convention de production industrielle de détergents ménagers et de lessives en poudre ou liquide, marché Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client_nom',label:"Raison sociale du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Prestataire de fabrication",type:'text',required:true},
      {key:'gamme_produit',label:"Gamme de produits (poudre, liquide, etc.)",type:'text',required:true},
      {key:'capacite_mensuelle',label:"Capacité mensuelle (tonnes ou litres)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE DÉTERGENTS ET LESSIVES</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Prestataire :</strong> {{prestataire_nom}}</p><h2>Article 1 – Objet</h2><p>Production de la gamme {{gamme_produit}} pour une capacité mensuelle de {{capacite_mensuelle}}.</p><h2>Article 2 – Normes</h2><p>Les produits sont conformes aux normes UEMOA et aux réglementations ivoiriennes sur les produits d'entretien.</p><h2>Article 3 – Date d'effet</h2><p>Signé le {{date_signature}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_traitement_eau',
    name: "Accord de service de production de produits de traitement de l'eau",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Contrat de fabrication de produits chimiques pour le traitement et la potabilisation de l'eau, conforme aux normes OMS et OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Nom de l'organisme client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire chimiste",type:'text',required:true},
      {key:'produits_concernes',label:"Produits concernés (chlore, floculants, etc.)",type:'text',required:true},
      {key:'volume_trimestriel',label:"Volume trimestriel estimé",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE PRODUITS DE TRAITEMENT DE L'EAU</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Prestataire :</strong> {{prestataire_nom}}</p><h2>Article 1 – Objet</h2><p>Fabrication et livraison de {{produits_concernes}} pour un volume trimestriel de {{volume_trimestriel}}, à usage de traitement de l'eau potable ou industrielle.</p><h2>Article 2 – Conformité</h2><p>Les produits respectent les normes OMS, ISO 17025 et les exigences de la SODECI/ONEP applicables.</p><h2>Article 3 – Durée</h2><p>Contrat en vigueur à compter du {{date_debut}} pour une durée d'un an renouvelable.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_fertilisants_npk',
    name: "Accord de service de production de fertilisants chimiques (NPK)",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Contrat de production d'engrais NPK et fertilisants minéraux pour le secteur agricole ivoirien et OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'client_nom',label:"Nom de la coopérative ou client",type:'text',required:true},
      {key:'prestataire_nom',label:"Fabricant d'engrais",type:'text',required:true},
      {key:'formule_npk',label:"Formule NPK (ex: 15-15-15)",type:'text',required:true},
      {key:'tonnage_annuel',label:"Tonnage annuel commandé",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
      {key:'zone_livraison',label:"Zone de livraison",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE FERTILISANTS CHIMIQUES (NPK)</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Prestataire :</strong> {{prestataire_nom}}</p><h2>Article 1 – Objet</h2><p>Production de fertilisants de formule {{formule_npk}} pour un tonnage annuel de {{tonnage_annuel}}, destiné à la zone {{zone_livraison}}.</p><h2>Article 2 – Qualité</h2><p>Les engrais produits sont conformes aux spécifications du Ministère de l'Agriculture et aux normes CEDEAO sur les intrants agricoles.</p><h2>Article 3 – Date d'effet</h2><p>Contrat signé le {{date_contrat}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_pesticides_herbicides',
    name: "Accord de service de production de pesticides et herbicides",
    category: 'commercial_financier',
    price: 9000, priceMax: 25000,
    description: "Convention encadrant la production agréée de pesticides et herbicides homologués, conforme aux réglementations CILSS et OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Nom de la société cliente",type:'text',required:true},
      {key:'fabricant_nom',label:"Nom du fabricant",type:'text',required:true},
      {key:'produit_actif',label:"Matière active principale",type:'text',required:true},
      {key:'numero_homologation',label:"Numéro d'homologation CILSS",type:'text',required:true},
      {key:'date_debut',label:"Date de début de production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE PESTICIDES ET HERBICIDES</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Fabricant :</strong> {{fabricant_nom}}</p><h2>Article 1 – Objet</h2><p>Fabrication de pesticides/herbicides à base de {{produit_actif}}, homologués sous le numéro {{numero_homologation}} délivré par le CILSS.</p><h2>Article 2 – Conformité réglementaire</h2><p>Le fabricant garantit le respect du Code international de conduite sur la gestion des pesticides (FAO/OMS) et des lois ivoiriennes applicables.</p><h2>Article 3 – Prise d'effet</h2><p>Le présent accord prend effet le {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_gaz_industriels',
    name: "Accord de service de production de gaz industriels (azote, oxygène)",
    category: 'commercial_financier',
    price: 10000, priceMax: 28000,
    description: "Contrat de fourniture et production de gaz industriels (azote, oxygène, argon) pour usines et hôpitaux, zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client (usine ou hôpital)",type:'text',required:true},
      {key:'fournisseur_nom',label:"Nom du fournisseur de gaz",type:'text',required:true},
      {key:'type_gaz',label:"Type de gaz (azote, oxygène, argon, etc.)",type:'text',required:true},
      {key:'volume_mensuel_m3',label:"Volume mensuel en m³",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE GAZ INDUSTRIELS</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Fournisseur :</strong> {{fournisseur_nom}}</p><h2>Article 1 – Objet</h2><p>Fourniture de {{type_gaz}} pour un volume mensuel de {{volume_mensuel_m3}} m³, livré en bouteilles ou par pipeline selon les modalités convenues.</p><h2>Article 2 – Sécurité</h2><p>Le fournisseur assure la conformité aux normes ADR pour le transport et aux normes ISO 9001 pour la production.</p><h2>Article 3 – Durée</h2><p>Accord prenant effet le {{date_debut}}, renouvelable annuellement.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_matieres_plastiques',
    name: "Accord de service de production de matières plastiques (injection)",
    category: 'commercial_financier',
    price: 7500, priceMax: 21000,
    description: "Convention de production par injection de pièces en matières plastiques (HDPE, PP, ABS) pour industries locales, droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client industriel",type:'text',required:true},
      {key:'transformateur_nom',label:"Nom du transformateur plastique",type:'text',required:true},
      {key:'matiere_premiere',label:"Matière première (HDPE, PP, ABS, etc.)",type:'text',required:true},
      {key:'pieces_mensuelles',label:"Nombre de pièces mensuelles",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE MATIÈRES PLASTIQUES (INJECTION)</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Transformateur :</strong> {{transformateur_nom}}</p><h2>Article 1 – Objet</h2><p>Production par moulage par injection de pièces en {{matiere_premiere}}, à raison de {{pieces_mensuelles}} pièces par mois.</p><h2>Article 2 – Qualité</h2><p>Les pièces produites respectent les tolérances dimensionnelles définies dans les plans techniques annexés au présent accord.</p><h2>Article 3 – Prise d'effet</h2><p>Accord en vigueur à compter du {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_caoutchouc_synthetique',
    name: "Accord de service de production de caoutchouc synthétique",
    category: 'commercial_financier',
    price: 8500, priceMax: 24000,
    description: "Contrat de production de caoutchouc synthétique (SBR, NBR, EPDM) à usage industriel, encadré par le droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'producteur_nom',label:"Nom du producteur",type:'text',required:true},
      {key:'type_caoutchouc',label:"Type de caoutchouc (SBR, NBR, EPDM, etc.)",type:'text',required:true},
      {key:'tonnage_mensuel',label:"Tonnage mensuel",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE CAOUTCHOUC SYNTHÉTIQUE</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Producteur :</strong> {{producteur_nom}}</p><h2>Article 1 – Objet</h2><p>Production de caoutchouc synthétique de type {{type_caoutchouc}} pour un tonnage mensuel de {{tonnage_mensuel}}.</p><h2>Article 2 – Spécifications</h2><p>Les matériaux produits respectent les normes ASTM et ISO applicables à la catégorie de caoutchouc concernée.</p><h2>Article 3 – Date d'effet</h2><p>Contrat signé le {{date_contrat}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_resines_polymeres',
    name: "Accord de service de production de résines et polymères",
    category: 'commercial_financier',
    price: 9000, priceMax: 26000,
    description: "Convention de production de résines thermodurcissables et polymères techniques pour l'industrie ivoirienne, droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'chimiste_nom',label:"Nom du chimiste producteur",type:'text',required:true},
      {key:'famille_resine',label:"Famille de résine (époxy, phénol, polyester, etc.)",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (kg ou litres)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE RÉSINES ET POLYMÈRES</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Producteur :</strong> {{chimiste_nom}}</p><h2>Article 1 – Objet</h2><p>Production de résines de la famille {{famille_resine}} pour un volume mensuel de {{volume_mensuel}}.</p><h2>Article 2 – Contrôle qualité</h2><p>Chaque lot fait l'objet d'un certificat d'analyse et d'un rapport de contrôle qualité remis au client à la livraison.</p><h2>Article 3 – Prise d'effet</h2><p>Accord en vigueur à compter du {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_adhesifs_industriels',
    name: "Accord de service de production d'adhésifs industriels",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Contrat de fabrication d'adhésifs industriels (thermofusibles, acryliques, silicones) pour marchés industriels OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'fabricant_nom',label:"Nom du fabricant d'adhésifs",type:'text',required:true},
      {key:'type_adhesif',label:"Type d'adhésif (thermofusible, acrylique, silicone)",type:'text',required:true},
      {key:'quantite_mensuelle',label:"Quantité mensuelle (kg)",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION D'ADHÉSIFS INDUSTRIELS</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Fabricant :</strong> {{fabricant_nom}}</p><h2>Article 1 – Objet</h2><p>Fabrication d'adhésifs de type {{type_adhesif}} pour une quantité mensuelle de {{quantite_mensuelle}} kg.</p><h2>Article 2 – Fiches de sécurité</h2><p>Le fabricant remet une fiche de données de sécurité (FDS) conforme GHS pour chaque référence produit.</p><h2>Article 3 – Durée</h2><p>Le contrat prend effet le {{date_debut}} pour une durée d'un an renouvelable.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_petrochimie',
    name: "Accord de service de production de produits pétrochimiques",
    category: 'commercial_financier',
    price: 12000, priceMax: 35000,
    description: "Convention de production de dérivés pétrochimiques (benzène, éthylène, propylène) pour opérateurs industriels zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'operateur_nom',label:"Nom de l'opérateur client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire pétrochimiste",type:'text',required:true},
      {key:'produit_derive',label:"Produit dérivé concerné",type:'text',required:true},
      {key:'capacite_annuelle',label:"Capacité annuelle de production (tonnes)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'site_production',label:"Localisation du site de production",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE PRODUITS PÉTROCHIMIQUES</h1><p><strong>Opérateur client :</strong> {{operateur_nom}}</p><p><strong>Prestataire :</strong> {{prestataire_nom}}</p><h2>Article 1 – Objet</h2><p>Production de {{produit_derive}} pour une capacité annuelle de {{capacite_annuelle}} tonnes sur le site de {{site_production}}.</p><h2>Article 2 – Conformité HSE</h2><p>Le prestataire applique les normes HSE du secteur pétrolier, les réglementations de l'ANDE (Côte d'Ivoire) et les standards internationaux IFC/Banque Mondiale.</p><h2>Article 3 – Durée</h2><p>Accord prenant effet le {{date_debut}}, pour une durée initiale de trois ans.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_solvants_industriels',
    name: "Accord de service de production de solvants industriels",
    category: 'commercial_financier',
    price: 6500, priceMax: 18000,
    description: "Contrat de fabrication de solvants industriels (acétone, toluène, xylène) pour l'industrie manufacturière et chimique OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'producteur_nom',label:"Nom du producteur de solvants",type:'text',required:true},
      {key:'solvant_type',label:"Type de solvant",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (litres)",type:'text',required:true},
      {key:'date_contrat',label:"Date de signature du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE SOLVANTS INDUSTRIELS</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Producteur :</strong> {{producteur_nom}}</p><h2>Article 1 – Objet</h2><p>Production et livraison de solvants de type {{solvant_type}} pour un volume mensuel de {{volume_mensuel}} litres.</p><h2>Article 2 – Sécurité et stockage</h2><p>Le transport et le stockage des solvants sont soumis à la réglementation sur les matières dangereuses (ADR) et aux prescriptions de sécurité incendie locales.</p><h2>Article 3 – Signature</h2><p>Signé le {{date_contrat}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_traitement_eaux_industrielles',
    name: "Accord de service de traitement chimique des eaux industrielles",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Convention de traitement chimique des effluents industriels avant rejet, conforme aux normes environnementales ivoiriennes et OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'industrie_nom',label:"Nom de l'industrie cliente",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire de traitement",type:'text',required:true},
      {key:'type_effluent',label:"Type d'effluent (chimique, alimentaire, etc.)",type:'text',required:true},
      {key:'debit_journalier',label:"Débit journalier à traiter (m³/jour)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des prestations",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEMENT CHIMIQUE DES EAUX INDUSTRIELLES</h1><p><strong>Industrie cliente :</strong> {{industrie_nom}}</p><p><strong>Prestataire :</strong> {{prestataire_nom}}</p><h2>Article 1 – Objet</h2><p>Traitement chimique des effluents de type {{type_effluent}} pour un débit journalier de {{debit_journalier}} m³/jour, en vue de leur mise en conformité avant rejet dans le milieu naturel.</p><h2>Article 2 – Normes</h2><p>Les rejets traités respectent les normes de l'ANDE et les valeurs limites fixées par le Code de l'Environnement ivoirien.</p><h2>Article 3 – Date d'effet</h2><p>Accord en vigueur à compter du {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_labo_chimique',
    name: "Accord de service de fourniture de produits chimiques de laboratoire",
    category: 'commercial_financier',
    price: 4000, priceMax: 11000,
    description: "Contrat de fourniture régulière de réactifs et produits chimiques pour laboratoires d'analyse et de recherche, zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'labo_nom',label:"Nom du laboratoire client",type:'text',required:true},
      {key:'fournisseur_nom',label:"Nom du fournisseur",type:'text',required:true},
      {key:'categories_produits',label:"Catégories de produits fournis",type:'text',required:true},
      {key:'budget_annuel',label:"Budget annuel estimé (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FOURNITURE DE PRODUITS CHIMIQUES DE LABORATOIRE</h1><p><strong>Laboratoire :</strong> {{labo_nom}}</p><p><strong>Fournisseur :</strong> {{fournisseur_nom}}</p><h2>Article 1 – Objet</h2><p>Fourniture régulière de {{categories_produits}} pour un budget annuel estimé de {{budget_annuel}} FCFA.</p><h2>Article 2 – Qualité et traçabilité</h2><p>Chaque produit est accompagné de son certificat d'analyse et d'une fiche de données de sécurité conforme GHS.</p><h2>Article 3 – Durée</h2><p>Contrat prenant effet le {{date_debut}}, renouvelable annuellement par tacite reconduction.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_certification_reach',
    name: "Accord de service de certification REACh (export Europe)",
    category: 'commercial_financier',
    price: 15000, priceMax: 40000,
    description: "Contrat d'accompagnement à la certification REACh pour les exportateurs de produits chimiques vers l'Union Européenne depuis la zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'exportateur_nom',label:"Nom de la société exportatrice",type:'text',required:true},
      {key:'cabinet_nom',label:"Cabinet conseil REACh",type:'text',required:true},
      {key:'substances_concernees',label:"Substances chimiques concernées",type:'text',required:true},
      {key:'marche_destination',label:"Marché de destination (UE, pays)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION REACH (EXPORT EUROPE)</h1><p><strong>Exportateur :</strong> {{exportateur_nom}}</p><p><strong>Cabinet conseil :</strong> {{cabinet_nom}}</p><h2>Article 1 – Objet</h2><p>Accompagnement de {{exportateur_nom}} dans la démarche de conformité REACh (Règlement CE n°1907/2006) pour les substances {{substances_concernees}}, en vue de l'exportation vers {{marche_destination}}.</p><h2>Article 2 – Prestations incluses</h2><p>Le cabinet assure : audit de conformité, préenregistrement/enregistrement ECHA, rédaction des fiches de données de sécurité étendues (eSDS) et formation des équipes.</p><h2>Article 3 – Durée</h2><p>Mission débutant le {{date_debut}} jusqu'à l'obtention des dossiers de conformité.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_ghs_sds',
    name: "Accord de service de gestion des produits chimiques dangereux (GHS/SDS)",
    category: 'commercial_financier',
    price: 7000, priceMax: 19000,
    description: "Convention de mise en conformité GHS et rédaction de fiches de données de sécurité pour les opérateurs chimiques de la zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'consultant_nom',label:"Nom du consultant HSE/chimie",type:'text',required:true},
      {key:'nombre_references',label:"Nombre de références produits à traiter",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la prestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES PRODUITS CHIMIQUES DANGEREUX (GHS/SDS)</h1><p><strong>Entreprise cliente :</strong> {{entreprise_nom}}</p><p><strong>Consultant :</strong> {{consultant_nom}}</p><h2>Article 1 – Objet</h2><p>Rédaction et mise à jour de fiches de données de sécurité (FDS) conformes au Système Général Harmonisé (GHS) pour {{nombre_references}} références produits.</p><h2>Article 2 – Livrables</h2><p>FDS en français, étiquetage GHS, pictogrammes de danger, formation du personnel exposé.</p><h2>Article 3 – Prise d'effet</h2><p>Prestation débutant le {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_transport_matieres_dangereuses',
    name: "Accord de service de transport de matières dangereuses chimiques",
    category: 'commercial_financier',
    price: 6000, priceMax: 17000,
    description: "Contrat de transport routier de matières dangereuses chimiques (ADR/IATA) entre sites industriels, zone Afrique de l'Ouest OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'expediteur_nom',label:"Nom de l'expéditeur",type:'text',required:true},
      {key:'transporteur_nom',label:"Nom du transporteur agréé",type:'text',required:true},
      {key:'classe_danger',label:"Classe de danger ADR (ex: classe 3, 8, 9)",type:'text',required:true},
      {key:'trajet',label:"Trajet (origine - destination)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT DE MATIÈRES DANGEREUSES CHIMIQUES</h1><p><strong>Expéditeur :</strong> {{expediteur_nom}}</p><p><strong>Transporteur :</strong> {{transporteur_nom}}</p><h2>Article 1 – Objet</h2><p>Transport routier de matières dangereuses de {{classe_danger}} sur le trajet {{trajet}}, conformément à la réglementation ADR et aux exigences nationales.</p><h2>Article 2 – Obligations du transporteur</h2><p>Véhicules agréés ADR, chauffeurs formés (certificat ADR), documents de transport conformes (bordereau d'expédition, FDS).</p><h2>Article 3 – Durée</h2><p>Contrat en vigueur à compter du {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_audit_hse',
    name: "Accord de service d'audit HSE chimie industrielle",
    category: 'commercial_financier',
    price: 10000, priceMax: 28000,
    description: "Convention d'audit hygiène, sécurité et environnement (HSE) pour sites de production chimique, conforme aux normes ISO 45001 et OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'site_nom',label:"Nom et localisation du site audité",type:'text',required:true},
      {key:'cabinet_audit',label:"Nom du cabinet d'audit HSE",type:'text',required:true},
      {key:'perimetre_audit',label:"Périmètre de l'audit (production, stockage, etc.)",type:'text',required:true},
      {key:'date_audit',label:"Date prévue de l'audit",type:'date',required:true},
      {key:'duree_jours',label:"Durée de l'audit (jours)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT HSE CHIMIE INDUSTRIELLE</h1><p><strong>Site audité :</strong> {{site_nom}}</p><p><strong>Cabinet d'audit :</strong> {{cabinet_audit}}</p><h2>Article 1 – Objet</h2><p>Réalisation d'un audit HSE portant sur {{perimetre_audit}}, programmé le {{date_audit}} pour une durée de {{duree_jours}} jour(s).</p><h2>Article 2 – Référentiels</h2><p>L'audit est conduit selon les normes ISO 45001, ISO 14001 et les prescriptions de l'ANDE et du Ministère de l'Environnement ivoirien.</p><h2>Article 3 – Livrables</h2><p>Rapport d'audit avec constats, écarts et plan d'actions correctives, remis dans les 15 jours suivant l'audit.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_rd_universite',
    name: "Accord de partenariat R&D chimie-université",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Convention de partenariat recherche et développement entre une entreprise chimique et une université africaine francophone, droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise partenaire",type:'text',required:true},
      {key:'universite_nom',label:"Nom de l'université partenaire",type:'text',required:true},
      {key:'programme_recherche',label:"Programme de recherche concerné",type:'text',required:true},
      {key:'budget_rd',label:"Budget R&D alloué (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du partenariat",type:'date',required:true},
      {key:'duree_annees',label:"Durée du partenariat (années)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT R&D CHIMIE-UNIVERSITÉ</h1><p><strong>Entreprise :</strong> {{entreprise_nom}}</p><p><strong>Université :</strong> {{universite_nom}}</p><h2>Article 1 – Objet</h2><p>Le présent accord établit un partenariat de recherche et développement autour du programme {{programme_recherche}}, pour un budget alloué de {{budget_rd}} FCFA sur {{duree_annees}} an(s).</p><h2>Article 2 – Propriété intellectuelle</h2><p>Les résultats de recherche sont co-détenus selon les modalités précisées en annexe. Toute exploitation commerciale requiert l'accord écrit des deux parties.</p><h2>Article 3 – Durée</h2><p>Partenariat prenant effet le {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_rapport_performance_usine',
    name: "Rapport de performance usine chimique",
    category: 'commercial_financier',
    price: 4000, priceMax: 10000,
    description: "Document de reporting de performance opérationnelle et financière d'une usine chimique, adapté aux normes de gestion OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'usine_nom',label:"Nom de l'usine",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte (ex: T1 2025)",type:'text',required:true},
      {key:'responsable_nom',label:"Nom du responsable de production",type:'text',required:true},
      {key:'production_reelle',label:"Production réelle (tonnes ou litres)",type:'text',required:true},
      {key:'taux_conformite',label:"Taux de conformité qualité (%)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE USINE CHIMIQUE</h1><p><strong>Usine :</strong> {{usine_nom}}</p><p><strong>Période :</strong> {{periode_rapport}}</p><p><strong>Responsable :</strong> {{responsable_nom}}</p><h2>1. Indicateurs de production</h2><p>Production réelle : {{production_reelle}}</p><p>Taux de conformité qualité : {{taux_conformite}} %</p><h2>2. Performance HSE</h2><p>Incidents déclarés, actions correctives menées, taux de fréquence des accidents à renseigner par le responsable HSE.</p><h2>3. Recommandations</h2><p>Plan d'amélioration continue à définir pour la période suivante.</p><p>Signature du responsable : _____________________</p></div>`
  },
  {
    code: 'chim2_plan_developpement',
    name: "Plan de développement industrie chimique",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Document stratégique de planification du développement d'une unité industrielle chimique, conforme aux exigences OHADA et UEMOA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'horizon_planification',label:"Horizon de planification (ex: 2025-2030)",type:'text',required:true},
      {key:'axe_stratégique',label:"Axe stratégique principal",type:'text',required:true},
      {key:'investissement_prevu',label:"Investissement prévu (FCFA)",type:'text',required:true},
      {key:'date_validation',label:"Date de validation du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT INDUSTRIE CHIMIQUE</h1><p><strong>Entreprise :</strong> {{entreprise_nom}}</p><p><strong>Horizon :</strong> {{horizon_planification}}</p><h2>1. Vision stratégique</h2><p>Axe principal : {{axe_stratégique}}</p><h2>2. Investissements prévus</h2><p>Montant total : {{investissement_prevu}} FCFA, réparti sur les capacités de production, la mise aux normes et la formation des ressources humaines.</p><h2>3. Calendrier de mise en œuvre</h2><p>Les étapes clés et jalons sont définis en annexe du présent plan.</p><p>Validé le {{date_validation}} par la Direction Générale.</p><p>Signature : _____________________</p></div>`
  },
  {
    code: 'chim2_decontamination_site',
    name: "Accord de service de décontamination chimique de site",
    category: 'commercial_financier',
    price: 12000, priceMax: 35000,
    description: "Contrat de dépollution et décontamination chimique de site industriel, conforme aux normes environnementales ivoiriennes et OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'proprietaire_nom',label:"Nom du propriétaire du site",type:'text',required:true},
      {key:'entreprise_depollution',label:"Nom de l'entreprise de décontamination",type:'text',required:true},
      {key:'polluants_cibles',label:"Polluants cibles à éliminer",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie du site (ha)",type:'text',required:true},
      {key:'date_debut_travaux',label:"Date de début des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉCONTAMINATION CHIMIQUE DE SITE</h1><p><strong>Propriétaire du site :</strong> {{proprietaire_nom}}</p><p><strong>Prestataire de décontamination :</strong> {{entreprise_depollution}}</p><h2>Article 1 – Objet</h2><p>Décontamination chimique d'un site de {{superficie_ha}} ha, visant l'élimination de {{polluants_cibles}}, conformément au diagnostic environnemental préalable.</p><h2>Article 2 – Méthodes</h2><p>Les techniques de remédiation (bioremédiation, traitement thermique, lavage des sols) sont précisées dans le plan technique annexé.</p><h2>Article 3 – Début des travaux</h2><p>Travaux commençant le {{date_debut_travaux}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_certification_iso9001',
    name: "Accord de certification ISO 9001 industrie chimique",
    category: 'commercial_financier',
    price: 10000, priceMax: 28000,
    description: "Convention d'accompagnement à la certification ISO 9001 pour une entreprise chimique de la zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise à certifier",type:'text',required:true},
      {key:'organisme_certification',label:"Organisme de certification",type:'text',required:true},
      {key:'perimetre_certification',label:"Périmètre de certification",type:'text',required:true},
      {key:'date_audit_initial',label:"Date de l'audit initial",type:'date',required:true},
      {key:'duree_accompagnement',label:"Durée de l'accompagnement (mois)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION ISO 9001 INDUSTRIE CHIMIQUE</h1><p><strong>Entreprise :</strong> {{entreprise_nom}}</p><p><strong>Organisme de certification :</strong> {{organisme_certification}}</p><h2>Article 1 – Objet</h2><p>Accompagnement de {{entreprise_nom}} dans sa démarche de certification ISO 9001:2015, couvrant le périmètre {{perimetre_certification}}, sur une durée de {{duree_accompagnement}} mois.</p><h2>Article 2 – Audit initial</h2><p>L'audit de diagnostic est programmé le {{date_audit_initial}}. Les écarts identifiés feront l'objet d'un plan d'actions correctives.</p><h2>Article 3 – Conditions</h2><p>La certification est délivrée à l'issue d'un audit de certification concluant, sans écart majeur non résolu.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'chim2_chimie_verte',
    name: "Charte de la chimie verte et responsable",
    category: 'commercial_financier',
    price: 3000, priceMax: 8000,
    description: "Charte d'engagement pour une chimie verte, durable et responsable, adaptée aux entreprises chimiques de la zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise signataire",type:'text',required:true},
      {key:'representant_nom',label:"Nom du représentant légal",type:'text',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true},
      {key:'engagement_principal',label:"Engagement principal de l'entreprise",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA CHIMIE VERTE ET RESPONSABLE</h1><p><strong>Entreprise signataire :</strong> {{entreprise_nom}}</p><p><strong>Représentant légal :</strong> {{representant_nom}}</p><h2>Préambule</h2><p>{{entreprise_nom}} s'engage dans une démarche de chimie verte, fondée sur les 12 principes de la chimie verte (Anastas & Warner), visant à réduire les impacts environnementaux et sanitaires de ses activités.</p><h2>Engagements</h2><p>{{engagement_principal}}</p><h2>Portée</h2><p>La présente charte est opposable à tous les partenaires et sous-traitants de {{entreprise_nom}} dans la zone OHADA.</p><p>Signé le {{date_signature}}.</p><p>Signature : _____________________</p></div>`
  },

  // ─── COSMÉTIQUE / BEAUTÉ / BIEN-ÊTRE (cosm_) ────────────────────────────────
  {
    code: 'cosm_cremes_lotions',
    name: "Accord de service de production de crèmes et lotions (cosmétique)",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Contrat de fabrication de crèmes hydratantes et lotions cosmétiques pour le marché ouest-africain, conforme OHADA et réglementation cosmétique UEMOA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'marque_nom',label:"Nom de la marque cliente",type:'text',required:true},
      {key:'fabricant_nom',label:"Nom du fabricant cosmétique",type:'text',required:true},
      {key:'gamme_produit',label:"Gamme de produits (crèmes, lotions, sérums)",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel estimé (unités ou kg)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE CRÈMES ET LOTIONS (COSMÉTIQUE)</h1><p><strong>Marque cliente :</strong> {{marque_nom}}</p><p><strong>Fabricant :</strong> {{fabricant_nom}}</p><h2>Article 1 – Objet</h2><p>Fabrication en marque blanche ou sous marque propre de la gamme {{gamme_produit}}, pour un volume mensuel de {{volume_mensuel}}.</p><h2>Article 2 – Conformité</h2><p>Les produits sont conformes aux listes positives et négatives des ingrédients cosmétiques (Règlement CE 1223/2009 adapté UEMOA) et aux exigences de l'Autorité sanitaire nationale.</p><h2>Article 3 – Prise d'effet</h2><p>Contrat en vigueur à compter du {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_savons_gels',
    name: "Accord de service de production de savons et gels douche artisanaux",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Convention de production artisanale de savons naturels et gels douche pour le marché ivoirien et OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'commanditaire_nom',label:"Nom du commanditaire",type:'text',required:true},
      {key:'artisan_nom',label:"Nom de l'artisan savonnier",type:'text',required:true},
      {key:'type_savon',label:"Type de savon (karité, coco, argan, etc.)",type:'text',required:true},
      {key:'quantite_mensuelle',label:"Quantité mensuelle (unités ou kg)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE SAVONS ET GELS DOUCHE ARTISANAUX</h1><p><strong>Commanditaire :</strong> {{commanditaire_nom}}</p><p><strong>Artisan savonnier :</strong> {{artisan_nom}}</p><h2>Article 1 – Objet</h2><p>Production artisanale de savons de type {{type_savon}} et gels douche associés, à raison de {{quantite_mensuelle}} par mois.</p><h2>Article 2 – Ingrédients</h2><p>Les matières premières utilisées sont d'origine naturelle, sans parabènes ni produits chimiques agressifs, conformément aux spécifications techniques convenues.</p><h2>Article 3 – Durée</h2><p>Accord prenant effet le {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_shampoings',
    name: "Accord de service de production de shampooings et après-shampooings",
    category: 'commercial_financier',
    price: 4500, priceMax: 12000,
    description: "Contrat de fabrication de shampooings et après-shampooings adaptés aux cheveux africains, marché OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'marque_nom',label:"Nom de la marque",type:'text',required:true},
      {key:'fabricant_nom',label:"Nom du fabricant",type:'text',required:true},
      {key:'ligne_produit',label:"Ligne de produits (ex: cheveux secs, colorés, etc.)",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (litres ou unités)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE SHAMPOOINGS ET APRÈS-SHAMPOOINGS</h1><p><strong>Marque :</strong> {{marque_nom}}</p><p><strong>Fabricant :</strong> {{fabricant_nom}}</p><h2>Article 1 – Objet</h2><p>Fabrication de la ligne {{ligne_produit}} pour un volume mensuel de {{volume_mensuel}}, formulée pour les types de cheveux africains.</p><h2>Article 2 – Formulation</h2><p>Les formules sont validées par le cosméticien de la marque et testées dermatologiquement avant mise en production.</p><h2>Article 3 – Prise d'effet</h2><p>Accord en vigueur à compter du {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_capillaires_karite',
    name: "Accord de service de production de produits capillaires africains (karité)",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Convention de production de produits capillaires à base de karité et huiles africaines, destinés au marché local et à l'export.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'marque_nom',label:"Nom de la marque",type:'text',required:true},
      {key:'producteur_nom',label:"Nom du producteur",type:'text',required:true},
      {key:'ingredient_phare',label:"Ingrédient phare (karité, huile de coco, etc.)",type:'text',required:true},
      {key:'gamme',label:"Gamme de produits capillaires",type:'text',required:true},
      {key:'date_debut',label:"Date de début de production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE PRODUITS CAPILLAIRES AFRICAINS (KARITÉ)</h1><p><strong>Marque :</strong> {{marque_nom}}</p><p><strong>Producteur :</strong> {{producteur_nom}}</p><h2>Article 1 – Objet</h2><p>Production de la gamme capillaire {{gamme}} à base de {{ingredient_phare}}, valorisant les ressources naturelles africaines.</p><h2>Article 2 – Approvisionnement</h2><p>Le producteur s'approvisionne en matières premières auprès de fournisseurs certifiés équitables et traçables.</p><h2>Article 3 – Durée</h2><p>Accord prenant effet le {{date_debut}}, renouvelable annuellement.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_parfums_edt',
    name: "Accord de service de production de parfums et eaux de toilette",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Contrat de création et production de parfums et eaux de toilette pour marques africaines, droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'marque_nom',label:"Nom de la marque parfumerie",type:'text',required:true},
      {key:'nez_parfumeur',label:"Nom du parfumeur (nez)",type:'text',required:true},
      {key:'collection',label:"Nom de la collection ou fragrance",type:'text',required:true},
      {key:'tirage_initial',label:"Tirage initial (nombre de flacons)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE PARFUMS ET EAUX DE TOILETTE</h1><p><strong>Marque :</strong> {{marque_nom}}</p><p><strong>Parfumeur :</strong> {{nez_parfumeur}}</p><h2>Article 1 – Objet</h2><p>Création et production de la collection {{collection}} pour un tirage initial de {{tirage_initial}} flacons, en vue d'un lancement le {{date_lancement}}.</p><h2>Article 2 – Propriété de la formule</h2><p>La formule olfactive est la propriété exclusive de {{marque_nom}} à compter de la livraison et du paiement intégral.</p><h2>Article 3 – Confidentialité</h2><p>Le parfumeur s'engage à ne pas reproduire ni divulguer la formule à des tiers.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_maquillage',
    name: "Accord de service de production de maquillage (fond de teint, rouge à lèvres)",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Contrat de fabrication de produits de maquillage adaptés aux carnations africaines, conforme aux normes cosmétiques et droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'marque_nom',label:"Nom de la marque maquillage",type:'text',required:true},
      {key:'fabricant_nom',label:"Nom du fabricant",type:'text',required:true},
      {key:'categorie_produit',label:"Catégorie de produit (fond de teint, rouge à lèvres, etc.)",type:'text',required:true},
      {key:'nombre_references',label:"Nombre de références (teintes, shades)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE MAQUILLAGE</h1><p><strong>Marque :</strong> {{marque_nom}}</p><p><strong>Fabricant :</strong> {{fabricant_nom}}</p><h2>Article 1 – Objet</h2><p>Production de {{categorie_produit}} en {{nombre_references}} références, formulées spécifiquement pour les carnations africaines.</p><h2>Article 2 – Tests sécurité</h2><p>Chaque référence fait l'objet de tests de compatibilité cutanée et ophtalmique avant sa mise sur le marché, conformément aux exigences réglementaires applicables.</p><h2>Article 3 – Prise d'effet</h2><p>Accord en vigueur à compter du {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_distribution_importes',
    name: "Accord de service de distribution de cosmétiques importés",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Convention de distribution exclusive ou non exclusive de cosmétiques importés sur le territoire ivoirien ou OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'fournisseur_nom',label:"Nom du fournisseur international",type:'text',required:true},
      {key:'distributeur_nom',label:"Nom du distributeur local",type:'text',required:true},
      {key:'marques_concernees',label:"Marques ou produits concernés",type:'text',required:true},
      {key:'territoire',label:"Territoire de distribution",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DISTRIBUTION DE COSMÉTIQUES IMPORTÉS</h1><p><strong>Fournisseur :</strong> {{fournisseur_nom}}</p><p><strong>Distributeur :</strong> {{distributeur_nom}}</p><h2>Article 1 – Objet</h2><p>Distribution de {{marques_concernees}} sur le territoire {{territoire}}, selon les conditions commerciales définies en annexe.</p><h2>Article 2 – Obligations douanières</h2><p>Le distributeur est responsable du dédouanement des produits et de leur conformité aux règles d'importation de l'UEMOA.</p><h2>Article 3 – Durée</h2><p>Accord prenant effet le {{date_debut}}, pour une durée de deux ans renouvelable.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_licence_marque',
    name: "Accord de licence de marque cosmétique internationale",
    category: 'commercial_financier',
    price: 12000, priceMax: 35000,
    description: "Contrat de licence de marque internationale pour exploitation commerciale de cosmétiques en Afrique francophone, droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'concedant_nom',label:"Nom du concédant (titulaire de la marque)",type:'text',required:true},
      {key:'licencie_nom',label:"Nom du licencié",type:'text',required:true},
      {key:'marque_concedee',label:"Marque concédée",type:'text',required:true},
      {key:'redevance_taux',label:"Taux de redevance (%)",type:'text',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true},
      {key:'territoire',label:"Territoire de la licence",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE MARQUE COSMÉTIQUE INTERNATIONALE</h1><p><strong>Concédant :</strong> {{concedant_nom}}</p><p><strong>Licencié :</strong> {{licencie_nom}}</p><h2>Article 1 – Objet</h2><p>Le concédant accorde au licencié le droit d'utiliser la marque {{marque_concedee}} sur le territoire {{territoire}}, en contrepartie d'une redevance de {{redevance_taux}} % du chiffre d'affaires net.</p><h2>Article 2 – Contrôle qualité</h2><p>Le licencié s'engage à maintenir les standards de qualité de la marque et à soumettre ses produits à l'approbation préalable du concédant.</p><h2>Article 3 – Durée</h2><p>Licence prenant effet le {{date_debut}}, pour une durée de cinq ans.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_salon_coiffure',
    name: "Accord de service de salon de coiffure professionnel",
    category: 'commercial_financier',
    price: 3000, priceMax: 8000,
    description: "Contrat de prestations de services de coiffure professionnelle (tresses, défrisage, extensions), adapté au marché ivoirien OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'salon_nom',label:"Nom du salon de coiffure",type:'text',required:true},
      {key:'prestations',label:"Prestations convenues (coupe, tresse, défrisage, etc.)",type:'text',required:true},
      {key:'tarif_global',label:"Tarif global convenu (FCFA)",type:'text',required:true},
      {key:'date_rdv',label:"Date du rendez-vous",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SALON DE COIFFURE PROFESSIONNEL</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Salon :</strong> {{salon_nom}}</p><h2>Article 1 – Objet</h2><p>Le salon s'engage à réaliser les prestations suivantes : {{prestations}}, pour un tarif global de {{tarif_global}} FCFA.</p><h2>Article 2 – Rendez-vous</h2><p>Prestation programmée le {{date_rdv}}. Tout annulation à moins de 24h entraîne la facturation de 50% du montant convenu.</p><h2>Article 3 – Responsabilité</h2><p>Le salon s'engage à utiliser des produits de qualité professionnelle adaptés au type de cheveux du client.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_salon_beaute',
    name: "Accord de service de salon de beauté (esthétique)",
    category: 'commercial_financier',
    price: 3500, priceMax: 9000,
    description: "Convention de prestations esthétiques en salon de beauté (épilation, soin du visage, sourcils) adaptée au droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'cliente_nom',label:"Nom de la cliente",type:'text',required:true},
      {key:'salon_nom',label:"Nom du salon de beauté",type:'text',required:true},
      {key:'soins_prevus',label:"Soins prévus (épilation, soin visage, etc.)",type:'text',required:true},
      {key:'montant_total',label:"Montant total (FCFA)",type:'text',required:true},
      {key:'date_prestation',label:"Date de la prestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SALON DE BEAUTÉ (ESTHÉTIQUE)</h1><p><strong>Cliente :</strong> {{cliente_nom}}</p><p><strong>Salon :</strong> {{salon_nom}}</p><h2>Article 1 – Prestations</h2><p>Le salon s'engage à réaliser : {{soins_prevus}}, pour un montant total de {{montant_total}} FCFA.</p><h2>Article 2 – Hygiène</h2><p>Le salon garantit le respect des normes d'hygiène et de stérilisation des instruments conformément aux exigences sanitaires nationales.</p><h2>Article 3 – Date</h2><p>Prestation prévue le {{date_prestation}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_spa',
    name: "Accord de service de spa et soins du corps",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Contrat de prestations de spa, massages et soins corporels de bien-être, adapté au marché ivoirien et OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'spa_nom',label:"Nom du spa ou institut",type:'text',required:true},
      {key:'formule_choisie',label:"Formule choisie (ex: massages, enveloppements, etc.)",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances",type:'text',required:true},
      {key:'date_premiere_seance',label:"Date de la première séance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SPA ET SOINS DU CORPS</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Spa/Institut :</strong> {{spa_nom}}</p><h2>Article 1 – Objet</h2><p>Réalisation de {{nombre_seances}} séance(s) de la formule {{formule_choisie}}, première séance prévue le {{date_premiere_seance}}.</p><h2>Article 2 – Contre-indications</h2><p>Le client déclare ne présenter aucune contre-indication médicale aux soins choisis. En cas de doute, un avis médical préalable est recommandé.</p><h2>Article 3 – Conditions d'annulation</h2><p>Toute annulation à moins de 48h entraîne la perte de la séance ou sa facturation intégrale.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_manucure_pedicure',
    name: "Accord de service de manucure et pédicure professionnelle",
    category: 'commercial_financier',
    price: 2500, priceMax: 7000,
    description: "Convention de prestations de manucure et pédicure professionnelle en institut ou à domicile, droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'cliente_nom',label:"Nom de la cliente",type:'text',required:true},
      {key:'praticienne_nom',label:"Nom de la praticienne",type:'text',required:true},
      {key:'type_prestation',label:"Type de prestation (manucure, pédicure, gel, etc.)",type:'text',required:true},
      {key:'tarif',label:"Tarif de la prestation (FCFA)",type:'text',required:true},
      {key:'date_rdv',label:"Date du rendez-vous",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MANUCURE ET PÉDICURE PROFESSIONNELLE</h1><p><strong>Cliente :</strong> {{cliente_nom}}</p><p><strong>Praticienne :</strong> {{praticienne_nom}}</p><h2>Article 1 – Prestation</h2><p>Réalisation de : {{type_prestation}}, pour un tarif de {{tarif}} FCFA.</p><h2>Article 2 – Hygiène et matériel</h2><p>La praticienne utilise du matériel stérilisé à usage unique ou désinfecté conformément aux normes sanitaires en vigueur.</p><h2>Article 3 – Rendez-vous</h2><p>Prestation programmée le {{date_rdv}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_dermatologue_cosmetologue',
    name: "Accord de service de dermatologue-cosmétologue",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Contrat de consultation et suivi dermato-cosmétologique pour marques cosmétiques ou particuliers, zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client (marque ou particulier)",type:'text',required:true},
      {key:'specialiste_nom',label:"Nom du dermatologue-cosmétologue",type:'text',required:true},
      {key:'objet_consultation',label:"Objet de la consultation ou mission",type:'text',required:true},
      {key:'honoraires',label:"Honoraires convenus (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DERMATOLOGUE-COSMÉTOLOGUE</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Spécialiste :</strong> {{specialiste_nom}}</p><h2>Article 1 – Mission</h2><p>{{objet_consultation}}, pour des honoraires de {{honoraires}} FCFA.</p><h2>Article 2 – Confidentialité</h2><p>Le spécialiste s'engage à respecter le secret professionnel et la confidentialité des formulations ou données personnelles communiquées.</p><h2>Article 3 – Durée</h2><p>Mission débutant le {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_traitement_anti_age',
    name: "Accord de service de traitement anti-âge",
    category: 'commercial_financier',
    price: 6000, priceMax: 17000,
    description: "Convention de prise en charge cosmétologique anti-âge (soin, peeling, mésothérapie esthétique) adaptée au marché ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient/client",type:'text',required:true},
      {key:'praticien_nom',label:"Nom du praticien cosmétologue",type:'text',required:true},
      {key:'protocole',label:"Protocole anti-âge retenu",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'date_debut',label:"Date de la première séance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEMENT ANTI-ÂGE</h1><p><strong>Patient/Client :</strong> {{patient_nom}}</p><p><strong>Praticien :</strong> {{praticien_nom}}</p><h2>Article 1 – Protocole</h2><p>Mise en œuvre du protocole {{protocole}} sur {{nombre_seances}} séances, première séance le {{date_debut}}.</p><h2>Article 2 – Consentement éclairé</h2><p>Le client a été informé des risques, des résultats attendus et des contre-indications du protocole retenu. Il donne son consentement écrit.</p><h2>Article 3 – Suivi</h2><p>Un bilan photographique et clinique est réalisé avant chaque séance pour évaluer la progression.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_produit_naturel_certifie',
    name: "Accord de service de produit cosmétique naturel certifié",
    category: 'commercial_financier',
    price: 6000, priceMax: 16000,
    description: "Contrat de production de cosmétiques naturels certifiés (Ecocert, COSMOS), valorisant les ressources africaines, zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'marque_nom',label:"Nom de la marque",type:'text',required:true},
      {key:'producteur_nom',label:"Nom du producteur",type:'text',required:true},
      {key:'certification_visee',label:"Certification visée (COSMOS, Ecocert, etc.)",type:'text',required:true},
      {key:'gamme_produit',label:"Gamme de produits naturels",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUIT COSMÉTIQUE NATUREL CERTIFIÉ</h1><p><strong>Marque :</strong> {{marque_nom}}</p><p><strong>Producteur :</strong> {{producteur_nom}}</p><h2>Article 1 – Objet</h2><p>Production de la gamme {{gamme_produit}} en vue de l'obtention de la certification {{certification_visee}}, valorisant les ingrédients d'origine africaine.</p><h2>Article 2 – Sourcing</h2><p>Les matières premières sont sourcing tracées et conformes aux critères de naturalité et d'origine biologique requis par le référentiel de certification.</p><h2>Article 3 – Durée</h2><p>Accord en vigueur à compter du {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_certification_cosmos',
    name: "Accord de certification COSMOS (cosmétique bio)",
    category: 'commercial_financier',
    price: 10000, priceMax: 28000,
    description: "Convention d'accompagnement à la certification COSMOS pour une marque cosmétique africaine exportatrice, droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'marque_nom',label:"Nom de la marque cosmétique",type:'text',required:true},
      {key:'organisme_certif',label:"Organisme de certification COSMOS agréé",type:'text',required:true},
      {key:'nombre_produits',label:"Nombre de produits à certifier",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit de certification",type:'date',required:true},
      {key:'marche_cible',label:"Marché cible après certification",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION COSMOS (COSMÉTIQUE BIO)</h1><p><strong>Marque :</strong> {{marque_nom}}</p><p><strong>Organisme :</strong> {{organisme_certif}}</p><h2>Article 1 – Objet</h2><p>Accompagnement et certification COSMOS de {{nombre_produits}} produit(s) cosmétiques, avec audit prévu le {{date_audit}}.</p><h2>Article 2 – Processus</h2><p>Le processus comprend : audit de formulation, vérification du sourcing, validation des allégations marketing et délivrance du certificat COSMOS.</p><h2>Article 3 – Usage commercial</h2><p>La certification permettra l'accès au marché {{marche_cible}} et l'usage du logo COSMOS sur les emballages.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_formation_estheticienne',
    name: "Accord de service de formation esthéticienne",
    category: 'commercial_financier',
    price: 4000, priceMax: 11000,
    description: "Contrat de formation professionnelle pour esthéticiennes en Côte d'Ivoire et zone OHADA, couvrant techniques et réglementation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'stagiaire_nom',label:"Nom de la stagiaire",type:'text',required:true},
      {key:'centre_formation',label:"Nom du centre de formation",type:'text',required:true},
      {key:'programme_formation',label:"Programme de formation (durée, modules)",type:'textarea',required:true},
      {key:'cout_formation',label:"Coût de la formation (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION ESTHÉTICIENNE</h1><p><strong>Stagiaire :</strong> {{stagiaire_nom}}</p><p><strong>Centre de formation :</strong> {{centre_formation}}</p><h2>Article 1 – Programme</h2><p>{{programme_formation}}</p><h2>Article 2 – Coût et modalités</h2><p>Coût total : {{cout_formation}} FCFA, payable selon les modalités définies en annexe.</p><h2>Article 3 – Attestation</h2><p>Une attestation de formation est délivrée à l'issue du programme, après validation des acquis.</p><p>Début de la formation : {{date_debut}}.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_formation_coiffeur',
    name: "Accord de service de formation coiffeur",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Convention de formation professionnelle coiffure (coupe, coiffure africaine, coloration) en Afrique francophone, droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'apprenant_nom',label:"Nom de l'apprenant",type:'text',required:true},
      {key:'ecole_coiffure',label:"Nom de l'école ou salon de formation",type:'text',required:true},
      {key:'specialite',label:"Spécialité choisie (coiffure africaine, coloration, etc.)",type:'text',required:true},
      {key:'duree_mois',label:"Durée de la formation (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION COIFFEUR</h1><p><strong>Apprenant :</strong> {{apprenant_nom}}</p><p><strong>École/Salon de formation :</strong> {{ecole_coiffure}}</p><h2>Article 1 – Formation</h2><p>Formation en {{specialite}} d'une durée de {{duree_mois}} mois, débutant le {{date_debut}}.</p><h2>Article 2 – Contenu pédagogique</h2><p>La formation couvre : technique de coupe, coiffures traditionnelles africaines, tresses, extensions, colorations et soins capillaires professionnels.</p><h2>Article 3 – Diplôme</h2><p>Un certificat de qualification professionnelle est délivré à l'issue de la formation.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_distribution_grossiste',
    name: "Accord de service de distribution salon de beauté (grossiste)",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Contrat de distribution en gros de produits cosmétiques et de beauté pour salons professionnels, marché OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'grossiste_nom',label:"Nom du grossiste distributeur",type:'text',required:true},
      {key:'salon_nom',label:"Nom du salon client",type:'text',required:true},
      {key:'marques_distribuees',label:"Marques et produits distribués",type:'text',required:true},
      {key:'remise_professionnelle',label:"Taux de remise professionnelle (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du partenariat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DISTRIBUTION SALON DE BEAUTÉ (GROSSISTE)</h1><p><strong>Grossiste :</strong> {{grossiste_nom}}</p><p><strong>Salon client :</strong> {{salon_nom}}</p><h2>Article 1 – Objet</h2><p>Distribution professionnelle de {{marques_distribuees}} au bénéfice de {{salon_nom}}, avec une remise professionnelle de {{remise_professionnelle}} % sur les tarifs catalogue.</p><h2>Article 2 – Commande minimale</h2><p>Le salon s'engage à passer une commande mensuelle minimale dont le montant est précisé en annexe tarifaire.</p><h2>Article 3 – Durée</h2><p>Partenariat prenant effet le {{date_debut}}, renouvelable annuellement.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_franchise_salon',
    name: "Accord de franchise salon de beauté",
    category: 'commercial_financier',
    price: 15000, priceMax: 40000,
    description: "Contrat de franchise pour l'exploitation d'un salon de beauté sous enseigne, adapté au droit commercial OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      {key:'franchiseur_nom',label:"Nom du franchiseur (tête de réseau)",type:'text',required:true},
      {key:'franchise_nom',label:"Nom du franchisé",type:'text',required:true},
      {key:'enseigne',label:"Enseigne du salon",type:'text',required:true},
      {key:'droit_entree',label:"Droit d'entrée (FCFA)",type:'text',required:true},
      {key:'redevance_mensuelle',label:"Redevance mensuelle (% du CA ou forfait FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat de franchise",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FRANCHISE SALON DE BEAUTÉ</h1><p><strong>Franchiseur :</strong> {{franchiseur_nom}}</p><p><strong>Franchisé :</strong> {{franchise_nom}}</p><h2>Article 1 – Objet</h2><p>Le franchiseur concède au franchisé le droit d'exploiter un salon de beauté sous l'enseigne {{enseigne}}, moyennant un droit d'entrée de {{droit_entree}} FCFA et une redevance de {{redevance_mensuelle}}.</p><h2>Article 2 – Territoire exclusif</h2><p>Le franchisé bénéficie d'une exclusivité territoriale définie en annexe du présent contrat.</p><h2>Article 3 – Formation et support</h2><p>Le franchiseur assure une formation initiale de deux semaines et un accompagnement continu (visites terrain, assistance marketing, central d'achat).</p><h2>Article 4 – Durée</h2><p>Contrat prenant effet le {{date_debut}}, pour une durée de cinq ans renouvelable.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_rapport_performance_marque',
    name: "Rapport de performance marque cosmétique",
    category: 'commercial_financier',
    price: 4000, priceMax: 11000,
    description: "Document de reporting des indicateurs de performance commerciale et marketing d'une marque cosmétique africaine, droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'marque_nom',label:"Nom de la marque cosmétique",type:'text',required:true},
      {key:'periode',label:"Période du rapport (ex: S1 2025)",type:'text',required:true},
      {key:'ca_realise',label:"Chiffre d'affaires réalisé (FCFA)",type:'text',required:true},
      {key:'responsable_nom',label:"Nom du responsable commercial",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE MARQUE COSMÉTIQUE</h1><p><strong>Marque :</strong> {{marque_nom}}</p><p><strong>Période :</strong> {{periode}}</p><p><strong>Responsable :</strong> {{responsable_nom}}</p><h2>1. Indicateurs commerciaux</h2><p>Chiffre d'affaires réalisé : {{ca_realise}} FCFA</p><p>Évolution vs période précédente : à renseigner</p><h2>2. Performance produits</h2><p>Top 3 produits vendus, taux de retour et réclamations : à compléter.</p><h2>3. Recommandations</h2><p>Actions correctives et plan promotionnel pour la prochaine période.</p><p>Rapport établi le {{date_rapport}}.</p><p>Signature : _____________________</p></div>`
  },
  {
    code: 'cosm_plan_developpement_industrie',
    name: "Plan de développement industrie cosmétique africaine",
    category: 'commercial_financier',
    price: 6000, priceMax: 16000,
    description: "Document stratégique de développement de l'industrie cosmétique africaine locale, valorisant les matières premières du continent.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise ou groupement",type:'text',required:true},
      {key:'horizon',label:"Horizon de planification",type:'text',required:true},
      {key:'marche_cible',label:"Marché cible (national, sous-régional, export)",type:'text',required:true},
      {key:'investissement',label:"Investissement prévu (FCFA)",type:'text',required:true},
      {key:'date_validation',label:"Date de validation du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT INDUSTRIE COSMÉTIQUE AFRICAINE</h1><p><strong>Entreprise :</strong> {{entreprise_nom}}</p><p><strong>Horizon :</strong> {{horizon}}</p><h2>1. Contexte et opportunités</h2><p>Le marché cosmétique africain est en forte croissance. La valorisation des ingrédients locaux (karité, huile de palme, plantes médicinales) constitue un avantage compétitif durable.</p><h2>2. Stratégie de développement</h2><p>Marchés cibles : {{marche_cible}} — Investissement prévu : {{investissement}} FCFA</p><h2>3. Plan d'actions</h2><p>R&D, industrialisation, certification, distribution et export à planifier en annexe.</p><p>Validé le {{date_validation}}.</p><p>Signature : _____________________</p></div>`
  },
  {
    code: 'cosm_test_dermatologique',
    name: "Accord de service de test dermatologique produit",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Contrat de réalisation de tests dermatologiques sur produits cosmétiques avant mise sur le marché, zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'marque_nom',label:"Nom de la marque cliente",type:'text',required:true},
      {key:'laboratoire_nom',label:"Nom du laboratoire de dermatologie",type:'text',required:true},
      {key:'produit_teste',label:"Produit ou gamme à tester",type:'text',required:true},
      {key:'type_test',label:"Type de test (patch-test, tolérance cutanée, etc.)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des tests",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TEST DERMATOLOGIQUE PRODUIT</h1><p><strong>Marque cliente :</strong> {{marque_nom}}</p><p><strong>Laboratoire :</strong> {{laboratoire_nom}}</p><h2>Article 1 – Objet</h2><p>Réalisation de tests de type {{type_test}} sur le produit/la gamme {{produit_teste}}, débutant le {{date_debut}}.</p><h2>Article 2 – Protocole</h2><p>Le protocole de test est établi par le dermatologue responsable du laboratoire, conformément aux guidelines ISO 10993 et bonnes pratiques de dermatologie cosmétologique.</p><h2>Article 3 – Livrables</h2><p>Rapport de test signé par le dermatologue, utilisable à des fins réglementaires et marketing.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_veille_reglementaire',
    name: "Accord de service de veille réglementaire cosmétique",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Convention de veille réglementaire cosmétique pour opérateurs africains (UEMOA, UE, USA), adaptée au droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client (marque ou laboratoire)",type:'text',required:true},
      {key:'cabinet_nom',label:"Nom du cabinet de veille réglementaire",type:'text',required:true},
      {key:'perimetres_surveilles',label:"Périmètres réglementaires surveillés (UEMOA, UE, USA, etc.)",type:'text',required:true},
      {key:'frequence_rapports',label:"Fréquence des rapports de veille",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VEILLE RÉGLEMENTAIRE COSMÉTIQUE</h1><p><strong>Client :</strong> {{client_nom}}</p><p><strong>Cabinet :</strong> {{cabinet_nom}}</p><h2>Article 1 – Objet</h2><p>Mise en place d'une veille réglementaire cosmétique portant sur {{perimetres_surveilles}}, avec émission de rapports {{frequence_rapports}}.</p><h2>Article 2 – Alertes</h2><p>Toute modification réglementaire majeure (interdiction d'ingrédient, nouvelle exigence d'étiquetage) fait l'objet d'une alerte immédiate au client.</p><h2>Article 3 – Durée</h2><p>Mission débutant le {{date_debut}}, renouvelable annuellement.</p><p>Signatures : _____________________</p></div>`
  },
  {
    code: 'cosm_charte_naturel_ethique',
    name: "Charte du cosmétique naturel et éthique africain",
    category: 'commercial_financier',
    price: 3000, priceMax: 8000,
    description: "Charte d'engagement pour un cosmétique africain naturel, éthique et durable, valorisant les ressources et producteurs locaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise signataire",type:'text',required:true},
      {key:'representant_nom',label:"Nom du représentant légal",type:'text',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true},
      {key:'engagement_ethique',label:"Description des engagements éthiques",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU COSMÉTIQUE NATUREL ET ÉTHIQUE AFRICAIN</h1><p><strong>Signataire :</strong> {{entreprise_nom}}</p><p><strong>Représentant légal :</strong> {{representant_nom}}</p><h2>Préambule</h2><p>{{entreprise_nom}} s'engage à développer et commercialiser des produits cosmétiques naturels, en valorisant les ressources végétales africaines, en soutenant les productrices locales (notamment les femmes transformatrices de karité) et en adoptant une démarche zéro déchet.</p><h2>Engagements éthiques</h2><p>{{engagement_ethique}}</p><h2>Portée</h2><p>La présente charte est publique et opposable à l'ensemble de la chaîne de valeur de {{entreprise_nom}} dans la zone OHADA.</p><p>Signé le {{date_signature}}.</p><p>Signature : _____________________</p></div>`
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
  console.log(`Batch 73b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
