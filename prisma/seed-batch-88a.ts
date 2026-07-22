import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── EVENEMENTIEL / CONGRES (eve_) ───────────────────────────────────────
  {
    code: 'eve_congres_international',
    name: "Accord de service d'organisation de congrès international",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 50000,
    description: "Contrat encadrant la prestation complète d'organisation d'un congrès international : logistique, intervenants, hébergement et coordination générale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom de l'entité organisatrice", type: 'text', required: true },
      { key: 'nom_agence', label: "Nom de l'agence prestataire", type: 'text', required: true },
      { key: 'titre_congres', label: "Intitulé du congrès", type: 'text', required: true },
      { key: 'date_evenement', label: "Date du congrès", type: 'date', required: true },
      { key: 'lieu', label: "Lieu de tenue", type: 'text', required: true },
      { key: 'budget_total', label: "Budget global convenu (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D'ORGANISATION DE CONGRÈS INTERNATIONAL</h1>
<p>Entre <strong>{{nom_client}}</strong> (ci-après « le Client ») et <strong>{{nom_agence}}</strong> (ci-après « le Prestataire »), il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire s'engage à organiser intégralement le congrès intitulé <strong>{{titre_congres}}</strong>, prévu le <strong>{{date_evenement}}</strong> à <strong>{{lieu}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Les prestations comprennent : coordination logistique, gestion des intervenants, hébergement, restauration, communication et rapport post-événement.</p>
<h2>Article 3 – Budget</h2>
<p>Le budget global est fixé à <strong>{{budget_total}}</strong> FCFA, payable selon l'échéancier annexé.</p>
<h2>Article 4 – Responsabilités</h2>
<p>Le Prestataire est responsable de la bonne exécution des prestations dans les délais convenus. Tout manquement engage sa responsabilité contractuelle.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Le présent accord est soumis au droit OHADA et aux lois en vigueur en Côte d'Ivoire.</p>
<p>Fait à ............, le {{date_evenement}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_salon_professionnel',
    name: "Accord de service de salon professionnel (stand)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 25000,
    description: "Convention encadrant la participation et la mise en place d'un stand lors d'un salon professionnel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'exposant', label: "Nom de l'exposant", type: 'text', required: true },
      { key: 'organisateur', label: "Nom de l'organisateur du salon", type: 'text', required: true },
      { key: 'nom_salon', label: "Intitulé du salon", type: 'text', required: true },
      { key: 'surface_stand', label: "Surface du stand (m²)", type: 'text', required: true },
      { key: 'date_salon', label: "Date du salon", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE SALON PROFESSIONNEL – STAND</h1>
<p>Entre <strong>{{organisateur}}</strong> (Organisateur) et <strong>{{exposant}}</strong> (Exposant) :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisateur met à disposition de l'Exposant un stand de <strong>{{surface_stand}} m²</strong> lors du salon <strong>{{nom_salon}}</strong> du <strong>{{date_salon}}</strong>.</p>
<h2>Article 2 – Prestations incluses</h2>
<p>Structure du stand, électricité, badge exposant, insertion dans le catalogue officiel.</p>
<h2>Article 3 – Obligations de l'Exposant</h2>
<p>L'Exposant s'engage à respecter le règlement intérieur du salon, à tenir son stand propre et à ne pas sous-louer l'espace.</p>
<h2>Article 4 – Droit applicable – OHADA</h2>
<p>Tout litige sera soumis à la juridiction compétente d'Abidjan selon le droit OHADA.</p>
<p>Fait à ............, le {{date_salon}}</p>
<p>L'Organisateur : ............................ &nbsp;&nbsp;&nbsp; L'Exposant : ............................</p>
</div>`,
  },
  {
    code: 'eve_forum_economique',
    name: "Accord de service de forum économique",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 35000,
    description: "Contrat de prestation pour l'organisation d'un forum économique réunissant acteurs publics et privés.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'client', label: "Entité commanditaire", type: 'text', required: true },
      { key: 'prestataire', label: "Agence organisatrice", type: 'text', required: true },
      { key: 'theme_forum', label: "Thème du forum", type: 'text', required: true },
      { key: 'date_forum', label: "Date du forum", type: 'date', required: true },
      { key: 'nb_participants', label: "Nombre de participants attendus", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE FORUM ÉCONOMIQUE</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{prestataire}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation du forum économique sur le thème <strong>{{theme_forum}}</strong>, prévu le <strong>{{date_forum}}</strong> pour <strong>{{nb_participants}}</strong> participants.</p>
<h2>Article 2 – Prestations</h2>
<p>Coordination générale, animation, logistique, documentation et rapport de synthèse.</p>
<h2>Article 3 – Paiement</h2>
<p>50 % à la signature, solde 7 jours avant l'événement.</p>
<h2>Article 4 – Force majeure</h2>
<p>En cas de force majeure dûment constatée, le présent accord sera suspendu sans pénalité.</p>
<p>Fait à ............, le {{date_forum}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_seminaire_formation',
    name: "Accord de service de séminaire de formation",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Convention de prestation pour l'organisation d'un séminaire de formation professionnelle en entreprise.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise cliente", type: 'text', required: true },
      { key: 'organisme', label: "Organisme de formation", type: 'text', required: true },
      { key: 'theme_seminaire', label: "Thème du séminaire", type: 'text', required: true },
      { key: 'date_seminaire', label: "Date du séminaire", type: 'date', required: true },
      { key: 'duree', label: "Durée (jours)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE SÉMINAIRE DE FORMATION</h1>
<p>Entre <strong>{{entreprise}}</strong> (Client) et <strong>{{organisme}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation et animation d'un séminaire de formation sur le thème <strong>{{theme_seminaire}}</strong>, du <strong>{{date_seminaire}}</strong>, d'une durée de <strong>{{duree}} jour(s)</strong>.</p>
<h2>Article 2 – Contenu pédagogique</h2>
<p>Le programme détaillé est joint en annexe. Il comprend exposés, ateliers pratiques et évaluations.</p>
<h2>Article 3 – Matériaux pédagogiques</h2>
<p>Le Prestataire fournit supports de cours, attestations de participation et rapport de formation.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Les contenus partagés lors du séminaire sont strictement confidentiels.</p>
<p>Fait à ............, le {{date_seminaire}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_team_building',
    name: "Accord de service de team building",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 15000,
    description: "Contrat encadrant une prestation de team building destinée à renforcer la cohésion d'équipe en entreprise.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'agence', label: "Agence organisatrice", type: 'text', required: true },
      { key: 'activite', label: "Type d'activité de team building", type: 'text', required: true },
      { key: 'date_activite', label: "Date de l'activité", type: 'date', required: true },
      { key: 'nombre_participants', label: "Nombre de participants", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TEAM BUILDING</h1>
<p>Entre <strong>{{entreprise}}</strong> (Client) et <strong>{{agence}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire s'engage à organiser une activité de team building de type <strong>{{activite}}</strong> le <strong>{{date_activite}}</strong> pour <strong>{{nombre_participants}}</strong> participants.</p>
<h2>Article 2 – Déroulement</h2>
<p>Le programme détaillé figure en annexe. Le Prestataire assure l'animation, le matériel et la logistique.</p>
<h2>Article 3 – Sécurité</h2>
<p>Le Prestataire est responsable de la sécurité des participants durant toute l'activité.</p>
<p>Fait à ............, le {{date_activite}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_soiree_gala',
    name: "Accord de service de soirée de gala d'entreprise",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 30000,
    description: "Convention de prestation pour l'organisation d'une soirée de gala d'entreprise (dîner, animations, remises de prix).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'agence', label: "Agence événementielle", type: 'text', required: true },
      { key: 'theme_soiree', label: "Thème de la soirée", type: 'text', required: true },
      { key: 'date_soiree', label: "Date de la soirée", type: 'date', required: true },
      { key: 'lieu', label: "Lieu de la soirée", type: 'text', required: true },
      { key: 'nb_convives', label: "Nombre de convives", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE SOIRÉE DE GALA D'ENTREPRISE</h1>
<p>Entre <strong>{{entreprise}}</strong> (Client) et <strong>{{agence}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation d'une soirée de gala sur le thème <strong>{{theme_soiree}}</strong>, le <strong>{{date_soiree}}</strong>, à <strong>{{lieu}}</strong>, pour <strong>{{nb_convives}}</strong> convives.</p>
<h2>Article 2 – Prestations incluses</h2>
<p>Décoration, restauration, animations artistiques, sonorisation et coordination générale.</p>
<h2>Article 3 – Acompte</h2>
<p>Un acompte de 40 % est exigible à la signature du présent accord.</p>
<p>Fait à ............, le {{date_soiree}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_ceremonie_prix',
    name: "Accord de service de cérémonie de remise de prix",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: "Contrat pour l'organisation d'une cérémonie officielle de remise de prix ou de distinctions.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'organisateur', label: "Entité organisatrice", type: 'text', required: true },
      { key: 'agence', label: "Agence prestataire", type: 'text', required: true },
      { key: 'nom_ceremonie', label: "Nom de la cérémonie", type: 'text', required: true },
      { key: 'date_ceremonie', label: "Date de la cérémonie", type: 'date', required: true },
      { key: 'lieu', label: "Lieu", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE CÉRÉMONIE DE REMISE DE PRIX</h1>
<p>Entre <strong>{{organisateur}}</strong> (Client) et <strong>{{agence}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire organise la cérémonie <strong>{{nom_ceremonie}}</strong> prévue le <strong>{{date_ceremonie}}</strong> à <strong>{{lieu}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Scénographie, animation, sonorisation, trophées et captation photo/vidéo.</p>
<h2>Article 3 – Protocole</h2>
<p>Le Prestataire coordonne le protocole officiel et la gestion des VIP.</p>
<p>Fait à ............, le {{date_ceremonie}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_inauguration_officielle',
    name: "Accord de service d'inauguration officielle",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 22000,
    description: "Convention de prestation pour l'organisation d'une inauguration officielle de bâtiment ou d'infrastructure.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'agence', label: "Agence événementielle", type: 'text', required: true },
      { key: 'site_inaugure', label: "Site ou ouvrage inauguré", type: 'text', required: true },
      { key: 'date_inauguration', label: "Date de l'inauguration", type: 'date', required: true },
      { key: 'autorites_invitees', label: "Autorités invitées (titre/fonction)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D'INAUGURATION OFFICIELLE</h1>
<p>Entre <strong>{{maitre_ouvrage}}</strong> (Client) et <strong>{{agence}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation de l'inauguration officielle de <strong>{{site_inaugure}}</strong>, le <strong>{{date_inauguration}}</strong>, en présence de <strong>{{autorites_invitees}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Protocole, décoration officielle, sonorisation, accueil des personnalités et couverture presse.</p>
<h2>Article 3 – Sécurité et protocole</h2>
<p>Le Prestataire assure la coordination avec les services de sécurité et le protocole d'État.</p>
<p>Fait à ............, le {{date_inauguration}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_conference_presse',
    name: "Accord de service de conférence de presse",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 12000,
    description: "Contrat encadrant l'organisation logistique et technique d'une conférence de presse.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'client', label: "Entité cliente", type: 'text', required: true },
      { key: 'agence', label: "Agence prestataire", type: 'text', required: true },
      { key: 'sujet', label: "Sujet de la conférence de presse", type: 'text', required: true },
      { key: 'date_conf', label: "Date de la conférence", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE CONFÉRENCE DE PRESSE</h1>
<p>Entre <strong>{{client}}</strong> (Client) et <strong>{{agence}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation d'une conférence de presse relative à <strong>{{sujet}}</strong>, le <strong>{{date_conf}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Location de salle, sonorisation, fond de scène, accréditation presse, dossier de presse et rafraîchissements.</p>
<h2>Article 3 – Relations médias</h2>
<p>Le Prestataire assure l'invitation et l'accueil des journalistes accrédités.</p>
<p>Fait à ............, le {{date_conf}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_lancement_produit',
    name: "Accord de service de lancement de produit",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Convention de prestation pour l'organisation d'un événement de lancement de produit ou de marque.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'marque', label: "Marque / Entreprise cliente", type: 'text', required: true },
      { key: 'agence', label: "Agence événementielle", type: 'text', required: true },
      { key: 'nom_produit', label: "Nom du produit lancé", type: 'text', required: true },
      { key: 'date_lancement', label: "Date du lancement", type: 'date', required: true },
      { key: 'lieu', label: "Lieu du lancement", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE LANCEMENT DE PRODUIT</h1>
<p>Entre <strong>{{marque}}</strong> (Client) et <strong>{{agence}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation du lancement officiel du produit <strong>{{nom_produit}}</strong>, le <strong>{{date_lancement}}</strong> à <strong>{{lieu}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Scénographie, animations, gestion des invités, relations presse et couverture digitale.</p>
<h2>Article 3 – Propriété intellectuelle</h2>
<p>Tous les supports créés restent la propriété du Client après règlement intégral.</p>
<p>Fait à ............, le {{date_lancement}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_portes_ouvertes',
    name: "Accord de service de journée portes ouvertes",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de prestation pour l'organisation d'une journée portes ouvertes d'entreprise ou d'établissement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'etablissement', label: "Établissement ou entreprise", type: 'text', required: true },
      { key: 'agence', label: "Agence organisatrice", type: 'text', required: true },
      { key: 'date_jpo', label: "Date de la journée portes ouvertes", type: 'date', required: true },
      { key: 'public_cible', label: "Public cible", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE JOURNÉE PORTES OUVERTES</h1>
<p>Entre <strong>{{etablissement}}</strong> (Client) et <strong>{{agence}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation d'une journée portes ouvertes destinée à <strong>{{public_cible}}</strong>, le <strong>{{date_jpo}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Accueil, visites guidées, animations, signalétique, collation et coordination générale.</p>
<h2>Article 3 – Paiement</h2>
<p>Le règlement intégral est dû 5 jours avant la tenue de l'événement.</p>
<p>Fait à ............, le {{date_jpo}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_cocktail_dinatoire',
    name: "Accord de service de cocktail dînatoire",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Convention encadrant la prestation d'organisation d'un cocktail dînatoire professionnel ou d'entreprise.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'client', label: "Entité cliente", type: 'text', required: true },
      { key: 'traiteur', label: "Traiteur / Prestataire", type: 'text', required: true },
      { key: 'date_cocktail', label: "Date du cocktail", type: 'date', required: true },
      { key: 'nombre_convives', label: "Nombre de convives", type: 'text', required: true },
      { key: 'lieu', label: "Lieu", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE COCKTAIL DÎNATOIRE</h1>
<p>Entre <strong>{{client}}</strong> (Client) et <strong>{{traiteur}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire assure l'organisation d'un cocktail dînatoire le <strong>{{date_cocktail}}</strong> à <strong>{{lieu}}</strong> pour <strong>{{nombre_convives}}</strong> convives.</p>
<h2>Article 2 – Prestations incluses</h2>
<p>Buffet chaud et froid, boissons, personnel de service, vaisselle et décoration de table.</p>
<h2>Article 3 – Allergènes</h2>
<p>Le Prestataire s'engage à informer le Client de la composition des plats et à respecter les régimes alimentaires signalés.</p>
<p>Fait à ............, le {{date_cocktail}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_banquet_entreprise',
    name: "Accord de service de banquet d'entreprise",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Contrat encadrant la prestation de banquet formel organisé dans le cadre d'un événement d'entreprise.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'traiteur', label: "Prestataire traiteur", type: 'text', required: true },
      { key: 'date_banquet', label: "Date du banquet", type: 'date', required: true },
      { key: 'nb_couverts', label: "Nombre de couverts", type: 'text', required: true },
      { key: 'menu_choisi', label: "Type de menu (ex : 3 services)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE BANQUET D'ENTREPRISE</h1>
<p>Entre <strong>{{entreprise}}</strong> (Client) et <strong>{{traiteur}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation d'un banquet de <strong>{{nb_couverts}}</strong> couverts, le <strong>{{date_banquet}}</strong>, avec menu <strong>{{menu_choisi}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Repas complet, boissons, personnel, décoration et coordination de salle.</p>
<h2>Article 3 – Annulation</h2>
<p>Toute annulation moins de 72 h avant l'événement entraîne la facturation intégrale.</p>
<p>Fait à ............, le {{date_banquet}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_catering_repas_affaires',
    name: "Accord de service de repas d'affaires (catering)",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Convention de prestation catering pour des repas d'affaires, déjeuners de travail ou réunions avec restauration.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'prestataire', label: "Prestataire catering", type: 'text', required: true },
      { key: 'date_repas', label: "Date du repas", type: 'date', required: true },
      { key: 'nb_personnes', label: "Nombre de personnes", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE REPAS D'AFFAIRES (CATERING)</h1>
<p>Entre <strong>{{client}}</strong> (Client) et <strong>{{prestataire}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire fournit une prestation de catering pour <strong>{{nb_personnes}}</strong> personnes le <strong>{{date_repas}}</strong>.</p>
<h2>Article 2 – Livraison et service</h2>
<p>Les repas seront livrés et dressés sur site 30 minutes avant l'heure convenue.</p>
<h2>Article 3 – Hygiène alimentaire</h2>
<p>Le Prestataire respecte les normes d'hygiène alimentaire HACCP en vigueur en Côte d'Ivoire.</p>
<p>Fait à ............, le {{date_repas}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_location_salle_conference',
    name: "Accord de service de location de salle de conférence",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de location d'une salle de conférence ou de réunion pour événement professionnel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'locataire', label: "Locataire", type: 'text', required: true },
      { key: 'proprietaire', label: "Propriétaire / Gestionnaire de salle", type: 'text', required: true },
      { key: 'nom_salle', label: "Nom ou référence de la salle", type: 'text', required: true },
      { key: 'date_location', label: "Date de location", type: 'date', required: true },
      { key: 'duree_location', label: "Durée de location (heures)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE LOCATION DE SALLE DE CONFÉRENCE</h1>
<p>Entre <strong>{{proprietaire}}</strong> (Bailleur) et <strong>{{locataire}}</strong> (Locataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Bailleur met à disposition la salle <strong>{{nom_salle}}</strong> le <strong>{{date_location}}</strong> pour une durée de <strong>{{duree_location}} heure(s)</strong>.</p>
<h2>Article 2 – Équipements inclus</h2>
<p>Vidéoprojecteur, écran, tableau blanc, connexion Wi-Fi, climatisation et mobilier.</p>
<h2>Article 3 – Caution</h2>
<p>Une caution équivalente à 20 % du montant total est versée à la signature et restituée après l'état des lieux de sortie.</p>
<p>Fait à ............, le {{date_location}}</p>
<p>Le Bailleur : ............................ &nbsp;&nbsp;&nbsp; Le Locataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_decoration_evenementielle',
    name: "Accord de service de décoration événementielle",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Convention de prestation de décoration événementielle (thématique, florale, scénographique) pour tout type d'événement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'decorateur', label: "Décorateur / Prestataire", type: 'text', required: true },
      { key: 'theme', label: "Thème de la décoration", type: 'text', required: true },
      { key: 'date_evenement', label: "Date de l'événement", type: 'date', required: true },
      { key: 'lieu', label: "Lieu à décorer", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DÉCORATION ÉVÉNEMENTIELLE</h1>
<p>Entre <strong>{{client}}</strong> (Client) et <strong>{{decorateur}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire assure la décoration thématique <strong>{{theme}}</strong> pour l'événement du <strong>{{date_evenement}}</strong> à <strong>{{lieu}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Installation, démontage et enlèvement du matériel décoratif inclus dans le forfait.</p>
<h2>Article 3 – Propriété du matériel</h2>
<p>Le matériel décoratif reste la propriété du Prestataire, sauf accord contraire stipulé en annexe.</p>
<p>Fait à ............, le {{date_evenement}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_sono_eclairage',
    name: "Accord de service de sonorisation et éclairage",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de prestation technique de sonorisation et d'éclairage scénique pour événement professionnel ou festif.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'prestataire_son', label: "Prestataire technique", type: 'text', required: true },
      { key: 'type_evenement', label: "Type d'événement", type: 'text', required: true },
      { key: 'date_evenement', label: "Date de l'événement", type: 'date', required: true },
      { key: 'lieu', label: "Lieu", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE SONORISATION ET ÉCLAIRAGE</h1>
<p>Entre <strong>{{client}}</strong> (Client) et <strong>{{prestataire_son}}</strong> (Prestataire technique) :</p>
<h2>Article 1 – Objet</h2>
<p>Fourniture et exploitation du dispositif de sonorisation et d'éclairage pour l'événement de type <strong>{{type_evenement}}</strong> le <strong>{{date_evenement}}</strong> à <strong>{{lieu}}</strong>.</p>
<h2>Article 2 – Matériel</h2>
<p>Le descriptif technique du matériel (puissance, marques, configuration) figure en annexe.</p>
<h2>Article 3 – Responsabilité technique</h2>
<p>Le Prestataire assure la présence d'un technicien qualifié pendant toute la durée de l'événement.</p>
<p>Fait à ............, le {{date_evenement}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_captation_video',
    name: "Accord de service de captation vidéo événementielle",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Convention de prestation de captation et de montage vidéo pour événements professionnels et institutionnels.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'videaste', label: "Vidéaste / Société de production", type: 'text', required: true },
      { key: 'date_tournage', label: "Date du tournage", type: 'date', required: true },
      { key: 'livrable', label: "Format du livrable (ex : film 5 min)", type: 'text', required: true },
      { key: 'delai_livraison', label: "Délai de livraison (jours)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE CAPTATION VIDÉO ÉVÉNEMENTIELLE</h1>
<p>Entre <strong>{{client}}</strong> (Client) et <strong>{{videaste}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire réalise la captation vidéo de l'événement le <strong>{{date_tournage}}</strong> et livre <strong>{{livrable}}</strong> sous <strong>{{delai_livraison}} jours</strong>.</p>
<h2>Article 2 – Droits à l'image</h2>
<p>Le Client garantit avoir obtenu les autorisations de droit à l'image des participants filmés.</p>
<h2>Article 3 – Propriété des rushs</h2>
<p>Les fichiers bruts (rushs) restent la propriété du Prestataire ; seul le montage final est cédé au Client.</p>
<p>Fait à ............, le {{date_tournage}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_traduction_simultanee',
    name: "Accord de service de traduction simultanée (cabine)",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: "Contrat encadrant la prestation de traduction simultanée en cabine pour conférence internationale ou multilingue.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'client', label: "Client / Organisateur", type: 'text', required: true },
      { key: 'prestataire', label: "Société de traduction", type: 'text', required: true },
      { key: 'langues', label: "Langues de travail (ex : FR/EN/AR)", type: 'text', required: true },
      { key: 'date_conference', label: "Date de la conférence", type: 'date', required: true },
      { key: 'duree_journaliere', label: "Durée journalière (heures)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TRADUCTION SIMULTANÉE (CABINE)</h1>
<p>Entre <strong>{{client}}</strong> (Client) et <strong>{{prestataire}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Fourniture de la prestation de traduction simultanée en cabine pour les langues <strong>{{langues}}</strong> lors de la conférence du <strong>{{date_conference}}</strong>, à raison de <strong>{{duree_journaliere}} heures</strong> par jour.</p>
<h2>Article 2 – Équipe</h2>
<p>Le Prestataire désigne au minimum deux interprètes par cabine et par langue.</p>
<h2>Article 3 – Matériel</h2>
<p>Cabines insonorisées, récepteurs et casques fournis par le Prestataire.</p>
<p>Fait à ............, le {{date_conference}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_ticketing_inscriptions',
    name: "Accord de service de gestion des inscriptions (ticketing)",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 12000,
    description: "Convention de prestation de gestion en ligne ou physique des inscriptions et de la billetterie d'un événement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'organisateur', label: "Organisateur de l'événement", type: 'text', required: true },
      { key: 'prestataire', label: "Prestataire ticketing", type: 'text', required: true },
      { key: 'nom_evenement', label: "Nom de l'événement", type: 'text', required: true },
      { key: 'date_evenement', label: "Date de l'événement", type: 'date', required: true },
      { key: 'tarif_commission', label: "Commission prestataire (%)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE GESTION DES INSCRIPTIONS (TICKETING)</h1>
<p>Entre <strong>{{organisateur}}</strong> (Client) et <strong>{{prestataire}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire gère les inscriptions et la billetterie de l'événement <strong>{{nom_evenement}}</strong> prévu le <strong>{{date_evenement}}</strong>.</p>
<h2>Article 2 – Rémunération</h2>
<p>Le Prestataire perçoit une commission de <strong>{{tarif_commission}} %</strong> sur les ventes de billets réalisées.</p>
<h2>Article 3 – Reversement</h2>
<p>Les recettes nettes sont reversées à l'Organisateur dans un délai de 5 jours ouvrables après l'événement.</p>
<p>Fait à ............, le {{date_evenement}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_transport_navette',
    name: "Accord de service de transport des invités (navette)",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 12000,
    description: "Contrat de prestation de transport en navette pour les participants et invités d'un événement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'organisateur', label: "Organisateur", type: 'text', required: true },
      { key: 'transporteur', label: "Société de transport", type: 'text', required: true },
      { key: 'date_transport', label: "Date du transport", type: 'date', required: true },
      { key: 'itineraire', label: "Itinéraire (départ – arrivée)", type: 'text', required: true },
      { key: 'nb_vehicules', label: "Nombre de véhicules", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TRANSPORT DES INVITÉS (NAVETTE)</h1>
<p>Entre <strong>{{organisateur}}</strong> (Client) et <strong>{{transporteur}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire assure <strong>{{nb_vehicules}}</strong> véhicule(s) navette sur l'itinéraire <strong>{{itineraire}}</strong> le <strong>{{date_transport}}</strong>.</p>
<h2>Article 2 – Obligations du transporteur</h2>
<p>Véhicules en bon état, conducteurs professionnels et ponctualité garantie selon le planning annexé.</p>
<h2>Article 3 – Assurance</h2>
<p>Le Prestataire est assuré pour le transport de personnes sur le territoire ivoirien.</p>
<p>Fait à ............, le {{date_transport}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_securite_evenementielle',
    name: "Accord de service de sécurité événementielle",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Convention de prestation de gardiennage et de sécurité événementielle pour tout type de manifestation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'client', label: "Client / Organisateur", type: 'text', required: true },
      { key: 'agence_secu', label: "Agence de sécurité", type: 'text', required: true },
      { key: 'date_mission', label: "Date de la mission", type: 'date', required: true },
      { key: 'lieu_securise', label: "Lieu à sécuriser", type: 'text', required: true },
      { key: 'nb_agents', label: "Nombre d'agents déployés", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE SÉCURITÉ ÉVÉNEMENTIELLE</h1>
<p>Entre <strong>{{client}}</strong> (Client) et <strong>{{agence_secu}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Déploiement de <strong>{{nb_agents}}</strong> agents de sécurité à <strong>{{lieu_securise}}</strong> le <strong>{{date_mission}}</strong>.</p>
<h2>Article 2 – Obligations du Prestataire</h2>
<p>Agents certifiés, équipements réglementaires, respect du dispositif de sécurité approuvé par les autorités locales.</p>
<h2>Article 3 – Responsabilité</h2>
<p>Le Prestataire est couvert par une police d'assurance responsabilité civile professionnelle.</p>
<p>Fait à ............, le {{date_mission}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'eve_rapport_agence',
    name: "Rapport de performance agence événementielle",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Document de rapport post-événement présentant le bilan qualitatif et quantitatif de la prestation de l'agence.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'agence', label: "Nom de l'agence", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'nom_evenement', label: "Nom de l'événement", type: 'text', required: true },
      { key: 'date_evenement', label: "Date de l'événement", type: 'date', required: true },
      { key: 'bilan', label: "Bilan synthétique", type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
<h1>RAPPORT DE PERFORMANCE AGENCE ÉVÉNEMENTIELLE</h1>
<p><strong>Agence :</strong> {{agence}} &nbsp;|&nbsp; <strong>Client :</strong> {{client}}</p>
<p><strong>Événement :</strong> {{nom_evenement}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_evenement}}</p>
<h2>1. Bilan général</h2>
<p>{{bilan}}</p>
<h2>2. Indicateurs clés</h2>
<p>Taux de satisfaction, respect du budget, ponctualité et retours des participants sont documentés en annexe.</p>
<h2>3. Recommandations</h2>
<p>L'agence formule des recommandations pour les prochaines éditions en annexe du présent rapport.</p>
<p>Rapport établi par <strong>{{agence}}</strong> à l'attention de <strong>{{client}}</strong>.</p>
</div>`,
  },
  {
    code: 'eve_plan_communication',
    name: "Plan de communication événement",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Document structurant le plan de communication multicanal avant, pendant et après un événement professionnel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'evenement', label: "Nom de l'événement", type: 'text', required: true },
      { key: 'responsable_comm', label: "Responsable communication", type: 'text', required: true },
      { key: 'date_debut_comm', label: "Date de début de la campagne", type: 'date', required: true },
      { key: 'canaux', label: "Canaux de communication utilisés", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>PLAN DE COMMUNICATION ÉVÉNEMENT</h1>
<p><strong>Événement :</strong> {{evenement}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{responsable_comm}}</p>
<h2>Phase 1 – Avant l'événement (dès le {{date_debut_comm}})</h2>
<p>Canaux : <strong>{{canaux}}</strong>. Actions : teasing, invitations, relances, publications sur réseaux sociaux et communiqués de presse.</p>
<h2>Phase 2 – Pendant l'événement</h2>
<p>Live-posting, couverture presse en temps réel, stories et diffusion en direct.</p>
<h2>Phase 3 – Après l'événement</h2>
<p>Compte-rendu, galerie photos, vidéo récapitulative et sondage de satisfaction.</p>
<p>Plan validé par <strong>{{responsable_comm}}</strong>.</p>
</div>`,
  },
  {
    code: 'eve_charte_responsable',
    name: "Charte de l'événement responsable et durable",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Charte définissant les engagements RSE et développement durable d'un événement (réduction déchets, éco-conception, inclusion).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'organisateur', label: "Organisateur", type: 'text', required: true },
      { key: 'nom_evenement', label: "Nom de l'événement", type: 'text', required: true },
      { key: 'date_evenement', label: "Date de l'événement", type: 'date', required: true },
      { key: 'engagements', label: "Principaux engagements RSE", type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
<h1>CHARTE DE L'ÉVÉNEMENT RESPONSABLE ET DURABLE</h1>
<p><strong>Organisateur :</strong> {{organisateur}} &nbsp;|&nbsp; <strong>Événement :</strong> {{nom_evenement}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_evenement}}</p>
<h2>Préambule</h2>
<p>Dans le cadre de sa politique RSE, l'Organisateur s'engage à conduire cet événement selon les principes du développement durable.</p>
<h2>Engagements</h2>
<p>{{engagements}}</p>
<h2>Mesures concrètes</h2>
<p>Réduction des déchets plastiques, choix de prestataires locaux, compensation carbone, accessibilité PMR et inclusion.</p>
<h2>Suivi et rapport</h2>
<p>Un bilan environnemental sera publié dans les 30 jours suivant l'événement.</p>
<p>Signé par <strong>{{organisateur}}</strong>.</p>
</div>`,
  },

  // ─── WEDDING PLANNING / CÉRÉMONIES (wed_) ────────────────────────────────
  {
    code: 'wed_wedding_planner_complet',
    name: "Accord de service de wedding planner (mariage complet)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 50000,
    description: "Contrat global de wedding planning couvrant toutes les étapes du mariage, de la conception à la coordination le jour J.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'client_nom', label: "Noms des futurs époux", type: 'text', required: true },
      { key: 'agence', label: "Agence wedding planner", type: 'text', required: true },
      { key: 'date_mariage', label: "Date du mariage", type: 'date', required: true },
      { key: 'lieu_mariage', label: "Lieu du mariage", type: 'text', required: true },
      { key: 'budget_global', label: "Budget global alloué (FCFA)", type: 'text', required: true },
      { key: 'honoraires', label: "Honoraires de l'agence (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE WEDDING PLANNER (MARIAGE COMPLET)</h1>
<p>Entre <strong>{{client_nom}}</strong> (ci-après « les Clients ») et <strong>{{agence}}</strong> (ci-après « le Prestataire ») :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire assure la planification et la coordination complète du mariage prévu le <strong>{{date_mariage}}</strong> à <strong>{{lieu_mariage}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Conception du projet, sélection des prestataires, suivi budgétaire, coordination le jour J et accompagnement post-événement.</p>
<h2>Article 3 – Budget et honoraires</h2>
<p>Budget global : <strong>{{budget_global}}</strong> FCFA. Honoraires de l'agence : <strong>{{honoraires}}</strong> FCFA, payables en trois versements.</p>
<h2>Article 4 – Responsabilité</h2>
<p>Le Prestataire est un professionnel de l'organisation et engage sa responsabilité sur la bonne exécution de sa mission de coordination.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Soumis au droit ivoirien et à l'Acte Uniforme OHADA sur les contrats de prestation de services.</p>
<p>Fait à ............, le {{date_mariage}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_mariage_traditionnel',
    name: "Accord de service de mariage traditionnel africain (dot, coutume)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 28000,
    description: "Contrat de prestation pour l'organisation d'un mariage traditionnel africain incluant la cérémonie de dot et les rites coutumiers.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'famille_mari', label: "Famille du marié", type: 'text', required: true },
      { key: 'famille_epouse', label: "Famille de l'épouse", type: 'text', required: true },
      { key: 'agence', label: "Agence organisatrice", type: 'text', required: true },
      { key: 'date_ceremonie', label: "Date de la cérémonie coutumière", type: 'date', required: true },
      { key: 'ethnie_rite', label: "Ethnie / Rite pratiqué", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE MARIAGE TRADITIONNEL AFRICAIN (DOT, COUTUME)</h1>
<p>Entre <strong>{{famille_mari}}</strong>, <strong>{{famille_epouse}}</strong> (Clients) et <strong>{{agence}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation de la cérémonie de mariage traditionnel selon le rite <strong>{{ethnie_rite}}</strong>, prévue le <strong>{{date_ceremonie}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Coordination des rites, organisation de la dot, décoration traditionnelle, catering et animation culturelle.</p>
<h2>Article 3 – Respect des traditions</h2>
<p>Le Prestataire s'engage à respecter scrupuleusement les rites et traditions des familles concernées.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Les informations relatives aux familles sont strictement confidentielles.</p>
<p>Fait à ............, le {{date_ceremonie}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_mariage_civil',
    name: "Accord de service de mariage civil (mairie)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Contrat de prestation pour la coordination et la logistique du mariage civil en mairie.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'epoux', label: "Noms des époux", type: 'text', required: true },
      { key: 'agence', label: "Agence prestataire", type: 'text', required: true },
      { key: 'date_mariage_civil', label: "Date du mariage civil", type: 'date', required: true },
      { key: 'mairie', label: "Mairie concernée", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE MARIAGE CIVIL (MAIRIE)</h1>
<p>Entre <strong>{{epoux}}</strong> (Clients) et <strong>{{agence}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire coordonne la logistique du mariage civil prévu le <strong>{{date_mariage_civil}}</strong> à la mairie de <strong>{{mairie}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Décoration voiture, cortège, photo souvenir, accueil des invités et coordination avec les officiers d'état civil.</p>
<h2>Article 3 – Démarches administratives</h2>
<p>Les démarches d'état civil restent à la charge exclusive des époux.</p>
<p>Fait à ............, le {{date_mariage_civil}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_mariage_religieux',
    name: "Accord de service de mariage religieux (église, mosquée)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Convention de prestation pour la coordination logistique et la décoration de la cérémonie de mariage religieux.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'epoux', label: "Noms des époux", type: 'text', required: true },
      { key: 'agence', label: "Agence prestataire", type: 'text', required: true },
      { key: 'date_ceremonie', label: "Date de la cérémonie", type: 'date', required: true },
      { key: 'lieu_culte', label: "Lieu de culte (église, mosquée, etc.)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE MARIAGE RELIGIEUX (ÉGLISE, MOSQUÉE)</h1>
<p>Entre <strong>{{epoux}}</strong> (Clients) et <strong>{{agence}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation logistique de la cérémonie religieuse le <strong>{{date_ceremonie}}</strong> à <strong>{{lieu_culte}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Décoration florale, musique, accueil des fidèles et coordination avec les officiants religieux.</p>
<h2>Article 3 – Respect du cadre religieux</h2>
<p>Le Prestataire respecte les règles et le protocole en vigueur dans le lieu de culte.</p>
<p>Fait à ............, le {{date_ceremonie}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_traiteur_mariage',
    name: "Accord de service de traiteur de mariage",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 30000,
    description: "Contrat encadrant la prestation traiteur complète pour un mariage (repas, buffet, boissons, service en salle).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 87,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'traiteur', label: "Traiteur prestataire", type: 'text', required: true },
      { key: 'date_mariage', label: "Date du mariage", type: 'date', required: true },
      { key: 'nb_convives', label: "Nombre de convives", type: 'text', required: true },
      { key: 'type_menu', label: "Type de menu choisi", type: 'text', required: true },
      { key: 'montant', label: "Montant total (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TRAITEUR DE MARIAGE</h1>
<p>Entre <strong>{{clients}}</strong> (Clients) et <strong>{{traiteur}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Prestation traiteur complète pour le mariage du <strong>{{date_mariage}}</strong> pour <strong>{{nb_convives}}</strong> convives avec le menu <strong>{{type_menu}}</strong>.</p>
<h2>Article 2 – Montant et règlement</h2>
<p>Montant total : <strong>{{montant}}</strong> FCFA. Acompte de 50 % à la réservation, solde 48 h avant.</p>
<h2>Article 3 – Normes sanitaires</h2>
<p>Le Prestataire garantit le respect des normes d'hygiène alimentaire en vigueur.</p>
<h2>Article 4 – Personnel</h2>
<p>Le nombre de serveurs et cuisiniers est précisé en annexe selon le ratio convives/personnel.</p>
<p>Fait à ............, le {{date_mariage}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_gateau_mariage',
    name: "Accord de service de gâteau de mariage",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de commande d'un gâteau de mariage sur mesure auprès d'un pâtissier ou d'une chocolaterie.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'patissier', label: "Pâtissier / Prestataire", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison (veille ou jour J)", type: 'date', required: true },
      { key: 'description_gateau', label: "Description du gâteau (étages, saveur, décoration)", type: 'textarea', required: true },
      { key: 'prix', label: "Prix convenu (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE GÂTEAU DE MARIAGE</h1>
<p>Entre <strong>{{clients}}</strong> (Clients) et <strong>{{patissier}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Commande d'un gâteau de mariage selon la description suivante : <strong>{{description_gateau}}</strong>.</p>
<h2>Article 2 – Livraison</h2>
<p>Le gâteau sera livré et installé le <strong>{{date_livraison}}</strong> sur le lieu de réception.</p>
<h2>Article 3 – Prix et paiement</h2>
<p>Prix convenu : <strong>{{prix}}</strong> FCFA. 50 % à la commande, solde à la livraison.</p>
<h2>Article 4 – Garanties</h2>
<p>En cas de non-conformité avérée, le Prestataire s'engage à rembourser ou à recréer la pièce.</p>
<p>Fait à ............, le {{date_livraison}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_decoration_mariage',
    name: "Accord de service de décoration de mariage (fleurs, arches)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Convention de prestation de décoration florale et scénographique pour un mariage (salle, église, arches, chemin de roses).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'decorateur', label: "Décorateur / Fleuriste", type: 'text', required: true },
      { key: 'date_mariage', label: "Date du mariage", type: 'date', required: true },
      { key: 'concept', label: "Concept décoratif choisi", type: 'text', required: true },
      { key: 'lieux_decoration', label: "Lieux à décorer (salle, église, etc.)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DÉCORATION DE MARIAGE (FLEURS, ARCHES)</h1>
<p>Entre <strong>{{clients}}</strong> (Clients) et <strong>{{decorateur}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Décoration du mariage sur le concept <strong>{{concept}}</strong> le <strong>{{date_mariage}}</strong> pour les espaces suivants : <strong>{{lieux_decoration}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Fourniture florale, arches, chemin de roses, décoration de tables et démontage après réception.</p>
<h2>Article 3 – Couleurs et gamme</h2>
<p>La palette de couleurs et les espèces florales sont détaillées dans le bon de commande annexé.</p>
<p>Fait à ............, le {{date_mariage}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_photographe_mariage',
    name: "Accord de service de photographe de mariage",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: "Contrat de prestation photographique couvrant les différentes étapes du mariage (préparatifs, cérémonie, réception).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 84,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'photographe', label: "Photographe / Studio", type: 'text', required: true },
      { key: 'date_mariage', label: "Date du mariage", type: 'date', required: true },
      { key: 'nb_photos_livrees', label: "Nombre de photos retouchées livrées", type: 'text', required: true },
      { key: 'delai_livraison', label: "Délai de livraison des photos (semaines)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE PHOTOGRAPHE DE MARIAGE</h1>
<p>Entre <strong>{{clients}}</strong> (Clients) et <strong>{{photographe}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Couverture photographique complète du mariage du <strong>{{date_mariage}}</strong>. Livraison de <strong>{{nb_photos_livrees}}</strong> photos retouchées sous <strong>{{delai_livraison}} semaine(s)</strong>.</p>
<h2>Article 2 – Droits d'auteur</h2>
<p>Le Prestataire conserve ses droits d'auteur mais cède aux Clients le droit d'usage personnel et non commercial des photos livrées.</p>
<h2>Article 3 – Portfolio</h2>
<p>Le Prestataire peut utiliser les photos dans son portfolio avec accord préalable des mariés.</p>
<p>Fait à ............, le {{date_mariage}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_videaste_mariage',
    name: "Accord de service de vidéaste de mariage (film)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Convention de prestation de captation vidéo et de production du film de mariage (version longue et teaser).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'videaste', label: "Vidéaste / Société de production", type: 'text', required: true },
      { key: 'date_mariage', label: "Date du mariage", type: 'date', required: true },
      { key: 'livrable_video', label: "Livrable vidéo (ex : film 30 min + teaser 3 min)", type: 'text', required: true },
      { key: 'delai', label: "Délai de livraison (semaines)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE VIDÉASTE DE MARIAGE (FILM)</h1>
<p>Entre <strong>{{clients}}</strong> (Clients) et <strong>{{videaste}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Captation et production du film de mariage du <strong>{{date_mariage}}</strong>. Livrable : <strong>{{livrable_video}}</strong> sous <strong>{{delai}} semaine(s)</strong>.</p>
<h2>Article 2 – Droits à l'image</h2>
<p>Les mariés garantissent disposer du consentement des invités filmés pour l'usage privé du film.</p>
<h2>Article 3 – Supports de livraison</h2>
<p>Fichiers HD sur clé USB et lien de téléchargement sécurisé.</p>
<p>Fait à ............, le {{date_mariage}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_habillage_coiffure',
    name: "Accord de service d'habillage et coiffure de mariage",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 12000,
    description: "Contrat de prestation de coiffure, maquillage et habillage pour la mariée et sa suite lors du mariage.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 79,
    fieldsJson: F([
      { key: 'mariee', label: "Nom de la mariée", type: 'text', required: true },
      { key: 'prestataire', label: "Styliste / Salon de beauté", type: 'text', required: true },
      { key: 'date_prestation', label: "Date de la prestation", type: 'date', required: true },
      { key: 'nb_personnes', label: "Nombre de personnes (mariée + suite)", type: 'text', required: true },
      { key: 'prestations_detaillees', label: "Prestations détaillées (coiffure, make-up, habillage)", type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D'HABILLAGE ET COIFFURE DE MARIAGE</h1>
<p>Entre <strong>{{mariee}}</strong> (Cliente) et <strong>{{prestataire}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Prestation beauté le <strong>{{date_prestation}}</strong> pour <strong>{{nb_personnes}}</strong> personne(s). Détail : <strong>{{prestations_detaillees}}</strong>.</p>
<h2>Article 2 – Essai préalable</h2>
<p>Un essai de coiffure et maquillage est inclus et prévu en amont du mariage selon planning convenu.</p>
<h2>Article 3 – Paiement</h2>
<p>Règlement intégral le jour de la prestation.</p>
<p>Fait à ............, le {{date_prestation}}</p>
<p>La Cliente : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_robe_mariee',
    name: "Accord de service de robe de mariée (couturier)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Contrat de création ou de location de robe de mariée sur mesure avec un couturier ou un créateur de mode.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 83,
    fieldsJson: F([
      { key: 'mariee', label: "Nom de la mariée", type: 'text', required: true },
      { key: 'couturier', label: "Couturier / Créateur", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison de la robe", type: 'date', required: true },
      { key: 'description_robe', label: "Description de la robe (style, tissu, ornements)", type: 'textarea', required: true },
      { key: 'prix_total', label: "Prix total (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE ROBE DE MARIÉE (COUTURIER)</h1>
<p>Entre <strong>{{mariee}}</strong> (Cliente) et <strong>{{couturier}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Création sur mesure d'une robe de mariée selon les spécifications suivantes : <strong>{{description_robe}}</strong>.</p>
<h2>Article 2 – Livraison</h2>
<p>La robe sera livrée le <strong>{{date_livraison}}</strong> après essayage final validé par la Cliente.</p>
<h2>Article 3 – Prix et acompte</h2>
<p>Prix total : <strong>{{prix_total}}</strong> FCFA. Acompte de 60 % à la commande, solde à la livraison.</p>
<h2>Article 4 – Retouches</h2>
<p>Deux séances de retouches incluses dans le prix.</p>
<p>Fait à ............, le {{date_livraison}}</p>
<p>La Cliente : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_dj_mariage',
    name: "Accord de service de DJ de mariage",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Contrat de prestation musicale d'un DJ pour l'animation de la soirée de mariage.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'dj', label: "DJ / Nom d'artiste", type: 'text', required: true },
      { key: 'date_prestation', label: "Date de la prestation", type: 'date', required: true },
      { key: 'duree', label: "Durée de la prestation (heures)", type: 'text', required: true },
      { key: 'styles_musicaux', label: "Styles musicaux souhaités", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DJ DE MARIAGE</h1>
<p>Entre <strong>{{clients}}</strong> (Clients) et <strong>{{dj}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Animation musicale DJ le <strong>{{date_prestation}}</strong> pour une durée de <strong>{{duree}} heure(s)</strong>. Styles : <strong>{{styles_musicaux}}</strong>.</p>
<h2>Article 2 – Matériel</h2>
<p>Le DJ fournit son propre matériel (platines, sono, éclairage DJ). La connexion électrique est assurée par le Client.</p>
<h2>Article 3 – Répertoire</h2>
<p>Le DJ s'engage à respecter la playlist validée et à tenir compte des demandes raisonnables des mariés.</p>
<p>Fait à ............, le {{date_prestation}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_orchestre_mariage',
    name: "Accord de service d'orchestre ou groupe de mariage",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: "Convention de prestation musicale d'un orchestre ou groupe live pour l'animation d'un mariage.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'groupe', label: "Nom de l'orchestre / Groupe", type: 'text', required: true },
      { key: 'date_prestation', label: "Date de la prestation", type: 'date', required: true },
      { key: 'nb_musiciens', label: "Nombre de musiciens", type: 'text', required: true },
      { key: 'duree', label: "Durée totale de prestation (heures)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D'ORCHESTRE OU GROUPE DE MARIAGE</h1>
<p>Entre <strong>{{clients}}</strong> (Clients) et <strong>{{groupe}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Prestation live d'un ensemble de <strong>{{nb_musiciens}}</strong> musiciens le <strong>{{date_prestation}}</strong> pour <strong>{{duree}} heure(s)</strong>.</p>
<h2>Article 2 – Répertoire</h2>
<p>Le programme musical est validé en amont par les deux parties. Des demandes ponctuelles des invités seront honorées dans la mesure du possible.</p>
<h2>Article 3 – Défraiements</h2>
<p>Transport et restauration des musiciens sont à la charge du Client le soir de la prestation.</p>
<p>Fait à ............, le {{date_prestation}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_voiture_mariage',
    name: "Accord de service de location de voiture de mariage (limousine)",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 12000,
    description: "Contrat de location de véhicule de prestige (limousine, cabriolet) pour le jour du mariage.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'loueur', label: "Société de location / Propriétaire", type: 'text', required: true },
      { key: 'type_vehicule', label: "Type de véhicule (ex : limousine, Rolls-Royce)", type: 'text', required: true },
      { key: 'date_location', label: "Date de location", type: 'date', required: true },
      { key: 'duree_location', label: "Durée de location (heures)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE LOCATION DE VOITURE DE MARIAGE (LIMOUSINE)</h1>
<p>Entre <strong>{{clients}}</strong> (Clients) et <strong>{{loueur}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Location d'un <strong>{{type_vehicule}}</strong> avec chauffeur le <strong>{{date_location}}</strong> pour <strong>{{duree_location}} heure(s)</strong>.</p>
<h2>Article 2 – Décoration</h2>
<p>La décoration florale du véhicule est incluse selon les instructions des mariés.</p>
<h2>Article 3 – Caution</h2>
<p>Une caution remboursable est versée à la signature et restituée après restitution du véhicule en bon état.</p>
<p>Fait à ............, le {{date_location}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_faire_part_imprimerie',
    name: "Accord de service de faire-part de mariage (imprimerie)",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Contrat de commande de faire-part de mariage personnalisés auprès d'une imprimerie ou d'un graphiste.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'imprimeur', label: "Imprimerie / Graphiste", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison des faire-part", type: 'date', required: true },
      { key: 'quantite', label: "Quantité commandée", type: 'text', required: true },
      { key: 'format_description', label: "Format et description du faire-part", type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE FAIRE-PART DE MARIAGE (IMPRIMERIE)</h1>
<p>Entre <strong>{{clients}}</strong> (Clients) et <strong>{{imprimeur}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Création et impression de <strong>{{quantite}}</strong> faire-part selon le format : <strong>{{format_description}}</strong>, livrés le <strong>{{date_livraison}}</strong>.</p>
<h2>Article 2 – Bon à tirer (BAT)</h2>
<p>Les Clients valident un BAT avant lancement de l'impression. Aucune correction n'est possible après validation.</p>
<h2>Article 3 – Propriété</h2>
<p>Les fichiers sources (maquettes) restent la propriété du Prestataire. Les Clients reçoivent uniquement les imprimés physiques.</p>
<p>Fait à ............, le {{date_livraison}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_liste_cadeaux',
    name: "Accord de service de carnet de mariage et liste de cadeaux",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Convention de mise en place et de gestion d'une liste de cadeaux de mariage via un partenaire commercial.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'partenaire', label: "Enseigne / Plateforme partenaire", type: 'text', required: true },
      { key: 'date_mariage', label: "Date du mariage", type: 'date', required: true },
      { key: 'duree_liste', label: "Durée de validité de la liste (mois)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE CARNET DE MARIAGE ET LISTE DE CADEAUX</h1>
<p>Entre <strong>{{clients}}</strong> (Mariés) et <strong>{{partenaire}}</strong> (Partenaire) :</p>
<h2>Article 1 – Objet</h2>
<p>Mise en place et gestion d'une liste de cadeaux de mariage valable <strong>{{duree_liste}} mois</strong> à compter du <strong>{{date_mariage}}</strong>.</p>
<h2>Article 2 – Fonctionnement</h2>
<p>Les invités accèdent à la liste en ligne ou en boutique et règlent directement au Partenaire.</p>
<h2>Article 3 – Reversement</h2>
<p>Les montants collectés sont reversés aux Mariés selon l'échéancier annexé, déduction faite des frais de gestion.</p>
<p>Fait à ............, le {{date_mariage}}</p>
<p>Les Mariés : ............................ &nbsp;&nbsp;&nbsp; Le Partenaire : ............................</p>
</div>`,
  },
  {
    code: 'wed_lune_de_miel',
    name: "Accord de service de lune de miel (voyage de noces)",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 22000,
    description: "Contrat encadrant l'organisation du voyage de noces par une agence de voyages spécialisée.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'agence_voyage', label: "Agence de voyages", type: 'text', required: true },
      { key: 'destination', label: "Destination du voyage de noces", type: 'text', required: true },
      { key: 'date_depart', label: "Date de départ", type: 'date', required: true },
      { key: 'duree_sejour', label: "Durée du séjour (nuits)", type: 'text', required: true },
      { key: 'budget', label: "Budget total (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE LUNE DE MIEL (VOYAGE DE NOCES)</h1>
<p>Entre <strong>{{clients}}</strong> (Clients) et <strong>{{agence_voyage}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation du voyage de noces à <strong>{{destination}}</strong> du <strong>{{date_depart}}</strong> pour <strong>{{duree_sejour}} nuit(s)</strong>.</p>
<h2>Article 2 – Prestations incluses</h2>
<p>Vols aller-retour, hébergement, transferts, assurance voyage et surprises romantiques inclus dans le forfait.</p>
<h2>Article 3 – Budget et paiement</h2>
<p>Budget total : <strong>{{budget}}</strong> FCFA. 40 % à la réservation, solde 30 jours avant le départ.</p>
<h2>Article 4 – Annulation</h2>
<p>Les conditions d'annulation sont celles des compagnies et hôtels contractés, détaillées en annexe.</p>
<p>Fait à ............, le {{date_depart}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_souvenir_invites',
    name: "Accord de service de cadeaux invités (souvenir mariage)",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Contrat de commande de cadeaux personnalisés à offrir aux invités en souvenir du mariage.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'fournisseur', label: "Fournisseur / Artisan", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison", type: 'date', required: true },
      { key: 'description_cadeau', label: "Description du cadeau souvenir", type: 'textarea', required: true },
      { key: 'quantite', label: "Quantité commandée", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE CADEAUX INVITÉS (SOUVENIR MARIAGE)</h1>
<p>Entre <strong>{{clients}}</strong> (Clients) et <strong>{{fournisseur}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Commande de <strong>{{quantite}}</strong> cadeaux souvenir : <strong>{{description_cadeau}}</strong>, livrés le <strong>{{date_livraison}}</strong>.</p>
<h2>Article 2 – Personnalisation</h2>
<p>Les cadeaux comporteront les prénoms des mariés et la date du mariage selon le modèle validé.</p>
<h2>Article 3 – Paiement</h2>
<p>50 % à la commande, solde à la livraison après contrôle qualité.</p>
<p>Fait à ............, le {{date_livraison}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_securite_ceremonie',
    name: "Accord de service de sécurité cérémonie de mariage",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 12000,
    description: "Contrat de prestation de sécurité et de gestion des accès pour une cérémonie de mariage.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'agence_secu', label: "Agence de sécurité", type: 'text', required: true },
      { key: 'date_mariage', label: "Date du mariage", type: 'date', required: true },
      { key: 'lieu', label: "Lieu de la cérémonie", type: 'text', required: true },
      { key: 'nb_agents', label: "Nombre d'agents déployés", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE SÉCURITÉ CÉRÉMONIE DE MARIAGE</h1>
<p>Entre <strong>{{clients}}</strong> (Clients) et <strong>{{agence_secu}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Déploiement de <strong>{{nb_agents}}</strong> agents de sécurité à <strong>{{lieu}}</strong> le <strong>{{date_mariage}}</strong>.</p>
<h2>Article 2 – Missions</h2>
<p>Contrôle des accès, gestion du flux des invités, protection des biens et sécurisation du parking.</p>
<h2>Article 3 – Tenue et comportement</h2>
<p>Les agents seront en tenue discrète et professionnelle adaptée à l'événement.</p>
<p>Fait à ............, le {{date_mariage}}</p>
<p>Les Clients : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_partenariat_hotel',
    name: "Accord de partenariat hôtel-wedding planner",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Convention de partenariat commercial entre un hôtel et une agence wedding planner pour des références mutuelles et des tarifs préférentiels.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'hotel', label: "Nom et adresse de l'hôtel", type: 'text', required: true },
      { key: 'agence', label: "Agence wedding planner", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du partenariat", type: 'date', required: true },
      { key: 'commission', label: "Taux de commission réciproque (%)", type: 'text', required: true },
      { key: 'duree_partenariat', label: "Durée du partenariat (mois)", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE PARTENARIAT HÔTEL – WEDDING PLANNER</h1>
<p>Entre <strong>{{hotel}}</strong> (l'Hôtel) et <strong>{{agence}}</strong> (l'Agence) :</p>
<h2>Article 1 – Objet</h2>
<p>Partenariat commercial de référence mutuelle à compter du <strong>{{date_debut}}</strong> pour une durée de <strong>{{duree_partenariat}} mois</strong>.</p>
<h2>Article 2 – Obligations réciproques</h2>
<p>Les parties s'engagent à se recommander mutuellement auprès de leurs clients mariés respectifs.</p>
<h2>Article 3 – Commission</h2>
<p>Une commission de <strong>{{commission}} %</strong> est versée à la partie apporteuse pour tout contrat conclu grâce à sa référence.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Les données clients échangées dans le cadre du partenariat sont strictement confidentielles.</p>
<p>Fait à ............, le {{date_debut}}</p>
<p>L'Hôtel : ............................ &nbsp;&nbsp;&nbsp; L'Agence : ............................</p>
</div>`,
  },
  {
    code: 'wed_communion_bapteme',
    name: "Accord de service de première communion et baptême",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 12000,
    description: "Convention de prestation pour l'organisation d'une cérémonie de première communion ou de baptême et de la réception qui suit.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'famille', label: "Nom de la famille", type: 'text', required: true },
      { key: 'agence', label: "Agence organisatrice", type: 'text', required: true },
      { key: 'type_ceremonie', label: "Type de cérémonie (communion, baptême, etc.)", type: 'text', required: true },
      { key: 'date_ceremonie', label: "Date de la cérémonie", type: 'date', required: true },
      { key: 'nb_invites', label: "Nombre d'invités", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE PREMIÈRE COMMUNION ET BAPTÊME</h1>
<p>Entre <strong>{{famille}}</strong> (Client) et <strong>{{agence}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation de la cérémonie de <strong>{{type_ceremonie}}</strong> et de la réception qui suit, le <strong>{{date_ceremonie}}</strong>, pour <strong>{{nb_invites}}</strong> invités.</p>
<h2>Article 2 – Prestations</h2>
<p>Coordination, décoration, catering, animation et photo souvenir inclus selon le devis annexé.</p>
<h2>Article 3 – Paiement</h2>
<p>Acompte de 40 % à la réservation, solde 7 jours avant l'événement.</p>
<p>Fait à ............, le {{date_ceremonie}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_anniversaire_haut_gamme',
    name: "Accord de service de soirée d'anniversaire haut de gamme",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Contrat de prestation pour l'organisation d'une soirée d'anniversaire haut de gamme (décoration luxe, catering, animation).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'agence', label: "Agence événementielle", type: 'text', required: true },
      { key: 'date_soiree', label: "Date de la soirée", type: 'date', required: true },
      { key: 'lieu', label: "Lieu de la soirée", type: 'text', required: true },
      { key: 'nb_invites', label: "Nombre d'invités", type: 'text', required: true },
      { key: 'theme', label: "Thème de la soirée", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE SOIRÉE D'ANNIVERSAIRE HAUT DE GAMME</h1>
<p>Entre <strong>{{client}}</strong> (Client) et <strong>{{agence}}</strong> (Prestataire) :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation d'une soirée d'anniversaire haut de gamme sur le thème <strong>{{theme}}</strong> le <strong>{{date_soiree}}</strong> à <strong>{{lieu}}</strong> pour <strong>{{nb_invites}}</strong> invités.</p>
<h2>Article 2 – Prestations luxe</h2>
<p>Décoration premium, traiteur gastronomique, animations artistiques, bouquet floral de table et coordination VIP.</p>
<h2>Article 3 – Exclusivité</h2>
<p>Le Prestataire garantit l'exclusivité du lieu pour la soirée pendant la durée contractuelle.</p>
<p>Fait à ............, le {{date_soiree}}</p>
<p>Le Client : ............................ &nbsp;&nbsp;&nbsp; Le Prestataire : ............................</p>
</div>`,
  },
  {
    code: 'wed_rapport_agence_weddings',
    name: "Rapport de performance agence de weddings",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Document de bilan post-mariage rédigé par l'agence wedding planner à destination du client pour évaluation de la prestation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'agence', label: "Agence wedding planner", type: 'text', required: true },
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'date_mariage', label: "Date du mariage", type: 'date', required: true },
      { key: 'bilan_synthese', label: "Bilan et points forts / points d'amélioration", type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
<h1>RAPPORT DE PERFORMANCE AGENCE DE WEDDINGS</h1>
<p><strong>Agence :</strong> {{agence}} &nbsp;|&nbsp; <strong>Mariés :</strong> {{clients}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_mariage}}</p>
<h2>1. Bilan général de la prestation</h2>
<p>{{bilan_synthese}}</p>
<h2>2. Respect du budget</h2>
<p>Le suivi budgétaire détaillé est annexé au présent rapport. Les écarts éventuels sont justifiés et documentés.</p>
<h2>3. Satisfaction client</h2>
<p>Un questionnaire de satisfaction a été soumis aux mariés. Le taux de satisfaction global est mentionné en annexe.</p>
<h2>4. Recommandations futures</h2>
<p>L'agence formule ses recommandations pour de futurs événements en annexe.</p>
<p>Rapport établi par <strong>{{agence}}</strong>.</p>
</div>`,
  },
  {
    code: 'wed_plan_organisation_mariage',
    name: "Plan d'organisation mariage",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Document structurant le rétroplanning et le plan d'organisation complet du mariage, de J-12 mois au jour J.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'clients', label: "Noms des mariés", type: 'text', required: true },
      { key: 'date_mariage', label: "Date du mariage", type: 'date', required: true },
      { key: 'responsable', label: "Responsable du plan (wedding planner ou mariés)", type: 'text', required: true },
      { key: 'lieu_principal', label: "Lieu principal du mariage", type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>PLAN D'ORGANISATION MARIAGE</h1>
<p><strong>Mariés :</strong> {{clients}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_mariage}} &nbsp;|&nbsp; <strong>Lieu :</strong> {{lieu_principal}}</p>
<p><strong>Responsable du plan :</strong> {{responsable}}</p>
<h2>J-12 mois – Fondations</h2>
<p>Définir le budget global, choisir la date, arrêter le concept et sélectionner le wedding planner.</p>
<h2>J-9 mois – Prestataires clés</h2>
<p>Réserver la salle, le traiteur, le photographe et l'orchestre.</p>
<h2>J-6 mois – Détails</h2>
<p>Commander les faire-part, confirmer la décoration, lancer les invitations.</p>
<h2>J-1 mois – Finalisation</h2>
<p>Confirmer les effectifs, finaliser le planning de la journée et effectuer les derniers paiements.</p>
<h2>Jour J – Coordination</h2>
<p>Le responsable coordonne l'ensemble des prestataires selon le planning minuté annexé.</p>
</div>`,
  },
  {
    code: 'wed_charte_ethique_wedding',
    name: "Charte du mariage éthique et du wedding planner professionnel",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: "Charte déontologique définissant les engagements éthiques, professionnels et responsables d'un wedding planner envers ses clients.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'agence', label: "Agence wedding planner", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true },
      { key: 'engagements_specifiques', label: "Engagements spécifiques de l'agence", type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
<h1>CHARTE DU MARIAGE ÉTHIQUE ET DU WEDDING PLANNER PROFESSIONNEL</h1>
<p><strong>Agence :</strong> {{agence}} &nbsp;|&nbsp; <strong>Adoptée le :</strong> {{date_adoption}}</p>
<h2>Préambule</h2>
<p>L'agence <strong>{{agence}}</strong> s'engage à exercer son activité de wedding planning dans le respect des valeurs éthiques, de la transparence et du professionnalisme.</p>
<h2>Article 1 – Transparence tarifaire</h2>
<p>Tous les honoraires et commissions sont clairement communiqués aux clients avant la signature de tout contrat.</p>
<h2>Article 2 – Respect des cultures et traditions</h2>
<p>L'agence respecte et valorise les traditions culturelles et religieuses de chaque famille cliente.</p>
<h2>Article 3 – Développement durable</h2>
<p>L'agence privilégie les prestataires locaux et les solutions éco-responsables.</p>
<h2>Article 4 – Engagements spécifiques</h2>
<p>{{engagements_specifiques}}</p>
<p>Charte signée par la Direction de <strong>{{agence}}</strong>.</p>
</div>`,
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
  console.log(`Batch 88a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
