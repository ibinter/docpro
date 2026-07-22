import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates Bois / Menuiserie (préfixe bois2_) ───────────────────────
  {
    code: 'bois2_menuiserie_bois',
    name: "Accord de service de menuiserie bois (portes et fenêtres)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord encadrant la fabrication sur mesure de portes et fenêtres en bois entre un menuisier et son client.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'menuisier_nom',label:"Raison sociale du menuisier",type:'text',required:true},
      {key:'description_travaux',label:"Description des travaux (portes, fenêtres)",type:'textarea',required:true},
      {key:'montant',label:"Montant total FCFA",type:'text',required:true},
      {key:'delai_livraison',label:"Délai de livraison",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MENUISERIE BOIS</h1><p>Entre <strong>{{client_nom}}</strong> (ci-après le Client) et <strong>{{menuisier_nom}}</strong> (ci-après le Prestataire), il est convenu ce qui suit :</p><h2>Article 1 – Objet</h2><p>Le Prestataire s'engage à réaliser les travaux suivants : {{description_travaux}}</p><h2>Article 2 – Prix et modalités de paiement</h2><p>Le montant total des travaux est fixé à {{montant}} FCFA, payable selon les modalités convenues entre les parties.</p><h2>Article 3 – Délai d'exécution</h2><p>Le délai de livraison est fixé à {{delai_livraison}} à compter de la date de signature du présent accord.</p><h2>Article 4 – Droit applicable</h2><p>Le présent accord est soumis au droit OHADA et aux lois de la République de Côte d'Ivoire.</p><p>Fait le {{date_accord}}</p><p>Signature Client : _______________&nbsp;&nbsp;&nbsp;Signature Prestataire : _______________</p></div>`
  },
  {
    code: 'bois2_menuiserie_alu',
    name: "Accord de service de menuiserie aluminium (véranda, baie vitrée)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord pour la fabrication et pose de structures aluminium : vérandas, baies vitrées, dans le respect des normes OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Raison sociale du prestataire",type:'text',required:true},
      {key:'type_ouvrage',label:"Type d'ouvrage (véranda, baie vitrée...)",type:'text',required:true},
      {key:'surface_m2',label:"Surface en m²",type:'text',required:true},
      {key:'montant',label:"Montant total FCFA",type:'text',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MENUISERIE ALUMINIUM</h1><p>Entre <strong>{{client_nom}}</strong> (ci-après le Client) et <strong>{{prestataire_nom}}</strong> (ci-après le Prestataire).</p><h2>Article 1 – Objet</h2><p>Le Prestataire s'engage à fabriquer et poser l'ouvrage suivant : {{type_ouvrage}}, d'une surface de {{surface_m2}} m².</p><h2>Article 2 – Prix</h2><p>Montant total : {{montant}} FCFA, TVA incluse.</p><h2>Article 3 – Début des travaux</h2><p>Les travaux débuteront le {{date_debut}}.</p><h2>Article 4 – Garantie</h2><p>Le Prestataire garantit ses ouvrages contre tout vice de fabrication pendant une durée d'un (1) an.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signature Client : _______________&nbsp;&nbsp;&nbsp;Signature Prestataire : _______________</p></div>`
  },
  {
    code: 'bois2_charpente_toiture',
    name: "Accord de service de charpente et toiture bois",
    category: 'commercial_financier', price: 5000, priceMax: 18000,
    description: "Accord pour la réalisation de travaux de charpente et de couverture toiture en bois.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'localisation',label:"Localisation du chantier",type:'text',required:true},
      {key:'description_travaux',label:"Description des travaux",type:'textarea',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CHARPENTE ET TOITURE BOIS</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{entreprise_nom}}</strong>.</p><h2>Article 1 – Chantier</h2><p>Localisation : {{localisation}}</p><h2>Article 2 – Objet</h2><p>{{description_travaux}}</p><h2>Article 3 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 4 – Droit applicable</h2><p>Acte soumis au droit OHADA et aux lois ivoiriennes en vigueur.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_parquet_plancher',
    name: "Accord de service de parquet et plancher bois",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord pour la fourniture et pose de parquet ou plancher bois dans un local résidentiel ou commercial.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'type_parquet',label:"Type de parquet (massif, stratifié...)",type:'text',required:true},
      {key:'surface_m2',label:"Surface en m²",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PARQUET ET PLANCHER BOIS</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fourniture et pose de {{type_parquet}} sur une surface de {{surface_m2}} m².</p><h2>Article 2 – Prix</h2><p>Montant total : {{montant}} FCFA.</p><h2>Article 3 – Garantie</h2><p>Garantie de bonne exécution de 6 mois à compter de la réception des travaux.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_plaquage_stratifie',
    name: "Accord de service de plaquage et stratifié",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord encadrant la pose de placages bois naturels et de stratifiés pour meubles et aménagements intérieurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'fournisseur_nom',label:"Nom du fournisseur/poseur",type:'text',required:true},
      {key:'nature_produit',label:"Nature du produit (plaquage, stratifié)",type:'text',required:true},
      {key:'quantite',label:"Quantité (m² ou unités)",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PLAQUAGE ET STRATIFIÉ</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{fournisseur_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fourniture et/ou pose de {{nature_produit}}, quantité : {{quantite}}.</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Droit applicable</h2><p>Accord régi par le droit OHADA.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_escalier_bois',
    name: "Accord de service de fabrication d'escalier en bois",
    category: 'commercial_financier', price: 4500, priceMax: 14000,
    description: "Accord pour la conception, fabrication et pose d'escaliers en bois massif ou lamellé-collé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'menuisier_nom',label:"Nom du menuisier",type:'text',required:true},
      {key:'type_escalier',label:"Type d'escalier (droit, hélicoïdal...)",type:'text',required:true},
      {key:'essence_bois',label:"Essence de bois utilisée",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FABRICATION D'ESCALIER EN BOIS</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{menuisier_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fabrication et pose d'un escalier {{type_escalier}} en {{essence_bois}}.</p><h2>Article 2 – Prix</h2><p>Montant total : {{montant}} FCFA.</p><h2>Article 3 – Délais</h2><p>Les délais de livraison sont fixés d'un commun accord entre les parties.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_bardage_bois',
    name: "Accord de service de bardage bois",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord pour la fourniture et pose de bardages bois en façade de bâtiment résidentiel ou commercial.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'essence_bardage',label:"Essence du bardage",type:'text',required:true},
      {key:'surface_m2',label:"Surface en m²",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BARDAGE BOIS</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fourniture et pose de bardage en {{essence_bardage}} sur {{surface_m2}} m².</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Garantie</h2><p>Le Prestataire garantit la tenue du bardage pendant 2 ans.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_terrasse_bois',
    name: "Accord de service de terrasse bois (deck)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord pour la conception et la réalisation d'une terrasse ou deck en bois naturel ou composite.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'type_bois',label:"Type de bois (teck, ipé, WPC...)",type:'text',required:true},
      {key:'surface_m2',label:"Surface en m²",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TERRASSE BOIS (DECK)</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{entreprise_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Réalisation d'une terrasse bois en {{type_bois}} de {{surface_m2}} m².</p><h2>Article 2 – Prix</h2><p>Montant total : {{montant}} FCFA.</p><h2>Article 3 – Entretien</h2><p>Le Client s'engage à entretenir la terrasse selon les prescriptions du Prestataire.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_traitement_bois',
    name: "Accord de service de traitement du bois (insecticide, fongicide)",
    category: 'commercial_financier', price: 2500, priceMax: 7500,
    description: "Accord pour le traitement préventif et curatif du bois contre les insectes et champignons.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'type_traitement',label:"Type de traitement (insecticide, fongicide, les deux)",type:'text',required:true},
      {key:'volume_m3',label:"Volume de bois traité (m³)",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEMENT DU BOIS</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Traitement {{type_traitement}} d'un volume de {{volume_m3}} m³ de bois.</p><h2>Article 2 – Produits utilisés</h2><p>Le Prestataire utilisera des produits homologués conformes aux normes en vigueur en Côte d'Ivoire.</p><h2>Article 3 – Prix</h2><p>Montant : {{montant}} FCFA.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_sechage_bois',
    name: "Accord de service de séchage du bois (étuve)",
    category: 'commercial_financier', price: 2500, priceMax: 8000,
    description: "Accord encadrant la prestation de séchage artificiel du bois en étuve pour stabilisation de l'humidité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'volume_m3',label:"Volume à sécher (m³)",type:'text',required:true},
      {key:'taux_humidite_cible',label:"Taux d'humidité cible (%)",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCHAGE DU BOIS (ÉTUVE)</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Séchage en étuve de {{volume_m3}} m³ de bois jusqu'à un taux d'humidité cible de {{taux_humidite_cible}}%.</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Responsabilité</h2><p>Le Prestataire ne saurait être tenu responsable des défauts préexistants dans le bois livré.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_debitage_debit',
    name: "Accord de service de débitage et débit de bois",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord pour la prestation de sciage, débit et profilage de bois selon les dimensions requises par le client.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'scierie_nom',label:"Nom de la scierie",type:'text',required:true},
      {key:'essence_bois',label:"Essence de bois",type:'text',required:true},
      {key:'volume_m3',label:"Volume à débiter (m³)",type:'text',required:true},
      {key:'dimensions',label:"Dimensions souhaitées",type:'textarea',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉBITAGE ET DÉBIT DE BOIS</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{scierie_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Débit de {{volume_m3}} m³ de bois essence {{essence_bois}} aux dimensions suivantes : {{dimensions}}.</p><h2>Article 2 – Prix</h2><p>Montant total : {{montant}} FCFA.</p><h2>Article 3 – Livraison</h2><p>La livraison sera effectuée selon les modalités convenues d'un commun accord.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_vente_bois_construction',
    name: "Accord de service de vente de bois de construction",
    category: 'commercial_financier', price: 2000, priceMax: 6000,
    description: "Accord commercial pour la vente de bois de construction (plots, chevrons, voliges) destiné aux chantiers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'vendeur_nom',label:"Nom du vendeur",type:'text',required:true},
      {key:'acheteur_nom',label:"Nom de l'acheteur",type:'text',required:true},
      {key:'description_produits',label:"Description des produits",type:'textarea',required:true},
      {key:'montant_total',label:"Montant total FCFA",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENTE DE BOIS DE CONSTRUCTION</h1><p>Entre <strong>{{vendeur_nom}}</strong> (Vendeur) et <strong>{{acheteur_nom}}</strong> (Acheteur).</p><h2>Article 1 – Objet</h2><p>Le Vendeur s'engage à livrer les produits suivants : {{description_produits}}.</p><h2>Article 2 – Prix et paiement</h2><p>Montant total : {{montant_total}} FCFA.</p><h2>Article 3 – Livraison</h2><p>Date de livraison prévue : {{date_livraison}}.</p><h2>Article 4 – Droit applicable</h2><p>Acte régi par l'Acte Uniforme OHADA relatif au droit commercial général.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_vente_bois_acajou',
    name: "Accord de service de vente de bois d'acajou (Khaya, Sapelli CI)",
    category: 'commercial_financier', price: 4000, priceMax: 14000,
    description: "Accord pour la vente de grumes ou sciages d'acajou africain (Khaya, Sapelli) originaires de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'vendeur_nom',label:"Nom du vendeur",type:'text',required:true},
      {key:'acheteur_nom',label:"Nom de l'acheteur",type:'text',required:true},
      {key:'espece',label:"Espèce (Khaya ivorensis, Entandrophragma...)",type:'text',required:true},
      {key:'volume_m3',label:"Volume en m³",type:'text',required:true},
      {key:'prix_m3',label:"Prix unitaire par m³ (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENTE DE BOIS D'ACAJOU</h1><p>Entre <strong>{{vendeur_nom}}</strong> (Vendeur) et <strong>{{acheteur_nom}}</strong> (Acheteur).</p><h2>Article 1 – Objet</h2><p>Vente de {{volume_m3}} m³ de {{espece}} au prix de {{prix_m3}} FCFA/m³.</p><h2>Article 2 – Conformité légale</h2><p>Le Vendeur garantit la légalité de l'exploitation et la disponibilité des documents FLEGT/CITES requis.</p><h2>Article 3 – Droit applicable</h2><p>Acte soumis au Code forestier ivoirien et au droit OHADA.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_peluchage_contreplaque',
    name: "Accord de service de peluchage et contre-plaqué",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord pour la fabrication de placages par peluchage rotatif et production de panneaux contre-plaqués.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 49,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'usine_nom',label:"Nom de l'usine de déroulage",type:'text',required:true},
      {key:'essence_bois',label:"Essence de bois",type:'text',required:true},
      {key:'quantite_panneaux',label:"Quantité de panneaux ou de m³",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PELUCHAGE ET CONTRE-PLAQUÉ</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{usine_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Production de placages et panneaux contre-plaqués en {{essence_bois}}, quantité : {{quantite_panneaux}}.</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Qualité</h2><p>Les panneaux seront conformes aux normes ISO applicables en Côte d'Ivoire.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_cadres_encadrements',
    name: "Accord de service de fabrication de cadres et encadrements",
    category: 'commercial_financier', price: 2000, priceMax: 6000,
    description: "Accord pour la fabrication sur mesure de cadres photo, encadrements d'œuvres d'art et moulures décoratives.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 45,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'artisan_nom',label:"Nom de l'artisan",type:'text',required:true},
      {key:'description_cadres',label:"Description des cadres (dimensions, finition)",type:'textarea',required:true},
      {key:'quantite',label:"Quantité",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FABRICATION DE CADRES ET ENCADREMENTS</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{artisan_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fabrication de {{quantite}} cadres/encadrements : {{description_cadres}}.</p><h2>Article 2 – Prix</h2><p>Montant total : {{montant}} FCFA.</p><h2>Article 3 – Livraison</h2><p>Les délais de livraison sont fixés d'un commun accord entre les parties.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_objets_art_bois',
    name: "Accord de service de fabrication d'objets d'art en bois",
    category: 'commercial_financier', price: 2500, priceMax: 8000,
    description: "Accord entre un artiste ou artisan et un client pour la création d'objets d'art sculptés ou tournés en bois.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'artisan_nom',label:"Nom de l'artisan",type:'text',required:true},
      {key:'description_oeuvre',label:"Description de l'objet d'art",type:'textarea',required:true},
      {key:'essence_bois',label:"Essence de bois",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FABRICATION D'OBJETS D'ART EN BOIS</h1><p>Entre <strong>{{client_nom}}</strong> (Commanditaire) et <strong>{{artisan_nom}}</strong> (Artisan).</p><h2>Article 1 – Objet</h2><p>Création de l'objet suivant : {{description_oeuvre}}, en {{essence_bois}}.</p><h2>Article 2 – Propriété intellectuelle</h2><p>Sauf accord contraire, les droits moraux sur l'œuvre restent acquis à l'Artisan ; le Commanditaire acquiert les droits d'usage.</p><h2>Article 3 – Prix</h2><p>Montant : {{montant}} FCFA.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_sculpture_bois',
    name: "Accord de service de sculpture sur bois",
    category: 'commercial_financier', price: 3000, priceMax: 10000,
    description: "Accord pour la réalisation de sculptures sur bois à usage décoratif, religieux ou artistique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'commanditaire_nom',label:"Nom du commanditaire",type:'text',required:true},
      {key:'sculpteur_nom',label:"Nom du sculpteur",type:'text',required:true},
      {key:'sujet_sculpture',label:"Sujet / thème de la sculpture",type:'textarea',required:true},
      {key:'montant_avance',label:"Avance versée (FCFA)",type:'text',required:true},
      {key:'montant_solde',label:"Solde à la livraison (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SCULPTURE SUR BOIS</h1><p>Entre <strong>{{commanditaire_nom}}</strong> (Commanditaire) et <strong>{{sculpteur_nom}}</strong> (Sculpteur).</p><h2>Article 1 – Objet</h2><p>Réalisation d'une sculpture dont le sujet est : {{sujet_sculpture}}.</p><h2>Article 2 – Prix et acompte</h2><p>Avance versée : {{montant_avance}} FCFA. Solde à la livraison : {{montant_solde}} FCFA.</p><h2>Article 3 – Délai</h2><p>Date de livraison : {{date_livraison}}.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_gravure_laser',
    name: "Accord de service de gravure laser sur bois",
    category: 'commercial_financier', price: 2000, priceMax: 6000,
    description: "Accord pour la réalisation de gravures laser sur bois (logos, textes, illustrations) à des fins commerciales ou personnelles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 47,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'description_gravure',label:"Description de la gravure (texte, logo, dimensions)",type:'textarea',required:true},
      {key:'quantite',label:"Nombre de pièces",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GRAVURE LASER SUR BOIS</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Gravure laser de {{quantite}} pièces : {{description_gravure}}.</p><h2>Article 2 – Fichiers source</h2><p>Le Client fournit les fichiers vectoriels nécessaires dans les délais convenus.</p><h2>Article 3 – Prix</h2><p>Montant : {{montant}} FCFA.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_wpc_composite',
    name: "Accord de service de bois composite (WPC)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord pour la fourniture et mise en œuvre de profilés bois-plastique composite (WPC) pour terrasses, bardages et clôtures.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 51,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'application',label:"Application (terrasse, bardage, clôture...)",type:'text',required:true},
      {key:'surface_ml',label:"Surface (m²) ou linéaire (ml)",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BOIS COMPOSITE (WPC)</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fourniture et pose de profilés WPC pour {{application}}, quantité : {{surface_ml}}.</p><h2>Article 2 – Prix</h2><p>Montant total : {{montant}} FCFA.</p><h2>Article 3 – Entretien</h2><p>Le matériau WPC ne nécessite pas de traitement périodique ; le Client s'engage à respecter les instructions de nettoyage fournies.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_palettes_emballages',
    name: "Accord de service de palettes et emballages bois",
    category: 'commercial_financier', price: 2000, priceMax: 6000,
    description: "Accord pour la fabrication et livraison de palettes bois, caisses et emballages industriels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'fabricant_nom',label:"Nom du fabricant",type:'text',required:true},
      {key:'type_palette',label:"Type de palette / emballage",type:'text',required:true},
      {key:'quantite',label:"Quantité",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PALETTES ET EMBALLAGES BOIS</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{fabricant_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fabrication et livraison de {{quantite}} unités de {{type_palette}}.</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Normes</h2><p>Les emballages bois respectent les normes phytosanitaires NIMP 15 pour l'export.</p><p>Date de livraison : {{date_livraison}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_partenariat_scierie_export',
    name: "Accord de partenariat scierie-exportateur",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord-cadre de partenariat commercial entre une scierie et un exportateur de bois tropicaux depuis la Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'scierie_nom',label:"Dénomination de la scierie",type:'text',required:true},
      {key:'exportateur_nom',label:"Dénomination de l'exportateur",type:'text',required:true},
      {key:'essences_cibles',label:"Essences concernées",type:'text',required:true},
      {key:'volume_annuel_m3',label:"Volume annuel prévisionnel (m³)",type:'text',required:true},
      {key:'duree_accord',label:"Durée de l'accord",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT SCIERIE-EXPORTATEUR</h1><p>Entre <strong>{{scierie_nom}}</strong> (la Scierie) et <strong>{{exportateur_nom}}</strong> (l'Exportateur).</p><h2>Article 1 – Objet</h2><p>Les parties conviennent d'un partenariat pour la production et l'exportation de {{essences_cibles}}.</p><h2>Article 2 – Volumes</h2><p>Volume annuel prévisionnel : {{volume_annuel_m3}} m³.</p><h2>Article 3 – Durée</h2><p>Le présent accord est conclu pour une durée de {{duree_accord}}.</p><h2>Article 4 – Droit applicable</h2><p>Accord régi par le droit OHADA et le Code forestier ivoirien.</p><p>Fait le {{date_signature}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_rapport_performance_scierie',
    name: "Rapport de performance scierie",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Rapport périodique de suivi des indicateurs de performance d'une scierie industrielle ou artisanale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 44,
    fieldsJson: F([
      {key:'scierie_nom',label:"Nom de la scierie",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'volume_produit_m3',label:"Volume produit (m³)",type:'text',required:true},
      {key:'taux_rendement',label:"Taux de rendement matière (%)",type:'text',required:true},
      {key:'observations',label:"Observations et recommandations",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE SCIERIE</h1><h2>{{scierie_nom}} — Période : {{periode}}</h2><h3>1. Production</h3><p>Volume produit : {{volume_produit_m3}} m³</p><h3>2. Rendement matière</h3><p>Taux de rendement : {{taux_rendement}}%</p><h3>3. Observations</h3><p>{{observations}}</p><p>Rapport établi le {{date_rapport}}</p><p>Signature du responsable : _______________</p></div>`
  },
  {
    code: 'bois2_plan_dev_transformation',
    name: "Plan de développement transformation bois",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Document stratégique définissant les axes de développement d'une unité de transformation du bois en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 46,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'localisation',label:"Localisation",type:'text',required:true},
      {key:'axes_developpement',label:"Axes de développement prioritaires",type:'textarea',required:true},
      {key:'investissement_prevu',label:"Investissement prévu (FCFA)",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (ex: 2025-2028)",type:'text',required:true},
      {key:'date_document',label:"Date du document",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT — TRANSFORMATION BOIS</h1><h2>{{entreprise_nom}} | {{localisation}}</h2><h3>1. Axes de développement</h3><p>{{axes_developpement}}</p><h3>2. Investissement prévu</h3><p>{{investissement_prevu}} FCFA sur la période {{horizon_plan}}.</p><h3>3. Gouvernance</h3><p>Le suivi du plan sera assuré par la direction générale avec un reporting trimestriel.</p><p>Document établi le {{date_document}}</p><p>Validation direction : _______________</p></div>`
  },
  {
    code: 'bois2_certification_fsc',
    name: "Accord de certification bois (FSC)",
    category: 'commercial_financier', price: 5000, priceMax: 16000,
    description: "Accord accompagnant le processus de certification FSC ou PEFC d'une entreprise forestière ou d'une scierie ivoirienne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise candidate",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme de certification",type:'text',required:true},
      {key:'type_certification',label:"Type de certification (FSC FM/COC, PEFC...)",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de certification",type:'textarea',required:true},
      {key:'cout_certification',label:"Coût estimé de la certification (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du processus",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION BOIS</h1><p>Entre <strong>{{entreprise_nom}}</strong> (le Demandeur) et <strong>{{organisme_cert}}</strong> (l'Organisme de certification).</p><h2>Article 1 – Type de certification</h2><p>{{type_certification}}</p><h2>Article 2 – Périmètre</h2><p>{{perimetre}}</p><h2>Article 3 – Coût et délais</h2><p>Coût estimé : {{cout_certification}} FCFA. Début du processus : {{date_debut}}.</p><h2>Article 4 – Obligations du Demandeur</h2><p>Le Demandeur s'engage à mettre en œuvre les exigences du référentiel applicable et à permettre les audits de surveillance.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'bois2_charte_transformation_durable',
    name: "Charte de la transformation durable du bois en Afrique",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Document de charte engageant une entreprise de transformation du bois à des pratiques responsables, durables et conformes aux standards africains.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'representant',label:"Nom du représentant légal",type:'text',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques supplémentaires",type:'textarea',required:true},
      {key:'lieu_signature',label:"Lieu de signature",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA TRANSFORMATION DURABLE DU BOIS EN AFRIQUE</h1><p>Nous, <strong>{{entreprise_nom}}</strong>, représentée par <strong>{{representant}}</strong>, déclarons adhérer aux principes suivants :</p><h2>1. Légalité et traçabilité</h2><p>Nous garantissons l'origine légale de toutes nos matières premières et assurons leur traçabilité de la forêt à l'utilisateur final.</p><h2>2. Gestion durable</h2><p>Nous nous engageons à n'approvisionner qu'en forêts gérées durablement ou certifiées.</p><h2>3. Dimension sociale</h2><p>Nous respectons les droits des travailleurs et des communautés riveraines conformément aux conventions OIT.</p><h2>4. Engagements complémentaires</h2><p>{{engagements_specifiques}}</p><p>Fait à {{lieu_signature}}, le {{date_signature}}</p><p>Signature et cachet : _______________</p></div>`
  },

  // ─── 25 templates Ameublement / Décoration intérieure (préfixe meubl_) ──────
  {
    code: 'meubl_fabrication_sur_mesure',
    name: "Accord de service de fabrication de meubles sur mesure",
    category: 'commercial_financier', price: 4000, priceMax: 14000,
    description: "Accord encadrant la conception et la fabrication de mobilier sur mesure par un ébéniste ou atelier de menuiserie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'atelier_nom',label:"Nom de l'atelier",type:'text',required:true},
      {key:'description_meubles',label:"Description des meubles à fabriquer",type:'textarea',required:true},
      {key:'materiaux',label:"Matériaux utilisés",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FABRICATION DE MEUBLES SUR MESURE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{atelier_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fabrication des meubles suivants : {{description_meubles}}, en {{materiaux}}.</p><h2>Article 2 – Prix et acompte</h2><p>Montant total : {{montant}} FCFA. Un acompte de 40% est versé à la commande.</p><h2>Article 3 – Livraison</h2><p>Date de livraison prévue : {{date_livraison}}.</p><h2>Article 4 – Droit applicable</h2><p>Accord soumis au droit OHADA.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_decoration_interieure',
    name: "Accord de service de décoration d'intérieur (architecte d'intérieur)",
    category: 'commercial_financier', price: 5000, priceMax: 16000,
    description: "Accord de prestation entre un client et un architecte ou décorateur d'intérieur pour l'aménagement d'un espace.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'decorateur_nom',label:"Nom du décorateur / architecte d'intérieur",type:'text',required:true},
      {key:'local_description',label:"Description du local à décorer",type:'textarea',required:true},
      {key:'budget_global',label:"Budget global alloué (FCFA)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires du décorateur (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉCORATION D'INTÉRIEUR</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{decorateur_nom}}</strong>.</p><h2>Article 1 – Mission</h2><p>Le Décorateur est mandaté pour concevoir et superviser l'aménagement de : {{local_description}}.</p><h2>Article 2 – Budget</h2><p>Budget global : {{budget_global}} FCFA. Honoraires : {{honoraires}} FCFA.</p><h2>Article 3 – Début de mission</h2><p>La mission débute le {{date_debut}}.</p><h2>Article 4 – Propriété des plans</h2><p>Les plans et concepts créés restent la propriété intellectuelle du Décorateur jusqu'au paiement intégral des honoraires.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_home_staging',
    name: "Accord de service d'aménagement d'un appartement (home staging)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord pour une prestation de home staging visant à valoriser un bien immobilier avant sa mise en vente ou en location.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du propriétaire",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire home staging",type:'text',required:true},
      {key:'adresse_bien',label:"Adresse du bien",type:'text',required:true},
      {key:'superficie_m2',label:"Superficie en m²",type:'text',required:true},
      {key:'montant',label:"Montant de la prestation FCFA",type:'text',required:true},
      {key:'date_intervention',label:"Date d'intervention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE HOME STAGING</h1><p>Entre <strong>{{client_nom}}</strong> (le Propriétaire) et <strong>{{prestataire_nom}}</strong> (le Prestataire).</p><h2>Article 1 – Bien concerné</h2><p>Adresse : {{adresse_bien}}, superficie : {{superficie_m2}} m².</p><h2>Article 2 – Objet</h2><p>Mise en valeur du bien par la dépersonnalisation, le réaménagement et la décoration légère.</p><h2>Article 3 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 4 – Intervention</h2><p>Date d'intervention : {{date_intervention}}.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_amenagement_bureau',
    name: "Accord de service d'aménagement de bureau professionnel",
    category: 'commercial_financier', price: 5000, priceMax: 18000,
    description: "Accord pour la conception et la réalisation de l'aménagement intérieur d'un espace de bureau professionnel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'entreprise_cliente',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'adresse_bureau',label:"Adresse du bureau",type:'text',required:true},
      {key:'surface_m2',label:"Surface en m²",type:'text',required:true},
      {key:'montant',label:"Montant total FCFA",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AMÉNAGEMENT DE BUREAU PROFESSIONNEL</h1><p>Entre <strong>{{entreprise_cliente}}</strong> et <strong>{{prestataire_nom}}</strong>.</p><h2>Article 1 – Localisation</h2><p>{{adresse_bureau}}, surface : {{surface_m2}} m².</p><h2>Article 2 – Prestations</h2><p>Conception de plan d'aménagement, fourniture et pose du mobilier, pose des cloisons et finitions.</p><h2>Article 3 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 4 – Livraison</h2><p>{{date_livraison}}.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_cuisine_equipee',
    name: "Accord de service de cuisine équipée sur mesure",
    category: 'commercial_financier', price: 6000, priceMax: 20000,
    description: "Accord pour la conception, fabrication et installation d'une cuisine équipée sur mesure.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'cuisiniste_nom',label:"Nom du cuisiniste",type:'text',required:true},
      {key:'style_cuisine',label:"Style de cuisine (moderne, classique, minimaliste...)",type:'text',required:true},
      {key:'electromenager_inclus',label:"Électroménager inclus (oui/non, liste)",type:'text',required:true},
      {key:'montant',label:"Montant total FCFA",type:'text',required:true},
      {key:'date_pose',label:"Date de pose prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CUISINE ÉQUIPÉE SUR MESURE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{cuisiniste_nom}}</strong>.</p><h2>Article 1 – Concept</h2><p>Cuisine de style {{style_cuisine}}. Électroménager : {{electromenager_inclus}}.</p><h2>Article 2 – Prix</h2><p>Montant total : {{montant}} FCFA, acompte de 50% à la commande.</p><h2>Article 3 – Installation</h2><p>Date de pose : {{date_pose}}.</p><h2>Article 4 – Garantie</h2><p>Garantie 2 ans pièces et main-d'œuvre.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_dressing_rangement',
    name: "Accord de service de dressing et rangement sur mesure",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord pour la conception et la pose de dressings, armoires et systèmes de rangement sur mesure.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'type_rangement',label:"Type (dressing, armoire encastrée, bibliothèque...)",type:'text',required:true},
      {key:'dimensions',label:"Dimensions approximatives",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_pose',label:"Date de pose prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DRESSING ET RANGEMENT SUR MESURE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fourniture et pose d'un {{type_rangement}} aux dimensions : {{dimensions}}.</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Installation</h2><p>Date de pose : {{date_pose}}.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_salle_bain_sur_mesure',
    name: "Accord de service de salle de bain sur mesure",
    category: 'commercial_financier', price: 5000, priceMax: 16000,
    description: "Accord pour l'aménagement complet d'une salle de bain sur mesure incluant meuble vasque, rangements et finitions.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'elements_fournis',label:"Éléments fournis (meuble vasque, miroir, robinetterie...)",type:'textarea',required:true},
      {key:'montant',label:"Montant total FCFA",type:'text',required:true},
      {key:'date_chantier',label:"Date de début de chantier",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SALLE DE BAIN SUR MESURE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>.</p><h2>Article 1 – Éléments inclus</h2><p>{{elements_fournis}}</p><h2>Article 2 – Prix</h2><p>Montant total : {{montant}} FCFA.</p><h2>Article 3 – Chantier</h2><p>Début : {{date_chantier}}.</p><h2>Article 4 – Garantie</h2><p>Garantie étanchéité 1 an.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_tissus_rideaux',
    name: "Accord de service de tissus et rideaux d'ameublement",
    category: 'commercial_financier', price: 2500, priceMax: 8000,
    description: "Accord pour la fourniture et la confection de rideaux, voilages et tissus d'ameublement sur mesure.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'confectionneur_nom',label:"Nom du confectionneur",type:'text',required:true},
      {key:'description_commande',label:"Description de la commande (tissus, teintes, dimensions)",type:'textarea',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TISSUS ET RIDEAUX D'AMEUBLEMENT</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{confectionneur_nom}}</strong>.</p><h2>Article 1 – Commande</h2><p>{{description_commande}}</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Livraison</h2><p>Date prévue : {{date_livraison}}.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_tapisserie_revetements',
    name: "Accord de service de tapisserie et revêtements muraux",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord pour la pose de papiers peints, toiles, tissus muraux et revêtements décoratifs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'type_revetement',label:"Type de revêtement (papier peint, toile de jute, tissu...)",type:'text',required:true},
      {key:'surface_m2',label:"Surface en m²",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_pose',label:"Date de pose",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TAPISSERIE ET REVÊTEMENTS MURAUX</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Pose de {{type_revetement}} sur {{surface_m2}} m².</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Pose</h2><p>Date : {{date_pose}}.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_sol_revetement',
    name: "Accord de service de sol et revêtement de sol (parquet, carrelage)",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord pour la fourniture et pose de revêtements de sol : parquet flottant, carrelage, vinyle, moquette.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'poseur_nom',label:"Nom du poseur",type:'text',required:true},
      {key:'type_sol',label:"Type de revêtement (parquet, carrelage, vinyle...)",type:'text',required:true},
      {key:'surface_m2',label:"Surface en m²",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_pose',label:"Date de pose",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOL ET REVÊTEMENT DE SOL</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{poseur_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fourniture et pose de {{type_sol}} sur {{surface_m2}} m².</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Pose</h2><p>Date : {{date_pose}}.</p><h2>Article 4 – Garantie</h2><p>Garantie de parfait achèvement 1 an.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_peinture_decorative',
    name: "Accord de service de peinture décorative (enduit, stucco)",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord pour la réalisation de peintures décoratives, enduits à la chaux, stucco et effets de matière.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'peintre_nom',label:"Nom du peintre / décorateur",type:'text',required:true},
      {key:'technique',label:"Technique utilisée (stucco, enduit, badigeon...)",type:'text',required:true},
      {key:'surface_m2',label:"Surface en m²",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_chantier',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PEINTURE DÉCORATIVE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{peintre_nom}}</strong>.</p><h2>Article 1 – Technique</h2><p>{{technique}} sur {{surface_m2}} m².</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Début</h2><p>{{date_chantier}}.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_eclairage_ambiance',
    name: "Accord de service d'éclairage d'ambiance (luminaire)",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord pour la conception et la réalisation d'un plan lumière et la fourniture de luminaires d'ambiance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'electricien_nom',label:"Nom de l'électricien / concepteur lumière",type:'text',required:true},
      {key:'local_description',label:"Description du local",type:'text',required:true},
      {key:'type_luminaires',label:"Types de luminaires prévus",type:'textarea',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_pose',label:"Date de pose",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉCLAIRAGE D'AMBIANCE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{electricien_nom}}</strong>.</p><h2>Article 1 – Local</h2><p>{{local_description}}</p><h2>Article 2 – Luminaires</h2><p>{{type_luminaires}}</p><h2>Article 3 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 4 – Pose</h2><p>{{date_pose}}.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_mobilier_jardin',
    name: "Accord de service de mobilier de jardin et extérieur",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord pour la fourniture et la livraison de mobilier d'extérieur (tables, chaises, bains de soleil) résistant aux conditions tropicales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'fournisseur_nom',label:"Nom du fournisseur",type:'text',required:true},
      {key:'liste_mobilier',label:"Liste du mobilier commandé",type:'textarea',required:true},
      {key:'materiau',label:"Matériau (teck, rotin synthétique, aluminium...)",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MOBILIER DE JARDIN ET EXTÉRIEUR</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{fournisseur_nom}}</strong>.</p><h2>Article 1 – Commande</h2><p>{{liste_mobilier}}, matériau : {{materiau}}.</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Livraison</h2><p>{{date_livraison}}.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_mobilier_collectivite',
    name: "Accord de service de mobilier de collectivité (hôtel, restaurant)",
    category: 'commercial_financier', price: 5000, priceMax: 18000,
    description: "Accord pour la fourniture de mobilier robuste destiné aux hôtels, restaurants et établissements recevant du public.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'fournisseur_nom',label:"Nom du fournisseur",type:'text',required:true},
      {key:'type_mobilier',label:"Type de mobilier (chambre, restaurant, lobby...)",type:'text',required:true},
      {key:'nombre_unites',label:"Nombre d'unités",type:'text',required:true},
      {key:'montant',label:"Montant total FCFA",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MOBILIER DE COLLECTIVITÉ</h1><p>Entre <strong>{{etablissement_nom}}</strong> (le Client) et <strong>{{fournisseur_nom}}</strong> (le Fournisseur).</p><h2>Article 1 – Objet</h2><p>Fourniture de {{nombre_unites}} unités de {{type_mobilier}}.</p><h2>Article 2 – Prix</h2><p>Montant total : {{montant}} FCFA.</p><h2>Article 3 – Livraison</h2><p>{{date_livraison}}.</p><h2>Article 4 – Garantie</h2><p>Le mobilier de collectivité bénéficie d'une garantie d'un (1) an.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_mobilier_scolaire',
    name: "Accord de service de mobilier scolaire (école, université)",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord pour la fourniture de tables, chaises, pupitres et mobilier de bureau destinés aux établissements scolaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Nom de l'établissement scolaire",type:'text',required:true},
      {key:'fournisseur_nom',label:"Nom du fournisseur",type:'text',required:true},
      {key:'liste_mobilier',label:"Liste du mobilier (tables, chaises, tableaux...)",type:'textarea',required:true},
      {key:'quantite_totale',label:"Quantité totale",type:'text',required:true},
      {key:'montant',label:"Montant total FCFA",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MOBILIER SCOLAIRE</h1><p>Entre <strong>{{etablissement_nom}}</strong> et <strong>{{fournisseur_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>Fourniture de {{quantite_totale}} unités : {{liste_mobilier}}.</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Livraison</h2><p>{{date_livraison}}.</p><h2>Article 4 – Normes</h2><p>Le mobilier répond aux normes ergonomiques applicables aux établissements scolaires ivoiriens.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_mobilier_sante',
    name: "Accord de service de mobilier de santé (clinique, cabinet)",
    category: 'commercial_financier', price: 4000, priceMax: 14000,
    description: "Accord pour la fourniture de mobilier médical et paramédical destiné aux cliniques, cabinets et centres de santé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'structure_sante',label:"Nom de la structure de santé",type:'text',required:true},
      {key:'fournisseur_nom',label:"Nom du fournisseur",type:'text',required:true},
      {key:'type_mobilier',label:"Type de mobilier (lits, bureaux médicaux, armoires pharmacie...)",type:'textarea',required:true},
      {key:'montant',label:"Montant total FCFA",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MOBILIER DE SANTÉ</h1><p>Entre <strong>{{structure_sante}}</strong> et <strong>{{fournisseur_nom}}</strong>.</p><h2>Article 1 – Objet</h2><p>{{type_mobilier}}</p><h2>Article 2 – Prix</h2><p>Montant total : {{montant}} FCFA.</p><h2>Article 3 – Livraison</h2><p>{{date_livraison}}.</p><h2>Article 4 – Conformité</h2><p>Le mobilier livré est conforme aux normes d'hygiène et de sécurité des structures sanitaires en Côte d'Ivoire.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_mobilier_commercial',
    name: "Accord de service de mobilier commercial (boutique, showroom)",
    category: 'commercial_financier', price: 4500, priceMax: 14000,
    description: "Accord pour la conception et la fourniture de mobilier d'agencement commercial pour boutiques, showrooms et points de vente.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'agenceur_nom',label:"Nom de l'agenceur / fournisseur",type:'text',required:true},
      {key:'type_espace',label:"Type d'espace commercial",type:'text',required:true},
      {key:'surface_m2',label:"Surface en m²",type:'text',required:true},
      {key:'montant',label:"Montant total FCFA",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison et installation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MOBILIER COMMERCIAL</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{agenceur_nom}}</strong>.</p><h2>Article 1 – Espace</h2><p>{{type_espace}}, surface : {{surface_m2}} m².</p><h2>Article 2 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 3 – Installation</h2><p>Date : {{date_livraison}}.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_rembourrage_restauration',
    name: "Accord de service de rembourrage et restauration de meubles",
    category: 'commercial_financier', price: 2500, priceMax: 8000,
    description: "Accord pour la restauration et le rembourrage de meubles anciens ou usagés par un tapissier garnisseur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'tapissier_nom',label:"Nom du tapissier garnisseur",type:'text',required:true},
      {key:'description_meubles',label:"Description des meubles à restaurer",type:'textarea',required:true},
      {key:'tissu_choisi',label:"Tissu ou matériau de rembourrage choisi",type:'text',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true},
      {key:'date_retrait',label:"Date de remise des meubles",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REMBOURRAGE ET RESTAURATION DE MEUBLES</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{tapissier_nom}}</strong>.</p><h2>Article 1 – Meubles concernés</h2><p>{{description_meubles}}</p><h2>Article 2 – Tissu / matériau</h2><p>{{tissu_choisi}}</p><h2>Article 3 – Prix</h2><p>Montant : {{montant}} FCFA.</p><h2>Article 4 – Remise</h2><p>Date de remise : {{date_retrait}}.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_location_mobilier_event',
    name: "Accord de service de location de mobilier (événementiel)",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord de location de mobilier événementiel (tables, chaises, stands, lounges) pour mariages, conférences et fêtes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'locataire_nom',label:"Nom du locataire",type:'text',required:true},
      {key:'loueur_nom',label:"Nom du loueur",type:'text',required:true},
      {key:'liste_materiel',label:"Liste du matériel loué",type:'textarea',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'montant_location',label:"Montant de la location FCFA",type:'text',required:true},
      {key:'caution',label:"Montant de la caution FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LOCATION DE MOBILIER ÉVÉNEMENTIEL</h1><p>Entre <strong>{{locataire_nom}}</strong> (le Locataire) et <strong>{{loueur_nom}}</strong> (le Loueur).</p><h2>Article 1 – Matériel loué</h2><p>{{liste_materiel}}</p><h2>Article 2 – Date d'événement</h2><p>{{date_evenement}}</p><h2>Article 3 – Prix et caution</h2><p>Montant de location : {{montant_location}} FCFA. Caution : {{caution}} FCFA, restituée après retour du matériel en bon état.</p><h2>Article 4 – Responsabilité</h2><p>Tout dommage causé au matériel sera à la charge du Locataire.</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_vente_mobilier_ecommerce',
    name: "Accord de service de vente de mobilier en ligne (e-commerce déco)",
    category: 'commercial_financier', price: 3000, priceMax: 10000,
    description: "Accord-cadre entre une plateforme e-commerce et un fournisseur de mobilier / décoration pour la vente en ligne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'fournisseur_nom',label:"Nom du fournisseur de mobilier",type:'text',required:true},
      {key:'plateforme_nom',label:"Nom de la plateforme e-commerce",type:'text',required:true},
      {key:'categories_produits',label:"Catégories de produits vendus",type:'text',required:true},
      {key:'commission_pct',label:"Taux de commission de la plateforme (%)",type:'text',required:true},
      {key:'duree_accord',label:"Durée de l'accord",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENTE DE MOBILIER EN LIGNE (E-COMMERCE DÉCO)</h1><p>Entre <strong>{{fournisseur_nom}}</strong> (le Fournisseur) et <strong>{{plateforme_nom}}</strong> (la Plateforme).</p><h2>Article 1 – Objet</h2><p>Mise en ligne et commercialisation des catégories : {{categories_produits}}.</p><h2>Article 2 – Commission</h2><p>La Plateforme perçoit une commission de {{commission_pct}}% sur chaque vente réalisée.</p><h2>Article 3 – Durée</h2><p>{{duree_accord}}.</p><h2>Article 4 – Droit applicable</h2><p>Accord régi par le droit OHADA et la législation ivoirienne sur le commerce électronique.</p><p>Fait le {{date_signature}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_partenariat_designer_fabricant',
    name: "Accord de partenariat designer-fabricant mobilier",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de collaboration entre un designer de mobilier et un fabricant pour la production et la commercialisation d'une collection.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'designer_nom',label:"Nom du designer",type:'text',required:true},
      {key:'fabricant_nom',label:"Nom du fabricant",type:'text',required:true},
      {key:'collection_nom',label:"Nom de la collection",type:'text',required:true},
      {key:'redevance_pct',label:"Redevance du designer sur les ventes (%)",type:'text',required:true},
      {key:'duree_accord',label:"Durée de l'accord",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT DESIGNER-FABRICANT MOBILIER</h1><p>Entre <strong>{{designer_nom}}</strong> (le Designer) et <strong>{{fabricant_nom}}</strong> (le Fabricant).</p><h2>Article 1 – Collection</h2><p>{{collection_nom}}</p><h2>Article 2 – Droits et redevances</h2><p>Le Designer perçoit une redevance de {{redevance_pct}}% sur le prix de vente HT de chaque pièce commercialisée.</p><h2>Article 3 – Exclusivité</h2><p>Le Fabricant s'engage à ne produire la collection qu'avec l'accord du Designer.</p><h2>Article 4 – Durée</h2><p>{{duree_accord}}.</p><p>Fait le {{date_signature}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_sourcing_mobilier_import',
    name: "Accord de service de sourcing mobilier (import Chine, Vietnam)",
    category: 'commercial_financier', price: 5000, priceMax: 16000,
    description: "Accord entre un importateur africain et un agent de sourcing pour l'achat de mobilier en Asie (Chine, Vietnam, Inde).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'importateur_nom',label:"Nom de l'importateur",type:'text',required:true},
      {key:'agent_nom',label:"Nom de l'agent de sourcing",type:'text',required:true},
      {key:'pays_origine',label:"Pays d'origine (Chine, Vietnam...)",type:'text',required:true},
      {key:'budget_achat',label:"Budget d'achat (USD ou FCFA)",type:'text',required:true},
      {key:'honoraires_agent',label:"Honoraires de l'agent (%)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOURCING MOBILIER</h1><p>Entre <strong>{{importateur_nom}}</strong> (l'Importateur) et <strong>{{agent_nom}}</strong> (l'Agent).</p><h2>Article 1 – Mission</h2><p>L'Agent est mandaté pour sourcer et négocier l'achat de mobilier en provenance de {{pays_origine}}.</p><h2>Article 2 – Budget</h2><p>Budget d'achat : {{budget_achat}}.</p><h2>Article 3 – Honoraires</h2><p>L'Agent perçoit {{honoraires_agent}}% du montant total des achats réalisés.</p><h2>Article 4 – Responsabilité douanière</h2><p>L'Importateur assume l'ensemble des formalités douanières ivoiriennes.</p><p>Fait le {{date_accord}}</p><p>Signatures : _______________&nbsp;&nbsp;&nbsp;_______________</p></div>`
  },
  {
    code: 'meubl_rapport_performance_atelier',
    name: "Rapport de performance atelier de mobilier",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Rapport périodique de suivi des indicateurs de production et de qualité d'un atelier de fabrication de mobilier.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 43,
    fieldsJson: F([
      {key:'atelier_nom',label:"Nom de l'atelier",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'nombre_commandes',label:"Nombre de commandes traitées",type:'text',required:true},
      {key:'taux_satisfaction',label:"Taux de satisfaction client (%)",type:'text',required:true},
      {key:'observations',label:"Observations et axes d'amélioration",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE ATELIER DE MOBILIER</h1><h2>{{atelier_nom}} — Période : {{periode}}</h2><h3>1. Activité</h3><p>Nombre de commandes traitées : {{nombre_commandes}}</p><h3>2. Satisfaction client</h3><p>Taux de satisfaction : {{taux_satisfaction}}%</p><h3>3. Observations</h3><p>{{observations}}</p><p>Rapport établi le {{date_rapport}}</p><p>Signature du responsable : _______________</p></div>`
  },
  {
    code: 'meubl_plan_dev_marque_mobilier',
    name: "Plan de développement marque de mobilier africain",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Document stratégique pour le développement d'une marque de mobilier africain à fort ancrage culturel et artisanal.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'marque_nom',label:"Nom de la marque",type:'text',required:true},
      {key:'fondateur_nom',label:"Nom du fondateur / dirigeant",type:'text',required:true},
      {key:'vision',label:"Vision de la marque",type:'textarea',required:true},
      {key:'marches_cibles',label:"Marchés cibles (Côte d'Ivoire, CEDEAO, export...)",type:'text',required:true},
      {key:'investissement_prevu',label:"Investissement prévu (FCFA)",type:'text',required:true},
      {key:'date_document',label:"Date du document",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT — MARQUE DE MOBILIER AFRICAIN</h1><h2>{{marque_nom}} — Fondateur : {{fondateur_nom}}</h2><h3>1. Vision</h3><p>{{vision}}</p><h3>2. Marchés cibles</h3><p>{{marches_cibles}}</p><h3>3. Investissement</h3><p>{{investissement_prevu}} FCFA.</p><h3>4. Identité culturelle</h3><p>La marque valorisera les savoir-faire artisanaux locaux, les essences africaines et les motifs de la culture ivoirienne et ouest-africaine.</p><p>Document établi le {{date_document}}</p><p>Validation : _______________</p></div>`
  },
  {
    code: 'meubl_charte_design_africain',
    name: "Charte du design d'intérieur africain et du savoir-faire local",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Charte engageant des professionnels du design d'intérieur à promouvoir les matériaux, les artisans et les styles africains dans leurs projets.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'signataire_nom',label:"Nom du signataire (individu ou entreprise)",type:'text',required:true},
      {key:'profession',label:"Profession ou titre",type:'text',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques complémentaires",type:'textarea',required:true},
      {key:'lieu_signature',label:"Lieu de signature",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU DESIGN D'INTÉRIEUR AFRICAIN ET DU SAVOIR-FAIRE LOCAL</h1><p>Je soussigné(e), <strong>{{signataire_nom}}</strong>, {{profession}}, m'engage à respecter les principes suivants :</p><h2>1. Promotion des matériaux locaux</h2><p>Je privilégierai l'utilisation de matériaux africains (bois, terre, raphia, tissus locaux) dans mes projets de décoration et d'aménagement intérieur.</p><h2>2. Valorisation des artisans</h2><p>Je ferai appel en priorité à des artisans locaux qualifiés et contribuerai à la visibilité de leur savoir-faire.</p><h2>3. Respect du patrimoine culturel</h2><p>J'intègrerai avec respect les motifs, couleurs et symboles culturels africains dans mes créations.</p><h2>4. Engagements complémentaires</h2><p>{{engagements_specifiques}}</p><p>Fait à {{lieu_signature}}, le {{date_signature}}</p><p>Signature : _______________</p></div>`
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
  console.log(`Batch 98b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
