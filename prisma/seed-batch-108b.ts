import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── ENVIRONNEMENT / CHANGEMENT CLIMATIQUE CI (evn2_) ───
  {
    code: 'evn2_eie_ci', name: "Accord de service d'étude d'impact environnemental (EIE CI)", category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Accord encadrant la réalisation d'une étude d'impact environnemental conforme au droit ivoirien et aux normes OHADA.", templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_prestataire',label:"Nom du prestataire EIE",type:'text',required:true},
      {key:'nom_client',label:"Nom du maître d'ouvrage",type:'text',required:true},
      {key:'site_projet',label:"Site du projet",type:'text',required:true},
      {key:'date_debut',label:"Date de début des études",type:'date',required:true},
      {key:'duree_etude',label:"Durée de l'étude (mois)",type:'text',required:true},
      {key:'montant',label:"Montant du contrat (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ÉTUDE D'IMPACT ENVIRONNEMENTAL</h1><p>Entre <strong>{{nom_prestataire}}</strong> (prestataire) et <strong>{{nom_client}}</strong> (maître d'ouvrage), il est convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>Le prestataire s'engage à réaliser une étude d'impact environnemental (EIE) conforme au Code de l'Environnement ivoirien pour le projet situé à : {{site_projet}}.</p><h2>Article 2 — Durée</h2><p>L'étude débutera le {{date_debut}} et s'étendra sur {{duree_etude}} mois.</p><h2>Article 3 — Rémunération</h2><p>Le montant convenu est de {{montant}} FCFA, payable selon l'échéancier annexé.</p><h2>Article 4 — Obligations du prestataire</h2><p>Le prestataire remettra un rapport d'EIE complet, validé par les autorités compétentes, incluant plan de gestion environnementale et sociale (PGES).</p><h2>Article 5 — Droit applicable</h2><p>Le présent accord est soumis au droit ivoirien et aux Actes uniformes OHADA.</p></div>`
  },
  {
    code: 'evn2_audit_iso14001', name: "Accord de service d'audit environnemental ISO 14001", category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat de prestation pour audit environnemental selon la norme ISO 14001 applicable aux entreprises en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'auditeur',label:"Cabinet auditeur",type:'text',required:true},
      {key:'entreprise',label:"Entreprise auditée",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de l'audit",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — AUDIT ENVIRONNEMENTAL ISO 14001</h1><p>Entre <strong>{{auditeur}}</strong> (auditeur certifié) et <strong>{{entreprise}}</strong> (audité), il est convenu :</p><h2>Article 1 — Objet</h2><p>Réalisation d'un audit environnemental ISO 14001 portant sur : {{perimetre}}.</p><h2>Article 2 — Date d'intervention</h2><p>L'audit se déroulera à compter du {{date_audit}}.</p><h2>Article 3 — Honoraires</h2><p>Les honoraires s'élèvent à {{honoraires}} FCFA.</p><h2>Article 4 — Livrables</h2><p>Rapport d'audit, liste des non-conformités, plan d'actions correctives et recommandations.</p><h2>Article 5 — Confidentialité</h2><p>Les parties s'engagent à respecter la confidentialité des informations échangées.</p></div>`
  },
  {
    code: 'evn2_pges', name: "Accord de service de plan de gestion environnementale et sociale (PGES)", category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Accord de prestation pour l'élaboration et le suivi d'un plan de gestion environnementale et sociale (PGES) en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'consultant',label:"Consultant PGES",type:'text',required:true},
      {key:'promoteur',label:"Promoteur du projet",type:'text',required:true},
      {key:'projet',label:"Désignation du projet",type:'text',required:true},
      {key:'localisation',label:"Localisation",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'budget',label:"Budget PGES (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PLAN DE GESTION ENVIRONNEMENTALE ET SOCIALE</h1><p>Entre <strong>{{consultant}}</strong> et <strong>{{promoteur}}</strong>, pour le projet «{{projet}}» localisé à {{localisation}}, signé le {{date_signature}}.</p><h2>Article 1 — Objet</h2><p>Élaboration, mise en œuvre et suivi du PGES conformément aux exigences de l'ANASUR et des bailleurs internationaux.</p><h2>Article 2 — Contenu du PGES</h2><p>Identification des impacts, mesures d'atténuation, programme de surveillance et de suivi, budget de mise en œuvre.</p><h2>Article 3 — Budget</h2><p>Budget global : {{budget}} FCFA.</p><h2>Article 4 — Responsabilités</h2><p>Le consultant assure la coordination technique ; le promoteur assure les conditions d'accès au site et la disponibilité des informations.</p></div>`
  },
  {
    code: 'evn2_restauration_terres', name: "Accord de plan de restauration des terres dégradées (CI)", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Plan contractuel de restauration des terres dégradées conforme à la politique nationale de reboisement de la Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire restauration",type:'text',required:true},
      {key:'propriétaire',label:"Propriétaire des terres",type:'text',required:true},
      {key:'superficie',label:"Superficie à restaurer (ha)",type:'text',required:true},
      {key:'methodes',label:"Méthodes de restauration",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RESTAURATION DES TERRES DÉGRADÉES</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{propriétaire}}</strong>, il est convenu ce qui suit :</p><h2>Article 1 — Objet</h2><p>Restauration de {{superficie}} hectares de terres dégradées selon les techniques suivantes : {{methodes}}.</p><h2>Article 2 — Calendrier</h2><p>Début des travaux : {{date_debut}}. Les objectifs de restauration seront évalués annuellement.</p><h2>Article 3 — Obligations</h2><p>Reboisement, agroforesterie, stabilisation des sols, restauration hydrologique selon les normes SODEFOR.</p><h2>Article 4 — Suivi</h2><p>Un comité de suivi se réunit semestriellement pour évaluer l'avancement.</p></div>`
  },
  {
    code: 'evn2_lutte_inondations', name: "Accord de service de lutte contre les inondations (aménagement)", category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat de prestation pour l'aménagement anti-inondation dans les zones vulnérables de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise de génie civil",type:'text',required:true},
      {key:'commune',label:"Commune concernée",type:'text',required:true},
      {key:'zone',label:"Zone à aménager",type:'text',required:true},
      {key:'travaux',label:"Description des travaux",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true},
      {key:'cout',label:"Coût total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — LUTTE CONTRE LES INONDATIONS</h1><p>Entre <strong>{{entreprise}}</strong> et la commune de <strong>{{commune}}</strong> :</p><h2>Article 1 — Objet</h2><p>Aménagement de la zone {{zone}} en vue de réduire les risques d'inondation.</p><h2>Article 2 — Travaux prévus</h2><p>{{travaux}}</p><h2>Article 3 — Calendrier</h2><p>Début : {{date_debut}}. Durée maximale : 12 mois.</p><h2>Article 4 — Coût</h2><p>Montant total : {{cout}} FCFA, selon décomptes progressifs.</p><h2>Article 5 — Garanties</h2><p>Garantie biennale sur les ouvrages hydrauliques réalisés.</p></div>`
  },
  {
    code: 'evn2_zones_humides', name: "Accord de service de gestion des zones humides (mangroves CI)", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de gestion durable des zones humides côtières et des mangroves conformément à la Convention de Ramsar et au droit ivoirien.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'gestionnaire',label:"Organisme gestionnaire",type:'text',required:true},
      {key:'zone_humide',label:"Nom de la zone humide",type:'text',required:true},
      {key:'superficie',label:"Superficie (ha)",type:'text',required:true},
      {key:'actions',label:"Actions de gestion prévues",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES ZONES HUMIDES</h1><p>Entre <strong>{{gestionnaire}}</strong> et les autorités compétentes, pour la gestion de <strong>{{zone_humide}}</strong> ({{superficie}} ha).</p><h2>Article 1 — Objet</h2><p>Conservation et gestion durable des écosystèmes de zones humides, incluant les mangroves, conformément à la Convention de Ramsar.</p><h2>Article 2 — Actions de gestion</h2><p>{{actions}}</p><h2>Article 3 — Durée</h2><p>Accord de gestion de 5 ans à compter du {{date_debut}}, renouvelable.</p><h2>Article 4 — Financement</h2><p>Selon plan de financement annexé incluant fonds nationaux et appui international.</p></div>`
  },
  {
    code: 'evn2_secheresse', name: "Accord de service de prévention de la sécheresse (gestion eau)", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat de service pour la prévention et la gestion des risques de sécheresse, incluant gestion intégrée des ressources en eau.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire technique",type:'text',required:true},
      {key:'region',label:"Région concernée",type:'text',required:true},
      {key:'mesures',label:"Mesures préventives",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant',label:"Montant (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PRÉVENTION DE LA SÉCHERESSE</h1><p>Entre <strong>{{prestataire}}</strong> et les autorités de la région <strong>{{region}}</strong> :</p><h2>Article 1 — Objet</h2><p>Mise en place de mesures de prévention et de gestion des risques de sécheresse.</p><h2>Article 2 — Mesures prévues</h2><p>{{mesures}}</p><h2>Article 3 — Calendrier</h2><p>Intervention à compter du {{date_debut}}.</p><h2>Article 4 — Rémunération</h2><p>Montant : {{montant}} FCFA.</p></div>`
  },
  {
    code: 'evn2_nap_ci', name: "Accord de service d'adaptation au changement climatique (plan NAP CI)", category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Accord de prestation pour l'élaboration et la mise en œuvre du Plan National d'Adaptation (NAP) de la Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'consultant',label:"Cabinet conseil",type:'text',required:true},
      {key:'ministere',label:"Ministère partenaire",type:'text',required:true},
      {key:'secteurs',label:"Secteurs prioritaires",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'budget',label:"Budget (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD — PLAN NATIONAL D'ADAPTATION AU CHANGEMENT CLIMATIQUE (NAP)</h1><p>Entre <strong>{{consultant}}</strong> et le <strong>{{ministere}}</strong> :</p><h2>Article 1 — Objet</h2><p>Appui technique à l'élaboration et la mise en œuvre du NAP de la Côte d'Ivoire, couvrant les secteurs : {{secteurs}}.</p><h2>Article 2 — Calendrier</h2><p>Démarrage : {{date_debut}}. Durée du contrat : 24 mois.</p><h2>Article 3 — Budget</h2><p>Budget alloué : {{budget}} FCFA, conforme aux mécanismes de financement climatique international.</p><h2>Article 4 — Livrables</h2><p>Rapport de vulnérabilité, plan d'action sectoriel, mécanisme de suivi-évaluation.</p></div>`
  },
  {
    code: 'evn2_cdn_ci', name: "Accord de service de contribution nationalement déterminée (CDN CI)", category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Accord de prestation pour l'appui technique à la mise en œuvre de la Contribution Nationalement Déterminée (CDN) de la Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire technique",type:'text',required:true},
      {key:'institution',label:"Institution bénéficiaire",type:'text',required:true},
      {key:'axes_cdn',label:"Axes CDN couverts",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'financement',label:"Source de financement",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CONTRIBUTION NATIONALEMENT DÉTERMINÉE (CDN)</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{institution}}</strong>, pour l'appui à la mise en œuvre de la CDN de la Côte d'Ivoire.</p><h2>Article 1 — Objet</h2><p>Appui technique portant sur les axes suivants : {{axes_cdn}}.</p><h2>Article 2 — Durée</h2><p>Contrat démarrant le {{date_debut}}, durée 18 mois.</p><h2>Article 3 — Financement</h2><p>Financement assuré par : {{financement}}, conformément aux mécanismes de l'Accord de Paris.</p><h2>Article 4 — Livrables</h2><p>Rapport de mise en œuvre, indicateurs MRV, rapport destiné au secrétariat de la CCNUCC.</p></div>`
  },
  {
    code: 'evn2_ccnucc_local', name: "Accord de service de mise en œuvre de la CCNUCC au niveau local", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de prestation pour la déclinaison locale des engagements de la CCNUCC dans les collectivités de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'collectivite',label:"Collectivité territoriale",type:'text',required:true},
      {key:'actions_locales',label:"Actions locales prévues",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISE EN ŒUVRE LOCALE DE LA CCNUCC</h1><p>Entre <strong>{{prestataire}}</strong> et la collectivité de <strong>{{collectivite}}</strong> :</p><h2>Article 1 — Objet</h2><p>Déclinaison au niveau local des engagements de la Côte d'Ivoire au titre de la CCNUCC.</p><h2>Article 2 — Actions prévues</h2><p>{{actions_locales}}</p><h2>Article 3 — Durée</h2><p>Accord de 12 mois à compter du {{date_debut}}, renouvelable.</p></div>`
  },
  {
    code: 'evn2_partenariat_commune', name: "Accord de partenariat commune-État pour adaptation climatique", category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Convention de partenariat entre une commune ivoirienne et l'État pour la mise en œuvre de programmes d'adaptation climatique.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'commune',label:"Commune",type:'text',required:true},
      {key:'ministere',label:"Ministère partenaire",type:'text',required:true},
      {key:'programme',label:"Programme d'adaptation",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'duree',label:"Durée du partenariat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT COMMUNE-ÉTAT POUR L'ADAPTATION CLIMATIQUE</h1><p>Entre la commune de <strong>{{commune}}</strong> et le <strong>{{ministere}}</strong>, signé le {{date_signature}} :</p><h2>Article 1 — Objet</h2><p>Partenariat pour la mise en œuvre du programme suivant : {{programme}}.</p><h2>Article 2 — Durée</h2><p>{{duree}}.</p><h2>Article 3 — Engagements</h2><p>La commune met à disposition ses structures et son territoire ; l'État apporte le financement et l'expertise technique.</p><h2>Article 4 — Suivi</h2><p>Comité de pilotage trimestriel coprésidé par le Maire et le représentant du Ministère.</p></div>`
  },
  {
    code: 'evn2_dechets_solides', name: "Accord de service de gestion des déchets solides (collecte)", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat de prestation pour la collecte et la gestion des déchets solides urbains et péri-urbains en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur de collecte",type:'text',required:true},
      {key:'commune',label:"Commune desservie",type:'text',required:true},
      {key:'frequence',label:"Fréquence de collecte",type:'text',required:true},
      {key:'zones',label:"Zones couvertes",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'redevance',label:"Redevance mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — GESTION DES DÉCHETS SOLIDES</h1><p>Entre <strong>{{operateur}}</strong> et la commune de <strong>{{commune}}</strong> :</p><h2>Article 1 — Objet</h2><p>Collecte et évacuation des déchets solides ménagers et assimilés.</p><h2>Article 2 — Zones couvertes</h2><p>{{zones}}</p><h2>Article 3 — Fréquence</h2><p>Collecte : {{frequence}}.</p><h2>Article 4 — Redevance</h2><p>Redevance mensuelle : {{redevance}} FCFA, révisable annuellement.</p><h2>Article 5 — Durée</h2><p>Contrat de 3 ans à compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'evn2_tri_recyclage', name: "Accord de service de tri sélectif et recyclage", category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Contrat de prestation pour l'organisation du tri sélectif et du recyclage des déchets en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire recyclage",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'flux_dechets',label:"Types de déchets traités",type:'textarea',required:true},
      {key:'volume_mensuel',label:"Volume mensuel (tonnes)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TRI SÉLECTIF ET RECYCLAGE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 — Objet</h2><p>Organisation du tri sélectif et recyclage des flux suivants : {{flux_dechets}}.</p><h2>Article 2 — Volume</h2><p>Volume mensuel estimé : {{volume_mensuel}} tonnes.</p><h2>Article 3 — Durée</h2><p>Contrat de 2 ans à compter du {{date_debut}}, renouvelable.</p><h2>Article 4 — Traçabilité</h2><p>Le prestataire fournit mensuellement un bordereau de suivi de déchets (BSD).</p></div>`
  },
  {
    code: 'evn2_biogas', name: "Accord de service de valorisation énergétique des déchets (biogas)", category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat de prestation pour la valorisation énergétique des déchets organiques par production de biogaz en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire bioénergie",type:'text',required:true},
      {key:'producteur_dechets',label:"Producteur de déchets",type:'text',required:true},
      {key:'tonnage',label:"Tonnage annuel de déchets organiques",type:'text',required:true},
      {key:'production_energie',label:"Production d'énergie attendue (kWh)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VALORISATION ÉNERGÉTIQUE DES DÉCHETS — BIOGAS</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{producteur_dechets}}</strong> :</p><h2>Article 1 — Objet</h2><p>Collecte et valorisation énergétique par biométhanisation de {{tonnage}} tonnes/an de déchets organiques.</p><h2>Article 2 — Production attendue</h2><p>Production d'énergie estimée : {{production_energie}} kWh/an.</p><h2>Article 3 — Démarrage</h2><p>Date de démarrage opérationnel : {{date_debut}}.</p><h2>Article 4 — Partage des revenus</h2><p>Modalités de partage des revenus issus de la vente d'énergie définies en annexe.</p></div>`
  },
  {
    code: 'evn2_depollution_site', name: "Accord de service de dépollution d'un site industriel", category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Contrat de prestation spécialisée pour la dépollution d'un site industriel contaminé en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'prestataire',label:"Entreprise de dépollution",type:'text',required:true},
      {key:'proprietaire_site',label:"Propriétaire du site",type:'text',required:true},
      {key:'localisation_site',label:"Localisation du site",type:'text',required:true},
      {key:'polluants',label:"Types de polluants identifiés",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true},
      {key:'cout',label:"Coût des travaux (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DÉPOLLUTION DE SITE INDUSTRIEL</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{proprietaire_site}}</strong>, pour le site de {{localisation_site}} :</p><h2>Article 1 — Objet</h2><p>Travaux de dépollution visant les contaminants suivants : {{polluants}}.</p><h2>Article 2 — Normes applicables</h2><p>Les travaux respecteront les normes environnementales ivoiriennes et les directives EHS du Groupe Banque mondiale.</p><h2>Article 3 — Calendrier</h2><p>Début : {{date_debut}}. Durée estimée : 6 à 18 mois selon ampleur de la contamination.</p><h2>Article 4 — Coût</h2><p>Coût total estimatif : {{cout}} FCFA, révisable selon résultats des analyses de sols.</p><h2>Article 5 — Responsabilité</h2><p>Le prestataire engage sa responsabilité décennale sur les travaux de réhabilitation réalisés.</p></div>`
  },
  {
    code: 'evn2_demantelement_site', name: "Accord de service de démantèlement d'un site pollué", category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Contrat de démantèlement et de mise hors service d'un site industriel pollué conformément au droit ivoirien.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prestataire',label:"Entreprise de démantèlement",type:'text',required:true},
      {key:'donneur_ordre',label:"Donneur d'ordre",type:'text',required:true},
      {key:'site',label:"Identification du site",type:'text',required:true},
      {key:'operations',label:"Opérations de démantèlement",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DÉMANTÈLEMENT DE SITE POLLUÉ</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{donneur_ordre}}</strong>, pour le site : {{site}}.</p><h2>Article 1 — Objet</h2><p>Démantèlement, décontamination et mise hors service sécurisée du site.</p><h2>Article 2 — Opérations prévues</h2><p>{{operations}}</p><h2>Article 3 — Démarrage</h2><p>Début des opérations : {{date_debut}}.</p><h2>Article 4 — Gestion des déchets</h2><p>Tous les déchets dangereux issus du démantèlement seront traités conformément aux conventions internationales ratifiées par la Côte d'Ivoire.</p></div>`
  },
  {
    code: 'evn2_rehabilitation_carriere', name: "Accord de service de remise en état d'une carrière (réhabilitation)", category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Accord de prestation pour la réhabilitation et la remise en état d'une carrière exploitée en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire réhabilitation",type:'text',required:true},
      {key:'exploitant',label:"Exploitant de la carrière",type:'text',required:true},
      {key:'localisation',label:"Localisation de la carrière",type:'text',required:true},
      {key:'plan_rehabilitation',label:"Plan de réhabilitation",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉHABILITATION DE CARRIÈRE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{exploitant}}</strong>, pour la carrière de {{localisation}} :</p><h2>Article 1 — Objet</h2><p>Remise en état du site de la carrière conformément au plan de réhabilitation approuvé.</p><h2>Article 2 — Plan de réhabilitation</h2><p>{{plan_rehabilitation}}</p><h2>Article 3 — Calendrier</h2><p>Début des travaux : {{date_debut}}. Durée : 12 à 36 mois.</p><h2>Article 4 — Obligations réglementaires</h2><p>Conformité avec le Code minier ivoirien et le cahier des charges environnemental.</p></div>`
  },
  {
    code: 'evn2_qualite_air', name: "Accord de service de surveillance de la qualité de l'air", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat de prestation pour le suivi et la surveillance de la qualité de l'air en zones industrielles ou urbaines de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'laboratoire',label:"Laboratoire de surveillance",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'sites_mesure',label:"Sites de mesure",type:'textarea',required:true},
      {key:'parametres',label:"Paramètres surveillés",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SURVEILLANCE DE LA QUALITÉ DE L'AIR</h1><p>Entre <strong>{{laboratoire}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 — Objet</h2><p>Surveillance continue et périodique de la qualité de l'air sur les sites : {{sites_mesure}}.</p><h2>Article 2 — Paramètres</h2><p>Paramètres mesurés : {{parametres}}.</p><h2>Article 3 — Durée</h2><p>Contrat annuel à compter du {{date_debut}}, renouvelable.</p><h2>Article 4 — Rapports</h2><p>Rapport mensuel de surveillance transmis au client et aux autorités compétentes.</p></div>`
  },
  {
    code: 'evn2_qualite_sols', name: "Accord de service de surveillance de la qualité des sols", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat de prestation pour la surveillance et l'analyse de la qualité des sols agricoles et industriels en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'laboratoire',label:"Laboratoire d'analyse",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'parcelles',label:"Parcelles ou zones à surveiller",type:'textarea',required:true},
      {key:'frequence',label:"Fréquence d'analyse",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SURVEILLANCE DE LA QUALITÉ DES SOLS</h1><p>Entre <strong>{{laboratoire}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 — Objet</h2><p>Analyse et surveillance de la qualité physico-chimique et biologique des sols des zones : {{parcelles}}.</p><h2>Article 2 — Fréquence</h2><p>{{frequence}}.</p><h2>Article 3 — Durée</h2><p>Contrat de 2 ans à compter du {{date_debut}}.</p><h2>Article 4 — Livrables</h2><p>Fiches d'analyse, carte de fertilité des sols, recommandations agronomiques.</p></div>`
  },
  {
    code: 'evn2_qualite_eaux', name: "Accord de service de surveillance de la qualité des eaux de surface", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat de surveillance de la qualité des eaux de surface (rivières, lacs, lagunes) en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'laboratoire',label:"Laboratoire",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'points_prelevement',label:"Points de prélèvement",type:'textarea',required:true},
      {key:'parametres',label:"Paramètres analysés",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SURVEILLANCE DE LA QUALITÉ DES EAUX DE SURFACE</h1><p>Entre <strong>{{laboratoire}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 — Objet</h2><p>Surveillance de la qualité des eaux de surface aux points : {{points_prelevement}}.</p><h2>Article 2 — Paramètres</h2><p>Analyses portant sur : {{parametres}}.</p><h2>Article 3 — Durée</h2><p>Contrat de 2 ans à compter du {{date_debut}}.</p><h2>Article 4 — Conformité</h2><p>Les analyses respectent les normes ivoiriennes et les directives OMS.</p></div>`
  },
  {
    code: 'evn2_education_env', name: "Accord de service d'éducation environnementale (sensibilisation)", category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Contrat de prestation pour des campagnes d'éducation et de sensibilisation environnementale en Côte d'Ivoire.", templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire sensibilisation",type:'text',required:true},
      {key:'beneficiaire',label:"Bénéficiaire",type:'text',required:true},
      {key:'thematiques',label:"Thématiques de sensibilisation",type:'textarea',required:true},
      {key:'public_cible',label:"Public cible",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ÉDUCATION ENVIRONNEMENTALE ET DE SENSIBILISATION</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{beneficiaire}}</strong> :</p><h2>Article 1 — Objet</h2><p>Réalisation de campagnes d'éducation environnementale sur les thématiques : {{thematiques}}, à destination de : {{public_cible}}.</p><h2>Article 2 — Méthodes</h2><p>Ateliers participatifs, supports pédagogiques, interventions en milieu scolaire et communautaire.</p><h2>Article 3 — Durée</h2><p>Programme de 6 mois démarrant le {{date_debut}}.</p></div>`
  },
  {
    code: 'evn2_partenariat_ong', name: "Accord de partenariat ONG-CI pour projet climatique", category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Convention de partenariat entre une ONG internationale ou nationale et la Côte d'Ivoire pour la mise en œuvre d'un projet climatique.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'ong',label:"ONG partenaire",type:'text',required:true},
      {key:'entite_ci',label:"Entité ivoirienne partenaire",type:'text',required:true},
      {key:'projet',label:"Nom du projet climatique",type:'text',required:true},
      {key:'zones_intervention',label:"Zones d'intervention",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ONG-CÔTE D'IVOIRE POUR PROJET CLIMATIQUE</h1><p>Entre <strong>{{ong}}</strong> et <strong>{{entite_ci}}</strong>, pour le projet «{{projet}}» :</p><h2>Article 1 — Objet</h2><p>Partenariat pour la mise en œuvre dudit projet dans les zones : {{zones_intervention}}.</p><h2>Article 2 — Durée</h2><p>Accord valable à compter du {{date_debut}}, durée selon plan de projet.</p><h2>Article 3 — Budget</h2><p>Budget total : {{budget_total}} FCFA, géré selon les procédures de l'ONG et des bailleurs de fonds.</p><h2>Article 4 — Gouvernance</h2><p>Comité de pilotage paritaire, rapports trimestriels, audit annuel indépendant.</p></div>`
  },
  {
    code: 'evn2_bilan_env', name: "Rapport de bilan environnemental", category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Modèle de rapport de bilan environnemental annuel pour les entreprises et institutions en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise ou institution",type:'text',required:true},
      {key:'annee',label:"Année du bilan",type:'text',required:true},
      {key:'responsable',label:"Responsable environnement",type:'text',required:true},
      {key:'indicateurs',label:"Principaux indicateurs environnementaux",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE BILAN ENVIRONNEMENTAL — {{annee}}</h1><p>Établi par <strong>{{responsable}}</strong> pour <strong>{{entreprise}}</strong>, le {{date_rapport}}.</p><h2>1. Introduction</h2><p>Le présent bilan recense les performances environnementales de l'entité pour l'année {{annee}}.</p><h2>2. Indicateurs clés</h2><p>{{indicateurs}}</p><h2>3. Analyse et tendances</h2><p>Analyse des progrès accomplis par rapport aux objectifs fixés et identification des axes d'amélioration.</p><h2>4. Plan d'action</h2><p>Mesures correctives et nouvelles initiatives environnementales pour la prochaine période.</p></div>`
  },
  {
    code: 'evn2_plan_action_env', name: "Plan d'action environnement", category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Document structuré de plan d'action environnemental pour les entreprises opérant en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'responsable',label:"Responsable du plan",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'objectifs',label:"Objectifs environnementaux",type:'textarea',required:true},
      {key:'date_approbation',label:"Date d'approbation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN D'ACTION ENVIRONNEMENT</h1><p>Élaboré par <strong>{{responsable}}</strong> pour <strong>{{entreprise}}</strong>, approuvé le {{date_approbation}}, couvrant la période : {{periode}}.</p><h2>1. Contexte et enjeux</h2><p>Description des enjeux environnementaux spécifiques à l'activité de l'entreprise.</p><h2>2. Objectifs</h2><p>{{objectifs}}</p><h2>3. Actions et responsables</h2><p>Tableau d'actions avec responsables, délais et indicateurs de suivi.</p><h2>4. Budget</h2><p>Budget alloué à chaque action selon tableau annexé.</p><h2>5. Suivi et évaluation</h2><p>Revue trimestrielle du plan par la direction générale.</p></div>`
  },
  {
    code: 'evn2_charte_entreprise', name: "Charte de l'entreprise engagée pour l'environnement en Afrique", category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Charte d'engagement environnemental pour les entreprises opérant en Afrique francophone, conforme aux normes RSE et ISO 26000.", templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'dirigeant',label:"Nom du dirigeant",type:'text',required:true},
      {key:'secteur',label:"Secteur d'activité",type:'text',required:true},
      {key:'engagements',label:"Engagements environnementaux clés",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ENTREPRISE ENGAGÉE POUR L'ENVIRONNEMENT</h1><p><strong>{{entreprise}}</strong>, représentée par <strong>{{dirigeant}}</strong>, opérant dans le secteur {{secteur}}, adopte la présente charte le {{date_signature}}.</p><h2>Préambule</h2><p>Consciente de sa responsabilité envers l'environnement et les générations futures, l'entreprise s'engage à intégrer les principes du développement durable dans toutes ses activités.</p><h2>Nos engagements</h2><p>{{engagements}}</p><h2>Mise en œuvre</h2><p>Un rapport annuel public rendra compte de la mise en œuvre de la présente charte.</p><p>Signé à Abidjan, le {{date_signature}}</p><p><strong>{{dirigeant}}</strong></p></div>`
  },
  // ─── BIODIVERSITÉ / CONSERVATION (bio4_) ───
  {
    code: 'bio4_aire_protegee', name: "Accord de service de gestion d'une aire protégée (parc national CI)", category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Accord de délégation de gestion d'une aire protégée (parc national, réserve) en Côte d'Ivoire conforme à la loi sur les aires protégées.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'gestionnaire',label:"Organisme gestionnaire",type:'text',required:true},
      {key:'aire_protegee',label:"Nom de l'aire protégée",type:'text',required:true},
      {key:'superficie',label:"Superficie (ha)",type:'text',required:true},
      {key:'missions',label:"Missions de gestion",type:'textarea',required:true},
      {key:'date_debut',label:"Date de prise en charge",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION D'AIRE PROTÉGÉE</h1><p>Entre l'État de Côte d'Ivoire et <strong>{{gestionnaire}}</strong>, pour la gestion de <strong>{{aire_protegee}}</strong> ({{superficie}} ha) :</p><h2>Article 1 — Objet</h2><p>Délégation de gestion de l'aire protégée conformément à la loi ivoirienne sur la faune et la flore sauvages.</p><h2>Article 2 — Missions</h2><p>{{missions}}</p><h2>Article 3 — Durée</h2><p>Accord de gestion de 5 ans à compter du {{date_debut}}, renouvelable.</p><h2>Article 4 — Obligations</h2><p>Plan de gestion quinquennal, rapports annuels, respect des conventions CITES et CBD.</p></div>`
  },
  {
    code: 'bio4_especes_menacees', name: "Accord de service de conservation des espèces menacées (faune CI)", category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Accord de prestation pour la conservation des espèces fauniques menacées en Côte d'Ivoire, conforme à la CITES.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'prestataire',label:"Organisation de conservation",type:'text',required:true},
      {key:'especes',label:"Espèces ciblées",type:'textarea',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'actions',label:"Actions de conservation",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSERVATION DES ESPÈCES MENACÉES</h1><p>Entre <strong>{{prestataire}}</strong> et l'État de Côte d'Ivoire, pour la zone de {{zone_intervention}} :</p><h2>Article 1 — Espèces ciblées</h2><p>{{especes}}</p><h2>Article 2 — Actions</h2><p>{{actions}}</p><h2>Article 3 — Durée</h2><p>Programme de conservation de 3 ans démarrant le {{date_debut}}.</p><h2>Article 4 — Conformité</h2><p>Toutes les activités respectent la CITES et la législation ivoirienne sur la faune sauvage.</p></div>`
  },
  {
    code: 'bio4_elephants_ci', name: "Accord de service de suivi des populations d'éléphants (CI)", category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Contrat de prestation pour le suivi scientifique des populations d'éléphants de forêt en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'equipe_scientifique',label:"Équipe scientifique",type:'text',required:true},
      {key:'zone_etude',label:"Zone d'étude",type:'text',required:true},
      {key:'methodologie',label:"Méthodologie de suivi",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'financement',label:"Source de financement",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SUIVI DES POPULATIONS D'ÉLÉPHANTS</h1><p>Entre <strong>{{equipe_scientifique}}</strong> et les autorités ivoiriennes de conservation, pour la zone de {{zone_etude}} :</p><h2>Article 1 — Objet</h2><p>Suivi scientifique et monitoring des populations d'éléphants de forêt (Loxodonta cyclotis).</p><h2>Article 2 — Méthodologie</h2><p>{{methodologie}}</p><h2>Article 3 — Durée</h2><p>Programme de 3 ans démarrant le {{date_debut}}.</p><h2>Article 4 — Financement</h2><p>Financé par : {{financement}}.</p><h2>Article 5 — Partage des données</h2><p>Les données collectées sont propriété partagée entre l'équipe scientifique et l'État ivoirien.</p></div>`
  },
  {
    code: 'bio4_antibraconnage', name: "Accord de service de lutte contre le braconnage (ONG)", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Convention de partenariat pour la lutte anti-braconnage dans les aires protégées de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'ong',label:"ONG anti-braconnage",type:'text',required:true},
      {key:'aire_protegee',label:"Aire protégée concernée",type:'text',required:true},
      {key:'effectif_rangers',label:"Effectif d'écogardes",type:'text',required:true},
      {key:'equipements',label:"Équipements fournis",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LUTTE CONTRE LE BRACONNAGE</h1><p>Entre <strong>{{ong}}</strong> et l'administration de <strong>{{aire_protegee}}</strong> :</p><h2>Article 1 — Objet</h2><p>Renforcement des capacités de lutte anti-braconnage avec {{effectif_rangers}} écogardes.</p><h2>Article 2 — Équipements</h2><p>{{equipements}}</p><h2>Article 3 — Durée</h2><p>Programme de 2 ans démarrant le {{date_debut}}.</p><h2>Article 4 — Coordination</h2><p>Coordination avec les forces de l'ordre ivoiriennes (FRCI, douanes, eaux et forêts).</p></div>`
  },
  {
    code: 'bio4_ressources_marines', name: "Accord de service de gestion des ressources marines (OROP)", category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Accord de gestion durable des ressources marines dans le cadre des Organisations Régionales de Pêche (OROP) en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'gestionnaire',label:"Organisme gestionnaire",type:'text',required:true},
      {key:'zone_marine',label:"Zone marine concernée",type:'text',required:true},
      {key:'especes_cibles',label:"Espèces cibles",type:'text',required:true},
      {key:'mesures_gestion',label:"Mesures de gestion",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES RESSOURCES MARINES</h1><p>Entre <strong>{{gestionnaire}}</strong> et les autorités maritimes ivoiriennes, pour la zone de {{zone_marine}} :</p><h2>Article 1 — Espèces et ressources</h2><p>Gestion durable de : {{especes_cibles}}.</p><h2>Article 2 — Mesures de gestion</h2><p>{{mesures_gestion}}</p><h2>Article 3 — Durée</h2><p>Accord de 5 ans à compter du {{date_debut}}.</p><h2>Article 4 — Cadre international</h2><p>Conformité avec la CNUDM et les instruments des OROP compétentes.</p></div>`
  },
  {
    code: 'bio4_tortues_marines', name: "Accord de service de conservation des tortues marines (CI)", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de prestation pour la protection et le suivi des tortues marines sur le littoral ivoirien.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'equipe',label:"Équipe de conservation",type:'text',required:true},
      {key:'plages',label:"Plages de nidification concernées",type:'textarea',required:true},
      {key:'especes',label:"Espèces de tortues marines",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la saison",type:'date',required:true},
      {key:'budget',label:"Budget (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSERVATION DES TORTUES MARINES</h1><p>Entre <strong>{{equipe}}</strong> et l'administration des pêches de Côte d'Ivoire :</p><h2>Article 1 — Espèces protégées</h2><p>Protection des espèces : {{especes}} sur les plages de nidification : {{plages}}.</p><h2>Article 2 — Programme de conservation</h2><p>Surveillance nocturne des plages, marquage des femelles, protection des nids, sensibilisation des communautés locales.</p><h2>Article 3 — Saison</h2><p>Programme démarrant le {{date_debut}}.</p><h2>Article 4 — Budget</h2><p>Budget : {{budget}} FCFA.</p></div>`
  },
  {
    code: 'bio4_halieutique_amp', name: "Accord de service de gestion des ressources halieutiques (AMP)", category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Accord de gestion des ressources halieutiques dans les Aires Marines Protégées (AMP) de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'gestionnaire',label:"Gestionnaire de l'AMP",type:'text',required:true},
      {key:'amp',label:"Nom de l'AMP",type:'text',required:true},
      {key:'superficie',label:"Superficie marine (km²)",type:'text',required:true},
      {key:'regles_acces',label:"Règles d'accès et de pêche",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES RESSOURCES HALIEUTIQUES EN AIRE MARINE PROTÉGÉE</h1><p>Entre <strong>{{gestionnaire}}</strong> et les communautés de pêcheurs riverains de <strong>{{amp}}</strong> ({{superficie}} km²) :</p><h2>Article 1 — Règles d'accès</h2><p>{{regles_acces}}</p><h2>Article 2 — Suivi</h2><p>Monitoring trimestriel des stocks halieutiques et de la pression de pêche.</p><h2>Article 3 — Durée</h2><p>Accord de gestion de 5 ans à compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'bio4_primates_ci', name: "Accord de service de conservation des primates (chimpanzé CI)", category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Programme de conservation des primates, notamment le chimpanzé de l'Ouest (Pan troglodytes verus), en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'organisation',label:"Organisation de conservation",type:'text',required:true},
      {key:'forets_cibles',label:"Forêts cibles",type:'textarea',required:true},
      {key:'methodologie',label:"Méthodologie de suivi",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'financement',label:"Financement",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSERVATION DES PRIMATES — CHIMPANZÉ</h1><p>Entre <strong>{{organisation}}</strong> et l'Office Ivoirien des Parcs et Réserves :</p><h2>Article 1 — Zones d'intervention</h2><p>Conservation des populations de chimpanzés dans : {{forets_cibles}}.</p><h2>Article 2 — Méthodologie</h2><p>{{methodologie}}</p><h2>Article 3 — Durée</h2><p>Programme de 5 ans démarrant le {{date_debut}}.</p><h2>Article 4 — Financement</h2><p>Financé par : {{financement}}, avec cofinancement ivoirien.</p></div>`
  },
  {
    code: 'bio4_foret_sacree', name: "Accord de service de gestion de la forêt sacrée (tradition)", category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Convention de gestion collaborative d'une forêt sacrée alliant tradition locale et conservation de la biodiversité en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'communaute',label:"Communauté gardienne",type:'text',required:true},
      {key:'autorite_traditionnelle',label:"Autorité traditionnelle",type:'text',required:true},
      {key:'foret',label:"Nom de la forêt sacrée",type:'text',required:true},
      {key:'superficie',label:"Superficie estimée (ha)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE GESTION DE FORÊT SACRÉE</h1><p>Entre la communauté de <strong>{{communaute}}</strong> représentée par <strong>{{autorite_traditionnelle}}</strong> et les services des Eaux et Forêts, pour la forêt sacrée de <strong>{{foret}}</strong> ({{superficie}} ha).</p><h2>Article 1 — Reconnaissance</h2><p>L'État ivoirien reconnaît le rôle de la communauté dans la conservation de la forêt sacrée.</p><h2>Article 2 — Règles de gestion</h2><p>Maintien des règles coutumières d'accès et d'utilisation de la forêt, complétées par les normes nationales de conservation.</p><h2>Article 3 — Durée</h2><p>Convention signée le {{date_signature}}, d'une durée indéterminée.</p></div>`
  },
  {
    code: 'bio4_ecotourisme', name: "Accord de service d'écotourisme de nature (observation faune)", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de prestation pour le développement de l'écotourisme de nature dans les aires protégées de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur écotouristique",type:'text',required:true},
      {key:'aire_protegee',label:"Aire protégée",type:'text',required:true},
      {key:'activites',label:"Activités proposées",type:'textarea',required:true},
      {key:'capacite',label:"Capacité d'accueil (visiteurs/jour)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ÉCOTOURISME DE NATURE</h1><p>Entre <strong>{{operateur}}</strong> et l'administration de <strong>{{aire_protegee}}</strong> :</p><h2>Article 1 — Activités autorisées</h2><p>{{activites}}</p><h2>Article 2 — Capacité de charge</h2><p>Capacité maximale : {{capacite}} visiteurs/jour, afin de prévenir toute perturbation des écosystèmes.</p><h2>Article 3 — Durée</h2><p>Concession écotouristique de 5 ans à compter du {{date_debut}}.</p><h2>Article 4 — Rétrocession</h2><p>30% des recettes reversées à la caisse de gestion de l'aire protégée.</p></div>`
  },
  {
    code: 'bio4_bioprospection', name: "Accord de service de bioprospection (accès ressources génétiques)", category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Accord d'accès aux ressources génétiques et au savoir traditionnel associé, conforme au Protocole de Nagoya et au droit ivoirien.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'chercheur',label:"Institution de recherche",type:'text',required:true},
      {key:'autorite_nationale',label:"Autorité nationale compétente CI",type:'text',required:true},
      {key:'ressources',label:"Ressources génétiques visées",type:'textarea',required:true},
      {key:'objectif_recherche',label:"Objectif de la recherche",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACCÈS AUX RESSOURCES GÉNÉTIQUES — BIOPROSPECTION</h1><p>Entre <strong>{{chercheur}}</strong> et <strong>{{autorite_nationale}}</strong>, conclu le {{date_accord}} :</p><h2>Article 1 — Ressources concernées</h2><p>{{ressources}}</p><h2>Article 2 — Objectif</h2><p>{{objectif_recherche}}</p><h2>Article 3 — Conformité</h2><p>Accord conforme au Protocole de Nagoya sur l'accès aux ressources génétiques et le partage juste et équitable des avantages (APA).</p><h2>Article 4 — Partage des avantages</h2><p>Modalités de partage des avantages monétaires et non monétaires définies en annexe.</p></div>`
  },
  {
    code: 'bio4_nagoya_ci', name: "Accord de service de partage des avantages (protocole Nagoya CI)", category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Convention de partage juste et équitable des avantages découlant de l'utilisation des ressources génétiques, conforme au Protocole de Nagoya ratifié par la Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur de ressources génétiques",type:'text',required:true},
      {key:'utilisateur',label:"Utilisateur des ressources",type:'text',required:true},
      {key:'ressources',label:"Ressources génétiques concernées",type:'textarea',required:true},
      {key:'avantages',label:"Avantages à partager",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTAGE DES AVANTAGES — PROTOCOLE DE NAGOYA</h1><p>Entre <strong>{{fournisseur}}</strong> (fournisseur) et <strong>{{utilisateur}}</strong> (utilisateur), conclu le {{date_accord}} :</p><h2>Article 1 — Ressources concernées</h2><p>{{ressources}}</p><h2>Article 2 — Avantages à partager</h2><p>{{avantages}}</p><h2>Article 3 — Mécanisme APA</h2><p>Accord enregistré auprès du Centre d'Échange APA (CHM) conformément au Protocole de Nagoya.</p><h2>Article 4 — Droit applicable</h2><p>Droit ivoirien sur l'accès aux ressources biologiques et le droit international applicable.</p></div>`
  },
  {
    code: 'bio4_conservation_ex_situ', name: "Accord de service de conservation ex situ (zoo, banque de graines)", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de prestation pour la conservation ex situ d'espèces menacées (zoologiques, banques de graines, cultures in vitro) en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'institution',label:"Institution de conservation ex situ",type:'text',required:true},
      {key:'partenaire',label:"Partenaire fournisseur",type:'text',required:true},
      {key:'especes',label:"Espèces ou variétés conservées",type:'textarea',required:true},
      {key:'methode',label:"Méthode de conservation",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSERVATION EX SITU</h1><p>Entre <strong>{{institution}}</strong> et <strong>{{partenaire}}</strong> :</p><h2>Article 1 — Espèces/variétés concernées</h2><p>{{especes}}</p><h2>Article 2 — Méthode</h2><p>Conservation par : {{methode}}.</p><h2>Article 3 — Durée</h2><p>Programme de conservation démarrant le {{date_debut}}, durée indéterminée.</p><h2>Article 4 — Accès et utilisation</h2><p>Accès aux ressources génétiques conservées régi par le Protocole de Nagoya et la législation ivoirienne.</p></div>`
  },
  {
    code: 'bio4_restauration_eco', name: "Accord de service de restauration d'écosystèmes dégradés", category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Accord de prestation pour la restauration écologique d'écosystèmes forestiers et humides dégradés en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire restauration écologique",type:'text',required:true},
      {key:'client',label:"Client ou maître d'ouvrage",type:'text',required:true},
      {key:'ecosysteme',label:"Type d'écosystème à restaurer",type:'text',required:true},
      {key:'superficie',label:"Superficie (ha)",type:'text',required:true},
      {key:'techniques',label:"Techniques de restauration",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RESTAURATION D'ÉCOSYSTÈMES DÉGRADÉS</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p><h2>Article 1 — Objet</h2><p>Restauration de {{superficie}} ha d'écosystème de type : {{ecosysteme}}.</p><h2>Article 2 — Techniques utilisées</h2><p>{{techniques}}</p><h2>Article 3 — Durée</h2><p>Travaux démarrant le {{date_debut}}, suivi de 5 ans.</p><h2>Article 4 — Indicateurs de succès</h2><p>Taux de survie des plants, couverture végétale, retour de la faune indicatrice.</p></div>`
  },
  {
    code: 'bio4_suivi_biodiversite', name: "Accord de service de suivi de la biodiversité (indices IKI)", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de prestation pour le suivi et l'évaluation de la biodiversité par indices (IKI, IBT, IBES) en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'equipe_scientifique',label:"Équipe scientifique",type:'text',required:true},
      {key:'commanditaire',label:"Commanditaire",type:'text',required:true},
      {key:'sites',label:"Sites de suivi",type:'textarea',required:true},
      {key:'indices',label:"Indices de biodiversité utilisés",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SUIVI DE LA BIODIVERSITÉ</h1><p>Entre <strong>{{equipe_scientifique}}</strong> et <strong>{{commanditaire}}</strong> :</p><h2>Article 1 — Sites de suivi</h2><p>{{sites}}</p><h2>Article 2 — Indices utilisés</h2><p>{{indices}}</p><h2>Article 3 — Durée</h2><p>Programme de suivi démarrant le {{date_debut}}, pour une durée de 3 ans minimum.</p><h2>Article 4 — Livrables</h2><p>Rapport annuel de biodiversité, base de données partagée, recommandations de gestion.</p></div>`
  },
  {
    code: 'bio4_cartographie_sig', name: "Accord de service de cartographie de la biodiversité (SIG)", category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Accord de prestation pour la cartographie de la biodiversité par Systèmes d'Information Géographique (SIG) en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'bureau_sig',label:"Bureau SIG/cartographie",type:'text',required:true},
      {key:'commanditaire',label:"Commanditaire",type:'text',required:true},
      {key:'zone_cartographiee',label:"Zone à cartographier",type:'text',required:true},
      {key:'couches_sig',label:"Couches SIG requises",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CARTOGRAPHIE DE LA BIODIVERSITÉ PAR SIG</h1><p>Entre <strong>{{bureau_sig}}</strong> et <strong>{{commanditaire}}</strong> :</p><h2>Article 1 — Zone</h2><p>Cartographie SIG de : {{zone_cartographiee}}.</p><h2>Article 2 — Couches thématiques</h2><p>{{couches_sig}}</p><h2>Article 3 — Livraison</h2><p>Livraison des cartes et bases de données géospatiales au plus tard le {{date_livraison}}.</p><h2>Article 4 — Formats</h2><p>Livrables en formats shapefile, GeoTIFF, et rapport cartographique imprimable.</p></div>`
  },
  {
    code: 'bio4_partenariat_conservatoire', name: "Accord de convention de partenariat État-conservatoire", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Convention de partenariat entre l'État de Côte d'Ivoire et un conservatoire botanique ou zoologique pour la conservation de la biodiversité.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'conservatoire',label:"Nom du conservatoire",type:'text',required:true},
      {key:'ministere',label:"Ministère partenaire",type:'text',required:true},
      {key:'missions',label:"Missions conjointes",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'duree',label:"Durée de la convention",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT ÉTAT-CONSERVATOIRE</h1><p>Entre l'État de Côte d'Ivoire représenté par le <strong>{{ministere}}</strong> et <strong>{{conservatoire}}</strong>, signé le {{date_signature}} :</p><h2>Article 1 — Missions conjointes</h2><p>{{missions}}</p><h2>Article 2 — Durée</h2><p>{{duree}}.</p><h2>Article 3 — Ressources</h2><p>Mise en commun de ressources humaines, matérielles et financières selon annexe budgétaire.</p><h2>Article 4 — Gouvernance</h2><p>Comité de suivi conjoint se réunissant semestriellement.</p></div>`
  },
  {
    code: 'bio4_formation_rangers', name: "Accord de service de formation écogardes (ranger)", category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Accord de prestation pour la formation et le renforcement des capacités des écogardes (rangers) en Côte d'Ivoire.", templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'beneficiaire',label:"Administration bénéficiaire",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'modules',label:"Modules de formation",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION DES ÉCOGARDES</h1><p>Entre <strong>{{organisme_formation}}</strong> et <strong>{{beneficiaire}}</strong> :</p><h2>Article 1 — Objet</h2><p>Formation de {{nombre_stagiaires}} écogardes (rangers) aux techniques de conservation et de surveillance.</p><h2>Article 2 — Modules</h2><p>{{modules}}</p><h2>Article 3 — Durée</h2><p>Formation démarrant le {{date_debut}}, durée minimale 3 semaines.</p><h2>Article 4 — Certification</h2><p>Attestation de formation délivrée à l'issue du programme.</p></div>`
  },
  {
    code: 'bio4_especes_invasives', name: "Accord de service de sensibilisation aux espèces invasives", category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Programme de sensibilisation et de lutte contre les espèces exotiques envahissantes en Côte d'Ivoire.", templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de sensibilisation",type:'text',required:true},
      {key:'public_cible',label:"Public cible",type:'text',required:true},
      {key:'especes_cibles',label:"Espèces invasives ciblées",type:'textarea',required:true},
      {key:'zones',label:"Zones d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SENSIBILISATION AUX ESPÈCES INVASIVES</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{public_cible}}</strong>, pour les zones de {{zones}} :</p><h2>Article 1 — Espèces ciblées</h2><p>{{especes_cibles}}</p><h2>Article 2 — Actions</h2><p>Ateliers de sensibilisation, matériel d'identification, formation aux techniques de contrôle et d'éradication.</p><h2>Article 3 — Durée</h2><p>Programme de 6 mois démarrant le {{date_debut}}.</p></div>`
  },
  {
    code: 'bio4_feux_brousse', name: "Accord de service de gestion des feux de brousse", category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Accord de prestation pour la prévention et la gestion des feux de brousse dans les zones rurales et forestières de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire technique",type:'text',required:true},
      {key:'autorite_locale',label:"Autorité locale",type:'text',required:true},
      {key:'zones_intervention',label:"Zones d'intervention",type:'textarea',required:true},
      {key:'plan_prevoyance',label:"Mesures préventives",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES FEUX DE BROUSSE</h1><p>Entre <strong>{{prestataire}}</strong> et <strong>{{autorite_locale}}</strong> :</p><h2>Article 1 — Zones concernées</h2><p>{{zones_intervention}}</p><h2>Article 2 — Mesures préventives</h2><p>{{plan_prevoyance}}</p><h2>Article 3 — Protocole d'intervention</h2><p>Brigades de lutte contre les incendies, pare-feux, sensibilisation des communautés pastorales et agricoles.</p><h2>Article 4 — Durée</h2><p>Programme annuel démarrant le {{date_debut}}, reconductible.</p></div>`
  },
  {
    code: 'bio4_partenariat_uicn', name: "Accord de partenariat CI-UICN (liste rouge)", category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Convention de partenariat entre la Côte d'Ivoire et l'UICN pour la mise à jour et l'utilisation de la Liste rouge des espèces menacées.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'institution_ci',label:"Institution ivoirienne partenaire",type:'text',required:true},
      {key:'objectifs',label:"Objectifs du partenariat",type:'textarea',required:true},
      {key:'especes_evaluees',label:"Groupes taxonomiques évalués",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'duree',label:"Durée du partenariat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT CI — UICN LISTE ROUGE</h1><p>Entre <strong>{{institution_ci}}</strong> et l'Union Internationale pour la Conservation de la Nature (UICN), signée le {{date_signature}} :</p><h2>Article 1 — Objectifs</h2><p>{{objectifs}}</p><h2>Article 2 — Groupes taxonomiques</h2><p>Évaluation de la Liste rouge pour : {{especes_evaluees}}.</p><h2>Article 3 — Durée</h2><p>{{duree}}.</p><h2>Article 4 — Résultats attendus</h2><p>Mise à jour de la Liste rouge, publication nationale des données, intégration dans les politiques publiques.</p></div>`
  },
  {
    code: 'bio4_certification_agri', name: "Accord de service de certification agriculture biodiversité", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de prestation pour la certification des pratiques agricoles respectueuses de la biodiversité en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'organisme_certification',label:"Organisme certificateur",type:'text',required:true},
      {key:'exploitation',label:"Exploitation agricole",type:'text',required:true},
      {key:'superficie',label:"Superficie (ha)",type:'text',required:true},
      {key:'referentiel',label:"Référentiel de certification",type:'text',required:true},
      {key:'date_audit',label:"Date d'audit",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION AGRICULTURE ET BIODIVERSITÉ</h1><p>Entre <strong>{{organisme_certification}}</strong> et <strong>{{exploitation}}</strong> ({{superficie}} ha) :</p><h2>Article 1 — Référentiel</h2><p>Certification selon : {{referentiel}}.</p><h2>Article 2 — Audit</h2><p>Audit de certification planifié le {{date_audit}}, suivi d'audits de surveillance annuels.</p><h2>Article 3 — Critères</h2><p>Maintien des corridors écologiques, réduction des intrants chimiques, conservation des espèces associées aux cultures.</p><h2>Article 4 — Validité</h2><p>Certificat valable 3 ans sous réserve d'audits annuels conformes.</p></div>`
  },
  {
    code: 'bio4_rapport_suivi', name: "Rapport de suivi biodiversité", category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Modèle de rapport annuel de suivi de la biodiversité pour les gestionnaires d'aires protégées et porteurs de projets en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'gestionnaire',label:"Gestionnaire/Auteur du rapport",type:'text',required:true},
      {key:'site',label:"Site ou projet concerné",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'especes_observees',label:"Espèces clés observées",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT ANNUEL DE SUIVI DE LA BIODIVERSITÉ</h1><p>Préparé par <strong>{{gestionnaire}}</strong> pour <strong>{{site}}</strong>, période : {{periode}}, daté du {{date_rapport}}.</p><h2>1. Résumé exécutif</h2><p>Bilan de la biodiversité observée sur la période de référence.</p><h2>2. Espèces clés</h2><p>{{especes_observees}}</p><h2>3. Tendances</h2><p>Évolution des populations par rapport à la période précédente, identification des menaces.</p><h2>4. Recommandations</h2><p>Mesures de gestion préconisées pour la prochaine période.</p></div>`
  },
  {
    code: 'bio4_plan_conservation', name: "Plan de conservation de la biodiversité", category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Document de planification stratégique pour la conservation de la biodiversité d'une aire géographique donnée en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'autorite',label:"Autorité responsable",type:'text',required:true},
      {key:'zone',label:"Zone géographique",type:'text',required:true},
      {key:'periode',label:"Période du plan (ex. 2025-2030)",type:'text',required:true},
      {key:'objectifs_strategiques',label:"Objectifs stratégiques",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CONSERVATION DE LA BIODIVERSITÉ</h1><p>Adopté par <strong>{{autorite}}</strong> le {{date_adoption}}, pour la zone de <strong>{{zone}}</strong>, période {{periode}}.</p><h2>1. Vision</h2><p>Conservation durable de la biodiversité au profit des générations présentes et futures.</p><h2>2. Objectifs stratégiques</h2><p>{{objectifs_strategiques}}</p><h2>3. Actions prioritaires</h2><p>Renforcement des aires protégées, corridors écologiques, lutte anti-braconnage, sensibilisation.</p><h2>4. Budget et financement</h2><p>Plan de financement pluriannuel présenté en annexe, incluant ressources nationales et internationales.</p><h2>5. Suivi-évaluation</h2><p>Révision bisannuelle du plan par le comité de pilotage.</p></div>`
  },
  {
    code: 'bio4_charte_vivre_ensemble', name: "Charte de la biodiversité et du vivre ensemble avec la nature", category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Charte éthique et citoyenne pour la préservation de la biodiversité et la promotion du vivre ensemble avec la nature en Afrique de l'Ouest.", templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'signataire',label:"Organisation ou communauté signataire",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'valeurs',label:"Valeurs et engagements retenus",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA BIODIVERSITÉ ET DU VIVRE ENSEMBLE AVEC LA NATURE</h1><p>Adoptée par <strong>{{signataire}}</strong>, représentée par <strong>{{representant}}</strong>, le {{date_signature}}.</p><h2>Préambule</h2><p>Reconnaissant que la biodiversité est le fondement de la vie sur Terre et que sa préservation est une responsabilité collective, nous souscrivons à la présente charte.</p><h2>Nos valeurs et engagements</h2><p>{{valeurs}}</p><h2>Nos actions</h2><p>Éduquer, sensibiliser, protéger, restaurer, et partager équitablement les bénéfices de la nature.</p><h2>Signature</h2><p>Fait à Abidjan, le {{date_signature}}</p><p><strong>{{representant}}</strong><br/>Au nom de {{signataire}}</p></div>`
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
  console.log(`Batch 108b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
