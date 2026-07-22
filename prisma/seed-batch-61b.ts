import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── FORMATION PROFESSIONNELLE (fp2_) ───────────────────────────────────────
  {
    code: 'fp2_contrat_formation_continue',
    name: "Contrat de formation professionnelle continue (employeur-salarié)",
    category: 'academique', price: 3000, priceMax: 9000,
    description: "Contrat encadrant la formation professionnelle continue entre un employeur et un salarié, conforme à la réglementation FDFP de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'employeur_nom',label:"Nom de l'employeur",type:'text',required:true},
      {key:'salarie_nom',label:"Nom du salarié",type:'text',required:true},
      {key:'intitule_formation',label:"Intitulé de la formation",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'cout_formation',label:"Coût de la formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FORMATION PROFESSIONNELLE CONTINUE</h1>
<h2>Entre les soussignés :</h2>
<p><strong>L'Employeur :</strong> {{employeur_nom}}</p>
<p><strong>Le Salarié :</strong> {{salarie_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Le présent contrat a pour objet la prise en charge de la formation intitulée : <strong>{{intitule_formation}}</strong>.</p>
<h2>Article 2 – Durée</h2>
<p>La formation se déroulera du {{date_debut}} au {{date_fin}}.</p>
<h2>Article 3 – Financement</h2>
<p>Le coût total de la formation est de {{cout_formation}} FCFA, pris en charge selon les modalités définies entre les parties et en accord avec le FDFP.</p>
<h2>Article 4 – Obligations des parties</h2>
<p>L'employeur s'engage à libérer le salarié pendant les heures de formation. Le salarié s'engage à suivre assidûment la formation et à en rendre compte à son employeur.</p>
<p>Fait à Abidjan, le {{date_debut}}</p>
<p>Signature Employeur : _________________ &nbsp;&nbsp; Signature Salarié : _________________</p></div>`
  },
  {
    code: 'fp2_convention_formation_inter',
    name: "Convention de formation inter-entreprises",
    category: 'academique', price: 2500, priceMax: 7500,
    description: "Convention organisant une formation professionnelle regroupant des salariés de plusieurs entreprises auprès d'un organisme de formation agréé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'entreprises_participantes',label:"Entreprises participantes",type:'textarea',required:true},
      {key:'intitule_stage',label:"Intitulé du stage",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FORMATION INTER-ENTREPRISES</h1>
<p><strong>Organisme de formation :</strong> {{organisme_formation}}</p>
<p><strong>Entreprises participantes :</strong> {{entreprises_participantes}}</p>
<h2>Article 1 – Objet</h2>
<p>La présente convention a pour objet d'organiser une action de formation collective intitulée : <strong>{{intitule_stage}}</strong>.</p>
<h2>Article 2 – Dates</h2>
<p>La formation se tiendra du {{date_debut}} au {{date_fin}}.</p>
<h2>Article 3 – Engagements</h2>
<p>L'organisme de formation s'engage à fournir les ressources pédagogiques et les formateurs qualifiés. Les entreprises participantes s'engagent à envoyer leurs salariés désignés et à régler les frais de participation dans les délais convenus.</p>
<p>Fait à Abidjan</p></div>`
  },
  {
    code: 'fp2_accord_formation_intra',
    name: "Accord de formation intra-entreprise",
    category: 'academique', price: 2500, priceMax: 8000,
    description: "Accord cadrant une action de formation dispensée au sein de l'entreprise par un organisme externe ou des formateurs internes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'formateur_nom',label:"Nom du formateur",type:'text',required:true},
      {key:'theme_formation',label:"Thème de la formation",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION INTRA-ENTREPRISE</h1>
<p><strong>Entreprise :</strong> {{entreprise_nom}}</p>
<p><strong>Formateur :</strong> {{formateur_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord porte sur l'organisation d'une formation interne sur le thème : <strong>{{theme_formation}}</strong>.</p>
<h2>Article 2 – Participants</h2>
<p>La formation concernera <strong>{{nombre_stagiaires}}</strong> stagiaires issus de l'entreprise.</p>
<h2>Article 3 – Date</h2>
<p>La formation aura lieu le {{date_formation}}.</p>
<h2>Article 4 – Obligations</h2>
<p>L'entreprise met à disposition les locaux et le matériel nécessaires. Le formateur garantit un contenu conforme au programme validé.</p>
<p>Signatures des parties : _________________</p></div>`
  },
  {
    code: 'fp2_contrat_alternance',
    name: "Contrat de formation par alternance (apprentissage)",
    category: 'academique', price: 3500, priceMax: 10000,
    description: "Contrat de formation en alternance associant périodes en entreprise et périodes en centre de formation, selon le dispositif OHADA et la législation ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'apprenti_nom',label:"Nom de l'apprenti",type:'text',required:true},
      {key:'employeur_nom',label:"Nom de l'employeur",type:'text',required:true},
      {key:'cfa_nom',label:"Nom du CFA",type:'text',required:true},
      {key:'qualification_visee',label:"Qualification visée",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FORMATION PAR ALTERNANCE</h1>
<h2>Parties</h2>
<p><strong>Apprenti :</strong> {{apprenti_nom}}</p>
<p><strong>Employeur :</strong> {{employeur_nom}}</p>
<p><strong>Centre de Formation :</strong> {{cfa_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Le présent contrat organise la formation en alternance de l'apprenti en vue de l'obtention de la qualification : <strong>{{qualification_visee}}</strong>.</p>
<h2>Article 2 – Durée</h2>
<p>Le contrat s'étend du {{date_debut}} au {{date_fin}}.</p>
<h2>Article 3 – Rythme d'alternance</h2>
<p>L'apprenti partagera son temps entre l'entreprise et le CFA selon le calendrier établi conjointement par les parties.</p>
<h2>Article 4 – Rémunération</h2>
<p>L'apprenti percevra une rémunération définie conformément à la grille légale en vigueur en Côte d'Ivoire.</p>
<p>Signatures : Apprenti _______ Employeur _______ CFA _______</p></div>`
  },
  {
    code: 'fp2_contrat_apprentissage_cfa',
    name: "Contrat d'apprentissage CFA (Centre de Formation par Apprentissage)",
    category: 'academique', price: 3000, priceMax: 9000,
    description: "Contrat liant un apprenti et un CFA agréé pour la composante pédagogique de la formation en apprentissage.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'apprenti_nom',label:"Nom de l'apprenti",type:'text',required:true},
      {key:'cfa_denomination',label:"Dénomination du CFA",type:'text',required:true},
      {key:'diplome_vise',label:"Diplôme visé",type:'text',required:true},
      {key:'date_entree',label:"Date d'entrée en formation",type:'date',required:true},
      {key:'frais_scolarite',label:"Frais de scolarité annuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'APPRENTISSAGE – CFA</h1>
<p><strong>Apprenti :</strong> {{apprenti_nom}}</p>
<p><strong>CFA :</strong> {{cfa_denomination}}</p>
<h2>Article 1 – Formation</h2>
<p>Le CFA s'engage à dispenser la formation conduisant au diplôme : <strong>{{diplome_vise}}</strong>, à compter du {{date_entree}}.</p>
<h2>Article 2 – Frais</h2>
<p>Les frais de scolarité s'élèvent à {{frais_scolarite}} FCFA par an, pouvant être cofinancés par l'employeur et le FDFP.</p>
<h2>Article 3 – Suivi pédagogique</h2>
<p>Le CFA assure le suivi régulier de l'apprenti et communique les résultats à l'employeur.</p>
<p>Fait à Abidjan – Signatures : Apprenti _______ CFA _______</p></div>`
  },
  {
    code: 'fp2_accord_maitre_apprentissage',
    name: "Accord de maître d'apprentissage",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Accord désignant et encadrant le rôle du maître d'apprentissage chargé de suivre l'apprenti en entreprise.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'maitre_nom',label:"Nom du maître d'apprentissage",type:'text',required:true},
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'apprenti_nom',label:"Nom de l'apprenti",type:'text',required:true},
      {key:'date_prise_fonction',label:"Date de prise de fonction",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAITRE D'APPRENTISSAGE</h1>
<p><strong>Maître d'apprentissage :</strong> {{maitre_nom}}</p>
<p><strong>Entreprise :</strong> {{entreprise_nom}}</p>
<p><strong>Apprenti encadré :</strong> {{apprenti_nom}}</p>
<h2>Article 1 – Désignation</h2>
<p>Par le présent accord, {{maitre_nom}} est désigné maître d'apprentissage à compter du {{date_prise_fonction}}.</p>
<h2>Article 2 – Missions</h2>
<p>Le maître d'apprentissage est chargé d'accueillir, d'encadrer et d'évaluer l'apprenti dans le cadre de ses activités professionnelles au sein de l'entreprise.</p>
<h2>Article 3 – Reconnaissance</h2>
<p>L'employeur reconnaît la mission du maître d'apprentissage et lui alloue le temps nécessaire à l'accomplissement de ses fonctions.</p>
<p>Signatures : Employeur _______ Maître d'apprentissage _______</p></div>`
  },
  {
    code: 'fp2_accord_tuteur_entreprise',
    name: "Accord de tuteur en entreprise",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Accord formalisant la désignation d'un tuteur chargé d'accompagner un stagiaire ou alternant dans l'entreprise.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'tuteur_nom',label:"Nom du tuteur",type:'text',required:true},
      {key:'stagiaire_nom',label:"Nom du stagiaire",type:'text',required:true},
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'duree_tutorat',label:"Durée du tutorat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TUTEUR EN ENTREPRISE</h1>
<p><strong>Tuteur :</strong> {{tuteur_nom}}</p>
<p><strong>Stagiaire :</strong> {{stagiaire_nom}}</p>
<p><strong>Entreprise :</strong> {{entreprise_nom}}</p>
<h2>Article 1 – Mission du tuteur</h2>
<p>{{tuteur_nom}} est désigné tuteur de {{stagiaire_nom}} pour une durée de {{duree_tutorat}}. Il est responsable de son intégration et de son accompagnement professionnel.</p>
<h2>Article 2 – Obligations</h2>
<p>Le tuteur accueille le stagiaire, lui présente l'environnement de travail et assure un suivi régulier de ses activités et de sa progression.</p>
<p>Signatures : Tuteur _______ Responsable RH _______</p></div>`
  },
  {
    code: 'fp2_accord_stage_fin_etudes',
    name: "Accord de stage de fin d'études (BTS/DUT/Licence Pro)",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Convention tripartite organisant le stage de fin d'études entre l'étudiant, l'établissement d'enseignement et l'entreprise d'accueil.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'etudiant_nom',label:"Nom de l'étudiant",type:'text',required:true},
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'entreprise_nom',label:"Nom de l'entreprise d'accueil",type:'text',required:true},
      {key:'sujet_stage',label:"Sujet du stage",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE STAGE DE FIN D'ETUDES</h1>
<h2>Parties</h2>
<p><strong>Etudiant :</strong> {{etudiant_nom}}</p>
<p><strong>Etablissement :</strong> {{etablissement_nom}}</p>
<p><strong>Entreprise d'accueil :</strong> {{entreprise_nom}}</p>
<h2>Article 1 – Objet du stage</h2>
<p>Le présent accord organise le stage de fin d'études portant sur : <strong>{{sujet_stage}}</strong>.</p>
<h2>Article 2 – Durée</h2>
<p>Le stage se déroulera du {{date_debut}} au {{date_fin}}.</p>
<h2>Article 3 – Encadrement</h2>
<p>L'entreprise désigne un maître de stage. L'établissement assure le suivi pédagogique de l'étudiant.</p>
<p>Signatures : Etudiant _______ Etablissement _______ Entreprise _______</p></div>`
  },
  {
    code: 'fp2_convention_stage_decouverte',
    name: "Convention de stage de découverte (lycéen)",
    category: 'academique', price: 1500, priceMax: 4500,
    description: "Convention permettant à un lycéen d'effectuer un stage d'observation en entreprise dans le cadre de son orientation scolaire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'lyceen_nom',label:"Nom du lycéen",type:'text',required:true},
      {key:'lycee_nom',label:"Nom du lycée",type:'text',required:true},
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'date_stage',label:"Date du stage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE STAGE DE DECOUVERTE EN ENTREPRISE</h1>
<p><strong>Lycéen :</strong> {{lyceen_nom}}</p>
<p><strong>Lycée :</strong> {{lycee_nom}}</p>
<p><strong>Entreprise :</strong> {{entreprise_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>La présente convention organise un stage d'observation pour {{lyceen_nom}} au sein de {{entreprise_nom}}, le {{date_stage}}.</p>
<h2>Article 2 – Conditions</h2>
<p>Le lycéen est sous la responsabilité de l'entreprise durant le stage. Aucune rémunération n'est versée. L'entreprise désigne un référent pour l'accueillir.</p>
<p>Signatures : Lycéen _______ Parents/Tuteur _______ Lycée _______ Entreprise _______</p></div>`
  },
  {
    code: 'fp2_accord_elearning',
    name: "Accord de service de formation en ligne (e-learning)",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Accord encadrant la fourniture d'une plateforme ou d'un programme de formation en ligne entre un prestataire et une entreprise ou un particulier.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'prestataire_nom',label:"Nom du prestataire e-learning",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'modules_formation',label:"Modules de formation",type:'textarea',required:true},
      {key:'duree_acces',label:"Durée d'accès à la plateforme",type:'text',required:true},
      {key:'tarif',label:"Tarif (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN LIGNE (E-LEARNING)</h1>
<p><strong>Prestataire :</strong> {{prestataire_nom}}</p>
<p><strong>Client :</strong> {{client_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Le prestataire met à disposition du client une plateforme de formation en ligne comprenant les modules suivants : {{modules_formation}}.</p>
<h2>Article 2 – Durée d'accès</h2>
<p>L'accès est accordé pour une durée de {{duree_acces}}.</p>
<h2>Article 3 – Tarif</h2>
<p>Le tarif convenu est de {{tarif}} FCFA, payable selon les modalités définies en annexe.</p>
<p>Signatures : Prestataire _______ Client _______</p></div>`
  },
  {
    code: 'fp2_accord_formation_presentielle',
    name: "Accord de service de formation présentielle (salle)",
    category: 'academique', price: 2500, priceMax: 7000,
    description: "Accord entre un organisme de formation et un client pour la dispense de formations en présentiel dans une salle équipée.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisme_nom',label:"Organisme de formation",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'intitule_formation',label:"Intitulé de la formation",type:'text',required:true},
      {key:'lieu_formation',label:"Lieu de la formation",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION PRESENTIELLE</h1>
<p><strong>Organisme :</strong> {{organisme_nom}}</p>
<p><strong>Client :</strong> {{client_nom}}</p>
<h2>Article 1 – Prestation</h2>
<p>L'organisme s'engage à dispenser la formation <strong>{{intitule_formation}}</strong> en salle à {{lieu_formation}}, à compter du {{date_debut}}.</p>
<h2>Article 2 – Conditions logistiques</h2>
<p>L'organisme fournit le matériel pédagogique, les supports de cours et les formateurs qualifiés. Le client assure la présence des apprenants.</p>
<p>Signatures : Organisme _______ Client _______</p></div>`
  },
  {
    code: 'fp2_accord_blended_learning',
    name: "Accord de service de formation mixte (blended learning)",
    category: 'academique', price: 3000, priceMax: 8000,
    description: "Accord pour une formation combinant des séances en présentiel et des modules en ligne, adaptée aux contraintes des entreprises africaines.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'programme_formation',label:"Programme de formation",type:'textarea',required:true},
      {key:'heures_presentiel',label:"Heures en présentiel",type:'text',required:true},
      {key:'heures_ligne',label:"Heures en ligne",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION MIXTE (BLENDED LEARNING)</h1>
<p><strong>Prestataire :</strong> {{prestataire_nom}}</p>
<p><strong>Client :</strong> {{client_nom}}</p>
<h2>Article 1 – Programme</h2>
<p>{{programme_formation}}</p>
<h2>Article 2 – Répartition</h2>
<p>La formation comprend <strong>{{heures_presentiel}}</strong> heures en présentiel et <strong>{{heures_ligne}}</strong> heures en ligne.</p>
<h2>Article 3 – Engagements</h2>
<p>Le prestataire assure la cohérence pédagogique entre les deux modalités. Le client garantit l'accès des apprenants aux outils numériques nécessaires.</p>
<p>Signatures : Prestataire _______ Client _______</p></div>`
  },
  {
    code: 'fp2_accord_certification_fdfp',
    name: "Accord de certification FDFP (Fonds de Développement de la Formation Professionnelle)",
    category: 'academique', price: 3500, priceMax: 10000,
    description: "Accord organisant la prise en charge et la certification d'une action de formation par le FDFP de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'organisme_formation',label:"Organisme de formation agréé",type:'text',required:true},
      {key:'action_formation',label:"Action de formation",type:'text',required:true},
      {key:'montant_prise_charge',label:"Montant de prise en charge FDFP (FCFA)",type:'text',required:true},
      {key:'date_action',label:"Date de l'action",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION FDFP</h1>
<p><strong>Entreprise :</strong> {{entreprise_nom}}</p>
<p><strong>Organisme de formation :</strong> {{organisme_formation}}</p>
<h2>Article 1 – Action de formation</h2>
<p>Le présent accord porte sur la prise en charge par le FDFP de l'action : <strong>{{action_formation}}</strong>, prévue le {{date_action}}.</p>
<h2>Article 2 – Financement</h2>
<p>Le montant de prise en charge accordé par le FDFP est de {{montant_prise_charge}} FCFA.</p>
<h2>Article 3 – Conditions</h2>
<p>L'entreprise s'engage à respecter les procédures du FDFP et à fournir les justificatifs requis à l'issue de la formation.</p>
<p>Signatures : Entreprise _______ Organisme _______ FDFP _______</p></div>`
  },
  {
    code: 'fp2_accord_validation_competences',
    name: "Accord de service de validation de compétences",
    category: 'academique', price: 2500, priceMax: 7000,
    description: "Accord organisant l'évaluation et la validation des compétences d'un professionnel par un organisme certificateur reconnu.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'candidat_nom',label:"Nom du candidat",type:'text',required:true},
      {key:'organisme_certificateur',label:"Organisme certificateur",type:'text',required:true},
      {key:'referentiel_competences',label:"Référentiel de compétences",type:'text',required:true},
      {key:'date_evaluation',label:"Date d'évaluation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VALIDATION DE COMPETENCES</h1>
<p><strong>Candidat :</strong> {{candidat_nom}}</p>
<p><strong>Organisme certificateur :</strong> {{organisme_certificateur}}</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord porte sur la validation des compétences de {{candidat_nom}} selon le référentiel : <strong>{{referentiel_competences}}</strong>.</p>
<h2>Article 2 – Modalités</h2>
<p>L'évaluation se tiendra le {{date_evaluation}} et comprendra des épreuves théoriques et pratiques.</p>
<h2>Article 3 – Certification</h2>
<p>En cas de réussite, un certificat de compétences sera délivré au candidat par {{organisme_certificateur}}.</p>
<p>Signatures : Candidat _______ Organisme _______</p></div>`
  },
  {
    code: 'fp2_accord_bilan_competences',
    name: "Accord de service de bilan de compétences",
    category: 'academique', price: 2500, priceMax: 7500,
    description: "Accord encadrant la réalisation d'un bilan de compétences pour un salarié ou un demandeur d'emploi souhaitant définir son projet professionnel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'beneficiaire_nom',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'prestataire_nom',label:"Nom du prestataire",type:'text',required:true},
      {key:'duree_bilan',label:"Durée du bilan",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'tarif',label:"Tarif (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BILAN DE COMPETENCES</h1>
<p><strong>Bénéficiaire :</strong> {{beneficiaire_nom}}</p>
<p><strong>Prestataire :</strong> {{prestataire_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Le prestataire s'engage à réaliser un bilan de compétences pour {{beneficiaire_nom}}, d'une durée de {{duree_bilan}}, à compter du {{date_debut}}.</p>
<h2>Article 2 – Tarif</h2>
<p>Le coût du bilan est de {{tarif}} FCFA.</p>
<h2>Article 3 – Confidentialité</h2>
<p>Les résultats du bilan sont strictement confidentiels et remis exclusivement au bénéficiaire.</p>
<p>Signatures : Bénéficiaire _______ Prestataire _______</p></div>`
  },
  {
    code: 'fp2_accord_coaching_professionnel',
    name: "Accord de service de coaching professionnel",
    category: 'academique', price: 3000, priceMax: 9000,
    description: "Accord entre un coach professionnel certifié et un client (entreprise ou individu) pour un accompagnement au développement professionnel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'coach_nom',label:"Nom du coach",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'objectifs_coaching',label:"Objectifs du coaching",type:'textarea',required:true},
      {key:'nombre_seances',label:"Nombre de séances",type:'text',required:true},
      {key:'tarif_seance',label:"Tarif par séance (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COACHING PROFESSIONNEL</h1>
<p><strong>Coach :</strong> {{coach_nom}}</p>
<p><strong>Client :</strong> {{client_nom}}</p>
<h2>Article 1 – Objectifs</h2>
<p>{{objectifs_coaching}}</p>
<h2>Article 2 – Modalités</h2>
<p>Le programme comprend {{nombre_seances}} séances au tarif unitaire de {{tarif_seance}} FCFA.</p>
<h2>Article 3 – Déontologie</h2>
<p>Le coach s'engage à respecter les règles déontologiques de la profession et à maintenir la confidentialité des échanges.</p>
<p>Signatures : Coach _______ Client _______</p></div>`
  },
  {
    code: 'fp2_accord_formation_langues',
    name: "Accord de service de formation en langues professionnelles",
    category: 'academique', price: 2500, priceMax: 7000,
    description: "Accord de formation linguistique professionnelle (français des affaires, anglais commercial, etc.) pour salariés ou entreprises.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'organisme_nom',label:"Organisme de formation",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'langue_formation',label:"Langue enseignée",type:'text',required:true},
      {key:'niveau_vise',label:"Niveau visé",type:'text',required:true},
      {key:'nombre_heures',label:"Nombre d'heures",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN LANGUES PROFESSIONNELLES</h1>
<p><strong>Organisme :</strong> {{organisme_nom}}</p>
<p><strong>Client :</strong> {{client_nom}}</p>
<h2>Article 1 – Formation</h2>
<p>L'organisme s'engage à dispenser une formation en <strong>{{langue_formation}}</strong> pour atteindre le niveau <strong>{{niveau_vise}}</strong>.</p>
<h2>Article 2 – Volume horaire</h2>
<p>La formation représente un volume de {{nombre_heures}} heures.</p>
<h2>Article 3 – Evaluation</h2>
<p>Une évaluation finale sera réalisée à l'issue de la formation pour valider l'atteinte du niveau visé.</p>
<p>Signatures : Organisme _______ Client _______</p></div>`
  },
  {
    code: 'fp2_accord_informatique_bureautique',
    name: "Accord de service de formation en informatique bureautique",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Accord de formation aux outils bureautiques (Word, Excel, PowerPoint, etc.) à destination des entreprises et des particuliers.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'organisme_nom',label:"Organisme de formation",type:'text',required:true},
      {key:'stagiaire_nom',label:"Nom du stagiaire",type:'text',required:true},
      {key:'logiciels_formes',label:"Logiciels / modules couverts",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN INFORMATIQUE BUREAUTIQUE</h1>
<p><strong>Organisme :</strong> {{organisme_nom}}</p>
<p><strong>Stagiaire :</strong> {{stagiaire_nom}}</p>
<h2>Article 1 – Contenu</h2>
<p>La formation portera sur les logiciels et modules suivants : {{logiciels_formes}}.</p>
<h2>Article 2 – Début</h2>
<p>La formation débutera le {{date_debut}}.</p>
<h2>Article 3 – Attestation</h2>
<p>Une attestation de formation sera remise au stagiaire à l'issue du programme.</p>
<p>Signatures : Organisme _______ Stagiaire _______</p></div>`
  },
  {
    code: 'fp2_accord_securite_incendie',
    name: "Accord de service de formation en sécurité incendie (SSIAP)",
    category: 'academique', price: 3000, priceMax: 8000,
    description: "Accord pour la formation au Service de Sécurité Incendie et d'Assistance à Personnes (SSIAP), obligatoire pour certains établissements recevant du public.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'organisme_nom',label:"Organisme agréé",type:'text',required:true},
      {key:'entreprise_nom',label:"Nom de l'entreprise cliente",type:'text',required:true},
      {key:'nombre_agents',label:"Nombre d'agents à former",type:'text',required:true},
      {key:'niveau_ssiap',label:"Niveau SSIAP visé (1/2/3)",type:'text',required:true},
      {key:'date_formation',label:"Date de formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION SSIAP</h1>
<p><strong>Organisme agréé :</strong> {{organisme_nom}}</p>
<p><strong>Entreprise cliente :</strong> {{entreprise_nom}}</p>
<h2>Article 1 – Formation</h2>
<p>L'organisme s'engage à former {{nombre_agents}} agents au niveau SSIAP {{niveau_ssiap}}, le {{date_formation}}.</p>
<h2>Article 2 – Certification</h2>
<p>Les agents ayant satisfait aux épreuves recevront le certificat SSIAP correspondant au niveau visé.</p>
<h2>Article 3 – Conformité</h2>
<p>La formation est conforme aux normes en vigueur en matière de sécurité incendie applicables en Côte d'Ivoire.</p>
<p>Signatures : Organisme _______ Entreprise _______</p></div>`
  },
  {
    code: 'fp2_accord_sst',
    name: "Accord de service de formation en sauveteur secouriste du travail (SST)",
    category: 'academique', price: 2500, priceMax: 7000,
    description: "Accord de formation au secourisme du travail permettant à des salariés d'acquérir les gestes de premiers secours en milieu professionnel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'organisme_nom',label:"Organisme de formation",type:'text',required:true},
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true},
      {key:'lieu_formation',label:"Lieu de formation",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION SST</h1>
<p><strong>Organisme :</strong> {{organisme_nom}}</p>
<p><strong>Entreprise :</strong> {{entreprise_nom}}</p>
<h2>Article 1 – Formation SST</h2>
<p>L'organisme s'engage à former {{nombre_stagiaires}} salariés au sauvetage secourisme du travail, le {{date_formation}} à {{lieu_formation}}.</p>
<h2>Article 2 – Contenu</h2>
<p>La formation couvre les gestes de premiers secours : protection, alerte, secours aux victimes d'accidents du travail.</p>
<h2>Article 3 – Certification</h2>
<p>Les stagiaires reçoivent le certificat SST valable 24 mois, renouvelable par recyclage.</p>
<p>Signatures : Organisme _______ Entreprise _______</p></div>`
  },
  {
    code: 'fp2_rapport_performance_cfa',
    name: "Rapport de performance centre de formation",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Rapport annuel évaluant les performances pédagogiques et administratives d'un centre de formation professionnelle.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'cfa_nom',label:"Nom du centre de formation",type:'text',required:true},
      {key:'periode_rapport',label:"Période du rapport",type:'text',required:true},
      {key:'taux_insertion',label:"Taux d'insertion professionnelle (%)",type:'text',required:true},
      {key:'nombre_diplomes',label:"Nombre de diplômés",type:'text',required:true},
      {key:'observations',label:"Observations et recommandations",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – CENTRE DE FORMATION</h1>
<p><strong>Centre :</strong> {{cfa_nom}}</p>
<p><strong>Période :</strong> {{periode_rapport}}</p>
<h2>1. Résultats clés</h2>
<p>Nombre de diplômés : {{nombre_diplomes}}</p>
<p>Taux d'insertion professionnelle : {{taux_insertion}}%</p>
<h2>2. Observations</h2>
<p>{{observations}}</p>
<h2>3. Recommandations</h2>
<p>Les axes d'amélioration seront intégrés dans le plan d'action de la prochaine période.</p>
<p>Signature Direction : _______</p></div>`
  },
  {
    code: 'fp2_plan_formation_annuel',
    name: "Plan de formation annuel entreprise",
    category: 'academique', price: 2500, priceMax: 7000,
    description: "Document de planification annuelle des actions de formation d'une entreprise, conformément aux obligations légales ivoiriennes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'annee',label:"Année du plan",type:'text',required:true},
      {key:'actions_formation',label:"Actions de formation prévues",type:'textarea',required:true},
      {key:'budget_total',label:"Budget total de formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE FORMATION ANNUEL</h1>
<p><strong>Entreprise :</strong> {{entreprise_nom}}</p>
<p><strong>Année :</strong> {{annee}}</p>
<h2>1. Actions de formation planifiées</h2>
<p>{{actions_formation}}</p>
<h2>2. Budget</h2>
<p>Le budget total alloué à la formation pour {{annee}} est de {{budget_total}} FCFA.</p>
<h2>3. Financement FDFP</h2>
<p>L'entreprise sollicitera la prise en charge partielle par le FDFP dans les conditions prévues par la réglementation.</p>
<p>Visa DRH : _______ Visa Direction Générale : _______</p></div>`
  },
  {
    code: 'fp2_accord_conseil_ingenierie',
    name: "Accord de service de conseil en ingénierie de formation",
    category: 'academique', price: 4000, priceMax: 12000,
    description: "Accord de prestation de conseil pour la conception, l'ingénierie et l'évaluation de dispositifs de formation professionnelle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'consultant_nom',label:"Nom du consultant",type:'text',required:true},
      {key:'client_nom',label:"Nom du client",type:'text',required:true},
      {key:'mission_description',label:"Description de la mission",type:'textarea',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL EN INGENIERIE DE FORMATION</h1>
<p><strong>Consultant :</strong> {{consultant_nom}}</p>
<p><strong>Client :</strong> {{client_nom}}</p>
<h2>Article 1 – Mission</h2>
<p>{{mission_description}}</p>
<h2>Article 2 – Durée</h2>
<p>La mission s'étend sur une durée de {{duree_mission}}.</p>
<h2>Article 3 – Honoraires</h2>
<p>Les honoraires convenus sont de {{honoraires}} FCFA, payables selon l'échéancier joint en annexe.</p>
<p>Signatures : Consultant _______ Client _______</p></div>`
  },
  {
    code: 'fp2_accord_partenariat_cfa_entreprise',
    name: "Accord de partenariat CFA-entreprise d'accueil",
    category: 'academique', price: 3000, priceMax: 8000,
    description: "Accord de partenariat structurant la collaboration entre un CFA et une entreprise pour l'accueil et la formation d'apprentis.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'cfa_nom',label:"Nom du CFA",type:'text',required:true},
      {key:'entreprise_nom',label:"Nom de l'entreprise partenaire",type:'text',required:true},
      {key:'secteur_activite',label:"Secteur d'activité",type:'text',required:true},
      {key:'nombre_apprentis',label:"Nombre d'apprentis prévus",type:'text',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CFA – ENTREPRISE D'ACCUEIL</h1>
<p><strong>CFA :</strong> {{cfa_nom}}</p>
<p><strong>Entreprise partenaire :</strong> {{entreprise_nom}}</p>
<p><strong>Secteur :</strong> {{secteur_activite}}</p>
<h2>Article 1 – Objet</h2>
<p>Les parties s'engagent à collaborer pour l'accueil de {{nombre_apprentis}} apprentis sur une durée de {{duree_partenariat}}.</p>
<h2>Article 2 – Responsabilités</h2>
<p>Le CFA assure la formation théorique. L'entreprise fournit les conditions d'apprentissage pratique et désigne les maîtres d'apprentissage.</p>
<p>Signatures : CFA _______ Entreprise _______</p></div>`
  },
  {
    code: 'fp2_charte_formateur',
    name: "Charte du formateur professionnel",
    category: 'academique', price: 1500, priceMax: 4500,
    description: "Charte définissant les droits, devoirs et engagements déontologiques des formateurs professionnels intervenant en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'formateur_nom',label:"Nom du formateur",type:'text',required:true},
      {key:'organisme_nom',label:"Organisme de rattachement",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU FORMATEUR PROFESSIONNEL</h1>
<p><strong>Formateur :</strong> {{formateur_nom}}</p>
<p><strong>Organisme :</strong> {{organisme_nom}}</p>
<h2>1. Engagement de qualité</h2>
<p>Le formateur s'engage à dispenser des formations de qualité, adaptées aux besoins des apprenants et aux exigences du marché de l'emploi ivoirien.</p>
<h2>2. Déontologie</h2>
<p>Il respecte la confidentialité des informations personnelles des apprenants et s'abstient de tout conflit d'intérêts.</p>
<h2>3. Développement professionnel</h2>
<p>Le formateur s'engage à actualiser régulièrement ses connaissances et ses pratiques pédagogiques.</p>
<p>Signé le {{date_signature}} – Signature : _______</p></div>`
  },
  // ─── ENSEIGNEMENT SUPÉRIEUR PRIVÉ (sup_) ────────────────────────────────────
  {
    code: 'sup_contrat_scolarite_master',
    name: "Contrat de scolarité master 1 et 2",
    category: 'academique', price: 4000, priceMax: 12000,
    description: "Contrat de scolarité pour les étudiants inscrits en master 1 et 2 dans un établissement d'enseignement supérieur privé en Afrique francophone.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'etudiant_nom',label:"Nom de l'étudiant",type:'text',required:true},
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'mention_master',label:"Mention du master",type:'text',required:true},
      {key:'annee_universitaire',label:"Année universitaire",type:'text',required:true},
      {key:'frais_scolarite',label:"Frais de scolarité annuels (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SCOLARITE – MASTER 1 ET 2</h1>
<p><strong>Etudiant :</strong> {{etudiant_nom}}</p>
<p><strong>Etablissement :</strong> {{etablissement_nom}}</p>
<p><strong>Mention :</strong> {{mention_master}}</p>
<p><strong>Année universitaire :</strong> {{annee_universitaire}}</p>
<h2>Article 1 – Inscription</h2>
<p>L'étudiant s'inscrit en Master à l'établissement pour l'année universitaire {{annee_universitaire}}.</p>
<h2>Article 2 – Frais de scolarité</h2>
<p>Les frais de scolarité annuels s'élèvent à {{frais_scolarite}} FCFA, payables selon l'échéancier défini par l'établissement.</p>
<h2>Article 3 – Obligations</h2>
<p>L'étudiant s'engage à respecter le règlement intérieur et à s'acquitter des frais dans les délais convenus. L'établissement garantit la qualité des enseignements.</p>
<p>Signé le {{date_signature}} – Etudiant _______ Etablissement _______</p></div>`
  },
  {
    code: 'sup_contrat_scolarite_licence',
    name: "Contrat de scolarité licence 1, 2, 3",
    category: 'academique', price: 3000, priceMax: 9000,
    description: "Contrat de scolarité pour les étudiants inscrits en cycle licence (L1, L2, L3) dans un établissement d'enseignement supérieur privé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'etudiant_nom',label:"Nom de l'étudiant",type:'text',required:true},
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'filiere',label:"Filière",type:'text',required:true},
      {key:'niveau_licence',label:"Niveau (L1/L2/L3)",type:'text',required:true},
      {key:'annee_universitaire',label:"Année universitaire",type:'text',required:true},
      {key:'frais_scolarite',label:"Frais de scolarité (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SCOLARITE – LICENCE</h1>
<p><strong>Etudiant :</strong> {{etudiant_nom}}</p>
<p><strong>Etablissement :</strong> {{etablissement_nom}}</p>
<p><strong>Filière :</strong> {{filiere}} – Niveau : {{niveau_licence}}</p>
<p><strong>Année universitaire :</strong> {{annee_universitaire}}</p>
<h2>Article 1 – Engagement réciproque</h2>
<p>L'étudiant confirme son inscription et s'engage à verser les frais de scolarité de {{frais_scolarite}} FCFA selon le calendrier de paiement joint.</p>
<h2>Article 2 – Services inclus</h2>
<p>Les frais comprennent l'accès aux cours, à la bibliothèque et aux ressources numériques de l'établissement.</p>
<p>Signatures : Etudiant _______ Etablissement _______</p></div>`
  },
  {
    code: 'sup_accord_partenariat_bilateral',
    name: "Accord de partenariat universitaire bilatéral (double diplôme)",
    category: 'academique', price: 5000, priceMax: 15000,
    description: "Accord de coopération entre deux établissements d'enseignement supérieur pour la délivrance d'un double diplôme en cotutelle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'universite_a',label:"Etablissement A",type:'text',required:true},
      {key:'universite_b',label:"Etablissement B",type:'text',required:true},
      {key:'programme_commun',label:"Programme commun",type:'text',required:true},
      {key:'diplome_delivre',label:"Diplôme délivré",type:'text',required:true},
      {key:'duree_accord',label:"Durée de l'accord",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT UNIVERSITAIRE BILATERAL – DOUBLE DIPLOME</h1>
<p><strong>Etablissement A :</strong> {{universite_a}}</p>
<p><strong>Etablissement B :</strong> {{universite_b}}</p>
<h2>Article 1 – Objet</h2>
<p>Les deux établissements s'engagent à co-délivrer le diplôme <strong>{{diplome_delivre}}</strong> dans le cadre du programme commun : <strong>{{programme_commun}}</strong>.</p>
<h2>Article 2 – Durée</h2>
<p>Le présent accord est conclu pour une durée de {{duree_accord}}, renouvelable par accord des parties.</p>
<h2>Article 3 – Mobilité étudiante</h2>
<p>Les étudiants effectuent une partie de leur cursus dans chacun des deux établissements selon le plan d'études défini en annexe.</p>
<p>Signatures : Etablissement A _______ Etablissement B _______</p></div>`
  },
  {
    code: 'sup_accord_ecole_commerce',
    name: "Accord de service d'inscription en école de commerce",
    category: 'academique', price: 3500, priceMax: 10000,
    description: "Accord formalisant l'inscription d'un étudiant dans une école de commerce privée et définissant les droits et obligations de chaque partie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'etudiant_nom',label:"Nom de l'étudiant",type:'text',required:true},
      {key:'ecole_nom',label:"Nom de l'école de commerce",type:'text',required:true},
      {key:'programme',label:"Programme / Filière",type:'text',required:true},
      {key:'duree_formation',label:"Durée de la formation",type:'text',required:true},
      {key:'frais_annuels',label:"Frais annuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INSCRIPTION EN ECOLE DE COMMERCE</h1>
<p><strong>Etudiant :</strong> {{etudiant_nom}}</p>
<p><strong>Ecole :</strong> {{ecole_nom}}</p>
<h2>Article 1 – Programme</h2>
<p>L'étudiant est admis dans le programme <strong>{{programme}}</strong>, d'une durée de {{duree_formation}}.</p>
<h2>Article 2 – Frais</h2>
<p>Les frais annuels de scolarité s'élèvent à {{frais_annuels}} FCFA.</p>
<h2>Article 3 – Services</h2>
<p>L'école s'engage à dispenser les enseignements, à encadrer les stages et à accompagner l'insertion professionnelle de l'étudiant.</p>
<p>Signatures : Etudiant _______ Ecole _______</p></div>`
  },
  {
    code: 'sup_accord_ecole_ingenieurs',
    name: "Accord de service d'inscription en école d'ingénieurs",
    category: 'academique', price: 4000, priceMax: 12000,
    description: "Accord d'inscription dans une école d'ingénieurs privée, précisant le programme, la durée et les conditions financières.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'etudiant_nom',label:"Nom de l'étudiant",type:'text',required:true},
      {key:'ecole_nom',label:"Nom de l'école d'ingénieurs",type:'text',required:true},
      {key:'specialite',label:"Spécialité d'ingénierie",type:'text',required:true},
      {key:'duree_cycle',label:"Durée du cycle",type:'text',required:true},
      {key:'frais_annuels',label:"Frais annuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INSCRIPTION EN ECOLE D'INGENIEURS</h1>
<p><strong>Etudiant :</strong> {{etudiant_nom}}</p>
<p><strong>Ecole :</strong> {{ecole_nom}}</p>
<h2>Article 1 – Spécialité</h2>
<p>L'étudiant est inscrit en cycle ingénieur, spécialité <strong>{{specialite}}</strong>, pour une durée de {{duree_cycle}}.</p>
<h2>Article 2 – Frais</h2>
<p>Les frais annuels sont de {{frais_annuels}} FCFA.</p>
<h2>Article 3 – Formation</h2>
<p>L'école garantit une formation théorique et pratique conforme aux standards internationaux d'ingénierie.</p>
<p>Signatures : Etudiant _______ Ecole _______</p></div>`
  },
  {
    code: 'sup_accord_ecole_droit',
    name: "Accord de service d'inscription en école de droit",
    category: 'academique', price: 3500, priceMax: 10000,
    description: "Accord d'inscription dans une école de droit privée en zone OHADA, avec mention des programmes et des conditions de formation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'etudiant_nom',label:"Nom de l'étudiant",type:'text',required:true},
      {key:'ecole_nom',label:"Nom de l'école de droit",type:'text',required:true},
      {key:'cycle_etudes',label:"Cycle d'études (Licence / Master)",type:'text',required:true},
      {key:'annee_universitaire',label:"Année universitaire",type:'text',required:true},
      {key:'frais_scolarite',label:"Frais de scolarité (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INSCRIPTION EN ECOLE DE DROIT</h1>
<p><strong>Etudiant :</strong> {{etudiant_nom}}</p>
<p><strong>Ecole :</strong> {{ecole_nom}}</p>
<h2>Article 1 – Cycle et année</h2>
<p>L'étudiant est admis en <strong>{{cycle_etudes}}</strong> pour l'année universitaire {{annee_universitaire}}.</p>
<h2>Article 2 – Frais</h2>
<p>Les frais de scolarité sont de {{frais_scolarite}} FCFA.</p>
<h2>Article 3 – Formation OHADA</h2>
<p>L'enseignement intègre le droit OHADA, le droit des affaires et le droit public ivoirien.</p>
<p>Signatures : Etudiant _______ Ecole _______</p></div>`
  },
  {
    code: 'sup_accord_mba',
    name: "Accord de service de MBA (Master en Administration des Affaires)",
    category: 'academique', price: 5000, priceMax: 15000,
    description: "Accord d'inscription et de service pour un programme MBA dispensé par un établissement d'enseignement supérieur privé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'candidat_nom',label:"Nom du candidat",type:'text',required:true},
      {key:'ecole_nom',label:"Nom de l'école",type:'text',required:true},
      {key:'specialisation_mba',label:"Spécialisation MBA",type:'text',required:true},
      {key:'duree_programme',label:"Durée du programme",type:'text',required:true},
      {key:'frais_programme',label:"Frais totaux du programme (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MBA</h1>
<p><strong>Candidat :</strong> {{candidat_nom}}</p>
<p><strong>Ecole :</strong> {{ecole_nom}}</p>
<h2>Article 1 – Programme</h2>
<p>Le candidat est admis au programme MBA, spécialisation <strong>{{specialisation_mba}}</strong>, d'une durée de {{duree_programme}}.</p>
<h2>Article 2 – Coût total</h2>
<p>Les frais du programme s'élèvent à {{frais_programme}} FCFA, couvrant les cours, les études de cas et les séminaires.</p>
<h2>Article 3 – Réseau et carrière</h2>
<p>L'école facilite l'accès au réseau alumni et aux opportunités de carrière à l'issue du programme.</p>
<p>Signatures : Candidat _______ Ecole _______</p></div>`
  },
  {
    code: 'sup_contrat_doctorat_professionnel',
    name: "Contrat de service de doctorat professionnel",
    category: 'academique', price: 6000, priceMax: 18000,
    description: "Contrat encadrant l'inscription et le suivi d'un doctorat professionnel dans un établissement d'enseignement supérieur privé en Afrique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'doctorant_nom',label:"Nom du doctorant",type:'text',required:true},
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'sujet_these',label:"Sujet de la thèse",type:'textarea',required:true},
      {key:'directeur_these',label:"Directeur de thèse",type:'text',required:true},
      {key:'duree_doctorat',label:"Durée prévue du doctorat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE – DOCTORAT PROFESSIONNEL</h1>
<p><strong>Doctorant :</strong> {{doctorant_nom}}</p>
<p><strong>Etablissement :</strong> {{etablissement_nom}}</p>
<p><strong>Directeur de thèse :</strong> {{directeur_these}}</p>
<h2>Article 1 – Sujet</h2>
<p>{{sujet_these}}</p>
<h2>Article 2 – Durée</h2>
<p>Le doctorat se déroulera sur une durée de {{duree_doctorat}}.</p>
<h2>Article 3 – Encadrement</h2>
<p>Le directeur de thèse assure un encadrement régulier et facilite la publication des travaux du doctorant.</p>
<p>Signatures : Doctorant _______ Directeur _______ Etablissement _______</p></div>`
  },
  {
    code: 'sup_accord_executive_education',
    name: "Accord de service de formation continue cadres (Executive Education)",
    category: 'academique', price: 5000, priceMax: 15000,
    description: "Accord de formation continue destiné aux cadres et dirigeants d'entreprise, combinant modules académiques et retours d'expérience.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'participant_nom',label:"Nom du participant",type:'text',required:true},
      {key:'ecole_nom',label:"Nom de l'école",type:'text',required:true},
      {key:'programme_nom',label:"Nom du programme",type:'text',required:true},
      {key:'duree_programme',label:"Durée du programme",type:'text',required:true},
      {key:'frais_programme',label:"Frais du programme (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – EXECUTIVE EDUCATION</h1>
<p><strong>Participant :</strong> {{participant_nom}}</p>
<p><strong>Ecole :</strong> {{ecole_nom}}</p>
<h2>Article 1 – Programme</h2>
<p>Le participant est admis dans le programme <strong>{{programme_nom}}</strong>, d'une durée de {{duree_programme}}.</p>
<h2>Article 2 – Frais</h2>
<p>Les frais du programme s'élèvent à {{frais_programme}} FCFA.</p>
<h2>Article 3 – Contenu</h2>
<p>Le programme combine conférences, études de cas, séminaires et networking avec des dirigeants d'entreprise de la région.</p>
<p>Signatures : Participant _______ Ecole _______</p></div>`
  },
  {
    code: 'sup_accord_cotutelle_these',
    name: "Accord de cotutelle de thèse internationale",
    category: 'academique', price: 5000, priceMax: 14000,
    description: "Accord de cotutelle permettant à un doctorant de préparer sa thèse sous la direction conjointe de deux établissements situés dans deux pays différents.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'doctorant_nom',label:"Nom du doctorant",type:'text',required:true},
      {key:'etablissement_a',label:"Etablissement d'origine",type:'text',required:true},
      {key:'etablissement_b',label:"Etablissement partenaire",type:'text',required:true},
      {key:'directeur_a',label:"Directeur de thèse (origine)",type:'text',required:true},
      {key:'directeur_b',label:"Directeur de thèse (partenaire)",type:'text',required:true},
      {key:'sujet_these',label:"Sujet de thèse",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COTUTELLE DE THESE INTERNATIONALE</h1>
<p><strong>Doctorant :</strong> {{doctorant_nom}}</p>
<p><strong>Etablissement d'origine :</strong> {{etablissement_a}} – Directeur : {{directeur_a}}</p>
<p><strong>Etablissement partenaire :</strong> {{etablissement_b}} – Directeur : {{directeur_b}}</p>
<h2>Article 1 – Sujet</h2>
<p>{{sujet_these}}</p>
<h2>Article 2 – Modalités de cotutelle</h2>
<p>Le doctorant partagera son temps de recherche entre les deux établissements selon un calendrier défini conjointement.</p>
<h2>Article 3 – Diplôme</h2>
<p>A l'issue de la soutenance, le diplôme de doctorat sera co-délivré par les deux établissements.</p>
<p>Signatures : Doctorant _______ Etablissement A _______ Etablissement B _______</p></div>`
  },
  {
    code: 'sup_accord_incubateur_universitaire',
    name: "Accord de service d'incubateur universitaire de startups",
    category: 'academique', price: 3000, priceMax: 9000,
    description: "Accord encadrant l'accompagnement d'une startup par un incubateur universitaire, incluant l'accès aux ressources, au mentorat et aux réseaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'incubateur_nom',label:"Nom de l'incubateur",type:'text',required:true},
      {key:'porteur_projet',label:"Porteur de projet",type:'text',required:true},
      {key:'duree_incubation',label:"Durée d'incubation",type:'text',required:true},
      {key:'services_inclus',label:"Services inclus",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – INCUBATEUR UNIVERSITAIRE</h1>
<p><strong>Startup :</strong> {{startup_nom}}</p>
<p><strong>Incubateur :</strong> {{incubateur_nom}}</p>
<p><strong>Porteur de projet :</strong> {{porteur_projet}}</p>
<h2>Article 1 – Durée d'incubation</h2>
<p>L'incubateur s'engage à accompagner la startup pendant {{duree_incubation}}.</p>
<h2>Article 2 – Services</h2>
<p>{{services_inclus}}</p>
<h2>Article 3 – Contreparties</h2>
<p>En échange de l'accompagnement, les modalités de participation de l'incubateur au capital ou aux revenus de la startup sont définies en annexe.</p>
<p>Signatures : Startup _______ Incubateur _______</p></div>`
  },
  {
    code: 'sup_accord_reseau_alumni',
    name: "Accord de service de réseau alumni",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Accord de membership et de services pour les anciens étudiants (alumni) d'un établissement d'enseignement supérieur.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'alumni_nom',label:"Nom de l'alumni",type:'text',required:true},
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'promotion',label:"Promotion d'obtention du diplôme",type:'text',required:true},
      {key:'cotisation_annuelle',label:"Cotisation annuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – RESEAU ALUMNI</h1>
<p><strong>Alumni :</strong> {{alumni_nom}}</p>
<p><strong>Etablissement :</strong> {{etablissement_nom}}</p>
<p><strong>Promotion :</strong> {{promotion}}</p>
<h2>Article 1 – Membership</h2>
<p>{{alumni_nom}} adhère au réseau alumni de {{etablissement_nom}} moyennant une cotisation annuelle de {{cotisation_annuelle}} FCFA.</p>
<h2>Article 2 – Avantages</h2>
<p>Le membre bénéficie des événements networking, des offres d'emploi en avant-première et des ressources pédagogiques en ligne.</p>
<p>Signature : Alumni _______</p></div>`
  },
  {
    code: 'sup_accord_recherche_appliquee',
    name: "Accord de service de recherche appliquée pour entreprise",
    category: 'academique', price: 6000, priceMax: 18000,
    description: "Accord entre un établissement d'enseignement supérieur et une entreprise pour la conduite de travaux de recherche appliquée répondant à des problématiques industrielles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Etablissement de recherche",type:'text',required:true},
      {key:'entreprise_nom',label:"Entreprise commanditaire",type:'text',required:true},
      {key:'sujet_recherche',label:"Sujet de recherche",type:'textarea',required:true},
      {key:'budget_recherche',label:"Budget de recherche (FCFA)",type:'text',required:true},
      {key:'duree_projet',label:"Durée du projet",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECHERCHE APPLIQUEE</h1>
<p><strong>Etablissement :</strong> {{etablissement_nom}}</p>
<p><strong>Entreprise commanditaire :</strong> {{entreprise_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>{{sujet_recherche}}</p>
<h2>Article 2 – Budget et durée</h2>
<p>Le budget alloué est de {{budget_recherche}} FCFA pour une durée de {{duree_projet}}.</p>
<h2>Article 3 – Propriété intellectuelle</h2>
<p>Les résultats de la recherche appartiennent conjointement aux deux parties, selon les modalités définies en annexe.</p>
<p>Signatures : Etablissement _______ Entreprise _______</p></div>`
  },
  {
    code: 'sup_accord_partenariat_collectivites',
    name: "Accord de partenariat grandes écoles-collectivités",
    category: 'academique', price: 4000, priceMax: 12000,
    description: "Accord de coopération entre une grande école et une collectivité territoriale pour soutenir le développement local par la formation et la recherche.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'ecole_nom',label:"Nom de l'école",type:'text',required:true},
      {key:'collectivite_nom',label:"Nom de la collectivité",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT – GRANDES ECOLES ET COLLECTIVITES</h1>
<p><strong>Grande école :</strong> {{ecole_nom}}</p>
<p><strong>Collectivité :</strong> {{collectivite_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>{{objet_partenariat}}</p>
<h2>Article 2 – Durée</h2>
<p>Le présent accord est conclu pour {{duree_partenariat}}, renouvelable par accord des parties.</p>
<h2>Article 3 – Engagements</h2>
<p>L'école met à disposition son expertise et ses ressources humaines. La collectivité facilite l'accès au terrain et finance les projets identifiés conjointement.</p>
<p>Signatures : Ecole _______ Collectivité _______</p></div>`
  },
  {
    code: 'sup_accord_classe_preparatoire',
    name: "Accord de service de classe préparatoire privée",
    category: 'academique', price: 3500, priceMax: 10000,
    description: "Accord d'inscription dans une classe préparatoire privée aux grandes écoles, précisant le programme et les conditions d'encadrement.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'etudiant_nom',label:"Nom de l'étudiant",type:'text',required:true},
      {key:'etablissement_nom',label:"Etablissement préparatoire",type:'text',required:true},
      {key:'type_prepa',label:"Type de prépa (ECG/MPSI/etc.)",type:'text',required:true},
      {key:'annee_scolaire',label:"Année scolaire",type:'text',required:true},
      {key:'frais_annuels',label:"Frais annuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CLASSE PREPARATOIRE PRIVEE</h1>
<p><strong>Etudiant :</strong> {{etudiant_nom}}</p>
<p><strong>Etablissement :</strong> {{etablissement_nom}}</p>
<p><strong>Type de prépa :</strong> {{type_prepa}}</p>
<p><strong>Année scolaire :</strong> {{annee_scolaire}}</p>
<h2>Article 1 – Formation</h2>
<p>L'établissement s'engage à préparer l'étudiant aux concours d'entrée aux grandes écoles selon le programme de la classe {{type_prepa}}.</p>
<h2>Article 2 – Frais</h2>
<p>Les frais annuels s'élèvent à {{frais_annuels}} FCFA.</p>
<p>Signatures : Etudiant _______ Parents/Tuteur _______ Etablissement _______</p></div>`
  },
  {
    code: 'sup_accord_soutien_universitaire',
    name: "Accord de service de soutien scolaire universitaire",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Accord entre un organisme de soutien et un étudiant universitaire pour un accompagnement personnalisé dans les matières en difficulté.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'etudiant_nom',label:"Nom de l'étudiant",type:'text',required:true},
      {key:'organisme_nom',label:"Organisme de soutien",type:'text',required:true},
      {key:'matieres_concernees',label:"Matières concernées",type:'text',required:true},
      {key:'nombre_heures',label:"Nombre d'heures de soutien",type:'text',required:true},
      {key:'tarif_heure',label:"Tarif horaire (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SOUTIEN SCOLAIRE UNIVERSITAIRE</h1>
<p><strong>Etudiant :</strong> {{etudiant_nom}}</p>
<p><strong>Organisme :</strong> {{organisme_nom}}</p>
<h2>Article 1 – Matières</h2>
<p>Le soutien portera sur : <strong>{{matieres_concernees}}</strong>.</p>
<h2>Article 2 – Volume et tarif</h2>
<p>{{nombre_heures}} heures de soutien seront assurées au tarif de {{tarif_heure}} FCFA/heure.</p>
<h2>Article 3 – Suivi</h2>
<p>Un bilan mensuel de progression sera communiqué à l'étudiant et, le cas échéant, à sa famille.</p>
<p>Signatures : Etudiant _______ Organisme _______</p></div>`
  },
  {
    code: 'sup_accord_stage_longue_duree',
    name: "Accord de stage longue durée entreprise-école",
    category: 'academique', price: 2500, priceMax: 7000,
    description: "Convention organisant un stage de longue durée (6 mois et plus) entre un étudiant, son école et une entreprise d'accueil.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'etudiant_nom',label:"Nom de l'étudiant",type:'text',required:true},
      {key:'ecole_nom',label:"Nom de l'école",type:'text',required:true},
      {key:'entreprise_nom',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'mission_stage',label:"Mission du stage",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'duree_stage',label:"Durée du stage",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE STAGE LONGUE DUREE</h1>
<p><strong>Etudiant :</strong> {{etudiant_nom}}</p>
<p><strong>Ecole :</strong> {{ecole_nom}}</p>
<p><strong>Entreprise :</strong> {{entreprise_nom}}</p>
<h2>Article 1 – Mission</h2>
<p>{{mission_stage}}</p>
<h2>Article 2 – Période</h2>
<p>Le stage débutera le {{date_debut}} et durera {{duree_stage}}.</p>
<h2>Article 3 – Encadrement</h2>
<p>L'entreprise désigne un maître de stage. L'école assure un suivi pédagogique régulier.</p>
<p>Signatures : Etudiant _______ Ecole _______ Entreprise _______</p></div>`
  },
  {
    code: 'sup_accord_visite_pedagogique',
    name: "Accord de visite d'entreprise pédagogique",
    category: 'academique', price: 1500, priceMax: 4000,
    description: "Accord organisant une visite d'entreprise à vocation pédagogique pour un groupe d'étudiants d'un établissement d'enseignement supérieur.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'entreprise_nom',label:"Nom de l'entreprise visitée",type:'text',required:true},
      {key:'nombre_etudiants',label:"Nombre d'étudiants",type:'text',required:true},
      {key:'date_visite',label:"Date de la visite",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VISITE D'ENTREPRISE PEDAGOGIQUE</h1>
<p><strong>Etablissement :</strong> {{etablissement_nom}}</p>
<p><strong>Entreprise visitée :</strong> {{entreprise_nom}}</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord organise la visite pédagogique de {{nombre_etudiants}} étudiants au sein de {{entreprise_nom}}, le {{date_visite}}.</p>
<h2>Article 2 – Déroulement</h2>
<p>L'entreprise désigne un responsable pour accueillir et guider le groupe. L'établissement désigne un enseignant accompagnateur.</p>
<h2>Article 3 – Sécurité</h2>
<p>Les étudiants respectent les consignes de sécurité de l'entreprise. Toute prise de vue ou enregistrement est soumis à l'accord préalable de l'entreprise.</p>
<p>Signatures : Etablissement _______ Entreprise _______</p></div>`
  },
  {
    code: 'sup_accord_concours_grandes_ecoles',
    name: "Accord de concours d'entrée aux grandes écoles",
    category: 'academique', price: 3000, priceMax: 8000,
    description: "Accord organisant les conditions d'inscription et de participation à un concours d'entrée commun aux grandes écoles privées d'Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'candidat_nom',label:"Nom du candidat",type:'text',required:true},
      {key:'concours_nom',label:"Nom du concours",type:'text',required:true},
      {key:'ecoles_participantes',label:"Ecoles participantes",type:'textarea',required:true},
      {key:'date_epreuves',label:"Date des épreuves",type:'date',required:true},
      {key:'frais_inscription',label:"Frais d'inscription (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCOURS D'ENTREE AUX GRANDES ECOLES</h1>
<p><strong>Candidat :</strong> {{candidat_nom}}</p>
<p><strong>Concours :</strong> {{concours_nom}}</p>
<p><strong>Ecoles participantes :</strong> {{ecoles_participantes}}</p>
<h2>Article 1 – Inscription</h2>
<p>Le candidat s'inscrit au concours {{concours_nom}} moyennant des frais de {{frais_inscription}} FCFA.</p>
<h2>Article 2 – Epreuves</h2>
<p>Les épreuves se dérouleront le {{date_epreuves}}. Le règlement du concours est joint en annexe.</p>
<h2>Article 3 – Résultats</h2>
<p>Les résultats seront communiqués aux candidats dans les délais prévus par le jury.</p>
<p>Signature Candidat : _______</p></div>`
  },
  {
    code: 'sup_accord_certification_dscg',
    name: "Accord de certification professionnelle en comptabilité (DSCG)",
    category: 'academique', price: 4000, priceMax: 12000,
    description: "Accord d'inscription et d'accompagnement pour la préparation au Diplôme Supérieur de Comptabilité et Gestion (DSCG) ou équivalent OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'candidat_nom',label:"Nom du candidat",type:'text',required:true},
      {key:'centre_preparation',label:"Centre de préparation",type:'text',required:true},
      {key:'unites_enseignement',label:"Unités d'enseignement visées",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début des cours",type:'date',required:true},
      {key:'frais_preparation',label:"Frais de préparation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION – DSCG / COMPTABILITE</h1>
<p><strong>Candidat :</strong> {{candidat_nom}}</p>
<p><strong>Centre de préparation :</strong> {{centre_preparation}}</p>
<h2>Article 1 – Unités visées</h2>
<p>{{unites_enseignement}}</p>
<h2>Article 2 – Formation</h2>
<p>La préparation débute le {{date_debut}} et couvre les UE retenues pour la prochaine session d'examen.</p>
<h2>Article 3 – Frais</h2>
<p>Les frais de préparation s'élèvent à {{frais_preparation}} FCFA.</p>
<p>Signatures : Candidat _______ Centre _______</p></div>`
  },
  {
    code: 'sup_accord_certification_pmp',
    name: "Accord de certification en management de projet (PMP/Prince2)",
    category: 'academique', price: 4000, priceMax: 12000,
    description: "Accord de préparation et d'accompagnement à la certification PMP ou PRINCE2 en management de projet.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'candidat_nom',label:"Nom du candidat",type:'text',required:true},
      {key:'organisme_nom',label:"Organisme de formation",type:'text',required:true},
      {key:'certification_visee',label:"Certification visée (PMP / PRINCE2)",type:'text',required:true},
      {key:'duree_preparation',label:"Durée de préparation",type:'text',required:true},
      {key:'frais_formation',label:"Frais de formation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION – MANAGEMENT DE PROJET</h1>
<p><strong>Candidat :</strong> {{candidat_nom}}</p>
<p><strong>Organisme :</strong> {{organisme_nom}}</p>
<h2>Article 1 – Certification</h2>
<p>L'organisme prépare le candidat à la certification <strong>{{certification_visee}}</strong> sur une durée de {{duree_preparation}}.</p>
<h2>Article 2 – Frais</h2>
<p>Les frais de formation sont de {{frais_formation}} FCFA (hors frais d'examen officiel).</p>
<h2>Article 3 – Garantie</h2>
<p>En cas d'échec à l'examen, une session de rattrapage est proposée dans les conditions définies en annexe.</p>
<p>Signatures : Candidat _______ Organisme _______</p></div>`
  },
  {
    code: 'sup_accord_certification_acca',
    name: "Accord de certification ACCA (comptabilité internationale)",
    category: 'academique', price: 5000, priceMax: 15000,
    description: "Accord de préparation aux examens ACCA (Association of Chartered Certified Accountants) pour les professionnels de la comptabilité en Afrique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'candidat_nom',label:"Nom du candidat",type:'text',required:true},
      {key:'centre_agréé_nom',label:"Centre agréé ACCA",type:'text',required:true},
      {key:'modules_acca',label:"Modules ACCA visés",type:'textarea',required:true},
      {key:'session_examen',label:"Session d'examen cible",type:'text',required:true},
      {key:'frais_preparation',label:"Frais de préparation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION ACCA</h1>
<p><strong>Candidat :</strong> {{candidat_nom}}</p>
<p><strong>Centre agréé :</strong> {{centre_agréé_nom}}</p>
<h2>Article 1 – Modules</h2>
<p>Le programme couvre les modules ACCA suivants : {{modules_acca}}.</p>
<h2>Article 2 – Session cible</h2>
<p>La préparation vise la session d'examen : {{session_examen}}.</p>
<h2>Article 3 – Frais</h2>
<p>Les frais de préparation sont de {{frais_preparation}} FCFA, hors frais d'enregistrement ACCA.</p>
<p>Signatures : Candidat _______ Centre agréé _______</p></div>`
  },
  {
    code: 'sup_accord_certification_rh',
    name: "Accord de certification RH (SHRM/CIPD)",
    category: 'academique', price: 4500, priceMax: 13000,
    description: "Accord de préparation aux certifications professionnelles en ressources humaines reconnues internationalement (SHRM, CIPD) pour les DRH africains.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'candidat_nom',label:"Nom du candidat",type:'text',required:true},
      {key:'organisme_nom',label:"Organisme de préparation",type:'text',required:true},
      {key:'certification_rh',label:"Certification RH visée (SHRM-CP / CIPD L5)",type:'text',required:true},
      {key:'duree_preparation',label:"Durée de préparation",type:'text',required:true},
      {key:'frais',label:"Frais de préparation (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION RH</h1>
<p><strong>Candidat :</strong> {{candidat_nom}}</p>
<p><strong>Organisme :</strong> {{organisme_nom}}</p>
<h2>Article 1 – Certification</h2>
<p>L'organisme prépare le candidat à la certification <strong>{{certification_rh}}</strong> sur une période de {{duree_preparation}}.</p>
<h2>Article 2 – Frais</h2>
<p>Les frais de préparation s'élèvent à {{frais}} FCFA.</p>
<h2>Article 3 – Modalités d'examen</h2>
<p>Le candidat s'inscrit directement auprès de l'organisme certificateur international pour l'examen officiel.</p>
<p>Signatures : Candidat _______ Organisme _______</p></div>`
  },
  {
    code: 'sup_rapport_performance_sup',
    name: "Rapport de performance établissement d'enseignement supérieur",
    category: 'academique', price: 3000, priceMax: 9000,
    description: "Rapport annuel d'évaluation des performances académiques, administratives et financières d'un établissement d'enseignement supérieur privé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'annee_academique',label:"Année académique",type:'text',required:true},
      {key:'taux_reussite',label:"Taux de réussite global (%)",type:'text',required:true},
      {key:'nombre_diplomes',label:"Nombre de diplômés",type:'text',required:true},
      {key:'faits_marquants',label:"Faits marquants et recommandations",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – ETABLISSEMENT D'ENSEIGNEMENT SUPERIEUR</h1>
<p><strong>Etablissement :</strong> {{etablissement_nom}}</p>
<p><strong>Année académique :</strong> {{annee_academique}}</p>
<h2>1. Indicateurs clés</h2>
<p>Taux de réussite : {{taux_reussite}}% | Diplômés : {{nombre_diplomes}}</p>
<h2>2. Faits marquants</h2>
<p>{{faits_marquants}}</p>
<h2>3. Plan d'action</h2>
<p>Les axes d'amélioration identifiés seront intégrés dans le projet stratégique de l'établissement pour la prochaine année académique.</p>
<p>Signature Direction Générale : _______</p></div>`
  },
  {
    code: 'sup_charte_excellence_academique',
    name: "Charte de l'excellence académique en Afrique",
    category: 'academique', price: 2000, priceMax: 6000,
    description: "Charte engageant un établissement d'enseignement supérieur privé à respecter des standards d'excellence académique adaptés au contexte africain.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'etablissement_nom',label:"Nom de l'établissement",type:'text',required:true},
      {key:'representant_nom',label:"Nom du représentant légal",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'EXCELLENCE ACADEMIQUE EN AFRIQUE</h1>
<p><strong>Etablissement :</strong> {{etablissement_nom}}</p>
<p><strong>Représentant légal :</strong> {{representant_nom}}</p>
<h2>Préambule</h2>
<p>Convaincus que l'excellence académique est un levier essentiel du développement durable en Afrique, les signataires s'engagent à promouvoir la qualité, l'équité et l'innovation dans l'enseignement supérieur.</p>
<h2>Article 1 – Qualité des enseignements</h2>
<p>L'établissement s'engage à recruter des enseignants qualifiés et à mettre en œuvre des méthodes pédagogiques innovantes.</p>
<h2>Article 2 – Insertion professionnelle</h2>
<p>L'établissement œuvre activement pour l'employabilité de ses diplômés en développant des partenariats avec les entreprises locales et régionales.</p>
<h2>Article 3 – Intégrité académique</h2>
<p>Toute forme de fraude ou de corruption académique est proscrite. L'établissement garantit l'équité dans l'évaluation des étudiants.</p>
<p>Adopté le {{date_adoption}} – Signature : {{representant_nom}} _______</p></div>`
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
  console.log(`Batch 61b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
