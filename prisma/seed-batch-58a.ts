import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── SANTÉ PUBLIQUE (spu_) ───────────────────────────────────────────────
  {
    code: 'spu_riposte_epidemique',
    name: "Plan national de riposte épidémique",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Plan national de riposte épidémique pour la Côte d'Ivoire, conforme aux normes RSI-OMS.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'organisme',label:"Organisme responsable",type:'text',required:true},
      {key:'pathogene',label:"Agent pathogène ciblé",type:'text',required:true},
      {key:'zone_geographique',label:"Zone géographique concernée",type:'text',required:true},
      {key:'date_activation',label:"Date d'activation du plan",type:'date',required:true},
      {key:'coordinateur',label:"Coordinateur national",type:'text',required:true},
      {key:'objectifs',label:"Objectifs stratégiques",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN NATIONAL DE RIPOSTE ÉPIDÉMIQUE</h1>
<p>République de Côte d'Ivoire — Ministère de la Santé et de l'Hygiène Publique</p>
<h2>1. Organisme Responsable</h2><p>{{organisme}}</p>
<h2>2. Agent Pathogène Ciblé</h2><p>{{pathogene}}</p>
<h2>3. Zone Géographique</h2><p>{{zone_geographique}}</p>
<h2>4. Date d'Activation</h2><p>{{date_activation}}</p>
<h2>5. Coordinateur National</h2><p>{{coordinateur}}</p>
<h2>6. Objectifs Stratégiques</h2><p>{{objectifs}}</p>
<p>Ce plan est établi en conformité avec le Règlement Sanitaire International (RSI 2005) et les directives de l'OMS-AFRO.</p></div>`,
  },
  {
    code: 'spu_surveillance_epidemiologique',
    name: "Accord de surveillance épidémiologique",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Accord-cadre de surveillance épidémiologique entre structures sanitaires en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'structure_a',label:"Structure partenaire A",type:'text',required:true},
      {key:'structure_b',label:"Structure partenaire B",type:'text',required:true},
      {key:'maladies_surveillees',label:"Maladies sous surveillance",type:'textarea',required:true},
      {key:'frequence_rapport',label:"Fréquence des rapports",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SURVEILLANCE ÉPIDÉMIOLOGIQUE</h1>
<p>Entre : {{structure_a}} et {{structure_b}}</p>
<h2>Objet</h2><p>Les parties conviennent de mettre en place un système commun de surveillance épidémiologique.</p>
<h2>Maladies Sous Surveillance</h2><p>{{maladies_surveillees}}</p>
<h2>Fréquence des Rapports</h2><p>{{frequence_rapport}}</p>
<h2>Date de Prise d'Effet</h2><p>{{date_debut}}</p>
<p>Fait à Abidjan, en deux (2) exemplaires originaux ayant même force probante.</p></div>`,
  },
  {
    code: 'spu_labo_biologie_moleculaire',
    name: "Contrat de service de laboratoire de biologie moléculaire",
    category: 'sante', price: 9000, priceMax: 27000,
    description: "Contrat de prestation de service de laboratoire de biologie moléculaire pour analyses diagnostiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'laboratoire',label:"Nom du laboratoire",type:'text',required:true},
      {key:'client',label:"Structure cliente",type:'text',required:true},
      {key:'analyses',label:"Types d'analyses commandées",type:'textarea',required:true},
      {key:'delai_rendu',label:"Délai de rendu des résultats",type:'text',required:true},
      {key:'tarification',label:"Tarification applicable",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — LABORATOIRE DE BIOLOGIE MOLÉCULAIRE</h1>
<h2>Parties</h2>
<p><strong>Prestataire :</strong> {{laboratoire}}</p>
<p><strong>Client :</strong> {{client}}</p>
<h2>Prestations</h2><p>{{analyses}}</p>
<h2>Délai de Rendu</h2><p>{{delai_rendu}}</p>
<h2>Tarification</h2><p>{{tarification}}</p>
<p>Les résultats sont transmis sous pli confidentiel et respectent les normes ISO 15189.</p></div>`,
  },
  {
    code: 'spu_depistage_vih_sida',
    name: "Accord de service de dépistage VIH/SIDA (IST)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Accord de prestation pour le dépistage du VIH/SIDA et des IST, cadre PNLS Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'centre_depistage',label:"Centre de dépistage",type:'text',required:true},
      {key:'partenaire',label:"Organisation partenaire",type:'text',required:true},
      {key:'population_cible',label:"Population cible",type:'text',required:true},
      {key:'nombre_tests_annuel',label:"Nombre de tests prévu par an",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DÉPISTAGE VIH/SIDA ET IST</h1>
<p>Programme National de Lutte contre le SIDA (PNLS) — Côte d'Ivoire</p>
<h2>Centre de Dépistage</h2><p>{{centre_depistage}}</p>
<h2>Organisation Partenaire</h2><p>{{partenaire}}</p>
<h2>Population Cible</h2><p>{{population_cible}}</p>
<h2>Objectif Annuel</h2><p>{{nombre_tests_annuel}} tests prévus</p>
<h2>Date de Convention</h2><p>{{date_convention}}</p>
<p>La confidentialité des résultats est garantie conformément à la loi ivoirienne n°92-570 relative aux droits du patient.</p></div>`,
  },
  {
    code: 'spu_depistage_tuberculose',
    name: "Accord de service de dépistage tuberculose",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Accord de service pour le dépistage et la prise en charge de la tuberculose, cadre PNLT.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'centre_sante',label:"Centre de santé",type:'text',required:true},
      {key:'responsable_pnlt',label:"Responsable PNLT désigné",type:'text',required:true},
      {key:'zone_couverture',label:"Zone de couverture",type:'text',required:true},
      {key:'protocole_traitement',label:"Protocole de traitement retenu",type:'textarea',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DÉPISTAGE TUBERCULOSE</h1>
<p>Programme National de Lutte contre la Tuberculose (PNLT) — Côte d'Ivoire</p>
<h2>Centre de Santé</h2><p>{{centre_sante}}</p>
<h2>Responsable PNLT</h2><p>{{responsable_pnlt}}</p>
<h2>Zone de Couverture</h2><p>{{zone_couverture}}</p>
<h2>Protocole de Traitement</h2><p>{{protocole_traitement}}</p>
<h2>Date de Démarrage</h2><p>{{date_debut}}</p>
<p>Le traitement DOTS est appliqué conformément aux directives OMS et du Ministère de la Santé.</p></div>`,
  },
  {
    code: 'spu_prise_en_charge_paludisme',
    name: "Accord de service de prise en charge paludisme",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Accord de service pour la prise en charge du paludisme dans le cadre du PNLP Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'formation_sanitaire',label:"Formation sanitaire",type:'text',required:true},
      {key:'district_sante',label:"District sanitaire",type:'text',required:true},
      {key:'protocole_cms',label:"Protocole CMS appliqué",type:'text',required:true},
      {key:'budget_alloue',label:"Budget alloué (FCFA)",type:'text',required:true},
      {key:'date_convention',label:"Date de convention",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PRISE EN CHARGE PALUDISME</h1>
<p>Programme National de Lutte contre le Paludisme (PNLP) — Côte d'Ivoire</p>
<h2>Formation Sanitaire</h2><p>{{formation_sanitaire}}</p>
<h2>District Sanitaire</h2><p>{{district_sante}}</p>
<h2>Protocole</h2><p>{{protocole_cms}}</p>
<h2>Budget Alloué</h2><p>{{budget_alloue}} FCFA</p>
<h2>Date de Convention</h2><p>{{date_convention}}</p>
<p>Le traitement par CTA est administré conformément aux directives du PNLP et de l'OMS-AFRO.</p></div>`,
  },
  {
    code: 'spu_vaccination_epi',
    name: "Accord de service de programme de vaccination nationale (EPI)",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Accord de service pour la mise en oeuvre du Programme Élargi de Vaccination (EPI) national.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'structure_sante',label:"Structure de santé",type:'text',required:true},
      {key:'region_sanitaire',label:"Région sanitaire",type:'text',required:true},
      {key:'vaccins_cibles',label:"Vaccins concernés",type:'textarea',required:true},
      {key:'population_cible',label:"Population cible annuelle",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PROGRAMME ÉLARGI DE VACCINATION (EPI)</h1>
<p>Ministère de la Santé — Direction de la Vaccination — Côte d'Ivoire</p>
<h2>Structure de Santé</h2><p>{{structure_sante}}</p>
<h2>Région Sanitaire</h2><p>{{region_sanitaire}}</p>
<h2>Vaccins Concernés</h2><p>{{vaccins_cibles}}</p>
<h2>Population Cible</h2><p>{{population_cible}}</p>
<h2>Date de Lancement</h2><p>{{date_lancement}}</p>
<p>La stratégie vaccinale respecte le calendrier EPI national et les recommandations GAVI/UNICEF.</p></div>`,
  },
  {
    code: 'spu_vaccination_meningite',
    name: "Accord de campagne de vaccination contre la méningite",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Accord de campagne de vaccination de masse contre la méningite (MenAfriVac / MenFive).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'coordinateur_campagne',label:"Coordinateur de campagne",type:'text',required:true},
      {key:'zones_cibles',label:"Zones et districts ciblés",type:'textarea',required:true},
      {key:'cible_vaccination',label:"Nombre de personnes à vacciner",type:'text',required:true},
      {key:'date_debut_campagne',label:"Date de début de la campagne",type:'date',required:true},
      {key:'date_fin_campagne',label:"Date de fin de la campagne",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CAMPAGNE — VACCINATION CONTRE LA MÉNINGITE</h1>
<p>Ministère de la Santé — Côte d'Ivoire</p>
<h2>Coordinateur de Campagne</h2><p>{{coordinateur_campagne}}</p>
<h2>Zones et Districts Ciblés</h2><p>{{zones_cibles}}</p>
<h2>Cible de Vaccination</h2><p>{{cible_vaccination}} personnes</p>
<h2>Période de Campagne</h2><p>Du {{date_debut_campagne}} au {{date_fin_campagne}}</p>
<p>La campagne est conduite en partenariat avec l'OMS, l'UNICEF et le GAVI selon les normes internationales.</p></div>`,
  },
  {
    code: 'spu_vaccination_fievre_jaune',
    name: "Accord de campagne de vaccination contre la fièvre jaune",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Accord de campagne de vaccination de masse contre la fièvre jaune en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'coordinateur',label:"Coordinateur régional",type:'text',required:true},
      {key:'districts_cibles',label:"Districts ciblés",type:'textarea',required:true},
      {key:'nombre_doses',label:"Nombre de doses disponibles",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'financement',label:"Source de financement",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CAMPAGNE — VACCINATION CONTRE LA FIÈVRE JAUNE</h1>
<p>Ministère de la Santé — Direction de la Vaccination — Côte d'Ivoire</p>
<h2>Coordinateur Régional</h2><p>{{coordinateur}}</p>
<h2>Districts Ciblés</h2><p>{{districts_cibles}}</p>
<h2>Doses Disponibles</h2><p>{{nombre_doses}}</p>
<h2>Date de Début</h2><p>{{date_debut}}</p>
<h2>Financement</h2><p>{{financement}}</p>
<p>Le vaccin anti-amaril est administré conformément aux exigences RSI pour les voyageurs et populations à risque.</p></div>`,
  },
  {
    code: 'spu_chaine_froid_vaccins',
    name: "Accord de service de chaîne du froid vaccins",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Accord de service pour la gestion et le maintien de la chaîne du froid des vaccins EPI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'fournisseur_service',label:"Fournisseur de service",type:'text',required:true},
      {key:'structure_sante',label:"Structure de santé bénéficiaire",type:'text',required:true},
      {key:'equipements_couverts',label:"Équipements de froid couverts",type:'textarea',required:true},
      {key:'temperature_requise',label:"Plage de température requise",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CHAÎNE DU FROID VACCINS</h1>
<p>République de Côte d'Ivoire — Direction de la Vaccination</p>
<h2>Fournisseur de Service</h2><p>{{fournisseur_service}}</p>
<h2>Structure Bénéficiaire</h2><p>{{structure_sante}}</p>
<h2>Équipements Couverts</h2><p>{{equipements_couverts}}</p>
<h2>Température Requise</h2><p>{{temperature_requise}}</p>
<h2>Date du Contrat</h2><p>{{date_contrat}}</p>
<p>Le prestataire s'engage à maintenir les équipements entre +2°C et +8°C conformément aux normes OMS CCE.</p></div>`,
  },
  {
    code: 'spu_medicaments_essentiels_pnlp',
    name: "Accord de gestion des médicaments essentiels (PNLP)",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Accord de gestion et de distribution des médicaments essentiels dans le cadre du PNLP.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'gestionnaire',label:"Structure gestionnaire",type:'text',required:true},
      {key:'district_cible',label:"District cible",type:'text',required:true},
      {key:'liste_medicaments',label:"Liste des médicaments essentiels",type:'textarea',required:true},
      {key:'quantite_trimestrielle',label:"Quantité trimestrielle prévue",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION — MÉDICAMENTS ESSENTIELS (PNLP)</h1>
<p>Programme National de Lutte contre le Paludisme — Côte d'Ivoire</p>
<h2>Structure Gestionnaire</h2><p>{{gestionnaire}}</p>
<h2>District Cible</h2><p>{{district_cible}}</p>
<h2>Médicaments Essentiels</h2><p>{{liste_medicaments}}</p>
<h2>Quantité Trimestrielle</h2><p>{{quantite_trimestrielle}}</p>
<h2>Date de l'Accord</h2><p>{{date_accord}}</p>
<p>La gestion est assurée selon les principes FIFO et les standards de bonnes pratiques de stockage.</p></div>`,
  },
  {
    code: 'spu_distribution_mild',
    name: "Accord de service de distribution de moustiquaires imprégnées (MILD)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Accord de service pour la distribution de moustiquaires imprégnées d'insecticide longue durée (MILD).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'organisation_distribution',label:"Organisation de distribution",type:'text',required:true},
      {key:'zones_beneficiaires',label:"Zones bénéficiaires",type:'textarea',required:true},
      {key:'nombre_mild',label:"Nombre de MILD à distribuer",type:'text',required:true},
      {key:'critere_beneficiaire',label:"Critères d'éligibilité des bénéficiaires",type:'textarea',required:true},
      {key:'date_campagne',label:"Date de la campagne",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DISTRIBUTION MOUSTIQUAIRES MILD</h1>
<p>Programme National de Lutte contre le Paludisme (PNLP) — Côte d'Ivoire</p>
<h2>Organisation Distributrice</h2><p>{{organisation_distribution}}</p>
<h2>Zones Bénéficiaires</h2><p>{{zones_beneficiaires}}</p>
<h2>Nombre de MILD</h2><p>{{nombre_mild}} moustiquaires</p>
<h2>Critères d'Éligibilité</h2><p>{{critere_beneficiaire}}</p>
<h2>Date de Campagne</h2><p>{{date_campagne}}</p>
<p>Les MILD sont conformes aux spécifications OMS et homologuées par le Ministère de la Santé.</p></div>`,
  },
  {
    code: 'spu_pulverisation_pid',
    name: "Accord de service de pulvérisation intradomiciliaire (PID)",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Accord de service pour les opérations de pulvérisation intradomiciliaire contre le paludisme.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'prestataire_pid',label:"Prestataire PID",type:'text',required:true},
      {key:'secteurs_cibles',label:"Secteurs et ménages ciblés",type:'textarea',required:true},
      {key:'insecticide',label:"Insecticide homologué utilisé",type:'text',required:true},
      {key:'nombre_menages',label:"Nombre de ménages à couvrir",type:'text',required:true},
      {key:'date_operation',label:"Date de l'opération",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PULVÉRISATION INTRADOMICILIAIRE (PID)</h1>
<p>Programme National de Lutte contre le Paludisme — Côte d'Ivoire</p>
<h2>Prestataire PID</h2><p>{{prestataire_pid}}</p>
<h2>Secteurs Ciblés</h2><p>{{secteurs_cibles}}</p>
<h2>Insecticide Utilisé</h2><p>{{insecticide}}</p>
<h2>Ménages à Couvrir</h2><p>{{nombre_menages}}</p>
<h2>Date d'Opération</h2><p>{{date_operation}}</p>
<p>Les opérateurs sont formés selon les normes OMS et portent les EPI réglementaires.</p></div>`,
  },
  {
    code: 'spu_nutrition_pronanut',
    name: "Accord de programme de nutrition (PRONANUT)",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Accord de programme de nutrition communautaire dans le cadre du PRONANUT national.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'structure_nutrition',label:"Structure de nutrition",type:'text',required:true},
      {key:'region_intervention',label:"Région d'intervention",type:'text',required:true},
      {key:'activites_nutrition',label:"Activités nutritionnelles prévues",type:'textarea',required:true},
      {key:'beneficiaires_cibles',label:"Bénéficiaires cibles",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROGRAMME — NUTRITION (PRONANUT)</h1>
<p>Programme National de Nutrition — Ministère de la Santé — Côte d'Ivoire</p>
<h2>Structure de Nutrition</h2><p>{{structure_nutrition}}</p>
<h2>Région d'Intervention</h2><p>{{region_intervention}}</p>
<h2>Activités Nutritionnelles</h2><p>{{activites_nutrition}}</p>
<h2>Bénéficiaires Cibles</h2><p>{{beneficiaires_cibles}}</p>
<h2>Date de Début</h2><p>{{date_debut}}</p>
<p>Le programme s'inscrit dans la Politique Nationale de Nutrition et les ODD relatifs à la sécurité alimentaire.</p></div>`,
  },
  {
    code: 'spu_malnutrition_aigue',
    name: "Accord de service de prise en charge de la malnutrition aiguë",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Accord de service pour la prise en charge de la malnutrition aiguë sévère (MAS) et modérée (MAM).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'centre_nutrition',label:"Centre de nutrition thérapeutique",type:'text',required:true},
      {key:'partenaire_financier',label:"Partenaire financier",type:'text',required:true},
      {key:'protocole_prise_charge',label:"Protocole de prise en charge",type:'textarea',required:true},
      {key:'capacite_accueil',label:"Capacité d'accueil par mois",type:'text',required:true},
      {key:'date_convention',label:"Date de convention",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PRISE EN CHARGE MALNUTRITION AIGUË</h1>
<p>Ministère de la Santé — Côte d'Ivoire</p>
<h2>Centre de Nutrition Thérapeutique</h2><p>{{centre_nutrition}}</p>
<h2>Partenaire Financier</h2><p>{{partenaire_financier}}</p>
<h2>Protocole</h2><p>{{protocole_prise_charge}}</p>
<h2>Capacité d'Accueil</h2><p>{{capacite_accueil}} cas par mois</p>
<h2>Date de Convention</h2><p>{{date_convention}}</p>
<p>Les ATPE (Aliments Thérapeutiques Prêts à l'Emploi) utilisés répondent aux normes OMS/UNICEF.</p></div>`,
  },
  {
    code: 'spu_ptme_vih',
    name: "Accord de programme de santé maternelle (PTME VIH)",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Accord de programme pour la Prévention de la Transmission Mère-Enfant du VIH (PTME).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'maternite',label:"Maternité ou structure de santé",type:'text',required:true},
      {key:'district_sante',label:"District sanitaire",type:'text',required:true},
      {key:'protocole_arv',label:"Protocole ARV appliqué",type:'text',required:true},
      {key:'objectif_couverture',label:"Objectif de couverture annuelle",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROGRAMME — PTME VIH</h1>
<p>Programme National de Lutte contre le SIDA — Côte d'Ivoire</p>
<h2>Maternité / Structure de Santé</h2><p>{{maternite}}</p>
<h2>District Sanitaire</h2><p>{{district_sante}}</p>
<h2>Protocole ARV</h2><p>{{protocole_arv}}</p>
<h2>Objectif Annuel</h2><p>{{objectif_couverture}}</p>
<h2>Date de l'Accord</h2><p>{{date_accord}}</p>
<p>Le programme vise l'élimination de la transmission mère-enfant conformément à l'objectif 90-90-90 de l'ONUSIDA.</p></div>`,
  },
  {
    code: 'spu_planning_familial',
    name: "Accord de service de planning familial",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Accord de service pour la prestation de soins de planning familial et santé reproductive.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'centre_sante_pf',label:"Centre de santé PF",type:'text',required:true},
      {key:'region',label:"Région d'implantation",type:'text',required:true},
      {key:'methodes_offertes',label:"Méthodes contraceptives offertes",type:'textarea',required:true},
      {key:'partenaire_appui',label:"Partenaire d'appui",type:'text',required:false},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PLANNING FAMILIAL</h1>
<p>Ministère de la Santé — Direction de la Santé Familiale — Côte d'Ivoire</p>
<h2>Centre de Santé PF</h2><p>{{centre_sante_pf}}</p>
<h2>Région</h2><p>{{region}}</p>
<h2>Méthodes Offertes</h2><p>{{methodes_offertes}}</p>
<h2>Partenaire d'Appui</h2><p>{{partenaire_appui}}</p>
<h2>Date de l'Accord</h2><p>{{date_accord}}</p>
<p>Les services sont fournis de manière volontaire et confidentielle conformément à la Politique Nationale de Santé Reproductive.</p></div>`,
  },
  {
    code: 'spu_sante_scolaire_menas',
    name: "Accord de service de santé scolaire (MENAS)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Accord de service pour la santé scolaire dans le cadre du Programme MENAS.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement scolaire",type:'text',required:true},
      {key:'district_education',label:"District d'éducation",type:'text',required:true},
      {key:'activites_sante',label:"Activités de santé prévues",type:'textarea',required:true},
      {key:'nombre_eleves',label:"Nombre d'élèves bénéficiaires",type:'text',required:true},
      {key:'annee_scolaire',label:"Année scolaire",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — SANTÉ SCOLAIRE (MENAS)</h1>
<p>Ministère de la Santé et Ministère de l'Éducation Nationale — Côte d'Ivoire</p>
<h2>Établissement Scolaire</h2><p>{{etablissement}}</p>
<h2>District d'Éducation</h2><p>{{district_education}}</p>
<h2>Activités de Santé</h2><p>{{activites_sante}}</p>
<h2>Élèves Bénéficiaires</h2><p>{{nombre_eleves}}</p>
<h2>Année Scolaire</h2><p>{{annee_scolaire}}</p>
<p>Le programme intègre les visites médicales, la déparasitage et les activités d'éducation à la santé.</p></div>`,
  },
  {
    code: 'spu_rapport_epidemio_hebdo',
    name: "Rapport de surveillance épidémiologique hebdomadaire",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Modèle de rapport hebdomadaire de surveillance épidémiologique pour les districts sanitaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'district',label:"District sanitaire rapporteur",type:'text',required:true},
      {key:'semaine_epidemio',label:"Semaine épidémiologique (S-XX)",type:'text',required:true},
      {key:'maladies_notifiees',label:"Maladies notifiées et cas",type:'textarea',required:true},
      {key:'alertes_signalees',label:"Alertes signalées",type:'textarea',required:false},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SURVEILLANCE ÉPIDÉMIOLOGIQUE HEBDOMADAIRE</h1>
<p>District Sanitaire : {{district}} — {{semaine_epidemio}}</p>
<h2>Maladies Notifiées</h2><p>{{maladies_notifiees}}</p>
<h2>Alertes Signalées</h2><p>{{alertes_signalees}}</p>
<h2>Date du Rapport</h2><p>{{date_rapport}}</p>
<p>Rapport transmis à la Direction de l'Information, de la Planification et de l'Évaluation (DIPE) — Ministère de la Santé.</p></div>`,
  },
  {
    code: 'spu_plan_contingence_epidemique',
    name: "Plan de contingence épidémique nationale",
    category: 'sante', price: 9000, priceMax: 27000,
    description: "Plan de contingence pour la gestion des urgences épidémiques à l'échelle nationale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'autorite_competente',label:"Autorité compétente",type:'text',required:true},
      {key:'scenarios_couverts',label:"Scénarios épidémiques couverts",type:'textarea',required:true},
      {key:'ressources_disponibles',label:"Ressources humaines et matérielles",type:'textarea',required:true},
      {key:'mecanisme_coordination',label:"Mécanisme de coordination",type:'text',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE CONTINGENCE ÉPIDÉMIQUE NATIONALE</h1>
<p>République de Côte d'Ivoire — Comité National de Gestion des Épidémies</p>
<h2>Autorité Compétente</h2><p>{{autorite_competente}}</p>
<h2>Scénarios Couverts</h2><p>{{scenarios_couverts}}</p>
<h2>Ressources Disponibles</h2><p>{{ressources_disponibles}}</p>
<h2>Mécanisme de Coordination</h2><p>{{mecanisme_coordination}}</p>
<h2>Date de Validation</h2><p>{{date_validation}}</p>
<p>Ce plan est révisé annuellement et activé par décision du Ministre de la Santé.</p></div>`,
  },
  {
    code: 'spu_partenariat_oms_ci',
    name: "Accord de partenariat OMS-Côte d'Ivoire",
    category: 'sante', price: 10000, priceMax: 30000,
    description: "Accord-cadre de coopération et partenariat entre l'OMS et la République de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'representant_oms',label:"Représentant OMS en Côte d'Ivoire",type:'text',required:true},
      {key:'ministre_sante',label:"Ministre de la Santé",type:'text',required:true},
      {key:'domaines_cooperation',label:"Domaines de coopération",type:'textarea',required:true},
      {key:'budget_cooperation',label:"Enveloppe budgétaire (USD)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT OMS — CÔTE D'IVOIRE</h1>
<p>Entre l'Organisation Mondiale de la Santé (OMS) et la République de Côte d'Ivoire</p>
<h2>Représentant OMS</h2><p>{{representant_oms}}</p>
<h2>Ministre de la Santé</h2><p>{{ministre_sante}}</p>
<h2>Domaines de Coopération</h2><p>{{domaines_cooperation}}</p>
<h2>Enveloppe Budgétaire</h2><p>{{budget_cooperation}} USD</p>
<h2>Date de Signature</h2><p>{{date_signature}}</p>
<p>Cet accord s'inscrit dans le cadre de la Stratégie de Coopération OMS-Côte d'Ivoire (SCA) en vigueur.</p></div>`,
  },
  {
    code: 'spu_financement_gavi',
    name: "Accord de financement GAVI vaccins",
    category: 'sante', price: 10000, priceMax: 30000,
    description: "Accord de financement GAVI pour l'introduction et la couverture vaccinale en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'point_focal_gavi',label:"Point focal GAVI Côte d'Ivoire",type:'text',required:true},
      {key:'vaccins_finances',label:"Vaccins financés par GAVI",type:'textarea',required:true},
      {key:'montant_grant',label:"Montant du grant (USD)",type:'text',required:true},
      {key:'indicateurs_performance',label:"Indicateurs de performance",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT GAVI — VACCINS</h1>
<p>GAVI Alliance et République de Côte d'Ivoire — Ministère de la Santé</p>
<h2>Point Focal GAVI</h2><p>{{point_focal_gavi}}</p>
<h2>Vaccins Financés</h2><p>{{vaccins_finances}}</p>
<h2>Montant du Grant</h2><p>{{montant_grant}} USD</p>
<h2>Indicateurs de Performance</h2><p>{{indicateurs_performance}}</p>
<h2>Date de l'Accord</h2><p>{{date_accord}}</p>
<p>Le décaissement est conditionné à l'atteinte des objectifs de couverture vaccinale définis conjointement.</p></div>`,
  },
  {
    code: 'spu_fonds_mondial_palu_vih',
    name: "Accord de partenariat Fonds Mondial paludisme/VIH",
    category: 'sante', price: 10000, priceMax: 30000,
    description: "Accord de partenariat avec le Fonds Mondial pour la lutte contre le paludisme et le VIH.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 83,
    fieldsJson: F([
      {key:'recepteur_principal',label:"Récepteur principal du grant",type:'text',required:true},
      {key:'composante_financement',label:"Composante de financement",type:'text',required:true},
      {key:'montant_subvention',label:"Montant de la subvention (USD)",type:'text',required:true},
      {key:'periode_grant',label:"Période du grant",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT — FONDS MONDIAL PALUDISME/VIH</h1>
<p>Le Fonds Mondial de Lutte contre le Sida, la Tuberculose et le Paludisme et {{recepteur_principal}}</p>
<h2>Composante de Financement</h2><p>{{composante_financement}}</p>
<h2>Montant de la Subvention</h2><p>{{montant_subvention}} USD</p>
<h2>Période du Grant</h2><p>{{periode_grant}}</p>
<h2>Date de l'Accord</h2><p>{{date_accord}}</p>
<p>Le Récepteur Principal s'engage à respecter les exigences fiduciaires et de performance du Fonds Mondial.</p></div>`,
  },
  {
    code: 'spu_medecine_traditionnelle',
    name: "Accord de service de médecine traditionnelle intégrée",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Accord de service pour l'intégration de la médecine traditionnelle dans le système de santé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'tradipraticien',label:"Tradipraticien ou association",type:'text',required:true},
      {key:'centre_sante_partenaire',label:"Centre de santé partenaire",type:'text',required:true},
      {key:'pathologies_traitees',label:"Pathologies prises en charge",type:'textarea',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — MÉDECINE TRADITIONNELLE INTÉGRÉE</h1>
<p>République de Côte d'Ivoire — Ministère de la Santé</p>
<h2>Tradipraticien / Association</h2><p>{{tradipraticien}}</p>
<h2>Centre de Santé Partenaire</h2><p>{{centre_sante_partenaire}}</p>
<h2>Pathologies Traitées</h2><p>{{pathologies_traitees}}</p>
<h2>Zone d'Intervention</h2><p>{{zone_intervention}}</p>
<h2>Date de l'Accord</h2><p>{{date_accord}}</p>
<p>Le tradipraticien est enregistré auprès du Ministère de la Santé conformément au décret n°99-594.</p></div>`,
  },
  {
    code: 'spu_charte_sante_developpement',
    name: "Charte de santé publique pour le développement durable",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Charte d'engagement pour la promotion de la santé publique dans une perspective de développement durable.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'signataires',label:"Organisations signataires",type:'textarea',required:true},
      {key:'engagements_sante',label:"Engagements en matière de santé",type:'textarea',required:true},
      {key:'objectifs_ods',label:"ODS liés aux engagements",type:'text',required:true},
      {key:'mecanisme_suivi',label:"Mécanisme de suivi et évaluation",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE SANTÉ PUBLIQUE POUR LE DÉVELOPPEMENT DURABLE</h1>
<p>République de Côte d'Ivoire</p>
<h2>Organisations Signataires</h2><p>{{signataires}}</p>
<h2>Engagements en Santé</h2><p>{{engagements_sante}}</p>
<h2>ODS Liés</h2><p>{{objectifs_ods}}</p>
<h2>Mécanisme de Suivi</h2><p>{{mecanisme_suivi}}</p>
<h2>Date de Signature</h2><p>{{date_signature}}</p>
<p>Cette charte s'inscrit dans le cadre de l'Agenda 2030 et de la Vision 2030 de la Côte d'Ivoire.</p></div>`,
  },

  // ─── PHARMACIE / MÉDICAMENTS (pharm2_) ───────────────────────────────────
  {
    code: 'pharm2_importation_dpmed',
    name: "Accord d'importation de médicaments (DPMED autorisation)",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Accord d'autorisation d'importation de médicaments délivré par la DPMED en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'importateur',label:"Importateur pharmaceutique",type:'text',required:true},
      {key:'pays_origine',label:"Pays d'origine des médicaments",type:'text',required:true},
      {key:'liste_produits',label:"Liste des produits à importer",type:'textarea',required:true},
      {key:'quantite_totale',label:"Quantité totale (unités)",type:'text',required:true},
      {key:'date_autorisation',label:"Date d'autorisation",type:'date',required:true},
      {key:'numero_amm',label:"Numéro AMM en vigueur",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'IMPORTATION DE MÉDICAMENTS — DPMED</h1>
<p>Direction de la Pharmacie, du Médicament et des Explorations Diagnostiques (DPMED) — Côte d'Ivoire</p>
<h2>Importateur</h2><p>{{importateur}}</p>
<h2>Pays d'Origine</h2><p>{{pays_origine}}</p>
<h2>Produits à Importer</h2><p>{{liste_produits}}</p>
<h2>Quantité Totale</h2><p>{{quantite_totale}} unités</p>
<h2>Numéro AMM</h2><p>{{numero_amm}}</p>
<h2>Date d'Autorisation</h2><p>{{date_autorisation}}</p>
<p>L'importation est soumise aux contrôles douaniers et aux vérifications qualité de la DPMED.</p></div>`,
  },
  {
    code: 'pharm2_grossiste_repartiteur',
    name: "Accord de service de grossiste répartiteur pharmaceutique",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Accord de service entre un grossiste répartiteur pharmaceutique et ses clients officines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'grossiste',label:"Grossiste répartiteur",type:'text',required:true},
      {key:'officine_cliente',label:"Officine cliente",type:'text',required:true},
      {key:'conditions_livraison',label:"Conditions de livraison",type:'textarea',required:true},
      {key:'conditions_paiement',label:"Conditions de paiement",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — GROSSISTE RÉPARTITEUR PHARMACEUTIQUE</h1>
<p>Entre : {{grossiste}} (ci-après le Grossiste) et {{officine_cliente}} (ci-après l'Officine)</p>
<h2>Conditions de Livraison</h2><p>{{conditions_livraison}}</p>
<h2>Conditions de Paiement</h2><p>{{conditions_paiement}}</p>
<h2>Date du Contrat</h2><p>{{date_contrat}}</p>
<p>Le présent accord est régi par les dispositions de la loi n°2015-533 relative à l'exercice de la pharmacie en Côte d'Ivoire.</p></div>`,
  },
  {
    code: 'pharm2_pharmacie_hospitaliere',
    name: "Contrat de service de pharmacie hospitalière",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Contrat de service pour la gestion d'une pharmacie hospitalière en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'hopital',label:"Hôpital ou établissement de santé",type:'text',required:true},
      {key:'responsable_pharmacie',label:"Pharmacien responsable",type:'text',required:true},
      {key:'services_couverts',label:"Services hospitaliers couverts",type:'textarea',required:true},
      {key:'budget_medicaments',label:"Budget médicaments annuel (FCFA)",type:'text',required:true},
      {key:'date_prise_fonction',label:"Date de prise de fonction",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — PHARMACIE HOSPITALIÈRE</h1>
<p>{{hopital}} et {{responsable_pharmacie}}, Pharmacien inscrit à l'ONPCI</p>
<h2>Services Hospitaliers Couverts</h2><p>{{services_couverts}}</p>
<h2>Budget Médicaments Annuel</h2><p>{{budget_medicaments}} FCFA</p>
<h2>Date de Prise de Fonction</h2><p>{{date_prise_fonction}}</p>
<p>La pharmacie hospitalière est organisée conformément aux décrets sur les établissements de soins et aux normes ISO 9001.</p></div>`,
  },
  {
    code: 'pharm2_pharmacie_communautaire',
    name: "Accord de service de pharmacie communautaire",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Accord de service pour l'établissement d'une pharmacie communautaire en zone rurale ou périurbaine.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'promoteur',label:"Promoteur de la pharmacie",type:'text',required:true},
      {key:'localite',label:"Localité d'implantation",type:'text',required:true},
      {key:'population_desservie',label:"Population estimée desservie",type:'text',required:true},
      {key:'pharmacien_gerant',label:"Pharmacien gérant",type:'text',required:true},
      {key:'date_ouverture',label:"Date d'ouverture prévue",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PHARMACIE COMMUNAUTAIRE</h1>
<p>République de Côte d'Ivoire — DPMED</p>
<h2>Promoteur</h2><p>{{promoteur}}</p>
<h2>Localité</h2><p>{{localite}}</p>
<h2>Population Desservie</h2><p>{{population_desservie}} habitants</p>
<h2>Pharmacien Gérant</h2><p>{{pharmacien_gerant}}</p>
<h2>Date d'Ouverture</h2><p>{{date_ouverture}}</p>
<p>La pharmacie communautaire est agréée par la DPMED et le gérant est inscrit à l'ONPCI.</p></div>`,
  },
  {
    code: 'pharm2_dispensation_ordonnance',
    name: "Accord de service de dispensation sous-ordonnance",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Accord de service encadrant la dispensation de médicaments sous ordonnance médicale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'officine',label:"Officine pharmaceutique",type:'text',required:true},
      {key:'prescripteur_agree',label:"Réseau de prescripteurs agréés",type:'text',required:true},
      {key:'classes_medicaments',label:"Classes de médicaments concernées",type:'textarea',required:true},
      {key:'procedure_verification',label:"Procédure de vérification d'ordonnance",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DISPENSATION SOUS ORDONNANCE</h1>
<p>{{officine}} — Pharmacien d'officine ONPCI</p>
<h2>Réseau de Prescripteurs Agréés</h2><p>{{prescripteur_agree}}</p>
<h2>Classes de Médicaments</h2><p>{{classes_medicaments}}</p>
<h2>Procédure de Vérification</h2><p>{{procedure_verification}}</p>
<h2>Date de l'Accord</h2><p>{{date_accord}}</p>
<p>La dispensation respecte les règles de bonnes pratiques officinales et le code de déontologie pharmaceutique.</p></div>`,
  },
  {
    code: 'pharm2_pharmacovigilance',
    name: "Accord de service de pharmacovigilance (effets indésirables)",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Accord de service de pharmacovigilance pour la détection et le signalement des effets indésirables.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'structure_signalatrice',label:"Structure signalatrice",type:'text',required:true},
      {key:'centre_pharmacovigilance',label:"Centre national de pharmacovigilance",type:'text',required:true},
      {key:'procedures_signalement',label:"Procédures de signalement",type:'textarea',required:true},
      {key:'delai_signalement',label:"Délai de signalement (jours)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PHARMACOVIGILANCE</h1>
<p>Entre {{structure_signalatrice}} et {{centre_pharmacovigilance}}</p>
<h2>Procédures de Signalement</h2><p>{{procedures_signalement}}</p>
<h2>Délai de Signalement</h2><p>{{delai_signalement}} jours ouvrables</p>
<h2>Date de l'Accord</h2><p>{{date_accord}}</p>
<p>Le système de pharmacovigilance est conforme aux exigences de l'OMS et de la DPMED pour la sécurité des patients.</p></div>`,
  },
  {
    code: 'pharm2_controle_qualite_lns',
    name: "Accord de service de contrôle qualité médicaments (LNS)",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Accord de service pour le contrôle qualité des médicaments par le Laboratoire National de Santé (LNS).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'donneur_ordre',label:"Donneur d'ordre (importateur/fabricant)",type:'text',required:true},
      {key:'lns_laboratoire',label:"Laboratoire National de Santé (LNS)",type:'text',required:true},
      {key:'produits_tester',label:"Produits à tester",type:'textarea',required:true},
      {key:'tests_requis',label:"Tests et analyses requis",type:'textarea',required:true},
      {key:'date_soumission',label:"Date de soumission des échantillons",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CONTRÔLE QUALITÉ MÉDICAMENTS (LNS)</h1>
<p>Entre {{donneur_ordre}} et {{lns_laboratoire}}</p>
<h2>Produits à Tester</h2><p>{{produits_tester}}</p>
<h2>Tests et Analyses</h2><p>{{tests_requis}}</p>
<h2>Date de Soumission</h2><p>{{date_soumission}}</p>
<p>Le LNS émet un certificat d'analyse conforme aux normes pharmacopéeiques internationales (Ph. Eur., USP).</p></div>`,
  },
  {
    code: 'pharm2_destruction_perimes',
    name: "Accord de service de destruction de médicaments périmés",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Accord de service pour la collecte et la destruction sécurisée des médicaments périmés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'detenteur_medicaments',label:"Détenteur des médicaments périmés",type:'text',required:true},
      {key:'prestataire_destruction',label:"Prestataire de destruction agréé",type:'text',required:true},
      {key:'quantite_estimee',label:"Quantité estimée (kg ou unités)",type:'text',required:true},
      {key:'methode_destruction',label:"Méthode de destruction retenue",type:'text',required:true},
      {key:'date_operation',label:"Date de l'opération",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DESTRUCTION DE MÉDICAMENTS PÉRIMÉS</h1>
<p>Entre {{detenteur_medicaments}} et {{prestataire_destruction}}</p>
<h2>Quantité Estimée</h2><p>{{quantite_estimee}}</p>
<h2>Méthode de Destruction</h2><p>{{methode_destruction}}</p>
<h2>Date de l'Opération</h2><p>{{date_operation}}</p>
<p>La destruction est réalisée en présence d'un représentant de la DPMED et dans le respect des normes environnementales.</p></div>`,
  },
  {
    code: 'pharm2_stupefiants_psychotropes',
    name: "Accord de service de gestion des stupéfiants et psychotropes",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Accord de service pour la gestion sécurisée des stupéfiants et substances psychotropes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'etablissement_detenteur',label:"Établissement détenteur",type:'text',required:true},
      {key:'responsable_securise',label:"Pharmacien responsable désigné",type:'text',required:true},
      {key:'substances_gerees',label:"Substances stupéfiantes gérées",type:'textarea',required:true},
      {key:'systeme_controle',label:"Système de contrôle et registre",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — GESTION STUPÉFIANTS ET PSYCHOTROPES</h1>
<p>{{etablissement_detenteur}} — Sous la supervision de la DPMED</p>
<h2>Pharmacien Responsable</h2><p>{{responsable_securise}}</p>
<h2>Substances Gérées</h2><p>{{substances_gerees}}</p>
<h2>Système de Contrôle</h2><p>{{systeme_controle}}</p>
<h2>Date de l'Accord</h2><p>{{date_accord}}</p>
<p>La gestion est conforme aux conventions internationales (CPS 1961, CP 1971) et aux lois ivoiriennes sur les stupéfiants.</p></div>`,
  },
  {
    code: 'pharm2_medicaments_generiques_dci',
    name: "Accord de distribution de médicaments génériques (DCI)",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Accord de distribution de médicaments génériques sous dénomination commune internationale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'distributeur',label:"Distributeur de génériques",type:'text',required:true},
      {key:'acheteur',label:"Structure acheteuse",type:'text',required:true},
      {key:'liste_dci',label:"Liste DCI des médicaments",type:'textarea',required:true},
      {key:'conditions_stockage',label:"Conditions de stockage requises",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION — MÉDICAMENTS GÉNÉRIQUES (DCI)</h1>
<p>Entre {{distributeur}} et {{acheteur}}</p>
<h2>Liste DCI</h2><p>{{liste_dci}}</p>
<h2>Conditions de Stockage</h2><p>{{conditions_stockage}}</p>
<h2>Date du Contrat</h2><p>{{date_contrat}}</p>
<p>Les médicaments génériques distribués sont enregistrés à la DPMED et satisfont aux normes OMS de bonnes pratiques de fabrication.</p></div>`,
  },
  {
    code: 'pharm2_phytotherapie',
    name: "Accord de service de phytothérapie et médecine naturelle",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Accord de service pour la fourniture et la dispensation de phytothérapiques et produits naturels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'fournisseur_phyto',label:"Fournisseur de phytothérapiques",type:'text',required:true},
      {key:'officine_ou_clinique',label:"Officine ou clinique cliente",type:'text',required:true},
      {key:'produits_phyto',label:"Produits phytothérapiques fournis",type:'textarea',required:true},
      {key:'certification_qualite',label:"Certification qualité détenue",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PHYTOTHÉRAPIE ET MÉDECINE NATURELLE</h1>
<p>Entre {{fournisseur_phyto}} et {{officine_ou_clinique}}</p>
<h2>Produits Phytothérapiques</h2><p>{{produits_phyto}}</p>
<h2>Certification Qualité</h2><p>{{certification_qualite}}</p>
<h2>Date de l'Accord</h2><p>{{date_accord}}</p>
<p>Les produits fournis sont conformes à la monographie de la pharmacopée africaine et aux exigences de la DPMED.</p></div>`,
  },
  {
    code: 'pharm2_observance_therapeutique',
    name: "Accord de programme d'observance thérapeutique",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Accord de programme pour l'amélioration de l'observance thérapeutique des patients.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'structure_porteuse',label:"Structure porteuse du programme",type:'text',required:true},
      {key:'partenaire_sante',label:"Partenaire de santé",type:'text',required:true},
      {key:'pathologies_cibles',label:"Pathologies chroniques ciblées",type:'textarea',required:true},
      {key:'outils_observance',label:"Outils d'observance utilisés",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROGRAMME — OBSERVANCE THÉRAPEUTIQUE</h1>
<p>Entre {{structure_porteuse}} et {{partenaire_sante}}</p>
<h2>Pathologies Ciblées</h2><p>{{pathologies_cibles}}</p>
<h2>Outils d'Observance</h2><p>{{outils_observance}}</p>
<h2>Date de Lancement</h2><p>{{date_lancement}}</p>
<p>Le programme vise à réduire les rechutes et les résistances aux traitements des maladies chroniques.</p></div>`,
  },
  {
    code: 'pharm2_preparation_magistrale',
    name: "Contrat de service de préparation magistrale officinale",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Contrat de service pour la réalisation de préparations magistrales et officinales personnalisées.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'officine_preparatrice',label:"Officine préparatrice",type:'text',required:true},
      {key:'prescripteur',label:"Médecin prescripteur",type:'text',required:true},
      {key:'formule_preparation',label:"Formule de la préparation",type:'textarea',required:true},
      {key:'patient_beneficiaire',label:"Patient bénéficiaire (initiales)",type:'text',required:true},
      {key:'date_prescription',label:"Date de la prescription",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — PRÉPARATION MAGISTRALE OFFICINALE</h1>
<p>{{officine_preparatrice}} sur prescription du Dr {{prescripteur}}</p>
<h2>Formule de la Préparation</h2><p>{{formule_preparation}}</p>
<h2>Patient Bénéficiaire</h2><p>{{patient_beneficiaire}}</p>
<h2>Date de Prescription</h2><p>{{date_prescription}}</p>
<p>La préparation est réalisée dans le respect des bonnes pratiques de préparation officinale conformes à la Pharmacopée Européenne.</p></div>`,
  },
  {
    code: 'pharm2_vaccins_biologiques_conservation',
    name: "Accord de service de vaccins et produits biologiques (conservation)",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Accord de service pour la conservation et le transport de vaccins et produits biologiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'structure_stockage',label:"Structure de stockage",type:'text',required:true},
      {key:'produits_biologiques',label:"Produits biologiques concernés",type:'textarea',required:true},
      {key:'conditions_conservation',label:"Conditions de conservation requises",type:'textarea',required:true},
      {key:'prestataire_transport',label:"Prestataire de transport frigorifique",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CONSERVATION VACCINS ET PRODUITS BIOLOGIQUES</h1>
<p>Entre {{structure_stockage}} et {{prestataire_transport}}</p>
<h2>Produits Biologiques</h2><p>{{produits_biologiques}}</p>
<h2>Conditions de Conservation</h2><p>{{conditions_conservation}}</p>
<h2>Date de l'Accord</h2><p>{{date_accord}}</p>
<p>Le respect de la chaîne du froid est assuré selon les normes OMS PQS et les exigences de la DPMED.</p></div>`,
  },
  {
    code: 'pharm2_tiers_payant_assurance',
    name: "Accord de partenariat pharmacie-assurance maladie (tiers payant)",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Accord de partenariat tiers payant entre une officine pharmaceutique et une assurance maladie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'officine',label:"Officine pharmaceutique",type:'text',required:true},
      {key:'assureur',label:"Compagnie d'assurance maladie",type:'text',required:true},
      {key:'taux_prise_charge',label:"Taux de prise en charge (%)",type:'text',required:true},
      {key:'liste_medicaments_couverts',label:"Médicaments couverts",type:'textarea',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD TIERS PAYANT — PHARMACIE ET ASSURANCE MALADIE</h1>
<p>Entre {{officine}} (Officine) et {{assureur}} (Assureur)</p>
<h2>Taux de Prise en Charge</h2><p>{{taux_prise_charge}}%</p>
<h2>Médicaments Couverts</h2><p>{{liste_medicaments_couverts}}</p>
<h2>Date de la Convention</h2><p>{{date_convention}}</p>
<p>Le tiers payant est géré conformément aux dispositions de la CNAM et du Code des assurances CIMA.</p></div>`,
  },
  {
    code: 'pharm2_teleconsultation_pharmaceutique',
    name: "Accord de service de téléconsultation pharmaceutique",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Accord de service pour la mise en place de la téléconsultation pharmaceutique à distance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'plateforme_teleconsult',label:"Plateforme de téléconsultation",type:'text',required:true},
      {key:'officine_partenaire',label:"Officine partenaire",type:'text',required:true},
      {key:'services_teleconsult',label:"Services de téléconsultation offerts",type:'textarea',required:true},
      {key:'zone_couverture',label:"Zone géographique couverte",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TÉLÉCONSULTATION PHARMACEUTIQUE</h1>
<p>Entre {{plateforme_teleconsult}} et {{officine_partenaire}}</p>
<h2>Services Offerts</h2><p>{{services_teleconsult}}</p>
<h2>Zone de Couverture</h2><p>{{zone_couverture}}</p>
<h2>Date de l'Accord</h2><p>{{date_accord}}</p>
<p>La téléconsultation est encadrée par les textes sur la télémédecine en Côte d'Ivoire et le code de déontologie ONPCI.</p></div>`,
  },
  {
    code: 'pharm2_pharmacie_mobile_rurale',
    name: "Accord de service de pharmacie mobile (zones rurales)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Accord de service pour le déploiement d'une pharmacie mobile dans les zones rurales enclavées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'operateur_mobile',label:"Opérateur de pharmacie mobile",type:'text',required:true},
      {key:'zones_desservies',label:"Zones rurales desservies",type:'textarea',required:true},
      {key:'frequence_passage',label:"Fréquence de passage",type:'text',required:true},
      {key:'medicaments_disponibles',label:"Médicaments essentiels disponibles",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PHARMACIE MOBILE (ZONES RURALES)</h1>
<p>{{operateur_mobile}} — Service de santé mobile en Côte d'Ivoire</p>
<h2>Zones Desservies</h2><p>{{zones_desservies}}</p>
<h2>Fréquence de Passage</h2><p>{{frequence_passage}}</p>
<h2>Médicaments Disponibles</h2><p>{{medicaments_disponibles}}</p>
<h2>Date de Lancement</h2><p>{{date_lancement}}</p>
<p>Le pharmacien itinérant est inscrit à l'ONPCI et opère sous la supervision de la Direction Régionale de la Santé.</p></div>`,
  },
  {
    code: 'pharm2_essai_clinique_cro',
    name: "Accord de service d'essai clinique de médicament (CRO)",
    category: 'sante', price: 12000, priceMax: 36000,
    description: "Accord de service pour la réalisation d'un essai clinique de médicament par un CRO en Afrique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'sponsor_essai',label:"Promoteur (Sponsor) de l'essai",type:'text',required:true},
      {key:'cro_contractant',label:"Organisme de Recherche Contractuel (CRO)",type:'text',required:true},
      {key:'molecule_testee',label:"Molécule ou médicament testé",type:'text',required:true},
      {key:'phase_essai',label:"Phase de l'essai clinique",type:'text',required:true},
      {key:'sites_investigateurs',label:"Sites investigateurs retenus",type:'textarea',required:true},
      {key:'date_debut_essai',label:"Date de début de l'essai",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ESSAI CLINIQUE DE MÉDICAMENT (CRO)</h1>
<p>Entre {{sponsor_essai}} (Promoteur) et {{cro_contractant}} (CRO)</p>
<h2>Molécule Testée</h2><p>{{molecule_testee}}</p>
<h2>Phase de l'Essai</h2><p>{{phase_essai}}</p>
<h2>Sites Investigateurs</h2><p>{{sites_investigateurs}}</p>
<h2>Date de Début</h2><p>{{date_debut_essai}}</p>
<p>L'essai est réalisé conformément aux BPC-ICH E6, aux réglementations DPMED et à la Déclaration d'Helsinki.</p></div>`,
  },
  {
    code: 'pharm2_enregistrement_medicament_dpmed',
    name: "Accord de service d'enregistrement de médicament (dossier DPMED)",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Accord de service pour la constitution et le dépôt du dossier d'enregistrement d'un médicament auprès de la DPMED.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'cabinet_reglementaire',label:"Cabinet réglementaire mandaté",type:'text',required:true},
      {key:'entreprise_pharmaceutique',label:"Entreprise pharmaceutique cliente",type:'text',required:true},
      {key:'denomination_medicament',label:"Dénomination du médicament",type:'text',required:true},
      {key:'forme_pharmaceutique',label:"Forme pharmaceutique",type:'text',required:true},
      {key:'date_depot_prevu',label:"Date de dépôt prévu",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ENREGISTREMENT MÉDICAMENT DPMED</h1>
<p>Entre {{cabinet_reglementaire}} et {{entreprise_pharmaceutique}}</p>
<h2>Médicament</h2><p>{{denomination_medicament}} — Forme : {{forme_pharmaceutique}}</p>
<h2>Date de Dépôt Prévu</h2><p>{{date_depot_prevu}}</p>
<p>Le dossier CTD est constitué selon les exigences de la DPMED et les guidelines ICH applicables en Afrique subsaharienne.</p></div>`,
  },
  {
    code: 'pharm2_licence_fabrication_bpf',
    name: "Accord de licence de fabrication de médicament (OMS-BPF)",
    category: 'sante', price: 10000, priceMax: 30000,
    description: "Accord de licence de fabrication pharmaceutique conforme aux Bonnes Pratiques de Fabrication OMS.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'fabricant',label:"Fabricant pharmaceutique",type:'text',required:true},
      {key:'autorite_delivrante',label:"Autorité delivrant la licence",type:'text',required:true},
      {key:'produits_autorises',label:"Produits et formes autorisés",type:'textarea',required:true},
      {key:'conditions_bpf',label:"Conditions BPF à respecter",type:'textarea',required:true},
      {key:'date_delivrance',label:"Date de délivrance",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE FABRICATION PHARMACEUTIQUE (OMS-BPF)</h1>
<p>Délivrée par {{autorite_delivrante}} à {{fabricant}}</p>
<h2>Produits et Formes Autorisés</h2><p>{{produits_autorises}}</p>
<h2>Conditions BPF</h2><p>{{conditions_bpf}}</p>
<h2>Date de Délivrance</h2><p>{{date_delivrance}}</p>
<p>Cette licence est soumise à des inspections régulières par la DPMED et est renouvelable tous les cinq (5) ans.</p></div>`,
  },
  {
    code: 'pharm2_rapport_performance_officine',
    name: "Rapport de performance officine pharmaceutique",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Rapport annuel de performance d'une officine pharmaceutique en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'officine',label:"Nom et adresse de l'officine",type:'text',required:true},
      {key:'pharmacien_titulaire',label:"Pharmacien titulaire",type:'text',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires annuel (FCFA)",type:'text',required:true},
      {key:'indicateurs_qualite',label:"Indicateurs de qualité atteints",type:'textarea',required:true},
      {key:'annee_rapport',label:"Année du rapport",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE — OFFICINE PHARMACEUTIQUE</h1>
<p>{{officine}} — Pharmacien Titulaire : {{pharmacien_titulaire}}</p>
<h2>Chiffre d'Affaires Annuel</h2><p>{{chiffre_affaires}} FCFA</p>
<h2>Indicateurs de Qualité</h2><p>{{indicateurs_qualite}}</p>
<h2>Année du Rapport</h2><p>{{annee_rapport}}</p>
<p>Ce rapport est soumis à l'ONPCI et à la DPMED dans le cadre du suivi annuel des officines agréées.</p></div>`,
  },
  {
    code: 'pharm2_plan_dev_reseau_pharma',
    name: "Plan de développement réseau pharmaceutique",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Plan stratégique de développement et d'extension d'un réseau d'officines pharmaceutiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'groupe_pharmaceutique',label:"Groupe pharmaceutique porteur",type:'text',required:true},
      {key:'regions_cibles',label:"Régions de déploiement cibles",type:'textarea',required:true},
      {key:'nombre_officines_prevues',label:"Nombre d'officines prévues",type:'text',required:true},
      {key:'investissement_total',label:"Investissement total (FCFA)",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT — RÉSEAU PHARMACEUTIQUE</h1>
<p>{{groupe_pharmaceutique}} — Plan Stratégique Pharmaceutique</p>
<h2>Régions Ciblées</h2><p>{{regions_cibles}}</p>
<h2>Officines Prévues</h2><p>{{nombre_officines_prevues}} nouvelles officines</p>
<h2>Investissement Total</h2><p>{{investissement_total}} FCFA</p>
<h2>Horizon du Plan</h2><p>{{horizon_plan}} ans</p>
<p>Le plan est soumis à l'approbation de la DPMED et tient compte de la carte sanitaire nationale.</p></div>`,
  },
  {
    code: 'pharm2_formation_pharmaciens',
    name: "Accord de service de formation pharmaciens",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Accord de service pour la formation continue et le développement professionnel des pharmaciens.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'onpci_partenaire',label:"Référence ONPCI partenaire",type:'text',required:true},
      {key:'modules_formation',label:"Modules de formation prévus",type:'textarea',required:true},
      {key:'nombre_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'date_session',label:"Date de la session",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — FORMATION PHARMACIENS</h1>
<p>Entre {{organisme_formation}} et {{onpci_partenaire}}</p>
<h2>Modules de Formation</h2><p>{{modules_formation}}</p>
<h2>Participants</h2><p>{{nombre_participants}} pharmaciens</p>
<h2>Date de Session</h2><p>{{date_session}}</p>
<p>La formation donne droit aux crédits DPC (Développement Professionnel Continu) reconnus par l'ONPCI.</p></div>`,
  },
  {
    code: 'pharm2_partenariat_npsp_pharma_centrale',
    name: "Accord de partenariat NPSP-pharmacie centrale",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Accord de partenariat entre la Nouvelle Pharmacie de Santé Publique (NPSP) et la pharmacie centrale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'npsp_representant',label:"Représentant NPSP",type:'text',required:true},
      {key:'pharmacie_centrale',label:"Pharmacie centrale partenaire",type:'text',required:true},
      {key:'produits_concernes',label:"Produits et programmes concernés",type:'textarea',required:true},
      {key:'mecanisme_approvisionnement',label:"Mécanisme d'approvisionnement",type:'textarea',required:true},
      {key:'date_partenariat',label:"Date du partenariat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT NPSP — PHARMACIE CENTRALE</h1>
<p>Entre {{npsp_representant}} (NPSP) et {{pharmacie_centrale}}</p>
<h2>Produits et Programmes</h2><p>{{produits_concernes}}</p>
<h2>Mécanisme d'Approvisionnement</h2><p>{{mecanisme_approvisionnement}}</p>
<h2>Date du Partenariat</h2><p>{{date_partenariat}}</p>
<p>Le partenariat vise à garantir la disponibilité des médicaments essentiels dans toutes les régions de Côte d'Ivoire.</p></div>`,
  },
  {
    code: 'pharm2_charte_deontologie_pharmaceutique',
    name: "Charte de déontologie pharmaceutique",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Charte de déontologie pharmaceutique pour les professionnels inscrits à l'ONPCI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'pharmacien_signataire',label:"Pharmacien signataire",type:'text',required:true},
      {key:'numero_onpci',label:"Numéro d'inscription ONPCI",type:'text',required:true},
      {key:'engagements_deontologiques',label:"Engagements déontologiques principaux",type:'textarea',required:true},
      {key:'lieu_exercice',label:"Lieu d'exercice professionnel",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE DÉONTOLOGIE PHARMACEUTIQUE</h1>
<p>Ordre National des Pharmaciens de Côte d'Ivoire (ONPCI)</p>
<h2>Pharmacien Signataire</h2><p>{{pharmacien_signataire}} — N° ONPCI : {{numero_onpci}}</p>
<h2>Engagements Déontologiques</h2><p>{{engagements_deontologiques}}</p>
<h2>Lieu d'Exercice</h2><p>{{lieu_exercice}}</p>
<h2>Date de Signature</h2><p>{{date_signature}}</p>
<p>Je m'engage à respecter le Code de Déontologie Pharmaceutique et les règles de l'ONPCI en toutes circonstances.</p></div>`,
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
  console.log(`Batch 58a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
