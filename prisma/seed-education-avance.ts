import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'edu2_contrat_directeur_etablissement',
    name: 'Contrat directeur établissement scolaire',
    category: 'juridique_admin',
    description: 'Contrat de nomination et de mission du directeur d\'un établissement scolaire',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_directeur', label: 'Nom complet du directeur', type: 'text', required: true },
      { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
      { name: 'date_prise_fonction', label: 'Date de prise de fonction', type: 'date', required: true },
      { name: 'duree_contrat', label: 'Durée du contrat (années)', type: 'text', required: true },
      { name: 'salaire_mensuel', label: 'Salaire mensuel (FCFA)', type: 'text', required: true },
      { name: 'missions', label: 'Missions principales', type: 'textarea', required: true },
      { name: 'objectifs_annuels', label: 'Objectifs annuels fixés', type: 'textarea', required: false },
      { name: 'lieu_signature', label: 'Lieu de signature', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CONTRAT DE DIRECTION D'ÉTABLISSEMENT SCOLAIRE</h1>
<p style="text-align:center;color:#555;">Entre les parties soussignées</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Directeur nommé</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{nom_directeur}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Établissement</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_etablissement}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date de prise de fonction</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_prise_fonction}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée du contrat</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{duree_contrat}} ans</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Salaire mensuel brut</td><td style="padding:8px;">{{salaire_mensuel}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Missions principales :</strong><br/>{{missions}}</div>
<div style="background:#E8F5E9;padding:10px;border-radius:4px;margin-bottom:15px;"><strong>Objectifs annuels :</strong><br/>{{objectifs_annuels}}</div>
<p>Fait à {{lieu_signature}}, le {{date_prise_fonction}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>L'établissement</strong><br/><br/>Signature : _______________</div><div><strong>Le directeur</strong><br/>{{nom_directeur}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'edu2_convention_partenariat_univ_entreprise',
    name: 'Convention partenariat université-entreprise',
    category: 'juridique_admin',
    description: 'Convention cadre de partenariat entre une université et une entreprise',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_universite', label: 'Nom de l\'université', type: 'text', required: true },
      { name: 'representant_univ', label: 'Représentant de l\'université', type: 'text', required: true },
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'representant_entreprise', label: 'Représentant de l\'entreprise', type: 'text', required: true },
      { name: 'objet_partenariat', label: 'Objet du partenariat', type: 'textarea', required: true },
      { name: 'duree_convention', label: 'Durée de la convention', type: 'text', required: true },
      { name: 'apports_univ', label: 'Apports de l\'université', type: 'textarea', required: false },
      { name: 'apports_entreprise', label: 'Apports de l\'entreprise', type: 'textarea', required: false },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CONVENTION DE PARTENARIAT UNIVERSITÉ-ENTREPRISE</h1>
<p>Entre <strong>{{nom_universite}}</strong>, représentée par <strong>{{representant_univ}}</strong>, et <strong>{{nom_entreprise}}</strong>, représentée par <strong>{{representant_entreprise}}</strong>, il est convenu ce qui suit :</p>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin:12px 0;"><strong>Objet du partenariat :</strong><br/>{{objet_partenariat}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Partie</th><th style="padding:8px;text-align:left;">Apports</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_universite}}</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{apports_univ}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_entreprise}}</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{apports_entreprise}}</td></tr>
</table>
<p><strong>Durée :</strong> {{duree_convention}} &nbsp;|&nbsp; <strong>Date de signature :</strong> {{date_signature}}</p>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>Pour l'université</strong><br/>{{representant_univ}}<br/><br/>Signature : _______________</div><div><strong>Pour l'entreprise</strong><br/>{{representant_entreprise}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'edu2_reglement_interieur_ecole_privee',
    name: 'Règlement intérieur école privée',
    category: 'juridique_admin',
    description: 'Règlement intérieur complet d\'une école privée',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_ecole', label: 'Nom de l\'école', type: 'text', required: true },
      { name: 'annee_scolaire', label: 'Année scolaire', type: 'text', required: true },
      { name: 'adresse_ecole', label: 'Adresse de l\'école', type: 'text', required: false },
      { name: 'horaires', label: 'Horaires d\'ouverture', type: 'text', required: true },
      { name: 'regles_discipline', label: 'Règles de discipline', type: 'textarea', required: true },
      { name: 'sanctions_prevues', label: 'Sanctions prévues', type: 'textarea', required: false },
      { name: 'droits_eleves', label: 'Droits des élèves', type: 'textarea', required: false },
      { name: 'nom_directeur', label: 'Nom du directeur', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">RÈGLEMENT INTÉRIEUR</h1>
<h2 style="text-align:center;color:#2d6a9f;">{{nom_ecole}} — Année scolaire {{annee_scolaire}}</h2>
<p style="color:#555;">Adresse : {{adresse_ecole}}</p>
<div style="background:#E3F2FD;padding:10px;border-radius:4px;margin:10px 0;"><strong>Horaires :</strong> {{horaires}}</div>
<h3 style="color:#1a3c5e;margin-top:15px;">Article 1 — Règles de discipline</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">{{regles_discipline}}</div>
<h3 style="color:#1a3c5e;margin-top:15px;">Article 2 — Droits des élèves</h3>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;">{{droits_eleves}}</div>
<h3 style="color:#1a3c5e;margin-top:15px;">Article 3 — Sanctions</h3>
<div style="background:#FFF5F5;padding:12px;border-radius:4px;">{{sanctions_prevues}}</div>
<p style="margin-top:20px;text-align:right;">Le Directeur : <strong>{{nom_directeur}}</strong><br/>Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'edu2_cahier_charges_programme_scolaire',
    name: 'Cahier des charges programme scolaire',
    category: 'juridique_admin',
    description: 'Cahier des charges pour l\'élaboration ou la révision d\'un programme scolaire',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Établissement', type: 'text', required: true },
      { name: 'niveau_scolaire', label: 'Niveau scolaire concerné', type: 'text', required: true },
      { name: 'matiere', label: 'Matière / Discipline', type: 'text', required: true },
      { name: 'objectifs_pedagogiques', label: 'Objectifs pédagogiques', type: 'textarea', required: true },
      { name: 'contenu_programme', label: 'Contenu du programme', type: 'textarea', required: true },
      { name: 'volume_horaire', label: 'Volume horaire total (heures)', type: 'text', required: true },
      { name: 'methodes_evaluation', label: 'Méthodes d\'évaluation', type: 'textarea', required: false },
      { name: 'ressources_requises', label: 'Ressources requises', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">CAHIER DES CHARGES — PROGRAMME SCOLAIRE</h1>
<p><strong>Établissement :</strong> {{nom_etablissement}} &nbsp;|&nbsp; <strong>Niveau :</strong> {{niveau_scolaire}} &nbsp;|&nbsp; <strong>Matière :</strong> {{matiere}}</p>
<p><strong>Volume horaire total :</strong> {{volume_horaire}} h</p>
<h3 style="color:#2d6a9f;">Objectifs pédagogiques</h3>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin-bottom:10px;">{{objectifs_pedagogiques}}</div>
<h3 style="color:#2d6a9f;">Contenu du programme</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;">{{contenu_programme}}</div>
<h3 style="color:#2d6a9f;">Méthodes d'évaluation</h3>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;">{{methodes_evaluation}}</div>
<h3 style="color:#2d6a9f;">Ressources requises</h3>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;">{{ressources_requises}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 45,
  },

  {
    code: 'edu2_contrat_enseignant_vacataire',
    name: 'Contrat enseignant vacataire',
    category: 'juridique_admin',
    description: 'Contrat de vacation pour un enseignant intervenant ponctuel',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_enseignant', label: 'Nom de l\'enseignant', type: 'text', required: true },
      { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
      { name: 'matiere_enseignee', label: 'Matière enseignée', type: 'text', required: true },
      { name: 'volume_heures', label: 'Volume d\'heures de vacation', type: 'text', required: true },
      { name: 'taux_horaire', label: 'Taux horaire (FCFA)', type: 'text', required: true },
      { name: 'periode_intervention', label: 'Période d\'intervention', type: 'text', required: true },
      { name: 'niveau_classe', label: 'Niveau / Classe', type: 'text', required: false },
      { name: 'date_contrat', label: 'Date du contrat', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CONTRAT D'ENSEIGNANT VACATAIRE</h1>
<p>Entre <strong>{{nom_etablissement}}</strong> et <strong>{{nom_enseignant}}</strong>, il est convenu ce qui suit :</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Rubrique</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Matière enseignée</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{matiere_enseignee}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Niveau / Classe</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{niveau_classe}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Volume d'heures</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{volume_heures}} h</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Taux horaire</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{taux_horaire}} FCFA/h</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Période</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{periode_intervention}}</td></tr>
</table>
<p>Fait à ________________, le {{date_contrat}}.</p>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>L'établissement</strong><br/><br/>Signature : _______________</div><div><strong>L'enseignant</strong><br/>{{nom_enseignant}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'edu2_convention_stage_academique',
    name: 'Convention stage académique',
    category: 'juridique_admin',
    description: 'Convention de stage entre un établissement académique et une organisation d\'accueil',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_etudiant', label: 'Nom de l\'étudiant', type: 'text', required: true },
      { name: 'nom_etablissement', label: 'Établissement académique', type: 'text', required: true },
      { name: 'nom_organisme_accueil', label: 'Organisme d\'accueil', type: 'text', required: true },
      { name: 'tuteur_pedagogique', label: 'Tuteur pédagogique', type: 'text', required: true },
      { name: 'tuteur_entreprise', label: 'Maître de stage', type: 'text', required: true },
      { name: 'sujet_stage', label: 'Sujet / Mission du stage', type: 'textarea', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { name: 'gratification', label: 'Gratification mensuelle (FCFA)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CONVENTION DE STAGE ACADÉMIQUE</h1>
<p><strong>Étudiant :</strong> {{nom_etudiant}} &nbsp;|&nbsp; <strong>Établissement :</strong> {{nom_etablissement}}</p>
<p><strong>Organisme d'accueil :</strong> {{nom_organisme_accueil}}</p>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin:12px 0;"><strong>Sujet / Mission :</strong><br/>{{sujet_stage}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Information</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Tuteur pédagogique</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{tuteur_pedagogique}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Maître de stage</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{tuteur_entreprise}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Période</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">Du {{date_debut}} au {{date_fin}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Gratification</td><td style="padding:8px;">{{gratification}} FCFA/mois</td></tr>
</table>
<div style="display:flex;justify-content:space-between;margin-top:20px;"><div><strong>L'établissement</strong><br/><br/>Signature : _______________</div><div><strong>L'organisme</strong><br/><br/>Signature : _______________</div><div><strong>L'étudiant</strong><br/>{{nom_etudiant}}<br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  {
    code: 'edu2_plan_strategique_etablissement',
    name: 'Plan stratégique établissement',
    category: 'commercial_financier',
    description: 'Plan stratégique pluriannuel d\'un établissement scolaire ou universitaire',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
      { name: 'periode_plan', label: 'Période du plan (ex: 2024-2027)', type: 'text', required: true },
      { name: 'vision', label: 'Vision de l\'établissement', type: 'textarea', required: true },
      { name: 'mission', label: 'Mission', type: 'textarea', required: true },
      { name: 'axes_strategiques', label: 'Axes stratégiques prioritaires', type: 'textarea', required: true },
      { name: 'objectifs_strategiques', label: 'Objectifs stratégiques', type: 'textarea', required: true },
      { name: 'budget_previsionnel', label: 'Budget prévisionnel (FCFA)', type: 'text', required: false },
      { name: 'indicateurs_performance', label: 'Indicateurs de performance', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">PLAN STRATÉGIQUE {{periode_plan}}</h1>
<h2 style="text-align:center;color:#2d6a9f;">{{nom_etablissement}}</h2>
<div style="background:#1a3c5e;color:white;padding:12px;border-radius:4px;margin:12px 0;"><strong>VISION :</strong><br/>{{vision}}</div>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>MISSION :</strong><br/>{{mission}}</div>
<h3 style="color:#1a3c5e;">Axes stratégiques</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;">{{axes_strategiques}}</div>
<h3 style="color:#1a3c5e;">Objectifs stratégiques</h3>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;">{{objectifs_strategiques}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Budget prévisionnel</th><th style="padding:8px;text-align:right;">{{budget_previsionnel}} FCFA</th></tr>
</table>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;"><strong>Indicateurs de performance :</strong><br/>{{indicateurs_performance}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'edu2_rapport_inspection_pedagogique',
    name: 'Rapport inspection pédagogique',
    category: 'juridique_admin',
    description: 'Rapport d\'inspection pédagogique d\'un enseignant ou d\'un établissement',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_inspecteur', label: 'Nom de l\'inspecteur', type: 'text', required: true },
      { name: 'nom_inspecte', label: 'Nom de l\'enseignant / établissement inspecté', type: 'text', required: true },
      { name: 'date_inspection', label: 'Date d\'inspection', type: 'date', required: true },
      { name: 'matiere_observee', label: 'Matière / Activité observée', type: 'text', required: true },
      { name: 'points_forts', label: 'Points forts observés', type: 'textarea', required: true },
      { name: 'points_amelioration', label: 'Points à améliorer', type: 'textarea', required: true },
      { name: 'note_globale', label: 'Note globale (/20)', type: 'text', required: false },
      { name: 'recommandations', label: 'Recommandations', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">RAPPORT D'INSPECTION PÉDAGOGIQUE</h1>
<p><strong>Inspecteur :</strong> {{nom_inspecteur}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_inspection}}</p>
<p><strong>Inspecté :</strong> {{nom_inspecte}} &nbsp;|&nbsp; <strong>Matière :</strong> {{matiere_observee}}</p>
<div style="display:flex;gap:12px;margin:15px 0;">
<div style="flex:1;background:#E8F5E9;padding:12px;border-radius:4px;"><strong style="color:#2e7d32;">Points forts :</strong><br/>{{points_forts}}</div>
<div style="flex:1;background:#FFF5F5;padding:12px;border-radius:4px;"><strong style="color:#c0392b;">À améliorer :</strong><br/>{{points_amelioration}}</div>
</div>
<p style="font-size:16px;"><strong>Note globale :</strong> <span style="color:#1a3c5e;font-weight:bold;">{{note_globale}} / 20</span></p>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-top:10px;"><strong>Recommandations :</strong><br/>{{recommandations}}</div>
<p style="margin-top:20px;text-align:right;">L'inspecteur : <strong>{{nom_inspecteur}}</strong><br/>Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 42,
  },

  {
    code: 'edu2_accord_reconnaissance_diplome',
    name: 'Accord reconnaissance diplôme',
    category: 'juridique_admin',
    description: 'Accord de reconnaissance mutuelle de diplôme entre institutions',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'institution_a', label: 'Institution A', type: 'text', required: true },
      { name: 'pays_institution_a', label: 'Pays de l\'institution A', type: 'text', required: true },
      { name: 'institution_b', label: 'Institution B', type: 'text', required: true },
      { name: 'pays_institution_b', label: 'Pays de l\'institution B', type: 'text', required: true },
      { name: 'diplomes_concernes', label: 'Diplômes concernés par l\'accord', type: 'textarea', required: true },
      { name: 'conditions_reconnaissance', label: 'Conditions de reconnaissance', type: 'textarea', required: true },
      { name: 'date_entree_vigueur', label: 'Date d\'entrée en vigueur', type: 'date', required: true },
      { name: 'duree_accord', label: 'Durée de l\'accord', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">ACCORD DE RECONNAISSANCE DE DIPLÔME</h1>
<p>Entre <strong>{{institution_a}}</strong> ({{pays_institution_a}}) et <strong>{{institution_b}}</strong> ({{pays_institution_b}}), il est conclu le présent accord de reconnaissance mutuelle.</p>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin:12px 0;"><strong>Diplômes concernés :</strong><br/>{{diplomes_concernes}}</div>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Conditions de reconnaissance :</strong><br/>{{conditions_reconnaissance}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date d'entrée en vigueur</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_entree_vigueur}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée de l'accord</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{duree_accord}}</td></tr>
</table>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>{{institution_a}}</strong><br/><br/>Signature : _______________</div><div><strong>{{institution_b}}</strong><br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 38,
  },

  {
    code: 'edu2_contrat_prestation_formation_continue',
    name: 'Contrat prestation formation continue',
    category: 'commercial_financier',
    description: 'Contrat de prestation de service pour une formation continue',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisme_formation', label: 'Organisme de formation', type: 'text', required: true },
      { name: 'nom_client', label: 'Entreprise / Client', type: 'text', required: true },
      { name: 'intitule_formation', label: 'Intitulé de la formation', type: 'text', required: true },
      { name: 'nombre_participants', label: 'Nombre de participants', type: 'text', required: true },
      { name: 'duree_formation', label: 'Durée (jours/heures)', type: 'text', required: true },
      { name: 'dates_formation', label: 'Dates de formation', type: 'text', required: true },
      { name: 'cout_total', label: 'Coût total HT (FCFA)', type: 'text', required: true },
      { name: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
      { name: 'lieu_formation', label: 'Lieu de formation', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CONTRAT DE PRESTATION DE FORMATION CONTINUE</h1>
<p>Entre <strong>{{nom_organisme_formation}}</strong> (prestataire) et <strong>{{nom_client}}</strong> (client), il est convenu ce qui suit :</p>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin:12px 0;"><strong>Formation :</strong> {{intitule_formation}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Participants</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nombre_participants}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{duree_formation}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Dates</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{dates_formation}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Lieu</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{lieu_formation}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Coût total HT</td><td style="padding:8px;">{{cout_total}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Modalités de paiement :</strong><br/>{{modalites_paiement}}</div>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>Le prestataire</strong><br/>{{nom_organisme_formation}}<br/><br/>Signature : _______________</div><div><strong>Le client</strong><br/>{{nom_client}}<br/><br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 52,
  },

  {
    code: 'edu2_charte_utilisation_numerique_scolaire',
    name: 'Charte utilisation numérique scolaire',
    category: 'juridique_admin',
    description: 'Charte d\'utilisation responsable des outils numériques en milieu scolaire',
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
      { name: 'annee_scolaire', label: 'Année scolaire', type: 'text', required: true },
      { name: 'outils_concernes', label: 'Outils numériques concernés', type: 'textarea', required: true },
      { name: 'regles_utilisation', label: 'Règles d\'utilisation', type: 'textarea', required: true },
      { name: 'interdictions', label: 'Interdictions', type: 'textarea', required: true },
      { name: 'sanctions', label: 'Sanctions en cas de violation', type: 'textarea', required: false },
      { name: 'nom_responsable', label: 'Responsable numérique', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CHARTE D'UTILISATION DU NUMÉRIQUE</h1>
<h2 style="text-align:center;color:#2d6a9f;">{{nom_etablissement}} — {{annee_scolaire}}</h2>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin:12px 0;"><strong>Outils concernés :</strong><br/>{{outils_concernes}}</div>
<h3 style="color:#2e7d32;">Règles d'utilisation</h3>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;">{{regles_utilisation}}</div>
<h3 style="color:#c0392b;">Interdictions</h3>
<div style="background:#FFF5F5;padding:12px;border-radius:4px;margin-bottom:10px;">{{interdictions}}</div>
<h3 style="color:#e65100;">Sanctions</h3>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;margin-bottom:15px;">{{sanctions}}</div>
<p>Je soussigné(e), m'engage à respecter la présente charte.</p>
<p style="margin-top:15px;"><strong>Responsable numérique :</strong> {{nom_responsable}}</p>
<p>Signature de l'élève / parent : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'edu2_convention_bourses_etudes',
    name: 'Convention bourses d\'études',
    category: 'commercial_financier',
    description: 'Convention d\'attribution de bourses d\'études entre donateur et bénéficiaire',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisme_donateur', label: 'Organisme donateur', type: 'text', required: true },
      { name: 'nom_boursier', label: 'Nom du boursier', type: 'text', required: true },
      { name: 'etablissement_formation', label: 'Établissement de formation', type: 'text', required: true },
      { name: 'filiere_etudes', label: 'Filière / Programme d\'études', type: 'text', required: true },
      { name: 'montant_bourse_mensuel', label: 'Montant mensuel de la bourse (FCFA)', type: 'text', required: true },
      { name: 'duree_bourse', label: 'Durée de la bourse (années)', type: 'text', required: true },
      { name: 'conditions_maintien', label: 'Conditions de maintien de la bourse', type: 'textarea', required: true },
      { name: 'date_debut_bourse', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CONVENTION D'ATTRIBUTION DE BOURSE D'ÉTUDES</h1>
<p>Entre <strong>{{nom_organisme_donateur}}</strong> et <strong>{{nom_boursier}}</strong> :</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Rubrique</th><th style="padding:8px;text-align:left;">Détail</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Établissement</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{etablissement_formation}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Filière</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{filiere_etudes}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Montant mensuel</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{montant_bourse_mensuel}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{duree_bourse}} ans</td></tr>
<tr style="background:#FFF9C4;"><td style="padding:8px;">Date de début</td><td style="padding:8px;">{{date_debut_bourse}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;"><strong>Conditions de maintien :</strong><br/>{{conditions_maintien}}</div>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>Le donateur</strong><br/>{{nom_organisme_donateur}}<br/>Signature : _______________</div><div><strong>Le boursier</strong><br/>{{nom_boursier}}<br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'edu2_plan_amelioration_resultats_scolaires',
    name: 'Plan amélioration résultats scolaires',
    category: 'communication',
    description: 'Plan d\'action pour améliorer les résultats scolaires d\'un établissement',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
      { name: 'annee_scolaire', label: 'Année scolaire', type: 'text', required: true },
      { name: 'taux_reussite_actuel', label: 'Taux de réussite actuel (%)', type: 'text', required: true },
      { name: 'taux_reussite_cible', label: 'Taux de réussite cible (%)', type: 'text', required: true },
      { name: 'matieres_faibles', label: 'Matières à renforcer', type: 'textarea', required: true },
      { name: 'actions_proposees', label: 'Actions proposées', type: 'textarea', required: true },
      { name: 'ressources_necesaires', label: 'Ressources nécessaires', type: 'textarea', required: false },
      { name: 'calendrier', label: 'Calendrier de mise en oeuvre', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">PLAN D'AMÉLIORATION DES RÉSULTATS SCOLAIRES</h1>
<p><strong>Établissement :</strong> {{nom_etablissement}} &nbsp;|&nbsp; <strong>Année :</strong> {{annee_scolaire}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Indicateur</th><th style="padding:8px;text-align:right;">Valeur</th></tr>
<tr style="background:#FFF5F5;"><td style="padding:7px 8px;border-bottom:1px solid #eee;">Taux de réussite actuel</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{taux_reussite_actuel}} %</td></tr>
<tr style="background:#E8F5E9;font-weight:bold;"><td style="padding:8px;">Taux de réussite cible</td><td style="padding:8px;text-align:right;">{{taux_reussite_cible}} %</td></tr>
</table>
<div style="background:#FFF5F5;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Matières à renforcer :</strong><br/>{{matieres_faibles}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Actions proposées :</strong><br/>{{actions_proposees}}</div>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;margin-bottom:10px;"><strong>Ressources nécessaires :</strong><br/>{{ressources_necesaires}}</div>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;"><strong>Calendrier :</strong><br/>{{calendrier}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'edu2_contrat_consultant_pedagogique',
    name: 'Contrat consultant pédagogique',
    category: 'commercial_financier',
    description: 'Contrat d\'intervention d\'un consultant en ingénierie pédagogique',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_consultant', label: 'Nom du consultant', type: 'text', required: true },
      { name: 'nom_client', label: 'Établissement / Client', type: 'text', required: true },
      { name: 'mission_consultant', label: 'Mission du consultant', type: 'textarea', required: true },
      { name: 'duree_mission', label: 'Durée de la mission', type: 'text', required: true },
      { name: 'honoraires_journaliers', label: 'Honoraires journaliers (FCFA)', type: 'text', required: true },
      { name: 'budget_total_mission', label: 'Budget total de la mission (FCFA)', type: 'text', required: true },
      { name: 'livrables', label: 'Livrables attendus', type: 'textarea', required: true },
      { name: 'date_debut_mission', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CONTRAT DE CONSULTANT PÉDAGOGIQUE</h1>
<p>Entre <strong>{{nom_client}}</strong> (le client) et <strong>{{nom_consultant}}</strong> (le consultant) :</p>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin:12px 0;"><strong>Mission :</strong><br/>{{mission_consultant}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Paramètre financier</th><th style="padding:8px;text-align:right;">Valeur (FCFA)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Honoraires journaliers</td><td style="padding:7px 8px;text-align:right;border-bottom:1px solid #eee;">{{honoraires_journaliers}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Budget total mission</td><td style="padding:8px;text-align:right;">{{budget_total_mission}}</td></tr>
</table>
<p><strong>Durée :</strong> {{duree_mission}} &nbsp;|&nbsp; <strong>Début :</strong> {{date_debut_mission}}</p>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Livrables :</strong><br/>{{livrables}}</div>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>Le client</strong><br/>{{nom_client}}<br/>Signature : _______________</div><div><strong>Le consultant</strong><br/>{{nom_consultant}}<br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 44,
  },

  {
    code: 'edu2_accord_accreditation_programme',
    name: 'Accord accréditation programme',
    category: 'juridique_admin',
    description: 'Accord d\'accréditation d\'un programme académique par un organisme compétent',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_organisme_accrediteur', label: 'Organisme accrédite ur', type: 'text', required: true },
      { name: 'nom_etablissement', label: 'Établissement demandeur', type: 'text', required: true },
      { name: 'intitule_programme', label: 'Intitulé du programme', type: 'text', required: true },
      { name: 'niveau_certification', label: 'Niveau de certification', type: 'text', required: true },
      { name: 'duree_accreditation', label: 'Durée de l\'accréditation', type: 'text', required: true },
      { name: 'conditions_accreditation', label: 'Conditions d\'accréditation', type: 'textarea', required: true },
      { name: 'obligations_etablissement', label: 'Obligations de l\'établissement', type: 'textarea', required: false },
      { name: 'date_accreditation', label: 'Date d\'accréditation', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">ACCORD D'ACCRÉDITATION DE PROGRAMME</h1>
<p><strong>Accrédité par :</strong> {{nom_organisme_accrediteur}} &nbsp;|&nbsp; <strong>Date :</strong> {{date_accreditation}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Information</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Établissement</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{nom_etablissement}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Programme</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{intitule_programme}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Niveau</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{niveau_certification}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Durée accréditation</td><td style="padding:8px;">{{duree_accreditation}}</td></tr>
</table>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Conditions :</strong><br/>{{conditions_accreditation}}</div>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Obligations de l'établissement :</strong><br/>{{obligations_etablissement}}</div>
<p style="margin-top:20px;text-align:center;">Délivré par <strong>{{nom_organisme_accrediteur}}</strong> — Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 40,
  },

  {
    code: 'edu2_fiche_evaluation_enseignant',
    name: 'Fiche évaluation enseignant',
    category: 'communication',
    description: 'Fiche d\'évaluation annuelle d\'un enseignant par sa hiérarchie',
    price: 200, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_enseignant', label: 'Nom de l\'enseignant', type: 'text', required: true },
      { name: 'matiere', label: 'Matière enseignée', type: 'text', required: true },
      { name: 'annee_scolaire', label: 'Année scolaire', type: 'text', required: true },
      { name: 'note_pedagogique', label: 'Note pédagogie (/20)', type: 'text', required: true },
      { name: 'note_ponctualite', label: 'Note ponctualité (/20)', type: 'text', required: true },
      { name: 'note_relations', label: 'Note relations avec élèves (/20)', type: 'text', required: true },
      { name: 'note_globale', label: 'Note globale (/20)', type: 'text', required: true },
      { name: 'commentaires', label: 'Commentaires et recommandations', type: 'textarea', required: false },
      { name: 'nom_evaluateur', label: 'Nom de l\'évaluateur', type: 'text', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">FICHE D'ÉVALUATION ENSEIGNANT</h1>
<p><strong>Enseignant :</strong> {{nom_enseignant}} &nbsp;|&nbsp; <strong>Matière :</strong> {{matiere}} &nbsp;|&nbsp; <strong>Année :</strong> {{annee_scolaire}}</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Critère</th><th style="padding:8px;text-align:center;">Note (/20)</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Pédagogie</td><td style="padding:7px 8px;text-align:center;border-bottom:1px solid #eee;">{{note_pedagogique}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Ponctualité</td><td style="padding:7px 8px;text-align:center;border-bottom:1px solid #eee;">{{note_ponctualite}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Relations avec les élèves</td><td style="padding:7px 8px;text-align:center;border-bottom:1px solid #eee;">{{note_relations}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">NOTE GLOBALE</td><td style="padding:8px;text-align:center;font-size:16px;">{{note_globale}} / 20</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;"><strong>Commentaires :</strong><br/>{{commentaires}}</div>
<p style="margin-top:15px;text-align:right;"><strong>Évaluateur :</strong> {{nom_evaluateur}}<br/>Signature : _______________</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 57,
  },

  {
    code: 'edu2_convention_bibliotheque_numerique',
    name: 'Convention bibliothèque numérique',
    category: 'commercial_financier',
    description: 'Convention d\'accès et d\'utilisation d\'une bibliothèque numérique pour établissements',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_fournisseur', label: 'Fournisseur de la bibliothèque', type: 'text', required: true },
      { name: 'nom_etablissement', label: 'Établissement abonné', type: 'text', required: true },
      { name: 'ressources_incluses', label: 'Ressources incluses', type: 'textarea', required: true },
      { name: 'nombre_utilisateurs', label: 'Nombre d\'utilisateurs autorisés', type: 'text', required: true },
      { name: 'cout_abonnement', label: 'Coût d\'abonnement annuel (FCFA)', type: 'text', required: true },
      { name: 'duree_convention', label: 'Durée de la convention', type: 'text', required: true },
      { name: 'conditions_acces', label: 'Conditions d\'accès', type: 'textarea', required: false },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CONVENTION BIBLIOTHÈQUE NUMÉRIQUE</h1>
<p>Entre <strong>{{nom_fournisseur}}</strong> (fournisseur) et <strong>{{nom_etablissement}}</strong> (abonné) :</p>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin:12px 0;"><strong>Ressources incluses :</strong><br/>{{ressources_incluses}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Utilisateurs autorisés</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nombre_utilisateurs}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{duree_convention}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date de début</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_debut}}</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">Abonnement annuel</td><td style="padding:8px;">{{cout_abonnement}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Conditions d'accès :</strong><br/>{{conditions_acces}}</div>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>Le fournisseur</strong><br/>{{nom_fournisseur}}<br/>Signature : _______________</div><div><strong>L'établissement</strong><br/>{{nom_etablissement}}<br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 46,
  },

  {
    code: 'edu2_rapport_activites_parascolaires',
    name: 'Rapport activités parascolaires',
    category: 'communication',
    description: 'Rapport annuel des activités parascolaires d\'un établissement',
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
      { name: 'annee_scolaire', label: 'Année scolaire', type: 'text', required: true },
      { name: 'clubs_associations', label: 'Clubs et associations actifs', type: 'textarea', required: true },
      { name: 'nombre_participants', label: 'Nombre total de participants', type: 'text', required: true },
      { name: 'activites_realisees', label: 'Activités réalisées', type: 'textarea', required: true },
      { name: 'resultats_competitions', label: 'Résultats compétitions / événements', type: 'textarea', required: false },
      { name: 'budget_utilise', label: 'Budget utilisé (FCFA)', type: 'text', required: false },
      { name: 'perspectives', label: 'Perspectives pour la prochaine année', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">RAPPORT DES ACTIVITÉS PARASCOLAIRES</h1>
<h2 style="color:#2d6a9f;">{{nom_etablissement}} — {{annee_scolaire}}</h2>
<p><strong>Participants totaux :</strong> {{nombre_participants}} &nbsp;|&nbsp; <strong>Budget utilisé :</strong> {{budget_utilise}} FCFA</p>
<h3 style="color:#1a3c5e;margin-top:15px;">Clubs et associations</h3>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin-bottom:10px;">{{clubs_associations}}</div>
<h3 style="color:#1a3c5e;">Activités réalisées</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;">{{activites_realisees}}</div>
<h3 style="color:#1a3c5e;">Résultats compétitions</h3>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:10px;">{{resultats_competitions}}</div>
<h3 style="color:#1a3c5e;">Perspectives</h3>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;">{{perspectives}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 43,
  },

  {
    code: 'edu2_plan_developpement_capacites',
    name: 'Plan développement capacités',
    category: 'communication',
    description: 'Plan de développement des capacités du personnel éducatif',
    price: 450, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
      { name: 'periode_plan', label: 'Période du plan', type: 'text', required: true },
      { name: 'objectifs_renforcement', label: 'Objectifs de renforcement', type: 'textarea', required: true },
      { name: 'beneficiaires', label: 'Bénéficiaires ciblés', type: 'textarea', required: true },
      { name: 'formations_prevues', label: 'Formations et activités prévues', type: 'textarea', required: true },
      { name: 'budget_alloue', label: 'Budget alloué (FCFA)', type: 'text', required: false },
      { name: 'partenaires', label: 'Partenaires impliqués', type: 'textarea', required: false },
      { name: 'indicateurs_suivi', label: 'Indicateurs de suivi', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">PLAN DE DÉVELOPPEMENT DES CAPACITÉS</h1>
<h2 style="color:#2d6a9f;">{{nom_etablissement}} — {{periode_plan}}</h2>
<div style="background:#1a3c5e;color:white;padding:10px;border-radius:4px;margin:12px 0;"><strong>Objectifs :</strong><br/>{{objectifs_renforcement}}</div>
<h3 style="color:#1a3c5e;">Bénéficiaires ciblés</h3>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin-bottom:10px;">{{beneficiaires}}</div>
<h3 style="color:#1a3c5e;">Formations et activités prévues</h3>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:10px;">{{formations_prevues}}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Budget alloué</th><th style="padding:8px;text-align:right;">{{budget_alloue}} FCFA</th></tr>
</table>
<div style="display:flex;gap:12px;"><div style="flex:1;background:#E8F5E9;padding:10px;border-radius:4px;"><strong>Partenaires :</strong><br/>{{partenaires}}</div><div style="flex:1;background:#FFF9C4;padding:10px;border-radius:4px;"><strong>Indicateurs :</strong><br/>{{indicateurs_suivi}}</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 47,
  },

  {
    code: 'edu2_contrat_location_salle_formation',
    name: 'Contrat location salle formation',
    category: 'commercial_financier',
    description: 'Contrat de location de salle pour organisation de formations ou séminaires',
    price: 300, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_proprietaire', label: 'Propriétaire / Bailleur', type: 'text', required: true },
      { name: 'nom_locataire', label: 'Locataire / Organisateur', type: 'text', required: true },
      { name: 'designation_salle', label: 'Désignation de la salle', type: 'text', required: true },
      { name: 'capacite_salle', label: 'Capacité de la salle (personnes)', type: 'text', required: true },
      { name: 'date_location', label: 'Date(s) de location', type: 'text', required: true },
      { name: 'horaires', label: 'Horaires d\'utilisation', type: 'text', required: true },
      { name: 'loyer_journalier', label: 'Loyer journalier (FCFA)', type: 'text', required: true },
      { name: 'montant_total', label: 'Montant total (FCFA)', type: 'text', required: true },
      { name: 'equipements_fournis', label: 'Équipements fournis', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CONTRAT DE LOCATION DE SALLE DE FORMATION</h1>
<p>Entre <strong>{{nom_proprietaire}}</strong> (bailleur) et <strong>{{nom_locataire}}</strong> (locataire) :</p>
<table style="width:100%;border-collapse:collapse;margin:15px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Détail</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Salle louée</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{designation_salle}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Capacité</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{capacite_salle}} personnes</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date(s)</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_location}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Horaires</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{horaires}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Loyer journalier</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{loyer_journalier}} FCFA</td></tr>
<tr style="background:#FFF9C4;font-weight:bold;"><td style="padding:8px;">MONTANT TOTAL</td><td style="padding:8px;">{{montant_total}} FCFA</td></tr>
</table>
<div style="background:#F0F4F8;padding:10px;border-radius:4px;"><strong>Équipements fournis :</strong><br/>{{equipements_fournis}}</div>
<div style="display:flex;justify-content:space-between;margin-top:25px;"><div><strong>Le bailleur</strong><br/>{{nom_proprietaire}}<br/>Signature : _______________</div><div><strong>Le locataire</strong><br/>{{nom_locataire}}<br/>Signature : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 53,
  },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    await prisma.documentTemplate.upsert({
      where: { code: t.code },
      update: {},
      create: t,
    });
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    if (existing && existing.createdAt.getTime() === existing.updatedAt.getTime()) {
      created++;
    } else {
      updated++;
    }
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Seed Education Avancé terminé. Traités: ${templates.length} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
