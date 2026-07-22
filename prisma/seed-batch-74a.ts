import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ============================================================
  // 25 TEMPLATES HÔTELLERIE AVANCÉE (préfixe gest_, commercial_financier)
  // ============================================================
  {
    code: 'gest_management_contract',
    name: "Contrat de Direction Hôtelière (Management Contract)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 45000,
    description: "Contrat de gestion hôtelière confiant l'exploitation d'un établissement à une société opératrice spécialisée, conforme aux standards OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'nom_hotel', label: "Nom de l'établissement hôtelier", type: 'text', required: true },
      { key: 'societe_gestionnaire', label: "Dénomination de la société gestionnaire", type: 'text', required: true },
      { key: 'date_prise_effet', label: "Date de prise d'effet du contrat", type: 'date', required: true },
      { key: 'duree_contrat', label: "Durée du contrat (en années)", type: 'text', required: true },
      { key: 'honoraires_gestion', label: "Honoraires de gestion (% du chiffre d'affaires)", type: 'text', required: true },
      { key: 'objectifs_performance', label: "Objectifs de performance (RevPAR cible)", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DIRECTION HÔTELIÈRE</h1><h2>MANAGEMENT CONTRACT</h2><p>Entre les soussignés :</p><p><strong>L'ÉTABLISSEMENT :</strong> {{nom_hotel}}, ci-après dénommé le Propriétaire,</p><p><strong>LA SOCIÉTÉ GESTIONNAIRE :</strong> {{societe_gestionnaire}}, ci-après dénommée l'Opérateur,</p><h3>Article 1 – Objet du contrat</h3><p>Le Propriétaire confie à l'Opérateur la direction, la gestion et l'exploitation de l'établissement hôtelier {{nom_hotel}} selon les termes du présent contrat.</p><h3>Article 2 – Durée</h3><p>Le présent contrat prend effet le {{date_prise_effet}} pour une durée de {{duree_contrat}} années.</p><h3>Article 3 – Honoraires</h3><p>Les honoraires de gestion sont fixés à {{honoraires_gestion}} du chiffre d'affaires hors taxes réalisé.</p><h3>Article 4 – Objectifs de performance</h3><p>{{objectifs_performance}}</p><h3>Article 5 – Droit applicable</h3><p>Le présent contrat est soumis au droit OHADA et aux lois en vigueur en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'gest_franchise_hoteliere',
    name: "Accord de Franchise Hôtelière (modèle Radisson / Pullman)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 55000,
    description: "Accord de franchise hôtelière internationale autorisant l'usage d'une marque et de ses standards, adapté au contexte OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'franchiseur', label: "Nom du franchiseur (marque hôtelière)", type: 'text', required: true },
      { key: 'franchise', label: "Nom du franchisé (propriétaire hôtel)", type: 'text', required: true },
      { key: 'nom_hotel', label: "Nom et adresse de l'hôtel franchisé", type: 'text', required: true },
      { key: 'redevance_franchise', label: "Redevance de franchise (%)", type: 'text', required: true },
      { key: 'date_ouverture', label: "Date d'ouverture sous enseigne", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE FRANCHISE HÔTELIÈRE</h1><p><strong>FRANCHISEUR :</strong> {{franchiseur}}</p><p><strong>FRANCHISÉ :</strong> {{franchise}}</p><p><strong>ÉTABLISSEMENT :</strong> {{nom_hotel}}</p><h3>Article 1 – Concession de franchise</h3><p>Le Franchiseur concède au Franchisé le droit d'exploiter l'établissement {{nom_hotel}} sous sa marque et ses standards opérationnels à compter du {{date_ouverture}}.</p><h3>Article 2 – Redevances</h3><p>Le Franchisé versera une redevance de franchise de {{redevance_franchise}} du chiffre d'affaires hébergement mensuel.</p><h3>Article 3 – Standards de la marque</h3><p>Le Franchisé s'engage à respecter l'ensemble des standards de qualité, de service et d'image définis par le Franchiseur.</p><h3>Article 4 – Contrôle et audit</h3><p>Le Franchiseur dispose d'un droit d'audit et d'inspection à tout moment avec préavis raisonnable.</p></div>`
  },
  {
    code: 'gest_revenue_management',
    name: "Accord de Service de Revenue Management Hôtelier",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Convention de prestation de service de revenue management visant l'optimisation du revenu par chambre disponible (RevPAR).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'prestataire_rm', label: "Prestataire Revenue Management", type: 'text', required: true },
      { key: 'hotel_client', label: "Hôtel client", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de la prestation", type: 'date', required: true },
      { key: 'honoraires_mensuels', label: "Honoraires mensuels (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REVENUE MANAGEMENT</h1><p><strong>PRESTATAIRE :</strong> {{prestataire_rm}}</p><p><strong>HÔTEL CLIENT :</strong> {{hotel_client}}</p><h3>Article 1 – Objet</h3><p>Le Prestataire assure la gestion tarifaire, l'optimisation du taux d'occupation et du RevPAR de l'établissement {{hotel_client}} à compter du {{date_debut}}.</p><h3>Article 2 – Missions</h3><p>Analyse de la demande, fixation dynamique des tarifs, gestion des canaux de distribution, reporting hebdomadaire de performance.</p><h3>Article 3 – Rémunération</h3><p>Honoraires mensuels fixes : {{honoraires_mensuels}} FCFA, plus bonus de performance selon atteinte des objectifs RevPAR.</p></div>`
  },
  {
    code: 'gest_yield_management',
    name: "Accord de Service de Yield Management Hôtelier",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Convention de prestation de yield management pour l'optimisation de la recette unitaire et du remplissage de l'hôtel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'prestataire_yield', label: "Prestataire Yield Management", type: 'text', required: true },
      { key: 'hotel_client', label: "Hôtel client", type: 'text', required: true },
      { key: 'date_debut', label: "Date de prise en charge", type: 'date', required: true },
      { key: 'objectif_taux', label: "Objectif de taux d'occupation cible (%)", type: 'text', required: true },
      { key: 'honoraires', label: "Honoraires (FCFA/mois)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE YIELD MANAGEMENT</h1><p><strong>PRESTATAIRE :</strong> {{prestataire_yield}}</p><p><strong>HÔTEL :</strong> {{hotel_client}}</p><h3>Article 1 – Mission de Yield Management</h3><p>À compter du {{date_debut}}, le Prestataire met en œuvre une stratégie de yield management visant un taux d'occupation cible de {{objectif_taux}}%.</p><h3>Article 2 – Outils et méthodes</h3><p>Segmentation clientèle, tarification différenciée, gestion des restrictions, analyse concurrentielle en temps réel.</p><h3>Article 3 – Honoraires</h3><p>{{honoraires}} FCFA par mois, révisables trimestriellement selon les résultats obtenus.</p></div>`
  },
  {
    code: 'gest_conciergerie',
    name: "Accord de Service de Conciergerie Hôtelière",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Convention de service de conciergerie hôtelière haut de gamme pour la prise en charge personnalisée des clients.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'hotel_client', label: "Établissement hôtelier", type: 'text', required: true },
      { key: 'responsable_conciergerie', label: "Responsable conciergerie (Chef Concierge)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de service", type: 'date', required: true },
      { key: 'perimetre_services', label: "Périmètre des services de conciergerie", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONCIERGERIE HÔTELIÈRE</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>CHEF CONCIERGE :</strong> {{responsable_conciergerie}}</p><h3>Article 1 – Objet</h3><p>Le présent accord définit les conditions dans lesquelles le service de conciergerie sera assuré au sein de l'établissement {{hotel_client}} à compter du {{date_debut}}.</p><h3>Article 2 – Périmètre des prestations</h3><p>{{perimetre_services}}</p><h3>Article 3 – Standards de service</h3><p>Le service de conciergerie respecte les normes Les Clefs d'Or et les standards cinq étoiles applicables en Afrique de l'Ouest.</p></div>`
  },
  {
    code: 'gest_restauration_gastronomique',
    name: "Accord de Service de Restauration Gastronomique (Chef Étoilé)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 30000,
    description: "Convention d'exploitation du restaurant gastronomique d'un hôtel sous la direction d'un chef étoilé ou de renom.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel propriétaire du restaurant", type: 'text', required: true },
      { key: 'chef_etoile', label: "Nom et titre du chef gastronomique", type: 'text', required: true },
      { key: 'nom_restaurant', label: "Nom du restaurant", type: 'text', required: true },
      { key: 'date_ouverture', label: "Date d'ouverture du restaurant", type: 'date', required: true },
      { key: 'partage_revenus', label: "Modalités de partage des revenus", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RESTAURATION GASTRONOMIQUE</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>CHEF GASTRONOMIQUE :</strong> {{chef_etoile}}</p><p><strong>RESTAURANT :</strong> {{nom_restaurant}}</p><h3>Article 1 – Objet</h3><p>{{hotel_client}} confie à {{chef_etoile}} la direction artistique et culinaire du restaurant {{nom_restaurant}} à compter du {{date_ouverture}}.</p><h3>Article 2 – Obligations du Chef</h3><p>Conception des menus, supervision des brigades, formation des équipes, présence physique selon planning convenu.</p><h3>Article 3 – Rémunération et partage</h3><p>{{partage_revenus}}</p></div>`
  },
  {
    code: 'gest_banquet_seminaire',
    name: "Accord de Service de Banquet et Séminaire Hôtelier",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Convention régissant l'organisation et la prestation de services banquets, conférences et séminaires au sein d'un hôtel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel prestataire", type: 'text', required: true },
      { key: 'client_organisateur', label: "Client organisateur de l'événement", type: 'text', required: true },
      { key: 'date_evenement', label: "Date de l'événement", type: 'date', required: true },
      { key: 'type_evenement', label: "Type d'événement (banquet, séminaire, conférence)", type: 'text', required: true },
      { key: 'budget_estime', label: "Budget estimé (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BANQUET ET SÉMINAIRE</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>ORGANISATEUR :</strong> {{client_organisateur}}</p><h3>Article 1 – Événement</h3><p>{{hotel_client}} s'engage à organiser le {{type_evenement}} prévu le {{date_evenement}} pour le compte de {{client_organisateur}}.</p><h3>Article 2 – Prestations incluses</h3><p>Mise à disposition des salles, équipements audiovisuels, service de restauration, coordination technique et logistique.</p><h3>Article 3 – Budget</h3><p>Budget global estimé : {{budget_estime}} FCFA, sous réserve d'ajustement selon les options retenues.</p></div>`
  },
  {
    code: 'gest_wedding_planner',
    name: "Accord de Service de Wedding Planner Hôtelier",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 20000,
    description: "Convention de service de planification et d'organisation de mariage au sein d'un établissement hôtelier en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel prestataire", type: 'text', required: true },
      { key: 'futurs_maries', label: "Noms des futurs époux", type: 'text', required: true },
      { key: 'date_mariage', label: "Date du mariage", type: 'date', required: true },
      { key: 'nombre_invites', label: "Nombre d'invités prévus", type: 'text', required: true },
      { key: 'budget_total', label: "Budget total alloué (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE WEDDING PLANNER HÔTELIER</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>ÉPOUX :</strong> {{futurs_maries}}</p><h3>Article 1 – Organisation du mariage</h3><p>{{hotel_client}} assure la planification complète du mariage de {{futurs_maries}}, prévu le {{date_mariage}} pour {{nombre_invites}} invités.</p><h3>Article 2 – Prestations</h3><p>Décoration, traiteur, animation, coordination cérémonie, hébergement des invités, coordination prestataires externes.</p><h3>Article 3 – Budget</h3><p>Budget global : {{budget_total}} FCFA. Un acompte de 30% est exigible à la signature.</p></div>`
  },
  {
    code: 'gest_spa_bien_etre',
    name: "Accord de Service de Spa et Bien-être Hôtelier",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 15000,
    description: "Convention de gestion ou de prestation du centre spa et bien-être intégré à un établissement hôtelier.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel propriétaire du spa", type: 'text', required: true },
      { key: 'operateur_spa', label: "Opérateur du spa", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début d'exploitation", type: 'date', required: true },
      { key: 'redevance', label: "Redevance ou commission convenue", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SPA ET BIEN-ÊTRE HÔTELIER</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>OPÉRATEUR SPA :</strong> {{operateur_spa}}</p><h3>Article 1 – Objet</h3><p>{{hotel_client}} confie à {{operateur_spa}} l'exploitation du centre spa à compter du {{date_debut}}.</p><h3>Article 2 – Prestations</h3><p>Massages, soins du corps et du visage, hammam, balnéothérapie, produits bien-être de qualité premium.</p><h3>Article 3 – Rémunération</h3><p>Redevance convenue : {{redevance}}. Reversement mensuel sur présentation des relevés de chiffre d'affaires.</p></div>`
  },
  {
    code: 'gest_fitness_center',
    name: "Accord de Service de Fitness Center Hôtelier",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Convention de gestion du centre de fitness et de remise en forme intégré à un hôtel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel propriétaire", type: 'text', required: true },
      { key: 'gestionnaire_fitness', label: "Gestionnaire du fitness center", type: 'text', required: true },
      { key: 'date_debut', label: "Date de prise en gestion", type: 'date', required: true },
      { key: 'equipements', label: "Description des équipements mis à disposition", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FITNESS CENTER HÔTELIER</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>GESTIONNAIRE :</strong> {{gestionnaire_fitness}}</p><h3>Article 1 – Objet</h3><p>{{gestionnaire_fitness}} assure la gestion et l'animation du fitness center de l'hôtel {{hotel_client}} à compter du {{date_debut}}.</p><h3>Article 2 – Équipements</h3><p>{{equipements}}</p><h3>Article 3 – Horaires et accès</h3><p>Le fitness center est accessible 7j/7 aux clients de l'hôtel. Des abonnements externes peuvent être proposés selon accord spécifique.</p></div>`
  },
  {
    code: 'gest_piscine_aquagym',
    name: "Accord de Service de Piscine et Aqua-Gym Hôtelier",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Convention de gestion du bassin de natation et des activités aquatiques d'un établissement hôtelier.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel propriétaire de la piscine", type: 'text', required: true },
      { key: 'responsable_piscine', label: "Responsable piscine et aqua-gym", type: 'text', required: true },
      { key: 'date_debut', label: "Date de prise de fonction", type: 'date', required: true },
      { key: 'normes_securite', label: "Normes de sécurité applicables", type: 'textarea', required: false }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PISCINE ET AQUA-GYM</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>RESPONSABLE :</strong> {{responsable_piscine}}</p><h3>Article 1 – Objet</h3><p>{{responsable_piscine}} assure la gestion, la surveillance et l'animation des espaces piscine et aqua-gym de l'hôtel {{hotel_client}} depuis le {{date_debut}}.</p><h3>Article 2 – Sécurité</h3><p>{{normes_securite}}</p><h3>Article 3 – Entretien</h3><p>Maintenance quotidienne du bassin, contrôle de la qualité de l'eau, respect des normes sanitaires en vigueur en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'gest_securite_hoteliere',
    name: "Accord de Service de Sécurité Hôtelière (Sûreté)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Convention de prestation de services de sécurité et de sûreté pour un établissement hôtelier, incluant gardiennage et contrôle des accès.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel client", type: 'text', required: true },
      { key: 'societe_securite', label: "Société de sécurité prestataire", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de prestation", type: 'date', required: true },
      { key: 'effectif_agents', label: "Nombre d'agents de sécurité déployés", type: 'text', required: true },
      { key: 'cout_mensuel', label: "Coût mensuel du service (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SÉCURITÉ HÔTELIÈRE</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>PRESTATAIRE SÉCURITÉ :</strong> {{societe_securite}}</p><h3>Article 1 – Objet</h3><p>{{societe_securite}} assure la sécurité et la sûreté de l'établissement {{hotel_client}} à compter du {{date_debut}}.</p><h3>Article 2 – Dispositif</h3><p>Déploiement de {{effectif_agents}} agents qualifiés, surveillance périmétrique, contrôle des accès, rondes de nuit, vidéosurveillance.</p><h3>Article 3 – Rémunération</h3><p>Coût mensuel : {{cout_mensuel}} FCFA, payable en début de mois.</p></div>`
  },
  {
    code: 'gest_blanchisserie',
    name: "Accord de Service de Blanchisserie Hôtelière",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 8000,
    description: "Convention de prestation de blanchisserie industrielle pour le linge de lit, de bain et les uniformes du personnel hôtelier.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel client", type: 'text', required: true },
      { key: 'prestataire_blanchisserie', label: "Prestataire blanchisserie", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de contrat", type: 'date', required: true },
      { key: 'volume_linge', label: "Volume estimé de linge mensuel (kg)", type: 'text', required: true },
      { key: 'tarif_kg', label: "Tarif au kilogramme (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BLANCHISSERIE HÔTELIÈRE</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>PRESTATAIRE :</strong> {{prestataire_blanchisserie}}</p><h3>Article 1 – Objet</h3><p>{{prestataire_blanchisserie}} assure le lavage, séchage, repassage et livraison du linge de l'hôtel {{hotel_client}} depuis le {{date_debut}}.</p><h3>Article 2 – Volume</h3><p>Volume mensuel estimé : {{volume_linge}} kg. Tarif unitaire : {{tarif_kg}} FCFA/kg.</p><h3>Article 3 – Délais</h3><p>Enlèvement quotidien, restitution sous 24 heures maximum pour le linge standard.</p></div>`
  },
  {
    code: 'gest_maintenance_technique',
    name: "Accord de Service de Maintenance Technique Hôtelière",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Convention de maintenance préventive et curative des équipements techniques d'un établissement hôtelier (CVC, plomberie, électricité).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel client", type: 'text', required: true },
      { key: 'societe_maintenance', label: "Société de maintenance technique", type: 'text', required: true },
      { key: 'date_debut', label: "Date de prise en charge", type: 'date', required: true },
      { key: 'perimetre_technique', label: "Périmètre technique couvert (CVC, électricité, etc.)", type: 'textarea', required: true },
      { key: 'forfait_mensuel', label: "Forfait mensuel de maintenance (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MAINTENANCE TECHNIQUE HÔTELIÈRE</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>PRESTATAIRE TECHNIQUE :</strong> {{societe_maintenance}}</p><h3>Article 1 – Objet</h3><p>{{societe_maintenance}} assure la maintenance préventive et curative des installations techniques de l'hôtel {{hotel_client}} à compter du {{date_debut}}.</p><h3>Article 2 – Périmètre</h3><p>{{perimetre_technique}}</p><h3>Article 3 – Rémunération</h3><p>Forfait mensuel : {{forfait_mensuel}} FCFA, incluant les interventions préventives. Les interventions curatives majeures font l'objet de devis séparés.</p></div>`
  },
  {
    code: 'gest_decoration_renovation',
    name: "Accord de Service de Décoration et Rénovation Hôtelière",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 25000,
    description: "Convention de prestation de design intérieur et de rénovation des espaces communs et des chambres d'un hôtel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel maître d'ouvrage", type: 'text', required: true },
      { key: 'agence_design', label: "Agence de décoration / bureau d'études", type: 'text', required: true },
      { key: 'perimetre_travaux', label: "Périmètre des travaux de rénovation", type: 'textarea', required: true },
      { key: 'budget_renovation', label: "Budget global de rénovation (FCFA)", type: 'text', required: true },
      { key: 'date_livraison', label: "Date de livraison prévue", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉCORATION ET RÉNOVATION HÔTELIÈRE</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>AGENCE :</strong> {{agence_design}}</p><h3>Article 1 – Mission</h3><p>{{agence_design}} assure la conception, la coordination et le suivi des travaux de décoration et de rénovation de l'hôtel {{hotel_client}}.</p><h3>Article 2 – Périmètre</h3><p>{{perimetre_travaux}}</p><h3>Article 3 – Budget et délais</h3><p>Budget : {{budget_renovation}} FCFA. Livraison au plus tard le {{date_livraison}}.</p></div>`
  },
  {
    code: 'gest_partenariat_aerien',
    name: "Accord de Partenariat Hôtel – Compagnie Aérienne",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Convention de partenariat commercial entre un hôtel et une compagnie aérienne pour des offres combinées hébergement-vol.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'hotel_partenaire', label: "Hôtel partenaire", type: 'text', required: true },
      { key: 'compagnie_aerienne', label: "Compagnie aérienne partenaire", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du partenariat", type: 'date', required: true },
      { key: 'avantages_mutuels', label: "Description des avantages mutuels convenus", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT HÔTEL – COMPAGNIE AÉRIENNE</h1><p><strong>HÔTEL :</strong> {{hotel_partenaire}}</p><p><strong>COMPAGNIE AÉRIENNE :</strong> {{compagnie_aerienne}}</p><h3>Article 1 – Objet</h3><p>Le présent accord établit un partenariat commercial entre {{hotel_partenaire}} et {{compagnie_aerienne}} à compter du {{date_debut}}.</p><h3>Article 2 – Avantages mutuels</h3><p>{{avantages_mutuels}}</p><h3>Article 3 – Promotion croisée</h3><p>Les parties s'engagent à promouvoir mutuellement leurs services via leurs canaux de communication respectifs.</p></div>`
  },
  {
    code: 'gest_partenariat_tour_operateur',
    name: "Accord de Partenariat Hôtel – Tour Opérateur",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 15000,
    description: "Convention de partenariat entre un hôtel et un tour opérateur pour l'allocation de chambres et la commercialisation de séjours.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'hotel_partenaire', label: "Hôtel partenaire", type: 'text', required: true },
      { key: 'tour_operateur', label: "Tour opérateur partenaire", type: 'text', required: true },
      { key: 'date_debut', label: "Date de prise d'effet", type: 'date', required: true },
      { key: 'allocation_chambres', label: "Allocation de chambres contractuelles (nombre)", type: 'text', required: true },
      { key: 'tarif_net', label: "Tarif net négocié (FCFA/nuit)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT HÔTEL – TOUR OPÉRATEUR</h1><p><strong>HÔTEL :</strong> {{hotel_partenaire}}</p><p><strong>TOUR OPÉRATEUR :</strong> {{tour_operateur}}</p><h3>Article 1 – Allocation de chambres</h3><p>{{hotel_partenaire}} alloue à {{tour_operateur}} {{allocation_chambres}} chambres à un tarif net de {{tarif_net}} FCFA par nuit à compter du {{date_debut}}.</p><h3>Article 2 – Conditions</h3><p>Politique de release, conditions d'annulation et modalités de paiement définies en annexe du présent accord.</p><h3>Article 3 – Durée</h3><p>Accord valable pour une saison touristique, renouvelable par tacite reconduction.</p></div>`
  },
  {
    code: 'gest_distribution_gds',
    name: "Accord de Service de Distribution GDS (Booking en ligne)",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: "Convention de connectivité et de distribution sur les systèmes de réservation globaux (GDS) et plateformes OTA pour un hôtel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel client", type: 'text', required: true },
      { key: 'prestataire_gds', label: "Prestataire GDS / Channel Manager", type: 'text', required: true },
      { key: 'date_debut', label: "Date de connexion", type: 'date', required: true },
      { key: 'canaux_distribution', label: "Liste des canaux de distribution activés", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DISTRIBUTION GDS</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>PRESTATAIRE :</strong> {{prestataire_gds}}</p><h3>Article 1 – Objet</h3><p>{{prestataire_gds}} assure la connexion et la gestion des disponibilités de l'hôtel {{hotel_client}} sur les GDS et OTA à compter du {{date_debut}}.</p><h3>Article 2 – Canaux distribués</h3><p>{{canaux_distribution}}</p><h3>Article 3 – Commissions</h3><p>Les commissions appliquées par chaque canal sont définies en annexe tarifaire du présent accord.</p></div>`
  },
  {
    code: 'gest_formation_personnel',
    name: "Accord de Service de Formation du Personnel Hôtelier",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 12000,
    description: "Convention de formation professionnelle du personnel hôtelier (accueil, service, langues, gestion) conforme aux standards internationaux.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel bénéficiaire de la formation", type: 'text', required: true },
      { key: 'organisme_formation', label: "Organisme de formation", type: 'text', required: true },
      { key: 'modules_formation', label: "Modules et thèmes de formation", type: 'textarea', required: true },
      { key: 'date_formation', label: "Date de début des formations", type: 'date', required: true },
      { key: 'budget_formation', label: "Budget de formation alloué (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION DU PERSONNEL HÔTELIER</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>ORGANISME DE FORMATION :</strong> {{organisme_formation}}</p><h3>Article 1 – Programme de formation</h3><p>{{organisme_formation}} dispense les formations suivantes au personnel de l'hôtel {{hotel_client}} à compter du {{date_formation}} :</p><p>{{modules_formation}}</p><h3>Article 2 – Budget</h3><p>Budget total de formation : {{budget_formation}} FCFA.</p><h3>Article 3 – Certification</h3><p>Des attestations de formation seront délivrées à chaque participant à l'issue des modules.</p></div>`
  },
  {
    code: 'gest_controle_qualite',
    name: "Accord de Service de Contrôle Qualité Hôtelier (Mystery Guest)",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Convention de service d'audit qualité par client mystère pour évaluer et améliorer l'expérience client dans un hôtel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel audité", type: 'text', required: true },
      { key: 'cabinet_audit', label: "Cabinet d'audit qualité", type: 'text', required: true },
      { key: 'frequence_audits', label: "Fréquence des audits mystery guest", type: 'text', required: true },
      { key: 'date_premier_audit', label: "Date du premier audit", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONTRÔLE QUALITÉ HÔTELIER</h1><h2>Mystery Guest Program</h2><p><strong>HÔTEL AUDITÉ :</strong> {{hotel_client}}</p><p><strong>CABINET D'AUDIT :</strong> {{cabinet_audit}}</p><h3>Article 1 – Objet</h3><p>{{cabinet_audit}} réalise des audits qualité par clients mystères dans l'établissement {{hotel_client}} avec une fréquence de {{frequence_audits}}, à compter du {{date_premier_audit}}.</p><h3>Article 2 – Rapport d'audit</h3><p>Chaque visite mystery guest donne lieu à un rapport détaillé couvrant l'accueil, les chambres, la restauration, le service et la propreté.</p><h3>Article 3 – Plan d'action</h3><p>Un plan d'amélioration est élaboré conjointement dans les 15 jours suivant chaque audit.</p></div>`
  },
  {
    code: 'gest_rapport_revpar',
    name: "Rapport de Performance Hôtelière (RevPAR, TRevPAR)",
    category: 'commercial_financier',
    price: 2000,
    priceMax: 6000,
    description: "Document de reporting mensuel des indicateurs clés de performance hôtelière : RevPAR, TRevPAR, taux d'occupation, ADR.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'nom_hotel', label: "Nom de l'établissement", type: 'text', required: true },
      { key: 'periode_rapport', label: "Période du rapport (mois/année)", type: 'text', required: true },
      { key: 'taux_occupation', label: "Taux d'occupation (%)", type: 'text', required: true },
      { key: 'revpar', label: "RevPAR réalisé (FCFA)", type: 'text', required: true },
      { key: 'trevpar', label: "TRevPAR réalisé (FCFA)", type: 'text', required: true },
      { key: 'commentaires', label: "Commentaires et analyse de la direction", type: 'textarea', required: false }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE HÔTELIÈRE</h1><p><strong>ÉTABLISSEMENT :</strong> {{nom_hotel}}</p><p><strong>PÉRIODE :</strong> {{periode_rapport}}</p><h3>Indicateurs Clés de Performance (KPI)</h3><p><strong>Taux d'occupation :</strong> {{taux_occupation}}%</p><p><strong>RevPAR (Revenu par chambre disponible) :</strong> {{revpar}} FCFA</p><p><strong>TRevPAR (Revenu total par chambre disponible) :</strong> {{trevpar}} FCFA</p><h3>Analyse et Commentaires</h3><p>{{commentaires}}</p></div>`
  },
  {
    code: 'gest_plan_developpement',
    name: "Plan de Développement Hôtelier",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 30000,
    description: "Document stratégique de développement hôtelier définissant la vision, les objectifs et le plan d'action à 3-5 ans.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'nom_hotel', label: "Nom de l'établissement ou du groupe hôtelier", type: 'text', required: true },
      { key: 'vision_strategique', label: "Vision stratégique à 5 ans", type: 'textarea', required: true },
      { key: 'objectifs_croissance', label: "Objectifs de croissance (capacité, marchés)", type: 'textarea', required: true },
      { key: 'budget_developpement', label: "Budget de développement prévu (FCFA)", type: 'text', required: true },
      { key: 'date_lancement', label: "Date de lancement du plan", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT HÔTELIER</h1><p><strong>GROUPE / ÉTABLISSEMENT :</strong> {{nom_hotel}}</p><p><strong>Date de lancement :</strong> {{date_lancement}}</p><h3>Vision Stratégique</h3><p>{{vision_strategique}}</p><h3>Objectifs de Croissance</h3><p>{{objectifs_croissance}}</p><h3>Budget de Développement</h3><p>{{budget_developpement}} FCFA sur la période du plan.</p><h3>Axes Prioritaires</h3><p>Extension capacitaire, montée en gamme, digitalisation des services, recrutement et formation des talents hôteliers africains.</p></div>`
  },
  {
    code: 'gest_gestion_plaintes',
    name: "Accord de Gestion des Plaintes et Avis en Ligne",
    category: 'commercial_financier',
    price: 2500,
    priceMax: 8000,
    description: "Convention de service de gestion des avis clients en ligne (TripAdvisor, Google, Booking) et des réclamations hôtelières.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel client", type: 'text', required: true },
      { key: 'prestataire_reputation', label: "Prestataire e-réputation", type: 'text', required: true },
      { key: 'date_debut', label: "Date de prise en charge", type: 'date', required: true },
      { key: 'plateformes_cibles', label: "Plateformes d'avis gérées", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES PLAINTES ET AVIS EN LIGNE</h1><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>PRESTATAIRE :</strong> {{prestataire_reputation}}</p><h3>Article 1 – Objet</h3><p>{{prestataire_reputation}} gère les avis clients et les réclamations en ligne pour l'hôtel {{hotel_client}} sur les plateformes suivantes : {{plateformes_cibles}}, à compter du {{date_debut}}.</p><h3>Article 2 – Procédure de traitement</h3><p>Réponse aux avis sous 48 heures, traitement des réclamations sous 5 jours ouvrés, escalade des litiges graves à la direction.</p><h3>Article 3 – Reporting</h3><p>Rapport mensuel de l'indice de satisfaction client (NPS, score moyen) fourni à la direction de l'hôtel.</p></div>`
  },
  {
    code: 'gest_developpement_durable',
    name: "Accord de Développement Durable Hôtelier (Label Green Globe)",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: "Convention d'engagement et de mise en œuvre du développement durable et de la certification Green Globe pour un hôtel africain.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'hotel_client', label: "Hôtel candidat à la certification", type: 'text', required: true },
      { key: 'consultant_dd', label: "Consultant en développement durable", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du programme", type: 'date', required: true },
      { key: 'axes_durabilite', label: "Axes de développement durable prioritaires", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉVELOPPEMENT DURABLE HÔTELIER</h1><h2>Programme de Certification Green Globe</h2><p><strong>HÔTEL :</strong> {{hotel_client}}</p><p><strong>CONSULTANT :</strong> {{consultant_dd}}</p><h3>Article 1 – Engagement</h3><p>{{hotel_client}} s'engage dans une démarche de développement durable visant l'obtention de la certification Green Globe, avec l'accompagnement de {{consultant_dd}} à compter du {{date_debut}}.</p><h3>Article 2 – Axes prioritaires</h3><p>{{axes_durabilite}}</p><h3>Article 3 – Indicateurs</h3><p>Réduction de la consommation énergétique, gestion des déchets, approvisionnement local, formation du personnel aux éco-gestes.</p></div>`
  },
  {
    code: 'gest_charte_excellence',
    name: "Charte de l'Excellence Hôtelière en Afrique",
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: "Document de référence définissant les standards de l'excellence hôtelière adaptés au contexte africain et aux attentes de la clientèle internationale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'hotel_adherent', label: "Hôtel ou groupe hôtelier adhérent", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature de la charte", type: 'date', required: true },
      { key: 'engagements_specifiques', label: "Engagements spécifiques de l'établissement", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'EXCELLENCE HÔTELIÈRE EN AFRIQUE</h1><p><strong>ÉTABLISSEMENT ADHÉRENT :</strong> {{hotel_adherent}}</p><p><strong>Date de signature :</strong> {{date_signature}}</p><h3>Préambule</h3><p>La présente charte définit les valeurs et standards de l'excellence hôtelière africaine, conjuguant hospitalité traditionnelle et services de classe mondiale.</p><h3>Engagements Fondamentaux</h3><p>Accueil chaleureux, qualité de service irréprochable, respect de la culture locale, innovation permanente, formation continue des équipes.</p><h3>Engagements Spécifiques</h3><p>{{engagements_specifiques}}</p><h3>Signature</h3><p>Signé à Abidjan, le {{date_signature}}</p></div>`
  },

  // ============================================================
  // 25 TEMPLATES SPA / BIEN-ÊTRE / THALASSO (préfixe spa_, sante)
  // ============================================================
  {
    code: 'spa_day_journee',
    name: "Contrat de Service de Spa Day (Journée Bien-être)",
    category: 'sante',
    price: 2000,
    priceMax: 7000,
    description: "Convention de prestation de journée bien-être complète (spa day) incluant accès aux installations et soins à la carte.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'centre_spa', label: "Centre spa prestataire", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client bénéficiaire", type: 'text', required: true },
      { key: 'date_spa_day', label: "Date de la journée bien-être", type: 'date', required: true },
      { key: 'soins_inclus', label: "Liste des soins inclus dans le forfait", type: 'textarea', required: true },
      { key: 'tarif_forfait', label: "Tarif du forfait spa day (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE SPA DAY</h1><h2>Journée Bien-être</h2><p><strong>CENTRE SPA :</strong> {{centre_spa}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><p><strong>DATE :</strong> {{date_spa_day}}</p><h3>Article 1 – Forfait Spa Day</h3><p>Le présent contrat confirme la réservation d'une journée bien-être complète au profit de {{client_nom}} au sein du {{centre_spa}}.</p><h3>Article 2 – Soins inclus</h3><p>{{soins_inclus}}</p><h3>Article 3 – Tarif</h3><p>Forfait spa day : {{tarif_forfait}} FCFA, incluant l'accès à toutes les installations du jour.</p></div>`
  },
  {
    code: 'spa_massage_suedois',
    name: "Contrat de Service de Massage Suédois Professionnel",
    category: 'sante',
    price: 2000,
    priceMax: 6000,
    description: "Convention de prestation de massage suédois par un thérapeute diplômé, détaillant les conditions et responsabilités.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'centre_spa', label: "Centre spa / thérapeute", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'date_seance', label: "Date de la séance", type: 'date', required: true },
      { key: 'duree_seance', label: "Durée de la séance (minutes)", type: 'text', required: true },
      { key: 'tarif_seance', label: "Tarif de la séance (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE MASSAGE SUÉDOIS PROFESSIONNEL</h1><p><strong>THÉRAPEUTE / CENTRE :</strong> {{centre_spa}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Prestation</h3><p>{{centre_spa}} dispense à {{client_nom}} une séance de massage suédois professionnel d'une durée de {{duree_seance}} minutes, le {{date_seance}}.</p><h3>Article 2 – Objectifs thérapeutiques</h3><p>Relaxation musculaire, amélioration de la circulation sanguine, réduction du stress et des tensions.</p><h3>Article 3 – Tarif</h3><p>Tarif de la séance : {{tarif_seance}} FCFA, payable avant ou après la séance.</p><h3>Article 4 – Contre-indications</h3><p>Le client déclare ne présenter aucune contre-indication médicale au massage.</p></div>`
  },
  {
    code: 'spa_massage_africain',
    name: "Contrat de Service de Massage Africain (Baobab, Karité)",
    category: 'sante',
    price: 2000,
    priceMax: 7000,
    description: "Convention de prestation de massage africain aux huiles naturelles (baobab, karité, palme) valorisant le patrimoine thérapeutique africain.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'centre_spa', label: "Centre spa / praticien", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'date_seance', label: "Date de la séance", type: 'date', required: true },
      { key: 'huile_choisie', label: "Huile naturelle utilisée (baobab, karité, etc.)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE MASSAGE AFRICAIN</h1><h2>Soins aux Huiles de Baobab et de Karité</h2><p><strong>PRATICIEN / CENTRE :</strong> {{centre_spa}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Prestation</h3><p>{{centre_spa}} dispense à {{client_nom}} un massage africain traditionnel aux huiles de {{huile_choisie}}, le {{date_seance}}.</p><h3>Article 2 – Bienfaits</h3><p>Nourrissement et hydratation profonde de la peau, détente musculaire, régénération cellulaire grâce aux propriétés des huiles africaines.</p><h3>Article 3 – Consentement</h3><p>Le client consent à l'utilisation des huiles mentionnées et déclare ne pas présenter d'allergies connues aux produits naturels africains.</p></div>`
  },
  {
    code: 'spa_hammam_bain_vapeur',
    name: "Contrat de Service de Hammam et Bain Vapeur",
    category: 'sante',
    price: 2000,
    priceMax: 6000,
    description: "Convention de prestation de hammam traditionnel et bain vapeur, incluant gommage au savon noir et enveloppement.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'centre_spa', label: "Centre spa / hammam", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'date_seance', label: "Date de la séance", type: 'date', required: true },
      { key: 'formule_choisie', label: "Formule choisie (hammam seul, gommage, enveloppement)", type: 'text', required: true },
      { key: 'tarif', label: "Tarif de la formule (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE HAMMAM ET BAIN VAPEUR</h1><p><strong>CENTRE :</strong> {{centre_spa}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Formule réservée</h3><p>{{client_nom}} bénéficie de la formule {{formule_choisie}} au sein du {{centre_spa}}, le {{date_seance}}.</p><h3>Article 2 – Déroulement</h3><p>Accueil, séance de hammam à la vapeur, gommage au savon noir, enveloppement aux argiles ou au ghassoul selon formule choisie.</p><h3>Article 3 – Tarif</h3><p>{{tarif}} FCFA, réglable à la réservation ou à la réception.</p></div>`
  },
  {
    code: 'spa_soins_visage',
    name: "Contrat de Service de Soins du Visage (Facial)",
    category: 'sante',
    price: 2000,
    priceMax: 7000,
    description: "Convention de prestation de soins du visage par une esthéticienne diplômée, incluant diagnostic cutané et protocole personnalisé.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'centre_spa', label: "Centre esthétique / spa", type: 'text', required: true },
      { key: 'client_nom', label: "Nom de la cliente / du client", type: 'text', required: true },
      { key: 'date_soin', label: "Date du soin visage", type: 'date', required: true },
      { key: 'type_soin', label: "Type de soin visage (hydratant, anti-âge, éclat...)", type: 'text', required: true },
      { key: 'tarif_soin', label: "Tarif du soin (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE SOINS DU VISAGE</h1><h2>Facial Professionnel</h2><p><strong>CENTRE :</strong> {{centre_spa}}</p><p><strong>CLIENT(E) :</strong> {{client_nom}}</p><h3>Article 1 – Protocole</h3><p>{{centre_spa}} réalise un soin du visage de type {{type_soin}} pour {{client_nom}}, le {{date_soin}}.</p><h3>Article 2 – Étapes du protocole</h3><p>Diagnostic cutané, nettoyage, exfoliation, extraction, masque actif, sérum concentré, soin de protection finale.</p><h3>Article 3 – Tarif</h3><p>{{tarif_soin}} FCFA incluant les soins et produits utilisés.</p></div>`
  },
  {
    code: 'spa_soins_corps',
    name: "Contrat de Service de Soins du Corps (Enveloppement)",
    category: 'sante',
    price: 2000,
    priceMax: 7000,
    description: "Convention de prestation de soins du corps, incluant gommage, enveloppement aux boues minérales ou à l'argile et modelage.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'centre_spa', label: "Centre spa prestataire", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'date_soin', label: "Date du soin corps", type: 'date', required: true },
      { key: 'produit_enveloppement', label: "Produit d'enveloppement choisi (argile, boue, algues...)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE SOINS DU CORPS</h1><h2>Protocole Enveloppement</h2><p><strong>CENTRE SPA :</strong> {{centre_spa}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Protocole corps</h3><p>{{centre_spa}} réalise un soin corps complet avec enveloppement à base de {{produit_enveloppement}} pour {{client_nom}}, le {{date_soin}}.</p><h3>Article 2 – Bénéfices</h3><p>Reminéralisation, détoxification, raffermissement cutané, hydratation profonde et relaxation générale.</p><h3>Article 3 – Durée</h3><p>Séance d'environ 90 minutes incluant gommage, enveloppement, temps de pause et modelage de finition.</p></div>`
  },
  {
    code: 'spa_thalassotherapie',
    name: "Contrat de Service de Thalassothérapie",
    category: 'sante',
    price: 3000,
    priceMax: 12000,
    description: "Convention de cure de thalassothérapie utilisant les bienfaits de l'eau de mer, des algues et du climat marin pour la santé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'centre_thalasso', label: "Centre de thalassothérapie", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du patient / client", type: 'text', required: true },
      { key: 'date_debut_cure', label: "Date de début de cure", type: 'date', required: true },
      { key: 'duree_cure', label: "Durée de la cure (jours)", type: 'text', required: true },
      { key: 'programme_soins', label: "Programme de soins prescrit", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE THALASSOTHÉRAPIE</h1><p><strong>CENTRE :</strong> {{centre_thalasso}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Cure de thalassothérapie</h3><p>{{centre_thalasso}} assure une cure de thalassothérapie d'une durée de {{duree_cure}} jours pour {{client_nom}}, débutant le {{date_debut_cure}}.</p><h3>Article 2 – Programme de soins</h3><p>{{programme_soins}}</p><h3>Article 3 – Médecin référent</h3><p>Un bilan médical préalable est obligatoire. Le médecin du centre adapte le programme selon l'état de santé du client.</p></div>`
  },
  {
    code: 'spa_balnéotherapie',
    name: "Contrat de Service de Balnéothérapie",
    category: 'sante',
    price: 2500,
    priceMax: 9000,
    description: "Convention de prestation de balnéothérapie par bains thérapeutiques minéraux, jets et massages aquatiques.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'centre_spa', label: "Centre de balnéothérapie", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de cure", type: 'date', required: true },
      { key: 'nombre_seances', label: "Nombre de séances prévues", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE BALNÉOTHÉRAPIE</h1><p><strong>CENTRE :</strong> {{centre_spa}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Programme balnéothérapie</h3><p>{{centre_spa}} assure {{nombre_seances}} séances de balnéothérapie pour {{client_nom}}, débutant le {{date_debut}}.</p><h3>Article 2 – Techniques utilisées</h3><p>Bains bouillonnants aux sels minéraux, jets d'eau sous pression, douches à effet massage, bains de vapeur localisés.</p><h3>Article 3 – Contre-indications</h3><p>Le client certifie avoir consulté un médecin et ne présenter aucune contre-indication aux bains thérapeutiques.</p></div>`
  },
  {
    code: 'spa_hydrothérapie_colon',
    name: "Contrat de Service d'Hydrothérapie du Côlon",
    category: 'sante',
    price: 3000,
    priceMax: 10000,
    description: "Convention de prestation d'hydrothérapie du côlon (irrigation colique) par un praticien certifié, incluant information médicale préalable.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'centre_soin', label: "Centre de soins / clinique bien-être", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'date_seance', label: "Date de la séance", type: 'date', required: true },
      { key: 'praticien', label: "Nom du praticien certifié", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'HYDROTHÉRAPIE DU CÔLON</h1><p><strong>CENTRE :</strong> {{centre_soin}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><p><strong>PRATICIEN :</strong> {{praticien}}</p><h3>Article 1 – Prestation</h3><p>{{praticien}} au sein du {{centre_soin}} réalise une séance d'hydrothérapie du côlon pour {{client_nom}} le {{date_seance}}.</p><h3>Article 2 – Information médicale</h3><p>Le client a été informé de l'objectif, du déroulement et des contre-indications de cette prestation et y consent librement.</p><h3>Article 3 – Confidentialité</h3><p>Toutes les informations médicales du client restent strictement confidentielles.</p></div>`
  },
  {
    code: 'spa_aromatherapie',
    name: "Contrat de Service d'Aromathérapie Clinique",
    category: 'sante',
    price: 2500,
    priceMax: 8000,
    description: "Convention de prestation d'aromathérapie clinique par un aromathérapeute diplômé utilisant des huiles essentielles thérapeutiques.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'centre_spa', label: "Centre d'aromathérapie / spa", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'date_consultation', label: "Date de la consultation / séance", type: 'date', required: true },
      { key: 'huiles_utilisees', label: "Huiles essentielles utilisées", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'AROMATHÉRAPIE CLINIQUE</h1><p><strong>CENTRE :</strong> {{centre_spa}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Séance d'aromathérapie</h3><p>{{centre_spa}} dispense une séance d'aromathérapie clinique à {{client_nom}} le {{date_consultation}}.</p><h3>Article 2 – Huiles essentielles utilisées</h3><p>{{huiles_utilisees}}</p><h3>Article 3 – Consentement et allergies</h3><p>Le client confirme l'absence d'allergie connue aux huiles essentielles mentionnées et consent au protocole proposé.</p></div>`
  },
  {
    code: 'spa_réflexologie',
    name: "Contrat de Service de Réflexologie Plantaire",
    category: 'sante',
    price: 2000,
    priceMax: 6000,
    description: "Convention de prestation de réflexologie plantaire par un praticien certifié, stimulant les zones réflexes pour le bien-être global.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'praticien', label: "Praticien en réflexologie / centre", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'date_seance', label: "Date de la séance", type: 'date', required: true },
      { key: 'nombre_seances', label: "Nombre de séances au programme", type: 'text', required: false }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE RÉFLEXOLOGIE PLANTAIRE</h1><p><strong>PRATICIEN :</strong> {{praticien}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Séances de réflexologie</h3><p>{{praticien}} réalise des séances de réflexologie plantaire pour {{client_nom}}, débutant le {{date_seance}}, pour un programme de {{nombre_seances}} séances.</p><h3>Article 2 – Objectifs</h3><p>Stimulation des zones réflexes des pieds correspondant aux organes, amélioration de la circulation, réduction du stress, rééquilibrage énergétique.</p><h3>Article 3 – Recommandation médicale</h3><p>La réflexologie est une approche complémentaire et ne remplace pas un suivi médical traditionnel.</p></div>`
  },
  {
    code: 'spa_yoga_meditation',
    name: "Contrat de Service de Yoga et Méditation",
    category: 'sante',
    price: 2000,
    priceMax: 7000,
    description: "Convention de prestation de cours de yoga et de méditation guidée par un instructeur certifié, en groupe ou en privé.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'centre_yoga', label: "Centre de yoga / instructeur", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du participant", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début des cours", type: 'date', required: true },
      { key: 'format_cours', label: "Format (cours collectif, privé, en ligne)", type: 'text', required: true },
      { key: 'abonnement_mensuel', label: "Abonnement mensuel (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE YOGA ET MÉDITATION</h1><p><strong>INSTRUCTEUR / CENTRE :</strong> {{centre_yoga}}</p><p><strong>PARTICIPANT :</strong> {{client_nom}}</p><h3>Article 1 – Programme</h3><p>{{centre_yoga}} dispense des cours de yoga et de méditation à {{client_nom}} en format {{format_cours}}, à compter du {{date_debut}}.</p><h3>Article 2 – Abonnement</h3><p>Abonnement mensuel : {{abonnement_mensuel}} FCFA, prélèvement en début de mois.</p><h3>Article 3 – Annulation</h3><p>Toute séance non annulée 24 heures à l'avance sera due intégralement.</p></div>`
  },
  {
    code: 'spa_pilates',
    name: "Contrat de Service de Pilates",
    category: 'sante',
    price: 2000,
    priceMax: 7000,
    description: "Convention de prestation de cours de pilates sur tapis ou sur machines Reformer, animés par un coach certifié.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'studio_pilates', label: "Studio pilates / coach", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début des cours", type: 'date', required: true },
      { key: 'type_pilates', label: "Type de pilates (tapis, Reformer, duet, privé)", type: 'text', required: true },
      { key: 'tarif_mensuel', label: "Tarif mensuel (FCFA)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE PILATES</h1><p><strong>STUDIO / COACH :</strong> {{studio_pilates}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Programme Pilates</h3><p>{{studio_pilates}} dispense à {{client_nom}} des cours de pilates {{type_pilates}} à compter du {{date_debut}}.</p><h3>Article 2 – Bienfaits</h3><p>Renforcement du centre (core), amélioration de la posture, flexibilité, prévention des douleurs dorsales.</p><h3>Article 3 – Abonnement</h3><p>Tarif mensuel : {{tarif_mensuel}} FCFA. Accès illimité aux cours selon planning.</p></div>`
  },
  {
    code: 'spa_natation_therapeutique',
    name: "Contrat de Service de Natation Thérapeutique",
    category: 'sante',
    price: 2000,
    priceMax: 7000,
    description: "Convention de prestation de natation thérapeutique encadrée par un kinésithérapeute ou un maître-nageur spécialisé.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'centre_natation', label: "Centre de natation thérapeutique", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du patient / client", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du programme", type: 'date', required: true },
      { key: 'objectif_therapeutique', label: "Objectif thérapeutique (rééducation, confort...)", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE NATATION THÉRAPEUTIQUE</h1><p><strong>CENTRE :</strong> {{centre_natation}}</p><p><strong>CLIENT / PATIENT :</strong> {{client_nom}}</p><h3>Article 1 – Programme</h3><p>{{centre_natation}} encadre {{client_nom}} dans un programme de natation thérapeutique débutant le {{date_debut}}.</p><h3>Article 2 – Objectif thérapeutique</h3><p>{{objectif_therapeutique}}</p><h3>Article 3 – Suivi médical</h3><p>Un suivi médical régulier est assuré conjointement avec le médecin traitant du patient.</p></div>`
  },
  {
    code: 'spa_nutrition_dietetique',
    name: "Contrat de Service de Nutrition et Diététique",
    category: 'sante',
    price: 2500,
    priceMax: 9000,
    description: "Convention de prestation de consultation et de suivi nutritionnel et diététique par un professionnel de santé agréé.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'nutritionniste', label: "Diététicien(ne) / nutritionniste", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client / patient", type: 'text', required: true },
      { key: 'date_consultation', label: "Date de la première consultation", type: 'date', required: true },
      { key: 'objectif_nutrition', label: "Objectif nutritionnel (perte de poids, rééquilibrage...)", type: 'textarea', required: true },
      { key: 'duree_suivi', label: "Durée du suivi diététique (mois)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE NUTRITION ET DIÉTÉTIQUE</h1><p><strong>PROFESSIONNEL :</strong> {{nutritionniste}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Bilan nutritionnel</h3><p>{{nutritionniste}} réalise un bilan nutritionnel complet pour {{client_nom}} le {{date_consultation}} et élabore un plan alimentaire personnalisé.</p><h3>Article 2 – Objectif</h3><p>{{objectif_nutrition}}</p><h3>Article 3 – Durée du suivi</h3><p>Suivi nutritionnel sur {{duree_suivi}} mois, avec consultations de contrôle mensuelles.</p></div>`
  },
  {
    code: 'spa_cure_minceur',
    name: "Contrat de Service de Cure Minceur et Détox",
    category: 'sante',
    price: 3000,
    priceMax: 12000,
    description: "Convention de cure minceur et détox combinant soins amincissants, nutrition adaptée et activité physique encadrée.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'centre_minceur', label: "Centre minceur / spa", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'date_debut_cure', label: "Date de début de la cure", type: 'date', required: true },
      { key: 'duree_cure', label: "Durée de la cure (semaines)", type: 'text', required: true },
      { key: 'objectif_poids', label: "Objectif de perte de poids ou de détox", type: 'text', required: false }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE CURE MINCEUR ET DÉTOX</h1><p><strong>CENTRE :</strong> {{centre_minceur}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Programme de cure</h3><p>{{centre_minceur}} propose à {{client_nom}} une cure minceur et détox de {{duree_cure}} semaines, débutant le {{date_debut_cure}}.</p><h3>Article 2 – Protocole</h3><p>Soins drainants et raffermissants, régime détox personnalisé, activité physique adaptée, suivi par un professionnel de santé.</p><h3>Article 3 – Objectif</h3><p>{{objectif_poids}}</p><h3>Article 4 – Résultats</h3><p>Les résultats dépendent du respect du programme. Aucun résultat garanti n'est contractuellement opposable.</p></div>`
  },
  {
    code: 'spa_medecine_ayurvedique',
    name: "Contrat de Service de Médecine Ayurvédique",
    category: 'sante',
    price: 3500,
    priceMax: 13000,
    description: "Convention de prestation de soins et de consultations ayurvédiques par un praticien formé aux traditions médicales indiennes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'praticien_ayurvedique', label: "Praticien en médecine ayurvédique", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'date_consultation', label: "Date de la consultation initiale", type: 'date', required: true },
      { key: 'dosha_identifie', label: "Dosha identifié (Vata, Pitta, Kapha)", type: 'text', required: false },
      { key: 'programme_soins', label: "Programme de soins ayurvédiques prescrit", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE MÉDECINE AYURVÉDIQUE</h1><p><strong>PRATICIEN :</strong> {{praticien_ayurvedique}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Consultation Ayurvédique</h3><p>{{praticien_ayurvedique}} réalise une consultation ayurvédique pour {{client_nom}} le {{date_consultation}} et établit un plan de soins personnalisé.</p><h3>Article 2 – Constitution</h3><p>Dosha identifié : {{dosha_identifie}}</p><h3>Article 3 – Programme de soins</h3><p>{{programme_soins}}</p><h3>Article 4 – Nature complémentaire</h3><p>La médecine ayurvédique est une approche complémentaire et ne remplace pas un suivi médical conventionnel.</p></div>`
  },
  {
    code: 'spa_acupuncture',
    name: "Contrat de Service d'Acupuncture",
    category: 'sante',
    price: 2500,
    priceMax: 9000,
    description: "Convention de prestation d'acupuncture par un praticien diplômé, basée sur les principes de la médecine traditionnelle chinoise.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'acupuncteur', label: "Acupuncteur / praticien", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du patient", type: 'text', required: true },
      { key: 'date_debut', label: "Date de la première séance", type: 'date', required: true },
      { key: 'motif_soin', label: "Motif du recours à l'acupuncture", type: 'textarea', required: true },
      { key: 'nombre_seances', label: "Nombre de séances prévues", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'ACUPUNCTURE</h1><p><strong>ACUPUNCTEUR :</strong> {{acupuncteur}}</p><p><strong>PATIENT :</strong> {{client_nom}}</p><h3>Article 1 – Programme d'acupuncture</h3><p>{{acupuncteur}} réalise un programme de {{nombre_seances}} séances d'acupuncture pour {{client_nom}}, débutant le {{date_debut}}.</p><h3>Article 2 – Motif de prise en charge</h3><p>{{motif_soin}}</p><h3>Article 3 – Consentement</h3><p>Le patient consent au traitement par aiguilles et déclare avoir informé le praticien de toute médication en cours et de ses antécédents médicaux.</p></div>`
  },
  {
    code: 'spa_reiki_energetique',
    name: "Contrat de Service de Reiki et Énergétique",
    category: 'sante',
    price: 2000,
    priceMax: 7000,
    description: "Convention de prestation de soins énergétiques par un maître Reiki certifié pour le rééquilibrage des énergies vitales.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'maitre_reiki', label: "Maître Reiki / praticien énergéticien", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'date_seance', label: "Date de la séance", type: 'date', required: true },
      { key: 'nombre_seances', label: "Nombre de séances du programme", type: 'text', required: false }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE REIKI ET ÉNERGÉTIQUE</h1><p><strong>PRATICIEN REIKI :</strong> {{maitre_reiki}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Séances de Reiki</h3><p>{{maitre_reiki}} réalise des séances de Reiki et de soins énergétiques pour {{client_nom}}, débutant le {{date_seance}} pour un programme de {{nombre_seances}} séances.</p><h3>Article 2 – Nature de la prestation</h3><p>Le Reiki est une pratique de bien-être visant le rééquilibrage énergétique. Elle ne constitue pas un acte médical.</p><h3>Article 3 – Confidentialité</h3><p>Les informations échangées lors des séances sont strictement confidentielles.</p></div>`
  },
  {
    code: 'spa_coaching_bien_etre',
    name: "Contrat de Service de Coaching Bien-être (Life Coaching)",
    category: 'sante',
    price: 3000,
    priceMax: 12000,
    description: "Convention de coaching bien-être et développement personnel visant l'épanouissement global et l'équilibre vie professionnelle / personnelle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'coach', label: "Coach bien-être certifié", type: 'text', required: true },
      { key: 'client_nom', label: "Nom du client coaché", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du coaching", type: 'date', required: true },
      { key: 'objectifs_coaching', label: "Objectifs de coaching définis ensemble", type: 'textarea', required: true },
      { key: 'duree_programme', label: "Durée du programme de coaching (mois)", type: 'text', required: true }
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE COACHING BIEN-ÊTRE</h1><h2>Life Coaching</h2><p><strong>COACH :</strong> {{coach}}</p><p><strong>CLIENT :</strong> {{client_nom}}</p><h3>Article 1 – Programme de coaching</h3><p>{{coach}} accompagne {{client_nom}} dans un programme de life coaching de {{duree_programme}} mois, débutant le {{date_debut}}.</p><h3>Article 2 – Objectifs</h3><p>{{objectifs_coaching}}</p><h3>Article 3 – Méthode</h3><p>Séances individuelles hebdomadaires, outils de développement personnel, exercices pratiques entre les séances, suivi de progrès.</p><h3>Article 4 – Confidentialité</h3><p>Toutes les informations partagées en séance sont protégées par la confidentialité du coaching.</p></div>`
  },
  {
    code: 'spa_franchise_spa',
    name: "Accord de Franchise Spa",
    category: 'sante',
    price: 8000,
    priceMax: 30000,
    description: "Convention de franchise pour l'exploitation d'un centre spa sous une marque reconnue, incluant standards, formation et supports.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'franchiseur_spa', label: "Franchiseur (marque spa)", type: 'text', required: true },
      { key: 'franchisé_spa', label: "Franchisé (exploitant du spa)", type: 'text', required: true },
      { key: 'adresse_spa', label: "Adresse du spa franchisé", type: 'text', required: true },
      { key: 'redevance_franchise', label: "Redevance de franchise (%)", type: 'text', required: true },
      { key: 'date_ouverture', label: "Date d'ouverture prévue", type: 'date', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE FRANCHISE SPA</h1><p><strong>FRANCHISEUR :</strong> {{franchiseur_spa}}</p><p><strong>FRANCHISÉ :</strong> {{franchisé_spa}}</p><p><strong>ADRESSE :</strong> {{adresse_spa}}</p><h3>Article 1 – Concession de franchise</h3><p>{{franchiseur_spa}} accorde à {{franchisé_spa}} le droit d'exploiter un centre spa sous sa marque à compter du {{date_ouverture}}.</p><h3>Article 2 – Standards et formation</h3><p>Le Franchisé bénéficie des protocoles de soins, des supports marketing, de la formation initiale et continue de la marque.</p><h3>Article 3 – Redevances</h3><p>Redevance mensuelle de {{redevance_franchise}} du chiffre d'affaires, versée avant le 10 du mois suivant.</p></div>`
  },
  {
    code: 'spa_gestion_spa_externalise',
    name: "Accord de Gestion de Spa Hôtelier Externalisé",
    category: 'sante',
    price: 6000,
    priceMax: 22000,
    description: "Convention confiée à un opérateur spécialisé pour la gestion complète du spa d'un hôtel, en mode externalisé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'hotel_proprietaire', label: "Hôtel propriétaire du spa", type: 'text', required: true },
      { key: 'operateur_spa', label: "Opérateur spa spécialisé", type: 'text', required: true },
      { key: 'date_debut', label: "Date de prise de gestion", type: 'date', required: true },
      { key: 'duree_contrat', label: "Durée du contrat de gestion (années)", type: 'text', required: true },
      { key: 'partage_revenus', label: "Modalités de partage des revenus du spa", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE SPA HÔTELIER EXTERNALISÉ</h1><p><strong>HÔTEL PROPRIÉTAIRE :</strong> {{hotel_proprietaire}}</p><p><strong>OPÉRATEUR SPA :</strong> {{operateur_spa}}</p><h3>Article 1 – Objet</h3><p>{{hotel_proprietaire}} confie à {{operateur_spa}} la gestion complète du spa hôtelier pour une durée de {{duree_contrat}} années, à compter du {{date_debut}}.</p><h3>Article 2 – Missions de l'Opérateur</h3><p>Recrutement et formation du personnel, élaboration des menus de soins, gestion des stocks, marketing du spa.</p><h3>Article 3 – Partage des revenus</h3><p>{{partage_revenus}}</p></div>`
  },
  {
    code: 'spa_rapport_performance',
    name: "Rapport de Performance Spa",
    category: 'sante',
    price: 2000,
    priceMax: 6000,
    description: "Document de reporting mensuel des indicateurs de performance d'un centre spa (chiffre d'affaires, taux d'occupation cabines, panier moyen).",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'nom_spa', label: "Nom du spa", type: 'text', required: true },
      { key: 'periode_rapport', label: "Période du rapport", type: 'text', required: true },
      { key: 'ca_mensuel', label: "Chiffre d'affaires du mois (FCFA)", type: 'text', required: true },
      { key: 'taux_occupation_cabines', label: "Taux d'occupation des cabines (%)", type: 'text', required: true },
      { key: 'panier_moyen', label: "Panier moyen par client (FCFA)", type: 'text', required: true },
      { key: 'analyse_direction', label: "Analyse et recommandations de la direction", type: 'textarea', required: false }
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE SPA</h1><p><strong>SPA :</strong> {{nom_spa}}</p><p><strong>PÉRIODE :</strong> {{periode_rapport}}</p><h3>Indicateurs Clés</h3><p><strong>Chiffre d'affaires mensuel :</strong> {{ca_mensuel}} FCFA</p><p><strong>Taux d'occupation des cabines :</strong> {{taux_occupation_cabines}}%</p><p><strong>Panier moyen par client :</strong> {{panier_moyen}} FCFA</p><h3>Analyse et Recommandations</h3><p>{{analyse_direction}}</p></div>`
  },
  {
    code: 'spa_plan_developpement',
    name: "Plan de Développement Spa",
    category: 'sante',
    price: 5000,
    priceMax: 18000,
    description: "Document stratégique de développement d'un centre spa définissant la vision, les offres de soins, les investissements et les objectifs commerciaux.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'nom_spa', label: "Nom du spa ou projet spa", type: 'text', required: true },
      { key: 'vision_spa', label: "Vision et positionnement du spa", type: 'textarea', required: true },
      { key: 'investissements_prevus', label: "Investissements prévus (FCFA)", type: 'text', required: true },
      { key: 'date_lancement', label: "Date de lancement du plan", type: 'date', required: true },
      { key: 'objectifs_3ans', label: "Objectifs à 3 ans (CA, clientèle cible)", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT SPA</h1><p><strong>SPA / PROJET :</strong> {{nom_spa}}</p><p><strong>Date de lancement :</strong> {{date_lancement}}</p><h3>Vision et Positionnement</h3><p>{{vision_spa}}</p><h3>Investissements Prévus</h3><p>{{investissements_prevus}} FCFA pour l'aménagement, les équipements et la formation des équipes.</p><h3>Objectifs à 3 ans</h3><p>{{objectifs_3ans}}</p><h3>Axes de Développement</h3><p>Diversification des soins, partenariats hôteliers, développement de la clientèle d'affaires et de tourisme médical.</p></div>`
  },
  {
    code: 'spa_charte_bien_etre',
    name: "Charte du Bien-être et de la Santé Holistique",
    category: 'sante',
    price: 2000,
    priceMax: 7000,
    description: "Document fondateur définissant les valeurs, l'éthique et les engagements d'un centre de bien-être holistique en Afrique.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'centre_bien_etre', label: "Centre de bien-être signataire", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature de la charte", type: 'date', required: true },
      { key: 'valeurs_fondatrices', label: "Valeurs fondatrices du centre", type: 'textarea', required: true },
      { key: 'engagements_clients', label: "Engagements envers les clients", type: 'textarea', required: true }
    ]),
    body: `<div class="doc"><h1>CHARTE DU BIEN-ÊTRE ET DE LA SANTÉ HOLISTIQUE</h1><p><strong>CENTRE :</strong> {{centre_bien_etre}}</p><p><strong>Date de signature :</strong> {{date_signature}}</p><h3>Valeurs Fondatrices</h3><p>{{valeurs_fondatrices}}</p><h3>Notre Vision Holistique</h3><p>Nous croyons en l'unité du corps, de l'esprit et de l'âme. Nos soins intègrent les savoirs ancestraux africains et les meilleures pratiques internationales du bien-être.</p><h3>Engagements envers nos Clients</h3><p>{{engagements_clients}}</p><h3>Éthique Professionnelle</h3><p>Confidentialité absolue, respect de la personne, formation continue des praticiens, utilisation de produits naturels et éco-responsables.</p><p>Signé à Abidjan, le {{date_signature}}</p></div>`
  }
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 74a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
