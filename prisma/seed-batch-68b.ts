import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 MÉDIAS / PRESSE (media2_) ───────────────────────────────────────────
  {
    code: 'media2_journaliste_pigiste',
    name: "Contrat de journaliste pigiste",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat de collaboration entre un organe de presse et un journaliste pigiste rémunéré à la pige, conforme au droit ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_journaliste',label:"Nom du journaliste",type:'text',required:true},
      {key:'nom_media',label:"Nom de l organe de presse",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif_pige',label:"Tarif par pige (FCFA)",type:'text',required:true},
      {key:'rubriques',label:"Rubriques couvertes",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE JOURNALISTE PIGISTE</h1>
<p>Entre <strong>{{nom_media}}</strong> et <strong>{{nom_journaliste}}</strong>, journaliste pigiste.</p>
<h2>Article 1 – Objet</h2>
<p>Le présent contrat définit les conditions de collaboration pour la fourniture d articles et reportages journalistiques rémunérés à la pige.</p>
<h2>Article 2 – Rémunération</h2>
<p>Tarif par pige : <strong>{{tarif_pige}} FCFA</strong>. Les piges sont réglées dans les 30 jours suivant la publication.</p>
<h2>Article 3 – Rubriques</h2>
<p>{{rubriques}}</p>
<h2>Article 4 – Droits d auteur</h2>
<p>Le journaliste cède à l organe de presse les droits de première publication. Les droits secondaires sont régis par la loi n° 96-564 du 25 juillet 1996 et la BURIDA.</p>
<h2>Article 5 – Entrée en vigueur</h2>
<p>Le contrat prend effet le <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'media2_journaliste_salarie_cdi',
    name: "Contrat de journaliste salarié (CDI)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat à durée indéterminée pour journaliste professionnel salarié, conforme au Code du Travail ivoirien et à la Convention collective de la presse.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_journaliste',label:"Nom et prénoms du journaliste",type:'text',required:true},
      {key:'nom_media',label:"Dénomination de l organe de presse",type:'text',required:true},
      {key:'poste',label:"Intitulé du poste",type:'text',required:true},
      {key:'salaire',label:"Salaire brut mensuel (FCFA)",type:'text',required:true},
      {key:'date_embauche',label:"Date d embauche",type:'date',required:true},
      {key:'lieu_travail',label:"Lieu de travail principal",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE – JOURNALISTE SALARIÉ</h1>
<p>Entre <strong>{{nom_media}}</strong>, organe de presse, et <strong>{{nom_journaliste}}</strong>.</p>
<h2>Article 1 – Engagement</h2>
<p>{{nom_media}} engage {{nom_journaliste}} en qualité de <strong>{{poste}}</strong> à compter du <strong>{{date_embauche}}</strong>.</p>
<h2>Article 2 – Lieu de travail</h2>
<p>Lieu de travail : <strong>{{lieu_travail}}</strong>.</p>
<h2>Article 3 – Rémunération</h2>
<p>Salaire brut mensuel : <strong>{{salaire}} FCFA</strong>, soumis aux cotisations CNPS obligatoires.</p>
<h2>Article 4 – Clause de conscience</h2>
<p>Le journaliste bénéficie de la clause de conscience conformément à la législation ivoirienne sur la presse.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Code du Travail ivoirien – loi n° 2015-532 du 20 juillet 2015.</p></div>`
  },
  {
    code: 'media2_correspondant_regional',
    name: "Contrat de correspondant de presse régional",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Contrat encadrant la mission d un correspondant de presse en région, définissant sa zone géographique et sa rémunération forfaitaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_correspondant',label:"Nom du correspondant",type:'text',required:true},
      {key:'nom_media',label:"Nom de l organe de presse",type:'text',required:true},
      {key:'zone_geographique',label:"Zone géographique couverte",type:'text',required:true},
      {key:'forfait_mensuel',label:"Forfait mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CORRESPONDANT DE PRESSE RÉGIONAL</h1>
<p>Entre <strong>{{nom_media}}</strong> et <strong>{{nom_correspondant}}</strong>, correspondant régional.</p>
<h2>Article 1 – Zone de couverture</h2>
<p>Le correspondant couvre la zone : <strong>{{zone_geographique}}</strong>.</p>
<h2>Article 2 – Missions</h2>
<p>Il assure la collecte et la transmission d informations d actualité locale, d interviews et de reportages photo.</p>
<h2>Article 3 – Rémunération</h2>
<p>Forfait mensuel de <strong>{{forfait_mensuel}} FCFA</strong>, paiements supplémentaires pour reportages spéciaux selon accord.</p>
<h2>Article 4 – Matériel</h2>
<p>Le correspondant utilise son propre matériel. Les frais de déplacement dûment justifiés sont remboursés.</p>
<h2>Article 5 – Entrée en vigueur</h2>
<p>Date de début : <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'media2_cession_droits_burida',
    name: "Accord de cession de droits d auteur journalistique (BURIDA)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Convention de cession des droits patrimoniaux d une oeuvre journalistique gérée via la BURIDA, conforme à la loi ivoirienne sur la propriété intellectuelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_auteur',label:"Nom de l auteur",type:'text',required:true},
      {key:'nom_cessionnaire',label:"Nom du cessionnaire (organe de presse)",type:'text',required:true},
      {key:'titre_oeuvre',label:"Titre ou description de l oeuvre",type:'textarea',required:true},
      {key:'montant_cession',label:"Montant de cession (FCFA)",type:'text',required:true},
      {key:'date_cession',label:"Date de cession",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE DROITS D AUTEUR JOURNALISTIQUE</h1>
<p>Entre <strong>{{nom_auteur}}</strong> (Cédant) et <strong>{{nom_cessionnaire}}</strong> (Cessionnaire).</p>
<h2>Article 1 – Objet de la cession</h2>
<p>L auteur cède les droits patrimoniaux de l oeuvre suivante : <em>{{titre_oeuvre}}</em>.</p>
<h2>Article 2 – Étendue de la cession</h2>
<p>La cession porte sur le droit de reproduction, de représentation et de diffusion sur tout support.</p>
<h2>Article 3 – Contrepartie financière</h2>
<p>Montant de cession : <strong>{{montant_cession}} FCFA</strong>, versé à la signature.</p>
<h2>Article 4 – BURIDA</h2>
<p>Les parties reconnaissent la compétence de la BURIDA pour la gestion collective des droits résiduels conformément à la loi n° 96-564.</p>
<h2>Article 5 – Date</h2>
<p>Fait à Abidjan le <strong>{{date_cession}}</strong>.</p></div>`
  },
  {
    code: 'media2_regie_pub_presse_ecrite',
    name: "Accord de service de régie publicitaire (presse écrite)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Convention entre un journal et une régie publicitaire pour la commercialisation des espaces publicitaires en presse écrite.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_journal',label:"Nom du journal",type:'text',required:true},
      {key:'nom_regie',label:"Nom de la régie publicitaire",type:'text',required:true},
      {key:'taux_commission',label:"Taux de commission (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉGIE PUBLICITAIRE – PRESSE ÉCRITE</h1>
<p>Entre <strong>{{nom_journal}}</strong> (Éditeur) et <strong>{{nom_regie}}</strong> (Régie).</p>
<h2>Article 1 – Objet</h2>
<p>L Éditeur confie à la Régie la commercialisation exclusive de ses espaces publicitaires dans ses éditions imprimées.</p>
<h2>Article 2 – Commission</h2>
<p>La Régie perçoit une commission de <strong>{{taux_commission}}%</strong> sur le chiffre d affaires publicitaire hors taxes encaissé.</p>
<h2>Article 3 – Obligations de la Régie</h2>
<p>La Régie s engage à prospecter activement les annonceurs, à établir les devis et à assurer le suivi des encarts.</p>
<h2>Article 4 – Durée</h2>
<p>Contrat d une durée de <strong>{{duree_contrat}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'media2_regie_pub_radio',
    name: "Accord de service de régie publicitaire (radio)",
    category: 'commercial_financier', price: 5000, priceMax: 14000,
    description: "Convention de régie publicitaire pour une station de radio, définissant la commercialisation des spots et des émissions sponsorisées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_radio',label:"Nom de la station de radio",type:'text',required:true},
      {key:'nom_regie',label:"Nom de la régie publicitaire",type:'text',required:true},
      {key:'taux_commission',label:"Taux de commission (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'zone_diffusion',label:"Zone de diffusion",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉGIE PUBLICITAIRE – RADIO</h1>
<p>Entre <strong>{{nom_radio}}</strong> (Station) et <strong>{{nom_regie}}</strong> (Régie).</p>
<h2>Article 1 – Objet</h2>
<p>La Station confie à la Régie la commercialisation de ses espaces publicitaires antenne (spots, jingles, émissions sponsorisées).</p>
<h2>Article 2 – Zone de diffusion</h2>
<p>Zone couverte : <strong>{{zone_diffusion}}</strong>.</p>
<h2>Article 3 – Rémunération</h2>
<p>Commission de <strong>{{taux_commission}}%</strong> sur le CA publicitaire net encaissé, réglée mensuellement.</p>
<h2>Article 4 – Entrée en vigueur</h2>
<p>À compter du <strong>{{date_debut}}</strong>, pour une durée d un an renouvelable tacitement.</p></div>`
  },
  {
    code: 'media2_regie_pub_tv',
    name: "Accord de service de régie publicitaire (TV)",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Convention de régie publicitaire pour une chaîne de télévision, couvrant spots, parrainage d émissions et placement de produit.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_chaine',label:"Nom de la chaîne TV",type:'text',required:true},
      {key:'nom_regie',label:"Nom de la régie publicitaire",type:'text',required:true},
      {key:'taux_commission',label:"Taux de commission (%)",type:'text',required:true},
      {key:'objectif_ca',label:"Objectif de CA annuel (FCFA)",type:'text',required:false},
      {key:'date_debut',label:"Date de prise d effet",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉGIE PUBLICITAIRE – TÉLÉVISION</h1>
<p>Entre <strong>{{nom_chaine}}</strong> (Diffuseur) et <strong>{{nom_regie}}</strong> (Régie).</p>
<h2>Article 1 – Périmètre</h2>
<p>La Régie commercialise les espaces publicitaires télévisés : spots, parrainages, habillages, placement de produit.</p>
<h2>Article 2 – Objectif commercial</h2>
<p>Objectif de chiffre d affaires annuel : <strong>{{objectif_ca}} FCFA</strong>.</p>
<h2>Article 3 – Commission</h2>
<p>La Régie perçoit <strong>{{taux_commission}}%</strong> sur les recettes publicitaires nettes encaissées.</p>
<h2>Article 4 – Prise d effet</h2>
<p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'media2_regie_pub_digital',
    name: "Accord de service de régie publicitaire (digital/web)",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Convention de régie publicitaire digitale pour site web ou application mobile, incluant bannières, native advertising et newsletters sponsorisées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_editeur',label:"Nom de l éditeur numérique",type:'text',required:true},
      {key:'nom_regie',label:"Nom de la régie digitale",type:'text',required:true},
      {key:'url_plateforme',label:"URL de la plateforme",type:'text',required:true},
      {key:'taux_commission',label:"Taux de commission (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉGIE PUBLICITAIRE DIGITALE</h1>
<p>Entre <strong>{{nom_editeur}}</strong> (Éditeur) et <strong>{{nom_regie}}</strong> (Régie).</p>
<h2>Article 1 – Périmètre digital</h2>
<p>La Régie commercialise les espaces publicitaires de la plateforme : <strong>{{url_plateforme}}</strong> (bannières display, native ads, newsletters, vidéo pre-roll).</p>
<h2>Article 2 – Commission</h2>
<p>Commission de <strong>{{taux_commission}}%</strong> sur le chiffre d affaires net. Les reportings de performance sont fournis mensuellement.</p>
<h2>Article 3 – Mesure d audience</h2>
<p>Les parties conviennent d utiliser un outil de mesure d audience certifié (Google Analytics ou équivalent).</p>
<h2>Article 4 – Prise d effet</h2>
<p>À compter du <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'media2_production_radiophonique',
    name: "Accord de service de production radiophonique",
    category: 'commercial_financier', price: 4000, priceMax: 11000,
    description: "Contrat de prestation entre un producteur indépendant et une station de radio pour la production d émissions, magazines ou podcasts radio.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_producteur',label:"Nom du producteur",type:'text',required:true},
      {key:'nom_radio',label:"Nom de la station de radio",type:'text',required:true},
      {key:'titre_emission',label:"Titre de l émission",type:'text',required:true},
      {key:'frequence',label:"Fréquence de diffusion",type:'text',required:true},
      {key:'budget_production',label:"Budget de production (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION RADIOPHONIQUE</h1>
<p>Entre <strong>{{nom_producteur}}</strong> (Producteur) et <strong>{{nom_radio}}</strong> (Diffuseur).</p>
<h2>Article 1 – Objet</h2>
<p>Le Producteur s engage à réaliser l émission intitulée <em>{{titre_emission}}</em>, diffusée <strong>{{frequence}}</strong>.</p>
<h2>Article 2 – Budget</h2>
<p>Budget de production convenu : <strong>{{budget_production}} FCFA</strong>, versé selon l échéancier annexé.</p>
<h2>Article 3 – Droits de diffusion</h2>
<p>Le Diffuseur bénéficie des droits exclusifs de diffusion antenne et replay pendant la durée du contrat.</p>
<h2>Article 4 – Propriété intellectuelle</h2>
<p>Les éléments originaux créés restent la propriété du Producteur, sous licence accordée au Diffuseur.</p></div>`
  },
  {
    code: 'media2_production_televisuelle',
    name: "Accord de service de production télévisuelle",
    category: 'commercial_financier', price: 7000, priceMax: 20000,
    description: "Convention de coproduction ou de prestation entre un producteur audiovisuel et une chaîne de télévision pour la réalisation d un programme télévisé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_producteur',label:"Nom de la société de production",type:'text',required:true},
      {key:'nom_chaine',label:"Nom de la chaîne TV",type:'text',required:true},
      {key:'titre_programme',label:"Titre du programme",type:'text',required:true},
      {key:'nb_episodes',label:"Nombre d épisodes",type:'text',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison du premier épisode",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION TÉLÉVISUELLE</h1>
<p>Entre <strong>{{nom_producteur}}</strong> (Producteur) et <strong>{{nom_chaine}}</strong> (Diffuseur).</p>
<h2>Article 1 – Programme</h2>
<p>Le Producteur s engage à réaliser <strong>{{nb_episodes}}</strong> épisode(s) du programme <em>{{titre_programme}}</em>.</p>
<h2>Article 2 – Budget</h2>
<p>Budget total : <strong>{{budget_total}} FCFA</strong>, versé en trois tranches : 40% à la signature, 40% à la livraison du pilote, 20% à la livraison finale.</p>
<h2>Article 3 – Livraison</h2>
<p>Premier épisode livré au plus tard le <strong>{{date_livraison}}</strong>.</p>
<h2>Article 4 – Droits</h2>
<p>Le Diffuseur acquiert les droits de diffusion exclusifs sur le territoire national pour trois ans.</p></div>`
  },
  {
    code: 'media2_podcast_professionnel',
    name: "Accord de service de podcast professionnel",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Contrat de création et de distribution d un podcast professionnel entre un créateur de contenu et une marque ou un éditeur média.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_createur',label:"Nom du créateur de podcast",type:'text',required:true},
      {key:'nom_commanditaire',label:"Nom du commanditaire",type:'text',required:true},
      {key:'titre_podcast',label:"Titre du podcast",type:'text',required:true},
      {key:'nb_episodes',label:"Nombre d épisodes commandés",type:'text',required:true},
      {key:'remuneration_episode',label:"Rémunération par épisode (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PODCAST PROFESSIONNEL</h1>
<p>Entre <strong>{{nom_createur}}</strong> (Créateur) et <strong>{{nom_commanditaire}}</strong> (Commanditaire).</p>
<h2>Article 1 – Objet</h2>
<p>Le Créateur produit <strong>{{nb_episodes}}</strong> épisodes du podcast intitulé <em>{{titre_podcast}}</em>.</p>
<h2>Article 2 – Rémunération</h2>
<p>Chaque épisode livré et validé est rémunéré <strong>{{remuneration_episode}} FCFA</strong>.</p>
<h2>Article 3 – Distribution</h2>
<p>Le podcast est distribué sur les principales plateformes de streaming audio (Spotify, Deezer, Apple Podcasts et équivalents africains).</p>
<h2>Article 4 – Droits</h2>
<p>Le Commanditaire bénéficie d une licence de diffusion non exclusive. Les droits moraux restent au Créateur.</p></div>`
  },
  {
    code: 'media2_web_tv_livestreaming',
    name: "Accord de service de web TV et live streaming",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Convention entre un opérateur de web TV ou de diffusion live et un client institutionnel ou éditeur pour la retransmission en ligne d événements.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_operateur',label:"Nom de l opérateur web TV",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'description_evenement',label:"Description de l événement à diffuser",type:'textarea',required:true},
      {key:'date_diffusion',label:"Date de diffusion",type:'date',required:true},
      {key:'montant_prestation',label:"Montant de la prestation (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE WEB TV ET LIVE STREAMING</h1>
<p>Entre <strong>{{nom_operateur}}</strong> (Prestataire) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Prestation</h2>
<p>Le Prestataire assure la retransmission en direct de : <em>{{description_evenement}}</em>, le <strong>{{date_diffusion}}</strong>.</p>
<h2>Article 2 – Technique</h2>
<p>La diffusion est assurée en HD sur les plateformes convenues, avec rediffusion disponible 72h après l événement.</p>
<h2>Article 3 – Rémunération</h2>
<p>Montant forfaitaire : <strong>{{montant_prestation}} FCFA</strong>, dont 50% versés à la commande.</p>
<h2>Article 4 – Responsabilité</h2>
<p>Le Prestataire n est pas responsable des coupures liées aux infrastructures télécom nationales.</p></div>`
  },
  {
    code: 'media2_partenariat_editorial',
    name: "Accord de partenariat éditorial (co-production de contenu)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Convention de co-production éditoriale entre deux médias ou entre un média et une organisation pour la création de contenus communs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_partenaire1',label:"Nom du premier partenaire",type:'text',required:true},
      {key:'nom_partenaire2',label:"Nom du second partenaire",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat éditorial",type:'textarea',required:true},
      {key:'duree',label:"Durée du partenariat",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ÉDITORIAL</h1>
<p>Entre <strong>{{nom_partenaire1}}</strong> et <strong>{{nom_partenaire2}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Les parties s associent pour la co-production éditoriale suivante : <em>{{objet_partenariat}}</em>.</p>
<h2>Article 2 – Contributions</h2>
<p>Chaque partie apporte ses ressources humaines, techniques et éditoriales selon les modalités définies en annexe.</p>
<h2>Article 3 – Propriété des contenus</h2>
<p>Les contenus co-produits sont la propriété conjointe des parties. Toute exploitation commerciale tiers requiert l accord des deux parties.</p>
<h2>Article 4 – Durée</h2>
<p>Partenariat d une durée de <strong>{{duree}}</strong> à compter du <strong>{{date_signature}}</strong>.</p></div>`
  },
  {
    code: 'media2_licence_audiovisuel',
    name: "Accord de licence de contenu audiovisuel",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Convention de licence pour l exploitation d un contenu audiovisuel (film, documentaire, série) sur un territoire donné et pour une durée définie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_cédant',label:"Nom du cédant (détenteur des droits)",type:'text',required:true},
      {key:'nom_licencie',label:"Nom du licencié",type:'text',required:true},
      {key:'titre_contenu',label:"Titre du contenu audiovisuel",type:'text',required:true},
      {key:'territoire',label:"Territoire de licence",type:'text',required:true},
      {key:'montant_licence',label:"Montant de la licence (FCFA)",type:'text',required:true},
      {key:'duree_licence',label:"Durée de la licence",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE CONTENU AUDIOVISUEL</h1>
<p>Entre <strong>{{nom_cédant}}</strong> (Cédant) et <strong>{{nom_licencie}}</strong> (Licencié).</p>
<h2>Article 1 – Objet</h2>
<p>Le Cédant accorde au Licencié une licence non exclusive d exploitation du contenu : <em>{{titre_contenu}}</em>.</p>
<h2>Article 2 – Territoire et durée</h2>
<p>Territoire : <strong>{{territoire}}</strong>. Durée : <strong>{{duree_licence}}</strong>.</p>
<h2>Article 3 – Redevance</h2>
<p>Montant de la licence : <strong>{{montant_licence}} FCFA</strong>, payable à la signature.</p>
<h2>Article 4 – Droits cédés</h2>
<p>Droits de diffusion linéaire, non linéaire (VOD, SVOD), et rediffusion dans le territoire défini.</p></div>`
  },
  {
    code: 'media2_distribution_journal',
    name: "Accord de distribution de journal national",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat entre un éditeur de presse écrite et un distributeur agréé pour la distribution physique du journal sur le territoire national.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_editeur',label:"Nom de l éditeur",type:'text',required:true},
      {key:'nom_distributeur',label:"Nom du distributeur",type:'text',required:true},
      {key:'zones_distribution',label:"Zones de distribution",type:'textarea',required:true},
      {key:'pourcentage_distribution',label:"Pourcentage de distribution (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION DE JOURNAL NATIONAL</h1>
<p>Entre <strong>{{nom_editeur}}</strong> (Éditeur) et <strong>{{nom_distributeur}}</strong> (Distributeur).</p>
<h2>Article 1 – Objet</h2>
<p>L Éditeur confie au Distributeur la distribution de ses publications dans les zones suivantes : <em>{{zones_distribution}}</em>.</p>
<h2>Article 2 – Rémunération</h2>
<p>Le Distributeur perçoit <strong>{{pourcentage_distribution}}%</strong> du prix de vente public hors taxes pour chaque exemplaire vendu.</p>
<h2>Article 3 – Invendus</h2>
<p>Les invendus sont retournés à l Éditeur dans les 72 heures suivant la date de péremption.</p>
<h2>Article 4 – Entrée en vigueur</h2>
<p>Le présent accord prend effet le <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'media2_agence_presse_contenu',
    name: "Accord de service d agence de presse (contenu AFP/AIP modèle)",
    category: 'commercial_financier', price: 5000, priceMax: 14000,
    description: "Convention d abonnement ou de fourniture de dépêches et contenus d une agence de presse à un organe de presse ou à une institution.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'nom_agence',label:"Nom de l agence de presse",type:'text',required:true},
      {key:'nom_client',label:"Nom du client abonné",type:'text',required:true},
      {key:'type_contenu',label:"Type de contenus souscrits",type:'textarea',required:true},
      {key:'abonnement_annuel',label:"Montant abonnement annuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début d abonnement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D AGENCE DE PRESSE</h1>
<p>Entre <strong>{{nom_agence}}</strong> (Agence) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Contenus fournis</h2>
<p>L Agence fournit au Client les contenus suivants : <em>{{type_contenu}}</em>.</p>
<h2>Article 2 – Abonnement</h2>
<p>Abonnement annuel : <strong>{{abonnement_annuel}} FCFA</strong>, payable en début d année.</p>
<h2>Article 3 – Utilisation</h2>
<p>Les contenus sont destinés exclusivement à un usage éditorial interne. Toute revente ou redistribution est interdite sans accord écrit.</p>
<h2>Article 4 – Prise d effet</h2>
<p>Abonnement actif à compter du <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'media2_archives_medias',
    name: "Accord de service d archives médias",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Convention d accès à des archives médias numérisées (photos, vidéos, enregistrements sonores) pour usage éditorial ou institutionnel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_fournisseur',label:"Nom du fournisseur d archives",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'type_archives',label:"Type d archives accessibles",type:'textarea',required:true},
      {key:'redevance_annuelle',label:"Redevance annuelle (FCFA)",type:'text',required:true},
      {key:'date_acces',label:"Date d ouverture de l accès",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D ARCHIVES MÉDIAS</h1>
<p>Entre <strong>{{nom_fournisseur}}</strong> (Fournisseur) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Accès aux archives</h2>
<p>Le Fournisseur ouvre au Client l accès à ses archives numérisées : <em>{{type_archives}}</em>.</p>
<h2>Article 2 – Redevance</h2>
<p>Redevance annuelle d accès : <strong>{{redevance_annuelle}} FCFA</strong>.</p>
<h2>Article 3 – Droits d utilisation</h2>
<p>Les archives sont utilisables à des fins éditoriales et de recherche uniquement. Les droits tiers (droits d auteur, droits à l image) restent à la charge du Client.</p>
<h2>Article 4 – Accès ouvert à compter du</h2>
<p><strong>{{date_acces}}</strong>.</p></div>`
  },
  {
    code: 'media2_traduction_contenu',
    name: "Accord de service de traduction de contenu médiatique",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Contrat de prestation de traduction de contenus journalistiques ou audiovisuels entre un média et un prestataire de traduction.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_prestataire',label:"Nom du prestataire de traduction",type:'text',required:true},
      {key:'nom_media',label:"Nom du média client",type:'text',required:true},
      {key:'langues',label:"Paires de langues (ex: français-anglais)",type:'text',required:true},
      {key:'tarif_mot',label:"Tarif au mot (FCFA)",type:'text',required:true},
      {key:'delai_livraison',label:"Délai de livraison standard",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRADUCTION DE CONTENU MÉDIATIQUE</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> (Traducteur) et <strong>{{nom_media}}</strong> (Média).</p>
<h2>Article 1 – Objet</h2>
<p>Le Traducteur assure la traduction de contenus journalistiques du Média pour les paires de langues : <strong>{{langues}}</strong>.</p>
<h2>Article 2 – Tarification</h2>
<p>Tarif : <strong>{{tarif_mot}} FCFA</strong> par mot source traduit.</p>
<h2>Article 3 – Délais</h2>
<p>Délai de livraison standard : <strong>{{delai_livraison}}</strong>. Des délais urgents font l objet d une majoration tarifaire de 30%.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Le Traducteur s engage à ne pas divulguer les contenus avant leur publication officielle.</p></div>`
  },
  {
    code: 'media2_relations_presse_rp',
    name: "Accord de service de relations presse et RP digitales",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Contrat de prestation entre une agence de relations presse et un client pour la gestion des relations médias et des RP digitales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_agence',label:"Nom de l agence RP",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'perimetre_missions',label:"Périmètre des missions",type:'textarea',required:true},
      {key:'retainer_mensuel',label:"Retainer mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RELATIONS PRESSE ET RP DIGITALES</h1>
<p>Entre <strong>{{nom_agence}}</strong> (Agence) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Missions</h2>
<p>L Agence prend en charge : <em>{{perimetre_missions}}</em>.</p>
<h2>Article 2 – Rémunération</h2>
<p>Retainer mensuel : <strong>{{retainer_mensuel}} FCFA</strong>, payable en début de mois.</p>
<h2>Article 3 – Reporting</h2>
<p>L Agence fournit un rapport mensuel de retombées presse avec valorisation des articles obtenus (équivalent achat espace).</p>
<h2>Article 4 – Prise d effet</h2>
<p>Mission débutant le <strong>{{date_debut}}</strong>, pour une durée minimale de six mois.</p></div>`
  },
  {
    code: 'media2_partenariat_brand_content',
    name: "Accord de partenariat média-annonceur (brand content)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Convention entre un organe de presse et une marque annonceur pour la production et la diffusion de contenus de marque (brand content / native advertising).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'nom_media',label:"Nom du média",type:'text',required:true},
      {key:'nom_annonceur',label:"Nom de l annonceur",type:'text',required:true},
      {key:'description_contenu',label:"Description du contenu de marque",type:'textarea',required:true},
      {key:'budget_total',label:"Budget total de l opération (FCFA)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT MÉDIA-ANNONCEUR – BRAND CONTENT</h1>
<p>Entre <strong>{{nom_media}}</strong> (Média) et <strong>{{nom_annonceur}}</strong> (Annonceur).</p>
<h2>Article 1 – Opération</h2>
<p>Description du contenu de marque : <em>{{description_contenu}}</em>.</p>
<h2>Article 2 – Budget</h2>
<p>Budget total de l opération : <strong>{{budget_total}} FCFA</strong>.</p>
<h2>Article 3 – Ligne éditoriale</h2>
<p>Le Média conserve son indépendance éditoriale. Le contenu sera clairement identifié comme publi-reportage conformément aux règles déontologiques.</p>
<h2>Article 4 – Lancement</h2>
<p>Publication prévue à compter du <strong>{{date_lancement}}</strong>.</p></div>`
  },
  {
    code: 'media2_fact_checking',
    name: "Accord de service de fact-checking et vérification",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Contrat de prestation entre un organe spécialisé en vérification des faits (fact-checking) et un média ou une institution.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_verificateur',label:"Nom de l organisme vérificateur",type:'text',required:true},
      {key:'nom_client',label:"Nom du média ou client",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de vérification",type:'textarea',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FACT-CHECKING ET VÉRIFICATION</h1>
<p>Entre <strong>{{nom_verificateur}}</strong> (Vérificateur) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Périmètre</h2>
<p>Le Vérificateur assure la vérification factuelle des contenus suivants : <em>{{perimetre}}</em>.</p>
<h2>Article 2 – Méthodologie</h2>
<p>La vérification est conduite selon les standards de l IFCN (International Fact-Checking Network) et documentée avec sources primaires.</p>
<h2>Article 3 – Tarif</h2>
<p>Tarif mensuel forfaitaire : <strong>{{tarif_mensuel}} FCFA</strong>.</p>
<h2>Article 4 – Indépendance</h2>
<p>Le Vérificateur opère en toute indépendance éditoriale. Le Client ne peut pas modifier les conclusions de vérification.</p>
<h2>Article 5 – Prise d effet</h2>
<p>À compter du <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'media2_rapport_performance',
    name: "Rapport de performance médias (audience, reach)",
    category: 'commercial_financier', price: 2500, priceMax: 7000,
    description: "Document structuré de reporting des performances d un organe de presse ou d une campagne média (audience, reach, engagement).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_media',label:"Nom du média",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte",type:'text',required:true},
      {key:'audience_totale',label:"Audience totale (chiffre)",type:'text',required:true},
      {key:'reach_digital',label:"Reach digital (impressions)",type:'text',required:false},
      {key:'faits_marquants',label:"Faits marquants de la période",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE MÉDIAS</h1>
<h2>Période : {{periode_rapport}}</h2>
<p>Organe de presse : <strong>{{nom_media}}</strong>.</p>
<h2>1. Audience</h2>
<p>Audience totale cumulée : <strong>{{audience_totale}}</strong>.</p>
<h2>2. Performance digitale</h2>
<p>Reach digital (impressions) : <strong>{{reach_digital}}</strong>.</p>
<h2>3. Faits marquants</h2>
<p>{{faits_marquants}}</p>
<h2>4. Recommandations</h2>
<p>Sur la base des indicateurs de la période, les équipes éditoriales et commerciales proposeront des axes d amélioration lors de la prochaine réunion de direction.</p></div>`
  },
  {
    code: 'media2_plan_numerique_journal',
    name: "Plan de développement numérique d un journal",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Document stratégique définissant la feuille de route de transition numérique d un journal imprimé vers le digital.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_journal',label:"Nom du journal",type:'text',required:true},
      {key:'responsable_projet',label:"Responsable du projet digital",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (ex: 2025-2027)",type:'text',required:true},
      {key:'objectifs_strategiques',label:"Objectifs stratégiques",type:'textarea',required:true},
      {key:'budget_transformation',label:"Budget de transformation (FCFA)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT NUMÉRIQUE</h1>
<h2>{{nom_journal}} – Horizon {{horizon_plan}}</h2>
<p>Responsable du projet : <strong>{{responsable_projet}}</strong>.</p>
<h2>1. Diagnostic</h2>
<p>Analyse de la situation actuelle en termes d audience numérique, de revenus digitaux et de compétences internes.</p>
<h2>2. Objectifs stratégiques</h2>
<p>{{objectifs_strategiques}}</p>
<h2>3. Axes de transformation</h2>
<p>Refonte du site web, développement d une application mobile, mise en place d un paywall, développement des réseaux sociaux.</p>
<h2>4. Budget</h2>
<p>Budget de transformation alloué : <strong>{{budget_transformation}} FCFA</strong>.</p>
<h2>5. Gouvernance</h2>
<p>Un comité de pilotage numérique se réunit mensuellement pour suivre l avancement du plan.</p></div>`
  },
  {
    code: 'media2_financement_media_independant',
    name: "Accord de financement de média indépendant",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Convention entre un bailleur de fonds (fondation, institution internationale, investisseur) et un média indépendant pour un financement structuré.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_bailleur',label:"Nom du bailleur de fonds",type:'text',required:true},
      {key:'nom_media',label:"Nom du média bénéficiaire",type:'text',required:true},
      {key:'montant_financement',label:"Montant du financement (FCFA)",type:'text',required:true},
      {key:'objet_financement',label:"Objet du financement",type:'textarea',required:true},
      {key:'date_versement',label:"Date de versement prévu",type:'date',required:true},
      {key:'duree_projet',label:"Durée du projet financé",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT DE MÉDIA INDÉPENDANT</h1>
<p>Entre <strong>{{nom_bailleur}}</strong> (Bailleur) et <strong>{{nom_media}}</strong> (Bénéficiaire).</p>
<h2>Article 1 – Objet du financement</h2>
<p>{{objet_financement}}</p>
<h2>Article 2 – Montant</h2>
<p>Montant total du financement : <strong>{{montant_financement}} FCFA</strong>, versé selon l échéancier annexé.</p>
<h2>Article 3 – Premier versement</h2>
<p>Date du premier versement : <strong>{{date_versement}}</strong>.</p>
<h2>Article 4 – Durée et rapportage</h2>
<p>Projet d une durée de <strong>{{duree_projet}}</strong>. Le Bénéficiaire fournit un rapport narratif et financier trimestriel.</p>
<h2>Article 5 – Indépendance éditoriale</h2>
<p>Le Bailleur ne peut exercer aucune influence sur la ligne éditoriale du Bénéficiaire.</p></div>`
  },
  {
    code: 'media2_charte_deontologie',
    name: "Charte de déontologie journalistique en Afrique",
    category: 'commercial_financier', price: 2000, priceMax: 6000,
    description: "Charte interne définissant les principes déontologiques applicables aux journalistes d un organe de presse en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_media',label:"Nom de l organe de presse",type:'text',required:true},
      {key:'directeur_publication',label:"Directeur de publication",type:'text',required:true},
      {key:'date_adoption',label:"Date d adoption de la charte",type:'date',required:true},
      {key:'valeurs_fondamentales',label:"Valeurs fondamentales",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>CHARTE DE DÉONTOLOGIE JOURNALISTIQUE</h1>
<h2>{{nom_media}}</h2>
<p>Adoptée le <strong>{{date_adoption}}</strong> sous l autorité de <strong>{{directeur_publication}}</strong>, Directeur de publication.</p>
<h2>1. Vérité et exactitude</h2>
<p>Tout journaliste s engage à vérifier les informations avant publication auprès de sources multiples et fiables.</p>
<h2>2. Indépendance</h2>
<p>Aucun journaliste ne peut recevoir d avantage en nature ou en espèces pouvant compromettre son indépendance.</p>
<h2>3. Équité</h2>
<p>Le droit de réponse est accordé à toute personne mise en cause conformément à la législation ivoirienne sur la presse.</p>
<h2>4. Valeurs fondamentales</h2>
<p>{{valeurs_fondamentales}}</p>
<h2>5. Sanctions</h2>
<p>Tout manquement à la présente charte est soumis au Comité d éthique interne et peut donner lieu à des sanctions disciplinaires.</p></div>`
  },

  // ─── 25 COMMUNICATION INSTITUTIONNELLE / RP (comm_) ────────────────────────
  {
    code: 'comm_conseil_communication',
    name: "Accord de service de conseil en communication (agence)",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat de prestation entre une agence de communication et un client pour des missions de conseil stratégique en communication.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_agence',label:"Nom de l agence de communication",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'perimetre_conseil',label:"Périmètre des missions de conseil",type:'textarea',required:true},
      {key:'retainer_mensuel',label:"Retainer mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN COMMUNICATION</h1>
<p>Entre <strong>{{nom_agence}}</strong> (Agence) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Missions</h2>
<p>L Agence assure les missions de conseil suivantes : <em>{{perimetre_conseil}}</em>.</p>
<h2>Article 2 – Rémunération</h2>
<p>Retainer mensuel : <strong>{{retainer_mensuel}} FCFA</strong>, payable en début de chaque mois.</p>
<h2>Article 3 – Reporting</h2>
<p>Un rapport d activité mensuel est remis au Client dans les cinq premiers jours ouvrés du mois suivant.</p>
<h2>Article 4 – Confidentialité</h2>
<p>L Agence s engage à maintenir la stricte confidentialité des informations stratégiques du Client.</p>
<h2>Article 5 – Prise d effet</h2>
<p>Mission débutant le <strong>{{date_debut}}</strong>, pour une durée minimale de douze mois.</p></div>`
  },
  {
    code: 'comm_strategie_entreprise',
    name: "Accord de service de stratégie de communication d entreprise",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat pour l élaboration d une stratégie globale de communication d entreprise incluant audit, positionnement et plan d action.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'nom_entreprise',label:"Nom de l entreprise cliente",type:'text',required:true},
      {key:'livrables',label:"Livrables attendus",type:'textarea',required:true},
      {key:'montant_mission',label:"Montant total de la mission (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'delai_livraison',label:"Délai de livraison de la stratégie",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – STRATÉGIE DE COMMUNICATION D ENTREPRISE</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> (Prestataire) et <strong>{{nom_entreprise}}</strong> (Client).</p>
<h2>Article 1 – Livrables</h2>
<p>{{livrables}}</p>
<h2>Article 2 – Montant</h2>
<p>Montant total : <strong>{{montant_mission}} FCFA</strong>, payable en deux tranches égales (50% à la commande, 50% à la livraison).</p>
<h2>Article 3 – Délai</h2>
<p>Stratégie finalisée sous <strong>{{delai_livraison}}</strong> à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Article 4 – Propriété</h2>
<p>La stratégie livrée est la propriété exclusive du Client à compter du paiement intégral.</p></div>`
  },
  {
    code: 'comm_community_management',
    name: "Accord de service de gestion des réseaux sociaux (community management)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat de community management pour la gestion des comptes de réseaux sociaux d une entreprise ou institution.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'nom_prestataire',label:"Nom du community manager / agence",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'reseaux_geres',label:"Réseaux sociaux gérés",type:'text',required:true},
      {key:'nb_publications_mois',label:"Nombre de publications par mois",type:'text',required:true},
      {key:'forfait_mensuel',label:"Forfait mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMMUNITY MANAGEMENT</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> (Prestataire) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Périmètre</h2>
<p>Réseaux sociaux gérés : <strong>{{reseaux_geres}}</strong>. Volume : <strong>{{nb_publications_mois}}</strong> publications par mois.</p>
<h2>Article 2 – Prestations incluses</h2>
<p>Création de contenu, planification, modération des commentaires, reporting mensuel de performance (reach, engagement, abonnés).</p>
<h2>Article 3 – Forfait</h2>
<p>Forfait mensuel : <strong>{{forfait_mensuel}} FCFA</strong>, payable le 1er de chaque mois.</p>
<h2>Article 4 – Prise d effet</h2>
<p>À compter du <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'comm_copywriting',
    name: "Accord de service de création de contenu (copywriting)",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Contrat de prestation rédactionnelle pour la création de contenus textuels (site web, blog, brochures) par un copywriter freelance ou une agence.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'nom_redacteur',label:"Nom du rédacteur / agence",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'types_contenus',label:"Types de contenus commandés",type:'textarea',required:true},
      {key:'tarif_unitaire',label:"Tarif unitaire par article (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la collaboration",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CRÉATION DE CONTENU – COPYWRITING</h1>
<p>Entre <strong>{{nom_redacteur}}</strong> (Rédacteur) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Contenus</h2>
<p>Types de contenus : <em>{{types_contenus}}</em>.</p>
<h2>Article 2 – Tarif</h2>
<p>Tarif unitaire par contenu : <strong>{{tarif_unitaire}} FCFA</strong>. Les révisions mineures (jusqu à deux aller-retours) sont incluses.</p>
<h2>Article 3 – Délais</h2>
<p>Délai de livraison standard : cinq jours ouvrés après la validation du brief client.</p>
<h2>Article 4 – Droits</h2>
<p>À la réception du paiement intégral, le Client acquiert la pleine propriété des contenus livrés.</p>
<h2>Article 5 – Prise d effet</h2>
<p>Collaboration débutant le <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'comm_seo_referencement',
    name: "Accord de service de SEO et référencement naturel",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Contrat de prestation SEO entre une agence de référencement et un client pour l optimisation de sa présence organique sur les moteurs de recherche.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'nom_agence',label:"Nom de l agence SEO",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'url_site',label:"URL du site à optimiser",type:'text',required:true},
      {key:'retainer_mensuel',label:"Retainer mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
      {key:'kpis',label:"KPIs de suivi convenus",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SEO ET RÉFÉRENCEMENT NATUREL</h1>
<p>Entre <strong>{{nom_agence}}</strong> (Agence SEO) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Site concerné</h2>
<p>Site à optimiser : <strong>{{url_site}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Audit technique SEO, optimisation on-page, stratégie de netlinking, création de contenus optimisés, reporting mensuel.</p>
<h2>Article 3 – KPIs</h2>
<p>{{kpis}}</p>
<h2>Article 4 – Rémunération</h2>
<p>Retainer mensuel : <strong>{{retainer_mensuel}} FCFA</strong>.</p>
<h2>Article 5 – Prise d effet</h2>
<p>Mission débutant le <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'comm_pub_digitale',
    name: "Accord de service de publicité digitale (Google Ads, Meta Ads)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat de gestion de campagnes de publicité digitale payante (Google Ads, Meta Ads, TikTok Ads) pour le compte d un annonceur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_agence',label:"Nom de l agence media buying",type:'text',required:true},
      {key:'nom_annonceur',label:"Nom de l annonceur",type:'text',required:true},
      {key:'plateformes',label:"Plateformes publicitaires gérées",type:'text',required:true},
      {key:'budget_media_mensuel',label:"Budget média mensuel (FCFA)",type:'text',required:true},
      {key:'honoraires_gestion',label:"Honoraires de gestion (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des campagnes",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PUBLICITÉ DIGITALE</h1>
<p>Entre <strong>{{nom_agence}}</strong> (Agence) et <strong>{{nom_annonceur}}</strong> (Annonceur).</p>
<h2>Article 1 – Plateformes</h2>
<p>Plateformes gérées : <strong>{{plateformes}}</strong>.</p>
<h2>Article 2 – Budget</h2>
<p>Budget média mensuel alloué : <strong>{{budget_media_mensuel}} FCFA</strong>, géré directement sur les comptes publicitaires de l Annonceur.</p>
<h2>Article 3 – Honoraires</h2>
<p>Honoraires de gestion : <strong>{{honoraires_gestion}}%</strong> du budget média investi, facturés mensuellement.</p>
<h2>Article 4 – Reporting</h2>
<p>Rapport hebdomadaire de performance (impressions, clics, conversions, CPC, ROAS) fourni par l Agence.</p>
<h2>Article 5 – Prise d effet</h2>
<p>Campagnes démarrant le <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'comm_campagne_influence',
    name: "Accord de service de campagne d influence (influenceurs)",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat entre une marque ou agence et un créateur de contenu (influenceur) pour la réalisation d une campagne de marketing d influence.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      {key:'nom_annonceur',label:"Nom de l annonceur / agence",type:'text',required:true},
      {key:'nom_influenceur',label:"Nom de l influenceur",type:'text',required:true},
      {key:'reseaux',label:"Réseaux et comptes utilisés",type:'text',required:true},
      {key:'nb_publications',label:"Nombre de publications prévues",type:'text',required:true},
      {key:'remuneration',label:"Rémunération totale (FCFA)",type:'text',required:true},
      {key:'date_campagne',label:"Date de début de campagne",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CAMPAGNE D INFLUENCE</h1>
<p>Entre <strong>{{nom_annonceur}}</strong> (Annonceur) et <strong>{{nom_influenceur}}</strong> (Influenceur).</p>
<h2>Article 1 – Prestations</h2>
<p>L Influenceur publie <strong>{{nb_publications}}</strong> publication(s) sur : <strong>{{reseaux}}</strong>.</p>
<h2>Article 2 – Contenu</h2>
<p>Les contenus sont soumis à validation de l Annonceur avant publication. L Influenceur identifie clairement le caractère commercial du partenariat (#partenariat #sponsorisé).</p>
<h2>Article 3 – Rémunération</h2>
<p>Rémunération totale : <strong>{{remuneration}} FCFA</strong>, versée moitié à la signature et moitié à la validation des publications.</p>
<h2>Article 4 – Prise d effet</h2>
<p>Campagne débutant le <strong>{{date_campagne}}</strong>.</p></div>`
  },
  {
    code: 'comm_evenement_corporate',
    name: "Accord de service d organisation d événement corporate",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat entre un organisateur événementiel et une entreprise pour la planification et l exécution d un événement d entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_organisateur',label:"Nom de l organisateur",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'type_evenement',label:"Type d événement",type:'text',required:true},
      {key:'date_evenement',label:"Date de l événement",type:'date',required:true},
      {key:'lieu',label:"Lieu de l événement",type:'text',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D ORGANISATION D ÉVÉNEMENT CORPORATE</h1>
<p>Entre <strong>{{nom_organisateur}}</strong> (Organisateur) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Événement</h2>
<p>Type d événement : <strong>{{type_evenement}}</strong>, prévu le <strong>{{date_evenement}}</strong> à <strong>{{lieu}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>L Organisateur prend en charge : conception créative, logistique, traiteur, animation, gestion des intervenants et coordination technique.</p>
<h2>Article 3 – Budget</h2>
<p>Budget total : <strong>{{budget_total}} FCFA</strong>. Un dépassement de plus de 10% requiert l accord préalable écrit du Client.</p>
<h2>Article 4 – Annulation</h2>
<p>En cas d annulation par le Client moins de 30 jours avant l événement, 50% du budget est dû à l Organisateur.</p></div>`
  },
  {
    code: 'comm_rp_institutionnelles',
    name: "Accord de service de relations publiques institutionnelles",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat de relations publiques institutionnelles pour la gestion de l image et des parties prenantes d une organisation publique ou privée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_agence',label:"Nom de l agence RP",type:'text',required:true},
      {key:'nom_client',label:"Nom de l institution cliente",type:'text',required:true},
      {key:'missions',label:"Missions principales",type:'textarea',required:true},
      {key:'retainer_mensuel',label:"Retainer mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RELATIONS PUBLIQUES INSTITUTIONNELLES</h1>
<p>Entre <strong>{{nom_agence}}</strong> (Agence) et <strong>{{nom_client}}</strong> (Institution).</p>
<h2>Article 1 – Missions</h2>
<p>{{missions}}</p>
<h2>Article 2 – Rémunération</h2>
<p>Retainer mensuel : <strong>{{retainer_mensuel}} FCFA</strong>.</p>
<h2>Article 3 – Livrables</h2>
<p>Communiqués de presse, dossiers de presse, organisation de conférences de presse, rapport mensuel de retombées médiatiques.</p>
<h2>Article 4 – Accès</h2>
<p>L Institution fournit à l Agence les informations nécessaires à l exercice de ses missions dans des délais raisonnables.</p>
<h2>Article 5 – Prise d effet</h2>
<p>Mission débutant le <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'comm_communication_crise',
    name: "Accord de service de communication de crise",
    category: 'commercial_financier', price: 7000, priceMax: 20000,
    description: "Contrat de prestation de communication de crise pour accompagner une organisation confrontée à une situation exceptionnelle ou à un bad buzz.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_consultant',label:"Nom du consultant ou de l agence",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'nature_crise',label:"Nature de la crise (description succincte)",type:'textarea',required:true},
      {key:'honoraires_astreinte',label:"Honoraires d astreinte (FCFA/jour)",type:'text',required:true},
      {key:'date_mission',label:"Date de début de mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMMUNICATION DE CRISE</h1>
<p>Entre <strong>{{nom_consultant}}</strong> (Consultant) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Contexte</h2>
<p>{{nature_crise}}</p>
<h2>Article 2 – Missions urgentes</h2>
<p>Audit de la situation, définition du positionnement de crise, rédaction des prises de parole, formation porte-parole, monitoring médias 24/7, gestion des réseaux sociaux en crise.</p>
<h2>Article 3 – Honoraires</h2>
<p>Honoraires d astreinte : <strong>{{honoraires_astreinte}} FCFA</strong> par jour d intervention, facturés hebdomadairement.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Accord de confidentialité strict. Aucune information sur la mission ne peut être divulguée par le Consultant.</p>
<h2>Article 5 – Début de mission</h2>
<p><strong>{{date_mission}}</strong>.</p></div>`
  },
  {
    code: 'comm_e_reputation',
    name: "Accord de service de gestion de l e-réputation",
    category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Contrat pour la surveillance et l amélioration de la réputation en ligne d une entreprise ou d un dirigeant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'perimetre_surveillance',label:"Périmètre de surveillance (mots-clés, marques)",type:'textarea',required:true},
      {key:'forfait_mensuel',label:"Forfait mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE L E-RÉPUTATION</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> (Prestataire) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Périmètre de surveillance</h2>
<p>{{perimetre_surveillance}}</p>
<h2>Article 2 – Outils</h2>
<p>Veille médias et réseaux sociaux via outils certifiés (Google Alerts, Mention ou équivalent). Alertes en temps réel en cas de mention négative significative.</p>
<h2>Article 3 – Actions correctives</h2>
<p>En cas de contenu négatif, le Prestataire propose un plan d action dans les 24 heures (demande de retrait, réponse publique, contenu positif de compensation).</p>
<h2>Article 4 – Forfait</h2>
<p><strong>{{forfait_mensuel}} FCFA</strong> par mois, à compter du <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'comm_rapport_annuel',
    name: "Accord de service de production de rapport annuel d entreprise",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat pour la conception, la rédaction et la mise en page du rapport annuel d une entreprise ou institution.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_agence',label:"Nom de l agence de création",type:'text',required:true},
      {key:'nom_client',label:"Nom de l entreprise cliente",type:'text',required:true},
      {key:'exercice',label:"Exercice couvert (ex: 2025)",type:'text',required:true},
      {key:'nb_pages',label:"Nombre de pages prévues",type:'text',required:true},
      {key:'montant_mission',label:"Montant total de la mission (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison du BAT",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PRODUCTION DE RAPPORT ANNUEL</h1>
<p>Entre <strong>{{nom_agence}}</strong> (Agence) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Objet</h2>
<p>Production du rapport annuel <strong>{{exercice}}</strong> de {{nom_client}}, d environ <strong>{{nb_pages}}</strong> pages.</p>
<h2>Article 2 – Livrables</h2>
<p>Conception graphique, rédaction, traitement des données financières, mise en page, relecture et fichier PDF imprimable livré en BAT.</p>
<h2>Article 3 – Montant</h2>
<p>Montant total : <strong>{{montant_mission}} FCFA</strong>. Versement : 40% à la commande, 60% à la remise du BAT validé.</p>
<h2>Article 4 – Délai</h2>
<p>BAT livré au plus tard le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'comm_communication_financiere',
    name: "Accord de service de communication financière (cotées BRVM)",
    category: 'commercial_financier', price: 7000, priceMax: 20000,
    description: "Contrat de communication financière pour les sociétés cotées à la BRVM, couvrant les obligations légales de transparence et la relation investisseurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_agence',label:"Nom de l agence de communication financière",type:'text',required:true},
      {key:'nom_societe',label:"Raison sociale de l émetteur",type:'text',required:true},
      {key:'secteur_cotation',label:"Secteur de cotation BRVM",type:'text',required:true},
      {key:'retainer_annuel',label:"Retainer annuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de prise d effet",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMMUNICATION FINANCIÈRE</h1>
<p>Entre <strong>{{nom_agence}}</strong> (Agence) et <strong>{{nom_societe}}</strong>, société cotée à la BRVM dans le secteur <strong>{{secteur_cotation}}</strong>.</p>
<h2>Article 1 – Missions</h2>
<p>Rédaction et diffusion des communiqués de résultats, organisation des réunions investisseurs, préparation des documents d assemblée générale, conseil en communication RSE et ESG.</p>
<h2>Article 2 – Conformité BRVM</h2>
<p>L Agence assure la conformité des communications aux règles de l UEMOA et de la BRVM relatives à l information périodique des sociétés cotées.</p>
<h2>Article 3 – Rémunération</h2>
<p>Retainer annuel : <strong>{{retainer_annuel}} FCFA</strong>, payable trimestriellement.</p>
<h2>Article 4 – Prise d effet</h2>
<p>À compter du <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'comm_branding_identite',
    name: "Accord de service de branding et identité de marque",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat pour la création ou le repositionnement de l identité visuelle et de la marque d une entreprise (logo, charte graphique, brand guidelines).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'nom_agence',label:"Nom de l agence de design",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'livrables',label:"Livrables attendus",type:'textarea',required:true},
      {key:'montant_mission',label:"Montant total (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison finale",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BRANDING ET IDENTITÉ DE MARQUE</h1>
<p>Entre <strong>{{nom_agence}}</strong> (Agence) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Livrables</h2>
<p>{{livrables}}</p>
<h2>Article 2 – Processus créatif</h2>
<p>Trois propositions créatives seront soumises après le brief approfondi. Le Client dispose de deux cycles de révision inclus dans le budget.</p>
<h2>Article 3 – Montant et paiement</h2>
<p>Montant total : <strong>{{montant_mission}} FCFA</strong> — 50% à la commande, 50% à la livraison des fichiers sources définitifs.</p>
<h2>Article 4 – Cession de droits</h2>
<p>À règlement complet, l Agence cède au Client la pleine propriété des éléments créés et les fichiers sources.</p>
<h2>Article 5 – Livraison</h2>
<p>Livraison finale prévue le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'comm_naming_produit',
    name: "Accord de service de naming de produit ou société",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat pour la création d un nom de marque, de produit ou de société, incluant la vérification de disponibilité et le dépôt OAPI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_agence',label:"Nom de l agence de naming",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'type_naming',label:"Type de naming (produit, société, gamme)",type:'text',required:true},
      {key:'montant_mission',label:"Montant de la mission (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NAMING</h1>
<p>Entre <strong>{{nom_agence}}</strong> (Agence) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Objet</h2>
<p>Création d un nom de <strong>{{type_naming}}</strong> pour le Client.</p>
<h2>Article 2 – Processus</h2>
<p>Brief stratégique, génération de noms (minimum 10 propositions), vérification de disponibilité des domaines et de la marque à l OAPI, présentation finale avec recommandation motivée.</p>
<h2>Article 3 – Montant</h2>
<p>Montant forfaitaire : <strong>{{montant_mission}} FCFA</strong>. Les frais de dépôt de marque à l OAPI sont facturés séparément au coût réel.</p>
<h2>Article 4 – Prise d effet</h2>
<p>Mission débutant le <strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'comm_traduction_corporate',
    name: "Accord de service de traduction de documents corporate",
    category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Contrat de traduction de documents d entreprise (rapports, contrats, présentations) entre un prestataire agréé et un client corporate.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_traducteur',label:"Nom du prestataire de traduction",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'paires_langues',label:"Paires de langues",type:'text',required:true},
      {key:'tarif_mot',label:"Tarif au mot (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la collaboration",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRADUCTION DE DOCUMENTS CORPORATE</h1>
<p>Entre <strong>{{nom_traducteur}}</strong> (Prestataire) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Langues</h2>
<p>Paires de langues couvertes : <strong>{{paires_langues}}</strong>.</p>
<h2>Article 2 – Tarification</h2>
<p>Tarif : <strong>{{tarif_mot}} FCFA</strong> par mot source. Les traductions certifiées (légalisées) sont majorées de 30%.</p>
<h2>Article 3 – Délais</h2>
<p>Délai standard : trois jours ouvrés pour 1000 mots. Les missions urgentes font l objet d une majoration tarifaire.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Accord de non-divulgation intégré. Les documents traduits ne peuvent être utilisés comme références sans accord écrit du Client.</p>
<h2>Article 5 – Prise d effet</h2>
<p><strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'comm_video_institutionnelle',
    name: "Accord de service de production de vidéo institutionnelle",
    category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat pour la production d un film institutionnel ou d une vidéo de présentation d entreprise (corporate video).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'nom_producteur',label:"Nom de la société de production",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'description_video',label:"Description du projet vidéo",type:'textarea',required:true},
      {key:'duree_video',label:"Durée approximative de la vidéo",type:'text',required:true},
      {key:'budget_production',label:"Budget de production (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE VIDÉO INSTITUTIONNELLE</h1>
<p>Entre <strong>{{nom_producteur}}</strong> (Producteur) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Projet</h2>
<p>{{description_video}}</p>
<h2>Article 2 – Format</h2>
<p>Durée approximative : <strong>{{duree_video}}</strong>. Livraison en format 4K MP4 et formats optimisés réseaux sociaux.</p>
<h2>Article 3 – Budget</h2>
<p>Budget de production : <strong>{{budget_production}} FCFA</strong>. Paiement : 40% à la signature, 30% à la fin du tournage, 30% à la livraison finale.</p>
<h2>Article 4 – Révisions</h2>
<p>Deux cycles de révision inclus après la première version montée.</p>
<h2>Article 5 – Livraison</h2>
<p>Version finale livrée au plus tard le <strong>{{date_livraison}}</strong>.</p></div>`
  },
  {
    code: 'comm_photographie_corporate',
    name: "Accord de service de photographie corporate",
    category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Contrat pour une séance photo professionnelle en milieu d entreprise (portraits dirigeants, reportage d entreprise, photos produits).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_photographe',label:"Nom du photographe",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'type_seance',label:"Type de séance photo",type:'text',required:true},
      {key:'date_seance',label:"Date de la séance",type:'date',required:true},
      {key:'remuneration',label:"Rémunération (FCFA)",type:'text',required:true},
      {key:'nb_photos_livrees',label:"Nombre de photos retouchées livrées",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE CORPORATE</h1>
<p>Entre <strong>{{nom_photographe}}</strong> (Photographe) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Prestation</h2>
<p>Type de séance : <strong>{{type_seance}}</strong>, prévue le <strong>{{date_seance}}</strong>.</p>
<h2>Article 2 – Livrables</h2>
<p>Nombre de photos retouchées livrées : <strong>{{nb_photos_livrees}}</strong>, en haute résolution, dans les cinq jours ouvrés suivant la séance.</p>
<h2>Article 3 – Rémunération</h2>
<p>Rémunération forfaitaire : <strong>{{remuneration}} FCFA</strong>.</p>
<h2>Article 4 – Cession de droits</h2>
<p>Le Photographe cède au Client les droits d utilisation des photos à des fins internes et de communication commerciale. La mention du nom du Photographe est souhaitée mais non obligatoire.</p></div>`
  },
  {
    code: 'comm_communication_interne',
    name: "Accord de service de communication interne",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat pour la mise en place et la gestion d un dispositif de communication interne d entreprise (intranet, journal interne, affichage dynamique).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'nom_prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'nom_client',label:"Nom de l entreprise cliente",type:'text',required:true},
      {key:'dispositifs',label:"Dispositifs de communication interne mis en place",type:'textarea',required:true},
      {key:'forfait_mensuel',label:"Forfait mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMMUNICATION INTERNE</h1>
<p>Entre <strong>{{nom_prestataire}}</strong> (Prestataire) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Dispositifs</h2>
<p>{{dispositifs}}</p>
<h2>Article 2 – Prestations</h2>
<p>Création de contenus éditoriaux internes, animation de la plateforme intranet, production du journal interne mensuel, gestion des écrans d affichage dynamique.</p>
<h2>Article 3 – Forfait</h2>
<p>Forfait mensuel tout compris : <strong>{{forfait_mensuel}} FCFA</strong>.</p>
<h2>Article 4 – Prise d effet</h2>
<p><strong>{{date_debut}}</strong>.</p></div>`
  },
  {
    code: 'comm_seminaire_incentive',
    name: "Accord de service de séminaire et incentive",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat pour l organisation d un séminaire d entreprise ou d un voyage incentive, incluant hébergement, animation et logistique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_organisateur',label:"Nom de l organisateur",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'destination',label:"Destination du séminaire / incentive",type:'text',required:true},
      {key:'nb_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'date_evenement',label:"Date de l événement",type:'date',required:true},
      {key:'budget_par_personne',label:"Budget par personne (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉMINAIRE ET INCENTIVE</h1>
<p>Entre <strong>{{nom_organisateur}}</strong> (Organisateur) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Événement</h2>
<p>Destination : <strong>{{destination}}</strong> – <strong>{{nb_participants}}</strong> participants – Date : <strong>{{date_evenement}}</strong>.</p>
<h2>Article 2 – Prestations incluses</h2>
<p>Transport, hébergement, restauration, animation d équipe, soirée de gala, transferts et assistance sur place.</p>
<h2>Article 3 – Budget</h2>
<p>Budget par personne : <strong>{{budget_par_personne}} FCFA</strong>. Budget total calculé sur la base des participants confirmés 15 jours avant l événement.</p>
<h2>Article 4 – Annulation</h2>
<p>Tout désistement de participant moins de 7 jours avant l événement est facturé au tarif plein.</p></div>`
  },
  {
    code: 'comm_concours_promo',
    name: "Accord de service de concours et jeux promotionnels",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat pour l organisation d un jeu concours ou d une opération promotionnelle, avec rédaction du règlement conforme à la législation ivoirienne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_organisateur',label:"Nom de l organisateur",type:'text',required:true},
      {key:'nom_marque',label:"Nom de la marque commanditaire",type:'text',required:true},
      {key:'type_jeu',label:"Type de jeu (tirage au sort, quizz, etc.)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du jeu",type:'date',required:true},
      {key:'budget_dotations',label:"Budget dotations (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONCOURS ET JEUX PROMOTIONNELS</h1>
<p>Entre <strong>{{nom_organisateur}}</strong> (Organisateur) et <strong>{{nom_marque}}</strong> (Commanditaire).</p>
<h2>Article 1 – Opération</h2>
<p>Type de jeu : <strong>{{type_jeu}}</strong>. Début : <strong>{{date_debut}}</strong>.</p>
<h2>Article 2 – Règlement</h2>
<p>Un règlement officiel est déposé chez un huissier de justice compétent conformément à la législation ivoirienne sur les loteries et jeux promotionnels. La participation est gratuite.</p>
<h2>Article 3 – Dotations</h2>
<p>Budget total des dotations : <strong>{{budget_dotations}} FCFA</strong>.</p>
<h2>Article 4 – Responsabilité</h2>
<p>Le Commanditaire est responsable de la conformité fiscale des gains distribués (imposition des lots excédant le seuil légal).</p></div>`
  },
  {
    code: 'comm_street_marketing',
    name: "Accord de service de street marketing et activation",
    category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat pour la planification et l exécution d une campagne de street marketing ou d activation de marque en milieu urbain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_agence',label:"Nom de l agence d activation",type:'text',required:true},
      {key:'nom_client',label:"Nom du client",type:'text',required:true},
      {key:'villes_activation',label:"Villes ciblées",type:'text',required:true},
      {key:'duree_campagne',label:"Durée de la campagne",type:'text',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STREET MARKETING ET ACTIVATION</h1>
<p>Entre <strong>{{nom_agence}}</strong> (Agence) et <strong>{{nom_client}}</strong> (Client).</p>
<h2>Article 1 – Opération</h2>
<p>Villes ciblées : <strong>{{villes_activation}}</strong>. Durée : <strong>{{duree_campagne}}</strong>. Lancement : <strong>{{date_lancement}}</strong>.</p>
<h2>Article 2 – Prestations</h2>
<p>Conception du dispositif créatif, recrutement et formation des équipes terrain, déploiement, reporting quotidien de contacts et de distribution.</p>
<h2>Article 3 – Budget</h2>
<p>Budget total : <strong>{{budget_total}} FCFA</strong>. Toute extension de périmètre fait l objet d un avenant tarifaire.</p>
<h2>Article 4 – Autorisation</h2>
<p>L Agence s assure des autorisations municipales nécessaires pour les activations sur l espace public.</p></div>`
  },
  {
    code: 'comm_rapport_performance_campagne',
    name: "Rapport de performance campagne de communication",
    category: 'commercial_financier', price: 2500, priceMax: 7000,
    description: "Document de reporting structuré des résultats d une campagne de communication multicanale, à destination du commanditaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_campagne',label:"Nom de la campagne",type:'text',required:true},
      {key:'nom_client',label:"Nom du client commanditaire",type:'text',required:true},
      {key:'periode',label:"Période de la campagne",type:'text',required:true},
      {key:'resultats_cles',label:"Résultats clés",type:'textarea',required:true},
      {key:'budget_investi',label:"Budget investi (FCFA)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – CAMPAGNE DE COMMUNICATION</h1>
<h2>Campagne : {{nom_campagne}}</h2>
<p>Client : <strong>{{nom_client}}</strong> — Période : <strong>{{periode}}</strong>.</p>
<h2>1. Résumé exécutif</h2>
<p>{{resultats_cles}}</p>
<h2>2. Budget</h2>
<p>Budget total investi : <strong>{{budget_investi}} FCFA</strong>.</p>
<h2>3. Performance par canal</h2>
<p>Analyse détaillée des performances par canal de communication (digital, presse, outdoor, événementiel) selon les indicateurs convenus en amont.</p>
<h2>4. Recommandations</h2>
<p>Sur la base des résultats obtenus, des recommandations opérationnelles sont formulées pour les prochaines campagnes.</p></div>`
  },
  {
    code: 'comm_plan_communication_annuel',
    name: "Plan de communication annuel",
    category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Document stratégique définissant les objectifs, les cibles, les messages clés et le plan d action de communication pour une année.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_organisation',label:"Nom de l organisation",type:'text',required:true},
      {key:'responsable_communication',label:"Responsable communication",type:'text',required:true},
      {key:'annee_plan',label:"Année du plan",type:'text',required:true},
      {key:'objectifs',label:"Objectifs de communication",type:'textarea',required:true},
      {key:'budget_annuel',label:"Budget annuel de communication (FCFA)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>PLAN DE COMMUNICATION ANNUEL {{annee_plan}}</h1>
<h2>{{nom_organisation}}</h2>
<p>Responsable communication : <strong>{{responsable_communication}}</strong>.</p>
<h2>1. Objectifs</h2>
<p>{{objectifs}}</p>
<h2>2. Cibles</h2>
<p>Clients, partenaires, médias, grand public, collaborateurs, institutions — selon la cartographie des parties prenantes.</p>
<h2>3. Messages clés</h2>
<p>Définis en cohérence avec la stratégie globale de l organisation et sa plateforme de marque.</p>
<h2>4. Plan d action et calendrier</h2>
<p>Tableau des actions par trimestre, canaux utilisés, responsables et indicateurs de suivi.</p>
<h2>5. Budget</h2>
<p>Budget annuel alloué : <strong>{{budget_annuel}} FCFA</strong>.</p></div>`
  },
  {
    code: 'comm_charte_communication_responsable',
    name: "Charte de communication responsable et éthique",
    category: 'commercial_financier', price: 2000, priceMax: 6000,
    description: "Charte interne définissant les engagements d une organisation en matière de communication responsable, éthique et inclusive.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_organisation',label:"Nom de l organisation",type:'text',required:true},
      {key:'dirigeant',label:"Nom du dirigeant signataire",type:'text',required:true},
      {key:'date_adoption',label:"Date d adoption",type:'date',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques de l organisation",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>CHARTE DE COMMUNICATION RESPONSABLE ET ÉTHIQUE</h1>
<h2>{{nom_organisation}}</h2>
<p>Adoptée le <strong>{{date_adoption}}</strong> par <strong>{{dirigeant}}</strong>.</p>
<h2>1. Véracité des messages</h2>
<p>L organisation s engage à ne diffuser que des informations exactes et vérifiées, en évitant toute forme de greenwashing ou de communication trompeuse.</p>
<h2>2. Inclusion et diversité</h2>
<p>Les communications respectent la diversité culturelle et linguistique du contexte africain. Elles valorisent la représentation équitable des genres et des communautés.</p>
<h2>3. Respect de la vie privée</h2>
<p>Les données personnelles collectées lors des campagnes sont traitées conformément aux réglementations en vigueur en Côte d Ivoire.</p>
<h2>4. Engagements spécifiques</h2>
<p>{{engagements_specifiques}}</p>
<h2>5. Gouvernance</h2>
<p>Un référent éthique communication est désigné en interne pour veiller à l application de la présente charte.</p></div>`
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
  console.log(`Batch 68b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
