import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates = [
  // ── SANTÉ (12) ──────────────────────────────────────────────────────────────
  {
    code: 'san2_protocole_soins_infirmiers',
    name: 'Protocole de Soins Infirmiers',
    category: 'sante',
    price: 3000,
    priceMax: 9000,
    description: 'Document standardisé décrivant les étapes et bonnes pratiques pour la réalisation des soins infirmiers.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'etablissement', label: 'Établissement de santé', type: 'text', required: true },
      { key: 'service', label: 'Service / Unité', type: 'text', required: true },
      { key: 'intitule_protocole', label: 'Intitulé du protocole', type: 'text', required: true },
      { key: 'redacteur', label: 'Rédacteur', type: 'text', required: true },
      { key: 'date_validation', label: 'Date de validation', type: 'date', required: true },
      { key: 'version', label: 'Version', type: 'text', required: false },
      { key: 'materiel_requis', label: 'Matériel requis', type: 'textarea', required: true },
      { key: 'etapes', label: 'Étapes du protocole', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>PROTOCOLE DE SOINS INFIRMIERS</h1>
  <h2>{{etablissement}} — {{service}}</h2>
  <p><strong>Intitulé :</strong> {{intitule_protocole}}</p>
  <p><strong>Version :</strong> {{version}} &nbsp;|&nbsp; <strong>Date de validation :</strong> {{date_validation}}</p>
  <p><strong>Rédacteur :</strong> {{redacteur}}</p>
  <h2>1. Matériel requis</h2>
  <p>{{materiel_requis}}</p>
  <h2>2. Étapes du protocole</h2>
  <p>{{etapes}}</p>
  <h2>3. Précautions et surveillance</h2>
  <p>Toute anomalie constatée durant l\'exécution du soin doit être signalée immédiatement au médecin responsable et consignée dans le dossier patient.</p>
  <h2>4. Validation</h2>
  <p>Approuvé par la Direction des Soins Infirmiers de {{etablissement}} le {{date_validation}}.</p>
</div>`,
  },
  {
    code: 'san2_dossier_patient',
    name: 'Dossier Patient',
    category: 'sante',
    price: 2500,
    priceMax: 7500,
    description: 'Fiche complète de suivi médical d\'un patient hospitalisé ou en consultation externe.',
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'nom_patient', label: 'Nom du patient', type: 'text', required: true },
      { key: 'date_naissance', label: 'Date de naissance', type: 'date', required: true },
      { key: 'sexe', label: 'Sexe', type: 'text', required: true },
      { key: 'numero_dossier', label: 'Numéro de dossier', type: 'text', required: true },
      { key: 'medecin_traitant', label: 'Médecin traitant', type: 'text', required: true },
      { key: 'antecedents', label: 'Antécédents médicaux', type: 'textarea', required: false },
      { key: 'diagnostic', label: 'Diagnostic principal', type: 'text', required: true },
    ]),
    body: `<div class="doc">
  <h1>DOSSIER PATIENT</h1>
  <p><strong>N° Dossier :</strong> {{numero_dossier}}</p>
  <h2>Identité du patient</h2>
  <p><strong>Nom :</strong> {{nom_patient}} &nbsp;|&nbsp; <strong>Date de naissance :</strong> {{date_naissance}} &nbsp;|&nbsp; <strong>Sexe :</strong> {{sexe}}</p>
  <h2>Informations médicales</h2>
  <p><strong>Médecin traitant :</strong> {{medecin_traitant}}</p>
  <p><strong>Diagnostic principal :</strong> {{diagnostic}}</p>
  <h2>Antécédents</h2>
  <p>{{antecedents}}</p>
  <h2>Suivi et observations</h2>
  <p>Les observations cliniques seront consignées au fil des consultations par le personnel soignant habilité.</p>
</div>`,
  },
  {
    code: 'san2_fiche_consultation',
    name: 'Fiche de Consultation Médicale',
    category: 'sante',
    price: 1500,
    priceMax: 4500,
    description: 'Fiche structurée de recueil des informations lors d\'une consultation médicale ambulatoire.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'patient', label: 'Nom du patient', type: 'text', required: true },
      { key: 'date_consultation', label: 'Date de consultation', type: 'date', required: true },
      { key: 'motif', label: 'Motif de consultation', type: 'textarea', required: true },
      { key: 'medecin', label: 'Médecin consultant', type: 'text', required: true },
      { key: 'constantes', label: 'Constantes vitales', type: 'textarea', required: false },
      { key: 'traitement', label: 'Traitement prescrit', type: 'textarea', required: false },
    ]),
    body: `<div class="doc">
  <h1>FICHE DE CONSULTATION MÉDICALE</h1>
  <p><strong>Date :</strong> {{date_consultation}} &nbsp;|&nbsp; <strong>Médecin :</strong> {{medecin}}</p>
  <h2>Patient</h2>
  <p>{{patient}}</p>
  <h2>Motif de consultation</h2>
  <p>{{motif}}</p>
  <h2>Constantes vitales</h2>
  <p>{{constantes}}</p>
  <h2>Traitement prescrit</h2>
  <p>{{traitement}}</p>
  <h2>Recommandations</h2>
  <p>Patient informé des consignes de suivi. Prochaine consultation à planifier selon évolution clinique.</p>
</div>`,
  },
  {
    code: 'san2_consentement_chirurgie',
    name: 'Consentement Éclairé Chirurgie',
    category: 'sante',
    price: 2000,
    priceMax: 6000,
    description: 'Formulaire de recueil du consentement éclairé du patient avant une intervention chirurgicale.',
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'patient', label: 'Nom et prénom du patient', type: 'text', required: true },
      { key: 'date_naissance_p', label: 'Date de naissance', type: 'date', required: true },
      { key: 'type_intervention', label: "Type d\'intervention", type: 'text', required: true },
      { key: 'chirurgien', label: 'Chirurgien responsable', type: 'text', required: true },
      { key: 'date_intervention', label: "Date de l\'intervention", type: 'date', required: true },
      { key: 'risques_expliques', label: 'Risques expliqués', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>FORMULAIRE DE CONSENTEMENT ÉCLAIRÉ</h1>
  <h2>Intervention chirurgicale</h2>
  <p>Je soussigné(e), <strong>{{patient}}</strong>, né(e) le <strong>{{date_naissance_p}}</strong>, déclare avoir été informé(e) par le Dr <strong>{{chirurgien}}</strong> des modalités, bénéfices et risques liés à l\'intervention suivante :</p>
  <p><strong>Type d\'intervention :</strong> {{type_intervention}}</p>
  <p><strong>Date prévue :</strong> {{date_intervention}}</p>
  <h2>Risques et informations communiqués</h2>
  <p>{{risques_expliques}}</p>
  <h2>Consentement</h2>
  <p>Ayant reçu toutes les informations nécessaires et compris les explications fournies, je consens librement à cette intervention.</p>
  <p>Signature du patient : ______________________ &nbsp;&nbsp; Date : ___________</p>
  <p>Signature du chirurgien : ______________________ &nbsp;&nbsp; Date : ___________</p>
</div>`,
  },
  {
    code: 'san2_rapport_activite_medicale',
    name: "Rapport d\'Activité Médicale",
    category: 'sante',
    price: 4000,
    priceMax: 12000,
    description: "Rapport périodique récapitulant l\'activité clinique et les indicateurs de performance d\'un service de santé.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'etablissement', label: 'Établissement', type: 'text', required: true },
      { key: 'service', label: 'Service', type: 'text', required: true },
      { key: 'periode', label: 'Période couverte', type: 'text', required: true },
      { key: 'responsable', label: 'Responsable médical', type: 'text', required: true },
      { key: 'nb_consultations', label: 'Nombre de consultations', type: 'number', required: true },
      { key: 'nb_hospitalisations', label: "Nombre d\'hospitalisations", type: 'number', required: true },
      { key: 'commentaires', label: 'Commentaires et perspectives', type: 'textarea', required: false },
    ]),
    body: `<div class="doc">
  <h1>RAPPORT D\'ACTIVITÉ MÉDICALE</h1>
  <h2>{{etablissement}} — {{service}}</h2>
  <p><strong>Période :</strong> {{periode}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{responsable}}</p>
  <h2>1. Activité de consultation</h2>
  <p>Nombre de consultations réalisées : <strong>{{nb_consultations}}</strong></p>
  <h2>2. Activité d\'hospitalisation</h2>
  <p>Nombre d\'hospitalisations enregistrées : <strong>{{nb_hospitalisations}}</strong></p>
  <h2>3. Indicateurs de qualité</h2>
  <p>Les indicateurs de satisfaction patient, délai moyen de prise en charge et taux de réhospitalisation seront joints en annexe.</p>
  <h2>4. Commentaires et perspectives</h2>
  <p>{{commentaires}}</p>
</div>`,
  },
  {
    code: 'san2_convention_garde_medicale',
    name: 'Convention de Garde Médicale',
    category: 'sante',
    price: 5000,
    priceMax: 15000,
    description: 'Convention organisant les modalités de garde médicale entre praticiens ou structures de santé.',
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'structure1', label: 'Structure / Praticien 1', type: 'text', required: true },
      { key: 'structure2', label: 'Structure / Praticien 2', type: 'text', required: true },
      { key: 'zone_couverture', label: 'Zone de couverture', type: 'text', required: true },
      { key: 'modalites_garde', label: 'Modalités de garde', type: 'textarea', required: true },
      { key: 'remuneration', label: 'Rémunération / Indemnisation', type: 'text', required: false },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div class="doc">
  <h1>CONVENTION DE GARDE MÉDICALE</h1>
  <p>Entre <strong>{{structure1}}</strong> et <strong>{{structure2}}</strong></p>
  <h2>Article 1 — Objet</h2>
  <p>La présente convention définit les modalités d\'organisation de la garde médicale sur la zone de couverture : <strong>{{zone_couverture}}</strong>.</p>
  <h2>Article 2 — Modalités de garde</h2>
  <p>{{modalites_garde}}</p>
  <h2>Article 3 — Rémunération</h2>
  <p>{{remuneration}}</p>
  <h2>Article 4 — Entrée en vigueur</h2>
  <p>La présente convention prend effet le <strong>{{date_debut}}</strong> et est conclue pour une durée renouvelable par tacite reconduction.</p>
  <p>Signatures des parties : ______________________</p>
</div>`,
  },
  {
    code: 'san2_contrat_medecin_liberal',
    name: 'Contrat de Médecin Libéral',
    category: 'sante',
    price: 8000,
    priceMax: 25000,
    description: 'Contrat encadrant l\'exercice liberal d\'un medecin au sein d\'une structure medicale privee.',
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'medecin', label: 'Nom du médecin', type: 'text', required: true },
      { key: 'specialite', label: 'Spécialité', type: 'text', required: true },
      { key: 'structure', label: 'Structure d\'accueil', type: 'text', required: true },
      { key: 'honoraires', label: 'Modalités d\'honoraires', type: 'textarea', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { key: 'duree', label: 'Durée du contrat', type: 'text', required: true },
    ]),
    body: `<div class="doc">
  <h1>CONTRAT DE MÉDECIN LIBÉRAL</h1>
  <p>Entre <strong>{{structure}}</strong> et le Dr <strong>{{medecin}}</strong>, spécialiste en <strong>{{specialite}}</strong></p>
  <h2>Article 1 — Objet</h2>
  <p>Le présent contrat régit les conditions d\'exercice libéral du Dr {{medecin}} au sein de {{structure}}, à compter du {{date_debut}} pour une durée de {{duree}}.</p>
  <h2>Article 2 — Honoraires</h2>
  <p>{{honoraires}}</p>
  <h2>Article 3 — Obligations des parties</h2>
  <p>Le médecin s\'engage à respecter le règlement intérieur de la structure et le code de déontologie médicale en vigueur.</p>
  <h2>Article 4 — Résiliation</h2>
  <p>Chaque partie peut résilier le présent contrat avec un préavis de trois (3) mois par lettre recommandée.</p>
  <p>Fait à _____________, le _____________. Signatures : ______________________</p>
</div>`,
  },
  {
    code: 'san2_fiche_sortie_hospitaliere',
    name: 'Fiche de Sortie Hospitalière',
    category: 'sante',
    price: 1500,
    priceMax: 4500,
    description: 'Document remis au patient lors de sa sortie, récapitulant le séjour et les consignes de suivi.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'patient', label: 'Nom du patient', type: 'text', required: true },
      { key: 'date_entree', label: "Date d\'entrée", type: 'date', required: true },
      { key: 'date_sortie', label: 'Date de sortie', type: 'date', required: true },
      { key: 'diagnostic_final', label: 'Diagnostic final', type: 'text', required: true },
      { key: 'traitement_sortie', label: 'Traitement à la sortie', type: 'textarea', required: true },
      { key: 'consignes', label: 'Consignes post-hospitalisation', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>FICHE DE SORTIE HOSPITALIÈRE</h1>
  <p><strong>Patient :</strong> {{patient}}</p>
  <p><strong>Date d\'entrée :</strong> {{date_entree}} &nbsp;|&nbsp; <strong>Date de sortie :</strong> {{date_sortie}}</p>
  <h2>Diagnostic final</h2>
  <p>{{diagnostic_final}}</p>
  <h2>Traitement prescrit à la sortie</h2>
  <p>{{traitement_sortie}}</p>
  <h2>Consignes de suivi</h2>
  <p>{{consignes}}</p>
  <h2>Prochaine consultation</h2>
  <p>Une consultation de suivi est recommandée dans les 15 jours suivant la sortie.</p>
  <p>Signature du médecin : ______________________</p>
</div>`,
  },
  {
    code: 'san2_plan_soins',
    name: 'Plan de Soins Individualisé',
    category: 'sante',
    price: 2000,
    priceMax: 6000,
    description: 'Plan détaillé des soins à prodiguer à un patient sur une période donnée, adapté à son état.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'patient', label: 'Nom du patient', type: 'text', required: true },
      { key: 'date_elaboration', label: "Date d\'élaboration", type: 'date', required: true },
      { key: 'objectifs_soins', label: 'Objectifs de soins', type: 'textarea', required: true },
      { key: 'interventions', label: 'Interventions infirmières', type: 'textarea', required: true },
      { key: 'frequence', label: 'Fréquence des soins', type: 'text', required: true },
      { key: 'infirmier_ref', label: 'Infirmier référent', type: 'text', required: true },
    ]),
    body: `<div class="doc">
  <h1>PLAN DE SOINS INDIVIDUALISÉ</h1>
  <p><strong>Patient :</strong> {{patient}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_elaboration}}</p>
  <p><strong>Infirmier référent :</strong> {{infirmier_ref}}</p>
  <h2>1. Objectifs de soins</h2>
  <p>{{objectifs_soins}}</p>
  <h2>2. Interventions infirmières planifiées</h2>
  <p>{{interventions}}</p>
  <h2>3. Fréquence</h2>
  <p>{{frequence}}</p>
  <h2>4. Évaluation</h2>
  <p>Ce plan sera réévalué à chaque changement de l\'état clinique du patient et au minimum une fois par semaine.</p>
</div>`,
  },
  {
    code: 'san2_attestation_arret_travail',
    name: "Attestation Médicale d\'Arrêt de Travail",
    category: 'sante',
    price: 1000,
    priceMax: 3000,
    description: 'Attestation médicale officielle justifiant une incapacité temporaire de travail pour un patient.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'patient', label: 'Nom du patient', type: 'text', required: true },
      { key: 'medecin', label: 'Médecin prescripteur', type: 'text', required: true },
      { key: 'date_debut_arret', label: "Début de l\'arrêt", type: 'date', required: true },
      { key: 'date_fin_arret', label: "Fin de l\'arrêt", type: 'date', required: true },
      { key: 'motif_medical', label: 'Motif médical (optionnel)', type: 'text', required: false },
    ]),
    body: `<div class="doc">
  <h1>ATTESTATION MÉDICALE D\'ARRÊT DE TRAVAIL</h1>
  <p>Je soussigné, Dr <strong>{{medecin}}</strong>, certifie que l\'état de santé de :</p>
  <p><strong>{{patient}}</strong></p>
  <p>nécessite un arrêt de travail du <strong>{{date_debut_arret}}</strong> au <strong>{{date_fin_arret}}</strong> inclus.</p>
  <p><strong>Motif :</strong> {{motif_medical}}</p>
  <p>Ce certificat est établi sur la base de l\'examen clinique réalisé ce jour et est destiné à être remis à l\'employeur ou à l\'organisme de sécurité sociale concerné.</p>
  <p>Fait le : _____________. Cachet et signature du médecin : ______________________</p>
</div>`,
  },
  {
    code: 'san2_compte_rendu_operatoire',
    name: 'Compte Rendu Opératoire',
    category: 'sante',
    price: 3000,
    priceMax: 9000,
    description: "Compte rendu détaillé rédigé par le chirurgien à l\'issue d\'une intervention chirurgicale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'patient', label: 'Nom du patient', type: 'text', required: true },
      { key: 'date_intervention', label: "Date de l\'intervention", type: 'date', required: true },
      { key: 'chirurgien', label: 'Chirurgien opérateur', type: 'text', required: true },
      { key: 'type_anesthesie', label: "Type d\'anesthésie", type: 'text', required: true },
      { key: 'description_acte', label: "Description de l\'acte opératoire", type: 'textarea', required: true },
      { key: 'suites_operatoires', label: 'Suites opératoires immédiates', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>COMPTE RENDU OPÉRATOIRE</h1>
  <p><strong>Patient :</strong> {{patient}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_intervention}}</p>
  <p><strong>Chirurgien opérateur :</strong> {{chirurgien}}</p>
  <p><strong>Type d\'anesthésie :</strong> {{type_anesthesie}}</p>
  <h2>Description de l\'acte opératoire</h2>
  <p>{{description_acte}}</p>
  <h2>Suites opératoires immédiates</h2>
  <p>{{suites_operatoires}}</p>
  <h2>Recommandations post-opératoires</h2>
  <p>Surveillance clinique rapprochée pendant 48 h. Pansement à renouveler selon protocole du service.</p>
  <p>Signature du chirurgien : ______________________</p>
</div>`,
  },
  {
    code: 'san2_fiche_pharmacie',
    name: 'Fiche de Dispensation Pharmaceutique',
    category: 'sante',
    price: 1500,
    priceMax: 4500,
    description: "Fiche de suivi de la dispensation des médicaments d\'un patient au niveau de la pharmacie hospitalière.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'patient', label: 'Nom du patient', type: 'text', required: true },
      { key: 'date_dispensation', label: 'Date de dispensation', type: 'date', required: true },
      { key: 'pharmacien', label: 'Pharmacien', type: 'text', required: true },
      { key: 'medicaments', label: 'Médicaments dispensés', type: 'textarea', required: true },
      { key: 'posologie', label: 'Posologie et instructions', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>FICHE DE DISPENSATION PHARMACEUTIQUE</h1>
  <p><strong>Patient :</strong> {{patient}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_dispensation}}</p>
  <p><strong>Pharmacien dispensateur :</strong> {{pharmacien}}</p>
  <h2>Médicaments dispensés</h2>
  <p>{{medicaments}}</p>
  <h2>Posologie et instructions</h2>
  <p>{{posologie}}</p>
  <h2>Conseils au patient</h2>
  <p>Le patient est informé de l\'importance du respect des doses et des horaires de prise. Tout effet indésirable doit être signalé sans délai.</p>
  <p>Signature du pharmacien : ______________________</p>
</div>`,
  },

  // ── ONG / ASSOCIATION (11) ───────────────────────────────────────────────────
  {
    code: 'ong2_rapport_bailleur',
    name: 'Rapport de Projet à Destination du Bailleur',
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Rapport narratif et financier présenté au bailleur de fonds à mi-parcours ou en fin de projet.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'ong', label: "Nom de l\'ONG", type: 'text', required: true },
      { key: 'bailleur', label: 'Bailleur de fonds', type: 'text', required: true },
      { key: 'titre_projet', label: 'Titre du projet', type: 'text', required: true },
      { key: 'periode_rapport', label: 'Période couverte', type: 'text', required: true },
      { key: 'resultats', label: 'Résultats obtenus', type: 'textarea', required: true },
      { key: 'depenses', label: 'Dépenses réalisées', type: 'textarea', required: true },
      { key: 'difficultes', label: 'Difficultés rencontrées', type: 'textarea', required: false },
    ]),
    body: `<div class="doc">
  <h1>RAPPORT DE PROJET — {{titre_projet}}</h1>
  <p><strong>Organisation :</strong> {{ong}} &nbsp;|&nbsp; <strong>Bailleur :</strong> {{bailleur}}</p>
  <p><strong>Période couverte :</strong> {{periode_rapport}}</p>
  <h2>1. Résultats obtenus</h2>
  <p>{{resultats}}</p>
  <h2>2. Rapport financier synthétique</h2>
  <p>{{depenses}}</p>
  <h2>3. Difficultés rencontrées et mesures correctives</h2>
  <p>{{difficultes}}</p>
  <h2>4. Perspectives</h2>
  <p>Les activités restantes seront exécutées conformément au plan de travail révisé joint en annexe.</p>
</div>`,
  },
  {
    code: 'ong2_cadre_logique',
    name: 'Cadre Logique de Projet',
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: "Matrice de cadre logique structurant la logique d\'intervention d\'un projet de développement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'titre_projet', label: 'Titre du projet', type: 'text', required: true },
      { key: 'objectif_global', label: 'Objectif global', type: 'textarea', required: true },
      { key: 'objectif_specifique', label: 'Objectif spécifique', type: 'textarea', required: true },
      { key: 'resultats_attendus', label: 'Résultats attendus', type: 'textarea', required: true },
      { key: 'indicateurs', label: 'Indicateurs de vérification', type: 'textarea', required: true },
      { key: 'hypotheses', label: 'Hypothèses / Risques', type: 'textarea', required: false },
    ]),
    body: `<div class="doc">
  <h1>CADRE LOGIQUE — {{titre_projet}}</h1>
  <h2>Objectif global</h2>
  <p>{{objectif_global}}</p>
  <h2>Objectif spécifique</h2>
  <p>{{objectif_specifique}}</p>
  <h2>Résultats attendus</h2>
  <p>{{resultats_attendus}}</p>
  <h2>Indicateurs objectivement vérifiables</h2>
  <p>{{indicateurs}}</p>
  <h2>Hypothèses et risques</h2>
  <p>{{hypotheses}}</p>
</div>`,
  },
  {
    code: 'ong2_plan_suivi_evaluation',
    name: 'Plan de Suivi-Évaluation',
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: "Document définissant la méthodologie et les outils de suivi-évaluation d\'un projet humanitaire ou de développement.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'projet', label: 'Titre du projet', type: 'text', required: true },
      { key: 'responsable_se', label: 'Responsable S&E', type: 'text', required: true },
      { key: 'frequence_collecte', label: 'Fréquence de collecte des données', type: 'text', required: true },
      { key: 'outils_collecte', label: 'Outils de collecte', type: 'textarea', required: true },
      { key: 'indicateurs_cles', label: 'Indicateurs clés', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>PLAN DE SUIVI-ÉVALUATION</h1>
  <h2>{{projet}}</h2>
  <p><strong>Responsable S&E :</strong> {{responsable_se}}</p>
  <h2>1. Indicateurs clés de performance</h2>
  <p>{{indicateurs_cles}}</p>
  <h2>2. Outils et méthodes de collecte</h2>
  <p>{{outils_collecte}}</p>
  <h2>3. Fréquence de collecte</h2>
  <p>{{frequence_collecte}}</p>
  <h2>4. Redevabilité et partage des données</h2>
  <p>Les données collectées seront partagées avec le bailleur selon les dispositions du contrat de subvention.</p>
</div>`,
  },
  {
    code: 'ong2_demande_subvention',
    name: 'Demande de Subvention',
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: 'Dossier de demande de subvention adressé à un bailleur institutionnel ou privé.',
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'ong', label: "Nom de l\'organisation", type: 'text', required: true },
      { key: 'bailleur_cible', label: 'Bailleur ciblé', type: 'text', required: true },
      { key: 'titre_projet', label: 'Titre du projet', type: 'text', required: true },
      { key: 'montant_sollicite', label: 'Montant sollicité (FCFA)', type: 'number', required: true },
      { key: 'zone_intervention', label: "Zone d\'intervention", type: 'text', required: true },
      { key: 'description_projet', label: 'Description du projet', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>DEMANDE DE SUBVENTION</h1>
  <p>À l\'attention de : <strong>{{bailleur_cible}}</strong></p>
  <p>De la part de : <strong>{{ong}}</strong></p>
  <h2>Projet soumis : {{titre_projet}}</h2>
  <p><strong>Zone d\'intervention :</strong> {{zone_intervention}}</p>
  <p><strong>Montant sollicité :</strong> {{montant_sollicite}} FCFA</p>
  <h2>Description du projet</h2>
  <p>{{description_projet}}</p>
  <h2>Engagement de l\'organisation</h2>
  <p>{{ong}} s\'engage à utiliser les fonds conformément au budget prévisionnel et à rendre compte de leur utilisation selon les exigences du bailleur.</p>
  <p>Signature du représentant légal : ______________________</p>
</div>`,
  },
  {
    code: 'ong2_convention_partenariat',
    name: 'Convention de Partenariat ONG',
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: 'Convention formalisant un partenariat opérationnel entre deux organisations de la société civile.',
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'ong_principale', label: 'ONG principale', type: 'text', required: true },
      { key: 'ong_partenaire', label: 'ONG partenaire', type: 'text', required: true },
      { key: 'objet_convention', label: 'Objet de la convention', type: 'textarea', required: true },
      { key: 'roles', label: 'Rôles et responsabilités', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée', type: 'text', required: true },
      { key: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div class="doc">
  <h1>CONVENTION DE PARTENARIAT</h1>
  <p>Entre <strong>{{ong_principale}}</strong> et <strong>{{ong_partenaire}}</strong></p>
  <p><strong>Signée le :</strong> {{date_signature}}</p>
  <h2>Article 1 — Objet</h2>
  <p>{{objet_convention}}</p>
  <h2>Article 2 — Rôles et responsabilités</h2>
  <p>{{roles}}</p>
  <h2>Article 3 — Durée</h2>
  <p>La présente convention est conclue pour une durée de {{duree}}.</p>
  <h2>Article 4 — Dispositions finales</h2>
  <p>Tout différend sera réglé à l\'amiable. Fait en deux exemplaires originaux.</p>
  <p>Pour {{ong_principale}} : ______________________ &nbsp;&nbsp; Pour {{ong_partenaire}} : ______________________</p>
</div>`,
  },
  {
    code: 'ong2_rapport_mission_terrain',
    name: 'Rapport de Mission Terrain',
    category: 'association',
    price: 3000,
    priceMax: 9000,
    description: "Compte rendu rédigé par une équipe terrain à l\'issue d\'une mission de collecte ou d\'intervention.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation', type: 'text', required: true },
      { key: 'equipe', label: 'Membres de l\'équipe', type: 'text', required: true },
      { key: 'zone_mission', label: 'Zone de mission', type: 'text', required: true },
      { key: 'dates_mission', label: 'Dates de la mission', type: 'text', required: true },
      { key: 'activites_realisees', label: 'Activités réalisées', type: 'textarea', required: true },
      { key: 'observations', label: 'Observations et recommandations', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>RAPPORT DE MISSION TERRAIN</h1>
  <p><strong>Organisation :</strong> {{organisation}}</p>
  <p><strong>Zone :</strong> {{zone_mission}} &nbsp;|&nbsp; <strong>Dates :</strong> {{dates_mission}}</p>
  <p><strong>Équipe :</strong> {{equipe}}</p>
  <h2>1. Activités réalisées</h2>
  <p>{{activites_realisees}}</p>
  <h2>2. Observations et recommandations</h2>
  <p>{{observations}}</p>
  <h2>3. Prochaines étapes</h2>
  <p>Les recommandations formulées feront l\'objet d\'un plan d\'action transmis à la coordination dans les 72 heures.</p>
</div>`,
  },
  {
    code: 'ong2_fiche_beneficiaire',
    name: 'Fiche d\'Enregistrement de Bénéficiaire',
    category: 'association',
    price: 1500,
    priceMax: 4500,
    description: 'Fiche standardisée pour l\'enregistrement et le suivi des bénéficiaires d\'un programme humanitaire.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 77,
    fieldsJson: F([
      { key: 'nom_beneficiaire', label: 'Nom du bénéficiaire', type: 'text', required: true },
      { key: 'date_naissance', label: 'Date de naissance', type: 'date', required: true },
      { key: 'sexe', label: 'Sexe', type: 'text', required: true },
      { key: 'localite', label: 'Localité', type: 'text', required: true },
      { key: 'programme', label: 'Programme d\'assistance', type: 'text', required: true },
      { key: 'besoins', label: 'Besoins identifiés', type: 'textarea', required: false },
    ]),
    body: `<div class="doc">
  <h1>FICHE D\'ENREGISTREMENT DE BÉNÉFICIAIRE</h1>
  <p><strong>Programme :</strong> {{programme}}</p>
  <h2>Identité</h2>
  <p><strong>Nom :</strong> {{nom_beneficiaire}} &nbsp;|&nbsp; <strong>Né(e) le :</strong> {{date_naissance}} &nbsp;|&nbsp; <strong>Sexe :</strong> {{sexe}}</p>
  <p><strong>Localité :</strong> {{localite}}</p>
  <h2>Besoins identifiés</h2>
  <p>{{besoins}}</p>
  <h2>Engagement du bénéficiaire</h2>
  <p>Le bénéficiaire s\'engage à fournir des informations exactes et à notifier tout changement de situation.</p>
  <p>Signature : ______________________</p>
</div>`,
  },
  {
    code: 'ong2_memorandum_comprehension',
    name: 'Mémorandum de Compréhension ONG',
    category: 'association',
    price: 5000,
    priceMax: 15000,
    description: 'Mémorandum d\'entente établissant un cadre de collaboration informel entre organisations.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 54,
    fieldsJson: F([
      { key: 'partie_a', label: 'Partie A', type: 'text', required: true },
      { key: 'partie_b', label: 'Partie B', type: 'text', required: true },
      { key: 'contexte', label: 'Contexte', type: 'textarea', required: true },
      { key: 'domaines_cooperation', label: 'Domaines de coopération', type: 'textarea', required: true },
      { key: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div class="doc">
  <h1>MÉMORANDUM DE COMPRÉHENSION</h1>
  <p>Entre <strong>{{partie_a}}</strong> et <strong>{{partie_b}}</strong></p>
  <p><strong>Signé le :</strong> {{date_signature}}</p>
  <h2>1. Contexte</h2>
  <p>{{contexte}}</p>
  <h2>2. Domaines de coopération</h2>
  <p>{{domaines_cooperation}}</p>
  <h2>3. Nature du mémorandum</h2>
  <p>Le présent mémorandum n\'a pas de valeur contractuelle contraignante mais exprime la volonté commune des deux parties de collaborer de bonne foi.</p>
  <p>Signatures : ______________________</p>
</div>`,
  },
  {
    code: 'ong2_note_conceptuelle',
    name: 'Note Conceptuelle de Projet',
    category: 'association',
    price: 3500,
    priceMax: 10500,
    description: 'Document de présentation synthétique d\'un projet soumis à un bailleur avant la rédaction du dossier complet.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'organisation', label: 'Organisation', type: 'text', required: true },
      { key: 'titre_projet', label: 'Titre du projet', type: 'text', required: true },
      { key: 'problematique', label: 'Problématique', type: 'textarea', required: true },
      { key: 'approche', label: 'Approche proposée', type: 'textarea', required: true },
      { key: 'budget_indicatif', label: 'Budget indicatif (FCFA)', type: 'number', required: false },
    ]),
    body: `<div class="doc">
  <h1>NOTE CONCEPTUELLE</h1>
  <h2>{{titre_projet}}</h2>
  <p><strong>Organisation soumissionnaire :</strong> {{organisation}}</p>
  <h2>1. Problématique</h2>
  <p>{{problematique}}</p>
  <h2>2. Approche proposée</h2>
  <p>{{approche}}</p>
  <h2>3. Budget indicatif</h2>
  <p>{{budget_indicatif}} FCFA</p>
  <h2>4. Prochaines étapes</h2>
  <p>Suite à l\'approbation de cette note, une proposition complète sera soumise dans les délais convenus avec le bailleur.</p>
</div>`,
  },
  {
    code: 'ong2_pv_ca_association',
    name: "Procès-Verbal de CA d\'Association",
    category: 'association',
    price: 2000,
    priceMax: 6000,
    description: "Procès-verbal officiel de la réunion du Conseil d\'Administration d\'une association.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 69,
    fieldsJson: F([
      { key: 'association', label: "Nom de l\'association", type: 'text', required: true },
      { key: 'date_reunion', label: 'Date de la réunion', type: 'date', required: true },
      { key: 'president_seance', label: 'Président de séance', type: 'text', required: true },
      { key: 'membres_presents', label: 'Membres présents', type: 'textarea', required: true },
      { key: 'ordre_du_jour', label: 'Ordre du jour', type: 'textarea', required: true },
      { key: 'decisions', label: 'Décisions prises', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>PROCÈS-VERBAL DE RÉUNION DU CONSEIL D\'ADMINISTRATION</h1>
  <h2>{{association}}</h2>
  <p><strong>Date :</strong> {{date_reunion}} &nbsp;|&nbsp; <strong>Président de séance :</strong> {{president_seance}}</p>
  <h2>Membres présents</h2>
  <p>{{membres_presents}}</p>
  <h2>Ordre du jour</h2>
  <p>{{ordre_du_jour}}</p>
  <h2>Décisions prises</h2>
  <p>{{decisions}}</p>
  <h2>Clôture</h2>
  <p>La séance est levée à ____h____. Le présent procès-verbal est approuvé par les membres.</p>
  <p>Secrétaire de séance : ______________________ &nbsp;&nbsp; Président : ______________________</p>
</div>`,
  },
  {
    code: 'ong2_rapport_financier_associatif',
    name: 'Rapport Financier Associatif',
    category: 'association',
    price: 4000,
    priceMax: 12000,
    description: 'Rapport financier annuel présentant les recettes, dépenses et situation patrimoniale d\'une association.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'association', label: "Nom de l\'association", type: 'text', required: true },
      { key: 'exercice', label: 'Exercice fiscal', type: 'text', required: true },
      { key: 'tresorier', label: 'Trésorier', type: 'text', required: true },
      { key: 'recettes', label: 'Total recettes (FCFA)', type: 'number', required: true },
      { key: 'depenses', label: 'Total dépenses (FCFA)', type: 'number', required: true },
      { key: 'solde', label: 'Solde de clôture (FCFA)', type: 'number', required: true },
    ]),
    body: `<div class="doc">
  <h1>RAPPORT FINANCIER ANNUEL</h1>
  <h2>{{association}} — Exercice {{exercice}}</h2>
  <p><strong>Trésorier :</strong> {{tresorier}}</p>
  <h2>Synthèse financière</h2>
  <p><strong>Total recettes :</strong> {{recettes}} FCFA</p>
  <p><strong>Total dépenses :</strong> {{depenses}} FCFA</p>
  <p><strong>Solde de clôture :</strong> {{solde}} FCFA</p>
  <h2>Commentaires du trésorier</h2>
  <p>La situation financière de l\'association est saine. Les détails par poste budgétaire sont présentés en annexe.</p>
  <h2>Approbation</h2>
  <p>Le présent rapport a été approuvé par l\'Assemblée Générale. Signatures : ______________________</p>
</div>`,
  },

  // ── AGRICULTURE (11) ─────────────────────────────────────────────────────────
  {
    code: 'agr2_plan_affaires_maraichage',
    name: 'Plan d\'Affaires Maraîchage',
    category: 'agro_environnement',
    price: 6000,
    priceMax: 18000,
    description: 'Plan d\'affaires structuré pour le lancement ou le développement d\'une activité maraîchère.',
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'promoteur', label: 'Nom du promoteur', type: 'text', required: true },
      { key: 'localite', label: 'Localité', type: 'text', required: true },
      { key: 'superficie', label: 'Superficie exploitée (ha)', type: 'number', required: true },
      { key: 'cultures', label: 'Cultures envisagées', type: 'text', required: true },
      { key: 'investissement_initial', label: 'Investissement initial (FCFA)', type: 'number', required: true },
      { key: 'revenus_prevus', label: 'Revenus annuels prévus (FCFA)', type: 'number', required: true },
    ]),
    body: `<div class="doc">
  <h1>PLAN D\'AFFAIRES — MARAÎCHAGE</h1>
  <p><strong>Promoteur :</strong> {{promoteur}} &nbsp;|&nbsp; <strong>Localité :</strong> {{localite}}</p>
  <h2>1. Présentation du projet</h2>
  <p>Superficie exploitée : <strong>{{superficie}} ha</strong>. Cultures envisagées : {{cultures}}.</p>
  <h2>2. Plan d\'investissement</h2>
  <p>Investissement initial estimé : <strong>{{investissement_initial}} FCFA</strong></p>
  <h2>3. Prévisions de revenus</h2>
  <p>Revenus annuels prévus : <strong>{{revenus_prevus}} FCFA</strong></p>
  <h2>4. Analyse de rentabilité</h2>
  <p>Le seuil de rentabilité sera atteint à partir de la deuxième campagne agricole selon les projections établies.</p>
  <p>Signature du promoteur : ______________________</p>
</div>`,
  },
  {
    code: 'agr2_fiche_technique_culture',
    name: 'Fiche Technique de Culture',
    category: 'agro_environnement',
    price: 2000,
    priceMax: 6000,
    description: 'Fiche de référence décrivant les itinéraires techniques recommandés pour une culture donnée.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'culture', label: 'Culture concernée', type: 'text', required: true },
      { key: 'variete', label: 'Variété recommandée', type: 'text', required: true },
      { key: 'periode_semis', label: 'Période de semis', type: 'text', required: true },
      { key: 'fertilisation', label: 'Programme de fertilisation', type: 'textarea', required: true },
      { key: 'protection', label: 'Protection phytosanitaire', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>FICHE TECHNIQUE DE CULTURE — {{culture}}</h1>
  <p><strong>Variété recommandée :</strong> {{variete}}</p>
  <h2>1. Calendrier cultural</h2>
  <p><strong>Période de semis :</strong> {{periode_semis}}</p>
  <h2>2. Fertilisation</h2>
  <p>{{fertilisation}}</p>
  <h2>3. Protection phytosanitaire</h2>
  <p>{{protection}}</p>
  <h2>4. Récolte et post-récolte</h2>
  <p>La récolte doit être effectuée à maturité optimale. Les produits doivent être stockés dans des conditions adaptées pour limiter les pertes.</p>
</div>`,
  },
  {
    code: 'agr2_contrat_warrantage',
    name: 'Contrat de Warrantage Agricole',
    category: 'agro_environnement',
    price: 4000,
    priceMax: 12000,
    description: 'Contrat de warrantage permettant à un agriculteur de garantir un crédit par ses stocks de récolte.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'agriculteur', label: 'Nom de l\'agriculteur', type: 'text', required: true },
      { key: 'institution_credit', label: 'Institution de crédit', type: 'text', required: true },
      { key: 'produit_stocke', label: 'Produit stocké', type: 'text', required: true },
      { key: 'quantite', label: 'Quantité (kg)', type: 'number', required: true },
      { key: 'valeur_stock', label: 'Valeur du stock (FCFA)', type: 'number', required: true },
      { key: 'montant_credit', label: 'Montant du crédit (FCFA)', type: 'number', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat', type: 'text', required: true },
    ]),
    body: `<div class="doc">
  <h1>CONTRAT DE WARRANTAGE AGRICOLE</h1>
  <p>Entre <strong>{{agriculteur}}</strong> (déposant) et <strong>{{institution_credit}}</strong> (créditeur)</p>
  <h2>Article 1 — Produit en garantie</h2>
  <p><strong>Produit :</strong> {{produit_stocke}} &nbsp;|&nbsp; <strong>Quantité :</strong> {{quantite}} kg &nbsp;|&nbsp; <strong>Valeur estimée :</strong> {{valeur_stock}} FCFA</p>
  <h2>Article 2 — Crédit octroyé</h2>
  <p>Montant du crédit : <strong>{{montant_credit}} FCFA</strong> pour une durée de <strong>{{duree_contrat}}</strong>.</p>
  <h2>Article 3 — Conditions de libération du stock</h2>
  <p>Le stock est libéré après remboursement intégral du crédit et des intérêts.</p>
  <p>Signatures : ______________________</p>
</div>`,
  },
  {
    code: 'agr2_plan_campagne_agricole',
    name: 'Plan de Campagne Agricole',
    category: 'agro_environnement',
    price: 3500,
    priceMax: 10500,
    description: "Document de planification des activités agricoles pour une campagne saisonnière donnée.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { key: 'campagne', label: 'Campagne agricole', type: 'text', required: true },
      { key: 'superficies_prevues', label: 'Superficies prévues (ha)', type: 'number', required: true },
      { key: 'cultures_planifiees', label: 'Cultures planifiées', type: 'textarea', required: true },
      { key: 'budget_previsionnel', label: 'Budget prévisionnel (FCFA)', type: 'number', required: true },
    ]),
    body: `<div class="doc">
  <h1>PLAN DE CAMPAGNE AGRICOLE — {{campagne}}</h1>
  <p><strong>Exploitation :</strong> {{exploitation}}</p>
  <h2>1. Superficies prévues</h2>
  <p>{{superficies_prevues}} hectares</p>
  <h2>2. Cultures planifiées</h2>
  <p>{{cultures_planifiees}}</p>
  <h2>3. Budget prévisionnel</h2>
  <p>{{budget_previsionnel}} FCFA</p>
  <h2>4. Planning des travaux</h2>
  <p>Le planning détaillé des travaux culturaux (labour, semis, entretien, récolte) est joint en annexe calendaire.</p>
</div>`,
  },
  {
    code: 'agr2_registre_cheptel',
    name: 'Registre de Cheptel',
    category: 'agro_environnement',
    price: 1500,
    priceMax: 4500,
    description: 'Registre de suivi du cheptel d\'une exploitation d\'élevage pour la gestion sanitaire et productive.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'eleveur', label: 'Nom de l\'éleveur', type: 'text', required: true },
      { key: 'espece', label: 'Espèce animale', type: 'text', required: true },
      { key: 'effectif_total', label: 'Effectif total', type: 'number', required: true },
      { key: 'date_mise_a_jour', label: 'Date de mise à jour', type: 'date', required: true },
      { key: 'mouvements', label: 'Mouvements (entrées/sorties)', type: 'textarea', required: false },
    ]),
    body: `<div class="doc">
  <h1>REGISTRE DE CHEPTEL</h1>
  <p><strong>Éleveur :</strong> {{eleveur}} &nbsp;|&nbsp; <strong>Espèce :</strong> {{espece}}</p>
  <p><strong>Effectif total :</strong> {{effectif_total}} têtes &nbsp;|&nbsp; <strong>Mis à jour le :</strong> {{date_mise_a_jour}}</p>
  <h2>Mouvements enregistrés</h2>
  <p>{{mouvements}}</p>
  <h2>Suivi sanitaire</h2>
  <p>Les vaccinations, traitements et interventions vétérinaires doivent être consignés sur les fiches sanitaires individuelles jointes.</p>
</div>`,
  },
  {
    code: 'agr2_convention_credit_agricole',
    name: 'Convention de Crédit Agricole',
    category: 'agro_environnement',
    price: 5000,
    priceMax: 15000,
    description: 'Convention de financement agricole entre un établissement de crédit et un exploitant agricole.',
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'emprunteur', label: 'Nom de l\'emprunteur', type: 'text', required: true },
      { key: 'institution', label: 'Institution financière', type: 'text', required: true },
      { key: 'montant_credit', label: 'Montant du crédit (FCFA)', type: 'number', required: true },
      { key: 'taux_interet', label: "Taux d\'intérêt (%)", type: 'number', required: true },
      { key: 'duree_remboursement', label: 'Durée de remboursement', type: 'text', required: true },
      { key: 'objet_credit', label: 'Objet du crédit', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>CONVENTION DE CRÉDIT AGRICOLE</h1>
  <p>Entre <strong>{{institution}}</strong> et <strong>{{emprunteur}}</strong></p>
  <h2>Article 1 — Objet du crédit</h2>
  <p>{{objet_credit}}</p>
  <h2>Article 2 — Montant et conditions</h2>
  <p>Montant : <strong>{{montant_credit}} FCFA</strong> &nbsp;|&nbsp; Taux : <strong>{{taux_interet}}%</strong> &nbsp;|&nbsp; Durée : <strong>{{duree_remboursement}}</strong></p>
  <h2>Article 3 — Remboursement</h2>
  <p>Le remboursement s\'effectuera selon l\'échéancier annexé à la présente convention.</p>
  <h2>Article 4 — Garanties</h2>
  <p>L\'emprunteur fournit les garanties énumérées dans l\'annexe de garanties.</p>
  <p>Signatures : ______________________</p>
</div>`,
  },
  {
    code: 'agr2_etude_impact_environnemental',
    name: "Étude d\'Impact Environnemental",
    category: 'agro_environnement',
    price: 10000,
    priceMax: 25000,
    description: "Rapport d\'étude évaluant l\'impact environnemental d\'un projet agricole ou agro-industriel.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'projet', label: 'Intitulé du projet', type: 'text', required: true },
      { key: 'promoteur', label: 'Promoteur', type: 'text', required: true },
      { key: 'zone_implantation', label: "Zone d\'implantation", type: 'text', required: true },
      { key: 'impacts_positifs', label: 'Impacts positifs', type: 'textarea', required: true },
      { key: 'impacts_negatifs', label: 'Impacts négatifs', type: 'textarea', required: true },
      { key: 'mesures_attenuation', label: "Mesures d\'atténuation", type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>ÉTUDE D\'IMPACT ENVIRONNEMENTAL</h1>
  <h2>Projet : {{projet}}</h2>
  <p><strong>Promoteur :</strong> {{promoteur}} &nbsp;|&nbsp; <strong>Zone :</strong> {{zone_implantation}}</p>
  <h2>1. Impacts positifs</h2>
  <p>{{impacts_positifs}}</p>
  <h2>2. Impacts négatifs identifiés</h2>
  <p>{{impacts_negatifs}}</p>
  <h2>3. Mesures d\'atténuation</h2>
  <p>{{mesures_attenuation}}</p>
  <h2>4. Plan de gestion environnementale</h2>
  <p>Un plan de gestion environnementale et sociale (PGES) sera élaboré conformément aux normes nationales et internationales en vigueur.</p>
</div>`,
  },
  {
    code: 'agr2_certificat_phytosanitaire',
    name: 'Certificat Phytosanitaire',
    category: 'agro_environnement',
    price: 2500,
    priceMax: 7500,
    description: 'Certificat attestant que des végétaux ou produits végétaux sont conformes aux exigences phytosanitaires.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'exportateur', label: 'Exportateur', type: 'text', required: true },
      { key: 'produit', label: 'Produit végétal', type: 'text', required: true },
      { key: 'quantite', label: 'Quantité', type: 'text', required: true },
      { key: 'pays_destination', label: 'Pays de destination', type: 'text', required: true },
      { key: 'autorite_delivrance', label: 'Autorité de délivrance', type: 'text', required: true },
      { key: 'date_delivrance', label: 'Date de délivrance', type: 'date', required: true },
    ]),
    body: `<div class="doc">
  <h1>CERTIFICAT PHYTOSANITAIRE</h1>
  <p><strong>Autorité de délivrance :</strong> {{autorite_delivrance}}</p>
  <p>Certifie que les végétaux ou produits végétaux décrits ci-après ont été inspectés et sont reconnus exempts des organismes nuisibles réglementés.</p>
  <h2>Description de l\'envoi</h2>
  <p><strong>Exportateur :</strong> {{exportateur}}</p>
  <p><strong>Produit :</strong> {{produit}} &nbsp;|&nbsp; <strong>Quantité :</strong> {{quantite}}</p>
  <p><strong>Pays de destination :</strong> {{pays_destination}}</p>
  <p><strong>Date de délivrance :</strong> {{date_delivrance}}</p>
  <p>Cachet et signature de l\'autorité compétente : ______________________</p>
</div>`,
  },
  {
    code: 'agr2_bail_rural',
    name: 'Bail Rural',
    category: 'agro_environnement',
    price: 4000,
    priceMax: 12000,
    description: 'Contrat de bail formalisant la mise à disposition d\'une terre agricole à un exploitant.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'bailleur', label: 'Propriétaire (bailleur)', type: 'text', required: true },
      { key: 'preneur', label: 'Exploitant (preneur)', type: 'text', required: true },
      { key: 'superficie', label: 'Superficie (ha)', type: 'number', required: true },
      { key: 'localisation', label: 'Localisation du terrain', type: 'text', required: true },
      { key: 'loyer_annuel', label: 'Loyer annuel (FCFA)', type: 'number', required: true },
      { key: 'duree_bail', label: 'Durée du bail', type: 'text', required: true },
    ]),
    body: `<div class="doc">
  <h1>BAIL RURAL</h1>
  <p>Entre <strong>{{bailleur}}</strong> (bailleur) et <strong>{{preneur}}</strong> (preneur)</p>
  <h2>Article 1 — Bien loué</h2>
  <p>Terrain agricole de <strong>{{superficie}} ha</strong> situé à <strong>{{localisation}}</strong>.</p>
  <h2>Article 2 — Durée</h2>
  <p>Le bail est consenti pour une durée de <strong>{{duree_bail}}</strong> à compter de la date de signature.</p>
  <h2>Article 3 — Loyer</h2>
  <p>Loyer annuel fixé à <strong>{{loyer_annuel}} FCFA</strong>, payable à terme échu.</p>
  <h2>Article 4 — Obligations</h2>
  <p>Le preneur s\'engage à exploiter la terre en bon père de famille et à ne pas la sous-louer sans accord écrit du bailleur.</p>
  <p>Signatures : ______________________</p>
</div>`,
  },
  {
    code: 'agr2_plan_irrigation',
    name: "Plan d\'Irrigation",
    category: 'agro_environnement',
    price: 5000,
    priceMax: 15000,
    description: "Plan technique détaillant le dispositif d\'irrigation d\'un périmètre agricole.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 45,
    fieldsJson: F([
      { key: 'exploitation', label: 'Exploitation agricole', type: 'text', required: true },
      { key: 'superficie_irrigable', label: 'Superficie irrigable (ha)', type: 'number', required: true },
      { key: 'source_eau', label: "Source d\'eau", type: 'text', required: true },
      { key: 'type_irrigation', label: "Type d\'irrigation", type: 'text', required: true },
      { key: 'debit_requis', label: 'Débit requis (m³/h)', type: 'number', required: false },
      { key: 'calendrier_irrigation', label: "Calendrier d\'irrigation", type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>PLAN D\'IRRIGATION</h1>
  <p><strong>Exploitation :</strong> {{exploitation}}</p>
  <h2>1. Description du dispositif</h2>
  <p><strong>Superficie irrigable :</strong> {{superficie_irrigable}} ha &nbsp;|&nbsp; <strong>Source d\'eau :</strong> {{source_eau}}</p>
  <p><strong>Type d\'irrigation :</strong> {{type_irrigation}} &nbsp;|&nbsp; <strong>Débit requis :</strong> {{debit_requis}} m³/h</p>
  <h2>2. Calendrier d\'irrigation</h2>
  <p>{{calendrier_irrigation}}</p>
  <h2>3. Maintenance</h2>
  <p>Les équipements d\'irrigation feront l\'objet d\'une maintenance préventive annuelle avant chaque campagne.</p>
</div>`,
  },
  {
    code: 'agr2_rapport_recolte',
    name: 'Rapport de Récolte',
    category: 'agro_environnement',
    price: 2000,
    priceMax: 6000,
    description: 'Rapport de synthèse des résultats de récolte d\'une campagne agricole par culture et parcelle.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 53,
    fieldsJson: F([
      { key: 'exploitation', label: 'Nom de l\'exploitation', type: 'text', required: true },
      { key: 'campagne', label: 'Campagne agricole', type: 'text', required: true },
      { key: 'culture', label: 'Culture récoltée', type: 'text', required: true },
      { key: 'superficie_recoltee', label: 'Superficie récoltée (ha)', type: 'number', required: true },
      { key: 'rendement', label: 'Rendement (t/ha)', type: 'number', required: true },
      { key: 'production_totale', label: 'Production totale (tonnes)', type: 'number', required: true },
      { key: 'observations', label: 'Observations', type: 'textarea', required: false },
    ]),
    body: `<div class="doc">
  <h1>RAPPORT DE RÉCOLTE</h1>
  <p><strong>Exploitation :</strong> {{exploitation}} &nbsp;|&nbsp; <strong>Campagne :</strong> {{campagne}}</p>
  <h2>Culture : {{culture}}</h2>
  <p><strong>Superficie récoltée :</strong> {{superficie_recoltee}} ha</p>
  <p><strong>Rendement moyen :</strong> {{rendement}} t/ha</p>
  <p><strong>Production totale :</strong> {{production_totale}} tonnes</p>
  <h2>Observations</h2>
  <p>{{observations}}</p>
  <h2>Perspectives</h2>
  <p>Les résultats de cette campagne seront intégrés au plan de campagne de la prochaine saison pour optimiser les pratiques culturales.</p>
</div>`,
  },

  // ── TRANSPORT / LOGISTIQUE (9) ────────────────────────────────────────────────
  {
    code: 'trans2_bon_transport',
    name: 'Bon de Transport',
    category: 'transport_logistique',
    price: 1000,
    priceMax: 3000,
    description: 'Document de bon de transport autorisant et traçant l\'acheminement de marchandises.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur', type: 'text', required: true },
      { key: 'destinataire', label: 'Destinataire', type: 'text', required: true },
      { key: 'nature_marchandise', label: 'Nature de la marchandise', type: 'text', required: true },
      { key: 'poids', label: 'Poids (kg)', type: 'number', required: true },
      { key: 'lieu_depart', label: 'Lieu de départ', type: 'text', required: true },
      { key: 'lieu_arrivee', label: "Lieu d\'arrivée", type: 'text', required: true },
      { key: 'date_transport', label: 'Date de transport', type: 'date', required: true },
    ]),
    body: `<div class="doc">
  <h1>BON DE TRANSPORT</h1>
  <p><strong>Date :</strong> {{date_transport}}</p>
  <h2>Parties</h2>
  <p><strong>Expéditeur :</strong> {{expediteur}} &nbsp;|&nbsp; <strong>Destinataire :</strong> {{destinataire}}</p>
  <h2>Détail de l\'envoi</h2>
  <p><strong>Nature :</strong> {{nature_marchandise}} &nbsp;|&nbsp; <strong>Poids :</strong> {{poids}} kg</p>
  <p><strong>Départ :</strong> {{lieu_depart}} &nbsp;|&nbsp; <strong>Arrivée :</strong> {{lieu_arrivee}}</p>
  <h2>Confirmation de réception</h2>
  <p>Reçu en bon état le : _____________ &nbsp;&nbsp; Signature du destinataire : ______________________</p>
</div>`,
  },
  {
    code: 'trans2_contrat_affretement',
    name: 'Contrat d\'Affrètement',
    category: 'transport_logistique',
    price: 6000,
    priceMax: 18000,
    description: 'Contrat encadrant la mise à disposition d\'un véhicule de transport pour des opérations de fret.',
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'affreteur', label: 'Affréteur', type: 'text', required: true },
      { key: 'transporteur', label: 'Transporteur', type: 'text', required: true },
      { key: 'type_vehicule', label: 'Type de véhicule', type: 'text', required: true },
      { key: 'trajet', label: 'Trajet', type: 'text', required: true },
      { key: 'fret', label: 'Montant du fret (FCFA)', type: 'number', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div class="doc">
  <h1>CONTRAT D\'AFFRÈTEMENT</h1>
  <p>Entre <strong>{{affreteur}}</strong> (affréteur) et <strong>{{transporteur}}</strong> (transporteur)</p>
  <h2>Article 1 — Objet</h2>
  <p>Mise à disposition d\'un(e) <strong>{{type_vehicule}}</strong> pour le trajet : <strong>{{trajet}}</strong>.</p>
  <h2>Article 2 — Fret</h2>
  <p>Montant convenu : <strong>{{fret}} FCFA</strong>.</p>
  <h2>Article 3 — Obligations du transporteur</h2>
  <p>Le transporteur s\'engage à livrer la marchandise en bon état, dans les délais convenus, à compter du <strong>{{date_debut}}</strong>.</p>
  <p>Signatures : ______________________</p>
</div>`,
  },
  {
    code: 'trans2_connaissement_maritime',
    name: 'Connaissement Maritime',
    category: 'transport_logistique',
    price: 5000,
    priceMax: 15000,
    description: 'Document de transport maritime attestant la prise en charge des marchandises par le transporteur.',
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'chargeur', label: 'Chargeur', type: 'text', required: true },
      { key: 'consignataire', label: 'Consignataire', type: 'text', required: true },
      { key: 'navire', label: 'Nom du navire', type: 'text', required: true },
      { key: 'port_chargement', label: 'Port de chargement', type: 'text', required: true },
      { key: 'port_destination', label: 'Port de destination', type: 'text', required: true },
      { key: 'description_cargaison', label: 'Description de la cargaison', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>CONNAISSEMENT MARITIME (Bill of Lading)</h1>
  <p><strong>Navire :</strong> {{navire}}</p>
  <p><strong>Chargeur :</strong> {{chargeur}} &nbsp;|&nbsp; <strong>Consignataire :</strong> {{consignataire}}</p>
  <h2>Trajet</h2>
  <p><strong>Port de chargement :</strong> {{port_chargement}} → <strong>Port de destination :</strong> {{port_destination}}</p>
  <h2>Description de la cargaison</h2>
  <p>{{description_cargaison}}</p>
  <h2>Clause de responsabilité</h2>
  <p>Le transporteur est responsable des marchandises de leur prise en charge jusqu\'à leur livraison au consignataire.</p>
  <p>Signature du capitaine / agent maritime : ______________________</p>
</div>`,
  },
  {
    code: 'trans2_liste_colisage',
    name: 'Liste de Colisage',
    category: 'transport_logistique',
    price: 1500,
    priceMax: 4500,
    description: 'Document listant le détail des colis composant une expédition pour contrôle douanier et logistique.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'expediteur', label: 'Expéditeur', type: 'text', required: true },
      { key: 'destinataire', label: 'Destinataire', type: 'text', required: true },
      { key: 'numero_envoi', label: "Numéro d\'envoi", type: 'text', required: true },
      { key: 'detail_colis', label: 'Détail des colis', type: 'textarea', required: true },
      { key: 'poids_total', label: 'Poids total brut (kg)', type: 'number', required: true },
    ]),
    body: `<div class="doc">
  <h1>LISTE DE COLISAGE</h1>
  <p><strong>N° d\'envoi :</strong> {{numero_envoi}}</p>
  <p><strong>Expéditeur :</strong> {{expediteur}} &nbsp;|&nbsp; <strong>Destinataire :</strong> {{destinataire}}</p>
  <h2>Détail des colis</h2>
  <p>{{detail_colis}}</p>
  <h2>Poids total brut</h2>
  <p>{{poids_total}} kg</p>
  <p>Établie par : ______________________ &nbsp;&nbsp; Date : ___________</p>
</div>`,
  },
  {
    code: 'trans2_declaration_douane_simplifiee',
    name: 'Déclaration en Douane Simplifiée',
    category: 'transport_logistique',
    price: 3000,
    priceMax: 9000,
    description: 'Formulaire simplifié de déclaration en douane pour des marchandises de faible valeur ou en régime simplifié.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'declarant', label: 'Déclarant', type: 'text', required: true },
      { key: 'bureau_douane', label: 'Bureau de douane', type: 'text', required: true },
      { key: 'regime_douanier', label: 'Régime douanier', type: 'text', required: true },
      { key: 'marchandises', label: 'Description des marchandises', type: 'textarea', required: true },
      { key: 'valeur_declaree', label: 'Valeur déclarée (FCFA)', type: 'number', required: true },
      { key: 'date_declaration', label: 'Date de déclaration', type: 'date', required: true },
    ]),
    body: `<div class="doc">
  <h1>DÉCLARATION EN DOUANE SIMPLIFIÉE</h1>
  <p><strong>Bureau :</strong> {{bureau_douane}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_declaration}}</p>
  <p><strong>Déclarant :</strong> {{declarant}} &nbsp;|&nbsp; <strong>Régime :</strong> {{regime_douanier}}</p>
  <h2>Description des marchandises</h2>
  <p>{{marchandises}}</p>
  <h2>Valeur déclarée</h2>
  <p>{{valeur_declaree}} FCFA</p>
  <h2>Certification</h2>
  <p>Je certifie que les informations ci-dessus sont exactes et sincères.</p>
  <p>Signature du déclarant : ______________________ &nbsp;&nbsp; Cachet douane : ______________________</p>
</div>`,
  },
  {
    code: 'trans2_contrat_entrepot',
    name: "Contrat d\'Entreposage",
    category: 'transport_logistique',
    price: 4000,
    priceMax: 12000,
    description: "Contrat définissant les conditions de stockage de marchandises dans un entrepôt logistique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 47,
    fieldsJson: F([
      { key: 'deposant', label: 'Déposant', type: 'text', required: true },
      { key: 'gestionnaire_entrepot', label: "Gestionnaire d\'entrepôt", type: 'text', required: true },
      { key: 'nature_marchandises', label: 'Nature des marchandises', type: 'text', required: true },
      { key: 'superficie_allouee', label: 'Superficie allouée (m²)', type: 'number', required: false },
      { key: 'tarif_stockage', label: 'Tarif de stockage (FCFA/mois)', type: 'number', required: true },
      { key: 'duree', label: 'Durée', type: 'text', required: true },
    ]),
    body: `<div class="doc">
  <h1>CONTRAT D\'ENTREPOSAGE</h1>
  <p>Entre <strong>{{gestionnaire_entrepot}}</strong> (entrepositaire) et <strong>{{deposant}}</strong> (déposant)</p>
  <h2>Article 1 — Marchandises</h2>
  <p>Nature : <strong>{{nature_marchandises}}</strong> &nbsp;|&nbsp; Superficie allouée : <strong>{{superficie_allouee}} m²</strong></p>
  <h2>Article 2 — Tarif</h2>
  <p>Tarif de stockage : <strong>{{tarif_stockage}} FCFA/mois</strong> pour une durée de <strong>{{duree}}</strong>.</p>
  <h2>Article 3 — Responsabilité</h2>
  <p>L\'entrepositaire est responsable des marchandises confiées sauf cas de force majeure dûment constatée.</p>
  <p>Signatures : ______________________</p>
</div>`,
  },
  {
    code: 'trans2_procedure_reception_marchandises',
    name: 'Procédure de Réception des Marchandises',
    category: 'transport_logistique',
    price: 2000,
    priceMax: 6000,
    description: 'Procédure standardisée décrivant les étapes de réception et de contrôle des marchandises à l\'entrepôt.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'entrepot', label: 'Entrepôt / Site', type: 'text', required: true },
      { key: 'responsable', label: 'Responsable réception', type: 'text', required: true },
      { key: 'etapes_controle', label: 'Étapes de contrôle', type: 'textarea', required: true },
      { key: 'documents_requis', label: 'Documents requis à la réception', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>PROCÉDURE DE RÉCEPTION DES MARCHANDISES</h1>
  <p><strong>Site :</strong> {{entrepot}} &nbsp;|&nbsp; <strong>Responsable :</strong> {{responsable}}</p>
  <h2>Documents requis à la réception</h2>
  <p>{{documents_requis}}</p>
  <h2>Étapes de contrôle</h2>
  <p>{{etapes_controle}}</p>
  <h2>Gestion des non-conformités</h2>
  <p>Toute non-conformité (quantité, état, température) doit être consignée sur la fiche de réserves et remontée au responsable logistique dans l\'heure.</p>
</div>`,
  },
  {
    code: 'trans2_fiche_tracabilite',
    name: 'Fiche de Traçabilité Logistique',
    category: 'transport_logistique',
    price: 1500,
    priceMax: 4500,
    description: 'Fiche permettant de suivre le parcours d\'un produit ou lot tout au long de la chaîne logistique.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'reference_lot', label: 'Référence du lot', type: 'text', required: true },
      { key: 'produit', label: 'Produit', type: 'text', required: true },
      { key: 'fournisseur', label: 'Fournisseur', type: 'text', required: true },
      { key: 'date_reception', label: 'Date de réception', type: 'date', required: true },
      { key: 'etapes_passage', label: 'Étapes de passage (entrepôts/transporteurs)', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>FICHE DE TRAÇABILITÉ LOGISTIQUE</h1>
  <p><strong>Référence lot :</strong> {{reference_lot}} &nbsp;|&nbsp; <strong>Produit :</strong> {{produit}}</p>
  <p><strong>Fournisseur :</strong> {{fournisseur}} &nbsp;|&nbsp; <strong>Date de réception :</strong> {{date_reception}}</p>
  <h2>Historique de transit</h2>
  <p>{{etapes_passage}}</p>
  <h2>Statut actuel</h2>
  <p>Le lot est localisé et son statut sera mis à jour à chaque étape de la chaîne logistique.</p>
</div>`,
  },
  {
    code: 'trans2_plan_tournee_livraison',
    name: 'Plan de Tournée de Livraison',
    category: 'transport_logistique',
    price: 2000,
    priceMax: 6000,
    description: "Document de planification des tournées de livraison optimisant les itinéraires et les créneaux.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'livreur', label: 'Livreur', type: 'text', required: true },
      { key: 'vehicule', label: 'Véhicule', type: 'text', required: true },
      { key: 'date_tournee', label: 'Date de la tournée', type: 'date', required: true },
      { key: 'liste_livraisons', label: 'Liste des livraisons (clients/adresses)', type: 'textarea', required: true },
      { key: 'heure_depart', label: 'Heure de départ prévue', type: 'text', required: false },
    ]),
    body: `<div class="doc">
  <h1>PLAN DE TOURNÉE DE LIVRAISON</h1>
  <p><strong>Date :</strong> {{date_tournee}} &nbsp;|&nbsp; <strong>Livreur :</strong> {{livreur}} &nbsp;|&nbsp; <strong>Véhicule :</strong> {{vehicule}}</p>
  <p><strong>Heure de départ :</strong> {{heure_depart}}</p>
  <h2>Livraisons planifiées</h2>
  <p>{{liste_livraisons}}</p>
  <h2>Instructions</h2>
  <p>Le livreur doit obtenir la signature du destinataire pour chaque livraison et signaler tout incident au responsable logistique en temps réel.</p>
</div>`,
  },

  // ── ACADÉMIQUE (7) ────────────────────────────────────────────────────────────
  {
    code: 'acad2_attestation_diplome',
    name: 'Attestation de Diplôme',
    category: 'academique',
    price: 1000,
    priceMax: 3000,
    description: 'Attestation officielle délivrée par un établissement académique confirmant l\'obtention d\'un diplôme.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 87,
    fieldsJson: F([
      { key: 'etablissement', label: 'Établissement', type: 'text', required: true },
      { key: 'etudiant', label: 'Nom de l\'étudiant', type: 'text', required: true },
      { key: 'diplome', label: 'Intitulé du diplôme', type: 'text', required: true },
      { key: 'annee_obtention', label: "Année d\'obtention", type: 'text', required: true },
      { key: 'mention', label: 'Mention', type: 'text', required: false },
    ]),
    body: `<div class="doc">
  <h1>ATTESTATION DE DIPLÔME</h1>
  <h2>{{etablissement}}</h2>
  <p>La Direction de <strong>{{etablissement}}</strong> atteste que :</p>
  <p><strong>{{etudiant}}</strong></p>
  <p>a obtenu le diplôme de <strong>{{diplome}}</strong> au titre de l\'année académique <strong>{{annee_obtention}}</strong>, avec la mention : <strong>{{mention}}</strong>.</p>
  <p>La présente attestation est délivrée pour servir et valoir ce que de droit.</p>
  <p>Fait le : _____________. Signature et cachet : ______________________</p>
</div>`,
  },
  {
    code: 'acad2_releve_notes',
    name: 'Relevé de Notes Officiel',
    category: 'academique',
    price: 1000,
    priceMax: 3000,
    description: 'Document officiel récapitulant les notes et crédits obtenus par un étudiant sur une période académique.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 83,
    fieldsJson: F([
      { key: 'etablissement', label: 'Établissement', type: 'text', required: true },
      { key: 'etudiant', label: 'Nom de l\'étudiant', type: 'text', required: true },
      { key: 'filiere', label: 'Filière', type: 'text', required: true },
      { key: 'annee_academique', label: 'Année académique', type: 'text', required: true },
      { key: 'tableau_notes', label: 'Tableau des notes (UE, note, crédit)', type: 'textarea', required: true },
      { key: 'moyenne_generale', label: 'Moyenne générale', type: 'number', required: true },
    ]),
    body: `<div class="doc">
  <h1>RELEVÉ DE NOTES</h1>
  <h2>{{etablissement}}</h2>
  <p><strong>Étudiant :</strong> {{etudiant}} &nbsp;|&nbsp; <strong>Filière :</strong> {{filiere}} &nbsp;|&nbsp; <strong>Année :</strong> {{annee_academique}}</p>
  <h2>Résultats par unité d\'enseignement</h2>
  <p>{{tableau_notes}}</p>
  <h2>Moyenne générale : {{moyenne_generale}} / 20</h2>
  <p>Document officiel délivré par le service de scolarité. Signature et cachet : ______________________</p>
</div>`,
  },
  {
    code: 'acad2_convention_ecole_entreprise',
    name: 'Convention de Partenariat École-Entreprise',
    category: 'academique',
    price: 4000,
    priceMax: 12000,
    description: 'Convention formalisant un partenariat pédagogique entre un établissement d\'enseignement et une entreprise.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'ecole', label: 'Établissement d\'enseignement', type: 'text', required: true },
      { key: 'entreprise', label: 'Entreprise partenaire', type: 'text', required: true },
      { key: 'objet', label: 'Objet du partenariat', type: 'textarea', required: true },
      { key: 'engagements_ecole', label: "Engagements de l\'école", type: 'textarea', required: true },
      { key: 'engagements_entreprise', label: "Engagements de l\'entreprise", type: 'textarea', required: true },
      { key: 'duree', label: 'Durée de la convention', type: 'text', required: true },
    ]),
    body: `<div class="doc">
  <h1>CONVENTION DE PARTENARIAT ÉCOLE-ENTREPRISE</h1>
  <p>Entre <strong>{{ecole}}</strong> et <strong>{{entreprise}}</strong></p>
  <h2>Article 1 — Objet</h2>
  <p>{{objet}}</p>
  <h2>Article 2 — Engagements de l\'école</h2>
  <p>{{engagements_ecole}}</p>
  <h2>Article 3 — Engagements de l\'entreprise</h2>
  <p>{{engagements_entreprise}}</p>
  <h2>Article 4 — Durée</h2>
  <p>La présente convention est conclue pour une durée de <strong>{{duree}}</strong>, renouvelable par accord express des deux parties.</p>
  <p>Signatures : ______________________</p>
</div>`,
  },
  {
    code: 'acad2_programme_cours',
    name: 'Programme de Cours',
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: 'Document décrivant le contenu, les objectifs et le calendrier d\'un cours universitaire ou de formation.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'intitule_cours', label: 'Intitulé du cours', type: 'text', required: true },
      { key: 'enseignant', label: 'Enseignant responsable', type: 'text', required: true },
      { key: 'niveau', label: 'Niveau / Filière', type: 'text', required: true },
      { key: 'volume_horaire', label: 'Volume horaire (h)', type: 'number', required: true },
      { key: 'objectifs', label: 'Objectifs pédagogiques', type: 'textarea', required: true },
      { key: 'plan_cours', label: 'Plan du cours', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>PROGRAMME DE COURS — {{intitule_cours}}</h1>
  <p><strong>Enseignant :</strong> {{enseignant}} &nbsp;|&nbsp; <strong>Niveau :</strong> {{niveau}} &nbsp;|&nbsp; <strong>Volume horaire :</strong> {{volume_horaire}} h</p>
  <h2>1. Objectifs pédagogiques</h2>
  <p>{{objectifs}}</p>
  <h2>2. Plan du cours</h2>
  <p>{{plan_cours}}</p>
  <h2>3. Évaluation</h2>
  <p>L\'évaluation sera composée d\'un contrôle continu (40%) et d\'un examen final (60%).</p>
</div>`,
  },
  {
    code: 'acad2_fiche_candidature_master',
    name: 'Fiche de Candidature Master',
    category: 'academique',
    price: 1500,
    priceMax: 4500,
    description: 'Formulaire de candidature à un programme de master ou de formation supérieure.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'candidat', label: 'Nom et prénom du candidat', type: 'text', required: true },
      { key: 'date_naissance_c', label: 'Date de naissance', type: 'date', required: true },
      { key: 'formation_antecedente', label: 'Formation antérieure', type: 'text', required: true },
      { key: 'programme_vise', label: 'Programme visé', type: 'text', required: true },
      { key: 'motivation', label: 'Lettre de motivation', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>FICHE DE CANDIDATURE — MASTER</h1>
  <h2>Programme visé : {{programme_vise}}</h2>
  <h2>Identité du candidat</h2>
  <p><strong>Nom :</strong> {{candidat}} &nbsp;|&nbsp; <strong>Né(e) le :</strong> {{date_naissance_c}}</p>
  <p><strong>Formation antérieure :</strong> {{formation_antecedente}}</p>
  <h2>Lettre de motivation</h2>
  <p>{{motivation}}</p>
  <h2>Pièces jointes requises</h2>
  <p>Copie du diplôme de licence, relevés de notes, CV académique, lettre de recommandation.</p>
  <p>Signature du candidat : ______________________</p>
</div>`,
  },
  {
    code: 'acad2_canevas_memoire',
    name: 'Canevas de Mémoire de Fin d\'Études',
    category: 'academique',
    price: 2500,
    priceMax: 7500,
    description: 'Canevas structuré guidant la rédaction d\'un mémoire de fin d\'études selon les normes académiques.',
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 79,
    fieldsJson: F([
      { key: 'etudiant', label: 'Nom de l\'étudiant', type: 'text', required: true },
      { key: 'titre_memoire', label: 'Titre du mémoire', type: 'text', required: true },
      { key: 'directeur', label: 'Directeur de mémoire', type: 'text', required: true },
      { key: 'etablissement', label: 'Établissement', type: 'text', required: true },
      { key: 'annee', label: 'Année académique', type: 'text', required: true },
      { key: 'problematique', label: 'Problématique centrale', type: 'textarea', required: true },
    ]),
    body: `<div class="doc">
  <h1>MÉMOIRE DE FIN D\'ÉTUDES</h1>
  <h2>{{titre_memoire}}</h2>
  <p><strong>Auteur :</strong> {{etudiant}} &nbsp;|&nbsp; <strong>Directeur :</strong> {{directeur}}</p>
  <p><strong>Établissement :</strong> {{etablissement}} &nbsp;|&nbsp; <strong>Année :</strong> {{annee}}</p>
  <h2>Résumé / Problématique</h2>
  <p>{{problematique}}</p>
  <h2>Plan indicatif</h2>
  <p>Chapitre 1 : Revue de la littérature<br/>Chapitre 2 : Méthodologie<br/>Chapitre 3 : Résultats et analyse<br/>Chapitre 4 : Discussion et recommandations<br/>Conclusion générale<br/>Bibliographie<br/>Annexes</p>
</div>`,
  },
  {
    code: 'acad2_lettre_recommandation',
    name: 'Lettre de Recommandation Académique',
    category: 'academique',
    price: 1000,
    priceMax: 3000,
    description: 'Lettre de recommandation formelle rédigée par un enseignant en faveur d\'un étudiant.',
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 81,
    fieldsJson: F([
      { key: 'redacteur', label: 'Nom du rédacteur (enseignant)', type: 'text', required: true },
      { key: 'etablissement_redacteur', label: 'Établissement du rédacteur', type: 'text', required: true },
      { key: 'beneficiaire', label: 'Nom de l\'étudiant recommandé', type: 'text', required: true },
      { key: 'qualites', label: 'Qualités et compétences de l\'étudiant', type: 'textarea', required: true },
      { key: 'programme_vise', label: 'Programme / Institution visé(e)', type: 'text', required: true },
      { key: 'date_lettre', label: 'Date de la lettre', type: 'date', required: true },
    ]),
    body: `<div class="doc">
  <h1>LETTRE DE RECOMMANDATION ACADÉMIQUE</h1>
  <p><strong>De :</strong> {{redacteur}}, {{etablissement_redacteur}}</p>
  <p><strong>Date :</strong> {{date_lettre}}</p>
  <p>À qui de droit,</p>
  <p>J\'ai le plaisir de recommander chaleureusement <strong>{{beneficiaire}}</strong> pour intégrer <strong>{{programme_vise}}</strong>.</p>
  <h2>Appréciation</h2>
  <p>{{qualites}}</p>
  <p>Je suis convaincu(e) que {{beneficiaire}} saura pleinement tirer profit de cette opportunité et contribuer positivement à votre programme. Je reste disponible pour tout complément d\'information.</p>
  <p>Cordialement,<br/><strong>{{redacteur}}</strong><br/>{{etablissement_redacteur}}</p>
  <p>Signature : ______________________</p>
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
  console.log(`Batch 03 OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
