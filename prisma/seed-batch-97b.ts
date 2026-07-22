import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 25 TEMPLATES DRONES CIVILS — préfixe drone_ — catégorie commercial_financier
  // ─────────────────────────────────────────────────────────────────────────────

  {
    code: 'drone_photographie_aerienne',
    name: 'Accord de service de drone de photographie aérienne',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: 'Contrat de prestation de services de photographie aérienne par drone conforme au droit OHADA et à la réglementation ANAC Côte d\'Ivoire.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'prestataire', label: 'Nom du prestataire drone', type: 'text', required: true },
      { key: 'client', label: 'Nom du client', type: 'text', required: true },
      { key: 'zone_intervention', label: 'Zone d\'intervention', type: 'text', required: true },
      { key: 'date_mission', label: 'Date de la mission', type: 'date', required: true },
      { key: 'description_mission', label: 'Description de la mission photo', type: 'textarea', required: true },
      { key: 'montant', label: 'Montant de la prestation (FCFA)', type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE DE PHOTOGRAPHIE AÉRIENNE</h1>
<p>Entre les soussignés :</p>
<p><strong>Le Prestataire :</strong> {{prestataire}}, opérateur de drone agréé ANAC CI.</p>
<p><strong>Le Client :</strong> {{client}}.</p>
<h2>Article 1 — Objet</h2>
<p>Le prestataire s'engage à réaliser des prises de vue aériennes par drone sur la zone suivante : {{zone_intervention}}.</p>
<h2>Article 2 — Description de la mission</h2>
<p>{{description_mission}}</p>
<h2>Article 3 — Date d'exécution</h2>
<p>La mission est prévue le {{date_mission}}.</p>
<h2>Article 4 — Rémunération</h2>
<p>Le montant convenu est de {{montant}} FCFA, payable selon les modalités annexées.</p>
<h2>Article 5 — Droit applicable</h2>
<p>Le présent accord est régi par l'Acte uniforme OHADA relatif au droit commercial général et la réglementation aéronautique nationale.</p>
</div>`,
  },

  {
    code: 'drone_cartographie_topographie',
    name: 'Accord de service de drone de cartographie et topographie',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 22000,
    description: 'Contrat de prestation de cartographie et topographie par drone pour projets fonciers ou d\'aménagement en zone OHADA.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire topographie drone', type: 'text', required: true },
      { key: 'client', label: 'Maître d\'ouvrage', type: 'text', required: true },
      { key: 'superficie_ha', label: 'Superficie à cartographier (ha)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début des levés', type: 'date', required: true },
      { key: 'livrable', label: 'Livrables attendus (orthophoto, MNT…)', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE DE CARTOGRAPHIE ET TOPOGRAPHIE</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Objet</h2>
<p>Réalisation de levés topographiques et cartographiques par drone sur une superficie de {{superficie_ha}} hectares.</p>
<h2>Article 2 — Livrables</h2>
<p>{{livrable}}</p>
<h2>Article 3 — Planning</h2>
<p>Démarrage des opérations le {{date_debut}}.</p>
<h2>Article 4 — Normes applicables</h2>
<p>Les travaux respectent les normes du Cadastre national et les standards ISO 19115 de métadonnées géographiques.</p>
</div>`,
  },

  {
    code: 'drone_inspection_infrastructures',
    name: 'Accord de service de drone pour inspection d\'infrastructures (pylônes, ponts)',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 25000,
    description: 'Contrat d\'inspection visuelle par drone de pylônes électriques, ponts et autres infrastructures critiques.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'prestataire', label: 'Opérateur drone inspection', type: 'text', required: true },
      { key: 'client', label: 'Gestionnaire de l\'infrastructure', type: 'text', required: true },
      { key: 'type_infrastructure', label: 'Type d\'infrastructure à inspecter', type: 'text', required: true },
      { key: 'nombre_ouvrages', label: 'Nombre d\'ouvrages à inspecter', type: 'text', required: true },
      { key: 'date_inspection', label: 'Date planifiée de l\'inspection', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE POUR INSPECTION D\'INFRASTRUCTURES</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Objet</h2>
<p>Inspection par drone de {{nombre_ouvrages}} ouvrage(s) de type {{type_infrastructure}}.</p>
<h2>Article 2 — Méthodologie</h2>
<p>Les vols seront réalisés conformément à la réglementation ANAC CI et aux consignes de sécurité du gestionnaire.</p>
<h2>Article 3 — Date d\'inspection</h2>
<p>L\'inspection est planifiée le {{date_inspection}}.</p>
<h2>Article 4 — Rapport</h2>
<p>Un rapport d\'inspection illustré sera remis dans les 5 jours ouvrés suivant la mission.</p>
</div>`,
  },

  {
    code: 'drone_agriculture_precision',
    name: 'Accord de service de drone pour agriculture de précision (pulvérisation)',
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: 'Contrat de prestation de pulvérisation agricole par drone pour exploitations en Côte d\'Ivoire.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire agri-drone', type: 'text', required: true },
      { key: 'exploitant', label: 'Exploitant agricole', type: 'text', required: true },
      { key: 'culture', label: 'Type de culture (cacao, riz…)', type: 'text', required: true },
      { key: 'superficie_ha', label: 'Superficie à traiter (ha)', type: 'text', required: true },
      { key: 'produit_phyto', label: 'Produit phytosanitaire utilisé', type: 'text', required: true },
      { key: 'date_traitement', label: 'Date de traitement prévue', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE POUR AGRICULTURE DE PRÉCISION</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Exploitant :</strong> {{exploitant}}</p>
<h2>Article 1 — Objet</h2>
<p>Pulvérisation aérienne sur {{superficie_ha}} ha de {{culture}} avec le produit {{produit_phyto}}.</p>
<h2>Article 2 — Date de traitement</h2>
<p>Intervention prévue le {{date_traitement}}, sous réserve des conditions météorologiques.</p>
<h2>Article 3 — Conformité</h2>
<p>Le prestataire respecte la réglementation phytosanitaire ivoirienne et les recommandations FAO.</p>
</div>`,
  },

  {
    code: 'drone_surveillance_perimetre',
    name: 'Accord de service de drone pour surveillance de périmètre (sécurité)',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: 'Contrat de surveillance de périmètre par drone pour sites industriels, mines et domaines privés.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'prestataire', label: 'Société de sécurité drone', type: 'text', required: true },
      { key: 'client', label: 'Client (site à surveiller)', type: 'text', required: true },
      { key: 'perimetre_km', label: 'Périmètre à surveiller (km)', type: 'text', required: true },
      { key: 'frequence_patrouille', label: 'Fréquence des patrouilles drone', type: 'text', required: true },
      { key: 'date_debut_contrat', label: 'Date de début du contrat', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE POUR SURVEILLANCE DE PÉRIMÈTRE</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Périmètre</h2>
<p>Surveillance par drone d\'un périmètre de {{perimetre_km}} km, avec patrouilles {{frequence_patrouille}}.</p>
<h2>Article 2 — Durée</h2>
<p>Contrat débutant le {{date_debut_contrat}}, reconductible tacitement par période mensuelle.</p>
<h2>Article 3 — Confidentialité</h2>
<p>Les images et données captées sont strictement confidentielles et destinées au client uniquement.</p>
</div>`,
  },

  {
    code: 'drone_livraison_medicaments',
    name: 'Accord de service de drone pour livraison de médicaments',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: 'Contrat de livraison de médicaments et consommables médicaux par drone en zones rurales et enclavées.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'operateur', label: 'Opérateur drone logistique santé', type: 'text', required: true },
      { key: 'structure_sante', label: 'Structure de santé bénéficiaire', type: 'text', required: true },
      { key: 'zone_livraison', label: 'Zone de livraison (village, district)', type: 'text', required: true },
      { key: 'frequence_livraison', label: 'Fréquence des livraisons', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du service', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE POUR LIVRAISON DE MÉDICAMENTS</h1>
<p><strong>Opérateur :</strong> {{operateur}}</p>
<p><strong>Structure bénéficiaire :</strong> {{structure_sante}}</p>
<h2>Article 1 — Objet</h2>
<p>Livraison de médicaments et consommables médicaux par drone vers {{zone_livraison}}.</p>
<h2>Article 2 — Fréquence</h2>
<p>Livraisons {{frequence_livraison}}, démarrant le {{date_debut}}.</p>
<h2>Article 3 — Chaîne du froid</h2>
<p>Le prestataire garantit le respect de la chaîne du froid pour les produits thermosensibles.</p>
<h2>Article 4 — Conformité</h2>
<p>Le service est conforme aux exigences ANAC CI, OMS et du Ministère de la Santé de Côte d\'Ivoire.</p>
</div>`,
  },

  {
    code: 'drone_recherche_sauvetage',
    name: 'Accord de service de drone pour recherche et sauvetage (SAR)',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 24000,
    description: 'Contrat de mise à disposition de drones équipés pour opérations de recherche et sauvetage (SAR).',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'prestataire', label: 'Opérateur drone SAR', type: 'text', required: true },
      { key: 'autorite_responsable', label: 'Autorité responsable (Protection Civile…)', type: 'text', required: true },
      { key: 'zone_sar', label: 'Zone géographique couverte', type: 'text', required: true },
      { key: 'equipement_drone', label: 'Équipement du drone (thermique, caméra…)', type: 'textarea', required: true },
      { key: 'date_accord', label: 'Date de signature de l\'accord', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE POUR RECHERCHE ET SAUVETAGE (SAR)</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Autorité responsable :</strong> {{autorite_responsable}}</p>
<h2>Article 1 — Objet</h2>
<p>Mise à disposition et opération de drones SAR sur la zone {{zone_sar}}.</p>
<h2>Article 2 — Équipements</h2>
<p>{{equipement_drone}}</p>
<h2>Article 3 — Délai d\'intervention</h2>
<p>Le prestataire s\'engage à être opérationnel dans les 2 heures suivant l\'alerte.</p>
<h2>Article 4 — Effectivité</h2>
<p>Accord signé le {{date_accord}}, valable 12 mois renouvelables.</p>
</div>`,
  },

  {
    code: 'drone_tournage_cinematographique',
    name: 'Accord de service de drone pour tournage cinématographique',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: 'Contrat de prestation de prises de vues aériennes cinématographiques par drone pour production audiovisuelle.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'prestataire', label: 'Opérateur drone cinéma', type: 'text', required: true },
      { key: 'producteur', label: 'Société de production', type: 'text', required: true },
      { key: 'titre_projet', label: 'Titre du projet audiovisuel', type: 'text', required: true },
      { key: 'lieu_tournage', label: 'Lieu(x) de tournage', type: 'text', required: true },
      { key: 'date_tournage', label: 'Date(s) de tournage', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE POUR TOURNAGE CINÉMATOGRAPHIQUE</h1>
<p><strong>Opérateur drone :</strong> {{prestataire}}</p>
<p><strong>Producteur :</strong> {{producteur}}</p>
<h2>Article 1 — Objet</h2>
<p>Réalisation de prises de vues aériennes pour le projet «{{titre_projet}}» au lieu {{lieu_tournage}}.</p>
<h2>Article 2 — Date de tournage</h2>
<p>Sessions prévues le {{date_tournage}}.</p>
<h2>Article 3 — Droits sur les images</h2>
<p>Les images brutes deviennent propriété exclusive du producteur après règlement intégral.</p>
<h2>Article 4 — Autorisations</h2>
<p>Le prestataire obtient toutes les autorisations ANAC CI requises avant le tournage.</p>
</div>`,
  },

  {
    code: 'drone_inspection_toiture_btp',
    name: 'Accord de service de drone pour inspection de toiture (BTP)',
    category: 'commercial_financier',
    price: 3500,
    priceMax: 12000,
    description: 'Contrat d\'inspection de toitures, façades et structures de bâtiment par drone dans le secteur BTP.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'prestataire', label: 'Opérateur drone BTP', type: 'text', required: true },
      { key: 'maitre_ouvrage', label: 'Maître d\'ouvrage ou propriétaire', type: 'text', required: true },
      { key: 'adresse_batiment', label: 'Adresse du bâtiment', type: 'text', required: true },
      { key: 'type_inspection', label: 'Type d\'inspection (toiture, façade…)', type: 'text', required: true },
      { key: 'date_inspection', label: 'Date d\'inspection', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE POUR INSPECTION DE TOITURE (BTP)</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Maître d\'ouvrage :</strong> {{maitre_ouvrage}}</p>
<h2>Article 1 — Objet</h2>
<p>Inspection par drone de type {{type_inspection}} du bâtiment situé à {{adresse_batiment}}.</p>
<h2>Article 2 — Date</h2>
<p>Inspection prévue le {{date_inspection}}.</p>
<h2>Article 3 — Rapport</h2>
<p>Le prestataire remet un rapport illustré avec annotations thermiques et visuelles sous 72h.</p>
</div>`,
  },

  {
    code: 'drone_surveillance_foret',
    name: 'Accord de service de drone pour surveillance de forêt et déforestation',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: 'Contrat de surveillance forestière et de détection de déforestation illégale par drone.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'prestataire', label: 'Opérateur drone environnement', type: 'text', required: true },
      { key: 'donneur_ordre', label: 'Organisme commanditaire (MINEF…)', type: 'text', required: true },
      { key: 'zone_foret', label: 'Zone forestière à surveiller', type: 'text', required: true },
      { key: 'superficie_foret', label: 'Superficie forestière (ha)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début de surveillance', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE POUR SURVEILLANCE DE FORÊT ET DÉFORESTATION</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Commanditaire :</strong> {{donneur_ordre}}</p>
<h2>Article 1 — Objet</h2>
<p>Surveillance par drone de {{superficie_foret}} ha de forêt dans la zone {{zone_foret}}.</p>
<h2>Article 2 — Missions</h2>
<p>Détection et signalement des actes de déforestation illégale, feux de brousse et encroachements.</p>
<h2>Article 3 — Démarrage</h2>
<p>Opérations démarrant le {{date_debut}}.</p>
</div>`,
  },

  {
    code: 'drone_surveillance_cotiere',
    name: 'Accord de service de drone pour surveillance côtière et pêche illégale',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 24000,
    description: 'Contrat de surveillance maritime côtière et de détection de la pêche illégale par drone.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'prestataire', label: 'Opérateur drone maritime', type: 'text', required: true },
      { key: 'autorite', label: 'Autorité maritime ou agence pêche', type: 'text', required: true },
      { key: 'zone_maritime', label: 'Zone maritime surveillée', type: 'text', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat (mois)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de démarrage', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE POUR SURVEILLANCE CÔTIÈRE ET PÊCHE ILLÉGALE</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Autorité mandante :</strong> {{autorite}}</p>
<h2>Article 1 — Objet</h2>
<p>Patrouilles de surveillance par drone dans la zone maritime {{zone_maritime}} pendant {{duree_contrat}} mois.</p>
<h2>Article 2 — Démarrage</h2>
<p>Opérations démarrant le {{date_debut}}.</p>
<h2>Article 3 — Signalement</h2>
<p>Tout navire suspect est signalé en temps réel à l\'autorité compétente via liaison sécurisée.</p>
</div>`,
  },

  {
    code: 'drone_evenementiel_show',
    name: 'Accord de service de drone pour événementiel (show de drones)',
    category: 'commercial_financier',
    price: 8000,
    priceMax: 30000,
    description: 'Contrat de prestation de show lumineux et acrobatique de drones pour événements grand public.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'prestataire', label: 'Société de show drone', type: 'text', required: true },
      { key: 'organisateur', label: 'Organisateur de l\'événement', type: 'text', required: true },
      { key: 'lieu_evenement', label: 'Lieu de l\'événement', type: 'text', required: true },
      { key: 'date_evenement', label: 'Date de l\'événement', type: 'date', required: true },
      { key: 'nombre_drones', label: 'Nombre de drones dans le show', type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE POUR ÉVÉNEMENTIEL — SHOW DE DRONES</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Organisateur :</strong> {{organisateur}}</p>
<h2>Article 1 — Prestation</h2>
<p>Show chorégraphié de {{nombre_drones}} drones lors de l\'événement organisé à {{lieu_evenement}}.</p>
<h2>Article 2 — Date</h2>
<p>Représentation le {{date_evenement}}.</p>
<h2>Article 3 — Sécurité</h2>
<p>Un périmètre de sécurité sera établi conformément aux exigences ANAC CI.</p>
<h2>Article 4 — Annulation</h2>
<p>En cas d\'annulation moins de 72h avant, 50% du montant reste dû au prestataire.</p>
</div>`,
  },

  {
    code: 'drone_certification_pilote_anac',
    name: 'Accord de certification de pilote de drone (ANAC CI)',
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: 'Contrat de formation et préparation à la certification de pilote de drone auprès de l\'ANAC Côte d\'Ivoire.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'centre_formation', label: 'Centre de formation drone', type: 'text', required: true },
      { key: 'stagiaire', label: 'Nom du stagiaire', type: 'text', required: true },
      { key: 'categorie_brevet', label: 'Catégorie de brevet visée', type: 'text', required: true },
      { key: 'date_debut_formation', label: 'Date de début de la formation', type: 'date', required: true },
      { key: 'duree_formation', label: 'Durée de la formation (jours)', type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION DE PILOTE DE DRONE — ANAC CI</h1>
<p><strong>Centre de formation agréé :</strong> {{centre_formation}}</p>
<p><strong>Stagiaire :</strong> {{stagiaire}}</p>
<h2>Article 1 — Objet</h2>
<p>Formation de {{stagiaire}} en vue de l\'obtention du brevet de pilote de drone catégorie {{categorie_brevet}} auprès de l\'ANAC CI.</p>
<h2>Article 2 — Programme</h2>
<p>Formation de {{duree_formation}} jours débutant le {{date_debut_formation}}, incluant modules théoriques et pratiques.</p>
<h2>Article 3 — Engagement</h2>
<p>Le stagiaire s\'engage à respecter les règles aéronautiques et la charte d\'éthique du centre.</p>
</div>`,
  },

  {
    code: 'drone_autorisation_vol_anac',
    name: 'Accord d\'autorisation de vol de drone (espace aérien CI)',
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: 'Formulaire d\'accord pour demande et obtention d\'autorisation de vol de drone dans l\'espace aérien ivoirien.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'operateur', label: 'Opérateur drone demandeur', type: 'text', required: true },
      { key: 'numero_immatriculation', label: 'Numéro d\'immatriculation du drone', type: 'text', required: true },
      { key: 'zone_vol', label: 'Zone de vol demandée', type: 'text', required: true },
      { key: 'date_vol', label: 'Date de vol prévue', type: 'date', required: true },
      { key: 'objet_vol', label: 'Objet du vol', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD D\'AUTORISATION DE VOL DE DRONE — ESPACE AÉRIEN CÔTE D\'IVOIRE</h1>
<p><strong>Opérateur :</strong> {{operateur}}</p>
<p><strong>Drone n° :</strong> {{numero_immatriculation}}</p>
<h2>Article 1 — Demande</h2>
<p>Demande d\'autorisation de vol dans la zone {{zone_vol}} le {{date_vol}}.</p>
<h2>Article 2 — Objet</h2>
<p>{{objet_vol}}</p>
<h2>Article 3 — Conditions</h2>
<p>L\'opérateur s\'engage à respecter la réglementation ANAC CI, notamment les zones interdites et les altitudes maximales autorisées.</p>
</div>`,
  },

  {
    code: 'drone_assurance_rc_operateur',
    name: 'Accord de service d\'assurance drone (RC opérateur)',
    category: 'commercial_financier',
    price: 3500,
    priceMax: 12000,
    description: 'Contrat d\'assurance responsabilité civile pour opérateurs de drone, conforme aux exigences ANAC CI et CIMA.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'assureur', label: 'Compagnie d\'assurance', type: 'text', required: true },
      { key: 'assure', label: 'Opérateur drone assuré', type: 'text', required: true },
      { key: 'numero_drone', label: 'Numéro d\'immatriculation du drone', type: 'text', required: true },
      { key: 'capital_garanti', label: 'Capital garanti (FCFA)', type: 'text', required: true },
      { key: 'date_prise_effet', label: 'Date de prise d\'effet', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD D\'ASSURANCE DRONE — RESPONSABILITÉ CIVILE OPÉRATEUR</h1>
<p><strong>Assureur :</strong> {{assureur}}</p>
<p><strong>Assuré :</strong> {{assure}}</p>
<p><strong>Drone immatriculé :</strong> {{numero_drone}}</p>
<h2>Article 1 — Garantie</h2>
<p>Capital garanti : {{capital_garanti}} FCFA en cas de sinistre lié aux opérations du drone assuré.</p>
<h2>Article 2 — Prise d\'effet</h2>
<p>La couverture prend effet le {{date_prise_effet}}.</p>
<h2>Article 3 — Cadre</h2>
<p>Contrat soumis au Code CIMA et à la réglementation aéronautique ivoirienne.</p>
</div>`,
  },

  {
    code: 'drone_maintenance',
    name: 'Accord de service de maintenance drone',
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: 'Contrat de maintenance préventive et curative de flottes de drones civils.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'prestataire_maintenance', label: 'Centre de maintenance drone', type: 'text', required: true },
      { key: 'client', label: 'Propriétaire de la flotte', type: 'text', required: true },
      { key: 'nombre_drones', label: 'Nombre de drones en maintenance', type: 'text', required: true },
      { key: 'type_maintenance', label: 'Type de maintenance (préventive, curative)', type: 'text', required: true },
      { key: 'date_debut_contrat', label: 'Date de début du contrat', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE MAINTENANCE DRONE</h1>
<p><strong>Prestataire :</strong> {{prestataire_maintenance}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Objet</h2>
<p>Maintenance {{type_maintenance}} de {{nombre_drones}} drone(s), démarrant le {{date_debut_contrat}}.</p>
<h2>Article 2 — Interventions</h2>
<p>Visites périodiques, remplacement des pièces usées, mises à jour firmware et calibrations inclus.</p>
<h2>Article 3 — Délai d\'intervention curative</h2>
<p>Intervention sous 48h ouvrées en cas de panne signalée.</p>
</div>`,
  },

  {
    code: 'drone_analyse_donnees',
    name: 'Accord de service d\'analyse de données drone (traitement images)',
    category: 'commercial_financier',
    price: 4500,
    priceMax: 15000,
    description: 'Contrat de traitement et analyse des données et images capturées par drone (orthomosaïques, nuages de points).',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'prestataire_data', label: 'Société de traitement de données', type: 'text', required: true },
      { key: 'client', label: 'Client propriétaire des données', type: 'text', required: true },
      { key: 'type_traitement', label: 'Type de traitement (ortho, MNT, 3D…)', type: 'text', required: true },
      { key: 'volume_donnees', label: 'Volume de données à traiter (Go)', type: 'text', required: true },
      { key: 'delai_livraison', label: 'Délai de livraison des résultats', type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D\'ANALYSE DE DONNÉES DRONE</h1>
<p><strong>Prestataire :</strong> {{prestataire_data}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Objet</h2>
<p>Traitement {{type_traitement}} de {{volume_donnees}} Go de données drone.</p>
<h2>Article 2 — Délai</h2>
<p>Livrables remis sous {{delai_livraison}} après réception des données brutes.</p>
<h2>Article 3 — Propriété intellectuelle</h2>
<p>Les résultats traités sont la propriété exclusive du client après paiement intégral.</p>
</div>`,
  },

  {
    code: 'drone_formation_pilote',
    name: 'Accord de service de formation pilote de drone',
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: 'Contrat de formation pratique et théorique à la conduite de drones civils pour particuliers et entreprises.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'formateur', label: 'Organisme de formation', type: 'text', required: true },
      { key: 'apprenant', label: 'Nom de l\'apprenant', type: 'text', required: true },
      { key: 'programme', label: 'Programme de formation', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { key: 'duree_heures', label: 'Durée totale (heures)', type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE FORMATION PILOTE DE DRONE</h1>
<p><strong>Formateur :</strong> {{formateur}}</p>
<p><strong>Apprenant :</strong> {{apprenant}}</p>
<h2>Article 1 — Programme</h2>
<p>{{programme}}</p>
<h2>Article 2 — Durée et calendrier</h2>
<p>Formation de {{duree_heures}} heures, démarrant le {{date_debut}}.</p>
<h2>Article 3 — Attestation</h2>
<p>Une attestation de formation est délivrée à l\'issue de la formation avec succès.</p>
</div>`,
  },

  {
    code: 'drone_partenariat_fai_operateur',
    name: 'Accord de partenariat FAI-opérateur drone (couverture LTE)',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 22000,
    description: 'Accord de partenariat entre fournisseur d\'accès internet et opérateur drone pour couverture de commande via réseau LTE.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'fai', label: 'Fournisseur d\'accès internet (FAI)', type: 'text', required: true },
      { key: 'operateur_drone', label: 'Opérateur drone partenaire', type: 'text', required: true },
      { key: 'zone_couverture', label: 'Zone de couverture LTE drone', type: 'text', required: true },
      { key: 'debit_garanti', label: 'Débit minimum garanti (Mbps)', type: 'text', required: true },
      { key: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE PARTENARIAT FAI — OPÉRATEUR DRONE (COUVERTURE LTE)</h1>
<p><strong>FAI :</strong> {{fai}}</p>
<p><strong>Opérateur drone :</strong> {{operateur_drone}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture d\'une connectivité LTE dédiée pour la commande et télémétrie de drones dans la zone {{zone_couverture}}.</p>
<h2>Article 2 — Qualité de service</h2>
<p>Débit minimum garanti de {{debit_garanti}} Mbps avec latence inférieure à 30ms.</p>
<h2>Article 3 — Effectivité</h2>
<p>Accord signé le {{date_signature}}.</p>
</div>`,
  },

  {
    code: 'drone_inspection_lignes_electriques',
    name: 'Accord de service de drone pour inspection de lignes électriques',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 25000,
    description: 'Contrat d\'inspection de lignes haute tension et réseaux électriques par drone pour gestionnaires de réseaux.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'prestataire', label: 'Opérateur drone énergie', type: 'text', required: true },
      { key: 'gestionnaire_reseau', label: 'Gestionnaire du réseau (CIE, CI-ENERGIES…)', type: 'text', required: true },
      { key: 'longueur_ligne_km', label: 'Longueur de ligne à inspecter (km)', type: 'text', required: true },
      { key: 'tension_kv', label: 'Tension de la ligne (kV)', type: 'text', required: true },
      { key: 'date_inspection', label: 'Date d\'inspection', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE POUR INSPECTION DE LIGNES ÉLECTRIQUES</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Gestionnaire réseau :</strong> {{gestionnaire_reseau}}</p>
<h2>Article 1 — Objet</h2>
<p>Inspection par drone de {{longueur_ligne_km}} km de ligne électrique {{tension_kv}} kV.</p>
<h2>Article 2 — Date</h2>
<p>Mission le {{date_inspection}}, coordonnée avec la cellule sécurité du gestionnaire.</p>
<h2>Article 3 — Sécurité</h2>
<p>L\'opérateur respecte les distances de sécurité réglementaires pour les lignes sous tension.</p>
</div>`,
  },

  {
    code: 'drone_suivi_pipeline',
    name: 'Accord de service de drone pour suivi de pipeline',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 26000,
    description: 'Contrat de surveillance et d\'inspection régulière de pipelines pétroliers ou gaziers par drone.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'prestataire', label: 'Opérateur drone pétrolier', type: 'text', required: true },
      { key: 'operateur_pipeline', label: 'Opérateur du pipeline', type: 'text', required: true },
      { key: 'troncon_km', label: 'Tronçon à surveiller (km)', type: 'text', required: true },
      { key: 'frequence', label: 'Fréquence de patrouille drone', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DRONE POUR SUIVI DE PIPELINE</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Opérateur pipeline :</strong> {{operateur_pipeline}}</p>
<h2>Article 1 — Objet</h2>
<p>Surveillance de {{troncon_km}} km de pipeline par patrouilles drone {{frequence}}.</p>
<h2>Article 2 — Démarrage</h2>
<p>Service démarrant le {{date_debut}}.</p>
<h2>Article 3 — Anomalies</h2>
<p>Toute fuite, intrusion ou anomalie détectée est signalée dans l\'heure à l\'opérateur.</p>
</div>`,
  },

  {
    code: 'drone_cadastre',
    name: 'Accord de service de cadastre par drone',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 18000,
    description: 'Contrat de levé cadastral par drone pour délimitation foncière et enregistrement des terres.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'bureau_geometre', label: 'Bureau du géomètre-expert', type: 'text', required: true },
      { key: 'client', label: 'Propriétaire foncier ou collectivité', type: 'text', required: true },
      { key: 'localite', label: 'Localité concernée', type: 'text', required: true },
      { key: 'nombre_parcelles', label: 'Nombre de parcelles à lever', type: 'text', required: true },
      { key: 'date_leve', label: 'Date du levé', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE CADASTRE PAR DRONE</h1>
<p><strong>Géomètre :</strong> {{bureau_geometre}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Objet</h2>
<p>Levé cadastral de {{nombre_parcelles}} parcelle(s) à {{localite}} par drone.</p>
<h2>Article 2 — Date de levé</h2>
<p>Opérations prévues le {{date_leve}}.</p>
<h2>Article 3 — Livrables</h2>
<p>Plan cadastral géoréférencé, coordonnées des bornes et rapport de levé remis sous 15 jours.</p>
</div>`,
  },

  {
    code: 'drone_rapport_mission',
    name: 'Rapport de mission drone',
    category: 'commercial_financier',
    price: 3000,
    priceMax: 8000,
    description: 'Modèle de rapport officiel de mission drone pour opérateurs certifiés ANAC CI.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'operateur', label: 'Opérateur drone', type: 'text', required: true },
      { key: 'reference_mission', label: 'Référence de la mission', type: 'text', required: true },
      { key: 'date_mission', label: 'Date de la mission', type: 'date', required: true },
      { key: 'compte_rendu', label: 'Compte rendu détaillé de la mission', type: 'textarea', required: true },
      { key: 'incidents', label: 'Incidents ou anomalies constatés', type: 'textarea', required: false },
    ]),
    body: `<div class="doc">
<h1>RAPPORT DE MISSION DRONE</h1>
<p><strong>Opérateur :</strong> {{operateur}}</p>
<p><strong>Référence :</strong> {{reference_mission}}</p>
<p><strong>Date :</strong> {{date_mission}}</p>
<h2>1. Compte rendu de mission</h2>
<p>{{compte_rendu}}</p>
<h2>2. Incidents et anomalies</h2>
<p>{{incidents}}</p>
<h2>3. Certification</h2>
<p>Je soussigné {{operateur}} certifie l\'exactitude des informations contenues dans ce rapport de mission.</p>
</div>`,
  },

  {
    code: 'drone_plan_deploiement_flotte',
    name: 'Plan de déploiement flotte de drones',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: 'Document de planification stratégique pour le déploiement d\'une flotte de drones civils en Afrique francophone.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation déployant la flotte', type: 'text', required: true },
      { key: 'taille_flotte', label: 'Nombre de drones dans la flotte', type: 'text', required: true },
      { key: 'zone_deploiement', label: 'Zone géographique de déploiement', type: 'text', required: true },
      { key: 'objectif_deploiement', label: 'Objectif du déploiement', type: 'textarea', required: true },
      { key: 'date_debut_deploiement', label: 'Date de début du déploiement', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>PLAN DE DÉPLOIEMENT FLOTTE DE DRONES</h1>
<p><strong>Organisation :</strong> {{organisation}}</p>
<h2>1. Présentation de la flotte</h2>
<p>Flotte de {{taille_flotte}} drone(s) à déployer dans la zone {{zone_deploiement}}.</p>
<h2>2. Objectifs</h2>
<p>{{objectif_deploiement}}</p>
<h2>3. Calendrier</h2>
<p>Déploiement initié le {{date_debut_deploiement}} selon les phases définies en annexe.</p>
<h2>4. Conformité réglementaire</h2>
<p>Le déploiement respecte la réglementation ANAC CI et le droit OHADA applicable.</p>
</div>`,
  },

  {
    code: 'drone_charte_usage_responsable',
    name: 'Charte de l\'usage responsable des drones civils en Afrique',
    category: 'commercial_financier',
    price: 3000,
    priceMax: 9000,
    description: 'Charte éthique et réglementaire pour l\'usage responsable des drones civils en Afrique francophone.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'signataire', label: 'Organisation ou opérateur signataire', type: 'text', required: true },
      { key: 'pays', label: 'Pays d\'opération', type: 'text', required: true },
      { key: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { key: 'engagements_specifiques', label: 'Engagements spécifiques additionnels', type: 'textarea', required: false },
    ]),
    body: `<div class="doc">
<h1>CHARTE DE L\'USAGE RESPONSABLE DES DRONES CIVILS EN AFRIQUE</h1>
<p><strong>Signataire :</strong> {{signataire}}</p>
<p><strong>Pays d\'opération :</strong> {{pays}}</p>
<p><strong>Date :</strong> {{date_signature}}</p>
<h2>Article 1 — Respect de la réglementation</h2>
<p>Le signataire s\'engage à respecter intégralement la réglementation aéronautique nationale et les traités ICAO applicables.</p>
<h2>Article 2 — Protection de la vie privée</h2>
<p>Aucune image ou donnée personnelle n\'est collectée ou divulguée sans consentement explicite.</p>
<h2>Article 3 — Sécurité et environnement</h2>
<p>Les opérations drone évitent toute nuisance sonore excessive et tout impact sur la faune et la flore locales.</p>
<h2>Article 4 — Engagements additionnels</h2>
<p>{{engagements_specifiques}}</p>
</div>`,
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // 25 TEMPLATES SATELLITE — préfixe sat2_ — catégorie commercial_financier
  // ──────────────────────────────────────────────────────────────────────────────

  {
    code: 'sat2_imagerie_satellitaire',
    name: 'Accord de service d\'imagerie satellitaire (Pléiades, SPOT modèle)',
    category: 'commercial_financier',
    price: 8000,
    priceMax: 30000,
    description: 'Contrat de commande et fourniture d\'images satellitaires haute résolution de type Pléiades ou SPOT pour projets en Afrique.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'fournisseur', label: 'Fournisseur d\'images satellites', type: 'text', required: true },
      { key: 'client', label: 'Client commanditaire', type: 'text', required: true },
      { key: 'zone_interet', label: 'Zone d\'intérêt géographique', type: 'text', required: true },
      { key: 'resolution', label: 'Résolution requise (m)', type: 'text', required: true },
      { key: 'date_acquisition', label: 'Date d\'acquisition souhaitée', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D\'IMAGERIE SATELLITAIRE</h1>
<p><strong>Fournisseur :</strong> {{fournisseur}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture d\'images satellitaires à {{resolution}} m de résolution sur la zone {{zone_interet}}.</p>
<h2>Article 2 — Acquisition</h2>
<p>Acquisition programmée le {{date_acquisition}}, sous réserve des conditions météorologiques et de disponibilité du satellite.</p>
<h2>Article 3 — Licence d\'utilisation</h2>
<p>Les images sont fournies sous licence d\'utilisation non exclusive et non cessible.</p>
</div>`,
  },

  {
    code: 'sat2_cartographie_agricole',
    name: 'Accord de service d\'observation terrestre pour cartographie agricole',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 22000,
    description: 'Contrat de fourniture de données satellitaires pour la cartographie des cultures et suivi agropastoral.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'fournisseur', label: 'Opérateur satellite agri', type: 'text', required: true },
      { key: 'organisme_agricole', label: 'Organisme agricole bénéficiaire', type: 'text', required: true },
      { key: 'region', label: 'Région agricole concernée', type: 'text', required: true },
      { key: 'type_cultures', label: 'Types de cultures à cartographier', type: 'text', required: true },
      { key: 'date_debut_service', label: 'Date de début du service', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D\'OBSERVATION TERRESTRE POUR CARTOGRAPHIE AGRICOLE</h1>
<p><strong>Fournisseur satellite :</strong> {{fournisseur}}</p>
<p><strong>Bénéficiaire :</strong> {{organisme_agricole}}</p>
<h2>Article 1 — Objet</h2>
<p>Cartographie satellitaire des cultures {{type_cultures}} dans la région {{region}}.</p>
<h2>Article 2 — Démarrage</h2>
<p>Service démarrant le {{date_debut_service}}.</p>
<h2>Article 3 — Livrables</h2>
<p>Cartes d\'occupation des sols, indices NDVI et rapports de suivi des cultures fournis mensuellement.</p>
</div>`,
  },

  {
    code: 'sat2_surveillance_deforestation',
    name: 'Accord de service de surveillance déforestation par satellite (Global Forest Watch)',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 24000,
    description: 'Contrat de surveillance de la déforestation par analyse d\'images satellitaires, sur modèle Global Forest Watch.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire surveillance forêt satellite', type: 'text', required: true },
      { key: 'autorite_forestiere', label: 'Autorité forestière mandante', type: 'text', required: true },
      { key: 'masse_forestiere', label: 'Masse forestière surveillée', type: 'text', required: true },
      { key: 'frequence_analyse', label: 'Fréquence d\'analyse satellite', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SURVEILLANCE DE LA DÉFORESTATION PAR SATELLITE</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Autorité mandante :</strong> {{autorite_forestiere}}</p>
<h2>Article 1 — Objet</h2>
<p>Surveillance satellitaire de {{masse_forestiere}} avec analyses {{frequence_analyse}}.</p>
<h2>Article 2 — Démarrage</h2>
<p>Service opérationnel à partir du {{date_debut}}.</p>
<h2>Article 3 — Alertes</h2>
<p>Toute perte de couvert forestier détectée déclenche une alerte immédiate aux autorités.</p>
</div>`,
  },

  {
    code: 'sat2_catastrophe_naturelle',
    name: 'Accord de service de surveillance de catastrophe naturelle (inondation, sécheresse)',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 26000,
    description: 'Contrat de service satellitaire pour la détection et le suivi des catastrophes naturelles en Afrique subsaharienne.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'prestataire', label: 'Agence spatiale ou opérateur satellite', type: 'text', required: true },
      { key: 'organisme_gestion_risques', label: 'Organisme de gestion des risques', type: 'text', required: true },
      { key: 'type_catastrophe', label: 'Type de catastrophe surveillée', type: 'text', required: true },
      { key: 'zone_surveillance', label: 'Zone géographique surveillée', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du service', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE SURVEILLANCE DE CATASTROPHE NATURELLE PAR SATELLITE</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Organisme bénéficiaire :</strong> {{organisme_gestion_risques}}</p>
<h2>Article 1 — Objet</h2>
<p>Surveillance satellitaire des risques de {{type_catastrophe}} dans la zone {{zone_surveillance}}.</p>
<h2>Article 2 — Démarrage</h2>
<p>Service activé le {{date_debut}}.</p>
<h2>Article 3 — Alertes précoces</h2>
<p>Le prestataire émet des bulletins d\'alerte précoce dans les 6 heures suivant la détection d\'un événement.</p>
</div>`,
  },

  {
    code: 'sat2_suivi_navires_ais',
    name: 'Accord de service de suivi des navires (AIS)',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: 'Contrat de fourniture de données AIS satellitaires pour le suivi des navires dans les eaux africaines.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'fournisseur_ais', label: 'Fournisseur de données AIS satellite', type: 'text', required: true },
      { key: 'client', label: 'Autorité maritime ou armateur', type: 'text', required: true },
      { key: 'zone_maritime', label: 'Zone maritime couverte', type: 'text', required: true },
      { key: 'frequence_mise_a_jour', label: 'Fréquence de mise à jour des positions', type: 'text', required: true },
      { key: 'date_debut_service', label: 'Date de début du service', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE SUIVI DES NAVIRES PAR SATELLITE (AIS)</h1>
<p><strong>Fournisseur AIS :</strong> {{fournisseur_ais}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture de données AIS satellitaires pour la zone maritime {{zone_maritime}}, mises à jour {{frequence_mise_a_jour}}.</p>
<h2>Article 2 — Démarrage</h2>
<p>Service opérationnel à partir du {{date_debut_service}}.</p>
<h2>Article 3 — Accès</h2>
<p>Les données sont accessibles via une interface API sécurisée ou un portail web dédié.</p>
</div>`,
  },

  {
    code: 'sat2_suivi_avions_adsb',
    name: 'Accord de service de suivi des avions (ADS-B)',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: 'Contrat de fourniture de données ADS-B satellitaires pour le suivi du trafic aérien en Afrique.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'fournisseur_adsb', label: 'Fournisseur de données ADS-B', type: 'text', required: true },
      { key: 'client', label: 'Autorité de l\'aviation civile ou aéroport', type: 'text', required: true },
      { key: 'espace_aerien', label: 'Espace aérien couvert (FIR…)', type: 'text', required: true },
      { key: 'latence_max', label: 'Latence maximale acceptable (secondes)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de démarrage du service', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE SUIVI DES AVIONS PAR SATELLITE (ADS-B)</h1>
<p><strong>Fournisseur :</strong> {{fournisseur_adsb}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture de données ADS-B satellitaires pour l\'espace aérien {{espace_aerien}} avec une latence maximale de {{latence_max}} secondes.</p>
<h2>Article 2 — Démarrage</h2>
<p>Service démarrant le {{date_debut}}.</p>
<h2>Article 3 — Conformité ICAO</h2>
<p>Les données respectent les standards ICAO Doc 9684 et les exigences ASECNA.</p>
</div>`,
  },

  {
    code: 'sat2_positionnement_gps_gnss',
    name: 'Accord de service de positionnement GPS/GNSS',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: 'Contrat de service de positionnement et navigation par satellite GNSS pour applications professionnelles en Afrique.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'fournisseur_gnss', label: 'Fournisseur service GNSS', type: 'text', required: true },
      { key: 'client', label: 'Client utilisateur', type: 'text', required: true },
      { key: 'application', label: 'Application visée (géodésie, transport…)', type: 'text', required: true },
      { key: 'precision_requise', label: 'Précision requise (cm ou m)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du service', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE POSITIONNEMENT GPS/GNSS</h1>
<p><strong>Fournisseur :</strong> {{fournisseur_gnss}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture d\'un service de positionnement GNSS pour l\'application {{application}} avec une précision de {{precision_requise}}.</p>
<h2>Article 2 — Démarrage</h2>
<p>Service disponible à partir du {{date_debut}}.</p>
<h2>Article 3 — Disponibilité</h2>
<p>Le prestataire garantit une disponibilité de service minimale de 99,5% par mois calendaire.</p>
</div>`,
  },

  {
    code: 'sat2_donnees_meteo',
    name: 'Accord de service de diffusion de données météorologiques',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: 'Contrat de fourniture de données météorologiques satellitaires pour agriculture, aviation et gestion de risques.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'fournisseur_meteo', label: 'Fournisseur de données météo satellite', type: 'text', required: true },
      { key: 'client', label: 'Organisation bénéficiaire', type: 'text', required: true },
      { key: 'produits_meteo', label: 'Produits météo fournis (pluie, vent…)', type: 'textarea', required: true },
      { key: 'frequence_diffusion', label: 'Fréquence de diffusion des données', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE DIFFUSION DE DONNÉES MÉTÉOROLOGIQUES PAR SATELLITE</h1>
<p><strong>Fournisseur :</strong> {{fournisseur_meteo}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Produits fournis</h2>
<p>{{produits_meteo}}</p>
<h2>Article 2 — Fréquence</h2>
<p>Diffusion {{frequence_diffusion}}, service démarrant le {{date_debut}}.</p>
<h2>Article 3 — Format</h2>
<p>Données fournies aux formats NetCDF, GeoTIFF et JSON via API REST sécurisée.</p>
</div>`,
  },

  {
    code: 'sat2_internet_starlink_business',
    name: 'Accord de service d\'internet par satellite (Starlink Business Afrique)',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 22000,
    description: 'Contrat d\'abonnement et d\'intégration du service d\'internet haut débit par satellite pour entreprises en Afrique.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 81,
    fieldsJson: F([
      { key: 'fournisseur', label: 'Fournisseur internet satellite', type: 'text', required: true },
      { key: 'entreprise_cliente', label: 'Entreprise cliente', type: 'text', required: true },
      { key: 'site_installation', label: 'Site d\'installation de l\'antenne', type: 'text', required: true },
      { key: 'debit_garanti', label: 'Débit descendant garanti (Mbps)', type: 'text', required: true },
      { key: 'date_activation', label: 'Date d\'activation du service', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D\'INTERNET PAR SATELLITE</h1>
<p><strong>Fournisseur :</strong> {{fournisseur}}</p>
<p><strong>Client :</strong> {{entreprise_cliente}}</p>
<h2>Article 1 — Service</h2>
<p>Fourniture d\'accès internet par satellite au site {{site_installation}} avec un débit garanti de {{debit_garanti}} Mbps.</p>
<h2>Article 2 — Activation</h2>
<p>Service activé le {{date_activation}} après installation et configuration de l\'équipement.</p>
<h2>Article 3 — SLA</h2>
<p>Disponibilité garantie à 99% par mois calendaire hors cas de force majeure.</p>
</div>`,
  },

  {
    code: 'sat2_vsat_reseau_entreprise',
    name: 'Accord de service de VSAT (réseau entreprise par satellite)',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 26000,
    description: 'Contrat de déploiement et exploitation d\'un réseau VSAT pour entreprises et organisations multi-sites en Afrique.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'operateur_vsat', label: 'Opérateur VSAT', type: 'text', required: true },
      { key: 'client', label: 'Entreprise ou organisation cliente', type: 'text', required: true },
      { key: 'nombre_sites', label: 'Nombre de sites à connecter', type: 'text', required: true },
      { key: 'pays_deploiement', label: 'Pays ou région de déploiement', type: 'text', required: true },
      { key: 'date_deploiement', label: 'Date de déploiement', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE VSAT — RÉSEAU ENTREPRISE PAR SATELLITE</h1>
<p><strong>Opérateur VSAT :</strong> {{operateur_vsat}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Objet</h2>
<p>Déploiement d\'un réseau VSAT reliant {{nombre_sites}} site(s) en {{pays_deploiement}}.</p>
<h2>Article 2 — Déploiement</h2>
<p>Installation prévue à partir du {{date_deploiement}}.</p>
<h2>Article 3 — Support</h2>
<p>Support technique 24h/24, 7j/7 avec astreinte locale incluse dans le contrat.</p>
</div>`,
  },

  {
    code: 'sat2_telemedecine_satellite',
    name: 'Accord de service de télémédecine par satellite (zone rurale)',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: 'Contrat de fourniture de connectivité satellitaire pour services de télémédecine en zones rurales et enclavées.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'operateur_satellite', label: 'Opérateur satellite santé', type: 'text', required: true },
      { key: 'structure_sante', label: 'Structure de santé bénéficiaire', type: 'text', required: true },
      { key: 'localite_rurale', label: 'Localité rurale desservie', type: 'text', required: true },
      { key: 'services_telemedicine', label: 'Services de télémédecine proposés', type: 'textarea', required: true },
      { key: 'date_mise_en_service', label: 'Date de mise en service', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TÉLÉMÉDECINE PAR SATELLITE</h1>
<p><strong>Opérateur satellite :</strong> {{operateur_satellite}}</p>
<p><strong>Structure bénéficiaire :</strong> {{structure_sante}}</p>
<h2>Article 1 — Objet</h2>
<p>Fourniture d\'une connexion satellitaire à {{localite_rurale}} pour les services de télémédecine suivants :</p>
<p>{{services_telemedicine}}</p>
<h2>Article 2 — Mise en service</h2>
<p>Service opérationnel le {{date_mise_en_service}}.</p>
<h2>Article 3 — Conformité</h2>
<p>Le service est conforme aux recommandations OMS en matière de télémédecine et au droit ivoirien de la santé.</p>
</div>`,
  },

  {
    code: 'sat2_enseignement_distance',
    name: 'Accord de service d\'enseignement à distance par satellite',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: 'Contrat de fourniture d\'infrastructure satellitaire pour plateformes d\'enseignement à distance en milieu rural africain.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'operateur', label: 'Opérateur satellite éducation', type: 'text', required: true },
      { key: 'institution_edu', label: 'Institution éducative bénéficiaire', type: 'text', required: true },
      { key: 'nombre_etablissements', label: 'Nombre d\'établissements connectés', type: 'text', required: true },
      { key: 'region', label: 'Région concernée', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du service', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D\'ENSEIGNEMENT À DISTANCE PAR SATELLITE</h1>
<p><strong>Opérateur satellite :</strong> {{operateur}}</p>
<p><strong>Institution bénéficiaire :</strong> {{institution_edu}}</p>
<h2>Article 1 — Objet</h2>
<p>Connexion satellitaire de {{nombre_etablissements}} établissement(s) scolaires en région {{region}} pour l\'enseignement à distance.</p>
<h2>Article 2 — Démarrage</h2>
<p>Service opérationnel à partir du {{date_debut}}.</p>
<h2>Article 3 — Contenus</h2>
<p>L\'institution reste responsable des contenus pédagogiques diffusés sur l\'infrastructure fournie.</p>
</div>`,
  },

  {
    code: 'sat2_telesurveillance_securite',
    name: 'Accord de service de télésurveillance par satellite (sécurité)',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 24000,
    description: 'Contrat de télésurveillance de sites distants par liaison satellite pour applications de sécurité.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'prestataire', label: 'Société de sécurité satellite', type: 'text', required: true },
      { key: 'client', label: 'Site client à surveiller', type: 'text', required: true },
      { key: 'nombre_cameras', label: 'Nombre de caméras raccordées', type: 'text', required: true },
      { key: 'type_surveillance', label: 'Type de surveillance (24h/24, périodique…)', type: 'text', required: true },
      { key: 'date_installation', label: 'Date d\'installation', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TÉLÉSURVEILLANCE PAR SATELLITE</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Objet</h2>
<p>Surveillance {{type_surveillance}} de {{nombre_cameras}} caméra(s) via liaison satellite.</p>
<h2>Article 2 — Installation</h2>
<p>Équipements installés et service activé le {{date_installation}}.</p>
<h2>Article 3 — Confidentialité</h2>
<p>Toutes les images sont chiffrées de bout en bout et conservées 30 jours.</p>
</div>`,
  },

  {
    code: 'sat2_partenariat_cnes_esa',
    name: 'Accord de partenariat CNES/ESA-organisation africaine',
    category: 'commercial_financier',
    price: 9000,
    priceMax: 35000,
    description: 'Accord-cadre de partenariat entre agence spatiale européenne (CNES/ESA) et organisation africaine pour coopération spatiale.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 56,
    fieldsJson: F([
      { key: 'agence_europeenne', label: 'Agence spatiale européenne partenaire', type: 'text', required: true },
      { key: 'organisation_africaine', label: 'Organisation africaine partenaire', type: 'text', required: true },
      { key: 'domaine_cooperation', label: 'Domaine de coopération', type: 'textarea', required: true },
      { key: 'duree_accord', label: 'Durée de l\'accord (années)', type: 'text', required: true },
      { key: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE PARTENARIAT AGENCE SPATIALE EUROPÉENNE — ORGANISATION AFRICAINE</h1>
<p><strong>Agence européenne :</strong> {{agence_europeenne}}</p>
<p><strong>Organisation africaine :</strong> {{organisation_africaine}}</p>
<h2>Article 1 — Domaine de coopération</h2>
<p>{{domaine_cooperation}}</p>
<h2>Article 2 — Durée</h2>
<p>Accord conclu pour {{duree_accord}} an(s) à compter du {{date_signature}}, renouvelable par accord mutuel.</p>
<h2>Article 3 — Gouvernance</h2>
<p>Un comité de pilotage conjoint se réunit semestriellement pour évaluer la mise en oeuvre du partenariat.</p>
</div>`,
  },

  {
    code: 'sat2_plateforme_donnees_geospatiales',
    name: 'Accord de service de plate-forme de données géospatiales',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 22000,
    description: 'Contrat de fourniture et d\'hébergement d\'une plate-forme de données géospatiales satellitaires en SaaS.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'editeur', label: 'Éditeur de la plate-forme géospatiale', type: 'text', required: true },
      { key: 'client', label: 'Organisation utilisatrice', type: 'text', required: true },
      { key: 'fonctionnalites', label: 'Fonctionnalités souscrites', type: 'textarea', required: true },
      { key: 'nombre_utilisateurs', label: 'Nombre d\'utilisateurs', type: 'text', required: true },
      { key: 'date_ouverture', label: 'Date d\'ouverture des accès', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE PLATE-FORME DE DONNÉES GÉOSPATIALES</h1>
<p><strong>Éditeur :</strong> {{editeur}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Article 1 — Fonctionnalités</h2>
<p>{{fonctionnalites}}</p>
<h2>Article 2 — Accès</h2>
<p>Accès ouvert pour {{nombre_utilisateurs}} utilisateur(s) à compter du {{date_ouverture}}.</p>
<h2>Article 3 — Données</h2>
<p>Les données produites par le client restent sa propriété exclusive. L\'éditeur ne les exploite pas à des fins commerciales.</p>
</div>`,
  },

  {
    code: 'sat2_geospatiale_planification_urbaine',
    name: 'Accord de service de géospatiale pour planification urbaine',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 26000,
    description: 'Contrat de fourniture de données et analyses géospatiales satellitaires pour la planification urbaine en Afrique.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'bureau_etudes', label: 'Bureau d\'études géospatiales', type: 'text', required: true },
      { key: 'collectivite', label: 'Collectivité ou ministère bénéficiaire', type: 'text', required: true },
      { key: 'ville', label: 'Ville ou agglomération concernée', type: 'text', required: true },
      { key: 'type_etude', label: 'Type d\'étude urbaine (extension, densité…)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début de l\'étude', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE GÉOSPATIALE POUR PLANIFICATION URBAINE</h1>
<p><strong>Bureau d\'études :</strong> {{bureau_etudes}}</p>
<p><strong>Bénéficiaire :</strong> {{collectivite}}</p>
<h2>Article 1 — Objet</h2>
<p>Étude géospatiale satellitaire de type {{type_etude}} pour la ville de {{ville}}.</p>
<h2>Article 2 — Démarrage</h2>
<p>Études démarrant le {{date_debut}}.</p>
<h2>Article 3 — Livrables</h2>
<p>Cartes thématiques, rapport d\'analyse et base de données SIG remis en fin d\'étude.</p>
</div>`,
  },

  {
    code: 'sat2_gestion_crues_alerte',
    name: 'Accord de service de satellite pour gestion des crues (alerte)',
    category: 'commercial_financier',
    price: 7000,
    priceMax: 25000,
    description: 'Contrat de service satellitaire pour le suivi des niveaux d\'eau et l\'alerte précoce aux crues fluviales.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'fournisseur', label: 'Fournisseur service hydrologie satellite', type: 'text', required: true },
      { key: 'autorite_hydraulique', label: 'Autorité hydraulique bénéficiaire', type: 'text', required: true },
      { key: 'bassin_versant', label: 'Bassin versant surveillé', type: 'text', required: true },
      { key: 'seuil_alerte', label: 'Seuil de déclenchement de l\'alerte (m)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date d\'activation du service', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE SATELLITE POUR GESTION DES CRUES</h1>
<p><strong>Fournisseur :</strong> {{fournisseur}}</p>
<p><strong>Autorité bénéficiaire :</strong> {{autorite_hydraulique}}</p>
<h2>Article 1 — Surveillance</h2>
<p>Suivi satellitaire du bassin versant {{bassin_versant}} avec alerte déclenchée à {{seuil_alerte}} m de montée des eaux.</p>
<h2>Article 2 — Activation</h2>
<p>Service activé le {{date_debut}}.</p>
<h2>Article 3 — Alertes</h2>
<p>Les alertes sont transmises en temps réel par SMS, email et API aux autorités compétentes.</p>
</div>`,
  },

  {
    code: 'sat2_suivi_malaria',
    name: 'Accord de service de satellite pour suivi de la malaria (moustiques)',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: 'Contrat de service d\'analyse satellitaire pour la cartographie et le suivi des gîtes larvaires et de la malaria.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'prestataire', label: 'Prestataire satellite santé publique', type: 'text', required: true },
      { key: 'institution_sante', label: 'Institution de santé publique bénéficiaire', type: 'text', required: true },
      { key: 'zone_surveillance', label: 'Zone sanitaire surveillée', type: 'text', required: true },
      { key: 'indicateurs', label: 'Indicateurs environnementaux suivis', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début du service', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE SATELLITE POUR SUIVI DE LA MALARIA</h1>
<p><strong>Prestataire :</strong> {{prestataire}}</p>
<p><strong>Institution bénéficiaire :</strong> {{institution_sante}}</p>
<h2>Article 1 — Zone surveillée</h2>
<p>Analyse satellitaire de la zone {{zone_surveillance}} pour la prédiction des risques de malaria.</p>
<h2>Article 2 — Indicateurs</h2>
<p>{{indicateurs}}</p>
<h2>Article 3 — Démarrage</h2>
<p>Service opérationnel à compter du {{date_debut}}.</p>
</div>`,
  },

  {
    code: 'sat2_reseau_reference_gnss',
    name: 'Accord de service de réseau de référence GNSS (IGN Afrique)',
    category: 'commercial_financier',
    price: 8000,
    priceMax: 28000,
    description: 'Contrat de déploiement et exploitation d\'un réseau de stations de référence GNSS permanentes pour l\'Afrique.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'operateur_reseau', label: 'Opérateur du réseau GNSS', type: 'text', required: true },
      { key: 'autorite_geographique', label: 'Autorité géographique nationale', type: 'text', required: true },
      { key: 'nombre_stations', label: 'Nombre de stations de référence', type: 'text', required: true },
      { key: 'pays', label: 'Pays ou région couverts', type: 'text', required: true },
      { key: 'date_mise_en_service', label: 'Date de mise en service', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE RÉSEAU DE RÉFÉRENCE GNSS</h1>
<p><strong>Opérateur :</strong> {{operateur_reseau}}</p>
<p><strong>Autorité géographique :</strong> {{autorite_geographique}}</p>
<h2>Article 1 — Réseau</h2>
<p>Déploiement de {{nombre_stations}} station(s) GNSS permanentes en {{pays}}.</p>
<h2>Article 2 — Mise en service</h2>
<p>Réseau opérationnel le {{date_mise_en_service}}.</p>
<h2>Article 3 — Accès</h2>
<p>Les données de correction sont diffusées en temps réel via le protocole NTRIP.</p>
</div>`,
  },

  {
    code: 'sat2_navigation_maritime_egnos',
    name: 'Accord de service de navigation maritime par satellite (EGNOS)',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: 'Contrat de fourniture du service de navigation maritime par satellite augmenté EGNOS/SBAS pour ports africains.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'fournisseur_sbas', label: 'Fournisseur service SBAS/EGNOS', type: 'text', required: true },
      { key: 'autorite_portuaire', label: 'Autorité portuaire bénéficiaire', type: 'text', required: true },
      { key: 'port', label: 'Port concerné', type: 'text', required: true },
      { key: 'precision_requise', label: 'Précision de navigation requise (m)', type: 'text', required: true },
      { key: 'date_activation', label: 'Date d\'activation', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE NAVIGATION MARITIME PAR SATELLITE</h1>
<p><strong>Fournisseur SBAS :</strong> {{fournisseur_sbas}}</p>
<p><strong>Autorité portuaire :</strong> {{autorite_portuaire}}</p>
<h2>Article 1 — Service</h2>
<p>Fourniture du service de navigation augmentée SBAS pour le port de {{port}} avec une précision de {{precision_requise}} m.</p>
<h2>Article 2 — Activation</h2>
<p>Service activé le {{date_activation}}.</p>
<h2>Article 3 — Conformité</h2>
<p>Le service respecte les recommandations IMO et les standards ICAO applicables à la navigation maritime.</p>
</div>`,
  },

  {
    code: 'sat2_rapport_analyse_imagerie',
    name: 'Rapport d\'analyse imagerie satellitaire',
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: 'Modèle de rapport d\'analyse d\'imagerie satellitaire pour usage professionnel et institutionnel.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'analyste', label: 'Analyste ou organisme auteur', type: 'text', required: true },
      { key: 'commanditaire', label: 'Commanditaire du rapport', type: 'text', required: true },
      { key: 'date_analyse', label: 'Date de l\'analyse', type: 'date', required: true },
      { key: 'zone_analysee', label: 'Zone analysée', type: 'text', required: true },
      { key: 'resultats', label: 'Résultats et conclusions de l\'analyse', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
<h1>RAPPORT D\'ANALYSE IMAGERIE SATELLITAIRE</h1>
<p><strong>Analyste :</strong> {{analyste}}</p>
<p><strong>Commanditaire :</strong> {{commanditaire}}</p>
<p><strong>Date :</strong> {{date_analyse}}</p>
<h2>1. Zone d\'analyse</h2>
<p>{{zone_analysee}}</p>
<h2>2. Résultats et conclusions</h2>
<p>{{resultats}}</p>
<h2>3. Certification</h2>
<p>Je soussigné {{analyste}} certifie l\'exactitude des analyses contenues dans ce rapport.</p>
</div>`,
  },

  {
    code: 'sat2_plan_donnees_spatiales',
    name: 'Plan d\'utilisation des données spatiales',
    category: 'commercial_financier',
    price: 5000,
    priceMax: 16000,
    description: 'Document de planification stratégique pour l\'intégration et l\'utilisation des données spatiales dans les organisations africaines.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation élaborant le plan', type: 'text', required: true },
      { key: 'objectifs', label: 'Objectifs stratégiques du plan spatial', type: 'textarea', required: true },
      { key: 'types_donnees', label: 'Types de données spatiales concernées', type: 'textarea', required: true },
      { key: 'date_adoption', label: 'Date d\'adoption du plan', type: 'date', required: true },
      { key: 'horizon_planification', label: 'Horizon de planification (années)', type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>PLAN D\'UTILISATION DES DONNÉES SPATIALES</h1>
<p><strong>Organisation :</strong> {{organisation}}</p>
<p><strong>Date d\'adoption :</strong> {{date_adoption}}</p>
<p><strong>Horizon :</strong> {{horizon_planification}} an(s)</p>
<h2>1. Objectifs stratégiques</h2>
<p>{{objectifs}}</p>
<h2>2. Types de données concernées</h2>
<p>{{types_donnees}}</p>
<h2>3. Gouvernance</h2>
<p>Un coordinateur des données spatiales est désigné pour piloter la mise en oeuvre du présent plan.</p>
</div>`,
  },

  {
    code: 'sat2_formation_technologies_spatiales',
    name: 'Accord de formation aux technologies spatiales',
    category: 'commercial_financier',
    price: 4000,
    priceMax: 14000,
    description: 'Contrat de formation aux technologies spatiales et à l\'exploitation des données satellitaires pour professionnels africains.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'centre_formation', label: 'Centre de formation spatial', type: 'text', required: true },
      { key: 'organisation_stagiaire', label: 'Organisation des stagiaires', type: 'text', required: true },
      { key: 'programme', label: 'Programme de formation', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { key: 'duree_jours', label: 'Durée de la formation (jours)', type: 'text', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE FORMATION AUX TECHNOLOGIES SPATIALES</h1>
<p><strong>Centre de formation :</strong> {{centre_formation}}</p>
<p><strong>Organisation bénéficiaire :</strong> {{organisation_stagiaire}}</p>
<h2>Article 1 — Programme</h2>
<p>{{programme}}</p>
<h2>Article 2 — Calendrier</h2>
<p>Formation de {{duree_jours}} jours démarrant le {{date_debut}}.</p>
<h2>Article 3 — Certification</h2>
<p>Les participants ayant satisfait aux évaluations reçoivent un certificat de compétences en technologies spatiales.</p>
</div>`,
  },

  {
    code: 'sat2_partenariat_agence_universite',
    name: 'Accord de partenariat agence spatiale-université africaine',
    category: 'commercial_financier',
    price: 6000,
    priceMax: 20000,
    description: 'Accord de partenariat entre une agence spatiale et une université africaine pour recherche, formation et accès aux données spatiales.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'agence_spatiale', label: 'Agence spatiale partenaire', type: 'text', required: true },
      { key: 'universite', label: 'Université africaine partenaire', type: 'text', required: true },
      { key: 'axes_cooperation', label: 'Axes de coopération (recherche, formation…)', type: 'textarea', required: true },
      { key: 'duree_partenariat', label: 'Durée du partenariat (années)', type: 'text', required: true },
      { key: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE PARTENARIAT AGENCE SPATIALE — UNIVERSITÉ AFRICAINE</h1>
<p><strong>Agence spatiale :</strong> {{agence_spatiale}}</p>
<p><strong>Université :</strong> {{universite}}</p>
<h2>Article 1 — Axes de coopération</h2>
<p>{{axes_cooperation}}</p>
<h2>Article 2 — Durée</h2>
<p>Partenariat conclu pour {{duree_partenariat}} an(s) à compter du {{date_signature}}.</p>
<h2>Article 3 — Propriété intellectuelle</h2>
<p>Les résultats de recherche conjoints font l\'objet d\'une politique de co-propriété définie en annexe.</p>
</div>`,
  },

  {
    code: 'sat2_charte_espace_developpement',
    name: 'Charte de l\'espace au service du développement africain',
    category: 'commercial_financier',
    price: 3000,
    priceMax: 10000,
    description: 'Charte d\'engagement pour l\'utilisation des technologies spatiales au service du développement durable en Afrique.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'signataire', label: 'Organisation signataire', type: 'text', required: true },
      { key: 'pays', label: 'Pays ou organisation sous-régionale', type: 'text', required: true },
      { key: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { key: 'engagements', label: 'Engagements spécifiques de l\'organisation', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
<h1>CHARTE DE L\'ESPACE AU SERVICE DU DÉVELOPPEMENT AFRICAIN</h1>
<p><strong>Signataire :</strong> {{signataire}}</p>
<p><strong>Pays/Organisation :</strong> {{pays}}</p>
<p><strong>Date :</strong> {{date_signature}}</p>
<h2>Préambule</h2>
<p>Convaincus que les technologies spatiales constituent un levier stratégique pour le développement durable de l\'Afrique, les signataires s\'engagent comme suit :</p>
<h2>Article 1 — Accès équitable aux données spatiales</h2>
<p>Promouvoir un accès ouvert et équitable aux données satellitaires pour les nations africaines.</p>
<h2>Article 2 — Renforcement des capacités</h2>
<p>Investir dans la formation des ressources humaines africaines aux technologies spatiales.</p>
<h2>Article 3 — Engagements spécifiques</h2>
<p>{{engagements}}</p>
<h2>Article 4 — Révision</h2>
<p>La présente charte est révisable tous les 3 ans par consensus des signataires.</p>
</div>`,
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
  console.log(`Batch 97b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
