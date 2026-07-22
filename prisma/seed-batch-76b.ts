import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ===== KINÉSITHÉRAPIE / RÉÉDUCATION (25 templates) =====
  {
    code: 'kin_contrat_liberal',
    name: "Contrat de service de kinésithérapie libérale",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Contrat encadrant la prestation de kinésithérapie en cabinet libéral, conforme aux normes OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'numero_ordre',label:"Numéro d'ordre professionnel",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_debut',label:"Date de début des soins",type:'date',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true},
      {key:'adresse_cabinet',label:"Adresse du cabinet",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE KINÉSITHÉRAPIE LIBÉRALE</h1><p>Entre le kinésithérapeute <strong>{{nom_kine}}</strong>, inscrit sous le numéro {{numero_ordre}}, et le patient <strong>{{nom_patient}}</strong>, il est convenu ce qui suit :</p><h2>1. Objet du contrat</h2><p>Le praticien s'engage à dispenser des soins de kinésithérapie à compter du {{date_debut}}, au tarif de {{tarif_seance}} FCFA par séance.</p><h2>2. Lieu de prestation</h2><p>Les soins sont dispensés au cabinet situé à {{adresse_cabinet}}.</p><h2>3. Obligations des parties</h2><p>Le patient s'engage à respecter les rendez-vous fixés et à informer le praticien de tout changement de son état de santé. Le praticien s'engage au secret professionnel et à la qualité des soins.</p><h2>4. Résiliation</h2><p>Le contrat peut être résilié par l'une ou l'autre des parties avec un préavis de 48 heures.</p><p>Fait à Abidjan, le {{date_debut}}</p></div>`
  },
  {
    code: 'kin_consent_reeducation_accident',
    name: "Consentement de rééducation fonctionnelle après accident",
    category: 'sante', price: 2500, priceMax: 7000,
    description: "Formulaire de consentement éclairé pour rééducation fonctionnelle consécutive à un accident.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_accident',label:"Date de l'accident",type:'date',required:true},
      {key:'nature_lesion',label:"Nature de la lésion",type:'textarea',required:true},
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'duree_prevue',label:"Durée prévisionnelle de rééducation",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT DE RÉÉDUCATION FONCTIONNELLE APRÈS ACCIDENT</h1><p>Je soussigné(e) <strong>{{nom_patient}}</strong>, victime d'un accident survenu le {{date_accident}}, ayant entraîné la lésion suivante : <em>{{nature_lesion}}</em>,</p><h2>Déclare</h2><p>Avoir été informé(e) par le kinésithérapeute <strong>{{nom_kine}}</strong> des objectifs, méthodes, bénéfices et risques de la rééducation fonctionnelle proposée, d'une durée prévisionnelle de {{duree_prevue}}.</p><h2>Consentement</h2><p>J'accepte librement et en connaissance de cause de suivre ce programme de rééducation. Je comprends que je peux retirer mon consentement à tout moment sans préjudice pour mes soins futurs.</p><p>Signature du patient :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_consent_postop_ortho',
    name: "Consentement de rééducation post-opératoire (orthopédie)",
    category: 'sante', price: 3000, priceMax: 8000,
    description: "Consentement éclairé pour rééducation après chirurgie orthopédique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'type_chirurgie',label:"Type de chirurgie pratiquée",type:'text',required:true},
      {key:'date_operation',label:"Date de l'opération",type:'date',required:true},
      {key:'nom_chirurgien',label:"Nom du chirurgien",type:'text',required:true},
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'objectifs_reeducation',label:"Objectifs de la rééducation",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT DE RÉÉDUCATION POST-OPÉRATOIRE — ORTHOPÉDIE</h1><p>Patient(e) : <strong>{{nom_patient}}</strong></p><p>Chirurgie pratiquée : {{type_chirurgie}}, réalisée le {{date_operation}} par le Dr {{nom_chirurgien}}.</p><h2>Information</h2><p>Le kinésithérapeute <strong>{{nom_kine}}</strong> m'a informé(e) des phases de rééducation post-opératoire, des exercices prévus, des douleurs possibles et des signes d'alarme à surveiller.</p><h2>Objectifs</h2><p>{{objectifs_reeducation}}</p><h2>Consentement</h2><p>J'accepte de suivre ce protocole de rééducation post-opératoire et m'engage à respecter les consignes données par le thérapeute.</p><p>Signature :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_consent_neurologique',
    name: "Consentement de rééducation neurologique (AVC, sclérose)",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Consentement pour prise en charge kinésithérapeutique des pathologies neurologiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'diagnostic',label:"Diagnostic neurologique",type:'text',required:true},
      {key:'date_debut_sympt',label:"Date de début des symptômes",type:'date',required:true},
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'plan_reeducation',label:"Plan de rééducation proposé",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT DE RÉÉDUCATION NEUROLOGIQUE</h1><p>Je soussigné(e) <strong>{{nom_patient}}</strong>, présentant le diagnostic de <em>{{diagnostic}}</em> depuis le {{date_debut_sympt}},</p><h2>Plan de rééducation</h2><p>{{plan_reeducation}}</p><h2>Risques et bénéfices</h2><p>Le kinésithérapeute <strong>{{nom_kine}}</strong> m'a expliqué que la rééducation neurologique vise à récupérer les fonctions motrices et sensitives altérées. Des douleurs, fatigue et progressions irrégulières sont possibles.</p><h2>Consentement</h2><p>J'accepte librement ce programme de rééducation neurologique.</p><p>Signature :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_consent_cardiaque',
    name: "Consentement de rééducation cardiaque (post-infarctus)",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Consentement éclairé pour rééducation cardiaque après infarctus du myocarde.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_infarctus',label:"Date de l'infarctus",type:'date',required:true},
      {key:'nom_cardiologue',label:"Nom du cardiologue prescripteur",type:'text',required:true},
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'contre_indications',label:"Contre-indications éventuelles",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT DE RÉÉDUCATION CARDIAQUE POST-INFARCTUS</h1><p>Patient(e) : <strong>{{nom_patient}}</strong>, ayant présenté un infarctus du myocarde le {{date_infarctus}}, suivi par le Dr {{nom_cardiologue}}.</p><h2>Programme de rééducation cardiaque</h2><p>Le kinésithérapeute <strong>{{nom_kine}}</strong> m'a présenté le programme de réadaptation cardiaque comprenant des exercices progressifs sous surveillance médicale.</p><h2>Contre-indications</h2><p>{{contre_indications}}</p><h2>Consentement</h2><p>Informé(e) des bénéfices (amélioration de la tolérance à l'effort, réduction des risques de récidive) et des risques (fatigue, risque cardiaque résiduel), j'accepte ce programme.</p><p>Signature :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_consent_respiratoire',
    name: "Consentement de rééducation respiratoire (BPCO, asthme)",
    category: 'sante', price: 3000, priceMax: 8000,
    description: "Consentement pour rééducation respiratoire chez les patients atteints de pathologies pulmonaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'pathologie',label:"Pathologie respiratoire (BPCO, asthme, etc.)",type:'text',required:true},
      {key:'nom_pneumologue',label:"Nom du pneumologue prescripteur",type:'text',required:true},
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'techniques_prevues',label:"Techniques de rééducation prévues",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT DE RÉÉDUCATION RESPIRATOIRE</h1><p>Patient(e) : <strong>{{nom_patient}}</strong>, atteint(e) de <em>{{pathologie}}</em>, adressé(e) par le Dr {{nom_pneumologue}}.</p><h2>Programme proposé</h2><p>Le kinésithérapeute <strong>{{nom_kine}}</strong> m'a présenté les techniques prévues : {{techniques_prevues}}</p><h2>Objectifs</h2><p>Améliorer la capacité respiratoire, réduire la dyspnée et améliorer la qualité de vie.</p><h2>Consentement</h2><p>J'accepte de participer à ce programme de rééducation respiratoire et m'engage à signaler tout symptôme inhabituel.</p><p>Signature :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_consent_pelvien',
    name: "Consentement de rééducation pelvienne (femme)",
    category: 'sante', price: 2500, priceMax: 7000,
    description: "Consentement éclairé pour rééducation du périnée et du plancher pelvien chez la femme.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_patiente',label:"Nom complet de la patiente",type:'text',required:true},
      {key:'motif_consultation',label:"Motif de consultation",type:'textarea',required:true},
      {key:'nom_prescripteur',label:"Nom du médecin prescripteur",type:'text',required:true},
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances prescrites",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT DE RÉÉDUCATION PELVIENNE</h1><p>Je soussignée <strong>{{nom_patiente}}</strong>, consultante pour : <em>{{motif_consultation}}</em>, adressée par le Dr {{nom_prescripteur}},</p><h2>Information</h2><p>Le kinésithérapeute <strong>{{nom_kine}}</strong> m'a expliqué les objectifs de la rééducation pelvienne (renforcement du plancher pelvien, traitement des fuites urinaires, douleurs pelviennes), les techniques utilisées et leur caractère intime nécessitant mon consentement explicite.</p><h2>Programme</h2><p>{{nombre_seances}} séances de rééducation sont prescrites.</p><h2>Consentement</h2><p>J'accepte librement et en toute connaissance de cause ce traitement de rééducation pelvienne. Je peux interrompre la séance à tout moment.</p><p>Signature :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_consent_sportif',
    name: "Consentement de rééducation du sportif blessé",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Consentement pour protocole de rééducation sportive suite à une blessure.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'sport_pratique',label:"Sport pratiqué",type:'text',required:true},
      {key:'nature_blessure',label:"Nature de la blessure",type:'textarea',required:true},
      {key:'date_blessure',label:"Date de la blessure",type:'date',required:true},
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'objectif_retour',label:"Objectif de retour au sport",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT DE RÉÉDUCATION DU SPORTIF BLESSÉ</h1><p>Sportif(ve) : <strong>{{nom_sportif}}</strong>, pratiquant {{sport_pratique}}, blessé(e) le {{date_blessure}}.</p><h2>Nature de la blessure</h2><p>{{nature_blessure}}</p><h2>Programme de rééducation</h2><p>Le kinésithérapeute <strong>{{nom_kine}}</strong> m'a présenté le protocole de rééducation adapté à ma blessure, incluant les phases de cicatrisation, de renforcement et de retour progressif au sport.</p><h2>Objectif</h2><p>Retour au sport : {{objectif_retour}}</p><h2>Consentement</h2><p>J'accepte ce programme et m'engage à suivre les recommandations du thérapeute.</p><p>Signature :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_pediatrique',
    name: "Accord de service de kinésithérapie pédiatrique (enfants)",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Accord de prise en charge kinésithérapeutique pour patient mineur, signé par les parents ou tuteurs légaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_enfant',label:"Nom complet de l'enfant",type:'text',required:true},
      {key:'date_naissance_enfant',label:"Date de naissance de l'enfant",type:'date',required:true},
      {key:'nom_parent',label:"Nom du parent ou tuteur légal",type:'text',required:true},
      {key:'motif_soins',label:"Motif des soins",type:'textarea',required:true},
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE KINÉSITHÉRAPIE PÉDIATRIQUE</h1><p>Je soussigné(e) <strong>{{nom_parent}}</strong>, parent/tuteur légal de l'enfant <strong>{{nom_enfant}}</strong>, né(e) le {{date_naissance_enfant}},</p><h2>Motif des soins</h2><p>{{motif_soins}}</p><h2>Accord de prise en charge</h2><p>Autorise le kinésithérapeute <strong>{{nom_kine}}</strong> à prendre en charge mon enfant pour les soins de kinésithérapie pédiatrique nécessaires à son état de santé.</p><h2>Engagement</h2><p>Je m'engage à accompagner mon enfant aux séances et à informer le praticien de tout changement dans son état de santé.</p><p>Signature du parent/tuteur :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_osteopathie',
    name: "Accord de service d'ostéopathie libérale",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Accord encadrant la prestation d'ostéopathie en cabinet libéral.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_osteopathe',label:"Nom de l'ostéopathe",type:'text',required:true},
      {key:'numero_enregistrement',label:"Numéro d'enregistrement",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'motif_consultation',label:"Motif de consultation",type:'textarea',required:true},
      {key:'tarif_consultation',label:"Tarif de la consultation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'OSTÉOPATHIE LIBÉRALE</h1><p>Entre l'ostéopathe <strong>{{nom_osteopathe}}</strong>, enregistré sous le numéro {{numero_enregistrement}}, et le patient <strong>{{nom_patient}}</strong>,</p><h2>Motif de consultation</h2><p>{{motif_consultation}}</p><h2>Modalités</h2><p>La consultation d'ostéopathie est facturée à {{tarif_consultation}} FCFA. L'ostéopathe s'engage à réaliser une évaluation globale de la posture et des mobilités articulaires et à mettre en place un traitement manuel adapté.</p><h2>Consentement éclairé</h2><p>Le patient reconnaît avoir été informé des techniques ostéopathiques, de leurs bénéfices et des effets secondaires possibles (courbatures temporaires).</p><p>Signatures des parties :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_chiropractie',
    name: "Accord de service de chiropractie",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Accord de prestation chiropractique avec consentement éclairé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_chiropracteur',label:"Nom du chiropracteur",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'zone_traitement',label:"Zone de traitement (colonne, articulation...)",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CHIROPRACTIE</h1><p>Entre le chiropracteur <strong>{{nom_chiropracteur}}</strong> et le patient <strong>{{nom_patient}}</strong>,</p><h2>Traitement proposé</h2><p>Zone de traitement : {{zone_traitement}}. Nombre de séances prévues : {{nombre_seances}}, au tarif de {{tarif_seance}} FCFA par séance.</p><h2>Information et consentement</h2><p>Le patient déclare avoir été informé des techniques de manipulation vertébrale, de leurs effets thérapeutiques et des contre-indications éventuelles. Il consent librement à ce traitement.</p><h2>Engagement du praticien</h2><p>Le chiropracteur s'engage à respecter les protocoles de sécurité et à orienter le patient vers un médecin en cas de nécessité.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_ergotherapie',
    name: "Accord de service d'ergothérapie (réadaptation)",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Accord de prestation ergothérapeutique pour la réadaptation fonctionnelle et l'autonomie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'nom_ergotherapeute',label:"Nom de l'ergothérapeute",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'objectifs_readaptation',label:"Objectifs de réadaptation",type:'textarea',required:true},
      {key:'duree_programme',label:"Durée du programme",type:'text',required:true},
      {key:'lieu_intervention',label:"Lieu d'intervention",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ERGOTHÉRAPIE</h1><p>Entre l'ergothérapeute <strong>{{nom_ergotherapeute}}</strong> et le patient <strong>{{nom_patient}}</strong>,</p><h2>Objectifs de réadaptation</h2><p>{{objectifs_readaptation}}</p><h2>Programme</h2><p>Durée du programme : {{duree_programme}}. Lieu d'intervention : {{lieu_intervention}}.</p><h2>Engagements</h2><p>L'ergothérapeute s'engage à évaluer les capacités fonctionnelles du patient, à adapter l'environnement et à proposer des aides techniques appropriées. Le patient s'engage à participer activement aux séances.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_orthophonie',
    name: "Accord de service d'orthophonie (troubles du langage adulte)",
    category: 'sante', price: 2500, priceMax: 7500,
    description: "Accord de prise en charge orthophonique pour adultes présentant des troubles du langage.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_orthophoniste',label:"Nom de l'orthophoniste",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'trouble_langage',label:"Nature du trouble du langage",type:'textarea',required:true},
      {key:'frequence_seances',label:"Fréquence des séances",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ORTHOPHONIE</h1><p>Entre l'orthophoniste <strong>{{nom_orthophoniste}}</strong> et le patient <strong>{{nom_patient}}</strong>,</p><h2>Trouble traité</h2><p>{{trouble_langage}}</p><h2>Modalités de prise en charge</h2><p>Fréquence des séances : {{frequence_seances}}. Tarif : {{tarif_seance}} FCFA par séance.</p><h2>Programme thérapeutique</h2><p>L'orthophoniste s'engage à réaliser un bilan initial du langage et à mettre en place un programme de rééducation orthophonique personnalisé. Des exercices à domicile pourront être prescrits.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_podologie',
    name: "Accord de service de podologie",
    category: 'sante', price: 2000, priceMax: 6000,
    description: "Accord de prestation podologique pour soins des pieds et de la marche.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_podologue',label:"Nom du podologue",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'motif_consultation',label:"Motif de consultation",type:'textarea',required:true},
      {key:'traitement_propose',label:"Traitement proposé",type:'text',required:true},
      {key:'tarif',label:"Tarif (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PODOLOGIE</h1><p>Entre le podologue <strong>{{nom_podologue}}</strong> et le patient <strong>{{nom_patient}}</strong>,</p><h2>Motif de consultation</h2><p>{{motif_consultation}}</p><h2>Traitement proposé</h2><p>{{traitement_propose}}, au tarif de {{tarif}} FCFA.</p><h2>Obligations</h2><p>Le podologue s'engage à réaliser un examen podologique complet et à proposer des soins et orthèses plantaires adaptés. Le patient s'engage à suivre les recommandations d'hygiène podologique.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_pedicurie',
    name: "Accord de service de pédicurie médicale",
    category: 'sante', price: 2000, priceMax: 6000,
    description: "Accord de prestation de pédicurie médicale pour soins spécialisés des pieds.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_pedicure',label:"Nom du pédicure-podologue",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'soins_prevus',label:"Soins prévus",type:'textarea',required:true},
      {key:'date_soin',label:"Date du soin",type:'date',required:true},
      {key:'tarif',label:"Tarif (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PÉDICURIE MÉDICALE</h1><p>Entre le pédicure-podologue <strong>{{nom_pedicure}}</strong> et le patient <strong>{{nom_patient}}</strong>,</p><h2>Soins prévus le {{date_soin}}</h2><p>{{soins_prevus}}</p><h2>Conditions financières</h2><p>Tarif convenu : {{tarif}} FCFA.</p><h2>Protocole d'hygiène</h2><p>Le praticien s'engage à utiliser du matériel stérilisé ou à usage unique pour chaque consultation, conformément aux normes sanitaires en vigueur.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_prothese',
    name: "Accord de service de prothèse et orthèse (appareillage)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Accord de fourniture et d'ajustement de prothèses et orthèses médicales.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_orthoprothetiste',label:"Nom de l'orthoprothésiste",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'type_appareillage',label:"Type d'appareillage (prothèse/orthèse)",type:'text',required:true},
      {key:'description_appareil',label:"Description de l'appareil",type:'textarea',required:true},
      {key:'cout_total',label:"Coût total (FCFA)",type:'text',required:true},
      {key:'delai_livraison',label:"Délai de livraison",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PROTHÈSE ET ORTHÈSE</h1><p>Entre l'orthoprothésiste <strong>{{nom_orthoprothetiste}}</strong> et le patient <strong>{{nom_patient}}</strong>,</p><h2>Appareillage prescrit</h2><p>Type : {{type_appareillage}}</p><p>Description : {{description_appareil}}</p><h2>Conditions financières</h2><p>Coût total : {{cout_total}} FCFA. Délai de livraison : {{delai_livraison}}.</p><h2>Garantie et suivi</h2><p>L'orthoprothésiste s'engage à ajuster l'appareillage et à assurer le suivi pendant la durée de vie de l'appareil. Toute modification nécessitera un nouvel accord.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_fauteuil',
    name: "Accord de service de fauteuil roulant et aide à la mobilité",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Accord de fourniture et d'adaptation de fauteuil roulant et aides à la mobilité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_fournisseur',label:"Nom du fournisseur d'appareillage",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'type_materiel',label:"Type de matériel (fauteuil manuel, électrique...)",type:'text',required:true},
      {key:'prix_materiel',label:"Prix du matériel (FCFA)",type:'text',required:true},
      {key:'modalites_paiement',label:"Modalités de paiement",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — FAUTEUIL ROULANT ET AIDE À LA MOBILITÉ</h1><p>Entre le fournisseur <strong>{{nom_fournisseur}}</strong> et le patient/représentant légal <strong>{{nom_patient}}</strong>,</p><h2>Matériel fourni</h2><p>Type : {{type_materiel}}. Prix : {{prix_materiel}} FCFA.</p><h2>Modalités de paiement</h2><p>{{modalites_paiement}}</p><h2>Formation et suivi</h2><p>Le fournisseur s'engage à former le patient et ses aidants à l'utilisation du matériel, et à assurer la maintenance pendant la période de garantie.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_electrotherapie',
    name: "Accord de service d'électrothérapie",
    category: 'sante', price: 2500, priceMax: 7000,
    description: "Accord de prestation d'électrothérapie à des fins thérapeutiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'indication_therapeutique',label:"Indication thérapeutique",type:'text',required:true},
      {key:'type_electrotherapie',label:"Type d'électrothérapie (TENS, ultrasons...)",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉLECTROTHÉRAPIE</h1><p>Entre le kinésithérapeute <strong>{{nom_kine}}</strong> et le patient <strong>{{nom_patient}}</strong>,</p><h2>Indication</h2><p>{{indication_therapeutique}}</p><h2>Technique utilisée</h2><p>Type d'électrothérapie : {{type_electrotherapie}}. Nombre de séances : {{nombre_seances}}.</p><h2>Information</h2><p>Le patient a été informé du fonctionnement de l'électrothérapie, des sensations possibles (légères vibrations, chaleur) et des contre-indications absolues (pacemaker, grossesse, zones infectées).</p><h2>Consentement</h2><p>Le patient consent à ce traitement.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_hydrotherapie',
    name: "Accord de service d'hydrothérapie médicale",
    category: 'sante', price: 3000, priceMax: 8000,
    description: "Accord de prestation d'hydrothérapie médicale en balnéothérapie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_etablissement',label:"Nom de l'établissement de balnéothérapie",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'indication',label:"Indication médicale",type:'text',required:true},
      {key:'programme',label:"Programme d'hydrothérapie",type:'textarea',required:true},
      {key:'tarif_session',label:"Tarif par session (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'HYDROTHÉRAPIE MÉDICALE</h1><p>Entre l'établissement <strong>{{nom_etablissement}}</strong> et le patient <strong>{{nom_patient}}</strong>,</p><h2>Indication médicale</h2><p>{{indication}}</p><h2>Programme</h2><p>{{programme}}</p><h2>Conditions tarifaires</h2><p>Tarif par session : {{tarif_session}} FCFA.</p><h2>Précautions</h2><p>Le patient déclare ne présenter aucune contre-indication à l'hydrothérapie (plaies ouvertes, maladies contagieuses, allergie aux produits utilisés). Toute modification de son état de santé sera signalée avant la séance.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_masseur_sportif',
    name: "Accord de service de masseur sportif (équipe professionnelle)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Accord de prestation de massage sportif pour équipe professionnelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_masseur',label:"Nom du masseur kinésithérapeute sportif",type:'text',required:true},
      {key:'nom_equipe',label:"Nom de l'équipe sportive",type:'text',required:true},
      {key:'sport',label:"Sport pratiqué",type:'text',required:true},
      {key:'calendrier_intervention',label:"Calendrier d'intervention",type:'textarea',required:true},
      {key:'remuneration_mensuelle',label:"Rémunération mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MASSEUR SPORTIF</h1><p>Entre le masseur kinésithérapeute sportif <strong>{{nom_masseur}}</strong> et l'équipe sportive <strong>{{nom_equipe}}</strong> ({{sport}}),</p><h2>Missions</h2><p>Le masseur sportif assure les massages de préparation, de récupération et les soins de premiers secours musculaires lors des entraînements et compétitions.</p><h2>Calendrier d'intervention</h2><p>{{calendrier_intervention}}</p><h2>Rémunération</h2><p>{{remuneration_mensuelle}} FCFA par mois, incluant les déplacements pour les matchs à domicile.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_rapport_bilan',
    name: "Rapport de bilan kinésithérapeutique",
    category: 'sante', price: 2500, priceMax: 7000,
    description: "Document de bilan kinésithérapeutique initial ou de suivi.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_bilan',label:"Date du bilan",type:'date',required:true},
      {key:'diagnostic_kine',label:"Diagnostic kinésithérapeutique",type:'textarea',required:true},
      {key:'resultats_tests',label:"Résultats des tests fonctionnels",type:'textarea',required:true},
      {key:'plan_traitement',label:"Plan de traitement proposé",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE BILAN KINÉSITHÉRAPEUTIQUE</h1><p>Praticien : <strong>{{nom_kine}}</strong></p><p>Patient : <strong>{{nom_patient}}</strong></p><p>Date du bilan : {{date_bilan}}</p><h2>Diagnostic kinésithérapeutique</h2><p>{{diagnostic_kine}}</p><h2>Résultats des tests fonctionnels</h2><p>{{resultats_tests}}</p><h2>Plan de traitement proposé</h2><p>{{plan_traitement}}</p><h2>Conclusion</h2><p>Ce bilan sera transmis au médecin prescripteur. Un bilan de fin de traitement sera réalisé à l'issue du programme.</p><p>Signature du kinésithérapeute :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_plan_reeducation',
    name: "Plan de rééducation fonctionnelle",
    category: 'sante', price: 2500, priceMax: 7000,
    description: "Document formalisé décrivant le plan de rééducation fonctionnelle d'un patient.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'objectifs_court_terme',label:"Objectifs à court terme",type:'textarea',required:true},
      {key:'objectifs_long_terme',label:"Objectifs à long terme",type:'textarea',required:true},
      {key:'techniques_utilisees',label:"Techniques utilisées",type:'textarea',required:true},
      {key:'duree_totale',label:"Durée totale du programme",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE RÉÉDUCATION FONCTIONNELLE</h1><p>Patient : <strong>{{nom_patient}}</strong></p><p>Kinésithérapeute : <strong>{{nom_kine}}</strong></p><p>Durée totale : {{duree_totale}}</p><h2>Objectifs à court terme</h2><p>{{objectifs_court_terme}}</p><h2>Objectifs à long terme</h2><p>{{objectifs_long_terme}}</p><h2>Techniques de rééducation utilisées</h2><p>{{techniques_utilisees}}</p><h2>Évaluation</h2><p>Un bilan intermédiaire sera réalisé à mi-parcours et un bilan final à la fin du programme pour mesurer les progrès accomplis.</p><p>Signature :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_partenariat_clinique',
    name: "Accord de partenariat cabinet kiné-clinique",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Accord de partenariat entre un cabinet de kinésithérapie et une clinique médicale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_cabinet',label:"Nom du cabinet de kinésithérapie",type:'text',required:true},
      {key:'nom_clinique',label:"Nom de la clinique partenaire",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'modalites_adressage',label:"Modalités d'adressage des patients",type:'textarea',required:true},
      {key:'duree_accord',label:"Durée de l'accord",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CABINET KINÉ — CLINIQUE</h1><p>Entre le cabinet de kinésithérapie <strong>{{nom_cabinet}}</strong> et la clinique <strong>{{nom_clinique}}</strong>,</p><h2>Objet du partenariat</h2><p>{{objet_partenariat}}</p><h2>Modalités d'adressage</h2><p>{{modalites_adressage}}</p><h2>Durée</h2><p>Le présent accord est conclu pour une durée de {{duree_accord}}, renouvelable par accord express des deux parties.</p><h2>Confidentialité</h2><p>Les deux parties s'engagent à respecter le secret médical et la confidentialité des données patients, conformément à la législation en vigueur en Côte d'Ivoire.</p><p>Signatures des représentants légaux :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_accord_domicile',
    name: "Accord de service de kinésithérapie à domicile",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Accord encadrant les soins de kinésithérapie dispensés au domicile du patient.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'adresse_domicile',label:"Adresse du domicile",type:'text',required:true},
      {key:'frequence_visites',label:"Fréquence des visites",type:'text',required:true},
      {key:'tarif_visite',label:"Tarif par visite à domicile (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE KINÉSITHÉRAPIE À DOMICILE</h1><p>Entre le kinésithérapeute <strong>{{nom_kine}}</strong> et le patient <strong>{{nom_patient}}</strong>, demeurant à {{adresse_domicile}},</p><h2>Modalités d'intervention</h2><p>Le kinésithérapeute s'engage à se déplacer au domicile du patient à compter du {{date_debut}}, à raison de {{frequence_visites}}, au tarif de {{tarif_visite}} FCFA par visite.</p><h2>Conditions d'intervention</h2><p>Le patient s'engage à préparer un espace adapté aux soins, à être présent aux horaires convenus, et à régler les honoraires à chaque séance ou selon les modalités convenues.</p><h2>Résiliation</h2><p>Préavis de 48 heures requis pour toute annulation ou résiliation.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'kin_charte_deontologique',
    name: "Charte déontologique du kinésithérapeute",
    category: 'sante', price: 2000, priceMax: 6000,
    description: "Charte déontologique définissant les engagements éthiques et professionnels du kinésithérapeute.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'numero_ordre',label:"Numéro d'ordre professionnel",type:'text',required:true},
      {key:'nom_cabinet',label:"Nom du cabinet",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DÉONTOLOGIQUE DU KINÉSITHÉRAPEUTE</h1><p>Je soussigné(e) <strong>{{nom_kine}}</strong>, kinésithérapeute inscrit(e) sous le numéro {{numero_ordre}}, exerçant au cabinet <strong>{{nom_cabinet}}</strong>, adopte la présente charte déontologique le {{date_adoption}}.</p><h2>Article 1 — Respect de la personne</h2><p>Le kinésithérapeute respecte la dignité, l'intégrité et l'autonomie de chaque patient sans discrimination.</p><h2>Article 2 — Secret professionnel</h2><p>Le kinésithérapeute est tenu au secret professionnel pour toutes les informations confiées par le patient.</p><h2>Article 3 — Qualité des soins</h2><p>Le praticien s'engage à dispenser des soins conformes aux données actuelles de la science et aux bonnes pratiques professionnelles.</p><h2>Article 4 — Consentement éclairé</h2><p>Tout acte de kinésithérapie requiert le consentement préalable et éclairé du patient.</p><h2>Article 5 — Formation continue</h2><p>Le kinésithérapeute s'engage à maintenir et développer ses compétences par la formation continue.</p><p>Signature :</p><p>Date :</p></div>`
  },

  // ===== MÉDECINE DU SPORT (25 templates) =====
  {
    code: 'med2_contrat_medecin_equipe',
    name: "Contrat de médecin d'équipe sportive professionnelle",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Contrat d'engagement d'un médecin auprès d'une équipe sportive professionnelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_medecin',label:"Nom du médecin du sport",type:'text',required:true},
      {key:'numero_ordre',label:"Numéro d'ordre médical",type:'text',required:true},
      {key:'nom_club',label:"Nom du club sportif",type:'text',required:true},
      {key:'sport',label:"Discipline sportive",type:'text',required:true},
      {key:'remuneration',label:"Rémunération mensuelle (FCFA)",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MÉDECIN D'ÉQUIPE SPORTIVE PROFESSIONNELLE</h1><p>Entre le médecin du sport <strong>{{nom_medecin}}</strong>, inscrit au conseil de l'ordre sous le numéro {{numero_ordre}}, et le club sportif <strong>{{nom_club}}</strong> ({{sport}}),</p><h2>Missions</h2><p>Le médecin assure le suivi médical des sportifs, les consultations de médecine sportive, les urgences sur le terrain et la validation des aptitudes à la compétition.</p><h2>Conditions d'exercice</h2><p>Rémunération : {{remuneration}} FCFA/mois. Durée : {{duree_contrat}}.</p><h2>Indépendance professionnelle</h2><p>Le médecin exerce en toute indépendance médicale. Ses décisions médicales ne peuvent être contestées par la direction sportive du club.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_bilan_precompetition',
    name: "Accord de service de bilan médical avant compétition sportive",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Accord encadrant la réalisation d'un bilan médical pré-compétition.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_medecin',label:"Nom du médecin du sport",type:'text',required:true},
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'sport_discipline',label:"Discipline sportive",type:'text',required:true},
      {key:'date_bilan',label:"Date du bilan",type:'date',required:true},
      {key:'examens_prevus',label:"Examens médicaux prévus",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — BILAN MÉDICAL AVANT COMPÉTITION</h1><p>Entre le médecin du sport <strong>{{nom_medecin}}</strong> et le sportif <strong>{{nom_sportif}}</strong> ({{sport_discipline}}),</p><h2>Bilan prévu le {{date_bilan}}</h2><p>Examens inclus : {{examens_prevus}}</p><h2>Objectifs du bilan</h2><p>Évaluer l'état de santé général, dépister les contre-indications à la compétition et établir un état de référence pour le suivi médical longitudinal.</p><h2>Conditions</h2><p>Le sportif s'engage à se présenter à jeun si nécessaire et à fournir son carnet de santé sportif.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_certificat_aptitude',
    name: "Accord de service d'aptitude à la pratique sportive (certificat)",
    category: 'sante', price: 2000, priceMax: 6000,
    description: "Accord de délivrance du certificat médical d'aptitude à la pratique sportive.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_medecin',label:"Nom du médecin",type:'text',required:true},
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance du sportif",type:'date',required:true},
      {key:'sport_demande',label:"Sport pour lequel l'aptitude est demandée",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen médical",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CERTIFICAT MÉDICAL D'APTITUDE À LA PRATIQUE SPORTIVE</h1><p>Je soussigné(e), Dr <strong>{{nom_medecin}}</strong>, certifie avoir examiné le {{date_examen}} le sportif <strong>{{nom_sportif}}</strong>, né(e) le {{date_naissance}}.</p><h2>Conclusion médicale</h2><p>Au terme de l'examen clinique complet, la personne examinée ne présente pas de contre-indication apparente à la pratique du sport : <strong>{{sport_demande}}</strong>.</p><h2>Validité</h2><p>Ce certificat est valable pour la saison sportive en cours, sous réserve de l'absence de modification de l'état de santé du sportif.</p><p>Cachet et signature du médecin :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_surveillance_entrainement',
    name: "Accord de service de surveillance médicale de l'entrainement",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Accord de suivi médical régulier des séances d'entraînement sportif.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_medecin',label:"Nom du médecin du sport",type:'text',required:true},
      {key:'nom_structure',label:"Nom du club ou académie",type:'text',required:true},
      {key:'nombre_sportifs',label:"Nombre de sportifs à surveiller",type:'text',required:true},
      {key:'frequence_presence',label:"Fréquence de présence médicale",type:'text',required:true},
      {key:'remuneration',label:"Rémunération (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — SURVEILLANCE MÉDICALE DE L'ENTRAÎNEMENT</h1><p>Entre le médecin du sport <strong>{{nom_medecin}}</strong> et la structure sportive <strong>{{nom_structure}}</strong>,</p><h2>Périmètre de la mission</h2><p>Surveillance médicale de {{nombre_sportifs}} sportif(s), à raison de {{frequence_presence}}.</p><h2>Missions incluses</h2><p>Présence lors des entraînements, monitoring des paramètres de santé, gestion des blessures légères, conseil nutritionnel de base, orientation vers spécialistes si nécessaire.</p><h2>Rémunération</h2><p>{{remuneration}} FCFA selon les modalités convenues.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_urgence_terrain',
    name: "Accord de service de médecine d'urgence sur le terrain sportif",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Accord de couverture médicale d'urgence lors des compétitions sportives.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_medecin',label:"Nom du médecin urgentiste sport",type:'text',required:true},
      {key:'nom_organisateur',label:"Nom de l'organisateur de l'événement",type:'text',required:true},
      {key:'lieu_competition',label:"Lieu de la compétition",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'materiel_urgence',label:"Matériel d'urgence mis à disposition",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — MÉDECINE D'URGENCE TERRAIN SPORTIF</h1><p>Entre le médecin urgentiste sportif <strong>{{nom_medecin}}</strong> et l'organisateur <strong>{{nom_organisateur}}</strong>,</p><h2>Événement</h2><p>Lieu : {{lieu_competition}}. Date : {{date_evenement}}.</p><h2>Missions</h2><p>Prise en charge des urgences médicales survenant lors de la compétition, décision d'évacuation vers structure hospitalière si nécessaire, rédaction du rapport médical post-événement.</p><h2>Matériel</h2><p>{{materiel_urgence}}</p><h2>Responsabilité</h2><p>L'organisateur s'engage à fournir un accès rapide à la zone de terrain et à faciliter toute évacuation médicale d'urgence.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_suivi_nutritionnel',
    name: "Accord de service de suivi nutritionnel du sportif",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Accord de prise en charge nutritionnelle adaptée à la pratique sportive.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_nutritionniste',label:"Nom du nutritionniste du sport",type:'text',required:true},
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'sport_pratique',label:"Sport pratiqué et niveau",type:'text',required:true},
      {key:'objectifs_nutritionnels',label:"Objectifs nutritionnels",type:'textarea',required:true},
      {key:'duree_suivi',label:"Durée du suivi",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — SUIVI NUTRITIONNEL DU SPORTIF</h1><p>Entre le nutritionniste sportif <strong>{{nom_nutritionniste}}</strong> et le sportif <strong>{{nom_sportif}}</strong> ({{sport_pratique}}),</p><h2>Objectifs nutritionnels</h2><p>{{objectifs_nutritionnels}}</p><h2>Programme</h2><p>Durée du suivi : {{duree_suivi}}. Le programme comprend : bilan nutritionnel initial, plan alimentaire personnalisé, suivi mensuel avec ajustements, conseils de supplémentation légale.</p><h2>Engagements du sportif</h2><p>Le sportif s'engage à tenir un journal alimentaire et à respecter les recommandations établies lors des consultations.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_psychologie_performance',
    name: "Accord de service de psychologie de la performance sportive",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Accord de prestation de psychologie du sport pour améliorer la performance mentale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_psychologue',label:"Nom du psychologue du sport",type:'text',required:true},
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'objectifs_mentaux',label:"Objectifs de préparation mentale",type:'textarea',required:true},
      {key:'frequence_seances',label:"Fréquence des séances",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PSYCHOLOGIE DE LA PERFORMANCE SPORTIVE</h1><p>Entre le psychologue du sport <strong>{{nom_psychologue}}</strong> et le sportif <strong>{{nom_sportif}}</strong>,</p><h2>Objectifs de préparation mentale</h2><p>{{objectifs_mentaux}}</p><h2>Modalités</h2><p>Fréquence : {{frequence_seances}}. Tarif : {{tarif_seance}} FCFA/séance.</p><h2>Confidentialité</h2><p>Le psychologue s'engage au secret professionnel absolu concernant les échanges avec le sportif. Aucune information ne sera transmise à l'encadrement sportif sans accord explicite du sportif.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_composition_corporelle',
    name: "Accord de service d'évaluation de la composition corporelle (sportif)",
    category: 'sante', price: 2500, priceMax: 7000,
    description: "Accord de mesure et suivi de la composition corporelle du sportif.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_praticien',label:"Nom du praticien spécialisé",type:'text',required:true},
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'methode_mesure',label:"Méthode de mesure utilisée (DEXA, impédancemétrie...)",type:'text',required:true},
      {key:'frequence_evaluation',label:"Fréquence des évaluations",type:'text',required:true},
      {key:'objectifs_composition',label:"Objectifs de composition corporelle",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ÉVALUATION DE LA COMPOSITION CORPORELLE</h1><p>Entre le praticien <strong>{{nom_praticien}}</strong> et le sportif <strong>{{nom_sportif}}</strong>,</p><h2>Méthode utilisée</h2><p>{{methode_mesure}}</p><h2>Fréquence des évaluations</h2><p>{{frequence_evaluation}}</p><h2>Objectifs</h2><p>{{objectifs_composition}}</p><h2>Utilisation des données</h2><p>Les résultats des évaluations sont strictement confidentiels et serviront uniquement à optimiser la préparation physique du sportif. Toute communication à des tiers nécessite l'accord écrit du sportif.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_vo2max',
    name: "Accord de service de test VO2max et capacité cardio-respiratoire",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Accord pour la réalisation du test VO2max et évaluation des capacités cardio-respiratoires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_medecin',label:"Nom du médecin du sport",type:'text',required:true},
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'protocole_test',label:"Protocole de test choisi",type:'text',required:true},
      {key:'date_test',label:"Date du test",type:'date',required:true},
      {key:'contre_indications',label:"Absence de contre-indications confirmée",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TEST VO2MAX ET CAPACITÉ CARDIO-RESPIRATOIRE</h1><p>Entre le médecin du sport <strong>{{nom_medecin}}</strong> et le sportif <strong>{{nom_sportif}}</strong>,</p><h2>Test prévu le {{date_test}}</h2><p>Protocole : {{protocole_test}}</p><h2>Vérification médicale préalable</h2><p>{{contre_indications}}</p><h2>Information</h2><p>Le sportif a été informé que le test consiste en un effort maximal progressif, pouvant induire fatigue et essoufflement intense. Le médecin supervisera l'ensemble de l'épreuve et peut l'interrompre à tout moment pour des raisons de sécurité.</p><h2>Consentement</h2><p>J'accepte de réaliser ce test en connaissance des risques inhérents à l'effort maximal.</p><p>Signature du sportif :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_prevention_blessures',
    name: "Accord de service de prévention des blessures sportives",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Accord de programme de prévention des traumatismes sportifs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_structure',label:"Nom du club ou fédération",type:'text',required:true},
      {key:'nom_medecin',label:"Nom du médecin du sport",type:'text',required:true},
      {key:'sport_cible',label:"Sport ciblé par le programme",type:'text',required:true},
      {key:'programme_prevention',label:"Programme de prévention proposé",type:'textarea',required:true},
      {key:'duree_programme',label:"Durée du programme",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PRÉVENTION DES BLESSURES SPORTIVES</h1><p>Entre le médecin du sport <strong>{{nom_medecin}}</strong> et la structure sportive <strong>{{nom_structure}}</strong> ({{sport_cible}}),</p><h2>Programme de prévention</h2><p>{{programme_prevention}}</p><h2>Durée</h2><p>{{duree_programme}}</p><h2>Obligations de la structure</h2><p>La structure s'engage à intégrer les recommandations de prévention dans les séances d'entraînement et à informer le médecin de toute blessure survenant chez les sportifs.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_retour_sport',
    name: "Accord de service de retour au sport après blessure",
    category: 'sante', price: 3000, priceMax: 8000,
    description: "Protocole médical de reprise progressive de l'activité sportive après blessure.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_medecin',label:"Nom du médecin du sport",type:'text',required:true},
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'blessure_traitee',label:"Blessure traitée",type:'text',required:true},
      {key:'protocol_retour',label:"Protocole de retour au sport",type:'textarea',required:true},
      {key:'date_autorisation',label:"Date d'autorisation de reprise",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RETOUR AU SPORT APRÈS BLESSURE</h1><p>Patient sportif : <strong>{{nom_sportif}}</strong>. Médecin : Dr <strong>{{nom_medecin}}</strong>.</p><h2>Blessure traitée</h2><p>{{blessure_traitee}}</p><h2>Protocole de retour progressif</h2><p>{{protocol_retour}}</p><h2>Autorisation de reprise</h2><p>La reprise de l'activité sportive est autorisée à compter du {{date_autorisation}}, selon le protocole défini ci-dessus. Toute douleur ou symptôme anormal justifie l'arrêt immédiat et une nouvelle consultation.</p><p>Signature du médecin :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_antidopage',
    name: "Accord de service de dopage — contrôle anti-dopage (ONAD)",
    category: 'sante', price: 3500, priceMax: 10000,
    description: "Accord de coopération pour les contrôles anti-dopage conformément aux règles de l'ONAD.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'federation',label:"Fédération sportive",type:'text',required:true},
      {key:'nom_controleur',label:"Nom du contrôleur accrédité",type:'text',required:true},
      {key:'date_controle',label:"Date du contrôle",type:'date',required:true},
      {key:'lieu_controle',label:"Lieu du contrôle",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL DE CONTRÔLE ANTI-DOPAGE</h1><p>Sportif : <strong>{{nom_sportif}}</strong>. Fédération : {{federation}}.</p><p>Contrôleur accrédité ONAD : <strong>{{nom_controleur}}</strong>.</p><p>Date du contrôle : {{date_controle}}. Lieu : {{lieu_controle}}.</p><h2>Procédure</h2><p>Le sportif a été informé de ses droits (assistance d'un représentant, choix du kit de prélèvement) et de ses obligations (se soumettre au contrôle, signer le formulaire). Le prélèvement a été effectué selon les procédures standard de l'Agence Mondiale Anti-dopage.</p><h2>Déclaration du sportif</h2><p>Le sportif déclare avoir consommé les substances et médicaments suivants :</p><p>(à compléter)</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_aut_therapeutique',
    name: "Accord de service de thérapeutique par usage à des fins thérapeutiques (AUT)",
    category: 'sante', price: 2500, priceMax: 7000,
    description: "Demande d'autorisation d'usage à des fins thérapeutiques (AUT) pour substances interdites.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'nom_medecin',label:"Nom du médecin prescripteur",type:'text',required:true},
      {key:'substance_concernee',label:"Substance concernée",type:'text',required:true},
      {key:'diagnostic_medical',label:"Diagnostic médical justifiant l'AUT",type:'textarea',required:true},
      {key:'duree_traitement',label:"Durée du traitement",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>DEMANDE D'AUTORISATION D'USAGE À DES FINS THÉRAPEUTIQUES (AUT)</h1><p>Sportif : <strong>{{nom_sportif}}</strong>. Médecin prescripteur : Dr <strong>{{nom_medecin}}</strong>.</p><h2>Substance concernée</h2><p>{{substance_concernee}}</p><h2>Diagnostic médical</h2><p>{{diagnostic_medical}}</p><h2>Durée du traitement</h2><p>{{duree_traitement}}</p><h2>Justification</h2><p>Le traitement proposé est nécessaire pour traiter une pathologie avérée. Aucune alternative thérapeutique ne permettrait de traiter cette affection sans recourir à la substance concernée. Pièces jointes : ordonnance médicale, résultats d'examens.</p><p>Signature du médecin :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_musculation_medicalisee',
    name: "Accord de service de salle de musculation médicalisée",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Accord d'accès et de suivi en salle de musculation médicalisée pour sportifs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_structure',label:"Nom de la structure médicalisée",type:'text',required:true},
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'programme_musculation',label:"Programme de musculation médicalisé",type:'textarea',required:true},
      {key:'supervision',label:"Type de supervision médicale",type:'text',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — SALLE DE MUSCULATION MÉDICALISÉE</h1><p>Entre la structure <strong>{{nom_structure}}</strong> et le sportif <strong>{{nom_sportif}}</strong>,</p><h2>Programme de musculation</h2><p>{{programme_musculation}}</p><h2>Supervision médicale</h2><p>{{supervision}}</p><h2>Tarif</h2><p>{{tarif_mensuel}} FCFA par mois.</p><h2>Règlement intérieur</h2><p>Le sportif s'engage à respecter les consignes de sécurité, à signaler toute douleur lors des exercices et à ne pas modifier le programme sans accord du médecin superviseur.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_physiotherapie_sportive',
    name: "Accord de service de physiothérapie sportive",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Accord de prestation de physiothérapie adaptée aux sportifs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_physiotherapeute',label:"Nom du physiothérapeute",type:'text',required:true},
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'pathologie_traitee',label:"Pathologie ou blessure traitée",type:'text',required:true},
      {key:'techniques_physio',label:"Techniques de physiothérapie utilisées",type:'textarea',required:true},
      {key:'nombre_seances',label:"Nombre de séances",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PHYSIOTHÉRAPIE SPORTIVE</h1><p>Entre le physiothérapeute <strong>{{nom_physiotherapeute}}</strong> et le sportif <strong>{{nom_sportif}}</strong>,</p><h2>Pathologie traitée</h2><p>{{pathologie_traitee}}</p><h2>Techniques utilisées</h2><p>{{techniques_physio}}</p><h2>Programme</h2><p>{{nombre_seances}} séances de physiothérapie sportive sont planifiées, avec réévaluation à mi-parcours.</p><h2>Objectif</h2><p>Permettre la guérison optimale de la blessure et préparer le retour à la performance sportive dans les meilleures conditions.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_chirurgie_sportive',
    name: "Accord de service de chirurgie sportive (arthroscopie)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Consentement éclairé et accord de service pour chirurgie sportive par arthroscopie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_chirurgien',label:"Nom du chirurgien orthopédiste sportif",type:'text',required:true},
      {key:'nom_patient',label:"Nom complet du patient sportif",type:'text',required:true},
      {key:'articulation_concernee',label:"Articulation concernée",type:'text',required:true},
      {key:'geste_chirurgical',label:"Geste chirurgical prévu",type:'textarea',required:true},
      {key:'date_intervention',label:"Date d'intervention prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CHIRURGIE SPORTIVE PAR ARTHROSCOPIE</h1><p>Chirurgien : Dr <strong>{{nom_chirurgien}}</strong>. Patient : <strong>{{nom_patient}}</strong>.</p><h2>Intervention prévue le {{date_intervention}}</h2><p>Articulation : {{articulation_concernee}}</p><p>Geste chirurgical : {{geste_chirurgical}}</p><h2>Information et consentement</h2><p>Le patient a été informé des bénéfices attendus de l'arthroscopie, des risques opératoires (infection, phlébite, complications anesthésiques), des suites opératoires et du programme de rééducation post-opératoire.</p><h2>Consentement</h2><p>J'accepte librement cette intervention chirurgicale.</p><p>Signature du patient :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_proprioception',
    name: "Accord de service de plateforme de stabilité et proprioception",
    category: 'sante', price: 2500, priceMax: 7000,
    description: "Accord de programme de rééducation proprioceptive par plateforme de stabilité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_kine',label:"Nom du kinésithérapeute",type:'text',required:true},
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'indication',label:"Indication clinique",type:'text',required:true},
      {key:'programme_proprioception',label:"Programme proprioceptif",type:'textarea',required:true},
      {key:'nombre_seances',label:"Nombre de séances",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PLATEFORME DE STABILITÉ ET PROPRIOCEPTION</h1><p>Entre le kinésithérapeute <strong>{{nom_kine}}</strong> et le sportif <strong>{{nom_sportif}}</strong>,</p><h2>Indication</h2><p>{{indication}}</p><h2>Programme proprioceptif</h2><p>{{programme_proprioception}}</p><h2>Nombre de séances</h2><p>{{nombre_seances}} séances programmées.</p><h2>Objectifs</h2><p>Améliorer la stabilité articulaire, réduire le risque de récidive de blessure et optimiser le contrôle neuromusculaire pour la performance sportive.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_recuperation_sportive',
    name: "Accord de service de récupération sportive (bain froid, compression)",
    category: 'sante', price: 2500, priceMax: 7000,
    description: "Accord de programme de récupération sportive post-effort.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_structure',label:"Nom de la structure de récupération",type:'text',required:true},
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'methodes_recuperation',label:"Méthodes de récupération utilisées",type:'textarea',required:true},
      {key:'frequence',label:"Fréquence des sessions",type:'text',required:true},
      {key:'tarif_session',label:"Tarif par session (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RÉCUPÉRATION SPORTIVE</h1><p>Entre la structure <strong>{{nom_structure}}</strong> et le sportif <strong>{{nom_sportif}}</strong>,</p><h2>Méthodes de récupération</h2><p>{{methodes_recuperation}}</p><h2>Modalités</h2><p>Fréquence : {{frequence}}. Tarif : {{tarif_session}} FCFA par session.</p><h2>Contre-indications</h2><p>Le sportif déclare ne présenter aucune contre-indication aux méthodes de récupération proposées (blessures cutanées ouvertes, troubles cardiovasculaires sévères pour le bain froid).</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_suivi_jeune_sportif',
    name: "Accord de service de suivi médical jeune sportif (académie)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Accord de suivi médical complet pour jeunes sportifs en académie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_academie',label:"Nom de l'académie sportive",type:'text',required:true},
      {key:'nom_medecin',label:"Nom du médecin du sport",type:'text',required:true},
      {key:'nom_sportif',label:"Nom du jeune sportif",type:'text',required:true},
      {key:'nom_parent',label:"Nom du parent ou tuteur légal",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance du jeune sportif",type:'date',required:true},
      {key:'programme_suivi',label:"Programme de suivi médical",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SUIVI MÉDICAL — JEUNE SPORTIF EN ACADÉMIE</h1><p>Entre l'académie sportive <strong>{{nom_academie}}</strong>, le médecin <strong>{{nom_medecin}}</strong>, et le parent/tuteur légal <strong>{{nom_parent}}</strong> du jeune sportif <strong>{{nom_sportif}}</strong>, né(e) le {{date_naissance}},</p><h2>Programme de suivi médical</h2><p>{{programme_suivi}}</p><h2>Engagement tripartite</h2><p>L'académie garantit l'accès au suivi médical. Le médecin assure la confidentialité médicale tout en informant les parents de tout problème de santé significatif. Le parent autorise les soins d'urgence et les examens complémentaires nécessaires.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_partenariat_federation',
    name: "Accord de partenariat fédération sportive-service médical",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Accord de partenariat entre une fédération sportive et un service médical du sport.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_federation',label:"Nom de la fédération sportive",type:'text',required:true},
      {key:'nom_service_medical',label:"Nom du service médical partenaire",type:'text',required:true},
      {key:'prestations_incluses',label:"Prestations médicales incluses",type:'textarea',required:true},
      {key:'conditions_financieres',label:"Conditions financières",type:'textarea',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT — FÉDÉRATION SPORTIVE ET SERVICE MÉDICAL</h1><p>Entre la fédération sportive <strong>{{nom_federation}}</strong> et le service médical <strong>{{nom_service_medical}}</strong>,</p><h2>Prestations médicales</h2><p>{{prestations_incluses}}</p><h2>Conditions financières</h2><p>{{conditions_financieres}}</p><h2>Durée</h2><p>Le présent accord est conclu pour {{duree_partenariat}}, renouvelable par accord express des deux parties.</p><h2>Gouvernance</h2><p>Un comité de suivi médico-sportif se réunira trimestriellement pour évaluer la mise en oeuvre du partenariat.</p><p>Signatures des représentants légaux :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_medecine_preventive',
    name: "Accord de service de médecine préventive sportive",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Accord de programme de médecine préventive pour la santé des sportifs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_medecin',label:"Nom du médecin du sport",type:'text',required:true},
      {key:'nom_structure',label:"Nom du club ou structure sportive",type:'text',required:true},
      {key:'actions_preventives',label:"Actions préventives planifiées",type:'textarea',required:true},
      {key:'calendrier',label:"Calendrier annuel des actions",type:'textarea',required:true},
      {key:'budget_annuel',label:"Budget annuel alloué (FCFA)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — MÉDECINE PRÉVENTIVE SPORTIVE</h1><p>Entre le médecin du sport <strong>{{nom_medecin}}</strong> et la structure sportive <strong>{{nom_structure}}</strong>,</p><h2>Actions préventives planifiées</h2><p>{{actions_preventives}}</p><h2>Calendrier annuel</h2><p>{{calendrier}}</p><h2>Budget</h2><p>Budget annuel alloué : {{budget_annuel}} FCFA.</p><h2>Objectif général</h2><p>Réduire l'incidence des blessures, dépister précocement les pathologies liées au sport et promouvoir la santé globale des sportifs au sein de la structure.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_rapport_saison',
    name: "Rapport de suivi médical saison sportive",
    category: 'sante', price: 3000, priceMax: 8000,
    description: "Rapport de bilan médical de fin de saison sportive.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_medecin',label:"Nom du médecin du sport",type:'text',required:true},
      {key:'nom_equipe',label:"Nom de l'équipe",type:'text',required:true},
      {key:'saison',label:"Saison sportive (ex: 2024-2025)",type:'text',required:true},
      {key:'bilan_blessures',label:"Bilan des blessures de la saison",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations médicales pour la prochaine saison",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SUIVI MÉDICAL — SAISON SPORTIVE {{saison}}</h1><p>Médecin référent : Dr <strong>{{nom_medecin}}</strong>. Équipe : <strong>{{nom_equipe}}</strong>.</p><h2>Bilan des blessures de la saison</h2><p>{{bilan_blessures}}</p><h2>Recommandations pour la prochaine saison</h2><p>{{recommandations}}</p><h2>Conclusion</h2><p>Ce rapport constitue le bilan médical officiel de la saison {{saison}}. Il sera conservé dans les archives médicales de l'équipe et servira de référence pour le suivi longitudinal de la santé des sportifs.</p><p>Signature du médecin :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_plan_sante_performance',
    name: "Plan de santé et performance sportive",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Document stratégique de planification de la santé et de la performance sportive.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_sportif',label:"Nom complet du sportif",type:'text',required:true},
      {key:'sport_niveau',label:"Sport et niveau de pratique",type:'text',required:true},
      {key:'objectifs_saison',label:"Objectifs de la saison",type:'textarea',required:true},
      {key:'plan_medical',label:"Plan médical et préventif",type:'textarea',required:true},
      {key:'plan_nutrition_recuperation',label:"Plan nutrition et récupération",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE SANTÉ ET PERFORMANCE SPORTIVE</h1><p>Sportif : <strong>{{nom_sportif}}</strong> — {{sport_niveau}}</p><h2>Objectifs de la saison</h2><p>{{objectifs_saison}}</p><h2>Plan médical et préventif</h2><p>{{plan_medical}}</p><h2>Plan nutrition et récupération</h2><p>{{plan_nutrition_recuperation}}</p><h2>Révision</h2><p>Ce plan sera révisé mensuellement et adapté en fonction des résultats obtenus et de l'état de santé du sportif. Toute modification majeure fera l'objet d'un avenant signé.</p><p>Signatures (sportif, médecin, entraîneur) :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_formation_psc1',
    name: "Accord de service de formation premiers secours sport (PSC1)",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Accord de formation aux premiers secours adapté au milieu sportif (PSC1 sport).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_formateur',label:"Nom de l'organisme formateur",type:'text',required:true},
      {key:'nom_structure',label:"Nom du club ou fédération",type:'text',required:true},
      {key:'nombre_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true},
      {key:'cout_formation',label:"Coût total de la formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — FORMATION PREMIERS SECOURS SPORT (PSC1)</h1><p>Entre l'organisme formateur <strong>{{nom_formateur}}</strong> et la structure sportive <strong>{{nom_structure}}</strong>,</p><h2>Formation prévue le {{date_formation}}</h2><p>Nombre de participants : {{nombre_participants}}.</p><h2>Programme de formation</h2><p>La formation PSC1 adaptée au sport comprend : gestes de premiers secours, reconnaissances des urgences sportives (arrêt cardiaque, fracture, traumatisme crânien), utilisation du défibrillateur automatique externe (DAE).</p><h2>Coût</h2><p>{{cout_formation}} FCFA au total, attestation PSC1 délivrée à chaque participant.</p><p>Signatures :</p><p>Date :</p></div>`
  },
  {
    code: 'med2_charte_sante_afrique',
    name: "Charte de la santé du sportif en Afrique",
    category: 'sante', price: 2000, priceMax: 6000,
    description: "Charte engageant les acteurs du sport africain en faveur de la santé des sportifs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_signataire',label:"Nom du signataire (fédération, club, institution)",type:'text',required:true},
      {key:'representant_legal',label:"Nom du représentant légal",type:'text',required:true},
      {key:'pays',label:"Pays",type:'text',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA SANTÉ DU SPORTIF EN AFRIQUE</h1><p>L'organisation <strong>{{nom_signataire}}</strong>, représentée par <strong>{{representant_legal}}</strong>, basée en <strong>{{pays}}</strong>, adopte la présente charte le {{date_signature}}.</p><h2>Préambule</h2><p>Convaincus que la santé est le premier capital du sportif et que le développement du sport africain nécessite un haut niveau de protection médicale des athlètes,</p><h2>Article 1 — Droit à la santé du sportif</h2><p>Tout sportif a droit à un suivi médical adapté à sa pratique, quels que soient son niveau et sa discipline.</p><h2>Article 2 — Protection contre le dopage</h2><p>Le signataire s'engage à lutter activement contre le dopage et à promouvoir le sport propre.</p><h2>Article 3 — Accès aux soins</h2><p>Le signataire s'engage à faciliter l'accès de ses sportifs aux soins médicaux, notamment la médecine du sport.</p><h2>Article 4 — Formation des encadrants</h2><p>Les entraîneurs et dirigeants seront formés aux premiers secours et à la prévention des blessures.</p><h2>Article 5 — Respect de l'intégrité physique</h2><p>Aucun sportif ne sera contraint de pratiquer malgré une blessure ou contre avis médical.</p><p>Signature et cachet :</p><p>Date :</p></div>`
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
  console.log(`Batch 76b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
