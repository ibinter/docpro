import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  { code: 'etfp_contrat_apprentissage_alternance', name: "Contrat d'apprentissage en alternance", category: 'academique', price: 4000, priceMax: 12000,
    description: "Contrat réglementant l'apprentissage en alternance entre un apprenti, un maître d'apprentissage et un centre de formation professionnelle agréé ETFP.", templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_apprenti',label:"Nom et prénoms de l'apprenti",type:'text',required:true},
      {key:'nom_maitre',label:"Nom du maître d'apprentissage",type:'text',required:true},
      {key:'entreprise',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'centre_formation',label:"Centre de formation professionnelle",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'metier',label:"Métier ou filière de formation",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'APPRENTISSAGE EN ALTERNANCE</h1><p>Entre l'entreprise <strong>{{entreprise}}</strong> représentée par <strong>{{nom_maitre}}</strong>, maître d'apprentissage, et l'apprenti <strong>{{nom_apprenti}}</strong>, en partenariat avec le centre de formation <strong>{{centre_formation}}</strong>, il est convenu un contrat d'apprentissage en alternance pour la filière <strong>{{metier}}</strong>, prenant effet le <strong>{{date_debut}}</strong>. Les parties s'engagent à respecter les dispositions du Code du Travail ivoirien et du cahier des charges ETFP.</p></div>` },

  { code: 'etfp_convention_stage_longue_duree', name: "Convention de stage professionnel longue durée", category: 'academique', price: 3000, priceMax: 9000,
    description: "Convention encadrant un stage professionnel de longue durée dans le cadre d'une formation technique et professionnelle en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_stagiaire',label:"Nom et prénoms du stagiaire",type:'text',required:true},
      {key:'etablissement',label:"Établissement de formation",type:'text',required:true},
      {key:'entreprise_accueil',label:"Entreprise d'accueil",type:'text',required:true},
      {key:'date_debut',label:"Date de début du stage",type:'date',required:true},
      {key:'date_fin',label:"Date de fin du stage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE STAGE PROFESSIONNEL LONGUE DURÉE</h1><p>La présente convention est conclue entre l'établissement de formation <strong>{{etablissement}}</strong> et l'entreprise d'accueil <strong>{{entreprise_accueil}}</strong>, pour accueillir le stagiaire <strong>{{nom_stagiaire}}</strong> du <strong>{{date_debut}}</strong> au <strong>{{date_fin}}</strong>. Les parties s'engagent à assurer les conditions optimales d'apprentissage conformément aux normes ETFP ivoiriennes.</p></div>` },

  { code: 'etfp_protocole_pfmp', name: "Protocole de formation en milieu professionnel (PFMP)", category: 'academique', price: 3500, priceMax: 10000,
    description: "Protocole officiel encadrant la période de formation en milieu professionnel (PFMP) pour les apprenants en formation technique et professionnelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'apprenant',label:"Nom et prénoms de l'apprenant",type:'text',required:true},
      {key:'etablissement',label:"Établissement ETFP",type:'text',required:true},
      {key:'entreprise',label:"Entreprise partenaire",type:'text',required:true},
      {key:'periode',label:"Période de la PFMP",type:'text',required:true},
      {key:'objectifs',label:"Objectifs pédagogiques de la PFMP",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE FORMATION EN MILIEU PROFESSIONNEL (PFMP)</h1><p>Ce protocole définit les modalités de la période de formation en milieu professionnel pour l'apprenant <strong>{{apprenant}}</strong> de l'établissement <strong>{{etablissement}}</strong> au sein de l'entreprise <strong>{{entreprise}}</strong> durant la période <strong>{{periode}}</strong>. Objectifs pédagogiques : <em>{{objectifs}}</em>.</p></div>` },

  { code: 'etfp_carnet_liaison_apprenti', name: "Carnet de liaison apprenti-maître", category: 'academique', price: 2000, priceMax: 6000,
    description: "Carnet de liaison officiel assurant le suivi et la communication entre l'apprenti, le maître d'apprentissage et le formateur du centre ETFP.", templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_apprenti',label:"Nom et prénoms de l'apprenti",type:'text',required:true},
      {key:'nom_maitre',label:"Nom du maître d'apprentissage",type:'text',required:true},
      {key:'periode_suivi',label:"Période de suivi",type:'text',required:true},
      {key:'observations',label:"Observations et remarques",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CARNET DE LIAISON APPRENTI-MAÎTRE</h1><p>Apprenti : <strong>{{nom_apprenti}}</strong> | Maître d'apprentissage : <strong>{{nom_maitre}}</strong></p><p>Période de suivi : <strong>{{periode_suivi}}</strong></p><p>Observations : <em>{{observations}}</em></p></div>` },

  { code: 'etfp_evaluation_ecf', name: "Évaluation en cours de formation (ECF)", category: 'academique', price: 2500, priceMax: 7500,
    description: "Fiche d'évaluation en cours de formation (ECF) pour les apprenants des filières techniques et professionnelles selon le référentiel ETFP.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_apprenant',label:"Nom et prénoms de l'apprenant",type:'text',required:true},
      {key:'filiere',label:"Filière de formation",type:'text',required:true},
      {key:'date_evaluation',label:"Date de l'évaluation",type:'date',required:true},
      {key:'competences_evaluees',label:"Compétences évaluées",type:'textarea',required:true},
      {key:'note',label:"Note obtenue et appréciation",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ÉVALUATION EN COURS DE FORMATION (ECF)</h1><p>Apprenant : <strong>{{nom_apprenant}}</strong> | Filière : <strong>{{filiere}}</strong></p><p>Date : <strong>{{date_evaluation}}</strong></p><p>Compétences évaluées : <em>{{competences_evaluees}}</em></p><p>Note et appréciation : <strong>{{note}}</strong></p></div>` },

  { code: 'etfp_reglement_interieur_cfp', name: "Règlement intérieur centre de formation professionnelle", category: 'academique', price: 5000, priceMax: 15000,
    description: "Règlement intérieur complet d'un centre de formation professionnelle agréé, fixant les droits et obligations des apprenants, formateurs et personnels administratifs.", templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_centre',label:"Nom du centre de formation",type:'text',required:true},
      {key:'directeur',label:"Nom du directeur",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption du règlement",type:'date',required:true},
      {key:'adresse',label:"Adresse du centre",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RÈGLEMENT INTÉRIEUR</h1><h2>{{nom_centre}}</h2><p>Adopté le <strong>{{date_adoption}}</strong> sous la direction de <strong>{{directeur}}</strong>, sis à <strong>{{adresse}}</strong>. Le présent règlement intérieur s'applique à l'ensemble des apprenants, formateurs et personnels du centre, conformément aux textes en vigueur régissant l'enseignement technique et la formation professionnelle en Côte d'Ivoire.</p></div>` },

  { code: 'etfp_convention_centre_agree', name: "Convention de centre de formation agréé", category: 'academique', price: 6000, priceMax: 18000,
    description: "Convention officielle d'agrément d'un centre de formation professionnelle par le Ministère de la Formation Professionnelle et de l'Apprentissage de Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_centre',label:"Dénomination du centre",type:'text',required:true},
      {key:'promoteur',label:"Nom du promoteur",type:'text',required:true},
      {key:'filiere_agree',label:"Filière(s) agréée(s)",type:'textarea',required:true},
      {key:'date_agrement',label:"Date d'agrément",type:'date',required:true},
      {key:'numero_agrement',label:"Numéro d'agrément",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CENTRE DE FORMATION AGRÉÉ</h1><p>Le Ministère en charge de la Formation Professionnelle accorde l'agrément n° <strong>{{numero_agrement}}</strong> au centre <strong>{{nom_centre}}</strong>, sous la conduite de <strong>{{promoteur}}</strong>, pour les filières suivantes : <em>{{filiere_agree}}</em>, à compter du <strong>{{date_agrement}}</strong>.</p></div>` },

  { code: 'etfp_demande_ouverture_filiere', name: "Demande d'ouverture de filière ETFP", category: 'academique', price: 4000, priceMax: 12000,
    description: "Dossier de demande officielle d'ouverture d'une nouvelle filière dans un centre d'enseignement technique et de formation professionnelle en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_centre',label:"Nom du centre demandeur",type:'text',required:true},
      {key:'filiere_souhaitee',label:"Filière souhaitée",type:'text',required:true},
      {key:'justification',label:"Justification de la demande",type:'textarea',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true},
      {key:'responsable',label:"Responsable pédagogique",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>DEMANDE D'OUVERTURE DE FILIÈRE ETFP</h1><p>Le centre <strong>{{nom_centre}}</strong>, sous la responsabilité de <strong>{{responsable}}</strong>, sollicite en date du <strong>{{date_demande}}</strong> l'autorisation d'ouvrir la filière <strong>{{filiere_souhaitee}}</strong>. Justification : <em>{{justification}}</em>.</p></div>` },

  { code: 'etfp_plan_pedagogique_formation', name: "Plan pédagogique de formation professionnelle", category: 'academique', price: 5000, priceMax: 15000,
    description: "Document structurant le plan pédagogique d'une formation professionnelle, définissant les objectifs, les modules, la progression et les méthodes d'évaluation.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'intitule_formation',label:"Intitulé de la formation",type:'text',required:true},
      {key:'duree',label:"Durée totale de la formation",type:'text',required:true},
      {key:'modules',label:"Liste des modules de formation",type:'textarea',required:true},
      {key:'methodes_evaluation',label:"Méthodes d'évaluation",type:'textarea',required:true},
      {key:'date_elaboration',label:"Date d'élaboration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN PÉDAGOGIQUE DE FORMATION PROFESSIONNELLE</h1><h2>{{intitule_formation}}</h2><p>Durée : <strong>{{duree}}</strong> | Date d'élaboration : <strong>{{date_elaboration}}</strong></p><p>Modules : <em>{{modules}}</em></p><p>Méthodes d'évaluation : <em>{{methodes_evaluation}}</em></p></div>` },

  { code: 'etfp_programme_formation_competences', name: "Programme de formation par compétences", category: 'academique', price: 5500, priceMax: 16000,
    description: "Programme de formation structuré selon l'approche par compétences (APC), aligné sur les référentiels métiers et les besoins du marché du travail ivoirien.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'metier',label:"Métier visé",type:'text',required:true},
      {key:'niveau',label:"Niveau de qualification",type:'text',required:true},
      {key:'competences_cles',label:"Compétences clés à développer",type:'textarea',required:true},
      {key:'duree_programme',label:"Durée du programme",type:'text',required:true},
      {key:'organisme',label:"Organisme de formation",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PROGRAMME DE FORMATION PAR COMPÉTENCES</h1><p>Métier : <strong>{{metier}}</strong> | Niveau : <strong>{{niveau}}</strong> | Durée : <strong>{{duree_programme}}</strong></p><p>Organisme : <strong>{{organisme}}</strong></p><p>Compétences clés : <em>{{competences_cles}}</em></p></div>` },

  { code: 'etfp_referentiel_formation_metier', name: "Référentiel de formation métier", category: 'academique', price: 6000, priceMax: 18000,
    description: "Référentiel officiel de formation pour un métier donné, décrivant les activités professionnelles, les compétences associées et les critères d'évaluation ETFP.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'metier',label:"Intitulé du métier",type:'text',required:true},
      {key:'activites_principales',label:"Activités principales du métier",type:'textarea',required:true},
      {key:'competences',label:"Compétences associées",type:'textarea',required:true},
      {key:'criteres_evaluation',label:"Critères d'évaluation",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RÉFÉRENTIEL DE FORMATION MÉTIER</h1><h2>{{metier}}</h2><p>Activités principales : <em>{{activites_principales}}</em></p><p>Compétences : <em>{{competences}}</em></p><p>Critères d'évaluation : <em>{{criteres_evaluation}}</em></p></div>` },

  { code: 'etfp_certificat_qualification_cqp', name: "Certificat de qualification professionnelle (CQP)", category: 'academique', price: 4000, priceMax: 12000,
    description: "Certificat de qualification professionnelle (CQP) attestant la maîtrise des compétences requises pour l'exercice d'un métier, délivré dans le cadre du dispositif ETFP.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_titulaire',label:"Nom et prénoms du titulaire",type:'text',required:true},
      {key:'metier_certifie',label:"Métier certifié",type:'text',required:true},
      {key:'organisme_certificateur',label:"Organisme certificateur",type:'text',required:true},
      {key:'date_delivrance',label:"Date de délivrance",type:'date',required:true},
      {key:'numero_cqp',label:"Numéro du CQP",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CERTIFICAT DE QUALIFICATION PROFESSIONNELLE (CQP)</h1><p>Il est certifié que <strong>{{nom_titulaire}}</strong> a satisfait aux exigences du CQP n° <strong>{{numero_cqp}}</strong> pour le métier de <strong>{{metier_certifie}}</strong>, délivré par <strong>{{organisme_certificateur}}</strong> le <strong>{{date_delivrance}}</strong>.</p></div>` },

  { code: 'etfp_diplome_attestation_competences', name: "Diplôme professionnel — attestation de compétences", category: 'academique', price: 3500, priceMax: 10000,
    description: "Attestation officielle de compétences professionnelles acquises, délivrée à l'issue d'une formation technique et professionnelle agréée en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom et prénoms du bénéficiaire",type:'text',required:true},
      {key:'competences_acquises',label:"Compétences acquises",type:'textarea',required:true},
      {key:'centre_delivreur',label:"Centre de formation délivrant",type:'text',required:true},
      {key:'date_delivrance',label:"Date de délivrance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ATTESTATION DE COMPÉTENCES PROFESSIONNELLES</h1><p><strong>{{centre_delivreur}}</strong> atteste que <strong>{{nom_beneficiaire}}</strong> a acquis les compétences suivantes le <strong>{{date_delivrance}}</strong> :</p><p><em>{{competences_acquises}}</em></p></div>` },

  { code: 'etfp_rapport_visite_inspection', name: "Rapport de visite d'inspection ETFP", category: 'academique', price: 4500, priceMax: 13000,
    description: "Rapport officiel de visite d'inspection d'un établissement d'enseignement technique et de formation professionnelle, établi par l'inspecteur compétent.", templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_etablissement',label:"Nom de l'établissement inspecté",type:'text',required:true},
      {key:'inspecteur',label:"Nom de l'inspecteur",type:'text',required:true},
      {key:'date_visite',label:"Date de la visite",type:'date',required:true},
      {key:'constats',label:"Constats et observations",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE VISITE D'INSPECTION ETFP</h1><p>Établissement : <strong>{{nom_etablissement}}</strong> | Inspecteur : <strong>{{inspecteur}}</strong> | Date : <strong>{{date_visite}}</strong></p><p>Constats : <em>{{constats}}</em></p><p>Recommandations : <em>{{recommandations}}</em></p></div>` },

  { code: 'etfp_convention_partenariat_ecole_entreprise', name: "Convention de partenariat école-entreprise", category: 'academique', price: 5000, priceMax: 15000,
    description: "Convention formalisant le partenariat entre un établissement d'enseignement technique et une entreprise, définissant les modalités de collaboration pédagogique et professionnelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'etablissement',label:"Établissement ETFP",type:'text',required:true},
      {key:'entreprise',label:"Entreprise partenaire",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'duree_convention',label:"Durée de la convention",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT ÉCOLE-ENTREPRISE</h1><p>Entre l'établissement <strong>{{etablissement}}</strong> et l'entreprise <strong>{{entreprise}}</strong>, il est établi la présente convention de partenariat en date du <strong>{{date_signature}}</strong>, valable pour une durée de <strong>{{duree_convention}}</strong>. Objet : <em>{{objet_partenariat}}</em>.</p></div>` },

  { code: 'etfp_accord_transfert_competences', name: "Accord de transfert de compétences", category: 'academique', price: 5500, priceMax: 16000,
    description: "Accord encadrant le transfert de compétences techniques et professionnelles entre une organisation experte et un centre de formation professionnelle bénéficiaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'organisme_source',label:"Organisme source des compétences",type:'text',required:true},
      {key:'organisme_beneficiaire',label:"Organisme bénéficiaire",type:'text',required:true},
      {key:'competences_transferees',label:"Compétences à transférer",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'modalites',label:"Modalités de transfert",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSFERT DE COMPÉTENCES</h1><p>Entre <strong>{{organisme_source}}</strong> et <strong>{{organisme_beneficiaire}}</strong>, le présent accord, signé le <strong>{{date_accord}}</strong>, définit les modalités de transfert des compétences suivantes : <em>{{competences_transferees}}</em>. Modalités : <em>{{modalites}}</em>.</p></div>` },

  { code: 'etfp_contrat_formateur_vacataire', name: "Contrat de formateur vacataire ETFP", category: 'academique', price: 3500, priceMax: 10000,
    description: "Contrat de travail à durée déterminée pour un formateur vacataire intervenant dans un centre d'enseignement technique et de formation professionnelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_formateur',label:"Nom et prénoms du formateur",type:'text',required:true},
      {key:'specialite',label:"Spécialité enseignée",type:'text',required:true},
      {key:'centre',label:"Centre de formation employeur",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'remuneration',label:"Rémunération horaire (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FORMATEUR VACATAIRE ETFP</h1><p>Le centre de formation <strong>{{centre}}</strong> engage en qualité de formateur vacataire <strong>{{nom_formateur}}</strong>, spécialiste en <strong>{{specialite}}</strong>, à compter du <strong>{{date_debut}}</strong>, à raison d'une rémunération de <strong>{{remuneration}}</strong> FCFA de l'heure.</p></div>` },

  { code: 'etfp_fiche_evaluation_stage_entreprise', name: "Fiche d'évaluation de stage en entreprise", category: 'academique', price: 2500, priceMax: 7000,
    description: "Fiche d'évaluation renseignée par le tuteur en entreprise pour apprécier les performances et le comportement professionnel du stagiaire ETFP.", templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_stagiaire',label:"Nom et prénoms du stagiaire",type:'text',required:true},
      {key:'entreprise',label:"Entreprise d'accueil",type:'text',required:true},
      {key:'tuteur',label:"Nom du tuteur entreprise",type:'text',required:true},
      {key:'periode',label:"Période du stage",type:'text',required:true},
      {key:'appreciation',label:"Appréciation globale et commentaires",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>FICHE D'ÉVALUATION DE STAGE EN ENTREPRISE</h1><p>Stagiaire : <strong>{{nom_stagiaire}}</strong> | Entreprise : <strong>{{entreprise}}</strong> | Tuteur : <strong>{{tuteur}}</strong></p><p>Période : <strong>{{periode}}</strong></p><p>Appréciation : <em>{{appreciation}}</em></p></div>` },

  { code: 'etfp_rapport_fin_formation_apprenti', name: "Rapport de fin de formation apprenti", category: 'academique', price: 3000, priceMax: 9000,
    description: "Rapport de fin de formation rédigé par l'apprenti à l'issue de son parcours en alternance, synthétisant les compétences acquises et les expériences professionnelles.", templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_apprenti',label:"Nom et prénoms de l'apprenti",type:'text',required:true},
      {key:'filiere',label:"Filière de formation",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'bilan_competences',label:"Bilan des compétences acquises",type:'textarea',required:true},
      {key:'perspectives',label:"Perspectives professionnelles",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE FIN DE FORMATION</h1><p>Apprenti : <strong>{{nom_apprenti}}</strong> | Filière : <strong>{{filiere}}</strong> | Date : <strong>{{date_rapport}}</strong></p><p>Bilan : <em>{{bilan_competences}}</em></p><p>Perspectives : <em>{{perspectives}}</em></p></div>` },

  { code: 'etfp_attestation_maitre_apprentissage', name: "Attestation de maître d'apprentissage", category: 'academique', price: 2500, priceMax: 7000,
    description: "Attestation certifiant qu'une personne est habilitée à exercer la fonction de maître d'apprentissage dans le cadre du dispositif ETFP ivoirien.", templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_maitre',label:"Nom et prénoms du maître d'apprentissage",type:'text',required:true},
      {key:'entreprise',label:"Entreprise employeur",type:'text',required:true},
      {key:'metier',label:"Métier concerné",type:'text',required:true},
      {key:'date_delivrance',label:"Date de délivrance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ATTESTATION DE MAÎTRE D'APPRENTISSAGE</h1><p>Il est attesté que <strong>{{nom_maitre}}</strong>, employé(e) au sein de l'entreprise <strong>{{entreprise}}</strong>, est reconnu(e) maître d'apprentissage pour le métier de <strong>{{metier}}</strong>, à compter du <strong>{{date_delivrance}}</strong>.</p></div>` },

  { code: 'etfp_convention_financement_apprentissage', name: "Convention de financement formation apprentissage", category: 'academique', price: 6000, priceMax: 18000,
    description: "Convention définissant les modalités de financement d'une formation en apprentissage entre l'entreprise, le centre de formation et éventuellement un fonds de financement.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise finançant la formation",type:'text',required:true},
      {key:'centre_formation',label:"Centre de formation bénéficiaire",type:'text',required:true},
      {key:'montant_financement',label:"Montant du financement (FCFA)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true},
      {key:'modalites_paiement',label:"Modalités de paiement",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FINANCEMENT FORMATION APPRENTISSAGE</h1><p>L'entreprise <strong>{{entreprise}}</strong> s'engage à financer la formation du centre <strong>{{centre_formation}}</strong> à hauteur de <strong>{{montant_financement}}</strong> FCFA selon les modalités suivantes : <em>{{modalites_paiement}}</em>. Signée le <strong>{{date_convention}}</strong>.</p></div>` },

  { code: 'etfp_accord_taxe_apprentissage', name: "Accord de contribution taxe apprentissage", category: 'academique', price: 5000, priceMax: 15000,
    description: "Accord formalisant la contribution d'une entreprise au titre de la taxe d'apprentissage, désignant le(s) centre(s) de formation bénéficiaire(s) conformément à la législation ivoirienne.", templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'montant_taxe',label:"Montant de la taxe d'apprentissage (FCFA)",type:'text',required:true},
      {key:'beneficiaires',label:"Centres de formation bénéficiaires",type:'textarea',required:true},
      {key:'exercice_fiscal',label:"Exercice fiscal concerné",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONTRIBUTION TAXE D'APPRENTISSAGE</h1><p>L'entreprise <strong>{{entreprise}}</strong> déclare sa contribution de <strong>{{montant_taxe}}</strong> FCFA au titre de la taxe d'apprentissage pour l'exercice <strong>{{exercice_fiscal}}</strong>, répartie entre les centres suivants : <em>{{beneficiaires}}</em>.</p></div>` },

  { code: 'etfp_plan_developpement_competences', name: "Plan de développement des compétences entreprise", category: 'academique', price: 6000, priceMax: 18000,
    description: "Document stratégique définissant le plan de développement des compétences des salariés d'une entreprise, incluant les actions de formation prévues et leur financement.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'annee',label:"Année du plan",type:'text',required:true},
      {key:'effectif',label:"Effectif concerné",type:'text',required:true},
      {key:'actions_formation',label:"Actions de formation planifiées",type:'textarea',required:true},
      {key:'budget',label:"Budget alloué (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DES COMPÉTENCES</h1><h2>{{entreprise}} — Année {{annee}}</h2><p>Effectif concerné : <strong>{{effectif}}</strong> | Budget : <strong>{{budget}}</strong> FCFA</p><p>Actions de formation : <em>{{actions_formation}}</em></p></div>` },

  { code: 'etfp_bilan_competences_individuel', name: "Bilan de compétences individuel", category: 'academique', price: 4000, priceMax: 12000,
    description: "Document de bilan individuel des compétences professionnelles et personnelles d'un salarié ou d'un demandeur d'emploi, en vue d'une orientation ou d'une reconversion professionnelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom et prénoms du bénéficiaire",type:'text',required:true},
      {key:'parcours_professionnel',label:"Parcours professionnel",type:'textarea',required:true},
      {key:'competences_identifiees',label:"Compétences identifiées",type:'textarea',required:true},
      {key:'projet_professionnel',label:"Projet professionnel envisagé",type:'textarea',required:true},
      {key:'date_bilan',label:"Date du bilan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BILAN DE COMPÉTENCES INDIVIDUEL</h1><p>Bénéficiaire : <strong>{{nom_beneficiaire}}</strong> | Date : <strong>{{date_bilan}}</strong></p><p>Parcours : <em>{{parcours_professionnel}}</em></p><p>Compétences identifiées : <em>{{competences_identifiees}}</em></p><p>Projet professionnel : <em>{{projet_professionnel}}</em></p></div>` },

  { code: 'etfp_passeport_competences', name: "Passeport de compétences professionnel", category: 'academique', price: 3000, priceMax: 9000,
    description: "Passeport de compétences récapitulant l'ensemble des formations suivies, des certifications obtenues et des expériences professionnelles d'un individu dans le cadre du dispositif ETFP.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_titulaire',label:"Nom et prénoms du titulaire",type:'text',required:true},
      {key:'formations_suivies',label:"Formations suivies et certifications",type:'textarea',required:true},
      {key:'experiences',label:"Expériences professionnelles",type:'textarea',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PASSEPORT DE COMPÉTENCES PROFESSIONNEL</h1><p>Titulaire : <strong>{{nom_titulaire}}</strong> | Émis le : <strong>{{date_emission}}</strong></p><p>Formations et certifications : <em>{{formations_suivies}}</em></p><p>Expériences professionnelles : <em>{{experiences}}</em></p></div>` },

  { code: 'ins_contrat_premier_emploi_cdd', name: "Contrat de travail premier emploi (CDD 24 mois)", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Contrat à durée déterminée de 24 mois destiné aux primo-demandeurs d'emploi, conforme au Code du Travail ivoirien et aux dispositifs d'aide à l'insertion professionnelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_employe',label:"Nom et prénoms de l'employé",type:'text',required:true},
      {key:'employeur',label:"Raison sociale de l'employeur",type:'text',required:true},
      {key:'poste',label:"Poste occupé",type:'text',required:true},
      {key:'salaire',label:"Salaire mensuel brut (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRAVAIL — PREMIER EMPLOI (CDD 24 MOIS)</h1><p>L'employeur <strong>{{employeur}}</strong> engage <strong>{{nom_employe}}</strong> au poste de <strong>{{poste}}</strong> à compter du <strong>{{date_debut}}</strong> pour une durée de 24 mois, avec un salaire mensuel brut de <strong>{{salaire}}</strong> FCFA. Le présent contrat est établi conformément au Code du Travail de Côte d'Ivoire.</p></div>` },

  { code: 'ins_convention_stage_fin_etudes', name: "Convention de stage de fin d'études", category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Convention tripartite encadrant le stage de fin d'études d'un étudiant, définie entre l'établissement d'enseignement, l'entreprise d'accueil et le stagiaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_etudiant',label:"Nom et prénoms de l'étudiant",type:'text',required:true},
      {key:'etablissement',label:"Établissement d'enseignement",type:'text',required:true},
      {key:'entreprise',label:"Entreprise d'accueil",type:'text',required:true},
      {key:'sujet_stage',label:"Sujet ou thème du stage",type:'text',required:true},
      {key:'date_debut',label:"Date de début du stage",type:'date',required:true},
      {key:'date_fin',label:"Date de fin du stage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE STAGE DE FIN D'ÉTUDES</h1><p>L'établissement <strong>{{etablissement}}</strong> et l'entreprise <strong>{{entreprise}}</strong> accueillent le stagiaire <strong>{{nom_etudiant}}</strong> sur le thème <strong>{{sujet_stage}}</strong> du <strong>{{date_debut}}</strong> au <strong>{{date_fin}}</strong>.</p></div>` },

  { code: 'ins_contrat_emploi_aide', name: "Contrat d'emploi aidé (subventionné)", category: 'rh_emploi', price: 4500, priceMax: 13000,
    description: "Contrat d'emploi aidé et subventionné par l'État ivoirien dans le cadre des programmes d'insertion professionnelle des jeunes et demandeurs d'emploi.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom et prénoms du bénéficiaire",type:'text',required:true},
      {key:'employeur',label:"Employeur",type:'text',required:true},
      {key:'programme_aide',label:"Programme d'aide concerné",type:'text',required:true},
      {key:'montant_subvention',label:"Montant de la subvention (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'EMPLOI AIDÉ</h1><p><strong>{{employeur}}</strong> engage <strong>{{nom_beneficiaire}}</strong> dans le cadre du programme <strong>{{programme_aide}}</strong> à compter du <strong>{{date_debut}}</strong>. Subvention accordée : <strong>{{montant_subvention}}</strong> FCFA.</p></div>` },

  { code: 'ins_accord_volontariat_civil', name: "Accord de contrat de volontariat civil", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Accord encadrant l'engagement d'un volontaire civil dans le cadre d'un programme de service civique ou de volontariat pour le développement en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_volontaire',label:"Nom et prénoms du volontaire",type:'text',required:true},
      {key:'organisme_accueil',label:"Organisme d'accueil",type:'text',required:true},
      {key:'mission',label:"Description de la mission",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'duree',label:"Durée de l'engagement",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONTRAT DE VOLONTARIAT CIVIL</h1><p>Le volontaire <strong>{{nom_volontaire}}</strong> s'engage auprès de <strong>{{organisme_accueil}}</strong> pour une durée de <strong>{{duree}}</strong> à compter du <strong>{{date_debut}}</strong>. Mission : <em>{{mission}}</em>.</p></div>` },

  { code: 'ins_convention_service_civique', name: "Convention de service civique", category: 'rh_emploi', price: 3500, priceMax: 10000,
    description: "Convention de service civique définissant les droits et obligations du jeune volontaire et de la structure d'accueil dans le cadre du dispositif national ivoirien.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_jeune',label:"Nom et prénoms du jeune volontaire",type:'text',required:true},
      {key:'structure_accueil',label:"Structure d'accueil",type:'text',required:true},
      {key:'domaine_mission',label:"Domaine de la mission",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'indemnite',label:"Indemnité mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE CIVIQUE</h1><p>Le jeune <strong>{{nom_jeune}}</strong> accomplit son service civique au sein de <strong>{{structure_accueil}}</strong> dans le domaine <strong>{{domaine_mission}}</strong> à partir du <strong>{{date_debut}}</strong>, avec une indemnité de <strong>{{indemnite}}</strong> FCFA par mois.</p></div>` },

  { code: 'ins_contrat_travail_interimaire', name: "Contrat de travail intérimaire", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Contrat de mission de travail temporaire conforme au Code du Travail ivoirien, liant l'agence d'intérim, l'entreprise utilisatrice et le salarié intérimaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_interimaire',label:"Nom et prénoms de l'intérimaire",type:'text',required:true},
      {key:'agence_interim',label:"Agence d'intérim",type:'text',required:true},
      {key:'entreprise_utilisatrice',label:"Entreprise utilisatrice",type:'text',required:true},
      {key:'poste',label:"Poste de travail",type:'text',required:true},
      {key:'date_mission',label:"Date de début de mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRAVAIL INTÉRIMAIRE</h1><p>L'agence <strong>{{agence_interim}}</strong> met à disposition de <strong>{{entreprise_utilisatrice}}</strong> l'intérimaire <strong>{{nom_interimaire}}</strong> au poste de <strong>{{poste}}</strong> à compter du <strong>{{date_mission}}</strong>.</p></div>` },

  { code: 'ins_convention_agence_interim', name: "Convention agence d'intérim", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Convention cadre entre une agence de travail temporaire et une entreprise utilisatrice, définissant les conditions générales de mise à disposition de personnel intérimaire.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'agence_interim',label:"Agence de travail temporaire",type:'text',required:true},
      {key:'entreprise_cliente',label:"Entreprise cliente",type:'text',required:true},
      {key:'conditions_generales',label:"Conditions générales de collaboration",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION AGENCE D'INTÉRIM</h1><p>La présente convention est conclue entre l'agence <strong>{{agence_interim}}</strong> et l'entreprise <strong>{{entreprise_cliente}}</strong> le <strong>{{date_signature}}</strong>. Conditions : <em>{{conditions_generales}}</em>.</p></div>` },

  { code: 'ins_accord_pmsmp', name: "Accord de mise en situation professionnelle (PMSMP)", category: 'rh_emploi', price: 3500, priceMax: 10000,
    description: "Accord encadrant une période de mise en situation en milieu professionnel (PMSMP), permettant à un demandeur d'emploi de découvrir un métier ou de confirmer un projet professionnel.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom et prénoms du bénéficiaire",type:'text',required:true},
      {key:'prescripteur',label:"Organisme prescripteur",type:'text',required:true},
      {key:'structure_accueil',label:"Structure d'accueil",type:'text',required:true},
      {key:'objectif',label:"Objectif de la PMSMP",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISE EN SITUATION PROFESSIONNELLE (PMSMP)</h1><p>Le bénéficiaire <strong>{{nom_beneficiaire}}</strong>, orienté par <strong>{{prescripteur}}</strong>, effectue une PMSMP au sein de <strong>{{structure_accueil}}</strong> à partir du <strong>{{date_debut}}</strong>. Objectif : <em>{{objectif}}</em>.</p></div>` },

  { code: 'ins_bilan_professionnel_competences', name: "Bilan professionnel de compétences", category: 'rh_emploi', price: 4000, priceMax: 12000,
    description: "Bilan professionnel approfondi permettant à un individu d'analyser ses compétences professionnelles et personnelles en vue d'un projet de reconversion ou d'évolution professionnelle.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom',label:"Nom et prénoms",type:'text',required:true},
      {key:'experience',label:"Expérience professionnelle (années)",type:'text',required:true},
      {key:'competences_techniques',label:"Compétences techniques",type:'textarea',required:true},
      {key:'competences_transversales',label:"Compétences transversales",type:'textarea',required:true},
      {key:'date_bilan',label:"Date du bilan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BILAN PROFESSIONNEL DE COMPÉTENCES</h1><p>Bénéficiaire : <strong>{{nom}}</strong> | Expérience : <strong>{{experience}}</strong> ans | Date : <strong>{{date_bilan}}</strong></p><p>Compétences techniques : <em>{{competences_techniques}}</em></p><p>Compétences transversales : <em>{{competences_transversales}}</em></p></div>` },

  { code: 'ins_portefeuille_competences_eportfolio', name: "Portefeuille de compétences (e-portfolio)", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Document numérique structuré présentant l'ensemble des compétences, réalisations et certifications d'un individu en recherche d'emploi ou en parcours d'insertion.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_titulaire',label:"Nom et prénoms du titulaire",type:'text',required:true},
      {key:'competences_cles',label:"Compétences clés",type:'textarea',required:true},
      {key:'realisations',label:"Réalisations et projets notables",type:'textarea',required:true},
      {key:'certifications',label:"Certifications et diplômes",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PORTEFEUILLE DE COMPÉTENCES (E-PORTFOLIO)</h1><p>Titulaire : <strong>{{nom_titulaire}}</strong></p><p>Compétences clés : <em>{{competences_cles}}</em></p><p>Réalisations : <em>{{realisations}}</em></p><p>Certifications : <em>{{certifications}}</em></p></div>` },

  { code: 'ins_plan_action_retour_emploi', name: "Plan d'action retour à l'emploi", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Plan d'action personnalisé élaboré avec un conseiller emploi pour aider un demandeur d'emploi à définir et à atteindre ses objectifs de retour à l'emploi.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_demandeur',label:"Nom et prénoms du demandeur d'emploi",type:'text',required:true},
      {key:'conseiller',label:"Conseiller emploi référent",type:'text',required:true},
      {key:'objectif_emploi',label:"Objectif d'emploi visé",type:'text',required:true},
      {key:'actions_prevues',label:"Actions prévues et échéances",type:'textarea',required:true},
      {key:'date_elaboration',label:"Date d'élaboration du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN D'ACTION RETOUR À L'EMPLOI</h1><p>Demandeur : <strong>{{nom_demandeur}}</strong> | Conseiller : <strong>{{conseiller}}</strong> | Date : <strong>{{date_elaboration}}</strong></p><p>Objectif : <strong>{{objectif_emploi}}</strong></p><p>Actions : <em>{{actions_prevues}}</em></p></div>` },

  { code: 'ins_convention_anpe_plateforme', name: "Convention ANPE / plateforme emploi", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Convention de partenariat entre l'ANPE (Agence Nationale Pour l'Emploi) et une plateforme numérique d'emploi pour optimiser la mise en relation employeurs-demandeurs d'emploi.", templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'plateforme',label:"Nom de la plateforme emploi",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'duree',label:"Durée de la convention",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION ANPE / PLATEFORME EMPLOI</h1><p>L'Agence Nationale Pour l'Emploi (ANPE) et la plateforme <strong>{{plateforme}}</strong> concluent la présente convention le <strong>{{date_signature}}</strong> pour une durée de <strong>{{duree}}</strong>. Objet : <em>{{objet_partenariat}}</em>.</p></div>` },

  { code: 'ins_accord_poei', name: "Accord de formation préalable à l'embauche (POEI)", category: 'rh_emploi', price: 4500, priceMax: 13000,
    description: "Accord de formation préalable à l'embauche (POEI) entre un employeur et un organisme de formation, permettant d'adapter les compétences d'un candidat au poste à pourvoir.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'employeur',label:"Employeur bénéficiaire",type:'text',required:true},
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'candidat',label:"Nom et prénoms du candidat",type:'text',required:true},
      {key:'poste_vise',label:"Poste visé",type:'text',required:true},
      {key:'date_debut_formation',label:"Date de début de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD POEI — FORMATION PRÉALABLE À L'EMBAUCHE</h1><p>L'employeur <strong>{{employeur}}</strong> et l'organisme <strong>{{organisme_formation}}</strong> s'accordent pour former le candidat <strong>{{candidat}}</strong> en vue de son embauche au poste de <strong>{{poste_vise}}</strong>, formation débutant le <strong>{{date_debut_formation}}</strong>.</p></div>` },

  { code: 'ins_lettre_motivation_type', name: "Lettre de motivation type", category: 'rh_emploi', price: 1000, priceMax: 3000,
    description: "Modèle professionnel de lettre de motivation adaptable pour toute candidature à un emploi, respectant les standards de présentation en vigueur en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'nom_candidat',label:"Nom et prénoms du candidat",type:'text',required:true},
      {key:'poste_vise',label:"Poste visé",type:'text',required:true},
      {key:'entreprise_destinataire',label:"Entreprise destinataire",type:'text',required:true},
      {key:'motivation',label:"Paragraphe de motivation",type:'textarea',required:true},
      {key:'date_lettre',label:"Date de la lettre",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>LETTRE DE MOTIVATION</h1><p>{{nom_candidat}}<br/>{{date_lettre}}</p><p>À l'attention du Directeur des Ressources Humaines<br/><strong>{{entreprise_destinataire}}</strong></p><p>Madame, Monsieur,</p><p>Je me permets de vous adresser ma candidature au poste de <strong>{{poste_vise}}</strong>. {{motivation}}</p><p>Dans l'attente de votre réponse, veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p><p><strong>{{nom_candidat}}</strong></p></div>` },

  { code: 'ins_cv_format_professionnel_ohada', name: "CV format professionnel OHADA", category: 'rh_emploi', price: 1500, priceMax: 4500,
    description: "Curriculum vitae au format professionnel adapté aux standards du marché du travail de la zone OHADA, structuré pour mettre en valeur le parcours et les compétences.", templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'nom_complet',label:"Nom et prénoms",type:'text',required:true},
      {key:'contact',label:"Téléphone et email",type:'text',required:true},
      {key:'formation',label:"Formation et diplômes",type:'textarea',required:true},
      {key:'experience',label:"Expériences professionnelles",type:'textarea',required:true},
      {key:'competences',label:"Compétences et qualités",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CURRICULUM VITAE</h1><h2>{{nom_complet}}</h2><p>Contact : <strong>{{contact}}</strong></p><h3>Formation</h3><p>{{formation}}</p><h3>Expériences professionnelles</h3><p>{{experience}}</p><h3>Compétences</h3><p>{{competences}}</p></div>` },

  { code: 'ins_contrat_preembauche_periode_essai', name: "Contrat de pré-embauche avec période d'essai", category: 'rh_emploi', price: 3500, priceMax: 10000,
    description: "Contrat de pré-embauche définissant les modalités de la période d'essai préalable à la signature d'un contrat définitif, conforme au Code du Travail ivoirien.", templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_candidat',label:"Nom et prénoms du candidat",type:'text',required:true},
      {key:'employeur',label:"Employeur",type:'text',required:true},
      {key:'poste',label:"Poste proposé",type:'text',required:true},
      {key:'duree_essai',label:"Durée de la période d'essai",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÉ-EMBAUCHE AVEC PÉRIODE D'ESSAI</h1><p>L'employeur <strong>{{employeur}}</strong> propose à <strong>{{nom_candidat}}</strong> un poste de <strong>{{poste}}</strong> avec une période d'essai de <strong>{{duree_essai}}</strong>, débutant le <strong>{{date_debut}}</strong>.</p></div>` },

  { code: 'ins_accord_accompagnement_mentor', name: "Accord d'accompagnement mentor-mentoré", category: 'rh_emploi', price: 2500, priceMax: 7500,
    description: "Accord formalisant la relation de mentorat entre un professionnel expérimenté (mentor) et un jeune en insertion professionnelle (mentoré) dans le cadre d'un programme d'accompagnement.", templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_mentor',label:"Nom et prénoms du mentor",type:'text',required:true},
      {key:'nom_mentore',label:"Nom et prénoms du mentoré",type:'text',required:true},
      {key:'objectifs_mentorat',label:"Objectifs du mentorat",type:'textarea',required:true},
      {key:'duree',label:"Durée de l'accompagnement",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACCOMPAGNEMENT MENTOR-MENTORÉ</h1><p>Le mentor <strong>{{nom_mentor}}</strong> s'engage à accompagner <strong>{{nom_mentore}}</strong> pendant <strong>{{duree}}</strong> à compter du <strong>{{date_debut}}</strong>. Objectifs : <em>{{objectifs_mentorat}}</em>.</p></div>` },

  { code: 'ins_convention_club_entrepreneurs_jeunes', name: "Convention de club d'entrepreneurs jeunes", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Convention constitutive d'un club d'entrepreneurs jeunes, définissant les objectifs, le fonctionnement et les engagements des membres en vue de favoriser l'entrepreneuriat juvénile.", templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_club',label:"Nom du club",type:'text',required:true},
      {key:'objectifs',label:"Objectifs du club",type:'textarea',required:true},
      {key:'president',label:"Nom du président du club",type:'text',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true},
      {key:'nombre_membres',label:"Nombre de membres fondateurs",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CLUB D'ENTREPRENEURS JEUNES</h1><h2>{{nom_club}}</h2><p>Créé le <strong>{{date_creation}}</strong> sous la présidence de <strong>{{president}}</strong> avec <strong>{{nombre_membres}}</strong> membres fondateurs.</p><p>Objectifs : <em>{{objectifs}}</em></p></div>` },

  { code: 'ins_accord_micro_entreprise_jeune', name: "Accord de micro-entreprise jeune", category: 'rh_emploi', price: 3500, priceMax: 10000,
    description: "Accord encadrant la création et le suivi d'une micro-entreprise portée par un jeune entrepreneur dans le cadre des dispositifs de soutien à l'auto-emploi en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_jeune',label:"Nom et prénoms du jeune entrepreneur",type:'text',required:true},
      {key:'nom_entreprise',label:"Nom de la micro-entreprise",type:'text',required:true},
      {key:'activite',label:"Activité principale",type:'text',required:true},
      {key:'structure_appui',label:"Structure d'appui",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MICRO-ENTREPRISE JEUNE</h1><p>Le jeune <strong>{{nom_jeune}}</strong> crée la micro-entreprise <strong>{{nom_entreprise}}</strong>, spécialisée dans <strong>{{activite}}</strong>, avec l'appui de <strong>{{structure_appui}}</strong>, en date du <strong>{{date_accord}}</strong>.</p></div>` },

  { code: 'ins_contrat_coaching_insertion', name: "Contrat de coaching en insertion", category: 'rh_emploi', price: 3000, priceMax: 9000,
    description: "Contrat de prestations de coaching individuel en insertion professionnelle, définissant les objectifs, les séances et les engagements mutuels du coach et du bénéficiaire.", templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_beneficiaire',label:"Nom et prénoms du bénéficiaire",type:'text',required:true},
      {key:'nom_coach',label:"Nom du coach",type:'text',required:true},
      {key:'objectifs_coaching',label:"Objectifs du coaching",type:'textarea',required:true},
      {key:'nombre_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COACHING EN INSERTION</h1><p>Le coach <strong>{{nom_coach}}</strong> s'engage à accompagner <strong>{{nom_beneficiaire}}</strong> sur <strong>{{nombre_seances}}</strong> séances à compter du <strong>{{date_debut}}</strong>. Objectifs : <em>{{objectifs_coaching}}</em>.</p></div>` },

  { code: 'ins_fiche_suivi_insertion_jeune', name: "Fiche de suivi insertion jeune", category: 'rh_emploi', price: 2000, priceMax: 6000,
    description: "Fiche individuelle de suivi d'un jeune en parcours d'insertion professionnelle, permettant de consigner les étapes, les actions réalisées et les progrès enregistrés.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_jeune',label:"Nom et prénoms du jeune",type:'text',required:true},
      {key:'conseiller_referent',label:"Conseiller référent",type:'text',required:true},
      {key:'situation_actuelle',label:"Situation actuelle",type:'text',required:true},
      {key:'actions_realisees',label:"Actions réalisées",type:'textarea',required:true},
      {key:'date_suivi',label:"Date du suivi",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>FICHE DE SUIVI INSERTION JEUNE</h1><p>Jeune : <strong>{{nom_jeune}}</strong> | Conseiller : <strong>{{conseiller_referent}}</strong></p><p>Situation : <strong>{{situation_actuelle}}</strong> | Date : <strong>{{date_suivi}}</strong></p><p>Actions réalisées : <em>{{actions_realisees}}</em></p></div>` },

  { code: 'ins_rapport_placement_insertion', name: "Rapport de placement insertion", category: 'rh_emploi', price: 3500, priceMax: 10000,
    description: "Rapport de placement produit par une structure d'insertion professionnelle, documentant les résultats de placement des bénéficiaires sur le marché du travail.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'structure',label:"Structure d'insertion",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'nombre_beneficiaires',label:"Nombre de bénéficiaires",type:'text',required:true},
      {key:'taux_placement',label:"Taux de placement (%)",type:'text',required:true},
      {key:'observations',label:"Observations et recommandations",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PLACEMENT INSERTION</h1><p>Structure : <strong>{{structure}}</strong> | Période : <strong>{{periode}}</strong></p><p>Bénéficiaires : <strong>{{nombre_beneficiaires}}</strong> | Taux de placement : <strong>{{taux_placement}}%</strong></p><p>Observations : <em>{{observations}}</em></p></div>` },

  { code: 'ins_convention_maison_emploi', name: "Convention avec maison de l'emploi", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Convention de partenariat entre une structure (entreprise, ONG, institution) et une maison de l'emploi pour faciliter l'accès à l'emploi des demandeurs en Côte d'Ivoire.", templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'partenaire',label:"Nom du partenaire signataire",type:'text',required:true},
      {key:'maison_emploi',label:"Maison de l'emploi concernée",type:'text',required:true},
      {key:'engagements',label:"Engagements réciproques",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'duree',label:"Durée de la convention",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION AVEC MAISON DE L'EMPLOI</h1><p>La maison de l'emploi <strong>{{maison_emploi}}</strong> et <strong>{{partenaire}}</strong> concluent le <strong>{{date_signature}}</strong> la présente convention d'une durée de <strong>{{duree}}</strong>. Engagements : <em>{{engagements}}</em>.</p></div>` },

  { code: 'ins_accord_fonds_emploi_jeunes', name: "Accord avec fonds emploi jeunes", category: 'rh_emploi', price: 6000, priceMax: 18000,
    description: "Accord de financement entre un fonds dédié à l'emploi des jeunes et une structure bénéficiaire, précisant les conditions d'attribution et d'utilisation des ressources allouées.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'structure_beneficiaire',label:"Structure bénéficiaire",type:'text',required:true},
      {key:'fonds',label:"Nom du fonds emploi jeunes",type:'text',required:true},
      {key:'montant',label:"Montant alloué (FCFA)",type:'text',required:true},
      {key:'objet_financement',label:"Objet du financement",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD AVEC FONDS EMPLOI JEUNES</h1><p>Le fonds <strong>{{fonds}}</strong> alloue à <strong>{{structure_beneficiaire}}</strong> la somme de <strong>{{montant}}</strong> FCFA pour financer : <em>{{objet_financement}}</em>. Accord signé le <strong>{{date_accord}}</strong>.</p></div>` },

  { code: 'ins_rapport_impact_programme_insertion', name: "Rapport d'impact programme insertion", category: 'rh_emploi', price: 5000, priceMax: 15000,
    description: "Rapport d'évaluation d'impact d'un programme d'insertion professionnelle, mesurant les résultats obtenus, les effets sur les bénéficiaires et les recommandations pour l'avenir.", templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'programme',label:"Nom du programme d'insertion",type:'text',required:true},
      {key:'porteur',label:"Structure porteuse",type:'text',required:true},
      {key:'periode_evaluation',label:"Période d'évaluation",type:'text',required:true},
      {key:'resultats',label:"Résultats et indicateurs clés",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'IMPACT PROGRAMME INSERTION</h1><h2>{{programme}}</h2><p>Porteur : <strong>{{porteur}}</strong> | Période : <strong>{{periode_evaluation}}</strong></p><p>Résultats : <em>{{resultats}}</em></p><p>Recommandations : <em>{{recommandations}}</em></p></div>` },
];
async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 26b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
