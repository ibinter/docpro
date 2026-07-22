import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates Traduction / Interprétation / Édition ───────────────────
  {
    code: 'trad_juridique',
    name: "Accord de service de traduction de documents juridiques",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Contrat de prestation de traduction de documents juridiques (contrats, jugements, actes notariés) entre un prestataire agréé et un client, conforme aux exigences OHADA.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_traducteur', label: "Nom du traducteur / cabinet", type: 'text', required: true },
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'langue_source', label: "Langue source", type: 'text', required: true },
      { key: 'langue_cible', label: "Langue cible", type: 'text', required: true },
      { key: 'delai_livraison', label: "Délai de livraison", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRADUCTION DE DOCUMENTS JURIDIQUES</h1>
<p>Entre <strong>{{nom_traducteur}}</strong>, ci-après dénommé le Prestataire,</p>
<p>et <strong>{{nom_client}}</strong>, ci-après dénommé le Client,</p>
<p>il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire s'engage à traduire les documents juridiques remis par le Client de la langue {{langue_source}} vers la langue {{langue_cible}} dans le respect des termes juridiques en vigueur dans l'espace OHADA.</p>
<h2>Article 2 – Délai</h2>
<p>Les traductions seront livrées dans un délai de {{delai_livraison}} à compter de la réception des documents originaux.</p>
<h2>Article 3 – Confidentialité</h2>
<p>Le Prestataire s'engage à maintenir la stricte confidentialité de l'ensemble des documents traduits.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Le présent accord est régi par le droit ivoirien et les Actes uniformes de l'OHADA.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Le Prestataire : _____________________ &nbsp;&nbsp; Le Client : _____________________</p></div>`,
  },
  {
    code: 'trad_certifiee',
    name: "Accord de service de traduction certifiée (assermentée)",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: "Contrat de traduction certifiée et assermentée de documents officiels, délivrant une attestation de fidélité reconnue par les autorités administratives et judiciaires de Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'nom_traducteur', label: "Traducteur assermenté (nom et N° agrément)", type: 'text', required: true },
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'nature_document', label: "Nature du document à traduire", type: 'text', required: true },
      { key: 'langue_cible', label: "Langue cible", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRADUCTION CERTIFIÉE (ASSERMENTÉE)</h1>
<p><strong>{{nom_traducteur}}</strong>, traducteur assermenté près les juridictions ivoiriennes, ci-après le Prestataire,</p>
<p>et <strong>{{nom_client}}</strong>, ci-après le Client,</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire s'engage à produire une traduction certifiée conforme du document intitulé <em>{{nature_document}}</em> vers la langue {{langue_cible}}, accompagnée d'une attestation de fidélité.</p>
<h2>Article 2 – Valeur légale</h2>
<p>La traduction certifiée est opposable aux administrations ivoiriennes, consulats et juridictions OHADA.</p>
<h2>Article 3 – Responsabilité</h2>
<p>Le Prestataire engage sa responsabilité professionnelle quant à la fidélité de la traduction.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Le Prestataire : _____________________ &nbsp;&nbsp; Le Client : _____________________</p></div>`,
  },
  {
    code: 'trad_technique',
    name: "Accord de service de traduction technique (manuels, normes)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de traduction de documents techniques tels que manuels d'utilisation, normes industrielles et cahiers des charges, incluant un glossaire terminologique validé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'nom_client', label: "Nom du client / entreprise", type: 'text', required: true },
      { key: 'domaine_technique', label: "Domaine technique (BTP, énergie, etc.)", type: 'text', required: true },
      { key: 'volume_pages', label: "Volume estimé (pages)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRADUCTION TECHNIQUE</h1>
<p>Entre <strong>{{nom_prestataire}}</strong>, Prestataire spécialisé en traduction technique,</p>
<p>et <strong>{{nom_client}}</strong>, Client,</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire assure la traduction de documents techniques du domaine {{domaine_technique}} pour un volume estimé à {{volume_pages}} pages, en garantissant l'exactitude terminologique.</p>
<h2>Article 2 – Glossaire</h2>
<p>Un glossaire bilingue validé par le Client sera établi avant le début des travaux.</p>
<h2>Article 3 – Révision</h2>
<p>Une révision technique par un expert du domaine est incluse dans la prestation.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures des parties : ________________________________</p></div>`,
  },
  {
    code: 'trad_medicale',
    name: "Accord de service de traduction médicale",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: "Contrat de traduction de documents médicaux (protocoles cliniques, notices pharmaceutiques, dossiers patients) avec obligation de confidentialité renforcée.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'nom_client', label: "Établissement ou client", type: 'text', required: true },
      { key: 'type_document', label: "Type de document médical", type: 'text', required: true },
      { key: 'langue_source', label: "Langue source", type: 'text', required: true },
      { key: 'langue_cible', label: "Langue cible", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRADUCTION MÉDICALE</h1>
<p>Entre <strong>{{nom_prestataire}}</strong>, traducteur médical qualifié,</p>
<p>et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Traduction de {{type_document}} de la langue {{langue_source}} vers la langue {{langue_cible}} dans le strict respect des normes médicales et de la terminologie OMS.</p>
<h2>Article 2 – Confidentialité médicale</h2>
<p>Toutes les données patients et informations médicales sont soumises au secret professionnel conformément à la législation ivoirienne sur la santé.</p>
<h2>Article 3 – Qualité</h2>
<p>La traduction est relue par un médecin référent avant livraison.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Le Prestataire : _____________________ &nbsp;&nbsp; Le Client : _____________________</p></div>`,
  },
  {
    code: 'trad_financiere',
    name: "Accord de service de traduction financière (rapports annuels)",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 22000,
    description: "Contrat de traduction de documents financiers tels que rapports annuels, états financiers SYSCOHADA et prospectus boursiers, avec validation par un expert-comptable.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'nom_client', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'exercice_fiscal', label: "Exercice fiscal concerné", type: 'text', required: true },
      { key: 'langue_cible', label: "Langue cible", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRADUCTION FINANCIÈRE</h1>
<p>Entre <strong>{{nom_prestataire}}</strong>, prestataire en traduction financière,</p>
<p>et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Traduction des documents financiers de l'exercice {{exercice_fiscal}} vers la langue {{langue_cible}}, incluant les états financiers conformes au référentiel SYSCOHADA révisé.</p>
<h2>Article 2 – Conformité</h2>
<p>Les traductions respectent la terminologie comptable SYSCOHADA et les normes IFRS applicables.</p>
<h2>Article 3 – Validation</h2>
<p>Un expert-comptable agréé ONECCA-CI valide la terminologie financière avant livraison finale.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_litteraire',
    name: "Accord de service de traduction littéraire",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Contrat de traduction d'œuvres littéraires (romans, nouvelles, poésie) avec cession partielle des droits d'adaptation linguistique et clause de crédit au traducteur.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'nom_traducteur', label: "Nom du traducteur", type: 'text', required: true },
      { key: 'auteur_original', label: "Auteur de l'œuvre originale", type: 'text', required: true },
      { key: 'titre_oeuvre', label: "Titre de l'œuvre", type: 'text', required: true },
      { key: 'langue_cible', label: "Langue cible", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRADUCTION LITTÉRAIRE</h1>
<p><strong>{{nom_traducteur}}</strong>, traducteur littéraire, ci-après le Traducteur,</p>
<p>et <strong>{{auteur_original}}</strong> ou son ayant droit, ci-après le Mandant,</p>
<h2>Article 1 – Objet</h2>
<p>Le Traducteur s'engage à traduire l'œuvre intitulée <em>{{titre_oeuvre}}</em> vers la langue {{langue_cible}} en respectant le style et le registre de l'auteur.</p>
<h2>Article 2 – Crédit</h2>
<p>Le nom du Traducteur apparaîtra sur la couverture et en page de titre de l'édition traduite.</p>
<h2>Article 3 – Droits</h2>
<p>Le Traducteur bénéficie d'un pourcentage sur les ventes de l'édition traduite conformément à la législation ivoirienne sur la propriété intellectuelle.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Le Traducteur : _____________________ &nbsp;&nbsp; Le Mandant : _____________________</p></div>`,
  },
  {
    code: 'trad_localisation',
    name: "Accord de service de traduction de sites web et logiciels (localisation)",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: "Contrat de localisation de sites web et de logiciels, incluant adaptation culturelle, traduction de l'interface utilisateur et tests linguistiques.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Nom du prestataire en localisation", type: 'text', required: true },
      { key: 'nom_client', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'nom_plateforme', label: "Nom du site / logiciel", type: 'text', required: true },
      { key: 'paires_langues', label: "Paires de langues (ex : FR>EN, FR>AR)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LOCALISATION DE SITE WEB ET LOGICIEL</h1>
<p>Entre <strong>{{nom_prestataire}}</strong>, expert en localisation, et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Localisation complète de la plateforme <em>{{nom_plateforme}}</em> pour les paires linguistiques {{paires_langues}}, incluant adaptation culturelle et validation UX.</p>
<h2>Article 2 – Livraison</h2>
<p>Les fichiers localisés seront livrés dans les formats sources (JSON, PO, XLIFF) et testés en environnement de recette.</p>
<h2>Article 3 – Maintenance</h2>
<p>Une maintenance linguistique trimestrielle est prévue pour toute mise à jour de contenu.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_consecutive',
    name: "Accord de service d'interprétation consécutive",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Contrat de prestation d'interprétation consécutive pour conférences, négociations commerciales et audiences judiciaires en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'nom_interprete', label: "Nom de l'interprète", type: 'text', required: true },
      { key: 'nom_client', label: "Client / organisateur", type: 'text', required: true },
      { key: 'lieu_evenement', label: "Lieu de l'événement", type: 'text', required: true },
      { key: 'date_evenement', label: "Date de l'événement", type: 'date', required: true },
      { key: 'langues_travail', label: "Langues de travail", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INTERPRÉTATION CONSÉCUTIVE</h1>
<p><strong>{{nom_interprete}}</strong>, interprète professionnel, et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Prestation</h2>
<p>L'interprète assure l'interprétation consécutive en langues {{langues_travail}} lors de l'événement prévu le {{date_evenement}} à {{lieu_evenement}}.</p>
<h2>Article 2 – Conditions de travail</h2>
<p>Le Client fournit à l'interprète les documents préparatoires 48 heures avant l'événement.</p>
<h2>Article 3 – Rémunération</h2>
<p>Les honoraires sont fixés par demi-journée ou journée complète, majorés en cas de dépassement horaire.</p>
<p>Fait à Abidjan, à la date de signature convenue entre les parties.</p>
<p>L'Interprète : _____________________ &nbsp;&nbsp; Le Client : _____________________</p></div>`,
  },
  {
    code: 'trad_simultanee',
    name: "Accord de service d'interprétation simultanée (cabine)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 28000,
    description: "Contrat de prestation d'interprétation simultanée en cabine pour grandes conférences, forums internationaux et sessions parlementaires.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'societe_prestataire', label: "Société prestataire", type: 'text', required: true },
      { key: 'nom_client', label: "Client / institution", type: 'text', required: true },
      { key: 'date_evenement', label: "Date de l'événement", type: 'date', required: true },
      { key: 'nombre_cabines', label: "Nombre de cabines requises", type: 'text', required: true },
      { key: 'langues_travail', label: "Langues de travail", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INTERPRÉTATION SIMULTANÉE EN CABINE</h1>
<p>Entre <strong>{{societe_prestataire}}</strong> et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Prestation</h2>
<p>Fourniture d'une équipe d'interprètes simultanés et de {{nombre_cabines}} cabine(s) d'interprétation pour les langues {{langues_travail}} lors de l'événement du {{date_evenement}}.</p>
<h2>Article 2 – Équipement</h2>
<p>Le prestataire fournit les cabines ISO 4043, les consoles et le matériel de distribution audio.</p>
<h2>Article 3 – Équipe</h2>
<p>Chaque cabine est dotée d'au moins deux interprètes professionnels conformément aux normes AIIC.</p>
<p>Fait à Abidjan, le jour de la signature.</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_liaison',
    name: "Accord de service d'interprétation de liaison (chuchotage)",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Contrat d'interprétation de liaison ou chuchotage pour visites d'entreprises, délégations officielles et réunions bilatérales restreintes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'nom_interprete', label: "Nom de l'interprète", type: 'text', required: true },
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'contexte_mission', label: "Contexte de la mission", type: 'text', required: true },
      { key: 'date_mission', label: "Date de la mission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INTERPRÉTATION DE LIAISON</h1>
<p><strong>{{nom_interprete}}</strong> et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>L'interprète assure l'interprétation de liaison (chuchotage) dans le cadre de : <em>{{contexte_mission}}</em>, prévu le {{date_mission}}.</p>
<h2>Article 2 – Modalités</h2>
<p>L'interprète accompagne au plus deux personnes et chuchote la traduction en temps réel sans matériel électronique.</p>
<h2>Article 3 – Disponibilité</h2>
<p>L'interprète est disponible pour toute la durée de la mission définie par le Client.</p>
<p>Signatures des parties : ________________________________</p></div>`,
  },
  {
    code: 'trad_sous_titrage',
    name: "Accord de service de sous-titrage et doublage",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Contrat de sous-titrage et doublage de contenus audiovisuels (films, documentaires, publicités) pour diffusion en Côte d'Ivoire et dans l'espace UEMOA.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Studio ou prestataire", type: 'text', required: true },
      { key: 'nom_client', label: "Producteur / client", type: 'text', required: true },
      { key: 'titre_contenu', label: "Titre du contenu audiovisuel", type: 'text', required: true },
      { key: 'type_service', label: "Type de service (sous-titrage / doublage / les deux)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOUS-TITRAGE ET DOUBLAGE</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire réalise le {{type_service}} du contenu <em>{{titre_contenu}}</em> conformément aux standards de diffusion télévisuelle et numérique.</p>
<h2>Article 2 – Livrables</h2>
<p>Les fichiers SRT, VTT ou pistes audio doublées sont livrés dans les délais convenus avec le Client.</p>
<h2>Article 3 – Droits</h2>
<p>Les droits de diffusion de la version traduite sont limités au territoire convenu entre les parties.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_edition_livres',
    name: "Accord de service d'édition de livres (maison d'édition)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Contrat d'édition entre une maison d'édition et un auteur pour la publication d'un ouvrage littéraire ou scientifique, incluant les conditions de rémunération et de diffusion.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'maison_edition', label: "Nom de la maison d'édition", type: 'text', required: true },
      { key: 'nom_auteur', label: "Nom de l'auteur", type: 'text', required: true },
      { key: 'titre_ouvrage', label: "Titre de l'ouvrage", type: 'text', required: true },
      { key: 'tirage_initial', label: "Tirage initial prévu (exemplaires)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'ÉDITION DE LIVRE</h1>
<p>Entre <strong>{{maison_edition}}</strong>, ci-après l'Éditeur,</p>
<p>et <strong>{{nom_auteur}}</strong>, ci-après l'Auteur,</p>
<h2>Article 1 – Objet</h2>
<p>L'Auteur cède à l'Éditeur le droit exclusif de publier et diffuser l'ouvrage intitulé <em>{{titre_ouvrage}}</em> pour un tirage initial de {{tirage_initial}} exemplaires.</p>
<h2>Article 2 – Droits d'auteur</h2>
<p>L'Auteur perçoit un pourcentage sur le prix public hors taxes de chaque exemplaire vendu, conformément à la loi ivoirienne sur la propriété littéraire et artistique.</p>
<h2>Article 3 – Exclusivité</h2>
<p>L'exclusivité est accordée pour le territoire de la Côte d'Ivoire et de l'espace UEMOA pour une durée de cinq ans renouvelable.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>L'Éditeur : _____________________ &nbsp;&nbsp; L'Auteur : _____________________</p></div>`,
  },
  {
    code: 'trad_autopublication',
    name: "Accord de service d'autopublication (autoédition)",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de prestation d'autoédition assistée permettant à un auteur de publier son ouvrage sans cession de droits à une maison d'édition, avec services de mise en page et dépôt légal.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Prestataire d'autoédition", type: 'text', required: true },
      { key: 'nom_auteur', label: "Nom de l'auteur", type: 'text', required: true },
      { key: 'titre_ouvrage', label: "Titre de l'ouvrage", type: 'text', required: true },
      { key: 'services_inclus', label: "Services inclus (mise en page, ISBN, dépôt légal…)", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUTOPUBLICATION</h1>
<p>Entre <strong>{{nom_prestataire}}</strong>, prestataire en autoédition,</p>
<p>et <strong>{{nom_auteur}}</strong>, Auteur,</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire accompagne l'Auteur dans la publication autonome de son ouvrage <em>{{titre_ouvrage}}</em>. Les services inclus sont : {{services_inclus}}.</p>
<h2>Article 2 – Propriété des droits</h2>
<p>L'Auteur conserve l'intégralité de ses droits d'auteur sur l'ouvrage. Le Prestataire n'acquiert aucun droit de propriété intellectuelle.</p>
<h2>Article 3 – Dépôt légal</h2>
<p>Le Prestataire assiste l'Auteur dans le dépôt légal auprès de la Bibliothèque Nationale de Côte d'Ivoire (BNI-CI).</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_impression_diffusion',
    name: "Accord de service d'impression et diffusion d'un livre",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Contrat d'impression et de distribution d'un ouvrage entre un auteur ou éditeur et une imprimerie, précisant les quantités, délais, coûts unitaires et canaux de distribution.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'nom_imprimeur', label: "Nom de l'imprimeur / distributeur", type: 'text', required: true },
      { key: 'nom_client', label: "Auteur ou éditeur", type: 'text', required: true },
      { key: 'titre_ouvrage', label: "Titre de l'ouvrage", type: 'text', required: true },
      { key: 'quantite', label: "Quantité à imprimer", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison souhaitée", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'IMPRESSION ET DIFFUSION DE LIVRE</h1>
<p>Entre <strong>{{nom_imprimeur}}</strong>, Imprimeur-Diffuseur, et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Impression et diffusion de {{quantite}} exemplaires de l'ouvrage <em>{{titre_ouvrage}}</em>, livrés au plus tard le {{date_livraison}}.</p>
<h2>Article 2 – Spécifications techniques</h2>
<p>Format, grammage du papier, type de reliure et finition de couverture sont définis dans l'annexe technique jointe.</p>
<h2>Article 3 – Distribution</h2>
<p>L'Imprimeur assure la distribution dans les librairies et points de vente agréés en Côte d'Ivoire.</p>
<p>Signatures des parties : ________________________________</p></div>`,
  },
  {
    code: 'trad_librairie',
    name: "Accord de service de librairie (distribution livres)",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de distribution d'ouvrages entre un éditeur et une librairie, fixant les conditions de dépôt-vente, remises commerciales et retour des invendus.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 56,
    fieldsJson: F([
      { key: 'nom_librairie', label: "Nom de la librairie", type: 'text', required: true },
      { key: 'nom_editeur', label: "Nom de l'éditeur", type: 'text', required: true },
      { key: 'taux_remise', label: "Taux de remise accordé (%)", type: 'text', required: true },
      { key: 'conditions_retour', label: "Conditions de retour des invendus", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION DE LIVRES EN LIBRAIRIE</h1>
<p>Entre <strong>{{nom_editeur}}</strong>, Éditeur, et <strong>{{nom_librairie}}</strong>, Libraire,</p>
<h2>Article 1 – Objet</h2>
<p>L'Éditeur confie au Libraire la vente en dépôt de ses ouvrages avec une remise de {{taux_remise}}% sur le prix public.</p>
<h2>Article 2 – Retours</h2>
<p>{{conditions_retour}}</p>
<h2>Article 3 – Règlement</h2>
<p>Le Libraire règle l'Éditeur mensuellement sur la base des ventes nettes constatées.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_correction',
    name: "Accord de service de correction et relecture",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 8000,
    description: "Contrat de correction orthographique, grammaticale et stylistique de manuscrits ou documents professionnels avant publication ou diffusion.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_correcteur', label: "Nom du correcteur", type: 'text', required: true },
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'type_document', label: "Type de document à corriger", type: 'text', required: true },
      { key: 'nombre_pages', label: "Nombre de pages", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison souhaitée", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CORRECTION ET RELECTURE</h1>
<p>Entre <strong>{{nom_correcteur}}</strong>, correcteur professionnel, et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Correction orthographique, grammaticale et stylistique du document de type <em>{{type_document}}</em> d'un volume de {{nombre_pages}} pages, livré le {{date_livraison}}.</p>
<h2>Article 2 – Livrables</h2>
<p>Le document est retourné en version annotée (suivi des modifications) et en version propre.</p>
<h2>Article 3 – Engagement</h2>
<p>Le correcteur s'engage à ne pas divulguer le contenu du document avant sa publication officielle.</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_mise_en_page',
    name: "Accord de service de mise en page et PAO (édition)",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de mise en page et publication assistée par ordinateur (PAO) pour livres, revues et supports de communication, avec livraison des fichiers prêts à l'impression.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_maquettiste', label: "Nom du maquettiste / studio PAO", type: 'text', required: true },
      { key: 'nom_client', label: "Client (auteur ou éditeur)", type: 'text', required: true },
      { key: 'titre_document', label: "Titre du document", type: 'text', required: true },
      { key: 'logiciel_pao', label: "Logiciel PAO utilisé (InDesign, QuarkXPress…)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MISE EN PAGE ET PAO</h1>
<p>Entre <strong>{{nom_maquettiste}}</strong> et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Mise en page et PAO du document <em>{{titre_document}}</em> sous {{logiciel_pao}}, conformément à la charte graphique fournie par le Client.</p>
<h2>Article 2 – Livrables</h2>
<p>Fichiers PDF HD, fichiers sources natifs et versions print-ready remis au Client à la validation finale.</p>
<h2>Article 3 – Révisions</h2>
<p>Deux cycles de révisions sont inclus. Toute révision supplémentaire est facturée au tarif horaire convenu.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_illustration',
    name: "Accord de service d'illustration de livre",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Contrat de création d'illustrations originales pour un ouvrage (livre jeunesse, bande dessinée, manuel scolaire), incluant la cession des droits d'illustration.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'nom_illustrateur', label: "Nom de l'illustrateur", type: 'text', required: true },
      { key: 'nom_client', label: "Auteur ou éditeur", type: 'text', required: true },
      { key: 'titre_ouvrage', label: "Titre de l'ouvrage", type: 'text', required: true },
      { key: 'nombre_illustrations', label: "Nombre d'illustrations prévues", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ILLUSTRATION DE LIVRE</h1>
<p><strong>{{nom_illustrateur}}</strong>, illustrateur, et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Création de {{nombre_illustrations}} illustrations originales pour l'ouvrage <em>{{titre_ouvrage}}</em>, selon le brief créatif fourni par le Client.</p>
<h2>Article 2 – Cession de droits</h2>
<p>L'Illustrateur cède les droits de reproduction des illustrations au Client pour l'édition concernée, tout en conservant ses droits moraux.</p>
<h2>Article 3 – Crédit</h2>
<p>Le nom de l'Illustrateur est mentionné en couverture et en page de colophon.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_manuels_scolaires',
    name: "Accord de service de création de manuels scolaires",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: "Contrat de rédaction et production de manuels scolaires conformes aux programmes officiels ivoiriens (MENA), incluant validation pédagogique et dépôt légal.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Éditeur / prestataire pédagogique", type: 'text', required: true },
      { key: 'nom_client', label: "Ministère ou établissement commanditaire", type: 'text', required: true },
      { key: 'matiere', label: "Matière et niveau scolaire", type: 'text', required: true },
      { key: 'nombre_exemplaires', label: "Nombre d'exemplaires", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CRÉATION DE MANUELS SCOLAIRES</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Rédaction, mise en page et impression de {{nombre_exemplaires}} manuels scolaires pour la matière <em>{{matiere}}</em>, conformes aux instructions officielles du MENA-CI.</p>
<h2>Article 2 – Validation</h2>
<p>Les manuels sont soumis à l'approbation pédagogique du comité de lecture du MENA avant impression définitive.</p>
<h2>Article 3 – Propriété</h2>
<p>Les manuels produits sont la propriété du Client. Le prestataire conserve ses droits moraux sur les contenus créés.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_langues_africaines',
    name: "Accord de service de traduction en langues africaines (dioula, baoulé)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de traduction de documents ou contenus vers les langues nationales de Côte d'Ivoire (dioula, baoulé, bété, etc.) pour des campagnes de sensibilisation ou des publications locales.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_traducteur', label: "Nom du traducteur en langue africaine", type: 'text', required: true },
      { key: 'nom_client', label: "Client / organisation", type: 'text', required: true },
      { key: 'langue_cible', label: "Langue africaine cible (dioula, baoulé…)", type: 'text', required: true },
      { key: 'type_contenu', label: "Type de contenu à traduire", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRADUCTION EN LANGUE AFRICAINE</h1>
<p>Entre <strong>{{nom_traducteur}}</strong>, locuteur natif certifié, et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Traduction de <em>{{type_contenu}}</em> vers la langue {{langue_cible}}, en respectant les normes orthographiques et les particularités culturelles de la communauté cible.</p>
<h2>Article 2 – Validation communautaire</h2>
<p>La traduction est validée par un comité de locuteurs représentatifs de la communauté linguistique concernée.</p>
<h2>Article 3 – Valorisation culturelle</h2>
<p>Le Client s'engage à mentionner la langue africaine concernée dans toutes les communications publiques liées au contenu traduit.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_cession_droits_roman',
    name: "Accord de cession de droits d'auteur d'un roman",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de cession partielle ou totale des droits patrimoniaux d'un roman à un éditeur ou producteur, conformément à la loi ivoirienne sur la propriété intellectuelle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_auteur', label: "Nom de l'auteur", type: 'text', required: true },
      { key: 'nom_cessionnaire', label: "Nom du cessionnaire (éditeur/producteur)", type: 'text', required: true },
      { key: 'titre_roman', label: "Titre du roman", type: 'text', required: true },
      { key: 'droits_cedes', label: "Droits cédés (reproduction, adaptation, traduction…)", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE DROITS D'AUTEUR – ROMAN</h1>
<p><strong>{{nom_auteur}}</strong>, Auteur, cède à <strong>{{nom_cessionnaire}}</strong>, Cessionnaire,</p>
<h2>Article 1 – Objet de la cession</h2>
<p>Les droits patrimoniaux suivants sur l'œuvre intitulée <em>{{titre_roman}}</em> : {{droits_cedes}}.</p>
<h2>Article 2 – Droits moraux</h2>
<p>L'Auteur conserve ses droits moraux inaliénables (droit à la paternité, droit au respect de l'œuvre).</p>
<h2>Article 3 – Rémunération</h2>
<p>Le Cessionnaire verse à l'Auteur une avance sur droits et un pourcentage sur les ventes, définis en annexe financière.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>L'Auteur : _____________________ &nbsp;&nbsp; Le Cessionnaire : _____________________</p></div>`,
  },
  {
    code: 'trad_licence_traduction',
    name: "Accord de licence de traduction d'un ouvrage",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de licence accordant à un éditeur étranger ou local le droit de traduire et publier un ouvrage dans une autre langue, avec paiement d'une avance et de redevances.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'donneur_licence', label: "Donneur de licence (éditeur original)", type: 'text', required: true },
      { key: 'preneur_licence', label: "Preneur de licence (éditeur traducteur)", type: 'text', required: true },
      { key: 'titre_ouvrage', label: "Titre de l'ouvrage original", type: 'text', required: true },
      { key: 'langue_traduction', label: "Langue de traduction autorisée", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE TRADUCTION D'UN OUVRAGE</h1>
<p>Entre <strong>{{donneur_licence}}</strong>, Donneur de licence, et <strong>{{preneur_licence}}</strong>, Preneur de licence,</p>
<h2>Article 1 – Objet</h2>
<p>Le Donneur de licence autorise le Preneur à traduire et publier <em>{{titre_ouvrage}}</em> en langue {{langue_traduction}}.</p>
<h2>Article 2 – Redevances</h2>
<p>Le Preneur verse une avance et des redevances sur ventes selon le barème défini en annexe.</p>
<h2>Article 3 – Qualité</h2>
<p>Le Donneur de licence dispose d'un droit de regard sur la qualité de la traduction avant publication.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_audiobook',
    name: "Accord de service d'enregistrement audio d'un livre (audiobook)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de production d'un livre audio (audiobook) entre un auteur ou éditeur et un studio d'enregistrement, incluant narration, montage et diffusion sur plateformes numériques.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'nom_studio', label: "Nom du studio d'enregistrement", type: 'text', required: true },
      { key: 'nom_client', label: "Auteur ou éditeur", type: 'text', required: true },
      { key: 'titre_livre', label: "Titre du livre", type: 'text', required: true },
      { key: 'nom_narrateur', label: "Nom du narrateur", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION D'AUDIOBOOK</h1>
<p>Entre <strong>{{nom_studio}}</strong>, Studio, et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Production de la version audio du livre <em>{{titre_livre}}</em>, narré par <strong>{{nom_narrateur}}</strong>, selon les spécifications techniques ACX.</p>
<h2>Article 2 – Droits</h2>
<p>Le Client obtient les droits de diffusion de l'audiobook sur les plateformes numériques (Audible, Spotify, etc.) pour le territoire défini en annexe.</p>
<h2>Article 3 – Révisions</h2>
<p>Le Client dispose d'un droit d'écoute et de correction avant validation finale du master audio.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'trad_rapport_edition',
    name: "Rapport de performance maison d'édition",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Rapport périodique de performance d'une maison d'édition couvrant les ventes, les titres publiés, les stocks et les perspectives éditoriales.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'nom_maison_edition', label: "Nom de la maison d'édition", type: 'text', required: true },
      { key: 'periode', label: "Période couverte", type: 'text', required: true },
      { key: 'responsable', label: "Responsable du rapport", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – MAISON D'ÉDITION</h1>
<p>Établissement : <strong>{{nom_maison_edition}}</strong></p>
<p>Période : {{periode}} | Responsable : {{responsable}} | Date : {{date_rapport}}</p>
<h2>1. Titres publiés</h2>
<p>[Nombre de nouveaux titres publiés au cours de la période, par catégorie]</p>
<h2>2. Ventes et diffusion</h2>
<p>[Chiffre d'affaires, exemplaires vendus, canaux de distribution]</p>
<h2>3. Stocks</h2>
<p>[État des stocks par titre, taux de retour librairies]</p>
<h2>4. Perspectives</h2>
<p>[Titres en préparation, partenariats envisagés, stratégie numérique]</p>
<p>Le Directeur Éditorial : _____________________</p></div>`,
  },
  {
    code: 'trad_charte_edition',
    name: "Charte de l'édition africaine et des droits des auteurs",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Document de référence éthique et déontologique fixant les engagements des maisons d'édition africaines envers les auteurs, la diversité culturelle et l'accès au livre.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'nom_maison_edition', label: "Nom de la maison d'édition", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true },
      { key: 'signataire', label: "Nom et qualité du signataire", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ÉDITION AFRICAINE ET DES DROITS DES AUTEURS</h1>
<p>Adoptée par <strong>{{nom_maison_edition}}</strong> le {{date_adoption}}</p>
<h2>Préambule</h2>
<p>Convaincue de la mission culturelle et sociale de l'édition africaine, la maison d'édition soussignée s'engage à respecter et promouvoir les droits des auteurs africains.</p>
<h2>Article 1 – Équité des contrats</h2>
<p>Tout contrat d'édition est rédigé de manière claire et équilibrée, garantissant une rémunération juste à l'auteur.</p>
<h2>Article 2 – Diversité culturelle</h2>
<p>L'éditeur s'engage à valoriser la diversité des langues et cultures africaines dans son catalogue.</p>
<h2>Article 3 – Accès au livre</h2>
<p>L'éditeur œuvre pour la disponibilité des ouvrages à des prix accessibles sur l'ensemble du territoire ivoirien.</p>
<p>Signé par : <strong>{{signataire}}</strong></p></div>`,
  },

  // ─── 25 templates Bibliothèque / Archives / Publications académiques ────────
  {
    code: 'bibl_depot_legal',
    name: "Accord de dépôt légal d'un ouvrage (BNI-CI)",
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: "Formulaire et accord de dépôt légal d'un ouvrage auprès de la Bibliothèque Nationale de Côte d'Ivoire (BNI-CI), conformément à la législation sur le dépôt légal.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_auteur', label: "Nom de l'auteur ou de l'éditeur", type: 'text', required: true },
      { key: 'titre_ouvrage', label: "Titre de l'ouvrage", type: 'text', required: true },
      { key: 'isbn', label: "ISBN (si disponible)", type: 'text', required: false },
      { key: 'nombre_exemplaires', label: "Nombre d'exemplaires déposés", type: 'text', required: true },
      { key: 'date_depot', label: "Date du dépôt", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉPÔT LÉGAL – BNI-CI</h1>
<p>Déposant : <strong>{{nom_auteur}}</strong></p>
<p>Ouvrage : <em>{{titre_ouvrage}}</em> | ISBN : {{isbn}}</p>
<p>Exemplaires déposés : {{nombre_exemplaires}} | Date : {{date_depot}}</p>
<h2>Engagement du déposant</h2>
<p>Le déposant certifie que l'ouvrage est une production originale ou une réédition autorisée et s'engage à fournir le nombre légal d'exemplaires à la Bibliothèque Nationale de Côte d'Ivoire.</p>
<h2>Engagement de la BNI-CI</h2>
<p>La BNI-CI s'engage à conserver l'ouvrage et à lui attribuer un numéro de dépôt légal officiel.</p>
<p>Signature du déposant : _____________________ &nbsp;&nbsp; Visa BNI-CI : _____________________</p></div>`,
  },
  {
    code: 'bibl_abonnement_numerique',
    name: "Accord de service de bibliothèque universitaire (abonnement numérique)",
    category: 'academique',
    price: 5000,
    priceMax: 18000,
    description: "Contrat d'abonnement à des ressources numériques pour une bibliothèque universitaire ivoirienne, incluant bases de données, e-books et revues en ligne.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_fournisseur', label: "Nom du fournisseur de ressources", type: 'text', required: true },
      { key: 'nom_universite', label: "Nom de l'université / bibliothèque", type: 'text', required: true },
      { key: 'ressources_incluses', label: "Ressources numériques incluses", type: 'textarea', required: true },
      { key: 'duree_abonnement', label: "Durée de l'abonnement", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'ABONNEMENT NUMÉRIQUE – BIBLIOTHÈQUE UNIVERSITAIRE</h1>
<p>Entre <strong>{{nom_fournisseur}}</strong> et <strong>{{nom_universite}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Fourniture d'un accès aux ressources numériques suivantes : {{ressources_incluses}}, pour une durée de {{duree_abonnement}}.</p>
<h2>Article 2 – Accès</h2>
<p>L'accès est réservé aux étudiants, enseignants et personnels de recherche de l'établissement, via adresse IP institutionnelle ou VPN.</p>
<h2>Article 3 – Usage</h2>
<p>Toute reproduction ou redistribution commerciale des ressources est strictement interdite.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_archives_nationales',
    name: "Accord de service d'archives nationales (dépôt de fonds)",
    category: 'academique',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de dépôt de fonds d'archives auprès des Archives Nationales de Côte d'Ivoire, précisant les conditions de conservation, de communication et de rapatriement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_deposant', label: "Nom de l'organisme déposant", type: 'text', required: true },
      { key: 'description_fonds', label: "Description du fonds d'archives", type: 'textarea', required: true },
      { key: 'volume_metres_lineaires', label: "Volume (mètres linéaires)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉPÔT DE FONDS AUX ARCHIVES NATIONALES</h1>
<p>Déposant : <strong>{{nom_deposant}}</strong> | Volume : {{volume_metres_lineaires}} ml</p>
<p>Description : {{description_fonds}}</p>
<h2>Article 1 – Propriété</h2>
<p>Le déposant demeure propriétaire des archives déposées. Les Archives Nationales en assurent la conservation et la gestion.</p>
<h2>Article 2 – Communication</h2>
<p>La communication des archives est soumise aux délais légaux et à l'autorisation du déposant pour les documents sensibles.</p>
<h2>Article 3 – Durée</h2>
<p>Le dépôt est conclu pour une durée de dix ans renouvelable.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_numerisation_archives',
    name: "Accord de service de numérisation d'archives historiques",
    category: 'academique',
    price: 5000,
    priceMax: 18000,
    description: "Contrat de numérisation d'archives historiques (coloniales, administratives, photographiques) en vue de leur conservation numérique et mise en ligne.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Prestataire en numérisation", type: 'text', required: true },
      { key: 'nom_institution', label: "Institution détentrice des archives", type: 'text', required: true },
      { key: 'type_documents', label: "Type de documents à numériser", type: 'text', required: true },
      { key: 'volume_estime', label: "Volume estimé (nombre de pièces)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NUMÉRISATION D'ARCHIVES HISTORIQUES</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> et <strong>{{nom_institution}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Numérisation de {{volume_estime}} pièces de type <em>{{type_documents}}</em> aux résolutions et formats normalisés (TIFF 400 DPI, PDF/A).</p>
<h2>Article 2 – Sécurité</h2>
<p>Le Prestataire s'engage à manipuler les archives avec les précautions requises et à restituer les originaux en parfait état.</p>
<h2>Article 3 – Livrables</h2>
<p>Remise d'un disque dur de sauvegarde et d'un accès en ligne sécurisé au fonds numérisé.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_ged',
    name: "Accord de service de gestion électronique de documents (GED)",
    category: 'academique',
    price: 6000,
    priceMax: 20000,
    description: "Contrat de mise en place d'un système de gestion électronique de documents (GED) pour une université ou administration, incluant paramétrage, formation et maintenance.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Prestataire GED", type: 'text', required: true },
      { key: 'nom_client', label: "Institution cliente", type: 'text', required: true },
      { key: 'logiciel_ged', label: "Logiciel GED proposé", type: 'text', required: true },
      { key: 'nombre_utilisateurs', label: "Nombre d'utilisateurs", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE GED – GESTION ÉLECTRONIQUE DE DOCUMENTS</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Déploiement et maintenance de la solution GED <em>{{logiciel_ged}}</em> pour {{nombre_utilisateurs}} utilisateurs.</p>
<h2>Article 2 – Formation</h2>
<p>Une formation initiale de trois jours est dispensée aux administrateurs et utilisateurs clés.</p>
<h2>Article 3 – Maintenance</h2>
<p>Le prestataire assure une maintenance corrective et évolutive pour une durée d'un an renouvelable.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_numerique_ebook',
    name: "Accord de service de bibliothèque numérique (ebook)",
    category: 'academique',
    price: 4000,
    priceMax: 14000,
    description: "Contrat de mise en place d'une bibliothèque numérique de prêt de livres électroniques (ebooks) pour un établissement scolaire ou universitaire ivoirien.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'nom_fournisseur', label: "Fournisseur de la plateforme ebook", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement bénéficiaire", type: 'text', required: true },
      { key: 'catalogue_titres', label: "Nombre de titres au catalogue", type: 'text', required: true },
      { key: 'duree_contrat', label: "Durée du contrat", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BIBLIOTHÈQUE NUMÉRIQUE (EBOOK)</h1>
<p>Entre <strong>{{nom_fournisseur}}</strong> et <strong>{{nom_etablissement}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Accès à un catalogue de {{catalogue_titres}} ebooks pour les usagers de l'établissement pendant {{duree_contrat}}.</p>
<h2>Article 2 – Accès</h2>
<p>Les ebooks sont accessibles via l'application dédiée sur ordinateur, tablette et smartphone, avec possibilité de prêt limité dans le temps.</p>
<h2>Article 3 – DRM</h2>
<p>Les fichiers sont protégés par des mesures techniques de protection (DRM) conformes aux standards de l'industrie.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_revues_scientifiques',
    name: "Accord de service d'abonnement à des revues scientifiques",
    category: 'academique',
    price: 7000,
    priceMax: 24000,
    description: "Contrat d'abonnement institutionnel à des revues scientifiques internationales (Elsevier, Springer, CAIRN) pour une université ou un centre de recherche ivoirien.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_editeur_revue', label: "Éditeur / agrégateur de revues", type: 'text', required: true },
      { key: 'nom_institution', label: "Université ou centre de recherche", type: 'text', required: true },
      { key: 'disciplines', label: "Disciplines couvertes", type: 'text', required: true },
      { key: 'duree_abonnement', label: "Durée de l'abonnement", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'ABONNEMENT À DES REVUES SCIENTIFIQUES</h1>
<p>Entre <strong>{{nom_editeur_revue}}</strong> et <strong>{{nom_institution}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Accès en ligne aux revues scientifiques couvrant les disciplines {{disciplines}}, pour une durée de {{duree_abonnement}}.</p>
<h2>Article 2 – Accès</h2>
<p>Accès via IP institutionnelle avec possibilité de téléchargement d'articles pour usage académique personnel.</p>
<h2>Article 3 – Interbibliothèques</h2>
<p>Le prêt entre bibliothèques (PEB) est autorisé dans les limites définies par les licences des éditeurs.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_open_access',
    name: "Accord de service d'open access (publication en libre accès)",
    category: 'academique',
    price: 4000,
    priceMax: 14000,
    description: "Contrat de publication en libre accès (open access) d'articles scientifiques d'une université ivoirienne, incluant prise en charge des APC et politique de dépôt en archive ouverte.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'nom_editeur', label: "Éditeur / revue", type: 'text', required: true },
      { key: 'nom_institution', label: "Institution de l'auteur", type: 'text', required: true },
      { key: 'politique_oa', label: "Politique open access retenue (Gold / Green / Diamond)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'OPEN ACCESS</h1>
<p>Entre <strong>{{nom_editeur}}</strong> et <strong>{{nom_institution}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Publication en libre accès des articles soumis par les chercheurs de l'institution selon la politique {{politique_oa}}.</p>
<h2>Article 2 – APC</h2>
<p>Les frais de traitement des articles (APC) sont pris en charge par l'institution selon le barème en annexe.</p>
<h2>Article 3 – Licence</h2>
<p>Les articles publiés sont mis à disposition sous licence Creative Commons CC BY 4.0.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_revue_africaine',
    name: "Accord de publication dans une revue scientifique africaine",
    category: 'academique',
    price: 3000,
    priceMax: 10000,
    description: "Contrat entre un auteur chercheur et une revue scientifique africaine, définissant les droits de publication, le processus d'évaluation par les pairs et les conditions de rétractation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_revue', label: "Nom de la revue scientifique", type: 'text', required: true },
      { key: 'nom_auteur', label: "Nom du ou des auteur(s)", type: 'text', required: true },
      { key: 'titre_article', label: "Titre de l'article soumis", type: 'text', required: true },
      { key: 'date_soumission', label: "Date de soumission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PUBLICATION – REVUE SCIENTIFIQUE AFRICAINE</h1>
<p>Entre la revue <strong>{{nom_revue}}</strong> et <strong>{{nom_auteur}}</strong>,</p>
<h2>Article 1 – Soumission</h2>
<p>L'article intitulé <em>{{titre_article}}</em>, soumis le {{date_soumission}}, est accepté pour évaluation par les pairs selon le processus en double aveugle.</p>
<h2>Article 2 – Droits</h2>
<p>En cas d'acceptation, l'auteur cède à la revue le droit de première publication. Il conserve le droit de déposer l'article en archive ouverte après un embargo de six mois.</p>
<h2>Article 3 – Éthique</h2>
<p>L'auteur déclare que l'article est original, non soumis simultanément ailleurs et exempt de toute fraude scientifique.</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_propriete_intellectuelle',
    name: "Accord de service de gestion de la propriété intellectuelle université",
    category: 'academique',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de gestion des droits de propriété intellectuelle issus de la recherche universitaire, incluant brevets, logiciels et œuvres de l'esprit, conformément à la législation OAPI.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'nom_universite', label: "Nom de l'université", type: 'text', required: true },
      { key: 'nom_chercheur', label: "Nom du chercheur / enseignant", type: 'text', required: true },
      { key: 'type_creation', label: "Type de création (brevet, logiciel, œuvre…)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE PROPRIÉTÉ INTELLECTUELLE – UNIVERSITÉ</h1>
<p>Entre <strong>{{nom_universite}}</strong> et <strong>{{nom_chercheur}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Gestion des droits de propriété intellectuelle relatifs à la création de type <em>{{type_creation}}</em>, issue des activités de recherche au sein de l'université.</p>
<h2>Article 2 – Titularité</h2>
<p>Conformément à la loi ivoirienne et aux accords OAPI, les droits patrimoniaux appartiennent à l'université, qui reverse une quote-part au chercheur selon le règlement interne.</p>
<h2>Article 3 – Valorisation</h2>
<p>L'université assure la protection, l'exploitation et le transfert de technologie via sa cellule de valorisation.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_these_doctorat',
    name: "Accord de publication d'une thèse de doctorat",
    category: 'academique',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de publication et de diffusion d'une thèse de doctorat soutenue dans une université ivoirienne, incluant dépôt institutionnel, embargo et diffusion en ligne.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_doctorant', label: "Nom du doctorant", type: 'text', required: true },
      { key: 'titre_these', label: "Titre de la thèse", type: 'text', required: true },
      { key: 'universite', label: "Université de soutenance", type: 'text', required: true },
      { key: 'date_soutenance', label: "Date de soutenance", type: 'date', required: true },
      { key: 'embargo', label: "Durée d'embargo éventuelle (0 si aucun)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PUBLICATION DE THÈSE DE DOCTORAT</h1>
<p>Doctorant : <strong>{{nom_doctorant}}</strong> | Université : {{universite}}</p>
<p>Titre : <em>{{titre_these}}</em> | Soutenance : {{date_soutenance}}</p>
<h2>Article 1 – Dépôt</h2>
<p>Le doctorant autorise le dépôt de sa thèse dans le répertoire institutionnel et la plateforme nationale PASO-CI.</p>
<h2>Article 2 – Embargo</h2>
<p>Un embargo de {{embargo}} mois est appliqué avant diffusion publique, si applicable.</p>
<h2>Article 3 – Droits</h2>
<p>Le doctorant conserve ses droits d'auteur et peut publier des extraits dans des revues scientifiques.</p>
<p>Signature du doctorant : _____________________ | Visa bibliothèque : _____________________</p></div>`,
  },
  {
    code: 'bibl_bibliometrie',
    name: "Accord de service de bibliométrie et analyse de citations",
    category: 'academique',
    price: 4000,
    priceMax: 14000,
    description: "Contrat de prestation de bibliométrie, analyse d'impact et cartographie des citations pour un laboratoire de recherche ou une université ivoirienne.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Prestataire en bibliométrie", type: 'text', required: true },
      { key: 'nom_institution', label: "Institution cliente", type: 'text', required: true },
      { key: 'periode_analyse', label: "Période d'analyse (ex : 2015-2025)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BIBLIOMÉTRIE</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> et <strong>{{nom_institution}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Analyse bibliométrique des productions scientifiques de l'institution pour la période {{periode_analyse}}, incluant indicateurs de citation (h-index, facteur d'impact) et cartographie thématique.</p>
<h2>Article 2 – Sources</h2>
<p>L'analyse s'appuie sur les bases de données Web of Science, Scopus et African Journals Online (AJOL).</p>
<h2>Article 3 – Rapport</h2>
<p>Un rapport détaillé et des visualisations interactives sont remis à l'institution à la fin de la prestation.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_partenariat_editeur',
    name: "Accord de partenariat bibliothèque-éditeur numérique",
    category: 'academique',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de partenariat entre une bibliothèque universitaire et un éditeur numérique pour l'acquisition partagée de ressources et la co-promotion de la culture scientifique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_bibliotheque', label: "Nom de la bibliothèque", type: 'text', required: true },
      { key: 'nom_editeur', label: "Nom de l'éditeur numérique", type: 'text', required: true },
      { key: 'modalites_partenariat', label: "Modalités du partenariat", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT BIBLIOTHÈQUE – ÉDITEUR NUMÉRIQUE</h1>
<p>Entre <strong>{{nom_bibliotheque}}</strong> et <strong>{{nom_editeur}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Partenariat visant l'acquisition de ressources numériques à tarif préférentiel et la co-organisation d'événements de promotion de la lecture scientifique.</p>
<h2>Article 2 – Modalités</h2>
<p>{{modalites_partenariat}}</p>
<h2>Article 3 – Évaluation</h2>
<p>Un bilan annuel du partenariat est effectué conjointement par les deux parties.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_conservation_restauration',
    name: "Accord de service de conservation et restauration d'archives",
    category: 'academique',
    price: 6000,
    priceMax: 20000,
    description: "Contrat de conservation préventive et de restauration de documents d'archives dégradés (papier, parchemin, photographies) confié à un atelier spécialisé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'nom_atelier', label: "Nom de l'atelier de restauration", type: 'text', required: true },
      { key: 'nom_institution', label: "Institution détentrice", type: 'text', required: true },
      { key: 'type_documents', label: "Type de documents à restaurer", type: 'text', required: true },
      { key: 'nombre_pieces', label: "Nombre de pièces", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSERVATION ET RESTAURATION D'ARCHIVES</h1>
<p>Entre <strong>{{nom_atelier}}</strong>, restaurateur agréé, et <strong>{{nom_institution}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Conservation préventive et restauration de {{nombre_pieces}} pièces de type <em>{{type_documents}}</em>.</p>
<h2>Article 2 – Méthodes</h2>
<p>Les interventions respectent les normes ISO 9706 (permanence du papier) et les règles déontologiques de la restauration du patrimoine.</p>
<h2>Article 3 – Rapport d'état</h2>
<p>Un rapport d'état avant/après intervention est remis à l'institution avec photographies documentaires.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_publication_langue_africaine',
    name: "Accord de service de traduction et publication en langue africaine",
    category: 'academique',
    price: 4000,
    priceMax: 14000,
    description: "Contrat de traduction et publication de contenus académiques ou scientifiques en langues africaines de Côte d'Ivoire, pour une diffusion auprès des communautés locales.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'nom_prestataire', label: "Prestataire / linguiste", type: 'text', required: true },
      { key: 'nom_institution', label: "Institution commanditaire", type: 'text', required: true },
      { key: 'langue_cible', label: "Langue africaine cible", type: 'text', required: true },
      { key: 'titre_contenu', label: "Titre du contenu à traduire", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRADUCTION ET PUBLICATION EN LANGUE AFRICAINE</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> et <strong>{{nom_institution}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Traduction et publication du contenu <em>{{titre_contenu}}</em> en langue {{langue_cible}}, avec validation par des locuteurs experts.</p>
<h2>Article 2 – Comité de validation</h2>
<p>Un comité de trois locuteurs natifs certifiés valide la traduction avant publication.</p>
<h2>Article 3 – Diffusion</h2>
<p>Le contenu publié est diffusé gratuitement dans les bibliothèques et centres communautaires de la zone linguistique concernée.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_base_donnees',
    name: "Accord de service de base de données scientifiques",
    category: 'academique',
    price: 7000,
    priceMax: 24000,
    description: "Contrat d'accès et de gestion d'une base de données scientifiques spécialisée pour un laboratoire ou une université, incluant formation et assistance technique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'nom_fournisseur', label: "Fournisseur de la base de données", type: 'text', required: true },
      { key: 'nom_institution', label: "Institution abonnée", type: 'text', required: true },
      { key: 'nom_base', label: "Nom de la base de données", type: 'text', required: true },
      { key: 'duree_contrat', label: "Durée du contrat", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – BASE DE DONNÉES SCIENTIFIQUES</h1>
<p>Entre <strong>{{nom_fournisseur}}</strong> et <strong>{{nom_institution}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Accès à la base de données <em>{{nom_base}}</em> pour une durée de {{duree_contrat}}, incluant toutes les fonctionnalités de recherche avancée et d'export bibliographique.</p>
<h2>Article 2 – Formation</h2>
<p>Le fournisseur assure deux sessions de formation par an et une assistance en ligne permanente.</p>
<h2>Article 3 – Statistiques d'usage</h2>
<p>Des rapports d'utilisation mensuels sont communiqués à l'institution pour justifier le renouvellement.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_reference_documentation',
    name: "Accord de service de référence et documentation (bibliographique)",
    category: 'academique',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de service de référence documentaire et de gestion de bibliographies pour chercheurs et étudiants doctorants, incluant l'utilisation de logiciels de gestion bibliographique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'nom_bibliothecaire', label: "Nom du bibliothécaire référent", type: 'text', required: true },
      { key: 'nom_client', label: "Nom du chercheur ou doctorant", type: 'text', required: true },
      { key: 'domaine_recherche', label: "Domaine de recherche", type: 'text', required: true },
      { key: 'logiciel_biblio', label: "Logiciel bibliographique utilisé (Zotero, Mendeley…)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉFÉRENCE ET DOCUMENTATION</h1>
<p>Entre <strong>{{nom_bibliothecaire}}</strong> et <strong>{{nom_client}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Assistance documentaire spécialisée dans le domaine <em>{{domaine_recherche}}</em>, incluant la constitution de bibliographies et la formation à {{logiciel_biblio}}.</p>
<h2>Article 2 – Livrables</h2>
<p>Bibliographie annotée, veille documentaire mensuelle et formation aux outils de gestion des références.</p>
<h2>Article 3 – Confidentialité</h2>
<p>Les thématiques de recherche du chercheur sont traitées avec la plus stricte confidentialité.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_partenariat_ecole_primaire',
    name: "Accord de partenariat bibliothèque-école primaire (promotion lecture)",
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: "Convention de partenariat entre une bibliothèque publique ou universitaire et une école primaire ivoirienne pour la promotion de la lecture chez les jeunes élèves.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_bibliotheque', label: "Nom de la bibliothèque partenaire", type: 'text', required: true },
      { key: 'nom_ecole', label: "Nom de l'école primaire", type: 'text', required: true },
      { key: 'activites_prevues', label: "Activités prévues (ateliers, prêts, animations…)", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT BIBLIOTHÈQUE – ÉCOLE PRIMAIRE</h1>
<p>Entre <strong>{{nom_bibliotheque}}</strong> et <strong>{{nom_ecole}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Partenariat pour la promotion de la lecture auprès des élèves de l'école primaire, à travers les activités suivantes : {{activites_prevues}}.</p>
<h2>Article 2 – Engagements</h2>
<p>La bibliothèque met à disposition des fonds adaptés aux niveaux CP-CM2 et forme les enseignants à l'animation littéraire.</p>
<h2>Article 3 – Évaluation</h2>
<p>Un bilan semestriel mesurant le taux de participation et d'emprunt est partagé entre les deux établissements.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_livre_scolaire',
    name: "Accord de service de livre scolaire (fourniture manuels)",
    category: 'academique',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de fourniture de manuels scolaires agréés par le MENA-CI à un établissement scolaire, précisant quantités, prix, délais et conditions de retour.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_fournisseur', label: "Fournisseur de manuels scolaires", type: 'text', required: true },
      { key: 'nom_etablissement', label: "Établissement scolaire", type: 'text', required: true },
      { key: 'liste_manuels', label: "Liste des manuels et quantités", type: 'textarea', required: true },
      { key: 'date_livraison', label: "Date de livraison", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE FOURNITURE DE MANUELS SCOLAIRES</h1>
<p>Entre <strong>{{nom_fournisseur}}</strong> et <strong>{{nom_etablissement}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Fourniture des manuels scolaires agréés MENA-CI suivants : {{liste_manuels}}.</p>
<h2>Article 2 – Livraison</h2>
<p>Les manuels sont livrés en bon état au plus tard le {{date_livraison}}, avant la rentrée scolaire.</p>
<h2>Article 3 – Retours</h2>
<p>Les manuels défectueux ou erronés sont repris et remplacés sans frais dans un délai de quinze jours.</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_mediatheque',
    name: "Accord de service de médiathèque et fonds audiovisuel",
    category: 'academique',
    price: 4000,
    priceMax: 14000,
    description: "Contrat de gestion d'un fonds audiovisuel dans une médiathèque (DVD, films documentaires, enregistrements sonores), incluant droits de diffusion et conditions de prêt.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'nom_mediatheque', label: "Nom de la médiathèque", type: 'text', required: true },
      { key: 'nom_fournisseur', label: "Fournisseur du fonds audiovisuel", type: 'text', required: true },
      { key: 'type_ressources', label: "Type de ressources audiovisuelles", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MÉDIATHÈQUE ET FONDS AUDIOVISUEL</h1>
<p>Entre <strong>{{nom_fournisseur}}</strong> et <strong>{{nom_mediatheque}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Constitution et gestion d'un fonds de ressources audiovisuelles de type <em>{{type_ressources}}</em> destiné au prêt et à la consultation sur place.</p>
<h2>Article 2 – Droits de diffusion</h2>
<p>Les ressources sont acquises avec licence de diffusion publique non commerciale pour les usagers de la médiathèque.</p>
<h2>Article 3 – Conservation</h2>
<p>La médiathèque assure la conservation des supports selon les recommandations techniques du fournisseur.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_club_lecture',
    name: "Accord de service de club de lecture",
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: "Convention de création et animation d'un club de lecture dans un établissement scolaire, universitaire ou communautaire ivoirien, incluant programmation et liste de lectures.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_animateur', label: "Nom de l'animateur du club", type: 'text', required: true },
      { key: 'nom_structure', label: "Nom de l'établissement ou association", type: 'text', required: true },
      { key: 'frequence_reunions', label: "Fréquence des réunions", type: 'text', required: true },
      { key: 'date_lancement', label: "Date de lancement du club", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CLUB DE LECTURE</h1>
<p>Entre <strong>{{nom_animateur}}</strong>, animateur, et <strong>{{nom_structure}}</strong>,</p>
<h2>Article 1 – Objet</h2>
<p>Création et animation d'un club de lecture se réunissant {{frequence_reunions}}, lancé le {{date_lancement}}.</p>
<h2>Article 2 – Programmation</h2>
<p>L'animateur propose une sélection d'ouvrages variés (littérature africaine, classiques, essais) et anime les discussions.</p>
<h2>Article 3 – Participation</h2>
<p>L'adhésion au club est ouverte à toute personne partageant le goût de la lecture, sans condition de niveau scolaire.</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_festival_livre',
    name: "Accord de service de festival du livre (LIVRE SUR LA PLACE CI)",
    category: 'academique',
    price: 5000,
    priceMax: 18000,
    description: "Convention de participation ou de co-organisation du festival du livre de Côte d'Ivoire, définissant les obligations des exposants, les espaces attribués et les conditions commerciales.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'nom_organisateur', label: "Nom de l'organisateur du festival", type: 'text', required: true },
      { key: 'nom_exposant', label: "Nom de l'exposant (éditeur, librairie, auteur)", type: 'text', required: true },
      { key: 'edition_festival', label: "Édition du festival", type: 'text', required: true },
      { key: 'dates_festival', label: "Dates du festival", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTICIPATION – FESTIVAL DU LIVRE</h1>
<p>Entre <strong>{{nom_organisateur}}</strong>, Organisateur, et <strong>{{nom_exposant}}</strong>, Exposant,</p>
<h2>Article 1 – Objet</h2>
<p>Participation à l'édition {{edition_festival}} du festival du livre de Côte d'Ivoire, du {{dates_festival}}.</p>
<h2>Article 2 – Stand</h2>
<p>L'Organisateur attribue à l'Exposant un espace d'exposition défini en annexe, clé en main.</p>
<h2>Article 3 – Obligations</h2>
<p>L'Exposant s'engage à tenir son stand ouvert pendant toute la durée du festival et à respecter la charte graphique de l'événement.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
<p>Signatures : ________________________________</p></div>`,
  },
  {
    code: 'bibl_prix_litteraire',
    name: "Accord de prix littéraire (attribution)",
    category: 'academique',
    price: 3000,
    priceMax: 10000,
    description: "Règlement et accord d'attribution d'un prix littéraire ivoirien ou panafricain, précisant les critères de sélection, la composition du jury et les dotations.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_prix', label: "Nom du prix littéraire", type: 'text', required: true },
      { key: 'organisateur', label: "Organisateur / institution", type: 'text', required: true },
      { key: 'dotation', label: "Dotation du prix (montant et nature)", type: 'text', required: true },
      { key: 'date_ceremonie', label: "Date de la cérémonie de remise", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT D'ATTRIBUTION – PRIX LITTÉRAIRE</h1>
<p>Prix : <strong>{{nom_prix}}</strong> | Organisateur : {{organisateur}}</p>
<p>Dotation : {{dotation}} | Cérémonie : {{date_ceremonie}}</p>
<h2>Article 1 – Objet</h2>
<p>Le présent règlement fixe les conditions de candidature, de sélection et d'attribution du prix littéraire.</p>
<h2>Article 2 – Jury</h2>
<p>Un jury indépendant composé de cinq membres (écrivains, critiques, universitaires) délibère à bulletin secret.</p>
<h2>Article 3 – Lauréat</h2>
<p>Le lauréat reçoit la dotation et s'engage à participer aux activités de promotion organisées par l'organisateur pendant une année.</p>
<p>Le Président du jury : _____________________ | L'Organisateur : _____________________</p></div>`,
  },
  {
    code: 'bibl_rapport_bibliotheque',
    name: "Rapport de performance bibliothèque",
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: "Rapport périodique de performance d'une bibliothèque publique ou universitaire ivoirienne, couvrant les indicateurs de fréquentation, d'emprunt, d'acquisition et d'animation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'nom_bibliotheque', label: "Nom de la bibliothèque", type: 'text', required: true },
      { key: 'periode', label: "Période du rapport", type: 'text', required: true },
      { key: 'responsable', label: "Responsable du rapport", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – BIBLIOTHÈQUE</h1>
<p>Établissement : <strong>{{nom_bibliotheque}}</strong></p>
<p>Période : {{periode}} | Responsable : {{responsable}} | Date : {{date_rapport}}</p>
<h2>1. Fréquentation</h2>
<p>[Nombre de visiteurs par mois, évolution par rapport à la période précédente]</p>
<h2>2. Emprunts</h2>
<p>[Nombre d'ouvrages empruntés, taux de retour, titres les plus demandés]</p>
<h2>3. Acquisitions</h2>
<p>[Nouvelles acquisitions par catégorie, dons reçus, désherbage effectué]</p>
<h2>4. Animations</h2>
<p>[Événements organisés, participation, partenariats]</p>
<h2>5. Perspectives</h2>
<p>[Objectifs pour la période suivante, besoins en ressources]</p>
<p>Le Directeur : _____________________</p></div>`,
  },
  {
    code: 'bibl_charte_acces_savoir',
    name: "Charte de l'accès universel au savoir et de la culture",
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: "Document de référence éthique engageant une institution (bibliothèque, université, collectivité) à garantir l'accès libre et équitable au savoir et à la culture pour tous les citoyens ivoiriens.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_institution', label: "Nom de l'institution signataire", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption", type: 'date', required: true },
      { key: 'representant', label: "Nom et qualité du représentant", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ACCÈS UNIVERSEL AU SAVOIR ET DE LA CULTURE</h1>
<p>Adoptée par <strong>{{nom_institution}}</strong> le {{date_adoption}}</p>
<h2>Préambule</h2>
<p>Considérant que l'accès au savoir et à la culture est un droit fondamental de tout être humain, l'institution soussignée s'engage à œuvrer pour l'égalité des chances devant le savoir.</p>
<h2>Principe 1 – Accès libre</h2>
<p>Les collections de l'institution sont accessibles à tous les citoyens, sans discrimination de genre, d'origine ou de condition sociale.</p>
<h2>Principe 2 – Gratuité</h2>
<p>L'accès de base aux ressources documentaires est gratuit ou à coût minimal pour les personnes à faibles revenus.</p>
<h2>Principe 3 – Diversité culturelle</h2>
<p>L'institution valorise les patrimoines culturels ivoiriens et africains dans ses collections et animations.</p>
<h2>Principe 4 – Numérique inclusif</h2>
<p>L'institution met en place des espaces numériques accessibles et forme les usagers aux outils informatiques.</p>
<p>Signé par : <strong>{{representant}}</strong></p></div>`,
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
  console.log(`Batch 99b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
