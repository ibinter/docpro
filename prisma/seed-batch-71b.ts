import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── TÉLÉMÉDECINE / eSANTÉ (25 templates) ───────────────────────────────────
  {
    code: 'esan_teleconsult', name: "Accord de service de téléconsultation médicale", category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention encadrant la prestation de téléconsultation médicale entre un prestataire de plateforme numérique et un établissement ou praticien de santé, conforme aux exigences OHADA et au cadre réglementaire ivoirien.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_prestataire',label:"Nom du prestataire de plateforme",type:'text',required:true},
      {key:'nom_etablissement',label:"Nom de l'établissement ou du praticien",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true},
      {key:'duree_contrat',label:"Durée du contrat (mois)",type:'text',required:true},
      {key:'tarif_consultation',label:"Tarif par consultation (FCFA)",type:'text',required:true},
      {key:'conditions_particulieres',label:"Conditions particulières",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TÉLÉCONSULTATION MÉDICALE</h1><p>Entre les soussignés :</p><p><strong>Le Prestataire :</strong> {{nom_prestataire}}, ci-après dénommé «&nbsp;le Prestataire&nbsp;»,</p><p><strong>L'Établissement / Le Praticien :</strong> {{nom_etablissement}}, ci-après dénommé «&nbsp;le Client&nbsp;»,</p><p>Il a été convenu ce qui suit :</p><h2>Article 1 – Objet</h2><p>Le présent accord a pour objet de définir les conditions dans lesquelles le Prestataire met à disposition du Client une plateforme numérique de téléconsultation médicale sécurisée.</p><h2>Article 2 – Durée</h2><p>Le présent accord prend effet le {{date_prise_effet}} pour une durée de {{duree_contrat}} mois, renouvelable par tacite reconduction.</p><h2>Article 3 – Tarification</h2><p>Le tarif par consultation est fixé à {{tarif_consultation}} FCFA, révisable d'un commun accord des parties.</p><h2>Article 4 – Conditions particulières</h2><p>{{conditions_particulieres}}</p><h2>Article 5 – Confidentialité et données de santé</h2><p>Les parties s'engagent à respecter la confidentialité des données de santé des patients conformément aux dispositions légales en vigueur en Côte d'Ivoire et aux standards RGPD applicables.</p><h2>Article 6 – Droit applicable</h2><p>Le présent accord est soumis au droit ivoirien et aux textes OHADA applicables. Tout litige sera soumis aux juridictions compétentes d'Abidjan.</p></div>`
  },
  {
    code: 'esan_telesuivi', name: "Accord de service de télésuivi de patient chronique", category: 'sante', price: 5000, priceMax: 14000,
    description: "Convention de télésuivi à distance pour patients atteints de maladies chroniques, définissant les obligations du prestataire numérique et de l'équipe soignante.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'nom_structure_sante',label:"Nom de la structure de santé",type:'text',required:true},
      {key:'pathologies_ciblees',label:"Pathologies ciblées",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'frequence_suivi',label:"Fréquence de suivi (ex. hebdomadaire)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TÉLÉSUIVI DE PATIENT CHRONIQUE</h1><p><strong>Prestataire :</strong> {{nom_prestataire}}</p><p><strong>Structure de santé :</strong> {{nom_structure_sante}}</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les modalités du télésuivi à distance des patients chroniques identifiés par la structure de santé, pour les pathologies suivantes : {{pathologies_ciblees}}.</p><h2>Article 2 – Prise d'effet et fréquence</h2><p>Le service prend effet le {{date_debut}}. La fréquence de suivi convenue est : {{frequence_suivi}}.</p><h2>Article 3 – Obligations du Prestataire</h2><p>Le Prestataire s'engage à fournir une plateforme sécurisée, des outils de collecte de données vitales et un tableau de bord accessible à l'équipe soignante.</p><h2>Article 4 – Obligations de la Structure de santé</h2><p>La structure de santé s'engage à désigner un référent médical, à informer les patients et à recueillir leurs consentements éclairés.</p><h2>Article 5 – Confidentialité</h2><p>Les données de santé sont traitées dans le strict respect de la confidentialité médicale et des lois ivoiriennes en vigueur.</p></div>`
  },
  {
    code: 'esan_teleexpert', name: "Accord de service de télé-expertise médicale", category: 'sante', price: 4500, priceMax: 13000,
    description: "Accord encadrant la télé-expertise entre un médecin requérant et un médecin expert sollicité à distance via une plateforme numérique.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'medecin_requerant',label:"Médecin requérant",type:'text',required:true},
      {key:'medecin_expert',label:"Médecin expert sollicité",type:'text',required:true},
      {key:'specialite_expert',label:"Spécialité de l'expert",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'honoraires_expertise',label:"Honoraires par acte d'expertise (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TÉLÉ-EXPERTISE MÉDICALE</h1><p><strong>Médecin requérant :</strong> {{medecin_requerant}}</p><p><strong>Médecin expert :</strong> {{medecin_expert}} – Spécialité : {{specialite_expert}}</p><h2>Article 1 – Objet</h2><p>Le présent accord organise les conditions de la télé-expertise médicale, permettant au médecin requérant de solliciter l'avis du médecin expert à distance via une plateforme sécurisée.</p><h2>Article 2 – Prise d'effet</h2><p>Le présent accord entre en vigueur à compter du {{date_accord}}.</p><h2>Article 3 – Rémunération</h2><p>Chaque acte de télé-expertise donne lieu au versement de {{honoraires_expertise}} FCFA au médecin expert, selon les modalités convenues entre les parties.</p><h2>Article 4 – Responsabilité</h2><p>Le médecin expert engage sa responsabilité professionnelle dans les limites de son avis d'expertise. Le médecin requérant reste seul responsable de la décision thérapeutique.</p><h2>Article 5 – Droit applicable</h2><p>Accord soumis au droit ivoirien. Juridiction compétente : Abidjan.</p></div>`
  },
  {
    code: 'esan_teleassist', name: "Accord de service de téléassistance médicale", category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de téléassistance médicale d'urgence et de soins à domicile via outils numériques, entre prestataire et structure hospitalière.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prestataire_teleassist',label:"Prestataire de téléassistance",type:'text',required:true},
      {key:'hopital_partenaire',label:"Hôpital ou clinique partenaire",type:'text',required:true},
      {key:'perimetre_intervention',label:"Périmètre géographique d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'niveau_service',label:"Niveau de service (standard/premium)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TÉLÉASSISTANCE MÉDICALE</h1><p><strong>Prestataire :</strong> {{prestataire_teleassist}}</p><p><strong>Partenaire :</strong> {{hopital_partenaire}}</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les conditions de mise en œuvre de la téléassistance médicale dans le périmètre : {{perimetre_intervention}}, à compter du {{date_debut}}.</p><h2>Article 2 – Niveau de service</h2><p>Le niveau de service souscrit est : {{niveau_service}}, incluant la disponibilité 24h/24 et 7j/7 des équipes d'assistance.</p><h2>Article 3 – Obligations des parties</h2><p>Le Prestataire assure la disponibilité technique et humaine. L'hôpital partenaire fournit les protocoles médicaux de référence et les coordonnées des équipes médicales locales.</p><h2>Article 4 – Responsabilités</h2><p>Chaque partie est responsable de ses obligations propres. La responsabilité médicale incombe aux praticiens diplômés intervenant dans le service.</p></div>`
  },
  {
    code: 'esan_carnet_num', name: "Accord de service de carnet de santé numérique", category: 'sante', price: 3500, priceMax: 10000,
    description: "Accord de déploiement d'un carnet de santé numérique individuel, entre un éditeur de solution et un organisme de santé publique ou privé.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'editeur_solution',label:"Éditeur de la solution numérique",type:'text',required:true},
      {key:'organisme_sante',label:"Organisme de santé partenaire",type:'text',required:true},
      {key:'nombre_carnets',label:"Nombre estimé de carnets déployés",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
      {key:'cout_unitaire',label:"Coût unitaire par carnet (FCFA)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CARNET DE SANTÉ NUMÉRIQUE</h1><p><strong>Éditeur :</strong> {{editeur_solution}}</p><p><strong>Organisme :</strong> {{organisme_sante}}</p><h2>Article 1 – Objet</h2><p>Le présent accord a pour objet le déploiement d'un carnet de santé numérique individuel pour {{nombre_carnets}} bénéficiaires, à compter du {{date_lancement}}.</p><h2>Article 2 – Fonctionnalités</h2><p>Le carnet numérique intègre : historique vaccinal, ordonnances, résultats d'analyses, et accès partagé sécurisé avec les professionnels de santé autorisés.</p><h2>Article 3 – Tarification</h2><p>Le coût unitaire par carnet est de {{cout_unitaire}} FCFA, selon les modalités de facturation définies en annexe.</p><h2>Article 4 – Protection des données</h2><p>Les données personnelles de santé sont traitées conformément aux lois ivoiriennes sur la protection des données et aux principes du RGPD.</p></div>`
  },
  {
    code: 'esan_dmp', name: "Accord de service de dossier médical partagé (DMP)", category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de mise en œuvre d'un dossier médical partagé électronique entre plusieurs établissements de santé et un opérateur de plateforme.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'operateur_plateforme',label:"Opérateur de la plateforme DMP",type:'text',required:true},
      {key:'etablissements_participants',label:"Établissements participants",type:'textarea',required:true},
      {key:'date_deploiement',label:"Date de déploiement",type:'date',required:true},
      {key:'modalites_acces',label:"Modalités d'accès et droits des utilisateurs",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DOSSIER MÉDICAL PARTAGÉ (DMP)</h1><p><strong>Opérateur :</strong> {{operateur_plateforme}}</p><p><strong>Établissements participants :</strong> {{etablissements_participants}}</p><h2>Article 1 – Objet</h2><p>Le présent accord organise le déploiement et l'exploitation d'un dossier médical partagé électronique (DMP) à compter du {{date_deploiement}}.</p><h2>Article 2 – Accès et droits</h2><p>{{modalites_acces}}</p><h2>Article 3 – Sécurité</h2><p>L'opérateur garantit la sécurité, l'intégrité et la disponibilité des données conformément aux standards internationaux (ISO 27001) et au cadre légal ivoirien.</p><h2>Article 4 – Gouvernance</h2><p>Un comité de pilotage regroupant les représentants des établissements participants se réunit trimestriellement pour évaluer le fonctionnement du DMP.</p></div>`
  },
  {
    code: 'esan_prescript_elec', name: "Accord de service de prescription électronique", category: 'sante', price: 4000, priceMax: 11000,
    description: "Accord d'intégration d'un système de prescription électronique sécurisé entre un éditeur logiciel et un établissement de soins.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'editeur_logiciel',label:"Éditeur du logiciel de prescription",type:'text',required:true},
      {key:'etablissement_soins',label:"Établissement de soins",type:'text',required:true},
      {key:'nombre_utilisateurs',label:"Nombre d'utilisateurs (prescripteurs)",type:'text',required:true},
      {key:'date_integration',label:"Date d'intégration",type:'date',required:true},
      {key:'tarif_annuel',label:"Tarif annuel d'abonnement (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRESCRIPTION ÉLECTRONIQUE</h1><p><strong>Éditeur :</strong> {{editeur_logiciel}}</p><p><strong>Établissement :</strong> {{etablissement_soins}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur l'intégration et l'exploitation d'un système de prescription électronique sécurisé pour {{nombre_utilisateurs}} prescripteurs, à compter du {{date_integration}}.</p><h2>Article 2 – Tarification</h2><p>L'abonnement annuel est fixé à {{tarif_annuel}} FCFA, payable selon l'échéancier défini en annexe.</p><h2>Article 3 – Conformité</h2><p>Le système respecte les normes de sécurité informatique médicale et les exigences du cadre réglementaire ivoirien sur la prescription médicale.</p><h2>Article 4 – Support</h2><p>L'éditeur garantit un support technique 5j/7, de 8h à 18h, et une maintenance corrective sous 48 heures ouvrables.</p></div>`
  },
  {
    code: 'esan_pharmacie_ligne', name: "Accord de service de pharmacie en ligne (parapharmacie)", category: 'sante', price: 5000, priceMax: 14000,
    description: "Convention encadrant la vente et la livraison de produits de parapharmacie via une plateforme numérique agréée, conforme à la réglementation ivoirienne.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'operateur_plateforme',label:"Opérateur de la plateforme",type:'text',required:true},
      {key:'pharmacie_partenaire',label:"Pharmacie ou grossiste partenaire",type:'text',required:true},
      {key:'categories_produits',label:"Catégories de produits commercialisés",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'commission_plateforme',label:"Commission plateforme (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHARMACIE EN LIGNE (PARAPHARMACIE)</h1><p><strong>Opérateur :</strong> {{operateur_plateforme}}</p><p><strong>Pharmacie/Grossiste :</strong> {{pharmacie_partenaire}}</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les conditions de commercialisation en ligne des produits de parapharmacie suivants : {{categories_produits}}, à compter du {{date_accord}}.</p><h2>Article 2 – Rémunération</h2><p>L'opérateur perçoit une commission de {{commission_plateforme}}% sur chaque vente réalisée via la plateforme.</p><h2>Article 3 – Obligations réglementaires</h2><p>La pharmacie partenaire est seule responsable de la conformité des produits aux normes sanitaires ivoiriennes et de leur stockage dans des conditions adéquates.</p><h2>Article 4 – Livraison</h2><p>Les délais et conditions de livraison sont définis en annexe opérationnelle au présent accord.</p></div>`
  },
  {
    code: 'esan_ia_diagnostic', name: "Accord de service d'intelligence artificielle diagnostique", category: 'sante', price: 8000, priceMax: 25000,
    description: "Convention d'intégration d'une solution d'aide au diagnostic par intelligence artificielle dans un établissement de santé, encadrant les responsabilités et la gouvernance algorithmique.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'fournisseur_ia',label:"Fournisseur de la solution IA",type:'text',required:true},
      {key:'etablissement',label:"Établissement de santé",type:'text',required:true},
      {key:'domaines_diagnostic',label:"Domaines diagnostiques couverts",type:'textarea',required:true},
      {key:'date_mise_en_service',label:"Date de mise en service",type:'date',required:true},
      {key:'cout_annuel',label:"Coût annuel de la licence (FCFA)",type:'text',required:true},
      {key:'clauses_responsabilite',label:"Clauses de responsabilité spécifiques",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INTELLIGENCE ARTIFICIELLE DIAGNOSTIQUE</h1><p><strong>Fournisseur IA :</strong> {{fournisseur_ia}}</p><p><strong>Établissement :</strong> {{etablissement}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur l'intégration d'une solution d'aide au diagnostic par intelligence artificielle couvrant les domaines : {{domaines_diagnostic}}, mise en service le {{date_mise_en_service}}.</p><h2>Article 2 – Responsabilité médicale</h2><p>La solution IA constitue un outil d'aide à la décision. La responsabilité médicale reste intégralement celle du praticien prescripteur. {{clauses_responsabilite}}</p><h2>Article 3 – Gouvernance algorithmique</h2><p>Le fournisseur s'engage à documenter les biais potentiels de l'algorithme, à fournir un registre des modèles utilisés et à assurer la traçabilité des décisions d'aide au diagnostic.</p><h2>Article 4 – Tarification</h2><p>La licence annuelle est de {{cout_annuel}} FCFA, révisable selon les évolutions technologiques.</p></div>`
  },
  {
    code: 'esan_monitoring_iot', name: "Accord de service de monitoring à distance (objets connectés)", category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de déploiement de dispositifs médicaux connectés pour le monitoring à distance de patients, entre un fabricant/intégrateur et un établissement de santé.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'integrateur_iot',label:"Intégrateur de dispositifs connectés",type:'text',required:true},
      {key:'etablissement',label:"Établissement de santé",type:'text',required:true},
      {key:'types_dispositifs',label:"Types de dispositifs déployés",type:'textarea',required:true},
      {key:'nombre_patients',label:"Nombre de patients suivis",type:'text',required:true},
      {key:'date_deploiement',label:"Date de déploiement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MONITORING À DISTANCE (OBJETS CONNECTÉS)</h1><p><strong>Intégrateur IoT :</strong> {{integrateur_iot}}</p><p><strong>Établissement :</strong> {{etablissement}}</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les conditions du déploiement de dispositifs médicaux connectés — {{types_dispositifs}} — pour le monitoring à distance de {{nombre_patients}} patients, à compter du {{date_deploiement}}.</p><h2>Article 2 – Obligations de l'intégrateur</h2><p>L'intégrateur assure l'installation, la maintenance, la mise à jour des dispositifs et la disponibilité de la plateforme de collecte des données à 99,5% minimum.</p><h2>Article 3 – Sécurité des données</h2><p>Les données collectées sont chiffrées en transit et au repos. L'intégrateur ne peut les exploiter à des fins commerciales sans accord écrit préalable de l'établissement.</p><h2>Article 4 – Alertes cliniques</h2><p>Le système déclenche des alertes automatiques transmises à l'équipe soignante en cas de dépassement de seuils cliniques prédéfinis.</p></div>`
  },
  {
    code: 'esan_telechirugie', name: "Accord de service de robot de chirurgie (téléchirurgie)", category: 'sante', price: 12000, priceMax: 40000,
    description: "Convention d'utilisation et de maintenance d'un système robotisé de téléchirurgie, encadrant les responsabilités médicales, techniques et les exigences de certification.", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'fournisseur_robot',label:"Fournisseur du système robotisé",type:'text',required:true},
      {key:'centre_chirurgical',label:"Centre chirurgical utilisateur",type:'text',required:true},
      {key:'certifications_requises',label:"Certifications requises pour les chirurgiens",type:'textarea',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true},
      {key:'cout_location_mensuel',label:"Coût de location mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE ROBOT DE CHIRURGIE (TÉLÉCHIRURGIE)</h1><p><strong>Fournisseur :</strong> {{fournisseur_robot}}</p><p><strong>Centre chirurgical :</strong> {{centre_chirurgical}}</p><h2>Article 1 – Objet</h2><p>Le présent accord encadre l'utilisation, la maintenance et la mise à disposition d'un système robotisé de téléchirurgie au sein du centre chirurgical, à compter du {{date_installation}}.</p><h2>Article 2 – Qualifications requises</h2><p>Seuls les chirurgiens détenant les certifications suivantes sont autorisés à opérer le robot : {{certifications_requises}}.</p><h2>Article 3 – Maintenance</h2><p>Le fournisseur assure la maintenance préventive et curative du robot, avec un délai d'intervention maximal de 4 heures en cas de panne critique.</p><h2>Article 4 – Tarification</h2><p>La location mensuelle est fixée à {{cout_location_mensuel}} FCFA, incluant la maintenance standard.</p><h2>Article 5 – Responsabilité</h2><p>La responsabilité médicale demeure celle du chirurgien. La responsabilité technique incombe au fournisseur pour toute défaillance du système robotisé.</p></div>`
  },
  {
    code: 'esan_imagerie_dist', name: "Accord de service d'imagerie médicale à distance", category: 'sante', price: 5500, priceMax: 16000,
    description: "Convention de téléradiologie et d'imagerie médicale à distance entre un centre d'imagerie et un établissement distant, incluant la transmission et l'interprétation des images.", templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'centre_imagerie',label:"Centre d'imagerie prestataire",type:'text',required:true},
      {key:'etablissement_client',label:"Établissement client",type:'text',required:true},
      {key:'types_examens',label:"Types d'examens couverts",type:'textarea',required:true},
      {key:'delai_rendu',label:"Délai de rendu des résultats (heures)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMAGERIE MÉDICALE À DISTANCE</h1><p><strong>Centre d'imagerie :</strong> {{centre_imagerie}}</p><p><strong>Établissement client :</strong> {{etablissement_client}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la fourniture de prestations d'imagerie médicale à distance (téléradiologie) pour les examens suivants : {{types_examens}}, à compter du {{date_accord}}.</p><h2>Article 2 – Délais</h2><p>Le centre d'imagerie s'engage à remettre les comptes rendus dans un délai de {{delai_rendu}} heures après réception des images.</p><h2>Article 3 – Qualité des images</h2><p>L'établissement client s'engage à transmettre des images conformes aux standards DICOM. Le centre d'imagerie peut refuser les images de qualité insuffisante.</p><h2>Article 4 – Responsabilité</h2><p>L'interprétation des images engage la responsabilité du médecin radiologue du centre d'imagerie, dans les limites de la qualité des images transmises.</p></div>`
  },
  {
    code: 'esan_bio_ligne', name: "Accord de service de biologie médicale en ligne", category: 'sante', price: 4500, priceMax: 13000,
    description: "Convention de service de biologie médicale délocalisée, incluant la collecte d'échantillons, la transmission des résultats et la gestion numérique du dossier biologique.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'laboratoire_prestataire',label:"Laboratoire prestataire",type:'text',required:true},
      {key:'client_prescripteur',label:"Structure prescriptrice (clinique/hôpital)",type:'text',required:true},
      {key:'catalogue_analyses',label:"Catalogue d'analyses proposées",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de service",type:'date',required:true},
      {key:'delai_resultats',label:"Délai de rendu des résultats (heures)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BIOLOGIE MÉDICALE EN LIGNE</h1><p><strong>Laboratoire :</strong> {{laboratoire_prestataire}}</p><p><strong>Structure prescriptrice :</strong> {{client_prescripteur}}</p><h2>Article 1 – Objet</h2><p>Le présent accord organise la réalisation à distance d'analyses biologiques médicales, couvrant : {{catalogue_analyses}}, à compter du {{date_debut}}.</p><h2>Article 2 – Délais de rendu</h2><p>Le laboratoire s'engage à transmettre les résultats dans un délai de {{delai_resultats}} heures après réception des échantillons conformes.</p><h2>Article 3 – Traçabilité</h2><p>Chaque prélèvement est identifié par un code unique. La chaîne de traçabilité est documentée de la collecte à la transmission du résultat.</p><h2>Article 4 – Confidentialité</h2><p>Les résultats sont transmis via une plateforme sécurisée, accessibles uniquement au prescripteur et au patient autorisé.</p></div>`
  },
  {
    code: 'esan_wearable', name: "Accord de service de santé connectée (wearables)", category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention d'intégration de données issues de dispositifs portables connectés (montres, capteurs) dans le parcours de soins d'un patient ou d'un programme de prévention.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'fournisseur_wearables',label:"Fournisseur des dispositifs portables",type:'text',required:true},
      {key:'programme_sante',label:"Programme de santé ou structure partenaire",type:'text',required:true},
      {key:'types_capteurs',label:"Types de capteurs et données collectées",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'consentement_patient',label:"Modalités de consentement du patient",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SANTÉ CONNECTÉE (WEARABLES)</h1><p><strong>Fournisseur :</strong> {{fournisseur_wearables}}</p><p><strong>Programme/Structure :</strong> {{programme_sante}}</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les conditions d'intégration des données issues de dispositifs portables connectés — {{types_capteurs}} — dans le programme de santé partenaire, à compter du {{date_accord}}.</p><h2>Article 2 – Consentement</h2><p>{{consentement_patient}}</p><h2>Article 3 – Exploitation des données</h2><p>Les données collectées sont utilisées exclusivement à des fins de suivi de santé du patient. Toute exploitation à des fins de recherche nécessite un accord séparé et l'anonymisation préalable des données.</p><h2>Article 4 – Sécurité</h2><p>Le fournisseur applique les meilleures pratiques de cybersécurité pour la collecte, le stockage et la transmission des données.</p></div>`
  },
  {
    code: 'esan_sante_commun', name: "Accord de service de plateforme de santé communautaire", category: 'sante', price: 3500, priceMax: 10000,
    description: "Convention de déploiement d'une plateforme numérique de santé communautaire, reliant agents de santé communautaires, patients et structures de soins de premier niveau.", templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'operateur_plateforme',label:"Opérateur de la plateforme",type:'text',required:true},
      {key:'organisme_sante_publi',label:"Organisme de santé publique partenaire",type:'text',required:true},
      {key:'zone_deploiement',label:"Zone géographique de déploiement",type:'text',required:true},
      {key:'nombre_agents',label:"Nombre d'agents de santé communautaires",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PLATEFORME DE SANTÉ COMMUNAUTAIRE</h1><p><strong>Opérateur :</strong> {{operateur_plateforme}}</p><p><strong>Organisme partenaire :</strong> {{organisme_sante_publi}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur le déploiement d'une plateforme numérique de santé communautaire dans la zone : {{zone_deploiement}}, impliquant {{nombre_agents}} agents de santé communautaires, à compter du {{date_lancement}}.</p><h2>Article 2 – Fonctionnalités</h2><p>La plateforme permet la collecte de données épidémiologiques, le suivi des cas référés, la gestion des vaccinations et la communication avec les structures de soins.</p><h2>Article 3 – Formation</h2><p>L'opérateur assure la formation initiale des agents de santé communautaires à l'utilisation de la plateforme, avec des sessions de recyclage semestrielles.</p></div>`
  },
  {
    code: 'esan_rdv_ligne', name: "Accord de service de prise de rendez-vous en ligne", category: 'sante', price: 2500, priceMax: 7000,
    description: "Convention d'intégration d'un module de prise de rendez-vous médicaux en ligne entre un éditeur SaaS et un cabinet médical ou une clinique.", templateType: 'pdf', classe: 'C', active: true, popularity: 75,
    fieldsJson: F([
      {key:'editeur_saas',label:"Éditeur SaaS de la solution",type:'text',required:true},
      {key:'structure_medicale',label:"Cabinet médical ou clinique",type:'text',required:true},
      {key:'nombre_praticiens',label:"Nombre de praticiens concernés",type:'text',required:true},
      {key:'date_integration',label:"Date d'intégration",type:'date',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel d'abonnement (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRISE DE RENDEZ-VOUS EN LIGNE</h1><p><strong>Éditeur SaaS :</strong> {{editeur_saas}}</p><p><strong>Structure médicale :</strong> {{structure_medicale}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la mise à disposition d'un module de prise de rendez-vous médicaux en ligne pour {{nombre_praticiens}} praticiens, à compter du {{date_integration}}.</p><h2>Article 2 – Tarification</h2><p>L'abonnement mensuel est de {{tarif_mensuel}} FCFA, facturé le 1er de chaque mois.</p><h2>Article 3 – Disponibilité</h2><p>L'éditeur garantit une disponibilité de la plateforme de 99% par mois, hors maintenances planifiées notifiées 48h à l'avance.</p><h2>Article 4 – Données patients</h2><p>Les données de rendez-vous appartiennent à la structure médicale. L'éditeur ne les exploite pas à des fins commerciales.</p></div>`
  },
  {
    code: 'esan_soins_infirmier', name: "Accord de service de dossier de soins infirmiers numérique", category: 'sante', price: 4000, priceMax: 11000,
    description: "Convention de déploiement d'un dossier de soins infirmiers numérique dans un établissement hospitalier ou de soins à domicile.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'editeur_dossier',label:"Éditeur du dossier numérique",type:'text',required:true},
      {key:'etablissement',label:"Établissement de soins",type:'text',required:true},
      {key:'nombre_infirmiers',label:"Nombre d'infirmiers utilisateurs",type:'text',required:true},
      {key:'date_deploiement',label:"Date de déploiement",type:'date',required:true},
      {key:'modules_actives',label:"Modules activés (ex. plans de soins, transmissions)",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DOSSIER DE SOINS INFIRMIERS NUMÉRIQUE</h1><p><strong>Éditeur :</strong> {{editeur_dossier}}</p><p><strong>Établissement :</strong> {{etablissement}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur le déploiement d'un dossier de soins infirmiers numérique pour {{nombre_infirmiers}} utilisateurs, à compter du {{date_deploiement}}.</p><h2>Article 2 – Modules activés</h2><p>{{modules_actives}}</p><h2>Article 3 – Interopérabilité</h2><p>Le dossier de soins infirmiers est interopérable avec le dossier médical partagé de l'établissement selon les standards HL7/FHIR.</p><h2>Article 4 – Formation</h2><p>L'éditeur assure une formation initiale de deux jours pour l'ensemble des utilisateurs, ainsi qu'un support téléphonique durant les 6 premiers mois.</p></div>`
  },
  {
    code: 'esan_diabete_num', name: "Accord de service de gestion des maladies chroniques (diabète numérique)", category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de déploiement d'une solution numérique de gestion du diabète, incluant suivi glycémique connecté, éducation thérapeutique digitale et alertes médicales.", templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'editeur_solution',label:"Éditeur de la solution diabète numérique",type:'text',required:true},
      {key:'structure_diabetologie',label:"Service de diabétologie ou centre de santé",type:'text',required:true},
      {key:'nombre_patients',label:"Nombre de patients enrôlés",type:'text',required:true},
      {key:'date_demarrage',label:"Date de démarrage",type:'date',required:true},
      {key:'dispositifs_connectes',label:"Dispositifs connectés utilisés",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DES MALADIES CHRONIQUES (DIABÈTE NUMÉRIQUE)</h1><p><strong>Éditeur :</strong> {{editeur_solution}}</p><p><strong>Structure :</strong> {{structure_diabetologie}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur le déploiement d'une solution numérique de gestion du diabète pour {{nombre_patients}} patients, à compter du {{date_demarrage}}.</p><h2>Article 2 – Dispositifs</h2><p>Les dispositifs connectés utilisés dans le cadre de ce programme sont : {{dispositifs_connectes}}.</p><h2>Article 3 – Éducation thérapeutique</h2><p>La plateforme intègre un module d'éducation thérapeutique interactive personnalisé pour chaque patient, validé par l'équipe médicale de la structure.</p><h2>Article 4 – Alertes</h2><p>Des alertes automatiques sont transmises à l'équipe soignante en cas d'hypoglycémie ou d'hyperglycémie selon des seuils cliniques prédéfinis.</p></div>`
  },
  {
    code: 'esan_coaching_sante', name: "Accord de service de coaching santé digital", category: 'sante', price: 3000, priceMax: 9000,
    description: "Convention de service de coaching santé personnalisé via application mobile ou plateforme web, entre un prestataire et une entreprise ou un particulier.", templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire_coaching',label:"Prestataire de coaching santé",type:'text',required:true},
      {key:'client',label:"Client (entreprise ou particulier)",type:'text',required:true},
      {key:'domaines_coaching',label:"Domaines de coaching (nutrition, activité physique, stress…)",type:'textarea',required:true},
      {key:'duree_programme',label:"Durée du programme (semaines)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COACHING SANTÉ DIGITAL</h1><p><strong>Prestataire :</strong> {{prestataire_coaching}}</p><p><strong>Client :</strong> {{client}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la fourniture d'un programme de coaching santé digital d'une durée de {{duree_programme}} semaines, couvrant les domaines suivants : {{domaines_coaching}}, à compter du {{date_debut}}.</p><h2>Article 2 – Méthode</h2><p>Le coaching est dispensé via une application mobile dédiée, complétée par des séances hebdomadaires de visioconférence avec un coach certifié.</p><h2>Article 3 – Confidentialité</h2><p>Les données de santé et les échanges entre le client et le coach sont strictement confidentiels et ne peuvent être partagés avec des tiers sans accord écrit du client.</p></div>`
  },
  {
    code: 'esan_partenariat_editeur', name: "Accord de partenariat établissement de santé-éditeur logiciel", category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de partenariat stratégique entre un établissement de santé et un éditeur de logiciels médicaux, visant le co-développement et le déploiement de solutions numériques innovantes.", templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'etablissement_sante',label:"Établissement de santé",type:'text',required:true},
      {key:'editeur_logiciel',label:"Éditeur de logiciels médicaux",type:'text',required:true},
      {key:'projets_vises',label:"Projets de développement visés",type:'textarea',required:true},
      {key:'date_partenariat',label:"Date du partenariat",type:'date',required:true},
      {key:'partage_revenus',label:"Modalités de partage des revenus (%)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ÉTABLISSEMENT DE SANTÉ-ÉDITEUR LOGICIEL</h1><p><strong>Établissement :</strong> {{etablissement_sante}}</p><p><strong>Éditeur :</strong> {{editeur_logiciel}}</p><h2>Article 1 – Objet</h2><p>Le présent accord établit un partenariat stratégique visant le co-développement et le déploiement de solutions numériques médicales innovantes, notamment : {{projets_vises}}, à compter du {{date_partenariat}}.</p><h2>Article 2 – Gouvernance</h2><p>Un comité de pilotage paritaire se réunit mensuellement pour valider les orientations, les feuilles de route et les priorités de développement.</p><h2>Article 3 – Propriété intellectuelle</h2><p>Les développements réalisés en commun font l'objet d'une copropriété intellectuelle définie en annexe. Les solutions préexistantes de chaque partie restent leur propriété exclusive.</p><h2>Article 4 – Partage des revenus</h2><p>Les modalités de partage des revenus issus de la commercialisation des solutions co-développées sont : {{partage_revenus}}.</p></div>`
  },
  {
    code: 'esan_cybersec_sante', name: "Accord de service de cybersécurité des données de santé (RGPD santé)", category: 'sante', price: 7000, priceMax: 20000,
    description: "Convention de prestation de cybersécurité dédiée aux systèmes d'information de santé, incluant audit, protection des données médicales et conformité RGPD.", templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'prestataire_cybersec',label:"Prestataire en cybersécurité",type:'text',required:true},
      {key:'etablissement',label:"Établissement de santé client",type:'text',required:true},
      {key:'perimetre_audit',label:"Périmètre d'audit et de protection",type:'textarea',required:true},
      {key:'date_mission',label:"Date de début de mission",type:'date',required:true},
      {key:'budget_annuel',label:"Budget annuel de la prestation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CYBERSÉCURITÉ DES DONNÉES DE SANTÉ (RGPD SANTÉ)</h1><p><strong>Prestataire :</strong> {{prestataire_cybersec}}</p><p><strong>Établissement :</strong> {{etablissement}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la fourniture de services de cybersécurité couvrant : {{perimetre_audit}}, à compter du {{date_mission}}, pour un budget annuel de {{budget_annuel}} FCFA.</p><h2>Article 2 – Prestations incluses</h2><p>Les prestations comprennent : audit de sécurité initial, tests d'intrusion, mise en conformité RGPD, formation des équipes, surveillance continue (SOC) et gestion des incidents de sécurité.</p><h2>Article 3 – Obligations de confidentialité</h2><p>Le prestataire et ses équipes sont soumis à une obligation stricte de confidentialité concernant toutes les données auxquelles ils accèdent dans le cadre de la mission.</p><h2>Article 4 – Rapport</h2><p>Un rapport de sécurité trimestriel est remis à la direction de l'établissement, avec un tableau de bord des risques et des actions correctives.</p></div>`
  },
  {
    code: 'esan_rapport_perf', name: "Rapport de performance plateforme de télémédecine", category: 'sante', price: 3000, priceMax: 8000,
    description: "Modèle de rapport de performance et d'évaluation périodique d'une plateforme de télémédecine, destiné à la direction médicale et aux partenaires institutionnels.", templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_plateforme',label:"Nom de la plateforme",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte par le rapport",type:'text',required:true},
      {key:'nombre_consultations',label:"Nombre de consultations réalisées",type:'text',required:true},
      {key:'taux_disponibilite',label:"Taux de disponibilité de la plateforme (%)",type:'text',required:true},
      {key:'incidents_signales',label:"Incidents signalés et actions correctives",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – PLATEFORME DE TÉLÉMÉDECINE</h1><p><strong>Plateforme :</strong> {{nom_plateforme}}</p><p><strong>Période :</strong> {{periode_rapport}}</p><h2>1. Activité</h2><p>Nombre de consultations réalisées : {{nombre_consultations}}</p><h2>2. Disponibilité</h2><p>Taux de disponibilité de la plateforme : {{taux_disponibilite}}%</p><h2>3. Incidents et actions correctives</h2><p>{{incidents_signales}}</p><h2>4. Indicateurs de satisfaction</h2><p>Les données de satisfaction des patients et des praticiens sont présentées en annexe graphique au présent rapport.</p><h2>5. Perspectives</h2><p>Les recommandations d'amélioration pour la période suivante sont détaillées en section 5 de l'annexe technique.</p></div>`
  },
  {
    code: 'esan_plan_dev', name: "Plan de développement eSanté", category: 'sante', price: 4000, priceMax: 12000,
    description: "Document de planification stratégique pour le déploiement d'un programme eSanté dans une région ou un établissement, incluant objectifs, ressources et indicateurs de succès.", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'porteur_projet',label:"Porteur du projet eSanté",type:'text',required:true},
      {key:'region_cible',label:"Région ou établissement cible",type:'text',required:true},
      {key:'horizon_planification',label:"Horizon de planification (ex. 3 ans)",type:'text',required:true},
      {key:'budget_total',label:"Budget total estimé (FCFA)",type:'text',required:true},
      {key:'axes_strategiques',label:"Axes stratégiques prioritaires",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT ESANTÉ</h1><p><strong>Porteur du projet :</strong> {{porteur_projet}}</p><p><strong>Zone cible :</strong> {{region_cible}}</p><p><strong>Horizon :</strong> {{horizon_planification}}</p><h2>1. Contexte et diagnostic</h2><p>Le présent plan s'inscrit dans la stratégie nationale de transformation numérique de la santé. Il cible {{region_cible}} sur un horizon de {{horizon_planification}}.</p><h2>2. Axes stratégiques</h2><p>{{axes_strategiques}}</p><h2>3. Budget</h2><p>Le budget total estimé est de {{budget_total}} FCFA, réparti entre investissements infrastructurels, développements logiciels et formation des ressources humaines.</p><h2>4. Indicateurs de succès</h2><p>Les indicateurs clés de performance (KPI) sont définis en annexe et feront l'objet d'un suivi semestriel.</p></div>`
  },
  {
    code: 'esan_formation_num', name: "Accord de service de formation en santé numérique", category: 'sante', price: 3500, priceMax: 10000,
    description: "Convention de prestation de formation des professionnels de santé aux outils et pratiques du numérique en santé.", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'structure_cliente',label:"Structure cliente (hôpital, clinique, ministère)",type:'text',required:true},
      {key:'contenu_formation',label:"Contenu et modules de formation",type:'textarea',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN SANTÉ NUMÉRIQUE</h1><p><strong>Organisme de formation :</strong> {{organisme_formation}}</p><p><strong>Structure cliente :</strong> {{structure_cliente}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la dispensation d'une formation en santé numérique à {{nombre_stagiaires}} professionnels de santé, le {{date_formation}}, selon le programme suivant : {{contenu_formation}}.</p><h2>Article 2 – Modalités pédagogiques</h2><p>La formation associe apports théoriques, démonstrations pratiques et mises en situation sur les outils numériques de santé utilisés par la structure cliente.</p><h2>Article 3 – Évaluation</h2><p>Une évaluation des acquis est réalisée en fin de formation. Un certificat de formation est remis à chaque stagiaire ayant satisfait aux critères de validation.</p></div>`
  },
  {
    code: 'esan_charte_ethique', name: "Charte de l'usage éthique des données de santé", category: 'sante', price: 2000, priceMax: 6000,
    description: "Document de référence définissant les principes éthiques encadrant la collecte, l'utilisation et la protection des données de santé au sein d'une organisation.", templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_organisation',label:"Nom de l'organisation",type:'text',required:true},
      {key:'responsable_donnees',label:"Responsable du traitement des données",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques de l'organisation",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'USAGE ÉTHIQUE DES DONNÉES DE SANTÉ</h1><p><strong>Organisation :</strong> {{nom_organisation}}</p><p><strong>Responsable du traitement :</strong> {{responsable_donnees}}</p><p><strong>Date d'adoption :</strong> {{date_adoption}}</p><h2>Préambule</h2><p>{{nom_organisation}} reconnaît que les données de santé sont parmi les données les plus sensibles. La présente charte définit les principes éthiques qui guident leur collecte, leur traitement et leur protection.</p><h2>Principe 1 – Finalité</h2><p>Les données de santé ne sont collectées que pour des finalités médicales légitimes, explicitement définies et communiquées aux patients.</p><h2>Principe 2 – Consentement</h2><p>Le consentement éclairé du patient est recueilli avant toute collecte de données. Il peut être retiré à tout moment.</p><h2>Principe 3 – Minimisation</h2><p>Seules les données strictement nécessaires aux finalités définies sont collectées.</p><h2>Principe 4 – Sécurité</h2><p>Des mesures techniques et organisationnelles appropriées protègent les données contre tout accès non autorisé.</p><h2>Engagements spécifiques</h2><p>{{engagements_specifiques}}</p></div>`
  },

  // ─── BIOTECHNOLOGIE / LABORATOIRES / RECHERCHE MÉDICALE (25 templates) ──────
  {
    code: 'bio2_bio_clinique', name: "Accord de service de laboratoire d'analyses médicales (biologie clinique)", category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de prestation de service de biologie clinique entre un laboratoire agréé et un établissement de soins, définissant le catalogue, les délais et les normes de qualité.", templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'laboratoire',label:"Laboratoire d'analyses médicales",type:'text',required:true},
      {key:'etablissement_client',label:"Établissement de soins client",type:'text',required:true},
      {key:'catalogue_actes',label:"Catalogue des actes de biologie",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'delai_urgence',label:"Délai de rendu pour examens urgents (heures)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LABORATOIRE D'ANALYSES MÉDICALES (BIOLOGIE CLINIQUE)</h1><p><strong>Laboratoire :</strong> {{laboratoire}}</p><p><strong>Établissement client :</strong> {{etablissement_client}}</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les conditions de réalisation des actes de biologie clinique suivants : {{catalogue_actes}}, à compter du {{date_accord}}.</p><h2>Article 2 – Délais</h2><p>Le délai de rendu pour les examens urgents est de {{delai_urgence}} heures. Les examens standards sont rendus dans les délais définis en annexe tarifaire.</p><h2>Article 3 – Qualité</h2><p>Le laboratoire s'engage à maintenir son accréditation et à respecter les bonnes pratiques de laboratoire (BPL) en vigueur.</p><h2>Article 4 – Facturation</h2><p>La facturation est mensuelle, sur la base des actes réalisés, selon la nomenclature tarifaire annexée au présent accord.</p></div>`
  },
  {
    code: 'bio2_anatomo_patho', name: "Accord de service d'anatomopathologie", category: 'sante', price: 5500, priceMax: 16000,
    description: "Convention de prestation de service d'anatomopathologie et de cytologie médicale entre un laboratoire spécialisé et des structures de soins prescriptrices.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'laboratoire_anapath',label:"Laboratoire d'anatomopathologie",type:'text',required:true},
      {key:'structures_prescriptrices',label:"Structures prescriptrices",type:'textarea',required:true},
      {key:'types_examens',label:"Types d'examens (biopsies, cytologies, etc.)",type:'textarea',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'delai_rendu_standard',label:"Délai de rendu standard (jours ouvrés)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ANATOMOPATHOLOGIE</h1><p><strong>Laboratoire :</strong> {{laboratoire_anapath}}</p><p><strong>Structures prescriptrices :</strong> {{structures_prescriptrices}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la réalisation des examens d'anatomopathologie et de cytologie suivants : {{types_examens}}, à compter du {{date_convention}}.</p><h2>Article 2 – Délais</h2><p>Le délai de rendu standard est de {{delai_rendu_standard}} jours ouvrés à compter de la réception des prélèvements conformes.</p><h2>Article 3 – Transport et conditionnement</h2><p>Les modalités de transport et de conditionnement des prélèvements sont définies dans le manuel de prélèvement annexé. La non-conformité des prélèvements dégage la responsabilité du laboratoire.</p></div>`
  },
  {
    code: 'bio2_genomique', name: "Accord de service de génomique et séquençage", category: 'sante', price: 10000, priceMax: 30000,
    description: "Convention de prestation de service de génomique et de séquençage ADN/ARN entre une plateforme de biotechnologie et un partenaire académique ou industriel.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'plateforme_genomique',label:"Plateforme de génomique",type:'text',required:true},
      {key:'partenaire',label:"Partenaire académique ou industriel",type:'text',required:true},
      {key:'types_sequencage',label:"Types de séquençage (WGS, WES, ARNseq, etc.)",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'cout_par_echantillon',label:"Coût par échantillon (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GÉNOMIQUE ET SÉQUENÇAGE</h1><p><strong>Plateforme :</strong> {{plateforme_genomique}}</p><p><strong>Partenaire :</strong> {{partenaire}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la fourniture de services de génomique et de séquençage — {{types_sequencage}} — à compter du {{date_accord}}.</p><h2>Article 2 – Tarification</h2><p>Le coût par échantillon est de {{cout_par_echantillon}} FCFA, selon les conditions définies en annexe technique.</p><h2>Article 3 – Propriété des données</h2><p>Les données de séquençage brutes et les résultats d'analyse appartiennent au partenaire. La plateforme ne peut les utiliser à des fins de publication sans accord écrit préalable.</p><h2>Article 4 – Biosécurité</h2><p>Les matériels biologiques sont manipulés dans le respect des normes biosécurité de niveau 2 ou supérieur selon la nature des échantillons.</p></div>`
  },
  {
    code: 'bio2_banque_tissus', name: "Accord de service de banque de tissus et cellules", category: 'sante', price: 8000, priceMax: 24000,
    description: "Convention d'établissement et d'exploitation d'une banque de tissus et cellules humains, encadrant la collecte, la conservation et la distribution des greffons.", templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'etablissement_banque',label:"Établissement hébergeant la banque",type:'text',required:true},
      {key:'responsable_banque',label:"Responsable médical de la banque",type:'text',required:true},
      {key:'types_tissus',label:"Types de tissus et cellules conservés",type:'textarea',required:true},
      {key:'date_agrement',label:"Date d'agrément ou de création",type:'date',required:true},
      {key:'protocoles_qualite',label:"Référence aux protocoles qualité appliqués",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BANQUE DE TISSUS ET CELLULES</h1><p><strong>Établissement :</strong> {{etablissement_banque}}</p><p><strong>Responsable médical :</strong> {{responsable_banque}}</p><h2>Article 1 – Objet</h2><p>Le présent accord encadre la création et l'exploitation d'une banque de tissus et cellules humains, conservant notamment : {{types_tissus}}, à compter du {{date_agrement}}.</p><h2>Article 2 – Qualité et sécurité</h2><p>{{protocoles_qualite}}</p><p>La banque respecte les directives européennes et les recommandations de l'OMS relatives aux banques de tissus et cellules.</p><h2>Article 3 – Consentement</h2><p>Tout don de tissu ou de cellule est subordonné au consentement libre, éclairé et révocable du donneur ou de ses ayants droit.</p><h2>Article 4 – Traçabilité</h2><p>Un système de traçabilité bidiractionnelle (donneur-receveur) est maintenu conformément aux bonnes pratiques de tissuthèque.</p></div>`
  },
  {
    code: 'bio2_banque_sang', name: "Accord de service de banque de sang (centre de transfusion)", category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de service entre un centre de transfusion sanguine et un établissement de soins, définissant les modalités de fourniture de produits sanguins labiles.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'centre_transfusion',label:"Centre de transfusion sanguine",type:'text',required:true},
      {key:'hopital_client',label:"Hôpital ou clinique client",type:'text',required:true},
      {key:'produits_fournis',label:"Produits sanguins labiles fournis",type:'textarea',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'delai_livraison_urgence',label:"Délai de livraison en urgence (heures)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BANQUE DE SANG (CENTRE DE TRANSFUSION)</h1><p><strong>Centre de transfusion :</strong> {{centre_transfusion}}</p><p><strong>Hôpital client :</strong> {{hopital_client}}</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les conditions de fourniture des produits sanguins labiles suivants : {{produits_fournis}}, à compter du {{date_convention}}.</p><h2>Article 2 – Délais</h2><p>En situation d'urgence vitale, le centre s'engage à livrer les produits sanguins dans un délai de {{delai_livraison_urgence}} heures.</p><h2>Article 3 – Contrôle qualité</h2><p>Tous les produits sanguins sont soumis aux contrôles de qualification biologique du don (QBD) conformément aux réglementations en vigueur en Côte d'Ivoire.</p><h2>Article 4 – Stock tampon</h2><p>L'hôpital client maintient un stock tampon défini en annexe pour faire face aux situations d'urgence.</p></div>`
  },
  {
    code: 'bio2_don_sang', name: "Accord de service de don de sang (convention hôpital-donneur)", category: 'sante', price: 2000, priceMax: 5000,
    description: "Convention encadrant les conditions du don de sang volontaire et bénévole entre un donneur et un centre de collecte hospitalier ou une banque de sang.", templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'centre_collecte',label:"Centre de collecte ou hôpital",type:'text',required:true},
      {key:'responsable_medical',label:"Responsable médical de la collecte",type:'text',required:true},
      {key:'date_collecte',label:"Date de la collecte",type:'date',required:true},
      {key:'conditions_don',label:"Conditions médicales requises pour le don",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE DON DE SANG (HÔPITAL-DONNEUR)</h1><p><strong>Centre de collecte :</strong> {{centre_collecte}}</p><p><strong>Responsable médical :</strong> {{responsable_medical}}</p><p><strong>Date :</strong> {{date_collecte}}</p><h2>Article 1 – Principe</h2><p>Le don de sang est volontaire, anonyme, bénévole et non rémunéré. Le donneur confirme son consentement éclairé par la signature de la présente convention.</p><h2>Article 2 – Conditions médicales</h2><p>{{conditions_don}}</p><p>Un entretien médical pré-don est systématiquement réalisé par le médecin responsable avant tout prélèvement.</p><h2>Article 3 – Utilisation du don</h2><p>Le sang collecté sera utilisé à des fins thérapeutiques au bénéfice de patients en besoin transfusionnel. Il ne peut être utilisé à des fins commerciales.</p></div>`
  },
  {
    code: 'bio2_recherche_biomed', name: "Accord de service de recherche biomédicale (protocole CEC)", category: 'sante', price: 9000, priceMax: 27000,
    description: "Convention de recherche biomédicale impliquant des sujets humains, soumise à l'approbation d'un comité d'éthique, conforme aux bonnes pratiques cliniques internationales.", templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'promoteur_recherche',label:"Promoteur de la recherche",type:'text',required:true},
      {key:'investigateur_principal',label:"Investigateur principal",type:'text',required:true},
      {key:'titre_protocole',label:"Titre du protocole de recherche",type:'text',required:true},
      {key:'date_debut_etude',label:"Date de début de l'étude",type:'date',required:true},
      {key:'reference_cec',label:"Référence d'approbation du Comité d'Éthique",type:'text',required:true},
      {key:'budget_recherche',label:"Budget total de la recherche (FCFA)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECHERCHE BIOMÉDICALE (PROTOCOLE CEC)</h1><p><strong>Promoteur :</strong> {{promoteur_recherche}}</p><p><strong>Investigateur principal :</strong> {{investigateur_principal}}</p><p><strong>Titre du protocole :</strong> {{titre_protocole}}</p><p><strong>Référence CEC :</strong> {{reference_cec}}</p><h2>Article 1 – Objet</h2><p>Le présent accord encadre la mise en œuvre du protocole de recherche biomédicale approuvé par le Comité d'Éthique, à compter du {{date_debut_etude}}.</p><h2>Article 2 – Bonnes pratiques cliniques</h2><p>L'étude est conduite conformément aux Bonnes Pratiques Cliniques (BPC) de l'ICH E6, à la Déclaration d'Helsinki et aux réglementations ivoiriennes applicables.</p><h2>Article 3 – Consentement des participants</h2><p>Un consentement éclairé écrit est obtenu de chaque participant avant toute procédure liée à l'étude.</p><h2>Article 4 – Budget</h2><p>Le budget total de la recherche est de {{budget_recherche}} FCFA, selon l'échéancier financier en annexe.</p></div>`
  },
  {
    code: 'bio2_biobanque', name: "Accord de service de biobanque nationale", category: 'sante', price: 10000, priceMax: 30000,
    description: "Convention d'établissement et de gestion d'une biobanque nationale, définissant les conditions de collecte, de conservation et d'accès aux ressources biologiques.", templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'institution_gestionnaire',label:"Institution gestionnaire de la biobanque",type:'text',required:true},
      {key:'autorite_tutelle',label:"Autorité de tutelle (Ministère/ANRCI)",type:'text',required:true},
      {key:'types_ressources',label:"Types de ressources biologiques conservées",type:'textarea',required:true},
      {key:'date_creation',label:"Date de création officielle",type:'date',required:true},
      {key:'conditions_acces',label:"Conditions d'accès pour les chercheurs",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BIOBANQUE NATIONALE</h1><p><strong>Institution gestionnaire :</strong> {{institution_gestionnaire}}</p><p><strong>Autorité de tutelle :</strong> {{autorite_tutelle}}</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les modalités de création et de gestion d'une biobanque nationale conservant : {{types_ressources}}, créée le {{date_creation}}.</p><h2>Article 2 – Accès aux ressources</h2><p>{{conditions_acces}}</p><h2>Article 3 – Gouvernance</h2><p>Un conseil scientifique indépendant évalue les demandes d'accès aux ressources biologiques. Toute utilisation à des fins commerciales est soumise à un accord de transfert de matériel (MTA) spécifique.</p><h2>Article 4 – Souveraineté biologique</h2><p>Les ressources biologiques nationales ne peuvent être transférées à l'étranger sans autorisation expresse de l'autorité de tutelle.</p></div>`
  },
  {
    code: 'bio2_pcr_infect', name: "Accord de service de diagnostic moléculaire infectieux (PCR)", category: 'sante', price: 5000, priceMax: 14000,
    description: "Convention de prestation de diagnostic moléculaire par PCR pour la détection d'agents infectieux, entre un laboratoire de référence et un établissement de santé.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'labo_reference',label:"Laboratoire de référence PCR",type:'text',required:true},
      {key:'etablissement_client',label:"Établissement de santé client",type:'text',required:true},
      {key:'agents_detectes',label:"Agents infectieux ciblés",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'delai_rendu_pcr',label:"Délai de rendu des résultats PCR (heures)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DIAGNOSTIC MOLÉCULAIRE INFECTIEUX (PCR)</h1><p><strong>Laboratoire :</strong> {{labo_reference}}</p><p><strong>Établissement client :</strong> {{etablissement_client}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la réalisation de diagnostics moléculaires par PCR pour la détection des agents infectieux suivants : {{agents_detectes}}, à compter du {{date_accord}}.</p><h2>Article 2 – Délais</h2><p>Les résultats PCR sont communiqués dans un délai de {{delai_rendu_pcr}} heures après réception des échantillons conformes.</p><h2>Article 3 – Contrôles de qualité</h2><p>Chaque série d'analyses inclut des contrôles positifs et négatifs. Les résultats sont validés par un biologiste médical diplômé.</p><h2>Article 4 – Biosécurité</h2><p>La manipulation des échantillons potentiellement infectieux est réalisée en laboratoire de niveau de biosécurité 2 minimum.</p></div>`
  },
  {
    code: 'bio2_tdr', name: "Accord de service de tests rapides de diagnostic (TDR)", category: 'sante', price: 4000, priceMax: 11000,
    description: "Convention de fourniture et d'utilisation de tests rapides de diagnostic (TDR) dans les structures de soins primaires, encadrant la formation et la gestion des résultats.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'fournisseur_tdr',label:"Fournisseur des TDR",type:'text',required:true},
      {key:'structure_utilisatrice',label:"Structure de soins utilisatrice",type:'text',required:true},
      {key:'pathologies_ciblees',label:"Pathologies ciblées (paludisme, VIH, etc.)",type:'textarea',required:true},
      {key:'quantite_mensuelle',label:"Quantité mensuelle de TDR fournis",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TESTS RAPIDES DE DIAGNOSTIC (TDR)</h1><p><strong>Fournisseur :</strong> {{fournisseur_tdr}}</p><p><strong>Structure utilisatrice :</strong> {{structure_utilisatrice}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la fourniture mensuelle de {{quantite_mensuelle}} tests rapides de diagnostic ciblant : {{pathologies_ciblees}}, à compter du {{date_debut}}.</p><h2>Article 2 – Formation</h2><p>Le fournisseur assure la formation initiale du personnel de la structure utilisatrice à la réalisation et à l'interprétation des TDR.</p><h2>Article 3 – Gestion des résultats</h2><p>Tout résultat positif doit être confirmé selon le protocole national en vigueur et notifié aux autorités sanitaires compétentes si la pathologie est à déclaration obligatoire.</p><h2>Article 4 – Conservation</h2><p>Les TDR sont conservés selon les conditions indiquées par le fabricant. La structure utilisatrice est responsable du maintien de la chaîne du froid.</p></div>`
  },
  {
    code: 'bio2_vaccin_prod', name: "Accord de service de production de vaccins (modèle)", category: 'sante', price: 12000, priceMax: 40000,
    description: "Modèle de convention de production de vaccins entre un organisme de fabrication pharmaceutique et une autorité de santé publique, conforme aux BPF (bonnes pratiques de fabrication).", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'fabricant_vaccin',label:"Fabricant de vaccins",type:'text',required:true},
      {key:'autorite_commande',label:"Autorité de santé publique commanditaire",type:'text',required:true},
      {key:'type_vaccin',label:"Type de vaccin et antigènes ciblés",type:'text',required:true},
      {key:'volume_production',label:"Volume de production (doses)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE VACCINS</h1><p><strong>Fabricant :</strong> {{fabricant_vaccin}}</p><p><strong>Commanditaire :</strong> {{autorite_commande}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la production de {{volume_production}} doses de {{type_vaccin}}, dont la livraison est prévue au {{date_livraison}}.</p><h2>Article 2 – Bonnes pratiques de fabrication</h2><p>La production est réalisée conformément aux Bonnes Pratiques de Fabrication (BPF) de l'OMS et aux exigences de l'autorité de réglementation pharmaceutique nationale.</p><h2>Article 3 – Contrôle qualité</h2><p>Chaque lot de vaccins est soumis à des contrôles qualité rigoureux avant libération. Les certificats d'analyse sont transmis au commanditaire pour chaque lot.</p><h2>Article 4 – Responsabilité</h2><p>Le fabricant est responsable de la conformité des vaccins aux spécifications convenues. La distribution et l'administration relèvent de la responsabilité du commanditaire.</p></div>`
  },
  {
    code: 'bio2_reactifs', name: "Accord de service de production de réactifs de laboratoire", category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de fourniture de réactifs de laboratoire de diagnostic in vitro entre un fabricant et un réseau de laboratoires, encadrant les spécifications, la traçabilité et les conditions de livraison.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'fabricant_reactifs',label:"Fabricant de réactifs",type:'text',required:true},
      {key:'reseau_laboratoires',label:"Réseau de laboratoires clients",type:'text',required:true},
      {key:'catalogue_reactifs',label:"Catalogue de réactifs fournis",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'conditions_stockage',label:"Conditions de stockage requises",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE RÉACTIFS DE LABORATOIRE</h1><p><strong>Fabricant :</strong> {{fabricant_reactifs}}</p><p><strong>Réseau client :</strong> {{reseau_laboratoires}}</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les conditions de fourniture des réactifs de diagnostic in vitro suivants : {{catalogue_reactifs}}, à compter du {{date_accord}}.</p><h2>Article 2 – Spécifications</h2><p>Chaque réactif est fourni avec sa fiche technique, son certificat de conformité et son certificat d'analyse. Les spécifications sont définies en annexe technique.</p><h2>Article 3 – Stockage</h2><p>{{conditions_stockage}}</p><p>Le réseau client est responsable du maintien des conditions de stockage adéquates dès réception des réactifs.</p><h2>Article 4 – Traçabilité</h2><p>Chaque lot de réactifs est identifié par un numéro unique permettant sa traçabilité de la fabrication à l'utilisation.</p></div>`
  },
  {
    code: 'bio2_controle_qual', name: "Accord de service de contrôle qualité laboratoire (COFRAC)", category: 'sante', price: 7000, priceMax: 20000,
    description: "Convention de prestation de service d'évaluation externe de la qualité (EEQ) et de préparation à l'accréditation des laboratoires médicaux, selon les normes ISO 15189.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'organisme_eeq',label:"Organisme d'EEQ ou d'accréditation",type:'text',required:true},
      {key:'laboratoire_candidat',label:"Laboratoire candidat à l'accréditation",type:'text',required:true},
      {key:'norme_visee',label:"Norme visée (ex. ISO 15189:2022)",type:'text',required:true},
      {key:'date_debut_accompagnement',label:"Date de début d'accompagnement",type:'date',required:true},
      {key:'disciplines_auditees',label:"Disciplines auditées",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONTRÔLE QUALITÉ LABORATOIRE</h1><p><strong>Organisme :</strong> {{organisme_eeq}}</p><p><strong>Laboratoire :</strong> {{laboratoire_candidat}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur l'accompagnement du laboratoire vers l'accréditation {{norme_visee}}, à compter du {{date_debut_accompagnement}}, couvrant les disciplines suivantes : {{disciplines_auditees}}.</p><h2>Article 2 – Prestations</h2><p>Les prestations comprennent : audit à blanc, analyse des écarts, plan d'actions correctives, participation aux essais inter-laboratoires (EIL) et préparation à l'audit officiel d'accréditation.</p><h2>Article 3 – Engagement du laboratoire</h2><p>Le laboratoire s'engage à mettre en œuvre les actions correctives dans les délais convenus et à maintenir la disponibilité de son personnel pour les audits.</p></div>`
  },
  {
    code: 'bio2_formation_labo', name: "Accord de service de formation en techniques de laboratoire", category: 'sante', price: 3500, priceMax: 10000,
    description: "Convention de formation continue et initiale des techniciens et biologistes de laboratoire aux techniques d'analyses médicales et de biologie moléculaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'laboratoire_beneficiaire',label:"Laboratoire bénéficiaire",type:'text',required:true},
      {key:'techniques_enseignees',label:"Techniques enseignées",type:'textarea',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'dates_formation',label:"Dates de la formation",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN TECHNIQUES DE LABORATOIRE</h1><p><strong>Organisme :</strong> {{organisme_formation}}</p><p><strong>Laboratoire bénéficiaire :</strong> {{laboratoire_beneficiaire}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la formation de {{nombre_stagiaires}} stagiaires aux techniques suivantes : {{techniques_enseignees}}, du {{dates_formation}}.</p><h2>Article 2 – Programme</h2><p>Le programme détaillé de la formation est joint en annexe pédagogique. Il inclut des travaux pratiques sur équipements réels.</p><h2>Article 3 – Évaluation et certification</h2><p>Une évaluation pratique est organisée en fin de formation. Une attestation de formation est délivrée aux stagiaires ayant satisfait aux critères de validation.</p><h2>Article 4 – Matériel</h2><p>L'organisme de formation fournit le matériel pédagogique. Les consommables de laboratoire sont à la charge du laboratoire bénéficiaire.</p></div>`
  },
  {
    code: 'bio2_hop_univ', name: "Accord de partenariat hôpital-université (recherche clinique)", category: 'sante', price: 8000, priceMax: 24000,
    description: "Convention de partenariat entre un centre hospitalier universitaire (CHU) et une université pour la mise en œuvre de projets de recherche clinique et la formation médicale.", templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'chu_partenaire',label:"Centre hospitalier universitaire (CHU)",type:'text',required:true},
      {key:'universite_partenaire',label:"Université partenaire",type:'text',required:true},
      {key:'axes_recherche',label:"Axes de recherche clinique prioritaires",type:'textarea',required:true},
      {key:'date_partenariat',label:"Date du partenariat",type:'date',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat (années)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT HÔPITAL-UNIVERSITÉ (RECHERCHE CLINIQUE)</h1><p><strong>CHU :</strong> {{chu_partenaire}}</p><p><strong>Université :</strong> {{universite_partenaire}}</p><h2>Article 1 – Objet</h2><p>Le présent accord établit un partenariat de {{duree_partenariat}} ans entre le CHU et l'université pour la conduite de recherches cliniques et la formation médicale, à compter du {{date_partenariat}}.</p><h2>Article 2 – Axes prioritaires</h2><p>{{axes_recherche}}</p><h2>Article 3 – Organisation</h2><p>Un comité scientifique conjoint se réunit semestriellement pour valider les protocoles, allouer les ressources et évaluer les résultats des projets en cours.</p><h2>Article 4 – Propriété intellectuelle</h2><p>Les résultats de recherche sont copropriété des deux institutions selon les modalités définies dans chaque protocole spécifique.</p></div>`
  },
  {
    code: 'bio2_pharmacologie', name: "Accord de service de pharmacologie clinique", category: 'sante', price: 7000, priceMax: 21000,
    description: "Convention de prestation de service de pharmacologie clinique incluant études pharmacocinétiques, interactions médicamenteuses et suivi thérapeutique des médicaments.", templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'service_pharmacologie',label:"Service de pharmacologie clinique",type:'text',required:true},
      {key:'etablissement_client',label:"Établissement de santé ou industrie pharmaceutique",type:'text',required:true},
      {key:'etudes_commandees',label:"Études commandées",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début des études",type:'date',required:true},
      {key:'budget_etudes',label:"Budget des études (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHARMACOLOGIE CLINIQUE</h1><p><strong>Service de pharmacologie :</strong> {{service_pharmacologie}}</p><p><strong>Client :</strong> {{etablissement_client}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la réalisation des études de pharmacologie clinique suivantes : {{etudes_commandees}}, à compter du {{date_debut}}.</p><h2>Article 2 – Budget</h2><p>Le budget total des études est de {{budget_etudes}} FCFA, selon le devis détaillé en annexe financière.</p><h2>Article 3 – Rapports</h2><p>Un rapport intermédiaire est remis au client à mi-parcours de chaque étude. Le rapport final est remis dans les 30 jours suivant la clôture des analyses.</p><h2>Article 4 – Confidentialité</h2><p>Toutes les données et résultats sont strictement confidentiels. Toute publication nécessite l'accord écrit préalable du client.</p></div>`
  },
  {
    code: 'bio2_bioequivalence', name: "Accord de service de bioéquivalence médicamenteuse", category: 'sante', price: 9000, priceMax: 27000,
    description: "Convention d'étude de bioéquivalence entre un médicament générique et son princeps, entre un laboratoire pharmaceutique et un centre de recherche clinique.", templateType: 'pdf', classe: 'A', active: true, popularity: 53,
    fieldsJson: F([
      {key:'laboratoire_pharma',label:"Laboratoire pharmaceutique commanditaire",type:'text',required:true},
      {key:'centre_recherche',label:"Centre de recherche clinique",type:'text',required:true},
      {key:'medicament_generique',label:"Médicament générique étudié (DCI)",type:'text',required:true},
      {key:'medicament_princeps',label:"Médicament de référence (princeps)",type:'text',required:true},
      {key:'date_debut_etude',label:"Date de début de l'étude",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BIOÉQUIVALENCE MÉDICAMENTEUSE</h1><p><strong>Laboratoire commanditaire :</strong> {{laboratoire_pharma}}</p><p><strong>Centre de recherche :</strong> {{centre_recherche}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la réalisation d'une étude de bioéquivalence entre {{medicament_generique}} (générique) et {{medicament_princeps}} (princeps), à compter du {{date_debut_etude}}.</p><h2>Article 2 – Protocole</h2><p>L'étude est réalisée conformément aux lignes directrices de l'OMS et des autorités réglementaires pharmaceutiques nationales relatives aux études de bioéquivalence.</p><h2>Article 3 – BPC</h2><p>L'étude est conduite selon les Bonnes Pratiques Cliniques (BPC) et les Bonnes Pratiques de Laboratoire (BPL). Toutes les données sont archivées pendant 15 ans minimum.</p></div>`
  },
  {
    code: 'bio2_med_trad', name: "Accord de service de recherche en médecine traditionnelle", category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de recherche et de valorisation de la médecine traditionnelle africaine, encadrant la collecte ethnobotanique, les études d'efficacité et la protection du savoir autochtone.", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'institution_recherche',label:"Institution de recherche",type:'text',required:true},
      {key:'communautes_partenaires',label:"Communautés ou tradipraticiens partenaires",type:'textarea',required:true},
      {key:'plantes_etudes',label:"Plantes ou pratiques étudiées",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la recherche",type:'date',required:true},
      {key:'mecanisme_partage_benefices',label:"Mécanisme de partage des bénéfices",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECHERCHE EN MÉDECINE TRADITIONNELLE</h1><p><strong>Institution :</strong> {{institution_recherche}}</p><p><strong>Communautés partenaires :</strong> {{communautes_partenaires}}</p><h2>Article 1 – Objet</h2><p>Le présent accord encadre la recherche scientifique sur les plantes et pratiques de médecine traditionnelle suivantes : {{plantes_etudes}}, à compter du {{date_debut}}.</p><h2>Article 2 – Consentement préalable en connaissance de cause</h2><p>La recherche est conduite avec le consentement préalable, libre et éclairé des communautés détentrices du savoir traditionnel, conformément au Protocole de Nagoya.</p><h2>Article 3 – Partage des bénéfices</h2><p>{{mecanisme_partage_benefices}}</p><h2>Article 4 – Protection du savoir</h2><p>L'institution s'engage à respecter les droits de propriété intellectuelle collective des communautés et à ne pas breveter des connaissances traditionnelles sans leur accord explicite.</p></div>`
  },
  {
    code: 'bio2_bioethique', name: "Accord de service de bioéthique et comité d'éthique", category: 'sante', price: 5000, priceMax: 14000,
    description: "Convention de mise en place et de fonctionnement d'un comité d'éthique institutionnel pour la révision des protocoles de recherche biomédicale.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'institution_hote',label:"Institution hôte du comité d'éthique",type:'text',required:true},
      {key:'composition_comite',label:"Composition du comité (disciplines représentées)",type:'textarea',required:true},
      {key:'date_creation',label:"Date de création du comité",type:'date',required:true},
      {key:'frequence_reunions',label:"Fréquence des réunions",type:'text',required:true},
      {key:'champ_competence',label:"Champ de compétence du comité",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BIOÉTHIQUE ET COMITÉ D'ÉTHIQUE</h1><p><strong>Institution hôte :</strong> {{institution_hote}}</p><h2>Article 1 – Création</h2><p>Le présent accord formalise la création d'un comité d'éthique institutionnel le {{date_creation}}, constitué des experts suivants : {{composition_comite}}.</p><h2>Article 2 – Compétences</h2><p>{{champ_competence}}</p><h2>Article 3 – Fonctionnement</h2><p>Le comité se réunit {{frequence_reunions}} pour examiner les protocoles de recherche soumis. Ses avis sont rendus dans un délai de 30 jours ouvrés.</p><h2>Article 4 – Indépendance</h2><p>Le comité exerce ses fonctions en toute indépendance. Ses membres déclarent tout conflit d'intérêt et se récusent le cas échéant.</p></div>`
  },
  {
    code: 'bio2_biopharma', name: "Accord de service de biopharmacie et formulation", category: 'sante', price: 8000, priceMax: 24000,
    description: "Convention de prestation de service en biopharmacie et développement galénique, entre un laboratoire de formulation pharmaceutique et une entreprise pharmaceutique cliente.", templateType: 'pdf', classe: 'A', active: true, popularity: 56,
    fieldsJson: F([
      {key:'labo_formulation',label:"Laboratoire de biopharmacie et formulation",type:'text',required:true},
      {key:'entreprise_pharma',label:"Entreprise pharmaceutique cliente",type:'text',required:true},
      {key:'molecules_developper',label:"Molécules ou formulations à développer",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du projet",type:'date',required:true},
      {key:'jalons_livraison',label:"Jalons de livraison et livrables",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BIOPHARMACIE ET FORMULATION</h1><p><strong>Laboratoire :</strong> {{labo_formulation}}</p><p><strong>Entreprise cliente :</strong> {{entreprise_pharma}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur le développement galénique et biopharmaceutique des molécules suivantes : {{molecules_developper}}, à compter du {{date_debut}}.</p><h2>Article 2 – Jalons et livrables</h2><p>{{jalons_livraison}}</p><h2>Article 3 – Propriété intellectuelle</h2><p>Les nouvelles formulations développées dans le cadre de ce projet sont la propriété exclusive de l'entreprise cliente. Le laboratoire conserve ses droits sur ses méthodes et savoir-faire préexistants.</p><h2>Article 4 – Confidentialité</h2><p>Le laboratoire s'engage à une confidentialité absolue sur les molécules, données et procédés communiqués par l'entreprise cliente.</p></div>`
  },
  {
    code: 'bio2_rapport_labo', name: "Rapport de performance laboratoire de recherche", category: 'sante', price: 3000, priceMax: 8000,
    description: "Modèle de rapport annuel de performance d'un laboratoire de recherche biomédicale, destiné aux tutelles institutionnelles et aux partenaires financiers.", templateType: 'pdf', classe: 'C', active: true, popularity: 54,
    fieldsJson: F([
      {key:'nom_laboratoire',label:"Nom du laboratoire",type:'text',required:true},
      {key:'directeur',label:"Directeur du laboratoire",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'publications',label:"Nombre de publications scientifiques",type:'text',required:true},
      {key:'financements_obtenus',label:"Financements obtenus (montant et sources)",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – LABORATOIRE DE RECHERCHE</h1><p><strong>Laboratoire :</strong> {{nom_laboratoire}}</p><p><strong>Directeur :</strong> {{directeur}}</p><p><strong>Période :</strong> {{periode}}</p><h2>1. Production scientifique</h2><p>Nombre de publications : {{publications}}. La liste des publications est jointe en annexe bibliographique.</p><h2>2. Financements</h2><p>{{financements_obtenus}}</p><h2>3. Ressources humaines</h2><p>L'effectif du laboratoire, les thèses en cours et les stagiaires accueillis sont détaillés en annexe ressources humaines.</p><h2>4. Perspectives</h2><p>Les projets de recherche pour la période suivante et les demandes de financement en cours d'instruction sont présentés en section 4 de l'annexe scientifique.</p></div>`
  },
  {
    code: 'bio2_plan_biotech', name: "Plan de développement biotechnologie en Afrique", category: 'sante', price: 5000, priceMax: 15000,
    description: "Document de planification stratégique pour le développement d'une capacité biotechnologique nationale ou régionale en Afrique, incluant infrastructures, formations et partenariats.", templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'porteur_plan',label:"Institution porteur du plan",type:'text',required:true},
      {key:'pays_region_cible',label:"Pays ou région cible",type:'text',required:true},
      {key:'horizon',label:"Horizon temporel (ex. 5 ans)",type:'text',required:true},
      {key:'axes_prioritaires',label:"Axes prioritaires de développement",type:'textarea',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT BIOTECHNOLOGIE EN AFRIQUE</h1><p><strong>Porteur :</strong> {{porteur_plan}}</p><p><strong>Zone cible :</strong> {{pays_region_cible}}</p><p><strong>Horizon :</strong> {{horizon}}</p><h2>1. Contexte</h2><p>Le présent plan s'inscrit dans la vision africaine de souveraineté scientifique et de développement des capacités biotechnologiques locales.</p><h2>2. Axes prioritaires</h2><p>{{axes_prioritaires}}</p><h2>3. Budget prévisionnel</h2><p>Le budget total estimé est de {{budget_previsionnel}} FCFA, réparti entre investissements en équipements, formation des ressources humaines, et partenariats internationaux.</p><h2>4. Indicateurs de suivi</h2><p>Des indicateurs de suivi (KPI) sont définis en annexe pour évaluer annuellement la mise en œuvre du plan.</p></div>`
  },
  {
    code: 'bio2_financement_anrci', name: "Accord de financement recherche médicale (ANRCI/IRD)", category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de financement de projets de recherche médicale entre une agence de financement (ANRCI, IRD ou bailleur international) et une équipe de recherche.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'agence_financement',label:"Agence de financement",type:'text',required:true},
      {key:'equipe_recherche',label:"Équipe de recherche bénéficiaire",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet de recherche",type:'text',required:true},
      {key:'montant_subvention',label:"Montant de la subvention (FCFA)",type:'text',required:true},
      {key:'date_debut_financement',label:"Date de début du financement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT RECHERCHE MÉDICALE</h1><p><strong>Agence :</strong> {{agence_financement}}</p><p><strong>Équipe bénéficiaire :</strong> {{equipe_recherche}}</p><p><strong>Projet :</strong> {{titre_projet}}</p><h2>Article 1 – Objet</h2><p>Le présent accord alloue une subvention de {{montant_subvention}} FCFA à l'équipe de recherche pour la mise en œuvre du projet intitulé «&nbsp;{{titre_projet}}&nbsp;», à compter du {{date_debut_financement}}.</p><h2>Article 2 – Utilisation des fonds</h2><p>Les fonds sont utilisés exclusivement pour les dépenses prévues dans le budget annexé. Tout transfert entre postes budgétaires supérieur à 10% requiert l'accord écrit de l'agence.</p><h2>Article 3 – Rapports</h2><p>Des rapports scientifiques et financiers semestriels sont transmis à l'agence. Le rapport final est remis dans les 3 mois suivant la clôture du projet.</p></div>`
  },
  {
    code: 'bio2_pi_biomed', name: "Accord de propriété intellectuelle recherche biomédicale", category: 'sante', price: 8000, priceMax: 25000,
    description: "Convention encadrant la titularité, la gestion et l'exploitation des droits de propriété intellectuelle issus de travaux de recherche biomédicale collaborative.", templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'institution_a',label:"Institution partenaire A",type:'text',required:true},
      {key:'institution_b',label:"Institution partenaire B",type:'text',required:true},
      {key:'objet_recherche',label:"Objet des recherches collaboratives",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'repartition_droits',label:"Répartition des droits de propriété intellectuelle (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROPRIÉTÉ INTELLECTUELLE RECHERCHE BIOMÉDICALE</h1><p><strong>Institution A :</strong> {{institution_a}}</p><p><strong>Institution B :</strong> {{institution_b}}</p><h2>Article 1 – Objet</h2><p>Le présent accord définit la titularité et les modalités d'exploitation des droits de propriété intellectuelle issus des recherches portant sur : {{objet_recherche}}, à compter du {{date_accord}}.</p><h2>Article 2 – Répartition</h2><p>Les droits de propriété intellectuelle sur les résultats communs sont répartis comme suit : {{repartition_droits}}, selon la contribution de chaque institution définie en annexe.</p><h2>Article 3 – Gestion des brevets</h2><p>Les décisions de dépôt de brevets sont prises d'un commun accord. Les frais de dépôt et de maintien sont partagés proportionnellement aux droits détenus.</p><h2>Article 4 – Exploitation commerciale</h2><p>Toute licence accordée à un tiers requiert l'accord écrit des deux institutions. Les redevances sont réparties selon la clé de répartition définie à l'article 2.</p></div>`
  },
  {
    code: 'bio2_charte_ethique_afr', name: "Charte de l'éthique de la recherche biomédicale en Afrique", category: 'sante', price: 2000, priceMax: 6000,
    description: "Document de référence énonçant les principes éthiques fondamentaux encadrant la recherche biomédicale en Afrique subsaharienne, tenant compte des spécificités contextuelles et culturelles.", templateType: 'pdf', classe: 'C', active: true, popularity: 56,
    fieldsJson: F([
      {key:'institution_signataire',label:"Institution signataire",type:'text',required:true},
      {key:'representant_legal',label:"Représentant légal",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques au contexte africain",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ÉTHIQUE DE LA RECHERCHE BIOMÉDICALE EN AFRIQUE</h1><p><strong>Institution :</strong> {{institution_signataire}}</p><p><strong>Représentant légal :</strong> {{representant_legal}}</p><p><strong>Date d'adoption :</strong> {{date_adoption}}</p><h2>Préambule</h2><p>La présente charte affirme l'engagement de {{institution_signataire}} à conduire toute recherche biomédicale dans le respect de la dignité humaine, des droits des participants et des valeurs culturelles africaines.</p><h2>Principe 1 – Équité</h2><p>Les bénéfices de la recherche doivent profiter en priorité aux populations participantes et aux communautés africaines.</p><h2>Principe 2 – Consentement communautaire</h2><p>En complément du consentement individuel, le consentement des leaders communautaires est recherché pour les études impliquant des communautés.</p><h2>Principe 3 – Non-exploitation</h2><p>Les chercheurs s'engagent à ne pas exploiter la vulnérabilité des participants. Des mesures de protection spécifiques sont prévues pour les populations vulnérables.</p><h2>Principe 4 – Renforcement des capacités</h2><p>Tout projet de recherche contribue au renforcement des capacités scientifiques locales par la formation et le transfert de compétences.</p><h2>Engagements spécifiques</h2><p>{{engagements_specifiques}}</p></div>`
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
  console.log(`Batch 71b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
