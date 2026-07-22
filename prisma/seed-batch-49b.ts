import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 Médias / Audiovisuel (préfixe med_, catégorie association) ───

  {
    code: 'med_pigiste_journaliste',
    name: "Contrat de journaliste pigiste",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de collaboration entre un éditeur de presse et un journaliste pigiste rémunéré à la pige.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_editeur', label: "Nom de l'éditeur / organe de presse", type: 'text', required: true },
      { key: 'nom_journaliste', label: "Nom complet du journaliste pigiste", type: 'text', required: true },
      { key: 'sujet_article', label: "Sujet ou rubrique couverte", type: 'text', required: true },
      { key: 'tarif_pige', label: "Tarif par pige (en FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de collaboration", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE JOURNALISTE PIGISTE</h1>
<p>Entre <strong>{{nom_editeur}}</strong> (ci-après "l'Éditeur") et <strong>{{nom_journaliste}}</strong> (ci-après "le Pigiste"), il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Pigiste est chargé de produire des articles portant sur la rubrique : <em>{{sujet_article}}</em>.</p>
<h2>Article 2 – Rémunération</h2>
<p>Chaque pige publiée sera rémunérée au tarif de <strong>{{tarif_pige}} FCFA</strong>, payable à la publication.</p>
<h2>Article 3 – Durée</h2>
<p>La présente collaboration prend effet à compter du <strong>{{date_debut}}</strong> et se poursuit par tacite reconduction mensuelle.</p>
<h2>Article 4 – Droit d'auteur</h2>
<p>L'Éditeur bénéficie d'un droit de première publication. Le Pigiste conserve ses droits moraux conformément à la législation en vigueur.</p>
<p>Fait à Abidjan, le {{date_debut}}</p>
<p>Signature Éditeur : _____________________ &nbsp;&nbsp; Signature Pigiste : _____________________</p></div>`,
  },

  {
    code: 'med_journaliste_cdi',
    name: "Contrat de journaliste CDI rédaction",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Contrat à durée indéterminée pour un journaliste intégré à la rédaction d'un organe de presse.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_employeur', label: "Raison sociale de l'employeur", type: 'text', required: true },
      { key: 'nom_journaliste', label: "Nom et prénoms du journaliste", type: 'text', required: true },
      { key: 'poste', label: "Poste occupé (ex. Rédacteur en chef)", type: 'text', required: true },
      { key: 'salaire_brut', label: "Salaire brut mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_prise_poste', label: "Date de prise de poste", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE – JOURNALISTE</h1>
<p>Entre <strong>{{nom_employeur}}</strong> et <strong>{{nom_journaliste}}</strong>, il est conclu le présent contrat :</p>
<h2>Article 1 – Engagement</h2>
<p>Le journaliste est engagé au poste de <strong>{{poste}}</strong> à compter du <strong>{{date_prise_poste}}</strong>.</p>
<h2>Article 2 – Rémunération</h2>
<p>Le salaire brut mensuel est fixé à <strong>{{salaire_brut}} FCFA</strong>, soumis aux cotisations sociales en vigueur.</p>
<h2>Article 3 – Clause de conscience</h2>
<p>Conformément aux usages de la profession, le journaliste peut invoquer la clause de conscience en cas de changement de ligne éditoriale.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Le présent contrat est régi par le Code du travail et la convention collective de la presse applicable.</p>
<p>Fait à Abidjan, le {{date_prise_poste}}</p>
<p>L'Employeur : _____________________ &nbsp;&nbsp; Le Journaliste : _____________________</p></div>`,
  },

  {
    code: 'med_publication_article',
    name: "Accord de publication d'article de presse",
    category: 'association',
    price: 3000,
    priceMax: 8000,
    description: "Accord entre un auteur et un organe de presse pour la publication d'un article ou d'une tribune.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'nom_organe', label: "Nom de l'organe de presse", type: 'text', required: true },
      { key: 'nom_auteur', label: "Nom et prénoms de l'auteur", type: 'text', required: true },
      { key: 'titre_article', label: "Titre de l'article", type: 'text', required: true },
      { key: 'date_publication', label: "Date de publication prévue", type: 'date', required: true },
      { key: 'remuneration', label: "Rémunération convenue (FCFA ou 0 si bénévole)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PUBLICATION D'ARTICLE DE PRESSE</h1>
<p><strong>{{nom_organe}}</strong> et <strong>{{nom_auteur}}</strong> conviennent de la publication de l'article intitulé :</p>
<p><em>{{titre_article}}</em></p>
<h2>Article 1 – Droits cédés</h2>
<p>L'auteur cède à l'organe de presse le droit de publication en première diffusion, pour une durée de douze (12) mois.</p>
<h2>Article 2 – Rémunération</h2>
<p>La rémunération convenue est de <strong>{{remuneration}} FCFA</strong>.</p>
<h2>Article 3 – Date de parution</h2>
<p>La publication est prévue le <strong>{{date_publication}}</strong>.</p>
<p>Fait à Abidjan, le {{date_publication}}</p>
<p>L'Organe de presse : _____________________ &nbsp;&nbsp; L'Auteur : _____________________</p></div>`,
  },

  {
    code: 'med_production_tv',
    name: "Contrat de service de production TV",
    category: 'association',
    price: 8000,
    priceMax: 25000,
    description: "Contrat de prestation pour la production d'une émission ou d'un programme télévisé.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'nom_diffuseur', label: "Nom du diffuseur / chaîne TV", type: 'text', required: true },
      { key: 'nom_producteur', label: "Nom de la société de production", type: 'text', required: true },
      { key: 'titre_programme', label: "Titre du programme", type: 'text', required: true },
      { key: 'budget_production', label: "Budget de production (FCFA)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison", type: 'date', required: true },
      { key: 'description_programme', label: "Description du programme", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE PRODUCTION TÉLÉVISUELLE</h1>
<p>Entre <strong>{{nom_diffuseur}}</strong> (le Commanditaire) et <strong>{{nom_producteur}}</strong> (le Producteur) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Producteur s'engage à réaliser le programme <strong>{{titre_programme}}</strong> selon les spécifications suivantes :</p>
<p>{{description_programme}}</p>
<h2>Article 2 – Budget</h2>
<p>Le budget total de production est fixé à <strong>{{budget_production}} FCFA</strong>.</p>
<h2>Article 3 – Livraison</h2>
<p>Le programme sera livré au plus tard le <strong>{{date_livraison}}</strong> dans les formats convenus.</p>
<h2>Article 4 – Propriété</h2>
<p>Les droits de diffusion sont cédés au Commanditaire. Le Producteur conserve ses droits d'auteur moraux.</p>
<p>Fait à Abidjan</p>
<p>Le Commanditaire : _____________________ &nbsp;&nbsp; Le Producteur : _____________________</p></div>`,
  },

  {
    code: 'med_coproduction_audiovisuelle',
    name: "Accord de coproduction audiovisuelle",
    category: 'association',
    price: 9000,
    priceMax: 28000,
    description: "Accord entre plusieurs sociétés pour la coproduction d'une œuvre audiovisuelle.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'coproducteur_1', label: "Nom du coproducteur 1", type: 'text', required: true },
      { key: 'coproducteur_2', label: "Nom du coproducteur 2", type: 'text', required: true },
      { key: 'titre_oeuvre', label: "Titre de l'œuvre audiovisuelle", type: 'text', required: true },
      { key: 'budget_total', label: "Budget total (FCFA)", type: 'text', required: true },
      { key: 'repartition_droits', label: "Répartition des droits (%)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COPRODUCTION AUDIOVISUELLE</h1>
<p>Entre <strong>{{coproducteur_1}}</strong> et <strong>{{coproducteur_2}}</strong>, il est convenu de coproduire l'œuvre intitulée <strong>{{titre_oeuvre}}</strong>.</p>
<h2>Article 1 – Apports</h2>
<p>Le budget total est estimé à <strong>{{budget_total}} FCFA</strong>, réparti selon les apports de chaque coproducteur.</p>
<h2>Article 2 – Droits</h2>
<p>Les droits sont répartis comme suit : <strong>{{repartition_droits}}</strong>.</p>
<h2>Article 3 – Exploitation</h2>
<p>Les parties s'accordent mutuellement sur les territoires et modes d'exploitation de l'œuvre.</p>
<p>Fait à Abidjan</p>
<p>Coproducteur 1 : _____________________ &nbsp;&nbsp; Coproducteur 2 : _____________________</p></div>`,
  },

  {
    code: 'med_diffusion_television',
    name: "Contrat de diffusion télévision (broadcasting)",
    category: 'association',
    price: 7000,
    priceMax: 20000,
    description: "Contrat accordant à une chaîne TV le droit de diffuser une œuvre audiovisuelle sur son territoire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'nom_ayant_droit', label: "Nom de l'ayant droit / producteur", type: 'text', required: true },
      { key: 'nom_chaine', label: "Nom de la chaîne de télévision", type: 'text', required: true },
      { key: 'titre_programme', label: "Titre du programme ou de l'œuvre", type: 'text', required: true },
      { key: 'territoire_diffusion', label: "Territoire de diffusion", type: 'text', required: true },
      { key: 'montant_licence', label: "Montant de la licence (FCFA)", type: 'text', required: true },
      { key: 'date_debut_diffusion', label: "Date de début de diffusion", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DIFFUSION TÉLÉVISUELLE</h1>
<p>Entre <strong>{{nom_ayant_droit}}</strong> (le Concédant) et <strong>{{nom_chaine}}</strong> (le Licencié) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Concédant autorise le Licencié à diffuser <strong>{{titre_programme}}</strong> sur le territoire de <strong>{{territoire_diffusion}}</strong>.</p>
<h2>Article 2 – Droit de licence</h2>
<p>En contrepartie, le Licencié versera <strong>{{montant_licence}} FCFA</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>La diffusion peut débuter à partir du <strong>{{date_debut_diffusion}}</strong> pour une durée de douze (12) mois.</p>
<p>Fait à Abidjan</p>
<p>Le Concédant : _____________________ &nbsp;&nbsp; Le Licencié : _____________________</p></div>`,
  },

  {
    code: 'med_licence_droits_diffusion',
    name: "Accord de licence de droits de diffusion",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Accord concédant des droits de diffusion sur une ou plusieurs œuvres audiovisuelles.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 54,
    fieldsJson: F([
      { key: 'concedant', label: "Nom du concédant", type: 'text', required: true },
      { key: 'licencie', label: "Nom du licencié", type: 'text', required: true },
      { key: 'catalogue_oeuvres', label: "Description du catalogue ou de l'œuvre", type: 'textarea', required: true },
      { key: 'redevance', label: "Redevance annuelle (FCFA)", type: 'text', required: true },
      { key: 'duree_licence', label: "Durée de la licence (mois)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE DROITS DE DIFFUSION</h1>
<p><strong>{{concedant}}</strong> accorde à <strong>{{licencie}}</strong> une licence non exclusive pour diffuser :</p>
<p>{{catalogue_oeuvres}}</p>
<h2>Article 1 – Redevance</h2>
<p>La redevance annuelle est fixée à <strong>{{redevance}} FCFA</strong>.</p>
<h2>Article 2 – Durée</h2>
<p>La licence est conclue pour <strong>{{duree_licence}} mois</strong>.</p>
<h2>Article 3 – Restrictions</h2>
<p>La sous-licence est interdite sans accord préalable du concédant.</p>
<p>Fait à Abidjan</p>
<p>Le Concédant : _____________________ &nbsp;&nbsp; Le Licencié : _____________________</p></div>`,
  },

  {
    code: 'med_production_radio',
    name: "Contrat de service de production radio",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de prestation pour la production d'une émission ou d'un contenu radiophonique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'nom_station', label: "Nom de la station radio", type: 'text', required: true },
      { key: 'nom_producteur', label: "Nom du prestataire de production", type: 'text', required: true },
      { key: 'titre_emission', label: "Titre de l'émission", type: 'text', required: true },
      { key: 'cout_production', label: "Coût de production (FCFA)", type: 'text', required: true },
      { key: 'date_premiere_diffusion', label: "Date de première diffusion", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE PRODUCTION RADIOPHONIQUE</h1>
<p>Entre <strong>{{nom_station}}</strong> et <strong>{{nom_producteur}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Production de l'émission radio intitulée <strong>{{titre_emission}}</strong>.</p>
<h2>Article 2 – Coût</h2>
<p>Le coût de production est fixé à <strong>{{cout_production}} FCFA</strong>.</p>
<h2>Article 3 – Livraison</h2>
<p>Les contenus produits seront livrés avant le <strong>{{date_premiere_diffusion}}</strong>.</p>
<p>Fait à Abidjan</p>
<p>La Station : _____________________ &nbsp;&nbsp; Le Producteur : _____________________</p></div>`,
  },

  {
    code: 'med_podcast_professionnel',
    name: "Accord de podcast professionnel",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord de partenariat pour la création et la distribution d'un podcast à caractère professionnel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'nom_createur', label: "Nom du créateur du podcast", type: 'text', required: true },
      { key: 'nom_partenaire', label: "Nom du partenaire distributeur / sponsor", type: 'text', required: true },
      { key: 'titre_podcast', label: "Titre du podcast", type: 'text', required: true },
      { key: 'frequence_episodes', label: "Fréquence de publication des épisodes", type: 'text', required: true },
      { key: 'remuneration_episode', label: "Rémunération par épisode (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PODCAST PROFESSIONNEL</h1>
<p><strong>{{nom_createur}}</strong> et <strong>{{nom_partenaire}}</strong> s'associent pour le podcast <strong>{{titre_podcast}}</strong>.</p>
<h2>Article 1 – Production</h2>
<p>Les épisodes seront publiés à la fréquence suivante : <strong>{{frequence_episodes}}</strong>.</p>
<h2>Article 2 – Rémunération</h2>
<p>Chaque épisode publié sera rémunéré <strong>{{remuneration_episode}} FCFA</strong>.</p>
<h2>Article 3 – Propriété intellectuelle</h2>
<p>Le créateur conserve les droits moraux ; les droits d'exploitation sont partagés selon les termes annexés.</p>
<p>Fait à Abidjan</p>
<p>Le Créateur : _____________________ &nbsp;&nbsp; Le Partenaire : _____________________</p></div>`,
  },

  {
    code: 'med_sous_titrage',
    name: "Contrat de service de sous-titrage",
    category: 'association',
    price: 3500,
    priceMax: 10000,
    description: "Contrat pour la prestation de sous-titrage d'une œuvre audiovisuelle dans une ou plusieurs langues.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 45,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'nom_prestataire', label: "Nom du prestataire de sous-titrage", type: 'text', required: true },
      { key: 'titre_oeuvre', label: "Titre de l'œuvre à sous-titrer", type: 'text', required: true },
      { key: 'langues_cibles', label: "Langue(s) cible(s) du sous-titrage", type: 'text', required: true },
      { key: 'tarif_minute', label: "Tarif à la minute (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE SOUS-TITRAGE</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_prestataire}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Sous-titrage de <strong>{{titre_oeuvre}}</strong> en <strong>{{langues_cibles}}</strong>.</p>
<h2>Article 2 – Tarification</h2>
<p>Le tarif est de <strong>{{tarif_minute}} FCFA par minute</strong> de contenu sous-titré.</p>
<h2>Article 3 – Délai</h2>
<p>Le prestataire respectera les délais convenus sous peine de pénalités de retard.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'med_doublage_voix_off',
    name: "Accord de service de doublage (voix-off)",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Accord pour la prestation de doublage ou d'enregistrement de voix-off pour une production audiovisuelle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 49,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'nom_comedien', label: "Nom du comédien de voix / studio de doublage", type: 'text', required: true },
      { key: 'titre_production', label: "Titre de la production", type: 'text', required: true },
      { key: 'langue_doublage', label: "Langue du doublage", type: 'text', required: true },
      { key: 'cout_prestation', label: "Coût de la prestation (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DOUBLAGE – VOIX-OFF</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_comedien}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Réalisation du doublage en <strong>{{langue_doublage}}</strong> pour la production <strong>{{titre_production}}</strong>.</p>
<h2>Article 2 – Rémunération</h2>
<p>Le coût total de la prestation est de <strong>{{cout_prestation}} FCFA</strong>.</p>
<h2>Article 3 – Sessions d'enregistrement</h2>
<p>Les sessions seront organisées d'un commun accord et dans un studio homologué.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'med_realisation_documentaire',
    name: "Contrat de service de réalisation film documentaire",
    category: 'association',
    price: 8000,
    priceMax: 24000,
    description: "Contrat pour la réalisation complète d'un film documentaire, de la prise de vue au montage final.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'nom_commanditaire', label: "Nom du commanditaire", type: 'text', required: true },
      { key: 'nom_realisateur', label: "Nom du réalisateur / société de production", type: 'text', required: true },
      { key: 'sujet_documentaire', label: "Sujet du documentaire", type: 'textarea', required: true },
      { key: 'duree_prevue', label: "Durée prévue du documentaire (minutes)", type: 'text', required: true },
      { key: 'budget_total', label: "Budget total (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RÉALISATION DE FILM DOCUMENTAIRE</h1>
<p>Entre <strong>{{nom_commanditaire}}</strong> et <strong>{{nom_realisateur}}</strong> :</p>
<h2>Article 1 – Sujet</h2>
<p>{{sujet_documentaire}}</p>
<h2>Article 2 – Format</h2>
<p>Durée prévue : <strong>{{duree_prevue}} minutes</strong>.</p>
<h2>Article 3 – Budget</h2>
<p>Budget total : <strong>{{budget_total}} FCFA</strong>, réglé en plusieurs tranches définies en annexe.</p>
<h2>Article 4 – Droits</h2>
<p>Les droits de diffusion sont définis dans un contrat de licence séparé.</p>
<p>Fait à Abidjan</p>
<p>Le Commanditaire : _____________________ &nbsp;&nbsp; Le Réalisateur : _____________________</p></div>`,
  },

  {
    code: 'med_montage_video',
    name: "Accord de service de montage vidéo",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord de prestation pour le montage et le post-traitement d'une production vidéo.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'nom_monteur', label: "Nom du monteur / société de post-production", type: 'text', required: true },
      { key: 'titre_projet', label: "Titre du projet vidéo", type: 'text', required: true },
      { key: 'tarif_journalier', label: "Tarif journalier (FCFA)", type: 'text', required: true },
      { key: 'date_rendu_final', label: "Date de rendu final", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MONTAGE VIDÉO</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_monteur}}</strong> :</p>
<h2>Article 1 – Mission</h2>
<p>Montage et post-production du projet <strong>{{titre_projet}}</strong>.</p>
<h2>Article 2 – Tarification</h2>
<p>Tarif journalier : <strong>{{tarif_journalier}} FCFA</strong>.</p>
<h2>Article 3 – Livraison</h2>
<p>La version finale sera livrée au plus tard le <strong>{{date_rendu_final}}</strong>.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; Le Monteur : _____________________</p></div>`,
  },

  {
    code: 'med_captation_evenement',
    name: "Contrat de service de captation événementielle",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Contrat pour la captation vidéo et audio d'un événement (conférence, gala, séminaire).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client / organisateur", type: 'text', required: true },
      { key: 'nom_prestataire', label: "Nom du prestataire de captation", type: 'text', required: true },
      { key: 'nom_evenement', label: "Nom de l'événement", type: 'text', required: true },
      { key: 'date_evenement', label: "Date de l'événement", type: 'date', required: true },
      { key: 'cout_prestation', label: "Coût de la prestation (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE CAPTATION ÉVÉNEMENTIELLE</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_prestataire}}</strong> :</p>
<h2>Article 1 – Mission</h2>
<p>Captation vidéo et audio de <strong>{{nom_evenement}}</strong> le <strong>{{date_evenement}}</strong>.</p>
<h2>Article 2 – Livraison</h2>
<p>Les rushes et le montage final seront livrés dans un délai convenu après l'événement.</p>
<h2>Article 3 – Rémunération</h2>
<p>Coût total : <strong>{{cout_prestation}} FCFA</strong>, payable 50% avant, 50% à la livraison.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'med_streaming_live',
    name: "Accord de service de streaming en direct (live)",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Accord pour la diffusion en direct d'un événement ou d'une émission sur les plateformes numériques.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'nom_prestataire', label: "Nom du prestataire de streaming", type: 'text', required: true },
      { key: 'nom_evenement', label: "Nom ou titre du live", type: 'text', required: true },
      { key: 'plateformes', label: "Plateformes de diffusion (YouTube, Facebook, etc.)", type: 'text', required: true },
      { key: 'date_live', label: "Date et heure du live", type: 'date', required: true },
      { key: 'cout_service', label: "Coût du service (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STREAMING EN DIRECT</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_prestataire}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Diffusion en direct de <strong>{{nom_evenement}}</strong> le <strong>{{date_live}}</strong> sur : <strong>{{plateformes}}</strong>.</p>
<h2>Article 2 – Responsabilités techniques</h2>
<p>Le prestataire assure la connexion, l'encodage et la stabilité du flux en temps réel.</p>
<h2>Article 3 – Rémunération</h2>
<p>Coût du service : <strong>{{cout_service}} FCFA</strong>.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'med_archivage_audiovisuel',
    name: "Contrat de service d'archivage audiovisuel",
    category: 'association',
    price: 4500,
    priceMax: 13000,
    description: "Contrat pour l'archivage numérique et la gestion d'un fonds audiovisuel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 42,
    fieldsJson: F([
      { key: 'nom_detenteur', label: "Nom du détenteur du fonds", type: 'text', required: true },
      { key: 'nom_archiviste', label: "Nom de la société d'archivage", type: 'text', required: true },
      { key: 'description_fonds', label: "Description du fonds à archiver", type: 'textarea', required: true },
      { key: 'duree_conservation', label: "Durée de conservation (années)", type: 'text', required: true },
      { key: 'cout_annuel', label: "Coût annuel d'archivage (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'ARCHIVAGE AUDIOVISUEL</h1>
<p>Entre <strong>{{nom_detenteur}}</strong> et <strong>{{nom_archiviste}}</strong> :</p>
<h2>Article 1 – Fonds concerné</h2>
<p>{{description_fonds}}</p>
<h2>Article 2 – Durée</h2>
<p>Conservation garantie pendant <strong>{{duree_conservation}} ans</strong>.</p>
<h2>Article 3 – Coût</h2>
<p>Redevance annuelle d'archivage : <strong>{{cout_annuel}} FCFA</strong>.</p>
<h2>Article 4 – Sécurité</h2>
<p>L'archiviste s'engage à maintenir des copies de sauvegarde dans au moins deux sites distincts.</p>
<p>Fait à Abidjan</p>
<p>Le Détenteur : _____________________ &nbsp;&nbsp; L'Archiviste : _____________________</p></div>`,
  },

  {
    code: 'med_partenariat_chaine_agence',
    name: "Accord de partenariat chaîne TV-agence presse",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Accord de partenariat éditorial entre une chaîne de télévision et une agence de presse.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'nom_chaine', label: "Nom de la chaîne TV", type: 'text', required: true },
      { key: 'nom_agence', label: "Nom de l'agence de presse", type: 'text', required: true },
      { key: 'types_contenus', label: "Types de contenus fournis par l'agence", type: 'textarea', required: true },
      { key: 'redevance_mensuelle', label: "Redevance mensuelle (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du partenariat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CHAÎNE TV – AGENCE DE PRESSE</h1>
<p>Entre <strong>{{nom_chaine}}</strong> et <strong>{{nom_agence}}</strong> :</p>
<h2>Article 1 – Fourniture de contenus</h2>
<p>{{types_contenus}}</p>
<h2>Article 2 – Redevance</h2>
<p>Redevance mensuelle : <strong>{{redevance_mensuelle}} FCFA</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Partenariat effectif à compter du <strong>{{date_debut}}</strong>, renouvelable annuellement.</p>
<p>Fait à Abidjan</p>
<p>La Chaîne : _____________________ &nbsp;&nbsp; L'Agence : _____________________</p></div>`,
  },

  {
    code: 'med_analyse_audience',
    name: "Contrat de service d'analyse d'audience (Médiamétrie)",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Contrat pour la réalisation d'études d'audience et de mesure de l'audimat d'une chaîne ou d'un programme.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client (chaîne ou producteur)", type: 'text', required: true },
      { key: 'nom_institut', label: "Nom de l'institut de mesure", type: 'text', required: true },
      { key: 'perimetre_mesure', label: "Périmètre de mesure (chaîne, programmes)", type: 'text', required: true },
      { key: 'periode_etude', label: "Période d'étude (ex. T1 2025)", type: 'text', required: true },
      { key: 'cout_etude', label: "Coût de l'étude (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'ANALYSE D'AUDIENCE</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_institut}}</strong> :</p>
<h2>Article 1 – Périmètre</h2>
<p>L'étude porte sur : <strong>{{perimetre_mesure}}</strong>, pour la période <strong>{{periode_etude}}</strong>.</p>
<h2>Article 2 – Méthodologie</h2>
<p>L'institut utilise des panels représentatifs et des outils de mesure certifiés.</p>
<h2>Article 3 – Coût</h2>
<p>Coût de l'étude : <strong>{{cout_etude}} FCFA</strong>.</p>
<h2>Article 4 – Rapport</h2>
<p>Un rapport détaillé sera remis sous 30 jours après la fin de la période d'étude.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; L'Institut : _____________________</p></div>`,
  },

  {
    code: 'med_publicite_televisee',
    name: "Accord de service de publicité télévisée",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Accord entre un annonceur et une régie publicitaire pour la diffusion de spots publicitaires à la télévision.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'nom_annonceur', label: "Nom de l'annonceur", type: 'text', required: true },
      { key: 'nom_regie', label: "Nom de la régie publicitaire", type: 'text', required: true },
      { key: 'description_campagne', label: "Description de la campagne publicitaire", type: 'textarea', required: true },
      { key: 'budget_campagne', label: "Budget total de la campagne (FCFA)", type: 'text', required: true },
      { key: 'date_debut_campagne', label: "Date de début de la campagne", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PUBLICITÉ TÉLÉVISÉE</h1>
<p>Entre <strong>{{nom_annonceur}}</strong> et <strong>{{nom_regie}}</strong> :</p>
<h2>Article 1 – Campagne</h2>
<p>{{description_campagne}}</p>
<h2>Article 2 – Budget</h2>
<p>Budget total : <strong>{{budget_campagne}} FCFA</strong>.</p>
<h2>Article 3 – Planification</h2>
<p>La campagne débutera le <strong>{{date_debut_campagne}}</strong>. Le plan de diffusion est joint en annexe.</p>
<p>Fait à Abidjan</p>
<p>L'Annonceur : _____________________ &nbsp;&nbsp; La Régie : _____________________</p></div>`,
  },

  {
    code: 'med_spot_radio',
    name: "Accord de production de spot publicitaire radio",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord pour la production d'un spot publicitaire radiophonique (écriture, voix, sound design).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'nom_annonceur', label: "Nom de l'annonceur", type: 'text', required: true },
      { key: 'nom_studio', label: "Nom du studio de production", type: 'text', required: true },
      { key: 'message_publicitaire', label: "Message ou concept publicitaire", type: 'textarea', required: true },
      { key: 'duree_spot', label: "Durée du spot (secondes)", type: 'text', required: true },
      { key: 'cout_production', label: "Coût de production (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRODUCTION DE SPOT PUBLICITAIRE RADIO</h1>
<p>Entre <strong>{{nom_annonceur}}</strong> et <strong>{{nom_studio}}</strong> :</p>
<h2>Article 1 – Concept</h2>
<p>{{message_publicitaire}}</p>
<h2>Article 2 – Format</h2>
<p>Durée du spot : <strong>{{duree_spot}} secondes</strong>.</p>
<h2>Article 3 – Rémunération</h2>
<p>Coût total : <strong>{{cout_production}} FCFA</strong>, cédant les droits de diffusion pendant 12 mois.</p>
<p>Fait à Abidjan</p>
<p>L'Annonceur : _____________________ &nbsp;&nbsp; Le Studio : _____________________</p></div>`,
  },

  {
    code: 'med_rapport_performance_chaine',
    name: "Rapport de performance chaîne TV",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Modèle de rapport d'évaluation des performances d'une chaîne de télévision sur une période donnée.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 44,
    fieldsJson: F([
      { key: 'nom_chaine', label: "Nom de la chaîne", type: 'text', required: true },
      { key: 'periode_rapport', label: "Période du rapport (ex. S1 2025)", type: 'text', required: true },
      { key: 'part_audience', label: "Part d'audience moyenne (%)", type: 'text', required: true },
      { key: 'revenus_publicitaires', label: "Revenus publicitaires (FCFA)", type: 'text', required: true },
      { key: 'commentaires_performance', label: "Commentaires sur la performance", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – {{nom_chaine}}</h1>
<h2>Période : {{periode_rapport}}</h2>
<h2>1. Audience</h2>
<p>Part d'audience moyenne : <strong>{{part_audience}}%</strong>.</p>
<h2>2. Revenus</h2>
<p>Revenus publicitaires : <strong>{{revenus_publicitaires}} FCFA</strong>.</p>
<h2>3. Analyse</h2>
<p>{{commentaires_performance}}</p>
<p>Rapport établi par la Direction Générale</p></div>`,
  },

  {
    code: 'med_plan_digital_media',
    name: "Plan de développement digital media",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Document stratégique pour le développement de la présence numérique d'un média.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'nom_media', label: "Nom du média", type: 'text', required: true },
      { key: 'responsable_digital', label: "Nom du responsable digital", type: 'text', required: true },
      { key: 'objectifs_digitaux', label: "Objectifs digitaux (3 à 5)", type: 'textarea', required: true },
      { key: 'budget_digital', label: "Budget annuel digital (FCFA)", type: 'text', required: true },
      { key: 'date_mise_en_oeuvre', label: "Date de mise en œuvre", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DIGITAL MEDIA – {{nom_media}}</h1>
<h2>1. Responsable</h2>
<p>{{responsable_digital}}</p>
<h2>2. Objectifs</h2>
<p>{{objectifs_digitaux}}</p>
<h2>3. Budget</h2>
<p>Budget annuel alloué : <strong>{{budget_digital}} FCFA</strong>.</p>
<h2>4. Calendrier</h2>
<p>Mise en œuvre à partir du <strong>{{date_mise_en_oeuvre}}</strong>.</p></div>`,
  },

  {
    code: 'med_tv_communautaire',
    name: "Accord de service de télévision communautaire",
    category: 'association',
    price: 3500,
    priceMax: 10000,
    description: "Accord pour la mise en place et la gestion d'une chaîne de télévision communautaire locale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 40,
    fieldsJson: F([
      { key: 'nom_communaute', label: "Nom de la communauté ou collectivité", type: 'text', required: true },
      { key: 'nom_operateur', label: "Nom de l'opérateur technique", type: 'text', required: true },
      { key: 'zone_couverture', label: "Zone de couverture géographique", type: 'text', required: true },
      { key: 'contribution_mensuelle', label: "Contribution mensuelle de la communauté (FCFA)", type: 'text', required: true },
      { key: 'date_lancement', label: "Date de lancement", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TÉLÉVISION COMMUNAUTAIRE</h1>
<p>Entre <strong>{{nom_communaute}}</strong> et <strong>{{nom_operateur}}</strong> :</p>
<h2>Article 1 – Couverture</h2>
<p>Zone desservie : <strong>{{zone_couverture}}</strong>.</p>
<h2>Article 2 – Contribution</h2>
<p>La communauté verse <strong>{{contribution_mensuelle}} FCFA par mois</strong> pour le fonctionnement de la chaîne.</p>
<h2>Article 3 – Lancement</h2>
<p>Lancement prévu le <strong>{{date_lancement}}</strong>.</p>
<p>Fait à Abidjan</p>
<p>La Communauté : _____________________ &nbsp;&nbsp; L'Opérateur : _____________________</p></div>`,
  },

  {
    code: 'med_radio_communautaire',
    name: "Accord de service de radio communautaire",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord pour la création et la gestion d'une radio communautaire locale en zone rurale ou périurbaine.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 43,
    fieldsJson: F([
      { key: 'nom_communaute', label: "Nom de la communauté ou association", type: 'text', required: true },
      { key: 'nom_operateur', label: "Nom de l'opérateur ou partenaire technique", type: 'text', required: true },
      { key: 'frequence_fm', label: "Fréquence FM allouée", type: 'text', required: true },
      { key: 'zone_couverture', label: "Zone de couverture (km de rayon)", type: 'text', required: true },
      { key: 'cout_installation', label: "Coût d'installation (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RADIO COMMUNAUTAIRE</h1>
<p>Entre <strong>{{nom_communaute}}</strong> et <strong>{{nom_operateur}}</strong> :</p>
<h2>Article 1 – Fréquence</h2>
<p>Fréquence allouée : <strong>{{frequence_fm}} MHz</strong>.</p>
<h2>Article 2 – Couverture</h2>
<p>Rayon de diffusion : <strong>{{zone_couverture}} km</strong>.</p>
<h2>Article 3 – Installation</h2>
<p>Coût d'installation : <strong>{{cout_installation}} FCFA</strong>, pris en charge par le partenaire technique.</p>
<p>Fait à Abidjan</p>
<p>La Communauté : _____________________ &nbsp;&nbsp; L'Opérateur : _____________________</p></div>`,
  },

  {
    code: 'med_charte_deontologie',
    name: "Charte de déontologie journalistique",
    category: 'association',
    price: 2000,
    priceMax: 6000,
    description: "Charte définissant les principes déontologiques et éthiques d'un organe de presse et de ses journalistes.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 47,
    fieldsJson: F([
      { key: 'nom_organe', label: "Nom de l'organe de presse", type: 'text', required: true },
      { key: 'directeur_publication', label: "Nom du directeur de la publication", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE DÉONTOLOGIE JOURNALISTIQUE</h1>
<h2>{{nom_organe}}</h2>
<p>Adoptée le <strong>{{date_adoption}}</strong> sous l'autorité de <strong>{{directeur_publication}}</strong>.</p>
<h2>Préambule</h2>
<p>Les journalistes de cet organe s'engagent à respecter la vérité, l'indépendance éditoriale et le droit à l'information du public.</p>
<h2>Principes fondamentaux</h2>
<ol>
<li>Vérifier l'exactitude des informations avant publication.</li>
<li>Distinguer clairement faits et opinions.</li>
<li>Respecter la vie privée et la présomption d'innocence.</li>
<li>Refuser toute forme de corruption ou de conflit d'intérêts.</li>
<li>Corriger rapidement et publiquement toute erreur commise.</li>
</ol>
<p>Signé par le Directeur de la publication : _____________________</p></div>`,
  },

  // ─── 25 Communication institutionnelle / Relations publiques (préfixe rp_, catégorie commercial_financier) ───

  {
    code: 'rp_agence_relations_publiques',
    name: "Contrat d'agence de relations publiques (RP)",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de mandat confié à une agence de RP pour représenter et promouvoir une organisation.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client / organisation", type: 'text', required: true },
      { key: 'nom_agence', label: "Nom de l'agence de RP", type: 'text', required: true },
      { key: 'missions', label: "Missions confiées à l'agence", type: 'textarea', required: true },
      { key: 'honoraires_mensuels', label: "Honoraires mensuels (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de la mission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT D'AGENCE DE RELATIONS PUBLIQUES</h1>
<p>Entre <strong>{{nom_client}}</strong> (ci-après "le Client") et <strong>{{nom_agence}}</strong> (ci-après "l'Agence") :</p>
<h2>Article 1 – Missions</h2>
<p>{{missions}}</p>
<h2>Article 2 – Honoraires</h2>
<p>Honoraires mensuels : <strong>{{honoraires_mensuels}} FCFA</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Mandat effectif à compter du <strong>{{date_debut}}</strong>, pour une durée d'un an renouvelable.</p>
<h2>Article 4 – Reporting</h2>
<p>L'Agence remet un rapport mensuel d'activité au Client.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; L'Agence : _____________________</p></div>`,
  },

  {
    code: 'rp_communication_crise',
    name: "Accord de service de communication de crise",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 20000,
    description: "Accord pour l'accompagnement d'une organisation par un expert en communication de crise.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_organisation', label: "Nom de l'organisation en crise", type: 'text', required: true },
      { key: 'nom_expert', label: "Nom du consultant en communication de crise", type: 'text', required: true },
      { key: 'nature_crise', label: "Nature de la crise", type: 'textarea', required: true },
      { key: 'honoraires_mission', label: "Honoraires de la mission (FCFA)", type: 'text', required: true },
      { key: 'date_mission', label: "Date de début d'intervention", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMMUNICATION DE CRISE</h1>
<p>Entre <strong>{{nom_organisation}}</strong> et <strong>{{nom_expert}}</strong> :</p>
<h2>Article 1 – Contexte</h2>
<p>{{nature_crise}}</p>
<h2>Article 2 – Mission</h2>
<p>L'expert assiste l'organisation dans la gestion de sa communication externe et interne durant la crise.</p>
<h2>Article 3 – Rémunération</h2>
<p>Honoraires : <strong>{{honoraires_mission}} FCFA</strong>.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Toutes les informations échangées sont strictement confidentielles.</p>
<p>Fait à Abidjan, le {{date_mission}}</p>
<p>L'Organisation : _____________________ &nbsp;&nbsp; L'Expert : _____________________</p></div>`,
  },

  {
    code: 'rp_lobbying_institutionnel',
    name: "Contrat de service de lobbying institutionnel",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 27000,
    description: "Contrat pour des activités de représentation d'intérêts auprès des institutions publiques et gouvernementales.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'nom_mandant', label: "Nom du mandant (entreprise ou association)", type: 'text', required: true },
      { key: 'nom_lobbyiste', label: "Nom du cabinet de lobbying", type: 'text', required: true },
      { key: 'objectifs_lobbying', label: "Objectifs de la mission de lobbying", type: 'textarea', required: true },
      { key: 'honoraires_annuels', label: "Honoraires annuels (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de la mission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE LOBBYING INSTITUTIONNEL</h1>
<p>Entre <strong>{{nom_mandant}}</strong> et <strong>{{nom_lobbyiste}}</strong> :</p>
<h2>Article 1 – Mission</h2>
<p>{{objectifs_lobbying}}</p>
<h2>Article 2 – Honoraires</h2>
<p>Honoraires annuels : <strong>{{honoraires_annuels}} FCFA</strong>.</p>
<h2>Article 3 – Éthique</h2>
<p>Toutes les activités de représentation s'exercent dans le respect de la légalité et des règles déontologiques en vigueur.</p>
<p>Fait à Abidjan, le {{date_debut}}</p>
<p>Le Mandant : _____________________ &nbsp;&nbsp; Le Lobbyiste : _____________________</p></div>`,
  },

  {
    code: 'rp_conseil_communication_politique',
    name: "Accord de service de conseil en communication politique",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Accord pour la prestation de conseil stratégique en communication politique auprès d'un élu ou d'un parti.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'nom_client_politique', label: "Nom du client (élu, parti, institution)", type: 'text', required: true },
      { key: 'nom_conseiller', label: "Nom du conseiller en communication", type: 'text', required: true },
      { key: 'perimetre_mission', label: "Périmètre de la mission", type: 'textarea', required: true },
      { key: 'honoraires_mensuels', label: "Honoraires mensuels (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN COMMUNICATION POLITIQUE</h1>
<p>Entre <strong>{{nom_client_politique}}</strong> et <strong>{{nom_conseiller}}</strong> :</p>
<h2>Article 1 – Mission</h2>
<p>{{perimetre_mission}}</p>
<h2>Article 2 – Honoraires</h2>
<p>Honoraires mensuels : <strong>{{honoraires_mensuels}} FCFA</strong>.</p>
<h2>Article 3 – Confidentialité</h2>
<p>Le conseiller s'engage à une confidentialité absolue sur les informations stratégiques communiquées.</p>
<p>Fait à Abidjan, le {{date_debut}}</p>
<p>Le Client : _____________________ &nbsp;&nbsp; Le Conseiller : _____________________</p></div>`,
  },

  {
    code: 'rp_speechwriting',
    name: "Contrat de service de discours et allocutions (speechwriting)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat pour la rédaction professionnelle de discours, allocutions et prises de parole institutionnelles.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client (personnalité, institution)", type: 'text', required: true },
      { key: 'nom_redacteur', label: "Nom du rédacteur de discours", type: 'text', required: true },
      { key: 'contexte_discours', label: "Contexte et nature du discours", type: 'textarea', required: true },
      { key: 'tarif_discours', label: "Tarif par discours (FCFA)", type: 'text', required: true },
      { key: 'date_premiere_intervention', label: "Date de la première intervention", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE SPEECHWRITING</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_redacteur}}</strong> :</p>
<h2>Article 1 – Mission</h2>
<p>{{contexte_discours}}</p>
<h2>Article 2 – Tarification</h2>
<p>Tarif par discours : <strong>{{tarif_discours}} FCFA</strong>.</p>
<h2>Article 3 – Droits d'auteur</h2>
<p>Les discours produits sont entièrement cédés au client, qui en détient les droits d'exploitation.</p>
<p>Fait à Abidjan, le {{date_premiere_intervention}}</p>
<p>Le Client : _____________________ &nbsp;&nbsp; Le Rédacteur : _____________________</p></div>`,
  },

  {
    code: 'rp_rapport_annuel',
    name: "Accord de service de publication de rapport annuel",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Accord pour la conception, la rédaction et la publication du rapport annuel d'une organisation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'nom_organisation', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'nom_prestataire', label: "Nom du prestataire (agence ou studio)", type: 'text', required: true },
      { key: 'exercice_concerne', label: "Exercice concerné (ex. 2024)", type: 'text', required: true },
      { key: 'budget_rapport', label: "Budget de production du rapport (FCFA)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PUBLICATION DE RAPPORT ANNUEL</h1>
<p>Entre <strong>{{nom_organisation}}</strong> et <strong>{{nom_prestataire}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Conception et publication du rapport annuel pour l'exercice <strong>{{exercice_concerne}}</strong>.</p>
<h2>Article 2 – Budget</h2>
<p>Budget alloué : <strong>{{budget_rapport}} FCFA</strong>.</p>
<h2>Article 3 – Livraison</h2>
<p>Le rapport final sera livré le <strong>{{date_livraison}}</strong>, en versions imprimée et numérique.</p>
<p>Fait à Abidjan</p>
<p>L'Organisation : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'rp_rapport_rse',
    name: "Contrat de service de rapport de développement durable (RSE)",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Contrat pour la rédaction et la publication du rapport RSE d'une entreprise selon les standards internationaux.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 56,
    fieldsJson: F([
      { key: 'nom_entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'nom_prestataire', label: "Nom du prestataire RSE", type: 'text', required: true },
      { key: 'referentiel', label: "Référentiel utilisé (GRI, ISO 26000, OCDE)", type: 'text', required: true },
      { key: 'budget_rapport', label: "Budget du rapport (FCFA)", type: 'text', required: true },
      { key: 'date_remise', label: "Date de remise du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE RAPPORT RSE</h1>
<p>Entre <strong>{{nom_entreprise}}</strong> et <strong>{{nom_prestataire}}</strong> :</p>
<h2>Article 1 – Référentiel</h2>
<p>Le rapport sera établi selon le référentiel <strong>{{referentiel}}</strong>.</p>
<h2>Article 2 – Budget</h2>
<p>Budget de production : <strong>{{budget_rapport}} FCFA</strong>.</p>
<h2>Article 3 – Remise</h2>
<p>Le rapport sera remis au plus tard le <strong>{{date_remise}}</strong>.</p>
<p>Fait à Abidjan</p>
<p>L'Entreprise : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'rp_conference_presse',
    name: "Accord de service d'organisation de conférence de presse",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Accord pour l'organisation logistique et la communication autour d'une conférence de presse.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom de l'organisation cliente", type: 'text', required: true },
      { key: 'nom_agence', label: "Nom de l'agence organisatrice", type: 'text', required: true },
      { key: 'theme_conference', label: "Thème de la conférence de presse", type: 'text', required: true },
      { key: 'date_conference', label: "Date de la conférence", type: 'date', required: true },
      { key: 'budget_organisation', label: "Budget d'organisation (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'ORGANISATION DE CONFÉRENCE DE PRESSE</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_agence}}</strong> :</p>
<h2>Article 1 – Thème</h2>
<p>Conférence de presse sur le thème : <strong>{{theme_conference}}</strong>.</p>
<h2>Article 2 – Date</h2>
<p>La conférence se tiendra le <strong>{{date_conference}}</strong>.</p>
<h2>Article 3 – Budget</h2>
<p>Budget d'organisation : <strong>{{budget_organisation}} FCFA</strong>.</p>
<h2>Article 4 – Prestations</h2>
<p>L'agence prend en charge : la salle, l'accréditation presse, le dossier de presse et la modération.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; L'Agence : _____________________</p></div>`,
  },

  {
    code: 'rp_salon_professionnel',
    name: "Contrat de service d'organisation de salon professionnel",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Contrat pour la planification et l'organisation d'un salon ou d'une foire professionnelle.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'nom_organisateur', label: "Nom de l'organisateur", type: 'text', required: true },
      { key: 'nom_prestataire', label: "Nom du prestataire événementiel", type: 'text', required: true },
      { key: 'nom_salon', label: "Nom du salon / foire", type: 'text', required: true },
      { key: 'budget_total', label: "Budget total de l'événement (FCFA)", type: 'text', required: true },
      { key: 'date_salon', label: "Date d'ouverture du salon", type: 'date', required: true },
      { key: 'lieu', label: "Lieu de tenue du salon", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ORGANISATION DE SALON PROFESSIONNEL</h1>
<p>Entre <strong>{{nom_organisateur}}</strong> et <strong>{{nom_prestataire}}</strong> :</p>
<h2>Article 1 – Événement</h2>
<p><strong>{{nom_salon}}</strong> – Ouverture le <strong>{{date_salon}}</strong> à <strong>{{lieu}}</strong>.</p>
<h2>Article 2 – Budget</h2>
<p>Budget total : <strong>{{budget_total}} FCFA</strong>.</p>
<h2>Article 3 – Prestations</h2>
<p>Le prestataire assure la scénographie, la gestion des exposants, l'accueil et la communication de l'événement.</p>
<p>Fait à Abidjan</p>
<p>L'Organisateur : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'rp_sommet_international',
    name: "Accord de service d'organisation de sommet international",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 40000,
    description: "Accord pour la préparation et l'organisation logistique d'un sommet ou d'une conférence internationale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'nom_institution', label: "Nom de l'institution organisatrice", type: 'text', required: true },
      { key: 'nom_prestataire', label: "Nom du prestataire événementiel international", type: 'text', required: true },
      { key: 'theme_sommet', label: "Thème du sommet", type: 'text', required: true },
      { key: 'nombre_delegues', label: "Nombre de délégués attendus", type: 'text', required: true },
      { key: 'date_sommet', label: "Date du sommet", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'ORGANISATION DE SOMMET INTERNATIONAL</h1>
<p>Entre <strong>{{nom_institution}}</strong> et <strong>{{nom_prestataire}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Organisation du sommet sur le thème <strong>{{theme_sommet}}</strong>, prévu le <strong>{{date_sommet}}</strong>.</p>
<h2>Article 2 – Capacité</h2>
<p>Nombre de délégués attendus : <strong>{{nombre_delegues}}</strong>.</p>
<h2>Article 3 – Prestations</h2>
<p>Logistique, protocole, interprétation simultanée, sécurité et communication officielle inclus.</p>
<p>Fait à Abidjan</p>
<p>L'Institution : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'rp_protocole_ceremonial',
    name: "Contrat de service de protocole et cérémonial",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Contrat pour la mise en place d'un service de protocole lors d'événements officiels ou institutionnels.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 54,
    fieldsJson: F([
      { key: 'nom_institution', label: "Nom de l'institution", type: 'text', required: true },
      { key: 'nom_prestataire', label: "Nom du prestataire de protocole", type: 'text', required: true },
      { key: 'type_evenement', label: "Type d'événement officiel", type: 'text', required: true },
      { key: 'date_evenement', label: "Date de l'événement", type: 'date', required: true },
      { key: 'cout_service', label: "Coût du service (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE PROTOCOLE ET CÉRÉMONIAL</h1>
<p>Entre <strong>{{nom_institution}}</strong> et <strong>{{nom_prestataire}}</strong> :</p>
<h2>Article 1 – Mission</h2>
<p>Prise en charge du protocole pour <strong>{{type_evenement}}</strong> le <strong>{{date_evenement}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Placement des officiels, gestion des drapeaux, séquence protocolaire et coordination avec la sécurité.</p>
<h2>Article 3 – Coût</h2>
<p>Coût du service : <strong>{{cout_service}} FCFA</strong>.</p>
<p>Fait à Abidjan</p>
<p>L'Institution : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'rp_ceremonie_officielle',
    name: "Accord de service de cérémonie officielle d'État",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 21000,
    description: "Accord pour l'organisation et la coordination d'une cérémonie officielle d'État.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 46,
    fieldsJson: F([
      { key: 'nom_autorite', label: "Nom de l'autorité commanditaire", type: 'text', required: true },
      { key: 'nom_prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'nature_ceremonie', label: "Nature de la cérémonie", type: 'text', required: true },
      { key: 'date_ceremonie', label: "Date de la cérémonie", type: 'date', required: true },
      { key: 'budget_alloue', label: "Budget alloué (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CÉRÉMONIE OFFICIELLE D'ÉTAT</h1>
<p>Entre <strong>{{nom_autorite}}</strong> et <strong>{{nom_prestataire}}</strong> :</p>
<h2>Article 1 – Cérémonie</h2>
<p>Nature : <strong>{{nature_ceremonie}}</strong> – Date : <strong>{{date_ceremonie}}</strong>.</p>
<h2>Article 2 – Budget</h2>
<p>Budget alloué : <strong>{{budget_alloue}} FCFA</strong>.</p>
<h2>Article 3 – Obligations</h2>
<p>Le prestataire respecte scrupuleusement les règles protocolaires de l'État et les instructions du service du protocole.</p>
<p>Fait à Abidjan</p>
<p>L'Autorité : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'rp_traduction_officielle',
    name: "Contrat de service de traduction officielle",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Contrat pour la traduction certifiée de documents officiels par un traducteur assermenté.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'nom_traducteur', label: "Nom du traducteur / cabinet", type: 'text', required: true },
      { key: 'langue_source', label: "Langue source", type: 'text', required: true },
      { key: 'langue_cible', label: "Langue cible", type: 'text', required: true },
      { key: 'tarif_page', label: "Tarif par page normalisée (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE TRADUCTION OFFICIELLE</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_traducteur}}</strong> :</p>
<h2>Article 1 – Langues</h2>
<p>Traduction du <strong>{{langue_source}}</strong> vers le <strong>{{langue_cible}}</strong>.</p>
<h2>Article 2 – Tarification</h2>
<p>Tarif : <strong>{{tarif_page}} FCFA par page normalisée</strong> (250 mots).</p>
<h2>Article 3 – Certification</h2>
<p>Le traducteur appose sa signature et son cachet sur chaque document traduit, attestant de la fidélité de la traduction.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; Le Traducteur : _____________________</p></div>`,
  },

  {
    code: 'rp_interpretation_conference',
    name: "Accord de service d'interprétation de conférence",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Accord pour la fourniture d'un service d'interprétation simultanée ou consécutive lors d'une conférence.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client / organisateur", type: 'text', required: true },
      { key: 'nom_cabinet', label: "Nom du cabinet d'interprétation", type: 'text', required: true },
      { key: 'langues_interpretees', label: "Langues d'interprétation", type: 'text', required: true },
      { key: 'date_conference', label: "Date de la conférence", type: 'date', required: true },
      { key: 'cout_journalier', label: "Coût journalier par interprète (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INTERPRÉTATION DE CONFÉRENCE</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_cabinet}}</strong> :</p>
<h2>Article 1 – Langues</h2>
<p>Interprétation : <strong>{{langues_interpretees}}</strong>.</p>
<h2>Article 2 – Tarification</h2>
<p>Coût journalier par interprète : <strong>{{cout_journalier}} FCFA</strong>.</p>
<h2>Article 3 – Matériel</h2>
<p>Le client met à disposition les cabines d'interprétation et l'équipement de sonorisation.</p>
<p>Fait à Abidjan, le {{date_conference}}</p>
<p>Le Client : _____________________ &nbsp;&nbsp; Le Cabinet : _____________________</p></div>`,
  },

  {
    code: 'rp_transcription_reunion',
    name: "Contrat de service de transcription de réunion",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 7000,
    description: "Contrat pour la transcription verbatim ou synthétique des débats et délibérations d'une réunion officielle.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 53,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'nom_transcripteur', label: "Nom du prestataire de transcription", type: 'text', required: true },
      { key: 'type_reunion', label: "Type de réunion (conseil d'administration, etc.)", type: 'text', required: true },
      { key: 'tarif_heure', label: "Tarif horaire d'enregistrement (FCFA)", type: 'text', required: true },
      { key: 'delai_livraison', label: "Délai de livraison du document transcrit (jours)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE TRANSCRIPTION DE RÉUNION</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_transcripteur}}</strong> :</p>
<h2>Article 1 – Mission</h2>
<p>Transcription des débats de <strong>{{type_reunion}}</strong>.</p>
<h2>Article 2 – Tarif</h2>
<p>Tarif : <strong>{{tarif_heure}} FCFA par heure</strong> d'enregistrement traité.</p>
<h2>Article 3 – Délai</h2>
<p>Livraison sous <strong>{{delai_livraison}} jours ouvrables</strong> après la réunion.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'rp_documentation_institutionnelle',
    name: "Accord de service de documentation institutionnelle",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Accord pour la production de documents institutionnels (brochures, dossiers de présentation, fiches).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'nom_institution', label: "Nom de l'institution", type: 'text', required: true },
      { key: 'nom_agence', label: "Nom de l'agence de communication", type: 'text', required: true },
      { key: 'types_documents', label: "Types de documents à produire", type: 'textarea', required: true },
      { key: 'budget_production', label: "Budget de production (FCFA)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DOCUMENTATION INSTITUTIONNELLE</h1>
<p>Entre <strong>{{nom_institution}}</strong> et <strong>{{nom_agence}}</strong> :</p>
<h2>Article 1 – Documents</h2>
<p>{{types_documents}}</p>
<h2>Article 2 – Budget</h2>
<p>Budget total : <strong>{{budget_production}} FCFA</strong>.</p>
<h2>Article 3 – Livraison</h2>
<p>Tous les documents seront livrés au plus tard le <strong>{{date_livraison}}</strong>.</p>
<p>Fait à Abidjan</p>
<p>L'Institution : _____________________ &nbsp;&nbsp; L'Agence : _____________________</p></div>`,
  },

  {
    code: 'rp_veille_mediatique',
    name: "Contrat de service de veille médiatique (monitoring)",
    category: 'commercial_financier',
    price: 4500,
    priceMax: 13000,
    description: "Contrat pour un service de surveillance et d'analyse des mentions médias d'une organisation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'nom_prestataire', label: "Nom du prestataire de veille", type: 'text', required: true },
      { key: 'mots_cles', label: "Mots-clés et sujets à surveiller", type: 'textarea', required: true },
      { key: 'abonnement_mensuel', label: "Abonnement mensuel (FCFA)", type: 'text', required: true },
      { key: 'frequence_rapport', label: "Fréquence du rapport de veille", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE VEILLE MÉDIATIQUE</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_prestataire}}</strong> :</p>
<h2>Article 1 – Périmètre</h2>
<p>Surveillance des mots-clés : <strong>{{mots_cles}}</strong>.</p>
<h2>Article 2 – Abonnement</h2>
<p>Abonnement mensuel : <strong>{{abonnement_mensuel}} FCFA</strong>.</p>
<h2>Article 3 – Rapports</h2>
<p>Fréquence de remise des rapports : <strong>{{frequence_rapport}}</strong>.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'rp_ereputation',
    name: "Accord de service de mesure de l'influence digitale (e-réputation)",
    category: 'commercial_financier',
    price: 5500,
    priceMax: 16000,
    description: "Accord pour l'analyse et la gestion de la réputation en ligne d'une organisation ou d'une personnalité.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'nom_agence_digitale', label: "Nom de l'agence digitale", type: 'text', required: true },
      { key: 'plateformes_surveillees', label: "Plateformes surveillées", type: 'text', required: true },
      { key: 'abonnement_mensuel', label: "Abonnement mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de service", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'E-RÉPUTATION</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_agence_digitale}}</strong> :</p>
<h2>Article 1 – Périmètre digital</h2>
<p>Surveillance des plateformes : <strong>{{plateformes_surveillees}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Analyse des mentions, score de sentiment, alertes temps réel et recommandations stratégiques.</p>
<h2>Article 3 – Abonnement</h2>
<p>Abonnement mensuel : <strong>{{abonnement_mensuel}} FCFA</strong> à compter du <strong>{{date_debut}}</strong>.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; L'Agence : _____________________</p></div>`,
  },

  {
    code: 'rp_rapport_campagne',
    name: "Rapport de campagne de communication",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10000,
    description: "Modèle de rapport d'évaluation des résultats d'une campagne de communication institutionnelle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'nom_organisation', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'nom_campagne', label: "Nom de la campagne", type: 'text', required: true },
      { key: 'periode', label: "Période de la campagne", type: 'text', required: true },
      { key: 'budget_investi', label: "Budget total investi (FCFA)", type: 'text', required: true },
      { key: 'resultats_cles', label: "Résultats clés obtenus", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CAMPAGNE DE COMMUNICATION</h1>
<h2>{{nom_campagne}} – {{nom_organisation}}</h2>
<h2>Période : {{periode}}</h2>
<h2>1. Budget</h2>
<p>Budget investi : <strong>{{budget_investi}} FCFA</strong>.</p>
<h2>2. Résultats clés</h2>
<p>{{resultats_cles}}</p>
<h2>3. Recommandations</h2>
<p>Sur la base des performances observées, des ajustements stratégiques sont proposés en annexe.</p>
<p>Rapport établi par le Service Communication</p></div>`,
  },

  {
    code: 'rp_plan_communication_annuel',
    name: "Plan de communication annuel institutionnel",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Document de planification des actions de communication d'une institution pour un exercice annuel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'nom_institution', label: "Nom de l'institution", type: 'text', required: true },
      { key: 'responsable_communication', label: "Nom du responsable communication", type: 'text', required: true },
      { key: 'annee_plan', label: "Année du plan", type: 'text', required: true },
      { key: 'budget_annuel', label: "Budget annuel de communication (FCFA)", type: 'text', required: true },
      { key: 'axes_prioritaires', label: "Axes prioritaires de communication", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE COMMUNICATION ANNUEL – {{nom_institution}}</h1>
<h2>Exercice : {{annee_plan}}</h2>
<h2>Responsable : {{responsable_communication}}</h2>
<h2>1. Budget</h2>
<p>Budget alloué : <strong>{{budget_annuel}} FCFA</strong>.</p>
<h2>2. Axes prioritaires</h2>
<p>{{axes_prioritaires}}</p>
<h2>3. Calendrier</h2>
<p>Le détail des actions, des supports et des responsables est présenté dans le tableau annexé.</p>
<p>Validé par la Direction Générale</p></div>`,
  },

  {
    code: 'rp_partenariat_media_institution',
    name: "Accord de partenariat média-institution publique",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 15000,
    description: "Accord de partenariat entre un média et une institution publique pour la couverture d'événements officiels.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'nom_institution', label: "Nom de l'institution publique", type: 'text', required: true },
      { key: 'nom_media', label: "Nom du média partenaire", type: 'text', required: true },
      { key: 'objet_partenariat', label: "Objet du partenariat", type: 'textarea', required: true },
      { key: 'contrepartie_media', label: "Contrepartie offerte au média", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du partenariat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT MÉDIA – INSTITUTION PUBLIQUE</h1>
<p>Entre <strong>{{nom_institution}}</strong> et <strong>{{nom_media}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>{{objet_partenariat}}</p>
<h2>Article 2 – Contreparties</h2>
<p>Le média bénéficiera de : <strong>{{contrepartie_media}}</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Partenariat effectif à compter du <strong>{{date_debut}}</strong>, pour une durée d'un an.</p>
<p>Fait à Abidjan</p>
<p>L'Institution : _____________________ &nbsp;&nbsp; Le Média : _____________________</p></div>`,
  },

  {
    code: 'rp_infographie_datavisualisation',
    name: "Contrat de service d'infographie et datavisualisation",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 12000,
    description: "Contrat pour la création de supports infographiques et de visualisations de données pour une institution.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_client', label: "Nom du client", type: 'text', required: true },
      { key: 'nom_studio', label: "Nom du studio de design", type: 'text', required: true },
      { key: 'description_supports', label: "Description des supports à créer", type: 'textarea', required: true },
      { key: 'tarif_support', label: "Tarif par support (FCFA)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'INFOGRAPHIE ET DATAVISUALISATION</h1>
<p>Entre <strong>{{nom_client}}</strong> et <strong>{{nom_studio}}</strong> :</p>
<h2>Article 1 – Supports</h2>
<p>{{description_supports}}</p>
<h2>Article 2 – Tarification</h2>
<p>Tarif par support produit : <strong>{{tarif_support}} FCFA</strong>.</p>
<h2>Article 3 – Livraison</h2>
<p>Supports livrés au plus tard le <strong>{{date_livraison}}</strong> en formats print et digital.</p>
<p>Fait à Abidjan</p>
<p>Le Client : _____________________ &nbsp;&nbsp; Le Studio : _____________________</p></div>`,
  },

  {
    code: 'rp_rapport_activite',
    name: "Accord de service de production de rapport d'activité",
    category: 'commercial_financier',
    price: 4500,
    priceMax: 13000,
    description: "Accord pour la rédaction, la mise en page et la production du rapport d'activité annuel d'une organisation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 56,
    fieldsJson: F([
      { key: 'nom_organisation', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'nom_prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'annee_activite', label: "Année d'activité concernée", type: 'text', required: true },
      { key: 'budget', label: "Budget de production (FCFA)", type: 'text', required: true },
      { key: 'date_remise', label: "Date de remise", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRODUCTION DE RAPPORT D'ACTIVITÉ</h1>
<p>Entre <strong>{{nom_organisation}}</strong> et <strong>{{nom_prestataire}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Production du rapport d'activité pour l'année <strong>{{annee_activite}}</strong>.</p>
<h2>Article 2 – Budget</h2>
<p>Budget alloué : <strong>{{budget}} FCFA</strong>.</p>
<h2>Article 3 – Remise</h2>
<p>Rapport remis le <strong>{{date_remise}}</strong> en versions imprimée et numérique.</p>
<p>Fait à Abidjan</p>
<p>L'Organisation : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'rp_newsletter_institutionnelle',
    name: "Contrat de service de newsletter institutionnelle",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Contrat pour la rédaction, la mise en page et l'envoi régulier d'une newsletter institutionnelle.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'nom_institution', label: "Nom de l'institution", type: 'text', required: true },
      { key: 'nom_prestataire', label: "Nom du prestataire éditorial", type: 'text', required: true },
      { key: 'frequence_envoi', label: "Fréquence d'envoi (hebdomadaire, mensuelle)", type: 'text', required: true },
      { key: 'cout_mensuel', label: "Coût mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_premier_envoi', label: "Date du premier envoi", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE NEWSLETTER INSTITUTIONNELLE</h1>
<p>Entre <strong>{{nom_institution}}</strong> et <strong>{{nom_prestataire}}</strong> :</p>
<h2>Article 1 – Mission</h2>
<p>Rédaction et diffusion d'une newsletter à fréquence <strong>{{frequence_envoi}}</strong>.</p>
<h2>Article 2 – Coût</h2>
<p>Coût mensuel : <strong>{{cout_mensuel}} FCFA</strong>.</p>
<h2>Article 3 – Premier envoi</h2>
<p>Date du premier envoi : <strong>{{date_premier_envoi}}</strong>.</p>
<p>Fait à Abidjan</p>
<p>L'Institution : _____________________ &nbsp;&nbsp; Le Prestataire : _____________________</p></div>`,
  },

  {
    code: 'rp_charte_communication_responsable',
    name: "Charte de communication responsable",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 7000,
    description: "Charte définissant les engagements d'une organisation en matière de communication éthique et responsable.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'nom_organisation', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'directeur_communication', label: "Nom du directeur de la communication", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE COMMUNICATION RESPONSABLE</h1>
<h2>{{nom_organisation}}</h2>
<p>Adoptée le <strong>{{date_adoption}}</strong> sous la responsabilité de <strong>{{directeur_communication}}</strong>.</p>
<h2>Engagement 1 – Transparence</h2>
<p>Toutes nos communications sont fondées sur des informations exactes et vérifiées.</p>
<h2>Engagement 2 – Respect des parties prenantes</h2>
<p>Nous respectons la dignité de toutes les personnes dans nos messages et supports.</p>
<h2>Engagement 3 – Sobriété numérique</h2>
<p>Nous limitons l'empreinte environnementale de nos communications digitales.</p>
<h2>Engagement 4 – Accessibilité</h2>
<p>Nos supports sont conçus pour être accessibles au plus grand nombre.</p>
<p>Le Directeur de la Communication : _____________________</p></div>`,
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
  console.log(`Batch 49b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
