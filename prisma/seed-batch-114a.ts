import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── Développement logiciel / Digital ──────────────────────────────────────
  {
    code: 'tech_dev_web_react',
    name: "Accord de service de développement d'application web (React/Next.js)",
    category: 'informatique_tech', price: 8000, priceMax: 25000,
    description: "Contrat de prestation pour le développement d'une application web moderne avec React et Next.js, incluant périmètre fonctionnel, livrables et conditions de recette.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'description_projet', label: "Description du projet web", type: 'textarea', required: true },
      { key: 'delai_livraison', label: "Délai de livraison", type: 'text', required: true },
      { key: 'montant', label: "Montant de la prestation (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — DÉVELOPPEMENT APPLICATION WEB (REACT / NEXT.JS)</h1>
<p>Entre <strong>{{prestataire}}</strong> (ci-après « le Prestataire ») et <strong>{{client}}</strong> (ci-après « le Client »), il est convenu ce qui suit :</p>
<h2>Article 1 – Objet</h2>
<p>Le Prestataire s'engage à concevoir et livrer une application web selon la description suivante : {{description_projet}}.</p>
<h2>Article 2 – Technologies</h2>
<p>Le développement sera réalisé avec les technologies React.js et Next.js conformément aux bonnes pratiques du secteur.</p>
<h2>Article 3 – Délais</h2>
<p>Le délai de livraison convenu est : {{delai_livraison}}.</p>
<h2>Article 4 – Prix</h2>
<p>La prestation est facturée pour un montant de {{montant}} FCFA TTC.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Le présent accord est régi par le droit ivoirien et les dispositions de l'Acte Uniforme OHADA relatif aux contrats de prestation de services.</p>
<p>Fait à Abidjan, le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_dev_mobile',
    name: "Accord de service de développement d'application mobile (iOS/Android)",
    category: 'informatique_tech', price: 9000, priceMax: 30000,
    description: "Contrat de prestation pour le développement d'une application mobile native ou cross-platform destinée aux plateformes iOS et Android.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'description_app', label: "Description de l'application mobile", type: 'textarea', required: true },
      { key: 'plateforme', label: "Plateforme cible (iOS, Android, les deux)", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — DÉVELOPPEMENT APPLICATION MOBILE (IOS / ANDROID)</h1>
<p>Entre <strong>{{prestataire}}</strong> (le Prestataire) et <strong>{{client}}</strong> (le Client) :</p>
<h2>Article 1 – Objet</h2>
<p>Développement d'une application mobile pour la plateforme {{plateforme}} : {{description_app}}.</p>
<h2>Article 2 – Livrables</h2>
<p>Le Prestataire livrera le code source, les fichiers de build et la documentation technique.</p>
<h2>Article 3 – Prix</h2>
<p>Montant convenu : {{montant}} FCFA TTC, payable selon l'échéancier annexé.</p>
<h2>Article 4 – Propriété intellectuelle</h2>
<p>À réception du solde, les droits patrimoniaux sur l'application sont cédés au Client conformément à l'Acte Uniforme OHADA sur le droit commercial.</p>
<p>Fait le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_dev_logiciel_mesure',
    name: "Accord de service de développement de logiciel sur mesure (ERP/CRM)",
    category: 'informatique_tech', price: 12000, priceMax: 40000,
    description: "Contrat pour le développement d'un logiciel de gestion personnalisé (ERP ou CRM) adapté aux besoins spécifiques de l'entreprise cliente.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'type_logiciel', label: "Type de logiciel (ERP, CRM, autre)", type: 'text', required: true },
      { key: 'fonctionnalites', label: "Fonctionnalités principales", type: 'textarea', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — DÉVELOPPEMENT LOGICIEL SUR MESURE ({{type_logiciel}})</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Développement d'un logiciel {{type_logiciel}} sur mesure comprenant les fonctionnalités suivantes : {{fonctionnalites}}.</p>
<h2>Article 2 – Méthodologie</h2>
<p>Le projet sera conduit selon une approche agile avec des sprints validés par le Client.</p>
<h2>Article 3 – Recette</h2>
<p>Une phase de tests d'acceptation (UAT) est prévue avant la mise en production.</p>
<h2>Article 4 – Prix</h2>
<p>Montant total : {{montant}} FCFA TTC.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_maintenance_corrective',
    name: "Accord de service de maintenance corrective logiciel",
    category: 'informatique_tech', price: 5000, priceMax: 15000,
    description: "Contrat de maintenance corrective couvrant la correction des anomalies, bugs et dysfonctionnements constatés sur un logiciel en production.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'logiciel_concerne', label: "Logiciel concerné", type: 'text', required: true },
      { key: 'delai_correction', label: "Délai maximal de correction (heures)", type: 'text', required: true },
      { key: 'montant_mensuel', label: "Forfait mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE MAINTENANCE CORRECTIVE LOGICIEL</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Périmètre</h2>
<p>Le présent accord couvre la maintenance corrective du logiciel : <strong>{{logiciel_concerne}}</strong>.</p>
<h2>Article 2 – Niveaux de service</h2>
<p>Les anomalies bloquantes seront traitées sous {{delai_correction}} heures ouvrées suivant leur signalement.</p>
<h2>Article 3 – Prix</h2>
<p>Forfait mensuel : {{montant_mensuel}} FCFA HT.</p>
<p>Contrat prenant effet le {{date_debut}}</p>
</div>`,
  },
  {
    code: 'tech_maintenance_evolutive',
    name: "Accord de service de maintenance évolutive logiciel",
    category: 'informatique_tech', price: 6000, priceMax: 18000,
    description: "Contrat de maintenance évolutive permettant l'ajout de nouvelles fonctionnalités, améliorations et adaptations réglementaires à un logiciel existant.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'logiciel_concerne', label: "Logiciel concerné", type: 'text', required: true },
      { key: 'volume_journees', label: "Volume annuel de jours-homme", type: 'text', required: true },
      { key: 'tarif_journee', label: "Tarif journalier (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE MAINTENANCE ÉVOLUTIVE LOGICIEL</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Maintenance évolutive du logiciel <strong>{{logiciel_concerne}}</strong> incluant nouvelles fonctionnalités et adaptations réglementaires.</p>
<h2>Article 2 – Volume</h2>
<p>Volume convenu : {{volume_journees}} jours-homme par an au tarif de {{tarif_journee}} FCFA/jour.</p>
<h2>Article 3 – Gouvernance</h2>
<p>Un comité de pilotage mensuel valide les priorités d'évolution.</p>
<p>Prise d'effet : {{date_debut}}</p>
</div>`,
  },
  {
    code: 'tech_integration_api',
    name: "Accord de service d'intégration de systèmes (API/middleware)",
    category: 'informatique_tech', price: 7000, priceMax: 22000,
    description: "Contrat de prestation pour l'intégration de systèmes hétérogènes via des API REST/SOAP ou un middleware, permettant l'interopérabilité des applications.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'systemes_a_integrer', label: "Systèmes à intégrer", type: 'textarea', required: true },
      { key: 'type_integration', label: "Type d'intégration (API REST, SOAP, middleware)", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — INTÉGRATION DE SYSTÈMES (API / MIDDLEWARE)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Intégration des systèmes suivants : {{systemes_a_integrer}} via {{type_integration}}.</p>
<h2>Article 2 – Livrables</h2>
<p>Documentation des flux, cartographie des API et tests d'intégration inclus.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_migration_cloud',
    name: "Accord de service de migration de données (legacy vers cloud)",
    category: 'informatique_tech', price: 8000, priceMax: 28000,
    description: "Contrat de prestation pour la migration sécurisée des données et applications d'un système legacy vers une infrastructure cloud.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'systeme_source', label: "Système source (legacy)", type: 'text', required: true },
      { key: 'plateforme_cloud', label: "Plateforme cloud cible (AWS, Azure, GCP)", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_migration', label: "Date prévue de migration", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — MIGRATION DE DONNÉES (LEGACY → CLOUD)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Migration du système <strong>{{systeme_source}}</strong> vers la plateforme cloud <strong>{{plateforme_cloud}}</strong>.</p>
<h2>Article 2 – Plan de migration</h2>
<p>Un plan de bascule (cutover plan) sera soumis au Client 15 jours avant la migration.</p>
<h2>Article 3 – Sécurité et conformité</h2>
<p>La migration respectera les exigences de la Loi ivoirienne sur la protection des données personnelles.</p>
<h2>Article 4 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC. Date prévue : {{date_migration}}.</p>
</div>`,
  },
  {
    code: 'tech_dev_ecommerce',
    name: "Accord de service de développement e-commerce (boutique en ligne)",
    category: 'informatique_tech', price: 7000, priceMax: 20000,
    description: "Contrat pour la création d'une boutique en ligne avec catalogue produits, panier, paiement mobile money (MTN, Orange) et tableau de bord marchand.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client / marchand", type: 'text', required: true },
      { key: 'url_boutique', label: "URL de la boutique", type: 'text', required: true },
      { key: 'modules', label: "Modules inclus (catalogue, paiement, livraison...)", type: 'textarea', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — DÉVELOPPEMENT E-COMMERCE</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Développement de la boutique en ligne <strong>{{url_boutique}}</strong> incluant : {{modules}}.</p>
<h2>Article 2 – Paiements</h2>
<p>Intégration des solutions de paiement mobile money adaptées au marché ivoirien (MTN Money, Orange Money, Wave).</p>
<h2>Article 3 – Formation</h2>
<p>Une session de formation à l'administration de la boutique est incluse.</p>
<h2>Article 4 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_dev_site_vitrine',
    name: "Accord de service de développement de site web vitrine",
    category: 'informatique_tech', price: 4000, priceMax: 12000,
    description: "Contrat pour la création d'un site web institutionnel présentant l'activité, les services et les coordonnées de l'entreprise cliente.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'nombre_pages', label: "Nombre de pages", type: 'text', required: true },
      { key: 'langues', label: "Langues du site", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — DÉVELOPPEMENT SITE WEB VITRINE</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Création d'un site web vitrine de {{nombre_pages}} pages en {{langues}}.</p>
<h2>Article 2 – Référencement</h2>
<p>Une optimisation SEO de base est incluse dans la prestation.</p>
<h2>Article 3 – Hébergement</h2>
<p>L'hébergement et le nom de domaine sont à la charge du Client sauf mention contraire.</p>
<h2>Article 4 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_ux_ui_design',
    name: "Accord de service d'UX/UI design (maquettage)",
    category: 'informatique_tech', price: 5000, priceMax: 15000,
    description: "Contrat de prestation pour la conception de l'expérience utilisateur (UX) et de l'interface graphique (UI) d'une application ou d'un site web.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire / designer", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'produit_digital', label: "Produit digital à designer", type: 'text', required: true },
      { key: 'livrables', label: "Livrables attendus (wireframes, prototypes, design system)", type: 'textarea', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — UX/UI DESIGN (MAQUETTAGE)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Conception UX/UI du produit digital : <strong>{{produit_digital}}</strong>.</p>
<h2>Article 2 – Livrables</h2>
<p>{{livrables}}</p>
<h2>Article 3 – Révisions</h2>
<p>Deux cycles de révision sont inclus. Au-delà, des frais additionnels s'appliquent.</p>
<h2>Article 4 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_test_logiciel_qa',
    name: "Accord de service de test logiciel (QA/UAT)",
    category: 'informatique_tech', price: 5000, priceMax: 16000,
    description: "Contrat de prestation pour les activités de test qualité (QA) et tests d'acceptation utilisateur (UAT) d'un logiciel avant sa mise en production.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire QA", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'logiciel_teste', label: "Logiciel / application à tester", type: 'text', required: true },
      { key: 'types_tests', label: "Types de tests (fonctionnel, performance, sécurité...)", type: 'textarea', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — TEST LOGICIEL (QA / UAT)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Tests qualité de l'application <strong>{{logiciel_teste}}</strong> : {{types_tests}}.</p>
<h2>Article 2 – Livrables</h2>
<p>Rapport de tests, liste des anomalies (bugs) catégorisés par criticité, et certificat de recette.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_code_review_refactoring',
    name: "Accord de service de code review et refactoring",
    category: 'informatique_tech', price: 4000, priceMax: 12000,
    description: "Contrat de prestation pour l'audit du code source existant, l'identification des dettes techniques et la refactorisation du code pour améliorer la maintenabilité.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'codebase', label: "Codebase / langage (Python, PHP, Java...)", type: 'text', required: true },
      { key: 'objectifs', label: "Objectifs du refactoring", type: 'textarea', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — CODE REVIEW ET REFACTORING</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Audit et refactorisation du code source ({{codebase}}) afin de : {{objectifs}}.</p>
<h2>Article 2 – Rapport</h2>
<p>Un rapport de revue de code sera remis au Client avant le début des travaux de refactorisation.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },

  // ── Cybersécurité ─────────────────────────────────────────────────────────
  {
    code: 'tech_pentest_reseau',
    name: "Accord de service de test d'intrusion (pentest réseau)",
    category: 'informatique_tech', price: 10000, priceMax: 35000,
    description: "Contrat autorisant et encadrant la réalisation de tests d'intrusion sur l'infrastructure réseau de l'organisation cliente par un expert certifié.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire (expert pentesteur)", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation cliente", type: 'text', required: true },
      { key: 'perimetre', label: "Périmètre du test (adresses IP, plages réseau)", type: 'textarea', required: true },
      { key: 'type_test', label: "Type de test (boîte noire, grise, blanche)", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_test', label: "Date prévue du test", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — TEST D'INTRUSION RÉSEAU (PENTEST)</h1>
<p>Entre <strong>{{prestataire}}</strong> (Expert en Cybersécurité) et <strong>{{client}}</strong> (Organisation Cliente) :</p>
<h2>Article 1 – Autorisation</h2>
<p>Le Client autorise expressément le Prestataire à effectuer des tests d'intrusion sur le périmètre suivant : {{perimetre}}.</p>
<h2>Article 2 – Méthodologie</h2>
<p>Test de type {{type_test}} selon les référentiels PTES et OWASP.</p>
<h2>Article 3 – Confidentialité</h2>
<p>Les résultats sont strictement confidentiels. Le rapport est remis uniquement au Client.</p>
<h2>Article 4 – Responsabilité</h2>
<p>Le Prestataire ne pourra être tenu responsable des interruptions de service liées aux tests dans le périmètre autorisé.</p>
<h2>Article 5 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC. Date prévue : {{date_test}}.</p>
</div>`,
  },
  {
    code: 'tech_pentest_applicatif',
    name: "Accord de service de pentest applicatif (web app/API)",
    category: 'informatique_tech', price: 9000, priceMax: 28000,
    description: "Contrat encadrant les tests de sécurité offensifs sur les applications web et les API d'une organisation, selon la méthodologie OWASP Top 10.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'applications', label: "Applications/API testées (URLs)", type: 'textarea', required: true },
      { key: 'methode', label: "Méthode (OWASP, SANS, autre)", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_test', label: "Date prévue du pentest", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — PENTEST APPLICATIF (WEB APP / API)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Périmètre</h2>
<p>Tests de sécurité sur : {{applications}} selon la méthodologie {{methode}}.</p>
<h2>Article 2 – Rapport</h2>
<p>Un rapport détaillé (vulnérabilités, criticité CVSS, recommandations) sera remis sous 5 jours ouvrés.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC. Date : {{date_test}}.</p>
</div>`,
  },
  {
    code: 'tech_audit_securite_iso27001',
    name: "Accord de service d'audit de sécurité informatique (ISO 27001)",
    category: 'informatique_tech', price: 10000, priceMax: 32000,
    description: "Contrat pour la réalisation d'un audit de sécurité informatique basé sur la norme ISO 27001, évaluant la maturité du système de management de la sécurité.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du cabinet d'audit", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'perimetre_audit', label: "Périmètre de l'audit", type: 'textarea', required: true },
      { key: 'norme', label: "Norme de référence", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_audit', label: "Date de l'audit", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — AUDIT DE SÉCURITÉ INFORMATIQUE ({{norme}})</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Audit de sécurité selon la norme {{norme}} sur le périmètre : {{perimetre_audit}}.</p>
<h2>Article 2 – Livrables</h2>
<p>Rapport d'audit avec plan de traitement des risques et roadmap de mise en conformité.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC. Date : {{date_audit}}.</p>
</div>`,
  },
  {
    code: 'tech_pca_pra',
    name: "Accord de service de plan de continuité informatique (PCA/PRA)",
    category: 'informatique_tech', price: 8000, priceMax: 25000,
    description: "Contrat pour l'élaboration et la mise en oeuvre d'un Plan de Continuité d'Activité (PCA) et d'un Plan de Reprise d'Activité (PRA) informatique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'systemes_critiques', label: "Systèmes critiques couverts", type: 'textarea', required: true },
      { key: 'rto_rpo', label: "RTO et RPO cibles", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — PLAN DE CONTINUITÉ INFORMATIQUE (PCA/PRA)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Élaboration du PCA/PRA couvrant : {{systemes_critiques}}. Objectifs RTO/RPO : {{rto_rpo}}.</p>
<h2>Article 2 – Livrables</h2>
<p>Documentation PCA/PRA, procédures de bascule, tests de simulation inclus.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_gestion_incidents_siem',
    name: "Accord de service de gestion des incidents de sécurité (SIEM)",
    category: 'informatique_tech', price: 11000, priceMax: 36000,
    description: "Contrat de service managé pour la surveillance, la détection et la gestion des incidents de sécurité via une solution SIEM.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire SIEM", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'perimetre_surveillance', label: "Périmètre de surveillance (serveurs, endpoints...)", type: 'textarea', required: true },
      { key: 'plage_horaire', label: "Plage horaire de surveillance (24/7, heures ouvrées)", type: 'text', required: true },
      { key: 'montant_mensuel', label: "Forfait mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de démarrage", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — GESTION DES INCIDENTS DE SÉCURITÉ (SIEM)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Périmètre</h2>
<p>Surveillance SIEM : {{perimetre_surveillance}} en {{plage_horaire}}.</p>
<h2>Article 2 – Niveaux de réponse</h2>
<p>Les incidents critiques font l'objet d'une alerte immédiate et d'une réponse sous 1 heure.</p>
<h2>Article 3 – Prix</h2>
<p>Forfait mensuel : {{montant_mensuel}} FCFA TTC. Démarrage : {{date_debut}}.</p>
</div>`,
  },
  {
    code: 'tech_formation_cybersecurite',
    name: "Accord de service de formation cybersécurité (sensibilisation)",
    category: 'informatique_tech', price: 4000, priceMax: 12000,
    description: "Contrat pour la réalisation de formations de sensibilisation à la cybersécurité destinées aux collaborateurs d'une organisation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du formateur / organisme", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'public_cible', label: "Public cible et nombre de participants", type: 'text', required: true },
      { key: 'programme', label: "Programme de la formation", type: 'textarea', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_formation', label: "Date de la formation", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — FORMATION CYBERSÉCURITÉ (SENSIBILISATION)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Public et programme</h2>
<p>Formation destinée à : {{public_cible}}. Programme : {{programme}}.</p>
<h2>Article 2 – Attestation</h2>
<p>Une attestation de participation sera remise à chaque participant.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC. Date : {{date_formation}}.</p>
</div>`,
  },
  {
    code: 'tech_conformite_rgpd_ci',
    name: "Accord de service de mise en conformité RGPD/Loi CI (DPO)",
    category: 'informatique_tech', price: 7000, priceMax: 22000,
    description: "Contrat de mission DPO externalisé pour accompagner l'organisation dans sa mise en conformité avec le RGPD et la loi ivoirienne sur la protection des données personnelles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du DPO / cabinet", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'activites_dpo', label: "Activités DPO (registre, DPIA, formation...)", type: 'textarea', required: true },
      { key: 'volume_mensuel', label: "Volume mensuel de jours DPO", type: 'text', required: true },
      { key: 'tarif_mensuel', label: "Tarif mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de mission", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE MISSION DPO EXTERNALISÉ — CONFORMITÉ RGPD / LOI CI</h1>
<p>Entre <strong>{{prestataire}}</strong> (DPO Externalisé) et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Mission</h2>
<p>Mission DPO externalisé incluant : {{activites_dpo}}. Volume : {{volume_mensuel}} jours/mois.</p>
<h2>Article 2 – Cadre légal</h2>
<p>La mission s'inscrit dans le cadre du RGPD et de la loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la protection des données personnelles.</p>
<h2>Article 3 – Prix</h2>
<p>Tarif mensuel : {{tarif_mensuel}} FCFA HT. Démarrage : {{date_debut}}.</p>
</div>`,
  },
  {
    code: 'tech_chiffrement_pki_vpn',
    name: "Accord de service de chiffrement des données (PKI/VPN)",
    category: 'informatique_tech', price: 7000, priceMax: 20000,
    description: "Contrat de mise en place d'une infrastructure de chiffrement (PKI, certificats, VPN d'entreprise) pour sécuriser les communications et les données.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'solution', label: "Solution mise en place (PKI, VPN IPSec, SSL VPN...)", type: 'text', required: true },
      { key: 'perimetre', label: "Périmètre couvert", type: 'textarea', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — CHIFFREMENT DES DONNÉES (PKI / VPN)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Solution</h2>
<p>Déploiement de la solution <strong>{{solution}}</strong> couvrant : {{perimetre}}.</p>
<h2>Article 2 – Documentation</h2>
<p>Documentation technique et procédures de gestion des certificats incluses.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_iam',
    name: "Accord de service de gestion des identités et accès (IAM)",
    category: 'informatique_tech', price: 8000, priceMax: 25000,
    description: "Contrat pour le déploiement et la gestion d'une solution IAM (gestion des identités, authentification forte, contrôle des accès et habilitations).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'solution_iam', label: "Solution IAM (Active Directory, Okta, Keycloak...)", type: 'text', required: true },
      { key: 'nb_utilisateurs', label: "Nombre d'utilisateurs gérés", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — GESTION DES IDENTITÉS ET ACCÈS (IAM)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Déploiement de la solution IAM <strong>{{solution_iam}}</strong> pour {{nb_utilisateurs}} utilisateurs.</p>
<h2>Article 2 – Périmètre</h2>
<p>Authentification, gestion des rôles, SSO et révision des accès trimestrielle.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_soc_manage',
    name: "Accord de service de SOC managé (Security Operations Center)",
    category: 'informatique_tech', price: 12000, priceMax: 40000,
    description: "Contrat de service de SOC managé offrant une surveillance de sécurité 24/7, la détection des menaces et la réponse aux incidents.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire SOC", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation cliente", type: 'text', required: true },
      { key: 'perimetre', label: "Périmètre surveillé", type: 'textarea', required: true },
      { key: 'niveau_service', label: "Niveau de service (Tier 1, 2, 3)", type: 'text', required: true },
      { key: 'montant_mensuel', label: "Forfait mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de démarrage", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — SOC MANAGÉ (SECURITY OPERATIONS CENTER)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Périmètre</h2>
<p>SOC managé {{niveau_service}} couvrant : {{perimetre}}.</p>
<h2>Article 2 – Surveillance</h2>
<p>Surveillance 24/7 avec escalade et notification en cas d'incident de sécurité.</p>
<h2>Article 3 – Rapports</h2>
<p>Rapport mensuel d'activité SOC et tableau de bord de sécurité inclus.</p>
<h2>Article 4 – Prix</h2>
<p>Forfait mensuel : {{montant_mensuel}} FCFA TTC. Démarrage : {{date_debut}}.</p>
</div>`,
  },
  {
    code: 'tech_edr_xdr',
    name: "Accord de service de détection et réponse aux incidents (EDR/XDR)",
    category: 'informatique_tech', price: 9000, priceMax: 28000,
    description: "Contrat pour le déploiement et la gestion d'une solution EDR/XDR de détection et réponse aux incidents de sécurité sur les endpoints et l'ensemble du SI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'solution_edr', label: "Solution EDR/XDR (CrowdStrike, SentinelOne, Microsoft Defender...)", type: 'text', required: true },
      { key: 'nb_endpoints', label: "Nombre d'endpoints couverts", type: 'text', required: true },
      { key: 'montant_annuel', label: "Montant annuel (FCFA)", type: 'text', required: true },
      { key: 'date_deploiement', label: "Date de déploiement", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — DÉTECTION ET RÉPONSE AUX INCIDENTS (EDR/XDR)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Solution</h2>
<p>Déploiement de <strong>{{solution_edr}}</strong> sur {{nb_endpoints}} endpoints.</p>
<h2>Article 2 – Réponse aux incidents</h2>
<p>Le Prestataire assure la containment et la remédiation des incidents détectés.</p>
<h2>Article 3 – Prix</h2>
<p>Montant annuel : {{montant_annuel}} FCFA TTC. Déploiement le : {{date_deploiement}}.</p>
</div>`,
  },
  {
    code: 'tech_recuperation_ransomware',
    name: "Accord de service de récupération après cyberattaque (ransomware)",
    category: 'informatique_tech', price: 10000, priceMax: 35000,
    description: "Contrat d'intervention d'urgence pour la récupération des systèmes et données après une cyberattaque de type ransomware.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire DFIR", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation victime", type: 'text', required: true },
      { key: 'systemes_impactes', label: "Systèmes impactés par l'attaque", type: 'textarea', required: true },
      { key: 'objectif_recovery', label: "Objectif de récupération (RPO/RTO)", type: 'text', required: true },
      { key: 'montant', label: "Montant d'intervention (FCFA)", type: 'text', required: true },
      { key: 'date_intervention', label: "Date d'intervention", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — RÉCUPÉRATION APRÈS CYBERATTAQUE (RANSOMWARE)</h1>
<p>Entre <strong>{{prestataire}}</strong> (Expert DFIR) et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Contexte</h2>
<p>Intervention suite à une cyberattaque sur les systèmes suivants : {{systemes_impactes}}.</p>
<h2>Article 2 – Objectifs</h2>
<p>Récupération des systèmes avec les objectifs : {{objectif_recovery}}.</p>
<h2>Article 3 – Confidentialité</h2>
<p>L'intervention et ses résultats sont soumis à une stricte confidentialité.</p>
<h2>Article 4 – Prix</h2>
<p>Montant : {{montant}} FCFA HT. Date d'intervention : {{date_intervention}}.</p>
</div>`,
  },

  // ── Télécoms / Infrastructure IT ──────────────────────────────────────────
  {
    code: 'tech_reseau_lan_wan',
    name: "Accord de service d'installation réseau d'entreprise (LAN/WAN)",
    category: 'informatique_tech', price: 7000, priceMax: 22000,
    description: "Contrat pour l'installation, la configuration et la mise en service d'un réseau local (LAN) ou étendu (WAN) pour une entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire réseau", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'site_concerne', label: "Site(s) concerné(s)", type: 'text', required: true },
      { key: 'equipements', label: "Équipements fournis (switchs, routeurs, bornes WiFi...)", type: 'textarea', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_installation', label: "Date prévue d'installation", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — INSTALLATION RÉSEAU D'ENTREPRISE (LAN/WAN)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Installation d'un réseau LAN/WAN sur le site : <strong>{{site_concerne}}</strong>. Équipements : {{equipements}}.</p>
<h2>Article 2 – Garantie</h2>
<p>Le Prestataire garantit l'installation pendant 12 mois à compter de la mise en service.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC. Date d'installation : {{date_installation}}.</p>
</div>`,
  },
  {
    code: 'tech_voip',
    name: "Accord de service d'installation VoIP (téléphonie IP)",
    category: 'informatique_tech', price: 6000, priceMax: 18000,
    description: "Contrat pour l'installation et la configuration d'un système de téléphonie sur IP (VoIP) pour une entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'nb_postes', label: "Nombre de postes téléphoniques", type: 'text', required: true },
      { key: 'solution_voip', label: "Solution VoIP (Asterisk, 3CX, Cisco...)", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — INSTALLATION VOIP (TÉLÉPHONIE IP)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Installation de la solution VoIP <strong>{{solution_voip}}</strong> pour {{nb_postes}} postes.</p>
<h2>Article 2 – Formation</h2>
<p>Une formation des utilisateurs et des administrateurs est incluse.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC. Date : {{date_installation}}.</p>
</div>`,
  },
  {
    code: 'tech_mdm_parc',
    name: "Accord de service de gestion parc informatique (MDM)",
    category: 'informatique_tech', price: 5000, priceMax: 15000,
    description: "Contrat pour la gestion du parc informatique mobile (smartphones, tablettes, laptops) via une solution MDM (Mobile Device Management).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire MDM", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'solution_mdm', label: "Solution MDM (Jamf, Intune, MobileIron...)", type: 'text', required: true },
      { key: 'nb_devices', label: "Nombre d'appareils gérés", type: 'text', required: true },
      { key: 'montant_mensuel', label: "Forfait mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — GESTION PARC INFORMATIQUE (MDM)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Périmètre</h2>
<p>Gestion de {{nb_devices}} appareils via la solution <strong>{{solution_mdm}}</strong>.</p>
<h2>Article 2 – Services inclus</h2>
<p>Déploiement applicatif, politique de sécurité, effacement à distance, inventaire matériel.</p>
<h2>Article 3 – Prix</h2>
<p>Forfait mensuel : {{montant_mensuel}} FCFA TTC. Démarrage : {{date_debut}}.</p>
</div>`,
  },
  {
    code: 'tech_infogerance_managed',
    name: "Accord de service d'infogérance IT (managed services)",
    category: 'informatique_tech', price: 8000, priceMax: 28000,
    description: "Contrat d'infogérance complète du système d'information couvrant la supervision, la maintenance et le support des infrastructures IT.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire MSP", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'perimetre_si', label: "Périmètre du SI infogéré", type: 'textarea', required: true },
      { key: 'plage_support', label: "Plage de support (ex : Lu-Ve 8h-18h)", type: 'text', required: true },
      { key: 'montant_mensuel', label: "Forfait mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début du contrat", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD D'INFOGÉRANCE IT (MANAGED SERVICES)</h1>
<p>Entre <strong>{{prestataire}}</strong> (MSP) et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Périmètre</h2>
<p>Infogérance du SI incluant : {{perimetre_si}}.</p>
<h2>Article 2 – Niveaux de service</h2>
<p>Support disponible : {{plage_support}}. Engagement de disponibilité : 99,5% mensuel.</p>
<h2>Article 3 – Prix</h2>
<p>Forfait mensuel : {{montant_mensuel}} FCFA TTC. Démarrage : {{date_debut}}.</p>
</div>`,
  },
  {
    code: 'tech_serveurs_installation',
    name: "Accord de service d'installation et maintenance serveurs",
    category: 'informatique_tech', price: 6000, priceMax: 20000,
    description: "Contrat pour l'installation physique et logicielle de serveurs, et leur maintenance préventive et corrective.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'serveurs', label: "Description des serveurs (marque, modèle, OS)", type: 'textarea', required: true },
      { key: 'localisation', label: "Localisation (salle serveur, datacenter)", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_installation', label: "Date d'installation", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — INSTALLATION ET MAINTENANCE SERVEURS</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Installation et maintenance des serveurs suivants : {{serveurs}} au site : {{localisation}}.</p>
<h2>Article 2 – Maintenance préventive</h2>
<p>Une intervention de maintenance préventive trimestrielle est incluse.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC. Date d'installation : {{date_installation}}.</p>
</div>`,
  },
  {
    code: 'tech_virtualisation',
    name: "Accord de service de virtualisation (VMware/HyperV)",
    category: 'informatique_tech', price: 8000, priceMax: 24000,
    description: "Contrat pour la mise en place d'une infrastructure virtualisée (VMware vSphere, Microsoft HyperV) permettant de consolider les serveurs physiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'solution_virt', label: "Solution de virtualisation (VMware, HyperV, KVM)", type: 'text', required: true },
      { key: 'nb_vm', label: "Nombre de machines virtuelles", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — VIRTUALISATION ({{solution_virt}})</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Déploiement d'une infrastructure virtualisée {{solution_virt}} pour {{nb_vm}} machines virtuelles.</p>
<h2>Article 2 – Livrables</h2>
<p>Documentation d'architecture, procédures d'exploitation et formation administrateur incluses.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_backup_restauration',
    name: "Accord de service de sauvegarde et restauration (backup)",
    category: 'informatique_tech', price: 5000, priceMax: 16000,
    description: "Contrat pour la mise en place et la gestion d'un plan de sauvegarde des données et de restauration (backup 3-2-1) conforme aux bonnes pratiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'donnees_sauvegardees', label: "Données / systèmes sauvegardés", type: 'textarea', required: true },
      { key: 'solution_backup', label: "Solution de backup (Veeam, Commvault, cloud...)", type: 'text', required: true },
      { key: 'montant_mensuel', label: "Forfait mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — SAUVEGARDE ET RESTAURATION (BACKUP)</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Périmètre</h2>
<p>Sauvegarde de : {{donnees_sauvegardees}} via la solution <strong>{{solution_backup}}</strong>.</p>
<h2>Article 2 – Fréquence</h2>
<p>Sauvegardes journalières, hebdomadaires et mensuelles selon la règle 3-2-1.</p>
<h2>Article 3 – Tests de restauration</h2>
<p>Tests de restauration trimestriels inclus avec rapport de résultats.</p>
<h2>Article 4 – Prix</h2>
<p>Forfait mensuel : {{montant_mensuel}} FCFA TTC. Démarrage : {{date_debut}}.</p>
</div>`,
  },
  {
    code: 'tech_helpdesk_support',
    name: "Accord de service de helpdesk et support utilisateurs",
    category: 'informatique_tech', price: 5000, priceMax: 15000,
    description: "Contrat de service helpdesk couvrant le support technique de niveau 1, 2 et 3 pour les utilisateurs de l'organisation cliente.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire helpdesk", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'nb_utilisateurs', label: "Nombre d'utilisateurs supportés", type: 'text', required: true },
      { key: 'canaux_support', label: "Canaux de support (téléphone, email, ticket, chat)", type: 'text', required: true },
      { key: 'montant_mensuel', label: "Forfait mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de démarrage", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — HELPDESK ET SUPPORT UTILISATEURS</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Périmètre</h2>
<p>Support technique pour {{nb_utilisateurs}} utilisateurs via : {{canaux_support}}.</p>
<h2>Article 2 – Niveaux de service</h2>
<p>Tickets de priorité critique : réponse sous 1h. Priorité haute : 4h. Normale : 8h.</p>
<h2>Article 3 – Reporting</h2>
<p>Rapport mensuel des tickets (volume, délais, satisfaction) inclus.</p>
<h2>Article 4 – Prix</h2>
<p>Forfait mensuel : {{montant_mensuel}} FCFA TTC. Démarrage : {{date_debut}}.</p>
</div>`,
  },
  {
    code: 'tech_audit_reseau_infra',
    name: "Accord de service d'audit réseau et infrastructure",
    category: 'informatique_tech', price: 6000, priceMax: 18000,
    description: "Contrat pour la réalisation d'un audit complet de l'infrastructure réseau et informatique d'une organisation, incluant recommandations d'amélioration.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire auditeur", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'perimetre_audit', label: "Périmètre de l'audit (réseau, serveurs, postes...)", type: 'textarea', required: true },
      { key: 'nb_jours', label: "Durée de l'audit (jours)", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_audit', label: "Date de l'audit", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — AUDIT RÉSEAU ET INFRASTRUCTURE</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Périmètre</h2>
<p>Audit de l'infrastructure : {{perimetre_audit}} sur {{nb_jours}} jours.</p>
<h2>Article 2 – Livrables</h2>
<p>Rapport d'audit avec état des lieux, écarts et plan d'action priorisé.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC. Date : {{date_audit}}.</p>
</div>`,
  },
  {
    code: 'tech_fibre_optique_artci',
    name: "Accord de service de fibre optique entreprise (ARTCI CI)",
    category: 'informatique_tech', price: 6000, priceMax: 20000,
    description: "Contrat d'installation et d'exploitation d'un raccordement en fibre optique pour entreprise, conforme aux exigences de l'ARTCI en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom de l'opérateur / prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom de l'entreprise cliente", type: 'text', required: true },
      { key: 'debit', label: "Débit souscrit (Mbps / Gbps)", type: 'text', required: true },
      { key: 'site_raccordement', label: "Site de raccordement (adresse)", type: 'text', required: true },
      { key: 'montant_mensuel', label: "Abonnement mensuel (FCFA)", type: 'text', required: true },
      { key: 'date_activation', label: "Date d'activation prévue", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — FIBRE OPTIQUE ENTREPRISE (ARTCI CI)</h1>
<p>Entre <strong>{{prestataire}}</strong> (Opérateur agréé ARTCI) et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Objet</h2>
<p>Raccordement en fibre optique à {{debit}} sur le site : <strong>{{site_raccordement}}</strong>.</p>
<h2>Article 2 – Conformité</h2>
<p>L'opérateur est dûment agréé par l'Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire (ARTCI).</p>
<h2>Article 3 – Prix</h2>
<p>Abonnement mensuel : {{montant_mensuel}} FCFA TTC. Activation le : {{date_activation}}.</p>
</div>`,
  },

  // ── Contrats IT spécifiques ────────────────────────────────────────────────
  {
    code: 'tech_licence_logicielle',
    name: "Accord de licence logicielle (éditeur-client)",
    category: 'informatique_tech', price: 6000, priceMax: 20000,
    description: "Contrat de licence d'utilisation d'un logiciel entre l'éditeur et le client utilisateur final, définissant les droits d'usage, restrictions et conditions d'utilisation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      { key: 'editeur', label: "Nom de l'éditeur logiciel", type: 'text', required: true },
      { key: 'client', label: "Nom du client utilisateur", type: 'text', required: true },
      { key: 'logiciel', label: "Nom et version du logiciel", type: 'text', required: true },
      { key: 'type_licence', label: "Type de licence (perpétuelle, annuelle, par utilisateur)", type: 'text', required: true },
      { key: 'montant', label: "Montant de la licence (FCFA)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE LICENCE LOGICIELLE</h1>
<p>Entre <strong>{{editeur}}</strong> (l'Éditeur) et <strong>{{client}}</strong> (le Licencié) :</p>
<h2>Article 1 – Objet</h2>
<p>L'Éditeur concède une licence {{type_licence}} d'utilisation du logiciel <strong>{{logiciel}}</strong>.</p>
<h2>Article 2 – Droits accordés</h2>
<p>Le Licencié dispose du droit d'utiliser le logiciel dans le cadre de ses activités. Toute reproduction ou cession à des tiers est interdite.</p>
<h2>Article 3 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_cession_droits_logiciel',
    name: "Accord de cession de droits sur logiciel (développeur)",
    category: 'informatique_tech', price: 7000, priceMax: 22000,
    description: "Contrat par lequel le développeur cède les droits patrimoniaux sur un logiciel créé sur commande au client commanditaire, conformément au droit OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'cedant', label: "Nom du développeur (cédant)", type: 'text', required: true },
      { key: 'cessionnaire', label: "Nom du client (cessionnaire)", type: 'text', required: true },
      { key: 'logiciel_cede', label: "Description du logiciel cédé", type: 'textarea', required: true },
      { key: 'droits_cedes', label: "Droits cédés (reproduction, modification, distribution...)", type: 'text', required: true },
      { key: 'prix_cession', label: "Prix de cession (FCFA)", type: 'text', required: true },
      { key: 'date_cession', label: "Date de cession", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CESSION DE DROITS SUR LOGICIEL</h1>
<p>Entre <strong>{{cedant}}</strong> (le Cédant) et <strong>{{cessionnaire}}</strong> (le Cessionnaire) :</p>
<h2>Article 1 – Objet de la cession</h2>
<p>Le Cédant cède au Cessionnaire les droits suivants : {{droits_cedes}} sur le logiciel : {{logiciel_cede}}.</p>
<h2>Article 2 – Exclusivité</h2>
<p>La cession est consentie à titre exclusif et définitif.</p>
<h2>Article 3 – Prix</h2>
<p>Prix de cession : {{prix_cession}} FCFA. Cession en date du {{date_cession}}.</p>
</div>`,
  },
  {
    code: 'tech_nda_informatique',
    name: "Accord de confidentialité NDA informatique",
    category: 'informatique_tech', price: 4000, priceMax: 10000,
    description: "Accord de non-divulgation (NDA) spécifique au secteur informatique, protégeant les informations techniques, architectures, codes source et données échangées.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'partie_a', label: "Nom de la Partie A", type: 'text', required: true },
      { key: 'partie_b', label: "Nom de la Partie B", type: 'text', required: true },
      { key: 'informations_protegees', label: "Nature des informations confidentielles", type: 'textarea', required: true },
      { key: 'duree_confidentialite', label: "Durée de confidentialité (années)", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE CONFIDENTIALITÉ (NDA) — INFORMATIQUE</h1>
<p>Entre <strong>{{partie_a}}</strong> et <strong>{{partie_b}}</strong> (ci-après « les Parties ») :</p>
<h2>Article 1 – Informations confidentielles</h2>
<p>Les Parties s'engagent à garder strictement confidentielles toutes informations échangées dans le cadre de leur collaboration, notamment : {{informations_protegees}}.</p>
<h2>Article 2 – Durée</h2>
<p>Les obligations de confidentialité s'appliquent pendant {{duree_confidentialite}} ans à compter de la date de signature.</p>
<h2>Article 3 – Sanctions</h2>
<p>Tout manquement engage la responsabilité contractuelle de la Partie défaillante conformément au droit OHADA.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_sla_infogerance',
    name: "Accord de niveau de service SLA (infogérance)",
    category: 'informatique_tech', price: 5000, priceMax: 15000,
    description: "Contrat définissant les niveaux de service (SLA) applicables à une prestation d'infogérance : disponibilité, temps de réponse, pénalités et reporting.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'client', label: "Nom du client", type: 'text', required: true },
      { key: 'service_concerne', label: "Service IT concerné", type: 'text', required: true },
      { key: 'disponibilite_cible', label: "Disponibilité cible (%)", type: 'text', required: true },
      { key: 'penalites', label: "Pénalités en cas de non-respect du SLA", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE NIVEAU DE SERVICE (SLA) — INFOGÉRANCE</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Service couvert</h2>
<p>Le présent SLA s'applique au service : <strong>{{service_concerne}}</strong>.</p>
<h2>Article 2 – Niveaux de service</h2>
<p>Disponibilité garantie : {{disponibilite_cible}}% sur une base mensuelle.</p>
<h2>Article 3 – Pénalités</h2>
<p>{{penalites}}</p>
<h2>Article 4 – Reporting</h2>
<p>Rapport mensuel de disponibilité communiqué avant le 5 du mois suivant.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_sous_traitance_freelance',
    name: "Accord de sous-traitance informatique (développeur freelance)",
    category: 'informatique_tech', price: 4000, priceMax: 12000,
    description: "Contrat de sous-traitance informatique entre une ESN / agence et un développeur freelance, encadrant la mission, les livrables et les conditions de paiement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'donneur_ordre', label: "Nom du donneur d'ordre (ESN/agence)", type: 'text', required: true },
      { key: 'sous_traitant', label: "Nom du sous-traitant (freelance)", type: 'text', required: true },
      { key: 'mission', label: "Description de la mission", type: 'textarea', required: true },
      { key: 'tarif_journalier', label: "Tarif journalier (FCFA)", type: 'text', required: true },
      { key: 'duree_mission', label: "Durée de la mission", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de mission", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SOUS-TRAITANCE INFORMATIQUE</h1>
<p>Entre <strong>{{donneur_ordre}}</strong> (le Donneur d'Ordre) et <strong>{{sous_traitant}}</strong> (le Sous-Traitant) :</p>
<h2>Article 1 – Mission</h2>
<p>{{mission}}. Durée : {{duree_mission}}. Démarrage : {{date_debut}}.</p>
<h2>Article 2 – Rémunération</h2>
<p>Tarif journalier : {{tarif_journalier}} FCFA HT, sur présentation de facture mensuelle.</p>
<h2>Article 3 – Confidentialité</h2>
<p>Le Sous-Traitant s'engage à respecter la confidentialité des informations du client final.</p>
<h2>Article 4 – Propriété intellectuelle</h2>
<p>Les livrables produits appartiennent au Donneur d'Ordre.</p>
</div>`,
  },
  {
    code: 'tech_portage_salarial',
    name: "Accord de portage salarial informaticien",
    category: 'informatique_tech', price: 4000, priceMax: 12000,
    description: "Convention tripartite de portage salarial entre la société de portage, l'informaticien porté et l'entreprise cliente, adaptée au contexte juridique ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'societe_portage', label: "Nom de la société de portage", type: 'text', required: true },
      { key: 'consultant', label: "Nom du consultant informaticien", type: 'text', required: true },
      { key: 'entreprise_cliente', label: "Nom de l'entreprise cliente", type: 'text', required: true },
      { key: 'mission', label: "Description de la mission", type: 'textarea', required: true },
      { key: 'tjm', label: "Taux journalier moyen facturé (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE PORTAGE SALARIAL — INFORMATICIEN</h1>
<p>Convention tripartite entre <strong>{{societe_portage}}</strong> (Société de portage), <strong>{{consultant}}</strong> (Consultant porté) et <strong>{{entreprise_cliente}}</strong> (Entreprise cliente) :</p>
<h2>Article 1 – Mission</h2>
<p>{{mission}}. Démarrage : {{date_debut}}.</p>
<h2>Article 2 – Facturation</h2>
<p>TJM facturé à l'entreprise cliente : {{tjm}} FCFA HT/jour.</p>
<h2>Article 3 – Rémunération du consultant</h2>
<p>Le consultant perçoit un salaire calculé sur la base du chiffre d'affaires encaissé, déduction faite des frais de gestion de la société de portage.</p>
</div>`,
  },
  {
    code: 'tech_partenariat_var',
    name: "Accord de partenariat revendeur agréé (VAR)",
    category: 'informatique_tech', price: 5000, priceMax: 15000,
    description: "Contrat de partenariat entre un éditeur ou fournisseur IT et un revendeur à valeur ajoutée (VAR), définissant les conditions commerciales et les engagements mutuels.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'fournisseur', label: "Nom du fournisseur / éditeur", type: 'text', required: true },
      { key: 'revendeur', label: "Nom du revendeur (VAR)", type: 'text', required: true },
      { key: 'produits', label: "Produits / solutions concernés", type: 'textarea', required: true },
      { key: 'remise', label: "Remise accordée au revendeur (%)", type: 'text', required: true },
      { key: 'territoire', label: "Territoire de revente", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE PARTENARIAT REVENDEUR AGRÉÉ (VAR)</h1>
<p>Entre <strong>{{fournisseur}}</strong> (le Fournisseur) et <strong>{{revendeur}}</strong> (le Revendeur) :</p>
<h2>Article 1 – Objet</h2>
<p>Le Fournisseur autorise le Revendeur à commercialiser : {{produits}} sur le territoire : {{territoire}}.</p>
<h2>Article 2 – Conditions commerciales</h2>
<p>Remise accordée : {{remise}}% sur le prix liste public.</p>
<h2>Article 3 – Engagements du Revendeur</h2>
<p>Le Revendeur s'engage à maintenir les compétences techniques certifiées par le Fournisseur.</p>
<p>Signé le {{date_signature}}</p>
</div>`,
  },
  {
    code: 'tech_conseil_si_dsi',
    name: "Accord de service de conseil SI (DSI à temps partagé)",
    category: 'informatique_tech', price: 8000, priceMax: 24000,
    description: "Contrat de mission de DSI (Directeur des Systèmes d'Information) à temps partagé pour accompagner une PME dans la gouvernance et la stratégie IT.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'consultant', label: "Nom du consultant DSI", type: 'text', required: true },
      { key: 'client', label: "Nom de l'entreprise cliente", type: 'text', required: true },
      { key: 'missions_dsi', label: "Missions du DSI à temps partagé", type: 'textarea', required: true },
      { key: 'nb_jours_mois', label: "Nombre de jours par mois", type: 'text', required: true },
      { key: 'tarif_journalier', label: "Tarif journalier (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début de mission", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — DSI À TEMPS PARTAGÉ</h1>
<p>Entre <strong>{{consultant}}</strong> (Consultant DSI) et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Missions</h2>
<p>{{missions_dsi}}. Rythme : {{nb_jours_mois}} jours/mois.</p>
<h2>Article 2 – Rémunération</h2>
<p>Tarif journalier : {{tarif_journalier}} FCFA HT.</p>
<h2>Article 3 – Confidentialité</h2>
<p>Le Consultant est soumis à une obligation de discrétion sur toutes les informations de l'entreprise cliente.</p>
<p>Prise d'effet : {{date_debut}}</p>
</div>`,
  },
  {
    code: 'tech_transformation_digitale',
    name: "Accord de service de transformation digitale (PME CI)",
    category: 'informatique_tech', price: 9000, priceMax: 28000,
    description: "Contrat d'accompagnement à la transformation digitale d'une PME ivoirienne, couvrant le diagnostic, la feuille de route numérique et l'implémentation des outils.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du cabinet de conseil", type: 'text', required: true },
      { key: 'client', label: "Nom de la PME cliente", type: 'text', required: true },
      { key: 'diagnostic_initial', label: "Diagnostic initial et axes de transformation", type: 'textarea', required: true },
      { key: 'duree_accompagnement', label: "Durée de l'accompagnement", type: 'text', required: true },
      { key: 'montant', label: "Montant global (FCFA)", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — TRANSFORMATION DIGITALE PME</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Diagnostic</h2>
<p>{{diagnostic_initial}}</p>
<h2>Article 2 – Accompagnement</h2>
<p>Durée : {{duree_accompagnement}}. Démarrage : {{date_debut}}.</p>
<h2>Article 3 – Livrables</h2>
<p>Feuille de route numérique, plan d'action priorisé et tableau de bord de suivi de la transformation.</p>
<h2>Article 4 – Prix</h2>
<p>Montant global : {{montant}} FCFA TTC.</p>
</div>`,
  },
  {
    code: 'tech_audit_rgpd_ci',
    name: "Accord de service d'audit RGPD/Loi CI protection données",
    category: 'informatique_tech', price: 6000, priceMax: 18000,
    description: "Contrat pour la réalisation d'un audit de conformité au RGPD et à la loi ivoirienne n° 2013-450 sur la protection des données personnelles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'prestataire', label: "Nom du cabinet auditeur", type: 'text', required: true },
      { key: 'client', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'traitements_audites', label: "Traitements de données audités", type: 'textarea', required: true },
      { key: 'nb_jours', label: "Durée de l'audit (jours)", type: 'text', required: true },
      { key: 'montant', label: "Montant (FCFA)", type: 'text', required: true },
      { key: 'date_audit', label: "Date de l'audit", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>ACCORD DE SERVICE — AUDIT RGPD / LOI CI PROTECTION DES DONNÉES</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong> :</p>
<h2>Article 1 – Cadre légal</h2>
<p>Audit de conformité selon le RGPD et la loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel.</p>
<h2>Article 2 – Périmètre</h2>
<p>Traitements audités : {{traitements_audites}} sur {{nb_jours}} jours.</p>
<h2>Article 3 – Livrables</h2>
<p>Rapport d'audit avec registre des traitements, analyse d'impact (DPIA) et plan de remédiation.</p>
<h2>Article 4 – Prix</h2>
<p>Montant : {{montant}} FCFA TTC. Date : {{date_audit}}.</p>
</div>`,
  },

  // ── Documents de synthèse ─────────────────────────────────────────────────
  {
    code: 'tech_rapport_audit_securite',
    name: "Rapport d'audit de sécurité informatique",
    category: 'informatique_tech', price: 5000, priceMax: 14000,
    description: "Modèle de rapport structuré pour présenter les résultats d'un audit de sécurité informatique : périmètre, vulnérabilités, risques et recommandations.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      { key: 'auditeur', label: "Nom de l'auditeur / cabinet", type: 'text', required: true },
      { key: 'organisation', label: "Nom de l'organisation auditée", type: 'text', required: true },
      { key: 'perimetre_audit', label: "Périmètre de l'audit", type: 'textarea', required: true },
      { key: 'synthese_resultats', label: "Synthèse des résultats et risques identifiés", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>RAPPORT D'AUDIT DE SÉCURITÉ INFORMATIQUE</h1>
<p><strong>Auditeur :</strong> {{auditeur}}</p>
<p><strong>Organisation auditée :</strong> {{organisation}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h2>1. Périmètre de l'audit</h2>
<p>{{perimetre_audit}}</p>
<h2>2. Synthèse des résultats</h2>
<p>{{synthese_resultats}}</p>
<h2>3. Niveau de risque global</h2>
<p>À compléter selon la matrice de risques définie lors de la mission.</p>
<h2>4. Plan de remédiation</h2>
<p>Les recommandations détaillées sont présentées en annexe, classées par priorité (critique, haute, moyenne, faible).</p>
<h2>5. Conclusion</h2>
<p>Le présent rapport est confidentiel et destiné exclusivement à l'organisation auditée.</p>
</div>`,
  },
  {
    code: 'tech_rapport_etat_si',
    name: "Rapport d'état du système d'information (SI)",
    category: 'informatique_tech', price: 4000, priceMax: 12000,
    description: "Modèle de rapport périodique dressant l'état de santé du système d'information : inventaire, incidents, performances, projets en cours et axes d'amélioration.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'responsable_si', label: "Nom du responsable SI / DSI", type: 'text', required: true },
      { key: 'organisation', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'periode', label: "Période couverte par le rapport", type: 'text', required: true },
      { key: 'etat_infrastruture', label: "État de l'infrastructure (résumé)", type: 'textarea', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>RAPPORT D'ÉTAT DU SYSTÈME D'INFORMATION</h1>
<p><strong>Organisation :</strong> {{organisation}}</p>
<p><strong>Responsable SI :</strong> {{responsable_si}}</p>
<p><strong>Période :</strong> {{periode}} — <strong>Date :</strong> {{date_rapport}}</p>
<h2>1. État de l'infrastructure</h2>
<p>{{etat_infrastruture}}</p>
<h2>2. Incidents et disponibilité</h2>
<p>Tableau de bord des incidents à compléter par le responsable SI.</p>
<h2>3. Projets IT en cours</h2>
<p>Avancement des projets à renseigner par le chef de projet.</p>
<h2>4. Budget consommé</h2>
<p>Suivi budgétaire IT à compléter selon le tableau de bord financier.</p>
<h2>5. Axes d'amélioration</h2>
<p>Recommandations et priorités pour la prochaine période.</p>
</div>`,
  },
  {
    code: 'tech_plan_directeur_si',
    name: "Plan directeur informatique (schéma directeur SI)",
    category: 'informatique_tech', price: 10000, priceMax: 30000,
    description: "Modèle de plan directeur informatique (schéma directeur SI) définissant la vision, les objectifs, la feuille de route et le budget IT sur 3 à 5 ans.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'organisation', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'responsable', label: "DSI / responsable du plan", type: 'text', required: true },
      { key: 'vision_si', label: "Vision et objectifs du SI à l'horizon du plan", type: 'textarea', required: true },
      { key: 'horizon', label: "Horizon du plan (ex : 2025-2028)", type: 'text', required: true },
      { key: 'budget_total', label: "Budget total estimé (FCFA)", type: 'text', required: true },
      { key: 'date_validation', label: "Date de validation", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>PLAN DIRECTEUR INFORMATIQUE — SCHÉMA DIRECTEUR SI</h1>
<p><strong>Organisation :</strong> {{organisation}}</p>
<p><strong>DSI :</strong> {{responsable}} — <strong>Horizon :</strong> {{horizon}}</p>
<p><strong>Validé le :</strong> {{date_validation}}</p>
<h2>1. Vision stratégique</h2>
<p>{{vision_si}}</p>
<h2>2. État des lieux du SI actuel</h2>
<p>Cartographie fonctionnelle et technique du SI existant à compléter.</p>
<h2>3. Cibles et projets structurants</h2>
<p>Feuille de route des projets IT prioritaires sur la période {{horizon}}.</p>
<h2>4. Budget prévisionnel</h2>
<p>Budget total estimé : {{budget_total}} FCFA, réparti par exercice.</p>
<h2>5. Gouvernance du plan</h2>
<p>Comité de pilotage SI trimestriel chargé du suivi de l'exécution du plan directeur.</p>
</div>`,
  },
  {
    code: 'tech_charte_informatique',
    name: "Charte informatique et bonne utilisation des outils numériques",
    category: 'informatique_tech', price: 4000, priceMax: 10000,
    description: "Charte interne définissant les règles d'utilisation des outils informatiques, d'internet, de la messagerie et des équipements numériques au sein de l'organisation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      { key: 'organisation', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'directeur', label: "Nom du Directeur Général", type: 'text', required: true },
      { key: 'outils_concernes', label: "Outils numériques couverts par la charte", type: 'textarea', required: true },
      { key: 'sanctions', label: "Sanctions en cas de non-respect", type: 'text', required: true },
      { key: 'date_entree_vigueur', label: "Date d'entrée en vigueur", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>CHARTE INFORMATIQUE ET BONNE UTILISATION DES OUTILS NUMÉRIQUES</h1>
<p><strong>Organisation :</strong> {{organisation}}</p>
<p><strong>Direction Générale :</strong> {{directeur}}</p>
<p><strong>En vigueur à compter du :</strong> {{date_entree_vigueur}}</p>
<h2>Préambule</h2>
<p>La présente charte définit les règles d'utilisation des ressources informatiques et numériques mises à disposition des collaborateurs de {{organisation}}.</p>
<h2>Article 1 – Ressources couvertes</h2>
<p>{{outils_concernes}}</p>
<h2>Article 2 – Règles d'utilisation</h2>
<p>Les ressources informatiques sont mises à disposition à des fins professionnelles. Un usage personnel raisonnable est toléré dans les limites définies par la Direction.</p>
<h2>Article 3 – Sécurité</h2>
<p>Chaque collaborateur est responsable de la confidentialité de ses identifiants et de la sécurité du matériel qui lui est confié.</p>
<h2>Article 4 – Interdictions</h2>
<p>Il est notamment interdit d'installer des logiciels non autorisés, de télécharger du contenu illicite ou de partager des informations confidentielles de l'entreprise.</p>
<h2>Article 5 – Sanctions</h2>
<p>Tout manquement peut entraîner : {{sanctions}}, conformément au règlement intérieur et au Code du Travail ivoirien.</p>
<p>La Direction Générale</p>
</div>`,
  },
  {
    code: 'tech_charte_cybersecurite_afrique',
    name: "Charte de la cybersécurité et de la protection des données personnelles en Afrique",
    category: 'informatique_tech', price: 5000, priceMax: 14000,
    description: "Charte organisationnelle sur la cybersécurité et la protection des données personnelles, adaptée au cadre légal africain (RGPD, loi CI, CEDEAO, Union Africaine Convention de Malabo).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      { key: 'organisation', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'dpo', label: "Nom du DPO / responsable des données", type: 'text', required: true },
      { key: 'engagement_direction', label: "Engagement de la Direction (résumé)", type: 'textarea', required: true },
      { key: 'pays_application', label: "Pays / zone d'application (ex : Côte d'Ivoire, CEDEAO)", type: 'text', required: true },
      { key: 'date_adoption', label: "Date d'adoption de la charte", type: 'date', required: true },
    ]),
    body: `<div class="doc">
<h1>CHARTE DE LA CYBERSÉCURITÉ ET DE LA PROTECTION DES DONNÉES PERSONNELLES</h1>
<p><strong>Organisation :</strong> {{organisation}}</p>
<p><strong>Zone d'application :</strong> {{pays_application}}</p>
<p><strong>DPO :</strong> {{dpo}} — <strong>Adoptée le :</strong> {{date_adoption}}</p>
<h2>Préambule</h2>
<p>{{organisation}} s'engage à promouvoir une culture de la cybersécurité et à protéger les données personnelles conformément aux cadres légaux applicables : loi ivoirienne n° 2013-450, Convention de Malabo de l'Union Africaine sur la cybersécurité et la protection des données personnelles, et principes du RGPD.</p>
<h2>Article 1 – Engagement de la Direction</h2>
<p>{{engagement_direction}}</p>
<h2>Article 2 – Principes de protection des données</h2>
<p>Les données personnelles collectées sont traitées de manière licite, loyale et transparente, limitées aux finalités définies et conservées le temps strictement nécessaire.</p>
<h2>Article 3 – Mesures de cybersécurité</h2>
<p>Des mesures techniques et organisationnelles appropriées sont mises en place pour garantir la confidentialité, l'intégrité et la disponibilité des données et systèmes.</p>
<h2>Article 4 – Droits des personnes concernées</h2>
<p>Toute personne dispose d'un droit d'accès, de rectification et d'opposition au traitement de ses données, exercé auprès du DPO.</p>
<h2>Article 5 – Notification des incidents</h2>
<p>Tout incident de sécurité susceptible d'affecter les données personnelles est notifié aux autorités compétentes dans les délais légaux.</p>
<p>La Direction Générale de {{organisation}}</p>
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
  console.log(`Batch 114a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
