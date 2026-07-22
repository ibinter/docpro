import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates = [
  // ── 20 Télécoms & Digital ──────────────────────────────────────────────────
  {
    code: 'tel_contrat_abonnement_telecom_entreprise',
    name: 'Contrat abonnement télécom entreprise',
    category: 'juridique_admin',
    price: 4500,
    priceMax: 12000,
    description: "Contrat d'abonnement téléphonie et données pour entreprise, incluant engagements de service et conditions tarifaires.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'nom_entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'siret', label: 'Numéro SIRET', type: 'text', required: true },
      { key: 'offre', label: "Offre souscrite", type: 'text', required: true },
      { key: 'duree_engagement', label: "Durée d'engagement (mois)", type: 'number', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { key: 'montant_mensuel', label: 'Montant mensuel HT (€)', type: 'number', required: true },
      { key: 'nombre_lignes', label: 'Nombre de lignes', type: 'number', required: false },
    ]),
    body: `<h1>CONTRAT D'ABONNEMENT TÉLÉCOM ENTREPRISE</h1>
<p>Entre l'opérateur télécom, ci-après dénommé «&nbsp;le Prestataire&nbsp;», et <strong>{{nom_entreprise}}</strong> (SIRET&nbsp;: {{siret}}), ci-après dénommé «&nbsp;le Client&nbsp;».</p>
<h2>Article 1 – Objet</h2>
<p>Le présent contrat a pour objet la fourniture de l'offre <strong>{{offre}}</strong> comprenant {{nombre_lignes}} lignes mobiles/fixes.</p>
<h2>Article 2 – Durée</h2>
<p>Le contrat est conclu pour une durée de <strong>{{duree_engagement}} mois</strong> à compter du {{date_debut}}.</p>
<h2>Article 3 – Tarification</h2>
<p>Le montant mensuel hors taxes est de <strong>{{montant_mensuel}}&nbsp;€ HT</strong>. La TVA applicable est de 20&nbsp;%.</p>
<h2>Article 4 – Conditions de résiliation</h2>
<p>Toute résiliation anticipée donnera lieu au paiement des mensualités restantes jusqu'au terme de la période d'engagement.</p>`,
  },
  {
    code: 'tel_sla_services_numeriques',
    name: 'SLA services numériques',
    category: 'juridique_admin',
    price: 5500,
    priceMax: 16000,
    description: "Accord de niveau de service (SLA) définissant les engagements de disponibilité et de performance pour les services numériques.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'service', label: 'Service concerné', type: 'text', required: true },
      { key: 'taux_disponibilite', label: 'Taux de disponibilité garanti (%)', type: 'number', required: true },
      { key: 'rto', label: 'RTO – Délai de reprise (heures)', type: 'number', required: true },
      { key: 'rpo', label: 'RPO – Perte de données maximale (heures)', type: 'number', required: true },
      { key: 'penalites', label: 'Pénalités en cas de non-respect (%)', type: 'number', required: false },
    ]),
    body: `<h1>ACCORD DE NIVEAU DE SERVICE (SLA) – SERVICES NUMÉRIQUES</h1>
<h2>1. Périmètre</h2>
<p>Le présent SLA s'applique au service <strong>{{service}}</strong> fourni par le Prestataire.</p>
<h2>2. Disponibilité garantie</h2>
<p>Le Prestataire s'engage à maintenir une disponibilité minimale de <strong>{{taux_disponibilite}}&nbsp;%</strong> mesurée mensuellement.</p>
<h2>3. Objectifs de reprise</h2>
<ul><li>RTO (délai de reprise)&nbsp;: {{rto}}&nbsp;heures</li><li>RPO (perte de données maximale)&nbsp;: {{rpo}}&nbsp;heures</li></ul>
<h2>4. Pénalités</h2>
<p>En cas de non-respect des engagements, des pénalités de <strong>{{penalites}}&nbsp;%</strong> du montant mensuel seront appliquées par tranche de 0,1&nbsp;% de disponibilité manquante.</p>`,
  },
  {
    code: 'tel_politique_securite_si',
    name: 'Politique de sécurité des systèmes d\'information',
    category: 'juridique_admin',
    price: 6000,
    priceMax: 18000,
    description: "Document de référence définissant la politique de sécurité des systèmes d'information (PSSI) de l'organisation.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'organisation', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'responsable_ssi', label: 'Responsable SSI (RSSI)', type: 'text', required: true },
      { key: 'date_revision', label: 'Date de dernière révision', type: 'date', required: true },
      { key: 'version', label: 'Version du document', type: 'text', required: true },
      { key: 'perimetre', label: "Périmètre d'application", type: 'textarea', required: true },
    ]),
    body: `<h1>POLITIQUE DE SÉCURITÉ DES SYSTÈMES D'INFORMATION</h1>
<p><strong>Organisation&nbsp;:</strong> {{organisation}} | <strong>RSSI&nbsp;:</strong> {{responsable_ssi}} | <strong>Version&nbsp;:</strong> {{version}} | <strong>Révision&nbsp;:</strong> {{date_revision}}</p>
<h2>1. Périmètre</h2>
<p>{{perimetre}}</p>
<h2>2. Objectifs de sécurité</h2>
<p>La PSSI vise à assurer la confidentialité, l'intégrité et la disponibilité des actifs informationnels.</p>
<h2>3. Principes directeurs</h2>
<ul><li>Principe de moindre privilège</li><li>Séparation des responsabilités</li><li>Défense en profondeur</li><li>Traçabilité des accès</li></ul>
<h2>4. Responsabilités</h2>
<p>Chaque collaborateur est responsable du respect de la présente politique dans le cadre de ses fonctions.</p>`,
  },
  {
    code: 'tel_charte_informatique',
    name: "Charte informatique",
    category: 'juridique_admin',
    price: 2500,
    priceMax: 7000,
    description: "Charte d'utilisation des ressources informatiques définissant les droits et obligations des utilisateurs.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'entreprise', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'date_entree_vigueur', label: "Date d'entrée en vigueur", type: 'date', required: true },
      { key: 'dsi', label: 'Responsable DSI', type: 'text', required: false },
    ]),
    body: `<h1>CHARTE INFORMATIQUE</h1>
<p><strong>{{entreprise}}</strong> – En vigueur depuis le {{date_entree_vigueur}}</p>
<h2>Article 1 – Objet</h2>
<p>La présente charte régit l'utilisation des ressources informatiques mises à disposition des collaborateurs.</p>
<h2>Article 2 – Ressources concernées</h2>
<p>Ordinateurs, smartphones, tablettes, logiciels, accès Internet, messagerie électronique et tout équipement connecté au réseau de l'entreprise.</p>
<h2>Article 3 – Règles d'utilisation</h2>
<ul><li>Usage professionnel prioritaire</li><li>Respect de la confidentialité des données</li><li>Interdiction du téléchargement de logiciels non autorisés</li><li>Signalement immédiat de tout incident de sécurité</li></ul>
<h2>Article 4 – Sanctions</h2>
<p>Tout manquement à la présente charte peut entraîner des sanctions disciplinaires pouvant aller jusqu'au licenciement.</p>`,
  },
  {
    code: 'tel_procedure_gestion_incidents_cyber',
    name: "Procédure de gestion des incidents cyber",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 14000,
    description: "Procédure opérationnelle de détection, qualification, réponse et clôture des incidents de cybersécurité.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'organisation', label: "Organisation", type: 'text', required: true },
      { key: 'equipe_csirt', label: "Équipe CSIRT / SOC", type: 'text', required: true },
      { key: 'contact_urgence', label: "Contact d'urgence 24/7", type: 'text', required: true },
      { key: 'delai_notification_cnil', label: "Délai notification CNIL (heures)", type: 'number', required: false },
    ]),
    body: `<h1>PROCÉDURE DE GESTION DES INCIDENTS CYBER</h1>
<p><strong>Organisation&nbsp;:</strong> {{organisation}} | <strong>Équipe&nbsp;:</strong> {{equipe_csirt}} | <strong>Urgences&nbsp;:</strong> {{contact_urgence}}</p>
<h2>Phase 1 – Détection et signalement</h2>
<p>Tout incident potentiel doit être signalé immédiatement à l'équipe {{equipe_csirt}} via le canal sécurisé dédié.</p>
<h2>Phase 2 – Qualification</h2>
<p>L'équipe évalue la criticité (P1/P2/P3/P4) et active le niveau de réponse correspondant.</p>
<h2>Phase 3 – Confinement et éradication</h2>
<p>Isolation des systèmes affectés, analyse forensique, éradication de la menace.</p>
<h2>Phase 4 – Notification réglementaire</h2>
<p>En cas de violation de données personnelles, notification à la CNIL dans les {{delai_notification_cnil}}&nbsp;heures.</p>
<h2>Phase 5 – Clôture et REX</h2>
<p>Rapport d'incident, retour d'expérience et mise à jour des mesures de sécurité.</p>`,
  },
  {
    code: 'tel_plan_reprise_sinistre_pra',
    name: "Plan de reprise après sinistre (PRA)",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 25000,
    description: "Plan de reprise d'activité informatique après sinistre, définissant les procédures de basculement et de restauration.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'organisation', label: "Organisation", type: 'text', required: true },
      { key: 'site_principal', label: "Site principal", type: 'text', required: true },
      { key: 'site_secours', label: "Site de secours", type: 'text', required: true },
      { key: 'rto_cible', label: "RTO cible (heures)", type: 'number', required: true },
      { key: 'rpo_cible', label: "RPO cible (heures)", type: 'number', required: true },
      { key: 'responsable_pra', label: "Responsable PRA", type: 'text', required: true },
    ]),
    body: `<h1>PLAN DE REPRISE APRÈS SINISTRE (PRA)</h1>
<p><strong>{{organisation}}</strong> | Responsable&nbsp;: {{responsable_pra}}</p>
<h2>1. Contexte</h2>
<p>Site principal&nbsp;: {{site_principal}} | Site de secours&nbsp;: {{site_secours}}</p>
<h2>2. Objectifs</h2>
<ul><li>RTO cible&nbsp;: {{rto_cible}}&nbsp;heures</li><li>RPO cible&nbsp;: {{rpo_cible}}&nbsp;heures</li></ul>
<h2>3. Procédure de basculement</h2>
<ol><li>Déclaration du sinistre par le responsable PRA</li><li>Activation de la cellule de crise</li><li>Basculement vers le site de secours {{site_secours}}</li><li>Validation du bon fonctionnement des systèmes critiques</li><li>Communication aux utilisateurs</li></ol>
<h2>4. Tests et exercices</h2>
<p>Le PRA fait l'objet d'un test complet annuel et de tests partiels trimestriels.</p>`,
  },
  {
    code: 'tel_politique_sauvegarde_donnees',
    name: "Politique de sauvegarde des données",
    category: 'juridique_admin',
    price: 3500,
    priceMax: 9000,
    description: "Politique définissant les règles et procédures de sauvegarde, de rétention et de restauration des données.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'organisation', label: "Organisation", type: 'text', required: true },
      { key: 'frequence_sauvegarde', label: "Fréquence de sauvegarde", type: 'text', required: true },
      { key: 'duree_retention', label: "Durée de rétention (jours)", type: 'number', required: true },
      { key: 'lieu_stockage', label: "Lieu de stockage des sauvegardes", type: 'text', required: true },
      { key: 'responsable', label: "Responsable des sauvegardes", type: 'text', required: true },
    ]),
    body: `<h1>POLITIQUE DE SAUVEGARDE DES DONNÉES</h1>
<p><strong>{{organisation}}</strong> | Responsable&nbsp;: {{responsable}}</p>
<h2>1. Périmètre</h2>
<p>La présente politique s'applique à l'ensemble des données critiques de l'organisation.</p>
<h2>2. Règles de sauvegarde</h2>
<ul><li>Fréquence&nbsp;: {{frequence_sauvegarde}}</li><li>Durée de rétention&nbsp;: {{duree_retention}}&nbsp;jours</li><li>Stockage&nbsp;: {{lieu_stockage}}</li></ul>
<h2>3. Chiffrement</h2>
<p>Toutes les sauvegardes sont chiffrées avec un algorithme AES-256.</p>
<h2>4. Tests de restauration</h2>
<p>Des tests de restauration sont effectués mensuellement pour valider l'intégrité des sauvegardes.</p>`,
  },
  {
    code: 'tel_dpa_sous_traitant_rgpd',
    name: "DPA sous-traitant RGPD",
    category: 'juridique_admin',
    price: 4000,
    priceMax: 11000,
    description: "Accord de traitement des données (DPA) conforme au RGPD entre responsable de traitement et sous-traitant.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'responsable_traitement', label: "Responsable de traitement", type: 'text', required: true },
      { key: 'sous_traitant', label: "Sous-traitant", type: 'text', required: true },
      { key: 'nature_traitements', label: "Nature des traitements", type: 'textarea', required: true },
      { key: 'donnees_concernees', label: "Catégories de données concernées", type: 'textarea', required: true },
      { key: 'duree_traitement', label: "Durée du traitement", type: 'text', required: true },
      { key: 'lieu_traitement', label: "Lieu du traitement", type: 'text', required: false },
    ]),
    body: `<h1>ACCORD DE TRAITEMENT DES DONNÉES (DPA) – RGPD</h1>
<p>Entre <strong>{{responsable_traitement}}</strong> (Responsable de traitement) et <strong>{{sous_traitant}}</strong> (Sous-traitant).</p>
<h2>Article 1 – Objet et périmètre</h2>
<p>Nature des traitements&nbsp;: {{nature_traitements}}</p>
<p>Données concernées&nbsp;: {{donnees_concernees}}</p>
<h2>Article 2 – Durée</h2>
<p>Le présent accord est conclu pour une durée de {{duree_traitement}}.</p>
<h2>Article 3 – Obligations du sous-traitant</h2>
<ul><li>Traiter les données uniquement sur instruction documentée du responsable de traitement</li><li>Garantir la confidentialité des données</li><li>Mettre en œuvre les mesures de sécurité appropriées</li><li>Ne pas recruter de sous-traitants ultérieurs sans autorisation préalable</li></ul>
<h2>Article 4 – Localisation</h2>
<p>Lieu de traitement&nbsp;: {{lieu_traitement}}. Tout transfert hors UE requiert un mécanisme de transfer adéquat.</p>`,
  },
  {
    code: 'tel_registre_traitements_rgpd',
    name: "Registre des traitements RGPD",
    category: 'juridique_admin',
    price: 3000,
    priceMax: 8000,
    description: "Registre des activités de traitement de données personnelles conforme à l'article 30 du RGPD.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'organisation', label: "Organisation", type: 'text', required: true },
      { key: 'dpo', label: "DPO / Délégué à la protection des données", type: 'text', required: false },
      { key: 'nom_traitement', label: "Nom du traitement", type: 'text', required: true },
      { key: 'finalite', label: "Finalité du traitement", type: 'textarea', required: true },
      { key: 'base_legale', label: "Base légale", type: 'text', required: true },
      { key: 'duree_conservation', label: "Durée de conservation", type: 'text', required: true },
    ]),
    body: `<h1>REGISTRE DES ACTIVITÉS DE TRAITEMENT – RGPD (Art. 30)</h1>
<p><strong>{{organisation}}</strong> | DPO&nbsp;: {{dpo}}</p>
<table border="1" style="width:100%;border-collapse:collapse;">
<thead><tr><th>Champ</th><th>Valeur</th></tr></thead>
<tbody>
<tr><td>Nom du traitement</td><td>{{nom_traitement}}</td></tr>
<tr><td>Finalité</td><td>{{finalite}}</td></tr>
<tr><td>Base légale</td><td>{{base_legale}}</td></tr>
<tr><td>Durée de conservation</td><td>{{duree_conservation}}</td></tr>
</tbody>
</table>
<p><em>Ce registre doit être mis à jour à chaque nouveau traitement ou modification substantielle.</em></p>`,
  },
  {
    code: 'tel_analyse_impact_aipd',
    name: "Analyse d'impact AIPD",
    category: 'juridique_admin',
    price: 6500,
    priceMax: 18000,
    description: "Analyse d'impact relative à la protection des données (AIPD/DPIA) pour les traitements à risque élevé.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'traitement', label: "Traitement concerné", type: 'text', required: true },
      { key: 'responsable', label: "Responsable de traitement", type: 'text', required: true },
      { key: 'description_traitement', label: "Description du traitement", type: 'textarea', required: true },
      { key: 'risques_identifies', label: "Risques identifiés", type: 'textarea', required: true },
      { key: 'mesures_attenuation', label: "Mesures d'atténuation", type: 'textarea', required: true },
      { key: 'avis_dpo', label: "Avis du DPO", type: 'textarea', required: false },
    ]),
    body: `<h1>ANALYSE D'IMPACT RELATIVE À LA PROTECTION DES DONNÉES (AIPD)</h1>
<p><strong>Traitement&nbsp;:</strong> {{traitement}} | <strong>Responsable&nbsp;:</strong> {{responsable}}</p>
<h2>1. Description du traitement</h2>
<p>{{description_traitement}}</p>
<h2>2. Nécessité et proportionnalité</h2>
<p>Évaluation de la nécessité du traitement au regard de la finalité poursuivie.</p>
<h2>3. Risques identifiés</h2>
<p>{{risques_identifies}}</p>
<h2>4. Mesures d'atténuation</h2>
<p>{{mesures_attenuation}}</p>
<h2>5. Avis du DPO</h2>
<p>{{avis_dpo}}</p>`,
  },
  {
    code: 'tel_contrat_developpement_logiciel',
    name: "Contrat de développement logiciel",
    category: 'juridique_admin',
    price: 7000,
    priceMax: 20000,
    description: "Contrat de développement sur mesure d'un logiciel, incluant spécifications, livrables et transfert de propriété intellectuelle.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'prestataire', label: "Prestataire développeur", type: 'text', required: true },
      { key: 'nom_logiciel', label: "Nom du logiciel", type: 'text', required: true },
      { key: 'budget', label: "Budget total HT (€)", type: 'number', required: true },
      { key: 'delai_livraison', label: "Délai de livraison (jours)", type: 'number', required: true },
      { key: 'garantie', label: "Durée de garantie (mois)", type: 'number', required: false },
    ]),
    body: `<h1>CONTRAT DE DÉVELOPPEMENT LOGICIEL</h1>
<p>Entre <strong>{{client}}</strong> (le Client) et <strong>{{prestataire}}</strong> (le Développeur).</p>
<h2>Article 1 – Objet</h2>
<p>Développement du logiciel <strong>{{nom_logiciel}}</strong> selon le cahier des charges annexé.</p>
<h2>Article 2 – Livrables et délais</h2>
<p>Livraison dans un délai de {{delai_livraison}}&nbsp;jours à compter de la signature.</p>
<h2>Article 3 – Prix</h2>
<p>Budget total&nbsp;: <strong>{{budget}}&nbsp;€ HT</strong>, payable selon l'échéancier défini en annexe.</p>
<h2>Article 4 – Propriété intellectuelle</h2>
<p>À la réception définitive et après paiement intégral, tous les droits de propriété intellectuelle sont transférés au Client.</p>
<h2>Article 5 – Garantie</h2>
<p>Le Développeur garantit le logiciel contre tout défaut pendant {{garantie}}&nbsp;mois.</p>`,
  },
  {
    code: 'tel_contrat_maintenance_applicative',
    name: "Contrat de maintenance applicative",
    category: 'juridique_admin',
    price: 4500,
    priceMax: 13000,
    description: "Contrat de maintenance corrective et évolutive d'une application informatique.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'prestataire', label: "Prestataire", type: 'text', required: true },
      { key: 'application', label: "Application concernée", type: 'text', required: true },
      { key: 'type_maintenance', label: "Type de maintenance (corrective/évolutive/les deux)", type: 'text', required: true },
      { key: 'tarif_annuel', label: "Tarif annuel HT (€)", type: 'number', required: true },
      { key: 'delai_intervention', label: "Délai d'intervention P1 (heures)", type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT DE MAINTENANCE APPLICATIVE</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{prestataire}}</strong>.</p>
<h2>Article 1 – Périmètre</h2>
<p>Application&nbsp;: <strong>{{application}}</strong> | Type de maintenance&nbsp;: {{type_maintenance}}</p>
<h2>Article 2 – Niveaux de service</h2>
<p>Délai d'intervention critique (P1)&nbsp;: <strong>{{delai_intervention}}&nbsp;heures</strong></p>
<h2>Article 3 – Tarification</h2>
<p>Tarif annuel&nbsp;: <strong>{{tarif_annuel}}&nbsp;€ HT</strong>, facturé trimestriellement.</p>
<h2>Article 4 – Exclusions</h2>
<p>Les évolutions majeures (refonte de l'architecture) font l'objet d'un devis séparé.</p>`,
  },
  {
    code: 'tel_cahier_charges_site_web',
    name: "Cahier des charges site web",
    category: 'juridique_admin',
    price: 3500,
    priceMax: 10000,
    description: "Cahier des charges fonctionnel et technique pour la création ou refonte d'un site web.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'type_site', label: "Type de site (vitrine/e-commerce/portail)", type: 'text', required: true },
      { key: 'budget_cible', label: "Budget cible HT (€)", type: 'number', required: false },
      { key: 'delai_mise_en_ligne', label: "Délai de mise en ligne souhaité", type: 'text', required: true },
      { key: 'cms_souhaite', label: "CMS souhaité", type: 'text', required: false },
      { key: 'langues', label: "Langues du site", type: 'text', required: false },
    ]),
    body: `<h1>CAHIER DES CHARGES – SITE WEB</h1>
<p><strong>Client&nbsp;:</strong> {{client}} | <strong>Type&nbsp;:</strong> {{type_site}}</p>
<h2>1. Contexte et objectifs</h2>
<p>Ce document définit les exigences fonctionnelles et techniques pour le développement du site {{type_site}}.</p>
<h2>2. Spécifications fonctionnelles</h2>
<ul><li>Langues&nbsp;: {{langues}}</li><li>CMS&nbsp;: {{cms_souhaite}}</li></ul>
<h2>3. Exigences techniques</h2>
<ul><li>Responsive design (mobile first)</li><li>Performance&nbsp;: score Lighthouse &gt; 90</li><li>Accessibilité WCAG 2.1 niveau AA</li><li>SEO technique optimisé</li></ul>
<h2>4. Planning</h2>
<p>Mise en ligne souhaitée&nbsp;: {{delai_mise_en_ligne}}</p>
<h2>5. Budget</h2>
<p>Budget cible&nbsp;: {{budget_cible}}&nbsp;€ HT</p>`,
  },
  {
    code: 'tel_cgu_plateforme_numerique',
    name: "CGU plateforme numérique",
    category: 'juridique_admin',
    price: 4000,
    priceMax: 11000,
    description: "Conditions Générales d'Utilisation (CGU) pour une plateforme numérique ou application en ligne.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'nom_plateforme', label: "Nom de la plateforme", type: 'text', required: true },
      { key: 'editeur', label: "Éditeur", type: 'text', required: true },
      { key: 'date_entree_vigueur', label: "Date d'entrée en vigueur", type: 'date', required: true },
      { key: 'email_contact', label: "Email de contact", type: 'text', required: true },
    ]),
    body: `<h1>CONDITIONS GÉNÉRALES D'UTILISATION</h1>
<h2>{{nom_plateforme}}</h2>
<p>Éditeur&nbsp;: <strong>{{editeur}}</strong> | En vigueur depuis le {{date_entree_vigueur}}</p>
<h2>Article 1 – Acceptation</h2>
<p>L'accès et l'utilisation de {{nom_plateforme}} impliquent l'acceptation sans réserve des présentes CGU.</p>
<h2>Article 2 – Description du service</h2>
<p>{{nom_plateforme}} est une plateforme numérique permettant [description du service].</p>
<h2>Article 3 – Inscription et compte</h2>
<p>L'utilisateur s'engage à fournir des informations exactes lors de son inscription et à maintenir la confidentialité de ses identifiants.</p>
<h2>Article 4 – Propriété intellectuelle</h2>
<p>Tous les contenus de {{nom_plateforme}} sont protégés par le droit d'auteur. Toute reproduction est soumise à autorisation.</p>
<h2>Article 5 – Contact</h2>
<p>Pour toute question&nbsp;: {{email_contact}}</p>`,
  },
  {
    code: 'tel_politique_cookies',
    name: "Politique de cookies",
    category: 'juridique_admin',
    price: 2000,
    priceMax: 5500,
    description: "Politique de gestion des cookies conforme au RGPD et aux recommandations de la CNIL.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'site_web', label: "Nom du site web", type: 'text', required: true },
      { key: 'editeur', label: "Éditeur", type: 'text', required: true },
      { key: 'outil_consentement', label: "Outil de gestion du consentement", type: 'text', required: false },
    ]),
    body: `<h1>POLITIQUE DE COOKIES</h1>
<p><strong>{{site_web}}</strong> – Éditeur&nbsp;: {{editeur}}</p>
<h2>1. Qu'est-ce qu'un cookie&nbsp;?</h2>
<p>Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web.</p>
<h2>2. Cookies utilisés sur {{site_web}}</h2>
<table border="1" style="width:100%;border-collapse:collapse;">
<thead><tr><th>Catégorie</th><th>Finalité</th><th>Durée</th></tr></thead>
<tbody>
<tr><td>Essentiels</td><td>Fonctionnement du site</td><td>Session</td></tr>
<tr><td>Analytiques</td><td>Mesure d'audience</td><td>13 mois</td></tr>
<tr><td>Marketing</td><td>Publicité ciblée</td><td>13 mois</td></tr>
</tbody>
</table>
<h2>3. Gestion du consentement</h2>
<p>Vous pouvez gérer vos préférences via {{outil_consentement}} ou les paramètres de votre navigateur.</p>`,
  },
  {
    code: 'tel_contrat_hebergement_cloud',
    name: "Contrat d'hébergement cloud",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 15000,
    description: "Contrat d'hébergement de services en nuage (IaaS/PaaS/SaaS) avec engagements de niveau de service.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'fournisseur_cloud', label: "Fournisseur cloud", type: 'text', required: true },
      { key: 'type_service', label: "Type de service (IaaS/PaaS/SaaS)", type: 'text', required: true },
      { key: 'region_hebergement', label: "Région d'hébergement", type: 'text', required: true },
      { key: 'cout_mensuel', label: "Coût mensuel HT (€)", type: 'number', required: true },
      { key: 'disponibilite_garantie', label: "Disponibilité garantie (%)", type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT D'HÉBERGEMENT CLOUD</h1>
<p>Entre <strong>{{client}}</strong> et <strong>{{fournisseur_cloud}}</strong>.</p>
<h2>Article 1 – Services fournis</h2>
<p>Type de service&nbsp;: <strong>{{type_service}}</strong> | Région&nbsp;: {{region_hebergement}}</p>
<h2>Article 2 – Niveau de service</h2>
<p>Disponibilité garantie&nbsp;: <strong>{{disponibilite_garantie}}&nbsp;%</strong> par mois calendaire.</p>
<h2>Article 3 – Tarification</h2>
<p>Coût mensuel&nbsp;: <strong>{{cout_mensuel}}&nbsp;€ HT</strong></p>
<h2>Article 4 – Sécurité et conformité</h2>
<p>{{fournisseur_cloud}} s'engage à maintenir les certifications ISO 27001, SOC 2 Type II et la conformité RGPD.</p>
<h2>Article 5 – Réversibilité</h2>
<p>Le Client dispose d'un droit à la portabilité et à la récupération de ses données dans un format standard.</p>`,
  },
  {
    code: 'tel_sla_cloud',
    name: "SLA cloud",
    category: 'juridique_admin',
    price: 4500,
    priceMax: 12000,
    description: "Accord de niveau de service spécifique aux infrastructures et services cloud.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'services_couverts', label: "Services couverts", type: 'textarea', required: true },
      { key: 'uptime_garanti', label: "Uptime garanti (%)", type: 'number', required: true },
      { key: 'credit_service', label: "Crédit de service en cas de violation (%)", type: 'number', required: true },
    ]),
    body: `<h1>SLA CLOUD – ACCORD DE NIVEAU DE SERVICE</h1>
<p><strong>{{client}}</strong> / <strong>{{fournisseur}}</strong></p>
<h2>1. Services couverts</h2>
<p>{{services_couverts}}</p>
<h2>2. Engagement de disponibilité</h2>
<p>Uptime garanti&nbsp;: <strong>{{uptime_garanti}}&nbsp;%</strong> mesuré mensuellement.</p>
<h2>3. Crédits de service</h2>
<table border="1" style="width:100%;border-collapse:collapse;">
<thead><tr><th>Uptime mensuel</th><th>Crédit</th></tr></thead>
<tbody>
<tr><td>&lt; {{uptime_garanti}}&nbsp;% et &ge; 99&nbsp;%</td><td>{{credit_service}}&nbsp;% du mensuel</td></tr>
<tr><td>&lt; 99&nbsp;% et &ge; 95&nbsp;%</td><td>{{credit_service}}×2&nbsp;% du mensuel</td></tr>
<tr><td>&lt; 95&nbsp;%</td><td>{{credit_service}}×4&nbsp;% du mensuel</td></tr>
</tbody>
</table>`,
  },
  {
    code: 'tel_plan_migration_si',
    name: "Plan de migration SI",
    category: 'juridique_admin',
    price: 7500,
    priceMax: 22000,
    description: "Plan détaillé de migration des systèmes d'information, incluant périmètre, phases, risques et gouvernance.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 53,
    fieldsJson: F([
      { key: 'organisation', label: "Organisation", type: 'text', required: true },
      { key: 'systeme_source', label: "Système source", type: 'text', required: true },
      { key: 'systeme_cible', label: "Système cible", type: 'text', required: true },
      { key: 'chef_projet', label: "Chef de projet", type: 'text', required: true },
      { key: 'date_debut_migration', label: "Date de début de migration", type: 'date', required: true },
      { key: 'date_fin_migration', label: "Date de fin de migration", type: 'date', required: true },
    ]),
    body: `<h1>PLAN DE MIGRATION SI</h1>
<p><strong>{{organisation}}</strong> | Chef de projet&nbsp;: {{chef_projet}}</p>
<h2>1. Périmètre</h2>
<p>Migration de <strong>{{systeme_source}}</strong> vers <strong>{{systeme_cible}}</strong></p>
<p>Période&nbsp;: du {{date_debut_migration}} au {{date_fin_migration}}</p>
<h2>2. Phases de migration</h2>
<ol><li><strong>Phase 1 – Analyse</strong>&nbsp;: inventaire, cartographie, analyse d'impact</li><li><strong>Phase 2 – Préparation</strong>&nbsp;: paramétrage du système cible, reprise de données</li><li><strong>Phase 3 – Pilote</strong>&nbsp;: migration d'un sous-ensemble représentatif</li><li><strong>Phase 4 – Bascule</strong>&nbsp;: migration complète et validation</li><li><strong>Phase 5 – Stabilisation</strong>&nbsp;: support renforcé et optimisation</li></ol>
<h2>3. Gestion des risques</h2>
<p>Un plan de retour arrière est défini pour chaque phase critique.</p>`,
  },
  {
    code: 'tel_charte_reseaux_sociaux',
    name: "Charte réseaux sociaux",
    category: 'juridique_admin',
    price: 2000,
    priceMax: 5500,
    description: "Charte d'utilisation des réseaux sociaux pour les collaborateurs, définissant les bonnes pratiques et les règles de prise de parole.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise", type: 'text', required: true },
      { key: 'date_entree_vigueur', label: "Date d'entrée en vigueur", type: 'date', required: true },
      { key: 'responsable_communication', label: "Responsable communication", type: 'text', required: false },
    ]),
    body: `<h1>CHARTE RÉSEAUX SOCIAUX</h1>
<p><strong>{{entreprise}}</strong> – En vigueur depuis le {{date_entree_vigueur}}</p>
<h2>1. Objectifs</h2>
<p>Cette charte définit les règles d'utilisation des réseaux sociaux par les collaborateurs de {{entreprise}}, à titre professionnel comme personnel lorsque l'entreprise est mentionnée.</p>
<h2>2. Règles générales</h2>
<ul><li>Respecter la confidentialité des informations internes</li><li>Ne pas dénigrer l'entreprise, ses produits ou ses concurrents</li><li>Préciser que les opinions exprimées n'engagent que leur auteur</li><li>Respecter le droit d'auteur et les droits à l'image</li></ul>
<h2>3. Prise de parole officielle</h2>
<p>Toute prise de parole officielle au nom de {{entreprise}} doit être validée par {{responsable_communication}}.</p>`,
  },
  {
    code: 'tel_procedure_gestion_acces',
    name: "Procédure de gestion des accès",
    category: 'juridique_admin',
    price: 3500,
    priceMax: 9500,
    description: "Procédure de gestion du cycle de vie des accès aux systèmes d'information (création, modification, révocation).",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'organisation', label: "Organisation", type: 'text', required: true },
      { key: 'responsable_iam', label: "Responsable IAM", type: 'text', required: true },
      { key: 'outil_iam', label: "Outil IAM utilisé", type: 'text', required: false },
      { key: 'delai_revocation', label: "Délai de révocation après départ (heures)", type: 'number', required: true },
    ]),
    body: `<h1>PROCÉDURE DE GESTION DES ACCÈS</h1>
<p><strong>{{organisation}}</strong> | Responsable IAM&nbsp;: {{responsable_iam}}</p>
<h2>1. Création des accès</h2>
<p>Toute demande d'accès doit être validée par le manager direct et transmise au responsable IAM via {{outil_iam}}. L'accès est créé selon le principe du moindre privilège.</p>
<h2>2. Modification des accès</h2>
<p>Toute évolution de poste entraîne une révision des droits dans les 48&nbsp;heures.</p>
<h2>3. Révocation des accès</h2>
<p>En cas de départ, tous les accès doivent être révoqués dans les <strong>{{delai_revocation}}&nbsp;heures</strong> suivant la notification RH.</p>
<h2>4. Revue des accès</h2>
<p>Une revue trimestrielle des accès est effectuée pour valider leur adéquation avec les fonctions actuelles.</p>`,
  },

  // ── 15 Médias & PI ─────────────────────────────────────────────────────────
  {
    code: 'med2_cession_droits_auteur',
    name: "Cession de droits d'auteur",
    category: 'juridique_admin',
    price: 3500,
    priceMax: 10000,
    description: "Contrat de cession totale ou partielle des droits d'auteur sur une œuvre originale.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 79,
    fieldsJson: F([
      { key: 'cedant', label: "Cédant (auteur)", type: 'text', required: true },
      { key: 'cessionnaire', label: "Cessionnaire", type: 'text', required: true },
      { key: 'oeuvre', label: "Description de l'œuvre", type: 'textarea', required: true },
      { key: 'droits_cedes', label: "Droits cédés (reproduction/représentation/adaptation)", type: 'text', required: true },
      { key: 'territoire', label: "Territoire", type: 'text', required: true },
      { key: 'duree', label: "Durée de cession", type: 'text', required: true },
      { key: 'remuneration', label: "Rémunération (€)", type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT DE CESSION DE DROITS D'AUTEUR</h1>
<p>Entre <strong>{{cedant}}</strong> (le Cédant) et <strong>{{cessionnaire}}</strong> (le Cessionnaire).</p>
<h2>Article 1 – Œuvre concernée</h2>
<p>{{oeuvre}}</p>
<h2>Article 2 – Droits cédés</h2>
<p>Le Cédant cède au Cessionnaire les droits suivants&nbsp;: <strong>{{droits_cedes}}</strong></p>
<h2>Article 3 – Étendue</h2>
<p>Territoire&nbsp;: {{territoire}} | Durée&nbsp;: {{duree}}</p>
<h2>Article 4 – Rémunération</h2>
<p>En contrepartie, le Cessionnaire versera la somme de <strong>{{remuneration}}&nbsp;€</strong>.</p>
<h2>Article 5 – Garanties</h2>
<p>Le Cédant garantit être le seul auteur de l'œuvre et disposer de l'intégralité des droits cédés.</p>`,
  },
  {
    code: 'med2_contrat_edition_litteraire',
    name: "Contrat d'édition littéraire",
    category: 'juridique_admin',
    price: 4500,
    priceMax: 13000,
    description: "Contrat d'édition entre un auteur et un éditeur pour la publication d'une œuvre littéraire.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'auteur', label: "Auteur", type: 'text', required: true },
      { key: 'editeur', label: "Éditeur", type: 'text', required: true },
      { key: 'titre_oeuvre', label: "Titre de l'œuvre", type: 'text', required: true },
      { key: 'tirage_initial', label: "Tirage initial (exemplaires)", type: 'number', required: true },
      { key: 'taux_royalties', label: "Taux de royalties (%)", type: 'number', required: true },
      { key: 'avance', label: "Avance sur droits (€)", type: 'number', required: false },
    ]),
    body: `<h1>CONTRAT D'ÉDITION LITTÉRAIRE</h1>
<p>Entre <strong>{{auteur}}</strong> (l'Auteur) et <strong>{{editeur}}</strong> (l'Éditeur).</p>
<h2>Article 1 – Objet</h2>
<p>L'Auteur cède à l'Éditeur le droit exclusif d'éditer l'œuvre intitulée <strong>«&nbsp;{{titre_oeuvre}}&nbsp;»</strong>.</p>
<h2>Article 2 – Édition</h2>
<p>Tirage initial&nbsp;: {{tirage_initial}}&nbsp;exemplaires. L'Éditeur s'engage à maintenir l'ouvrage disponible.</p>
<h2>Article 3 – Rémunération</h2>
<p>Royalties&nbsp;: <strong>{{taux_royalties}}&nbsp;%</strong> du prix de vente public HT. Avance sur droits&nbsp;: {{avance}}&nbsp;€.</p>
<h2>Article 4 – Droits moraux</h2>
<p>L'Auteur conserve ses droits moraux, notamment le droit à l'intégrité de l'œuvre.</p>`,
  },
  {
    code: 'med2_contrat_licence_marque',
    name: "Contrat de licence de marque",
    category: 'juridique_admin',
    price: 5500,
    priceMax: 16000,
    description: "Contrat de licence autorisant un tiers à utiliser une marque déposée selon des conditions définies.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'concedant', label: "Concédant (propriétaire de la marque)", type: 'text', required: true },
      { key: 'licencie', label: "Licencié", type: 'text', required: true },
      { key: 'marque', label: "Marque concernée", type: 'text', required: true },
      { key: 'numero_depot', label: "Numéro de dépôt INPI", type: 'text', required: false },
      { key: 'territoire', label: "Territoire de la licence", type: 'text', required: true },
      { key: 'redevance', label: "Redevance annuelle HT (€)", type: 'number', required: true },
      { key: 'exclusivite', label: "Exclusivité (oui/non)", type: 'text', required: true },
    ]),
    body: `<h1>CONTRAT DE LICENCE DE MARQUE</h1>
<p>Entre <strong>{{concedant}}</strong> (le Concédant) et <strong>{{licencie}}</strong> (le Licencié).</p>
<h2>Article 1 – Marque licenciée</h2>
<p>Marque <strong>{{marque}}</strong> (n°&nbsp;{{numero_depot}} INPI)</p>
<h2>Article 2 – Étendue de la licence</h2>
<p>Territoire&nbsp;: {{territoire}} | Exclusivité&nbsp;: {{exclusivite}}</p>
<h2>Article 3 – Redevances</h2>
<p>Le Licencié versera une redevance annuelle de <strong>{{redevance}}&nbsp;€ HT</strong>.</p>
<h2>Article 4 – Contrôle qualité</h2>
<p>Le Concédant se réserve le droit de contrôler que les produits/services commercialisés sous la marque respectent ses standards de qualité.</p>`,
  },
  {
    code: 'med2_contrat_coproduction_audiovisuelle',
    name: "Contrat de coproduction audiovisuelle",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 24000,
    description: "Contrat de coproduction entre producteurs pour la réalisation d'une œuvre audiovisuelle.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'producteur_principal', label: "Producteur principal", type: 'text', required: true },
      { key: 'coproducteur', label: "Coproducteur", type: 'text', required: true },
      { key: 'titre_oeuvre', label: "Titre de l'œuvre", type: 'text', required: true },
      { key: 'budget_total', label: "Budget total HT (€)", type: 'number', required: true },
      { key: 'part_coproducteur', label: "Part du coproducteur (%)", type: 'number', required: true },
      { key: 'delai_livraison', label: "Délai de livraison", type: 'text', required: true },
    ]),
    body: `<h1>CONTRAT DE COPRODUCTION AUDIOVISUELLE</h1>
<p>Entre <strong>{{producteur_principal}}</strong> et <strong>{{coproducteur}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Les parties s'engagent à coproduire l'œuvre audiovisuelle intitulée <strong>«&nbsp;{{titre_oeuvre}}&nbsp;»</strong>.</p>
<h2>Article 2 – Apports</h2>
<p>Budget total&nbsp;: {{budget_total}}&nbsp;€ HT. Part du coproducteur&nbsp;: {{part_coproducteur}}&nbsp;%</p>
<h2>Article 3 – Droits</h2>
<p>Les droits d'exploitation sont répartis proportionnellement aux apports de chaque partie.</p>
<h2>Article 4 – Livraison</h2>
<p>L'œuvre sera livrée au plus tard le {{delai_livraison}}.</p>`,
  },
  {
    code: 'med2_contrat_photographe',
    name: "Contrat photographe",
    category: 'juridique_admin',
    price: 2500,
    priceMax: 7000,
    description: "Contrat de prestation photographique incluant cession des droits sur les images produites.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'photographe', label: "Photographe", type: 'text', required: true },
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'type_prestation', label: "Type de prestation", type: 'text', required: true },
      { key: 'date_prise_vue', label: "Date de prise de vue", type: 'date', required: true },
      { key: 'honoraires', label: "Honoraires HT (€)", type: 'number', required: true },
      { key: 'usage_autorise', label: "Usage autorisé des photos", type: 'textarea', required: true },
    ]),
    body: `<h1>CONTRAT DE PRESTATION PHOTOGRAPHIQUE</h1>
<p>Entre <strong>{{photographe}}</strong> (le Photographe) et <strong>{{client}}</strong> (le Client).</p>
<h2>Article 1 – Prestation</h2>
<p>Type de prestation&nbsp;: <strong>{{type_prestation}}</strong> | Date&nbsp;: {{date_prise_vue}}</p>
<h2>Article 2 – Droits cédés</h2>
<p>Le Photographe cède au Client le droit d'utiliser les images pour&nbsp;: {{usage_autorise}}</p>
<h2>Article 3 – Crédit photo</h2>
<p>Le Client s'engage à mentionner le crédit photo «&nbsp;© {{photographe}}&nbsp;» lors de toute publication.</p>
<h2>Article 4 – Honoraires</h2>
<p>Honoraires&nbsp;: <strong>{{honoraires}}&nbsp;€ HT</strong></p>`,
  },
  {
    code: 'med2_accord_co_branding',
    name: "Accord de co-branding",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 14000,
    description: "Accord de co-branding définissant les conditions d'association de deux marques dans le cadre d'une opération commune.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'marque_a', label: "Marque A", type: 'text', required: true },
      { key: 'marque_b', label: "Marque B", type: 'text', required: true },
      { key: 'operation', label: "Opération de co-branding", type: 'text', required: true },
      { key: 'duree', label: "Durée de l'opération", type: 'text', required: true },
      { key: 'territoire', label: "Territoire", type: 'text', required: true },
    ]),
    body: `<h1>ACCORD DE CO-BRANDING</h1>
<p>Entre <strong>{{marque_a}}</strong> et <strong>{{marque_b}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Les parties s'associent pour l'opération de co-branding suivante&nbsp;: <strong>{{operation}}</strong></p>
<h2>Article 2 – Utilisation des marques</h2>
<p>Chaque partie autorise l'autre à utiliser sa marque dans le cadre exclusif de l'opération définie, sur le territoire {{territoire}} pour une durée de {{duree}}.</p>
<h2>Article 3 – Standards de qualité</h2>
<p>Toute utilisation des marques doit respecter les chartes graphiques respectives des parties.</p>
<h2>Article 4 – Résiliation</h2>
<p>En cas de non-respect des standards, la partie lésée peut résilier l'accord sous 15&nbsp;jours.</p>`,
  },
  {
    code: 'med2_contrat_prestation_creative',
    name: "Contrat de prestation créative",
    category: 'juridique_admin',
    price: 3000,
    priceMax: 8500,
    description: "Contrat de prestation pour création de contenus créatifs (design, illustration, rédaction, etc.).",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'prestataire', label: "Prestataire créatif", type: 'text', required: true },
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'nature_prestation', label: "Nature de la prestation", type: 'text', required: true },
      { key: 'livrables', label: "Livrables attendus", type: 'textarea', required: true },
      { key: 'honoraires', label: "Honoraires HT (€)", type: 'number', required: true },
      { key: 'delai', label: "Délai de livraison", type: 'text', required: true },
      { key: 'nombre_allers_retours', label: "Nombre d'allers-retours inclus", type: 'number', required: false },
    ]),
    body: `<h1>CONTRAT DE PRESTATION CRÉATIVE</h1>
<p>Entre <strong>{{prestataire}}</strong> et <strong>{{client}}</strong>.</p>
<h2>Article 1 – Prestation</h2>
<p>Nature&nbsp;: <strong>{{nature_prestation}}</strong></p>
<h2>Article 2 – Livrables</h2>
<p>{{livrables}}</p>
<h2>Article 3 – Allers-retours</h2>
<p>{{nombre_allers_retours}}&nbsp;cycle(s) de révision inclus. Les révisions supplémentaires feront l'objet d'une facturation complémentaire.</p>
<h2>Article 4 – Délai et honoraires</h2>
<p>Livraison&nbsp;: {{delai}} | Honoraires&nbsp;: <strong>{{honoraires}}&nbsp;€ HT</strong></p>`,
  },
  {
    code: 'med2_droits_a_image',
    name: "Droits à l'image",
    category: 'juridique_admin',
    price: 1500,
    priceMax: 4500,
    description: "Autorisation de droit à l'image permettant l'utilisation de la représentation d'une personne physique.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 84,
    fieldsJson: F([
      { key: 'modele', label: "Nom du modèle / de la personne", type: 'text', required: true },
      { key: 'beneficiaire', label: "Bénéficiaire de l'autorisation", type: 'text', required: true },
      { key: 'contexte', label: "Contexte de la prise de vue", type: 'text', required: true },
      { key: 'supports_utilisation', label: "Supports d'utilisation autorisés", type: 'textarea', required: true },
      { key: 'duree', label: "Durée de l'autorisation", type: 'text', required: true },
      { key: 'remuneration', label: "Rémunération ou mention gratuit", type: 'text', required: true },
    ]),
    body: `<h1>AUTORISATION DE DROIT À L'IMAGE</h1>
<p>Je soussigné(e) <strong>{{modele}}</strong> autorise <strong>{{beneficiaire}}</strong> à reproduire et diffuser mon image.</p>
<h2>Contexte</h2>
<p>{{contexte}}</p>
<h2>Supports autorisés</h2>
<p>{{supports_utilisation}}</p>
<h2>Durée</h2>
<p>{{duree}}</p>
<h2>Contrepartie</h2>
<p>{{remuneration}}</p>
<p><em>Fait en deux exemplaires originaux.</em></p>`,
  },
  {
    code: 'med2_cession_nom_de_domaine',
    name: "Cession de nom de domaine",
    category: 'juridique_admin',
    price: 2500,
    priceMax: 7000,
    description: "Contrat de cession d'un nom de domaine entre cédant et cessionnaire.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'cedant', label: "Cédant", type: 'text', required: true },
      { key: 'cessionnaire', label: "Cessionnaire", type: 'text', required: true },
      { key: 'nom_domaine', label: "Nom de domaine", type: 'text', required: true },
      { key: 'prix_cession', label: "Prix de cession HT (€)", type: 'number', required: true },
      { key: 'date_transfert', label: "Date de transfert souhaitée", type: 'date', required: false },
    ]),
    body: `<h1>CONTRAT DE CESSION DE NOM DE DOMAINE</h1>
<p>Entre <strong>{{cedant}}</strong> et <strong>{{cessionnaire}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Le Cédant cède au Cessionnaire le nom de domaine <strong>{{nom_domaine}}</strong>.</p>
<h2>Article 2 – Prix</h2>
<p>Prix de cession&nbsp;: <strong>{{prix_cession}}&nbsp;€ HT</strong>, payable à la signature.</p>
<h2>Article 3 – Transfert</h2>
<p>Le transfert technique sera effectué au plus tard le {{date_transfert}} après réception du paiement.</p>
<h2>Article 4 – Garanties</h2>
<p>Le Cédant garantit être le titulaire légitime du nom de domaine et qu'il ne fait l'objet d'aucun litige.</p>`,
  },
  {
    code: 'med2_contrat_distribution_musicale',
    name: "Contrat de distribution musicale",
    category: 'juridique_admin',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de distribution physique et numérique d'enregistrements musicaux.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'artiste', label: "Artiste / Label", type: 'text', required: true },
      { key: 'distributeur', label: "Distributeur", type: 'text', required: true },
      { key: 'catalogue', label: "Catalogue concerné", type: 'text', required: true },
      { key: 'territoire', label: "Territoire de distribution", type: 'text', required: true },
      { key: 'taux_royalties_numerique', label: "Taux royalties numérique (%)", type: 'number', required: true },
      { key: 'taux_royalties_physique', label: "Taux royalties physique (%)", type: 'number', required: false },
      { key: 'duree_contrat', label: "Durée du contrat (années)", type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT DE DISTRIBUTION MUSICALE</h1>
<p>Entre <strong>{{artiste}}</strong> et <strong>{{distributeur}}</strong>.</p>
<h2>Article 1 – Catalogue</h2>
<p>{{catalogue}} sur le territoire&nbsp;: {{territoire}}</p>
<h2>Article 2 – Durée</h2>
<p>{{duree_contrat}}&nbsp;an(s), renouvelable par tacite reconduction.</p>
<h2>Article 3 – Royalties</h2>
<ul><li>Ventes numériques&nbsp;: {{taux_royalties_numerique}}&nbsp;%</li><li>Ventes physiques&nbsp;: {{taux_royalties_physique}}&nbsp;%</li></ul>
<h2>Article 4 – Reddition de comptes</h2>
<p>Le Distributeur fournit un état des ventes semestriel accompagné du règlement correspondant.</p>`,
  },
  {
    code: 'med2_accord_synchro_musicale',
    name: "Accord de synchronisation musicale",
    category: 'juridique_admin',
    price: 3500,
    priceMax: 10000,
    description: "Accord autorisant la synchronisation d'une œuvre musicale avec des images (film, publicité, jeu vidéo).",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 54,
    fieldsJson: F([
      { key: 'ayant_droit', label: "Ayant droit musical", type: 'text', required: true },
      { key: 'producteur', label: "Producteur audiovisuel", type: 'text', required: true },
      { key: 'oeuvre_musicale', label: "Œuvre musicale", type: 'text', required: true },
      { key: 'support_audiovisuel', label: "Support audiovisuel", type: 'text', required: true },
      { key: 'usage', label: "Usage (publicité/film/jeu vidéo/autre)", type: 'text', required: true },
      { key: 'redevance_synchro', label: "Redevance de synchronisation (€)", type: 'number', required: true },
    ]),
    body: `<h1>ACCORD DE SYNCHRONISATION MUSICALE</h1>
<p>Entre <strong>{{ayant_droit}}</strong> et <strong>{{producteur}}</strong>.</p>
<h2>Article 1 – Autorisation</h2>
<p>L'ayant droit autorise la synchronisation de l'œuvre <strong>«&nbsp;{{oeuvre_musicale}}&nbsp;»</strong> avec le support audiovisuel <strong>«&nbsp;{{support_audiovisuel}}&nbsp;»</strong>.</p>
<h2>Article 2 – Usage</h2>
<p>Usage autorisé&nbsp;: {{usage}}</p>
<h2>Article 3 – Rémunération</h2>
<p>Redevance de synchronisation&nbsp;: <strong>{{redevance_synchro}}&nbsp;€</strong>, forfait unique.</p>
<h2>Article 4 – Droits voisins</h2>
<p>Les droits des artistes-interprètes et des producteurs phonographiques font l'objet d'accords séparés.</p>`,
  },
  {
    code: 'med2_contrat_journaliste_pigiste',
    name: "Contrat journaliste pigiste",
    category: 'juridique_admin',
    price: 2000,
    priceMax: 5500,
    description: "Contrat de collaboration entre un journaliste pigiste et un organe de presse pour la fourniture d'articles.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'journaliste', label: "Journaliste", type: 'text', required: true },
      { key: 'media', label: "Organe de presse", type: 'text', required: true },
      { key: 'type_contenus', label: "Type de contenus fournis", type: 'text', required: true },
      { key: 'tarif_article', label: "Tarif par article HT (€)", type: 'number', required: true },
      { key: 'droits_cedes', label: "Droits cédés", type: 'text', required: true },
    ]),
    body: `<h1>CONTRAT DE PIGE JOURNALISTIQUE</h1>
<p>Entre <strong>{{journaliste}}</strong> (le Journaliste) et <strong>{{media}}</strong> (l'Éditeur).</p>
<h2>Article 1 – Objet</h2>
<p>Le Journaliste fournit à l'Éditeur des contenus de type <strong>{{type_contenus}}</strong> sur commande.</p>
<h2>Article 2 – Rémunération</h2>
<p>Tarif par article&nbsp;: <strong>{{tarif_article}}&nbsp;€ HT</strong>. La facturation intervient à la publication.</p>
<h2>Article 3 – Droits cédés</h2>
<p>{{droits_cedes}}</p>
<h2>Article 4 – Statut social</h2>
<p>Le Journaliste est présumé salarié au sens de l'article L7111-3 du Code du travail et bénéficie de la présomption de salariat.</p>`,
  },
  {
    code: 'med2_accord_representation_artistique',
    name: "Accord de représentation artistique",
    category: 'juridique_admin',
    price: 4000,
    priceMax: 11500,
    description: "Accord entre un artiste et son agent/manageur pour la représentation et la promotion de sa carrière.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'artiste', label: "Artiste", type: 'text', required: true },
      { key: 'agent', label: "Agent / Manageur", type: 'text', required: true },
      { key: 'domaine_representation', label: "Domaine de représentation", type: 'text', required: true },
      { key: 'commission', label: "Commission de l'agent (%)", type: 'number', required: true },
      { key: 'duree_mandat', label: "Durée du mandat (années)", type: 'number', required: true },
    ]),
    body: `<h1>ACCORD DE REPRÉSENTATION ARTISTIQUE</h1>
<p>Entre <strong>{{artiste}}</strong> (l'Artiste) et <strong>{{agent}}</strong> (l'Agent).</p>
<h2>Article 1 – Mandat</h2>
<p>L'Artiste confère à l'Agent un mandat d'intérêt commun pour le représenter dans le domaine&nbsp;: <strong>{{domaine_representation}}</strong>.</p>
<h2>Article 2 – Durée</h2>
<p>Durée du mandat&nbsp;: {{duree_mandat}}&nbsp;an(s)</p>
<h2>Article 3 – Commission</h2>
<p>L'Agent percevra une commission de <strong>{{commission}}&nbsp;%</strong> sur les revenus générés grâce à son intervention.</p>
<h2>Article 4 – Obligations de l'Agent</h2>
<p>L'Agent s'engage à déployer tous les efforts nécessaires pour développer la carrière de l'Artiste et à lui rendre compte régulièrement.</p>`,
  },
  {
    code: 'med2_contrat_realisation_video',
    name: "Contrat de réalisation vidéo",
    category: 'juridique_admin',
    price: 3500,
    priceMax: 10000,
    description: "Contrat de prestation pour la réalisation d'une vidéo (institutionnelle, publicitaire, corporate).",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'realisateur', label: "Réalisateur / Société de production", type: 'text', required: true },
      { key: 'client', label: "Client", type: 'text', required: true },
      { key: 'type_video', label: "Type de vidéo", type: 'text', required: true },
      { key: 'duree_video', label: "Durée de la vidéo (minutes)", type: 'number', required: true },
      { key: 'budget', label: "Budget HT (€)", type: 'number', required: true },
      { key: 'delai_livraison', label: "Délai de livraison", type: 'text', required: true },
    ]),
    body: `<h1>CONTRAT DE RÉALISATION VIDÉO</h1>
<p>Entre <strong>{{realisateur}}</strong> et <strong>{{client}}</strong>.</p>
<h2>Article 1 – Prestation</h2>
<p>Type de vidéo&nbsp;: <strong>{{type_video}}</strong> | Durée cible&nbsp;: {{duree_video}}&nbsp;min</p>
<h2>Article 2 – Livrables</h2>
<ul><li>Fichier master haute résolution</li><li>Version optimisée réseaux sociaux</li><li>Sous-titres si demandés</li></ul>
<h2>Article 3 – Budget et planning</h2>
<p>Budget&nbsp;: <strong>{{budget}}&nbsp;€ HT</strong> | Livraison&nbsp;: {{delai_livraison}}</p>
<h2>Article 4 – Droits</h2>
<p>Après paiement intégral, le Client dispose d'une licence exclusive d'exploitation de la vidéo sans limitation de durée.</p>`,
  },
  {
    code: 'med2_licence_logiciel_utilisateur_final',
    name: "Licence de logiciel utilisateur final (EULA)",
    category: 'juridique_admin',
    price: 3000,
    priceMax: 8500,
    description: "Contrat de licence utilisateur final (EULA) définissant les droits et restrictions d'utilisation d'un logiciel.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'editeur_logiciel', label: "Éditeur du logiciel", type: 'text', required: true },
      { key: 'nom_logiciel', label: "Nom du logiciel", type: 'text', required: true },
      { key: 'version', label: "Version", type: 'text', required: false },
      { key: 'type_licence', label: "Type de licence (monoposte/multiposte/flottante)", type: 'text', required: true },
      { key: 'prix_licence', label: "Prix de la licence HT (€)", type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT DE LICENCE UTILISATEUR FINAL (EULA)</h1>
<p><strong>{{nom_logiciel}}</strong> v{{version}} – Éditeur&nbsp;: {{editeur_logiciel}}</p>
<h2>Article 1 – Concession de licence</h2>
<p>L'Éditeur accorde à l'Utilisateur une licence <strong>{{type_licence}}</strong>, non exclusive et non transférable.</p>
<h2>Article 2 – Restrictions</h2>
<ul><li>Interdiction de copier, modifier ou décompiler le logiciel</li><li>Interdiction de sous-licencier ou céder la licence</li><li>Usage limité à l'usage interne de l'Utilisateur</li></ul>
<h2>Article 3 – Prix</h2>
<p>Prix de la licence&nbsp;: <strong>{{prix_licence}}&nbsp;€ HT</strong></p>
<h2>Article 4 – Résiliation</h2>
<p>La licence peut être résiliée par l'Éditeur en cas de violation des présentes conditions.</p>`,
  },

  // ── 15 Économie & Études ───────────────────────────────────────────────────
  {
    code: 'eco2_rapport_etude_marche_sectorielle',
    name: "Rapport d'étude de marché sectorielle",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 25000,
    description: "Rapport d'étude de marché sectorielle complet avec analyse de la demande, de l'offre et des tendances.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'secteur', label: "Secteur analysé", type: 'text', required: true },
      { key: 'zone_geographique', label: "Zone géographique", type: 'text', required: true },
      { key: 'periode_analyse', label: "Période d'analyse", type: 'text', required: true },
      { key: 'commanditaire', label: "Commanditaire de l'étude", type: 'text', required: false },
      { key: 'taille_marche', label: "Taille estimée du marché (M€)", type: 'number', required: false },
    ]),
    body: `<h1>RAPPORT D'ÉTUDE DE MARCHÉ SECTORIELLE</h1>
<p><strong>Secteur&nbsp;:</strong> {{secteur}} | <strong>Zone&nbsp;:</strong> {{zone_geographique}} | <strong>Période&nbsp;:</strong> {{periode_analyse}}</p>
<h2>Résumé exécutif</h2>
<p>Taille estimée du marché&nbsp;: {{taille_marche}}&nbsp;M€</p>
<h2>1. Analyse de la demande</h2>
<p>Identification des segments de clientèle, des besoins et des moteurs de croissance.</p>
<h2>2. Analyse de l'offre</h2>
<p>Cartographie des acteurs, parts de marché, positionnement et stratégies concurrentielles.</p>
<h2>3. Tendances et perspectives</h2>
<p>Évolutions réglementaires, technologiques et sociétales impactant le secteur {{secteur}}.</p>
<h2>4. Opportunités et risques</h2>
<p>Matrice des opportunités et risques identifiés pour les acteurs du marché.</p>`,
  },
  {
    code: 'eco2_analyse_5_forces_porter',
    name: "Analyse 5 forces de Porter",
    category: 'commercial_financier',
    price: 4500,
    priceMax: 13000,
    description: "Analyse stratégique selon le modèle des 5 forces de Porter pour évaluer l'intensité concurrentielle d'un secteur.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise / Organisation", type: 'text', required: true },
      { key: 'secteur', label: "Secteur d'activité", type: 'text', required: true },
      { key: 'date_analyse', label: "Date de l'analyse", type: 'date', required: true },
      { key: 'analyste', label: "Analyste", type: 'text', required: false },
    ]),
    body: `<h1>ANALYSE 5 FORCES DE PORTER</h1>
<p><strong>{{entreprise}}</strong> – Secteur&nbsp;: {{secteur}} | {{date_analyse}}</p>
<h2>Force 1 – Rivalité entre concurrents existants</h2>
<p>[Évaluation de l'intensité concurrentielle dans le secteur {{secteur}}]</p>
<h2>Force 2 – Menace des nouveaux entrants</h2>
<p>[Analyse des barrières à l'entrée : capitaux nécessaires, économies d'échelle, accès aux réseaux de distribution]</p>
<h2>Force 3 – Pouvoir de négociation des fournisseurs</h2>
<p>[Concentration des fournisseurs, coûts de changement, intégration verticale]</p>
<h2>Force 4 – Pouvoir de négociation des clients</h2>
<p>[Concentration des clients, sensibilité au prix, degré de différenciation]</p>
<h2>Force 5 – Menace des produits de substitution</h2>
<p>[Identification des substituts potentiels et analyse de leur attractivité]</p>
<h2>Conclusion</h2>
<p>Synthèse de l'attractivité du secteur et recommandations stratégiques pour {{entreprise}}.</p>`,
  },
  {
    code: 'eco2_analyse_swot_detaillee',
    name: "Analyse SWOT détaillée",
    category: 'commercial_financier',
    price: 3500,
    priceMax: 10000,
    description: "Analyse SWOT complète identifiant forces, faiblesses, opportunités et menaces, avec plan d'actions.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'organisation', label: "Organisation", type: 'text', required: true },
      { key: 'secteur', label: "Secteur", type: 'text', required: true },
      { key: 'forces', label: "Forces identifiées", type: 'textarea', required: true },
      { key: 'faiblesses', label: "Faiblesses identifiées", type: 'textarea', required: true },
      { key: 'opportunites', label: "Opportunités identifiées", type: 'textarea', required: true },
      { key: 'menaces', label: "Menaces identifiées", type: 'textarea', required: true },
    ]),
    body: `<h1>ANALYSE SWOT DÉTAILLÉE</h1>
<p><strong>{{organisation}}</strong> – Secteur&nbsp;: {{secteur}}</p>
<table border="1" style="width:100%;border-collapse:collapse;">
<thead><tr><th></th><th>Facteurs internes</th><th>Facteurs externes</th></tr></thead>
<tbody>
<tr><td><strong>Positif</strong></td><td><strong>Forces</strong><br>{{forces}}</td><td><strong>Opportunités</strong><br>{{opportunites}}</td></tr>
<tr><td><strong>Négatif</strong></td><td><strong>Faiblesses</strong><br>{{faiblesses}}</td><td><strong>Menaces</strong><br>{{menaces}}</td></tr>
</tbody>
</table>
<h2>Plan d'actions stratégiques</h2>
<ul><li><strong>SO (Forces + Opportunités)&nbsp;:</strong> Exploiter les forces pour saisir les opportunités</li><li><strong>ST (Forces + Menaces)&nbsp;:</strong> Utiliser les forces pour contrer les menaces</li><li><strong>WO (Faiblesses + Opportunités)&nbsp;:</strong> Réduire les faiblesses via les opportunités</li><li><strong>WT (Faiblesses + Menaces)&nbsp;:</strong> Stratégie défensive</li></ul>`,
  },
  {
    code: 'eco2_etude_faisabilite_economique',
    name: "Étude de faisabilité économique",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 20000,
    description: "Étude de faisabilité économique et financière pour évaluer la viabilité d'un projet ou d'un investissement.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'projet', label: "Projet", type: 'text', required: true },
      { key: 'porteur', label: "Porteur du projet", type: 'text', required: true },
      { key: 'investissement_initial', label: "Investissement initial (€)", type: 'number', required: true },
      { key: 'horizon_analyse', label: "Horizon d'analyse (années)", type: 'number', required: true },
      { key: 'taux_actualisation', label: "Taux d'actualisation (%)", type: 'number', required: true },
    ]),
    body: `<h1>ÉTUDE DE FAISABILITÉ ÉCONOMIQUE</h1>
<p><strong>Projet&nbsp;:</strong> {{projet}} | <strong>Porteur&nbsp;:</strong> {{porteur}}</p>
<h2>1. Présentation du projet</h2>
<p>Investissement initial&nbsp;: {{investissement_initial}}&nbsp;€ | Horizon&nbsp;: {{horizon_analyse}}&nbsp;ans</p>
<h2>2. Analyse du marché cible</h2>
<p>Évaluation de la taille de marché, de la demande potentielle et de la part de marché atteignable.</p>
<h2>3. Modèle économique</h2>
<p>Structure de revenus, de coûts variables et fixes, seuil de rentabilité.</p>
<h2>4. Indicateurs de rentabilité</h2>
<ul><li>VAN (taux d'actualisation&nbsp;: {{taux_actualisation}}&nbsp;%)</li><li>TRI</li><li>Délai de retour sur investissement</li></ul>
<h2>5. Analyse de sensibilité</h2>
<p>Scénarios pessimiste, central et optimiste.</p>`,
  },
  {
    code: 'eco2_tableau_bord_macroeconomique',
    name: "Tableau de bord macroéconomique",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 14000,
    description: "Tableau de bord synthétisant les principaux indicateurs macroéconomiques d'un pays ou d'une zone.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'zone_geographique', label: "Zone géographique", type: 'text', required: true },
      { key: 'periode', label: "Période de référence", type: 'text', required: true },
      { key: 'pib_croissance', label: "Croissance du PIB (%)", type: 'number', required: false },
      { key: 'inflation', label: "Taux d'inflation (%)", type: 'number', required: false },
      { key: 'chomage', label: "Taux de chômage (%)", type: 'number', required: false },
      { key: 'balance_commerciale', label: "Balance commerciale (Md€)", type: 'number', required: false },
    ]),
    body: `<h1>TABLEAU DE BORD MACROÉCONOMIQUE</h1>
<p><strong>Zone&nbsp;:</strong> {{zone_geographique}} | <strong>Période&nbsp;:</strong> {{periode}}</p>
<table border="1" style="width:100%;border-collapse:collapse;">
<thead><tr><th>Indicateur</th><th>Valeur</th><th>Tendance</th></tr></thead>
<tbody>
<tr><td>Croissance du PIB</td><td>{{pib_croissance}}&nbsp;%</td><td></td></tr>
<tr><td>Inflation</td><td>{{inflation}}&nbsp;%</td><td></td></tr>
<tr><td>Chômage</td><td>{{chomage}}&nbsp;%</td><td></td></tr>
<tr><td>Balance commerciale</td><td>{{balance_commerciale}}&nbsp;Md€</td><td></td></tr>
</tbody>
</table>
<h2>Commentaires</h2>
<p>Analyse des dynamiques économiques et des déséquilibres observés sur la période.</p>`,
  },
  {
    code: 'eco2_note_veille_concurrentielle',
    name: "Note de veille concurrentielle",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 11000,
    description: "Note de veille synthétisant les mouvements stratégiques des concurrents sur une période donnée.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'entreprise_emettrice', label: "Entreprise émettrice", type: 'text', required: true },
      { key: 'secteur', label: "Secteur surveillé", type: 'text', required: true },
      { key: 'periode', label: "Période couverte", type: 'text', required: true },
      { key: 'concurrents_surveilles', label: "Concurrents surveillés", type: 'textarea', required: true },
      { key: 'redacteur', label: "Rédacteur", type: 'text', required: false },
    ]),
    body: `<h1>NOTE DE VEILLE CONCURRENTIELLE</h1>
<p><strong>{{entreprise_emettrice}}</strong> | Secteur&nbsp;: {{secteur}} | Période&nbsp;: {{periode}} | Rédacteur&nbsp;: {{redacteur}}</p>
<h2>1. Concurrents sous surveillance</h2>
<p>{{concurrents_surveilles}}</p>
<h2>2. Faits marquants de la période</h2>
<ul><li>Lancements de produits / services</li><li>Mouvements tarifaires</li><li>Acquisitions et partenariats</li><li>Campagnes marketing notables</li></ul>
<h2>3. Analyse et implications</h2>
<p>Évaluation de l'impact des mouvements concurrentiels sur la position de {{entreprise_emettrice}}.</p>
<h2>4. Recommandations</h2>
<p>Actions à envisager en réponse aux évolutions concurrentielles identifiées.</p>`,
  },
  {
    code: 'eco2_analyse_competitivite',
    name: "Analyse de compétitivité",
    category: 'commercial_financier',
    price: 5500,
    priceMax: 16000,
    description: "Analyse multi-dimensionnelle de la compétitivité d'une entreprise ou d'un territoire.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'entite_analysee', label: "Entité analysée", type: 'text', required: true },
      { key: 'perimetre', label: "Périmètre de l'analyse", type: 'text', required: true },
      { key: 'referentiel', label: "Référentiel de comparaison", type: 'text', required: true },
      { key: 'date_analyse', label: "Date de l'analyse", type: 'date', required: true },
    ]),
    body: `<h1>ANALYSE DE COMPÉTITIVITÉ</h1>
<p><strong>{{entite_analysee}}</strong> | Périmètre&nbsp;: {{perimetre}} | Référentiel&nbsp;: {{referentiel}} | {{date_analyse}}</p>
<h2>1. Compétitivité-prix</h2>
<p>Positionnement tarifaire par rapport aux concurrents, coûts de production, marges.</p>
<h2>2. Compétitivité hors-prix</h2>
<p>Qualité, innovation, service client, marque, délais.</p>
<h2>3. Compétitivité structurelle</h2>
<p>Productivité, investissements R&amp;D, formation du capital humain, infrastructure numérique.</p>
<h2>4. Indicateurs synthétiques</h2>
<p>Matrice de positionnement concurrentiel et score global de compétitivité.</p>
<h2>5. Leviers d'amélioration</h2>
<p>Identification des 3 à 5 leviers prioritaires pour renforcer la compétitivité.</p>`,
  },
  {
    code: 'eco2_etude_impact_economique_local',
    name: "Étude d'impact économique local",
    category: 'commercial_financier',
    price: 7500,
    priceMax: 22000,
    description: "Étude mesurant l'impact économique d'un projet, d'un équipement ou d'un événement sur un territoire local.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 56,
    fieldsJson: F([
      { key: 'projet', label: "Projet / Équipement étudié", type: 'text', required: true },
      { key: 'territoire', label: "Territoire d'impact", type: 'text', required: true },
      { key: 'commanditaire', label: "Commanditaire", type: 'text', required: true },
      { key: 'emplois_directs', label: "Emplois directs créés", type: 'number', required: false },
      { key: 'retombees_economiques', label: "Retombées économiques estimées (M€)", type: 'number', required: false },
    ]),
    body: `<h1>ÉTUDE D'IMPACT ÉCONOMIQUE LOCAL</h1>
<p><strong>Projet&nbsp;:</strong> {{projet}} | <strong>Territoire&nbsp;:</strong> {{territoire}} | <strong>Commanditaire&nbsp;:</strong> {{commanditaire}}</p>
<h2>1. Méthodologie</h2>
<p>Approche par les effets directs, indirects et induits selon le modèle input-output.</p>
<h2>2. Impact direct</h2>
<ul><li>Emplois directs créés&nbsp;: {{emplois_directs}}</li><li>Retombées économiques directes&nbsp;: {{retombees_economiques}}&nbsp;M€</li></ul>
<h2>3. Impact indirect et induit</h2>
<p>Effets multiplicateurs sur la filière et l'économie résidentielle du territoire.</p>
<h2>4. Impacts non-marchands</h2>
<p>Externalités positives&nbsp;: attractivité territoriale, amélioration du cadre de vie, cohésion sociale.</p>`,
  },
  {
    code: 'eco2_plan_developpement_regional',
    name: "Plan de développement régional",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 25000,
    description: "Plan stratégique de développement économique régional définissant les priorités, les axes d'intervention et les indicateurs de suivi.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'region', label: "Région concernée", type: 'text', required: true },
      { key: 'horizon_planification', label: "Horizon de planification", type: 'text', required: true },
      { key: 'autorite', label: "Autorité régionale", type: 'text', required: true },
      { key: 'budget_global', label: "Budget global (M€)", type: 'number', required: false },
      { key: 'axes_prioritaires', label: "Axes prioritaires", type: 'textarea', required: true },
    ]),
    body: `<h1>PLAN DE DÉVELOPPEMENT RÉGIONAL</h1>
<p><strong>{{region}}</strong> | Autorité&nbsp;: {{autorite}} | Horizon&nbsp;: {{horizon_planification}}</p>
<h2>Vision stratégique</h2>
<p>Ce plan définit les orientations de développement économique de {{region}} pour {{horizon_planification}}.</p>
<h2>Axes prioritaires</h2>
<p>{{axes_prioritaires}}</p>
<h2>Gouvernance</h2>
<p>Un comité de pilotage réunissant les parties prenantes publiques et privées assure le suivi semestriel.</p>
<h2>Budget et financement</h2>
<p>Budget global&nbsp;: {{budget_global}}&nbsp;M€, mobilisant fonds régionaux, nationaux et européens.</p>
<h2>Indicateurs de performance</h2>
<p>Tableau de bord d'indicateurs économiques, sociaux et environnementaux mis à jour annuellement.</p>`,
  },
  {
    code: 'eco2_rapport_conjoncture',
    name: "Rapport de conjoncture",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 14000,
    description: "Rapport de conjoncture économique analysant la situation actuelle et les perspectives à court terme.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'zone_geographique', label: "Zone géographique", type: 'text', required: true },
      { key: 'periode', label: "Période analysée", type: 'text', required: true },
      { key: 'institution_emettrice', label: "Institution émettrice", type: 'text', required: true },
      { key: 'prevision_croissance', label: "Prévision de croissance (%)", type: 'number', required: false },
    ]),
    body: `<h1>RAPPORT DE CONJONCTURE</h1>
<p><strong>{{institution_emettrice}}</strong> | Zone&nbsp;: {{zone_geographique}} | Période&nbsp;: {{periode}}</p>
<h2>Synthèse conjoncturelle</h2>
<p>Prévision de croissance&nbsp;: <strong>{{prevision_croissance}}&nbsp;%</strong></p>
<h2>1. Environnement international</h2>
<p>Analyse du contexte mondial et de son impact sur l'économie analysée.</p>
<h2>2. Demande intérieure</h2>
<p>Consommation des ménages, investissement des entreprises, dépenses publiques.</p>
<h2>3. Marché du travail</h2>
<p>Évolution de l'emploi, du chômage et des salaires.</p>
<h2>4. Prix et inflation</h2>
<p>Dynamiques inflationnistes, politique monétaire et impact sur le pouvoir d'achat.</p>
<h2>5. Perspectives</h2>
<p>Scénarios d'évolution à 6 et 12&nbsp;mois, principaux risques identifiés.</p>`,
  },
  {
    code: 'eco2_note_sectorielle_investissement',
    name: "Note sectorielle investissement",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Note d'analyse sectorielle à destination des investisseurs, évaluant les opportunités et risques d'un secteur.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'secteur', label: "Secteur analysé", type: 'text', required: true },
      { key: 'analyste', label: "Analyste", type: 'text', required: true },
      { key: 'date_publication', label: "Date de publication", type: 'date', required: true },
      { key: 'recommandation', label: "Recommandation (Achat/Neutre/Vente)", type: 'text', required: true },
      { key: 'horizon_investissement', label: "Horizon d'investissement", type: 'text', required: true },
    ]),
    body: `<h1>NOTE SECTORIELLE INVESTISSEMENT</h1>
<p><strong>Secteur&nbsp;:</strong> {{secteur}} | <strong>Analyste&nbsp;:</strong> {{analyste}} | <strong>Publication&nbsp;:</strong> {{date_publication}}</p>
<p><strong>Recommandation&nbsp;: {{recommandation}}</strong> | Horizon&nbsp;: {{horizon_investissement}}</p>
<h2>Thèse d'investissement</h2>
<p>Synthèse des arguments en faveur ou contre un investissement dans le secteur {{secteur}}.</p>
<h2>Dynamiques sectorielles</h2>
<p>Croissance du marché, drivers de demande, barrières à l'entrée, cycle sectoriel.</p>
<h2>Valorisation</h2>
<p>Multiples sectoriels (EV/EBITDA, P/E), comparaison historique et inter-secteurs.</p>
<h2>Risques</h2>
<p>Risques réglementaires, technologiques, macroéconomiques et ESG.</p>
<p><em>Avertissement&nbsp;: cette note est fournie à titre informatif et ne constitue pas un conseil en investissement.</em></p>`,
  },
  {
    code: 'eco2_plan_restructuration_sectorielle',
    name: "Plan de restructuration sectorielle",
    category: 'commercial_financier',
    price: 8500,
    priceMax: 25000,
    description: "Plan de restructuration d'un secteur en difficulté définissant les mesures d'adaptation et de transformation.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 45,
    fieldsJson: F([
      { key: 'secteur', label: "Secteur concerné", type: 'text', required: true },
      { key: 'autorite_plan', label: "Autorité pilotant le plan", type: 'text', required: true },
      { key: 'diagnostic', label: "Diagnostic de la situation", type: 'textarea', required: true },
      { key: 'horizon', label: "Horizon du plan (années)", type: 'number', required: true },
      { key: 'budget_accompagnement', label: "Budget d'accompagnement (M€)", type: 'number', required: false },
    ]),
    body: `<h1>PLAN DE RESTRUCTURATION SECTORIELLE</h1>
<p><strong>Secteur&nbsp;:</strong> {{secteur}} | <strong>Pilote&nbsp;:</strong> {{autorite_plan}} | Horizon&nbsp;: {{horizon}}&nbsp;ans</p>
<h2>1. Diagnostic</h2>
<p>{{diagnostic}}</p>
<h2>2. Axes de restructuration</h2>
<ul><li>Consolidation de l'offre et restructuration des capacités</li><li>Montée en gamme et différenciation</li><li>Transition numérique et automatisation</li><li>Accompagnement social des salariés affectés</li></ul>
<h2>3. Gouvernance</h2>
<p>Comité de pilotage réunissant pouvoirs publics, représentants patronaux et syndicaux.</p>
<h2>4. Budget</h2>
<p>Budget d'accompagnement&nbsp;: {{budget_accompagnement}}&nbsp;M€</p>`,
  },
  {
    code: 'eco2_benchmark_sectoriel',
    name: "Benchmark sectoriel",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 17000,
    description: "Étude comparative (benchmark) des pratiques et performances des acteurs d'un secteur.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'commanditaire', label: "Commanditaire", type: 'text', required: true },
      { key: 'secteur', label: "Secteur benchmarké", type: 'text', required: true },
      { key: 'entreprises_panel', label: "Entreprises du panel", type: 'textarea', required: true },
      { key: 'criteres_benchmark', label: "Critères de benchmark", type: 'textarea', required: true },
      { key: 'date_benchmark', label: "Date du benchmark", type: 'date', required: true },
    ]),
    body: `<h1>BENCHMARK SECTORIEL</h1>
<p><strong>{{commanditaire}}</strong> | Secteur&nbsp;: {{secteur}} | {{date_benchmark}}</p>
<h2>1. Périmètre et méthodologie</h2>
<p><strong>Panel&nbsp;:</strong> {{entreprises_panel}}</p>
<p><strong>Critères analysés&nbsp;:</strong> {{criteres_benchmark}}</p>
<h2>2. Résultats comparatifs</h2>
<table border="1" style="width:100%;border-collapse:collapse;">
<thead><tr><th>Entreprise</th><th>Critère 1</th><th>Critère 2</th><th>Score global</th></tr></thead>
<tbody><tr><td colspan="4"><em>[Données à renseigner]</em></td></tr></tbody>
</table>
<h2>3. Meilleures pratiques identifiées</h2>
<p>Synthèse des pratiques d'excellence observées dans le panel.</p>
<h2>4. Recommandations</h2>
<p>Plan d'amélioration pour atteindre le niveau des leaders du secteur.</p>`,
  },
  {
    code: 'eco2_rapport_tendances_marche',
    name: "Rapport de tendances marché",
    category: 'commercial_financier',
    price: 5500,
    priceMax: 16000,
    description: "Rapport identifiant et analysant les tendances émergentes et structurantes d'un marché.",
    templateType: 'pdf',
    classe: 'STANDARD',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'marche', label: "Marché analysé", type: 'text', required: true },
      { key: 'horizon_tendances', label: "Horizon des tendances (années)", type: 'number', required: true },
      { key: 'institution', label: "Institution / Cabinet", type: 'text', required: true },
      { key: 'date_publication', label: "Date de publication", type: 'date', required: true },
    ]),
    body: `<h1>RAPPORT DE TENDANCES MARCHÉ</h1>
<p><strong>Marché&nbsp;:</strong> {{marche}} | Horizon&nbsp;: {{horizon_tendances}}&nbsp;ans | <strong>{{institution}}</strong> | {{date_publication}}</p>
<h2>Introduction</h2>
<p>Ce rapport identifie les tendances structurantes du marché {{marche}} à horizon {{horizon_tendances}}&nbsp;ans.</p>
<h2>Tendance 1 – [Titre]</h2>
<p>Description, signaux faibles, implications pour les acteurs du marché.</p>
<h2>Tendance 2 – [Titre]</h2>
<p>Description, signaux faibles, implications pour les acteurs du marché.</p>
<h2>Tendance 3 – [Titre]</h2>
<p>Description, signaux faibles, implications pour les acteurs du marché.</p>
<h2>Matrice d'impact / probabilité</h2>
<p>Classement des tendances selon leur probabilité de réalisation et leur impact potentiel.</p>
<h2>Implications stratégiques</h2>
<p>Recommandations pour anticiper et tirer parti des tendances identifiées.</p>`,
  },
  {
    code: 'eco2_etude_positionnement_concurrentiel',
    name: "Étude de positionnement concurrentiel",
    category: 'commercial_financier',
    price: 6500,
    priceMax: 19000,
    description: "Étude définissant et évaluant le positionnement concurrentiel d'une entreprise sur son marché.",
    templateType: 'pdf',
    classe: 'PREMIUM',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'entreprise', label: "Entreprise", type: 'text', required: true },
      { key: 'marche', label: "Marché cible", type: 'text', required: true },
      { key: 'segments_cibles', label: "Segments cibles", type: 'textarea', required: true },
      { key: 'proposition_valeur', label: "Proposition de valeur actuelle", type: 'textarea', required: true },
      { key: 'concurrents_directs', label: "Concurrents directs", type: 'textarea', required: true },
    ]),
    body: `<h1>ÉTUDE DE POSITIONNEMENT CONCURRENTIEL</h1>
<p><strong>{{entreprise}}</strong> | Marché&nbsp;: {{marche}}</p>
<h2>1. Segments cibles</h2>
<p>{{segments_cibles}}</p>
<h2>2. Proposition de valeur actuelle</h2>
<p>{{proposition_valeur}}</p>
<h2>3. Cartographie concurrentielle</h2>
<p><strong>Concurrents directs&nbsp;:</strong> {{concurrents_directs}}</p>
<p>Axes de différenciation&nbsp;: prix, qualité, innovation, service, image de marque.</p>
<h2>4. Analyse perceptuelle</h2>
<p>Carte de positionnement perceptuel situant {{entreprise}} par rapport à ses concurrents sur les attributs clés.</p>
<h2>5. Recommandations de repositionnement</h2>
<p>Axes de renforcement ou d'évolution du positionnement pour améliorer l'avantage concurrentiel.</p>`,
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
  console.log(`Batch 08b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
