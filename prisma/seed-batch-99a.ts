import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 Plomberie / Sanitaire ───────────────────────────────────────────────
  {
    code: 'plomb_sdb',
    name: "Accord de service de plomberie sanitaire (installation salle de bain)",
    category: 'btp_construction', price: 4000, priceMax: 14000,
    description: "Contrat de prestation pour l'installation complète des équipements sanitaires d'une salle de bain conforme aux normes OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_chantier', label: "Adresse du chantier", type: 'text', required: true },
      { key: 'description_travaux', label: "Description des travaux", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'montant_ht', label: "Montant HT (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION SALLE DE BAIN</h1>
<p>Entre le prestataire soussigné et le client <strong>{{client_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 — Objet</h2>
<p>Le présent accord a pour objet la fourniture et l'installation des équipements sanitaires d'une salle de bain sise à : {{adresse_chantier}}.</p>
<h2>Article 2 — Description des travaux</h2>
<p>{{description_travaux}}</p>
<h2>Article 3 — Délai</h2>
<p>Les travaux débuteront le {{date_debut}} et seront exécutés dans les délais convenus d'un commun accord.</p>
<h2>Article 4 — Prix</h2>
<p>Le montant hors taxes est fixé à <strong>{{montant_ht}} FCFA</strong>. La TVA applicable sera ajoutée conformément à la législation ivoirienne en vigueur.</p>
<h2>Article 5 — Garantie</h2>
<p>Le prestataire garantit ses travaux contre tout vice caché pendant une durée de douze (12) mois à compter de la réception.</p>
<p>Fait à Abidjan, le ____________________</p>
<p>Signature client : __________________ &nbsp;&nbsp; Signature prestataire : __________________</p></div>`,
  },
  {
    code: 'plomb_neuf',
    name: "Accord de service d'installation de plomberie neuve",
    category: 'btp_construction', price: 5000, priceMax: 18000,
    description: "Contrat pour l'installation intégrale d'un réseau de plomberie neuve dans un bâtiment en construction.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'adresse_projet', label: "Adresse du projet", type: 'text', required: true },
      { key: 'nature_batiment', label: "Nature du bâtiment", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'montant_total', label: "Montant total (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION DE PLOMBERIE NEUVE</h1>
<p>Entre l'entrepreneur en plomberie soussigné et le maître d'ouvrage <strong>{{maitre_ouvrage}}</strong> :</p>
<h2>Article 1 — Objet</h2>
<p>Installation complète du réseau de plomberie neuve du bâtiment de type <strong>{{nature_batiment}}</strong> situé à {{adresse_projet}}.</p>
<h2>Article 2 — Étendue des travaux</h2>
<p>Les travaux comprennent : alimentation eau froide et eau chaude, évacuations, pose d'appareils sanitaires, raccordement au réseau public.</p>
<h2>Article 3 — Planning</h2>
<p>Démarrage des travaux : {{date_debut}}. Le planning détaillé est annexé au présent accord.</p>
<h2>Article 4 — Rémunération</h2>
<p>Montant forfaitaire : <strong>{{montant_total}} FCFA</strong> TTC, payable selon l'échéancier annexé.</p>
<h2>Article 5 — Réception</h2>
<p>La réception sera prononcée après tests d'étanchéité et vérification de la conformité aux plans d'exécution.</p>
<p>Fait à Abidjan, le ____________________</p>
<p>Signature maître d'ouvrage : __________________ &nbsp;&nbsp; Signature entrepreneur : __________________</p></div>`,
  },
  {
    code: 'plomb_dep',
    name: "Accord de service de réparation de plomberie (dépannage)",
    category: 'btp_construction', price: 2000, priceMax: 6000,
    description: "Bon d'intervention pour dépannage et réparation d'urgence sur un réseau de plomberie existant.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 83,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_intervention', label: "Adresse d'intervention", type: 'text', required: true },
      { key: 'nature_panne', label: "Nature de la panne", type: 'textarea', required: true },
      { key: 'date_intervention', label: "Date d'intervention", type: 'date', required: true },
      { key: 'cout_intervention', label: "Coût total (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>BON D'INTERVENTION — DÉPANNAGE PLOMBERIE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Adresse : {{adresse_intervention}}</p>
<h2>Article 1 — Nature de l'intervention</h2>
<p>{{nature_panne}}</p>
<h2>Article 2 — Date et durée</h2>
<p>Intervention réalisée le {{date_intervention}}.</p>
<h2>Article 3 — Tarification</h2>
<p>Coût total de l'intervention : <strong>{{cout_intervention}} FCFA</strong>.</p>
<h2>Article 4 — Garantie dépannage</h2>
<p>Le prestataire garantit les pièces posées et la main-d'œuvre pour une durée de trois (3) mois.</p>
<p>Bon accepté par le client : __________________ Date : __________________</p></div>`,
  },
  {
    code: 'plomb_solaire',
    name: "Accord de service d'installation de chauffe-eau solaire",
    category: 'btp_construction', price: 5000, priceMax: 20000,
    description: "Contrat de fourniture et pose d'un chauffe-eau solaire avec capteurs et ballon de stockage.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_installation', label: "Adresse d'installation", type: 'text', required: true },
      { key: 'capacite_litre', label: "Capacité du ballon (litres)", type: 'text', required: true },
      { key: 'date_pose', label: "Date de pose", type: 'date', required: true },
      { key: 'prix_ttc', label: "Prix TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION CHAUFFE-EAU SOLAIRE</h1>
<p>Entre le fournisseur-installateur soussigné et <strong>{{client_nom}}</strong> :</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et installation d'un chauffe-eau solaire de <strong>{{capacite_litre}} litres</strong> à {{adresse_installation}}.</p>
<h2>Article 2 — Prestations incluses</h2>
<p>Pose des capteurs en toiture, raccordement hydraulique et électrique, mise en service et formation à l'utilisation.</p>
<h2>Article 3 — Date de pose</h2>
<p>Installation prévue le {{date_pose}}.</p>
<h2>Article 4 — Prix et paiement</h2>
<p>Prix total TTC : <strong>{{prix_ttc}} FCFA</strong> — 50 % à la commande, 50 % à la réception.</p>
<h2>Article 5 — Garantie</h2>
<p>Garantie fabricant 2 ans sur capteurs et ballon ; main-d'œuvre garantie 1 an.</p>
<p>Fait à Abidjan, le ____________________</p>
<p>Signature client : __________________ &nbsp;&nbsp; Signature installateur : __________________</p></div>`,
  },
  {
    code: 'plomb_chauffe_elec',
    name: "Accord de service d'installation de chauffe-eau électrique",
    category: 'btp_construction', price: 3000, priceMax: 10000,
    description: "Contrat de pose et raccordement d'un chauffe-eau électrique (cumulus ou instantané).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_travaux', label: "Adresse des travaux", type: 'text', required: true },
      { key: 'type_appareil', label: "Type d'appareil (cumulus / instantané)", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
      { key: 'montant_facture', label: "Montant facturé (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION CHAUFFE-EAU ÉLECTRIQUE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Lieu : {{adresse_travaux}}</p>
<h2>Article 1 — Objet</h2>
<p>Pose et raccordement d'un chauffe-eau électrique de type <strong>{{type_appareil}}</strong>.</p>
<h2>Article 2 — Travaux inclus</h2>
<p>Dépose de l'ancien appareil le cas échéant, installation du nouvel équipement, raccordement hydraulique et électrique, test de fonctionnement.</p>
<h2>Article 3 — Date</h2>
<p>Intervention le {{date_installation}}.</p>
<h2>Article 4 — Prix</h2>
<p>Montant total : <strong>{{montant_facture}} FCFA</strong> TTC.</p>
<p>Bon d'exécution signé par le client : __________________ Date : __________________</p></div>`,
  },
  {
    code: 'plomb_pompe',
    name: "Accord de service d'installation de groupe électropompe",
    category: 'btp_construction', price: 4000, priceMax: 14000,
    description: "Contrat de fourniture et pose d'un groupe électropompe pour alimentation en eau d'un bâtiment ou exploitation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'site_installation', label: "Site d'installation", type: 'text', required: true },
      { key: 'puissance_pompe', label: "Puissance de la pompe (kW)", type: 'text', required: true },
      { key: 'date_pose', label: "Date de pose", type: 'date', required: true },
      { key: 'prix_ttc', label: "Prix TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION GROUPE ÉLECTROPOMPE</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong> pour le site : {{site_installation}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et installation d'un groupe électropompe de <strong>{{puissance_pompe}} kW</strong> pour l'alimentation en eau du site.</p>
<h2>Article 2 — Prestations</h2>
<p>Génie civil du socle, pose de la pompe, raccordements hydrauliques, câblage électrique, armoire de commande, tests de débit et pression.</p>
<h2>Article 3 — Calendrier</h2>
<p>Démarrage des travaux : {{date_pose}}.</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{prix_ttc}} FCFA</strong>.</p>
<h2>Article 5 — Garantie</h2>
<p>Garantie pièces et main-d'œuvre : 12 mois.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'plomb_fosse',
    name: "Accord de service d'installation de fosse septique",
    category: 'btp_construction', price: 5000, priceMax: 18000,
    description: "Contrat de construction et pose d'une fosse septique conforme aux normes d'assainissement en vigueur en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'adresse_chantier', label: "Adresse du chantier", type: 'text', required: true },
      { key: 'volume_fosse', label: "Volume de la fosse (m³)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'montant_ht', label: "Montant HT (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION DE FOSSE SEPTIQUE</h1>
<p>Entre l'entrepreneur soussigné et <strong>{{maitre_ouvrage}}</strong>, propriétaire du terrain sis à {{adresse_chantier}} :</p>
<h2>Article 1 — Objet</h2>
<p>Construction et installation d'une fosse septique de <strong>{{volume_fosse}} m³</strong>.</p>
<h2>Article 2 — Normes applicables</h2>
<p>Les travaux seront réalisés conformément à la réglementation ivoirienne en matière d'assainissement autonome et aux recommandations du Ministère de l'Hydraulique.</p>
<h2>Article 3 — Délai</h2>
<p>Démarrage : {{date_debut}}. Durée estimée : deux (2) à quatre (4) semaines.</p>
<h2>Article 4 — Prix</h2>
<p>Montant HT : <strong>{{montant_ht}} FCFA</strong>. TVA en sus selon taux légal.</p>
<p>Signatures : Maître d'ouvrage __________________ / Entrepreneur __________________</p></div>`,
  },
  {
    code: 'plomb_eaux_usees',
    name: "Accord de service de traitement des eaux usées domestiques",
    category: 'btp_construction', price: 4000, priceMax: 15000,
    description: "Contrat d'installation d'un système de traitement primaire et secondaire des eaux usées ménagères.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_site', label: "Adresse du site", type: 'text', required: true },
      { key: 'type_traitement', label: "Type de traitement (lagunage, filtre planté…)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'montant_total', label: "Montant total (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TRAITEMENT DES EAUX USÉES DOMESTIQUES</h1>
<p>Prestataire spécialisé soussigné et <strong>{{client_nom}}</strong>, site : {{adresse_site}}</p>
<h2>Article 1 — Objet</h2>
<p>Installation d'un système de traitement des eaux usées de type <strong>{{type_traitement}}</strong>.</p>
<h2>Article 2 — Prestations</h2>
<p>Terrassement, installation des ouvrages de prétraitement, traitement et rejet ou réutilisation selon normes environnementales ivoiriennes.</p>
<h2>Article 3 — Calendrier</h2>
<p>Début des travaux : {{date_debut}}.</p>
<h2>Article 4 — Prix</h2>
<p>Montant total : <strong>{{montant_total}} FCFA</strong> TTC.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'plomb_cuve',
    name: "Accord de service d'installation de cuve de stockage d'eau",
    category: 'btp_construction', price: 3000, priceMax: 12000,
    description: "Contrat de fourniture et pose d'une cuve aérienne ou enterrée pour le stockage d'eau potable ou non potable.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_installation', label: "Adresse d'installation", type: 'text', required: true },
      { key: 'capacite_cuve', label: "Capacité de la cuve (litres)", type: 'text', required: true },
      { key: 'date_pose', label: "Date de pose", type: 'date', required: true },
      { key: 'prix_ttc', label: "Prix TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION DE CUVE DE STOCKAGE D'EAU</h1>
<p>Client : <strong>{{client_nom}}</strong> — Lieu : {{adresse_installation}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et installation d'une cuve de stockage d'eau de <strong>{{capacite_cuve}} litres</strong>.</p>
<h2>Article 2 — Travaux inclus</h2>
<p>Préparation du socle ou de la fouille, pose de la cuve, raccordements alimentation et distribution, test d'étanchéité.</p>
<h2>Article 3 — Date</h2>
<p>Pose prévue le {{date_pose}}.</p>
<h2>Article 4 — Prix</h2>
<p>Prix TTC : <strong>{{prix_ttc}} FCFA</strong>.</p>
<p>Bon d'acceptation signé : __________________ Date : __________________</p></div>`,
  },
  {
    code: 'plomb_arrosage',
    name: "Accord de service d'installation de système d'arrosage automatique",
    category: 'btp_construction', price: 4000, priceMax: 14000,
    description: "Contrat pour la conception et l'installation d'un réseau d'arrosage automatique (asperseurs, goutte-à-goutte).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_site', label: "Adresse du site", type: 'text', required: true },
      { key: 'superficie_m2', label: "Superficie à arroser (m²)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début des travaux", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — SYSTÈME D'ARROSAGE AUTOMATIQUE</h1>
<p>Entre le prestataire et <strong>{{client_nom}}</strong>, site : {{adresse_site}}</p>
<h2>Article 1 — Objet</h2>
<p>Conception et installation d'un système d'arrosage automatique pour une superficie de <strong>{{superficie_m2}} m²</strong>.</p>
<h2>Article 2 — Prestations</h2>
<p>Étude hydraulique, fourniture et pose des tuyauteries, asperseurs ou goutteurs, programmateur, raccordement à la source d'eau.</p>
<h2>Article 3 — Calendrier</h2>
<p>Démarrage : {{date_debut}}.</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'plomb_robinetterie',
    name: "Accord de service d'installation de robinetterie et sanitaires",
    category: 'btp_construction', price: 2500, priceMax: 8000,
    description: "Contrat de pose de robinetterie, lavabos, WC, baignoires et autres équipements sanitaires.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_travaux', label: "Adresse des travaux", type: 'text', required: true },
      { key: 'liste_equipements', label: "Liste des équipements", type: 'textarea', required: true },
      { key: 'date_intervention', label: "Date d'intervention", type: 'date', required: true },
      { key: 'montant_ht', label: "Montant HT (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION ROBINETTERIE ET SANITAIRES</h1>
<p>Client : <strong>{{client_nom}}</strong> — Adresse : {{adresse_travaux}}</p>
<h2>Article 1 — Objet</h2>
<p>Pose et raccordement des équipements sanitaires suivants :</p>
<p>{{liste_equipements}}</p>
<h2>Article 2 — Date</h2>
<p>Intervention le {{date_intervention}}.</p>
<h2>Article 3 — Prix</h2>
<p>Montant HT : <strong>{{montant_ht}} FCFA</strong>. TVA selon législation en vigueur.</p>
<h2>Article 4 — Garantie</h2>
<p>Garantie main-d'œuvre 6 mois ; garantie fabricant selon conditions constructeur.</p>
<p>Signature client : __________________ Date : __________________</p></div>`,
  },
  {
    code: 'plomb_tuyauterie',
    name: "Accord de service d'installation de tuyauteries PVC/PPR",
    category: 'btp_construction', price: 3500, priceMax: 12000,
    description: "Contrat de pose de réseaux de tuyauteries en PVC ou PPR pour alimentation et évacuation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_chantier', label: "Adresse du chantier", type: 'text', required: true },
      { key: 'type_tuyauterie', label: "Type de tuyauterie (PVC / PPR)", type: 'text', required: true },
      { key: 'lineaire_ml', label: "Linéaire estimé (mètres linéaires)", type: 'text', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION DE TUYAUTERIES {{type_tuyauterie}}</h1>
<p>Entre le plombier soussigné et <strong>{{client_nom}}</strong>, chantier : {{adresse_chantier}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et pose de tuyauteries <strong>{{type_tuyauterie}}</strong> pour un linéaire d'environ <strong>{{lineaire_ml}} ml</strong>.</p>
<h2>Article 2 — Travaux</h2>
<p>Saignées, pose, raccordements, tests de pression, rebouchage.</p>
<h2>Article 3 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Plombier __________________</p></div>`,
  },
  {
    code: 'plomb_maintenance',
    name: "Accord de service de maintenance contrat plomberie",
    category: 'btp_construction', price: 3000, priceMax: 10000,
    description: "Contrat de maintenance préventive et curative périodique d'un réseau de plomberie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client / Entreprise", type: 'text', required: true },
      { key: 'adresse_site', label: "Adresse du site", type: 'text', required: true },
      { key: 'frequence_visite', label: "Fréquence des visites (mensuelle, trimestrielle…)", type: 'text', required: true },
      { key: 'date_debut_contrat', label: "Date de début du contrat", type: 'date', required: true },
      { key: 'redevance_annuelle', label: "Redevance annuelle (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MAINTENANCE PLOMBERIE</h1>
<p>Entre le prestataire de maintenance soussigné et <strong>{{client_nom}}</strong>, site : {{adresse_site}}</p>
<h2>Article 1 — Objet</h2>
<p>Maintenance préventive et curative du réseau de plomberie du site avec visites <strong>{{frequence_visite}}</strong>.</p>
<h2>Article 2 — Prestations incluses</h2>
<p>Inspection des réseaux, détection de fuites, remplacement de joints, vérification des appareils, rapport de visite.</p>
<h2>Article 3 — Durée</h2>
<p>Contrat d'un (1) an renouvelable, prenant effet le {{date_debut_contrat}}.</p>
<h2>Article 4 — Redevance</h2>
<p>Redevance annuelle : <strong>{{redevance_annuelle}} FCFA</strong>, payable trimestriellement d'avance.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'plomb_piscine',
    name: "Accord de service d'installation de piscine (pompe, filtre)",
    category: 'btp_construction', price: 6000, priceMax: 22000,
    description: "Contrat pour l'installation hydraulique d'une piscine incluant pompe de circulation, filtre et traitement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 56,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_projet', label: "Adresse du projet", type: 'text', required: true },
      { key: 'volume_piscine', label: "Volume de la piscine (m³)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION HYDRAULIQUE PISCINE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Lieu : {{adresse_projet}}</p>
<h2>Article 1 — Objet</h2>
<p>Installation du circuit hydraulique d'une piscine de <strong>{{volume_piscine}} m³</strong> comprenant pompe, filtre à sable, skimmers, buses de refoulement et système de traitement.</p>
<h2>Article 2 — Prestations</h2>
<p>Fourniture et pose du matériel, raccordements, mise en eau, réglage du traitement, formation du client.</p>
<h2>Article 3 — Calendrier</h2>
<p>Début des travaux : {{date_debut}}.</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong> — 40 % à la commande, 60 % à la réception.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'plomb_osmose',
    name: "Accord de service de traitement de l'eau domestique (osmose)",
    category: 'btp_construction', price: 3500, priceMax: 12000,
    description: "Contrat de fourniture et installation d'un système de traitement par osmose inverse pour l'eau potable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_installation', label: "Adresse d'installation", type: 'text', required: true },
      { key: 'debit_traite', label: "Débit traité (litres/jour)", type: 'text', required: true },
      { key: 'date_pose', label: "Date de pose", type: 'date', required: true },
      { key: 'prix_ttc', label: "Prix TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TRAITEMENT DE L'EAU PAR OSMOSE INVERSE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Adresse : {{adresse_installation}}</p>
<h2>Article 1 — Objet</h2>
<p>Installation d'un système de traitement par osmose inverse de <strong>{{debit_traite}} litres/jour</strong>.</p>
<h2>Article 2 — Prestations incluses</h2>
<p>Fourniture du filtre à osmose, raccordement eau froide et évacuation, test de qualité de l'eau, formation.</p>
<h2>Article 3 — Date de pose</h2>
<p>{{date_pose}}</p>
<h2>Article 4 — Prix</h2>
<p>Prix TTC : <strong>{{prix_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Installateur __________________</p></div>`,
  },
  {
    code: 'plomb_colonne_seche',
    name: "Accord de service d'installation de colonne sèche (incendie)",
    category: 'btp_construction', price: 5000, priceMax: 18000,
    description: "Contrat d'installation d'une colonne sèche conforme aux exigences de sécurité incendie pour immeubles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'adresse_batiment', label: "Adresse du bâtiment", type: 'text', required: true },
      { key: 'nombre_niveaux', label: "Nombre de niveaux desservis", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'montant_ht', label: "Montant HT (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION DE COLONNE SÈCHE INCENDIE</h1>
<p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Bâtiment : {{adresse_batiment}}</p>
<h2>Article 1 — Objet</h2>
<p>Installation d'une colonne sèche desservant <strong>{{nombre_niveaux}} niveaux</strong> conformément aux prescriptions du Code de la Construction et des pompiers.</p>
<h2>Article 2 — Prestations</h2>
<p>Fourniture et pose de la tuyauterie DN100, prises d'alimentation en pied et prises d'incendie à chaque niveau.</p>
<h2>Article 3 — Date</h2>
<p>Démarrage : {{date_debut}}.</p>
<h2>Article 4 — Prix</h2>
<p>Montant HT : <strong>{{montant_ht}} FCFA</strong>.</p>
<p>Signatures : Maître d'ouvrage __________________ / Installateur __________________</p></div>`,
  },
  {
    code: 'plomb_borne_eau',
    name: "Accord de service d'installation de borne de raccordement eau",
    category: 'btp_construction', price: 2500, priceMax: 8000,
    description: "Contrat de pose d'une borne de raccordement au réseau public d'eau potable (branchement particulier).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 63,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du demandeur", type: 'text', required: true },
      { key: 'adresse_branchement', label: "Adresse du branchement", type: 'text', required: true },
      { key: 'diametre_canalisation', label: "Diamètre de canalisation (mm)", type: 'text', required: true },
      { key: 'date_intervention', label: "Date d'intervention", type: 'date', required: true },
      { key: 'montant_forfait', label: "Montant forfaitaire (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — BORNE DE RACCORDEMENT EAU</h1>
<p>Demandeur : <strong>{{client_nom}}</strong> — Lieu : {{adresse_branchement}}</p>
<h2>Article 1 — Objet</h2>
<p>Installation d'une borne de raccordement DN<strong>{{diametre_canalisation}} mm</strong> au réseau public d'eau potable.</p>
<h2>Article 2 — Travaux</h2>
<p>Fouille, pose du collier de prise en charge, du robinet de branchement, du compteur et remblayage.</p>
<h2>Article 3 — Date</h2>
<p>{{date_intervention}}</p>
<h2>Article 4 — Prix</h2>
<p>Forfait : <strong>{{montant_forfait}} FCFA</strong> TTC.</p>
<p>Signature demandeur : __________________ Date : __________________</p></div>`,
  },
  {
    code: 'plomb_detection_fuites',
    name: "Accord de service de détection de fuites (prestataire)",
    category: 'btp_construction', price: 2000, priceMax: 7000,
    description: "Contrat de recherche et localisation de fuites sur un réseau de plomberie par un prestataire spécialisé.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_site', label: "Adresse du site", type: 'text', required: true },
      { key: 'methode_detection', label: "Méthode utilisée (acoustique, gaz traceur…)", type: 'text', required: true },
      { key: 'date_intervention', label: "Date d'intervention", type: 'date', required: true },
      { key: 'honoraires', label: "Honoraires (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DÉTECTION DE FUITES</h1>
<p>Client : <strong>{{client_nom}}</strong> — Site : {{adresse_site}}</p>
<h2>Article 1 — Objet</h2>
<p>Recherche et localisation de fuites sur le réseau de plomberie par la méthode <strong>{{methode_detection}}</strong>.</p>
<h2>Article 2 — Date</h2>
<p>Intervention le {{date_intervention}}.</p>
<h2>Article 3 — Résultats</h2>
<p>Un rapport de localisation sera remis au client dans les 24 heures suivant l'intervention.</p>
<h2>Article 4 — Honoraires</h2>
<p>Honoraires : <strong>{{honoraires}} FCFA</strong> TTC, indépendants de toute réparation.</p>
<p>Signature client : __________________ Date : __________________</p></div>`,
  },
  {
    code: 'plomb_debouchage',
    name: "Accord de service de débouchage canalisations",
    category: 'btp_construction', price: 2000, priceMax: 6000,
    description: "Bon d'intervention pour débouchage de canalisations bouchées (furet, hydrocurage).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 85,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_intervention', label: "Adresse d'intervention", type: 'text', required: true },
      { key: 'type_canalisation', label: "Type de canalisation concernée", type: 'text', required: true },
      { key: 'date_intervention', label: "Date d'intervention", type: 'date', required: true },
      { key: 'cout_total', label: "Coût total (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>BON D'INTERVENTION — DÉBOUCHAGE CANALISATIONS</h1>
<p>Client : <strong>{{client_nom}}</strong> — Adresse : {{adresse_intervention}}</p>
<h2>Article 1 — Objet</h2>
<p>Débouchage de la canalisation : <strong>{{type_canalisation}}</strong>.</p>
<h2>Article 2 — Méthode</h2>
<p>Utilisation de furet mécanique ou hydrocureur haute pression selon l'obstruction constatée.</p>
<h2>Article 3 — Date</h2>
<p>Intervention réalisée le {{date_intervention}}.</p>
<h2>Article 4 — Prix</h2>
<p>Coût total : <strong>{{cout_total}} FCFA</strong> TTC.</p>
<p>Bon accepté : __________________ Date : __________________</p></div>`,
  },
  {
    code: 'plomb_vidange_fosse',
    name: "Accord de service de nettoyage de fosse septique",
    category: 'btp_construction', price: 2500, priceMax: 8000,
    description: "Contrat de vidange et nettoyage d'une fosse septique par camion pompe agréé.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_fosse', label: "Adresse de la fosse", type: 'text', required: true },
      { key: 'volume_fosse', label: "Volume de la fosse (m³)", type: 'text', required: true },
      { key: 'date_intervention', label: "Date d'intervention", type: 'date', required: true },
      { key: 'montant_prestation', label: "Montant de la prestation (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — NETTOYAGE DE FOSSE SEPTIQUE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Site : {{adresse_fosse}}</p>
<h2>Article 1 — Objet</h2>
<p>Vidange et nettoyage d'une fosse septique de <strong>{{volume_fosse}} m³</strong> par camion hydrocureur agréé.</p>
<h2>Article 2 — Conditions</h2>
<p>Évacuation des boues vers une station agréée conformément à la réglementation environnementale.</p>
<h2>Article 3 — Date</h2>
<p>Intervention prévue le {{date_intervention}}.</p>
<h2>Article 4 — Prix</h2>
<p>Montant : <strong>{{montant_prestation}} FCFA</strong> TTC.</p>
<p>Signature client : __________________ Date : __________________</p></div>`,
  },
  {
    code: 'plomb_fourniture',
    name: "Accord de fourniture de matériel sanitaire",
    category: 'btp_construction', price: 2500, priceMax: 9000,
    description: "Bon de commande et accord de fourniture de matériel sanitaire entre fournisseur et professionnel ou particulier.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'acheteur_nom', label: "Nom de l'acheteur", type: 'text', required: true },
      { key: 'fournisseur_nom', label: "Nom du fournisseur", type: 'text', required: true },
      { key: 'designation_materiel', label: "Désignation du matériel", type: 'textarea', required: true },
      { key: 'date_livraison', label: "Date de livraison souhaitée", type: 'date', required: true },
      { key: 'montant_commande', label: "Montant de la commande (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE FOURNITURE — MATÉRIEL SANITAIRE</h1>
<p>Acheteur : <strong>{{acheteur_nom}}</strong> — Fournisseur : <strong>{{fournisseur_nom}}</strong></p>
<h2>Article 1 — Désignation</h2>
<p>{{designation_materiel}}</p>
<h2>Article 2 — Livraison</h2>
<p>Date de livraison souhaitée : {{date_livraison}}.</p>
<h2>Article 3 — Prix</h2>
<p>Montant total de la commande : <strong>{{montant_commande}} FCFA</strong> TTC.</p>
<h2>Article 4 — Paiement</h2>
<p>Paiement à 30 jours net sauf conditions particulières négociées.</p>
<p>Signatures : Acheteur __________________ / Fournisseur __________________</p></div>`,
  },
  {
    code: 'plomb_reception',
    name: "Rapport de réception de travaux de plomberie",
    category: 'btp_construction', price: 2000, priceMax: 6000,
    description: "Procès-verbal de réception contradictoire des travaux de plomberie entre maître d'ouvrage et entrepreneur.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'entrepreneur', label: "Entrepreneur", type: 'text', required: true },
      { key: 'objet_travaux', label: "Objet des travaux", type: 'textarea', required: true },
      { key: 'date_reception', label: "Date de réception", type: 'date', required: true },
      { key: 'reserves', label: "Réserves éventuelles", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL DE RÉCEPTION DE TRAVAUX DE PLOMBERIE</h1>
<p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong></p>
<p>Entrepreneur : <strong>{{entrepreneur}}</strong></p>
<h2>Article 1 — Objet des travaux</h2>
<p>{{objet_travaux}}</p>
<h2>Article 2 — Date de réception</h2>
<p>Réception prononcée le {{date_reception}}.</p>
<h2>Article 3 — Réserves</h2>
<p>{{reserves}}</p>
<h2>Article 4 — Effets</h2>
<p>La réception fait courir les délais de garantie légaux. Les réserves devront être levées dans le délai fixé en annexe.</p>
<p>Maître d'ouvrage : __________________ / Entrepreneur : __________________</p></div>`,
  },
  {
    code: 'plomb_plan_exec',
    name: "Plan d'exécution plomberie",
    category: 'btp_construction', price: 3000, priceMax: 10000,
    description: "Document de note technique accompagnant un plan d'exécution plomberie pour un chantier de construction.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      { key: 'projet_nom', label: "Nom du projet", type: 'text', required: true },
      { key: 'adresse_projet', label: "Adresse du projet", type: 'text', required: true },
      { key: 'maitre_oeuvre', label: "Maître d'œuvre", type: 'text', required: true },
      { key: 'date_document', label: "Date du document", type: 'date', required: true },
      { key: 'indice_revision', label: "Indice de révision", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>NOTE TECHNIQUE — PLAN D'EXÉCUTION PLOMBERIE</h1>
<p>Projet : <strong>{{projet_nom}}</strong> — Adresse : {{adresse_projet}}</p>
<p>Maître d'œuvre : <strong>{{maitre_oeuvre}}</strong> — Date : {{date_document}} — Indice : {{indice_revision}}</p>
<h2>1. Objet du document</h2>
<p>La présente note accompagne le plan d'exécution plomberie et définit les exigences techniques applicables aux travaux.</p>
<h2>2. Normes de référence</h2>
<p>NF EN 806, prescriptions du DTU 60.1, réglementation ivoirienne des installations intérieures d'eau.</p>
<h2>3. Matériaux</h2>
<p>Tuyauteries en PPR PN20 pour eau chaude, PVC NF pour évacuations, raccords laiton certifiés.</p>
<h2>4. Conditions d'exécution</h2>
<p>Tests de pression obligatoires avant fermeture des tranchées ou saignées.</p>
<p>Établi par : __________________ Vérifié par : __________________</p></div>`,
  },
  {
    code: 'plomb_formation',
    name: "Accord de formation aux métiers de la plomberie",
    category: 'btp_construction', price: 3000, priceMax: 10000,
    description: "Convention de formation professionnelle aux techniques de la plomberie sanitaire destinée aux artisans.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'stagiaire_nom', label: "Nom du stagiaire", type: 'text', required: true },
      { key: 'organisme_formation', label: "Organisme de formation", type: 'text', required: true },
      { key: 'intitule_formation', label: "Intitulé de la formation", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'cout_formation', label: "Coût de la formation (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FORMATION — MÉTIERS DE LA PLOMBERIE</h1>
<p>Stagiaire : <strong>{{stagiaire_nom}}</strong></p>
<p>Organisme : <strong>{{organisme_formation}}</strong></p>
<h2>Article 1 — Objet</h2>
<p>Formation intitulée : <strong>{{intitule_formation}}</strong>.</p>
<h2>Article 2 — Durée et calendrier</h2>
<p>Formation démarrant le {{date_debut}}. Programme détaillé joint en annexe.</p>
<h2>Article 3 — Coût</h2>
<p>Coût de la formation : <strong>{{cout_formation}} FCFA</strong>.</p>
<h2>Article 4 — Attestation</h2>
<p>Une attestation de formation sera délivrée à l'issue de la session.</p>
<p>Signatures : Stagiaire __________________ / Organisme __________________</p></div>`,
  },
  {
    code: 'plomb_charte',
    name: "Charte du plombier qualifié en Afrique",
    category: 'btp_construction', price: 2000, priceMax: 6000,
    description: "Document de référence définissant les engagements déontologiques et professionnels du plombier qualifié en Afrique francophone.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      { key: 'nom_professionnel', label: "Nom du professionnel", type: 'text', required: true },
      { key: 'numero_carte', label: "Numéro de carte professionnelle", type: 'text', required: true },
      { key: 'ville', label: "Ville d'exercice", type: 'text', required: true },
      { key: 'date_adhesion', label: "Date d'adhésion à la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DU PLOMBIER QUALIFIÉ EN AFRIQUE</h1>
<p>Je soussigné(e) <strong>{{nom_professionnel}}</strong>, titulaire de la carte professionnelle n° <strong>{{numero_carte}}</strong>, exerçant à {{ville}}, m'engage ce jour {{date_adhesion}} à respecter les principes suivants :</p>
<h2>Principes fondamentaux</h2>
<ol>
<li>Exercer mon métier avec intégrité, compétence et professionnalisme.</li>
<li>Respecter les normes techniques en vigueur et assurer la sécurité des usagers.</li>
<li>Utiliser uniquement des matériaux conformes aux normes de qualité reconnues.</li>
<li>Fournir des devis clairs et honnêtes avant toute intervention.</li>
<li>Respecter l'environnement dans l'élimination des déchets et effluents.</li>
<li>Me former continuellement pour maintenir mon niveau de compétence.</li>
</ol>
<p>Signature : __________________ Date : __________________</p></div>`,
  },

  // ─── 25 Électricité bâtiment ────────────────────────────────────────────────
  {
    code: 'elec2_inst_neuve',
    name: "Accord de service d'installation électrique neuve (tableau, circuits)",
    category: 'btp_construction', price: 5000, priceMax: 18000,
    description: "Contrat pour l'installation électrique complète d'un bâtiment neuf incluant tableau divisionnaire et circuits terminaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'adresse_chantier', label: "Adresse du chantier", type: 'text', required: true },
      { key: 'puissance_souscrite', label: "Puissance souscrite (kVA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début des travaux", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION ÉLECTRIQUE NEUVE</h1>
<p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Chantier : {{adresse_chantier}}</p>
<h2>Article 1 — Objet</h2>
<p>Réalisation de l'installation électrique neuve pour une puissance souscrite de <strong>{{puissance_souscrite}} kVA</strong> comprenant tableau général basse tension, circuits prise de courant, éclairage, force motrice.</p>
<h2>Article 2 — Normes</h2>
<p>Travaux conformes aux normes NF C 15-100 et aux prescriptions de la CIE (Côte d'Ivoire Énergie).</p>
<h2>Article 3 — Calendrier</h2>
<p>Début : {{date_debut}}.</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Maître d'ouvrage __________________ / Électricien __________________</p></div>`,
  },
  {
    code: 'elec2_renov',
    name: "Accord de service de rénovation électrique (mise aux normes)",
    category: 'btp_construction', price: 4000, priceMax: 14000,
    description: "Contrat de remise aux normes d'une installation électrique existante dans un bâtiment ancien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_batiment', label: "Adresse du bâtiment", type: 'text', required: true },
      { key: 'description_travaux', label: "Description des travaux de rénovation", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'montant_ht', label: "Montant HT (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RÉNOVATION ÉLECTRIQUE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Bâtiment : {{adresse_batiment}}</p>
<h2>Article 1 — Objet</h2>
<p>Rénovation et mise aux normes de l'installation électrique existante.</p>
<h2>Article 2 — Travaux prévus</h2>
<p>{{description_travaux}}</p>
<h2>Article 3 — Calendrier</h2>
<p>Démarrage le {{date_debut}}.</p>
<h2>Article 4 — Prix</h2>
<p>Montant HT : <strong>{{montant_ht}} FCFA</strong>. TVA en sus.</p>
<p>Signatures : Client __________________ / Électricien __________________</p></div>`,
  },
  {
    code: 'elec2_groupe',
    name: "Accord de service d'installation de groupe électrogène",
    category: 'btp_construction', price: 5000, priceMax: 20000,
    description: "Contrat de fourniture et installation d'un groupe électrogène de secours ou principal.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_site', label: "Adresse du site", type: 'text', required: true },
      { key: 'puissance_kva', label: "Puissance du groupe (kVA)", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
      { key: 'prix_ttc', label: "Prix TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION GROUPE ÉLECTROGÈNE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Site : {{adresse_site}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et installation d'un groupe électrogène de <strong>{{puissance_kva}} kVA</strong> avec armoire ATS (commutation automatique).</p>
<h2>Article 2 — Prestations</h2>
<p>Génie civil de la dalle, pose, raccordements électriques, essais de charge, formation exploitation.</p>
<h2>Article 3 — Date</h2>
<p>Installation le {{date_installation}}.</p>
<h2>Article 4 — Prix</h2>
<p>Prix TTC : <strong>{{prix_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'elec2_onduleur',
    name: "Accord de service d'installation d'onduleur et batterie (UPS)",
    category: 'btp_construction', price: 3500, priceMax: 12000,
    description: "Contrat de fourniture et pose d'un onduleur (UPS) avec banc de batteries pour alimentation sans interruption.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_installation', label: "Adresse d'installation", type: 'text', required: true },
      { key: 'puissance_kva', label: "Puissance UPS (kVA)", type: 'text', required: true },
      { key: 'autonomie_min', label: "Autonomie requise (minutes)", type: 'text', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION ONDULEUR (UPS)</h1>
<p>Client : <strong>{{client_nom}}</strong> — Site : {{adresse_installation}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et installation d'un onduleur de <strong>{{puissance_kva}} kVA</strong> avec autonomie de <strong>{{autonomie_min}} minutes</strong>.</p>
<h2>Article 2 — Prestations</h2>
<p>Pose de l'onduleur, raccordement réseau et charges, configuration, tests de basculement.</p>
<h2>Article 3 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Installateur __________________</p></div>`,
  },
  {
    code: 'elec2_solaire',
    name: "Accord de service d'installation solaire photovoltaïque (résidentiel)",
    category: 'btp_construction', price: 6000, priceMax: 25000,
    description: "Contrat de fourniture et installation d'une centrale solaire photovoltaïque raccordée ou autonome pour usage résidentiel.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_installation', label: "Adresse d'installation", type: 'text', required: true },
      { key: 'puissance_kwc', label: "Puissance crête (kWc)", type: 'text', required: true },
      { key: 'date_pose', label: "Date de pose", type: 'date', required: true },
      { key: 'prix_ttc', label: "Prix TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION SOLAIRE PHOTOVOLTAÏQUE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Site : {{adresse_installation}}</p>
<h2>Article 1 — Objet</h2>
<p>Installation d'une centrale solaire photovoltaïque de <strong>{{puissance_kwc}} kWc</strong> en toiture.</p>
<h2>Article 2 — Composants</h2>
<p>Panneaux solaires, onduleur réseau ou hybride, câblage DC/AC, coffrets de protection, mise à la terre.</p>
<h2>Article 3 — Date</h2>
<p>Pose prévue le {{date_pose}}.</p>
<h2>Article 4 — Prix</h2>
<p>Prix TTC : <strong>{{prix_ttc}} FCFA</strong> — 50 % à la commande, 50 % à la mise en service.</p>
<h2>Article 5 — Garantie</h2>
<p>Panneaux : 25 ans de rendement ; onduleur : 5 ans ; main-d'œuvre : 1 an.</p>
<p>Signatures : Client __________________ / Installateur __________________</p></div>`,
  },
  {
    code: 'elec2_clim',
    name: "Accord de service d'installation de climatisation split (VRF/VRV)",
    category: 'btp_construction', price: 4000, priceMax: 16000,
    description: "Contrat de fourniture et pose de systèmes de climatisation split ou VRF/VRV pour locaux résidentiels ou tertiaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_travaux', label: "Adresse des travaux", type: 'text', required: true },
      { key: 'nombre_unites', label: "Nombre d'unités intérieures", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION CLIMATISATION</h1>
<p>Client : <strong>{{client_nom}}</strong> — Adresse : {{adresse_travaux}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et installation de <strong>{{nombre_unites}} unités</strong> de climatisation (splits ou VRF/VRV).</p>
<h2>Article 2 — Prestations</h2>
<p>Pose des unités intérieures et extérieures, liaisons frigorifiques et électriques, condensats, mise en service et réglage.</p>
<h2>Article 3 — Date</h2>
<p>Installation le {{date_installation}}.</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Installateur __________________</p></div>`,
  },
  {
    code: 'elec2_domotique',
    name: "Accord de service d'installation de système domotique",
    category: 'btp_construction', price: 5000, priceMax: 20000,
    description: "Contrat d'installation d'un système domotique pour la gestion automatisée d'un bâtiment résidentiel.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_batiment', label: "Adresse du bâtiment", type: 'text', required: true },
      { key: 'fonctions_couvertes', label: "Fonctions couvertes (éclairage, volets, sécurité…)", type: 'textarea', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION SYSTÈME DOMOTIQUE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Bâtiment : {{adresse_batiment}}</p>
<h2>Article 1 — Objet</h2>
<p>Installation d'un système domotique couvrant les fonctions suivantes :</p>
<p>{{fonctions_couvertes}}</p>
<h2>Article 2 — Prestation</h2>
<p>Câblage, pose des capteurs et actionneurs, configuration de la centrale domotique, application mobile, formation.</p>
<h2>Article 3 — Date</h2>
<p>{{date_installation}}</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'elec2_cctv',
    name: "Accord de service d'installation de vidéosurveillance (CCTV)",
    category: 'btp_construction', price: 4000, priceMax: 14000,
    description: "Contrat de fourniture et installation d'un système de vidéosurveillance CCTV pour sécurisation de locaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_site', label: "Adresse du site", type: 'text', required: true },
      { key: 'nombre_cameras', label: "Nombre de caméras", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION VIDÉOSURVEILLANCE CCTV</h1>
<p>Client : <strong>{{client_nom}}</strong> — Site : {{adresse_site}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et installation d'un système de vidéosurveillance comprenant <strong>{{nombre_cameras}} caméras</strong>, enregistreur NVR/DVR, moniteur de contrôle.</p>
<h2>Article 2 — Prestations</h2>
<p>Pose des caméras, câblage, configuration de l'enregistreur, accès à distance via application mobile, formation.</p>
<h2>Article 3 — Date</h2>
<p>{{date_installation}}</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'elec2_controle_acces',
    name: "Accord de service d'installation de contrôle d'accès",
    category: 'btp_construction', price: 4000, priceMax: 14000,
    description: "Contrat de fourniture et installation d'un système de contrôle d'accès électronique (badges, biométrie).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_site', label: "Adresse du site", type: 'text', required: true },
      { key: 'type_controle', label: "Type de contrôle (badge, biométrie, code)", type: 'text', required: true },
      { key: 'nombre_points', label: "Nombre de points de contrôle", type: 'text', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION CONTRÔLE D'ACCÈS</h1>
<p>Client : <strong>{{client_nom}}</strong> — Site : {{adresse_site}}</p>
<h2>Article 1 — Objet</h2>
<p>Installation d'un système de contrôle d'accès de type <strong>{{type_controle}}</strong> sur <strong>{{nombre_points}} points</strong>.</p>
<h2>Article 2 — Prestations</h2>
<p>Pose des lecteurs, câblage, centrale de contrôle, logiciel de gestion, programmation des droits d'accès, formation.</p>
<h2>Article 3 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'elec2_alarme',
    name: "Accord de service d'installation d'alarme anti-intrusion",
    category: 'btp_construction', price: 3500, priceMax: 12000,
    description: "Contrat de fourniture et pose d'un système d'alarme anti-intrusion avec détecteurs et sirènes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_site', label: "Adresse du site", type: 'text', required: true },
      { key: 'nombre_detecteurs', label: "Nombre de détecteurs", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION ALARME ANTI-INTRUSION</h1>
<p>Client : <strong>{{client_nom}}</strong> — Site : {{adresse_site}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et installation d'un système d'alarme comprenant <strong>{{nombre_detecteurs}} détecteurs</strong>, centrale, sirène intérieure/extérieure, contacteur de porte, télécommandes.</p>
<h2>Article 2 — Prestations</h2>
<p>Pose, câblage ou radio-fréquence, programmation, formation à l'utilisation.</p>
<h2>Article 3 — Date</h2>
<p>{{date_installation}}</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'elec2_borne_ve',
    name: "Accord de service d'installation de borne de recharge VE",
    category: 'btp_construction', price: 4000, priceMax: 14000,
    description: "Contrat de fourniture et installation d'une borne de recharge pour véhicules électriques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_installation', label: "Adresse d'installation", type: 'text', required: true },
      { key: 'puissance_borne', label: "Puissance de la borne (kW)", type: 'text', required: true },
      { key: 'date_pose', label: "Date de pose", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION BORNE DE RECHARGE VE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Lieu : {{adresse_installation}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et installation d'une borne de recharge de <strong>{{puissance_borne}} kW</strong> pour véhicule électrique.</p>
<h2>Article 2 — Prestations</h2>
<p>Tirage de câble dédié depuis le tableau, pose de la borne, protection différentielle, mise en service.</p>
<h2>Article 3 — Date</h2>
<p>{{date_pose}}</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Électricien __________________</p></div>`,
  },
  {
    code: 'elec2_led',
    name: "Accord de service d'installation d'éclairage LED (bâtiment)",
    category: 'btp_construction', price: 3000, priceMax: 10000,
    description: "Contrat de remplacement ou installation neuve de luminaires LED dans un bâtiment tertiaire ou résidentiel.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_batiment', label: "Adresse du bâtiment", type: 'text', required: true },
      { key: 'nombre_points_lumineux', label: "Nombre de points lumineux", type: 'text', required: true },
      { key: 'date_intervention', label: "Date d'intervention", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION ÉCLAIRAGE LED</h1>
<p>Client : <strong>{{client_nom}}</strong> — Bâtiment : {{adresse_batiment}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et pose de <strong>{{nombre_points_lumineux}} points lumineux</strong> en technologie LED.</p>
<h2>Article 2 — Prestations</h2>
<p>Dépose des anciens luminaires, installation des armatures LED, raccordements, essais, rapport d'économies d'énergie estimées.</p>
<h2>Article 3 — Date</h2>
<p>{{date_intervention}}</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Électricien __________________</p></div>`,
  },
  {
    code: 'elec2_paratonnerre',
    name: "Accord de service d'installation de paratonnerre",
    category: 'btp_construction', price: 4000, priceMax: 14000,
    description: "Contrat de fourniture et installation d'un système de protection foudre (paratonnerre) sur bâtiment.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_batiment', label: "Adresse du bâtiment", type: 'text', required: true },
      { key: 'type_paratonnerre', label: "Type de paratonnerre (simple tige, ESE…)", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION DE PARATONNERRE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Bâtiment : {{adresse_batiment}}</p>
<h2>Article 1 — Objet</h2>
<p>Installation d'un paratonnerre de type <strong>{{type_paratonnerre}}</strong> conforme aux normes NF EN 62305.</p>
<h2>Article 2 — Prestations</h2>
<p>Pose de la pointe, conducteurs de descente, prises de terre, mesures de résistance de terre, attestation de conformité.</p>
<h2>Article 3 — Date</h2>
<p>{{date_installation}}</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'elec2_terre',
    name: "Accord de service d'installation de mise à la terre (équipotentialité)",
    category: 'btp_construction', price: 3000, priceMax: 10000,
    description: "Contrat de réalisation d'une prise de terre et liaisons équipotentielles conformes pour un bâtiment.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_batiment', label: "Adresse du bâtiment", type: 'text', required: true },
      { key: 'valeur_cible_ohm', label: "Valeur cible (Ohms)", type: 'text', required: true },
      { key: 'date_travaux', label: "Date des travaux", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — MISE À LA TERRE ET ÉQUIPOTENTIALITÉ</h1>
<p>Client : <strong>{{client_nom}}</strong> — Bâtiment : {{adresse_batiment}}</p>
<h2>Article 1 — Objet</h2>
<p>Réalisation de la prise de terre et des liaisons équipotentielles pour une résistance cible inférieure à <strong>{{valeur_cible_ohm}} Ω</strong>.</p>
<h2>Article 2 — Travaux</h2>
<p>Pose d'électrodes de terre, conducteurs de protection, barrette de coupure, mesures de résistance, certificat de mesure.</p>
<h2>Article 3 — Date</h2>
<p>{{date_travaux}}</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Électricien __________________</p></div>`,
  },
  {
    code: 'elec2_maintenance',
    name: "Accord de service de maintenance électrique (contrat)",
    category: 'btp_construction', price: 3000, priceMax: 10000,
    description: "Contrat de maintenance préventive et curative des installations électriques d'un site tertiaire ou industriel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client / Entreprise", type: 'text', required: true },
      { key: 'adresse_site', label: "Adresse du site", type: 'text', required: true },
      { key: 'frequence_maintenance', label: "Fréquence des interventions", type: 'text', required: true },
      { key: 'date_debut_contrat', label: "Date de début du contrat", type: 'date', required: true },
      { key: 'redevance_annuelle', label: "Redevance annuelle (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MAINTENANCE ÉLECTRIQUE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Site : {{adresse_site}}</p>
<h2>Article 1 — Objet</h2>
<p>Maintenance préventive et curative des installations électriques basse tension du site.</p>
<h2>Article 2 — Fréquence</h2>
<p>Visites préventives : <strong>{{frequence_maintenance}}</strong>. Interventions curatives dans les 24 heures ouvrables.</p>
<h2>Article 3 — Durée</h2>
<p>Contrat d'un (1) an prenant effet le {{date_debut_contrat}}, renouvelable par tacite reconduction.</p>
<h2>Article 4 — Redevance</h2>
<p>Redevance annuelle : <strong>{{redevance_annuelle}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'elec2_conformite',
    name: "Accord de service de vérification et conformité électrique (bureau de contrôle)",
    category: 'btp_construction', price: 3500, priceMax: 12000,
    description: "Convention de mission de vérification et d'attestation de conformité d'une installation électrique par un bureau de contrôle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'demandeur_nom', label: "Nom du demandeur", type: 'text', required: true },
      { key: 'bureau_controle', label: "Bureau de contrôle", type: 'text', required: true },
      { key: 'adresse_installation', label: "Adresse de l'installation", type: 'text', required: true },
      { key: 'date_visite', label: "Date de la visite", type: 'date', required: true },
      { key: 'honoraires_ttc', label: "Honoraires TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION — VÉRIFICATION CONFORMITÉ ÉLECTRIQUE</h1>
<p>Demandeur : <strong>{{demandeur_nom}}</strong> — Bureau de contrôle : <strong>{{bureau_controle}}</strong></p>
<h2>Article 1 — Objet</h2>
<p>Vérification initiale et délivrance d'une attestation de conformité de l'installation électrique sise à {{adresse_installation}}.</p>
<h2>Article 2 — Mission</h2>
<p>Examen des plans, vérifications visuelles et essais selon NF C 16-600, rédaction du rapport et de l'attestation.</p>
<h2>Article 3 — Date de visite</h2>
<p>{{date_visite}}</p>
<h2>Article 4 — Honoraires</h2>
<p>Honoraires TTC : <strong>{{honoraires_ttc}} FCFA</strong>.</p>
<p>Signatures : Demandeur __________________ / Bureau de contrôle __________________</p></div>`,
  },
  {
    code: 'elec2_vdi',
    name: "Accord de service d'installation de réseau VDI (data, voix, images)",
    category: 'btp_construction', price: 4000, priceMax: 14000,
    description: "Contrat d'installation d'un réseau courants faibles VDI (voix, données, images) dans un bâtiment tertiaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_batiment', label: "Adresse du bâtiment", type: 'text', required: true },
      { key: 'nombre_prises', label: "Nombre de prises RJ45 / téléphone", type: 'text', required: true },
      { key: 'date_travaux', label: "Date des travaux", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RÉSEAU VDI</h1>
<p>Client : <strong>{{client_nom}}</strong> — Bâtiment : {{adresse_batiment}}</p>
<h2>Article 1 — Objet</h2>
<p>Installation d'un réseau VDI comprenant <strong>{{nombre_prises}} prises</strong> RJ45/téléphonie et baie de brassage.</p>
<h2>Article 2 — Prestations</h2>
<p>Tirage de câbles Cat 6A, pose des prises murales, installation de la baie de brassage, tests de certification.</p>
<h2>Article 3 — Date</h2>
<p>{{date_travaux}}</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'elec2_cablage_info',
    name: "Accord de service de câblage réseau informatique",
    category: 'btp_construction', price: 3000, priceMax: 10000,
    description: "Contrat de câblage structuré pour réseau informatique local (LAN) dans des locaux professionnels.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_locaux', label: "Adresse des locaux", type: 'text', required: true },
      { key: 'nombre_postes', label: "Nombre de postes informatiques", type: 'text', required: true },
      { key: 'date_intervention', label: "Date d'intervention", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CÂBLAGE RÉSEAU INFORMATIQUE</h1>
<p>Client : <strong>{{client_nom}}</strong> — Locaux : {{adresse_locaux}}</p>
<h2>Article 1 — Objet</h2>
<p>Câblage structuré pour <strong>{{nombre_postes}} postes</strong> informatiques (réseau LAN).</p>
<h2>Article 2 — Prestations</h2>
<p>Tirage de câbles Ethernet, pose de switch, tests de débit et connexion, documentation du réseau.</p>
<h2>Article 3 — Date</h2>
<p>{{date_intervention}}</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Technicien __________________</p></div>`,
  },
  {
    code: 'elec2_incendie',
    name: "Accord de service d'installation de centrale de détection incendie",
    category: 'btp_construction', price: 5000, priceMax: 18000,
    description: "Contrat de fourniture et installation d'une centrale de détection automatique d'incendie (DAI) conforme aux normes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'adresse_batiment', label: "Adresse du bâtiment", type: 'text', required: true },
      { key: 'nombre_detecteurs', label: "Nombre de détecteurs", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CENTRALE DE DÉTECTION INCENDIE</h1>
<p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong> — Bâtiment : {{adresse_batiment}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et installation d'une centrale de détection automatique d'incendie avec <strong>{{nombre_detecteurs}} détecteurs</strong>.</p>
<h2>Article 2 — Prestations</h2>
<p>Centrale adressable, détecteurs thermiques et fumée, déclencheurs manuels, sirènes, câblage résistant au feu CR1, mise en service et tests.</p>
<h2>Article 3 — Conformité</h2>
<p>Installation conforme aux prescriptions des sapeurs-pompiers et à la norme NF S 61-936.</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Maître d'ouvrage __________________ / Installateur __________________</p></div>`,
  },
  {
    code: 'elec2_sonorisation',
    name: "Accord de service d'installation de système de sonorisation",
    category: 'btp_construction', price: 3500, priceMax: 12000,
    description: "Contrat de fourniture et installation d'un système de sonorisation pour salle de conférence, mosquée, église ou espace commercial.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'adresse_lieu', label: "Adresse du lieu", type: 'text', required: true },
      { key: 'type_espace', label: "Type d'espace (salle, culte, commercial…)", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
      { key: 'montant_ttc', label: "Montant TTC (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — INSTALLATION SONORISATION</h1>
<p>Client : <strong>{{client_nom}}</strong> — Lieu : {{adresse_lieu}} ({{type_espace}})</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture et installation d'un système de sonorisation adapté à l'espace.</p>
<h2>Article 2 — Matériel</h2>
<p>Amplificateurs, enceintes, microphones, câblage, table de mixage, configuration acoustique.</p>
<h2>Article 3 — Date</h2>
<p>{{date_installation}}</p>
<h2>Article 4 — Prix</h2>
<p>Montant TTC : <strong>{{montant_ttc}} FCFA</strong>.</p>
<p>Signatures : Client __________________ / Prestataire __________________</p></div>`,
  },
  {
    code: 'elec2_fourniture',
    name: "Accord de fourniture de matériel électrique",
    category: 'btp_construction', price: 2500, priceMax: 9000,
    description: "Bon de commande et accord de fourniture de matériel électrique entre fournisseur et professionnel ou particulier.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'acheteur_nom', label: "Nom de l'acheteur", type: 'text', required: true },
      { key: 'fournisseur_nom', label: "Nom du fournisseur", type: 'text', required: true },
      { key: 'designation_materiel', label: "Désignation du matériel", type: 'textarea', required: true },
      { key: 'date_livraison', label: "Date de livraison souhaitée", type: 'date', required: true },
      { key: 'montant_commande', label: "Montant de la commande (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>ACCORD DE FOURNITURE — MATÉRIEL ÉLECTRIQUE</h1>
<p>Acheteur : <strong>{{acheteur_nom}}</strong> — Fournisseur : <strong>{{fournisseur_nom}}</strong></p>
<h2>Article 1 — Désignation</h2>
<p>{{designation_materiel}}</p>
<h2>Article 2 — Livraison</h2>
<p>Date souhaitée : {{date_livraison}}.</p>
<h2>Article 3 — Prix</h2>
<p>Montant total : <strong>{{montant_commande}} FCFA</strong> TTC.</p>
<h2>Article 4 — Garantie produits</h2>
<p>Garantie fabricant de 12 à 24 mois selon produits. Retours acceptés dans les 7 jours en cas de défaut avéré.</p>
<p>Signatures : Acheteur __________________ / Fournisseur __________________</p></div>`,
  },
  {
    code: 'elec2_reception',
    name: "Rapport de réception de travaux électriques",
    category: 'btp_construction', price: 2000, priceMax: 6000,
    description: "Procès-verbal de réception contradictoire des travaux électriques entre maître d'ouvrage et électricien.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'electricien', label: "Électricien / Entrepreneur", type: 'text', required: true },
      { key: 'objet_travaux', label: "Objet des travaux", type: 'textarea', required: true },
      { key: 'date_reception', label: "Date de réception", type: 'date', required: true },
      { key: 'reserves', label: "Réserves éventuelles", type: 'textarea', required: false },
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL DE RÉCEPTION DE TRAVAUX ÉLECTRIQUES</h1>
<p>Maître d'ouvrage : <strong>{{maitre_ouvrage}}</strong></p>
<p>Électricien : <strong>{{electricien}}</strong></p>
<h2>Article 1 — Objet des travaux</h2>
<p>{{objet_travaux}}</p>
<h2>Article 2 — Date</h2>
<p>Réception prononcée le {{date_reception}}.</p>
<h2>Article 3 — Réserves</h2>
<p>{{reserves}}</p>
<h2>Article 4 — Garantie</h2>
<p>La réception fait courir le délai de garantie de parfait achèvement d'un (1) an.</p>
<p>Maître d'ouvrage : __________________ / Électricien : __________________</p></div>`,
  },
  {
    code: 'elec2_plan_exec',
    name: "Plan d'exécution électrique (schéma unifilaire)",
    category: 'btp_construction', price: 3000, priceMax: 10000,
    description: "Note technique accompagnant un schéma unifilaire et plan d'exécution électrique pour un chantier.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      { key: 'projet_nom', label: "Nom du projet", type: 'text', required: true },
      { key: 'adresse_projet', label: "Adresse du projet", type: 'text', required: true },
      { key: 'maitre_oeuvre', label: "Maître d'œuvre", type: 'text', required: true },
      { key: 'date_document', label: "Date du document", type: 'date', required: true },
      { key: 'indice_revision', label: "Indice de révision", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>NOTE TECHNIQUE — PLAN D'EXÉCUTION ÉLECTRIQUE</h1>
<p>Projet : <strong>{{projet_nom}}</strong> — Adresse : {{adresse_projet}}</p>
<p>Maître d'œuvre : <strong>{{maitre_oeuvre}}</strong> — Date : {{date_document}} — Indice : {{indice_revision}}</p>
<h2>1. Objet</h2>
<p>La présente note accompagne le schéma unifilaire et définit les exigences d'exécution de l'installation électrique.</p>
<h2>2. Normes de référence</h2>
<p>NF C 15-100, prescriptions de la CIE, normes IEC applicables.</p>
<h2>3. Matériels</h2>
<p>Câbles NF, appareillage certifié, tableau électrique étanche ou encastré selon usage.</p>
<h2>4. Essais obligatoires</h2>
<p>Mesure d'isolement, continuité des conducteurs de protection, essai de fonctionnement disjoncteurs différentiels.</p>
<p>Établi par : __________________ Vérifié par : __________________</p></div>`,
  },
  {
    code: 'elec2_formation',
    name: "Accord de formation électricité bâtiment",
    category: 'btp_construction', price: 3000, priceMax: 10000,
    description: "Convention de formation professionnelle aux techniques de l'électricité bâtiment destinée aux artisans et techniciens.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      { key: 'stagiaire_nom', label: "Nom du stagiaire", type: 'text', required: true },
      { key: 'organisme_formation', label: "Organisme de formation", type: 'text', required: true },
      { key: 'intitule_formation', label: "Intitulé de la formation", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'cout_formation', label: "Coût de la formation (FCFA)", type: 'text', required: true },
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FORMATION — ÉLECTRICITÉ BÂTIMENT</h1>
<p>Stagiaire : <strong>{{stagiaire_nom}}</strong></p>
<p>Organisme : <strong>{{organisme_formation}}</strong></p>
<h2>Article 1 — Formation</h2>
<p>Intitulé : <strong>{{intitule_formation}}</strong></p>
<h2>Article 2 — Calendrier</h2>
<p>Démarrage le {{date_debut}}. Programme joint en annexe.</p>
<h2>Article 3 — Coût</h2>
<p>Coût total : <strong>{{cout_formation}} FCFA</strong>.</p>
<h2>Article 4 — Habilitation</h2>
<p>À l'issue de la formation, le stagiaire recevra une attestation d'habilitation électrique selon niveau atteint (B0, B1, B2, BR…).</p>
<p>Signatures : Stagiaire __________________ / Organisme __________________</p></div>`,
  },
  {
    code: 'elec2_charte',
    name: "Charte de l'électricien qualifié en Afrique",
    category: 'btp_construction', price: 2000, priceMax: 6000,
    description: "Document de référence définissant les engagements déontologiques et professionnels de l'électricien qualifié en Afrique francophone.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 51,
    fieldsJson: F([
      { key: 'nom_professionnel', label: "Nom du professionnel", type: 'text', required: true },
      { key: 'numero_carte', label: "Numéro de carte professionnelle", type: 'text', required: true },
      { key: 'ville', label: "Ville d'exercice", type: 'text', required: true },
      { key: 'date_adhesion', label: "Date d'adhésion à la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ÉLECTRICIEN QUALIFIÉ EN AFRIQUE</h1>
<p>Je soussigné(e) <strong>{{nom_professionnel}}</strong>, titulaire de la carte professionnelle n° <strong>{{numero_carte}}</strong>, exerçant à {{ville}}, m'engage ce jour {{date_adhesion}} à respecter les principes suivants :</p>
<h2>Principes fondamentaux</h2>
<ol>
<li>Exercer mon métier avec rigueur, honnêteté et professionnalisme.</li>
<li>Respecter les normes techniques en vigueur et garantir la sécurité des personnes et des biens.</li>
<li>Utiliser uniquement des matériaux et équipements certifiés et conformes.</li>
<li>Établir des devis transparents et ne facturer que les prestations réalisées.</li>
<li>Tenir à jour mes connaissances par la formation continue.</li>
<li>Respecter l'environnement dans mes pratiques professionnelles.</li>
</ol>
<p>Signature : __________________ Date : __________________</p></div>`,
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
  console.log(`Batch 99a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
