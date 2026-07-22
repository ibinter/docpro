import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ===================== SANTE PUBLIQUE / EPIDEMIOLOGIE (25) =====================
  {
    code: 'sanpub_plan_prevention_epidemique',
    name: "Plan de Prevention Epidemique",
    category: 'sante',
    price: 5000,
    priceMax: 18000,
    description: "Plan structuré de prévention et de réponse aux épidémies pour établissements de santé et districts sanitaires en Afrique francophone.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'nom_district',label:"Nom du district sanitaire",type:'text',required:true},
      {key:'maladies_cibles',label:"Maladies cibles du plan",type:'textarea',required:true},
      {key:'date_elaboration',label:"Date d'élaboration",type:'date',required:true},
      {key:'responsable_plan',label:"Responsable du plan",type:'text',required:true},
      {key:'ressources_disponibles',label:"Ressources disponibles",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>PLAN DE PREVENTION EPIDEMIQUE</h1><h2>District Sanitaire : {{nom_district}}</h2><p><strong>Date :</strong> {{date_elaboration}}</p><p><strong>Responsable :</strong> {{responsable_plan}}</p><h3>1. Maladies Cibles</h3><p>{{maladies_cibles}}</p><h3>2. Ressources Disponibles</h3><p>{{ressources_disponibles}}</p><h3>3. Mesures de Prevention</h3><p>Les mesures de prévention épidémique sont définies conformément aux directives du Ministère de la Santé et de l'OMS.</p></div>`
  },
  {
    code: 'sanpub_rapport_surveillance_epidemio',
    name: "Rapport de Surveillance Epidemiologique",
    category: 'sante',
    price: 4000,
    priceMax: 14000,
    description: "Rapport périodique de surveillance épidémiologique pour le suivi des tendances des maladies et alertes sanitaires.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'region_sanitaire',label:"Région sanitaire",type:'text',required:true},
      {key:'periode_rapport',label:"Période du rapport",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'cas_notifies',label:"Cas notifiés et tendances",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SURVEILLANCE EPIDEMIOLOGIQUE</h1><h2>Région : {{region_sanitaire}}</h2><p><strong>Période :</strong> {{periode_rapport}} | <strong>Date :</strong> {{date_rapport}}</p><h3>1. Situation Epidemiologique</h3><p>{{cas_notifies}}</p><h3>2. Recommandations</h3><p>{{recommandations}}</p><h3>3. Conclusion</h3><p>Ce rapport est transmis aux autorités sanitaires compétentes pour action appropriée.</p></div>`
  },
  {
    code: 'sanpub_protocole_mno',
    name: "Protocole de Declaration de Maladie a Notification Obligatoire",
    category: 'sante',
    price: 3500,
    priceMax: 12000,
    description: "Protocole officiel de déclaration des maladies à notification obligatoire (MNO) conforme aux règlements sanitaires internationaux.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'etablissement_declarant',label:"Etablissement déclarant",type:'text',required:true},
      {key:'maladie_notifiee',label:"Maladie notifiée",type:'text',required:true},
      {key:'date_declaration',label:"Date de déclaration",type:'date',required:true},
      {key:'description_cas',label:"Description des cas",type:'textarea',required:true},
      {key:'mesures_prises',label:"Mesures prises",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE DECLARATION DE MALADIE A NOTIFICATION OBLIGATOIRE</h1><p><strong>Etablissement :</strong> {{etablissement_declarant}}</p><p><strong>Maladie :</strong> {{maladie_notifiee}} | <strong>Date :</strong> {{date_declaration}}</p><h3>1. Description des Cas</h3><p>{{description_cas}}</p><h3>2. Mesures Prises</h3><p>{{mesures_prises}}</p><h3>3. Transmission</h3><p>Ce formulaire est transmis dans les 24 heures à la Direction de la Santé et de l'Hygiène Publique.</p></div>`
  },
  {
    code: 'sanpub_accord_cooperation_sante',
    name: "Accord de Cooperation Sante Publique",
    category: 'sante',
    price: 6000,
    priceMax: 20000,
    description: "Accord-cadre de coopération entre institutions sanitaires pour le renforcement des capacités de santé publique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'institution_a',label:"Première institution",type:'text',required:true},
      {key:'institution_b',label:"Deuxième institution",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'domaines_cooperation',label:"Domaines de coopération",type:'textarea',required:true},
      {key:'duree_accord',label:"Durée de l'accord",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COOPERATION EN SANTE PUBLIQUE</h1><p>Entre <strong>{{institution_a}}</strong> et <strong>{{institution_b}}</strong></p><p><strong>Date :</strong> {{date_signature}}</p><h3>Article 1 - Objet</h3><p>Le présent accord définit les modalités de coopération en santé publique.</p><h3>Article 2 - Domaines de Cooperation</h3><p>{{domaines_cooperation}}</p><h3>Article 3 - Duree</h3><p>{{duree_accord}}</p></div>`
  },
  {
    code: 'sanpub_plan_national_vaccination',
    name: "Plan National de Vaccination",
    category: 'sante',
    price: 7000,
    priceMax: 22000,
    description: "Plan national de vaccination pour la mise en oeuvre des programmes de vaccination du Programme Elargi de Vaccination (PEV).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'pays',label:"Pays",type:'text',required:true},
      {key:'annee_plan',label:"Année du plan",type:'text',required:true},
      {key:'vaccins_cibles',label:"Vaccins et populations cibles",type:'textarea',required:true},
      {key:'objectifs_couverture',label:"Objectifs de couverture vaccinale",type:'textarea',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel (FCFA)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>PLAN NATIONAL DE VACCINATION</h1><h2>{{pays}} - Année {{annee_plan}}</h2><h3>1. Vaccins et Populations Cibles</h3><p>{{vaccins_cibles}}</p><h3>2. Objectifs de Couverture Vaccinale</h3><p>{{objectifs_couverture}}</p><h3>3. Budget</h3><p>Budget prévisionnel : {{budget_previsionnel}} FCFA</p><h3>4. Mise en Oeuvre</h3><p>La mise en oeuvre est assurée par le Programme Elargi de Vaccination en collaboration avec les partenaires techniques et financiers.</p></div>`
  },
  {
    code: 'sanpub_rapport_couverture_vaccinale',
    name: "Rapport de Couverture Vaccinale",
    category: 'sante',
    price: 3000,
    priceMax: 10000,
    description: "Rapport d'évaluation de la couverture vaccinale au niveau national ou régional pour le suivi du PEV.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'zone_couverture',label:"Zone de couverture",type:'text',required:true},
      {key:'periode_evaluation',label:"Période d'évaluation",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'taux_couverture',label:"Taux de couverture par vaccin",type:'textarea',required:true},
      {key:'gaps_identifies',label:"Gaps identifiés",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE COUVERTURE VACCINALE</h1><p><strong>Zone :</strong> {{zone_couverture}} | <strong>Période :</strong> {{periode_evaluation}} | <strong>Date :</strong> {{date_rapport}}</p><h3>1. Taux de Couverture par Vaccin</h3><p>{{taux_couverture}}</p><h3>2. Gaps Identifies</h3><p>{{gaps_identifies}}</p><h3>3. Plan de Rattrapage</h3><p>Des activités de vaccination de rattrapage seront organisées pour les zones à faible couverture.</p></div>`
  },
  {
    code: 'sanpub_convention_oms_ministere',
    name: "Convention de Partenariat OMS-Ministere Sante",
    category: 'sante',
    price: 8000,
    priceMax: 25000,
    description: "Convention de partenariat entre l'Organisation Mondiale de la Santé (OMS) et le Ministère de la Santé pour le soutien aux programmes de santé publique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'pays_membre',label:"Pays membre OMS",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'programmes_soutenus',label:"Programmes soutenus",type:'textarea',required:true},
      {key:'contribution_oms',label:"Contribution de l'OMS",type:'textarea',required:true},
      {key:'duree_convention',label:"Durée de la convention",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT OMS - MINISTERE DE LA SANTE</h1><h2>Pays : {{pays_membre}}</h2><p><strong>Date :</strong> {{date_convention}} | <strong>Durée :</strong> {{duree_convention}}</p><h3>Article 1 - Objet</h3><p>La présente convention définit le cadre de partenariat entre l'OMS et le Ministère de la Santé.</p><h3>Article 2 - Programmes Soutenus</h3><p>{{programmes_soutenus}}</p><h3>Article 3 - Contribution OMS</h3><p>{{contribution_oms}}</p></div>`
  },
  {
    code: 'sanpub_accord_labo_reference',
    name: "Accord de Service de Laboratoire de Reference",
    category: 'sante',
    price: 5500,
    priceMax: 18000,
    description: "Accord de service entre un laboratoire de référence et un établissement de santé pour les analyses spécialisées et la confirmation de diagnostics.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'labo_reference',label:"Laboratoire de référence",type:'text',required:true},
      {key:'etablissement_client',label:"Etablissement client",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'analyses_couvertes',label:"Analyses couvertes",type:'textarea',required:true},
      {key:'delais_resultats',label:"Délais de rendu des résultats",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LABORATOIRE DE REFERENCE</h1><p>Entre <strong>{{labo_reference}}</strong> et <strong>{{etablissement_client}}</strong></p><p><strong>Date :</strong> {{date_accord}}</p><h3>1. Analyses Couvertes</h3><p>{{analyses_couvertes}}</p><h3>2. Delais de Rendu des Resultats</h3><p>{{delais_resultats}}</p><h3>3. Confidentialite</h3><p>Les résultats d'analyses sont confidentiels et transmis uniquement au médecin prescripteur.</p></div>`
  },
  {
    code: 'sanpub_contrat_lutte_paludisme',
    name: "Contrat de Service de Lutte Contre le Paludisme",
    category: 'sante',
    price: 6000,
    priceMax: 20000,
    description: "Contrat de service pour la mise en oeuvre d'activités de lutte antipaludique incluant la distribution de moustiquaires et les pulvérisations.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      {key:'prestataire_service',label:"Prestataire de service",type:'text',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'activites_prevues',label:"Activités prévues",type:'textarea',required:true},
      {key:'montant_contrat',label:"Montant du contrat (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE LUTTE CONTRE LE PALUDISME</h1><p><strong>Prestataire :</strong> {{prestataire_service}}</p><p><strong>Zone :</strong> {{zone_intervention}} | <strong>Début :</strong> {{date_debut}}</p><h3>1. Activites Prevues</h3><p>{{activites_prevues}}</p><h3>2. Montant</h3><p>Montant du contrat : <strong>{{montant_contrat}} FCFA</strong></p><h3>3. Indicateurs de Performance</h3><p>Les indicateurs de performance seront définis conformément aux normes du Programme National de Lutte contre le Paludisme.</p></div>`
  },
  {
    code: 'sanpub_accord_lutte_tuberculose',
    name: "Accord de Programme de Lutte Contre la Tuberculose",
    category: 'sante',
    price: 5000,
    priceMax: 17000,
    description: "Accord de programme pour la mise en oeuvre de la stratégie nationale de lutte contre la tuberculose (DOTS et TB-MDR).",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'programme_national_tb',label:"Programme National de Lutte contre la TB",type:'text',required:true},
      {key:'partenaire_mise_oeuvre',label:"Partenaire de mise en oeuvre",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'zones_couvertes',label:"Zones couvertes",type:'textarea',required:true},
      {key:'objectifs_programme',label:"Objectifs du programme",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROGRAMME DE LUTTE CONTRE LA TUBERCULOSE</h1><p><strong>Programme :</strong> {{programme_national_tb}}</p><p><strong>Partenaire :</strong> {{partenaire_mise_oeuvre}} | <strong>Date :</strong> {{date_accord}}</p><h3>1. Zones Couvertes</h3><p>{{zones_couvertes}}</p><h3>2. Objectifs du Programme</h3><p>{{objectifs_programme}}</p><h3>3. Strategie DOTS</h3><p>La stratégie Directly Observed Treatment Short-course (DOTS) sera appliquée conformément aux directives de l'OMS.</p></div>`
  },
  {
    code: 'sanpub_plan_depistage_vih',
    name: "Plan de Depistage VIH/SIDA",
    category: 'sante',
    price: 5000,
    priceMax: 16000,
    description: "Plan opérationnel de dépistage du VIH/SIDA incluant le conseil et dépistage volontaire (CDV) et le dépistage à l'initiative du soignant.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'region_depistage',label:"Région de dépistage",type:'text',required:true},
      {key:'annee_plan',label:"Année du plan",type:'text',required:true},
      {key:'sites_depistage',label:"Sites de dépistage",type:'textarea',required:true},
      {key:'populations_cibles',label:"Populations cibles",type:'textarea',required:true},
      {key:'objectif_tests',label:"Objectif nombre de tests",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>PLAN DE DEPISTAGE VIH/SIDA</h1><h2>Région : {{region_depistage}} | Année : {{annee_plan}}</h2><h3>1. Sites de Depistage</h3><p>{{sites_depistage}}</p><h3>2. Populations Cibles</h3><p>{{populations_cibles}}</p><h3>3. Objectif</h3><p>Nombre de tests prévus : {{objectif_tests}}</p><h3>4. Confidentialite</h3><p>Toutes les procédures respectent la confidentialité et le consentement éclairé du patient.</p></div>`
  },
  {
    code: 'sanpub_rapport_programme_ptme',
    name: "Rapport de Programme PTME",
    category: 'sante',
    price: 4000,
    priceMax: 13000,
    description: "Rapport du programme de prévention de la transmission mère-enfant du VIH (PTME) incluant les indicateurs de performance.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'etablissement_sante',label:"Etablissement de santé",type:'text',required:true},
      {key:'periode_rapport',label:"Période du rapport",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'indicateurs_ptme',label:"Indicateurs PTME",type:'textarea',required:true},
      {key:'defis_rencontres',label:"Défis rencontrés",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PROGRAMME PTME</h1><h2>Prevention de la Transmission Mere-Enfant du VIH</h2><p><strong>Etablissement :</strong> {{etablissement_sante}} | <strong>Période :</strong> {{periode_rapport}} | <strong>Date :</strong> {{date_rapport}}</p><h3>1. Indicateurs PTME</h3><p>{{indicateurs_ptme}}</p><h3>2. Defis Rencontres</h3><p>{{defis_rencontres}}</p><h3>3. Recommandations</h3><p>Des recommandations seront formulées pour améliorer la performance du programme.</p></div>`
  },
  {
    code: 'sanpub_accord_nutrition_mni',
    name: "Accord de Programme Nutrition Maternelle et Infantile",
    category: 'sante',
    price: 5500,
    priceMax: 18000,
    description: "Accord de programme pour la promotion de la nutrition maternelle et infantile incluant l'allaitement maternel et la supplémentation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'organisation_coordinatrice',label:"Organisation coordinatrice",type:'text',required:true},
      {key:'zone_programme',label:"Zone du programme",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'interventions_nutrition',label:"Interventions nutritionnelles",type:'textarea',required:true},
      {key:'indicateurs_resultats',label:"Indicateurs de résultats",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROGRAMME NUTRITION MATERNELLE ET INFANTILE</h1><p><strong>Organisation :</strong> {{organisation_coordinatrice}} | <strong>Zone :</strong> {{zone_programme}}</p><p><strong>Date :</strong> {{date_accord}}</p><h3>1. Interventions Nutritionnelles</h3><p>{{interventions_nutrition}}</p><h3>2. Indicateurs de Resultats</h3><p>{{indicateurs_resultats}}</p><h3>3. Protocole de Nutrition Therapeutique</h3><p>La prise en charge de la malnutrition aiguë sévère sera assurée conformément aux protocoles nationaux.</p></div>`
  },
  {
    code: 'sanpub_plan_sante_mentale',
    name: "Plan de Sante Mentale Communautaire",
    category: 'sante',
    price: 4500,
    priceMax: 15000,
    description: "Plan de développement des services de santé mentale communautaire pour l'accès aux soins psychiatriques en milieu rural et périurbain.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'district_sante',label:"District de santé",type:'text',required:true},
      {key:'annee_plan',label:"Année du plan",type:'text',required:true},
      {key:'services_planifies',label:"Services planifiés",type:'textarea',required:true},
      {key:'ressources_humaines',label:"Ressources humaines",type:'textarea',required:true},
      {key:'partenaires',label:"Partenaires impliqués",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>PLAN DE SANTE MENTALE COMMUNAUTAIRE</h1><h2>District : {{district_sante}} | Année : {{annee_plan}}</h2><h3>1. Services Planifies</h3><p>{{services_planifies}}</p><h3>2. Ressources Humaines</h3><p>{{ressources_humaines}}</p><h3>3. Partenaires</h3><p>{{partenaires}}</p><h3>4. Objectifs</h3><p>Améliorer l'accès aux soins de santé mentale pour les populations vulnérables du district.</p></div>`
  },
  {
    code: 'sanpub_rapport_systeme_district',
    name: "Rapport de Systeme de Sante de District",
    category: 'sante',
    price: 4000,
    priceMax: 13000,
    description: "Rapport d'évaluation du système de santé de district incluant les ressources, les activités et les résultats sanitaires.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      {key:'district_sanitaire',label:"District sanitaire",type:'text',required:true},
      {key:'annee_rapport',label:"Année du rapport",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'indicateurs_sante',label:"Indicateurs de santé clés",type:'textarea',required:true},
      {key:'contraintes_systeme',label:"Contraintes du système",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SYSTEME DE SANTE DE DISTRICT</h1><h2>District : {{district_sanitaire}} | Année : {{annee_rapport}}</h2><p><strong>Date :</strong> {{date_rapport}}</p><h3>1. Indicateurs de Sante Cles</h3><p>{{indicateurs_sante}}</p><h3>2. Contraintes du Systeme</h3><p>{{contraintes_systeme}}</p><h3>3. Plan d'Amelioration</h3><p>Un plan d'amélioration sera élaboré en concertation avec les parties prenantes du district.</p></div>`
  },
  {
    code: 'sanpub_accord_ambulance_samu',
    name: "Accord de Service d'Ambulance et SAMU",
    category: 'sante',
    price: 6000,
    priceMax: 20000,
    description: "Accord de service pour la provision des services d'ambulance et du Service d'Aide Médicale Urgente (SAMU) dans les zones définies.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      {key:'prestataire_ambulance',label:"Prestataire d'ambulance",type:'text',required:true},
      {key:'zone_couverture',label:"Zone de couverture",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'niveau_service',label:"Niveau de service requis",type:'textarea',required:true},
      {key:'tarification',label:"Tarification des services",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D"AMBULANCE ET SAMU</h1><p><strong>Prestataire :</strong> {{prestataire_ambulance}} | <strong>Zone :</strong> {{zone_couverture}}</p><p><strong>Date :</strong> {{date_accord}}</p><h3>1. Niveau de Service</h3><p>{{niveau_service}}</p><h3>2. Tarification</h3><p>{{tarification}}</p><h3>3. Obligations du Prestataire</h3><p>Le prestataire s'engage à maintenir une disponibilité 24h/24 et 7j/7 et à respecter les délais d'intervention.</p></div>`
  },
  {
    code: 'sanpub_convention_formation_asc',
    name: "Convention de Formation Agents de Sante Communautaire",
    category: 'sante',
    price: 5000,
    priceMax: 16000,
    description: "Convention de formation et d'encadrement des Agents de Santé Communautaire (ASC) pour le renforcement des soins de santé primaires.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 69,
    fieldsJson: F([
      {key:'institution_formatrice',label:"Institution formatrice",type:'text',required:true},
      {key:'district_beneficiaire',label:"District bénéficiaire",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'modules_formation',label:"Modules de formation",type:'textarea',required:true},
      {key:'nombre_asc',label:"Nombre d'ASC à former",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FORMATION DES AGENTS DE SANTE COMMUNAUTAIRE</h1><p>Entre <strong>{{institution_formatrice}}</strong> et le District de <strong>{{district_beneficiaire}}</strong></p><p><strong>Date :</strong> {{date_convention}}</p><h3>1. Modules de Formation</h3><p>{{modules_formation}}</p><h3>2. Effectif</h3><p>Nombre d'ASC à former : <strong>{{nombre_asc}}</strong></p><h3>3. Certification</h3><p>A l'issue de la formation, les ASC reçoivent une attestation de formation délivrée par le Ministère de la Santé.</p></div>`
  },
  {
    code: 'sanpub_accord_banque_sang',
    name: "Accord de Service de Banque de Sang",
    category: 'sante',
    price: 5500,
    priceMax: 18000,
    description: "Accord de service entre un centre national de transfusion sanguine et un établissement hospitalier pour la fourniture de produits sanguins labiles.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      {key:'cnts',label:"Centre National de Transfusion Sanguine",type:'text',required:true},
      {key:'hopital_beneficiaire',label:"Hôpital bénéficiaire",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'produits_sanguins',label:"Produits sanguins fournis",type:'textarea',required:true},
      {key:'conditions_stockage',label:"Conditions de stockage",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BANQUE DE SANG</h1><p>Entre <strong>{{cnts}}</strong> et <strong>{{hopital_beneficiaire}}</strong></p><p><strong>Date :</strong> {{date_accord}}</p><h3>1. Produits Sanguins Fournis</h3><p>{{produits_sanguins}}</p><h3>2. Conditions de Stockage</h3><p>{{conditions_stockage}}</p><h3>3. Normes de Qualite</h3><p>Tous les produits sanguins sont soumis aux contrôles de qualité conformément aux normes OMS.</p></div>`
  },
  {
    code: 'sanpub_plan_gestion_dechets_biomed',
    name: "Plan de Gestion des Dechets Biomedicaux",
    category: 'sante',
    price: 4500,
    priceMax: 15000,
    description: "Plan de gestion des déchets biomédicaux pour les établissements de santé conformément aux réglementations environnementales et sanitaires.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'etablissement_sante',label:"Etablissement de santé",type:'text',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true},
      {key:'categories_dechets',label:"Catégories de déchets",type:'textarea',required:true},
      {key:'methodes_traitement',label:"Méthodes de traitement",type:'textarea',required:true},
      {key:'responsable_gestion',label:"Responsable de la gestion",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>PLAN DE GESTION DES DECHETS BIOMEDICAUX</h1><h2>Etablissement : {{etablissement_sante}}</h2><p><strong>Date :</strong> {{date_plan}}</p><h3>1. Categories de Dechets</h3><p>{{categories_dechets}}</p><h3>2. Methodes de Traitement</h3><p>{{methodes_traitement}}</p><h3>3. Responsable</h3><p>{{responsable_gestion}}</p><h3>4. Reglementation</h3><p>Ce plan est conforme aux dispositions du Code de l'Environnement et des normes de gestion des déchets de soins.</p></div>`
  },
  {
    code: 'sanpub_rapport_inspection_sanitaire',
    name: "Rapport d'Inspection Sanitaire Etablissement",
    category: 'sante',
    price: 3500,
    priceMax: 12000,
    description: "Rapport officiel d'inspection sanitaire d'un établissement de santé ou de restauration collective par les autorités sanitaires compétentes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'etablissement_inspecte',label:"Etablissement inspecté",type:'text',required:true},
      {key:'date_inspection',label:"Date d'inspection",type:'date',required:true},
      {key:'inspecteur',label:"Inspecteur sanitaire",type:'text',required:true},
      {key:'constats',label:"Constats de l'inspection",type:'textarea',required:true},
      {key:'mesures_correctrices',label:"Mesures correctrices prescrites",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D"INSPECTION SANITAIRE</h1><p><strong>Etablissement :</strong> {{etablissement_inspecte}}</p><p><strong>Date :</strong> {{date_inspection}} | <strong>Inspecteur :</strong> {{inspecteur}}</p><h3>1. Constats</h3><p>{{constats}}</p><h3>2. Mesures Correctrices</h3><p>{{mesures_correctrices}}</p><h3>3. Delai de Mise en Conformite</h3><p>L'établissement dispose d'un délai de 30 jours pour se conformer aux prescriptions du présent rapport.</p></div>`
  },
  {
    code: 'sanpub_accord_chaine_froide_vaccins',
    name: "Accord de Chaine du Froid Vaccins",
    category: 'sante',
    price: 6000,
    priceMax: 20000,
    description: "Accord de maintenance et de gestion de la chaîne du froid pour la conservation des vaccins au niveau des dépôts régionaux et district.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'fournisseur_equipement',label:"Fournisseur d'équipements",type:'text',required:true},
      {key:'district_beneficiaire',label:"District bénéficiaire",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'equipements_couverts',label:"Equipements couverts",type:'textarea',required:true},
      {key:'frequence_maintenance',label:"Fréquence de maintenance",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CHAINE DU FROID - VACCINS</h1><p>Entre <strong>{{fournisseur_equipement}}</strong> et le District de <strong>{{district_beneficiaire}}</strong></p><p><strong>Date :</strong> {{date_accord}}</p><h3>1. Equipements Couverts</h3><p>{{equipements_couverts}}</p><h3>2. Maintenance</h3><p>Fréquence de maintenance : {{frequence_maintenance}}</p><h3>3. Temperature de Conservation</h3><p>Les vaccins doivent être conservés entre +2°C et +8°C. Tout écart de température déclenche une alerte immédiate.</p></div>`
  },
  {
    code: 'sanpub_convention_telemedecine_rurale',
    name: "Convention de Telemedecine Rurale",
    category: 'sante',
    price: 7000,
    priceMax: 22000,
    description: "Convention de mise en oeuvre de services de télémédecine pour l'accès aux consultations spécialisées dans les zones rurales et enclavées.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'hopital_pivot',label:"Hôpital pivot (téléexpertise)",type:'text',required:true},
      {key:'centres_ruraux',label:"Centres de santé ruraux",type:'textarea',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'specialites_couvertes',label:"Spécialités médicales couvertes",type:'textarea',required:true},
      {key:'plateforme_utilisee',label:"Plateforme technologique utilisée",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE TELEMEDECINE RURALE</h1><p><strong>Hôpital pivot :</strong> {{hopital_pivot}}</p><p><strong>Date :</strong> {{date_convention}}</p><h3>1. Centres de Sante Ruraux Connectes</h3><p>{{centres_ruraux}}</p><h3>2. Specialites Couvertes</h3><p>{{specialites_couvertes}}</p><h3>3. Plateforme</h3><p>{{plateforme_utilisee}}</p><h3>4. Confidentialite des Donnees</h3><p>Les données patients sont protégées conformément à la réglementation sur la protection des données de santé.</p></div>`
  },
  {
    code: 'sanpub_plan_preparation_pandemie',
    name: "Plan de Preparation a la Pandemie",
    category: 'sante',
    price: 8000,
    priceMax: 25000,
    description: "Plan national de préparation et de réponse aux pandémies conforme au Règlement Sanitaire International (RSI 2005) de l'OMS.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      {key:'pays',label:"Pays",type:'text',required:true},
      {key:'date_elaboration',label:"Date d'élaboration",type:'date',required:true},
      {key:'scenarios_pandemiques',label:"Scénarios pandémiques couverts",type:'textarea',required:true},
      {key:'structure_commandement',label:"Structure de commandement",type:'textarea',required:true},
      {key:'ressources_reserves',label:"Ressources en réserve stratégique",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>PLAN NATIONAL DE PREPARATION A LA PANDEMIE</h1><h2>{{pays}}</h2><p><strong>Date d'élaboration :</strong> {{date_elaboration}}</p><h3>1. Scenarios Pandemiques</h3><p>{{scenarios_pandemiques}}</p><h3>2. Structure de Commandement</h3><p>{{structure_commandement}}</p><h3>3. Reserve Strategique</h3><p>{{ressources_reserves}}</p><h3>4. Activation du Plan</h3><p>Le plan est activé par décret du Chef de l'Etat sur recommandation du Ministre de la Santé lors de la déclaration d'urgence sanitaire de portée internationale.</p></div>`
  },
  {
    code: 'sanpub_rapport_mortalite_maternelle',
    name: "Rapport de Mortalite Maternelle et Infantile",
    category: 'sante',
    price: 4000,
    priceMax: 14000,
    description: "Rapport d'analyse de la mortalité maternelle et infantile avec identification des causes évitables et recommandations d'amélioration.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'region_sante',label:"Région de santé",type:'text',required:true},
      {key:'annee_rapport',label:"Année du rapport",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'indicateurs_mortalite',label:"Indicateurs de mortalité",type:'textarea',required:true},
      {key:'causes_evitables',label:"Causes évitables identifiées",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE MORTALITE MATERNELLE ET INFANTILE</h1><h2>Région : {{region_sante}} | Année : {{annee_rapport}}</h2><p><strong>Date :</strong> {{date_rapport}}</p><h3>1. Indicateurs de Mortalite</h3><p>{{indicateurs_mortalite}}</p><h3>2. Causes Evitables</h3><p>{{causes_evitables}}</p><h3>3. Plan d'Action</h3><p>Un plan d'action intégré sera mis en oeuvre pour réduire la mortalité maternelle et infantile évitable dans la région.</p></div>`
  },
  {
    code: 'sanpub_charte_sante_communautaire',
    name: "Charte de Sante Communautaire",
    category: 'sante',
    price: 3000,
    priceMax: 10000,
    description: "Charte de santé communautaire définissant les droits et responsabilités des communautés dans la gestion de leur santé et le partenariat avec les services de santé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'communaute',label:"Nom de la communauté",type:'text',required:true},
      {key:'district_sante',label:"District de santé",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'engagements_communaute',label:"Engagements de la communauté",type:'textarea',required:true},
      {key:'engagements_services_sante',label:"Engagements des services de santé",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE SANTE COMMUNAUTAIRE</h1><h2>Communauté : {{communaute}} | District : {{district_sante}}</h2><p><strong>Date d'adoption :</strong> {{date_adoption}}</p><h3>Article 1 - Engagements de la Communaute</h3><p>{{engagements_communaute}}</p><h3>Article 2 - Engagements des Services de Sante</h3><p>{{engagements_services_sante}}</p><h3>Article 3 - Gouvernance</h3><p>Un comité de santé communautaire assure le suivi de la présente charte et se réunit trimestriellement.</p></div>`
  },
  // ===================== ONG / HUMANITAIRE (25) =====================
  {
    code: 'ong2_convention_financement_ong',
    name: "Convention de Financement ONG (Bailleur-ONG)",
    category: 'association',
    price: 8000,
    priceMax: 28000,
    description: "Convention de financement entre un bailleur de fonds international et une ONG pour la mise en oeuvre d'un projet humanitaire ou de développement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'bailleur_fonds',label:"Bailleur de fonds",type:'text',required:true},
      {key:'ong_beneficiaire',label:"ONG bénéficiaire",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'montant_financement',label:"Montant du financement",type:'text',required:true},
      {key:'duree_projet',label:"Durée du projet",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FINANCEMENT ONG</h1><p>Entre <strong>{{bailleur_fonds}}</strong> (ci-après "le Bailleur") et <strong>{{ong_beneficiaire}}</strong> (ci-après "l'ONG")</p><p><strong>Date :</strong> {{date_convention}}</p><h3>Article 1 - Projet Finance</h3><p>Titre : {{titre_projet}}</p><h3>Article 2 - Montant</h3><p>Montant total : <strong>{{montant_financement}}</strong></p><h3>Article 3 - Duree</h3><p>{{duree_projet}}</p><h3>Article 4 - Obligations de l'ONG</h3><p>L'ONG s'engage à utiliser les fonds conformément au budget approuvé et aux procédures du Bailleur.</p></div>`
  },
  {
    code: 'ong2_rapport_activites_trimestriel',
    name: "Rapport d'Activites ONG Trimestriel",
    category: 'association',
    price: 3500,
    priceMax: 12000,
    description: "Rapport trimestriel d'activités d'une ONG incluant les réalisations, les indicateurs de performance et les défis rencontrés.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'trimestre_rapport',label:"Trimestre du rapport",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'realisations',label:"Réalisations du trimestre",type:'textarea',required:true},
      {key:'defis_solutions',label:"Défis et solutions apportées",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT D"ACTIVITES TRIMESTRIEL</h1><h2>{{nom_ong}}</h2><p><strong>Trimestre :</strong> {{trimestre_rapport}} | <strong>Date :</strong> {{date_rapport}}</p><h3>1. Realisations</h3><p>{{realisations}}</p><h3>2. Defis et Solutions</h3><p>{{defis_solutions}}</p><h3>3. Planification Prochaine Periode</h3><p>Les activités du prochain trimestre seront ajustées en fonction des leçons apprises et des recommandations des parties prenantes.</p></div>`
  },
  {
    code: 'ong2_rapport_financier_narrative',
    name: "Rapport Financier ONG (Narrative Report)",
    category: 'association',
    price: 4000,
    priceMax: 14000,
    description: "Rapport financier narratif d'une ONG présentant l'utilisation des fonds, les dépenses réalisées et les justificatifs financiers.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 77,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'projet_concerne',label:"Projet concerné",type:'text',required:true},
      {key:'periode_rapport',label:"Période du rapport",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'synthese_depenses',label:"Synthèse des dépenses",type:'textarea',required:true},
      {key:'solde_restant',label:"Solde restant (devise)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT FINANCIER ONG - NARRATIVE REPORT</h1><h2>{{nom_ong}} | Projet : {{projet_concerne}}</h2><p><strong>Période :</strong> {{periode_rapport}} | <strong>Date :</strong> {{date_rapport}}</p><h3>1. Synthese des Depenses</h3><p>{{synthese_depenses}}</p><h3>2. Solde Restant</h3><p>{{solde_restant}}</p><h3>3. Conformite Financiere</h3><p>Toutes les dépenses ont été réalisées conformément aux lignes budgétaires approuvées et aux procédures financières du Bailleur.</p></div>`
  },
  {
    code: 'ong2_accord_partenariat_ong_ong',
    name: "Accord de Partenariat Operationnel ONG-ONG",
    category: 'association',
    price: 5000,
    priceMax: 17000,
    description: "Accord de partenariat opérationnel entre deux ONG pour la mise en oeuvre conjointe d'activités humanitaires ou de développement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'ong_leader',label:"ONG chef de file",type:'text',required:true},
      {key:'ong_partenaire',label:"ONG partenaire",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'activites_conjointes',label:"Activités conjointes",type:'textarea',required:true},
      {key:'repartition_roles',label:"Répartition des rôles",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT OPERATIONNEL ONG-ONG</h1><p>Entre <strong>{{ong_leader}}</strong> (Chef de file) et <strong>{{ong_partenaire}}</strong></p><p><strong>Date :</strong> {{date_accord}}</p><h3>1. Activites Conjointes</h3><p>{{activites_conjointes}}</p><h3>2. Repartition des Roles</h3><p>{{repartition_roles}}</p><h3>3. Gestion des Litiges</h3><p>Tout litige sera résolu à l'amiable entre les parties. A défaut, les parties recourront à la médiation.</p></div>`
  },
  {
    code: 'ong2_convention_delegation_moa',
    name: "Convention de Delegation de Maitrise d'Ouvrage",
    category: 'association',
    price: 7000,
    priceMax: 22000,
    description: "Convention de délégation de maîtrise d'ouvrage permettant à une ONG ou institution de mandater un tiers pour gérer un programme ou projet.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage délégant",type:'text',required:true},
      {key:'mandataire',label:"Mandataire (MOD)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'programme_delegue',label:"Programme délégué",type:'textarea',required:true},
      {key:'budget_delegue',label:"Budget délégué",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE DELEGATION DE MAITRISE D"OUVRAGE</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{mandataire}}</strong></p><p><strong>Date :</strong> {{date_convention}}</p><h3>Article 1 - Programme Delegue</h3><p>{{programme_delegue}}</p><h3>Article 2 - Budget Delegue</h3><p>Montant délégué : <strong>{{budget_delegue}}</strong></p><h3>Article 3 - Responsabilites</h3><p>Le mandataire agit au nom et pour le compte du maître d'ouvrage dans les limites définies par la présente convention.</p></div>`
  },
  {
    code: 'ong2_contrat_consultant_ong',
    name: "Contrat de Consultant ONG",
    category: 'association',
    price: 5000,
    priceMax: 17000,
    description: "Contrat de prestation de services de consultant pour une mission spécifique au sein d'une ONG internationale ou nationale.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'nom_consultant',label:"Nom du consultant",type:'text',required:true},
      {key:'ong_contractante',label:"ONG contractante",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
      {key:'termes_reference',label:"Termes de référence",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires et modalités de paiement",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONSULTANT ONG</h1><p>Entre <strong>{{ong_contractante}}</strong> et <strong>{{nom_consultant}}</strong></p><p><strong>Date :</strong> {{date_contrat}}</p><h3>1. Termes de Reference</h3><p>{{termes_reference}}</p><h3>2. Honoraires</h3><p>{{honoraires}}</p><h3>3. Propriete Intellectuelle</h3><p>Tous les livrables produits dans le cadre de cette mission sont la propriété exclusive de l'ONG contractante.</p></div>`
  },
  {
    code: 'ong2_accord_sous_traitance_humanitaire',
    name: "Accord de Sous-Traitance Programme Humanitaire",
    category: 'association',
    price: 6000,
    priceMax: 20000,
    description: "Accord de sous-traitance entre une ONG internationale et une ONG locale pour la mise en oeuvre d'un programme humanitaire sur le terrain.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'ong_internationale',label:"ONG internationale (contractante)",type:'text',required:true},
      {key:'ong_locale',label:"ONG locale (sous-traitante)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'activites_sous_traitees',label:"Activités sous-traitées",type:'textarea',required:true},
      {key:'budget_sous_traitance',label:"Budget de sous-traitance",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUS-TRAITANCE PROGRAMME HUMANITAIRE</h1><p>Entre <strong>{{ong_internationale}}</strong> et <strong>{{ong_locale}}</strong></p><p><strong>Date :</strong> {{date_accord}}</p><h3>1. Activites Sous-Traitees</h3><p>{{activites_sous_traitees}}</p><h3>2. Budget</h3><p>Montant de la sous-traitance : <strong>{{budget_sous_traitance}}</strong></p><h3>3. Responsabilite</h3><p>L'ONG internationale reste responsable vis-à-vis du bailleur de l'exécution des activités sous-traitées.</p></div>`
  },
  {
    code: 'ong2_convention_hebergement_expat',
    name: "Convention d'Hebergement de Personnel Expatrie",
    category: 'association',
    price: 4500,
    priceMax: 15000,
    description: "Convention d'hébergement pour le personnel expatrié d'une ONG incluant les conditions de logement et les responsabilités de l'hôte.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'ong_hebergee',label:"ONG hébergée",type:'text',required:true},
      {key:'fournisseur_logement',label:"Fournisseur de logement",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'description_logement',label:"Description du logement",type:'textarea',required:true},
      {key:'cout_mensuel',label:"Coût mensuel (devise)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION D"HEBERGEMENT DE PERSONNEL EXPATRIE</h1><p>Entre <strong>{{fournisseur_logement}}</strong> et <strong>{{ong_hebergee}}</strong></p><p><strong>Date :</strong> {{date_convention}}</p><h3>1. Description du Logement</h3><p>{{description_logement}}</p><h3>2. Cout</h3><p>Coût mensuel : <strong>{{cout_mensuel}}</strong></p><h3>3. Regles de Vie</h3><p>Le personnel hébergé s'engage à respecter le règlement intérieur et les us et coutumes locaux.</p></div>`
  },
  {
    code: 'ong2_accord_partage_locaux',
    name: "Accord de Partage de Locaux ONG",
    category: 'association',
    price: 3500,
    priceMax: 12000,
    description: "Accord de partage de locaux entre organisations non gouvernementales pour l'utilisation commune de bureaux ou entrepôts.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'ong_proprietaire',label:"ONG propriétaire des locaux",type:'text',required:true},
      {key:'ong_locataire',label:"ONG locataire",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'locaux_partages',label:"Locaux partagés",type:'textarea',required:true},
      {key:'contribution_charges',label:"Contribution aux charges",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTAGE DE LOCAUX ONG</h1><p>Entre <strong>{{ong_proprietaire}}</strong> et <strong>{{ong_locataire}}</strong></p><p><strong>Date :</strong> {{date_accord}}</p><h3>1. Locaux Partages</h3><p>{{locaux_partages}}</p><h3>2. Contribution aux Charges</h3><p>{{contribution_charges}}</p><h3>3. Responsabilite</h3><p>Chaque organisation est responsable de ses équipements et de la sécurité de ses données dans les espaces partagés.</p></div>`
  },
  {
    code: 'ong2_contrat_chauffeur_terrain',
    name: "Contrat de Chauffeur ONG Terrain",
    category: 'association',
    price: 3000,
    priceMax: 10000,
    description: "Contrat de travail pour chauffeur de terrain au sein d'une ONG incluant les missions, le véhicule attribué et les règles de sécurité routière.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_chauffeur',label:"Nom du chauffeur",type:'text',required:true},
      {key:'ong_employeur',label:"ONG employeur",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
      {key:'zone_affectation',label:"Zone d'affectation",type:'text',required:true},
      {key:'remuneration',label:"Rémunération mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CHAUFFEUR ONG - TERRAIN</h1><p>Entre <strong>{{ong_employeur}}</strong> et <strong>{{nom_chauffeur}}</strong></p><p><strong>Date :</strong> {{date_contrat}} | <strong>Zone :</strong> {{zone_affectation}}</p><h3>1. Remuneration</h3><p>Salaire mensuel : <strong>{{remuneration}} FCFA</strong></p><h3>2. Obligations du Chauffeur</h3><p>Le chauffeur s'engage à respecter le code de la route, les procédures de sécurité de l'ONG et à entretenir le véhicule confié.</p><h3>3. Droit Applicable</h3><p>Ce contrat est régi par le Code du Travail en vigueur et la convention collective applicable.</p></div>`
  },
  {
    code: 'ong2_accord_logistique_humanitaire',
    name: "Accord de Logistique Humanitaire",
    category: 'association',
    price: 5500,
    priceMax: 18000,
    description: "Accord de prestation de services logistiques humanitaires incluant le stockage, le transport et la distribution de l'aide humanitaire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'prestataire_logistique',label:"Prestataire logistique",type:'text',required:true},
      {key:'ong_cliente',label:"ONG cliente",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'services_logistiques',label:"Services logistiques fournis",type:'textarea',required:true},
      {key:'zones_livraison',label:"Zones de livraison",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LOGISTIQUE HUMANITAIRE</h1><p>Entre <strong>{{prestataire_logistique}}</strong> et <strong>{{ong_cliente}}</strong></p><p><strong>Date :</strong> {{date_accord}}</p><h3>1. Services Logistiques</h3><p>{{services_logistiques}}</p><h3>2. Zones de Livraison</h3><p>{{zones_livraison}}</p><h3>3. Standards</h3><p>Tous les services sont fournis conformément aux standards logistiques humanitaires UNHRD et aux principes du cluster logistique.</p></div>`
  },
  {
    code: 'ong2_convention_cluster_humanitaire',
    name: "Convention de Cluster Humanitaire",
    category: 'association',
    price: 6000,
    priceMax: 20000,
    description: "Convention de coordination et de participation au système de cluster humanitaire pour une réponse coordonnée aux crises.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_cluster',label:"Nom du cluster",type:'text',required:true},
      {key:'agence_lead',label:"Agence chef de file",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'organisations_membres',label:"Organisations membres",type:'textarea',required:true},
      {key:'mandat_cluster',label:"Mandat du cluster",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CLUSTER HUMANITAIRE</h1><h2>Cluster : {{nom_cluster}}</h2><p><strong>Agence lead :</strong> {{agence_lead}} | <strong>Date :</strong> {{date_convention}}</p><h3>1. Membres du Cluster</h3><p>{{organisations_membres}}</p><h3>2. Mandat</h3><p>{{mandat_cluster}}</p><h3>3. Gouvernance</h3><p>Le cluster fonctionne selon les principes humanitaires et les directives de l'IASC sur l'approche cluster.</p></div>`
  },
  {
    code: 'ong2_accord_communication_inter_agences',
    name: "Accord de Communication Inter-Agences",
    category: 'association',
    price: 4000,
    priceMax: 13000,
    description: "Accord de partage d'information et de communication entre agences humanitaires pour une réponse coordonnée et éviter les doublons.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'agences_signataires',label:"Agences signataires",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'informations_partagees',label:"Informations à partager",type:'textarea',required:true},
      {key:'plateforme_communication',label:"Plateforme de communication",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COMMUNICATION INTER-AGENCES</h1><p><strong>Date :</strong> {{date_accord}}</p><h3>1. Agences Signataires</h3><p>{{agences_signataires}}</p><h3>2. Informations Partagees</h3><p>{{informations_partagees}}</p><h3>3. Plateforme</h3><p>{{plateforme_communication}}</p><h3>4. Confidentialite</h3><p>Les données sensibles relatives aux bénéficiaires ne sont pas partagées sans consentement préalable.</p></div>`
  },
  {
    code: 'ong2_rapport_evaluation_programme',
    name: "Rapport d'Evaluation de Programme",
    category: 'association',
    price: 5000,
    priceMax: 17000,
    description: "Rapport d'évaluation mi-parcours ou finale d'un programme humanitaire ou de développement selon les critères DAC de l'OCDE.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'programme_evalue',label:"Programme évalué",type:'text',required:true},
      {key:'ong_responsable',label:"ONG responsable",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'methodologie',label:"Méthodologie d'évaluation",type:'textarea',required:true},
      {key:'conclusions_recommandations',label:"Conclusions et recommandations",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D"EVALUATION DE PROGRAMME</h1><h2>Programme : {{programme_evalue}}</h2><p><strong>ONG :</strong> {{ong_responsable}} | <strong>Date :</strong> {{date_rapport}}</p><h3>1. Methodologie</h3><p>{{methodologie}}</p><h3>2. Conclusions et Recommandations</h3><p>{{conclusions_recommandations}}</p><h3>3. Criteres DAC</h3><p>L'évaluation a utilisé les critères de Pertinence, Efficacité, Efficience, Impact et Durabilité de l'OCDE/CAD.</p></div>`
  },
  {
    code: 'ong2_rapport_evaluation_finale',
    name: "Rapport d'Evaluation Finale",
    category: 'association',
    price: 6000,
    priceMax: 20000,
    description: "Rapport d'évaluation finale d'un projet ou programme humanitaire incluant les leçons apprises et les recommandations pour les projets futurs.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      {key:'projet_evalue',label:"Projet évalué",type:'text',required:true},
      {key:'periode_evaluation',label:"Période d'évaluation",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'lecons_apprises',label:"Leçons apprises",type:'textarea',required:true},
      {key:'recommandations_futures',label:"Recommandations pour les projets futurs",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D"EVALUATION FINALE</h1><h2>Projet : {{projet_evalue}}</h2><p><strong>Période :</strong> {{periode_evaluation}} | <strong>Date :</strong> {{date_rapport}}</p><h3>1. Lecons Apprises</h3><p>{{lecons_apprises}}</p><h3>2. Recommandations</h3><p>{{recommandations_futures}}</p><h3>3. Durabilite</h3><p>Une analyse de durabilité des résultats est conduite pour s'assurer que les acquis perdurent après la fin du projet.</p></div>`
  },
  {
    code: 'ong2_convention_mission_audit',
    name: "Convention de Mission d'Audit ONG",
    category: 'association',
    price: 5500,
    priceMax: 18000,
    description: "Convention de mission d'audit financier et de conformité d'une ONG par un cabinet d'audit indépendant mandaté par le bailleur ou le conseil d'administration.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'cabinet_audit',label:"Cabinet d'audit",type:'text',required:true},
      {key:'ong_auditee',label:"ONG auditée",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'etendue_audit',label:"Etendue et périmètre de l'audit",type:'textarea',required:true},
      {key:'honoraires_audit',label:"Honoraires d'audit",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MISSION D"AUDIT ONG</h1><p>Entre <strong>{{cabinet_audit}}</strong> et <strong>{{ong_auditee}}</strong></p><p><strong>Date :</strong> {{date_convention}}</p><h3>1. Etendue de l'Audit</h3><p>{{etendue_audit}}</p><h3>2. Honoraires</h3><p>Honoraires convenus : <strong>{{honoraires_audit}}</strong></p><h3>3. Independance de l'Auditeur</h3><p>Le cabinet d'audit déclare son indépendance et l'absence de conflits d'intérêts avec l'organisation auditée.</p></div>`
  },
  {
    code: 'ong2_accord_verification_beneficiaires',
    name: "Accord de Verification des Beneficiaires",
    category: 'association',
    price: 4000,
    priceMax: 13000,
    description: "Accord définissant les procédures de vérification, d'enregistrement et de ciblage des bénéficiaires d'un programme humanitaire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'ong_responsable',label:"ONG responsable",type:'text',required:true},
      {key:'programme_concerne',label:"Programme concerné",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'criteres_ciblage',label:"Critères de ciblage des bénéficiaires",type:'textarea',required:true},
      {key:'procedure_verification',label:"Procédure de vérification",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VERIFICATION DES BENEFICIAIRES</h1><p><strong>ONG :</strong> {{ong_responsable}} | <strong>Programme :</strong> {{programme_concerne}}</p><p><strong>Date :</strong> {{date_accord}}</p><h3>1. Criteres de Ciblage</h3><p>{{criteres_ciblage}}</p><h3>2. Procedure de Verification</h3><p>{{procedure_verification}}</p><h3>3. Protection des Donnees</h3><p>Les données des bénéficiaires sont collectées et traitées conformément aux principes de protection des données dans l'action humanitaire.</p></div>`
  },
  {
    code: 'ong2_plan_securite_personnel',
    name: "Plan de Securite du Personnel ONG",
    category: 'association',
    price: 6000,
    priceMax: 20000,
    description: "Plan de sécurité du personnel d'une ONG opérant dans un environnement à risque, incluant les procédures d'évacuation et de communication de crise.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'zone_operation',label:"Zone d'opération",type:'text',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true},
      {key:'analyse_risques',label:"Analyse des risques",type:'textarea',required:true},
      {key:'procedures_evacuation',label:"Procédures d'évacuation",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE SECURITE DU PERSONNEL ONG</h1><h2>{{nom_ong}} - Zone : {{zone_operation}}</h2><p><strong>Date :</strong> {{date_plan}}</p><h3>1. Analyse des Risques</h3><p>{{analyse_risques}}</p><h3>2. Procedures d'Evacuation</h3><p>{{procedures_evacuation}}</p><h3>3. Contacts d'Urgence</h3><p>En cas de crise, contacter immédiatement le Responsable Sécurité et la Direction Régionale. Ne jamais voyager seul en zone rouge.</p></div>`
  },
  {
    code: 'ong2_procedure_gestion_crise',
    name: "Procedure de Gestion de Crise Humanitaire",
    category: 'association',
    price: 5000,
    priceMax: 16000,
    description: "Procédure standard de gestion des crises humanitaires incluant l'activation de la réponse, la coordination et la communication.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 73,
    fieldsJson: F([
      {key:'ong_responsable',label:"ONG responsable",type:'text',required:true},
      {key:'type_crise',label:"Type de crise couverte",type:'text',required:true},
      {key:'date_procedure',label:"Date de la procédure",type:'date',required:true},
      {key:'niveaux_activation',label:"Niveaux d'activation",type:'textarea',required:true},
      {key:'chaine_commandement',label:"Chaîne de commandement",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PROCEDURE DE GESTION DE CRISE HUMANITAIRE</h1><p><strong>ONG :</strong> {{ong_responsable}} | <strong>Type de crise :</strong> {{type_crise}}</p><p><strong>Date :</strong> {{date_procedure}}</p><h3>1. Niveaux d'Activation</h3><p>{{niveaux_activation}}</p><h3>2. Chaine de Commandement</h3><p>{{chaine_commandement}}</p><h3>3. Communication Externe</h3><p>Toute communication publique en situation de crise est validée par la Direction avant diffusion.</p></div>`
  },
  {
    code: 'ong2_accord_neutralite_impartialite',
    name: "Accord de Neutralite et Impartialite ONG",
    category: 'association',
    price: 4000,
    priceMax: 13000,
    description: "Accord définissant les principes de neutralité et d'impartialité d'une ONG dans ses opérations humanitaires en situation de conflit.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'contexte_operation',label:"Contexte de l'opération",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'engagement_neutralite',label:"Engagement de neutralité",type:'textarea',required:true},
      {key:'mecanisme_plaintes',label:"Mécanisme de plaintes",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE NEUTRALITE ET IMPARTIALITE ONG</h1><h2>{{nom_ong}} - Contexte : {{contexte_operation}}</h2><p><strong>Date :</strong> {{date_accord}}</p><h3>1. Engagement de Neutralite</h3><p>{{engagement_neutralite}}</p><h3>2. Mecanisme de Plaintes</h3><p>{{mecanisme_plaintes}}</p><h3>3. Principes Fondamentaux</h3><p>L'ONG s'engage à respecter les principes humanitaires d'humanité, neutralité, impartialité et indépendance en toutes circonstances.</p></div>`
  },
  {
    code: 'ong2_convention_coordination_autorites',
    name: "Convention de Coordination avec Autorites",
    category: 'association',
    price: 5000,
    priceMax: 17000,
    description: "Convention de coordination entre une ONG humanitaire et les autorités gouvernementales locales pour l'accès et la mise en oeuvre des opérations.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      {key:'ong_partenaire',label:"ONG partenaire",type:'text',required:true},
      {key:'autorite_gouvernementale',label:"Autorité gouvernementale",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'zones_acces',label:"Zones d'accès convenues",type:'textarea',required:true},
      {key:'modalites_coordination',label:"Modalités de coordination",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE COORDINATION AVEC LES AUTORITES</h1><p>Entre <strong>{{ong_partenaire}}</strong> et <strong>{{autorite_gouvernementale}}</strong></p><p><strong>Date :</strong> {{date_convention}}</p><h3>1. Zones d'Acces</h3><p>{{zones_acces}}</p><h3>2. Modalites de Coordination</h3><p>{{modalites_coordination}}</p><h3>3. Principes de Cooperation</h3><p>Les parties s'engagent à une coopération transparente dans le respect des mandats respectifs et des principes humanitaires.</p></div>`
  },
  {
    code: 'ong2_rapport_cloture_projet',
    name: "Rapport de Cloture de Projet Humanitaire",
    category: 'association',
    price: 5000,
    priceMax: 16000,
    description: "Rapport de clôture d'un projet humanitaire incluant le bilan des réalisations, la clôture financière et le transfert des acquis.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet",type:'text',required:true},
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'date_cloture',label:"Date de clôture",type:'date',required:true},
      {key:'bilan_realisations',label:"Bilan des réalisations",type:'textarea',required:true},
      {key:'bilan_financier',label:"Bilan financier",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CLOTURE DE PROJET HUMANITAIRE</h1><h2>{{titre_projet}}</h2><p><strong>ONG :</strong> {{nom_ong}} | <strong>Date de clôture :</strong> {{date_cloture}}</p><h3>1. Bilan des Realisations</h3><p>{{bilan_realisations}}</p><h3>2. Bilan Financier</h3><p>{{bilan_financier}}</p><h3>3. Transfert des Acquis</h3><p>Les équipements acquis dans le cadre du projet sont transférés aux structures bénéficiaires selon les termes de la convention de financement.</p></div>`
  },
  {
    code: 'ong2_accord_passation_pouvoirs',
    name: "Accord de Passation de Pouvoirs ONG",
    category: 'association',
    price: 4500,
    priceMax: 15000,
    description: "Accord de passation de pouvoirs entre dirigeants d'une ONG formalisant le transfert de responsabilités, d'archives et de ressources.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'dirigeant_sortant',label:"Dirigeant sortant",type:'text',required:true},
      {key:'dirigeant_entrant',label:"Dirigeant entrant",type:'text',required:true},
      {key:'date_passation',label:"Date de passation",type:'date',required:true},
      {key:'inventaire_ressources',label:"Inventaire des ressources transmises",type:'textarea',required:true},
      {key:'dossiers_en_cours',label:"Dossiers en cours",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PASSATION DE POUVOIRS ONG</h1><p>Entre <strong>{{dirigeant_sortant}}</strong> (sortant) et <strong>{{dirigeant_entrant}}</strong> (entrant)</p><p><strong>Date :</strong> {{date_passation}}</p><h3>1. Inventaire des Ressources</h3><p>{{inventaire_ressources}}</p><h3>2. Dossiers en Cours</h3><p>{{dossiers_en_cours}}</p><h3>3. Responsabilite</h3><p>La passation est certifiée conforme par les deux parties et le Conseil d'Administration de l'ONG.</p></div>`
  },
  {
    code: 'ong2_charte_humanitaire_sphere',
    name: "Charte Humanitaire Sphere",
    category: 'association',
    price: 4000,
    priceMax: 13000,
    description: "Charte humanitaire d'engagement d'une ONG aux principes du Manuel Sphere pour des interventions humanitaires de qualité et redevables.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'secteurs_intervention',label:"Secteurs d'intervention",type:'textarea',required:true},
      {key:'engagements_qualite',label:"Engagements qualité Sphere",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE HUMANITAIRE SPHERE</h1><h2>{{nom_ong}}</h2><p><strong>Date d'adoption :</strong> {{date_adoption}}</p><h3>1. Secteurs d'Intervention</h3><p>{{secteurs_intervention}}</p><h3>2. Engagements Qualite</h3><p>{{engagements_qualite}}</p><h3>3. Standards Sphere</h3><p>L'ONG s'engage à respecter les standards minimums Sphere dans les domaines de l'eau, l'assainissement, la sécurité alimentaire, la nutrition et l'abri.</p><h3>4. Redevabilite</h3><p>Des mécanismes de redevabilité envers les bénéficiaires sont mis en place et régulièrement évalués.</p></div>`
  },
  {
    code: 'ong2_code_conduite_cicr_adapte',
    name: "Code de Conduite CICR Adapte",
    category: 'association',
    price: 4000,
    priceMax: 13000,
    description: "Code de conduite adapté du Code de Conduite du CICR pour les ONG engagées dans la réponse aux catastrophes pour l'Afrique francophone.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'nom_ong',label:"Nom de l'ONG",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'contexte_operation',label:"Contexte d'opération",type:'text',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques additionnels",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CODE DE CONDUITE CICR ADAPTE</h1><h2>{{nom_ong}}</h2><p><strong>Date d'adoption :</strong> {{date_adoption}} | <strong>Contexte :</strong> {{contexte_operation}}</p><h3>Principe 1 - Humanite</h3><p>L'aide humanitaire sera fournie en premier lieu pour préserver la vie et la santé, et garantir le respect de l'être humain.</p><h3>Principe 2 - Priorite</h3><p>L'aide humanitaire aura la priorité sur les objectifs politiques, économiques ou militaires.</p><h3>Principe 3 - Non-Discrimination</h3><p>L'aide sera dispensée sans discrimination fondée sur la nationalité, la race, la religion, le sexe ou toute autre appartenance.</p><h3>Engagements Complementaires</h3><p>{{engagements_specifiques}}</p></div>`
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
  console.log(`Batch 38a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
