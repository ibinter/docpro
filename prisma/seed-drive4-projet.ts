// Seed « Gestion de Projet (suite) & Environnement » IBIG DocPro — Agent Drive4-10/10.
// Templates proj2_* et env_* — complémentaires aux codes déjà en base :
// proj_cahier_charges, proj_charte_projet, proj_cr_reunion, proj_pv_copil,
// proj_pv_reception_livrables, projet_etude
// Sources Drive : Plan Projet.docx, Plan Assurance Qualité Projet.docx,
//   Support Comité Projet.pptx, Suivi Budget - Analyse de la Valeur Acquise.xlsx
// Exécution : npx tsx prisma/seed-drive4-projet.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const COUNTRIES = JSON.stringify(['CI','SN','CM','BJ','TG','BF','ML','GN','CD','CG','GA','NE','TD','MR']);

const F = (fields: object[]) => JSON.stringify(fields);

const templates = [
  // ════════════════════════ PROJ2 — GESTION DE PROJET (suite) ════════════════════════
  {
    code: 'proj2_plan_communication',
    name: 'Plan de communication projet',
    category: 'commercial_financier',
    description: 'Planifier et structurer l\'ensemble des communications internes et externes autour d\'un projet : cibles, messages, canaux, fréquences et responsables.',
    price: 3000,
    priceMax: 6000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'code_projet', label: 'Code / référence projet', type: 'text', required: false },
      { key: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { key: 'organisation', label: 'Organisation / Entreprise', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin prévue', type: 'date', required: true },
      { key: 'objectifs_projet', label: 'Objectifs principaux du projet', type: 'textarea', required: true },
      { key: 'parties_prenantes', label: 'Principales parties prenantes (liste)', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>PLAN DE COMMUNICATION — {{nom_projet}}</h1>
<table class="info-table">
  <tr><th>Code projet</th><td>{{code_projet}}</td><th>Chef de projet</th><td>{{chef_projet}}</td></tr>
  <tr><th>Organisation</th><td>{{organisation}}</td><th>Période</th><td>{{date_debut}} – {{date_fin}}</td></tr>
</table>

<h2>1. Contexte et objectifs du projet</h2>
<p>{{objectifs_projet}}</p>

<h2>2. Parties prenantes</h2>
<p>{{parties_prenantes}}</p>

<h2>3. Matrice de communication</h2>
<table class="data-table">
  <thead><tr><th>Cible</th><th>Message clé</th><th>Canal</th><th>Fréquence</th><th>Responsable</th><th>Support</th></tr></thead>
  <tbody>
    <tr><td>Comité de pilotage</td><td>Avancement, budget, risques</td><td>Réunion COPIL</td><td>Mensuelle</td><td>{{chef_projet}}</td><td>Présentation PowerPoint</td></tr>
    <tr><td>Équipe projet</td><td>Tâches, planning, obstacles</td><td>Réunion hebdo</td><td>Hebdomadaire</td><td>{{chef_projet}}</td><td>Compte-rendu</td></tr>
    <tr><td>Direction générale</td><td>Synthèse stratégique</td><td>Rapport mensuel</td><td>Mensuelle</td><td>{{chef_projet}}</td><td>Rapport d'avancement</td></tr>
    <tr><td>Utilisateurs finaux</td><td>Impact, planning déploiement</td><td>E-mail / Intranet</td><td>Trimestrielle</td><td>Responsable comm.</td><td>Note d'information</td></tr>
    <tr><td>Fournisseurs / Prestataires</td><td>Exigences, planning, livrables</td><td>Réunion bilatérale</td><td>À la demande</td><td>{{chef_projet}}</td><td>Cahier des charges</td></tr>
  </tbody>
</table>

<h2>4. Procédures de communication</h2>
<h3>4.1 Communication interne</h3>
<p>Toutes les communications internes au projet seront consignées dans le registre de communication. Les comptes-rendus de réunion seront diffusés dans les 48 heures suivant chaque réunion.</p>

<h3>4.2 Communication externe</h3>
<p>Les communications vers les parties externes (clients, partenaires, presse) sont soumises à validation préalable du chef de projet et de la direction.</p>

<h2>5. Outils et supports utilisés</h2>
<ul>
  <li>Messagerie électronique (e-mail)</li>
  <li>Plateforme de gestion de projet (outil interne)</li>
  <li>Réunions en présentiel et/ou visioconférence</li>
  <li>Tableaux de bord partagés</li>
  <li>Rapports d'avancement (hebdomadaires / mensuels)</li>
</ul>

<h2>6. Gestion des escalades</h2>
<p>Tout point bloquant non résolu dans les 48 h au niveau opérationnel est remonté au chef de projet. Si non résolu dans les 72 h suivantes, il est escaladé au comité de pilotage.</p>

<p class="footer">Plan de communication établi par : {{chef_projet}} — {{organisation}} — Date : {{date_jour}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 45,
  },

  {
    code: 'proj2_matrice_raci',
    name: 'Matrice RACI – Répartition des responsabilités',
    category: 'commercial_financier',
    description: 'Définir clairement les rôles et responsabilités de chaque intervenant sur les tâches et livrables du projet (Responsible, Accountable, Consulted, Informed).',
    price: 2500,
    priceMax: 5000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { key: 'organisation', label: 'Organisation', type: 'text', required: true },
      { key: 'version', label: 'Version du document', type: 'text', required: false },
      { key: 'date_document', label: 'Date du document', type: 'date', required: true },
      { key: 'intervenants', label: 'Liste des intervenants / fonctions (séparés par des virgules)', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>MATRICE RACI — {{nom_projet}}</h1>
<table class="info-table">
  <tr><th>Organisation</th><td>{{organisation}}</td><th>Chef de projet</th><td>{{chef_projet}}</td></tr>
  <tr><th>Version</th><td>{{version}}</td><th>Date</th><td>{{date_document}}</td></tr>
</table>

<h2>1. Légende RACI</h2>
<table class="data-table">
  <thead><tr><th>Lettre</th><th>Rôle</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td><strong>R</strong></td><td>Responsible</td><td>Réalise la tâche / le livrable</td></tr>
    <tr><td><strong>A</strong></td><td>Accountable</td><td>Rend compte, valide et est responsable du résultat final (un seul par tâche)</td></tr>
    <tr><td><strong>C</strong></td><td>Consulted</td><td>Consulté avant décision ou action (échange bidirectionnel)</td></tr>
    <tr><td><strong>I</strong></td><td>Informed</td><td>Informé de l'avancement ou du résultat (communication unidirectionnelle)</td></tr>
  </tbody>
</table>

<h2>2. Intervenants du projet</h2>
<p>{{intervenants}}</p>

<h2>3. Matrice RACI par phase</h2>
<table class="data-table">
  <thead>
    <tr><th>Tâche / Livrable</th><th>Chef de projet</th><th>Équipe projet</th><th>Direction</th><th>Client / MOA</th><th>Prestataire</th><th>Comité pilotage</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>PHASE INITIALISATION</strong></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Charte de projet</td><td>R/A</td><td>C</td><td>A</td><td>C</td><td></td><td>I</td></tr>
    <tr><td>Identification des parties prenantes</td><td>R/A</td><td>C</td><td>I</td><td>C</td><td></td><td>I</td></tr>
    <tr><td><strong>PHASE PLANIFICATION</strong></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Plan projet détaillé</td><td>R/A</td><td>R</td><td>I</td><td>C</td><td>C</td><td>A</td></tr>
    <tr><td>Budget prévisionnel</td><td>R</td><td>C</td><td>A</td><td>C</td><td>I</td><td>A</td></tr>
    <tr><td>Registre des risques</td><td>R/A</td><td>C</td><td>I</td><td>I</td><td>C</td><td>I</td></tr>
    <tr><td>Plan de communication</td><td>R/A</td><td>C</td><td>C</td><td>C</td><td></td><td>I</td></tr>
    <tr><td><strong>PHASE EXÉCUTION</strong></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Réalisation des livrables</td><td>A</td><td>R</td><td>I</td><td>C</td><td>R</td><td>I</td></tr>
    <tr><td>Gestion des prestataires</td><td>R/A</td><td>C</td><td>I</td><td>I</td><td>C</td><td></td></tr>
    <tr><td>Rapport d'avancement hebdo</td><td>R/A</td><td>C</td><td>I</td><td>I</td><td>I</td><td>I</td></tr>
    <tr><td><strong>PHASE CONTRÔLE</strong></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Contrôle qualité des livrables</td><td>A</td><td>R</td><td>I</td><td>A</td><td>C</td><td>I</td></tr>
    <tr><td>Gestion des modifications</td><td>R/A</td><td>C</td><td>C</td><td>A</td><td>I</td><td>C</td></tr>
    <tr><td><strong>PHASE CLÔTURE</strong></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Procès-verbal de réception</td><td>R</td><td>C</td><td>I</td><td>A</td><td>C</td><td>I</td></tr>
    <tr><td>Bilan de clôture</td><td>R/A</td><td>C</td><td>A</td><td>I</td><td>I</td><td>A</td></tr>
  </tbody>
</table>

<p class="footer">Document établi par : {{chef_projet}} — {{organisation}} — {{date_document}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 50,
  },

  {
    code: 'proj2_registre_risques',
    name: 'Registre des risques projet',
    category: 'commercial_financier',
    description: 'Identifier, évaluer et planifier les réponses aux risques d\'un projet : probabilité, impact, criticité et plans d\'atténuation par risque.',
    price: 3500,
    priceMax: 7000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { key: 'organisation', label: 'Organisation', type: 'text', required: true },
      { key: 'date_maj', label: 'Date de mise à jour', type: 'date', required: true },
      { key: 'contexte_projet', label: 'Description succincte du projet et de son contexte', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>REGISTRE DES RISQUES — {{nom_projet}}</h1>
<table class="info-table">
  <tr><th>Organisation</th><td>{{organisation}}</td><th>Chef de projet</th><td>{{chef_projet}}</td></tr>
  <tr><th>Dernière mise à jour</th><td colspan="3">{{date_maj}}</td></tr>
</table>

<h2>1. Contexte du projet</h2>
<p>{{contexte_projet}}</p>

<h2>2. Échelle d'évaluation</h2>
<table class="data-table">
  <thead><tr><th>Niveau</th><th>Probabilité</th><th>Impact</th><th>Score</th></tr></thead>
  <tbody>
    <tr><td>1 – Faible</td><td>&lt; 20 %</td><td>Mineur – peu de conséquences</td><td>1–2</td></tr>
    <tr><td>2 – Modéré</td><td>20 % – 50 %</td><td>Modéré – retard ou coût limité</td><td>3–5</td></tr>
    <tr><td>3 – Élevé</td><td>50 % – 80 %</td><td>Majeur – impact significatif</td><td>6–8</td></tr>
    <tr><td>4 – Critique</td><td>&gt; 80 %</td><td>Critique – compromet l'objectif</td><td>9+</td></tr>
  </tbody>
</table>

<h2>3. Registre des risques</h2>
<table class="data-table">
  <thead>
    <tr><th>#</th><th>Catégorie</th><th>Description du risque</th><th>Causes potentielles</th><th>P</th><th>I</th><th>Criticité</th><th>Stratégie de réponse</th><th>Plan d'atténuation</th><th>Responsable</th><th>Statut</th></tr>
  </thead>
  <tbody>
    <tr><td>R01</td><td>Planning</td><td>Retard dans la livraison des livrables</td><td>Indisponibilité ressources, dépendances non maîtrisées</td><td>3</td><td>3</td><td>Élevée</td><td>Atténuer</td><td>Buffer planning, suivi hebdomadaire, revue jalons</td><td>{{chef_projet}}</td><td>Ouvert</td></tr>
    <tr><td>R02</td><td>Budget</td><td>Dépassement du budget prévu</td><td>Sous-estimation initiale, modifications de périmètre</td><td>2</td><td>3</td><td>Modérée</td><td>Atténuer</td><td>Réserve financière 10 %, contrôle mensuel des coûts</td><td>{{chef_projet}}</td><td>Ouvert</td></tr>
    <tr><td>R03</td><td>Ressources humaines</td><td>Départ ou indisponibilité d'un membre clé</td><td>Maladie, démission, affectation concurrente</td><td>2</td><td>3</td><td>Modérée</td><td>Atténuer</td><td>Plan de succession, documentation des compétences</td><td>Direction RH</td><td>Ouvert</td></tr>
    <tr><td>R04</td><td>Technique</td><td>Non-conformité technique des livrables</td><td>Cahier des charges incomplet, mauvaise interprétation</td><td>2</td><td>4</td><td>Élevée</td><td>Atténuer</td><td>Revues techniques régulières, tests de validation</td><td>Responsable technique</td><td>Ouvert</td></tr>
    <tr><td>R05</td><td>Parties prenantes</td><td>Résistance au changement</td><td>Communication insuffisante, déficit d'implication</td><td>3</td><td>2</td><td>Modérée</td><td>Atténuer</td><td>Plan de conduite du changement, ateliers de sensibilisation</td><td>{{chef_projet}}</td><td>Ouvert</td></tr>
    <tr><td>R06</td><td>Fournisseurs</td><td>Défaillance d'un prestataire externe</td><td>Difficultés financières, incapacité technique</td><td>1</td><td>4</td><td>Modérée</td><td>Transférer</td><td>Clauses contractuelles, prestataire de secours identifié</td><td>{{chef_projet}}</td><td>Ouvert</td></tr>
    <tr><td>R07</td><td>Réglementaire</td><td>Évolution de la réglementation applicable</td><td>Nouvelles lois, normes ou exigences administratives</td><td>1</td><td>3</td><td>Faible</td><td>Accepter / surveiller</td><td>Veille réglementaire trimestrielle</td><td>Juriste / Conformité</td><td>Surveillé</td></tr>
  </tbody>
</table>

<h2>4. Suivi et révision</h2>
<p>Le registre des risques est revu lors de chaque réunion de comité de pilotage et mis à jour par le chef de projet. Tout nouveau risque identifié est immédiatement ajouté et évalué.</p>

<p class="footer">Registre établi par : {{chef_projet}} — {{organisation}} — Mis à jour le : {{date_maj}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 55,
  },

  {
    code: 'proj2_rapport_avancement',
    name: 'Rapport d\'avancement hebdomadaire',
    category: 'commercial_financier',
    description: 'Rapport hebdomadaire synthétisant l\'état d\'avancement du projet : tâches accomplies, en cours, blocages, indicateurs et prochaines actions.',
    price: 2000,
    priceMax: 4000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { key: 'organisation', label: 'Organisation', type: 'text', required: true },
      { key: 'semaine', label: 'Semaine (ex. : Semaine 28 — du 7 au 11 juillet 2025)', type: 'text', required: true },
      { key: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      { key: 'avancement_global', label: 'Avancement global du projet (en %)', type: 'number', required: true },
      { key: 'taches_accomplies', label: 'Tâches accomplies cette semaine', type: 'textarea', required: true },
      { key: 'taches_en_cours', label: 'Tâches en cours', type: 'textarea', required: true },
      { key: 'blocages', label: 'Points bloquants / problèmes rencontrés', type: 'textarea', required: false },
      { key: 'prochaines_actions', label: 'Actions prévues semaine prochaine', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>RAPPORT D'AVANCEMENT — {{nom_projet}}</h1>
<h2>{{semaine}}</h2>
<table class="info-table">
  <tr><th>Organisation</th><td>{{organisation}}</td><th>Chef de projet</th><td>{{chef_projet}}</td></tr>
  <tr><th>Date du rapport</th><td>{{date_rapport}}</td><th>Avancement global</th><td><strong>{{avancement_global}} %</strong></td></tr>
</table>

<h2>1. Indicateurs clés</h2>
<table class="data-table">
  <thead><tr><th>Indicateur</th><th>État</th><th>Commentaire</th></tr></thead>
  <tbody>
    <tr><td>Planning</td><td>🟢 En bonne voie</td><td>À compléter selon l'avancement réel</td></tr>
    <tr><td>Budget</td><td>🟢 Conforme</td><td>À compléter selon l'état financier</td></tr>
    <tr><td>Qualité livrables</td><td>🟢 Conforme</td><td>À compléter selon les retours</td></tr>
    <tr><td>Risques majeurs</td><td>🟡 Surveillance</td><td>Voir section blocages</td></tr>
  </tbody>
</table>

<h2>2. Tâches accomplies cette semaine</h2>
<p>{{taches_accomplies}}</p>

<h2>3. Tâches en cours</h2>
<p>{{taches_en_cours}}</p>

<h2>4. Points bloquants et problèmes rencontrés</h2>
<p>{{blocages}}</p>

<h2>5. Actions prévues pour la semaine prochaine</h2>
<p>{{prochaines_actions}}</p>

<h2>6. Décisions requises</h2>
<p><em>(À renseigner : décisions nécessitant validation du comité de pilotage ou de la direction)</em></p>

<p class="footer">Rapport établi par : {{chef_projet}} — {{organisation}} — {{date_rapport}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 60,
  },

  {
    code: 'proj2_budget_projet',
    name: 'Budget prévisionnel projet',
    category: 'commercial_financier',
    description: 'Établir le budget prévisionnel d\'un projet par catégorie de coûts : ressources humaines, équipements, prestations externes, frais divers et réserves.',
    price: 3000,
    priceMax: 6000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { key: 'organisation', label: 'Organisation', type: 'text', required: true },
      { key: 'date_document', label: 'Date du document', type: 'date', required: true },
      { key: 'devise', label: 'Devise (ex. : FCFA, EUR)', type: 'text', required: true },
      { key: 'budget_total', label: 'Budget total autorisé (montant)', type: 'number', required: true },
      { key: 'description_projet', label: 'Description sommaire du projet', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>BUDGET PRÉVISIONNEL — {{nom_projet}}</h1>
<table class="info-table">
  <tr><th>Organisation</th><td>{{organisation}}</td><th>Chef de projet</th><td>{{chef_projet}}</td></tr>
  <tr><th>Date</th><td>{{date_document}}</td><th>Devise</th><td>{{devise}}</td></tr>
  <tr><th colspan="2">Budget total autorisé</th><td colspan="2"><strong>{{budget_total}} {{devise}}</strong></td></tr>
</table>

<h2>1. Description du projet</h2>
<p>{{description_projet}}</p>

<h2>2. Détail du budget par catégorie</h2>
<table class="data-table">
  <thead>
    <tr><th>Catégorie</th><th>Sous-catégorie</th><th>Quantité</th><th>Unité</th><th>PU ({{devise}})</th><th>Total ({{devise}})</th><th>% budget</th></tr>
  </thead>
  <tbody>
    <tr><td rowspan="3"><strong>1. Ressources humaines</strong></td><td>Chef de projet (interne)</td><td></td><td>J/H</td><td></td><td></td><td></td></tr>
    <tr><td>Équipe projet (interne)</td><td></td><td>J/H</td><td></td><td></td><td></td></tr>
    <tr><td>Consultants / experts externes</td><td></td><td>J/H</td><td></td><td></td><td></td></tr>
    <tr><td rowspan="2"><strong>2. Équipements &amp; matériels</strong></td><td>Matériel informatique</td><td></td><td>Unité</td><td></td><td></td><td></td></tr>
    <tr><td>Licences logiciels</td><td></td><td>Unité</td><td></td><td></td><td></td></tr>
    <tr><td rowspan="2"><strong>3. Prestations externes</strong></td><td>Sous-traitance</td><td></td><td>Forfait</td><td></td><td></td><td></td></tr>
    <tr><td>Formation</td><td></td><td>Forfait</td><td></td><td></td><td></td></tr>
    <tr><td rowspan="2"><strong>4. Frais généraux</strong></td><td>Déplacements &amp; hébergement</td><td></td><td>Forfait</td><td></td><td></td><td></td></tr>
    <tr><td>Communication &amp; impression</td><td></td><td>Forfait</td><td></td><td></td><td></td></tr>
    <tr><td colspan="5"><strong>SOUS-TOTAL COÛTS DIRECTS</strong></td><td></td><td></td></tr>
    <tr><td colspan="5"><strong>5. Réserve pour aléas (10 %)</strong></td><td></td><td>10 %</td></tr>
    <tr><td colspan="5"><strong>BUDGET TOTAL</strong></td><td><strong>{{budget_total}} {{devise}}</strong></td><td>100 %</td></tr>
  </tbody>
</table>

<h2>3. Hypothèses budgétaires</h2>
<ul>
  <li>Les taux journaliers sont établis sur la base des tarifs internes et du marché.</li>
  <li>Une réserve de 10 % est prévue pour les aléas et imprévus.</li>
  <li>Les modifications de périmètre nécessitent une révision du budget via une demande de changement formelle.</li>
</ul>

<h2>4. Processus de suivi budgétaire</h2>
<p>Un rapport mensuel de suivi budgétaire sera produit par le chef de projet, comparant le budget prévisionnel au réalisé (coût réel) et à la valeur acquise (méthode EVM).</p>

<p class="footer">Document établi par : {{chef_projet}} — {{organisation}} — {{date_document}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 55,
  },

  {
    code: 'proj2_tableau_bord',
    name: 'Tableau de bord projet',
    category: 'commercial_financier',
    description: 'Synthèse visuelle de l\'état du projet pour le reporting : indicateurs de performance (planning, budget, qualité, risques) et actions en cours.',
    price: 2500,
    priceMax: 5000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { key: 'organisation', label: 'Organisation', type: 'text', required: true },
      { key: 'periode', label: 'Période de reporting (ex. : Juillet 2025)', type: 'text', required: true },
      { key: 'date_rapport', label: 'Date du rapport', type: 'date', required: true },
      { key: 'avancement', label: 'Avancement global (%)', type: 'number', required: true },
      { key: 'budget_consomme', label: 'Budget consommé à date', type: 'number', required: true },
      { key: 'budget_total', label: 'Budget total autorisé', type: 'number', required: true },
      { key: 'devise', label: 'Devise', type: 'text', required: false },
      { key: 'faits_marquants', label: 'Faits marquants de la période', type: 'textarea', required: true },
      { key: 'decisions_requises', label: 'Décisions requises', type: 'textarea', required: false },
    ]),
    body: `<div class="document">
<h1>TABLEAU DE BORD PROJET — {{nom_projet}}</h1>
<h2>Période : {{periode}}</h2>
<table class="info-table">
  <tr><th>Organisation</th><td>{{organisation}}</td><th>Chef de projet</th><td>{{chef_projet}}</td></tr>
  <tr><th>Date du rapport</th><td>{{date_rapport}}</td><th>Avancement global</th><td><strong>{{avancement}} %</strong></td></tr>
</table>

<h2>1. Synthèse des indicateurs clés (feux tricolores)</h2>
<table class="data-table">
  <thead><tr><th>Dimension</th><th>Statut</th><th>Commentaire</th></tr></thead>
  <tbody>
    <tr><td><strong>Planning</strong></td><td>🟢 / 🟡 / 🔴</td><td><em>À renseigner selon état réel</em></td></tr>
    <tr><td><strong>Budget</strong></td><td>🟢 / 🟡 / 🔴</td><td>Consommé : {{budget_consomme}} / Alloué : {{budget_total}} {{devise}}</td></tr>
    <tr><td><strong>Qualité</strong></td><td>🟢 / 🟡 / 🔴</td><td><em>À renseigner selon état réel</em></td></tr>
    <tr><td><strong>Risques</strong></td><td>🟢 / 🟡 / 🔴</td><td><em>À renseigner selon état réel</em></td></tr>
    <tr><td><strong>Parties prenantes</strong></td><td>🟢 / 🟡 / 🔴</td><td><em>À renseigner selon état réel</em></td></tr>
  </tbody>
</table>

<h2>2. Avancement des phases / jalons</h2>
<table class="data-table">
  <thead><tr><th>Phase / Jalon</th><th>Date prévue</th><th>Date réelle</th><th>Avancement</th><th>Statut</th></tr></thead>
  <tbody>
    <tr><td>Initialisation</td><td></td><td></td><td>100 %</td><td>🟢 Terminé</td></tr>
    <tr><td>Planification</td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Exécution</td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Contrôle &amp; Tests</td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Clôture</td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<h2>3. Faits marquants de la période</h2>
<p>{{faits_marquants}}</p>

<h2>4. Risques et problèmes actifs</h2>
<table class="data-table">
  <thead><tr><th>#</th><th>Description</th><th>Criticité</th><th>Plan d'action</th><th>Responsable</th></tr></thead>
  <tbody>
    <tr><td>R01</td><td><em>À renseigner</em></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<h2>5. Décisions requises</h2>
<p>{{decisions_requises}}</p>

<p class="footer">Tableau de bord établi par : {{chef_projet}} — {{organisation}} — {{date_rapport}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 65,
  },

  {
    code: 'proj2_bilan_projet',
    name: 'Bilan de clôture projet',
    category: 'commercial_financier',
    description: 'Documenter et analyser le projet à sa clôture : objectifs atteints, écarts planning et budget, leçons apprises et recommandations pour les projets futurs.',
    price: 3500,
    priceMax: 7000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { key: 'organisation', label: 'Organisation', type: 'text', required: true },
      { key: 'date_debut_reel', label: 'Date de début réelle', type: 'date', required: true },
      { key: 'date_fin_reelle', label: 'Date de fin réelle', type: 'date', required: true },
      { key: 'budget_initial', label: 'Budget initial prévu', type: 'number', required: true },
      { key: 'budget_reel', label: 'Budget réellement dépensé', type: 'number', required: true },
      { key: 'devise', label: 'Devise', type: 'text', required: false },
      { key: 'objectifs_atteints', label: 'Objectifs atteints (description)', type: 'textarea', required: true },
      { key: 'objectifs_non_atteints', label: 'Objectifs non atteints ou partiellement atteints', type: 'textarea', required: false },
      { key: 'lecons_apprises', label: 'Leçons apprises et enseignements clés', type: 'textarea', required: true },
      { key: 'recommandations', label: 'Recommandations pour les projets futurs', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>BILAN DE CLÔTURE — {{nom_projet}}</h1>
<table class="info-table">
  <tr><th>Organisation</th><td>{{organisation}}</td><th>Chef de projet</th><td>{{chef_projet}}</td></tr>
  <tr><th>Période réelle</th><td colspan="3">{{date_debut_reel}} – {{date_fin_reelle}}</td></tr>
</table>

<h2>1. Synthèse des résultats</h2>
<table class="data-table">
  <thead><tr><th>Indicateur</th><th>Prévu</th><th>Réalisé</th><th>Écart</th><th>Évaluation</th></tr></thead>
  <tbody>
    <tr><td>Budget ({{devise}})</td><td>{{budget_initial}}</td><td>{{budget_reel}}</td><td></td><td>🟢 / 🟡 / 🔴</td></tr>
    <tr><td>Délais</td><td><em>Date prévue</em></td><td>{{date_fin_reelle}}</td><td></td><td>🟢 / 🟡 / 🔴</td></tr>
    <tr><td>Périmètre</td><td>100 % des livrables</td><td></td><td></td><td>🟢 / 🟡 / 🔴</td></tr>
    <tr><td>Satisfaction client/MOA</td><td></td><td></td><td></td><td>🟢 / 🟡 / 🔴</td></tr>
  </tbody>
</table>

<h2>2. Objectifs atteints</h2>
<p>{{objectifs_atteints}}</p>

<h2>3. Objectifs non atteints ou partiellement atteints</h2>
<p>{{objectifs_non_atteints}}</p>

<h2>4. Analyse des écarts</h2>
<h3>4.1 Écart budgétaire</h3>
<p>Budget initial : <strong>{{budget_initial}} {{devise}}</strong> — Budget réel : <strong>{{budget_reel}} {{devise}}</strong>. Les causes des écarts éventuels sont analysées ci-dessous.</p>

<h3>4.2 Écart planning</h3>
<p><em>À renseigner : causes des retards ou avances constatés.</em></p>

<h2>5. Leçons apprises</h2>
<p>{{lecons_apprises}}</p>

<h2>6. Recommandations pour les projets futurs</h2>
<p>{{recommandations}}</p>

<h2>7. Archivage et clôture administrative</h2>
<ul>
  <li>Documentation projet archivée dans : <em>[préciser le système documentaire]</em></li>
  <li>Accès aux archives ouvert aux : <em>[préciser les ayants droit]</em></li>
  <li>Libération des ressources projet effective le : <em>{{date_fin_reelle}}</em></li>
</ul>

<p class="footer">Bilan établi par : {{chef_projet}} — {{organisation}} — Date de clôture : {{date_fin_reelle}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 50,
  },

  {
    code: 'proj2_note_lancement',
    name: 'Note de lancement de projet (Kick-off)',
    category: 'commercial_financier',
    description: 'Formaliser le lancement officiel d\'un projet : présentation de l\'équipe, des objectifs, du planning et des règles de fonctionnement, à distribuer lors de la réunion de lancement.',
    price: 2500,
    priceMax: 5000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { key: 'organisation', label: 'Organisation / Maîtrise d\'ouvrage', type: 'text', required: true },
      { key: 'date_lancement', label: 'Date de la réunion de lancement', type: 'date', required: true },
      { key: 'lieu_lancement', label: 'Lieu de la réunion de lancement', type: 'text', required: true },
      { key: 'objectifs', label: 'Objectifs du projet', type: 'textarea', required: true },
      { key: 'perimetre', label: 'Périmètre (dans le scope)', type: 'textarea', required: true },
      { key: 'hors_perimetre', label: 'Hors périmètre', type: 'textarea', required: false },
      { key: 'budget', label: 'Budget alloué', type: 'text', required: false },
      { key: 'equipe', label: 'Membres de l\'équipe projet et rôles', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>NOTE DE LANCEMENT — {{nom_projet}}</h1>
<h2>Réunion de lancement (Kick-off)</h2>
<table class="info-table">
  <tr><th>Organisation</th><td>{{organisation}}</td><th>Chef de projet</th><td>{{chef_projet}}</td></tr>
  <tr><th>Date</th><td>{{date_lancement}}</td><th>Lieu</th><td>{{lieu_lancement}}</td></tr>
</table>

<h2>1. Présentation du projet</h2>
<h3>1.1 Objectifs</h3>
<p>{{objectifs}}</p>

<h3>1.2 Périmètre</h3>
<p><strong>Dans le périmètre :</strong><br/>{{perimetre}}</p>
<p><strong>Hors périmètre :</strong><br/>{{hors_perimetre}}</p>

<h3>1.3 Budget</h3>
<p>{{budget}}</p>

<h2>2. Équipe projet</h2>
<p>{{equipe}}</p>

<h2>3. Planning synthétique</h2>
<table class="data-table">
  <thead><tr><th>Phase</th><th>Date de début</th><th>Date de fin</th><th>Livrables principaux</th></tr></thead>
  <tbody>
    <tr><td>Initialisation</td><td></td><td></td><td>Charte de projet, registre parties prenantes</td></tr>
    <tr><td>Planification</td><td></td><td></td><td>Plan projet, budget, registre risques</td></tr>
    <tr><td>Exécution</td><td></td><td></td><td>Livrables opérationnels</td></tr>
    <tr><td>Contrôle &amp; recette</td><td></td><td></td><td>Rapports de tests, PV de recette</td></tr>
    <tr><td>Clôture</td><td></td><td></td><td>Bilan projet, archivage</td></tr>
  </tbody>
</table>

<h2>4. Règles de fonctionnement de l'équipe</h2>
<ul>
  <li>Réunion d'avancement hebdomadaire — chaque lundi à [heure]</li>
  <li>Comité de pilotage mensuel</li>
  <li>Outil de communication officiel : [e-mail / Teams / Slack / ...]</li>
  <li>Tout changement de périmètre nécessite une demande de changement formelle approuvée</li>
  <li>Les décisions sont consignées dans les comptes-rendus de réunion</li>
</ul>

<h2>5. Prochaines étapes</h2>
<p>À la suite de cette réunion de lancement, le chef de projet diffusera le plan de projet détaillé dans les [X] jours ouvrés.</p>

<p class="footer">Note de lancement établie par : {{chef_projet}} — {{organisation}} — {{date_lancement}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 55,
  },

  {
    code: 'proj2_plan_assurance_qualite',
    name: 'Plan d\'assurance qualité projet (PAQ)',
    category: 'commercial_financier',
    description: 'Définir la méthodologie, les procédures et l\'organisation qualité à mettre en place pour garantir la conformité des livrables d\'un projet.',
    price: 4000,
    priceMax: 8000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'chef_projet', label: 'Chef de projet', type: 'text', required: true },
      { key: 'organisation', label: 'Organisation', type: 'text', required: true },
      { key: 'version', label: 'Version du PAQ', type: 'text', required: false },
      { key: 'date_document', label: 'Date du document', type: 'date', required: true },
      { key: 'perimetre_projet', label: 'Périmètre et objectifs du projet', type: 'textarea', required: true },
      { key: 'methodologie', label: 'Méthodologie de gestion de projet (ex. : cascade, agile, hybride)', type: 'text', required: true },
      { key: 'normes', label: 'Normes et référentiels qualité applicables (ex. : ISO 9001, PMBOK)', type: 'textarea', required: false },
    ]),
    body: `<div class="document">
<h1>PLAN D'ASSURANCE QUALITÉ (PAQ) — {{nom_projet}}</h1>
<table class="info-table">
  <tr><th>Organisation</th><td>{{organisation}}</td><th>Chef de projet</th><td>{{chef_projet}}</td></tr>
  <tr><th>Version</th><td>{{version}}</td><th>Date</th><td>{{date_document}}</td></tr>
</table>

<h2>1. Objectifs du PAQ</h2>
<p>Le présent Plan d'Assurance Qualité définit les méthodologies, méthodes, procédures, règles et l'organisation à mettre en place pour assurer que le projet <strong>{{nom_projet}}</strong> délivrera des résultats conformes aux exigences définies, dans les délais et le budget impartis.</p>

<h2>2. Périmètre du projet</h2>
<p>{{perimetre_projet}}</p>

<h2>3. Méthodologie</h2>
<p>Le projet {{nom_projet}} utilisera la méthodologie : <strong>{{methodologie}}</strong>.</p>
<p>Les grandes phases du projet sont : Initialisation → Planification → Exécution → Contrôle et suivi → Clôture.</p>

<h2>4. Normes et référentiels qualité</h2>
<p>{{normes}}</p>

<h2>5. Organisation qualité</h2>
<table class="data-table">
  <thead><tr><th>Rôle</th><th>Responsabilités qualité</th><th>Titulaire</th></tr></thead>
  <tbody>
    <tr><td>Chef de projet</td><td>Responsable global de la qualité du projet</td><td>{{chef_projet}}</td></tr>
    <tr><td>Responsable qualité</td><td>Audit interne, revues qualité, conformité</td><td><em>À désigner</em></td></tr>
    <tr><td>Membres de l'équipe</td><td>Auto-contrôle, respect des procédures</td><td>Équipe projet</td></tr>
    <tr><td>Client / MOA</td><td>Validation des livrables, tests de recette</td><td><em>À désigner</em></td></tr>
  </tbody>
</table>

<h2>6. Procédures qualité</h2>
<h3>6.1 Revues qualité</h3>
<p>Des revues qualité sont organisées à chaque fin de phase pour vérifier la conformité des livrables avant passage à la phase suivante.</p>

<h3>6.2 Gestion des non-conformités</h3>
<p>Toute non-conformité détectée est enregistrée dans le registre des non-conformités, analysée et fait l'objet d'un plan d'action corrective.</p>

<h3>6.3 Gestion des modifications</h3>
<p>Toute modification au périmètre, planning ou budget nécessite une demande de changement formelle soumise au comité de pilotage.</p>

<h2>7. Indicateurs qualité</h2>
<table class="data-table">
  <thead><tr><th>Indicateur</th><th>Cible</th><th>Fréquence de mesure</th></tr></thead>
  <tbody>
    <tr><td>Taux de livrables acceptés du 1er coup</td><td>&gt; 85 %</td><td>Par livrable</td></tr>
    <tr><td>Nombre de non-conformités majeures</td><td>0</td><td>Mensuelle</td></tr>
    <tr><td>Taux de satisfaction client (MOA)</td><td>&gt; 80 %</td><td>À la clôture</td></tr>
    <tr><td>Respect du planning (SPI)</td><td>&gt; 0,95</td><td>Mensuelle</td></tr>
    <tr><td>Respect du budget (CPI)</td><td>&gt; 0,95</td><td>Mensuelle</td></tr>
  </tbody>
</table>

<p class="footer">PAQ établi par : {{chef_projet}} — {{organisation}} — {{date_document}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 48,
  },

  {
    code: 'proj2_fiche_tache',
    name: 'Fiche de tâche projet',
    category: 'commercial_financier',
    description: 'Décrire et planifier une tâche spécifique du projet : objectif, responsable, ressources, critères d\'acceptation et dépendances.',
    price: 1500,
    priceMax: 3000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { key: 'intitule_tache', label: 'Intitulé de la tâche', type: 'text', required: true },
      { key: 'code_tache', label: 'Code / ID de la tâche', type: 'text', required: false },
      { key: 'responsable', label: 'Responsable de la tâche', type: 'text', required: true },
      { key: 'date_debut', label: 'Date de début prévue', type: 'date', required: true },
      { key: 'date_fin', label: 'Date de fin prévue', type: 'date', required: true },
      { key: 'charge', label: 'Charge estimée (en jours / heures)', type: 'text', required: false },
      { key: 'description', label: 'Description détaillée de la tâche', type: 'textarea', required: true },
      { key: 'livrables', label: 'Livrables attendus', type: 'textarea', required: true },
      { key: 'criteres_acceptation', label: 'Critères d\'acceptation / définition du Done', type: 'textarea', required: true },
      { key: 'dependances', label: 'Dépendances (tâches précédentes ou parallèles)', type: 'textarea', required: false },
    ]),
    body: `<div class="document">
<h1>FICHE DE TÂCHE</h1>
<table class="info-table">
  <tr><th>Projet</th><td>{{nom_projet}}</td><th>Code tâche</th><td>{{code_tache}}</td></tr>
  <tr><th>Intitulé</th><td colspan="3"><strong>{{intitule_tache}}</strong></td></tr>
  <tr><th>Responsable</th><td>{{responsable}}</td><th>Charge</th><td>{{charge}}</td></tr>
  <tr><th>Début prévu</th><td>{{date_debut}}</td><th>Fin prévue</th><td>{{date_fin}}</td></tr>
</table>

<h2>1. Description de la tâche</h2>
<p>{{description}}</p>

<h2>2. Livrables attendus</h2>
<p>{{livrables}}</p>

<h2>3. Critères d'acceptation</h2>
<p>{{criteres_acceptation}}</p>

<h2>4. Dépendances</h2>
<p>{{dependances}}</p>

<h2>5. Suivi d'exécution</h2>
<table class="data-table">
  <thead><tr><th>Date</th><th>Avancement (%)</th><th>Statut</th><th>Commentaire</th></tr></thead>
  <tbody>
    <tr><td></td><td></td><td>Non démarré</td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td>100 %</td><td>Terminé</td><td></td></tr>
  </tbody>
</table>

<p class="footer">Fiche établie — Projet : {{nom_projet}} — Responsable : {{responsable}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 42,
  },

  // ════════════════════════ ENV — ENVIRONNEMENT (3) ════════════════════════
  {
    code: 'env_notice_impact',
    name: 'Notice d\'impact environnemental',
    category: 'agro_environnement',
    description: 'Évaluer et documenter les impacts environnementaux d\'un projet ou d\'une activité : description du milieu, identification des impacts, mesures d\'atténuation et plan de surveillance.',
    price: 5000,
    priceMax: 12000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'intitule_projet', label: 'Intitulé du projet / de l\'activité', type: 'text', required: true },
      { key: 'promoteur', label: 'Promoteur / Maître d\'ouvrage', type: 'text', required: true },
      { key: 'localisation', label: 'Localisation du projet (ville, région, pays)', type: 'text', required: true },
      { key: 'description_projet', label: 'Description sommaire du projet', type: 'textarea', required: true },
      { key: 'superficie', label: 'Superficie concernée (en ha ou m²)', type: 'text', required: false },
      { key: 'date_document', label: 'Date du document', type: 'date', required: true },
      { key: 'expert_auteur', label: 'Expert auteur de la notice', type: 'text', required: true },
      { key: 'impacts_identifies', label: 'Principaux impacts identifiés', type: 'textarea', required: true },
      { key: 'mesures_attenuation', label: 'Mesures d\'atténuation proposées', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>NOTICE D'IMPACT ENVIRONNEMENTAL</h1>
<h2>{{intitule_projet}}</h2>
<table class="info-table">
  <tr><th>Promoteur</th><td>{{promoteur}}</td><th>Localisation</th><td>{{localisation}}</td></tr>
  <tr><th>Expert auteur</th><td>{{expert_auteur}}</td><th>Date</th><td>{{date_document}}</td></tr>
  <tr><th>Superficie</th><td colspan="3">{{superficie}}</td></tr>
</table>

<h2>1. Description du projet</h2>
<p>{{description_projet}}</p>

<h2>2. Description du milieu récepteur</h2>
<h3>2.1 Milieu physique</h3>
<p><em>Décrire le sol, le relief, le climat, les ressources en eau, la qualité de l'air dans la zone d'influence du projet.</em></p>

<h3>2.2 Milieu biologique</h3>
<p><em>Décrire la flore, la faune, les zones sensibles (forêts classées, zones humides, aires protégées) à proximité du projet.</em></p>

<h3>2.3 Milieu humain et socioéconomique</h3>
<p><em>Décrire les populations, activités économiques, infrastructures, patrimoine culturel dans la zone d'influence.</em></p>

<h2>3. Identification et évaluation des impacts</h2>
<table class="data-table">
  <thead>
    <tr><th>Composante</th><th>Impact identifié</th><th>Phase</th><th>Nature</th><th>Intensité</th><th>Étendue</th><th>Durée</th><th>Importance</th></tr>
  </thead>
  <tbody>
    <tr><td>Air</td><td>Émissions de poussières et gaz d'échappement</td><td>Construction</td><td>Négatif</td><td>Faible</td><td>Locale</td><td>Temporaire</td><td>Mineure</td></tr>
    <tr><td>Sol</td><td>Compaction et érosion du sol</td><td>Construction</td><td>Négatif</td><td>Modérée</td><td>Locale</td><td>Temporaire</td><td>Modérée</td></tr>
    <tr><td>Eau</td><td>Risque de pollution des eaux superficielles</td><td>Exploitation</td><td>Négatif</td><td>Faible</td><td>Locale</td><td>Permanente</td><td>Modérée</td></tr>
    <tr><td>Faune/Flore</td><td>Perturbation habitats naturels</td><td>Construction</td><td>Négatif</td><td>Modérée</td><td>Locale</td><td>Temporaire</td><td>Modérée</td></tr>
    <tr><td>Population</td><td>Création d'emplois directs et indirects</td><td>Toutes phases</td><td>Positif</td><td>Élevée</td><td>Locale/régionale</td><td>Permanente</td><td>Majeure (+)</td></tr>
    <tr><td>Population</td><td>Risques d'accidents et nuisances sonores</td><td>Construction</td><td>Négatif</td><td>Modérée</td><td>Locale</td><td>Temporaire</td><td>Modérée</td></tr>
  </tbody>
</table>

<h2>4. Impacts spécifiques identifiés</h2>
<p>{{impacts_identifies}}</p>

<h2>5. Mesures d'atténuation et de bonification</h2>
<table class="data-table">
  <thead><tr><th>Impact</th><th>Mesure proposée</th><th>Responsable</th><th>Coût estimé</th></tr></thead>
  <tbody>
    <tr><td>Émissions de poussières</td><td>Arrosage des pistes, bâches sur les véhicules de transport</td><td>Entrepreneur</td><td>Inclus dans le marché</td></tr>
    <tr><td>Érosion du sol</td><td>Végétalisation des talus, collecte des eaux de ruissellement</td><td>Entrepreneur</td><td></td></tr>
    <tr><td>Pollution des eaux</td><td>Collecte et traitement des eaux usées, bacs de rétention</td><td>Promoteur</td><td></td></tr>
    <tr><td>Nuisances sonores</td><td>Restriction horaires travaux, entretien engins</td><td>Entrepreneur</td><td></td></tr>
  </tbody>
</table>

<h2>6. Mesures d'atténuation complémentaires</h2>
<p>{{mesures_attenuation}}</p>

<h2>7. Plan de surveillance environnementale</h2>
<table class="data-table">
  <thead><tr><th>Paramètre surveillé</th><th>Indicateur</th><th>Fréquence</th><th>Responsable</th></tr></thead>
  <tbody>
    <tr><td>Qualité de l'air</td><td>Taux de poussières</td><td>Trimestrielle</td><td>Expert environnement</td></tr>
    <tr><td>Qualité des eaux</td><td>Analyses physico-chimiques</td><td>Semestrielle</td><td>Expert environnement</td></tr>
    <tr><td>Végétation</td><td>Taux de recouvrement</td><td>Annuelle</td><td>Expert botanique</td></tr>
    <tr><td>Emplois générés</td><td>Nombre emplois directs/indirects</td><td>Annuelle</td><td>{{promoteur}}</td></tr>
  </tbody>
</table>

<h2>8. Conclusion</h2>
<p>Au vu de l'analyse effectuée, le projet <strong>{{intitule_projet}}</strong> présente des impacts environnementaux maîtrisables, sous réserve de la mise en œuvre rigoureuse des mesures d'atténuation préconisées. Le bilan environnemental global est jugé <strong>acceptable</strong>.</p>

<p class="footer">Notice établie par : {{expert_auteur}} — Pour le compte de : {{promoteur}} — Date : {{date_document}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 45,
  },

  {
    code: 'env_plan_gestion_dechets',
    name: 'Plan de gestion des déchets',
    category: 'agro_environnement',
    description: 'Planifier la collecte, le tri, le stockage, le transport et l\'élimination des déchets générés par une activité industrielle, agricole ou de chantier.',
    price: 4000,
    priceMax: 9000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'nom_site', label: 'Nom du site / de l\'entreprise', type: 'text', required: true },
      { key: 'responsable', label: 'Responsable Environnement / HSE', type: 'text', required: true },
      { key: 'localisation', label: 'Localisation du site', type: 'text', required: true },
      { key: 'activite', label: 'Description de l\'activité principale', type: 'textarea', required: true },
      { key: 'date_document', label: 'Date du document', type: 'date', required: true },
      { key: 'types_dechets', label: 'Types de déchets générés (description)', type: 'textarea', required: true },
      { key: 'objectifs_reduction', label: 'Objectifs de réduction et de valorisation', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>PLAN DE GESTION DES DÉCHETS</h1>
<h2>{{nom_site}}</h2>
<table class="info-table">
  <tr><th>Localisation</th><td>{{localisation}}</td><th>Responsable HSE</th><td>{{responsable}}</td></tr>
  <tr><th>Date</th><td colspan="3">{{date_document}}</td></tr>
</table>

<h2>1. Contexte et activité</h2>
<p>{{activite}}</p>

<h2>2. Cadre réglementaire</h2>
<p>Le présent plan est établi conformément aux réglementations nationales en vigueur relatives à la gestion des déchets, notamment les lois sur l'environnement et les décrets relatifs aux installations classées pour la protection de l'environnement (ICPE). Il respecte également les engagements issus des conventions internationales ratifiées par le pays (Convention de Bâle sur les déchets dangereux, etc.).</p>

<h2>3. Caractérisation des déchets</h2>
<p>{{types_dechets}}</p>
<table class="data-table">
  <thead><tr><th>Type de déchet</th><th>Catégorie</th><th>Quantité estimée/mois</th><th>Mode de conditionnement</th><th>Lieu de stockage</th></tr></thead>
  <tbody>
    <tr><td>Déchets ménagers assimilés</td><td>Non dangereux</td><td></td><td>Poubelles fermées</td><td>Zone de collecte couverte</td></tr>
    <tr><td>Déchets organiques / végétaux</td><td>Non dangereux valorisable</td><td></td><td>Bennes aérées</td><td>Aire de compostage</td></tr>
    <tr><td>Plastiques / emballages</td><td>Non dangereux recyclable</td><td></td><td>Bacs jaunes (tri)</td><td>Zone de tri</td></tr>
    <tr><td>Huiles usagées</td><td>Dangereux</td><td></td><td>Fûts étanches</td><td>Local sécurisé sur rétention</td></tr>
    <tr><td>Produits chimiques périmés</td><td>Dangereux</td><td></td><td>Conteneurs homologués</td><td>Local sécurisé sur rétention</td></tr>
    <tr><td>Déchets de chantier (gravats)</td><td>Inertes</td><td></td><td>Bennes métalliques</td><td>Aire dédiée</td></tr>
  </tbody>
</table>

<h2>4. Filières de traitement et d'élimination</h2>
<table class="data-table">
  <thead><tr><th>Type de déchet</th><th>Filière</th><th>Prestataire</th><th>Fréquence d'enlèvement</th></tr></thead>
  <tbody>
    <tr><td>Déchets ménagers assimilés</td><td>Collecte municipale / enfouissement</td><td>Mairie / Prestataire agréé</td><td>Hebdomadaire</td></tr>
    <tr><td>Déchets organiques</td><td>Compostage sur site / valorisation agricole</td><td>En interne / agriculteurs partenaires</td><td>Bimensuelle</td></tr>
    <tr><td>Plastiques recyclables</td><td>Tri sélectif / recycleur agréé</td><td>Recycleur agréé</td><td>Mensuelle</td></tr>
    <tr><td>Huiles usagées</td><td>Reprise collecteur agréé</td><td>Collecteur certifié</td><td>Trimestrielle</td></tr>
    <tr><td>Produits chimiques dangereux</td><td>Élimination par incinérateur agréé</td><td>Prestataire habilité</td><td>À la demande</td></tr>
  </tbody>
</table>

<h2>5. Objectifs de réduction et de valorisation</h2>
<p>{{objectifs_reduction}}</p>

<h2>6. Procédures opérationnelles</h2>
<ul>
  <li>Tout déchet est trié à la source par le générateur selon le code couleur affiché.</li>
  <li>Les déchets dangereux sont systématiquement étiquetés avant stockage.</li>
  <li>Un registre de sortie des déchets est tenu à jour par le responsable HSE.</li>
  <li>Les bons d'enlèvement des prestataires sont archivés pendant 5 ans minimum.</li>
  <li>Aucun brûlage à l'air libre n'est autorisé sur le site.</li>
</ul>

<h2>7. Formation et sensibilisation</h2>
<p>Une formation sur le tri et la gestion des déchets est dispensée à chaque nouvel arrivant. Une sensibilisation annuelle est organisée pour l'ensemble du personnel.</p>

<h2>8. Indicateurs de suivi</h2>
<table class="data-table">
  <thead><tr><th>Indicateur</th><th>Objectif</th><th>Fréquence</th></tr></thead>
  <tbody>
    <tr><td>Taux de valorisation des déchets</td><td>&gt; 60 %</td><td>Annuelle</td></tr>
    <tr><td>Quantité de déchets dangereux générés</td><td>Réduction de 10 %/an</td><td>Annuelle</td></tr>
    <tr><td>Incidents / déversements accidentels</td><td>0</td><td>Continue</td></tr>
  </tbody>
</table>

<p class="footer">Plan établi par : {{responsable}} — {{nom_site}} — {{date_document}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 40,
  },

  {
    code: 'env_audit_environnemental',
    name: 'Rapport d\'audit environnemental',
    category: 'agro_environnement',
    description: 'Évaluer la conformité environnementale d\'une entreprise ou d\'un site : vérification des pratiques, écarts réglementaires, recommandations et plan d\'action correctif.',
    price: 6000,
    priceMax: 15000,
    currency: 'XOF',
    fieldsJson: F([
      { key: 'nom_site', label: 'Nom du site audité', type: 'text', required: true },
      { key: 'auditeur', label: 'Auditeur(s) responsable(s)', type: 'text', required: true },
      { key: 'organisme_auditeur', label: 'Organisme auditeur', type: 'text', required: true },
      { key: 'date_audit', label: 'Date de l\'audit', type: 'date', required: true },
      { key: 'localisation', label: 'Localisation du site', type: 'text', required: true },
      { key: 'activite_site', label: 'Activité principale du site', type: 'textarea', required: true },
      { key: 'perimetre_audit', label: 'Périmètre de l\'audit (domaines couverts)', type: 'textarea', required: true },
      { key: 'constats_principaux', label: 'Principaux constats et écarts identifiés', type: 'textarea', required: true },
      { key: 'points_positifs', label: 'Points positifs / bonnes pratiques identifiées', type: 'textarea', required: false },
      { key: 'recommandations', label: 'Recommandations prioritaires', type: 'textarea', required: true },
    ]),
    body: `<div class="document">
<h1>RAPPORT D'AUDIT ENVIRONNEMENTAL</h1>
<h2>Site : {{nom_site}}</h2>
<table class="info-table">
  <tr><th>Organisme auditeur</th><td>{{organisme_auditeur}}</td><th>Auditeur(s)</th><td>{{auditeur}}</td></tr>
  <tr><th>Date de l'audit</th><td>{{date_audit}}</td><th>Localisation</th><td>{{localisation}}</td></tr>
</table>

<h2>1. Contexte et objectifs de l'audit</h2>
<p>Le présent audit environnemental a été conduit sur le site <strong>{{nom_site}}</strong> afin d'évaluer la conformité des pratiques environnementales aux exigences réglementaires nationales et aux standards internationaux applicables.</p>
<p><strong>Activité du site :</strong> {{activite_site}}</p>

<h2>2. Périmètre de l'audit</h2>
<p>{{perimetre_audit}}</p>

<h2>3. Méthodologie</h2>
<ul>
  <li>Analyse documentaire (registres, autorisations, rapports antérieurs)</li>
  <li>Visite de terrain et observations directes</li>
  <li>Entretiens avec le personnel et la direction</li>
  <li>Prélèvements et mesures sur site (si applicable)</li>
  <li>Comparaison avec les exigences réglementaires en vigueur</li>
</ul>

<h2>4. Résultats de l'audit</h2>
<h3>4.1 Tableau de conformité</h3>
<table class="data-table">
  <thead><tr><th>Domaine</th><th>Exigence réglementaire</th><th>Constat</th><th>Niveau de conformité</th></tr></thead>
  <tbody>
    <tr><td>Gestion des déchets</td><td>Tri, stockage, élimination réglementaire</td><td><em>À renseigner</em></td><td>🟢 Conforme / 🟡 Partiel / 🔴 Non conforme</td></tr>
    <tr><td>Rejets liquides</td><td>Raccordement ou STEP, analyse périodique</td><td><em>À renseigner</em></td><td></td></tr>
    <tr><td>Émissions atmosphériques</td><td>Autorisation, mesures périodiques</td><td><em>À renseigner</em></td><td></td></tr>
    <tr><td>Produits chimiques</td><td>FDS, stockage sur rétention, registre</td><td><em>À renseigner</em></td><td></td></tr>
    <tr><td>Bruit</td><td>Niveaux sonores conformes</td><td><em>À renseigner</em></td><td></td></tr>
    <tr><td>Biodiversité</td><td>Zones sensibles protégées</td><td><em>À renseigner</em></td><td></td></tr>
    <tr><td>Énergie</td><td>Consommation suivie, efficacité énergétique</td><td><em>À renseigner</em></td><td></td></tr>
  </tbody>
</table>

<h2>5. Principaux constats et écarts</h2>
<p>{{constats_principaux}}</p>

<h2>6. Points positifs et bonnes pratiques</h2>
<p>{{points_positifs}}</p>

<h2>7. Recommandations prioritaires</h2>
<p>{{recommandations}}</p>

<h2>8. Plan d'action correctif</h2>
<table class="data-table">
  <thead><tr><th>#</th><th>Non-conformité / Écart</th><th>Action corrective</th><th>Responsable</th><th>Délai</th><th>Statut</th></tr></thead>
  <tbody>
    <tr><td>1</td><td><em>À renseigner depuis les constats</em></td><td></td><td></td><td></td><td>À traiter</td></tr>
    <tr><td>2</td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>3</td><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<h2>9. Conclusion</h2>
<p>L'audit environnemental du site <strong>{{nom_site}}</strong> réalisé le {{date_audit}} a permis d'identifier les points de conformité et les axes d'amélioration. La mise en œuvre du plan d'action correctif permettra d'atteindre un niveau de conformité environnementale satisfaisant dans les délais impartis.</p>

<p class="footer">Rapport établi par : {{auditeur}} ({{organisme_auditeur}}) — Date : {{date_audit}}</p>
</div>`,
    countriesJson: COUNTRIES,
    active: true,
    popularity: 42,
  },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const existing = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    if (existing) {
      await prisma.documentTemplate.update({ where: { code: t.code }, data: t });
      updated++;
    } else {
      await prisma.documentTemplate.create({ data: t });
      created++;
    }
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Seed Drive4 Projet & Environnement termine.`);
  console.log(`   Templates du script : ${templates.length} (crees : ${created}, mis a jour : ${updated})`);
  console.log(`   -> Total de templates en base : ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
