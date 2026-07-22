import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ──────────── PSY2 : Santé mentale / Psychologie (25) ────────────
  {
    code: 'psy2_psychotherapie_individuelle', name: "Contrat de psychothérapie individuelle", category: 'sante', price: 4000, priceMax: 12000,
    description: "Contrat encadrant la relation thérapeutique individuelle entre un psychothérapeute et son patient, incluant objectifs, fréquence des séances et modalités de paiement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom complet du patient",type:'text',required:true},
      {key:'therapeute_nom',label:"Nom du psychothérapeute",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la thérapie",type:'date',required:true},
      {key:'frequence_seances',label:"Fréquence des séances (ex: hebdomadaire)",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true},
      {key:'objectifs',label:"Objectifs thérapeutiques convenus",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PSYCHOTHÉRAPIE INDIVIDUELLE</h1><p>Entre le psychothérapeute <strong>{{therapeute_nom}}</strong> et le patient <strong>{{patient_nom}}</strong>, il est convenu ce qui suit :</p><h2>1. OBJET</h2><p>Le présent contrat définit le cadre de la prise en charge psychothérapeutique individuelle débutant le {{date_debut}}.</p><h2>2. MODALITÉS DES SÉANCES</h2><p>Les séances se tiennent à une fréquence {{frequence_seances}}, au tarif de {{tarif_seance}} FCFA par séance.</p><h2>3. OBJECTIFS THÉRAPEUTIQUES</h2><p>{{objectifs}}</p><h2>4. CONFIDENTIALITÉ</h2><p>Le thérapeute est soumis au secret professionnel conformément au code de déontologie des psychologues.</p><h2>5. RÉSILIATION</h2><p>Chaque partie peut mettre fin au contrat avec un préavis de deux séances.</p><p>Fait à Abidjan, le {{date_debut}}</p><p>Le patient : ______________________ Le thérapeute : ______________________</p></div>`
  },
  {
    code: 'psy2_psychotherapie_couple', name: "Contrat de psychothérapie de couple", category: 'sante', price: 5000, priceMax: 14000,
    description: "Contrat de thérapie de couple précisant le cadre d'intervention, les règles de confidentialité partagée et les engagements mutuels des deux partenaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'partenaire1_nom',label:"Nom du partenaire 1",type:'text',required:true},
      {key:'partenaire2_nom',label:"Nom du partenaire 2",type:'text',required:true},
      {key:'therapeute_nom',label:"Nom du thérapeute de couple",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'problematique',label:"Problématique principale à travailler",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PSYCHOTHÉRAPIE DE COUPLE</h1><p>Entre <strong>{{partenaire1_nom}}</strong> et <strong>{{partenaire2_nom}}</strong> (ci-après "les partenaires") et le thérapeute <strong>{{therapeute_nom}}</strong> :</p><h2>1. CADRE THÉRAPEUTIQUE</h2><p>La thérapie de couple débute le {{date_debut}} et vise à améliorer la communication et la relation du couple.</p><h2>2. PROBLÉMATIQUE</h2><p>{{problematique}}</p><h2>3. RÈGLES DE CONFIDENTIALITÉ</h2><p>Les séances conjointes sont soumises à une confidentialité partagée. Le thérapeute ne peut être consulté individuellement par l'un des partenaires sans accord mutuel.</p><h2>4. ENGAGEMENTS</h2><p>Les deux partenaires s'engagent à participer activement et de bonne foi aux séances.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'psy2_therapie_familiale', name: "Contrat de thérapie familiale systémique", category: 'sante', price: 5000, priceMax: 15000,
    description: "Contrat de thérapie familiale systémique incluant tous les membres concernés, définissant les règles de participation et la démarche systémique du thérapeute.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'famille_nom',label:"Nom de la famille",type:'text',required:true},
      {key:'membres_participants',label:"Membres participants (liste)",type:'textarea',required:true},
      {key:'therapeute_nom',label:"Thérapeute systémicien",type:'text',required:true},
      {key:'date_debut',label:"Date de la première séance",type:'date',required:true},
      {key:'motif_consultation',label:"Motif de consultation familiale",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE THÉRAPIE FAMILIALE SYSTÉMIQUE</h1><p>Famille <strong>{{famille_nom}}</strong> — Thérapeute : <strong>{{therapeute_nom}}</strong></p><h2>1. PARTICIPANTS</h2><p>{{membres_participants}}</p><h2>2. MOTIF DE CONSULTATION</h2><p>{{motif_consultation}}</p><h2>3. APPROCHE SYSTÉMIQUE</h2><p>Le thérapeute adopte une approche systémique, considérant la famille comme un système dont les interactions influencent chaque membre.</p><h2>4. RÈGLES DU CADRE</h2><p>Toute information partagée en séance reste confidentielle. Les séances se tiennent à partir du {{date_debut}}.</p><p>Signatures des représentants légaux : ______________________</p></div>`
  },
  {
    code: 'psy2_psychiatrie_liberale', name: "Accord de service de psychiatrie libérale", category: 'sante', price: 6000, priceMax: 16000,
    description: "Accord de service entre un psychiatre en exercice libéral et son patient, précisant le cadre des consultations, la prescription médicamenteuse et le suivi.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'psychiatre_nom',label:"Nom du psychiatre",type:'text',required:true},
      {key:'numero_ordre',label:"Numéro d'ordre médical",type:'text',required:true},
      {key:'date_consultation',label:"Date de la première consultation",type:'date',required:true},
      {key:'motif',label:"Motif de consultation psychiatrique",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PSYCHIATRIE LIBÉRALE</h1><p>Dr <strong>{{psychiatre_nom}}</strong> (N° Ordre : {{numero_ordre}}) et <strong>{{patient_nom}}</strong></p><h2>1. CADRE DE LA CONSULTATION</h2><p>La première consultation a lieu le {{date_consultation}}. Le Dr {{psychiatre_nom}} assure des consultations de psychiatrie adulte en cabinet libéral.</p><h2>2. MOTIF</h2><p>{{motif}}</p><h2>3. PRESCRIPTION ET SUIVI</h2><p>Toute prescription médicamenteuse sera expliquée au patient. Le suivi est assuré selon la fréquence déterminée en consultation.</p><h2>4. URGENCES</h2><p>En cas d'urgence psychiatrique, le patient est orienté vers les structures hospitalières compétentes.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'psy2_consentement_traitement_volontaire', name: "Consentement de traitement psychiatrique volontaire", category: 'sante', price: 3000, priceMax: 8000,
    description: "Formulaire de consentement éclairé pour la prise en charge psychiatrique volontaire, attestant que le patient accepte librement les soins proposés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom et prénom du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'etablissement',label:"Établissement de soins",type:'text',required:true},
      {key:'traitement_propose',label:"Traitement ou soins proposés",type:'textarea',required:true},
      {key:'date_consentement',label:"Date du consentement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT DE TRAITEMENT PSYCHIATRIQUE VOLONTAIRE</h1><p>Je soussigné(e) <strong>{{patient_nom}}</strong>, né(e) le {{date_naissance}}, reconnais avoir reçu une information claire sur ma situation de santé mentale et consens librement au traitement suivant proposé par <strong>{{etablissement}}</strong> :</p><h2>Traitement accepté</h2><p>{{traitement_propose}}</p><h2>Droits du patient</h2><p>Je reconnais avoir été informé(e) de mon droit de retirer ce consentement à tout moment sans préjudice pour ma prise en charge.</p><p>Fait le {{date_consentement}} — Signature : ______________________</p></div>`
  },
  {
    code: 'psy2_consentement_hospitalisation_contrainte', name: "Consentement d'hospitalisation psychiatrique sous contrainte", category: 'sante', price: 4000, priceMax: 10000,
    description: "Document officiel encadrant l'hospitalisation psychiatrique sans consentement, avec mention des voies de recours et notification à la famille.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'medecin_certificateur',label:"Médecin ayant établi le certificat",type:'text',required:true},
      {key:'etablissement',label:"Établissement d'accueil",type:'text',required:true},
      {key:'date_hospitalisation',label:"Date d'hospitalisation",type:'date',required:true},
      {key:'motif_medical',label:"Motif médical (résumé)",type:'textarea',required:true},
      {key:'contact_famille',label:"Contact du représentant légal ou famille",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>HOSPITALISATION PSYCHIATRIQUE SOUS CONTRAINTE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Établissement : <strong>{{etablissement}}</strong></p><h2>1. CERTIFICAT MÉDICAL</h2><p>Le Dr <strong>{{medecin_certificateur}}</strong> certifie que l'état de santé mentale du patient nécessite une hospitalisation à compter du {{date_hospitalisation}}.</p><h2>2. MOTIF MÉDICAL</h2><p>{{motif_medical}}</p><h2>3. NOTIFICATION</h2><p>La famille ({{contact_famille}}) est informée de cette mesure dans les 24 heures.</p><h2>4. VOIES DE RECOURS</h2><p>Le patient peut saisir le tribunal compétent pour contester cette mesure à tout moment.</p><p>Signature du médecin : ______________________</p></div>`
  },
  {
    code: 'psy2_plan_soins_psychiatriques', name: "Plan de soins psychiatriques (PPS)", category: 'sante', price: 4000, priceMax: 10000,
    description: "Plan de soins psychiatriques individualisé définissant les objectifs de soins, les interventions prévues et les indicateurs de progression du patient.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'diagnostic',label:"Diagnostic psychiatrique retenu",type:'text',required:true},
      {key:'responsable_soins',label:"Médecin responsable du plan",type:'text',required:true},
      {key:'date_elaboration',label:"Date d'élaboration du PPS",type:'date',required:true},
      {key:'interventions',label:"Interventions thérapeutiques prévues",type:'textarea',required:true},
      {key:'objectifs_soins',label:"Objectifs de soins à 3 mois",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE SOINS PSYCHIATRIQUES INDIVIDUALISÉ</h1><p>Patient : <strong>{{patient_nom}}</strong> — Responsable : Dr <strong>{{responsable_soins}}</strong></p><h2>1. DIAGNOSTIC</h2><p>{{diagnostic}}</p><h2>2. INTERVENTIONS THÉRAPEUTIQUES</h2><p>{{interventions}}</p><h2>3. OBJECTIFS À 3 MOIS</h2><p>{{objectifs_soins}}</p><h2>4. RÉVISION</h2><p>Ce plan est révisé tous les 3 mois ou en cas d'évolution clinique significative. Élaboré le {{date_elaboration}}.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'psy2_suivi_post_hospitalisation', name: "Accord de service de suivi post-hospitalisation psychiatrique", category: 'sante', price: 3500, priceMax: 9000,
    description: "Accord de suivi ambulatoire après une hospitalisation psychiatrique, définissant le programme de soins de suite et les modalités de coordination entre professionnels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'date_sortie',label:"Date de sortie d'hospitalisation",type:'date',required:true},
      {key:'psychiatre_referent',label:"Psychiatre référent ambulatoire",type:'text',required:true},
      {key:'programme_suivi',label:"Programme de suivi prévu",type:'textarea',required:true},
      {key:'contacts_urgence',label:"Contacts en cas de crise",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SUIVI POST-HOSPITALISATION PSYCHIATRIQUE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Sortie le {{date_sortie}}</p><h2>1. PSYCHIATRE RÉFÉRENT</h2><p>Dr <strong>{{psychiatre_referent}}</strong> assure le suivi ambulatoire.</p><h2>2. PROGRAMME DE SUIVI</h2><p>{{programme_suivi}}</p><h2>3. GESTION DES CRISES</h2><p>En cas de crise, contacter : {{contacts_urgence}}</p><h2>4. ENGAGEMENT</h2><p>Le patient s'engage à respecter les rendez-vous et à ne pas interrompre le traitement sans avis médical.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'psy2_rehabilitation_psychosociale', name: "Accord de service de réhabilitation psychosociale", category: 'sante', price: 4000, priceMax: 11000,
    description: "Accord de programme de réhabilitation psychosociale visant à restaurer les compétences sociales, professionnelles et autonomes du patient atteint de troubles psychiatriques chroniques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'centre_rehabilitation',label:"Centre de réhabilitation",type:'text',required:true},
      {key:'date_debut',label:"Date de début du programme",type:'date',required:true},
      {key:'axes_travail',label:"Axes de travail (social, professionnel, autonomie)",type:'textarea',required:true},
      {key:'duree_programme',label:"Durée estimée du programme",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉHABILITATION PSYCHOSOCIALE</h1><p>Bénéficiaire : <strong>{{patient_nom}}</strong> — Centre : <strong>{{centre_rehabilitation}}</strong></p><h2>1. OBJECTIF</h2><p>Ce programme vise la réinsertion sociale et professionnelle du bénéficiaire sur une durée de {{duree_programme}}, débutant le {{date_debut}}.</p><h2>2. AXES DE TRAVAIL</h2><p>{{axes_travail}}</p><h2>3. MÉTHODES</h2><p>Ateliers de compétences sociales, accompagnement à l'emploi, entraînement aux activités de la vie quotidienne.</p><h2>4. ÉVALUATION</h2><p>Une évaluation mensuelle des progrès est réalisée conjointement avec le bénéficiaire.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'psy2_csmc', name: "Accord de service de Centre de Santé Mentale Communautaire", category: 'sante', price: 3000, priceMax: 8000,
    description: "Accord de prise en charge au sein d'un Centre de Santé Mentale Communautaire (CSMC), définissant les services offerts à la communauté et les engagements du bénéficiaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'beneficiaire_nom',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'csmc_nom',label:"Nom du Centre de Santé Mentale Communautaire",type:'text',required:true},
      {key:'date_inscription',label:"Date d'inscription",type:'date',required:true},
      {key:'services_choisis',label:"Services choisis (consultation, groupes, ateliers)",type:'textarea',required:true},
      {key:'referent_communautaire',label:"Référent communautaire assigné",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — CENTRE DE SANTÉ MENTALE COMMUNAUTAIRE</h1><p>Bénéficiaire : <strong>{{beneficiaire_nom}}</strong> — CSMC : <strong>{{csmc_nom}}</strong></p><h2>1. INSCRIPTION</h2><p>Le bénéficiaire est inscrit au CSMC à compter du {{date_inscription}}.</p><h2>2. SERVICES SOUSCRITS</h2><p>{{services_choisis}}</p><h2>3. RÉFÉRENT</h2><p>Référent communautaire : <strong>{{referent_communautaire}}</strong></p><h2>4. GRATUITÉ ET ACCESSIBILITÉ</h2><p>Les services communautaires sont fournis dans le respect de la dignité de chaque personne et selon les ressources disponibles du centre.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'psy2_prevention_suicide', name: "Accord de service de prévention du suicide (ligne d'écoute)", category: 'sante', price: 2000, priceMax: 6000,
    description: "Accord de service pour une ligne d'écoute et de prévention du suicide, précisant les engagements des écoutants, la charte d'intervention et les protocoles de crise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'organisme_nom',label:"Nom de l'organisme gestionnaire",type:'text',required:true},
      {key:'nom_ligne',label:"Nom de la ligne d'écoute",type:'text',required:true},
      {key:'ecoutant_nom',label:"Nom de l'écoutant volontaire ou professionnel",type:'text',required:true},
      {key:'date_engagement',label:"Date d'entrée en fonction",type:'date',required:true},
      {key:'protocole_crise',label:"Protocole d'intervention en situation de crise",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PRÉVENTION DU SUICIDE (LIGNE D'ÉCOUTE)</h1><p>Organisme : <strong>{{organisme_nom}}</strong> — Ligne : <strong>{{nom_ligne}}</strong></p><h2>1. ENGAGEMENT DE L'ÉCOUTANT</h2><p><strong>{{ecoutant_nom}}</strong>, à compter du {{date_engagement}}, s'engage à répondre avec empathie, sans jugement, en respectant la charte de la ligne.</p><h2>2. PROTOCOLE DE CRISE</h2><p>{{protocole_crise}}</p><h2>3. CONFIDENTIALITÉ</h2><p>Toutes les conversations sont strictement confidentielles. Seul un risque immédiat pour la vie autorise l'alerte des secours.</p><h2>4. SUPERVISION</h2><p>Les écoutants bénéficient d'une supervision psychologique régulière.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'psy2_traitement_dependances', name: "Accord de service de traitement des dépendances (alcool, drogue)", category: 'sante', price: 5000, priceMax: 14000,
    description: "Accord de prise en charge addictologique pour les dépendances à l'alcool et aux drogues, incluant le programme de sevrage, la thérapie motivationnelle et le suivi.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'addictologue_nom',label:"Nom de l'addictologue",type:'text',required:true},
      {key:'substance_concernee',label:"Substance(s) concernée(s)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de prise en charge",type:'date',required:true},
      {key:'programme_sevrage',label:"Programme de sevrage et thérapie prévu",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — TRAITEMENT DES DÉPENDANCES</h1><p>Patient : <strong>{{patient_nom}}</strong> — Addictologue : <strong>{{addictologue_nom}}</strong></p><h2>1. SUBSTANCE CONCERNÉE</h2><p>{{substance_concernee}}</p><h2>2. PROGRAMME</h2><p>{{programme_sevrage}}</p><h2>3. ENGAGEMENT DU PATIENT</h2><p>Le patient s'engage à suivre le programme à compter du {{date_debut}}, à informer le thérapeute de toute rechute et à participer aux groupes de soutien.</p><h2>4. SUIVI</h2><p>Des bilans biologiques et psychologiques sont réalisés régulièrement pour évaluer la progression.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'psy2_tcc', name: "Accord de service de thérapie cognitivo-comportementale (TCC)", category: 'sante', price: 4000, priceMax: 11000,
    description: "Accord de service pour une prise en charge en Thérapie Cognitivo-Comportementale (TCC), précisant le protocole structuré, les exercices entre séances et les objectifs mesurables.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'therapeute_nom',label:"Thérapeute TCC",type:'text',required:true},
      {key:'trouble_cible',label:"Trouble psychologique ciblé (ex: anxiété, dépression)",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'date_debut',label:"Date de la première séance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — THÉRAPIE COGNITIVO-COMPORTEMENTALE (TCC)</h1><p>Patient : <strong>{{patient_nom}}</strong> — Thérapeute TCC : <strong>{{therapeute_nom}}</strong></p><h2>1. TROUBLE CIBLÉ</h2><p>{{trouble_cible}}</p><h2>2. PROTOCOLE</h2><p>La TCC est une approche structurée sur {{nombre_seances}} séances, débutant le {{date_debut}}, visant à identifier et modifier les pensées et comportements dysfonctionnels.</p><h2>3. TRAVAIL INTER-SÉANCES</h2><p>Le patient s'engage à réaliser les exercices assignés entre les séances (journaux de pensées, expositions graduées, etc.).</p><h2>4. MESURE DES PROGRÈS</h2><p>Des échelles standardisées (Beck, HAD, etc.) sont utilisées à chaque séance pour mesurer la progression.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'psy2_emdr', name: "Accord de service de EMDR (trauma)", category: 'sante', price: 5000, priceMax: 14000,
    description: "Accord de service pour une thérapie EMDR (Eye Movement Desensitization and Reprocessing) destinée au traitement des traumatismes psychologiques, avec protocole d'évaluation et de stabilisation préalable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'therapeute_nom',label:"Thérapeute EMDR certifié",type:'text',required:true},
      {key:'evenement_traumatique',label:"Nature du traumatisme (résumé)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début du protocole EMDR",type:'date',required:true},
      {key:'phase_stabilisation',label:"Phase de stabilisation prévue avant traitement",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — EMDR (DÉSENSIBILISATION ET RETRAITEMENT PAR LES MOUVEMENTS OCULAIRES)</h1><p>Patient : <strong>{{patient_nom}}</strong> — Thérapeute EMDR : <strong>{{therapeute_nom}}</strong></p><h2>1. TRAUMATISME CIBLE</h2><p>{{evenement_traumatique}}</p><h2>2. PROTOCOLE</h2><p>La thérapie EMDR suit un protocole standardisé en 8 phases, débutant le {{date_debut}}. Une phase de stabilisation est assurée préalablement : {{phase_stabilisation}}.</p><h2>3. EFFETS POSSIBLES</h2><p>Le patient est informé que des émotions intenses peuvent survenir lors du retraitement traumatique. Un plan de sécurité est établi conjointement.</p><h2>4. CONSENTEMENT</h2><p>Le patient consent librement à cette approche thérapeutique.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'psy2_hypnotherapie', name: "Accord de service d'hypnothérapie clinique", category: 'sante', price: 4000, priceMax: 10000,
    description: "Accord de service pour des séances d'hypnothérapie clinique, avec explications sur l'état hypnotique, les contre-indications et les applications thérapeutiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'hypnotherapeute_nom',label:"Hypnothérapeute clinicien",type:'text',required:true},
      {key:'objectif_therapeutique',label:"Objectif thérapeutique visé",type:'text',required:true},
      {key:'date_debut',label:"Date de la première séance",type:'date',required:true},
      {key:'contre_indications',label:"Contre-indications connues",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — HYPNOTHÉRAPIE CLINIQUE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Praticien : <strong>{{hypnotherapeute_nom}}</strong></p><h2>1. OBJECTIF</h2><p>{{objectif_therapeutique}}</p><h2>2. NATURE DE L'HYPNOSE</h2><p>L'hypnose clinique est un état de focalisation attentionnelle naturel. Le patient conserve le contrôle de ses pensées et actions à tout moment.</p><h2>3. CONTRE-INDICATIONS</h2><p>{{contre_indications}}</p><h2>4. DÉROULEMENT</h2><p>Les séances débutent le {{date_debut}}. Chaque séance dure environ 60 minutes et inclut une induction, le travail thérapeutique et un retour progressif.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'psy2_sophrologie', name: "Accord de service de sophrologie", category: 'sante', price: 3000, priceMax: 8000,
    description: "Accord de service pour un accompagnement en sophrologie, méthode de relaxation dynamique visant le bien-être global par la respiration, la décontraction musculaire et la visualisation positive.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'beneficiaire_nom',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'sophrologue_nom',label:"Sophrologue praticien",type:'text',required:true},
      {key:'objectif',label:"Objectif (stress, sommeil, confiance, etc.)",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'date_debut',label:"Date de la première séance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — SOPHROLOGIE</h1><p>Bénéficiaire : <strong>{{beneficiaire_nom}}</strong> — Sophrologue : <strong>{{sophrologue_nom}}</strong></p><h2>1. OBJECTIF DE L'ACCOMPAGNEMENT</h2><p>{{objectif}}</p><h2>2. PROGRAMME</h2><p>{{nombre_seances}} séances de sophrologie débutant le {{date_debut}}, combinant respiration abdominale, relaxation musculaire progressive et visualisation positive.</p><h2>3. PRATIQUE AUTONOME</h2><p>Le bénéficiaire est encouragé à pratiquer les exercices appris entre les séances pour en maximiser les bénéfices.</p><h2>4. LIMITES</h2><p>La sophrologie est une méthode complémentaire et ne remplace pas un traitement médical ou psychothérapeutique.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'psy2_mediation_familiale', name: "Accord de service de médiation familiale", category: 'sante', price: 4000, priceMax: 11000,
    description: "Accord de médiation familiale structuré permettant à des membres d'une même famille de résoudre leurs conflits avec l'aide d'un médiateur professionnel neutre.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'mediateur_nom',label:"Nom du médiateur familial",type:'text',required:true},
      {key:'parties',label:"Parties en médiation (noms)",type:'textarea',required:true},
      {key:'objet_litige',label:"Objet du litige familial",type:'textarea',required:true},
      {key:'date_premiere_seance',label:"Date de la première séance de médiation",type:'date',required:true},
      {key:'duree_processus',label:"Durée estimée du processus",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — MÉDIATION FAMILIALE</h1><p>Médiateur : <strong>{{mediateur_nom}}</strong></p><h2>1. PARTIES</h2><p>{{parties}}</p><h2>2. OBJET</h2><p>{{objet_litige}}</p><h2>3. PRINCIPES</h2><p>La médiation familiale est volontaire, confidentielle et impartiale. Le médiateur ne prend pas de décision à la place des parties.</p><h2>4. DÉROULEMENT</h2><p>Première séance le {{date_premiere_seance}}. Durée estimée : {{duree_processus}}. Les accords trouvés peuvent être soumis à homologation judiciaire.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'psy2_accompagnement_deuil', name: "Accord de service d'accompagnement deuil", category: 'sante', price: 3500, priceMax: 9000,
    description: "Accord d'accompagnement psychologique au deuil, précisant le cadre thérapeutique bienveillant et les étapes du processus de deuil selon les cultures africaines et les pratiques cliniques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'endeuille_nom',label:"Nom de la personne endeuillée",type:'text',required:true},
      {key:'accompagnateur_nom',label:"Accompagnateur psychologue",type:'text',required:true},
      {key:'perte_concernee',label:"Nature de la perte (ex: décès conjoint, parent)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de l'accompagnement",type:'date',required:true},
      {key:'approche',label:"Approche et modalités d'accompagnement",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — ACCOMPAGNEMENT AU DEUIL</h1><p>Personne endeuillée : <strong>{{endeuille_nom}}</strong> — Accompagnateur : <strong>{{accompagnateur_nom}}</strong></p><h2>1. CONTEXTE</h2><p>Accompagnement suite à : {{perte_concernee}}, débutant le {{date_debut}}.</p><h2>2. APPROCHE</h2><p>{{approche}}</p><h2>3. RESPECT CULTUREL</h2><p>L'accompagnement intègre les pratiques culturelles et spirituelles de la personne endeuillée, en respectant les rites et croyances de sa communauté.</p><h2>4. DURÉE</h2><p>L'accompagnement se poursuit aussi longtemps que nécessaire selon le rythme de la personne.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'psy2_psychologie_scolaire', name: "Accord de service de psychologie scolaire", category: 'sante', price: 3000, priceMax: 8000,
    description: "Accord d'intervention du psychologue scolaire pour le suivi d'un élève présentant des difficultés d'apprentissage, d'adaptation ou comportementales en milieu scolaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'eleve_nom',label:"Nom de l'élève",type:'text',required:true},
      {key:'etablissement',label:"Établissement scolaire",type:'text',required:true},
      {key:'psychologue_nom',label:"Psychologue scolaire",type:'text',required:true},
      {key:'motif_suivi',label:"Motif de suivi",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début d'intervention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PSYCHOLOGIE SCOLAIRE</h1><p>Élève : <strong>{{eleve_nom}}</strong> — École : <strong>{{etablissement}}</strong> — Psychologue : <strong>{{psychologue_nom}}</strong></p><h2>1. MOTIF DE SUIVI</h2><p>{{motif_suivi}}</p><h2>2. MODALITÉS D'INTERVENTION</h2><p>Le psychologue intervient à compter du {{date_debut}} via des entretiens individuels, des observations en classe et des rencontres avec l'équipe pédagogique et la famille.</p><h2>3. CONFIDENTIALITÉ</h2><p>Les informations recueillies sont soumises au secret professionnel. Seuls les éléments utiles à la scolarité de l'élève sont partagés avec l'équipe, avec accord des parents.</p><p>Signatures (parents/tuteur) : ______________________</p></div>`
  },
  {
    code: 'psy2_psychologie_travail', name: "Accord de service de psychologie du travail (burn-out)", category: 'sante', price: 5000, priceMax: 13000,
    description: "Accord d'accompagnement psychologique pour les travailleurs en situation d'épuisement professionnel (burn-out), incluant évaluation, plan de récupération et prévention des rechutes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'salarie_nom',label:"Nom du salarié",type:'text',required:true},
      {key:'entreprise',label:"Entreprise employeuse",type:'text',required:true},
      {key:'psychologue_nom',label:"Psychologue du travail",type:'text',required:true},
      {key:'date_debut',label:"Date de début de l'accompagnement",type:'date',required:true},
      {key:'symptomes',label:"Symptômes d'épuisement identifiés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PSYCHOLOGIE DU TRAVAIL (BURN-OUT)</h1><p>Salarié : <strong>{{salarie_nom}}</strong> — Entreprise : <strong>{{entreprise}}</strong> — Psychologue : <strong>{{psychologue_nom}}</strong></p><h2>1. DIAGNOSTIC FONCTIONNEL</h2><p>{{symptomes}}</p><h2>2. PLAN DE RÉCUPÉRATION</h2><p>Un plan individualisé est élaboré à compter du {{date_debut}}, incluant des séances de soutien psychologique, des recommandations d'aménagement de poste et un travail sur les facteurs de risque psychosocial.</p><h2>3. CONFIDENTIALITÉ VIS-À-VIS DE L'EMPLOYEUR</h2><p>Le contenu des séances est strictement confidentiel. Seul un document de préconisations générales, sans données cliniques, peut être transmis à l'employeur avec accord du salarié.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'psy2_neuropsychologie', name: "Accord de service de neuropsychologie (bilan cognitif)", category: 'sante', price: 6000, priceMax: 16000,
    description: "Accord de service pour un bilan neuropsychologique complet évaluant les fonctions cognitives (mémoire, attention, langage, fonctions exécutives) dans le cadre d'un trouble neurologique ou développemental.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'neuropsychologue_nom',label:"Neuropsychologue",type:'text',required:true},
      {key:'motif_bilan',label:"Motif du bilan cognitif",type:'textarea',required:true},
      {key:'date_bilan',label:"Date du bilan",type:'date',required:true},
      {key:'tests_prevus',label:"Batterie de tests prévue",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — BILAN NEUROPSYCHOLOGIQUE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Neuropsychologue : <strong>{{neuropsychologue_nom}}</strong></p><h2>1. MOTIF DU BILAN</h2><p>{{motif_bilan}}</p><h2>2. PROTOCOLE D'ÉVALUATION</h2><p>Le bilan se déroule le {{date_bilan}} et comprend : {{tests_prevus}}. Il évalue la mémoire, l'attention, le langage, les fonctions exécutives et les praxies.</p><h2>3. RESTITUTION</h2><p>Un rapport écrit et une séance de restitution orale sont prévus dans un délai de 15 jours ouvrables après le bilan.</p><h2>4. CONFIDENTIALITÉ</h2><p>Le rapport est remis uniquement au patient et, avec son accord, au médecin prescripteur.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'psy2_psychologie_sportive', name: "Accord de service de psychologie sportive", category: 'sante', price: 4000, priceMax: 11000,
    description: "Accord de service de psychologie du sport pour l'amélioration des performances mentales des athlètes, incluant gestion du stress compétitif, préparation mentale et récupération.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'athlete_nom',label:"Nom de l'athlète",type:'text',required:true},
      {key:'sport_pratique',label:"Sport pratiqué et niveau de compétition",type:'text',required:true},
      {key:'psychologue_nom',label:"Psychologue du sport",type:'text',required:true},
      {key:'date_debut',label:"Date de début du suivi",type:'date',required:true},
      {key:'objectifs_mentaux',label:"Objectifs de préparation mentale",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PSYCHOLOGIE DU SPORT</h1><p>Athlète : <strong>{{athlete_nom}}</strong> ({{sport_pratique}}) — Psychologue : <strong>{{psychologue_nom}}</strong></p><h2>1. OBJECTIFS MENTAUX</h2><p>{{objectifs_mentaux}}</p><h2>2. MÉTHODES</h2><p>Suivi débutant le {{date_debut}} incluant : gestion du stress compétitif, techniques de concentration, visualisation mentale, cohésion d'équipe et gestion des blessures psychologiques.</p><h2>3. CONFIDENTIALITÉ</h2><p>Les informations personnelles de l'athlète ne sont pas partagées avec l'encadrement sportif sans son consentement explicite.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'psy2_rapport_bilan_psy', name: "Rapport de bilan psychologique", category: 'sante', price: 5000, priceMax: 13000,
    description: "Rapport de bilan psychologique standardisé pour la Côte d'Ivoire, incluant anamnèse, résultats des tests, interprétation clinique et recommandations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'psychologue_nom',label:"Psychologue rédacteur",type:'text',required:true},
      {key:'date_bilan',label:"Date du bilan",type:'date',required:true},
      {key:'synthese_clinique',label:"Synthèse clinique (résultats et interprétation)",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE BILAN PSYCHOLOGIQUE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Psychologue : <strong>{{psychologue_nom}}</strong> — Date : {{date_bilan}}</p><h2>1. MOTIF DE L'ÉVALUATION</h2><p>Bilan réalisé à la demande du patient ou d'un prescripteur.</p><h2>2. SYNTHÈSE CLINIQUE</h2><p>{{synthese_clinique}}</p><h2>3. RECOMMANDATIONS</h2><p>{{recommandations}}</p><h2>4. AVERTISSEMENT</h2><p>Ce rapport est confidentiel et destiné au seul usage professionnel. Toute reproduction nécessite l'accord du psychologue et du patient.</p><p>Cachet et signature du psychologue : ______________________</p></div>`
  },
  {
    code: 'psy2_prevention_sante_mentale_entreprise', name: "Plan de prévention santé mentale entreprise", category: 'sante', price: 7000, priceMax: 18000,
    description: "Plan de prévention de la santé mentale en milieu professionnel, couvrant l'identification des risques psychosociaux, les mesures de prévention primaire, secondaire et tertiaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'responsable_rse',label:"Responsable RH ou RSE",type:'text',required:true},
      {key:'date_elaboration',label:"Date d'élaboration du plan",type:'date',required:true},
      {key:'risques_identifies',label:"Risques psychosociaux identifiés",type:'textarea',required:true},
      {key:'actions_prevention',label:"Actions de prévention et calendrier",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE PRÉVENTION SANTÉ MENTALE EN ENTREPRISE</h1><p>Entreprise : <strong>{{entreprise_nom}}</strong> — Responsable : <strong>{{responsable_rse}}</strong> — Élaboré le {{date_elaboration}}</p><h2>1. RISQUES PSYCHOSOCIAUX IDENTIFIÉS</h2><p>{{risques_identifies}}</p><h2>2. ACTIONS DE PRÉVENTION</h2><p>{{actions_prevention}}</p><h2>3. PRÉVENTION PRIMAIRE</h2><p>Formation des managers, amélioration des conditions de travail, révision de la charge de travail.</p><h2>4. PRÉVENTION SECONDAIRE</h2><p>Ateliers de gestion du stress, ligne d'écoute interne, accès facilité à la psychologie du travail.</h2><h2>5. PRÉVENTION TERTIAIRE</h2><p>Accompagnement personnalisé des salariés en souffrance, protocole de retour progressif après arrêt.</p><p>Signature de la direction : ______________________</p></div>`
  },
  {
    code: 'psy2_charte_deontologie', name: "Charte de confidentialité et déontologie du psychologue", category: 'sante', price: 2000, priceMax: 5000,
    description: "Charte déontologique remise aux patients précisant les obligations éthiques du psychologue : secret professionnel, neutralité bienveillante, formation continue et signalement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'psychologue_nom',label:"Nom du psychologue",type:'text',required:true},
      {key:'cabinet_adresse',label:"Adresse du cabinet",type:'text',required:true},
      {key:'numero_ordre',label:"Numéro d'inscription ou de titre",type:'text',required:false},
      {key:'date_edition',label:"Date d'édition de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE CONFIDENTIALITÉ ET DE DÉONTOLOGIE DU PSYCHOLOGUE</h1><p>Dr/Psy <strong>{{psychologue_nom}}</strong> — Cabinet : {{cabinet_adresse}} — N° : {{numero_ordre}}</p><h2>1. SECRET PROFESSIONNEL</h2><p>Toutes les informations partagées lors des séances sont couvertes par le secret professionnel, conformément aux lois en vigueur en Côte d'Ivoire.</p><h2>2. NEUTRALITÉ BIENVEILLANTE</h2><p>Le psychologue s'interdit tout jugement moral, toute discrimination et toute relation de nature autre que professionnelle avec ses patients.</h2><h2>3. FORMATION CONTINUE</h2><p>Le psychologue s'engage à maintenir ses compétences par une formation continue régulière et une supervision professionnelle.</p><h2>4. SIGNALEMENT</h2><p>En cas de danger grave et immédiat pour la vie du patient ou d'autrui, le psychologue peut lever le secret professionnel dans les limites prévues par la loi.</p><p>Édité le {{date_edition}} — Signature : ______________________</p></div>`
  },

  // ──────────── OPHT2 : Ophtalmologie / Dentisterie (25) ────────────
  {
    code: 'opht2_examen_ophtalmologique', name: "Consentement d'examen ophtalmologique complet", category: 'sante', price: 2500, priceMax: 7000,
    description: "Formulaire de consentement pour un examen ophtalmologique complet incluant mesure de l'acuité visuelle, fond d'œil avec mydriase et tonométrie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'ophtalmologue_nom',label:"Ophtalmologue",type:'text',required:true},
      {key:'date_examen',label:"Date de l'examen",type:'date',required:true},
      {key:'motif',label:"Motif de consultation",type:'text',required:true},
      {key:'antecedents_oculaires',label:"Antécédents oculaires connus",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT D'EXAMEN OPHTALMOLOGIQUE COMPLET</h1><p>Je soussigné(e) <strong>{{patient_nom}}</strong> consens à l'examen ophtalmologique complet réalisé par le Dr <strong>{{ophtalmologue_nom}}</strong> le {{date_examen}}.</p><h2>1. MOTIF</h2><p>{{motif}}</p><h2>2. NATURE DE L'EXAMEN</h2><p>L'examen comprend : mesure de l'acuité visuelle, réfraction, biomicroscopie, tonométrie et fond d'œil après instillation de collyres mydriatiques.</p><h2>3. EFFETS DES COLLYRES</h2><p>Les collyres dilatateurs provoquent une vision floue et une sensibilité à la lumière pendant 2 à 4 heures. La conduite automobile est déconseillée après l'examen.</p><h2>4. ANTÉCÉDENTS</h2><p>{{antecedents_oculaires}}</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_lasik', name: "Consentement de chirurgie réfractive (LASIK)", category: 'sante', price: 5000, priceMax: 14000,
    description: "Consentement éclairé pour la chirurgie réfractive LASIK, détaillant les bénéfices attendus, les risques opératoires, les suites post-opératoires et les alternatives.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'chirurgien_nom',label:"Chirurgien ophtalmologue",type:'text',required:true},
      {key:'oeil_opere',label:"Œil(s) à opérer (droit, gauche, les deux)",type:'text',required:true},
      {key:'date_intervention',label:"Date de l'intervention",type:'date',required:true},
      {key:'defaut_corrige',label:"Défaut visuel à corriger (myopie, astigmatisme, etc.)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT À LA CHIRURGIE RÉFRACTIVE LASIK</h1><p>Patient : <strong>{{patient_nom}}</strong> — Chirurgien : Dr <strong>{{chirurgien_nom}}</strong></p><h2>1. INTERVENTION</h2><p>Chirurgie LASIK sur {{oeil_opere}}, le {{date_intervention}}, pour corriger : {{defaut_corrige}}.</p><h2>2. BÉNÉFICES ATTENDUS</h2><p>Réduction ou suppression de la dépendance aux lunettes ou lentilles de contact.</p><h2>3. RISQUES</h2><p>Sécheresse oculaire transitoire, halos lumineux nocturnes, infection (rare), sous- ou sur-correction nécessitant une reprise.</p><h2>4. SUITES POST-OPÉRATOIRES</h2><p>Arrêt de travail conseillé 2 à 5 jours. Port de lunettes de soleil obligatoire. Contrôle à J1, J7 et J30.</p><h2>5. ALTERNATIVES</h2><p>Lunettes correctrices, lentilles de contact, PKR ou LASEK.</p><p>Je certifie avoir reçu une information complète. Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_cataracte', name: "Consentement d'opération de la cataracte", category: 'sante', price: 5000, priceMax: 14000,
    description: "Consentement éclairé pour l'extraction de la cataracte par phacoémulsification avec implant de cristallin artificiel, incluant risques et suites opératoires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'chirurgien_nom',label:"Chirurgien ophtalmologue",type:'text',required:true},
      {key:'oeil_opere',label:"Œil opéré",type:'text',required:true},
      {key:'date_intervention',label:"Date de l'opération",type:'date',required:true},
      {key:'type_anesthesie',label:"Type d'anesthésie (locale, générale)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT OPÉRATOIRE — EXTRACTION DE CATARACTE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Chirurgien : Dr <strong>{{chirurgien_nom}}</strong></p><h2>1. INTERVENTION</h2><p>Extraction de la cataracte de l'œil {{oeil_opere}} par phacoémulsification avec pose d'un implant de cristallin artificiel, le {{date_intervention}}. Anesthésie : {{type_anesthesie}}.</p><h2>2. BÉNÉFICES</h2><p>Amélioration significative de l'acuité visuelle et de la qualité de vie.</p><h2>3. RISQUES</h2><p>Endophtalmie (rare), décollement de rétine, opacification secondaire de la capsule (laser ultérieur), glaucome post-opératoire.</p><h2>4. SUITES</h2><p>Collyre antibiotique et anti-inflammatoire pendant 4 semaines. Contrôles à J1, J7, J30.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_glaucome', name: "Consentement de chirurgie du glaucome", category: 'sante', price: 6000, priceMax: 16000,
    description: "Consentement éclairé pour la chirurgie filtrante du glaucome (trabéculectomie ou implant de drainage), visant à réduire la pression intraoculaire et préserver le nerf optique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'chirurgien_nom',label:"Chirurgien ophtalmologue glaucologue",type:'text',required:true},
      {key:'type_chirurgie',label:"Type de chirurgie (trabéculectomie, implant, etc.)",type:'text',required:true},
      {key:'oeil_opere',label:"Œil opéré",type:'text',required:true},
      {key:'date_intervention',label:"Date de l'opération",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT À LA CHIRURGIE DU GLAUCOME</h1><p>Patient : <strong>{{patient_nom}}</strong> — Chirurgien : Dr <strong>{{chirurgien_nom}}</strong></p><h2>1. INTERVENTION</h2><p>Chirurgie du glaucome de l'œil {{oeil_opere}} : {{type_chirurgie}}, le {{date_intervention}}.</p><h2>2. OBJECTIF</h2><p>Réduction de la pression intraoculaire pour préserver le nerf optique et stopper la progression de la perte visuelle.</p><h2>3. RISQUES</h2><p>Échec filtrant, infection, hypotonie, cataracte post-opératoire, nécessité d'une reprise chirurgicale.</p><h2>4. ALTERNATIVES</h2><p>Collyres hypotonisants, laser (trabéculoplastie), surveillance rapprochée.</p><p>Signature du patient : ______________________</p></div>`
  },
  {
    code: 'opht2_injection_intravitreenne', name: "Consentement d'injection intravitréenne (DMLA)", category: 'sante', price: 4000, priceMax: 11000,
    description: "Consentement pour une injection intravitréenne d'anti-VEGF pour le traitement de la dégénérescence maculaire liée à l'âge (DMLA) humide ou d'autres pathologies rétiniennes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'ophtalmologue_nom',label:"Ophtalmologue injecteur",type:'text',required:true},
      {key:'oeil_traite',label:"Œil traité",type:'text',required:true},
      {key:'molecule_injectee',label:"Molécule injectée (ex: ranibizumab, aflibercept)",type:'text',required:true},
      {key:'date_injection',label:"Date de l'injection",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT À L'INJECTION INTRAVITRÉENNE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Dr <strong>{{ophtalmologue_nom}}</strong></p><h2>1. PROCÉDURE</h2><p>Injection de <strong>{{molecule_injectee}}</strong> dans l'œil {{oeil_traite}}, le {{date_injection}}, sous conditions d'asepsie stricte.</p><h2>2. BÉNÉFICE ATTENDU</h2><p>Stabilisation ou amélioration de la vision en réduisant l'activité néovasculaire maculaire.</p><h2>3. RISQUES</h2><p>Endophtalmie (rare mais grave), élévation transitoire de la pression oculaire, décollement de rétine, inconfort local.</p><h2>4. SUIVI</h2><p>OCT et contrôle visuel à chaque consultation de suivi pour adapter le rythme des injections.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_service_optique', name: "Contrat de service optique (lunettes sur ordonnance)", category: 'sante', price: 2500, priceMax: 7000,
    description: "Contrat entre un opticien et un client pour la fourniture de lunettes correctrices sur ordonnance médicale, précisant les garanties, délais et conditions de retour.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'opticien_nom',label:"Opticien-lunetier",type:'text',required:true},
      {key:'prescription_date',label:"Date de l'ordonnance",type:'date',required:true},
      {key:'correction',label:"Correction prescrite (sphère, cylindre, axe)",type:'text',required:true},
      {key:'prix_total',label:"Prix total de l'équipement (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE OPTIQUE</h1><p>Client : <strong>{{client_nom}}</strong> — Opticien : <strong>{{opticien_nom}}</strong></p><h2>1. ORDONNANCE</h2><p>Équipement réalisé sur ordonnance du {{prescription_date}} — Correction : {{correction}}</p><h2>2. PRIX</h2><p>Montant total : <strong>{{prix_total}} FCFA</strong> (verres + monture inclus)</p><h2>3. DÉLAI DE LIVRAISON</h2><p>Les lunettes seront prêtes dans un délai de 5 à 10 jours ouvrables après commande.</p><h2>4. GARANTIES</h2><p>Garantie verres 1 an contre les défauts de fabrication. Adaptation garantie 30 jours (une retouche de correction offerte si nécessaire).</p><h2>5. RETOURS</h2><p>Tout équipement réalisé sur mesure ne peut être retourné sauf défaut constaté.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'opht2_lentilles_contact', name: "Accord de service de lentilles de contact", category: 'sante', price: 2500, priceMax: 7000,
    description: "Accord encadrant la prescription, l'adaptation et le suivi des porteurs de lentilles de contact, incluant les règles d'hygiène obligatoires et le calendrier de remplacement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du porteur",type:'text',required:true},
      {key:'professionnel_nom',label:"Opticien ou ophtalmologue adaptateur",type:'text',required:true},
      {key:'type_lentilles',label:"Type de lentilles prescrites",type:'text',required:true},
      {key:'date_adaptation',label:"Date de l'adaptation",type:'date',required:true},
      {key:'frequence_remplacement',label:"Fréquence de remplacement",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — LENTILLES DE CONTACT</h1><p>Porteur : <strong>{{patient_nom}}</strong> — Professionnel : <strong>{{professionnel_nom}}</strong></p><h2>1. LENTILLES PRESCRITES</h2><p>Type : {{type_lentilles}} — Remplacement : {{frequence_remplacement}} — Adaptation le {{date_adaptation}}.</p><h2>2. RÈGLES D'HYGIÈNE OBLIGATOIRES</h2><p>Se laver les mains avant toute manipulation. Ne pas porter les lentilles la nuit sauf prescription. Ne pas exposer au contact avec l'eau.</p><h2>3. SIGNES D'ALERTE</h2><p>En cas de rougeur, douleur ou baisse de vision avec les lentilles, retirer immédiatement et consulter un ophtalmologue.</p><h2>4. SUIVI</h2><p>Contrôle annuel obligatoire pour renouveler la prescription.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_basse_vision', name: "Accord de service de basse vision", category: 'sante', price: 4000, priceMax: 11000,
    description: "Accord de prise en charge en basse vision pour les patients dont l'acuité visuelle est insuffisante malgré correction, incluant l'évaluation fonctionnelle et l'appareillage adapté.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'specialiste_nom',label:"Spécialiste basse vision",type:'text',required:true},
      {key:'pathologie',label:"Pathologie oculaire à l'origine de la basse vision",type:'text',required:true},
      {key:'date_evaluation',label:"Date de l'évaluation fonctionnelle",type:'date',required:true},
      {key:'aides_prescrites',label:"Aides optiques et non-optiques prescrites",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — BASSE VISION</h1><p>Patient : <strong>{{patient_nom}}</strong> — Spécialiste : <strong>{{specialiste_nom}}</strong></p><h2>1. PATHOLOGIE</h2><p>{{pathologie}}</p><h2>2. ÉVALUATION FONCTIONNELLE</h2><p>Réalisée le {{date_evaluation}} pour déterminer les besoins visuels du quotidien.</p><h2>3. AIDES PRESCRITES</h2><p>{{aides_prescrites}}</p><h2>4. RÉÉDUCATION</h2><p>Un programme de rééducation de la vision fonctionnelle et d'adaptation aux aides prescrites est proposé.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_orthoptie', name: "Contrat de service d'orthoptie rééducation", category: 'sante', price: 3000, priceMax: 8000,
    description: "Contrat de rééducation orthoptique pour la correction des troubles de la vision binoculaire, du strabisme et des amblyopies chez l'enfant et l'adulte.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'orthoptiste_nom',label:"Orthoptiste",type:'text',required:true},
      {key:'trouble_vise',label:"Trouble visuel à rééduquer",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la rééducation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE — ORTHOPTIE RÉÉDUCATION VISUELLE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Orthoptiste : <strong>{{orthoptiste_nom}}</strong></p><h2>1. TROUBLE CIBLÉ</h2><p>{{trouble_vise}}</p><h2>2. PROGRAMME</h2><p>{{nombre_seances}} séances de rééducation, débutant le {{date_debut}}, incluant des exercices de convergence, de poursuite oculaire et de motricité binoculaire.</p><h2>3. EXERCICES À DOMICILE</h2><p>Des exercices complémentaires à domicile sont remis au patient ou aux parents pour accélérer la progression.</p><h2>4. SUIVI OPHTALMOLOGIQUE</h2><p>La rééducation est conduite en coordination avec l'ophtalmologue prescripteur.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'opht2_depistage_diabetique', name: "Consentement de dépistage diabétique rétinopathie", category: 'sante', price: 3000, priceMax: 8000,
    description: "Consentement pour le dépistage de la rétinopathie diabétique par rétinographie ou examen du fond d'œil chez les patients diabétiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient diabétique",type:'text',required:true},
      {key:'ophtalmologue_nom',label:"Ophtalmologue dépisteur",type:'text',required:true},
      {key:'type_diabete',label:"Type de diabète (type 1, type 2)",type:'text',required:true},
      {key:'date_depistage',label:"Date du dépistage",type:'date',required:true},
      {key:'methode',label:"Méthode de dépistage (rétinographie, fond d'œil)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT AU DÉPISTAGE DE LA RÉTINOPATHIE DIABÉTIQUE</h1><p>Patient : <strong>{{patient_nom}}</strong> ({{type_diabete}}) — Dr <strong>{{ophtalmologue_nom}}</strong></p><h2>1. EXAMEN</h2><p>Dépistage par <strong>{{methode}}</strong> le {{date_depistage}}. Des collyres mydriatiques peuvent être utilisés pour faciliter l'examen.</p><h2>2. IMPORTANCE</h2><p>Le dépistage annuel de la rétinopathie diabétique est indispensable pour prévenir la cécité chez les patients diabétiques.</p><h2>3. RÉSULTATS</h2><p>Les résultats sont transmis au médecin traitant et à l'endocrinologue pour coordination du suivi global.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_pediatrique', name: "Accord de service d'ophtalmologie pédiatrique", category: 'sante', price: 3000, priceMax: 8000,
    description: "Accord de prise en charge ophtalmologique des enfants, précisant les modalités de dépistage, de traitement de l'amblyopie et de suivi du développement visuel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'enfant_nom',label:"Nom de l'enfant",type:'text',required:true},
      {key:'age_enfant',label:"Âge de l'enfant",type:'text',required:true},
      {key:'parent_nom',label:"Nom du parent ou tuteur légal",type:'text',required:true},
      {key:'ophtalmologue_nom',label:"Ophtalmologue pédiatrique",type:'text',required:true},
      {key:'motif',label:"Motif de consultation",type:'text',required:true},
      {key:'date_consultation',label:"Date de la consultation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — OPHTALMOLOGIE PÉDIATRIQUE</h1><p>Enfant : <strong>{{enfant_nom}}</strong> ({{age_enfant}}) — Parent/tuteur : <strong>{{parent_nom}}</strong></p><p>Ophtalmologue : Dr <strong>{{ophtalmologue_nom}}</strong> — Consultation le {{date_consultation}}</p><h2>1. MOTIF</h2><p>{{motif}}</p><h2>2. EXAMEN</h2><p>L'examen inclut la mesure de l'acuité visuelle adaptée à l'âge, la recherche d'un strabisme, d'une amblyopie et d'un trouble réfractif.</p><h2>3. CONSENTEMENT PARENTAL</h2><p>Le parent/tuteur consent aux examens et traitements nécessaires, dont l'occlusion oculaire ou la prescription de lunettes.</p><p>Signature du parent/tuteur : ______________________</p></div>`
  },
  {
    code: 'opht2_solaire_medicale', name: "Accord de service de lunetterie solaire médicale", category: 'sante', price: 2000, priceMax: 6000,
    description: "Accord pour la fourniture de lunettes solaires médicales prescrites sur ordonnance ophtalmologique, adaptées à des pathologies oculaires spécifiques (cataracte, glaucome, albinisme).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'opticien_nom',label:"Opticien fournisseur",type:'text',required:true},
      {key:'pathologie',label:"Pathologie justifiant la prescription solaire",type:'text',required:true},
      {key:'type_filtre',label:"Type de filtre prescrit (catégorie, teinte)",type:'text',required:true},
      {key:'date_prescription',label:"Date de la prescription médicale",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — LUNETTERIE SOLAIRE MÉDICALE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Opticien : <strong>{{opticien_nom}}</strong></p><h2>1. PRESCRIPTION</h2><p>Lunettes solaires médicales prescrites le {{date_prescription}} pour : {{pathologie}}</p><h2>2. FILTRE PRESCRIT</h2><p>{{type_filtre}}</p><h2>3. PROTECTION</h2><p>Les lunettes sont conformes aux normes de protection oculaire et filtrent 100% des UV-A et UV-B.</p><h2>4. USAGE</h2><p>Ces lunettes sont d'usage médical. Elles ne peuvent être portées que par le patient bénéficiaire de l'ordonnance.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'opht2_consentement_dentaire_anesthesie', name: "Consentement de soin dentaire sous anesthésie locale", category: 'sante', price: 2500, priceMax: 7000,
    description: "Formulaire de consentement pour un soin dentaire réalisé sous anesthésie locale, précisant la nature du soin, les risques de l'anesthésie et les consignes post-opératoires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'chirurgien_dentiste',label:"Chirurgien-dentiste",type:'text',required:true},
      {key:'soin_prevu',label:"Soin dentaire prévu",type:'text',required:true},
      {key:'date_soin',label:"Date du soin",type:'date',required:true},
      {key:'allergies',label:"Allergies connues (anesthésiques, médicaments)",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT AU SOIN DENTAIRE SOUS ANESTHÉSIE LOCALE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Dr <strong>{{chirurgien_dentiste}}</strong></p><h2>1. SOIN PRÉVU</h2><p>{{soin_prevu}} — Date : {{date_soin}}</p><h2>2. ANESTHÉSIE LOCALE</h2><p>Un anesthésique local sera injecté pour insensibiliser la zone traitée. La durée d'anesthésie est de 1 à 3 heures après le soin.</p><h2>3. ALLERGIES</h2><p>{{allergies}}</p><h2>4. CONSIGNES POST-OPÉRATOIRES</h2><p>Ne pas manger avant le retour de la sensibilité. Éviter l'aspirine. En cas de douleur intense ou de saignement prolongé, contacter le cabinet.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_extraction_dentaire', name: "Consentement d'extraction dentaire", category: 'sante', price: 3000, priceMax: 8000,
    description: "Consentement éclairé pour l'extraction d'une ou plusieurs dents, incluant les risques post-opératoires, les consignes de cicatrisation et les alternatives conservatrices.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'dentiste_nom',label:"Chirurgien-dentiste",type:'text',required:true},
      {key:'dent_concernee',label:"Dent(s) à extraire (numérotation)",type:'text',required:true},
      {key:'motif_extraction',label:"Motif de l'extraction",type:'text',required:true},
      {key:'date_intervention',label:"Date de l'extraction",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT À L'EXTRACTION DENTAIRE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Dr <strong>{{dentiste_nom}}</strong></p><h2>1. DENT(S) CONCERNÉE(S)</h2><p>{{dent_concernee}} — Motif : {{motif_extraction}} — Date : {{date_intervention}}</p><h2>2. DÉROULEMENT</h2><p>L'extraction est réalisée sous anesthésie locale. Elle peut être simple ou chirurgicale selon la position de la dent.</p><h2>3. RISQUES</h2><p>Saignement post-opératoire, infection (alvéolite), paresthésie transitoire (rare), communication bucco-sinusienne (dents du haut).</p><h2>4. CONSIGNES</h2><p>Mordre la compresse 30 minutes. Pas de rinçage buccal le jour J. Alimentation froide et molle pendant 24h. Pas de tabac.</p><h2>5. ALTERNATIVES</h2><p>Traitement endodontique (dévitalisation), si réalisable.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_implant_dentaire', name: "Consentement de pose d'implant dentaire", category: 'sante', price: 6000, priceMax: 16000,
    description: "Consentement éclairé pour la pose d'un implant dentaire en titane, précisant les étapes chirurgicales, le délai d'ostéo-intégration, les risques et les prérequis osseux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'chirurgien_nom',label:"Chirurgien implantologiste",type:'text',required:true},
      {key:'site_implant',label:"Site de l'implant (zone et numéro de dent)",type:'text',required:true},
      {key:'date_chirurgie',label:"Date de la chirurgie implantaire",type:'date',required:true},
      {key:'bilan_osseux',label:"Résultats du bilan osseux (scanner, etc.)",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT À LA POSE D'IMPLANT DENTAIRE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Dr <strong>{{chirurgien_nom}}</strong></p><h2>1. SITE IMPLANTÉ</h2><p>{{site_implant}} — Chirurgie prévue le {{date_chirurgie}}</p><h2>2. BILAN PRÉOPÉRATOIRE</h2><p>{{bilan_osseux}}</p><h2>3. ÉTAPES</h2><p>Phase 1 : pose chirurgicale de l'implant. Phase 2 (après 3-6 mois d'ostéo-intégration) : pose de la prothèse sur implant.</p><h2>4. RISQUES</h2><p>Échec d'ostéo-intégration (5-10%), infection, lésion nerveuse ou sinusienne (rare).</h2><h2>5. ENTRETIEN</h2><p>Hygiène rigoureuse et visites de maintenance régulières sont indispensables à la longévité de l'implant.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_orthodontie', name: "Consentement de traitement orthodontique (appareil)", category: 'sante', price: 5000, priceMax: 14000,
    description: "Consentement pour un traitement orthodontique avec appareil fixe ou amovible, précisant la durée de traitement, les contraintes d'hygiène et les risques de décalcification.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'orthodontiste_nom',label:"Orthodontiste",type:'text',required:true},
      {key:'type_appareil',label:"Type d'appareil (fixe, amovible, aligneurs)",type:'text',required:true},
      {key:'duree_traitement',label:"Durée estimée du traitement",type:'text',required:true},
      {key:'date_debut',label:"Date de pose de l'appareil",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT AU TRAITEMENT ORTHODONTIQUE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Dr <strong>{{orthodontiste_nom}}</strong></p><h2>1. TRAITEMENT</h2><p>Appareil : {{type_appareil}} — Durée estimée : {{duree_traitement}} — Début le {{date_debut}}</p><h2>2. OBJECTIFS</h2><p>Alignement dentaire, correction de la malocclusion et amélioration de l'esthétique et de la fonction masticatoire.</p><h2>3. CONTRAINTES D'HYGIÈNE</h2><p>Brossage rigoureux après chaque repas, brossettes interdentaires, fil dentaire adapté. Éviter aliments durs et collants avec appareil fixe.</p><h2>4. RISQUES</h2><p>Décalcification en cas d'hygiène insuffisante, résorption radiculaire (rare), inconfort initial.</p><h2>5. CONTENTION</h2><p>Une phase de contention (fil collé ou gouttière) est indispensable après le traitement actif.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_prothese_dentaire', name: "Consentement de pose de prothèse dentaire (bridge, couronne)", category: 'sante', price: 4000, priceMax: 11000,
    description: "Consentement pour la réalisation d'une prothèse dentaire fixe (couronne, bridge), précisant les étapes de préparation, les matériaux utilisés et les garanties.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'dentiste_nom',label:"Prothésiste dentaire / Chirurgien-dentiste",type:'text',required:true},
      {key:'type_prothese',label:"Type de prothèse (couronne, bridge, inlay-onlay)",type:'text',required:true},
      {key:'materiau',label:"Matériau utilisé (céramique, zircone, métal-céramique)",type:'text',required:true},
      {key:'date_empreinte',label:"Date de la prise d'empreinte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT À LA POSE DE PROTHÈSE DENTAIRE FIXE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Dr <strong>{{dentiste_nom}}</strong></p><h2>1. PROTHÈSE PRÉVUE</h2><p>Type : {{type_prothese}} — Matériau : {{materiau}} — Empreinte le {{date_empreinte}}</p><h2>2. ÉTAPES</h2><p>Préparation (meulage des dents piliers), empreinte, fabrication prothétique (délai 5-10 jours), essayage, scellement définitif.</p><h2>3. RISQUES</h2><p>Sensibilité transitoire post-préparation, nécessité de dévitalisation si la pulpe est atteinte, descellement rare.</p><h2>4. GARANTIE</h2><p>La prothèse est garantie 2 ans contre les défauts de fabrication.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_blanchiment', name: "Consentement de détartrage et blanchiment dentaire", category: 'sante', price: 3000, priceMax: 8000,
    description: "Consentement pour un détartrage professionnel et un blanchiment dentaire, incluant les contre-indications, les résultats attendus et les conseils post-traitement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'dentiste_nom',label:"Chirurgien-dentiste",type:'text',required:true},
      {key:'technique_blanchiment',label:"Technique de blanchiment (gouttières, laser, mixte)",type:'text',required:true},
      {key:'date_seance',label:"Date de la séance",type:'date',required:true},
      {key:'contre_indications',label:"Contre-indications vérifiées",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT AU DÉTARTRAGE ET BLANCHIMENT DENTAIRE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Dr <strong>{{dentiste_nom}}</strong></p><h2>1. TRAITEMENT</h2><p>Séance le {{date_seance}} — Technique : {{technique_blanchiment}}</p><h2>2. DÉTARTRAGE PRÉALABLE</h2><p>Un détartrage est réalisé avant le blanchiment pour assurer une efficacité optimale.</p><h2>3. RÉSULTATS ATTENDUS</h2><p>Éclaircissement de 2 à 8 teintes selon la couleur initiale et la technique utilisée. Les résultats varient selon les individus.</p><h2>4. CONTRE-INDICATIONS</h2><p>{{contre_indications}}</p><h2>5. CONSIGNES</h2><p>Éviter les aliments et boissons colorants (café, thé, vin rouge) pendant 48h. Sensibilité dentaire transitoire possible.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_chirurgie_parodontale', name: "Consentement de chirurgie parodontale (gencives)", category: 'sante', price: 5000, priceMax: 13000,
    description: "Consentement éclairé pour une intervention chirurgicale parodontale (lambeau, greffe gingivale, résection osseuse) pour le traitement des maladies des gencives avancées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'parodontiste_nom',label:"Parodontiste",type:'text',required:true},
      {key:'type_chirurgie',label:"Type de chirurgie parodontale",type:'text',required:true},
      {key:'zone_traitee',label:"Zone traitée (secteur, dents concernées)",type:'text',required:true},
      {key:'date_intervention',label:"Date de l'intervention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT À LA CHIRURGIE PARODONTALE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Dr <strong>{{parodontiste_nom}}</strong></p><h2>1. INTERVENTION</h2><p>{{type_chirurgie}} sur {{zone_traitee}} — Date : {{date_intervention}}</p><h2>2. OBJECTIF</h2><p>Éliminer les poches parodontales, traiter les pertes osseuses et régénérer les tissus de soutien des dents.</p><h2>3. RISQUES</h2><p>Saignement, infection, récession gingivale post-opératoire, sensibilité dentaire accrue, mobilité transitoire.</p><h2>4. SUITES</h2><p>Prescription d'antibiotiques et d'antalgiques. Alimentation molle pendant 2 semaines. Suivi de maintenance parodontale indispensable.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_pedodontie', name: "Accord de service de pédodontie (enfants)", category: 'sante', price: 2500, priceMax: 7000,
    description: "Accord de prise en charge dentaire pédiatrique (pédodontie), adapté aux enfants avec techniques de gestion comportementale et de prévention bucco-dentaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'enfant_nom',label:"Nom de l'enfant",type:'text',required:true},
      {key:'age_enfant',label:"Âge",type:'text',required:true},
      {key:'parent_nom',label:"Nom du parent ou tuteur",type:'text',required:true},
      {key:'pedodontiste_nom',label:"Pédodontiste",type:'text',required:true},
      {key:'motif',label:"Motif de consultation",type:'text',required:true},
      {key:'date_consultation',label:"Date de la première consultation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PÉDODONTIE (SOINS DENTAIRES ENFANT)</h1><p>Enfant : <strong>{{enfant_nom}}</strong> ({{age_enfant}}) — Parent/tuteur : <strong>{{parent_nom}}</strong></p><p>Pédodontiste : Dr <strong>{{pedodontiste_nom}}</strong> — Consultation le {{date_consultation}}</p><h2>1. MOTIF</h2><p>{{motif}}</p><h2>2. APPROCHE PÉDIATRIQUE</h2><p>Le pédodontiste utilise des techniques de communication et de gestion comportementale adaptées à l'âge de l'enfant pour établir la confiance.</p><h2>3. PRÉVENTION</h2><p>Un programme de prévention (fluoration, scellements, conseils alimentaires) est intégré à chaque consultation.</p><h2>4. CONSENTEMENT PARENTAL</h2><p>Le parent consent aux soins nécessaires, après information sur leur nature et leurs bénéfices.</p><p>Signature du parent/tuteur : ______________________</p></div>`
  },
  {
    code: 'opht2_radiographie_panoramique', name: "Accord de service de radiographie panoramique dentaire", category: 'sante', price: 2500, priceMax: 7000,
    description: "Accord pour la réalisation d'une radiographie panoramique dentaire (orthopantomogramme), avec information sur l'exposition aux rayonnements et les utilisations diagnostiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'dentiste_nom',label:"Chirurgien-dentiste prescripteur",type:'text',required:true},
      {key:'date_examen',label:"Date de la radiographie",type:'date',required:true},
      {key:'motif',label:"Motif de la prescription",type:'text',required:true},
      {key:'grossesse',label:"Grossesse éventuelle (oui/non/incertain)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — RADIOGRAPHIE PANORAMIQUE DENTAIRE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Dr <strong>{{dentiste_nom}}</strong></p><h2>1. EXAMEN PRESCRIT</h2><p>Orthopantomogramme (panoramique dentaire) le {{date_examen}} — Motif : {{motif}}</p><h2>2. RAYONNEMENTS</h2><p>La dose de rayonnement est très faible et comparable à une journée d'exposition aux rayonnements naturels.</p><h2>3. GROSSESSE</h2><p>Grossesse déclarée : <strong>{{grossesse}}</strong>. En cas de grossesse avérée, le report de l'examen est systématiquement proposé sauf urgence diagnostique.</p><h2>4. UTILISATION</h2><p>La radiographie est conservée au dossier et peut être transmise à un confrère sur demande du patient.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_prothese_amovible', name: "Accord de service de prothèse amovible (dentier)", category: 'sante', price: 4000, priceMax: 11000,
    description: "Accord de réalisation d'une prothèse dentaire amovible complète ou partielle, incluant les essais de confort, les ajustements et les conseils d'entretien quotidien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'dentiste_nom',label:"Prothésiste / Chirurgien-dentiste",type:'text',required:true},
      {key:'type_prothese',label:"Type de prothèse (complète, partielle, stellite)",type:'text',required:true},
      {key:'arcade_concernee',label:"Arcade concernée (supérieure, inférieure, les deux)",type:'text',required:true},
      {key:'date_empreinte',label:"Date de prise d'empreinte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — PROTHÈSE DENTAIRE AMOVIBLE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Dr <strong>{{dentiste_nom}}</strong></p><h2>1. PROTHÈSE</h2><p>Type : {{type_prothese}} — Arcade : {{arcade_concernee}} — Empreinte le {{date_empreinte}}</p><h2>2. ÉTAPES</h2><p>Empreintes, essai des dents en cire, livraison de la prothèse, ajustements inclus pendant 3 mois.</p><h2>3. ADAPTATION</h2><p>Une période d'adaptation de 4 à 8 semaines est normale. Des retouches gratuites sont incluses pendant cette période.</p><h2>4. ENTRETIEN</h2><p>Retirer la prothèse la nuit, la brosser après chaque repas, la conserver dans un verre d'eau la nuit.</p><p>Signatures : ______________________ ______________________</p></div>`
  },
  {
    code: 'opht2_scellement_vernis', name: "Accord de service de scellement et vernis fluoré", category: 'sante', price: 2000, priceMax: 5500,
    description: "Accord pour la pose de scellements de sillons et l'application de vernis fluoré chez l'enfant ou l'adulte à risque carieux élevé, dans le cadre d'un programme de prévention dentaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient (ou parent si mineur)",type:'text',required:true},
      {key:'dentiste_nom',label:"Chirurgien-dentiste",type:'text',required:true},
      {key:'dents_traitees',label:"Dents concernées (numérotation)",type:'text',required:true},
      {key:'type_acte',label:"Acte réalisé (scellement, vernis fluoré, ou les deux)",type:'text',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE — SCELLEMENT ET VERNIS FLUORÉ</h1><p>Patient : <strong>{{patient_nom}}</strong> — Dr <strong>{{dentiste_nom}}</strong></p><h2>1. ACTE RÉALISÉ</h2><p>{{type_acte}} sur les dents {{dents_traitees}} — Date : {{date_acte}}</p><h2>2. OBJECTIF</h2><p>Prévenir l'apparition des caries en protégeant les sillons des molaires et en renforçant l'émail par apport de fluor.</p><h2>3. DURÉE D'EFFICACITÉ</h2><p>Les scellements sont efficaces pendant 3 à 5 ans. Le vernis fluoré se renouvelle tous les 6 mois.</p><h2>4. CONSIGNES</h2><p>Ne pas manger ou boire pendant 30 minutes après l'application du vernis fluoré.</p><p>Signature : ______________________</p></div>`
  },
  {
    code: 'opht2_rapport_consultation', name: "Rapport de consultation ophtalmologique", category: 'sante', price: 3000, priceMax: 8000,
    description: "Rapport standardisé de consultation ophtalmologique pour la Côte d'Ivoire, intégrant les résultats des mesures visuelles, le diagnostic et les prescriptions.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'patient_nom',label:"Nom du patient",type:'text',required:true},
      {key:'ophtalmologue_nom',label:"Ophtalmologue",type:'text',required:true},
      {key:'date_consultation',label:"Date de la consultation",type:'date',required:true},
      {key:'resultats_acuite',label:"Acuité visuelle (OD et OG, avec et sans correction)",type:'textarea',required:true},
      {key:'diagnostic_conclusion',label:"Diagnostic et conclusion clinique",type:'textarea',required:true},
      {key:'prescriptions',label:"Prescriptions (lunettes, collyres, examens complémentaires)",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONSULTATION OPHTALMOLOGIQUE</h1><p>Patient : <strong>{{patient_nom}}</strong> — Dr <strong>{{ophtalmologue_nom}}</strong> — Date : {{date_consultation}}</p><h2>1. ACUITÉ VISUELLE</h2><p>{{resultats_acuite}}</p><h2>2. DIAGNOSTIC</h2><p>{{diagnostic_conclusion}}</p><h2>3. PRESCRIPTIONS</h2><p>{{prescriptions}}</p><h2>4. PROCHAIN RENDEZ-VOUS</h2><p>Un contrôle est recommandé selon l'évolution de la pathologie ou après traitement.</p><p>Cachet et signature : ______________________</p></div>`
  },
  {
    code: 'opht2_charte_qualite', name: "Charte de prise en charge ophtalmologique de qualité", category: 'sante', price: 2000, priceMax: 5000,
    description: "Charte d'engagement qualité d'un cabinet ou centre ophtalmologique envers ses patients, couvrant l'accessibilité, la confidentialité, la continuité des soins et la satisfaction.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'centre_nom',label:"Nom du centre ou cabinet ophtalmologique",type:'text',required:true},
      {key:'directeur_nom',label:"Directeur médical ou responsable",type:'text',required:true},
      {key:'adresse',label:"Adresse du centre",type:'text',required:true},
      {key:'date_edition',label:"Date d'édition de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE PRISE EN CHARGE OPHTALMOLOGIQUE DE QUALITÉ</h1><p><strong>{{centre_nom}}</strong> — Responsable : <strong>{{directeur_nom}}</strong></p><p>Adresse : {{adresse}} — Charte édictée le {{date_edition}}</p><h2>1. ACCESSIBILITÉ</h2><p>Nous nous engageons à proposer des délais de rendez-vous raisonnables et des tarifs transparents adaptés au contexte ivoirien.</p><h2>2. QUALITÉ DES SOINS</h2><p>Nos praticiens maintiennent leurs compétences à jour via la formation continue et respectent les protocoles evidence-based.</p><h2>3. CONFIDENTIALITÉ</h2><p>Toutes les données de santé sont protégées conformément aux exigences légales en vigueur.</p><h2>4. CONTINUITÉ</h2><p>En cas d'absence ou d'urgence, une continuité des soins est assurée via un système de garde et d'astreinte.</p><h2>5. SATISFACTION</h2><p>Un questionnaire de satisfaction est remis à chaque patient après sa prise en charge.</p><p>Signature du directeur : ______________________</p></div>`
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
  console.log(`Batch 68a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
