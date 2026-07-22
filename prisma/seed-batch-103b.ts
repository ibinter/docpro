import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── PROTECTION SOCIALE / CNPS (soc5_) ──────────────────────────────────────
  {
    code: 'soc5_immat_employeur', name: "Accord d'immatriculation CNPS Employeur", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Formulaire d'immatriculation d'un employeur auprès de la Caisse Nationale de Prévoyance Sociale (CNPS) de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'forme_juridique',label:"Forme juridique",type:'text',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true},
      {key:'activite_principale',label:"Activité principale",type:'text',required:true},
      {key:'adresse_siege',label:"Adresse du siège social",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE D'IMMATRICULATION EMPLOYEUR — CNPS</h1><p>La société <strong>{{raison_sociale}}</strong> ({{forme_juridique}}), créée le {{date_creation}}, dont l'activité principale est {{activite_principale}}, dont le siège est sis au {{adresse_siege}}, sollicite son immatriculation en qualité d'employeur auprès de la CNPS conformément au Code de Prévoyance Sociale ivoirien.</p></div>` },

  {
    code: 'soc5_immat_travailleur', name: "Accord d'immatriculation CNPS Travailleur", category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Formulaire d'immatriculation d'un travailleur salarié auprès de la CNPS de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms du travailleur",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'numero_cnps_employeur',label:"Numéro CNPS de l'employeur",type:'text',required:true},
      {key:'poste_occupe',label:"Poste occupé",type:'text',required:true},
      {key:'date_embauche',label:"Date d'embauche",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE D'IMMATRICULATION TRAVAILLEUR — CNPS</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong>, né(e) le {{date_naissance}}, employé(e) par l'entreprise immatriculée sous le numéro CNPS {{numero_cnps_employeur}} au poste de {{poste_occupe}} depuis le {{date_embauche}}, sollicite mon immatriculation auprès de la CNPS.</p></div>` },

  {
    code: 'soc5_decl_mensuelle', name: "Accord de Déclaration Mensuelle de Cotisations CNPS", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Modèle de déclaration mensuelle des cotisations dues à la CNPS par l'employeur, conformément à la réglementation ivoirienne.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'numero_cnps',label:"Numéro d'immatriculation CNPS",type:'text',required:true},
      {key:'mois_declaration',label:"Mois de déclaration (ex: Janvier 2025)",type:'text',required:true},
      {key:'effectif_salaries',label:"Effectif total des salariés",type:'text',required:true},
      {key:'masse_salariale',label:"Masse salariale brute (FCFA)",type:'text',required:true},
      {key:'montant_cotisations',label:"Montant total des cotisations (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION MENSUELLE DES COTISATIONS — CNPS</h1><p>L'employeur portant le numéro CNPS <strong>{{numero_cnps}}</strong> déclare pour le mois de <strong>{{mois_declaration}}</strong> un effectif de {{effectif_salaries}} salariés, une masse salariale brute de {{masse_salariale}} FCFA et un montant total de cotisations de {{montant_cotisations}} FCFA, conformément aux dispositions du Code de Prévoyance Sociale.</p></div>` },

  {
    code: 'soc5_regularisation_arrieres', name: "Accord de Régularisation d'Arriérés CNPS", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Demande de régularisation des arriérés de cotisations CNPS avec justification et proposition d'apurement.", templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'numero_cnps',label:"Numéro CNPS employeur",type:'text',required:true},
      {key:'montant_arrier',label:"Montant total des arriérés (FCFA)",type:'text',required:true},
      {key:'periode_concernee',label:"Période concernée",type:'text',required:true},
      {key:'motif_retard',label:"Motif du retard de paiement",type:'textarea',required:true},
      {key:'date_regularisation',label:"Date proposée de régularisation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RÉGULARISATION D'ARRIÉRÉS — CNPS</h1><p>L'entreprise immatriculée sous le numéro CNPS <strong>{{numero_cnps}}</strong> accuse des arriérés de cotisations d'un montant de <strong>{{montant_arrier}} FCFA</strong> pour la période {{periode_concernee}}. Le retard est motivé par : {{motif_retard}}. L'employeur s'engage à régulariser sa situation au plus tard le {{date_regularisation}}.</p></div>` },

  {
    code: 'soc5_echelonnement_dettes', name: "Accord de Plan d'Échelonnement de Dettes CNPS", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Convention d'échelonnement des dettes de cotisations CNPS entre l'employeur et la CNPS.", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'numero_cnps',label:"Numéro CNPS employeur",type:'text',required:true},
      {key:'montant_total_dettes',label:"Montant total des dettes (FCFA)",type:'text',required:true},
      {key:'nombre_echeances',label:"Nombre d'échéances demandées",type:'text',required:true},
      {key:'montant_echeance',label:"Montant par échéance (FCFA)",type:'text',required:true},
      {key:'date_premier_versement',label:"Date du premier versement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN D'ÉCHELONNEMENT DE DETTES CNPS</h1><p>Entre la CNPS et l'employeur (N° <strong>{{numero_cnps}}</strong>), il est convenu que la dette totale de <strong>{{montant_total_dettes}} FCFA</strong> sera remboursée en {{nombre_echeances}} échéances de {{montant_echeance}} FCFA chacune, la première échéance étant fixée au {{date_premier_versement}}.</p></div>` },

  {
    code: 'soc5_pension_invalidite', name: "Accord de Demande de Pension d'Invalidité (CNPS)", category: 'rh_emploi', price: 3500, priceMax: 10500,
    description: "Demande de pension d'invalidité auprès de la CNPS pour un travailleur reconnu invalide.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms du demandeur",type:'text',required:true},
      {key:'numero_cnps',label:"Numéro d'immatriculation CNPS",type:'text',required:true},
      {key:'date_constat_invalidite',label:"Date de constat d'invalidité",type:'date',required:true},
      {key:'taux_invalidite',label:"Taux d'invalidité reconnu (%)",type:'text',required:true},
      {key:'medecin_referent',label:"Médecin référent",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE PENSION D'INVALIDITÉ — CNPS</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong>, immatriculé(e) sous le numéro CNPS <strong>{{numero_cnps}}</strong>, reconnu(e) invalide à hauteur de {{taux_invalidite}}% depuis le {{date_constat_invalidite}}, sollicite l'attribution d'une pension d'invalidité conformément aux dispositions légales en vigueur en Côte d'Ivoire. Médecin référent : {{medecin_referent}}.</p></div>` },

  {
    code: 'soc5_pension_vieillesse', name: "Accord de Demande de Pension Vieillesse (CNPS)", category: 'rh_emploi', price: 3500, priceMax: 10500,
    description: "Demande de pension de vieillesse auprès de la CNPS à l'âge légal de départ à la retraite.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'numero_cnps',label:"Numéro CNPS",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'date_derniere_activite',label:"Date de cessation d'activité",type:'date',required:true},
      {key:'duree_cotisation',label:"Durée totale de cotisation (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE PENSION DE VIEILLESSE — CNPS</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (N° CNPS : {{numero_cnps}}), né(e) le {{date_naissance}}, ayant cessé toute activité professionnelle le {{date_derniere_activite}} après {{duree_cotisation}} années de cotisation, sollicite la liquidation de ma pension de vieillesse conformément au Code de Prévoyance Sociale ivoirien.</p></div>` },

  {
    code: 'soc5_rente_at', name: "Accord de Demande de Rente Accident de Travail (CNPS)", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Demande de rente suite à un accident du travail ayant entraîné une incapacité permanente.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms de la victime",type:'text',required:true},
      {key:'numero_cnps',label:"Numéro CNPS",type:'text',required:true},
      {key:'date_accident',label:"Date de l'accident",type:'date',required:true},
      {key:'nature_accident',label:"Nature et circonstances de l'accident",type:'textarea',required:true},
      {key:'taux_incapacite',label:"Taux d'incapacité permanente (%)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RENTE — ACCIDENT DU TRAVAIL — CNPS</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (N° CNPS : {{numero_cnps}}), victime d'un accident du travail survenu le {{date_accident}} dans les circonstances suivantes : {{nature_accident}}. Mon taux d'incapacité permanente est évalué à {{taux_incapacite}}%. Je sollicite l'attribution d'une rente conformément aux dispositions du Code de Prévoyance Sociale.</p></div>` },

  {
    code: 'soc5_allocation_familiale', name: "Accord de Demande d'Allocation Familiale (CNPS)", category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Demande d'allocations familiales pour enfant(s) à charge auprès de la CNPS.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_prenom_parent',label:"Nom et prénoms du parent demandeur",type:'text',required:true},
      {key:'numero_cnps',label:"Numéro CNPS",type:'text',required:true},
      {key:'nombre_enfants',label:"Nombre d'enfants à charge",type:'text',required:true},
      {key:'noms_enfants',label:"Nom et date de naissance de chaque enfant",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE D'ALLOCATIONS FAMILIALES — CNPS</h1><p>Je soussigné(e) <strong>{{nom_prenom_parent}}</strong> (N° CNPS : {{numero_cnps}}), parent de {{nombre_enfants}} enfant(s) à charge dont les identités sont : {{noms_enfants}}, sollicite l'attribution des allocations familiales conformément à la législation sociale ivoirienne.</p></div>` },

  {
    code: 'soc5_decl_accident_travail', name: "Accord de Déclaration d'Accident de Travail (CNPS)", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Déclaration obligatoire d'un accident du travail à la CNPS par l'employeur.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de l'employeur",type:'text',required:true},
      {key:'numero_cnps_emp',label:"Numéro CNPS employeur",type:'text',required:true},
      {key:'nom_victime',label:"Nom et prénoms de la victime",type:'text',required:true},
      {key:'date_heure_accident',label:"Date et heure de l'accident",type:'text',required:true},
      {key:'description_accident',label:"Description détaillée de l'accident",type:'textarea',required:true},
      {key:'temoin',label:"Nom du témoin éventuel",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION D'ACCIDENT DU TRAVAIL — CNPS</h1><p>L'entreprise <strong>{{raison_sociale}}</strong> (N° CNPS : {{numero_cnps_emp}}) déclare un accident du travail survenu le {{date_heure_accident}} à <strong>{{nom_victime}}</strong>. Circonstances : {{description_accident}}. Témoin : {{temoin}}. Cette déclaration est faite conformément à l'article 23 du Code de Prévoyance Sociale.</p></div>` },

  {
    code: 'soc5_maladie_prof', name: "Accord de Déclaration de Maladie Professionnelle (CNPS)", category: 'rh_emploi', price: 3500, priceMax: 10500,
    description: "Déclaration de maladie professionnelle reconnue à la CNPS.", templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'nom_travailleur',label:"Nom et prénoms du travailleur",type:'text',required:true},
      {key:'numero_cnps',label:"Numéro CNPS",type:'text',required:true},
      {key:'denomination_maladie',label:"Dénomination de la maladie professionnelle",type:'text',required:true},
      {key:'date_premier_symptome',label:"Date d'apparition des premiers symptômes",type:'date',required:true},
      {key:'agent_cause',label:"Agent causal (substance, poussière, etc.)",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE MALADIE PROFESSIONNELLE — CNPS</h1><p>Je soussigné(e) <strong>{{nom_travailleur}}</strong> (N° CNPS : {{numero_cnps}}) déclare être atteint(e) de la maladie professionnelle suivante : <strong>{{denomination_maladie}}</strong>, dont les premiers symptômes sont apparus le {{date_premier_symptome}}, imputables à l'exposition à : {{agent_cause}}.</p></div>` },

  {
    code: 'soc5_remboursement_frais', name: "Accord de Demande de Remboursement de Frais Médicaux (CNPS)", category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Demande de remboursement de frais médicaux engagés suite à un accident du travail ou maladie professionnelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom et prénoms du bénéficiaire",type:'text',required:true},
      {key:'numero_cnps',label:"Numéro CNPS",type:'text',required:true},
      {key:'nature_soins',label:"Nature des soins effectués",type:'textarea',required:true},
      {key:'montant_reclame',label:"Montant total réclamé (FCFA)",type:'text',required:true},
      {key:'date_soins',label:"Période des soins",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE REMBOURSEMENT DE FRAIS MÉDICAUX — CNPS</h1><p>Je soussigné(e) <strong>{{nom_beneficiaire}}</strong> (N° CNPS : {{numero_cnps}}) sollicite le remboursement de frais médicaux d'un montant de <strong>{{montant_reclame}} FCFA</strong> engagés durant la période {{date_soins}} pour les soins suivants : {{nature_soins}}.</p></div>` },

  {
    code: 'soc5_affil_domestique', name: "Accord d'Affiliation de Travailleur Domestique (CNPS)", category: 'rh_emploi', price: 2000, priceMax: 6000,
    description: "Déclaration d'un travailleur domestique (employé de maison) auprès de la CNPS.", templateType: 'pdf', classe: 'B', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_employeur',label:"Nom et prénoms de l'employeur particulier",type:'text',required:true},
      {key:'nom_domestique',label:"Nom et prénoms du travailleur domestique",type:'text',required:true},
      {key:'date_embauche',label:"Date d'embauche",type:'date',required:true},
      {key:'nature_emploi',label:"Nature de l'emploi (cuisinier, gardien, etc.)",type:'text',required:true},
      {key:'salaire_mensuel',label:"Salaire mensuel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>AFFILIATION D'UN TRAVAILLEUR DOMESTIQUE — CNPS</h1><p>Je soussigné(e) <strong>{{nom_employeur}}</strong>, particulier employeur, déclare avoir embauché <strong>{{nom_domestique}}</strong> en qualité de {{nature_emploi}} depuis le {{date_embauche}}, pour un salaire mensuel de {{salaire_mensuel}} FCFA. Je sollicite son affiliation à la CNPS.</p></div>` },

  {
    code: 'soc5_travailleur_independant', name: "Accord de Déclaration Travailleur Indépendant (CNPS)", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Affiliation volontaire d'un travailleur indépendant à la CNPS de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'profession',label:"Profession ou activité exercée",type:'text',required:true},
      {key:'date_debut_activite',label:"Date de début d'activité",type:'date',required:true},
      {key:'revenu_mensuel_estime',label:"Revenu mensuel estimé (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE TRAVAILLEUR INDÉPENDANT — CNPS</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong>, exerçant la profession de {{profession}} depuis le {{date_debut_activite}}, pour un revenu mensuel estimé à {{revenu_mensuel_estime}} FCFA, déclare souhaiter m'affilier à la CNPS en qualité de travailleur indépendant conformément aux dispositions légales en vigueur.</p></div>` },

  {
    code: 'soc5_cotisation_volontaire', name: "Accord de Cotisation Volontaire Travailleur Non Salarié (CNPS)", category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Convention de cotisation volontaire pour un travailleur non salarié souhaitant se constituer des droits à la retraite.", templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_cotisant',label:"Nom et prénoms du cotisant",type:'text',required:true},
      {key:'numero_cnps',label:"Numéro CNPS",type:'text',required:true},
      {key:'montant_cotisation',label:"Montant mensuel de cotisation choisi (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des cotisations volontaires",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>COTISATION VOLONTAIRE — TRAVAILLEUR NON SALARIÉ — CNPS</h1><p>Je soussigné(e) <strong>{{nom_cotisant}}</strong> (N° CNPS : {{numero_cnps}}) souscris à un régime de cotisation volontaire à hauteur de {{montant_cotisation}} FCFA par mois, à compter du {{date_debut}}, afin de me constituer des droits à la protection sociale en qualité de travailleur non salarié.</p></div>` },

  {
    code: 'soc5_rachat_periodes', name: "Accord de Rachat de Périodes de Cotisation (CNPS)", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Demande de rachat de périodes de cotisation non cotisées afin de compléter les droits à la retraite CNPS.", templateType: 'pdf', classe: 'B', active: true, popularity: 43,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'numero_cnps',label:"Numéro CNPS",type:'text',required:true},
      {key:'periodes_racheter',label:"Périodes à racheter (années/mois)",type:'textarea',required:true},
      {key:'montant_estime',label:"Montant estimé du rachat (FCFA)",type:'text',required:true},
      {key:'motif_lacunes',label:"Motif des lacunes de cotisation",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RACHAT DE PÉRIODES DE COTISATION — CNPS</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (N° CNPS : {{numero_cnps}}) sollicite le rachat des périodes de cotisation suivantes : {{periodes_racheter}}. Ces lacunes sont dues à : {{motif_lacunes}}. Le montant estimé du rachat s'élève à {{montant_estime}} FCFA.</p></div>` },

  {
    code: 'soc5_transfert_pension', name: "Accord de Transfert de Pension (Convention Bilatérale)", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Demande de transfert de droits à pension dans le cadre d'une convention bilatérale de sécurité sociale.", templateType: 'pdf', classe: 'B', active: true, popularity: 38,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms du bénéficiaire",type:'text',required:true},
      {key:'pays_origine',label:"Pays d'origine des droits à transférer",type:'text',required:true},
      {key:'numero_cnps_ci',label:"Numéro CNPS Côte d'Ivoire",type:'text',required:true},
      {key:'numero_organisme_etranger',label:"Numéro auprès de l'organisme étranger",type:'text',required:true},
      {key:'periode_affiliation_etrangere',label:"Période d'affiliation à l'étranger",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE TRANSFERT DE PENSION — CONVENTION BILATÉRALE</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (N° CNPS CI : {{numero_cnps_ci}}), ayant été affilié(e) en {{pays_origine}} sous le numéro {{numero_organisme_etranger}} pour la période {{periode_affiliation_etrangere}}, sollicite le transfert de mes droits à pension vers la CNPS de Côte d'Ivoire en application de la convention bilatérale de sécurité sociale.</p></div>` },

  {
    code: 'soc5_certificat_conformite', name: "Accord de Demande de Certificat de Conformité CNPS", category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Demande de certificat attestant la conformité sociale d'une entreprise vis-à-vis de la CNPS.", templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'numero_cnps',label:"Numéro CNPS employeur",type:'text',required:true},
      {key:'motif_demande',label:"Motif de la demande (appel d'offres, partenariat, etc.)",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE CERTIFICAT DE CONFORMITÉ CNPS</h1><p>L'entreprise <strong>{{raison_sociale}}</strong> (N° CNPS : {{numero_cnps}}) sollicite la délivrance d'un certificat de conformité sociale en date du {{date_demande}} pour : {{motif_demande}}. L'entreprise atteste être en règle vis-à-vis de ses obligations envers la CNPS.</p></div>` },

  {
    code: 'soc5_sst_modele', name: "Accord de Service de Santé au Travail — Modèle SST CNPS", category: 'rh_emploi', price: 6000, priceMax: 18000,
    description: "Convention-cadre de service de santé au travail conforme au modèle recommandé par la CNPS.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de l'employeur",type:'text',required:true},
      {key:'numero_cnps',label:"Numéro CNPS",type:'text',required:true},
      {key:'nom_medecin_travail',label:"Nom du médecin du travail désigné",type:'text',required:true},
      {key:'effectif_concerne',label:"Effectif salarié concerné",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE DE SANTÉ AU TRAVAIL — SST</h1><p>L'entreprise <strong>{{raison_sociale}}</strong> (N° CNPS : {{numero_cnps}}) organise son service de santé au travail sous la responsabilité du Dr <strong>{{nom_medecin_travail}}</strong>, couvrant un effectif de {{effectif_concerne}} salariés à compter du {{date_prise_effet}}, conformément aux prescriptions de la CNPS et du Code du Travail ivoirien.</p></div>` },

  {
    code: 'soc5_prevention_risques', name: "Accord de Prévention des Risques Professionnels (CNPS DPRP)", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Plan de prévention des risques professionnels conforme aux exigences de la Direction de la Prévention des Risques Professionnels de la CNPS.", templateType: 'pdf', classe: 'B', active: true, popularity: 51,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'secteur_activite',label:"Secteur d'activité",type:'text',required:true},
      {key:'risques_identifies',label:"Risques professionnels identifiés",type:'textarea',required:true},
      {key:'mesures_prevention',label:"Mesures de prévention mises en place",type:'textarea',required:true},
      {key:'responsable_securite',label:"Responsable sécurité désigné",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE PRÉVENTION DES RISQUES PROFESSIONNELS — CNPS DPRP</h1><p>L'entreprise <strong>{{raison_sociale}}</strong> (secteur : {{secteur_activite}}) présente son plan de prévention des risques professionnels. Risques identifiés : {{risques_identifies}}. Mesures de prévention : {{mesures_prevention}}. Responsable sécurité : {{responsable_securite}}.</p></div>` },

  {
    code: 'soc5_inspection_travail', name: "Accord d'Inspection du Travail — Signalement CNPS", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Formulaire de signalement adressé à l'Inspection du Travail et relayé à la CNPS.", templateType: 'pdf', classe: 'B', active: true, popularity: 47,
    fieldsJson: F([
      {key:'nom_declarant',label:"Nom et qualité du déclarant",type:'text',required:true},
      {key:'nom_entreprise',label:"Entreprise concernée",type:'text',required:true},
      {key:'nature_signalement',label:"Nature du signalement",type:'textarea',required:true},
      {key:'date_faits',label:"Date des faits signalés",type:'date',required:true},
      {key:'preuves_disponibles',label:"Pièces justificatives disponibles",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>SIGNALEMENT À L'INSPECTION DU TRAVAIL / CNPS</h1><p>Je soussigné(e) <strong>{{nom_declarant}}</strong> signale les faits suivants concernant l'entreprise <strong>{{nom_entreprise}}</strong>, survenus le {{date_faits}} : {{nature_signalement}}. Pièces justificatives : {{preuves_disponibles}}.</p></div>` },

  {
    code: 'soc5_recours_commission', name: "Accord de Recours CNPS — Commission de Recours Amiable", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Recours amiable devant la commission compétente de la CNPS pour contester une décision.", templateType: 'pdf', classe: 'B', active: true, popularity: 44,
    fieldsJson: F([
      {key:'nom_requerant',label:"Nom et prénoms du requérant",type:'text',required:true},
      {key:'numero_cnps',label:"Numéro CNPS",type:'text',required:true},
      {key:'decision_contestee',label:"Décision contestée (référence et date)",type:'text',required:true},
      {key:'motifs_recours',label:"Motifs du recours",type:'textarea',required:true},
      {key:'demande_precise',label:"Demande précise formulée",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RECOURS AMIABLE — COMMISSION DE RECOURS CNPS</h1><p>Je soussigné(e) <strong>{{nom_requerant}}</strong> (N° CNPS : {{numero_cnps}}) conteste la décision {{decision_contestee}} pour les motifs suivants : {{motifs_recours}}. Je demande : {{demande_precise}}.</p></div>` },

  {
    code: 'soc5_conformite_sociale', name: "Rapport de Conformité Sociale Entreprise", category: 'rh_emploi', price: 7000, priceMax: 21000,
    description: "Rapport complet d'audit de conformité sociale d'une entreprise vis-à-vis des obligations CNPS et du droit du travail ivoirien.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'periode_audit',label:"Période auditée",type:'text',required:true},
      {key:'auditeur',label:"Nom de l'auditeur ou du cabinet",type:'text',required:true},
      {key:'observations',label:"Principales observations",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONFORMITÉ SOCIALE</h1><h2>{{raison_sociale}} — Période : {{periode_audit}}</h2><p>Auditeur : <strong>{{auditeur}}</strong></p><h3>Observations</h3><p>{{observations}}</p><h3>Recommandations</h3><p>{{recommandations}}</p></div>` },

  {
    code: 'soc5_mise_conformite', name: "Plan de Mise en Conformité CNPS", category: 'rh_emploi', price: 6000, priceMax: 18000,
    description: "Plan d'action structuré pour mettre une entreprise en conformité avec ses obligations envers la CNPS.", templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'ecarts_identifies',label:"Écarts de conformité identifiés",type:'textarea',required:true},
      {key:'actions_correctives',label:"Actions correctives prévues",type:'textarea',required:true},
      {key:'calendrier',label:"Calendrier de mise en oeuvre",type:'textarea',required:true},
      {key:'responsable_suivi',label:"Responsable du suivi",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE MISE EN CONFORMITÉ CNPS</h1><p>Entreprise : <strong>{{raison_sociale}}</strong></p><h3>Écarts identifiés</h3><p>{{ecarts_identifies}}</p><h3>Actions correctives</h3><p>{{actions_correctives}}</p><h3>Calendrier</h3><p>{{calendrier}}</p><p>Responsable du suivi : {{responsable_suivi}}</p></div>` },

  {
    code: 'soc5_charte_protection', name: "Charte de la Protection Sociale du Travailleur en Côte d'Ivoire", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Charte interne d'entreprise définissant les engagements en matière de protection sociale des travailleurs en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'representant_legal',label:"Représentant légal",type:'text',required:true},
      {key:'engagements_patronaux',label:"Engagements patronaux en matière de protection sociale",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA PROTECTION SOCIALE DU TRAVAILLEUR</h1><h2>{{raison_sociale}}</h2><p>Le soussigné <strong>{{representant_legal}}</strong>, représentant légal, adopte la présente charte en date du {{date_adoption}} et prend les engagements suivants : {{engagements_patronaux}}. Cette charte s'inscrit dans le cadre du Code de Prévoyance Sociale et des conventions collectives applicables en Côte d'Ivoire.</p></div>` },

  // ── RETRAITE / PENSION CGRAE (retr_) ──────────────────────────────────────
  {
    code: 'retr_liquidation_pension', name: "Accord de Liquidation de Pension Fonctionnaire (CGRAE)", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Demande de liquidation de pension de retraite d'un fonctionnaire auprès de la Caisse Générale de Retraite des Agents de l'État (CGRAE) de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms du fonctionnaire",type:'text',required:true},
      {key:'matricule',label:"Matricule de la Fonction Publique",type:'text',required:true},
      {key:'corps_grade',label:"Corps et grade",type:'text',required:true},
      {key:'date_depart',label:"Date de départ à la retraite",type:'date',required:true},
      {key:'duree_service',label:"Durée totale de service (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE LIQUIDATION DE PENSION — CGRAE</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong>, fonctionnaire de l'État (matricule : {{matricule}}), de corps et grade {{corps_grade}}, partant à la retraite le {{date_depart}} après {{duree_service}} années de service, sollicite la liquidation de ma pension auprès de la CGRAE conformément aux dispositions du Statut Général de la Fonction Publique.</p></div>` },

  {
    code: 'retr_demande_retraite', name: "Accord de Demande de Mise à la Retraite (Fonctionnaire CI)", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Demande formelle de mise à la retraite adressée à l'autorité hiérarchique par un fonctionnaire de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'matricule',label:"Matricule",type:'text',required:true},
      {key:'ministere_affectation',label:"Ministère d'affectation",type:'text',required:true},
      {key:'date_souhaitee_depart',label:"Date souhaitée de départ",type:'date',required:true},
      {key:'motif_demande',label:"Motif de la demande",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE MISE À LA RETRAITE</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (matricule : {{matricule}}), affecté(e) au {{ministere_affectation}}, sollicite ma mise à la retraite à compter du {{date_souhaitee_depart}}. Motif : {{motif_demande}}. Je m'engage à effectuer toutes les formalités auprès de la CGRAE.</p></div>` },

  {
    code: 'retr_pension_reversion', name: "Accord de Demande de Pension de Réversion — Conjoint Survivant (CGRAE)", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Demande de pension de réversion au bénéfice du conjoint survivant d'un fonctionnaire décédé.", templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'nom_conjoint',label:"Nom et prénoms du conjoint survivant",type:'text',required:true},
      {key:'nom_defunt',label:"Nom et prénoms du fonctionnaire décédé",type:'text',required:true},
      {key:'matricule_defunt',label:"Matricule du fonctionnaire décédé",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'lien_matrimonial',label:"Lien matrimonial (acte de mariage N°)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE PENSION DE RÉVERSION — CGRAE</h1><p>Je soussigné(e) <strong>{{nom_conjoint}}</strong>, conjoint(e) survivant(e) de <strong>{{nom_defunt}}</strong> (matricule : {{matricule_defunt}}), décédé(e) le {{date_deces}}, justifiant du lien matrimonial par {{lien_matrimonial}}, sollicite l'attribution d'une pension de réversion auprès de la CGRAE.</p></div>` },

  {
    code: 'retr_pension_orphelin', name: "Accord de Demande de Pension d'Orphelin (CGRAE)", category: 'rh_emploi', price: 3500, priceMax: 10500,
    description: "Demande de pension d'orphelin à la charge du fonctionnaire décédé, adressée à la CGRAE.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_tuteur',label:"Nom et prénoms du tuteur légal",type:'text',required:true},
      {key:'nom_orphelin',label:"Nom et prénoms de l'orphelin",type:'text',required:true},
      {key:'date_naissance_orphelin',label:"Date de naissance de l'orphelin",type:'date',required:true},
      {key:'nom_parent_defunt',label:"Nom du parent fonctionnaire décédé",type:'text',required:true},
      {key:'matricule_defunt',label:"Matricule du parent décédé",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE PENSION D'ORPHELIN — CGRAE</h1><p>Le soussigné(e) <strong>{{nom_tuteur}}</strong>, tuteur légal de l'orphelin <strong>{{nom_orphelin}}</strong>, né(e) le {{date_naissance_orphelin}}, enfant de <strong>{{nom_parent_defunt}}</strong> (matricule : {{matricule_defunt}}), sollicite l'attribution d'une pension d'orphelin auprès de la CGRAE.</p></div>` },

  {
    code: 'retr_allocation_unique', name: "Accord de Demande d'Allocation Unique (CGRAE)", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Demande d'allocation unique versée en cas de carrière courte ou de décès sans ayants droit à pension.", templateType: 'pdf', classe: 'B', active: true, popularity: 49,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms du demandeur",type:'text',required:true},
      {key:'matricule',label:"Matricule ou N° de dossier CGRAE",type:'text',required:true},
      {key:'motif_allocation',label:"Motif de la demande d'allocation unique",type:'textarea',required:true},
      {key:'coordonnees_bancaires',label:"Coordonnées bancaires (RIB/domiciliation)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE D'ALLOCATION UNIQUE — CGRAE</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (matricule/dossier : {{matricule}}) sollicite le versement de l'allocation unique pour le motif suivant : {{motif_allocation}}. Domiciliation bancaire : {{coordonnees_bancaires}}.</p></div>` },

  {
    code: 'retr_rachat_bonification', name: "Accord de Rachat de Périodes de Bonification (CGRAE)", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Demande de rachat de périodes de bonification pour augmenter les droits à pension à la CGRAE.", templateType: 'pdf', classe: 'B', active: true, popularity: 41,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'matricule',label:"Matricule",type:'text',required:true},
      {key:'periodes_bonification',label:"Périodes de bonification à racheter",type:'textarea',required:true},
      {key:'montant_rachat',label:"Montant estimé du rachat (FCFA)",type:'text',required:true},
      {key:'justificatif_periodes',label:"Justificatif des périodes (références)",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RACHAT DE PÉRIODES DE BONIFICATION — CGRAE</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (matricule : {{matricule}}) sollicite le rachat des périodes de bonification suivantes : {{periodes_bonification}}. Montant estimé : {{montant_rachat}} FCFA. Justificatifs : {{justificatif_periodes}}.</p></div>` },

  {
    code: 'retr_validation_services', name: "Accord de Validation de Services Antérieurs (CGRAE)", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Demande de validation de services antérieurs accomplis avant la titularisation dans la Fonction Publique ivoirienne.", templateType: 'pdf', classe: 'B', active: true, popularity: 46,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'matricule',label:"Matricule",type:'text',required:true},
      {key:'services_anterieurs',label:"Services antérieurs à valider (employeur, dates)",type:'textarea',required:true},
      {key:'pieces_jointes',label:"Pièces justificatives jointes",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE VALIDATION DE SERVICES ANTÉRIEURS — CGRAE</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (matricule : {{matricule}}) sollicite la validation des services antérieurs suivants : {{services_anterieurs}}. Pièces jointes : {{pieces_jointes}}.</p></div>` },

  {
    code: 'retr_cumul_emploi', name: "Accord de Cumul Emploi-Retraite — Autorisation CI", category: 'rh_emploi', price: 4500, priceMax: 13500,
    description: "Demande d'autorisation de cumul emploi-retraite pour un fonctionnaire retraité souhaitant exercer une activité professionnelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_prenom_retraite',label:"Nom et prénoms du retraité",type:'text',required:true},
      {key:'numero_pension',label:"Numéro de pension CGRAE",type:'text',required:true},
      {key:'nature_activite_envisagee',label:"Nature de l'activité envisagée",type:'textarea',required:true},
      {key:'employeur_envisage',label:"Employeur envisagé",type:'text',required:false},
      {key:'date_debut_activite',label:"Date de début d'activité envisagée",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE D'AUTORISATION DE CUMUL EMPLOI-RETRAITE</h1><p>Je soussigné(e) <strong>{{nom_prenom_retraite}}</strong> (N° pension CGRAE : {{numero_pension}}) sollicite l'autorisation de cumuler ma pension de retraite avec l'exercice de l'activité suivante : {{nature_activite_envisagee}}, auprès de {{employeur_envisage}}, à compter du {{date_debut_activite}}.</p></div>` },

  {
    code: 'retr_reprise_activite', name: "Accord de Reprise d'Activité après Retraite — Agréments", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Demande d'agrément pour la reprise d'une activité professionnelle après la mise à la retraite.", templateType: 'pdf', classe: 'B', active: true, popularity: 44,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'numero_pension',label:"Numéro de pension",type:'text',required:true},
      {key:'activite_reprise',label:"Activité reprise ou envisagée",type:'text',required:true},
      {key:'justification',label:"Justification de la reprise d'activité",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE D'AGRÉMENT POUR REPRISE D'ACTIVITÉ APRÈS RETRAITE</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (N° pension : {{numero_pension}}) sollicite un agrément pour reprendre l'activité suivante : <strong>{{activite_reprise}}</strong>. Justification : {{justification}}.</p></div>` },

  {
    code: 'retr_precompte_retraite', name: "Accord de Service de Précompte Retraite — Gestionnaire Paie", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Convention de service de précompte des cotisations retraite confiée au gestionnaire de paie.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'raison_sociale_employeur',label:"Raison sociale de l'employeur",type:'text',required:true},
      {key:'nom_gestionnaire',label:"Nom du gestionnaire de paie",type:'text',required:true},
      {key:'effectif_pris_charge',label:"Effectif pris en charge",type:'text',required:true},
      {key:'montant_mensuel',label:"Montant mensuel des précomptes (FCFA)",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PRÉCOMPTE RETRAITE — GESTIONNAIRE DE PAIE</h1><p>Entre <strong>{{raison_sociale_employeur}}</strong> et le gestionnaire de paie <strong>{{nom_gestionnaire}}</strong> : le gestionnaire prend en charge le précompte mensuel des cotisations retraite pour {{effectif_pris_charge}} agents, soit {{montant_mensuel}} FCFA par mois, à compter du {{date_prise_effet}}, conformément aux règles de la CGRAE.</p></div>` },

  {
    code: 'retr_immat_fonctionnaire', name: "Accord d'Immatriculation Fonctionnaire (CGRAE)", category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Formulaire d'immatriculation d'un fonctionnaire nouvellement titularisé auprès de la CGRAE.", templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'date_titularisation',label:"Date de titularisation",type:'date',required:true},
      {key:'corps_grade_initial',label:"Corps et grade initial",type:'text',required:true},
      {key:'ministere_affectation',label:"Ministère d'affectation",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE D'IMMATRICULATION — CGRAE</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong>, né(e) le {{date_naissance}}, titularisé(e) le {{date_titularisation}} dans le corps {{corps_grade_initial}}, affecté(e) au {{ministere_affectation}}, sollicite mon immatriculation auprès de la CGRAE en qualité de fonctionnaire de l'État ivoirien.</p></div>` },

  {
    code: 'retr_decl_nominative', name: "Accord de Déclaration Nominative Annuelle (CGRAE)", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Déclaration nominative annuelle des agents affiliés à la CGRAE, établie par le gestionnaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'ministere_direction',label:"Ministère ou Direction gestionnaire",type:'text',required:true},
      {key:'annee_declaration',label:"Année de déclaration",type:'text',required:true},
      {key:'effectif_declare',label:"Nombre d'agents déclarés",type:'text',required:true},
      {key:'masse_salariale_annuelle',label:"Masse salariale annuelle (FCFA)",type:'text',required:true},
      {key:'signataire',label:"Nom et qualité du signataire",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION NOMINATIVE ANNUELLE — CGRAE</h1><p>Le <strong>{{ministere_direction}}</strong> déclare pour l'année <strong>{{annee_declaration}}</strong> un effectif de {{effectif_declare}} agents affiliés à la CGRAE, pour une masse salariale annuelle de {{masse_salariale_annuelle}} FCFA. Signataire : {{signataire}}.</p></div>` },

  {
    code: 'retr_rectification_carriere', name: "Accord de Rectification de Carrière (CGRAE)", category: 'rh_emploi', price: 4500, priceMax: 13500,
    description: "Demande de rectification d'erreurs ou d'omissions dans le dossier de carrière enregistré à la CGRAE.", templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'matricule',label:"Matricule",type:'text',required:true},
      {key:'erreurs_constatees',label:"Erreurs ou omissions constatées",type:'textarea',required:true},
      {key:'corrections_demandees',label:"Corrections demandées",type:'textarea',required:true},
      {key:'pieces_probatoires',label:"Pièces probatoires jointes",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RECTIFICATION DE CARRIÈRE — CGRAE</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (matricule : {{matricule}}) signale les erreurs suivantes dans mon dossier CGRAE : {{erreurs_constatees}}. Je sollicite les corrections suivantes : {{corrections_demandees}}. Pièces probatoires : {{pieces_probatoires}}.</p></div>` },

  {
    code: 'retr_reversement_troppercu', name: "Accord de Reversement de Trop-Perçu (CGRAE)", category: 'rh_emploi', price: 3500, priceMax: 10500,
    description: "Convention de reversement de sommes indûment perçues au titre de la pension CGRAE.", templateType: 'pdf', classe: 'B', active: true, popularity: 40,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'numero_pension',label:"Numéro de pension",type:'text',required:true},
      {key:'montant_troppercu',label:"Montant du trop-perçu (FCFA)",type:'text',required:true},
      {key:'periode_concerne',label:"Période concernée",type:'text',required:true},
      {key:'modalites_remboursement',label:"Modalités de remboursement proposées",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE REVERSEMENT DE TROP-PERÇU — CGRAE</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (N° pension : {{numero_pension}}) reconnais avoir perçu indûment la somme de <strong>{{montant_troppercu}} FCFA</strong> pour la période {{periode_concerne}} et m'engage à rembourser selon les modalités suivantes : {{modalites_remboursement}}.</p></div>` },

  {
    code: 'retr_retraite_anticipee', name: "Accord de Retraite Anticipée (Fonctionnaire CI)", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Demande de mise à la retraite anticipée d'un fonctionnaire avant l'âge légal.", templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'matricule',label:"Matricule",type:'text',required:true},
      {key:'age_actuel',label:"Âge actuel",type:'text',required:true},
      {key:'motif_anticipation',label:"Motif de la demande d'anticipation",type:'textarea',required:true},
      {key:'date_depart_souhaite',label:"Date de départ souhaitée",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RETRAITE ANTICIPÉE — FONCTIONNAIRE CI</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (matricule : {{matricule}}), âgé(e) de {{age_actuel}} ans, sollicite ma mise à la retraite anticipée à compter du {{date_depart_souhaite}} pour les motifs suivants : {{motif_anticipation}}.</p></div>` },

  {
    code: 'retr_maintien_activite', name: "Accord de Maintien en Activité au-delà de 60 Ans", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Demande de prolongation d'activité d'un fonctionnaire au-delà de l'âge légal de départ à la retraite.", templateType: 'pdf', classe: 'B', active: true, popularity: 46,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'matricule',label:"Matricule",type:'text',required:true},
      {key:'age_actuel',label:"Âge actuel",type:'text',required:true},
      {key:'duree_prolongation',label:"Durée de prolongation demandée",type:'text',required:true},
      {key:'justification',label:"Justification de la demande",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE MAINTIEN EN ACTIVITÉ AU-DELÀ DE 60 ANS</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (matricule : {{matricule}}), âgé(e) de {{age_actuel}} ans, sollicite le maintien en activité pour une durée de {{duree_prolongation}}. Justification : {{justification}}.</p></div>` },

  {
    code: 'retr_pension_militaire', name: "Accord de Pension Militaire (Armées CI)", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Demande de pension militaire pour un militaire des Forces Armées de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'matricule_militaire',label:"Matricule militaire",type:'text',required:true},
      {key:'grade',label:"Grade",type:'text',required:true},
      {key:'duree_service_militaire',label:"Durée de service militaire (années)",type:'text',required:true},
      {key:'date_liberation',label:"Date de libération du service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE PENSION MILITAIRE — FORCES ARMÉES CI</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong>, militaire (matricule : {{matricule_militaire}}), de grade {{grade}}, ayant accompli {{duree_service_militaire}} années de service militaire, libéré(e) le {{date_liberation}}, sollicite la liquidation de ma pension militaire auprès des organismes compétents des Forces Armées de Côte d'Ivoire.</p></div>` },

  {
    code: 'retr_pension_magistrat', name: "Accord de Pension Magistrat (CI)", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Demande de pension de retraite d'un magistrat de l'ordre judiciaire de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'matricule',label:"Matricule",type:'text',required:true},
      {key:'grade_magistrature',label:"Grade dans la magistrature",type:'text',required:true},
      {key:'juridiction_derniere',label:"Dernière juridiction d'affectation",type:'text',required:true},
      {key:'date_depart',label:"Date de départ à la retraite",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE PENSION DE RETRAITE — MAGISTRAT CI</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (matricule : {{matricule}}), magistrat de grade {{grade_magistrature}}, dernièrement affecté(e) à {{juridiction_derniere}}, partant à la retraite le {{date_depart}}, sollicite la liquidation de ma pension conformément au statut de la magistrature ivoirienne.</p></div>` },

  {
    code: 'retr_attestation_droits', name: "Accord de Demande d'Attestation de Droits (CGRAE)", category: 'rh_emploi', price: 2000, priceMax: 6000,
    description: "Demande d'attestation de droits à pension établie par la CGRAE pour diverses démarches administratives.", templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'matricule',label:"Matricule",type:'text',required:true},
      {key:'motif_attestation',label:"Motif de la demande d'attestation",type:'text',required:true},
      {key:'destinataire',label:"Destinataire de l'attestation",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>DEMANDE D'ATTESTATION DE DROITS — CGRAE</h1><p>Je soussigné(e) <strong>{{nom_prenom}}</strong> (matricule : {{matricule}}) sollicite la délivrance d'une attestation de droits à pension pour : {{motif_attestation}}. Destinataire : {{destinataire}}.</p></div>` },

  {
    code: 'retr_plan_transition', name: "Accord de Plan de Transition Emploi-Retraite (PRE)", category: 'rh_emploi', price: 6000, priceMax: 18000,
    description: "Plan de transition progressive emploi-retraite (PRE) pour un fonctionnaire approchant l'âge de la retraite.", templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'matricule',label:"Matricule",type:'text',required:true},
      {key:'date_retraite_prevue',label:"Date de retraite prévue",type:'date',required:true},
      {key:'etapes_transition',label:"Étapes du plan de transition",type:'textarea',required:true},
      {key:'successeur_identifie',label:"Successeur identifié (le cas échéant)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>PLAN DE TRANSITION EMPLOI-RETRAITE (PRE)</h1><p>Fonctionnaire : <strong>{{nom_prenom}}</strong> (matricule : {{matricule}}). Date de retraite prévue : {{date_retraite_prevue}}. Étapes du plan de transition : {{etapes_transition}}. Successeur identifié : {{successeur_identifie}}.</p></div>` },

  {
    code: 'retr_conseil_individuel', name: "Accord de Service de Conseil Retraite Individuel", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Convention de prestation de conseil individuel en planification retraite pour fonctionnaire ou salarié du secteur public.", templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'nom_client',label:"Nom et prénoms du client",type:'text',required:true},
      {key:'nom_conseiller',label:"Nom du conseiller retraite",type:'text',required:true},
      {key:'objectifs_conseil',label:"Objectifs de la prestation de conseil",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires convenus (FCFA)",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CONSEIL RETRAITE INDIVIDUEL</h1><p>Entre <strong>{{nom_client}}</strong> (le client) et <strong>{{nom_conseiller}}</strong> (le conseiller), il est convenu une prestation de conseil retraite visant à : {{objectifs_conseil}}. Durée : {{duree_mission}}. Honoraires : {{honoraires}} FCFA.</p></div>` },

  {
    code: 'retr_simulation_pension', name: "Accord de Service de Simulation de Pension", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Prestation de simulation de montant de pension de retraite pour anticiper les droits futurs.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_prenom',label:"Nom et prénoms",type:'text',required:true},
      {key:'annees_restantes',label:"Nombre d'années restantes avant la retraite",type:'text',required:true},
      {key:'salaire_actuel',label:"Salaire actuel brut (FCFA)",type:'text',required:true},
      {key:'duree_cotisation_actuelle',label:"Durée de cotisation actuelle (années)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>SIMULATION DE PENSION DE RETRAITE</h1><p>Simulation établie pour <strong>{{nom_prenom}}</strong> : salaire actuel brut {{salaire_actuel}} FCFA, {{duree_cotisation_actuelle}} années de cotisation acquises, {{annees_restantes}} années restantes avant la retraite. Ce document constitue une estimation indicative des droits à pension futurs.</p></div>` },

  {
    code: 'retr_gestion_patrimoine', name: "Accord de Service de Gestion de Patrimoine Post-Retraite", category: 'rh_emploi', price: 8000, priceMax: 24000,
    description: "Convention de gestion et d'optimisation du patrimoine financier d'un fonctionnaire à la retraite.", templateType: 'pdf', classe: 'B', active: true, popularity: 47,
    fieldsJson: F([
      {key:'nom_retraite',label:"Nom et prénoms du retraité",type:'text',required:true},
      {key:'nom_gestionnaire',label:"Nom du gestionnaire de patrimoine",type:'text',required:true},
      {key:'montant_patrimoine',label:"Montant approximatif du patrimoine géré (FCFA)",type:'text',required:true},
      {key:'objectifs_gestion',label:"Objectifs de gestion patrimoniale",type:'textarea',required:true},
      {key:'duree_mandat',label:"Durée du mandat de gestion",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE GESTION DE PATRIMOINE POST-RETRAITE</h1><p>Entre <strong>{{nom_retraite}}</strong> (mandant) et <strong>{{nom_gestionnaire}}</strong> (mandataire) : mandat de gestion d'un patrimoine estimé à {{montant_patrimoine}} FCFA pour une durée de {{duree_mandat}}, avec les objectifs suivants : {{objectifs_gestion}}.</p></div>` },

  {
    code: 'retr_bilan_entreprise', name: "Rapport de Bilan Retraite Entreprise", category: 'rh_emploi', price: 7000, priceMax: 21000,
    description: "Rapport annuel de bilan retraite de l'entreprise recensant les départs prévisionnels et les obligations envers la CGRAE.", templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'annee_bilan',label:"Année du bilan",type:'text',required:true},
      {key:'nombre_departs_prevus',label:"Nombre de départs à la retraite prévus",type:'text',required:true},
      {key:'impact_financier',label:"Impact financier estimé (FCFA)",type:'text',required:true},
      {key:'recommandations_rh',label:"Recommandations RH",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE BILAN RETRAITE ENTREPRISE</h1><h2>{{raison_sociale}} — Année {{annee_bilan}}</h2><p>Nombre de départs à la retraite prévus : <strong>{{nombre_departs_prevus}}</strong>. Impact financier estimé : {{impact_financier}} FCFA.</p><h3>Recommandations RH</h3><p>{{recommandations_rh}}</p></div>` },

  {
    code: 'retr_charte_bien_vieillir', name: "Charte de la Préparation à la Retraite et du Bien Vieillir", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Charte d'engagement de l'entreprise en faveur de la préparation à la retraite et du bien-vieillir de ses agents.", templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale",type:'text',required:true},
      {key:'representant_legal',label:"Représentant légal",type:'text',required:true},
      {key:'engagements_bien_vieillir',label:"Engagements en faveur du bien vieillir",type:'textarea',required:true},
      {key:'actions_preparation',label:"Actions de préparation à la retraite prévues",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA PRÉPARATION À LA RETRAITE ET DU BIEN VIEILLIR</h1><h2>{{raison_sociale}}</h2><p>Le soussigné <strong>{{representant_legal}}</strong>, en date du {{date_adoption}}, adopte les engagements suivants en faveur du bien vieillir : {{engagements_bien_vieillir}}. Actions de préparation à la retraite : {{actions_preparation}}.</p></div>` },
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 103b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
