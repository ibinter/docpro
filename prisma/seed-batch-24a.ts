import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── TEL2_ : 25 templates Télécoms avancés ───
  {
    code: 'tel2_licence_reseau',
    name: "Licence d'exploitation de réseau télécom",
    category: 'juridique_admin',
    price: 15000, priceMax: 50000,
    description: "Licence officielle accordant le droit d'exploiter un réseau de télécommunications sur le territoire national, conforme au cadre réglementaire ARTCI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'operateur', label: "Nom de l'opérateur", type: 'text', required: true },
      { key: 'numero_licence', label: "Numéro de licence", type: 'text', required: true },
      { key: 'date_delivrance', label: "Date de délivrance", type: 'date', required: true },
      { key: 'date_expiration', label: "Date d'expiration", type: 'date', required: true },
      { key: 'zone_couverture', label: "Zone de couverture", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>LICENCE D'EXPLOITATION DE RÉSEAU TÉLÉCOM</h1><p>Licence n° : {{numero_licence}}</p><p>Opérateur : {{operateur}}</p><p>Zone de couverture : {{zone_couverture}}</p><p>Valide du {{date_delivrance}} au {{date_expiration}}.</p></div>`
  },
  {
    code: 'tel2_convention_interconnexion',
    name: "Convention d'interconnexion opérateurs",
    category: 'juridique_admin',
    price: 12000, priceMax: 40000,
    description: "Convention encadrant les modalités techniques et financières d'interconnexion entre deux opérateurs de télécommunications, conforme aux directives ARTCI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'operateur_a', label: "Opérateur A", type: 'text', required: true },
      { key: 'operateur_b', label: "Opérateur B", type: 'text', required: true },
      { key: 'date_effet', label: "Date d'effet", type: 'date', required: true },
      { key: 'tarif_interconnexion', label: "Tarif d'interconnexion (FCFA/min)", type: 'text', required: true },
      { key: 'duree_convention', label: "Durée de la convention", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION D'INTERCONNEXION OPÉRATEURS</h1><p>Entre : {{operateur_a}} et {{operateur_b}}</p><p>Tarif d'interconnexion : {{tarif_interconnexion}} FCFA/min</p><p>Durée : {{duree_convention}} — Prise d'effet : {{date_effet}}</p></div>`
  },
  {
    code: 'tel2_accord_roaming',
    name: "Accord de roaming international",
    category: 'juridique_admin',
    price: 10000, priceMax: 35000,
    description: "Accord établissant les conditions d'itinérance internationale (roaming) entre un opérateur national et un partenaire étranger, avec tarification et modalités techniques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'operateur_national', label: "Opérateur national", type: 'text', required: true },
      { key: 'operateur_partenaire', label: "Opérateur partenaire étranger", type: 'text', required: true },
      { key: 'pays_partenaire', label: "Pays du partenaire", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
      { key: 'conditions_tarifaires', label: "Conditions tarifaires", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE ROAMING INTERNATIONAL</h1><p>Opérateur national : {{operateur_national}}</p><p>Opérateur partenaire : {{operateur_partenaire}} ({{pays_partenaire}})</p><p>Conditions tarifaires : {{conditions_tarifaires}}</p><p>Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'tel2_tower_sharing',
    name: "Contrat de partage d'infrastructure (tower sharing)",
    category: 'juridique_admin',
    price: 9000, priceMax: 30000,
    description: "Contrat de partage de pylônes et d'infrastructures passives entre opérateurs télécoms, optimisant les coûts de déploiement réseau en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'proprietaire_tour', label: "Propriétaire de la tour", type: 'text', required: true },
      { key: 'locataire_tour', label: "Locataire de la tour", type: 'text', required: true },
      { key: 'site_reference', label: "Référence du site", type: 'text', required: true },
      { key: 'loyer_mensuel', label: "Loyer mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PARTAGE D'INFRASTRUCTURE — TOWER SHARING</h1><p>Propriétaire : {{proprietaire_tour}} — Locataire : {{locataire_tour}}</p><p>Site : {{site_reference}} — Loyer mensuel : {{loyer_mensuel}} FCFA</p><p>Prise d'effet : {{date_debut}}</p></div>`
  },
  {
    code: 'tel2_accord_itinerance_nationale',
    name: "Accord d'itinérance nationale",
    category: 'juridique_admin',
    price: 8000, priceMax: 28000,
    description: "Accord permettant à un opérateur d'utiliser le réseau d'un autre opérateur national pour couvrir des zones non desservies, dans le respect du cadre ARTCI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'operateur_hote', label: "Opérateur hôte", type: 'text', required: true },
      { key: 'operateur_visiteur', label: "Opérateur visiteur", type: 'text', required: true },
      { key: 'zones_couvertes', label: "Zones couvertes", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'tarif_acces', label: "Tarif d'accès", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'ITINÉRANCE NATIONALE</h1><p>Opérateur hôte : {{operateur_hote}} — Opérateur visiteur : {{operateur_visiteur}}</p><p>Zones couvertes : {{zones_couvertes}}</p><p>Tarif d'accès : {{tarif_acces}} — Effet au : {{date_debut}}</p></div>`
  },
  {
    code: 'tel2_fourniture_spectre',
    name: "Contrat de fourniture de spectre radioélectrique",
    category: 'juridique_admin',
    price: 14000, priceMax: 45000,
    description: "Contrat encadrant l'attribution et l'utilisation d'une bande de fréquences radioélectriques à un opérateur télécom, par l'autorité compétente.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'attributaire', label: "Attributaire du spectre", type: 'text', required: true },
      { key: 'bande_frequence', label: "Bande de fréquence (MHz)", type: 'text', required: true },
      { key: 'date_attribution', label: "Date d'attribution", type: 'date', required: true },
      { key: 'duree_utilisation', label: "Durée d'utilisation", type: 'text', required: true },
      { key: 'redevance_annuelle', label: "Redevance annuelle (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FOURNITURE DE SPECTRE RADIOÉLECTRIQUE</h1><p>Attributaire : {{attributaire}}</p><p>Bande : {{bande_frequence}} MHz — Durée : {{duree_utilisation}}</p><p>Redevance annuelle : {{redevance_annuelle}} FCFA — Date : {{date_attribution}}</p></div>`
  },
  {
    code: 'tel2_co_location_antenne',
    name: "Accord de co-location antenne",
    category: 'juridique_admin',
    price: 7000, priceMax: 25000,
    description: "Accord de co-location permettant à plusieurs opérateurs d'installer leurs équipements antennaires sur un même site, avec partage des coûts et responsabilités.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      { key: 'gestionnaire_site', label: "Gestionnaire du site", type: 'text', required: true },
      { key: 'co_locataire', label: "Co-locataire", type: 'text', required: true },
      { key: 'adresse_site', label: "Adresse du site", type: 'text', required: true },
      { key: 'quote_part_loyer', label: "Quote-part loyer (FCFA)", type: 'text', required: true },
      { key: 'date_effet', label: "Date d'effet", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CO-LOCATION ANTENNE</h1><p>Gestionnaire : {{gestionnaire_site}} — Co-locataire : {{co_locataire}}</p><p>Site : {{adresse_site}} — Quote-part loyer : {{quote_part_loyer}} FCFA</p><p>Prise d'effet : {{date_effet}}</p></div>`
  },
  {
    code: 'tel2_service_universel',
    name: "Convention de service universel",
    category: 'juridique_admin',
    price: 13000, priceMax: 42000,
    description: "Convention liant un opérateur télécom à l'État pour la mise en oeuvre des obligations de service universel, incluant la couverture des zones rurales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur désigné", type: 'text', required: true },
      { key: 'zones_cibles', label: "Zones cibles du service universel", type: 'textarea', required: true },
      { key: 'budget_alloue', label: "Budget alloué (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
      { key: 'duree_engagement', label: "Durée de l'engagement", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE UNIVERSEL</h1><p>Opérateur désigné : {{operateur}}</p><p>Zones cibles : {{zones_cibles}}</p><p>Budget alloué : {{budget_alloue}} FCFA — Durée : {{duree_engagement}}</p><p>Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'tel2_internet_entreprise',
    name: "Contrat de fourniture internet entreprise",
    category: 'juridique_admin',
    price: 5000, priceMax: 18000,
    description: "Contrat de fourniture d'accès internet haut débit pour entreprises, avec engagements de débit garanti, SLA et support technique dédié.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'fournisseur', label: "Fournisseur internet", type: 'text', required: true },
      { key: 'client_entreprise', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'debit_garanti', label: "Débit garanti (Mbps)", type: 'text', required: true },
      { key: 'tarif_mensuel', label: "Tarif mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du contrat", type: 'date', required: true },
      { key: 'duree_contrat', label: "Durée du contrat", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FOURNITURE INTERNET ENTREPRISE</h1><p>Fournisseur : {{fournisseur}} — Client : {{client_entreprise}}</p><p>Débit garanti : {{debit_garanti}} Mbps — Tarif mensuel : {{tarif_mensuel}} FCFA</p><p>Durée : {{duree_contrat}} — Début : {{date_debut}}</p></div>`
  },
  {
    code: 'tel2_sla_operateur',
    name: "SLA opérateur télécom",
    category: 'juridique_admin',
    price: 8000, priceMax: 28000,
    description: "Accord de niveau de service (SLA) définissant les engagements de qualité, disponibilité et pénalités applicables entre un opérateur télécom et son client entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur télécom", type: 'text', required: true },
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'taux_disponibilite', label: "Taux de disponibilité garanti (%)", type: 'text', required: true },
      { key: 'delai_intervention', label: "Délai d'intervention (heures)", type: 'text', required: true },
      { key: 'penalites', label: "Pénalités en cas de non-respect", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>SLA OPÉRATEUR TÉLÉCOM</h1><p>Opérateur : {{operateur}} — Client : {{client}}</p><p>Disponibilité garantie : {{taux_disponibilite}}% — Intervention : {{delai_intervention}}h</p><p>Pénalités : {{penalites}}</p></div>`
  },
  {
    code: 'tel2_cloud_telecom',
    name: "Contrat de service cloud télécom",
    category: 'juridique_admin',
    price: 9000, priceMax: 30000,
    description: "Contrat encadrant la fourniture de services cloud hébergés par un opérateur télécom (UCaaS, CCaaS, stockage), avec engagements de sécurité et de réversibilité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'prestataire_cloud', label: "Prestataire cloud télécom", type: 'text', required: true },
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'services_cloud', label: "Services cloud fournis", type: 'textarea', required: true },
      { key: 'tarif_mensuel', label: "Tarif mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE CLOUD TÉLÉCOM</h1><p>Prestataire : {{prestataire_cloud}} — Client : {{client}}</p><p>Services : {{services_cloud}}</p><p>Tarif mensuel : {{tarif_mensuel}} FCFA — Début : {{date_debut}}</p></div>`
  },
  {
    code: 'tel2_numerotation_nationale',
    name: "Convention de numérotation nationale",
    category: 'juridique_admin',
    price: 11000, priceMax: 38000,
    description: "Convention entre l'ARTCI et un opérateur portant sur l'attribution et la gestion de ressources de numérotation téléphonique nationale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur bénéficiaire", type: 'text', required: true },
      { key: 'plage_numeros', label: "Plage de numéros attribuée", type: 'text', required: true },
      { key: 'date_attribution', label: "Date d'attribution", type: 'date', required: true },
      { key: 'obligations_utilisation', label: "Obligations d'utilisation", type: 'textarea', required: true },
      { key: 'duree_validite', label: "Durée de validité", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE NUMÉROTATION NATIONALE</h1><p>Opérateur : {{operateur}}</p><p>Plage attribuée : {{plage_numeros}} — Validité : {{duree_validite}}</p><p>Obligations : {{obligations_utilisation}}</p><p>Date : {{date_attribution}}</p></div>`
  },
  {
    code: 'tel2_portabilite_numero',
    name: "Accord de portabilité de numéro",
    category: 'juridique_admin',
    price: 7000, priceMax: 24000,
    description: "Accord inter-opérateurs encadrant les procédures de portabilité des numéros de téléphone, conformément aux obligations réglementaires ARTCI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'operateur_donneur', label: "Opérateur donneur", type: 'text', required: true },
      { key: 'operateur_receveur', label: "Opérateur receveur", type: 'text', required: true },
      { key: 'procedure_portabilite', label: "Procédure de portabilité", type: 'textarea', required: true },
      { key: 'delai_traitement', label: "Délai de traitement (jours)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PORTABILITÉ DE NUMÉRO</h1><p>Donneur : {{operateur_donneur}} — Receveur : {{operateur_receveur}}</p><p>Procédure : {{procedure_portabilite}}</p><p>Délai : {{delai_traitement}} jours — Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'tel2_sms_bulk',
    name: "Contrat de service SMS bulk",
    category: 'juridique_admin',
    price: 4000, priceMax: 14000,
    description: "Contrat de fourniture de service d'envoi de SMS en masse (bulk SMS) entre un agrégateur et une entreprise cliente, avec tarification au volume.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'agregateur', label: "Agrégateur SMS", type: 'text', required: true },
      { key: 'client', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'volume_mensuel', label: "Volume mensuel de SMS", type: 'text', required: true },
      { key: 'tarif_unitaire', label: "Tarif unitaire (FCFA/SMS)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE SMS BULK</h1><p>Agrégateur : {{agregateur}} — Client : {{client}}</p><p>Volume mensuel : {{volume_mensuel}} SMS — Tarif unitaire : {{tarif_unitaire}} FCFA</p><p>Début : {{date_debut}}</p></div>`
  },
  {
    code: 'tel2_terminaison_appel',
    name: "Accord de terminaison d'appel",
    category: 'juridique_admin',
    price: 9000, priceMax: 30000,
    description: "Accord fixant les tarifs et conditions de terminaison d'appel entre réseaux d'opérateurs différents, conformément aux décisions tarifaires de l'ARTCI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      { key: 'operateur_origine', label: "Opérateur d'origine", type: 'text', required: true },
      { key: 'operateur_terminaison', label: "Opérateur de terminaison", type: 'text', required: true },
      { key: 'tarif_terminaison', label: "Tarif de terminaison (FCFA/min)", type: 'text', required: true },
      { key: 'date_effet', label: "Date d'effet", type: 'date', required: true },
      { key: 'modalites_reglement', label: "Modalités de règlement", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE TERMINAISON D'APPEL</h1><p>Opérateur origine : {{operateur_origine}} — Terminaison : {{operateur_terminaison}}</p><p>Tarif : {{tarif_terminaison}} FCFA/min — Effet : {{date_effet}}</p><p>Règlement : {{modalites_reglement}}</p></div>`
  },
  {
    code: 'tel2_convention_artci',
    name: "Convention avec ARTCI (régulateur)",
    category: 'juridique_admin',
    price: 16000, priceMax: 55000,
    description: "Convention-cadre entre un opérateur de télécommunications et l'Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire (ARTCI), définissant droits et obligations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur", type: 'text', required: true },
      { key: 'type_licence', label: "Type de licence", type: 'text', required: true },
      { key: 'obligations_reglementaires', label: "Obligations réglementaires", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
      { key: 'representant_artci', label: "Représentant ARTCI", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION AVEC L'ARTCI</h1><p>Opérateur : {{operateur}} — Licence : {{type_licence}}</p><p>Représentant ARTCI : {{representant_artci}}</p><p>Obligations : {{obligations_reglementaires}}</p><p>Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'tel2_rapport_couverture_reseau',
    name: "Rapport de couverture réseau",
    category: 'juridique_admin',
    price: 6000, priceMax: 20000,
    description: "Rapport technique officiel de couverture réseau soumis à l'ARTCI, détaillant les zones couvertes, la qualité de signal et les plans de déploiement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur", type: 'text', required: true },
      { key: 'periode_rapport', label: "Période du rapport", type: 'text', required: true },
      { key: 'taux_couverture_national', label: "Taux de couverture national (%)", type: 'text', required: true },
      { key: 'zones_non_couvertes', label: "Zones non couvertes", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE COUVERTURE RÉSEAU</h1><p>Opérateur : {{operateur}} — Période : {{periode_rapport}}</p><p>Couverture nationale : {{taux_couverture_national}}%</p><p>Zones non couvertes : {{zones_non_couvertes}}</p><p>Date : {{date_rapport}}</p></div>`
  },
  {
    code: 'tel2_plan_frequences_radio',
    name: "Plan de fréquences radio",
    category: 'juridique_admin',
    price: 8000, priceMax: 28000,
    description: "Document officiel de planification des fréquences radioélectriques attribuées à un opérateur, incluant les bandes, puissances et zones d'utilisation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur", type: 'text', required: true },
      { key: 'bandes_attribuees', label: "Bandes de fréquences attribuées", type: 'textarea', required: true },
      { key: 'puissance_maximale', label: "Puissance maximale autorisée (W)", type: 'text', required: true },
      { key: 'date_elaboration', label: "Date d'élaboration", type: 'date', required: true },
      { key: 'validite', label: "Période de validité", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE FRÉQUENCES RADIO</h1><p>Opérateur : {{operateur}}</p><p>Bandes attribuées : {{bandes_attribuees}}</p><p>Puissance max. : {{puissance_maximale}} W — Validité : {{validite}}</p><p>Établi le : {{date_elaboration}}</p></div>`
  },
  {
    code: 'tel2_cable_sous_marin',
    name: "Accord de câble sous-marin",
    category: 'juridique_admin',
    price: 18000, priceMax: 60000,
    description: "Accord de participation et d'utilisation d'un câble sous-marin de fibre optique, définissant les droits d'usage, la capacité allouée et la gouvernance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      { key: 'consortium', label: "Nom du consortium câble", type: 'text', required: true },
      { key: 'participant', label: "Participant national", type: 'text', required: true },
      { key: 'capacite_allouee', label: "Capacité allouée (Gbps)", type: 'text', required: true },
      { key: 'investissement', label: "Montant de l'investissement (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CÂBLE SOUS-MARIN</h1><p>Consortium : {{consortium}} — Participant : {{participant}}</p><p>Capacité allouée : {{capacite_allouee}} Gbps</p><p>Investissement : {{investissement}} FCFA — Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'tel2_fibre_optique_nationale',
    name: "Contrat de fibre optique nationale",
    category: 'juridique_admin',
    price: 12000, priceMax: 40000,
    description: "Contrat de déploiement et d'exploitation d'un réseau de fibre optique nationale, avec engagement de pose, maintenance et accès ouvert aux opérateurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'deployer', label: "Entité déployante", type: 'text', required: true },
      { key: 'commanditaire', label: "Commanditaire (État/opérateur)", type: 'text', required: true },
      { key: 'longueur_reseau', label: "Longueur du réseau (km)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison prévue", type: 'date', required: true },
      { key: 'cout_total', label: "Coût total du projet (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FIBRE OPTIQUE NATIONALE</h1><p>Déployant : {{deployer}} — Commanditaire : {{commanditaire}}</p><p>Réseau : {{longueur_reseau}} km — Coût : {{cout_total}} FCFA</p><p>Livraison prévue : {{date_livraison}}</p></div>`
  },
  {
    code: 'tel2_service_wap_donnees',
    name: "Convention de service WAP/données",
    category: 'juridique_admin',
    price: 5000, priceMax: 18000,
    description: "Convention encadrant la fourniture de services de données mobiles et WAP par un opérateur à ses partenaires de contenu et entreprises clientes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur mobile", type: 'text', required: true },
      { key: 'partenaire_contenu', label: "Partenaire de contenu", type: 'text', required: true },
      { key: 'services_fournis', label: "Services fournis", type: 'textarea', required: true },
      { key: 'partage_revenus', label: "Clé de partage des revenus (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE WAP/DONNÉES</h1><p>Opérateur : {{operateur}} — Partenaire : {{partenaire_contenu}}</p><p>Services : {{services_fournis}}</p><p>Partage revenus : {{partage_revenus}}% — Début : {{date_debut}}</p></div>`
  },
  {
    code: 'tel2_mobile_advertising',
    name: "Accord de mobile advertising",
    category: 'juridique_admin',
    price: 6000, priceMax: 22000,
    description: "Accord entre un opérateur mobile et une régie publicitaire pour la diffusion de publicités ciblées sur les réseaux mobiles, avec protection des données abonnés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'operateur_mobile', label: "Opérateur mobile", type: 'text', required: true },
      { key: 'regie_pub', label: "Régie publicitaire", type: 'text', required: true },
      { key: 'formats_publicitaires', label: "Formats publicitaires", type: 'textarea', required: true },
      { key: 'remuneration', label: "Rémunération convenue (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MOBILE ADVERTISING</h1><p>Opérateur : {{operateur_mobile}} — Régie : {{regie_pub}}</p><p>Formats : {{formats_publicitaires}}</p><p>Rémunération : {{remuneration}} FCFA — Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'tel2_geolocalisation',
    name: "Contrat de service de géolocalisation",
    category: 'juridique_admin',
    price: 7000, priceMax: 24000,
    description: "Contrat encadrant la fourniture d'un service de géolocalisation basé sur le réseau mobile, avec encadrement RGPD/protection des données personnelles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      { key: 'fournisseur_geo', label: "Fournisseur du service", type: 'text', required: true },
      { key: 'client', label: "Client bénéficiaire", type: 'text', required: true },
      { key: 'precision_localisation', label: "Précision de localisation (mètres)", type: 'text', required: true },
      { key: 'tarif_requete', label: "Tarif par requête (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE GÉOLOCALISATION</h1><p>Fournisseur : {{fournisseur_geo}} — Client : {{client}}</p><p>Précision : {{precision_localisation}} m — Tarif/requête : {{tarif_requete}} FCFA</p><p>Début : {{date_debut}}</p></div>`
  },
  {
    code: 'tel2_convention_api',
    name: "Convention API télécoms",
    category: 'juridique_admin',
    price: 8000, priceMax: 26000,
    description: "Convention encadrant l'accès et l'utilisation des API télécom (SMS, voix, data, USSD) par des développeurs tiers ou entreprises partenaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'fournisseur_api', label: "Fournisseur des API", type: 'text', required: true },
      { key: 'developpeur', label: "Développeur/entreprise partenaire", type: 'text', required: true },
      { key: 'apis_autorisees', label: "API autorisées", type: 'textarea', required: true },
      { key: 'quota_appels', label: "Quota d'appels API/jour", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION API TÉLÉCOMS</h1><p>Fournisseur : {{fournisseur_api}} — Partenaire : {{developpeur}}</p><p>API autorisées : {{apis_autorisees}}</p><p>Quota : {{quota_appels}} appels/jour — Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'tel2_conformite_reglementaire',
    name: "Rapport de conformité réglementaire télécoms",
    category: 'juridique_admin',
    price: 9000, priceMax: 30000,
    description: "Rapport annuel de conformité réglementaire qu'un opérateur télécom soumet à l'ARTCI, attestant du respect des obligations légales et réglementaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur", type: 'text', required: true },
      { key: 'annee_rapport', label: "Année du rapport", type: 'text', required: true },
      { key: 'obligations_respectees', label: "Obligations respectées", type: 'textarea', required: true },
      { key: 'non_conformites', label: "Non-conformités identifiées", type: 'textarea', required: true },
      { key: 'date_soumission', label: "Date de soumission", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONFORMITÉ RÉGLEMENTAIRE TÉLÉCOMS</h1><p>Opérateur : {{operateur}} — Année : {{annee_rapport}}</p><p>Conformités : {{obligations_respectees}}</p><p>Non-conformités : {{non_conformites}}</p><p>Soumis le : {{date_soumission}}</p></div>`
  },

  // ─── MED3_ : 25 templates Médias/Édition ───
  {
    code: 'med3_regie_publicitaire',
    name: "Contrat de régie publicitaire",
    category: 'juridique_admin',
    price: 7000, priceMax: 24000,
    description: "Contrat confiant à une régie publicitaire la commercialisation des espaces publicitaires d'un média (TV, radio, presse, numérique) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'editeur_media', label: "Éditeur du média", type: 'text', required: true },
      { key: 'regie', label: "Régie publicitaire", type: 'text', required: true },
      { key: 'supports_concernes', label: "Supports concernés", type: 'textarea', required: true },
      { key: 'commission_regie', label: "Commission de la régie (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RÉGIE PUBLICITAIRE</h1><p>Éditeur : {{editeur_media}} — Régie : {{regie}}</p><p>Supports : {{supports_concernes}}</p><p>Commission : {{commission_regie}}% — Début : {{date_debut}}</p></div>`
  },
  {
    code: 'med3_vente_espaces_medias',
    name: "Convention de vente d'espaces médias",
    category: 'juridique_admin',
    price: 5000, priceMax: 18000,
    description: "Convention encadrant la vente d'espaces publicitaires entre un média et un annonceur, incluant les formats, tarifs et conditions de diffusion.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'media', label: "Média vendeur", type: 'text', required: true },
      { key: 'annonceur', label: "Annonceur", type: 'text', required: true },
      { key: 'format_espace', label: "Format et emplacement", type: 'text', required: true },
      { key: 'tarif_espace', label: "Tarif de l'espace (FCFA)", type: 'text', required: true },
      { key: 'date_diffusion', label: "Date de diffusion", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE VENTE D'ESPACES MÉDIAS</h1><p>Média : {{media}} — Annonceur : {{annonceur}}</p><p>Format : {{format_espace}} — Tarif : {{tarif_espace}} FCFA</p><p>Diffusion prévue le : {{date_diffusion}}</p></div>`
  },
  {
    code: 'med3_production_emission_tv',
    name: "Contrat de production émission TV",
    category: 'juridique_admin',
    price: 10000, priceMax: 35000,
    description: "Contrat entre une chaîne de télévision et une société de production pour la réalisation d'une émission télévisée, avec cession des droits de diffusion.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      { key: 'chaine_tv', label: "Chaîne de télévision", type: 'text', required: true },
      { key: 'producteur', label: "Société de production", type: 'text', required: true },
      { key: 'titre_emission', label: "Titre de l'émission", type: 'text', required: true },
      { key: 'budget_production', label: "Budget de production (FCFA)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison", type: 'date', required: true },
      { key: 'nombre_episodes', label: "Nombre d'épisodes", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRODUCTION ÉMISSION TV</h1><p>Chaîne : {{chaine_tv}} — Producteur : {{producteur}}</p><p>Émission : {{titre_emission}} — {{nombre_episodes}} épisodes</p><p>Budget : {{budget_production}} FCFA — Livraison : {{date_livraison}}</p></div>`
  },
  {
    code: 'med3_diffusion_televisuelle',
    name: "Contrat de diffusion télévisuelle",
    category: 'juridique_admin',
    price: 9000, priceMax: 30000,
    description: "Contrat cédant à une chaîne de télévision le droit de diffuser une oeuvre audiovisuelle (film, série, documentaire) sur un territoire et une période définis.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'ayant_droit', label: "Ayant droit de l'oeuvre", type: 'text', required: true },
      { key: 'chaine_diffuseur', label: "Chaîne diffuseuse", type: 'text', required: true },
      { key: 'titre_oeuvre', label: "Titre de l'oeuvre", type: 'text', required: true },
      { key: 'droit_diffusion', label: "Droit de diffusion (FCFA)", type: 'text', required: true },
      { key: 'date_premiere_diffusion', label: "Date de première diffusion", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DIFFUSION TÉLÉVISUELLE</h1><p>Ayant droit : {{ayant_droit}} — Diffuseur : {{chaine_diffuseur}}</p><p>Oeuvre : {{titre_oeuvre}} — Droit : {{droit_diffusion}} FCFA</p><p>Première diffusion : {{date_premiere_diffusion}}</p></div>`
  },
  {
    code: 'med3_coproduction_medias',
    name: "Accord de coproduction médias",
    category: 'juridique_admin',
    price: 11000, priceMax: 38000,
    description: "Accord entre deux entités médias pour la coproduction d'un contenu audiovisuel ou éditorial, avec partage des coûts, des droits et des responsabilités.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'coproducteur_a', label: "Coproducteur A", type: 'text', required: true },
      { key: 'coproducteur_b', label: "Coproducteur B", type: 'text', required: true },
      { key: 'projet_coproduction', label: "Projet de coproduction", type: 'text', required: true },
      { key: 'repartition_apports', label: "Répartition des apports (%)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE COPRODUCTION MÉDIAS</h1><p>Coproducteur A : {{coproducteur_a}} — Coproducteur B : {{coproducteur_b}}</p><p>Projet : {{projet_coproduction}} — Apports : {{repartition_apports}}</p><p>Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'med3_contrat_animateur',
    name: "Contrat de présentation/animateur",
    category: 'juridique_admin',
    price: 6000, priceMax: 20000,
    description: "Contrat liant une chaîne ou une radio à un présentateur ou animateur, définissant les émissions à présenter, la rémunération et les droits à l'image.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      { key: 'media_employeur', label: "Média employeur", type: 'text', required: true },
      { key: 'animateur', label: "Nom de l'animateur", type: 'text', required: true },
      { key: 'emissions_concernees', label: "Émissions concernées", type: 'textarea', required: true },
      { key: 'remuneration_mensuelle', label: "Rémunération mensuelle (FCFA)", type: 'text', required: true },
      { key: 'date_prise_fonction', label: "Date de prise de fonction", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÉSENTATION/ANIMATEUR</h1><p>Média : {{media_employeur}} — Animateur : {{animateur}}</p><p>Émissions : {{emissions_concernees}}</p><p>Rémunération : {{remuneration_mensuelle}} FCFA/mois — Début : {{date_prise_fonction}}</p></div>`
  },
  {
    code: 'med3_droits_retransmission_sport',
    name: "Accord de droits de retransmission sportive",
    category: 'juridique_admin',
    price: 15000, priceMax: 50000,
    description: "Accord cédant à un diffuseur le droit de retransmettre des événements sportifs en direct, incluant les droits territoriaux et les obligations de production.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      { key: 'detenteur_droits', label: "Détenteur des droits sportifs", type: 'text', required: true },
      { key: 'diffuseur', label: "Diffuseur", type: 'text', required: true },
      { key: 'evenements_couverts', label: "Événements couverts", type: 'textarea', required: true },
      { key: 'montant_droits', label: "Montant des droits (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE DROITS DE RETRANSMISSION SPORTIVE</h1><p>Détenteur : {{detenteur_droits}} — Diffuseur : {{diffuseur}}</p><p>Événements : {{evenements_couverts}}</p><p>Droits : {{montant_droits}} FCFA — Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'med3_correspondant_presse',
    name: "Contrat de correspondant de presse",
    category: 'juridique_admin',
    price: 4000, priceMax: 14000,
    description: "Contrat liant un organe de presse à un correspondant régional ou international, définissant les missions, la rémunération à la pige et les droits d'auteur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'organe_presse', label: "Organe de presse", type: 'text', required: true },
      { key: 'correspondant', label: "Nom du correspondant", type: 'text', required: true },
      { key: 'zone_couverture', label: "Zone de couverture", type: 'text', required: true },
      { key: 'remuneration_pige', label: "Rémunération à la pige (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CORRESPONDANT DE PRESSE</h1><p>Organe : {{organe_presse}} — Correspondant : {{correspondant}}</p><p>Zone : {{zone_couverture}} — Rémunération pige : {{remuneration_pige}} FCFA</p><p>Début : {{date_debut}}</p></div>`
  },
  {
    code: 'med3_presse_en_ligne',
    name: "Convention de service de presse en ligne",
    category: 'juridique_admin',
    price: 6000, priceMax: 20000,
    description: "Convention encadrant la publication de contenus journalistiques sur une plateforme numérique, avec définition des droits numériques et de la ligne éditoriale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'editeur_numerique', label: "Éditeur numérique", type: 'text', required: true },
      { key: 'partenaire_contenu', label: "Partenaire de contenu", type: 'text', required: true },
      { key: 'type_contenus', label: "Types de contenus", type: 'textarea', required: true },
      { key: 'remuneration', label: "Rémunération convenue (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE DE PRESSE EN LIGNE</h1><p>Éditeur : {{editeur_numerique}} — Partenaire : {{partenaire_contenu}}</p><p>Contenus : {{type_contenus}}</p><p>Rémunération : {{remuneration}} FCFA — Début : {{date_debut}}</p></div>`
  },
  {
    code: 'med3_redacteur_en_chef',
    name: "Contrat de rédacteur en chef",
    category: 'juridique_admin',
    price: 7000, priceMax: 24000,
    description: "Contrat nommant un rédacteur en chef d'un organe de presse, définissant ses responsabilités éditoriales, sa rémunération et ses obligations déontologiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'organe_presse', label: "Organe de presse", type: 'text', required: true },
      { key: 'redacteur_chef', label: "Nom du rédacteur en chef", type: 'text', required: true },
      { key: 'responsabilites', label: "Responsabilités éditoriales", type: 'textarea', required: true },
      { key: 'salaire_mensuel', label: "Salaire mensuel brut (FCFA)", type: 'text', required: true },
      { key: 'date_prise_fonction', label: "Date de prise de fonction", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RÉDACTEUR EN CHEF</h1><p>Organe : {{organe_presse}} — Rédacteur en chef : {{redacteur_chef}}</p><p>Responsabilités : {{responsabilites}}</p><p>Salaire : {{salaire_mensuel}} FCFA — Début : {{date_prise_fonction}}</p></div>`
  },
  {
    code: 'med3_distribution_journal',
    name: "Accord de distribution de journal",
    category: 'juridique_admin',
    price: 5000, priceMax: 16000,
    description: "Accord confiant à un distributeur la commercialisation et la diffusion physique d'un titre de presse écrite sur un territoire donné, avec objectifs de vente.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'editeur_journal', label: "Éditeur du journal", type: 'text', required: true },
      { key: 'distributeur', label: "Distributeur", type: 'text', required: true },
      { key: 'zone_distribution', label: "Zone de distribution", type: 'text', required: true },
      { key: 'commission_distribution', label: "Commission de distribution (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION DE JOURNAL</h1><p>Éditeur : {{editeur_journal}} — Distributeur : {{distributeur}}</p><p>Zone : {{zone_distribution}} — Commission : {{commission_distribution}}%</p><p>Début : {{date_debut}}</p></div>`
  },
  {
    code: 'med3_publicite_radio',
    name: "Contrat de publicité radio",
    category: 'juridique_admin',
    price: 4000, priceMax: 14000,
    description: "Contrat de diffusion de spots publicitaires sur une radio, précisant les créneaux horaires, la fréquence de passage et le tarif applicable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      { key: 'radio', label: "Station radio", type: 'text', required: true },
      { key: 'annonceur', label: "Annonceur", type: 'text', required: true },
      { key: 'creneaux_diffusion', label: "Créneaux de diffusion", type: 'textarea', required: true },
      { key: 'tarif_spot', label: "Tarif par spot (FCFA)", type: 'text', required: true },
      { key: 'date_debut_campagne', label: "Date de début de campagne", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PUBLICITÉ RADIO</h1><p>Radio : {{radio}} — Annonceur : {{annonceur}}</p><p>Créneaux : {{creneaux_diffusion}}</p><p>Tarif spot : {{tarif_spot}} FCFA — Début campagne : {{date_debut_campagne}}</p></div>`
  },
  {
    code: 'med3_parrainage_emission',
    name: "Convention de parrainage émission",
    category: 'juridique_admin',
    price: 6000, priceMax: 20000,
    description: "Convention par laquelle un annonceur parraine une émission audiovisuelle, avec définition des contreparties de visibilité et des obligations des parties.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'media', label: "Média organisateur", type: 'text', required: true },
      { key: 'parrain', label: "Parrain/sponsor", type: 'text', required: true },
      { key: 'emission_parrainee', label: "Émission parrainée", type: 'text', required: true },
      { key: 'montant_parrainage', label: "Montant du parrainage (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARRAINAGE ÉMISSION</h1><p>Média : {{media}} — Parrain : {{parrain}}</p><p>Émission : {{emission_parrainee}} — Montant : {{montant_parrainage}} FCFA</p><p>Début : {{date_debut}}</p></div>`
  },
  {
    code: 'med3_production_podcast',
    name: "Contrat de production podcast",
    category: 'juridique_admin',
    price: 5000, priceMax: 16000,
    description: "Contrat encadrant la production d'un podcast par un créateur de contenu pour le compte d'une marque ou d'un média, avec cession des droits numériques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'commanditaire', label: "Commanditaire (marque/média)", type: 'text', required: true },
      { key: 'producteur_podcast', label: "Producteur du podcast", type: 'text', required: true },
      { key: 'titre_podcast', label: "Titre du podcast", type: 'text', required: true },
      { key: 'nombre_episodes', label: "Nombre d'épisodes", type: 'text', required: true },
      { key: 'budget_production', label: "Budget de production (FCFA)", type: 'text', required: true },
      { key: 'date_lancement', label: "Date de lancement", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRODUCTION PODCAST</h1><p>Commanditaire : {{commanditaire}} — Producteur : {{producteur_podcast}}</p><p>Podcast : {{titre_podcast}} — {{nombre_episodes}} épisodes</p><p>Budget : {{budget_production}} FCFA — Lancement : {{date_lancement}}</p></div>`
  },
  {
    code: 'med3_plateforme_streaming',
    name: "Accord de plateforme de streaming",
    category: 'juridique_admin',
    price: 12000, priceMax: 40000,
    description: "Accord entre un détenteur de contenus et une plateforme de streaming audiovisuel pour la mise à disposition de contenus en ligne, avec partage des revenus.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'detenteur_contenus', label: "Détenteur des contenus", type: 'text', required: true },
      { key: 'plateforme', label: "Plateforme de streaming", type: 'text', required: true },
      { key: 'catalogue_contenus', label: "Description du catalogue", type: 'textarea', required: true },
      { key: 'partage_revenus', label: "Partage des revenus (%)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE PLATEFORME DE STREAMING</h1><p>Détenteur : {{detenteur_contenus}} — Plateforme : {{plateforme}}</p><p>Catalogue : {{catalogue_contenus}}</p><p>Partage revenus : {{partage_revenus}}% — Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'med3_licence_contenu_numerique',
    name: "Contrat de licence de contenu numérique",
    category: 'juridique_admin',
    price: 8000, priceMax: 28000,
    description: "Contrat de licence accordant à un tiers le droit d'utiliser des contenus numériques (textes, images, vidéos, musiques) selon des conditions définies.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'concedant', label: "Concédant de la licence", type: 'text', required: true },
      { key: 'licencie', label: "Licencié", type: 'text', required: true },
      { key: 'description_contenus', label: "Description des contenus", type: 'textarea', required: true },
      { key: 'redevance_licence', label: "Redevance de licence (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE LICENCE DE CONTENU NUMÉRIQUE</h1><p>Concédant : {{concedant}} — Licencié : {{licencie}}</p><p>Contenus : {{description_contenus}}</p><p>Redevance : {{redevance_licence}} FCFA — Début : {{date_debut}}</p></div>`
  },
  {
    code: 'med3_syndication_contenu',
    name: "Convention de syndication de contenu",
    category: 'juridique_admin',
    price: 7000, priceMax: 24000,
    description: "Convention autorisant la reprise et la redistribution de contenus éditoriaux (articles, chroniques, infographies) par des médias partenaires, avec conditions d'attribution.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      { key: 'source_contenu', label: "Source originale du contenu", type: 'text', required: true },
      { key: 'partenaire_syndication', label: "Partenaire de syndication", type: 'text', required: true },
      { key: 'types_contenus_syndiqs', label: "Types de contenus syndicaux", type: 'textarea', required: true },
      { key: 'remuneration_syndication', label: "Rémunération de syndication (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SYNDICATION DE CONTENU</h1><p>Source : {{source_contenu}} — Partenaire : {{partenaire_syndication}}</p><p>Contenus : {{types_contenus_syndiqs}}</p><p>Rémunération : {{remuneration_syndication}} FCFA — Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'med3_co_edition_livre',
    name: "Accord de co-édition livre",
    category: 'juridique_admin',
    price: 9000, priceMax: 30000,
    description: "Accord entre deux maisons d'édition pour la co-publication d'un ouvrage, avec répartition des droits, des coûts d'impression et des territoires de diffusion.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'editeur_principal', label: "Éditeur principal", type: 'text', required: true },
      { key: 'co_editeur', label: "Co-éditeur", type: 'text', required: true },
      { key: 'titre_ouvrage', label: "Titre de l'ouvrage", type: 'text', required: true },
      { key: 'repartition_droits', label: "Répartition des droits (%)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CO-ÉDITION LIVRE</h1><p>Éditeur principal : {{editeur_principal}} — Co-éditeur : {{co_editeur}}</p><p>Ouvrage : {{titre_ouvrage}} — Droits : {{repartition_droits}}</p><p>Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'med3_distribution_editoriale',
    name: "Contrat de distribution éditoriale",
    category: 'juridique_admin',
    price: 7000, priceMax: 22000,
    description: "Contrat confiant à un diffuseur-distributeur la commercialisation du catalogue d'un éditeur en librairies et points de vente sur un territoire défini.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      { key: 'editeur', label: "Maison d'édition", type: 'text', required: true },
      { key: 'distributeur', label: "Distributeur éditorial", type: 'text', required: true },
      { key: 'territoire', label: "Territoire de distribution", type: 'text', required: true },
      { key: 'taux_commission', label: "Taux de commission (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DISTRIBUTION ÉDITORIALE</h1><p>Éditeur : {{editeur}} — Distributeur : {{distributeur}}</p><p>Territoire : {{territoire}} — Commission : {{taux_commission}}%</p><p>Début : {{date_debut}}</p></div>`
  },
  {
    code: 'med3_accord_bibliotheque_nationale',
    name: "Accord avec bibliothèque nationale",
    category: 'juridique_admin',
    price: 5000, priceMax: 16000,
    description: "Accord entre un éditeur ou auteur et la Bibliothèque nationale de Côte d'Ivoire pour la mise à disposition de collections, numérisation et accès au public.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      { key: 'partenaire_editeur', label: "Éditeur ou auteur partenaire", type: 'text', required: true },
      { key: 'titres_concernes', label: "Titres ou collections concernés", type: 'textarea', required: true },
      { key: 'modalites_acces', label: "Modalités d'accès au public", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
      { key: 'duree_accord', label: "Durée de l'accord", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD AVEC LA BIBLIOTHÈQUE NATIONALE</h1><p>Partenaire : {{partenaire_editeur}}</p><p>Titres : {{titres_concernes}}</p><p>Accès : {{modalites_acces}} — Durée : {{duree_accord}}</p><p>Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'med3_depot_legal_numerique',
    name: "Convention de dépôt légal numérique",
    category: 'juridique_admin',
    price: 4000, priceMax: 14000,
    description: "Convention encadrant l'obligation de dépôt légal des publications numériques auprès des autorités compétentes en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 47,
    fieldsJson: F([
      { key: 'editeur_numerique', label: "Éditeur numérique", type: 'text', required: true },
      { key: 'autorite_depot', label: "Autorité de dépôt légal", type: 'text', required: true },
      { key: 'publications_concernees', label: "Publications concernées", type: 'textarea', required: true },
      { key: 'periodicite_depot', label: "Périodicité du dépôt", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE DÉPÔT LÉGAL NUMÉRIQUE</h1><p>Éditeur : {{editeur_numerique}} — Autorité : {{autorite_depot}}</p><p>Publications : {{publications_concernees}}</p><p>Périodicité : {{periodicite_depot}} — Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'med3_traduction_editoriale',
    name: "Contrat de traduction éditoriale",
    category: 'juridique_admin',
    price: 6000, priceMax: 20000,
    description: "Contrat entre un éditeur et un traducteur pour la traduction d'un ouvrage, avec définition des droits de traduction, de la rémunération et des délais.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      { key: 'editeur', label: "Maison d'édition", type: 'text', required: true },
      { key: 'traducteur', label: "Nom du traducteur", type: 'text', required: true },
      { key: 'ouvrage_traduire', label: "Ouvrage à traduire", type: 'text', required: true },
      { key: 'langues', label: "Langue source et langue cible", type: 'text', required: true },
      { key: 'remuneration', label: "Rémunération (FCFA)", type: 'text', required: true },
      { key: 'date_remise', label: "Date de remise de la traduction", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRADUCTION ÉDITORIALE</h1><p>Éditeur : {{editeur}} — Traducteur : {{traducteur}}</p><p>Ouvrage : {{ouvrage_traduire}} — Langues : {{langues}}</p><p>Rémunération : {{remuneration}} FCFA — Remise le : {{date_remise}}</p></div>`
  },
  {
    code: 'med3_sous_licence_medias',
    name: "Accord de sous-licence médias",
    category: 'juridique_admin',
    price: 8000, priceMax: 26000,
    description: "Accord autorisant un licencié à sous-licencier des droits médias à des tiers, dans les limites définies par le contrat de licence principal.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      { key: 'licencie_principal', label: "Licencié principal", type: 'text', required: true },
      { key: 'sous_licencie', label: "Sous-licencié", type: 'text', required: true },
      { key: 'droits_sous_licencies', label: "Droits sous-licenciés", type: 'textarea', required: true },
      { key: 'redevance_sous_licence', label: "Redevance de sous-licence (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUS-LICENCE MÉDIAS</h1><p>Licencié principal : {{licencie_principal}} — Sous-licencié : {{sous_licencie}}</p><p>Droits : {{droits_sous_licencies}}</p><p>Redevance : {{redevance_sous_licence}} FCFA — Signé le : {{date_signature}}</p></div>`
  },
  {
    code: 'med3_presse_specialisee_b2b',
    name: "Convention de presse spécialisée B2B",
    category: 'juridique_admin',
    price: 7000, priceMax: 22000,
    description: "Convention encadrant la diffusion d'un titre de presse professionnelle (B2B) auprès d'un secteur d'activité spécifique, avec abonnements et publicités ciblées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'editeur_b2b', label: "Éditeur de la presse B2B", type: 'text', required: true },
      { key: 'partenaire_professionnel', label: "Partenaire professionnel", type: 'text', required: true },
      { key: 'secteur_cible', label: "Secteur professionnel ciblé", type: 'text', required: true },
      { key: 'tarif_abonnement', label: "Tarif abonnement annuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PRESSE SPÉCIALISÉE B2B</h1><p>Éditeur : {{editeur_b2b}} — Partenaire : {{partenaire_professionnel}}</p><p>Secteur ciblé : {{secteur_cible}} — Abonnement : {{tarif_abonnement}} FCFA/an</p><p>Début : {{date_debut}}</p></div>`
  },
  {
    code: 'med3_native_advertising',
    name: "Accord de contenu sponsorisé (native advertising)",
    category: 'juridique_admin',
    price: 6000, priceMax: 20000,
    description: "Accord entre un média et une marque pour la production et diffusion de contenu sponsorisé intégré à l'environnement éditorial, avec mentions légales obligatoires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'media_partenaire', label: "Média partenaire", type: 'text', required: true },
      { key: 'marque_sponsor', label: "Marque sponsor", type: 'text', required: true },
      { key: 'description_contenu', label: "Description du contenu sponsorisé", type: 'textarea', required: true },
      { key: 'budget_sponsoring', label: "Budget de sponsoring (FCFA)", type: 'text', required: true },
      { key: 'date_publication', label: "Date de publication prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONTENU SPONSORISÉ — NATIVE ADVERTISING</h1><p>Média : {{media_partenaire}} — Sponsor : {{marque_sponsor}}</p><p>Contenu : {{description_contenu}}</p><p>Budget : {{budget_sponsoring}} FCFA — Publication : {{date_publication}}</p></div>`
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
  console.log(`Batch 24a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
