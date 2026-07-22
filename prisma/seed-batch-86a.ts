import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── PSYCHIATRIE / SANTE MENTALE (25) ───────────────────────────────────────
  {
    code: 'psych_contrat_hospit_libre',
    name: "Contrat de prise en charge psychiatrique - Hospitalisation libre",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Contrat formalisant l'admission volontaire d'un patient dans une structure psychiatrique en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'nom_etablissement',label:"Nom de l'etablissement psychiatrique",type:'text',required:true},
      {key:'date_admission',label:"Date d'admission",type:'date',required:true},
      {key:'nom_medecin',label:"Nom du medecin responsable",type:'text',required:true},
      {key:'motif_hospitalisation',label:"Motif d'hospitalisation",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRISE EN CHARGE PSYCHIATRIQUE</h1><h2>Hospitalisation Libre</h2><p>Entre l'etablissement <strong>{{nom_etablissement}}</strong> et le patient <strong>{{nom_patient}}</strong>, ne(e) le {{date_naissance}}, admis(e) le {{date_admission}} sous la responsabilite du Dr {{nom_medecin}}.</p><h3>Motif</h3><p>{{motif_hospitalisation}}</p><h3>Droits du patient</h3><p>Le patient reconnait etre informe(e) de ses droits, notamment le droit de quitter l'etablissement a tout moment sur simple demande ecrite, conformement aux dispositions applicables en Cote d'Ivoire.</p><p class="signature">Signature du patient : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_consentement_hdt',
    name: "Consentement d'hospitalisation sous contrainte (HDT)",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Document d'hospitalisation a la demande d'un tiers (HDT) pour patient psychiatrique en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'nom_demandeur',label:"Nom du tiers demandeur",type:'text',required:true},
      {key:'lien_demandeur',label:"Lien avec le patient",type:'text',required:true},
      {key:'nom_psychiatre',label:"Nom du psychiatre certificateur",type:'text',required:true},
      {key:'date_certificat',label:"Date du certificat medical",type:'date',required:true},
      {key:'motif_contrainte',label:"Motif de la mesure de contrainte",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>HOSPITALISATION SOUS CONTRAINTE</h1><h2>Hospitalisation a la Demande d'un Tiers (HDT)</h2><p>Le tiers demandeur <strong>{{nom_demandeur}}</strong>, ayant qualite de {{lien_demandeur}} du patient <strong>{{nom_patient}}</strong>, sollicite l'hospitalisation sous contrainte sur la base du certificat etabli le {{date_certificat}} par le Dr {{nom_psychiatre}}.</p><h3>Motif</h3><p>{{motif_contrainte}}</p><h3>Droits et recours</h3><p>Le patient ou tout tiers peut saisir le juge competent pour contester la mesure. L'etablissement est tenu d'informer le patient de ses droits dans les 24 heures.</p><p class="signature">Signature du demandeur : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_consentement_ect',
    name: "Consentement de traitement par electro-convulsivotherapie (ECT)",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Formulaire de consentement eclaire pour la pratique de l'ECT en psychiatrie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom complet du patient",type:'text',required:true},
      {key:'nom_representant',label:"Nom du representant legal (si applicable)",type:'text',required:false},
      {key:'nom_psychiatre',label:"Nom du psychiatre prescripteur",type:'text',required:true},
      {key:'nombre_seances',label:"Nombre de seances prevues",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du traitement",type:'date',required:true},
      {key:'risques_expliques',label:"Risques et benefices expliques au patient",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONSENTEMENT ECLAIRE - ELECTRO-CONVULSIVOTHERAPIE (ECT)</h1><p>Le patient <strong>{{nom_patient}}</strong> (ou son representant legal : {{nom_representant}}) consent au traitement par ECT prescrit par le Dr <strong>{{nom_psychiatre}}</strong>.</p><h3>Modalites du traitement</h3><p>Nombre de seances prevues : {{nombre_seances}} - Debut le {{date_debut}}.</p><h3>Information delivree</h3><p>{{risques_expliques}}</p><h3>Declaration du patient</h3><p>Je soussigne(e) declare avoir recu une information claire et complete sur le traitement, ses benefices potentiels et ses risques eventuels, et j'y consens librement.</p><p class="signature">Signature : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_tcc',
    name: "Accord de prise en charge psychotherapeutique (TCC)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Contrat d'engagement pour une psychotherapie de type Therapie Cognitivo-Comportementale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'nom_therapeute',label:"Nom du psychotherapeute",type:'text',required:true},
      {key:'frequence_seances',label:"Frequence des seances (ex: 1 par semaine)",type:'text',required:true},
      {key:'duree_estimee',label:"Duree estimee du suivi",type:'text',required:true},
      {key:'objectifs',label:"Objectifs therapeutiques",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRISE EN CHARGE PSYCHOTHERAPEUTIQUE</h1><h2>Therapie Cognitivo-Comportementale (TCC)</h2><p>Entre le psychotherapeute <strong>{{nom_therapeute}}</strong> et le patient <strong>{{nom_patient}}</strong>, il est convenu d'un suivi TCC aux conditions suivantes :</p><h3>Modalites</h3><p>Frequence : {{frequence_seances}} - Duree estimee : {{duree_estimee}}.</p><h3>Objectifs therapeutiques</h3><p>{{objectifs}}</p><h3>Engagements</h3><p>Le patient s'engage a participer activement aux seances et a realiser les exercices proposes entre les consultations. Le therapeute s'engage au respect du secret professionnel et a l'adaptation des techniques aux besoins du patient.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_psychanalyse',
    name: "Accord de prise en charge psychanalytique",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Contrat encadrant un suivi psychanalytique selon les regles deontologiques en vigueur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'nom_analyste',label:"Nom du psychanalyste",type:'text',required:true},
      {key:'date_debut',label:"Date de debut de l'analyse",type:'date',required:true},
      {key:'tarif_seance',label:"Tarif par seance (FCFA)",type:'text',required:true},
      {key:'cadre_analytique',label:"Description du cadre analytique",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRISE EN CHARGE PSYCHANALYTIQUE</h1><p>Entre le psychanalyste <strong>{{nom_analyste}}</strong> et le patient <strong>{{nom_patient}}</strong>, a compter du {{date_debut}}.</p><h3>Cadre analytique</h3><p>{{cadre_analytique}}</p><h3>Honoraires</h3><p>Tarif convenu : {{tarif_seance}} FCFA par seance.</p><h3>Confidentialite</h3><p>L'analyste est soumis au secret professionnel. Le patient reconnait que la cure analytique est un processus volontaire et qu'il peut y mettre fin a tout moment.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_pse_entreprise',
    name: "Accord de suivi psychologique en entreprise (PSE)",
    category: 'sante', price: 5000, priceMax: 16000,
    description: "Convention de mise en place d'un programme de soutien aux employes (PSE) avec un psychologue du travail.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'nom_psychologue',label:"Nom du psychologue prestataire",type:'text',required:true},
      {key:'nombre_salaries',label:"Nombre de salaries beneficiaires",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du programme",type:'date',required:true},
      {key:'dispositif_pse',label:"Description du dispositif PSE",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SUIVI PSYCHOLOGIQUE EN ENTREPRISE</h1><h2>Programme de Soutien aux Employes (PSE)</h2><p>Entre <strong>{{nom_entreprise}}</strong> et le psychologue <strong>{{nom_psychologue}}</strong>, a compter du {{date_debut}}, pour {{nombre_salaries}} salaries beneficiaires.</p><h3>Dispositif mis en place</h3><p>{{dispositif_pse}}</p><h3>Confidentialite</h3><p>Toutes les consultations sont strictement confidentielles. Aucune information individuelle ne sera transmise a l'employeur sans le consentement expres du salarie concerne.</p><p class="signature">Cachet et signature : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_csmc',
    name: "Accord de service de centre de sante mentale communautaire",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention d'adhesion et de service pour un centre de sante mentale communautaire en Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom du beneficiaire",type:'text',required:true},
      {key:'nom_centre',label:"Nom du centre communautaire",type:'text',required:true},
      {key:'services_proposes',label:"Services proposes par le centre",type:'textarea',required:true},
      {key:'date_adhesion',label:"Date d'adhesion",type:'date',required:true},
      {key:'referent_social',label:"Nom du referent social",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - CENTRE DE SANTE MENTALE COMMUNAUTAIRE</h1><p>Le centre <strong>{{nom_centre}}</strong> accueille le beneficiaire <strong>{{nom_beneficiaire}}</strong> a compter du {{date_adhesion}}. Referent social : {{referent_social}}.</p><h3>Services proposes</h3><p>{{services_proposes}}</p><h3>Engagement du centre</h3><p>Le centre s'engage a offrir des prestations accessibles et culturellement adaptees au contexte de l'Afrique subsaharienne, dans le respect de la dignite de chaque beneficiaire.</p><p class="signature">Signature : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_rehab_psychosociale',
    name: "Accord de service de rehabilitation psychosociale",
    category: 'sante', price: 4000, priceMax: 13000,
    description: "Contrat de prise en charge pour un programme de rehabilitation psychosociale destine aux personnes souffrant de troubles mentaux severes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom du beneficiaire",type:'text',required:true},
      {key:'nom_structure',label:"Nom de la structure de rehabilitation",type:'text',required:true},
      {key:'objectifs_rehab',label:"Objectifs de la rehabilitation",type:'textarea',required:true},
      {key:'duree_programme',label:"Duree du programme",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REHABILITATION PSYCHOSOCIALE</h1><p>Entre <strong>{{nom_structure}}</strong> et le beneficiaire <strong>{{nom_beneficiaire}}</strong> - Programme debutant le {{date_debut}} pour une duree de {{duree_programme}}.</p><h3>Objectifs</h3><p>{{objectifs_rehab}}</p><h3>Approche</h3><p>La rehabilitation psychosociale vise a restaurer les capacites fonctionnelles et relationnelles du beneficiaire, favoriser son insertion sociale et economique, et renforcer son autonomie dans son milieu de vie.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_addictologie',
    name: "Accord de service d'addictologie (alcool, drogues)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de prise en charge addictologique pour personnes dependantes a l'alcool ou aux drogues.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'type_addiction',label:"Type d'addiction (alcool, cannabis, etc.)",type:'text',required:true},
      {key:'nom_structure',label:"Nom de la structure addictologique",type:'text',required:true},
      {key:'plan_traitement',label:"Description du plan de traitement",type:'textarea',required:true},
      {key:'date_debut',label:"Date de debut de la prise en charge",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ADDICTOLOGIE</h1><p>Entre <strong>{{nom_structure}}</strong> et le patient <strong>{{nom_patient}}</strong>, pour une prise en charge de l'addiction a : <strong>{{type_addiction}}</strong>, a compter du {{date_debut}}.</p><h3>Plan de traitement</h3><p>{{plan_traitement}}</p><h3>Engagement du patient</h3><p>Le patient s'engage dans une demarche volontaire de soins. Il reconnait la necessite d'un suivi regulier et de l'abstinence comme objectif therapeutique principal. Toute rechute sera abordee dans un cadre bienveillant et non sanctionnant.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_addiction_ecrans',
    name: "Accord de service de soin en cas d'addiction aux ecrans",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de prise en charge therapeutique pour cyberdependance et addiction aux ecrans, notamment chez les jeunes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'age_patient',label:"Age du patient",type:'text',required:true},
      {key:'nom_therapeute',label:"Nom du therapeute",type:'text',required:true},
      {key:'bilan_usage',label:"Bilan de l'usage problematique des ecrans",type:'textarea',required:true},
      {key:'date_debut',label:"Date de debut de la prise en charge",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - ADDICTION AUX ECRANS</h1><p>Entre le therapeute <strong>{{nom_therapeute}}</strong> et le patient <strong>{{nom_patient}}</strong> (age : {{age_patient}} ans), a compter du {{date_debut}}.</p><h3>Bilan d'usage</h3><p>{{bilan_usage}}</p><h3>Programme therapeutique</h3><p>Le programme comprend une evaluation des habitudes numeriques, des seances de psychoeducation, un travail sur les besoins sous-jacents a l'addiction et des strategies de regulation comportementale adaptees au contexte familial et scolaire africain.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_troubles_alimentaires',
    name: "Accord de service de traitement des troubles alimentaires",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de prise en charge multidisciplinaire des troubles du comportement alimentaire (anorexie, boulimie, hyperphagie).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'type_trouble',label:"Type de trouble alimentaire",type:'text',required:true},
      {key:'equipe_soignante',label:"Composition de l'equipe soignante",type:'text',required:true},
      {key:'plan_prise_en_charge',label:"Plan de prise en charge",type:'textarea',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - TROUBLES DU COMPORTEMENT ALIMENTAIRE</h1><p>Prise en charge de <strong>{{nom_patient}}</strong> pour : {{type_trouble}}, par l'equipe : {{equipe_soignante}}, a compter du {{date_debut}}.</p><h3>Plan de prise en charge</h3><p>{{plan_prise_en_charge}}</p><h3>Suivi</h3><p>Un bilan nutritionnel, psychologique et medical sera realise mensuellement. Le programme tient compte des specificites culturelles alimentaires de l'Afrique de l'Ouest, notamment des pratiques culinaires et des representations sociales du corps.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_psy_enfant_ado',
    name: "Accord de service de psychologie de l'enfant et de l'adolescent",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de suivi psychologique pour enfants et adolescents, incluant le consentement parental.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_enfant',label:"Nom de l'enfant ou de l'adolescent",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'nom_parent',label:"Nom du parent ou tuteur legal",type:'text',required:true},
      {key:'nom_psychologue',label:"Nom du psychologue",type:'text',required:true},
      {key:'motif_consultation',label:"Motif de consultation",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - PSYCHOLOGIE DE L'ENFANT ET DE L'ADOLESCENT</h1><p>Le parent / tuteur legal <strong>{{nom_parent}}</strong> consent au suivi psychologique de <strong>{{nom_enfant}}</strong>, ne(e) le {{date_naissance}}, par le psychologue <strong>{{nom_psychologue}}</strong>.</p><h3>Motif de consultation</h3><p>{{motif_consultation}}</p><h3>Cadre du suivi</h3><p>Les seances seront adaptees a l'age et au stade de developpement de l'enfant. Le psychologue s'engage a informer les parents de l'evolution du suivi, dans le respect du droit a la confidentialite de l'enfant selon son degre de maturite.</p><p class="signature">Signature du parent/tuteur : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_neuropsychologie',
    name: "Accord de service de neuropsychologie clinique",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de bilan et de suivi neuropsychologique pour evaluation des fonctions cognitives.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'nom_neuropsychologue',label:"Nom du neuropsychologue",type:'text',required:true},
      {key:'motif_bilan',label:"Motif du bilan neuropsychologique",type:'textarea',required:true},
      {key:'date_bilan',label:"Date du bilan",type:'date',required:true},
      {key:'medecin_prescripteur',label:"Medecin prescripteur",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NEUROPSYCHOLOGIE CLINIQUE</h1><p>Bilan prescrit par le Dr <strong>{{medecin_prescripteur}}</strong> pour le patient <strong>{{nom_patient}}</strong>, realise par le neuropsychologue <strong>{{nom_neuropsychologue}}</strong> le {{date_bilan}}.</p><h3>Motif du bilan</h3><p>{{motif_bilan}}</p><h3>Deroulement</h3><p>Le bilan comprend une serie de tests standardises evaluant la memoire, l'attention, les fonctions executives, le langage et les praxies. Un compte rendu detaille sera remis dans un delai de 15 jours ouvrables apres la passation.</p><p class="signature">Consentement du patient : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_groupe_soutien',
    name: "Accord de service de groupes de soutien (groupe de parole)",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Convention d'adhesion a un groupe de parole ou groupe de soutien psychologique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_participant',label:"Nom du participant",type:'text',required:true},
      {key:'nom_groupe',label:"Intitule du groupe de soutien",type:'text',required:true},
      {key:'animateur_groupe',label:"Nom de l'animateur ou du facilitateur",type:'text',required:true},
      {key:'frequence_reunions',label:"Frequence des reunions",type:'text',required:true},
      {key:'regles_groupe',label:"Regles de fonctionnement du groupe",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - GROUPE DE SOUTIEN ET DE PAROLE</h1><p>Le participant <strong>{{nom_participant}}</strong> s'engage a rejoindre le groupe <em>{{nom_groupe}}</em> anime par <strong>{{animateur_groupe}}</strong>, qui se reunit {{frequence_reunions}}.</p><h3>Regles du groupe</h3><p>{{regles_groupe}}</p><h3>Confidentialite</h3><p>Chaque membre s'engage a respecter le principe de confidentialite absolue : ce qui se dit dans le groupe reste dans le groupe. La violation de ce principe entraine l'exclusion du membre concerné.</p><p class="signature">Signature : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_psytravail',
    name: "Accord de service de psychologie du travail et des organisations",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de prestation de psychologie du travail au profit d'une organisation ou entreprise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_organisation',label:"Nom de l'organisation cliente",type:'text',required:true},
      {key:'nom_psychologue',label:"Nom du psychologue du travail",type:'text',required:true},
      {key:'missions',label:"Description des missions",type:'textarea',required:true},
      {key:'duree_mission',label:"Duree de la mission",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - PSYCHOLOGIE DU TRAVAIL ET DES ORGANISATIONS</h1><p>Entre <strong>{{nom_organisation}}</strong> et le psychologue du travail <strong>{{nom_psychologue}}</strong>, pour une mission d'une duree de {{duree_mission}} debutant le {{date_debut}}.</p><h3>Missions confiees</h3><p>{{missions}}</p><h3>Deontologie</h3><p>Le psychologue intervient dans le respect strict du code de deontologie des psychologues. Il preserve l'independance de ses analyses et recommendations vis-a-vis de la direction de l'organisation.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_consultation_crise',
    name: "Accord de service de consultation de crise (urgence psychologique)",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Protocole d'intervention en cas de crise psychologique aigue, incluant un plan de securite individualise.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient en crise",type:'text',required:true},
      {key:'nom_intervenant',label:"Nom de l'intervenant de crise",type:'text',required:true},
      {key:'nature_crise',label:"Nature de la crise presentee",type:'textarea',required:true},
      {key:'plan_securite',label:"Plan de securite individualise",type:'textarea',required:true},
      {key:'date_intervention',label:"Date et heure de l'intervention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - CONSULTATION DE CRISE (URGENCE PSYCHOLOGIQUE)</h1><p>Intervention du <strong>{{nom_intervenant}}</strong> aupres de <strong>{{nom_patient}}</strong> le {{date_intervention}}.</p><h3>Nature de la crise</h3><p>{{nature_crise}}</p><h3>Plan de securite individualise</h3><p>{{plan_securite}}</p><h3>Suivi post-crise</h3><p>Un suivi rapproche sera organise dans les 72 heures suivant la crise. Les coordonnees d'urgence seront communiquees au patient et a son entourage de confiance.</p><p class="signature">Signature de l'intervenant : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_mediation_familiale',
    name: "Accord de service de mediation familiale psychologique",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de mediation familiale conduite par un psychologue mediateur pour resoudre les conflits familiaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_mediateur',label:"Nom du psychologue mediateur",type:'text',required:true},
      {key:'noms_parties',label:"Noms des parties en mediation",type:'text',required:true},
      {key:'objet_mediation',label:"Objet du conflit familial a medier",type:'textarea',required:true},
      {key:'nombre_seances',label:"Nombre de seances prevues",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MEDIATION FAMILIALE PSYCHOLOGIQUE</h1><p>Mediation conduite par <strong>{{nom_mediateur}}</strong> entre les parties : <strong>{{noms_parties}}</strong>, a compter du {{date_debut}} pour {{nombre_seances}} seance(s) prevue(s).</p><h3>Objet de la mediation</h3><p>{{objet_mediation}}</p><h3>Principes</h3><p>La mediation est volontaire, confidentielle et neutre. Les parties restent maitres de l'accord final. Le mediateur ne tranche pas mais facilite le dialogue et la recherche de solutions mutuellement acceptables.</p><p class="signature">Signatures des parties : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_soutien_aidants',
    name: "Accord de service de soutien aux aidants familiaux",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Programme de soutien psychologique destine aux aidants familiaux prenant soin d'un proche en situation de handicap ou de maladie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_aidant',label:"Nom de l'aidant familial",type:'text',required:true},
      {key:'nom_proche',label:"Nom du proche aide",type:'text',required:true},
      {key:'lien_aidant',label:"Lien de l'aidant avec le proche",type:'text',required:true},
      {key:'services_soutien',label:"Services de soutien proposes",type:'textarea',required:true},
      {key:'date_adhesion',label:"Date d'adhesion au programme",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - SOUTIEN AUX AIDANTS FAMILIAUX</h1><p>L'aidant familial <strong>{{nom_aidant}}</strong> ({{lien_aidant}} de {{nom_proche}}) s'inscrit au programme de soutien a compter du {{date_adhesion}}.</p><h3>Services de soutien</h3><p>{{services_soutien}}</p><h3>Objectif</h3><p>Ce programme vise a prevenir l'epuisement de l'aidant (burn-out de l'aidant), a lui offrir un espace de parole et des outils pratiques pour maintenir son equilibre psychologique tout en prenant soin de son proche.</p><p class="signature">Signature : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_ptsd',
    name: "Accord de service de prise en charge post-traumatique (PTSD)",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de traitement du trouble de stress post-traumatique (PTSD) incluant les approches EMDR et TCC trauma-centrees.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'type_trauma',label:"Nature de l'evenement traumatique",type:'textarea',required:true},
      {key:'nom_therapeute',label:"Nom du therapeute specialise",type:'text',required:true},
      {key:'approche_therapeutique',label:"Approche therapeutique choisie (EMDR, TCC, etc.)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du suivi",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRISE EN CHARGE POST-TRAUMATIQUE (PTSD)</h1><p>Entre le therapeute <strong>{{nom_therapeute}}</strong> et le patient <strong>{{nom_patient}}</strong>, a compter du {{date_debut}}.</p><h3>Nature du trauma</h3><p>{{type_trauma}}</p><h3>Approche therapeutique</h3><p>Methode retenue : <strong>{{approche_therapeutique}}</strong>. Le traitement visera a reduire les symptomes d'intrusion, d'hypervigilance et d'evitement, et a permettre une integration du trauma dans le recit de vie du patient.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_expertise_judiciaire',
    name: "Accord de service d'expertise psychiatrique judiciaire",
    category: 'sante', price: 9000, priceMax: 27000,
    description: "Convention d'expertise psychiatrique ordonnee par une juridiction en Cote d'Ivoire dans le cadre d'une procedure penale ou civile.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_expert',label:"Nom du psychiatre expert judiciaire",type:'text',required:true},
      {key:'nom_mis_en_cause',label:"Nom de la personne expertisee",type:'text',required:true},
      {key:'juridiction',label:"Juridiction mandante",type:'text',required:true},
      {key:'objet_expertise',label:"Objet de l'expertise",type:'textarea',required:true},
      {key:'date_mission',label:"Date de la mission d'expertise",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXPERTISE PSYCHIATRIQUE JUDICIAIRE</h1><p>Le psychiatre expert <strong>{{nom_expert}}</strong> est mandate par <strong>{{juridiction}}</strong> pour realiser une expertise concernant <strong>{{nom_mis_en_cause}}</strong>, en date du {{date_mission}}.</p><h3>Objet de l'expertise</h3><p>{{objet_expertise}}</p><h3>Obligations de l'expert</h3><p>L'expert s'engage a deposer son rapport dans le delai fixe par la juridiction, a respecter les principes d'impartialite et d'objectivite, et a repondre aux questions precisement posees par ordonnance de commission d'expert.</p><p class="signature">Signature de l'expert : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_partenariat_prive',
    name: "Accord de partenariat hopital-psychiatre prive",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Convention de partenariat entre un hopital public et un psychiatre prive pour la prise en charge partagee de patients.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'nom_hopital',label:"Nom de l'hopital public",type:'text',required:true},
      {key:'nom_psychiatre',label:"Nom du psychiatre prive",type:'text',required:true},
      {key:'modalites_partenariat',label:"Modalites du partenariat",type:'textarea',required:true},
      {key:'date_debut',label:"Date de debut du partenariat",type:'date',required:true},
      {key:'duree_accord',label:"Duree de l'accord",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT HOPITAL - PSYCHIATRE PRIVE</h1><p>Entre <strong>{{nom_hopital}}</strong> et le Dr <strong>{{nom_psychiatre}}</strong>, a compter du {{date_debut}} pour une duree de {{duree_accord}}.</p><h3>Modalites du partenariat</h3><p>{{modalites_partenariat}}</p><h3>Objectifs</h3><p>Ce partenariat vise a ameliorer l'acces aux soins psychiatriques, faciliter les hospitalisations d'urgence, et assurer la continuite des soins entre le secteur prive et le secteur public en Cote d'Ivoire.</p><p class="signature">Signatures des deux parties : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_accord_telepsychiatrie',
    name: "Accord de service de tele-psychiatrie (consultation en ligne)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention encadrant les consultations psychiatriques a distance par videoconference.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'nom_psychiatre',label:"Nom du psychiatre",type:'text',required:true},
      {key:'plateforme',label:"Plateforme de teleconsultation utilisee",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif de la seance (FCFA)",type:'text',required:true},
      {key:'date_premiere_seance',label:"Date de la premiere seance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TELE-PSYCHIATRIE</h1><p>Entre le Dr <strong>{{nom_psychiatre}}</strong> et le patient <strong>{{nom_patient}}</strong>, pour des consultations via la plateforme <strong>{{plateforme}}</strong>, debutant le {{date_premiere_seance}}, au tarif de {{tarif_seance}} FCFA par seance.</p><h3>Conditions</h3><p>Le patient dispose d'un acces a internet stable et d'un espace prive pour les consultations. En cas d'urgence psychiatrique, le patient s'engage a appeler les services d'urgence locaux ou a se rendre aux urgences de l'hopital le plus proche.</p><h3>Limites de la teleconsultation</h3><p>La tele-psychiatrie ne se substitue pas a une hospitalisation en cas de crise severe. Le psychiatre se reserve le droit d'orienter le patient vers une prise en charge en presentiel.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'psych_rapport_suivi',
    name: "Rapport de suivi psychiatrique",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Rapport periodique de suivi psychiatrique resume l'evolution clinique du patient sur une periode donnee.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'nom_psychiatre',label:"Nom du psychiatre redacteur",type:'text',required:true},
      {key:'periode_suivi',label:"Periode couverte par le rapport",type:'text',required:true},
      {key:'evolution_clinique',label:"Evolution clinique du patient",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SUIVI PSYCHIATRIQUE</h1><p>Redige par le Dr <strong>{{nom_psychiatre}}</strong> concernant le patient <strong>{{nom_patient}}</strong> - Periode couverte : {{periode_suivi}} - Date du rapport : {{date_rapport}}.</p><h3>Evolution clinique</h3><p>{{evolution_clinique}}</p><h3>Recommandations</h3><p>Ce rapport est un document medical confidentiel. Il ne peut etre transmis qu'au patient lui-meme, a son representant legal ou a un autre professionnel de sante dans le cadre du secret partage, conformement aux regles deontologiques en vigueur.</p><p class="signature">Signature du psychiatre : _________________ Dr _________________</p></div>`
  },
  {
    code: 'psych_plan_sante_mentale_comm',
    name: "Plan de sante mentale communautaire",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Document de planification strategique pour le developpement des services de sante mentale a l'echelle d'une communaute locale en Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_communaute',label:"Nom de la communaute ou du district",type:'text',required:true},
      {key:'porteur_projet',label:"Nom de l'organisation porteuse du projet",type:'text',required:true},
      {key:'diagnostic_situation',label:"Diagnostic de la situation en sante mentale",type:'textarea',required:true},
      {key:'plan_actions',label:"Plan d'actions et objectifs",type:'textarea',required:true},
      {key:'date_elaboration',label:"Date d'elaboration du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE SANTE MENTALE COMMUNAUTAIRE</h1><p>Document elabore par <strong>{{porteur_projet}}</strong> pour la communaute de <strong>{{nom_communaute}}</strong> en date du {{date_elaboration}}.</p><h3>Diagnostic</h3><p>{{diagnostic_situation}}</p><h3>Plan d'actions</h3><p>{{plan_actions}}</p><h3>Ancrage culturel</h3><p>Ce plan integre les dimensions culturelles et spirituelles propres aux societes africaines dans la comprehension et la prise en charge des troubles mentaux, en associant les guerisseurs traditionnels au dispositif de soin communautaire.</p></div>`
  },
  {
    code: 'psych_charte_sante_mentale_afrique',
    name: "Charte de la sante mentale en Afrique",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Charte d'engagement institutionnel pour la promotion de la sante mentale et la lutte contre la stigmatisation en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'nom_organisation',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'representant',label:"Nom du representant signataire",type:'text',required:true},
      {key:'engagements',label:"Engagements specifiques de l'organisation",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA SANTE MENTALE EN AFRIQUE</h1><p>L'organisation <strong>{{nom_organisation}}</strong>, representee par <strong>{{representant}}</strong>, signe la presente charte le {{date_signature}}.</p><h3>Principes fondamentaux</h3><p>Les signataires reconnaissent que la sante mentale est un droit fondamental, qu'elle fait partie integrante de la sante globale, et qu'elle merite une attention egale a celle accordee aux maladies physiques.</p><h3>Engagements specifiques</h3><p>{{engagements}}</p><h3>Lutte contre la stigmatisation</h3><p>Les signataires s'engagent a lutter activement contre la stigmatisation des personnes vivant avec des troubles mentaux et a promouvoir leur inclusion sociale et economique dans nos societes africaines.</p><p class="signature">Signature et cachet : _________________ Date : _________________</p></div>`
  },

  // ─── GERIATRIE / SOINS AUX PERSONNES AGEES (25) ─────────────────────────────
  {
    code: 'geriat_contrat_ehpad',
    name: "Contrat de service d'etablissement d'hebergement personnes agees (EHPAD Afrique)",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Contrat d'admission et de sejour dans un etablissement d'hebergement pour personnes agees dependantes en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'nom_resident',label:"Nom du resident",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'nom_etablissement',label:"Nom de l'etablissement (EHPAD)",type:'text',required:true},
      {key:'nom_referent_famille',label:"Nom du referent familial",type:'text',required:true},
      {key:'date_admission',label:"Date d'admission",type:'date',required:true},
      {key:'cout_mensuel',label:"Cout mensuel du sejour (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'HEBERGEMENT - PERSONNES AGEES DEPENDANTES</h1><p>L'etablissement <strong>{{nom_etablissement}}</strong> accueille le(la) resident(e) <strong>{{nom_resident}}</strong>, ne(e) le {{date_naissance}}, a compter du {{date_admission}}.</p><h3>Referent familial</h3><p>Contact famille : {{nom_referent_famille}}</p><h3>Conditions financieres</h3><p>Cout mensuel : <strong>{{cout_mensuel}} FCFA</strong>, payable en debut de mois.</p><h3>Droits du resident</h3><p>Le resident conserve l'exercice de ses droits civils. L'etablissement s'engage a respecter sa dignite, son autonomie et ses convictions religieuses et culturelles, conformement aux valeurs africaines de respect des aines.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_maison_retraite',
    name: "Accord de service de maison de retraite",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de sejour dans une maison de retraite privee ou associative en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_resident',label:"Nom du resident",type:'text',required:true},
      {key:'nom_maison_retraite',label:"Nom de la maison de retraite",type:'text',required:true},
      {key:'type_chambre',label:"Type de chambre (individuelle, double)",type:'text',required:true},
      {key:'pension_mensuelle',label:"Pension mensuelle (FCFA)",type:'text',required:true},
      {key:'date_entree',label:"Date d'entree",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - MAISON DE RETRAITE</h1><p>La maison de retraite <strong>{{nom_maison_retraite}}</strong> accueille <strong>{{nom_resident}}</strong> a compter du {{date_entree}} en chambre {{type_chambre}}, au tarif mensuel de {{pension_mensuelle}} FCFA.</p><h3>Prestations incluses</h3><p>Hebergement, restauration (3 repas par jour), animations culturelles et sociales, surveillance medicale de base et acces aux espaces communs.</p><h3>Engagement de qualite</h3><p>L'etablissement s'engage a traiter chaque resident avec dignite et bienveillance, dans le respect de son histoire de vie et de ses habitudes culturelles.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_accueil_jour',
    name: "Accord de service d'accueil de jour pour personnes agees",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention d'accueil de jour pour personnes agees permettant leur maintien a domicile tout en proposant des activites et un suivi.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom de la personne agee",type:'text',required:true},
      {key:'nom_structure',label:"Nom de la structure d'accueil de jour",type:'text',required:true},
      {key:'jours_accueil',label:"Jours d'accueil par semaine",type:'text',required:true},
      {key:'tarif_journalier',label:"Tarif journalier (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACCUEIL DE JOUR - PERSONNES AGEES</h1><p>La structure <strong>{{nom_structure}}</strong> accueille <strong>{{nom_beneficiaire}}</strong> a compter du {{date_debut}}, {{jours_accueil}} jour(s) par semaine, au tarif de {{tarif_journalier}} FCFA par jour.</p><h3>Programme de la journee</h3><p>Activites physiques adaptees, ateliers cognitifs, repas de midi equilibre, animations sociales et culturelles, suivi infirmier de base.</p><h3>Transport</h3><p>Le service de transport aller-retour peut etre organise sur demande de la famille, aux frais de celle-ci.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_soins_domicile',
    name: "Accord de service de soins a domicile personne agee",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de soins infirmiers et medicaux a domicile pour personne agee dependante.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'adresse_domicile',label:"Adresse du domicile",type:'text',required:true},
      {key:'nom_infirmier',label:"Nom de l'infirmier(e) ou de la structure",type:'text',required:true},
      {key:'soins_prescrits',label:"Description des soins prescrits",type:'textarea',required:true},
      {key:'date_debut',label:"Date de debut des soins",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOINS A DOMICILE - PERSONNE AGEE</h1><p>Le prestataire <strong>{{nom_infirmier}}</strong> intervient au domicile de <strong>{{nom_patient}}</strong> (adresse : {{adresse_domicile}}) a compter du {{date_debut}}.</p><h3>Soins prescrits</h3><p>{{soins_prescrits}}</p><h3>Responsabilites</h3><p>Les soins sont realises sur prescription medicale. Le prestataire tient un cahier de liaison disponible au domicile et informera immediatement le medecin traitant de tout changement d'etat de sante preoccupant.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_aide_domicile',
    name: "Accord de service d'aide a domicile (auxiliaire de vie)",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention d'intervention d'une auxiliaire de vie sociale aupres d'une personne agee a domicile.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom du beneficiaire",type:'text',required:true},
      {key:'nom_auxiliaire',label:"Nom de l'auxiliaire de vie",type:'text',required:true},
      {key:'heures_semaine',label:"Nombre d'heures d'intervention par semaine",type:'text',required:true},
      {key:'taches',label:"Description des taches confiees",type:'textarea',required:true},
      {key:'date_debut',label:"Date de debut de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'AIDE A DOMICILE - AUXILIAIRE DE VIE</h1><p>L'auxiliaire de vie <strong>{{nom_auxiliaire}}</strong> intervient aupres de <strong>{{nom_beneficiaire}}</strong> a raison de {{heures_semaine}} heures par semaine, a compter du {{date_debut}}.</p><h3>Taches confiees</h3><p>{{taches}}</p><h3>Conditions d'exercice</h3><p>L'auxiliaire de vie respecte le mode de vie, les habitudes et les croyances du beneficiaire. Elle/Il signale immediatement toute situation de maltraitance ou de mise en danger a l'organisme employeur et, le cas echeant, aux autorites competentes.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_portage_repas',
    name: "Accord de service de portage de repas a domicile",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Convention de service de livraison de repas equilibres a domicile pour personnes agees.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom du beneficiaire",type:'text',required:true},
      {key:'adresse_livraison',label:"Adresse de livraison",type:'text',required:true},
      {key:'nom_prestataire',label:"Nom du prestataire de portage",type:'text',required:true},
      {key:'frequence',label:"Frequence de livraison (ex: 5 repas/semaine)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PORTAGE DE REPAS A DOMICILE</h1><p>Le prestataire <strong>{{nom_prestataire}}</strong> assure la livraison de repas au domicile de <strong>{{nom_beneficiaire}}</strong> ({{adresse_livraison}}), a la frequence de {{frequence}}, a compter du {{date_debut}}.</p><h3>Qualite des repas</h3><p>Les repas sont prepares selon les regles d'hygiene alimentaire en vigueur, equilibres nutritionnellement et adaptees aux eventuelles restrictions alimentaires du beneficiaire. Les menus tiennent compte des habitudes culinaires locales.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_telesurveillance',
    name: "Accord de service de telesurveillance et telesecurite senior",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de service de telesurveillance pour seniors vivant seuls, avec dispositif d'alerte et assistance a distance.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom du beneficiaire senior",type:'text',required:true},
      {key:'nom_prestataire',label:"Nom du prestataire de telesurveillance",type:'text',required:true},
      {key:'contact_urgence',label:"Nom et telephone du contact en cas d'urgence",type:'text',required:true},
      {key:'equipements',label:"Equipements installes (bracelet, capteurs, etc.)",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation et d'activation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TELESURVEILLANCE ET TELESECURITE SENIOR</h1><p>Le service de telesurveillance est active pour <strong>{{nom_beneficiaire}}</strong> par le prestataire <strong>{{nom_prestataire}}</strong> le {{date_installation}}.</p><h3>Equipements</h3><p>{{equipements}}</p><h3>Contact d'urgence</h3><p>En cas d'alerte : {{contact_urgence}} sera immediatement prevenu. Le centre de telesurveillance est operationnel 24h/24 et 7j/7.</p><h3>Donnees personnelles</h3><p>Les donnees de sante collectees sont traitees confidentiellement et ne sont partagees qu'avec les services medicaux d'urgence en cas de declenchement d'alerte.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_garde_nuit',
    name: "Accord de service de garde de nuit senior",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de garde de nuit au domicile ou en etablissement pour personne agee necessitant une surveillance nocturne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom de la personne agee",type:'text',required:true},
      {key:'nom_gardien',label:"Nom du garde de nuit",type:'text',required:true},
      {key:'horaires',label:"Horaires de garde (ex: 20h-8h)",type:'text',required:true},
      {key:'nuits_par_semaine',label:"Nombre de nuits par semaine",type:'text',required:true},
      {key:'date_debut',label:"Date de debut de la garde",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GARDE DE NUIT SENIOR</h1><p>Le gardien de nuit <strong>{{nom_gardien}}</strong> assure la surveillance nocturne de <strong>{{nom_beneficiaire}}</strong> selon les horaires {{horaires}}, a raison de {{nuits_par_semaine}} nuit(s) par semaine, a compter du {{date_debut}}.</p><h3>Missions du gardien de nuit</h3><p>Surveillance, aide aux levers nocturnes, administration des medicaments prescrits pour la nuit, alerte immediate du medecin et de la famille en cas de degradation de l'etat de sante.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_soutien_psy_senior',
    name: "Accord de service de soutien psychologique senior",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de suivi psychologique specialise pour personnes agees (depression, deuil, isolement social).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom du beneficiaire",type:'text',required:true},
      {key:'nom_psychologue',label:"Nom du psychologue gerontoiogique",type:'text',required:true},
      {key:'motif_suivi',label:"Motif du suivi psychologique",type:'textarea',required:true},
      {key:'frequence',label:"Frequence des seances",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUTIEN PSYCHOLOGIQUE SENIOR</h1><p>Le psychologue <strong>{{nom_psychologue}}</strong> assure le suivi de <strong>{{nom_beneficiaire}}</strong>, a raison de {{frequence}}, a compter du {{date_debut}}.</p><h3>Motif du suivi</h3><p>{{motif_suivi}}</p><h3>Approche</h3><p>Le suivi s'appuie sur une approche bienveillante et adaptee aux realites des personnes agees en Afrique, integrant la valorisation de leur histoire de vie, de leur sagesse et de leur role social dans la famille elargie.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_kinesitherapie',
    name: "Accord de service de kinesitherapie geriatrique",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de soins de kinesitherapie specialisee en geriatrie pour maintien de la mobilite et prevention des chutes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'nom_kinesitherapeute',label:"Nom du kinesitherapeute",type:'text',required:true},
      {key:'pathologies',label:"Pathologies concernees",type:'text',required:true},
      {key:'programme',label:"Programme de reeducation",type:'textarea',required:true},
      {key:'date_debut',label:"Date de debut de la reeducation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE KINESITHERAPIE GERIATRIQUE</h1><p>Le kinesitherapeute <strong>{{nom_kinesitherapeute}}</strong> prend en charge le patient <strong>{{nom_patient}}</strong> (pathologies : {{pathologies}}) a compter du {{date_debut}}.</p><h3>Programme de reeducation</h3><p>{{programme}}</p><h3>Objectifs</h3><p>Maintien ou amelioration de la mobilite fonctionnelle, prevention des chutes, soulagement de la douleur, et preservation de l'independance dans les activites de la vie quotidienne.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_ergotherapie',
    name: "Accord de service d'ergotherapie geriatrique",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de suivi en ergotherapie pour adapter l'environnement de la personne agee et maintenir son autonomie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom du beneficiaire",type:'text',required:true},
      {key:'nom_ergotherapeute',label:"Nom de l'ergotherapeute",type:'text',required:true},
      {key:'objectifs_ergo',label:"Objectifs de la prise en charge ergotherapique",type:'textarea',required:true},
      {key:'amenagements',label:"Amenagements du domicile proposes",type:'textarea',required:true},
      {key:'date_evaluation',label:"Date de l'evaluation initiale",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ERGOTHERAPIE GERIATRIQUE</h1><p>L'ergotherapeute <strong>{{nom_ergotherapeute}}</strong> realise une evaluation et un suivi pour <strong>{{nom_beneficiaire}}</strong> a compter du {{date_evaluation}}.</p><h3>Objectifs</h3><p>{{objectifs_ergo}}</p><h3>Amenagements proposes</h3><p>{{amenagements}}</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_animation_gerontologique',
    name: "Accord de service d'animation gerontologique",
    category: 'sante', price: 3000, priceMax: 9000,
    description: "Convention de services d'animation et d'activites socioculturelles pour personnes agees en etablissement ou a domicile.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom ou groupe de beneficiaires",type:'text',required:true},
      {key:'nom_animateur',label:"Nom de l'animateur gerontologique",type:'text',required:true},
      {key:'programme_animation',label:"Programme d'animations propose",type:'textarea',required:true},
      {key:'frequence',label:"Frequence des animations",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ANIMATION GERONTOLOGIQUE</h1><p>L'animateur <strong>{{nom_animateur}}</strong> anime des activites pour <strong>{{nom_beneficiaire}}</strong>, a la frequence de {{frequence}}, a compter du {{date_debut}}.</p><h3>Programme d'animations</h3><p>{{programme_animation}}</p><h3>Benefices attendus</h3><p>Lutte contre l'isolement social, stimulation cognitive, maintien du lien intergenerationnel et valorisation de la memoire culturelle africaine a travers les contes, la musique traditionnelle et les jeux de societe.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_soins_palliatifs',
    name: "Accord de service de soins palliatifs (fin de vie)",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Convention de soins palliatifs et d'accompagnement en fin de vie pour patients atteints de maladies graves et incurables.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'nom_referent_famille',label:"Nom du referent familial",type:'text',required:true},
      {key:'nom_equipe_palliatifs',label:"Nom de l'equipe ou du medecin de soins palliatifs",type:'text',required:true},
      {key:'objectifs_soins',label:"Objectifs des soins palliatifs",type:'textarea',required:true},
      {key:'date_debut',label:"Date de debut de la prise en charge palliative",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOINS PALLIATIFS - ACCOMPAGNEMENT FIN DE VIE</h1><p>L'equipe de soins palliatifs <strong>{{nom_equipe_palliatifs}}</strong> accompagne le patient <strong>{{nom_patient}}</strong> et sa famille (referent : {{nom_referent_famille}}) a compter du {{date_debut}}.</p><h3>Objectifs de soins</h3><p>{{objectifs_soins}}</p><h3>Philosophie des soins palliatifs</h3><p>Les soins palliatifs affirment la vie et considèrent la mort comme un processus naturel. Ils visent a soulager la douleur et les autres symptomes, a soutenir psychologiquement et spirituellement le patient et ses proches, dans le respect des rites et croyances africaines.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_usp',
    name: "Accord de service d'unite de soins palliatifs (USP)",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Contrat d'admission dans une unite specialisee de soins palliatifs pour patients en fin de vie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'nom_usp',label:"Nom de l'unite de soins palliatifs",type:'text',required:true},
      {key:'date_admission',label:"Date d'admission a l'USP",type:'date',required:true},
      {key:'nom_medecin',label:"Nom du medecin responsable",type:'text',required:true},
      {key:'consentement_patient_famille',label:"Consentement du patient ou de la famille",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ADMISSION EN UNITE DE SOINS PALLIATIFS (USP)</h1><p>Le patient <strong>{{nom_patient}}</strong> est admis a l'USP <strong>{{nom_usp}}</strong> le {{date_admission}}, sous la responsabilite du Dr <strong>{{nom_medecin}}</strong>.</p><h3>Consentement</h3><p>{{consentement_patient_famille}}</p><h3>Droits fondamentaux</h3><p>Le patient a le droit de recevoir des soins visant au soulagement de sa douleur, le droit a l'information sur son etat de sante, le droit au respect de sa dignite et le droit d'etre accompagne par ses proches selon ses voeux.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_ssr',
    name: "Accord de service de soins de suite et de readaptation (SSR)",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de prise en charge en service de soins de suite et de readaptation apres hospitalisation pour personne agee.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'nom_service_ssr',label:"Nom du service SSR",type:'text',required:true},
      {key:'pathologie_initiale',label:"Pathologie ayant motive l'hospitalisation initiale",type:'text',required:true},
      {key:'programme_readaptation',label:"Programme de readaptation prevu",type:'textarea',required:true},
      {key:'date_entree',label:"Date d'entree en SSR",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOINS DE SUITE ET DE READAPTATION (SSR)</h1><p>Le service SSR <strong>{{nom_service_ssr}}</strong> prend en charge le patient <strong>{{nom_patient}}</strong> (pathologie initiale : {{pathologie_initiale}}) a compter du {{date_entree}}.</p><h3>Programme de readaptation</h3><p>{{programme_readaptation}}</p><h3>Objectif</h3><p>La readaptation vise au retour a domicile dans les meilleures conditions d'autonomie et de securite possibles, avec un bilan de sortie remis au patient et a son medecin traitant.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_protection_vulnerable',
    name: "Accord de protection de la personne vulnerable (tutelle, curatelle)",
    category: 'sante', price: 9000, priceMax: 27000,
    description: "Document encadrant la mise sous tutelle ou curatelle d'une personne agee vulnerableConformément au droit civil ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'nom_protege',label:"Nom de la personne protegee",type:'text',required:true},
      {key:'nom_tuteur',label:"Nom du tuteur ou curateur",type:'text',required:true},
      {key:'type_mesure',label:"Type de mesure (tutelle ou curatelle)",type:'text',required:true},
      {key:'juridiction',label:"Juridiction ayant ordonne la mesure",type:'text',required:true},
      {key:'date_jugement',label:"Date du jugement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROTECTION DE LA PERSONNE VULNERABLE</h1><h2>Mesure de {{type_mesure}}</h2><p>Par jugement de <strong>{{juridiction}}</strong> en date du {{date_jugement}}, <strong>{{nom_tuteur}}</strong> est designe(e) {{type_mesure}} de <strong>{{nom_protege}}</strong>.</p><h3>Obligations du tuteur/curateur</h3><p>Le tuteur ou curateur agit dans l'interet exclusif de la personne protegee, rend compte annuellement de la gestion des biens et respecte l'autonomie residuelle de la personne dans toute la mesure du possible, conformement au Code civil applicable en Cote d'Ivoire.</p><p class="signature">Signature du tuteur/curateur : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_mandat_protection',
    name: "Accord de mandat de protection future",
    category: 'sante', price: 8000, priceMax: 24000,
    description: "Mandat de protection future permettant a une personne de designer a l'avance un mandataire charge de la proteger si elle devient incapable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_mandant',label:"Nom du mandant",type:'text',required:true},
      {key:'nom_mandataire',label:"Nom du mandataire designe",type:'text',required:true},
      {key:'lien_mandataire',label:"Lien du mandataire avec le mandant",type:'text',required:true},
      {key:'etendue_mandat',label:"Etendue du mandat (biens, personne ou les deux)",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature du mandat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>MANDAT DE PROTECTION FUTURE</h1><p>Le mandant <strong>{{nom_mandant}}</strong> designe <strong>{{nom_mandataire}}</strong> (qualite : {{lien_mandataire}}) comme mandataire pour le proteger le cas echeant, par acte signe le {{date_signature}}.</p><h3>Etendue du mandat</h3><p>{{etendue_mandat}}</p><h3>Prise d'effet</h3><p>Le present mandat prend effet des lors qu'un certificat medical etabli par un medecin agree atteste que le mandant n'est plus en mesure de pourvoir seul a ses interets. Il est recommande de le faire authentifier par notaire pour une pleine valeur juridique.</p><p class="signature">Signatures des parties et du notaire : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_directives_anticipees',
    name: "Accord de directives anticipees (fin de vie)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Document par lequel une personne exprime ses volontes concernant les soins qu'elle souhaite ou ne souhaite pas recevoir en fin de vie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_auteur',label:"Nom de l'auteur des directives",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'volontes',label:"Expression des volontes de fin de vie",type:'textarea',required:true},
      {key:'nom_personne_confiance',label:"Nom de la personne de confiance designee",type:'text',required:true},
      {key:'date_redaction',label:"Date de redaction des directives",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DIRECTIVES ANTICIPEES DE FIN DE VIE</h1><p>Je soussigne(e) <strong>{{nom_auteur}}</strong>, ne(e) le {{date_naissance}}, redige les presentes directives en pleine capacite de discernement le {{date_redaction}}.</p><h3>Expression de mes volontes</h3><p>{{volontes}}</p><h3>Personne de confiance</h3><p>Je designe comme personne de confiance : <strong>{{nom_personne_confiance}}</strong>, habilitee a transmettre mes volontes aux professionnels de sante le moment venu.</p><p>Ce document peut etre revise ou annule a tout moment tant que j'en ai la capacite.</p><p class="signature">Signature de l'auteur : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_bilan_geriatrique',
    name: "Accord de service de bilan geriatrique complet",
    category: 'sante', price: 7000, priceMax: 21000,
    description: "Convention de realisation d'un bilan geriatrique global incluant evaluations medicale, fonctionnelle, nutritionnelle et psychosociale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'age',label:"Age du patient",type:'text',required:true},
      {key:'nom_geritre',label:"Nom du geriatre ou de l'equipe",type:'text',required:true},
      {key:'motif_bilan',label:"Motif de la demande de bilan",type:'textarea',required:true},
      {key:'date_bilan',label:"Date du bilan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE BILAN GERIATRIQUE COMPLET</h1><p>Bilan realise par <strong>{{nom_geritre}}</strong> pour le patient <strong>{{nom_patient}}</strong> ({{age}} ans) le {{date_bilan}}.</p><h3>Motif</h3><p>{{motif_bilan}}</p><h3>Composantes du bilan</h3><p>Evaluation medicale (comorbidites, traitements en cours), evaluation fonctionnelle (ADL, IADL), bilan cognitif (MMSE, test de l'horloge), evaluation nutritionnelle (MNA), bilan de la marche et du risque de chute, et evaluation psychosociale.</p><h3>Restitution</h3><p>Un compte rendu detaille sera remis au patient, a sa famille et a son medecin traitant sous 10 jours ouvrables.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_consultation_memoire',
    name: "Accord de service de consultation de memoire (Alzheimer)",
    category: 'sante', price: 6000, priceMax: 18000,
    description: "Convention de suivi dans une consultation memoire specialisee pour le diagnostic et la prise en charge de la maladie d'Alzheimer.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'nom_referent_famille',label:"Nom du referent familial",type:'text',required:true},
      {key:'nom_centre_memoire',label:"Nom du centre memoire",type:'text',required:true},
      {key:'stade_maladie',label:"Stade de la maladie (si connu)",type:'text',required:false},
      {key:'plan_suivi',label:"Plan de suivi et d'accompagnement",type:'textarea',required:true},
      {key:'date_premiere_consultation',label:"Date de la premiere consultation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSULTATION MEMOIRE - MALADIE D'ALZHEIMER</h1><p>Le centre memoire <strong>{{nom_centre_memoire}}</strong> assure le suivi de <strong>{{nom_patient}}</strong> (referent famille : {{nom_referent_famille}}) a compter du {{date_premiere_consultation}}. Stade : {{stade_maladie}}.</p><h3>Plan de suivi</h3><p>{{plan_suivi}}</p><h3>Accompagnement familial</h3><p>L'entourage est un partenaire essentiel. Des consultations d'aide aux aidants sont proposees parallelement. Une orientation vers des groupes de soutien familiaux sera proposee si necessaire.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_partenariat_famille',
    name: "Accord de partenariat maison de retraite-famille",
    category: 'sante', price: 4000, priceMax: 12000,
    description: "Convention de partenariat formalisant la collaboration entre la maison de retraite et la famille du resident pour garantir la qualite de vie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_etablissement',label:"Nom de l'etablissement",type:'text',required:true},
      {key:'nom_resident',label:"Nom du resident",type:'text',required:true},
      {key:'nom_famille',label:"Nom du referent familial",type:'text',required:true},
      {key:'engagements_etablissement',label:"Engagements de l'etablissement",type:'textarea',required:true},
      {key:'engagements_famille',label:"Engagements de la famille",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT MAISON DE RETRAITE - FAMILLE</h1><p>Entre l'etablissement <strong>{{nom_etablissement}}</strong> et la famille de <strong>{{nom_resident}}</strong> (representee par {{nom_famille}}).</p><h3>Engagements de l'etablissement</h3><p>{{engagements_etablissement}}</p><h3>Engagements de la famille</h3><p>{{engagements_famille}}</p><h3>Communication</h3><p>Un bilan mensuel de l'etat de sante et du bien-etre du resident sera communique a la famille. Toute situation urgente fera l'objet d'une information immediate par telephone.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_accord_financement_cnps',
    name: "Accord de financement soins personnes agees (CNPS CI)",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Convention de prise en charge financiere des soins geriatriques avec la Caisse Nationale de Prevoyance Sociale de Cote d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'nom_assure',label:"Nom de l'assure CNPS",type:'text',required:true},
      {key:'numero_cnps',label:"Numero d'immatriculation CNPS",type:'text',required:true},
      {key:'nom_etablissement',label:"Nom de l'etablissement de soins",type:'text',required:true},
      {key:'prestations_prises_en_charge',label:"Prestations couvertes par la CNPS",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT DES SOINS - CNPS COTE D'IVOIRE</h1><p>Accord entre la CNPS, l'etablissement <strong>{{nom_etablissement}}</strong> et l'assure <strong>{{nom_assure}}</strong> (N° CNPS : {{numero_cnps}}), en date du {{date_accord}}.</p><h3>Prestations couvertes</h3><p>{{prestations_prises_en_charge}}</p><h3>Modalites de remboursement</h3><p>Les prestations sont remboursees selon les tarifs de la nomenclature CNPS en vigueur. La facture originale et les justificatifs de soins devront etre soumis dans un delai de 90 jours suivant la prestation.</p><p class="signature">Signatures : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_rapport_suivi',
    name: "Rapport de suivi geriatrique",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Rapport periodique de suivi geriatrique documentant l'evolution de l'etat de sante et du niveau d'autonomie du patient age.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_patient',label:"Nom du patient",type:'text',required:true},
      {key:'nom_geriatre',label:"Nom du geriatre ou du medecin referent",type:'text',required:true},
      {key:'periode_rapport',label:"Periode couverte par le rapport",type:'text',required:true},
      {key:'evolution_etat',label:"Evolution de l'etat de sante et de l'autonomie",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SUIVI GERIATRIQUE</h1><p>Rapport redige par <strong>{{nom_geriatre}}</strong> pour le patient <strong>{{nom_patient}}</strong> - Periode : {{periode_rapport}} - Date : {{date_rapport}}.</p><h3>Evolution</h3><p>{{evolution_etat}}</p><h3>Recommandations</h3><p>Ce rapport est transmis au patient, a sa famille et, avec accord du patient, aux autres professionnels de sante impliques dans sa prise en charge globale (medecin traitant, specialistes, infirmiers a domicile).</p><p class="signature">Signature du geriatre : _________________ Date : _________________</p></div>`
  },
  {
    code: 'geriat_plan_developpement_ehpad',
    name: "Plan de developpement etablissement pour personnes agees",
    category: 'sante', price: 9000, priceMax: 27000,
    description: "Document de planification strategique pour le developpement et l'amelioration d'un etablissement geriatrique en Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_etablissement',label:"Nom de l'etablissement",type:'text',required:true},
      {key:'directeur',label:"Nom du directeur",type:'text',required:true},
      {key:'diagnostic',label:"Diagnostic de l'existant",type:'textarea',required:true},
      {key:'axes_developpement',label:"Axes strategiques de developpement",type:'textarea',required:true},
      {key:'date_elaboration',label:"Date d'elaboration du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DEVELOPPEMENT - ETABLISSEMENT POUR PERSONNES AGEES</h1><p>Elabore par la direction de <strong>{{nom_etablissement}}</strong> (Directeur : {{directeur}}) en date du {{date_elaboration}}.</p><h3>Diagnostic de l'existant</h3><p>{{diagnostic}}</p><h3>Axes strategiques</h3><p>{{axes_developpement}}</p><h3>Contexte</h3><p>Ce plan s'inscrit dans la dynamique de developpement de la prise en charge des personnes agees en Afrique, tenant compte des specificites culturelles, de la progression du vieillissement demographique et des politiques de sante publique en Cote d'Ivoire.</p></div>`
  },
  {
    code: 'geriat_charte_bien_vieillir',
    name: "Charte du bien-vieillir et de la dignite de la personne agee",
    category: 'sante', price: 5000, priceMax: 15000,
    description: "Charte d'engagement pour le respect et la dignite des personnes agees en Afrique, signee par des etablissements et professionnels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_signataire',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'representant_legal',label:"Nom du representant legal",type:'text',required:true},
      {key:'engagements_specifiques',label:"Engagements specifiques de l'organisation",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU BIEN-VIEILLIR ET DE LA DIGNITE DE LA PERSONNE AGEE</h1><p>L'organisation <strong>{{nom_signataire}}</strong>, representee par <strong>{{representant_legal}}</strong>, signe la presente charte le {{date_signature}}.</p><h3>Valeurs fondamentales</h3><p>En Afrique, les anciens sont les garants de la memoire collective et les piliers de la communaute. Nous affirmons que chaque personne agee merite respect, bienveillance, soins adaptes et inclusion sociale, quel que soit son niveau de dependance.</p><h3>Engagements</h3><p>{{engagements_specifiques}}</p><h3>Lutte contre la maltraitance</h3><p>Les signataires s'engagent a prevenir et a signaler toute forme de maltraitance physique, psychologique, financiere ou par negligence envers les personnes agees, conformement aux obligations legales en vigueur en Cote d'Ivoire.</p><p class="signature">Cachet et signature : _________________ Date : _________________</p></div>`
  }
];

async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 86a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
