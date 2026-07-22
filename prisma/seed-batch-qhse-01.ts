import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let created = 0, updated = 0;

  const templates = [
    // 1
    {
      code: 'document_unique_duer_mines',
      name: 'Document Unique d\'Évaluation des Risques — Mines',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 8000,
      priceMax: 18000,
      popularity: 92,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'raison_sociale', label: 'Raison sociale', type: 'text' },
        { name: 'site_minier', label: 'Nom du site minier', type: 'text' },
        { name: 'responsable_qhse', label: 'Responsable QHSE', type: 'text' },
        { name: 'date_evaluation', label: 'Date d\'évaluation', type: 'date' },
        { name: 'unite_travail', label: 'Unité de travail évaluée', type: 'text' },
        { name: 'description_risques', label: 'Description des risques identifiés', type: 'textarea' },
        { name: 'mesures_prevention', label: 'Mesures de prévention', type: 'textarea' },
        { name: 'date_revision', label: 'Date de prochaine révision', type: 'date' },
      ]),
      body: `<html><body>
<h1>Document Unique d'Évaluation des Risques Professionnels</h1>
<p><strong>Entreprise :</strong> {{raison_sociale}}</p>
<p><strong>Site minier :</strong> {{site_minier}}</p>
<p><strong>Responsable QHSE :</strong> {{responsable_qhse}}</p>
<p><strong>Date d'évaluation :</strong> {{date_evaluation}}</p>
<h2>Unité de travail : {{unite_travail}}</h2>
<h3>Risques identifiés</h3>
<p>{{description_risques}}</p>
<h3>Mesures de prévention</h3>
<p>{{mesures_prevention}}</p>
<p><strong>Prochaine révision :</strong> {{date_revision}}</p>
</body></html>`,
    },
    // 2
    {
      code: 'document_unique_btp_chantier',
      name: 'DUER — Chantier BTP',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 7500,
      priceMax: 17000,
      popularity: 88,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'chantier', label: 'Nom du chantier', type: 'text' },
        { name: 'chef_chantier', label: 'Chef de chantier', type: 'text' },
        { name: 'date_debut', label: 'Date de début des travaux', type: 'date' },
        { name: 'risques_identifies', label: 'Risques identifiés', type: 'textarea' },
        { name: 'actions_correctives', label: 'Actions correctives', type: 'textarea' },
        { name: 'date_mise_jour', label: 'Date de mise à jour', type: 'date' },
      ]),
      body: `<html><body>
<h1>Document Unique d'Évaluation des Risques — Chantier BTP</h1>
<p><strong>Entreprise :</strong> {{entreprise}}</p>
<p><strong>Chantier :</strong> {{chantier}}</p>
<p><strong>Chef de chantier :</strong> {{chef_chantier}}</p>
<p><strong>Date de début :</strong> {{date_debut}}</p>
<h2>Risques identifiés</h2>
<p>{{risques_identifies}}</p>
<h2>Actions correctives</h2>
<p>{{actions_correctives}}</p>
<p><strong>Mis à jour le :</strong> {{date_mise_jour}}</p>
</body></html>`,
    },
    // 3
    {
      code: 'plan_prev_travaux_dangereux',
      name: 'Plan de Prévention — Travaux Dangereux',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 6500,
      priceMax: 15000,
      popularity: 85,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise_utilisatrice', label: 'Entreprise utilisatrice', type: 'text' },
        { name: 'entreprise_exterieure', label: 'Entreprise extérieure', type: 'text' },
        { name: 'nature_travaux', label: 'Nature des travaux', type: 'textarea' },
        { name: 'lieu_travaux', label: 'Lieu des travaux', type: 'text' },
        { name: 'date_debut', label: 'Date de début', type: 'date' },
        { name: 'date_fin', label: 'Date de fin', type: 'date' },
        { name: 'risques_specifiques', label: 'Risques spécifiques', type: 'textarea' },
        { name: 'mesures_communes', label: 'Mesures de prévention communes', type: 'textarea' },
        { name: 'responsable_eu', label: 'Responsable EU', type: 'text' },
        { name: 'responsable_ee', label: 'Responsable EE', type: 'text' },
      ]),
      body: `<html><body>
<h1>Plan de Prévention des Risques</h1>
<table border="1" width="100%">
<tr><td><strong>Entreprise utilisatrice</strong></td><td>{{entreprise_utilisatrice}}</td></tr>
<tr><td><strong>Entreprise extérieure</strong></td><td>{{entreprise_exterieure}}</td></tr>
<tr><td><strong>Nature des travaux</strong></td><td>{{nature_travaux}}</td></tr>
<tr><td><strong>Lieu</strong></td><td>{{lieu_travaux}}</td></tr>
<tr><td><strong>Du</strong></td><td>{{date_debut}}</td><td><strong>Au</strong></td><td>{{date_fin}}</td></tr>
</table>
<h2>Risques spécifiques</h2><p>{{risques_specifiques}}</p>
<h2>Mesures de prévention communes</h2><p>{{mesures_communes}}</p>
<p>Responsable EU : {{responsable_eu}} — Responsable EE : {{responsable_ee}}</p>
</body></html>`,
    },
    // 4
    {
      code: 'permis_feu_industrie',
      name: 'Permis de Feu — Industrie / Mines',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 3500,
      priceMax: 9000,
      popularity: 90,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'demandeur', label: 'Demandeur', type: 'text' },
        { name: 'nature_travaux_feu', label: 'Nature des travaux par points chauds', type: 'textarea' },
        { name: 'localisation', label: 'Localisation précise', type: 'text' },
        { name: 'date_travaux', label: 'Date des travaux', type: 'date' },
        { name: 'heure_debut', label: 'Heure de début (format texte)', type: 'text' },
        { name: 'heure_fin', label: 'Heure de fin (format texte)', type: 'text' },
        { name: 'moyens_extinction', label: 'Moyens d\'extinction disponibles', type: 'textarea' },
        { name: 'autorisateur', label: 'Autorisateur', type: 'text' },
      ]),
      body: `<html><body>
<h1>PERMIS DE FEU</h1>
<p><strong>Site :</strong> {{site}} | <strong>Date :</strong> {{date_travaux}}</p>
<p><strong>Demandeur :</strong> {{demandeur}}</p>
<p><strong>Localisation :</strong> {{localisation}}</p>
<p><strong>Horaires :</strong> {{heure_debut}} → {{heure_fin}}</p>
<h2>Nature des travaux</h2><p>{{nature_travaux_feu}}</p>
<h2>Moyens d'extinction</h2><p>{{moyens_extinction}}</p>
<p><em>Autorisation délivrée par : {{autorisateur}}</em></p>
</body></html>`,
    },
    // 5
    {
      code: 'permis_hauteur_btp',
      name: 'Permis de Travail en Hauteur — BTP',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 3000,
      priceMax: 8500,
      popularity: 87,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'chantier', label: 'Chantier', type: 'text' },
        { name: 'operateur', label: 'Opérateur(s)', type: 'text' },
        { name: 'description_travaux', label: 'Description des travaux en hauteur', type: 'textarea' },
        { name: 'hauteur_travail', label: 'Hauteur de travail (mètres)', type: 'text' },
        { name: 'epi_utilises', label: 'EPI utilisés', type: 'textarea' },
        { name: 'date_permis', label: 'Date du permis', type: 'date' },
        { name: 'superviseur', label: 'Superviseur sécurité', type: 'text' },
      ]),
      body: `<html><body>
<h1>PERMIS DE TRAVAIL EN HAUTEUR</h1>
<p><strong>Chantier :</strong> {{chantier}} | <strong>Date :</strong> {{date_permis}}</p>
<p><strong>Opérateur(s) :</strong> {{operateur}}</p>
<p><strong>Hauteur de travail :</strong> {{hauteur_travail}} m</p>
<h2>Description des travaux</h2><p>{{description_travaux}}</p>
<h2>EPI requis et utilisés</h2><p>{{epi_utilises}}</p>
<p><strong>Superviseur sécurité :</strong> {{superviseur}}</p>
</body></html>`,
    },
    // 6
    {
      code: 'permis_confinement_espace',
      name: 'Permis de Travail en Espace Confiné',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 5000,
      priceMax: 12000,
      popularity: 78,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'description_espace', label: 'Description de l\'espace confiné', type: 'textarea' },
        { name: 'risques_atmospheriques', label: 'Risques atmosphériques détectés', type: 'textarea' },
        { name: 'mesures_ventilation', label: 'Mesures de ventilation', type: 'textarea' },
        { name: 'operateurs', label: 'Opérateurs autorisés', type: 'text' },
        { name: 'date_permis', label: 'Date du permis', type: 'date' },
        { name: 'responsable_securite', label: 'Responsable sécurité', type: 'text' },
      ]),
      body: `<html><body>
<h1>PERMIS DE TRAVAIL EN ESPACE CONFINÉ</h1>
<p><strong>Site :</strong> {{site}} | <strong>Date :</strong> {{date_permis}}</p>
<h2>Espace confiné concerné</h2><p>{{description_espace}}</p>
<h2>Risques atmosphériques</h2><p>{{risques_atmospheriques}}</p>
<h2>Mesures de ventilation</h2><p>{{mesures_ventilation}}</p>
<p><strong>Opérateurs :</strong> {{operateurs}}</p>
<p><strong>Responsable sécurité :</strong> {{responsable_securite}}</p>
</body></html>`,
    },
    // 7
    {
      code: 'permis_fouille_excavation',
      name: 'Permis de Fouille / Excavation',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 3500,
      priceMax: 9000,
      popularity: 75,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'projet', label: 'Projet', type: 'text' },
        { name: 'localisation_fouille', label: 'Localisation de la fouille', type: 'text' },
        { name: 'profondeur', label: 'Profondeur prévue (m)', type: 'text' },
        { name: 'detection_reseaux', label: 'Résultats détection des réseaux', type: 'textarea' },
        { name: 'mesures_etayage', label: 'Mesures d\'étayage / blindage', type: 'textarea' },
        { name: 'date_permis', label: 'Date du permis', type: 'date' },
        { name: 'responsable', label: 'Responsable travaux', type: 'text' },
      ]),
      body: `<html><body>
<h1>PERMIS DE FOUILLE / EXCAVATION</h1>
<p><strong>Projet :</strong> {{projet}} | <strong>Date :</strong> {{date_permis}}</p>
<p><strong>Localisation :</strong> {{localisation_fouille}} | <strong>Profondeur :</strong> {{profondeur}} m</p>
<h2>Détection des réseaux</h2><p>{{detection_reseaux}}</p>
<h2>Mesures d'étayage / blindage</h2><p>{{mesures_etayage}}</p>
<p><strong>Responsable travaux :</strong> {{responsable}}</p>
</body></html>`,
    },
    // 8
    {
      code: 'rapport_accident_travail',
      name: 'Rapport d\'Accident du Travail',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 5500,
      priceMax: 13000,
      popularity: 95,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'victime', label: 'Nom de la victime', type: 'text' },
        { name: 'poste_victime', label: 'Poste de la victime', type: 'text' },
        { name: 'date_accident', label: 'Date de l\'accident', type: 'date' },
        { name: 'lieu_accident', label: 'Lieu de l\'accident', type: 'text' },
        { name: 'description_accident', label: 'Description de l\'accident', type: 'textarea' },
        { name: 'lesions_constatees', label: 'Lésions constatées', type: 'textarea' },
        { name: 'temoins', label: 'Témoins', type: 'text' },
        { name: 'premiers_secours', label: 'Premiers secours prodigués', type: 'textarea' },
        { name: 'causes_identifiees', label: 'Causes identifiées', type: 'textarea' },
        { name: 'actions_correctives', label: 'Actions correctives immédiates', type: 'textarea' },
        { name: 'redacteur', label: 'Rédacteur du rapport', type: 'text' },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date' },
      ]),
      body: `<html><body>
<h1>RAPPORT D'ACCIDENT DU TRAVAIL</h1>
<p><strong>Entreprise :</strong> {{entreprise}}</p>
<h2>Informations sur la victime</h2>
<p><strong>Nom :</strong> {{victime}} | <strong>Poste :</strong> {{poste_victime}}</p>
<h2>Circonstances de l'accident</h2>
<p><strong>Date :</strong> {{date_accident}} | <strong>Lieu :</strong> {{lieu_accident}}</p>
<p>{{description_accident}}</p>
<h2>Lésions constatées</h2><p>{{lesions_constatees}}</p>
<h2>Témoins</h2><p>{{temoins}}</p>
<h2>Premiers secours</h2><p>{{premiers_secours}}</p>
<h2>Analyse des causes</h2><p>{{causes_identifiees}}</p>
<h2>Actions correctives</h2><p>{{actions_correctives}}</p>
<p><em>Rédigé par : {{redacteur}} le {{date_rapport}}</em></p>
</body></html>`,
    },
    // 9
    {
      code: 'rapport_incident_presquaccident',
      name: 'Rapport d\'Incident / Presque-Accident',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 4000,
      priceMax: 10000,
      popularity: 83,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'declarant', label: 'Déclarant', type: 'text' },
        { name: 'date_incident', label: 'Date de l\'incident', type: 'date' },
        { name: 'description_incident', label: 'Description de l\'incident', type: 'textarea' },
        { name: 'consequences_potentielles', label: 'Conséquences potentielles', type: 'textarea' },
        { name: 'causes_immediates', label: 'Causes immédiates', type: 'textarea' },
        { name: 'actions_preventives', label: 'Actions préventives proposées', type: 'textarea' },
        { name: 'responsable_action', label: 'Responsable de l\'action', type: 'text' },
        { name: 'delai_action', label: 'Délai de réalisation', type: 'date' },
      ]),
      body: `<html><body>
<h1>RAPPORT D'INCIDENT / PRESQUE-ACCIDENT</h1>
<p><strong>Site :</strong> {{site}} | <strong>Date :</strong> {{date_incident}}</p>
<p><strong>Déclarant :</strong> {{declarant}}</p>
<h2>Description de l'incident</h2><p>{{description_incident}}</p>
<h2>Conséquences potentielles</h2><p>{{consequences_potentielles}}</p>
<h2>Causes immédiates</h2><p>{{causes_immediates}}</p>
<h2>Actions préventives</h2><p>{{actions_preventives}}</p>
<p><strong>Responsable :</strong> {{responsable_action}} | <strong>Délai :</strong> {{delai_action}}</p>
</body></html>`,
    },
    // 10
    {
      code: 'incident_arbre_causes',
      name: 'Analyse d\'Accident — Arbre des Causes',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 7000,
      priceMax: 16000,
      popularity: 72,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'date_accident', label: 'Date de l\'accident', type: 'date' },
        { name: 'fait_central', label: 'Fait central (événement indésirable)', type: 'textarea' },
        { name: 'faits_precedents', label: 'Faits précédents identifiés', type: 'textarea' },
        { name: 'causes_racines', label: 'Causes racines', type: 'textarea' },
        { name: 'facteurs_organisationnels', label: 'Facteurs organisationnels', type: 'textarea' },
        { name: 'plan_actions', label: 'Plan d\'actions correctives', type: 'textarea' },
        { name: 'animateur', label: 'Animateur de l\'analyse', type: 'text' },
        { name: 'date_analyse', label: 'Date de l\'analyse', type: 'date' },
      ]),
      body: `<html><body>
<h1>ANALYSE D'ACCIDENT — ARBRE DES CAUSES</h1>
<p><strong>Entreprise :</strong> {{entreprise}} | <strong>Date accident :</strong> {{date_accident}}</p>
<h2>1. Fait central</h2><p>{{fait_central}}</p>
<h2>2. Faits précédents</h2><p>{{faits_precedents}}</p>
<h2>3. Causes racines</h2><p>{{causes_racines}}</p>
<h2>4. Facteurs organisationnels</h2><p>{{facteurs_organisationnels}}</p>
<h2>5. Plan d'actions correctives</h2><p>{{plan_actions}}</p>
<p><em>Analyse réalisée par : {{animateur}} le {{date_analyse}}</em></p>
</body></html>`,
    },
    // 11
    {
      code: 'fiche_secu_poste_operateur',
      name: 'Fiche de Poste Sécurité — Opérateur',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 2500,
      priceMax: 7000,
      popularity: 80,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'intitule_poste', label: 'Intitulé du poste', type: 'text' },
        { name: 'service', label: 'Service / Département', type: 'text' },
        { name: 'taches_principales', label: 'Tâches principales', type: 'textarea' },
        { name: 'risques_poste', label: 'Risques liés au poste', type: 'textarea' },
        { name: 'epi_obligatoires', label: 'EPI obligatoires', type: 'textarea' },
        { name: 'consignes_securite', label: 'Consignes de sécurité spécifiques', type: 'textarea' },
        { name: 'date_creation', label: 'Date de création', type: 'date' },
      ]),
      body: `<html><body>
<h1>FICHE DE POSTE SÉCURITÉ</h1>
<p><strong>Poste :</strong> {{intitule_poste}} | <strong>Service :</strong> {{service}}</p>
<h2>Tâches principales</h2><p>{{taches_principales}}</p>
<h2>Risques identifiés</h2><p>{{risques_poste}}</p>
<h2>EPI obligatoires</h2><p>{{epi_obligatoires}}</p>
<h2>Consignes de sécurité</h2><p>{{consignes_securite}}</p>
<p><em>Fiche créée le : {{date_creation}}</em></p>
</body></html>`,
    },
    // 12
    {
      code: 'epi_registre_distribution',
      name: 'Registre de Distribution des EPI',
      category: 'qhse',
      templateType: 'excel',
      classe: 'C',
      price: 2000,
      priceMax: 6000,
      popularity: 88,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'periode', label: 'Période', type: 'text' },
        { name: 'responsable_distribution', label: 'Responsable distribution', type: 'text' },
        { name: 'date_distribution', label: 'Date de distribution', type: 'date' },
        { name: 'liste_beneficiaires', label: 'Liste des bénéficiaires et EPI attribués', type: 'textarea' },
        { name: 'observations', label: 'Observations', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>REGISTRE DE DISTRIBUTION DES EPI</h1>
<p><strong>Site :</strong> {{site}} | <strong>Période :</strong> {{periode}}</p>
<p><strong>Responsable :</strong> {{responsable_distribution}} | <strong>Date :</strong> {{date_distribution}}</p>
<h2>Bénéficiaires et EPI attribués</h2>
<p>{{liste_beneficiaires}}</p>
<h2>Observations</h2><p>{{observations}}</p>
</body></html>`,
    },
    // 13
    {
      code: 'audit_q_interne_iso9001',
      name: 'Rapport d\'Audit Interne ISO 9001',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 9000,
      priceMax: 20000,
      popularity: 76,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisme', label: 'Organisme audité', type: 'text' },
        { name: 'auditeurs', label: 'Auditeurs', type: 'text' },
        { name: 'date_audit', label: 'Date de l\'audit', type: 'date' },
        { name: 'processus_audites', label: 'Processus audités', type: 'textarea' },
        { name: 'constatations_positives', label: 'Constatations positives', type: 'textarea' },
        { name: 'non_conformites', label: 'Non-conformités identifiées', type: 'textarea' },
        { name: 'axes_amelioration', label: 'Axes d\'amélioration', type: 'textarea' },
        { name: 'conclusion', label: 'Conclusion générale', type: 'textarea' },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date' },
      ]),
      body: `<html><body>
<h1>RAPPORT D'AUDIT INTERNE — ISO 9001</h1>
<p><strong>Organisme :</strong> {{organisme}} | <strong>Date audit :</strong> {{date_audit}}</p>
<p><strong>Auditeurs :</strong> {{auditeurs}}</p>
<h2>Processus audités</h2><p>{{processus_audites}}</p>
<h2>Constatations positives (Points forts)</h2><p>{{constatations_positives}}</p>
<h2>Non-conformités</h2><p>{{non_conformites}}</p>
<h2>Axes d'amélioration</h2><p>{{axes_amelioration}}</p>
<h2>Conclusion</h2><p>{{conclusion}}</p>
<p><em>Rapport établi le : {{date_rapport}}</em></p>
</body></html>`,
    },
    // 14
    {
      code: 'audit_q_interne_iso14001',
      name: 'Rapport d\'Audit Interne ISO 14001',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 9000,
      priceMax: 20000,
      popularity: 70,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisme', label: 'Organisme audité', type: 'text' },
        { name: 'auditeurs', label: 'Auditeurs', type: 'text' },
        { name: 'date_audit', label: 'Date de l\'audit', type: 'date' },
        { name: 'aspects_environnementaux', label: 'Aspects environnementaux évalués', type: 'textarea' },
        { name: 'conformites', label: 'Points de conformité', type: 'textarea' },
        { name: 'non_conformites', label: 'Non-conformités environnementales', type: 'textarea' },
        { name: 'plan_actions', label: 'Plan d\'actions correctives', type: 'textarea' },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date' },
      ]),
      body: `<html><body>
<h1>RAPPORT D'AUDIT INTERNE — ISO 14001</h1>
<p><strong>Organisme :</strong> {{organisme}} | <strong>Date :</strong> {{date_audit}}</p>
<p><strong>Auditeurs :</strong> {{auditeurs}}</p>
<h2>Aspects environnementaux évalués</h2><p>{{aspects_environnementaux}}</p>
<h2>Points de conformité</h2><p>{{conformites}}</p>
<h2>Non-conformités</h2><p>{{non_conformites}}</p>
<h2>Plan d'actions</h2><p>{{plan_actions}}</p>
<p><em>Rapport du : {{date_rapport}}</em></p>
</body></html>`,
    },
    // 15
    {
      code: 'audit_q_interne_iso45001',
      name: 'Rapport d\'Audit Interne ISO 45001',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 9500,
      priceMax: 20000,
      popularity: 74,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisme', label: 'Organisme', type: 'text' },
        { name: 'auditeurs', label: 'Auditeurs', type: 'text' },
        { name: 'date_audit', label: 'Date de l\'audit', type: 'date' },
        { name: 'dangers_evalues', label: 'Dangers et risques évalués', type: 'textarea' },
        { name: 'bonnes_pratiques', label: 'Bonnes pratiques observées', type: 'textarea' },
        { name: 'ecarts_constates', label: 'Écarts constatés', type: 'textarea' },
        { name: 'recommandations', label: 'Recommandations', type: 'textarea' },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date' },
      ]),
      body: `<html><body>
<h1>RAPPORT D'AUDIT INTERNE — ISO 45001</h1>
<p><strong>Organisme :</strong> {{organisme}} | <strong>Date :</strong> {{date_audit}}</p>
<p><strong>Auditeurs :</strong> {{auditeurs}}</p>
<h2>Dangers et risques évalués</h2><p>{{dangers_evalues}}</p>
<h2>Bonnes pratiques</h2><p>{{bonnes_pratiques}}</p>
<h2>Écarts constatés</h2><p>{{ecarts_constates}}</p>
<h2>Recommandations</h2><p>{{recommandations}}</p>
<p><em>Rapport du : {{date_rapport}}</em></p>
</body></html>`,
    },
    // 16
    {
      code: 'inspection_chantier_quotidienne',
      name: 'Fiche d\'Inspection Sécurité Chantier — Quotidienne',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'C',
      price: 1500,
      priceMax: 5000,
      popularity: 91,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'chantier', label: 'Chantier', type: 'text' },
        { name: 'inspecteur', label: 'Inspecteur', type: 'text' },
        { name: 'date_inspection', label: 'Date d\'inspection', type: 'date' },
        { name: 'zones_inspectees', label: 'Zones inspectées', type: 'text' },
        { name: 'observations', label: 'Observations / Non-conformités', type: 'textarea' },
        { name: 'actions_immediates', label: 'Actions immédiates prises', type: 'textarea' },
        { name: 'suivi_requis', label: 'Suivi requis', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>INSPECTION SÉCURITÉ CHANTIER — QUOTIDIENNE</h1>
<p><strong>Chantier :</strong> {{chantier}} | <strong>Date :</strong> {{date_inspection}}</p>
<p><strong>Inspecteur :</strong> {{inspecteur}} | <strong>Zones :</strong> {{zones_inspectees}}</p>
<h2>Observations</h2><p>{{observations}}</p>
<h2>Actions immédiates</h2><p>{{actions_immediates}}</p>
<h2>Suivi requis</h2><p>{{suivi_requis}}</p>
</body></html>`,
    },
    // 17
    {
      code: 'inspection_usine_mensuelle',
      name: 'Rapport d\'Inspection Sécurité Usine — Mensuelle',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 4500,
      priceMax: 11000,
      popularity: 79,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'usine', label: 'Usine / Site industriel', type: 'text' },
        { name: 'inspecteur', label: 'Inspecteur HSE', type: 'text' },
        { name: 'mois_annee', label: 'Mois et année', type: 'text' },
        { name: 'date_inspection', label: 'Date d\'inspection', type: 'date' },
        { name: 'points_controles', label: 'Points contrôlés', type: 'textarea' },
        { name: 'non_conformites', label: 'Non-conformités relevées', type: 'textarea' },
        { name: 'actions_correctives', label: 'Actions correctives', type: 'textarea' },
        { name: 'note_globale', label: 'Note globale de sécurité', type: 'text' },
      ]),
      body: `<html><body>
<h1>INSPECTION SÉCURITÉ USINE — {{mois_annee}}</h1>
<p><strong>Site :</strong> {{usine}} | <strong>Date :</strong> {{date_inspection}}</p>
<p><strong>Inspecteur :</strong> {{inspecteur}}</p>
<h2>Points contrôlés</h2><p>{{points_controles}}</p>
<h2>Non-conformités</h2><p>{{non_conformites}}</p>
<h2>Actions correctives</h2><p>{{actions_correctives}}</p>
<p><strong>Note globale sécurité :</strong> {{note_globale}}</p>
</body></html>`,
    },
    // 18
    {
      code: 'hse_rapport_mensuel_securite',
      name: 'Rapport Mensuel Sécurité HSE',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 5000,
      priceMax: 12000,
      popularity: 86,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'mois', label: 'Mois', type: 'text' },
        { name: 'annee', label: 'Année', type: 'text' },
        { name: 'nb_accidents', label: 'Nombre d\'accidents avec arrêt', type: 'text' },
        { name: 'nb_incidents', label: 'Nombre d\'incidents / presqu\'accidents', type: 'text' },
        { name: 'heures_travaillees', label: 'Heures travaillées', type: 'text' },
        { name: 'taux_frequence', label: 'Taux de fréquence', type: 'text' },
        { name: 'taux_gravite', label: 'Taux de gravité', type: 'text' },
        { name: 'actions_realisees', label: 'Actions réalisées ce mois', type: 'textarea' },
        { name: 'objectifs_mois_suivant', label: 'Objectifs mois suivant', type: 'textarea' },
        { name: 'redacteur', label: 'Rédacteur', type: 'text' },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date' },
      ]),
      body: `<html><body>
<h1>RAPPORT MENSUEL SÉCURITÉ HSE — {{mois}} {{annee}}</h1>
<p><strong>Entreprise :</strong> {{entreprise}} | <strong>Site :</strong> {{site}}</p>
<h2>Indicateurs clés</h2>
<table border="1" width="100%">
<tr><th>Accidents (AT)</th><th>Incidents</th><th>Heures travaillées</th><th>TF</th><th>TG</th></tr>
<tr><td>{{nb_accidents}}</td><td>{{nb_incidents}}</td><td>{{heures_travaillees}}</td><td>{{taux_frequence}}</td><td>{{taux_gravite}}</td></tr>
</table>
<h2>Actions réalisées</h2><p>{{actions_realisees}}</p>
<h2>Objectifs du mois suivant</h2><p>{{objectifs_mois_suivant}}</p>
<p><em>Rédigé par : {{redacteur}} le {{date_rapport}}</em></p>
</body></html>`,
    },
    // 19
    {
      code: 'hse_tableau_bord_kpi',
      name: 'Tableau de Bord HSE — Indicateurs Clés',
      category: 'qhse',
      templateType: 'excel',
      classe: 'B',
      price: 6000,
      priceMax: 14000,
      popularity: 84,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'periode', label: 'Période de reporting', type: 'text' },
        { name: 'responsable_hse', label: 'Responsable HSE', type: 'text' },
        { name: 'date_edition', label: 'Date d\'édition', type: 'date' },
        { name: 'indicateurs_securite', label: 'Indicateurs sécurité (accidents, incidents, TF, TG)', type: 'textarea' },
        { name: 'indicateurs_environnement', label: 'Indicateurs environnement', type: 'textarea' },
        { name: 'indicateurs_qualite', label: 'Indicateurs qualité', type: 'textarea' },
        { name: 'commentaires', label: 'Commentaires et analyse', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>TABLEAU DE BORD HSE — {{periode}}</h1>
<p><strong>Entreprise :</strong> {{entreprise}} | <strong>Responsable :</strong> {{responsable_hse}}</p>
<p><strong>Date d'édition :</strong> {{date_edition}}</p>
<h2>Sécurité</h2><p>{{indicateurs_securite}}</p>
<h2>Environnement</h2><p>{{indicateurs_environnement}}</p>
<h2>Qualité</h2><p>{{indicateurs_qualite}}</p>
<h2>Analyse</h2><p>{{commentaires}}</p>
</body></html>`,
    },
    // 20
    {
      code: 'plan_prev_risques_agricole',
      name: 'Plan de Prévention des Risques — Agriculture',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 4000,
      priceMax: 10000,
      popularity: 65,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'exploitation', label: 'Exploitation agricole', type: 'text' },
        { name: 'responsable', label: 'Responsable', type: 'text' },
        { name: 'saison', label: 'Saison / Campagne', type: 'text' },
        { name: 'date_elaboration', label: 'Date d\'élaboration', type: 'date' },
        { name: 'activites_risquees', label: 'Activités à risques identifiées', type: 'textarea' },
        { name: 'risques_chimiques', label: 'Risques chimiques (pesticides, engrais)', type: 'textarea' },
        { name: 'risques_machines', label: 'Risques liés aux machines agricoles', type: 'textarea' },
        { name: 'mesures_prevention', label: 'Mesures de prévention', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>PLAN DE PRÉVENTION DES RISQUES — AGRICULTURE</h1>
<p><strong>Exploitation :</strong> {{exploitation}} | <strong>Saison :</strong> {{saison}}</p>
<p><strong>Responsable :</strong> {{responsable}} | <strong>Date :</strong> {{date_elaboration}}</p>
<h2>Activités à risques</h2><p>{{activites_risquees}}</p>
<h2>Risques chimiques</h2><p>{{risques_chimiques}}</p>
<h2>Risques machines</h2><p>{{risques_machines}}</p>
<h2>Mesures de prévention</h2><p>{{mesures_prevention}}</p>
</body></html>`,
    },
    // 21
    {
      code: 'securite_plan_evacuation',
      name: 'Plan d\'Évacuation et Exercice Incendie',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 4500,
      priceMax: 11000,
      popularity: 81,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site / Établissement', type: 'text' },
        { name: 'responsable_evacuation', label: 'Responsable évacuation', type: 'text' },
        { name: 'date_exercice', label: 'Date de l\'exercice', type: 'date' },
        { name: 'description_plan', label: 'Description du plan d\'évacuation', type: 'textarea' },
        { name: 'points_rassemblement', label: 'Points de rassemblement', type: 'text' },
        { name: 'roles_guides', label: 'Rôles des guides et serre-files', type: 'textarea' },
        { name: 'duree_evacuation', label: 'Durée de l\'évacuation (minutes)', type: 'text' },
        { name: 'observations_exercice', label: 'Observations lors de l\'exercice', type: 'textarea' },
        { name: 'points_amelioration', label: 'Points d\'amélioration identifiés', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>PLAN D'ÉVACUATION ET EXERCICE INCENDIE</h1>
<p><strong>Site :</strong> {{site}} | <strong>Date exercice :</strong> {{date_exercice}}</p>
<p><strong>Responsable évacuation :</strong> {{responsable_evacuation}}</p>
<h2>Plan d'évacuation</h2><p>{{description_plan}}</p>
<p><strong>Points de rassemblement :</strong> {{points_rassemblement}}</p>
<h2>Rôles des acteurs</h2><p>{{roles_guides}}</p>
<h2>Résultats exercice</h2>
<p><strong>Durée évacuation :</strong> {{duree_evacuation}} min</p>
<p>{{observations_exercice}}</p>
<h2>Points d'amélioration</h2><p>{{points_amelioration}}</p>
</body></html>`,
    },
    // 22
    {
      code: 'hse_procedure_consignation',
      name: 'Procédure de Consignation / Déconsignation',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 6000,
      priceMax: 14000,
      popularity: 68,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'equipement', label: 'Équipement concerné', type: 'text' },
        { name: 'technicien', label: 'Technicien responsable', type: 'text' },
        { name: 'date_consignation', label: 'Date de consignation', type: 'date' },
        { name: 'energies_consignees', label: 'Énergies consignées (électrique, hydraulique, etc.)', type: 'textarea' },
        { name: 'etapes_consignation', label: 'Étapes de consignation', type: 'textarea' },
        { name: 'etapes_deconsignation', label: 'Étapes de déconsignation', type: 'textarea' },
        { name: 'date_deconsignation', label: 'Date de déconsignation', type: 'date' },
      ]),
      body: `<html><body>
<h1>PROCÉDURE DE CONSIGNATION / DÉCONSIGNATION</h1>
<p><strong>Site :</strong> {{site}} | <strong>Équipement :</strong> {{equipement}}</p>
<p><strong>Technicien :</strong> {{technicien}}</p>
<h2>Consignation — {{date_consignation}}</h2>
<p><strong>Énergies consignées :</strong> {{energies_consignees}}</p>
<p>{{etapes_consignation}}</p>
<h2>Déconsignation — {{date_deconsignation}}</h2>
<p>{{etapes_deconsignation}}</p>
</body></html>`,
    },
    // 23
    {
      code: 'qhse_plan_action_annuel',
      name: 'Plan d\'Action QHSE Annuel',
      category: 'qhse',
      templateType: 'excel',
      classe: 'A',
      price: 7000,
      priceMax: 16000,
      popularity: 82,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'annee', label: 'Année', type: 'text' },
        { name: 'responsable_qhse', label: 'Responsable QHSE', type: 'text' },
        { name: 'date_elaboration', label: 'Date d\'élaboration', type: 'date' },
        { name: 'objectifs_annuels', label: 'Objectifs annuels QHSE', type: 'textarea' },
        { name: 'actions_planifiees', label: 'Actions planifiées (avec responsables et délais)', type: 'textarea' },
        { name: 'budget_alloue', label: 'Budget alloué', type: 'text' },
        { name: 'indicateurs_suivi', label: 'Indicateurs de suivi', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>PLAN D'ACTION QHSE — {{annee}}</h1>
<p><strong>Entreprise :</strong> {{entreprise}} | <strong>Responsable :</strong> {{responsable_qhse}}</p>
<p><strong>Date :</strong> {{date_elaboration}} | <strong>Budget :</strong> {{budget_alloue}}</p>
<h2>Objectifs annuels</h2><p>{{objectifs_annuels}}</p>
<h2>Actions planifiées</h2><p>{{actions_planifiees}}</p>
<h2>Indicateurs de suivi</h2><p>{{indicateurs_suivi}}</p>
</body></html>`,
    },
    // 24
    {
      code: 'fiche_secu_sensibilisation_ouvriers',
      name: 'Fiche de Sensibilisation Sécurité — Ouvriers',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'C',
      price: 1500,
      priceMax: 5000,
      popularity: 90,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'theme', label: 'Thème de sensibilisation', type: 'text' },
        { name: 'site', label: 'Site / Chantier', type: 'text' },
        { name: 'animateur', label: 'Animateur', type: 'text' },
        { name: 'date_session', label: 'Date de la session', type: 'date' },
        { name: 'participants', label: 'Liste des participants', type: 'textarea' },
        { name: 'messages_cles', label: 'Messages clés de sécurité', type: 'textarea' },
        { name: 'consignes_pratiques', label: 'Consignes pratiques', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>FICHE DE SENSIBILISATION SÉCURITÉ</h1>
<p><strong>Thème :</strong> {{theme}}</p>
<p><strong>Site :</strong> {{site}} | <strong>Date :</strong> {{date_session}}</p>
<p><strong>Animateur :</strong> {{animateur}}</p>
<h2>Participants</h2><p>{{participants}}</p>
<h2>Messages clés</h2><p>{{messages_cles}}</p>
<h2>Consignes pratiques</h2><p>{{consignes_pratiques}}</p>
</body></html>`,
    },
    // 25
    {
      code: 'risque_fds_produit_chimique',
      name: 'Fiche de Données Sécurité (FDS) — Produit Chimique',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 5500,
      priceMax: 13000,
      popularity: 77,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'nom_produit', label: 'Nom du produit', type: 'text' },
        { name: 'fournisseur', label: 'Fournisseur', type: 'text' },
        { name: 'date_fds', label: 'Date de la FDS', type: 'date' },
        { name: 'composition', label: 'Composition / Informations sur les composants', type: 'textarea' },
        { name: 'dangers', label: 'Identification des dangers', type: 'textarea' },
        { name: 'premiers_secours_chimique', label: 'Mesures de premiers secours', type: 'textarea' },
        { name: 'mesures_incendie', label: 'Mesures de lutte contre l\'incendie', type: 'textarea' },
        { name: 'stockage', label: 'Conditions de stockage', type: 'textarea' },
        { name: 'epi_chimique', label: 'EPI requis', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>FICHE DE DONNÉES SÉCURITÉ (FDS)</h1>
<p><strong>Produit :</strong> {{nom_produit}} | <strong>Fournisseur :</strong> {{fournisseur}}</p>
<p><strong>Date FDS :</strong> {{date_fds}}</p>
<h2>Composition</h2><p>{{composition}}</p>
<h2>Identification des dangers</h2><p>{{dangers}}</p>
<h2>Premiers secours</h2><p>{{premiers_secours_chimique}}</p>
<h2>Lutte contre l'incendie</h2><p>{{mesures_incendie}}</p>
<h2>Stockage</h2><p>{{stockage}}</p>
<h2>EPI requis</h2><p>{{epi_chimique}}</p>
</body></html>`,
    },
    // 26
    {
      code: 'hse_gestion_dechets_procedure',
      name: 'Procédure de Gestion des Déchets Industriels',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 5000,
      priceMax: 12000,
      popularity: 71,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site industriel', type: 'text' },
        { name: 'responsable_env', label: 'Responsable environnement', type: 'text' },
        { name: 'date_procedure', label: 'Date de la procédure', type: 'date' },
        { name: 'types_dechets', label: 'Types de déchets produits', type: 'textarea' },
        { name: 'tri_collecte', label: 'Procédure de tri et collecte', type: 'textarea' },
        { name: 'stockage_temporaire', label: 'Stockage temporaire', type: 'textarea' },
        { name: 'filiere_elimination', label: 'Filière d\'élimination / valorisation', type: 'textarea' },
        { name: 'prestataire', label: 'Prestataire agréé', type: 'text' },
      ]),
      body: `<html><body>
<h1>PROCÉDURE DE GESTION DES DÉCHETS INDUSTRIELS</h1>
<p><strong>Site :</strong> {{site}} | <strong>Date :</strong> {{date_procedure}}</p>
<p><strong>Responsable environnement :</strong> {{responsable_env}}</p>
<h2>Types de déchets produits</h2><p>{{types_dechets}}</p>
<h2>Tri et collecte</h2><p>{{tri_collecte}}</p>
<h2>Stockage temporaire</h2><p>{{stockage_temporaire}}</p>
<h2>Filière d'élimination</h2><p>{{filiere_elimination}}</p>
<p><strong>Prestataire agréé :</strong> {{prestataire}}</p>
</body></html>`,
    },
    // 27
    {
      code: 'iso_surveillance_env_rapport',
      name: 'Rapport de Surveillance Environnementale',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 8000,
      priceMax: 18000,
      popularity: 66,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'periode', label: 'Période de surveillance', type: 'text' },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date' },
        { name: 'parametres_mesures', label: 'Paramètres mesurés (air, eau, sol, bruit)', type: 'textarea' },
        { name: 'resultats_mesures', label: 'Résultats des mesures', type: 'textarea' },
        { name: 'comparaison_normes', label: 'Comparaison aux normes en vigueur', type: 'textarea' },
        { name: 'mesures_correctives', label: 'Mesures correctives si dépassement', type: 'textarea' },
        { name: 'redacteur', label: 'Rédacteur', type: 'text' },
      ]),
      body: `<html><body>
<h1>RAPPORT DE SURVEILLANCE ENVIRONNEMENTALE</h1>
<p><strong>Site :</strong> {{site}} | <strong>Période :</strong> {{periode}}</p>
<p><strong>Date :</strong> {{date_rapport}} | <strong>Rédacteur :</strong> {{redacteur}}</p>
<h2>Paramètres mesurés</h2><p>{{parametres_mesures}}</p>
<h2>Résultats</h2><p>{{resultats_mesures}}</p>
<h2>Comparaison aux normes</h2><p>{{comparaison_normes}}</p>
<h2>Mesures correctives</h2><p>{{mesures_correctives}}</p>
</body></html>`,
    },
    // 28
    {
      code: 'dpi_registre_formations_securite',
      name: 'Registre des Formations Sécurité',
      category: 'qhse',
      templateType: 'excel',
      classe: 'C',
      price: 2500,
      priceMax: 7000,
      popularity: 89,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'annee', label: 'Année', type: 'text' },
        { name: 'responsable_formation', label: 'Responsable formation', type: 'text' },
        { name: 'date_edition', label: 'Date d\'édition', type: 'date' },
        { name: 'formations_realisees', label: 'Formations réalisées (thème, date, participants, formateur)', type: 'textarea' },
        { name: 'formations_planifiees', label: 'Formations planifiées', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>REGISTRE DES FORMATIONS SÉCURITÉ — {{annee}}</h1>
<p><strong>Entreprise :</strong> {{entreprise}} | <strong>Responsable :</strong> {{responsable_formation}}</p>
<p><strong>Édité le :</strong> {{date_edition}}</p>
<h2>Formations réalisées</h2><p>{{formations_realisees}}</p>
<h2>Formations planifiées</h2><p>{{formations_planifiees}}</p>
</body></html>`,
    },
    // 29
    {
      code: 'qhse_non_conformite_fiche',
      name: 'Fiche de Non-Conformité QHSE',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 3000,
      priceMax: 8000,
      popularity: 83,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'reference_nc', label: 'Référence NC', type: 'text' },
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'detecteur', label: 'Détecteur de la NC', type: 'text' },
        { name: 'date_detection', label: 'Date de détection', type: 'date' },
        { name: 'description_nc', label: 'Description de la non-conformité', type: 'textarea' },
        { name: 'cause_nc', label: 'Cause de la non-conformité', type: 'textarea' },
        { name: 'action_corrective', label: 'Action corrective mise en place', type: 'textarea' },
        { name: 'responsable_action', label: 'Responsable de l\'action', type: 'text' },
        { name: 'date_cloture', label: 'Date de clôture prévue', type: 'date' },
        { name: 'efficacite_action', label: 'Vérification de l\'efficacité', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>FICHE DE NON-CONFORMITÉ QHSE — Réf : {{reference_nc}}</h1>
<p><strong>Site :</strong> {{site}} | <strong>Détecté par :</strong> {{detecteur}} | <strong>Date :</strong> {{date_detection}}</p>
<h2>Description</h2><p>{{description_nc}}</p>
<h2>Cause</h2><p>{{cause_nc}}</p>
<h2>Action corrective</h2><p>{{action_corrective}}</p>
<p><strong>Responsable :</strong> {{responsable_action}} | <strong>Clôture prévue :</strong> {{date_cloture}}</p>
<h2>Vérification efficacité</h2><p>{{efficacite_action}}</p>
</body></html>`,
    },
    // 30
    {
      code: 'securite_plan_gestion_produits_chimiques',
      name: 'Plan de Gestion des Produits Chimiques',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 7500,
      priceMax: 17000,
      popularity: 69,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'responsable', label: 'Responsable chimique', type: 'text' },
        { name: 'date_plan', label: 'Date du plan', type: 'date' },
        { name: 'inventaire_produits', label: 'Inventaire des produits chimiques', type: 'textarea' },
        { name: 'risques_chimiques', label: 'Évaluation des risques chimiques', type: 'textarea' },
        { name: 'conditions_stockage', label: 'Conditions de stockage et compatibilité', type: 'textarea' },
        { name: 'procedures_urgence', label: 'Procédures d\'urgence en cas de déversement', type: 'textarea' },
        { name: 'elimination_dechets', label: 'Élimination des déchets chimiques', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>PLAN DE GESTION DES PRODUITS CHIMIQUES</h1>
<p><strong>Site :</strong> {{site}} | <strong>Responsable :</strong> {{responsable}} | <strong>Date :</strong> {{date_plan}}</p>
<h2>Inventaire des produits</h2><p>{{inventaire_produits}}</p>
<h2>Évaluation des risques</h2><p>{{risques_chimiques}}</p>
<h2>Conditions de stockage</h2><p>{{conditions_stockage}}</p>
<h2>Procédures d'urgence</h2><p>{{procedures_urgence}}</p>
<h2>Élimination des déchets</h2><p>{{elimination_dechets}}</p>
</body></html>`,
    },
    // 31
    {
      code: 'accident_declaration_at_cerfa',
      name: 'Déclaration d\'Accident du Travail (modèle Afrique)',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 5000,
      priceMax: 12000,
      popularity: 94,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'employeur', label: 'Employeur', type: 'text' },
        { name: 'secteur_activite', label: 'Secteur d\'activité', type: 'text' },
        { name: 'victime_nom', label: 'Nom de la victime', type: 'text' },
        { name: 'victime_prenom', label: 'Prénom de la victime', type: 'text' },
        { name: 'date_naissance', label: 'Date de naissance', type: 'date' },
        { name: 'date_accident', label: 'Date de l\'accident', type: 'date' },
        { name: 'heure_accident', label: 'Heure de l\'accident', type: 'text' },
        { name: 'lieu_accident', label: 'Lieu de l\'accident', type: 'text' },
        { name: 'nature_lesion', label: 'Nature de la lésion', type: 'textarea' },
        { name: 'siege_lesion', label: 'Siège de la lésion', type: 'text' },
        { name: 'arret_travail', label: 'Arrêt de travail (oui/non et durée)', type: 'text' },
        { name: 'medecin', label: 'Médecin ayant constaté', type: 'text' },
        { name: 'date_declaration', label: 'Date de déclaration', type: 'date' },
      ]),
      body: `<html><body>
<h1>DÉCLARATION D'ACCIDENT DU TRAVAIL</h1>
<p><strong>Employeur :</strong> {{employeur}} | <strong>Secteur :</strong> {{secteur_activite}}</p>
<h2>Victime</h2>
<p>{{victime_nom}} {{victime_prenom}} — Né(e) le : {{date_naissance}}</p>
<h2>Accident</h2>
<p><strong>Date :</strong> {{date_accident}} | <strong>Heure :</strong> {{heure_accident}} | <strong>Lieu :</strong> {{lieu_accident}}</p>
<h2>Lésions</h2>
<p><strong>Nature :</strong> {{nature_lesion}} | <strong>Siège :</strong> {{siege_lesion}}</p>
<p><strong>Arrêt de travail :</strong> {{arret_travail}}</p>
<p><strong>Médecin :</strong> {{medecin}}</p>
<p><em>Déclaré le : {{date_declaration}}</em></p>
</body></html>`,
    },
    // 32
    {
      code: 'hse_suivi_actions_correctives',
      name: 'Tableau de Suivi des Actions Correctives QHSE',
      category: 'qhse',
      templateType: 'excel',
      classe: 'B',
      price: 4000,
      priceMax: 10000,
      popularity: 87,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'periode', label: 'Période', type: 'text' },
        { name: 'responsable_suivi', label: 'Responsable du suivi', type: 'text' },
        { name: 'date_edition', label: 'Date d\'édition', type: 'date' },
        { name: 'actions_en_cours', label: 'Actions en cours (description, responsable, délai)', type: 'textarea' },
        { name: 'actions_cloturees', label: 'Actions clôturées ce mois', type: 'textarea' },
        { name: 'actions_en_retard', label: 'Actions en retard', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>SUIVI DES ACTIONS CORRECTIVES QHSE — {{periode}}</h1>
<p><strong>Site :</strong> {{site}} | <strong>Responsable :</strong> {{responsable_suivi}} | <strong>Date :</strong> {{date_edition}}</p>
<h2>Actions en cours</h2><p>{{actions_en_cours}}</p>
<h2>Actions clôturées</h2><p>{{actions_cloturees}}</p>
<h2>Actions en retard</h2><p>{{actions_en_retard}}</p>
</body></html>`,
    },
    // 33
    {
      code: 'risque_analyse_travaux_mines',
      name: 'Analyse des Risques — Travaux Miniers',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 10000,
      priceMax: 22000,
      popularity: 73,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'mine', label: 'Mine / Site minier', type: 'text' },
        { name: 'zone_exploitation', label: 'Zone d\'exploitation', type: 'text' },
        { name: 'type_travaux', label: 'Type de travaux miniers', type: 'textarea' },
        { name: 'date_analyse', label: 'Date de l\'analyse', type: 'date' },
        { name: 'risques_effondrements', label: 'Risques d\'éboulements / effondrements', type: 'textarea' },
        { name: 'risques_explosifs', label: 'Risques liés aux explosifs et tirs', type: 'textarea' },
        { name: 'risques_gaz', label: 'Risques gaz et poussières', type: 'textarea' },
        { name: 'risques_inondation', label: 'Risques d\'inondation', type: 'textarea' },
        { name: 'mesures_prevention', label: 'Mesures de prévention spécifiques', type: 'textarea' },
        { name: 'responsable', label: 'Responsable sécurité mine', type: 'text' },
      ]),
      body: `<html><body>
<h1>ANALYSE DES RISQUES — TRAVAUX MINIERS</h1>
<p><strong>Mine :</strong> {{mine}} | <strong>Zone :</strong> {{zone_exploitation}}</p>
<p><strong>Type de travaux :</strong> {{type_travaux}} | <strong>Date :</strong> {{date_analyse}}</p>
<h2>Risques d'éboulements</h2><p>{{risques_effondrements}}</p>
<h2>Risques explosifs et tirs</h2><p>{{risques_explosifs}}</p>
<h2>Risques gaz et poussières</h2><p>{{risques_gaz}}</p>
<h2>Risques d'inondation</h2><p>{{risques_inondation}}</p>
<h2>Mesures de prévention</h2><p>{{mesures_prevention}}</p>
<p><strong>Responsable sécurité :</strong> {{responsable}}</p>
</body></html>`,
    },
    // 34
    {
      code: 'inspection_echafaudages_chantier',
      name: 'Fiche d\'Inspection des Échafaudages',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 3000,
      priceMax: 8000,
      popularity: 76,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'chantier', label: 'Chantier', type: 'text' },
        { name: 'type_echafaudage', label: 'Type d\'échafaudage', type: 'text' },
        { name: 'inspecteur', label: 'Inspecteur', type: 'text' },
        { name: 'date_inspection', label: 'Date d\'inspection', type: 'date' },
        { name: 'etat_structure', label: 'État de la structure', type: 'textarea' },
        { name: 'conformites', label: 'Points de conformité', type: 'textarea' },
        { name: 'defauts_constates', label: 'Défauts constatés', type: 'textarea' },
        { name: 'aptitude_utilisation', label: 'Aptitude à l\'utilisation (oui/non)', type: 'text' },
      ]),
      body: `<html><body>
<h1>FICHE D'INSPECTION DES ÉCHAFAUDAGES</h1>
<p><strong>Chantier :</strong> {{chantier}} | <strong>Type :</strong> {{type_echafaudage}}</p>
<p><strong>Inspecteur :</strong> {{inspecteur}} | <strong>Date :</strong> {{date_inspection}}</p>
<h2>État de la structure</h2><p>{{etat_structure}}</p>
<h2>Points de conformité</h2><p>{{conformites}}</p>
<h2>Défauts constatés</h2><p>{{defauts_constates}}</p>
<p><strong>Aptitude à l'utilisation :</strong> {{aptitude_utilisation}}</p>
</body></html>`,
    },
    // 35
    {
      code: 'hse_rapport_annuel_performance',
      name: 'Rapport Annuel de Performance QHSE',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 12000,
      priceMax: 28000,
      popularity: 80,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'annee', label: 'Année', type: 'text' },
        { name: 'directeur_qhse', label: 'Directeur QHSE', type: 'text' },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date' },
        { name: 'bilan_securite', label: 'Bilan sécurité (accidents, incidents, KPIs)', type: 'textarea' },
        { name: 'bilan_environnement', label: 'Bilan environnemental', type: 'textarea' },
        { name: 'bilan_qualite', label: 'Bilan qualité', type: 'textarea' },
        { name: 'realisations_majeures', label: 'Réalisations majeures', type: 'textarea' },
        { name: 'objectifs_annee_suivante', label: 'Objectifs de l\'année suivante', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>RAPPORT ANNUEL DE PERFORMANCE QHSE — {{annee}}</h1>
<p><strong>Entreprise :</strong> {{entreprise}} | <strong>Directeur QHSE :</strong> {{directeur_qhse}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h2>Bilan Sécurité</h2><p>{{bilan_securite}}</p>
<h2>Bilan Environnemental</h2><p>{{bilan_environnement}}</p>
<h2>Bilan Qualité</h2><p>{{bilan_qualite}}</p>
<h2>Réalisations majeures</h2><p>{{realisations_majeures}}</p>
<h2>Objectifs {{annee}} +1</h2><p>{{objectifs_annee_suivante}}</p>
</body></html>`,
    },
    // 36
    {
      code: 'dpi_bilan_medical_travail',
      name: 'Bilan de Médecine du Travail — Site Industriel',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 6000,
      priceMax: 14000,
      popularity: 64,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site industriel', type: 'text' },
        { name: 'medecin_travail', label: 'Médecin du travail', type: 'text' },
        { name: 'periode', label: 'Période du bilan', type: 'text' },
        { name: 'date_bilan', label: 'Date du bilan', type: 'date' },
        { name: 'visites_medicales', label: 'Visites médicales réalisées', type: 'textarea' },
        { name: 'maladies_professionnelles', label: 'Maladies professionnelles déclarées', type: 'textarea' },
        { name: 'inaptitudes', label: 'Inaptitudes constatées', type: 'textarea' },
        { name: 'recommandations', label: 'Recommandations', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>BILAN DE MÉDECINE DU TRAVAIL — {{periode}}</h1>
<p><strong>Site :</strong> {{site}} | <strong>Médecin :</strong> {{medecin_travail}} | <strong>Date :</strong> {{date_bilan}}</p>
<h2>Visites médicales</h2><p>{{visites_medicales}}</p>
<h2>Maladies professionnelles</h2><p>{{maladies_professionnelles}}</p>
<h2>Inaptitudes</h2><p>{{inaptitudes}}</p>
<h2>Recommandations</h2><p>{{recommandations}}</p>
</body></html>`,
    },
    // 37
    {
      code: 'qhse_procedure_gestion_urgence',
      name: 'Procédure de Gestion des Situations d\'Urgence',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 7000,
      priceMax: 16000,
      popularity: 85,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'responsable', label: 'Responsable HSE', type: 'text' },
        { name: 'date_procedure', label: 'Date de la procédure', type: 'date' },
        { name: 'scenarios_urgence', label: 'Scénarios d\'urgence identifiés', type: 'textarea' },
        { name: 'contacts_urgence', label: 'Contacts d\'urgence (pompiers, SAMU, gendarmerie)', type: 'textarea' },
        { name: 'chaine_alerte', label: 'Chaîne d\'alerte interne', type: 'textarea' },
        { name: 'ressources_disponibles', label: 'Ressources disponibles', type: 'textarea' },
        { name: 'exercices_planifies', label: 'Exercices planifiés', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>PROCÉDURE DE GESTION DES SITUATIONS D'URGENCE</h1>
<p><strong>Site :</strong> {{site}} | <strong>Responsable :</strong> {{responsable}} | <strong>Date :</strong> {{date_procedure}}</p>
<h2>Scénarios d'urgence</h2><p>{{scenarios_urgence}}</p>
<h2>Contacts d'urgence</h2><p>{{contacts_urgence}}</p>
<h2>Chaîne d'alerte</h2><p>{{chaine_alerte}}</p>
<h2>Ressources disponibles</h2><p>{{ressources_disponibles}}</p>
<h2>Exercices planifiés</h2><p>{{exercices_planifies}}</p>
</body></html>`,
    },
    // 38
    {
      code: 'hse_analyse_risques_job_safety',
      name: 'Analyse Sécurité au Poste de Travail (JSA)',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 4500,
      priceMax: 11000,
      popularity: 78,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'tache', label: 'Tâche analysée', type: 'text' },
        { name: 'departement', label: 'Département', type: 'text' },
        { name: 'analyste', label: 'Analyste', type: 'text' },
        { name: 'date_jsa', label: 'Date JSA', type: 'date' },
        { name: 'etapes_tache', label: 'Étapes de la tâche', type: 'textarea' },
        { name: 'risques_par_etape', label: 'Risques identifiés par étape', type: 'textarea' },
        { name: 'controles_proposés', label: 'Contrôles proposés', type: 'textarea' },
        { name: 'epi_requis', label: 'EPI requis', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>JOB SAFETY ANALYSIS (JSA)</h1>
<p><strong>Tâche :</strong> {{tache}} | <strong>Département :</strong> {{departement}}</p>
<p><strong>Analyste :</strong> {{analyste}} | <strong>Date :</strong> {{date_jsa}}</p>
<h2>Étapes de la tâche</h2><p>{{etapes_tache}}</p>
<h2>Risques par étape</h2><p>{{risques_par_etape}}</p>
<h2>Contrôles proposés</h2><p>{{controles_proposés}}</p>
<h2>EPI requis</h2><p>{{epi_requis}}</p>
</body></html>`,
    },
    // 39
    {
      code: 'securite_rapport_inspection_electrique',
      name: 'Rapport d\'Inspection Électrique — Sécurité',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 5000,
      priceMax: 12000,
      popularity: 72,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'inspecteur', label: 'Inspecteur électricien', type: 'text' },
        { name: 'date_inspection', label: 'Date d\'inspection', type: 'date' },
        { name: 'installations_inspectees', label: 'Installations inspectées', type: 'textarea' },
        { name: 'conformites', label: 'Conformités constatées', type: 'textarea' },
        { name: 'anomalies', label: 'Anomalies et risques électriques', type: 'textarea' },
        { name: 'travaux_requis', label: 'Travaux de mise en conformité requis', type: 'textarea' },
        { name: 'priorite', label: 'Priorité d\'intervention', type: 'text' },
      ]),
      body: `<html><body>
<h1>RAPPORT D'INSPECTION ÉLECTRIQUE</h1>
<p><strong>Site :</strong> {{site}} | <strong>Inspecteur :</strong> {{inspecteur}} | <strong>Date :</strong> {{date_inspection}}</p>
<h2>Installations inspectées</h2><p>{{installations_inspectees}}</p>
<h2>Conformités</h2><p>{{conformites}}</p>
<h2>Anomalies / Risques</h2><p>{{anomalies}}</p>
<h2>Travaux requis</h2><p>{{travaux_requis}}</p>
<p><strong>Priorité :</strong> {{priorite}}</p>
</body></html>`,
    },
    // 40
    {
      code: 'qhse_politique_sante_securite',
      name: 'Politique de Santé et Sécurité au Travail',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 8000,
      priceMax: 18000,
      popularity: 88,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'secteur', label: 'Secteur d\'activité', type: 'text' },
        { name: 'dirigeant', label: 'Nom du dirigeant', type: 'text' },
        { name: 'date_politique', label: 'Date de la politique', type: 'date' },
        { name: 'engagements', label: 'Engagements de la direction', type: 'textarea' },
        { name: 'objectifs_sst', label: 'Objectifs SST', type: 'textarea' },
        { name: 'ressources', label: 'Ressources allouées', type: 'textarea' },
        { name: 'date_revision', label: 'Date de prochaine révision', type: 'date' },
      ]),
      body: `<html><body>
<h1>POLITIQUE DE SANTÉ ET SÉCURITÉ AU TRAVAIL</h1>
<p><strong>Entreprise :</strong> {{entreprise}} | <strong>Secteur :</strong> {{secteur}}</p>
<p><strong>Dirigeant :</strong> {{dirigeant}} | <strong>Date :</strong> {{date_politique}}</p>
<h2>Engagements de la direction</h2><p>{{engagements}}</p>
<h2>Objectifs SST</h2><p>{{objectifs_sst}}</p>
<h2>Ressources allouées</h2><p>{{ressources}}</p>
<p><em>Prochaine révision : {{date_revision}}</em></p>
</body></html>`,
    },
    // 41
    {
      code: 'hse_fiche_poste_cariste',
      name: 'Fiche Sécurité Poste — Cariste / Engin de Levage',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 2500,
      priceMax: 7000,
      popularity: 82,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'engin', label: 'Type d\'engin (chariot élévateur, grue, etc.)', type: 'text' },
        { name: 'operateur', label: 'Opérateur désigné', type: 'text' },
        { name: 'date_fiche', label: 'Date de la fiche', type: 'date' },
        { name: 'zones_circulation', label: 'Zones de circulation autorisées', type: 'textarea' },
        { name: 'regles_securite', label: 'Règles de sécurité spécifiques', type: 'textarea' },
        { name: 'maintenance_preventive', label: 'Contrôles et maintenance préventive', type: 'textarea' },
        { name: 'epi_obligatoires', label: 'EPI obligatoires', type: 'text' },
      ]),
      body: `<html><body>
<h1>FICHE SÉCURITÉ POSTE — CARISTE / ENGINS DE LEVAGE</h1>
<p><strong>Site :</strong> {{site}} | <strong>Engin :</strong> {{engin}}</p>
<p><strong>Opérateur :</strong> {{operateur}} | <strong>Date :</strong> {{date_fiche}}</p>
<h2>Zones de circulation autorisées</h2><p>{{zones_circulation}}</p>
<h2>Règles de sécurité</h2><p>{{regles_securite}}</p>
<h2>Maintenance préventive</h2><p>{{maintenance_preventive}}</p>
<p><strong>EPI obligatoires :</strong> {{epi_obligatoires}}</p>
</body></html>`,
    },
    // 42
    {
      code: 'iso_procedure_revue_direction',
      name: 'Procédure de Revue de Direction QHSE',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 8500,
      priceMax: 19000,
      popularity: 67,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'organisme', label: 'Organisme', type: 'text' },
        { name: 'date_revue', label: 'Date de la revue', type: 'date' },
        { name: 'participants', label: 'Participants', type: 'textarea' },
        { name: 'ordre_du_jour', label: 'Ordre du jour', type: 'textarea' },
        { name: 'resultats_audits', label: 'Résultats des audits internes', type: 'textarea' },
        { name: 'performance_processus', label: 'Performance des processus', type: 'textarea' },
        { name: 'retours_parties_interessees', label: 'Retours des parties intéressées', type: 'textarea' },
        { name: 'decisions_actions', label: 'Décisions et actions de la revue', type: 'textarea' },
        { name: 'date_prochaine_revue', label: 'Date prochaine revue', type: 'date' },
      ]),
      body: `<html><body>
<h1>REVUE DE DIRECTION QHSE</h1>
<p><strong>Organisme :</strong> {{organisme}} | <strong>Date :</strong> {{date_revue}}</p>
<h2>Participants</h2><p>{{participants}}</p>
<h2>Ordre du jour</h2><p>{{ordre_du_jour}}</p>
<h2>Résultats des audits</h2><p>{{resultats_audits}}</p>
<h2>Performance des processus</h2><p>{{performance_processus}}</p>
<h2>Retours parties intéressées</h2><p>{{retours_parties_interessees}}</p>
<h2>Décisions et actions</h2><p>{{decisions_actions}}</p>
<p><em>Prochaine revue : {{date_prochaine_revue}}</em></p>
</body></html>`,
    },
    // 43
    {
      code: 'securite_fiche_habilitation_electrique',
      name: 'Fiche d\'Habilitation Électrique',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 3500,
      priceMax: 9000,
      popularity: 75,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'titulaire', label: 'Titulaire de l\'habilitation', type: 'text' },
        { name: 'niveau_habilitation', label: 'Niveau d\'habilitation (B1, B2, BR, BC, H...)', type: 'text' },
        { name: 'date_delivrance', label: 'Date de délivrance', type: 'date' },
        { name: 'date_expiration', label: 'Date d\'expiration', type: 'date' },
        { name: 'formations_suivies', label: 'Formations suivies', type: 'textarea' },
        { name: 'domaines_autorises', label: 'Domaines d\'intervention autorisés', type: 'textarea' },
        { name: 'signataire', label: 'Signataire (employeur)', type: 'text' },
      ]),
      body: `<html><body>
<h1>FICHE D'HABILITATION ÉLECTRIQUE</h1>
<p><strong>Entreprise :</strong> {{entreprise}}</p>
<p><strong>Titulaire :</strong> {{titulaire}} | <strong>Niveau :</strong> {{niveau_habilitation}}</p>
<p><strong>Délivrée le :</strong> {{date_delivrance}} | <strong>Expire le :</strong> {{date_expiration}}</p>
<h2>Formations suivies</h2><p>{{formations_suivies}}</p>
<h2>Domaines d'intervention autorisés</h2><p>{{domaines_autorises}}</p>
<p><strong>Signataire :</strong> {{signataire}}</p>
</body></html>`,
    },
    // 44
    {
      code: 'qhse_plan_prevention_risques_psycho',
      name: 'Plan de Prévention des Risques Psychosociaux (RPS)',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 6000,
      priceMax: 14000,
      popularity: 62,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'responsable', label: 'Responsable RH / QHSE', type: 'text' },
        { name: 'date_plan', label: 'Date du plan', type: 'date' },
        { name: 'facteurs_rps', label: 'Facteurs de risques psychosociaux identifiés', type: 'textarea' },
        { name: 'population_cibles', label: 'Populations ciblées', type: 'textarea' },
        { name: 'actions_prevention', label: 'Actions de prévention', type: 'textarea' },
        { name: 'indicateurs_suivi', label: 'Indicateurs de suivi', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>PLAN DE PRÉVENTION DES RISQUES PSYCHOSOCIAUX</h1>
<p><strong>Entreprise :</strong> {{entreprise}} | <strong>Responsable :</strong> {{responsable}} | <strong>Date :</strong> {{date_plan}}</p>
<h2>Facteurs de RPS identifiés</h2><p>{{facteurs_rps}}</p>
<h2>Populations ciblées</h2><p>{{population_cibles}}</p>
<h2>Actions de prévention</h2><p>{{actions_prevention}}</p>
<h2>Indicateurs de suivi</h2><p>{{indicateurs_suivi}}</p>
</body></html>`,
    },
    // 45
    {
      code: 'hse_registre_presences_exercice',
      name: 'Registre de Présence — Exercice d\'Évacuation',
      category: 'qhse',
      templateType: 'excel',
      classe: 'C',
      price: 1500,
      priceMax: 5000,
      popularity: 79,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'date_exercice', label: 'Date de l\'exercice', type: 'date' },
        { name: 'responsable', label: 'Responsable évacuation', type: 'text' },
        { name: 'liste_presents', label: 'Liste des présents', type: 'textarea' },
        { name: 'absents', label: 'Absents', type: 'textarea' },
        { name: 'observations', label: 'Observations', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>REGISTRE DE PRÉSENCE — EXERCICE D'ÉVACUATION</h1>
<p><strong>Site :</strong> {{site}} | <strong>Date :</strong> {{date_exercice}}</p>
<p><strong>Responsable :</strong> {{responsable}}</p>
<h2>Présents</h2><p>{{liste_presents}}</p>
<h2>Absents</h2><p>{{absents}}</p>
<h2>Observations</h2><p>{{observations}}</p>
</body></html>`,
    },
    // 46
    {
      code: 'risque_bruit_rapport_mesurage',
      name: 'Rapport de Mesurage du Bruit — Ambiance de Travail',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 5500,
      priceMax: 13000,
      popularity: 61,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'operateur_mesure', label: 'Opérateur de mesure', type: 'text' },
        { name: 'date_mesure', label: 'Date de mesure', type: 'date' },
        { name: 'postes_mesures', label: 'Postes mesurés', type: 'textarea' },
        { name: 'niveaux_sonores', label: 'Niveaux sonores enregistrés (dB)', type: 'textarea' },
        { name: 'comparaison_valeurs_limites', label: 'Comparaison aux valeurs limites d\'exposition', type: 'textarea' },
        { name: 'recommandations', label: 'Recommandations (protection, isolation)', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>RAPPORT DE MESURAGE DU BRUIT</h1>
<p><strong>Site :</strong> {{site}} | <strong>Opérateur :</strong> {{operateur_mesure}} | <strong>Date :</strong> {{date_mesure}}</p>
<h2>Postes mesurés</h2><p>{{postes_mesures}}</p>
<h2>Niveaux sonores</h2><p>{{niveaux_sonores}}</p>
<h2>Comparaison VLE</h2><p>{{comparaison_valeurs_limites}}</p>
<h2>Recommandations</h2><p>{{recommandations}}</p>
</body></html>`,
    },
    // 47
    {
      code: 'securite_rapport_incendie_sinistre',
      name: 'Rapport d\'Incendie / Sinistre',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 6500,
      priceMax: 15000,
      popularity: 86,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site sinistré', type: 'text' },
        { name: 'responsable', label: 'Responsable HSE', type: 'text' },
        { name: 'date_sinistre', label: 'Date du sinistre', type: 'date' },
        { name: 'description_sinistre', label: 'Description du sinistre', type: 'textarea' },
        { name: 'dommages', label: 'Dommages matériels et humains', type: 'textarea' },
        { name: 'intervention_secours', label: 'Intervention des secours', type: 'textarea' },
        { name: 'causes_sinistre', label: 'Causes du sinistre', type: 'textarea' },
        { name: 'mesures_preventives', label: 'Mesures préventives à mettre en place', type: 'textarea' },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date' },
      ]),
      body: `<html><body>
<h1>RAPPORT D'INCENDIE / SINISTRE</h1>
<p><strong>Site :</strong> {{site}} | <strong>Date sinistre :</strong> {{date_sinistre}}</p>
<p><strong>Responsable :</strong> {{responsable}}</p>
<h2>Description</h2><p>{{description_sinistre}}</p>
<h2>Dommages</h2><p>{{dommages}}</p>
<h2>Intervention secours</h2><p>{{intervention_secours}}</p>
<h2>Causes</h2><p>{{causes_sinistre}}</p>
<h2>Mesures préventives</h2><p>{{mesures_preventives}}</p>
<p><em>Rapport du : {{date_rapport}}</em></p>
</body></html>`,
    },
    // 48
    {
      code: 'dpi_suivi_etalonnage_equipements',
      name: 'Registre de Suivi et Étalonnage des Équipements de Mesure',
      category: 'qhse',
      templateType: 'excel',
      classe: 'B',
      price: 3500,
      priceMax: 9000,
      popularity: 63,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site', type: 'text' },
        { name: 'responsable_metrology', label: 'Responsable métrologie', type: 'text' },
        { name: 'annee', label: 'Année', type: 'text' },
        { name: 'date_edition', label: 'Date d\'édition', type: 'date' },
        { name: 'liste_equipements', label: 'Liste des équipements de mesure', type: 'textarea' },
        { name: 'etalonnages_realises', label: 'Étalonnages réalisés (équipement, date, résultat)', type: 'textarea' },
        { name: 'etalonnages_planifies', label: 'Étalonnages planifiés', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>REGISTRE D'ÉTALONNAGE DES ÉQUIPEMENTS — {{annee}}</h1>
<p><strong>Site :</strong> {{site}} | <strong>Responsable :</strong> {{responsable_metrology}} | <strong>Date :</strong> {{date_edition}}</p>
<h2>Équipements de mesure</h2><p>{{liste_equipements}}</p>
<h2>Étalonnages réalisés</h2><p>{{etalonnages_realises}}</p>
<h2>Étalonnages planifiés</h2><p>{{etalonnages_planifies}}</p>
</body></html>`,
    },
    // 49
    {
      code: 'qhse_bilan_trimestiel_hse',
      name: 'Bilan Trimestriel HSE — Rapport de Direction',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'B',
      price: 5500,
      priceMax: 13000,
      popularity: 81,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'trimestre', label: 'Trimestre (T1/T2/T3/T4)', type: 'text' },
        { name: 'annee', label: 'Année', type: 'text' },
        { name: 'responsable_hse', label: 'Responsable HSE', type: 'text' },
        { name: 'date_rapport', label: 'Date du rapport', type: 'date' },
        { name: 'synthese_accidents', label: 'Synthèse accidents et incidents', type: 'textarea' },
        { name: 'avancement_plan_action', label: 'Avancement du plan d\'action', type: 'textarea' },
        { name: 'formations_realisees', label: 'Formations réalisées', type: 'textarea' },
        { name: 'alertes_env', label: 'Alertes environnementales', type: 'textarea' },
        { name: 'objectifs_trimestre_suivant', label: 'Objectifs trimestre suivant', type: 'textarea' },
      ]),
      body: `<html><body>
<h1>BILAN HSE {{trimestre}} {{annee}}</h1>
<p><strong>Entreprise :</strong> {{entreprise}} | <strong>Responsable :</strong> {{responsable_hse}} | <strong>Date :</strong> {{date_rapport}}</p>
<h2>Accidents et incidents</h2><p>{{synthese_accidents}}</p>
<h2>Avancement plan d'action</h2><p>{{avancement_plan_action}}</p>
<h2>Formations réalisées</h2><p>{{formations_realisees}}</p>
<h2>Alertes environnementales</h2><p>{{alertes_env}}</p>
<h2>Objectifs trimestre suivant</h2><p>{{objectifs_trimestre_suivant}}</p>
</body></html>`,
    },
    // 50
    {
      code: 'hse_rapport_visite_securite_direction',
      name: 'Rapport de Visite Sécurité — Direction / Management',
      category: 'qhse',
      templateType: 'pdf',
      classe: 'A',
      price: 6000,
      priceMax: 14000,
      popularity: 77,
      active: true,
      fieldsJson: JSON.stringify([
        { name: 'site', label: 'Site visité', type: 'text' },
        { name: 'visiteurs', label: 'Membres de la direction présents', type: 'text' },
        { name: 'date_visite', label: 'Date de la visite', type: 'date' },
        { name: 'zones_visitees', label: 'Zones visitées', type: 'textarea' },
        { name: 'points_forts', label: 'Points forts observés', type: 'textarea' },
        { name: 'risques_observes', label: 'Risques et non-conformités observés', type: 'textarea' },
        { name: 'engagements_direction', label: 'Engagements pris par la direction', type: 'textarea' },
        { name: 'delai_suivi', label: 'Délai de suivi', type: 'date' },
      ]),
      body: `<html><body>
<h1>RAPPORT DE VISITE SÉCURITÉ — DIRECTION</h1>
<p><strong>Site :</strong> {{site}} | <strong>Date :</strong> {{date_visite}}</p>
<p><strong>Direction présente :</strong> {{visiteurs}}</p>
<h2>Zones visitées</h2><p>{{zones_visitees}}</p>
<h2>Points forts</h2><p>{{points_forts}}</p>
<h2>Risques / Non-conformités observés</h2><p>{{risques_observes}}</p>
<h2>Engagements de la direction</h2><p>{{engagements_direction}}</p>
<p><strong>Délai de suivi :</strong> {{delai_suivi}}</p>
</body></html>`,
    },
  ];

  for (const t of templates) {
    const r = await prisma.documentTemplate.upsert({
      where: { code: t.code },
      update: t,
      create: t,
    });
    if (r.createdAt === r.updatedAt) created++; else updated++;
  }

  const total = await prisma.documentTemplate.count();
  console.log(`Batch qhse-01 OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
