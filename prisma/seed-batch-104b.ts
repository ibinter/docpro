import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 ARCHITECTURE AVANCÉE / URBANISME (arch3_) ───────────────────────────
  {
    code: 'arch3_aps', name: "Accord de mission de conception architecturale (APS)", category: 'btp_construction', price: 6000, priceMax: 18000,
    description: "Accord de mission pour la phase avant-projet sommaire (APS) en architecture, selon le droit CI/OHADA.", templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'architecte',label:"Architecte mandataire",type:'text',required:true},
      {key:'date_mission',label:"Date de début de mission",type:'date',required:true},
      {key:'objet_projet',label:"Objet du projet",type:'textarea',required:true},
      {key:'honoraires_aps',label:"Honoraires APS (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION ARCHITECTURALE — AVANT-PROJET SOMMAIRE (APS)</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> (maître d'ouvrage) et <strong>{{architecte}}</strong> (architecte), il est convenu ce qui suit :</p><p><strong>Objet du projet :</strong> {{objet_projet}}</p><p><strong>Date de mission :</strong> {{date_mission}}</p><p><strong>Honoraires convenus :</strong> {{honoraires_aps}} FCFA</p><h2>1. Étendue de la mission APS</h2><p>L'architecte s'engage à produire les études d'avant-projet sommaire conformément aux prescriptions du maître d'ouvrage et aux normes en vigueur en Côte d'Ivoire.</p><h2>2. Obligations du maître d'ouvrage</h2><p>Le maître d'ouvrage s'engage à fournir toutes les données nécessaires et à régler les honoraires selon l'échéancier convenu.</p><h2>3. Droit applicable</h2><p>Le présent accord est soumis au droit ivoirien et au droit OHADA.</p><p>Fait à Abidjan, le {{date_mission}}</p><p>Signature maître d'ouvrage : _____________________ Signature architecte : _____________________</p></div>` },

  {
    code: 'arch3_apd', name: "Accord de mission de conception architecturale (APD)", category: 'btp_construction', price: 7000, priceMax: 21000,
    description: "Accord de mission pour la phase avant-projet définitif (APD) incluant les études techniques approfondies.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'architecte',label:"Architecte",type:'text',required:true},
      {key:'date_apd',label:"Date de début APD",type:'date',required:true},
      {key:'localisation',label:"Localisation du projet",type:'text',required:true},
      {key:'honoraires_apd',label:"Honoraires APD (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION ARCHITECTURALE — AVANT-PROJET DÉFINITIF (APD)</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{architecte}}</strong>, il est arrêté ce qui suit :</p><p><strong>Localisation :</strong> {{localisation}}</p><p><strong>Date de début :</strong> {{date_apd}}</p><p><strong>Honoraires APD :</strong> {{honoraires_apd}} FCFA</p><h2>1. Objet de la mission</h2><p>L'architecte réalise les études d'avant-projet définitif permettant d'arrêter en accord avec le maître d'ouvrage toutes les dispositions architecturales, techniques, économiques et fonctionnelles.</p><h2>2. Livrables</h2><p>Plans de masse, coupes, élévations, notice descriptive, estimation du coût prévisionnel des travaux.</p><h2>3. Délais</h2><p>La mission APD sera réalisée dans les délais contractuellement définis entre les parties.</p><p>Fait à Abidjan, le {{date_apd}}</p><p>Signatures des parties : _____________________</p></div>` },

  {
    code: 'arch3_dce', name: "Accord de mission de conception architecturale (DCE)", category: 'btp_construction', price: 8000, priceMax: 24000,
    description: "Accord de mission pour la phase projet d'exécution et constitution du dossier de consultation des entreprises (DCE).", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'architecte',label:"Architecte",type:'text',required:true},
      {key:'reference_projet',label:"Référence du projet",type:'text',required:true},
      {key:'date_dce',label:"Date de lancement DCE",type:'date',required:true},
      {key:'budget_travaux',label:"Budget prévisionnel travaux (FCFA)",type:'text',required:true},
      {key:'honoraires_dce',label:"Honoraires DCE (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION — PROJET D'EXÉCUTION ET DCE</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{architecte}}</strong> :</p><p><strong>Référence projet :</strong> {{reference_projet}}</p><p><strong>Budget prévisionnel :</strong> {{budget_travaux}} FCFA</p><p><strong>Honoraires DCE :</strong> {{honoraires_dce}} FCFA</p><h2>1. Contenu de la mission</h2><p>L'architecte établit le projet d'exécution comprenant les plans d'exécution, les détails et le dossier de consultation des entreprises (DCE) incluant le CCTP, les plans, le bordereau des prix et le DPGF.</p><h2>2. Coordination des études</h2><p>L'architecte coordonne les études des ingénieurs spécialisés (structure, fluides, électricité).</p><p>Fait à Abidjan, le {{date_dce}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_act', name: "Accord de mission d'assistance à la passation des marchés (ACT)", category: 'btp_construction', price: 5000, priceMax: 15000,
    description: "Accord de mission d'assistance à la passation des marchés de travaux (ACT) selon la réglementation CI.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'architecte',label:"Architecte",type:'text',required:true},
      {key:'date_act',label:"Date de début ACT",type:'date',required:true},
      {key:'nb_lots',label:"Nombre de lots",type:'text',required:true},
      {key:'honoraires_act',label:"Honoraires ACT (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION — ASSISTANCE À LA PASSATION DES MARCHÉS (ACT)</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{architecte}}</strong> :</p><p><strong>Nombre de lots :</strong> {{nb_lots}}</p><p><strong>Honoraires ACT :</strong> {{honoraires_act}} FCFA</p><h2>1. Mission ACT</h2><p>L'architecte assiste le maître d'ouvrage dans la consultation des entreprises, l'analyse des offres et la rédaction des marchés de travaux.</p><h2>2. Livrables ACT</h2><p>Rapport d'analyse des offres, recommandations d'attribution, projet de marché.</p><p>Fait à Abidjan, le {{date_act}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_det', name: "Accord de mission de direction de l'exécution des travaux (DET)", category: 'btp_construction', price: 7000, priceMax: 22000,
    description: "Accord de mission de direction et de contrôle de l'exécution des travaux (DET).", templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'architecte',label:"Architecte directeur des travaux",type:'text',required:true},
      {key:'entrepreneur',label:"Entreprise principale",type:'text',required:true},
      {key:'date_chantier',label:"Date d'ouverture du chantier",type:'date',required:true},
      {key:'duree_travaux',label:"Durée prévisionnelle des travaux",type:'text',required:true},
      {key:'honoraires_det',label:"Honoraires DET (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION — DIRECTION DE L'EXÉCUTION DES TRAVAUX (DET)</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{architecte}}</strong>, pour les travaux réalisés par <strong>{{entrepreneur}}</strong> :</p><p><strong>Ouverture du chantier :</strong> {{date_chantier}}</p><p><strong>Durée prévisionnelle :</strong> {{duree_travaux}}</p><p><strong>Honoraires DET :</strong> {{honoraires_det}} FCFA</p><h2>1. Mission DET</h2><p>L'architecte dirige et contrôle l'exécution des travaux conformément aux documents contractuels, vise les situations de travaux et tient le journal de chantier.</p><h2>2. Fréquence des visites</h2><p>Visites hebdomadaires et réunions de chantier selon planning établi.</p><p>Fait à Abidjan, le {{date_chantier}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_aor', name: "Accord de mission d'assistance aux opérations de réception (AOR)", category: 'btp_construction', price: 4000, priceMax: 12000,
    description: "Accord de mission d'assistance au maître d'ouvrage lors des opérations de réception des travaux (AOR).", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'architecte',label:"Architecte",type:'text',required:true},
      {key:'date_reception',label:"Date prévisionnelle de réception",type:'date',required:true},
      {key:'objet_reception',label:"Objet des travaux réceptionnés",type:'textarea',required:true},
      {key:'honoraires_aor',label:"Honoraires AOR (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION — ASSISTANCE AUX OPÉRATIONS DE RÉCEPTION (AOR)</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{architecte}}</strong> :</p><p><strong>Travaux concernés :</strong> {{objet_reception}}</p><p><strong>Date prévisionnelle de réception :</strong> {{date_reception}}</p><p><strong>Honoraires AOR :</strong> {{honoraires_aor}} FCFA</p><h2>1. Mission AOR</h2><p>L'architecte assiste le maître d'ouvrage lors des opérations de réception, établit la liste des réserves, suit leur levée et délivre le procès-verbal de réception sans réserve.</p><p>Fait à Abidjan, le {{date_reception}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_complete', name: "Accord de mission complète d'architecte (loi CI)", category: 'btp_construction', price: 10000, priceMax: 36000,
    description: "Accord de mission complète d'architecte couvrant toutes les phases (APS à AOR) selon la loi ivoirienne.", templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'architecte',label:"Architecte",type:'text',required:true},
      {key:'adresse_projet',label:"Adresse du projet",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true},
      {key:'cout_travaux',label:"Coût estimatif des travaux (FCFA)",type:'text',required:true},
      {key:'taux_honoraires',label:"Taux d'honoraires (%)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION COMPLÈTE D'ARCHITECTE</h1><p>Conformément à la législation ivoirienne relative à l'exercice de la profession d'architecte, entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{architecte}}</strong> (inscrit au tableau de l'Ordre des Architectes de Côte d'Ivoire) :</p><p><strong>Adresse du projet :</strong> {{adresse_projet}}</p><p><strong>Coût estimatif des travaux :</strong> {{cout_travaux}} FCFA</p><p><strong>Taux d'honoraires :</strong> {{taux_honoraires}} %</p><h2>1. Étendue de la mission</h2><p>La mission comprend les phases APS, APD, PRO/DCE, ACT, DET et AOR.</p><h2>2. Obligations légales</h2><p>L'architecte est le seul habilité à signer les plans de construction soumis à permis de construire en Côte d'Ivoire.</p><h2>3. Assurance professionnelle</h2><p>L'architecte atteste être couvert par une assurance responsabilité civile professionnelle en cours de validité.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_diag', name: "Accord de service de diagnostic architectural (bâtiment existant)", category: 'btp_construction', price: 4000, priceMax: 14000,
    description: "Accord de service pour le diagnostic architectural d'un bâtiment existant en vue de sa réhabilitation.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'commanditaire',label:"Commanditaire",type:'text',required:true},
      {key:'architecte',label:"Architecte diagnostiqueur",type:'text',required:true},
      {key:'adresse_batiment',label:"Adresse du bâtiment",type:'text',required:true},
      {key:'date_diagnostic',label:"Date du diagnostic",type:'date',required:true},
      {key:'honoraires_diag',label:"Honoraires diagnostic (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DIAGNOSTIC ARCHITECTURAL</h1><p>Entre <strong>{{commanditaire}}</strong> et <strong>{{architecte}}</strong> :</p><p><strong>Bâtiment concerné :</strong> {{adresse_batiment}}</p><p><strong>Date de diagnostic :</strong> {{date_diagnostic}}</p><p><strong>Honoraires :</strong> {{honoraires_diag}} FCFA</p><h2>1. Périmètre du diagnostic</h2><p>Inspection visuelle de la structure, des façades, de la toiture, des réseaux apparents et des espaces intérieurs. Rédaction d'un rapport de diagnostic avec préconisations.</p><h2>2. Limites de la mission</h2><p>Le diagnostic architectural est une étude documentaire et visuelle. Il ne se substitue pas aux études techniques spécialisées.</p><p>Fait à Abidjan, le {{date_diagnostic}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_reserves', name: "Accord de service de levée de réserves (réception de travaux)", category: 'btp_construction', price: 3000, priceMax: 9000,
    description: "Accord de service pour le suivi et la levée des réserves après réception de travaux.", templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'architecte',label:"Architecte",type:'text',required:true},
      {key:'date_pv_reception',label:"Date du PV de réception",type:'date',required:true},
      {key:'nombre_reserves',label:"Nombre de réserves",type:'text',required:true},
      {key:'honoraires_reserves',label:"Honoraires levée de réserves (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — LEVÉE DE RÉSERVES</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{architecte}}</strong> :</p><p><strong>PV de réception daté du :</strong> {{date_pv_reception}}</p><p><strong>Nombre de réserves à lever :</strong> {{nombre_reserves}}</p><p><strong>Honoraires :</strong> {{honoraires_reserves}} FCFA</p><h2>1. Mission</h2><p>L'architecte assure le suivi de la levée de chaque réserve auprès de l'entreprise, procède aux vérifications contradictoires et émet le procès-verbal de levée totale des réserves.</p><p>Fait à Abidjan, le {{date_pv_reception}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_demolition', name: "Accord de service de rétablissement dans état initial (démolition)", category: 'btp_construction', price: 4000, priceMax: 12000,
    description: "Accord de service pour la mission de rétablissement dans l'état initial après démolition ou déconstruction.", templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'commanditaire',label:"Commanditaire",type:'text',required:true},
      {key:'architecte',label:"Architecte",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'date_mission',label:"Date de début de mission",type:'date',required:true},
      {key:'description_travaux',label:"Description des travaux de démolition",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RÉTABLISSEMENT DANS L'ÉTAT INITIAL (DÉMOLITION)</h1><p>Entre <strong>{{commanditaire}}</strong> et <strong>{{architecte}}</strong> :</p><p><strong>Site concerné :</strong> {{adresse_site}}</p><p><strong>Travaux : </strong> {{description_travaux}}</p><p><strong>Date de mission :</strong> {{date_mission}}</p><h2>1. Mission</h2><p>L'architecte supervise les opérations de démolition et coordonne les mesures de rétablissement du site dans son état initial, conformément aux prescriptions administratives et environnementales en vigueur en Côte d'Ivoire.</p><p>Fait à Abidjan, le {{date_mission}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_eie', name: "Accord de service d'étude d'impact environnemental bâtiment", category: 'btp_construction', price: 5000, priceMax: 18000,
    description: "Accord de service pour la réalisation d'une étude d'impact environnemental (EIE) de projet bâtimentaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'bureau_etude',label:"Bureau d'études EIE",type:'text',required:true},
      {key:'designation_projet',label:"Désignation du projet",type:'text',required:true},
      {key:'date_eie',label:"Date de démarrage EIE",type:'date',required:true},
      {key:'honoraires_eie',label:"Honoraires EIE (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ÉTUDE D'IMPACT ENVIRONNEMENTAL BÂTIMENT</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{bureau_etude}}</strong> :</p><p><strong>Projet :</strong> {{designation_projet}}</p><p><strong>Honoraires :</strong> {{honoraires_eie}} FCFA</p><h2>1. Objet</h2><p>Le prestataire réalise l'étude d'impact environnemental conformément à la réglementation CI (décret relatif aux EIE), incluant l'état initial du site, les impacts prévisibles et les mesures d'atténuation.</p><h2>2. Rapport EIE</h2><p>Remise d'un rapport EIE validé par les autorités compétentes ivoiriennes (CIAPOL, Ministère de l'Environnement).</p><p>Fait à Abidjan, le {{date_eie}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_sol', name: "Accord de service d'étude de sol et fondations (architecte)", category: 'btp_construction', price: 4000, priceMax: 14000,
    description: "Accord de service pour l'étude géotechnique et les recommandations de fondations en contexte CI.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'bureau_geotechnique',label:"Bureau géotechnique",type:'text',required:true},
      {key:'adresse_terrain',label:"Adresse du terrain",type:'text',required:true},
      {key:'date_etude',label:"Date de l'étude",type:'date',required:true},
      {key:'honoraires_sol',label:"Honoraires étude de sol (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ÉTUDE DE SOL ET FONDATIONS</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{bureau_geotechnique}}</strong> :</p><p><strong>Terrain :</strong> {{adresse_terrain}}</p><p><strong>Honoraires :</strong> {{honoraires_sol}} FCFA</p><h2>1. Prestations</h2><p>Réalisation de sondages, prélèvements et essais de laboratoire. Rédaction d'un rapport géotechnique avec recommandations de types de fondations adaptés aux caractéristiques du sol ivoirien.</p><p>Fait à Abidjan, le {{date_etude}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_ssi', name: "Accord de service de coordination SSI (sécurité incendie)", category: 'btp_construction', price: 5000, priceMax: 16000,
    description: "Accord de service de coordination et de contrôle du système de sécurité incendie (SSI) dans les bâtiments.", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'coordonnateur_ssi',label:"Coordonnateur SSI",type:'text',required:true},
      {key:'designation_batiment',label:"Désignation du bâtiment",type:'text',required:true},
      {key:'date_coordination',label:"Date de début de coordination",type:'date',required:true},
      {key:'honoraires_ssi',label:"Honoraires SSI (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — COORDINATION SSI (SÉCURITÉ INCENDIE)</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{coordonnateur_ssi}}</strong> :</p><p><strong>Bâtiment :</strong> {{designation_batiment}}</p><p><strong>Honoraires :</strong> {{honoraires_ssi}} FCFA</p><h2>1. Mission SSI</h2><p>Le coordonnateur SSI assure la coordination et la vérification de la conformité des installations de détection incendie, désenfumage, alarme et évacuation conformément aux normes en vigueur en Côte d'Ivoire.</p><p>Fait à Abidjan, le {{date_coordination}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_bim', name: "Accord de service de BIM (modélisation maquette numérique)", category: 'btp_construction', price: 6000, priceMax: 20000,
    description: "Accord de service pour la modélisation et la gestion de la maquette numérique BIM d'un projet architectural.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'manager_bim',label:"BIM Manager",type:'text',required:true},
      {key:'designation_projet',label:"Désignation du projet",type:'text',required:true},
      {key:'date_bim',label:"Date de démarrage BIM",type:'date',required:true},
      {key:'niveau_lod',label:"Niveau de développement LOD visé",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — BIM (MODÉLISATION MAQUETTE NUMÉRIQUE)</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{manager_bim}}</strong> :</p><p><strong>Projet :</strong> {{designation_projet}}</p><p><strong>Niveau LOD visé :</strong> {{niveau_lod}}</p><h2>1. Contenu de la mission BIM</h2><p>Création et gestion de la maquette numérique du projet, coordination des modèles métiers (architecture, structure, CVC), détection des conflits et production des livrables BIM définis dans la convention BIM.</p><h2>2. Convention BIM</h2><p>Une convention BIM sera établie et annexée au présent accord.</p><p>Fait à Abidjan, le {{date_bim}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_3d', name: "Accord de service de rendu 3D et réalité virtuelle (architecture)", category: 'btp_construction', price: 3500, priceMax: 12000,
    description: "Accord de service pour la production de rendus 3D photoréalistes et de visite en réalité virtuelle.", templateType: 'pdf', classe: 'C', active: true, popularity: 64,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'studio_3d',label:"Studio 3D / Visualisateur",type:'text',required:true},
      {key:'description_projet',label:"Description du projet à visualiser",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison des rendus",type:'date',required:true},
      {key:'honoraires_3d',label:"Honoraires rendus 3D (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RENDU 3D ET RÉALITÉ VIRTUELLE</h1><p>Entre <strong>{{client}}</strong> et <strong>{{studio_3d}}</strong> :</p><p><strong>Projet :</strong> {{description_projet}}</p><p><strong>Délai de livraison :</strong> {{date_livraison}}</p><p><strong>Honoraires :</strong> {{honoraires_3d}} FCFA</p><h2>1. Livrables</h2><p>Images de synthèse photoréalistes (haute résolution), visite virtuelle interactive, vidéo de présentation architecturale.</p><h2>2. Révisions</h2><p>Deux cycles de révision inclus dans le prix convenu.</p><p>Fait à Abidjan, le {{date_livraison}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_zac', name: "Accord de service d'urbanisme opérationnel (ZAC, PAP)", category: 'btp_construction', price: 8000, priceMax: 28000,
    description: "Accord de service pour les études d'urbanisme opérationnel : Zone d'Aménagement Concerté (ZAC) et Plan d'Aménagement Particulier (PAP).", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'collectivite',label:"Collectivité territoriale",type:'text',required:true},
      {key:'urbaniste',label:"Cabinet d'urbanisme",type:'text',required:true},
      {key:'denomination_zone',label:"Dénomination de la zone",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie (hectares)",type:'text',required:true},
      {key:'date_debut',label:"Date de début d'étude",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — URBANISME OPÉRATIONNEL (ZAC / PAP)</h1><p>Entre <strong>{{collectivite}}</strong> et <strong>{{urbaniste}}</strong> :</p><p><strong>Zone :</strong> {{denomination_zone}} — {{superficie_ha}} ha</p><p><strong>Date de début :</strong> {{date_debut}}</p><h2>1. Contenu des études</h2><p>Diagnostic territorial, études de programmation urbaine, plans d'aménagement, dossier de création et de réalisation de la ZAC / PAP conformément au Code de l'Urbanisme de Côte d'Ivoire.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_pos', name: "Accord de service de plan d'occupation des sols (POS) révision", category: 'btp_construction', price: 7000, priceMax: 24000,
    description: "Accord de service pour la révision d'un Plan d'Occupation des Sols (POS) selon le droit ivoirien.", templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'commune',label:"Commune concernée",type:'text',required:true},
      {key:'bureau_etude',label:"Bureau d'études en urbanisme",type:'text',required:true},
      {key:'reference_pos',label:"Référence du POS en vigueur",type:'text',required:true},
      {key:'date_debut',label:"Date de début de révision",type:'date',required:true},
      {key:'honoraires_pos',label:"Honoraires révision POS (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RÉVISION DU PLAN D'OCCUPATION DES SOLS (POS)</h1><p>Entre <strong>{{commune}}</strong> et <strong>{{bureau_etude}}</strong> :</p><p><strong>POS de référence :</strong> {{reference_pos}}</p><p><strong>Honoraires :</strong> {{honoraires_pos}} FCFA</p><h2>1. Objet</h2><p>Révision complète du POS incluant diagnostic territorial, concertation publique, rédaction du règlement de zone et cartographie des zonages, conformément aux dispositions du Code de l'Urbanisme ivoirien.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_plu', name: "Accord de service de plan local d'urbanisme (PLU-CI)", category: 'btp_construction', price: 8000, priceMax: 30000,
    description: "Accord de service pour l'élaboration ou la révision d'un Plan Local d'Urbanisme adapté au contexte ivoirien (PLU-CI).", templateType: 'pdf', classe: 'A', active: true, popularity: 54,
    fieldsJson: F([
      {key:'commune',label:"Commune",type:'text',required:true},
      {key:'urbaniste',label:"Urbaniste / Bureau d'études",type:'text',required:true},
      {key:'date_deliberation',label:"Date de délibération de lancement",type:'date',required:true},
      {key:'duree_etude',label:"Durée prévisionnelle de l'étude",type:'text',required:true},
      {key:'honoraires_plu',label:"Honoraires PLU-CI (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PLAN LOCAL D'URBANISME (PLU-CI)</h1><p>Entre <strong>{{commune}}</strong> et <strong>{{urbaniste}}</strong> :</p><p><strong>Durée de l'étude :</strong> {{duree_etude}}</p><p><strong>Honoraires :</strong> {{honoraires_plu}} FCFA</p><h2>1. Périmètre de la mission</h2><p>Élaboration du PLU-CI comprenant le rapport de présentation, le PADD, les orientations d'aménagement et de programmation, le règlement graphique et écrit, et les annexes.</p><p>Fait à Abidjan, le {{date_deliberation}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_cu', name: "Accord de service de certificat d'urbanisme", category: 'btp_construction', price: 3000, priceMax: 8000,
    description: "Accord de service pour l'instruction et la délivrance d'un certificat d'urbanisme en Côte d'Ivoire.", templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'demandeur',label:"Demandeur",type:'text',required:true},
      {key:'mandataire',label:"Mandataire / Cabinet",type:'text',required:true},
      {key:'adresse_terrain',label:"Adresse du terrain",type:'text',required:true},
      {key:'date_demande',label:"Date de dépôt de la demande",type:'date',required:true},
      {key:'honoraires_cu',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CERTIFICAT D'URBANISME</h1><p>Entre <strong>{{demandeur}}</strong> et <strong>{{mandataire}}</strong> :</p><p><strong>Terrain :</strong> {{adresse_terrain}}</p><p><strong>Date de dépôt :</strong> {{date_demande}}</p><p><strong>Honoraires :</strong> {{honoraires_cu}} FCFA</p><h2>1. Mission</h2><p>Constitution et dépôt du dossier de demande de certificat d'urbanisme auprès des services compétents (Direction de l'Urbanisme, Mairie), suivi du dossier et réception du certificat.</p><p>Fait à Abidjan, le {{date_demande}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_permis', name: "Accord de service d'autorisation de construire CI", category: 'btp_construction', price: 4000, priceMax: 14000,
    description: "Accord de service pour la constitution du dossier et l'obtention du permis de construire en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'architecte',label:"Architecte mandataire",type:'text',required:true},
      {key:'adresse_projet',label:"Adresse du projet",type:'text',required:true},
      {key:'date_depot',label:"Date prévue de dépôt",type:'date',required:true},
      {key:'honoraires_permis',label:"Honoraires dossier permis (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — AUTORISATION DE CONSTRUIRE (CÔTE D'IVOIRE)</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{architecte}}</strong> :</p><p><strong>Adresse du projet :</strong> {{adresse_projet}}</p><p><strong>Date prévue de dépôt :</strong> {{date_depot}}</p><p><strong>Honoraires :</strong> {{honoraires_permis}} FCFA</p><h2>1. Contenu du dossier</h2><p>Constitution du dossier d'autorisation de construire (plans de masse, façades, coupes, notice descriptive, attestation d'assurance), dépôt en Mairie/Préfecture, suivi et obtention de l'autorisation.</p><h2>2. Obligations légales</h2><p>Tout projet de construction doit être signé par un architecte inscrit à l'Ordre des Architectes de Côte d'Ivoire.</p><p>Fait à Abidjan, le {{date_depot}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_demolir', name: "Accord de service de permis de démolir", category: 'btp_construction', price: 3000, priceMax: 10000,
    description: "Accord de service pour l'obtention du permis de démolir auprès des autorités compétentes en CI.", templateType: 'pdf', classe: 'C', active: true, popularity: 48,
    fieldsJson: F([
      {key:'proprietaire',label:"Propriétaire",type:'text',required:true},
      {key:'mandataire',label:"Mandataire",type:'text',required:true},
      {key:'adresse_batiment',label:"Adresse du bâtiment à démolir",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true},
      {key:'honoraires_demolir',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PERMIS DE DÉMOLIR</h1><p>Entre <strong>{{proprietaire}}</strong> et <strong>{{mandataire}}</strong> :</p><p><strong>Bâtiment :</strong> {{adresse_batiment}}</p><p><strong>Honoraires :</strong> {{honoraires_demolir}} FCFA</p><h2>1. Mission</h2><p>Constitution du dossier de demande de permis de démolir, dépôt auprès des services compétents, suivi de l'instruction et obtention de l'autorisation, conformément au Code de la Construction de Côte d'Ivoire.</p><p>Fait à Abidjan, le {{date_demande}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_espub', name: "Accord de service d'aménagement d'espace public", category: 'btp_construction', price: 6000, priceMax: 20000,
    description: "Accord de service pour la conception et le suivi de l'aménagement d'un espace public (place, rue piétonne, esplanade).", templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'collectivite',label:"Collectivité / Mairie",type:'text',required:true},
      {key:'architecte_urbaniste',label:"Architecte-urbaniste",type:'text',required:true},
      {key:'denomination_espace',label:"Dénomination de l'espace",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'budget_amenagement',label:"Budget d'aménagement (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — AMÉNAGEMENT D'ESPACE PUBLIC</h1><p>Entre <strong>{{collectivite}}</strong> et <strong>{{architecte_urbaniste}}</strong> :</p><p><strong>Espace concerné :</strong> {{denomination_espace}}</p><p><strong>Budget :</strong> {{budget_amenagement}} FCFA</p><h2>1. Prestations</h2><p>Études de conception de l'espace public (esquisse, APS, APD), dossier de consultation des entreprises, direction des travaux et réception. Intégration des aspects paysagers, mobiliers urbains et accessibilité.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'arch3_rapport', name: "Rapport de mission d'architecte", category: 'btp_construction', price: 3000, priceMax: 9000,
    description: "Rapport périodique de mission d'architecte rendant compte de l'avancement des études et des travaux.", templateType: 'pdf', classe: 'C', active: true, popularity: 67,
    fieldsJson: F([
      {key:'architecte',label:"Architecte",type:'text',required:true},
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'designation_projet',label:"Désignation du projet",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte par le rapport",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE MISSION D'ARCHITECTE</h1><p><strong>Architecte :</strong> {{architecte}}</p><p><strong>Maître d'ouvrage :</strong> {{maitre_ouvrage}}</p><p><strong>Projet :</strong> {{designation_projet}}</p><p><strong>Période :</strong> {{periode_rapport}}</p><p><strong>Date :</strong> {{date_rapport}}</p><h2>1. Avancement des études</h2><p>[Description de l'état d'avancement des études en cours]</p><h2>2. Avancement des travaux</h2><p>[Description de l'état d'avancement du chantier, incidents, réserves]</p><h2>3. Points en suspens et décisions à prendre</h2><p>[Liste des points nécessitant une décision du maître d'ouvrage]</p><h2>4. Planning prévisionnel</h2><p>[Rappel du planning et éventuels ajustements]</p><p>Signature de l'architecte : _____________________</p></div>` },

  {
    code: 'arch3_pdu', name: "Plan de développement urbanisme durable", category: 'btp_construction', price: 9000, priceMax: 32000,
    description: "Plan stratégique de développement urbain durable pour une commune ou un quartier en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 53,
    fieldsJson: F([
      {key:'collectivite',label:"Collectivité concernée",type:'text',required:true},
      {key:'bureau_etude',label:"Bureau d'études",type:'text',required:true},
      {key:'horizon_planification',label:"Horizon de planification (ex: 2035)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
      {key:'superficie_km2',label:"Superficie du périmètre (km²)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT URBANISME DURABLE</h1><p><strong>Collectivité :</strong> {{collectivite}}</p><p><strong>Bureau d'études :</strong> {{bureau_etude}}</p><p><strong>Horizon :</strong> {{horizon_planification}}</p><p><strong>Superficie :</strong> {{superficie_km2}} km²</p><h2>1. Diagnostic territorial</h2><p>État des lieux de la démographie, de l'économie, des infrastructures et de l'environnement.</p><h2>2. Vision et orientations stratégiques</h2><p>Définition des objectifs de développement durable et des axes prioritaires d'intervention.</p><h2>3. Programme d'actions</h2><p>Projets structurants, phasage, mobilisation financière et gouvernance.</p><p>Approuvé le : {{date_lancement}}</p><p>Signatures des parties : _____________________</p></div>` },

  {
    code: 'arch3_charte', name: "Charte de l'architecture durable et du patrimoine bâti", category: 'btp_construction', price: 3500, priceMax: 10000,
    description: "Charte d'engagement pour la promotion de l'architecture durable et la préservation du patrimoine bâti en Côte d'Ivoire.", templateType: 'pdf', classe: 'C', active: true, popularity: 49,
    fieldsJson: F([
      {key:'signataires',label:"Signataires (organisations / personnes)",type:'textarea',required:true},
      {key:'date_charte',label:"Date de signature de la charte",type:'date',required:true},
      {key:'lieu_signature',label:"Lieu de signature",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ARCHITECTURE DURABLE ET DU PATRIMOINE BÂTI</h1><p><strong>Signataires :</strong> {{signataires}}</p><p><strong>Date :</strong> {{date_charte}}</p><p><strong>Lieu :</strong> {{lieu_signature}}</p><h2>Préambule</h2><p>Les signataires de la présente charte s'engagent à promouvoir une architecture respectueuse de l'environnement, valorisant les matériaux locaux et préservant le patrimoine bâti de Côte d'Ivoire.</p><h2>Engagements</h2><p>1. Intégrer les principes du développement durable dans toute démarche de conception.</p><p>2. Valoriser les savoirs constructifs traditionnels ivoiriens.</p><p>3. Contribuer à la protection et à la réhabilitation du patrimoine architectural.</p><p>4. Sensibiliser les maîtres d'ouvrage aux enjeux de la construction durable.</p><p>Signé à {{lieu_signature}}, le {{date_charte}}</p><p>Signatures : _____________________</p></div>` },

  // ─── 25 PAYSAGISME / JARDINS / ESPACES VERTS (paysag_) ──────────────────────
  {
    code: 'paysag_jardin', name: "Accord de service de création de jardin paysager", category: 'agro_environnement', price: 3500, priceMax: 12000,
    description: "Accord de service pour la conception et la réalisation d'un jardin paysager résidentiel ou collectif en Côte d'Ivoire.", templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'client',label:"Client / Propriétaire",type:'text',required:true},
      {key:'paysagiste',label:"Paysagiste",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'surface_m2',label:"Surface à aménager (m²)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
      {key:'honoraires',label:"Honoraires et fournitures (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CRÉATION DE JARDIN PAYSAGER</h1><p>Entre <strong>{{client}}</strong> et <strong>{{paysagiste}}</strong> :</p><p><strong>Site :</strong> {{adresse_site}} — {{surface_m2}} m²</p><p><strong>Montant total :</strong> {{honoraires}} FCFA</p><h2>1. Prestations</h2><p>Étude de conception paysagère (plan masse, palette végétale adaptée au climat tropical ivoirien), fourniture et plantation des végétaux, travaux de terrassement et pose des revêtements.</p><h2>2. Garantie de reprise</h2><p>Garantie de reprise des végétaux défaillants pendant 3 mois après plantation.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_parc', name: "Accord de service de création de parc urbain", category: 'agro_environnement', price: 8000, priceMax: 30000,
    description: "Accord de service pour la conception et la création d'un parc urbain public ou privé.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'commanditaire',label:"Commanditaire",type:'text',required:true},
      {key:'paysagiste',label:"Paysagiste",type:'text',required:true},
      {key:'denomination_parc',label:"Dénomination du parc",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie (ha)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CRÉATION DE PARC URBAIN</h1><p>Entre <strong>{{commanditaire}}</strong> et <strong>{{paysagiste}}</strong> :</p><p><strong>Parc :</strong> {{denomination_parc}} — {{superficie_ha}} ha</p><p><strong>Date de démarrage :</strong> {{date_debut}}</p><h2>1. Études et conception</h2><p>Diagnostic écologique et paysager, programme fonctionnel, plan d'aménagement paysager, dossier de consultation des entreprises.</p><h2>2. Exécution</h2><p>Travaux de terrassement, plantation d'espèces locales et exotiques adaptées, mobiliers urbains, cheminements et éclairage.</p><h2>3. Livraison et entretien</h2><p>Réception des travaux et plan de gestion écologique du parc.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_toiture', name: "Accord de service d'aménagement de toiture terrasse verte", category: 'agro_environnement', price: 5000, priceMax: 16000,
    description: "Accord de service pour la conception et la réalisation d'une toiture terrasse végétalisée (toit vert).", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'proprietaire',label:"Propriétaire / Maître d'ouvrage",type:'text',required:true},
      {key:'paysagiste',label:"Paysagiste",type:'text',required:true},
      {key:'adresse_batiment',label:"Adresse du bâtiment",type:'text',required:true},
      {key:'surface_terrasse',label:"Surface de la terrasse (m²)",type:'text',required:true},
      {key:'date_travaux',label:"Date prévue des travaux",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TOITURE TERRASSE VERTE</h1><p>Entre <strong>{{proprietaire}}</strong> et <strong>{{paysagiste}}</strong> :</p><p><strong>Bâtiment :</strong> {{adresse_batiment}}</p><p><strong>Surface :</strong> {{surface_terrasse}} m²</p><p><strong>Date de travaux :</strong> {{date_travaux}}</p><h2>1. Prestations</h2><p>Étude de charge structurelle, choix du système végétatif (extensif ou intensif), fourniture et pose des couches drainantes, substrat et végétaux, système d'arrosage.</p><h2>2. Garantie étanchéité</h2><p>Coordination avec l'étancheur pour garantie de non-perforation.</p><p>Fait à Abidjan, le {{date_travaux}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_vertical', name: "Accord de service de création de jardin suspendu (vertical)", category: 'agro_environnement', price: 4000, priceMax: 14000,
    description: "Accord de service pour la conception et la pose d'un mur végétal ou jardin vertical.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'paysagiste',label:"Paysagiste spécialisé",type:'text',required:true},
      {key:'localisation_mur',label:"Localisation du mur végétal",type:'text',required:true},
      {key:'dimensions',label:"Dimensions (largeur x hauteur en m)",type:'text',required:true},
      {key:'date_pose',label:"Date prévue de pose",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — JARDIN SUSPENDU / MUR VÉGÉTAL</h1><p>Entre <strong>{{client}}</strong> et <strong>{{paysagiste}}</strong> :</p><p><strong>Localisation :</strong> {{localisation_mur}}</p><p><strong>Dimensions :</strong> {{dimensions}} m</p><p><strong>Date de pose :</strong> {{date_pose}}</p><h2>1. Système végétal</h2><p>Fourniture et installation du support de structure, feutres de culture, système d'irrigation goutte-à-goutte automatique et palette végétale adaptée au climat tropical ivoirien.</p><h2>2. Maintenance</h2><p>Formation du client à l'entretien courant et visite de suivi incluse.</p><p>Fait à Abidjan, le {{date_pose}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_verger', name: "Accord de service de création de verger urbain", category: 'agro_environnement', price: 3500, priceMax: 11000,
    description: "Accord de service pour la création d'un verger urbain productif en contexte tropical ivoirien.", templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'paysagiste',label:"Paysagiste / Agronome",type:'text',required:true},
      {key:'adresse_verger',label:"Adresse du verger",type:'text',required:true},
      {key:'surface_m2',label:"Surface (m²)",type:'text',required:true},
      {key:'date_plantation',label:"Date de plantation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CRÉATION DE VERGER URBAIN</h1><p>Entre <strong>{{client}}</strong> et <strong>{{paysagiste}}</strong> :</p><p><strong>Site :</strong> {{adresse_verger}} — {{surface_m2}} m²</p><p><strong>Date de plantation :</strong> {{date_plantation}}</p><h2>1. Conception</h2><p>Plan de masse du verger, sélection d'espèces fruitières tropicales (manguiers, avocatiers, bananiers, agrumes, papayers), organisation de la plantation et du sol.</p><h2>2. Travaux</h2><p>Préparation du sol, trous de plantation, apport d'amendements, plantation et arrosage d'installation.</p><h2>3. Suivi</h2><p>Visite de suivi à 30 et 90 jours après plantation.</p><p>Fait à Abidjan, le {{date_plantation}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_potager', name: "Accord de service de création de potager urbain", category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Accord de service pour la conception et la mise en place d'un potager urbain en Côte d'Ivoire.", templateType: 'pdf', classe: 'C', active: true, popularity: 64,
    fieldsJson: F([
      {key:'client',label:"Client / Association",type:'text',required:true},
      {key:'prestataire',label:"Prestataire paysagiste",type:'text',required:true},
      {key:'adresse_potager',label:"Adresse du potager",type:'text',required:true},
      {key:'surface_m2',label:"Surface des parcelles (m²)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CRÉATION DE POTAGER URBAIN</h1><p>Entre <strong>{{client}}</strong> et <strong>{{prestataire}}</strong> :</p><p><strong>Potager :</strong> {{adresse_potager}} — {{surface_m2}} m²</p><p><strong>Démarrage :</strong> {{date_debut}}</p><h2>1. Prestations</h2><p>Planification des cultures (légumes tropicaux : tomates, aubergines, gombo, piments, laitues), préparation des carrés potagers, fourniture des plants et semences, mise en place d'un système d'arrosage.</p><h2>2. Formation</h2><p>Initiation des bénéficiaires à la culture maraîchère en milieu urbain.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_reboisement', name: "Accord de service de plantation et reboisement urbain", category: 'agro_environnement', price: 4000, priceMax: 14000,
    description: "Accord de service pour les opérations de plantation et de reboisement en milieu urbain ou périurbain.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'commanditaire',label:"Commanditaire",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'zone_reboisement',label:"Zone de reboisement",type:'text',required:true},
      {key:'nb_arbres',label:"Nombre d'arbres à planter",type:'text',required:true},
      {key:'date_plantation',label:"Date prévue de plantation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PLANTATION ET REBOISEMENT URBAIN</h1><p>Entre <strong>{{commanditaire}}</strong> et <strong>{{prestataire}}</strong> :</p><p><strong>Zone :</strong> {{zone_reboisement}}</p><p><strong>Nombre d'arbres :</strong> {{nb_arbres}}</p><p><strong>Date :</strong> {{date_plantation}}</p><h2>1. Espèces</h2><p>Plantation d'essences locales à croissance rapide adaptées au contexte climatique ivoirien (Teck, Fraké, Acacia, espèces fruitières locales).</p><h2>2. Suivi pendant 1 an</h2><p>Arrosage d'installation, contrôle de reprise, remplacement des plants défaillants pendant 6 mois.</p><p>Fait à Abidjan, le {{date_plantation}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_entretien', name: "Accord de service d'entretien d'espaces verts (marché commune)", category: 'agro_environnement', price: 4000, priceMax: 14000,
    description: "Marché d'entretien des espaces verts pour une commune ou une collectivité ivoirienne.", templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'collectivite',label:"Collectivité / Mairie",type:'text',required:true},
      {key:'prestataire',label:"Prestataire espaces verts",type:'text',required:true},
      {key:'perimetre',label:"Périmètre des espaces verts",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du marché",type:'date',required:true},
      {key:'montant_annuel',label:"Montant annuel du marché (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>MARCHÉ D'ENTRETIEN DES ESPACES VERTS</h1><p>Entre <strong>{{collectivite}}</strong> et <strong>{{prestataire}}</strong> :</p><p><strong>Périmètre :</strong> {{perimetre}}</p><p><strong>Montant annuel :</strong> {{montant_annuel}} FCFA</p><h2>1. Prestations d'entretien</h2><p>Tonte des pelouses, taille des haies et arbustes, désherbage, arrosage, balayage des allées, ramassage des déchets verts, entretien du mobilier végétal.</p><h2>2. Fréquence</h2><p>Interventions bi-hebdomadaires sauf saison sèche (hebdomadaires).</p><h2>3. Rapport mensuel</h2><p>Remise d'un rapport mensuel d'intervention à la collectivité.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_tonte', name: "Accord de service de tonte et taille (espaces verts)", category: 'agro_environnement', price: 3000, priceMax: 8000,
    description: "Accord de service spécifique pour les opérations de tonte et de taille d'espaces verts.", templateType: 'pdf', classe: 'C', active: true, popularity: 69,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'surface_tondue',label:"Surface à tondre (m²)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TONTE ET TAILLE ESPACES VERTS</h1><p>Entre <strong>{{client}}</strong> et <strong>{{prestataire}}</strong> :</p><p><strong>Site :</strong> {{adresse_site}} — {{surface_tondue}} m²</p><p><strong>Démarrage :</strong> {{date_debut}}</p><h2>1. Tonte</h2><p>Tonte régulière des pelouses à la hauteur convenue (5 cm), ramassage et évacuation des déchets verts.</p><h2>2. Taille</h2><p>Taille en forme des haies, des arbustes d'ornement et des massifs selon la saison.</p><h2>3. Périodicité</h2><p>Selon planning défini entre les parties, avec rapport d'intervention signé à chaque passage.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_arrosage', name: "Accord de service d'arrosage automatique espaces verts", category: 'agro_environnement', price: 4000, priceMax: 14000,
    description: "Accord de service pour l'étude, la fourniture et la pose d'un système d'arrosage automatique.", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'prestataire',label:"Installateur",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'surface_arrosee',label:"Surface à arroser (m²)",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ARROSAGE AUTOMATIQUE ESPACES VERTS</h1><p>Entre <strong>{{client}}</strong> et <strong>{{prestataire}}</strong> :</p><p><strong>Site :</strong> {{adresse_site}} — {{surface_arrosee}} m²</p><p><strong>Date d'installation :</strong> {{date_installation}}</p><h2>1. Prestations</h2><p>Étude hydraulique, fourniture et pose de canalisations, arroseurs (pop-up, gouteurs), programmateur électronique et point de raccordement eau.</p><h2>2. Mise en service</h2><p>Réglage du programmateur et formation du client à l'utilisation du système.</p><h2>3. Garantie</h2><p>Garantie pièces et main-d'oeuvre pendant 12 mois.</p><p>Fait à Abidjan, le {{date_installation}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_piscine', name: "Accord de service de piscine et fontaine décorative", category: 'agro_environnement', price: 5000, priceMax: 18000,
    description: "Accord de service pour la conception et la réalisation d'une piscine ou fontaine décorative intégrée à l'espace paysager.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'prestataire',label:"Pisciniste / Paysagiste",type:'text',required:true},
      {key:'type_ouvrage',label:"Type d'ouvrage (piscine, bassin, fontaine)",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PISCINE ET FONTAINE DÉCORATIVE</h1><p>Entre <strong>{{client}}</strong> et <strong>{{prestataire}}</strong> :</p><p><strong>Ouvrage :</strong> {{type_ouvrage}}</p><p><strong>Site :</strong> {{adresse_site}}</p><p><strong>Démarrage :</strong> {{date_debut}}</p><h2>1. Conception et réalisation</h2><p>Plans et coupes de l'ouvrage, structure béton ou coque, revêtement, système de filtration et traitement de l'eau, éclairage subaquatique et intégration paysagère.</p><h2>2. Mise en eau et formation</h2><p>Mise en eau, équilibrage de la chimie de l'eau et formation à l'entretien courant.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_parefeu', name: "Accord de service de création de pare-feu végétal", category: 'agro_environnement', price: 3500, priceMax: 11000,
    description: "Accord de service pour la création d'une bande pare-feu végétale protégeant les habitations ou plantations.", templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'commanditaire',label:"Commanditaire",type:'text',required:true},
      {key:'prestataire',label:"Prestataire",type:'text',required:true},
      {key:'localisation',label:"Localisation de la bande pare-feu",type:'text',required:true},
      {key:'longueur_m',label:"Longueur de la bande (m)",type:'text',required:true},
      {key:'date_plantation',label:"Date de plantation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PARE-FEU VÉGÉTAL</h1><p>Entre <strong>{{commanditaire}}</strong> et <strong>{{prestataire}}</strong> :</p><p><strong>Localisation :</strong> {{localisation}}</p><p><strong>Longueur :</strong> {{longueur_m}} m</p><p><strong>Date :</strong> {{date_plantation}}</p><h2>1. Conception</h2><p>Sélection d'essences résistantes au feu et peu inflammables adaptées au contexte climatique ivoirien, espacement optimal et gestion de la largeur de la bande.</p><h2>2. Entretien</h2><p>Entretien annuel de la bande pare-feu inclus la première année.</p><p>Fait à Abidjan, le {{date_plantation}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_allee', name: "Accord de service de création d'allée arborée (voirie)", category: 'agro_environnement', price: 4500, priceMax: 15000,
    description: "Accord de service pour la plantation et la création d'une allée arborée le long d'un axe de voirie.", templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'commanditaire',label:"Commanditaire",type:'text',required:true},
      {key:'prestataire',label:"Prestataire paysagiste",type:'text',required:true},
      {key:'axe_voirie',label:"Axe de voirie concerné",type:'text',required:true},
      {key:'nb_arbres',label:"Nombre d'arbres",type:'text',required:true},
      {key:'date_plantation',label:"Date de plantation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ALLÉE ARBORÉE (VOIRIE)</h1><p>Entre <strong>{{commanditaire}}</strong> et <strong>{{prestataire}}</strong> :</p><p><strong>Axe :</strong> {{axe_voirie}}</p><p><strong>Arbres :</strong> {{nb_arbres}}</p><p><strong>Date :</strong> {{date_plantation}}</p><h2>1. Espèces sélectionnées</h2><p>Essences ombragères à fort développement et résistantes à la sécheresse (Ficus, Flamboyants, Terminalia, Khaya) choisies pour leur port et leur ombre.</p><h2>2. Travaux</h2><p>Marquage des emplacements, excavation, apport de terre végétale, plantation, tuteurage, arrosage d'installation et protections physiques.</p><p>Fait à Abidjan, le {{date_plantation}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_ceinture', name: "Accord de service de création de ceinture verte (ville)", category: 'agro_environnement', price: 7000, priceMax: 25000,
    description: "Accord de service pour la conception et la mise en oeuvre d'une ceinture verte périurbaine.", templateType: 'pdf', classe: 'A', active: true, popularity: 54,
    fieldsJson: F([
      {key:'collectivite',label:"Collectivité",type:'text',required:true},
      {key:'bureau_etude',label:"Bureau d'études paysage",type:'text',required:true},
      {key:'perimetre_ville',label:"Périmètre de la ville concernée",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie de la ceinture (ha)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CEINTURE VERTE URBAINE</h1><p>Entre <strong>{{collectivite}}</strong> et <strong>{{bureau_etude}}</strong> :</p><p><strong>Ville :</strong> {{perimetre_ville}} — {{superficie_ha}} ha</p><p><strong>Lancement :</strong> {{date_lancement}}</p><h2>1. Objectifs</h2><p>Création d'une ceinture verte assurant les fonctions de régulation climatique, de biodiversité, de loisirs et de limitation de l'étalement urbain.</p><h2>2. Programme</h2><p>Études d'emprise foncière, plan de gestion, plantation d'essences locales, aménagement de chemins de promenade, mesures de protection et gestion communautaire.</p><p>Fait à Abidjan, le {{date_lancement}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_biodiversite', name: "Accord de service de biodiversité en ville (habitat faune)", category: 'agro_environnement', price: 4000, priceMax: 13000,
    description: "Accord de service pour la création de micro-habitats favorables à la faune et à la biodiversité en milieu urbain.", templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'commanditaire',label:"Commanditaire",type:'text',required:true},
      {key:'ecologue_paysagiste',label:"Écologue / Paysagiste",type:'text',required:true},
      {key:'site',label:"Site d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'budget',label:"Budget (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — BIODIVERSITÉ EN VILLE</h1><p>Entre <strong>{{commanditaire}}</strong> et <strong>{{ecologue_paysagiste}}</strong> :</p><p><strong>Site :</strong> {{site}}</p><p><strong>Budget :</strong> {{budget}} FCFA</p><h2>1. Diagnostic</h2><p>Inventaire faune-flore existante, identification des potentialités du site.</p><h2>2. Aménagements</h2><p>Création de mare, hôtels à insectes, nichoirs à oiseaux, haies multi-strates, jachères fleuries adaptées au contexte tropical ivoirien.</p><h2>3. Suivi</h2><p>Suivi de la faune et de la flore pendant 12 mois et rapport de biodiversité.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_bio', name: "Accord de service de jardin biologique (HQE)", category: 'agro_environnement', price: 4000, priceMax: 13000,
    description: "Accord de service pour la création d'un jardin biologique respectant les principes HQE en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'paysagiste',label:"Paysagiste HQE",type:'text',required:true},
      {key:'adresse_jardin',label:"Adresse du jardin",type:'text',required:true},
      {key:'surface_m2',label:"Surface (m²)",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — JARDIN BIOLOGIQUE (HQE)</h1><p>Entre <strong>{{client}}</strong> et <strong>{{paysagiste}}</strong> :</p><p><strong>Jardin :</strong> {{adresse_jardin}} — {{surface_m2}} m²</p><p><strong>Démarrage :</strong> {{date_debut}}</p><h2>1. Principes HQE appliqués</h2><p>Zéro pesticide et engrais chimique, compostage, récupération des eaux pluviales, utilisation d'espèces locales non invasives, rotation des cultures et association de plantes.</p><h2>2. Certification</h2><p>Suivi et accompagnement vers une labellisation jardins biologiques reconnus.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_phyto', name: "Accord de service de phytoépuration (jardins filtrants)", category: 'agro_environnement', price: 5000, priceMax: 17000,
    description: "Accord de service pour la conception et la réalisation d'un système de phytoépuration (jardin filtrant) des eaux usées.", templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'bureau_etude',label:"Bureau d'études phytoépuration",type:'text',required:true},
      {key:'volume_traite',label:"Volume d'eaux à traiter (m³/jour)",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PHYTOÉPURATION (JARDIN FILTRANT)</h1><p>Entre <strong>{{maitre_ouvrage}}</strong> et <strong>{{bureau_etude}}</strong> :</p><p><strong>Volume traité :</strong> {{volume_traite}} m³/jour</p><p><strong>Site :</strong> {{adresse_site}}</p><p><strong>Démarrage :</strong> {{date_debut}}</p><h2>1. Conception du système</h2><p>Dimensionnement des bassins filtrants, choix des végétaux épurateurs adaptés au climat ivoirien (Cyperus, Phragmites, Typha), substrats filtrants.</p><h2>2. Réalisation</h2><p>Terrassement, étanchéification des bassins, plantation et mise en service.</p><h2>3. Suivi analytique</h2><p>Analyses de la qualité des eaux en sortie pendant 6 mois.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_therapeutique', name: "Accord de service de jardin thérapeutique (hôpital)", category: 'agro_environnement', price: 4500, priceMax: 15000,
    description: "Accord de service pour la création d'un jardin thérapeutique au sein d'un établissement de santé.", templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement de santé",type:'text',required:true},
      {key:'paysagiste',label:"Paysagiste thérapeute",type:'text',required:true},
      {key:'localisation_jardin',label:"Localisation du jardin dans l'établissement",type:'text',required:true},
      {key:'surface_m2',label:"Surface (m²)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — JARDIN THÉRAPEUTIQUE</h1><p>Entre <strong>{{etablissement}}</strong> et <strong>{{paysagiste}}</strong> :</p><p><strong>Localisation :</strong> {{localisation_jardin}} — {{surface_m2}} m²</p><p><strong>Démarrage :</strong> {{date_debut}}</p><h2>1. Conception thérapeutique</h2><p>Jardin sensoriel et apaisant intégrant des essences aromatiques et colorées, cheminements accessibles aux PMR, espaces de repos et de méditation, fontaine et point d'eau.</p><h2>2. Collaboration</h2><p>Travail en collaboration avec l'équipe soignante pour adapter le jardin aux besoins thérapeutiques des patients.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_scolaire', name: "Accord de service de jardin scolaire pédagogique", category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Accord de service pour la création d'un jardin pédagogique au sein d'un établissement scolaire ivoirien.", templateType: 'pdf', classe: 'C', active: true, popularity: 67,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement scolaire",type:'text',required:true},
      {key:'paysagiste',label:"Paysagiste pédagogue",type:'text',required:true},
      {key:'localisation',label:"Localisation dans l'établissement",type:'text',required:true},
      {key:'surface_m2',label:"Surface (m²)",type:'text',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — JARDIN SCOLAIRE PÉDAGOGIQUE</h1><p>Entre <strong>{{etablissement}}</strong> et <strong>{{paysagiste}}</strong> :</p><p><strong>Emplacement :</strong> {{localisation}} — {{surface_m2}} m²</p><p><strong>Date de création :</strong> {{date_creation}}</p><h2>1. Objectifs pédagogiques</h2><p>Sensibilisation des élèves à l'environnement, aux cycles du vivant, à la botanique tropicale et au développement durable.</p><h2>2. Aménagement</h2><p>Carrés de cultures, composteur, mare pédagogique, herbier vivant d'espèces locales ivoiriennes, panneaux pédagogiques.</p><h2>3. Formation des enseignants</h2><p>Atelier de formation inclus pour l'intégration du jardin dans les programmes scolaires.</p><p>Fait à Abidjan, le {{date_creation}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_floral', name: "Accord de service de design floral (événements)", category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Accord de service de conception et de fourniture de décorations florales pour événements (mariages, cérémonies, conférences).", templateType: 'pdf', classe: 'C', active: true, popularity: 73,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'designer_floral',label:"Designer floral",type:'text',required:true},
      {key:'type_evenement',label:"Type d'événement",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'budget_floral',label:"Budget décorations florales (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — DESIGN FLORAL ÉVÉNEMENTIEL</h1><p>Entre <strong>{{client}}</strong> et <strong>{{designer_floral}}</strong> :</p><p><strong>Événement :</strong> {{type_evenement}}</p><p><strong>Date :</strong> {{date_evenement}}</p><p><strong>Budget :</strong> {{budget_floral}} FCFA</p><h2>1. Prestations</h2><p>Conception des décors floraux, fourniture des fleurs fraîches et artificielles, centres de table, arches florales, bouquets, livraison et installation sur site, démontage après événement.</p><h2>2. Acompte</h2><p>Acompte de 50 % à la commande, solde le jour de l'événement.</p><p>Fait à Abidjan, le {{date_evenement}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_gazon_synth', name: "Accord de service de fourniture et pose de gazon synthétique", category: 'agro_environnement', price: 4000, priceMax: 14000,
    description: "Accord de service pour la fourniture et la pose de gazon synthétique sur espaces de loisir, résidentiels ou sportifs.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur / Poseur",type:'text',required:true},
      {key:'adresse_site',label:"Adresse du site",type:'text',required:true},
      {key:'surface_m2',label:"Surface à gazonner (m²)",type:'text',required:true},
      {key:'date_pose',label:"Date prévue de pose",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — GAZON SYNTHÉTIQUE</h1><p>Entre <strong>{{client}}</strong> et <strong>{{fournisseur}}</strong> :</p><p><strong>Site :</strong> {{adresse_site}} — {{surface_m2}} m²</p><p><strong>Date de pose :</strong> {{date_pose}}</p><h2>1. Fournitures</h2><p>Gazon synthétique de qualité certifiée (hauteur de fibres, densité, résistance UV), sous-couche drainante, colle de fixation et joints.</p><h2>2. Pose</h2><p>Préparation du support, pose soignée, sablage et brossage de finition.</p><h2>3. Garantie</h2><p>Garantie fabricant de 5 ans contre la décoloration et la déformation.</p><p>Fait à Abidjan, le {{date_pose}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_terrain_sport', name: "Accord de service de création de terrain de sport naturel (gazon)", category: 'agro_environnement', price: 5000, priceMax: 18000,
    description: "Accord de service pour la création et l'ensemencement d'un terrain de sport à gazon naturel.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'commanditaire',label:"Commanditaire",type:'text',required:true},
      {key:'prestataire',label:"Prestataire gazon",type:'text',required:true},
      {key:'localisation_terrain',label:"Localisation du terrain",type:'text',required:true},
      {key:'dimensions_terrain',label:"Dimensions du terrain (L x l en m)",type:'text',required:true},
      {key:'date_travaux',label:"Date des travaux",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TERRAIN DE SPORT GAZON NATUREL</h1><p>Entre <strong>{{commanditaire}}</strong> et <strong>{{prestataire}}</strong> :</p><p><strong>Terrain :</strong> {{localisation_terrain}} — {{dimensions_terrain}} m</p><p><strong>Travaux :</strong> {{date_travaux}}</p><h2>1. Travaux préparatoires</h2><p>Terrassement et nivellement, drainage (drains perforés), apport de terre végétale de culture de qualité.</p><h2>2. Ensemencement</h2><p>Sélection de semences adaptées aux conditions tropicales (Bermuda grass, Paspalum), ensemencement ou pose de rouleaux de gazon, mise en eau.</p><h2>3. Entretien initial</h2><p>Suivi et entretien pendant 3 mois jusqu'à la première tonte.</p><p>Fait à Abidjan, le {{date_travaux}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_rapport', name: "Rapport de suivi et entretien espaces verts", category: 'agro_environnement', price: 3000, priceMax: 8000,
    description: "Rapport périodique de suivi de l'entretien et de l'état des espaces verts.", templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire espaces verts",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'perimetre_suivi',label:"Périmètre suivi",type:'textarea',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SUIVI ET ENTRETIEN ESPACES VERTS</h1><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Client :</strong> {{client}}</p><p><strong>Périmètre :</strong> {{perimetre_suivi}}</p><p><strong>Période :</strong> {{periode}}</p><p><strong>Date :</strong> {{date_rapport}}</p><h2>1. Interventions réalisées</h2><p>[Détail des interventions de tonte, taille, désherbage, arrosage, traitements phytosanitaires]</p><h2>2. État sanitaire de la végétation</h2><p>[Observations sur la santé des végétaux, présence de ravageurs ou maladies]</p><h2>3. Travaux recommandés</h2><p>[Liste des travaux complémentaires à prévoir]</p><h2>4. Consommation d'eau et d'intrants</h2><p>[Bilan des ressources consommées]</p><p>Signature du prestataire : _____________________</p></div>` },

  {
    code: 'paysag_plan_dev', name: "Plan de développement paysagisme", category: 'agro_environnement', price: 5000, priceMax: 18000,
    description: "Plan stratégique de développement du paysagisme pour une collectivité ou une entreprise en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'organisation',label:"Organisation commanditaire",type:'text',required:true},
      {key:'paysagiste_conseil',label:"Paysagiste conseil",type:'text',required:true},
      {key:'horizon',label:"Horizon du plan (ex: 2030)",type:'text',required:true},
      {key:'date_elaboration',label:"Date d'élaboration",type:'date',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT PAYSAGISME</h1><p><strong>Organisation :</strong> {{organisation}}</p><p><strong>Paysagiste conseil :</strong> {{paysagiste_conseil}}</p><p><strong>Horizon :</strong> {{horizon}}</p><p><strong>Budget prévisionnel :</strong> {{budget_previsionnel}} FCFA</p><h2>1. Diagnostic paysager</h2><p>État des lieux des espaces verts existants, identification des potentialités et des contraintes.</p><h2>2. Vision stratégique</h2><p>Orientations à long terme pour le développement du paysagisme, en cohérence avec les objectifs environnementaux et sociaux.</p><h2>3. Programme d'actions</h2><p>Projets prioritaires, phasage de réalisation, estimation des coûts et plan de financement.</p><h2>4. Gouvernance</h2><p>Organisation de la maîtrise d'ouvrage, partenariats et indicateurs de suivi.</p><p>Approuvé le : {{date_elaboration}}</p><p>Signatures : _____________________</p></div>` },

  {
    code: 'paysag_charte', name: "Charte du paysagiste et des espaces verts durables", category: 'agro_environnement', price: 3000, priceMax: 8000,
    description: "Charte d'engagement déontologique pour les paysagistes et gestionnaires d'espaces verts durables en Afrique de l'Ouest.", templateType: 'pdf', classe: 'C', active: true, popularity: 51,
    fieldsJson: F([
      {key:'signataires',label:"Signataires (noms et organisations)",type:'textarea',required:true},
      {key:'date_charte',label:"Date de signature",type:'date',required:true},
      {key:'lieu_signature',label:"Lieu de signature",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DU PAYSAGISTE ET DES ESPACES VERTS DURABLES</h1><p><strong>Signataires :</strong> {{signataires}}</p><p><strong>Date :</strong> {{date_charte}}</p><p><strong>Lieu :</strong> {{lieu_signature}}</p><h2>Préambule</h2><p>Les signataires s'engagent à exercer leur métier de paysagiste avec le souci constant de la durabilité environnementale, du respect des écosystèmes locaux et de la valorisation des savoirs verts ivoiriens.</p><h2>Engagements</h2><p>1. Privilégier les espèces végétales locales et adaptées au climat tropical.</p><p>2. Réduire au maximum l'usage de produits phytosanitaires chimiques.</p><p>3. Intégrer la gestion économe de l'eau dans chaque projet.</p><p>4. Contribuer à la sensibilisation du public à la biodiversité urbaine.</p><p>5. Respecter les normes déontologiques de la profession en Côte d'Ivoire.</p><p>Signé à {{lieu_signature}}, le {{date_charte}}</p><p>Signatures : _____________________</p></div>` },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 104b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
