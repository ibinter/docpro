import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 Templates Tests / Contrôle qualité industriel ──────────────────────
  {
    code: 'test_iqc_fabrication',
    name: "Accord de service de contrôle qualité en cours de fabrication (IQC)",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord encadrant le service d'inspection qualité en cours de fabrication (IQC) entre un donneur d'ordre et un prestataire de contrôle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client / donneur d'ordre",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire de contrôle",type:'text',required:true},
      {key:'produit_concerne',label:"Produit ou famille de produits concernés",type:'text',required:true},
      {key:'site_fabrication',label:"Site de fabrication",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la prestation",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:false},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE CONTRÔLE QUALITÉ EN COURS DE FABRICATION (IQC)</h1>
<p>Entre <strong>{{client_nom}}</strong> (ci-après le Donneur d'ordre) et <strong>{{prestataire_nom}}</strong> (ci-après le Prestataire), il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord a pour objet de définir les modalités d'exécution des inspections qualité en cours de fabrication (In-Process Quality Control – IQC) portant sur le produit ou la famille de produits suivants : <strong>{{produit_concerne}}</strong>, réalisées sur le site de <strong>{{site_fabrication}}</strong>.</p>
<h2>Article 2 – Durée</h2>
<p>La prestation prend effet à compter du <strong>{{date_debut}}</strong> pour une durée de <strong>{{duree_contrat}}</strong>, renouvelable par tacite reconduction sauf préavis de 30 jours.</p>
<h2>Article 3 – Obligations du Prestataire</h2>
<p>Le Prestataire s'engage à réaliser les inspections selon les plans de contrôle convenus, à documenter tout écart et à transmettre des rapports d'inspection dans les délais fixés.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Toutes les informations techniques et commerciales échangées sont strictement confidentielles.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Le présent accord est soumis au droit OHADA et aux dispositions nationales en vigueur en Côte d'Ivoire.</p>
</div>`,
  },
  {
    code: 'test_fqc_finale',
    name: "Accord de service d'inspection finale produit (FQC)",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Accord de prestation d'inspection finale (Final Quality Control) avant livraison ou expédition du produit fini.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'produit_inspecte',label:"Produit inspecté",type:'text',required:true},
      {key:'lieu_inspection',label:"Lieu d'inspection",type:'text',required:true},
      {key:'date_inspection',label:"Date d'inspection prévue",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D'INSPECTION FINALE PRODUIT (FQC)</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord définit les conditions de réalisation de l'inspection finale (Final Quality Control – FQC) du produit <strong>{{produit_inspecte}}</strong> au lieu suivant : <strong>{{lieu_inspection}}</strong>.</p>
<h2>Article 2 – Date et déroulement</h2>
<p>L'inspection est programmée au <strong>{{date_inspection}}</strong>. Le Prestataire procède à la vérification visuelle, dimensionnelle et fonctionnelle selon les critères d'acceptation définis par le Donneur d'ordre.</p>
<h2>Article 3 – Rapport d'inspection</h2>
<p>Un rapport détaillé avec photographies est transmis dans les 48 heures suivant l'inspection.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA en vigueur.</p>
</div>`,
  },
  {
    code: 'test_cnd_ultrasons',
    name: "Accord de service de tests non destructifs (CND – ultrasons, radiographie)",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Accord encadrant les prestations de contrôle non destructif (CND) par ultrasons et radiographie industrielle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du laboratoire / prestataire CND",type:'text',required:true},
      {key:'methodes_cnd',label:"Méthodes CND utilisées",type:'text',required:true},
      {key:'piece_controlee',label:"Pièce ou structure contrôlée",type:'text',required:true},
      {key:'date_mission',label:"Date de la mission",type:'date',required:true},
      {key:'norme_reference',label:"Norme de référence (EN, ASME…)",type:'text',required:false},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TESTS NON DESTRUCTIFS (CND)</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire réalise des contrôles non destructifs (<strong>{{methodes_cnd}}</strong>) sur la pièce ou structure suivante : <strong>{{piece_controlee}}</strong>, conformément à la norme <strong>{{norme_reference}}</strong>.</p>
<h2>Article 2 – Date de mission</h2>
<p>La mission est fixée au <strong>{{date_mission}}</strong>.</p>
<h2>Article 3 – Sécurité</h2>
<p>Le Prestataire respecte toutes les consignes de radioprotection et de sécurité applicables lors des interventions de radiographie industrielle.</p>
<h2>Article 4 – Responsabilité</h2>
<p>Le Prestataire est responsable de la fiabilité des résultats d'analyse selon les normes applicables.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_metrologie',
    name: "Accord de service de mesure et métrologie industrielle",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Accord de prestation de mesure dimensionnelle, géométrique et métrologique en contexte industriel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire métrologie",type:'text',required:true},
      {key:'type_mesures',label:"Type de mesures réalisées",type:'text',required:true},
      {key:'site_intervention',label:"Site d'intervention",type:'text',required:true},
      {key:'date_prestation',label:"Date de prestation",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE MESURE ET MÉTROLOGIE INDUSTRIELLE</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord porte sur la réalisation de prestations de <strong>{{type_mesures}}</strong> sur le site de <strong>{{site_intervention}}</strong>.</p>
<h2>Article 2 – Date</h2>
<p>La prestation est réalisée le <strong>{{date_prestation}}</strong>.</p>
<h2>Article 3 – Équipements</h2>
<p>Le Prestataire utilise des équipements étalonnés et traçables aux étalons nationaux ou internationaux.</p>
<h2>Article 4 – Rapport</h2>
<p>Un procès-verbal de mesure est remis au Client dans les 5 jours ouvrés suivant la prestation.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_etalonnage',
    name: "Accord de service d'étalonnage d'instruments de mesure",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Accord de prestation d'étalonnage périodique des instruments de mesure utilisés en production ou en laboratoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'laboratoire_nom',label:"Nom du laboratoire d'étalonnage",type:'text',required:true},
      {key:'instruments_list',label:"Liste des instruments à étalonner",type:'textarea',required:true},
      {key:'periodicite',label:"Périodicité d'étalonnage",type:'text',required:true},
      {key:'date_premiere',label:"Date du premier étalonnage",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D'ÉTALONNAGE D'INSTRUMENTS DE MESURE</h1>
<p>Entre <strong>{{client_nom}}</strong> et le laboratoire <strong>{{laboratoire_nom}}</strong>, accrédité conformément aux exigences de la norme ISO/CEI 17025, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Laboratoire procède à l'étalonnage des instruments suivants : <strong>{{instruments_list}}</strong>, avec une périodicité de <strong>{{periodicite}}</strong>.</p>
<h2>Article 2 – Première intervention</h2>
<p>La première intervention est fixée au <strong>{{date_premiere}}</strong>.</p>
<h2>Article 3 – Certificats d'étalonnage</h2>
<p>Le Laboratoire émet un certificat d'étalonnage pour chaque instrument, avec indication de l'incertitude de mesure.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_analyse_chimique',
    name: "Accord de service d'analyse chimique et spectrométrie",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord de prestation d'analyses chimiques et spectrométriques en laboratoire industriel ou d'État.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'labo_nom',label:"Nom du laboratoire",type:'text',required:true},
      {key:'type_analyses',label:"Type d'analyses demandées",type:'textarea',required:true},
      {key:'matrice_echantillon',label:"Matrice / type d'échantillon",type:'text',required:true},
      {key:'delai_rendu',label:"Délai de rendu des résultats",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D'ANALYSE CHIMIQUE ET SPECTROMÉTRIE</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{labo_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Laboratoire réalise les analyses suivantes : <strong>{{type_analyses}}</strong> sur la matrice <strong>{{matrice_echantillon}}</strong>.</p>
<h2>Article 2 – Délais</h2>
<p>Les résultats sont transmis dans un délai de <strong>{{delai_rendu}}</strong> à compter de la réception des échantillons.</p>
<h2>Article 3 – Accréditation</h2>
<p>Le Laboratoire garantit que les méthodes d'analyse sont validées et conformes aux normes en vigueur.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Les résultats d'analyses sont strictement confidentiels et ne peuvent être communiqués à des tiers sans accord écrit du Client.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_resistance_materiaux',
    name: "Accord de service de test de résistance des matériaux",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Accord de prestation de tests de résistance mécanique des matériaux (traction, compression, flexion, dureté).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'labo_nom',label:"Nom du laboratoire",type:'text',required:true},
      {key:'materiaux_testes',label:"Matériaux à tester",type:'text',required:true},
      {key:'essais_realises',label:"Type d'essais réalisés",type:'textarea',required:true},
      {key:'norme_appliquee',label:"Norme appliquée",type:'text',required:false},
      {key:'date_essais',label:"Date des essais",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TEST DE RÉSISTANCE DES MATÉRIAUX</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{labo_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Laboratoire réalise les essais de <strong>{{essais_realises}}</strong> sur les matériaux suivants : <strong>{{materiaux_testes}}</strong>, conformément à la norme <strong>{{norme_appliquee}}</strong>.</p>
<h2>Article 2 – Date</h2>
<p>Les essais sont prévus le <strong>{{date_essais}}</strong>.</p>
<h2>Article 3 – Rapport d'essai</h2>
<p>Un rapport d'essai certifié est délivré au Client à l'issue des tests.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_corrosion',
    name: "Accord de service de test de corrosion",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord de prestation de tests de corrosion (brouillard salin, immersion, électrochimie) sur matériaux ou revêtements.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'labo_nom',label:"Nom du laboratoire",type:'text',required:true},
      {key:'type_test_corrosion',label:"Type de test de corrosion",type:'text',required:true},
      {key:'echantillons',label:"Description des échantillons",type:'textarea',required:true},
      {key:'duree_test',label:"Durée du test",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TEST DE CORROSION</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{labo_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Laboratoire réalise des tests de <strong>{{type_test_corrosion}}</strong> sur les échantillons suivants : <strong>{{echantillons}}</strong> pour une durée de <strong>{{duree_test}}</strong>.</p>
<h2>Article 2 – Méthodes</h2>
<p>Les tests sont conduits conformément aux normes ISO 9227 ou équivalentes applicables.</p>
<h2>Article 3 – Résultats</h2>
<p>Un rapport illustré (photographies, courbes) est remis au Client dans les 7 jours ouvrés suivant la fin du test.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_fatigue_meca',
    name: "Accord de service de test de fatigue mécanique",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Accord de prestation de tests de fatigue mécanique (cycles de chargement) sur pièces et structures.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'labo_nom',label:"Nom du laboratoire",type:'text',required:true},
      {key:'piece_testee',label:"Pièce ou structure testée",type:'text',required:true},
      {key:'conditions_essai',label:"Conditions d'essai (fréquence, amplitude…)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début des essais",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TEST DE FATIGUE MÉCANIQUE</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{labo_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Laboratoire réalise des tests de fatigue sur la pièce <strong>{{piece_testee}}</strong> selon les conditions suivantes : <strong>{{conditions_essai}}</strong>.</p>
<h2>Article 2 – Calendrier</h2>
<p>Les essais débutent le <strong>{{date_debut}}</strong>.</p>
<h2>Article 3 – Rapport</h2>
<p>Le Laboratoire fournit une courbe de Wöhler et un rapport d'analyse de rupture à l'issue des essais.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_etancheite',
    name: "Accord de service de test d'étanchéité",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Accord de prestation de tests d'étanchéité (pression, vide, bulles) sur équipements industriels ou bâtiments.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'equipement_teste',label:"Équipement ou ouvrage testé",type:'text',required:true},
      {key:'methode_test',label:"Méthode de test (pression, vide, bulles…)",type:'text',required:true},
      {key:'date_test',label:"Date du test",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TEST D'ÉTANCHÉITÉ</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire réalise un test d'étanchéité par la méthode <strong>{{methode_test}}</strong> sur l'équipement suivant : <strong>{{equipement_teste}}</strong>.</p>
<h2>Article 2 – Date</h2>
<p>Le test est fixé au <strong>{{date_test}}</strong>.</p>
<h2>Article 3 – Compte rendu</h2>
<p>Un procès-verbal de test est établi immédiatement après l'intervention et signé par les deux parties.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_elec_haute_tension',
    name: "Accord de service de test électrique haute tension",
    category: 'commercial_financier',
    price: 6500, priceMax: 18000,
    description: "Accord de prestation de tests électriques haute tension (diélectrique, rigidité, isolement) sur équipements.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'labo_nom',label:"Nom du laboratoire d'essais",type:'text',required:true},
      {key:'equipement_teste',label:"Équipement électrique testé",type:'text',required:true},
      {key:'niveau_tension',label:"Niveau de tension d'essai (kV)",type:'text',required:true},
      {key:'date_essai',label:"Date de l'essai",type:'date',required:true},
      {key:'norme',label:"Norme de référence (CEI, NF…)",type:'text',required:false},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TEST ÉLECTRIQUE HAUTE TENSION</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{labo_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Laboratoire réalise les tests électriques haute tension à <strong>{{niveau_tension}} kV</strong> sur <strong>{{equipement_teste}}</strong> selon la norme <strong>{{norme}}</strong>.</p>
<h2>Article 2 – Date</h2>
<p>L'essai est prévu le <strong>{{date_essai}}</strong>.</p>
<h2>Article 3 – Sécurité</h2>
<p>Le Laboratoire met en œuvre toutes les mesures de sécurité électrique requises. Le Client met à disposition les équipements dans un état conforme au test.</p>
<h2>Article 4 – Rapport</h2>
<p>Un rapport d'essai est délivré dans les 3 jours ouvrés.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_perf_thermique',
    name: "Accord de service de test de performance thermique",
    category: 'commercial_financier',
    price: 6000, priceMax: 17000,
    description: "Accord de prestation de tests de performance thermique (conductivité, résistance thermique, essais en chambre climatique).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'labo_nom',label:"Nom du laboratoire",type:'text',required:true},
      {key:'produit_teste',label:"Produit ou matériau testé",type:'text',required:true},
      {key:'conditions_thermiques',label:"Conditions thermiques d'essai",type:'textarea',required:true},
      {key:'date_essai',label:"Date de l'essai",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TEST DE PERFORMANCE THERMIQUE</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{labo_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Laboratoire réalise des tests de performance thermique sur <strong>{{produit_teste}}</strong> dans les conditions suivantes : <strong>{{conditions_thermiques}}</strong>.</p>
<h2>Article 2 – Date</h2>
<p>Les essais sont prévus le <strong>{{date_essai}}</strong>.</p>
<h2>Article 3 – Résultats</h2>
<p>Le Laboratoire fournit les courbes de performance thermique et un rapport d'analyse dans les 7 jours ouvrés suivant les essais.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_duree_vie_accelere',
    name: "Accord de service de test de durée de vie accéléré",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Accord de prestation de tests de vieillissement accéléré et de durée de vie sur produits industriels ou de grande consommation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'labo_nom',label:"Nom du laboratoire",type:'text',required:true},
      {key:'produit_teste',label:"Produit testé",type:'text',required:true},
      {key:'facteurs_stress',label:"Facteurs de stress (T°, humidité, UV…)",type:'textarea',required:true},
      {key:'duree_prevue',label:"Durée prévue des tests",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TEST DE DURÉE DE VIE ACCÉLÉRÉ</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{labo_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Laboratoire conduit des tests de vieillissement accéléré sur <strong>{{produit_teste}}</strong> en appliquant les facteurs de stress suivants : <strong>{{facteurs_stress}}</strong>.</p>
<h2>Article 2 – Durée et calendrier</h2>
<p>Les tests débutent le <strong>{{date_debut}}</strong> pour une durée de <strong>{{duree_prevue}}</strong>.</p>
<h2>Article 3 – Livrables</h2>
<p>Le Laboratoire fournit une analyse de fiabilité et une estimation de la durée de vie du produit à l'issue des tests.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_emballage_vibration',
    name: "Accord de service de test d'emballage (vibrations, choc)",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Accord de prestation de tests de résistance des emballages aux vibrations et aux chocs selon les normes ISTA ou ASTM.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'labo_nom',label:"Nom du laboratoire",type:'text',required:true},
      {key:'type_emballage',label:"Type d'emballage testé",type:'text',required:true},
      {key:'norme_test',label:"Norme de test (ISTA, ASTM…)",type:'text',required:true},
      {key:'date_test',label:"Date du test",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE TEST D'EMBALLAGE (VIBRATIONS, CHOC)</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{labo_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Laboratoire réalise des tests de résistance aux vibrations et aux chocs sur l'emballage suivant : <strong>{{type_emballage}}</strong>, conformément à la norme <strong>{{norme_test}}</strong>.</p>
<h2>Article 2 – Date</h2>
<p>Les tests sont programmés le <strong>{{date_test}}</strong>.</p>
<h2>Article 3 – Rapport</h2>
<p>Un rapport de test avec photographies et recommandations d'amélioration est remis dans les 5 jours ouvrés.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_insp_import_bivac',
    name: "Accord de service d'inspection de marchandises à l'import (BIVAC, Cotecna)",
    category: 'commercial_financier',
    price: 6000, priceMax: 17000,
    description: "Accord de prestation d'inspection des marchandises à l'importation par un organisme agréé (BIVAC, Cotecna, SGS).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'importateur_nom',label:"Nom de l'importateur",type:'text',required:true},
      {key:'organisme_insp',label:"Organisme d'inspection (BIVAC, Cotecna, SGS…)",type:'text',required:true},
      {key:'nature_marchandises',label:"Nature des marchandises",type:'text',required:true},
      {key:'pays_origine',label:"Pays d'origine",type:'text',required:true},
      {key:'date_inspection',label:"Date d'inspection au port d'origine",type:'date',required:true},
      {key:'valeur_fob',label:"Valeur FOB déclarée (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D'INSPECTION DE MARCHANDISES À L'IMPORT</h1>
<p>Entre <strong>{{importateur_nom}}</strong> (ci-après l'Importateur) et <strong>{{organisme_insp}}</strong> (ci-après l'Organisme d'inspection), il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme procède à l'inspection de la marchandise suivante : <strong>{{nature_marchandises}}</strong>, en provenance de <strong>{{pays_origine}}</strong>, avant embarquement.</p>
<h2>Article 2 – Date et lieu</h2>
<p>L'inspection est fixée au <strong>{{date_inspection}}</strong> au lieu d'expédition.</p>
<h2>Article 3 – Valeur déclarée</h2>
<p>La valeur FOB déclarée est de <strong>{{valeur_fob}} FCFA</strong>.</p>
<h2>Article 4 – Attestation de vérification des importations</h2>
<p>L'Organisme émet une Attestation de Vérification des Importations (AVI) conforme aux exigences douanières ivoiriennes.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA et aux réglementations douanières de Côte d'Ivoire.</p>
</div>`,
  },
  {
    code: 'test_pesage_calibration',
    name: "Accord de service de pesage et calibration",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Accord de prestation de pesage industriel et de calibration de balances et systèmes de pesage.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'equipements_pesage',label:"Équipements de pesage concernés",type:'textarea',required:true},
      {key:'periodicite',label:"Périodicité de calibration",type:'text',required:true},
      {key:'date_prochaine',label:"Date de la prochaine intervention",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE PESAGE ET CALIBRATION</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire assure la calibration et la vérification des équipements de pesage suivants : <strong>{{equipements_pesage}}</strong>, avec une périodicité de <strong>{{periodicite}}</strong>.</p>
<h2>Article 2 – Prochaine intervention</h2>
<p>La prochaine intervention est programmée le <strong>{{date_prochaine}}</strong>.</p>
<h2>Article 3 – Attestation légale</h2>
<p>Le Prestataire fournit les vignettes de vérification réglementaire conformes aux exigences de l'ANOR et de la Direction des Poids et Mesures.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_echantillonnage',
    name: "Accord de service d'échantillonnage et prélèvement",
    category: 'commercial_financier',
    price: 4000, priceMax: 11000,
    description: "Accord de prestation d'échantillonnage et de prélèvement d'échantillons en vue d'analyses en laboratoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'type_prelevement',label:"Type de prélèvement (eau, sol, air, produit…)",type:'text',required:true},
      {key:'site_prelevement',label:"Site de prélèvement",type:'text',required:true},
      {key:'date_prelevement',label:"Date de prélèvement",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D'ÉCHANTILLONNAGE ET PRÉLÈVEMENT</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire effectue des prélèvements de type <strong>{{type_prelevement}}</strong> sur le site suivant : <strong>{{site_prelevement}}</strong>.</p>
<h2>Article 2 – Date</h2>
<p>Le prélèvement est prévu le <strong>{{date_prelevement}}</strong>.</p>
<h2>Article 3 – Traçabilité</h2>
<p>Chaque échantillon est étiqueté, conditionné et transporté selon les protocoles garantissant la traçabilité et l'intégrité jusqu'au laboratoire d'analyse.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_audit_fournisseur',
    name: "Accord de service d'audit fournisseur qualité",
    category: 'commercial_financier',
    price: 6500, priceMax: 18000,
    description: "Accord de prestation d'audit qualité chez un fournisseur ou sous-traitant pour évaluer son système qualité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'donneur_ordre',label:"Donneur d'ordre / auditeur mandant",type:'text',required:true},
      {key:'auditeur_nom',label:"Nom de l'auditeur / cabinet d'audit",type:'text',required:true},
      {key:'fournisseur_nom',label:"Nom du fournisseur audité",type:'text',required:true},
      {key:'site_audite',label:"Site audité",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
      {key:'referentiel',label:"Référentiel d'audit (ISO 9001, IATF…)",type:'text',required:false},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE D'AUDIT FOURNISSEUR QUALITÉ</h1>
<p>Entre <strong>{{donneur_ordre}}</strong> (ci-après le Donneur d'ordre) et <strong>{{auditeur_nom}}</strong> (ci-après l'Auditeur), il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Auditeur réalise un audit qualité chez le fournisseur <strong>{{fournisseur_nom}}</strong> sur le site de <strong>{{site_audite}}</strong>, selon le référentiel <strong>{{referentiel}}</strong>.</p>
<h2>Article 2 – Date</h2>
<p>L'audit est fixé au <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Rapport d'audit</h2>
<p>Un rapport d'audit avec constatations, points forts, non-conformités et recommandations est remis dans les 10 jours ouvrés.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Le rapport est confidentiel et réservé au Donneur d'ordre.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_spc_surveillance',
    name: "Accord de service de surveillance de process (SPC)",
    category: 'commercial_financier',
    price: 5500, priceMax: 15000,
    description: "Accord de prestation de surveillance statistique des procédés (Statistical Process Control – SPC) en production.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire SPC",type:'text',required:true},
      {key:'procedes_surveilles',label:"Procédés surveillés",type:'textarea',required:true},
      {key:'logiciel_spc',label:"Logiciel SPC utilisé",type:'text',required:false},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE SURVEILLANCE DE PROCESS (SPC)</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{prestataire_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire met en place et assure la surveillance statistique des procédés suivants : <strong>{{procedes_surveilles}}</strong>, en utilisant le logiciel <strong>{{logiciel_spc}}</strong>.</p>
<h2>Article 2 – Démarrage</h2>
<p>La prestation démarre le <strong>{{date_debut}}</strong>.</p>
<h2>Article 3 – Livrables</h2>
<p>Le Prestataire fournit des tableaux de contrôle, des indicateurs de capabilité (Cp, Cpk) et des rapports périodiques d'analyse.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_non_conformite_8d',
    name: "Accord de service de résolution de non-conformités (8D)",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Accord de prestation d'accompagnement à la résolution de non-conformités selon la méthode 8D.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'consultant_nom',label:"Nom du consultant / prestataire",type:'text',required:true},
      {key:'probleme_decrit',label:"Description du problème / non-conformité",type:'textarea',required:true},
      {key:'produit_concerne',label:"Produit ou processus concerné",type:'text',required:true},
      {key:'date_ouverture_8d',label:"Date d'ouverture du 8D",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE RÉSOLUTION DE NON-CONFORMITÉS (8D)</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{consultant_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Consultant accompagne le Client dans la résolution du problème suivant : <strong>{{probleme_decrit}}</strong> concernant <strong>{{produit_concerne}}</strong>, en appliquant la méthode 8 Disciplines (8D).</p>
<h2>Article 2 – Ouverture</h2>
<p>La fiche 8D est ouverte le <strong>{{date_ouverture_8d}}</strong>.</p>
<h2>Article 3 – Livrables</h2>
<p>Le Consultant fournit un rapport 8D complet (D1 à D8) incluant l'analyse des causes racines, les actions correctives et les actions préventives.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_rapport_inspection',
    name: "Rapport d'inspection qualité",
    category: 'commercial_financier',
    price: 3000, priceMax: 8000,
    description: "Modèle de rapport d'inspection qualité standardisé pour les contrôles en fabrication, à la réception ou à l'expédition.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'inspecteur_nom',label:"Nom de l'inspecteur",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'produit_inspecte',label:"Produit inspecté",type:'text',required:true},
      {key:'lot_reference',label:"Référence lot / numéro de série",type:'text',required:true},
      {key:'date_inspection',label:"Date d'inspection",type:'date',required:true},
      {key:'verdict',label:"Verdict (Accepté / Rejeté / En attente)",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>RAPPORT D'INSPECTION QUALITÉ</h1>
<p><strong>Inspecteur :</strong> {{inspecteur_nom}}</p>
<p><strong>Client :</strong> {{client_nom}}</p>
<p><strong>Produit inspecté :</strong> {{produit_inspecte}}</p>
<p><strong>Référence lot :</strong> {{lot_reference}}</p>
<p><strong>Date d'inspection :</strong> {{date_inspection}}</p>
<h2>1. Résultats de l'inspection</h2>
<p>[Décrire ici les contrôles effectués, les défauts constatés et les quantités vérifiées.]</p>
<h2>2. Verdict</h2>
<p><strong>{{verdict}}</strong></p>
<h2>3. Remarques et recommandations</h2>
<p>[Ajouter ici toute observation complémentaire.]</p>
<p>Fait à Abidjan, le {{date_inspection}}</p>
<p>Signature de l'inspecteur : ___________________</p>
</div>`,
  },
  {
    code: 'test_plan_qualite_produit',
    name: "Plan qualité produit",
    category: 'commercial_financier',
    price: 4000, priceMax: 11000,
    description: "Modèle de plan qualité produit (PQP) définissant les exigences qualité, les contrôles et les responsabilités.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'projet_nom',label:"Nom du projet / produit",type:'text',required:true},
      {key:'responsable_qualite',label:"Responsable qualité",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'version_document',label:"Version du document",type:'text',required:true},
      {key:'date_edition',label:"Date d'édition",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>PLAN QUALITÉ PRODUIT</h1>
<p><strong>Projet / Produit :</strong> {{projet_nom}}</p>
<p><strong>Client :</strong> {{client_nom}}</p>
<p><strong>Responsable qualité :</strong> {{responsable_qualite}}</p>
<p><strong>Version :</strong> {{version_document}} — <strong>Date :</strong> {{date_edition}}</p>
<h2>1. Objet et domaine d'application</h2>
<p>Le présent plan qualité définit les dispositions particulières mises en œuvre pour garantir la conformité du produit aux exigences du Client.</p>
<h2>2. Exigences qualité applicables</h2>
<p>[Lister les normes, spécifications et critères d'acceptation.]</p>
<h2>3. Points de contrôle et jalons qualité</h2>
<p>[Tableau des contrôles : étape, méthode, fréquence, responsable, enregistrement.]</p>
<h2>4. Gestion des non-conformités</h2>
<p>[Procédure de signalement et de traitement des non-conformités.]</p>
<h2>5. Enregistrements qualité</h2>
<p>[Liste des enregistrements à conserver et durée de conservation.]</p>
</div>`,
  },
  {
    code: 'test_formation_qualite',
    name: "Accord de service de formation qualité (auditeur interne)",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Accord de prestation de formation à l'audit interne qualité à destination des équipes d'entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client_nom',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'referentiel_formation',label:"Référentiel de la formation (ISO 9001…)",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la formation",type:'date',required:true},
      {key:'duree_formation',label:"Durée de la formation",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE DE FORMATION QUALITÉ (AUDITEUR INTERNE)</h1>
<p>Entre <strong>{{client_nom}}</strong> et <strong>{{organisme_formation}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme de formation dispense une formation d'auditeur interne <strong>{{referentiel_formation}}</strong> à <strong>{{nombre_stagiaires}}</strong> stagiaires de <strong>{{client_nom}}</strong>.</p>
<h2>Article 2 – Calendrier</h2>
<p>La formation débute le <strong>{{date_debut}}</strong> pour une durée de <strong>{{duree_formation}}</strong>.</p>
<h2>Article 3 – Livrables</h2>
<p>Les stagiaires reçoivent un support de cours, participent à des exercices pratiques et obtiennent une attestation de formation à l'issue.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_partenariat_labo',
    name: "Accord de partenariat labo-industriel",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Accord de partenariat entre un laboratoire de recherche ou d'analyses et une entreprise industrielle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'industrie_nom',label:"Nom de l'entreprise industrielle",type:'text',required:true},
      {key:'labo_nom',label:"Nom du laboratoire partenaire",type:'text',required:true},
      {key:'domaine_partenariat',label:"Domaine du partenariat",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'duree_accord',label:"Durée de l'accord",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE PARTENARIAT LABO-INDUSTRIEL</h1>
<p>Entre <strong>{{industrie_nom}}</strong> et <strong>{{labo_nom}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord établit un partenariat dans le domaine suivant : <strong>{{domaine_partenariat}}</strong>, visant à mutualiser les compétences techniques et les équipements des deux parties.</p>
<h2>Article 2 – Durée</h2>
<p>L'accord prend effet le <strong>{{date_signature}}</strong> pour une durée de <strong>{{duree_accord}}</strong>.</p>
<h2>Article 3 – Propriété intellectuelle</h2>
<p>Les résultats issus du partenariat sont co-détenus par les deux parties sauf stipulation contraire dans une annexe spécifique.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'test_charte_qualite_afrique',
    name: "Charte de la qualité et de l'excellence en industrie africaine",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Charte engageant une entreprise africaine dans une démarche de qualité, d'excellence opérationnelle et d'amélioration continue.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'directeur_nom',label:"Nom du Directeur Général",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'valeurs_qualite',label:"Valeurs qualité de l'entreprise",type:'textarea',required:true},
    ]),
    body: `<div class="doc">
<h1>CHARTE DE LA QUALITÉ ET DE L'EXCELLENCE EN INDUSTRIE AFRICAINE</h1>
<p><strong>{{entreprise_nom}}</strong></p>
<p>Adoptée le <strong>{{date_adoption}}</strong> par <strong>{{directeur_nom}}</strong>, Directeur Général.</p>
<h2>Préambule</h2>
<p>Consciente du rôle stratégique de la qualité dans le développement industriel de l'Afrique, <strong>{{entreprise_nom}}</strong> s'engage solennellement dans une démarche d'excellence opérationnelle et d'amélioration continue.</p>
<h2>Nos valeurs</h2>
<p>{{valeurs_qualite}}</p>
<h2>Nos engagements</h2>
<p>1. Satisfaire et dépasser les attentes de nos clients.<br/>
2. Prévenir les défauts et non-conformités à la source.<br/>
3. Former et impliquer chaque collaborateur dans la démarche qualité.<br/>
4. Mesurer, analyser et améliorer nos performances en continu.<br/>
5. Respecter les normes nationales (ANOR), régionales (CEDEAO) et internationales (ISO).</p>
<p>Fait à Abidjan, le <strong>{{date_adoption}}</strong></p>
<p>Signature : ___________________</p>
</div>`,
  },

  // ── 25 Templates Certification produit / Normalisation ────────────────────
  {
    code: 'cert2_iso9001',
    name: "Accord de certification ISO 9001 (système management qualité)",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Accord de prestation de certification ISO 9001 entre une entreprise et un organisme certificateur accrédité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme certificateur",type:'text',required:true},
      {key:'perimetre_cert',label:"Périmètre de certification",type:'textarea',required:true},
      {key:'date_audit_initial',label:"Date de l'audit initial",type:'date',required:true},
      {key:'duree_validite',label:"Durée de validité du certificat",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION ISO 9001 — SYSTÈME DE MANAGEMENT DE LA QUALITÉ</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> (ci-après le Demandeur) et <strong>{{organisme_cert}}</strong> (ci-après l'Organisme certificateur), il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme procède à l'évaluation et à la certification du système de management de la qualité du Demandeur selon la norme ISO 9001:2015, pour le périmètre suivant : <strong>{{perimetre_cert}}</strong>.</p>
<h2>Article 2 – Audit initial</h2>
<p>L'audit initial (phases 1 et 2) est fixé à compter du <strong>{{date_audit_initial}}</strong>.</p>
<h2>Article 3 – Durée de validité</h2>
<p>Le certificat est valable <strong>{{duree_validite}}</strong>, sous réserve des audits de surveillance annuels et de l'audit de renouvellement.</p>
<h2>Article 4 – Obligations du Demandeur</h2>
<p>Le Demandeur s'engage à maintenir son SMQ conforme à la norme et à faciliter les audits de surveillance.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_iso14001',
    name: "Accord de certification ISO 14001 (système management environnemental)",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Accord de prestation de certification ISO 14001 pour le système de management environnemental d'une organisation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme certificateur",type:'text',required:true},
      {key:'perimetre_env',label:"Périmètre environnemental",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit de certification",type:'date',required:true},
      {key:'duree_validite',label:"Durée de validité",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION ISO 14001 — SYSTÈME DE MANAGEMENT ENVIRONNEMENTAL</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme certifie le SME de <strong>{{entreprise_nom}}</strong> selon la norme ISO 14001:2015 pour le périmètre : <strong>{{perimetre_env}}</strong>.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit de certification est prévu le <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Le certificat est valable <strong>{{duree_validite}}</strong> avec audits de surveillance.</p>
<h2>Article 4 – Obligations environnementales</h2>
<p>Le Demandeur s'engage à respecter la réglementation environnementale ivoirienne et à améliorer en continu ses performances environnementales.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_iso45001',
    name: "Accord de certification ISO 45001 (sécurité et santé au travail)",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Accord de prestation de certification ISO 45001 pour le système de management de la santé et sécurité au travail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme certificateur",type:'text',required:true},
      {key:'perimetre_sst',label:"Périmètre SST",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
      {key:'duree_validite',label:"Durée de validité",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION ISO 45001 — SANTÉ ET SÉCURITÉ AU TRAVAIL</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme certifie le système de management SST de <strong>{{entreprise_nom}}</strong> selon ISO 45001:2018, périmètre : <strong>{{perimetre_sst}}</strong>.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit est prévu le <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Certificat valable <strong>{{duree_validite}}</strong> avec surveillance annuelle.</p>
<h2>Article 4 – Engagements</h2>
<p>L'entreprise s'engage à réduire les accidents du travail et à impliquer les travailleurs dans la démarche SST.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA et au Code du travail ivoirien.</p>
</div>`,
  },
  {
    code: 'cert2_iso22000',
    name: "Accord de certification ISO 22000 (sécurité des aliments)",
    category: 'commercial_financier',
    price: 7500, priceMax: 21000,
    description: "Accord de prestation de certification ISO 22000 pour le système de management de la sécurité des denrées alimentaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise agroalimentaire",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme certificateur",type:'text',required:true},
      {key:'perimetre_alim',label:"Périmètre (produits, activités)",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
      {key:'duree_validite',label:"Durée de validité",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION ISO 22000 — SÉCURITÉ DES ALIMENTS</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme certifie le SMSA de <strong>{{entreprise_nom}}</strong> selon ISO 22000:2018, périmètre : <strong>{{perimetre_alim}}</strong>.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit de certification est prévu le <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Certificat valable <strong>{{duree_validite}}</strong>.</p>
<h2>Article 4 – Exigences HACCP</h2>
<p>Le Demandeur intègre l'analyse des dangers et les points critiques de contrôle (CCP) conformément aux principes HACCP.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA et aux réglementations alimentaires ivoiriennes.</p>
</div>`,
  },
  {
    code: 'cert2_iso13485',
    name: "Accord de certification ISO 13485 (dispositifs médicaux)",
    category: 'commercial_financier',
    price: 9000, priceMax: 25000,
    description: "Accord de prestation de certification ISO 13485 pour le système de management de la qualité des dispositifs médicaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom du fabricant / distributeur",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme notifié / certificateur",type:'text',required:true},
      {key:'dispositifs',label:"Dispositifs médicaux concernés",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
      {key:'duree_validite',label:"Durée de validité du certificat",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION ISO 13485 — DISPOSITIFS MÉDICAUX</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme certifie le SMQ de <strong>{{entreprise_nom}}</strong> selon ISO 13485:2016 pour les dispositifs médicaux suivants : <strong>{{dispositifs}}</strong>.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit est programmé le <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Certificat valable <strong>{{duree_validite}}</strong> avec surveillance.</p>
<h2>Article 4 – Traçabilité</h2>
<p>Le Demandeur garantit la traçabilité complète de la conception à la distribution des dispositifs médicaux.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA et aux réglementations sanitaires ivoiriennes.</p>
</div>`,
  },
  {
    code: 'cert2_iso27001',
    name: "Accord de certification ISO 27001 (sécurité de l'information)",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Accord de prestation de certification ISO 27001 pour le système de management de la sécurité de l'information.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'organisation",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme certificateur",type:'text',required:true},
      {key:'perimetre_smsi',label:"Périmètre du SMSI",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
      {key:'duree_validite',label:"Durée de validité",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION ISO 27001 — SÉCURITÉ DE L'INFORMATION</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme certifie le SMSI de <strong>{{entreprise_nom}}</strong> selon ISO 27001:2022, périmètre : <strong>{{perimetre_smsi}}</strong>.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit est fixé le <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Certificat valable <strong>{{duree_validite}}</strong>.</p>
<h2>Article 4 – Gestion des risques</h2>
<p>Le Demandeur s'engage à maintenir une analyse des risques informationnels et un plan de traitement des risques conformément à la norme.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA et à la loi ivoirienne sur la cybersécurité.</p>
</div>`,
  },
  {
    code: 'cert2_marquage_ce',
    name: "Accord de certification CE (marque européenne)",
    category: 'commercial_financier',
    price: 9000, priceMax: 25000,
    description: "Accord de prestation pour l'obtention du marquage CE d'un produit destiné au marché européen.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'fabricant_nom',label:"Nom du fabricant",type:'text',required:true},
      {key:'organisme_notifie',label:"Organisme notifié européen",type:'text',required:true},
      {key:'produit_ce',label:"Produit soumis au marquage CE",type:'text',required:true},
      {key:'directive_applicable',label:"Directive européenne applicable",type:'text',required:true},
      {key:'date_evaluation',label:"Date d'évaluation de conformité",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION CE — MARQUAGE EUROPÉEN</h1>
<p>Entre <strong>{{fabricant_nom}}</strong> et l'organisme notifié <strong>{{organisme_notifie}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme notifié procède à l'évaluation de conformité du produit <strong>{{produit_ce}}</strong> selon la directive <strong>{{directive_applicable}}</strong> en vue de l'apposition du marquage CE.</p>
<h2>Article 2 – Évaluation</h2>
<p>L'évaluation débute le <strong>{{date_evaluation}}</strong>.</p>
<h2>Article 3 – Déclaration UE de conformité</h2>
<p>Le Fabricant établit et signe la Déclaration UE de conformité sous sa seule responsabilité après obtention du certificat.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA pour les aspects contractuels et aux directives européennes pour les exigences techniques.</p>
</div>`,
  },
  {
    code: 'cert2_anor_ci',
    name: "Accord de certification ANOR (normalisation CI)",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Accord de prestation de certification auprès de l'Agence Ivoirienne de Normalisation (ANOR) pour un produit ou service.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'produit_concerne',label:"Produit ou service concerné",type:'text',required:true},
      {key:'norme_anor',label:"Norme ANOR applicable",type:'text',required:true},
      {key:'date_depot_dossier',label:"Date de dépôt du dossier",type:'date',required:true},
      {key:'representant_legal',label:"Représentant légal de l'entreprise",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION ANOR — NORMALISATION CÔTE D'IVOIRE</h1>
<p>Entre <strong>{{entreprise_nom}}</strong>, représentée par <strong>{{representant_legal}}</strong>, et l'Agence Ivoirienne de Normalisation (ANOR), il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'entreprise sollicite la certification de son produit ou service <strong>{{produit_concerne}}</strong> conformément à la norme <strong>{{norme_anor}}</strong>.</p>
<h2>Article 2 – Dépôt du dossier</h2>
<p>Le dossier de demande est déposé auprès de l'ANOR le <strong>{{date_depot_dossier}}</strong>.</p>
<h2>Article 3 – Processus de certification</h2>
<p>L'ANOR procède à l'examen du dossier, aux essais de conformité et à l'audit éventuel du système de production.</p>
<h2>Article 4 – Marque de conformité</h2>
<p>En cas de succès, l'entreprise est autorisée à apposer la marque de conformité ANOR sur son produit pour une durée déterminée.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit ivoirien et aux textes réglementaires de l'ANOR.</p>
</div>`,
  },
  {
    code: 'cert2_cedeao_norme',
    name: "Accord de certification CEDEAO (norme technique régionale)",
    category: 'commercial_financier',
    price: 6000, priceMax: 17000,
    description: "Accord de prestation de certification selon les normes techniques régionales de la CEDEAO pour la libre circulation des produits.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme de certification régional",type:'text',required:true},
      {key:'produit_concerne',label:"Produit concerné",type:'text',required:true},
      {key:'norme_cedeao',label:"Norme CEDEAO applicable",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION CEDEAO — NORME TECHNIQUE RÉGIONALE</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord porte sur la certification du produit <strong>{{produit_concerne}}</strong> selon la norme CEDEAO <strong>{{norme_cedeao}}</strong> en vue de sa commercialisation dans l'espace CEDEAO.</p>
<h2>Article 2 – Demande</h2>
<p>La demande est formalisée le <strong>{{date_demande}}</strong>.</p>
<h2>Article 3 – Reconnaissance mutuelle</h2>
<p>La certification obtenue bénéficie de la reconnaissance mutuelle entre les États membres de la CEDEAO dans les conditions prévues par les accords régionaux.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis aux textes de la CEDEAO et au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_marquage_nf',
    name: "Accord de marquage NF (norme française produit)",
    category: 'commercial_financier',
    price: 7500, priceMax: 21000,
    description: "Accord de prestation pour l'obtention et le maintien du marquage NF sur un produit industriel ou de grande consommation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'produit_nf',label:"Produit candidat au marquage NF",type:'text',required:true},
      {key:'norme_nf',label:"Norme NF applicable",type:'text',required:true},
      {key:'date_dossier',label:"Date de dépôt du dossier",type:'date',required:true},
      {key:'duree_licence',label:"Durée de la licence NF",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE MARQUAGE NF — NORME FRANÇAISE PRODUIT</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et l'organisme certificateur NF (AFNOR Certification), il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'entreprise sollicite l'octroi du droit d'usage de la marque NF pour son produit <strong>{{produit_nf}}</strong> selon la norme <strong>{{norme_nf}}</strong>.</p>
<h2>Article 2 – Dossier</h2>
<p>Le dossier de demande est déposé le <strong>{{date_dossier}}</strong>.</p>
<h2>Article 3 – Durée de la licence</h2>
<p>La licence NF est accordée pour <strong>{{duree_licence}}</strong> renouvelable sous réserve du maintien de la conformité.</p>
<h2>Article 4 – Surveillance</h2>
<p>Des audits de surveillance et des prélèvements d'échantillons sont réalisés périodiquement par l'organisme.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA pour les aspects contractuels locaux.</p>
</div>`,
  },
  {
    code: 'cert2_haccp',
    name: "Accord de certification HACCP (hygiène alimentaire)",
    category: 'commercial_financier',
    price: 6000, priceMax: 17000,
    description: "Accord de prestation de mise en place et de certification HACCP pour les entreprises du secteur alimentaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise alimentaire",type:'text',required:true},
      {key:'consultant_cert',label:"Consultant / organisme HACCP",type:'text',required:true},
      {key:'lignes_production',label:"Lignes de production concernées",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit de certification",type:'date',required:true},
      {key:'duree_validite',label:"Durée de validité",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION HACCP — HYGIÈNE ALIMENTAIRE</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et <strong>{{consultant_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Consultant accompagne <strong>{{entreprise_nom}}</strong> dans la mise en place et la certification de son plan HACCP pour les lignes de production suivantes : <strong>{{lignes_production}}</strong>.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit de certification est programmé le <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Le certificat HACCP est valable <strong>{{duree_validite}}</strong>.</p>
<h2>Article 4 – Formation</h2>
<p>Le Consultant assure la formation de l'équipe HACCP de l'entreprise et la mise à jour annuelle du plan HACCP.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA et aux réglementations sanitaires ivoiriennes.</p>
</div>`,
  },
  {
    code: 'cert2_brc_food',
    name: "Accord de certification BRC (Global Standard Food)",
    category: 'commercial_financier',
    price: 8500, priceMax: 24000,
    description: "Accord de prestation de certification BRC Global Standard for Food Safety pour les fournisseurs de la grande distribution.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme certificateur BRC",type:'text',required:true},
      {key:'categorie_brc',label:"Catégorie BRC",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit BRC",type:'date',required:true},
      {key:'grade_vise',label:"Grade visé (AA, A, B…)",type:'text',required:false},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION BRC — GLOBAL STANDARD FOOD SAFETY</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme réalise l'audit de certification BRC Global Standard Food Safety, catégorie <strong>{{categorie_brc}}</strong>, pour <strong>{{entreprise_nom}}</strong>.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit est prévu le <strong>{{date_audit}}</strong>. Le grade visé est <strong>{{grade_vise}}</strong>.</p>
<h2>Article 3 – Non-conformités</h2>
<p>Toute non-conformité critique entraîne la suspension immédiate de la certification. Les non-conformités majeures doivent être levées dans les 28 jours suivant l'audit.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_ifs',
    name: "Accord de certification IFS (International Featured Standard)",
    category: 'commercial_financier',
    price: 8000, priceMax: 23000,
    description: "Accord de prestation de certification IFS Food pour les fournisseurs de produits alimentaires de marque distributeur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme certificateur IFS",type:'text',required:true},
      {key:'produits_concernes',label:"Produits alimentaires concernés",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit IFS",type:'date',required:true},
      {key:'niveau_vise',label:"Niveau visé (Foundation, Higher Level)",type:'text',required:false},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION IFS — INTERNATIONAL FEATURED STANDARD</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme procède à l'audit IFS Food pour les produits suivants : <strong>{{produits_concernes}}</strong>.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit est programmé le <strong>{{date_audit}}</strong>. Le niveau visé est <strong>{{niveau_vise}}</strong>.</p>
<h2>Article 3 – Publication</h2>
<p>Le rapport d'audit est publié sur la base de données IFS Portal après obtention du certificat.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_kosher',
    name: "Accord de certification kosher",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord de prestation de certification kosher pour des produits alimentaires destinés aux marchés juifs observants.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'agence_kosher',label:"Agence de certification kosher",type:'text',required:true},
      {key:'produits_kosher',label:"Produits soumis à la certification",type:'textarea',required:true},
      {key:'date_inspection',label:"Date de la première inspection",type:'date',required:true},
      {key:'duree_validite',label:"Durée de validité",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION KOSHER</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et <strong>{{agence_kosher}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Agence certifie que les produits suivants : <strong>{{produits_kosher}}</strong> sont conformes aux exigences de la loi juive (Halakha) en matière alimentaire.</p>
<h2>Article 2 – Inspection initiale</h2>
<p>La première inspection est réalisée le <strong>{{date_inspection}}</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Le certificat kosher est valable <strong>{{duree_validite}}</strong> avec inspections périodiques inopinées.</p>
<h2>Article 4 – Obligations du fabricant</h2>
<p>Le fabricant s'engage à n'utiliser que des ingrédients certifiés kosher et à faciliter les inspections de l'Agence.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_halal',
    name: "Accord de certification halal produit",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Accord de prestation de certification halal pour des produits alimentaires destinés aux marchés musulmans.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'organisme_halal',label:"Organisme de certification halal",type:'text',required:true},
      {key:'produits_halal',label:"Produits soumis à la certification",type:'textarea',required:true},
      {key:'date_audit',label:"Date de l'audit halal",type:'date',required:true},
      {key:'duree_validite',label:"Durée de validité du certificat",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION HALAL PRODUIT</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et <strong>{{organisme_halal}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme certifie la conformité halal des produits suivants : <strong>{{produits_halal}}</strong> selon les référentiels halal internationalement reconnus.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit de certification est prévu le <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>Certificat valable <strong>{{duree_validite}}</strong> renouvelable.</p>
<h2>Article 4 – Obligations</h2>
<p>L'entreprise s'engage à utiliser exclusivement des ingrédients halal, à éviter toute contamination croisée et à tenir des registres d'achat accessibles à l'Organisme.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_bio_ecocert',
    name: "Accord de certification bio AB/Ecocert",
    category: 'commercial_financier',
    price: 6500, priceMax: 18000,
    description: "Accord de prestation de certification agriculture biologique AB et Ecocert pour producteurs et transformateurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'operateur_nom',label:"Nom de l'opérateur (producteur/transformateur)",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme certificateur (Ecocert, Bureau Veritas…)",type:'text',required:true},
      {key:'produits_bio',label:"Produits biologiques concernés",type:'textarea',required:true},
      {key:'surface_ha',label:"Surface en hectares (si applicable)",type:'text',required:false},
      {key:'date_notification',label:"Date de notification à l'organisme",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION BIO AB/ECOCERT</h1>
<p>Entre <strong>{{operateur_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme certifie le mode de production biologique de <strong>{{operateur_nom}}</strong> pour les produits suivants : <strong>{{produits_bio}}</strong> sur une surface de <strong>{{surface_ha}} ha</strong>.</p>
<h2>Article 2 – Notification</h2>
<p>L'opérateur notifie son activité le <strong>{{date_notification}}</strong>.</p>
<h2>Article 3 – Période de conversion</h2>
<p>Le cas échéant, une période de conversion de 2 à 3 ans est requise avant la commercialisation en agriculture biologique.</p>
<h2>Article 4 – Contrôle annuel</h2>
<p>L'Organisme réalise au minimum un contrôle annuel sur site.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au règlement UE n°848/2018 et au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_fairtrade',
    name: "Accord de certification fairtrade/commerce équitable",
    category: 'commercial_financier',
    price: 6000, priceMax: 17000,
    description: "Accord de prestation de certification commerce équitable (Fairtrade International) pour producteurs agricoles africains.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'organisation_prod',label:"Nom de l'organisation de producteurs",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme de certification (FLOCERT…)",type:'text',required:true},
      {key:'produit_cert',label:"Produit certifié commerce équitable",type:'text',required:true},
      {key:'pays_certification',label:"Pays de certification",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit initial",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION FAIRTRADE / COMMERCE ÉQUITABLE</h1>
<p>Entre <strong>{{organisation_prod}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme certifie <strong>{{organisation_prod}}</strong> selon les standards Fairtrade International pour le produit <strong>{{produit_cert}}</strong> au <strong>{{pays_certification}}</strong>.</p>
<h2>Article 2 – Audit initial</h2>
<p>L'audit initial est fixé au <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Prime fairtrade</h2>
<p>La prime fairtrade est versée à l'organisation de producteurs conformément aux standards et est gérée de manière démocratique par le comité de la prime.</p>
<h2>Article 4 – Prix minimum</h2>
<p>L'organisation bénéficie du prix minimum Fairtrade garanti pour son produit, protégeant les producteurs contre les fluctuations des marchés.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_utz',
    name: "Accord de certification UTZ (cacao, café)",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Accord de prestation de certification UTZ (désormais intégrée à Rainforest Alliance) pour le cacao et le café ivoiriens.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'cooperative_nom',label:"Nom de la coopérative / producteur",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme de certification",type:'text',required:true},
      {key:'culture_certifiee',label:"Culture certifiée (cacao, café…)",type:'text',required:true},
      {key:'volume_annuel',label:"Volume annuel estimé (tonnes)",type:'text',required:false},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION UTZ — CACAO ET CAFÉ</h1>
<p>Entre <strong>{{cooperative_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme certifie la culture de <strong>{{culture_certifiee}}</strong> par <strong>{{cooperative_nom}}</strong> selon les critères de la certification UTZ/Rainforest Alliance. Volume annuel estimé : <strong>{{volume_annuel}} tonnes</strong>.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit est fixé le <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Bonnes pratiques agricoles</h2>
<p>La certification exige le respect des bonnes pratiques agricoles, la traçabilité des lots et l'amélioration continue des conditions sociales des travailleurs agricoles.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA et aux réglementations ivoiriennes sur le cacao et le café.</p>
</div>`,
  },
  {
    code: 'cert2_rainforest',
    name: "Accord de certification Rainforest Alliance",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Accord de prestation de certification Rainforest Alliance pour des cultures durables respectueuses de l'environnement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'producteur_nom',label:"Nom du producteur / groupement",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme de certification agréé RA",type:'text',required:true},
      {key:'cultures',label:"Cultures concernées",type:'text',required:true},
      {key:'surface_ha',label:"Surface certifiée (ha)",type:'text',required:false},
      {key:'date_audit',label:"Date de l'audit de certification",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION RAINFOREST ALLIANCE</h1>
<p>Entre <strong>{{producteur_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme certifie les cultures de <strong>{{cultures}}</strong> de <strong>{{producteur_nom}}</strong> (surface : <strong>{{surface_ha}} ha</strong>) selon le standard Rainforest Alliance 2020.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit de certification est prévu le <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Durée</h2>
<p>La certification est valable 3 ans avec un audit de surveillance annuel.</p>
<h2>Article 4 – Engagements durables</h2>
<p>Le Producteur s'engage à protéger la biodiversité, à gérer durablement les sols et l'eau, et à améliorer les conditions de vie des travailleurs agricoles.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_rspo',
    name: "Accord de certification RSPO (huile de palme)",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Accord de prestation de certification RSPO (Roundtable on Sustainable Palm Oil) pour les producteurs d'huile de palme.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'producteur_nom',label:"Nom du producteur / huilerie",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme de certification RSPO",type:'text',required:true},
      {key:'plantation_ha',label:"Surface de plantation (ha)",type:'text',required:true},
      {key:'mill_nom',label:"Nom du moulin (mill)",type:'text',required:false},
      {key:'date_audit',label:"Date de l'audit RSPO",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION RSPO — HUILE DE PALME DURABLE</h1>
<p>Entre <strong>{{producteur_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme certifie la plantation de <strong>{{plantation_ha}} ha</strong> de <strong>{{producteur_nom}}</strong> selon les principes et critères RSPO. Moulin concerné : <strong>{{mill_nom}}</strong>.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit de certification est prévu le <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Conformité sociale et environnementale</h2>
<p>Le Producteur s'engage à ne pas défricher les forêts à haute valeur de conservation, à respecter les droits des communautés locales et à améliorer le bien-être des travailleurs.</p>
<h2>Article 4 – Traçabilité</h2>
<p>La chaîne de traçabilité de l'huile est documentée conformément au modèle de chaîne de contrôle RSPO choisi.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_asc',
    name: "Accord de certification ASC (aquaculture)",
    category: 'commercial_financier',
    price: 6500, priceMax: 18000,
    description: "Accord de prestation de certification ASC (Aquaculture Stewardship Council) pour les fermes aquacoles responsables.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'ferme_nom',label:"Nom de la ferme aquacole",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme de certification ASC",type:'text',required:true},
      {key:'espece_elevee',label:"Espèce(s) élevée(s)",type:'text',required:true},
      {key:'localisation_ferme',label:"Localisation de la ferme",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit ASC",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION ASC — AQUACULTURE RESPONSABLE</h1>
<p>Entre <strong>{{ferme_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme certifie la ferme aquacole <strong>{{ferme_nom}}</strong> située à <strong>{{localisation_ferme}}</strong> pour l'élevage de <strong>{{espece_elevee}}</strong> selon le standard ASC applicable.</p>
<h2>Article 2 – Audit</h2>
<p>L'audit est prévu le <strong>{{date_audit}}</strong>.</p>
<h2>Article 3 – Exigences environnementales et sociales</h2>
<p>La ferme s'engage à minimiser son impact sur les écosystèmes aquatiques, à respecter les droits des travailleurs et à s'inscrire dans une démarche de progrès continu.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_msc',
    name: "Accord de certification MSC (pêche durable)",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Accord de prestation de certification MSC (Marine Stewardship Council) pour les unités de pêche durable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'armateur_nom',label:"Nom de l'armateur / unité de pêche",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme de certification MSC",type:'text',required:true},
      {key:'espece_peche',label:"Espèce(s) pêchée(s)",type:'text',required:true},
      {key:'zone_peche',label:"Zone de pêche (FAO…)",type:'text',required:true},
      {key:'date_evaluation',label:"Date de début de l'évaluation MSC",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CERTIFICATION MSC — PÊCHE DURABLE</h1>
<p>Entre <strong>{{armateur_nom}}</strong> et <strong>{{organisme_cert}}</strong>, il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>L'Organisme évalue et certifie l'unité de pêche de <strong>{{armateur_nom}}</strong> pour <strong>{{espece_peche}}</strong> dans la zone <strong>{{zone_peche}}</strong> selon le standard MSC pour la pêche durable.</p>
<h2>Article 2 – Évaluation</h2>
<p>L'évaluation débute le <strong>{{date_evaluation}}</strong>. Le processus complet dure généralement 12 à 18 mois.</p>
<h2>Article 3 – Principes MSC</h2>
<p>La certification repose sur trois principes : durabilité des stocks, minimisation des impacts environnementaux, efficacité de la gestion des pêcheries.</p>
<h2>Article 4 – Surveillance</h2>
<p>Des audits de surveillance annuels et un renouvellement tous les 5 ans sont requis pour maintenir la certification.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Accord soumis au droit OHADA.</p>
</div>`,
  },
  {
    code: 'cert2_surveillance_perio',
    name: "Rapport de surveillance périodique certification",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Modèle de rapport de surveillance périodique pour le maintien d'une certification qualité ou environnementale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise certifiée",type:'text',required:true},
      {key:'organisme_cert',label:"Organisme certificateur",type:'text',required:true},
      {key:'certification_concernee',label:"Certification concernée (ISO 9001, BRC…)",type:'text',required:true},
      {key:'date_audit_surv',label:"Date de l'audit de surveillance",type:'date',required:true},
      {key:'conclusion_audit',label:"Conclusion de l'audit (maintien, suspension…)",type:'text',required:true},
    ]),
    body: `<div class="doc">
<h1>RAPPORT DE SURVEILLANCE PÉRIODIQUE — CERTIFICATION</h1>
<p><strong>Entreprise :</strong> {{entreprise_nom}}</p>
<p><strong>Organisme certificateur :</strong> {{organisme_cert}}</p>
<p><strong>Certification :</strong> {{certification_concernee}}</p>
<p><strong>Date de l'audit de surveillance :</strong> {{date_audit_surv}}</p>
<h2>1. Périmètre de l'audit de surveillance</h2>
<p>[Décrire les processus et sites audités lors de cette surveillance.]</p>
<h2>2. Constatations</h2>
<p>[Lister les points forts, les observations et les non-conformités constatées.]</p>
<h2>3. Plan d'actions correctives</h2>
<p>[Décrire les actions correctives demandées et les délais de mise en œuvre.]</p>
<h2>4. Conclusion</h2>
<p><strong>{{conclusion_audit}}</strong></p>
<p>Le certificat est maintenu / suspendu / retiré selon la conclusion ci-dessus.</p>
<p>Fait à Abidjan, le <strong>{{date_audit_surv}}</strong></p>
<p>Signature de l'auditeur responsable : ___________________</p>
</div>`,
  },
  {
    code: 'cert2_plan_renouvellement',
    name: "Plan de renouvellement certification",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Modèle de plan de renouvellement de certification qualité, définissant les étapes et responsabilités avant l'expiration du certificat.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'responsable_qualite',label:"Responsable qualité",type:'text',required:true},
      {key:'certification_a_renouveler',label:"Certification à renouveler",type:'text',required:true},
      {key:'date_expiration',label:"Date d'expiration du certificat actuel",type:'date',required:true},
      {key:'date_audit_renouvellement',label:"Date cible de l'audit de renouvellement",type:'date',required:true},
    ]),
    body: `<div class="doc">
<h1>PLAN DE RENOUVELLEMENT DE CERTIFICATION</h1>
<p><strong>Entreprise :</strong> {{entreprise_nom}}</p>
<p><strong>Responsable qualité :</strong> {{responsable_qualite}}</p>
<p><strong>Certification à renouveler :</strong> {{certification_a_renouveler}}</p>
<p><strong>Date d'expiration :</strong> {{date_expiration}}</p>
<p><strong>Audit de renouvellement cible :</strong> {{date_audit_renouvellement}}</p>
<h2>1. Revue du système de management</h2>
<p>[Programmer la revue de direction avant l'audit de renouvellement.]</p>
<h2>2. Audit interne de pré-renouvellement</h2>
<p>[Réaliser un audit interne couvrant l'intégralité du périmètre de certification.]</p>
<h2>3. Mise à jour documentaire</h2>
<p>[Actualiser les procédures et enregistrements qualité.]</p>
<h2>4. Levée des non-conformités en cours</h2>
<p>[S'assurer que toutes les non-conformités antérieures sont soldées.]</p>
<h2>5. Soumission du dossier à l'organisme certificateur</h2>
<p>[Transmettre le dossier de renouvellement 3 mois avant l'expiration.]</p>
</div>`,
  },
  {
    code: 'cert2_charte_normalisation_afrique',
    name: "Charte de la normalisation et de la qualité au service du développement africain",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Charte institutionnelle engageant une organisation dans la promotion de la normalisation et de la qualité au service du développement de l'Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'organisation_nom',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'representant',label:"Nom et titre du représentant signataire",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'domaines_engagement',label:"Domaines d'engagement prioritaires",type:'textarea',required:true},
    ]),
    body: `<div class="doc">
<h1>CHARTE DE LA NORMALISATION ET DE LA QUALITÉ AU SERVICE DU DÉVELOPPEMENT AFRICAIN</h1>
<p><strong>{{organisation_nom}}</strong></p>
<p>Adoptée le <strong>{{date_adoption}}</strong> par <strong>{{representant}}</strong></p>
<h2>Préambule</h2>
<p>La normalisation et la qualité constituent des leviers essentiels du développement économique de l'Afrique, de la compétitivité de ses entreprises sur les marchés régionaux et internationaux, et de la protection des consommateurs africains.</p>
<p><strong>{{organisation_nom}}</strong> s'engage solennellement à promouvoir et à respecter les standards de qualité et de normalisation dans l'ensemble de ses activités.</p>
<h2>Domaines d'engagement</h2>
<p>{{domaines_engagement}}</p>
<h2>Nos engagements fondamentaux</h2>
<p>1. Adopter et appliquer les normes ANOR, CEDEAO, ISO et Codex Alimentarius pertinentes pour nos activités.<br/>
2. Investir dans la formation de nos équipes aux référentiels de qualité et de normalisation.<br/>
3. Participer activement aux travaux des comités techniques de normalisation nationaux et régionaux.<br/>
4. Partager notre expérience et nos bonnes pratiques avec d'autres acteurs économiques africains.<br/>
5. Contribuer à l'émergence d'une culture de la qualité en Afrique, au bénéfice des générations futures.</p>
<p>Fait à Abidjan, le <strong>{{date_adoption}}</strong></p>
<p>Signature : ___________________<br/><strong>{{representant}}</strong></p>
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
  console.log(`Batch 102a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
