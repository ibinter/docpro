import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── MÉDECINE SPÉCIALISÉE (25 templates) ───────────────────────────────────

  {
    code: 'spec_consent_coloscopie',
    name: "Consentement de coloscopie ou endoscopie digestive",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Formulaire de consentement éclairé pour coloscopie ou endoscopie digestive haute et basse.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'type_examen',label:"Type d'examen (coloscopie / endoscopie haute)",type:'text',required:true},
      {key:'medecin_nom',label:"Nom du médecin endoscopiste",type:'text',required:true},
      {key:'date_acte',label:"Date prévue de l'acte",type:'date',required:true},
      {key:'commentaires',label:"Informations complémentaires ou antécédents pertinents",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — COLOSCOPIE / ENDOSCOPIE DIGESTIVE</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, consens librement à la réalisation d'une <strong>{{type_examen}}</strong> par le Dr <strong>{{medecin_nom}}</strong> prévue le {{date_acte}}.</p>
<p>J'ai été informé(e) des indications, du déroulement, des bénéfices attendus et des risques possibles (perforation, saignement, réaction à la sédation) de cet examen.</p>
<p>Informations complémentaires : {{commentaires}}</p>
<p>Fait à _____________, le _______________</p>
<p>Signature du patient : ___________________</p></div>`
  },

  {
    code: 'spec_consent_coronarographie',
    name: "Consentement de coronarographie",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Consentement éclairé pour la réalisation d'une coronarographie diagnostique ou interventionnelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'cardiologue_nom',label:"Nom du cardiologue interventionnel",type:'text',required:true},
      {key:'etablissement',label:"Établissement hospitalier",type:'text',required:true},
      {key:'date_acte',label:"Date prévue de l'acte",type:'date',required:true},
      {key:'indication',label:"Indication clinique principale",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — CORONAROGRAPHIE</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, donne mon consentement pour la réalisation d'une coronarographie le {{date_acte}} à <strong>{{etablissement}}</strong>, sous la responsabilité du Dr <strong>{{cardiologue_nom}}</strong>.</p>
<p>Indication clinique : {{indication}}</p>
<p>J'ai été informé(e) des risques (réaction au produit de contraste, hématome au site de ponction, complications vasculaires rares) et des bénéfices attendus.</p>
<p>Signature du patient : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_consent_stent_coronarien',
    name: "Consentement de pose de stent coronarien",
    category: 'sante', price: 4500, priceMax: 14000,
    description: "Formulaire de consentement pour angioplastie coronarienne avec pose de stent.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'artere_cible',label:"Artère cible (ex : IVA, CD, Cx)",type:'text',required:true},
      {key:'cardiologue_nom',label:"Nom du cardiologue interventionnel",type:'text',required:true},
      {key:'date_acte',label:"Date prévue",type:'date',required:true},
      {key:'antiaggregants',label:"Traitement antiagrégant prescrit après la pose",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — POSE DE STENT CORONARIEN</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, consens à la pose d'un stent sur l'artère <strong>{{artere_cible}}</strong>, le {{date_acte}}, par le Dr <strong>{{cardiologue_nom}}</strong>.</p>
<p>J'ai été informé(e) des risques (thrombose de stent, resténose, saignement) et de la nécessité de suivre scrupuleusement le traitement antiagrégant suivant : {{antiaggregants}}</p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_consent_pacemaker',
    name: "Consentement de pose de pacemaker (stimulateur cardiaque)",
    category: 'sante', price: 4500, priceMax: 13000,
    description: "Consentement éclairé pour implantation d'un stimulateur cardiaque (pacemaker).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'indication',label:"Indication (type de trouble du rythme)",type:'textarea',required:true},
      {key:'chirurgien_nom',label:"Nom du chirurgien/rythmologue",type:'text',required:true},
      {key:'date_intervention',label:"Date prévue d'implantation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — POSE DE PACEMAKER</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, consens à l'implantation d'un stimulateur cardiaque le {{date_intervention}} par le Dr <strong>{{chirurgien_nom}}</strong>.</p>
<p>Indication : {{indication}}</p>
<p>J'ai été informé(e) des risques (infection, déplacement de sonde, hématome de loge) et du suivi régulier nécessaire.</p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_consent_echo_stress',
    name: "Consentement d'échocardiographie de stress",
    category: 'sante', price: 3000, priceMax: 8000,
    description: "Consentement éclairé pour réalisation d'une échocardiographie de stress (effort ou dobutamine).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'type_stress',label:"Type de stress (effort / dobutamine)",type:'text',required:true},
      {key:'cardiologue_nom',label:"Nom du cardiologue",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — ÉCHOCARDIOGRAPHIE DE STRESS</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, consens à la réalisation d'une échocardiographie de stress ({{type_stress}}) le {{date_examen}} sous la supervision du Dr <strong>{{cardiologue_nom}}</strong>.</p>
<p>J'ai été informé(e) des risques faibles mais possibles (arythmie, douleur thoracique) et de la procédure d'arrêt immédiat en cas d'anomalie.</p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_pec_insuffisance_cardiaque',
    name: "Plan de prise en charge insuffisance cardiaque",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Document structuré de plan de prise en charge personnalisé pour patient insuffisant cardiaque.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_diagnostic',label:"Date du diagnostic",type:'date',required:true},
      {key:'fraction_ejection',label:"Fraction d'éjection (FEVG en %)",type:'text',required:true},
      {key:'traitements',label:"Traitements médicamenteux prescrits",type:'textarea',required:true},
      {key:'objectifs_fc',label:"Objectifs de fréquence cardiaque et poids",type:'textarea',required:false},
      {key:'medecin_nom',label:"Nom du cardiologue référent",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRISE EN CHARGE — INSUFFISANCE CARDIAQUE</h1>
<p>Patient : <strong>{{patient_nom}}</strong> — Diagnostic le {{date_diagnostic}}</p>
<p>FEVG : {{fraction_ejection}} %</p>
<h2>Traitement médicamenteux</h2><p>{{traitements}}</p>
<h2>Objectifs de surveillance</h2><p>{{objectifs_fc}}</p>
<p>Cardiologue référent : Dr <strong>{{medecin_nom}}</strong></p>
<p>Signature du médecin : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_pec_hypertension',
    name: "Plan de prise en charge hypertension artérielle",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Plan personnalisé de prise en charge de l'hypertension artérielle (HTA) essentielle ou secondaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'chiffres_tensionnels',label:"Chiffres tensionnels relevés (ex : 160/100 mmHg)",type:'text',required:true},
      {key:'antihypertenseurs',label:"Antihypertenseurs prescrits",type:'textarea',required:true},
      {key:'objectif_tensionnel',label:"Objectif tensionnel cible",type:'text',required:true},
      {key:'medecin_nom',label:"Nom du médecin référent",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRISE EN CHARGE — HYPERTENSION ARTÉRIELLE</h1>
<p>Patient : <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}</p>
<p>Chiffres tensionnels : {{chiffres_tensionnels}} — Objectif cible : {{objectif_tensionnel}}</p>
<h2>Traitement antihypertenseur</h2><p>{{antihypertenseurs}}</p>
<p>Médecin référent : Dr <strong>{{medecin_nom}}</strong></p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_consent_chimiotherapie',
    name: "Consentement de chimiothérapie anticancéreuse",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Formulaire de consentement éclairé pour initiation d'un protocole de chimiothérapie anticancéreuse.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'type_cancer',label:"Type de cancer traité",type:'text',required:true},
      {key:'protocole',label:"Protocole de chimiothérapie (ex : FOLFOX, AC-T)",type:'text',required:true},
      {key:'oncologue_nom',label:"Nom de l'oncologue référent",type:'text',required:true},
      {key:'date_debut',label:"Date prévue de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — CHIMIOTHÉRAPIE ANTICANCÉREUSE</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, consens à recevoir le protocole de chimiothérapie <strong>{{protocole}}</strong> pour la prise en charge de <strong>{{type_cancer}}</strong>, à partir du {{date_debut}}, sous la direction du Dr <strong>{{oncologue_nom}}</strong>.</p>
<p>J'ai été informé(e) des effets secondaires possibles (nausées, chute des cheveux, neutropénie, fatigue) et des mesures de soutien disponibles.</p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_consent_radiotherapie',
    name: "Consentement de radiothérapie",
    category: 'sante', price: 4500, priceMax: 13000,
    description: "Consentement éclairé pour initiation d'un traitement par radiothérapie externe ou curiethérapie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'zone_irradiee',label:"Zone à irradier",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'radiooncologue_nom',label:"Nom du radio-oncologue",type:'text',required:true},
      {key:'date_debut',label:"Date de début du traitement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — RADIOTHÉRAPIE</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, consens à recevoir {{nombre_seances}} séances de radiothérapie sur la zone <strong>{{zone_irradiee}}</strong>, débutant le {{date_debut}}, sous la responsabilité du Dr <strong>{{radiooncologue_nom}}</strong>.</p>
<p>J'ai été informé(e) des effets secondaires précoces et tardifs et des soins de peau à apporter.</p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_consent_biopsie_tumorale',
    name: "Consentement de biopsie tumorale",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Formulaire de consentement pour prélèvement biopsique d'une masse tumorale suspecte.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'site_biopsie',label:"Site anatomique de la biopsie",type:'text',required:true},
      {key:'technique',label:"Technique utilisée (echo-guidée, TDM-guidée, chirurgicale)",type:'text',required:true},
      {key:'medecin_nom',label:"Nom du praticien réalisant la biopsie",type:'text',required:true},
      {key:'date_acte',label:"Date prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — BIOPSIE TUMORALE</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, consens au prélèvement biopsique au niveau de <strong>{{site_biopsie}}</strong> par technique <strong>{{technique}}</strong>, le {{date_acte}}, par le Dr <strong>{{medecin_nom}}</strong>.</p>
<p>J'ai été informé(e) des risques (saignement, infection, pneumothorax selon le site) et de l'intérêt diagnostique de l'examen.</p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_pec_cancer_sein',
    name: "Plan de prise en charge du cancer du sein",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Plan multidisciplinaire de prise en charge personnalisé pour patiente atteinte de cancer du sein.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet de la patiente",type:'text',required:true},
      {key:'date_diagnostic',label:"Date du diagnostic histologique",type:'date',required:true},
      {key:'stade_tnm',label:"Stade TNM",type:'text',required:true},
      {key:'recepteurs',label:"Statut récepteurs hormonaux et HER2",type:'textarea',required:true},
      {key:'plan_traitement',label:"Plan thérapeutique décidé en RCP",type:'textarea',required:true},
      {key:'oncologue_nom',label:"Oncologue référent",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRISE EN CHARGE — CANCER DU SEIN</h1>
<p>Patiente : <strong>{{patient_nom}}</strong> — Diagnostic : {{date_diagnostic}}</p>
<p>Stade : {{stade_tnm}} | Profil biologique : {{recepteurs}}</p>
<h2>Plan thérapeutique (décision RCP)</h2><p>{{plan_traitement}}</p>
<p>Oncologue référent : Dr <strong>{{oncologue_nom}}</strong></p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_pec_cancer_prostate',
    name: "Plan de prise en charge du cancer de la prostate",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Plan personnalisé de prise en charge du cancer de la prostate selon score de Gleason et stade.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_diagnostic',label:"Date du diagnostic",type:'date',required:true},
      {key:'psa',label:"Taux de PSA au diagnostic (ng/mL)",type:'text',required:true},
      {key:'gleason',label:"Score de Gleason (Grade group)",type:'text',required:true},
      {key:'plan_traitement',label:"Plan thérapeutique décidé en RCP",type:'textarea',required:true},
      {key:'urologue_nom',label:"Urologue/oncologue référent",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRISE EN CHARGE — CANCER DE LA PROSTATE</h1>
<p>Patient : <strong>{{patient_nom}}</strong> — Diagnostic : {{date_diagnostic}}</p>
<p>PSA : {{psa}} ng/mL | Score de Gleason : {{gleason}}</p>
<h2>Plan thérapeutique (RCP)</h2><p>{{plan_traitement}}</p>
<p>Référent : Dr <strong>{{urologue_nom}}</strong></p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_pec_cancer_col_uterus',
    name: "Plan de prise en charge du cancer du col de l'utérus",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Plan de prise en charge multidisciplinaire du cancer du col utérin selon stade FIGO.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet de la patiente",type:'text',required:true},
      {key:'date_diagnostic',label:"Date du diagnostic",type:'date',required:true},
      {key:'stade_figo',label:"Stade FIGO",type:'text',required:true},
      {key:'type_histologique',label:"Type histologique (épidermoïde, adénocarcinome)",type:'text',required:true},
      {key:'plan_traitement',label:"Stratégie thérapeutique (chirurgie, radio-chimio)",type:'textarea',required:true},
      {key:'gynecologue_nom',label:"Gynéco-oncologue référent",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRISE EN CHARGE — CANCER DU COL DE L'UTÉRUS</h1>
<p>Patiente : <strong>{{patient_nom}}</strong> — Diagnostic : {{date_diagnostic}}</p>
<p>Stade FIGO : {{stade_figo}} | Type : {{type_histologique}}</p>
<h2>Stratégie thérapeutique</h2><p>{{plan_traitement}}</p>
<p>Référente : Dr <strong>{{gynecologue_nom}}</strong></p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_consent_dialyse_rein',
    name: "Consentement de dialyse rénale (hémodialyse)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Consentement éclairé pour initiation d'un programme d'hémodialyse chronique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'centre_dialyse',label:"Centre de dialyse",type:'text',required:true},
      {key:'frequence',label:"Fréquence des séances (ex : 3 fois/semaine)",type:'text',required:true},
      {key:'nephrologue_nom',label:"Néphrologue référent",type:'text',required:true},
      {key:'date_debut',label:"Date de début prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — HÉMODIALYSE CHRONIQUE</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, consens à l'initiation d'un programme d'hémodialyse {{frequence}} au centre <strong>{{centre_dialyse}}</strong>, débutant le {{date_debut}}, sous la supervision du Dr <strong>{{nephrologue_nom}}</strong>.</p>
<p>J'ai été informé(e) du fonctionnement de l'hémodialyse, de la création de la fistule artério-veineuse, des contraintes alimentaires et hydriques, ainsi que des complications possibles.</p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_pec_irc',
    name: "Plan de prise en charge insuffisance rénale chronique",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Plan structuré de prise en charge de l'insuffisance rénale chronique (IRC) par stades.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'stade_ckd',label:"Stade IRC (CKD G1 à G5)",type:'text',required:true},
      {key:'debit_filtration',label:"DFG estimé (mL/min/1,73m2)",type:'text',required:true},
      {key:'plan_traitement',label:"Mesures thérapeutiques et surveillance",type:'textarea',required:true},
      {key:'nephrologue_nom',label:"Néphrologue référent",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRISE EN CHARGE — INSUFFISANCE RÉNALE CHRONIQUE</h1>
<p>Patient : <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}</p>
<p>Stade CKD : {{stade_ckd}} | DFG : {{debit_filtration}} mL/min/1,73m²</p>
<h2>Plan thérapeutique et de surveillance</h2><p>{{plan_traitement}}</p>
<p>Néphrologue référent : Dr <strong>{{nephrologue_nom}}</strong></p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_consent_greffe_rein',
    name: "Consentement de greffe de rein",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Formulaire de consentement éclairé pour inscription sur liste de transplantation rénale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'groupe_sanguin',label:"Groupe sanguin",type:'text',required:true},
      {key:'nephrologue_nom',label:"Néphrologue/transplanteur référent",type:'text',required:true},
      {key:'etablissement',label:"Établissement de transplantation",type:'text',required:true},
      {key:'date_inscription',label:"Date d'inscription sur liste",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — TRANSPLANTATION RÉNALE</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, groupe sanguin {{groupe_sanguin}}, consens à mon inscription sur la liste nationale de transplantation rénale à <strong>{{etablissement}}</strong> le {{date_inscription}}, sous la responsabilité du Dr <strong>{{nephrologue_nom}}</strong>.</p>
<p>J'ai été informé(e) des procédures de sélection du donneur, de l'intervention chirurgicale, du traitement immunosuppresseur à vie et des risques de rejet.</p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_consent_transplantation_hepatique',
    name: "Consentement de transplantation hépatique",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Consentement éclairé pour transplantation hépatique (greffe de foie) chez l'adulte.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'indication',label:"Indication principale (cirrhose, CHC, etc.)",type:'textarea',required:true},
      {key:'score_meld',label:"Score MELD au moment de l'inscription",type:'text',required:true},
      {key:'transplanteur_nom',label:"Chirurgien transplanteur référent",type:'text',required:true},
      {key:'date_inscription',label:"Date d'inscription sur liste",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — TRANSPLANTATION HÉPATIQUE</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, Score MELD : {{score_meld}}, consens à mon inscription sur liste de transplantation hépatique le {{date_inscription}} sous la responsabilité du Dr <strong>{{transplanteur_nom}}</strong>.</p>
<p>Indication : {{indication}}</p>
<p>J'ai été informé(e) des risques opératoires, du traitement immunosuppresseur à vie et des complications possibles.</p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_consent_irm_sedation',
    name: "Consentement d'IRM cérébrale sous sédation",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Consentement éclairé pour IRM cérébrale réalisée sous sédation ou anesthésie générale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'indication',label:"Indication clinique de l'IRM",type:'textarea',required:true},
      {key:'anesthesiste_nom',label:"Nom de l'anesthésiste",type:'text',required:true},
      {key:'radiologue_nom',label:"Nom du radiologue",type:'text',required:true},
      {key:'date_examen',label:"Date prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — IRM CÉRÉBRALE SOUS SÉDATION</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, consens à la réalisation d'une IRM cérébrale le {{date_examen}}, sous sédation administrée par le Dr <strong>{{anesthesiste_nom}}</strong>, sous la responsabilité du Dr <strong>{{radiologue_nom}}</strong>.</p>
<p>Indication : {{indication}}</p>
<p>J'ai été informé(e) des risques liés à la sédation et de la contre-indication aux objets métalliques.</p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_pec_avc',
    name: "Plan de prise en charge AVC (accident vasculaire cérébral)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Plan structuré de prise en charge aiguë et de rééducation après AVC ischémique ou hémorragique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_avc',label:"Date et heure de l'AVC",type:'date',required:true},
      {key:'type_avc',label:"Type d'AVC (ischémique / hémorragique)",type:'text',required:true},
      {key:'deficit_initial',label:"Déficit neurologique initial",type:'textarea',required:true},
      {key:'plan_reeducation',label:"Plan de rééducation et suivi",type:'textarea',required:true},
      {key:'neurologue_nom',label:"Neurologue référent",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRISE EN CHARGE — AVC</h1>
<p>Patient : <strong>{{patient_nom}}</strong> — AVC le {{date_avc}} | Type : {{type_avc}}</p>
<h2>Déficit initial</h2><p>{{deficit_initial}}</p>
<h2>Plan de rééducation et suivi</h2><p>{{plan_reeducation}}</p>
<p>Neurologue référent : Dr <strong>{{neurologue_nom}}</strong></p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_pec_diabete_type2',
    name: "Plan de prise en charge diabète de type 2",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Plan personnalisé de prise en charge du diabète de type 2 incluant objectifs glycémiques et suivi.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'hba1c',label:"HbA1c au diagnostic (%)",type:'text',required:true},
      {key:'objectif_hba1c',label:"Objectif HbA1c cible (%)",type:'text',required:true},
      {key:'traitement',label:"Traitement hypoglycémiant prescrit",type:'textarea',required:true},
      {key:'medecin_nom',label:"Médecin référent",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRISE EN CHARGE — DIABÈTE DE TYPE 2</h1>
<p>Patient : <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}</p>
<p>HbA1c initiale : {{hba1c}} % | Objectif : {{objectif_hba1c}} %</p>
<h2>Traitement</h2><p>{{traitement}}</p>
<p>Médecin référent : Dr <strong>{{medecin_nom}}</strong></p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_pec_obesite_bariatrique',
    name: "Plan de prise en charge de l'obésité (bariatrique)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Plan de prise en charge multidisciplinaire de l'obésité morbide incluant bilan pré-opératoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'imc',label:"IMC actuel (kg/m²)",type:'text',required:true},
      {key:'comorbidites',label:"Comorbidités associées",type:'textarea',required:true},
      {key:'objectif_poids',label:"Objectif pondéral et délai",type:'text',required:true},
      {key:'medecin_nom',label:"Médecin coordonnateur",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRISE EN CHARGE — OBÉSITÉ MORBIDE</h1>
<p>Patient : <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}} | IMC : {{imc}} kg/m²</p>
<h2>Comorbidités</h2><p>{{comorbidites}}</p>
<p>Objectif : {{objectif_poids}}</p>
<p>Coordonnateur : Dr <strong>{{medecin_nom}}</strong></p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_consent_bypass_gastrique',
    name: "Consentement de chirurgie bariatrique (bypass)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Consentement éclairé pour chirurgie bariatrique de type bypass gastrique en Y de Roux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'imc',label:"IMC (kg/m²)",type:'text',required:true},
      {key:'chirurgien_nom',label:"Chirurgien bariatrique",type:'text',required:true},
      {key:'date_intervention',label:"Date prévue de l'intervention",type:'date',required:true},
      {key:'risques_specifiques',label:"Risques spécifiques discutés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ÉCLAIRÉ — BYPASS GASTRIQUE</h1>
<p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, IMC {{imc}} kg/m², consens à la réalisation d'un bypass gastrique le {{date_intervention}} par le Dr <strong>{{chirurgien_nom}}</strong>.</p>
<p>Risques spécifiques discutés : {{risques_specifiques}}</p>
<p>J'ai compris les changements alimentaires permanents et le suivi à vie nécessaires.</p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_contrat_medecin_liberal',
    name: "Contrat de service de médecin spécialiste libéral",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Contrat de prestation de services entre un médecin spécialiste libéral et un établissement de santé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'medecin_nom',label:"Nom et prénom du médecin",type:'text',required:true},
      {key:'specialite',label:"Spécialité médicale",type:'text',required:true},
      {key:'etablissement_nom',label:"Nom de l'établissement de santé",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:true},
      {key:'honoraires',label:"Modalités de rémunération",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — MÉDECIN SPÉCIALISTE LIBÉRAL</h1>
<p>Entre le Dr <strong>{{medecin_nom}}</strong>, spécialiste en <strong>{{specialite}}</strong>, et <strong>{{etablissement_nom}}</strong>.</p>
<p>Durée : {{duree_contrat}}</p>
<h2>Modalités de rémunération</h2><p>{{honoraires}}</p>
<p>Fait à _____________, le {{date_signature}}</p>
<p>Signatures des parties : ___________________</p></div>`
  },

  {
    code: 'spec_accord_telemedecine_specialisee',
    name: "Accord de service de télémédecine spécialisée",
    category: 'sante', price: 4500, priceMax: 13000,
    description: "Convention de service de téléconsultation et télé-expertise entre spécialiste et établissement partenaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'medecin_nom',label:"Nom du médecin spécialiste",type:'text',required:true},
      {key:'specialite',label:"Spécialité",type:'text',required:true},
      {key:'plateforme',label:"Plateforme ou outil de télémédecine utilisé",type:'text',required:true},
      {key:'partenaire_nom',label:"Établissement ou structure partenaire",type:'text',required:true},
      {key:'plages_horaires',label:"Plages horaires de disponibilité",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TÉLÉMÉDECINE SPÉCIALISÉE</h1>
<p>Entre le Dr <strong>{{medecin_nom}}</strong> ({{specialite}}) et <strong>{{partenaire_nom}}</strong>, via la plateforme <strong>{{plateforme}}</strong>.</p>
<p>En vigueur à compter du {{date_debut}}.</p>
<h2>Plages horaires</h2><p>{{plages_horaires}}</p>
<p>Signatures des parties : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'spec_charte_oncologique',
    name: "Charte de prise en charge oncologique de qualité",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Charte d'engagement qualité pour la prise en charge oncologique au sein d'un établissement de santé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'responsable_nom',label:"Nom du directeur médical oncologie",type:'text',required:true},
      {key:'engagements',label:"Engagements qualité clés",type:'textarea',required:true},
      {key:'indicateurs',label:"Indicateurs de suivi qualité",type:'textarea',required:false},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE PRISE EN CHARGE ONCOLOGIQUE DE QUALITÉ</h1>
<p>Établissement : <strong>{{etablissement_nom}}</strong></p>
<p>Responsable oncologie : Dr <strong>{{responsable_nom}}</strong></p>
<h2>Engagements qualité</h2><p>{{engagements}}</p>
<h2>Indicateurs de suivi</h2><p>{{indicateurs}}</p>
<p>Adoptée le {{date_adoption}}</p>
<p>Signature : ___________________</p></div>`
  },

  // ─── URGENCES / SAMU / RÉANIMATION (25 templates) ─────────────────────────

  {
    code: 'urg_triage_manchester',
    name: "Protocole de triage aux urgences (Manchester)",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Protocole institutionnel de triage selon l'échelle de Manchester pour les services d'urgences.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'chef_urgences',label:"Chef du service des urgences",type:'text',required:true},
      {key:'categories_triage',label:"Description des 5 catégories MTS",type:'textarea',required:true},
      {key:'date_mise_en_oeuvre',label:"Date de mise en oeuvre",type:'date',required:true},
      {key:'revision_prevue',label:"Date de révision prévue",type:'date',required:false}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE TRIAGE — ÉCHELLE DE MANCHESTER (MTS)</h1>
<p>Établissement : <strong>{{etablissement_nom}}</strong> — Responsable : Dr <strong>{{chef_urgences}}</strong></p>
<p>En vigueur le {{date_mise_en_oeuvre}} — Révision prévue : {{revision_prevue}}</p>
<h2>Catégories de triage MTS</h2><p>{{categories_triage}}</p>
<p>Signature du responsable : ___________________</p></div>`
  },

  {
    code: 'urg_pec_non_programme',
    name: "Formulaire de prise en charge urgences non programmées",
    category: 'sante', price: 2500, priceMax: 7000,
    description: "Formulaire de recueil initial pour la prise en charge d'un patient aux urgences non programmées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'motif_consultation',label:"Motif de consultation",type:'textarea',required:true},
      {key:'categorie_triage',label:"Catégorie de triage attribuée (P1 à P5)",type:'text',required:true},
      {key:'medecin_accueil',label:"Médecin d'accueil",type:'text',required:true},
      {key:'date_arrivee',label:"Date et heure d'arrivée",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PRISE EN CHARGE URGENCES NON PROGRAMMÉES</h1>
<p>Patient : <strong>{{patient_nom}}</strong> né(e) le {{date_naissance}} — Arrivée : {{date_arrivee}}</p>
<p>Motif : {{motif_consultation}}</p>
<p>Catégorie de triage : <strong>{{categorie_triage}}</strong></p>
<p>Médecin d'accueil : Dr <strong>{{medecin_accueil}}</strong></p>
<p>Signature : ___________________    Date : _______________</p></div>`
  },

  {
    code: 'urg_pec_arret_cardiaque',
    name: "Plan de prise en charge arrêt cardiaque (RCP)",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Protocole institutionnel de réanimation cardio-pulmonaire en cas d'arrêt cardiaque intra ou extra-hospitalier.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Établissement",type:'text',required:true},
      {key:'responsable_nom',label:"Médecin responsable du protocole",type:'text',required:true},
      {key:'algorithme_rcp',label:"Algorithme RCP appliqué (BLS/ACLS)",type:'text',required:true},
      {key:'materiel_disponible',label:"Matériel disponible (DEA, chariot d'urgence)",type:'textarea',required:true},
      {key:'date_validation',label:"Date de validation du protocole",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE RÉANIMATION CARDIO-PULMONAIRE (RCP)</h1>
<p>Établissement : <strong>{{etablissement_nom}}</strong> — Responsable : Dr <strong>{{responsable_nom}}</strong></p>
<p>Algorithme : {{algorithme_rcp}} | Validé le {{date_validation}}</p>
<h2>Matériel disponible</h2><p>{{materiel_disponible}}</p>
<p>Signature : ___________________</p></div>`
  },

  {
    code: 'urg_pec_polytraumatise',
    name: "Protocole de prise en charge polytraumatisé",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Protocole ATLS de prise en charge initiale du patient polytraumatisé aux urgences.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Établissement",type:'text',required:true},
      {key:'responsable_nom',label:"Chirurgien/urgentiste responsable",type:'text',required:true},
      {key:'mecanisme_trauma',label:"Mécanisme traumatique",type:'textarea',required:true},
      {key:'bilan_lesionnel',label:"Bilan lésionnel initial (ABCDE)",type:'textarea',required:true},
      {key:'date_prise_en_charge',label:"Date de prise en charge",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE POLYTRAUMATISÉ — ATLS</h1>
<p>Établissement : <strong>{{etablissement_nom}}</strong> — Référent : Dr <strong>{{responsable_nom}}</strong></p>
<p>Date : {{date_prise_en_charge}}</p>
<h2>Mécanisme</h2><p>{{mecanisme_trauma}}</p>
<h2>Bilan ABCDE initial</h2><p>{{bilan_lesionnel}}</p>
<p>Signature : ___________________</p></div>`
  },

  {
    code: 'urg_pec_brule_grave',
    name: "Protocole de prise en charge brûlé grave",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Protocole de prise en charge initiale du brûlé grave (règle des 9 de Wallace, réhydratation Parkland).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'surface_brulee',label:"Surface corporelle brûlée estimée (%)",type:'text',required:true},
      {key:'profondeur',label:"Profondeur des brûlures (1er, 2e, 3e degré)",type:'text',required:true},
      {key:'rehydratation',label:"Protocole de réhydratation (Parkland/Brooke)",type:'textarea',required:true},
      {key:'date_admission',label:"Date d'admission",type:'date',required:true},
      {key:'urgentiste_nom',label:"Médecin urgentiste référent",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE BRÛLÉ GRAVE</h1>
<p>Patient : <strong>{{patient_nom}}</strong> — Admis le {{date_admission}}</p>
<p>SCB : {{surface_brulee}} % | Profondeur : {{profondeur}}</p>
<h2>Réhydratation</h2><p>{{rehydratation}}</p>
<p>Urgentiste référent : Dr <strong>{{urgentiste_nom}}</strong></p>
<p>Signature : ___________________</p></div>`
  },

  {
    code: 'urg_pec_intoxication_aigue',
    name: "Protocole de prise en charge intoxication aiguë",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Protocole de prise en charge aux urgences d'une intoxication aiguë médicamenteuse ou toxique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'toxique_identifie',label:"Toxique identifié ou suspecté",type:'text',required:true},
      {key:'voie_exposition',label:"Voie d'exposition (ingestion, inhalation, cutanée)",type:'text',required:true},
      {key:'antidote',label:"Antidote ou traitement spécifique administré",type:'textarea',required:true},
      {key:'date_admission',label:"Date d'admission aux urgences",type:'date',required:true},
      {key:'medecin_nom',label:"Médecin urgentiste",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE INTOXICATION AIGUË</h1>
<p>Patient : <strong>{{patient_nom}}</strong> — Admis le {{date_admission}}</p>
<p>Toxique : {{toxique_identifie}} | Voie : {{voie_exposition}}</p>
<h2>Antidote et traitement</h2><p>{{antidote}}</p>
<p>Urgentiste : Dr <strong>{{medecin_nom}}</strong></p>
<p>Signature : ___________________</p></div>`
  },

  {
    code: 'urg_pec_meningite_bacterienne',
    name: "Protocole de prise en charge méningite bactérienne",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Protocole d'urgence pour la prise en charge rapide d'une méningite bactérienne présumée.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'germe_suspecte',label:"Germe suspecté ou identifié",type:'text',required:true},
      {key:'antibiotherapie',label:"Antibiothérapie instaurée en urgence",type:'textarea',required:true},
      {key:'date_ponction',label:"Date de la ponction lombaire",type:'date',required:false},
      {key:'neurologue_nom',label:"Médecin référent",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE MÉNINGITE BACTÉRIENNE — URGENCE</h1>
<p>Patient : <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}</p>
<p>Germe suspecté : {{germe_suspecte}}</p>
<h2>Antibiothérapie d'urgence</h2><p>{{antibiotherapie}}</p>
<p>Ponction lombaire : {{date_ponction}} | Médecin référent : Dr <strong>{{neurologue_nom}}</strong></p>
<p>Signature : ___________________</p></div>`
  },

  {
    code: 'urg_pec_choc_septique',
    name: "Protocole de prise en charge état de choc septique",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Protocole de prise en charge du choc septique selon les recommandations Surviving Sepsis Campaign.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'foyer_infectieux',label:"Foyer infectieux identifié",type:'textarea',required:true},
      {key:'remplissage_vasculaire',label:"Remplissage vasculaire initial (volume, soluté)",type:'textarea',required:true},
      {key:'vasopresseurs',label:"Vasopresseurs utilisés",type:'text',required:true},
      {key:'date_prise_en_charge',label:"Date et heure de prise en charge",type:'date',required:true},
      {key:'reanimateur_nom',label:"Réanimateur référent",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE CHOC SEPTIQUE — SSC BUNDLE</h1>
<p>Patient : <strong>{{patient_nom}}</strong> — Prise en charge : {{date_prise_en_charge}}</p>
<h2>Foyer infectieux</h2><p>{{foyer_infectieux}}</p>
<h2>Remplissage vasculaire</h2><p>{{remplissage_vasculaire}}</p>
<p>Vasopresseurs : {{vasopresseurs}}</p>
<p>Réanimateur : Dr <strong>{{reanimateur_nom}}</strong></p>
<p>Signature : ___________________</p></div>`
  },

  {
    code: 'urg_pec_noyade_asphyxie',
    name: "Plan de prise en charge noyade et asphyxie",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Plan de prise en charge d'urgence pour noyade ou asphyxie avec algorithme de secours.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'circonstances',label:"Circonstances (noyade douce, salée, asphyxie par obstruction)",type:'textarea',required:true},
      {key:'score_modell',label:"Score de Szpilman / durée de submersion",type:'text',required:true},
      {key:'mesures_reanimation',label:"Mesures de réanimation effectuées",type:'textarea',required:true},
      {key:'date_accident',label:"Date et heure de l'accident",type:'date',required:true},
      {key:'medecin_nom',label:"Médecin urgentiste",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN PRISE EN CHARGE NOYADE / ASPHYXIE</h1>
<p>Patient : <strong>{{patient_nom}}</strong> — Accident le {{date_accident}}</p>
<p>Circonstances : {{circonstances}}</p>
<p>Score Szpilman : {{score_modell}}</p>
<h2>Réanimation effectuée</h2><p>{{mesures_reanimation}}</p>
<p>Urgentiste : Dr <strong>{{medecin_nom}}</strong> | Signature : ___________________</p></div>`
  },

  {
    code: 'urg_protocole_transport_samu',
    name: "Protocole de transport médicalisé SAMU",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Protocole encadrant le transport médicalisé d'un patient par le SAMU (SMUR).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient transporté",type:'text',required:true},
      {key:'motif_transport',label:"Motif médical du transport",type:'textarea',required:true},
      {key:'etablissement_depart',label:"Établissement ou lieu de départ",type:'text',required:true},
      {key:'etablissement_arrivee',label:"Établissement de destination",type:'text',required:true},
      {key:'medecin_accompagnateur',label:"Médecin ou infirmier accompagnateur",type:'text',required:true},
      {key:'date_transport',label:"Date du transport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE TRANSPORT MÉDICALISÉ — SAMU/SMUR</h1>
<p>Patient : <strong>{{patient_nom}}</strong> | Transport le {{date_transport}}</p>
<p>De : {{etablissement_depart}} → Vers : {{etablissement_arrivee}}</p>
<h2>Motif médical</h2><p>{{motif_transport}}</p>
<p>Accompagnateur : <strong>{{medecin_accompagnateur}}</strong></p>
<p>Signature du médecin régulateur : ___________________</p></div>`
  },

  {
    code: 'urg_accord_regulation_medicale',
    name: "Accord de service de régulation médicale",
    category: 'sante', price: 4500, priceMax: 13000,
    description: "Convention de service de régulation médicale entre le SAMU et les établissements partenaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'samu_nom',label:"SAMU / Centre 15 concerné",type:'text',required:true},
      {key:'partenaire_nom',label:"Établissement ou structure partenaire",type:'text',required:true},
      {key:'responsable_samu',label:"Médecin chef de la régulation",type:'text',required:true},
      {key:'perimetre',label:"Périmètre géographique couvert",type:'textarea',required:true},
      {key:'date_debut',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RÉGULATION MÉDICALE SAMU</h1>
<p>Entre <strong>{{samu_nom}}</strong> et <strong>{{partenaire_nom}}</strong></p>
<p>Médecin chef régulateur : Dr <strong>{{responsable_samu}}</strong></p>
<p>En vigueur le {{date_debut}}</p>
<h2>Périmètre couvert</h2><p>{{perimetre}}</p>
<p>Signatures des parties : ___________________</p></div>`
  },

  {
    code: 'urg_accord_ambulance_smur',
    name: "Accord de service d'ambulance médicalisée (SMUR)",
    category: 'sante', price: 4500, priceMax: 13000,
    description: "Convention de partenariat entre un SMUR et un prestataire de transport sanitaire terrestre.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'smur_nom',label:"SMUR / Service mobile d'urgence",type:'text',required:true},
      {key:'transporteur_nom',label:"Prestataire de transport sanitaire",type:'text',required:true},
      {key:'vehicules',label:"Nombre et type de véhicules mis à disposition",type:'text',required:true},
      {key:'tarification',label:"Modalités tarifaires",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — AMBULANCE MÉDICALISÉE SMUR</h1>
<p>Entre <strong>{{smur_nom}}</strong> et <strong>{{transporteur_nom}}</strong></p>
<p>Véhicules : {{vehicules}}</p>
<h2>Tarification</h2><p>{{tarification}}</p>
<p>Signé le {{date_signature}} — Signatures : ___________________</p></div>`
  },

  {
    code: 'urg_accord_reanimation_icu',
    name: "Accord de service de réanimation intensive (ICU)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de service entre un service de réanimation intensive et un établissement demandeur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'icu_nom',label:"Service de réanimation (ICU)",type:'text',required:true},
      {key:'etablissement_demandeur',label:"Établissement demandeur",type:'text',required:true},
      {key:'chef_reanimation',label:"Chef du service de réanimation",type:'text',required:true},
      {key:'capacite_lits',label:"Capacité en lits de réanimation",type:'text',required:true},
      {key:'criteres_admission',label:"Critères d'admission en réanimation",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RÉANIMATION INTENSIVE (ICU)</h1>
<p>Entre <strong>{{icu_nom}}</strong> (Dr <strong>{{chef_reanimation}}</strong>) et <strong>{{etablissement_demandeur}}</strong></p>
<p>Capacité : {{capacite_lits}} lits de réanimation</p>
<h2>Critères d'admission</h2><p>{{criteres_admission}}</p>
<p>Signé le {{date_signature}} — Signatures : ___________________</p></div>`
  },

  {
    code: 'urg_accord_ventilation_mecanique',
    name: "Accord de service de ventilation mécanique",
    category: 'sante', price: 4500, priceMax: 13000,
    description: "Convention encadrant la mise à disposition de respirateurs et la prise en charge ventilée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'service_nom',label:"Service prestataire de ventilation mécanique",type:'text',required:true},
      {key:'etablissement_beneficiaire',label:"Établissement bénéficiaire",type:'text',required:true},
      {key:'nombre_respirateurs',label:"Nombre de respirateurs disponibles",type:'text',required:true},
      {key:'indications',label:"Indications couvertes (SDRA, insuffisance respiratoire aiguë, etc.)",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — VENTILATION MÉCANIQUE</h1>
<p>Prestataire : <strong>{{service_nom}}</strong> | Bénéficiaire : <strong>{{etablissement_beneficiaire}}</strong></p>
<p>Respirateurs disponibles : {{nombre_respirateurs}}</p>
<h2>Indications couvertes</h2><p>{{indications}}</p>
<p>Accord en date du {{date_accord}} — Signatures : ___________________</p></div>`
  },

  {
    code: 'urg_accord_monitoring_hemodynamique',
    name: "Accord de service de surveillance hémodynamique (monitoring)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention encadrant la mise en place d'une surveillance hémodynamique invasive en soins intensifs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'service_nom',label:"Service prestataire",type:'text',required:true},
      {key:'etablissement_beneficiaire',label:"Établissement bénéficiaire",type:'text',required:true},
      {key:'techniques_monitoring',label:"Techniques de monitoring disponibles (PiCCO, Swan-Ganz, etc.)",type:'textarea',required:true},
      {key:'responsable_technique',label:"Responsable technique médical",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — SURVEILLANCE HÉMODYNAMIQUE</h1>
<p>Prestataire : <strong>{{service_nom}}</strong> | Bénéficiaire : <strong>{{etablissement_beneficiaire}}</strong></p>
<h2>Techniques de monitoring</h2><p>{{techniques_monitoring}}</p>
<p>Responsable technique : Dr <strong>{{responsable_technique}}</strong></p>
<p>Accord en date du {{date_accord}} — Signatures : ___________________</p></div>`
  },

  {
    code: 'urg_accord_plan_blanc',
    name: "Accord de plan blanc hospitalier (afflux massif de victimes)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Document d'accord et de déclenchement du plan blanc en cas d'afflux massif de victimes (AMV).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'directeur_nom',label:"Directeur général ou médical",type:'text',required:true},
      {key:'capacite_extension',label:"Capacité d'extension en cas d'AMV",type:'text',required:true},
      {key:'chaine_alerte',label:"Chaîne d'alerte et de commandement",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN BLANC HOSPITALIER — AFFLUX MASSIF DE VICTIMES</h1>
<p>Établissement : <strong>{{etablissement_nom}}</strong> | Directeur : <strong>{{directeur_nom}}</strong></p>
<p>Capacité d'extension : {{capacite_extension}}</p>
<h2>Chaîne d'alerte et commandement</h2><p>{{chaine_alerte}}</p>
<p>Plan adopté le {{date_adoption}} — Signature : ___________________</p></div>`
  },

  {
    code: 'urg_protocole_crise_sanitaire',
    name: "Protocole de crise sanitaire majeure",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Protocole de réponse hospitalière à une crise sanitaire majeure (épidémie, catastrophe).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Établissement",type:'text',required:true},
      {key:'type_crise',label:"Type de crise anticipée",type:'text',required:true},
      {key:'cellule_crise',label:"Composition de la cellule de crise",type:'textarea',required:true},
      {key:'mesures_immediates',label:"Mesures immédiates à activer",type:'textarea',required:true},
      {key:'date_validation',label:"Date de validation du protocole",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE CRISE SANITAIRE MAJEURE</h1>
<p>Établissement : <strong>{{etablissement_nom}}</strong> | Type : <strong>{{type_crise}}</strong></p>
<h2>Cellule de crise</h2><p>{{cellule_crise}}</p>
<h2>Mesures immédiates</h2><p>{{mesures_immediates}}</p>
<p>Validé le {{date_validation}} — Signature : ___________________</p></div>`
  },

  {
    code: 'urg_accord_partenariat_chu_samu',
    name: "Accord de partenariat CHU-SAMU",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de partenariat stratégique entre un CHU et le SAMU pour la gestion des urgences.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'chu_nom',label:"Nom du CHU",type:'text',required:true},
      {key:'samu_nom',label:"SAMU partenaire",type:'text',required:true},
      {key:'directeur_chu',label:"Directeur général du CHU",type:'text',required:true},
      {key:'chef_samu',label:"Médecin chef du SAMU",type:'text',required:true},
      {key:'engagements',label:"Engagements réciproques et modalités de coopération",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CHU – SAMU</h1>
<p>Entre le <strong>{{chu_nom}}</strong> (DG : <strong>{{directeur_chu}}</strong>) et le <strong>{{samu_nom}}</strong> (Chef : Dr <strong>{{chef_samu}}</strong>)</p>
<h2>Engagements réciproques</h2><p>{{engagements}}</p>
<p>Signé le {{date_signature}} — Signatures : ___________________</p></div>`
  },

  {
    code: 'urg_accord_medecine_prehospitaliere',
    name: "Accord de service de médecine d'urgence pré-hospitalière",
    category: 'sante', price: 4500, priceMax: 13000,
    description: "Convention de service de médecine d'urgence pré-hospitalière entre un SMUR et ses partenaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'smur_nom',label:"SMUR prestataire",type:'text',required:true},
      {key:'partenaire_nom',label:"Structure partenaire",type:'text',required:true},
      {key:'perimetre_intervention',label:"Périmètre d'intervention géographique",type:'textarea',required:true},
      {key:'effectifs',label:"Effectifs médicaux et paramédicaux engagés",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — MÉDECINE D'URGENCE PRÉ-HOSPITALIÈRE</h1>
<p>SMUR : <strong>{{smur_nom}}</strong> | Partenaire : <strong>{{partenaire_nom}}</strong></p>
<p>Effectifs : {{effectifs}}</p>
<h2>Périmètre d'intervention</h2><p>{{perimetre_intervention}}</p>
<p>Signé le {{date_signature}} — Signatures : ___________________</p></div>`
  },

  {
    code: 'urg_accord_formation_afgsu',
    name: "Accord de formation gestes de premiers secours (AFGSU)",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Convention de formation AFGSU (Attestation de Formation aux Gestes et Soins d'Urgence).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'organisme_formateur',label:"Organisme formateur agréé",type:'text',required:true},
      {key:'etablissement_beneficiaire',label:"Établissement bénéficiaire",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires à former",type:'text',required:true},
      {key:'niveau_afgsu',label:"Niveau AFGSU (1 ou 2)",type:'text',required:true},
      {key:'calendrier',label:"Calendrier de formation",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION — AFGSU</h1>
<p>Formateur : <strong>{{organisme_formateur}}</strong> | Bénéficiaire : <strong>{{etablissement_beneficiaire}}</strong></p>
<p>Niveau AFGSU {{niveau_afgsu}} — {{nombre_stagiaires}} stagiaires</p>
<h2>Calendrier</h2><p>{{calendrier}}</p>
<p>Signé le {{date_signature}} — Signatures : ___________________</p></div>`
  },

  {
    code: 'urg_rapport_performance_urgences',
    name: "Rapport de performance service des urgences",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Rapport périodique de performance et d'activité du service des urgences.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'periode_rapport',label:"Période du rapport (ex : T1 2025)",type:'text',required:true},
      {key:'nombre_passages',label:"Nombre total de passages aux urgences",type:'text',required:true},
      {key:'duree_moyenne_sejour',label:"Durée moyenne de séjour aux urgences",type:'text',required:true},
      {key:'indicateurs_qualite',label:"Indicateurs qualité atteints / non atteints",type:'textarea',required:true},
      {key:'redacteur_nom',label:"Nom du rédacteur / chef de service",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE — SERVICE DES URGENCES</h1>
<p>Établissement : <strong>{{etablissement_nom}}</strong> | Période : <strong>{{periode_rapport}}</strong></p>
<p>Passages : {{nombre_passages}} | DMS : {{duree_moyenne_sejour}}</p>
<h2>Indicateurs qualité</h2><p>{{indicateurs_qualite}}</p>
<p>Rédigé par : <strong>{{redacteur_nom}}</strong> | Signature : ___________________</p></div>`
  },

  {
    code: 'urg_plan_developpement_urgences',
    name: "Plan de développement service d'urgences",
    category: 'sante', price: 4500, priceMax: 13000,
    description: "Plan stratégique de développement et d'amélioration du service des urgences.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'chef_service_nom',label:"Chef du service des urgences",type:'text',required:true},
      {key:'diagnostic_situation',label:"Diagnostic de la situation actuelle",type:'textarea',required:true},
      {key:'axes_developpement',label:"Axes stratégiques de développement",type:'textarea',required:true},
      {key:'horizon_temporel',label:"Horizon temporel du plan",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT — SERVICE DES URGENCES</h1>
<p>Établissement : <strong>{{etablissement_nom}}</strong> | Chef de service : Dr <strong>{{chef_service_nom}}</strong></p>
<p>Horizon : {{horizon_temporel}} | Adopté le {{date_adoption}}</p>
<h2>Diagnostic</h2><p>{{diagnostic_situation}}</p>
<h2>Axes de développement</h2><p>{{axes_developpement}}</p>
<p>Signature : ___________________</p></div>`
  },

  {
    code: 'urg_accord_telemedecine_urgence',
    name: "Accord de service de télémédecine urgence",
    category: 'sante', price: 4500, priceMax: 13000,
    description: "Convention de service de télémédecine dédiée aux urgences entre un SAMU et des structures distantes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'samu_nom',label:"SAMU / Centre régulateur",type:'text',required:true},
      {key:'structure_distante',label:"Structure distante bénéficiaire",type:'text',required:true},
      {key:'plateforme_tech',label:"Plateforme technologique de télémédecine",type:'text',required:true},
      {key:'actes_teleconsultation',label:"Actes de téléconsultation d'urgence couverts",type:'textarea',required:true},
      {key:'date_debut',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TÉLÉMÉDECINE URGENCE</h1>
<p>Régulateur : <strong>{{samu_nom}}</strong> | Bénéficiaire : <strong>{{structure_distante}}</strong></p>
<p>Plateforme : {{plateforme_tech}} | En vigueur le {{date_debut}}</p>
<h2>Actes couverts</h2><p>{{actes_teleconsultation}}</p>
<p>Signatures des parties : ___________________</p></div>`
  },

  {
    code: 'urg_accord_pompiers_samu_cipm',
    name: "Accord de partenariat pompiers-SAMU (CIPM)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de partenariat opérationnel entre les sapeurs-pompiers et le SAMU pour interventions médicales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'sdis_nom',label:"SDIS (Service Départemental d'Incendie et de Secours)",type:'text',required:true},
      {key:'samu_nom',label:"SAMU partenaire",type:'text',required:true},
      {key:'protocoles_communs',label:"Protocoles d'intervention communs",type:'textarea',required:true},
      {key:'responsable_sdis',label:"Directeur du SDIS",type:'text',required:true},
      {key:'chef_samu',label:"Médecin chef du SAMU",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT POMPIERS – SAMU (CIPM)</h1>
<p>SDIS : <strong>{{sdis_nom}}</strong> (Dir. : <strong>{{responsable_sdis}}</strong>)</p>
<p>SAMU : <strong>{{samu_nom}}</strong> (Chef : Dr <strong>{{chef_samu}}</strong>)</p>
<h2>Protocoles communs d'intervention</h2><p>{{protocoles_communs}}</p>
<p>Signé le {{date_signature}} — Signatures : ___________________</p></div>`
  },

  {
    code: 'urg_charte_humanisation_urgences',
    name: "Charte de prise en charge humaine aux urgences",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Charte d'engagement pour une prise en charge respectueuse et humanisée des patients aux urgences.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'directeur_nom',label:"Directeur général",type:'text',required:true},
      {key:'valeurs',label:"Valeurs et principes d'accueil aux urgences",type:'textarea',required:true},
      {key:'engagements_personnel',label:"Engagements du personnel soignant",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE PRISE EN CHARGE HUMAINE AUX URGENCES</h1>
<p>Établissement : <strong>{{etablissement_nom}}</strong> | Directeur : <strong>{{directeur_nom}}</strong></p>
<h2>Valeurs et principes</h2><p>{{valeurs}}</p>
<h2>Engagements du personnel</h2><p>{{engagements_personnel}}</p>
<p>Adoptée le {{date_adoption}} — Signature : ___________________</p></div>`
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
  console.log(`Batch 64a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
