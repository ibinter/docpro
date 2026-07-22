import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 Arts visuels / Galeries (art2_) ───
  {
    code: 'art2_cession_oeuvre_originale', name: "Contrat de cession d'oeuvre d'art originale", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat de cession de propriete d'une oeuvre d'art originale entre artiste et acquereur, conforme au droit OHADA et a la loi ivoirienne sur la propriete intellectuelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'acquereur_nom',label:"Nom de l'acquereur",type:'text',required:true},
      {key:'oeuvre_titre',label:"Titre de l'oeuvre",type:'text',required:true},
      {key:'oeuvre_description',label:"Description de l'oeuvre",type:'textarea',required:true},
      {key:'prix_cession',label:"Prix de cession (FCFA)",type:'text',required:true},
      {key:'date_cession',label:"Date de cession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CESSION D'OEUVRE D'ART ORIGINALE</h1><p>Entre <strong>{{artiste_nom}}</strong> (ci-apres "l'Artiste") et <strong>{{acquereur_nom}}</strong> (ci-apres "l'Acquereur"), il est convenu ce qui suit :</p><h2>Article 1 – Objet</h2><p>L'Artiste cede a l'Acquereur la propriete materielle de l'oeuvre intitulee <em>{{oeuvre_titre}}</em>, decrite comme suit : {{oeuvre_description}}.</p><h2>Article 2 – Prix</h2><p>Le prix de cession est fixe a {{prix_cession}} FCFA, payable selon les modalites convenues entre les parties.</p><h2>Article 3 – Droits moraux</h2><p>La presente cession ne porte que sur la propriete materielle de l'oeuvre. Les droits moraux de l'Artiste demeurent incessibles conformement au droit ivoirien de la propriete intellectuelle.</p><h2>Article 4 – Date d'effet</h2><p>Le present contrat prend effet a la date du {{date_cession}}.</p><p>Fait a Abidjan, le {{date_cession}}</p><p>L'Artiste : _________________ L'Acquereur : _________________</p></div>`
  },
  {
    code: 'art2_commande_oeuvre', name: "Contrat de commande d'oeuvre d'art", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat encadrant la commande d'une oeuvre d'art aupres d'un artiste, avec specifications techniques, delais et conditions de paiement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'commanditaire_nom',label:"Nom du commanditaire",type:'text',required:true},
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'oeuvre_specs',label:"Specifications de l'oeuvre",type:'textarea',required:true},
      {key:'delai_livraison',label:"Date de livraison prevue",type:'date',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMMANDE D'OEUVRE D'ART</h1><p><strong>{{commanditaire_nom}}</strong> (Commanditaire) passe commande a <strong>{{artiste_nom}}</strong> (Artiste) d'une oeuvre selon les specifications suivantes : {{oeuvre_specs}}.</p><h2>Article 1 – Delai</h2><p>L'oeuvre sera livree au plus tard le {{delai_livraison}}.</p><h2>Article 2 – Budget</h2><p>Le budget total convenu est de {{budget_total}} FCFA, verse selon echeancier joint en annexe.</p><h2>Article 3 – Propriete</h2><p>A la remise de l'oeuvre et apres paiement integral, la propriete materielle est transferee au Commanditaire. L'Artiste conserve ses droits moraux.</p><p>Fait a Abidjan, le ____________________</p><p>Commanditaire : _________________ Artiste : _________________</p></div>`
  },
  {
    code: 'art2_depot_vente_galerie', name: "Accord de depot-vente d'oeuvre d'art (galerie)", category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de depot-vente entre un artiste et une galerie pour la commercialisation d'oeuvres d'art, avec repartition des commissions.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'galerie_nom',label:"Nom de la galerie",type:'text',required:true},
      {key:'liste_oeuvres',label:"Liste des oeuvres deposees",type:'textarea',required:true},
      {key:'commission_galerie',label:"Commission galerie (%)",type:'text',required:true},
      {key:'duree_depot',label:"Duree du depot (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DEPOT-VENTE D'OEUVRE D'ART</h1><p><strong>{{artiste_nom}}</strong> (Deposant) remet en depot-vente a la galerie <strong>{{galerie_nom}}</strong> (Depositaire) les oeuvres suivantes : {{liste_oeuvres}}.</p><h2>Article 1 – Commission</h2><p>La galerie percevra une commission de {{commission_galerie}}% sur chaque vente realisee. Le solde sera reverse a l'artiste dans les 30 jours suivant la vente.</p><h2>Article 2 – Duree</h2><p>Le depot est consenti pour une duree de {{duree_depot}} mois a compter de la signature.</p><h2>Article 3 – Conservation</h2><p>La galerie s'engage a conserver les oeuvres en bon etat et a les assurer contre tout risque de deterioration ou de perte.</p><p>Fait a Abidjan, le ____________________</p><p>L'Artiste : _________________ La Galerie : _________________</p></div>`
  },
  {
    code: 'art2_exposition_galerie', name: "Accord de service d'exposition d'art (galerie)", category: 'commercial_financier', price: 4500, priceMax: 14000,
    description: "Accord organisant une exposition d'art dans une galerie, incluant les conditions d'accrochage, la communication et le partage des recettes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'galerie_nom',label:"Nom de la galerie",type:'text',required:true},
      {key:'titre_exposition',label:"Titre de l'exposition",type:'text',required:true},
      {key:'date_debut',label:"Date d'ouverture",type:'date',required:true},
      {key:'date_fin',label:"Date de cloture",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXPOSITION D'ART</h1><p>La galerie <strong>{{galerie_nom}}</strong> s'engage a organiser l'exposition intitulee <em>{{titre_exposition}}</em> pour l'artiste <strong>{{artiste_nom}}</strong>.</p><h2>Article 1 – Periode</h2><p>L'exposition se tiendra du {{date_debut}} au {{date_fin}}.</p><h2>Article 2 – Obligations de la galerie</h2><p>La galerie prend en charge l'accrochage, la communication, le vernissage et la gestion des visiteurs.</p><h2>Article 3 – Recettes</h2><p>Les ventes realisees pendant l'exposition feront l'objet d'un accord de repartition joint en annexe.</p><p>Fait a Abidjan, le ____________________</p><p>L'Artiste : _________________ La Galerie : _________________</p></div>`
  },
  {
    code: 'art2_commissariat_exposition', name: "Accord de service de commissariat d'exposition", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de mission pour un commissaire d'exposition charge de concevoir et coordonner une exposition d'art.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'commissaire_nom',label:"Nom du commissaire",type:'text',required:true},
      {key:'client_nom',label:"Nom du client / organisateur",type:'text',required:true},
      {key:'projet_expo',label:"Description du projet d'exposition",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'evenement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMMISSARIAT D'EXPOSITION</h1><p><strong>{{commissaire_nom}}</strong> (Commissaire) est mandate par <strong>{{client_nom}}</strong> (Client) pour assurer le commissariat de l'exposition suivante : {{projet_expo}}.</p><h2>Article 1 – Mission</h2><p>Le Commissaire assurera la conception artistique, la selection des oeuvres, la coordination logistique et la redaction des textes de mediation.</p><h2>Article 2 – Honoraires</h2><p>Les honoraires sont fixes a {{honoraires}} FCFA, payables a 50% a la signature et 50% a l'ouverture.</p><h2>Article 3 – Date</h2><p>L'evenement est prevu pour le {{date_evenement}}.</p><p>Fait a Abidjan, le ____________________</p><p>Le Commissaire : _________________ Le Client : _________________</p></div>`
  },
  {
    code: 'art2_cession_droits_reproduction', name: "Accord de cession de droits de reproduction d'oeuvre d'art (droit d'auteur)", category: 'commercial_financier', price: 5500, priceMax: 16000,
    description: "Accord cedant les droits de reproduction d'une oeuvre d'art a des fins commerciales ou editoriales, conforme au droit d'auteur ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'cessionnaire_nom',label:"Nom du cessionnaire",type:'text',required:true},
      {key:'oeuvre_titre',label:"Titre de l'oeuvre",type:'text',required:true},
      {key:'usage_prevu',label:"Usage prevu (editorial, pub, etc.)",type:'textarea',required:true},
      {key:'redevance',label:"Redevance ou prix fixe (FCFA)",type:'text',required:true},
      {key:'duree_cession',label:"Duree de la cession (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE DROITS DE REPRODUCTION D'OEUVRE D'ART</h1><p><strong>{{artiste_nom}}</strong> (Auteur) cede a <strong>{{cessionnaire_nom}}</strong> (Cessionnaire) les droits de reproduction de l'oeuvre <em>{{oeuvre_titre}}</em>.</p><h2>Article 1 – Etendue</h2><p>La cession porte sur le droit de reproduire l'oeuvre pour l'usage suivant : {{usage_prevu}}.</p><h2>Article 2 – Remuneration</h2><p>La remuneration est fixee a {{redevance}} FCFA.</p><h2>Article 3 – Duree et territoire</h2><p>La cession est consentie pour {{duree_cession}} an(s) sur le territoire ivoirien et de la zone OHADA.</p><h2>Article 4 – Droits moraux</h2><p>L'Auteur devra etre mentionne sur toute reproduction : credits obligatoires.</p><p>Fait a Abidjan, le ____________________</p><p>L'Auteur : _________________ Le Cessionnaire : _________________</p></div>`
  },
  {
    code: 'art2_location_oeuvre_art', name: "Accord de service de location d'oeuvre d'art (art lending)", category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de location temporaire d'oeuvres d'art pour decoration de bureaux, hotels ou evenements professionnels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'proprietaire_nom',label:"Nom du proprietaire",type:'text',required:true},
      {key:'locataire_nom',label:"Nom du locataire",type:'text',required:true},
      {key:'oeuvres_louees',label:"Description des oeuvres louees",type:'textarea',required:true},
      {key:'loyer_mensuel',label:"Loyer mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LOCATION D'OEUVRE D'ART</h1><p><strong>{{proprietaire_nom}}</strong> (Proprietaire) met en location les oeuvres suivantes a <strong>{{locataire_nom}}</strong> (Locataire) : {{oeuvres_louees}}.</p><h2>Article 1 – Loyer</h2><p>Le loyer mensuel est fixe a {{loyer_mensuel}} FCFA, payable en debut de mois.</p><h2>Article 2 – Responsabilite</h2><p>Le Locataire est responsable de la bonne conservation des oeuvres et devra les restituer en l'etat a l'issue du contrat.</p><h2>Article 3 – Assurance</h2><p>Le Locataire s'engage a assurer les oeuvres pour leur valeur de remplacement.</p><h2>Article 4 – Date d'effet</h2><p>Le contrat prend effet le {{date_debut}}.</p><p>Fait a Abidjan, le ____________________</p><p>Proprietaire : _________________ Locataire : _________________</p></div>`
  },
  {
    code: 'art2_expertise_oeuvre', name: "Accord de service d'estimation et expertise d'oeuvre d'art", category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de mission pour un expert en art charge d'estimer la valeur marchande d'une oeuvre d'art.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'expert_nom',label:"Nom de l'expert",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'oeuvre_description',label:"Description de l'oeuvre a expertiser",type:'textarea',required:true},
      {key:'honoraires_expertise',label:"Honoraires d'expertise (FCFA)",type:'text',required:true},
      {key:'date_remise_rapport',label:"Date de remise du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ESTIMATION ET EXPERTISE D'OEUVRE D'ART</h1><p><strong>{{expert_nom}}</strong> (Expert) est mandate par <strong>{{client_nom}}</strong> (Client) pour proceder a l'expertise de l'oeuvre suivante : {{oeuvre_description}}.</p><h2>Article 1 – Mission</h2><p>L'Expert fournira un rapport d'estimation comprenant l'authentification, l'analyse stylistique et la valeur marchande estimee.</p><h2>Article 2 – Honoraires</h2><p>Les honoraires sont fixes a {{honoraires_expertise}} FCFA, payables a la remise du rapport.</p><h2>Article 3 – Delai</h2><p>Le rapport sera remis au plus tard le {{date_remise_rapport}}.</p><p>Fait a Abidjan, le ____________________</p><p>L'Expert : _________________ Le Client : _________________</p></div>`
  },
  {
    code: 'art2_restauration_oeuvre', name: "Accord de service de restauration d'oeuvre d'art", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de prestation pour la restauration d'une oeuvre d'art deterioree, avec rapport de condition et protocole d'intervention.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'restaurateur_nom',label:"Nom du restaurateur",type:'text',required:true},
      {key:'proprietaire_nom',label:"Nom du proprietaire",type:'text',required:true},
      {key:'oeuvre_description',label:"Description de l'oeuvre",type:'textarea',required:true},
      {key:'travaux_prevus',label:"Travaux de restauration prevus",type:'textarea',required:true},
      {key:'cout_restauration',label:"Cout de restauration (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RESTAURATION D'OEUVRE D'ART</h1><p><strong>{{restaurateur_nom}}</strong> (Restaurateur) s'engage aupres de <strong>{{proprietaire_nom}}</strong> (Proprietaire) a proceder a la restauration de l'oeuvre suivante : {{oeuvre_description}}.</p><h2>Article 1 – Travaux</h2><p>Les travaux prevus sont les suivants : {{travaux_prevus}}.</p><h2>Article 2 – Cout</h2><p>Le cout total de la restauration est de {{cout_restauration}} FCFA.</p><h2>Article 3 – Responsabilite</h2><p>Le Restaurateur s'engage a utiliser des materiaux conformes aux normes de conservation preventive et a documenter chaque etape d'intervention.</p><p>Fait a Abidjan, le ____________________</p><p>Le Restaurateur : _________________ Le Proprietaire : _________________</p></div>`
  },
  {
    code: 'art2_encadrement_oeuvre', name: "Accord de service d'encadrement d'oeuvre d'art", category: 'commercial_financier', price: 2500, priceMax: 7000,
    description: "Accord de prestation d'encadrement artistique pour la mise en valeur et la preservation d'oeuvres d'art.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'encadreur_nom',label:"Nom de l'encadreur",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'description_travaux',label:"Description des travaux d'encadrement",type:'textarea',required:true},
      {key:'prix_total',label:"Prix total (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ENCADREMENT D'OEUVRE D'ART</h1><p><strong>{{encadreur_nom}}</strong> (Encadreur) s'engage a realiser les travaux d'encadrement suivants pour <strong>{{client_nom}}</strong> (Client) : {{description_travaux}}.</p><h2>Article 1 – Prix</h2><p>Le prix total est de {{prix_total}} FCFA, incluant materiaux et main-d'oeuvre.</p><h2>Article 2 – Livraison</h2><p>Les travaux seront livres au plus tard le {{date_livraison}}.</p><h2>Article 3 – Garantie</h2><p>L'Encadreur garantit ses travaux contre tout defaut de materiaux ou de mise en oeuvre pour une duree de 12 mois.</p><p>Fait a Abidjan, le ____________________</p><p>L'Encadreur : _________________ Le Client : _________________</p></div>`
  },
  {
    code: 'art2_transport_oeuvre', name: "Accord de service de transport d'oeuvre d'art (art shipping)", category: 'commercial_financier', price: 4500, priceMax: 14000,
    description: "Accord de transport specialise pour oeuvres d'art avec conditions d'emballage, d'assurance et de tracabilite.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'transporteur_nom',label:"Nom du transporteur",type:'text',required:true},
      {key:'expediteur_nom',label:"Nom de l'expediteur",type:'text',required:true},
      {key:'oeuvres_transport',label:"Description des oeuvres a transporter",type:'textarea',required:true},
      {key:'destination',label:"Destination",type:'text',required:true},
      {key:'valeur_declaree',label:"Valeur declaree (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT D'OEUVRE D'ART</h1><p><strong>{{transporteur_nom}}</strong> (Transporteur) prend en charge le transport des oeuvres suivantes pour <strong>{{expediteur_nom}}</strong> (Expediteur) : {{oeuvres_transport}}.</p><h2>Article 1 – Destination</h2><p>Les oeuvres seront acheminées vers : {{destination}}.</p><h2>Article 2 – Valeur et assurance</h2><p>La valeur declaree est de {{valeur_declaree}} FCFA. Le Transporteur s'engage a assurer les oeuvres pour cette valeur pendant toute la duree du transport.</p><h2>Article 3 – Emballage</h2><p>Le Transporteur est responsable d'un emballage adapte et conforme aux standards de conservation des oeuvres d'art.</p><p>Fait a Abidjan, le ____________________</p><p>Le Transporteur : _________________ L'Expediteur : _________________</p></div>`
  },
  {
    code: 'art2_assurance_oeuvre', name: "Accord de service d'assurance d'oeuvre d'art", category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Contrat d'assurance specialise couvrant les oeuvres d'art contre les risques de deterieration, de vol et de perte.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'assureur_nom',label:"Nom de l'assureur",type:'text',required:true},
      {key:'assure_nom',label:"Nom de l'assure",type:'text',required:true},
      {key:'oeuvres_assurees',label:"Description des oeuvres assurees",type:'textarea',required:true},
      {key:'valeur_assuree',label:"Valeur assuree totale (FCFA)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ASSURANCE D'OEUVRE D'ART</h1><p><strong>{{assureur_nom}}</strong> (Assureur) accorde une couverture d'assurance a <strong>{{assure_nom}}</strong> (Assure) pour les oeuvres suivantes : {{oeuvres_assurees}}.</p><h2>Article 1 – Garanties</h2><p>La police couvre les risques de vol, de vandalisme, d'incendie, de dommages accidentels et de perte pendant le transport.</p><h2>Article 2 – Valeur assuree</h2><p>La valeur assuree totale est de {{valeur_assuree}} FCFA.</p><h2>Article 3 – Prime</h2><p>La prime annuelle est de {{prime_annuelle}} FCFA, payable en debut de periode.</p><p>Fait a Abidjan, le ____________________</p><p>L'Assureur : _________________ L'Assure : _________________</p></div>`
  },
  {
    code: 'art2_photographie_artistique', name: "Accord de service de photographie artistique (droit image)", category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de prestation photographique artistique incluant la gestion des droits image des sujets photographies.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'photographe_nom',label:"Nom du photographe",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'objet_mission',label:"Objet de la mission photo",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_prise_de_vue',label:"Date de la prise de vue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHOTOGRAPHIE ARTISTIQUE</h1><p><strong>{{photographe_nom}}</strong> (Photographe) realise une mission photographique pour <strong>{{client_nom}}</strong> (Client) : {{objet_mission}}.</p><h2>Article 1 – Droits cedes</h2><p>Le Photographe cede au Client les droits d'utilisation des cliches produits pour un usage defini en annexe. Les droits moraux restent propriete du Photographe.</p><h2>Article 2 – Droit a l'image</h2><p>Le Client garantit avoir obtenu les autorisations de droit a l'image de toute personne apparaissant sur les photographies.</p><h2>Article 3 – Honoraires</h2><p>Les honoraires sont de {{honoraires}} FCFA pour la prise de vue du {{date_prise_de_vue}} et la livraison des fichiers retouches.</p><p>Fait a Abidjan, le ____________________</p><p>Le Photographe : _________________ Le Client : _________________</p></div>`
  },
  {
    code: 'art2_sculpture_monumentale', name: "Accord de service de sculpture monumentale (commande publique)", category: 'commercial_financier', price: 8000, priceMax: 25000,
    description: "Accord de commande publique pour la creation d'une sculpture monumentale destinee a l'espace public, conforme aux procedures OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'sculpteur_nom',label:"Nom du sculpteur",type:'text',required:true},
      {key:'maitre_ouvrage',label:"Maitre d'ouvrage",type:'text',required:true},
      {key:'description_oeuvre',label:"Description de la sculpture",type:'textarea',required:true},
      {key:'lieu_installation',label:"Lieu d'installation",type:'text',required:true},
      {key:'budget',label:"Budget global (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COMMANDE DE SCULPTURE MONUMENTALE</h1><p><strong>{{maitre_ouvrage}}</strong> (Maitre d'ouvrage) commande a <strong>{{sculpteur_nom}}</strong> (Sculpteur) la creation d'une oeuvre monumentale destinee a l'espace public.</p><h2>Article 1 – Description</h2><p>L'oeuvre est decrite comme suit : {{description_oeuvre}}. Elle sera installee a : {{lieu_installation}}.</p><h2>Article 2 – Budget</h2><p>Le budget global est de {{budget}} FCFA, incluant creation, materiaux, transport et installation.</p><h2>Article 3 – Droits</h2><p>Le Sculpteur conserve ses droits moraux. Le Maitre d'ouvrage acquiert la propriete physique et le droit de reproduction de l'image de l'oeuvre a des fins non commerciales.</p><p>Fait a Abidjan, le ____________________</p><p>Le Sculpteur : _________________ Le Maitre d'ouvrage : _________________</p></div>`
  },
  {
    code: 'art2_fresque_murale', name: "Accord de service de fresque murale (street art legale)", category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord encadrant la realisation d'une fresque murale legale sur commande, avec droits d'auteur et conditions de perennite.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'commanditaire_nom',label:"Nom du commanditaire",type:'text',required:true},
      {key:'adresse_mur',label:"Adresse du mur",type:'text',required:true},
      {key:'description_fresque',label:"Description de la fresque",type:'textarea',required:true},
      {key:'remuneration',label:"Remuneration (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FRESQUE MURALE</h1><p><strong>{{artiste_nom}}</strong> (Artiste) s'engage a realiser une fresque murale pour <strong>{{commanditaire_nom}}</strong> (Commanditaire) sur le mur situe a : {{adresse_mur}}.</p><h2>Article 1 – Description</h2><p>La fresque sera realisee selon la description suivante : {{description_fresque}}.</p><h2>Article 2 – Remuneration</h2><p>La remuneration est fixee a {{remuneration}} FCFA, couvrant la conception, les materiaux et la realisation.</p><h2>Article 3 – Droits et conservation</h2><p>L'Artiste conserve ses droits moraux. Le Commanditaire s'engage a ne pas modifier ni effacer l'oeuvre pendant une periode minimale de 5 ans.</p><p>Fait a Abidjan, le ____________________</p><p>L'Artiste : _________________ Le Commanditaire : _________________</p></div>`
  },
  {
    code: 'art2_ceramique_artistique', name: "Accord de service de ceramique artistique", category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de prestation pour la creation de pieces ceramiques artistiques sur commande, uniques ou en serie limitee.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'ceramiste_nom',label:"Nom du ceramiste",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'description_pieces',label:"Description des pieces commandees",type:'textarea',required:true},
      {key:'prix_total',label:"Prix total (FCFA)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERAMIQUE ARTISTIQUE</h1><p><strong>{{ceramiste_nom}}</strong> (Ceramiste) s'engage a creer les pieces suivantes pour <strong>{{client_nom}}</strong> (Client) : {{description_pieces}}.</p><h2>Article 1 – Prix</h2><p>Le prix total est de {{prix_total}} FCFA.</p><h2>Article 2 – Livraison</h2><p>Les pieces seront livrees au plus tard le {{date_livraison}}.</p><h2>Article 3 – Unicite</h2><p>Chaque piece est signee et certifiee unique ou appartenant a une serie limitee numerotee.</p><p>Fait a Abidjan, le ____________________</p><p>Le Ceramiste : _________________ Le Client : _________________</p></div>`
  },
  {
    code: 'art2_partenariat_galerie_artiste', name: "Accord de partenariat galerie-artiste (exclusivite)", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord de partenariat exclusif entre une galerie et un artiste pour la representation et la promotion de son oeuvre sur un territoire defini.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'galerie_nom',label:"Nom de la galerie",type:'text',required:true},
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'territoire_exclusivite',label:"Territoire d'exclusivite",type:'text',required:true},
      {key:'duree_partenariat',label:"Duree du partenariat (ans)",type:'text',required:true},
      {key:'commission',label:"Commission galerie (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT GALERIE-ARTISTE (EXCLUSIVITE)</h1><p>La galerie <strong>{{galerie_nom}}</strong> et l'artiste <strong>{{artiste_nom}}</strong> conviennent d'un partenariat exclusif de representation artistique.</p><h2>Article 1 – Exclusivite</h2><p>L'artiste accorde a la galerie l'exclusivite de la representation et de la commercialisation de ses oeuvres sur le territoire suivant : {{territoire_exclusivite}}, pour une duree de {{duree_partenariat}} an(s).</p><h2>Article 2 – Commission</h2><p>La galerie percevra {{commission}}% sur chaque vente realisee.</p><h2>Article 3 – Obligations</h2><p>La galerie s'engage a organiser au moins une exposition personnelle par an et a promouvoir activement l'oeuvre de l'artiste aupres de collectionneurs et institutions.</p><p>Fait a Abidjan, le ____________________</p><p>La Galerie : _________________ L'Artiste : _________________</p></div>`
  },
  {
    code: 'art2_reseau_galeries', name: "Accord de service de reseau de galeries (consortium)", category: 'commercial_financier', price: 7000, priceMax: 20000,
    description: "Accord de consortium entre plusieurs galeries d'art pour mutualiser la representation d'artistes et organiser des expositions croisees.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'galeries_membres',label:"Galeries membres du consortium",type:'textarea',required:true},
      {key:'objet_consortium',label:"Objet et mission du consortium",type:'textarea',required:true},
      {key:'galerie_pilote',label:"Galerie pilote coordinatrice",type:'text',required:true},
      {key:'cotisation_annuelle',label:"Cotisation annuelle par membre (FCFA)",type:'text',required:true},
      {key:'date_creation',label:"Date de creation du consortium",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSORTIUM DE GALERIES D'ART</h1><p>Les galeries suivantes conviennent de creer un consortium de cooperation : {{galeries_membres}}.</p><h2>Article 1 – Objet</h2><p>Le consortium a pour mission : {{objet_consortium}}.</p><h2>Article 2 – Gouvernance</h2><p>La galerie pilote est <strong>{{galerie_pilote}}</strong>, chargee de la coordination des activites communes.</p><h2>Article 3 – Financement</h2><p>Chaque membre versera une cotisation annuelle de {{cotisation_annuelle}} FCFA.</p><h2>Article 4 – Date d'effet</h2><p>Le consortium est constitue a compter du {{date_creation}}.</p><p>Fait a Abidjan, le ____________________</p><p>Signatures des membres : _________________</p></div>`
  },
  {
    code: 'art2_foire_art', name: "Accord de service de foire d'art (Art Days Abidjan)", category: 'commercial_financier', price: 5500, priceMax: 16000,
    description: "Accord de participation a une foire d'art internationale ou regionale, encadrant les conditions d'exposition et de vente pour les galeries et artistes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'organisateur_nom',label:"Nom de l'organisateur",type:'text',required:true},
      {key:'exposant_nom',label:"Nom de l'exposant",type:'text',required:true},
      {key:'nom_foire',label:"Nom de la foire",type:'text',required:true},
      {key:'stand_dimensions',label:"Dimensions du stand (m2)",type:'text',required:true},
      {key:'droit_participation',label:"Droit de participation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTICIPATION A UNE FOIRE D'ART</h1><p><strong>{{organisateur_nom}}</strong> (Organisateur) et <strong>{{exposant_nom}}</strong> (Exposant) conviennent des conditions de participation a la foire <em>{{nom_foire}}</em>.</p><h2>Article 1 – Stand</h2><p>L'Exposant disposera d'un stand de {{stand_dimensions}} m2, situe dans la zone attribuee par l'Organisateur.</p><h2>Article 2 – Droit de participation</h2><p>Le droit de participation est de {{droit_participation}} FCFA, couvrant l'espace, les amenagements de base et la communication de l'evenement.</p><h2>Article 3 – Obligations</h2><p>L'Exposant s'engage a tenir son stand pendant toute la duree de la foire et a respecter la charte graphique et deontologique de l'evenement.</p><p>Fait a Abidjan, le ____________________</p><p>L'Organisateur : _________________ L'Exposant : _________________</p></div>`
  },
  {
    code: 'art2_residence_artiste', name: "Accord de service de residence d'artiste", category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord encadrant une residence d'artiste avec mise a disposition d'un atelier, logement et accompagnement pour la creation d'une oeuvre.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'structure_accueil',label:"Structure d'accueil",type:'text',required:true},
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'projet_creation',label:"Projet de creation en residence",type:'textarea',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RESIDENCE D'ARTISTE</h1><p><strong>{{structure_accueil}}</strong> (Structure) accueille <strong>{{artiste_nom}}</strong> (Artiste) en residence de creation.</p><h2>Article 1 – Projet</h2><p>Le projet artistique developpe en residence est : {{projet_creation}}.</p><h2>Article 2 – Periode</h2><p>La residence se deroulera du {{date_debut}} au {{date_fin}}.</p><h2>Article 3 – Conditions</h2><p>La Structure met a disposition un atelier equipe et, le cas echeant, un logement. L'Artiste s'engage a presenter son travail lors d'une journee portes ouvertes en fin de residence.</p><p>Fait a Abidjan, le ____________________</p><p>La Structure : _________________ L'Artiste : _________________</p></div>`
  },
  {
    code: 'art2_cession_droit_photo', name: "Accord de cession de droit sur oeuvre photographique", category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord de cession de droits patrimoniaux sur une oeuvre photographique, pour usage editorial, publicitaire ou decoratif.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'photographe_nom',label:"Nom du photographe",type:'text',required:true},
      {key:'acquereur_nom',label:"Nom de l'acquereur",type:'text',required:true},
      {key:'description_photo',label:"Description de la photographie",type:'text',required:true},
      {key:'usages_autorises',label:"Usages autorises",type:'textarea',required:true},
      {key:'prix_cession',label:"Prix de cession (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE DROIT SUR OEUVRE PHOTOGRAPHIQUE</h1><p><strong>{{photographe_nom}}</strong> (Auteur) cede a <strong>{{acquereur_nom}}</strong> (Cessionnaire) les droits d'exploitation de la photographie suivante : {{description_photo}}.</p><h2>Article 1 – Etendue de la cession</h2><p>Les usages autorises sont : {{usages_autorises}}.</p><h2>Article 2 – Prix</h2><p>Le prix de la cession est de {{prix_cession}} FCFA.</p><h2>Article 3 – Credits</h2><p>Toute utilisation devra mentionner le credit : "Photo : {{photographe_nom}}".</p><p>Fait a Abidjan, le ____________________</p><p>L'Auteur : _________________ Le Cessionnaire : _________________</p></div>`
  },
  {
    code: 'art2_art_digital_nft', name: "Accord de service d'art digitale (NFT artistique africain)", category: 'commercial_financier', price: 5500, priceMax: 16000,
    description: "Accord de creation et de cession d'art numerique sous forme de NFT, adapte aux specificites du marche africain et de la blockchain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste numerique",type:'text',required:true},
      {key:'acquereur_nom',label:"Nom de l'acquereur",type:'text',required:true},
      {key:'oeuvre_digitale',label:"Description de l'oeuvre numerique",type:'textarea',required:true},
      {key:'plateforme_nft',label:"Plateforme NFT utilisee",type:'text',required:true},
      {key:'prix_acquisition',label:"Prix d'acquisition (FCFA ou equivalent)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION D'ART DIGITAL (NFT ARTISTIQUE)</h1><p><strong>{{artiste_nom}}</strong> (Artiste) cede a <strong>{{acquereur_nom}}</strong> (Acquereur) les droits sur l'oeuvre numerique decrite comme : {{oeuvre_digitale}}, tokenisee sur la plateforme {{plateforme_nft}}.</p><h2>Article 1 – Nature de la cession</h2><p>La cession porte sur les droits patrimoniaux d'exploitation numerique du NFT. Les droits moraux de l'Artiste restent incessibles.</p><h2>Article 2 – Prix</h2><p>Le prix d'acquisition est de {{prix_acquisition}}.</p><h2>Article 3 – Redevances</h2><p>L'Artiste beneficiera d'une redevance de 10% sur toute revente secondaire du NFT, conforme aux mecanismes de royalties integres a la plateforme.</p><p>Fait a Abidjan, le ____________________</p><p>L'Artiste : _________________ L'Acquereur : _________________</p></div>`
  },
  {
    code: 'art2_rapport_performance_galerie', name: "Rapport de performance galerie d'art", category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Rapport d'activite et de performance commerciale d'une galerie d'art, incluant ventes, frequentation et indicateurs cles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'galerie_nom',label:"Nom de la galerie",type:'text',required:true},
      {key:'periode_rapport',label:"Periode couverte",type:'text',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires (FCFA)",type:'text',required:true},
      {key:'nombre_oeuvres_vendues',label:"Nombre d'oeuvres vendues",type:'text',required:true},
      {key:'bilan_qualitatif',label:"Bilan qualitatif et perspectives",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – GALERIE D'ART</h1><h2>Galerie : {{galerie_nom}}</h2><h2>Periode : {{periode_rapport}}</h2><h2>1. Indicateurs commerciaux</h2><p>Chiffre d'affaires : {{chiffre_affaires}} FCFA</p><p>Nombre d'oeuvres vendues : {{nombre_oeuvres_vendues}}</p><h2>2. Bilan qualitatif</h2><p>{{bilan_qualitatif}}</p><h2>3. Recommandations</h2><p>Ce rapport sera presente aux partenaires et investisseurs lors de la prochaine reunion de gouvernance.</p></div>`
  },
  {
    code: 'art2_plan_dev_marche_art', name: "Plan de developpement marche de l'art africain", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Document strategique pour le developpement d'une galerie ou d'un artiste sur le marche de l'art africain, avec analyse SWOT et plan d'action.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'porteur_projet',label:"Porteur du projet",type:'text',required:true},
      {key:'vision_strategique',label:"Vision strategique",type:'textarea',required:true},
      {key:'marches_cibles',label:"Marches cibles (CI, OHADA, international)",type:'text',required:true},
      {key:'budget_developpement',label:"Budget de developpement (FCFA)",type:'text',required:true},
      {key:'horizon_temporel',label:"Horizon temporel (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DEVELOPPEMENT – MARCHE DE L'ART AFRICAIN</h1><h2>Porteur : {{porteur_projet}}</h2><h2>1. Vision</h2><p>{{vision_strategique}}</p><h2>2. Marches cibles</h2><p>{{marches_cibles}}</p><h2>3. Budget</h2><p>Budget de developpement : {{budget_developpement}} FCFA sur {{horizon_temporel}} an(s).</p><h2>4. Plan d'action</h2><p>Le plan detaille les etapes de deploiement : prospection de collectionneurs, participation aux foires internationales, developpement digital, et partenariats institutionnels.</p></div>`
  },
  {
    code: 'art2_charte_artiste_africain', name: "Charte de l'artiste africain et de ses droits", category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Charte de reference definissant les droits et devoirs de l'artiste africain, son rapport aux institutions et sa place dans l'ecosysteme culturel ivoirien et OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'specialite_artistique',label:"Specialite artistique",type:'text',required:true},
      {key:'engagement_ethique',label:"Engagements ethiques de l'artiste",type:'textarea',required:true},
      {key:'date_adhesion',label:"Date d'adhesion a la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ARTISTE AFRICAIN ET DE SES DROITS</h1><h2>Signataire : {{artiste_nom}} – Specialite : {{specialite_artistique}}</h2><h2>Preambule</h2><p>La presente charte affirme la dignite de la creation artistique africaine et les droits fondamentaux de l'artiste dans l'espace culturel ivoirien et de la zone OHADA.</p><h2>Article 1 – Droits de l'artiste</h2><p>L'artiste a droit a la remuneration equitable de son oeuvre, a la protection de ses droits moraux et patrimoniaux, et a la liberte de creation.</p><h2>Article 2 – Engagements</h2><p>{{engagement_ethique}}</p><h2>Article 3 – Adhesion</h2><p>L'artiste soussigne adhere a la presente charte le {{date_adhesion}}.</p><p>Signature : _________________</p></div>`
  },

  // ─── 25 Musique / Droits d'auteur (mus_) ───
  {
    code: 'mus_cession_droits_musicaux', name: "Contrat de cession de droits musicaux (composition et paroles)", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat de cession des droits patrimoniaux sur une composition musicale et ses paroles, conforme au droit ivoirien et au systeme BURIDA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'auteur_nom',label:"Nom de l'auteur-compositeur",type:'text',required:true},
      {key:'cessionnaire_nom',label:"Nom du cessionnaire",type:'text',required:true},
      {key:'titre_oeuvre',label:"Titre de l'oeuvre musicale",type:'text',required:true},
      {key:'etendue_cession',label:"Etendue de la cession (droits cedes)",type:'textarea',required:true},
      {key:'remuneration',label:"Remuneration ou avance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CESSION DE DROITS MUSICAUX</h1><p><strong>{{auteur_nom}}</strong> (Auteur) cede a <strong>{{cessionnaire_nom}}</strong> (Cessionnaire) les droits patrimoniaux sur l'oeuvre <em>{{titre_oeuvre}}</em>.</p><h2>Article 1 – Droits cedes</h2><p>{{etendue_cession}}</p><h2>Article 2 – Remuneration</h2><p>La remuneration est de {{remuneration}} FCFA.</p><h2>Article 3 – Droits moraux</h2><p>Les droits moraux de l'Auteur sont incessibles et imprescriptibles, conformement au droit ivoirien de la propriete intellectuelle et aux conventions de la BURIDA.</p><p>Fait a Abidjan, le ____________________</p><p>L'Auteur : _________________ Le Cessionnaire : _________________</p></div>`
  },
  {
    code: 'mus_contrat_artiste_label', name: "Contrat d'artiste-interprete (label)", category: 'commercial_financier', price: 7000, priceMax: 22000,
    description: "Contrat lie un artiste-interprete a un label musical pour l'enregistrement et la commercialisation de sa musique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'label_nom',label:"Nom du label",type:'text',required:true},
      {key:'nombre_albums',label:"Nombre d'albums prevus",type:'text',required:true},
      {key:'avance_signature',label:"Avance a la signature (FCFA)",type:'text',required:true},
      {key:'taux_royalties',label:"Taux de royalties artiste (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ARTISTE-INTERPRETE</h1><p><strong>{{artiste_nom}}</strong> (Artiste) signe avec le label <strong>{{label_nom}}</strong> (Label) pour la production et la commercialisation de sa musique.</p><h2>Article 1 – Duree et albums</h2><p>Le contrat couvre la realisation de {{nombre_albums}} album(s) sur une periode definie en annexe.</p><h2>Article 2 – Avance</h2><p>Le Label verse une avance de {{avance_signature}} FCFA a la signature, recoupable sur les royalties.</p><h2>Article 3 – Royalties</h2><p>L'Artiste percevra {{taux_royalties}}% du prix de vente net de chaque support vendu ou stream genere.</p><h2>Article 4 – Droits voisins</h2><p>Les droits voisins de l'Artiste sont geres par la BURIDA et lui sont reversés directement.</p><p>Fait a Abidjan, le ____________________</p><p>L'Artiste : _________________ Le Label : _________________</p></div>`
  },
  {
    code: 'mus_accord_enregistrement_studio', name: "Accord d'enregistrement musical (studio)", category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de prestation pour la session d'enregistrement en studio, incluant les conditions techniques et la propriete des masters.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'studio_nom',label:"Nom du studio",type:'text',required:true},
      {key:'artiste_nom',label:"Nom de l'artiste ou producteur",type:'text',required:true},
      {key:'projet_titre',label:"Titre du projet musical",type:'text',required:true},
      {key:'jours_studio',label:"Nombre de jours de studio",type:'text',required:true},
      {key:'tarif_journalier',label:"Tarif journalier (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ENREGISTREMENT MUSICAL EN STUDIO</h1><p>Le studio <strong>{{studio_nom}}</strong> (Prestataire) s'engage a mettre a disposition ses installations pour l'enregistrement du projet <em>{{projet_titre}}</em> de <strong>{{artiste_nom}}</strong> (Client).</p><h2>Article 1 – Duree</h2><p>La session couvre {{jours_studio}} jour(s) de studio au tarif de {{tarif_journalier}} FCFA/jour.</p><h2>Article 2 – Propriete des masters</h2><p>Les fichiers masters sont propriete du Client a compter du paiement integral de la prestation.</p><h2>Article 3 – Materiel</h2><p>Le Studio garantit la mise a disposition d'equipements professionnels et la disponibilite d'un ingenieur du son qualifie.</p><p>Fait a Abidjan, le ____________________</p><p>Le Studio : _________________ L'Artiste : _________________</p></div>`
  },
  {
    code: 'mus_accord_production_musicale', name: "Accord de production musicale (producteur-artiste)", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord de co-production musicale entre un producteur et un artiste, definissant les apports, les droits sur les masters et le partage des recettes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'producteur_nom',label:"Nom du producteur",type:'text',required:true},
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'projet_description',label:"Description du projet",type:'textarea',required:true},
      {key:'apport_producteur',label:"Apport du producteur (FCFA)",type:'text',required:true},
      {key:'partage_recettes',label:"Repartition des recettes (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRODUCTION MUSICALE</h1><p><strong>{{producteur_nom}}</strong> (Producteur) et <strong>{{artiste_nom}}</strong> (Artiste) s'associent pour la realisation du projet suivant : {{projet_description}}.</p><h2>Article 1 – Apport</h2><p>Le Producteur apporte {{apport_producteur}} FCFA pour couvrir les frais de studio, d'arrangements et de promotion.</p><h2>Article 2 – Recettes</h2><p>Les recettes sont reparties comme suit : {{partage_recettes}}.</p><h2>Article 3 – Masters</h2><p>Les masters appartiennent conjointement aux deux parties selon la repartition des recettes definie. Toute exploitation commerciale requiert l'accord des deux parties.</p><p>Fait a Abidjan, le ____________________</p><p>Le Producteur : _________________ L'Artiste : _________________</p></div>`
  },
  {
    code: 'mus_accord_mixage_mastering', name: "Accord de service de mixage et mastering", category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord de prestation technique pour le mixage et le mastering d'un projet musical en vue de sa distribution.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'ingenieur_son',label:"Nom de l'ingenieur du son",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nombre_titres',label:"Nombre de titres",type:'text',required:true},
      {key:'honoraires_totaux',label:"Honoraires totaux (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MIXAGE ET MASTERING</h1><p><strong>{{ingenieur_son}}</strong> (Ingenieur) s'engage a realiser le mixage et mastering du projet <em>{{titre_projet}}</em> pour <strong>{{client_nom}}</strong> (Client).</p><h2>Article 1 – Prestation</h2><p>La prestation couvre le mixage et le mastering de {{nombre_titres}} titre(s), avec 2 corrections incluses par titre.</p><h2>Article 2 – Honoraires</h2><p>Les honoraires totaux sont de {{honoraires_totaux}} FCFA, payables a 50% a la commande et 50% a la livraison.</p><h2>Article 3 – Livraison</h2><p>Les fichiers masterises seront livres aux formats WAV 24bit/44.1kHz et MP3 320kbps.</p><p>Fait a Abidjan, le ____________________</p><p>L'Ingenieur : _________________ Le Client : _________________</p></div>`
  },
  {
    code: 'mus_licence_synchronisation', name: "Accord de licence musicale (synchronisation film)", category: 'commercial_financier', price: 5500, priceMax: 16000,
    description: "Accord de licence de synchronisation permettant l'utilisation d'une oeuvre musicale dans un film, une publicite ou un contenu audiovisuel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'auteur_nom',label:"Nom de l'auteur / ayant droit",type:'text',required:true},
      {key:'producteur_audiovisuel',label:"Nom du producteur audiovisuel",type:'text',required:true},
      {key:'titre_musique',label:"Titre de la musique",type:'text',required:true},
      {key:'titre_film',label:"Titre du film / contenu",type:'text',required:true},
      {key:'redevance_synchro',label:"Redevance de synchronisation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE SYNCHRONISATION MUSICALE</h1><p><strong>{{auteur_nom}}</strong> (Concedant) accorde a <strong>{{producteur_audiovisuel}}</strong> (Licencie) le droit de synchroniser l'oeuvre musicale <em>{{titre_musique}}</em> dans le contenu audiovisuel <em>{{titre_film}}</em>.</p><h2>Article 1 – Etendue</h2><p>La licence est non exclusive, pour le territoire ivoirien et la zone OHADA, pour une duree de 5 ans.</p><h2>Article 2 – Redevance</h2><p>La redevance de synchronisation est de {{redevance_synchro}} FCFA, payable a la signature.</p><h2>Article 3 – Credits</h2><p>L'oeuvre devra etre creditee au generique : "Musique : {{titre_musique}} de {{auteur_nom}}".</p><p>Fait a Abidjan, le ____________________</p><p>Le Concedant : _________________ Le Licencie : _________________</p></div>`
  },
  {
    code: 'mus_distribution_streaming', name: "Accord de service de distribution musicale en ligne (streaming)", category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de distribution numerique d'un catalogue musical sur les plateformes de streaming (Spotify, Apple Music, Boomplay, etc.).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste / label",type:'text',required:true},
      {key:'distributeur_nom',label:"Nom du distributeur numerique",type:'text',required:true},
      {key:'catalogue',label:"Description du catalogue",type:'textarea',required:true},
      {key:'commission_distribution',label:"Commission de distribution (%)",type:'text',required:true},
      {key:'duree_accord',label:"Duree de l'accord (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION MUSICALE EN LIGNE</h1><p><strong>{{artiste_nom}}</strong> (Titulaire) mandate <strong>{{distributeur_nom}}</strong> (Distributeur) pour la distribution numerique du catalogue suivant : {{catalogue}}.</p><h2>Article 1 – Plateformes</h2><p>Le Distributeur s'engage a mettre le catalogue en ligne sur toutes les principales plateformes de streaming mondiales et africaines, notamment Boomplay, Audiomack, Spotify, Apple Music et YouTube Music.</p><h2>Article 2 – Commission</h2><p>Le Distributeur percevra {{commission_distribution}}% des revenus nets generes.</p><h2>Article 3 – Duree</h2><p>L'accord est conclu pour {{duree_accord}} an(s), renouvelable par tacite reconduction.</p><p>Fait a Abidjan, le ____________________</p><p>Le Titulaire : _________________ Le Distributeur : _________________</p></div>`
  },
  {
    code: 'mus_gestion_collective_burida', name: "Accord de service de gestion collective (BURIDA CI)", category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord d'adhesion et de mandat de gestion collective des droits d'auteur aupres de la BURIDA (Bureau Ivoirien du Droit d'Auteur).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'auteur_nom',label:"Nom de l'auteur",type:'text',required:true},
      {key:'numero_burida',label:"Numero d'adhesion BURIDA",type:'text',required:true},
      {key:'catalogue_gere',label:"Catalogue confie en gestion",type:'textarea',required:true},
      {key:'date_adhesion',label:"Date d'adhesion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION COLLECTIVE DES DROITS – BURIDA CI</h1><p><strong>{{auteur_nom}}</strong> (Membre), numero d'adhesion BURIDA : {{numero_burida}}, confie a la BURIDA la gestion collective de son catalogue : {{catalogue_gere}}.</p><h2>Article 1 – Mandat</h2><p>Le Membre mandate la BURIDA pour percevoir en son nom les redevances de diffusion, de reproduction et d'execution publique de ses oeuvres.</p><h2>Article 2 – Repartition</h2><p>La BURIDA reversera les sommes collectees apres deduction de ses frais de gestion, selon le barème en vigueur.</p><h2>Article 3 – Date</h2><p>Le present accord prend effet le {{date_adhesion}}.</p><p>Fait a Abidjan, le ____________________</p><p>Le Membre : _________________ La BURIDA : _________________</p></div>`
  },
  {
    code: 'mus_partenariat_artiste_marque', name: "Accord de partenariat artiste-marque (brand deal)", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord de partenariat entre un artiste musical et une marque pour des activites de communication, d'endorsement et de co-branding.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 83,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'marque_nom',label:"Nom de la marque",type:'text',required:true},
      {key:'activites_partenariat',label:"Activites du partenariat",type:'textarea',required:true},
      {key:'remuneration_totale',label:"Remuneration totale (FCFA)",type:'text',required:true},
      {key:'duree_contrat',label:"Duree du contrat (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ARTISTE-MARQUE</h1><p><strong>{{artiste_nom}}</strong> (Artiste) et <strong>{{marque_nom}}</strong> (Marque) conviennent d'un partenariat de communication et de co-branding.</p><h2>Article 1 – Activites</h2><p>Les activites prevues sont : {{activites_partenariat}}.</p><h2>Article 2 – Remuneration</h2><p>La remuneration totale est de {{remuneration_totale}} FCFA sur une duree de {{duree_contrat}} mois.</p><h2>Article 3 – Image</h2><p>L'Artiste autorise la Marque a utiliser son nom, image et voix dans les supports de communication prevus au contrat. Toute utilisation hors perimetre requiert un avenant.</p><p>Fait a Abidjan, le ____________________</p><p>L'Artiste : _________________ La Marque : _________________</p></div>`
  },
  {
    code: 'mus_accord_concert_spectacle', name: "Accord de service de concert et spectacle vivant", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord de prestation pour l'organisation et la realisation d'un concert ou spectacle vivant, incluant le cachet artistique et les conditions techniques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 88,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'producteur_spectacle',label:"Nom du producteur/organisateur",type:'text',required:true},
      {key:'lieu_concert',label:"Lieu du concert",type:'text',required:true},
      {key:'date_concert',label:"Date du concert",type:'date',required:true},
      {key:'cachet',label:"Cachet artistique (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCERT ET SPECTACLE VIVANT</h1><p><strong>{{artiste_nom}}</strong> (Artiste) s'engage a se produire en concert pour <strong>{{producteur_spectacle}}</strong> (Producteur).</p><h2>Article 1 – Date et lieu</h2><p>Le concert se tiendra le {{date_concert}} au {{lieu_concert}}.</p><h2>Article 2 – Cachet</h2><p>Le cachet artistique est de {{cachet}} FCFA, verse a 50% a la signature et 50% apres le spectacle.</p><h2>Article 3 – Rider technique</h2><p>Le Producteur s'engage a fournir le materiel technique conforme au rider joint en annexe (sonorisation, eclairage, loges).</p><p>Fait a Abidjan, le ____________________</p><p>L'Artiste : _________________ Le Producteur : _________________</p></div>`
  },
  {
    code: 'mus_accord_tournee_musicale', name: "Accord de service de tournee musicale", category: 'commercial_financier', price: 7000, priceMax: 22000,
    description: "Accord organisant une tournee musicale regionale ou internationale, incluant les dates, cachets, frais de voyage et obligations de chaque partie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'promoteur_nom',label:"Nom du promoteur de tournee",type:'text',required:true},
      {key:'dates_villes',label:"Dates et villes de la tournee",type:'textarea',required:true},
      {key:'cachet_total',label:"Cachet total (FCFA)",type:'text',required:true},
      {key:'frais_prise_en_charge',label:"Frais pris en charge (transport, hotel...)",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TOURNEE MUSICALE</h1><p><strong>{{artiste_nom}}</strong> (Artiste) et <strong>{{promoteur_nom}}</strong> (Promoteur) conviennent de l'organisation d'une tournee musicale.</p><h2>Article 1 – Calendrier</h2><p>Dates et villes : {{dates_villes}}.</p><h2>Article 2 – Cachet</h2><p>Le cachet total est de {{cachet_total}} FCFA, echelonne selon calendrier joint en annexe.</p><h2>Article 3 – Frais</h2><p>Le Promoteur prend en charge : {{frais_prise_en_charge}}.</p><h2>Article 4 – Annulation</h2><p>En cas d'annulation par le Promoteur a moins de 15 jours, 50% du cachet restant est du a l'Artiste.</p><p>Fait a Abidjan, le ____________________</p><p>L'Artiste : _________________ Le Promoteur : _________________</p></div>`
  },
  {
    code: 'mus_accord_booking_artiste', name: "Accord de booking d'artiste musical", category: 'commercial_financier', price: 4500, priceMax: 13000,
    description: "Accord mandatant une agence de booking pour la reservation de dates de concert et spectacle au nom d'un artiste musical.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'agence_booking',label:"Nom de l'agence de booking",type:'text',required:true},
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'territoire',label:"Territoire de booking",type:'text',required:true},
      {key:'commission_booking',label:"Commission agence (%)",type:'text',required:true},
      {key:'duree_mandat',label:"Duree du mandat (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE BOOKING D'ARTISTE MUSICAL</h1><p><strong>{{artiste_nom}}</strong> (Artiste) mandate <strong>{{agence_booking}}</strong> (Agence) pour la reservation et la negociation de ses dates de concert.</p><h2>Article 1 – Territoire</h2><p>Le mandat de booking couvre le territoire suivant : {{territoire}}.</p><h2>Article 2 – Commission</h2><p>L'Agence percevra {{commission_booking}}% du cachet brut de chaque date reservee.</p><h2>Article 3 – Duree</h2><p>Le mandat est conclu pour {{duree_mandat}} mois.</p><h2>Article 4 – Obligations</h2><p>L'Agence transmettra a l'Artiste toute offre de date recue et ne pourra accepter sans accord prealable de l'Artiste.</p><p>Fait a Abidjan, le ____________________</p><p>L'Artiste : _________________ L'Agence : _________________</p></div>`
  },
  {
    code: 'mus_accord_management_artiste', name: "Accord de management d'artiste musical", category: 'commercial_financier', price: 6500, priceMax: 20000,
    description: "Accord de management artistique confiant a un manager la representation generale et le developpement de la carriere d'un artiste musical.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'manager_nom',label:"Nom du manager",type:'text',required:true},
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'mission_management',label:"Mission du manager",type:'textarea',required:true},
      {key:'commission_management',label:"Commission manager (%)",type:'text',required:true},
      {key:'duree_contrat',label:"Duree du contrat (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MANAGEMENT D'ARTISTE MUSICAL</h1><p><strong>{{artiste_nom}}</strong> (Artiste) confie a <strong>{{manager_nom}}</strong> (Manager) la gestion et le developpement de sa carriere musicale.</p><h2>Article 1 – Mission</h2><p>{{mission_management}}</p><h2>Article 2 – Commission</h2><p>Le Manager percevra {{commission_management}}% de tous les revenus bruts generes par l'Artiste dans le cadre de ses activites artistiques.</p><h2>Article 3 – Duree</h2><p>Le contrat est conclu pour {{duree_contrat}} an(s), renouvelable d'un commun accord.</p><p>Fait a Abidjan, le ____________________</p><p>L'Artiste : _________________ Le Manager : _________________</p></div>`
  },
  {
    code: 'mus_partenariat_radio_artiste', name: "Accord de partenariat radio-artiste (diffusion)", category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord de partenariat entre une radio et un artiste pour la diffusion de sa musique et la promotion de ses projets.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'radio_nom',label:"Nom de la radio",type:'text',required:true},
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'titres_diffuses',label:"Titres a diffuser",type:'textarea',required:true},
      {key:'frequence_diffusion',label:"Frequence de diffusion prevue",type:'text',required:true},
      {key:'contrepartie',label:"Contrepartie (especes ou en nature)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT RADIO-ARTISTE</h1><p>La radio <strong>{{radio_nom}}</strong> et <strong>{{artiste_nom}}</strong> (Artiste) conviennent d'un partenariat de diffusion.</p><h2>Article 1 – Titres</h2><p>Les titres suivants feront l'objet de diffusions programmees : {{titres_diffuses}}.</p><h2>Article 2 – Frequence</h2><p>La frequence de diffusion prevue est : {{frequence_diffusion}}.</p><h2>Article 3 – Contrepartie</h2><p>En contrepartie, la radio beneficiera de : {{contrepartie}}.</p><h2>Article 4 – BURIDA</h2><p>La radio s'engage a declarer toutes les diffusions a la BURIDA pour le versement des droits d'auteur dus.</p><p>Fait a Abidjan, le ____________________</p><p>La Radio : _________________ L'Artiste : _________________</p></div>`
  },
  {
    code: 'mus_partenariat_tv_artiste', name: "Accord de partenariat TV-artiste (clip, plateau)", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord entre une chaine de television et un artiste pour la diffusion de clips, d'interviews et de performances sur plateau.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'chaine_tv',label:"Nom de la chaine TV",type:'text',required:true},
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'contenu_diffuse',label:"Contenu a diffuser (clips, plateau...)",type:'textarea',required:true},
      {key:'remuneration',label:"Remuneration ou contrepartie (FCFA)",type:'text',required:true},
      {key:'duree_accord',label:"Duree de l'accord (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT TV-ARTISTE</h1><p>La chaine <strong>{{chaine_tv}}</strong> et <strong>{{artiste_nom}}</strong> (Artiste) concluent un partenariat de diffusion audiovisuelle.</p><h2>Article 1 – Contenu</h2><p>Le contenu diffuse comprend : {{contenu_diffuse}}.</p><h2>Article 2 – Remuneration</h2><p>La remuneration est de {{remuneration}} FCFA pour la duree de l'accord.</p><h2>Article 3 – Duree</h2><p>L'accord est conclu pour {{duree_accord}} mois.</p><h2>Article 4 – Droits voisins</h2><p>La chaine s'engage a declarer les diffusions aupres des organismes competents pour le paiement des droits voisins.</p><p>Fait a Abidjan, le ____________________</p><p>La Chaine : _________________ L'Artiste : _________________</p></div>`
  },
  {
    code: 'mus_accord_festival_musique', name: "Accord de service de festival de musique", category: 'commercial_financier', price: 5500, priceMax: 16000,
    description: "Accord de participation ou d'organisation d'un festival de musique, encadrant la programmation, les cachets et la logistique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 84,
    fieldsJson: F([
      {key:'organisateur_festival',label:"Nom de l'organisateur",type:'text',required:true},
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'nom_festival',label:"Nom du festival",type:'text',required:true},
      {key:'date_festival',label:"Date du festival",type:'date',required:true},
      {key:'cachet_festival',label:"Cachet (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTICIPATION AU FESTIVAL DE MUSIQUE</h1><p><strong>{{artiste_nom}}</strong> (Artiste) est engage par <strong>{{organisateur_festival}}</strong> (Organisateur) pour se produire au festival <em>{{nom_festival}}</em>.</p><h2>Article 1 – Date</h2><p>L'Artiste se produira le {{date_festival}}.</p><h2>Article 2 – Cachet</h2><p>Le cachet est de {{cachet_festival}} FCFA, verse 48h avant la performance.</p><h2>Article 3 – Conditions</h2><p>L'Organisateur prend en charge le transport local, l'hebergement et la restauration de l'Artiste et de son equipe pendant le festival.</p><p>Fait a Abidjan, le ____________________</p><p>L'Artiste : _________________ L'Organisateur : _________________</p></div>`
  },
  {
    code: 'mus_partenariat_festival_sponsor', name: "Accord de partenariat festival-sponsor", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord de sponsoring pour un festival de musique, definissant les contreparties de visibilite et les obligations du sponsor.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'festival_nom',label:"Nom du festival",type:'text',required:true},
      {key:'sponsor_nom',label:"Nom du sponsor",type:'text',required:true},
      {key:'apport_sponsor',label:"Apport financier du sponsor (FCFA)",type:'text',required:true},
      {key:'contreparties_visibilite',label:"Contreparties de visibilite",type:'textarea',required:true},
      {key:'date_festival',label:"Date du festival",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT FESTIVAL-SPONSOR</h1><p><strong>{{sponsor_nom}}</strong> (Sponsor) soutient le festival <em>{{festival_nom}}</em> a hauteur de {{apport_sponsor}} FCFA.</p><h2>Article 1 – Contreparties</h2><p>En contrepartie, le Sponsor beneficiera des visibilites suivantes : {{contreparties_visibilite}}.</p><h2>Article 2 – Date</h2><p>L'evenement se tient le {{date_festival}}.</p><h2>Article 3 – Deontologie</h2><p>Le Sponsor s'engage a ne diffuser aucun contenu contraire aux valeurs artistiques et culturelles du festival.</p><p>Fait a Abidjan, le ____________________</p><p>Le Festival : _________________ Le Sponsor : _________________</p></div>`
  },
  {
    code: 'mus_accord_merchandising', name: "Accord de service de merchandising musical (goodies)", category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Accord autorisant un partenaire a produire et commercialiser des produits derives (goodies) a l'effigie d'un artiste ou d'un groupe musical.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'partenaire_merch',label:"Nom du partenaire merchandising",type:'text',required:true},
      {key:'produits_autorises',label:"Produits autorises",type:'textarea',required:true},
      {key:'royalties_merch',label:"Royalties artiste (%)",type:'text',required:true},
      {key:'duree_accord',label:"Duree de l'accord (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MERCHANDISING MUSICAL</h1><p><strong>{{artiste_nom}}</strong> (Artiste) autorise <strong>{{partenaire_merch}}</strong> (Partenaire) a produire et commercialiser des produits derives a son effigie.</p><h2>Article 1 – Produits</h2><p>Les produits autorises sont : {{produits_autorises}}.</p><h2>Article 2 – Royalties</h2><p>L'Artiste percevra {{royalties_merch}}% du chiffre d'affaires nets generes par les ventes de merchandising.</p><h2>Article 3 – Duree</h2><p>L'accord est conclu pour {{duree_accord}} mois.</p><h2>Article 4 – Controle qualite</h2><p>L'Artiste se reserve le droit de valider les visuels et la qualite des produits avant leur mise en vente.</p><p>Fait a Abidjan, le ____________________</p><p>L'Artiste : _________________ Le Partenaire : _________________</p></div>`
  },
  {
    code: 'mus_accord_ecole_musique', name: "Accord de service d'ecole de musique (cours)", category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord d'inscription et de prestation pedagogique pour des cours de musique dans une ecole ou conservatoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'ecole_nom',label:"Nom de l'ecole de musique",type:'text',required:true},
      {key:'eleve_nom',label:"Nom de l'eleve",type:'text',required:true},
      {key:'discipline',label:"Discipline enseignee",type:'text',required:true},
      {key:'frais_scolarite',label:"Frais de scolarite (FCFA/mois)",type:'text',required:true},
      {key:'date_debut_cours',label:"Date de debut des cours",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ECOLE DE MUSIQUE</h1><p><strong>{{ecole_nom}}</strong> (Ecole) s'engage a dispenser des cours de <strong>{{discipline}}</strong> a <strong>{{eleve_nom}}</strong> (Eleve).</p><h2>Article 1 – Programme</h2><p>Les cours suivront un programme progressif adapte au niveau de l'Eleve, avec evaluation trimestrielle.</p><h2>Article 2 – Frais</h2><p>Les frais de scolarite sont de {{frais_scolarite}} FCFA par mois, payables en debut de mois.</p><h2>Article 3 – Debut</h2><p>Les cours debutent le {{date_debut_cours}}.</p><p>Fait a Abidjan, le ____________________</p><p>L'Ecole : _________________ L'Eleve (ou tuteur) : _________________</p></div>`
  },
  {
    code: 'mus_accord_formation_beatmaker', name: "Accord de service de formation de beatmaker", category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Accord de formation pratique pour devenir beatmaker, incluant production musicale numerique, sampling et beatmaking africain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'formateur_nom',label:"Nom du formateur / organisme",type:'text',required:true},
      {key:'stagiaire_nom',label:"Nom du stagiaire",type:'text',required:true},
      {key:'contenu_formation',label:"Contenu de la formation",type:'textarea',required:true},
      {key:'duree_formation',label:"Duree de la formation",type:'text',required:true},
      {key:'cout_formation',label:"Cout de la formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION BEATMAKER</h1><p><strong>{{formateur_nom}}</strong> (Formateur) dispense une formation en beatmaking a <strong>{{stagiaire_nom}}</strong> (Stagiaire).</p><h2>Article 1 – Contenu</h2><p>{{contenu_formation}}</p><h2>Article 2 – Duree</h2><p>La formation dure {{duree_formation}}.</p><h2>Article 3 – Cout</h2><p>Le cout est de {{cout_formation}} FCFA, payable selon echeancier convenu.</p><h2>Article 4 – Certification</h2><p>A l'issue de la formation, le Stagiaire recevra une attestation de completion signee par le Formateur.</p><p>Fait a Abidjan, le ____________________</p><p>Le Formateur : _________________ Le Stagiaire : _________________</p></div>`
  },
  {
    code: 'mus_accord_podcast_musical', name: "Accord de service de podcast musical", category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Accord de creation et de diffusion d'un podcast musical, definissant les droits d'utilisation des extraits sonores et la repartition des revenus publicitaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'podcasteur_nom',label:"Nom du podcasteur",type:'text',required:true},
      {key:'partenaire_nom',label:"Nom du partenaire / sponsor",type:'text',required:true},
      {key:'nom_podcast',label:"Nom du podcast",type:'text',required:true},
      {key:'frequence_publication',label:"Frequence de publication",type:'text',required:true},
      {key:'remuneration_episode',label:"Remuneration par episode (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PODCAST MUSICAL</h1><p><strong>{{podcasteur_nom}}</strong> (Podcasteur) s'engage a produire le podcast <em>{{nom_podcast}}</em> avec le soutien de <strong>{{partenaire_nom}}</strong> (Partenaire).</p><h2>Article 1 – Frequence</h2><p>Le podcast sera publie selon la frequence suivante : {{frequence_publication}}.</p><h2>Article 2 – Remuneration</h2><p>La remuneration est de {{remuneration_episode}} FCFA par episode publie.</p><h2>Article 3 – Droits musicaux</h2><p>Le Podcasteur s'engage a n'utiliser que des extraits musicaux sous licence libre ou pour lesquels il detient une autorisation, et a declarer les usages aupres des organismes competents.</p><p>Fait a Abidjan, le ____________________</p><p>Le Podcasteur : _________________ Le Partenaire : _________________</p></div>`
  },
  {
    code: 'mus_cession_catalogue_musical', name: "Accord de cession de catalogue musical (bibliotheque)", category: 'commercial_financier', price: 8000, priceMax: 25000,
    description: "Accord de cession ou de licence d'un catalogue musical complet pour constitution d'une bibliotheque musicale (library music), a usage commercial ou audiovisuel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'cedant_nom',label:"Nom du cedant (artiste ou label)",type:'text',required:true},
      {key:'acquereur_nom',label:"Nom de l'acquereur",type:'text',required:true},
      {key:'description_catalogue',label:"Description du catalogue",type:'textarea',required:true},
      {key:'prix_cession',label:"Prix de cession (FCFA)",type:'text',required:true},
      {key:'type_cession',label:"Type : cession definitive ou licence",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE CATALOGUE MUSICAL</h1><p><strong>{{cedant_nom}}</strong> (Cedant) transfere a <strong>{{acquereur_nom}}</strong> (Acquereur) les droits sur le catalogue suivant : {{description_catalogue}}.</p><h2>Article 1 – Nature</h2><p>La presente operation est une {{type_cession}}.</p><h2>Article 2 – Prix</h2><p>Le prix est de {{prix_cession}} FCFA, payable selon les modalites definies en annexe.</p><h2>Article 3 – Garanties</h2><p>Le Cedant garantit etre titulaire de tous les droits sur le catalogue et qu'aucun litige n'est en cours relatif aux oeuvres cédées.</p><p>Fait a Abidjan, le ____________________</p><p>Le Cedant : _________________ L'Acquereur : _________________</p></div>`
  },
  {
    code: 'mus_rapport_performance_label', name: "Rapport de performance label musical", category: 'commercial_financier', price: 3500, priceMax: 10000,
    description: "Rapport de performance commerciale d'un label musical, incluant ventes physiques, streams, droits collectes et bilan artistique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'label_nom',label:"Nom du label",type:'text',required:true},
      {key:'periode_rapport',label:"Periode couverte",type:'text',required:true},
      {key:'streams_totaux',label:"Nombre total de streams",type:'text',required:true},
      {key:'revenus_totaux',label:"Revenus totaux (FCFA)",type:'text',required:true},
      {key:'bilan_artistique',label:"Bilan artistique et perspectives",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – LABEL MUSICAL</h1><h2>Label : {{label_nom}}</h2><h2>Periode : {{periode_rapport}}</h2><h2>1. Indicateurs streaming</h2><p>Streams totaux : {{streams_totaux}}</p><h2>2. Revenus</h2><p>Revenus totaux : {{revenus_totaux}} FCFA</p><h2>3. Bilan artistique</h2><p>{{bilan_artistique}}</p><h2>4. Recommandations</h2><p>Ce rapport sera partage avec les artistes signes et les investisseurs du label.</p></div>`
  },
  {
    code: 'mus_plan_dev_carriere', name: "Plan de developpement carriere musicale", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Plan strategique de developpement de carriere pour un artiste musical africain, couvrant la production, la distribution, la promotion et le monetisation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'artiste_nom',label:"Nom de l'artiste",type:'text',required:true},
      {key:'vision_artistique',label:"Vision artistique",type:'textarea',required:true},
      {key:'objectifs_12mois',label:"Objectifs sur 12 mois",type:'textarea',required:true},
      {key:'budget_previsionnel',label:"Budget previsionnel (FCFA)",type:'text',required:true},
      {key:'marches_vises',label:"Marches vises",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DEVELOPPEMENT CARRIERE MUSICALE</h1><h2>Artiste : {{artiste_nom}}</h2><h2>1. Vision</h2><p>{{vision_artistique}}</p><h2>2. Objectifs 12 mois</h2><p>{{objectifs_12mois}}</p><h2>3. Budget</h2><p>Budget previsionnel : {{budget_previsionnel}} FCFA.</p><h2>4. Marches</h2><p>Marches vises : {{marches_vises}}.</p><h2>5. Plan d'action</h2><p>Le plan couvre : production album/EP, distribution numerique, campagnes digitales, bookings de concerts, partenariats marques, et gestion des droits BURIDA.</p></div>`
  },
  {
    code: 'mus_charte_creation_musicale', name: "Charte de la creation musicale africaine et des droits des artistes", category: 'commercial_financier', price: 3000, priceMax: 9000,
    description: "Charte definissant les principes fondamentaux de la creation musicale africaine, la protection des droits des artistes et le respect de l'ecosysteme musical ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'signataire_nom',label:"Nom du signataire",type:'text',required:true},
      {key:'role_ecosysteme',label:"Role dans l'ecosysteme musical",type:'text',required:true},
      {key:'engagements_signe',label:"Engagements specifiques pris",type:'textarea',required:true},
      {key:'date_adhesion',label:"Date d'adhesion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA CREATION MUSICALE AFRICAINE</h1><h2>Signataire : {{signataire_nom}} – Role : {{role_ecosysteme}}</h2><h2>Preambule</h2><p>La presente charte affirme que la musique africaine est un patrimoine vivant dont les createurs meritent une protection juridique, une remuneration equitable et une reconnaissance internationale.</p><h2>Article 1 – Droits des artistes</h2><p>Tout artiste a droit a la remuneration de ses oeuvres, a la gestion transparente de ses droits, et a etre protege contre le piratage et l'exploitation abusive.</p><h2>Article 2 – Engagements</h2><p>{{engagements_signe}}</p><h2>Article 3 – Adhesion</h2><p>Le signataire soussigne adhere a la presente charte le {{date_adhesion}} et s'engage a en respecter les principes dans toutes ses activites.</p><p>Signature : _________________</p></div>`
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
  console.log(`Batch 86b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
