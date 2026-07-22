import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── PÊCHE INDUSTRIELLE / ARTISANALE (25 templates) ──────────────────────────
  {
    code: 'pech2_licence_industrielle',
    name: "Accord de licence de pêche industrielle (eaux ivoiriennes)",
    category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Accord de licence autorisant l'exercice de la pêche industrielle dans les eaux sous souveraineté ivoirienne, conforme aux textes MINADER/MIRAH et aux conventions COREP.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'armateur',label:"Raison sociale de l'armateur",type:'text',required:true},
      {key:'navire',label:"Nom et immatriculation du navire",type:'text',required:true},
      {key:'zone_peche',label:"Zone de pêche autorisée",type:'text',required:true},
      {key:'especes',label:"Espèces cibles autorisées",type:'text',required:true},
      {key:'date_debut',label:"Date de début de licence",type:'date',required:true},
      {key:'date_fin',label:"Date d'expiration de licence",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE PÊCHE INDUSTRIELLE</h1><p>Entre l'autorité compétente de la République de Côte d'Ivoire et <strong>{{armateur}}</strong>, propriétaire du navire <strong>{{navire}}</strong>.</p><h2>Article 1 – Objet</h2><p>La présente licence autorise l'exercice de la pêche industrielle dans la zone suivante : {{zone_peche}}, pour les espèces cibles : {{especes}}.</p><h2>Article 2 – Durée</h2><p>La licence est valable du {{date_debut}} au {{date_fin}}.</p><h2>Article 3 – Obligations</h2><p>Le titulaire s'engage à respecter les quotas fixés, à tenir un journal de bord conforme, à déclarer les captures auprès du MIRAH et à permettre l'embarquement d'observateurs officiels.</p><h2>Article 4 – Sanctions</h2><p>Tout manquement aux présentes conditions entraîne la suspension immédiate de la licence et les poursuites prévues par le Code ivoirien de la pêche.</p><p class="signature">Fait à Abidjan, le _______________</p></div>` },

  {
    code: 'pech2_licence_artisanale',
    name: "Accord de licence de pêche artisanale",
    category: 'agro_environnement', price: 3000, priceMax: 7000,
    description: "Accord de licence pour l'exercice de la pêche artisanale en Côte d'Ivoire, destiné aux pêcheurs individuels et aux pirogues motorisées ou non motorisées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'pecheur',label:"Nom et prénom du pêcheur",type:'text',required:true},
      {key:'pirogue',label:"Description et immatriculation de la pirogue",type:'text',required:true},
      {key:'village',label:"Village ou port de rattachement",type:'text',required:true},
      {key:'engins',label:"Engins de pêche utilisés",type:'text',required:true},
      {key:'date_licence',label:"Date de délivrance de la licence",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE PÊCHE ARTISANALE</h1><p>La présente licence est délivrée à <strong>{{pecheur}}</strong>, opérant depuis {{village}}, pour la pirogue immatriculée {{pirogue}}.</p><h2>Article 1 – Engins autorisés</h2><p>Le pêcheur est autorisé à utiliser les engins suivants : {{engins}}.</p><h2>Article 2 – Délivrance</h2><p>Licence délivrée le {{date_licence}} par le bureau local du MIRAH compétent.</p><h2>Article 3 – Obligations du pêcheur</h2><p>Le titulaire s'engage à respecter les périodes de repos biologique, les zones de pêche autorisées et à contribuer aux statistiques de captures locales.</p><p class="signature">Cachet et signature de l'autorité locale</p></div>` },

  {
    code: 'pech2_chalutier_hauturier',
    name: "Accord de service de chalutier de pêche hauturière",
    category: 'agro_environnement', price: 9000, priceMax: 27000,
    description: "Contrat de service encadrant l'affrètement ou l'exploitation d'un chalutier pour la pêche hauturière en haute mer, incluant la répartition des prises et des frais d'exploitation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'armateur',label:"Armateur du chalutier",type:'text',required:true},
      {key:'navire',label:"Nom et caractéristiques du chalutier",type:'text',required:true},
      {key:'operateur',label:"Opérateur ou affréteur",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat de service",type:'text',required:true},
      {key:'repartition',label:"Répartition des captures (%)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CHALUTIER DE PÊCHE HAUTURIÈRE</h1><p>Entre <strong>{{armateur}}</strong>, armateur du navire <strong>{{navire}}</strong>, et <strong>{{operateur}}</strong>, ci-après dénommé l'Opérateur.</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les conditions d'exploitation du chalutier pour la pêche hauturière sur une durée de {{duree_contrat}}.</p><h2>Article 2 – Partage des captures</h2><p>Les captures nettes sont réparties selon la clé suivante : {{repartition}}.</p><h2>Article 3 – Charges d'exploitation</h2><p>Les frais de carburant, équipage, maintenance et port sont détaillés en annexe et partagés selon les modalités convenues entre les parties.</p><p class="signature">Signé le {{date_signature}} à Abidjan.</p></div>` },

  {
    code: 'pech2_sardinier_pelagique',
    name: "Accord de service de sardinier (pêche pélagique)",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat de service pour l'exploitation d'un sardinier ciblant les espèces pélagiques côtières (sardinelle, maquereau, anchois) dans le Golfe de Guinée.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'armateur',label:"Armateur du sardinier",type:'text',required:true},
      {key:'navire',label:"Nom du navire",type:'text',required:true},
      {key:'especes',label:"Espèces pélagiques ciblées",type:'text',required:true},
      {key:'zone',label:"Zone de pêche (milles nautiques)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de campagne",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – SARDINIER PÊCHE PÉLAGIQUE</h1><p>Armateur : <strong>{{armateur}}</strong> – Navire : <strong>{{navire}}</strong>.</p><h2>Article 1 – Espèces et zone</h2><p>La campagne cible les espèces suivantes : {{especes}}, dans la zone de pêche délimitée à {{zone}} des côtes ivoiriennes.</p><h2>Article 2 – Départ en campagne</h2><p>La campagne commence le {{date_debut}} et se déroule conformément au plan de sortie validé par le capitaine et l'armateur.</p><h2>Article 3 – Commercialisation</h2><p>Les captures sont débarquées au port de pêche d'Abidjan et vendues prioritairement aux mareyeuses agréées du marché au poisson de Vridi.</p></div>` },

  {
    code: 'pech2_crevettier',
    name: "Accord de service de crevettier",
    category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Contrat de service encadrant l'exploitation d'un crevettier pour la capture de crevettes de mer dans les eaux ivoiriennes et sous-régionales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'armateur',label:"Armateur",type:'text',required:true},
      {key:'navire',label:"Nom et tonnage du crevettier",type:'text',required:true},
      {key:'quota',label:"Quota de capture autorisé (tonnes/an)",type:'text',required:true},
      {key:'destination',label:"Marchés de destination des captures",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CREVETTIER</h1><p>Armateur : <strong>{{armateur}}</strong>, navire : <strong>{{navire}}</strong>.</p><h2>Article 1 – Quota</h2><p>Le quota de capture est fixé à {{quota}} conformément à la réglementation MIRAH en vigueur.</p><h2>Article 2 – Destination</h2><p>Les crevettes capturées sont destinées aux marchés suivants : {{destination}}.</p><h2>Article 3 – Bycatch</h2><p>Les captures accessoires sont déclarées et traitées conformément aux procédures de rejet ou de valorisation définies par l'autorité compétente.</p><p class="signature">Signé le {{date_contrat}}</p></div>` },

  {
    code: 'pech2_thonnier_iccat',
    name: "Accord de service de thonnier (accord de pêche thon ICCAT)",
    category: 'agro_environnement', price: 10000, priceMax: 30000,
    description: "Accord de service pour l'exploitation d'un thonnier dans le cadre des quotas ICCAT applicables à l'Atlantique tropical Est, pour les espèces albacore, listao et patudo.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'armateur',label:"Armateur ou société d'armement",type:'text',required:true},
      {key:'navire',label:"Nom du thonnier et pavillon",type:'text',required:true},
      {key:'quota_iccat',label:"Quota ICCAT alloué (tonnes)",type:'text',required:true},
      {key:'especes',label:"Espèces ciblées (albacore/listao/patudo)",type:'text',required:true},
      {key:'port_base',label:"Port de base et de débarquement",type:'text',required:true},
      {key:'date_debut',label:"Début de la saison de pêche",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE THONNIER – CADRE ICCAT</h1><p>Armateur : <strong>{{armateur}}</strong>, navire : <strong>{{navire}}</strong>, pavillon et quota ICCAT : {{quota_iccat}} tonnes.</p><h2>Article 1 – Espèces et quotas</h2><p>Le présent accord couvre la pêche des espèces suivantes : {{especes}}, dans les limites des quotas alloués par l'ICCAT à la Côte d'Ivoire.</p><h2>Article 2 – Port de base</h2><p>Le navire a pour port de base {{port_base}}. Tout débarquement hors port doit faire l'objet d'une autorisation préalable.</p><h2>Article 3 – Rapports de captures</h2><p>Les données de captures sont transmises mensuellement à la Direction des Pêches et à l'ICCAT via le système de déclaration électronique, à compter du {{date_debut}}.</p></div>` },

  {
    code: 'pech2_lagunaire',
    name: "Accord de service de pêche lagunaire (Côte d'Ivoire)",
    category: 'agro_environnement', price: 3000, priceMax: 8000,
    description: "Accord encadrant la pêche dans le système lagunaire ivoirien (Ébrié, Aby, Grand-Lahou), incluant les droits d'accès, les engins autorisés et les règles communautaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'pecheur',label:"Nom du pêcheur ou groupement",type:'text',required:true},
      {key:'lagune',label:"Lagune ou plan d'eau concerné",type:'text',required:true},
      {key:'engins',label:"Engins de pêche autorisés",type:'text',required:true},
      {key:'village',label:"Village riverain de rattachement",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PÊCHE LAGUNAIRE</h1><p>Le présent accord est conclu entre <strong>{{pecheur}}</strong> et le comité de gestion de la {{lagune}}, représentant la communauté riveraine de {{village}}.</p><h2>Article 1 – Droits d'accès</h2><p>Le pêcheur est autorisé à exercer ses activités sur la {{lagune}} avec les engins suivants : {{engins}}.</p><h2>Article 2 – Règles communautaires</h2><p>Le pêcheur respecte les zones de repos, les périodes d'interdiction et contribue aux frais de gestion collective de la ressource.</p><h2>Article 3 – Durée</h2><p>L'accord prend effet le {{date_accord}} pour une durée d'un an renouvelable tacitement.</p></div>` },

  {
    code: 'pech2_cooperative_artisanale',
    name: "Accord de coopérative de pêche artisanale",
    category: 'agro_environnement', price: 4000, priceMax: 10000,
    description: "Accord constitutif ou d'adhésion à une coopérative de pêche artisanale, définissant les droits, obligations et la gouvernance des membres pêcheurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'cooperative',label:"Dénomination de la coopérative",type:'text',required:true},
      {key:'siege',label:"Siège social et village",type:'text',required:true},
      {key:'membre',label:"Nom du membre adhérent",type:'text',required:true},
      {key:'cotisation',label:"Montant de la cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPÉRATIVE DE PÊCHE ARTISANALE</h1><h2>{{cooperative}}</h2><p>Siège : {{siege}}</p><p>Le présent accord confirme l'adhésion de <strong>{{membre}}</strong> à la coopérative susmentionnée, à compter du {{date_adhesion}}.</p><h2>Article 1 – Droits du membre</h2><p>Le membre bénéficie de l'accès aux équipements collectifs, aux programmes de formation, aux financements groupés et à la commercialisation mutualisée des captures.</p><h2>Article 2 – Obligations</h2><p>Le membre verse une cotisation annuelle de {{cotisation}} FCFA et participe aux assemblées générales et aux travaux collectifs.</p><h2>Article 3 – Gouvernance</h2><p>La coopérative est gérée par un bureau élu composé d'un Président, d'un Secrétaire et d'un Trésorier, conformément aux statuts enregistrés.</p></div>` },

  {
    code: 'pech2_transformation_fumage',
    name: "Accord de service de transformation du poisson (fumage, salage)",
    category: 'agro_environnement', price: 3500, priceMax: 9000,
    description: "Contrat de service entre un transformateur artisanal et un fournisseur de poisson ou un groupement, pour le fumage et le salage du poisson destiné à la commercialisation locale ou sous-régionale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'transformateur',label:"Nom du transformateur ou groupement",type:'text',required:true},
      {key:'fournisseur',label:"Nom du fournisseur de poisson",type:'text',required:true},
      {key:'volume',label:"Volume estimé à transformer (kg/semaine)",type:'text',required:true},
      {key:'methode',label:"Méthode de transformation (fumage/salage/mixte)",type:'text',required:true},
      {key:'prix_service',label:"Tarif de transformation (FCFA/kg)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSFORMATION DU POISSON</h1><p>Entre <strong>{{fournisseur}}</strong> (le Fournisseur) et <strong>{{transformateur}}</strong> (le Transformateur).</p><h2>Article 1 – Objet</h2><p>Le Transformateur s'engage à traiter un volume de {{volume}} kg/semaine de poisson par la méthode : {{methode}}.</p><h2>Article 2 – Tarif</h2><p>Le tarif de transformation est fixé à {{prix_service}} FCFA/kg, payable à la livraison du produit fini.</p><h2>Article 3 – Qualité et hygiène</h2><p>Le Transformateur respecte les normes d'hygiène en vigueur et garantit un produit fini conforme aux exigences du marché de destination.</p><h2>Article 4 – Responsabilité</h2><p>Les pertes dues à une mauvaise qualité initiale de la matière première sont à la charge du Fournisseur; celles liées à un défaut de transformation incombent au Transformateur.</p></div>` },

  {
    code: 'pech2_conserverie',
    name: "Accord de service de conserverie de poisson",
    category: 'agro_environnement', price: 8000, priceMax: 22000,
    description: "Contrat de sous-traitance ou de façonnage entre une conserverie industrielle et un fournisseur de matière première halieutique, incluant les exigences HACCP et de certification.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'conserverie',label:"Raison sociale de la conserverie",type:'text',required:true},
      {key:'fournisseur',label:"Raison sociale du fournisseur",type:'text',required:true},
      {key:'espece',label:"Espèce et format de conserve",type:'text',required:true},
      {key:'volume_annuel',label:"Volume annuel prévu (tonnes)",type:'text',required:true},
      {key:'certification',label:"Certification requise (ex. : MSC, BRC)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSERVERIE DE POISSON</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{conserverie}}</strong>.</p><h2>Article 1 – Objet</h2><p>La Conserverie s'engage à traiter et conditionner les fournitures de {{espece}} fournies par le Fournisseur, à raison de {{volume_annuel}} tonnes par an, à compter du {{date_debut}}.</p><h2>Article 2 – Standards de qualité</h2><p>Toutes les opérations sont menées conformément aux plans HACCP de la Conserverie et aux exigences de la certification {{certification}}.</p><h2>Article 3 – Prix</h2><p>Le prix de façonnage est défini en annexe tarifaire, révisable annuellement d'un commun accord.</p></div>` },

  {
    code: 'pech2_farine_poisson',
    name: "Accord de service de farine de poisson industrielle",
    category: 'agro_environnement', price: 7000, priceMax: 20000,
    description: "Contrat de service pour la production de farine et d'huile de poisson à partir de déchets ou de captures dédiées, destinées à l'alimentation animale et à l'aquaculture.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'producteur',label:"Raison sociale du producteur",type:'text',required:true},
      {key:'client',label:"Raison sociale du client",type:'text',required:true},
      {key:'matiere_premiere',label:"Matière première utilisée",type:'text',required:true},
      {key:'capacite',label:"Capacité de production (tonnes/mois)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – FARINE DE POISSON INDUSTRIELLE</h1><p>Entre <strong>{{producteur}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Producteur s'engage à fabriquer et livrer de la farine de poisson à partir de {{matiere_premiere}}, à hauteur de {{capacite}} tonnes par mois.</p><h2>Article 2 – Qualité</h2><p>La farine livrée doit présenter un taux de protéines brutes minimum de 65 % et un taux d'humidité inférieur à 10 %, certifiés par analyses de laboratoire à chaque lot.</p><h2>Article 3 – Prix et paiement</h2><p>Le prix est fixé en annexe, révisable trimestriellement en fonction des cours des matières premières.</p><p class="signature">Signé le {{date_contrat}}</p></div>` },

  {
    code: 'pech2_marche_poisson',
    name: "Accord de service de marché au poisson (quai de débarquement)",
    category: 'agro_environnement', price: 3000, priceMax: 8000,
    description: "Accord régissant l'utilisation des installations du quai de débarquement et du marché au poisson entre le gestionnaire portuaire et les usagers (pêcheurs, mareyeurs, revendeurs).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'gestionnaire',label:"Gestionnaire du quai ou marché",type:'text',required:true},
      {key:'usager',label:"Nom de l'usager (pêcheur/mareyeur)",type:'text',required:true},
      {key:'emplacement',label:"Numéro et description de l'emplacement",type:'text',required:true},
      {key:'redevance',label:"Redevance mensuelle (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'UTILISATION – MARCHÉ AU POISSON / QUAI DE DÉBARQUEMENT</h1><p>Entre <strong>{{gestionnaire}}</strong> et <strong>{{usager}}</strong>.</p><h2>Article 1 – Emplacement</h2><p>L'Usager est autorisé à occuper l'emplacement {{emplacement}} sur le marché au poisson, à compter du {{date_debut}}.</p><h2>Article 2 – Redevance</h2><p>Une redevance mensuelle de {{redevance}} FCFA est due au gestionnaire, payable le 5 de chaque mois.</p><h2>Article 3 – Obligations de l'usager</h2><p>L'Usager maintient son emplacement propre, respecte les horaires d'ouverture, se conforme aux règles sanitaires et s'abstient de tout sous-location.</p></div>` },

  {
    code: 'pech2_chambre_froide',
    name: "Accord de service de chambre froide poisson",
    category: 'agro_environnement', price: 4000, priceMax: 10000,
    description: "Contrat de prestation de service de stockage frigorifique pour le poisson frais ou congelé, entre un exploitant de chambre froide et un client halieutique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'prestataire',label:"Raison sociale du prestataire frigorifique",type:'text',required:true},
      {key:'client',label:"Nom ou raison sociale du client",type:'text',required:true},
      {key:'volume_stockage',label:"Volume de stockage réservé (m3 ou tonnes)",type:'text',required:true},
      {key:'temperature',label:"Température de conservation requise (°C)",type:'text',required:true},
      {key:'tarif',label:"Tarif de stockage (FCFA/tonne/jour)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CHAMBRE FROIDE – POISSON</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Capacité réservée</h2><p>Le Prestataire met à disposition du Client une capacité de stockage de {{volume_stockage}} à une température de {{temperature}} °C.</p><h2>Article 2 – Tarif</h2><p>Le tarif applicable est de {{tarif}} FCFA par tonne et par jour, facturé mensuellement.</p><h2>Article 3 – Responsabilités</h2><p>Le Prestataire est responsable du maintien de la chaîne du froid. Toute rupture de plus de 2 heures due à une défaillance du Prestataire engage sa responsabilité contractuelle.</p></div>` },

  {
    code: 'pech2_export_frais_bivac',
    name: "Accord de service d'exportation de poisson frais (BIVAC)",
    category: 'agro_environnement', price: 6000, priceMax: 16000,
    description: "Contrat d'exportation de poisson frais ou réfrigéré vers les marchés sous-régionaux ou internationaux, avec prise en compte des procédures de certification BIVAC et des normes sanitaires à l'export.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'exportateur',label:"Raison sociale de l'exportateur",type:'text',required:true},
      {key:'importateur',label:"Raison sociale et pays de l'importateur",type:'text',required:true},
      {key:'espece',label:"Espèce et présentation du produit",type:'text',required:true},
      {key:'volume',label:"Volume par expédition (kg ou tonnes)",type:'text',required:true},
      {key:'certificat',label:"Numéro de certificat sanitaire MIRAH/BIVAC",type:'text',required:true},
      {key:'date_expedition',label:"Date d'expédition prévue",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'EXPORTATION DE POISSON FRAIS – BIVAC</h1><p>Entre <strong>{{exportateur}}</strong> (Exportateur, Côte d'Ivoire) et <strong>{{importateur}}</strong> (Importateur).</p><h2>Article 1 – Objet</h2><p>L'Exportateur s'engage à livrer {{volume}} de {{espece}} à la date du {{date_expedition}}.</p><h2>Article 2 – Certification</h2><p>L'expédition est accompagnée du certificat sanitaire n° {{certificat}} délivré par le MIRAH et visé par BIVAC conformément aux procédures en vigueur.</p><h2>Article 3 – Conditions de transport</h2><p>Le transport est effectué sous température contrôlée (0–4 °C pour le frais, -18 °C pour le congelé), dans des conteneurs certifiés conformes.</p></div>` },

  {
    code: 'pech2_certification_msc',
    name: "Accord de service de certification MSC (pêche durable)",
    category: 'agro_environnement', price: 9000, priceMax: 25000,
    description: "Accord entre une unité de pêche ou une coopérative et un organisme certificateur pour l'obtention et le maintien de la certification Marine Stewardship Council (MSC).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur de pêche sollicitant la certification",type:'text',required:true},
      {key:'certificateur',label:"Organisme certificateur accrédité",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de l'évaluation MSC",type:'text',required:true},
      {key:'duree_audit',label:"Durée estimée de l'audit initial",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la procédure",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION MSC</h1><p>Entre <strong>{{operateur}}</strong> et <strong>{{certificateur}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Certificateur s'engage à conduire l'évaluation MSC de l'unité de pêche {{operateur}} selon les Principes et Critères MSC, portant sur : {{perimetre}}.</p><h2>Article 2 – Calendrier</h2><p>La procédure débute le {{date_debut}}. L'audit initial est estimé à {{duree_audit}}.</p><h2>Article 3 – Obligations de l'opérateur</h2><p>L'Opérateur met à disposition toutes les données de captures, les journaux de bord et les registres requis, et participe aux consultations des parties prenantes.</p><h2>Article 4 – Frais</h2><p>Les honoraires de certification sont définis en annexe financière.</p></div>` },

  {
    code: 'pech2_gestion_quotas',
    name: "Accord de service de gestion des captures (quotas)",
    category: 'agro_environnement', price: 5000, priceMax: 13000,
    description: "Accord de prestation entre une autorité de gestion des pêches et un opérateur, définissant les modalités de suivi, de déclaration et de contrôle des quotas de capture alloués.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'autorite',label:"Autorité de gestion (MIRAH ou organisme délégué)",type:'text',required:true},
      {key:'operateur',label:"Opérateur bénéficiaire du quota",type:'text',required:true},
      {key:'quota_annuel',label:"Quota annuel alloué (tonnes par espèce)",type:'text',required:true},
      {key:'periode',label:"Période de validité du quota",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES CAPTURES – QUOTAS DE PÊCHE</h1><p>Entre <strong>{{autorite}}</strong> et <strong>{{operateur}}</strong>.</p><h2>Article 1 – Quota alloué</h2><p>L'Opérateur se voit attribuer un quota de {{quota_annuel}} pour la période {{periode}}, conformément aux évaluations scientifiques des stocks.</p><h2>Article 2 – Déclaration des captures</h2><p>L'Opérateur transmet mensuellement ses déclarations de captures via le formulaire officiel MIRAH, sous peine de suspension du quota.</p><h2>Article 3 – Contrôle</h2><p>Des inspecteurs de l'{{autorite}} peuvent à tout moment effectuer des contrôles à bord ou au débarquement pour vérifier le respect du quota.</p><p class="signature">Signé le {{date_accord}}</p></div>` },

  {
    code: 'pech2_surveillance_inn',
    name: "Accord de service de surveillance maritime (pêche INN)",
    category: 'agro_environnement', price: 10000, priceMax: 28000,
    description: "Accord de prestation de surveillance maritime visant à lutter contre la pêche illicite, non déclarée et non réglementée (INN/IUU) dans les eaux sous juridiction ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de surveillance maritime",type:'text',required:true},
      {key:'autorite',label:"Autorité commanditaire (MIRAH/Marine nationale)",type:'text',required:true},
      {key:'zone',label:"Zone de surveillance (coordonnées ou description)",type:'text',required:true},
      {key:'duree',label:"Durée de la mission de surveillance",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SURVEILLANCE MARITIME – LUTTE INN</h1><p>Entre <strong>{{autorite}}</strong> (le Commanditaire) et <strong>{{prestataire}}</strong> (le Prestataire).</p><h2>Article 1 – Zone et durée</h2><p>La mission couvre la zone {{zone}} pour une durée de {{duree}}, à compter du {{date_debut}}.</p><h2>Article 2 – Moyens mis en œuvre</h2><p>Le Prestataire déploie les moyens aériens, navals et électroniques détaillés en annexe technique pour la détection et le signalement des navires en infraction.</p><h2>Article 3 – Rapports</h2><p>Un rapport hebdomadaire de surveillance est transmis au Commanditaire, incluant les coordonnées des navires contrôlés et les infractions constatées.</p></div>` },

  {
    code: 'pech2_formation_pecheurs',
    name: "Accord de service de formation des pêcheurs artisanaux",
    category: 'agro_environnement', price: 4000, priceMax: 10000,
    description: "Contrat de formation professionnelle destiné aux pêcheurs artisanaux, portant sur la sécurité en mer, les techniques de pêche durable et la gestion des captures.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'beneficiaire',label:"Groupement ou coopérative bénéficiaire",type:'text',required:true},
      {key:'modules',label:"Modules de formation prévus",type:'textarea',required:true},
      {key:'nb_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'date_formation',label:"Date de début de la formation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION DES PÊCHEURS ARTISANAUX</h1><p>Entre <strong>{{organisme}}</strong> et <strong>{{beneficiaire}}</strong>.</p><h2>Article 1 – Programme</h2><p>La formation porte sur les modules suivants : {{modules}}, pour {{nb_participants}} participants.</p><h2>Article 2 – Dates</h2><p>La formation débute le {{date_formation}} et se déroule selon le calendrier joint en annexe.</p><h2>Article 3 – Certification</h2><p>À l'issue de la formation, les participants reçoivent une attestation de l'{{organisme}} validée par le MIRAH.</p><h2>Article 4 – Financement</h2><p>Les coûts pédagogiques sont pris en charge selon le plan de financement défini en annexe (FDFP, ONG partenaire, ou contribution des bénéficiaires).</p></div>` },

  {
    code: 'pech2_partenariat_recherche',
    name: "Accord de partenariat pêche-recherche (CRO Abidjan)",
    category: 'agro_environnement', price: 6000, priceMax: 16000,
    description: "Accord de partenariat entre le Centre de Recherches Océanologiques (CRO) d'Abidjan et un opérateur de pêche pour des campagnes d'évaluation des ressources halieutiques et de collecte de données scientifiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur de pêche partenaire",type:'text',required:true},
      {key:'programme',label:"Programme de recherche concerné",type:'text',required:true},
      {key:'donnees',label:"Types de données collectées",type:'textarea',required:true},
      {key:'duree',label:"Durée du partenariat",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PÊCHE-RECHERCHE – CRO ABIDJAN</h1><p>Entre le Centre de Recherches Océanologiques (CRO) et <strong>{{operateur}}</strong>.</p><h2>Article 1 – Programme</h2><p>Le présent accord s'inscrit dans le cadre du programme {{programme}}, d'une durée de {{duree}}, démarrant le {{date_debut}}.</p><h2>Article 2 – Collecte de données</h2><p>L'Opérateur permet l'embarquement d'observateurs du CRO et la collecte des données suivantes : {{donnees}}.</p><h2>Article 3 – Propriété des données</h2><p>Les données collectées sont propriété conjointe des parties. Toute publication scientifique mentionne le partenariat et est soumise à validation mutuelle avant diffusion.</p></div>` },

  {
    code: 'pech2_rapport_performance',
    name: "Rapport de performance unité de pêche",
    category: 'agro_environnement', price: 3000, priceMax: 7000,
    description: "Rapport standardisé d'évaluation de la performance technique, économique et environnementale d'une unité de pêche artisanale ou industrielle sur une période donnée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'unite',label:"Dénomination de l'unité de pêche",type:'text',required:true},
      {key:'periode',label:"Période couverte par le rapport",type:'text',required:true},
      {key:'captures',label:"Captures totales (espèces et volumes)",type:'textarea',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires de la période (FCFA)",type:'text',required:true},
      {key:'date_rapport',label:"Date d'établissement du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – UNITÉ DE PÊCHE</h1><p>Unité : <strong>{{unite}}</strong> – Période : {{periode}}</p><h2>1. Captures</h2><p>{{captures}}</p><h2>2. Performance économique</h2><p>Chiffre d'affaires : {{chiffre_affaires}} FCFA.</p><h2>3. Indicateurs environnementaux</h2><p>Taux de rejet, consommation de carburant par tonne capturée et incidents environnementaux sont détaillés en annexe.</p><h2>4. Recommandations</h2><p>Les axes d'amélioration identifiés sont présentés en section 4 de l'annexe technique.</p><p class="signature">Rapport établi le {{date_rapport}}</p></div>` },

  {
    code: 'pech2_plan_gestion_durable',
    name: "Plan de gestion durable des ressources halieutiques",
    category: 'agro_environnement', price: 7000, priceMax: 18000,
    description: "Document-cadre définissant les mesures de gestion durable d'une ressource halieutique spécifique (espèce ou zone), élaboré avec les parties prenantes conformément aux standards FAO.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'ressource',label:"Ressource ou espèce concernée",type:'text',required:true},
      {key:'zone',label:"Zone géographique de gestion",type:'text',required:true},
      {key:'objectifs',label:"Objectifs de gestion (Fmsy, biomasse cible...)",type:'textarea',required:true},
      {key:'mesures',label:"Mesures de gestion proposées",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption du plan",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE GESTION DURABLE DES RESSOURCES HALIEUTIQUES</h1><p>Ressource : <strong>{{ressource}}</strong> – Zone : {{zone}}</p><h2>1. Objectifs de gestion</h2><p>{{objectifs}}</p><h2>2. Mesures de gestion</h2><p>{{mesures}}</p><h2>3. Suivi et évaluation</h2><p>Un comité de suivi se réunit annuellement pour évaluer les indicateurs de l'état du stock et ajuster les mesures si nécessaire.</p><h2>4. Révision</h2><p>Le présent plan est révisable tous les 3 ans ou en cas d'évolution significative de l'état de la ressource.</p><p class="signature">Adopté le {{date_adoption}}</p></div>` },

  {
    code: 'pech2_financement_embarcation',
    name: "Accord de financement embarcation de pêche (microfinance)",
    category: 'agro_environnement', price: 4000, priceMax: 10000,
    description: "Accord de financement entre une institution de microfinance et un pêcheur artisanal pour l'acquisition d'une embarcation ou d'engins de pêche, avec plan de remboursement adapté au cycle de pêche.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'imf',label:"Institution de microfinance prêteuse",type:'text',required:true},
      {key:'emprunteur',label:"Nom et prénom de l'emprunteur",type:'text',required:true},
      {key:'objet_financement',label:"Objet du financement (type d'embarcation/engins)",type:'text',required:true},
      {key:'montant',label:"Montant du prêt (FCFA)",type:'text',required:true},
      {key:'duree_remboursement',label:"Durée de remboursement",type:'text',required:true},
      {key:'date_deblocage',label:"Date de déblocage des fonds",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT – EMBARCATION DE PÊCHE (MICROFINANCE)</h1><p>Entre <strong>{{imf}}</strong> et <strong>{{emprunteur}}</strong>.</p><h2>Article 1 – Objet et montant</h2><p>L'IMF octroie un prêt de {{montant}} FCFA pour le financement de : {{objet_financement}}.</p><h2>Article 2 – Remboursement</h2><p>Le prêt est remboursable sur {{duree_remboursement}} selon des mensualités alignées sur les saisons de pêche, telles que définies en annexe.</p><h2>Article 3 – Garantie</h2><p>L'embarcation financée constitue la garantie principale. L'Emprunteur s'engage à l'assurer et à ne pas la céder sans accord préalable de l'IMF.</p><p class="signature">Fonds débloqués le {{date_deblocage}}</p></div>` },

  {
    code: 'pech2_meteo_maritime',
    name: "Accord de service de météo maritime",
    category: 'agro_environnement', price: 5000, priceMax: 12000,
    description: "Accord de prestation de services météorologiques maritimes entre un fournisseur de données et une association de pêcheurs ou un opérateur maritime, incluant alertes et prévisions en temps réel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur de services météo",type:'text',required:true},
      {key:'client',label:"Association ou opérateur bénéficiaire",type:'text',required:true},
      {key:'zone_couverture',label:"Zone géographique de couverture",type:'text',required:true},
      {key:'canal_diffusion',label:"Canal de diffusion (SMS, VHF, application...)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage du service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MÉTÉOROLOGIE MARITIME</h1><p>Entre <strong>{{fournisseur}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Service fourni</h2><p>Le Fournisseur s'engage à diffuser des bulletins météo maritimes couvrant la zone {{zone_couverture}}, via le canal {{canal_diffusion}}, à compter du {{date_debut}}.</p><h2>Article 2 – Fréquence</h2><p>Les bulletins sont transmis deux fois par jour (06h00 et 18h00 GMT) et en temps réel en cas d'alerte cyclonique ou de mer forte.</p><h2>Article 3 – Responsabilité</h2><p>Le Fournisseur ne peut être tenu responsable des dommages résultant d'une non-utilisation ou d'une mauvaise interprétation des bulletins par les pêcheurs.</p></div>` },

  {
    code: 'pech2_partenariat_port_communaute',
    name: "Accord de partenariat port de pêche-communauté",
    category: 'agro_environnement', price: 5000, priceMax: 13000,
    description: "Accord de partenariat entre l'autorité portuaire d'un port de pêche et la communauté riveraine, définissant les engagements mutuels en matière d'emploi local, d'environnement et de développement social.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'port',label:"Dénomination et localisation du port de pêche",type:'text',required:true},
      {key:'communaute',label:"Représentant de la communauté riveraine",type:'text',required:true},
      {key:'engagements_port',label:"Engagements du port envers la communauté",type:'textarea',required:true},
      {key:'engagements_communaute',label:"Engagements de la communauté envers le port",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PORT DE PÊCHE – COMMUNAUTÉ</h1><p>Entre <strong>{{port}}</strong> et <strong>{{communaute}}</strong>.</p><h2>Article 1 – Engagements du Port</h2><p>{{engagements_port}}</p><h2>Article 2 – Engagements de la Communauté</h2><p>{{engagements_communaute}}</p><h2>Article 3 – Comité de suivi</h2><p>Un comité de suivi paritaire se réunit semestriellement pour évaluer la mise en œuvre du présent accord.</p><p class="signature">Signé le {{date_signature}}</p></div>` },

  {
    code: 'pech2_charte_durable_afrique_ouest',
    name: "Charte de la pêche durable en Afrique de l'Ouest",
    category: 'agro_environnement', price: 4000, priceMax: 10000,
    description: "Document d'adhésion à une charte régionale de pêche durable en Afrique de l'Ouest, engageant l'opérateur signataire à respecter des standards de durabilité environnementale et sociale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'signataire',label:"Nom ou raison sociale du signataire",type:'text',required:true},
      {key:'pays',label:"Pays et port d'attache",type:'text',required:true},
      {key:'engagements',label:"Engagements spécifiques pris",type:'textarea',required:true},
      {key:'date_adhesion',label:"Date d'adhésion à la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA PÊCHE DURABLE EN AFRIQUE DE L'OUEST</h1><p>Je soussigné(e) <strong>{{signataire}}</strong>, opérateur de pêche basé à {{pays}}, adhère par la présente à la Charte Régionale de la Pêche Durable en Afrique de l'Ouest.</p><h2>Engagements</h2><p>{{engagements}}</p><h2>Principes généraux</h2><p>Le signataire s'engage à : respecter les tailles minimales de capture, réduire les captures accessoires, ne pas pêcher dans les zones marines protégées, contribuer aux mécanismes régionaux de contrôle, et participer aux programmes de certification durable.</p><p class="signature">Signé le {{date_adhesion}}</p></div>` },

  // ── AQUACULTURE / SYLVICULTURE (25 templates) ────────────────────────────────
  {
    code: 'aqua_pisciculture_etang',
    name: "Accord de service de pisciculture en étang (tilapia, silure)",
    category: 'agro_environnement', price: 4000, priceMax: 10000,
    description: "Contrat de service pour l'établissement et l'exploitation d'une ferme piscicole en étang, ciblant le tilapia et le silure, incluant la fourniture d'alevins, d'aliments et l'assistance technique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'exploitant',label:"Nom ou raison sociale de l'exploitant",type:'text',required:true},
      {key:'prestataire',label:"Prestataire technique",type:'text',required:true},
      {key:'superficie',label:"Superficie des étangs (m2 ou ha)",type:'text',required:true},
      {key:'especes',label:"Espèces élevées (tilapia/silure/mixte)",type:'text',required:true},
      {key:'production_cible',label:"Production annuelle cible (tonnes)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PISCICULTURE EN ÉTANG</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{exploitant}}</strong>.</p><h2>Article 1 – Objet</h2><p>Le Prestataire assure la mise en place et le suivi technique d'une ferme piscicole de {{superficie}} dédiée à l'élevage de {{especes}}, avec une production cible de {{production_cible}} tonnes par an.</p><h2>Article 2 – Prestations incluses</h2><p>Fourniture d'alevins certifiés, d'aliment de croissance, suivi zootechnique mensuel, formation de l'exploitant et appui à la commercialisation.</p><h2>Article 3 – Démarrage</h2><p>Les travaux de mise en eau et le premier empoissonnement sont effectués à compter du {{date_debut}}.</p></div>` },

  {
    code: 'aqua_pisciculture_cage',
    name: "Accord de service de pisciculture en cage (lac Kossou CI)",
    category: 'agro_environnement', price: 6000, priceMax: 16000,
    description: "Accord d'exploitation d'une unité de pisciculture en cages flottantes sur le lac de Kossou (Côte d'Ivoire), incluant les autorisations, la fourniture de matériel et le suivi technique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'exploitant',label:"Exploitant de la cage",type:'text',required:true},
      {key:'nb_cages',label:"Nombre et dimensions des cages",type:'text',required:true},
      {key:'espece',label:"Espèce élevée",type:'text',required:true},
      {key:'site',label:"Coordonnées ou nom du site sur le lac Kossou",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation des cages",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PISCICULTURE EN CAGE (LAC KOSSOU)</h1><p>Exploitant : <strong>{{exploitant}}</strong> – Site : {{site}}</p><h2>Article 1 – Installation</h2><p>{{nb_cages}} sont installées sur le lac Kossou à la date du {{date_installation}} pour l'élevage de {{espece}}.</p><h2>Article 2 – Autorisation</h2><p>L'Exploitant dispose de l'autorisation d'occupation du domaine lacustre délivrée par la Direction des Pêches du MIRAH.</p><h2>Article 3 – Bonnes pratiques</h2><p>L'Exploitant s'engage à ne pas dépasser la capacité de charge du site, à nettoyer régulièrement les cages et à participer au comité de gestion du lac.</p></div>` },

  {
    code: 'aqua_crevetticulture',
    name: "Accord de service d'élevage de crevettes (crevetticulture)",
    category: 'agro_environnement', price: 7000, priceMax: 20000,
    description: "Accord de service pour l'établissement et l'exploitation d'une ferme de crevetticulture en zone lagunaire ou côtière, incluant la gestion de l'eau, des post-larves et la certification.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'exploitant',label:"Raison sociale de l'exploitant",type:'text',required:true},
      {key:'site',label:"Localisation de la ferme",type:'text',required:true},
      {key:'surface',label:"Surface en eau (ha)",type:'text',required:true},
      {key:'espece_crevette',label:"Espèce de crevette élevée",type:'text',required:true},
      {key:'production_cible',label:"Production annuelle cible (tonnes)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CREVETTICULTURE</h1><p>Exploitant : <strong>{{exploitant}}</strong> – Site : {{site}}</p><h2>Article 1 – Superficie et espèce</h2><p>La ferme couvre {{surface}} ha et est dédiée à l'élevage de {{espece_crevette}} avec une production annuelle cible de {{production_cible}} tonnes.</p><h2>Article 2 – Approvisionnement en post-larves</h2><p>Les post-larves certifiées sont fournies par un écloseur agréé, conformément au plan d'ensemencement défini en annexe.</p><h2>Article 3 – Gestion de l'eau</h2><p>Un plan de gestion de la qualité de l'eau (pH, salinité, oxygène dissous) est mis en œuvre et contrôlé hebdomadairement.</p></div>` },

  {
    code: 'aqua_ostreiculture',
    name: "Accord de service d'ostréiculture (huîtres)",
    category: 'agro_environnement', price: 5000, priceMax: 13000,
    description: "Accord de service pour la mise en place et l'exploitation d'un chantier ostréicole en milieu lagunaire ivoirien, incluant la collecte de naissains, l'élevage et la commercialisation des huîtres.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'exploitant',label:"Exploitant du chantier ostréicole",type:'text',required:true},
      {key:'lagune',label:"Lagune ou site d'élevage",type:'text',required:true},
      {key:'methode',label:"Méthode d'élevage (filière, table, palc...)",type:'text',required:true},
      {key:'production_cible',label:"Production annuelle cible (kg)",type:'text',required:true},
      {key:'date_debut',label:"Date de début d'exploitation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – OSTRÉICULTURE</h1><p>Exploitant : <strong>{{exploitant}}</strong> – Site : {{lagune}}</p><h2>Article 1 – Méthode et production</h2><p>L'élevage est conduit par la méthode {{methode}} avec une production cible de {{production_cible}} kg par an, à compter du {{date_debut}}.</p><h2>Article 2 – Qualité sanitaire</h2><p>L'Exploitant procède à des analyses de la qualité bactériologique de l'eau et des huîtres selon le programme de surveillance défini par l'autorité sanitaire.</p><h2>Article 3 – Autorisation d'occupation</h2><p>L'occupation du domaine public maritime ou lagunaire est réalisée sous couvert de l'autorisation délivrée par l'autorité compétente.</p></div>` },

  {
    code: 'aqua_spiruline',
    name: "Accord de service de spiruline (algues nutritionnelles)",
    category: 'agro_environnement', price: 4000, priceMax: 10000,
    description: "Accord de service pour la production de spiruline en bassins, destinée à la nutrition humaine et animale, incluant l'assistance technique, la fourniture de souches et la commercialisation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'producteur',label:"Nom du producteur ou de la ferme",type:'text',required:true},
      {key:'prestataire',label:"Prestataire technique",type:'text',required:true},
      {key:'capacite',label:"Capacité de production (kg/mois de spiruline sèche)",type:'text',required:true},
      {key:'marche',label:"Marchés cibles",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage de production",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PRODUCTION DE SPIRULINE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{producteur}}</strong>.</p><h2>Article 1 – Production</h2><p>Le Prestataire assiste le Producteur pour atteindre une production de {{capacite}} de spiruline sèche à compter du {{date_debut}}.</p><h2>Article 2 – Prestations</h2><p>Fourniture de la souche Arthrospira platensis certifiée, installation des bassins, formation, contrôle qualité (analyses phycocyanine, protéines) et appui commercial vers les marchés : {{marche}}.</p><h2>Article 3 – Standards</h2><p>La production respecte les recommandations FAO/OMS pour la spiruline destinée à l'alimentation humaine et les normes d'hygiène applicables.</p></div>` },

  {
    code: 'aqua_larves_alevins',
    name: "Accord de service de production de larves et alevins",
    category: 'agro_environnement', price: 5000, priceMax: 13000,
    description: "Accord de service entre un écloseur et des pisciculteurs clients pour la production et la livraison d'alevins certifiés (tilapia, silure, poisson-chat) à des stades définis.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'ecloseur',label:"Raison sociale de l'écloseur",type:'text',required:true},
      {key:'client',label:"Nom du pisciculteur client",type:'text',required:true},
      {key:'espece',label:"Espèce et stade des alevins",type:'text',required:true},
      {key:'quantite',label:"Quantité commandée par lot",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix unitaire (FCFA/alevin)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PRODUCTION DE LARVES ET ALEVINS</h1><p>Entre <strong>{{ecloseur}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Commande</h2><p>Le Client commande {{quantite}} d'{{espece}} au prix unitaire de {{prix_unitaire}} FCFA.</p><h2>Article 2 – Qualité</h2><p>Les alevins livrés présentent un taux de survie garanti minimum de 90 % à 7 jours après livraison dans les conditions d'élevage normales.</p><h2>Article 3 – Livraison</h2><p>Les alevins sont livrés dans des sacs oxygénés ou des citernes adaptées, accompagnés d'une fiche zootechnique précisant l'alimentation de démarrage recommandée.</p></div>` },

  {
    code: 'aqua_aliment_poisson',
    name: "Accord de service d'aliment pour poisson (aquafeed)",
    category: 'agro_environnement', price: 5000, priceMax: 13000,
    description: "Contrat de fourniture régulière d'aliment complet ou complémentaire pour poissons d'élevage, entre un fabricant d'aquafeed et un pisciculteur ou groupement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'fabricant',label:"Raison sociale du fabricant d'aquafeed",type:'text',required:true},
      {key:'acheteur',label:"Raison sociale de l'acheteur",type:'text',required:true},
      {key:'type_aliment',label:"Type et granulométrie de l'aliment",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel commandé (tonnes)",type:'text',required:true},
      {key:'prix_tonne',label:"Prix par tonne (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FOURNITURE D'ALIMENT POUR POISSON</h1><p>Entre <strong>{{fabricant}}</strong> et <strong>{{acheteur}}</strong>.</p><h2>Article 1 – Produit</h2><p>Le Fabricant s'engage à fournir {{volume_mensuel}} tonnes par mois d'aliment de type {{type_aliment}} au prix de {{prix_tonne}} FCFA/tonne.</p><h2>Article 2 – Garanties nutritionnelles</h2><p>L'aliment fourni respecte les spécifications nutritionnelles définies en annexe (taux de protéines, lipides, humidité) et est certifié conforme aux normes en vigueur.</p><h2>Article 3 – Livraison</h2><p>Les livraisons sont effectuées à la ferme de l'Acheteur selon le calendrier convenu, dans des conditions de conservation adéquates.</p></div>` },

  {
    code: 'aqua_certification_asc',
    name: "Accord de service de certification aquaculture durable (ASC)",
    category: 'agro_environnement', price: 9000, priceMax: 25000,
    description: "Accord entre une ferme aquacole et un organisme certificateur pour l'obtention de la certification Aquaculture Stewardship Council (ASC), garantissant des pratiques d'élevage responsables.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'ferme',label:"Raison sociale de la ferme aquacole",type:'text',required:true},
      {key:'certificateur',label:"Organisme certificateur accrédité ASC",type:'text',required:true},
      {key:'espece',label:"Espèce et système d'élevage concernés",type:'text',required:true},
      {key:'duree_audit',label:"Durée estimée de l'audit",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la procédure",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION AQUACULTURE DURABLE – ASC</h1><p>Entre <strong>{{ferme}}</strong> et <strong>{{certificateur}}</strong>.</p><h2>Article 1 – Périmètre</h2><p>La certification ASC est sollicitée pour l'élevage de {{espece}}, selon le référentiel ASC applicable. La procédure débute le {{date_debut}} pour un audit estimé à {{duree_audit}}.</p><h2>Article 2 – Obligations de la ferme</h2><p>La Ferme fournit l'accès complet à ses installations, registres et données, participe aux consultations des parties prenantes et s'engage à mettre en œuvre les plans d'action correctifs requis.</p><h2>Article 3 – Validité</h2><p>La certification ASC est valable 3 ans, sous réserve des audits de surveillance annuels.</p></div>` },

  {
    code: 'aqua_ferme_commerciale',
    name: "Accord de service de pisciculture commerciale (ferme aquacole)",
    category: 'agro_environnement', price: 7000, priceMax: 18000,
    description: "Contrat global de service pour le développement et la gestion d'une ferme aquacole commerciale, de la conception des infrastructures à la commercialisation des produits.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'investisseur',label:"Investisseur ou propriétaire de la ferme",type:'text',required:true},
      {key:'gestionnaire',label:"Gestionnaire technique et commercial",type:'text',required:true},
      {key:'localisation',label:"Localisation de la ferme",type:'text',required:true},
      {key:'capacite',label:"Capacité de production annuelle (tonnes)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – FERME AQUACOLE COMMERCIALE</h1><p>Entre <strong>{{investisseur}}</strong> (l'Investisseur) et <strong>{{gestionnaire}}</strong> (le Gestionnaire Technique).</p><h2>Article 1 – Objet</h2><p>Le Gestionnaire assure la conception, la mise en place et l'exploitation de la ferme aquacole sise à {{localisation}}, avec une capacité annuelle de {{capacite}} tonnes, à compter du {{date_debut}}.</p><h2>Article 2 – Prestations</h2><p>Étude de faisabilité, conception des bassins, approvisionnement en intrants, gestion du personnel, suivi zootechnique, traçabilité et commercialisation.</p><h2>Article 3 – Rémunération</h2><p>La rémunération du Gestionnaire est définie en annexe financière, incluant une partie fixe et une prime de performance liée à la production.</p></div>` },

  {
    code: 'aqua_peche_sportive',
    name: "Accord de service de tour opérateur de pêche sportive",
    category: 'agro_environnement', price: 5000, priceMax: 14000,
    description: "Accord entre un tour opérateur spécialisé et un exploitant de plan d'eau (lac, lagune, fleuve) pour l'organisation de séjours de pêche sportive touristique en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'tour_operateur',label:"Raison sociale du tour opérateur",type:'text',required:true},
      {key:'exploitant',label:"Exploitant du plan d'eau",type:'text',required:true},
      {key:'site',label:"Site de pêche sportive",type:'text',required:true},
      {key:'tarif_journee',label:"Tarif journalier par pêcheur (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de partenariat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE TOUR OPÉRATEUR – PÊCHE SPORTIVE</h1><p>Entre <strong>{{tour_operateur}}</strong> et <strong>{{exploitant}}</strong>.</p><h2>Article 1 – Site et tarif</h2><p>Le Tour Opérateur commercialise des séjours de pêche sportive sur le site de {{site}} au tarif de {{tarif_journee}} FCFA par pêcheur par journée, à compter du {{date_debut}}.</p><h2>Article 2 – Règles</h2><p>La pêche sportive est pratiquée en No-Kill sauf accord contraire. Les espèces protégées sont strictement remises à l'eau.</p><h2>Article 3 – Partage des recettes</h2><p>La répartition des recettes entre les parties est définie en annexe financière.</p></div>` },

  {
    code: 'aqua_sylviculture_industrielle',
    name: "Accord de sylviculture industrielle (Eucalyptus, Teck)",
    category: 'agro_environnement', price: 8000, priceMax: 22000,
    description: "Accord de service pour la mise en place et la gestion de plantations industrielles d'Eucalyptus ou de Teck en Côte d'Ivoire, incluant la préparation du sol, la plantation et la gestion sylvicole.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'proprietaire',label:"Propriétaire foncier ou investisseur",type:'text',required:true},
      {key:'sylviculteur',label:"Entreprise sylvicole prestataire",type:'text',required:true},
      {key:'espece',label:"Essence plantée (Eucalyptus/Teck/autre)",type:'text',required:true},
      {key:'superficie',label:"Superficie à planter (ha)",type:'text',required:true},
      {key:'rotation',label:"Durée de la rotation sylvicole (années)",type:'text',required:true},
      {key:'date_plantation',label:"Date de début de plantation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SYLVICULTURE INDUSTRIELLE</h1><p>Entre <strong>{{proprietaire}}</strong> et <strong>{{sylviculteur}}</strong>.</p><h2>Article 1 – Plantation</h2><p>Le Sylviculteur s'engage à planter {{espece}} sur {{superficie}} ha, avec une rotation de {{rotation}} ans, à compter du {{date_plantation}}.</p><h2>Article 2 – Travaux sylvicoles</h2><p>Préparation du terrain, fourniture de plants certifiés, plantation, éclaircies, traitements phytosanitaires et suivi de croissance sont inclus dans la prestation.</p><h2>Article 3 – Partage de la récolte</h2><p>La répartition des revenus issus de la récolte finale est définie en annexe, en tenant compte des investissements de chaque partie.</p></div>` },

  {
    code: 'aqua_pepiniere_forestiere',
    name: "Accord de service de pépinière forestière",
    category: 'agro_environnement', price: 4000, priceMax: 10000,
    description: "Contrat de service pour la production et la fourniture de plants forestiers certifiés dans une pépinière, destinés aux programmes de reboisement et de plantation commerciale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'pepinieriste',label:"Raison sociale du pépiniériste",type:'text',required:true},
      {key:'client',label:"Client acheteur de plants",type:'text',required:true},
      {key:'essences',label:"Essences et quantités commandées",type:'textarea',required:true},
      {key:'stade_plants',label:"Stade et taille des plants à la livraison",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PÉPINIÈRE FORESTIÈRE</h1><p>Entre <strong>{{pepinieriste}}</strong> et <strong>{{client}}</strong>.</p><h2>Article 1 – Commande</h2><p>Le Pépiniériste produit et livre les plants forestiers suivants : {{essences}}, au stade {{stade_plants}}, pour la date du {{date_livraison}}.</p><h2>Article 2 – Qualité</h2><p>Les plants sont issus de graines ou de boutures certifiées, élevés selon les bonnes pratiques de pépinière et présentent un taux de reprise garanti minimum de 85 %.</p><h2>Article 3 – Transport</h2><p>Le transport est à la charge du Client sauf disposition contraire en annexe. Les plants sont livrés en sachets ou en pots conformes aux espèces.</p></div>` },

  {
    code: 'aqua_plantation_hevea',
    name: "Accord de service de plantation d'hévéa (SAPH modèle)",
    category: 'agro_environnement', price: 7000, priceMax: 19000,
    description: "Accord de service pour la création et la gestion d'une plantation d'hévéa selon le modèle de partenariat planteur-société (type SAPH), incluant la fourniture de plants greffés et l'encadrement technique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'planteur',label:"Nom du planteur partenaire",type:'text',required:true},
      {key:'societe',label:"Société d'encadrement (ex. SAPH)",type:'text',required:true},
      {key:'superficie',label:"Superficie à planter (ha)",type:'text',required:true},
      {key:'clone',label:"Clone d'hévéa retenu",type:'text',required:true},
      {key:'date_plantation',label:"Date de plantation prévue",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PLANTATION D'HÉVÉA – MODÈLE PARTENARIAT</h1><p>Entre <strong>{{societe}}</strong> et <strong>{{planteur}}</strong>.</p><h2>Article 1 – Plantation</h2><p>La Société fournit les plants greffés du clone {{clone}} et assure la plantation de {{superficie}} ha à compter du {{date_plantation}}.</p><h2>Article 2 – Encadrement</h2><p>La Société assure le suivi agronomique jusqu'à l'entrée en production (7–8 ans), la fourniture des intrants et la formation du planteur aux techniques de saignée.</p><h2>Article 3 – Achat du latex</h2><p>La Société s'engage à acheter la totalité du latex produit par le Planteur au prix du marché, selon le contrat de collecte défini en annexe.</p></div>` },

  {
    code: 'aqua_plantation_palmier',
    name: "Accord de service de plantation de palmier à huile (PALMCI)",
    category: 'agro_environnement', price: 7000, priceMax: 19000,
    description: "Accord de partenariat pour la création d'une plantation de palmier à huile selon le modèle PALMCI, incluant la mise à disposition de plants sélectionnés, l'encadrement et l'achat des régimes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'planteur',label:"Nom du planteur",type:'text',required:true},
      {key:'societe',label:"Société industrielle partenaire (ex. PALMCI)",type:'text',required:true},
      {key:'superficie',label:"Superficie à planter (ha)",type:'text',required:true},
      {key:'materiel_vegetal',label:"Matériel végétal (variété DELI x LA MÉ...)",type:'text',required:true},
      {key:'date_mise_en_place',label:"Date de mise en place de la plantation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PLANTATION DE PALMIER À HUILE</h1><p>Entre <strong>{{societe}}</strong> et <strong>{{planteur}}</strong>.</p><h2>Article 1 – Matériel végétal</h2><p>La Société fournit le matériel végétal sélectionné ({{materiel_vegetal}}) pour {{superficie}} ha, mis en place le {{date_mise_en_place}}.</p><h2>Article 2 – Encadrement technique</h2><p>La Société assure le suivi agronomique, la fourniture d'engrais à prix préférentiel et la formation du Planteur aux bonnes pratiques agricoles de la culture du palmier à huile.</p><h2>Article 3 – Achat des régimes</h2><p>La Société achète l'intégralité de la production de régimes de Régimes de Fruits Frais (RFF) au tarif mensuel fixé par le gouvernement ivoirien.</p></div>` },

  {
    code: 'aqua_plantation_bananier',
    name: "Accord de service de plantation de bananier export",
    category: 'agro_environnement', price: 8000, priceMax: 22000,
    description: "Accord de service pour la mise en place d'une plantation de banane dessert destinée à l'exportation, selon les cahiers des charges GlobalGAP et les exigences des importateurs européens.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'planteur',label:"Planteur ou société de production",type:'text',required:true},
      {key:'exportateur',label:"Exportateur ou société commerciale",type:'text',required:true},
      {key:'superficie',label:"Superficie plantée (ha)",type:'text',required:true},
      {key:'variete',label:"Variété (Cavendish/Grande Naine...)",type:'text',required:true},
      {key:'volume_semaine',label:"Volume hebdomadaire engagé (tonnes)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PLANTATION DE BANANIER EXPORT</h1><p>Entre <strong>{{exportateur}}</strong> et <strong>{{planteur}}</strong>.</p><h2>Article 1 – Production</h2><p>Le Planteur s'engage à produire {{variete}} sur {{superficie}} ha et à livrer {{volume_semaine}} tonnes par semaine à l'Exportateur.</p><h2>Article 2 – Qualité GlobalGAP</h2><p>La production est conduite selon le cahier des charges GlobalGAP. Le Planteur est accompagné dans la certification et tient un registre complet des intrants utilisés.</p><h2>Article 3 – Prix</h2><p>Le prix d'achat au Planteur est fixé en annexe, indexé sur les cours mondiaux et révisé trimestriellement.</p></div>` },

  {
    code: 'aqua_plantation_anacardier',
    name: "Accord de service de plantation d'anacardier (cajou)",
    category: 'agro_environnement', price: 5000, priceMax: 13000,
    description: "Accord de service pour la création ou la réhabilitation d'une plantation d'anacardier en Côte d'Ivoire, premier producteur mondial de noix de cajou brute.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'planteur',label:"Nom du planteur",type:'text',required:true},
      {key:'prestataire',label:"Prestataire ou coopérative d'encadrement",type:'text',required:true},
      {key:'superficie',label:"Superficie (ha)",type:'text',required:true},
      {key:'densite',label:"Densité de plantation (pieds/ha)",type:'text',required:true},
      {key:'date_plantation',label:"Date de plantation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PLANTATION D'ANACARDIER</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{planteur}}</strong>.</p><h2>Article 1 – Plantation</h2><p>Le Prestataire assure la plantation d'anacardier sur {{superficie}} ha à la densité de {{densite}} pieds/ha, à compter du {{date_plantation}}.</p><h2>Article 2 – Plants et formation</h2><p>Le Prestataire fournit des plants issus de variétés améliorées et forme le Planteur à la taille de formation, aux traitements phytosanitaires et à la récolte mécanisée.</p><h2>Article 3 – Commercialisation</h2><p>Le Prestataire facilite l'accès du Planteur aux acheteurs agréés Conseil du Coton et de l'Anacarde au prix plancher officiel.</p></div>` },

  {
    code: 'aqua_plantation_cocotier',
    name: "Accord de service de plantation de cocotier hybride",
    category: 'agro_environnement', price: 5000, priceMax: 12000,
    description: "Accord de service pour la plantation de cocotiers hybrides dans la zone côtière ivoirienne, incluant la fourniture de semences PB 121 et l'assistance technique au planteur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'planteur',label:"Nom du planteur",type:'text',required:true},
      {key:'structure',label:"Structure d'encadrement (CNRA/coopérative)",type:'text',required:true},
      {key:'superficie',label:"Superficie (ha)",type:'text',required:true},
      {key:'variete',label:"Variété (Grand x Nain hybride PB 121...)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PLANTATION DE COCOTIER HYBRIDE</h1><p>Entre <strong>{{structure}}</strong> et <strong>{{planteur}}</strong>.</p><h2>Article 1 – Plantation</h2><p>La Structure fournit les noix germées ou plants de {{variete}} pour {{superficie}} ha, à compter du {{date_debut}}.</p><h2>Article 2 – Encadrement</h2><p>Suivi agronomique trimestriel, conseils en fertilisation, lutte contre les ravageurs (Oryctes rhinoceros) et formation à la récolte coprah ou noix fraîche.</p><h2>Article 3 – Achat des produits</h2><p>La Structure facilite la mise en relation avec les acheteurs d'huile de coco, de coprah ou de noix fraîches selon le débouché retenu.</p></div>` },

  {
    code: 'aqua_mise_valeur_agro_forestier',
    name: "Accord de service de mise en valeur terrain agro-forestier",
    category: 'agro_environnement', price: 6000, priceMax: 16000,
    description: "Accord de mise en valeur agricole et forestière d'un terrain, combinant cultures vivrières et plantations pérennes dans un système agro-forestier durable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'proprietaire',label:"Propriétaire ou détenteur du terrain",type:'text',required:true},
      {key:'mise_en_valeur',label:"Opérateur en charge de la mise en valeur",type:'text',required:true},
      {key:'superficie',label:"Superficie totale (ha)",type:'text',required:true},
      {key:'systeme',label:"Système agro-forestier retenu",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage des travaux",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISE EN VALEUR TERRAIN AGRO-FORESTIER</h1><p>Entre <strong>{{proprietaire}}</strong> et <strong>{{mise_en_valeur}}</strong>.</p><h2>Article 1 – Système retenu</h2><p>Sur une superficie de {{superficie}} ha, le système suivant est mis en place : {{systeme}}, à compter du {{date_debut}}.</p><h2>Article 2 – Partage des fruits</h2><p>La répartition des revenus issus des cultures vivrières et des productions pérennes est définie en annexe économique selon les principes de l'exploitation partagée.</p><h2>Article 3 – Durée</h2><p>L'accord est conclu pour une durée de 10 ans renouvelable, couvrant le cycle complet de mise en valeur des plantations pérennes.</p></div>` },

  {
    code: 'aqua_agroforesterie_cafe',
    name: "Accord de service d'agroforesterie (café-ombrage)",
    category: 'agro_environnement', price: 5000, priceMax: 13000,
    description: "Accord de service pour la mise en place d'un système agroforestier à base de caféier sous ombrage, améliorant la qualité du café et la biodiversité tout en séquestrant du carbone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'planteur',label:"Nom du planteur caféier",type:'text',required:true},
      {key:'partenaire',label:"ONG ou société partenaire",type:'text',required:true},
      {key:'superficie',label:"Superficie du jardin café (ha)",type:'text',required:true},
      {key:'essence_ombrage',label:"Essences d'ombrage introduites",type:'text',required:true},
      {key:'date_debut',label:"Date de début d'intervention",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'AGROFORESTERIE – CAFÉ SOUS OMBRAGE</h1><p>Entre <strong>{{partenaire}}</strong> et <strong>{{planteur}}</strong>.</p><h2>Article 1 – Intervention</h2><p>Le Partenaire intervient sur {{superficie}} ha de caféiers du Planteur pour introduire des essences d'ombrage ({{essence_ombrage}}) à compter du {{date_debut}}.</p><h2>Article 2 – Bénéfices attendus</h2><p>Amélioration de la qualité organoleptique du café, réduction de l'usage de pesticides, séquestration carbone et diversification des revenus (fruits, bois).</p><h2>Article 3 – Prime qualité</h2><p>Le café produit sous ombrage certifié bénéficie d'une prime de qualité à l'achat, selon les conditions du marché spécialité accessible grâce au partenariat.</p></div>` },

  {
    code: 'aqua_champignons',
    name: "Accord de service de production de champignons",
    category: 'agro_environnement', price: 3500, priceMax: 9000,
    description: "Accord de service pour la production de champignons comestibles (pleurotes, shiitake) en milieu contrôlé, incluant la fourniture de substrats, de souches et l'appui à la commercialisation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'producteur',label:"Nom du producteur",type:'text',required:true},
      {key:'prestataire',label:"Fournisseur de souches et substrats",type:'text',required:true},
      {key:'espece',label:"Espèce de champignon produite",type:'text',required:true},
      {key:'production_mensuelle',label:"Production mensuelle cible (kg)",type:'text',required:true},
      {key:'date_debut',label:"Date de lancement de la production",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PRODUCTION DE CHAMPIGNONS</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{producteur}}</strong>.</p><h2>Article 1 – Production</h2><p>Le Prestataire appuie le Producteur pour atteindre une production de {{production_mensuelle}} kg/mois de {{espece}}, à compter du {{date_debut}}.</p><h2>Article 2 – Intrants</h2><p>Fourniture de souches de qualité, de substrats (paille de riz, sciure de bois traité), de sacs de culture et formation au suivi des conditions climatiques de la chambre de culture.</p><h2>Article 3 – Commercialisation</h2><p>Le Prestataire facilite l'accès aux marchés locaux (supermarchés, restaurants) et fournit un appui à l'emballage et à l'étiquetage.</p></div>` },

  {
    code: 'aqua_rapport_performance_ferme',
    name: "Rapport de performance ferme aquacole",
    category: 'agro_environnement', price: 3000, priceMax: 7000,
    description: "Rapport standardisé d'évaluation de la performance zootechnique, économique et environnementale d'une ferme aquacole sur une période définie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'ferme',label:"Dénomination de la ferme aquacole",type:'text',required:true},
      {key:'periode',label:"Période d'évaluation",type:'text',required:true},
      {key:'production_reelle',label:"Production réelle (tonnes ou kg)",type:'text',required:true},
      {key:'taux_survie',label:"Taux de survie observé (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date d'établissement du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – FERME AQUACOLE</h1><p>Ferme : <strong>{{ferme}}</strong> – Période : {{periode}}</p><h2>1. Indicateurs zootechniques</h2><p>Production réelle : {{production_reelle}} – Taux de survie : {{taux_survie}} %.</p><h2>2. Performance économique</h2><p>Chiffre d'affaires, coût de production par kg et marge nette sont détaillés en annexe financière.</p><h2>3. Indicateurs environnementaux</h2><p>Consommation d'eau, indice de conversion alimentaire (ICA), qualité des effluents et gestion des boues sont présentés en section 3.</p><h2>4. Recommandations</h2><p>Les axes d'amélioration pour le cycle suivant sont présentés en conclusion.</p><p class="signature">Rapport établi le {{date_rapport}}</p></div>` },

  {
    code: 'aqua_plan_developpement_national',
    name: "Plan de développement de l'aquaculture nationale",
    category: 'agro_environnement', price: 9000, priceMax: 25000,
    description: "Document-cadre stratégique définissant les objectifs, les axes d'intervention et les indicateurs de suivi pour le développement de l'aquaculture à l'échelle nationale ou régionale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'autorite',label:"Autorité émettrice (Ministère, Direction)",type:'text',required:true},
      {key:'horizon',label:"Horizon temporel du plan (ex. 2025-2030)",type:'text',required:true},
      {key:'objectif_production',label:"Objectif de production aquacole (tonnes/an)",type:'text',required:true},
      {key:'axes',label:"Axes stratégiques prioritaires",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption du plan",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DE L'AQUACULTURE NATIONALE</h1><p>Autorité : <strong>{{autorite}}</strong> – Horizon : {{horizon}}</p><h2>1. Objectif de production</h2><p>Le présent plan vise à atteindre {{objectif_production}} tonnes de production aquacole nationale à l'horizon fixé.</p><h2>2. Axes stratégiques</h2><p>{{axes}}</p><h2>3. Financement</h2><p>Le plan est financé par le budget national, les partenaires techniques et financiers (BAD, FIDA, UE) et les investissements privés mobilisés dans le cadre du partenariat public-privé.</p><h2>4. Suivi-évaluation</h2><p>Un comité interministériel de suivi se réunit annuellement et publie un rapport d'avancement.</p><p class="signature">Adopté le {{date_adoption}}</p></div>` },

  {
    code: 'aqua_financement_fida_bad',
    name: "Accord de financement aquaculture (FIDA/BAD)",
    category: 'agro_environnement', price: 10000, priceMax: 30000,
    description: "Accord de financement entre une institution financière internationale (FIDA ou BAD) et l'État ou un opérateur ivoirien pour le développement de projets aquacoles structurants.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'bailleur',label:"Institution financière internationale (FIDA/BAD)",type:'text',required:true},
      {key:'beneficiaire',label:"Bénéficiaire (État ou opérateur)",type:'text',required:true},
      {key:'projet',label:"Intitulé du projet aquacole",type:'text',required:true},
      {key:'montant',label:"Montant du financement (USD/EUR/FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée du projet",type:'text',required:true},
      {key:'date_signature',label:"Date de signature de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT AQUACULTURE – {{bailleur}}</h1><p>Entre <strong>{{bailleur}}</strong> et <strong>{{beneficiaire}}</strong>.</p><h2>Article 1 – Projet</h2><p>Le présent accord finance le projet intitulé : {{projet}}, pour un montant de {{montant}} sur une durée de {{duree}}, à compter de la date de signature.</p><h2>Article 2 – Utilisation des fonds</h2><p>Les fonds sont exclusivement affectés aux composantes du projet définies en annexe technique et financière, conformément aux procédures de passation des marchés du Bailleur.</p><h2>Article 3 – Rapportage</h2><p>Le Bénéficiaire transmet des rapports semestriels de mise en œuvre au Bailleur, incluant les indicateurs de résultats et les états financiers audités.</p><p class="signature">Signé le {{date_signature}}</p></div>` },

  {
    code: 'aqua_partenariat_restauration',
    name: "Accord de partenariat aquaculture-restauration",
    category: 'agro_environnement', price: 3500, priceMax: 9000,
    description: "Accord de partenariat commercial entre une ferme aquacole et un réseau de restaurateurs, assurant un approvisionnement régulier en poisson frais de qualité et des conditions tarifaires préférentielles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'ferme',label:"Raison sociale de la ferme aquacole",type:'text',required:true},
      {key:'restaurant',label:"Nom ou groupe de restauration partenaire",type:'text',required:true},
      {key:'produit',label:"Produit et espèce fournie",type:'text',required:true},
      {key:'volume_semaine',label:"Volume hebdomadaire engagé (kg)",type:'text',required:true},
      {key:'prix',label:"Prix de vente convenu (FCFA/kg)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT AQUACULTURE-RESTAURATION</h1><p>Entre <strong>{{ferme}}</strong> et <strong>{{restaurant}}</strong>.</p><h2>Article 1 – Produit et volume</h2><p>La Ferme s'engage à livrer {{volume_semaine}} kg/semaine de {{produit}} au prix de {{prix}} FCFA/kg.</p><h2>Article 2 – Traçabilité</h2><p>Chaque livraison est accompagnée d'une fiche de traçabilité mentionnant la date de récolte, le bassin d'origine et les analyses sanitaires récentes.</p><h2>Article 3 – Exclusivité et communication</h2><p>Le Restaurateur peut mentionner dans ses menus l'origine locale et durable des produits aquacoles. La Ferme accorde une exclusivité de territoire selon les conditions définies en annexe.</p></div>` },

  {
    code: 'aqua_charte_responsable',
    name: "Charte de l'aquaculture responsable",
    category: 'agro_environnement', price: 3000, priceMax: 7000,
    description: "Document d'adhésion à une charte nationale ou sous-régionale de l'aquaculture responsable, engageant l'opérateur à respecter des standards sociaux, environnementaux et sanitaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'signataire',label:"Raison sociale ou nom du signataire",type:'text',required:true},
      {key:'type_exploitation',label:"Type et espèces de l'exploitation aquacole",type:'text',required:true},
      {key:'localisation',label:"Localisation de la ferme",type:'text',required:true},
      {key:'engagements',label:"Engagements spécifiques pris",type:'textarea',required:true},
      {key:'date_adhesion',label:"Date d'adhésion à la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'AQUACULTURE RESPONSABLE</h1><p>Je soussigné(e) <strong>{{signataire}}</strong>, exploitant de {{type_exploitation}} à {{localisation}}, adhère par la présente à la Charte Nationale de l'Aquaculture Responsable.</p><h2>Engagements spécifiques</h2><p>{{engagements}}</p><h2>Principes généraux</h2><p>Le signataire s'engage à : gérer durablement la qualité de l'eau, ne pas utiliser d'antibiotiques en prophylaxie systématique, garantir le bien-être animal, respecter le droit du travail, ne pas introduire d'espèces exotiques envahissantes sans autorisation, et contribuer aux programmes nationaux de surveillance sanitaire aquacole.</p><p class="signature">Signé le {{date_adhesion}}</p></div>` },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 74b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
