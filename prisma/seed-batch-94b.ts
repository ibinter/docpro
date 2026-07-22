import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 templates Administration publique (adm3_) ──
  {
    code: 'adm3_dsp', name: "Accord de Convention de Délégation de Service Public (DSP)", category: 'juridique_admin', price: 10000, priceMax: 35000,
    description: "Convention de délégation de service public conforme au cadre juridique ivoirien, définissant les obligations du délégataire et les conditions de contrôle par l'autorité délégante.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'autorite_delegante',label:"Autorité délégante",type:'text',required:true},
      {key:'delegataire',label:"Délégataire",type:'text',required:true},
      {key:'objet_service',label:"Objet du service public délégué",type:'textarea',required:true},
      {key:'duree_convention',label:"Durée de la convention",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE DÉLÉGATION DE SERVICE PUBLIC</h1><p>Entre <strong>{{autorite_delegante}}</strong>, autorité délégante, et <strong>{{delegataire}}</strong>, délégataire,</p><p>il est convenu ce qui suit :</p><h2>Article 1 – Objet</h2><p>{{objet_service}}</p><h2>Article 2 – Durée</h2><p>La présente convention est conclue pour une durée de {{duree_convention}}.</p><h2>Article 3 – Obligations du délégataire</h2><p>Le délégataire s'engage à assurer la continuité, l'égalité et l'adaptabilité du service public délégué, conformément aux lois et règlements en vigueur en République de Côte d'Ivoire.</p><h2>Article 4 – Contrôle</h2><p>L'autorité délégante exerce un contrôle permanent sur les conditions d'exécution du service délégué.</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'adm3_concession', name: "Accord de Concession de Service Public", category: 'juridique_admin', price: 10000, priceMax: 38000,
    description: "Contrat de concession de service public permettant à une personne publique de confier la gestion d'un service à un concessionnaire qui assume les risques d'exploitation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'autorite_concedante',label:"Autorité concédante",type:'text',required:true},
      {key:'concessionnaire',label:"Concessionnaire",type:'text',required:true},
      {key:'objet_concession',label:"Objet de la concession",type:'textarea',required:true},
      {key:'duree_concession',label:"Durée de la concession",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'redevance',label:"Redevance annuelle (FCFA)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONCESSION DE SERVICE PUBLIC</h1><p>Entre <strong>{{autorite_concedante}}</strong>, autorité concédante, et <strong>{{concessionnaire}}</strong>, concessionnaire,</p><h2>Article 1 – Objet</h2><p>{{objet_concession}}</p><h2>Article 2 – Durée</h2><p>La concession est accordée pour une durée de {{duree_concession}}, renouvelable dans les conditions prévues par la réglementation ivoirienne.</p><h2>Article 3 – Redevance</h2><p>Le concessionnaire versera une redevance annuelle de {{redevance}} FCFA à l'autorité concédante.</p><h2>Article 4 – Risques</h2><p>Le concessionnaire assume l'entièreté des risques liés à l'exploitation du service concédé.</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'adm3_mptravaux', name: "Accord de Marché Public de Travaux (Code des Marchés CI)", category: 'juridique_admin', price: 9000, priceMax: 32000,
    description: "Contrat de marché public de travaux établi conformément au Code des marchés publics de Côte d'Ivoire, incluant les clauses techniques et financières obligatoires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'autorite_contractante',label:"Autorité contractante",type:'text',required:true},
      {key:'titulaire',label:"Titulaire du marché",type:'text',required:true},
      {key:'objet_travaux',label:"Objet des travaux",type:'textarea',required:true},
      {key:'montant_marche',label:"Montant du marché (FCFA TTC)",type:'text',required:true},
      {key:'delai_execution',label:"Délai d'exécution",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>MARCHÉ PUBLIC DE TRAVAUX</h1><p>Conformément au Code des marchés publics de Côte d'Ivoire,</p><p>Entre <strong>{{autorite_contractante}}</strong> et <strong>{{titulaire}}</strong>,</p><h2>Article 1 – Objet</h2><p>{{objet_travaux}}</p><h2>Article 2 – Montant</h2><p>Le montant du présent marché est de <strong>{{montant_marche}} FCFA TTC</strong>.</p><h2>Article 3 – Délai d'exécution</h2><p>Les travaux devront être réalisés dans un délai de {{delai_execution}} à compter de la date de démarrage.</p><h2>Article 4 – Garanties</h2><p>Le titulaire fournira les garanties bancaires requises par la réglementation en vigueur (caution de bonne exécution, caution de retenue de garantie).</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'adm3_mpfournitures', name: "Accord de Marché Public de Fournitures", category: 'juridique_admin', price: 7000, priceMax: 25000,
    description: "Contrat de marché public de fournitures conforme aux dispositions du Code des marchés publics ivoirien, précisant les spécifications techniques et les conditions de livraison.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'autorite_contractante',label:"Autorité contractante",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur titulaire",type:'text',required:true},
      {key:'designation_fournitures',label:"Désignation des fournitures",type:'textarea',required:true},
      {key:'montant_marche',label:"Montant du marché (FCFA TTC)",type:'text',required:true},
      {key:'delai_livraison',label:"Délai de livraison",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>MARCHÉ PUBLIC DE FOURNITURES</h1><p>Entre <strong>{{autorite_contractante}}</strong> et <strong>{{fournisseur}}</strong>,</p><h2>Article 1 – Objet</h2><p>{{designation_fournitures}}</p><h2>Article 2 – Prix</h2><p>Le montant total du marché est de <strong>{{montant_marche}} FCFA TTC</strong>, ferme et non révisable.</p><h2>Article 3 – Livraison</h2><p>Les fournitures seront livrées dans un délai de {{delai_livraison}} à compter de la notification du bon de commande.</p><h2>Article 4 – Réception</h2><p>La réception est prononcée par la commission de réception désignée par l'autorité contractante, après vérification de la conformité aux spécifications.</p></div>`
  },
  {
    code: 'adm3_mpservices', name: "Accord de Marché Public de Services", category: 'juridique_admin', price: 7000, priceMax: 25000,
    description: "Contrat de marché public de services établi selon le Code des marchés publics CI, couvrant les prestations de services courants hors prestations intellectuelles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'autorite_contractante',label:"Autorité contractante",type:'text',required:true},
      {key:'prestataire',label:"Prestataire de services",type:'text',required:true},
      {key:'objet_services',label:"Objet des services",type:'textarea',required:true},
      {key:'montant_marche',label:"Montant du marché (FCFA TTC)",type:'text',required:true},
      {key:'duree_marche',label:"Durée du marché",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>MARCHÉ PUBLIC DE SERVICES</h1><p>Entre <strong>{{autorite_contractante}}</strong> et <strong>{{prestataire}}</strong>,</p><h2>Article 1 – Objet</h2><p>{{objet_services}}</p><h2>Article 2 – Montant</h2><p>Le montant du marché est de <strong>{{montant_marche}} FCFA TTC</strong>.</p><h2>Article 3 – Durée</h2><p>Le marché est conclu pour une durée de {{duree_marche}}, renouvelable une fois par accord exprès des parties.</p><h2>Article 4 – Modalités de paiement</h2><p>Le règlement interviendra dans les délais prévus par la réglementation sur les marchés publics, sur présentation de factures certifiées conformes.</p></div>`
  },
  {
    code: 'adm3_mppi', name: "Accord de Marché Public de Prestations Intellectuelles", category: 'juridique_admin', price: 8000, priceMax: 28000,
    description: "Contrat de marché public de prestations intellectuelles (études, conseils, maîtrise d'œuvre) soumis aux règles spécifiques du Code des marchés publics CI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'autorite_contractante',label:"Autorité contractante",type:'text',required:true},
      {key:'consultant',label:"Consultant / Bureau d'études",type:'text',required:true},
      {key:'objet_mission',label:"Objet de la mission intellectuelle",type:'textarea',required:true},
      {key:'montant_honoraires',label:"Montant des honoraires (FCFA HT)",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>MARCHÉ PUBLIC DE PRESTATIONS INTELLECTUELLES</h1><p>Entre <strong>{{autorite_contractante}}</strong> et <strong>{{consultant}}</strong>,</p><h2>Article 1 – Objet de la mission</h2><p>{{objet_mission}}</p><h2>Article 2 – Honoraires</h2><p>Les honoraires sont fixés à <strong>{{montant_honoraires}} FCFA HT</strong>, conformément au bordereau des prix unitaires annexé.</p><h2>Article 3 – Durée</h2><p>La mission s'étend sur une durée de {{duree_mission}} à compter de la date de démarrage effectif.</p><h2>Article 4 – Livrables</h2><p>Le consultant remettra les rapports intermédiaires et le rapport final selon le calendrier convenu dans les termes de référence.</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'adm3_ppp', name: "Accord de Partenariat Public-Privé (PPP CI)", category: 'juridique_admin', price: 11000, priceMax: 40000,
    description: "Contrat de partenariat public-privé conforme à la loi ivoirienne sur les PPP, définissant la répartition des risques, le financement et les obligations des deux parties.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'entite_publique',label:"Entité publique partenaire",type:'text',required:true},
      {key:'partenaire_prive',label:"Partenaire privé",type:'text',required:true},
      {key:'objet_projet',label:"Objet du projet PPP",type:'textarea',required:true},
      {key:'duree_contrat',label:"Durée du contrat PPP",type:'text',required:true},
      {key:'montant_investissement',label:"Montant d'investissement prévisionnel (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PARTENARIAT PUBLIC-PRIVÉ</h1><p>Conformément à la loi ivoirienne régissant les partenariats public-privé,</p><p>Entre <strong>{{entite_publique}}</strong> et <strong>{{partenaire_prive}}</strong>,</p><h2>Article 1 – Objet du projet</h2><p>{{objet_projet}}</p><h2>Article 2 – Durée</h2><p>Le contrat PPP est conclu pour une durée de {{duree_contrat}}.</p><h2>Article 3 – Investissement</h2><p>Le montant d'investissement prévisionnel est de <strong>{{montant_investissement}} FCFA</strong>, financé selon la structure définie en annexe financière.</p><h2>Article 4 – Partage des risques</h2><p>La répartition des risques entre les parties est définie dans la matrice de risques annexée, conformément aux meilleures pratiques internationales adaptées au contexte ivoirien.</p></div>`
  },
  {
    code: 'adm3_contperf', name: "Accord de Contrat de Performance Administration", category: 'juridique_admin', price: 6000, priceMax: 20000,
    description: "Contrat de performance entre une administration ivoirienne et sa tutelle, fixant des objectifs mesurables et des indicateurs de résultats pour l'amélioration du service public.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'administration',label:"Administration concernée",type:'text',required:true},
      {key:'autorite_tutelle',label:"Autorité de tutelle",type:'text',required:true},
      {key:'periode_contrat',label:"Période couverte par le contrat",type:'text',required:true},
      {key:'objectifs_principaux',label:"Objectifs principaux",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PERFORMANCE</h1><p>Entre <strong>{{autorite_tutelle}}</strong>, autorité de tutelle, et <strong>{{administration}}</strong>,</p><h2>Article 1 – Objet et période</h2><p>Le présent contrat couvre la période <strong>{{periode_contrat}}</strong> et vise à améliorer la performance et l'efficacité du service public rendu.</p><h2>Article 2 – Objectifs</h2><p>{{objectifs_principaux}}</p><h2>Article 3 – Indicateurs de performance</h2><p>Des indicateurs clés de performance (KPI) mesurables et vérifiables sont définis en annexe et feront l'objet d'un suivi trimestriel.</p><h2>Article 4 – Évaluation</h2><p>Une évaluation annuelle est conduite par l'autorité de tutelle pour mesurer l'atteinte des objectifs et décider des ajustements nécessaires.</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'adm3_subvention', name: "Accord de Convention de Subvention Publique", category: 'juridique_admin', price: 6000, priceMax: 20000,
    description: "Convention de subvention publique encadrant l'octroi d'une aide financière de l'État ou d'une collectivité ivoirienne à un organisme bénéficiaire, avec obligations de reddition des comptes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'autorite_subventionnante',label:"Autorité subventionnante",type:'text',required:true},
      {key:'beneficiaire',label:"Organisme bénéficiaire",type:'text',required:true},
      {key:'objet_subvention',label:"Objet de la subvention",type:'textarea',required:true},
      {key:'montant_subvention',label:"Montant de la subvention (FCFA)",type:'text',required:true},
      {key:'annee_budgetaire',label:"Année budgétaire",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SUBVENTION PUBLIQUE</h1><p>Entre <strong>{{autorite_subventionnante}}</strong> et <strong>{{beneficiaire}}</strong>,</p><h2>Article 1 – Objet</h2><p>{{objet_subvention}}</p><h2>Article 2 – Montant</h2><p>La subvention allouée au titre de l'année budgétaire {{annee_budgetaire}} est de <strong>{{montant_subvention}} FCFA</strong>.</p><h2>Article 3 – Utilisation des fonds</h2><p>Le bénéficiaire s'engage à utiliser les fonds exclusivement pour l'objet de la subvention et à en rendre compte à l'autorité subventionnante.</p><h2>Article 4 – Contrôle et audit</h2><p>L'autorité subventionnante se réserve le droit de procéder à tout contrôle ou audit des comptes du bénéficiaire relatifs à l'utilisation de la subvention.</p></div>`
  },
  {
    code: 'adm3_agrement_asso', name: "Accord d'Agrément d'une Association d'Utilité Publique", category: 'juridique_admin', price: 5000, priceMax: 16000,
    description: "Décision d'agrément reconnaissant l'utilité publique d'une association ivoirienne, lui conférant des droits et obligations spécifiques conformément à la loi sur les associations.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 59,
    fieldsJson: F([
      {key:'ministere_competent',label:"Ministère compétent",type:'text',required:true},
      {key:'denomination_asso',label:"Dénomination de l'association",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true},
      {key:'objet_asso',label:"Objet social de l'association",type:'textarea',required:true},
      {key:'date_agrement',label:"Date d'agrément",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCISION D'AGRÉMENT D'UTILITÉ PUBLIQUE</h1><p>Le Ministère de <strong>{{ministere_competent}}</strong>,</p><p>Vu la loi ivoirienne relative aux associations et aux organismes à but non lucratif,</p><h2>Article 1 – Agrément</h2><p>L'association <strong>{{denomination_asso}}</strong>, dont le siège social est établi à {{siege_social}}, est reconnue d'utilité publique.</p><h2>Article 2 – Objet reconnu</h2><p>{{objet_asso}}</p><h2>Article 3 – Obligations</h2><p>L'association reconnue d'utilité publique est tenue de présenter annuellement un rapport d'activités et ses comptes certifiés au ministère de tutelle.</p><p>Fait à Abidjan, le {{date_agrement}}</p></div>`
  },
  {
    code: 'adm3_conv_collective', name: "Accord de Convention Collective de Branche (Ministère)", category: 'juridique_admin', price: 9000, priceMax: 30000,
    description: "Convention collective de branche professionnelle établie sous l'égide du Ministère de l'Emploi ivoirien, fixant les conditions minimales de travail et de rémunération.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'branche_professionnelle',label:"Branche professionnelle concernée",type:'text',required:true},
      {key:'organisations_patronales',label:"Organisations patronales signataires",type:'textarea',required:true},
      {key:'organisations_syndicales',label:"Organisations syndicales signataires",type:'textarea',required:true},
      {key:'champ_application',label:"Champ d'application géographique",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION COLLECTIVE DE BRANCHE</h1><p>Branche : <strong>{{branche_professionnelle}}</strong></p><p>Conclue sous l'égide du Ministère de l'Emploi et de la Protection Sociale de Côte d'Ivoire,</p><h2>Organisations patronales</h2><p>{{organisations_patronales}}</p><h2>Organisations syndicales</h2><p>{{organisations_syndicales}}</p><h2>Article 1 – Champ d'application</h2><p>La présente convention s'applique sur l'ensemble du territoire de {{champ_application}} et est obligatoire pour tous les employeurs et salariés relevant de la branche.</p><h2>Article 2 – Conditions de travail</h2><p>Les conditions minimales de travail, de rémunération et de formation sont définies dans les annexes thématiques de la présente convention.</p><p>Signé le {{date_signature}}</p></div>`
  },
  {
    code: 'adm3_delegation_sign', name: "Accord de Délégation de Signature Administrative", category: 'juridique_admin', price: 4000, priceMax: 13000,
    description: "Acte administratif de délégation de signature permettant à un responsable ivoirien de transférer sa signature sur des actes déterminés à un subordonné désigné.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'delegant',label:"Autorité délégante (nom et fonction)",type:'text',required:true},
      {key:'delegataire_sign',label:"Délégataire de signature (nom et fonction)",type:'text',required:true},
      {key:'actes_concernes',label:"Actes concernés par la délégation",type:'textarea',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCISION DE DÉLÉGATION DE SIGNATURE</h1><p><strong>{{delegant}}</strong>,</p><p>Vu les textes législatifs et réglementaires applicables,</p><h2>Article 1 – Délégation</h2><p>Délégation de signature est accordée à <strong>{{delegataire_sign}}</strong>, pour les actes suivants :</p><p>{{actes_concernes}}</p><h2>Article 2 – Prise d'effet</h2><p>La présente délégation prend effet à compter du {{date_effet}}.</p><h2>Article 3 – Publicité</h2><p>La présente décision sera publiée au Journal Officiel de la République de Côte d'Ivoire.</p></div>`
  },
  {
    code: 'adm3_proto_intermin', name: "Accord de Protocole Interministériel", category: 'juridique_admin', price: 7000, priceMax: 24000,
    description: "Protocole d'accord entre deux ou plusieurs ministères ivoiriens pour coordonner leurs actions dans un domaine d'intérêt commun.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'ministere1',label:"Premier ministère",type:'text',required:true},
      {key:'ministere2',label:"Second ministère",type:'text',required:true},
      {key:'objet_protocole',label:"Objet du protocole",type:'textarea',required:true},
      {key:'duree',label:"Durée de validité",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROTOCOLE INTERMINISTÉRIEL</h1><p>Entre le <strong>{{ministere1}}</strong> et le <strong>{{ministere2}}</strong>,</p><h2>Article 1 – Objet</h2><p>{{objet_protocole}}</p><h2>Article 2 – Engagements réciproques</h2><p>Chaque ministère s'engage à mettre à disposition les ressources humaines, techniques et financières nécessaires à la réalisation des objectifs communs.</p><h2>Article 3 – Durée</h2><p>Le présent protocole est conclu pour une durée de {{duree}}, renouvelable par tacite reconduction.</p><h2>Article 4 – Comité de suivi</h2><p>Un comité interministériel de suivi se réunira semestriellement pour évaluer la mise en œuvre du protocole.</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'adm3_conv_collectivite', name: "Accord de Convention Cadre Collectivité-État", category: 'juridique_admin', price: 7000, priceMax: 25000,
    description: "Convention cadre entre une collectivité territoriale ivoirienne (district, région, commune) et l'État pour la mise en œuvre de politiques publiques locales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'collectivite',label:"Collectivité territoriale",type:'text',required:true},
      {key:'ministere_tutelle',label:"Ministère de tutelle",type:'text',required:true},
      {key:'domaines_partenariat',label:"Domaines du partenariat",type:'textarea',required:true},
      {key:'montant_transfert',label:"Montant des transferts financiers (FCFA)",type:'text',required:false},
      {key:'duree',label:"Durée de la convention",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION CADRE COLLECTIVITÉ-ÉTAT</h1><p>Entre <strong>{{collectivite}}</strong> et l'État de Côte d'Ivoire, représenté par le <strong>{{ministere_tutelle}}</strong>,</p><h2>Article 1 – Domaines du partenariat</h2><p>{{domaines_partenariat}}</p><h2>Article 2 – Transferts financiers</h2><p>L'État s'engage à transférer à la collectivité les ressources financières d'un montant de {{montant_transfert}} FCFA, dans le cadre de la politique de décentralisation.</p><h2>Article 3 – Durée</h2><p>La présente convention est conclue pour une durée de {{duree}}.</p><h2>Article 4 – Reddition des comptes</h2><p>La collectivité rendra compte annuellement de l'utilisation des ressources transférées devant le conseil régional ou municipal compétent.</p></div>`
  },
  {
    code: 'adm3_transfert_comp', name: "Accord de Transfert de Compétences (Décentralisation CI)", category: 'juridique_admin', price: 7000, priceMax: 24000,
    description: "Acte de transfert de compétences de l'État vers les collectivités territoriales dans le cadre de la politique de décentralisation de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'ministere_transferant',label:"Ministère transférant",type:'text',required:true},
      {key:'collectivite_beneficiaire',label:"Collectivité bénéficiaire",type:'text',required:true},
      {key:'competences_transferees',label:"Compétences transférées",type:'textarea',required:true},
      {key:'ressources_accompagnement',label:"Ressources d'accompagnement",type:'textarea',required:true},
      {key:'date_effet',label:"Date d'effet du transfert",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE TRANSFERT DE COMPÉTENCES</h1><p>Conformément à la loi portant orientation de la décentralisation en Côte d'Ivoire,</p><p>Le <strong>{{ministere_transferant}}</strong> transfère à <strong>{{collectivite_beneficiaire}}</strong> les compétences suivantes :</p><h2>Article 1 – Compétences transférées</h2><p>{{competences_transferees}}</p><h2>Article 2 – Ressources d'accompagnement</h2><p>{{ressources_accompagnement}}</p><h2>Article 3 – Prise d'effet</h2><p>Le transfert prend effet le {{date_effet}}.</p><h2>Article 4 – Assistance technique</h2><p>L'État assurera une assistance technique aux collectivités pour l'exercice des compétences transférées pendant une période transitoire de deux ans.</p></div>`
  },
  {
    code: 'adm3_contobj', name: "Accord de Contrat d'Objectifs Collectivité-État", category: 'juridique_admin', price: 6000, priceMax: 20000,
    description: "Contrat d'objectifs pluriannuel entre une collectivité ivoirienne et l'État fixant des cibles de développement local mesurables et les financements associés.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'collectivite',label:"Collectivité territoriale",type:'text',required:true},
      {key:'periode',label:"Période couverte",type:'text',required:true},
      {key:'objectifs_dev',label:"Objectifs de développement",type:'textarea',required:true},
      {key:'financement_prevu',label:"Financement prévu (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT D'OBJECTIFS COLLECTIVITÉ-ÉTAT</h1><p>Entre <strong>{{collectivite}}</strong> et l'État de Côte d'Ivoire,</p><p>Pour la période <strong>{{periode}}</strong>,</p><h2>Article 1 – Objectifs de développement</h2><p>{{objectifs_dev}}</p><h2>Article 2 – Financement</h2><p>Un financement total de <strong>{{financement_prevu}} FCFA</strong> est prévu pour la réalisation des objectifs, réparti selon l'échéancier annexé.</p><h2>Article 3 – Suivi et évaluation</h2><p>Le suivi est assuré par un comité paritaire État-collectivité se réunissant deux fois par an. Une évaluation finale est conduite en fin de période.</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'adm3_miseadispo', name: "Accord de Mise à Disposition de Fonctionnaire", category: 'juridique_admin', price: 5000, priceMax: 16000,
    description: "Convention de mise à disposition d'un fonctionnaire ivoirien auprès d'une structure extérieure, définissant les conditions d'emploi et de rémunération.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'administration_origine',label:"Administration d'origine",type:'text',required:true},
      {key:'organisme_accueil',label:"Organisme d'accueil",type:'text',required:true},
      {key:'nom_fonctionnaire',label:"Nom et grade du fonctionnaire",type:'text',required:true},
      {key:'duree_miseadispo',label:"Durée de la mise à disposition",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MISE À DISPOSITION DE FONCTIONNAIRE</h1><p>Entre <strong>{{administration_origine}}</strong>, administration d'origine, et <strong>{{organisme_accueil}}</strong>, organisme d'accueil,</p><h2>Article 1 – Agent mis à disposition</h2><p><strong>{{nom_fonctionnaire}}</strong> est mis à disposition auprès de {{organisme_accueil}} pour une durée de {{duree_miseadispo}} à compter du {{date_debut}}.</p><h2>Article 2 – Rémunération</h2><p>La rémunération de l'agent reste à la charge de l'administration d'origine, sauf accord contraire stipulé en annexe financière.</p><h2>Article 3 – Obligations de l'agent</h2><p>L'agent mis à disposition reste soumis aux obligations du statut général de la Fonction Publique de Côte d'Ivoire tout en étant placé sous l'autorité fonctionnelle de l'organisme d'accueil.</p></div>`
  },
  {
    code: 'adm3_detachement', name: "Accord de Détachement de Fonctionnaire", category: 'juridique_admin', price: 5000, priceMax: 16000,
    description: "Arrêté de détachement d'un fonctionnaire de la Fonction Publique ivoirienne auprès d'un autre corps ou organisme, avec interruption du lien avec le corps d'origine.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'administration_origine',label:"Administration d'origine",type:'text',required:true},
      {key:'organisme_detachement',label:"Organisme de détachement",type:'text',required:true},
      {key:'nom_fonctionnaire',label:"Nom, prénom et grade",type:'text',required:true},
      {key:'duree_detachement',label:"Durée du détachement",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ARRÊTÉ DE DÉTACHEMENT DE FONCTIONNAIRE</h1><p>Le Ministre de la Fonction Publique de Côte d'Ivoire,</p><p>Vu le Statut Général de la Fonction Publique,</p><h2>Article 1 – Détachement</h2><p><strong>{{nom_fonctionnaire}}</strong> relevant de <strong>{{administration_origine}}</strong> est placé en position de détachement auprès de <strong>{{organisme_detachement}}</strong> pour une durée de {{duree_detachement}}, à compter du {{date_effet}}.</p><h2>Article 2 – Droits</h2><p>Durant la période de détachement, l'agent conserve ses droits à l'avancement dans son corps d'origine et peut y être réintégré à tout moment.</p><h2>Article 3 – Rémunération</h2><p>L'agent est rémunéré par l'organisme de détachement selon les conditions négociées en annexe.</p></div>`
  },
  {
    code: 'adm3_conv_projet', name: "Accord de Convention de Mise en Œuvre d'un Projet Public", category: 'juridique_admin', price: 7000, priceMax: 24000,
    description: "Convention de mise en œuvre d'un projet d'investissement public en Côte d'Ivoire, précisant les rôles des parties, le calendrier et les indicateurs de suivi.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'agence_execution',label:"Agence d'exécution",type:'text',required:true},
      {key:'intitule_projet',label:"Intitulé du projet",type:'textarea',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true},
      {key:'duree_execution',label:"Durée d'exécution",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MISE EN ŒUVRE DE PROJET PUBLIC</h1><p>Entre <strong>{{maitre_ouvrage}}</strong>, maître d'ouvrage, et <strong>{{agence_execution}}</strong>, agence d'exécution,</p><h2>Article 1 – Intitulé du projet</h2><p>{{intitule_projet}}</p><h2>Article 2 – Budget</h2><p>Le budget total alloué au projet est de <strong>{{budget_total}} FCFA</strong>, dont la répartition par composante est détaillée en annexe.</p><h2>Article 3 – Durée d'exécution</h2><p>Le projet sera mis en œuvre sur une durée de {{duree_execution}} selon le plan de travail annuel adopté par les parties.</p><h2>Article 4 – Rapportage</h2><p>L'agence d'exécution produira des rapports d'avancement trimestriels soumis à validation du maître d'ouvrage.</p></div>`
  },
  {
    code: 'adm3_gbs', name: "Accord de Partenariat Gouvernement-Secteur Privé (GBS)", category: 'juridique_admin', price: 9000, priceMax: 32000,
    description: "Accord de partenariat stratégique entre le Gouvernement de Côte d'Ivoire et le secteur privé pour le développement économique, le dialogue social et l'amélioration du climat des affaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'ministere_ref',label:"Ministère de référence",type:'text',required:true},
      {key:'organisation_privee',label:"Organisation du secteur privé",type:'text',required:true},
      {key:'domaines_cooperation',label:"Domaines de coopération",type:'textarea',required:true},
      {key:'duree_accord',label:"Durée de l'accord",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT GOUVERNEMENT-SECTEUR PRIVÉ</h1><p>Entre le Gouvernement de la République de Côte d'Ivoire, représenté par le <strong>{{ministere_ref}}</strong>, et <strong>{{organisation_privee}}</strong>,</p><h2>Article 1 – Domaines de coopération</h2><p>{{domaines_cooperation}}</p><h2>Article 2 – Durée</h2><p>Le présent accord est conclu pour une durée de {{duree_accord}}, renouvelable par accord exprès.</p><h2>Article 3 – Cadre de concertation</h2><p>Les parties conviennent d'instaurer un cadre de concertation permanente incluant des revues périodiques du climat des affaires et des mécanismes de résolution des contraintes.</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'adm3_conv_afd', name: "Accord de Convention de Financement AFD/BM CI", category: 'juridique_admin', price: 10000, priceMax: 36000,
    description: "Convention de financement entre l'État ivoirien et un bailleur de fonds international (AFD, Banque Mondiale) pour un projet de développement, incluant les conditions de décaissement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'etat_emprunteur',label:"État emprunteur / bénéficiaire",type:'text',required:true},
      {key:'bailleur_fonds',label:"Bailleur de fonds",type:'text',required:true},
      {key:'intitule_projet',label:"Intitulé du projet financé",type:'textarea',required:true},
      {key:'montant_financement',label:"Montant du financement",type:'text',required:true},
      {key:'conditions_remboursement',label:"Conditions de remboursement",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FINANCEMENT</h1><p>Entre <strong>{{etat_emprunteur}}</strong> et <strong>{{bailleur_fonds}}</strong>,</p><h2>Article 1 – Projet financé</h2><p>{{intitule_projet}}</p><h2>Article 2 – Montant</h2><p>Le financement accordé est de <strong>{{montant_financement}}</strong>, mis à disposition selon les modalités de décaissement définies en annexe.</p><h2>Article 3 – Conditions de remboursement</h2><p>{{conditions_remboursement}}</p><h2>Article 4 – Conformité</h2><p>Le bénéficiaire s'engage à respecter les procédures du bailleur en matière de passation des marchés, de gestion fiduciaire et de sauvegarde environnementale et sociale.</p></div>`
  },
  {
    code: 'adm3_proto_strategie', name: "Accord de Protocole d'Accord État-Opérateur Stratégie Nationale", category: 'juridique_admin', price: 9000, priceMax: 30000,
    description: "Protocole d'accord entre l'État ivoirien et un opérateur stratégique pour l'exécution de projets inscrits dans le Plan National de Développement (PND).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'ministere_porteur',label:"Ministère porteur",type:'text',required:true},
      {key:'operateur_strategique',label:"Opérateur stratégique",type:'text',required:true},
      {key:'axe_pnd',label:"Axe du PND concerné",type:'text',required:true},
      {key:'engagements_operateur',label:"Engagements de l'opérateur",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PROTOCOLE D'ACCORD ÉTAT-OPÉRATEUR STRATÉGIQUE</h1><p>Dans le cadre du Plan National de Développement de Côte d'Ivoire,</p><p>Entre le <strong>{{ministere_porteur}}</strong> et <strong>{{operateur_strategique}}</strong>,</p><h2>Article 1 – Axe stratégique</h2><p>Le présent protocole s'inscrit dans l'axe <strong>{{axe_pnd}}</strong> du Plan National de Développement.</p><h2>Article 2 – Engagements de l'opérateur</h2><p>{{engagements_operateur}}</p><h2>Article 3 – Engagements de l'État</h2><p>L'État de Côte d'Ivoire s'engage à créer les conditions favorables à la réalisation des engagements de l'opérateur, notamment en matière réglementaire et d'accès aux autorisations nécessaires.</p><p>Signé à Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'adm3_rapport_eval', name: "Rapport d'Évaluation de Politique Publique", category: 'juridique_admin', price: 8000, priceMax: 28000,
    description: "Rapport structuré d'évaluation d'une politique publique ivoirienne, couvrant la pertinence, l'efficacité, l'efficience et la durabilité des interventions.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'intitule_politique',label:"Intitulé de la politique évaluée",type:'text',required:true},
      {key:'ministere_responsable',label:"Ministère responsable",type:'text',required:true},
      {key:'periode_evaluation',label:"Période d'évaluation",type:'text',required:true},
      {key:'conclusions_principales',label:"Conclusions principales",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ÉVALUATION DE POLITIQUE PUBLIQUE</h1><p>Politique évaluée : <strong>{{intitule_politique}}</strong></p><p>Ministère responsable : {{ministere_responsable}} | Période : {{periode_evaluation}}</p><h2>1. Résumé exécutif</h2><p>Le présent rapport évalue la mise en œuvre et les résultats obtenus par la politique publique susvisée au cours de la période considérée.</p><h2>2. Critères d'évaluation</h2><p>L'évaluation couvre la pertinence, l'efficacité, l'efficience, l'impact et la durabilité des interventions réalisées.</p><h2>3. Conclusions principales</h2><p>{{conclusions_principales}}</p><h2>4. Recommandations</h2><p>Les recommandations opérationnelles issues de cette évaluation sont présentées dans le tableau de bord annexé au présent rapport.</p><p>Rapport établi le {{date_rapport}}</p></div>`
  },
  {
    code: 'adm3_plan_regional', name: "Plan de Développement Régional (District CI)", category: 'juridique_admin', price: 9000, priceMax: 32000,
    description: "Document de planification du développement d'un district ou d'une région de Côte d'Ivoire, définissant les axes stratégiques, les projets prioritaires et les ressources mobilisées.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'region_district',label:"Région / District concerné(e)",type:'text',required:true},
      {key:'periode_plan',label:"Période du plan",type:'text',required:true},
      {key:'axes_strategiques',label:"Axes stratégiques de développement",type:'textarea',required:true},
      {key:'budget_previsionnel',label:"Budget prévisionnel (FCFA)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT RÉGIONAL</h1><p>Région / District : <strong>{{region_district}}</strong> | Période : <strong>{{periode_plan}}</strong></p><h2>1. Diagnostic territorial</h2><p>Le présent plan repose sur un diagnostic territorial participatif impliquant l'ensemble des acteurs locaux.</p><h2>2. Axes stratégiques</h2><p>{{axes_strategiques}}</p><h2>3. Programme d'investissements</h2><p>Le programme pluriannuel d'investissements est doté d'un budget prévisionnel de <strong>{{budget_previsionnel}} FCFA</strong>, mobilisé auprès de l'État, des partenaires techniques et financiers et du secteur privé.</p><h2>4. Dispositif de suivi-évaluation</h2><p>Un comité régional de suivi se réunit trimestriellement pour assurer la coordination et le pilotage du plan.</p><p>Adopté le {{date_adoption}}</p></div>`
  },
  {
    code: 'adm3_charte_gouv', name: "Charte de la Bonne Gouvernance et du Service Public en Côte d'Ivoire", category: 'juridique_admin', price: 6000, priceMax: 20000,
    description: "Charte institutionnelle énonçant les principes de bonne gouvernance, d'intégrité, de transparence et de redevabilité applicables aux agents du service public ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'institution',label:"Institution adoptant la charte",type:'text',required:true},
      {key:'directeur',label:"Directeur général / Responsable",type:'text',required:true},
      {key:'valeurs_fondamentales',label:"Valeurs fondamentales retenues",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA BONNE GOUVERNANCE ET DU SERVICE PUBLIC</h1><p>Institution : <strong>{{institution}}</strong></p><p>Sous la direction de <strong>{{directeur}}</strong>,</p><h2>Préambule</h2><p>La présente charte affirme l'engagement de l'institution en faveur des principes de bonne gouvernance, de transparence, d'intégrité et de redevabilité envers les usagers du service public de Côte d'Ivoire.</p><h2>Valeurs fondamentales</h2><p>{{valeurs_fondamentales}}</p><h2>Engagements</h2><p>L'institution s'engage à garantir l'égal accès de tous les citoyens au service public, à lutter contre la corruption et à rendre compte de ses actions et de l'utilisation des ressources publiques.</p><h2>Mécanisme de plainte</h2><p>Tout usager peut saisir le mécanisme interne de traitement des plaintes ou l'Autorité Nationale de Lutte contre la Corruption (ANLC).</p><p>Adoptée le {{date_adoption}}</p></div>`
  },

  // ── 25 templates Fiscalité CI locale (fisc3_) ──
  {
    code: 'fisc3_dar', name: "Accord de Déclaration Annuelle des Revenus (Formulaire DGI CI)", category: 'juridique_admin', price: 4000, priceMax: 13000,
    description: "Formulaire de déclaration annuelle des revenus des personnes physiques et morales soumises à l'impôt en Côte d'Ivoire, conforme aux exigences de la DGI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'contribuable',label:"Nom / Raison sociale du contribuable",type:'text',required:true},
      {key:'numero_compte_contribuable',label:"Numéro Compte Contribuable (NCC)",type:'text',required:true},
      {key:'exercice_fiscal',label:"Exercice fiscal",type:'text',required:true},
      {key:'revenu_imposable',label:"Revenu imposable déclaré (FCFA)",type:'text',required:true},
      {key:'date_depot',label:"Date de dépôt",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION ANNUELLE DES REVENUS – DGI CÔTE D'IVOIRE</h1><p>Contribuable : <strong>{{contribuable}}</strong> | NCC : {{numero_compte_contribuable}}</p><p>Exercice fiscal : <strong>{{exercice_fiscal}}</strong></p><h2>Revenus déclarés</h2><p>Revenu net imposable : <strong>{{revenu_imposable}} FCFA</strong></p><h2>Certification</h2><p>Je soussigné(e) certifie l'exactitude des informations portées sur la présente déclaration et m'engage à en acquitter les impositions correspondantes dans les délais légaux fixés par la Direction Générale des Impôts de Côte d'Ivoire.</p><p>Date de dépôt : {{date_depot}}</p><p>Signature et cachet du contribuable</p></div>`
  },
  {
    code: 'fisc3_tva', name: "Accord de Déclaration de TVA Mensuelle (Formulaire TVA CI)", category: 'juridique_admin', price: 4000, priceMax: 13000,
    description: "Déclaration mensuelle de TVA collectée et déductible conforme au formulaire de la DGI de Côte d'Ivoire, permettant le calcul de la TVA nette à payer ou du crédit de TVA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'contribuable',label:"Raison sociale",type:'text',required:true},
      {key:'ncc',label:"Numéro Compte Contribuable",type:'text',required:true},
      {key:'mois_declaration',label:"Mois de déclaration (MM/AAAA)",type:'text',required:true},
      {key:'tva_collectee',label:"TVA collectée (FCFA)",type:'text',required:true},
      {key:'tva_deductible',label:"TVA déductible (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE TVA MENSUELLE – DGI CÔTE D'IVOIRE</h1><p>Redevable : <strong>{{contribuable}}</strong> | NCC : {{ncc}}</p><p>Période : <strong>{{mois_declaration}}</strong></p><h2>Calcul de la TVA</h2><p>TVA collectée sur ventes : <strong>{{tva_collectee}} FCFA</strong></p><p>TVA déductible sur achats : <strong>{{tva_deductible}} FCFA</strong></p><p>TVA nette à payer ou crédit reportable : <strong>[Calculé automatiquement]</strong></p><h2>Engagement</h2><p>Le contribuable certifie l'exactitude des données déclarées et s'engage à verser le montant dû dans le délai légal imparti par la réglementation fiscale ivoirienne.</p></div>`
  },
  {
    code: 'fisc3_bic', name: "Accord de Déclaration d'Impôt sur les Bénéfices Industriels et Commerciaux (BIC CI)", category: 'juridique_admin', price: 5000, priceMax: 16000,
    description: "Déclaration annuelle de l'impôt sur les bénéfices industriels et commerciaux (BIC) en Côte d'Ivoire, incluant la détermination du résultat fiscal.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'ncc',label:"Numéro Compte Contribuable",type:'text',required:true},
      {key:'exercice',label:"Exercice comptable",type:'text',required:true},
      {key:'resultat_comptable',label:"Résultat comptable (FCFA)",type:'text',required:true},
      {key:'resultat_fiscal',label:"Résultat fiscal après corrections (FCFA)",type:'text',required:true},
      {key:'date_depot',label:"Date de dépôt",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION BIC – IMPÔT SUR LES BÉNÉFICES INDUSTRIELS ET COMMERCIAUX</h1><p>Entreprise : <strong>{{entreprise}}</strong> | NCC : {{ncc}} | Exercice : {{exercice}}</p><h2>Résultat comptable</h2><p>Résultat comptable avant impôt : <strong>{{resultat_comptable}} FCFA</strong></p><h2>Corrections extra-comptables</h2><p>Les réintégrations et déductions fiscales sont détaillées dans l'état de passage du résultat comptable au résultat fiscal (annexe obligatoire).</p><h2>Résultat fiscal</h2><p>Résultat fiscal imposable : <strong>{{resultat_fiscal}} FCFA</strong></p><h2>Certification</h2><p>Déclaration certifiée sincère et véritable, déposée le {{date_depot}} à la Direction des Grandes Entreprises ou au Centre des Impôts compétent.</p></div>`
  },
  {
    code: 'fisc3_imf', name: "Accord de Déclaration d'Impôt Minimum Forfaitaire (IMF CI)", category: 'juridique_admin', price: 4000, priceMax: 13000,
    description: "Déclaration et paiement de l'Impôt Minimum Forfaitaire (IMF) applicable aux entreprises ivoiriennes dont l'impôt calculé est inférieur au minimum légal.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'ncc',label:"NCC",type:'text',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires HT (FCFA)",type:'text',required:true},
      {key:'montant_imf',label:"Montant IMF calculé (FCFA)",type:'text',required:true},
      {key:'date_paiement',label:"Date de paiement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION D'IMPÔT MINIMUM FORFAITAIRE (IMF)</h1><p>Entreprise : <strong>{{entreprise}}</strong> | NCC : {{ncc}}</p><h2>Base de calcul</h2><p>Chiffre d'affaires hors taxes de référence : <strong>{{chiffre_affaires}} FCFA</strong></p><h2>IMF dû</h2><p>Montant de l'IMF calculé conformément au Code Général des Impôts de Côte d'Ivoire : <strong>{{montant_imf}} FCFA</strong></p><h2>Modalités</h2><p>L'IMF est exigible même en cas de déficit. Il constitue un minimum de perception garanti à l'État ivoirien. Le paiement est effectué au plus tard le {{date_paiement}}.</p></div>`
  },
  {
    code: 'fisc3_ts', name: "Accord de Déclaration de la Taxe sur les Salaires (TS CI)", category: 'juridique_admin', price: 4000, priceMax: 13000,
    description: "Déclaration mensuelle ou trimestrielle de la taxe sur les salaires versée par les employeurs ivoiriens, conforme aux dispositions du Code Général des Impôts.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'employeur',label:"Raison sociale de l'employeur",type:'text',required:true},
      {key:'ncc',label:"NCC",type:'text',required:true},
      {key:'periode',label:"Période (mois ou trimestre)",type:'text',required:true},
      {key:'masse_salariale',label:"Masse salariale brute (FCFA)",type:'text',required:true},
      {key:'taxe_due',label:"Taxe sur salaires due (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE LA TAXE SUR LES SALAIRES</h1><p>Employeur : <strong>{{employeur}}</strong> | NCC : {{ncc}} | Période : {{periode}}</p><h2>Assiette</h2><p>Masse salariale brute de la période : <strong>{{masse_salariale}} FCFA</strong></p><h2>Calcul</h2><p>Taxe sur les salaires due (taux légal applicable) : <strong>{{taxe_due}} FCFA</strong></p><h2>Reversement</h2><p>Le montant est versé à la Recette des Impôts compétente dans les délais légaux prévus par le Code Général des Impôts de Côte d'Ivoire.</p><p>Signature et cachet de l'employeur</p></div>`
  },
  {
    code: 'fisc3_patente', name: "Accord de Déclaration de la Patente (CI)", category: 'juridique_admin', price: 4000, priceMax: 13000,
    description: "Déclaration annuelle de la patente due par les commerçants, industriels et professions libérales exerçant en Côte d'Ivoire, avec calcul du droit proportionnel et du droit fixe.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'contribuable',label:"Nom / Raison sociale",type:'text',required:true},
      {key:'ncc',label:"NCC",type:'text',required:true},
      {key:'activite',label:"Nature de l'activité",type:'text',required:true},
      {key:'chiffre_affaires_ref',label:"Chiffre d'affaires de référence (FCFA)",type:'text',required:true},
      {key:'montant_patente',label:"Montant de la patente (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE PATENTE – CÔTE D'IVOIRE</h1><p>Contribuable : <strong>{{contribuable}}</strong> | NCC : {{ncc}}</p><p>Activité : {{activite}}</p><h2>Base de calcul</h2><p>Chiffre d'affaires de référence : <strong>{{chiffre_affaires_ref}} FCFA</strong></p><h2>Montant de la patente</h2><p>Droit proportionnel + Droit fixe = <strong>{{montant_patente}} FCFA</strong></p><h2>Modalités de paiement</h2><p>La patente est acquittée en deux versements égaux, aux échéances fixées par la DGI Côte d'Ivoire. Le justificatif de paiement doit être conservé et présenté sur demande.</p></div>`
  },
  {
    code: 'fisc3_cfpb', name: "Accord de Déclaration de la Contribution Foncière des Propriétés Bâties (CFPB CI)", category: 'juridique_admin', price: 4000, priceMax: 13000,
    description: "Déclaration de la contribution foncière des propriétés bâties applicable aux propriétaires d'immeubles bâtis situés en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'proprietaire',label:"Nom du propriétaire",type:'text',required:true},
      {key:'adresse_immeuble',label:"Adresse de l'immeuble",type:'text',required:true},
      {key:'valeur_locative',label:"Valeur locative annuelle (FCFA)",type:'text',required:true},
      {key:'montant_cfpb',label:"Montant CFPB dû (FCFA)",type:'text',required:true},
      {key:'annee_imposition',label:"Année d'imposition",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE LA CONTRIBUTION FONCIÈRE DES PROPRIÉTÉS BÂTIES (CFPB)</h1><p>Propriétaire : <strong>{{proprietaire}}</strong></p><p>Immeuble : {{adresse_immeuble}} | Année d'imposition : {{annee_imposition}}</p><h2>Base d'imposition</h2><p>Valeur locative annuelle retenue : <strong>{{valeur_locative}} FCFA</strong></p><h2>Montant dû</h2><p>CFPB due (taux légal sur valeur locative) : <strong>{{montant_cfpb}} FCFA</strong></p><h2>Paiement</h2><p>Le contribuable s'acquitte de la CFPB auprès de la Direction des Impôts Fonciers compétente selon le calendrier de paiement annuel de la DGI Côte d'Ivoire.</p></div>`
  },
  {
    code: 'fisc3_cfpnb', name: "Accord de Déclaration de la Contribution Foncière des Propriétés Non Bâties (CFPNB CI)", category: 'juridique_admin', price: 4000, priceMax: 13000,
    description: "Déclaration de la contribution foncière des propriétés non bâties applicable aux détenteurs de terrains non construits en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'proprietaire',label:"Nom du propriétaire",type:'text',required:true},
      {key:'localisation_terrain',label:"Localisation du terrain",type:'text',required:true},
      {key:'superficie',label:"Superficie (m²)",type:'text',required:true},
      {key:'montant_cfpnb',label:"Montant CFPNB dû (FCFA)",type:'text',required:true},
      {key:'annee_imposition',label:"Année d'imposition",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE LA CONTRIBUTION FONCIÈRE DES PROPRIÉTÉS NON BÂTIES (CFPNB)</h1><p>Propriétaire : <strong>{{proprietaire}}</strong></p><p>Terrain : {{localisation_terrain}} | Superficie : {{superficie}} m² | Année : {{annee_imposition}}</p><h2>Base d'imposition</h2><p>L'assiette est déterminée sur la valeur vénale ou locative du terrain conformément aux dispositions du Code Général des Impôts ivoirien.</p><h2>Montant dû</h2><p>CFPNB due : <strong>{{montant_cfpnb}} FCFA</strong></p><h2>Paiement</h2><p>Le paiement est effectué selon les modalités et délais fixés annuellement par la DGI Côte d'Ivoire.</p></div>`
  },
  {
    code: 'fisc3_taxeapprentissage', name: "Accord de Déclaration de la Taxe d'Apprentissage (CI)", category: 'juridique_admin', price: 4000, priceMax: 12000,
    description: "Déclaration annuelle de la taxe d'apprentissage due par les employeurs ivoiriens, destinée au financement de la formation professionnelle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'employeur',label:"Raison sociale de l'employeur",type:'text',required:true},
      {key:'ncc',label:"NCC",type:'text',required:true},
      {key:'exercice',label:"Exercice",type:'text',required:true},
      {key:'masse_salariale_annuelle',label:"Masse salariale annuelle (FCFA)",type:'text',required:true},
      {key:'taxe_apprentissage',label:"Taxe d'apprentissage due (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE LA TAXE D'APPRENTISSAGE</h1><p>Employeur : <strong>{{employeur}}</strong> | NCC : {{ncc}} | Exercice : {{exercice}}</p><h2>Assiette</h2><p>Masse salariale annuelle brute : <strong>{{masse_salariale_annuelle}} FCFA</strong></p><h2>Taxe due</h2><p>Taxe d'apprentissage calculée au taux légal : <strong>{{taxe_apprentissage}} FCFA</strong></p><h2>Affectation</h2><p>Le produit de cette taxe est affecté au financement de la formation professionnelle et de l'apprentissage en Côte d'Ivoire, conformément aux dispositions du Code Général des Impôts.</p><p>Cachet et signature de l'employeur</p></div>`
  },
  {
    code: 'fisc3_cnde', name: "Accord de Déclaration de la Contribution Nationale pour le Développement Économique (CNDE CI)", category: 'juridique_admin', price: 4000, priceMax: 12000,
    description: "Déclaration de la Contribution Nationale pour le Développement Économique (CNDE) due par les entreprises soumises à l'impôt sur les bénéfices en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'ncc',label:"NCC",type:'text',required:true},
      {key:'benefice_imposable',label:"Bénéfice imposable (FCFA)",type:'text',required:true},
      {key:'montant_cnde',label:"Montant CNDE (FCFA)",type:'text',required:true},
      {key:'date_paiement',label:"Date de paiement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE LA CONTRIBUTION NATIONALE POUR LE DÉVELOPPEMENT ÉCONOMIQUE (CNDE)</h1><p>Entreprise : <strong>{{entreprise}}</strong> | NCC : {{ncc}}</p><h2>Base de calcul</h2><p>Bénéfice imposable retenu : <strong>{{benefice_imposable}} FCFA</strong></p><h2>Contribution due</h2><p>CNDE calculée au taux applicable : <strong>{{montant_cnde}} FCFA</strong></p><h2>Paiement</h2><p>La CNDE est versée à la Recette des Impôts compétente au plus tard le {{date_paiement}}, conformément à la législation fiscale ivoirienne en vigueur.</p></div>`
  },
  {
    code: 'fisc3_redevance_av', name: "Accord de Déclaration de la Redevance Audio-Visuelle (CI)", category: 'juridique_admin', price: 3000, priceMax: 10000,
    description: "Déclaration et paiement de la redevance audio-visuelle due par les détenteurs d'appareils récepteurs en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'redevable',label:"Nom / Raison sociale du redevable",type:'text',required:true},
      {key:'ncc',label:"NCC (si applicable)",type:'text',required:false},
      {key:'nombre_recepteurs',label:"Nombre d'appareils récepteurs",type:'text',required:true},
      {key:'montant_redevance',label:"Montant de la redevance (FCFA)",type:'text',required:true},
      {key:'annee',label:"Année de référence",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE LA REDEVANCE AUDIO-VISUELLE</h1><p>Redevable : <strong>{{redevable}}</strong> | Année : {{annee}}</p><h2>Appareils déclarés</h2><p>Nombre de récepteurs détenus : <strong>{{nombre_recepteurs}}</strong></p><h2>Montant dû</h2><p>Redevance audio-visuelle due : <strong>{{montant_redevance}} FCFA</strong></p><h2>Paiement</h2><p>Le paiement est effectué conformément aux dispositions du Code Général des Impôts de Côte d'Ivoire régissant la redevance audio-visuelle.</p><p>Signature du redevable</p></div>`
  },
  {
    code: 'fisc3_rescrit', name: "Accord de Rescrit Fiscal (Ruling DGI CI)", category: 'juridique_admin', price: 6000, priceMax: 20000,
    description: "Demande de rescrit fiscal (ruling) adressée à la Direction Générale des Impôts de Côte d'Ivoire pour obtenir une prise de position formelle sur un traitement fiscal incertain.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'contribuable',label:"Nom / Raison sociale du contribuable",type:'text',required:true},
      {key:'ncc',label:"NCC",type:'text',required:true},
      {key:'question_fiscale',label:"Question fiscale posée",type:'textarea',required:true},
      {key:'situation_de_fait',label:"Description précise de la situation de fait",type:'textarea',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE RESCRIT FISCAL (RULING)</h1><p>Contribuable : <strong>{{contribuable}}</strong> | NCC : {{ncc}}</p><p>Adressée à : Directeur Général des Impôts, Côte d'Ivoire</p><p>Date : {{date_demande}}</p><h2>Question fiscale</h2><p>{{question_fiscale}}</p><h2>Situation de fait</h2><p>{{situation_de_fait}}</p><h2>Demande</h2><p>Le contribuable sollicite une prise de position formelle et opposable de la DGI sur la question fiscale ci-dessus exposée, conformément au droit au rescrit prévu par la charte du contribuable ivoirien.</p><p>Signature et cachet du contribuable</p></div>`
  },
  {
    code: 'fisc3_remise_gracieuse', name: "Accord de Remise Gracieuse d'Impôt (DGI CI)", category: 'juridique_admin', price: 5000, priceMax: 16000,
    description: "Requête en remise gracieuse d'impôt adressée à la DGI de Côte d'Ivoire, invoquant des difficultés financières avérées pour obtenir une réduction ou un effacement de la dette fiscale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'contribuable',label:"Nom / Raison sociale",type:'text',required:true},
      {key:'ncc',label:"NCC",type:'text',required:true},
      {key:'nature_impot',label:"Nature et montant de l'impôt concerné",type:'text',required:true},
      {key:'motifs_remise',label:"Motifs de la demande de remise",type:'textarea',required:true},
      {key:'date_requete',label:"Date de la requête",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN REMISE GRACIEUSE D'IMPÔT</h1><p>Contribuable : <strong>{{contribuable}}</strong> | NCC : {{ncc}}</p><p>À Monsieur le Directeur Général des Impôts de Côte d'Ivoire</p><p>Date : {{date_requete}}</p><h2>Objet de la requête</h2><p>Le contribuable sollicite une remise gracieuse sur : <strong>{{nature_impot}}</strong></p><h2>Motifs</h2><p>{{motifs_remise}}</p><h2>Engagement</h2><p>Le contribuable s'engage à respecter l'ensemble de ses obligations fiscales futures et à coopérer pleinement avec les services de la DGI dans le traitement du présent dossier.</p><p>Signature et cachet</p></div>`
  },
  {
    code: 'fisc3_plan_remboursement', name: "Accord de Plan de Remboursement d'Arriérés Fiscaux", category: 'juridique_admin', price: 5000, priceMax: 16000,
    description: "Accord de plan de règlement échelonné des arriérés fiscaux entre un contribuable ivoirien et la DGI, définissant le calendrier de paiement et les conditions de suspension des poursuites.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'contribuable',label:"Nom / Raison sociale",type:'text',required:true},
      {key:'ncc',label:"NCC",type:'text',required:true},
      {key:'montant_total_arrieres',label:"Montant total des arriérés (FCFA)",type:'text',required:true},
      {key:'echeancier',label:"Échéancier de remboursement",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE REMBOURSEMENT D'ARRIÉRÉS FISCAUX</h1><p>Entre la Direction Générale des Impôts de Côte d'Ivoire et <strong>{{contribuable}}</strong> (NCC : {{ncc}}),</p><h2>Article 1 – Montant des arriérés</h2><p>Le montant total des arriérés fiscaux reconnu est de <strong>{{montant_total_arrieres}} FCFA</strong>.</p><h2>Article 2 – Échéancier</h2><p>{{echeancier}}</p><h2>Article 3 – Suspension des poursuites</h2><p>La DGI suspend les poursuites en recouvrement pendant la durée du plan, sous réserve du respect scrupuleux des échéances convenues.</p><h2>Article 4 – Résolution</h2><p>Tout manquement au plan entraîne la résolution automatique de celui-ci et la reprise immédiate des poursuites pour la totalité du solde restant dû.</p><p>Signé le {{date_accord}}</p></div>`
  },
  {
    code: 'fisc3_conv_invest', name: "Accord de Convention d'Investissement (CI / CEPICI)", category: 'juridique_admin', price: 9000, priceMax: 32000,
    description: "Convention d'investissement conclue entre l'État ivoirien (via le CEPICI) et un investisseur, accordant des avantages fiscaux et douaniers en contrepartie d'engagements d'investissement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'investisseur',label:"Raison sociale de l'investisseur",type:'text',required:true},
      {key:'secteur_activite',label:"Secteur d'activité",type:'text',required:true},
      {key:'montant_investissement',label:"Montant de l'investissement (FCFA)",type:'text',required:true},
      {key:'avantages_accordes',label:"Avantages fiscaux et douaniers accordés",type:'textarea',required:true},
      {key:'duree_convention',label:"Durée de la convention",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION D'INVESTISSEMENT – CÔTE D'IVOIRE / CEPICI</h1><p>Entre l'État de Côte d'Ivoire, représenté par le CEPICI, et <strong>{{investisseur}}</strong>,</p><h2>Article 1 – Projet d'investissement</h2><p>Secteur : <strong>{{secteur_activite}}</strong> | Montant : <strong>{{montant_investissement}} FCFA</strong></p><h2>Article 2 – Avantages accordés</h2><p>{{avantages_accordes}}</p><h2>Article 3 – Durée</h2><p>La présente convention est conclue pour une durée de {{duree_convention}} à compter de la date de son entrée en vigueur.</p><h2>Article 4 – Engagements de l'investisseur</h2><p>L'investisseur s'engage à réaliser le programme d'investissement convenu, à créer les emplois prévus et à respecter la législation sociale et environnementale ivoirienne.</p></div>`
  },
  {
    code: 'fisc3_agrement_cdi', name: "Accord d'Agrément Code des Investissements (CI)", category: 'juridique_admin', price: 8000, priceMax: 28000,
    description: "Décision d'agrément accordée par les autorités ivoiriennes à un investisseur souhaitant bénéficier des avantages du Code des Investissements de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'entreprise_agreee',label:"Entreprise agréée",type:'text',required:true},
      {key:'regime_agree',label:"Régime d'agrément choisi",type:'text',required:true},
      {key:'programme_investissement',label:"Programme d'investissement approuvé",type:'textarea',required:true},
      {key:'avantages',label:"Avantages accordés",type:'textarea',required:true},
      {key:'date_agrement',label:"Date d'agrément",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCISION D'AGRÉMENT AU CODE DES INVESTISSEMENTS</h1><p>Le Ministère en charge de l'Économie de Côte d'Ivoire,</p><p>Vu le Code des Investissements de la République de Côte d'Ivoire,</p><h2>Article 1 – Agrément</h2><p><strong>{{entreprise_agreee}}</strong> est agréée au régime <strong>{{regime_agree}}</strong> du Code des Investissements.</p><h2>Article 2 – Programme approuvé</h2><p>{{programme_investissement}}</p><h2>Article 3 – Avantages accordés</h2><p>{{avantages}}</p><p>Fait à Abidjan, le {{date_agrement}}</p></div>`
  },
  {
    code: 'fisc3_exoneration_zf', name: "Accord d'Exonération Fiscale (Zone Franche CI)", category: 'juridique_admin', price: 8000, priceMax: 28000,
    description: "Accord d'exonération fiscale accordé aux entreprises installées en zone franche industrielle de Côte d'Ivoire, précisant la durée et la nature des exemptions.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise bénéficiaire",type:'text',required:true},
      {key:'zone_franche',label:"Zone franche concernée",type:'text',required:true},
      {key:'impots_exoneres',label:"Impôts et taxes exonérés",type:'textarea',required:true},
      {key:'duree_exoneration',label:"Durée de l'exonération",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'EXONÉRATION FISCALE EN ZONE FRANCHE</h1><p>Bénéficiaire : <strong>{{entreprise}}</strong> | Zone : <strong>{{zone_franche}}</strong></p><h2>Article 1 – Exonérations accordées</h2><p>{{impots_exoneres}}</p><h2>Article 2 – Durée</h2><p>L'exonération est accordée pour une durée de {{duree_exoneration}} à compter du {{date_effet}}.</p><h2>Article 3 – Conditions</h2><p>Le bénéfice des exonérations est conditionné au maintien de l'activité dans le périmètre de la zone franche et au respect des cahiers des charges applicables.</p><h2>Article 4 – Contrôle</h2><p>La DGI et l'autorité gestionnaire de la zone exercent un contrôle conjoint des conditions d'éligibilité aux exonérations accordées.</p></div>`
  },
  {
    code: 'fisc3_remb_credit_tva', name: "Accord de Remboursement de Crédit TVA", category: 'juridique_admin', price: 6000, priceMax: 20000,
    description: "Demande et accord de remboursement de crédit de TVA auprès de la DGI de Côte d'Ivoire, suite à l'accumulation d'un crédit structurel de TVA déductible.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale",type:'text',required:true},
      {key:'ncc',label:"NCC",type:'text',required:true},
      {key:'montant_credit_tva',label:"Montant du crédit TVA demandé (FCFA)",type:'text',required:true},
      {key:'periode_credit',label:"Période de constitution du crédit",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE REMBOURSEMENT DE CRÉDIT TVA</h1><p>Entreprise : <strong>{{entreprise}}</strong> | NCC : {{ncc}}</p><p>À Monsieur le Directeur Général des Impôts de Côte d'Ivoire</p><p>Date : {{date_demande}}</p><h2>Objet</h2><p>Remboursement du crédit de TVA de <strong>{{montant_credit_tva}} FCFA</strong> constitué sur la période {{periode_credit}}.</p><h2>Justification</h2><p>Le crédit de TVA est justifié par les déclarations mensuelles de TVA, les factures d'achats et les pièces comptables dûment archivées, disponibles pour contrôle.</p><h2>Engagement</h2><p>L'entreprise certifie l'exactitude de la demande et s'engage à restituer tout remboursement qui s'avérerait indu à l'issue d'un contrôle fiscal.</p></div>`
  },
  {
    code: 'fisc3_prix_transfert', name: "Accord d'Accord Préalable de Prix de Transfert (DGI CI)", category: 'juridique_admin', price: 10000, priceMax: 36000,
    description: "Accord préalable de prix de transfert (APA) conclu avec la DGI ivoirienne pour sécuriser les prix pratiqués entre entreprises liées et prévenir les redressements fiscaux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'groupe_multinationale',label:"Groupe / Multinationale",type:'text',required:true},
      {key:'entite_ivoirienne',label:"Entité ivoirienne concernée",type:'text',required:true},
      {key:'transactions_couvertes',label:"Transactions couvertes par l'accord",type:'textarea',required:true},
      {key:'methode_retenue',label:"Méthode de prix de transfert retenue",type:'text',required:true},
      {key:'duree_apa',label:"Durée de l'accord préalable",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD PRÉALABLE DE PRIX DE TRANSFERT (APA)</h1><p>Groupe : <strong>{{groupe_multinationale}}</strong> | Entité ivoirienne : <strong>{{entite_ivoirienne}}</strong></p><p>Conclu avec la Direction Générale des Impôts de Côte d'Ivoire</p><h2>Article 1 – Transactions couvertes</h2><p>{{transactions_couvertes}}</p><h2>Article 2 – Méthode de prix de transfert</h2><p>Méthode retenue : <strong>{{methode_retenue}}</strong>, conforme aux lignes directrices de l'OCDE sur les prix de transfert et aux dispositions du Code Général des Impôts ivoirien.</p><h2>Article 3 – Durée</h2><p>L'accord préalable est conclu pour une durée de {{duree_apa}}.</p><h2>Article 4 – Obligations de documentation</h2><p>L'entreprise s'engage à maintenir une documentation complète et actualisée de ses prix de transfert, disponible sur demande de la DGI.</p></div>`
  },
  {
    code: 'fisc3_transaction_fisc', name: "Accord de Transaction Fiscale (Contentieux DGI)", category: 'juridique_admin', price: 7000, priceMax: 24000,
    description: "Accord de transaction fiscale amiable entre un contribuable ivoirien et la DGI pour mettre fin à un contentieux fiscal par des concessions réciproques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'contribuable',label:"Nom / Raison sociale",type:'text',required:true},
      {key:'ncc',label:"NCC",type:'text',required:true},
      {key:'reference_contentieux',label:"Référence du contentieux fiscal",type:'text',required:true},
      {key:'montant_redressement_initial',label:"Montant du redressement initial (FCFA)",type:'text',required:true},
      {key:'montant_transaction',label:"Montant transactionnel arrêté (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSACTION FISCALE</h1><p>Entre la Direction Générale des Impôts de Côte d'Ivoire et <strong>{{contribuable}}</strong> (NCC : {{ncc}}),</p><p>Référence contentieux : {{reference_contentieux}}</p><h2>Article 1 – Objet</h2><p>Les parties conviennent de mettre fin au présent contentieux fiscal par voie de transaction amiable.</p><h2>Article 2 – Montants</h2><p>Redressement initial : {{montant_redressement_initial}} FCFA</p><p>Montant transactionnel arrêté par accord mutuel : <strong>{{montant_transaction}} FCFA</strong></p><h2>Article 3 – Désistement</h2><p>L'accord emporte désistement réciproque de toutes contestations relatives aux impositions visées.</p><p>Signé le {{date_accord}}</p></div>`
  },
  {
    code: 'fisc3_regularisation', name: "Accord de Régularisation de Déclaration", category: 'juridique_admin', price: 4000, priceMax: 13000,
    description: "Accord de régularisation spontanée d'une déclaration fiscale déposée avec des erreurs ou omissions, permettant au contribuable ivoirien de bénéficier d'une atténuation des pénalités.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'contribuable',label:"Nom / Raison sociale",type:'text',required:true},
      {key:'ncc',label:"NCC",type:'text',required:true},
      {key:'declaration_initiale',label:"Déclaration initiale concernée",type:'text',required:true},
      {key:'nature_erreur',label:"Nature des erreurs ou omissions",type:'textarea',required:true},
      {key:'montant_regularisation',label:"Montant à régulariser (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉGULARISATION FISCALE SPONTANÉE</h1><p>Contribuable : <strong>{{contribuable}}</strong> | NCC : {{ncc}}</p><p>Déclaration concernée : {{declaration_initiale}}</p><h2>Nature des corrections</h2><p>{{nature_erreur}}</p><h2>Montant à régulariser</h2><p>Complément d'impôt résultant de la régularisation : <strong>{{montant_regularisation}} FCFA</strong></p><h2>Atténuation des pénalités</h2><p>En vertu de la charte du contribuable de bonne foi de Côte d'Ivoire, la régularisation spontanée ouvre droit à une atténuation des pénalités et intérêts de retard applicables.</p><p>Cachet et signature du contribuable</p></div>`
  },
  {
    code: 'fisc3_mandataire_fiscal', name: "Accord de Représentation Fiscale (Mandataire Fiscal)", category: 'juridique_admin', price: 5000, priceMax: 16000,
    description: "Mandat de représentation fiscale désignant un mandataire habilité à représenter le contribuable devant la DGI de Côte d'Ivoire pour l'accomplissement de ses obligations fiscales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'mandant',label:"Contribuable mandant",type:'text',required:true},
      {key:'mandataire',label:"Mandataire fiscal (nom et qualité)",type:'text',required:true},
      {key:'etendue_mandat',label:"Étendue du mandat (obligations couvertes)",type:'textarea',required:true},
      {key:'duree_mandat',label:"Durée du mandat",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>MANDAT DE REPRÉSENTATION FISCALE</h1><p>Je soussigné(e) <strong>{{mandant}}</strong>, contribuable enregistré à la DGI de Côte d'Ivoire,</p><p>Donne mandat à <strong>{{mandataire}}</strong> pour me représenter auprès de la Direction Générale des Impôts de Côte d'Ivoire.</p><h2>Étendue du mandat</h2><p>{{etendue_mandat}}</p><h2>Durée</h2><p>Le présent mandat est valable pour une durée de {{duree_mandat}} à compter du {{date_signature}}, révocable à tout moment par lettre recommandée.</p><p>Fait à Abidjan, le {{date_signature}}</p><p>Signature du mandant et du mandataire</p></div>`
  },
  {
    code: 'fisc3_rapport_veille', name: "Rapport de Veille Fiscale CI", category: 'juridique_admin', price: 6000, priceMax: 20000,
    description: "Rapport périodique de veille fiscale analysant les évolutions législatives et réglementaires en matière fiscale en Côte d'Ivoire et leur impact sur les entreprises.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'cabinet_auteur',label:"Cabinet / Auteur du rapport",type:'text',required:true},
      {key:'periode_veille',label:"Période couverte par la veille",type:'text',required:true},
      {key:'evolutions_majeures',label:"Évolutions fiscales majeures",type:'textarea',required:true},
      {key:'impacts_entreprises',label:"Impacts sur les entreprises",type:'textarea',required:true},
      {key:'date_publication',label:"Date de publication",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE VEILLE FISCALE – CÔTE D'IVOIRE</h1><p>Auteur : <strong>{{cabinet_auteur}}</strong> | Période : {{periode_veille}} | Publication : {{date_publication}}</p><h2>1. Évolutions législatives et réglementaires</h2><p>{{evolutions_majeures}}</p><h2>2. Impacts sur les entreprises</h2><p>{{impacts_entreprises}}</p><h2>3. Recommandations</h2><p>Les recommandations pratiques pour adapter la gestion fiscale des entreprises aux nouvelles dispositions sont détaillées dans la partie conseil du présent rapport.</p><h2>4. Calendrier fiscal actualisé</h2><p>Le calendrier des obligations déclaratives et de paiement mis à jour est annexé au présent rapport de veille.</p></div>`
  },
  {
    code: 'fisc3_plan_gestion_fisc', name: "Plan de Gestion Fiscale Annuelle", category: 'juridique_admin', price: 6000, priceMax: 20000,
    description: "Document de planification fiscale annuelle pour une entreprise ivoirienne, identifiant les obligations déclaratives, les optimisations légales et les risques fiscaux à gérer.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'entreprise',label:"Raison sociale de l'entreprise",type:'text',required:true},
      {key:'exercice_fiscal',label:"Exercice fiscal",type:'text',required:true},
      {key:'obligations_annuelles',label:"Tableau des obligations fiscales annuelles",type:'textarea',required:true},
      {key:'optimisations_prevues',label:"Optimisations fiscales légales envisagées",type:'textarea',required:true},
      {key:'responsable_fiscal',label:"Responsable fiscal de l'entreprise",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE GESTION FISCALE ANNUELLE</h1><p>Entreprise : <strong>{{entreprise}}</strong> | Exercice : <strong>{{exercice_fiscal}}</strong></p><p>Responsable fiscal : {{responsable_fiscal}}</p><h2>1. Calendrier des obligations fiscales</h2><p>{{obligations_annuelles}}</p><h2>2. Stratégie d'optimisation fiscale</h2><p>{{optimisations_prevues}}</p><h2>3. Gestion des risques fiscaux</h2><p>Les risques fiscaux identifiés (redressements potentiels, contrôles en cours, provisions à constituer) sont analysés et quantifiés dans la matrice des risques annexée.</p><h2>4. Budget fiscal prévisionnel</h2><p>Le budget prévisionnel des charges fiscales pour l'exercice est établi en annexe financière.</p></div>`
  },
  {
    code: 'fisc3_charte_contribuable', name: "Charte du Contribuable de Bonne Foi en Côte d'Ivoire", category: 'juridique_admin', price: 4000, priceMax: 12000,
    description: "Document reprenant les droits et obligations du contribuable ivoirien de bonne foi, conformément à la charte officielle de la DGI Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'contribuable',label:"Nom / Raison sociale",type:'text',required:true},
      {key:'ncc',label:"NCC",type:'text',required:false},
      {key:'centre_impots',label:"Centre des Impôts compétent",type:'text',required:true},
      {key:'date_remise',label:"Date de remise de la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DU CONTRIBUABLE DE BONNE FOI – CÔTE D'IVOIRE</h1><p>Contribuable : <strong>{{contribuable}}</strong> | NCC : {{ncc}}</p><p>Centre des Impôts : {{centre_impots}} | Date de remise : {{date_remise}}</p><h2>Vos droits</h2><p>En tant que contribuable de bonne foi, vous bénéficiez du droit à l'information fiscale, du droit au rescrit, du droit à être entendu avant tout redressement fiscal, et du droit à une atténuation des pénalités en cas de régularisation spontanée.</p><h2>Vos obligations</h2><p>Vous êtes tenu de déposer vos déclarations dans les délais légaux, de payer vos impôts et taxes aux échéances prévues, et de conserver vos pièces justificatives pendant les délais de prescription fiscale.</p><h2>Votre interlocuteur</h2><p>Votre correspondant fiscal au Centre des Impôts de {{centre_impots}} est à votre disposition pour toute question relative à vos obligations fiscales en Côte d'Ivoire.</p></div>`
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
  console.log(`Batch 94b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
