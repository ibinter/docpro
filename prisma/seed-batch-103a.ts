import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── MOB4 : Mobilité urbaine CI / Transport en commun (25) ───────────────
  {
    code: 'mob4_sotra_bus',
    name: "Accord de service de transport urbain par bus (modele SOTRA CI)",
    category: 'transport_logistique', price: 5000, priceMax: 15000,
    description: "Accord de service de transport urbain par bus inspire du modele SOTRA, encadrant les obligations de l operateur, les lignes desservies et les conditions tarifaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'operateur',label:"Nom de l operateur de transport",type:'text',required:true},
      {key:'lignes_desservies',label:"Lignes de bus desservies",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du service",type:'date',required:true},
      {key:'duree_contrat',label:"Duree du contrat (en mois)",type:'text',required:true},
      {key:'tarif_unitaire',label:"Tarif unitaire par voyage (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT URBAIN PAR BUS</h1><p>Entre la Societe de Transport d Abidjan (SOTRA) ou son partenaire agree et l operateur <strong>{{operateur}}</strong>, il est convenu ce qui suit :</p><h2>Article 1 - Objet</h2><p>Le present accord definit les conditions d exploitation des lignes de bus <strong>{{lignes_desservies}}</strong> dans le cadre du reseau de transport urbain de la ville d Abidjan.</p><h2>Article 2 - Duree</h2><p>Le service prend effet le <strong>{{date_debut}}</strong> pour une duree de <strong>{{duree_contrat}}</strong> mois renouvelables par accord des parties.</p><h2>Article 3 - Tarification</h2><p>Le tarif unitaire par voyage est fixe a <strong>{{tarif_unitaire}}</strong> FCFA, conformement aux directives de l autorite organisatrice des transports.</p><h2>Article 4 - Obligations de l operateur</h2><p>L operateur s engage a maintenir les vehicules en bon etat, respecter les horaires et assurer la securite des passagers.</p><h2>Article 5 - Droit applicable</h2><p>Le present accord est regi par le droit ivoirien et les textes reglementaires OHADA applicables au secteur du transport.</p></div>` },

  {
    code: 'mob4_minibus_gbaka',
    name: "Accord de service de minibus et gbaka (transport informel formalise)",
    category: 'transport_logistique', price: 3000, priceMax: 9000,
    description: "Convention de formalisation du service de transport par minibus de type gbaka, encadrant l affiliation a une cooperative, les itineraires et les obligations de securite.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'chauffeur',label:"Nom du chauffeur / exploitant",type:'text',required:true},
      {key:'cooperative',label:"Nom de la cooperative d affiliation",type:'text',required:true},
      {key:'itineraire',label:"Itineraire principal desservi",type:'text',required:true},
      {key:'date_adhesion',label:"Date d adhesion",type:'date',required:true},
      {key:'cotisation',label:"Montant de la cotisation mensuelle (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MINIBUS ET GBAKA</h1><h2>Transport Informel Formalise</h2><p>Le present accord est conclu entre la cooperative <strong>{{cooperative}}</strong> et le chauffeur-exploitant <strong>{{chauffeur}}</strong>.</p><h2>Article 1 - Adhesion</h2><p>A compter du <strong>{{date_adhesion}}</strong>, le chauffeur est membre de la cooperative et beneficie de l encadrement technique et juridique associe.</p><h2>Article 2 - Itineraire</h2><p>L exploitant est autorise a desservir l itineraire <strong>{{itineraire}}</strong> dans le respect des horaires et capacites definis par la cooperative.</p><h2>Article 3 - Cotisation</h2><p>Une cotisation mensuelle de <strong>{{cotisation}}</strong> FCFA est due par l exploitant pour le maintien de ses droits d exploitation.</p><h2>Article 4 - Securite</h2><p>Le vehicule doit etre en conformite technique et l exploitant doit detenir les documents de conduite valides.</p></div>` },

  {
    code: 'mob4_taxi_conventionnel',
    name: "Accord de service de taxi conventionnel (woro-woro reglemente)",
    category: 'transport_logistique', price: 3000, priceMax: 8000,
    description: "Accord de service encadrant l exploitation d un taxi conventionnel de type woro-woro, ses obligations envers le syndicat agree et les passagers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'exploitant',label:"Nom de l exploitant",type:'text',required:true},
      {key:'immatriculation',label:"Immatriculation du vehicule",type:'text',required:true},
      {key:'zone_exploitation',label:"Zone d exploitation autorisee",type:'text',required:true},
      {key:'date_autorisation',label:"Date d autorisation",type:'date',required:true},
      {key:'syndicat',label:"Syndicat de rattachement",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TAXI CONVENTIONNEL (WORO-WORO)</h1><p>Entre le syndicat <strong>{{syndicat}}</strong> et l exploitant <strong>{{exploitant}}</strong>, propriétaire du vehicule immatricule <strong>{{immatriculation}}</strong> :</p><h2>Article 1 - Autorisation d exploitation</h2><p>A compter du <strong>{{date_autorisation}}</strong>, l exploitant est autorise a exercer dans la zone <strong>{{zone_exploitation}}</strong>.</p><h2>Article 2 - Obligations</h2><p>L exploitant s engage a respecter les tarifs homologues, a maintenir le vehicule en etat et a porter sa carte professionnelle.</p><h2>Article 3 - Sanctions</h2><p>Tout manquement aux obligations du present accord expose l exploitant a des sanctions disciplinaires du syndicat, pouvant aller jusqu au retrait de l autorisation.</p></div>` },

  {
    code: 'mob4_vtc_uber_heetch',
    name: "Accord de service de VTC (Uber, Heetch Afrique)",
    category: 'transport_logistique', price: 4000, priceMax: 12000,
    description: "Convention de partenariat entre une plateforme VTC (Uber, Heetch) et un chauffeur partenaire en Cote d Ivoire, fixant les conditions d utilisation de la plateforme et les commissions.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'plateforme',label:"Nom de la plateforme VTC",type:'text',required:true},
      {key:'chauffeur',label:"Nom complet du chauffeur partenaire",type:'text',required:true},
      {key:'vehicule',label:"Marque, modele et immatriculation du vehicule",type:'text',required:true},
      {key:'taux_commission',label:"Taux de commission plateforme (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du partenariat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT VTC</h1><p>La plateforme <strong>{{plateforme}}</strong> et le chauffeur partenaire <strong>{{chauffeur}}</strong> conviennent des dispositions suivantes a compter du <strong>{{date_debut}}</strong>.</p><h2>Article 1 - Objet</h2><p>Le present accord regit les conditions dans lesquelles le chauffeur utilise la plateforme pour proposer des services de transport avec vehicule de tourisme avec chauffeur (VTC) en Cote d Ivoire.</p><h2>Article 2 - Vehicule</h2><p>Le vehicule utilise est : <strong>{{vehicule}}</strong>. Il doit etre en conformite avec les normes exigees par la plateforme et la reglementation ivoirienne.</p><h2>Article 3 - Commission</h2><p>La plateforme preleve une commission de <strong>{{taux_commission}}</strong>% sur chaque course realisee via l application.</p><h2>Article 4 - Statut</h2><p>Le chauffeur partenaire agit en qualite de prestataire independant et non de salarie de la plateforme.</p></div>` },

  {
    code: 'mob4_covoiturage',
    name: "Accord de service de covoiturage (Taxis-CI, Afrique)",
    category: 'transport_logistique', price: 2500, priceMax: 7000,
    description: "Convention de service de covoiturage entre une plateforme numerique africaine et un conducteur, fixant les conditions de partage de frais et les responsabilites.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'plateforme',label:"Nom de la plateforme de covoiturage",type:'text',required:true},
      {key:'conducteur',label:"Nom complet du conducteur",type:'text',required:true},
      {key:'trajet_type',label:"Trajet habituel propose",type:'text',required:true},
      {key:'contribution',label:"Contribution passager par trajet (FCFA)",type:'text',required:true},
      {key:'date_inscription',label:"Date d inscription",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COVOITURAGE</h1><p>La plateforme <strong>{{plateforme}}</strong> et le conducteur <strong>{{conducteur}}</strong> s accordent sur les termes suivants a compter du <strong>{{date_inscription}}</strong>.</p><h2>Article 1 - Nature du service</h2><p>Le conducteur propose des places disponibles dans son vehicule sur le trajet <strong>{{trajet_type}}</strong>. Il ne s agit pas d une activite commerciale de transport mais d un simple partage de frais.</p><h2>Article 2 - Contribution</h2><p>La contribution par passager est fixee a <strong>{{contribution}}</strong> FCFA par trajet, couvrant uniquement les frais raisonnables du conducteur.</p><h2>Article 3 - Responsabilite</h2><p>Chaque partie conserve sa propre responsabilite. La plateforme ne saurait etre tenue responsable des incidents survenus lors des trajets.</p></div>` },

  {
    code: 'mob4_transport_scolaire',
    name: "Accord de service de transport scolaire (bus ecole)",
    category: 'transport_logistique', price: 4000, priceMax: 12000,
    description: "Convention de transport scolaire entre un etablissement d enseignement et un prestataire de bus scolaires, fixant les itineraires, les conditions de securite et la tarification.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'etablissement',label:"Nom de l etablissement scolaire",type:'text',required:true},
      {key:'prestataire',label:"Nom du prestataire de transport",type:'text',required:true},
      {key:'nombre_eleves',label:"Nombre d eleves transportes",type:'text',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel par eleve (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT SCOLAIRE</h1><p>Entre l etablissement <strong>{{etablissement}}</strong> et le prestataire de transport <strong>{{prestataire}}</strong>, il est convenu ce qui suit :</p><h2>Article 1 - Objet</h2><p>Le prestataire assure le transport de <strong>{{nombre_eleves}}</strong> eleves entre leur domicile et l etablissement scolaire, a compter du <strong>{{date_debut}}</strong>.</p><h2>Article 2 - Securite</h2><p>Les vehicules utilises doivent etre en parfait etat mecanique, equipes de ceintures de securite et conduits par des chauffeurs titulaires d un permis adapte et d un casier judiciaire vierge.</p><h2>Article 3 - Tarification</h2><p>Le tarif mensuel par eleve est fixe a <strong>{{tarif_mensuel}}</strong> FCFA, payable en debut de mois par les parents ou l etablissement.</p></div>` },

  {
    code: 'mob4_navette_entreprise',
    name: "Accord de service de navette entreprise (shuttle corporate)",
    category: 'transport_logistique', price: 5000, priceMax: 15000,
    description: "Convention de service de navette entre une entreprise et un operateur de transport, organisant le transport du personnel entre le lieu de travail et les zones residentielle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l entreprise cliente",type:'text',required:true},
      {key:'operateur',label:"Nom de l operateur de navette",type:'text',required:true},
      {key:'effectif',label:"Effectif transporte par navette",type:'text',required:true},
      {key:'points_arrets',label:"Points d arret principaux",type:'textarea',required:true},
      {key:'date_debut',label:"Date de debut du service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NAVETTE ENTREPRISE</h1><p>Entre l entreprise <strong>{{entreprise}}</strong> et l operateur <strong>{{operateur}}</strong>, le present accord organise le service de transport du personnel.</p><h2>Article 1 - Perimetre du service</h2><p>La navette transporte <strong>{{effectif}}</strong> collaborateurs avec les points d arret suivants : <strong>{{points_arrets}}</strong>. Le service debute le <strong>{{date_debut}}</strong>.</p><h2>Article 2 - Horaires</h2><p>Les horaires de passage sont definis conjointement par les parties et communiques aux beneficiaires par voie interne.</p><h2>Article 3 - Paiement</h2><p>L entreprise cliente regle mensuellement l operateur sur presentation de facture conforme au service rendu.</p></div>` },

  {
    code: 'mob4_transport_pmr',
    name: "Accord de service de transport adapte (PMR CI)",
    category: 'transport_logistique', price: 4000, priceMax: 11000,
    description: "Convention de service de transport specialise pour les personnes a mobilite reduite (PMR) en Cote d Ivoire, encadrant les vehicules adaptes, les reservations et les tarifs.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire de transport PMR",type:'text',required:true},
      {key:'organisme',label:"Organisme ou institution beneficiaire",type:'text',required:true},
      {key:'type_vehicule',label:"Type de vehicule adapte utilise",type:'text',required:true},
      {key:'tarif_course',label:"Tarif par course (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT ADAPTE (PMR)</h1><p>Le prestataire <strong>{{prestataire}}</strong> s engage envers <strong>{{organisme}}</strong> a assurer un service de transport adapte aux personnes a mobilite reduite a compter du <strong>{{date_debut}}</strong>.</p><h2>Article 1 - Vehicules</h2><p>Le service utilise des vehicules de type <strong>{{type_vehicule}}</strong>, equipes de rampes d acces, d espaces fauteuil roulant securises et conduits par un personnel forme.</p><h2>Article 2 - Reservation</h2><p>Toute reservation s effectue au moins 24 heures a l avance par telephone ou application mobile. Un accusé de reception est systematiquement transmis.</p><h2>Article 3 - Tarif</h2><p>Le tarif par course est fixe a <strong>{{tarif_course}}</strong> FCFA, avec une reduction de 30% pour les detenteurs de la carte d invalidite delivree par l Etat ivoirien.</p></div>` },

  {
    code: 'mob4_gare_routiere',
    name: "Accord de service de gare routiere (gestion)",
    category: 'transport_logistique', price: 6000, priceMax: 18000,
    description: "Convention de delegation de gestion d une gare routiere entre une collectivite ou l Etat ivoirien et un gestionnaire prive, fixant les redevances et obligations de service.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'autorite',label:"Autorite delegante (collectivite/Etat)",type:'text',required:true},
      {key:'gestionnaire',label:"Nom du gestionnaire prive",type:'text',required:true},
      {key:'gare',label:"Denomination et localisation de la gare",type:'text',required:true},
      {key:'redevance',label:"Redevance annuelle (FCFA)",type:'text',required:true},
      {key:'duree',label:"Duree de la delegation (annees)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE GARE ROUTIERE</h1><p>L autorite delegante <strong>{{autorite}}</strong> confie a <strong>{{gestionnaire}}</strong> la gestion de la gare routiere <strong>{{gare}}</strong> pour une duree de <strong>{{duree}}</strong> ans.</p><h2>Article 1 - Perimetre de la delegation</h2><p>Le gestionnaire assure l accueil des transporteurs et voyageurs, la perception des droits d entree, l entretien des installations et la securite du site.</p><h2>Article 2 - Redevance</h2><p>En contrepartie, le gestionnaire verse une redevance annuelle de <strong>{{redevance}}</strong> FCFA a l autorite delegante, payable en deux tranches egales.</p><h2>Article 3 - Controle</h2><p>L autorite delegante dispose d un droit de controle et d audit permanent sur la gestion de la gare.</p></div>` },

  {
    code: 'mob4_terminal_intermodal',
    name: "Accord de service de terminal intermodal (bus+metro)",
    category: 'transport_logistique', price: 7000, priceMax: 20000,
    description: "Convention de gestion d un terminal intermodal combinant bus et metro a Abidjan, encadrant les responsabilites des operateurs et la coordination des services.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'operateur_bus',label:"Operateur bus (ex : SOTRA)",type:'text',required:true},
      {key:'operateur_metro',label:"Operateur metro (ex : Societe du Metro d Abidjan)",type:'text',required:true},
      {key:'terminal',label:"Nom et localisation du terminal",type:'text',required:true},
      {key:'date_ouverture',label:"Date d ouverture du terminal",type:'date',required:true},
      {key:'partage_recettes',label:"Modalites de partage des recettes",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TERMINAL INTERMODAL</h1><p>L operateur bus <strong>{{operateur_bus}}</strong> et l operateur metro <strong>{{operateur_metro}}</strong> s accordent sur la gestion du terminal <strong>{{terminal}}</strong>, ouvert le <strong>{{date_ouverture}}</strong>.</p><h2>Article 1 - Coordination</h2><p>Les deux operateurs coordonnent leurs horaires afin d optimiser les correspondances et minimiser les temps d attente des voyageurs.</p><h2>Article 2 - Partage des recettes</h2><p>Les modalites de partage des recettes de billetterie sont les suivantes : <strong>{{partage_recettes}}</strong>.</p><h2>Article 3 - Infrastructure</h2><p>La maintenance du terminal est confiee conjointerement aux deux operateurs selon un plan charge etabli annuellement.</p></div>` },

  {
    code: 'mob4_ticket_multimodal',
    name: "Accord de service de ticket unique multimodal (SOTRA)",
    category: 'transport_logistique', price: 5000, priceMax: 14000,
    description: "Convention de deploiement d un ticket unique multimodal entre les operateurs de transport d Abidjan, facilitant l interoperabilite des systemes de billetterie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'consortium',label:"Nom du consortium d operateurs",type:'text',required:true},
      {key:'technologie',label:"Technologie de billettique retenue (ex : NFC, QR code)",type:'text',required:true},
      {key:'tarif_ticket',label:"Tarif du ticket multimodal (FCFA)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement du systeme",type:'date',required:true},
      {key:'zones_couvertes',label:"Zones geographiques couvertes",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TICKET UNIQUE MULTIMODAL</h1><p>Le consortium d operateurs <strong>{{consortium}}</strong> adopte le present accord pour le deploiement d un ticket unique multimodal a partir du <strong>{{date_lancement}}</strong>.</p><h2>Article 1 - Technologie</h2><p>Le systeme retenu est base sur la technologie <strong>{{technologie}}</strong>, garantissant l interoperabilite entre les reseaux bus, metro et autres modes.</p><h2>Article 2 - Tarification</h2><p>Le ticket unique est propose au tarif de <strong>{{tarif_ticket}}</strong> FCFA, valable pour un voyage sur les zones couvertes : <strong>{{zones_couvertes}}</strong>.</p><h2>Article 3 - Partage des recettes</h2><p>Un clearing mensuel est organise entre les membres du consortium pour la redistribution des recettes selon les parts de trafic.</p></div>` },

  {
    code: 'mob4_stationnement_urbain',
    name: "Accord de service de stationnement urbain (parking)",
    category: 'transport_logistique', price: 4000, priceMax: 11000,
    description: "Convention de gestion de stationnement urbain entre une collectivite ivoirienne et un operateur prive, fixant les tarifs, la maintenance et les obligations de service.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'collectivite',label:"Nom de la collectivite concedante",type:'text',required:true},
      {key:'operateur',label:"Nom de l operateur de parking",type:'text',required:true},
      {key:'site',label:"Localisation du parking",type:'text',required:true},
      {key:'capacite',label:"Capacite du parking (places)",type:'text',required:true},
      {key:'tarif_horaire',label:"Tarif horaire (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STATIONNEMENT URBAIN</h1><p>La collectivite <strong>{{collectivite}}</strong> confie a l operateur <strong>{{operateur}}</strong> la gestion du parking situe a <strong>{{site}}</strong>.</p><h2>Article 1 - Capacite et equipement</h2><p>Le parking dispose de <strong>{{capacite}}</strong> places dont au moins 5% reservees aux PMR. L operateur installe et maintient les equipements de paiement electronique.</p><h2>Article 2 - Tarification</h2><p>Le tarif horaire est fixe a <strong>{{tarif_horaire}}</strong> FCFA, avec des formules d abonnement mensuel disponibles.</p><h2>Article 3 - Reversement</h2><p>L operateur reverse 15% des recettes brutes a la collectivite a la fin de chaque trimestre.</p></div>` },

  {
    code: 'mob4_feux_tricolores',
    name: "Accord de service de gestion de feux tricolores (smart city)",
    category: 'transport_logistique', price: 8000, priceMax: 24000,
    description: "Convention de service de gestion intelligente des feux tricolores entre une collectivite ivoirienne et un prestataire technologique, dans le cadre d un projet smart city.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'collectivite',label:"Nom de la collectivite",type:'text',required:true},
      {key:'prestataire',label:"Nom du prestataire technologique",type:'text',required:true},
      {key:'nombre_carrefours',label:"Nombre de carrefours equipes",type:'text',required:true},
      {key:'duree_contrat',label:"Duree du contrat (mois)",type:'text',required:true},
      {key:'montant',label:"Montant du contrat (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE FEUX TRICOLORES INTELLIGENTS</h1><p>La collectivite <strong>{{collectivite}}</strong> et le prestataire <strong>{{prestataire}}</strong> s accordent sur le deploiement d un systeme de gestion dynamique des feux tricolores.</p><h2>Article 1 - Perimetre</h2><p>Le projet couvre <strong>{{nombre_carrefours}}</strong> carrefours strategiques de la ville, equipes de capteurs et connectes a un centre de controle centralise.</p><h2>Article 2 - Duree et financement</h2><p>Le contrat couvre <strong>{{duree_contrat}}</strong> mois pour un montant total de <strong>{{montant}}</strong> FCFA incluant installation, maintenance et formation du personnel municipal.</p><h2>Article 3 - Performance</h2><p>Le prestataire garantit un taux de disponibilite du systeme de 99% et un delai d intervention en cas de panne de 4 heures maximum.</p></div>` },

  {
    code: 'mob4_peage_urbain',
    name: "Accord de service de peage urbain (centre-ville)",
    category: 'transport_logistique', price: 7000, priceMax: 20000,
    description: "Convention de mise en place d un systeme de peage urbain dans le centre-ville d Abidjan ou d une autre commune ivoirienne, visant a reduire la congestion.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 49,
    fieldsJson: F([
      {key:'autorite',label:"Autorite responsable du peage",type:'text',required:true},
      {key:'operateur',label:"Operateur du systeme de peage",type:'text',required:true},
      {key:'zone_peage',label:"Zone ou corridors soumis au peage",type:'text',required:true},
      {key:'tarif_base',label:"Tarif de base par passage (FCFA)",type:'text',required:true},
      {key:'date_mise_en_service',label:"Date de mise en service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PEAGE URBAIN</h1><p>L autorite <strong>{{autorite}}</strong> confie a l operateur <strong>{{operateur}}</strong> la mise en place et la gestion d un systeme de peage urbain sur la zone <strong>{{zone_peage}}</strong>, effectif a compter du <strong>{{date_mise_en_service}}</strong>.</p><h2>Article 1 - Objectifs</h2><p>Le peage urbain vise a reduire la congestion dans le centre-ville en modulant le tarif selon les heures de pointe et la categorie du vehicule.</p><h2>Article 2 - Tarification</h2><p>Le tarif de base par passage est fixe a <strong>{{tarif_base}}</strong> FCFA, avec des exonerations prevues pour les vehicules d urgence, les bus de transport public et les PMR.</p><h2>Article 3 - Affectation des recettes</h2><p>Les recettes nettes du peage sont affectees en priorite au financement des infrastructures de transport alternatif.</p></div>` },

  {
    code: 'mob4_teleferique_urbain',
    name: "Accord de service de transport par cable (teleferique urbain)",
    category: 'transport_logistique', price: 8000, priceMax: 25000,
    description: "Convention de concession et d exploitation d un teleferique urbain entre une autorite publique et un operateur specialise, applicable aux projets de transport par cable en Cote d Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      {key:'concedant',label:"Autorite concedante",type:'text',required:true},
      {key:'concessionnaire',label:"Societe concessionnaire",type:'text',required:true},
      {key:'ligne',label:"Denomination et trace de la ligne",type:'text',required:true},
      {key:'capacite_horaire',label:"Capacite horaire (passagers/heure)",type:'text',required:true},
      {key:'duree_concession',label:"Duree de la concession (annees)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCESSION DE TELEFERIQUE URBAIN</h1><p>L autorite concedante <strong>{{concedant}}</strong> accorde a <strong>{{concessionnaire}}</strong> le droit d exploiter la ligne de teleferique urbain <strong>{{ligne}}</strong> pour une duree de <strong>{{duree_concession}}</strong> ans.</p><h2>Article 1 - Capacite et service</h2><p>Le systeme doit assurer une capacite de transport de <strong>{{capacite_horaire}}</strong> passagers par heure dans chaque sens, avec une frequence maximale de 3 minutes.</p><h2>Article 2 - Obligations du concessionnaire</h2><p>Le concessionnaire assure le financement, la construction, l exploitation et la maintenance du systeme a ses risques et perils.</p><h2>Article 3 - Fin de concession</h2><p>A l expiration de la concession, le systeme revient a l autorite concedante en bon etat de fonctionnement, sans indemnite.</p></div>` },

  {
    code: 'mob4_bateau_lagune',
    name: "Accord de service de transport par bateau (Abidjan lagune)",
    category: 'transport_logistique', price: 4000, priceMax: 12000,
    description: "Convention de service de transport lagunaire a Abidjan entre un operateur et l autorite portuaire ou la collectivite, encadrant les rotations, les embarcaderes et les tarifs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'operateur',label:"Nom de l operateur lagunaire",type:'text',required:true},
      {key:'autorite',label:"Autorite concedante (Mairie / Port)",type:'text',required:true},
      {key:'lignes',label:"Lignes lagunaires desservies",type:'text',required:true},
      {key:'tarif_traversee',label:"Tarif par traversee (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut d exploitation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT LAGUNAIRE</h1><p>L operateur <strong>{{operateur}}</strong> et l autorite <strong>{{autorite}}</strong> concluent le present accord pour l exploitation du service de transport lagunaire a Abidjan a partir du <strong>{{date_debut}}</strong>.</p><h2>Article 1 - Lignes</h2><p>L operateur dessert les lignes suivantes : <strong>{{lignes}}</strong>, avec des horaires de service de 6h00 a 21h00 en semaine et de 7h00 a 20h00 le weekend.</p><h2>Article 2 - Tarification</h2><p>Le tarif par traversee est fixe a <strong>{{tarif_traversee}}</strong> FCFA. Des tarifs speciaux s appliquent aux etudiants et personnes agees sur presentation d un justificatif.</p><h2>Article 3 - Securite</h2><p>Chaque embarcation doit disposer d equipements de sauvetage homologues et l operateur souscrit une assurance responsabilite civile couvrant les passagers.</p></div>` },

  {
    code: 'mob4_moto_taxi_formalise',
    name: "Accord de service de moto-taxi (formalise CI)",
    category: 'transport_logistique', price: 2500, priceMax: 7000,
    description: "Convention de formalisation du service de moto-taxi en Cote d Ivoire, encadrant l affiliation a une cooperative, les equipements de securite et les tarifs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'conducteur',label:"Nom du conducteur de moto-taxi",type:'text',required:true},
      {key:'cooperative',label:"Cooperative d affiliation",type:'text',required:true},
      {key:'immatriculation',label:"Immatriculation de la moto",type:'text',required:true},
      {key:'zone',label:"Zone d exploitation",type:'text',required:true},
      {key:'date_adhesion',label:"Date d adhesion",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MOTO-TAXI FORMALISE</h1><p>Le conducteur <strong>{{conducteur}}</strong> adhere a la cooperative <strong>{{cooperative}}</strong> a compter du <strong>{{date_adhesion}}</strong> pour exercer l activite de moto-taxi dans la zone <strong>{{zone}}</strong>.</p><h2>Article 1 - Equipements obligatoires</h2><p>Le conducteur dispose d un casque homologue pour lui et son passager, d un gilet fluorescent identifie et d une moto immatriculee <strong>{{immatriculation}}</strong> en bon etat.</p><h2>Article 2 - Tarifs</h2><p>Les tarifs sont ceux en vigueur dans la cooperative, communiques aux passagers avant chaque course.</p><h2>Article 3 - Discipline</h2><p>Le non-respect du code de la route ou des regles de la cooperative expose le conducteur a une suspension ou exclusion de la cooperative.</p></div>` },

  {
    code: 'mob4_partenariat_collectivite',
    name: "Accord de partenariat transport-collectivite locale",
    category: 'transport_logistique', price: 5000, priceMax: 15000,
    description: "Convention de partenariat entre un operateur de transport prive et une collectivite locale ivoirienne pour l amelioration de la mobilite sur le territoire communal.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'collectivite',label:"Nom de la collectivite locale",type:'text',required:true},
      {key:'operateur',label:"Nom de l operateur de transport",type:'text',required:true},
      {key:'objectifs',label:"Objectifs du partenariat",type:'textarea',required:true},
      {key:'contribution_collectivite',label:"Contribution de la collectivite",type:'textarea',required:true},
      {key:'duree',label:"Duree du partenariat (annees)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT TRANSPORT-COLLECTIVITE LOCALE</h1><p>La collectivite <strong>{{collectivite}}</strong> et l operateur de transport <strong>{{operateur}}</strong> s engagent dans un partenariat strategique pour une duree de <strong>{{duree}}</strong> ans.</p><h2>Article 1 - Objectifs</h2><p>Le partenariat vise les objectifs suivants : <strong>{{objectifs}}</strong>.</p><h2>Article 2 - Engagements de la collectivite</h2><p>La collectivite s engage a : <strong>{{contribution_collectivite}}</strong>.</p><h2>Article 3 - Engagements de l operateur</h2><p>L operateur s engage a maintenir et developper l offre de transport sur le territoire, avec un reporting trimestriel des indicateurs de service a la collectivite.</p></div>` },

  {
    code: 'mob4_suivi_gps_flotte',
    name: "Accord de service de suivi GPS flotte urbaine",
    category: 'transport_logistique', price: 4000, priceMax: 12000,
    description: "Convention de service de geolocalisation et de suivi GPS de flotte de vehicules de transport urbain, entre un operateur de transport et un prestataire technologique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'operateur',label:"Nom de l operateur de transport",type:'text',required:true},
      {key:'prestataire_tech',label:"Nom du prestataire GPS",type:'text',required:true},
      {key:'nombre_vehicules',label:"Nombre de vehicules equipes",type:'text',required:true},
      {key:'abonnement_mensuel',label:"Abonnement mensuel par vehicule (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUIVI GPS DE FLOTTE</h1><p>L operateur de transport <strong>{{operateur}}</strong> et le prestataire <strong>{{prestataire_tech}}</strong> concluent le present accord pour la mise en place d un systeme de suivi GPS sur <strong>{{nombre_vehicules}}</strong> vehicules, effectif le <strong>{{date_debut}}</strong>.</p><h2>Article 1 - Prestations</h2><p>Le prestataire installe les boitiers GPS, fournit l acces a la plateforme de suivi en temps reel et assure la maintenance du systeme.</p><h2>Article 2 - Abonnement</h2><p>L operateur regle un abonnement mensuel de <strong>{{abonnement_mensuel}}</strong> FCFA par vehicule equipe, incluant le support technique 7j/7.</p><h2>Article 3 - Donnees</h2><p>Les donnees de geolocalisation collectees restent la propriete de l operateur de transport et ne peuvent etre cedees a des tiers sans son accord.</p></div>` },

  {
    code: 'mob4_controle_technique',
    name: "Accord de service d inspection et controle technique vehicule",
    category: 'transport_logistique', price: 3000, priceMax: 8000,
    description: "Convention de service de controle technique periodique de vehicules de transport en commun en Cote d Ivoire, entre un centre agree et un operateur de transport.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'centre_controle',label:"Nom du centre de controle technique agree",type:'text',required:true},
      {key:'operateur',label:"Nom de l operateur de transport",type:'text',required:true},
      {key:'nombre_vehicules',label:"Nombre de vehicules a controler",type:'text',required:true},
      {key:'periodicite',label:"Periodicite des controles (ex : tous les 6 mois)",type:'text',required:true},
      {key:'tarif_controle',label:"Tarif par controle par vehicule (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D INSPECTION ET CONTROLE TECHNIQUE</h1><p>Le centre de controle technique agree <strong>{{centre_controle}}</strong> et l operateur <strong>{{operateur}}</strong> conviennent des modalites de controle de la flotte.</p><h2>Article 1 - Perimetre</h2><p>Le service couvre <strong>{{nombre_vehicules}}</strong> vehicules, soumis a un controle <strong>{{periodicite}}</strong>.</p><h2>Article 2 - Tarification</h2><p>Le tarif unitaire par controle est fixe a <strong>{{tarif_controle}}</strong> FCFA. Une remise de 10% est accordee pour les flottes de plus de 20 vehicules.</p><h2>Article 3 - Rapport</h2><p>A l issue de chaque controle, un rapport detaille est remis a l operateur et copie transmise a l autorite de tutelle si une non-conformite est constatee.</p></div>` },

  {
    code: 'mob4_transport_vip',
    name: "Accord de service de transport de personnes VIP (motorcade)",
    category: 'transport_logistique', price: 6000, priceMax: 18000,
    description: "Convention de service de transport VIP et de cortege officiel en Cote d Ivoire, entre une societe de securite / transport et un client institutionnel ou prive.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 56,
    fieldsJson: F([
      {key:'prestataire',label:"Nom de la societe prestataire",type:'text',required:true},
      {key:'client',label:"Nom du client (institution, entreprise)",type:'text',required:true},
      {key:'niveau_service',label:"Niveau de service (ex : Prestige, Executive)",type:'text',required:true},
      {key:'tarif_journalier',label:"Tarif journalier (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT VIP</h1><p>La societe <strong>{{prestataire}}</strong> s engage a fournir des services de transport VIP de niveau <strong>{{niveau_service}}</strong> au client <strong>{{client}}</strong> a compter du <strong>{{date_debut}}</strong>.</p><h2>Article 1 - Prestations</h2><p>Le service comprend la mise a disposition de vehicules haut de gamme avec chauffeurs professionnels formes aux protocoles de securite, planification des deplacements et coordination de cortege.</p><h2>Article 2 - Tarification</h2><p>Le tarif journalier est fixe a <strong>{{tarif_journalier}}</strong> FCFA, hors frais de deplacements longue distance factures separement.</p><h2>Article 3 - Confidentialite</h2><p>Le prestataire s engage a la plus stricte confidentialite sur les deplacements, agendas et informations du client.</p></div>` },

  {
    code: 'mob4_transport_funeraire',
    name: "Accord de service de transport funeraire",
    category: 'transport_logistique', price: 3000, priceMax: 9000,
    description: "Convention de service de transport de corps et de cortege funeraire entre une entreprise de pompes funebres et sa clientele en Cote d Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'pompes_funebres',label:"Nom de la societe de pompes funebres",type:'text',required:true},
      {key:'famille',label:"Nom de la famille ou du mandant",type:'text',required:true},
      {key:'defunt',label:"Nom du defunt",type:'text',required:true},
      {key:'trajet',label:"Trajet du convoi funeraire",type:'text',required:true},
      {key:'date_transport',label:"Date du transport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSPORT FUNERAIRE</h1><p>La societe de pompes funebres <strong>{{pompes_funebres}}</strong> et la famille <strong>{{famille}}</strong> s accordent sur les conditions du transport du defunt <strong>{{defunt}}</strong>.</p><h2>Article 1 - Objet</h2><p>Le service comprend le transport de la depouille mortelle sur le trajet <strong>{{trajet}}</strong> le <strong>{{date_transport}}</strong>, avec un vehicule funeraire adequat et le personnel qualifie.</p><h2>Article 2 - Conformite</h2><p>Le transport est effectue dans le respect des normes sanitaires et des formalites administratives ivoiriennes applicables au transport de corps.</p><h2>Article 3 - Responsabilite</h2><p>La societe de pompes funebres assume l entiere responsabilite de la dignite et de la securite du transport jusqu a la destination finale.</p></div>` },

  {
    code: 'mob4_rapport_mobilite',
    name: "Rapport de mobilite urbaine",
    category: 'transport_logistique', price: 5000, priceMax: 15000,
    description: "Rapport d analyse de la mobilite urbaine d une commune ou agglomeration ivoirienne, couvrant l offre de transport, les flux de deplacement et les recommandations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'ville',label:"Ville ou agglomeration concernee",type:'text',required:true},
      {key:'auteur',label:"Auteur ou bureau d etude",type:'text',required:true},
      {key:'periode',label:"Periode d observation",type:'text',required:true},
      {key:'principaux_constats',label:"Principaux constats",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE MOBILITE URBAINE</h1><h2>{{ville}} - {{periode}}</h2><p>Auteur : <strong>{{auteur}}</strong> | Date : <strong>{{date_rapport}}</strong></p><h2>1. Introduction</h2><p>Le present rapport analyse la situation de la mobilite urbaine dans l agglomeration de <strong>{{ville}}</strong> sur la periode <strong>{{periode}}</strong>.</p><h2>2. Principaux constats</h2><p>{{principaux_constats}}</p><h2>3. Indicateurs de performance</h2><p>Ce chapitre presente les indicateurs cles : taux de motorisation, part modale des transports en commun, temps de deplacement moyen, taux de saturation des axes principaux.</p><h2>4. Recommandations</h2><p>Sur la base des constats, le present rapport formule des recommandations prioritaires pour ameliorer la fluidite, la securite et la durabilite de la mobilite urbaine.</p></div>` },

  {
    code: 'mob4_pdu_abidjan',
    name: "Plan de deplacement urbain (PDU Abidjan)",
    category: 'transport_logistique', price: 8000, priceMax: 25000,
    description: "Document de planification strategique de la mobilite urbaine d Abidjan ou d une grande ville ivoirienne, fixant les orientations et les actions a 5-10 ans.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 51,
    fieldsJson: F([
      {key:'ville',label:"Ville concernee par le PDU",type:'text',required:true},
      {key:'autorite',label:"Autorite organisatrice des transports",type:'text',required:true},
      {key:'horizon',label:"Horizon du plan (ex : 2030, 2035)",type:'text',required:true},
      {key:'axes_strategiques',label:"Axes strategiques du PDU",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d adoption du PDU",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DEPLACEMENT URBAIN (PDU)</h1><h2>{{ville}} - Horizon {{horizon}}</h2><p>Autorite organisatrice : <strong>{{autorite}}</strong> | Adopte le : <strong>{{date_adoption}}</strong></p><h2>Preambule</h2><p>Le present Plan de Deplacement Urbain fixe le cadre strategique de la mobilite de <strong>{{ville}}</strong> a l horizon <strong>{{horizon}}</strong>, en reponse aux defis de croissance demographique et d urbanisation acceleree.</p><h2>Axes strategiques</h2><p>{{axes_strategiques}}</p><h2>Programme d actions</h2><p>Un programme d actions prioritaires est annexe au present PDU, avec un calendrier de mise en oeuvre, une estimation des couts et une identification des financements mobilisables.</p><h2>Suivi et evaluation</h2><p>Un comite de suivi se reunit deux fois par an pour evaluer l avancement et proposer les ajustements necessaires.</p></div>` },

  {
    code: 'mob4_charte_mobilite_durable',
    name: "Charte de la mobilite durable et inclusive",
    category: 'transport_logistique', price: 3000, priceMax: 9000,
    description: "Charte d engagement des acteurs de la mobilite urbaine ivoirienne pour une mobilite durable, accessible et respectueuse de l environnement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'ville',label:"Ville ou territoire concerne",type:'text',required:true},
      {key:'signataires',label:"Principaux signataires de la charte",type:'textarea',required:true},
      {key:'engagements',label:"Principaux engagements",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA MOBILITE DURABLE ET INCLUSIVE</h1><h2>{{ville}}</h2><p>Signee le <strong>{{date_signature}}</strong> par : <strong>{{signataires}}</strong></p><h2>Preambule</h2><p>Les signataires de la presente charte affirment leur volonte commune de promouvoir une mobilite urbaine durable, accessible a tous et respectueuse de l environnement a <strong>{{ville}}</strong>.</p><h2>Engagements</h2><p>{{engagements}}</p><h2>Mise en oeuvre</h2><p>Chaque signataire designe un referent mobilite charge du suivi de la mise en oeuvre des engagements. Un bilan annuel est publie et partage avec la population.</p><h2>Adhesion</h2><p>La presente charte est ouverte a l adhesion de tout acteur public ou prive partageant ses valeurs, sur simple demande motivee adressee aux co-signataires fondateurs.</p></div>` },

  // ─── VELO : Vélo urbain / Mobilité douce (25) ────────────────────────────
  {
    code: 'velo_vls_bikesharing',
    name: "Accord de service de velo en libre service (VLS bikesharing)",
    category: 'transport_logistique', price: 5000, priceMax: 15000,
    description: "Convention de mise en place et d exploitation d un systeme de velo en libre service dans une ville ivoirienne, entre une collectivite et un operateur de bikesharing.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'collectivite',label:"Nom de la collectivite",type:'text',required:true},
      {key:'operateur',label:"Nom de l operateur VLS",type:'text',required:true},
      {key:'nombre_stations',label:"Nombre de stations deployes",type:'text',required:true},
      {key:'nombre_velos',label:"Nombre de velos mis en service",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VELO EN LIBRE SERVICE (VLS)</h1><p>La collectivite <strong>{{collectivite}}</strong> et l operateur <strong>{{operateur}}</strong> conviennent de deployer un systeme de bikesharing operationnel le <strong>{{date_lancement}}</strong>.</p><h2>Article 1 - Deploiement</h2><p>Le systeme comprend <strong>{{nombre_stations}}</strong> stations et <strong>{{nombre_velos}}</strong> velos implantes dans les zones de forte demande de deplacement.</p><h2>Article 2 - Tarification</h2><p>La premiere demi-heure de trajet est gratuite. Au-dela, un tarif progressif s applique, defini conjointement par les parties et affiche sur l application mobile.</p><h2>Article 3 - Maintenance</h2><p>L operateur assure la maintenance quotidienne des velos et stations, avec un taux de disponibilite garanti de 85% du parc.</p></div>` },

  {
    code: 'velo_trottinette_electrique',
    name: "Accord de service de trottinette electrique en libre service (e-scooter)",
    category: 'transport_logistique', price: 5000, priceMax: 14000,
    description: "Convention de deploiement d un service de trottinettes electriques en libre service dans une ville ivoirienne, encadrant la zone d exploitation et les obligations de securite.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'operateur',label:"Nom de l operateur e-scooter",type:'text',required:true},
      {key:'collectivite',label:"Nom de la collectivite",type:'text',required:true},
      {key:'nombre_engins',label:"Nombre d engins deployes",type:'text',required:true},
      {key:'zone_service',label:"Zone de service autorisee",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TROTTINETTE ELECTRIQUE EN LIBRE SERVICE</h1><p>L operateur <strong>{{operateur}}</strong> est autorise par la collectivite <strong>{{collectivite}}</strong> a deployer <strong>{{nombre_engins}}</strong> trottinettes electriques en libre service dans la zone <strong>{{zone_service}}</strong>, a partir du <strong>{{date_debut}}</strong>.</p><h2>Article 1 - Zone de service</h2><p>L exploitation est strictement limitee a la zone definie. Des geofences electroniques empeche l utilisation hors zone et dans les zones pietonnisees protegees.</p><h2>Article 2 - Securite</h2><p>L operateur met a disposition des casques en option et diffuse des campagnes de sensibilisation a la securite des utilisateurs.</p><h2>Article 3 - Redevance</h2><p>L operateur verse une redevance mensuelle a la collectivite et s engage a retirer les engins signales defectueux dans les 2 heures.</p></div>` },

  {
    code: 'velo_livraison_cargo',
    name: "Accord de service de livraison a velo cargo",
    category: 'transport_logistique', price: 3000, priceMax: 9000,
    description: "Convention de service de livraison du dernier kilometre a velo cargo en milieu urbain africain, entre un prestataire de logistique verte et un commercant ou e-commercant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire de livraison velo",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'zone_livraison',label:"Zone de livraison",type:'text',required:true},
      {key:'tarif_colis',label:"Tarif par colis livre (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LIVRAISON A VELO CARGO</h1><p>Le prestataire <strong>{{prestataire}}</strong> s engage a assurer la livraison du dernier kilometre pour le client <strong>{{client}}</strong> dans la zone <strong>{{zone_livraison}}</strong> a partir du <strong>{{date_debut}}</strong>.</p><h2>Article 1 - Perimetre</h2><p>Le service couvre les livraisons de colis de moins de 30 kg a destination des particuliers et commerces de la zone definie, exclusivement par velo cargo.</p><h2>Article 2 - Tarification</h2><p>Le tarif unitaire est de <strong>{{tarif_colis}}</strong> FCFA par colis, avec une majoration de 20% pour les livraisons expresses en moins de 2 heures.</p><h2>Article 3 - Traçabilite</h2><p>Chaque livraison fait l objet d une notification electronique au client et d une preuve de livraison numerique.</p></div>` },

  {
    code: 'velo_mototaxi_electrique',
    name: "Accord de service de moto-taxi electrique (boda boda electrique)",
    category: 'transport_logistique', price: 3500, priceMax: 10000,
    description: "Convention de service de moto-taxi electrique en Afrique de l Ouest, encadrant l affiliation, la recharge et les modalites tarifaires dans un cadre eco-responsable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'conducteur',label:"Nom du conducteur",type:'text',required:true},
      {key:'cooperative',label:"Cooperative ou operateur",type:'text',required:true},
      {key:'modele_moto',label:"Modele de la moto electrique",type:'text',required:true},
      {key:'tarif_km',label:"Tarif par kilometre (FCFA)",type:'text',required:true},
      {key:'date_adhesion',label:"Date d adhesion",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MOTO-TAXI ELECTRIQUE</h1><p>Le conducteur <strong>{{conducteur}}</strong> rejoint l operateur <strong>{{cooperative}}</strong> le <strong>{{date_adhesion}}</strong> pour exercer avec la moto electrique <strong>{{modele_moto}}</strong>.</p><h2>Article 1 - Equipements</h2><p>La moto electrique est fournie par l operateur en leasing. Le conducteur est responsable de sa bonne utilisation et de la recharge quotidienne aux stations partenaires.</p><h2>Article 2 - Tarification</h2><p>Le tarif applique aux passagers est de <strong>{{tarif_km}}</strong> FCFA par kilometre, calcule via l application mobile de l operateur.</p><h2>Article 3 - Environnement</h2><p>L utilisation d un vehicule electrique s inscrit dans la politique de mobilite durable de l operateur. La batterie usagee est retournee a l operateur pour recyclage.</p></div>` },

  {
    code: 'velo_location_electrique',
    name: "Accord de service de location de velos electriques",
    category: 'transport_logistique', price: 3000, priceMax: 9000,
    description: "Convention de location de velos electriques entre un loueur et un client particulier ou entreprise en Afrique de l Ouest, avec modalites de depot de garantie et d assurance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'loueur',label:"Nom du loueur",type:'text',required:true},
      {key:'locataire',label:"Nom du locataire",type:'text',required:true},
      {key:'modele_velo',label:"Modele du velo electrique loue",type:'text',required:true},
      {key:'duree_location',label:"Duree de la location",type:'text',required:true},
      {key:'tarif_journalier',label:"Tarif journalier (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LOCATION DE VELO ELECTRIQUE</h1><p>Le loueur <strong>{{loueur}}</strong> met a disposition du locataire <strong>{{locataire}}</strong> un velo electrique de modele <strong>{{modele_velo}}</strong> pour une duree de <strong>{{duree_location}}</strong> au tarif journalier de <strong>{{tarif_journalier}}</strong> FCFA.</p><h2>Article 1 - Depot de garantie</h2><p>Un depot de garantie est percu a la remise du vehicule. Il est restitue a la fin de la location sous deduction des eventuels dommages constates.</p><h2>Article 2 - Obligations du locataire</h2><p>Le locataire s engage a ne pas sous-louer le velo, a le stocker en lieu securise et a le restituer dans l etat dans lequel il l a recu.</p><h2>Article 3 - Assurance</h2><p>Le loueur fournit une assurance de base contre le vol et les dommages accidentels. Une couverture etendue est disponible en option.</p></div>` },

  {
    code: 'velo_maintenance',
    name: "Accord de service de maintenance de velos",
    category: 'transport_logistique', price: 2500, priceMax: 7000,
    description: "Convention de maintenance et reparation de velos entre un atelier agree et un operateur de bikesharing ou une flotte d entreprise en Afrique de l Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'atelier',label:"Nom de l atelier de maintenance",type:'text',required:true},
      {key:'client',label:"Nom du client (operateur ou entreprise)",type:'text',required:true},
      {key:'flotte',label:"Taille de la flotte a maintenir (velos)",type:'text',required:true},
      {key:'periodicite',label:"Periodicite de la maintenance preventive",type:'text',required:true},
      {key:'tarif_forfaitaire',label:"Tarif forfaitaire mensuel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MAINTENANCE DE VELOS</h1><p>L atelier <strong>{{atelier}}</strong> assure la maintenance d une flotte de <strong>{{flotte}}</strong> velos pour le client <strong>{{client}}</strong>.</p><h2>Article 1 - Maintenance preventive</h2><p>L atelier effectue une maintenance preventive <strong>{{periodicite}}</strong> : verification des freins, pneumatiques, chaine, eclairage et equipements de securite.</p><h2>Article 2 - Maintenance corrective</h2><p>Toute panne signalee est prise en charge dans un delai maximum de 48 heures. Les pieces de remplacement sont fournies au prix du marche sans marge.</p><h2>Article 3 - Tarification</h2><p>La maintenance preventive est couverte par un forfait mensuel de <strong>{{tarif_forfaitaire}}</strong> FCFA. Les reparations correctives font l objet de bons de commande separes.</p></div>` },

  {
    code: 'velo_piste_cyclable',
    name: "Accord de service d amenagement de piste cyclable (collectivite)",
    category: 'transport_logistique', price: 7000, priceMax: 21000,
    description: "Convention de maitrise d oeuvre pour l amenagement de pistes cyclables dans une commune ivoirienne, entre une collectivite et un bureau d etudes ou une entreprise de travaux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 53,
    fieldsJson: F([
      {key:'collectivite',label:"Nom de la collectivite maitresse d ouvrage",type:'text',required:true},
      {key:'entreprise',label:"Nom de l entreprise ou bureau d etudes",type:'text',required:true},
      {key:'lineaire',label:"Lineaire de piste a amenager (km)",type:'text',required:true},
      {key:'montant',label:"Montant du marche (FCFA)",type:'text',required:true},
      {key:'date_debut_travaux',label:"Date de debut des travaux",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D AMENAGEMENT DE PISTE CYCLABLE</h1><p>La collectivite <strong>{{collectivite}}</strong> confie a <strong>{{entreprise}}</strong> l amenagement de <strong>{{lineaire}}</strong> km de piste cyclable pour un montant de <strong>{{montant}}</strong> FCFA.</p><h2>Article 1 - Objet des travaux</h2><p>Les travaux debutent le <strong>{{date_debut_travaux}}</strong> et comprennent : marquage au sol, signalisation verticale, eclairage, espaces de stationnement velo et amenagements securitaires aux intersections.</p><h2>Article 2 - Normes</h2><p>Les amenagements respectent les normes techniques en vigueur et les recommandations du schema directeur cyclable de la commune.</p><h2>Article 3 - Reception</h2><p>La reception des travaux est prononcee par la collectivite apres verification de la conformite avec les plans approuves.</p></div>` },

  {
    code: 'velo_intermodalite',
    name: "Accord de partenariat velo-transport collectif (intermodalite)",
    category: 'transport_logistique', price: 4000, priceMax: 12000,
    description: "Convention de partenariat entre un operateur de velos en libre service et un operateur de transport en commun pour favoriser l intermodalite dans une agglomeration africaine.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'operateur_velo',label:"Nom de l operateur velo",type:'text',required:true},
      {key:'operateur_tc',label:"Nom de l operateur transport en commun",type:'text',required:true},
      {key:'ville',label:"Ville concernee",type:'text',required:true},
      {key:'offre_combinee',label:"Description de l offre combinee",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement du partenariat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT VELO-TRANSPORT COLLECTIF</h1><p>L operateur velo <strong>{{operateur_velo}}</strong> et l operateur de transport en commun <strong>{{operateur_tc}}</strong> s associent pour developper l intermodalite a <strong>{{ville}}</strong> a compter du <strong>{{date_lancement}}</strong>.</p><h2>Article 1 - Offre combinee</h2><p>{{offre_combinee}}</p><h2>Article 2 - Integration tarifaire</h2><p>Un tarif combine est propose aux usagers via une application unique, avec des remises incitant a l usage croise des deux modes.</p><h2>Article 3 - Stations de correspondance</h2><p>Des stations velo sont implantees prioritairement aux acces des gares et arrets principaux de transport en commun, dans un perimetre de 200 metres.</p></div>` },

  {
    code: 'velo_formation_securite',
    name: "Accord de service de formation velo securite routiere",
    category: 'transport_logistique', price: 2500, priceMax: 7000,
    description: "Convention de formation a la securite routiere a velo entre un organisme formateur et une collectivite, ecole ou entreprise en Afrique de l Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'formateur',label:"Nom de l organisme formateur",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du beneficiaire (ecole, entreprise)",type:'text',required:true},
      {key:'nombre_participants',label:"Nombre de participants a former",type:'text',required:true},
      {key:'duree_formation',label:"Duree totale de la formation (heures)",type:'text',required:true},
      {key:'date_formation',label:"Date de debut de la formation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION VELO SECURITE ROUTIERE</h1><p>L organisme <strong>{{formateur}}</strong> dispense une formation velo et securite routiere a <strong>{{nombre_participants}}</strong> participants de <strong>{{beneficiaire}}</strong> pour une duree de <strong>{{duree_formation}}</strong> heures, debutant le <strong>{{date_formation}}</strong>.</p><h2>Article 1 - Contenu de la formation</h2><p>La formation couvre : regles de circulation, equipements de securite obligatoires, techniques de conduite en milieu urbain, entretien de base du velo et conduite de nuit.</p><h2>Article 2 - Attestation</h2><p>Une attestation de formation est remise a chaque participant ayant suivi l integralite du programme.</p><h2>Article 3 - Materiels</h2><p>Le formateur fournit les velos de pratique, casques et equipements pedagogiques. Le beneficiaire met a disposition un espace de pratique adapte.</p></div>` },

  {
    code: 'velo_stationnement_securise',
    name: "Accord de service de stationnement velo securise",
    category: 'transport_logistique', price: 2500, priceMax: 7000,
    description: "Convention de service de stationnement securise pour velos dans un espace prive ou public, entre un gestionnaire de stationnement et un client abonne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'gestionnaire',label:"Nom du gestionnaire du stationnement",type:'text',required:true},
      {key:'abonne',label:"Nom de l abonne",type:'text',required:true},
      {key:'localisation',label:"Localisation du stationnement",type:'text',required:true},
      {key:'abonnement_mensuel',label:"Abonnement mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut de l abonnement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STATIONNEMENT VELO SECURISE</h1><p>Le gestionnaire <strong>{{gestionnaire}}</strong> propose a l abonne <strong>{{abonne}}</strong> un emplacement de stationnement velo securise situe a <strong>{{localisation}}</strong>, a compter du <strong>{{date_debut}}</strong>.</p><h2>Article 1 - Service</h2><p>L espace de stationnement est securise par controle d acces electronique, videosurveillance et sous abri. L acces est disponible 24h/24, 7j/7.</p><h2>Article 2 - Abonnement</h2><p>L abonnement mensuel est de <strong>{{abonnement_mensuel}}</strong> FCFA, payable d avance. Il couvre un emplacement nominatif et non transferable.</p><h2>Article 3 - Responsabilite</h2><p>Le gestionnaire est responsable de la surveillance generale du site. En cas de vol constate avec effraction du systeme de securite, une indemnite est versee a l abonne.</p></div>` },

  {
    code: 'velo_taxi_pousse',
    name: "Accord de service de velo-taxi (pousse-pousse motorise)",
    category: 'transport_logistique', price: 2500, priceMax: 7000,
    description: "Convention de service de velo-taxi ou pousse-pousse motorise entre un conducteur et une cooperative de mobilite douce en Afrique de l Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'conducteur',label:"Nom du conducteur",type:'text',required:true},
      {key:'cooperative',label:"Nom de la cooperative",type:'text',required:true},
      {key:'zone',label:"Zone d exploitation",type:'text',required:true},
      {key:'tarif_course',label:"Tarif de base par course (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VELO-TAXI</h1><p>Le conducteur <strong>{{conducteur}}</strong> s affilie a la cooperative <strong>{{cooperative}}</strong> pour exercer l activite de velo-taxi dans la zone <strong>{{zone}}</strong> a compter du <strong>{{date_debut}}</strong>.</p><h2>Article 1 - Exercice</h2><p>Le velo-taxi est un service de transport de personnes ou de petits colis par cycle motorise, dans le respect du code de la route et des normes sanitaires.</p><h2>Article 2 - Tarification</h2><p>Le tarif de base est fixe a <strong>{{tarif_course}}</strong> FCFA, complement par un tarif kilometric affiche clairement sur le vehicule.</p><h2>Article 3 - Identification</h2><p>Le conducteur porte le gilet de la cooperative et son badge d identification en cours de validite.</p></div>` },

  {
    code: 'velo_programme_entreprise',
    name: "Accord de service de promotion du velo en entreprise (programme)",
    category: 'transport_logistique', price: 4000, priceMax: 12000,
    description: "Convention de mise en oeuvre d un programme de promotion du velo comme mode de deplacement domicile-travail dans une entreprise ivoirienne ou ouest-africaine.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l entreprise",type:'text',required:true},
      {key:'prestataire',label:"Nom du prestataire programme velo",type:'text',required:true},
      {key:'effectif_cible',label:"Effectif cible par le programme",type:'text',required:true},
      {key:'actions',label:"Actions prevues du programme",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PROMOTION DU VELO EN ENTREPRISE</h1><p>L entreprise <strong>{{entreprise}}</strong> et le prestataire <strong>{{prestataire}}</strong> lancent un programme de promotion du velo pour <strong>{{effectif_cible}}</strong> collaborateurs, demarrant le <strong>{{date_lancement}}</strong>.</p><h2>Article 1 - Actions</h2><p>{{actions}}</p><h2>Article 2 - Mesures incitatives</h2><p>L entreprise met en place : un local velo securise, des vestiaires/douches pour les cyclistes et une indemnite kilometrique velo conforme a la reglementation.</p><h2>Article 3 - Suivi</h2><p>Le prestataire effectue un bilan semestriel du programme avec indicateurs de participation et de reduction des emissions de CO2.</p></div>` },

  {
    code: 'velo_micro_mobilite',
    name: "Accord de service de micro-mobilite (delivery last mile)",
    category: 'transport_logistique', price: 4000, priceMax: 11000,
    description: "Convention de service de micro-mobilite pour la livraison du dernier kilometre entre un operateur logistique et un prestataire de micro-mobilite en milieu urbain africain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'operateur_logistique',label:"Nom de l operateur logistique",type:'text',required:true},
      {key:'prestataire_mobilite',label:"Nom du prestataire de micro-mobilite",type:'text',required:true},
      {key:'engins',label:"Types d engins utilises",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel de livraisons prevu",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MICRO-MOBILITE - LAST MILE</h1><p>L operateur logistique <strong>{{operateur_logistique}}</strong> fait appel au prestataire <strong>{{prestataire_mobilite}}</strong> pour assurer la livraison du dernier kilometre par <strong>{{engins}}</strong>, a partir du <strong>{{date_debut}}</strong>.</p><h2>Article 1 - Volumes</h2><p>Le volume mensuel prevu est de <strong>{{volume_mensuel}}</strong> livraisons. Le prestataire garantit un taux de livraison reussie de 95% dans les delais convenus.</p><h2>Article 2 - Traçabilite</h2><p>Chaque livraison est tracee par GPS et le destinataire recoit une notification de livraison avec preuve photographique.</p><h2>Article 3 - Eco-engagement</h2><p>Le prestataire s engage a utiliser exclusivement des engins non-polluants ou electriques pour l ensemble des livraisons couvertes par le present accord.</p></div>` },

  {
    code: 'velo_ecole_enfants',
    name: "Accord de service de velo-ecole (enfants)",
    category: 'transport_logistique', price: 2500, priceMax: 7000,
    description: "Convention de service de velo-ecole entre un organisme specialise et un etablissement scolaire ivoirien, pour apprendre aux enfants a circuler a velo en securite.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'organisme',label:"Nom de l organisme velo-ecole",type:'text',required:true},
      {key:'etablissement',label:"Nom de l etablissement scolaire",type:'text',required:true},
      {key:'classe',label:"Niveaux scolaires cibles",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de seances prevues",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du programme",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VELO-ECOLE</h1><p>L organisme <strong>{{organisme}}</strong> intervient dans l etablissement <strong>{{etablissement}}</strong> pour animer un programme de velo-ecole destine aux eleves de <strong>{{classe}}</strong>, a partir du <strong>{{date_debut}}</strong>.</p><h2>Article 1 - Programme</h2><p>Le programme comprend <strong>{{nombre_seances}}</strong> seances couvrant : equilibre et maniement du velo, code de la route adapte aux enfants, securite en milieu urbain et entretien de base.</p><h2>Article 2 - Encadrement</h2><p>Chaque seance est animee par un educateur qualifie, assiste d enseignants de l etablissement. Le ratio encadrant/enfant est d un animateur pour 8 eleves.</p><h2>Article 3 - Equipements</h2><p>L organisme fournit velos adaptes, casques et equipements de securite. L etablissement met a disposition un espace praticable.</p></div>` },

  {
    code: 'velo_tourisme',
    name: "Accord de service de velo-tourisme (circuits)",
    category: 'transport_logistique', price: 4000, priceMax: 12000,
    description: "Convention de service de velo-tourisme entre un operateur touristique et un guide cycliste, proposant des circuits decouverte en Cote d Ivoire ou en Afrique de l Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'operateur',label:"Nom de l operateur touristique",type:'text',required:true},
      {key:'guide',label:"Nom du guide cycliste",type:'text',required:true},
      {key:'circuits',label:"Circuits proposes",type:'textarea',required:true},
      {key:'tarif_groupe',label:"Tarif par groupe (FCFA)",type:'text',required:true},
      {key:'date_debut_saison',label:"Date de debut de saison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VELO-TOURISME</h1><p>L operateur touristique <strong>{{operateur}}</strong> et le guide cycliste <strong>{{guide}}</strong> s associent pour proposer des circuits velo a partir du <strong>{{date_debut_saison}}</strong>.</p><h2>Article 1 - Circuits</h2><p>Les circuits proposes sont : <strong>{{circuits}}</strong>. Chaque circuit est adapte a des cyclistes de niveau debutant a intermediaire, avec une assistance technique disponible.</p><h2>Article 2 - Tarification</h2><p>Le tarif de base par groupe est de <strong>{{tarif_groupe}}</strong> FCFA, incluant location de velos, casques, assistance et guide. La restauration est en option.</p><h2>Article 3 - Securite</h2><p>Le guide est detenteur d un brevet de premiers secours. Chaque participant signe une decharge de responsabilite et est couvert par une assurance excursion.</p></div>` },

  {
    code: 'velo_fabrication_locale',
    name: "Accord de service de fabrication de velos locaux (Made in Afrique)",
    category: 'transport_logistique', price: 5000, priceMax: 15000,
    description: "Convention de sous-traitance de fabrication de velos locaux entre un donneur d ordres et un atelier de fabrication africain, dans le cadre d une initiative Made in Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'donneur_ordres',label:"Nom du donneur d ordres",type:'text',required:true},
      {key:'atelier',label:"Nom de l atelier de fabrication",type:'text',required:true},
      {key:'modele',label:"Modele de velo a fabriquer",type:'text',required:true},
      {key:'quantite',label:"Quantite commandee",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix unitaire (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FABRICATION DE VELOS LOCAUX</h1><p>Le donneur d ordres <strong>{{donneur_ordres}}</strong> confie a l atelier <strong>{{atelier}}</strong> la fabrication de <strong>{{quantite}}</strong> velos de modele <strong>{{modele}}</strong> au prix unitaire de <strong>{{prix_unitaire}}</strong> FCFA.</p><h2>Article 1 - Specifications</h2><p>Les velos sont fabriques selon les specifications techniques annexees au present accord, en privilegiant l utilisation de materiaux et composants disponibles localement.</p><h2>Article 2 - Controle qualite</h2><p>Chaque lot de production fait l objet d un controle qualite conjoint avant livraison. Les velos non-conformes sont repris et remplaces sans frais supplementaires.</p><h2>Article 3 - Label</h2><p>Les velos fabriques portent le label Made in Afrique et les noms des deux parties, valorisant le savoir-faire artisanal africain.</p></div>` },

  {
    code: 'velo_reparation_artisanale',
    name: "Accord de service de reparation velos artisanale",
    category: 'transport_logistique', price: 2000, priceMax: 6000,
    description: "Convention de service de reparation artisanale de velos entre un reparateur de quartier et un client ou cooperative, en milieu urbain africain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'reparateur',label:"Nom du reparateur",type:'text',required:true},
      {key:'client',label:"Nom du client ou de la cooperative",type:'text',required:true},
      {key:'type_reparation',label:"Type de reparation ou prestation",type:'text',required:true},
      {key:'cout_estime',label:"Cout estime de la reparation (FCFA)",type:'text',required:true},
      {key:'date_intervention',label:"Date de l intervention",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REPARATION DE VELO</h1><p>Le reparateur <strong>{{reparateur}}</strong> s engage a effectuer la prestation de <strong>{{type_reparation}}</strong> pour le client <strong>{{client}}</strong> le <strong>{{date_intervention}}</strong>.</p><h2>Article 1 - Devis</h2><p>Le cout estime de la reparation est de <strong>{{cout_estime}}</strong> FCFA. Tout depassement de plus de 10% doit faire l objet d une approbation prealable du client.</p><h2>Article 2 - Garantie</h2><p>Les reparations effectuees sont garanties 30 jours. En cas de defaillance liee a la qualite des reparations, la reprise est effectuee gratuitement.</p><h2>Article 3 - Paiement</h2><p>Le paiement est du a la livraison du velo repare, contre remise d un recu.</p></div>` },

  {
    code: 'velo_vente_en_ligne',
    name: "Accord de service de vente de velos en ligne",
    category: 'transport_logistique', price: 3000, priceMax: 9000,
    description: "Convention de partenariat de vente en ligne entre un fabricant ou distributeur de velos et une plateforme e-commerce africaine, encadrant les commissions et les conditions de vente.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'vendeur',label:"Nom du vendeur / distributeur",type:'text',required:true},
      {key:'plateforme',label:"Nom de la plateforme e-commerce",type:'text',required:true},
      {key:'commission',label:"Taux de commission de la plateforme (%)",type:'text',required:true},
      {key:'catalogue',label:"Gammes de velos proposees",type:'textarea',required:true},
      {key:'date_debut',label:"Date de debut du partenariat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VENTE DE VELOS EN LIGNE</h1><p>Le vendeur <strong>{{vendeur}}</strong> et la plateforme e-commerce <strong>{{plateforme}}</strong> s associent pour la vente en ligne de velos a partir du <strong>{{date_debut}}</strong>.</p><h2>Article 1 - Catalogue</h2><p>Les gammes proposees sont : <strong>{{catalogue}}</strong>. Le vendeur est responsable de la veracite des descriptions et de la disponibilite des stocks.</p><h2>Article 2 - Commission</h2><p>La plateforme preleve <strong>{{commission}}</strong>% sur chaque vente realisee. Le reversement des ventes est effectue tous les 15 jours.</p><h2>Article 3 - Retours</h2><p>Un delai de retour de 7 jours est offert aux acheteurs. Le vendeur prend en charge les frais de retour en cas de velo defectueux.</p></div>` },

  {
    code: 'velo_leasing_entreprise',
    name: "Accord de service de leasing de velo (entreprise)",
    category: 'transport_logistique', price: 4000, priceMax: 12000,
    description: "Convention de leasing de velos entre une societe de financement et une entreprise ivoirienne souhaitant mettre des velos a disposition de ses salaries.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'bailleur',label:"Nom du bailleur financier",type:'text',required:true},
      {key:'entreprise',label:"Nom de l entreprise preneuse",type:'text',required:true},
      {key:'nombre_velos',label:"Nombre de velos en leasing",type:'text',required:true},
      {key:'loyer_mensuel',label:"Loyer mensuel total (FCFA)",type:'text',required:true},
      {key:'duree_leasing',label:"Duree du leasing (mois)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LEASING DE VELOS EN ENTREPRISE</h1><p>Le bailleur <strong>{{bailleur}}</strong> met a la disposition de l entreprise <strong>{{entreprise}}</strong> un parc de <strong>{{nombre_velos}}</strong> velos en regime de leasing pour une duree de <strong>{{duree_leasing}}</strong> mois.</p><h2>Article 1 - Loyer</h2><p>Le loyer mensuel est fixe a <strong>{{loyer_mensuel}}</strong> FCFA, payable le premier de chaque mois. Il inclut la maintenance de base et une assurance vol et dommages.</p><h2>Article 2 - Option d achat</h2><p>A l issue de la periode de leasing, l entreprise dispose d une option d achat au prix residuel convenu en annexe.</p><h2>Article 3 - Usage</h2><p>Les velos sont mis a la disposition des salaries pour leurs deplacements professionnels et domicile-travail. L entreprise en assure la bonne utilisation.</p></div>` },

  {
    code: 'velo_challenge_interentreprises',
    name: "Accord de service de challenge velo inter-entreprises",
    category: 'transport_logistique', price: 3000, priceMax: 9000,
    description: "Convention d organisation d un challenge velo inter-entreprises en Cote d Ivoire ou en Afrique de l Ouest, visant a promouvoir la mobilite douce et le bien-etre au travail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'organisateur',label:"Nom de l organisateur de l evenement",type:'text',required:true},
      {key:'entreprises_participantes',label:"Entreprises participantes",type:'textarea',required:true},
      {key:'periode_challenge',label:"Periode du challenge",type:'text',required:true},
      {key:'recompenses',label:"Nature des recompenses prevues",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement officiel",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CHALLENGE VELO INTER-ENTREPRISES</h1><p>L organisateur <strong>{{organisateur}}</strong> et les entreprises participantes <strong>{{entreprises_participantes}}</strong> s engagent dans un challenge velo du <strong>{{periode_challenge}}</strong>, lance officiellement le <strong>{{date_lancement}}</strong>.</p><h2>Article 1 - Objectif</h2><p>Le challenge vise a inciter les salaries a utiliser le velo pour se rendre au travail, en comptabilisant les kilometres parcourus collectivement par chaque equipe d entreprise.</p><h2>Article 2 - Recompenses</h2><p>{{recompenses}}</p><h2>Article 3 - Reglement</h2><p>Un reglement officiel est annexe au present accord et communique a l ensemble des participants. L organisateur est souverain pour statuer sur les litiges lies au classement.</p></div>` },

  {
    code: 'velo_gestion_flotte',
    name: "Accord de service de gestion de flotte velo entreprise",
    category: 'transport_logistique', price: 4000, priceMax: 12000,
    description: "Convention de gestion externalisee d une flotte de velos d entreprise, entre un gestionnaire specialise et une entreprise en Afrique de l Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'gestionnaire',label:"Nom du gestionnaire de flotte",type:'text',required:true},
      {key:'entreprise',label:"Nom de l entreprise cliente",type:'text',required:true},
      {key:'taille_flotte',label:"Taille de la flotte (nombre de velos)",type:'text',required:true},
      {key:'services_inclus',label:"Services inclus dans le contrat",type:'textarea',required:true},
      {key:'forfait_mensuel',label:"Forfait mensuel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE FLOTTE VELO ENTREPRISE</h1><p>Le gestionnaire <strong>{{gestionnaire}}</strong> prend en charge la gestion de la flotte de <strong>{{taille_flotte}}</strong> velos de l entreprise <strong>{{entreprise}}</strong>.</p><h2>Article 1 - Services inclus</h2><p>{{services_inclus}}</p><h2>Article 2 - Forfait</h2><p>La gestion externalisee est facturee au forfait mensuel de <strong>{{forfait_mensuel}}</strong> FCFA, incluant l ensemble des prestations listees a l article 1.</p><h2>Article 3 - Reporting</h2><p>Un rapport mensuel de gestion est transmis a l entreprise, avec indicateurs d utilisation, d incidents et de couts de maintenance.</p></div>` },

  {
    code: 'velo_assurance_mobilite_douce',
    name: "Accord de service d assurance mobilite douce",
    category: 'transport_logistique', price: 3000, priceMax: 9000,
    description: "Convention d assurance couvrant les risques lies a la pratique de la mobilite douce (velo, trottinette, etc.) en milieu urbain africain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'assureur',label:"Nom de la societe d assurance",type:'text',required:true},
      {key:'assure',label:"Nom de l assure",type:'text',required:true},
      {key:'engin_assure',label:"Type d engin assure",type:'text',required:true},
      {key:'prime_mensuelle',label:"Prime mensuelle (FCFA)",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d effet",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D ASSURANCE MOBILITE DOUCE</h1><p>La societe d assurance <strong>{{assureur}}</strong> garantit l assure <strong>{{assure}}</strong> pour la pratique de la mobilite douce avec <strong>{{engin_assure}}</strong>, a compter du <strong>{{date_prise_effet}}</strong>.</p><h2>Article 1 - Garanties</h2><p>Le contrat couvre : la responsabilite civile de l assure envers les tiers, les dommages corporels en cas d accident, le vol de l engin et les dommages materiels.</p><h2>Article 2 - Prime</h2><p>La prime mensuelle est de <strong>{{prime_mensuelle}}</strong> FCFA, prelevee automatiquement ou payable a terme echu.</p><h2>Article 3 - Sinistres</h2><p>Tout sinistre doit etre declare a l assureur dans les 5 jours ouvrables suivant sa survenance, par tout moyen traçable.</p></div>` },

  {
    code: 'velo_rapport_bilan',
    name: "Rapport de bilan mobilite douce",
    category: 'transport_logistique', price: 4000, priceMax: 12000,
    description: "Rapport de bilan annuel ou semestriel de la mobilite douce dans une entreprise ou collectivite ivoirienne, mesurant les resultats obtenus et les perspectives.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'organisme',label:"Nom de l organisme concerne",type:'text',required:true},
      {key:'auteur_rapport',label:"Auteur du rapport",type:'text',required:true},
      {key:'periode',label:"Periode couverte par le bilan",type:'text',required:true},
      {key:'resultats_cles',label:"Resultats cles de la periode",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE BILAN MOBILITE DOUCE</h1><h2>{{organisme}} - Periode {{periode}}</h2><p>Auteur : <strong>{{auteur_rapport}}</strong> | Date : <strong>{{date_rapport}}</strong></p><h2>1. Synthese</h2><p>Le present bilan analyse les indicateurs de mobilite douce de <strong>{{organisme}}</strong> sur la periode <strong>{{periode}}</strong>.</p><h2>2. Resultats cles</h2><p>{{resultats_cles}}</p><h2>3. Analyse et commentaires</h2><p>Ce chapitre detaille les facteurs de succes et les freins identifies, ainsi que les enseignements tires pour la periode suivante.</p><h2>4. Perspectives</h2><p>Les objectifs pour la prochaine periode sont presentes avec un plan d actions operationnel et un budget previsionnel.</p></div>` },

  {
    code: 'velo_plan_mobilite_verte',
    name: "Plan de developpement mobilite verte",
    category: 'transport_logistique', price: 6000, priceMax: 18000,
    description: "Document de planification strategique du developpement de la mobilite verte dans une collectivite ou entreprise ivoirienne, fixant les objectifs et le plan d actions sur 3 a 5 ans.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 53,
    fieldsJson: F([
      {key:'porteur',label:"Porteur du plan (collectivite ou entreprise)",type:'text',required:true},
      {key:'horizon',label:"Horizon du plan (ex : 2028, 2030)",type:'text',required:true},
      {key:'objectifs_chiffres',label:"Objectifs chiffres du plan",type:'textarea',required:true},
      {key:'actions_prioritaires',label:"Actions prioritaires",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d adoption du plan",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DEVELOPPEMENT MOBILITE VERTE</h1><h2>{{porteur}} - Horizon {{horizon}}</h2><p>Adopte le <strong>{{date_adoption}}</strong></p><h2>1. Vision</h2><p><strong>{{porteur}}</strong> s engage a developper une mobilite verte durable et accessible a l horizon <strong>{{horizon}}</strong>.</p><h2>2. Objectifs</h2><p>{{objectifs_chiffres}}</p><h2>3. Actions prioritaires</h2><p>{{actions_prioritaires}}</p><h2>4. Financement</h2><p>Le plan est finance par des ressources internes, des subventions publiques et des partenariats prives. Un comite de pilotage suit l execution et rend compte annuellement.</p></div>` },

  {
    code: 'velo_charte_cyclistes',
    name: "Charte de la mobilite douce et de la securite des cyclistes",
    category: 'transport_logistique', price: 3000, priceMax: 8000,
    description: "Charte d engagement des acteurs institutionnels, operateurs et usagers pour la securite des cyclistes et le developpement de la mobilite douce en Cote d Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'territoire',label:"Territoire concerne",type:'text',required:true},
      {key:'promoteur',label:"Promoteur de la charte",type:'text',required:true},
      {key:'engagements_collectivite',label:"Engagements de la collectivite",type:'textarea',required:true},
      {key:'engagements_usagers',label:"Engagements des usagers",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA MOBILITE DOUCE ET DE LA SECURITE DES CYCLISTES</h1><h2>{{territoire}}</h2><p>Promue par <strong>{{promoteur}}</strong> et signee le <strong>{{date_signature}}</strong></p><h2>Preambule</h2><p>La presente charte traduit la volonte collective de faire de <strong>{{territoire}}</strong> un territoire ou les cyclistes se deplacent en securite et ou la mobilite douce est encouragee comme alternative respectueuse de l environnement.</p><h2>Engagements de la collectivite</h2><p>{{engagements_collectivite}}</p><h2>Engagements des usagers</h2><p>{{engagements_usagers}}</p><h2>Suivi</h2><p>Un comite de suivi annuel impliquant toutes les parties signataires evalue l application de la charte et publie ses conclusions.</p></div>` },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 103a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
