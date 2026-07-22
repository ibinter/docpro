import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates Économie sociale/ESS (préfixe soc4_) ───
  {
    code: 'soc4_accord_constitution_cooperative',
    name: "Accord de constitution de société coopérative (OHADA)",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Acte constitutif d'une société coopérative conforme à l'Acte uniforme OHADA relatif au droit des sociétés coopératives.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'denomination', label: "Dénomination de la coopérative", type: 'text', required: true },
      { key: 'siege_social', label: "Siège social", type: 'text', required: true },
      { key: 'objet_social', label: "Objet social", type: 'textarea', required: true },
      { key: 'capital_initial', label: "Capital initial (FCFA)", type: 'text', required: true },
      { key: 'date_constitution', label: "Date de constitution", type: 'date', required: true },
      { key: 'nombre_membres_fondateurs', label: "Nombre de membres fondateurs", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSTITUTION DE SOCIÉTÉ COOPÉRATIVE</h1><h2>Conforme à l'Acte Uniforme OHADA relatif au Droit des Sociétés Coopératives</h2><p>Les soussignés, membres fondateurs, conviennent de constituer une société coopérative dont les caractéristiques sont les suivantes :</p><h3>Article 1 – Dénomination</h3><p>La coopérative est dénommée : <strong>{{denomination}}</strong></p><h3>Article 2 – Siège social</h3><p>Le siège social est fixé à : {{siege_social}}</p><h3>Article 3 – Objet social</h3><p>{{objet_social}}</p><h3>Article 4 – Capital initial</h3><p>Le capital initial est fixé à : <strong>{{capital_initial}} FCFA</strong></p><h3>Article 5 – Membres fondateurs</h3><p>Nombre de membres fondateurs : {{nombre_membres_fondateurs}}</p><h3>Article 6 – Date de constitution</h3><p>La présente coopérative est constituée le : {{date_constitution}}</p><p>Fait en foi de quoi, les membres fondateurs ont signé le présent accord.</p></div>`
  },
  {
    code: 'soc4_statuts_coopec',
    name: "Statuts de coopérative d'épargne et de crédit (COOPEC)",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Statuts d'une coopérative d'épargne et de crédit (COOPEC) conformes à la réglementation BCEAO et à l'Acte uniforme OHADA.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'nom_coopec', label: "Nom de la COOPEC", type: 'text', required: true },
      { key: 'localite', label: "Localité d'implantation", type: 'text', required: true },
      { key: 'zone_intervention', label: "Zone d'intervention", type: 'text', required: true },
      { key: 'part_sociale_minimale', label: "Valeur de la part sociale minimale (FCFA)", type: 'text', required: true },
      { key: 'date_assemblee_constitutive', label: "Date de l'assemblée constitutive", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>STATUTS DE LA COOPÉRATIVE D'ÉPARGNE ET DE CRÉDIT</h1><h2>{{nom_coopec}}</h2><p>Conformes à la réglementation BCEAO sur les SFD et à l'Acte uniforme OHADA</p><h3>Article 1 – Dénomination</h3><p>Il est fondé une Coopérative d'Épargne et de Crédit dénommée : <strong>{{nom_coopec}}</strong></p><h3>Article 2 – Siège et zone d'intervention</h3><p>Localité : {{localite}} – Zone d'intervention : {{zone_intervention}}</p><h3>Article 3 – Parts sociales</h3><p>La valeur nominale minimale de la part sociale est fixée à : {{part_sociale_minimale}} FCFA</p><h3>Article 4 – Objet</h3><p>La COOPEC a pour objet de collecter l'épargne de ses membres et de leur consentir des crédits dans le respect des dispositions réglementaires en vigueur.</p><h3>Article 5 – Date de création</h3><p>Assemblée constitutive tenue le : {{date_assemblee_constitutive}}</p></div>`
  },
  {
    code: 'soc4_statuts_cooperative_agricole',
    name: "Statuts de coopérative agricole",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Statuts types d'une coopérative agricole en Côte d'Ivoire, conformes à l'Acte uniforme OHADA et à la réglementation du Ministère de l'Agriculture.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'filiere_agricole', label: "Filière agricole (cacao, café, anacarde...)", type: 'text', required: true },
      { key: 'commune_implantation', label: "Commune d'implantation", type: 'text', required: true },
      { key: 'nombre_membres', label: "Nombre de membres fondateurs", type: 'text', required: true },
      { key: 'date_creation', label: "Date de création", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>STATUTS DE LA COOPÉRATIVE AGRICOLE</h1><h2>{{nom_cooperative}}</h2><h3>Article 1 – Dénomination et filière</h3><p>Il est constitué une coopérative agricole dénommée <strong>{{nom_cooperative}}</strong> opérant dans la filière : <strong>{{filiere_agricole}}</strong>.</p><h3>Article 2 – Siège social</h3><p>Commune d'implantation : {{commune_implantation}}</p><h3>Article 3 – Membres</h3><p>La coopérative est composée de {{nombre_membres}} membres fondateurs producteurs agricoles.</p><h3>Article 4 – Objet</h3><p>La coopérative a pour objet de regrouper les producteurs de la filière {{filiere_agricole}} pour améliorer leur production, leur accès aux intrants et la commercialisation de leurs produits.</p><h3>Article 5 – Date de création</h3><p>Créée le : {{date_creation}}</p></div>`
  },
  {
    code: 'soc4_statuts_cooperative_consommation',
    name: "Statuts de coopérative de consommation",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Statuts d'une coopérative de consommation permettant à ses membres de s'approvisionner en biens et services à des conditions avantageuses.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'siege_social', label: "Siège social", type: 'text', required: true },
      { key: 'categories_produits', label: "Catégories de produits/services", type: 'textarea', required: true },
      { key: 'cotisation_annuelle', label: "Cotisation annuelle par membre (FCFA)", type: 'text', required: true },
      { key: 'date_constitution', label: "Date de constitution", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>STATUTS DE LA COOPÉRATIVE DE CONSOMMATION</h1><h2>{{nom_cooperative}}</h2><h3>Article 1 – Dénomination</h3><p>Il est fondé une coopérative de consommation dénommée : <strong>{{nom_cooperative}}</strong></p><h3>Article 2 – Siège social</h3><p>{{siege_social}}</p><h3>Article 3 – Objet</h3><p>La coopérative a pour objet de fournir à ses membres, dans les meilleures conditions de qualité et de prix, les produits et services suivants : {{categories_produits}}</p><h3>Article 4 – Cotisation</h3><p>La cotisation annuelle de chaque membre est fixée à : {{cotisation_annuelle}} FCFA</p><h3>Article 5 – Constitution</h3><p>Constituée le : {{date_constitution}}</p></div>`
  },
  {
    code: 'soc4_statuts_cooperative_production_artisans',
    name: "Statuts de coopérative de production (artisans)",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Statuts d'une coopérative de production artisanale regroupant des artisans pour la production et la commercialisation commune de leurs produits.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'metier_artisanal', label: "Métier artisanal (tissage, poterie, maroquinerie...)", type: 'text', required: true },
      { key: 'siege_social', label: "Siège social", type: 'text', required: true },
      { key: 'part_sociale', label: "Valeur de la part sociale (FCFA)", type: 'text', required: true },
      { key: 'date_constitution', label: "Date de constitution", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>STATUTS DE LA COOPÉRATIVE DE PRODUCTION ARTISANALE</h1><h2>{{nom_cooperative}}</h2><h3>Article 1 – Dénomination et métier</h3><p>Coopérative de production artisanale : <strong>{{nom_cooperative}}</strong> – Métier : <strong>{{metier_artisanal}}</strong></p><h3>Article 2 – Siège social</h3><p>{{siege_social}}</p><h3>Article 3 – Objet</h3><p>La coopérative regroupe des artisans du secteur {{metier_artisanal}} pour organiser la production collective, mutualiser les équipements et commercialiser les produits en commun.</p><h3>Article 4 – Parts sociales</h3><p>Valeur de la part sociale : {{part_sociale}} FCFA</p><h3>Article 5 – Constitution</h3><p>Constituée le : {{date_constitution}}</p></div>`
  },
  {
    code: 'soc4_statuts_cooperative_habitat_social',
    name: "Statuts de coopérative d'habitat social",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Statuts d'une coopérative d'habitat social permettant à ses membres d'accéder à un logement décent à travers une épargne collective.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative d'habitat", type: 'text', required: true },
      { key: 'commune_cible', label: "Commune ciblée pour les logements", type: 'text', required: true },
      { key: 'apport_minimum_membre', label: "Apport minimum par membre (FCFA)", type: 'text', required: true },
      { key: 'nombre_logements_prevus', label: "Nombre de logements prévus", type: 'text', required: true },
      { key: 'date_assemblee_constitutive', label: "Date de l'assemblée constitutive", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>STATUTS DE LA COOPÉRATIVE D'HABITAT SOCIAL</h1><h2>{{nom_cooperative}}</h2><h3>Article 1 – Dénomination</h3><p>Il est fondé une coopérative d'habitat social dénommée : <strong>{{nom_cooperative}}</strong></p><h3>Article 2 – Commune d'intervention</h3><p>{{commune_cible}}</p><h3>Article 3 – Objet</h3><p>La coopérative a pour objet de permettre à ses membres d'accéder à la propriété immobilière à travers une épargne collective et la construction de {{nombre_logements_prevus}} logements sociaux.</p><h3>Article 4 – Apport obligatoire</h3><p>Apport minimum par membre : {{apport_minimum_membre}} FCFA</p><h3>Article 5 – Assemblée constitutive</h3><p>Tenue le : {{date_assemblee_constitutive}}</p></div>`
  },
  {
    code: 'soc4_accord_mutuelle_sante_communautaire',
    name: "Accord de service de mutuelles de santé communautaires",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Accord organisant le fonctionnement d'une mutuelle de santé communautaire offrant une couverture maladie accessible aux ménages à faibles revenus.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'nom_mutuelle', label: "Nom de la mutuelle de santé", type: 'text', required: true },
      { key: 'zone_couverture', label: "Zone de couverture géographique", type: 'text', required: true },
      { key: 'cotisation_mensuelle', label: "Cotisation mensuelle par ménage (FCFA)", type: 'text', required: true },
      { key: 'prestations_couvertes', label: "Prestations sanitaires couvertes", type: 'textarea', required: true },
      { key: 'structures_partenaires', label: "Structures sanitaires partenaires", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MUTUELLE DE SANTÉ COMMUNAUTAIRE</h1><h2>{{nom_mutuelle}}</h2><h3>Article 1 – Objet</h3><p>Le présent accord organise le fonctionnement de la mutuelle de santé communautaire <strong>{{nom_mutuelle}}</strong> couvrant la zone de : {{zone_couverture}}</p><h3>Article 2 – Cotisation</h3><p>Cotisation mensuelle par ménage : {{cotisation_mensuelle}} FCFA</p><h3>Article 3 – Prestations couvertes</h3><p>{{prestations_couvertes}}</p><h3>Article 4 – Structures partenaires</h3><p>Structures sanitaires partenaires : {{structures_partenaires}}</p><h3>Article 5 – Gestion et gouvernance</h3><p>La mutuelle est gérée de façon démocratique par un conseil d'administration élu par les membres en assemblée générale.</p></div>`
  },
  {
    code: 'soc4_accord_tontine_formalisee',
    name: "Accord de service de tontine formalisée",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord formalisant le fonctionnement d'une tontine, système d'épargne-crédit rotatif traditionnel, avec règles de gouvernance claires.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'nom_tontine', label: "Nom du groupe de tontine", type: 'text', required: true },
      { key: 'nombre_membres', label: "Nombre de membres", type: 'text', required: true },
      { key: 'mise_periodique', label: "Mise périodique par membre (FCFA)", type: 'text', required: true },
      { key: 'periodicite', label: "Périodicité des cotisations (hebdo/mensuel)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du cycle", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – TONTINE FORMALISÉE</h1><h2>{{nom_tontine}}</h2><h3>Article 1 – Présentation</h3><p>Le présent accord régit le fonctionnement du groupe de tontine <strong>{{nom_tontine}}</strong> composé de {{nombre_membres}} membres.</p><h3>Article 2 – Cotisations</h3><p>Chaque membre verse une mise de {{mise_periodique}} FCFA – Périodicité : {{periodicite}}</p><h3>Article 3 – Attribution du pot</h3><p>Le pot total est attribué à tour de rôle à chaque membre selon un ordre défini en assemblée. Aucun membre ne peut bénéficier deux fois du pot avant que tous les membres n'aient reçu.</p><h3>Article 4 – Début du cycle</h3><p>Premier cycle démarrant le : {{date_debut}}</p><h3>Article 5 – Sanctions</h3><p>Tout retard de cotisation entraîne une pénalité définie en assemblée générale. Tout défaut de cotisation répété peut entraîner l'exclusion du groupe.</p></div>`
  },
  {
    code: 'soc4_accord_avec_silc',
    name: "Accord de service de groupes d'épargne et de crédit (AVEC/SILC)",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord de fonctionnement d'un groupe AVEC (Association Villageoise d'Épargne et de Crédit) ou SILC, méthode de microfinance communautaire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'nom_groupe', label: "Nom du groupe AVEC/SILC", type: 'text', required: true },
      { key: 'village_quartier', label: "Village ou quartier", type: 'text', required: true },
      { key: 'epargne_minimale', label: "Épargne minimale par réunion (FCFA)", type: 'text', required: true },
      { key: 'taux_interet_credit', label: "Taux d'intérêt sur les crédits (%)", type: 'text', required: true },
      { key: 'duree_cycle', label: "Durée du cycle d'épargne (mois)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – GROUPE D'ÉPARGNE ET DE CRÉDIT (AVEC/SILC)</h1><h2>{{nom_groupe}}</h2><h3>Article 1 – Identification</h3><p>Groupe AVEC/SILC : <strong>{{nom_groupe}}</strong> – Localité : {{village_quartier}}</p><h3>Article 2 – Épargne</h3><p>Chaque membre épargne un minimum de {{epargne_minimale}} FCFA à chaque réunion.</p><h3>Article 3 – Crédit</h3><p>Les crédits sont accordés aux membres à un taux d'intérêt de {{taux_interet_credit}}% par mois. Les intérêts reviennent au fonds commun.</p><h3>Article 4 – Cycle</h3><p>Durée du cycle : {{duree_cycle}} mois, à l'issue desquels le fonds est partagé entre les membres proportionnellement à leurs épargnes.</p><h3>Article 5 – Gouvernance</h3><p>Le groupe est dirigé par un bureau élu comprenant un(e) président(e), un(e) secrétaire et un(e) trésorier(ère).</p></div>`
  },
  {
    code: 'soc4_accord_warrantage_agricole',
    name: "Accord de service de warrantage agricole (grenier communautaire)",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Accord organisant le warrantage agricole permettant aux producteurs de stocker leurs récoltes en garantie pour obtenir un crédit de campagne.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_structure', label: "Nom de la structure gestionnaire", type: 'text', required: true },
      { key: 'localite_grenier', label: "Localité du grenier communautaire", type: 'text', required: true },
      { key: 'produits_eligible', label: "Produits agricoles éligibles au warrantage", type: 'text', required: true },
      { key: 'taux_credit_stock', label: "Taux de crédit sur la valeur du stock (%)", type: 'text', required: true },
      { key: 'duree_stockage_max', label: "Durée maximale de stockage (mois)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – WARRANTAGE AGRICOLE</h1><h2>Grenier Communautaire – {{nom_structure}}</h2><h3>Article 1 – Objet</h3><p>Le présent accord établit les règles du warrantage agricole géré par <strong>{{nom_structure}}</strong> dans la localité de {{localite_grenier}}.</p><h3>Article 2 – Produits éligibles</h3><p>{{produits_eligible}}</p><h3>Article 3 – Crédit sur stock</h3><p>Le crédit accordé représente {{taux_credit_stock}}% de la valeur du stock nantie, évaluée au prix du marché à la date du dépôt.</p><h3>Article 4 – Durée de stockage</h3><p>Durée maximale de stockage : {{duree_stockage_max}} mois. Au-delà, des frais de garde supplémentaires s'appliquent.</p><h3>Article 5 – Remboursement</h3><p>Le producteur rembourse le crédit et les intérêts avant de récupérer son stock. En cas de défaut, le stock est liquidé pour couvrir la créance.</p></div>`
  },
  {
    code: 'soc4_accord_cooperative_scolaire',
    name: "Accord de service de coopérative scolaire (parents d'élèves)",
    category: 'association',
    price: 2000,
    priceMax: 6000,
    description: "Accord de fonctionnement d'une coopérative scolaire réunissant les parents d'élèves pour mutualiser les dépenses scolaires.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative scolaire", type: 'text', required: true },
      { key: 'etablissement', label: "Établissement scolaire concerné", type: 'text', required: true },
      { key: 'cotisation_annuelle', label: "Cotisation annuelle par parent (FCFA)", type: 'text', required: true },
      { key: 'services_offerts', label: "Services offerts aux membres", type: 'textarea', required: true },
      { key: 'annee_scolaire', label: "Année scolaire de référence", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – COOPÉRATIVE SCOLAIRE</h1><h2>{{nom_cooperative}}</h2><h3>Article 1 – Présentation</h3><p>La coopérative scolaire <strong>{{nom_cooperative}}</strong> regroupe les parents d'élèves de l'établissement : {{etablissement}}</p><h3>Article 2 – Cotisation</h3><p>Cotisation annuelle par parent : {{cotisation_annuelle}} FCFA – Année scolaire : {{annee_scolaire}}</p><h3>Article 3 – Services</h3><p>{{services_offerts}}</p><h3>Article 4 – Gouvernance</h3><p>La coopérative est administrée par un bureau de parents élu en assemblée générale pour un mandat d'un an.</p><h3>Article 5 – Engagement des membres</h3><p>Chaque parent membre s'engage à payer sa cotisation dans les délais, à participer aux activités et à respecter les décisions de l'assemblée générale.</p></div>`
  },
  {
    code: 'soc4_accord_cooperative_transport_taxis',
    name: "Accord de service de coopérative de transport (taxis)",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Accord de fonctionnement d'une coopérative de transport de taxis permettant aux chauffeurs de mutualiser leurs ressources et d'accéder à des services communs.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative de transport", type: 'text', required: true },
      { key: 'ville_exploitation', label: "Ville d'exploitation", type: 'text', required: true },
      { key: 'nombre_vehicules', label: "Nombre de véhicules membres", type: 'text', required: true },
      { key: 'cotisation_mensuelle', label: "Cotisation mensuelle par chauffeur (FCFA)", type: 'text', required: true },
      { key: 'services_mutualises', label: "Services mutualisés (entretien, assurance...)", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – COOPÉRATIVE DE TRANSPORT (TAXIS)</h1><h2>{{nom_cooperative}}</h2><h3>Article 1 – Identification</h3><p>Coopérative de transport : <strong>{{nom_cooperative}}</strong> – Ville : {{ville_exploitation}}</p><h3>Article 2 – Membres</h3><p>La coopérative regroupe {{nombre_vehicules}} véhicules de transport (taxis) appartenant à ses membres chauffeurs-propriétaires.</p><h3>Article 3 – Cotisation</h3><p>Cotisation mensuelle par chauffeur : {{cotisation_mensuelle}} FCFA</p><h3>Article 4 – Services mutualisés</h3><p>{{services_mutualises}}</p><h3>Article 5 – Discipline</h3><p>Tout membre qui ne respecte pas les engagements de la coopérative est passible de sanctions pouvant aller jusqu'à l'exclusion décidée en assemblée générale.</p></div>`
  },
  {
    code: 'soc4_accord_association_mutualiste',
    name: "Accord de service d'association mutualiste",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord organisant le fonctionnement d'une association mutualiste pour la solidarité entre ses membres face aux aléas de la vie.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_association', label: "Nom de l'association mutualiste", type: 'text', required: true },
      { key: 'cotisation_mensuelle', label: "Cotisation mensuelle (FCFA)", type: 'text', required: true },
      { key: 'evenements_couverts', label: "Événements pris en charge (décès, maladie, mariage...)", type: 'textarea', required: true },
      { key: 'montant_secours_max', label: "Montant maximum de secours par événement (FCFA)", type: 'text', required: true },
      { key: 'date_creation', label: "Date de création", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – ASSOCIATION MUTUALISTE</h1><h2>{{nom_association}}</h2><h3>Article 1 – Objet</h3><p>L'association mutualiste <strong>{{nom_association}}</strong> a pour vocation d'apporter une aide solidaire à ses membres lors d'événements difficiles de la vie.</p><h3>Article 2 – Cotisation</h3><p>Cotisation mensuelle par membre : {{cotisation_mensuelle}} FCFA</p><h3>Article 3 – Événements couverts</h3><p>{{evenements_couverts}}</p><h3>Article 4 – Plafond de secours</h3><p>Montant maximum de secours par événement : {{montant_secours_max}} FCFA</p><h3>Article 5 – Date de création</h3><p>Association créée le : {{date_creation}}</p></div>`
  },
  {
    code: 'soc4_accord_fondation_entreprise_rse',
    name: "Accord de service de fondation d'entreprise (RSE)",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Accord de création et de fonctionnement d'une fondation d'entreprise dans le cadre d'une démarche de Responsabilité Sociale des Entreprises (RSE).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'nom_fondation', label: "Nom de la fondation", type: 'text', required: true },
      { key: 'entreprise_fondatrice', label: "Entreprise fondatrice", type: 'text', required: true },
      { key: 'domaines_intervention', label: "Domaines d'intervention (éducation, santé, environnement...)", type: 'textarea', required: true },
      { key: 'dotation_annuelle', label: "Dotation annuelle de l'entreprise (FCFA)", type: 'text', required: true },
      { key: 'date_creation', label: "Date de création de la fondation", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – FONDATION D'ENTREPRISE (RSE)</h1><h2>{{nom_fondation}}</h2><h3>Article 1 – Création</h3><p>La fondation d'entreprise <strong>{{nom_fondation}}</strong> est créée à l'initiative de l'entreprise : {{entreprise_fondatrice}}</p><h3>Article 2 – Mission</h3><p>La fondation intervient dans les domaines suivants : {{domaines_intervention}}</p><h3>Article 3 – Financement</h3><p>L'entreprise fondatrice s'engage à doter la fondation de : {{dotation_annuelle}} FCFA par an.</p><h3>Article 4 – Gouvernance</h3><p>La fondation est administrée par un conseil d'administration paritaire comprenant des représentants de l'entreprise, des bénéficiaires et de la société civile.</p><h3>Article 5 – Date de création</h3><p>Créée le : {{date_creation}}</p></div>`
  },
  {
    code: 'soc4_accord_entreprise_sociale_solidaire',
    name: "Accord de service d'entreprise sociale et solidaire",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Accord de constitution et de fonctionnement d'une entreprise sociale et solidaire (ESS) poursuivant une mission sociale tout en générant des revenus.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'nom_entreprise', label: "Nom de l'entreprise sociale", type: 'text', required: true },
      { key: 'mission_sociale', label: "Mission sociale principale", type: 'textarea', required: true },
      { key: 'activite_economique', label: "Activité économique génératrice de revenus", type: 'text', required: true },
      { key: 'part_benefices_reinvestis', label: "Part des bénéfices réinvestis dans la mission sociale (%)", type: 'text', required: true },
      { key: 'date_creation', label: "Date de création", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – ENTREPRISE SOCIALE ET SOLIDAIRE</h1><h2>{{nom_entreprise}}</h2><h3>Article 1 – Mission et activité</h3><p>L'entreprise sociale et solidaire <strong>{{nom_entreprise}}</strong> poursuit la mission suivante : {{mission_sociale}}</p><p>Activité économique : {{activite_economique}}</p><h3>Article 2 – Répartition des bénéfices</h3><p>Au minimum {{part_benefices_reinvestis}}% des bénéfices sont obligatoirement réinvestis dans la mission sociale. La distribution aux actionnaires est limitée.</p><h3>Article 3 – Gouvernance</h3><p>L'entreprise pratique une gouvernance participative impliquant toutes les parties prenantes : salariés, bénéficiaires, partenaires.</p><h3>Article 4 – Date de création</h3><p>Créée le : {{date_creation}}</p></div>`
  },
  {
    code: 'soc4_accord_impact_investing',
    name: "Accord de service d'impact investing (investissement à impact)",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Accord cadrant un investissement à impact social et/ou environnemental mesurable en Afrique de l'Ouest, avec mécanismes de reporting d'impact.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'investisseur', label: "Nom de l'investisseur", type: 'text', required: true },
      { key: 'entreprise_cible', label: "Entreprise ou projet cible", type: 'text', required: true },
      { key: 'montant_investissement', label: "Montant de l'investissement (FCFA)", type: 'text', required: true },
      { key: 'impact_vise', label: "Impact social/environnemental visé", type: 'textarea', required: true },
      { key: 'indicateurs_impact', label: "Indicateurs de mesure de l'impact", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD D'INVESTISSEMENT À IMPACT</h1><h2>{{investisseur}} — {{entreprise_cible}}</h2><h3>Article 1 – Parties</h3><p>Investisseur : <strong>{{investisseur}}</strong> – Entreprise cible : <strong>{{entreprise_cible}}</strong></p><h3>Article 2 – Investissement</h3><p>Montant de l'investissement : {{montant_investissement}} FCFA</p><h3>Article 3 – Impact visé</h3><p>{{impact_vise}}</p><h3>Article 4 – Indicateurs de performance d'impact</h3><p>{{indicateurs_impact}}</p><h3>Article 5 – Reporting</h3><p>L'entreprise cible s'engage à publier un rapport d'impact annuel permettant à l'investisseur de mesurer l'atteinte des objectifs d'impact définis au présent accord.</p></div>`
  },
  {
    code: 'soc4_accord_label_ess',
    name: "Accord de service de label ESS",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Accord cadrant la procédure d'attribution et de maintien d'un label ESS (Économie Sociale et Solidaire) pour les organisations en Afrique francophone.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'organisme_labelisateur', label: "Organisme attribuant le label", type: 'text', required: true },
      { key: 'organisation_candidate', label: "Organisation candidate au label", type: 'text', required: true },
      { key: 'criteres_label', label: "Critères d'attribution du label", type: 'textarea', required: true },
      { key: 'duree_validite_label', label: "Durée de validité du label (années)", type: 'text', required: true },
      { key: 'date_attribution', label: "Date d'attribution du label", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – LABEL ESS</h1><h2>Attribution du Label Économie Sociale et Solidaire</h2><h3>Article 1 – Parties</h3><p>Organisme labelisateur : <strong>{{organisme_labelisateur}}</strong><br/>Organisation candidate : <strong>{{organisation_candidate}}</strong></p><h3>Article 2 – Critères</h3><p>{{criteres_label}}</p><h3>Article 3 – Durée de validité</h3><p>Le label est attribué pour une durée de {{duree_validite_label}} an(s), renouvelable après audit de conformité.</p><h3>Article 4 – Date d'attribution</h3><p>Label attribué le : {{date_attribution}}</p><h3>Article 5 – Obligations du labelisé</h3><p>L'organisation labelisée s'engage à maintenir les critères ESS, à produire un rapport annuel et à soumettre à un audit de renouvellement avant l'expiration du label.</p></div>`
  },
  {
    code: 'soc4_accord_bcorp_certification',
    name: "Accord de service de B Corp (certification)",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Accord d'accompagnement à la certification B Corp pour les entreprises africaines souhaitant démontrer leur impact social et environnemental positif.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'entreprise_candidate', label: "Entreprise candidate à la certification B Corp", type: 'text', required: true },
      { key: 'cabinet_accompagnateur', label: "Cabinet ou consultant accompagnateur", type: 'text', required: true },
      { key: 'score_bimpact_cible', label: "Score B Impact Assessment cible (minimum 80)", type: 'text', required: true },
      { key: 'domaines_amelioration', label: "Domaines prioritaires d'amélioration", type: 'textarea', required: true },
      { key: 'date_debut_accompagnement', label: "Date de début de l'accompagnement", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACCOMPAGNEMENT À LA CERTIFICATION B CORP</h1><h2>{{entreprise_candidate}}</h2><h3>Article 1 – Parties</h3><p>Entreprise candidate : <strong>{{entreprise_candidate}}</strong><br/>Cabinet accompagnateur : <strong>{{cabinet_accompagnateur}}</strong></p><h3>Article 2 – Objectif de certification</h3><p>Score B Impact Assessment cible : {{score_bimpact_cible}} points (minimum requis : 80 points)</p><h3>Article 3 – Domaines d'amélioration prioritaires</h3><p>{{domaines_amelioration}}</p><h3>Article 4 – Calendrier</h3><p>Accompagnement démarrant le : {{date_debut_accompagnement}}</p><h3>Article 5 – Engagement</h3><p>L'entreprise s'engage à modifier ses statuts pour intégrer la mission sociale et environnementale et à soumettre à une évaluation tierce tous les trois ans.</p></div>`
  },
  {
    code: 'soc4_accord_entrepreneuriat_feminin',
    name: "Accord de service d'entrepreneuriat féminin (FAWE/APBEF)",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord de partenariat pour l'accompagnement de l'entrepreneuriat féminin en Afrique francophone, dans le cadre de programmes comme FAWE ou APBEF.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'programme', label: "Nom du programme d'appui", type: 'text', required: true },
      { key: 'organisation_porteuse', label: "Organisation porteuse du programme", type: 'text', required: true },
      { key: 'beneficiaires_cibles', label: "Profil des femmes bénéficiaires ciblées", type: 'textarea', required: true },
      { key: 'services_accompagnement', label: "Services d'accompagnement proposés", type: 'textarea', required: true },
      { key: 'duree_programme', label: "Durée du programme (mois)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – ENTREPRENEURIAT FÉMININ</h1><h2>Programme : {{programme}}</h2><h3>Article 1 – Présentation</h3><p>Programme d'appui à l'entrepreneuriat féminin : <strong>{{programme}}</strong><br/>Organisation porteuse : <strong>{{organisation_porteuse}}</strong></p><h3>Article 2 – Bénéficiaires</h3><p>{{beneficiaires_cibles}}</p><h3>Article 3 – Services d'accompagnement</h3><p>{{services_accompagnement}}</p><h3>Article 4 – Durée</h3><p>Programme d'une durée de {{duree_programme}} mois.</p><h3>Article 5 – Engagements réciproques</h3><p>L'organisation porteuse s'engage à fournir l'accompagnement décrit. Les bénéficiaires s'engagent à participer activement, à mettre en œuvre les recommandations et à partager leurs résultats pour évaluation.</p></div>`
  },
  {
    code: 'soc4_accord_partenariat_etat_ess',
    name: "Accord de partenariat État-ESS (programme officiel)",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Convention de partenariat entre l'État (ou une collectivité) et une organisation de l'Économie Sociale et Solidaire dans le cadre d'un programme officiel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'ministere_partenaire', label: "Ministère ou collectivité partenaire", type: 'text', required: true },
      { key: 'organisation_ess', label: "Organisation ESS partenaire", type: 'text', required: true },
      { key: 'programme_officiel', label: "Nom du programme officiel", type: 'text', required: true },
      { key: 'objectifs_partenariat', label: "Objectifs du partenariat", type: 'textarea', required: true },
      { key: 'financement_prevu', label: "Financement prévu (FCFA)", type: 'text', required: true },
      { key: 'duree_partenariat', label: "Durée du partenariat", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ÉTAT – ÉCONOMIE SOCIALE ET SOLIDAIRE</h1><h2>{{programme_officiel}}</h2><h3>Article 1 – Parties</h3><p>L'État, représenté par : <strong>{{ministere_partenaire}}</strong><br/>L'organisation ESS : <strong>{{organisation_ess}}</strong></p><h3>Article 2 – Programme</h3><p>Le présent accord s'inscrit dans le cadre du programme officiel : {{programme_officiel}}</p><h3>Article 3 – Objectifs</h3><p>{{objectifs_partenariat}}</p><h3>Article 4 – Financement</h3><p>Financement prévu : {{financement_prevu}} FCFA</p><h3>Article 5 – Durée</h3><p>Durée du partenariat : {{duree_partenariat}}</p></div>`
  },
  {
    code: 'soc4_rapport_impact_social_annuel',
    name: "Rapport d'impact social annuel",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Modèle de rapport annuel d'impact social pour les organisations de l'ESS, permettant de mesurer et de communiquer sur les effets de leurs activités.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_organisation', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'annee_rapport', label: "Année du rapport", type: 'text', required: true },
      { key: 'principaux_resultats', label: "Principaux résultats obtenus", type: 'textarea', required: true },
      { key: 'beneficiaires_touches', label: "Nombre de bénéficiaires touchés", type: 'text', required: true },
      { key: 'perspectives_annee_suivante', label: "Perspectives pour l'année suivante", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT D'IMPACT SOCIAL ANNUEL</h1><h2>{{nom_organisation}} – Exercice {{annee_rapport}}</h2><h3>1. Présentation de l'organisation</h3><p>Organisation : <strong>{{nom_organisation}}</strong></p><h3>2. Principaux résultats</h3><p>{{principaux_resultats}}</p><h3>3. Bénéficiaires</h3><p>Nombre de bénéficiaires touchés au cours de l'exercice : <strong>{{beneficiaires_touches}}</strong></p><h3>4. Perspectives</h3><p>{{perspectives_annee_suivante}}</p><h3>5. Conclusion</h3><p>Ce rapport d'impact social témoigne de l'engagement de l'organisation à créer de la valeur partagée pour ses membres, bénéficiaires et la société.</p></div>`
  },
  {
    code: 'soc4_plan_developpement_cooperative',
    name: "Plan de développement de la coopérative",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Modèle de plan de développement stratégique pour une coopérative, définissant les axes prioritaires, les ressources et le calendrier sur 3 à 5 ans.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'horizon_plan', label: "Horizon du plan (ex: 2025-2028)", type: 'text', required: true },
      { key: 'vision_strategique', label: "Vision stratégique", type: 'textarea', required: true },
      { key: 'axes_prioritaires', label: "Axes prioritaires de développement", type: 'textarea', required: true },
      { key: 'ressources_mobiliser', label: "Ressources à mobiliser", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT STRATÉGIQUE</h1><h2>{{nom_cooperative}} – {{horizon_plan}}</h2><h3>1. Vision stratégique</h3><p>{{vision_strategique}}</p><h3>2. Axes prioritaires</h3><p>{{axes_prioritaires}}</p><h3>3. Ressources à mobiliser</h3><p>{{ressources_mobiliser}}</p><h3>4. Suivi et évaluation</h3><p>Le conseil d'administration effectue une revue semestrielle du plan et ajuste les actions en fonction des résultats obtenus. Un rapport annuel de mise en œuvre est présenté à l'assemblée générale.</p></div>`
  },
  {
    code: 'soc4_accord_formation_economie_sociale',
    name: "Accord de service de formation en économie sociale",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Accord de prestation de formation en économie sociale et solidaire destiné aux dirigeants, membres et personnel des organisations coopératives et mutualistes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'prestataire_formation', label: "Organisme de formation", type: 'text', required: true },
      { key: 'organisation_beneficiaire', label: "Organisation bénéficiaire", type: 'text', required: true },
      { key: 'themes_formation', label: "Thèmes de formation", type: 'textarea', required: true },
      { key: 'duree_formation', label: "Durée totale de la formation (jours)", type: 'text', required: true },
      { key: 'cout_formation', label: "Coût de la formation (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – FORMATION EN ÉCONOMIE SOCIALE</h1><h2>{{prestataire_formation}} / {{organisation_beneficiaire}}</h2><h3>Article 1 – Parties</h3><p>Prestataire : <strong>{{prestataire_formation}}</strong><br/>Bénéficiaire : <strong>{{organisation_beneficiaire}}</strong></p><h3>Article 2 – Thèmes de formation</h3><p>{{themes_formation}}</p><h3>Article 3 – Durée</h3><p>Durée totale : {{duree_formation}} jour(s)</p><h3>Article 4 – Coût</h3><p>Coût de la formation : {{cout_formation}} FCFA</p><h3>Article 5 – Évaluation</h3><p>Une évaluation de la formation est réalisée en fin de session. Une attestation de formation est délivrée à chaque participant ayant satisfait aux exigences de présence.</p></div>`
  },
  {
    code: 'soc4_accord_partenariat_international_ess',
    name: "Accord de partenariat international ESS (réseau Coop Africa)",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Accord de partenariat entre une organisation ESS africaine et un réseau international (type Coop Africa, ACI) pour le renforcement des capacités coopératives.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'organisation_africaine', label: "Organisation ESS africaine", type: 'text', required: true },
      { key: 'reseau_international', label: "Réseau international partenaire", type: 'text', required: true },
      { key: 'domaines_cooperation', label: "Domaines de coopération", type: 'textarea', required: true },
      { key: 'duree_partenariat', label: "Durée du partenariat", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT INTERNATIONAL ESS</h1><h2>{{organisation_africaine}} / {{reseau_international}}</h2><h3>Article 1 – Parties</h3><p>Organisation africaine : <strong>{{organisation_africaine}}</strong><br/>Réseau international : <strong>{{reseau_international}}</strong></p><h3>Article 2 – Domaines de coopération</h3><p>{{domaines_cooperation}}</p><h3>Article 3 – Durée</h3><p>{{duree_partenariat}}</p><h3>Article 4 – Date de signature</h3><p>Signé le : {{date_signature}}</p><h3>Article 5 – Principes directeurs</h3><p>Le partenariat repose sur les principes coopératifs universels (ACI) : adhésion volontaire, démocratie, autonomie, éducation, coopération entre coopératives et engagement communautaire.</p></div>`
  },
  {
    code: 'soc4_charte_entreprise_impact_positif',
    name: "Charte de l'entreprise à impact positif en Afrique",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Charte d'engagement d'une entreprise à impact positif en Afrique, définissant ses responsabilités envers les parties prenantes, la communauté et l'environnement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'secteur_activite', label: "Secteur d'activité", type: 'text', required: true },
      { key: 'engagements_sociaux', label: "Engagements sociaux envers les communautés", type: 'textarea', required: true },
      { key: 'engagements_environnementaux', label: "Engagements environnementaux", type: 'textarea', required: true },
      { key: 'date_signature_charte', label: "Date de signature de la charte", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ENTREPRISE À IMPACT POSITIF EN AFRIQUE</h1><h2>{{nom_entreprise}}</h2><h3>Préambule</h3><p>L'entreprise <strong>{{nom_entreprise}}</strong>, opérant dans le secteur {{secteur_activite}}, adopte la présente charte d'impact positif et s'engage à placer la responsabilité au cœur de sa stratégie.</p><h3>I. Engagements sociaux</h3><p>{{engagements_sociaux}}</p><h3>II. Engagements environnementaux</h3><p>{{engagements_environnementaux}}</p><h3>III. Reddition de comptes</h3><p>L'entreprise publie chaque année un rapport d'impact mesurant l'atteinte de ses engagements.</p><h3>Signature</h3><p>Charte adoptée le : {{date_signature_charte}}</p></div>`
  },

  // ─── 25 templates Coopératives/Mutuelles (préfixe coop2_) ───
  {
    code: 'coop2_pv_ag_constitutive',
    name: "Procès-verbal d'assemblée générale constitutive de coopérative",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Procès-verbal constatant la tenue de l'assemblée générale constitutive d'une coopérative OHADA, avec adoption des statuts et élection des organes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'lieu_assemblee', label: "Lieu de l'assemblée", type: 'text', required: true },
      { key: 'date_assemblee', label: "Date de l'assemblée constitutive", type: 'date', required: true },
      { key: 'nombre_membres_presents', label: "Nombre de membres présents", type: 'text', required: true },
      { key: 'president_seance', label: "Président de séance", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL D'ASSEMBLÉE GÉNÉRALE CONSTITUTIVE</h1><h2>{{nom_cooperative}}</h2><p>L'an deux mille vingt-cinq, le {{date_assemblee}}, les membres fondateurs se sont réunis en assemblée générale constitutive à : {{lieu_assemblee}}</p><h3>1. Participants</h3><p>Nombre de membres présents ou représentés : {{nombre_membres_presents}}<br/>Président de séance : {{president_seance}}</p><h3>2. Ordre du jour</h3><p>1° Présentation du projet coopératif ; 2° Adoption des statuts ; 3° Élection du conseil d'administration ; 4° Élection du comité de surveillance ; 5° Questions diverses.</p><h3>3. Délibérations</h3><p>Après délibération, l'assemblée adopte à l'unanimité les statuts de la coopérative et procède à l'élection des organes de direction.</p><h3>4. Clôture</h3><p>La séance est levée et le présent procès-verbal signé par le président de séance et le secrétaire.</p></div>`
  },
  {
    code: 'coop2_pv_ag_annuelle',
    name: "Procès-verbal d'assemblée générale annuelle coopérative",
    category: 'association',
    price: 2000,
    priceMax: 6000,
    description: "Procès-verbal de l'assemblée générale annuelle d'une coopérative approuvant les comptes, le rapport de gestion et les orientations de l'exercice suivant.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'date_ag', label: "Date de l'assemblée générale", type: 'date', required: true },
      { key: 'exercice_approuve', label: "Exercice comptable approuvé", type: 'text', required: true },
      { key: 'resultat_exercice', label: "Résultat de l'exercice (FCFA)", type: 'text', required: true },
      { key: 'decisions_prises', label: "Décisions principales prises", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL D'ASSEMBLÉE GÉNÉRALE ANNUELLE</h1><h2>{{nom_cooperative}}</h2><p>Assemblée tenue le : {{date_ag}} – Exercice approuvé : {{exercice_approuve}}</p><h3>1. Rapport de gestion</h3><p>Le conseil d'administration présente son rapport de gestion pour l'exercice {{exercice_approuve}}.</p><h3>2. Approbation des comptes</h3><p>L'assemblée approuve les comptes de l'exercice. Résultat de l'exercice : <strong>{{resultat_exercice}} FCFA</strong></p><h3>3. Décisions</h3><p>{{decisions_prises}}</p><h3>4. Clôture</h3><p>L'assemblée générale annuelle est clôturée après épuisement de l'ordre du jour.</p></div>`
  },
  {
    code: 'coop2_reglement_interieur',
    name: "Règlement intérieur de coopérative (OHADA)",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Règlement intérieur précisant les modalités de fonctionnement d'une coopérative OHADA non prévues par les statuts, notamment les droits et devoirs des membres.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'cotisation_adhesion', label: "Droit d'adhésion initial (FCFA)", type: 'text', required: true },
      { key: 'sanctions_disciplinaires', label: "Sanctions disciplinaires applicables", type: 'textarea', required: true },
      { key: 'frequence_reunions_ca', label: "Fréquence des réunions du conseil d'administration", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption du règlement", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT INTÉRIEUR</h1><h2>{{nom_cooperative}}</h2><p>Adopté en assemblée générale le : {{date_adoption}}</p><h3>Article 1 – Adhésion</h3><p>Tout candidat à l'adhésion doit verser un droit d'entrée de : {{cotisation_adhesion}} FCFA et souscrire au moins une part sociale.</p><h3>Article 2 – Réunions du conseil d'administration</h3><p>Fréquence des réunions : {{frequence_reunions_ca}}</p><h3>Article 3 – Sanctions</h3><p>{{sanctions_disciplinaires}}</p><h3>Article 4 – Confidentialité</h3><p>Les membres s'engagent à respecter la confidentialité des informations relatives aux affaires de la coopérative et à ses membres.</p></div>`
  },
  {
    code: 'coop2_accord_parts_sociales',
    name: "Accord de parts sociales de coopérative",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord organisant la souscription, la cession et le remboursement des parts sociales au sein d'une coopérative OHADA.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'valeur_nominale_part', label: "Valeur nominale de la part sociale (FCFA)", type: 'text', required: true },
      { key: 'nombre_parts_minimum', label: "Nombre minimal de parts par membre", type: 'text', required: true },
      { key: 'conditions_cession', label: "Conditions de cession des parts", type: 'textarea', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTS SOCIALES DE COOPÉRATIVE</h1><h2>{{nom_cooperative}}</h2><h3>Article 1 – Valeur nominale</h3><p>La valeur nominale de la part sociale est fixée à : <strong>{{valeur_nominale_part}} FCFA</strong></p><h3>Article 2 – Souscription minimale</h3><p>Chaque membre doit détenir au minimum {{nombre_parts_minimum}} part(s) sociale(s).</p><h3>Article 3 – Conditions de cession</h3><p>{{conditions_cession}}</p><h3>Article 4 – Remboursement</h3><p>En cas de retrait ou d'exclusion, les parts sont remboursées à leur valeur nominale, déduction faite des pertes éventuelles imputables au membre sortant.</p><h3>Article 5 – Date</h3><p>Accord adopté le : {{date_accord}}</p></div>`
  },
  {
    code: 'coop2_accord_ristourne_membres',
    name: "Accord de ristourne aux membres (excédent)",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord définissant les modalités de calcul et de distribution des ristournes aux membres d'une coopérative sur la base des excédents réalisés.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'exercice_ristourne', label: "Exercice de référence pour la ristourne", type: 'text', required: true },
      { key: 'excedent_total', label: "Excédent total à distribuer (FCFA)", type: 'text', required: true },
      { key: 'critere_calcul_ristourne', label: "Critère de calcul de la ristourne (opérations réalisées, parts...)", type: 'textarea', required: true },
      { key: 'date_distribution', label: "Date de distribution des ristournes", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE RISTOURNE AUX MEMBRES</h1><h2>{{nom_cooperative}} – Exercice {{exercice_ristourne}}</h2><h3>Article 1 – Excédent distribuable</h3><p>L'assemblée générale décide de distribuer un excédent total de : <strong>{{excedent_total}} FCFA</strong> sous forme de ristournes aux membres.</p><h3>Article 2 – Critère de calcul</h3><p>{{critere_calcul_ristourne}}</p><h3>Article 3 – Distribution</h3><p>Les ristournes seront versées le : {{date_distribution}}</p><h3>Article 4 – Acceptation</h3><p>Chaque membre bénéficiaire reçoit notification du montant de sa ristourne et dispose d'un délai pour en réclamer le versement ou la capitalisation en parts sociales.</p></div>`
  },
  {
    code: 'coop2_accord_fonds_reserve_legale',
    name: "Accord de fonds de réserve légale (coopérative)",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord organisant la constitution et l'utilisation du fonds de réserve légale obligatoire pour les coopératives selon l'Acte uniforme OHADA.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'taux_dotation_reserve', label: "Taux de dotation annuelle à la réserve légale (%)", type: 'text', required: true },
      { key: 'plafond_reserve', label: "Plafond de la réserve légale (% du capital)", type: 'text', required: true },
      { key: 'conditions_utilisation', label: "Conditions d'utilisation de la réserve légale", type: 'textarea', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE FONDS DE RÉSERVE LÉGALE</h1><h2>{{nom_cooperative}}</h2><h3>Article 1 – Dotation obligatoire</h3><p>Conformément à l'Acte uniforme OHADA, un taux de {{taux_dotation_reserve}}% des excédents annuels est obligatoirement affecté à la réserve légale.</p><h3>Article 2 – Plafond</h3><p>La réserve légale est plafonnée à {{plafond_reserve}}% du capital social. Une fois ce plafond atteint, la dotation obligatoire cesse.</p><h3>Article 3 – Conditions d'utilisation</h3><p>{{conditions_utilisation}}</p><h3>Article 4 – Intangibilité</h3><p>La réserve légale ne peut être distribuée entre les membres. Elle ne peut être utilisée que pour couvrir les pertes de la coopérative.</p><h3>Article 5 – Date</h3><p>Accord adopté le : {{date_accord}}</p></div>`
  },
  {
    code: 'coop2_accord_liquidation_cooperative',
    name: "Accord de liquidation de coopérative",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Accord organisant la liquidation volontaire d'une coopérative, la réalisation de l'actif, l'apurement du passif et la répartition du boni de liquidation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative en liquidation", type: 'text', required: true },
      { key: 'nom_liquidateur', label: "Nom du liquidateur désigné", type: 'text', required: true },
      { key: 'motif_liquidation', label: "Motif de la liquidation", type: 'textarea', required: true },
      { key: 'date_dissolution', label: "Date de dissolution", type: 'date', required: true },
      { key: 'actif_net_estime', label: "Actif net estimé (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE LIQUIDATION DE COOPÉRATIVE</h1><h2>{{nom_cooperative}}</h2><h3>Article 1 – Dissolution</h3><p>La coopérative <strong>{{nom_cooperative}}</strong> est dissoute à compter du : {{date_dissolution}}</p><h3>Article 2 – Motif</h3><p>{{motif_liquidation}}</p><h3>Article 3 – Liquidateur</h3><p>L'assemblée générale nomme comme liquidateur : <strong>{{nom_liquidateur}}</strong></p><h3>Article 4 – Mission du liquidateur</h3><p>Le liquidateur réalise l'actif, apure le passif et répartit le boni de liquidation entre les membres proportionnellement à leurs parts sociales.</p><h3>Article 5 – Actif net</h3><p>Actif net estimé à la date de dissolution : {{actif_net_estime}} FCFA</p></div>`
  },
  {
    code: 'coop2_accord_fusion_cooperatives',
    name: "Accord de fusion de coopératives",
    category: 'association',
    price: 7000,
    priceMax: 21000,
    description: "Accord cadrant la fusion de deux coopératives OHADA par absorption ou constitution d'une nouvelle entité, avec transfert universel de patrimoine.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'cooperative_absorbante', label: "Coopérative absorbante (ou nouvelle entité)", type: 'text', required: true },
      { key: 'cooperative_absorbee', label: "Coopérative absorbée", type: 'text', required: true },
      { key: 'motif_fusion', label: "Motif de la fusion", type: 'textarea', required: true },
      { key: 'date_effet_fusion', label: "Date d'effet de la fusion", type: 'date', required: true },
      { key: 'parite_echange_parts', label: "Parité d'échange des parts sociales", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE FUSION DE COOPÉRATIVES</h1><h2>{{cooperative_absorbante}} / {{cooperative_absorbee}}</h2><h3>Article 1 – Parties</h3><p>Coopérative absorbante : <strong>{{cooperative_absorbante}}</strong><br/>Coopérative absorbée : <strong>{{cooperative_absorbee}}</strong></p><h3>Article 2 – Motif de la fusion</h3><p>{{motif_fusion}}</p><h3>Article 3 – Parité d'échange</h3><p>{{parite_echange_parts}}</p><h3>Article 4 – Transfert de patrimoine</h3><p>La fusion entraîne le transfert universel du patrimoine de la coopérative absorbée à la coopérative absorbante, à la date d'effet fixée au : {{date_effet_fusion}}</p><h3>Article 5 – Sort des membres</h3><p>Les membres de la coopérative absorbée deviennent de plein droit membres de la coopérative absorbante selon la parité d'échange définie.</p></div>`
  },
  {
    code: 'coop2_accord_scission_cooperative',
    name: "Accord de scission de coopérative",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Accord organisant la scission d'une coopérative en deux ou plusieurs entités distinctes, avec répartition du patrimoine et des membres.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'cooperative_scindee', label: "Coopérative à scinder", type: 'text', required: true },
      { key: 'nouvelles_cooperatives', label: "Nouvelles coopératives issues de la scission", type: 'text', required: true },
      { key: 'motif_scission', label: "Motif de la scission", type: 'textarea', required: true },
      { key: 'repartition_patrimoine', label: "Clé de répartition du patrimoine", type: 'textarea', required: true },
      { key: 'date_effet_scission', label: "Date d'effet de la scission", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SCISSION DE COOPÉRATIVE</h1><h2>{{cooperative_scindee}}</h2><h3>Article 1 – Coopérative concernée</h3><p>La coopérative <strong>{{cooperative_scindee}}</strong> fait l'objet d'une scission.</p><h3>Article 2 – Nouvelles entités</h3><p>Nouvelles coopératives créées : {{nouvelles_cooperatives}}</p><h3>Article 3 – Motif</h3><p>{{motif_scission}}</p><h3>Article 4 – Répartition du patrimoine</h3><p>{{repartition_patrimoine}}</p><h3>Article 5 – Date d'effet</h3><p>La scission prend effet le : {{date_effet_scission}}</p></div>`
  },
  {
    code: 'coop2_accord_adhesion_union',
    name: "Accord d'adhésion à une union de coopératives",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord par lequel une coopérative adhère à une union ou fédération de coopératives pour bénéficier de services communs et d'une représentation collective.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'cooperative_adherente', label: "Coopérative adhérente", type: 'text', required: true },
      { key: 'union_cooperative', label: "Union ou fédération de coopératives", type: 'text', required: true },
      { key: 'cotisation_union', label: "Cotisation annuelle à l'union (FCFA)", type: 'text', required: true },
      { key: 'avantages_adhesion', label: "Avantages de l'adhésion", type: 'textarea', required: true },
      { key: 'date_adhesion', label: "Date d'adhésion", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD D'ADHÉSION À UNE UNION DE COOPÉRATIVES</h1><h2>{{cooperative_adherente}} → {{union_cooperative}}</h2><h3>Article 1 – Adhésion</h3><p>La coopérative <strong>{{cooperative_adherente}}</strong> adhère à l'union : <strong>{{union_cooperative}}</strong> à compter du {{date_adhesion}}</p><h3>Article 2 – Cotisation</h3><p>Cotisation annuelle à l'union : {{cotisation_union}} FCFA</p><h3>Article 3 – Avantages</h3><p>{{avantages_adhesion}}</p><h3>Article 4 – Engagements</h3><p>La coopérative adhérente s'engage à respecter les règles et décisions de l'union, à payer ses cotisations dans les délais et à participer aux assemblées générales de l'union.</p></div>`
  },
  {
    code: 'coop2_accord_audit_cooperative',
    name: "Accord de service d'audit de coopérative",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de mission d'audit financier et organisationnel d'une coopérative, permettant de vérifier la conformité avec les exigences OHADA.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'cabinet_audit', label: "Cabinet d'audit mandaté", type: 'text', required: true },
      { key: 'cooperative_auditee', label: "Coopérative auditée", type: 'text', required: true },
      { key: 'exercices_audites', label: "Exercice(s) audité(s)", type: 'text', required: true },
      { key: 'perimetre_audit', label: "Périmètre de l'audit (financier, organisationnel, conformité...)", type: 'textarea', required: true },
      { key: 'honoraires_audit', label: "Honoraires d'audit (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – AUDIT DE COOPÉRATIVE</h1><h2>{{cabinet_audit}} / {{cooperative_auditee}}</h2><h3>Article 1 – Parties</h3><p>Cabinet d'audit : <strong>{{cabinet_audit}}</strong><br/>Coopérative auditée : <strong>{{cooperative_auditee}}</strong></p><h3>Article 2 – Mission</h3><p>Le cabinet est mandaté pour auditer les exercices : {{exercices_audites}}</p><h3>Article 3 – Périmètre</h3><p>{{perimetre_audit}}</p><h3>Article 4 – Honoraires</h3><p>Honoraires convenus : {{honoraires_audit}} FCFA</p><h3>Article 5 – Rapport d'audit</h3><p>Le cabinet remet un rapport d'audit détaillé dans les 30 jours suivant la fin des travaux de terrain. Le rapport est présenté à l'assemblée générale de la coopérative.</p></div>`
  },
  {
    code: 'coop2_accord_commissariat_comptes',
    name: "Accord de service de commissariat aux comptes de coopérative",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Lettre de mission d'un commissaire aux comptes pour la certification des comptes annuels d'une coopérative OHADA.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'commissaire_comptes', label: "Commissaire aux comptes désigné", type: 'text', required: true },
      { key: 'cooperative_cliente', label: "Coopérative cliente", type: 'text', required: true },
      { key: 'duree_mandat', label: "Durée du mandat (exercices)", type: 'text', required: true },
      { key: 'honoraires_annuels', label: "Honoraires annuels (FCFA)", type: 'text', required: true },
      { key: 'date_prise_fonction', label: "Date de prise de fonction", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>LETTRE DE MISSION – COMMISSARIAT AUX COMPTES</h1><h2>{{cooperative_cliente}}</h2><h3>Article 1 – Désignation</h3><p>Commissaire aux comptes : <strong>{{commissaire_comptes}}</strong><br/>Désigné par l'assemblée générale de la coopérative : <strong>{{cooperative_cliente}}</strong></p><h3>Article 2 – Durée du mandat</h3><p>Mandat de {{duree_mandat}} exercice(s), renouvelable une fois par décision de l'assemblée générale.</p><h3>Article 3 – Mission</h3><p>Le commissaire certifie que les comptes annuels de la coopérative sont réguliers, sincères et donnent une image fidèle du résultat et de la situation financière.</p><h3>Article 4 – Honoraires</h3><p>Honoraires annuels : {{honoraires_annuels}} FCFA – Prise de fonction : {{date_prise_fonction}}</p></div>`
  },
  {
    code: 'coop2_accord_formation_dirigeants',
    name: "Accord de service de formation des dirigeants de coopérative",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Accord de formation destiné aux administrateurs et dirigeants de coopératives sur la gouvernance, la gestion financière et le droit coopératif OHADA.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'organisme_formation', label: "Organisme de formation", type: 'text', required: true },
      { key: 'cooperative_beneficiaire', label: "Coopérative bénéficiaire", type: 'text', required: true },
      { key: 'nombre_stagiaires', label: "Nombre de stagiaires (dirigeants)", type: 'text', required: true },
      { key: 'modules_formation', label: "Modules de formation", type: 'textarea', required: true },
      { key: 'date_session', label: "Date de la session de formation", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – FORMATION DES DIRIGEANTS DE COOPÉRATIVE</h1><h2>{{organisme_formation}} / {{cooperative_beneficiaire}}</h2><h3>Article 1 – Parties</h3><p>Organisme de formation : <strong>{{organisme_formation}}</strong><br/>Coopérative bénéficiaire : <strong>{{cooperative_beneficiaire}}</strong></p><h3>Article 2 – Participants</h3><p>Nombre de dirigeants stagiaires : {{nombre_stagiaires}}</p><h3>Article 3 – Modules de formation</h3><p>{{modules_formation}}</p><h3>Article 4 – Calendrier</h3><p>Session de formation prévue le : {{date_session}}</p><h3>Article 5 – Évaluation et certification</h3><p>Une évaluation des acquis est réalisée en fin de session. Une attestation de participation est remise à chaque dirigeant ayant satisfait aux critères de présence.</p></div>`
  },
  {
    code: 'coop2_accord_partenariat_institution_financiere',
    name: "Accord de partenariat coopérative-institution financière (BCEAO)",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Convention de partenariat entre une coopérative et une institution financière (banque, SFD) dans le cadre du dispositif réglementaire BCEAO.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'cooperative_partenaire', label: "Coopérative partenaire", type: 'text', required: true },
      { key: 'institution_financiere', label: "Institution financière (banque/SFD)", type: 'text', required: true },
      { key: 'objet_partenariat', label: "Objet du partenariat", type: 'textarea', required: true },
      { key: 'plafond_credit_global', label: "Plafond global de crédit accordé (FCFA)", type: 'text', required: true },
      { key: 'duree_convention', label: "Durée de la convention", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT COOPÉRATIVE – INSTITUTION FINANCIÈRE</h1><h2>{{cooperative_partenaire}} / {{institution_financiere}}</h2><h3>Article 1 – Parties</h3><p>Coopérative : <strong>{{cooperative_partenaire}}</strong><br/>Institution financière : <strong>{{institution_financiere}}</strong></p><h3>Article 2 – Objet</h3><p>{{objet_partenariat}}</p><h3>Article 3 – Plafond de crédit</h3><p>Plafond global de crédit : {{plafond_credit_global}} FCFA</p><h3>Article 4 – Durée</h3><p>Convention d'une durée de : {{duree_convention}}</p><h3>Article 5 – Conformité réglementaire</h3><p>Le partenariat s'inscrit dans le respect du cadre réglementaire BCEAO applicable aux systèmes financiers décentralisés et aux relations banque-coopérative.</p></div>`
  },
  {
    code: 'coop2_accord_ligne_credit_cooperative',
    name: "Accord de ligne de crédit pour coopérative",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Accord d'ouverture d'une ligne de crédit revolving accordée à une coopérative par un établissement financier pour financer ses activités courantes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative emprunteuse", type: 'text', required: true },
      { key: 'etablissement_preteur', label: "Établissement prêteur", type: 'text', required: true },
      { key: 'montant_ligne_credit', label: "Montant de la ligne de crédit (FCFA)", type: 'text', required: true },
      { key: 'taux_interet', label: "Taux d'intérêt annuel (%)", type: 'text', required: true },
      { key: 'duree_ligne_credit', label: "Durée de la ligne de crédit (mois)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE LIGNE DE CRÉDIT – COOPÉRATIVE</h1><h2>{{nom_cooperative}} / {{etablissement_preteur}}</h2><h3>Article 1 – Parties</h3><p>Coopérative : <strong>{{nom_cooperative}}</strong><br/>Établissement prêteur : <strong>{{etablissement_preteur}}</strong></p><h3>Article 2 – Ligne de crédit</h3><p>Montant autorisé : {{montant_ligne_credit}} FCFA – Taux d'intérêt : {{taux_interet}}% par an</p><h3>Article 3 – Durée</h3><p>Durée de la ligne de crédit : {{duree_ligne_credit}} mois, renouvelable par accord exprès des parties.</p><h3>Article 4 – Utilisation</h3><p>La ligne de crédit est destinée exclusivement au financement des activités de la coopérative conformes à son objet social.</p><h3>Article 5 – Garanties</h3><p>Les garanties sont définies dans un avenant sécuritaire annexé au présent accord.</p></div>`
  },
  {
    code: 'coop2_accord_garantie_fgvoci',
    name: "Accord de garantie FGVOCI (fonds de garantie)",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Accord de garantie partielle de crédit octroyée par le Fonds de Garantie des Véhicules et des Crédits de Côte d'Ivoire (FGVOCI) à une coopérative.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'cooperative_beneficiaire', label: "Coopérative bénéficiaire de la garantie", type: 'text', required: true },
      { key: 'banque_partenaire', label: "Banque partenaire accordant le crédit", type: 'text', required: true },
      { key: 'montant_credit_garanti', label: "Montant du crédit garanti (FCFA)", type: 'text', required: true },
      { key: 'taux_couverture_garantie', label: "Taux de couverture de la garantie (%)", type: 'text', required: true },
      { key: 'duree_garantie', label: "Durée de la garantie (mois)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE GARANTIE FGVOCI</h1><h2>{{cooperative_beneficiaire}}</h2><h3>Article 1 – Parties</h3><p>Bénéficiaire : <strong>{{cooperative_beneficiaire}}</strong><br/>Banque partenaire : <strong>{{banque_partenaire}}</strong><br/>Garant : Fonds de Garantie (FGVOCI)</p><h3>Article 2 – Garantie</h3><p>Montant garanti : {{montant_credit_garanti}} FCFA – Taux de couverture : {{taux_couverture_garantie}}%</p><h3>Article 3 – Durée</h3><p>{{duree_garantie}} mois</p><h3>Article 4 – Conditions</h3><p>La garantie est accordée sous réserve du respect par la coopérative des conditions de solvabilité et de gouvernance requises par le FGVOCI.</p></div>`
  },
  {
    code: 'coop2_accord_conseil_gouvernance',
    name: "Accord de service de conseil en gouvernance coopérative",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de mission de conseil en gouvernance pour aider une coopérative à renforcer ses mécanismes de prise de décision et de transparence.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'consultant_gouvernance', label: "Consultant ou cabinet conseil", type: 'text', required: true },
      { key: 'cooperative_cliente', label: "Coopérative cliente", type: 'text', required: true },
      { key: 'diagnostic_initial', label: "Problèmes de gouvernance identifiés", type: 'textarea', required: true },
      { key: 'recommandations_cles', label: "Recommandations clés du consultant", type: 'textarea', required: true },
      { key: 'honoraires_mission', label: "Honoraires de la mission (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CONSEIL EN GOUVERNANCE COOPÉRATIVE</h1><h2>{{consultant_gouvernance}} / {{cooperative_cliente}}</h2><h3>Article 1 – Mission</h3><p>Consultant : <strong>{{consultant_gouvernance}}</strong> – Coopérative cliente : <strong>{{cooperative_cliente}}</strong></p><h3>Article 2 – Diagnostic</h3><p>{{diagnostic_initial}}</p><h3>Article 3 – Recommandations</h3><p>{{recommandations_cles}}</p><h3>Article 4 – Honoraires</h3><p>Honoraires de la mission : {{honoraires_mission}} FCFA</p><h3>Article 5 – Livrables</h3><p>Le consultant remet un rapport de gouvernance, un plan d'action et assure un accompagnement dans la mise en œuvre des recommandations.</p></div>`
  },
  {
    code: 'coop2_accord_agrement_cooperative_ci',
    name: "Accord d'agrément de coopérative (Ministère Agriculture CI)",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Dossier et accord de demande d'agrément d'une coopérative agricole auprès du Ministère de l'Agriculture et du Développement Rural de Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'president_cooperative', label: "Président de la coopérative", type: 'text', required: true },
      { key: 'filiere_concernee', label: "Filière agricole concernée", type: 'text', required: true },
      { key: 'region_administrative', label: "Région administrative d'implantation", type: 'text', required: true },
      { key: 'date_demande_agrement', label: "Date de la demande d'agrément", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>DEMANDE D'AGRÉMENT DE COOPÉRATIVE AGRICOLE</h1><h2>Ministère de l'Agriculture et du Développement Rural – Côte d'Ivoire</h2><h3>Identification de la coopérative</h3><p>Nom : <strong>{{nom_cooperative}}</strong><br/>Président : {{president_cooperative}}<br/>Filière : {{filiere_concernee}}<br/>Région : {{region_administrative}}</p><h3>Objet de la demande</h3><p>La coopérative <strong>{{nom_cooperative}}</strong> sollicite son agrément auprès du Ministère de l'Agriculture conformément à la réglementation en vigueur en Côte d'Ivoire sur les sociétés coopératives.</p><h3>Pièces jointes</h3><p>1. Statuts de la coopérative ; 2. Procès-verbal de l'assemblée constitutive ; 3. Liste des membres fondateurs ; 4. Plan d'affaires de la coopérative ; 5. Justificatif du siège social.</p><h3>Date</h3><p>Demande déposée le : {{date_demande_agrement}}</p></div>`
  },
  {
    code: 'coop2_accord_contrat_culture',
    name: "Accord de contrat de culture (coopérative-producteur)",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Contrat de culture liant une coopérative agricole à un producteur membre, définissant les obligations de production, d'approvisionnement en intrants et de livraison.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'nom_producteur', label: "Nom du producteur", type: 'text', required: true },
      { key: 'produit_cultive', label: "Produit agricole cultivé", type: 'text', required: true },
      { key: 'superficie_contractee', label: "Superficie contractée (hectares)", type: 'text', required: true },
      { key: 'prix_achat_garanti', label: "Prix d'achat garanti par la coopérative (FCFA/kg)", type: 'text', required: true },
      { key: 'campagne_agricole', label: "Campagne agricole de référence", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CULTURE</h1><h2>{{nom_cooperative}} / {{nom_producteur}}</h2><h3>Article 1 – Parties</h3><p>Coopérative : <strong>{{nom_cooperative}}</strong><br/>Producteur : <strong>{{nom_producteur}}</strong></p><h3>Article 2 – Objet</h3><p>Produit cultivé : {{produit_cultive}} – Superficie : {{superficie_contractee}} ha – Campagne : {{campagne_agricole}}</p><h3>Article 3 – Prix garanti</h3><p>La coopérative garantit au producteur un prix d'achat de : <strong>{{prix_achat_garanti}} FCFA/kg</strong> pour la production conforme aux critères de qualité définis.</p><h3>Article 4 – Obligations du producteur</h3><p>Le producteur s'engage à livrer l'intégralité de sa production à la coopérative, à respecter les bonnes pratiques agricoles et à rembourser les avances en intrants.</p><h3>Article 5 – Obligations de la coopérative</h3><p>La coopérative s'engage à fournir les intrants nécessaires, à assurer l'encadrement technique et à payer le producteur au prix garanti dans les délais convenus.</p></div>`
  },
  {
    code: 'coop2_accord_contrat_commercialisation',
    name: "Accord de contrat de commercialisation (coopérative-acheteur)",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de commercialisation liant une coopérative agricole à un acheteur (exportateur, transformateur) pour la vente de sa production en conditions négociées.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative vendeuse", type: 'text', required: true },
      { key: 'nom_acheteur', label: "Nom de l'acheteur", type: 'text', required: true },
      { key: 'produit_vendu', label: "Produit vendu", type: 'text', required: true },
      { key: 'quantite_contractee', label: "Quantité contractée (tonnes)", type: 'text', required: true },
      { key: 'prix_vente', label: "Prix de vente convenu (FCFA/tonne)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison prévue", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMMERCIALISATION</h1><h2>{{nom_cooperative}} / {{nom_acheteur}}</h2><h3>Article 1 – Parties</h3><p>Coopérative vendeuse : <strong>{{nom_cooperative}}</strong><br/>Acheteur : <strong>{{nom_acheteur}}</strong></p><h3>Article 2 – Produit et quantité</h3><p>Produit : {{produit_vendu}} – Quantité : {{quantite_contractee}} tonnes</p><h3>Article 3 – Prix</h3><p>Prix de vente convenu : {{prix_vente}} FCFA/tonne</p><h3>Article 4 – Livraison</h3><p>Date de livraison prévue : {{date_livraison}}</p><h3>Article 5 – Qualité</h3><p>La coopérative s'engage à livrer un produit conforme aux normes de qualité convenues. Tout lot non conforme pourra être refusé ou faire l'objet d'une décote.</p></div>`
  },
  {
    code: 'coop2_rapport_gestion_annuel',
    name: "Rapport de gestion annuel coopérative",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Modèle de rapport de gestion annuel présenté par le conseil d'administration d'une coopérative à son assemblée générale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'exercice', label: "Exercice comptable (ex: 2024)", type: 'text', required: true },
      { key: 'activites_realisees', label: "Activités réalisées durant l'exercice", type: 'textarea', required: true },
      { key: 'chiffre_affaires', label: "Chiffre d'affaires réalisé (FCFA)", type: 'text', required: true },
      { key: 'perspectives_exercice_suivant', label: "Perspectives pour l'exercice suivant", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE GESTION ANNUEL</h1><h2>{{nom_cooperative}} – Exercice {{exercice}}</h2><h3>1. Activités de l'exercice</h3><p>{{activites_realisees}}</p><h3>2. Résultats financiers</h3><p>Chiffre d'affaires : <strong>{{chiffre_affaires}} FCFA</strong></p><h3>3. Perspectives</h3><p>{{perspectives_exercice_suivant}}</p><h3>4. Conclusion</h3><p>Le conseil d'administration remercie l'ensemble des membres pour leur confiance et leur engagement durant l'exercice {{exercice}} et appelle à une participation active à l'assemblée générale annuelle.</p></div>`
  },
  {
    code: 'coop2_plan_developpement_3_ans',
    name: "Plan de développement coopérative à 3 ans",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Plan de développement triennal d'une coopérative définissant les objectifs, les stratégies et les ressources pour consolider et développer ses activités.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'periode_plan', label: "Période du plan (ex: 2025-2027)", type: 'text', required: true },
      { key: 'objectifs_annee_1', label: "Objectifs de la 1re année", type: 'textarea', required: true },
      { key: 'objectifs_annees_2_3', label: "Objectifs des 2e et 3e années", type: 'textarea', required: true },
      { key: 'budget_global', label: "Budget global du plan (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT TRIENNAL</h1><h2>{{nom_cooperative}} – {{periode_plan}}</h2><h3>1. Objectifs de la 1re année</h3><p>{{objectifs_annee_1}}</p><h3>2. Objectifs des 2e et 3e années</h3><p>{{objectifs_annees_2_3}}</p><h3>3. Budget</h3><p>Budget global du plan triennal : <strong>{{budget_global}} FCFA</strong></p><h3>4. Suivi</h3><p>Le plan fait l'objet d'une revue annuelle lors de l'assemblée générale ordinaire. Des ajustements peuvent être apportés par le conseil d'administration en cas d'évolution du contexte.</p></div>`
  },
  {
    code: 'coop2_accord_partenariat_collectivite',
    name: "Accord de partenariat coopérative-collectivité",
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Convention de partenariat entre une coopérative et une collectivité locale (commune, région) pour la mise en œuvre d'actions de développement local.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'nom_cooperative', label: "Nom de la coopérative", type: 'text', required: true },
      { key: 'collectivite_partenaire', label: "Collectivité locale partenaire", type: 'text', required: true },
      { key: 'objet_partenariat', label: "Objet du partenariat", type: 'textarea', required: true },
      { key: 'apport_cooperative', label: "Apport de la coopérative", type: 'textarea', required: true },
      { key: 'apport_collectivite', label: "Apport de la collectivité", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT COOPÉRATIVE – COLLECTIVITÉ LOCALE</h1><h2>{{nom_cooperative}} / {{collectivite_partenaire}}</h2><h3>Article 1 – Parties</h3><p>Coopérative : <strong>{{nom_cooperative}}</strong><br/>Collectivité : <strong>{{collectivite_partenaire}}</strong></p><h3>Article 2 – Objet</h3><p>{{objet_partenariat}}</p><h3>Article 3 – Apports réciproques</h3><p><strong>Coopérative :</strong> {{apport_cooperative}}</p><p><strong>Collectivité :</strong> {{apport_collectivite}}</p><h3>Article 4 – Gouvernance du partenariat</h3><p>Un comité de pilotage paritaire se réunit trimestriellement pour suivre la mise en œuvre du partenariat et prendre les décisions nécessaires à son bon déroulement.</p></div>`
  },
  {
    code: 'coop2_accord_communication_cooperative',
    name: "Accord de service de communication coopérative (marque)",
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Accord de prestation de communication et de construction de marque pour une coopérative souhaitant valoriser son identité et ses produits sur le marché.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'agence_communication', label: "Agence de communication mandatée", type: 'text', required: true },
      { key: 'cooperative_cliente', label: "Coopérative cliente", type: 'text', required: true },
      { key: 'missions_communication', label: "Missions de communication confiées", type: 'textarea', required: true },
      { key: 'budget_communication', label: "Budget annuel de communication (FCFA)", type: 'text', required: true },
      { key: 'date_debut_mission', label: "Date de début de la mission", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – COMMUNICATION COOPÉRATIVE</h1><h2>{{agence_communication}} / {{cooperative_cliente}}</h2><h3>Article 1 – Parties</h3><p>Agence : <strong>{{agence_communication}}</strong><br/>Coopérative cliente : <strong>{{cooperative_cliente}}</strong></p><h3>Article 2 – Missions</h3><p>{{missions_communication}}</p><h3>Article 3 – Budget</h3><p>Budget annuel de communication : {{budget_communication}} FCFA</p><h3>Article 4 – Démarrage</h3><p>Mission débutant le : {{date_debut_mission}}</p><h3>Article 5 – Propriété intellectuelle</h3><p>Les créations réalisées dans le cadre du présent accord sont propriété de la coopérative après paiement intégral des honoraires de l'agence.</p></div>`
  },
  {
    code: 'coop2_charte_gouvernance_democratique',
    name: "Charte de gouvernance démocratique et transparente",
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Charte de gouvernance définissant les principes de démocratie, de transparence et de responsabilité au sein d'une coopérative ou d'une mutuelle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'nom_organisation', label: "Nom de la coopérative ou mutuelle", type: 'text', required: true },
      { key: 'principes_democratie', label: "Principes démocratiques adoptés", type: 'textarea', required: true },
      { key: 'mecanismes_transparence', label: "Mécanismes de transparence et de redevabilité", type: 'textarea', required: true },
      { key: 'organes_gouvernance', label: "Organes de gouvernance et leurs rôles", type: 'textarea', required: true },
      { key: 'date_adoption_charte', label: "Date d'adoption de la charte", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>CHARTE DE GOUVERNANCE DÉMOCRATIQUE ET TRANSPARENTE</h1><h2>{{nom_organisation}}</h2><h3>Préambule</h3><p>La présente charte affirme l'attachement de <strong>{{nom_organisation}}</strong> aux valeurs coopératives fondamentales d'entraide, d'égalité, d'équité et de solidarité.</p><h3>I. Principes démocratiques</h3><p>{{principes_democratie}}</p><h3>II. Transparence et redevabilité</h3><p>{{mecanismes_transparence}}</p><h3>III. Organes de gouvernance</h3><p>{{organes_gouvernance}}</p><h3>IV. Engagement</h3><p>Tous les membres, dirigeants et salariés s'engagent à respecter la présente charte, adoptée le : {{date_adoption_charte}}</p></div>`
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
  console.log(`Batch 81b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
