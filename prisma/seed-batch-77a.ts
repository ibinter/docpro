import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── EdTech / Formation digitale (25) ───
  {
    code: 'edu2_lms', name: "Accord de service de plateforme LMS", category: 'academique', price: 4000, priceMax: 12000,
    description: "Accord encadrant la mise à disposition et l'utilisation d'une plateforme LMS pour la gestion de formations en ligne.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_prestataire',label:"Nom du prestataire LMS",type:'text',required:true},
      {key:'nom_client',label:"Nom de l'établissement client",type:'text',required:true},
      {key:'date_debut',label:"Date de début du service",type:'date',required:true},
      {key:'date_fin',label:"Date de fin du service",type:'date',required:true},
      {key:'nombre_apprenants',label:"Nombre maximal d'apprenants",type:'text',required:true},
      {key:'montant_abonnement',label:"Montant de l'abonnement mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PLATEFORME LMS</h1><p>Entre <strong>{{nom_prestataire}}</strong>, ci-après dénommé le Prestataire, et <strong>{{nom_client}}</strong>, ci-après dénommé le Client.</p><h2>Article 1 — Objet</h2><p>Le Prestataire s'engage à mettre à disposition du Client une plateforme LMS (Learning Management System) permettant la gestion, la diffusion et le suivi de formations en ligne.</p><h2>Article 2 — Durée</h2><p>Le présent accord prend effet le <strong>{{date_debut}}</strong> et se termine le <strong>{{date_fin}}</strong>.</p><h2>Article 3 — Capacité</h2><p>La plateforme est configurée pour accueillir un maximum de <strong>{{nombre_apprenants}}</strong> apprenants simultanément.</p><h2>Article 4 — Tarification</h2><p>Le Client s'acquitte d'un abonnement mensuel de <strong>{{montant_abonnement}}</strong> FCFA.</p><h2>Article 5 — Droit applicable</h2><p>Le présent accord est régi par le droit OHADA et les lois en vigueur en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'edu2_mooc', name: "Accord de service de MOOC", category: 'academique', price: 3500, priceMax: 10000,
    description: "Accord encadrant la conception et la diffusion de cours ouverts massifs en ligne (MOOC) pour une institution.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'institution',label:"Nom de l'institution",type:'text',required:true},
      {key:'titre_mooc',label:"Titre du MOOC",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
      {key:'duree_semaines',label:"Durée du MOOC (semaines)",type:'text',required:true},
      {key:'langue',label:"Langue d'enseignement",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MOOC</h1><p>L'institution <strong>{{institution}}</strong> confie la production du MOOC intitulé <strong>{{titre_mooc}}</strong> au Prestataire.</p><h2>Article 1 — Objet</h2><p>Le Prestataire assure la conception, la production et la diffusion du cours ouvert massif en ligne défini ci-dessus.</p><h2>Article 2 — Calendrier</h2><p>Le MOOC est lancé le <strong>{{date_lancement}}</strong> pour une durée de <strong>{{duree_semaines}}</strong> semaines.</p><h2>Article 3 — Langue</h2><p>Le cours est dispensé en <strong>{{langue}}</strong>.</p><h2>Article 4 — Propriété intellectuelle</h2><p>Les contenus produits restent la propriété conjointe de l'institution et du Prestataire selon les modalités annexées.</p></div>`
  },
  {
    code: 'edu2_microlearning', name: "Accord de service de micro-learning", category: 'academique', price: 3000, priceMax: 9000,
    description: "Accord portant sur la création et la diffusion de modules de micro-learning pour la montée en compétences des apprenants.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'domaine_formation',label:"Domaine de formation",type:'text',required:true},
      {key:'nombre_modules',label:"Nombre de modules",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'prix_module',label:"Prix par module (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MICRO-LEARNING</h1><p>Entre le Prestataire et <strong>{{client}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le Prestataire conçoit <strong>{{nombre_modules}}</strong> modules de micro-learning portant sur le domaine : <strong>{{domaine_formation}}</strong>.</p><h2>Article 2 — Livraison</h2><p>Les modules sont livrés au plus tard le <strong>{{date_livraison}}</strong>.</p><h2>Article 3 — Tarification</h2><p>Le prix unitaire par module est de <strong>{{prix_module}}</strong> FCFA.</p><h2>Article 4 — Garantie</h2><p>Le Prestataire garantit l'accessibilité des modules sur supports mobiles et desktop pendant toute la durée du contrat.</p></div>`
  },
  {
    code: 'edu2_gamification', name: "Accord de service de gamification de la formation", category: 'academique', price: 4000, priceMax: 12000,
    description: "Accord encadrant l'intégration de mécanismes de gamification dans un dispositif de formation pour accroître l'engagement.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'plateforme',label:"Plateforme cible",type:'text',required:true},
      {key:'mecanismes',label:"Mécanismes de gamification prévus",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'budget',label:"Budget alloué (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GAMIFICATION DE LA FORMATION</h1><p>Entre le Prestataire et <strong>{{client}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le Prestataire intègre des mécanismes de gamification sur la plateforme <strong>{{plateforme}}</strong> incluant : <strong>{{mecanismes}}</strong>.</p><h2>Article 2 — Calendrier</h2><p>Les travaux débutent le <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Budget</h2><p>Le budget total est fixé à <strong>{{budget}}</strong> FCFA.</p><h2>Article 4 — Indicateurs</h2><p>L'efficacité de la gamification est mesurée par le taux d'engagement, le taux de complétion et la progression des scores.</p></div>`
  },
  {
    code: 'edu2_vr_pedagogique', name: "Accord de service de réalité virtuelle (VR) pédagogique", category: 'academique', price: 8000, priceMax: 24000,
    description: "Accord pour la conception et le déploiement de modules pédagogiques en réalité virtuelle dans un contexte éducatif africain.", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'institution',label:"Institution bénéficiaire",type:'text',required:true},
      {key:'matiere',label:"Matière concernée",type:'text',required:true},
      {key:'nombre_scenarios',label:"Nombre de scénarios VR",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
      {key:'montant',label:"Montant total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉALITÉ VIRTUELLE PÉDAGOGIQUE</h1><p>Entre le Prestataire et l'institution <strong>{{institution}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le Prestataire développe <strong>{{nombre_scenarios}}</strong> scénarios de réalité virtuelle pour l'enseignement de <strong>{{matiere}}</strong>.</p><h2>Article 2 — Livraison</h2><p>Les modules VR sont livrés le <strong>{{date_livraison}}</strong>.</p><h2>Article 3 — Rémunération</h2><p>Le montant total est de <strong>{{montant}}</strong> FCFA.</p><h2>Article 4 — Compatibilité matérielle</h2><p>Les modules sont compatibles avec les casques VR disponibles sur le marché africain.</p></div>`
  },
  {
    code: 'edu2_ar_educative', name: "Accord de service de réalité augmentée (AR) éducative", category: 'academique', price: 7000, priceMax: 20000,
    description: "Accord portant sur le développement d'outils pédagogiques basés sur la réalité augmentée pour enrichir l'expérience d'apprentissage.", templateType: 'pdf', classe: 'A', active: true, popularity: 53,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'niveau_scolaire',label:"Niveau scolaire ciblé",type:'text',required:true},
      {key:'nombre_modules',label:"Nombre de modules AR",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'prix_total',label:"Prix total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉALITÉ AUGMENTÉE ÉDUCATIVE</h1><p>Entre le Prestataire et <strong>{{client}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le Prestataire développe <strong>{{nombre_modules}}</strong> modules AR destinés au niveau <strong>{{niveau_scolaire}}</strong>.</p><h2>Article 2 — Calendrier</h2><p>Le projet débute le <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Rémunération</h2><p>Le prix total est de <strong>{{prix_total}}</strong> FCFA.</p><h2>Article 4 — Support</h2><p>Les modules sont accessibles via smartphone et tablette sans équipement supplémentaire.</p></div>`
  },
  {
    code: 'edu2_ia_tuteur', name: "Accord de service d'intelligence artificielle tutorielle", category: 'academique', price: 6000, priceMax: 18000,
    description: "Accord encadrant le déploiement d'un tuteur intelligent basé sur l'IA pour l'accompagnement personnalisé des apprenants.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'institution',label:"Institution cliente",type:'text',required:true},
      {key:'matiere_cible',label:"Matière cible du tuteur IA",type:'text',required:true},
      {key:'date_deploiement',label:"Date de déploiement",type:'date',required:true},
      {key:'nombre_utilisateurs',label:"Nombre d'utilisateurs prévus",type:'text',required:true},
      {key:'cout_annuel',label:"Coût annuel de la licence (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INTELLIGENCE ARTIFICIELLE TUTORIELLE</h1><p>Entre le Prestataire et l'institution <strong>{{institution}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le Prestataire déploie un tuteur intelligent IA spécialisé en <strong>{{matiere_cible}}</strong> pour un effectif de <strong>{{nombre_utilisateurs}}</strong> utilisateurs.</p><h2>Article 2 — Déploiement</h2><p>Le système est opérationnel le <strong>{{date_deploiement}}</strong>.</p><h2>Article 3 — Licence</h2><p>Le coût annuel de la licence est de <strong>{{cout_annuel}}</strong> FCFA.</p><h2>Article 4 — Confidentialité des données</h2><p>Les données d'apprentissage sont traitées conformément aux lois ivoiriennes sur la protection des données personnelles.</p></div>`
  },
  {
    code: 'edu2_classe_virtuelle', name: "Accord de service de classe virtuelle synchrone", category: 'academique', price: 3000, priceMax: 9000,
    description: "Accord portant sur la mise en place de classes virtuelles synchrones (type Zoom pédagogique) pour l'enseignement à distance.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'formateur',label:"Nom du formateur",type:'text',required:true},
      {key:'matiere',label:"Matière enseignée",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'date_premiere_seance',label:"Date de la première séance",type:'date',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CLASSE VIRTUELLE SYNCHRONE</h1><p>Le formateur <strong>{{formateur}}</strong> s'engage à dispenser <strong>{{nombre_seances}}</strong> séances de classe virtuelle en <strong>{{matiere}}</strong>.</p><h2>Article 1 — Objet</h2><p>Les séances sont conduites en temps réel via une plateforme de visioconférence pédagogique.</p><h2>Article 2 — Calendrier</h2><p>La première séance se tient le <strong>{{date_premiere_seance}}</strong>.</p><h2>Article 3 — Tarification</h2><p>Le tarif par séance est de <strong>{{tarif_seance}}</strong> FCFA.</p><h2>Article 4 — Enregistrement</h2><p>Les séances peuvent être enregistrées avec le consentement préalable des apprenants.</p></div>`
  },
  {
    code: 'edu2_coaching_ligne', name: "Accord de service de coaching individuel en ligne", category: 'academique', price: 3500, priceMax: 10000,
    description: "Accord encadrant une prestation de coaching individuel en ligne pour le développement personnel et professionnel.", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'coach',label:"Nom du coach",type:'text',required:true},
      {key:'coache',label:"Nom du coaché",type:'text',required:true},
      {key:'objectif',label:"Objectif principal du coaching",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'nombre_sessions',label:"Nombre de sessions",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COACHING INDIVIDUEL EN LIGNE</h1><p>Entre le coach <strong>{{coach}}</strong> et le coaché <strong>{{coache}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le coach accompagne individuellement le coaché en ligne vers l'objectif suivant : <strong>{{objectif}}</strong>.</p><h2>Article 2 — Sessions</h2><p>Un total de <strong>{{nombre_sessions}}</strong> sessions est prévu, à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Confidentialité</h2><p>Le coach s'engage à la confidentialité absolue des échanges.</p><h2>Article 4 — Éthique</h2><p>La relation de coaching respecte les standards ICF et les valeurs culturelles africaines.</p></div>`
  },
  {
    code: 'edu2_mentorat_digital', name: "Accord de service de mentorat professionnel digital", category: 'academique', price: 3000, priceMax: 8000,
    description: "Accord de mentorat professionnel en ligne entre un mentor expérimenté et un mentoré en développement de carrière.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'mentor',label:"Nom du mentor",type:'text',required:true},
      {key:'mentore',label:"Nom du mentoré",type:'text',required:true},
      {key:'secteur',label:"Secteur professionnel",type:'text',required:true},
      {key:'duree_mois',label:"Durée du mentorat (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MENTORAT PROFESSIONNEL DIGITAL</h1><p>Entre le mentor <strong>{{mentor}}</strong> et le mentoré <strong>{{mentore}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le mentor accompagne le mentoré dans le secteur <strong>{{secteur}}</strong> via des échanges digitaux réguliers.</p><h2>Article 2 — Durée</h2><p>Le mentorat s'étend sur <strong>{{duree_mois}}</strong> mois à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Engagements réciproques</h2><p>Le mentor partage son expérience ; le mentoré s'engage à appliquer les conseils reçus.</p><h2>Article 4 — Gratuité ou rémunération</h2><p>Les modalités financières du présent accord sont précisées en annexe.</p></div>`
  },
  {
    code: 'edu2_codage', name: "Accord de service de formation en codage et programmation", category: 'academique', price: 4000, priceMax: 12000,
    description: "Accord encadrant une formation en ligne en codage et programmation (Python, JavaScript, etc.) pour apprenants africains.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'langage',label:"Langage(s) enseigné(s)",type:'text',required:true},
      {key:'niveau',label:"Niveau (débutant/intermédiaire/avancé)",type:'text',required:true},
      {key:'duree_heures',label:"Durée totale (heures)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'frais',label:"Frais de formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN CODAGE ET PROGRAMMATION</h1><p>L'organisme <strong>{{organisme}}</strong> propose une formation en <strong>{{langage}}</strong> de niveau <strong>{{niveau}}</strong>.</p><h2>Article 1 — Objet</h2><p>La formation vise à doter l'apprenant de compétences pratiques en développement logiciel.</p><h2>Article 2 — Durée et calendrier</h2><p>La formation dure <strong>{{duree_heures}}</strong> heures et débute le <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Frais</h2><p>Les frais de formation s'élèvent à <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Certification</h2><p>Une attestation de réussite est délivrée à l'issue de la formation.</p></div>`
  },
  {
    code: 'edu2_data_science', name: "Accord de service de formation en data science", category: 'academique', price: 5000, priceMax: 15000,
    description: "Accord portant sur une formation en ligne en data science, analyse de données et machine learning.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'programme',label:"Intitulé du programme",type:'text',required:true},
      {key:'duree_semaines',label:"Durée (semaines)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'cout',label:"Coût total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN DATA SCIENCE</h1><p>L'organisme <strong>{{organisme}}</strong> dispense le programme <strong>{{programme}}</strong>.</p><h2>Article 1 — Contenu</h2><p>La formation couvre la collecte, le traitement et la visualisation des données, ainsi que les bases du machine learning.</p><h2>Article 2 — Calendrier</h2><p>La formation se déroule sur <strong>{{duree_semaines}}</strong> semaines à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Coût</h2><p>Le coût total est de <strong>{{cout}}</strong> FCFA.</p><h2>Article 4 — Prérequis</h2><p>L'apprenant doit maîtriser les bases des mathématiques et d'un langage de programmation.</p></div>`
  },
  {
    code: 'edu2_cybersecurite', name: "Accord de service de formation en cybersécurité", category: 'academique', price: 5000, priceMax: 15000,
    description: "Accord encadrant une formation en ligne en cybersécurité pour professionnels de l'informatique en Afrique francophone.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'modules',label:"Modules principaux",type:'textarea',required:true},
      {key:'duree_heures',label:"Durée totale (heures)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'frais',label:"Frais de formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN CYBERSÉCURITÉ</h1><p>L'organisme <strong>{{organisme}}</strong> délivre une formation spécialisée en cybersécurité.</p><h2>Article 1 — Contenu</h2><p>Modules couverts : <strong>{{modules}}</strong>.</p><h2>Article 2 — Durée</h2><p>La formation est d'une durée de <strong>{{duree_heures}}</strong> heures, débutant le <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Frais</h2><p>Les frais s'élèvent à <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Certification</h2><p>Une attestation est délivrée et peut préparer aux certifications CEH ou CompTIA Security+.</p></div>`
  },
  {
    code: 'edu2_ia_formation', name: "Accord de service de formation en intelligence artificielle", category: 'academique', price: 6000, priceMax: 18000,
    description: "Accord pour une formation en ligne en intelligence artificielle couvrant les fondamentaux et les applications pratiques.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'niveau',label:"Niveau de la formation",type:'text',required:true},
      {key:'duree_semaines',label:"Durée (semaines)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'cout',label:"Coût total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN INTELLIGENCE ARTIFICIELLE</h1><p>L'organisme <strong>{{organisme}}</strong> propose une formation en IA de niveau <strong>{{niveau}}</strong>.</p><h2>Article 1 — Contenu</h2><p>La formation aborde les algorithmes d'apprentissage automatique, le traitement du langage naturel et la vision par ordinateur.</p><h2>Article 2 — Durée</h2><p>Durée de <strong>{{duree_semaines}}</strong> semaines à partir du <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Coût</h2><p>Coût total : <strong>{{cout}}</strong> FCFA.</p><h2>Article 4 — Projets pratiques</h2><p>L'apprenant réalise un projet pratique évalué en fin de formation.</p></div>`
  },
  {
    code: 'edu2_cloud_computing', name: "Accord de service de formation en cloud computing", category: 'academique', price: 5000, priceMax: 14000,
    description: "Accord portant sur une formation en ligne en cloud computing (AWS, Azure, GCP) pour professionnels africains.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'plateforme_cloud',label:"Plateforme cloud ciblée",type:'text',required:true},
      {key:'duree_heures',label:"Durée (heures)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'frais',label:"Frais de formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN CLOUD COMPUTING</h1><p>L'organisme <strong>{{organisme}}</strong> dispense une formation sur la plateforme <strong>{{plateforme_cloud}}</strong>.</p><h2>Article 1 — Contenu</h2><p>La formation couvre l'infrastructure, le stockage, les réseaux et la sécurité dans le cloud.</p><h2>Article 2 — Durée</h2><p>Durée de <strong>{{duree_heures}}</strong> heures, débutant le <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Préparation à la certification</h2><p>La formation prépare aux certifications officielles du fournisseur cloud concerné.</p></div>`
  },
  {
    code: 'edu2_marketing_digital', name: "Accord de service de formation en marketing digital", category: 'academique', price: 3500, priceMax: 10000,
    description: "Accord encadrant une formation en ligne en marketing digital adaptée aux marchés africains francophones.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'modules',label:"Modules inclus",type:'textarea',required:true},
      {key:'duree_semaines',label:"Durée (semaines)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'frais',label:"Frais de formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN MARKETING DIGITAL</h1><p>L'organisme <strong>{{organisme}}</strong> propose une formation pratique en marketing digital.</p><h2>Article 1 — Contenu</h2><p>Modules inclus : <strong>{{modules}}</strong>.</p><h2>Article 2 — Durée</h2><p>Durée de <strong>{{duree_semaines}}</strong> semaines à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Cas pratiques</h2><p>Des études de cas propres au marché ivoirien et africain sont intégrées dans la formation.</p></div>`
  },
  {
    code: 'edu2_syscohada_ligne', name: "Accord de service de formation en comptabilité SYSCOHADA en ligne", category: 'academique', price: 4000, priceMax: 12000,
    description: "Accord pour une formation en ligne portant sur le Système Comptable OHADA (SYSCOHADA) à destination des professionnels de la comptabilité.", templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'niveau',label:"Niveau (initiation/approfondissement)",type:'text',required:true},
      {key:'duree_heures',label:"Durée (heures)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'frais',label:"Frais de formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN COMPTABILITÉ SYSCOHADA EN LIGNE</h1><p>L'organisme <strong>{{organisme}}</strong> dispense une formation de niveau <strong>{{niveau}}</strong> sur le SYSCOHADA révisé.</p><h2>Article 1 — Contenu</h2><p>La formation aborde les états financiers OHADA, le plan comptable, les écritures de clôture et les spécificités du droit comptable OHADA.</p><h2>Article 2 — Durée</h2><p>Durée de <strong>{{duree_heures}}</strong> heures à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Attestation</h2><p>Une attestation de participation est délivrée à l'issue de la formation.</p></div>`
  },
  {
    code: 'edu2_droit_ohada_ligne', name: "Accord de service de formation en droit OHADA en ligne", category: 'academique', price: 4000, priceMax: 12000,
    description: "Accord encadrant une formation en ligne portant sur le droit des affaires OHADA pour juristes et entrepreneurs.", templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'actes_uniformes',label:"Actes uniformes étudiés",type:'textarea',required:true},
      {key:'duree_semaines',label:"Durée (semaines)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'frais',label:"Frais de formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN DROIT OHADA EN LIGNE</h1><p>L'organisme <strong>{{organisme}}</strong> propose une formation en droit des affaires OHADA.</p><h2>Article 1 — Contenu</h2><p>Actes uniformes étudiés : <strong>{{actes_uniformes}}</strong>.</p><h2>Article 2 — Durée</h2><p>Durée de <strong>{{duree_semaines}}</strong> semaines à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Public cible</h2><p>La formation s'adresse aux juristes, comptables, dirigeants d'entreprises et entrepreneurs de l'espace OHADA.</p></div>`
  },
  {
    code: 'edu2_langues_elearning', name: "Accord de service de formation en langues étrangères (e-learning)", category: 'academique', price: 2500, priceMax: 8000,
    description: "Accord portant sur une formation en ligne en langues étrangères (anglais, arabe, portugais, etc.) pour apprenants africains.", templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'langue_cible',label:"Langue cible",type:'text',required:true},
      {key:'niveau_cecrl',label:"Niveau CECRL visé (A1 à C2)",type:'text',required:true},
      {key:'duree_mois',label:"Durée (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'frais',label:"Frais de formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN LANGUES ÉTRANGÈRES (E-LEARNING)</h1><p>L'organisme <strong>{{organisme}}</strong> propose une formation en <strong>{{langue_cible}}</strong>.</p><h2>Article 1 — Niveau visé</h2><p>La formation vise le niveau <strong>{{niveau_cecrl}}</strong> selon le Cadre Européen Commun de Référence pour les Langues.</p><h2>Article 2 — Durée</h2><p>Durée de <strong>{{duree_mois}}</strong> mois à compter du <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Méthode</h2><p>La formation combine activités audio, vidéo, exercices interactifs et classes virtuelles hebdomadaires.</p></div>`
  },
  {
    code: 'edu2_bibliotheque_numerique', name: "Accord de service de bibliothèque numérique académique", category: 'academique', price: 5000, priceMax: 15000,
    description: "Accord encadrant l'accès à une bibliothèque numérique académique pour établissements d'enseignement supérieur.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur de la bibliothèque numérique",type:'text',required:true},
      {key:'etablissement',label:"Établissement bénéficiaire",type:'text',required:true},
      {key:'nombre_licences',label:"Nombre de licences d'accès",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'abonnement_annuel',label:"Abonnement annuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BIBLIOTHÈQUE NUMÉRIQUE ACADÉMIQUE</h1><p>Entre le fournisseur <strong>{{fournisseur}}</strong> et l'établissement <strong>{{etablissement}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le fournisseur accorde à l'établissement l'accès à sa bibliothèque numérique pour <strong>{{nombre_licences}}</strong> licences.</p><h2>Article 2 — Durée</h2><p>L'accord prend effet le <strong>{{date_debut}}</strong> pour une durée d'un an renouvelable.</p><h2>Article 3 — Abonnement</h2><p>L'abonnement annuel s'élève à <strong>{{abonnement_annuel}}</strong> FCFA.</p><h2>Article 4 — Accès</h2><p>L'accès est disponible 24h/24, 7j/7, depuis tout support connecté.</p></div>`
  },
  {
    code: 'edu2_partenariat_universite_edtech', name: "Accord de partenariat université-plateforme EdTech", category: 'academique', price: 6000, priceMax: 18000,
    description: "Accord de partenariat stratégique entre une université africaine et une plateforme EdTech pour la co-création de contenus et la délivrance de certifications.", templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'universite',label:"Nom de l'université",type:'text',required:true},
      {key:'plateforme',label:"Nom de la plateforme EdTech",type:'text',required:true},
      {key:'domaines',label:"Domaines de partenariat",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'duree_ans',label:"Durée du partenariat (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT UNIVERSITÉ-PLATEFORME EDTECH</h1><p>Entre l'université <strong>{{universite}}</strong> et la plateforme <strong>{{plateforme}}</strong>.</p><h2>Article 1 — Objet</h2><p>Les parties s'engagent dans un partenariat pour la co-création de contenus pédagogiques et la délivrance de certifications conjointes dans les domaines suivants : <strong>{{domaines}}</strong>.</p><h2>Article 2 — Durée</h2><p>Le partenariat est conclu pour <strong>{{duree_ans}}</strong> ans à compter du <strong>{{date_signature}}</strong>.</p><h2>Article 3 — Gouvernance</h2><p>Un comité de pilotage paritaire se réunit trimestriellement.</p><h2>Article 4 — Partage des revenus</h2><p>Les modalités de partage des revenus générés sont définies en annexe financière.</p></div>`
  },
  {
    code: 'edu2_rapport_performance_edtech', name: "Rapport de performance plateforme EdTech", category: 'academique', price: 3000, priceMax: 8000,
    description: "Rapport standardisé d'évaluation des performances d'une plateforme EdTech incluant les indicateurs clés d'apprentissage.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'plateforme',label:"Nom de la plateforme",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'nombre_apprenants_actifs',label:"Nombre d'apprenants actifs",type:'text',required:true},
      {key:'taux_completion',label:"Taux de complétion (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE PLATEFORME EDTECH</h1><h2>1. Plateforme</h2><p><strong>{{plateforme}}</strong> — Période : <strong>{{periode}}</strong></p><h2>2. Indicateurs clés</h2><p>Apprenants actifs : <strong>{{nombre_apprenants_actifs}}</strong></p><p>Taux de complétion : <strong>{{taux_completion}}</strong> %</p><h2>3. Analyse</h2><p>Ce rapport présente une synthèse des résultats obtenus sur la période, les points forts identifiés et les axes d'amélioration prioritaires.</p><h2>4. Recommandations</h2><p>Les recommandations pour la prochaine période sont annexées au présent rapport.</p><p>Date du rapport : <strong>{{date_rapport}}</strong></p></div>`
  },
  {
    code: 'edu2_plan_developpement_edtech', name: "Plan de développement EdTech", category: 'academique', price: 4000, priceMax: 12000,
    description: "Plan stratégique de développement d'une offre EdTech pour le marché africain francophone sur trois à cinq ans.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise EdTech",type:'text',required:true},
      {key:'marches_cibles',label:"Marchés cibles",type:'textarea',required:true},
      {key:'horizon_ans',label:"Horizon du plan (ans)",type:'text',required:true},
      {key:'date_elaboration',label:"Date d'élaboration",type:'date',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT EDTECH</h1><p>Entreprise : <strong>{{entreprise}}</strong> — Élaboré le <strong>{{date_elaboration}}</strong></p><h2>1. Vision</h2><p>Devenir un acteur de référence de l'éducation numérique en Afrique francophone.</p><h2>2. Marchés cibles</h2><p><strong>{{marches_cibles}}</strong></p><h2>3. Horizon et budget</h2><p>Plan sur <strong>{{horizon_ans}}</strong> ans avec un budget prévisionnel total de <strong>{{budget_previsionnel}}</strong> FCFA.</p><h2>4. Axes stratégiques</h2><p>Développement produit, partenariats institutionnels, expansion géographique et levée de fonds.</p></div>`
  },
  {
    code: 'edu2_mesure_impact', name: "Accord de service de mesure de l'impact de la formation", category: 'academique', price: 3500, priceMax: 10000,
    description: "Accord pour la réalisation d'une évaluation de l'impact d'un programme de formation selon le modèle Kirkpatrick.", templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de l'évaluation",type:'text',required:true},
      {key:'programme_formation',label:"Programme de formation évalué",type:'text',required:true},
      {key:'methode',label:"Méthode d'évaluation",type:'text',required:true},
      {key:'date_debut_eval',label:"Date de début de l'évaluation",type:'date',required:true},
      {key:'honoraires',label:"Honoraires du prestataire (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MESURE DE L'IMPACT DE LA FORMATION</h1><p>Entre le prestataire <strong>{{prestataire}}</strong> et le commanditaire.</p><h2>Article 1 — Objet</h2><p>Le prestataire réalise l'évaluation d'impact du programme <strong>{{programme_formation}}</strong> selon la méthode <strong>{{methode}}</strong>.</p><h2>Article 2 — Calendrier</h2><p>L'évaluation débute le <strong>{{date_debut_eval}}</strong>.</p><h2>Article 3 — Honoraires</h2><p>Les honoraires sont fixés à <strong>{{honoraires}}</strong> FCFA.</p><h2>Article 4 — Livrables</h2><p>Le prestataire remet un rapport d'impact complet incluant recommandations et indicateurs de retour sur investissement.</p></div>`
  },
  {
    code: 'edu2_charte_numerique_inclusive', name: "Charte de l'éducation numérique inclusive en Afrique", category: 'academique', price: 2000, priceMax: 6000,
    description: "Charte d'engagement pour une éducation numérique accessible, équitable et inclusive dans les pays africains francophones.", templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'representant',label:"Nom du représentant",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'engagements',label:"Engagements spécifiques",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ÉDUCATION NUMÉRIQUE INCLUSIVE EN AFRIQUE</h1><p>L'organisation <strong>{{organisation}}</strong>, représentée par <strong>{{representant}}</strong>, souscrit à la présente charte le <strong>{{date_signature}}</strong>.</p><h2>Principes fondateurs</h2><p>1. Accessibilité universelle aux outils numériques éducatifs.</p><p>2. Réduction de la fracture numérique entre zones urbaines et rurales.</p><p>3. Respect de la diversité culturelle et linguistique africaine.</p><h2>Engagements spécifiques</h2><p><strong>{{engagements}}</strong></p><h2>Suivi</h2><p>L'organisation signataire s'engage à rendre compte annuellement de la mise en œuvre de ses engagements.</p></div>`
  },

  // ─── Certification / VAE (25) ───
  {
    code: 'cert2_rncp_afrique', name: "Accord de service de certification professionnelle (RNCP Afrique)", category: 'academique', price: 5000, priceMax: 15000,
    description: "Accord encadrant la délivrance d'une certification professionnelle reconnue dans l'espace OHADA, équivalent RNCP Afrique.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'organisme_certificateur',label:"Organisme certificateur",type:'text',required:true},
      {key:'titre_certification',label:"Titre de la certification",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true},
      {key:'frais_dossier',label:"Frais de dossier (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION PROFESSIONNELLE</h1><p>L'organisme <strong>{{organisme_certificateur}}</strong> certifie la candidature de <strong>{{candidat}}</strong> au titre <strong>{{titre_certification}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le présent accord définit les conditions d'accès, d'évaluation et de délivrance de la certification professionnelle.</p><h2>Article 2 — Examen</h2><p>L'examen se tient le <strong>{{date_examen}}</strong>.</p><h2>Article 3 — Frais</h2><p>Les frais de dossier s'élèvent à <strong>{{frais_dossier}}</strong> FCFA.</p><h2>Article 4 — Validité</h2><p>La certification est valable cinq ans et renouvelable selon les modalités de l'organisme.</p></div>`
  },
  {
    code: 'cert2_vae', name: "Accord de service de validation des acquis de l'expérience (VAE)", category: 'academique', price: 5000, priceMax: 14000,
    description: "Accord encadrant la procédure de Validation des Acquis de l'Expérience pour l'obtention d'un diplôme ou titre professionnel.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'titre_vise',label:"Titre ou diplôme visé",type:'text',required:true},
      {key:'organisme',label:"Organisme accompagnateur",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la procédure",type:'date',required:true},
      {key:'frais_accompagnement',label:"Frais d'accompagnement (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VALIDATION DES ACQUIS DE L'EXPÉRIENCE (VAE)</h1><p>Entre l'organisme <strong>{{organisme}}</strong> et le candidat <strong>{{candidat}}</strong>.</p><h2>Article 1 — Objet</h2><p>L'organisme accompagne le candidat dans la constitution de son dossier VAE en vue de l'obtention du titre <strong>{{titre_vise}}</strong>.</p><h2>Article 2 — Calendrier</h2><p>La procédure débute le <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Frais</h2><p>Les frais d'accompagnement sont de <strong>{{frais_accompagnement}}</strong> FCFA.</p><h2>Article 4 — Confidentialité</h2><p>Les informations fournies par le candidat sont traitées de manière strictement confidentielle.</p></div>`
  },
  {
    code: 'cert2_jury_vae', name: "Accord de service de jury de VAE", category: 'academique', price: 4000, priceMax: 10000,
    description: "Accord organisant la constitution et le fonctionnement du jury de validation dans le cadre d'une procédure VAE.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'institution',label:"Institution organisatrice",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'president_jury',label:"Nom du président du jury",type:'text',required:true},
      {key:'date_jury',label:"Date du jury",type:'date',required:true},
      {key:'lieu',label:"Lieu du jury",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE JURY DE VAE</h1><p>L'institution <strong>{{institution}}</strong> organise le jury de VAE pour le candidat <strong>{{candidat}}</strong>.</p><h2>Article 1 — Composition du jury</h2><p>Le jury est présidé par <strong>{{president_jury}}</strong> et comprend des professionnels du secteur concerné.</p><h2>Article 2 — Date et lieu</h2><p>Le jury se tient le <strong>{{date_jury}}</strong> à <strong>{{lieu}}</strong>.</p><h2>Article 3 — Décision</h2><p>Le jury peut délivrer une validation totale, partielle ou refuser la validation. Sa décision est motivée et notifiée par écrit.</p><h2>Article 4 — Recours</h2><p>Le candidat dispose d'un délai de 30 jours pour exercer un recours gracieux.</p></div>`
  },
  {
    code: 'cert2_bilan_competences', name: "Accord de service de bilan de compétences", category: 'academique', price: 4500, priceMax: 13000,
    description: "Accord encadrant la réalisation d'un bilan de compétences professionnel (BILAN PRO) pour salariés et demandeurs d'emploi.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire du bilan",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'duree_heures',label:"Durée totale (heures)",type:'text',required:true},
      {key:'cout_total',label:"Coût total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BILAN DE COMPÉTENCES</h1><p>Entre le prestataire <strong>{{prestataire}}</strong> et le bénéficiaire <strong>{{beneficiaire}}</strong>.</p><h2>Article 1 — Objet</h2><p>Le prestataire réalise un bilan de compétences complet permettant au bénéficiaire d'analyser ses compétences, aptitudes et motivations professionnelles.</p><h2>Article 2 — Durée</h2><p>Le bilan est d'une durée de <strong>{{duree_heures}}</strong> heures, débutant le <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Coût</h2><p>Coût total : <strong>{{cout_total}}</strong> FCFA.</p><h2>Article 4 — Livrables</h2><p>Un document de synthèse est remis exclusivement au bénéficiaire en fin de bilan.</p></div>`
  },
  {
    code: 'cert2_iso_auditeur', name: "Accord de service de certification ISO (auditeur interne certifié)", category: 'academique', price: 6000, priceMax: 18000,
    description: "Accord pour une formation-certification d'auditeur interne selon les normes ISO, adaptée au contexte africain.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de certification",type:'text',required:true},
      {key:'norme_iso',label:"Norme ISO visée",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true},
      {key:'frais',label:"Frais de certification (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION ISO — AUDITEUR INTERNE</h1><p>L'organisme <strong>{{organisme}}</strong> certifie la candidature de <strong>{{candidat}}</strong> pour la norme <strong>{{norme_iso}}</strong>.</p><h2>Article 1 — Programme</h2><p>La formation-certification comprend des modules théoriques et des exercices pratiques d'audit.</p><h2>Article 2 — Calendrier</h2><p>La formation se tient le <strong>{{date_formation}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais de certification : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Certificat</h2><p>Un certificat d'auditeur interne est délivré aux candidats ayant réussi l'examen final.</p></div>`
  },
  {
    code: 'cert2_pmp', name: "Accord de service de certification PMP (chef de projet)", category: 'academique', price: 7000, priceMax: 20000,
    description: "Accord encadrant la préparation et la certification PMP (Project Management Professional) du PMI pour professionnels africains.", templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'centre_prep',label:"Centre de préparation",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'duree_prep_semaines',label:"Durée de préparation (semaines)",type:'text',required:true},
      {key:'date_examen',label:"Date d'examen prévue",type:'date',required:true},
      {key:'frais',label:"Frais totaux (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION PMP</h1><p>Le centre <strong>{{centre_prep}}</strong> prépare le candidat <strong>{{candidat}}</strong> à la certification PMP du PMI.</p><h2>Article 1 — Programme</h2><p>La préparation couvre les domaines du PMBOK : initiation, planification, exécution, maîtrise et clôture.</p><h2>Article 2 — Durée</h2><p>Préparation de <strong>{{duree_prep_semaines}}</strong> semaines avec examen prévu le <strong>{{date_examen}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais totaux : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Garantie</h2><p>En cas d'échec au premier examen, une session de rattrapage est offerte sans frais supplémentaires.</p></div>`
  },
  {
    code: 'cert2_prince2', name: "Accord de service de certification PRINCE2", category: 'academique', price: 6000, priceMax: 17000,
    description: "Accord pour la préparation et la certification PRINCE2 en gestion de projet, adapté aux professionnels de l'espace OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'centre_prep',label:"Centre de préparation",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'niveau',label:"Niveau PRINCE2 (Foundation/Practitioner)",type:'text',required:true},
      {key:'date_examen',label:"Date d'examen",type:'date',required:true},
      {key:'frais',label:"Frais totaux (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION PRINCE2</h1><p>Le centre <strong>{{centre_prep}}</strong> prépare <strong>{{candidat}}</strong> à la certification PRINCE2 niveau <strong>{{niveau}}</strong>.</p><h2>Article 1 — Contenu</h2><p>La formation couvre les 7 principes, 7 thèmes et 7 processus PRINCE2.</p><h2>Article 2 — Examen</h2><p>L'examen se tient le <strong>{{date_examen}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais totaux : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Reconnaissance</h2><p>La certification PRINCE2 est reconnue internationalement et valorisée sur le marché africain.</p></div>`
  },
  {
    code: 'cert2_agile_scrum', name: "Accord de service de certification Agile (Scrum Master)", category: 'academique', price: 5000, priceMax: 14000,
    description: "Accord encadrant la préparation et la certification Scrum Master (CSM ou PSM) pour professionnels de la gestion de projet agile.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'centre_prep',label:"Centre de préparation",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'type_certification',label:"Type de certification (CSM/PSM)",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true},
      {key:'frais',label:"Frais (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION AGILE — SCRUM MASTER</h1><p>Le centre <strong>{{centre_prep}}</strong> prépare <strong>{{candidat}}</strong> à la certification <strong>{{type_certification}}</strong>.</p><h2>Article 1 — Contenu</h2><p>La formation couvre le cadre Scrum, les rôles, événements, artefacts et les valeurs agiles.</p><h2>Article 2 — Formation</h2><p>La formation se tient le <strong>{{date_formation}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Examen</h2><p>L'examen de certification est passé en ligne après la formation.</p></div>`
  },
  {
    code: 'cert2_comptable', name: "Accord de service de certification comptable (CAC, Expert-comptable)", category: 'academique', price: 7000, priceMax: 20000,
    description: "Accord encadrant la préparation aux examens de Commissaire aux Comptes ou d'Expert-comptable dans l'espace OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'centre_prep',label:"Centre de préparation",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'titre_vise',label:"Titre visé (CAC/Expert-comptable)",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true},
      {key:'frais',label:"Frais de préparation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION COMPTABLE</h1><p>Le centre <strong>{{centre_prep}}</strong> prépare <strong>{{candidat}}</strong> au titre de <strong>{{titre_vise}}</strong>.</p><h2>Article 1 — Programme</h2><p>La préparation couvre le SYSCOHADA révisé, le droit OHADA, la fiscalité ivoirienne et l'audit légal.</p><h2>Article 2 — Examen</h2><p>L'examen est prévu le <strong>{{date_examen}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais de préparation : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Ordre professionnel</h2><p>L'inscription à l'Ordre des Experts-Comptables est une démarche distincte à la charge du candidat.</p></div>`
  },
  {
    code: 'cert2_ohsas_iso45001', name: "Accord de service de certification OHSAS/ISO 45001", category: 'academique', price: 6000, priceMax: 16000,
    description: "Accord pour la préparation à la certification ISO 45001 en santé et sécurité au travail, applicable aux entreprises africaines.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de certification",type:'text',required:true},
      {key:'entreprise',label:"Entreprise candidate",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de la certification",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit de certification",type:'date',required:true},
      {key:'frais',label:"Frais d'audit (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION ISO 45001</h1><p>L'organisme <strong>{{organisme}}</strong> procède à l'audit de certification de l'entreprise <strong>{{entreprise}}</strong>.</p><h2>Article 1 — Périmètre</h2><p><strong>{{perimetre}}</strong></p><h2>Article 2 — Audit</h2><p>L'audit de certification se tient le <strong>{{date_audit}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais d'audit : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Certificat</h2><p>En cas de résultat favorable, le certificat ISO 45001 est délivré pour une durée de trois ans.</p></div>`
  },
  {
    code: 'cert2_iso9001_auditeur', name: "Accord de service de certification qualité ISO 9001 (auditeur)", category: 'academique', price: 6000, priceMax: 17000,
    description: "Accord encadrant la formation et la certification d'auditeur qualité ISO 9001 pour professionnels africains.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de certification",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'type_audit',label:"Type (auditeur interne/chef auditeur)",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true},
      {key:'frais',label:"Frais de certification (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION QUALITÉ ISO 9001 — AUDITEUR</h1><p>L'organisme <strong>{{organisme}}</strong> certifie <strong>{{candidat}}</strong> en tant que <strong>{{type_audit}}</strong> ISO 9001.</p><h2>Article 1 — Formation</h2><p>La formation se tient le <strong>{{date_formation}}</strong> et comprend des cas pratiques d'audit qualité.</p><h2>Article 2 — Frais</h2><p>Frais : <strong>{{frais}}</strong> FCFA.</p><h2>Article 3 — Certificat</h2><p>Le certificat est délivré par un organisme accrédité reconnu dans l'espace OHADA.</p><h2>Article 4 — Renouvellement</h2><p>La certification est renouvelable tous les trois ans par formation continue.</p></div>`
  },
  {
    code: 'cert2_haccp', name: "Accord de service de certification HACCP alimentaire", category: 'academique', price: 5000, priceMax: 14000,
    description: "Accord pour la formation et la certification HACCP en sécurité alimentaire pour professionnels de l'agro-alimentaire africain.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de certification",type:'text',required:true},
      {key:'entreprise',label:"Entreprise bénéficiaire",type:'text',required:true},
      {key:'produits_concernes',label:"Produits alimentaires concernés",type:'textarea',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true},
      {key:'frais',label:"Frais (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION HACCP ALIMENTAIRE</h1><p>L'organisme <strong>{{organisme}}</strong> forme et certifie l'équipe de l'entreprise <strong>{{entreprise}}</strong>.</p><h2>Article 1 — Produits concernés</h2><p><strong>{{produits_concernes}}</strong></p><h2>Article 2 — Formation</h2><p>La formation HACCP se tient le <strong>{{date_formation}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Plan HACCP</h2><p>L'entreprise s'engage à mettre en œuvre un plan HACCP documenté à l'issue de la formation.</p></div>`
  },
  {
    code: 'cert2_iso14001', name: "Accord de service de certification ISO 14001 (environnement)", category: 'academique', price: 6000, priceMax: 17000,
    description: "Accord pour l'audit et la certification du système de management environnemental ISO 14001 d'une organisation africaine.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'organisme',label:"Organisme certificateur",type:'text',required:true},
      {key:'entreprise',label:"Entreprise candidate",type:'text',required:true},
      {key:'activites',label:"Activités dans le périmètre",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
      {key:'frais',label:"Frais d'audit (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION ISO 14001 — ENVIRONNEMENT</h1><p>L'organisme <strong>{{organisme}}</strong> audite l'entreprise <strong>{{entreprise}}</strong> pour la certification ISO 14001.</p><h2>Article 1 — Activités couvertes</h2><p><strong>{{activites}}</strong></p><h2>Article 2 — Audit</h2><p>L'audit se tient le <strong>{{date_audit}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais d'audit : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Impacts environnementaux</h2><p>L'entreprise documente ses impacts environnementaux et ses objectifs de réduction conformément à la norme.</p></div>`
  },
  {
    code: 'cert2_iso27001', name: "Accord de service de certification ISO 27001 (cybersécurité)", category: 'academique', price: 7000, priceMax: 20000,
    description: "Accord pour l'audit et la certification du système de management de la sécurité de l'information ISO 27001.", templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'organisme',label:"Organisme certificateur",type:'text',required:true},
      {key:'entreprise',label:"Entreprise candidate",type:'text',required:true},
      {key:'perimetre_si',label:"Périmètre du système d'information",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
      {key:'frais',label:"Frais d'audit (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION ISO 27001 — CYBERSÉCURITÉ</h1><p>L'organisme <strong>{{organisme}}</strong> audite le système d'information de <strong>{{entreprise}}</strong>.</p><h2>Article 1 — Périmètre SI</h2><p><strong>{{perimetre_si}}</strong></p><h2>Article 2 — Audit</h2><p>L'audit de certification se tient le <strong>{{date_audit}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Déclaration d'applicabilité</h2><p>L'entreprise produit une Déclaration d'Applicabilité (DdA) préalable à l'audit.</p></div>`
  },
  {
    code: 'cert2_cfa', name: "Accord de service de certification CFA (analyste financier)", category: 'academique', price: 8000, priceMax: 24000,
    description: "Accord encadrant la préparation aux examens CFA (Chartered Financial Analyst) pour professionnels de la finance en Afrique.", templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'centre_prep',label:"Centre de préparation",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'niveau_cfa',label:"Niveau CFA (I/II/III)",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true},
      {key:'frais',label:"Frais de préparation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION CFA</h1><p>Le centre <strong>{{centre_prep}}</strong> prépare <strong>{{candidat}}</strong> au niveau <strong>{{niveau_cfa}}</strong> de la certification CFA.</p><h2>Article 1 — Programme</h2><p>La préparation couvre les matières officielles du CFA Institute : éthique, gestion de portefeuille, analyse financière, économie et mathématiques financières.</p><h2>Article 2 — Examen</h2><p>L'examen est prévu le <strong>{{date_examen}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais de préparation : <strong>{{frais}}</strong> FCFA (hors frais d'inscription au CFA Institute).</p><h2>Article 4 — Taux de réussite</h2><p>Le centre s'engage à communiquer son taux de réussite historique au candidat avant la signature.</p></div>`
  },
  {
    code: 'cert2_acca', name: "Accord de service de certification ACCA (comptabilité internationale)", category: 'academique', price: 7000, priceMax: 20000,
    description: "Accord pour la préparation aux examens ACCA (Association of Chartered Certified Accountants) en Afrique francophone.", templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'centre_prep',label:"Centre de préparation",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'modules',label:"Modules ACCA préparés",type:'textarea',required:true},
      {key:'date_examen',label:"Date de la session d'examen",type:'date',required:true},
      {key:'frais',label:"Frais de préparation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION ACCA</h1><p>Le centre <strong>{{centre_prep}}</strong> prépare <strong>{{candidat}}</strong> aux examens ACCA.</p><h2>Article 1 — Modules</h2><p>Modules préparés : <strong>{{modules}}</strong>.</p><h2>Article 2 — Examen</h2><p>Session d'examen prévue le <strong>{{date_examen}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais de préparation : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Articulation avec le SYSCOHADA</h2><p>La formation intègre des passerelles entre les normes IFRS et le SYSCOHADA révisé.</p></div>`
  },
  {
    code: 'cert2_six_sigma', name: "Accord de service de certification Six Sigma (ceinture verte/noire)", category: 'academique', price: 6000, priceMax: 18000,
    description: "Accord pour la formation et la certification Six Sigma (Green Belt ou Black Belt) pour professionnels de l'industrie africaine.", templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de certification",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'niveau_ceinture',label:"Niveau (Green Belt/Black Belt)",type:'text',required:true},
      {key:'date_formation',label:"Date de début de la formation",type:'date',required:true},
      {key:'frais',label:"Frais de certification (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION SIX SIGMA</h1><p>L'organisme <strong>{{organisme}}</strong> certifie <strong>{{candidat}}</strong> au niveau <strong>{{niveau_ceinture}}</strong>.</p><h2>Article 1 — Contenu</h2><p>La formation couvre la démarche DMAIC, les outils statistiques et la gestion de projets d'amélioration continue.</p><h2>Article 2 — Calendrier</h2><p>La formation débute le <strong>{{date_formation}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Projet de certification</h2><p>Le candidat réalise un projet d'amélioration en entreprise comme condition de certification.</p></div>`
  },
  {
    code: 'cert2_lean', name: "Accord de service de certification Lean Manufacturing", category: 'academique', price: 5500, priceMax: 16000,
    description: "Accord encadrant la formation et la certification Lean Manufacturing pour professionnels de la production et de l'industrie.", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de certification",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'secteur',label:"Secteur industriel",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true},
      {key:'frais',label:"Frais de certification (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION LEAN MANUFACTURING</h1><p>L'organisme <strong>{{organisme}}</strong> forme et certifie <strong>{{candidat}}</strong> en Lean Manufacturing pour le secteur <strong>{{secteur}}</strong>.</p><h2>Article 1 — Contenu</h2><p>La formation aborde les principes du Lean (élimination des gaspillages), les outils 5S, Kanban, VSM et Kaizen.</p><h2>Article 2 — Formation</h2><p>La formation se tient le <strong>{{date_formation}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Application pratique</h2><p>Un chantier d'application terrain est obligatoire pour l'obtention du certificat.</p></div>`
  },
  {
    code: 'cert2_rh_shrm_cipd', name: "Accord de service de certification en ressources humaines (SHRM, CIPD)", category: 'academique', price: 7000, priceMax: 20000,
    description: "Accord pour la préparation et la certification en gestion des ressources humaines (SHRM-CP, CIPD Level 5) pour professionnels africains.", templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'centre_prep',label:"Centre de préparation",type:'text',required:true},
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'certification_visee',label:"Certification visée (SHRM-CP/CIPD)",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true},
      {key:'frais',label:"Frais (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION EN RESSOURCES HUMAINES</h1><p>Le centre <strong>{{centre_prep}}</strong> prépare <strong>{{candidat}}</strong> à la certification <strong>{{certification_visee}}</strong>.</p><h2>Article 1 — Programme</h2><p>La formation couvre la stratégie RH, le droit social OHADA, la gestion des talents, la paie et les relations sociales.</p><h2>Article 2 — Examen</h2><p>L'examen est prévu le <strong>{{date_examen}}</strong>.</p><h2>Article 3 — Frais</h2><p>Frais : <strong>{{frais}}</strong> FCFA.</p><h2>Article 4 — Valeur sur le marché africain</h2><p>La certification est reconnue par les grandes entreprises multinationales opérant en Afrique.</p></div>`
  },
  {
    code: 'cert2_reconnaissance_diplome', name: "Accord de service de reconnaissance de diplôme étranger", category: 'academique', price: 4000, priceMax: 12000,
    description: "Accord pour l'accompagnement dans la procédure de reconnaissance d'un diplôme étranger par les autorités ivoiriennes.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet ou organisme accompagnateur",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'diplome',label:"Intitulé du diplôme étranger",type:'text',required:true},
      {key:'pays_origine',label:"Pays d'origine du diplôme",type:'text',required:true},
      {key:'honoraires',label:"Honoraires d'accompagnement (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECONNAISSANCE DE DIPLÔME ÉTRANGER</h1><p>Le cabinet <strong>{{cabinet}}</strong> accompagne <strong>{{beneficiaire}}</strong> dans la procédure de reconnaissance de son diplôme <strong>{{diplome}}</strong> obtenu en <strong>{{pays_origine}}</strong>.</p><h2>Article 1 — Démarches</h2><p>Le cabinet assiste le bénéficiaire dans la constitution du dossier, le dépôt auprès du Ministère de l'Enseignement Supérieur et le suivi de la procédure.</p><h2>Article 2 — Honoraires</h2><p>Honoraires d'accompagnement : <strong>{{honoraires}}</strong> FCFA.</p><h2>Article 3 — Délais</h2><p>La procédure administrative peut prendre de 3 à 12 mois selon les institutions.</p><h2>Article 4 — Limite de responsabilité</h2><p>Le cabinet ne peut garantir l'issue de la décision administrative des autorités compétentes.</p></div>`
  },
  {
    code: 'cert2_traduction_certifiee', name: "Accord de service de traduction certifiée de diplôme", category: 'academique', price: 2500, priceMax: 7000,
    description: "Accord pour la traduction certifiée de diplômes et relevés de notes étrangers par un traducteur assermenté.", templateType: 'pdf', classe: 'C', active: true, popularity: 78,
    fieldsJson: F([
      {key:'traducteur',label:"Nom du traducteur assermenté",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'langue_source',label:"Langue source",type:'text',required:true},
      {key:'langue_cible',label:"Langue cible",type:'text',required:true},
      {key:'nombre_pages',label:"Nombre de pages à traduire",type:'text',required:true},
      {key:'delai_livraison',label:"Délai de livraison (jours)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRADUCTION CERTIFIÉE DE DIPLÔME</h1><p>Le traducteur assermenté <strong>{{traducteur}}</strong> s'engage envers <strong>{{client}}</strong>.</p><h2>Article 1 — Objet</h2><p>Traduction certifiée de <strong>{{nombre_pages}}</strong> page(s) du <strong>{{langue_source}}</strong> vers le <strong>{{langue_cible}}</strong>.</p><h2>Article 2 — Délai</h2><p>La traduction est remise dans un délai de <strong>{{delai_livraison}}</strong> jours ouvrables.</p><h2>Article 3 — Authenticité</h2><p>La traduction est certifiée conforme par le traducteur assermenté et porte son cachet officiel.</p><h2>Article 4 — Tarification</h2><p>Le tarif est défini en annexe selon le barème du tribunal compétent.</p></div>`
  },
  {
    code: 'cert2_legalisation_apostille', name: "Accord de service de légalisation et apostille de diplôme", category: 'academique', price: 3000, priceMax: 9000,
    description: "Accord pour l'accompagnement dans les démarches de légalisation et d'apostille de diplômes et documents académiques.", templateType: 'pdf', classe: 'C', active: true, popularity: 76,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet accompagnateur",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'document_concerne',label:"Document concerné",type:'text',required:true},
      {key:'pays_destination',label:"Pays de destination",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LÉGALISATION ET APOSTILLE DE DIPLÔME</h1><p>Le cabinet <strong>{{cabinet}}</strong> accompagne <strong>{{client}}</strong> dans la légalisation et l'apostille de son document : <strong>{{document_concerne}}</strong>.</p><h2>Article 1 — Destination</h2><p>Le document est destiné à être utilisé en <strong>{{pays_destination}}</strong>.</p><h2>Article 2 — Démarches</h2><p>Le cabinet prend en charge les démarches auprès du Ministère des Affaires Étrangères et des autorités compétentes.</p><h2>Article 3 — Honoraires</h2><p>Honoraires : <strong>{{honoraires}}</strong> FCFA (hors frais administratifs officiels).</p><h2>Article 4 — Délais</h2><p>Le délai de traitement est estimé à 5-15 jours ouvrables.</p></div>`
  },
  {
    code: 'cert2_rapport_suivi_certification', name: "Rapport de suivi de la certification", category: 'academique', price: 3000, priceMax: 8000,
    description: "Rapport standardisé de suivi de l'avancement d'un candidat dans son parcours de certification professionnelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'certification',label:"Certification poursuivie",type:'text',required:true},
      {key:'etape_actuelle',label:"Étape actuelle du parcours",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'commentaires',label:"Commentaires du référent",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SUIVI DE LA CERTIFICATION</h1><p>Candidat : <strong>{{candidat}}</strong> — Certification : <strong>{{certification}}</strong></p><p>Date du rapport : <strong>{{date_rapport}}</strong></p><h2>1. Étape actuelle</h2><p><strong>{{etape_actuelle}}</strong></p><h2>2. Commentaires du référent</h2><p><strong>{{commentaires}}</strong></p><h2>3. Actions à mener</h2><p>Les prochaines étapes et actions correctives sont définies en concertation avec le candidat et l'organisme de certification.</p></div>`
  },
  {
    code: 'cert2_plan_competences_certifiees', name: "Plan de développement des compétences certifiées", category: 'academique', price: 4000, priceMax: 12000,
    description: "Plan structuré de développement des compétences visant l'obtention de certifications professionnelles pour un collaborateur ou groupe.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise ou organisation",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire ou groupe",type:'text',required:true},
      {key:'certifications_visees',label:"Certifications visées",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du plan",type:'date',required:true},
      {key:'budget',label:"Budget alloué (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DES COMPÉTENCES CERTIFIÉES</h1><p>Entreprise : <strong>{{entreprise}}</strong> — Bénéficiaire(s) : <strong>{{beneficiaire}}</strong></p><h2>Article 1 — Certifications visées</h2><p><strong>{{certifications_visees}}</strong></p><h2>Article 2 — Calendrier</h2><p>Le plan démarre le <strong>{{date_debut}}</strong>.</p><h2>Article 3 — Budget</h2><p>Budget alloué : <strong>{{budget}}</strong> FCFA.</p><h2>Article 4 — Suivi</h2><p>Un point de suivi trimestriel est organisé entre le collaborateur et son responsable RH.</p></div>`
  },
  {
    code: 'cert2_charte_qualite_certification', name: "Charte de la qualité de la certification professionnelle", category: 'academique', price: 2500, priceMax: 7000,
    description: "Charte définissant les standards de qualité applicables à la délivrance de certifications professionnelles en Afrique francophone.", templateType: 'pdf', classe: 'C', active: true, popularity: 57,
    fieldsJson: F([
      {key:'organisme',label:"Organisme signataire",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'domaines_certification',label:"Domaines de certification couverts",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA QUALITÉ DE LA CERTIFICATION PROFESSIONNELLE</h1><p>L'organisme <strong>{{organisme}}</strong>, représenté par <strong>{{representant}}</strong>, adopte la présente charte le <strong>{{date_signature}}</strong>.</p><h2>Domaines couverts</h2><p><strong>{{domaines_certification}}</strong></p><h2>Principes de qualité</h2><p>1. Rigueur et transparence des évaluations.</p><p>2. Indépendance des jurys de certification.</p><p>3. Amélioration continue des référentiels.</p><p>4. Accessibilité aux candidats de tous horizons géographiques et socio-économiques.</p><h2>Engagement</h2><p>L'organisme s'engage à respecter ces principes et à se soumettre à des audits de qualité annuels.</p></div>`
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
  console.log(`Batch 77a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
