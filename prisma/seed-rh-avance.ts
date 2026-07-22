import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const templates = [
  {
    code: 'rh2_plan_formation_annuel',
    name: 'Plan de formation annuel',
    category: 'rh_emploi',
    description: 'Planifier et structurer le plan de formation annuel de l\'entreprise',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année du plan', type: 'text', required: true },
      { name: 'responsable_formation', label: 'Responsable formation', type: 'text', required: true },
      { name: 'budget_formation', label: 'Budget alloué (FCFA)', type: 'text', required: true },
      { name: 'effectif_concerne', label: 'Effectif concerné', type: 'text', required: false },
      { name: 'axes_prioritaires', label: 'Axes prioritaires de formation', type: 'textarea', required: true },
      { name: 'calendrier', label: 'Calendrier prévisionnel', type: 'textarea', required: false },
      { name: 'indicateurs', label: 'Indicateurs de suivi', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#1a3c5e;color:white;padding:16px 20px;border-radius:6px 6px 0 0;">
<h1 style="margin:0;font-size:20px;">PLAN DE FORMATION ANNUEL {{annee}}</h1>
<p style="margin:4px 0 0;opacity:.85;">{{nom_entreprise}}</p>
</div>
<div style="border:1px solid #ddd;border-top:none;padding:16px;border-radius:0 0 6px 6px;">
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
<tr style="background:#E3F2FD;"><th style="padding:8px;text-align:left;border-bottom:2px solid #1a3c5e;" colspan="2">INFORMATIONS GÉNÉRALES</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;width:40%;">Responsable formation</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{responsable_formation}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Budget alloué</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{budget_formation}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Effectif concerné</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{effectif_concerne}} collaborateurs</td></tr>
</table>
<div style="background:#F0F7FF;padding:12px;border-left:4px solid #1a3c5e;margin-bottom:12px;border-radius:0 4px 4px 0;">
<strong style="color:#1a3c5e;">Axes prioritaires :</strong><br/><span style="white-space:pre-line;">{{axes_prioritaires}}</span>
</div>
<div style="background:#F9F9F9;padding:12px;border-radius:4px;margin-bottom:10px;">
<strong>Calendrier prévisionnel :</strong><br/>{{calendrier}}
</div>
<div style="background:#FFF9C4;padding:10px;border-radius:4px;">
<strong>Indicateurs de suivi :</strong> {{indicateurs}}
</div>
</div></div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'rh2_accord_teletravail',
    name: 'Accord de télétravail',
    category: 'rh_emploi',
    description: 'Formaliser les conditions du télétravail entre employeur et salarié',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'nom_salarie', label: 'Nom du salarié', type: 'text', required: true },
      { name: 'poste', label: 'Poste occupé', type: 'text', required: true },
      { name: 'jours_teletravail', label: 'Nombre de jours de télétravail/semaine', type: 'text', required: true },
      { name: 'plages_horaires', label: 'Plages horaires obligatoires', type: 'text', required: false },
      { name: 'lieu_teletravail', label: 'Lieu de télétravail déclaré', type: 'text', required: true },
      { name: 'equipements', label: 'Équipements fournis', type: 'textarea', required: false },
      { name: 'date_prise_effet', label: 'Date de prise d\'effet', type: 'date', required: true },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">ACCORD DE TÉLÉTRAVAIL</h1>
<p style="text-align:center;color:#555;">Entre <strong>{{nom_entreprise}}</strong> et <strong>{{nom_salarie}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Paramètre</th><th style="padding:8px;text-align:left;">Valeur</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Salarié</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_salarie}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Poste</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{poste}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Jours de télétravail/semaine</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{jours_teletravail}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Plages horaires</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{plages_horaires}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Lieu de télétravail</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{lieu_teletravail}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Prise d'effet</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_prise_effet}}</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:16px;"><strong>Équipements fournis :</strong> {{equipements}}</div>
<div style="display:flex;justify-content:space-between;margin-top:30px;">
<div>Signature employeur : _______________</div><div>Signature salarié : _______________</div>
</div></div>`,
    countriesJson: COUNTRIES, active: true, popularity: 62,
  },

  {
    code: 'rh2_charte_numerique',
    name: 'Charte numérique entreprise',
    category: 'rh_emploi',
    description: 'Définir les règles d\'utilisation des outils numériques en entreprise',
    price: 450, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_entree_vigueur', label: 'Date d\'entrée en vigueur', type: 'date', required: true },
      { name: 'outils_concernes', label: 'Outils numériques concernés', type: 'textarea', required: true },
      { name: 'usages_autorises', label: 'Usages autorisés', type: 'textarea', required: false },
      { name: 'usages_interdits', label: 'Usages interdits', type: 'textarea', required: false },
      { name: 'sanctions', label: 'Sanctions en cas de non-respect', type: 'textarea', required: false },
      { name: 'referent_numerique', label: 'Référent numérique', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#0d47a1;color:white;padding:16px 20px;border-radius:6px;margin-bottom:16px;">
<h1 style="margin:0;font-size:20px;">CHARTE NUMÉRIQUE</h1>
<p style="margin:4px 0 0;opacity:.85;">{{nom_entreprise}} — En vigueur le {{date_entree_vigueur}}</p>
</div>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin-bottom:14px;">
<strong style="color:#0d47a1;">Outils concernés :</strong><br/>{{outils_concernes}}
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
<div style="background:#E8F5E9;padding:12px;border-radius:4px;">
<strong style="color:#2e7d32;">Usages autorisés :</strong><br/><span style="font-size:13px;">{{usages_autorises}}</span>
</div>
<div style="background:#FFEBEE;padding:12px;border-radius:4px;">
<strong style="color:#c62828;">Usages interdits :</strong><br/><span style="font-size:13px;">{{usages_interdits}}</span>
</div>
</div>
<div style="background:#FFF9C4;padding:12px;border-radius:4px;margin-bottom:12px;">
<strong>Sanctions :</strong> {{sanctions}}
</div>
<p style="color:#555;font-size:13px;">Référent numérique : <strong>{{referent_numerique}}</strong></p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'rh2_procedure_disciplinaire',
    name: 'Procédure disciplinaire',
    category: 'juridique_admin',
    description: 'Documenter une procédure disciplinaire à l\'encontre d\'un salarié',
    price: 700, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'nom_salarie', label: 'Nom du salarié', type: 'text', required: true },
      { name: 'poste_salarie', label: 'Poste du salarié', type: 'text', required: true },
      { name: 'date_faits', label: 'Date des faits reprochés', type: 'date', required: true },
      { name: 'description_faits', label: 'Description des faits reprochés', type: 'textarea', required: true },
      { name: 'sanction_envisagee', label: 'Sanction envisagée', type: 'text', required: true },
      { name: 'date_entretien', label: 'Date de l\'entretien préalable', type: 'date', required: false },
      { name: 'droit_assistance', label: 'Droit à l\'assistance (nom)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="border:2px solid #c62828;border-radius:6px;padding:16px;margin-bottom:16px;">
<h1 style="color:#c62828;margin:0 0 4px;font-size:18px;">PROCÉDURE DISCIPLINAIRE — CONFIDENTIEL</h1>
<p style="margin:0;color:#555;">{{nom_entreprise}}</p>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
<tr style="background:#c62828;color:white;"><th colspan="2" style="padding:8px;text-align:left;">IDENTIFICATION</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;width:40%;">Salarié concerné</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_salarie}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Poste</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{poste_salarie}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date des faits</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_faits}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Sanction envisagée</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;color:#c62828;">{{sanction_envisagee}}</td></tr>
</table>
<div style="background:#FFF5F5;border-left:4px solid #c62828;padding:12px;margin-bottom:12px;">
<strong>Faits reprochés :</strong><br/>{{description_faits}}
</div>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;">
<p><strong>Entretien préalable :</strong> {{date_entretien}}</p>
<p><strong>Droit à l'assistance :</strong> {{droit_assistance}}</p>
</div>
<p style="margin-top:20px;color:#888;font-size:12px;">Ce document est strictement confidentiel et réservé à l'usage interne.</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 44,
  },

  {
    code: 'rh2_grille_evaluation_360',
    name: 'Grille d\'évaluation 360°',
    category: 'rh_emploi',
    description: 'Évaluer un collaborateur selon une approche multi-sources 360°',
    price: 650, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_evalue', label: 'Nom du collaborateur évalué', type: 'text', required: true },
      { name: 'poste_evalue', label: 'Poste occupé', type: 'text', required: true },
      { name: 'periode_evaluation', label: 'Période évaluée', type: 'text', required: true },
      { name: 'evaluateur', label: 'Nom de l\'évaluateur', type: 'text', required: true },
      { name: 'relation', label: 'Relation avec l\'évalué (N+1, pair, client)', type: 'text', required: true },
      { name: 'competences_metier', label: 'Compétences métier (note /10)', type: 'text', required: false },
      { name: 'competences_relationnelles', label: 'Compétences relationnelles (note /10)', type: 'text', required: false },
      { name: 'leadership', label: 'Leadership / Initiative (note /10)', type: 'text', required: false },
      { name: 'axes_amelioration', label: 'Axes d\'amélioration', type: 'textarea', required: false },
      { name: 'points_forts', label: 'Points forts identifiés', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">GRILLE D'ÉVALUATION 360° — {{nom_evalue}}</h1>
<p><strong>Poste :</strong> {{poste_evalue}} &nbsp;|&nbsp; <strong>Période :</strong> {{periode_evaluation}}</p>
<p><strong>Évaluateur :</strong> {{evaluateur}} ({{relation}})</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Dimension</th><th style="padding:8px;text-align:center;">Note /10</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Compétences métier</td><td style="padding:7px 8px;text-align:center;border-bottom:1px solid #eee;font-weight:bold;">{{competences_metier}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Compétences relationnelles</td><td style="padding:7px 8px;text-align:center;border-bottom:1px solid #eee;font-weight:bold;">{{competences_relationnelles}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Leadership / Initiative</td><td style="padding:7px 8px;text-align:center;border-bottom:1px solid #eee;font-weight:bold;">{{leadership}}</td></tr>
</table>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
<div style="background:#E8F5E9;padding:12px;border-radius:4px;"><strong style="color:#2e7d32;">Points forts :</strong><br/>{{points_forts}}</div>
<div style="background:#FFF3E0;padding:12px;border-radius:4px;"><strong style="color:#e65100;">Axes d'amélioration :</strong><br/>{{axes_amelioration}}</div>
</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'rh2_plan_succession',
    name: 'Plan de succession',
    category: 'rh_emploi',
    description: 'Préparer la succession pour les postes clés de l\'entreprise',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'poste_cle', label: 'Poste clé concerné', type: 'text', required: true },
      { name: 'titulaire_actuel', label: 'Titulaire actuel', type: 'text', required: true },
      { name: 'horizon_succession', label: 'Horizon de succession (mois)', type: 'text', required: true },
      { name: 'successeur_immediat', label: 'Successeur immédiat (prêt maintenant)', type: 'text', required: false },
      { name: 'successeur_moyen_terme', label: 'Successeur moyen terme (1-2 ans)', type: 'text', required: false },
      { name: 'successeur_long_terme', label: 'Successeur long terme (+2 ans)', type: 'text', required: false },
      { name: 'actions_developpement', label: 'Actions de développement prévues', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#4a148c;color:white;padding:16px;border-radius:6px;margin-bottom:16px;">
<h1 style="margin:0;font-size:19px;">PLAN DE SUCCESSION</h1>
<p style="margin:4px 0 0;opacity:.85;">{{nom_entreprise}} — Poste : {{poste_cle}}</p>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
<tr style="background:#EDE7F6;"><th colspan="2" style="padding:8px;text-align:left;color:#4a148c;">POSTE ET TITULAIRE</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;width:40%;">Poste clé</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{poste_cle}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Titulaire actuel</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{titulaire_actuel}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Horizon de succession</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{horizon_succession}} mois</td></tr>
</table>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
<tr style="background:#4a148c;color:white;"><th style="padding:8px;">Horizon</th><th style="padding:8px;">Successeur identifié</th><th style="padding:8px;">Statut</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;text-align:center;">Immédiat</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{successeur_immediat}}</td><td style="padding:7px 8px;border-bottom:1px solid #eee;background:#E8F5E9;text-align:center;">Prêt</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;text-align:center;">1-2 ans</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{successeur_moyen_terme}}</td><td style="padding:7px 8px;border-bottom:1px solid #eee;background:#FFF9C4;text-align:center;">En cours</td></tr>
<tr><td style="padding:7px 8px;text-align:center;">+2 ans</td><td style="padding:7px 8px;">{{successeur_long_terme}}</td><td style="padding:7px 8px;background:#FFF3E0;text-align:center;">À préparer</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;"><strong>Actions de développement :</strong><br/>{{actions_developpement}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 40,
  },

  {
    code: 'rh2_politique_remuneration_variable',
    name: 'Politique rémunération variable',
    category: 'rh_emploi',
    description: 'Définir la politique de rémunération variable et de primes',
    price: 750, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee_exercice', label: 'Année d\'exercice', type: 'text', required: true },
      { name: 'part_variable_max', label: 'Part variable maximale (%)', type: 'text', required: true },
      { name: 'criteres_declenchement', label: 'Critères de déclenchement', type: 'textarea', required: true },
      { name: 'indicateurs_performance', label: 'Indicateurs de performance (KPI)', type: 'textarea', required: true },
      { name: 'modalites_calcul', label: 'Modalités de calcul', type: 'textarea', required: false },
      { name: 'periodicite_versement', label: 'Périodicité de versement', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #f9a825;padding-bottom:8px;">POLITIQUE DE RÉMUNÉRATION VARIABLE {{annee_exercice}}</h1>
<p><strong>Entreprise :</strong> {{nom_entreprise}} &nbsp;|&nbsp; <strong>Part variable max :</strong> <span style="color:#f57f17;font-weight:bold;">{{part_variable_max}}%</span></p>
<div style="background:#FFFDE7;border-left:4px solid #f9a825;padding:12px;margin:14px 0;border-radius:0 4px 4px 0;">
<strong>Critères de déclenchement :</strong><br/><span style="white-space:pre-line;">{{criteres_declenchement}}</span>
</div>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;">
<strong>Indicateurs de performance (KPI) :</strong><br/><span style="white-space:pre-line;">{{indicateurs_performance}}</span>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:12px;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Modalités</th><th style="padding:8px;text-align:left;">Détails</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Calcul</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{modalites_calcul}}</td></tr>
<tr><td style="padding:7px 8px;">Périodicité de versement</td><td style="padding:7px 8px;">{{periodicite_versement}}</td></tr>
</table>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 52,
  },

  {
    code: 'rh2_accord_mobilite_interne',
    name: 'Accord mobilité interne',
    category: 'rh_emploi',
    description: 'Encadrer la mobilité interne d\'un collaborateur au sein de l\'entreprise',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'nom_salarie', label: 'Nom du salarié', type: 'text', required: true },
      { name: 'poste_origine', label: 'Poste d\'origine', type: 'text', required: true },
      { name: 'poste_destination', label: 'Nouveau poste', type: 'text', required: true },
      { name: 'site_destination', label: 'Site / Service de destination', type: 'text', required: false },
      { name: 'date_prise_poste', label: 'Date de prise de poste', type: 'date', required: true },
      { name: 'periode_adaptation', label: 'Période d\'adaptation (mois)', type: 'text', required: false },
      { name: 'conditions_specifiques', label: 'Conditions spécifiques', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">ACCORD DE MOBILITÉ INTERNE</h1>
<p><strong>Entreprise :</strong> {{nom_entreprise}}</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:#1a3c5e;color:white;"><th style="padding:8px;text-align:left;">Élément</th><th style="padding:8px;text-align:left;">Information</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Collaborateur</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{nom_salarie}}</td></tr>
<tr style="background:#FFF3E0;"><td style="padding:7px 8px;border-bottom:1px solid #eee;">Poste d'origine</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{poste_origine}}</td></tr>
<tr style="background:#E8F5E9;"><td style="padding:7px 8px;border-bottom:1px solid #eee;">Nouveau poste</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{poste_destination}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Site / Service</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{site_destination}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date de prise de poste</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_prise_poste}}</td></tr>
<tr><td style="padding:7px 8px;">Période d'adaptation</td><td style="padding:7px 8px;">{{periode_adaptation}} mois</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:20px;"><strong>Conditions spécifiques :</strong> {{conditions_specifiques}}</div>
<div style="display:flex;justify-content:space-between;"><div>Signature Direction RH : _______________</div><div>Signature Salarié : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 45,
  },

  {
    code: 'rh2_bilan_social_annuel',
    name: 'Bilan social annuel',
    category: 'rh_emploi',
    description: 'Synthèse annuelle des principaux indicateurs sociaux de l\'entreprise',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année du bilan', type: 'text', required: true },
      { name: 'effectif_total', label: 'Effectif total', type: 'text', required: true },
      { name: 'effectif_cdi', label: 'Dont CDI', type: 'text', required: false },
      { name: 'effectif_femmes', label: 'Dont femmes', type: 'text', required: false },
      { name: 'masse_salariale', label: 'Masse salariale (FCFA)', type: 'text', required: false },
      { name: 'taux_absenteisme', label: 'Taux d\'absentéisme (%)', type: 'text', required: false },
      { name: 'nb_accidents_travail', label: 'Accidents du travail', type: 'text', required: false },
      { name: 'heures_formation', label: 'Heures de formation dispensées', type: 'text', required: false },
      { name: 'commentaire_dg', label: 'Commentaire de la Direction', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#1a3c5e;color:white;padding:16px 20px;border-radius:6px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;">
<div><h1 style="margin:0;font-size:20px;">BILAN SOCIAL {{annee}}</h1><p style="margin:4px 0 0;opacity:.85;">{{nom_entreprise}}</p></div>
<div style="font-size:28px;font-weight:bold;">📊</div>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
<tr style="background:#E3F2FD;"><th colspan="2" style="padding:8px;text-align:left;color:#1a3c5e;">EFFECTIFS</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;width:50%;">Effectif total</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{effectif_total}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Dont CDI</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{effectif_cdi}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Dont femmes</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{effectif_femmes}}</td></tr>
<tr style="background:#E3F2FD;"><th colspan="2" style="padding:8px;text-align:left;color:#1a3c5e;">INDICATEURS CLÉS</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Masse salariale</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{masse_salariale}} FCFA</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Taux d'absentéisme</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{taux_absenteisme}}%</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Accidents du travail</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nb_accidents_travail}}</td></tr>
<tr><td style="padding:7px 8px;">Heures de formation</td><td style="padding:7px 8px;">{{heures_formation}} h</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;border-left:4px solid #1a3c5e;"><strong>Message de la Direction :</strong><br/>{{commentaire_dg}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 60,
  },

  {
    code: 'rh2_charte_diversite_inclusion',
    name: 'Charte diversité inclusion',
    category: 'rh_emploi',
    description: 'Engager l\'entreprise sur les principes de diversité et d\'inclusion',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { name: 'signataire', label: 'Signataire (Directeur Général)', type: 'text', required: true },
      { name: 'engagements_diversite', label: 'Engagements en matière de diversité', type: 'textarea', required: true },
      { name: 'engagements_inclusion', label: 'Engagements en matière d\'inclusion', type: 'textarea', required: true },
      { name: 'actions_concretes', label: 'Actions concrètes prévues', type: 'textarea', required: false },
      { name: 'referent_di', label: 'Référent Diversité & Inclusion', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:linear-gradient(135deg,#e91e63,#9c27b0,#3f51b5);color:white;padding:20px;border-radius:8px;margin-bottom:16px;text-align:center;">
<h1 style="margin:0;font-size:22px;">CHARTE DIVERSITÉ & INCLUSION</h1>
<p style="margin:6px 0 0;opacity:.9;">{{nom_entreprise}}</p>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
<div style="background:#FCE4EC;padding:14px;border-radius:6px;">
<h3 style="color:#c2185b;margin:0 0 8px;">Nos engagements diversité</h3>
<p style="font-size:13px;white-space:pre-line;">{{engagements_diversite}}</p>
</div>
<div style="background:#EDE7F6;padding:14px;border-radius:6px;">
<h3 style="color:#6a1b9a;margin:0 0 8px;">Nos engagements inclusion</h3>
<p style="font-size:13px;white-space:pre-line;">{{engagements_inclusion}}</p>
</div>
</div>
<div style="background:#E8EAF6;padding:12px;border-radius:4px;margin-bottom:14px;">
<strong style="color:#283593;">Actions concrètes :</strong><br/>{{actions_concretes}}
</div>
<p style="color:#555;font-size:13px;">Référent D&I : <strong>{{referent_di}}</strong></p>
<p style="margin-top:20px;">Fait à _______, le {{date_signature}}<br/><br/>Signature : {{signataire}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 50,
  },

  {
    code: 'rh2_contrat_apprentissage',
    name: 'Contrat apprentissage',
    category: 'juridique_admin',
    description: 'Rédiger un contrat d\'apprentissage conforme à la réglementation',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'nom_maitre_apprentissage', label: 'Maître d\'apprentissage', type: 'text', required: true },
      { name: 'nom_apprenti', label: 'Nom de l\'apprenti', type: 'text', required: true },
      { name: 'date_naissance_apprenti', label: 'Date de naissance', type: 'date', required: true },
      { name: 'diplome_prepare', label: 'Diplôme préparé', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { name: 'remuneration_mensuelle', label: 'Rémunération mensuelle (FCFA)', type: 'text', required: true },
      { name: 'duree_hebdomadaire', label: 'Durée hebdomadaire de travail (h)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CONTRAT D'APPRENTISSAGE</h1>
<p style="text-align:center;color:#555;margin-bottom:16px;">Conclu entre <strong>{{nom_entreprise}}</strong> et <strong>{{nom_apprenti}}</strong></p>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
<tr style="background:#1a3c5e;color:white;"><th colspan="2" style="padding:8px;text-align:left;">PARTIES AU CONTRAT</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;width:40%;">Entreprise</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_entreprise}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Maître d'apprentissage</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_maitre_apprentissage}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Apprenti</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{nom_apprenti}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Date de naissance</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_naissance_apprenti}}</td></tr>
<tr style="background:#E3F2FD;"><th colspan="2" style="padding:8px;text-align:left;color:#1a3c5e;">CONDITIONS DU CONTRAT</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Diplôme préparé</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{diplome_prepare}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Durée : du</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_debut}} au {{date_fin}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Rémunération mensuelle</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{remuneration_mensuelle}} FCFA</td></tr>
<tr><td style="padding:7px 8px;">Durée hebdomadaire</td><td style="padding:7px 8px;">{{duree_hebdomadaire}} h</td></tr>
</table>
<div style="display:flex;justify-content:space-between;margin-top:24px;"><div>Signature Entreprise : _______________</div><div>Signature Apprenti : _______________</div></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 53,
  },

  {
    code: 'rh2_convention_stage_avancee',
    name: 'Convention stage avancée',
    category: 'juridique_admin',
    description: 'Convention de stage détaillée avec objectifs pédagogiques et évaluation',
    price: 400, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise accueillante', type: 'text', required: true },
      { name: 'nom_etablissement', label: 'Établissement scolaire / université', type: 'text', required: true },
      { name: 'nom_stagiaire', label: 'Nom du stagiaire', type: 'text', required: true },
      { name: 'nom_tuteur_entreprise', label: 'Tuteur en entreprise', type: 'text', required: true },
      { name: 'nom_tuteur_ecole', label: 'Tuteur académique', type: 'text', required: true },
      { name: 'sujet_stage', label: 'Sujet / Mission de stage', type: 'text', required: true },
      { name: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { name: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { name: 'gratification', label: 'Gratification mensuelle (FCFA)', type: 'text', required: false },
      { name: 'objectifs_pedagogiques', label: 'Objectifs pédagogiques', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;text-align:center;">CONVENTION DE STAGE</h1>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
<div style="background:#E3F2FD;padding:12px;border-radius:4px;"><h4 style="color:#1a3c5e;margin:0 0 8px;">Entreprise d'accueil</h4><p style="margin:4px 0;font-weight:bold;">{{nom_entreprise}}</p><p style="margin:4px 0;font-size:13px;">Tuteur : {{nom_tuteur_entreprise}}</p></div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;"><h4 style="color:#2e7d32;margin:0 0 8px;">Établissement</h4><p style="margin:4px 0;font-weight:bold;">{{nom_etablissement}}</p><p style="margin:4px 0;font-size:13px;">Tuteur : {{nom_tuteur_ecole}}</p></div>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
<tr style="background:#1a3c5e;color:white;"><th colspan="2" style="padding:8px;text-align:left;">INFORMATIONS DU STAGE</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;width:40%;">Stagiaire</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{nom_stagiaire}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Mission / Sujet</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{sujet_stage}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Période</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">Du {{date_debut}} au {{date_fin}}</td></tr>
<tr><td style="padding:7px 8px;">Gratification</td><td style="padding:7px 8px;">{{gratification}} FCFA/mois</td></tr>
</table>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;"><strong>Objectifs pédagogiques :</strong><br/>{{objectifs_pedagogiques}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 65,
  },

  {
    code: 'rh2_reglement_interieur',
    name: 'Règlement intérieur entreprise',
    category: 'juridique_admin',
    description: 'Rédiger le règlement intérieur de l\'entreprise',
    price: 850, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_entree_vigueur', label: 'Date d\'entrée en vigueur', type: 'date', required: true },
      { name: 'horaires_travail', label: 'Horaires de travail', type: 'text', required: false },
      { name: 'regles_tenue', label: 'Règles vestimentaires / tenue', type: 'textarea', required: false },
      { name: 'regles_securite', label: 'Règles de sécurité', type: 'textarea', required: false },
      { name: 'sanctions_disciplinaires', label: 'Échelle des sanctions disciplinaires', type: 'textarea', required: false },
      { name: 'procedure_reclamation', label: 'Procédure de réclamation', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="text-align:center;border:2px solid #1a3c5e;padding:16px;border-radius:6px;margin-bottom:20px;">
<h1 style="color:#1a3c5e;margin:0;font-size:22px;">RÈGLEMENT INTÉRIEUR</h1>
<p style="margin:6px 0 0;font-weight:bold;">{{nom_entreprise}}</p>
<p style="margin:4px 0 0;color:#666;font-size:13px;">En vigueur à compter du {{date_entree_vigueur}}</p>
</div>
<div style="margin-bottom:14px;"><h3 style="color:#1a3c5e;border-bottom:1px solid #ddd;padding-bottom:4px;">Article 1 — Horaires de travail</h3><p>{{horaires_travail}}</p></div>
<div style="margin-bottom:14px;"><h3 style="color:#1a3c5e;border-bottom:1px solid #ddd;padding-bottom:4px;">Article 2 — Tenue et comportement</h3><p>{{regles_tenue}}</p></div>
<div style="margin-bottom:14px;"><h3 style="color:#1a3c5e;border-bottom:1px solid #ddd;padding-bottom:4px;">Article 3 — Hygiène et sécurité</h3><p>{{regles_securite}}</p></div>
<div style="background:#FFF5F5;padding:12px;border-radius:4px;margin-bottom:14px;border-left:4px solid #c62828;">
<h3 style="color:#c62828;margin:0 0 8px;">Article 4 — Sanctions disciplinaires</h3>
<p style="white-space:pre-line;">{{sanctions_disciplinaires}}</p>
</div>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;"><h3 style="color:#1a3c5e;margin:0 0 8px;">Article 5 — Procédure de réclamation</h3><p>{{procedure_reclamation}}</p></div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 47,
  },

  {
    code: 'rh2_plan_egalite_hf',
    name: 'Plan égalité H/F',
    category: 'rh_emploi',
    description: 'Définir les actions pour promouvoir l\'égalité professionnelle Hommes/Femmes',
    price: 550, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee', label: 'Année du plan', type: 'text', required: true },
      { name: 'taux_femmes_actuel', label: 'Taux de féminisation actuel (%)', type: 'text', required: false },
      { name: 'objectif_taux_femmes', label: 'Objectif taux de féminisation (%)', type: 'text', required: false },
      { name: 'ecart_salaire', label: 'Écart salarial H/F constaté (%)', type: 'text', required: false },
      { name: 'actions_recrutement', label: 'Actions recrutement égalitaire', type: 'textarea', required: false },
      { name: 'actions_remuneration', label: 'Actions réduction écarts salariaux', type: 'textarea', required: false },
      { name: 'actions_formation', label: 'Actions formation et promotion', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:linear-gradient(90deg,#1565c0,#e91e63);color:white;padding:16px 20px;border-radius:6px;margin-bottom:16px;">
<h1 style="margin:0;font-size:20px;">PLAN ÉGALITÉ PROFESSIONNELLE H/F</h1>
<p style="margin:4px 0 0;opacity:.9;">{{nom_entreprise}} — {{annee}}</p>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
<tr style="background:#E3F2FD;"><th colspan="2" style="padding:8px;text-align:left;color:#1565c0;">SITUATION ACTUELLE</th></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;width:50%;">Taux de féminisation actuel</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;">{{taux_femmes_actuel}}%</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;">Objectif</td><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;color:#e91e63;">{{objectif_taux_femmes}}%</td></tr>
<tr><td style="padding:7px 8px;">Écart salarial H/F</td><td style="padding:7px 8px;">{{ecart_salaire}}%</td></tr>
</table>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin-bottom:12px;"><strong style="color:#1565c0;">Recrutement :</strong><br/>{{actions_recrutement}}</div>
<div style="background:#FCE4EC;padding:12px;border-radius:4px;margin-bottom:12px;"><strong style="color:#e91e63;">Rémunération :</strong><br/>{{actions_remuneration}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;"><strong style="color:#2e7d32;">Formation & Promotion :</strong><br/>{{actions_formation}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 48,
  },

  {
    code: 'rh2_rapport_rse_social',
    name: 'Rapport RSE social',
    category: 'commercial_financier',
    description: 'Rapport sur la Responsabilité Sociétale de l\'Entreprise — volet social',
    price: 800, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'annee_rapport', label: 'Année du rapport', type: 'text', required: true },
      { name: 'effectif_moyen', label: 'Effectif moyen annuel', type: 'text', required: false },
      { name: 'actions_formation', label: 'Actions de formation RSE', type: 'textarea', required: false },
      { name: 'actions_diversite', label: 'Actions diversité et inclusion', type: 'textarea', required: false },
      { name: 'actions_communaute', label: 'Actions communautaires / mécénat', type: 'textarea', required: false },
      { name: 'indicateurs_rse', label: 'Indicateurs RSE clés', type: 'textarea', required: false },
      { name: 'perspectives', label: 'Perspectives et engagements futurs', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#1b5e20;color:white;padding:20px;border-radius:8px;margin-bottom:18px;">
<h1 style="margin:0;font-size:20px;">RAPPORT RSE — VOLET SOCIAL {{annee_rapport}}</h1>
<p style="margin:6px 0 0;opacity:.85;">{{nom_entreprise}} &nbsp;|&nbsp; Effectif moyen : {{effectif_moyen}}</p>
</div>
<div style="margin-bottom:14px;background:#E8F5E9;padding:14px;border-radius:4px;border-left:4px solid #2e7d32;">
<h3 style="color:#1b5e20;margin:0 0 8px;">Formation et développement des compétences</h3>
<p style="white-space:pre-line;font-size:13px;">{{actions_formation}}</p>
</div>
<div style="margin-bottom:14px;background:#F3E5F5;padding:14px;border-radius:4px;border-left:4px solid #7b1fa2;">
<h3 style="color:#4a148c;margin:0 0 8px;">Diversité et inclusion</h3>
<p style="white-space:pre-line;font-size:13px;">{{actions_diversite}}</p>
</div>
<div style="margin-bottom:14px;background:#FFF3E0;padding:14px;border-radius:4px;border-left:4px solid #e65100;">
<h3 style="color:#bf360c;margin:0 0 8px;">Engagement communautaire</h3>
<p style="white-space:pre-line;font-size:13px;">{{actions_communaute}}</p>
</div>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;"><strong>Indicateurs RSE :</strong><br/>{{indicateurs_rse}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;"><strong>Perspectives :</strong> {{perspectives}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 42,
  },

  {
    code: 'rh2_fiche_poste_detaillee',
    name: 'Fiche poste détaillée',
    category: 'rh_emploi',
    description: 'Rédiger une fiche de poste complète avec missions et compétences requises',
    price: 350, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'intitule_poste', label: 'Intitulé du poste', type: 'text', required: true },
      { name: 'direction_service', label: 'Direction / Service', type: 'text', required: true },
      { name: 'rattachement_hierarchique', label: 'Rattachement hiérarchique', type: 'text', required: true },
      { name: 'classification', label: 'Classification / Grade', type: 'text', required: false },
      { name: 'missions_principales', label: 'Missions principales', type: 'textarea', required: true },
      { name: 'activites_detaillees', label: 'Activités détaillées', type: 'textarea', required: false },
      { name: 'competences_requises', label: 'Compétences requises', type: 'textarea', required: true },
      { name: 'formation_experience', label: 'Formation et expérience requises', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#1a3c5e;color:white;padding:14px 20px;border-radius:6px 6px 0 0;">
<h1 style="margin:0;font-size:20px;">FICHE DE POSTE</h1>
<h2 style="margin:6px 0 0;font-size:16px;opacity:.9;">{{intitule_poste}}</h2>
</div>
<div style="border:1px solid #ddd;border-top:none;padding:16px;border-radius:0 0 6px 6px;">
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;width:40%;font-weight:bold;background:#F5F7FA;">Direction / Service</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{direction_service}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:bold;background:#F5F7FA;">Rattachement</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{rattachement_hierarchique}}</td></tr>
<tr><td style="padding:7px 8px;font-weight:bold;background:#F5F7FA;">Classification</td><td style="padding:7px 8px;">{{classification}}</td></tr>
</table>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin-bottom:12px;"><strong style="color:#1a3c5e;">Missions principales :</strong><br/><span style="white-space:pre-line;">{{missions_principales}}</span></div>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;"><strong>Activités :</strong><br/><span style="white-space:pre-line;font-size:13px;">{{activites_detaillees}}</span></div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;margin-bottom:12px;"><strong style="color:#2e7d32;">Compétences requises :</strong><br/>{{competences_requises}}</div>
<div style="background:#FFF9C4;padding:12px;border-radius:4px;"><strong>Formation / Expérience :</strong> {{formation_experience}}</div>
</div></div>`,
    countriesJson: COUNTRIES, active: true, popularity: 70,
  },

  {
    code: 'rh2_protocole_onboarding',
    name: 'Protocole onboarding',
    category: 'rh_emploi',
    description: 'Structurer le processus d\'intégration d\'un nouveau collaborateur',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'nom_nouveau_collaborateur', label: 'Nom du nouveau collaborateur', type: 'text', required: true },
      { name: 'poste', label: 'Poste', type: 'text', required: true },
      { name: 'date_arrivee', label: 'Date d\'arrivée', type: 'date', required: true },
      { name: 'referent_onboarding', label: 'Référent / Parrain onboarding', type: 'text', required: false },
      { name: 'semaine_1', label: 'Programme semaine 1', type: 'textarea', required: false },
      { name: 'mois_1', label: 'Objectifs mois 1', type: 'textarea', required: false },
      { name: 'mois_3', label: 'Objectifs à 3 mois', type: 'textarea', required: false },
      { name: 'ressources_remises', label: 'Ressources remises à l\'arrivée', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="background:#00695c;color:white;padding:16px 20px;border-radius:8px;margin-bottom:18px;">
<h1 style="margin:0;font-size:20px;">PROTOCOLE D'ONBOARDING</h1>
<p style="margin:4px 0 0;opacity:.85;">Bienvenue {{nom_nouveau_collaborateur}} — Poste : {{poste}}</p>
</div>
<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;width:40%;background:#F5F7FA;font-weight:bold;">Entreprise</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{nom_entreprise}}</td></tr>
<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;background:#F5F7FA;font-weight:bold;">Date d'arrivée</td><td style="padding:7px 8px;border-bottom:1px solid #eee;">{{date_arrivee}}</td></tr>
<tr><td style="padding:7px 8px;background:#F5F7FA;font-weight:bold;">Référent onboarding</td><td style="padding:7px 8px;">{{referent_onboarding}}</td></tr>
</table>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px;">
<div style="background:#E0F2F1;padding:10px;border-radius:4px;"><strong style="color:#00695c;font-size:12px;">SEMAINE 1</strong><br/><span style="font-size:12px;white-space:pre-line;">{{semaine_1}}</span></div>
<div style="background:#B2DFDB;padding:10px;border-radius:4px;"><strong style="color:#00695c;font-size:12px;">MOIS 1</strong><br/><span style="font-size:12px;white-space:pre-line;">{{mois_1}}</span></div>
<div style="background:#80CBC4;padding:10px;border-radius:4px;"><strong style="color:#00695c;font-size:12px;">3 MOIS</strong><br/><span style="font-size:12px;white-space:pre-line;">{{mois_3}}</span></div>
</div>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;"><strong>Ressources remises :</strong> {{ressources_remises}}</div>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 58,
  },

  {
    code: 'rh2_plan_carriere_collaborateur',
    name: 'Plan carrière collaborateur',
    category: 'rh_emploi',
    description: 'Définir et structurer le plan de carrière d\'un collaborateur',
    price: 600, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_collaborateur', label: 'Nom du collaborateur', type: 'text', required: true },
      { name: 'poste_actuel', label: 'Poste actuel', type: 'text', required: true },
      { name: 'anciennete', label: 'Ancienneté (années)', type: 'text', required: false },
      { name: 'objectif_carriere', label: 'Objectif de carrière à 5 ans', type: 'text', required: true },
      { name: 'etapes_court_terme', label: 'Étapes court terme (0-1 an)', type: 'textarea', required: false },
      { name: 'etapes_moyen_terme', label: 'Étapes moyen terme (1-3 ans)', type: 'textarea', required: false },
      { name: 'formations_cles', label: 'Formations clés identifiées', type: 'textarea', required: false },
      { name: 'date_entretien', label: 'Date de l\'entretien carrière', type: 'date', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:2px solid #2d6a9f;padding-bottom:8px;">PLAN DE CARRIÈRE — {{nom_collaborateur}}</h1>
<p><strong>Poste actuel :</strong> {{poste_actuel}} &nbsp;|&nbsp; <strong>Ancienneté :</strong> {{anciennete}} ans</p>
<div style="background:#E3F2FD;padding:14px;border-radius:6px;margin:14px 0;border-left:5px solid #1a3c5e;">
<strong style="color:#1a3c5e;font-size:15px;">Objectif à 5 ans :</strong><br/>
<p style="font-size:16px;font-weight:bold;margin:6px 0 0;">{{objectif_carriere}}</p>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
<div style="border:1px solid #ddd;padding:12px;border-radius:4px;">
<h4 style="color:#1a3c5e;margin:0 0 8px;border-bottom:1px solid #eee;padding-bottom:4px;">Court terme (0-1 an)</h4>
<p style="font-size:13px;white-space:pre-line;">{{etapes_court_terme}}</p>
</div>
<div style="border:1px solid #ddd;padding:12px;border-radius:4px;">
<h4 style="color:#1a3c5e;margin:0 0 8px;border-bottom:1px solid #eee;padding-bottom:4px;">Moyen terme (1-3 ans)</h4>
<p style="font-size:13px;white-space:pre-line;">{{etapes_moyen_terme}}</p>
</div>
</div>
<div style="background:#FFF9C4;padding:12px;border-radius:4px;margin-bottom:10px;"><strong>Formations clés :</strong><br/>{{formations_cles}}</div>
<p style="color:#888;font-size:12px;">Entretien carrière du : {{date_entretien}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 55,
  },

  {
    code: 'rh2_accord_participation_resultats',
    name: 'Accord participation résultats',
    category: 'commercial_financier',
    description: 'Accord collectif de participation des salariés aux résultats de l\'entreprise',
    price: 900, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_accord', label: 'Date de l\'accord', type: 'date', required: true },
      { name: 'representants_direction', label: 'Représentants de la direction', type: 'text', required: true },
      { name: 'representants_salaries', label: 'Représentants des salariés', type: 'text', required: true },
      { name: 'exercice_reference', label: 'Exercice de référence', type: 'text', required: true },
      { name: 'formule_calcul', label: 'Formule de calcul de la participation', type: 'textarea', required: true },
      { name: 'modalites_repartition', label: 'Modalités de répartition', type: 'textarea', required: false },
      { name: 'duree_blocage', label: 'Durée de blocage (années)', type: 'text', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<h1 style="color:#1a3c5e;border-bottom:3px solid #f9a825;padding-bottom:8px;text-align:center;">ACCORD DE PARTICIPATION AUX RÉSULTATS</h1>
<p style="text-align:center;color:#555;">{{nom_entreprise}} — Exercice {{exercice_reference}}</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:16px 0;">
<div style="background:#E3F2FD;padding:12px;border-radius:4px;"><strong style="color:#1a3c5e;">Direction</strong><br/>{{representants_direction}}</div>
<div style="background:#E8F5E9;padding:12px;border-radius:4px;"><strong style="color:#2e7d32;">Représentants des salariés</strong><br/>{{representants_salaries}}</div>
</div>
<div style="background:#FFFDE7;border-left:4px solid #f9a825;padding:14px;margin-bottom:14px;border-radius:0 4px 4px 0;">
<strong>Formule de calcul :</strong><br/><span style="white-space:pre-line;font-size:13px;">{{formule_calcul}}</span>
</div>
<div style="background:#F0F4F8;padding:12px;border-radius:4px;margin-bottom:12px;"><strong>Modalités de répartition :</strong><br/>{{modalites_repartition}}</div>
<p><strong>Durée de blocage :</strong> {{duree_blocage}} ans</p>
<div style="display:flex;justify-content:space-between;margin-top:24px;padding-top:16px;border-top:1px solid #eee;">
<div>Signature Direction : _______________<br/>{{representants_direction}}</div>
<div>Signature Salariés : _______________<br/>{{representants_salaries}}</div>
</div>
<p style="text-align:center;color:#888;font-size:12px;">Fait le {{date_accord}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 38,
  },

  {
    code: 'rh2_charte_ethique_professionnelle',
    name: 'Charte éthique professionnelle',
    category: 'juridique_admin',
    description: 'Définir les valeurs et engagements éthiques de l\'entreprise et de ses collaborateurs',
    price: 500, currency: 'XOF',
    fieldsJson: JSON.stringify([
      { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { name: 'date_adoption', label: 'Date d\'adoption', type: 'date', required: true },
      { name: 'valeurs_fondatrices', label: 'Valeurs fondatrices', type: 'textarea', required: true },
      { name: 'engagements_integrité', label: 'Engagements en matière d\'intégrité', type: 'textarea', required: false },
      { name: 'engagements_conflit_interet', label: 'Politique conflits d\'intérêts', type: 'textarea', required: false },
      { name: 'engagements_confidentialite', label: 'Engagements de confidentialité', type: 'textarea', required: false },
      { name: 'dispositif_alerte', label: 'Dispositif d\'alerte éthique', type: 'textarea', required: false },
    ]),
    body: `<div style="font-family:Arial,sans-serif;max-width:750px;margin:0 auto;padding:24px;">
<div style="text-align:center;padding:20px;background:#263238;color:white;border-radius:8px;margin-bottom:18px;">
<h1 style="margin:0;font-size:22px;letter-spacing:1px;">CHARTE ÉTHIQUE PROFESSIONNELLE</h1>
<p style="margin:8px 0 0;opacity:.8;font-size:14px;">{{nom_entreprise}}</p>
</div>
<div style="background:#E8F5E9;padding:14px;border-radius:6px;margin-bottom:14px;border-left:5px solid #2e7d32;">
<h3 style="color:#1b5e20;margin:0 0 8px;">Nos valeurs fondatrices</h3>
<p style="white-space:pre-line;">{{valeurs_fondatrices}}</p>
</div>
<div style="background:#E3F2FD;padding:12px;border-radius:4px;margin-bottom:12px;">
<strong style="color:#1a3c5e;">Intégrité et honnêteté :</strong><br/>{{engagements_integrité}}
</div>
<div style="background:#FFF9C4;padding:12px;border-radius:4px;margin-bottom:12px;">
<strong>Conflits d'intérêts :</strong><br/>{{engagements_conflit_interet}}
</div>
<div style="background:#F3E5F5;padding:12px;border-radius:4px;margin-bottom:12px;">
<strong style="color:#6a1b9a;">Confidentialité :</strong><br/>{{engagements_confidentialite}}
</div>
<div style="background:#FFF5F5;border-left:4px solid #c62828;padding:12px;border-radius:0 4px 4px 0;margin-bottom:12px;">
<strong style="color:#c62828;">Dispositif d'alerte :</strong><br/>{{dispositif_alerte}}
</div>
<p style="text-align:right;color:#666;font-size:13px;">Adoptée le {{date_adoption}}</p>
</div>`,
    countriesJson: COUNTRIES, active: true, popularity: 46,
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
    created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`✅ Seed RH Avancé terminé. Upserts: ${created} — Total BDD: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
