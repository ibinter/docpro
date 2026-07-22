import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates = [
  // ─── 20 templates Formation professionnelle (academique, form4_) ───

  {
    code: 'form4_programme_sur_mesure',
    name: 'Programme de formation sur mesure',
    category: 'academique',
    price: 4500,
    priceMax: 12000,
    description: "Élaboration d'un programme de formation personnalisé adapté aux besoins spécifiques de l'entreprise commanditaire.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'organisme', label: "Organisme de formation", type: 'text', required: true },
      { key: 'entreprise_cliente', label: "Entreprise cliente", type: 'text', required: true },
      { key: 'intitule_formation', label: "Intitulé de la formation", type: 'text', required: true },
      { key: 'duree_heures', label: "Durée (heures)", type: 'number', required: true },
      { key: 'public_cible', label: "Public cible", type: 'textarea', required: true },
      { key: 'objectifs', label: "Objectifs pédagogiques", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'lieu', label: "Lieu de formation", type: 'text', required: false },
    ]),
    body: `<h1>Programme de Formation sur Mesure</h1>
<p><strong>Organisme :</strong> {{organisme}}</p>
<p><strong>Client :</strong> {{entreprise_cliente}}</p>
<h2>Intitulé : {{intitule_formation}}</h2>
<h3>Public cible</h3><p>{{public_cible}}</p>
<h3>Objectifs pédagogiques</h3><p>{{objectifs}}</p>
<p><strong>Durée :</strong> {{duree_heures}} heures | <strong>Début :</strong> {{date_debut}} | <strong>Lieu :</strong> {{lieu}}</p>`,
  },

  {
    code: 'form4_plan_pedagogique',
    name: 'Plan pédagogique détaillé',
    category: 'academique',
    price: 3500,
    priceMax: 9000,
    description: "Document structurant l'ensemble du dispositif pédagogique : séquences, méthodes, supports et évaluation.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'formateur', label: "Formateur responsable", type: 'text', required: true },
      { key: 'module', label: "Module de formation", type: 'text', required: true },
      { key: 'nbre_sequences', label: "Nombre de séquences", type: 'number', required: true },
      { key: 'methodes', label: "Méthodes pédagogiques", type: 'textarea', required: true },
      { key: 'supports', label: "Supports utilisés", type: 'textarea', required: false },
      { key: 'evaluation_type', label: "Type d'évaluation", type: 'text', required: true },
    ]),
    body: `<h1>Plan Pédagogique Détaillé</h1>
<p><strong>Formateur :</strong> {{formateur}} | <strong>Module :</strong> {{module}}</p>
<h2>Organisation pédagogique</h2>
<p><strong>Nombre de séquences :</strong> {{nbre_sequences}}</p>
<h3>Méthodes pédagogiques</h3><p>{{methodes}}</p>
<h3>Supports pédagogiques</h3><p>{{supports}}</p>
<h3>Évaluation</h3><p>{{evaluation_type}}</p>`,
  },

  {
    code: 'form4_fiche_sequence',
    name: 'Fiche de séquence pédagogique',
    category: 'academique',
    price: 1200,
    priceMax: 3500,
    description: "Fiche détaillée pour une séquence d'apprentissage : objectif, déroulement, durée et ressources.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'numero_sequence', label: "Numéro de séquence", type: 'text', required: true },
      { key: 'titre_sequence', label: "Titre de la séquence", type: 'text', required: true },
      { key: 'objectif_sequence', label: "Objectif de la séquence", type: 'textarea', required: true },
      { key: 'duree_minutes', label: "Durée (minutes)", type: 'number', required: true },
      { key: 'activites', label: "Activités prévues", type: 'textarea', required: true },
      { key: 'ressources', label: "Ressources nécessaires", type: 'textarea', required: false },
    ]),
    body: `<h1>Fiche de Séquence Pédagogique</h1>
<p><strong>Séquence N° :</strong> {{numero_sequence}} — <strong>Titre :</strong> {{titre_sequence}}</p>
<p><strong>Durée :</strong> {{duree_minutes}} minutes</p>
<h2>Objectif</h2><p>{{objectif_sequence}}</p>
<h2>Déroulement des activités</h2><p>{{activites}}</p>
<h2>Ressources</h2><p>{{ressources}}</p>`,
  },

  {
    code: 'form4_evaluation_formative_chaud',
    name: "Évaluation formative à chaud",
    category: 'academique',
    price: 800,
    priceMax: 2500,
    description: "Questionnaire d'évaluation à chaud rempli par les stagiaires immédiatement après la formation.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'formation_intitule', label: "Intitulé de la formation", type: 'text', required: true },
      { key: 'date_formation', label: "Date de la formation", type: 'date', required: true },
      { key: 'formateur_nom', label: "Nom du formateur", type: 'text', required: true },
      { key: 'stagiaire_nom', label: "Nom du stagiaire", type: 'text', required: true },
      { key: 'note_globale', label: "Note globale (1-10)", type: 'number', required: true },
      { key: 'commentaire', label: "Commentaire libre", type: 'textarea', required: false },
    ]),
    body: `<h1>Évaluation à Chaud — Formation</h1>
<p><strong>Formation :</strong> {{formation_intitule}} | <strong>Date :</strong> {{date_formation}}</p>
<p><strong>Formateur :</strong> {{formateur_nom}} | <strong>Stagiaire :</strong> {{stagiaire_nom}}</p>
<h2>Appréciation globale</h2>
<p>Note : <strong>{{note_globale}} / 10</strong></p>
<h2>Commentaires</h2><p>{{commentaire}}</p>`,
  },

  {
    code: 'form4_evaluation_froid_90j',
    name: "Évaluation à froid 90 jours",
    category: 'academique',
    price: 1000,
    priceMax: 3000,
    description: "Questionnaire d'évaluation différée (J+90) mesurant le transfert des compétences en situation de travail.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'stagiaire_nom', label: "Nom du stagiaire", type: 'text', required: true },
      { key: 'formation_suivie', label: "Formation suivie", type: 'text', required: true },
      { key: 'date_formation', label: "Date de la formation", type: 'date', required: true },
      { key: 'competences_appliquees', label: "Compétences appliquées", type: 'textarea', required: true },
      { key: 'obstacles', label: "Obstacles rencontrés", type: 'textarea', required: false },
      { key: 'recommandations', label: "Recommandations", type: 'textarea', required: false },
    ]),
    body: `<h1>Évaluation à Froid — J+90</h1>
<p><strong>Stagiaire :</strong> {{stagiaire_nom}} | <strong>Formation :</strong> {{formation_suivie}}</p>
<p><strong>Date initiale :</strong> {{date_formation}}</p>
<h2>Transfert des compétences</h2><p>{{competences_appliquees}}</p>
<h2>Obstacles identifiés</h2><p>{{obstacles}}</p>
<h2>Recommandations</h2><p>{{recommandations}}</p>`,
  },

  {
    code: 'form4_attestation_presence',
    name: "Attestation de présence formation",
    category: 'academique',
    price: 500,
    priceMax: 1500,
    description: "Attestation officielle certifiant la présence et la participation d'un stagiaire à une action de formation.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'organisme_nom', label: "Nom de l'organisme", type: 'text', required: true },
      { key: 'responsable_nom', label: "Nom du responsable", type: 'text', required: true },
      { key: 'stagiaire_nom', label: "Nom du stagiaire", type: 'text', required: true },
      { key: 'formation_intitule', label: "Intitulé de la formation", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'date_fin', label: "Date de fin", type: 'date', required: true },
      { key: 'duree_heures', label: "Durée totale (heures)", type: 'number', required: true },
    ]),
    body: `<h1>Attestation de Présence</h1>
<p>Je soussigné(e), <strong>{{responsable_nom}}</strong>, représentant l'organisme <strong>{{organisme_nom}}</strong>,</p>
<p>atteste que <strong>{{stagiaire_nom}}</strong> a participé à la formation intitulée :</p>
<h2>«&nbsp;{{formation_intitule}}&nbsp;»</h2>
<p>du <strong>{{date_debut}}</strong> au <strong>{{date_fin}}</strong>, soit <strong>{{duree_heures}} heures</strong> de formation.</p>
<p>Fait pour valoir ce que de droit.</p>`,
  },

  {
    code: 'form4_convention_inter_entreprises',
    name: "Convention formation inter-entreprises",
    category: 'academique',
    price: 5000,
    priceMax: 14000,
    description: "Convention cadre organisant une action de formation ouverte à des stagiaires de plusieurs entreprises.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'organisme_nom', label: "Organisme de formation", type: 'text', required: true },
      { key: 'num_declaration', label: "Numéro de déclaration d'activité", type: 'text', required: true },
      { key: 'entreprise_nom', label: "Entreprise participante", type: 'text', required: true },
      { key: 'formation_intitule', label: "Intitulé de la formation", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'date_fin', label: "Date de fin", type: 'date', required: true },
      { key: 'prix_ht', label: "Prix HT (FCFA)", type: 'number', required: true },
    ]),
    body: `<h1>Convention de Formation Inter-Entreprises</h1>
<p>Entre <strong>{{organisme_nom}}</strong> (N° déclaration : {{num_declaration}}) et <strong>{{entreprise_nom}}</strong></p>
<h2>Formation : {{formation_intitule}}</h2>
<p>Du <strong>{{date_debut}}</strong> au <strong>{{date_fin}}</strong></p>
<h3>Conditions financières</h3>
<p>Prix HT : <strong>{{prix_ht}} FCFA</strong></p>`,
  },

  {
    code: 'form4_offre_catalogue',
    name: "Offre de formation catalogue",
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: "Présentation commerciale et pédagogique d'une formation issue du catalogue de l'organisme.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'titre_formation', label: "Titre de la formation", type: 'text', required: true },
      { key: 'code_catalogue', label: "Code catalogue", type: 'text', required: true },
      { key: 'duree', label: "Durée", type: 'text', required: true },
      { key: 'prix', label: "Prix (FCFA)", type: 'number', required: true },
      { key: 'objectifs', label: "Objectifs", type: 'textarea', required: true },
      { key: 'programme_resume', label: "Programme résumé", type: 'textarea', required: true },
      { key: 'prochaine_session', label: "Prochaine session", type: 'date', required: false },
    ]),
    body: `<h1>Offre de Formation Catalogue</h1>
<h2>{{titre_formation}}</h2>
<p><strong>Code :</strong> {{code_catalogue}} | <strong>Durée :</strong> {{duree}} | <strong>Prix :</strong> {{prix}} FCFA</p>
<h3>Objectifs</h3><p>{{objectifs}}</p>
<h3>Programme</h3><p>{{programme_resume}}</p>
<p><strong>Prochaine session :</strong> {{prochaine_session}}</p>`,
  },

  {
    code: 'form4_cahier_charges',
    name: "Cahier des charges formation",
    category: 'academique',
    price: 6000,
    priceMax: 18000,
    description: "Document cadre définissant les exigences et spécifications d'une action de formation commandée.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'commanditaire', label: "Commanditaire", type: 'text', required: true },
      { key: 'contexte', label: "Contexte et enjeux", type: 'textarea', required: true },
      { key: 'besoins', label: "Besoins identifiés", type: 'textarea', required: true },
      { key: 'resultats_attendus', label: "Résultats attendus", type: 'textarea', required: true },
      { key: 'budget_max', label: "Budget maximum (FCFA)", type: 'number', required: false },
      { key: 'echeance', label: "Échéance souhaitée", type: 'date', required: true },
    ]),
    body: `<h1>Cahier des Charges — Action de Formation</h1>
<p><strong>Commanditaire :</strong> {{commanditaire}}</p>
<h2>Contexte et enjeux</h2><p>{{contexte}}</p>
<h2>Besoins identifiés</h2><p>{{besoins}}</p>
<h2>Résultats attendus</h2><p>{{resultats_attendus}}</p>
<p><strong>Budget max :</strong> {{budget_max}} FCFA | <strong>Échéance :</strong> {{echeance}}</p>`,
  },

  {
    code: 'form4_rapport_bilan',
    name: "Rapport bilan de formation",
    category: 'academique',
    price: 4000,
    priceMax: 11000,
    description: "Rapport de synthèse dressant le bilan pédagogique et financier d'une action de formation réalisée.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'formation_intitule', label: "Intitulé de la formation", type: 'text', required: true },
      { key: 'periode', label: "Période de réalisation", type: 'text', required: true },
      { key: 'nbre_stagiaires', label: "Nombre de stagiaires", type: 'number', required: true },
      { key: 'taux_satisfaction', label: "Taux de satisfaction (%)", type: 'number', required: true },
      { key: 'points_forts', label: "Points forts", type: 'textarea', required: true },
      { key: 'axes_amelioration', label: "Axes d'amélioration", type: 'textarea', required: true },
      { key: 'cout_total', label: "Coût total (FCFA)", type: 'number', required: false },
    ]),
    body: `<h1>Rapport Bilan de Formation</h1>
<h2>{{formation_intitule}}</h2>
<p><strong>Période :</strong> {{periode}} | <strong>Stagiaires :</strong> {{nbre_stagiaires}} | <strong>Satisfaction :</strong> {{taux_satisfaction}}%</p>
<h3>Points forts</h3><p>{{points_forts}}</p>
<h3>Axes d'amélioration</h3><p>{{axes_amelioration}}</p>
<p><strong>Coût total :</strong> {{cout_total}} FCFA</p>`,
  },

  {
    code: 'form4_fiche_appreciation_formateur',
    name: "Fiche appréciation formateur",
    category: 'academique',
    price: 600,
    priceMax: 1800,
    description: "Grille d'appréciation permettant d'évaluer les compétences et la performance d'un formateur.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'formateur_nom', label: "Nom du formateur", type: 'text', required: true },
      { key: 'formation_intitule', label: "Formation animée", type: 'text', required: true },
      { key: 'evaluateur_nom', label: "Nom de l'évaluateur", type: 'text', required: true },
      { key: 'date_evaluation', label: "Date d'évaluation", type: 'date', required: true },
      { key: 'maitrise_contenu', label: "Maîtrise du contenu (1-5)", type: 'number', required: true },
      { key: 'animation', label: "Qualité de l'animation (1-5)", type: 'number', required: true },
      { key: 'observations', label: "Observations", type: 'textarea', required: false },
    ]),
    body: `<h1>Fiche d'Appréciation Formateur</h1>
<p><strong>Formateur :</strong> {{formateur_nom}} | <strong>Formation :</strong> {{formation_intitule}}</p>
<p><strong>Évaluateur :</strong> {{evaluateur_nom}} | <strong>Date :</strong> {{date_evaluation}}</p>
<h2>Grille d'évaluation</h2>
<p>Maîtrise du contenu : <strong>{{maitrise_contenu}}/5</strong></p>
<p>Qualité de l'animation : <strong>{{animation}}/5</strong></p>
<h3>Observations</h3><p>{{observations}}</p>`,
  },

  {
    code: 'form4_planning_groupe',
    name: "Planning de formation groupe",
    category: 'academique',
    price: 1500,
    priceMax: 4500,
    description: "Planning structuré d'une session de formation pour un groupe de stagiaires avec horaires et intervenants.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'groupe_nom', label: "Nom du groupe", type: 'text', required: true },
      { key: 'formation_intitule', label: "Formation", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'date_fin', label: "Date de fin", type: 'date', required: true },
      { key: 'lieu', label: "Lieu", type: 'text', required: true },
      { key: 'planning_detail', label: "Détail du planning", type: 'textarea', required: true },
    ]),
    body: `<h1>Planning de Formation — Groupe {{groupe_nom}}</h1>
<h2>{{formation_intitule}}</h2>
<p><strong>Du</strong> {{date_debut}} <strong>au</strong> {{date_fin}} | <strong>Lieu :</strong> {{lieu}}</p>
<h2>Programme détaillé</h2><p>{{planning_detail}}</p>`,
  },

  {
    code: 'form4_contrat_pedagogique',
    name: "Contrat pédagogique apprenant",
    category: 'academique',
    price: 1800,
    priceMax: 5000,
    description: "Contrat formalisant les engagements réciproques entre le formateur et l'apprenant dans le cadre de la formation.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'apprenant_nom', label: "Nom de l'apprenant", type: 'text', required: true },
      { key: 'formateur_nom', label: "Nom du formateur", type: 'text', required: true },
      { key: 'objectifs_apprenant', label: "Objectifs de l'apprenant", type: 'textarea', required: true },
      { key: 'engagements_formateur', label: "Engagements du formateur", type: 'textarea', required: true },
      { key: 'modalites_suivi', label: "Modalités de suivi", type: 'textarea', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<h1>Contrat Pédagogique</h1>
<p>Entre <strong>{{formateur_nom}}</strong> (formateur) et <strong>{{apprenant_nom}}</strong> (apprenant)</p>
<h2>Objectifs de l'apprenant</h2><p>{{objectifs_apprenant}}</p>
<h2>Engagements du formateur</h2><p>{{engagements_formateur}}</p>
<h2>Modalités de suivi</h2><p>{{modalites_suivi}}</p>
<p>Signé le : <strong>{{date_signature}}</strong></p>`,
  },

  {
    code: 'form4_grille_evaluation_stagiaire',
    name: "Grille évaluation stagiaire",
    category: 'academique',
    price: 700,
    priceMax: 2200,
    description: "Grille structurée permettant d'évaluer les acquis et la progression d'un stagiaire en cours de formation.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'stagiaire_nom', label: "Nom du stagiaire", type: 'text', required: true },
      { key: 'formation', label: "Formation", type: 'text', required: true },
      { key: 'date_evaluation', label: "Date d'évaluation", type: 'date', required: true },
      { key: 'competence_1', label: "Compétence 1 (note /5)", type: 'number', required: true },
      { key: 'competence_2', label: "Compétence 2 (note /5)", type: 'number', required: true },
      { key: 'competence_3', label: "Compétence 3 (note /5)", type: 'number', required: true },
      { key: 'avis_formateur', label: "Avis du formateur", type: 'textarea', required: false },
    ]),
    body: `<h1>Grille d'Évaluation Stagiaire</h1>
<p><strong>Stagiaire :</strong> {{stagiaire_nom}} | <strong>Formation :</strong> {{formation}} | <strong>Date :</strong> {{date_evaluation}}</p>
<h2>Résultats</h2>
<p>Compétence 1 : {{competence_1}}/5 | Compétence 2 : {{competence_2}}/5 | Compétence 3 : {{competence_3}}/5</p>
<h3>Avis du formateur</h3><p>{{avis_formateur}}</p>`,
  },

  {
    code: 'form4_guide_formateur',
    name: "Guide du formateur",
    category: 'academique',
    price: 3000,
    priceMax: 8500,
    description: "Document de référence destiné au formateur décrivant les instructions pédagogiques et logistiques de la formation.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 57,
    fieldsJson: F([
      { key: 'formation_intitule', label: "Intitulé de la formation", type: 'text', required: true },
      { key: 'public', label: "Public visé", type: 'text', required: true },
      { key: 'prerequis', label: "Prérequis", type: 'textarea', required: false },
      { key: 'deroulement', label: "Déroulement général", type: 'textarea', required: true },
      { key: 'conseils_animation', label: "Conseils d'animation", type: 'textarea', required: true },
      { key: 'ressources_formateur', label: "Ressources du formateur", type: 'textarea', required: false },
    ]),
    body: `<h1>Guide du Formateur</h1>
<h2>{{formation_intitule}}</h2>
<p><strong>Public :</strong> {{public}}</p>
<h3>Prérequis</h3><p>{{prerequis}}</p>
<h3>Déroulement général</h3><p>{{deroulement}}</p>
<h3>Conseils d'animation</h3><p>{{conseils_animation}}</p>
<h3>Ressources</h3><p>{{ressources_formateur}}</p>`,
  },

  {
    code: 'form4_cahier_participant',
    name: "Cahier du participant",
    category: 'academique',
    price: 1500,
    priceMax: 4000,
    description: "Support de formation remis aux stagiaires regroupant contenus, exercices et espaces de prise de notes.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'formation_intitule', label: "Intitulé de la formation", type: 'text', required: true },
      { key: 'participant_nom', label: "Nom du participant", type: 'text', required: true },
      { key: 'session_date', label: "Date de la session", type: 'date', required: true },
      { key: 'contenu_resume', label: "Contenu résumé", type: 'textarea', required: true },
      { key: 'exercices', label: "Exercices pratiques", type: 'textarea', required: false },
    ]),
    body: `<h1>Cahier du Participant</h1>
<h2>{{formation_intitule}}</h2>
<p><strong>Participant :</strong> {{participant_nom}} | <strong>Session du :</strong> {{session_date}}</p>
<h2>Contenu de la formation</h2><p>{{contenu_resume}}</p>
<h2>Exercices pratiques</h2><p>{{exercices}}</p>`,
  },

  {
    code: 'form4_certification_competences',
    name: "Certification de compétences",
    category: 'academique',
    price: 8000,
    priceMax: 22000,
    description: "Document officiel certifiant la maîtrise de compétences spécifiques acquises à l'issue d'une formation.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'organisme_certificateur', label: "Organisme certificateur", type: 'text', required: true },
      { key: 'titulaire_nom', label: "Nom du titulaire", type: 'text', required: true },
      { key: 'competences_certifiees', label: "Compétences certifiées", type: 'textarea', required: true },
      { key: 'niveau', label: "Niveau de certification", type: 'text', required: true },
      { key: 'date_obtention', label: "Date d'obtention", type: 'date', required: true },
      { key: 'date_expiration', label: "Date d'expiration", type: 'date', required: false },
      { key: 'numero_certificat', label: "Numéro de certificat", type: 'text', required: true },
    ]),
    body: `<h1>Certification de Compétences</h1>
<p><strong>Organisme :</strong> {{organisme_certificateur}}</p>
<p>Certifie que <strong>{{titulaire_nom}}</strong> a atteint le niveau <strong>{{niveau}}</strong></p>
<h2>Compétences certifiées</h2><p>{{competences_certifiees}}</p>
<p><strong>N° Certificat :</strong> {{numero_certificat}} | <strong>Obtenu le :</strong> {{date_obtention}} | <strong>Expire le :</strong> {{date_expiration}}</p>`,
  },

  {
    code: 'form4_dossier_vae',
    name: "Dossier de VAE",
    category: 'academique',
    price: 12000,
    priceMax: 35000,
    description: "Dossier de Validation des Acquis de l'Expérience permettant d'obtenir une certification par la voie de l'expérience professionnelle.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'candidat_nom', label: "Nom du candidat", type: 'text', required: true },
      { key: 'certification_visee', label: "Certification visée", type: 'text', required: true },
      { key: 'experience_professionnelle', label: "Expérience professionnelle", type: 'textarea', required: true },
      { key: 'activites_significatives', label: "Activités significatives", type: 'textarea', required: true },
      { key: 'preuves', label: "Preuves et justificatifs", type: 'textarea', required: false },
    ]),
    body: `<h1>Dossier de Validation des Acquis de l'Expérience (VAE)</h1>
<p><strong>Candidat :</strong> {{candidat_nom}} | <strong>Certification visée :</strong> {{certification_visee}}</p>
<h2>Expérience professionnelle</h2><p>{{experience_professionnelle}}</p>
<h2>Activités significatives</h2><p>{{activites_significatives}}</p>
<h2>Preuves et justificatifs</h2><p>{{preuves}}</p>`,
  },

  {
    code: 'form4_accord_prise_en_charge',
    name: "Accord prise en charge formation",
    category: 'academique',
    price: 2500,
    priceMax: 7000,
    description: "Document formalisant l'accord de prise en charge financière d'une formation par un OPCO ou un employeur.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 61,
    fieldsJson: F([
      { key: 'financeur_nom', label: "Nom du financeur", type: 'text', required: true },
      { key: 'beneficiaire_nom', label: "Nom du bénéficiaire", type: 'text', required: true },
      { key: 'formation_intitule', label: "Formation financée", type: 'text', required: true },
      { key: 'montant_pris_en_charge', label: "Montant pris en charge (FCFA)", type: 'number', required: true },
      { key: 'conditions', label: "Conditions de prise en charge", type: 'textarea', required: true },
      { key: 'date_accord', label: "Date d'accord", type: 'date', required: true },
    ]),
    body: `<h1>Accord de Prise en Charge Formation</h1>
<p><strong>Financeur :</strong> {{financeur_nom}} | <strong>Bénéficiaire :</strong> {{beneficiaire_nom}}</p>
<h2>Formation : {{formation_intitule}}</h2>
<p><strong>Montant pris en charge :</strong> {{montant_pris_en_charge}} FCFA</p>
<h3>Conditions</h3><p>{{conditions}}</p>
<p>Accord conclu le : <strong>{{date_accord}}</strong></p>`,
  },

  {
    code: 'form4_charte_formation',
    name: "Charte de la formation",
    category: 'academique',
    price: 2000,
    priceMax: 5500,
    description: "Charte énonçant les valeurs, principes et engagements qui régissent le dispositif de formation au sein de l'organisation.",
    templateType: 'pdf',
    classe: 'formation',
    active: true,
    popularity: 45,
    fieldsJson: F([
      { key: 'organisation_nom', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'valeurs', label: "Valeurs fondatrices", type: 'textarea', required: true },
      { key: 'engagements_organisation', label: "Engagements de l'organisation", type: 'textarea', required: true },
      { key: 'engagements_apprenants', label: "Engagements des apprenants", type: 'textarea', required: true },
      { key: 'date_adoption', label: "Date d'adoption", type: 'date', required: true },
    ]),
    body: `<h1>Charte de la Formation</h1>
<h2>{{organisation_nom}}</h2>
<h3>Nos valeurs</h3><p>{{valeurs}}</p>
<h3>Engagements de l'organisation</h3><p>{{engagements_organisation}}</p>
<h3>Engagements des apprenants</h3><p>{{engagements_apprenants}}</p>
<p>Adoptée le : <strong>{{date_adoption}}</strong></p>`,
  },

  // ─── 15 templates Académique (academique, acad3_) ───

  {
    code: 'acad3_canevas_these_doctorat',
    name: "Canevas thèse de doctorat",
    category: 'academique',
    price: 15000,
    priceMax: 45000,
    description: "Structure complète et guide méthodologique pour la rédaction d'une thèse de doctorat conforme aux normes académiques.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'doctorant_nom', label: "Nom du doctorant", type: 'text', required: true },
      { key: 'titre_these', label: "Titre provisoire de la thèse", type: 'text', required: true },
      { key: 'directeur_these', label: "Directeur de thèse", type: 'text', required: true },
      { key: 'etablissement', label: "Établissement", type: 'text', required: true },
      { key: 'discipline', label: "Discipline", type: 'text', required: true },
      { key: 'annee_debut', label: "Année de début", type: 'number', required: true },
      { key: 'resume_sujet', label: "Résumé du sujet", type: 'textarea', required: true },
    ]),
    body: `<h1>Canevas de Thèse de Doctorat</h1>
<p><strong>Doctorant :</strong> {{doctorant_nom}} | <strong>Établissement :</strong> {{etablissement}}</p>
<h2>Titre : {{titre_these}}</h2>
<p><strong>Discipline :</strong> {{discipline}} | <strong>Directeur :</strong> {{directeur_these}} | <strong>Début :</strong> {{annee_debut}}</p>
<h3>Résumé du sujet</h3><p>{{resume_sujet}}</p>
<h2>Structure</h2>
<p>Introduction — Revue de littérature — Méthodologie — Résultats — Discussion — Conclusion — Bibliographie — Annexes</p>`,
  },

  {
    code: 'acad3_guide_redaction_memoire',
    name: "Guide rédaction mémoire master",
    category: 'academique',
    price: 8000,
    priceMax: 22000,
    description: "Guide méthodologique pour la rédaction d'un mémoire de master : structure, normes de citation et présentation.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'etudiant_nom', label: "Nom de l'étudiant", type: 'text', required: true },
      { key: 'titre_memoire', label: "Titre du mémoire", type: 'text', required: true },
      { key: 'encadreur_nom', label: "Nom de l'encadreur", type: 'text', required: true },
      { key: 'universite', label: "Université", type: 'text', required: true },
      { key: 'specialite', label: "Spécialité", type: 'text', required: true },
      { key: 'annee_academique', label: "Année académique", type: 'text', required: true },
    ]),
    body: `<h1>Guide de Rédaction — Mémoire de Master</h1>
<p><strong>Étudiant :</strong> {{etudiant_nom}} | <strong>Université :</strong> {{universite}}</p>
<h2>{{titre_memoire}}</h2>
<p><strong>Spécialité :</strong> {{specialite}} | <strong>Encadreur :</strong> {{encadreur_nom}} | <strong>Année :</strong> {{annee_academique}}</p>
<h2>Plan type recommandé</h2>
<p>Page de garde — Dédicaces — Remerciements — Table des matières — Liste des abréviations — Introduction — Chapitres — Conclusion — Bibliographie — Annexes</p>`,
  },

  {
    code: 'acad3_fiche_lecture_critique',
    name: "Fiche de lecture critique",
    category: 'academique',
    price: 1500,
    priceMax: 4500,
    description: "Fiche structurée pour analyser et critiquer un ouvrage ou un article académique de manière rigoureuse.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'auteur_ouvrage', label: "Auteur(s) de l'ouvrage", type: 'text', required: true },
      { key: 'titre_ouvrage', label: "Titre de l'ouvrage", type: 'text', required: true },
      { key: 'editeur_annee', label: "Éditeur et année", type: 'text', required: true },
      { key: 'resume_contenu', label: "Résumé du contenu", type: 'textarea', required: true },
      { key: 'points_forts', label: "Points forts", type: 'textarea', required: true },
      { key: 'limites', label: "Limites et critiques", type: 'textarea', required: true },
      { key: 'interet_recherche', label: "Intérêt pour ma recherche", type: 'textarea', required: true },
    ]),
    body: `<h1>Fiche de Lecture Critique</h1>
<p><strong>Auteur(s) :</strong> {{auteur_ouvrage}} | <strong>Titre :</strong> {{titre_ouvrage}}</p>
<p><strong>Éditeur/Année :</strong> {{editeur_annee}}</p>
<h2>Résumé</h2><p>{{resume_contenu}}</p>
<h2>Points forts</h2><p>{{points_forts}}</p>
<h2>Limites et critiques</h2><p>{{limites}}</p>
<h2>Intérêt pour ma recherche</h2><p>{{interet_recherche}}</p>`,
  },

  {
    code: 'acad3_protocole_recherche',
    name: "Protocole de recherche scientifique",
    category: 'academique',
    price: 10000,
    priceMax: 28000,
    description: "Document méthodologique détaillant le protocole d'une recherche scientifique : objectifs, hypothèses, méthodes et éthique.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'titre_recherche', label: "Titre de la recherche", type: 'text', required: true },
      { key: 'chercheur_principal', label: "Chercheur principal", type: 'text', required: true },
      { key: 'problematique', label: "Problématique", type: 'textarea', required: true },
      { key: 'hypotheses', label: "Hypothèses de recherche", type: 'textarea', required: true },
      { key: 'methodologie', label: "Méthodologie", type: 'textarea', required: true },
      { key: 'considerations_ethiques', label: "Considérations éthiques", type: 'textarea', required: true },
    ]),
    body: `<h1>Protocole de Recherche Scientifique</h1>
<h2>{{titre_recherche}}</h2>
<p><strong>Chercheur principal :</strong> {{chercheur_principal}}</p>
<h3>Problématique</h3><p>{{problematique}}</p>
<h3>Hypothèses</h3><p>{{hypotheses}}</p>
<h3>Méthodologie</h3><p>{{methodologie}}</p>
<h3>Considérations éthiques</h3><p>{{considerations_ethiques}}</p>`,
  },

  {
    code: 'acad3_consentement_eclaire',
    name: "Consentement éclairé recherche",
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: "Formulaire de consentement éclairé à remettre aux participants d'une recherche scientifique.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'chercheur_nom', label: "Nom du chercheur", type: 'text', required: true },
      { key: 'institution', label: "Institution", type: 'text', required: true },
      { key: 'titre_etude', label: "Titre de l'étude", type: 'text', required: true },
      { key: 'description_etude', label: "Description de l'étude", type: 'textarea', required: true },
      { key: 'risques_benefices', label: "Risques et bénéfices", type: 'textarea', required: true },
      { key: 'participant_nom', label: "Nom du participant", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<h1>Formulaire de Consentement Éclairé</h1>
<p><strong>Étude :</strong> {{titre_etude}} | <strong>Chercheur :</strong> {{chercheur_nom}} ({{institution}})</p>
<h2>Description de l'étude</h2><p>{{description_etude}}</p>
<h2>Risques et bénéfices</h2><p>{{risques_benefices}}</p>
<p>Je, soussigné(e) <strong>{{participant_nom}}</strong>, consens librement à participer à cette étude.</p>
<p>Signature : __________________ | Date : <strong>{{date_signature}}</strong></p>`,
  },

  {
    code: 'acad3_convention_cotutelle',
    name: "Convention de cotutelle internationale",
    category: 'academique',
    price: 18000,
    priceMax: 50000,
    description: "Convention encadrant une thèse de doctorat en cotutelle entre deux établissements de pays différents.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 35,
    fieldsJson: F([
      { key: 'etablissement_1', label: "Établissement 1", type: 'text', required: true },
      { key: 'pays_1', label: "Pays 1", type: 'text', required: true },
      { key: 'etablissement_2', label: "Établissement 2", type: 'text', required: true },
      { key: 'pays_2', label: "Pays 2", type: 'text', required: true },
      { key: 'doctorant_nom', label: "Nom du doctorant", type: 'text', required: true },
      { key: 'titre_these', label: "Titre de la thèse", type: 'text', required: true },
      { key: 'duree_annees', label: "Durée de la thèse (années)", type: 'number', required: true },
    ]),
    body: `<h1>Convention de Cotutelle de Thèse Internationale</h1>
<p>Entre <strong>{{etablissement_1}}</strong> ({{pays_1}}) et <strong>{{etablissement_2}}</strong> ({{pays_2}})</p>
<p><strong>Doctorant :</strong> {{doctorant_nom}}</p>
<h2>Thèse : {{titre_these}}</h2>
<p><strong>Durée prévue :</strong> {{duree_annees}} ans</p>`,
  },

  {
    code: 'acad3_accord_collaboration_scientifique',
    name: "Accord collaboration scientifique",
    category: 'academique',
    price: 12000,
    priceMax: 35000,
    description: "Accord cadre organisant une collaboration scientifique entre deux ou plusieurs institutions de recherche.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 42,
    fieldsJson: F([
      { key: 'institution_1', label: "Institution 1", type: 'text', required: true },
      { key: 'institution_2', label: "Institution 2", type: 'text', required: true },
      { key: 'domaine_collaboration', label: "Domaine de collaboration", type: 'text', required: true },
      { key: 'objectifs_communs', label: "Objectifs communs", type: 'textarea', required: true },
      { key: 'duree_accord', label: "Durée de l'accord (ans)", type: 'number', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<h1>Accord de Collaboration Scientifique</h1>
<p>Entre <strong>{{institution_1}}</strong> et <strong>{{institution_2}}</strong></p>
<p><strong>Domaine :</strong> {{domaine_collaboration}} | <strong>Durée :</strong> {{duree_accord}} ans</p>
<h2>Objectifs communs</h2><p>{{objectifs_communs}}</p>
<p>Signé le : <strong>{{date_signature}}</strong></p>`,
  },

  {
    code: 'acad3_charte_anti_plagiat',
    name: "Charte anti-plagiat",
    category: 'academique',
    price: 1200,
    priceMax: 3500,
    description: "Charte engageant les étudiants et chercheurs à respecter l'intégrité académique et les règles d'attribution.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'etablissement_nom', label: "Établissement", type: 'text', required: true },
      { key: 'signataire_nom', label: "Nom du signataire", type: 'text', required: true },
      { key: 'statut', label: "Statut (étudiant/chercheur)", type: 'text', required: true },
      { key: 'travail_concerne', label: "Travail concerné", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<h1>Charte Anti-Plagiat</h1>
<p><strong>Établissement :</strong> {{etablissement_nom}}</p>
<p>Je soussigné(e), <strong>{{signataire_nom}}</strong>, {{statut}}, m'engage à respecter les règles d'intégrité académique pour le travail : <strong>{{travail_concerne}}</strong>.</p>
<p>Je certifie que ce travail est le mien et que toutes les sources utilisées sont correctement citées.</p>
<p>Signature : __________________ | Date : <strong>{{date_signature}}</strong></p>`,
  },

  {
    code: 'acad3_rapport_soutenance',
    name: "Rapport de soutenance",
    category: 'academique',
    price: 5000,
    priceMax: 14000,
    description: "Rapport officiel établi par le jury à l'issue d'une soutenance de thèse ou de mémoire.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'candidat_nom', label: "Nom du candidat", type: 'text', required: true },
      { key: 'titre_travail', label: "Titre du travail soutenu", type: 'text', required: true },
      { key: 'date_soutenance', label: "Date de soutenance", type: 'date', required: true },
      { key: 'president_jury', label: "Président du jury", type: 'text', required: true },
      { key: 'membres_jury', label: "Membres du jury", type: 'textarea', required: true },
      { key: 'appreciation', label: "Appréciation du jury", type: 'textarea', required: true },
      { key: 'mention', label: "Mention attribuée", type: 'text', required: true },
    ]),
    body: `<h1>Rapport de Soutenance</h1>
<p><strong>Candidat :</strong> {{candidat_nom}} | <strong>Date :</strong> {{date_soutenance}}</p>
<h2>Travail soutenu : {{titre_travail}}</h2>
<p><strong>Président du jury :</strong> {{president_jury}}</p>
<h3>Composition du jury</h3><p>{{membres_jury}}</p>
<h3>Appréciation</h3><p>{{appreciation}}</p>
<p><strong>Mention :</strong> {{mention}}</p>`,
  },

  {
    code: 'acad3_contrat_publication',
    name: "Contrat de publication académique",
    category: 'academique',
    price: 7000,
    priceMax: 20000,
    description: "Contrat entre un auteur académique et un éditeur pour la publication d'un ouvrage ou article scientifique.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 40,
    fieldsJson: F([
      { key: 'auteur_nom', label: "Nom de l'auteur", type: 'text', required: true },
      { key: 'editeur_nom', label: "Nom de l'éditeur", type: 'text', required: true },
      { key: 'titre_publication', label: "Titre de la publication", type: 'text', required: true },
      { key: 'type_publication', label: "Type de publication", type: 'text', required: true },
      { key: 'droits_cedes', label: "Droits cédés", type: 'textarea', required: true },
      { key: 'remuneration', label: "Rémunération prévue", type: 'text', required: false },
      { key: 'date_contrat', label: "Date du contrat", type: 'date', required: true },
    ]),
    body: `<h1>Contrat de Publication Académique</h1>
<p>Entre <strong>{{auteur_nom}}</strong> (auteur) et <strong>{{editeur_nom}}</strong> (éditeur)</p>
<h2>Publication : {{titre_publication}}</h2>
<p><strong>Type :</strong> {{type_publication}}</p>
<h3>Droits cédés</h3><p>{{droits_cedes}}</p>
<p><strong>Rémunération :</strong> {{remuneration}}</p>
<p>Signé le : <strong>{{date_contrat}}</strong></p>`,
  },

  {
    code: 'acad3_resume_executif_recherche',
    name: "Résumé exécutif de recherche",
    category: 'academique',
    price: 3500,
    priceMax: 9500,
    description: "Synthèse concise destinée aux décideurs présentant les principaux résultats et recommandations d'une recherche.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'titre_recherche', label: "Titre de la recherche", type: 'text', required: true },
      { key: 'auteurs', label: "Auteurs", type: 'text', required: true },
      { key: 'date_publication', label: "Date de publication", type: 'date', required: true },
      { key: 'contexte', label: "Contexte", type: 'textarea', required: true },
      { key: 'principaux_resultats', label: "Principaux résultats", type: 'textarea', required: true },
      { key: 'recommandations', label: "Recommandations", type: 'textarea', required: true },
    ]),
    body: `<h1>Résumé Exécutif de Recherche</h1>
<h2>{{titre_recherche}}</h2>
<p><strong>Auteurs :</strong> {{auteurs}} | <strong>Date :</strong> {{date_publication}}</p>
<h3>Contexte</h3><p>{{contexte}}</p>
<h3>Principaux résultats</h3><p>{{principaux_resultats}}</p>
<h3>Recommandations</h3><p>{{recommandations}}</p>`,
  },

  {
    code: 'acad3_note_synthese_biblio',
    name: "Note de synthèse bibliographique",
    category: 'academique',
    price: 4000,
    priceMax: 11000,
    description: "Note académique synthétisant les principales sources bibliographiques sur un sujet de recherche donné.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'auteur_note', label: "Auteur de la note", type: 'text', required: true },
      { key: 'sujet', label: "Sujet de la synthèse", type: 'text', required: true },
      { key: 'nbre_sources', label: "Nombre de sources analysées", type: 'number', required: true },
      { key: 'periode_couverte', label: "Période couverte", type: 'text', required: true },
      { key: 'synthese_thematique', label: "Synthèse thématique", type: 'textarea', required: true },
      { key: 'lacunes_identifiees', label: "Lacunes identifiées", type: 'textarea', required: true },
    ]),
    body: `<h1>Note de Synthèse Bibliographique</h1>
<p><strong>Auteur :</strong> {{auteur_note}} | <strong>Sujet :</strong> {{sujet}}</p>
<p><strong>Sources analysées :</strong> {{nbre_sources}} | <strong>Période :</strong> {{periode_couverte}}</p>
<h2>Synthèse thématique</h2><p>{{synthese_thematique}}</p>
<h2>Lacunes identifiées</h2><p>{{lacunes_identifiees}}</p>`,
  },

  {
    code: 'acad3_projet_these_doctoral',
    name: "Projet de thèse doctoral",
    category: 'academique',
    price: 6000,
    priceMax: 17000,
    description: "Document de présentation d'un projet de thèse soumis pour admission en programme doctoral.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'candidat_nom', label: "Nom du candidat", type: 'text', required: true },
      { key: 'titre_projet', label: "Titre du projet de thèse", type: 'text', required: true },
      { key: 'discipline', label: "Discipline", type: 'text', required: true },
      { key: 'directeur_souhaite', label: "Directeur souhaité", type: 'text', required: false },
      { key: 'problematique', label: "Problématique", type: 'textarea', required: true },
      { key: 'methodologie_envisagee', label: "Méthodologie envisagée", type: 'textarea', required: true },
      { key: 'calendrier', label: "Calendrier prévisionnel", type: 'textarea', required: true },
    ]),
    body: `<h1>Projet de Thèse Doctoral</h1>
<p><strong>Candidat :</strong> {{candidat_nom}} | <strong>Discipline :</strong> {{discipline}}</p>
<h2>{{titre_projet}}</h2>
<p><strong>Directeur souhaité :</strong> {{directeur_souhaite}}</p>
<h3>Problématique</h3><p>{{problematique}}</p>
<h3>Méthodologie envisagée</h3><p>{{methodologie_envisagee}}</p>
<h3>Calendrier prévisionnel</h3><p>{{calendrier}}</p>`,
  },

  {
    code: 'acad3_demande_bourse_recherche',
    name: "Demande de bourse de recherche",
    category: 'academique',
    price: 5000,
    priceMax: 14000,
    description: "Dossier de candidature pour l'obtention d'une bourse destinée à financer un projet de recherche académique.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'candidat_nom', label: "Nom du candidat", type: 'text', required: true },
      { key: 'bourse_intitulee', label: "Intitulé de la bourse", type: 'text', required: true },
      { key: 'organisme_financement', label: "Organisme de financement", type: 'text', required: true },
      { key: 'projet_recherche', label: "Projet de recherche", type: 'textarea', required: true },
      { key: 'budget_demande', label: "Budget demandé (FCFA)", type: 'number', required: true },
      { key: 'duree_projet', label: "Durée du projet (mois)", type: 'number', required: true },
      { key: 'impact_attendu', label: "Impact attendu", type: 'textarea', required: true },
    ]),
    body: `<h1>Demande de Bourse de Recherche</h1>
<p><strong>Candidat :</strong> {{candidat_nom}} | <strong>Bourse :</strong> {{bourse_intitulee}}</p>
<p><strong>Organisme :</strong> {{organisme_financement}}</p>
<h2>Projet de recherche</h2><p>{{projet_recherche}}</p>
<p><strong>Budget demandé :</strong> {{budget_demande}} FCFA | <strong>Durée :</strong> {{duree_projet}} mois</p>
<h3>Impact attendu</h3><p>{{impact_attendu}}</p>`,
  },

  {
    code: 'acad3_rapport_recherche_terrain',
    name: "Rapport de recherche terrain",
    category: 'academique',
    price: 7000,
    priceMax: 20000,
    description: "Rapport documentant les activités, observations et résultats d'une mission de recherche sur le terrain.",
    templateType: 'pdf',
    classe: 'recherche',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'chercheur_nom', label: "Nom du chercheur", type: 'text', required: true },
      { key: 'lieu_terrain', label: "Lieu du terrain", type: 'text', required: true },
      { key: 'periode_mission', label: "Période de la mission", type: 'text', required: true },
      { key: 'objectifs_mission', label: "Objectifs de la mission", type: 'textarea', required: true },
      { key: 'donnees_collectees', label: "Données collectées", type: 'textarea', required: true },
      { key: 'observations', label: "Observations principales", type: 'textarea', required: true },
      { key: 'recommandations', label: "Recommandations", type: 'textarea', required: false },
    ]),
    body: `<h1>Rapport de Recherche Terrain</h1>
<p><strong>Chercheur :</strong> {{chercheur_nom}} | <strong>Lieu :</strong> {{lieu_terrain}} | <strong>Période :</strong> {{periode_mission}}</p>
<h2>Objectifs</h2><p>{{objectifs_mission}}</p>
<h2>Données collectées</h2><p>{{donnees_collectees}}</p>
<h2>Observations principales</h2><p>{{observations}}</p>
<h2>Recommandations</h2><p>{{recommandations}}</p>`,
  },

  // ─── 15 templates Divers sectoriels (mix1_, catégories variées) ───

  {
    code: 'mix1_contrat_consultant_independant',
    name: "Contrat consultant indépendant",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 25000,
    description: "Contrat de prestation de services pour un consultant indépendant définissant la mission, la rémunération et les obligations des parties.",
    templateType: 'pdf',
    classe: 'contrat',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'client_nom', label: "Nom du client", type: 'text', required: true },
      { key: 'consultant_nom', label: "Nom du consultant", type: 'text', required: true },
      { key: 'objet_mission', label: "Objet de la mission", type: 'textarea', required: true },
      { key: 'duree_mission', label: "Durée de la mission", type: 'text', required: true },
      { key: 'honoraires_ht', label: "Honoraires HT (FCFA)", type: 'number', required: true },
      { key: 'modalites_paiement', label: "Modalités de paiement", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<h1>Contrat de Consultant Indépendant</h1>
<p>Entre <strong>{{client_nom}}</strong> (le Client) et <strong>{{consultant_nom}}</strong> (le Consultant)</p>
<h2>Objet de la mission</h2><p>{{objet_mission}}</p>
<p><strong>Durée :</strong> {{duree_mission}} | <strong>Début :</strong> {{date_debut}}</p>
<h3>Rémunération</h3>
<p>Honoraires HT : <strong>{{honoraires_ht}} FCFA</strong></p>
<h3>Modalités de paiement</h3><p>{{modalites_paiement}}</p>`,
  },

  {
    code: 'mix1_convention_assistance_technique',
    name: "Convention assistance technique",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 30000,
    description: "Convention formalisant une prestation d'assistance technique entre deux entités, avec obligations réciproques.",
    templateType: 'pdf',
    classe: 'convention',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'prestataire_nom', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'beneficiaire_nom', label: "Nom du bénéficiaire", type: 'text', required: true },
      { key: 'nature_assistance', label: "Nature de l'assistance", type: 'textarea', required: true },
      { key: 'duree_convention', label: "Durée de la convention", type: 'text', required: true },
      { key: 'cout_total', label: "Coût total (FCFA)", type: 'number', required: true },
      { key: 'livrables', label: "Livrables attendus", type: 'textarea', required: true },
    ]),
    body: `<h1>Convention d'Assistance Technique</h1>
<p>Entre <strong>{{prestataire_nom}}</strong> (prestataire) et <strong>{{beneficiaire_nom}}</strong> (bénéficiaire)</p>
<h2>Nature de l'assistance</h2><p>{{nature_assistance}}</p>
<p><strong>Durée :</strong> {{duree_convention}} | <strong>Coût :</strong> {{cout_total}} FCFA</p>
<h3>Livrables</h3><p>{{livrables}}</p>`,
  },

  {
    code: 'mix1_accord_mentorat',
    name: "Accord de mentorat",
    category: 'rh_emploi',
    price: 1500,
    priceMax: 4500,
    description: "Accord formalisant la relation de mentorat entre un mentor expérimenté et un mentoré, avec objectifs et modalités.",
    templateType: 'pdf',
    classe: 'accord',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'mentor_nom', label: "Nom du mentor", type: 'text', required: true },
      { key: 'mentore_nom', label: "Nom du mentoré", type: 'text', required: true },
      { key: 'objectifs_mentorat', label: "Objectifs du mentorat", type: 'textarea', required: true },
      { key: 'duree_programme', label: "Durée du programme", type: 'text', required: true },
      { key: 'frequence_rencontres', label: "Fréquence des rencontres", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<h1>Accord de Mentorat</h1>
<p>Entre <strong>{{mentor_nom}}</strong> (mentor) et <strong>{{mentore_nom}}</strong> (mentoré)</p>
<h2>Objectifs</h2><p>{{objectifs_mentorat}}</p>
<p><strong>Durée :</strong> {{duree_programme}} | <strong>Fréquence :</strong> {{frequence_rencontres}} | <strong>Début :</strong> {{date_debut}}</p>`,
  },

  {
    code: 'mix1_charte_projet_associatif',
    name: "Charte de projet associatif",
    category: 'association',
    price: 2000,
    priceMax: 6000,
    description: "Charte définissant les valeurs, objectifs et modalités de gouvernance d'un projet porté par une association.",
    templateType: 'pdf',
    classe: 'charte',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'association_nom', label: "Nom de l'association", type: 'text', required: true },
      { key: 'projet_intitule', label: "Intitulé du projet", type: 'text', required: true },
      { key: 'valeurs', label: "Valeurs du projet", type: 'textarea', required: true },
      { key: 'objectifs', label: "Objectifs du projet", type: 'textarea', required: true },
      { key: 'gouvernance', label: "Modalités de gouvernance", type: 'textarea', required: true },
      { key: 'date_adoption', label: "Date d'adoption", type: 'date', required: true },
    ]),
    body: `<h1>Charte de Projet Associatif</h1>
<h2>{{association_nom}} — {{projet_intitule}}</h2>
<h3>Valeurs</h3><p>{{valeurs}}</p>
<h3>Objectifs</h3><p>{{objectifs}}</p>
<h3>Gouvernance</h3><p>{{gouvernance}}</p>
<p>Adoptée le : <strong>{{date_adoption}}</strong></p>`,
  },

  {
    code: 'mix1_convention_volontariat',
    name: "Convention de volontariat",
    category: 'association',
    price: 1500,
    priceMax: 4500,
    description: "Convention encadrant l'engagement d'un volontaire au sein d'une association ou organisation à but non lucratif.",
    templateType: 'pdf',
    classe: 'convention',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'association_nom', label: "Nom de l'association", type: 'text', required: true },
      { key: 'volontaire_nom', label: "Nom du volontaire", type: 'text', required: true },
      { key: 'mission_volontariat', label: "Mission de volontariat", type: 'textarea', required: true },
      { key: 'duree', label: "Durée de l'engagement", type: 'text', required: true },
      { key: 'remboursements', label: "Remboursements prévus", type: 'text', required: false },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
    ]),
    body: `<h1>Convention de Volontariat</h1>
<p>Entre <strong>{{association_nom}}</strong> et <strong>{{volontaire_nom}}</strong></p>
<h2>Mission</h2><p>{{mission_volontariat}}</p>
<p><strong>Durée :</strong> {{duree}} | <strong>Début :</strong> {{date_debut}}</p>
<p><strong>Remboursements :</strong> {{remboursements}}</p>`,
  },

  {
    code: 'mix1_contrat_prestataire_ong',
    name: "Contrat prestataire ONG",
    category: 'association',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de prestation entre une ONG et un fournisseur de services, conforme aux exigences des bailleurs de fonds.",
    templateType: 'pdf',
    classe: 'contrat',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'ong_nom', label: "Nom de l'ONG", type: 'text', required: true },
      { key: 'prestataire_nom', label: "Nom du prestataire", type: 'text', required: true },
      { key: 'objet_contrat', label: "Objet du contrat", type: 'textarea', required: true },
      { key: 'montant_contrat', label: "Montant du contrat (FCFA)", type: 'number', required: true },
      { key: 'source_financement', label: "Source de financement", type: 'text', required: false },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'date_fin', label: "Date de fin", type: 'date', required: true },
    ]),
    body: `<h1>Contrat Prestataire ONG</h1>
<p>Entre <strong>{{ong_nom}}</strong> (l'ONG) et <strong>{{prestataire_nom}}</strong> (le prestataire)</p>
<h2>Objet</h2><p>{{objet_contrat}}</p>
<p><strong>Montant :</strong> {{montant_contrat}} FCFA | <strong>Financement :</strong> {{source_financement}}</p>
<p><strong>Du</strong> {{date_debut}} <strong>au</strong> {{date_fin}}</p>`,
  },

  {
    code: 'mix1_accord_parrainage_sportif',
    name: "Accord de parrainage sportif",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 40000,
    description: "Accord définissant les modalités d'un parrainage sportif entre un sponsor et un club ou athlète bénéficiaire.",
    templateType: 'pdf',
    classe: 'accord',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'sponsor_nom', label: "Nom du sponsor", type: 'text', required: true },
      { key: 'beneficiaire_nom', label: "Nom du club/athlète", type: 'text', required: true },
      { key: 'montant_parrainage', label: "Montant du parrainage (FCFA)", type: 'number', required: true },
      { key: 'contreparties', label: "Contreparties offertes", type: 'textarea', required: true },
      { key: 'duree_accord', label: "Durée de l'accord", type: 'text', required: true },
      { key: 'date_signature', label: "Date de signature", type: 'date', required: true },
    ]),
    body: `<h1>Accord de Parrainage Sportif</h1>
<p>Entre <strong>{{sponsor_nom}}</strong> (le sponsor) et <strong>{{beneficiaire_nom}}</strong> (le bénéficiaire)</p>
<p><strong>Montant :</strong> {{montant_parrainage}} FCFA | <strong>Durée :</strong> {{duree_accord}}</p>
<h2>Contreparties</h2><p>{{contreparties}}</p>
<p>Signé le : <strong>{{date_signature}}</strong></p>`,
  },

  {
    code: 'mix1_plan_communication_associatif',
    name: "Plan communication associatif",
    category: 'association',
    price: 3500,
    priceMax: 10000,
    description: "Plan structuré de communication pour une association : cibles, messages, canaux et calendrier des actions.",
    templateType: 'pdf',
    classe: 'plan',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'association_nom', label: "Nom de l'association", type: 'text', required: true },
      { key: 'annee', label: "Année du plan", type: 'number', required: true },
      { key: 'cibles', label: "Publics cibles", type: 'textarea', required: true },
      { key: 'messages_cles', label: "Messages clés", type: 'textarea', required: true },
      { key: 'canaux_utilises', label: "Canaux de communication", type: 'textarea', required: true },
      { key: 'budget_communication', label: "Budget communication (FCFA)", type: 'number', required: false },
    ]),
    body: `<h1>Plan de Communication Associatif</h1>
<h2>{{association_nom}} — Année {{annee}}</h2>
<h3>Publics cibles</h3><p>{{cibles}}</p>
<h3>Messages clés</h3><p>{{messages_cles}}</p>
<h3>Canaux utilisés</h3><p>{{canaux_utilises}}</p>
<p><strong>Budget :</strong> {{budget_communication}} FCFA</p>`,
  },

  {
    code: 'mix1_rapport_annuel_ong',
    name: "Rapport annuel ONG",
    category: 'association',
    price: 8000,
    priceMax: 25000,
    description: "Rapport annuel d'activités d'une ONG destiné aux membres, partenaires et bailleurs de fonds.",
    templateType: 'pdf',
    classe: 'rapport',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'ong_nom', label: "Nom de l'ONG", type: 'text', required: true },
      { key: 'annee', label: "Année du rapport", type: 'number', required: true },
      { key: 'mot_president', label: "Mot du président", type: 'textarea', required: true },
      { key: 'activites_realisees', label: "Activités réalisées", type: 'textarea', required: true },
      { key: 'beneficiaires', label: "Nombre de bénéficiaires", type: 'number', required: true },
      { key: 'ressources_mobilisees', label: "Ressources mobilisées (FCFA)", type: 'number', required: true },
      { key: 'perspectives', label: "Perspectives", type: 'textarea', required: false },
    ]),
    body: `<h1>Rapport Annuel {{annee}}</h1>
<h2>{{ong_nom}}</h2>
<h3>Mot du président</h3><p>{{mot_president}}</p>
<h3>Activités réalisées</h3><p>{{activites_realisees}}</p>
<p><strong>Bénéficiaires :</strong> {{beneficiaires}} | <strong>Ressources :</strong> {{ressources_mobilisees}} FCFA</p>
<h3>Perspectives</h3><p>{{perspectives}}</p>`,
  },

  {
    code: 'mix1_contrat_de_don',
    name: "Contrat de don",
    category: 'association',
    price: 2500,
    priceMax: 7000,
    description: "Contrat formalisant un don en numéraire ou en nature entre un donateur et une organisation bénéficiaire.",
    templateType: 'pdf',
    classe: 'contrat',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'donateur_nom', label: "Nom du donateur", type: 'text', required: true },
      { key: 'beneficiaire_nom', label: "Nom du bénéficiaire", type: 'text', required: true },
      { key: 'objet_don', label: "Objet du don", type: 'text', required: true },
      { key: 'valeur_don', label: "Valeur du don (FCFA)", type: 'number', required: true },
      { key: 'conditions_utilisation', label: "Conditions d'utilisation", type: 'textarea', required: false },
      { key: 'date_don', label: "Date du don", type: 'date', required: true },
    ]),
    body: `<h1>Contrat de Don</h1>
<p>Entre <strong>{{donateur_nom}}</strong> (le donateur) et <strong>{{beneficiaire_nom}}</strong> (le bénéficiaire)</p>
<p>Objet du don : <strong>{{objet_don}}</strong> — Valeur : <strong>{{valeur_don}} FCFA</strong></p>
<h3>Conditions d'utilisation</h3><p>{{conditions_utilisation}}</p>
<p>Fait le : <strong>{{date_don}}</strong></p>`,
  },

  {
    code: 'mix1_convention_mecenat',
    name: "Convention de mécénat",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 28000,
    description: "Convention de mécénat entre une entreprise et une organisation d'intérêt général, ouvrant droit à avantages fiscaux.",
    templateType: 'pdf',
    classe: 'convention',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'mecene_nom', label: "Nom du mécène", type: 'text', required: true },
      { key: 'organisation_nom', label: "Nom de l'organisation", type: 'text', required: true },
      { key: 'projet_soutenu', label: "Projet soutenu", type: 'text', required: true },
      { key: 'montant_mecenat', label: "Montant du mécénat (FCFA)", type: 'number', required: true },
      { key: 'contreparties', label: "Contreparties accordées", type: 'textarea', required: false },
      { key: 'duree', label: "Durée de la convention", type: 'text', required: true },
    ]),
    body: `<h1>Convention de Mécénat</h1>
<p>Entre <strong>{{mecene_nom}}</strong> (le mécène) et <strong>{{organisation_nom}}</strong></p>
<p>Projet soutenu : <strong>{{projet_soutenu}}</strong></p>
<p>Montant : <strong>{{montant_mecenat}} FCFA</strong> | Durée : {{duree}}</p>
<h3>Contreparties</h3><p>{{contreparties}}</p>`,
  },

  {
    code: 'mix1_acte_de_donation',
    name: "Acte de donation",
    category: 'juridique_admin',
    price: 15000,
    priceMax: 50000,
    description: "Acte juridique formalisant le transfert à titre gratuit d'un bien entre un donateur et un donataire.",
    templateType: 'pdf',
    classe: 'acte',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'donateur_nom', label: "Nom du donateur", type: 'text', required: true },
      { key: 'donateur_adresse', label: "Adresse du donateur", type: 'text', required: true },
      { key: 'donataire_nom', label: "Nom du donataire", type: 'text', required: true },
      { key: 'donataire_adresse', label: "Adresse du donataire", type: 'text', required: true },
      { key: 'bien_donne', label: "Bien donné", type: 'textarea', required: true },
      { key: 'valeur_estimee', label: "Valeur estimée (FCFA)", type: 'number', required: true },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true },
    ]),
    body: `<h1>Acte de Donation</h1>
<p>Par devant nous,</p>
<p><strong>{{donateur_nom}}</strong>, demeurant {{donateur_adresse}}, ci-après "le Donateur",</p>
<p>au profit de <strong>{{donataire_nom}}</strong>, demeurant {{donataire_adresse}}, ci-après "le Donataire",</p>
<h2>Objet de la donation</h2><p>{{bien_donne}}</p>
<p>Valeur estimée : <strong>{{valeur_estimee}} FCFA</strong></p>
<p>Fait le : <strong>{{date_acte}}</strong></p>`,
  },

  {
    code: 'mix1_testament_olographe',
    name: "Testament olographe simplifié",
    category: 'juridique_admin',
    price: 10000,
    priceMax: 30000,
    description: "Modèle de testament olographe entièrement écrit, daté et signé de la main du testateur, conforme aux exigences légales.",
    templateType: 'pdf',
    classe: 'acte',
    active: true,
    popularity: 40,
    fieldsJson: F([
      { key: 'testateur_nom', label: "Nom du testateur", type: 'text', required: true },
      { key: 'testateur_adresse', label: "Adresse du testateur", type: 'text', required: true },
      { key: 'date_naissance', label: "Date de naissance", type: 'date', required: true },
      { key: 'dispositions', label: "Dispositions testamentaires", type: 'textarea', required: true },
      { key: 'date_redaction', label: "Date de rédaction", type: 'date', required: true },
      { key: 'lieu_redaction', label: "Lieu de rédaction", type: 'text', required: true },
    ]),
    body: `<h1>Testament Olographe</h1>
<p>Je soussigné(e), <strong>{{testateur_nom}}</strong>, né(e) le {{date_naissance}}, demeurant {{testateur_adresse}},</p>
<p>sain(e) de corps et d'esprit, déclare révoquer tout testament antérieur et instituer le présent testament.</p>
<h2>Mes dispositions</h2><p>{{dispositions}}</p>
<p>Fait à <strong>{{lieu_redaction}}</strong>, le <strong>{{date_redaction}}</strong></p>
<p>Signature : __________________</p>`,
  },

  {
    code: 'mix1_accord_succession_amiable',
    name: "Accord succession amiable",
    category: 'juridique_admin',
    price: 20000,
    priceMax: 60000,
    description: "Accord amiable entre héritiers portant sur le partage d'une succession, évitant le recours judiciaire.",
    templateType: 'pdf',
    classe: 'accord',
    active: true,
    popularity: 45,
    fieldsJson: F([
      { key: 'defunt_nom', label: "Nom du défunt", type: 'text', required: true },
      { key: 'date_deces', label: "Date du décès", type: 'date', required: true },
      { key: 'heritiers', label: "Liste des héritiers", type: 'textarea', required: true },
      { key: 'actif_successoral', label: "Actif successoral", type: 'textarea', required: true },
      { key: 'modalites_partage', label: "Modalités de partage", type: 'textarea', required: true },
      { key: 'date_accord', label: "Date de l'accord", type: 'date', required: true },
    ]),
    body: `<h1>Accord de Succession Amiable</h1>
<p>Suite au décès de <strong>{{defunt_nom}}</strong> survenu le <strong>{{date_deces}}</strong>,</p>
<p>les héritiers soussignés conviennent du partage amiable de la succession.</p>
<h2>Héritiers parties à l'accord</h2><p>{{heritiers}}</p>
<h2>Actif successoral</h2><p>{{actif_successoral}}</p>
<h2>Modalités de partage</h2><p>{{modalites_partage}}</p>
<p>Conclu le : <strong>{{date_accord}}</strong></p>`,
  },

  {
    code: 'mix1_declaration_succession_simplifiee',
    name: "Déclaration succession simplifiée",
    category: 'juridique_admin',
    price: 8000,
    priceMax: 24000,
    description: "Déclaration de succession simplifiée pour les patrimoines modestes, permettant de régulariser la situation fiscale héréditaire.",
    templateType: 'pdf',
    classe: 'declaration',
    active: true,
    popularity: 42,
    fieldsJson: F([
      { key: 'declarant_nom', label: "Nom du déclarant", type: 'text', required: true },
      { key: 'lien_heredite', label: "Lien avec le défunt", type: 'text', required: true },
      { key: 'defunt_nom', label: "Nom du défunt", type: 'text', required: true },
      { key: 'date_deces', label: "Date du décès", type: 'date', required: true },
      { key: 'biens_successoraux', label: "Biens successoraux", type: 'textarea', required: true },
      { key: 'valeur_totale', label: "Valeur totale nette (FCFA)", type: 'number', required: true },
      { key: 'date_declaration', label: "Date de la déclaration", type: 'date', required: true },
    ]),
    body: `<h1>Déclaration de Succession Simplifiée</h1>
<p>Je soussigné(e), <strong>{{declarant_nom}}</strong>, agissant en qualité de {{lien_heredite}} de <strong>{{defunt_nom}}</strong>, décédé(e) le <strong>{{date_deces}}</strong>,</p>
<p>déclare les éléments suivants au titre de la succession :</p>
<h2>Biens successoraux</h2><p>{{biens_successoraux}}</p>
<p><strong>Valeur nette totale :</strong> {{valeur_totale}} FCFA</p>
<p>Fait le : <strong>{{date_declaration}}</strong></p>`,
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
  console.log(`Batch 09b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
