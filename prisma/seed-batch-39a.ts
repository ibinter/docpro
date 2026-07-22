import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  {
    code: 'pharma_gerance',
    name: "Contrat de Gerance de Pharmacie",
    category: 'sante',
    price: 8000,
    priceMax: 24000,
    description: "Contrat reglementant la gerance d'une officine de pharmacie par un pharmacien titulaire en Cote d'Ivoire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 71,
    fieldsJson: F([
      {key:'nom_gerant',label:"Nom du pharmacien gerant",type:'text',required:true},
      {key:'nom_officine',label:"Denomination de l'officine",type:'text',required:true},
      {key:'adresse_officine',label:"Adresse de l'officine",type:'text',required:true},
      {key:'date_debut',label:"Date de debut de gerance",type:'date',required:true},
      {key:'conditions_gerance',label:"Conditions et modalites de gerance",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GERANCE DE PHARMACIE</h1><p>Entre les soussignes, il est convenu ce qui suit :</p><h2>Article 1 - Pharmacien Gerant</h2><p>Nom : {{nom_gerant}}</p><h2>Article 2 - Officine concernee</h2><p>Denomination : {{nom_officine}}</p><p>Adresse : {{adresse_officine}}</p><h2>Article 3 - Prise d"effet</h2><p>Date de debut : {{date_debut}}</p><h2>Article 4 - Conditions de gerance</h2><p>{{conditions_gerance}}</p><h2>Article 5 - Obligations reglementaires</h2><p>Le gerant s"engage a respecter les dispositions du Code de la Sante Publique et les bonnes pratiques pharmaceutiques en vigueur en Cote d"Ivoire.</p></div>`
  },
  {
    code: 'pharma_amm',
    name: "Autorisation de Mise sur le Marche - Dossier Modele AMM",
    category: 'sante',
    price: 12000,
    priceMax: 36000,
    description: "Dossier modele pour la demande d'autorisation de mise sur le marche d'un medicament aupres des autorites sanitaires.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'nom_medicament',label:"Denomination du medicament",type:'text',required:true},
      {key:'fabricant',label:"Nom du fabricant",type:'text',required:true},
      {key:'forme_pharmaceutique',label:"Forme pharmaceutique et dosage",type:'text',required:true},
      {key:'indication_therapeutique',label:"Indications therapeutiques",type:'textarea',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DOSSIER DE DEMANDE D"AUTORISATION DE MISE SUR LE MARCHE (AMM)</h1><h2>Section 1 - Identification du medicament</h2><p>Denomination : {{nom_medicament}}</p><p>Forme pharmaceutique : {{forme_pharmaceutique}}</p><h2>Section 2 - Titulaire de l"AMM</h2><p>Fabricant : {{fabricant}}</p><h2>Section 3 - Indications therapeutiques</h2><p>{{indication_therapeutique}}</p><h2>Section 4 - Date de demande</h2><p>{{date_demande}}</p><h2>Section 5 - Declaration</h2><p>Le demandeur certifie l"exactitude des informations fournies et s"engage a respecter les exigences reglementaires de l"autorite sanitaire competente.</p></div>`
  },
  {
    code: 'pharma_fournisseur',
    name: "Contrat de Fournisseur Pharmaceutique",
    category: 'sante',
    price: 7000,
    priceMax: 21000,
    description: "Contrat encadrant la relation commerciale entre un fournisseur de produits pharmaceutiques et un acheteur officine ou hopital.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'nom_fournisseur',label:"Nom du fournisseur",type:'text',required:true},
      {key:'nom_acheteur',label:"Nom de l'acheteur",type:'text',required:true},
      {key:'produits_concernes',label:"Liste des produits pharmaceutiques",type:'textarea',required:true},
      {key:'conditions_livraison',label:"Conditions de livraison et delais",type:'textarea',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FOURNISSEUR PHARMACEUTIQUE</h1><h2>Article 1 - Parties</h2><p>Fournisseur : {{nom_fournisseur}}</p><p>Acheteur : {{nom_acheteur}}</p><h2>Article 2 - Produits concernes</h2><p>{{produits_concernes}}</p><h2>Article 3 - Conditions de livraison</h2><p>{{conditions_livraison}}</p><h2>Article 4 - Date d"effet</h2><p>{{date_contrat}}</p><h2>Article 5 - Garanties qualite</h2><p>Le fournisseur garantit que tous les produits livres sont conformes aux normes pharmaceutiques en vigueur et disposent des autorisations requises.</p></div>`
  },
  {
    code: 'pharma_distribution',
    name: "Accord de Distribution de Medicaments",
    category: 'sante',
    price: 9000,
    priceMax: 27000,
    description: "Accord encadrant la distribution de medicaments entre un laboratoire pharmaceutique et un distributeur agree.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'laboratoire',label:"Nom du laboratoire pharmaceutique",type:'text',required:true},
      {key:'distributeur',label:"Nom du distributeur",type:'text',required:true},
      {key:'zone_distribution',label:"Zone geographique de distribution",type:'text',required:true},
      {key:'conditions_commerciales',label:"Conditions commerciales et remises",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DISTRIBUTION DE MEDICAMENTS</h1><h2>Article 1 - Parties contractantes</h2><p>Laboratoire : {{laboratoire}}</p><p>Distributeur : {{distributeur}}</p><h2>Article 2 - Territoire de distribution</h2><p>Zone : {{zone_distribution}}</p><h2>Article 3 - Conditions commerciales</h2><p>{{conditions_commerciales}}</p><h2>Article 4 - Date d"entree en vigueur</h2><p>{{date_accord}}</p><h2>Article 5 - Obligations du distributeur</h2><p>Le distributeur s"engage a respecter les bonnes pratiques de distribution (BPD) et les exigences de conservation des medicaments.</p></div>`
  },
  {
    code: 'pharma_grossiste',
    name: "Contrat de Grossiste Repartiteur Pharmaceutique",
    category: 'sante',
    price: 10000,
    priceMax: 30000,
    description: "Contrat definissant les obligations d'un grossiste-repartiteur pharmaceutique vis-a-vis de ses clients officinaux.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'grossiste',label:"Denomination du grossiste-repartiteur",type:'text',required:true},
      {key:'officine_cliente',label:"Nom de l'officine cliente",type:'text',required:true},
      {key:'gamme_produits',label:"Gamme de produits distribues",type:'textarea',required:true},
      {key:'frequence_livraison',label:"Frequence et modalites de livraison",type:'text',required:true},
      {key:'date_contrat',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GROSSISTE REPARTITEUR PHARMACEUTIQUE</h1><h2>Preambule</h2><p>Ce contrat est conclu entre un grossiste-repartiteur agree et une officine cliente dans le cadre de la distribution pharmaceutique en gros.</p><h2>Article 1 - Identification des parties</h2><p>Grossiste-repartiteur : {{grossiste}}</p><p>Officine cliente : {{officine_cliente}}</p><h2>Article 2 - Gamme de produits</h2><p>{{gamme_produits}}</p><h2>Article 3 - Modalites de livraison</h2><p>{{frequence_livraison}}</p><h2>Article 4 - Date d"effet</h2><p>{{date_contrat}}</p></div>`
  },
  {
    code: 'pharma_pharmacovigilance',
    name: "Accord de Service de Pharmacovigilance",
    category: 'sante',
    price: 11000,
    priceMax: 33000,
    description: "Accord de service pour la surveillance et le signalement des effets indesirables des medicaments.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'titulaire_amm',label:"Titulaire de l'AMM",type:'text',required:true},
      {key:'prestataire_pv',label:"Prestataire de pharmacovigilance",type:'text',required:true},
      {key:'perimetre_surveillance',label:"Perimetre de surveillance des produits",type:'textarea',required:true},
      {key:'procedures_signalement',label:"Procedures de signalement des effets indesirables",type:'textarea',required:true},
      {key:'date_accord',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHARMACOVIGILANCE</h1><h2>Article 1 - Parties</h2><p>Titulaire AMM : {{titulaire_amm}}</p><p>Prestataire PV : {{prestataire_pv}}</p><h2>Article 2 - Perimetre de surveillance</h2><p>{{perimetre_surveillance}}</p><h2>Article 3 - Procedures de signalement</h2><p>{{procedures_signalement}}</p><h2>Article 4 - Date d"effet</h2><p>{{date_accord}}</p><h2>Article 5 - Conformite reglementaire</h2><p>Le prestataire s"engage a respecter les directives de l"OMS et les reglementations nationales en matiere de pharmacovigilance.</p></div>`
  },
  {
    code: 'pharma_bpf_qualite',
    name: "Plan de Controle Qualite Medicaments (BPF)",
    category: 'sante',
    price: 13000,
    priceMax: 39000,
    description: "Plan de controle qualite base sur les Bonnes Pratiques de Fabrication pour les etablissements pharmaceutiques.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'etablissement',label:"Nom de l'etablissement pharmaceutique",type:'text',required:true},
      {key:'responsable_qualite',label:"Responsable assurance qualite",type:'text',required:true},
      {key:'produits_fabriques',label:"Liste des produits fabriques",type:'textarea',required:true},
      {key:'procedures_controle',label:"Procedures de controle qualite",type:'textarea',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CONTROLE QUALITE MEDICAMENTS - BPF</h1><h2>1. Identification de l"etablissement</h2><p>Etablissement : {{etablissement}}</p><p>Responsable qualite : {{responsable_qualite}}</p><h2>2. Produits concernes</h2><p>{{produits_fabriques}}</p><h2>3. Procedures de controle</h2><p>{{procedures_controle}}</p><h2>4. Date d"application</h2><p>{{date_plan}}</p><h2>5. Engagement BPF</h2><p>L"etablissement s"engage a respecter les Bonnes Pratiques de Fabrication selon les normes OMS et les exigences de l"autorite sanitaire nationale.</p></div>`
  },
  {
    code: 'pharma_inspection',
    name: "Rapport d'Inspection Pharmaceutique",
    category: 'sante',
    price: 6000,
    priceMax: 18000,
    description: "Rapport officiel d'inspection d'un etablissement pharmaceutique par les autorites de controle sanitaire.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'etablissement_inspecte',label:"Etablissement inspecte",type:'text',required:true},
      {key:'inspecteur',label:"Nom de l'inspecteur",type:'text',required:true},
      {key:'date_inspection',label:"Date de l'inspection",type:'date',required:true},
      {key:'constats',label:"Constats et observations",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations et actions correctives",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D"INSPECTION PHARMACEUTIQUE</h1><h2>Informations generales</h2><p>Etablissement inspecte : {{etablissement_inspecte}}</p><p>Inspecteur : {{inspecteur}}</p><p>Date d"inspection : {{date_inspection}}</p><h2>Constats</h2><p>{{constats}}</p><h2>Recommandations</h2><p>{{recommandations}}</p><h2>Conclusion</h2><p>Ce rapport est etabli par l"autorite de controle pharmaceutique competente et vaut document officiel d"inspection.</p></div>`
  },
  {
    code: 'pharma_hospitaliere',
    name: "Accord de Service de Pharmacie Hospitaliere",
    category: 'sante',
    price: 10000,
    priceMax: 30000,
    description: "Accord de service entre un etablissement hospitalier et son service de pharmacie interne ou externe.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 59,
    fieldsJson: F([
      {key:'hopital',label:"Nom de l'hopital ou clinique",type:'text',required:true},
      {key:'pharmacien_chef',label:"Pharmacien chef de service",type:'text',required:true},
      {key:'prestations_pharmacie',label:"Prestations de la pharmacie hospitaliere",type:'textarea',required:true},
      {key:'budget_annuel',label:"Budget annuel alloue",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHARMACIE HOSPITALIERE</h1><h2>Article 1 - Etablissement</h2><p>Hopital / Clinique : {{hopital}}</p><p>Pharmacien chef : {{pharmacien_chef}}</p><h2>Article 2 - Prestations assurées</h2><p>{{prestations_pharmacie}}</p><h2>Article 3 - Moyens financiers</h2><p>Budget annuel : {{budget_annuel}}</p><h2>Article 4 - Date d"effet</h2><p>{{date_accord}}</p><h2>Article 5 - Mission de sante publique</h2><p>La pharmacie hospitaliere assure la securisation du circuit du medicament au sein de l"etablissement de sante.</p></div>`
  },
  {
    code: 'pharma_clinique',
    name: "Contrat de Service de Pharmacie Clinique",
    category: 'sante',
    price: 9000,
    priceMax: 27000,
    description: "Contrat de prestations de pharmacie clinique incluant la revue des ordonnances et le suivi therapeutique.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 56,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de pharmacie clinique",type:'text',required:true},
      {key:'client_medical',label:"Etablissement medical client",type:'text',required:true},
      {key:'services_offerts',label:"Services de pharmacie clinique offerts",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires et modalites de remuneration",type:'text',required:true},
      {key:'date_debut',label:"Date de debut de la prestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE PHARMACIE CLINIQUE</h1><h2>Article 1 - Parties</h2><p>Prestataire : {{prestataire}}</p><p>Client medical : {{client_medical}}</p><h2>Article 2 - Services de pharmacie clinique</h2><p>{{services_offerts}}</p><h2>Article 3 - Remuneration</h2><p>{{honoraires}}</p><h2>Article 4 - Prise d"effet</h2><p>{{date_debut}}</p><h2>Article 5 - Confidentialite</h2><p>Le prestataire s"engage a respecter le secret medical et la confidentialite des donnees de sante des patients.</p></div>`
  },
  {
    code: 'pharma_formation_conseil',
    name: "Accord de Formation Pharmacien Conseil",
    category: 'sante',
    price: 5000,
    priceMax: 15000,
    description: "Accord de formation continue pour les pharmaciens conseillers dans les officines et etablissements de sante.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 54,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'pharmacien_stagiaire',label:"Nom du pharmacien beneficiaire",type:'text',required:true},
      {key:'programme_formation',label:"Programme et contenu de la formation",type:'textarea',required:true},
      {key:'duree_formation',label:"Duree et calendrier de la formation",type:'text',required:true},
      {key:'date_debut',label:"Date de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION PHARMACIEN CONSEIL</h1><h2>Article 1 - Parties</h2><p>Organisme de formation : {{organisme_formation}}</p><p>Beneficiaire : {{pharmacien_stagiaire}}</p><h2>Article 2 - Programme de formation</h2><p>{{programme_formation}}</p><h2>Article 3 - Duree</h2><p>{{duree_formation}}</p><h2>Article 4 - Date de debut</h2><p>{{date_debut}}</p><h2>Article 5 - Certification</h2><p>A l"issue de la formation, une attestation de participation sera delivree au beneficiaire par l"organisme de formation agree.</p></div>`
  },
  {
    code: 'pharma_dispensation',
    name: "Contrat de Service de Dispensation Specialisee",
    category: 'sante',
    price: 8000,
    priceMax: 24000,
    description: "Contrat pour la dispensation specialisee de medicaments a prescription obligatoire et traitements chroniques.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      {key:'pharmacie_dispensatrice',label:"Pharmacie dispensatrice",type:'text',required:true},
      {key:'etablissement_prescripteur',label:"Etablissement prescripteur",type:'text',required:true},
      {key:'categories_medicaments',label:"Categories de medicaments concernes",type:'textarea',required:true},
      {key:'protocole_dispensation',label:"Protocole de dispensation",type:'textarea',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE DISPENSATION SPECIALISEE</h1><h2>Article 1 - Parties</h2><p>Pharmacie : {{pharmacie_dispensatrice}}</p><p>Etablissement prescripteur : {{etablissement_prescripteur}}</p><h2>Article 2 - Medicaments concernes</h2><p>{{categories_medicaments}}</p><h2>Article 3 - Protocole de dispensation</h2><p>{{protocole_dispensation}}</p><h2>Article 4 - Date d"effet</h2><p>{{date_contrat}}</p></div>`
  },
  {
    code: 'pharma_essai_clinique',
    name: "Accord de Service d'Essai Clinique",
    category: 'sante',
    price: 15000,
    priceMax: 45000,
    description: "Accord encadrant la realisation d'essais cliniques de medicaments dans le respect des normes ethiques et reglementaires.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 52,
    fieldsJson: F([
      {key:'promoteur',label:"Promoteur de l'essai clinique",type:'text',required:true},
      {key:'investigateur',label:"Investigateur principal",type:'text',required:true},
      {key:'titre_essai',label:"Titre et objet de l'essai clinique",type:'textarea',required:true},
      {key:'site_essai',label:"Site(s) de realisation de l'essai",type:'text',required:true},
      {key:'date_debut_essai',label:"Date previsionnelle de debut",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D"ESSAI CLINIQUE</h1><h2>Article 1 - Parties</h2><p>Promoteur : {{promoteur}}</p><p>Investigateur principal : {{investigateur}}</p><h2>Article 2 - Objet de l"essai</h2><p>{{titre_essai}}</p><h2>Article 3 - Site de realisation</h2><p>{{site_essai}}</p><h2>Article 4 - Planning</h2><p>Date de debut : {{date_debut_essai}}</p><h2>Article 5 - Conformite ethique</h2><p>Cet essai clinique est conduit conformement aux principes de la Declaration d"Helsinki et aux reglementations nationales applicables.</p></div>`
  },
  {
    code: 'pharma_recherche',
    name: "Contrat de Service de Recherche Pharmaceutique",
    category: 'sante',
    price: 14000,
    priceMax: 42000,
    description: "Contrat de prestation de recherche et developpement pharmaceutique entre un laboratoire et un CRO.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 50,
    fieldsJson: F([
      {key:'laboratoire_commanditaire',label:"Laboratoire commanditaire",type:'text',required:true},
      {key:'cro',label:"Organisme de recherche sous contrat (CRO)",type:'text',required:true},
      {key:'programme_rd',label:"Programme de R&D pharmaceutique",type:'textarea',required:true},
      {key:'budget_rd',label:"Budget de recherche alloue",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE RECHERCHE PHARMACEUTIQUE</h1><h2>Article 1 - Parties</h2><p>Laboratoire commanditaire : {{laboratoire_commanditaire}}</p><p>CRO : {{cro}}</p><h2>Article 2 - Programme de recherche</h2><p>{{programme_rd}}</p><h2>Article 3 - Budget</h2><p>{{budget_rd}}</p><h2>Article 4 - Date d"entree en vigueur</h2><p>{{date_contrat}}</p><h2>Article 5 - Propriete intellectuelle</h2><p>Les resultats de la recherche et les inventions en decoulant seront la propriete exclusive du laboratoire commanditaire sauf disposition contraire.</p></div>`
  },
  {
    code: 'pharma_licence_fabrication',
    name: "Accord de Licence de Fabrication de Medicaments",
    category: 'sante',
    price: 16000,
    priceMax: 48000,
    description: "Accord de licence autorisant un fabricant a produire des medicaments sous la marque d'un titulaire de brevet.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 48,
    fieldsJson: F([
      {key:'donneur_licence',label:"Donneur de licence",type:'text',required:true},
      {key:'licencie',label:"Licencie (fabricant)",type:'text',required:true},
      {key:'produits_licencies',label:"Produits pharmaceutiques sous licence",type:'textarea',required:true},
      {key:'territoire',label:"Territoire de fabrication et commercialisation",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE DE FABRICATION DE MEDICAMENTS</h1><h2>Article 1 - Parties</h2><p>Donneur de licence : {{donneur_licence}}</p><p>Licencie : {{licencie}}</p><h2>Article 2 - Produits sous licence</h2><p>{{produits_licencies}}</p><h2>Article 3 - Territoire</h2><p>{{territoire}}</p><h2>Article 4 - Date d"effet</h2><p>{{date_accord}}</p><h2>Article 5 - Redevances et conditions financieres</h2><p>Les conditions financieres et redevances sont definies dans l"annexe confidentielle jointe au present accord de licence.</p></div>`
  },
  {
    code: 'pharma_medecine_trad',
    name: "Contrat de Service de Medecine Traditionnelle Reconnue",
    category: 'sante',
    price: 5000,
    priceMax: 15000,
    description: "Contrat de service pour la pratique encadree de la medecine traditionnelle africaine reconnue par les autorites sanitaires.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'tradipraticien',label:"Nom du tradipraticien agree",type:'text',required:true},
      {key:'structure_sante',label:"Structure de sante partenaire",type:'text',required:true},
      {key:'pathologies_traitees',label:"Pathologies et affections traitees",type:'textarea',required:true},
      {key:'remedes_utilises',label:"Remedes et plantes medicinales utilises",type:'textarea',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE MEDECINE TRADITIONNELLE RECONNUE</h1><h2>Article 1 - Parties</h2><p>Tradipraticien agree : {{tradipraticien}}</p><p>Structure partenaire : {{structure_sante}}</p><h2>Article 2 - Pathologies traitees</h2><p>{{pathologies_traitees}}</p><h2>Article 3 - Remedes utilises</h2><p>{{remedes_utilises}}</p><h2>Article 4 - Date d"effet</h2><p>{{date_contrat}}</p><h2>Article 5 - Cadre reglementaire</h2><p>La pratique est exercee conformement a la politique nationale de valorisation de la medecine traditionnelle reconnue par le Ministere de la Sante.</p></div>`
  },
  {
    code: 'pharma_complements',
    name: "Accord de Service de Complements Alimentaires Certifies",
    category: 'sante',
    price: 6000,
    priceMax: 18000,
    description: "Accord encadrant la distribution et la commercialisation de complements alimentaires certifies conformes aux normes sanitaires.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 57,
    fieldsJson: F([
      {key:'fabricant_ca',label:"Fabricant des complements alimentaires",type:'text',required:true},
      {key:'distributeur_ca',label:"Distributeur agree",type:'text',required:true},
      {key:'produits_ca',label:"Liste des complements alimentaires",type:'textarea',required:true},
      {key:'certifications',label:"Certifications et agréments obtenus",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPLEMENTS ALIMENTAIRES CERTIFIES</h1><h2>Article 1 - Parties</h2><p>Fabricant : {{fabricant_ca}}</p><p>Distributeur : {{distributeur_ca}}</p><h2>Article 2 - Produits</h2><p>{{produits_ca}}</p><h2>Article 3 - Certifications</h2><p>{{certifications}}</p><h2>Article 4 - Date d"effet</h2><p>{{date_accord}}</p><h2>Article 5 - Conformite</h2><p>Tous les complements alimentaires sont conformes aux normes du Codex Alimentarius et aux reglementations sanitaires nationales en vigueur.</p></div>`
  },
  {
    code: 'pharma_conformite_communautaire',
    name: "Rapport de Conformite Pharmacie Communautaire",
    category: 'sante',
    price: 4000,
    priceMax: 12000,
    description: "Rapport de conformite reglementaire d'une pharmacie communautaire ou officinale en milieu urbain ou rural.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 64,
    fieldsJson: F([
      {key:'pharmacie',label:"Nom de la pharmacie communautaire",type:'text',required:true},
      {key:'pharmacien_titulaire',label:"Pharmacien titulaire",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'points_conformite',label:"Points de conformite verifies",type:'textarea',required:true},
      {key:'ecarts_observes',label:"Ecarts observes et mesures correctives",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONFORMITE PHARMACIE COMMUNAUTAIRE</h1><h2>Identification</h2><p>Pharmacie : {{pharmacie}}</p><p>Pharmacien titulaire : {{pharmacien_titulaire}}</p><p>Date : {{date_rapport}}</p><h2>Points de conformite</h2><p>{{points_conformite}}</p><h2>Ecarts et mesures correctives</h2><p>{{ecarts_observes}}</p><h2>Conclusion</h2><p>Ce rapport certifie l"etat de conformite de la pharmacie vis-a-vis des exigences reglementaires applicables aux officines en Cote d"Ivoire.</p></div>`
  },
  {
    code: 'pharma_chaine_froid',
    name: "Accord de Chaine du Froid pour Medicaments",
    category: 'sante',
    price: 9000,
    priceMax: 27000,
    description: "Accord technique et commercial pour le maintien de la chaine du froid lors du transport et stockage de medicaments thermosensibles.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 61,
    fieldsJson: F([
      {key:'fournisseur_logistique',label:"Prestataire logistique froid",type:'text',required:true},
      {key:'client_pharmaceutique',label:"Client pharmaceutique",type:'text',required:true},
      {key:'produits_thermosensibles',label:"Medicaments thermosensibles concernes",type:'textarea',required:true},
      {key:'conditions_temperature',label:"Conditions de temperature requises",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CHAINE DU FROID POUR MEDICAMENTS</h1><h2>Article 1 - Parties</h2><p>Prestataire logistique : {{fournisseur_logistique}}</p><p>Client pharmaceutique : {{client_pharmaceutique}}</p><h2>Article 2 - Produits thermosensibles</h2><p>{{produits_thermosensibles}}</p><h2>Article 3 - Conditions de temperature</h2><p>{{conditions_temperature}}</p><h2>Article 4 - Date d"effet</h2><p>{{date_accord}}</p><h2>Article 5 - Responsabilite</h2><p>Le prestataire est responsable du maintien de la chaine du froid depuis la prise en charge jusqu"a la livraison au destinataire.</p></div>`
  },
  {
    code: 'pharma_destruction_perimes',
    name: "Contrat de Destruction de Medicaments Perimes",
    category: 'sante',
    price: 7000,
    priceMax: 21000,
    description: "Contrat pour la collecte, le transport et la destruction securisee de medicaments perimes ou non conformes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 59,
    fieldsJson: F([
      {key:'detenteur_dechets',label:"Detenteur des medicaments perimes",type:'text',required:true},
      {key:'prestataire_destruction',label:"Prestataire de destruction agree",type:'text',required:true},
      {key:'quantite_medicaments',label:"Quantite et nature des medicaments a detruire",type:'textarea',required:true},
      {key:'methode_destruction',label:"Methode de destruction utilisee",type:'text',required:true},
      {key:'date_operation',label:"Date prevue de l'operation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DESTRUCTION DE MEDICAMENTS PERIMES</h1><h2>Article 1 - Parties</h2><p>Detenteur : {{detenteur_dechets}}</p><p>Prestataire agree : {{prestataire_destruction}}</p><h2>Article 2 - Medicaments a detruire</h2><p>{{quantite_medicaments}}</p><h2>Article 3 - Methode de destruction</h2><p>{{methode_destruction}}</p><h2>Article 4 - Date de l"operation</h2><p>{{date_operation}}</p><h2>Article 5 - Conformite environnementale</h2><p>La destruction sera effectuee dans le respect des normes environnementales et des reglementations sur les dechets pharmaceutiques.</p></div>`
  },
  {
    code: 'pharma_partenariat_assurance',
    name: "Convention de Partenariat Pharmacie-Assurance",
    category: 'sante',
    price: 10000,
    priceMax: 30000,
    description: "Convention de partenariat entre une pharmacie officinale et une compagnie d'assurance pour la prise en charge directe des assures.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'pharmacie_partenaire',label:"Pharmacie partenaire",type:'text',required:true},
      {key:'assureur',label:"Compagnie d'assurance",type:'text',required:true},
      {key:'modalites_prise_charge',label:"Modalites de prise en charge directe",type:'textarea',required:true},
      {key:'taux_remboursement',label:"Taux et conditions de remboursement",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE PARTENARIAT PHARMACIE-ASSURANCE</h1><h2>Article 1 - Parties</h2><p>Pharmacie : {{pharmacie_partenaire}}</p><p>Assureur : {{assureur}}</p><h2>Article 2 - Prise en charge directe</h2><p>{{modalites_prise_charge}}</p><h2>Article 3 - Conditions de remboursement</h2><p>{{taux_remboursement}}</p><h2>Article 4 - Date d"effet</h2><p>{{date_convention}}</p><h2>Article 5 - Litiges</h2><p>Tout differend sera soumis a la commission paritaire pharmacie-assurance avant tout recours judiciaire.</p></div>`
  },
  {
    code: 'pharma_audit',
    name: "Rapport d'Audit Pharmacie",
    category: 'sante',
    price: 8000,
    priceMax: 24000,
    description: "Rapport d'audit complet d'une officine ou d'un etablissement pharmaceutique couvrant la conformite, la gestion et la qualite.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'pharmacie_auditee',label:"Pharmacie ou etablissement audite",type:'text',required:true},
      {key:'auditeur',label:"Nom de l'auditeur ou cabinet d'audit",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
      {key:'domaines_audites',label:"Domaines audites (qualite, gestion, conformite...)",type:'textarea',required:true},
      {key:'conclusions_audit',label:"Conclusions et recommandations",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D"AUDIT PHARMACIE</h1><h2>Informations generales</h2><p>Etablissement audite : {{pharmacie_auditee}}</p><p>Auditeur : {{auditeur}}</p><p>Date d"audit : {{date_audit}}</p><h2>Domaines audites</h2><p>{{domaines_audites}}</p><h2>Conclusions et recommandations</h2><p>{{conclusions_audit}}</p><h2>Certification</h2><p>Ce rapport d"audit est emis a l"issue d"une mission d"evaluation independante conduite selon les standards professionnels en vigueur.</p></div>`
  },
  {
    code: 'pharma_mobile_rurale',
    name: "Accord de Service de Pharmacie Mobile Rurale",
    category: 'sante',
    price: 6000,
    priceMax: 18000,
    description: "Accord pour la mise en place d'un service de pharmacie mobile desservant les zones rurales eloignees.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'operateur_pharmacie_mobile',label:"Operateur du service de pharmacie mobile",type:'text',required:true},
      {key:'zone_couverte',label:"Zone geographique couverte",type:'text',required:true},
      {key:'frequence_passage',label:"Frequence et calendrier des passages",type:'text',required:true},
      {key:'medicaments_essentiels',label:"Liste des medicaments essentiels proposes",type:'textarea',required:true},
      {key:'date_debut',label:"Date de debut du service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PHARMACIE MOBILE RURALE</h1><h2>Article 1 - Operateur</h2><p>{{operateur_pharmacie_mobile}}</p><h2>Article 2 - Zone couverte</h2><p>{{zone_couverte}}</p><h2>Article 3 - Planning des passages</h2><p>{{frequence_passage}}</p><h2>Article 4 - Medicaments proposes</h2><p>{{medicaments_essentiels}}</p><h2>Article 5 - Date de debut</h2><p>{{date_debut}}</p><h2>Article 6 - Mission de sante publique</h2><p>Ce service contribue a l"amelioration de l"acces aux medicaments essentiels dans les zones a faible couverture sanitaire.</p></div>`
  },
  {
    code: 'pharma_telepharmacie',
    name: "Contrat de Service de Telepharmacie",
    category: 'sante',
    price: 9000,
    priceMax: 27000,
    description: "Contrat pour la fourniture de services pharmaceutiques a distance via des outils de telesante.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 53,
    fieldsJson: F([
      {key:'pharmacie_pivot',label:"Pharmacie pivot assurant la telepharmacie",type:'text',required:true},
      {key:'site_distant',label:"Site distant beneficiaire",type:'text',required:true},
      {key:'services_telepharmacie',label:"Services de telepharmacie fournis",type:'textarea',required:true},
      {key:'plateforme_technique',label:"Plateforme et outils techniques utilises",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE TELEPHARMACIE</h1><h2>Article 1 - Parties</h2><p>Pharmacie pivot : {{pharmacie_pivot}}</p><p>Site distant : {{site_distant}}</p><h2>Article 2 - Services fournis</h2><p>{{services_telepharmacie}}</p><h2>Article 3 - Outils techniques</h2><p>{{plateforme_technique}}</p><h2>Article 4 - Date d"effet</h2><p>{{date_contrat}}</p><h2>Article 5 - Securite des donnees</h2><p>Les donnees de sante echangees dans le cadre de ce service sont protegees conformement aux reglementations sur la protection des donnees personnelles de sante.</p></div>`
  },
  {
    code: 'pharma_charte_bon_usage',
    name: "Charte de Bon Usage du Medicament",
    category: 'sante',
    price: 3000,
    priceMax: 9000,
    description: "Charte engageant les professionnels de sante et les patients au bon usage des medicaments dans un etablissement ou une communaute.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'etablissement_ou_communaute',label:"Etablissement ou communaute concerne",type:'text',required:true},
      {key:'responsable_charte',label:"Responsable de la mise en oeuvre",type:'text',required:true},
      {key:'engagements_professionnels',label:"Engagements des professionnels de sante",type:'textarea',required:true},
      {key:'engagements_patients',label:"Engagements des patients et familles",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE BON USAGE DU MEDICAMENT</h1><h2>Preambule</h2><p>La presente charte vise a promouvoir l"utilisation rationnelle des medicaments au sein de {{etablissement_ou_communaute}}.</p><h2>Responsable de mise en oeuvre</h2><p>{{responsable_charte}}</p><h2>Engagements des professionnels de sante</h2><p>{{engagements_professionnels}}</p><h2>Engagements des patients</h2><p>{{engagements_patients}}</p><h2>Date d"adoption</h2><p>{{date_adoption}}</p><h2>Signature</h2><p>En signant cette charte, les parties s"engagent a en respecter les principes et a contribuer au bon usage du medicament.</p></div>`
  },
  {
    code: 'it_dev_logiciel',
    name: "Contrat de Developpement de Logiciel sur Mesure",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 48000,
    description: "Contrat de prestation de developpement informatique sur mesure entre un client et un prestataire IT.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'prestataire_dev',label:"Nom du prestataire IT",type:'text',required:true},
      {key:'description_projet',label:"Description du projet logiciel",type:'textarea',required:true},
      {key:'delai_livraison',label:"Delai de livraison et jalons",type:'text',required:true},
      {key:'budget_projet',label:"Budget et conditions de paiement",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DEVELOPPEMENT DE LOGICIEL SUR MESURE</h1><h2>Article 1 - Parties</h2><p>Client : {{client}}</p><p>Prestataire : {{prestataire_dev}}</p><h2>Article 2 - Objet</h2><p>{{description_projet}}</p><h2>Article 3 - Delais</h2><p>{{delai_livraison}}</p><h2>Article 4 - Budget</h2><p>{{budget_projet}}</p><h2>Article 5 - Date d"effet</h2><p>{{date_contrat}}</p><h2>Article 6 - Propriete intellectuelle</h2><p>Le logiciel developpe sera la propriete du client apres paiement integral de la prestation.</p></div>`
  },
  {
    code: 'it_maintenance_tma',
    name: "Accord de Maintenance Applicative (TMA)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 32000,
    description: "Accord de Tierce Maintenance Applicative pour assurer la maintenance corrective, evolutive et preventive d'applications.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'client_tma',label:"Client beneficiaire de la TMA",type:'text',required:true},
      {key:'prestataire_tma',label:"Prestataire TMA",type:'text',required:true},
      {key:'applications_concernees',label:"Applications concernees par la TMA",type:'textarea',required:true},
      {key:'niveaux_service',label:"Niveaux de service (SLA) garantis",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du contrat TMA",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAINTENANCE APPLICATIVE (TMA)</h1><h2>Article 1 - Parties</h2><p>Client : {{client_tma}}</p><p>Prestataire TMA : {{prestataire_tma}}</p><h2>Article 2 - Applications concernees</h2><p>{{applications_concernees}}</p><h2>Article 3 - Niveaux de service</h2><p>{{niveaux_service}}</p><h2>Article 4 - Prise d"effet</h2><p>{{date_debut}}</p><h2>Article 5 - Escalade</h2><p>Un comite de suivi mensuel est mis en place pour le pilotage de la TMA et le traitement des incidents critiques.</p></div>`
  },
  {
    code: 'it_hebergement_web',
    name: "Contrat de Service d'Hebergement Web",
    category: 'commercial_financier',
    price: 4000,
    priceMax: 16000,
    description: "Contrat d'hebergement de site web et d'applications en ligne avec garanties de disponibilite et securite.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'hebergeur',label:"Hebergeur / fournisseur d'hebergement",type:'text',required:true},
      {key:'client_hebergement',label:"Client",type:'text',required:true},
      {key:'sites_heberges',label:"Sites et applications heberges",type:'textarea',required:true},
      {key:'disponibilite_garantie',label:"Taux de disponibilite garanti",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D"HEBERGEMENT WEB</h1><h2>Article 1 - Parties</h2><p>Hebergeur : {{hebergeur}}</p><p>Client : {{client_hebergement}}</p><h2>Article 2 - Services heberges</h2><p>{{sites_heberges}}</p><h2>Article 3 - Disponibilite</h2><p>Taux garanti : {{disponibilite_garantie}}</p><h2>Article 4 - Date d"effet</h2><p>{{date_contrat}}</p><h2>Article 5 - Securite</h2><p>L"hebergeur met en oeuvre des mesures de securite adaptees pour proteger les donnees et assurer la continuite du service.</p></div>`
  },
  {
    code: 'it_erp_service',
    name: "Accord de Service ERP (SAP/Odoo)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 60000,
    description: "Accord de service pour l'implementation, la configuration et le support d'un systeme ERP de type SAP ou Odoo.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 69,
    fieldsJson: F([
      {key:'integrateur_erp',label:"Integrateur ERP",type:'text',required:true},
      {key:'entreprise_cliente',label:"Entreprise cliente",type:'text',required:true},
      {key:'solution_erp',label:"Solution ERP choisie (SAP, Odoo...)",type:'text',required:true},
      {key:'modules_implantes',label:"Modules a implementer",type:'textarea',required:true},
      {key:'date_go_live',label:"Date previsionnelle de mise en production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE ERP</h1><h2>Article 1 - Parties</h2><p>Integrateur : {{integrateur_erp}}</p><p>Client : {{entreprise_cliente}}</p><h2>Article 2 - Solution ERP</h2><p>Solution : {{solution_erp}}</p><h2>Article 3 - Modules</h2><p>{{modules_implantes}}</p><h2>Article 4 - Go-Live</h2><p>Date previsionnelle : {{date_go_live}}</p><h2>Article 5 - Garantie post-implementation</h2><p>Une periode de garantie et de support intensif de 3 mois suivra la mise en production du systeme ERP.</p></div>`
  },
  {
    code: 'it_appli_mobile',
    name: "Contrat de Service de Developpement d'Application Mobile",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 40000,
    description: "Contrat de developpement d'application mobile iOS et/ou Android pour une entreprise ou organisation.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'agence_mobile',label:"Agence ou developpeur mobile",type:'text',required:true},
      {key:'client_mobile',label:"Client commanditaire",type:'text',required:true},
      {key:'specification_app',label:"Specifications fonctionnelles de l'application",type:'textarea',required:true},
      {key:'plateformes',label:"Plateformes cibles (iOS, Android, les deux)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison prevue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DEVELOPPEMENT D"APPLICATION MOBILE</h1><h2>Article 1 - Parties</h2><p>Agence : {{agence_mobile}}</p><p>Client : {{client_mobile}}</p><h2>Article 2 - Specifications</h2><p>{{specification_app}}</p><h2>Article 3 - Plateformes</h2><p>{{plateformes}}</p><h2>Article 4 - Livraison</h2><p>{{date_livraison}}</p><h2>Article 5 - Publication</h2><p>Le prestataire assiste le client dans la publication de l"application sur les stores officiels (App Store, Google Play).</p></div>`
  },
  {
    code: 'it_cloud',
    name: "Accord de Service de Deploiement Cloud AWS/Azure/GCP",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 48000,
    description: "Accord de service pour le deploiement et la gestion d'infrastructure cloud sur AWS, Azure ou Google Cloud Platform.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'prestataire_cloud',label:"Prestataire cloud",type:'text',required:true},
      {key:'client_cloud',label:"Client",type:'text',required:true},
      {key:'fournisseur_cloud',label:"Fournisseur cloud (AWS, Azure, GCP)",type:'text',required:true},
      {key:'services_deployes',label:"Services et ressources cloud a deployer",type:'textarea',required:true},
      {key:'date_deploiement',label:"Date prevue de deploiement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DEPLOIEMENT CLOUD</h1><h2>Article 1 - Parties</h2><p>Prestataire : {{prestataire_cloud}}</p><p>Client : {{client_cloud}}</p><h2>Article 2 - Fournisseur</h2><p>Plateforme cloud : {{fournisseur_cloud}}</p><h2>Article 3 - Services a deployer</h2><p>{{services_deployes}}</p><h2>Article 4 - Date de deploiement</h2><p>{{date_deploiement}}</p><h2>Article 5 - Securite et conformite</h2><p>Le deploiement respecte les bonnes pratiques de securite cloud et les exigences de conformite applicables.</p></div>`
  },
  {
    code: 'it_ecommerce',
    name: "Contrat de Service de Developpement Site E-commerce",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 36000,
    description: "Contrat de developpement d'une boutique en ligne avec gestion des paiements et du catalogue produits.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'agence_web',label:"Agence web / developpeur",type:'text',required:true},
      {key:'marchand',label:"Marchand / e-commercant",type:'text',required:true},
      {key:'fonctionnalites_site',label:"Fonctionnalites du site e-commerce",type:'textarea',required:true},
      {key:'solutions_paiement',label:"Solutions de paiement integrees",type:'text',required:true},
      {key:'date_mise_en_ligne',label:"Date de mise en ligne prevue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DEVELOPPEMENT SITE E-COMMERCE</h1><h2>Article 1 - Parties</h2><p>Agence web : {{agence_web}}</p><p>Marchand : {{marchand}}</p><h2>Article 2 - Fonctionnalites</h2><p>{{fonctionnalites_site}}</p><h2>Article 3 - Paiement en ligne</h2><p>Solutions integrees : {{solutions_paiement}}</p><h2>Article 4 - Mise en ligne</h2><p>{{date_mise_en_ligne}}</p><h2>Article 5 - Formation</h2><p>Une formation a l"utilisation du back-office est incluse dans la prestation.</p></div>`
  },
  {
    code: 'it_saas_licence',
    name: "Accord de Licence de Logiciel (SaaS)",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 24000,
    description: "Accord de licence d'utilisation d'un logiciel en mode SaaS avec conditions d'abonnement et support inclus.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 77,
    fieldsJson: F([
      {key:'editeur_saas',label:"Editeur du logiciel SaaS",type:'text',required:true},
      {key:'abonne',label:"Abonne / entreprise cliente",type:'text',required:true},
      {key:'description_logiciel',label:"Description du logiciel et modules licencies",type:'textarea',required:true},
      {key:'nombre_utilisateurs',label:"Nombre d'utilisateurs autorises",type:'text',required:true},
      {key:'date_debut_abonnement',label:"Date de debut de l'abonnement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICENCE LOGICIEL SAAS</h1><h2>Article 1 - Parties</h2><p>Editeur : {{editeur_saas}}</p><p>Abonne : {{abonne}}</p><h2>Article 2 - Logiciel licencie</h2><p>{{description_logiciel}}</p><h2>Article 3 - Utilisateurs</h2><p>Nombre autorise : {{nombre_utilisateurs}}</p><h2>Article 4 - Prise d"effet</h2><p>{{date_debut_abonnement}}</p><h2>Article 5 - Disponibilite</h2><p>L"editeur garantit une disponibilite de 99,5% du service SaaS, hors maintenances planifiees communiquees a l"avance.</p></div>`
  },
  {
    code: 'it_formation_informatique',
    name: "Contrat de Service de Formation Informatique",
    category: 'commercial_financier',
    price: 5000,
    priceMax: 20000,
    description: "Contrat de formation aux outils informatiques, logiciels et technologies pour les entreprises et administrations.",
    templateType: 'pdf',
    classe: 'C',
    active: true,
    popularity: 73,
    fieldsJson: F([
      {key:'centre_formation',label:"Centre de formation informatique",type:'text',required:true},
      {key:'entreprise_cliente',label:"Entreprise ou organisation cliente",type:'text',required:true},
      {key:'programme_formation',label:"Programme et contenu de la formation",type:'textarea',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE FORMATION INFORMATIQUE</h1><h2>Article 1 - Parties</h2><p>Centre de formation : {{centre_formation}}</p><p>Client : {{entreprise_cliente}}</p><h2>Article 2 - Programme</h2><p>{{programme_formation}}</p><h2>Article 3 - Participants</h2><p>Nombre de stagiaires : {{nombre_stagiaires}}</p><h2>Article 4 - Dates</h2><p>{{date_formation}}</p><h2>Article 5 - Certification</h2><p>Les participants recevront une attestation de formation a l"issue du cursus.</p></div>`
  },
  {
    code: 'it_integration_esb',
    name: "Accord de Service d'Integration Systeme (ESB)",
    category: 'commercial_financier',
    price: 14000,
    priceMax: 56000,
    description: "Accord de service pour l'integration de systemes d'information heterogenes via un bus de services d'entreprise (ESB).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'integrateur_esb',label:"Integrateur systeme",type:'text',required:true},
      {key:'client_integration',label:"Entreprise cliente",type:'text',required:true},
      {key:'systemes_integrer',label:"Systemes a integrer",type:'textarea',required:true},
      {key:'solution_esb',label:"Solution ESB ou middleware retenue",type:'text',required:true},
      {key:'date_fin_integration',label:"Date de fin d'integration prevue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D"INTEGRATION SYSTEME (ESB)</h1><h2>Article 1 - Parties</h2><p>Integrateur : {{integrateur_esb}}</p><p>Client : {{client_integration}}</p><h2>Article 2 - Systemes a integrer</h2><p>{{systemes_integrer}}</p><h2>Article 3 - Solution technique</h2><p>{{solution_esb}}</p><h2>Article 4 - Echeance</h2><p>{{date_fin_integration}}</p><h2>Article 5 - Tests d"integration</h2><p>Des tests d"integration exhaustifs seront conduits avant la mise en production pour valider les flux de donnees entre les systemes.</p></div>`
  },
  {
    code: 'it_migration_donnees',
    name: "Contrat de Service de Migration de Donnees",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 40000,
    description: "Contrat pour la migration securisee de donnees d'un systeme ancien vers un nouveau systeme d'information.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'prestataire_migration',label:"Prestataire de migration",type:'text',required:true},
      {key:'client_migration',label:"Client",type:'text',required:true},
      {key:'donnees_migrer',label:"Description des donnees a migrer",type:'textarea',required:true},
      {key:'systeme_cible',label:"Systeme cible de la migration",type:'text',required:true},
      {key:'date_migration',label:"Date prevue de la migration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE MIGRATION DE DONNEES</h1><h2>Article 1 - Parties</h2><p>Prestataire : {{prestataire_migration}}</p><p>Client : {{client_migration}}</p><h2>Article 2 - Donnees concernees</h2><p>{{donnees_migrer}}</p><h2>Article 3 - Systeme cible</h2><p>{{systeme_cible}}</p><h2>Article 4 - Date de migration</h2><p>{{date_migration}}</p><h2>Article 5 - Securite et reversibilite</h2><p>Une sauvegarde complete des donnees sources est realisee avant toute operation de migration. Un plan de rollback est prevu.</p></div>`
  },
  {
    code: 'it_bi_service',
    name: "Accord de Service de Business Intelligence (BI)",
    category: 'commercial_financier',
    price: 13000,
    priceMax: 52000,
    description: "Accord pour la mise en place d'une solution de Business Intelligence incluant tableaux de bord et reporting.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 61,
    fieldsJson: F([
      {key:'prestataire_bi',label:"Prestataire BI",type:'text',required:true},
      {key:'client_bi',label:"Entreprise cliente",type:'text',required:true},
      {key:'perimetre_bi',label:"Perimetre et sources de donnees",type:'textarea',required:true},
      {key:'outil_bi',label:"Outil BI retenu (Power BI, Tableau, Qlik...)",type:'text',required:true},
      {key:'date_deploiement',label:"Date de deploiement prevue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BUSINESS INTELLIGENCE</h1><h2>Article 1 - Parties</h2><p>Prestataire BI : {{prestataire_bi}}</p><p>Client : {{client_bi}}</p><h2>Article 2 - Perimetre</h2><p>{{perimetre_bi}}</p><h2>Article 3 - Outil BI</h2><p>{{outil_bi}}</p><h2>Article 4 - Deploiement</h2><p>{{date_deploiement}}</p><h2>Article 5 - Formation utilisateurs</h2><p>Une formation des utilisateurs cles a l"exploitation des tableaux de bord est comprise dans la prestation.</p></div>`
  },
  {
    code: 'it_ux_ui',
    name: "Contrat de Service de Conception UX/UI",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 28000,
    description: "Contrat pour la conception de l'experience utilisateur (UX) et de l'interface graphique (UI) d'une application ou d'un site.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'studio_design',label:"Studio de design UX/UI",type:'text',required:true},
      {key:'client_design',label:"Client",type:'text',required:true},
      {key:'perimetre_design',label:"Perimetre du projet de design",type:'textarea',required:true},
      {key:'livrables_attendus',label:"Livrables attendus (maquettes, prototypes...)",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison des livrables",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE CONCEPTION UX/UI</h1><h2>Article 1 - Parties</h2><p>Studio de design : {{studio_design}}</p><p>Client : {{client_design}}</p><h2>Article 2 - Perimetre</h2><p>{{perimetre_design}}</p><h2>Article 3 - Livrables</h2><p>{{livrables_attendus}}</p><h2>Article 4 - Livraison</h2><p>{{date_livraison}}</p><h2>Article 5 - Revisions</h2><p>Deux cycles de revision sont inclus dans la prestation. Toute revision supplementaire sera facturee au taux journalier convenu.</p></div>`
  },
  {
    code: 'it_api_dev',
    name: "Accord de Service de Developpement API",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 36000,
    description: "Accord pour le developpement d'interfaces de programmation (API REST ou GraphQL) pour l'interconnexion de systemes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'prestataire_api',label:"Prestataire de developpement API",type:'text',required:true},
      {key:'client_api',label:"Client",type:'text',required:true},
      {key:'specification_api',label:"Specifications des API a developper",type:'textarea',required:true},
      {key:'technologies_api',label:"Technologies et standards utilises (REST, GraphQL, OpenAPI...)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DEVELOPPEMENT API</h1><h2>Article 1 - Parties</h2><p>Prestataire : {{prestataire_api}}</p><p>Client : {{client_api}}</p><h2>Article 2 - Specifications</h2><p>{{specification_api}}</p><h2>Article 3 - Technologies</h2><p>{{technologies_api}}</p><h2>Article 4 - Livraison</h2><p>{{date_livraison}}</p><h2>Article 5 - Documentation</h2><p>La documentation technique complete des API (Swagger / OpenAPI) sera fournie avec les livrables.</p></div>`
  },
  {
    code: 'it_qa_tests',
    name: "Contrat de Service de Tests Logiciels (QA)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 32000,
    description: "Contrat de prestation d'assurance qualite logicielle incluant les tests fonctionnels, de performance et de securite.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 64,
    fieldsJson: F([
      {key:'cabinet_qa',label:"Cabinet ou equipe QA",type:'text',required:true},
      {key:'client_qa',label:"Client",type:'text',required:true},
      {key:'perimetre_tests',label:"Perimetre et types de tests",type:'textarea',required:true},
      {key:'outils_tests',label:"Outils de test utilises",type:'text',required:true},
      {key:'date_campagne',label:"Date de la campagne de tests",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE TESTS LOGICIELS (QA)</h1><h2>Article 1 - Parties</h2><p>Equipe QA : {{cabinet_qa}}</p><p>Client : {{client_qa}}</p><h2>Article 2 - Perimetre de tests</h2><p>{{perimetre_tests}}</p><h2>Article 3 - Outils</h2><p>{{outils_tests}}</p><h2>Article 4 - Campagne de tests</h2><p>{{date_campagne}}</p><h2>Article 5 - Rapport de tests</h2><p>Un rapport detaille des tests avec les resultats, anomalies detectees et recommandations sera remis a l"issue de la campagne.</p></div>`
  },
  {
    code: 'it_infogérance',
    name: "Accord de Service d'Infogerance DSI",
    category: 'commercial_financier',
    price: 16000,
    priceMax: 64000,
    description: "Accord d'infogerance globale du systeme d'information incluant l'exploitation, la supervision et le support.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'infogérant',label:"Societe infogérante",type:'text',required:true},
      {key:'client_infogérance',label:"Client",type:'text',required:true},
      {key:'perimetre_si',label:"Perimetre du systeme d'information confie",type:'textarea',required:true},
      {key:'sla_infogerance',label:"SLA et engagements de service",type:'text',required:true},
      {key:'date_debut',label:"Date de prise en charge",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D"INFOGERANCE DSI</h1><h2>Article 1 - Parties</h2><p>Infogérant : {{infogérant}}</p><p>Client : {{client_infogérance}}</p><h2>Article 2 - Perimetre</h2><p>{{perimetre_si}}</p><h2>Article 3 - SLA</h2><p>{{sla_infogerance}}</p><h2>Article 4 - Prise d"effet</h2><p>{{date_debut}}</p><h2>Article 5 - Comite de pilotage</h2><p>Un comite de pilotage mensuel est etabli pour le suivi des performances et l"evolution du perimetre d"infogerance.</p></div>`
  },
  {
    code: 'it_ged',
    name: "Contrat de Service de GED (Gestion Electronique de Documents)",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 40000,
    description: "Contrat de mise en place d'une solution de gestion electronique de documents pour la dematerialisation des processus.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'prestataire_ged',label:"Prestataire GED",type:'text',required:true},
      {key:'client_ged',label:"Client",type:'text',required:true},
      {key:'solution_ged',label:"Solution GED retenue",type:'text',required:true},
      {key:'workflows_documenter',label:"Processus documentaires a numeriser",type:'textarea',required:true},
      {key:'date_mise_en_place',label:"Date de mise en place",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE GED</h1><h2>Article 1 - Parties</h2><p>Prestataire GED : {{prestataire_ged}}</p><p>Client : {{client_ged}}</p><h2>Article 2 - Solution</h2><p>{{solution_ged}}</p><h2>Article 3 - Processus a numeriser</h2><p>{{workflows_documenter}}</p><h2>Article 4 - Mise en place</h2><p>{{date_mise_en_place}}</p><h2>Article 5 - Conservation legale</h2><p>La solution GED est conforme aux exigences legales de conservation et d"archivage electronique applicables en Cote d"Ivoire.</p></div>`
  },
  {
    code: 'it_sirh',
    name: "Accord de Service de SIRH (Logiciel RH)",
    category: 'commercial_financier',
    price: 11000,
    priceMax: 44000,
    description: "Accord de service pour l'implementation d'un SIRH couvrant la paie, les conges, les formations et la gestion des talents.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      {key:'editeur_sirh',label:"Editeur ou integrateur SIRH",type:'text',required:true},
      {key:'drh_client',label:"DRH / Entreprise cliente",type:'text',required:true},
      {key:'modules_rh',label:"Modules SIRH a implementer",type:'textarea',required:true},
      {key:'effectif_concerne',label:"Effectif concerne",type:'text',required:true},
      {key:'date_go_live',label:"Date de mise en production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE SIRH</h1><h2>Article 1 - Parties</h2><p>Editeur SIRH : {{editeur_sirh}}</p><p>Client : {{drh_client}}</p><h2>Article 2 - Modules</h2><p>{{modules_rh}}</p><h2>Article 3 - Perimetre</h2><p>Effectif concerne : {{effectif_concerne}}</p><h2>Article 4 - Go-Live</h2><p>{{date_go_live}}</p><h2>Article 5 - Conformite sociale</h2><p>Le SIRH est parametré conformement au droit du travail ivoirien et aux conventions collectives applicables.</p></div>`
  },
  {
    code: 'it_crm',
    name: "Contrat de Service CRM (Gestion Clientele)",
    category: 'commercial_financier',
    price: 9000,
    priceMax: 36000,
    description: "Contrat pour l'implementation et la gestion d'un CRM afin d'optimiser la relation client et les ventes.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'prestataire_crm',label:"Prestataire CRM",type:'text',required:true},
      {key:'client_crm',label:"Entreprise cliente",type:'text',required:true},
      {key:'solution_crm',label:"Solution CRM choisie (Salesforce, HubSpot, Odoo CRM...)",type:'text',required:true},
      {key:'processus_crm',label:"Processus commerciaux a couvrir",type:'textarea',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE CRM</h1><h2>Article 1 - Parties</h2><p>Prestataire CRM : {{prestataire_crm}}</p><p>Client : {{client_crm}}</p><h2>Article 2 - Solution</h2><p>{{solution_crm}}</p><h2>Article 3 - Processus couverts</h2><p>{{processus_crm}}</p><h2>Article 4 - Lancement</h2><p>{{date_lancement}}</p><h2>Article 5 - Confidentialite des donnees clients</h2><p>Les donnees clients integrees dans le CRM sont protegees et ne seront pas cedees a des tiers sans accord prealable.</p></div>`
  },
  {
    code: 'it_eprocurement',
    name: "Accord de Service d'E-procurement",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 48000,
    description: "Accord pour la mise en place d'une plateforme d'achats electroniques couvrant la commande et la gestion fournisseurs.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 59,
    fieldsJson: F([
      {key:'editeur_procurement',label:"Editeur de la solution e-procurement",type:'text',required:true},
      {key:'direction_achats',label:"Direction des achats cliente",type:'text',required:true},
      {key:'perimetre_achats',label:"Perimetre des achats a couvrir",type:'textarea',required:true},
      {key:'integration_erp',label:"Integration avec l'ERP existant",type:'text',required:true},
      {key:'date_deploiement',label:"Date de deploiement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D"E-PROCUREMENT</h1><h2>Article 1 - Parties</h2><p>Editeur : {{editeur_procurement}}</p><p>Direction achats : {{direction_achats}}</p><h2>Article 2 - Perimetre</h2><p>{{perimetre_achats}}</p><h2>Article 3 - Integration ERP</h2><p>{{integration_erp}}</p><h2>Article 4 - Deploiement</h2><p>{{date_deploiement}}</p><h2>Article 5 - Conformite OHADA</h2><p>La plateforme respecte les regles de la commande publique et les procedures d"achats conformes au droit OHADA.</p></div>`
  },
  {
    code: 'it_transformation_digitale',
    name: "Contrat de Conseil en Transformation Digitale",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 60000,
    description: "Contrat de mission de conseil pour accompagner une organisation dans sa transformation numerique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'cabinet_conseil',label:"Cabinet de conseil en digital",type:'text',required:true},
      {key:'organisation',label:"Organisation beneficiaire",type:'text',required:true},
      {key:'diagnostic_actuel',label:"Diagnostic de la situation numerique actuelle",type:'textarea',required:true},
      {key:'axes_transformation',label:"Axes de transformation prioritaires",type:'textarea',required:true},
      {key:'date_mission',label:"Date de debut de la mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONSEIL EN TRANSFORMATION DIGITALE</h1><h2>Article 1 - Parties</h2><p>Cabinet : {{cabinet_conseil}}</p><p>Organisation : {{organisation}}</p><h2>Article 2 - Diagnostic</h2><p>{{diagnostic_actuel}}</p><h2>Article 3 - Axes de transformation</h2><p>{{axes_transformation}}</p><h2>Article 4 - Debut de mission</h2><p>{{date_mission}}</p><h2>Article 5 - Gouvernance du projet</h2><p>Un comite de pilotage de la transformation digitale est constitue avec des representants de la direction et des metiers cles.</p></div>`
  },
  {
    code: 'it_support_n1n2n3',
    name: "Accord de Service de Support Technique N1/N2/N3",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 28000,
    description: "Accord de service de support informatique multi-niveaux pour les incidents et demandes des utilisateurs.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 73,
    fieldsJson: F([
      {key:'prestataire_support',label:"Prestataire de support",type:'text',required:true},
      {key:'client_support',label:"Client",type:'text',required:true},
      {key:'perimetre_support',label:"Perimetre technique couvert",type:'textarea',required:true},
      {key:'horaires_support',label:"Horaires et plages de support",type:'text',required:true},
      {key:'date_debut',label:"Date de debut du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUPPORT TECHNIQUE N1/N2/N3</h1><h2>Article 1 - Parties</h2><p>Prestataire : {{prestataire_support}}</p><p>Client : {{client_support}}</p><h2>Article 2 - Perimetre</h2><p>{{perimetre_support}}</p><h2>Article 3 - Horaires de support</h2><p>{{horaires_support}}</p><h2>Article 4 - Prise d"effet</h2><p>{{date_debut}}</p><h2>Article 5 - Niveaux d"escalade</h2><p>N1 : support de premier niveau (prise en charge initiale). N2 : support technique specialise. N3 : support expert et correction de bugs.</p></div>`
  },
  {
    code: 'it_audit_si',
    name: "Rapport d'Audit du Systeme d'Information",
    category: 'commercial_financier',
    price: 14000,
    priceMax: 56000,
    description: "Rapport complet d'audit du systeme d'information couvrant la securite, la performance et la conformite.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'cabinet_audit_si',label:"Cabinet d'audit SI",type:'text',required:true},
      {key:'entreprise_auditee_si',label:"Entreprise auditee",type:'text',required:true},
      {key:'date_audit_si',label:"Date de l'audit",type:'date',required:true},
      {key:'domaines_audit_si',label:"Domaines audites (securite, infrastructure, applications...)",type:'textarea',required:true},
      {key:'recommandations_si',label:"Recommandations et plan d'action",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D"AUDIT DU SYSTEME D"INFORMATION</h1><h2>Informations generales</h2><p>Cabinet d"audit : {{cabinet_audit_si}}</p><p>Entreprise auditee : {{entreprise_auditee_si}}</p><p>Date : {{date_audit_si}}</p><h2>Domaines audites</h2><p>{{domaines_audit_si}}</p><h2>Recommandations</h2><p>{{recommandations_si}}</p><h2>Conclusion</h2><p>Ce rapport d"audit du SI est confidentiel et destine exclusivement a la direction generale de l"organisation auditee.</p></div>`
  },
  {
    code: 'it_cession_droits',
    name: "Contrat de Cession de Droits Logiciel",
    category: 'commercial_financier',
    price: 11000,
    priceMax: 44000,
    description: "Contrat de cession totale ou partielle des droits de propriete intellectuelle sur un logiciel ou code source.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'cedant_logiciel',label:"Cedant (createur ou proprietaire du logiciel)",type:'text',required:true},
      {key:'cessionnaire_logiciel',label:"Cessionnaire (acheteur des droits)",type:'text',required:true},
      {key:'description_logiciel_cede',label:"Description du logiciel et droits cedes",type:'textarea',required:true},
      {key:'prix_cession',label:"Prix de cession et conditions de paiement",type:'text',required:true},
      {key:'date_cession',label:"Date de la cession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CESSION DE DROITS LOGICIEL</h1><h2>Article 1 - Parties</h2><p>Cedant : {{cedant_logiciel}}</p><p>Cessionnaire : {{cessionnaire_logiciel}}</p><h2>Article 2 - Logiciel et droits cedes</h2><p>{{description_logiciel_cede}}</p><h2>Article 3 - Prix de cession</h2><p>{{prix_cession}}</p><h2>Article 4 - Date de cession</h2><p>{{date_cession}}</p><h2>Article 5 - Garantie d"eviction</h2><p>Le cedant garantit qu"il est seul proprietaire des droits cedes et qu"il n"existe aucun litige ou droit de tiers sur le logiciel.</p></div>`
  },
  {
    code: 'it_gouvernance_it',
    name: "Charte de Gouvernance IT",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 24000,
    description: "Charte definissant le cadre de gouvernance du systeme d'information, les roles et responsabilites en matiere IT.",
    templateType: 'pdf',
    classe: 'B',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'organisation_it',label:"Organisation ou entreprise concernee",type:'text',required:true},
      {key:'dsi_responsable',label:"Directeur des systemes d'information (DSI)",type:'text',required:true},
      {key:'instances_gouvernance',label:"Instances de gouvernance IT (comites, roles)",type:'textarea',required:true},
      {key:'politiques_it',label:"Politiques et standards IT applicables",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE GOUVERNANCE IT</h1><h2>Article 1 - Organisation</h2><p>{{organisation_it}}</p><p>DSI : {{dsi_responsable}}</p><h2>Article 2 - Instances de gouvernance</h2><p>{{instances_gouvernance}}</p><h2>Article 3 - Politiques IT</h2><p>{{politiques_it}}</p><h2>Article 4 - Date d"adoption</h2><p>{{date_adoption}}</p><h2>Article 5 - Revision</h2><p>La presente charte est revisee annuellement ou a chaque evolution majeure du systeme d"information ou de l"organisation.</p></div>`
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
  console.log(`Batch 39a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
