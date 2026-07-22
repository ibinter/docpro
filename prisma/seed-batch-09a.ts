import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);

const templates = [
  // ─── RH AVANCÉ (rh_emploi / rh4_) ───────────────────────────────────────
  {
    code: 'rh4_cdi_temps_partiel',
    name: 'Contrat CDI Temps Partiel',
    category: 'rh_emploi',
    price: 4500,
    priceMax: 12000,
    description: "Contrat à durée indéterminée à temps partiel conforme au Code du Travail, avec clause de répartition des horaires et mention des droits du salarié à temps partiel.",
    templateType: 'pdf',
    classe: 'CONTRAT',
    active: true,
    popularity: 78,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'poste', label: 'Intitulé du poste', type: 'text', required: true },
      { key: 'duree_hebdo', label: 'Durée hebdomadaire (heures)', type: 'number', required: true },
      { key: 'salaire_brut', label: 'Salaire brut mensuel (FCFA)', type: 'number', required: true },
      { key: 'date_debut', label: "Date de début", type: 'date', required: true },
      { key: 'lieu_travail', label: 'Lieu de travail', type: 'text', required: true },
    ]),
    body: `<h1>CONTRAT DE TRAVAIL À DURÉE INDÉTERMINÉE – TEMPS PARTIEL</h1>
<p>Entre <strong>{{employeur_nom}}</strong> (ci-après « l'Employeur ») et <strong>{{salarie_nom}}</strong> (ci-après « le Salarié »), il est convenu ce qui suit :</p>
<h2>Article 1 – Engagement</h2>
<p>Le Salarié est engagé à compter du {{date_debut}} au poste de {{poste}} pour une durée hebdomadaire de {{duree_hebdo}} heures.</p>
<h2>Article 2 – Rémunération</h2>
<p>Le salaire brut mensuel est fixé à {{salaire_brut}} FCFA, proratisé au temps partiel.</p>
<h2>Article 3 – Lieu de travail</h2>
<p>Le lieu habituel de travail est : {{lieu_travail}}.</p>
<h2>Article 4 – Dispositions générales</h2>
<p>Le présent contrat est régi par le Code du Travail en vigueur. Le salarié bénéficie de tous les droits reconnus aux salariés à temps partiel.</p>`,
  },
  {
    code: 'rh4_cdd_saisonnier',
    name: 'Contrat CDD Saisonnier',
    category: 'rh_emploi',
    price: 3500,
    priceMax: 9000,
    description: "Contrat à durée déterminée pour activité saisonnière avec mention du motif, de la durée maximale et des conditions de renouvellement autorisées.",
    templateType: 'pdf',
    classe: 'CONTRAT',
    active: true,
    popularity: 65,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'motif_saisonnier', label: 'Motif saisonnier', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { key: 'salaire_brut', label: 'Salaire brut (FCFA)', type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT DE TRAVAIL À DURÉE DÉTERMINÉE – SAISONNIER</h1>
<p>Entre <strong>{{employeur_nom}}</strong> et <strong>{{salarie_nom}}</strong>, il est convenu :</p>
<h2>Article 1 – Motif</h2>
<p>Le présent CDD est conclu pour le motif suivant : {{motif_saisonnier}}.</p>
<h2>Article 2 – Durée</h2>
<p>Du {{date_debut}} au {{date_fin}}.</p>
<h2>Article 3 – Rémunération</h2>
<p>Salaire brut : {{salaire_brut}} FCFA par mois.</p>`,
  },
  {
    code: 'rh4_contrat_intermittent',
    name: 'Contrat Travail Intermittent',
    category: 'rh_emploi',
    price: 4000,
    priceMax: 10000,
    description: "Contrat de travail intermittent prévoyant des périodes travaillées et non travaillées, avec garantie de revenu annuel minimum.",
    templateType: 'pdf',
    classe: 'CONTRAT',
    active: true,
    popularity: 45,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'heures_min_annuelles', label: 'Heures minimales annuelles', type: 'number', required: true },
      { key: 'taux_horaire', label: 'Taux horaire (FCFA)', type: 'number', required: true },
      { key: 'periodes_travail', label: 'Description des périodes de travail', type: 'textarea', required: true },
    ]),
    body: `<h1>CONTRAT DE TRAVAIL INTERMITTENT</h1>
<p>Entre <strong>{{employeur_nom}}</strong> et <strong>{{salarie_nom}}</strong> :</p>
<h2>Article 1 – Nature du contrat</h2>
<p>Contrat intermittent pour alternance de périodes travaillées et non travaillées.</p>
<h2>Article 2 – Volume horaire garanti</h2>
<p>Minimum annuel : {{heures_min_annuelles}} heures au taux de {{taux_horaire}} FCFA/heure.</p>
<h2>Article 3 – Périodes de travail</h2>
<p>{{periodes_travail}}</p>`,
  },
  {
    code: 'rh4_protocole_entretien_annuel',
    name: "Protocole Entretien Annuel d'Évaluation",
    category: 'rh_emploi',
    price: 5000,
    priceMax: 14000,
    description: "Document cadre définissant la procédure, les critères d'évaluation, le calendrier et les obligations des parties lors de l'entretien annuel.",
    templateType: 'pdf',
    classe: 'PROCEDURE',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'annee_evaluation', label: "Année d'évaluation", type: 'number', required: true },
      { key: 'responsable_rh', label: 'Responsable RH', type: 'text', required: true },
      { key: 'periode_campagne', label: 'Période de la campagne', type: 'text', required: true },
    ]),
    body: `<h1>PROTOCOLE D'ENTRETIEN ANNUEL D'ÉVALUATION {{annee_evaluation}}</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong> | Responsable RH : {{responsable_rh}}</p>
<h2>1. Objet</h2>
<p>Ce protocole définit le cadre de la campagne d'entretiens annuels pour l'année {{annee_evaluation}}.</p>
<h2>2. Calendrier</h2>
<p>Campagne organisée durant la période : {{periode_campagne}}.</p>
<h2>3. Critères d'évaluation</h2>
<ul><li>Atteinte des objectifs fixés</li><li>Compétences techniques et comportementales</li><li>Qualité du travail</li><li>Esprit d'équipe et collaboration</li></ul>
<h2>4. Obligations des parties</h2>
<p>Le manager prépare la grille d'évaluation ; le salarié complète l'auto-évaluation 48h avant l'entretien.</p>`,
  },
  {
    code: 'rh4_fiche_entretien_professionnel',
    name: 'Fiche Entretien Professionnel',
    category: 'rh_emploi',
    price: 2500,
    priceMax: 6000,
    description: "Support structuré pour conduire l'entretien professionnel bisannuel portant sur les perspectives d'évolution et les besoins en formation.",
    templateType: 'pdf',
    classe: 'FORMULAIRE',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'manager_nom', label: 'Nom du manager', type: 'text', required: true },
      { key: 'date_entretien', label: "Date de l'entretien", type: 'date', required: true },
      { key: 'poste_actuel', label: 'Poste actuel', type: 'text', required: true },
      { key: 'formations_souhaitees', label: 'Formations souhaitées', type: 'textarea', required: false },
      { key: 'projet_evolution', label: "Projet d'évolution professionnelle", type: 'textarea', required: false },
    ]),
    body: `<h1>FICHE D'ENTRETIEN PROFESSIONNEL</h1>
<table border="1" cellpadding="6"><tr><td>Salarié</td><td>{{salarie_nom}}</td></tr>
<tr><td>Manager</td><td>{{manager_nom}}</td></tr>
<tr><td>Date</td><td>{{date_entretien}}</td></tr>
<tr><td>Poste actuel</td><td>{{poste_actuel}}</td></tr></table>
<h2>Perspectives d'évolution</h2><p>{{projet_evolution}}</p>
<h2>Besoins en formation</h2><p>{{formations_souhaitees}}</p>
<h2>Signatures</h2><p>Salarié : _________________ &nbsp;&nbsp; Manager : _________________</p>`,
  },
  {
    code: 'rh4_plan_succession',
    name: 'Plan de Succession',
    category: 'rh_emploi',
    price: 8000,
    priceMax: 22000,
    description: "Document stratégique identifiant les postes clés, les successeurs potentiels et les plans de développement associés pour assurer la continuité managériale.",
    templateType: 'pdf',
    classe: 'STRATEGIE',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'poste_cle', label: 'Poste clé concerné', type: 'text', required: true },
      { key: 'titulaire_actuel', label: 'Titulaire actuel', type: 'text', required: true },
      { key: 'successeur_1', label: 'Successeur prioritaire', type: 'text', required: true },
      { key: 'successeur_2', label: 'Successeur secondaire', type: 'text', required: false },
      { key: 'horizon_temporel', label: 'Horizon temporel (années)', type: 'number', required: true },
    ]),
    body: `<h1>PLAN DE SUCCESSION – {{poste_cle}}</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong></p>
<h2>Situation actuelle</h2>
<p>Titulaire : {{titulaire_actuel}}</p>
<h2>Successeurs identifiés</h2>
<table border="1" cellpadding="6">
<tr><th>Priorité</th><th>Nom</th><th>Délai de préparation</th></tr>
<tr><td>1</td><td>{{successeur_1}}</td><td>{{horizon_temporel}} an(s)</td></tr>
<tr><td>2</td><td>{{successeur_2}}</td><td>À définir</td></tr></table>
<h2>Plan de développement</h2>
<p>Formations ciblées, missions de développement et coaching à planifier selon le profil de chaque successeur.</p>`,
  },
  {
    code: 'rh4_matrice_competences',
    name: 'Matrice des Compétences',
    category: 'rh_emploi',
    price: 6000,
    priceMax: 16000,
    description: "Outil de cartographie des compétences individuelles et collectives par service, permettant d'identifier les écarts et les besoins en formation.",
    templateType: 'pdf',
    classe: 'OUTIL_RH',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'departement', label: 'Département / Service', type: 'text', required: true },
      { key: 'responsable', label: 'Responsable du service', type: 'text', required: true },
      { key: 'date_mise_a_jour', label: 'Date de mise à jour', type: 'date', required: true },
      { key: 'liste_competences', label: 'Liste des compétences évaluées', type: 'textarea', required: true },
    ]),
    body: `<h1>MATRICE DES COMPÉTENCES – {{departement}}</h1>
<p>Responsable : {{responsable}} | Mise à jour : {{date_mise_a_jour}}</p>
<h2>Compétences évaluées</h2>
<p>{{liste_competences}}</p>
<h2>Grille de notation</h2>
<table border="1" cellpadding="6">
<tr><th>Niveau</th><th>Description</th></tr>
<tr><td>0</td><td>Non maîtrisé</td></tr>
<tr><td>1</td><td>Notions de base</td></tr>
<tr><td>2</td><td>Pratique autonome</td></tr>
<tr><td>3</td><td>Expert / Formateur</td></tr></table>`,
  },
  {
    code: 'rh4_politique_conges_maternite',
    name: 'Politique Congés Maternité',
    category: 'rh_emploi',
    price: 4500,
    priceMax: 11000,
    description: "Document interne définissant les droits, les procédures et les mesures d'accompagnement liés au congé maternité conformément à la législation sociale.",
    templateType: 'pdf',
    classe: 'POLITIQUE',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'duree_conge_legale', label: 'Durée légale du congé (semaines)', type: 'number', required: true },
      { key: 'complement_entreprise', label: "Complément accordé par l'entreprise (semaines)", type: 'number', required: false },
      { key: 'contact_rh', label: 'Contact RH référent', type: 'text', required: true },
    ]),
    body: `<h1>POLITIQUE DE CONGÉ MATERNITÉ – {{entreprise_nom}}</h1>
<h2>1. Durée du congé</h2>
<p>Durée légale : {{duree_conge_legale}} semaines. Complément entreprise : {{complement_entreprise}} semaines.</p>
<h2>2. Procédure de déclaration</h2>
<p>La salariée informe le service RH dès que possible et fournit le certificat médical attestant la grossesse.</p>
<h2>3. Maintien de rémunération</h2>
<p>Les indemnités journalières légales sont complétées par l'entreprise pour maintenir 100 % du salaire net.</p>
<h2>4. Retour au poste</h2>
<p>La salariée retrouve son poste ou un poste équivalent à son retour. Un entretien de retour est organisé avec {{contact_rh}}.</p>`,
  },
  {
    code: 'rh4_procedure_gestion_conflits',
    name: 'Procédure Gestion des Conflits',
    category: 'rh_emploi',
    price: 5500,
    priceMax: 14000,
    description: "Procédure interne de résolution des conflits au travail : médiation, escalade hiérarchique et saisine des instances représentatives.",
    templateType: 'pdf',
    classe: 'PROCEDURE',
    active: true,
    popularity: 63,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'mediateur_interne', label: 'Médiateur interne désigné', type: 'text', required: true },
      { key: 'delai_resolution', label: 'Délai maximum de résolution (jours)', type: 'number', required: true },
    ]),
    body: `<h1>PROCÉDURE DE GESTION DES CONFLITS AU TRAVAIL</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong></p>
<h2>Étape 1 – Signalement</h2>
<p>Tout conflit doit être signalé au manager direct ou au RH dans les 5 jours.</p>
<h2>Étape 2 – Médiation</h2>
<p>Le médiateur interne {{mediateur_interne}} est saisi pour faciliter le dialogue entre les parties.</p>
<h2>Étape 3 – Escalade</h2>
<p>En l'absence de résolution sous {{delai_resolution}} jours, le dossier est transmis à la direction et aux IRP.</p>`,
  },
  {
    code: 'rh4_formulaire_demande_mutation',
    name: 'Formulaire Demande de Mutation',
    category: 'rh_emploi',
    price: 2000,
    priceMax: 5000,
    description: "Formulaire permettant à un salarié de demander une mutation interne vers un autre service ou site, avec justification et accord hiérarchique.",
    templateType: 'pdf',
    classe: 'FORMULAIRE',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'poste_actuel', label: 'Poste actuel', type: 'text', required: true },
      { key: 'service_actuel', label: 'Service actuel', type: 'text', required: true },
      { key: 'poste_souhaite', label: 'Poste souhaité', type: 'text', required: true },
      { key: 'service_cible', label: 'Service cible', type: 'text', required: true },
      { key: 'motif_mutation', label: 'Motif de la demande', type: 'textarea', required: true },
      { key: 'date_souhaitee', label: 'Date de mutation souhaitée', type: 'date', required: false },
    ]),
    body: `<h1>FORMULAIRE DE DEMANDE DE MUTATION INTERNE</h1>
<table border="1" cellpadding="6">
<tr><td>Salarié</td><td>{{salarie_nom}}</td></tr>
<tr><td>Poste actuel</td><td>{{poste_actuel}} – {{service_actuel}}</td></tr>
<tr><td>Poste souhaité</td><td>{{poste_souhaite}} – {{service_cible}}</td></tr>
<tr><td>Date souhaitée</td><td>{{date_souhaitee}}</td></tr></table>
<h2>Motif</h2><p>{{motif_mutation}}</p>
<h2>Avis hiérarchique</h2><p>Favorable ☐ &nbsp; Défavorable ☐ &nbsp; Commentaire : _________________________</p>`,
  },
  {
    code: 'rh4_attestation_disponibilite',
    name: 'Attestation de Disponibilité',
    category: 'rh_emploi',
    price: 1500,
    priceMax: 4000,
    description: "Attestation certifiant qu'un salarié est disponible pour une nouvelle prise de fonction suite à une mise en disponibilité ou un congé sans solde.",
    templateType: 'pdf',
    classe: 'ATTESTATION',
    active: true,
    popularity: 42,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'date_disponibilite', label: 'Date de disponibilité', type: 'date', required: true },
      { key: 'signataire', label: 'Signataire (DRH ou directeur)', type: 'text', required: true },
    ]),
    body: `<h1>ATTESTATION DE DISPONIBILITÉ</h1>
<p>Je soussigné(e), <strong>{{signataire}}</strong>, représentant(e) de <strong>{{employeur_nom}}</strong>, atteste que :</p>
<p>M./Mme <strong>{{salarie_nom}}</strong> est disponible pour toute prise de fonction à compter du <strong>{{date_disponibilite}}</strong>.</p>
<p>Cette attestation est délivrée pour faire valoir ce que de droit.</p>
<p>Fait à __________, le __________</p>
<p>Signature et cachet : _________________</p>`,
  },
  {
    code: 'rh4_avenant_temps_partiel',
    name: 'Avenant Passage à Temps Partiel',
    category: 'rh_emploi',
    price: 3000,
    priceMax: 8000,
    description: "Avenant au contrat de travail formalisant le passage d'un temps plein à un temps partiel choisi ou imposé, avec les nouvelles conditions d'emploi.",
    templateType: 'pdf',
    classe: 'AVENANT',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'date_avenant', label: "Date de l'avenant", type: 'date', required: true },
      { key: 'nouvelle_duree_hebdo', label: 'Nouvelle durée hebdomadaire (heures)', type: 'number', required: true },
      { key: 'nouveau_salaire', label: 'Nouveau salaire brut mensuel (FCFA)', type: 'number', required: true },
      { key: 'motif', label: 'Motif du passage à temps partiel', type: 'text', required: true },
    ]),
    body: `<h1>AVENANT AU CONTRAT DE TRAVAIL – PASSAGE À TEMPS PARTIEL</h1>
<p>Entre <strong>{{employeur_nom}}</strong> et <strong>{{salarie_nom}}</strong>, il est convenu de modifier le contrat de travail comme suit à compter du {{date_avenant}} :</p>
<h2>Nouvelles conditions</h2>
<ul>
<li>Durée hebdomadaire : {{nouvelle_duree_hebdo}} heures</li>
<li>Salaire brut mensuel : {{nouveau_salaire}} FCFA</li>
<li>Motif : {{motif}}</li>
</ul>
<p>Toutes les autres clauses du contrat initial demeurent inchangées.</p>
<p>Signatures des deux parties requises.</p>`,
  },
  {
    code: "rh4_lettre_avertissement",
    name: "Lettre d'Avertissement",
    category: 'rh_emploi',
    price: 2500,
    priceMax: 6000,
    description: "Courrier disciplinaire de premier niveau notifiant au salarié un manquement à ses obligations professionnelles, sans impact immédiat sur la rémunération.",
    templateType: 'pdf',
    classe: 'DISCIPLINAIRE',
    active: true,
    popularity: 70,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'date_lettre', label: 'Date de la lettre', type: 'date', required: true },
      { key: 'faits_reproches', label: 'Faits reprochés', type: 'textarea', required: true },
      { key: 'date_faits', label: 'Date des faits', type: 'date', required: true },
    ]),
    body: `<h1>LETTRE D'AVERTISSEMENT</h1>
<p>{{employeur_nom}}, le {{date_lettre}}</p>
<p>À : <strong>{{salarie_nom}}</strong></p>
<p>Nous avons constaté le {{date_faits}} les faits suivants :</p>
<p>{{faits_reproches}}</p>
<p>Ces faits constituent un manquement à vos obligations professionnelles. Nous vous adressons le présent avertissement et vous demandons de veiller à ne pas renouveler ces agissements.</p>
<p>Signature de la Direction : _________________</p>`,
  },
  {
    code: 'rh4_mise_a_pied_disciplinaire',
    name: 'Notification de Mise à Pied Disciplinaire',
    category: 'rh_emploi',
    price: 3500,
    priceMax: 9000,
    description: "Notification officielle d'une mise à pied à titre disciplinaire précisant la durée, les faits et les voies de recours du salarié.",
    templateType: 'pdf',
    classe: 'DISCIPLINAIRE',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'date_notification', label: 'Date de notification', type: 'date', required: true },
      { key: 'duree_mise_a_pied', label: 'Durée (jours ouvrables)', type: 'number', required: true },
      { key: 'faits_reproches', label: 'Faits reprochés', type: 'textarea', required: true },
    ]),
    body: `<h1>NOTIFICATION DE MISE À PIED DISCIPLINAIRE</h1>
<p>{{employeur_nom}}, le {{date_notification}}</p>
<p>À : <strong>{{salarie_nom}}</strong></p>
<p>Suite à l'entretien préalable et après examen de votre dossier, nous vous notifions une mise à pied disciplinaire de <strong>{{duree_mise_a_pied}} jours ouvrables</strong>.</p>
<h2>Faits reprochés</h2>
<p>{{faits_reproches}}</p>
<p>Durant cette période, vous ne percevrez aucune rémunération. Vous pouvez contester cette décision auprès du Conseil de Prud'hommes compétent.</p>`,
  },
  {
    code: 'rh4_convocation_entretien_prealable',
    name: 'Convocation Entretien Préalable au Licenciement',
    category: 'rh_emploi',
    price: 3000,
    priceMax: 7500,
    description: "Convocation du salarié à un entretien préalable à une mesure disciplinaire ou un licenciement, avec mention des droits à l'assistance.",
    templateType: 'pdf',
    classe: 'DISCIPLINAIRE',
    active: true,
    popularity: 75,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'date_convocation', label: 'Date de la convocation', type: 'date', required: true },
      { key: 'date_entretien', label: "Date de l'entretien", type: 'date', required: true },
      { key: 'heure_entretien', label: "Heure de l'entretien", type: 'text', required: true },
      { key: 'lieu_entretien', label: "Lieu de l'entretien", type: 'text', required: true },
    ]),
    body: `<h1>CONVOCATION À ENTRETIEN PRÉALABLE</h1>
<p>{{employeur_nom}}, le {{date_convocation}}</p>
<p>Objet : Convocation à entretien préalable</p>
<p>Madame, Monsieur <strong>{{salarie_nom}}</strong>,</p>
<p>Nous vous convoquons à un entretien préalable qui se tiendra le <strong>{{date_entretien}} à {{heure_entretien}}</strong> en {{lieu_entretien}}.</p>
<p>Vous avez la possibilité de vous faire assister par un représentant du personnel ou un conseiller du salarié lors de cet entretien.</p>`,
  },
  {
    code: 'rh4_notification_sanction',
    name: 'Notification de Sanction Disciplinaire',
    category: 'rh_emploi',
    price: 3000,
    priceMax: 8000,
    description: "Courrier notifiant la sanction disciplinaire retenue à la suite de l'entretien préalable, avec les voies et délais de recours.",
    templateType: 'pdf',
    classe: 'DISCIPLINAIRE',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'date_notification', label: 'Date de notification', type: 'date', required: true },
      { key: 'nature_sanction', label: 'Nature de la sanction', type: 'text', required: true },
      { key: 'motif_sanction', label: 'Motif de la sanction', type: 'textarea', required: true },
    ]),
    body: `<h1>NOTIFICATION DE SANCTION DISCIPLINAIRE</h1>
<p>{{employeur_nom}}, le {{date_notification}}</p>
<p>À : <strong>{{salarie_nom}}</strong></p>
<p>Suite à l'entretien préalable du __________, nous vous notifions la sanction suivante : <strong>{{nature_sanction}}</strong>.</p>
<h2>Motif</h2><p>{{motif_sanction}}</p>
<p>Vous disposez d'un délai de deux mois pour contester cette décision.</p>`,
  },
  {
    code: 'rh4_rapport_enquete_interne',
    name: "Rapport d'Enquête Interne",
    category: 'rh_emploi',
    price: 7000,
    priceMax: 18000,
    description: "Rapport structuré à l'issue d'une enquête interne pour faits de harcèlement, fraude ou manquement grave, avec constats et recommandations.",
    templateType: 'pdf',
    classe: 'RAPPORT',
    active: true,
    popularity: 45,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'enqueteur_nom', label: "Nom de l'enquêteur", type: 'text', required: true },
      { key: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      { key: 'objet_enquete', label: "Objet de l'enquête", type: 'text', required: true },
      { key: 'constats', label: 'Constats et faits établis', type: 'textarea', required: true },
      { key: 'recommandations', label: 'Recommandations', type: 'textarea', required: true },
    ]),
    body: `<h1>RAPPORT D'ENQUÊTE INTERNE</h1>
<p>Entreprise : {{entreprise_nom}} | Enquêteur : {{enqueteur_nom}} | Date : {{date_rapport}}</p>
<h2>Objet</h2><p>{{objet_enquete}}</p>
<h2>Méthodologie</h2><p>Entretiens individuels, analyse documentaire et recueil de témoignages.</p>
<h2>Constats</h2><p>{{constats}}</p>
<h2>Recommandations</h2><p>{{recommandations}}</p>
<h2>Confidentialité</h2><p>Ce rapport est strictement confidentiel et réservé aux destinataires autorisés.</p>`,
  },
  {
    code: 'rh4_accord_mobilite_interne',
    name: 'Accord de Mobilité Interne',
    category: 'rh_emploi',
    price: 6000,
    priceMax: 15000,
    description: "Accord formalisant les règles de mobilité interne (géographique ou fonctionnelle) entre l'employeur et le salarié, avec contreparties et délais de préavis.",
    templateType: 'pdf',
    classe: 'ACCORD',
    active: true,
    popularity: 47,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'poste_origine', label: "Poste d'origine", type: 'text', required: true },
      { key: 'poste_destination', label: 'Poste de destination', type: 'text', required: true },
      { key: 'site_destination', label: 'Site de destination', type: 'text', required: true },
      { key: 'date_prise_effet', label: 'Date de prise d\'effet', type: 'date', required: true },
      { key: 'contreparties', label: 'Contreparties accordées', type: 'textarea', required: false },
    ]),
    body: `<h1>ACCORD DE MOBILITÉ INTERNE</h1>
<p>Entre <strong>{{employeur_nom}}</strong> et <strong>{{salarie_nom}}</strong> :</p>
<h2>Mobilité convenue</h2>
<p>Du poste de {{poste_origine}} vers {{poste_destination}} sur le site de {{site_destination}}, effective le {{date_prise_effet}}.</p>
<h2>Contreparties</h2><p>{{contreparties}}</p>
<p>Les deux parties acceptent les termes du présent accord et s'engagent à en respecter les dispositions.</p>`,
  },
  {
    code: 'rh4_fiche_poste_chef_projet',
    name: 'Fiche de Poste – Chef de Projet',
    category: 'rh_emploi',
    price: 3000,
    priceMax: 7000,
    description: "Description détaillée du poste de chef de projet : missions, compétences requises, positionnement hiérarchique et indicateurs de performance.",
    templateType: 'pdf',
    classe: 'FICHE_POSTE',
    active: true,
    popularity: 80,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'departement', label: 'Département', type: 'text', required: true },
      { key: 'superieur_hierarchique', label: 'Supérieur hiérarchique', type: 'text', required: true },
      { key: 'classification', label: 'Classification / Grade', type: 'text', required: true },
    ]),
    body: `<h1>FICHE DE POSTE – CHEF DE PROJET</h1>
<p>Entreprise : {{entreprise_nom}} | Département : {{departement}}</p>
<p>Supérieur hiérarchique : {{superieur_hierarchique}} | Classification : {{classification}}</p>
<h2>Missions principales</h2>
<ul><li>Piloter les projets de bout en bout dans les délais et budgets impartis</li>
<li>Coordonner les équipes pluridisciplinaires</li>
<li>Assurer le reporting aux commanditaires</li>
<li>Gérer les risques et les aléas du projet</li></ul>
<h2>Compétences requises</h2>
<ul><li>Bac+4/5 en gestion de projet ou domaine connexe</li>
<li>Maîtrise des méthodes Agile/PMP</li>
<li>Excellent sens de la communication et du leadership</li></ul>`,
  },
  {
    code: 'rh4_fiche_poste_drh',
    name: 'Fiche de Poste – Directeur des Ressources Humaines',
    category: 'rh_emploi',
    price: 3500,
    priceMax: 8500,
    description: "Fiche de poste complète du DRH couvrant la stratégie RH, les relations sociales, la GPEC et le management de l'équipe RH.",
    templateType: 'pdf',
    classe: 'FICHE_POSTE',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'effectif_gere', label: "Effectif géré", type: 'number', required: true },
      { key: 'rattachement', label: 'Rattachement hiérarchique', type: 'text', required: true },
    ]),
    body: `<h1>FICHE DE POSTE – DIRECTEUR DES RESSOURCES HUMAINES (DRH)</h1>
<p>Entreprise : {{entreprise_nom}} | Effectif géré : {{effectif_gere}} collaborateurs</p>
<p>Rattachement : {{rattachement}}</p>
<h2>Missions</h2>
<ul><li>Définir et déployer la stratégie RH en lien avec la direction générale</li>
<li>Piloter les relations sociales et négocier les accords collectifs</li>
<li>Superviser la paie, le recrutement, la formation et la GPEC</li>
<li>Garantir la conformité légale et réglementaire en matière sociale</li></ul>
<h2>Profil requis</h2>
<p>Bac+5 en droit social ou GRH, 10 ans d'expérience minimum dont 5 en management RH.</p>`,
  },
  {
    code: 'rh4_fiche_poste_commercial_senior',
    name: 'Fiche de Poste – Commercial Senior',
    category: 'rh_emploi',
    price: 2800,
    priceMax: 7000,
    description: "Description du poste de commercial senior avec objectifs de vente, portefeuille clients, reporting et conditions de rémunération variable.",
    templateType: 'pdf',
    classe: 'FICHE_POSTE',
    active: true,
    popularity: 74,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'zone_geographique', label: 'Zone géographique couverte', type: 'text', required: true },
      { key: 'objectif_ca', label: "Objectif CA annuel (FCFA)", type: 'number', required: false },
    ]),
    body: `<h1>FICHE DE POSTE – COMMERCIAL SENIOR</h1>
<p>Entreprise : {{entreprise_nom}} | Zone : {{zone_geographique}}</p>
<h2>Missions</h2>
<ul><li>Développer et fidéliser un portefeuille de clients grands comptes</li>
<li>Prospecter de nouveaux marchés sur la zone {{zone_geographique}}</li>
<li>Atteindre un objectif de CA de {{objectif_ca}} FCFA par an</li>
<li>Assurer le reporting hebdomadaire des activités commerciales</li></ul>
<h2>Profil</h2>
<p>Bac+3/5 commerce, 5 ans d'expérience en vente B2B, maîtrise des outils CRM.</p>`,
  },
  {
    code: 'rh4_fiche_poste_comptable_principal',
    name: 'Fiche de Poste – Comptable Principal',
    category: 'rh_emploi',
    price: 2800,
    priceMax: 7000,
    description: "Fiche de poste du comptable principal en charge de la tenue des livres, des déclarations fiscales et de la préparation des états financiers SYSCOHADA.",
    templateType: 'pdf',
    classe: 'FICHE_POSTE',
    active: true,
    popularity: 67,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'logiciel_compta', label: 'Logiciel comptable utilisé', type: 'text', required: false },
    ]),
    body: `<h1>FICHE DE POSTE – COMPTABLE PRINCIPAL</h1>
<p>Entreprise : {{entreprise_nom}}</p>
<h2>Missions</h2>
<ul><li>Tenir la comptabilité générale et analytique selon le référentiel SYSCOHADA</li>
<li>Préparer les déclarations fiscales et sociales mensuelles</li>
<li>Élaborer les états financiers annuels</li>
<li>Assurer la clôture mensuelle et annuelle des comptes</li></ul>
<h2>Outils</h2><p>{{logiciel_compta}}</p>
<h2>Profil</h2><p>BTS/Licence en comptabilité, 3 à 5 ans d'expérience, rigueur et autonomie.</p>`,
  },
  {
    code: 'rh4_fiche_poste_logisticien',
    name: 'Fiche de Poste – Logisticien',
    category: 'rh_emploi',
    price: 2500,
    priceMax: 6500,
    description: "Description du poste de logisticien couvrant la gestion des stocks, les approvisionnements, la coordination transport et le suivi des indicateurs logistiques.",
    templateType: 'pdf',
    classe: 'FICHE_POSTE',
    active: true,
    popularity: 56,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'entrepot_localisation', label: "Localisation de l'entrepôt", type: 'text', required: false },
    ]),
    body: `<h1>FICHE DE POSTE – LOGISTICIEN</h1>
<p>Entreprise : {{entreprise_nom}} | Entrepôt : {{entrepot_localisation}}</p>
<h2>Missions</h2>
<ul><li>Gérer les flux entrants et sortants de marchandises</li>
<li>Optimiser les niveaux de stocks et lancer les réapprovisionnements</li>
<li>Coordonner les prestataires transport et douane</li>
<li>Suivre les KPI logistiques (taux de service, coûts, délais)</li></ul>
<h2>Profil</h2><p>BTS/Licence logistique ou supply chain, expérience entrepôt souhaitée.</p>`,
  },
  {
    code: 'rh4_fiche_poste_ingenieur_si',
    name: 'Fiche de Poste – Ingénieur Systèmes d\'Information',
    category: 'rh_emploi',
    price: 3000,
    priceMax: 8000,
    description: "Fiche de poste de l'ingénieur SI responsable de l'architecture, de la maintenance et de la sécurité du système d'information de l'entreprise.",
    templateType: 'pdf',
    classe: 'FICHE_POSTE',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'technos_principales', label: 'Technologies principales', type: 'text', required: false },
    ]),
    body: `<h1>FICHE DE POSTE – INGÉNIEUR SYSTÈMES D'INFORMATION</h1>
<p>Entreprise : {{entreprise_nom}}</p>
<h2>Missions</h2>
<ul><li>Concevoir et maintenir l'architecture du SI</li>
<li>Assurer la disponibilité et la sécurité des infrastructures</li>
<li>Gérer les projets de transformation digitale</li>
<li>Supporter les utilisateurs et former les équipes</li></ul>
<h2>Technologies</h2><p>{{technos_principales}}</p>
<h2>Profil</h2><p>Bac+5 informatique ou réseaux, 3 ans d'expérience minimum.</p>`,
  },
  {
    code: "rh4_fiche_poste_juriste_entreprise",
    name: "Fiche de Poste – Juriste d'Entreprise",
    category: 'rh_emploi',
    price: 3000,
    priceMax: 7500,
    description: "Description du poste de juriste d'entreprise en charge du conseil juridique, des contrats commerciaux et de la conformité réglementaire.",
    templateType: 'pdf',
    classe: 'FICHE_POSTE',
    active: true,
    popularity: 59,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'domaines_droit', label: 'Domaines juridiques couverts', type: 'text', required: false },
    ]),
    body: `<h1>FICHE DE POSTE – JURISTE D'ENTREPRISE</h1>
<p>Entreprise : {{entreprise_nom}}</p>
<h2>Missions</h2>
<ul><li>Rédiger et négocier les contrats commerciaux, sociaux et de partenariat</li>
<li>Conseiller la direction sur les risques juridiques</li>
<li>Veiller à la conformité réglementaire et assurer une veille juridique</li>
<li>Gérer les contentieux et relations avec les cabinets d'avocats</li></ul>
<h2>Domaines</h2><p>{{domaines_droit}}</p>
<h2>Profil</h2><p>Master 2 Droit des affaires ou Droit social, 3 à 5 ans d'expérience.</p>`,
  },

  // ─── DROIT DU TRAVAIL (juridique_admin / drh_) ────────────────────────────
  {
    code: "drh_accord_collectif_entreprise",
    name: "Accord Collectif d'Entreprise",
    category: 'juridique_admin',
    price: 15000,
    priceMax: 45000,
    description: "Modèle d'accord collectif négocié et signé entre l'employeur et les organisations syndicales représentatives, conforme aux dispositions légales en vigueur.",
    templateType: 'pdf',
    classe: 'ACCORD_COLLECTIF',
    active: true,
    popularity: 72,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'syndicats_signataires', label: 'Syndicats signataires', type: 'text', required: true },
      { key: 'objet_accord', label: "Objet de l'accord", type: 'text', required: true },
      { key: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { key: 'duree_accord', label: "Durée de l'accord", type: 'text', required: true },
    ]),
    body: `<h1>ACCORD COLLECTIF D'ENTREPRISE</h1>
<p>Entre <strong>{{entreprise_nom}}</strong> et les organisations syndicales suivantes : {{syndicats_signataires}}</p>
<h2>Objet</h2><p>{{objet_accord}}</p>
<h2>Durée et entrée en vigueur</h2>
<p>Le présent accord est conclu pour une durée de {{duree_accord}}, à compter de sa date de signature le {{date_signature}}.</p>
<h2>Révision et dénonciation</h2>
<p>Chaque signataire peut demander la révision ou la dénonciation de l'accord dans les conditions prévues par le Code du Travail.</p>
<p>Fait à __________, le {{date_signature}}</p>`,
  },
  {
    code: 'drh_avenant_accord_collectif',
    name: 'Avenant à un Accord Collectif',
    category: 'juridique_admin',
    price: 8000,
    priceMax: 20000,
    description: "Document modificatif d'un accord collectif existant, précisant les clauses modifiées et les nouvelles dispositions convenues entre les parties.",
    templateType: 'pdf',
    classe: 'ACCORD_COLLECTIF',
    active: true,
    popularity: 55,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'accord_reference', label: "Accord de référence (date et objet)", type: 'text', required: true },
      { key: 'clauses_modifiees', label: 'Clauses modifiées', type: 'textarea', required: true },
      { key: 'date_avenant', label: "Date de l'avenant", type: 'date', required: true },
    ]),
    body: `<h1>AVENANT À L'ACCORD COLLECTIF</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong></p>
<p>Accord de référence : {{accord_reference}}</p>
<h2>Modifications convenues</h2>
<p>{{clauses_modifiees}}</p>
<p>Le présent avenant prend effet à compter du {{date_avenant}}. Toutes les autres dispositions de l'accord de référence demeurent inchangées.</p>`,
  },
  {
    code: 'drh_accord_droit_deconnexion',
    name: 'Accord Droit à la Déconnexion',
    category: 'juridique_admin',
    price: 10000,
    priceMax: 25000,
    description: "Accord encadrant le droit à la déconnexion des salariés en dehors des horaires de travail, avec mesures de mise en œuvre et de suivi.",
    templateType: 'pdf',
    classe: 'ACCORD_COLLECTIF',
    active: true,
    popularity: 60,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'plage_deconnexion', label: 'Plage horaire de déconnexion (ex : 20h-7h)', type: 'text', required: true },
      { key: 'referent_numerique', label: 'Référent numérique désigné', type: 'text', required: false },
    ]),
    body: `<h1>ACCORD SUR LE DROIT À LA DÉCONNEXION</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong></p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord vise à assurer le respect des temps de repos et la santé des salariés en encadrant l'usage des outils numériques professionnels.</p>
<h2>Article 2 – Plage de déconnexion</h2>
<p>Sauf urgence, les salariés ne sont pas tenus de répondre aux sollicitations professionnelles pendant la plage {{plage_deconnexion}} ni les week-ends et jours fériés.</p>
<h2>Article 3 – Référent</h2>
<p>Le référent numérique {{referent_numerique}} est chargé du suivi de l'application du présent accord.</p>`,
  },
  {
    code: 'drh_accord_gpec',
    name: 'Accord de GPEC (Gestion Prévisionnelle Emplois et Compétences)',
    category: 'juridique_admin',
    price: 20000,
    priceMax: 55000,
    description: "Accord triennal de GPEC définissant les orientations stratégiques RH, les dispositifs de développement des compétences et les mesures d'accompagnement.",
    templateType: 'pdf',
    classe: 'ACCORD_COLLECTIF',
    active: true,
    popularity: 50,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'periode_gpec', label: 'Période de couverture (ex : 2025-2027)', type: 'text', required: true },
      { key: 'orientations_strategiques', label: 'Orientations stratégiques RH', type: 'textarea', required: true },
    ]),
    body: `<h1>ACCORD DE GESTION PRÉVISIONNELLE DES EMPLOIS ET DES COMPÉTENCES</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong> | Période : {{periode_gpec}}</p>
<h2>Orientations stratégiques</h2><p>{{orientations_strategiques}}</p>
<h2>Dispositifs</h2>
<ul><li>Entretiens professionnels renforcés</li>
<li>Plans de développement individuels</li>
<li>Mobilités internes prioritaires</li>
<li>Bilan de compétences financé par l'employeur</li></ul>`,
  },
  {
    code: 'drh_accord_participation_resultats',
    name: 'Accord de Participation aux Résultats',
    category: 'juridique_admin',
    price: 18000,
    priceMax: 48000,
    description: "Accord prévoyant la participation des salariés aux bénéfices de l'entreprise, avec formule de calcul, modalités de versement et dispositif de blocage.",
    templateType: 'pdf',
    classe: 'ACCORD_COLLECTIF',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'formule_calcul', label: 'Formule de calcul de la réserve de participation', type: 'textarea', required: true },
      { key: 'duree_blocage', label: 'Durée de blocage des fonds (années)', type: 'number', required: true },
    ]),
    body: `<h1>ACCORD DE PARTICIPATION AUX RÉSULTATS</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong></p>
<h2>Formule de calcul</h2><p>{{formule_calcul}}</p>
<h2>Versement et blocage</h2>
<p>Les sommes sont bloquées pendant {{duree_blocage}} an(s) et peuvent être investies dans un plan d'épargne entreprise.</p>
<h2>Cas de déblocage anticipé</h2>
<p>Mariage, naissance, acquisition résidence principale, licenciement, invalidité, décès.</p>`,
  },
  {
    code: 'drh_charte_representants_personnel',
    name: 'Charte des Représentants du Personnel',
    category: 'juridique_admin',
    price: 7000,
    priceMax: 18000,
    description: "Charte définissant les droits, devoirs, moyens d'action et règles de conduite des représentants du personnel au sein de l'entreprise.",
    templateType: 'pdf',
    classe: 'CHARTE',
    active: true,
    popularity: 53,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'instances_concernees', label: 'Instances concernées (CSE, DS, DP...)', type: 'text', required: true },
      { key: 'heures_delegation', label: "Heures de délégation mensuelles", type: 'number', required: true },
    ]),
    body: `<h1>CHARTE DES REPRÉSENTANTS DU PERSONNEL</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong> | Instances : {{instances_concernees}}</p>
<h2>Droits</h2>
<ul><li>{{heures_delegation}} heures de délégation mensuelle</li>
<li>Libre circulation dans l'entreprise</li>
<li>Protection contre toute discrimination</li></ul>
<h2>Devoirs</h2>
<ul><li>Discrétion sur les informations confidentielles</li>
<li>Représentation loyale de l'ensemble des salariés</li></ul>`,
  },
  {
    code: 'drh_pv_reunion_syndicale',
    name: 'Procès-Verbal de Réunion Syndicale',
    category: 'juridique_admin',
    price: 3000,
    priceMax: 7500,
    description: "Modèle de PV de réunion syndicale consignant les participants, l'ordre du jour, les échanges et les décisions ou résolutions adoptées.",
    templateType: 'pdf',
    classe: 'PV_REUNION',
    active: true,
    popularity: 48,
    fieldsJson: F([
      { key: 'syndicat_nom', label: 'Nom du syndicat', type: 'text', required: true },
      { key: 'date_reunion', label: 'Date de la réunion', type: 'date', required: true },
      { key: 'participants', label: 'Liste des participants', type: 'textarea', required: true },
      { key: 'ordre_du_jour', label: "Ordre du jour", type: 'textarea', required: true },
      { key: 'decisions', label: 'Décisions et résolutions', type: 'textarea', required: true },
    ]),
    body: `<h1>PROCÈS-VERBAL DE RÉUNION SYNDICALE</h1>
<p>Syndicat : <strong>{{syndicat_nom}}</strong> | Date : {{date_reunion}}</p>
<h2>Participants</h2><p>{{participants}}</p>
<h2>Ordre du jour</h2><p>{{ordre_du_jour}}</p>
<h2>Décisions et résolutions</h2><p>{{decisions}}</p>
<p>PV approuvé et signé par le secrétaire de séance : _________________</p>`,
  },
  {
    code: 'drh_declaration_unique_embauche',
    name: "Déclaration Unique d'Embauche (DUE)",
    category: 'juridique_admin',
    price: 2000,
    priceMax: 5000,
    description: "Formulaire de déclaration préalable à l'embauche à adresser aux organismes sociaux compétents avant tout recrutement de salarié.",
    templateType: 'pdf',
    classe: 'DECLARATION',
    active: true,
    popularity: 85,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'numero_contribuable', label: 'Numéro contribuable', type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'date_naissance', label: 'Date de naissance du salarié', type: 'date', required: true },
      { key: 'date_embauche', label: "Date d'embauche", type: 'date', required: true },
      { key: 'type_contrat', label: "Type de contrat", type: 'text', required: true },
      { key: 'poste', label: 'Poste occupé', type: 'text', required: true },
    ]),
    body: `<h1>DÉCLARATION PRÉALABLE À L'EMBAUCHE (DUE)</h1>
<table border="1" cellpadding="6">
<tr><th colspan="2">Employeur</th></tr>
<tr><td>Raison sociale</td><td>{{employeur_nom}}</td></tr>
<tr><td>N° contribuable</td><td>{{numero_contribuable}}</td></tr>
<tr><th colspan="2">Salarié</th></tr>
<tr><td>Nom complet</td><td>{{salarie_nom}}</td></tr>
<tr><td>Date de naissance</td><td>{{date_naissance}}</td></tr>
<tr><td>Date d'embauche</td><td>{{date_embauche}}</td></tr>
<tr><td>Type de contrat</td><td>{{type_contrat}}</td></tr>
<tr><td>Poste</td><td>{{poste}}</td></tr>
</table>`,
  },
  {
    code: 'drh_fiche_salaire_syscohada',
    name: 'Fiche de Salaire SYSCOHADA',
    category: 'juridique_admin',
    price: 4000,
    priceMax: 10000,
    description: "Bulletin de paie conforme au système comptable OHADA avec détail des éléments de rémunération, cotisations salariales et patronales.",
    templateType: 'pdf',
    classe: 'PAIE',
    active: true,
    popularity: 88,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'mois_paie', label: 'Mois de paie', type: 'text', required: true },
      { key: 'salaire_base', label: 'Salaire de base (FCFA)', type: 'number', required: true },
      { key: 'sursalaire', label: 'Sursalaire / Primes (FCFA)', type: 'number', required: false },
      { key: 'retenues_totales', label: 'Total retenues salariales (FCFA)', type: 'number', required: true },
      { key: 'net_a_payer', label: 'Net à payer (FCFA)', type: 'number', required: true },
    ]),
    body: `<h1>BULLETIN DE PAIE – {{mois_paie}}</h1>
<p>Employeur : <strong>{{employeur_nom}}</strong> | Salarié : <strong>{{salarie_nom}}</strong></p>
<table border="1" cellpadding="6" width="100%">
<tr><th>Libellé</th><th>Montant (FCFA)</th></tr>
<tr><td>Salaire de base</td><td>{{salaire_base}}</td></tr>
<tr><td>Sursalaire / Primes</td><td>{{sursalaire}}</td></tr>
<tr><td>Total retenues</td><td>({{retenues_totales}})</td></tr>
<tr><td><strong>NET À PAYER</strong></td><td><strong>{{net_a_payer}}</strong></td></tr>
</table>`,
  },
  {
    code: 'drh_bordereau_cotisation_cnps',
    name: 'Bordereau de Cotisation CNPS',
    category: 'juridique_admin',
    price: 3500,
    priceMax: 9000,
    description: "Bordereau mensuel de déclaration et versement des cotisations à la Caisse Nationale de Prévoyance Sociale, avec détail par salarié.",
    templateType: 'pdf',
    classe: 'DECLARATION',
    active: true,
    popularity: 82,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'numero_cnps', label: 'Numéro CNPS employeur', type: 'text', required: true },
      { key: 'mois_declaration', label: 'Mois de déclaration', type: 'text', required: true },
      { key: 'masse_salariale', label: 'Masse salariale brute (FCFA)', type: 'number', required: true },
      { key: 'total_cotisations', label: 'Total cotisations dues (FCFA)', type: 'number', required: true },
    ]),
    body: `<h1>BORDEREAU DE COTISATION CNPS</h1>
<p>Employeur : <strong>{{employeur_nom}}</strong> | N° CNPS : {{numero_cnps}}</p>
<p>Période : {{mois_declaration}}</p>
<table border="1" cellpadding="6">
<tr><td>Masse salariale brute</td><td>{{masse_salariale}} FCFA</td></tr>
<tr><td>Taux patronal</td><td>À appliquer selon barème CNPS</td></tr>
<tr><td>Taux salarial</td><td>À appliquer selon barème CNPS</td></tr>
<tr><td><strong>Total cotisations dues</strong></td><td><strong>{{total_cotisations}} FCFA</strong></td></tr>
</table>`,
  },
  {
    code: 'drh_declaration_annuelle_salaires',
    name: 'Déclaration Annuelle des Salaires',
    category: 'juridique_admin',
    price: 5000,
    priceMax: 13000,
    description: "État récapitulatif annuel des salaires versés, des retenues effectuées et des cotisations sociales, à transmettre aux administrations fiscales et sociales.",
    templateType: 'pdf',
    classe: 'DECLARATION',
    active: true,
    popularity: 76,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'annee_fiscale', label: 'Année fiscale', type: 'number', required: true },
      { key: 'effectif_moyen', label: 'Effectif moyen annuel', type: 'number', required: true },
      { key: 'masse_salariale_annuelle', label: 'Masse salariale annuelle brute (FCFA)', type: 'number', required: true },
    ]),
    body: `<h1>DÉCLARATION ANNUELLE DES SALAIRES – {{annee_fiscale}}</h1>
<p>Employeur : <strong>{{employeur_nom}}</strong></p>
<table border="1" cellpadding="6">
<tr><td>Effectif moyen</td><td>{{effectif_moyen}} salariés</td></tr>
<tr><td>Masse salariale brute</td><td>{{masse_salariale_annuelle}} FCFA</td></tr>
</table>
<p>Cette déclaration est certifiée exacte et sincère par le représentant légal de l'entreprise.</p>`,
  },
  {
    code: 'drh_plan_sauvegarde_emploi',
    name: "Plan de Sauvegarde de l'Emploi (PSE)",
    category: 'juridique_admin',
    price: 25000,
    priceMax: 70000,
    description: "Document structuré du PSE présentant les mesures de maintien dans l'emploi, les conditions de reclassement et les indemnités supralégales.",
    templateType: 'pdf',
    classe: 'PSE',
    active: true,
    popularity: 38,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'nombre_suppressions', label: "Nombre de suppressions de postes envisagées", type: 'number', required: true },
      { key: 'mesures_accompagnement', label: "Mesures d'accompagnement", type: 'textarea', required: true },
      { key: 'budget_pse', label: 'Budget total du PSE (FCFA)', type: 'number', required: true },
    ]),
    body: `<h1>PLAN DE SAUVEGARDE DE L'EMPLOI</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong></p>
<h2>Contexte</h2>
<p>Suppressions envisagées : {{nombre_suppressions}} postes.</p>
<h2>Mesures de maintien dans l'emploi</h2>
<p>{{mesures_accompagnement}}</p>
<h2>Budget</h2>
<p>Budget total alloué : {{budget_pse}} FCFA.</p>
<h2>Calendrier de consultation</h2>
<p>Les instances représentatives du personnel sont consultées dans les délais légaux.</p>`,
  },
  {
    code: 'drh_accord_methode_restructuration',
    name: 'Accord de Méthode – Restructuration',
    category: 'juridique_admin',
    price: 12000,
    priceMax: 32000,
    description: "Accord définissant les modalités de la procédure d'information-consultation des IRP dans le cadre d'un projet de restructuration.",
    templateType: 'pdf',
    classe: 'ACCORD_COLLECTIF',
    active: true,
    popularity: 40,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'projet_restructuration', label: 'Intitulé du projet de restructuration', type: 'text', required: true },
      { key: 'calendrier_consultation', label: 'Calendrier de consultation', type: 'textarea', required: true },
    ]),
    body: `<h1>ACCORD DE MÉTHODE – RESTRUCTURATION</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong></p>
<p>Projet : {{projet_restructuration}}</p>
<h2>Calendrier de consultation</h2>
<p>{{calendrier_consultation}}</p>
<h2>Moyens alloués aux IRP</h2>
<p>Experts désignés, délais de réponse étendus et accès aux documents nécessaires à l'expertise.</p>`,
  },
  {
    code: 'drh_convention_reclassement',
    name: 'Convention de Reclassement Personnalisé',
    category: 'juridique_admin',
    price: 8000,
    priceMax: 22000,
    description: "Convention proposée au salarié licencié économique pour bénéficier d'un accompagnement personnalisé vers le reclassement professionnel.",
    templateType: 'pdf',
    classe: 'CONVENTION',
    active: true,
    popularity: 43,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié', type: 'text', required: true },
      { key: 'duree_convention', label: 'Durée de la convention (mois)', type: 'number', required: true },
      { key: 'allocation_mensuelle', label: 'Allocation mensuelle (FCFA)', type: 'number', required: true },
    ]),
    body: `<h1>CONVENTION DE RECLASSEMENT PERSONNALISÉ</h1>
<p>Entre <strong>{{employeur_nom}}</strong> et <strong>{{salarie_nom}}</strong> :</p>
<h2>Objet</h2>
<p>Accompagnement vers le reclassement professionnel pendant {{duree_convention}} mois.</p>
<h2>Allocation</h2>
<p>Le bénéficiaire perçoit une allocation mensuelle de {{allocation_mensuelle}} FCFA.</p>
<h2>Engagements</h2>
<p>Le bénéficiaire s'engage à participer activement aux actions de reclassement proposées.</p>`,
  },
  {
    code: 'drh_charte_dialogue_social',
    name: 'Charte du Dialogue Social',
    category: 'juridique_admin',
    price: 9000,
    priceMax: 24000,
    description: "Charte formalisant les engagements mutuels de la direction et des partenaires sociaux pour un dialogue social de qualité au sein de l'entreprise.",
    templateType: 'pdf',
    classe: 'CHARTE',
    active: true,
    popularity: 52,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'signataires', label: 'Parties signataires', type: 'text', required: true },
      { key: 'date_signature', label: 'Date de signature', type: 'date', required: true },
    ]),
    body: `<h1>CHARTE DU DIALOGUE SOCIAL</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong> | Signataires : {{signataires}}</p>
<h2>Principes fondateurs</h2>
<ul><li>Respect mutuel et bonne foi</li>
<li>Transparence de l'information partagée</li>
<li>Engagement à négocier loyalement</li></ul>
<h2>Engagements de la direction</h2>
<p>Information régulière et consultation préalable aux décisions impactant les salariés.</p>
<h2>Engagements des partenaires sociaux</h2>
<p>Représentation constructive des intérêts des salariés dans le respect de l'intérêt collectif.</p>`,
  },
  {
    code: 'drh_rapport_bilan_social_annuel',
    name: 'Rapport Bilan Social Annuel',
    category: 'juridique_admin',
    price: 18000,
    priceMax: 48000,
    description: "Bilan social annuel regroupant les données sociales clés de l'entreprise : effectifs, rémunérations, conditions de travail, formation et relations sociales.",
    templateType: 'pdf',
    classe: 'RAPPORT',
    active: true,
    popularity: 64,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'annee_bilan', label: 'Année du bilan', type: 'number', required: true },
      { key: 'effectif_total', label: 'Effectif total au 31/12', type: 'number', required: true },
      { key: 'masse_salariale', label: 'Masse salariale totale (FCFA)', type: 'number', required: true },
      { key: 'taux_absenteisme', label: "Taux d'absentéisme (%)", type: 'number', required: false },
    ]),
    body: `<h1>BILAN SOCIAL ANNUEL – {{annee_bilan}}</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong></p>
<h2>1. Effectifs</h2>
<p>Effectif total au 31/12/{{annee_bilan}} : {{effectif_total}} salariés</p>
<h2>2. Rémunérations</h2>
<p>Masse salariale : {{masse_salariale}} FCFA</p>
<h2>3. Conditions de travail</h2>
<p>Taux d'absentéisme : {{taux_absenteisme}} %</p>
<h2>4. Formation</h2>
<p>Voir plan de formation annexé.</p>
<h2>5. Relations sociales</h2>
<p>Négociations collectives et accords signés durant l'exercice.</p>`,
  },
  {
    code: 'drh_bilan_formation_annuel',
    name: 'Bilan de Formation Annuel',
    category: 'juridique_admin',
    price: 8000,
    priceMax: 20000,
    description: "Rapport annuel récapitulant les actions de formation réalisées, les dépenses engagées, les bénéficiaires et les résultats obtenus par type de formation.",
    templateType: 'pdf',
    classe: 'RAPPORT',
    active: true,
    popularity: 58,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'annee_bilan', label: 'Année du bilan', type: 'number', required: true },
      { key: 'nb_salaries_formes', label: 'Nombre de salariés formés', type: 'number', required: true },
      { key: 'budget_formation', label: 'Budget formation (FCFA)', type: 'number', required: true },
      { key: 'heures_totales', label: 'Nombre total d\'heures de formation', type: 'number', required: true },
    ]),
    body: `<h1>BILAN DE FORMATION ANNUEL – {{annee_bilan}}</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong></p>
<table border="1" cellpadding="6">
<tr><td>Salariés formés</td><td>{{nb_salaries_formes}}</td></tr>
<tr><td>Budget engagé</td><td>{{budget_formation}} FCFA</td></tr>
<tr><td>Heures de formation</td><td>{{heures_totales}} heures</td></tr>
</table>
<h2>Analyse</h2>
<p>Répartition par type de formation (présentiel, e-learning, terrain) et par catégorie socioprofessionnelle.</p>`,
  },
  {
    code: 'drh_accord_interessement',
    name: "Accord d'Intéressement",
    category: 'juridique_admin',
    price: 15000,
    priceMax: 40000,
    description: "Accord collectif d'intéressement liant une partie de la rémunération aux performances de l'entreprise, avec formule de calcul et modalités de versement.",
    templateType: 'pdf',
    classe: 'ACCORD_COLLECTIF',
    active: true,
    popularity: 62,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'indicateurs_performance', label: 'Indicateurs de performance retenus', type: 'textarea', required: true },
      { key: 'formule_interessement', label: "Formule de calcul de l'intéressement", type: 'textarea', required: true },
      { key: 'duree_accord', label: "Durée de l'accord (ans)", type: 'number', required: true },
    ]),
    body: `<h1>ACCORD D'INTÉRESSEMENT</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong> | Durée : {{duree_accord}} ans</p>
<h2>Indicateurs retenus</h2><p>{{indicateurs_performance}}</p>
<h2>Formule de calcul</h2><p>{{formule_interessement}}</p>
<h2>Versement</h2>
<p>L'intéressement est versé avant le 30 juin suivant la clôture de l'exercice de référence.</p>`,
  },
  {
    code: 'drh_pv_carence_syndicale',
    name: 'PV de Carence Syndicale',
    category: 'juridique_admin',
    price: 3000,
    priceMax: 7000,
    description: "Procès-verbal constatant l'absence de candidature aux élections professionnelles ou l'absence de syndicat représentatif dans l'entreprise.",
    templateType: 'pdf',
    classe: 'PV_ELECTION',
    active: true,
    popularity: 44,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'date_elections', label: 'Date des élections', type: 'date', required: true },
      { key: 'tour_election', label: 'Tour concerné (1er / 2ème)', type: 'text', required: true },
      { key: 'motif_carence', label: 'Motif de la carence', type: 'text', required: true },
    ]),
    body: `<h1>PROCÈS-VERBAL DE CARENCE</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong></p>
<p>Date des élections : {{date_elections}} | Tour : {{tour_election}}</p>
<h2>Constat de carence</h2>
<p>Il a été constaté une carence pour le motif suivant : {{motif_carence}}.</p>
<p>En conséquence, aucun représentant du personnel n'a pu être élu à cette date.</p>
<p>Le présent PV sera transmis à l'Inspection du Travail compétente.</p>`,
  },
  {
    code: 'drh_attestation_representativite',
    name: 'Attestation de Représentativité Syndicale',
    category: 'juridique_admin',
    price: 4000,
    priceMax: 10000,
    description: "Attestation délivrée par l'employeur reconnaissant la représentativité d'un syndicat dans l'entreprise sur la base des résultats électoraux.",
    templateType: 'pdf',
    classe: 'ATTESTATION',
    active: true,
    popularity: 41,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'syndicat_nom', label: 'Nom du syndicat', type: 'text', required: true },
      { key: 'score_electoral', label: 'Score électoral obtenu (%)', type: 'number', required: true },
      { key: 'date_elections', label: 'Date des élections', type: 'date', required: true },
    ]),
    body: `<h1>ATTESTATION DE REPRÉSENTATIVITÉ SYNDICALE</h1>
<p>Je soussigné(e), représentant légal de <strong>{{employeur_nom}}</strong>, atteste que :</p>
<p>L'organisation syndicale <strong>{{syndicat_nom}}</strong> a obtenu un score de {{score_electoral}} % des suffrages exprimés lors des élections professionnelles du {{date_elections}}, lui conférant la qualité de syndicat représentatif.</p>
<p>Fait à __________, le __________</p>
<p>Signature et cachet : _________________</p>`,
  },
  {
    code: 'drh_convocation_irp',
    name: 'Convocation IRP (Instance Représentative du Personnel)',
    category: 'juridique_admin',
    price: 2500,
    priceMax: 6000,
    description: "Convocation officielle des membres des instances représentatives du personnel à une réunion ordinaire ou extraordinaire avec ordre du jour.",
    templateType: 'pdf',
    classe: 'CONVOCATION',
    active: true,
    popularity: 66,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'instance_nom', label: "Nom de l'instance (CSE, DP...)", type: 'text', required: true },
      { key: 'date_reunion', label: 'Date de la réunion', type: 'date', required: true },
      { key: 'heure_reunion', label: 'Heure de la réunion', type: 'text', required: true },
      { key: 'lieu_reunion', label: 'Lieu de la réunion', type: 'text', required: true },
      { key: 'ordre_du_jour', label: "Ordre du jour", type: 'textarea', required: true },
    ]),
    body: `<h1>CONVOCATION – {{instance_nom}}</h1>
<p>{{employeur_nom}}</p>
<p>Vous êtes convoqué(e) à la réunion de {{instance_nom}} le <strong>{{date_reunion}} à {{heure_reunion}}</strong> en {{lieu_reunion}}.</p>
<h2>Ordre du jour</h2>
<p>{{ordre_du_jour}}</p>
<p>Les documents nécessaires vous seront communiqués dans les délais réglementaires.</p>`,
  },
  {
    code: 'drh_ordre_jour_cse',
    name: 'Ordre du Jour CSE',
    category: 'juridique_admin',
    price: 2000,
    priceMax: 5000,
    description: "Modèle d'ordre du jour pour les réunions du Comité Social et Économique, élaboré conjointement par l'employeur et le secrétaire du CSE.",
    templateType: 'pdf',
    classe: 'ODJ_REUNION',
    active: true,
    popularity: 71,
    fieldsJson: F([
      { key: 'entreprise_nom', label: "Nom de l'entreprise", type: 'text', required: true },
      { key: 'numero_reunion', label: 'Numéro de la réunion', type: 'text', required: true },
      { key: 'date_reunion', label: 'Date de la réunion', type: 'date', required: true },
      { key: 'points_employeur', label: "Points à l'initiative de l'employeur", type: 'textarea', required: true },
      { key: 'points_cse', label: "Points à l'initiative du CSE", type: 'textarea', required: false },
    ]),
    body: `<h1>ORDRE DU JOUR – CSE N°{{numero_reunion}}</h1>
<p>Entreprise : <strong>{{entreprise_nom}}</strong> | Date : {{date_reunion}}</p>
<h2>Points à l'initiative de l'employeur</h2>
<p>{{points_employeur}}</p>
<h2>Points à l'initiative du CSE</h2>
<p>{{points_cse}}</p>
<p>Questions diverses.</p>
<p>Établi conjointement par la Direction et le Secrétaire du CSE.</p>`,
  },
  {
    code: 'drh_declaration_employeur_accident',
    name: "Déclaration Employeur Accident du Travail",
    category: 'juridique_admin',
    price: 3000,
    priceMax: 7500,
    description: "Déclaration d'accident du travail à effectuer auprès des organismes sociaux compétents dans les délais légaux, avec description des circonstances.",
    templateType: 'pdf',
    classe: 'DECLARATION',
    active: true,
    popularity: 79,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'victime_nom', label: 'Nom de la victime', type: 'text', required: true },
      { key: 'date_accident', label: "Date de l'accident", type: 'date', required: true },
      { key: 'heure_accident', label: "Heure de l'accident", type: 'text', required: true },
      { key: 'lieu_accident', label: "Lieu de l'accident", type: 'text', required: true },
      { key: 'circonstances', label: 'Circonstances de l\'accident', type: 'textarea', required: true },
      { key: 'nature_lesions', label: 'Nature des lésions', type: 'text', required: true },
    ]),
    body: `<h1>DÉCLARATION D'ACCIDENT DU TRAVAIL</h1>
<p>Employeur : <strong>{{employeur_nom}}</strong></p>
<h2>Victime</h2><p>{{victime_nom}}</p>
<h2>Accident</h2>
<table border="1" cellpadding="6">
<tr><td>Date</td><td>{{date_accident}}</td></tr>
<tr><td>Heure</td><td>{{heure_accident}}</td></tr>
<tr><td>Lieu</td><td>{{lieu_accident}}</td></tr>
<tr><td>Nature des lésions</td><td>{{nature_lesions}}</td></tr>
</table>
<h2>Circonstances</h2><p>{{circonstances}}</p>
<p>Déclaration effectuée dans les délais légaux auprès des organismes compétents.</p>`,
  },
  {
    code: 'drh_contrat_apprentissage_alternance',
    name: "Contrat d'Apprentissage en Alternance",
    category: 'juridique_admin',
    price: 5000,
    priceMax: 13000,
    description: "Contrat d'apprentissage en alternance conforme aux dispositions légales, précisant le centre de formation, le maître d'apprentissage et la rémunération.",
    templateType: 'pdf',
    classe: 'CONTRAT',
    active: true,
    popularity: 68,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'apprenti_nom', label: "Nom de l'apprenti", type: 'text', required: true },
      { key: 'centre_formation', label: 'Centre de formation', type: 'text', required: true },
      { key: 'maitre_apprentissage', label: "Maître d'apprentissage", type: 'text', required: true },
      { key: 'diplome_prepare', label: 'Diplôme préparé', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin', type: 'date', required: true },
      { key: 'remuneration', label: 'Rémunération brute mensuelle (FCFA)', type: 'number', required: true },
    ]),
    body: `<h1>CONTRAT D'APPRENTISSAGE EN ALTERNANCE</h1>
<p>Entre <strong>{{employeur_nom}}</strong> et <strong>{{apprenti_nom}}</strong></p>
<h2>Formation</h2>
<p>Centre : {{centre_formation}} | Diplôme : {{diplome_prepare}}</p>
<p>Maître d'apprentissage : {{maitre_apprentissage}}</p>
<h2>Durée et rémunération</h2>
<p>Du {{date_debut}} au {{date_fin}} | Rémunération : {{remuneration}} FCFA/mois</p>
<h2>Obligations</h2>
<p>L'apprenti s'engage à suivre assidûment les cours et à exécuter les travaux confiés par l'employeur.</p>`,
  },
  {
    code: 'drh_convention_formation_professionnelle',
    name: 'Convention de Formation Professionnelle',
    category: 'juridique_admin',
    price: 6000,
    priceMax: 16000,
    description: "Convention tripartite entre l'employeur, l'organisme de formation et le salarié définissant les modalités, le financement et les engagements de chacun.",
    templateType: 'pdf',
    classe: 'CONVENTION',
    active: true,
    popularity: 73,
    fieldsJson: F([
      { key: 'employeur_nom', label: "Nom de l'employeur", type: 'text', required: true },
      { key: 'organisme_formation', label: 'Organisme de formation', type: 'text', required: true },
      { key: 'salarie_nom', label: 'Nom du salarié bénéficiaire', type: 'text', required: true },
      { key: 'intitule_formation', label: 'Intitulé de la formation', type: 'text', required: true },
      { key: 'duree_heures', label: 'Durée en heures', type: 'number', required: true },
      { key: 'cout_formation', label: 'Coût de la formation (FCFA)', type: 'number', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin', type: 'date', required: true },
    ]),
    body: `<h1>CONVENTION DE FORMATION PROFESSIONNELLE</h1>
<p>Entre <strong>{{employeur_nom}}</strong>, <strong>{{organisme_formation}}</strong> et <strong>{{salarie_nom}}</strong> :</p>
<h2>Formation</h2>
<p>Intitulé : {{intitule_formation}} | Durée : {{duree_heures}} heures</p>
<p>Du {{date_debut}} au {{date_fin}}</p>
<h2>Financement</h2>
<p>Coût total : {{cout_formation}} FCFA, pris en charge par l'employeur.</p>
<h2>Engagements</h2>
<p>L'organisme s'engage à délivrer la formation conformément au programme annexé. Le salarié s'engage à participer activement. L'employeur s'engage au paiement dans les délais convenus.</p>`,
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
  console.log(`Batch 09a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
