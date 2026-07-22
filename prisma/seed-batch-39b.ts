import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 Enseignement supérieur / Recherche (préfixe univ_) ──
  {
    code: 'univ_convention_partenariat',
    name: "Convention de partenariat universitaire",
    category: 'academique',
    price: 5000,
    priceMax: 15000,
    description: "Convention de partenariat entre deux universités pour la coopération académique et scientifique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'universite_a',label:"Nom de l'université A",type:'text',required:true},
      {key:'universite_b',label:"Nom de l'université B",type:'text',required:true},
      {key:'domaines_cooperation',label:"Domaines de coopération",type:'textarea',required:true},
      {key:'duree',label:"Durée de la convention",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT UNIVERSITAIRE</h1><p>Entre <strong>{{universite_a}}</strong> et <strong>{{universite_b}}</strong>,</p><p>Il est convenu d'établir un partenariat académique portant sur les domaines suivants : {{domaines_cooperation}}</p><p>La présente convention est conclue pour une durée de {{duree}}, à compter du {{date_signature}}.</p><p>Les deux parties s'engagent à favoriser les échanges d'enseignants, de chercheurs et d'étudiants, ainsi que la mise en œuvre de projets communs de recherche et d'enseignement.</p></div>`
  },
  {
    code: 'univ_accord_double_diplome',
    name: "Accord de double-diplôme international",
    category: 'academique',
    price: 6000,
    priceMax: 18000,
    description: "Accord entre établissements pour la délivrance conjointe d'un double diplôme international.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'etablissement_local',label:"Établissement local",type:'text',required:true},
      {key:'etablissement_etranger',label:"Établissement étranger",type:'text',required:true},
      {key:'programme',label:"Intitulé du programme",type:'text',required:true},
      {key:'niveau',label:"Niveau du diplôme (Master, Licence...)",type:'text',required:true},
      {key:'date_entree_vigueur',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DOUBLE-DIPLÔME INTERNATIONAL</h1><p><strong>{{etablissement_local}}</strong> et <strong>{{etablissement_etranger}}</strong> conviennent de délivrer conjointement le diplôme : <strong>{{programme}}</strong> (niveau {{niveau}}).</p><p>Cet accord prend effet le {{date_entree_vigueur}} et régit les conditions d'admission, de mobilité, de validation des crédits et de délivrance des titres aux étudiants des deux institutions.</p></div>`
  },
  {
    code: 'univ_contrat_recherche_collaborative',
    name: "Contrat de recherche collaborative université-entreprise",
    category: 'academique',
    price: 8000,
    priceMax: 24000,
    description: "Contrat encadrant un projet de recherche mené conjointement par une université et une entreprise.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'universite',label:"Université partenaire",type:'text',required:true},
      {key:'entreprise',label:"Entreprise partenaire",type:'text',required:true},
      {key:'titre_projet',label:"Titre du projet de recherche",type:'text',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true},
      {key:'duree_projet',label:"Durée du projet",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RECHERCHE COLLABORATIVE</h1><p><strong>{{universite}}</strong> (ci-après "l'Université") et <strong>{{entreprise}}</strong> (ci-après "l'Entreprise") s'engagent à conduire conjointement le projet intitulé : <em>{{titre_projet}}</em>.</p><p>Budget total : <strong>{{budget_total}} FCFA</strong> — Durée : {{duree_projet}} — Début : {{date_debut}}.</p><p>Les droits de propriété intellectuelle sur les résultats seront partagés selon les modalités définies en annexe. L'Université désigne un responsable scientifique et l'Entreprise un responsable technique.</p></div>`
  },
  {
    code: 'univ_accord_chaire_enseignement',
    name: "Accord de chaire d'enseignement",
    category: 'academique',
    price: 7000,
    priceMax: 21000,
    description: "Accord créant une chaire d'enseignement financée ou co-animée par un partenaire extérieur.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'universite',label:"Université d'accueil",type:'text',required:true},
      {key:'partenaire',label:"Partenaire financeur",type:'text',required:true},
      {key:'intitule_chaire',label:"Intitulé de la chaire",type:'text',required:true},
      {key:'dotation_annuelle',label:"Dotation annuelle (FCFA)",type:'text',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CHAIRE D"ENSEIGNEMENT</h1><p>L'Université <strong>{{universite}}</strong> et <strong>{{partenaire}}</strong> créent conjointement la chaire <em>{{intitule_chaire}}</em>.</p><p>Le partenaire s'engage à verser une dotation annuelle de <strong>{{dotation_annuelle}} FCFA</strong>. La chaire est instituée à compter du {{date_creation}} pour une période renouvelable de cinq (5) ans.</p></div>`
  },
  {
    code: 'univ_contrat_vacataire',
    name: "Contrat d'enseignant-chercheur vacataire",
    category: 'academique',
    price: 3000,
    priceMax: 8000,
    description: "Contrat d'intervention d'un enseignant-chercheur vacataire dans un établissement d'enseignement supérieur.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'nom_vacataire',label:"Nom et prénoms du vacataire",type:'text',required:true},
      {key:'module',label:"Module/Matière enseigné(e)",type:'text',required:true},
      {key:'volume_horaire',label:"Volume horaire total (heures)",type:'text',required:true},
      {key:'taux_horaire',label:"Taux horaire (FCFA)",type:'text',required:true},
      {key:'periode',label:"Période d'intervention",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D"ENSEIGNANT-CHERCHEUR VACATAIRE</h1><p>Il est fait appel à <strong>{{nom_vacataire}}</strong> pour dispenser le module <em>{{module}}</em> pour un volume horaire de <strong>{{volume_horaire}} heures</strong>.</p><p>La rémunération est fixée à <strong>{{taux_horaire}} FCFA/heure</strong>. Période : {{periode}}.</p><p>Le vacataire s'engage à respecter les programmes pédagogiques approuvés et à évaluer les étudiants selon le calendrier établi par l'institution.</p></div>`
  },
  {
    code: 'univ_accord_service_labo',
    name: "Accord de service de laboratoire de recherche",
    category: 'academique',
    price: 5000,
    priceMax: 15000,
    description: "Accord encadrant la mise à disposition des équipements et services d'un laboratoire universitaire à un tiers.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 50,
    fieldsJson: F([
      {key:'laboratoire',label:"Nom du laboratoire",type:'text',required:true},
      {key:'client',label:"Organisme bénéficiaire",type:'text',required:true},
      {key:'prestations',label:"Prestations demandées",type:'textarea',required:true},
      {key:'montant',label:"Montant total (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LABORATOIRE DE RECHERCHE</h1><p>Le <strong>{{laboratoire}}</strong> s'engage à fournir les prestations suivantes à <strong>{{client}}</strong> :</p><p>{{prestations}}</p><p>Montant convenu : <strong>{{montant}} FCFA</strong>. Les services débutent le {{date_debut}}. Le client s'engage à respecter les procédures de sécurité du laboratoire et à citer l'institution dans toute publication utilisant les résultats.</p></div>`
  },
  {
    code: 'univ_convention_stage_cifre',
    name: "Convention de stage doctorat en entreprise (CIFRE)",
    category: 'academique',
    price: 6000,
    priceMax: 18000,
    description: "Convention tripartite encadrant un doctorat en entreprise de type CIFRE (Convention Industrielle de Formation par la Recherche).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'doctorant',label:"Nom du doctorant",type:'text',required:true},
      {key:'universite',label:"Université d'inscription",type:'text',required:true},
      {key:'entreprise',label:"Entreprise d'accueil",type:'text',required:true},
      {key:'sujet_these',label:"Sujet de thèse",type:'textarea',required:true},
      {key:'duree',label:"Durée (années)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE STAGE DOCTORAT EN ENTREPRISE</h1><p>Entre <strong>{{universite}}</strong>, <strong>{{entreprise}}</strong> et <strong>{{doctorant}}</strong> (ci-après le Doctorant).</p><p>Sujet de thèse : <em>{{sujet_these}}</em></p><p>Durée : {{duree}} ans — Début : {{date_debut}}.</p><p>L'entreprise s'engage à accueillir le Doctorant, à lui fournir un encadrement industriel et une rémunération mensuelle. L'université assure la direction scientifique des travaux. Les parties se partagent les droits de propriété intellectuelle selon les modalités annexées.</p></div>`
  },
  {
    code: 'univ_accord_valorisation_recherche',
    name: "Accord de valorisation des résultats de recherche",
    category: 'academique',
    price: 7000,
    priceMax: 21000,
    description: "Accord entre une université et un partenaire pour l'exploitation commerciale des résultats de recherche.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 48,
    fieldsJson: F([
      {key:'universite',label:"Université titulaire",type:'text',required:true},
      {key:'partenaire',label:"Partenaire exploitant",type:'text',required:true},
      {key:'resultats',label:"Description des résultats valorisés",type:'textarea',required:true},
      {key:'redevance',label:"Taux de redevance (%)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VALORISATION DES RÉSULTATS DE RECHERCHE</h1><p><strong>{{universite}}</strong> concède à <strong>{{partenaire}}</strong> le droit d'exploiter les résultats suivants : {{resultats}}</p><p>En contrepartie, le Partenaire versera une redevance de <strong>{{redevance}}%</strong> sur le chiffre d'affaires généré. Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'univ_contrat_cession_brevet',
    name: "Contrat de cession de brevet universitaire",
    category: 'academique',
    price: 10000,
    priceMax: 30000,
    description: "Contrat par lequel une université cède la propriété d'un brevet à un tiers acquéreur.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 42,
    fieldsJson: F([
      {key:'universite_cedante',label:"Université cédante",type:'text',required:true},
      {key:'acquereur',label:"Acquéreur",type:'text',required:true},
      {key:'intitule_brevet',label:"Intitulé du brevet",type:'text',required:true},
      {key:'numero_brevet',label:"Numéro de brevet / dépôt",type:'text',required:true},
      {key:'prix_cession',label:"Prix de cession (FCFA)",type:'text',required:true},
      {key:'date_cession',label:"Date de cession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CESSION DE BREVET UNIVERSITAIRE</h1><p><strong>{{universite_cedante}}</strong> (le Cédant) cède à <strong>{{acquereur}}</strong> (le Cessionnaire) la pleine propriété du brevet <em>{{intitule_brevet}}</em> (N° {{numero_brevet}}).</p><p>Prix de cession : <strong>{{prix_cession}} FCFA</strong> payable à la signature, le {{date_cession}}.</p><p>La cession est définitive et irrévocable. Le Cédant garantit être titulaire de tous les droits et que le brevet est libre de tout litige.</p></div>`
  },
  {
    code: 'univ_accord_licence_brevet',
    name: "Accord de licence d'exploitation de brevet",
    category: 'academique',
    price: 8000,
    priceMax: 24000,
    description: "Accord par lequel une université accorde à un licencié le droit d'exploiter un brevet moyennant redevance.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 45,
    fieldsJson: F([
      {key:'universite',label:"Université concédante",type:'text',required:true},
      {key:'licencie',label:"Licencié",type:'text',required:true},
      {key:'brevet',label:"Intitulé du brevet",type:'text',required:true},
      {key:'territoire',label:"Territoire de la licence",type:'text',required:true},
      {key:'redevance_annuelle',label:"Redevance annuelle (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE D"EXPLOITATION DE BREVET</h1><p><strong>{{universite}}</strong> accorde à <strong>{{licencie}}</strong> une licence d'exploitation non exclusive du brevet <em>{{brevet}}</em> sur le territoire : {{territoire}}.</p><p>Redevance annuelle : <strong>{{redevance_annuelle}} FCFA</strong>. Prise d'effet : {{date_debut}}.</p><p>Le licencié s'engage à exploiter activement le brevet et à respecter les normes de qualité imposées par le concédant.</p></div>`
  },
  {
    code: 'univ_convention_transfert_techno',
    name: "Convention de centre de transfert technologique",
    category: 'academique',
    price: 9000,
    priceMax: 27000,
    description: "Convention constitutive d'un centre de transfert technologique entre un établissement universitaire et des partenaires industriels.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 52,
    fieldsJson: F([
      {key:'universite',label:"Université fondatrice",type:'text',required:true},
      {key:'partenaires_industriels',label:"Partenaires industriels",type:'textarea',required:true},
      {key:'nom_centre',label:"Nom du centre de transfert",type:'text',required:true},
      {key:'budget_initial',label:"Budget initial (FCFA)",type:'text',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CENTRE DE TRANSFERT TECHNOLOGIQUE</h1><p><strong>{{universite}}</strong> et les partenaires industriels suivants : {{partenaires_industriels}} s'associent pour créer le centre <strong>{{nom_centre}}</strong>.</p><p>Budget initial : <strong>{{budget_initial}} FCFA</strong>. Date de création : {{date_creation}}.</p><p>Le centre a pour mission de faciliter le transfert des résultats de la recherche universitaire vers l'industrie et de promouvoir l'innovation technologique en Afrique francophone.</p></div>`
  },
  {
    code: 'univ_accord_erasmus_adapte',
    name: "Accord de programme d'échange Erasmus+ adapté",
    category: 'academique',
    price: 5000,
    priceMax: 15000,
    description: "Accord de mobilité estudantine et académique inspiré du programme Erasmus+, adapté au contexte africain.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'etablissement_africain',label:"Établissement africain",type:'text',required:true},
      {key:'etablissement_europeen',label:"Établissement européen",type:'text',required:true},
      {key:'nombre_etudiants',label:"Nombre d'étudiants échangés par an",type:'text',required:true},
      {key:'duree_sejour',label:"Durée du séjour (mois)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROGRAMME D"ÉCHANGE ERASMUS+ ADAPTÉ</h1><p><strong>{{etablissement_africain}}</strong> et <strong>{{etablissement_europeen}}</strong> concluent le présent accord de mobilité académique.</p><p>Chaque année, <strong>{{nombre_etudiants}} étudiants</strong> pourront effectuer un séjour de <strong>{{duree_sejour}} mois</strong> dans l'établissement partenaire.</p><p>Accord signé le {{date_accord}}. Les parties s'engagent à reconnaître mutuellement les crédits académiques et à faciliter les démarches administratives de visa et d'hébergement.</p></div>`
  },
  {
    code: 'univ_contrat_bibliotheque_numerique',
    name: "Contrat de service de bibliothèque universitaire numérique",
    category: 'academique',
    price: 4000,
    priceMax: 12000,
    description: "Contrat d'abonnement ou de service pour l'accès à une bibliothèque universitaire numérique.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur de la plateforme",type:'text',required:true},
      {key:'universite',label:"Université abonnée",type:'text',required:true},
      {key:'nombre_utilisateurs',label:"Nombre d'utilisateurs autorisés",type:'text',required:true},
      {key:'montant_annuel',label:"Montant annuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE BIBLIOTHÈQUE UNIVERSITAIRE NUMÉRIQUE</h1><p><strong>{{fournisseur}}</strong> s'engage à fournir à <strong>{{universite}}</strong> l'accès à sa plateforme de bibliothèque numérique pour <strong>{{nombre_utilisateurs}} utilisateurs</strong>.</p><p>Montant annuel : <strong>{{montant_annuel}} FCFA</strong>. Début du service : {{date_debut}}.</p><p>L'accès est réservé à la communauté universitaire et tout partage non autorisé des ressources est interdit.</p></div>`
  },
  {
    code: 'univ_accord_mooc',
    name: "Accord de plateforme de cours en ligne (MOOC)",
    category: 'academique',
    price: 5000,
    priceMax: 15000,
    description: "Accord encadrant la création et la diffusion de cours en ligne massifs et ouverts par une université.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'universite',label:"Université productrice",type:'text',required:true},
      {key:'plateforme',label:"Plateforme d'hébergement",type:'text',required:true},
      {key:'titre_cours',label:"Titre du cours en ligne",type:'text',required:true},
      {key:'redevance_partage',label:"Redevance de partage des revenus (%)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PLATEFORME DE COURS EN LIGNE (MOOC)</h1><p><strong>{{universite}}</strong> confie à <strong>{{plateforme}}</strong> l'hébergement et la diffusion du MOOC intitulé : <em>{{titre_cours}}</em>.</p><p>Les revenus générés seront partagés à raison de <strong>{{redevance_partage}}%</strong> pour l'université. Lancement prévu le {{date_lancement}}.</p><p>L'université conserve tous les droits de propriété intellectuelle sur les contenus pédagogiques.</p></div>`
  },
  {
    code: 'univ_convention_reseau_regional',
    name: "Convention de réseau de recherche régional",
    category: 'academique',
    price: 6000,
    priceMax: 18000,
    description: "Convention créant un réseau de recherche régional réunissant plusieurs universités d'Afrique de l'Ouest.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'universite_coordinatrice',label:"Université coordinatrice",type:'text',required:true},
      {key:'membres_reseau',label:"Membres du réseau",type:'textarea',required:true},
      {key:'thematique',label:"Thématique de recherche",type:'text',required:true},
      {key:'financement',label:"Source de financement",type:'text',required:true},
      {key:'date_creation',label:"Date de création du réseau",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE RÉSEAU DE RECHERCHE RÉGIONAL</h1><p>Sous la coordination de <strong>{{universite_coordinatrice}}</strong>, le présent réseau de recherche portant sur <em>{{thematique}}</em> est constitué des membres suivants : {{membres_reseau}}</p><p>Financement : {{financement}}. Date de création : {{date_creation}}.</p><p>Le réseau favorisera les publications communes, les échanges de chercheurs et la mutualisation des équipements scientifiques.</p></div>`
  },
  {
    code: 'univ_accord_cotutelle_these',
    name: "Accord de co-tutelle de thèse",
    category: 'academique',
    price: 5000,
    priceMax: 14000,
    description: "Accord organisant la co-direction d'une thèse de doctorat entre deux universités de pays différents.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'doctorant',label:"Nom du doctorant",type:'text',required:true},
      {key:'universite_1',label:"Université d'inscription principale",type:'text',required:true},
      {key:'universite_2',label:"Université co-directrice",type:'text',required:true},
      {key:'directeur_1',label:"Directeur de thèse (université 1)",type:'text',required:true},
      {key:'directeur_2',label:"Co-directeur (université 2)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CO-TUTELLE DE THÈSE</h1><p>Le doctorant <strong>{{doctorant}}</strong> prépare sa thèse sous la co-direction de :</p><ul><li><strong>{{directeur_1}}</strong> — {{universite_1}}</li><li><strong>{{directeur_2}}</strong> — {{universite_2}}</li></ul><p>La thèse est inscrite dans les deux établissements à compter du {{date_debut}}. Le diplôme sera délivré conjointement par les deux universités après soutenance unique.</p></div>`
  },
  {
    code: 'univ_contrat_consultant_scientifique',
    name: "Contrat de consultant scientifique",
    category: 'academique',
    price: 4000,
    priceMax: 12000,
    description: "Contrat par lequel un chercheur universitaire est mandaté comme consultant scientifique auprès d'un organisme.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'consultant',label:"Nom du consultant",type:'text',required:true},
      {key:'client',label:"Organisme client",type:'text',required:true},
      {key:'mission',label:"Description de la mission",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONSULTANT SCIENTIFIQUE</h1><p><strong>{{consultant}}</strong> est mandaté par <strong>{{client}}</strong> pour réaliser la mission suivante : {{mission}}</p><p>Honoraires convenus : <strong>{{honoraires}} FCFA</strong>. Mission débutant le {{date_debut}}.</p><p>Le consultant s'engage à fournir ses prestations avec toute la diligence requise et à respecter la confidentialité des informations communiquées par le client.</p></div>`
  },
  {
    code: 'univ_rapport_recherche_academique',
    name: "Rapport de recherche académique (format standard)",
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: "Modèle standard de rapport de recherche académique pour les publications et livrables universitaires.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'titre_recherche',label:"Titre de la recherche",type:'text',required:true},
      {key:'auteurs',label:"Auteurs",type:'text',required:true},
      {key:'laboratoire',label:"Laboratoire / Unité de recherche",type:'text',required:true},
      {key:'resume',label:"Résumé (abstract)",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE RECHERCHE ACADÉMIQUE</h1><h2>{{titre_recherche}}</h2><p><strong>Auteurs :</strong> {{auteurs}}</p><p><strong>Laboratoire :</strong> {{laboratoire}}</p><p><strong>Date :</strong> {{date_rapport}}</p><h3>Résumé</h3><p>{{resume}}</p><h3>Introduction</h3><p>Le présent rapport présente les résultats des travaux de recherche conduits par les auteurs susmentionnés. Il expose la problématique, la méthodologie adoptée, les résultats obtenus et les perspectives envisagées.</p></div>`
  },
  {
    code: 'univ_rapport_soutenance_these',
    name: "Rapport de soutenance de thèse",
    category: 'academique',
    price: 2500,
    priceMax: 7000,
    description: "Document officiel récapitulatif de la soutenance d'une thèse de doctorat.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'doctorant',label:"Nom du doctorant",type:'text',required:true},
      {key:'titre_these',label:"Titre de la thèse",type:'text',required:true},
      {key:'universite',label:"Université",type:'text',required:true},
      {key:'mention',label:"Mention obtenue",type:'text',required:true},
      {key:'date_soutenance',label:"Date de soutenance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SOUTENANCE DE THÈSE</h1><p><strong>Candidat :</strong> {{doctorant}}</p><p><strong>Titre :</strong> {{titre_these}}</p><p><strong>Université :</strong> {{universite}}</p><p><strong>Date de soutenance :</strong> {{date_soutenance}}</p><p><strong>Mention :</strong> {{mention}}</p><p>Le jury, après délibération, a décidé d'admettre le candidat au grade de Docteur avec la mention indiquée ci-dessus. Le présent rapport fait foi de la soutenance.</p></div>`
  },
  {
    code: 'univ_pv_jury_these',
    name: "Procès-verbal de jury de thèse",
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: "Procès-verbal officiel établi par le jury lors de la soutenance d'une thèse de doctorat.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'doctorant',label:"Nom du doctorant",type:'text',required:true},
      {key:'composition_jury',label:"Composition du jury",type:'textarea',required:true},
      {key:'titre_these',label:"Titre de la thèse",type:'text',required:true},
      {key:'decision',label:"Décision du jury",type:'text',required:true},
      {key:'date_seance',label:"Date de la séance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL DE JURY DE THÈSE</h1><p>Le jury composé de : {{composition_jury}} s'est réuni le {{date_seance}} pour examiner la thèse de <strong>{{doctorant}}</strong> intitulée : <em>{{titre_these}}</em>.</p><p>Après délibération, le jury a rendu la décision suivante : <strong>{{decision}}</strong>.</p><p>Le présent procès-verbal est signé par tous les membres du jury présents.</p></div>`
  },
  {
    code: 'univ_convention_bourse_excellence',
    name: "Convention de bourse d'excellence",
    category: 'academique',
    price: 3000,
    priceMax: 9000,
    description: "Convention attributive d'une bourse d'excellence à un étudiant ou chercheur méritant.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'organisme_attribution',label:"Organisme attributeur",type:'text',required:true},
      {key:'montant_mensuel',label:"Montant mensuel (FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée de la bourse",type:'text',required:true},
      {key:'date_attribution',label:"Date d'attribution",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE BOURSE D"EXCELLENCE</h1><p><strong>{{organisme_attribution}}</strong> accorde à <strong>{{beneficiaire}}</strong> une bourse d'excellence d'un montant mensuel de <strong>{{montant_mensuel}} FCFA</strong> pour une durée de {{duree}}, à compter du {{date_attribution}}.</p><p>Le bénéficiaire s'engage à maintenir un niveau académique exceptionnel et à respecter les obligations définies par l'organisme attributeur. Toute interruption de la formation entraîne la suspension de la bourse.</p></div>`
  },
  {
    code: 'univ_accord_residence_scientifique',
    name: "Accord de résidence scientifique",
    category: 'academique',
    price: 4000,
    priceMax: 12000,
    description: "Accord accueillant un chercheur en résidence scientifique au sein d'un laboratoire ou d'une université.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 48,
    fieldsJson: F([
      {key:'chercheur',label:"Nom du chercheur en résidence",type:'text',required:true},
      {key:'institution_accueil',label:"Institution d'accueil",type:'text',required:true},
      {key:'programme_travail',label:"Programme de travail",type:'textarea',required:true},
      {key:'duree',label:"Durée de la résidence",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉSIDENCE SCIENTIFIQUE</h1><p><strong>{{institution_accueil}}</strong> accueille <strong>{{chercheur}}</strong> en résidence scientifique pour une durée de <strong>{{duree}}</strong>, à compter du {{date_debut}}.</p><p>Programme de travail : {{programme_travail}}</p><p>L'institution met à disposition les équipements et ressources nécessaires. Le chercheur s'engage à partager ses avancées lors de séminaires internes et à citer l'institution dans ses publications.</p></div>`
  },
  {
    code: 'univ_rapport_performance',
    name: "Rapport de performance université",
    category: 'academique',
    price: 3000,
    priceMax: 9000,
    description: "Rapport annuel de performance d'un établissement universitaire couvrant les indicateurs clés.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'universite',label:"Nom de l'université",type:'text',required:true},
      {key:'annee_academique',label:"Année académique",type:'text',required:true},
      {key:'effectif_etudiants',label:"Effectif total des étudiants",type:'text',required:true},
      {key:'taux_reussite',label:"Taux de réussite global (%)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE UNIVERSITÉ</h1><p><strong>Établissement :</strong> {{universite}}</p><p><strong>Année académique :</strong> {{annee_academique}}</p><p><strong>Date :</strong> {{date_rapport}}</p><h3>Indicateurs clés</h3><ul><li>Effectif total : {{effectif_etudiants}} étudiants</li><li>Taux de réussite global : {{taux_reussite}}%</li></ul><p>Ce rapport présente les performances de l'établissement en matière d'enseignement, de recherche et de gouvernance, conformément aux objectifs stratégiques définis pour l'année académique considérée.</p></div>`
  },
  {
    code: 'univ_contrat_partenariat_ecole_entreprise',
    name: "Contrat de partenariat école-entreprise",
    category: 'academique',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de collaboration entre un établissement scolaire ou universitaire et une entreprise.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'ecole',label:"Établissement scolaire/universitaire",type:'text',required:true},
      {key:'entreprise',label:"Entreprise partenaire",type:'text',required:true},
      {key:'objectifs',label:"Objectifs du partenariat",type:'textarea',required:true},
      {key:'contributions_entreprise',label:"Contributions de l'entreprise",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PARTENARIAT ÉCOLE-ENTREPRISE</h1><p><strong>{{ecole}}</strong> et <strong>{{entreprise}}</strong> s'engagent dans le cadre d'un partenariat visant les objectifs suivants : {{objectifs}}</p><p>L'entreprise contribue au partenariat par : {{contributions_entreprise}}</p><p>Contrat signé le {{date_signature}}. Les parties conviennent de se réunir annuellement pour évaluer la mise en œuvre du partenariat.</p></div>`
  },
  {
    code: 'univ_charte_integrite_academique',
    name: "Charte de l'intégrité académique",
    category: 'academique',
    price: 1500,
    priceMax: 4500,
    description: "Charte définissant les principes d'intégrité académique applicables aux étudiants et personnels d'un établissement.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'universite',label:"Nom de l'université",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'instances_signataires',label:"Instances signataires",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L"INTÉGRITÉ ACADÉMIQUE</h1><p>L'université <strong>{{universite}}</strong>, réunie en {{instances_signataires}}, adopte la présente charte le {{date_adoption}}.</p><h3>Principes fondamentaux</h3><ul><li>Honnêteté intellectuelle et rigueur scientifique</li><li>Interdiction du plagiat, de la fraude et de la falsification</li><li>Respect de la propriété intellectuelle d'autrui</li><li>Transparence dans la communication des résultats</li><li>Responsabilité individuelle et collective</li></ul><p>Tout manquement à ces principes expose son auteur à des sanctions disciplinaires pouvant aller jusqu'à l'exclusion définitive et à des poursuites judiciaires.</p></div>`
  },

  // ── 25 Formation professionnelle / Apprentissage (préfixe fp_) ──
  {
    code: 'fp_convention_formation_continue',
    name: "Convention de formation professionnelle continue",
    category: 'academique',
    price: 3500,
    priceMax: 10000,
    description: "Convention entre un organisme de formation et une entreprise pour la formation continue de salariés.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 88,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'entreprise',label:"Entreprise bénéficiaire",type:'text',required:true},
      {key:'intitule_formation',label:"Intitulé de la formation",type:'text',required:true},
      {key:'cout_total',label:"Coût total (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FORMATION PROFESSIONNELLE CONTINUE</h1><p><strong>{{organisme_formation}}</strong> s'engage à dispenser la formation <em>{{intitule_formation}}</em> au profit des salariés de <strong>{{entreprise}}</strong>.</p><p>Coût total : <strong>{{cout_total}} FCFA</strong>. Début de la formation : {{date_debut}}.</p><p>La convention précise le programme, le calendrier, les modalités d'évaluation et les conditions de délivrance des attestations de fin de formation, conformément à la réglementation ivoirienne en vigueur.</p></div>`
  },
  {
    code: 'fp_accord_financement_fdfp',
    name: "Accord de financement formation FDFP",
    category: 'academique',
    price: 4000,
    priceMax: 12000,
    description: "Accord de prise en charge financière d'une action de formation par le Fonds de Développement de la Formation Professionnelle (FDFP) de Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 82,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise bénéficiaire",type:'text',required:true},
      {key:'organisme_formation',label:"Organisme de formation agréé",type:'text',required:true},
      {key:'intitule_formation',label:"Intitulé de la formation",type:'text',required:true},
      {key:'montant_pris_en_charge',label:"Montant pris en charge FDFP (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT FORMATION FDFP</h1><p>Le FDFP de Côte d'Ivoire accorde à <strong>{{entreprise}}</strong>, en partenariat avec <strong>{{organisme_formation}}</strong>, une prise en charge de <strong>{{montant_pris_en_charge}} FCFA</strong> pour la formation : <em>{{intitule_formation}}</em>.</p><p>Accord signé le {{date_accord}}. L'entreprise s'engage à soumettre les pièces justificatives dans les délais impartis par le FDFP et à n'utiliser les fonds qu'aux fins prévues.</p></div>`
  },
  {
    code: 'fp_contrat_apprentissage',
    name: "Contrat d'apprentissage (alternance)",
    category: 'academique',
    price: 3000,
    priceMax: 9000,
    description: "Contrat d'apprentissage en alternance entre un apprenti, son employeur et un centre de formation.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 90,
    fieldsJson: F([
      {key:'apprenti',label:"Nom de l'apprenti",type:'text',required:true},
      {key:'employeur',label:"Nom de l'employeur",type:'text',required:true},
      {key:'centre_formation',label:"Centre de formation",type:'text',required:true},
      {key:'metier_prepare',label:"Métier / Qualification préparée",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D"APPRENTISSAGE (ALTERNANCE)</h1><p><strong>{{apprenti}}</strong> (l'Apprenti), <strong>{{employeur}}</strong> (l'Employeur) et <strong>{{centre_formation}}</strong> (le Centre) concluent le présent contrat d'apprentissage.</p><p>Métier préparé : <em>{{metier_prepare}}</em> — Durée : {{duree_contrat}} — Début : {{date_debut}}.</p><p>L'Employeur s'engage à assurer à l'Apprenti une formation pratique de qualité. Le Centre assure la formation théorique. L'Apprenti perçoit une gratification dont le montant est fixé en annexe.</p></div>`
  },
  {
    code: 'fp_convention_stage_professionnel',
    name: "Convention de stage professionnel",
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: "Convention tripartite encadrant un stage professionnel entre un stagiaire, son établissement et une entreprise.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 95,
    fieldsJson: F([
      {key:'stagiaire',label:"Nom du stagiaire",type:'text',required:true},
      {key:'etablissement',label:"Établissement de formation",type:'text',required:true},
      {key:'entreprise',label:"Entreprise d'accueil",type:'text',required:true},
      {key:'mission_stage',label:"Mission du stage",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE STAGE PROFESSIONNEL</h1><p><strong>{{etablissement}}</strong>, <strong>{{entreprise}}</strong> et <strong>{{stagiaire}}</strong> concluent la présente convention de stage du {{date_debut}} au {{date_fin}}.</p><p>Mission : {{mission_stage}}</p><p>L'entreprise désigne un maître de stage. Le stagiaire remet un rapport de stage à l'issue de la période. La présente convention est établie conformément aux dispositions du Code du Travail ivoirien.</p></div>`
  },
  {
    code: 'fp_accord_partenariat_cfe',
    name: "Accord de partenariat centre de formation-entreprise",
    category: 'academique',
    price: 4000,
    priceMax: 12000,
    description: "Accord de partenariat durable entre un centre de formation professionnelle et une entreprise.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'centre_formation',label:"Centre de formation",type:'text',required:true},
      {key:'entreprise',label:"Entreprise partenaire",type:'text',required:true},
      {key:'axes_partenariat',label:"Axes du partenariat",type:'textarea',required:true},
      {key:'duree',label:"Durée de l'accord",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CENTRE DE FORMATION-ENTREPRISE</h1><p><strong>{{centre_formation}}</strong> et <strong>{{entreprise}}</strong> s'engagent dans un partenariat structuré autour des axes suivants : {{axes_partenariat}}</p><p>Durée : {{duree}} — Signé le : {{date_signature}}.</p><p>Ce partenariat vise à adapter les formations aux besoins du marché du travail, à faciliter l'insertion professionnelle des apprenants et à renforcer les échanges entre monde académique et monde professionnel.</p></div>`
  },
  {
    code: 'fp_contrat_formateur_vacataire',
    name: "Contrat de formateur indépendant (vacataire)",
    category: 'academique',
    price: 2500,
    priceMax: 7500,
    description: "Contrat d'intervention d'un formateur vacataire indépendant au sein d'un organisme de formation.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'formateur',label:"Nom du formateur",type:'text',required:true},
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'module',label:"Module de formation",type:'text',required:true},
      {key:'honoraires_journaliers',label:"Honoraires journaliers (FCFA)",type:'text',required:true},
      {key:'nombre_jours',label:"Nombre de jours",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FORMATEUR INDÉPENDANT (VACATAIRE)</h1><p><strong>{{formateur}}</strong> intervient auprès de <strong>{{organisme}}</strong> pour animer le module <em>{{module}}</em>.</p><p>Honoraires : <strong>{{honoraires_journaliers}} FCFA/jour</strong> × {{nombre_jours}} jours. Intervention débutant le {{date_debut}}.</p><p>Le formateur est réputé prestataire indépendant et demeure responsable de ses obligations fiscales et sociales. Il fournira le matériel pédagogique nécessaire et remettra une feuille de présence signée pour chaque session.</p></div>`
  },
  {
    code: 'fp_accord_certification_professionnelle',
    name: "Accord de reconnaissance de certification professionnelle",
    category: 'academique',
    price: 5000,
    priceMax: 15000,
    description: "Accord entre un organisme certificateur et une entreprise ou institution pour la reconnaissance d'une certification professionnelle.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'certificateur',label:"Organisme certificateur",type:'text',required:true},
      {key:'beneficiaire',label:"Entreprise / Institution bénéficiaire",type:'text',required:true},
      {key:'intitule_certification',label:"Intitulé de la certification",type:'text',required:true},
      {key:'duree_validite',label:"Durée de validité de la certification",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RECONNAISSANCE DE CERTIFICATION PROFESSIONNELLE</h1><p><strong>{{certificateur}}</strong> et <strong>{{beneficiaire}}</strong> concluent le présent accord de reconnaissance de la certification : <em>{{intitule_certification}}</em>.</p><p>Durée de validité : {{duree_validite}}. Accord signé le {{date_accord}}.</p><p>La certification est reconnue comme indicateur de compétence professionnelle validée. Elle ouvre droit aux avantages prévus par la convention collective applicable.</p></div>`
  },
  {
    code: 'fp_plan_formation_annuel',
    name: "Plan de formation annuel entreprise (PFA)",
    category: 'academique',
    price: 3000,
    priceMax: 9000,
    description: "Document de planification annuelle des actions de formation au sein d'une entreprise.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'annee',label:"Année concernée",type:'text',required:true},
      {key:'budget_formation',label:"Budget formation total (FCFA)",type:'text',required:true},
      {key:'axes_prioritaires',label:"Axes prioritaires de formation",type:'textarea',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE FORMATION ANNUEL ENTREPRISE (PFA)</h1><p><strong>Entreprise :</strong> {{entreprise}} — <strong>Année :</strong> {{annee}}</p><p><strong>Budget total alloué :</strong> {{budget_formation}} FCFA</p><p><strong>Axes prioritaires :</strong> {{axes_prioritaires}}</p><p><strong>Validé le :</strong> {{date_validation}}</p><p>Ce plan recense l'ensemble des actions de formation prévues pour l'année, les populations cibles, les prestataires pressentis et les modalités de financement, notamment via le FDFP.</p></div>`
  },
  {
    code: 'fp_bilan_competences',
    name: "Bilan de compétences professionnel",
    category: 'academique',
    price: 3500,
    priceMax: 10500,
    description: "Document structuré de bilan de compétences professionnelles d'un salarié ou demandeur d'emploi.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'conseiller',label:"Conseiller en bilan",type:'text',required:true},
      {key:'competences_identifiees',label:"Compétences identifiées",type:'textarea',required:true},
      {key:'projet_professionnel',label:"Projet professionnel envisagé",type:'textarea',required:true},
      {key:'date_bilan',label:"Date du bilan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BILAN DE COMPÉTENCES PROFESSIONNEL</h1><p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p><p><strong>Conseiller :</strong> {{conseiller}}</p><p><strong>Date :</strong> {{date_bilan}}</p><h3>Compétences identifiées</h3><p>{{competences_identifiees}}</p><h3>Projet professionnel</h3><p>{{projet_professionnel}}</p><p>Ce document est confidentiel et remis exclusivement au bénéficiaire à l'issue de la démarche de bilan.</p></div>`
  },
  {
    code: 'fp_contrat_ingenierie_formation',
    name: "Contrat de conseil en ingénierie de formation",
    category: 'academique',
    price: 6000,
    priceMax: 18000,
    description: "Contrat de prestation de service d'ingénierie pédagogique et de conception de dispositifs de formation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet / Consultant en ingénierie",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de la mission",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires de la mission (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONSEIL EN INGÉNIERIE DE FORMATION</h1><p><strong>{{cabinet}}</strong> (le Prestataire) est mandaté par <strong>{{client}}</strong> pour une mission d'ingénierie de formation portant sur : {{perimetre}}</p><p>Honoraires : <strong>{{honoraires}} FCFA</strong>. Mission débutant le {{date_debut}}.</p><p>Les livrables incluent l'analyse des besoins, la conception des parcours pédagogiques, la sélection des modalités d'apprentissage et l'accompagnement dans la mise en œuvre du dispositif.</p></div>`
  },
  {
    code: 'fp_accord_elearning',
    name: "Accord de service d'e-learning entreprise",
    category: 'academique',
    price: 4000,
    priceMax: 12000,
    description: "Accord d'accès à une plateforme d'e-learning pour la formation des salariés d'une entreprise.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'plateforme',label:"Fournisseur de la plateforme e-learning",type:'text',required:true},
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'nombre_licences',label:"Nombre de licences",type:'text',required:true},
      {key:'cout_annuel',label:"Coût annuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D"E-LEARNING ENTREPRISE</h1><p><strong>{{plateforme}}</strong> fournit à <strong>{{entreprise}}</strong> un accès à sa plateforme e-learning pour <strong>{{nombre_licences}} licences</strong>.</p><p>Coût annuel : <strong>{{cout_annuel}} FCFA</strong>. Accès disponible à compter du {{date_debut}}.</p><p>Le fournisseur garantit une disponibilité de la plateforme de 99% et assure un support technique en langue française aux heures ouvrables.</p></div>`
  },
  {
    code: 'fp_convention_organisme_agree',
    name: "Convention d'organisme de formation agréé",
    category: 'academique',
    price: 5000,
    priceMax: 15000,
    description: "Convention d'agrément d'un organisme de formation professionnelle par l'autorité compétente en Côte d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'organisme',label:"Nom de l'organisme",type:'text',required:true},
      {key:'numero_agrement',label:"Numéro d'agrément",type:'text',required:true},
      {key:'domaines_formation',label:"Domaines de formation couverts",type:'textarea',required:true},
      {key:'duree_agrement',label:"Durée de l'agrément",type:'text',required:true},
      {key:'date_delivrance',label:"Date de délivrance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION D"ORGANISME DE FORMATION AGRÉÉ</h1><p>Il est accordé à <strong>{{organisme}}</strong> l'agrément N° <strong>{{numero_agrement}}</strong> en qualité d'organisme de formation professionnelle pour les domaines suivants : {{domaines_formation}}</p><p>Durée de l'agrément : {{duree_agrement}} — Délivré le {{date_delivrance}}.</p><p>L'organisme s'engage à respecter les normes pédagogiques et administratives fixées par le FDFP et à transmettre annuellement son bilan pédagogique et financier.</p></div>`
  },
  {
    code: 'fp_rapport_bilan_pedagogique',
    name: "Rapport de bilan pédagogique et financier",
    category: 'academique',
    price: 2500,
    priceMax: 7500,
    description: "Rapport annuel de bilan pédagogique et financier d'un organisme de formation, requis par le FDFP.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'annee',label:"Année concernée",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires formés",type:'text',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires formation (FCFA)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE BILAN PÉDAGOGIQUE ET FINANCIER</h1><p><strong>Organisme :</strong> {{organisme}} — <strong>Année :</strong> {{annee}}</p><p><strong>Date :</strong> {{date_rapport}}</p><h3>Bilan pédagogique</h3><p>Nombre total de stagiaires formés : <strong>{{nombre_stagiaires}}</strong></p><h3>Bilan financier</h3><p>Chiffre d'affaires formation : <strong>{{chiffre_affaires}} FCFA</strong></p><p>Ce rapport est établi conformément aux obligations réglementaires et transmis au FDFP dans les délais prescrits.</p></div>`
  },
  {
    code: 'fp_accord_cpf_adapte',
    name: "Accord de CPF (Compte Personnel de Formation) adapté",
    category: 'academique',
    price: 3000,
    priceMax: 9000,
    description: "Accord d'utilisation du crédit de formation individuel adapté au contexte ivoirien pour financer une action de formation.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'formation_choisie',label:"Formation choisie",type:'text',required:true},
      {key:'cout_formation',label:"Coût de la formation (FCFA)",type:'text',required:true},
      {key:'montant_credit',label:"Montant du crédit mobilisé (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COMPTE PERSONNEL DE FORMATION ADAPTÉ</h1><p><strong>{{beneficiaire}}</strong> mobilise son crédit personnel de formation d'un montant de <strong>{{montant_credit}} FCFA</strong> pour financer la formation : <em>{{formation_choisie}}</em>.</p><p>Coût total de la formation : <strong>{{cout_formation}} FCFA</strong>. Accord signé le {{date_accord}}.</p><p>Le reliquat éventuel reste disponible pour de futures actions de formation. L'organisme de formation s'engage à délivrer une attestation de fin de formation.</p></div>`
  },
  {
    code: 'fp_contrat_cofinancement_fdfp',
    name: "Contrat de co-financement de formation FDFP",
    category: 'academique',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de co-financement d'une action de formation entre le FDFP, l'entreprise et l'organisme de formation.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise bénéficiaire",type:'text',required:true},
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'intitule',label:"Intitulé de la formation",type:'text',required:true},
      {key:'part_fdfp',label:"Part FDFP (FCFA)",type:'text',required:true},
      {key:'part_entreprise',label:"Part entreprise (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CO-FINANCEMENT DE FORMATION FDFP</h1><p>Pour la formation <em>{{intitule}}</em> dispensée par <strong>{{organisme}}</strong> au profit de <strong>{{entreprise}}</strong> :</p><ul><li>Part FDFP : <strong>{{part_fdfp}} FCFA</strong></li><li>Part entreprise : <strong>{{part_entreprise}} FCFA</strong></li></ul><p>Signé le {{date_signature}}. Les deux parties s'engagent à respecter les conditions d'éligibilité et les procédures de remboursement définies par le FDFP.</p></div>`
  },
  {
    code: 'fp_accord_formation_cap_bt',
    name: "Accord de formation certifiante CAP/BT",
    category: 'academique',
    price: 3000,
    priceMax: 9000,
    description: "Accord encadrant une formation préparant au Certificat d'Aptitude Professionnelle (CAP) ou au Brevet de Technicien (BT).",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 82,
    fieldsJson: F([
      {key:'apprenant',label:"Nom de l'apprenant",type:'text',required:true},
      {key:'centre_formation',label:"Centre de formation",type:'text',required:true},
      {key:'diplome_prepare',label:"Diplôme préparé (CAP/BT + spécialité)",type:'text',required:true},
      {key:'duree_formation',label:"Durée de la formation",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION CERTIFIANTE CAP/BT</h1><p><strong>{{apprenant}}</strong> s'inscrit auprès de <strong>{{centre_formation}}</strong> en vue de préparer le diplôme : <em>{{diplome_prepare}}</em>.</p><p>Durée de la formation : {{duree_formation}} — Début : {{date_debut}}.</p><p>Le centre s'engage à préparer l'apprenant aux épreuves officielles selon les référentiels du Ministère de la Formation Professionnelle et de l'Apprentissage de Côte d'Ivoire.</p></div>`
  },
  {
    code: 'fp_contrat_formation_qualifiante',
    name: "Contrat de formation qualifiante",
    category: 'academique',
    price: 3000,
    priceMax: 9000,
    description: "Contrat encadrant une formation qualifiante non diplômante visant l'acquisition de compétences métier.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'stagiaire',label:"Nom du stagiaire",type:'text',required:true},
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'intitule_formation',label:"Intitulé de la formation qualifiante",type:'text',required:true},
      {key:'cout',label:"Coût de la formation (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FORMATION QUALIFIANTE</h1><p><strong>{{stagiaire}}</strong> s'inscrit à la formation qualifiante <em>{{intitule_formation}}</em> dispensée par <strong>{{organisme}}</strong>.</p><p>Coût : <strong>{{cout}} FCFA</strong>. Début : {{date_debut}}.</p><p>À l'issue de la formation, une attestation de compétences sera remise au stagiaire ayant satisfait aux évaluations. Cette attestation est reconnue par les partenaires professionnels signataires de la charte qualité de l'organisme.</p></div>`
  },
  {
    code: 'fp_accord_formation_langues',
    name: "Accord de service de formation en langues (anglais des affaires)",
    category: 'academique',
    price: 3500,
    priceMax: 10000,
    description: "Accord de formation en langue anglaise des affaires pour les collaborateurs d'une entreprise.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation linguistique",type:'text',required:true},
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'nombre_apprenants',label:"Nombre d'apprenants",type:'text',required:true},
      {key:'niveau_cible',label:"Niveau cible (CECRL)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN LANGUES</h1><p><strong>{{organisme}}</strong> dispense une formation en anglais des affaires à <strong>{{nombre_apprenants}} collaborateurs</strong> de <strong>{{entreprise}}</strong>.</p><p>Niveau cible visé : <strong>{{niveau_cible}}</strong> (CECRL). Formation débutant le {{date_debut}}.</p><p>Des évaluations de positionnement et de progression seront conduites à l'entrée et à la sortie de la formation. Des bilans trimestriels seront adressés à l'entreprise.</p></div>`
  },
  {
    code: 'fp_contrat_formation_informatique',
    name: "Contrat de service de formation informatique certifiante",
    category: 'academique',
    price: 4000,
    priceMax: 12000,
    description: "Contrat de formation informatique menant à une certification reconnue (Microsoft, Cisco, etc.).",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation informatique",type:'text',required:true},
      {key:'apprenant',label:"Nom de l'apprenant",type:'text',required:true},
      {key:'certification_visee',label:"Certification visée",type:'text',required:true},
      {key:'cout',label:"Coût total (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE FORMATION INFORMATIQUE CERTIFIANTE</h1><p><strong>{{organisme}}</strong> forme <strong>{{apprenant}}</strong> en vue de l'obtention de la certification : <em>{{certification_visee}}</em>.</p><p>Coût total : <strong>{{cout}} FCFA</strong>. Début : {{date_debut}}.</p><p>L'organisme s'engage à préparer l'apprenant aux examens de certification officiels et à prendre en charge les frais de première présentation à l'examen dans la limite du contrat.</p></div>`
  },
  {
    code: 'fp_accord_coaching_professionnel',
    name: "Accord de service de coaching professionnel certifié",
    category: 'academique',
    price: 5000,
    priceMax: 15000,
    description: "Accord de prestation de coaching professionnel certifié pour le développement des compétences managériales.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'coach',label:"Nom du coach certifié",type:'text',required:true},
      {key:'coache',label:"Nom du coaché",type:'text',required:true},
      {key:'entreprise',label:"Entreprise mandataire",type:'text',required:true},
      {key:'objectifs_coaching',label:"Objectifs du coaching",type:'textarea',required:true},
      {key:'duree',label:"Durée du programme (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COACHING PROFESSIONNEL CERTIFIÉ</h1><p><strong>{{coach}}</strong> (Coach certifié) accompagne <strong>{{coache}}</strong>, mandaté par <strong>{{entreprise}}</strong>, dans un programme de coaching de {{duree}} mois débutant le {{date_debut}}.</p><p>Objectifs du coaching : {{objectifs_coaching}}</p><p>La confidentialité des échanges entre coach et coaché est garantie. L'entreprise reçoit uniquement une confirmation de tenue des séances et les axes de progrès convenus, sans détail des contenus.</p></div>`
  },
  {
    code: 'fp_rapport_satisfaction_formation',
    name: "Rapport de satisfaction formation",
    category: 'academique',
    price: 1500,
    priceMax: 4500,
    description: "Rapport de collecte et d'analyse de la satisfaction des participants à une action de formation.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'intitule_formation',label:"Intitulé de la formation",type:'text',required:true},
      {key:'nombre_repondants',label:"Nombre de répondants",type:'text',required:true},
      {key:'taux_satisfaction',label:"Taux de satisfaction global (%)",type:'text',required:true},
      {key:'date_enquete',label:"Date de l'enquête",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE SATISFACTION FORMATION</h1><p><strong>Organisme :</strong> {{organisme}}</p><p><strong>Formation :</strong> {{intitule_formation}}</p><p><strong>Date de l"enquête :</strong> {{date_enquete}}</p><h3>Résultats</h3><ul><li>Nombre de répondants : {{nombre_repondants}}</li><li>Taux de satisfaction global : <strong>{{taux_satisfaction}}%</strong></li></ul><p>Ce rapport est établi sur la base des questionnaires de satisfaction collectés à chaud, à l'issue de la formation. Il est transmis au FDFP dans le cadre du suivi qualité des organismes agréés.</p></div>`
  },
  {
    code: 'fp_rapport_evaluation_froid',
    name: "Rapport d'évaluation à froid (6 mois)",
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: "Rapport d'évaluation à froid réalisé six mois après une formation pour mesurer le transfert des acquis.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de formation",type:'text',required:true},
      {key:'formation',label:"Formation évaluée",type:'text',required:true},
      {key:'entreprise',label:"Entreprise bénéficiaire",type:'text',required:true},
      {key:'taux_transfert',label:"Taux de transfert des acquis (%)",type:'text',required:true},
      {key:'date_evaluation',label:"Date de l'évaluation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D"ÉVALUATION À FROID (6 MOIS)</h1><p><strong>Formation :</strong> {{formation}} — <strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Organisé par :</strong> {{organisme}} — <strong>Date de l"évaluation :</strong> {{date_evaluation}}</p><h3>Résultats du transfert des acquis</h3><p>Taux de transfert mesuré : <strong>{{taux_transfert}}%</strong></p><p>Cette évaluation, conduite six mois après la fin de la formation, mesure l'impact réel des apprentissages sur les pratiques professionnelles des participants et le retour sur investissement pour l'entreprise.</p></div>`
  },
  {
    code: 'fp_contrat_orientation_professionnelle',
    name: "Contrat de service d'orientation professionnelle",
    category: 'academique',
    price: 3000,
    priceMax: 9000,
    description: "Contrat de prestation d'orientation professionnelle pour étudiants, jeunes diplômés ou demandeurs d'emploi.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'conseiller',label:"Conseiller en orientation",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'objectif_orientation',label:"Objectif de l'orientation",type:'textarea',required:true},
      {key:'nombre_seances',label:"Nombre de séances prévues",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D"ORIENTATION PROFESSIONNELLE</h1><p><strong>{{conseiller}}</strong> accompagne <strong>{{beneficiaire}}</strong> dans sa démarche d'orientation professionnelle.</p><p>Objectif : {{objectif_orientation}}</p><p>Nombre de séances : <strong>{{nombre_seances}}</strong> — Début : {{date_debut}}.</p><p>À l'issue du programme, un document de synthèse précisant les voies d'orientation recommandées sera remis au bénéficiaire.</p></div>`
  },
  {
    code: 'fp_convention_vae',
    name: "Convention de VAE (Validation des Acquis de l'Expérience)",
    category: 'academique',
    price: 4000,
    priceMax: 12000,
    description: "Convention encadrant la Validation des Acquis de l'Expérience pour l'obtention d'un titre ou diplôme professionnel.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'candidat',label:"Nom du candidat",type:'text',required:true},
      {key:'organisme_validation',label:"Organisme de validation",type:'text',required:true},
      {key:'titre_vise',label:"Titre / Diplôme visé",type:'text',required:true},
      {key:'accompagnateur',label:"Accompagnateur VAE",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la démarche",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE VALIDATION DES ACQUIS DE L"EXPÉRIENCE (VAE)</h1><p><strong>{{candidat}}</strong> entame une démarche de VAE auprès de <strong>{{organisme_validation}}</strong> en vue d'obtenir le titre : <em>{{titre_vise}}</em>.</p><p>Accompagnateur désigné : <strong>{{accompagnateur}}</strong>. Début de la démarche : {{date_debut}}.</p><p>Le candidat s'engage à constituer son dossier de preuves de manière rigoureuse. L'organisme s'engage à l'accompagner tout au long de la démarche jusqu'au passage devant le jury de validation.</p></div>`
  },
  {
    code: 'fp_charte_qualite_organisme',
    name: "Charte de qualité organisme de formation",
    category: 'academique',
    price: 2000,
    priceMax: 6000,
    description: "Charte définissant les engagements qualité d'un organisme de formation professionnelle agréé.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'organisme',label:"Nom de l'organisme de formation",type:'text',required:true},
      {key:'dirigeant',label:"Nom du dirigeant responsable",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE QUALITÉ ORGANISME DE FORMATION</h1><p><strong>{{organisme}}</strong>, représenté par <strong>{{dirigeant}}</strong>, adopte la présente charte de qualité le {{date_adoption}}.</p><h3>Engagements qualité</h3><ul><li>Adapter les formations aux besoins réels des apprenants et des entreprises</li><li>Faire intervenir des formateurs qualifiés et expérimentés</li><li>Évaluer systématiquement la satisfaction des bénéficiaires</li><li>Assurer la transparence des informations et des coûts</li><li>Respecter les obligations réglementaires du FDFP et des autorités de tutelle</li><li>Améliorer en continu nos pratiques pédagogiques</li></ul><p>Cette charte est affichée dans nos locaux et communiquée à tous nos partenaires.</p></div>`
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
  console.log(`Batch 39b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
