import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  {
    code: 'spt_001', name: "Contrat de joueur de football professionnel (FIF/FIFA)", category: 'commercial_financier', price: 8000, priceMax: 25000,
    description: "Contrat de travail pour joueur de football professionnel conforme aux règlements FIF et FIFA, applicable en Côte d'Ivoire.", templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'nom_joueur',label:"Nom complet du joueur",type:'text',required:true},
      {key:'club_employeur',label:"Club employeur",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
      {key:'date_fin',label:"Date de fin du contrat",type:'date',required:true},
      {key:'salaire_mensuel',label:"Salaire mensuel brut (FCFA)",type:'text',required:true},
      {key:'poste_joueur',label:"Poste du joueur",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE JOUEUR DE FOOTBALL PROFESSIONNEL</h1><p>Entre le club <strong>{{club_employeur}}</strong> et le joueur <strong>{{nom_joueur}}</strong>, poste : {{poste_joueur}}.</p><p>Durée : du {{date_debut}} au {{date_fin}}.</p><p>Salaire mensuel brut : {{salaire_mensuel}} FCFA.</p><p>Le présent contrat est établi conformément aux règlements de la Fédération Ivoirienne de Football (FIF) et de la FIFA.</p></div>`
  },
  {
    code: 'spt_002', name: "Contrat de transfert de joueur de football", category: 'commercial_financier', price: 10000, priceMax: 35000,
    description: "Accord de transfert définitif d'un joueur de football entre deux clubs, conforme aux règlements FIFA sur les transferts internationaux.", templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'club_cedant',label:"Club cédant",type:'text',required:true},
      {key:'club_acquereur',label:"Club acquéreur",type:'text',required:true},
      {key:'nom_joueur',label:"Nom du joueur transféré",type:'text',required:true},
      {key:'indemnite_transfert',label:"Indemnité de transfert (FCFA)",type:'text',required:true},
      {key:'date_transfert',label:"Date effective du transfert",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE TRANSFERT DE JOUEUR DE FOOTBALL</h1><p>Le club cédant <strong>{{club_cedant}}</strong> transfère définitivement le joueur <strong>{{nom_joueur}}</strong> au club acquéreur <strong>{{club_acquereur}}</strong>.</p><p>Indemnité de transfert convenue : {{indemnite_transfert}} FCFA.</p><p>Date effective du transfert : {{date_transfert}}.</p><p>Les parties s'engagent à respecter les dispositions du Règlement FIFA sur le Statut et le Transfert des Joueurs.</p></div>`
  },
  {
    code: 'spt_003', name: "Accord de prêt de joueur (Loan Agreement)", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Accord de prêt temporaire d'un joueur de football professionnel entre deux clubs, avec conditions de rappel et options d'achat.", templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'club_preteur',label:"Club prêteur",type:'text',required:true},
      {key:'club_emprunteur',label:"Club emprunteur",type:'text',required:true},
      {key:'nom_joueur',label:"Nom du joueur",type:'text',required:true},
      {key:'date_debut_pret',label:"Date de début du prêt",type:'date',required:true},
      {key:'date_fin_pret',label:"Date de fin du prêt",type:'date',required:true},
      {key:'frais_pret',label:"Frais de prêt (FCFA)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÊT DE JOUEUR (LOAN AGREEMENT)</h1><p>Le club prêteur <strong>{{club_preteur}}</strong> met à disposition du club emprunteur <strong>{{club_emprunteur}}</strong> le joueur <strong>{{nom_joueur}}</strong> à titre temporaire.</p><p>Période de prêt : du {{date_debut_pret}} au {{date_fin_pret}}.</p><p>Frais de prêt : {{frais_pret}} FCFA.</p><p>Le joueur reste sous contrat avec le club prêteur pendant toute la durée du prêt.</p></div>`
  },
  {
    code: 'spt_004', name: "Accord de droit de formation (Solidarity Mechanism)", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Accord relatif à la contribution de solidarité et aux droits de formation dus aux clubs formateurs lors d'un transfert international, selon les règlements FIFA.", templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'club_formateur',label:"Club formateur bénéficiaire",type:'text',required:true},
      {key:'nom_joueur',label:"Nom du joueur formé",type:'text',required:true},
      {key:'periode_formation',label:"Période de formation (années)",type:'text',required:true},
      {key:'montant_solidarity',label:"Montant de la contribution (FCFA)",type:'text',required:true},
      {key:'date_versement',label:"Date de versement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DROIT DE FORMATION ET MÉCANISME DE SOLIDARITÉ</h1><p>Le présent accord règle la contribution de solidarité due au club formateur <strong>{{club_formateur}}</strong> pour la formation du joueur <strong>{{nom_joueur}}</strong> durant la période {{periode_formation}}.</p><p>Montant dû : {{montant_solidarity}} FCFA, payable au plus tard le {{date_versement}}.</p><p>Cet accord est établi conformément à l'article 21 du Règlement FIFA sur le Statut et le Transfert des Joueurs.</p></div>`
  },
  {
    code: 'spt_005', name: "Accord de service d'agent sportif (FIFA Licensed Agent)", category: 'commercial_financier', price: 7000, priceMax: 20000,
    description: "Contrat de mandat entre un agent sportif licencié FIFA et son client joueur ou club, définissant les missions, la durée et la rémunération.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_agent',label:"Nom de l'agent sportif",type:'text',required:true},
      {key:'numero_licence',label:"Numéro de licence FIFA",type:'text',required:true},
      {key:'nom_client',label:"Nom du client (joueur ou club)",type:'text',required:true},
      {key:'duree_mandat',label:"Durée du mandat",type:'text',required:true},
      {key:'taux_commission',label:"Taux de commission (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AGENT SPORTIF LICENCIÉ FIFA</h1><p>L'agent sportif <strong>{{nom_agent}}</strong>, titulaire de la licence FIFA n° {{numero_licence}}, est mandaté par <strong>{{nom_client}}</strong> pour représenter ses intérêts dans le cadre de négociations sportives et contractuelles.</p><p>Durée du mandat : {{duree_mandat}}. Commission convenue : {{taux_commission}}% sur les transactions conclues.</p><p>Le présent accord est soumis aux Règlements FIFA relatifs aux agents de football.</p></div>`
  },
  {
    code: 'spt_006', name: "Accord de contrat de sponsoring sportif (maillot, naming)", category: 'commercial_financier', price: 8000, priceMax: 28000,
    description: "Contrat de sponsoring entre une entreprise sponsor et un club ou fédération sportive, portant sur l'affichage de marque sur les maillots ou le naming d'une compétition.", templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'sponsor',label:"Entreprise sponsor",type:'text',required:true},
      {key:'entite_sportive',label:"Club ou fédération bénéficiaire",type:'text',required:true},
      {key:'type_visibilite',label:"Type de visibilité (maillot, naming, etc.)",type:'text',required:true},
      {key:'montant_sponsoring',label:"Montant annuel du sponsoring (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SPONSORING SPORTIF</h1><p>La société <strong>{{sponsor}}</strong> s'engage à sponsoriser <strong>{{entite_sportive}}</strong> sous la forme suivante : {{type_visibilite}}.</p><p>Montant annuel : {{montant_sponsoring}} FCFA, pour la période du {{date_debut}} au {{date_fin}}.</p><p>En contrepartie, l'entité sportive s'engage à assurer la visibilité de la marque du sponsor lors de toutes ses manifestations officielles.</p></div>`
  },
  {
    code: 'spt_007', name: "Accord de naming de stade", category: 'commercial_financier', price: 12000, priceMax: 40000,
    description: "Contrat de naming par lequel une entreprise acquiert le droit de donner son nom à un stade ou à une enceinte sportive en échange d'une contrepartie financière.", templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise_namer',label:"Entreprise acquérant le naming",type:'text',required:true},
      {key:'proprietaire_stade',label:"Propriétaire/gestionnaire du stade",type:'text',required:true},
      {key:'nom_stade_nouveau',label:"Nouveau nom du stade",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat (années)",type:'text',required:true},
      {key:'redevance_annuelle',label:"Redevance annuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE NAMING DE STADE</h1><p>Le propriétaire/gestionnaire <strong>{{proprietaire_stade}}</strong> accorde à la société <strong>{{entreprise_namer}}</strong> le droit exclusif de dénommer le stade <strong>{{nom_stade_nouveau}}</strong>.</p><p>Durée : {{duree_contrat}} ans. Redevance annuelle : {{redevance_annuelle}} FCFA.</p><p>Les parties s'engagent à respecter les conditions d'utilisation du nom, de la marque et des visuels associés au stade.</p></div>`
  },
  {
    code: 'spt_008', name: "Accord de service de droits TV sport (CAN, ligue pro)", category: 'commercial_financier', price: 15000, priceMax: 50000,
    description: "Contrat de cession de droits audiovisuels pour la diffusion de compétitions sportives (CAN, ligue professionnelle) entre un détenteur de droits et une chaîne de télévision.", templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'detenteur_droits',label:"Détenteur des droits audiovisuels",type:'text',required:true},
      {key:'diffuseur',label:"Chaîne ou plateforme de diffusion",type:'text',required:true},
      {key:'competition',label:"Compétition concernée",type:'text',required:true},
      {key:'territoire',label:"Territoire de diffusion",type:'text',required:true},
      {key:'montant_droits',label:"Montant des droits (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début des droits",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CESSION DE DROITS AUDIOVISUELS SPORTIFS</h1><p>Le détenteur de droits <strong>{{detenteur_droits}}</strong> cède au diffuseur <strong>{{diffuseur}}</strong> les droits de retransmission de la compétition <strong>{{competition}}</strong> sur le territoire {{territoire}}.</p><p>Montant des droits : {{montant_droits}} FCFA. Prise d'effet : {{date_debut}}.</p><p>Le diffuseur s'engage à respecter les contraintes éditoriales et les exigences techniques définies par le détenteur des droits.</p></div>`
  },
  {
    code: 'spt_009', name: "Accord de contrat de coach ou entraîneur sportif", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat d'engagement d'un entraîneur principal ou d'un coach sportif par un club professionnel, définissant les objectifs sportifs, la rémunération et les conditions de rupture.", templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_coach',label:"Nom de l'entraîneur",type:'text',required:true},
      {key:'club',label:"Club employeur",type:'text',required:true},
      {key:'date_debut',label:"Date de prise de fonction",type:'date',required:true},
      {key:'date_fin',label:"Date de fin de contrat",type:'date',required:true},
      {key:'salaire_mensuel',label:"Rémunération mensuelle (FCFA)",type:'text',required:true},
      {key:'objectifs',label:"Objectifs sportifs principaux",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ENTRAÎNEUR SPORTIF</h1><p>Le club <strong>{{club}}</strong> engage M./Mme <strong>{{nom_coach}}</strong> en qualité d'entraîneur principal à compter du {{date_debut}} jusqu'au {{date_fin}}.</p><p>Rémunération mensuelle : {{salaire_mensuel}} FCFA.</p><p>Objectifs sportifs assignés : {{objectifs}}.</p><p>Le présent contrat est soumis aux dispositions du code du travail ivoirien et aux règlements de la FIF.</p></div>`
  },
  {
    code: 'spt_010', name: "Accord de contrat de directeur sportif", category: 'commercial_financier', price: 7000, priceMax: 22000,
    description: "Contrat d'engagement d'un directeur sportif par un club professionnel, précisant ses attributions en matière de recrutement, de gestion de l'effectif et de politique sportive.", templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_directeur',label:"Nom du directeur sportif",type:'text',required:true},
      {key:'club',label:"Club employeur",type:'text',required:true},
      {key:'date_debut',label:"Date de prise de fonction",type:'date',required:true},
      {key:'date_fin',label:"Date de fin de contrat",type:'date',required:true},
      {key:'remuneration',label:"Rémunération annuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DIRECTEUR SPORTIF</h1><p>Le club <strong>{{club}}</strong> nomme <strong>{{nom_directeur}}</strong> en qualité de Directeur Sportif pour la période du {{date_debut}} au {{date_fin}}.</p><p>Rémunération annuelle brute : {{remuneration}} FCFA.</p><p>Le directeur sportif est chargé de définir et mettre en oeuvre la politique sportive du club, notamment le recrutement et la gestion de l'effectif professionnel.</p></div>`
  },
  {
    code: 'spt_011', name: "Accord de service de centre de formation sportive", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Convention de partenariat entre un centre de formation sportive et un club professionnel ou une fédération, définissant les conditions d'accueil, de formation et de suivi des jeunes talents.", templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'centre_formation',label:"Centre de formation",type:'text',required:true},
      {key:'club_partenaire',label:"Club ou fédération partenaire",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de jeunes accueillis",type:'text',required:true},
      {key:'duree_programme',label:"Durée du programme de formation",type:'text',required:true},
      {key:'cout_annuel',label:"Coût annuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE - CENTRE DE FORMATION SPORTIVE</h1><p>Le centre de formation <strong>{{centre_formation}}</strong> s'engage à accueillir et former {{nombre_stagiaires}} jeunes sportifs en partenariat avec <strong>{{club_partenaire}}</strong>.</p><p>Durée du programme : {{duree_programme}}. Coût annuel : {{cout_annuel}} FCFA.</p><p>Le programme inclut une formation sportive, académique et humaine conforme aux standards FIF/FIFA.</p></div>`
  },
  {
    code: 'spt_012', name: "Accord de contrat de joueur de basketball professionnel", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Contrat de travail pour joueur de basketball professionnel évoluant dans une ligue africaine ou internationale, conforme aux standards FIBA.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_joueur',label:"Nom du joueur",type:'text',required:true},
      {key:'club',label:"Club employeur",type:'text',required:true},
      {key:'poste',label:"Poste (meneur, ailier, pivot, etc.)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'salaire',label:"Salaire mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE JOUEUR DE BASKETBALL PROFESSIONNEL</h1><p>Le club <strong>{{club}}</strong> engage le joueur <strong>{{nom_joueur}}</strong>, poste : {{poste}}, du {{date_debut}} au {{date_fin}}.</p><p>Salaire mensuel brut : {{salaire}} FCFA.</p><p>Le présent contrat est établi conformément aux règlements FIBA et aux lois du travail ivoiriennes.</p></div>`
  },
  {
    code: 'spt_013', name: "Accord de contrat de joueur d'athlétisme professionnel", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat liant un athlète professionnel à un club, une fédération ou un sponsor, définissant les obligations de compétition, la rémunération et la gestion des droits à l'image.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_athlete',label:"Nom de l'athlète",type:'text',required:true},
      {key:'discipline',label:"Discipline (100m, marathon, saut, etc.)",type:'text',required:true},
      {key:'club_federation',label:"Club ou fédération",type:'text',required:true},
      {key:'saison',label:"Saison sportive concernée",type:'text',required:true},
      {key:'remuneration',label:"Rémunération annuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ATHLÈTE PROFESSIONNEL</h1><p>L'athlète <strong>{{nom_athlete}}</strong>, spécialiste de {{discipline}}, conclut le présent contrat avec <strong>{{club_federation}}</strong> pour la saison {{saison}}.</p><p>Rémunération annuelle : {{remuneration}} FCFA.</p><p>L'athlète s'engage à participer aux compétitions officielles désignées et à respecter les règlements de World Athletics et de la fédération nationale.</p></div>`
  },
  {
    code: 'spt_014', name: "Accord de contrat de joueur de volleyball professionnel", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat de travail pour joueur de volleyball professionnel dans un club africain, conforme aux standards FIVB et au code du travail ivoirien.", templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_joueur',label:"Nom du joueur/de la joueuse",type:'text',required:true},
      {key:'club',label:"Club employeur",type:'text',required:true},
      {key:'poste',label:"Poste (libéro, passeur, pointu, etc.)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'salaire',label:"Salaire mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE JOUEUR DE VOLLEYBALL PROFESSIONNEL</h1><p>Le club <strong>{{club}}</strong> engage <strong>{{nom_joueur}}</strong>, poste : {{poste}}, du {{date_debut}} au {{date_fin}}.</p><p>Salaire mensuel brut : {{salaire}} FCFA.</p><p>Le présent contrat est soumis aux règlements FIVB, de la fédération africaine de volleyball et aux dispositions du code du travail ivoirien.</p></div>`
  },
  {
    code: 'spt_015', name: "Accord de contrat de joueur de tennis professionnel", category: 'commercial_financier', price: 6000, priceMax: 20000,
    description: "Contrat liant un joueur de tennis professionnel à un club, une académie ou un sponsor, précisant les obligations de participation aux tournois et la répartition des gains.", templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_joueur',label:"Nom du joueur/de la joueuse",type:'text',required:true},
      {key:'entite',label:"Club, académie ou sponsor",type:'text',required:true},
      {key:'classement_atp_wta',label:"Classement ATP/WTA actuel",type:'text',required:false},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'remuneration',label:"Rémunération ou soutien financier annuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE JOUEUR DE TENNIS PROFESSIONNEL</h1><p>Le joueur/la joueuse <strong>{{nom_joueur}}</strong> (classement ATP/WTA : {{classement_atp_wta}}) s'engage avec <strong>{{entite}}</strong> du {{date_debut}} au {{date_fin}}.</p><p>Rémunération ou soutien annuel : {{remuneration}} FCFA.</p><p>Le joueur s'engage à participer aux tournois désignés et à respecter les règlements de la Fédération Internationale de Tennis (ITF).</p></div>`
  },
  {
    code: 'spt_016', name: "Accord de service de fédération sportive nationale", category: 'commercial_financier', price: 8000, priceMax: 25000,
    description: "Convention de service entre l'État, un partenaire privé et une fédération sportive nationale, définissant les objectifs de développement du sport et les financements alloués.", templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'federation',label:"Fédération sportive nationale",type:'text',required:true},
      {key:'partenaire',label:"Partenaire (État, entreprise, ONG)",type:'text',required:true},
      {key:'sport_concerne',label:"Sport concerné",type:'text',required:true},
      {key:'montant_subvention',label:"Montant de la subvention (FCFA)",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE - FÉDÉRATION SPORTIVE NATIONALE</h1><p>La <strong>{{federation}}</strong>, fédération nationale de {{sport_concerne}}, conclut la présente convention avec <strong>{{partenaire}}</strong> pour la période {{periode}}.</p><p>Subvention ou financement alloué : {{montant_subvention}} FCFA.</p><p>En contrepartie, la fédération s'engage à développer la pratique sportive, organiser des compétitions nationales et former des athlètes de haut niveau.</p></div>`
  },
  {
    code: 'spt_017', name: "Accord de service de ligue professionnelle de sport", category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Convention régissant les relations entre une ligue professionnelle de sport et ses clubs membres, définissant les droits, obligations et partage des revenus de la compétition.", templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'ligue',label:"Nom de la ligue professionnelle",type:'text',required:true},
      {key:'club_membre',label:"Club membre signataire",type:'text',required:true},
      {key:'saison',label:"Saison sportive",type:'text',required:true},
      {key:'droit_adhesion',label:"Droit d'adhésion annuel (FCFA)",type:'text',required:true},
      {key:'part_revenus',label:"Part des revenus TV et billetterie (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - LIGUE PROFESSIONNELLE DE SPORT</h1><p>Le club <strong>{{club_membre}}</strong> adhère à <strong>{{ligue}}</strong> pour la saison {{saison}}.</p><p>Droit d'adhésion annuel : {{droit_adhesion}} FCFA. Part des revenus partagés (TV, billetterie) : {{part_revenus}}%.</p><p>Le club s'engage à respecter le règlement intérieur de la ligue, les obligations de fair-play financier et les standards d'infrastructure définis.</p></div>`
  },
  {
    code: 'spt_018', name: "Accord de service d'organisation de compétition sportive", category: 'commercial_financier', price: 9000, priceMax: 28000,
    description: "Contrat confiant l'organisation d'une compétition sportive (tournoi, championnat) à un opérateur privé ou une entité désignée par la fédération.", templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'organisateur',label:"Organisateur de la compétition",type:'text',required:true},
      {key:'federation_mandante',label:"Fédération ou ligue mandante",type:'text',required:true},
      {key:'nom_competition',label:"Nom de la compétition",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'date_fin',label:"Date de fin",type:'date',required:true},
      {key:'budget',label:"Budget alloué (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ORGANISATION DE COMPÉTITION SPORTIVE</h1><p><strong>{{federation_mandante}}</strong> confie à <strong>{{organisateur}}</strong> l'organisation de la compétition <strong>{{nom_competition}}</strong>, prévue du {{date_debut}} au {{date_fin}}.</p><p>Budget alloué : {{budget}} FCFA.</p><p>L'organisateur s'engage à respecter les règlements techniques, les exigences de sécurité et les normes d'accueil des équipes et du public.</p></div>`
  },
  {
    code: 'spt_019', name: "Accord de service de billetterie et accès stade", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat de prestation de service confiant la gestion de la billetterie et du contrôle d'accès d'un stade à un prestataire spécialisé.", templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire billetterie",type:'text',required:true},
      {key:'club_stade',label:"Club ou gestionnaire du stade",type:'text',required:true},
      {key:'nom_stade',label:"Nom du stade",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat",type:'text',required:true},
      {key:'commission',label:"Commission du prestataire (%)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - BILLETTERIE ET ACCÈS STADE</h1><p>Le prestataire <strong>{{prestataire}}</strong> assure la gestion de la billetterie et du contrôle d'accès du <strong>{{nom_stade}}</strong> pour le compte de <strong>{{club_stade}}</strong>.</p><p>Durée : {{duree_contrat}}. Commission : {{commission}}% sur les recettes de billetterie.</p><p>Le prestataire s'engage à déployer les solutions technologiques nécessaires pour sécuriser et optimiser la gestion des flux de spectateurs.</p></div>`
  },
  {
    code: 'spt_020', name: "Accord de partenariat club sportif-collectivité", category: 'commercial_financier', price: 6000, priceMax: 18000,
    description: "Convention de partenariat entre un club sportif professionnel ou amateur et une collectivité territoriale (mairie, conseil régional) portant sur l'utilisation des infrastructures et le soutien financier.", templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'club',label:"Club sportif",type:'text',required:true},
      {key:'collectivite',label:"Collectivité territoriale",type:'text',required:true},
      {key:'infrastructure',label:"Infrastructure mise à disposition",type:'text',required:true},
      {key:'soutien_financier',label:"Soutien financier annuel (FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée du partenariat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT CLUB SPORTIF - COLLECTIVITÉ</h1><p>La collectivité <strong>{{collectivite}}</strong> et le club <strong>{{club}}</strong> s'engagent dans un partenariat portant sur la mise à disposition de <strong>{{infrastructure}}</strong> et un soutien financier annuel de {{soutien_financier}} FCFA.</p><p>Durée du partenariat : {{duree}}.</p><p>En contrepartie, le club s'engage à promouvoir la pratique sportive locale et à associer la collectivité à ses manifestations.</p></div>`
  },
  {
    code: 'spt_021', name: "Accord de service d'académie de football (jeunes)", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Convention entre une académie de football et les parents ou tuteurs d'un jeune joueur, définissant les conditions de formation, d'hébergement et de suivi scolaire.", templateType: 'pdf', classe: 'C', active: true, popularity: 76,
    fieldsJson: F([
      {key:'academie',label:"Nom de l'académie de football",type:'text',required:true},
      {key:'nom_jeune',label:"Nom du jeune joueur",type:'text',required:true},
      {key:'parent_tuteur',label:"Nom du parent ou tuteur légal",type:'text',required:true},
      {key:'duree_formation',label:"Durée de la formation",type:'text',required:true},
      {key:'frais_formation',label:"Frais de formation annuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION D'ACADÉMIE DE FOOTBALL - FORMATION JEUNES</h1><p>L'académie <strong>{{academie}}</strong> s'engage à former le jeune joueur <strong>{{nom_jeune}}</strong>, sous la responsabilité de son parent/tuteur <strong>{{parent_tuteur}}</strong>.</p><p>Durée de la formation : {{duree_formation}}. Frais annuels : {{frais_formation}} FCFA.</p><p>La formation comprend un volet sportif, académique et disciplinaire conforme aux standards FIF/FIFA de développement des jeunes joueurs.</p></div>`
  },
  {
    code: 'spt_022', name: "Accord de service de scouting (détecteur de talents)", category: 'commercial_financier', price: 5000, priceMax: 15000,
    description: "Contrat de mission confiant à un scout ou détecteur de talents la recherche et l'évaluation de jeunes joueurs pour le compte d'un club ou d'une académie.", templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_scout',label:"Nom du scout",type:'text',required:true},
      {key:'club_mandant',label:"Club ou académie mandant",type:'text',required:true},
      {key:'zone_recherche',label:"Zone géographique de recherche",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'remuneration',label:"Rémunération mensuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SCOUTING - DÉTECTEUR DE TALENTS</h1><p>Le scout <strong>{{nom_scout}}</strong> est mandaté par <strong>{{club_mandant}}</strong> pour détecter des talents footballistiques dans la zone {{zone_recherche}}.</p><p>Durée de la mission : {{duree_mission}}. Rémunération mensuelle : {{remuneration}} FCFA.</p><p>Le scout s'engage à transmettre des rapports d'évaluation réguliers et à respecter les règlements FIFA en matière de transfert de mineurs.</p></div>`
  },
  {
    code: 'spt_023', name: "Rapport de performance club sportif professionnel", category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Document de rapport périodique sur les performances sportives, financières et organisationnelles d'un club sportif professionnel, destiné aux actionnaires et partenaires.", templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_club',label:"Nom du club",type:'text',required:true},
      {key:'saison',label:"Saison ou période de référence",type:'text',required:true},
      {key:'resultat_sportif',label:"Résultat sportif principal",type:'textarea',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires de la période (FCFA)",type:'text',required:true},
      {key:'perspectives',label:"Perspectives et objectifs",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE - CLUB SPORTIF PROFESSIONNEL</h1><h2>{{nom_club}} - Saison {{saison}}</h2><h3>Performances sportives</h3><p>{{resultat_sportif}}</p><h3>Données financières</h3><p>Chiffre d'affaires : {{chiffre_affaires}} FCFA.</p><h3>Perspectives</h3><p>{{perspectives}}</p></div>`
  },
  {
    code: 'spt_024', name: "Plan de développement sportif national", category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Document stratégique définissant les axes de développement du sport national sur une période pluriannuelle, les investissements prévus et les indicateurs de performance.", templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'autorite',label:"Autorité publique ou fédération porteur",type:'text',required:true},
      {key:'periode',label:"Période du plan (ex: 2025-2030)",type:'text',required:true},
      {key:'sports_prioritaires',label:"Sports prioritaires",type:'textarea',required:true},
      {key:'budget_total',label:"Budget total prévisionnel (FCFA)",type:'text',required:true},
      {key:'objectif_medailles',label:"Objectifs de médailles ou résultats",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT SPORTIF NATIONAL {{periode}}</h1><p>Porté par <strong>{{autorite}}</strong>, ce plan définit la stratégie nationale de développement du sport pour la période {{periode}}.</p><h3>Sports prioritaires</h3><p>{{sports_prioritaires}}</p><h3>Budget prévisionnel</h3><p>{{budget_total}} FCFA sur la période.</p><h3>Objectifs</h3><p>{{objectif_medailles}}</p></div>`
  },
  {
    code: 'spt_025', name: "Charte du sport africain et de l'intégrité sportive", category: 'commercial_financier', price: 4000, priceMax: 12000,
    description: "Charte d'engagement des acteurs sportifs africains en faveur de l'intégrité, de l'éthique, de la lutte contre la corruption et du fair-play dans le sport.", templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entite_signataire',label:"Entité signataire (club, fédération, athlète)",type:'text',required:true},
      {key:'representant',label:"Nom du représentant légal",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'pays',label:"Pays",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU SPORT AFRICAIN ET DE L'INTÉGRITÉ SPORTIVE</h1><p>L'entité <strong>{{entite_signataire}}</strong>, représentée par <strong>{{representant}}</strong>, adhère solennellement à la présente charte le {{date_signature}} en <strong>{{pays}}</strong>.</p><p>Les signataires s'engagent à promouvoir le fair-play, à lutter contre la corruption, le dopage et la manipulation des compétitions, et à défendre les valeurs du sport africain.</p></div>`
  },
  {
    code: 'spt2_001', name: "Accord de service d'association sportive amateure (statuts)", category: 'association', price: 3000, priceMax: 9000,
    description: "Statuts types d'une association sportive amateure constituée selon la loi ivoirienne sur les associations, avec objet sportif défini.", templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_association',label:"Nom de l'association",type:'text',required:true},
      {key:'sport',label:"Sport pratiqué",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true},
      {key:'president',label:"Nom du président fondateur",type:'text',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>STATUTS DE L'ASSOCIATION SPORTIVE {{nom_association}}</h1><p>Il est créé, le {{date_creation}}, une association sportive amateure dénommée <strong>{{nom_association}}</strong>, dont le siège est fixé à {{siege_social}}.</p><p>Objet : pratique et promotion du {{sport}} pour tous ses membres.</p><p>Le président fondateur est <strong>{{president}}</strong>. L'association est régie par la loi ivoirienne relative aux associations.</p></div>`
  },
  {
    code: 'spt2_002', name: "Accord de service de fédération de sport traditionnel africain", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention de service entre une fédération de sport traditionnel africain et ses clubs membres, visant à structurer la pratique, organiser des compétitions et préserver le patrimoine culturel sportif.", templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'federation',label:"Nom de la fédération",type:'text',required:true},
      {key:'sport_traditionnel',label:"Sport traditionnel concerné",type:'text',required:true},
      {key:'club_membre',label:"Club membre",type:'text',required:true},
      {key:'cotisation_annuelle',label:"Cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'saison',label:"Saison sportive",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE - FÉDÉRATION DE SPORT TRADITIONNEL AFRICAIN</h1><p>La fédération <strong>{{federation}}</strong>, dédiée au {{sport_traditionnel}}, accueille le club <strong>{{club_membre}}</strong> pour la saison {{saison}}.</p><p>Cotisation annuelle : {{cotisation_annuelle}} FCFA.</p><p>La fédération s'engage à organiser les compétitions officielles et à promouvoir ce sport dans le respect de la tradition culturelle africaine.</p></div>`
  },
  {
    code: 'spt2_003', name: "Accord de service d'organisation de marathon (running)", category: 'association', price: 5000, priceMax: 15000,
    description: "Contrat d'organisation d'un marathon ou d'une course de running ouverte au grand public, précisant le parcours, la sécurité, les catégories et les prix.", templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'organisateur',label:"Organisateur de l'événement",type:'text',required:true},
      {key:'nom_marathon',label:"Nom du marathon",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'ville',label:"Ville de déroulement",type:'text',required:true},
      {key:'budget',label:"Budget de l'événement (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ORGANISATION - {{nom_marathon}}</h1><p>L'organisateur <strong>{{organisateur}}</strong> s'engage à organiser le <strong>{{nom_marathon}}</strong> à <strong>{{ville}}</strong> le {{date_evenement}}.</p><p>Budget total : {{budget}} FCFA.</p><p>L'événement respectera les normes World Athletics en matière de parcours homologué, sécurité des participants et gestion du chronométrage officiel.</p></div>`
  },
  {
    code: 'spt2_004', name: "Accord de service de triathlon", category: 'association', price: 5000, priceMax: 15000,
    description: "Contrat d'organisation et de gestion d'un événement de triathlon (natation, cyclisme, course à pied) conforme aux standards World Triathlon.", templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'organisateur',label:"Organisateur",type:'text',required:true},
      {key:'nom_evenement',label:"Nom de l'événement triathlon",type:'text',required:true},
      {key:'date_evenement',label:"Date de l'événement",type:'date',required:true},
      {key:'lieu',label:"Lieu de déroulement",type:'text',required:true},
      {key:'budget',label:"Budget (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ORGANISATION - TRIATHLON {{nom_evenement}}</h1><p>L'organisateur <strong>{{organisateur}}</strong> prend en charge l'organisation de <strong>{{nom_evenement}}</strong> à <strong>{{lieu}}</strong> le {{date_evenement}}.</p><p>Budget : {{budget}} FCFA.</p><p>Les épreuves de natation, cyclisme et course à pied seront organisées selon les règlements de World Triathlon et de la fédération nationale concernée.</p></div>`
  },
  {
    code: 'spt2_005', name: "Accord de service de cyclisme (Tour de CI)", category: 'association', price: 7000, priceMax: 20000,
    description: "Convention d'organisation d'une compétition cycliste nationale ou régionale, type Tour de Côte d'Ivoire, définissant les étapes, les partenaires et la logistique.", templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisateur',label:"Organisateur de la course",type:'text',required:true},
      {key:'nom_course',label:"Nom de la course cycliste",type:'text',required:true},
      {key:'date_depart',label:"Date de départ",type:'date',required:true},
      {key:'nombre_etapes',label:"Nombre d'étapes",type:'text',required:true},
      {key:'budget',label:"Budget total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ORGANISATION - {{nom_course}}</h1><p>L'organisateur <strong>{{organisateur}}</strong> organise la compétition cycliste <strong>{{nom_course}}</strong>, composée de {{nombre_etapes}} étapes, à compter du {{date_depart}}.</p><p>Budget total : {{budget}} FCFA.</p><p>La compétition est organisée conformément aux règlements de l'Union Cycliste Internationale (UCI) et de la fédération nationale de cyclisme.</p></div>`
  },
  {
    code: 'spt2_006', name: "Accord de service de sport de combat (boxe, judo, karaté)", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention régissant l'organisation de compétitions et la gestion d'une salle de sport de combat (boxe, judo ou karaté) conforme aux règlements des fédérations internationales.", templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      {key:'club_salle',label:"Club ou salle de sport de combat",type:'text',required:true},
      {key:'discipline',label:"Discipline (boxe, judo, karaté, etc.)",type:'text',required:true},
      {key:'responsable',label:"Responsable technique",type:'text',required:true},
      {key:'nombre_licencies',label:"Nombre de licenciés",type:'text',required:true},
      {key:'cotisation',label:"Cotisation annuelle membre (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - SPORT DE COMBAT : {{discipline}}</h1><p>Le club <strong>{{club_salle}}</strong>, sous la responsabilité technique de <strong>{{responsable}}</strong>, accueille {{nombre_licencies}} licenciés en {{discipline}}.</p><p>Cotisation annuelle par membre : {{cotisation}} FCFA.</p><p>Le club s'engage à respecter les règlements techniques de la fédération internationale compétente et les normes de sécurité applicables aux sports de combat.</p></div>`
  },
  {
    code: 'spt2_007', name: "Accord de service d'aviron et sport nautique", category: 'association', price: 5000, priceMax: 15000,
    description: "Convention de service entre un club d'aviron ou de sport nautique et ses membres, définissant les conditions d'utilisation des équipements et les règles de sécurité sur l'eau.", templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'club',label:"Nom du club nautique",type:'text',required:true},
      {key:'plan_eau',label:"Plan d'eau ou site de pratique",type:'text',required:true},
      {key:'disciplines',label:"Disciplines pratiquées",type:'text',required:true},
      {key:'cotisation',label:"Cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'date_debut_saison',label:"Début de saison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - CLUB D'AVIRON ET SPORT NAUTIQUE</h1><p>Le club <strong>{{club}}</strong> propose ses services de {{disciplines}} sur le site <strong>{{plan_eau}}</strong>, à compter du {{date_debut_saison}}.</p><p>Cotisation annuelle : {{cotisation}} FCFA.</p><p>Chaque membre s'engage à respecter les règles de sécurité nautique et les règlements de la Fédération Internationale des Sociétés d'Aviron (FISA) ou de la fédération compétente.</p></div>`
  },
  {
    code: 'spt2_008', name: "Accord de service de golf (club, caddie)", category: 'association', price: 5000, priceMax: 15000,
    description: "Convention entre un club de golf et ses membres ou prestataires (caddies), définissant les droits d'accès, les règles du parcours et les conditions de service.", templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'club_golf',label:"Nom du club de golf",type:'text',required:true},
      {key:'membre_ou_caddie',label:"Nom du membre ou caddie",type:'text',required:true},
      {key:'type_adhesion',label:"Type d'adhésion (membre, caddie, visiteur)",type:'text',required:true},
      {key:'cotisation',label:"Cotisation ou rémunération annuelle (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - CLUB DE GOLF</h1><p>Le club de golf <strong>{{club_golf}}</strong> établit le présent accord avec <strong>{{membre_ou_caddie}}</strong> en qualité de {{type_adhesion}}, à compter du {{date_debut}}.</p><p>Cotisation ou rémunération annuelle : {{cotisation}} FCFA.</p><p>Les parties s'engagent à respecter le règlement intérieur du club et les règles de golf édictées par le Royal and Ancient Golf Club (R&A) et l'USGA.</p></div>`
  },
  {
    code: 'spt2_009', name: "Accord de service de sport équestre", category: 'association', price: 5000, priceMax: 15000,
    description: "Convention entre un centre équestre et ses membres ou cavaliers, définissant les conditions de pratique, la pension des chevaux et les règles de sécurité.", templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'centre_equestre',label:"Nom du centre équestre",type:'text',required:true},
      {key:'membre',label:"Nom du cavalier/membre",type:'text',required:true},
      {key:'type_service',label:"Type de service (cours, pension, compétition)",type:'text',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - CENTRE ÉQUESTRE</h1><p>Le centre équestre <strong>{{centre_equestre}}</strong> et le cavalier <strong>{{membre}}</strong> s'engagent dans un contrat de service portant sur : {{type_service}}, à compter du {{date_debut}}.</p><p>Tarif mensuel : {{tarif_mensuel}} FCFA.</p><p>Les parties respecteront les règles de sécurité équestre et les règlements de la Fédération Équestre Internationale (FEI).</p></div>`
  },
  {
    code: 'spt2_010', name: "Accord de service de tir sportif", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention de service entre un club de tir sportif et ses membres, définissant les conditions d'accès au stand, les règles de sécurité et la gestion des armes.", templateType: 'pdf', classe: 'C', active: true, popularity: 48,
    fieldsJson: F([
      {key:'club_tir',label:"Nom du club de tir",type:'text',required:true},
      {key:'membre',label:"Nom du membre tireur",type:'text',required:true},
      {key:'discipline_tir',label:"Discipline de tir (pistolet, carabine, etc.)",type:'text',required:true},
      {key:'cotisation',label:"Cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - CLUB DE TIR SPORTIF</h1><p>Le club <strong>{{club_tir}}</strong> accueille <strong>{{membre}}</strong> en qualité de tireur sportif en discipline {{discipline_tir}}, à compter du {{date_adhesion}}.</p><p>Cotisation annuelle : {{cotisation}} FCFA.</p><p>Le membre s'engage à respecter les règles de sécurité du stand et les règlements de l'ISSF (Fédération Internationale de Tir Sportif).</p></div>`
  },
  {
    code: 'spt2_011', name: "Accord de service de badminton et sports de raquette", category: 'association', price: 3000, priceMax: 9000,
    description: "Convention de service entre un club de badminton ou de sports de raquette et ses membres, définissant les créneaux d'entraînement, les cotisations et les règles du club.", templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'club',label:"Nom du club",type:'text',required:true},
      {key:'sport_raquette',label:"Sport concerné (badminton, squash, padel, etc.)",type:'text',required:true},
      {key:'membre',label:"Nom du membre",type:'text',required:true},
      {key:'cotisation',label:"Cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - CLUB DE {{sport_raquette}}</h1><p>Le club <strong>{{club}}</strong> accueille <strong>{{membre}}</strong> pour la pratique du {{sport_raquette}} à compter du {{date_debut}}.</p><p>Cotisation annuelle : {{cotisation}} FCFA.</p><p>Le membre bénéficiera des créneaux d'entraînement attribués et s'engage à respecter le règlement intérieur du club.</p></div>`
  },
  {
    code: 'spt2_012', name: "Accord de service de handball", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention de service entre un club de handball et ses membres ou une fédération, définissant les conditions de pratique, la participation aux compétitions et les cotisations.", templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'club',label:"Nom du club de handball",type:'text',required:true},
      {key:'membre',label:"Nom du joueur/membre",type:'text',required:true},
      {key:'poste',label:"Poste du joueur",type:'text',required:false},
      {key:'cotisation',label:"Cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'saison',label:"Saison sportive",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - CLUB DE HANDBALL</h1><p>Le club <strong>{{club}}</strong> intègre <strong>{{membre}}</strong> (poste : {{poste}}) pour la saison {{saison}}.</p><p>Cotisation annuelle : {{cotisation}} FCFA.</p><p>Le membre s'engage à participer aux entraînements et compétitions officielles et à respecter les règlements de la Fédération Internationale de Handball (IHF) et de la fédération nationale.</p></div>`
  },
  {
    code: 'spt2_013', name: "Accord de service de rugby", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention de service entre un club de rugby et ses joueurs ou partenaires, applicable à la pratique du rugby à XV ou à VII en Afrique de l'Ouest.", templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'club',label:"Nom du club de rugby",type:'text',required:true},
      {key:'joueur',label:"Nom du joueur",type:'text',required:true},
      {key:'poste',label:"Poste du joueur",type:'text',required:false},
      {key:'cotisation',label:"Cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'saison',label:"Saison sportive",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - CLUB DE RUGBY</h1><p>Le club <strong>{{club}}</strong> intègre le joueur <strong>{{joueur}}</strong> (poste : {{poste}}) pour la saison {{saison}}.</p><p>Cotisation annuelle : {{cotisation}} FCFA.</p><p>Le joueur s'engage à participer aux entraînements et matchs officiels dans le respect des règles de World Rugby et de la fédération nationale.</p></div>`
  },
  {
    code: 'spt2_014', name: "Accord de service de natation club", category: 'association', price: 3000, priceMax: 9000,
    description: "Convention entre un club de natation et ses nageurs membres, définissant les horaires d'entraînement, les cotisations, la participation aux compétitions et les normes de sécurité en piscine.", templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'club_natation',label:"Nom du club de natation",type:'text',required:true},
      {key:'nageur',label:"Nom du nageur",type:'text',required:true},
      {key:'niveau',label:"Niveau (débutant, intermédiaire, compétition)",type:'text',required:true},
      {key:'cotisation',label:"Cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'saison',label:"Saison sportive",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - CLUB DE NATATION</h1><p>Le club <strong>{{club_natation}}</strong> accueille le nageur <strong>{{nageur}}</strong> (niveau : {{niveau}}) pour la saison {{saison}}.</p><p>Cotisation annuelle : {{cotisation}} FCFA.</p><p>Le nageur bénéficiera de créneaux d'entraînement encadrés et s'engage à respecter le règlement intérieur du club et les règles de sécurité en piscine.</p></div>`
  },
  {
    code: 'spt2_015', name: "Accord de service de taekwondo", category: 'association', price: 3000, priceMax: 9000,
    description: "Convention entre un club de taekwondo et ses membres, précisant les conditions de pratique, les passages de grade et la participation aux compétitions nationales et internationales.", templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'club',label:"Nom du club de taekwondo",type:'text',required:true},
      {key:'pratiquant',label:"Nom du pratiquant",type:'text',required:true},
      {key:'grade_actuel',label:"Grade actuel (ceinture)",type:'text',required:true},
      {key:'cotisation',label:"Cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'saison',label:"Saison sportive",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - CLUB DE TAEKWONDO</h1><p>Le club <strong>{{club}}</strong> accueille <strong>{{pratiquant}}</strong> (grade : {{grade_actuel}}) pour la saison {{saison}}.</p><p>Cotisation annuelle : {{cotisation}} FCFA.</p><p>Le pratiquant s'engage à suivre les entraînements, à progresser dans les grades et à respecter les règlements de World Taekwondo et de la fédération nationale.</p></div>`
  },
  {
    code: 'spt2_016', name: "Accord de service de lutte traditionnelle africaine", category: 'association', price: 3000, priceMax: 9000,
    description: "Convention de service entre une association de lutte traditionnelle africaine et ses lutteurs membres, visant à organiser des compétitions dans le respect des traditions culturelles.", templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'association',label:"Nom de l'association de lutte",type:'text',required:true},
      {key:'lutteur',label:"Nom du lutteur",type:'text',required:true},
      {key:'categorie',label:"Catégorie de poids ou classe d'âge",type:'text',required:true},
      {key:'cotisation',label:"Cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'saison',label:"Saison sportive",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - LUTTE TRADITIONNELLE AFRICAINE</h1><p>L'association <strong>{{association}}</strong> intègre le lutteur <strong>{{lutteur}}</strong> (catégorie : {{categorie}}) pour la saison {{saison}}.</p><p>Cotisation annuelle : {{cotisation}} FCFA.</p><p>Le lutteur s'engage à respecter les règles traditionnelles de la lutte africaine, les valeurs d'honneur et de respect de l'adversaire, ainsi que les règlements de la fédération compétente.</p></div>`
  },
  {
    code: 'spt2_017', name: "Accord de service de sport pour personnes handicapées", category: 'association', price: 3000, priceMax: 9000,
    description: "Convention de service entre une association sportive adaptée et ses membres en situation de handicap, garantissant l'accessibilité, l'encadrement spécialisé et la participation aux compétitions para-sportives.", templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'association',label:"Nom de l'association sportive adaptée",type:'text',required:true},
      {key:'membre',label:"Nom du membre",type:'text',required:true},
      {key:'type_handicap',label:"Nature du handicap ou classification para-sportive",type:'text',required:true},
      {key:'sport_pratique',label:"Sport pratiqué",type:'text',required:true},
      {key:'cotisation',label:"Cotisation annuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - SPORT POUR PERSONNES EN SITUATION DE HANDICAP</h1><p>L'association <strong>{{association}}</strong> accueille <strong>{{membre}}</strong> (classification : {{type_handicap}}) pour la pratique de {{sport_pratique}}.</p><p>Cotisation annuelle : {{cotisation}} FCFA.</p><p>L'association garantit un encadrement adapté, des équipements accessibles et la participation aux compétitions para-sportives reconnues par le Comité International Paralympique (IPC).</p></div>`
  },
  {
    code: 'spt2_018', name: "Accord de service de sport pour seniors (seniors games)", category: 'association', price: 3000, priceMax: 9000,
    description: "Convention de service d'une association sportive pour seniors, définissant les activités proposées, les cotisations et les conditions de participation aux Jeux des Seniors africains.", templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'association',label:"Nom de l'association",type:'text',required:true},
      {key:'membre',label:"Nom du senior membre",type:'text',required:true},
      {key:'age',label:"Âge du membre",type:'text',required:true},
      {key:'activites',label:"Activités proposées",type:'text',required:true},
      {key:'cotisation',label:"Cotisation annuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - SPORT POUR SENIORS</h1><p>L'association <strong>{{association}}</strong> accueille <strong>{{membre}}</strong> ({{age}} ans) pour la pratique des activités suivantes : {{activites}}.</p><p>Cotisation annuelle : {{cotisation}} FCFA.</p><p>L'association favorise la pratique sportive adaptée aux seniors dans un esprit de convivialité, de santé et de compétition intergénérationnelle.</p></div>`
  },
  {
    code: 'spt2_019', name: "Accord de service d'école de sport multidisciplinaire", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention entre une école de sport multidisciplinaire et les parents ou tuteurs d'un enfant, définissant les activités, les horaires, les tarifs et les conditions pédagogiques.", templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'ecole_sport',label:"Nom de l'école de sport",type:'text',required:true},
      {key:'nom_enfant',label:"Nom de l'enfant",type:'text',required:true},
      {key:'parent_tuteur',label:"Nom du parent ou tuteur",type:'text',required:true},
      {key:'activites',label:"Activités sportives choisies",type:'text',required:true},
      {key:'frais_inscription',label:"Frais d'inscription annuels (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - ÉCOLE DE SPORT MULTIDISCIPLINAIRE</h1><p>L'école de sport <strong>{{ecole_sport}}</strong> accueille l'enfant <strong>{{nom_enfant}}</strong>, sous la responsabilité de <strong>{{parent_tuteur}}</strong>, pour la pratique de : {{activites}}.</p><p>Frais d'inscription annuels : {{frais_inscription}} FCFA.</p><p>L'école s'engage à fournir un encadrement qualifié, des équipements adaptés et un suivi personnalisé du développement sportif de l'enfant.</p></div>`
  },
  {
    code: 'spt2_020', name: "Accord de service de plein air et randonnée", category: 'association', price: 3000, priceMax: 9000,
    description: "Convention de service entre un club de plein air ou de randonnée et ses membres, définissant les activités (trekking, escalade, orientation) et les règles de sécurité en milieu naturel.", templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'club',label:"Nom du club de plein air",type:'text',required:true},
      {key:'membre',label:"Nom du membre",type:'text',required:true},
      {key:'activites',label:"Activités pratiquées (randonnée, escalade, etc.)",type:'text',required:true},
      {key:'cotisation',label:"Cotisation annuelle (FCFA)",type:'text',required:true},
      {key:'saison',label:"Saison ou année d'adhésion",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - PLEIN AIR ET RANDONNÉE</h1><p>Le club <strong>{{club}}</strong> accueille <strong>{{membre}}</strong> pour la pratique de : {{activites}}, pour la saison {{saison}}.</p><p>Cotisation annuelle : {{cotisation}} FCFA.</p><p>Le membre s'engage à respecter les règles de sécurité en milieu naturel, à s'équiper convenablement et à ne pas s'éloigner du groupe lors des sorties encadrées.</p></div>`
  },
  {
    code: 'spt2_021', name: "Accord de service de sport en entreprise (bien-être)", category: 'association', price: 4000, priceMax: 12000,
    description: "Convention entre une entreprise et une association ou un prestataire sportif pour la mise en place d'un programme de sport en entreprise, favorisant le bien-être et la cohésion des équipes.", templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'prestataire_sport',label:"Prestataire ou association sportive",type:'text',required:true},
      {key:'activites',label:"Activités sportives proposées",type:'text',required:true},
      {key:'cout_annuel',label:"Coût annuel du programme (FCFA)",type:'text',required:true},
      {key:'nombre_salaries',label:"Nombre de salariés bénéficiaires",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE - SPORT EN ENTREPRISE</h1><p>L'entreprise <strong>{{entreprise}}</strong> et le prestataire <strong>{{prestataire_sport}}</strong> s'engagent dans un programme de sport en entreprise portant sur : {{activites}}.</p><p>Nombre de salariés bénéficiaires : {{nombre_salaries}}. Coût annuel : {{cout_annuel}} FCFA.</p><p>Ce programme vise à améliorer le bien-être, la cohésion d'équipe et la productivité des collaborateurs.</p></div>`
  },
  {
    code: 'spt2_022', name: "Accord de service de sponsoring sport amateur", category: 'association', price: 4000, priceMax: 12000,
    description: "Contrat de sponsoring entre une entreprise locale et une association sportive amateure, définissant la contrepartie en visibilité et le soutien financier ou matériel.", templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      {key:'sponsor',label:"Entreprise sponsor",type:'text',required:true},
      {key:'association_sport',label:"Association sportive amateure",type:'text',required:true},
      {key:'type_soutien',label:"Type de soutien (financier, matériel, équipement)",type:'text',required:true},
      {key:'montant_ou_valeur',label:"Montant ou valeur du soutien (FCFA)",type:'text',required:true},
      {key:'duree',label:"Durée du partenariat",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SPONSORING - SPORT AMATEUR</h1><p>La société <strong>{{sponsor}}</strong> accorde un soutien de type {{type_soutien}} d'une valeur de {{montant_ou_valeur}} FCFA à l'association <strong>{{association_sport}}</strong> pour une durée de {{duree}}.</p><p>En contrepartie, l'association s'engage à assurer la visibilité de la marque du sponsor lors de ses manifestations sportives et sur ses supports de communication.</p></div>`
  },
  {
    code: 'spt2_023', name: "Rapport de performance fédération sportive", category: 'association', price: 3000, priceMax: 9000,
    description: "Rapport annuel de performance d'une fédération sportive amateure ou nationale, couvrant les résultats des compétitions, le nombre de licenciés et l'utilisation des subventions reçues.", templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'federation',label:"Nom de la fédération",type:'text',required:true},
      {key:'sport',label:"Sport concerné",type:'text',required:true},
      {key:'annee',label:"Année du rapport",type:'text',required:true},
      {key:'nombre_licencies',label:"Nombre de licenciés",type:'text',required:true},
      {key:'resultats',label:"Principaux résultats de la saison",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE - FÉDÉRATION SPORTIVE {{sport}}</h1><h2>{{federation}} - Rapport {{annee}}</h2><h3>Licenciés</h3><p>Nombre de licenciés actifs : {{nombre_licencies}}.</p><h3>Résultats sportifs</h3><p>{{resultats}}</p><p>Ce rapport est établi conformément aux obligations de transparence et de reddition de comptes vis-à-vis des partenaires publics et privés.</p></div>`
  },
  {
    code: 'spt2_024', name: "Plan de développement sport amateur", category: 'association', price: 5000, priceMax: 15000,
    description: "Document stratégique d'une association ou fédération de sport amateur définissant les axes de développement, les objectifs de recrutement et le budget prévisionnel sur 3 à 5 ans.", templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'entite',label:"Association ou fédération",type:'text',required:true},
      {key:'sport',label:"Sport concerné",type:'text',required:true},
      {key:'periode',label:"Période du plan",type:'text',required:true},
      {key:'objectif_licencies',label:"Objectif de licenciés à terme",type:'text',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel total (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT - SPORT AMATEUR</h1><h2>{{entite}} - {{sport}} - Période {{periode}}</h2><p>Ce plan stratégique vise à développer la pratique du {{sport}} et à atteindre {{objectif_licencies}} licenciés à l'horizon de la période {{periode}}.</p><p>Budget prévisionnel total : {{budget_previsionnel}} FCFA.</p><p>Les axes prioritaires comprennent le recrutement de nouveaux pratiquants, la formation des encadrants et le développement des infrastructures sportives.</p></div>`
  },
  {
    code: 'spt2_025', name: "Charte de l'éthique sportive et du fair-play", category: 'association', price: 2000, priceMax: 6000,
    description: "Charte d'engagement en faveur de l'éthique sportive, du fair-play et du respect de l'adversaire, destinée aux clubs, associations et pratiquants de sport amateur.", templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'entite_signataire',label:"Entité ou pratiquant signataire",type:'text',required:true},
      {key:'representant',label:"Nom du représentant ou pratiquant",type:'text',required:true},
      {key:'sport',label:"Sport pratiqué",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ÉTHIQUE SPORTIVE ET DU FAIR-PLAY</h1><p><strong>{{entite_signataire}}</strong>, représentée par <strong>{{representant}}</strong>, pratiquant le {{sport}}, adhère solennellement à la présente charte le {{date_signature}}.</p><p>Le signataire s'engage à pratiquer son sport dans le respect de l'adversaire, des règles du jeu, des arbitres et des officiels. Il rejette toute forme de triche, de violence, de discrimination et de comportement antisportif.</p><p>Le fair-play est un engagement quotidien, sur le terrain et en dehors, au service des valeurs du sport africain.</p></div>`
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
  console.log(`Batch 92b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
