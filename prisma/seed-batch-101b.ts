import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates Climatisation / Froid industriel ───
  {
    code: 'clim_split_residentiel',
    name: "Accord de service d'installation de climatisation split résidentiel",
    category: 'btp_construction',
    price: 3000,
    priceMax: 9000,
    description: "Contrat encadrant l'installation d'un système de climatisation split pour usage résidentiel, incluant fourniture, pose et mise en service.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_installation', label: "Adresse d'installation", type: 'text', required: true },
      { key: 'modele_unite', label: "Modèle de l'unité split", type: 'text', required: true },
      { key: 'date_intervention', label: "Date d'intervention", type: 'date', required: true },
      { key: 'conditions_particulieres', label: "Conditions particulières", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION CLIMATISATION SPLIT RÉSIDENTIEL</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>, pour l'installation à l'adresse : {{adresse_installation}}.</p>
<h2>1. Objet</h2><p>Le présent accord a pour objet la fourniture et l'installation d'un système de climatisation split modèle <strong>{{modele_unite}}</strong> conformément aux normes OHADA et aux prescriptions techniques en vigueur en Côte d'Ivoire.</p>
<h2>2. Date d'intervention</h2><p>Les travaux sont prévus le {{date_intervention}}.</p>
<h2>3. Conditions particulières</h2><p>{{conditions_particulieres}}</p>
<h2>4. Garanties</h2><p>Le prestataire garantit les travaux pour une durée de douze (12) mois à compter de la réception.</p></div>`,
  },
  {
    code: 'clim_vrf_immeuble',
    name: "Accord de service d'installation de VRF/VRV pour immeuble",
    category: 'btp_construction',
    price: 8000,
    priceMax: 30000,
    description: "Contrat d'installation d'un système VRF/VRV multi-zones pour immeuble de bureaux ou résidentiel collectif.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'adresse_immeuble', label: "Adresse de l'immeuble", type: 'text', required: true },
      { key: 'nombre_zones', label: "Nombre de zones climatisées", type: 'text', required: true },
      { key: 'date_debut_travaux', label: "Date de début des travaux", type: 'date', required: true },
      { key: 'delai_execution', label: "Délai d'exécution (semaines)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION SYSTÈME VRF/VRV IMMEUBLE</h1>
<p>Conclu entre le prestataire et <strong>{{maitre_ouvrage}}</strong> pour l'immeuble situé à {{adresse_immeuble}}.</p>
<h2>1. Objet</h2><p>Installation d'un système VRF/VRV couvrant {{nombre_zones}} zones climatisées, conformément au cahier des charges technique.</p>
<h2>2. Planning</h2><p>Début des travaux : {{date_debut_travaux}}. Délai d'exécution : {{delai_execution}} semaines.</p>
<h2>3. Réception</h2><p>La réception provisoire interviendra à l'issue des essais de mise en service concluants.</p></div>`,
  },
  {
    code: 'clim_centrale_bureau',
    name: "Accord de service d'installation de climatisation centrale pour bureau",
    category: 'btp_construction',
    price: 6000,
    priceMax: 22000,
    description: "Contrat d'installation d'un système de climatisation centrale pour locaux de bureaux, incluant centrales de traitement d'air et réseaux de distribution.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'entreprise_cliente', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'superficie_traitee', label: "Superficie traitée (m²)", type: 'text', required: true },
      { key: 'type_centrale', label: "Type de centrale de traitement d'air", type: 'text', required: true },
      { key: 'date_demarrage', label: "Date de démarrage", type: 'date', required: true },
      { key: 'observations', label: "Observations techniques", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CLIMATISATION CENTRALE BUREAUX</h1>
<p>Entre le prestataire et <strong>{{entreprise_cliente}}</strong> pour la climatisation centrale de {{superficie_traitee}} m².</p>
<h2>1. Description des travaux</h2><p>Fourniture et installation d'une centrale de traitement d'air de type {{type_centrale}}, réseaux de gaines, diffuseurs et régulation.</p>
<h2>2. Démarrage</h2><p>Travaux débutant le {{date_demarrage}}.</p>
<h2>3. Observations</h2><p>{{observations}}</p></div>`,
  },
  {
    code: 'clim_maintenance_contrat',
    name: "Accord de service de maintenance contrat climatisation",
    category: 'btp_construction',
    price: 2000,
    priceMax: 8000,
    description: "Contrat de maintenance préventive et curative d'installations de climatisation, avec visites périodiques et interventions d'urgence.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'equipements_couverts', label: "Équipements couverts", type: 'textarea', required: true },
      { key: 'frequence_visites', label: "Fréquence des visites préventives", type: 'text', required: true },
      { key: 'date_debut_contrat', label: "Date de début du contrat", type: 'date', required: true },
      { key: 'duree_contrat', label: "Durée du contrat (mois)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MAINTENANCE CLIMATISATION</h1>
<p>Conclu entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Équipements couverts</h2><p>{{equipements_couverts}}</p>
<h2>2. Fréquence des interventions</h2><p>Visites préventives : {{frequence_visites}}. Interventions curatives sous 24 heures ouvrées.</p>
<h2>3. Durée</h2><p>Contrat valable {{duree_contrat}} mois à compter du {{date_debut_contrat}}, renouvelable par tacite reconduction.</p></div>`,
  },
  {
    code: 'clim_recharge_fluide',
    name: "Accord de service de recharge de fluide frigorigène",
    category: 'btp_construction',
    price: 2000,
    priceMax: 6000,
    description: "Contrat de prestation pour la recharge en fluide frigorigène conforme au protocole de Montréal, avec contrôle d'étanchéité préalable.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'type_fluide', label: "Type de fluide frigorigène", type: 'text', required: true },
      { key: 'quantite_kg', label: "Quantité rechargée (kg)", type: 'text', required: true },
      { key: 'date_intervention', label: "Date d'intervention", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RECHARGE FLUIDE FRIGORIGÈNE</h1>
<p>Prestation réalisée pour <strong>{{client_nom}}</strong> le {{date_intervention}}.</p>
<h2>1. Fluide utilisé</h2><p>Type : {{type_fluide}} — Quantité : {{quantite_kg}} kg. Conformité protocole de Montréal attestée.</p>
<h2>2. Contrôle d'étanchéité</h2><p>Un test d'étanchéité est effectué avant et après la recharge. Tout résultat positif fait l'objet d'un rapport de fuite.</p>
<h2>3. Responsabilités</h2><p>Le prestataire est certifié pour la manipulation des fluides frigorigènes conformément à la réglementation en vigueur.</p></div>`,
  },
  {
    code: 'clim_chambre_froide_alim',
    name: "Accord de service d'installation de chambre froide alimentaire",
    category: 'btp_construction',
    price: 5000,
    priceMax: 18000,
    description: "Contrat d'installation d'une chambre froide pour la conservation de denrées alimentaires, conformément aux normes sanitaires OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'volume_chambre', label: "Volume de la chambre (m³)", type: 'text', required: true },
      { key: 'temperature_cible', label: "Température de consigne (°C)", type: 'text', required: true },
      { key: 'adresse_installation', label: "Adresse d'installation", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION CHAMBRE FROIDE ALIMENTAIRE</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>, pour une installation à {{adresse_installation}}.</p>
<h2>1. Caractéristiques</h2><p>Volume : {{volume_chambre}} m³ — Température de consigne : {{temperature_cible}} °C.</p>
<h2>2. Normes sanitaires</h2><p>L'installation respecte les exigences d'hygiène alimentaire en vigueur et les normes OHADA applicables.</p>
<h2>3. Livraison</h2><p>Mise en service prévue le {{date_livraison}} après réception positive des essais thermiques.</p></div>`,
  },
  {
    code: 'clim_chambre_froide_pharma',
    name: "Accord de service d'installation de chambre froide pharmaceutique",
    category: 'btp_construction',
    price: 7000,
    priceMax: 25000,
    description: "Contrat d'installation d'une chambre froide dédiée au stockage de médicaments et vaccins, avec système de surveillance et alarme.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'etablissement', label: "Établissement pharmaceutique", type: 'text', required: true },
      { key: 'plage_temperature', label: "Plage de température requise (°C)", type: 'text', required: true },
      { key: 'surface_chambre', label: "Surface de la chambre (m²)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début des travaux", type: 'date', required: true },
      { key: 'exigences_speciales', label: "Exigences réglementaires spéciales", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CHAMBRE FROIDE PHARMACEUTIQUE</h1>
<p>Conclu entre le prestataire et <strong>{{etablissement}}</strong>.</p>
<h2>1. Spécifications techniques</h2><p>Surface : {{surface_chambre}} m² — Plage de température : {{plage_temperature}} °C. Système de surveillance continue avec alarme déportée.</p>
<h2>2. Conformité</h2><p>{{exigences_speciales}}</p>
<h2>3. Démarrage</h2><p>Travaux débutant le {{date_debut}}. Qualification IQ/OQ/PQ incluse.</p></div>`,
  },
  {
    code: 'clim_congelateur_industriel',
    name: "Accord de service d'installation de congélateur industriel",
    category: 'btp_construction',
    price: 4000,
    priceMax: 14000,
    description: "Contrat d'installation d'un congélateur industriel pour unités de transformation alimentaire ou entrepôts frigorifiques.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'capacite_congelateur', label: "Capacité du congélateur (tonnes)", type: 'text', required: true },
      { key: 'temperature_stockage', label: "Température de stockage (°C)", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION CONGÉLATEUR INDUSTRIEL</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Caractéristiques</h2><p>Capacité : {{capacite_congelateur}} tonnes — Température : {{temperature_stockage}} °C.</p>
<h2>2. Installation</h2><p>Pose prévue le {{date_installation}}. Essais de descente en température inclus dans la prestation.</p>
<h2>3. Garantie</h2><p>Garantie constructeur et garantie main-d'œuvre de 12 mois.</p></div>`,
  },
  {
    code: 'clim_groupe_frigorifique',
    name: "Accord de service d'installation de groupe frigorifique",
    category: 'btp_construction',
    price: 6000,
    priceMax: 20000,
    description: "Contrat d'installation d'un groupe frigorifique pour production de froid dans les industries agroalimentaires et logistiques.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'puissance_groupe', label: "Puissance du groupe (kW)", type: 'text', required: true },
      { key: 'fluide_utilise', label: "Fluide frigorigène utilisé", type: 'text', required: true },
      { key: 'date_mise_en_service', label: "Date de mise en service", type: 'date', required: true },
      { key: 'localisation', label: "Localisation du groupe", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION GROUPE FRIGORIFIQUE</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong> pour un groupe situé à {{localisation}}.</p>
<h2>1. Spécifications</h2><p>Puissance : {{puissance_groupe}} kW — Fluide : {{fluide_utilise}}.</p>
<h2>2. Mise en service</h2><p>Date prévue : {{date_mise_en_service}}. Essais de performance inclus.</p></div>`,
  },
  {
    code: 'clim_maintenance_chambre_froide',
    name: "Accord de service de maintenance chambre froide",
    category: 'btp_construction',
    price: 2000,
    priceMax: 7000,
    description: "Contrat annuel de maintenance préventive et curative des chambres froides, avec contrôles périodiques et interventions d'urgence 24h/24.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'nombre_chambres', label: "Nombre de chambres froides", type: 'text', required: true },
      { key: 'frequence_visites', label: "Fréquence des visites (par an)", type: 'text', required: true },
      { key: 'date_debut_contrat', label: "Date de début du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MAINTENANCE — CHAMBRES FROIDES</h1>
<p>Conclu entre le prestataire et <strong>{{client_nom}}</strong> pour {{nombre_chambres}} chambre(s) froide(s).</p>
<h2>1. Visites préventives</h2><p>{{frequence_visites}} visites par an à compter du {{date_debut_contrat}}.</p>
<h2>2. Astreinte</h2><p>Intervention curative disponible 24h/24 et 7j/7. Délai de réponse garanti : 4 heures.</p></div>`,
  },
  {
    code: 'clim_camion_frigo',
    name: "Accord de service de réfrigération de transport — camion frigo",
    category: 'btp_construction',
    price: 3000,
    priceMax: 10000,
    description: "Contrat d'installation et de maintenance d'unités de réfrigération sur camions frigorifiques pour le transport de marchandises sous température dirigée.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'transporteur', label: "Nom du transporteur", type: 'text', required: true },
      { key: 'immatriculation', label: "Immatriculation du véhicule", type: 'text', required: true },
      { key: 'modele_groupe', label: "Modèle du groupe frigorifique", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
      { key: 'type_marchandises', label: "Type de marchandises transportées", type: 'text', required: false },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RÉFRIGÉRATION TRANSPORT CAMION FRIGO</h1>
<p>Entre le prestataire et <strong>{{transporteur}}</strong> pour le véhicule immatriculé {{immatriculation}}.</p>
<h2>1. Équipement</h2><p>Installation du groupe frigorifique modèle {{modele_groupe}} le {{date_installation}}.</p>
<h2>2. Usage</h2><p>Marchandises : {{type_marchandises}}. Conformité ATP requise pour transport international.</p></div>`,
  },
  {
    code: 'clim_tour_refroidissement',
    name: "Accord de service d'installation de tour de refroidissement",
    category: 'btp_construction',
    price: 5000,
    priceMax: 16000,
    description: "Contrat d'installation d'une tour de refroidissement (cooling tower) pour process industriel ou bâtiment tertiaire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'debit_nominal', label: "Débit nominal (m³/h)", type: 'text', required: true },
      { key: 'puissance_dissipee', label: "Puissance à dissiper (kW)", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION TOUR DE REFROIDISSEMENT</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Caractéristiques</h2><p>Débit nominal : {{debit_nominal}} m³/h — Puissance dissipée : {{puissance_dissipee}} kW.</p>
<h2>2. Mise en service</h2><p>Installation le {{date_installation}} avec essais hydrauliques et équilibrage inclus.</p>
<h2>3. Traitement de l'eau</h2><p>Protocole de traitement Legionella inclus dans la mise en service.</p></div>`,
  },
  {
    code: 'clim_pompe_chaleur',
    name: "Accord de service d'installation de pompe à chaleur",
    category: 'btp_construction',
    price: 4000,
    priceMax: 14000,
    description: "Contrat d'installation de pompe à chaleur air-eau ou géothermique pour chauffage et rafraîchissement de bâtiments.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'type_pac', label: "Type de PAC (air-eau, géothermique...)", type: 'text', required: true },
      { key: 'cop_garanti', label: "COP garanti", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
      { key: 'surface_chauffee', label: "Surface chauffée (m²)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION POMPE À CHALEUR</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Équipement</h2><p>Type : {{type_pac}} — COP garanti : {{cop_garanti}} — Surface : {{surface_chauffee}} m².</p>
<h2>2. Installation</h2><p>Travaux le {{date_installation}}. Paramétrage de régulation inclus.</p></div>`,
  },
  {
    code: 'clim_deshumidificateur_indus',
    name: "Accord de service d'installation de déshumidificateur industriel",
    category: 'btp_construction',
    price: 3000,
    priceMax: 10000,
    description: "Contrat d'installation de déshumidificateurs industriels pour entrepôts, salles propres ou process de fabrication.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'capacite_extraction', label: "Capacité d'extraction (L/h)", type: 'text', required: true },
      { key: 'humidite_cible', label: "Taux d'humidité cible (%HR)", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION DÉSHUMIDIFICATEUR INDUSTRIEL</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Spécifications</h2><p>Capacité : {{capacite_extraction}} L/h — Humidité cible : {{humidite_cible}} %HR.</p>
<h2>2. Installation</h2><p>Pose prévue le {{date_installation}}. Réglage et calibrage inclus.</p></div>`,
  },
  {
    code: 'clim_audit_energetique_hvac',
    name: "Accord de service d'audit énergétique HVAC",
    category: 'btp_construction',
    price: 4000,
    priceMax: 12000,
    description: "Contrat d'audit énergétique des installations HVAC pour identifier les gisements d'économies et optimiser les consommations.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'surface_auditee', label: "Surface auditée (m²)", type: 'text', required: true },
      { key: 'date_audit', label: "Date de l'audit", type: 'date', required: true },
      { key: 'objectif_economies', label: "Objectif d'économies d'énergie (%)", type: 'text', required: false },
      { key: 'perimetre_audit', label: "Périmètre de l'audit", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — AUDIT ÉNERGÉTIQUE HVAC</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong> pour une surface de {{surface_auditee}} m².</p>
<h2>1. Périmètre</h2><p>{{perimetre_audit}}</p>
<h2>2. Date de réalisation</h2><p>Audit prévu le {{date_audit}}. Rapport remis sous 15 jours ouvrés.</p>
<h2>3. Objectifs</h2><p>Économies visées : {{objectif_economies}} %. Plan d'action chiffré inclus dans le rapport.</p></div>`,
  },
  {
    code: 'clim_detection_fuite_montreal',
    name: "Accord de service de détection de fuite de fluide — protocole Montréal",
    category: 'btp_construction',
    price: 2000,
    priceMax: 6000,
    description: "Contrat de détection et de traçabilité des fuites de fluides frigorigènes conformément au protocole de Montréal et aux réglementations nationales.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'installations_concernees', label: "Installations concernées", type: 'textarea', required: true },
      { key: 'date_controle', label: "Date de contrôle", type: 'date', required: true },
      { key: 'technicien_certifie', label: "Nom du technicien certifié", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DÉTECTION DE FUITE FLUIDE FRIGORIGÈNE</h1>
<p>Prestation réalisée pour <strong>{{client_nom}}</strong> par le technicien certifié {{technicien_certifie}} le {{date_controle}}.</p>
<h2>1. Installations contrôlées</h2><p>{{installations_concernees}}</p>
<h2>2. Protocole</h2><p>Contrôle réalisé conformément au protocole de Montréal. Détecteur électronique homologué utilisé. Résultats consignés dans le registre de suivi.</p></div>`,
  },
  {
    code: 'clim_vmc_installation',
    name: "Accord de service d'installation de ventilation mécanique contrôlée (VMC)",
    category: 'btp_construction',
    price: 2500,
    priceMax: 8000,
    description: "Contrat d'installation de système VMC simple flux ou double flux pour renouvellement d'air dans les bâtiments résidentiels ou tertiaires.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'type_vmc', label: "Type de VMC (simple flux / double flux)", type: 'text', required: true },
      { key: 'nombre_pieces', label: "Nombre de pièces desservies", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION VMC</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Système installé</h2><p>VMC {{type_vmc}} desservant {{nombre_pieces}} pièce(s).</p>
<h2>2. Date</h2><p>Installation le {{date_installation}} avec équilibrage des débits et notice remise au client.</p></div>`,
  },
  {
    code: 'clim_hotte_extraction',
    name: "Accord de service d'installation de hotte et extraction cuisine",
    category: 'btp_construction',
    price: 2000,
    priceMax: 7000,
    description: "Contrat d'installation de hottes professionnelles et de systèmes d'extraction pour cuisines collectives, restaurants et unités industrielles.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'type_hotte', label: "Type de hotte (murale, îlot...)", type: 'text', required: true },
      { key: 'debit_extraction', label: "Débit d'extraction (m³/h)", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION HOTTE ET EXTRACTION CUISINE</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Équipement</h2><p>Hotte de type {{type_hotte}} avec débit d'extraction de {{debit_extraction}} m³/h.</p>
<h2>2. Installation</h2><p>Travaux le {{date_installation}}. Réseau de gaines inox et filtres à graisse inclus.</p></div>`,
  },
  {
    code: 'clim_purificateur_air',
    name: "Accord de service d'installation de purificateur d'air",
    category: 'btp_construction',
    price: 2000,
    priceMax: 6000,
    description: "Contrat d'installation de purificateurs d'air HEPA/UV pour bureaux, établissements de santé ou espaces publics.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'technologie_filtration', label: "Technologie de filtration", type: 'text', required: true },
      { key: 'nombre_unites', label: "Nombre d'unités installées", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION PURIFICATEUR D'AIR</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Équipements</h2><p>{{nombre_unites}} purificateur(s) à technologie {{technologie_filtration}} installé(s).</p>
<h2>2. Date</h2><p>Installation le {{date_installation}}. Test de performance après mise en service.</p></div>`,
  },
  {
    code: 'clim_rideau_air',
    name: "Accord de service d'installation de rideau d'air",
    category: 'btp_construction',
    price: 2000,
    priceMax: 6000,
    description: "Contrat d'installation de rideaux d'air sur portes industrielles ou commerciales pour séparation thermique et lutte contre les insectes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 53,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'largeur_ouverture', label: "Largeur de l'ouverture (m)", type: 'text', required: true },
      { key: 'nombre_rideaux', label: "Nombre de rideaux", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION RIDEAU D'AIR</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Équipements</h2><p>{{nombre_rideaux}} rideau(x) d'air pour ouverture(s) de {{largeur_ouverture}} m.</p>
<h2>2. Date</h2><p>Installation le {{date_installation}}. Réglage de vitesse et direction d'air inclus.</p></div>`,
  },
  {
    code: 'clim_fourniture_pieces',
    name: "Accord de fourniture de pièces détachées frigorifiques",
    category: 'btp_construction',
    price: 2000,
    priceMax: 8000,
    description: "Contrat de fourniture régulière de pièces détachées et consommables pour installations frigorifiques et de climatisation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'liste_pieces', label: "Liste des pièces concernées", type: 'textarea', required: true },
      { key: 'date_premiere_livraison', label: "Date de première livraison", type: 'date', required: true },
      { key: 'frequence_livraison', label: "Fréquence de livraison", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE FOURNITURE — PIÈCES DÉTACHÉES FRIGORIFIQUES</h1>
<p>Entre le fournisseur et <strong>{{client_nom}}</strong>.</p>
<h2>1. Pièces concernées</h2><p>{{liste_pieces}}</p>
<h2>2. Livraisons</h2><p>Première livraison le {{date_premiere_livraison}}, puis {{frequence_livraison}}. Délai de livraison garanti sous 48 heures ouvrées.</p></div>`,
  },
  {
    code: 'clim_formation_technicien',
    name: "Accord de service de formation technicien froid",
    category: 'btp_construction',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de formation technique pour techniciens frigoristes, couvrant la manipulation des fluides, la réglementation et les bonnes pratiques.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'entreprise_cliente', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'nombre_stagiaires', label: "Nombre de stagiaires", type: 'text', required: true },
      { key: 'programme_formation', label: "Programme de formation", type: 'textarea', required: true },
      { key: 'date_debut_formation', label: "Date de début de formation", type: 'date', required: true },
      { key: 'duree_jours', label: "Durée (jours)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION — TECHNICIEN FROID</h1>
<p>Entre l'organisme de formation et <strong>{{entreprise_cliente}}</strong> pour {{nombre_stagiaires}} stagiaire(s).</p>
<h2>1. Programme</h2><p>{{programme_formation}}</p>
<h2>2. Calendrier</h2><p>Formation du {{date_debut_formation}} sur {{duree_jours}} jour(s). Attestation de formation délivrée à l'issue.</p></div>`,
  },
  {
    code: 'clim_rapport_performance_hvac',
    name: "Rapport de performance installation HVAC",
    category: 'btp_construction',
    price: 2000,
    priceMax: 6000,
    description: "Document de rapport de performance des installations HVAC après réception ou audit, incluant mesures et recommandations.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'installation_concernee', label: "Installation concernée", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
      { key: 'resultats_mesures', label: "Résultats des mesures", type: 'textarea', required: true },
      { key: 'recommandations', label: "Recommandations", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE — INSTALLATION HVAC</h1>
<p>Établi pour <strong>{{client_nom}}</strong> concernant : {{installation_concernee}}.</p>
<h2>1. Date</h2><p>{{date_rapport}}</p>
<h2>2. Résultats des mesures</h2><p>{{resultats_mesures}}</p>
<h2>3. Recommandations</h2><p>{{recommandations}}</p></div>`,
  },
  {
    code: 'clim_plan_maintenance_prev',
    name: "Plan de maintenance préventive climatisation",
    category: 'btp_construction',
    price: 2000,
    priceMax: 6000,
    description: "Document formalisant le plan de maintenance préventive annuelle des équipements de climatisation, avec calendrier d'interventions.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'equipements_list', label: "Liste des équipements", type: 'textarea', required: true },
      { key: 'annee_plan', label: "Année du plan", type: 'text', required: true },
      { key: 'date_elaboration', label: "Date d'élaboration", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN DE MAINTENANCE PRÉVENTIVE — CLIMATISATION</h1>
<p>Client : <strong>{{client_nom}}</strong> — Année {{annee_plan}} — Élaboré le {{date_elaboration}}.</p>
<h2>1. Équipements concernés</h2><p>{{equipements_list}}</p>
<h2>2. Calendrier</h2><p>Interventions réparties sur 12 mois selon fréquence constructeur et historique de pannes. Tableau de suivi joint en annexe.</p></div>`,
  },
  {
    code: 'clim_charte_technicien',
    name: "Charte du technicien froid certifié et responsable",
    category: 'btp_construction',
    price: 2000,
    priceMax: 5000,
    description: "Document de charte engageant les techniciens frigoristes aux bonnes pratiques environnementales, à la sécurité et à la déontologie professionnelle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'technicien_nom', label: "Nom du technicien", type: 'text', required: true },
      { key: 'numero_certification', label: "Numéro de certification", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DU TECHNICIEN FROID CERTIFIÉ ET RESPONSABLE</h1>
<p>Soussigné : <strong>{{technicien_nom}}</strong>, certifié N° {{numero_certification}}, employé de {{entreprise_nom}}.</p>
<h2>1. Engagements environnementaux</h2><p>Le technicien s'engage à ne jamais libérer délibérément des fluides frigorigènes dans l'atmosphère, conformément au protocole de Montréal.</p>
<h2>2. Sécurité</h2><p>Port des EPI obligatoire. Respect des consignes de sécurité électrique et de manipulation des fluides.</p>
<h2>3. Déontologie</h2><p>Transparence envers le client, traçabilité des interventions, formation continue.</p>
<p>Signé le {{date_signature}}.</p></div>`,
  },

  // ─── 25 templates Génie électrique / Énergie ───
  {
    code: 'gen_etude_electrique',
    name: "Accord de service d'étude électrique — bureau d'études",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 15000,
    description: "Contrat de prestation intellectuelle pour la réalisation d'études électriques (bilan de puissance, schémas unifilaires, notes de calcul) par un bureau d'études.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'objet_etude', label: "Objet de l'étude", type: 'textarea', required: true },
      { key: 'date_remise_rapport', label: "Date de remise du rapport", type: 'date', required: true },
      { key: 'norme_applicable', label: "Norme électrique applicable", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ÉTUDE ÉLECTRIQUE</h1>
<p>Entre le bureau d'études et <strong>{{client_nom}}</strong>.</p>
<h2>1. Objet de la mission</h2><p>{{objet_etude}}</p>
<h2>2. Norme</h2><p>Étude réalisée selon la norme {{norme_applicable}} et la réglementation OHADA.</p>
<h2>3. Livrable</h2><p>Rapport remis le {{date_remise_rapport}} incluant schémas unifilaires, notes de calcul et préconisations.</p></div>`,
  },
  {
    code: 'gen_forage_geothermique',
    name: "Accord de service de forage et installation de puits géothermique",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 30000,
    description: "Contrat d'exécution de forages géothermiques et d'installation de sondes pour pompes à chaleur géothermiques.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'profondeur_forage', label: "Profondeur de forage (m)", type: 'text', required: true },
      { key: 'nombre_puits', label: "Nombre de puits", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début des travaux", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — FORAGE ET INSTALLATION PUITS GÉOTHERMIQUE</h1>
<p>Entre le prestataire et <strong>{{maitre_ouvrage}}</strong>.</p>
<h2>1. Travaux</h2><p>Réalisation de {{nombre_puits}} puits à {{profondeur_forage}} m de profondeur avec sondes géothermiques.</p>
<h2>2. Planning</h2><p>Début des travaux : {{date_debut}}. Compte rendu géologique remis après forage.</p></div>`,
  },
  {
    code: 'gen_eolienne_industrielle',
    name: "Accord de service d'installation d'éolienne industrielle",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 40000,
    description: "Contrat clés en main pour la fourniture, le transport, le génie civil et l'installation d'éoliennes industrielles en Afrique de l'Ouest.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'promoteur', label: "Nom du promoteur", type: 'text', required: true },
      { key: 'puissance_mw', label: "Puissance installée (MW)", type: 'text', required: true },
      { key: 'site_installation', label: "Site d'installation", type: 'text', required: true },
      { key: 'date_mise_en_service', label: "Date de mise en service prévue", type: 'date', required: true },
      { key: 'observations', label: "Observations", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION ÉOLIENNE INDUSTRIELLE</h1>
<p>Entre le prestataire et <strong>{{promoteur}}</strong> pour le site de {{site_installation}}.</p>
<h2>1. Puissance</h2><p>{{puissance_mw}} MW installés. Génie civil, levage et raccordement au réseau inclus.</p>
<h2>2. Mise en service</h2><p>Date prévue : {{date_mise_en_service}}.</p>
<h2>3. Observations</h2><p>{{observations}}</p></div>`,
  },
  {
    code: 'gen_panneaux_solaires_indus',
    name: "Accord de service d'installation de panneaux solaires industriels",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 22000,
    description: "Contrat d'installation de systèmes photovoltaïques industriels en toiture ou au sol pour autoproduction d'énergie.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'puissance_kwc', label: "Puissance crête (kWc)", type: 'text', required: true },
      { key: 'type_installation', label: "Type d'installation (toiture / sol)", type: 'text', required: true },
      { key: 'date_debut_travaux', label: "Date de début des travaux", type: 'date', required: true },
      { key: 'production_estimee', label: "Production annuelle estimée (kWh)", type: 'text', required: false },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION PANNEAUX SOLAIRES INDUSTRIELS</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Système</h2><p>Puissance : {{puissance_kwc}} kWc — Type : {{type_installation}} — Production estimée : {{production_estimee}} kWh/an.</p>
<h2>2. Travaux</h2><p>Démarrage le {{date_debut_travaux}}. Raccordement réseau et démarche ANARE/CIE inclus.</p></div>`,
  },
  {
    code: 'gen_centrale_solaire_sol',
    name: "Accord de service d'installation de centrale solaire au sol",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 50000,
    description: "Contrat EPC (Engineering, Procurement, Construction) pour la réalisation d'une centrale solaire photovoltaïque au sol.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'promoteur', label: "Promoteur du projet", type: 'text', required: true },
      { key: 'puissance_mwc', label: "Puissance crête (MWc)", type: 'text', required: true },
      { key: 'localisation', label: "Localisation du site", type: 'text', required: true },
      { key: 'date_cod', label: "Date de mise en service commerciale (COD)", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD EPC — CENTRALE SOLAIRE AU SOL</h1>
<p>Entre le prestataire EPC et <strong>{{promoteur}}</strong> pour une centrale de {{puissance_mwc}} MWc à {{localisation}}.</p>
<h2>1. Périmètre EPC</h2><p>Études, fournitures, génie civil, montage, raccordement et mise en service.</p>
<h2>2. COD</h2><p>Date de mise en service commerciale : {{date_cod}}. Pénalités de retard applicables.</p></div>`,
  },
  {
    code: 'gen_centrale_hybride',
    name: "Accord de service d'installation de centrale hybride solaire-diesel",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 40000,
    description: "Contrat d'installation de centrale hybride combinant énergie solaire photovoltaïque et groupes électrogènes diesel pour zones isolées.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'puissance_solaire_kwc', label: "Puissance solaire (kWc)", type: 'text', required: true },
      { key: 'puissance_diesel_kva', label: "Puissance diesel (kVA)", type: 'text', required: true },
      { key: 'site', label: "Localisation du site", type: 'text', required: true },
      { key: 'date_mise_en_service', label: "Date de mise en service", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CENTRALE HYBRIDE SOLAIRE + DIESEL</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong> pour le site de {{site}}.</p>
<h2>1. Configuration</h2><p>Solaire : {{puissance_solaire_kwc}} kWc — Diesel : {{puissance_diesel_kva}} kVA.</p>
<h2>2. Mise en service</h2><p>Date prévue : {{date_mise_en_service}}. Système de gestion d'énergie (EMS) inclus.</p></div>`,
  },
  {
    code: 'gen_smart_grid',
    name: "Accord de service de réseau électrique intelligent (smart grid)",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 40000,
    description: "Contrat de déploiement d'une infrastructure de réseau intelligent avec télésurveillance, gestion de la demande et intégration des EnR.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur de réseau", type: 'text', required: true },
      { key: 'perimetre_zone', label: "Périmètre de la zone", type: 'text', required: true },
      { key: 'nombre_points_mesure', label: "Nombre de points de mesure", type: 'text', required: true },
      { key: 'date_deploiement', label: "Date de déploiement", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RÉSEAU ÉLECTRIQUE INTELLIGENT (SMART GRID)</h1>
<p>Entre le prestataire et <strong>{{operateur}}</strong> pour la zone {{perimetre_zone}}.</p>
<h2>1. Périmètre</h2><p>Déploiement de {{nombre_points_mesure}} points de mesure avec télésurveillance SCADA.</p>
<h2>2. Calendrier</h2><p>Déploiement à compter du {{date_deploiement}}. Formation des équipes opérateurs incluse.</p></div>`,
  },
  {
    code: 'gen_telereleve_ami',
    name: "Accord de service de télérelève de compteur (AMI)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Contrat de déploiement de compteurs communicants AMI (Advanced Metering Infrastructure) pour opérateurs de distribution électrique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'operateur', label: "Opérateur distributeur", type: 'text', required: true },
      { key: 'nombre_compteurs', label: "Nombre de compteurs déployés", type: 'text', required: true },
      { key: 'technologie_com', label: "Technologie de communication (PLC, GPRS...)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du déploiement", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TÉLÉRELÈVE AMI</h1>
<p>Entre le prestataire et <strong>{{operateur}}</strong>.</p>
<h2>1. Déploiement</h2><p>{{nombre_compteurs}} compteurs communicants via technologie {{technologie_com}}.</p>
<h2>2. Planning</h2><p>Début du déploiement : {{date_debut}}. Plateforme MDM et intégration SI incluses.</p></div>`,
  },
  {
    code: 'gen_stockage_bess',
    name: "Accord de service de stockage d'énergie (BESS, batterie)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 30000,
    description: "Contrat d'installation de systèmes de stockage d'énergie par batteries (BESS) pour stabilisation réseau, autoconsommation ou sites isolés.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'capacite_kwh', label: "Capacité de stockage (kWh)", type: 'text', required: true },
      { key: 'puissance_kw', label: "Puissance de charge/décharge (kW)", type: 'text', required: true },
      { key: 'technologie_batterie', label: "Technologie batterie (Li-Ion, LFP...)", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — STOCKAGE D'ÉNERGIE BESS</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Système</h2><p>Capacité : {{capacite_kwh}} kWh — Puissance : {{puissance_kw}} kW — Technologie : {{technologie_batterie}}.</p>
<h2>2. Installation</h2><p>Mise en service le {{date_installation}}. BMS et système de monitoring inclus.</p></div>`,
  },
  {
    code: 'gen_reseau_bt_mt',
    name: "Accord de service de réseau de distribution BT/MT",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 22000,
    description: "Contrat de construction et extension de réseaux de distribution électrique basse tension et moyenne tension.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'client_nom', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'longueur_reseau', label: "Longueur du réseau (km)", type: 'text', required: true },
      { key: 'tension_nominale', label: "Tension nominale", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début des travaux", type: 'date', required: true },
      { key: 'localisation', label: "Zone desservie", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RÉSEAU DE DISTRIBUTION BT/MT</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong> pour la zone {{localisation}}.</p>
<h2>1. Travaux</h2><p>Construction de {{longueur_reseau}} km de réseau {{tension_nominale}}. Plans de récolement remis à la réception.</p>
<h2>2. Planning</h2><p>Travaux débutant le {{date_debut}}.</p></div>`,
  },
  {
    code: 'gen_poste_transformation_htmt',
    name: "Accord de service de poste de transformation HT/MT",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 25000,
    description: "Contrat de fourniture et installation de postes de transformation haute tension / moyenne tension pour industriels et opérateurs de réseau.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'puissance_mva', label: "Puissance du transformateur (MVA)", type: 'text', required: true },
      { key: 'rapport_transformation', label: "Rapport de transformation (kV/kV)", type: 'text', required: true },
      { key: 'date_mise_en_service', label: "Date de mise en service", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — POSTE DE TRANSFORMATION HT/MT</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Équipement</h2><p>Transformateur {{puissance_mva}} MVA — Rapport : {{rapport_transformation}} kV/kV. Cellules HTA, TGBT et protections inclus.</p>
<h2>2. Mise en service</h2><p>Date prévue : {{date_mise_en_service}}. Essais diélectriques et protocole de mise sous tension fournis.</p></div>`,
  },
  {
    code: 'gen_ligne_aerienne_ht',
    name: "Accord de service de ligne électrique aérienne HT",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 30000,
    description: "Contrat de construction de lignes électriques aériennes haute tension pour transport d'énergie et interconnexion de postes.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'longueur_ligne', label: "Longueur de la ligne (km)", type: 'text', required: true },
      { key: 'tension_kv', label: "Tension (kV)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début des travaux", type: 'date', required: true },
      { key: 'itineraire', label: "Itinéraire de la ligne", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — LIGNE ÉLECTRIQUE AÉRIENNE HT</h1>
<p>Entre le prestataire et <strong>{{maitre_ouvrage}}</strong>.</p>
<h2>1. Caractéristiques</h2><p>Ligne de {{longueur_ligne}} km à {{tension_kv}} kV. Itinéraire : {{itineraire}}.</p>
<h2>2. Travaux</h2><p>Début le {{date_debut}}. Pylônes, câbles conducteurs, isolateurs et gardes fournis et posés.</p></div>`,
  },
  {
    code: 'gen_cable_souterrain_mt',
    name: "Accord de service de câble souterrain MT",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 22000,
    description: "Contrat de pose de câbles électriques souterrains moyenne tension pour alimentation de zones urbaines ou industrielles.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'client_nom', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'longueur_cable', label: "Longueur du câble (km)", type: 'text', required: true },
      { key: 'section_cable', label: "Section du câble (mm²)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début des travaux", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CÂBLE SOUTERRAIN MT</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>.</p>
<h2>1. Caractéristiques</h2><p>Câble de {{longueur_cable}} km — Section {{section_cable}} mm². Tranchées, pose, remblayage et tests inclus.</p>
<h2>2. Planning</h2><p>Travaux débutant le {{date_debut}}. Repérage DT/DICT préalable obligatoire.</p></div>`,
  },
  {
    code: 'gen_consignation_electrique',
    name: "Accord de service de coupure réseau et consignation électrique",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de prestation pour les opérations de consignation, déconsignation et travaux sous tension sur installations électriques.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 56,
    fieldsJson: F([
      { key: 'client_nom', label: "Donneur d'ordre", type: 'text', required: true },
      { key: 'installation_concernee', label: "Installation concernée", type: 'text', required: true },
      { key: 'date_intervention', label: "Date d'intervention", type: 'date', required: true },
      { key: 'habilitation_technicien', label: "Habilitation du technicien (BR, B2, HTA...)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CONSIGNATION ÉLECTRIQUE</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong> pour l'installation : {{installation_concernee}}.</p>
<h2>1. Intervenant</h2><p>Technicien habilité {{habilitation_technicien}}. Avis de consignation établi avant toute intervention.</p>
<h2>2. Date</h2><p>Opération prévue le {{date_intervention}}. Protocole LOTO appliqué.</p></div>`,
  },
  {
    code: 'gen_maintenance_senelec_cie',
    name: "Accord de service de maintenance réseau électrique modèle SENELEC/CIE",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Contrat de maintenance des réseaux électriques de distribution inspiré des pratiques SENELEC (Sénégal) et CIE (Côte d'Ivoire).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'concessionnaire', label: "Concessionnaire du réseau", type: 'text', required: true },
      { key: 'zone_concession', label: "Zone de concession", type: 'text', required: true },
      { key: 'type_reseau', label: "Type de réseau (BT/MT/HT)", type: 'text', required: true },
      { key: 'date_debut_contrat', label: "Date de début du contrat", type: 'date', required: true },
      { key: 'duree_contrat', label: "Durée du contrat (ans)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAINTENANCE RÉSEAU ÉLECTRIQUE</h1>
<p>Conclu entre le prestataire et <strong>{{concessionnaire}}</strong> pour la zone {{zone_concession}}.</p>
<h2>1. Périmètre</h2><p>Réseau {{type_reseau}} — maintenance préventive et curative.</p>
<h2>2. Durée</h2><p>Contrat de {{duree_contrat}} an(s) à compter du {{date_debut_contrat}}, renouvelable.</p></div>`,
  },
  {
    code: 'gen_efficacite_energetique_bat',
    name: "Accord de service d'efficacité énergétique bâtiment",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Contrat de prestation d'efficacité énergétique incluant diagnostic, travaux et garantie de performance énergétique pour bâtiments.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'proprietaire', label: "Propriétaire du bâtiment", type: 'text', required: true },
      { key: 'adresse_batiment', label: "Adresse du bâtiment", type: 'text', required: true },
      { key: 'economies_garanties', label: "Économies d'énergie garanties (%)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début des travaux", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'EFFICACITÉ ÉNERGÉTIQUE BÂTIMENT</h1>
<p>Entre le prestataire et <strong>{{proprietaire}}</strong> pour le bâtiment situé à {{adresse_batiment}}.</p>
<h2>1. Engagement de performance</h2><p>Économies d'énergie garanties : {{economies_garanties}} %.</p>
<h2>2. Travaux</h2><p>Démarrage le {{date_debut}}. Mesure et vérification M&V selon protocole IPMVP.</p></div>`,
  },
  {
    code: 'gen_micro_centrale_hydro',
    name: "Accord de service d'installation de micro-centrale hydroélectrique",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 40000,
    description: "Contrat d'installation de micro-centrales hydroélectriques pour électrification rurale en zones dotées de cours d'eau.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 54,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'puissance_kw', label: "Puissance installée (kW)", type: 'text', required: true },
      { key: 'cours_eau', label: "Cours d'eau concerné", type: 'text', required: true },
      { key: 'date_mise_en_service', label: "Date de mise en service", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — MICRO-CENTRALE HYDROÉLECTRIQUE</h1>
<p>Entre le prestataire et <strong>{{maitre_ouvrage}}</strong> sur le cours d'eau {{cours_eau}}.</p>
<h2>1. Puissance</h2><p>{{puissance_kw}} kW installés. Génie civil, turbine, générateur et réseau de distribution inclus.</p>
<h2>2. Mise en service</h2><p>Date prévue : {{date_mise_en_service}}.</p></div>`,
  },
  {
    code: 'gen_groupement_producteurs_enr',
    name: "Accord de service de groupement de producteurs d'énergie renouvelable",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Contrat organisant le groupement de producteurs d'énergie renouvelable pour mutualisation des accès réseau et optimisation des ventes.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'coordonnateur', label: "Coordonnateur du groupement", type: 'text', required: true },
      { key: 'membres_groupement', label: "Membres du groupement", type: 'textarea', required: true },
      { key: 'capacite_totale_mw', label: "Capacité totale (MW)", type: 'text', required: true },
      { key: 'date_creation', label: "Date de création du groupement", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE GROUPEMENT — PRODUCTEURS D'ÉNERGIE RENOUVELABLE</h1>
<p>Coordonné par <strong>{{coordonnateur}}</strong>. Capacité totale : {{capacite_totale_mw}} MW.</p>
<h2>1. Membres</h2><p>{{membres_groupement}}</p>
<h2>2. Gouvernance</h2><p>Accord créé le {{date_creation}}. Comité de pilotage paritaire. Répartition des revenus proportionnelle aux apports.</p></div>`,
  },
  {
    code: 'gen_audit_energetique_industrie',
    name: "Accord de service d'audit énergétique industrie",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Contrat d'audit énergétique industriel conforme à la norme ISO 50002, avec plan d'action et suivi des économies réalisées.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'industriel', label: "Industriel audité", type: 'text', required: true },
      { key: 'site_industriel', label: "Site industriel concerné", type: 'text', required: true },
      { key: 'date_audit', label: "Date de l'audit", type: 'date', required: true },
      { key: 'consommation_annuelle_mwh', label: "Consommation annuelle de référence (MWh)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD D'AUDIT ÉNERGÉTIQUE INDUSTRIEL</h1>
<p>Entre le bureau d'audit et <strong>{{industriel}}</strong> pour le site {{site_industriel}}.</p>
<h2>1. Référence</h2><p>Consommation annuelle de référence : {{consommation_annuelle_mwh}} MWh.</p>
<h2>2. Réalisation</h2><p>Audit le {{date_audit}}. Rapport ISO 50002 remis sous 3 semaines avec plan d'action priorisé.</p></div>`,
  },
  {
    code: 'gen_connexion_reseau_pip',
    name: "Accord de connexion au réseau électrique — producteur indépendant",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 22000,
    description: "Contrat de connexion au réseau électrique national pour producteurs indépendants d'électricité (IPP), conforme au cadre réglementaire OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'producteur', label: "Producteur indépendant (IPP)", type: 'text', required: true },
      { key: 'operateur_reseau', label: "Opérateur du réseau", type: 'text', required: true },
      { key: 'point_connexion', label: "Point de connexion", type: 'text', required: true },
      { key: 'puissance_injectee_mw', label: "Puissance injectée (MW)", type: 'text', required: true },
      { key: 'date_connexion', label: "Date de connexion prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONNEXION AU RÉSEAU — PRODUCTEUR INDÉPENDANT</h1>
<p>Entre <strong>{{producteur}}</strong> et l'opérateur {{operateur_reseau}}.</p>
<h2>1. Connexion</h2><p>Point de connexion : {{point_connexion}} — Puissance injectée : {{puissance_injectee_mw}} MW.</p>
<h2>2. Date</h2><p>Connexion prévue le {{date_connexion}}. Études de réseau et tests de synchronisation inclus.</p></div>`,
  },
  {
    code: 'gen_ppa_vente_energie',
    name: "Accord de service de vente d'énergie (PPA — Power Purchase Agreement)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 30000,
    description: "Contrat d'achat d'électricité à long terme entre un producteur et un acheteur, fixant le prix, les volumes et les conditions de livraison.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'vendeur', label: "Vendeur d'énergie", type: 'text', required: true },
      { key: 'acheteur', label: "Acheteur d'énergie", type: 'text', required: true },
      { key: 'prix_kwh_fcfa', label: "Prix de l'énergie (FCFA/kWh)", type: 'text', required: true },
      { key: 'volume_annuel_gwh', label: "Volume annuel garanti (GWh)", type: 'text', required: true },
      { key: 'date_debut_contrat', label: "Date de début du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>POWER PURCHASE AGREEMENT (PPA)</h1>
<p>Entre <strong>{{vendeur}}</strong> (vendeur) et <strong>{{acheteur}}</strong> (acheteur).</p>
<h2>1. Conditions commerciales</h2><p>Prix : {{prix_kwh_fcfa}} FCFA/kWh — Volume garanti : {{volume_annuel_gwh}} GWh/an.</p>
<h2>2. Durée</h2><p>Contrat à compter du {{date_debut_contrat}}. Durée de 20 ans, non résiliable sauf faute grave.</p>
<h2>3. Droit applicable</h2><p>Contrat soumis au droit OHADA. Arbitrage CCJA en cas de litige.</p></div>`,
  },
  {
    code: 'gen_rapport_performance_centrale',
    name: "Rapport de performance centrale d'énergie",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: "Document de rapport de performance énergétique d'une centrale de production d'énergie renouvelable ou conventionnelle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'operateur_centrale', label: "Opérateur de la centrale", type: 'text', required: true },
      { key: 'nom_centrale', label: "Nom de la centrale", type: 'text', required: true },
      { key: 'periode_rapport', label: "Période couverte par le rapport", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
      { key: 'indicateurs_performance', label: "Indicateurs de performance clés", type: 'textarea', required: true },
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE — CENTRALE D'ÉNERGIE</h1>
<p>Centrale : <strong>{{nom_centrale}}</strong> — Opérateur : {{operateur_centrale}}.</p>
<h2>1. Période</h2><p>{{periode_rapport}} — Rapport établi le {{date_rapport}}.</p>
<h2>2. Indicateurs clés</h2><p>{{indicateurs_performance}}</p>
<h2>3. Analyse et recommandations</h2><p>Analyse comparative par rapport aux objectifs contractuels et plan d'amélioration joint en annexe.</p></div>`,
  },
  {
    code: 'gen_electrification_rurale',
    name: "Plan d'électrification rurale",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Document de plan d'électrification rurale définissant les objectifs, solutions techniques, financement et calendrier pour l'accès universel à l'électricité.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'zone_cible', label: "Zone rurale cible", type: 'text', required: true },
      { key: 'nombre_menages', label: "Nombre de ménages à électrifier", type: 'text', required: true },
      { key: 'solution_technique', label: "Solution technique retenue", type: 'textarea', required: true },
      { key: 'date_elaboration', label: "Date d'élaboration du plan", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>PLAN D'ÉLECTRIFICATION RURALE</h1>
<p>Zone cible : <strong>{{zone_cible}}</strong> — {{nombre_menages}} ménages à électrifier.</p>
<h2>1. Solution technique</h2><p>{{solution_technique}}</p>
<h2>2. Financement</h2><p>Plan de financement détaillé joint. Sources : État, bailleurs de fonds, partenaires privés.</p>
<h2>3. Date d'élaboration</h2><p>{{date_elaboration}}</p></div>`,
  },
  {
    code: 'gen_financement_dette_senior',
    name: "Accord de financement projet d'énergie — dette senior",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 40000,
    description: "Contrat de financement en dette senior pour projet d'infrastructure énergétique, avec conditions de tirage, covenants et sûretés.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'emprunteur', label: "Emprunteur (SPV)", type: 'text', required: true },
      { key: 'preteur', label: "Prêteur principal", type: 'text', required: true },
      { key: 'montant_fcfa', label: "Montant du prêt (FCFA)", type: 'text', required: true },
      { key: 'taux_interet', label: "Taux d'intérêt annuel (%)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT — DETTE SENIOR PROJET ÉNERGIE</h1>
<p>Entre <strong>{{preteur}}</strong> (prêteur) et <strong>{{emprunteur}}</strong> (emprunteur).</p>
<h2>1. Conditions financières</h2><p>Montant : {{montant_fcfa}} FCFA — Taux : {{taux_interet}} % l'an. Remboursement in fine ou amortissable selon calendrier annexé.</p>
<h2>2. Covenants</h2><p>Maintien des ratios financiers (DSCR, gearing). Reporting trimestriel obligatoire.</p>
<h2>3. Sûretés</h2><p>Nantissement des actifs du projet et cession des droits sur les contrats PPA et concession.</p>
<p>Signé le {{date_signature}} — Droit applicable OHADA.</p></div>`,
  },
  {
    code: 'gen_charte_energie_propre',
    name: "Charte de l'énergie propre et de l'accès universel à l'électricité",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Document de charte engageant les acteurs du secteur énergétique à promouvoir les énergies renouvelables et l'accès universel à l'électricité en Afrique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'organisation_signataire', label: "Organisation signataire", type: 'text', required: true },
      { key: 'representant', label: "Représentant légal", type: 'text', required: true },
      { key: 'objectifs_specifiques', label: "Objectifs spécifiques de l'organisation", type: 'textarea', required: false },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ÉNERGIE PROPRE ET DE L'ACCÈS UNIVERSEL À L'ÉLECTRICITÉ</h1>
<p>Signataire : <strong>{{organisation_signataire}}</strong>, représentée par {{representant}}.</p>
<h2>1. Vision</h2><p>L'accès universel à une énergie propre, fiable et abordable est un droit fondamental des populations africaines.</p>
<h2>2. Engagements</h2><p>Le signataire s'engage à investir dans les énergies renouvelables, à réduire l'empreinte carbone de ses activités et à soutenir les programmes d'électrification rurale.</p>
<h2>3. Objectifs spécifiques</h2><p>{{objectifs_specifiques}}</p>
<p>Signé le {{date_signature}} — Conforme aux ODD 7 et 13.</p></div>`,
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
  console.log(`Batch 101b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
