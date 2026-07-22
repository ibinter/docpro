import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── BTP AVANCÉ (btp3_) ───────────────────────────────────────────────────
  {
    code: 'btp3_plan_qualite_chantier', name: "Plan Qualité Chantier", category: 'btp_construction',
    price: 8000, priceMax: 24000, description: "Plan qualité définissant les procédures et contrôles qualité applicables au chantier.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'nom_chantier', label: "Nom du chantier", type: 'text', required: true },
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'entreprise', label: "Entreprise principale", type: 'text', required: true },
      { key: 'date_debut', label: "Date de début des travaux", type: 'date', required: true },
      { key: 'responsable_qualite', label: "Responsable qualité", type: 'text', required: true },
      { key: 'objectifs_qualite', label: "Objectifs qualité", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>PLAN QUALITÉ CHANTIER</h1><h2>{{nom_chantier}}</h2><p><strong>Maître d\'ouvrage :</strong> {{maitre_ouvrage}}</p><p><strong>Entreprise principale :</strong> {{entreprise}}</p><p><strong>Date de début :</strong> {{date_debut}}</p><p><strong>Responsable qualité :</strong> {{responsable_qualite}}</p><h3>Objectifs qualité</h3><p>{{objectifs_qualite}}</p><h3>Procédures de contrôle</h3><p>Les contrôles qualité seront réalisés conformément aux normes en vigueur et aux exigences du marché.</p></div>'
  },
  {
    code: 'btp3_rapport_geotechnique', name: "Rapport de Géotechnique", category: 'btp_construction',
    price: 12000, priceMax: 36000, description: "Rapport d'étude géotechnique du sol pour la fondation d'un ouvrage.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'site_etude', label: "Site étudié", type: 'text', required: true },
      { key: 'bureau_etude', label: "Bureau d'étude", type: 'text', required: true },
      { key: 'date_campagne', label: "Date de campagne de sondages", type: 'date', required: true },
      { key: 'nature_sol', label: "Nature du sol identifiée", type: 'textarea', required: true },
      { key: 'recommandations', label: "Recommandations de fondation", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>RAPPORT DE GÉOTECHNIQUE</h1><p><strong>Site étudié :</strong> {{site_etude}}</p><p><strong>Bureau d\'étude :</strong> {{bureau_etude}}</p><p><strong>Date de campagne :</strong> {{date_campagne}}</p><h3>Nature du sol</h3><p>{{nature_sol}}</p><h3>Recommandations de fondation</h3><p>{{recommandations}}</p><p>Le présent rapport est établi sur la base des investigations réalisées sur le site.</p></div>'
  },
  {
    code: 'btp3_note_calcul_structure', name: "Note de Calcul de Structure", category: 'btp_construction',
    price: 15000, priceMax: 45000, description: "Note de calcul justifiant le dimensionnement des éléments structuraux d'un bâtiment.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'projet', label: "Désignation du projet", type: 'text', required: true },
      { key: 'ingenieur_calcul', label: "Ingénieur en charge du calcul", type: 'text', required: true },
      { key: 'date_note', label: "Date de la note", type: 'date', required: true },
      { key: 'normes_appliquees', label: "Normes appliquées", type: 'text', required: true },
      { key: 'hypotheses_calcul', label: "Hypothèses de calcul", type: 'textarea', required: true },
      { key: 'resultats', label: "Résultats et conclusions", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>NOTE DE CALCUL DE STRUCTURE</h1><p><strong>Projet :</strong> {{projet}}</p><p><strong>Ingénieur :</strong> {{ingenieur_calcul}}</p><p><strong>Date :</strong> {{date_note}}</p><p><strong>Normes appliquées :</strong> {{normes_appliquees}}</p><h3>Hypothèses de calcul</h3><p>{{hypotheses_calcul}}</p><h3>Résultats et conclusions</h3><p>{{resultats}}</p></div>'
  },
  {
    code: 'btp3_cahier_charges_techniques', name: "Cahier des Charges Techniques BTP", category: 'btp_construction',
    price: 10000, priceMax: 30000, description: "Cahier des charges définissant les spécifications techniques pour l'exécution des travaux.", templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'objet_travaux', label: "Objet des travaux", type: 'text', required: true },
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'lieu_travaux', label: "Lieu des travaux", type: 'text', required: true },
      { key: 'specifications_techniques', label: "Spécifications techniques", type: 'textarea', required: true },
      { key: 'materiaux_requis', label: "Matériaux requis", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>CAHIER DES CHARGES TECHNIQUES BTP</h1><p><strong>Objet des travaux :</strong> {{objet_travaux}}</p><p><strong>Maître d\'ouvrage :</strong> {{maitre_ouvrage}}</p><p><strong>Lieu :</strong> {{lieu_travaux}}</p><h3>Spécifications techniques</h3><p>{{specifications_techniques}}</p><h3>Matériaux requis</h3><p>{{materiaux_requis}}</p></div>'
  },
  {
    code: 'btp3_reception_provisoire', name: "Procédure de Réception Provisoire", category: 'btp_construction',
    price: 6000, priceMax: 18000, description: "Procès-verbal constatant la réception provisoire des travaux avec liste des réserves éventuelles.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'marche_travaux', label: "Référence du marché de travaux", type: 'text', required: true },
      { key: 'entrepreneur', label: "Entrepreneur", type: 'text', required: true },
      { key: 'date_reception', label: "Date de réception provisoire", type: 'date', required: true },
      { key: 'reserves', label: "Réserves formulées", type: 'textarea', required: false },
      { key: 'delai_levee', label: "Délai de levée des réserves (jours)", type: 'text', required: false }
    ]),
    body: '<div class="doc"><h1>PROCÈS-VERBAL DE RÉCEPTION PROVISOIRE</h1><p><strong>Marché :</strong> {{marche_travaux}}</p><p><strong>Entrepreneur :</strong> {{entrepreneur}}</p><p><strong>Date :</strong> {{date_reception}}</p><h3>Réserves formulées</h3><p>{{reserves}}</p><p><strong>Délai de levée des réserves :</strong> {{delai_levee}} jours</p><p>La réception provisoire est prononcée sous réserve de la levée des réserves ci-dessus dans le délai imparti.</p></div>'
  },
  {
    code: 'btp3_reception_definitive', name: "Procédure de Réception Définitive", category: 'btp_construction',
    price: 6000, priceMax: 18000, description: "Procès-verbal prononçant la réception définitive des travaux après levée de toutes les réserves.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'marche_travaux', label: "Référence du marché de travaux", type: 'text', required: true },
      { key: 'entrepreneur', label: "Entrepreneur", type: 'text', required: true },
      { key: 'date_reception_provisoire', label: "Date de réception provisoire", type: 'date', required: true },
      { key: 'date_reception_definitive', label: "Date de réception définitive", type: 'date', required: true },
      { key: 'observations', label: "Observations finales", type: 'textarea', required: false }
    ]),
    body: '<div class="doc"><h1>PROCÈS-VERBAL DE RÉCEPTION DÉFINITIVE</h1><p><strong>Marché :</strong> {{marche_travaux}}</p><p><strong>Entrepreneur :</strong> {{entrepreneur}}</p><p><strong>Réception provisoire :</strong> {{date_reception_provisoire}}</p><p><strong>Réception définitive :</strong> {{date_reception_definitive}}</p><h3>Observations finales</h3><p>{{observations}}</p><p>Toutes les réserves ayant été levées, la réception définitive est prononcée.</p></div>'
  },
  {
    code: 'btp3_rapport_visite_chantier', name: "Rapport de Visite de Chantier", category: 'btp_construction',
    price: 5000, priceMax: 15000, description: "Rapport établi à l'issue d'une visite de chantier consignant l'avancement et les observations.", templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      { key: 'chantier', label: "Chantier visité", type: 'text', required: true },
      { key: 'date_visite', label: "Date de la visite", type: 'date', required: true },
      { key: 'visiteur', label: "Nom du visiteur", type: 'text', required: true },
      { key: 'avancement', label: "Avancement constaté", type: 'textarea', required: true },
      { key: 'observations', label: "Observations et recommandations", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>RAPPORT DE VISITE DE CHANTIER</h1><p><strong>Chantier :</strong> {{chantier}}</p><p><strong>Date :</strong> {{date_visite}}</p><p><strong>Visiteur :</strong> {{visiteur}}</p><h3>Avancement constaté</h3><p>{{avancement}}</p><h3>Observations et recommandations</h3><p>{{observations}}</p></div>'
  },
  {
    code: 'btp3_fiche_arret_travaux', name: "Fiche d'Arrêt de Travaux", category: 'btp_construction',
    price: 4000, priceMax: 12000, description: "Fiche officielle ordonnant l'arrêt des travaux et précisant les motifs et conditions de reprise.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'chantier', label: "Chantier concerné", type: 'text', required: true },
      { key: 'date_arret', label: "Date d'arrêt des travaux", type: 'date', required: true },
      { key: 'motif_arret', label: "Motif de l'arrêt", type: 'textarea', required: true },
      { key: 'autorite_emettrice', label: "Autorité émettrice", type: 'text', required: true },
      { key: 'conditions_reprise', label: "Conditions de reprise", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>FICHE D\'ARRÊT DE TRAVAUX</h1><p><strong>Chantier :</strong> {{chantier}}</p><p><strong>Date d\'arrêt :</strong> {{date_arret}}</p><p><strong>Autorité émettrice :</strong> {{autorite_emettrice}}</p><h3>Motif de l\'arrêt</h3><p>{{motif_arret}}</p><h3>Conditions de reprise</h3><p>{{conditions_reprise}}</p><p>Les travaux ne pourront reprendre qu\'après levée des dispositions ci-dessus.</p></div>'
  },
  {
    code: 'btp3_pv_reunion_chantier', name: "Procès-Verbal de Réunion de Chantier", category: 'btp_construction',
    price: 4000, priceMax: 12000, description: "Procès-verbal consignant les décisions et points traités lors d'une réunion de chantier.", templateType: 'pdf', classe: 'B', active: true, popularity: 90,
    fieldsJson: F([
      { key: 'chantier', label: "Chantier", type: 'text', required: true },
      { key: 'date_reunion', label: "Date de la réunion", type: 'date', required: true },
      { key: 'participants', label: "Participants", type: 'textarea', required: true },
      { key: 'points_traites', label: "Points traités", type: 'textarea', required: true },
      { key: 'decisions', label: "Décisions prises", type: 'textarea', required: true },
      { key: 'prochaine_reunion', label: "Date de la prochaine réunion", type: 'date', required: false }
    ]),
    body: '<div class="doc"><h1>PROCÈS-VERBAL DE RÉUNION DE CHANTIER</h1><p><strong>Chantier :</strong> {{chantier}}</p><p><strong>Date :</strong> {{date_reunion}}</p><h3>Participants</h3><p>{{participants}}</p><h3>Points traités</h3><p>{{points_traites}}</p><h3>Décisions prises</h3><p>{{decisions}}</p><p><strong>Prochaine réunion :</strong> {{prochaine_reunion}}</p></div>'
  },
  {
    code: 'btp3_ordre_service_modif', name: "Ordre de Service Modification Travaux", category: 'btp_construction',
    price: 5000, priceMax: 15000, description: "Ordre de service prescrivant une modification aux travaux prévus au marché initial.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'numero_os', label: "Numéro de l'ordre de service", type: 'text', required: true },
      { key: 'marche_reference', label: "Marché de référence", type: 'text', required: true },
      { key: 'date_emission', label: "Date d'émission", type: 'date', required: true },
      { key: 'description_modification', label: "Description de la modification", type: 'textarea', required: true },
      { key: 'impact_delai', label: "Impact sur le délai", type: 'text', required: false },
      { key: 'impact_cout', label: "Impact sur le coût (FCFA)", type: 'text', required: false }
    ]),
    body: '<div class="doc"><h1>ORDRE DE SERVICE — MODIFICATION DE TRAVAUX</h1><p><strong>N° O.S. :</strong> {{numero_os}}</p><p><strong>Marché :</strong> {{marche_reference}}</p><p><strong>Date :</strong> {{date_emission}}</p><h3>Description de la modification</h3><p>{{description_modification}}</p><p><strong>Impact délai :</strong> {{impact_delai}}</p><p><strong>Impact coût :</strong> {{impact_cout}} FCFA</p></div>'
  },
  {
    code: 'btp3_decompte_mensuel', name: "Décompte Mensuel Travaux", category: 'btp_construction',
    price: 7000, priceMax: 21000, description: "Décompte mensuel des travaux réalisés servant de base à la facturation de l'entrepreneur.", templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      { key: 'numero_decompte', label: "Numéro du décompte", type: 'text', required: true },
      { key: 'periode', label: "Période concernée", type: 'text', required: true },
      { key: 'entrepreneur', label: "Entrepreneur", type: 'text', required: true },
      { key: 'montant_cumul', label: "Montant cumulé des travaux (FCFA)", type: 'text', required: true },
      { key: 'montant_periode', label: "Montant de la période (FCFA)", type: 'text', required: true }
    ]),
    body: '<div class="doc"><h1>DÉCOMPTE MENSUEL DES TRAVAUX</h1><p><strong>Décompte N° :</strong> {{numero_decompte}}</p><p><strong>Période :</strong> {{periode}}</p><p><strong>Entrepreneur :</strong> {{entrepreneur}}</p><table border="1" style="width:100%;border-collapse:collapse"><tr><th>Désignation</th><th>Montant (FCFA)</th></tr><tr><td>Travaux de la période</td><td>{{montant_periode}}</td></tr><tr><td>Cumul des travaux</td><td>{{montant_cumul}}</td></tr></table></div>'
  },
  {
    code: 'btp3_decompte_definitif', name: "Décompte Définitif", category: 'btp_construction',
    price: 8000, priceMax: 24000, description: "Décompte définitif arrêtant le montant total des travaux réalisés à la fin du chantier.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      { key: 'marche', label: "Référence du marché", type: 'text', required: true },
      { key: 'entrepreneur', label: "Entrepreneur", type: 'text', required: true },
      { key: 'date_etablissement', label: "Date d'établissement", type: 'date', required: true },
      { key: 'montant_marche_initial', label: "Montant du marché initial (FCFA)", type: 'text', required: true },
      { key: 'montant_final', label: "Montant définitif arrêté (FCFA)", type: 'text', required: true },
      { key: 'ecart_justification', label: "Justification des écarts", type: 'textarea', required: false }
    ]),
    body: '<div class="doc"><h1>DÉCOMPTE DÉFINITIF DES TRAVAUX</h1><p><strong>Marché :</strong> {{marche}}</p><p><strong>Entrepreneur :</strong> {{entrepreneur}}</p><p><strong>Date :</strong> {{date_etablissement}}</p><table border="1" style="width:100%;border-collapse:collapse"><tr><th>Désignation</th><th>Montant (FCFA)</th></tr><tr><td>Marché initial</td><td>{{montant_marche_initial}}</td></tr><tr><td>Montant définitif</td><td>{{montant_final}}</td></tr></table><h3>Justification des écarts</h3><p>{{ecart_justification}}</p></div>'
  },
  {
    code: 'btp3_avenant_marche', name: "Avenant au Marché de Travaux", category: 'btp_construction',
    price: 9000, priceMax: 27000, description: "Avenant modifiant les termes du marché de travaux initial (délais, montant, prestations).", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      { key: 'marche_initial', label: "Marché initial de référence", type: 'text', required: true },
      { key: 'numero_avenant', label: "Numéro de l'avenant", type: 'text', required: true },
      { key: 'date_avenant', label: "Date de l'avenant", type: 'date', required: true },
      { key: 'objet_avenant', label: "Objet de l'avenant", type: 'textarea', required: true },
      { key: 'nouveau_montant', label: "Nouveau montant total (FCFA)", type: 'text', required: true }
    ]),
    body: '<div class="doc"><h1>AVENANT AU MARCHÉ DE TRAVAUX</h1><p><strong>Marché initial :</strong> {{marche_initial}}</p><p><strong>Avenant N° :</strong> {{numero_avenant}}</p><p><strong>Date :</strong> {{date_avenant}}</p><h3>Objet de l\'avenant</h3><p>{{objet_avenant}}</p><p><strong>Nouveau montant total :</strong> {{nouveau_montant}} FCFA</p><p>Les autres clauses du marché initial demeurent inchangées.</p></div>'
  },
  {
    code: 'btp3_rapport_expertise_batiment', name: "Rapport d'Expertise Bâtiment", category: 'btp_construction',
    price: 18000, priceMax: 54000, description: "Rapport d'expertise technique établissant l'état d'un bâtiment et les désordres constatés.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'adresse_bien', label: "Adresse du bien expertisé", type: 'text', required: true },
      { key: 'expert', label: "Expert désigné", type: 'text', required: true },
      { key: 'date_expertise', label: "Date de l'expertise", type: 'date', required: true },
      { key: 'desordres_constates', label: "Désordres constatés", type: 'textarea', required: true },
      { key: 'causes', label: "Causes identifiées", type: 'textarea', required: true },
      { key: 'preconisations', label: "Préconisations de travaux", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'EXPERTISE BÂTIMENT</h1><p><strong>Bien expertisé :</strong> {{adresse_bien}}</p><p><strong>Expert :</strong> {{expert}}</p><p><strong>Date :</strong> {{date_expertise}}</p><h3>Désordres constatés</h3><p>{{desordres_constates}}</p><h3>Causes identifiées</h3><p>{{causes}}</p><h3>Préconisations</h3><p>{{preconisations}}</p></div>'
  },
  {
    code: 'btp3_diagnostic_structurel', name: "Diagnostic Structurel", category: 'btp_construction',
    price: 15000, priceMax: 45000, description: "Diagnostic de l'état structural d'un ouvrage avec évaluation de la résistance et de la stabilité.", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'ouvrage', label: "Ouvrage diagnostiqué", type: 'text', required: true },
      { key: 'bureau_etude', label: "Bureau d'étude", type: 'text', required: true },
      { key: 'date_diagnostic', label: "Date du diagnostic", type: 'date', required: true },
      { key: 'etat_general', label: "État général de la structure", type: 'textarea', required: true },
      { key: 'vulnerabilites', label: "Vulnérabilités identifiées", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>DIAGNOSTIC STRUCTUREL</h1><p><strong>Ouvrage :</strong> {{ouvrage}}</p><p><strong>Bureau d\'étude :</strong> {{bureau_etude}}</p><p><strong>Date :</strong> {{date_diagnostic}}</p><h3>État général</h3><p>{{etat_general}}</p><h3>Vulnérabilités identifiées</h3><p>{{vulnerabilites}}</p></div>'
  },
  {
    code: 'btp3_rapport_inspection_periodique', name: "Rapport d'Inspection Périodique", category: 'btp_construction',
    price: 7000, priceMax: 21000, description: "Rapport d'inspection périodique d'un ouvrage BTP conformément au programme de maintenance.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'ouvrage', label: "Ouvrage inspecté", type: 'text', required: true },
      { key: 'inspecteur', label: "Inspecteur", type: 'text', required: true },
      { key: 'date_inspection', label: "Date d'inspection", type: 'date', required: true },
      { key: 'constats', label: "Constats de l'inspection", type: 'textarea', required: true },
      { key: 'actions_requises', label: "Actions requises", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'INSPECTION PÉRIODIQUE</h1><p><strong>Ouvrage :</strong> {{ouvrage}}</p><p><strong>Inspecteur :</strong> {{inspecteur}}</p><p><strong>Date :</strong> {{date_inspection}}</p><h3>Constats</h3><p>{{constats}}</p><h3>Actions requises</h3><p>{{actions_requises}}</p></div>'
  },
  {
    code: 'btp3_plan_prevention_securite', name: "Plan de Prévention Sécurité Chantier", category: 'btp_construction',
    price: 8000, priceMax: 24000, description: "Plan de prévention définissant les mesures de sécurité applicables sur le chantier.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'chantier', label: "Chantier concerné", type: 'text', required: true },
      { key: 'responsable_securite', label: "Responsable sécurité", type: 'text', required: true },
      { key: 'date_plan', label: "Date d'établissement", type: 'date', required: true },
      { key: 'risques_identifies', label: "Risques identifiés", type: 'textarea', required: true },
      { key: 'mesures_prevention', label: "Mesures de prévention", type: 'textarea', required: true },
      { key: 'epi_requis', label: "EPI requis", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>PLAN DE PRÉVENTION ET DE SÉCURITÉ CHANTIER</h1><p><strong>Chantier :</strong> {{chantier}}</p><p><strong>Responsable sécurité :</strong> {{responsable_securite}}</p><p><strong>Date :</strong> {{date_plan}}</p><h3>Risques identifiés</h3><p>{{risques_identifies}}</p><h3>Mesures de prévention</h3><p>{{mesures_prevention}}</p><h3>EPI requis</h3><p>{{epi_requis}}</p></div>'
  },
  {
    code: 'btp3_rapport_accident_travail', name: "Rapport d'Accident de Travail BTP", category: 'btp_construction',
    price: 5000, priceMax: 15000, description: "Rapport circonstancié d'un accident de travail survenu sur un chantier BTP.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'chantier', label: "Chantier du sinistre", type: 'text', required: true },
      { key: 'date_accident', label: "Date et heure de l'accident", type: 'date', required: true },
      { key: 'victime', label: "Identité de la victime", type: 'text', required: true },
      { key: 'circonstances', label: "Circonstances de l'accident", type: 'textarea', required: true },
      { key: 'mesures_prises', label: "Mesures prises immédiatement", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'ACCIDENT DE TRAVAIL — CHANTIER BTP</h1><p><strong>Chantier :</strong> {{chantier}}</p><p><strong>Date de l\'accident :</strong> {{date_accident}}</p><p><strong>Victime :</strong> {{victime}}</p><h3>Circonstances</h3><p>{{circonstances}}</p><h3>Mesures prises</h3><p>{{mesures_prises}}</p><p>Ce rapport est transmis à la CNPS et à l\'inspection du travail dans les délais réglementaires.</p></div>'
  },
  {
    code: 'btp3_procedure_levee_reserves', name: "Procédure de Levée de Réserves", category: 'btp_construction',
    price: 5000, priceMax: 15000, description: "Document formalisant la levée des réserves émises lors de la réception provisoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'marche', label: "Référence du marché", type: 'text', required: true },
      { key: 'entrepreneur', label: "Entrepreneur", type: 'text', required: true },
      { key: 'date_levee', label: "Date de levée des réserves", type: 'date', required: true },
      { key: 'reserves_initiales', label: "Réserves initialement émises", type: 'textarea', required: true },
      { key: 'travaux_effectues', label: "Travaux effectués pour levée", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>PROCÉDURE DE LEVÉE DE RÉSERVES</h1><p><strong>Marché :</strong> {{marche}}</p><p><strong>Entrepreneur :</strong> {{entrepreneur}}</p><p><strong>Date :</strong> {{date_levee}}</p><h3>Réserves initiales</h3><p>{{reserves_initiales}}</p><h3>Travaux de levée effectués</h3><p>{{travaux_effectues}}</p><p>Les réserves ci-dessus sont levées et constatées à la date indiquée.</p></div>'
  },
  {
    code: 'btp3_attestation_achevement', name: "Attestation d'Achèvement des Travaux", category: 'btp_construction',
    price: 4000, priceMax: 12000, description: "Attestation certifiant l'achèvement complet des travaux de construction ou de réhabilitation.", templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'nature_travaux', label: "Nature des travaux", type: 'text', required: true },
      { key: 'adresse_chantier', label: "Adresse du chantier", type: 'text', required: true },
      { key: 'date_achevement', label: "Date d'achèvement", type: 'date', required: true },
      { key: 'entrepreneur_principal', label: "Entrepreneur principal", type: 'text', required: true }
    ]),
    body: '<div class="doc"><h1>ATTESTATION D\'ACHÈVEMENT DES TRAVAUX</h1><p>Je soussigné, <strong>{{maitre_ouvrage}}</strong>, maître d\'ouvrage, atteste que les travaux de <strong>{{nature_travaux}}</strong> réalisés à l\'adresse <strong>{{adresse_chantier}}</strong> par l\'entrepreneur <strong>{{entrepreneur_principal}}</strong> ont été achevés en date du <strong>{{date_achevement}}</strong>.</p><p>En foi de quoi, la présente attestation est délivrée pour servir et valoir ce que de droit.</p></div>'
  },
  {
    code: 'btp3_contrat_sous_traitance', name: "Contrat de Sous-Traitance BTP", category: 'btp_construction',
    price: 10000, priceMax: 30000, description: "Contrat de sous-traitance conforme au droit OHADA pour l'exécution d'une partie des travaux.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'entreprise_principale', label: "Entreprise principale", type: 'text', required: true },
      { key: 'sous_traitant', label: "Sous-traitant", type: 'text', required: true },
      { key: 'nature_prestation', label: "Nature de la prestation sous-traitée", type: 'textarea', required: true },
      { key: 'montant_sous_traitance', label: "Montant de la sous-traitance (FCFA)", type: 'text', required: true },
      { key: 'delai_execution', label: "Délai d'exécution", type: 'text', required: true }
    ]),
    body: '<div class="doc"><h1>CONTRAT DE SOUS-TRAITANCE BTP</h1><p>Entre <strong>{{entreprise_principale}}</strong> (Entreprise principale) et <strong>{{sous_traitant}}</strong> (Sous-traitant).</p><h3>Objet de la sous-traitance</h3><p>{{nature_prestation}}</p><p><strong>Montant :</strong> {{montant_sous_traitance}} FCFA</p><p><strong>Délai d\'exécution :</strong> {{delai_execution}}</p><p>Le présent contrat est régi par les dispositions de l\'Acte Uniforme OHADA et les lois en vigueur en Côte d\'Ivoire.</p></div>'
  },
  {
    code: 'btp3_bon_commande_materiaux', name: "Bon de Commande Matériaux", category: 'btp_construction',
    price: 3000, priceMax: 9000, description: "Bon de commande pour l'approvisionnement en matériaux de construction sur chantier.", templateType: 'pdf', classe: 'B', active: true, popularity: 88,
    fieldsJson: F([
      { key: 'chantier', label: "Chantier destinataire", type: 'text', required: true },
      { key: 'fournisseur', label: "Fournisseur", type: 'text', required: true },
      { key: 'date_commande', label: "Date de la commande", type: 'date', required: true },
      { key: 'designation_materiaux', label: "Désignation et quantité des matériaux", type: 'textarea', required: true },
      { key: 'montant_total', label: "Montant total TTC (FCFA)", type: 'text', required: true }
    ]),
    body: '<div class="doc"><h1>BON DE COMMANDE MATÉRIAUX</h1><p><strong>Chantier :</strong> {{chantier}}</p><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>Date :</strong> {{date_commande}}</p><h3>Matériaux commandés</h3><p>{{designation_materiaux}}</p><p><strong>Montant total TTC :</strong> {{montant_total}} FCFA</p><p>Bon de commande valant engagement de paiement sous réserve de livraison conforme.</p></div>'
  },
  {
    code: 'btp3_fiche_controle_beton', name: "Fiche de Contrôle Béton", category: 'btp_construction',
    price: 4000, priceMax: 12000, description: "Fiche de contrôle qualité du béton fabriqué ou livré sur chantier (formulation, essais).", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'chantier', label: "Chantier", type: 'text', required: true },
      { key: 'date_coulage', label: "Date de coulage", type: 'date', required: true },
      { key: 'element_beton', label: "Élément en béton concerné", type: 'text', required: true },
      { key: 'classe_beton', label: "Classe du béton (ex : C25/30)", type: 'text', required: true },
      { key: 'resultat_affaissement', label: "Résultat affaissement au cône (cm)", type: 'text', required: true },
      { key: 'observations', label: "Observations", type: 'textarea', required: false }
    ]),
    body: '<div class="doc"><h1>FICHE DE CONTRÔLE BÉTON</h1><p><strong>Chantier :</strong> {{chantier}}</p><p><strong>Date de coulage :</strong> {{date_coulage}}</p><p><strong>Élément :</strong> {{element_beton}}</p><p><strong>Classe du béton :</strong> {{classe_beton}}</p><p><strong>Affaissement au cône :</strong> {{resultat_affaissement}} cm</p><h3>Observations</h3><p>{{observations}}</p></div>'
  },
  {
    code: 'btp3_rapport_resistance_materiaux', name: "Rapport de Résistance des Matériaux", category: 'btp_construction',
    price: 8000, priceMax: 24000, description: "Rapport de laboratoire présentant les résultats d'essais de résistance des matériaux de construction.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'laboratoire', label: "Laboratoire d'essais", type: 'text', required: true },
      { key: 'chantier_client', label: "Chantier / Client", type: 'text', required: true },
      { key: 'date_essais', label: "Date des essais", type: 'date', required: true },
      { key: 'materiaux_testes', label: "Matériaux testés", type: 'text', required: true },
      { key: 'resultats_essais', label: "Résultats des essais", type: 'textarea', required: true },
      { key: 'conclusion', label: "Conclusion et conformité", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>RAPPORT DE RÉSISTANCE DES MATÉRIAUX</h1><p><strong>Laboratoire :</strong> {{laboratoire}}</p><p><strong>Chantier / Client :</strong> {{chantier_client}}</p><p><strong>Date des essais :</strong> {{date_essais}}</p><p><strong>Matériaux testés :</strong> {{materiaux_testes}}</p><h3>Résultats des essais</h3><p>{{resultats_essais}}</p><h3>Conclusion</h3><p>{{conclusion}}</p></div>'
  },
  {
    code: 'btp3_certificat_conformite_batiment', name: "Certificat de Conformité Bâtiment", category: 'btp_construction',
    price: 6000, priceMax: 18000, description: "Certificat attestant la conformité d'un bâtiment aux règles de construction et aux autorisations accordées.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      { key: 'adresse_batiment', label: "Adresse du bâtiment", type: 'text', required: true },
      { key: 'proprietaire', label: "Propriétaire", type: 'text', required: true },
      { key: 'numero_permis', label: "Numéro du permis de construire", type: 'text', required: true },
      { key: 'autorite_delivrante', label: "Autorité délivrante", type: 'text', required: true },
      { key: 'date_delivrance', label: "Date de délivrance", type: 'date', required: true }
    ]),
    body: '<div class="doc"><h1>CERTIFICAT DE CONFORMITÉ BÂTIMENT</h1><p>L\'autorité soussignée, <strong>{{autorite_delivrante}}</strong>, certifie que le bâtiment situé à <strong>{{adresse_batiment}}</strong>, appartenant à <strong>{{proprietaire}}</strong>, construit en vertu du permis de construire N° <strong>{{numero_permis}}</strong>, est conforme aux plans et prescriptions approuvés.</p><p><strong>Date de délivrance :</strong> {{date_delivrance}}</p><p>Ce certificat est délivré pour servir et valoir ce que de droit.</p></div>'
  },

  // ─── URBANISME (urb_) ─────────────────────────────────────────────────────
  {
    code: 'urb_demande_permis_construire', name: "Demande de Permis de Construire", category: 'btp_construction',
    price: 7000, priceMax: 21000, description: "Dossier de demande de permis de construire conforme aux exigences de la Direction de l'Urbanisme.", templateType: 'pdf', classe: 'B', active: true, popularity: 92,
    fieldsJson: F([
      { key: 'demandeur', label: "Nom du demandeur", type: 'text', required: true },
      { key: 'adresse_projet', label: "Adresse du projet", type: 'text', required: true },
      { key: 'nature_travaux', label: "Nature des travaux projetés", type: 'textarea', required: true },
      { key: 'superficie_plancher', label: "Superficie de plancher (m²)", type: 'text', required: true },
      { key: 'date_depot', label: "Date de dépôt", type: 'date', required: true }
    ]),
    body: '<div class="doc"><h1>DEMANDE DE PERMIS DE CONSTRUIRE</h1><p>Je soussigné(e), <strong>{{demandeur}}</strong>, sollicite la délivrance d\'un permis de construire pour le projet situé à <strong>{{adresse_projet}}</strong>.</p><h3>Nature des travaux</h3><p>{{nature_travaux}}</p><p><strong>Superficie de plancher :</strong> {{superficie_plancher}} m²</p><p><strong>Date de dépôt :</strong> {{date_depot}}</p><p>Je certifie l\'exactitude des informations fournies et m\'engage à respecter les règles d\'urbanisme en vigueur.</p></div>'
  },
  {
    code: 'urb_demande_permis_demolir', name: "Demande de Permis de Démolir", category: 'btp_construction',
    price: 5000, priceMax: 15000, description: "Demande de permis de démolir un bâtiment ou une partie de bâtiment.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'demandeur', label: "Nom du demandeur", type: 'text', required: true },
      { key: 'adresse_bien', label: "Adresse du bien à démolir", type: 'text', required: true },
      { key: 'description_demolition', label: "Description de la démolition", type: 'textarea', required: true },
      { key: 'motif', label: "Motif de la démolition", type: 'textarea', required: true },
      { key: 'date_prevue', label: "Date prévue de début", type: 'date', required: true }
    ]),
    body: '<div class="doc"><h1>DEMANDE DE PERMIS DE DÉMOLIR</h1><p>Je soussigné(e), <strong>{{demandeur}}</strong>, sollicite un permis de démolir pour le bien sis à <strong>{{adresse_bien}}</strong>.</p><h3>Description de la démolition</h3><p>{{description_demolition}}</p><h3>Motif</h3><p>{{motif}}</p><p><strong>Date prévue de début :</strong> {{date_prevue}}</p></div>'
  },
  {
    code: 'urb_demande_autorisation_lotir', name: "Demande d'Autorisation de Lotir", category: 'btp_construction',
    price: 9000, priceMax: 27000, description: "Demande d'autorisation de lotissement pour division d'une parcelle en plusieurs lots à bâtir.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'demandeur', label: "Nom du lotisseur", type: 'text', required: true },
      { key: 'situation_terrain', label: "Situation du terrain", type: 'text', required: true },
      { key: 'superficie_totale', label: "Superficie totale (m²)", type: 'text', required: true },
      { key: 'nombre_lots', label: "Nombre de lots projetés", type: 'text', required: true },
      { key: 'date_demande', label: "Date de la demande", type: 'date', required: true }
    ]),
    body: '<div class="doc"><h1>DEMANDE D\'AUTORISATION DE LOTIR</h1><p>Je soussigné(e), <strong>{{demandeur}}</strong>, sollicite l\'autorisation de lotir le terrain de <strong>{{superficie_totale}} m²</strong> situé à <strong>{{situation_terrain}}</strong> en <strong>{{nombre_lots}}</strong> lots.</p><p><strong>Date :</strong> {{date_demande}}</p><p>Le dossier de lotissement ci-joint contient tous les documents exigés par la réglementation en vigueur.</p></div>'
  },
  {
    code: 'urb_certificat_urbanisme', name: "Certificat d'Urbanisme", category: 'btp_construction',
    price: 5000, priceMax: 15000, description: "Certificat d'urbanisme indiquant les dispositions applicables à un terrain donné.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      { key: 'localisation_terrain', label: "Localisation du terrain", type: 'text', required: true },
      { key: 'demandeur', label: "Demandeur", type: 'text', required: true },
      { key: 'zone_urbanisme', label: "Zone d'urbanisme applicable", type: 'text', required: true },
      { key: 'droits_construire', label: "Droits à construire", type: 'textarea', required: true },
      { key: 'date_delivrance', label: "Date de délivrance", type: 'date', required: true }
    ]),
    body: '<div class="doc"><h1>CERTIFICAT D\'URBANISME</h1><p>Le présent certificat est délivré à <strong>{{demandeur}}</strong> pour le terrain situé à <strong>{{localisation_terrain}}</strong>.</p><p><strong>Zone d\'urbanisme :</strong> {{zone_urbanisme}}</p><h3>Droits à construire</h3><p>{{droits_construire}}</p><p><strong>Date de délivrance :</strong> {{date_delivrance}}</p><p>Ce certificat est valable 18 mois à compter de sa date de délivrance.</p></div>'
  },
  {
    code: 'urb_declaration_travaux', name: "Déclaration de Travaux", category: 'btp_construction',
    price: 3000, priceMax: 9000, description: "Déclaration préalable de travaux pour des aménagements ne nécessitant pas de permis de construire.", templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      { key: 'declarant', label: "Nom du déclarant", type: 'text', required: true },
      { key: 'adresse_travaux', label: "Adresse des travaux", type: 'text', required: true },
      { key: 'nature_travaux', label: "Nature des travaux", type: 'textarea', required: true },
      { key: 'date_declaration', label: "Date de la déclaration", type: 'date', required: true }
    ]),
    body: '<div class="doc"><h1>DÉCLARATION PRÉALABLE DE TRAVAUX</h1><p>Je soussigné(e), <strong>{{declarant}}</strong>, déclare l\'exécution des travaux suivants à l\'adresse <strong>{{adresse_travaux}}</strong>.</p><h3>Nature des travaux</h3><p>{{nature_travaux}}</p><p><strong>Date de la déclaration :</strong> {{date_declaration}}</p></div>'
  },
  {
    code: 'urb_plan_de_masse', name: "Plan de Masse", category: 'btp_construction',
    price: 6000, priceMax: 18000, description: "Notice descriptive accompagnant le plan de masse d'un projet de construction.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'projet', label: "Désignation du projet", type: 'text', required: true },
      { key: 'adresse', label: "Adresse du projet", type: 'text', required: true },
      { key: 'superficie_terrain', label: "Superficie du terrain (m²)", type: 'text', required: true },
      { key: 'emprise_batiment', label: "Emprise au sol du bâtiment (m²)", type: 'text', required: true },
      { key: 'coefficient_emprise', label: "Coefficient d'emprise au sol (%)", type: 'text', required: true }
    ]),
    body: '<div class="doc"><h1>NOTICE DE PLAN DE MASSE</h1><p><strong>Projet :</strong> {{projet}}</p><p><strong>Adresse :</strong> {{adresse}}</p><p><strong>Superficie du terrain :</strong> {{superficie_terrain}} m²</p><p><strong>Emprise au sol :</strong> {{emprise_batiment}} m²</p><p><strong>Coefficient d\'emprise :</strong> {{coefficient_emprise}} %</p><p>Le plan de masse ci-joint illustre l\'implantation du bâtiment sur le terrain en respectant les règles de recul et d\'alignement.</p></div>'
  },
  {
    code: 'urb_notice_descriptive', name: "Notice Descriptive Urbanisme", category: 'btp_construction',
    price: 5000, priceMax: 15000, description: "Notice descriptive du projet présentant ses caractéristiques architecturales et techniques.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'projet', label: "Nom du projet", type: 'text', required: true },
      { key: 'architecte', label: "Architecte", type: 'text', required: true },
      { key: 'description_projet', label: "Description générale du projet", type: 'textarea', required: true },
      { key: 'materiaux_facades', label: "Matériaux de façades et toiture", type: 'textarea', required: true },
      { key: 'integration_paysagere', label: "Intégration paysagère", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>NOTICE DESCRIPTIVE DU PROJET</h1><p><strong>Projet :</strong> {{projet}}</p><p><strong>Architecte :</strong> {{architecte}}</p><h3>Description générale</h3><p>{{description_projet}}</p><h3>Matériaux et finitions</h3><p>{{materiaux_facades}}</p><h3>Intégration paysagère</h3><p>{{integration_paysagere}}</p></div>'
  },
  {
    code: 'urb_rapport_enquete_publique', name: "Rapport d'Enquête Publique", category: 'btp_construction',
    price: 12000, priceMax: 36000, description: "Rapport du commissaire enquêteur à l'issue d'une enquête publique sur un projet d'urbanisme.", templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      { key: 'projet_enquete', label: "Projet soumis à enquête", type: 'text', required: true },
      { key: 'commissaire_enqueteur', label: "Commissaire enquêteur", type: 'text', required: true },
      { key: 'periode_enquete', label: "Période d'enquête", type: 'text', required: true },
      { key: 'observations_public', label: "Observations du public", type: 'textarea', required: true },
      { key: 'conclusions', label: "Conclusions et avis motivé", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'ENQUÊTE PUBLIQUE</h1><p><strong>Projet :</strong> {{projet_enquete}}</p><p><strong>Commissaire enquêteur :</strong> {{commissaire_enqueteur}}</p><p><strong>Période :</strong> {{periode_enquete}}</p><h3>Observations du public</h3><p>{{observations_public}}</p><h3>Conclusions et avis</h3><p>{{conclusions}}</p></div>'
  },
  {
    code: 'urb_declaration_utilite_publique', name: "Déclaration d'Utilité Publique", category: 'btp_construction',
    price: 15000, priceMax: 45000, description: "Acte déclarant l'utilité publique d'un projet d'aménagement ouvrant droit à expropriation.", templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      { key: 'autorite', label: "Autorité déclarante", type: 'text', required: true },
      { key: 'projet', label: "Projet déclaré d'utilité publique", type: 'text', required: true },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true },
      { key: 'perimetre', label: "Périmètre concerné", type: 'textarea', required: true },
      { key: 'motifs', label: "Motifs d'utilité publique", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>DÉCLARATION D\'UTILITÉ PUBLIQUE</h1><p>L\'autorité soussignée, <strong>{{autorite}}</strong>, déclare d\'utilité publique le projet de <strong>{{projet}}</strong>.</p><p><strong>Date :</strong> {{date_acte}}</p><h3>Périmètre concerné</h3><p>{{perimetre}}</p><h3>Motifs</h3><p>{{motifs}}</p></div>'
  },
  {
    code: 'urb_acte_cessibilite', name: "Acte de Cessibilité", category: 'btp_construction',
    price: 12000, priceMax: 36000, description: "Acte de cessibilité désignant les immeubles à exproprier dans le cadre d'une DUP.", templateType: 'pdf', classe: 'A', active: true, popularity: 42,
    fieldsJson: F([
      { key: 'autorite', label: "Autorité émettrice", type: 'text', required: true },
      { key: 'reference_dup', label: "Référence de la DUP", type: 'text', required: true },
      { key: 'date_acte', label: "Date de l'acte", type: 'date', required: true },
      { key: 'description_immeubles', label: "Description des immeubles cessibles", type: 'textarea', required: true },
      { key: 'proprietaires_concernes', label: "Propriétaires concernés", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>ACTE DE CESSIBILITÉ</h1><p><strong>Autorité :</strong> {{autorite}}</p><p><strong>DUP de référence :</strong> {{reference_dup}}</p><p><strong>Date :</strong> {{date_acte}}</p><h3>Immeubles cessibles</h3><p>{{description_immeubles}}</p><h3>Propriétaires concernés</h3><p>{{proprietaires_concernes}}</p></div>'
  },
  {
    code: 'urb_convention_occupation_temp', name: "Convention d'Occupation Temporaire", category: 'btp_construction',
    price: 7000, priceMax: 21000, description: "Convention autorisant l'occupation temporaire d'une parcelle pour les besoins d'un chantier.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      { key: 'proprietaire', label: "Propriétaire de la parcelle", type: 'text', required: true },
      { key: 'occupant', label: "Bénéficiaire de l'occupation", type: 'text', required: true },
      { key: 'description_parcelle', label: "Description de la parcelle", type: 'text', required: true },
      { key: 'duree_occupation', label: "Durée d'occupation", type: 'text', required: true },
      { key: 'indemnite', label: "Indemnité d'occupation (FCFA)", type: 'text', required: true }
    ]),
    body: '<div class="doc"><h1>CONVENTION D\'OCCUPATION TEMPORAIRE</h1><p>Entre <strong>{{proprietaire}}</strong> (Propriétaire) et <strong>{{occupant}}</strong> (Occupant).</p><p><strong>Parcelle :</strong> {{description_parcelle}}</p><p><strong>Durée :</strong> {{duree_occupation}}</p><p><strong>Indemnité :</strong> {{indemnite}} FCFA</p><p>La présente convention prend fin de plein droit à l\'expiration de la durée convenue.</p></div>'
  },
  {
    code: 'urb_arrete_cessibilite', name: "Arrêté de Cessibilité", category: 'btp_construction',
    price: 10000, priceMax: 30000, description: "Arrêté préfectoral ou ministériel de cessibilité des biens dans le cadre d'une expropriation.", templateType: 'pdf', classe: 'A', active: true, popularity: 40,
    fieldsJson: F([
      { key: 'autorite', label: "Autorité signataire", type: 'text', required: true },
      { key: 'projet', label: "Projet concerné", type: 'text', required: true },
      { key: 'date_arrete', label: "Date de l'arrêté", type: 'date', required: true },
      { key: 'parcelles_concernees', label: "Parcelles concernées", type: 'textarea', required: true },
      { key: 'articles', label: "Dispositions de l'arrêté", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>ARRÊTÉ DE CESSIBILITÉ</h1><p><strong>Autorité :</strong> {{autorite}}</p><p><strong>Projet :</strong> {{projet}}</p><p><strong>Date :</strong> {{date_arrete}}</p><h3>Parcelles concernées</h3><p>{{parcelles_concernees}}</p><h3>Dispositions</h3><p>{{articles}}</p></div>'
  },
  {
    code: 'urb_plan_local_urbanisme', name: "Plan Local d'Urbanisme", category: 'btp_construction',
    price: 20000, priceMax: 60000, description: "Document constitutif du plan local d'urbanisme définissant les règles d'occupation des sols.", templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      { key: 'commune', label: "Commune concernée", type: 'text', required: true },
      { key: 'autorite_approbatrice', label: "Autorité approbatrice", type: 'text', required: true },
      { key: 'date_approbation', label: "Date d'approbation", type: 'date', required: true },
      { key: 'orientations_generales', label: "Orientations générales d'aménagement", type: 'textarea', required: true },
      { key: 'zones_definies', label: "Zones définies et leurs vocations", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>PLAN LOCAL D\'URBANISME</h1><p><strong>Commune :</strong> {{commune}}</p><p><strong>Autorité approbatrice :</strong> {{autorite_approbatrice}}</p><p><strong>Date d\'approbation :</strong> {{date_approbation}}</p><h3>Orientations générales</h3><p>{{orientations_generales}}</p><h3>Zones et vocations</h3><p>{{zones_definies}}</p></div>'
  },
  {
    code: 'urb_reglement_de_zone', name: "Règlement de Zone", category: 'btp_construction',
    price: 12000, priceMax: 36000, description: "Règlement applicable à une zone d'urbanisme définissant les droits et conditions de construction.", templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      { key: 'zone', label: "Désignation de la zone", type: 'text', required: true },
      { key: 'vocation_zone', label: "Vocation de la zone", type: 'text', required: true },
      { key: 'hauteur_max', label: "Hauteur maximale autorisée (m)", type: 'text', required: true },
      { key: 'ces_max', label: "CES maximum (%)", type: 'text', required: true },
      { key: 'regles_specifiques', label: "Règles spécifiques de la zone", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>RÈGLEMENT DE ZONE — {{zone}}</h1><p><strong>Vocation :</strong> {{vocation_zone}}</p><p><strong>Hauteur maximale :</strong> {{hauteur_max}} m</p><p><strong>CES maximum :</strong> {{ces_max}} %</p><h3>Règles spécifiques</h3><p>{{regles_specifiques}}</p></div>'
  },
  {
    code: 'urb_rapport_conformite_urbanistique', name: "Rapport de Conformité Urbanistique", category: 'btp_construction',
    price: 8000, priceMax: 24000, description: "Rapport vérifiant la conformité d'une construction aux prescriptions urbanistiques autorisées.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      { key: 'construction', label: "Construction vérifiée", type: 'text', required: true },
      { key: 'verificateur', label: "Vérificateur", type: 'text', required: true },
      { key: 'date_verification', label: "Date de vérification", type: 'date', required: true },
      { key: 'constats_conformite', label: "Constats de conformité", type: 'textarea', required: true },
      { key: 'conclusion', label: "Conclusion", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>RAPPORT DE CONFORMITÉ URBANISTIQUE</h1><p><strong>Construction :</strong> {{construction}}</p><p><strong>Vérificateur :</strong> {{verificateur}}</p><p><strong>Date :</strong> {{date_verification}}</p><h3>Constats de conformité</h3><p>{{constats_conformite}}</p><h3>Conclusion</h3><p>{{conclusion}}</p></div>'
  },
  {
    code: 'urb_attestation_non_opposition', name: "Attestation de Non-Opposition", category: 'btp_construction',
    price: 4000, priceMax: 12000, description: "Attestation de non-opposition à une déclaration préalable de travaux.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      { key: 'autorite', label: "Autorité délivrante", type: 'text', required: true },
      { key: 'demandeur', label: "Demandeur", type: 'text', required: true },
      { key: 'reference_declaration', label: "Référence de la déclaration", type: 'text', required: true },
      { key: 'date_attestation', label: "Date de l'attestation", type: 'date', required: true }
    ]),
    body: '<div class="doc"><h1>ATTESTATION DE NON-OPPOSITION</h1><p>L\'autorité soussignée, <strong>{{autorite}}</strong>, atteste ne pas s\'opposer à la déclaration de travaux N° <strong>{{reference_declaration}}</strong> déposée par <strong>{{demandeur}}</strong>.</p><p><strong>Date :</strong> {{date_attestation}}</p><p>La présente attestation vaut autorisation implicite de réaliser les travaux déclarés.</p></div>'
  },
  {
    code: 'urb_certificat_numerotage', name: "Certificat de Numérotage", category: 'btp_construction',
    price: 3000, priceMax: 9000, description: "Certificat attribuant un numéro officiel à une parcelle ou à un bâtiment dans la voirie.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      { key: 'autorite', label: "Autorité délivrante", type: 'text', required: true },
      { key: 'proprietaire', label: "Propriétaire / Demandeur", type: 'text', required: true },
      { key: 'adresse_rue', label: "Rue et localité", type: 'text', required: true },
      { key: 'numero_attribue', label: "Numéro attribué", type: 'text', required: true },
      { key: 'date_delivrance', label: "Date de délivrance", type: 'date', required: true }
    ]),
    body: '<div class="doc"><h1>CERTIFICAT DE NUMÉROTAGE</h1><p>L\'autorité soussignée, <strong>{{autorite}}</strong>, certifie que le bien sis <strong>{{adresse_rue}}</strong>, appartenant à <strong>{{proprietaire}}</strong>, se voit attribuer le numéro <strong>{{numero_attribue}}</strong>.</p><p><strong>Date :</strong> {{date_delivrance}}</p></div>'
  },
  {
    code: 'urb_plan_de_voirie', name: "Plan de Voirie", category: 'btp_construction',
    price: 8000, priceMax: 24000, description: "Notice technique accompagnant un plan de voirie pour un lotissement ou un projet d'aménagement.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      { key: 'projet', label: "Projet d'aménagement", type: 'text', required: true },
      { key: 'maitre_ouvrage', label: "Maître d'ouvrage", type: 'text', required: true },
      { key: 'lineaire_voirie', label: "Linéaire total de voirie (ml)", type: 'text', required: true },
      { key: 'caracteristiques', label: "Caractéristiques des voiries", type: 'textarea', required: true },
      { key: 'date_etablissement', label: "Date d'établissement", type: 'date', required: true }
    ]),
    body: '<div class="doc"><h1>NOTICE DE PLAN DE VOIRIE</h1><p><strong>Projet :</strong> {{projet}}</p><p><strong>Maître d\'ouvrage :</strong> {{maitre_ouvrage}}</p><p><strong>Linéaire total :</strong> {{lineaire_voirie}} ml</p><h3>Caractéristiques des voiries</h3><p>{{caracteristiques}}</p><p><strong>Date :</strong> {{date_etablissement}}</p></div>'
  },
  {
    code: 'urb_convention_raccordement_eau', name: "Convention de Raccordement Eau", category: 'btp_construction',
    price: 5000, priceMax: 15000, description: "Convention de raccordement au réseau d'eau potable pour un nouveau projet de construction.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      { key: 'abonne', label: "Nom de l'abonné", type: 'text', required: true },
      { key: 'adresse_branchement', label: "Adresse du branchement", type: 'text', required: true },
      { key: 'gestionnaire_reseau', label: "Gestionnaire du réseau (ex : SODECI)", type: 'text', required: true },
      { key: 'date_convention', label: "Date de la convention", type: 'date', required: true },
      { key: 'conditions_techniques', label: "Conditions techniques du raccordement", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>CONVENTION DE RACCORDEMENT AU RÉSEAU D\'EAU POTABLE</h1><p>Entre <strong>{{gestionnaire_reseau}}</strong> et <strong>{{abonne}}</strong> pour le branchement sis à <strong>{{adresse_branchement}}</strong>.</p><p><strong>Date :</strong> {{date_convention}}</p><h3>Conditions techniques</h3><p>{{conditions_techniques}}</p></div>'
  },
  {
    code: 'urb_convention_raccordement_elec', name: "Convention de Raccordement Électricité", category: 'btp_construction',
    price: 5000, priceMax: 15000, description: "Convention de raccordement au réseau électrique pour un projet de construction neuf.", templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      { key: 'abonne', label: "Nom de l'abonné", type: 'text', required: true },
      { key: 'adresse_branchement', label: "Adresse du branchement", type: 'text', required: true },
      { key: 'gestionnaire_reseau', label: "Gestionnaire du réseau (ex : CIE)", type: 'text', required: true },
      { key: 'puissance_souscrite', label: "Puissance souscrite (kVA)", type: 'text', required: true },
      { key: 'date_convention', label: "Date de la convention", type: 'date', required: true }
    ]),
    body: '<div class="doc"><h1>CONVENTION DE RACCORDEMENT AU RÉSEAU ÉLECTRIQUE</h1><p>Entre <strong>{{gestionnaire_reseau}}</strong> et <strong>{{abonne}}</strong> pour le branchement sis à <strong>{{adresse_branchement}}</strong>.</p><p><strong>Puissance souscrite :</strong> {{puissance_souscrite}} kVA</p><p><strong>Date :</strong> {{date_convention}}</p></div>'
  },
  {
    code: 'urb_rapport_impact_environnemental', name: "Rapport d'Impact Environnemental", category: 'btp_construction',
    price: 18000, priceMax: 54000, description: "Rapport d'évaluation des impacts environnementaux d'un projet d'aménagement urbain.", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      { key: 'projet', label: "Projet évalué", type: 'text', required: true },
      { key: 'bureau_etude', label: "Bureau d'étude environnemental", type: 'text', required: true },
      { key: 'date_rapport', label: "Date du rapport", type: 'date', required: true },
      { key: 'impacts_identifies', label: "Impacts environnementaux identifiés", type: 'textarea', required: true },
      { key: 'mesures_attenuation', label: "Mesures d'atténuation proposées", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>RAPPORT D\'IMPACT ENVIRONNEMENTAL</h1><p><strong>Projet :</strong> {{projet}}</p><p><strong>Bureau d\'étude :</strong> {{bureau_etude}}</p><p><strong>Date :</strong> {{date_rapport}}</p><h3>Impacts environnementaux</h3><p>{{impacts_identifies}}</p><h3>Mesures d\'atténuation</h3><p>{{mesures_attenuation}}</p></div>'
  },
  {
    code: 'urb_etude_impact_social', name: "Étude d'Impact Social", category: 'btp_construction',
    price: 15000, priceMax: 45000, description: "Étude évaluant les impacts sociaux d'un projet d'urbanisme sur les populations affectées.", templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      { key: 'projet', label: "Projet concerné", type: 'text', required: true },
      { key: 'consultant', label: "Consultant / Bureau d'étude", type: 'text', required: true },
      { key: 'date_etude', label: "Date de l'étude", type: 'date', required: true },
      { key: 'populations_affectees', label: "Populations affectées", type: 'textarea', required: true },
      { key: 'impacts_sociaux', label: "Impacts sociaux identifiés", type: 'textarea', required: true },
      { key: 'plan_gestion', label: "Plan de gestion des impacts", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>ÉTUDE D\'IMPACT SOCIAL</h1><p><strong>Projet :</strong> {{projet}}</p><p><strong>Consultant :</strong> {{consultant}}</p><p><strong>Date :</strong> {{date_etude}}</p><h3>Populations affectées</h3><p>{{populations_affectees}}</p><h3>Impacts sociaux</h3><p>{{impacts_sociaux}}</p><h3>Plan de gestion</h3><p>{{plan_gestion}}</p></div>'
  },
  {
    code: 'urb_declaration_travaux_voie_pub', name: "Déclaration Travaux Voie Publique", category: 'btp_construction',
    price: 4000, priceMax: 12000, description: "Déclaration préalable pour tous travaux affectant la voie publique (tranchées, réseaux, etc.).", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      { key: 'declarant', label: "Déclarant (entreprise ou particulier)", type: 'text', required: true },
      { key: 'localisation_travaux', label: "Localisation des travaux sur voie publique", type: 'text', required: true },
      { key: 'nature_travaux', label: "Nature des travaux", type: 'textarea', required: true },
      { key: 'date_debut', label: "Date de début prévue", type: 'date', required: true },
      { key: 'duree_estimee', label: "Durée estimée des travaux", type: 'text', required: true }
    ]),
    body: '<div class="doc"><h1>DÉCLARATION DE TRAVAUX SUR VOIE PUBLIQUE</h1><p>Je soussigné(e), <strong>{{declarant}}</strong>, déclare l\'exécution de travaux sur la voie publique à <strong>{{localisation_travaux}}</strong>.</p><h3>Nature des travaux</h3><p>{{nature_travaux}}</p><p><strong>Début :</strong> {{date_debut}}</p><p><strong>Durée estimée :</strong> {{duree_estimee}}</p></div>'
  },
  {
    code: 'urb_autorisation_domaine_public', name: "Autorisation d'Occupation du Domaine Public", category: 'btp_construction',
    price: 6000, priceMax: 18000, description: "Autorisation d'occuper temporairement ou de manière permanente le domaine public.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      { key: 'autorite', label: "Autorité accordant l'autorisation", type: 'text', required: true },
      { key: 'beneficiaire', label: "Bénéficiaire de l'autorisation", type: 'text', required: true },
      { key: 'objet_occupation', label: "Objet de l'occupation", type: 'textarea', required: true },
      { key: 'superficie_m2', label: "Superficie occupée (m²)", type: 'text', required: true },
      { key: 'date_autorisation', label: "Date de l'autorisation", type: 'date', required: true }
    ]),
    body: '<div class="doc"><h1>AUTORISATION D\'OCCUPATION DU DOMAINE PUBLIC</h1><p>L\'autorité soussignée, <strong>{{autorite}}</strong>, autorise <strong>{{beneficiaire}}</strong> à occuper une superficie de <strong>{{superficie_m2}} m²</strong> du domaine public.</p><h3>Objet de l\'occupation</h3><p>{{objet_occupation}}</p><p><strong>Date :</strong> {{date_autorisation}}</p></div>'
  },
  {
    code: 'urb_rapport_commission_urbanisme', name: "Rapport Commission Urbanisme", category: 'btp_construction',
    price: 8000, priceMax: 24000, description: "Rapport de séance de la commission locale d'urbanisme statuant sur des demandes de permis.", templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      { key: 'commission', label: "Désignation de la commission", type: 'text', required: true },
      { key: 'date_seance', label: "Date de la séance", type: 'date', required: true },
      { key: 'membres_presents', label: "Membres présents", type: 'textarea', required: true },
      { key: 'dossiers_examines', label: "Dossiers examinés", type: 'textarea', required: true },
      { key: 'decisions_prises', label: "Décisions prises", type: 'textarea', required: true }
    ]),
    body: '<div class="doc"><h1>RAPPORT DE COMMISSION D\'URBANISME</h1><p><strong>Commission :</strong> {{commission}}</p><p><strong>Date de séance :</strong> {{date_seance}}</p><h3>Membres présents</h3><p>{{membres_presents}}</p><h3>Dossiers examinés</h3><p>{{dossiers_examines}}</p><h3>Décisions</h3><p>{{decisions_prises}}</p></div>'
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
  console.log(`Batch 12a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
