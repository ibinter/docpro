import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── IMPRIMERIE / ARTS GRAPHIQUES (impr3_) ──────────────────────────────────
  {
    code: 'impr3_offset', name: "Accord de service d'impression offset (catalogues, livres)",
    category: 'commercial_financier', price: 5000, priceMax: 18000,
    description: "Contrat OHADA encadrant la prestation d'impression offset pour catalogues, livres et documents à fort tirage.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'imprimeur_nom',label:"Nom de l'imprimeur",type:'text',required:true},
      {key:'tirage',label:"Tirage (nombre d'exemplaires)",type:'text',required:true},
      {key:'format_document',label:"Format du document (ex: A4, A5)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true},
      {key:'prix_total',label:"Prix total FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMPRESSION OFFSET</h1><p>Entre <strong>{{client_nom}}</strong> (ci-après «le Client») et <strong>{{imprimeur_nom}}</strong> (ci-après «l'Imprimeur»), il est convenu ce qui suit :</p><h2>Article 1 – Objet</h2><p>L'Imprimeur s'engage à réaliser un tirage offset de <strong>{{tirage}}</strong> exemplaires au format <strong>{{format_document}}</strong>, conformément aux fichiers fournis par le Client.</p><h2>Article 2 – Délai de livraison</h2><p>La livraison est prévue pour le <strong>{{date_livraison}}</strong>.</p><h2>Article 3 – Prix</h2><p>Le montant total de la prestation est fixé à <strong>{{prix_total}} FCFA</strong> TTC.</p><h2>Article 4 – Droit applicable</h2><p>Le présent accord est régi par l'Acte uniforme OHADA sur le droit commercial général.</p><p>Fait à Abidjan, le {{date_livraison}}</p></div>`
  },
  {
    code: 'impr3_numerique', name: "Accord de service d'impression numérique (petites séries)",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Contrat OHADA pour prestations d'impression numérique en petites séries, personnalisées ou à la demande.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'nature_impression',label:"Nature des documents à imprimer",type:'text',required:true},
      {key:'quantite',label:"Quantité",type:'text',required:true},
      {key:'date_remise',label:"Date de remise des fichiers",type:'date',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMPRESSION NUMÉRIQUE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>, il est convenu :</p><h2>Article 1 – Objet</h2><p>Le prestataire réalisera l'impression numérique de <strong>{{quantite}}</strong> exemplaires de <strong>{{nature_impression}}</strong>.</p><h2>Article 2 – Fichiers</h2><p>Le client fournira les fichiers prêts à imprimer avant le <strong>{{date_remise}}</strong>.</p><h2>Article 3 – Tarif</h2><p>Montant : <strong>{{montant}} FCFA</strong>.</p><h2>Article 4 – Droit applicable</h2><p>Droit OHADA et législation ivoirienne en vigueur.</p></div>`
  },
  {
    code: 'impr3_grand_format', name: "Accord de service d'impression grand format (bannières, bâches)",
    category: 'commercial_financier', price: 4000, priceMax: 14000,
    description: "Contrat pour l'impression grand format de bannières, bâches publicitaires et supports de communication extérieure.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'imprimeur_nom',label:"Nom de l'imprimeur",type:'text',required:true},
      {key:'dimensions',label:"Dimensions des supports (ex: 3m x 2m)",type:'text',required:true},
      {key:'quantite',label:"Quantité de supports",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'prix',label:"Prix FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMPRESSION GRAND FORMAT</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{imprimeur_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Impression grand format de <strong>{{quantite}}</strong> support(s) de dimensions <strong>{{dimensions}}</strong> (bannières, bâches ou affiches grand format).</p><h2>Article 2 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p><h2>Article 3 – Prix</h2><p>Prix convenu : <strong>{{prix}} FCFA</strong>.</p><h2>Article 4 – Garantie</h2><p>L'imprimeur garantit la tenue des couleurs et la résistance aux intempéries pendant 12 mois.</p></div>`
  },
  {
    code: 'impr3_serigraphie', name: "Accord de service de sérigraphie (textile, objet)",
    category: 'commercial_financier', price: 3500, priceMax: 11000,
    description: "Contrat OHADA encadrant les prestations de sérigraphie sur textile (t-shirts, polos) et objets promotionnels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'atelier_nom',label:"Nom de l'atelier",type:'text',required:true},
      {key:'support',label:"Type de support (textile, objet)",type:'text',required:true},
      {key:'couleurs',label:"Nombre de couleurs",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉRIGRAPHIE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{atelier_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Sérigraphie sur <strong>{{support}}</strong> en <strong>{{couleurs}}</strong> couleur(s) conformément au bon de commande annexé.</p><h2>Article 2 – Délai</h2><p>Livraison prévue le <strong>{{date_livraison}}</strong>.</p><h2>Article 3 – Responsabilité</h2><p>Le client fournit les supports à sérigraphier. L'atelier n'est pas responsable des défauts inhérents aux supports fournis.</p></div>`
  },
  {
    code: 'impr3_sublimation', name: "Accord de service de sublimation (mug, textile)",
    category: 'commercial_financier', price: 2500, priceMax: 8000,
    description: "Contrat pour prestations de sublimation thermique sur mugs, textiles et objets promotionnels personnalisés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'produits',label:"Produits à personnaliser",type:'text',required:true},
      {key:'quantite',label:"Quantité",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUBLIMATION</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Personnalisation par sublimation thermique de <strong>{{quantite}}</strong> unité(s) de <strong>{{produits}}</strong>.</p><h2>Article 2 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p><h2>Article 3 – Qualité</h2><p>Le prestataire garantit la fixité des couleurs sous conditions normales d'utilisation.</p></div>`
  },
  {
    code: 'impr3_tampographie', name: "Accord de service de tampographie",
    category: 'commercial_financier', price: 2500, priceMax: 8000,
    description: "Contrat OHADA pour la personnalisation d'objets promotionnels et industriels par tampographie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'atelier_nom',label:"Nom de l'atelier",type:'text',required:true},
      {key:'objets',label:"Description des objets",type:'text',required:true},
      {key:'quantite',label:"Quantité",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TAMPOGRAPHIE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{atelier_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Personnalisation par tampographie de <strong>{{quantite}}</strong> unité(s) de <strong>{{objets}}</strong> selon le fichier logo fourni par le client.</p><h2>Article 2 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p><h2>Article 3 – Conditions techniques</h2><p>L'atelier établira un bon à tirer (BAT) soumis à validation du client avant lancement de la production.</p></div>`
  },
  {
    code: 'impr3_dorure', name: "Accord de service de dorure à chaud",
    category: 'commercial_financier', price: 4000, priceMax: 14000,
    description: "Contrat pour la finition de dorure à chaud (hot stamping) sur documents, emballages et supports luxe.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'atelier_nom',label:"Nom de l'atelier de finition",type:'text',required:true},
      {key:'support',label:"Type de support",type:'text',required:true},
      {key:'couleur_feuille',label:"Couleur de la feuille (or, argent, bronze...)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'prix',label:"Prix FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DORURE À CHAUD</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{atelier_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Application d'une finition dorure à chaud de couleur <strong>{{couleur_feuille}}</strong> sur <strong>{{support}}</strong> fourni par le client.</p><h2>Article 2 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p><h2>Article 3 – Prix</h2><p>Prix convenu : <strong>{{prix}} FCFA</strong>.</p></div>`
  },
  {
    code: 'impr3_gaufrage', name: "Accord de service de gaufrage et embossage",
    category: 'commercial_financier', price: 4500, priceMax: 15000,
    description: "Contrat OHADA pour prestations de gaufrage (relief) et embossage sur papier, carton et matériaux divers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'atelier_nom',label:"Nom de l'atelier",type:'text',required:true},
      {key:'support',label:"Support à travailler",type:'text',required:true},
      {key:'motif',label:"Description du motif en relief",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GAUFRAGE ET EMBOSSAGE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{atelier_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Réalisation d'un gaufrage ou embossage représentant <strong>{{motif}}</strong> sur <strong>{{support}}</strong>.</p><h2>Article 2 – Outillage</h2><p>Un cliché de gaufrage sera fabriqué aux frais du client et lui restera propriété à l'issue du contrat.</p><h2>Article 3 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'impr3_vernis_uv', name: "Accord de service de vernis sélectif UV",
    category: 'commercial_financier', price: 3500, priceMax: 11000,
    description: "Contrat pour l'application de vernis sélectif UV sur supports imprimés à des fins esthétiques et protectrices.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'imprimeur_nom',label:"Nom de l'imprimeur/finisseur",type:'text',required:true},
      {key:'support',label:"Support (plaquette, carte...)",type:'text',required:true},
      {key:'zones_vernis',label:"Zones concernées par le vernis",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VERNIS SÉLECTIF UV</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{imprimeur_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Application d'un vernis sélectif UV sur les zones <strong>{{zones_vernis}}</strong> du support <strong>{{support}}</strong>.</p><h2>Article 2 – Rendu</h2><p>Un BAT sera soumis avant production. Le client dispose de 48h pour validation.</p><h2>Article 3 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'impr3_pelliculage', name: "Accord de service de pelliculage (mat, brillant)",
    category: 'commercial_financier', price: 3000, priceMax: 10000,
    description: "Contrat pour le pelliculage mat ou brillant de documents imprimés, couvertures de livres et emballages.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'finisseur_nom',label:"Nom du finisseur",type:'text',required:true},
      {key:'type_pelliculage',label:"Type de pelliculage (mat ou brillant)",type:'text',required:true},
      {key:'quantite',label:"Nombre de feuilles/documents",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PELLICULAGE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{finisseur_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Pelliculage <strong>{{type_pelliculage}}</strong> de <strong>{{quantite}}</strong> document(s).</p><h2>Article 2 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p><h2>Article 3 – Responsabilité</h2><p>Le finisseur garantit un pelliculage homogène sans bulles ni décollements dans des conditions normales d'utilisation.</p></div>`
  },
  {
    code: 'impr3_brochage', name: "Accord de service de brochage et reliure",
    category: 'commercial_financier', price: 3000, priceMax: 10000,
    description: "Contrat OHADA pour la finition de documents imprimés par brochage, reliure spirale, dos carré collé ou cousu.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'atelier_nom',label:"Nom de l'atelier de reliure",type:'text',required:true},
      {key:'type_reliure',label:"Type de reliure (spirale, dos carré collé...)",type:'text',required:true},
      {key:'nombre_exemplaires',label:"Nombre d'exemplaires",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BROCHAGE ET RELIURE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{atelier_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Réalisation d'une reliure de type <strong>{{type_reliure}}</strong> pour <strong>{{nombre_exemplaires}}</strong> exemplaires fournis imprimés.</p><h2>Article 2 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p><h2>Article 3 – Contrôle qualité</h2><p>L'atelier effectuera un contrôle de la planéité et de la solidité de chaque exemplaire.</p></div>`
  },
  {
    code: 'impr3_routage', name: "Accord de service de routage et mise sous pli",
    category: 'commercial_financier', price: 3500, priceMax: 12000,
    description: "Contrat encadrant les prestations de routage postal, mise sous pli et affranchissement de mailings.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'routeur_nom',label:"Nom du routeur",type:'text',required:true},
      {key:'volume_envois',label:"Volume d'envois",type:'text',required:true},
      {key:'date_expedition',label:"Date d'expédition prévue",type:'date',required:true},
      {key:'prix',label:"Prix FCFA HT",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE ROUTAGE ET MISE SOUS PLI</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{routeur_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Routage et mise sous pli de <strong>{{volume_envois}}</strong> envois postaux, incluant l'adressage et le tri postal.</p><h2>Article 2 – Calendrier</h2><p>Expédition prévue le <strong>{{date_expedition}}</strong>.</p><h2>Article 3 – Prix</h2><p>Prix HT : <strong>{{prix}} FCFA</strong>, hors frais postaux.</p></div>`
  },
  {
    code: 'impr3_creation_graphique', name: "Accord de service de création graphique (logo, charte graphique)",
    category: 'commercial_financier', price: 5000, priceMax: 20000,
    description: "Contrat de création graphique portant sur la conception de logo, charte graphique et identité visuelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'studio_nom',label:"Nom du studio graphique",type:'text',required:true},
      {key:'mission',label:"Description de la mission",type:'textarea',required:true},
      {key:'nb_propositions',label:"Nombre de propositions créatives",type:'text',required:true},
      {key:'date_remise',label:"Date de remise des créations",type:'date',required:true},
      {key:'honoraires',label:"Honoraires FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CRÉATION GRAPHIQUE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{studio_nom}}</strong> (ci-après «le Studio») :</p><h2>Article 1 – Objet</h2><p>Création graphique : <strong>{{mission}}</strong>. Le Studio présentera <strong>{{nb_propositions}}</strong> proposition(s) créative(s).</p><h2>Article 2 – Délai</h2><p>Remise des créations le <strong>{{date_remise}}</strong>.</p><h2>Article 3 – Propriété intellectuelle</h2><p>Les droits de propriété intellectuelle sur les créations retenues seront cédés au client après règlement intégral des honoraires.</p><h2>Article 4 – Honoraires</h2><p>Honoraires : <strong>{{honoraires}} FCFA</strong>.</p></div>`
  },
  {
    code: 'impr3_pao', name: "Accord de service de PAO (mise en page)",
    category: 'commercial_financier', price: 4000, priceMax: 14000,
    description: "Contrat OHADA pour les prestations de publication assistée par ordinateur (PAO) et mise en page professionnelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'studio_nom',label:"Nom du studio/maquettiste",type:'text',required:true},
      {key:'type_document',label:"Type de document (catalogue, revue...)",type:'text',required:true},
      {key:'nb_pages',label:"Nombre de pages",type:'text',required:true},
      {key:'date_bat',label:"Date du BAT",type:'date',required:true},
      {key:'prix',label:"Prix FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PAO – MISE EN PAGE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{studio_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Mise en page d'un <strong>{{type_document}}</strong> de <strong>{{nb_pages}}</strong> pages, incluant l'intégration des textes et visuels fournis par le client.</p><h2>Article 2 – BAT</h2><p>Un bon à tirer (BAT) numérique sera fourni le <strong>{{date_bat}}</strong> pour validation client.</p><h2>Article 3 – Prix</h2><p>Prix : <strong>{{prix}} FCFA</strong>.</p></div>`
  },
  {
    code: 'impr3_photogravure', name: "Accord de service de photogravure et photolithographie",
    category: 'commercial_financier', price: 6000, priceMax: 20000,
    description: "Contrat pour la réalisation de films, plaques et travaux de photogravure préparatoires à l'impression.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 44,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'travaux',label:"Description des travaux de photogravure",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'prix',label:"Prix FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAVURE ET PHOTOLITHOGRAPHIE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Réalisation des travaux de photogravure suivants : <strong>{{travaux}}</strong>.</p><h2>Article 2 – Délai</h2><p>Livraison des éléments le <strong>{{date_livraison}}</strong>.</p><h2>Article 3 – Prix</h2><p>Prix : <strong>{{prix}} FCFA</strong>.</p><h2>Article 4 – Propriété</h2><p>Les films et plaques restent la propriété du client après règlement.</p></div>`
  },
  {
    code: 'impr3_securite', name: "Accord de service d'impression de sécurité (billets, titres)",
    category: 'commercial_financier', price: 10000, priceMax: 35000,
    description: "Contrat sécurisé OHADA pour l'impression de documents de valeur, billets, titres et supports infalsifiables.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'donneur_ordre',label:"Donneur d'ordre",type:'text',required:true},
      {key:'imprimeur_agree',label:"Imprimeur agréé",type:'text',required:true},
      {key:'nature_document',label:"Nature du document de sécurité",type:'text',required:true},
      {key:'tirage',label:"Tirage",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison sécurisée",type:'date',required:true},
      {key:'montant',label:"Montant FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMPRESSION DE SÉCURITÉ</h1><p>CONFIDENTIEL – Entre <strong>{{donneur_ordre}}</strong> et <strong>{{imprimeur_agree}}</strong> :</p><h2>Article 1 – Objet</h2><p>Impression sécurisée de <strong>{{tirage}}</strong> exemplaires de <strong>{{nature_document}}</strong> avec dispositifs anti-contrefaçon.</p><h2>Article 2 – Confidentialité</h2><p>L'imprimeur s'engage à une confidentialité absolue et à la destruction des chutes de production.</p><h2>Article 3 – Délai</h2><p>Livraison sécurisée le <strong>{{date_livraison}}</strong>.</p><h2>Article 4 – Montant</h2><p>Montant : <strong>{{montant}} FCFA</strong>.</p></div>`
  },
  {
    code: 'impr3_etiquettes', name: "Accord de service d'impression d'étiquettes adhésives",
    category: 'commercial_financier', price: 3000, priceMax: 10000,
    description: "Contrat pour la production d'étiquettes adhésives pour produits alimentaires, cosmétiques ou industriels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'imprimeur_nom',label:"Nom de l'imprimeur",type:'text',required:true},
      {key:'format_etiquette',label:"Format de l'étiquette (mm x mm)",type:'text',required:true},
      {key:'quantite',label:"Quantité",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMPRESSION D'ÉTIQUETTES ADHÉSIVES</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{imprimeur_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Production de <strong>{{quantite}}</strong> étiquettes adhésives au format <strong>{{format_etiquette}}</strong>, conformes aux fichiers validés.</p><h2>Article 2 – Normes</h2><p>Les étiquettes respecteront les normes d'impression applicables en Côte d'Ivoire.</p><h2>Article 3 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'impr3_cartes_visite', name: "Accord de service d'impression de cartes de visite",
    category: 'commercial_financier', price: 2000, priceMax: 6000,
    description: "Contrat simplifié OHADA pour la production de cartes de visite professionnelles en offset ou numérique.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 75,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'imprimeur_nom',label:"Nom de l'imprimeur",type:'text',required:true},
      {key:'quantite',label:"Quantité de cartes",type:'text',required:true},
      {key:'finition',label:"Finition (mat, brillant, soft touch...)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMPRESSION DE CARTES DE VISITE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{imprimeur_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Impression de <strong>{{quantite}}</strong> cartes de visite format 85x54mm avec finition <strong>{{finition}}</strong>.</p><h2>Article 2 – Fichier</h2><p>Le client fournit les fichiers en format PDF haute résolution (300 dpi minimum).</p><h2>Article 3 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'impr3_marketing_direct', name: "Accord de service de marketing direct (flyers, brochures)",
    category: 'commercial_financier', price: 4000, priceMax: 14000,
    description: "Contrat pour la conception et l'impression de supports de marketing direct (flyers, brochures, dépliants).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'agence_nom',label:"Nom de l'agence/imprimeur",type:'text',required:true},
      {key:'type_support',label:"Type de support (flyer, brochure...)",type:'text',required:true},
      {key:'quantite',label:"Quantité",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'budget',label:"Budget total FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MARKETING DIRECT</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{agence_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Conception et impression de <strong>{{quantite}}</strong> supports de type <strong>{{type_support}}</strong>.</p><h2>Article 2 – Budget</h2><p>Budget alloué : <strong>{{budget}} FCFA</strong> incluant création et impression.</p><h2>Article 3 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'impr3_partenariat_agence', name: "Accord de partenariat imprimeur-agence de communication",
    category: 'commercial_financier', price: 6000, priceMax: 20000,
    description: "Accord-cadre de partenariat entre une imprimerie et une agence de communication pour missions récurrentes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'imprimeur_nom',label:"Nom de l'imprimeur",type:'text',required:true},
      {key:'agence_nom',label:"Nom de l'agence de communication",type:'text',required:true},
      {key:'duree_accord',label:"Durée de l'accord (ex: 1 an)",type:'text',required:true},
      {key:'remise_accordee',label:"Remise accordée (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT IMPRIMEUR – AGENCE DE COMMUNICATION</h1><p>Entre <strong>{{imprimeur_nom}}</strong> et <strong>{{agence_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Partenariat commercial exclusif pour une durée de <strong>{{duree_accord}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 – Avantages</h2><p>L'agence bénéficiera d'une remise de <strong>{{remise_accordee}}%</strong> sur le tarif public de l'imprimeur.</p><h2>Article 3 – Engagements</h2><p>L'agence s'engage à orienter en priorité ses commandes vers l'imprimeur partenaire.</p></div>`
  },
  {
    code: 'impr3_fourniture_papier', name: "Accord de fourniture de papier et consommables d'impression",
    category: 'commercial_financier', price: 4000, priceMax: 14000,
    description: "Contrat d'approvisionnement en papier, encres et consommables pour imprimeries et ateliers de reprographie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'acheteur_nom',label:"Nom de l'acheteur",type:'text',required:true},
      {key:'fournisseur_nom',label:"Nom du fournisseur",type:'text',required:true},
      {key:'produits',label:"Produits concernés",type:'textarea',required:true},
      {key:'prix_unitaire',label:"Prix unitaire FCFA",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FOURNITURE DE PAPIER ET CONSOMMABLES</h1><p>Entre <strong>{{acheteur_nom}}</strong> et <strong>{{fournisseur_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Fourniture régulière des produits suivants : <strong>{{produits}}</strong>.</p><h2>Article 2 – Tarif</h2><p>Prix unitaire : <strong>{{prix_unitaire}} FCFA</strong>, révisable annuellement par accord des parties.</p><h2>Article 3 – Durée</h2><p>Accord à durée indéterminée à compter du <strong>{{date_debut}}</strong>, résiliable avec préavis de 30 jours.</p></div>`
  },
  {
    code: 'impr3_gestion_stock', name: "Accord de service de gestion de stock d'imprimés",
    category: 'commercial_financier', price: 4000, priceMax: 13000,
    description: "Contrat de sous-traitance pour le stockage, la gestion et la distribution d'imprimés pour le compte d'un client.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'logisticien_nom',label:"Nom du logisticien/imprimeur stockeur",type:'text',required:true},
      {key:'references_stockees',label:"Références stockées",type:'textarea',required:true},
      {key:'duree',label:"Durée de l'accord",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE STOCK D'IMPRIMÉS</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{logisticien_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Stockage et gestion des références suivantes : <strong>{{references_stockees}}</strong> pour une durée de <strong>{{duree}}</strong>.</p><h2>Article 2 – Responsabilité</h2><p>Le logisticien est responsable des imprimés dès réception en entrepôt.</p><h2>Article 3 – Début</h2><p>Prise d'effet le <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'impr3_rapport_performance', name: "Rapport de performance imprimerie",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Modèle de rapport de performance mensuel ou trimestriel pour une imprimerie (production, qualité, finances).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'imprimerie_nom',label:"Nom de l'imprimerie",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'volume_produit',label:"Volume produit (ex: 500 000 pages)",type:'text',required:true},
      {key:'taux_rebut',label:"Taux de rebut (%)",type:'text',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – IMPRIMERIE</h1><h2>{{imprimerie_nom}}</h2><p>Période : <strong>{{periode}}</strong></p><h2>Indicateurs de production</h2><p>Volume produit : <strong>{{volume_produit}}</strong> | Taux de rebut : <strong>{{taux_rebut}}%</strong></p><h2>Indicateurs financiers</h2><p>Chiffre d'affaires : <strong>{{chiffre_affaires}} FCFA</strong></p><h2>Analyse et perspectives</h2><p>Ce rapport synthétise les performances de la période et identifie les axes d'amélioration pour la période suivante.</p></div>`
  },
  {
    code: 'impr3_plan_numerique', name: "Plan de développement imprimerie numérique",
    category: 'commercial_financier', price: 5000, priceMax: 18000,
    description: "Document de planification stratégique pour la transition numérique d'une imprimerie traditionnelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'imprimerie_nom',label:"Nom de l'imprimerie",type:'text',required:true},
      {key:'dirigeant_nom',label:"Nom du dirigeant",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (ex: 3 ans)",type:'text',required:true},
      {key:'investissement_prevu',label:"Investissement prévu FCFA",type:'text',required:true},
      {key:'date_debut',label:"Date de début du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT – IMPRIMERIE NUMÉRIQUE</h1><h2>{{imprimerie_nom}}</h2><p>Dirigeant : <strong>{{dirigeant_nom}}</strong> | Horizon : <strong>{{horizon_plan}}</strong></p><h2>Contexte</h2><p>Face à l'évolution du marché, l'imprimerie engage sa transformation numérique pour répondre aux nouvelles demandes clients.</p><h2>Axes stratégiques</h2><p>1. Acquisition d'équipements numériques<br/>2. Formation des équipes<br/>3. Développement commercial en ligne</p><h2>Budget</h2><p>Investissement total prévu : <strong>{{investissement_prevu}} FCFA</strong>, à partir du <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'impr3_charte_durable', name: "Charte de l'imprimerie responsable et durable",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Charte d'engagement RSE pour les imprimeries souhaitant formaliser leur démarche environnementale et sociale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'imprimerie_nom',label:"Nom de l'imprimerie",type:'text',required:true},
      {key:'dirigeant_nom',label:"Nom du dirigeant signataire",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques de l'imprimerie",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'IMPRIMERIE RESPONSABLE ET DURABLE</h1><h2>{{imprimerie_nom}}</h2><p>Adoptée le <strong>{{date_adoption}}</strong> par <strong>{{dirigeant_nom}}</strong></p><h2>Préambule</h2><p>Consciente de son impact environnemental, notre imprimerie s'engage dans une démarche de développement durable.</p><h2>Engagements</h2><p>1. Utilisation de papiers certifiés FSC ou PEFC<br/>2. Réduction des solvants et produits chimiques<br/>3. Recyclage des déchets de production<br/>4. Engagements spécifiques : <strong>{{engagements_specifiques}}</strong></p></div>`
  },
  // ── PACKAGING / DESIGN INDUSTRIEL (pack_) ──────────────────────────────────
  {
    code: 'pack_alimentaire', name: "Accord de service de design packaging produit alimentaire",
    category: 'commercial_financier', price: 5000, priceMax: 18000,
    description: "Contrat OHADA pour la conception de packaging alimentaire conforme aux normes sanitaires et aux réglementations ivoiriennes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client (marque)",type:'text',required:true},
      {key:'studio_nom',label:"Nom du studio design",type:'text',required:true},
      {key:'produit',label:"Produit alimentaire concerné",type:'text',required:true},
      {key:'contenu_mission',label:"Contenu de la mission design",type:'textarea',required:true},
      {key:'date_remise',label:"Date de remise des maquettes",type:'date',required:true},
      {key:'honoraires',label:"Honoraires FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – DESIGN PACKAGING ALIMENTAIRE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{studio_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Création du packaging du produit alimentaire <strong>{{produit}}</strong>. Mission : <strong>{{contenu_mission}}</strong>.</p><h2>Article 2 – Normes</h2><p>Le design respectera les réglementations sanitaires et d'étiquetage en vigueur en Côte d'Ivoire.</p><h2>Article 3 – Délai</h2><p>Remise des maquettes finales le <strong>{{date_remise}}</strong>.</p><h2>Article 4 – Honoraires</h2><p>Honoraires : <strong>{{honoraires}} FCFA</strong>.</p></div>`
  },
  {
    code: 'pack_cosmetique', name: "Accord de service de design packaging cosmétique",
    category: 'commercial_financier', price: 5000, priceMax: 18000,
    description: "Contrat pour la conception de packaging de produits cosmétiques, en lien avec les tendances du marché africain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'marque_nom',label:"Nom de la marque cosmétique",type:'text',required:true},
      {key:'studio_nom',label:"Nom du studio design",type:'text',required:true},
      {key:'gamme',label:"Gamme de produits concernée",type:'text',required:true},
      {key:'nb_references',label:"Nombre de références à designer",type:'text',required:true},
      {key:'date_remise',label:"Date de remise",type:'date',required:true},
      {key:'honoraires',label:"Honoraires FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – DESIGN PACKAGING COSMÉTIQUE</h1><p>Entre <strong>{{marque_nom}}</strong> et <strong>{{studio_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Design packaging de la gamme <strong>{{gamme}}</strong>, comprenant <strong>{{nb_references}}</strong> référence(s).</p><h2>Article 2 – Délai</h2><p>Remise des livrables le <strong>{{date_remise}}</strong>.</p><h2>Article 3 – Honoraires</h2><p>Montant : <strong>{{honoraires}} FCFA</strong>.</p></div>`
  },
  {
    code: 'pack_pharmaceutique', name: "Accord de service de design packaging pharmaceutique",
    category: 'commercial_financier', price: 7000, priceMax: 25000,
    description: "Contrat de design packaging pour médicaments et dispositifs médicaux, conforme aux exigences réglementaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'laboratoire_nom',label:"Nom du laboratoire",type:'text',required:true},
      {key:'studio_nom',label:"Nom du studio design",type:'text',required:true},
      {key:'produit_medicament',label:"Médicament ou dispositif médical",type:'text',required:true},
      {key:'reglementations',label:"Réglementations applicables",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – DESIGN PACKAGING PHARMACEUTIQUE</h1><p>Entre <strong>{{laboratoire_nom}}</strong> et <strong>{{studio_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Conception du packaging de <strong>{{produit_medicament}}</strong> en conformité avec <strong>{{reglementations}}</strong>.</p><h2>Article 2 – Validation réglementaire</h2><p>Tout fichier avant mise en production devra être validé par le département affaires réglementaires du laboratoire.</p><h2>Article 3 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'pack_electronique', name: "Accord de service de design packaging électronique",
    category: 'commercial_financier', price: 5000, priceMax: 18000,
    description: "Contrat pour la conception de boîtages et packagings de produits électroniques et high-tech.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'studio_nom',label:"Nom du studio design",type:'text',required:true},
      {key:'produit',label:"Produit électronique concerné",type:'text',required:true},
      {key:'contraintes_techniques',label:"Contraintes techniques (dimensions, poids...)",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison des maquettes",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – DESIGN PACKAGING ÉLECTRONIQUE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{studio_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Conception du packaging du produit <strong>{{produit}}</strong>. Contraintes : <strong>{{contraintes_techniques}}</strong>.</p><h2>Article 2 – Livrables</h2><p>Fichiers sources (AI, PDF), dieline et rendu 3D.</p><h2>Article 3 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'pack_design_industriel', name: "Accord de service de design industriel (product design)",
    category: 'commercial_financier', price: 8000, priceMax: 28000,
    description: "Contrat de design industriel pour la conception de produits physiques, de l'idéation à la production.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'designer_nom',label:"Nom du designer/bureau d'études",type:'text',required:true},
      {key:'produit_a_concevoir',label:"Produit à concevoir",type:'text',required:true},
      {key:'phases_mission',label:"Phases de la mission",type:'textarea',required:true},
      {key:'date_fin',label:"Date de fin de mission",type:'date',required:true},
      {key:'honoraires',label:"Honoraires totaux FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – DESIGN INDUSTRIEL</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{designer_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Mission de design industriel pour <strong>{{produit_a_concevoir}}</strong>. Phases : <strong>{{phases_mission}}</strong>.</p><h2>Article 2 – Propriété intellectuelle</h2><p>Les droits sur les créations sont cédés au client après règlement complet des honoraires.</p><h2>Article 3 – Délai et rémunération</h2><p>Fin de mission : <strong>{{date_fin}}</strong>. Honoraires : <strong>{{honoraires}} FCFA</strong>.</p></div>`
  },
  {
    code: 'pack_prototypage', name: "Accord de service de prototypage rapide (3D printing)",
    category: 'commercial_financier', price: 5000, priceMax: 16000,
    description: "Contrat pour la réalisation de prototypes par impression 3D ou autres techniques de prototypage rapide.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'fablab_nom',label:"Nom du FabLab/prestataire",type:'text',required:true},
      {key:'objet_prototype',label:"Objet à prototyper",type:'text',required:true},
      {key:'technologie',label:"Technologie utilisée (FDM, SLA, SLS...)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison du prototype",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PROTOTYPAGE RAPIDE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{fablab_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Réalisation d'un prototype de <strong>{{objet_prototype}}</strong> par technologie <strong>{{technologie}}</strong>.</p><h2>Article 2 – Fichiers</h2><p>Le client fournit les fichiers CAO en format STL ou STEP.</p><h2>Article 3 – Délai</h2><p>Livraison du prototype le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'pack_maquette', name: "Accord de service de maquette packaging (dieline)",
    category: 'commercial_financier', price: 3500, priceMax: 11000,
    description: "Contrat pour la création de maquettes de développé (dieline) de boîtes, étuis et emballages.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'studio_nom',label:"Nom du studio",type:'text',required:true},
      {key:'type_emballage',label:"Type d'emballage (boîte, étui...)",type:'text',required:true},
      {key:'dimensions',label:"Dimensions intérieures (L x l x H)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MAQUETTE PACKAGING (DIELINE)</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{studio_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Création du développé (dieline) d'un <strong>{{type_emballage}}</strong> aux dimensions <strong>{{dimensions}}</strong>.</p><h2>Article 2 – Livrables</h2><p>Fichiers dieline en AI et PDF, ainsi qu'une maquette physique en carton.</p><h2>Article 3 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'pack_test_ux', name: "Accord de service de test utilisateur packaging (UX design)",
    category: 'commercial_financier', price: 6000, priceMax: 20000,
    description: "Contrat pour la conduite de tests utilisateurs sur des packagings afin d'optimiser l'expérience d'ouverture et de lecture.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'cabinet_nom',label:"Nom du cabinet UX",type:'text',required:true},
      {key:'packaging_concerne',label:"Packaging testé",type:'text',required:true},
      {key:'nb_participants',label:"Nombre de participants aux tests",type:'text',required:true},
      {key:'date_rapport',label:"Date de remise du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – TEST UTILISATEUR PACKAGING</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{cabinet_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Tests utilisateurs sur le packaging <strong>{{packaging_concerne}}</strong> auprès de <strong>{{nb_participants}}</strong> participants.</p><h2>Article 2 – Méthodologie</h2><p>Tests d'utilisabilité, entretiens qualitatifs et mesure des indicateurs d'expérience.</p><h2>Article 3 – Rapport</h2><p>Le rapport de synthèse et les recommandations seront remis le <strong>{{date_rapport}}</strong>.</p></div>`
  },
  {
    code: 'pack_ergonomique', name: "Accord de service de design ergonomique",
    category: 'commercial_financier', price: 7000, priceMax: 22000,
    description: "Contrat pour la conception ergonomique de produits et équipements, garantissant confort et sécurité d'usage.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'ergonome_nom',label:"Nom de l'ergonome/cabinet",type:'text',required:true},
      {key:'produit',label:"Produit ou poste de travail concerné",type:'text',required:true},
      {key:'population_cible',label:"Population cible",type:'text',required:true},
      {key:'date_rendu',label:"Date de rendu de l'étude",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – DESIGN ERGONOMIQUE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{ergonome_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Analyse et optimisation ergonomique de <strong>{{produit}}</strong> pour la population <strong>{{population_cible}}</strong>.</p><h2>Article 2 – Méthodologie</h2><p>Observation terrain, analyses anthropométriques et recommandations de design.</p><h2>Article 3 – Délai</h2><p>Rendu de l'étude le <strong>{{date_rendu}}</strong>.</p></div>`
  },
  {
    code: 'pack_ecodesign', name: "Accord de service d'éco-design (éco-conception packaging)",
    category: 'commercial_financier', price: 6000, priceMax: 20000,
    description: "Contrat pour la reconception écologique de packagings visant à réduire l'empreinte environnementale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'cabinet_nom',label:"Nom du cabinet d'éco-design",type:'text',required:true},
      {key:'packaging_cible',label:"Packaging cible",type:'text',required:true},
      {key:'objectif_reduction',label:"Objectif de réduction (% matière, CO2...)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – ÉCO-DESIGN PACKAGING</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{cabinet_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Éco-conception du packaging <strong>{{packaging_cible}}</strong> avec pour objectif : <strong>{{objectif_reduction}}</strong>.</p><h2>Article 2 – Approche</h2><p>Analyse du cycle de vie (ACV), identification des points d'amélioration et proposition de matériaux alternatifs durables.</p><h2>Article 3 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'pack_ui_design', name: "Accord de service de design d'interface (UI design)",
    category: 'commercial_financier', price: 5000, priceMax: 18000,
    description: "Contrat de design d'interfaces numériques (application mobile, site web) pour entreprises africaines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'designer_nom',label:"Nom du designer UI",type:'text',required:true},
      {key:'type_interface',label:"Type d'interface (app mobile, web...)",type:'text',required:true},
      {key:'nb_ecrans',label:"Nombre d'écrans/pages à designer",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'honoraires',label:"Honoraires FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – DESIGN D'INTERFACE (UI)</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{designer_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Design UI de <strong>{{nb_ecrans}}</strong> écrans/pages pour <strong>{{type_interface}}</strong>.</p><h2>Article 2 – Livrables</h2><p>Maquettes haute-fidélité, prototype interactif et fichiers sources (Figma, Sketch ou Adobe XD).</p><h2>Article 3 – Délai et honoraires</h2><p>Livraison le <strong>{{date_livraison}}</strong> pour <strong>{{honoraires}} FCFA</strong>.</p></div>`
  },
  {
    code: 'pack_design_system', name: "Accord de service de design de système (design system)",
    category: 'commercial_financier', price: 8000, priceMax: 28000,
    description: "Contrat pour la création d'un design system (bibliothèque de composants) destiné à harmoniser les interfaces d'une organisation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'studio_nom',label:"Nom du studio design",type:'text',required:true},
      {key:'perimetre',label:"Périmètre du design system",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'honoraires',label:"Honoraires FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – DESIGN SYSTEM</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{studio_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Création d'un design system couvrant : <strong>{{perimetre}}</strong>.</p><h2>Article 2 – Livrables</h2><p>Bibliothèque de composants Figma, documentation des tokens de design et guide d'utilisation.</p><h2>Article 3 – Délai et honoraires</h2><p>Livraison le <strong>{{date_livraison}}</strong> pour <strong>{{honoraires}} FCFA</strong>.</p></div>`
  },
  {
    code: 'pack_cession_droits', name: "Accord de cession de droits de design (propriété intellectuelle)",
    category: 'commercial_financier', price: 6000, priceMax: 22000,
    description: "Contrat OHADA de cession des droits patrimoniaux sur des créations de design, logos et œuvres graphiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'cedant_nom',label:"Nom du cédant (designer)",type:'text',required:true},
      {key:'cessionnaire_nom',label:"Nom du cessionnaire (client)",type:'text',required:true},
      {key:'oeuvres_cedees',label:"Description des œuvres cédées",type:'textarea',required:true},
      {key:'territoire',label:"Territoire de la cession",type:'text',required:true},
      {key:'date_cession',label:"Date de la cession",type:'date',required:true},
      {key:'contrepartie',label:"Contrepartie financière FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE DROITS DE DESIGN</h1><p>Entre <strong>{{cedant_nom}}</strong> (le Cédant) et <strong>{{cessionnaire_nom}}</strong> (le Cessionnaire) :</p><h2>Article 1 – Objet</h2><p>Cession des droits patrimoniaux sur : <strong>{{oeuvres_cedees}}</strong>.</p><h2>Article 2 – Étendue</h2><p>Territoire : <strong>{{territoire}}</strong>. Cession à titre exclusif et définitif.</p><h2>Article 3 – Contrepartie</h2><p>Montant : <strong>{{contrepartie}} FCFA</strong>, payable à la signature.</p><h2>Article 4 – Droit applicable</h2><p>Droit ivoirien et Accord de Bangui de l'OAPI.</p></div>`
  },
  {
    code: 'pack_photographie_produit', name: "Accord de service de photographie produit (packshot)",
    category: 'commercial_financier', price: 4000, priceMax: 14000,
    description: "Contrat pour la réalisation de photographies professionnelles de produits (packshots) pour e-commerce et catalogues.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'photographe_nom',label:"Nom du photographe/studio",type:'text',required:true},
      {key:'nb_produits',label:"Nombre de produits à photographier",type:'text',required:true},
      {key:'nb_vues',label:"Nombre de vues par produit",type:'text',required:true},
      {key:'date_seance',label:"Date de la séance photo",type:'date',required:true},
      {key:'droits_utilisation',label:"Droits d'utilisation accordés",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PHOTOGRAPHIE PRODUIT (PACKSHOT)</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{photographe_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Réalisation de <strong>{{nb_vues}}</strong> vues photographiques pour <strong>{{nb_produits}}</strong> produit(s).</p><h2>Article 2 – Droits</h2><p>Droits accordés : <strong>{{droits_utilisation}}</strong>.</p><h2>Article 3 – Séance</h2><p>Séance le <strong>{{date_seance}}</strong>. Les fichiers RAW retouchés seront livrés sous 5 jours ouvrés.</p></div>`
  },
  {
    code: 'pack_rendu_3d', name: "Accord de service de rendu 3D produit (CGI)",
    category: 'commercial_financier', price: 5000, priceMax: 18000,
    description: "Contrat pour la création de visuels 3D photoréalistes de produits par images de synthèse (CGI/rendu 3D).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'studio_3d_nom',label:"Nom du studio 3D",type:'text',required:true},
      {key:'produits',label:"Produits à modéliser",type:'text',required:true},
      {key:'nb_visuels',label:"Nombre de visuels attendus",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – RENDU 3D PRODUIT (CGI)</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{studio_3d_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Création de <strong>{{nb_visuels}}</strong> visuels 3D photoréalistes pour <strong>{{produits}}</strong>.</p><h2>Article 2 – Livrables</h2><p>Fichiers JPEG/PNG haute résolution et fichiers 3D sources (OBJ ou FBX) sur demande.</p><h2>Article 3 – Délai</h2><p>Livraison le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'pack_motion_design', name: "Accord de service de film de produit (motion design)",
    category: 'commercial_financier', price: 6000, priceMax: 22000,
    description: "Contrat pour la production de films animés de présentation de produits en motion design ou 3D animée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'studio_nom',label:"Nom du studio motion design",type:'text',required:true},
      {key:'produit',label:"Produit à mettre en valeur",type:'text',required:true},
      {key:'duree_film',label:"Durée du film (ex: 30 secondes)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'budget',label:"Budget FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – FILM PRODUIT (MOTION DESIGN)</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{studio_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Production d'un film motion design de <strong>{{duree_film}}</strong> pour présenter <strong>{{produit}}</strong>.</p><h2>Article 2 – Livrables</h2><p>Film en formats MP4 (H.264) et MOV, avec fichiers sources After Effects.</p><h2>Article 3 – Budget et délai</h2><p>Budget : <strong>{{budget}} FCFA</strong>. Livraison le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'pack_manuel_identite', name: "Accord de service de manuel d'identité visuelle de marque",
    category: 'commercial_financier', price: 7000, priceMax: 24000,
    description: "Contrat pour la création d'un manuel d'identité visuelle (brand book) définissant l'utilisation des éléments de la marque.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'marque_nom',label:"Nom de la marque",type:'text',required:true},
      {key:'studio_nom',label:"Nom du studio brand",type:'text',required:true},
      {key:'perimetre',label:"Périmètre du manuel (logo, couleurs, typographie...)",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'honoraires',label:"Honoraires FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MANUEL D'IDENTITÉ VISUELLE</h1><p>Entre <strong>{{marque_nom}}</strong> et <strong>{{studio_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Création d'un manuel d'identité visuelle couvrant : <strong>{{perimetre}}</strong>.</p><h2>Article 2 – Livrables</h2><p>Document PDF interactif, fichiers sources et guide d'utilisation numérique.</p><h2>Article 3 – Honoraires et délai</h2><p>Honoraires : <strong>{{honoraires}} FCFA</strong>. Livraison le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'pack_naming', name: "Accord de service de naming de marque",
    category: 'commercial_financier', price: 5000, priceMax: 18000,
    description: "Contrat OHADA pour la recherche et la création d'un nom de marque, incluant la vérification de disponibilité auprès de l'OAPI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'agence_nom',label:"Nom de l'agence naming",type:'text',required:true},
      {key:'secteur',label:"Secteur d'activité",type:'text',required:true},
      {key:'nb_propositions',label:"Nombre de propositions de noms",type:'text',required:true},
      {key:'date_remise',label:"Date de remise des propositions",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – NAMING DE MARQUE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{agence_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Recherche et création de <strong>{{nb_propositions}}</strong> proposition(s) de noms de marque pour le secteur <strong>{{secteur}}</strong>, incluant vérification de disponibilité à l'OAPI.</p><h2>Article 2 – Délai</h2><p>Remise des propositions le <strong>{{date_remise}}</strong>.</p><h2>Article 3 – Propriété</h2><p>Le nom retenu sera déposé à l'OAPI au nom du client après règlement.</p></div>`
  },
  {
    code: 'pack_slogan', name: "Accord de service de slogan et baseline",
    category: 'commercial_financier', price: 4000, priceMax: 14000,
    description: "Contrat pour la création de slogans publicitaires et baselines de marque adaptés au marché africain francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'agence_nom',label:"Nom de l'agence créative",type:'text',required:true},
      {key:'contexte_marque',label:"Contexte de la marque",type:'textarea',required:true},
      {key:'nb_options',label:"Nombre d'options à soumettre",type:'text',required:true},
      {key:'date_remise',label:"Date de remise",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – SLOGAN ET BASELINE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{agence_nom}}</strong> :</p><h2>Article 1 – Contexte</h2><p>Contexte de la marque : <strong>{{contexte_marque}}</strong>.</p><h2>Article 2 – Mission</h2><p>Création de <strong>{{nb_options}}</strong> option(s) de slogan et baseline, avec note d'intention stratégique pour chaque option.</p><h2>Article 3 – Délai</h2><p>Remise le <strong>{{date_remise}}</strong>.</p></div>`
  },
  {
    code: 'pack_partenariat_designer', name: "Accord de partenariat designer-producteur",
    category: 'commercial_financier', price: 6000, priceMax: 20000,
    description: "Accord-cadre entre un designer indépendant et un fabricant/producteur pour la conception de produits en co-création.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'designer_nom',label:"Nom du designer",type:'text',required:true},
      {key:'producteur_nom',label:"Nom du producteur/fabricant",type:'text',required:true},
      {key:'produits_concernes',label:"Produits concernés",type:'text',required:true},
      {key:'redevance',label:"Taux de redevance sur ventes (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du partenariat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT DESIGNER – PRODUCTEUR</h1><p>Entre <strong>{{designer_nom}}</strong> et <strong>{{producteur_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Co-création et exploitation commerciale de <strong>{{produits_concernes}}</strong>.</p><h2>Article 2 – Rémunération</h2><p>Le designer perçoit une redevance de <strong>{{redevance}}%</strong> sur le prix de vente HT de chaque produit vendu.</p><h2>Article 3 – Durée</h2><p>Partenariat à durée indéterminée à compter du <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'pack_certification_design', name: "Accord de service de certification design durable (cradle-to-cradle)",
    category: 'commercial_financier', price: 8000, priceMax: 28000,
    description: "Contrat d'accompagnement pour l'obtention d'une certification de design durable (cradle-to-cradle ou équivalent).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'cabinet_nom',label:"Nom du cabinet certificateur",type:'text',required:true},
      {key:'produit_ou_packaging',label:"Produit ou packaging à certifier",type:'text',required:true},
      {key:'referentiel',label:"Référentiel de certification visé",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit de certification",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CERTIFICATION DESIGN DURABLE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{cabinet_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Accompagnement à la certification <strong>{{referentiel}}</strong> pour <strong>{{produit_ou_packaging}}</strong>.</p><h2>Article 2 – Processus</h2><p>Diagnostic initial, plan d'action, suivi des améliorations et audit de certification le <strong>{{date_audit}}</strong>.</p><h2>Article 3 – Engagement</h2><p>Le cabinet s'engage à mettre tout en œuvre pour l'obtention de la certification.</p></div>`
  },
  {
    code: 'pack_audit_marque', name: "Accord de service d'audit de marque (brand audit)",
    category: 'commercial_financier', price: 6000, priceMax: 20000,
    description: "Contrat pour la réalisation d'un audit complet de la marque, de son identité visuelle et de sa perception marché.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'cabinet_nom',label:"Nom du cabinet brand",type:'text',required:true},
      {key:'perimetre_audit',label:"Périmètre de l'audit",type:'textarea',required:true},
      {key:'date_rapport',label:"Date de remise du rapport",type:'date',required:true},
      {key:'honoraires',label:"Honoraires FCFA",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – AUDIT DE MARQUE</h1><p>Entre <strong>{{client_nom}}</strong> et <strong>{{cabinet_nom}}</strong> :</p><h2>Article 1 – Objet</h2><p>Réalisation d'un audit de marque portant sur : <strong>{{perimetre_audit}}</strong>.</p><h2>Article 2 – Livrables</h2><p>Rapport d'audit, cartographie des forces/faiblesses et plan d'action recommandé.</p><h2>Article 3 – Délai et honoraires</h2><p>Rapport remis le <strong>{{date_rapport}}</strong>. Honoraires : <strong>{{honoraires}} FCFA</strong>.</p></div>`
  },
  {
    code: 'pack_rapport_agence', name: "Rapport de performance agence de design",
    category: 'commercial_financier', price: 3000, priceMax: 10000,
    description: "Modèle de rapport de performance mensuel ou trimestriel destiné aux agences de design et studios créatifs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'agence_nom',label:"Nom de l'agence",type:'text',required:true},
      {key:'periode',label:"Période du rapport",type:'text',required:true},
      {key:'nb_projets_livres',label:"Nombre de projets livrés",type:'text',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires FCFA",type:'text',required:true},
      {key:'taux_satisfaction',label:"Taux de satisfaction client (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – AGENCE DE DESIGN</h1><h2>{{agence_nom}}</h2><p>Période : <strong>{{periode}}</strong></p><h2>Indicateurs clés</h2><p>Projets livrés : <strong>{{nb_projets_livres}}</strong> | Chiffre d'affaires : <strong>{{chiffre_affaires}} FCFA</strong> | Satisfaction client : <strong>{{taux_satisfaction}}%</strong></p><h2>Analyse</h2><p>Ce rapport présente les résultats de la période et les axes de développement stratégique pour la prochaine période.</p></div>`
  },
  {
    code: 'pack_plan_refonte', name: "Plan de refonte de l'identité visuelle",
    category: 'commercial_financier', price: 5000, priceMax: 18000,
    description: "Document de planification stratégique pour la refonte complète de l'identité visuelle d'une entreprise ou institution.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisation_nom',label:"Nom de l'organisation",type:'text',required:true},
      {key:'responsable_nom',label:"Nom du responsable du projet",type:'text',required:true},
      {key:'raisons_refonte',label:"Raisons de la refonte",type:'textarea',required:true},
      {key:'budget',label:"Budget alloué FCFA",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE REFONTE DE L'IDENTITÉ VISUELLE</h1><h2>{{organisation_nom}}</h2><p>Responsable : <strong>{{responsable_nom}}</strong></p><h2>Contexte et motivation</h2><p><strong>{{raisons_refonte}}</strong></p><h2>Calendrier</h2><p>Lancement du projet le <strong>{{date_lancement}}</strong>.</p><h2>Budget</h2><p>Budget alloué : <strong>{{budget}} FCFA</strong>.</p><h2>Étapes</h2><p>1. Audit de l'identité actuelle<br/>2. Brief créatif et sélection d'agence<br/>3. Phase de création et validation<br/>4. Déploiement progressif sur tous les supports</p></div>`
  },
  {
    code: 'pack_charte_africaine', name: "Charte du design africain innovant et durable",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Charte d'engagement pour les acteurs du design africain souhaitant promouvoir l'innovation ancrée dans les valeurs et cultures locales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'signataire_nom',label:"Nom du signataire",type:'text',required:true},
      {key:'organisation',label:"Organisation représentée",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU DESIGN AFRICAIN INNOVANT ET DURABLE</h1><p>Signée le <strong>{{date_signature}}</strong> par <strong>{{signataire_nom}}</strong>, représentant <strong>{{organisation}}</strong></p><h2>Préambule</h2><p>Nous, acteurs du design en Afrique, affirmons que le design doit être porteur des valeurs, des esthétiques et des besoins des peuples africains, tout en contribuant au développement durable du continent.</p><h2>Engagements</h2><p>1. Valoriser les matériaux, techniques et savoir-faire locaux<br/>2. Concevoir des produits accessibles et durables<br/>3. Former et accompagner la prochaine génération de designers africains<br/>4. Engagements spécifiques : <strong>{{engagements_specifiques}}</strong></p></div>`
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
  console.log(`Batch 90a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
