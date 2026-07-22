// Seed Formation & Éducation — Agent Templates-6
// 28 templates pour la formation professionnelle et l'enseignement.
// Préfixe : form_ | Catégories : academique, commercial_financier
// Exécution : npx tsx prisma/seed-formation-education.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type DriveTemplate = {
  code: string;
  name: string;
  category: string;
  price: number;
  priceMax: number;
  description: string;
  fieldsJson: string;
  body: string;
  popularity: number;
};

const F = (fields: object[]) => JSON.stringify(fields);

const templates: DriveTemplate[] = [

  // ── 1. Programme de formation professionnelle ──────────────────────
  {
    code: 'form_programme_formation',
    name: 'Programme de formation professionnelle',
    category: 'commercial_financier',
    price: 500, priceMax: 800,
    description: 'Programme détaillé d\'une formation professionnelle : objectifs pédagogiques, public cible, contenu par module, méthodes, durée et modalités d\'évaluation.',
    fieldsJson: F([
      { key: 'intitule_formation', label: 'Intitulé de la formation', type: 'text', required: true },
      { key: 'organisme', label: 'Organisme / établissement de formation', type: 'text', required: true },
      { key: 'formateur', label: 'Nom du formateur / référent pédagogique', type: 'text', required: true },
      { key: 'public_cible', label: 'Public cible et prérequis', type: 'textarea', required: true },
      { key: 'objectifs', label: 'Objectifs pédagogiques généraux', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée totale (heures / jours)', type: 'text', required: true },
      { key: 'dates', label: 'Dates et lieu de la formation', type: 'text', required: true },
      { key: 'contenu_modules', label: 'Contenu par module (intitulé, durée, objectifs)', type: 'textarea', required: true },
      { key: 'methodes', label: 'Méthodes pédagogiques (exposé, atelier, cas pratique…)', type: 'textarea', required: true },
      { key: 'evaluation', label: 'Modalités d\'évaluation et de validation', type: 'textarea', required: true },
      { key: 'materiel', label: 'Matériel / supports fournis aux participants', type: 'textarea', required: false },
    ]),
    body: `<div class="document">
<h1>PROGRAMME DE FORMATION PROFESSIONNELLE</h1>
<p><strong>Intitulé :</strong> {{intitule_formation}}</p>
<p><strong>Organisme :</strong> {{organisme}}</p>
<p><strong>Formateur / Référent :</strong> {{formateur}}</p>
<p><strong>Dates et lieu :</strong> {{dates}}</p>
<p><strong>Durée totale :</strong> {{duree}}</p>
<hr/>
<h2>1. Public cible et prérequis</h2>
<p>{{public_cible}}</p>
<h2>2. Objectifs pédagogiques</h2>
<p>À l'issue de cette formation, les participants seront capables de :</p>
<p>{{objectifs}}</p>
<h2>3. Contenu du programme</h2>
<p>{{contenu_modules}}</p>
<h2>4. Méthodes pédagogiques</h2>
<p>{{methodes}}</p>
<h2>5. Évaluation et validation</h2>
<p>{{evaluation}}</p>
<h2>6. Matériel et supports</h2>
<p>{{materiel}}</p>
<h2>7. Informations pratiques</h2>
<p>Pour toute question relative à ce programme, contacter l'organisme de formation {{organisme}}.</p>
<br/>
<p><em>Document établi le {{date_jour}} — {{organisme}}</em></p>
</div>`,
    popularity: 52,
  },

  // ── 2. Plan de formation annuel (entreprise) ───────────────────────
  {
    code: 'form_plan_formation_annuel',
    name: 'Plan de formation annuel (entreprise)',
    category: 'commercial_financier',
    price: 600, priceMax: 800,
    description: 'Plan de formation annuel d\'une entreprise : recensement des besoins, actions prévues, budgets, calendrier et indicateurs de suivi.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Nom de l\'entreprise', type: 'text', required: true },
      { key: 'annee', label: 'Année de référence', type: 'text', required: true },
      { key: 'responsable_rh', label: 'Responsable RH / formation', type: 'text', required: true },
      { key: 'effectif', label: 'Effectif total concerné', type: 'text', required: true },
      { key: 'besoins_identifies', label: 'Besoins en formation identifiés (par service / poste)', type: 'textarea', required: true },
      { key: 'actions_formation', label: 'Actions de formation prévues (intitulé, durée, organisme)', type: 'textarea', required: true },
      { key: 'calendrier', label: 'Calendrier prévisionnel des formations', type: 'textarea', required: true },
      { key: 'budget_total', label: 'Budget total formation alloué (FCFA)', type: 'text', required: true },
      { key: 'financement', label: 'Modalités de financement (fonds propres, FDFP, OPCO…)', type: 'textarea', required: false },
      { key: 'indicateurs', label: 'Indicateurs de suivi et de résultats', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>PLAN DE FORMATION ANNUEL</h1>
<p><strong>Entreprise :</strong> {{entreprise}}</p>
<p><strong>Année :</strong> {{annee}}</p>
<p><strong>Responsable formation :</strong> {{responsable_rh}}</p>
<p><strong>Effectif concerné :</strong> {{effectif}}</p>
<p><strong>Date d'établissement :</strong> {{date_jour}}</p>
<hr/>
<h2>1. Besoins en formation identifiés</h2>
<p>{{besoins_identifies}}</p>
<h2>2. Actions de formation planifiées</h2>
<p>{{actions_formation}}</p>
<h2>3. Calendrier prévisionnel</h2>
<p>{{calendrier}}</p>
<h2>4. Budget formation</h2>
<p><strong>Budget total alloué :</strong> {{budget_total}} FCFA</p>
<p><strong>Modalités de financement :</strong> {{financement}}</p>
<h2>5. Indicateurs de suivi</h2>
<p>{{indicateurs}}</p>
<h2>6. Approbation</h2>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
<tr><th>Responsable RH</th><th>Direction générale</th></tr>
<tr><td style="height:50px;">Signature :</td><td style="height:50px;">Signature :</td></tr>
</table>
<br/>
<p><em>{{entreprise}} — Plan de formation {{annee}}</em></p>
</div>`,
    popularity: 45,
  },

  // ── 3. Convention de formation professionnelle ─────────────────────
  {
    code: 'form_convention_formation',
    name: 'Convention de formation professionnelle',
    category: 'commercial_financier',
    price: 600, priceMax: 800,
    description: 'Convention bipartite entre un organisme de formation et une entreprise cliente précisant la formation dispensée, le coût, les obligations réciproques et les modalités de règlement.',
    fieldsJson: F([
      { key: 'organisme_formation', label: 'Organisme de formation (nom, adresse, agrément)', type: 'textarea', required: true },
      { key: 'entreprise_cliente', label: 'Entreprise cliente (nom, adresse, représentant)', type: 'textarea', required: true },
      { key: 'intitule_formation', label: 'Intitulé de la formation', type: 'text', required: true },
      { key: 'objectifs_formation', label: 'Objectifs de la formation', type: 'textarea', required: true },
      { key: 'programme_resume', label: 'Programme résumé', type: 'textarea', required: true },
      { key: 'duree', label: 'Durée (heures / jours)', type: 'text', required: true },
      { key: 'dates_lieu', label: 'Dates et lieu de déroulement', type: 'text', required: true },
      { key: 'nombre_stagiaires', label: 'Nombre de stagiaires', type: 'text', required: true },
      { key: 'cout_total', label: 'Coût total de la formation (FCFA)', type: 'text', required: true },
      { key: 'modalites_paiement', label: 'Modalités de paiement', type: 'textarea', required: true },
      { key: 'conditions_annulation', label: 'Conditions d\'annulation', type: 'textarea', required: false },
    ]),
    body: `<div class="document">
<h1>CONVENTION DE FORMATION PROFESSIONNELLE</h1>
<p>Entre les soussignés :</p>
<p><strong>L'organisme de formation :</strong><br/>{{organisme_formation}}</p>
<p><strong>Et l'entreprise cliente :</strong><br/>{{entreprise_cliente}}</p>
<p>Il est convenu ce qui suit :</p>
<hr/>
<h2>Article 1 — Objet</h2>
<p>La présente convention a pour objet la réalisation de la formation intitulée : <strong>«{{intitule_formation}}»</strong>.</p>
<h2>Article 2 — Objectifs</h2>
<p>{{objectifs_formation}}</p>
<h2>Article 3 — Programme</h2>
<p>{{programme_resume}}</p>
<h2>Article 4 — Durée et calendrier</h2>
<p><strong>Durée :</strong> {{duree}}</p>
<p><strong>Dates et lieu :</strong> {{dates_lieu}}</p>
<p><strong>Nombre de stagiaires :</strong> {{nombre_stagiaires}}</p>
<h2>Article 5 — Coût et modalités de règlement</h2>
<p><strong>Coût total :</strong> {{cout_total}} FCFA</p>
<p>{{modalites_paiement}}</p>
<h2>Article 6 — Conditions d'annulation</h2>
<p>{{conditions_annulation}}</p>
<h2>Article 7 — Litiges</h2>
<p>Tout litige relatif à l'exécution de la présente convention sera soumis aux juridictions compétentes.</p>
<br/>
<p>Fait en deux exemplaires originaux, le {{date_jour}}.</p>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
<tr><th>Pour l'organisme de formation</th><th>Pour l'entreprise cliente</th></tr>
<tr><td style="height:60px;"></td><td style="height:60px;"></td></tr>
</table>
</div>`,
    popularity: 60,
  },

  // ── 4. Attestation de participation / réussite ─────────────────────
  {
    code: 'form_attestation_formation',
    name: 'Attestation de participation / réussite formation',
    category: 'academique',
    price: 300, priceMax: 500,
    description: 'Attestation officielle délivrée par un organisme de formation certifiant la participation ou la réussite d\'un stagiaire à une formation.',
    fieldsJson: F([
      { key: 'organisme', label: 'Organisme de formation (nom, logo)', type: 'text', required: true },
      { key: 'representant', label: 'Représentant légal / directeur', type: 'text', required: true },
      { key: 'nom_prenom', label: 'Nom et prénom du bénéficiaire', type: 'text', required: true },
      { key: 'intitule_formation', label: 'Intitulé de la formation', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la formation', type: 'text', required: true },
      { key: 'dates', label: 'Dates de la formation (du … au …)', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de formation', type: 'text', required: true },
      { key: 'type_attestation', label: 'Type d\'attestation (participation / réussite)', type: 'select', options: ['participation', 'réussite'], required: true },
      { key: 'mention', label: 'Mention obtenue (si réussite)', type: 'text', required: false },
    ]),
    body: `<div class="document" style="text-align:center;">
<h1>ATTESTATION DE {{type_attestation|upper}}</h1>
<p style="font-size:1.1em;">L'organisme de formation</p>
<h2>{{organisme}}</h2>
<p>représenté par <strong>{{representant}}</strong>,</p>
<p>atteste que</p>
<h2>{{nom_prenom}}</h2>
<p>a suivi avec assiduité la formation :</p>
<h3>«{{intitule_formation}}»</h3>
<p>Durée : <strong>{{duree}}</strong></p>
<p>Du <strong>{{dates}}</strong></p>
<p>Lieu : <strong>{{lieu}}</strong></p>
<p>Mention : <strong>{{mention}}</strong></p>
<br/>
<p>En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.</p>
<br/>
<p>Fait le {{date_jour}}</p>
<br/><br/>
<p>Signature et cachet :</p>
<p>___________________________</p>
<p>{{representant}}</p>
</div>`,
    popularity: 70,
  },

  // ── 5. Certificat de compétence professionnelle ────────────────────
  {
    code: 'form_certificat_competence',
    name: 'Certificat de compétence professionnelle',
    category: 'academique',
    price: 300, priceMax: 500,
    description: 'Certificat attestant la maîtrise de compétences professionnelles spécifiques, délivré à l\'issue d\'une évaluation ou d\'un parcours de formation.',
    fieldsJson: F([
      { key: 'organisme', label: 'Organisme certificateur', type: 'text', required: true },
      { key: 'numero_certificat', label: 'Numéro de certificat', type: 'text', required: true },
      { key: 'nom_prenom', label: 'Nom et prénom du titulaire', type: 'text', required: true },
      { key: 'date_naissance', label: 'Date de naissance', type: 'text', required: false },
      { key: 'competences', label: 'Compétences certifiées (liste)', type: 'textarea', required: true },
      { key: 'niveau', label: 'Niveau de qualification', type: 'text', required: true },
      { key: 'date_obtention', label: 'Date d\'obtention', type: 'text', required: true },
      { key: 'validite', label: 'Durée de validité du certificat', type: 'text', required: false },
      { key: 'evaluateur', label: 'Nom de l\'évaluateur / jury', type: 'text', required: true },
    ]),
    body: `<div class="document" style="text-align:center;border:3px solid #2c3e50;padding:30px;">
<h1>CERTIFICAT DE COMPÉTENCE PROFESSIONNELLE</h1>
<p>N° {{numero_certificat}}</p>
<p>Délivré par</p>
<h2>{{organisme}}</h2>
<p>Le présent certificat atteste que</p>
<h2>{{nom_prenom}}</h2>
<p>Né(e) le : {{date_naissance}}</p>
<p>a démontré la maîtrise des compétences professionnelles suivantes :</p>
<div style="text-align:left;margin:20px auto;max-width:500px;">
<p>{{competences}}</p>
</div>
<p><strong>Niveau de qualification :</strong> {{niveau}}</p>
<p><strong>Date d'obtention :</strong> {{date_obtention}}</p>
<p><strong>Validité :</strong> {{validite}}</p>
<br/>
<p>Le présent certificat est délivré le {{date_jour}}.</p>
<br/>
<table style="width:80%;margin:auto;">
<tr>
<td style="text-align:center;"><p>L'évaluateur / Jury</p><p>{{evaluateur}}</p><p>_______________</p></td>
<td style="text-align:center;"><p>Le Directeur</p><p>{{organisme}}</p><p>_______________</p></td>
</tr>
</table>
</div>`,
    popularity: 58,
  },

  // ── 6. Cahier des charges formation sur mesure ─────────────────────
  {
    code: 'form_cahier_charge_formation',
    name: 'Cahier des charges formation sur mesure',
    category: 'commercial_financier',
    price: 700, priceMax: 800,
    description: 'Cahier des charges pour la conception et la réalisation d\'une formation sur mesure : contexte, besoins, contraintes, livrables attendus et critères de sélection du prestataire.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Entreprise commanditaire', type: 'text', required: true },
      { key: 'contact', label: 'Personne de contact et coordonnées', type: 'text', required: true },
      { key: 'contexte', label: 'Contexte et enjeux de la formation', type: 'textarea', required: true },
      { key: 'public_cible', label: 'Public cible (profil, effectif, niveau)', type: 'textarea', required: true },
      { key: 'objectifs_attendus', label: 'Objectifs attendus de la formation', type: 'textarea', required: true },
      { key: 'contenu_souhaite', label: 'Contenu et thèmes souhaités', type: 'textarea', required: true },
      { key: 'contraintes', label: 'Contraintes (budget, délai, lieu, format)', type: 'textarea', required: true },
      { key: 'livrables', label: 'Livrables attendus du prestataire', type: 'textarea', required: true },
      { key: 'criteres_selection', label: 'Critères de sélection du prestataire', type: 'textarea', required: true },
      { key: 'date_limite_reponse', label: 'Date limite de réponse à l\'appel d\'offres', type: 'text', required: true },
    ]),
    body: `<div class="document">
<h1>CAHIER DES CHARGES — FORMATION SUR MESURE</h1>
<p><strong>Entreprise commanditaire :</strong> {{entreprise}}</p>
<p><strong>Contact :</strong> {{contact}}</p>
<p><strong>Date d'émission :</strong> {{date_jour}}</p>
<p><strong>Date limite de réponse :</strong> {{date_limite_reponse}}</p>
<hr/>
<h2>1. Contexte et enjeux</h2>
<p>{{contexte}}</p>
<h2>2. Public cible</h2>
<p>{{public_cible}}</p>
<h2>3. Objectifs attendus</h2>
<p>{{objectifs_attendus}}</p>
<h2>4. Contenu et thèmes souhaités</h2>
<p>{{contenu_souhaite}}</p>
<h2>5. Contraintes</h2>
<p>{{contraintes}}</p>
<h2>6. Livrables attendus</h2>
<p>{{livrables}}</p>
<h2>7. Critères de sélection</h2>
<p>{{criteres_selection}}</p>
<h2>8. Modalités de réponse</h2>
<p>Les prestataires intéressés sont invités à transmettre leur proposition au contact désigné avant le {{date_limite_reponse}}.</p>
<p>La proposition devra inclure : le programme pédagogique détaillé, les références, le CV des formateurs et une offre financière chiffrée.</p>
</div>`,
    popularity: 38,
  },

  // ── 7. Feuille de présence formation (émargement) ──────────────────
  {
    code: 'form_fiche_presence',
    name: 'Feuille de présence formation (émargement)',
    category: 'commercial_financier',
    price: 200, priceMax: 300,
    description: 'Feuille d\'émargement officielle pour une formation : liste des participants avec colonnes de signature par demi-journée.',
    fieldsJson: F([
      { key: 'intitule_formation', label: 'Intitulé de la formation', type: 'text', required: true },
      { key: 'organisme', label: 'Organisme de formation', type: 'text', required: true },
      { key: 'formateur', label: 'Nom du formateur', type: 'text', required: true },
      { key: 'date_session', label: 'Date de la session', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu de la session', type: 'text', required: true },
      { key: 'horaires', label: 'Horaires (ex : 08h00 – 12h00 / 13h00 – 17h00)', type: 'text', required: true },
      { key: 'liste_participants', label: 'Liste des participants (nom, prénom, fonction — un par ligne)', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>FEUILLE DE PRÉSENCE — ÉMARGEMENT</h1>
<p><strong>Formation :</strong> {{intitule_formation}}</p>
<p><strong>Organisme :</strong> {{organisme}}</p>
<p><strong>Formateur :</strong> {{formateur}}</p>
<p><strong>Date :</strong> {{date_session}}</p>
<p><strong>Lieu :</strong> {{lieu}}</p>
<p><strong>Horaires :</strong> {{horaires}}</p>
<hr/>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
<thead>
<tr style="background:#f0f0f0;">
  <th>N°</th>
  <th>Nom et Prénom</th>
  <th>Fonction / Entreprise</th>
  <th>Signature Matin</th>
  <th>Signature Après-midi</th>
</tr>
</thead>
<tbody>
<tr><td>1</td><td></td><td></td><td></td><td></td></tr>
<tr><td>2</td><td></td><td></td><td></td><td></td></tr>
<tr><td>3</td><td></td><td></td><td></td><td></td></tr>
<tr><td>4</td><td></td><td></td><td></td><td></td></tr>
<tr><td>5</td><td></td><td></td><td></td><td></td></tr>
<tr><td>6</td><td></td><td></td><td></td><td></td></tr>
<tr><td>7</td><td></td><td></td><td></td><td></td></tr>
<tr><td>8</td><td></td><td></td><td></td><td></td></tr>
<tr><td>9</td><td></td><td></td><td></td><td></td></tr>
<tr><td>10</td><td></td><td></td><td></td><td></td></tr>
<tr><td>11</td><td></td><td></td><td></td><td></td></tr>
<tr><td>12</td><td></td><td></td><td></td><td></td></tr>
</tbody>
</table>
<br/>
<p>Participants enregistrés : {{liste_participants}}</p>
<br/>
<p>Signature du formateur : ___________________________</p>
<p>{{formateur}} — Le {{date_jour}}</p>
</div>`,
    popularity: 65,
  },

  // ── 8. Questionnaire d'évaluation de formation ─────────────────────
  {
    code: 'form_evaluation_formation',
    name: 'Questionnaire d\'évaluation de formation',
    category: 'commercial_financier',
    price: 300, priceMax: 500,
    description: 'Questionnaire à chaud pour évaluer la satisfaction des participants à une formation : contenu, formateur, organisation, apports pratiques et suggestions.',
    fieldsJson: F([
      { key: 'intitule_formation', label: 'Intitulé de la formation évaluée', type: 'text', required: true },
      { key: 'organisme', label: 'Organisme de formation', type: 'text', required: true },
      { key: 'date_formation', label: 'Date de la formation', type: 'text', required: true },
      { key: 'formateur', label: 'Nom du formateur', type: 'text', required: true },
    ]),
    body: `<div class="document">
<h1>QUESTIONNAIRE D'ÉVALUATION DE FORMATION</h1>
<p><strong>Formation :</strong> {{intitule_formation}}</p>
<p><strong>Organisme :</strong> {{organisme}}</p>
<p><strong>Formateur :</strong> {{formateur}}</p>
<p><strong>Date :</strong> {{date_formation}}</p>
<p><em>Ce questionnaire est anonyme. Merci de répondre sincèrement afin de nous aider à améliorer nos formations.</em></p>
<hr/>
<h2>A. Contenu de la formation</h2>
<p>1. Le contenu correspondait à vos attentes initiales ?<br/>
☐ Tout à fait  ☐ Plutôt oui  ☐ Plutôt non  ☐ Pas du tout</p>
<p>2. Les objectifs pédagogiques ont été clairement définis ?<br/>
☐ Tout à fait  ☐ Plutôt oui  ☐ Plutôt non  ☐ Pas du tout</p>
<p>3. Les supports fournis sont de qualité et utilisables ?<br/>
☐ Tout à fait  ☐ Plutôt oui  ☐ Plutôt non  ☐ Pas du tout</p>
<h2>B. Formateur</h2>
<p>4. Le formateur maîtrisait bien le sujet ?<br/>
☐ Tout à fait  ☐ Plutôt oui  ☐ Plutôt non  ☐ Pas du tout</p>
<p>5. Les explications étaient claires et illustrées ?<br/>
☐ Tout à fait  ☐ Plutôt oui  ☐ Plutôt non  ☐ Pas du tout</p>
<p>6. Le formateur a su maintenir la dynamique du groupe ?<br/>
☐ Tout à fait  ☐ Plutôt oui  ☐ Plutôt non  ☐ Pas du tout</p>
<h2>C. Organisation et logistique</h2>
<p>7. L'organisation générale (accueil, salle, pauses) était satisfaisante ?<br/>
☐ Tout à fait  ☐ Plutôt oui  ☐ Plutôt non  ☐ Pas du tout</p>
<p>8. La durée de la formation était adaptée ?<br/>
☐ Trop courte  ☐ Adaptée  ☐ Trop longue</p>
<h2>D. Apports pratiques</h2>
<p>9. Cette formation vous apportera des bénéfices concrets dans votre travail ?<br/>
☐ Tout à fait  ☐ Plutôt oui  ☐ Plutôt non  ☐ Pas du tout</p>
<p>10. Recommanderiez-vous cette formation à un collègue ?<br/>
☐ Oui  ☐ Non  ☐ Peut-être</p>
<h2>E. Commentaires et suggestions</h2>
<p>Points positifs : ______________________________________________________</p>
<p>Points à améliorer : ___________________________________________________</p>
<p>Suggestions : _________________________________________________________</p>
<br/>
<p><em>Merci pour votre participation — {{organisme}}</em></p>
</div>`,
    popularity: 55,
  },

  // ── 9. Livret d'accueil du stagiaire ──────────────────────────────
  {
    code: 'form_livret_accueil_stagiaire',
    name: 'Livret d\'accueil du stagiaire',
    category: 'academique',
    price: 400, priceMax: 600,
    description: 'Livret remis au stagiaire à son arrivée : présentation de l\'organisme, règles de vie, interlocuteurs, planning et informations pratiques.',
    fieldsJson: F([
      { key: 'organisme', label: 'Nom de l\'organisme / établissement', type: 'text', required: true },
      { key: 'adresse', label: 'Adresse et contacts', type: 'textarea', required: true },
      { key: 'tuteur', label: 'Nom et coordonnées du tuteur de stage', type: 'text', required: true },
      { key: 'nom_stagiaire', label: 'Nom et prénom du stagiaire', type: 'text', required: true },
      { key: 'periode_stage', label: 'Période de stage (du … au …)', type: 'text', required: true },
      { key: 'service_accueil', label: 'Service / département d\'accueil', type: 'text', required: true },
      { key: 'presentation_organisme', label: 'Présentation de l\'organisme (historique, activités, valeurs)', type: 'textarea', required: true },
      { key: 'regles_vie', label: 'Règles de vie interne (horaires, tenue, confidentialité)', type: 'textarea', required: true },
      { key: 'interlocuteurs', label: 'Interlocuteurs clés et organigramme simplifié', type: 'textarea', required: false },
      { key: 'planning', label: 'Planning d\'intégration de la première semaine', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>LIVRET D'ACCUEIL DU STAGIAIRE</h1>
<h2>Bienvenue chez {{organisme}} !</h2>
<p>Ce livret vous accompagnera tout au long de votre stage. Lisez-le attentivement et conservez-le.</p>
<hr/>
<h2>1. L'organisme</h2>
<p>{{presentation_organisme}}</p>
<p><strong>Adresse et contacts :</strong> {{adresse}}</p>
<h2>2. Votre stage</h2>
<p><strong>Stagiaire :</strong> {{nom_stagiaire}}</p>
<p><strong>Période :</strong> {{periode_stage}}</p>
<p><strong>Service d'accueil :</strong> {{service_accueil}}</p>
<p><strong>Tuteur de stage :</strong> {{tuteur}}</p>
<h2>3. Règles de vie interne</h2>
<p>{{regles_vie}}</p>
<h2>4. Vos interlocuteurs</h2>
<p>{{interlocuteurs}}</p>
<h2>5. Planning d'intégration — Première semaine</h2>
<p>{{planning}}</p>
<h2>6. Ressources utiles</h2>
<p>En cas de question ou de difficulté, n'hésitez pas à vous adresser à votre tuteur {{tuteur}}. Nous vous souhaitons une excellente expérience au sein de {{organisme}}.</p>
<br/>
<p><em>Document remis le {{date_jour}} — {{organisme}}</em></p>
</div>`,
    popularity: 42,
  },

  // ── 10. Rapport de stage (modèle complet) ─────────────────────────
  {
    code: 'form_rapport_stage',
    name: 'Rapport de stage (modèle complet)',
    category: 'academique',
    price: 500, priceMax: 700,
    description: 'Modèle complet de rapport de stage : page de garde, remerciements, présentation de l\'entreprise, missions, bilan et annexes.',
    fieldsJson: F([
      { key: 'nom_stagiaire', label: 'Nom et prénom du stagiaire', type: 'text', required: true },
      { key: 'formation', label: 'Formation suivie et établissement', type: 'text', required: true },
      { key: 'entreprise', label: 'Entreprise d\'accueil (nom, secteur)', type: 'text', required: true },
      { key: 'service', label: 'Service / département', type: 'text', required: true },
      { key: 'tuteur', label: 'Tuteur en entreprise', type: 'text', required: true },
      { key: 'periode', label: 'Période du stage', type: 'text', required: true },
      { key: 'presentation_entreprise', label: 'Présentation de l\'entreprise (activité, organisation)', type: 'textarea', required: true },
      { key: 'missions', label: 'Missions confiées et tâches réalisées', type: 'textarea', required: true },
      { key: 'competences_acquises', label: 'Compétences et apprentissages acquis', type: 'textarea', required: true },
      { key: 'bilan_personnel', label: 'Bilan personnel et apport du stage', type: 'textarea', required: true },
      { key: 'difficultes', label: 'Difficultés rencontrées et solutions apportées', type: 'textarea', required: false },
      { key: 'conclusion', label: 'Conclusion et perspectives professionnelles', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<div style="text-align:center;margin-bottom:40px;">
<h1>RAPPORT DE STAGE</h1>
<h2>{{entreprise}}</h2>
<p><strong>{{nom_stagiaire}}</strong></p>
<p>{{formation}}</p>
<p>Période : {{periode}}</p>
<p>Tuteur : {{tuteur}}</p>
<p>Date de rendu : {{date_jour}}</p>
</div>
<hr/>
<h2>Remerciements</h2>
<p>Je tiens à exprimer ma gratitude envers {{tuteur}} et l'ensemble de l'équipe de {{entreprise}} pour leur accueil et leur accompagnement tout au long de ce stage.</p>
<h2>1. Présentation de l'entreprise</h2>
<p>{{presentation_entreprise}}</p>
<h2>2. Service d'accueil</h2>
<p>Le stage s'est déroulé au sein du service <strong>{{service}}</strong>.</p>
<h2>3. Missions et tâches réalisées</h2>
<p>{{missions}}</p>
<h2>4. Compétences et apprentissages</h2>
<p>{{competences_acquises}}</p>
<h2>5. Difficultés rencontrées</h2>
<p>{{difficultes}}</p>
<h2>6. Bilan personnel</h2>
<p>{{bilan_personnel}}</p>
<h2>7. Conclusion</h2>
<p>{{conclusion}}</p>
<h2>Annexes</h2>
<p>Les documents complémentaires (organigramme, exemples de productions, etc.) sont joints en annexe.</p>
</div>`,
    popularity: 68,
  },

  // ── 11. Journal de bord apprenant ─────────────────────────────────
  {
    code: 'form_journal_bord_apprenant',
    name: 'Journal de bord apprenant',
    category: 'academique',
    price: 200, priceMax: 400,
    description: 'Journal de bord hebdomadaire pour qu\'un apprenant trace ses activités, apprentissages, difficultés et objectifs durant une formation ou un stage.',
    fieldsJson: F([
      { key: 'nom_apprenant', label: 'Nom et prénom de l\'apprenant', type: 'text', required: true },
      { key: 'formation', label: 'Formation / programme suivi', type: 'text', required: true },
      { key: 'semaine', label: 'Semaine n° / dates (du … au …)', type: 'text', required: true },
      { key: 'activites', label: 'Activités réalisées cette semaine', type: 'textarea', required: true },
      { key: 'apprentissages', label: 'Ce que j\'ai appris / découvert', type: 'textarea', required: true },
      { key: 'difficultes', label: 'Difficultés rencontrées', type: 'textarea', required: false },
      { key: 'solutions', label: 'Solutions envisagées / aide sollicitée', type: 'textarea', required: false },
      { key: 'objectifs_suivants', label: 'Objectifs pour la semaine prochaine', type: 'textarea', required: true },
      { key: 'reflexion', label: 'Réflexion personnelle / point de satisfaction', type: 'textarea', required: false },
    ]),
    body: `<div class="document">
<h1>JOURNAL DE BORD DE L'APPRENANT</h1>
<p><strong>Apprenant :</strong> {{nom_apprenant}}</p>
<p><strong>Formation :</strong> {{formation}}</p>
<p><strong>Semaine :</strong> {{semaine}}</p>
<p><strong>Rédigé le :</strong> {{date_jour}}</p>
<hr/>
<h2>1. Activités réalisées cette semaine</h2>
<p>{{activites}}</p>
<h2>2. Apprentissages et découvertes</h2>
<p>{{apprentissages}}</p>
<h2>3. Difficultés rencontrées</h2>
<p>{{difficultes}}</p>
<h2>4. Solutions et démarches entreprises</h2>
<p>{{solutions}}</p>
<h2>5. Objectifs pour la semaine prochaine</h2>
<p>{{objectifs_suivants}}</p>
<h2>6. Réflexion personnelle</h2>
<p>{{reflexion}}</p>
<br/>
<p>Signature de l'apprenant : ___________________________</p>
<p>Visa du tuteur / formateur : ___________________________</p>
</div>`,
    popularity: 35,
  },

  // ── 12. Plan de cours / séquence pédagogique ──────────────────────
  {
    code: 'form_plan_cours',
    name: 'Plan de cours / séquence pédagogique',
    category: 'academique',
    price: 300, priceMax: 500,
    description: 'Modèle de plan de cours structuré : compétences visées, déroulement séance par séance, méthodes, ressources et évaluation.',
    fieldsJson: F([
      { key: 'intitule_cours', label: 'Intitulé du cours / de la séquence', type: 'text', required: true },
      { key: 'enseignant', label: 'Nom de l\'enseignant / formateur', type: 'text', required: true },
      { key: 'public', label: 'Public visé (classe, niveau, effectif)', type: 'text', required: true },
      { key: 'duree_totale', label: 'Durée totale et nombre de séances', type: 'text', required: true },
      { key: 'competences', label: 'Compétences / objectifs visés', type: 'textarea', required: true },
      { key: 'prerequis', label: 'Prérequis des apprenants', type: 'textarea', required: false },
      { key: 'deroulement', label: 'Déroulement séquence par séance (n°, durée, contenu, activités)', type: 'textarea', required: true },
      { key: 'ressources', label: 'Ressources et supports pédagogiques', type: 'textarea', required: true },
      { key: 'evaluation', label: 'Modalités d\'évaluation', type: 'textarea', required: true },
      { key: 'differenciaton', label: 'Différenciation pédagogique (si applicable)', type: 'textarea', required: false },
    ]),
    body: `<div class="document">
<h1>PLAN DE COURS — SÉQUENCE PÉDAGOGIQUE</h1>
<p><strong>Cours :</strong> {{intitule_cours}}</p>
<p><strong>Enseignant :</strong> {{enseignant}}</p>
<p><strong>Public :</strong> {{public}}</p>
<p><strong>Durée / Séances :</strong> {{duree_totale}}</p>
<p><strong>Date :</strong> {{date_jour}}</p>
<hr/>
<h2>1. Compétences et objectifs visés</h2>
<p>{{competences}}</p>
<h2>2. Prérequis</h2>
<p>{{prerequis}}</p>
<h2>3. Déroulement de la séquence</h2>
<p>{{deroulement}}</p>
<h2>4. Ressources et supports</h2>
<p>{{ressources}}</p>
<h2>5. Évaluation</h2>
<p>{{evaluation}}</p>
<h2>6. Différenciation pédagogique</h2>
<p>{{differenciaton}}</p>
<br/>
<p><em>Plan établi le {{date_jour}} — {{enseignant}}</em></p>
</div>`,
    popularity: 40,
  },

  // ── 13. Fiche d'activité pédagogique ──────────────────────────────
  {
    code: 'form_fiche_activite_pedagogique',
    name: 'Fiche d\'activité pédagogique',
    category: 'academique',
    price: 200, priceMax: 400,
    description: 'Fiche décrivant une activité pédagogique précise : objectifs, déroulement, matériel, consignes et critères de réussite.',
    fieldsJson: F([
      { key: 'titre_activite', label: 'Titre de l\'activité', type: 'text', required: true },
      { key: 'enseignant', label: 'Enseignant / formateur', type: 'text', required: true },
      { key: 'niveau', label: 'Niveau et public cible', type: 'text', required: true },
      { key: 'duree', label: 'Durée de l\'activité', type: 'text', required: true },
      { key: 'objectifs', label: 'Objectifs pédagogiques', type: 'textarea', required: true },
      { key: 'materiel', label: 'Matériel nécessaire', type: 'textarea', required: false },
      { key: 'deroulement', label: 'Déroulement étape par étape', type: 'textarea', required: true },
      { key: 'consignes', label: 'Consignes données aux apprenants', type: 'textarea', required: true },
      { key: 'criteres_reussite', label: 'Critères de réussite / indicateurs de succès', type: 'textarea', required: true },
      { key: 'modalite_correction', label: 'Modalité de correction / mise en commun', type: 'textarea', required: false },
    ]),
    body: `<div class="document">
<h1>FICHE D'ACTIVITÉ PÉDAGOGIQUE</h1>
<p><strong>Activité :</strong> {{titre_activite}}</p>
<p><strong>Enseignant :</strong> {{enseignant}}</p>
<p><strong>Niveau / Public :</strong> {{niveau}}</p>
<p><strong>Durée :</strong> {{duree}}</p>
<p><strong>Date :</strong> {{date_jour}}</p>
<hr/>
<h2>Objectifs pédagogiques</h2>
<p>À l'issue de cette activité, l'apprenant sera capable de :</p>
<p>{{objectifs}}</p>
<h2>Matériel nécessaire</h2>
<p>{{materiel}}</p>
<h2>Déroulement</h2>
<p>{{deroulement}}</p>
<h2>Consignes aux apprenants</h2>
<p>{{consignes}}</p>
<h2>Critères de réussite</h2>
<p>{{criteres_reussite}}</p>
<h2>Correction / Mise en commun</h2>
<p>{{modalite_correction}}</p>
</div>`,
    popularity: 33,
  },

  // ── 14. Cahier de textes enseignant ───────────────────────────────
  {
    code: 'form_cahier_textes_enseignant',
    name: 'Cahier de textes enseignant',
    category: 'academique',
    price: 200, priceMax: 300,
    description: 'Cahier de textes hebdomadaire de l\'enseignant : récapitulatif des séances, contenus, travaux donnés et observations.',
    fieldsJson: F([
      { key: 'enseignant', label: 'Nom de l\'enseignant', type: 'text', required: true },
      { key: 'matiere', label: 'Matière / discipline enseignée', type: 'text', required: true },
      { key: 'classe', label: 'Classe(s) / groupe(s)', type: 'text', required: true },
      { key: 'semaine', label: 'Semaine (du … au …)', type: 'text', required: true },
      { key: 'seances', label: 'Récapitulatif des séances (date, heure, contenu traité)', type: 'textarea', required: true },
      { key: 'travaux_donnes', label: 'Travaux / devoirs donnés aux apprenants', type: 'textarea', required: false },
      { key: 'observations', label: 'Observations générales (absences, incidents, points positifs)', type: 'textarea', required: false },
      { key: 'previsions', label: 'Prévisionnels pour la semaine suivante', type: 'textarea', required: false },
    ]),
    body: `<div class="document">
<h1>CAHIER DE TEXTES ENSEIGNANT</h1>
<p><strong>Enseignant :</strong> {{enseignant}}</p>
<p><strong>Matière :</strong> {{matiere}}</p>
<p><strong>Classe(s) :</strong> {{classe}}</p>
<p><strong>Semaine :</strong> {{semaine}}</p>
<hr/>
<h2>Récapitulatif des séances</h2>
<p>{{seances}}</p>
<h2>Travaux et devoirs donnés</h2>
<p>{{travaux_donnes}}</p>
<h2>Observations</h2>
<p>{{observations}}</p>
<h2>Prévisionnels — Semaine suivante</h2>
<p>{{previsions}}</p>
<br/>
<p>Visa du responsable pédagogique : ___________________________</p>
<p><em>Établi le {{date_jour}} par {{enseignant}}</em></p>
</div>`,
    popularity: 30,
  },

  // ── 15. Bulletin scolaire / relevé de notes ────────────────────────
  {
    code: 'form_bulletin_scolaire',
    name: 'Bulletin scolaire / relevé de notes',
    category: 'academique',
    price: 300, priceMax: 500,
    description: 'Bulletin de notes trimestriel ou semestriel avec matières, notes, moyennes, appréciations et visa du directeur.',
    fieldsJson: F([
      { key: 'etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
      { key: 'annee_scolaire', label: 'Année scolaire', type: 'text', required: true },
      { key: 'periode', label: 'Période (1er trimestre / 2e semestre…)', type: 'text', required: true },
      { key: 'nom_eleve', label: 'Nom et prénom de l\'élève', type: 'text', required: true },
      { key: 'classe', label: 'Classe / niveau', type: 'text', required: true },
      { key: 'effectif', label: 'Effectif de la classe', type: 'text', required: false },
      { key: 'notes_matieres', label: 'Notes par matière (matière, note/20, coeff, appréciation)', type: 'textarea', required: true },
      { key: 'moyenne_generale', label: 'Moyenne générale de l\'élève', type: 'text', required: true },
      { key: 'rang', label: 'Rang dans la classe', type: 'text', required: false },
      { key: 'appreciation_conseil', label: 'Appréciation du conseil de classe', type: 'textarea', required: true },
      { key: 'decision', label: 'Décision (passage, redoublement, mention…)', type: 'text', required: false },
    ]),
    body: `<div class="document">
<h1>BULLETIN SCOLAIRE</h1>
<p><strong>Établissement :</strong> {{etablissement}}</p>
<p><strong>Année scolaire :</strong> {{annee_scolaire}}</p>
<p><strong>Période :</strong> {{periode}}</p>
<p><strong>Élève :</strong> {{nom_eleve}}</p>
<p><strong>Classe :</strong> {{classe}}   |   <strong>Effectif :</strong> {{effectif}}   |   <strong>Rang :</strong> {{rang}}</p>
<hr/>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
<thead>
<tr style="background:#f0f0f0;">
  <th>Matière</th>
  <th>Note /20</th>
  <th>Coeff.</th>
  <th>Appréciation du professeur</th>
</tr>
</thead>
<tbody>
<tr><td colspan="4" style="white-space:pre-wrap;">{{notes_matieres}}</td></tr>
</tbody>
</table>
<br/>
<p><strong>Moyenne générale :</strong> {{moyenne_generale}} /20</p>
<h2>Appréciation du conseil de classe</h2>
<p>{{appreciation_conseil}}</p>
<p><strong>Décision :</strong> {{decision}}</p>
<br/>
<p>Le Directeur : ___________________________</p>
<p><em>{{etablissement}} — {{date_jour}}</em></p>
</div>`,
    popularity: 55,
  },

  // ── 16. Convocation à un examen ────────────────────────────────────
  {
    code: 'form_convocation_examen',
    name: 'Convocation à un examen',
    category: 'academique',
    price: 200, priceMax: 300,
    description: 'Convocation officielle adressée à un candidat pour le convoquer à un examen ou une épreuve de certification.',
    fieldsJson: F([
      { key: 'etablissement', label: 'Établissement / organisme organisateur', type: 'text', required: true },
      { key: 'nom_candidat', label: 'Nom et prénom du candidat', type: 'text', required: true },
      { key: 'numero_candidat', label: 'Numéro de candidat', type: 'text', required: true },
      { key: 'intitule_examen', label: 'Intitulé de l\'examen / certification', type: 'text', required: true },
      { key: 'date_examen', label: 'Date de l\'examen', type: 'text', required: true },
      { key: 'heure', label: 'Heure de convocation', type: 'text', required: true },
      { key: 'lieu', label: 'Lieu (salle, adresse)', type: 'text', required: true },
      { key: 'pieces_a_apporter', label: 'Pièces à apporter (CNI, convocation, matériel…)', type: 'textarea', required: true },
      { key: 'contact', label: 'Contact en cas de problème', type: 'text', required: false },
    ]),
    body: `<div class="document">
<p style="text-align:right;">{{etablissement}}</p>
<p style="text-align:right;">Le {{date_jour}}</p>
<br/>
<p>À l'attention de : <strong>{{nom_candidat}}</strong></p>
<br/>
<h1 style="text-align:center;">CONVOCATION À L'EXAMEN</h1>
<hr/>
<p>Madame, Monsieur <strong>{{nom_candidat}}</strong>,</p>
<p>Numéro de candidat : <strong>{{numero_candidat}}</strong></p>
<p>Vous êtes convoqué(e) pour passer l'examen :</p>
<h2 style="text-align:center;">{{intitule_examen}}</h2>
<p><strong>Date :</strong> {{date_examen}}</p>
<p><strong>Heure de convocation :</strong> {{heure}} (aucune entrée ne sera autorisée après le début de l'épreuve)</p>
<p><strong>Lieu :</strong> {{lieu}}</p>
<h2>Pièces à apporter obligatoirement</h2>
<p>{{pieces_a_apporter}}</p>
<p>Toute absence non justifiée entraîne l'élimination définitive de l'épreuve.</p>
<p>Pour toute question : {{contact}}</p>
<br/>
<p>Veuillez agréer, Madame, Monsieur, nos salutations distinguées.</p>
<br/>
<p>Le service des examens — {{etablissement}}</p>
</div>`,
    popularity: 48,
  },

  // ── 17. PV de jury d'examen ────────────────────────────────────────
  {
    code: 'form_pv_jury_examen',
    name: 'PV de jury d\'examen',
    category: 'academique',
    price: 400, priceMax: 600,
    description: 'Procès-verbal officiel de jury d\'examen : composition du jury, résultats des candidats, délibérations et décisions prises.',
    fieldsJson: F([
      { key: 'etablissement', label: 'Établissement organisateur', type: 'text', required: true },
      { key: 'intitule_examen', label: 'Intitulé de l\'examen / session', type: 'text', required: true },
      { key: 'date_jury', label: 'Date de la délibération du jury', type: 'text', required: true },
      { key: 'lieu_jury', label: 'Lieu de délibération', type: 'text', required: true },
      { key: 'composition_jury', label: 'Composition du jury (noms, fonctions)', type: 'textarea', required: true },
      { key: 'president_jury', label: 'Président du jury', type: 'text', required: true },
      { key: 'nombre_inscrits', label: 'Nombre de candidats inscrits', type: 'text', required: true },
      { key: 'nombre_presents', label: 'Nombre de candidats présents', type: 'text', required: true },
      { key: 'resultats', label: 'Résultats par candidat (nom, note, décision)', type: 'textarea', required: true },
      { key: 'statistiques', label: 'Statistiques (admis, refusés, taux de réussite)', type: 'textarea', required: true },
      { key: 'observations', label: 'Observations et délibérations particulières', type: 'textarea', required: false },
    ]),
    body: `<div class="document">
<h1>PROCÈS-VERBAL DE JURY D'EXAMEN</h1>
<p><strong>Établissement :</strong> {{etablissement}}</p>
<p><strong>Examen :</strong> {{intitule_examen}}</p>
<p><strong>Date de délibération :</strong> {{date_jury}}</p>
<p><strong>Lieu :</strong> {{lieu_jury}}</p>
<hr/>
<h2>1. Composition du jury</h2>
<p>{{composition_jury}}</p>
<p><strong>Président du jury :</strong> {{president_jury}}</p>
<h2>2. Statistiques de participation</h2>
<p>Candidats inscrits : <strong>{{nombre_inscrits}}</strong></p>
<p>Candidats présents : <strong>{{nombre_presents}}</strong></p>
<h2>3. Résultats des candidats</h2>
<p>{{resultats}}</p>
<h2>4. Bilan de la session</h2>
<p>{{statistiques}}</p>
<h2>5. Observations du jury</h2>
<p>{{observations}}</p>
<h2>Signatures des membres du jury</h2>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
<tr><th>Nom</th><th>Fonction</th><th>Signature</th></tr>
<tr><td>{{president_jury}}</td><td>Président</td><td style="height:40px;"></td></tr>
<tr><td></td><td>Membre</td><td style="height:40px;"></td></tr>
<tr><td></td><td>Membre</td><td style="height:40px;"></td></tr>
</table>
<p><em>PV établi le {{date_jour}} — {{etablissement}}</em></p>
</div>`,
    popularity: 38,
  },

  // ── 18. Diplôme / certificat de fin de formation ───────────────────
  {
    code: 'form_diplome_formation',
    name: 'Diplôme / certificat de fin de formation',
    category: 'academique',
    price: 400, priceMax: 600,
    description: 'Structure de diplôme ou certificat de fin de formation délivré par un organisme de formation à un lauréat.',
    fieldsJson: F([
      { key: 'organisme', label: 'Organisme de formation / établissement', type: 'text', required: true },
      { key: 'numero_diplome', label: 'Numéro de diplôme', type: 'text', required: true },
      { key: 'nom_laureat', label: 'Nom et prénom du lauréat', type: 'text', required: true },
      { key: 'date_naissance', label: 'Date et lieu de naissance', type: 'text', required: false },
      { key: 'intitule_diplome', label: 'Intitulé du diplôme / de la formation', type: 'text', required: true },
      { key: 'specialite', label: 'Spécialité / option', type: 'text', required: false },
      { key: 'duree_formation', label: 'Durée de la formation', type: 'text', required: true },
      { key: 'mention', label: 'Mention obtenue', type: 'select', options: ['Passable', 'Assez bien', 'Bien', 'Très bien', 'Excellent'], required: false },
      { key: 'date_obtention', label: 'Date d\'obtention', type: 'text', required: true },
      { key: 'directeur', label: 'Directeur général / pédagogique', type: 'text', required: true },
    ]),
    body: `<div class="document" style="text-align:center;border:4px double #2c3e50;padding:40px;">
<p style="font-size:0.9em;text-transform:uppercase;letter-spacing:2px;">{{organisme}}</p>
<h1 style="font-size:2em;margin:20px 0;">DIPLÔME DE FIN DE FORMATION</h1>
<p>N° {{numero_diplome}}</p>
<br/>
<p>Est décerné à</p>
<h2 style="font-size:1.8em;border-bottom:2px solid #2c3e50;display:inline-block;padding:0 20px;">{{nom_laureat}}</h2>
<p>Né(e) le : {{date_naissance}}</p>
<br/>
<p>Pour avoir suivi avec succès la formation</p>
<h3>«{{intitule_diplome}}»</h3>
<p>Spécialité : {{specialite}}</p>
<p>Durée : {{duree_formation}}</p>
<p>Mention : <strong>{{mention}}</strong></p>
<br/>
<p>Délivré le {{date_obtention}}</p>
<br/>
<table style="width:80%;margin:auto;">
<tr>
<td style="text-align:center;"><p>Le Directeur</p><p>{{directeur}}</p><p>_______________</p></td>
<td style="text-align:center;"><p>Cachet officiel</p><p>[SCEAU]</p></td>
</tr>
</table>
</div>`,
    popularity: 62,
  },

  // ── 19. Règlement intérieur établissement scolaire ─────────────────
  {
    code: 'form_reglement_interieur_ecole',
    name: 'Règlement intérieur établissement scolaire',
    category: 'academique',
    price: 500, priceMax: 700,
    description: 'Règlement intérieur complet d\'un établissement scolaire ou de formation : droits et obligations des apprenants, discipline, sanctions et vie de l\'établissement.',
    fieldsJson: F([
      { key: 'etablissement', label: 'Nom de l\'établissement', type: 'text', required: true },
      { key: 'annee_scolaire', label: 'Année scolaire / de validité', type: 'text', required: true },
      { key: 'directeur', label: 'Nom du directeur', type: 'text', required: true },
      { key: 'horaires', label: 'Horaires d\'ouverture et d\'enseignement', type: 'textarea', required: true },
      { key: 'droits_apprenants', label: 'Droits des apprenants', type: 'textarea', required: true },
      { key: 'obligations_apprenants', label: 'Obligations et devoirs des apprenants', type: 'textarea', required: true },
      { key: 'regles_presence', label: 'Règles de présence et d\'assiduité', type: 'textarea', required: true },
      { key: 'tenue_vestimentaire', label: 'Règles de tenue vestimentaire', type: 'textarea', required: false },
      { key: 'sanctions', label: 'Sanctions disciplinaires et procédures', type: 'textarea', required: true },
      { key: 'securite', label: 'Règles de sécurité et d\'hygiène', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>RÈGLEMENT INTÉRIEUR</h1>
<h2 style="text-align:center;">{{etablissement}}</h2>
<p style="text-align:center;">Année {{annee_scolaire}}</p>
<hr/>
<p>Le présent règlement intérieur définit les droits et les devoirs de tous les membres de la communauté éducative de {{etablissement}}. Son respect est obligatoire.</p>
<h2>Article 1 — Horaires</h2>
<p>{{horaires}}</p>
<h2>Article 2 — Assiduité et présence</h2>
<p>{{regles_presence}}</p>
<h2>Article 3 — Droits des apprenants</h2>
<p>{{droits_apprenants}}</p>
<h2>Article 4 — Obligations et devoirs</h2>
<p>{{obligations_apprenants}}</p>
<h2>Article 5 — Tenue vestimentaire</h2>
<p>{{tenue_vestimentaire}}</p>
<h2>Article 6 — Sécurité et hygiène</h2>
<p>{{securite}}</p>
<h2>Article 7 — Discipline et sanctions</h2>
<p>{{sanctions}}</p>
<h2>Article 8 — Entrée en vigueur</h2>
<p>Le présent règlement entre en vigueur à compter du {{date_jour}} et s'applique à toutes les personnes fréquentant {{etablissement}}.</p>
<br/>
<p>Lu et approuvé,</p>
<p>Le Directeur : {{directeur}}</p>
<p>Date : {{date_jour}}</p>
</div>`,
    popularity: 44,
  },

  // ── 20. Contrat de professionnalisation (alternance) ───────────────
  {
    code: 'form_contrat_apprentissage_pro',
    name: 'Contrat de professionnalisation (alternance)',
    category: 'commercial_financier',
    price: 700, priceMax: 800,
    description: 'Contrat de professionnalisation ou d\'apprentissage en alternance entre un employeur et un alternant, avec répartition temps entreprise / formation.',
    fieldsJson: F([
      { key: 'employeur', label: 'Employeur (raison sociale, adresse, représentant)', type: 'textarea', required: true },
      { key: 'alternant', label: 'Alternant (nom, prénom, date de naissance, adresse)', type: 'textarea', required: true },
      { key: 'organisme_formation', label: 'Organisme de formation (nom, adresse)', type: 'textarea', required: true },
      { key: 'intitule_formation', label: 'Intitulé de la formation / qualification visée', type: 'text', required: true },
      { key: 'duree_contrat', label: 'Durée du contrat (mois)', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début du contrat', type: 'text', required: true },
      { key: 'date_fin', label: 'Date de fin du contrat', type: 'text', required: true },
      { key: 'repartition_temps', label: 'Répartition du temps (ex : 3j entreprise / 2j formation)', type: 'text', required: true },
      { key: 'remuneration', label: 'Rémunération mensuelle brute', type: 'text', required: true },
      { key: 'tuteur_entreprise', label: 'Tuteur en entreprise', type: 'text', required: true },
      { key: 'obligations_parties', label: 'Obligations réciproques des parties', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>CONTRAT DE PROFESSIONNALISATION</h1>
<p>Entre les soussignés :</p>
<p><strong>L'employeur :</strong><br/>{{employeur}}</p>
<p><strong>L'alternant :</strong><br/>{{alternant}}</p>
<p><strong>L'organisme de formation :</strong><br/>{{organisme_formation}}</p>
<hr/>
<h2>Article 1 — Objet et qualification visée</h2>
<p>Le présent contrat de professionnalisation a pour objet l'acquisition de la qualification : <strong>{{intitule_formation}}</strong>.</p>
<h2>Article 2 — Durée et dates</h2>
<p>Durée : <strong>{{duree_contrat}} mois</strong></p>
<p>Du <strong>{{date_debut}}</strong> au <strong>{{date_fin}}</strong></p>
<h2>Article 3 — Répartition du temps</h2>
<p>{{repartition_temps}}</p>
<h2>Article 4 — Rémunération</h2>
<p>Rémunération mensuelle brute : <strong>{{remuneration}}</strong></p>
<h2>Article 5 — Tuteur en entreprise</h2>
<p>{{tuteur_entreprise}}</p>
<h2>Article 6 — Obligations des parties</h2>
<p>{{obligations_parties}}</p>
<h2>Article 7 — Rupture du contrat</h2>
<p>La rupture du contrat obéit aux règles du droit du travail en vigueur.</p>
<br/>
<p>Fait en trois exemplaires, le {{date_jour}}.</p>
<table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
<tr><th>L'employeur</th><th>L'alternant</th><th>L'organisme de formation</th></tr>
<tr><td style="height:60px;"></td><td style="height:60px;"></td><td style="height:60px;"></td></tr>
</table>
</div>`,
    popularity: 52,
  },

  // ── 21. Livret d'accueil entreprise (formation interne) ────────────
  {
    code: 'form_livret_entreprise',
    name: 'Livret d\'accueil entreprise (formation interne)',
    category: 'commercial_financier',
    price: 400, priceMax: 600,
    description: 'Livret d\'accueil remis aux nouveaux collaborateurs lors d\'une formation interne : présentation de l\'entreprise, valeurs, processus, ressources et contacts.',
    fieldsJson: F([
      { key: 'entreprise', label: 'Nom et logo de l\'entreprise', type: 'text', required: true },
      { key: 'mot_direction', label: 'Mot de bienvenue de la direction', type: 'textarea', required: true },
      { key: 'presentation', label: 'Présentation de l\'entreprise (activités, histoire, organigramme)', type: 'textarea', required: true },
      { key: 'valeurs', label: 'Valeurs et culture d\'entreprise', type: 'textarea', required: true },
      { key: 'processus_cles', label: 'Processus et procédures clés à connaître', type: 'textarea', required: true },
      { key: 'contacts_utiles', label: 'Contacts utiles (RH, IT, sécurité, direction…)', type: 'textarea', required: true },
      { key: 'programme_integration', label: 'Programme d\'intégration et de formation interne', type: 'textarea', required: true },
      { key: 'avantages', label: 'Avantages et services aux collaborateurs', type: 'textarea', required: false },
    ]),
    body: `<div class="document">
<h1>LIVRET D'ACCUEIL</h1>
<h2 style="text-align:center;">{{entreprise}}</h2>
<hr/>
<h2>Mot de bienvenue</h2>
<p>{{mot_direction}}</p>
<h2>1. Notre entreprise</h2>
<p>{{presentation}}</p>
<h2>2. Nos valeurs</h2>
<p>{{valeurs}}</p>
<h2>3. Processus et procédures à connaître</h2>
<p>{{processus_cles}}</p>
<h2>4. Programme d'intégration et de formation</h2>
<p>{{programme_integration}}</p>
<h2>5. Avantages et services</h2>
<p>{{avantages}}</p>
<h2>6. Contacts utiles</h2>
<p>{{contacts_utiles}}</p>
<br/>
<p>Bienvenue dans l'équipe ! Nous sommes heureux de vous compter parmi nous.</p>
<p><em>{{entreprise}} — Document remis le {{date_jour}}</em></p>
</div>`,
    popularity: 40,
  },

  // ── 22. Bilan de compétences professionnel ─────────────────────────
  {
    code: 'form_bilan_competences',
    name: 'Bilan de compétences professionnel',
    category: 'commercial_financier',
    price: 600, priceMax: 800,
    description: 'Document de synthèse d\'un bilan de compétences : parcours professionnel, compétences identifiées, motivations, projet et plan d\'action.',
    fieldsJson: F([
      { key: 'beneficiaire', label: 'Nom et prénom du bénéficiaire', type: 'text', required: true },
      { key: 'consultant', label: 'Consultant / prestataire du bilan', type: 'text', required: true },
      { key: 'periode', label: 'Période du bilan (du … au …)', type: 'text', required: true },
      { key: 'parcours', label: 'Parcours professionnel et formations (chronologique)', type: 'textarea', required: true },
      { key: 'competences_techniques', label: 'Compétences techniques identifiées', type: 'textarea', required: true },
      { key: 'competences_transversales', label: 'Compétences transversales et qualités personnelles', type: 'textarea', required: true },
      { key: 'motivations', label: 'Motivations, valeurs et intérêts professionnels', type: 'textarea', required: true },
      { key: 'projet_professionnel', label: 'Projet(s) professionnel(s) envisagé(s)', type: 'textarea', required: true },
      { key: 'plan_action', label: 'Plan d\'action et étapes (formation, VAE, reconversion…)', type: 'textarea', required: true },
      { key: 'synthese', label: 'Synthèse et recommandations', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>BILAN DE COMPÉTENCES — DOCUMENT DE SYNTHÈSE</h1>
<p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p>
<p><strong>Consultant :</strong> {{consultant}}</p>
<p><strong>Période du bilan :</strong> {{periode}}</p>
<p><strong>Date de la synthèse :</strong> {{date_jour}}</p>
<hr/>
<p><em>Ce document est confidentiel et destiné exclusivement au bénéficiaire.</em></p>
<h2>1. Parcours professionnel</h2>
<p>{{parcours}}</p>
<h2>2. Compétences techniques</h2>
<p>{{competences_techniques}}</p>
<h2>3. Compétences transversales et qualités</h2>
<p>{{competences_transversales}}</p>
<h2>4. Motivations et valeurs professionnelles</h2>
<p>{{motivations}}</p>
<h2>5. Projet(s) professionnel(s)</h2>
<p>{{projet_professionnel}}</p>
<h2>6. Plan d'action</h2>
<p>{{plan_action}}</p>
<h2>7. Synthèse et recommandations</h2>
<p>{{synthese}}</p>
<br/>
<p>Signature du bénéficiaire : ___________________________</p>
<p>Signature du consultant : ___________________________</p>
</div>`,
    popularity: 48,
  },

  // ── 23. Projet professionnel personnel (PPP) ───────────────────────
  {
    code: 'form_projet_professionnel',
    name: 'Projet professionnel personnel (PPP)',
    category: 'academique',
    price: 300, priceMax: 500,
    description: 'Document de formalisation du projet professionnel d\'un étudiant ou d\'un salarié en reconversion : auto-diagnostic, exploration métiers, plan d\'action.',
    fieldsJson: F([
      { key: 'nom_prenom', label: 'Nom et prénom', type: 'text', required: true },
      { key: 'formation_actuelle', label: 'Formation / situation actuelle', type: 'text', required: true },
      { key: 'auto_diagnostic', label: 'Auto-diagnostic (forces, faiblesses, centres d\'intérêt)', type: 'textarea', required: true },
      { key: 'metiers_explores', label: 'Métiers et secteurs explorés', type: 'textarea', required: true },
      { key: 'metier_cible', label: 'Métier / poste cible', type: 'text', required: true },
      { key: 'competences_a_acquerir', label: 'Compétences à acquérir pour atteindre l\'objectif', type: 'textarea', required: true },
      { key: 'plan_action', label: 'Plan d\'action (formations, stages, démarches)', type: 'textarea', required: true },
      { key: 'echeancier', label: 'Échéancier (court, moyen, long terme)', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>PROJET PROFESSIONNEL PERSONNEL (PPP)</h1>
<p><strong>Auteur :</strong> {{nom_prenom}}</p>
<p><strong>Situation actuelle :</strong> {{formation_actuelle}}</p>
<p><strong>Date :</strong> {{date_jour}}</p>
<hr/>
<h2>1. Auto-diagnostic</h2>
<p>{{auto_diagnostic}}</p>
<h2>2. Exploration professionnelle</h2>
<p>{{metiers_explores}}</p>
<h2>3. Métier / Poste cible</h2>
<p>{{metier_cible}}</p>
<h2>4. Compétences à acquérir</h2>
<p>{{competences_a_acquerir}}</p>
<h2>5. Plan d'action</h2>
<p>{{plan_action}}</p>
<h2>6. Échéancier</h2>
<p>{{echeancier}}</p>
<br/>
<p><em>Document rédigé le {{date_jour}} par {{nom_prenom}}</em></p>
</div>`,
    popularity: 35,
  },

  // ── 24. Lettre de motivation pour formation / admission ────────────
  {
    code: 'form_lettre_motivation_formation',
    name: 'Lettre de motivation pour formation / admission',
    category: 'academique',
    price: 300, priceMax: 500,
    description: 'Lettre de motivation pour postuler à une formation, une école ou un programme d\'enseignement supérieur.',
    fieldsJson: F([
      { key: 'nom_prenom', label: 'Nom et prénom du candidat', type: 'text', required: true },
      { key: 'adresse', label: 'Adresse et coordonnées', type: 'textarea', required: true },
      { key: 'etablissement_cible', label: 'Établissement / programme visé', type: 'text', required: true },
      { key: 'formation_visee', label: 'Intitulé exact de la formation / filière', type: 'text', required: true },
      { key: 'parcours', label: 'Parcours académique et expériences pertinentes', type: 'textarea', required: true },
      { key: 'motivation', label: 'Motivations profondes pour cette formation', type: 'textarea', required: true },
      { key: 'projet_professionnel', label: 'Projet professionnel post-formation', type: 'textarea', required: true },
      { key: 'atouts', label: 'Atouts et qualités personnelles', type: 'textarea', required: true },
      { key: 'reference', label: 'Référence / comment j\'ai connu ce programme', type: 'text', required: false },
    ]),
    body: `<div class="document">
<p>{{nom_prenom}}</p>
<p>{{adresse}}</p>
<br/>
<p style="text-align:right;">Le {{date_jour}}</p>
<p>À l'attention du Responsable des admissions</p>
<p><strong>{{etablissement_cible}}</strong></p>
<br/>
<p><strong>Objet : Candidature à la formation «{{formation_visee}}»</strong></p>
<br/>
<p>Madame, Monsieur,</p>
<p>Passionné(e) par {{formation_visee}}, je me permets de vous adresser ma candidature pour intégrer votre programme.</p>
<h2>Mon parcours</h2>
<p>{{parcours}}</p>
<h2>Mes motivations</h2>
<p>{{motivation}}</p>
<h2>Mon projet professionnel</h2>
<p>{{projet_professionnel}}</p>
<h2>Mes atouts</h2>
<p>{{atouts}}</p>
<p>J'ai découvert votre programme par : {{reference}}. Convaincu(e) que votre établissement saura répondre à mes ambitions, je reste disponible pour tout entretien à votre convenance.</p>
<p>Dans l'attente d'une réponse favorable, je vous adresse, Madame, Monsieur, mes sincères salutations.</p>
<br/>
<p>{{nom_prenom}}</p>
</div>`,
    popularity: 58,
  },

  // ── 25. Dossier VAE ────────────────────────────────────────────────
  {
    code: 'form_dossier_vae',
    name: 'Dossier VAE (Validation des Acquis de l\'Expérience)',
    category: 'academique',
    price: 700, priceMax: 800,
    description: 'Dossier de Validation des Acquis de l\'Expérience : présentation du parcours professionnel, description des activités, compétences démontrées et pièces justificatives.',
    fieldsJson: F([
      { key: 'candidat', label: 'Nom, prénom et coordonnées du candidat', type: 'textarea', required: true },
      { key: 'diplome_vise', label: 'Diplôme / certification visé(e)', type: 'text', required: true },
      { key: 'etablissement', label: 'Établissement valideur', type: 'text', required: true },
      { key: 'resume_parcours', label: 'Résumé du parcours professionnel (chronologique)', type: 'textarea', required: true },
      { key: 'activites_principales', label: 'Description détaillée des activités principales', type: 'textarea', required: true },
      { key: 'competences_demonstrees', label: 'Compétences démontrées en lien avec le référentiel', type: 'textarea', required: true },
      { key: 'situations_professionnelles', label: 'Exemples de situations professionnelles significatives', type: 'textarea', required: true },
      { key: 'pieces_justificatives', label: 'Pièces justificatives jointes (liste)', type: 'textarea', required: true },
      { key: 'accompagnateur', label: 'Nom de l\'accompagnateur VAE', type: 'text', required: false },
    ]),
    body: `<div class="document">
<h1>DOSSIER DE VALIDATION DES ACQUIS DE L'EXPÉRIENCE (VAE)</h1>
<p><strong>Candidat :</strong> {{candidat}}</p>
<p><strong>Diplôme / Certification visé(e) :</strong> {{diplome_vise}}</p>
<p><strong>Établissement valideur :</strong> {{etablissement}}</p>
<p><strong>Date de dépôt :</strong> {{date_jour}}</p>
<p><strong>Accompagnateur :</strong> {{accompagnateur}}</p>
<hr/>
<h2>1. Présentation du parcours professionnel</h2>
<p>{{resume_parcours}}</p>
<h2>2. Description des activités principales</h2>
<p>{{activites_principales}}</p>
<h2>3. Compétences démontrées</h2>
<p>En lien avec le référentiel du diplôme {{diplome_vise}} :</p>
<p>{{competences_demonstrees}}</p>
<h2>4. Situations professionnelles significatives</h2>
<p>{{situations_professionnelles}}</p>
<h2>5. Pièces justificatives jointes</h2>
<p>{{pieces_justificatives}}</p>
<h2>6. Engagement du candidat</h2>
<p>Je soussigné(e), {{candidat}}, certifie l'exactitude des informations figurant dans ce dossier.</p>
<br/>
<p>Signature : ___________________________</p>
<p>Date : {{date_jour}}</p>
</div>`,
    popularity: 42,
  },

  // ── 26. Demande de financement formation (CPF/FAF) ─────────────────
  {
    code: 'form_accord_financement_cpf',
    name: 'Demande de financement formation (CPF/FAF)',
    category: 'commercial_financier',
    price: 400, priceMax: 600,
    description: 'Demande de prise en charge financière d\'une formation auprès d\'un fonds de formation (équivalent CPF, FDFP, FAF) pour un salarié ou un travailleur indépendant.',
    fieldsJson: F([
      { key: 'demandeur', label: 'Nom et prénom du demandeur', type: 'text', required: true },
      { key: 'employeur', label: 'Employeur (nom, adresse) — si applicable', type: 'text', required: false },
      { key: 'organisme_financeur', label: 'Organisme financeur sollicité (FDFP, FAF, OPCO…)', type: 'text', required: true },
      { key: 'intitule_formation', label: 'Intitulé de la formation sollicitée', type: 'text', required: true },
      { key: 'organisme_formation', label: 'Organisme de formation prestataire', type: 'text', required: true },
      { key: 'duree', label: 'Durée de la formation (heures / jours)', type: 'text', required: true },
      { key: 'dates', label: 'Dates de la formation', type: 'text', required: true },
      { key: 'cout_total', label: 'Coût total de la formation (FCFA)', type: 'text', required: true },
      { key: 'montant_demande', label: 'Montant de la prise en charge demandée (FCFA)', type: 'text', required: true },
      { key: 'justification', label: 'Justification / motivation de la demande', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<p><strong>{{demandeur}}</strong><br/>{{employeur}}</p>
<p style="text-align:right;">Le {{date_jour}}</p>
<p>À l'attention de :<br/><strong>{{organisme_financeur}}</strong></p>
<br/>
<h1>DEMANDE DE FINANCEMENT DE FORMATION</h1>
<hr/>
<p>Madame, Monsieur,</p>
<p>Je soussigné(e), <strong>{{demandeur}}</strong>, sollicite par la présente la prise en charge financière de la formation suivante :</p>
<h2>Détails de la formation</h2>
<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">
<tr><td><strong>Intitulé</strong></td><td>{{intitule_formation}}</td></tr>
<tr><td><strong>Organisme prestataire</strong></td><td>{{organisme_formation}}</td></tr>
<tr><td><strong>Durée</strong></td><td>{{duree}}</td></tr>
<tr><td><strong>Dates</strong></td><td>{{dates}}</td></tr>
<tr><td><strong>Coût total</strong></td><td>{{cout_total}} FCFA</td></tr>
<tr><td><strong>Montant demandé</strong></td><td>{{montant_demande}} FCFA</td></tr>
</table>
<h2>Justification de la demande</h2>
<p>{{justification}}</p>
<p>Je joins à cette demande les documents requis (devis, programme, attestations). Dans l'attente d'une réponse favorable, je vous adresse mes sincères salutations.</p>
<br/>
<p>{{demandeur}}</p>
<p>Signature : ___________________________</p>
</div>`,
    popularity: 50,
  },

  // ── 27. Rapport de tutorat / mentorat ─────────────────────────────
  {
    code: 'form_rapport_tutorat',
    name: 'Rapport de tutorat / mentorat',
    category: 'academique',
    price: 300, priceMax: 500,
    description: 'Rapport périodique rédigé par le tuteur ou mentor pour suivre la progression d\'un apprenant ou alternant : activités, compétences, difficultés et plan d\'action.',
    fieldsJson: F([
      { key: 'tuteur', label: 'Nom et prénom du tuteur / mentor', type: 'text', required: true },
      { key: 'apprenant', label: 'Nom et prénom de l\'apprenant / mentoré', type: 'text', required: true },
      { key: 'periode', label: 'Période couverte par le rapport', type: 'text', required: true },
      { key: 'contexte', label: 'Contexte (stage, alternance, formation interne…)', type: 'text', required: true },
      { key: 'activites_realisees', label: 'Activités et missions réalisées sur la période', type: 'textarea', required: true },
      { key: 'competences_progressions', label: 'Compétences développées et progrès observés', type: 'textarea', required: true },
      { key: 'difficultes', label: 'Difficultés rencontrées', type: 'textarea', required: false },
      { key: 'points_amelioration', label: 'Points d\'amélioration recommandés', type: 'textarea', required: true },
      { key: 'plan_action', label: 'Plan d\'action pour la période suivante', type: 'textarea', required: true },
      { key: 'evaluation_globale', label: 'Évaluation globale et appréciation générale', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>RAPPORT DE TUTORAT / MENTORAT</h1>
<p><strong>Tuteur / Mentor :</strong> {{tuteur}}</p>
<p><strong>Apprenant / Mentoré :</strong> {{apprenant}}</p>
<p><strong>Période :</strong> {{periode}}</p>
<p><strong>Contexte :</strong> {{contexte}}</p>
<p><strong>Date du rapport :</strong> {{date_jour}}</p>
<hr/>
<h2>1. Activités et missions réalisées</h2>
<p>{{activites_realisees}}</p>
<h2>2. Compétences développées et progrès</h2>
<p>{{competences_progressions}}</p>
<h2>3. Difficultés rencontrées</h2>
<p>{{difficultes}}</p>
<h2>4. Points d'amélioration</h2>
<p>{{points_amelioration}}</p>
<h2>5. Plan d'action — Période suivante</h2>
<p>{{plan_action}}</p>
<h2>6. Appréciation générale</h2>
<p>{{evaluation_globale}}</p>
<br/>
<p>Signature du tuteur : ___________________________</p>
<p>Visa de l'apprenant : ___________________________</p>
<p><em>Rapport établi le {{date_jour}} par {{tuteur}}</em></p>
</div>`,
    popularity: 36,
  },

  // ── 28. Fiche de carte mentale / mind map documentée ──────────────
  {
    code: 'form_carte_mentale',
    name: 'Fiche de carte mentale / mind map documentée',
    category: 'academique',
    price: 200, priceMax: 400,
    description: 'Fiche structurée accompagnant une carte mentale ou mind map : thème central, branches principales, sous-idées, sources et usage pédagogique.',
    fieldsJson: F([
      { key: 'auteur', label: 'Auteur / apprenant', type: 'text', required: true },
      { key: 'theme_central', label: 'Thème central de la carte mentale', type: 'text', required: true },
      { key: 'contexte_usage', label: 'Contexte d\'utilisation (cours, révisions, projet…)', type: 'text', required: true },
      { key: 'branches_principales', label: 'Branches principales (une par ligne)', type: 'textarea', required: true },
      { key: 'sous_idees', label: 'Sous-idées et développements par branche', type: 'textarea', required: true },
      { key: 'mots_cles', label: 'Mots-clés et notions essentielles à retenir', type: 'textarea', required: true },
      { key: 'sources', label: 'Sources et références utilisées', type: 'textarea', required: false },
      { key: 'questions_ouvertes', label: 'Questions ouvertes / points à approfondir', type: 'textarea', required: false },
      { key: 'synthese', label: 'Synthèse et conclusion en 3-5 lignes', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>FICHE — CARTE MENTALE (MIND MAP)</h1>
<p><strong>Auteur :</strong> {{auteur}}</p>
<p><strong>Thème central :</strong> {{theme_central}}</p>
<p><strong>Contexte :</strong> {{contexte_usage}}</p>
<p><strong>Date :</strong> {{date_jour}}</p>
<hr/>
<h2>Structure de la carte mentale</h2>
<div style="text-align:center;background:#f9f9f9;padding:20px;border-radius:8px;margin:10px 0;">
<p style="font-size:1.3em;font-weight:bold;border:2px solid #333;display:inline-block;padding:10px 20px;border-radius:50%;">{{theme_central}}</p>
</div>
<h2>Branches principales</h2>
<p>{{branches_principales}}</p>
<h2>Développements et sous-idées</h2>
<p>{{sous_idees}}</p>
<h2>Mots-clés essentiels</h2>
<p>{{mots_cles}}</p>
<h2>Sources et références</h2>
<p>{{sources}}</p>
<h2>Questions ouvertes / À approfondir</h2>
<p>{{questions_ouvertes}}</p>
<h2>Synthèse</h2>
<p>{{synthese}}</p>
<br/>
<p><em>Fiche rédigée le {{date_jour}} par {{auteur}}</em></p>
</div>`,
    popularity: 30,
  },
];

async function main() {
  let created = 0;
  let updated = 0;
  const byCategory: Record<string, number> = {};

  for (const t of templates) {
    const data = {
      code: t.code,
      name: t.name,
      category: t.category,
      description: t.description,
      price: t.price,
      priceMax: t.priceMax,
      fieldsJson: t.fieldsJson,
      body: t.body,
      popularity: t.popularity,
    };
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: data, create: data });
    if (existing) updated += 1; else created += 1;
    byCategory[t.category] = (byCategory[t.category] ?? 0) + 1;
  }

  const total = await prisma.documentTemplate.count();

  console.log('✅ Seed Formation & Éducation terminé.');
  console.log(`   Templates du script : ${templates.length} (créés : ${created}, mis à jour : ${updated})`);
  console.log('   Répartition par catégorie (ce script) :');
  for (const [cat, n] of Object.entries(byCategory)) console.log(`     - ${cat} : ${n}`);
  console.log(`   ➜ Total de templates en base : ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
