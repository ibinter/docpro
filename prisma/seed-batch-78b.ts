import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── SANTÉ ANIMALE / VÉTÉRINAIRE (25 templates) ───────────────────────────
  {
    code: 'vet_contrat_liberal_clinique',
    name: "Contrat de service vétérinaire libéral (clinique)",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat encadrant la prestation d'un vétérinaire libéral au sein d'une clinique vétérinaire, conforme aux règles OHADA et aux normes professionnelles en vigueur en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_veterinaire',label:"Nom du vétérinaire",type:'text',required:true},
      {key:'nom_clinique',label:"Nom de la clinique",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'honoraires',label:"Honoraires convenus (FCFA)",type:'text',required:true},
      {key:'lieu_exercice',label:"Lieu d'exercice",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE VÉTÉRINAIRE LIBÉRAL</h1>
<p>Entre <strong>{{nom_clinique}}</strong> (ci-après la Clinique) et le Dr <strong>{{nom_veterinaire}}</strong> (ci-après le Vétérinaire), il est convenu ce qui suit.</p>
<h2>Article 1 – Objet</h2>
<p>Le présent contrat a pour objet de définir les conditions dans lesquelles le Vétérinaire exerce son activité libérale au sein de la Clinique sise à {{lieu_exercice}}.</p>
<h2>Article 2 – Durée</h2>
<p>Le contrat prend effet le {{date_debut}} et est conclu pour une durée d'un (1) an renouvelable par tacite reconduction.</p>
<h2>Article 3 – Honoraires</h2>
<p>Les honoraires sont fixés à {{honoraires}} FCFA, révisables annuellement d'un commun accord.</p>
<h2>Article 4 – Obligations des parties</h2>
<p>Le Vétérinaire s'engage à respecter le code de déontologie vétérinaire et les protocoles de la Clinique. La Clinique met à disposition les équipements nécessaires à l'exercice de la profession.</p>
<h2>Article 5 – Résiliation</h2>
<p>Chaque partie peut résilier le présent contrat moyennant un préavis de trente (30) jours notifié par lettre recommandée.</p>
<p>Fait à {{lieu_exercice}}, le {{date_debut}}.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_soins_animaux_compagnie',
    name: "Accord de service de soins vétérinaires animaux de compagnie",
    category: 'agro_environnement', price: 3000, priceMax: 8000,
    description: "Accord définissant les prestations de soins vétérinaires courants pour les animaux de compagnie (chiens, chats, NAC) entre un propriétaire et une clinique vétérinaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_proprietaire',label:"Nom du propriétaire",type:'text',required:true},
      {key:'nom_animal',label:"Nom et espèce de l'animal",type:'text',required:true},
      {key:'nom_clinique',label:"Nom de la clinique vétérinaire",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'tarif_consultation',label:"Tarif de consultation (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOINS VÉTÉRINAIRES – ANIMAUX DE COMPAGNIE</h1>
<p>Entre <strong>{{nom_clinique}}</strong> et M./Mme <strong>{{nom_proprietaire}}</strong>, propriétaire de l'animal nommé <strong>{{nom_animal}}</strong>.</p>
<h2>Article 1 – Prestations</h2>
<p>La clinique s'engage à fournir des soins vétérinaires de qualité incluant consultations, prescriptions et suivi médical.</p>
<h2>Article 2 – Tarification</h2>
<p>Le tarif de consultation est fixé à {{tarif_consultation}} FCFA. Des actes complémentaires feront l'objet d'un devis préalable.</p>
<h2>Article 3 – Consentement éclairé</h2>
<p>Tout acte chirurgical ou traitement lourd nécessite l'accord écrit du propriétaire.</p>
<p>Fait le {{date_accord}}.</p></div>`
  },
  {
    code: 'vet_vaccination_domestiques',
    name: "Accord de service de vaccination animaux domestiques",
    category: 'agro_environnement', price: 2500, priceMax: 7000,
    description: "Accord de vaccination périodique des animaux domestiques contre les principales maladies infectieuses selon le calendrier vaccinal recommandé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_proprietaire',label:"Nom du propriétaire",type:'text',required:true},
      {key:'espece_animal',label:"Espèce et race de l'animal",type:'text',required:true},
      {key:'vaccins_prevus',label:"Vaccins prévus",type:'textarea',required:true},
      {key:'date_premiere_vaccination',label:"Date de première vaccination",type:'date',required:true},
      {key:'cout_vaccin',label:"Coût par vaccination (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VACCINATION – ANIMAUX DOMESTIQUES</h1>
<p>Propriétaire : <strong>{{nom_proprietaire}}</strong> – Animal : <strong>{{espece_animal}}</strong></p>
<h2>Article 1 – Programme vaccinal</h2>
<p>Les vaccins suivants sont prévus : {{vaccins_prevus}}</p>
<h2>Article 2 – Calendrier</h2>
<p>La première vaccination est fixée au {{date_premiere_vaccination}}. Les rappels seront planifiés selon le protocole du fabricant.</p>
<h2>Article 3 – Tarif</h2>
<p>Coût par séance de vaccination : {{cout_vaccin}} FCFA.</p>
<h2>Article 4 – Responsabilité</h2>
<p>Le propriétaire s'engage à présenter l'animal en bonne santé apparente le jour de la vaccination.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_sterilisation_chirurgie',
    name: "Accord de service de stérilisation animaux (chirurgie)",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Accord de prise en charge chirurgicale pour la stérilisation (castration/ovariectomie) d'animaux domestiques ou d'élevage, avec consentement éclairé du propriétaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_proprietaire',label:"Nom du propriétaire",type:'text',required:true},
      {key:'description_animal',label:"Description de l'animal",type:'text',required:true},
      {key:'type_intervention',label:"Type d'intervention chirurgicale",type:'text',required:true},
      {key:'date_intervention',label:"Date prévue de l'intervention",type:'date',required:true},
      {key:'cout_intervention',label:"Coût de l'intervention (FCFA)",type:'text',required:true},
      {key:'risques_informes',label:"Risques communiqués au propriétaire",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STÉRILISATION VÉTÉRINAIRE</h1>
<p>Propriétaire : <strong>{{nom_proprietaire}}</strong> – Animal : <strong>{{description_animal}}</strong></p>
<h2>Article 1 – Nature de l'intervention</h2>
<p>Intervention prévue : <strong>{{type_intervention}}</strong>, programmée le {{date_intervention}}.</p>
<h2>Article 2 – Consentement éclairé</h2>
<p>Le propriétaire reconnaît avoir été informé des risques suivants : {{risques_informes}}</p>
<h2>Article 3 – Coût</h2>
<p>Le montant total de l'intervention est de {{cout_intervention}} FCFA, payable avant la sortie de l'animal.</p>
<h2>Article 4 – Suivi post-opératoire</h2>
<p>Un contrôle post-opératoire est inclus dans le tarif et sera planifié sept (7) jours après l'intervention.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_dentisterie',
    name: "Accord de service de dentisterie vétérinaire",
    category: 'agro_environnement', price: 3500, priceMax: 10000,
    description: "Accord de soins dentaires vétérinaires incluant détartrage, extraction et traitement des affections buccales chez les animaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_proprietaire',label:"Nom du propriétaire",type:'text',required:true},
      {key:'description_animal',label:"Description de l'animal",type:'text',required:true},
      {key:'soins_dentaires',label:"Soins dentaires prévus",type:'textarea',required:true},
      {key:'date_soins',label:"Date des soins",type:'date',required:true},
      {key:'cout_soins',label:"Coût estimé (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DENTISTERIE VÉTÉRINAIRE</h1>
<p>Propriétaire : <strong>{{nom_proprietaire}}</strong> – Animal : <strong>{{description_animal}}</strong></p>
<h2>Article 1 – Soins prévus</h2>
<p>{{soins_dentaires}}</p>
<h2>Article 2 – Date et lieu</h2>
<p>Les soins sont programmés le {{date_soins}} sous anesthésie générale ou locale selon le protocole adapté.</p>
<h2>Article 3 – Tarif</h2>
<p>Coût estimé : {{cout_soins}} FCFA. Un devis définitif sera établi après examen buccal complet.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_imagerie_radio_echo',
    name: "Accord de service d'imagerie vétérinaire (radio, écho)",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Accord de prestation d'imagerie médicale vétérinaire (radiographie, échographie) pour le diagnostic des affections internes des animaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_proprietaire',label:"Nom du propriétaire",type:'text',required:true},
      {key:'description_animal',label:"Description de l'animal",type:'text',required:true},
      {key:'type_imagerie',label:"Type d'imagerie (radio/écho/autre)",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true},
      {key:'tarif_examen',label:"Tarif de l'examen (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMAGERIE VÉTÉRINAIRE</h1>
<p>Propriétaire : <strong>{{nom_proprietaire}}</strong> – Animal : <strong>{{description_animal}}</strong></p>
<h2>Article 1 – Prestation</h2>
<p>Examen d'imagerie de type <strong>{{type_imagerie}}</strong>, prévu le {{date_examen}}.</p>
<h2>Article 2 – Rendu des résultats</h2>
<p>Les clichés et le compte rendu seront remis au propriétaire dans les 48 heures suivant l'examen.</p>
<h2>Article 3 – Tarif</h2>
<p>Tarif : {{tarif_examen}} FCFA. Toute incidence supplémentaire sera facturée selon le tarif en vigueur.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_laboratoire_analyses',
    name: "Accord de service de laboratoire vétérinaire (analyses)",
    category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Accord de réalisation d'analyses biologiques vétérinaires (hématologie, biochimie, bactériologie, parasitologie) en laboratoire agréé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_veterinaire_prescripteur',label:"Nom du vétérinaire prescripteur",type:'text',required:true},
      {key:'nom_laboratoire',label:"Nom du laboratoire",type:'text',required:true},
      {key:'analyses_demandees',label:"Analyses demandées",type:'textarea',required:true},
      {key:'date_prelevement',label:"Date de prélèvement",type:'date',required:true},
      {key:'delai_rendu',label:"Délai de rendu des résultats",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LABORATOIRE VÉTÉRINAIRE</h1>
<p>Prescripteur : Dr <strong>{{nom_veterinaire_prescripteur}}</strong> – Laboratoire : <strong>{{nom_laboratoire}}</strong></p>
<h2>Article 1 – Analyses</h2>
<p>Analyses commandées : {{analyses_demandees}}</p>
<h2>Article 2 – Prélèvement</h2>
<p>Date de prélèvement : {{date_prelevement}}. Les échantillons seront acheminés sous chaîne du froid.</p>
<h2>Article 3 – Délais et rendu</h2>
<p>Délai de rendu : {{delai_rendu}}. Les résultats seront transmis au vétérinaire prescripteur par voie électronique sécurisée.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_pharmacie',
    name: "Accord de service de pharmacie vétérinaire",
    category: 'agro_environnement', price: 2500, priceMax: 7000,
    description: "Accord de fourniture de médicaments vétérinaires et de conseils pharmaceutiques entre une pharmacie vétérinaire et un éleveur ou propriétaire d'animaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_pharmacie',label:"Nom de la pharmacie vétérinaire",type:'text',required:true},
      {key:'nom_client',label:"Nom du client (éleveur/propriétaire)",type:'text',required:true},
      {key:'produits_fournis',label:"Produits et médicaments fournis",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'conditions_paiement',label:"Conditions de paiement",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHARMACIE VÉTÉRINAIRE</h1>
<p>Entre <strong>{{nom_pharmacie}}</strong> et <strong>{{nom_client}}</strong></p>
<h2>Article 1 – Produits</h2>
<p>La pharmacie s'engage à fournir les produits suivants sur prescription vétérinaire : {{produits_fournis}}</p>
<h2>Article 2 – Conditions</h2>
<p>La délivrance est strictement conditionnée à la présentation d'une ordonnance valide. Conditions de paiement : {{conditions_paiement}}.</p>
<h2>Article 3 – Traçabilité</h2>
<p>Un registre des délivrances est tenu conformément à la réglementation pharmaceutique vétérinaire en vigueur.</p>
<p>Fait le {{date_accord}}. Signatures des parties</p></div>`
  },
  {
    code: 'vet_elevage_bovin',
    name: "Accord de service de vétérinaire des élevages bovins",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de suivi sanitaire et zootechnique d'un élevage bovin par un vétérinaire mandaté, couvrant prophylaxie, soins curatifs et conseil.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_eleveur',label:"Nom de l'éleveur",type:'text',required:true},
      {key:'localisation_elevage',label:"Localisation de l'élevage",type:'text',required:true},
      {key:'effectif_bovin',label:"Effectif bovin (nombre de têtes)",type:'text',required:true},
      {key:'nom_veterinaire',label:"Nom du vétérinaire",type:'text',required:true},
      {key:'frequence_visites',label:"Fréquence des visites",type:'text',required:true},
      {key:'tarif_annuel',label:"Tarif annuel forfaitaire (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE VÉTÉRINAIRE – ÉLEVAGE BOVIN</h1>
<p>Entre Dr <strong>{{nom_veterinaire}}</strong> et l'éleveur <strong>{{nom_eleveur}}</strong>, pour l'élevage situé à <strong>{{localisation_elevage}}</strong>.</p>
<h2>Article 1 – Cheptel concerné</h2>
<p>Effectif bovin : <strong>{{effectif_bovin}}</strong> têtes.</p>
<h2>Article 2 – Prestations</h2>
<p>Le vétérinaire assure le suivi sanitaire, les vaccinations, le traitement des maladies courantes et le conseil zootechnique.</p>
<h2>Article 3 – Visites</h2>
<p>Fréquence des visites : {{frequence_visites}}.</p>
<h2>Article 4 – Tarification</h2>
<p>Forfait annuel : {{tarif_annuel}} FCFA, hors médicaments et analyses.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_elevage_avicole',
    name: "Accord de service de vétérinaire des élevages avicoles",
    category: 'agro_environnement', price: 4500, priceMax: 13000,
    description: "Accord de suivi sanitaire d'un élevage avicole (poulets de chair, pondeuses) incluant prophylaxie, contrôle des maladies respiratoires et intestinales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_eleveur',label:"Nom de l'éleveur avicole",type:'text',required:true},
      {key:'localisation_ferme',label:"Localisation de la ferme",type:'text',required:true},
      {key:'effectif_volailles',label:"Effectif (nombre de volailles)",type:'text',required:true},
      {key:'nom_veterinaire',label:"Nom du vétérinaire",type:'text',required:true},
      {key:'programme_prophylaxie',label:"Programme de prophylaxie prévu",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE VÉTÉRINAIRE – ÉLEVAGE AVICOLE</h1>
<p>Entre Dr <strong>{{nom_veterinaire}}</strong> et l'éleveur <strong>{{nom_eleveur}}</strong>, pour la ferme avicole sise à <strong>{{localisation_ferme}}</strong>.</p>
<h2>Article 1 – Cheptel</h2>
<p>Effectif : <strong>{{effectif_volailles}}</strong> volailles.</p>
<h2>Article 2 – Programme prophylactique</h2>
<p>{{programme_prophylaxie}}</p>
<h2>Article 3 – Obligations du vétérinaire</h2>
<p>Visites régulières, suivi des indicateurs de performance zootechnique, déclaration obligatoire de tout cas suspect de maladie réglementée.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_elevage_porcin',
    name: "Accord de service de vétérinaire des élevages porcins",
    category: 'agro_environnement', price: 4500, priceMax: 13000,
    description: "Accord de suivi sanitaire d'un élevage porcin couvrant la prévention des maladies (PPA, rouget, maladie d'Aujeszky) et le suivi des performances de production.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_eleveur',label:"Nom de l'éleveur porcin",type:'text',required:true},
      {key:'localisation_elevage',label:"Localisation de l'élevage",type:'text',required:true},
      {key:'effectif_porcs',label:"Effectif porcin",type:'text',required:true},
      {key:'nom_veterinaire',label:"Nom du vétérinaire",type:'text',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE VÉTÉRINAIRE – ÉLEVAGE PORCIN</h1>
<p>Entre Dr <strong>{{nom_veterinaire}}</strong> et l'éleveur <strong>{{nom_eleveur}}</strong>, pour l'élevage porcin situé à <strong>{{localisation_elevage}}</strong>.</p>
<h2>Article 1 – Cheptel</h2>
<p>Effectif porcin : <strong>{{effectif_porcs}}</strong> têtes.</p>
<h2>Article 2 – Prestations</h2>
<p>Suivi sanitaire mensuel, vaccinations, traitement curatif, contrôle des parasites internes et externes, rapport sanitaire trimestriel.</p>
<h2>Article 3 – Tarif</h2>
<p>Tarif mensuel forfaitaire : {{tarif_mensuel}} FCFA, hors médicaments.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_elevage_ovin_caprin',
    name: "Accord de service de vétérinaire des élevages ovins/caprins",
    category: 'agro_environnement', price: 4000, priceMax: 11000,
    description: "Accord de suivi sanitaire d'un élevage ovin et/ou caprin, incluant la prévention des maladies prioritaires (PPR, brucellose, clavelée) et l'amélioration génétique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_eleveur',label:"Nom de l'éleveur",type:'text',required:true},
      {key:'types_animaux',label:"Types d'animaux (ovins/caprins/mixte)",type:'text',required:true},
      {key:'effectif_total',label:"Effectif total",type:'text',required:true},
      {key:'nom_veterinaire',label:"Nom du vétérinaire",type:'text',required:true},
      {key:'maladies_cibles',label:"Maladies ciblées par la prophylaxie",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE VÉTÉRINAIRE – ÉLEVAGE OVIN/CAPRIN</h1>
<p>Entre Dr <strong>{{nom_veterinaire}}</strong> et <strong>{{nom_eleveur}}</strong></p>
<h2>Article 1 – Cheptel</h2>
<p>Animaux : <strong>{{types_animaux}}</strong> – Effectif : <strong>{{effectif_total}}</strong> têtes.</p>
<h2>Article 2 – Maladies ciblées</h2>
<p>{{maladies_cibles}}</p>
<h2>Article 3 – Engagements</h2>
<p>Visites semestrielles minimum, déclaration de tout foyer suspect, conseil en alimentation et reproduction.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_prophylaxie_collective',
    name: "Accord de service de prophylaxie collective (cheptel)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de prophylaxie collective pour un groupement d'éleveurs, couvrant la vaccination de masse, le déparasitage et la surveillance sanitaire d'un territoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_groupement',label:"Nom du groupement d'éleveurs",type:'text',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'effectif_total_cheptel',label:"Effectif total du cheptel",type:'text',required:true},
      {key:'actions_prophylactiques',label:"Actions prophylactiques prévues",type:'textarea',required:true},
      {key:'date_campagne',label:"Date de la campagne",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PROPHYLAXIE COLLECTIVE</h1>
<p>Groupement : <strong>{{nom_groupement}}</strong> – Zone : <strong>{{zone_intervention}}</strong></p>
<h2>Article 1 – Cheptel ciblé</h2>
<p>Effectif total : <strong>{{effectif_total_cheptel}}</strong> têtes.</p>
<h2>Article 2 – Actions prévues</h2>
<p>{{actions_prophylactiques}}</p>
<h2>Article 3 – Calendrier</h2>
<p>Campagne débutant le {{date_campagne}}, selon le calendrier validé par la Direction des Services Vétérinaires.</p>
<h2>Article 4 – Financement</h2>
<p>Le financement est assuré conjointement par les éleveurs et les subventions publiques disponibles.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_epidemiosurveillance',
    name: "Accord de service d'épidémiosurveillance (maladies animales)",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Accord de mise en place d'un réseau d'épidémiosurveillance des maladies animales prioritaires sur un territoire défini, en partenariat avec les services officiels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'organisme_mandataire',label:"Organisme mandataire",type:'text',required:true},
      {key:'zone_surveillance',label:"Zone de surveillance",type:'text',required:true},
      {key:'maladies_surveillees',label:"Maladies sous surveillance",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du dispositif",type:'date',required:true},
      {key:'budget_alloue',label:"Budget alloué (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉPIDÉMIOSURVEILLANCE DES MALADIES ANIMALES</h1>
<p>Mandataire : <strong>{{organisme_mandataire}}</strong> – Zone : <strong>{{zone_surveillance}}</strong></p>
<h2>Article 1 – Maladies ciblées</h2>
<p>{{maladies_surveillees}}</p>
<h2>Article 2 – Dispositif</h2>
<p>Réseau de sentinelles vétérinaires avec remontée d'alertes sous 24h vers les services officiels. Enquêtes épidémiologiques en cas de suspicion.</p>
<h2>Article 3 – Durée et financement</h2>
<p>Dispositif actif à compter du {{date_debut}}, financé à hauteur de {{budget_alloue}} FCFA.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_grippe_aviaire',
    name: "Accord de service de lutte contre la grippe aviaire",
    category: 'agro_environnement', price: 7000, priceMax: 20000,
    description: "Accord de mise en oeuvre d'un plan de lutte contre la grippe aviaire (IAHP/IAFP) incluant surveillance, alerte précoce et protocoles d'abattage sanitaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'autorite_veterinaire',label:"Autorité vétérinaire compétente",type:'text',required:true},
      {key:'zone_risque',label:"Zone à risque ciblée",type:'text',required:true},
      {key:'mesures_biosecurite',label:"Mesures de biosécurité imposées",type:'textarea',required:true},
      {key:'date_activation',label:"Date d'activation du plan",type:'date',required:true},
      {key:'contact_urgence',label:"Contact d'urgence vétérinaire",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – LUTTE CONTRE LA GRIPPE AVIAIRE</h1>
<p>Autorité : <strong>{{autorite_veterinaire}}</strong> – Zone : <strong>{{zone_risque}}</strong></p>
<h2>Article 1 – Contexte réglementaire</h2>
<p>Accord établi conformément aux directives OIE/WOAH et à la réglementation nationale en vigueur.</p>
<h2>Article 2 – Mesures de biosécurité</h2>
<p>{{mesures_biosecurite}}</p>
<h2>Article 3 – Procédure d'alerte</h2>
<p>Tout cas suspect doit être signalé dans les 24h au contact : {{contact_urgence}}. Le plan est activé le {{date_activation}}.</p>
<h2>Article 4 – Indemnisation</h2>
<p>Les éleveurs concernés par un abattage sanitaire bénéficieront d'une indemnisation selon le barème officiel.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_fievre_aphteuse',
    name: "Accord de service de lutte contre la fièvre aphteuse",
    category: 'agro_environnement', price: 7000, priceMax: 20000,
    description: "Accord de contrôle et d'éradication de la fièvre aphteuse incluant vaccination d'urgence, zoning et restrictions de mouvement des animaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'autorite_veterinaire',label:"Autorité vétérinaire compétente",type:'text',required:true},
      {key:'zone_foyer',label:"Zone de foyer déclarée",type:'text',required:true},
      {key:'perimetre_protection',label:"Périmètre de protection (km)",type:'text',required:true},
      {key:'date_declaration',label:"Date de déclaration du foyer",type:'date',required:true},
      {key:'mesures_urgence',label:"Mesures d'urgence déclenchées",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – LUTTE CONTRE LA FIÈVRE APHTEUSE</h1>
<p>Autorité : <strong>{{autorite_veterinaire}}</strong></p>
<h2>Article 1 – Déclaration de foyer</h2>
<p>Foyer déclaré le {{date_declaration}} dans la zone : <strong>{{zone_foyer}}</strong>.</p>
<h2>Article 2 – Zonage sanitaire</h2>
<p>Périmètre de protection : {{perimetre_protection}} km. Restrictions de mouvement des animaux immédiatement applicables.</p>
<h2>Article 3 – Mesures d'urgence</h2>
<p>{{mesures_urgence}}</p>
<h2>Article 4 – Obligations des éleveurs</h2>
<p>Déclaration immédiate de tout animal suspect, coopération totale avec les équipes vétérinaires officielles.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_controle_import_export',
    name: "Accord de service de contrôle vétérinaire à l'import/export",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Accord de prestation de contrôle vétérinaire sanitaire aux postes frontaliers pour les animaux vivants et produits d'origine animale importés ou exportés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_operateur',label:"Nom de l'opérateur (importateur/exportateur)",type:'text',required:true},
      {key:'nature_marchandise',label:"Nature de la marchandise",type:'text',required:true},
      {key:'pays_origine_destination',label:"Pays d'origine ou de destination",type:'text',required:true},
      {key:'poste_frontiere',label:"Poste frontière concerné",type:'text',required:true},
      {key:'date_operation',label:"Date de l'opération",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CONTRÔLE VÉTÉRINAIRE À L'IMPORT/EXPORT</h1>
<p>Opérateur : <strong>{{nom_operateur}}</strong> – Marchandise : <strong>{{nature_marchandise}}</strong></p>
<h2>Article 1 – Opération</h2>
<p>Pays d'origine/destination : {{pays_origine_destination}} – Poste frontière : {{poste_frontiere}} – Date : {{date_operation}}.</p>
<h2>Article 2 – Documents requis</h2>
<p>Certificat sanitaire du pays exportateur, permis d'importation/exportation délivré par la Direction des Services Vétérinaires.</p>
<h2>Article 3 – Inspection</h2>
<p>Inspection documentaire, d'identité et physique au poste frontière par les agents vétérinaires officiels.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_certification_sanitaire_export',
    name: "Accord de service de certification sanitaire à l'export",
    category: 'agro_environnement', price: 5000, priceMax: 14000,
    description: "Accord de délivrance de certificats sanitaires officiels pour l'exportation d'animaux vivants ou de produits d'origine animale, conforme aux exigences du pays importateur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_exportateur',label:"Nom de l'exportateur",type:'text',required:true},
      {key:'produit_a_certifier',label:"Produit ou animal à certifier",type:'text',required:true},
      {key:'pays_importateur',label:"Pays importateur",type:'text',required:true},
      {key:'normes_applicables',label:"Normes sanitaires applicables",type:'textarea',required:true},
      {key:'date_certification',label:"Date de certification",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CERTIFICATION SANITAIRE À L'EXPORT</h1>
<p>Exportateur : <strong>{{nom_exportateur}}</strong> – Produit : <strong>{{produit_a_certifier}}</strong> – Pays : <strong>{{pays_importateur}}</strong></p>
<h2>Article 1 – Normes applicables</h2>
<p>{{normes_applicables}}</p>
<h2>Article 2 – Inspection préalable</h2>
<p>La certification est précédée d'une inspection vétérinaire officielle des lots concernés.</p>
<h2>Article 3 – Validité</h2>
<p>Le certificat est délivré le {{date_certification}} et est valide pour la durée du transport jusqu'au pays de destination.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_bien_etre_animal_cert',
    name: "Accord de service de bien-être animal (certification)",
    category: 'agro_environnement', price: 5000, priceMax: 14000,
    description: "Accord de certification du respect des normes de bien-être animal dans les élevages, conformément aux cinq libertés fondamentales reconnues internationalement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_eleveur',label:"Nom de l'éleveur",type:'text',required:true},
      {key:'type_elevage',label:"Type et localisation de l'élevage",type:'text',required:true},
      {key:'organisme_certificateur',label:"Organisme certificateur",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
      {key:'criteres_evalues',label:"Critères de bien-être évalués",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CERTIFICATION BIEN-ÊTRE ANIMAL</h1>
<p>Éleveur : <strong>{{nom_eleveur}}</strong> – Élevage : <strong>{{type_elevage}}</strong></p>
<p>Certificateur : <strong>{{organisme_certificateur}}</strong></p>
<h2>Article 1 – Critères évalués</h2>
<p>{{criteres_evalues}}</p>
<h2>Article 2 – Audit</h2>
<p>Audit programmé le {{date_audit}}. Un rapport détaillé sera remis dans les 15 jours suivant la visite.</p>
<h2>Article 3 – Validité de la certification</h2>
<p>La certification est valable deux (2) ans, sous réserve de conformité maintenue et d'audits de surveillance annuels.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_partenariat_lanada',
    name: "Accord de partenariat LANADA-vétérinaire privé",
    category: 'agro_environnement', price: 6000, priceMax: 17000,
    description: "Accord de partenariat entre le Laboratoire National d'Appui au Développement Agricole (LANADA) et un vétérinaire privé pour la réalisation d'analyses et d'activités de diagnostic.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_veterinaire_prive',label:"Nom du vétérinaire privé",type:'text',required:true},
      {key:'specialite',label:"Spécialité ou domaine de compétence",type:'text',required:true},
      {key:'activites_partenariat',label:"Activités couvertes par le partenariat",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT LANADA – VÉTÉRINAIRE PRIVÉ</h1>
<p>Entre le LANADA et Dr <strong>{{nom_veterinaire_prive}}</strong>, spécialiste en <strong>{{specialite}}</strong>.</p>
<h2>Article 1 – Objet du partenariat</h2>
<p>{{activites_partenariat}}</p>
<h2>Article 2 – Durée</h2>
<p>Partenariat d'une durée de {{duree_partenariat}}, prenant effet le {{date_signature}}.</p>
<h2>Article 3 – Conditions financières</h2>
<p>Les modalités de rémunération pour les prestations réalisées seront définies dans une annexe tarifaire jointe au présent accord.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_formation_eleveurs',
    name: "Accord de service de formation des éleveurs (zootechnie)",
    category: 'agro_environnement', price: 4000, priceMax: 11000,
    description: "Accord de formation pratique et théorique des éleveurs aux techniques zootechniques modernes et aux bonnes pratiques d'élevage.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_formateur',label:"Nom du formateur (vétérinaire/zootechnicien)",type:'text',required:true},
      {key:'groupe_eleveurs',label:"Groupe d'éleveurs bénéficiaires",type:'text',required:true},
      {key:'themes_formation',label:"Thèmes de formation",type:'textarea',required:true},
      {key:'date_debut_formation',label:"Date de début de la formation",type:'date',required:true},
      {key:'duree_formation',label:"Durée de la formation",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION DES ÉLEVEURS</h1>
<p>Formateur : <strong>{{nom_formateur}}</strong> – Groupe : <strong>{{groupe_eleveurs}}</strong></p>
<h2>Article 1 – Thèmes abordés</h2>
<p>{{themes_formation}}</p>
<h2>Article 2 – Calendrier</h2>
<p>Formation débutant le {{date_debut_formation}}, d'une durée de {{duree_formation}}.</p>
<h2>Article 3 – Attestation</h2>
<p>Une attestation de formation sera délivrée aux participants ayant suivi l'intégralité du programme.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_rapport_suivi_sanitaire',
    name: "Rapport de suivi sanitaire d'élevage",
    category: 'agro_environnement', price: 3000, priceMax: 8000,
    description: "Rapport périodique de suivi sanitaire d'un élevage établi par le vétérinaire traitant, couvrant l'état de santé du cheptel, les interventions réalisées et les recommandations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_veterinaire',label:"Nom du vétérinaire",type:'text',required:true},
      {key:'nom_eleveur',label:"Nom de l'éleveur",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte par le rapport",type:'text',required:true},
      {key:'etat_sante_cheptel',label:"État de santé général du cheptel",type:'textarea',required:true},
      {key:'interventions_realisees',label:"Interventions réalisées",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SUIVI SANITAIRE D'ÉLEVAGE</h1>
<p>Établi par : Dr <strong>{{nom_veterinaire}}</strong> – Pour : <strong>{{nom_eleveur}}</strong></p>
<p>Période : <strong>{{periode_rapport}}</strong> – Date : {{date_rapport}}</p>
<h2>1. État de santé du cheptel</h2>
<p>{{etat_sante_cheptel}}</p>
<h2>2. Interventions réalisées</h2>
<p>{{interventions_realisees}}</p>
<h2>3. Recommandations</h2>
<p>Mesures préventives et correctives recommandées pour la prochaine période de suivi.</p>
<p>Signature du vétérinaire</p></div>`
  },
  {
    code: 'vet_plan_prophylaxie_annuel',
    name: "Plan de prophylaxie annuel",
    category: 'agro_environnement', price: 4000, priceMax: 11000,
    description: "Plan de prophylaxie annuel établi par le vétérinaire traitant pour un élevage, détaillant les vaccinations, déparasitages et mesures de prévention sanitaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_veterinaire',label:"Nom du vétérinaire",type:'text',required:true},
      {key:'nom_elevage',label:"Nom et type de l'élevage",type:'text',required:true},
      {key:'annee_plan',label:"Année du plan",type:'text',required:true},
      {key:'vaccinations_planifiees',label:"Vaccinations planifiées (calendrier)",type:'textarea',required:true},
      {key:'antiparasitaires_prevus',label:"Traitements antiparasitaires prévus",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE PROPHYLAXIE ANNUEL</h1>
<p>Vétérinaire : Dr <strong>{{nom_veterinaire}}</strong> – Élevage : <strong>{{nom_elevage}}</strong> – Année : <strong>{{annee_plan}}</strong></p>
<h2>1. Vaccinations prévues</h2>
<p>{{vaccinations_planifiees}}</p>
<h2>2. Traitements antiparasitaires</h2>
<p>{{antiparasitaires_prevus}}</p>
<h2>3. Mesures complémentaires</h2>
<p>Biosécurité renforcée, désinfection des locaux, contrôle des introductions d'animaux.</p>
<h2>4. Budget prévisionnel</h2>
<p>Estimation du coût du plan : à définir selon les produits vétérinaires utilisés.</p>
<p>Signature du vétérinaire</p></div>`
  },
  {
    code: 'vet_microchip_passeport',
    name: "Accord de service de microchip et passeport animal",
    category: 'agro_environnement', price: 3000, priceMax: 8000,
    description: "Accord de pose de microchip d'identification et d'établissement du passeport animal pour les animaux de compagnie destinés aux voyages internationaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_proprietaire',label:"Nom du propriétaire",type:'text',required:true},
      {key:'description_animal',label:"Description de l'animal",type:'text',required:true},
      {key:'pays_destination',label:"Pays de destination prévu",type:'text',required:true},
      {key:'date_pose_microchip',label:"Date de pose du microchip",type:'date',required:true},
      {key:'cout_prestation',label:"Coût total de la prestation (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MICROCHIP ET PASSEPORT ANIMAL</h1>
<p>Propriétaire : <strong>{{nom_proprietaire}}</strong> – Animal : <strong>{{description_animal}}</strong></p>
<h2>Article 1 – Prestations</h2>
<p>Pose du transpondeur électronique (microchip ISO 11784/11785) le {{date_pose_microchip}}. Établissement du passeport animal conforme aux exigences du pays de destination : {{pays_destination}}.</p>
<h2>Article 2 – Tarif</h2>
<p>Coût total : {{cout_prestation}} FCFA (microchip + passeport + vaccinations requises inclus).</p>
<h2>Article 3 – Délai</h2>
<p>Le passeport est délivré dans un délai de 5 à 10 jours ouvrables après la réalisation de toutes les formalités.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'vet_charte_bien_etre',
    name: "Charte du bien-être animal et de la santé vétérinaire",
    category: 'agro_environnement', price: 2000, priceMax: 6000,
    description: "Charte d'engagement collectif pour le respect du bien-être animal et la promotion de la santé vétérinaire, signée par les acteurs de la filière animale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_organisation',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'representant_legal',label:"Représentant légal",type:'text',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques de l'organisation",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DU BIEN-ÊTRE ANIMAL ET DE LA SANTÉ VÉTÉRINAIRE</h1>
<p>L'organisation <strong>{{nom_organisation}}</strong>, représentée par <strong>{{representant_legal}}</strong>, souscrit aux principes de la présente Charte.</p>
<h2>Préambule</h2>
<p>Les animaux sont des êtres sensibles. Leur bien-être est une responsabilité partagée par tous les acteurs de la filière animale en Côte d'Ivoire.</p>
<h2>Principes fondamentaux</h2>
<p>Respect des cinq libertés : absence de faim et de soif, absence d'inconfort, absence de douleur, liberté d'expression des comportements normaux, absence de peur et de détresse.</p>
<h2>Engagements</h2>
<p>{{engagements_specifiques}}</p>
<p>Signé le {{date_signature}}. Signature du représentant légal</p></div>`
  },

  // ─── AGRICULTURE DE PRÉCISION / AGRITECH (25 templates) ───────────────────
  {
    code: 'agr3_drone_agricole',
    name: "Accord de service de drone agricole (cartographie et traitement)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de prestation de services par drone pour la cartographie parcellaire, la surveillance des cultures et le traitement phytosanitaire par voie aérienne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_prestataire_drone',label:"Nom du prestataire drone",type:'text',required:true},
      {key:'nom_agriculteur',label:"Nom de l'agriculteur bénéficiaire",type:'text',required:true},
      {key:'superficie_hectares',label:"Superficie à couvrir (hectares)",type:'text',required:true},
      {key:'type_mission',label:"Type de mission (cartographie/traitement/surveillance)",type:'text',required:true},
      {key:'date_intervention',label:"Date de l'intervention",type:'date',required:true},
      {key:'tarif_hectare',label:"Tarif par hectare (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DRONE AGRICOLE</h1>
<p>Prestataire : <strong>{{nom_prestataire_drone}}</strong> – Bénéficiaire : <strong>{{nom_agriculteur}}</strong></p>
<h2>Article 1 – Mission</h2>
<p>Type de mission : <strong>{{type_mission}}</strong> sur une superficie de <strong>{{superficie_hectares}}</strong> hectares.</p>
<h2>Article 2 – Calendrier</h2>
<p>Intervention prévue le {{date_intervention}}, sous réserve des conditions météorologiques favorables.</p>
<h2>Article 3 – Tarification</h2>
<p>Tarif : {{tarif_hectare}} FCFA/ha. Le montant total sera calculé sur la superficie effectivement traitée.</p>
<h2>Article 4 – Livrables</h2>
<p>Rapport de mission, cartographies et images géoréférencées remis dans les 72h suivant l'intervention.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_satellite_ndvi',
    name: "Accord de service de satellite imagerie agricole (NDVI)",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Accord de fourniture de données d'imagerie satellitaire multispectrale (NDVI, NDWI) pour le suivi de la végétation et l'aide à la décision agronomique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_fournisseur_data',label:"Nom du fournisseur de données satellite",type:'text',required:true},
      {key:'nom_client_agri',label:"Nom du client agricole",type:'text',required:true},
      {key:'zone_geographique',label:"Zone géographique couverte",type:'text',required:true},
      {key:'indices_fournis',label:"Indices fournis (NDVI, NDWI, etc.)",type:'text',required:true},
      {key:'frequence_acquisition',label:"Fréquence d'acquisition des images",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMAGERIE SATELLITAIRE AGRICOLE</h1>
<p>Fournisseur : <strong>{{nom_fournisseur_data}}</strong> – Client : <strong>{{nom_client_agri}}</strong></p>
<h2>Article 1 – Données fournies</h2>
<p>Zone : {{zone_geographique}} – Indices : {{indices_fournis}} – Fréquence : {{frequence_acquisition}}.</p>
<h2>Article 2 – Format de livraison</h2>
<p>Images au format GeoTIFF, accessibles via plateforme web sécurisée dans les 48h suivant l'acquisition.</p>
<h2>Article 3 – Utilisation</h2>
<p>Les données sont utilisées exclusivement pour les besoins agronomiques du client. Toute revente est interdite sans accord préalable.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_iot_capteurs',
    name: "Accord de service de capteurs IoT pour agriculture (sol, météo)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de déploiement et de maintenance de capteurs IoT agro-météorologiques (humidité du sol, température, pluviométrie) avec transmission de données en temps réel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_fournisseur_iot',label:"Nom du fournisseur IoT",type:'text',required:true},
      {key:'nom_exploitation',label:"Nom de l'exploitation agricole",type:'text',required:true},
      {key:'nombre_capteurs',label:"Nombre de capteurs déployés",type:'text',required:true},
      {key:'types_capteurs',label:"Types de capteurs installés",type:'textarea',required:true},
      {key:'abonnement_mensuel',label:"Abonnement mensuel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CAPTEURS IoT AGRICOLES</h1>
<p>Fournisseur : <strong>{{nom_fournisseur_iot}}</strong> – Exploitation : <strong>{{nom_exploitation}}</strong></p>
<h2>Article 1 – Équipements</h2>
<p>Déploiement de <strong>{{nombre_capteurs}}</strong> capteurs de type : {{types_capteurs}}</p>
<h2>Article 2 – Transmission des données</h2>
<p>Données transmises en temps réel via réseau LoRaWAN/4G. Accès via tableau de bord en ligne 24h/24.</p>
<h2>Article 3 – Abonnement</h2>
<p>Abonnement mensuel : {{abonnement_mensuel}} FCFA incluant maintenance préventive et support technique.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_irrigation_automatisee',
    name: "Accord de service de système d'irrigation automatisé (goutte-à-goutte)",
    category: 'agro_environnement', price: 7000, priceMax: 20000,
    description: "Accord d'installation et de maintenance d'un système d'irrigation automatisé au goutte-à-goutte piloté par capteurs, optimisant la consommation d'eau.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_installateur',label:"Nom de l'installateur",type:'text',required:true},
      {key:'nom_agriculteur',label:"Nom de l'agriculteur",type:'text',required:true},
      {key:'superficie_irrigable',label:"Superficie irrigable (ha)",type:'text',required:true},
      {key:'cultures_concernees',label:"Cultures concernées",type:'text',required:true},
      {key:'cout_installation',label:"Coût d'installation (FCFA)",type:'text',required:true},
      {key:'date_mise_en_service',label:"Date de mise en service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – IRRIGATION AUTOMATISÉE GOUTTE-À-GOUTTE</h1>
<p>Installateur : <strong>{{nom_installateur}}</strong> – Agriculteur : <strong>{{nom_agriculteur}}</strong></p>
<h2>Article 1 – Périmètre d'irrigation</h2>
<p>Superficie : <strong>{{superficie_irrigable}}</strong> ha – Cultures : <strong>{{cultures_concernees}}</strong></p>
<h2>Article 2 – Système installé</h2>
<p>Réseau goutte-à-goutte piloté par automate programmable, couplé à des capteurs d'humidité du sol pour une irrigation de précision.</p>
<h2>Article 3 – Financement</h2>
<p>Coût d'installation : {{cout_installation}} FCFA. Mise en service prévue le {{date_mise_en_service}}.</p>
<h2>Article 4 – Garantie et maintenance</h2>
<p>Garantie pièces et main-d'oeuvre : 2 ans. Contrat de maintenance annuel proposé en option.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_erp_agricole',
    name: "Accord de service de gestion de ferme digitale (ERP agricole)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord de déploiement et d'utilisation d'un logiciel ERP agricole pour la gestion intégrée des opérations culturales, des stocks, des finances et des ressources humaines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_editeur_erp',label:"Nom de l'éditeur ERP",type:'text',required:true},
      {key:'nom_exploitation',label:"Nom de l'exploitation bénéficiaire",type:'text',required:true},
      {key:'modules_actives',label:"Modules ERP activés",type:'textarea',required:true},
      {key:'abonnement_annuel',label:"Abonnement annuel (FCFA)",type:'text',required:true},
      {key:'date_deploiement',label:"Date de déploiement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – ERP AGRICOLE DIGITAL</h1>
<p>Éditeur : <strong>{{nom_editeur_erp}}</strong> – Exploitation : <strong>{{nom_exploitation}}</strong></p>
<h2>Article 1 – Modules activés</h2>
<p>{{modules_actives}}</p>
<h2>Article 2 – Formation</h2>
<p>Formation initiale de 5 jours incluse. Support technique disponible 6j/7 par téléphone et chat.</p>
<h2>Article 3 – Tarification</h2>
<p>Abonnement annuel : {{abonnement_annuel}} FCFA. Déploiement prévu le {{date_deploiement}}.</p>
<h2>Article 4 – Données</h2>
<p>Les données de l'exploitation restent la propriété exclusive de l'agriculteur. L'éditeur s'engage à ne pas les commercialiser.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_ecommerce_agricole',
    name: "Accord de service de plateforme e-commerce agricole (marché en ligne)",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Accord d'utilisation d'une plateforme de commerce en ligne pour la vente directe des produits agricoles aux consommateurs finaux ou à la restauration.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_plateforme',label:"Nom de la plateforme e-commerce",type:'text',required:true},
      {key:'nom_producteur',label:"Nom du producteur agricole",type:'text',required:true},
      {key:'produits_vendus',label:"Produits mis en vente",type:'textarea',required:true},
      {key:'commission_plateforme',label:"Commission de la plateforme (%)",type:'text',required:true},
      {key:'date_ouverture_boutique',label:"Date d'ouverture de la boutique en ligne",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PLATEFORME E-COMMERCE AGRICOLE</h1>
<p>Plateforme : <strong>{{nom_plateforme}}</strong> – Producteur : <strong>{{nom_producteur}}</strong></p>
<h2>Article 1 – Produits référencés</h2>
<p>{{produits_vendus}}</p>
<h2>Article 2 – Commission</h2>
<p>La plateforme perçoit une commission de {{commission_plateforme}}% sur chaque vente réalisée.</p>
<h2>Article 3 – Logistique</h2>
<p>La plateforme assure la mise en relation. La livraison et la gestion des retours sont à la charge du producteur, sauf accord contraire.</p>
<h2>Article 4 – Ouverture</h2>
<p>La boutique en ligne ouvre le {{date_ouverture_boutique}}.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_appli_mobile_agriculteurs',
    name: "Accord de service d'applications mobiles pour agriculteurs",
    category: 'agro_environnement', price: 3000, priceMax: 8000,
    description: "Accord de licence et de support pour l'utilisation d'une application mobile agricole offrant conseils agronomiques, météo locale, prix du marché et accès aux services.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_appli',label:"Nom de l'application mobile",type:'text',required:true},
      {key:'editeur_appli',label:"Éditeur de l'application",type:'text',required:true},
      {key:'nombre_utilisateurs',label:"Nombre d'utilisateurs licenciés",type:'text',required:true},
      {key:'fonctionnalites',label:"Fonctionnalités incluses",type:'textarea',required:true},
      {key:'abonnement_mensuel',label:"Abonnement mensuel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – APPLICATION MOBILE AGRICULTEURS</h1>
<p>Application : <strong>{{nom_appli}}</strong> – Éditeur : <strong>{{editeur_appli}}</strong></p>
<h2>Article 1 – Licence</h2>
<p>Licence accordée pour <strong>{{nombre_utilisateurs}}</strong> utilisateurs.</p>
<h2>Article 2 – Fonctionnalités</h2>
<p>{{fonctionnalites}}</p>
<h2>Article 3 – Abonnement</h2>
<p>Abonnement mensuel : {{abonnement_mensuel}} FCFA. Accès disponible sur Android et iOS.</p>
<h2>Article 4 – Disponibilité hors ligne</h2>
<p>Les fonctionnalités essentielles sont disponibles sans connexion internet, avec synchronisation lors de la reconnexion.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_conseil_agronome_digital',
    name: "Accord de service de conseil agronomique en ligne (agronome digital)",
    category: 'agro_environnement', price: 3500, priceMax: 10000,
    description: "Accord de fourniture de conseils agronomiques personnalisés via plateforme numérique, incluant diagnostic à distance, recommandations de fertilisation et gestion des ravageurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_agronome',label:"Nom de l'agronome conseil",type:'text',required:true},
      {key:'nom_agriculteur',label:"Nom de l'agriculteur",type:'text',required:true},
      {key:'cultures_suivies',label:"Cultures suivies",type:'text',required:true},
      {key:'frequence_consultations',label:"Fréquence des consultations en ligne",type:'text',required:true},
      {key:'abonnement_mensuel',label:"Abonnement mensuel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL AGRONOMIQUE EN LIGNE</h1>
<p>Agronome : <strong>{{nom_agronome}}</strong> – Agriculteur : <strong>{{nom_agriculteur}}</strong></p>
<h2>Article 1 – Cultures concernées</h2>
<p>Cultures suivies : <strong>{{cultures_suivies}}</strong></p>
<h2>Article 2 – Modalités de conseil</h2>
<p>Consultations via visioconférence, messagerie instantanée et analyse de photos/données envoyées par l'agriculteur. Fréquence : {{frequence_consultations}}.</p>
<h2>Article 3 – Tarif</h2>
<p>Abonnement mensuel : {{abonnement_mensuel}} FCFA incluant les rapports de recommandations.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_blockchain_tracabilite',
    name: "Accord de service de blockchain pour la traçabilité agricole",
    category: 'agro_environnement', price: 7000, priceMax: 20000,
    description: "Accord de déploiement d'une solution blockchain pour la traçabilité des produits agricoles de la ferme à la table, garantissant l'authenticité et la transparence.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_fournisseur_blockchain',label:"Nom du fournisseur de solution blockchain",type:'text',required:true},
      {key:'nom_cooperative',label:"Nom de la coopérative ou filière",type:'text',required:true},
      {key:'produits_traces',label:"Produits dont la traçabilité est assurée",type:'textarea',required:true},
      {key:'date_go_live',label:"Date de mise en production",type:'date',required:true},
      {key:'cout_annuel',label:"Coût annuel de la solution (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – BLOCKCHAIN TRAÇABILITÉ AGRICOLE</h1>
<p>Fournisseur : <strong>{{nom_fournisseur_blockchain}}</strong> – Client : <strong>{{nom_cooperative}}</strong></p>
<h2>Article 1 – Produits tracés</h2>
<p>{{produits_traces}}</p>
<h2>Article 2 – Fonctionnement</h2>
<p>Chaque lot de production reçoit un identifiant unique enregistré sur la blockchain. Les consommateurs peuvent scanner le QR code pour accéder à l'historique complet du produit.</p>
<h2>Article 3 – Mise en production et coût</h2>
<p>Date de mise en production : {{date_go_live}}. Coût annuel : {{cout_annuel}} FCFA.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_ia_prevision_rendements',
    name: "Accord de service d'IA pour la prévision des rendements",
    category: 'agro_environnement', price: 7000, priceMax: 20000,
    description: "Accord de fourniture d'un service d'intelligence artificielle pour la prévision des rendements agricoles basée sur l'analyse des données satellitaires, météo et historiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_fournisseur_ia',label:"Nom du fournisseur IA",type:'text',required:true},
      {key:'nom_client',label:"Nom du client (coopérative/filière)",type:'text',required:true},
      {key:'cultures_modelisees',label:"Cultures modélisées",type:'text',required:true},
      {key:'precision_attendue',label:"Précision de prévision attendue (%)",type:'text',required:true},
      {key:'cout_service',label:"Coût du service (FCFA/saison)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – IA PRÉVISION DES RENDEMENTS AGRICOLES</h1>
<p>Fournisseur IA : <strong>{{nom_fournisseur_ia}}</strong> – Client : <strong>{{nom_client}}</strong></p>
<h2>Article 1 – Modèles déployés</h2>
<p>Cultures modélisées : <strong>{{cultures_modelisees}}</strong>. Précision attendue : <strong>{{precision_attendue}}%</strong>.</p>
<h2>Article 2 – Données utilisées</h2>
<p>Le modèle intègre des données satellitaires, météorologiques, pédologiques et historiques de rendement pour produire ses prévisions.</p>
<h2>Article 3 – Livrables</h2>
<p>Rapport de prévision 30 jours avant la récolte. Tableau de bord interactif mis à jour hebdomadairement.</p>
<h2>Article 4 – Tarif</h2>
<p>Coût par saison agricole : {{cout_service}} FCFA.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_agri_fintech',
    name: "Accord de service de financement agricole digital (agri-fintech)",
    category: 'agro_environnement', price: 5000, priceMax: 14000,
    description: "Accord de financement agricole via plateforme numérique, couvrant le crédit de campagne, le micro-crédit pour intrants et les solutions de paiement mobile pour agriculteurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_plateforme_fintech',label:"Nom de la plateforme fintech",type:'text',required:true},
      {key:'nom_agriculteur',label:"Nom de l'agriculteur bénéficiaire",type:'text',required:true},
      {key:'montant_credit',label:"Montant du crédit accordé (FCFA)",type:'text',required:true},
      {key:'taux_interet',label:"Taux d'intérêt annuel (%)",type:'text',required:true},
      {key:'date_remboursement',label:"Date limite de remboursement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – FINANCEMENT AGRICOLE DIGITAL</h1>
<p>Plateforme : <strong>{{nom_plateforme_fintech}}</strong> – Bénéficiaire : <strong>{{nom_agriculteur}}</strong></p>
<h2>Article 1 – Crédit accordé</h2>
<p>Montant : <strong>{{montant_credit}}</strong> FCFA au taux d'intérêt de <strong>{{taux_interet}}%</strong> l'an.</p>
<h2>Article 2 – Utilisation des fonds</h2>
<p>Le crédit est exclusivement destiné à l'achat d'intrants agricoles, de semences certifiées ou d'équipements de production.</p>
<h2>Article 3 – Remboursement</h2>
<p>Remboursement intégral dû au plus tard le {{date_remboursement}}. Le remboursement s'effectue via mobile money.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_assurance_parametrique',
    name: "Accord de service d'assurance agricole paramétrique (satellite)",
    category: 'agro_environnement', price: 5000, priceMax: 14000,
    description: "Accord d'assurance agricole paramétrique basée sur des indices satellitaires (NDVI, précipitations), déclenchant automatiquement les indemnisations sans expertise terrain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_assureur',label:"Nom de l'assureur",type:'text',required:true},
      {key:'nom_assure',label:"Nom de l'assuré (agriculteur/coopérative)",type:'text',required:true},
      {key:'cultures_assures',label:"Cultures assurées",type:'text',required:true},
      {key:'indice_declenchement',label:"Indice de déclenchement de l'indemnisation",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'ASSURANCE AGRICOLE PARAMÉTRIQUE SATELLITAIRE</h1>
<p>Assureur : <strong>{{nom_assureur}}</strong> – Assuré : <strong>{{nom_assure}}</strong></p>
<h2>Article 1 – Cultures couvertes</h2>
<p><strong>{{cultures_assures}}</strong></p>
<h2>Article 2 – Mécanisme paramétrique</h2>
<p>L'indemnisation est déclenchée automatiquement lorsque l'indice satellitaire (<strong>{{indice_declenchement}}</strong>) descend sous le seuil prédéfini au contrat.</p>
<h2>Article 3 – Prime</h2>
<p>Prime annuelle : {{prime_annuelle}} FCFA, payable en début de campagne agricole.</p>
<h2>Article 4 – Délai d'indemnisation</h2>
<p>Paiement de l'indemnité dans les 30 jours suivant le déclenchement du paramètre.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_cooperative_digitale',
    name: "Accord de service de coopérative agricole digitale",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Accord de digitalisation des services d'une coopérative agricole incluant gestion des membres, collecte des données de production, paiements et mise en marché.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_cooperative',label:"Nom de la coopérative",type:'text',required:true},
      {key:'nom_fournisseur_solution',label:"Nom du fournisseur de solution digitale",type:'text',required:true},
      {key:'nombre_membres',label:"Nombre de membres de la coopérative",type:'text',required:true},
      {key:'services_digitalises',label:"Services à digitaliser",type:'textarea',required:true},
      {key:'cout_deploiement',label:"Coût de déploiement (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – COOPÉRATIVE AGRICOLE DIGITALE</h1>
<p>Coopérative : <strong>{{nom_cooperative}}</strong> ({{nombre_membres}} membres) – Fournisseur : <strong>{{nom_fournisseur_solution}}</strong></p>
<h2>Article 1 – Services digitalisés</h2>
<p>{{services_digitalises}}</p>
<h2>Article 2 – Déploiement</h2>
<p>Coût de déploiement : {{cout_deploiement}} FCFA. Formation des gérants et agents de terrain incluse.</p>
<h2>Article 3 – Propriété des données</h2>
<p>Les données des membres appartiennent exclusivement à la coopérative. Le fournisseur n'y accède qu'aux fins de maintenance technique.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_achat_groupe_intrants',
    name: "Accord de service de plateforme achat groupé intrants",
    category: 'agro_environnement', price: 3500, priceMax: 10000,
    description: "Accord d'utilisation d'une plateforme digitale pour l'organisation d'achats groupés d'intrants agricoles (semences, engrais, pesticides) permettant des économies d'échelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_plateforme',label:"Nom de la plateforme d'achat groupé",type:'text',required:true},
      {key:'nom_groupement',label:"Nom du groupement d'agriculteurs",type:'text',required:true},
      {key:'intrants_commandes',label:"Intrants commandés",type:'textarea',required:true},
      {key:'remise_obtenue',label:"Remise obtenue grâce au groupement (%)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PLATEFORME ACHAT GROUPÉ INTRANTS</h1>
<p>Plateforme : <strong>{{nom_plateforme}}</strong> – Groupement : <strong>{{nom_groupement}}</strong></p>
<h2>Article 1 – Intrants commandés</h2>
<p>{{intrants_commandes}}</p>
<h2>Article 2 – Avantage financier</h2>
<p>Remise obtenue grâce à l'achat groupé : <strong>{{remise_obtenue}}%</strong> sur les prix du marché.</p>
<h2>Article 3 – Livraison</h2>
<p>Livraison prévue le {{date_livraison}} aux points de collecte désignés par le groupement.</p>
<h2>Article 4 – Paiement</h2>
<p>Paiement sécurisé via mobile money avant expédition des commandes.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_marche_intrants_ligne',
    name: "Accord de service de marché aux intrants en ligne",
    category: 'agro_environnement', price: 3500, priceMax: 10000,
    description: "Accord d'utilisation d'une marketplace en ligne dédiée aux intrants agricoles certifiés, mettant en relation fournisseurs agréés et agriculteurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_marketplace',label:"Nom de la marketplace intrants",type:'text',required:true},
      {key:'nom_fournisseur',label:"Nom du fournisseur d'intrants",type:'text',required:true},
      {key:'produits_references',label:"Produits référencés sur la plateforme",type:'textarea',required:true},
      {key:'commission_vente',label:"Commission par vente (%)",type:'text',required:true},
      {key:'zone_livraison',label:"Zone de livraison couverte",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MARCHÉ AUX INTRANTS EN LIGNE</h1>
<p>Marketplace : <strong>{{nom_marketplace}}</strong> – Fournisseur : <strong>{{nom_fournisseur}}</strong></p>
<h2>Article 1 – Référencement</h2>
<p>Produits référencés : {{produits_references}}</p>
<h2>Article 2 – Commission</h2>
<p>Commission sur vente : {{commission_vente}}%. Le paiement de la commission s'effectue mensuellement.</p>
<h2>Article 3 – Zone de livraison</h2>
<p>Livraisons assurées dans la zone : {{zone_livraison}}.</p>
<h2>Article 4 – Qualité</h2>
<p>Seuls les produits homologués par les autorités nationales compétentes peuvent être référencés sur la plateforme.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_chaine_froid_agricole',
    name: "Accord de service de gestion de la chaîne de froid agricole",
    category: 'agro_environnement', price: 6000, priceMax: 17000,
    description: "Accord de gestion digitale de la chaîne de froid pour les produits agricoles périssables (fruits, légumes, lait) incluant monitoring IoT des températures et alertes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_prestataire',label:"Nom du prestataire logistique froid",type:'text',required:true},
      {key:'nom_producteur',label:"Nom du producteur agricole",type:'text',required:true},
      {key:'produits_concernes',label:"Produits périssables concernés",type:'text',required:true},
      {key:'temperature_requise',label:"Plage de température requise",type:'text',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – GESTION DE LA CHAÎNE DE FROID AGRICOLE</h1>
<p>Prestataire : <strong>{{nom_prestataire}}</strong> – Producteur : <strong>{{nom_producteur}}</strong></p>
<h2>Article 1 – Produits couverts</h2>
<p>Produits : <strong>{{produits_concernes}}</strong> – Température maintenue : <strong>{{temperature_requise}}</strong></p>
<h2>Article 2 – Monitoring</h2>
<p>Surveillance de la température 24h/24 via capteurs IoT avec alertes SMS en cas de rupture de la chaîne de froid.</p>
<h2>Article 3 – Responsabilité</h2>
<p>Le prestataire est responsable des pertes dues à une défaillance de l'équipement de réfrigération sous sa garde.</p>
<h2>Article 4 – Tarif</h2>
<p>Tarif mensuel forfaitaire : {{tarif_mensuel}} FCFA.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_certification_bio_ligne',
    name: "Accord de service de certification bio en ligne",
    category: 'agro_environnement', price: 5000, priceMax: 14000,
    description: "Accord de délivrance de certification biologique via plateforme numérique, incluant dépôt de dossier en ligne, audit virtuel et délivrance du certificat électronique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_organisme_cert',label:"Nom de l'organisme de certification",type:'text',required:true},
      {key:'nom_producteur',label:"Nom du producteur",type:'text',required:true},
      {key:'produits_a_certifier',label:"Produits à certifier bio",type:'textarea',required:true},
      {key:'superficie_bio',label:"Superficie en agriculture biologique (ha)",type:'text',required:true},
      {key:'date_audit_virtuel',label:"Date de l'audit virtuel",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CERTIFICATION BIO EN LIGNE</h1>
<p>Organisme : <strong>{{nom_organisme_cert}}</strong> – Producteur : <strong>{{nom_producteur}}</strong></p>
<h2>Article 1 – Produits concernés</h2>
<p>{{produits_a_certifier}} – Superficie : <strong>{{superficie_bio}}</strong> ha.</p>
<h2>Article 2 – Processus de certification</h2>
<p>Dépôt du dossier en ligne, audit documentaire et visite virtuelle programmée le {{date_audit_virtuel}}, délivrance du certificat électronique sous 30 jours.</p>
<h2>Article 3 – Obligations du producteur</h2>
<p>Tenue d'un cahier de traçabilité des pratiques culturales conforme au cahier des charges de l'agriculture biologique.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_test_sol_digital',
    name: "Accord de service de test de sol digital (laboratoire mobile)",
    category: 'agro_environnement', price: 3500, priceMax: 10000,
    description: "Accord de prestation d'analyses de sol par laboratoire mobile numérique avec rendu des résultats en temps réel et recommandations de fertilisation personnalisées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_prestataire_labo',label:"Nom du prestataire laboratoire mobile",type:'text',required:true},
      {key:'nom_agriculteur',label:"Nom de l'agriculteur",type:'text',required:true},
      {key:'nombre_echantillons',label:"Nombre d'échantillons de sol",type:'text',required:true},
      {key:'parametres_analyses',label:"Paramètres analysés (pH, N, P, K...)",type:'textarea',required:true},
      {key:'cout_par_echantillon',label:"Coût par échantillon (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – TEST DE SOL DIGITAL (LABORATOIRE MOBILE)</h1>
<p>Prestataire : <strong>{{nom_prestataire_labo}}</strong> – Agriculteur : <strong>{{nom_agriculteur}}</strong></p>
<h2>Article 1 – Analyses</h2>
<p>Nombre d'échantillons : <strong>{{nombre_echantillons}}</strong></p>
<p>Paramètres analysés : {{parametres_analyses}}</p>
<h2>Article 2 – Rendu des résultats</h2>
<p>Résultats disponibles en temps réel via l'application mobile. Rapport détaillé avec carte de fertilité et recommandations de fumure envoyé dans les 2h.</p>
<h2>Article 3 – Tarif</h2>
<p>Coût : {{cout_par_echantillon}} FCFA par échantillon.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_tracabilite_boeuf_rfid',
    name: "Accord de service de traçabilité du boeuf (RFID)",
    category: 'agro_environnement', price: 5000, priceMax: 14000,
    description: "Accord de mise en place d'un système de traçabilité RFID pour les bovins destinés à la boucherie, de l'élevage à l'abattoir et jusqu'au point de vente.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_integrateur',label:"Nom de l'intégrateur RFID",type:'text',required:true},
      {key:'nom_operateur_filiere',label:"Nom de l'opérateur de la filière bovine",type:'text',required:true},
      {key:'nombre_bovins_taggues',label:"Nombre de bovins à tagguer",type:'text',required:true},
      {key:'maillons_couverts',label:"Maillons de la chaîne couverts",type:'textarea',required:true},
      {key:'cout_tag_unitaire',label:"Coût du tag RFID unitaire (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – TRAÇABILITÉ BOVINE RFID</h1>
<p>Intégrateur : <strong>{{nom_integrateur}}</strong> – Filière : <strong>{{nom_operateur_filiere}}</strong></p>
<h2>Article 1 – Périmètre</h2>
<p>{{nombre_bovins_taggues}} bovins équipés de tags RFID.</p>
<p>Maillons couverts : {{maillons_couverts}}</p>
<h2>Article 2 – Fonctionnement</h2>
<p>Chaque bovin est identifié par un tag RFID unique. Les mouvements et interventions vétérinaires sont enregistrés en temps réel dans la base de données centrale.</p>
<h2>Article 3 – Coût</h2>
<p>Tag RFID : {{cout_tag_unitaire}} FCFA/unité. Logiciel de gestion de la traçabilité inclus.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_subventions_digitales',
    name: "Accord de service de gestion digitale des subventions agricoles",
    category: 'agro_environnement', price: 5000, priceMax: 14000,
    description: "Accord de gestion numérique des subventions agricoles permettant aux bénéficiaires de soumettre leurs demandes en ligne et de recevoir les paiements via mobile money.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'autorite_gestionnaire',label:"Autorité gestionnaire des subventions",type:'text',required:true},
      {key:'nom_plateforme_gestion',label:"Nom de la plateforme de gestion",type:'text',required:true},
      {key:'types_subventions',label:"Types de subventions gérées",type:'textarea',required:true},
      {key:'budget_total_gere',label:"Budget total géré (FCFA)",type:'text',required:true},
      {key:'date_ouverture_campagne',label:"Date d'ouverture de la campagne de dépôt",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – GESTION DIGITALE DES SUBVENTIONS AGRICOLES</h1>
<p>Autorité : <strong>{{autorite_gestionnaire}}</strong> – Plateforme : <strong>{{nom_plateforme_gestion}}</strong></p>
<h2>Article 1 – Subventions concernées</h2>
<p>{{types_subventions}}</p>
<h2>Article 2 – Budget</h2>
<p>Budget total géré via la plateforme : <strong>{{budget_total_gere}}</strong> FCFA.</p>
<h2>Article 3 – Processus</h2>
<p>Dépôt des demandes en ligne à compter du {{date_ouverture_campagne}}. Vérification automatisée des critères d'éligibilité. Paiement via mobile money après validation.</p>
<h2>Article 4 – Transparence</h2>
<p>Tableau de bord public permettant de suivre le taux d'utilisation du budget et le nombre de bénéficiaires.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_rapport_performance_precision',
    name: "Rapport de performance exploitation agricole de précision",
    category: 'agro_environnement', price: 4000, priceMax: 11000,
    description: "Rapport annuel de performance d'une exploitation en agriculture de précision, analysant les indicateurs clés de rendement, d'efficience des intrants et de durabilité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_exploitation',label:"Nom de l'exploitation",type:'text',required:true},
      {key:'gerant_exploitation',label:"Gérant de l'exploitation",type:'text',required:true},
      {key:'annee_rapport',label:"Année du rapport",type:'text',required:true},
      {key:'superficie_totale',label:"Superficie totale exploitée (ha)",type:'text',required:true},
      {key:'rendements_obtenus',label:"Rendements obtenus par culture",type:'textarea',required:true},
      {key:'date_rapport',label:"Date d'établissement du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – EXPLOITATION AGRICOLE DE PRÉCISION</h1>
<p>Exploitation : <strong>{{nom_exploitation}}</strong> – Gérant : <strong>{{gerant_exploitation}}</strong></p>
<p>Année : <strong>{{annee_rapport}}</strong> – Surface totale : <strong>{{superficie_totale}}</strong> ha</p>
<h2>1. Rendements</h2>
<p>{{rendements_obtenus}}</p>
<h2>2. Efficience des intrants</h2>
<p>Analyse de la consommation d'eau, d'engrais et de pesticides par rapport aux doses recommandées et aux objectifs de durabilité.</p>
<h2>3. Indicateurs de durabilité</h2>
<p>Empreinte carbone, bilan humique, biodiversité des parcelles.</p>
<h2>4. Recommandations</h2>
<p>Axes d'amélioration pour la prochaine campagne agricole.</p>
<p>Établi le {{date_rapport}}</p></div>`
  },
  {
    code: 'agr3_plan_transition_digitale',
    name: "Plan de transition vers l'agriculture digitale",
    category: 'agro_environnement', price: 5000, priceMax: 14000,
    description: "Plan stratégique de transition d'une exploitation ou d'une filière agricole vers les pratiques de l'agriculture digitale et de précision, avec feuille de route et budget.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_exploitation_filiere',label:"Nom de l'exploitation ou filière",type:'text',required:true},
      {key:'consultant_agritech',label:"Consultant AgriTech mandaté",type:'text',required:true},
      {key:'objectifs_transition',label:"Objectifs de la transition digitale",type:'textarea',required:true},
      {key:'budget_transition',label:"Budget alloué à la transition (FCFA)",type:'text',required:true},
      {key:'echeance_plan',label:"Échéance du plan de transition",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE TRANSITION VERS L'AGRICULTURE DIGITALE</h1>
<p>Bénéficiaire : <strong>{{nom_exploitation_filiere}}</strong> – Consultant : <strong>{{consultant_agritech}}</strong></p>
<h2>1. Objectifs</h2>
<p>{{objectifs_transition}}</p>
<h2>2. Feuille de route</h2>
<p>Phase 1 (Diagnostic) : cartographie des besoins et des ressources existantes.<br/>
Phase 2 (Équipement) : acquisition et déploiement des outils digitaux prioritaires.<br/>
Phase 3 (Formation) : renforcement des capacités des équipes.<br/>
Phase 4 (Optimisation) : suivi des performances et ajustements.</p>
<h2>3. Budget</h2>
<p>Budget total alloué : {{budget_transition}} FCFA. Échéance : {{echeance_plan}}.</p></div>`
  },
  {
    code: 'agr3_formation_jeunes_agritech',
    name: "Accord de service de formation des jeunes agriculteurs (AgriTech)",
    category: 'agro_environnement', price: 4000, priceMax: 11000,
    description: "Accord de formation des jeunes agriculteurs aux technologies AgriTech, couvrant l'utilisation des drones, des applications mobiles, des capteurs IoT et de la gestion de données.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_centre_formation',label:"Nom du centre de formation AgriTech",type:'text',required:true},
      {key:'nombre_jeunes_formes',label:"Nombre de jeunes à former",type:'text',required:true},
      {key:'modules_formation',label:"Modules de formation AgriTech",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la formation",type:'date',required:true},
      {key:'duree_totale',label:"Durée totale de la formation",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – FORMATION JEUNES AGRICULTEURS AGRITECH</h1>
<p>Centre : <strong>{{nom_centre_formation}}</strong> – Bénéficiaires : <strong>{{nombre_jeunes_formes}}</strong> jeunes agriculteurs</p>
<h2>Article 1 – Modules pédagogiques</h2>
<p>{{modules_formation}}</p>
<h2>Article 2 – Calendrier</h2>
<p>Formation débutant le {{date_debut}}, d'une durée totale de {{duree_totale}}, alternant théorie et pratique sur le terrain.</p>
<h2>Article 3 – Certification</h2>
<p>Les participants reçoivent une attestation reconnue par le Ministère de l'Agriculture et du Développement Rural.</p>
<h2>Article 4 – Accompagnement post-formation</h2>
<p>Suivi et mentorat de 6 mois après la formation pour soutenir l'insertion professionnelle des jeunes agriculteurs.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_partenariat_minader',
    name: "Accord de partenariat MINADER-AgriTech",
    category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Accord de partenariat entre le Ministère de l'Agriculture et du Développement Rural (MINADER) et une entreprise AgriTech pour le déploiement de solutions numériques agricoles à grande échelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_entreprise_agritech',label:"Nom de l'entreprise AgriTech",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'zones_intervention',label:"Zones géographiques d'intervention",type:'text',required:true},
      {key:'budget_partenariat',label:"Budget du partenariat (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT MINADER – AGRITECH</h1>
<p>Entre le Ministère de l'Agriculture et du Développement Rural (MINADER) et <strong>{{nom_entreprise_agritech}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>{{objet_partenariat}}</p>
<h2>Article 2 – Zones d'intervention</h2>
<p>{{zones_intervention}}</p>
<h2>Article 3 – Budget et financement</h2>
<p>Budget total du partenariat : {{budget_partenariat}} FCFA. Le financement sera assuré conjointement par l'État et l'entreprise partenaire selon des modalités définies en annexe.</p>
<h2>Article 4 – Durée</h2>
<p>Accord signé le {{date_signature}} pour une durée de 3 ans renouvelable.</p>
<h2>Article 5 – Gouvernance</h2>
<p>Un comité de pilotage paritaire se réunit trimestriellement pour évaluer la mise en oeuvre du partenariat.</p>
<p>Signatures des parties</p></div>`
  },
  {
    code: 'agr3_charte_agriculture_durable',
    name: "Charte de l'agriculture durable et digitale en Afrique",
    category: 'agro_environnement', price: 2500, priceMax: 7000,
    description: "Charte d'engagement des acteurs de l'agri-chaîne pour une agriculture africaine durable, intégrant les outils digitaux au service de la sécurité alimentaire et environnementale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_signataire',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'representant',label:"Représentant de l'organisation",type:'text',required:true},
      {key:'engagements_durabilite',label:"Engagements spécifiques pour la durabilité",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'AGRICULTURE DURABLE ET DIGITALE EN AFRIQUE</h1>
<p>Signataire : <strong>{{nom_signataire}}</strong>, représenté(e) par <strong>{{representant}}</strong></p>
<h2>Préambule</h2>
<p>Face aux défis du changement climatique et de la sécurité alimentaire, nous, acteurs de l'agriculture africaine, nous engageons à promouvoir des pratiques agricoles durables et à adopter les innovations digitales au service de nos agriculteurs et de nos territoires.</p>
<h2>Vision</h2>
<p>Une agriculture africaine productive, résiliente, inclusive et respectueuse de l'environnement, soutenue par les technologies de l'information et de la communication.</p>
<h2>Nos engagements</h2>
<p>{{engagements_durabilite}}</p>
<h2>Suivi</h2>
<p>Les signataires se réunissent annuellement pour évaluer la mise en oeuvre de la présente charte et partager les bonnes pratiques.</p>
<p>Signé le {{date_signature}}. Signature du représentant</p></div>`
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
  console.log(`Batch 78b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
