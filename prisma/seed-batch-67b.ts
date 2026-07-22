import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── WASH2 : Eau / Assainissement (25 templates) ──────────────────────────
  {
    code: 'wash2_adduction_eau_sodeci',
    name: "Accord de service d'adduction d'eau potable (SODECI)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord encadrant la fourniture d'eau potable via le réseau SODECI pour une localité ou un abonné professionnel en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_abonne', label:"Nom de l'abonné", type:'text', required:true},
      {key:'localite', label:"Localité / commune", type:'text', required:true},
      {key:'date_debut', label:"Date de début du service", type:'date', required:true},
      {key:'volume_journalier', label:"Volume journalier estimé (m³)", type:'text', required:true},
      {key:'tarif_m3', label:"Tarif au m³ (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ADDUCTION D'EAU POTABLE</h1>
<p>Entre la Société de Distribution d'Eau de Côte d'Ivoire (SODECI) et <strong>{{nom_abonne}}</strong>, situé(e) à {{localite}}.</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord a pour objet la fourniture d'eau potable à compter du {{date_debut}} pour un volume journalier estimé à {{volume_journalier}} m³.</p>
<h2>Article 2 – Tarification</h2>
<p>Le tarif applicable est de {{tarif_m3}} FCFA par m³, conformément à la grille tarifaire en vigueur approuvée par l'autorité de régulation.</p>
<h2>Article 3 – Obligations des parties</h2>
<p>La SODECI s'engage à maintenir une pression minimale et une qualité conforme aux normes OMS. L'abonné s'engage à régler les factures dans les délais impartis.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Le présent accord est régi par le droit ivoirien et les dispositions du Code de l'eau.</p></div>`
  },
  {
    code: 'wash2_forage_pompe',
    name: "Accord de service de forage d'eau et pompe",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat pour la réalisation d'un forage hydraulique équipé d'une pompe immergée ou à motricité humaine dans une zone rurale ou semi-urbaine.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'maitre_ouvrage', label:"Maître d'ouvrage", type:'text', required:true},
      {key:'prestataire', label:"Prestataire / entreprise de forage", type:'text', required:true},
      {key:'village', label:"Village / site d'implantation", type:'text', required:true},
      {key:'profondeur', label:"Profondeur prévue (mètres)", type:'text', required:true},
      {key:'date_travaux', label:"Date de démarrage des travaux", type:'date', required:true},
      {key:'montant_marche', label:"Montant du marché (FCFA)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORAGE D'EAU ET POMPE</h1>
<p>Entre <strong>{{maitre_ouvrage}}</strong> (ci-après le Maître d'ouvrage) et <strong>{{prestataire}}</strong> (ci-après le Prestataire).</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord porte sur la réalisation d'un forage hydraulique au site de {{village}}, d'une profondeur prévue de {{profondeur}} mètres, équipé d'une pompe adaptée.</p>
<h2>Article 2 – Délai et démarrage</h2>
<p>Les travaux démarreront le {{date_travaux}}. Le Prestataire s'engage à respecter le planning défini en annexe technique.</p>
<h2>Article 3 – Rémunération</h2>
<p>Le montant global du marché est fixé à {{montant_marche}} FCFA TTC, réglé selon les échéances convenues.</p>
<h2>Article 4 – Garantie</h2>
<p>Le Prestataire garantit le débit minimal contractuel pendant 12 mois après réception définitive.</p></div>`
  },
  {
    code: 'wash2_traitement_chloration',
    name: "Accord de service de traitement de l'eau potable (chloration)",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Accord pour la mise en place et l'exploitation d'un système de chloration de l'eau destinée à la consommation humaine.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'operateur', label:"Opérateur technique", type:'text', required:true},
      {key:'site_traitement', label:"Site de traitement", type:'text', required:true},
      {key:'capacite_traitement', label:"Capacité de traitement (m³/h)", type:'text', required:true},
      {key:'norme_residuel', label:"Taux de chlore résiduel cible (mg/L)", type:'text', required:true},
      {key:'date_contrat', label:"Date d'entrée en vigueur", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEMENT DE L'EAU POTABLE (CHLORATION)</h1>
<p>Entre le maître d'ouvrage et <strong>{{operateur}}</strong>, chargé du traitement au site de {{site_traitement}}.</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord définit les modalités de chloration de l'eau produite à raison de {{capacite_traitement}} m³/h.</p>
<h2>Article 2 – Normes</h2>
<p>Le taux de chlore résiduel libre en sortie de traitement doit être maintenu à {{norme_residuel}} mg/L conformément aux recommandations de l'OMS et du Ministère de la Santé.</p>
<h2>Article 3 – Prise d'effet</h2>
<p>Le présent accord prend effet le {{date_contrat}} et est renouvelable par tacite reconduction.</p></div>`
  },
  {
    code: 'wash2_reseau_rural',
    name: "Accord de service de réseau de distribution eau rurale",
    category: 'agro_environnement', price: 5500, priceMax: 16000,
    description: "Accord de gestion déléguée d'un réseau de distribution d'eau potable en milieu rural, incluant entretien des conduites et compteurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'collectivite', label:"Collectivité délégante", type:'text', required:true},
      {key:'gestionnaire', label:"Gestionnaire délégué", type:'text', required:true},
      {key:'zone_desserte', label:"Zone de desserte", type:'text', required:true},
      {key:'longueur_reseau', label:"Longueur du réseau (km)", type:'text', required:true},
      {key:'duree_delegation', label:"Durée de la délégation (années)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉSEAU DE DISTRIBUTION EAU RURALE</h1>
<p>Entre <strong>{{collectivite}}</strong> et <strong>{{gestionnaire}}</strong> pour la zone de {{zone_desserte}}.</p>
<h2>Article 1 – Périmètre</h2>
<p>Le présent accord couvre un réseau de {{longueur_reseau}} km de conduites desservant la zone définie en annexe cartographique.</p>
<h2>Article 2 – Durée</h2>
<p>La délégation est consentie pour une durée de {{duree_delegation}} ans, renouvelable après évaluation.</p>
<h2>Article 3 – Obligations du gestionnaire</h2>
<p>Le gestionnaire assure l'entretien préventif et curatif, la relève des compteurs et le recouvrement des redevances.</p></div>`
  },
  {
    code: 'wash2_chateau_eau',
    name: "Accord de service de château d'eau et réservoir",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat de construction, d'équipement et de maintenance d'un château d'eau ou d'un réservoir de stockage pour alimentation en eau potable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'maitre_ouvrage', label:"Maître d'ouvrage", type:'text', required:true},
      {key:'constructeur', label:"Entreprise de construction", type:'text', required:true},
      {key:'capacite_reservoir', label:"Capacité du réservoir (m³)", type:'text', required:true},
      {key:'hauteur_chateau', label:"Hauteur du château d'eau (m)", type:'text', required:true},
      {key:'date_livraison', label:"Date de livraison prévue", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CHÂTEAU D'EAU ET RÉSERVOIR</h1>
<p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{constructeur}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Construction d'un réservoir de {{capacite_reservoir}} m³ sur château d'eau de {{hauteur_chateau}} m de hauteur.</p>
<h2>Article 2 – Livraison</h2>
<p>Les travaux seront livrés au plus tard le {{date_livraison}}, sous réserve de force majeure dûment constatée.</p>
<h2>Article 3 – Maintenance</h2>
<p>Le constructeur assure la maintenance pendant 24 mois après réception provisoire.</p></div>`
  },
  {
    code: 'wash2_borne_fontaine',
    name: "Accord de service de borne-fontaine communautaire",
    category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Accord de gestion communautaire d'une borne-fontaine publique incluant tarification, comité de gestion et maintenance de premier niveau.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'comite_gestion', label:"Nom du comité de gestion", type:'text', required:true},
      {key:'village_quartier', label:"Village / quartier", type:'text', required:true},
      {key:'tarif_bidon', label:"Tarif par bidon de 20L (FCFA)", type:'text', required:true},
      {key:'fontainier', label:"Nom du fontainier désigné", type:'text', required:true},
      {key:'date_mise_service', label:"Date de mise en service", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BORNE-FONTAINE COMMUNAUTAIRE</h1>
<p>Le comité de gestion <strong>{{comite_gestion}}</strong> de {{village_quartier}} s'engage à gérer la borne-fontaine conformément aux présentes dispositions.</p>
<h2>Article 1 – Tarification</h2>
<p>Le tarif de vente est fixé à {{tarif_bidon}} FCFA par bidon de 20 litres.</p>
<h2>Article 2 – Fontainier</h2>
<p>La personne désignée pour assurer la distribution est <strong>{{fontainier}}</strong>, rémunérée sur les recettes de vente.</p>
<h2>Article 3 – Mise en service</h2>
<p>La borne-fontaine est mise en service le {{date_mise_service}}.</p></div>`
  },
  {
    code: 'wash2_assainissement_onad',
    name: "Accord de service d'assainissement des eaux usées (ONAD)",
    category: 'agro_environnement', price: 5000, priceMax: 14000,
    description: "Accord entre l'ONAD et un bénéficiaire pour la collecte et le traitement des eaux usées domestiques ou industrielles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'abonne', label:"Nom de l'abonné", type:'text', required:true},
      {key:'adresse_raccordement', label:"Adresse du raccordement", type:'text', required:true},
      {key:'type_effluent', label:"Type d'effluent (domestique / industriel)", type:'text', required:true},
      {key:'debit_estime', label:"Débit journalier estimé (m³/j)", type:'text', required:true},
      {key:'date_raccordement', label:"Date de raccordement prévu", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ASSAINISSEMENT DES EAUX USÉES (ONAD)</h1>
<p>Entre l'Office National de l'Assainissement et du Drainage (ONAD) et <strong>{{abonne}}</strong>, domicilié(e) au {{adresse_raccordement}}.</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord organise le raccordement et le traitement des eaux usées de type {{type_effluent}}, pour un débit estimé à {{debit_estime}} m³/j.</p>
<h2>Article 2 – Raccordement</h2>
<p>Le raccordement au réseau public sera effectué le {{date_raccordement}} aux frais de l'abonné.</p>
<h2>Article 3 – Redevance</h2>
<p>Une redevance d'assainissement est perçue selon la grille tarifaire officielle de l'ONAD.</p></div>`
  },
  {
    code: 'wash2_fosse_septique',
    name: "Accord de service de construction de fosses septiques",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Contrat de construction de fosses septiques conformes aux normes ivoiriennes d'assainissement individuel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'client', label:"Nom du client / maître d'ouvrage", type:'text', required:true},
      {key:'prestataire', label:"Entreprise de construction", type:'text', required:true},
      {key:'adresse_chantier', label:"Adresse du chantier", type:'text', required:true},
      {key:'volume_fosse', label:"Volume de la fosse (m³)", type:'text', required:true},
      {key:'date_debut_travaux', label:"Date de début des travaux", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSTRUCTION DE FOSSES SEPTIQUES</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{prestataire}}</strong> pour les travaux situés au {{adresse_chantier}}.</p>
<h2>Article 1 – Objet</h2>
<p>Construction d'une fosse septique de {{volume_fosse}} m³ conforme aux normes techniques nationales.</p>
<h2>Article 2 – Délai</h2>
<p>Les travaux démarreront le {{date_debut_travaux}} et seront achevés dans les délais fixés en annexe.</p>
<h2>Article 3 – Conformité</h2>
<p>La fosse devra être conforme aux prescriptions du service d'hygiène compétent.</p></div>`
  },
  {
    code: 'wash2_latrines_vip',
    name: "Accord de service de latrines VIP écologiques",
    category: 'agro_environnement', price: 3500, priceMax: 10000,
    description: "Accord pour la construction et la gestion de latrines VIP (Ventilated Improved Pit) dans les zones rurales et péri-urbaines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'beneficiaire', label:"Bénéficiaire / communauté", type:'text', required:true},
      {key:'constructeur', label:"Constructeur", type:'text', required:true},
      {key:'nombre_latrines', label:"Nombre de latrines à construire", type:'text', required:true},
      {key:'site', label:"Site d'implantation", type:'text', required:true},
      {key:'date_fin_travaux', label:"Date de fin des travaux", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LATRINES VIP ÉCOLOGIQUES</h1>
<p>Entre <strong>{{beneficiaire}}</strong> et <strong>{{constructeur}}</strong>, pour la construction de {{nombre_latrines}} latrines VIP au site de {{site}}.</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord porte sur la construction de latrines ventilées améliorées respectant les standards WASH.</p>
<h2>Article 2 – Livraison</h2>
<p>Les travaux seront achevés au plus tard le {{date_fin_travaux}}.</p>
<h2>Article 3 – Hygiène et entretien</h2>
<p>Un protocole de nettoyage et d'entretien sera remis aux utilisateurs à la réception des ouvrages.</p></div>`
  },
  {
    code: 'wash2_boues_vidange',
    name: "Accord de service de traitement des boues de vidange",
    category: 'agro_environnement', price: 4500, priceMax: 13000,
    description: "Contrat de collecte, transport et traitement des boues de vidange issues des fosses septiques et latrines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'operateur', label:"Opérateur de vidange", type:'text', required:true},
      {key:'site_traitement', label:"Station de traitement des boues", type:'text', required:true},
      {key:'frequence_collecte', label:"Fréquence de collecte", type:'text', required:true},
      {key:'tarif_vidange', label:"Tarif par vidange (FCFA)", type:'text', required:true},
      {key:'date_debut', label:"Date de début du service", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEMENT DES BOUES DE VIDANGE</h1>
<p>Entre le client et <strong>{{operateur}}</strong> pour la gestion des boues acheminées vers {{site_traitement}}.</p>
<h2>Article 1 – Fréquence</h2>
<p>La collecte sera effectuée selon la fréquence suivante : {{frequence_collecte}}.</p>
<h2>Article 2 – Tarification</h2>
<p>Le tarif par vidange est fixé à {{tarif_vidange}} FCFA, payable à la prestation.</p>
<h2>Article 3 – Prise d'effet</h2>
<p>Le service débute le {{date_debut}}.</p></div>`
  },
  {
    code: 'wash2_drainage_pluvial',
    name: "Accord de service de drainage des eaux pluviales urbaines",
    category: 'agro_environnement', price: 5500, priceMax: 16000,
    description: "Accord pour la conception, la construction ou l'entretien des ouvrages de drainage des eaux pluviales en milieu urbain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'commune', label:"Commune bénéficiaire", type:'text', required:true},
      {key:'prestataire', label:"Prestataire technique", type:'text', required:true},
      {key:'lineaire_canaux', label:"Linéaire de canaux (ml)", type:'text', required:true},
      {key:'type_intervention', label:"Type d'intervention (construction / entretien)", type:'text', required:true},
      {key:'date_intervention', label:"Date de début d'intervention", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DRAINAGE DES EAUX PLUVIALES URBAINES</h1>
<p>Entre la commune de <strong>{{commune}}</strong> et <strong>{{prestataire}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord porte sur {{type_intervention}} de {{lineaire_canaux}} ml de canaux de drainage urbain.</p>
<h2>Article 2 – Calendrier</h2>
<p>L'intervention démarre le {{date_intervention}} conformément au planning en annexe.</p>
<h2>Article 3 – Normes techniques</h2>
<p>Les ouvrages respecteront les normes du Ministère de la Construction et les standards BNETD.</p></div>`
  },
  {
    code: 'wash2_dechets_menagers',
    name: "Accord de service de gestion des déchets solides ménagers",
    category: 'agro_environnement', price: 4000, priceMax: 11000,
    description: "Contrat de collecte, transport et traitement des ordures ménagères pour une commune ou un opérateur privé en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'commune_client', label:"Commune / client", type:'text', required:true},
      {key:'operateur', label:"Opérateur de collecte", type:'text', required:true},
      {key:'zone_collecte', label:"Zone de collecte", type:'text', required:true},
      {key:'frequence', label:"Fréquence de collecte (ex : 3x/semaine)", type:'text', required:true},
      {key:'date_debut', label:"Date de démarrage du service", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES DÉCHETS SOLIDES MÉNAGERS</h1>
<p>Entre <strong>{{commune_client}}</strong> et <strong>{{operateur}}</strong> pour la zone de {{zone_collecte}}.</p>
<h2>Article 1 – Objet</h2>
<p>Collecte et évacuation des ordures ménagères à raison de {{frequence}}.</p>
<h2>Article 2 – Démarrage</h2>
<p>Le service débute le {{date_debut}} pour une durée initiale d'un an renouvelable.</p>
<h2>Article 3 – Indicateurs</h2>
<p>Le taux de desserte visé est d'au moins 80% des ménages de la zone.</p></div>`
  },
  {
    code: 'wash2_collecte_plastiques',
    name: "Accord de service de collecte de déchets plastiques",
    category: 'agro_environnement', price: 3500, priceMax: 10000,
    description: "Accord pour la collecte sélective, le tri et le conditionnement des déchets plastiques en vue de leur recyclage.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'collecteur', label:"Organisation / collecteur", type:'text', required:true},
      {key:'zone_intervention', label:"Zone d'intervention", type:'text', required:true},
      {key:'tonnage_mensuel', label:"Tonnage mensuel cible (tonnes)", type:'text', required:true},
      {key:'centre_tri', label:"Centre de tri / recycleur partenaire", type:'text', required:true},
      {key:'date_lancement', label:"Date de lancement", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COLLECTE DE DÉCHETS PLASTIQUES</h1>
<p>Entre <strong>{{collecteur}}</strong> et son partenaire de recyclage <strong>{{centre_tri}}</strong>, pour la zone de {{zone_intervention}}.</p>
<h2>Article 1 – Objectif</h2>
<p>Collecte d'un tonnage mensuel cible de {{tonnage_mensuel}} tonnes de déchets plastiques.</p>
<h2>Article 2 – Lancement</h2>
<p>L'opération débute le {{date_lancement}}.</p>
<h2>Article 3 – Traçabilité</h2>
<p>Chaque lot collecté fera l'objet d'un bon de livraison signé par les deux parties.</p></div>`
  },
  {
    code: 'wash2_compostage',
    name: "Accord de service de compostage des déchets organiques",
    category: 'agro_environnement', price: 3500, priceMax: 10000,
    description: "Contrat de mise en place et d'exploitation d'une plateforme de compostage des déchets organiques ménagers ou agricoles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'operateur', label:"Opérateur de compostage", type:'text', required:true},
      {key:'site_plateforme', label:"Site de la plateforme", type:'text', required:true},
      {key:'capacite_traitement', label:"Capacité de traitement (t/mois)", type:'text', required:true},
      {key:'type_intrant', label:"Type de déchets organiques traités", type:'text', required:true},
      {key:'date_debut', label:"Date de début d'exploitation", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPOSTAGE DES DÉCHETS ORGANIQUES</h1>
<p>Entre le client et <strong>{{operateur}}</strong>, exploitant la plateforme de compostage sise à {{site_plateforme}}.</p>
<h2>Article 1 – Capacité</h2>
<p>La plateforme est dimensionnée pour traiter {{capacite_traitement}} tonnes par mois de déchets de type {{type_intrant}}.</p>
<h2>Article 2 – Démarrage</h2>
<p>L'exploitation débute le {{date_debut}}.</p>
<h2>Article 3 – Compost produit</h2>
<p>Le compost produit sera certifié conforme aux normes phytosanitaires avant commercialisation.</p></div>`
  },
  {
    code: 'wash2_decharge_cet',
    name: "Accord de service de décharge contrôlée (CET)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord d'exploitation d'un Centre d'Enfouissement Technique (CET) conforme aux normes environnementales ivoiriennes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'exploitant', label:"Exploitant du CET", type:'text', required:true},
      {key:'localisation_cet', label:"Localisation du CET", type:'text', required:true},
      {key:'capacite_annuelle', label:"Capacité annuelle (tonnes)", type:'text', required:true},
      {key:'duree_exploitation', label:"Durée d'exploitation prévue (années)", type:'text', required:true},
      {key:'date_ouverture', label:"Date d'ouverture", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉCHARGE CONTRÔLÉE (CET)</h1>
<p>Le présent accord autorise <strong>{{exploitant}}</strong> à exploiter le Centre d'Enfouissement Technique situé à {{localisation_cet}}.</p>
<h2>Article 1 – Capacité</h2>
<p>Capacité annuelle : {{capacite_annuelle}} tonnes, pour une durée d'exploitation de {{duree_exploitation}} ans.</p>
<h2>Article 2 – Ouverture</h2>
<p>Le CET ouvre le {{date_ouverture}} après délivrance du permis environnemental.</p>
<h2>Article 3 – Suivi environnemental</h2>
<p>Un suivi des lixiviats et des émissions gazeuses sera réalisé trimestriellement.</p></div>`
  },
  {
    code: 'wash2_recyclage_papier',
    name: "Accord de service de recyclage papier et carton",
    category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Contrat de collecte, tri et recyclage de papiers et cartons usagés issus des entreprises, administrations et ménages.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'fournisseur', label:"Fournisseur de déchets papier", type:'text', required:true},
      {key:'recycleur', label:"Centre de recyclage", type:'text', required:true},
      {key:'tonnage_mensuel', label:"Tonnage mensuel estimé (tonnes)", type:'text', required:true},
      {key:'prix_tonne', label:"Prix à la tonne (FCFA)", type:'text', required:true},
      {key:'date_debut', label:"Date de début", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECYCLAGE PAPIER ET CARTON</h1>
<p>Entre <strong>{{fournisseur}}</strong> et <strong>{{recycleur}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Fourniture de {{tonnage_mensuel}} tonnes/mois de déchets papier et carton au prix de {{prix_tonne}} FCFA/tonne.</p>
<h2>Article 2 – Prise d'effet</h2>
<p>L'accord prend effet le {{date_debut}} pour une durée d'un an renouvelable.</p>
<h2>Article 3 – Qualité</h2>
<p>Les déchets fournis seront secs, triés et exempts de souillures excessives.</p></div>`
  },
  {
    code: 'wash2_recyclage_metaux',
    name: "Accord de service de recyclage métaux ferreux et non-ferreux",
    category: 'agro_environnement', price: 3500, priceMax: 10000,
    description: "Accord de collecte et recyclage de ferraille, aluminium, cuivre et autres métaux en vue de leur valorisation industrielle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'fournisseur', label:"Fournisseur de ferraille", type:'text', required:true},
      {key:'recycleur', label:"Recycleur / fonderie", type:'text', required:true},
      {key:'type_metal', label:"Type de métal (ferreux / aluminium / cuivre…)", type:'text', required:true},
      {key:'tonnage_mensuel', label:"Tonnage mensuel (tonnes)", type:'text', required:true},
      {key:'date_debut', label:"Date de démarrage", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECYCLAGE MÉTAUX FERREUX ET NON-FERREUX</h1>
<p>Entre <strong>{{fournisseur}}</strong> et <strong>{{recycleur}}</strong> pour la valorisation de {{type_metal}}.</p>
<h2>Article 1 – Volume</h2>
<p>Le fournisseur s'engage à livrer {{tonnage_mensuel}} tonnes par mois au recycleur.</p>
<h2>Article 2 – Démarrage</h2>
<p>Le contrat prend effet le {{date_debut}}.</p>
<h2>Article 3 – Pesée</h2>
<p>Chaque livraison fera l'objet d'une pesée contradictoire et d'un bon de réception signé.</p></div>`
  },
  {
    code: 'wash2_effluents_industriels',
    name: "Accord de service de traitement des effluents industriels",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat de prise en charge, traitement et rejet conforme des effluents liquides produits par une unité industrielle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'industriel', label:"Entreprise industrielle", type:'text', required:true},
      {key:'prestataire', label:"Prestataire de traitement", type:'text', required:true},
      {key:'volume_journalier', label:"Volume journalier d'effluents (m³/j)", type:'text', required:true},
      {key:'parametre_rejet', label:"Paramètres de rejet cibles (DBO, DCO…)", type:'text', required:true},
      {key:'date_contrat', label:"Date d'entrée en vigueur", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEMENT DES EFFLUENTS INDUSTRIELS</h1>
<p>Entre <strong>{{industriel}}</strong> et <strong>{{prestataire}}</strong>.</p>
<h2>Article 1 – Volume</h2>
<p>Le volume journalier d'effluents à traiter est estimé à {{volume_journalier}} m³/j.</p>
<h2>Article 2 – Normes de rejet</h2>
<p>Les paramètres de rejet après traitement respecteront les seuils suivants : {{parametre_rejet}}, conformément à l'Arrêté relatif aux déversements industriels.</p>
<h2>Article 3 – Prise d'effet</h2>
<p>Le contrat prend effet le {{date_contrat}}.</p></div>`
  },
  {
    code: 'wash2_dechets_medicaux',
    name: "Accord de service de gestion des déchets médicaux et dangereux",
    category: 'agro_environnement', price: 5500, priceMax: 16000,
    description: "Contrat de collecte, traitement et élimination sécurisée des déchets d'activités de soins à risques infectieux (DASRI) et autres déchets dangereux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'etablissement', label:"Établissement producteur", type:'text', required:true},
      {key:'prestataire', label:"Prestataire agréé", type:'text', required:true},
      {key:'categorie_dechet', label:"Catégorie de déchets", type:'text', required:true},
      {key:'quantite_hebdo', label:"Quantité hebdomadaire estimée (kg)", type:'text', required:true},
      {key:'date_debut', label:"Date de début du service", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES DÉCHETS MÉDICAUX ET DANGEREUX</h1>
<p>Entre <strong>{{etablissement}}</strong> et <strong>{{prestataire}}</strong>, agréé par le Ministère de l'Environnement.</p>
<h2>Article 1 – Déchets concernés</h2>
<p>Catégorie : {{categorie_dechet}}, soit environ {{quantite_hebdo}} kg par semaine.</p>
<h2>Article 2 – Collecte</h2>
<p>La collecte débutera le {{date_debut}} selon un planning hebdomadaire convenu.</p>
<h2>Article 3 – Traitement</h2>
<p>L'élimination se fait par incinération à haute température ou autoclavage conformément aux normes OMS.</p></div>`
  },
  {
    code: 'wash2_depollution_site',
    name: "Accord de service de dépollution de site industriel",
    category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Contrat de diagnostic, dépollution et réhabilitation d'un site industriel contaminé par des hydrocarbures, métaux lourds ou autres polluants.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'donneur_ordre', label:"Donneur d'ordre / propriétaire", type:'text', required:true},
      {key:'bureau_depollution', label:"Bureau de dépollution", type:'text', required:true},
      {key:'site_adresse', label:"Adresse du site", type:'text', required:true},
      {key:'type_pollution', label:"Type de pollution identifiée", type:'text', required:true},
      {key:'date_debut_etude', label:"Date de début de l'étude", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPOLLUTION DE SITE INDUSTRIEL</h1>
<p>Entre <strong>{{donneur_ordre}}</strong> et <strong>{{bureau_depollution}}</strong> pour le site de {{site_adresse}}.</p>
<h2>Article 1 – Diagnostic</h2>
<p>L'étude de diagnostic démarre le {{date_debut_etude}} et porte sur la pollution de type {{type_pollution}}.</p>
<h2>Article 2 – Plan de dépollution</h2>
<p>Un plan de dépollution sera soumis dans les 30 jours suivant le diagnostic et validé par l'autorité environnementale compétente.</p>
<h2>Article 3 – Certification</h2>
<p>Un certificat de réhabilitation sera émis à l'issue des travaux de dépollution.</p></div>`
  },
  {
    code: 'wash2_rapport_qualite_eau',
    name: "Rapport de qualité de l'eau potable",
    category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Document de rapport sur les résultats d'analyses physico-chimiques et bactériologiques de l'eau potable distribuée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'laboratoire', label:"Laboratoire d'analyse", type:'text', required:true},
      {key:'reseau_concerne', label:"Réseau / point d'eau analysé", type:'text', required:true},
      {key:'date_prelevement', label:"Date de prélèvement", type:'date', required:true},
      {key:'resultats_bacterio', label:"Résultats bactériologiques (coliformes, E. coli…)", type:'textarea', required:true},
      {key:'conclusion', label:"Conclusion et recommandations", type:'textarea', required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE QUALITÉ DE L'EAU POTABLE</h1>
<p>Laboratoire : <strong>{{laboratoire}}</strong> | Point d'eau analysé : {{reseau_concerne}} | Date de prélèvement : {{date_prelevement}}</p>
<h2>Résultats bactériologiques</h2>
<p>{{resultats_bacterio}}</p>
<h2>Conclusion et recommandations</h2>
<p>{{conclusion}}</p>
<p><em>Le présent rapport est établi conformément aux normes SODECI / OMS en vigueur.</em></p></div>`
  },
  {
    code: 'wash2_plan_wash_communautaire',
    name: "Plan de développement WASH communautaire",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Document de planification des interventions Eau, Assainissement et Hygiène au niveau d'une communauté villageoise ou péri-urbaine.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'communaute', label:"Nom de la communauté", type:'text', required:true},
      {key:'population', label:"Population bénéficiaire estimée", type:'text', required:true},
      {key:'priorites_eau', label:"Priorités en matière d'eau", type:'textarea', required:true},
      {key:'priorites_assainissement', label:"Priorités en matière d'assainissement", type:'textarea', required:true},
      {key:'date_elaboration', label:"Date d'élaboration du plan", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT WASH COMMUNAUTAIRE</h1>
<p>Communauté : <strong>{{communaute}}</strong> | Population : {{population}} habitants | Date : {{date_elaboration}}</p>
<h2>1. Priorités Eau</h2>
<p>{{priorites_eau}}</p>
<h2>2. Priorités Assainissement</h2>
<p>{{priorites_assainissement}}</p>
<h2>3. Mise en oeuvre</h2>
<p>Un comité WASH local sera désigné pour piloter la mise en oeuvre et le suivi des actions planifiées.</p></div>`
  },
  {
    code: 'wash2_partenariat_onep',
    name: "Accord de partenariat ONEP-collectivité",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord-cadre de partenariat entre l'Office National de l'Eau Potable (ou équivalent) et une collectivité territoriale pour le développement de l'accès à l'eau.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'operateur_national', label:"Opérateur national de l'eau", type:'text', required:true},
      {key:'collectivite', label:"Collectivité territoriale partenaire", type:'text', required:true},
      {key:'objectif_desserte', label:"Objectif de taux de desserte (%)", type:'text', required:true},
      {key:'investissement_prevu', label:"Investissement prévu (FCFA)", type:'text', required:true},
      {key:'date_signature', label:"Date de signature", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ONEP-COLLECTIVITÉ</h1>
<p>Entre <strong>{{operateur_national}}</strong> et la collectivité de <strong>{{collectivite}}</strong>, signé le {{date_signature}}.</p>
<h2>Article 1 – Objectif</h2>
<p>Porter le taux de desserte en eau potable à {{objectif_desserte}}% dans le périmètre de la collectivité.</p>
<h2>Article 2 – Investissement</h2>
<p>Le volume d'investissement prévu est de {{investissement_prevu}} FCFA, cofinancé selon les modalités en annexe.</p>
<h2>Article 3 – Gouvernance</h2>
<p>Un comité de pilotage paritaire se réunira semestriellement pour suivre l'avancement.</p></div>`
  },
  {
    code: 'wash2_surveillance_labo',
    name: "Accord de service de surveillance qualité eau (laboratoire)",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Contrat de surveillance continue de la qualité de l'eau par un laboratoire accrédité, avec rapports périodiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'client', label:"Client / gestionnaire du réseau", type:'text', required:true},
      {key:'laboratoire', label:"Laboratoire accrédité", type:'text', required:true},
      {key:'points_prelevement', label:"Nombre de points de prélèvement", type:'text', required:true},
      {key:'frequence_analyses', label:"Fréquence des analyses", type:'text', required:true},
      {key:'date_debut', label:"Date de début du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SURVEILLANCE QUALITÉ EAU (LABORATOIRE)</h1>
<p>Entre <strong>{{client}}</strong> et le laboratoire <strong>{{laboratoire}}</strong>.</p>
<h2>Article 1 – Périmètre</h2>
<p>Surveillance de {{points_prelevement}} points de prélèvement avec une fréquence de {{frequence_analyses}}.</p>
<h2>Article 2 – Démarrage</h2>
<p>Le contrat prend effet le {{date_debut}} pour une durée d'un an.</p>
<h2>Article 3 – Rapports</h2>
<p>Les rapports d'analyses seront transmis dans un délai de 5 jours ouvrables après chaque campagne.</p></div>`
  },
  {
    code: 'wash2_charte_eau_droit',
    name: "Charte de l'eau comme droit humain fondamental",
    category: 'agro_environnement', price: 2000, priceMax: 6000,
    description: "Document de charte engageant une organisation, une entreprise ou une collectivité à respecter et promouvoir le droit à l'eau et à l'assainissement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'organisation', label:"Organisation signataire", type:'text', required:true},
      {key:'representant', label:"Représentant légal", type:'text', required:true},
      {key:'engagements', label:"Engagements spécifiques", type:'textarea', required:true},
      {key:'date_adoption', label:"Date d'adoption de la charte", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'EAU COMME DROIT HUMAIN FONDAMENTAL</h1>
<p>L'organisation <strong>{{organisation}}</strong>, représentée par <strong>{{representant}}</strong>, adopte la présente charte le {{date_adoption}}.</p>
<h2>Préambule</h2>
<p>Reconnaissant que l'accès à l'eau potable et à l'assainissement est un droit humain fondamental reconnu par la résolution 64/292 de l'Assemblée générale des Nations Unies :</p>
<h2>Engagements</h2>
<p>{{engagements}}</p>
<p><em>La présente charte est adoptée pour une durée indéterminée et fera l'objet d'une révision annuelle.</em></p></div>`
  },

  // ── ENV2 : Environnement / Forêts / Biodiversité (25 templates) ──────────
  {
    code: 'env2_reboisement',
    name: "Accord de service de reboisement de terres dégradées",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat de reboisement et de restauration de terres dégradées par des espèces locales ou exotiques adaptées au contexte ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'donneur_ordre', label:"Donneur d'ordre", type:'text', required:true},
      {key:'prestataire', label:"Prestataire de reboisement", type:'text', required:true},
      {key:'superficie', label:"Superficie à reboiser (ha)", type:'text', required:true},
      {key:'especes', label:"Espèces d'arbres prévues", type:'text', required:true},
      {key:'date_plantation', label:"Date de plantation", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REBOISEMENT DE TERRES DÉGRADÉES</h1>
<p>Entre <strong>{{donneur_ordre}}</strong> et <strong>{{prestataire}}</strong>.</p>
<h2>Article 1 – Périmètre</h2>
<p>Reboisement de {{superficie}} ha avec les espèces suivantes : {{especes}}.</p>
<h2>Article 2 – Calendrier</h2>
<p>La plantation débutera le {{date_plantation}}, en début de saison des pluies.</p>
<h2>Article 3 – Suivi</h2>
<p>Un taux de reprise minimal de 80% est garanti à 12 mois. Des plants de remplacement seront fournis gratuitement en cas de mortalité excessive.</p></div>`
  },
  {
    code: 'env2_gestion_forets_redd',
    name: "Accord de service de gestion durable des forêts (REDD+)",
    category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Accord de gestion forestière durable intégrant les exigences du mécanisme REDD+ pour la réduction des émissions dues à la déforestation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'titulaire', label:"Titulaire du titre forestier", type:'text', required:true},
      {key:'superficie_foret', label:"Superficie de la forêt (ha)", type:'text', required:true},
      {key:'type_foret', label:"Type de forêt (dense, galerie, mangrove…)", type:'text', required:true},
      {key:'organisme_verification', label:"Organisme de vérification REDD+", type:'text', required:true},
      {key:'date_debut', label:"Date de début de l'accord", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DURABLE DES FORÊTS (REDD+)</h1>
<p>Entre <strong>{{titulaire}}</strong> et l'organisme de vérification <strong>{{organisme_verification}}</strong>.</p>
<h2>Article 1 – Forêt concernée</h2>
<p>Forêt de type {{type_foret}}, d'une superficie de {{superficie_foret}} ha.</p>
<h2>Article 2 – Engagements REDD+</h2>
<p>Le titulaire s'engage à réduire la déforestation et à notifier toute perte forestière non planifiée.</p>
<h2>Article 3 – Prise d'effet</h2>
<p>L'accord prend effet le {{date_debut}} pour une durée de 5 ans renouvelable.</p></div>`
  },
  {
    code: 'env2_concession_sodefor',
    name: "Accord de concession forestière durable (SODEFOR)",
    category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Accord de concession entre la SODEFOR et un partenaire privé pour l'exploitation durable d'une forêt classée de l'État.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'concessionnaire', label:"Concessionnaire", type:'text', required:true},
      {key:'foret_classee', label:"Forêt classée concernée", type:'text', required:true},
      {key:'superficie_concession', label:"Superficie de la concession (ha)", type:'text', required:true},
      {key:'duree_concession', label:"Durée de la concession (années)", type:'text', required:true},
      {key:'date_prise_effet', label:"Date de prise d'effet", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCESSION FORESTIÈRE DURABLE (SODEFOR)</h1>
<p>Entre la Société de Développement des Forêts (SODEFOR) et <strong>{{concessionnaire}}</strong>.</p>
<h2>Article 1 – Forêt concédée</h2>
<p>Forêt classée : {{foret_classee}} | Superficie : {{superficie_concession}} ha.</p>
<h2>Article 2 – Durée</h2>
<p>Concession de {{duree_concession}} ans à compter du {{date_prise_effet}}, sous réserve du respect du plan d'aménagement.</p>
<h2>Article 3 – Redevances</h2>
<p>Les redevances annuelles seront fixées par le tableau des tarifs en annexe, indexées sur le cours du bois.</p></div>`
  },
  {
    code: 'env2_certification_fsc',
    name: "Accord de service de certification forestière (FSC, PEFC)",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat d'accompagnement à la certification de gestion forestière responsable selon les normes FSC ou PEFC.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'operateur_forestier', label:"Opérateur forestier", type:'text', required:true},
      {key:'organisme_certif', label:"Organisme de certification", type:'text', required:true},
      {key:'norme', label:"Norme visée (FSC / PEFC)", type:'text', required:true},
      {key:'superficie', label:"Superficie certifiée (ha)", type:'text', required:true},
      {key:'date_audit_initial', label:"Date de l'audit initial", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION FORESTIÈRE (FSC / PEFC)</h1>
<p>Entre <strong>{{operateur_forestier}}</strong> et <strong>{{organisme_certif}}</strong> pour la certification {{norme}}.</p>
<h2>Article 1 – Périmètre</h2>
<p>Superficie soumise à certification : {{superficie}} ha.</p>
<h2>Article 2 – Audit initial</h2>
<p>L'audit d'évaluation initiale se tiendra le {{date_audit_initial}}.</p>
<h2>Article 3 – Suivi</h2>
<p>Des audits de surveillance annuels seront réalisés pendant 5 ans.</p></div>`
  },
  {
    code: 'env2_inventaire_forestier',
    name: "Accord de service d'inventaire forestier national",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat de réalisation d'un inventaire forestier (dendrométrie, biodiversité, stocks de carbone) pour le compte d'une administration ou d'un opérateur forestier.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'maitre_ouvrage', label:"Maître d'ouvrage", type:'text', required:true},
      {key:'bureau_inventaire', label:"Bureau d'études / inventaire", type:'text', required:true},
      {key:'zone_inventaire', label:"Zone d'inventaire", type:'text', required:true},
      {key:'methodologie', label:"Méthodologie (placettes, transects…)", type:'text', required:true},
      {key:'date_terrain', label:"Date de démarrage des travaux de terrain", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INVENTAIRE FORESTIER</h1>
<p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{bureau_inventaire}}</strong>.</p>
<h2>Article 1 – Zone et méthode</h2>
<p>Inventaire de la zone {{zone_inventaire}} selon la méthodologie : {{methodologie}}.</p>
<h2>Article 2 – Terrain</h2>
<p>Les travaux de terrain démarrent le {{date_terrain}}.</p>
<h2>Article 3 – Livrables</h2>
<p>Le rapport final intégrera les données de volume sur pied, de biodiversité et de stock carbone.</p></div>`
  },
  {
    code: 'env2_lutte_braconnage',
    name: "Accord de service de lutte contre le braconnage",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de mise en place de patrouilles anti-braconnage, de sensibilisation et de coopération avec les autorités dans les zones protégées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'aire_protegee', label:"Aire protégée / parc concerné", type:'text', required:true},
      {key:'operateur', label:"Opérateur de protection", type:'text', required:true},
      {key:'nombre_gardes', label:"Nombre de gardes déployés", type:'text', required:true},
      {key:'zone_patrouille', label:"Zone de patrouille", type:'text', required:true},
      {key:'date_debut', label:"Date de début des patrouilles", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LUTTE CONTRE LE BRACONNAGE</h1>
<p>Entre l'administration de <strong>{{aire_protegee}}</strong> et <strong>{{operateur}}</strong>.</p>
<h2>Article 1 – Déploiement</h2>
<p>{{nombre_gardes}} gardes de faune seront déployés dans la zone de {{zone_patrouille}} à compter du {{date_debut}}.</p>
<h2>Article 2 – Protocole</h2>
<p>Les patrouilles seront effectuées selon un protocole validé par le Ministère des Eaux et Forêts.</p>
<h2>Article 3 – Rapportage</h2>
<p>Un rapport mensuel d'activités sera soumis à l'administration compétente.</p></div>`
  },
  {
    code: 'env2_aire_protegee_communautaire',
    name: "Accord de service de création d'aire protégée communautaire",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord pour la création, la délimitation et la gestion participative d'une aire protégée communautaire (APC) avec les populations riveraines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'communaute', label:"Communauté gestionnaire", type:'text', required:true},
      {key:'partenaire_technique', label:"Partenaire technique (ONG, administration)", type:'text', required:true},
      {key:'superficie_apc', label:"Superficie de l'APC (ha)", type:'text', required:true},
      {key:'especes_cibles', label:"Espèces cibles de protection", type:'text', required:true},
      {key:'date_creation', label:"Date officielle de création", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CRÉATION D'AIRE PROTÉGÉE COMMUNAUTAIRE</h1>
<p>Entre la communauté de <strong>{{communaute}}</strong> et <strong>{{partenaire_technique}}</strong>.</p>
<h2>Article 1 – Création</h2>
<p>L'APC d'une superficie de {{superficie_apc}} ha est officiellement créée le {{date_creation}} pour protéger notamment : {{especes_cibles}}.</p>
<h2>Article 2 – Gestion participative</h2>
<p>Un comité de gestion communautaire paritaire sera mis en place dans les 30 jours.</p>
<h2>Article 3 – Plan de gestion</h2>
<p>Un plan de gestion quinquennal sera élaboré et soumis à l'autorité nationale compétente.</p></div>`
  },
  {
    code: 'env2_partenariat_parc',
    name: "Accord de partenariat parc national-collectivité riveraine",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord-cadre de coopération entre un parc national et les collectivités riveraines pour le partage des bénéfices et la gestion des conflits homme-faune.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'parc_national', label:"Parc national", type:'text', required:true},
      {key:'collectivite', label:"Collectivité riveraine", type:'text', required:true},
      {key:'zone_tampon', label:"Zone tampon concernée", type:'text', required:true},
      {key:'mecanisme_partage', label:"Mécanisme de partage des bénéfices", type:'textarea', required:true},
      {key:'date_signature', label:"Date de signature", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PARC NATIONAL-COLLECTIVITÉ RIVERAINE</h1>
<p>Entre <strong>{{parc_national}}</strong> et la collectivité de <strong>{{collectivite}}</strong>, signé le {{date_signature}}.</p>
<h2>Article 1 – Zone tampon</h2>
<p>Le présent accord porte sur la zone tampon de {{zone_tampon}}.</p>
<h2>Article 2 – Partage des bénéfices</h2>
<p>{{mecanisme_partage}}</p>
<h2>Article 3 – Conflits homme-faune</h2>
<p>Un protocole d'alerte rapide et d'indemnisation des dommages agricoles causés par la faune sauvage sera mis en place.</p></div>`
  },
  {
    code: 'env2_suivi_faune',
    name: "Accord de service de suivi de la faune sauvage",
    category: 'agro_environnement', price: 5500, priceMax: 16000,
    description: "Contrat de suivi scientifique des populations d'animaux sauvages par caméras-pièges, transects ou radio-tracking.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client', label:"Client / autorité", type:'text', required:true},
      {key:'bureau_suivi', label:"Bureau de suivi / équipe scientifique", type:'text', required:true},
      {key:'especes_suivies', label:"Espèces suivies", type:'text', required:true},
      {key:'methode', label:"Méthode de suivi (caméras, transects, GPS…)", type:'text', required:true},
      {key:'date_debut', label:"Date de début du programme", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUIVI DE LA FAUNE SAUVAGE</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{bureau_suivi}}</strong>.</p>
<h2>Article 1 – Espèces et méthodes</h2>
<p>Suivi des espèces suivantes : {{especes_suivies}}, par la méthode : {{methode}}.</p>
<h2>Article 2 – Démarrage</h2>
<p>Le programme démarre le {{date_debut}} pour une durée de 12 mois.</p>
<h2>Article 3 – Livrables</h2>
<p>Un rapport semestriel de suivi des populations sera remis au client.</p></div>`
  },
  {
    code: 'env2_commerce_faune_cites',
    name: "Accord de service de commerce de faune légal (CITES)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord encadrant le commerce légal de spécimens de faune et de flore sauvages conformément aux dispositions de la Convention CITES.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'exportateur', label:"Exportateur / vendeur", type:'text', required:true},
      {key:'importateur', label:"Importateur / acheteur", type:'text', required:true},
      {key:'espece_cites', label:"Espèce concernée et annexe CITES", type:'text', required:true},
      {key:'quantite', label:"Quantité / nombre de spécimens", type:'text', required:true},
      {key:'date_transaction', label:"Date de la transaction", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMMERCE DE FAUNE LÉGAL (CITES)</h1>
<p>Entre <strong>{{exportateur}}</strong> et <strong>{{importateur}}</strong>.</p>
<h2>Article 1 – Espèce</h2>
<p>Espèce : {{espece_cites}} | Quantité : {{quantite}} spécimens.</p>
<h2>Article 2 – Conformité CITES</h2>
<p>La transaction, effectuée le {{date_transaction}}, est accompagnée des permis CITES délivrés par les autorités compétentes des pays exportateur et importateur.</p>
<h2>Article 3 – Traçabilité</h2>
<p>Chaque spécimen sera marqué conformément au protocole CITES applicable à l'espèce concernée.</p></div>`
  },
  {
    code: 'env2_eie',
    name: "Accord de service d'étude d'impact environnemental (EIE)",
    category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Contrat de réalisation d'une étude d'impact environnemental et social (EIES) conforme au Code de l'environnement ivoirien et aux normes de l'ANDE.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'promoteur', label:"Promoteur du projet", type:'text', required:true},
      {key:'bureau_eie', label:"Bureau d'études agréé (ANDE)", type:'text', required:true},
      {key:'projet_concerne', label:"Projet soumis à l'EIES", type:'text', required:true},
      {key:'delai_etude', label:"Délai de réalisation (mois)", type:'text', required:true},
      {key:'date_contractuelle', label:"Date de signature du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉTUDE D'IMPACT ENVIRONNEMENTAL (EIE)</h1>
<p>Entre <strong>{{promoteur}}</strong> et le bureau d'études <strong>{{bureau_eie}}</strong>, agréé par l'ANDE.</p>
<h2>Article 1 – Projet</h2>
<p>L'EIES porte sur le projet : {{projet_concerne}}.</p>
<h2>Article 2 – Délai</h2>
<p>L'étude sera réalisée en {{delai_etude}} mois à compter du {{date_contractuelle}}.</p>
<h2>Article 3 – Validation</h2>
<p>Le rapport final sera soumis à l'ANDE pour validation avant tout début de travaux.</p></div>`
  },
  {
    code: 'env2_audit_iso14001',
    name: "Accord de service d'audit environnemental ISO 14001",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat d'audit du système de management environnemental d'une entreprise en vue de la certification ou du maintien de la norme ISO 14001.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'entreprise', label:"Entreprise auditée", type:'text', required:true},
      {key:'organisme_audit', label:"Organisme d'audit", type:'text', required:true},
      {key:'perimetre', label:"Périmètre de l'audit", type:'text', required:true},
      {key:'type_audit', label:"Type d'audit (initial / de surveillance)", type:'text', required:true},
      {key:'date_audit', label:"Date de l'audit", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT ENVIRONNEMENTAL ISO 14001</h1>
<p>Entre <strong>{{entreprise}}</strong> et <strong>{{organisme_audit}}</strong>.</p>
<h2>Article 1 – Périmètre</h2>
<p>Audit {{type_audit}} portant sur {{perimetre}}, prévu le {{date_audit}}.</p>
<h2>Article 2 – Livrables</h2>
<p>Un rapport d'audit détaillé avec les non-conformités majeures et mineures sera remis dans les 15 jours.</p>
<h2>Article 3 – Confidentialité</h2>
<p>Les résultats de l'audit sont strictement confidentiels et ne seront pas divulgués sans accord écrit de l'entreprise.</p></div>`
  },
  {
    code: 'env2_bilan_carbone',
    name: "Accord de service de bilan carbone entreprise",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat de calcul et de vérification du bilan carbone (émissions de GES) d'une entreprise selon la méthode Bilan Carbone ou GHG Protocol.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'entreprise', label:"Entreprise", type:'text', required:true},
      {key:'prestataire', label:"Prestataire Bilan Carbone", type:'text', required:true},
      {key:'annee_reference', label:"Année de référence", type:'text', required:true},
      {key:'perimetre_ges', label:"Périmètre GES (scopes 1, 2, 3)", type:'text', required:true},
      {key:'date_lancement', label:"Date de lancement de la mission", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BILAN CARBONE ENTREPRISE</h1>
<p>Entre <strong>{{entreprise}}</strong> et <strong>{{prestataire}}</strong>.</p>
<h2>Article 1 – Périmètre</h2>
<p>Bilan carbone de l'année {{annee_reference}}, couvrant les {{perimetre_ges}}.</p>
<h2>Article 2 – Lancement</h2>
<p>La mission débute le {{date_lancement}} pour une durée de 3 mois.</p>
<h2>Article 3 – Livrable</h2>
<p>Le rapport final comportera les émissions en tCO2e, les sources majeures et un plan de réduction.</p></div>`
  },
  {
    code: 'env2_compensation_carbone',
    name: "Accord de service de compensation carbone (VCS/Gold Standard)",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Accord d'achat et de transfert de crédits carbone certifiés VCS ou Gold Standard pour la compensation des émissions résiduelles d'une entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'acheteur', label:"Entreprise acheteuse de crédits", type:'text', required:true},
      {key:'vendeur', label:"Vendeur / porteur de projet carbone", type:'text', required:true},
      {key:'standard', label:"Standard (VCS / Gold Standard / autre)", type:'text', required:true},
      {key:'quantite_credits', label:"Quantité de crédits (tCO2e)", type:'text', required:true},
      {key:'date_transaction', label:"Date de la transaction", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPENSATION CARBONE (VCS / GOLD STANDARD)</h1>
<p>Entre <strong>{{acheteur}}</strong> et <strong>{{vendeur}}</strong>.</p>
<h2>Article 1 – Crédits carbone</h2>
<p>Transfert de {{quantite_credits}} tCO2e certifiées {{standard}} en date du {{date_transaction}}.</p>
<h2>Article 2 – Registre</h2>
<p>Les crédits seront retirés (retired) dans le registre officiel du standard concerné au nom de l'acheteur.</p>
<h2>Article 3 – Certificat</h2>
<p>Un certificat de compensation sera remis à l'acheteur dans les 10 jours ouvrables.</p></div>`
  },
  {
    code: 'env2_redd_national',
    name: "Accord de service de mécanismes REDD+ national",
    category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Accord entre l'État ou une entité nationale et un partenaire pour la mise en oeuvre de mécanismes REDD+ à l'échelle nationale ou sous-nationale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entite_nationale', label:"Entité nationale responsable", type:'text', required:true},
      {key:'partenaire', label:"Partenaire (bailleur, ONG, secteur privé)", type:'text', required:true},
      {key:'zone_juridiction', label:"Zone de juridiction REDD+", type:'text', required:true},
      {key:'niveau_reference', label:"Niveau d'émissions de référence (tCO2e/an)", type:'text', required:true},
      {key:'date_accord', label:"Date de l'accord", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MÉCANISMES REDD+ NATIONAL</h1>
<p>Entre <strong>{{entite_nationale}}</strong> et <strong>{{partenaire}}</strong>, signé le {{date_accord}}.</p>
<h2>Article 1 – Zone</h2>
<p>Le mécanisme REDD+ s'applique à la zone de juridiction : {{zone_juridiction}}.</p>
<h2>Article 2 – Niveau de référence</h2>
<p>Le niveau d'émissions de référence est fixé à {{niveau_reference}} tCO2e/an conformément au niveau de référence national approuvé.</p>
<h2>Article 3 – Gouvernance</h2>
<p>Un comité national REDD+ assurera la supervision de la mise en oeuvre et le suivi MRV.</p></div>`
  },
  {
    code: 'env2_zones_humides',
    name: "Accord de service de gestion des zones humides (mangroves)",
    category: 'agro_environnement', price: 5500, priceMax: 16000,
    description: "Accord de conservation et de gestion durable des zones humides côtières, notamment les mangroves et les lagunes du littoral ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'gestionnaire', label:"Gestionnaire / ONG", type:'text', required:true},
      {key:'site_ramsar', label:"Site / zone humide concernée", type:'text', required:true},
      {key:'superficie_zh', label:"Superficie de la zone humide (ha)", type:'text', required:true},
      {key:'actions_conservation', label:"Actions de conservation prévues", type:'textarea', required:true},
      {key:'date_debut', label:"Date de début du programme", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES ZONES HUMIDES (MANGROVES)</h1>
<p>Entre les parties prenantes et <strong>{{gestionnaire}}</strong> pour la zone humide de {{site_ramsar}} ({{superficie_zh}} ha).</p>
<h2>Article 1 – Actions de conservation</h2>
<p>{{actions_conservation}}</p>
<h2>Article 2 – Démarrage</h2>
<p>Le programme débute le {{date_debut}} pour une durée de 3 ans.</p>
<h2>Article 3 – Convention Ramsar</h2>
<p>Les actions seront menées conformément aux lignes directrices de la Convention de Ramsar sur les zones humides.</p></div>`
  },
  {
    code: 'env2_protection_littoral',
    name: "Accord de service de protection du littoral marin",
    category: 'agro_environnement', price: 5500, priceMax: 16000,
    description: "Accord pour la protection, la restauration et la gestion durable du littoral marin ivoirien contre l'érosion côtière et la pollution marine.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'autorite', label:"Autorité compétente (Ministère / commune)", type:'text', required:true},
      {key:'prestataire', label:"Prestataire / bureau d'études côtier", type:'text', required:true},
      {key:'secteur_littoral', label:"Secteur du littoral concerné", type:'text', required:true},
      {key:'type_ouvrage', label:"Type d'ouvrage (enrochement, digue…)", type:'text', required:true},
      {key:'date_etude', label:"Date de démarrage de l'étude", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PROTECTION DU LITTORAL MARIN</h1>
<p>Entre <strong>{{autorite}}</strong> et <strong>{{prestataire}}</strong> pour le secteur littoral de {{secteur_littoral}}.</p>
<h2>Article 1 – Intervention</h2>
<p>Type d'ouvrage prévu : {{type_ouvrage}}.</p>
<h2>Article 2 – Étude</h2>
<p>L'étude de faisabilité démarre le {{date_etude}} et intégrera une analyse de l'érosion côtière.</p>
<h2>Article 3 – Conformité</h2>
<p>Les travaux respecteront le Schéma Directeur de Protection du Littoral et les normes BNETD.</p></div>`
  },
  {
    code: 'env2_especes_envahissantes',
    name: "Accord de service de gestion des espèces envahissantes",
    category: 'agro_environnement', price: 4500, priceMax: 13000,
    description: "Contrat de lutte contre les espèces végétales et animales envahissantes menaçant la biodiversité locale (ex : jacinthe d'eau, Chromolaena odorata).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'donneur_ordre', label:"Donneur d'ordre", type:'text', required:true},
      {key:'prestataire', label:"Prestataire", type:'text', required:true},
      {key:'espece_ciblee', label:"Espèce envahissante ciblée", type:'text', required:true},
      {key:'zone_traitement', label:"Zone de traitement", type:'text', required:true},
      {key:'date_debut', label:"Date de début des opérations", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES ESPÈCES ENVAHISSANTES</h1>
<p>Entre <strong>{{donneur_ordre}}</strong> et <strong>{{prestataire}}</strong>.</p>
<h2>Article 1 – Espèce ciblée</h2>
<p>L'espèce envahissante ciblée est {{espece_ciblee}}, dans la zone {{zone_traitement}}.</p>
<h2>Article 2 – Démarrage</h2>
<p>Les opérations de contrôle débutent le {{date_debut}}.</p>
<h2>Article 3 – Méthodes</h2>
<p>Les méthodes de contrôle (mécanique, biologique, chimique) seront préalablement validées par l'autorité environnementale compétente.</p></div>`
  },
  {
    code: 'env2_restauration_riviere',
    name: "Accord de service de restauration écologique de rivière",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Accord de restauration du lit, des berges et de la biodiversité aquatique d'une rivière dégradée par des activités anthropiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'maitre_ouvrage', label:"Maître d'ouvrage", type:'text', required:true},
      {key:'prestataire', label:"Bureau de restauration écologique", type:'text', required:true},
      {key:'cours_eau', label:"Cours d'eau concerné", type:'text', required:true},
      {key:'lineaire', label:"Linéaire à restaurer (km)", type:'text', required:true},
      {key:'date_debut_travaux', label:"Date de début des travaux", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RESTAURATION ÉCOLOGIQUE DE RIVIÈRE</h1>
<p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{prestataire}}</strong> pour le cours d'eau {{cours_eau}}.</p>
<h2>Article 1 – Périmètre</h2>
<p>Restauration de {{lineaire}} km de berges et du lit mineur.</p>
<h2>Article 2 – Travaux</h2>
<p>Les travaux démarrent le {{date_debut_travaux}} et comprennent la végétalisation des berges, la renaturation du lit et la réintroduction d'espèces aquatiques.</p>
<h2>Article 3 – Suivi</h2>
<p>Un suivi de la qualité de l'eau et de la biodiversité aquatique sera effectué pendant 3 ans.</p></div>`
  },
  {
    code: 'env2_qualite_air',
    name: "Accord de service de suivi de la qualité de l'air",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat de mise en place et d'exploitation d'un réseau de surveillance de la qualité de l'air ambiant dans une zone industrielle ou urbaine.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client', label:"Client / autorité compétente", type:'text', required:true},
      {key:'prestataire', label:"Prestataire de surveillance", type:'text', required:true},
      {key:'nombre_stations', label:"Nombre de stations de mesure", type:'text', required:true},
      {key:'polluants_surveilles', label:"Polluants surveillés (PM2.5, NO2, SO2…)", type:'text', required:true},
      {key:'date_installation', label:"Date d'installation des équipements", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUIVI DE LA QUALITÉ DE L'AIR</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{prestataire}}</strong>.</p>
<h2>Article 1 – Réseau de surveillance</h2>
<p>Déploiement de {{nombre_stations}} stations de mesure pour les polluants suivants : {{polluants_surveilles}}.</p>
<h2>Article 2 – Installation</h2>
<p>Les équipements seront installés le {{date_installation}}.</p>
<h2>Article 3 – Données</h2>
<p>Les données seront transmises en temps réel sur une plateforme en ligne accessible au client et aux autorités.</p></div>`
  },
  {
    code: 'env2_rapport_rse',
    name: "Rapport de performance environnementale entreprise (RSE)",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Document de rapport annuel sur la performance environnementale et les engagements RSE d'une entreprise opérant en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'entreprise', label:"Entreprise", type:'text', required:true},
      {key:'annee_rapport', label:"Année du rapport", type:'text', required:true},
      {key:'indicateurs_env', label:"Principaux indicateurs environnementaux", type:'textarea', required:true},
      {key:'engagements_rse', label:"Engagements RSE phares", type:'textarea', required:true},
      {key:'date_publication', label:"Date de publication", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE ENVIRONNEMENTALE (RSE) {{annee_rapport}}</h1>
<p>Entreprise : <strong>{{entreprise}}</strong> | Publié le : {{date_publication}}</p>
<h2>1. Indicateurs environnementaux</h2>
<p>{{indicateurs_env}}</p>
<h2>2. Engagements RSE</h2>
<p>{{engagements_rse}}</p>
<p><em>Le présent rapport est établi conformément aux lignes directrices GRI et aux exigences de la loi PACTE sur le reporting extra-financier.</em></p></div>`
  },
  {
    code: 'env2_pges',
    name: "Plan de gestion environnementale et sociale (PGES)",
    category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Document de plan de gestion environnementale et sociale (PGES) requis pour tout projet soumis à une EIES en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'projet', label:"Intitulé du projet", type:'text', required:true},
      {key:'promoteur', label:"Promoteur", type:'text', required:true},
      {key:'impacts_identifies', label:"Impacts environnementaux et sociaux identifiés", type:'textarea', required:true},
      {key:'mesures_attenuation', label:"Mesures d'atténuation retenues", type:'textarea', required:true},
      {key:'date_pges', label:"Date d'élaboration du PGES", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE GESTION ENVIRONNEMENTALE ET SOCIALE (PGES)</h1>
<p>Projet : <strong>{{projet}}</strong> | Promoteur : <strong>{{promoteur}}</strong> | Date : {{date_pges}}</p>
<h2>1. Impacts identifiés</h2>
<p>{{impacts_identifies}}</p>
<h2>2. Mesures d'atténuation</h2>
<p>{{mesures_attenuation}}</p>
<h2>3. Suivi et rapportage</h2>
<p>Un rapport de mise en oeuvre du PGES sera soumis à l'ANDE semestriellement pendant toute la durée du projet.</p></div>`
  },
  {
    code: 'env2_partenariat_oipr',
    name: "Accord de partenariat entreprise-OIPR (Office des parcs)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de partenariat entre une entreprise privée et l'Office Ivoirien des Parcs et Réserves (OIPR) pour le soutien à la conservation de la biodiversité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'entreprise', label:"Entreprise partenaire", type:'text', required:true},
      {key:'contribution_annuelle', label:"Contribution annuelle (FCFA)", type:'text', required:true},
      {key:'parc_beneficiaire', label:"Parc / réserve bénéficiaire", type:'text', required:true},
      {key:'actions_soutenues', label:"Actions soutenues par le partenariat", type:'textarea', required:true},
      {key:'date_signature', label:"Date de signature", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ENTREPRISE-OIPR</h1>
<p>Entre <strong>{{entreprise}}</strong> et l'Office Ivoirien des Parcs et Réserves (OIPR), signé le {{date_signature}}.</p>
<h2>Article 1 – Contribution</h2>
<p>L'entreprise s'engage à verser {{contribution_annuelle}} FCFA par an au profit de {{parc_beneficiaire}}.</p>
<h2>Article 2 – Actions soutenues</h2>
<p>{{actions_soutenues}}</p>
<h2>Article 3 – Communication</h2>
<p>L'entreprise pourra mentionner ce partenariat dans sa communication RSE, sous réserve de validation par l'OIPR.</p></div>`
  },
  {
    code: 'env2_financement_vert',
    name: "Accord de financement vert (green bond, green loan)",
    category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Accord de financement vert (obligation verte ou prêt vert) pour des projets environnementaux conformes aux Green Bond Principles ou aux Green Loan Principles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'emetteur', label:"Émetteur / emprunteur", type:'text', required:true},
      {key:'investisseur', label:"Investisseur / prêteur", type:'text', required:true},
      {key:'montant', label:"Montant du financement (FCFA ou USD)", type:'text', required:true},
      {key:'instrument', label:"Instrument (green bond / green loan)", type:'text', required:true},
      {key:'date_emission', label:"Date d'émission / de signature", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT VERT (GREEN BOND / GREEN LOAN)</h1>
<p>Entre <strong>{{emetteur}}</strong> et <strong>{{investisseur}}</strong>.</p>
<h2>Article 1 – Instrument et montant</h2>
<p>{{instrument}} d'un montant de {{montant}}, émis le {{date_emission}}.</p>
<h2>Article 2 – Utilisation des fonds</h2>
<p>Les fonds seront exclusivement affectés à des projets verts éligibles conformément aux Green Bond Principles de l'ICMA ou aux Green Loan Principles de la LMA.</p>
<h2>Article 3 – Rapportage</h2>
<p>Un rapport annuel d'allocation et d'impact environnemental sera publié pendant toute la durée du financement.</p></div>`
  },
  {
    code: 'env2_charte_biodiversite',
    name: "Charte de l'entreprise pour la biodiversité",
    category: 'agro_environnement', price: 2500, priceMax: 7500,
    description: "Document de charte par laquelle une entreprise s'engage à intégrer la préservation de la biodiversité dans ses pratiques et sa stratégie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'entreprise', label:"Entreprise signataire", type:'text', required:true},
      {key:'dirigeant', label:"Nom du dirigeant", type:'text', required:true},
      {key:'engagements_biodiversite', label:"Engagements pour la biodiversité", type:'textarea', required:true},
      {key:'date_adoption', label:"Date d'adoption de la charte", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ENTREPRISE POUR LA BIODIVERSITÉ</h1>
<p>L'entreprise <strong>{{entreprise}}</strong>, représentée par <strong>{{dirigeant}}</strong>, adopte la présente charte le {{date_adoption}}.</p>
<h2>Préambule</h2>
<p>Consciente que la biodiversité est un patrimoine commun de l'humanité et une condition de la durabilité de ses activités, notre entreprise s'engage à :</p>
<h2>Engagements</h2>
<p>{{engagements_biodiversite}}</p>
<h2>Révision</h2>
<p>La présente charte sera révisée annuellement et ses résultats publiés dans le rapport RSE de l'entreprise.</p></div>`
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
  console.log(`Batch 67b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
