import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 SANTÉ PUBLIQUE / ÉPIDÉMIOLOGIE (san3_) ──────────────────────────────
  {
    code: 'san3_surv_epi_nat', name: "Accord de service de surveillance épidémiologique nationale",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Convention cadre entre l'État et un prestataire pour la surveillance épidémiologique continue sur le territoire national (CI/OHADA).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de surveillance",type:'text',required:true},
      {key:'zone_couverte',label:"Zone géographique couverte",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'maladies_cibles',label:"Maladies sous surveillance",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SURVEILLANCE ÉPIDÉMIOLOGIQUE NATIONALE</h1>
<p>Entre le Ministère de la Santé de Côte d'Ivoire et <strong>{{prestataire}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord a pour objet la surveillance épidémiologique nationale sur la zone : {{zone_couverte}}, du {{date_debut}} au {{date_fin}}.</p>
<h2>Article 2 – Maladies sous surveillance</h2>
<p>{{maladies_cibles}}</p>
<h2>Article 3 – Obligations des parties</h2>
<p>Le prestataire s'engage à remettre des rapports hebdomadaires au Ministère. Les données collectées restent confidentielles et propriété de l'État.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Le présent accord est régi par le droit ivoirien et les instruments OHADA applicables.</p></div>` },

  {
    code: 'san3_riposte_epidemic', name: "Accord de plan de riposte épidémique (choléra, Ebola)",
    category: 'sante', price: 9000, priceMax: 28000,
    description: "Plan contractuel de riposte aux épidémies (choléra, Ebola, etc.) entre autorités sanitaires et partenaires opérationnels en CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'partenaire',label:"Partenaire opérationnel",type:'text',required:true},
      {key:'type_epidemie',label:"Type d'épidémie ciblée",type:'text',required:true},
      {key:'region',label:"Région d'intervention",type:'text',required:true},
      {key:'date_activation',label:"Date d'activation du plan",type:'date',required:true},
      {key:'ressources_allouees',label:"Ressources allouées",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PLAN DE RIPOSTE ÉPIDÉMIQUE</h1>
<p>Type d'épidémie : <strong>{{type_epidemie}}</strong> — Partenaire : <strong>{{partenaire}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Activation du plan de riposte épidémique dans la région {{region}} à compter du {{date_activation}}.</p>
<h2>Article 2 – Ressources mobilisées</h2>
<p>{{ressources_allouees}}</p>
<h2>Article 3 – Coordination</h2>
<p>Un comité de coordination se réunit sous 24 heures suivant la déclaration de l'épidémie. Les décisions sont prises par consensus et documentées.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord régi par le droit ivoirien et le Règlement Sanitaire International (RSI 2005).</p></div>` },

  {
    code: 'san3_vaccination_masse', name: "Accord de service de vaccination de masse (campagne)",
    category: 'sante', price: 7000, priceMax: 20000,
    description: "Convention de prestation pour l'organisation de campagnes de vaccination de masse en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire logistique",type:'text',required:true},
      {key:'vaccin',label:"Type de vaccin",type:'text',required:true},
      {key:'population_cible',label:"Population cible",type:'text',required:true},
      {key:'date_campagne',label:"Date de la campagne",type:'date',required:true},
      {key:'objectif_doses',label:"Nombre de doses cibles",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VACCINATION DE MASSE</h1>
<p>Vaccin : <strong>{{vaccin}}</strong> — Prestataire : <strong>{{prestataire}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Organisation d'une campagne de vaccination de masse ciblant {{population_cible}}, prévue le {{date_campagne}}, avec un objectif de {{objectif_doses}} doses administrées.</p>
<h2>Article 2 – Obligations du prestataire</h2>
<p>Le prestataire assure la chaîne du froid, la logistique de distribution et la formation des vaccinateurs.</p>
<h2>Article 3 – Droit applicable</h2>
<p>Accord régi par le Code de la Santé Publique de Côte d'Ivoire.</p></div>` },

  {
    code: 'san3_depistage_masse', name: "Accord de service de dépistage de masse (VIH, tuberculose)",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de prestation pour les campagnes de dépistage de masse (VIH, tuberculose, etc.) en milieu communautaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'organisme',label:"Organisme prestataire",type:'text',required:true},
      {key:'maladie_cible',label:"Maladie ciblée",type:'text',required:true},
      {key:'lieu',label:"Lieu du dépistage",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'nombre_tests',label:"Nombre de tests prévus",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPISTAGE DE MASSE</h1>
<p>Maladie ciblée : <strong>{{maladie_cible}}</strong> — Organisme : <strong>{{organisme}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord porte sur l'organisation d'une campagne de dépistage de masse à {{lieu}}, à compter du {{date_debut}}, pour un volume prévisionnel de {{nombre_tests}} tests.</p>
<h2>Article 2 – Confidentialité</h2>
<p>Les résultats des tests sont strictement confidentiels et ne peuvent être communiqués qu'au patient concerné ou à son représentant légal.</p>
<h2>Article 3 – Droit applicable</h2>
<p>Accord régi par le droit ivoirien et les directives de l'ONUSIDA.</p></div>` },

  {
    code: 'san3_sante_scolaire', name: "Accord de service de santé scolaire (médecine préventive)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de prestation de médecine préventive en milieu scolaire (visites médicales, bilans, vaccination scolaire).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement scolaire",type:'text',required:true},
      {key:'medecin',label:"Médecin prestataire",type:'text',required:true},
      {key:'effectif',label:"Effectif d'élèves concernés",type:'text',required:true},
      {key:'annee_scolaire',label:"Année scolaire",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SANTÉ SCOLAIRE</h1>
<p>Établissement : <strong>{{etablissement}}</strong> — Médecin : <strong>{{medecin}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord organise la médecine préventive scolaire pour un effectif de {{effectif}} élèves durant l'année scolaire {{annee_scolaire}}.</p>
<h2>Article 2 – Prestations</h2>
<p>Bilans de santé, vaccinations réglementaires, suivi des cas chroniques et sensibilisation à l'hygiène.</p>
<h2>Article 3 – Droit applicable</h2>
<p>Accord régi par le Code de l'Éducation et le Code de la Santé Publique de Côte d'Ivoire.</p></div>` },

  {
    code: 'san3_sante_travail', name: "Accord de service de santé au travail (médecine du travail)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de médecine du travail entre un employeur et un service de santé au travail agréé (CI/OHADA).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'employeur',label:"Entreprise employeur",type:'text',required:true},
      {key:'service_sante',label:"Service de santé au travail",type:'text',required:true},
      {key:'nombre_salaries',label:"Nombre de salariés",type:'text',required:true},
      {key:'date_debut',label:"Date de prise en charge",type:'date',required:true},
      {key:'prestations',label:"Prestations prévues",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SANTÉ AU TRAVAIL</h1>
<p>Employeur : <strong>{{employeur}}</strong> — Service : <strong>{{service_sante}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord organise le suivi médical de {{nombre_salaries}} salariés à compter du {{date_debut}}.</p>
<h2>Article 2 – Prestations</h2>
<p>{{prestations}}</p>
<h2>Article 3 – Conformité CNPS</h2>
<p>Les parties s'engagent à respecter les obligations légales en matière de médecine du travail telles que définies par le Code du Travail ivoirien et les textes de la CNPS.</p></div>` },

  {
    code: 'san3_sante_env', name: "Accord de service de santé environnementale",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de prestation en santé environnementale (eau, air, sols) entre une collectivité et un prestataire spécialisé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'collectivite',label:"Collectivité ou institution",type:'text',required:true},
      {key:'prestataire',label:"Prestataire environnemental",type:'text',required:true},
      {key:'zone',label:"Zone d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'risques_cibles',label:"Risques environnementaux ciblés",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SANTÉ ENVIRONNEMENTALE</h1>
<p>Collectivité : <strong>{{collectivite}}</strong> — Prestataire : <strong>{{prestataire}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Surveillance et contrôle des risques environnementaux ({{risques_cibles}}) dans la zone {{zone}} à compter du {{date_debut}}.</p>
<h2>Article 2 – Obligations</h2>
<p>Le prestataire remet des rapports mensuels d'analyse et propose des mesures correctives. La collectivité assure l'accès aux sites.</p>
<h2>Article 3 – Droit applicable</h2>
<p>Accord régi par le Code de l'Environnement de Côte d'Ivoire et les normes OMS.</p></div>` },

  {
    code: 'san3_nutrition_comm', name: "Accord de service de nutrition communautaire",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de prestation en nutrition communautaire (dépistage malnutrition, supplémentation) en milieu rural et péri-urbain.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'ong',label:"ONG ou prestataire",type:'text',required:true},
      {key:'communaute',label:"Communauté bénéficiaire",type:'text',required:true},
      {key:'population',label:"Nombre de bénéficiaires",type:'text',required:true},
      {key:'date_debut',label:"Date de début du programme",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NUTRITION COMMUNAUTAIRE</h1>
<p>ONG/Prestataire : <strong>{{ong}}</strong> — Communauté : <strong>{{communaute}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Programme de nutrition communautaire pour {{population}} bénéficiaires à compter du {{date_debut}}.</p>
<h2>Article 2 – Activités</h2>
<p>Dépistage de la malnutrition aiguë, supplémentation nutritionnelle, éducation alimentaire et suivi anthropométrique mensuel.</p>
<h2>Article 3 – Droit applicable</h2>
<p>Accord régi par le droit ivoirien et les normes UNICEF/OMS en matière de nutrition.</p></div>` },

  {
    code: 'san3_planif_familiale', name: "Accord de service de planification familiale (contraception)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de prestation de services de planification familiale et de contraception en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 63,
    fieldsJson: F([
      {key:'structure_sante',label:"Structure de santé prestataire",type:'text',required:true},
      {key:'partenaire',label:"Partenaire financeur",type:'text',required:true},
      {key:'zone',label:"Zone d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'methodes',label:"Méthodes contraceptives proposées",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PLANIFICATION FAMILIALE</h1>
<p>Structure : <strong>{{structure_sante}}</strong> — Partenaire : <strong>{{partenaire}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Fourniture de services de planification familiale dans la zone {{zone}} à compter du {{date_debut}}.</p>
<h2>Article 2 – Méthodes proposées</h2>
<p>{{methodes}}</p>
<h2>Article 3 – Confidentialité</h2>
<p>Toutes les consultations sont confidentielles. Le consentement éclairé est requis avant toute prestation.</p></div>` },

  {
    code: 'san3_sante_maternelle', name: "Accord de service de santé maternelle (PMI)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de protection maternelle et infantile (PMI) incluant les consultations prénatales et le suivi post-partum.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'centre_pmi',label:"Centre PMI",type:'text',required:true},
      {key:'partenaire',label:"Partenaire de financement",type:'text',required:true},
      {key:'commune',label:"Commune ou district",type:'text',required:true},
      {key:'date_debut',label:"Date d'effet",type:'date',required:true},
      {key:'objectifs',label:"Objectifs de couverture",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SANTÉ MATERNELLE (PMI)</h1>
<p>Centre PMI : <strong>{{centre_pmi}}</strong> — Partenaire : <strong>{{partenaire}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Organisation des services de protection maternelle et infantile dans la commune/district de {{commune}} à compter du {{date_debut}}.</p>
<h2>Article 2 – Objectifs</h2>
<p>{{objectifs}}</p>
<h2>Article 3 – Normes applicables</h2>
<p>Le présent accord est conforme aux normes du Programme National de Santé de la Reproduction (PNSR) de Côte d'Ivoire.</p></div>` },

  {
    code: 'san3_sante_neonatale', name: "Accord de service de santé néonatale (soins du nourrisson)",
    category: 'sante', price: 5000, priceMax: 16000,
    description: "Convention de prestation de soins néonatals et de suivi du nourrisson en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'maternite',label:"Maternité ou unité néonatale",type:'text',required:true},
      {key:'partenaire',label:"Partenaire ou bailleur",type:'text',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true},
      {key:'prestations',label:"Prestations néonatales couvertes",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SANTÉ NÉONATALE</h1>
<p>Maternité/Unité : <strong>{{maternite}}</strong> — Partenaire : <strong>{{partenaire}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord organise la prestation de soins néonatals à compter du {{date_debut}}.</p>
<h2>Article 2 – Prestations couvertes</h2>
<p>{{prestations}}</p>
<h2>Article 3 – Protocoles</h2>
<p>Tous les soins sont dispensés conformément aux protocoles du Ministère de la Santé et aux recommandations OMS pour les nouveau-nés.</p></div>` },

  {
    code: 'san3_lutte_paludisme', name: "Accord de service de lutte contre le paludisme (aspersion)",
    category: 'sante', price: 7000, priceMax: 20000,
    description: "Convention de prestation pour les opérations d'aspersion intra-domiciliaire (AID) dans le cadre de la lutte anti-paludéenne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire d'aspersion",type:'text',required:true},
      {key:'district',label:"District sanitaire ciblé",type:'text',required:true},
      {key:'produit',label:"Insecticide utilisé",type:'text',required:true},
      {key:'date_campagne',label:"Date de la campagne",type:'date',required:true},
      {key:'nombre_habitations',label:"Nombre d'habitations ciblées",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LUTTE CONTRE LE PALUDISME (ASPERSION)</h1>
<p>Prestataire : <strong>{{prestataire}}</strong> — District : <strong>{{district}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Campagne d'aspersion intra-domiciliaire avec le produit {{produit}}, prévue le {{date_campagne}}, ciblant {{nombre_habitations}} habitations.</p>
<h2>Article 2 – Sécurité</h2>
<p>Le prestataire respecte les normes OMS de manipulation et d'élimination des insecticides. Les agents sont équipés d'EPI adaptés.</p>
<h2>Article 3 – Droit applicable</h2>
<p>Accord régi par le Programme National de Lutte contre le Paludisme (PNLP-CI).</p></div>` },

  {
    code: 'san3_milda', name: "Accord de service de distribution moustiquaires (MILDA)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de distribution de moustiquaires imprégnées à longue durée d'action (MILDA) en milieu communautaire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'distributeur',label:"Organisme distributeur",type:'text',required:true},
      {key:'zone',label:"Zone de distribution",type:'text',required:true},
      {key:'nombre_milda',label:"Nombre de MILDA à distribuer",type:'text',required:true},
      {key:'date_distribution',label:"Date de distribution",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DISTRIBUTION DE MOUSTIQUAIRES MILDA</h1>
<p>Distributeur : <strong>{{distributeur}}</strong> — Zone : <strong>{{zone}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Distribution de {{nombre_milda}} moustiquaires MILDA dans la zone {{zone}}, prévue le {{date_distribution}}.</p>
<h2>Article 2 – Modalités</h2>
<p>Les MILDA sont distribuées gratuitement aux ménages prioritaires (femmes enceintes, enfants de moins de 5 ans). Un registre de distribution est tenu par le prestataire.</p>
<h2>Article 3 – Droit applicable</h2>
<p>Accord régi par le PNLP-CI et les directives du Fonds Mondial.</p></div>` },

  {
    code: 'san3_dentaire_comm', name: "Accord de service de santé bucco-dentaire communautaire",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de prestation de santé bucco-dentaire en milieu communautaire (dépistage, prévention, extractions).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet ou clinique dentaire",type:'text',required:true},
      {key:'communaute',label:"Communauté ou école cible",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'prestations',label:"Prestations prévues",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SANTÉ BUCCO-DENTAIRE COMMUNAUTAIRE</h1>
<p>Cabinet : <strong>{{cabinet}}</strong> — Communauté : <strong>{{communaute}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Prestation de services de santé bucco-dentaire communautaire à compter du {{date_debut}}.</p>
<h2>Article 2 – Prestations</h2>
<p>{{prestations}}</p>
<h2>Article 3 – Tarification</h2>
<p>Les tarifs sociaux sont définis en annexe et approuvés par le Ministère de la Santé.</p></div>` },

  {
    code: 'san3_oculaire_comm', name: "Accord de service de santé oculaire communautaire (trachome)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de lutte contre le trachome et de prestation de soins oculaires communautaires en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'ong',label:"ONG ou prestataire oculaire",type:'text',required:true},
      {key:'district',label:"District sanitaire",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'objectif_patients',label:"Nombre de patients visés",type:'text',required:false},
      {key:'strategie',label:"Stratégie CHANCE",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SANTÉ OCULAIRE COMMUNAUTAIRE (TRACHOME)</h1>
<p>Prestataire : <strong>{{ong}}</strong> — District : <strong>{{district}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Programme de lutte contre le trachome et de santé oculaire communautaire à compter du {{date_debut}} pour {{objectif_patients}} patients.</p>
<h2>Article 2 – Stratégie</h2>
<p>{{strategie}}</p>
<h2>Article 3 – Droit applicable</h2>
<p>Accord conforme aux directives OMS relatives aux maladies tropicales négligées.</p></div>` },

  {
    code: 'san3_drepanocytose', name: "Accord de service de lutte contre la drépanocytose",
    category: 'sante', price: 5000, priceMax: 16000,
    description: "Convention de prestation pour la prévention, le dépistage et la prise en charge de la drépanocytose en CI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'centre_drepa',label:"Centre spécialisé drépanocytose",type:'text',required:true},
      {key:'partenaire',label:"Partenaire ou bailleur",type:'text',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true},
      {key:'activites',label:"Activités prévues",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LUTTE CONTRE LA DRÉPANOCYTOSE</h1>
<p>Centre : <strong>{{centre_drepa}}</strong> — Partenaire : <strong>{{partenaire}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Programme de lutte contre la drépanocytose à compter du {{date_debut}}.</p>
<h2>Article 2 – Activités</h2>
<p>{{activites}}</p>
<h2>Article 3 – Droit applicable</h2>
<p>Accord conforme au Plan Stratégique National de Lutte contre la Drépanocytose en Côte d'Ivoire.</p></div>` },

  {
    code: 'san3_urgences_orsec', name: "Accord de service d'urgences de santé publique (ORSEC santé)",
    category: 'sante', price: 9000, priceMax: 27000,
    description: "Convention d'activation des dispositifs ORSEC santé pour la gestion des urgences de santé publique en CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'autorite',label:"Autorité déclenchante",type:'text',required:true},
      {key:'partenaire_orsec',label:"Partenaire ORSEC santé",type:'text',required:true},
      {key:'type_urgence',label:"Type d'urgence de santé publique",type:'text',required:true},
      {key:'date_declenchement',label:"Date de déclenchement",type:'date',required:true},
      {key:'ressources',label:"Ressources mobilisées",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'URGENCES DE SANTÉ PUBLIQUE (ORSEC SANTÉ)</h1>
<p>Autorité : <strong>{{autorite}}</strong> — Partenaire : <strong>{{partenaire_orsec}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Activation du dispositif ORSEC Santé pour l'urgence de type {{type_urgence}} le {{date_declenchement}}.</p>
<h2>Article 2 – Ressources mobilisées</h2>
<p>{{ressources}}</p>
<h2>Article 3 – Commandement</h2>
<p>Un poste de commandement opérationnel (PCO) santé est activé sous l'autorité du Ministre de la Santé ou son délégué.</p></div>` },

  {
    code: 'san3_labo_sante_pub', name: "Accord de service de laboratoire de santé publique",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Convention de prestation de laboratoire de référence pour la santé publique (diagnostics, contrôle qualité).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'laboratoire',label:"Laboratoire prestataire",type:'text',required:true},
      {key:'institution',label:"Institution mandante",type:'text',required:true},
      {key:'date_debut',label:"Date d'effet",type:'date',required:true},
      {key:'analyses',label:"Types d'analyses couvertes",type:'textarea',required:true},
      {key:'delai_rendu',label:"Délai de rendu des résultats",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LABORATOIRE DE SANTÉ PUBLIQUE</h1>
<p>Laboratoire : <strong>{{laboratoire}}</strong> — Institution : <strong>{{institution}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Prestation de services de laboratoire de santé publique à compter du {{date_debut}}.</p>
<h2>Article 2 – Analyses couvertes</h2>
<p>{{analyses}}</p>
<h2>Article 3 – Délais et qualité</h2>
<p>Les résultats sont rendus dans un délai de {{delai_rendu}}. Le laboratoire est accrédité selon les normes ISO 15189 ou équivalent reconnu par le MSLS-CI.</p></div>` },

  {
    code: 'san3_pharmacovigilance', name: "Accord de service de pharmacovigilance nationale (LNSP CI)",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Convention de pharmacovigilance nationale entre le LNSP-CI et les établissements de santé ou industriels pharmaceutiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement ou industriel pharmaceutique",type:'text',required:true},
      {key:'date_debut',label:"Date d'effet",type:'date',required:true},
      {key:'medicaments',label:"Médicaments sous surveillance",type:'textarea',required:true},
      {key:'referent',label:"Référent pharmacovigilance",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHARMACOVIGILANCE NATIONALE</h1>
<p>Établissement : <strong>{{etablissement}}</strong> — Référent : <strong>{{referent}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord organise la pharmacovigilance des médicaments ci-après à compter du {{date_debut}} : {{medicaments}}.</p>
<h2>Article 2 – Obligations de déclaration</h2>
<p>Tout effet indésirable grave doit être déclaré au LNSP-CI dans les 72 heures suivant sa détection.</p>
<h2>Article 3 – Droit applicable</h2>
<p>Accord régi par la réglementation pharmaceutique en vigueur en Côte d'Ivoire et les lignes directrices de l'OMS.</p></div>` },

  {
    code: 'san3_partenariat_oms', name: "Accord de partenariat OMS-gouvernement CI (soins primaires)",
    category: 'sante', price: 10000, priceMax: 30000,
    description: "Accord-cadre de partenariat entre l'OMS et le Gouvernement de Côte d'Ivoire pour le renforcement des soins de santé primaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'representant_oms',label:"Représentant OMS en CI",type:'text',required:true},
      {key:'ministre',label:"Ministre de la Santé",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'domaines',label:"Domaines de coopération",type:'textarea',required:true},
      {key:'duree',label:"Durée du partenariat",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT OMS – GOUVERNEMENT DE CÔTE D'IVOIRE</h1>
<p>OMS : <strong>{{representant_oms}}</strong> — Gouvernement CI : <strong>{{ministre}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Partenariat pour le renforcement des soins de santé primaires, signé le {{date_signature}}, pour une durée de {{duree}}.</p>
<h2>Article 2 – Domaines de coopération</h2>
<p>{{domaines}}</p>
<h2>Article 3 – Gouvernance</h2>
<p>Un comité de pilotage conjoint se réunit semestriellement pour évaluer la mise en œuvre du présent accord.</p></div>` },

  {
    code: 'san3_financement_etat', name: "Accord de financement santé par l'État (budget programme)",
    category: 'sante', price: 9000, priceMax: 27000,
    description: "Convention de financement des programmes de santé publique par l'État de Côte d'Ivoire dans le cadre du budget-programme.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'programme',label:"Programme de santé financé",type:'text',required:true},
      {key:'montant',label:"Montant alloué (FCFA)",type:'text',required:true},
      {key:'annee_budgetaire',label:"Année budgétaire",type:'text',required:true},
      {key:'responsable_programme',label:"Responsable du programme",type:'text',required:true},
      {key:'objectifs',label:"Objectifs mesurables",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT SANTÉ PAR L'ÉTAT (BUDGET-PROGRAMME)</h1>
<p>Programme : <strong>{{programme}}</strong> — Responsable : <strong>{{responsable_programme}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Financement du programme {{programme}} à hauteur de {{montant}} FCFA pour l'année budgétaire {{annee_budgetaire}}.</p>
<h2>Article 2 – Objectifs</h2>
<p>{{objectifs}}</p>
<h2>Article 3 – Contrôle budgétaire</h2>
<p>Les fonds sont gérés conformément à la loi organique relative aux lois de finances (LOLF-CI) et font l'objet d'un audit annuel de la Cour des Comptes.</p></div>` },

  {
    code: 'san3_rapport_epi_annuel', name: "Rapport épidémiologique annuel",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Modèle de rapport épidémiologique annuel pour les districts et régions sanitaires de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'district',label:"District ou région sanitaire",type:'text',required:true},
      {key:'annee',label:"Année du rapport",type:'text',required:true},
      {key:'redacteur',label:"Rédacteur du rapport",type:'text',required:true},
      {key:'resume_situation',label:"Résumé de la situation épidémiologique",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT ÉPIDÉMIOLOGIQUE ANNUEL</h1>
<p>District/Région : <strong>{{district}}</strong> — Année : <strong>{{annee}}</strong></p>
<h2>1. Introduction</h2>
<p>Rapport établi par {{redacteur}} pour l'année {{annee}}.</p>
<h2>2. Situation épidémiologique</h2>
<p>{{resume_situation}}</p>
<h2>3. Recommandations</h2>
<p>Les recommandations détaillées sont annexées au présent rapport et soumises à la Direction Régionale de la Santé.</p></div>` },

  {
    code: 'san3_plan_sante_nat', name: "Plan de santé publique national",
    category: 'sante', price: 10000, priceMax: 30000,
    description: "Modèle de plan national de santé publique pour la Côte d'Ivoire, couvrant les priorités stratégiques pluriannuelles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'periode',label:"Période du plan (ex. 2025-2029)",type:'text',required:true},
      {key:'ministre',label:"Ministre signataire",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'axes_strategiques',label:"Axes stratégiques prioritaires",type:'textarea',required:true},
      {key:'budget_total',label:"Budget total prévisionnel (FCFA)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>PLAN NATIONAL DE SANTÉ PUBLIQUE {{periode}}</h1>
<p>Adopté le {{date_adoption}} sous l'autorité de <strong>{{ministre}}</strong>.</p>
<h2>Article 1 – Vision</h2>
<p>Assurer à toute la population ivoirienne l'accès à des services de santé de qualité, conformément à l'objectif de couverture sanitaire universelle.</p>
<h2>Article 2 – Axes stratégiques</h2>
<p>{{axes_strategiques}}</p>
<h2>Article 3 – Financement</h2>
<p>Budget total prévisionnel : {{budget_total}} FCFA, mobilisé auprès de l'État, des partenaires techniques et financiers, et du secteur privé.</p></div>` },

  {
    code: 'san3_formation_enssp', name: "Accord de service de formation en santé publique (ENSSP)",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de formation entre l'ENSSP (École Nationale Supérieure de Santé Publique) et des institutions partenaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'institution_partenaire',label:"Institution partenaire",type:'text',required:true},
      {key:'formation',label:"Intitulé de la formation",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN SANTÉ PUBLIQUE (ENSSP)</h1>
<p>Institution partenaire : <strong>{{institution_partenaire}}</strong> — Formation : <strong>{{formation}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Organisation de la formation {{formation}} du {{date_debut}} au {{date_fin}} pour {{nombre_stagiaires}} stagiaires.</p>
<h2>Article 2 – Obligations pédagogiques</h2>
<p>L'ENSSP assure la qualité pédagogique et la délivrance des attestations. L'institution partenaire prend en charge les frais de participation.</p>
<h2>Article 3 – Droit applicable</h2>
<p>Accord régi par la réglementation ivoirienne de l'enseignement supérieur et de la santé.</p></div>` },

  {
    code: 'san3_charte_sante_univ', name: "Charte de la santé publique universelle et du droit à la santé",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Charte d'engagement institutionnel pour la promotion de la santé publique universelle et du droit à la santé en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'institution',label:"Institution signataire",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'engagements',label:"Engagements spécifiques",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA SANTÉ PUBLIQUE UNIVERSELLE ET DU DROIT À LA SANTÉ</h1>
<p>Institution : <strong>{{institution}}</strong> — Représentant : <strong>{{representant}}</strong></p>
<h2>Préambule</h2>
<p>Signataire le {{date_signature}}, l'institution souscrit aux principes de la Constitution ivoirienne et des instruments internationaux garantissant le droit à la santé.</p>
<h2>Article 1 – Engagements</h2>
<p>{{engagements}}</p>
<h2>Article 2 – Suivi</h2>
<p>L'institution publie annuellement un rapport sur la mise en œuvre de la présente charte.</p></div>` },

  // ── 25 MÉDECINE LÉGALE / EXPERTISE JUDICIAIRE (med3_) ──────────────────────
  {
    code: 'med3_expert_judiciaire', name: "Accord de service d'expertise médicale judiciaire (expert auprès des tribunaux)",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Convention de mission d'expertise médicale judiciaire entre un tribunal et un médecin expert inscrit sur la liste de la Cour d'Appel d'Abidjan.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'tribunal',label:"Tribunal mandant",type:'text',required:true},
      {key:'medecin_expert',label:"Médecin expert désigné",type:'text',required:true},
      {key:'numero_dossier',label:"Numéro de dossier judiciaire",type:'text',required:true},
      {key:'objet_expertise',label:"Objet de l'expertise",type:'textarea',required:true},
      {key:'date_depot',label:"Date limite de dépôt du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXPERTISE MÉDICALE JUDICIAIRE</h1>
<p>Tribunal : <strong>{{tribunal}}</strong> — Expert : <strong>{{medecin_expert}}</strong> — Dossier N° : <strong>{{numero_dossier}}</strong></p>
<h2>Article 1 – Désignation</h2>
<p>Le tribunal désigne {{medecin_expert}} en qualité d'expert médical judiciaire pour la mission définie ci-après.</p>
<h2>Article 2 – Mission</h2>
<p>{{objet_expertise}}</p>
<h2>Article 3 – Délai</h2>
<p>Le rapport d'expertise doit être déposé au greffe du tribunal au plus tard le {{date_depot}}.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord régi par le Code de Procédure Civile, Commerciale et Administrative ivoirien et les textes OHADA applicables.</p></div>` },

  {
    code: 'med3_autopsie_judiciaire', name: "Accord de service d'autopsie judiciaire",
    category: 'juridique_admin', price: 9000, priceMax: 27000,
    description: "Convention de prestation d'autopsie judiciaire entre les autorités judiciaires et un médecin légiste en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'parquet',label:"Parquet requérant",type:'text',required:true},
      {key:'legiste',label:"Médecin légiste désigné",type:'text',required:true},
      {key:'identite_defunt',label:"Identité du défunt (si connue)",type:'text',required:false},
      {key:'date_autopsie',label:"Date de l'autopsie",type:'date',required:true},
      {key:'circonstances',label:"Circonstances du décès",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUTOPSIE JUDICIAIRE</h1>
<p>Parquet : <strong>{{parquet}}</strong> — Légiste : <strong>{{legiste}}</strong></p>
<h2>Article 1 – Réquisition</h2>
<p>Le parquet de {{parquet}} réquisitionne {{legiste}} pour pratiquer une autopsie judiciaire le {{date_autopsie}} sur le corps de {{identite_defunt}}.</p>
<h2>Article 2 – Circonstances</h2>
<p>{{circonstances}}</p>
<h2>Article 3 – Rapport</h2>
<p>Le médecin légiste remet son rapport au parquet dans les délais fixés par le Code de Procédure Pénale ivoirien.</p></div>` },

  {
    code: 'med3_thanatologie', name: "Accord de service d'examen thanatologique",
    category: 'juridique_admin', price: 8000, priceMax: 24000,
    description: "Convention de prestation d'examen thanatologique (détermination de la cause et de la date du décès) en contexte médico-légal.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'autorite_requise',label:"Autorité requérante",type:'text',required:true},
      {key:'medecin',label:"Médecin thanatologue",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true},
      {key:'objet',label:"Objet de l'examen thanatologique",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXAMEN THANATOLOGIQUE</h1>
<p>Autorité requérante : <strong>{{autorite_requise}}</strong> — Médecin : <strong>{{medecin}}</strong></p>
<h2>Article 1 – Mission</h2>
<p>Examen thanatologique prévu le {{date_examen}}. Objet : {{objet}}</p>
<h2>Article 2 – Résultats</h2>
<p>Les conclusions de l'examen sont consignées dans un rapport médico-légal remis à l'autorité requérante dans les délais légaux.</p>
<h2>Article 3 – Droit applicable</h2>
<p>Mission régie par le Code de Procédure Pénale de Côte d'Ivoire.</p></div>` },

  {
    code: 'med3_toxicologie', name: "Accord de service de toxicologie légale",
    category: 'juridique_admin', price: 9000, priceMax: 27000,
    description: "Convention de prestation d'analyses toxicologiques légales (poisons, drogues, alcool) dans le cadre d'une procédure judiciaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'laboratoire',label:"Laboratoire toxicologique",type:'text',required:true},
      {key:'autorite',label:"Autorité judiciaire mandante",type:'text',required:true},
      {key:'reference_dossier',label:"Référence du dossier judiciaire",type:'text',required:true},
      {key:'substances_recherchees',label:"Substances recherchées",type:'textarea',required:true},
      {key:'date_remise',label:"Date limite de remise des résultats",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TOXICOLOGIE LÉGALE</h1>
<p>Laboratoire : <strong>{{laboratoire}}</strong> — Dossier : <strong>{{reference_dossier}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Mission de toxicologie légale confiée à {{laboratoire}} par {{autorite}}. Substances recherchées : {{substances_recherchees}}.</p>
<h2>Article 2 – Délai</h2>
<p>Les résultats analytiques sont remis au plus tard le {{date_remise}}.</p>
<h2>Article 3 – Confidentialité</h2>
<p>Les résultats sont strictement confidentiels et ne sont communiqués qu'à l'autorité judiciaire mandante.</p></div>` },

  {
    code: 'med3_adn_judiciaire', name: "Accord de service d'analyse ADN judiciaire",
    category: 'juridique_admin', price: 12000, priceMax: 36000,
    description: "Convention de prestation d'analyses génétiques (ADN) à des fins judiciaires (identification, filiation, scène de crime).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'laboratoire_adn',label:"Laboratoire ADN accrédité",type:'text',required:true},
      {key:'tribunal',label:"Tribunal requérant",type:'text',required:true},
      {key:'numero_affaire',label:"Numéro d'affaire",type:'text',required:true},
      {key:'type_analyse',label:"Type d'analyse ADN",type:'text',required:true},
      {key:'date_rendu',label:"Date de rendu des résultats",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ANALYSE ADN JUDICIAIRE</h1>
<p>Laboratoire : <strong>{{laboratoire_adn}}</strong> — Tribunal : <strong>{{tribunal}}</strong> — Affaire N° : <strong>{{numero_affaire}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Analyse ADN de type {{type_analyse}} ordonnée par {{tribunal}}.</p>
<h2>Article 2 – Délai</h2>
<p>Résultats attendus au plus tard le {{date_rendu}}.</p>
<h2>Article 3 – Garde des prélèvements</h2>
<p>Les prélèvements sont conservés sous scellés judiciaires. Toute utilisation à d'autres fins est interdite.</p></div>` },

  {
    code: 'med3_balistique', name: "Accord de service de balistique médico-légale",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Convention de prestation d'expertise balistique médico-légale dans le cadre de procédures pénales en CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'expert',label:"Expert balisticien-médecin légiste",type:'text',required:true},
      {key:'parquet',label:"Parquet ou juge d'instruction",type:'text',required:true},
      {key:'dossier',label:"Référence du dossier pénal",type:'text',required:true},
      {key:'objet_mission',label:"Objet de la mission balistique",type:'textarea',required:true},
      {key:'date_rapport',label:"Date limite du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BALISTIQUE MÉDICO-LÉGALE</h1>
<p>Expert : <strong>{{expert}}</strong> — Dossier : <strong>{{dossier}}</strong></p>
<h2>Article 1 – Mission</h2>
<p>Mission d'expertise balistique médico-légale confiée à {{expert}} par {{parquet}}.</p>
<h2>Article 2 – Objet</h2>
<p>{{objet_mission}}</p>
<h2>Article 3 – Rapport</h2>
<p>Rapport déposé au plus tard le {{date_rapport}} au greffe compétent.</p></div>` },

  {
    code: 'med3_expertise_psy', name: "Accord de service d'expertise psychiatrique judiciaire",
    category: 'juridique_admin', price: 11000, priceMax: 33000,
    description: "Convention de mission d'expertise psychiatrique ordonnée par une juridiction pénale ou civile en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'psychiatre',label:"Psychiatre expert",type:'text',required:true},
      {key:'juridiction',label:"Juridiction mandante",type:'text',required:true},
      {key:'sujet',label:"Identité du sujet expertisé",type:'text',required:true},
      {key:'questions_poser',label:"Questions posées à l'expert",type:'textarea',required:true},
      {key:'date_depot',label:"Date de dépôt du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXPERTISE PSYCHIATRIQUE JUDICIAIRE</h1>
<p>Psychiatre expert : <strong>{{psychiatre}}</strong> — Juridiction : <strong>{{juridiction}}</strong></p>
<h2>Article 1 – Mission</h2>
<p>{{juridiction}} confie à {{psychiatre}} une mission d'expertise psychiatrique sur la personne de {{sujet}}.</p>
<h2>Article 2 – Questions posées</h2>
<p>{{questions_poser}}</p>
<h2>Article 3 – Délai et remise</h2>
<p>Rapport déposé au greffe au plus tard le {{date_depot}}.</p></div>` },

  {
    code: 'med3_legale_travail', name: "Accord de service de médecine légale du travail (accident)",
    category: 'juridique_admin', price: 8000, priceMax: 24000,
    description: "Convention d'expertise médico-légale en matière d'accident du travail, dans le cadre des procédures CNPS-CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'medecin_expert',label:"Médecin expert désigné",type:'text',required:true},
      {key:'victime',label:"Identité de la victime",type:'text',required:true},
      {key:'employeur',label:"Employeur concerné",type:'text',required:true},
      {key:'date_accident',label:"Date de l'accident du travail",type:'date',required:true},
      {key:'mission',label:"Mission confiée à l'expert",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MÉDECINE LÉGALE DU TRAVAIL</h1>
<p>Expert : <strong>{{medecin_expert}}</strong> — Victime : <strong>{{victime}}</strong> — Employeur : <strong>{{employeur}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Expertise médico-légale suite à l'accident du travail survenu le {{date_accident}}.</p>
<h2>Article 2 – Mission</h2>
<p>{{mission}}</p>
<h2>Article 3 – Droit applicable</h2>
<p>Expertise régie par le Code du Travail ivoirien et la réglementation CNPS relative aux accidents du travail.</p></div>` },

  {
    code: 'med3_eval_dommage_corp', name: "Accord de service d'évaluation du dommage corporel (expertise)",
    category: 'juridique_admin', price: 9000, priceMax: 27000,
    description: "Convention d'expertise médicale pour l'évaluation du dommage corporel à des fins d'indemnisation (CI/OHADA/CIMA).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'expert',label:"Médecin expert",type:'text',required:true},
      {key:'victime',label:"Victime à expertiser",type:'text',required:true},
      {key:'mandant',label:"Mandant (assureur ou tribunal)",type:'text',required:true},
      {key:'date_expertise',label:"Date de l'expertise",type:'date',required:true},
      {key:'poste_prejudice',label:"Postes de préjudice à évaluer",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉVALUATION DU DOMMAGE CORPOREL</h1>
<p>Expert : <strong>{{expert}}</strong> — Victime : <strong>{{victime}}</strong> — Mandant : <strong>{{mandant}}</strong></p>
<h2>Article 1 – Mission</h2>
<p>Expertise du dommage corporel prévue le {{date_expertise}}.</p>
<h2>Article 2 – Postes de préjudice</h2>
<p>{{poste_prejudice}}</p>
<h2>Article 3 – Nomenclature</h2>
<p>L'évaluation est conduite selon la nomenclature DINTILHAC adaptée au contexte ivoirien et aux dispositions du Code CIMA.</p></div>` },

  {
    code: 'med3_prejudice_prof', name: "Accord de service d'évaluation du préjudice professionnel",
    category: 'juridique_admin', price: 8000, priceMax: 24000,
    description: "Convention d'expertise médicale pour l'évaluation du préjudice professionnel (perte de revenus, inaptitude au poste).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'expert',label:"Médecin expert",type:'text',required:true},
      {key:'victime',label:"Salarié ou victime",type:'text',required:true},
      {key:'date_expertise',label:"Date de l'expertise",type:'date',required:true},
      {key:'poste_occupe',label:"Poste occupé avant l'accident",type:'text',required:true},
      {key:'elements_prejudice',label:"Éléments du préjudice professionnel",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉVALUATION DU PRÉJUDICE PROFESSIONNEL</h1>
<p>Expert : <strong>{{expert}}</strong> — Victime : <strong>{{victime}}</strong></p>
<h2>Article 1 – Mission</h2>
<p>Évaluation du préjudice professionnel lié au poste {{poste_occupe}}, expertise prévue le {{date_expertise}}.</p>
<h2>Article 2 – Éléments à évaluer</h2>
<p>{{elements_prejudice}}</p>
<h2>Article 3 – Droit applicable</h2>
<p>Expertise régie par le Code du Travail ivoirien, le Code CIMA et la jurisprudence des tribunaux du travail d'Abidjan.</p></div>` },

  {
    code: 'med3_reparation_cima', name: "Accord de service de réparation du dommage corporel (CIMA CI)",
    category: 'juridique_admin', price: 9000, priceMax: 27000,
    description: "Convention de prise en charge de la réparation du dommage corporel selon le barème CIMA applicable en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'assureur',label:"Compagnie d'assurance",type:'text',required:true},
      {key:'victime',label:"Victime bénéficiaire",type:'text',required:true},
      {key:'date_sinistre',label:"Date du sinistre",type:'date',required:true},
      {key:'montant_offre',label:"Montant de l'offre (FCFA)",type:'text',required:true},
      {key:'postes_indemnises',label:"Postes indemnisés selon barème CIMA",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉPARATION DU DOMMAGE CORPOREL (CIMA)</h1>
<p>Assureur : <strong>{{assureur}}</strong> — Victime : <strong>{{victime}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord fixe les termes de la réparation du dommage corporel consécutif au sinistre du {{date_sinistre}}.</p>
<h2>Article 2 – Indemnisation</h2>
<p>Postes indemnisés : {{postes_indemnises}} — Montant total : {{montant_offre}} FCFA.</p>
<h2>Article 3 – Droit applicable</h2>
<p>Accord régi par le Code CIMA (articles 231 et suivants) et le droit ivoirien des assurances.</p></div>` },

  {
    code: 'med3_certificat_dommage', name: "Accord de certificat médical de dommage corporel",
    category: 'juridique_admin', price: 5000, priceMax: 15000,
    description: "Modèle de certificat médical descriptif du dommage corporel établi par un médecin légiste en CI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'medecin',label:"Médecin rédacteur",type:'text',required:true},
      {key:'patient',label:"Identité du patient",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true},
      {key:'description_lesions',label:"Description des lésions",type:'textarea',required:true},
      {key:'itt',label:"Incapacité Totale de Travail (jours)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>CERTIFICAT MÉDICAL DE DOMMAGE CORPOREL</h1>
<p>Médecin : <strong>{{medecin}}</strong> — Patient : <strong>{{patient}}</strong></p>
<h2>Examen du {{date_examen}}</h2>
<h2>Description des lésions</h2>
<p>{{description_lesions}}</p>
<h2>Incapacité de Travail</h2>
<p>ITT fixée à {{itt}} jours à compter de la date de l'examen, sous réserve d'évolution et de complications.</p>
<p><em>Certificat établi à la demande de l'intéressé pour valoir ce que de droit.</em></p></div>` },

  {
    code: 'med3_reconstitution_accident', name: "Accord de service de reconstitution d'accident (médecin expert)",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Convention de mission d'expertise médicale pour la reconstitution biomécanique et médico-légale d'un accident.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'expert',label:"Médecin expert biomécanique",type:'text',required:true},
      {key:'juridiction',label:"Juridiction mandante",type:'text',required:true},
      {key:'dossier',label:"Référence dossier",type:'text',required:true},
      {key:'type_accident',label:"Type d'accident à reconstituer",type:'text',required:true},
      {key:'date_mission',label:"Date de la mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECONSTITUTION D'ACCIDENT (MÉDECIN EXPERT)</h1>
<p>Expert : <strong>{{expert}}</strong> — Dossier : <strong>{{dossier}}</strong></p>
<h2>Article 1 – Mission</h2>
<p>{{juridiction}} confie à {{expert}} la reconstitution de l'accident de type {{type_accident}}, mission programmée le {{date_mission}}.</p>
<h2>Article 2 – Méthode</h2>
<p>L'expert procède à l'analyse biomécanique des lésions, à l'étude des pièces et à la reconstitution cinématique de l'accident.</p>
<h2>Article 3 – Rapport</h2>
<p>Rapport remis à {{juridiction}} dans les délais fixés par ordonnance.</p></div>` },

  {
    code: 'med3_expert_conseil_ass', name: "Accord de service d'expertise médecin conseil assurance",
    category: 'juridique_admin', price: 8000, priceMax: 24000,
    description: "Convention de mission du médecin conseil d'une compagnie d'assurance pour l'évaluation médico-légale d'un sinistre corporel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'assureur',label:"Compagnie d'assurance",type:'text',required:true},
      {key:'medecin_conseil',label:"Médecin conseil désigné",type:'text',required:true},
      {key:'victime',label:"Assuré ou victime",type:'text',required:true},
      {key:'date_expertise',label:"Date d'expertise",type:'date',required:true},
      {key:'mission',label:"Mission du médecin conseil",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXPERTISE MÉDECIN CONSEIL ASSURANCE</h1>
<p>Assureur : <strong>{{assureur}}</strong> — Médecin conseil : <strong>{{medecin_conseil}}</strong></p>
<h2>Article 1 – Mission</h2>
<p>{{assureur}} mandate {{medecin_conseil}} pour l'expertise de {{victime}} le {{date_expertise}}.</p>
<h2>Article 2 – Étendue de la mission</h2>
<p>{{mission}}</p>
<h2>Article 3 – Déontologie</h2>
<p>Le médecin conseil exerce sa mission en toute indépendance, dans le respect du Code de Déontologie Médicale ivoirien.</p></div>` },

  {
    code: 'med3_contre_expertise', name: "Accord de service de contre-expertise médicale",
    category: 'juridique_admin', price: 8000, priceMax: 24000,
    description: "Convention de contre-expertise médicale demandée par une partie pour contester les conclusions d'une expertise initiale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'expert_contre',label:"Médecin contre-expert",type:'text',required:true},
      {key:'partie_demanderesse',label:"Partie demanderesse",type:'text',required:true},
      {key:'expertise_initiale',label:"Référence de l'expertise initiale",type:'text',required:true},
      {key:'date_contre_expertise',label:"Date de la contre-expertise",type:'date',required:true},
      {key:'points_contestes',label:"Points contestés",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONTRE-EXPERTISE MÉDICALE</h1>
<p>Contre-expert : <strong>{{expert_contre}}</strong> — Demandeur : <strong>{{partie_demanderesse}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Contre-expertise de l'expertise N° {{expertise_initiale}}, programmée le {{date_contre_expertise}}.</p>
<h2>Article 2 – Points contestés</h2>
<p>{{points_contestes}}</p>
<h2>Article 3 – Procédure</h2>
<p>La contre-expertise est conduite contradictoirement en présence des parties ou de leurs représentants, conformément au Code de Procédure Civile ivoirien.</p></div>` },

  {
    code: 'med3_expert_cnps', name: "Accord de service d'expertise médecin expert CNPS CI",
    category: 'juridique_admin', price: 7000, priceMax: 21000,
    description: "Convention de mission du médecin expert agréé par la CNPS-CI pour l'évaluation des accidents du travail et maladies professionnelles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'expert_cnps',label:"Médecin expert CNPS",type:'text',required:true},
      {key:'travailleur',label:"Travailleur assuré",type:'text',required:true},
      {key:'numero_cnps',label:"Numéro CNPS du travailleur",type:'text',required:true},
      {key:'date_expertise',label:"Date d'expertise CNPS",type:'date',required:true},
      {key:'nature_sinistre',label:"Nature du sinistre (AT/MP)",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXPERTISE MÉDECIN EXPERT CNPS CI</h1>
<p>Expert : <strong>{{expert_cnps}}</strong> — Travailleur : <strong>{{travailleur}}</strong> (N° CNPS : {{numero_cnps}})</p>
<h2>Article 1 – Mission</h2>
<p>Expertise CNPS prévue le {{date_expertise}} pour évaluation du sinistre : {{nature_sinistre}}</p>
<h2>Article 2 – Conclusions</h2>
<p>Les conclusions de l'expert sont transmises à la CNPS-CI et au travailleur. Elles servent de base au calcul de la rente ou de l'indemnité.</p>
<h2>Article 3 – Droit applicable</h2>
<p>Mission régie par le Code de la Sécurité Sociale de Côte d'Ivoire et le règlement intérieur de la CNPS.</p></div>` },

  {
    code: 'med3_ipp', name: "Accord de service de détermination d'invalidité permanente partielle (IPP)",
    category: 'juridique_admin', price: 8000, priceMax: 24000,
    description: "Convention d'expertise médicale pour la détermination du taux d'invalidité permanente partielle (IPP) à des fins d'indemnisation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'expert',label:"Médecin expert",type:'text',required:true},
      {key:'victime',label:"Victime expertisée",type:'text',required:true},
      {key:'date_consolidation',label:"Date de consolidation des lésions",type:'date',required:true},
      {key:'barème',label:"Barème utilisé pour l'IPP",type:'text',required:true},
      {key:'lesions',label:"Description des séquelles permanentes",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉTERMINATION D'IPP</h1>
<p>Expert : <strong>{{expert}}</strong> — Victime : <strong>{{victime}}</strong></p>
<h2>Article 1 – Consolidation</h2>
<p>Date de consolidation des lésions : {{date_consolidation}}.</p>
<h2>Article 2 – Séquelles permanentes</h2>
<p>{{lesions}}</p>
<h2>Article 3 – Évaluation IPP</h2>
<p>Taux d'IPP déterminé selon le barème {{barème}}. Le rapport d'expertise est annexé au présent accord.</p></div>` },

  {
    code: 'med3_itt', name: "Accord de service de détermination du taux d'incapacité de travail (ITT)",
    category: 'juridique_admin', price: 7000, priceMax: 21000,
    description: "Convention d'expertise médicale pour la fixation de la durée d'incapacité totale de travail (ITT) en matière pénale ou civile.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'expert',label:"Médecin expert",type:'text',required:true},
      {key:'patient',label:"Patient expertisé",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true},
      {key:'contexte',label:"Contexte (pénal / civil / travail)",type:'text',required:true},
      {key:'lesions_constatees',label:"Lésions et symptômes constatés",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉTERMINATION DU TAUX D'ITT</h1>
<p>Expert : <strong>{{expert}}</strong> — Patient : <strong>{{patient}}</strong></p>
<h2>Article 1 – Examen</h2>
<p>Examen réalisé le {{date_examen}} dans le contexte {{contexte}}.</p>
<h2>Article 2 – Lésions constatées</h2>
<p>{{lesions_constatees}}</p>
<h2>Article 3 – ITT fixée</h2>
<p>L'incapacité totale de travail est fixée selon les conclusions du rapport d'expertise joint au présent accord.</p></div>` },

  {
    code: 'med3_rapport_agression', name: "Accord de rapport d'examen médico-légal pour victime d'agression",
    category: 'juridique_admin', price: 6000, priceMax: 18000,
    description: "Modèle de rapport d'examen médico-légal établi par un médecin à la suite d'une agression physique ou sexuelle en CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'medecin',label:"Médecin rédacteur",type:'text',required:true},
      {key:'victime',label:"Identité de la victime",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true},
      {key:'circonstances_agression',label:"Circonstances de l'agression",type:'textarea',required:true},
      {key:'constatations',label:"Constatations médico-légales",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXAMEN MÉDICO-LÉGAL – VICTIME D'AGRESSION</h1>
<p>Médecin : <strong>{{medecin}}</strong> — Victime : <strong>{{victime}}</strong> — Date : <strong>{{date_examen}}</strong></p>
<h2>1. Circonstances</h2>
<p>{{circonstances_agression}}</p>
<h2>2. Constatations médico-légales</h2>
<p>{{constatations}}</p>
<h2>3. Conclusion</h2>
<p>Rapport établi à la demande des autorités judiciaires pour valoir ce que de droit. Toute reproduction partielle est interdite sans autorisation judiciaire.</p></div>` },

  {
    code: 'med3_expert_mineurs', name: "Accord de service d'expertise pour les mineurs victimes",
    category: 'juridique_admin', price: 9000, priceMax: 27000,
    description: "Convention d'expertise médico-légale spécialisée pour les mineurs victimes de violence ou d'abus en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'expert_pediatre',label:"Pédiatre-médecin légiste",type:'text',required:true},
      {key:'juridiction',label:"Juridiction pour enfants",type:'text',required:true},
      {key:'identite_mineur',label:"Identité du mineur (initiales)",type:'text',required:true},
      {key:'date_naissance_mineur',label:"Date de naissance du mineur",type:'date',required:true},
      {key:'faits_allegues',label:"Faits allégués nécessitant l'expertise",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXPERTISE POUR LES MINEURS VICTIMES</h1>
<p>Expert : <strong>{{expert_pediatre}}</strong> — Juridiction : <strong>{{juridiction}}</strong></p>
<h2>Article 1 – Identité du mineur</h2>
<p>Mineur : {{identite_mineur}}, né(e) le {{date_naissance_mineur}}.</p>
<h2>Article 2 – Faits allégués</h2>
<p>{{faits_allegues}}</p>
<h2>Article 3 – Conditions d'expertise</h2>
<p>L'expertise est conduite en présence du représentant légal du mineur ou d'un tuteur judiciaire désigné. Les conclusions respectent le principe de l'intérêt supérieur de l'enfant (Convention ONU, ratifiée par la CI).</p></div>` },

  {
    code: 'med3_signalement_enfant', name: "Accord de service de signalement médical (enfant en danger)",
    category: 'juridique_admin', price: 5000, priceMax: 15000,
    description: "Modèle de convention de signalement médical pour enfant en danger, entre une structure de santé et les autorités judiciaires CI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'structure_sante',label:"Structure de santé signataire",type:'text',required:true},
      {key:'autorite_receptrice',label:"Autorité receptrice (parquet, DSPS)",type:'text',required:true},
      {key:'date_signalement',label:"Date du signalement",type:'date',required:true},
      {key:'elements_danger',label:"Éléments constitutifs du danger",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SIGNALEMENT MÉDICAL – ENFANT EN DANGER</h1>
<p>Structure : <strong>{{structure_sante}}</strong> — Autorité : <strong>{{autorite_receptrice}}</strong></p>
<h2>Article 1 – Signalement</h2>
<p>Signalement effectué le {{date_signalement}} par la structure de santé.</p>
<h2>Article 2 – Éléments du danger</h2>
<p>{{elements_danger}}</p>
<h2>Article 3 – Obligation légale</h2>
<p>Le signalement est effectué conformément à l'article 350 du Code Pénal ivoirien et à la Loi sur la protection des droits de l'enfant en CI.</p></div>` },

  {
    code: 'med3_partenariat_tribunal', name: "Accord de partenariat tribunal-médecin expert",
    category: 'juridique_admin', price: 7000, priceMax: 21000,
    description: "Convention cadre de partenariat entre une juridiction ivoirienne et un médecin expert pour des missions récurrentes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'tribunal',label:"Tribunal partenaire",type:'text',required:true},
      {key:'expert',label:"Médecin expert partenaire",type:'text',required:true},
      {key:'specialite',label:"Spécialité médicale de l'expert",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet du partenariat",type:'date',required:true},
      {key:'modalites',label:"Modalités d'intervention",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT TRIBUNAL – MÉDECIN EXPERT</h1>
<p>Tribunal : <strong>{{tribunal}}</strong> — Expert : <strong>{{expert}}</strong> (spécialité : {{specialite}})</p>
<h2>Article 1 – Objet</h2>
<p>Partenariat pour missions d'expertise médicale récurrentes, à compter du {{date_effet}}.</p>
<h2>Article 2 – Modalités</h2>
<p>{{modalites}}</p>
<h2>Article 3 – Rémunération</h2>
<p>Les honoraires sont fixés selon le tarif judiciaire en vigueur et réglés par le greffe à réception du rapport.</p></div>` },

  {
    code: 'med3_rapport_expertise', name: "Rapport d'expertise médicale judiciaire",
    category: 'juridique_admin', price: 7000, priceMax: 21000,
    description: "Modèle de rapport d'expertise médicale judiciaire conforme aux exigences des juridictions de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'expert',label:"Médecin expert",type:'text',required:true},
      {key:'juridiction',label:"Juridiction ayant ordonné l'expertise",type:'text',required:true},
      {key:'dossier',label:"Référence du dossier",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'conclusions',label:"Conclusions de l'expertise",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXPERTISE MÉDICALE JUDICIAIRE</h1>
<p>Expert : <strong>{{expert}}</strong> — Dossier : <strong>{{dossier}}</strong> — Date : <strong>{{date_rapport}}</strong></p>
<h2>I. Mission</h2>
<p>Expertise ordonnée par {{juridiction}}.</p>
<h2>II. Opérations d'expertise</h2>
<p>Description des opérations menées (examens, pièces consultées, personnes entendues).</p>
<h2>III. Conclusions</h2>
<p>{{conclusions}}</p>
<p><em>Je soussigné {{expert}}, médecin expert, certifie avoir rempli ma mission avec objectivité et impartialité.</em></p></div>` },

  {
    code: 'med3_plan_formation_legale', name: "Plan de formation en médecine légale",
    category: 'juridique_admin', price: 6000, priceMax: 18000,
    description: "Modèle de plan de formation continue en médecine légale destiné aux médecins et juristes ivoiriens.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'institution_formatrice',label:"Institution formatrice",type:'text',required:true},
      {key:'public_cible',label:"Public cible de la formation",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'modules',label:"Modules de formation prévus",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE FORMATION EN MÉDECINE LÉGALE</h1>
<p>Institution : <strong>{{institution_formatrice}}</strong> — Public : <strong>{{public_cible}}</strong></p>
<h2>Article 1 – Période</h2>
<p>Formation organisée du {{date_debut}} au {{date_fin}}.</p>
<h2>Article 2 – Modules</h2>
<p>{{modules}}</p>
<h2>Article 3 – Certification</h2>
<p>Une attestation de formation est délivrée à l'issue du programme, reconnu par le Conseil National de l'Ordre des Médecins de Côte d'Ivoire (CNOM-CI).</p></div>` },

  {
    code: 'med3_charte_expert', name: "Charte du médecin expert judiciaire et de l'éthique",
    category: 'juridique_admin', price: 4000, priceMax: 12000,
    description: "Charte éthique et déontologique du médecin expert judiciaire en Côte d'Ivoire, conforme aux standards OHADA et OMS.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'expert',label:"Médecin expert signataire",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion à la charte",type:'date',required:true},
      {key:'engagements',label:"Engagements éthiques spécifiques",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>CHARTE DU MÉDECIN EXPERT JUDICIAIRE ET DE L'ÉTHIQUE</h1>
<p>Expert : <strong>{{expert}}</strong> — Date d'adhésion : <strong>{{date_adhesion}}</strong></p>
<h2>Préambule</h2>
<p>Le médecin expert judiciaire souscrit aux principes d'indépendance, d'impartialité, de compétence et de probité qui fondent l'expertise judiciaire en Côte d'Ivoire.</p>
<h2>Article 1 – Principes fondamentaux</h2>
<p>L'expert s'engage à : (i) n'accepter que les missions entrant dans sa compétence, (ii) déposer ses rapports dans les délais, (iii) ne recevoir aucune rémunération en dehors des tarifs judiciaires officiels.</p>
<h2>Article 2 – Engagements complémentaires</h2>
<p>{{engagements}}</p>
<h2>Article 3 – Droit applicable</h2>
<p>Charte conforme au Code de Déontologie Médicale (CNOM-CI) et aux dispositions du Code de Procédure Civile et Pénale ivoirien.</p></div>` },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 92a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
