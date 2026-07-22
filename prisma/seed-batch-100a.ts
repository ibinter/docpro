import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 DROIT DE LA FAMILLE AVANCÉ (fam2_) ──────────────────────────────────
  {
    code: 'fam2_separation_corps',
    name: "Accord de séparation de corps amiable",
    category: 'juridique_admin',
    price: 8000, priceMax: 24000,
    description: "Acte amiable constatant la séparation de corps entre époux sans dissolution du mariage, fixant les obligations réciproques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_epoux',label:"Nom et prénoms de l'époux",type:'text',required:true},
      {key:'nom_epouse',label:"Nom et prénoms de l'épouse",type:'text',required:true},
      {key:'date_mariage',label:"Date du mariage",type:'date',required:true},
      {key:'lieu_mariage',label:"Lieu de célébration du mariage",type:'text',required:true},
      {key:'motifs',label:"Motifs de la séparation",type:'textarea',required:true},
      {key:'date_effet',label:"Date d'effet de la séparation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SÉPARATION DE CORPS AMIABLE</h1>
<p>Entre les soussignés :</p>
<p><strong>Monsieur</strong> {{nom_epoux}}, d'une part,</p>
<p><strong>Madame</strong> {{nom_epouse}}, d'autre part,</p>
<p>Unis par les liens du mariage célébré le {{date_mariage}} à {{lieu_mariage}},</p>
<h2>EXPOSÉ DES MOTIFS</h2>
<p>{{motifs}}</p>
<h2>DISPOSITIONS CONVENUES</h2>
<p>Les parties conviennent amiablement d'une séparation de corps prenant effet le {{date_effet}}, conformément aux dispositions du Code civil applicable en Côte d'Ivoire.</p>
<p>La présente séparation ne dissout pas le mariage. Les obligations alimentaires subsistent dans les conditions définies ci-après.</p>
<h2>SIGNATURES</h2>
<p>Fait à Abidjan, le {{date_effet}}</p>
<p>L'Époux : _____________________ &nbsp;&nbsp; L'Épouse : _____________________</p></div>`,
  },
  {
    code: 'fam2_divorce_consentement',
    name: "Accord de divorce par consentement mutuel (OHADA)",
    category: 'juridique_admin',
    price: 10000, priceMax: 30000,
    description: "Convention de divorce par consentement mutuel conforme au droit OHADA et au droit ivoirien, réglant tous les effets du divorce.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'nom_epoux',label:"Nom complet de l'époux",type:'text',required:true},
      {key:'nom_epouse',label:"Nom complet de l'épouse",type:'text',required:true},
      {key:'date_mariage',label:"Date du mariage",type:'date',required:true},
      {key:'enfants',label:"Noms et âges des enfants communs",type:'textarea',required:false},
      {key:'garde_enfants',label:"Modalités de garde des enfants",type:'textarea',required:false},
      {key:'partage_biens',label:"Accord sur le partage des biens",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE DIVORCE PAR CONSENTEMENT MUTUEL</h1>
<p><em>Conformément au Code civil ivoirien et aux principes OHADA</em></p>
<p>Entre :</p>
<p><strong>Monsieur</strong> {{nom_epoux}}</p>
<p><strong>Madame</strong> {{nom_epouse}}</p>
<p>Mariés le {{date_mariage}}</p>
<h2>I. ACCORD SUR LA GARDE DES ENFANTS</h2>
<p>Enfants communs : {{enfants}}</p>
<p>Modalités convenues : {{garde_enfants}}</p>
<h2>II. ACCORD SUR LE PARTAGE DES BIENS</h2>
<p>{{partage_biens}}</p>
<h2>III. DÉCLARATION COMMUNE</h2>
<p>Les époux déclarent que leur consentement est libre, éclairé et exempt de tout vice.</p>
<p>Les parties s'engagent à soumettre la présente convention à l'homologation du Tribunal compétent.</p>
<p>Fait à Abidjan,</p>
<p>L'Époux : _____________________ &nbsp;&nbsp; L'Épouse : _____________________</p></div>`,
  },
  {
    code: 'fam2_liquidation_regime',
    name: "Accord de liquidation du régime matrimonial",
    category: 'juridique_admin',
    price: 12000, priceMax: 40000,
    description: "Acte de liquidation et partage du régime matrimonial établissant l'actif et le passif communs à répartir entre les ex-époux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_epoux',label:"Nom de l'époux",type:'text',required:true},
      {key:'nom_epouse',label:"Nom de l'épouse",type:'text',required:true},
      {key:'regime_matrimonial',label:"Régime matrimonial applicable",type:'text',required:true},
      {key:'actif_commun',label:"Description de l'actif commun",type:'textarea',required:true},
      {key:'passif_commun',label:"Description du passif commun",type:'textarea',required:true},
      {key:'modalites_partage',label:"Modalités de répartition convenues",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LIQUIDATION DU RÉGIME MATRIMONIAL</h1>
<p>Entre Monsieur {{nom_epoux}} et Madame {{nom_epouse}}</p>
<p>Régime applicable : {{regime_matrimonial}}</p>
<h2>I. INVENTAIRE DE L'ACTIF COMMUN</h2>
<p>{{actif_commun}}</p>
<h2>II. INVENTAIRE DU PASSIF COMMUN</h2>
<p>{{passif_commun}}</p>
<h2>III. MODALITÉS DE PARTAGE</h2>
<p>{{modalites_partage}}</p>
<h2>IV. QUITTANCE RÉCIPROQUE</h2>
<p>Chaque partie déclare être remplie de ses droits et renoncer à toute réclamation ultérieure relative au régime matrimonial dissous.</p>
<p>Signatures : _____________________ &nbsp;&nbsp; _____________________</p></div>`,
  },
  {
    code: 'fam2_prestation_compensatoire',
    name: "Accord de prestation compensatoire (divorce)",
    category: 'juridique_admin',
    price: 7000, priceMax: 20000,
    description: "Convention fixant la prestation compensatoire destinée à compenser la disparité de niveau de vie créée par le divorce.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'debiteur',label:"Nom du débiteur de la prestation",type:'text',required:true},
      {key:'creancier',label:"Nom du créancier de la prestation",type:'text',required:true},
      {key:'montant_capital',label:"Montant en capital (FCFA)",type:'text',required:false},
      {key:'rente_mensuelle',label:"Montant de la rente mensuelle (FCFA)",type:'text',required:false},
      {key:'duree_rente',label:"Durée de versement de la rente",type:'text',required:false},
      {key:'modalites_paiement',label:"Modalités et garanties de paiement",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRESTATION COMPENSATOIRE</h1>
<p>Débiteur : {{debiteur}}</p>
<p>Créancier : {{creancier}}</p>
<h2>I. MONTANT ET FORME</h2>
<p>Capital versé en une fois : {{montant_capital}} FCFA</p>
<p>Rente mensuelle : {{rente_mensuelle}} FCFA pendant {{duree_rente}}</p>
<h2>II. MODALITÉS ET GARANTIES</h2>
<p>{{modalites_paiement}}</p>
<h2>III. RÉVISION ET EXTINCTION</h2>
<p>La prestation compensatoire est révisable en cas de changement notable dans la situation des parties. Elle s'éteint au décès du créancier.</p>
<p>Signatures : _____________________ &nbsp;&nbsp; _____________________</p></div>`,
  },
  {
    code: 'fam2_plan_parental',
    name: "Accord de plan parental (co-parentalité)",
    category: 'juridique_admin',
    price: 6000, priceMax: 18000,
    description: "Plan parental détaillant l'organisation de la co-parentalité, la garde alternée et les décisions relatives aux enfants après séparation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'parent_a',label:"Nom du parent A",type:'text',required:true},
      {key:'parent_b',label:"Nom du parent B",type:'text',required:true},
      {key:'enfants',label:"Noms et dates de naissance des enfants",type:'textarea',required:true},
      {key:'calendrier_garde',label:"Calendrier de résidence alternée",type:'textarea',required:true},
      {key:'decisions_importantes',label:"Modalités de prises de décisions importantes",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN PARENTAL — CO-PARENTALITÉ</h1>
<p>Parent A : {{parent_a}} &nbsp;|&nbsp; Parent B : {{parent_b}}</p>
<h2>I. ENFANTS CONCERNÉS</h2>
<p>{{enfants}}</p>
<h2>II. CALENDRIER DE RÉSIDENCE</h2>
<p>{{calendrier_garde}}</p>
<h2>III. DÉCISIONS IMPORTANTES</h2>
<p>{{decisions_importantes}}</p>
<h2>IV. RÉSOLUTION DES DIFFÉRENDS</h2>
<p>Tout différend relatif à l'application du présent plan fera l'objet d'une médiation familiale avant tout recours judiciaire.</p>
<p>Parent A : _____________________ &nbsp;&nbsp; Parent B : _____________________</p></div>`,
  },
  {
    code: 'fam2_mediation_parentale',
    name: "Accord de médiation parentale",
    category: 'juridique_admin',
    price: 5000, priceMax: 15000,
    description: "Protocole d'accord issu d'une médiation parentale, fixant les engagements des parents pour le bien-être des enfants.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'parent_a',label:"Nom du parent A",type:'text',required:true},
      {key:'parent_b',label:"Nom du parent B",type:'text',required:true},
      {key:'mediateur',label:"Nom du médiateur familial",type:'text',required:true},
      {key:'engagements',label:"Engagements pris par les parents",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MÉDIATION PARENTALE</h1>
<p>Médiateur : {{mediateur}}</p>
<p>Parent A : {{parent_a}} &nbsp;|&nbsp; Parent B : {{parent_b}}</p>
<h2>ENGAGEMENTS COMMUNS</h2>
<p>{{engagements}}</p>
<h2>VALEUR DE L'ACCORD</h2>
<p>Le présent accord, librement négocié avec l'assistance du médiateur, peut être soumis à l'homologation du juge aux affaires familiales pour lui conférer force exécutoire.</p>
<p>Signé le {{date_accord}}</p>
<p>Parent A : _____________________ &nbsp;&nbsp; Parent B : _____________________</p>
<p>Médiateur : _____________________</p></div>`,
  },
  {
    code: 'fam2_transfert_garde_urgence',
    name: "Accord de transfert de garde d'urgence",
    category: 'juridique_admin',
    price: 5000, priceMax: 14000,
    description: "Acte d'urgence organisant le transfert temporaire de la garde d'un enfant vers un tiers de confiance en cas d'indisponibilité des parents.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'parent_cedant',label:"Nom du parent cédant la garde",type:'text',required:true},
      {key:'gardien_temporaire',label:"Nom du gardien temporaire",type:'text',required:true},
      {key:'enfant',label:"Nom et date de naissance de l'enfant",type:'text',required:true},
      {key:'motif',label:"Motif du transfert d'urgence",type:'textarea',required:true},
      {key:'duree',label:"Durée estimée du transfert",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE TRANSFERT DE GARDE D'URGENCE</h1>
<p>Je soussigné(e) {{parent_cedant}}, parent légal de l'enfant {{enfant}},</p>
<p>confie la garde temporaire de cet enfant à {{gardien_temporaire}} pour une durée de {{duree}}.</p>
<h2>MOTIF</h2>
<p>{{motif}}</p>
<h2>POUVOIRS DU GARDIEN TEMPORAIRE</h2>
<p>Le gardien temporaire est habilité à prendre toute décision médicale d'urgence, à signer les documents scolaires courants et à assurer l'hébergement de l'enfant pendant la période indiquée.</p>
<p>Parent : _____________________ &nbsp;&nbsp; Gardien : _____________________</p></div>`,
  },
  {
    code: 'fam2_declaration_naissance',
    name: "Accord de déclaration de naissance",
    category: 'juridique_admin',
    price: 4000, priceMax: 12000,
    description: "Document d'accompagnement à la déclaration de naissance précisant la filiation, le nom attribué et les engagements des parents.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_enfant',label:"Nom et prénoms attribués à l'enfant",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'lieu_naissance',label:"Lieu de naissance",type:'text',required:true},
      {key:'nom_pere',label:"Nom et prénoms du père",type:'text',required:true},
      {key:'nom_mere',label:"Nom et prénoms de la mère",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE NAISSANCE — ACCORD PARENTAL</h1>
<p>Nous soussignés :</p>
<p>Père : {{nom_pere}}</p>
<p>Mère : {{nom_mere}}</p>
<p>Déclarons la naissance de l'enfant {{nom_enfant}}, né(e) le {{date_naissance}} à {{lieu_naissance}}.</p>
<h2>ENGAGEMENT DES PARENTS</h2>
<p>Les parents s'engagent à assurer conjointement l'entretien, l'éducation et le développement de l'enfant conformément à l'intérêt supérieur de celui-ci.</p>
<p>Père : _____________________ &nbsp;&nbsp; Mère : _____________________</p></div>`,
  },
  {
    code: 'fam2_reconnaissance_paternite',
    name: "Accord de reconnaissance de paternité judiciaire",
    category: 'juridique_admin',
    price: 6000, priceMax: 18000,
    description: "Acte de reconnaissance volontaire ou judiciaire de paternité établissant le lien de filiation entre un homme et un enfant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_pere',label:"Nom du père reconnaissant",type:'text',required:true},
      {key:'nom_enfant',label:"Nom et prénoms de l'enfant",type:'text',required:true},
      {key:'date_naissance_enfant',label:"Date de naissance de l'enfant",type:'date',required:true},
      {key:'nom_mere',label:"Nom de la mère",type:'text',required:true},
      {key:'circonstances',label:"Circonstances de la reconnaissance",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE RECONNAISSANCE DE PATERNITÉ</h1>
<p>Je soussigné {{nom_pere}}, déclare reconnaître comme mon enfant :</p>
<p>{{nom_enfant}}, né(e) le {{date_naissance_enfant}}, de Madame {{nom_mere}}.</p>
<h2>CIRCONSTANCES</h2>
<p>{{circonstances}}</p>
<h2>EFFETS DE LA RECONNAISSANCE</h2>
<p>La présente reconnaissance confère à l'enfant tous les droits attachés à la filiation paternelle, notamment en matière successorale, d'entretien et de nationalité.</p>
<p>Le père : _____________________ &nbsp;&nbsp; Date : _____________________</p></div>`,
  },
  {
    code: 'fam2_desaveu_paternite',
    name: "Accord de désaveu de paternité",
    category: 'juridique_admin',
    price: 8000, priceMax: 24000,
    description: "Acte juridique contestant la présomption de paternité, établissant les éléments permettant d'engager une action en désaveu devant le Tribunal.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_demandeur',label:"Nom du demandeur",type:'text',required:true},
      {key:'nom_enfant',label:"Nom de l'enfant concerné",type:'text',required:true},
      {key:'date_naissance_enfant',label:"Date de naissance de l'enfant",type:'date',required:true},
      {key:'motifs_desaveu',label:"Motifs et éléments probatoires du désaveu",type:'textarea',required:true},
      {key:'tribunal_competent',label:"Tribunal compétent saisi",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>MÉMOIRE DE DÉSAVEU DE PATERNITÉ</h1>
<p>Demandeur : {{nom_demandeur}}</p>
<p>Enfant concerné : {{nom_enfant}}, né(e) le {{date_naissance_enfant}}</p>
<p>Tribunal saisi : {{tribunal_competent}}</p>
<h2>EXPOSÉ DES MOTIFS</h2>
<p>{{motifs_desaveu}}</p>
<h2>DEMANDE</h2>
<p>Le demandeur sollicite du Tribunal qu'il prononce le désaveu de paternité conformément aux articles du Code civil ivoirien relatifs à la filiation et ordonne la rectification des actes d'état civil.</p>
<p>Le demandeur : _____________________</p></div>`,
  },
  {
    code: 'fam2_recherche_maternite',
    name: "Accord de recherche de maternité",
    category: 'juridique_admin',
    price: 7000, priceMax: 21000,
    description: "Acte initiant une action en recherche de maternité pour établir le lien de filiation maternelle d'un enfant abandonné ou non reconnu.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 44,
    fieldsJson: F([
      {key:'nom_enfant',label:"Nom et prénoms de l'enfant",type:'text',required:true},
      {key:'date_naissance_enfant',label:"Date de naissance estimée",type:'date',required:true},
      {key:'nom_mere_presumee',label:"Nom de la mère présumée",type:'text',required:true},
      {key:'preuves',label:"Éléments de preuve disponibles",type:'textarea',required:true},
      {key:'demandeur',label:"Identité du demandeur (enfant ou tuteur)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>MÉMOIRE EN RECHERCHE DE MATERNITÉ</h1>
<p>Demandeur : {{demandeur}}</p>
<p>Enfant : {{nom_enfant}}, né(e) le {{date_naissance_enfant}}</p>
<p>Mère présumée : {{nom_mere_presumee}}</p>
<h2>ÉLÉMENTS DE PREUVE</h2>
<p>{{preuves}}</p>
<h2>FONDEMENT JURIDIQUE</h2>
<p>L'action est fondée sur les dispositions du Code civil ivoirien permettant l'établissement judiciaire de la filiation maternelle lorsque la mère n'a pas volontairement reconnu l'enfant.</p>
<p>Le demandeur : _____________________</p></div>`,
  },
  {
    code: 'fam2_filiation_adoptive',
    name: "Accord de filiation adoptive (TAE CI)",
    category: 'juridique_admin',
    price: 10000, priceMax: 30000,
    description: "Convention d'adoption conforme aux procédures du Tribunal pour l'Adoption des Enfants en Côte d'Ivoire, établissant la nouvelle filiation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'adoptants',label:"Noms et prénoms des adoptants",type:'text',required:true},
      {key:'enfant_adopte',label:"Nom et prénoms de l'enfant adopté",type:'text',required:true},
      {key:'date_naissance_enfant',label:"Date de naissance de l'enfant",type:'date',required:true},
      {key:'origine_enfant',label:"Origine et antécédents de l'enfant",type:'textarea',required:true},
      {key:'type_adoption',label:"Type d'adoption (simple ou plénière)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE FILIATION ADOPTIVE</h1>
<p><em>Tribunal pour l'Adoption des Enfants — Côte d'Ivoire</em></p>
<p>Adoptants : {{adoptants}}</p>
<p>Enfant : {{enfant_adopte}}, né(e) le {{date_naissance_enfant}}</p>
<p>Type d'adoption : {{type_adoption}}</p>
<h2>ORIGINE DE L'ENFANT</h2>
<p>{{origine_enfant}}</p>
<h2>EFFETS DE L'ADOPTION</h2>
<p>L'adoption établit entre les adoptants et l'adopté un lien de filiation se substituant — en cas d'adoption plénière — au lien d'origine. L'enfant acquiert le nom des adoptants et l'ensemble des droits successoraux y afférents.</p>
<p>Adoptants : _____________________ &nbsp;&nbsp; Juge : _____________________</p></div>`,
  },
  {
    code: 'fam2_nationalite_ivoirienne',
    name: "Accord de droit à la nationalité ivoirienne (modèle CI)",
    category: 'juridique_admin',
    price: 8000, priceMax: 22000,
    description: "Dossier d'accord documentant les droits à la nationalité ivoirienne par filiation, naissance ou naturalisation, conforme à la loi ivoirienne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'nom_demandeur',label:"Nom complet du demandeur",type:'text',required:true},
      {key:'date_naissance',label:"Date de naissance",type:'date',required:true},
      {key:'lieu_naissance',label:"Lieu de naissance",type:'text',required:true},
      {key:'fondement_juridique',label:"Fondement de la demande de nationalité",type:'textarea',required:true},
      {key:'pieces_jointes',label:"Liste des pièces justificatives",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>DEMANDE DE DROIT À LA NATIONALITÉ IVOIRIENNE</h1>
<p>Demandeur : {{nom_demandeur}}</p>
<p>Né(e) le {{date_naissance}} à {{lieu_naissance}}</p>
<h2>FONDEMENT JURIDIQUE</h2>
<p>{{fondement_juridique}}</p>
<h2>PIÈCES JUSTIFICATIVES</h2>
<p>{{pieces_jointes}}</p>
<h2>ENGAGEMENT DU DEMANDEUR</h2>
<p>Le demandeur s'engage à respecter les lois et institutions de la République de Côte d'Ivoire et certifie l'exactitude des informations fournies.</p>
<p>Le demandeur : _____________________</p></div>`,
  },
  {
    code: 'fam2_acte_notoriete_familiale',
    name: "Accord d'acte de notoriété familiale",
    category: 'juridique_admin',
    price: 5000, priceMax: 15000,
    description: "Acte de notoriété attestant la composition d'une famille, la qualité d'héritier ou la situation matrimoniale en l'absence d'actes d'état civil.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'beneficiaire',label:"Nom du bénéficiaire de l'acte",type:'text',required:true},
      {key:'objet_notoriete',label:"Objet de la notoriété à établir",type:'textarea',required:true},
      {key:'temoin_1',label:"Nom et qualité du témoin 1",type:'text',required:true},
      {key:'temoin_2',label:"Nom et qualité du témoin 2",type:'text',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE NOTORIÉTÉ FAMILIALE</h1>
<p>Nous soussignés {{temoin_1}} et {{temoin_2}}, témoins instrumentaires,</p>
<p>certifions, sous serment et engagement de responsabilité, que :</p>
<h2>OBJET DE LA NOTORIÉTÉ</h2>
<p>Bénéficiaire : {{beneficiaire}}</p>
<p>{{objet_notoriete}}</p>
<h2>ATTESTATION</h2>
<p>La présente notoriété est établie à la demande de l'intéressé(e) pour servir et valoir ce que de droit, en l'absence d'acte d'état civil régulier.</p>
<p>Le {{date_acte}}</p>
<p>Témoin 1 : _____________________ &nbsp;&nbsp; Témoin 2 : _____________________</p></div>`,
  },
  {
    code: 'fam2_tutelle_mineur',
    name: "Accord de tutelle d'un enfant mineur",
    category: 'juridique_admin',
    price: 7000, priceMax: 20000,
    description: "Convention organisant la tutelle d'un enfant mineur orphelin ou privé de représentation parentale, désignant le tuteur et fixant ses obligations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'enfant_mineur',label:"Nom et prénoms de l'enfant mineur",type:'text',required:true},
      {key:'date_naissance_enfant',label:"Date de naissance de l'enfant",type:'date',required:true},
      {key:'nom_tuteur',label:"Nom et prénoms du tuteur désigné",type:'text',required:true},
      {key:'motif_tutelle',label:"Motif de l'ouverture de la tutelle",type:'textarea',required:true},
      {key:'biens_gerer',label:"Biens du mineur à gérer",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE TUTELLE D'UN ENFANT MINEUR</h1>
<p>Mineur : {{enfant_mineur}}, né(e) le {{date_naissance_enfant}}</p>
<p>Tuteur désigné : {{nom_tuteur}}</p>
<h2>MOTIF DE LA TUTELLE</h2>
<p>{{motif_tutelle}}</p>
<h2>BIENS À GÉRER</h2>
<p>{{biens_gerer}}</p>
<h2>OBLIGATIONS DU TUTEUR</h2>
<p>Le tuteur s'engage à administrer les biens du mineur en bon père de famille, à rendre compte annuellement de sa gestion et à agir en toutes circonstances dans l'intérêt supérieur de l'enfant.</p>
<p>Tuteur : _____________________ &nbsp;&nbsp; Juge tutélaire : _____________________</p></div>`,
  },
  {
    code: 'fam2_gestion_biens_mineur',
    name: "Accord de gestion des biens d'un mineur (administrateur légal)",
    category: 'juridique_admin',
    price: 6000, priceMax: 18000,
    description: "Convention précisant les pouvoirs de l'administrateur légal des biens d'un mineur et les actes nécessitant une autorisation judiciaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'administrateur',label:"Nom de l'administrateur légal",type:'text',required:true},
      {key:'mineur',label:"Nom de l'enfant mineur",type:'text',required:true},
      {key:'biens_mineur',label:"Description des biens du mineur",type:'textarea',required:true},
      {key:'actes_autorises',label:"Actes autorisés sans recours au juge",type:'textarea',required:true},
      {key:'actes_soumis_autorisation',label:"Actes soumis à autorisation judiciaire",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DES BIENS D'UN MINEUR</h1>
<p>Administrateur légal : {{administrateur}}</p>
<p>Enfant mineur : {{mineur}}</p>
<h2>BIENS DU MINEUR</h2>
<p>{{biens_mineur}}</p>
<h2>ACTES AUTORISÉS SANS JUGE</h2>
<p>{{actes_autorises}}</p>
<h2>ACTES SOUMIS À AUTORISATION</h2>
<p>{{actes_soumis_autorisation}}</p>
<h2>REDDITION DE COMPTES</h2>
<p>L'administrateur légal rendra compte de sa gestion chaque année et lors de la majorité du mineur.</p>
<p>Administrateur : _____________________</p></div>`,
  },
  {
    code: 'fam2_reforme_protection_incapable',
    name: "Accord de réforme du régime de protection d'un incapable",
    category: 'juridique_admin',
    price: 8000, priceMax: 24000,
    description: "Requête et accord pour modifier le régime de protection juridique d'un majeur incapable, passant de sauvegarde à curatelle ou tutelle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      {key:'nom_incapable',label:"Nom de la personne protégée",type:'text',required:true},
      {key:'regime_actuel',label:"Régime de protection actuel",type:'text',required:true},
      {key:'regime_demande',label:"Régime de protection demandé",type:'text',required:true},
      {key:'motifs_reforme',label:"Motifs justifiant la réforme",type:'textarea',required:true},
      {key:'nouveau_protecteur',label:"Nom du nouveau tuteur ou curateur proposé",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN RÉFORME DU RÉGIME DE PROTECTION</h1>
<p>Personne protégée : {{nom_incapable}}</p>
<p>Régime actuel : {{regime_actuel}}</p>
<p>Régime demandé : {{regime_demande}}</p>
<p>Nouveau protecteur proposé : {{nouveau_protecteur}}</p>
<h2>MOTIFS</h2>
<p>{{motifs_reforme}}</p>
<h2>DEMANDE AU TRIBUNAL</h2>
<p>Il est demandé au juge des tutelles de prononcer la modification du régime de protection et de désigner le nouveau protecteur susvisé.</p>
<p>Le demandeur : _____________________</p></div>`,
  },
  {
    code: 'fam2_placement_familial',
    name: "Accord de placement familial (enfant en danger)",
    category: 'juridique_admin',
    price: 6000, priceMax: 16000,
    description: "Convention de placement familial d'un enfant en danger organisée par l'autorité compétente ou à l'amiable entre les parties concernées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'enfant',label:"Nom et âge de l'enfant",type:'text',required:true},
      {key:'famille_accueil',label:"Nom de la famille d'accueil",type:'text',required:true},
      {key:'motif_placement',label:"Motif du placement",type:'textarea',required:true},
      {key:'duree_placement',label:"Durée du placement",type:'text',required:true},
      {key:'conditions_retour',label:"Conditions de retour dans la famille d'origine",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PLACEMENT FAMILIAL</h1>
<p>Enfant : {{enfant}}</p>
<p>Famille d'accueil : {{famille_accueil}}</p>
<h2>MOTIF DU PLACEMENT</h2>
<p>{{motif_placement}}</p>
<h2>DURÉE</h2>
<p>{{duree_placement}}</p>
<h2>CONDITIONS DE RETOUR</h2>
<p>{{conditions_retour}}</p>
<h2>DROITS DE VISITE</h2>
<p>Les parents d'origine conservent un droit de visite encadré selon les modalités définies par l'autorité de placement.</p>
<p>Famille d'accueil : _____________________ &nbsp;&nbsp; Autorité : _____________________</p></div>`,
  },
  {
    code: 'fam2_prise_en_charge_parent',
    name: "Accord de prise en charge d'un parent vieillissant (obligation alimentaire)",
    category: 'juridique_admin',
    price: 5000, priceMax: 14000,
    description: "Convention entre enfants fixant la répartition de l'obligation alimentaire envers un parent vieillissant ou dépendant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'parent_beneficiaire',label:"Nom du parent bénéficiaire",type:'text',required:true},
      {key:'enfants_debiteurs',label:"Noms et parts contributives de chaque enfant",type:'textarea',required:true},
      {key:'montant_mensuel',label:"Montant mensuel total de la pension alimentaire (FCFA)",type:'text',required:true},
      {key:'modalites_paiement',label:"Modalités de versement",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la contribution",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRISE EN CHARGE D'UN PARENT VIEILLISSANT</h1>
<p>Parent bénéficiaire : {{parent_beneficiaire}}</p>
<h2>RÉPARTITION DE L'OBLIGATION ALIMENTAIRE</h2>
<p>{{enfants_debiteurs}}</p>
<h2>MONTANT ET MODALITÉS</h2>
<p>Pension mensuelle totale : {{montant_mensuel}} FCFA</p>
<p>{{modalites_paiement}}</p>
<p>Prise d'effet : {{date_debut}}</p>
<h2>RÉVISION</h2>
<p>La contribution est révisable chaque année ou en cas de changement notable de situation de l'une des parties.</p>
<p>Signatures des enfants : _____________________</p></div>`,
  },
  {
    code: 'fam2_repartition_charges_epoux',
    name: "Accord de répartition des charges entre époux",
    category: 'juridique_admin',
    price: 5000, priceMax: 14000,
    description: "Convention fixant entre époux la répartition des charges du ménage, des dettes communes et des contributions au logement familial.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_epoux',label:"Nom de l'époux",type:'text',required:true},
      {key:'nom_epouse',label:"Nom de l'épouse",type:'text',required:true},
      {key:'charges_epoux',label:"Charges assumées par l'époux",type:'textarea',required:true},
      {key:'charges_epouse',label:"Charges assumées par l'épouse",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE RÉPARTITION DES CHARGES ENTRE ÉPOUX</h1>
<p>Époux : {{nom_epoux}} &nbsp;|&nbsp; Épouse : {{nom_epouse}}</p>
<h2>CHARGES DE L'ÉPOUX</h2>
<p>{{charges_epoux}}</p>
<h2>CHARGES DE L'ÉPOUSE</h2>
<p>{{charges_epouse}}</p>
<h2>DURÉE ET RÉVISION</h2>
<p>Le présent accord, conclu le {{date_accord}}, est révisable d'un commun accord en cas de changement de situation.</p>
<p>L'Époux : _____________________ &nbsp;&nbsp; L'Épouse : _____________________</p></div>`,
  },
  {
    code: 'fam2_donation_enfants',
    name: "Accord de donation aux enfants (avancement d'hoirie)",
    category: 'juridique_admin',
    price: 8000, priceMax: 25000,
    description: "Acte de donation consentie par un parent à un ou plusieurs enfants à titre d'avancement sur la part successorale future.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'donateur',label:"Nom du donateur (parent)",type:'text',required:true},
      {key:'donataire',label:"Nom du ou des donataires (enfants)",type:'text',required:true},
      {key:'bien_donne',label:"Description du bien ou somme donnée",type:'textarea',required:true},
      {key:'valeur_donation',label:"Valeur estimée de la donation (FCFA)",type:'text',required:true},
      {key:'caractere',label:"Caractère de la donation (avancement ou hors part)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE DONATION AUX ENFANTS — AVANCEMENT D'HOIRIE</h1>
<p>Donateur : {{donateur}}</p>
<p>Donataire(s) : {{donataire}}</p>
<h2>OBJET DE LA DONATION</h2>
<p>{{bien_donne}}</p>
<p>Valeur : {{valeur_donation}} FCFA</p>
<p>Caractère : {{caractere}}</p>
<h2>RAPPORT À SUCCESSION</h2>
<p>La présente donation sera rapportée à la succession du donateur selon les règles du droit ivoirien des successions, sauf stipulation contraire expressément mentionnée.</p>
<p>Donateur : _____________________ &nbsp;&nbsp; Donataire : _____________________</p></div>`,
  },
  {
    code: 'fam2_partage_concubins',
    name: "Accord de partage de bien commun entre concubins",
    category: 'juridique_admin',
    price: 6000, priceMax: 18000,
    description: "Convention amiable de partage des biens acquis en commun par des concubins lors de la rupture de leur union libre.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'concubin_a',label:"Nom du concubin A",type:'text',required:true},
      {key:'concubin_b',label:"Nom du concubin B",type:'text',required:true},
      {key:'biens_communs',label:"Description des biens acquis en commun",type:'textarea',required:true},
      {key:'partage_prevu',label:"Répartition convenue",type:'textarea',required:true},
      {key:'date_rupture',label:"Date de rupture de la vie commune",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTAGE ENTRE CONCUBINS</h1>
<p>Concubin A : {{concubin_a}} &nbsp;|&nbsp; Concubin B : {{concubin_b}}</p>
<p>Rupture de la vie commune : {{date_rupture}}</p>
<h2>BIENS COMMUNS</h2>
<p>{{biens_communs}}</p>
<h2>RÉPARTITION CONVENUE</h2>
<p>{{partage_prevu}}</p>
<h2>DÉCLARATION FINALE</h2>
<p>Chaque partie se déclare remplie de ses droits et renonce à toute réclamation relative aux biens visés au présent accord.</p>
<p>Concubin A : _____________________ &nbsp;&nbsp; Concubin B : _____________________</p></div>`,
  },
  {
    code: 'fam2_indivision_familiale',
    name: "Accord de gestion d'une indivision familiale",
    category: 'juridique_admin',
    price: 7000, priceMax: 20000,
    description: "Convention organisant la gestion des biens indivis au sein d'une famille, définissant les droits et obligations de chaque indivisaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'indivisaires',label:"Noms et quotes-parts des indivisaires",type:'textarea',required:true},
      {key:'biens_indivis',label:"Description des biens indivis",type:'textarea',required:true},
      {key:'gerant',label:"Nom du gérant désigné",type:'text',required:true},
      {key:'regles_gestion',label:"Règles de gestion et de décision",type:'textarea',required:true},
      {key:'duree_convention',label:"Durée de la convention d'indivision",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE GESTION D'UNE INDIVISION FAMILIALE</h1>
<h2>PARTIES ET QUOTES-PARTS</h2>
<p>{{indivisaires}}</p>
<h2>BIENS INDIVIS</h2>
<p>{{biens_indivis}}</p>
<h2>GÉRANT DE L'INDIVISION</h2>
<p>{{gerant}}</p>
<h2>RÈGLES DE GESTION</h2>
<p>{{regles_gestion}}</p>
<h2>DURÉE</h2>
<p>{{duree_convention}}</p>
<p>Signatures des indivisaires : _____________________</p></div>`,
  },
  {
    code: 'fam2_rapport_mediation',
    name: "Rapport de médiation familiale",
    category: 'juridique_admin',
    price: 5000, priceMax: 14000,
    description: "Document de synthèse du médiateur familial exposant les points d'accord et de désaccord à l'issue d'une médiation familiale.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 55,
    fieldsJson: F([
      {key:'mediateur',label:"Nom du médiateur",type:'text',required:true},
      {key:'parties',label:"Noms des parties en médiation",type:'text',required:true},
      {key:'date_seances',label:"Dates des séances de médiation",type:'textarea',required:true},
      {key:'points_accord',label:"Points d'accord atteints",type:'textarea',required:true},
      {key:'points_desaccord',label:"Points restant en désaccord",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE MÉDIATION FAMILIALE</h1>
<p>Médiateur : {{mediateur}}</p>
<p>Parties : {{parties}}</p>
<h2>SÉANCES TENUES</h2>
<p>{{date_seances}}</p>
<h2>POINTS D'ACCORD</h2>
<p>{{points_accord}}</p>
<h2>POINTS EN DÉSACCORD</h2>
<p>{{points_desaccord}}</p>
<h2>CONCLUSION</h2>
<p>Le médiateur certifie l'exactitude du présent rapport et la libre participation des parties au processus de médiation.</p>
<p>Médiateur : _____________________</p></div>`,
  },
  {
    code: 'fam2_charte_famille_ci',
    name: "Charte de la protection de la famille en Côte d'Ivoire",
    category: 'juridique_admin',
    price: 4000, priceMax: 12000,
    description: "Charte familiale fixant les valeurs, engagements et règles de vie commune adoptés par les membres d'une famille ivoirienne.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'nom_famille',label:"Nom de la famille",type:'text',required:true},
      {key:'membres',label:"Liste des membres signataires",type:'textarea',required:true},
      {key:'valeurs',label:"Valeurs et principes fondateurs",type:'textarea',required:true},
      {key:'engagements',label:"Engagements des membres",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA PROTECTION DE LA FAMILLE</h1>
<h2>FAMILLE {{nom_famille}}</h2>
<h2>MEMBRES SIGNATAIRES</h2>
<p>{{membres}}</p>
<h2>VALEURS ET PRINCIPES</h2>
<p>{{valeurs}}</p>
<h2>ENGAGEMENTS</h2>
<p>{{engagements}}</p>
<h2>ADOPTION</h2>
<p>La présente charte est adoptée librement le {{date_adoption}} par tous les membres de la famille, qui s'engagent à en respecter les termes.</p>
<p>Signatures : _____________________</p></div>`,
  },

  // ── 25 SUCCESSIONS / HÉRITAGES (suc_) ──────────────────────────────────────
  {
    code: 'suc_renonciation',
    name: "Accord de renonciation à succession",
    category: 'juridique_admin',
    price: 6000, priceMax: 18000,
    description: "Acte par lequel un héritier renonce expressément à la succession du défunt, avec toutes ses conséquences juridiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_heritier',label:"Nom et prénoms de l'héritier renonçant",type:'text',required:true},
      {key:'nom_defunt',label:"Nom et prénoms du défunt",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'motif',label:"Motif de la renonciation",type:'textarea',required:false},
      {key:'greffe',label:"Greffe du Tribunal compétent",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE RENONCIATION À SUCCESSION</h1>
<p>Je soussigné(e) {{nom_heritier}}, héritier(ère) de feu {{nom_defunt}}, décédé(e) le {{date_deces}},</p>
<p>dépose la présente déclaration de renonciation au greffe de {{greffe}}.</p>
<h2>MOTIF</h2>
<p>{{motif}}</p>
<h2>EFFETS DE LA RENONCIATION</h2>
<p>Le renonçant est réputé n'avoir jamais été héritier. Il ne peut être tenu des dettes du défunt et perd tout droit sur l'actif successoral.</p>
<p>Le renonçant : _____________________ &nbsp;&nbsp; Date : _____________________</p></div>`,
  },
  {
    code: 'suc_acceptation_pure',
    name: "Accord d'acceptation pure et simple de succession",
    category: 'juridique_admin',
    price: 5000, priceMax: 15000,
    description: "Déclaration d'acceptation pure et simple de succession engageant l'héritier au paiement des dettes au-delà de l'actif reçu.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_heritier',label:"Nom de l'héritier acceptant",type:'text',required:true},
      {key:'nom_defunt',label:"Nom du défunt",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'lien_parente',label:"Lien de parenté avec le défunt",type:'text',required:true},
      {key:'estimation_actif',label:"Estimation sommaire de l'actif successoral",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION D'ACCEPTATION PURE ET SIMPLE DE SUCCESSION</h1>
<p>Je soussigné(e) {{nom_heritier}}, {{lien_parente}} de feu {{nom_defunt}}, décédé(e) le {{date_deces}},</p>
<p>déclare accepter purement et simplement la succession du défunt.</p>
<h2>ESTIMATION DE L'ACTIF</h2>
<p>{{estimation_actif}}</p>
<h2>ENGAGEMENT</h2>
<p>En acceptant purement et simplement, le signataire reconnaît être tenu des dettes successorales au-delà des biens reçus, sur ses biens propres.</p>
<p>L'héritier : _____________________</p></div>`,
  },
  {
    code: 'suc_acceptation_actif_net',
    name: "Accord d'acceptation à concurrence de l'actif net",
    category: 'juridique_admin',
    price: 6000, priceMax: 18000,
    description: "Déclaration d'acceptation successorale limitant la responsabilité de l'héritier aux dettes dans la limite de l'actif reçu.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_heritier',label:"Nom de l'héritier",type:'text',required:true},
      {key:'nom_defunt',label:"Nom du défunt",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'inventaire_actif',label:"Inventaire de l'actif successoral",type:'textarea',required:true},
      {key:'inventaire_passif',label:"Inventaire du passif successoral",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCEPTATION À CONCURRENCE DE L'ACTIF NET</h1>
<p>Héritier : {{nom_heritier}} — Défunt : {{nom_defunt}} — Décès : {{date_deces}}</p>
<h2>ACTIF SUCCESSORAL</h2>
<p>{{inventaire_actif}}</p>
<h2>PASSIF SUCCESSORAL</h2>
<p>{{inventaire_passif}}</p>
<h2>DÉCLARATION</h2>
<p>L'héritier déclare accepter la succession à concurrence de l'actif net, limitant ainsi sa responsabilité aux dettes dans la mesure des biens recueillis.</p>
<p>L'héritier : _____________________</p></div>`,
  },
  {
    code: 'suc_acte_notoriete',
    name: "Acte de notoriété successorale",
    category: 'juridique_admin',
    price: 6000, priceMax: 18000,
    description: "Acte attestant la qualité d'héritier d'une ou plusieurs personnes, dressé en présence de témoins pour établir la dévolution successorale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_defunt',label:"Nom du défunt",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'lieu_deces',label:"Lieu du décès",type:'text',required:true},
      {key:'heritiers',label:"Liste des héritiers et liens de parenté",type:'textarea',required:true},
      {key:'temoin_1',label:"Témoin 1",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE NOTORIÉTÉ SUCCESSORALE</h1>
<p>Défunt : {{nom_defunt}}, décédé(e) le {{date_deces}} à {{lieu_deces}}</p>
<h2>HÉRITIERS RECONNUS</h2>
<p>{{heritiers}}</p>
<h2>ATTESTATION DES TÉMOINS</h2>
<p>Le témoin soussigné {{temoin_1}} certifie l'exactitude des informations relatives aux héritiers susmentionnés.</p>
<h2>VALEUR PROBATOIRE</h2>
<p>Le présent acte de notoriété fait foi de la qualité d'héritier jusqu'à preuve du contraire.</p>
<p>Témoin : _____________________</p></div>`,
  },
  {
    code: 'suc_partage_amiable',
    name: "Accord de partage successoral amiable (tous héritiers)",
    category: 'juridique_admin',
    price: 12000, priceMax: 40000,
    description: "Convention de partage amiable de l'ensemble des biens successoraux entre tous les héritiers, mettant fin à l'indivision.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_defunt',label:"Nom du défunt",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'heritiers_parts',label:"Héritiers et quotes-parts légales",type:'textarea',required:true},
      {key:'biens_succession',label:"Description des biens à partager",type:'textarea',required:true},
      {key:'attribution_biens',label:"Attribution de chaque bien à chaque héritier",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTAGE SUCCESSORAL AMIABLE</h1>
<p>Succession de : {{nom_defunt}}, décédé(e) le {{date_deces}}</p>
<h2>HÉRITIERS ET QUOTES-PARTS</h2>
<p>{{heritiers_parts}}</p>
<h2>MASSE SUCCESSORALE</h2>
<p>{{biens_succession}}</p>
<h2>ATTRIBUTION DES BIENS</h2>
<p>{{attribution_biens}}</p>
<h2>FIN D'INDIVISION</h2>
<p>Le présent partage met fin à l'indivision successorale. Chaque héritier déclare être rempli de ses droits et renonce à toute réclamation ultérieure sur les biens attribués aux autres.</p>
<p>Signatures de tous les héritiers : _____________________</p></div>`,
  },
  {
    code: 'suc_partage_partiel',
    name: "Accord de partage partiel de succession",
    category: 'juridique_admin',
    price: 8000, priceMax: 24000,
    description: "Convention portant partage partiel de certains biens successoraux, les autres demeurant en indivision jusqu'au partage définitif.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_defunt',label:"Nom du défunt",type:'text',required:true},
      {key:'heritiers',label:"Héritiers parties à l'accord",type:'textarea',required:true},
      {key:'biens_partages',label:"Biens faisant l'objet du partage partiel",type:'textarea',required:true},
      {key:'biens_restants',label:"Biens restant en indivision",type:'textarea',required:true},
      {key:'date_partage',label:"Date du partage partiel",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTAGE PARTIEL DE SUCCESSION</h1>
<p>Succession de : {{nom_defunt}}</p>
<p>Date du partage : {{date_partage}}</p>
<h2>HÉRITIERS CONCERNÉS</h2>
<p>{{heritiers}}</p>
<h2>BIENS PARTAGÉS</h2>
<p>{{biens_partages}}</p>
<h2>BIENS EN INDIVISION</h2>
<p>{{biens_restants}}</p>
<p>Signatures : _____________________</p></div>`,
  },
  {
    code: 'suc_viager',
    name: "Accord de vente en viager (rente viagère)",
    category: 'juridique_admin',
    price: 10000, priceMax: 32000,
    description: "Convention de vente en viager d'un bien immobilier avec versement d'un bouquet et d'une rente viagère au vendeur crédirentier.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'credirentier',label:"Nom du vendeur crédirentier",type:'text',required:true},
      {key:'debirentier',label:"Nom de l'acheteur débirentier",type:'text',required:true},
      {key:'bien_immobilier',label:"Description du bien vendu",type:'textarea',required:true},
      {key:'montant_bouquet',label:"Montant du bouquet initial (FCFA)",type:'text',required:true},
      {key:'rente_mensuelle',label:"Montant de la rente mensuelle (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE VENTE EN VIAGER</h1>
<p>Crédirentier (vendeur) : {{credirentier}}</p>
<p>Débirentier (acheteur) : {{debirentier}}</p>
<h2>BIEN VENDU</h2>
<p>{{bien_immobilier}}</p>
<h2>CONDITIONS FINANCIÈRES</h2>
<p>Bouquet : {{montant_bouquet}} FCFA versé comptant.</p>
<p>Rente viagère mensuelle : {{rente_mensuelle}} FCFA, versée jusqu'au décès du crédirentier.</p>
<h2>INDEXATION ET GARANTIE</h2>
<p>La rente est indexée sur le coût de la vie. Un privilège du vendeur et une clause résolutoire garantissent le paiement.</p>
<p>Crédirentier : _____________________ &nbsp;&nbsp; Débirentier : _____________________</p></div>`,
  },
  {
    code: 'suc_donation_avancement',
    name: "Accord de donation en avancement de part",
    category: 'juridique_admin',
    price: 8000, priceMax: 24000,
    description: "Acte de donation entre vifs consentie à un héritier réservataire à valoir sur sa part dans la succession future du donateur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'donateur',label:"Nom du donateur",type:'text',required:true},
      {key:'donataire',label:"Nom du donataire héritier",type:'text',required:true},
      {key:'objet_donation',label:"Objet de la donation",type:'textarea',required:true},
      {key:'valeur',label:"Valeur de la donation (FCFA)",type:'text',required:true},
      {key:'date_donation',label:"Date de la donation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DONATION EN AVANCEMENT DE PART SUCCESSORALE</h1>
<p>Donateur : {{donateur}} &nbsp;|&nbsp; Donataire : {{donataire}}</p>
<p>Date : {{date_donation}}</p>
<h2>OBJET ET VALEUR</h2>
<p>{{objet_donation}}</p>
<p>Valeur : {{valeur}} FCFA</p>
<h2>CONDITION DE RAPPORT</h2>
<p>La présente donation est faite en avancement de part héréditaire et devra être rapportée à la succession du donateur, sauf dispense expresse.</p>
<p>Donateur : _____________________ &nbsp;&nbsp; Donataire : _____________________</p></div>`,
  },
  {
    code: 'suc_rapport_succession',
    name: "Accord de rapport à succession (rapport de don)",
    category: 'juridique_admin',
    price: 6000, priceMax: 18000,
    description: "Convention par laquelle un héritier reconnaît devoir rapporter à la masse successorale les donations reçues du vivant du défunt.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'heritier_rapportant',label:"Nom de l'héritier rapportant",type:'text',required:true},
      {key:'nom_defunt',label:"Nom du défunt donateur",type:'text',required:true},
      {key:'bien_rapporte',label:"Description du bien ou somme à rapporter",type:'textarea',required:true},
      {key:'valeur_rapport',label:"Valeur du rapport (FCFA)",type:'text',required:true},
      {key:'modalites_rapport',label:"Modalités du rapport (en nature ou en valeur)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE RAPPORT À SUCCESSION</h1>
<p>Héritier rapportant : {{heritier_rapportant}}</p>
<p>Succession de : {{nom_defunt}}</p>
<h2>BIEN RAPPORTÉ</h2>
<p>{{bien_rapporte}}</p>
<p>Valeur : {{valeur_rapport}} FCFA</p>
<h2>MODALITÉS</h2>
<p>{{modalites_rapport}}</p>
<h2>EFFET</h2>
<p>Le rapport est imputé sur la part de l'héritier rapportant dans la succession, conformément aux règles de l'égalité entre cohéritiers.</p>
<p>L'héritier : _____________________</p></div>`,
  },
  {
    code: 'suc_clause_retour',
    name: "Accord de clause de retour conventionnelle (don avec retour)",
    category: 'juridique_admin',
    price: 7000, priceMax: 20000,
    description: "Acte de donation assortie d'une clause de retour au profit du donateur en cas de prédécès du donataire ou de ses descendants.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'donateur',label:"Nom du donateur",type:'text',required:true},
      {key:'donataire',label:"Nom du donataire",type:'text',required:true},
      {key:'bien_donne',label:"Bien objet de la donation",type:'textarea',required:true},
      {key:'conditions_retour',label:"Conditions de mise en oeuvre du droit de retour",type:'textarea',required:true},
      {key:'date_donation',label:"Date de la donation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DONATION AVEC CLAUSE DE RETOUR CONVENTIONNELLE</h1>
<p>Donateur : {{donateur}} &nbsp;|&nbsp; Donataire : {{donataire}}</p>
<p>Date : {{date_donation}}</p>
<h2>BIEN DONNÉ</h2>
<p>{{bien_donne}}</p>
<h2>CLAUSE DE RETOUR</h2>
<p>En cas de prédécès du donataire sans descendance, le bien donné retournera de plein droit au donateur ou à ses héritiers, aux conditions suivantes :</p>
<p>{{conditions_retour}}</p>
<p>Donateur : _____________________ &nbsp;&nbsp; Donataire : _____________________</p></div>`,
  },
  {
    code: 'suc_option_successorale',
    name: "Accord d'option successorale (droit de prélèvement)",
    category: 'juridique_admin',
    price: 6000, priceMax: 17000,
    description: "Acte formalisant l'exercice du droit d'option successorale d'un héritier et, le cas échéant, de son droit de prélèvement prioritaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_heritier',label:"Nom de l'héritier",type:'text',required:true},
      {key:'nom_defunt',label:"Nom du défunt",type:'text',required:true},
      {key:'option_choisie',label:"Option retenue (acceptation, renonciation, bénéfice d'inventaire)",type:'text',required:true},
      {key:'bien_preleveme',label:"Bien revendiqué en droit de prélèvement (si applicable)",type:'textarea',required:false},
      {key:'date_option',label:"Date d'exercice de l'option",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>DÉCLARATION D'OPTION SUCCESSORALE</h1>
<p>Héritier : {{nom_heritier}} — Succession de : {{nom_defunt}}</p>
<p>Date : {{date_option}}</p>
<h2>OPTION CHOISIE</h2>
<p>{{option_choisie}}</p>
<h2>DROIT DE PRÉLÈVEMENT</h2>
<p>{{bien_preleveme}}</p>
<p>L'héritier : _____________________</p></div>`,
  },
  {
    code: 'suc_legs_particulier',
    name: "Accord de legs particulier (testament)",
    category: 'juridique_admin',
    price: 7000, priceMax: 20000,
    description: "Disposition testamentaire portant legs d'un bien déterminé à un légataire particulier, avec les conditions et charges éventuelles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'testateur',label:"Nom du testateur",type:'text',required:true},
      {key:'legataire',label:"Nom du légataire particulier",type:'text',required:true},
      {key:'bien_legue',label:"Description du bien légué",type:'textarea',required:true},
      {key:'charges',label:"Charges ou conditions du legs",type:'textarea',required:false},
      {key:'date_testament',label:"Date du testament",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>LEGS PARTICULIER — EXTRAIT DE TESTAMENT</h1>
<p>Je soussigné(e) {{testateur}}, sain(e) de corps et d'esprit, lègue à {{legataire}} :</p>
<h2>BIEN LÉGUÉ</h2>
<p>{{bien_legue}}</p>
<h2>CHARGES ET CONDITIONS</h2>
<p>{{charges}}</p>
<h2>DISPOSITIONS GÉNÉRALES</h2>
<p>Le présent legs est établi conformément au droit successoral ivoirien dans le respect de la réserve héréditaire des héritiers réservataires.</p>
<p>Fait le {{date_testament}}</p>
<p>Le testateur : _____________________</p></div>`,
  },
  {
    code: 'suc_legs_universel',
    name: "Accord de legs universel (testament)",
    category: 'juridique_admin',
    price: 8000, priceMax: 25000,
    description: "Disposition testamentaire instituant un légataire universel appelé à recueillir l'intégralité du patrimoine du testateur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'testateur',label:"Nom du testateur",type:'text',required:true},
      {key:'legataire_universel',label:"Nom du légataire universel",type:'text',required:true},
      {key:'description_patrimoine',label:"Description sommaire du patrimoine",type:'textarea',required:true},
      {key:'reserve_hereditaire',label:"Précision sur la réserve héréditaire maintenue",type:'textarea',required:false},
      {key:'date_testament',label:"Date du testament",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>TESTAMENT — LEGS UNIVERSEL</h1>
<p>Je soussigné(e) {{testateur}}, institue {{legataire_universel}} légataire universel de l'ensemble de mes biens.</p>
<h2>PATRIMOINE CONCERNÉ</h2>
<p>{{description_patrimoine}}</p>
<h2>RÉSERVE HÉRÉDITAIRE</h2>
<p>{{reserve_hereditaire}}</p>
<h2>CONDITIONS D'EXÉCUTION</h2>
<p>Le légataire universel sera tenu de payer les dettes et charges de la succession, d'acquitter les legs particuliers et de respecter la réserve des héritiers réservataires.</p>
<p>Fait le {{date_testament}}</p>
<p>Le testateur : _____________________</p></div>`,
  },
  {
    code: 'suc_desheritance_partielle',
    name: "Accord de déshéritation partielle (réserve héréditaire)",
    category: 'juridique_admin',
    price: 8000, priceMax: 22000,
    description: "Acte testamentaire réduisant la part d'un héritier à la seule quotité réservataire, dans les limites permises par la loi ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      {key:'testateur',label:"Nom du testateur",type:'text',required:true},
      {key:'heritier_concerne',label:"Nom de l'héritier partiellement déshérité",type:'text',required:true},
      {key:'motif',label:"Motif de la déshéritation partielle",type:'textarea',required:true},
      {key:'quotite_reservataire',label:"Quotité réservataire conservée",type:'text',required:true},
      {key:'beneficiaire_quotite',label:"Bénéficiaire de la quotité disponible",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DISPOSITION TESTAMENTAIRE — DÉSHÉRITATION PARTIELLE</h1>
<p>Testateur : {{testateur}}</p>
<p>Héritier concerné : {{heritier_concerne}}</p>
<h2>MOTIF</h2>
<p>{{motif}}</p>
<h2>QUOTITÉ RÉSERVATAIRE</h2>
<p>Conformément à la loi, {{heritier_concerne}} conserve sa quotité réservataire de {{quotite_reservataire}}.</p>
<h2>AFFECTATION DE LA QUOTITÉ DISPONIBLE</h2>
<p>La quotité disponible est attribuée à {{beneficiaire_quotite}}.</p>
<p>Le testateur : _____________________</p></div>`,
  },
  {
    code: 'suc_attribution_preferentielle',
    name: "Accord d'attribution préférentielle d'un bien successoral",
    category: 'juridique_admin',
    price: 8000, priceMax: 24000,
    description: "Convention par laquelle les héritiers accordent à l'un d'entre eux l'attribution préférentielle d'un bien successoral avec soulte éventuelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'beneficiaire',label:"Héritier bénéficiaire de l'attribution préférentielle",type:'text',required:true},
      {key:'nom_defunt',label:"Nom du défunt",type:'text',required:true},
      {key:'bien_attribue',label:"Description du bien attribué",type:'textarea',required:true},
      {key:'valeur_bien',label:"Valeur du bien (FCFA)",type:'text',required:true},
      {key:'soulte',label:"Soulte versée aux autres héritiers (FCFA)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD D'ATTRIBUTION PRÉFÉRENTIELLE</h1>
<p>Succession de : {{nom_defunt}}</p>
<p>Bénéficiaire : {{beneficiaire}}</p>
<h2>BIEN ATTRIBUÉ</h2>
<p>{{bien_attribue}}</p>
<p>Valeur : {{valeur_bien}} FCFA</p>
<h2>SOULTE</h2>
<p>{{soulte}} FCFA versé(e) aux autres cohéritiers en compensation.</p>
<h2>CONSENTEMENT</h2>
<p>Tous les cohéritiers consentent à la présente attribution préférentielle et confirment avoir reçu leur part.</p>
<p>Signatures : _____________________</p></div>`,
  },
  {
    code: 'suc_maintien_indivision',
    name: "Accord de maintien dans l'indivision successorale",
    category: 'juridique_admin',
    price: 6000, priceMax: 18000,
    description: "Convention par laquelle les héritiers décident de maintenir certains biens en indivision pendant une durée déterminée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'heritiers',label:"Noms des héritiers indivisaires",type:'textarea',required:true},
      {key:'nom_defunt',label:"Nom du défunt",type:'text',required:true},
      {key:'biens_indivis',label:"Biens maintenus en indivision",type:'textarea',required:true},
      {key:'duree',label:"Durée du maintien en indivision",type:'text',required:true},
      {key:'gerant_indivision',label:"Gérant de l'indivision désigné",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAINTIEN EN INDIVISION SUCCESSORALE</h1>
<p>Succession de : {{nom_defunt}}</p>
<h2>INDIVISAIRES</h2>
<p>{{heritiers}}</p>
<h2>BIENS MAINTENUS EN INDIVISION</h2>
<p>{{biens_indivis}}</p>
<h2>DURÉE ET GESTION</h2>
<p>Durée : {{duree}}</p>
<p>Gérant désigné : {{gerant_indivision}}</p>
<p>Signatures : _____________________</p></div>`,
  },
  {
    code: 'suc_licitation',
    name: "Accord de licitation d'un bien indivis (vente)",
    category: 'juridique_admin',
    price: 8000, priceMax: 25000,
    description: "Convention organisant la vente aux enchères ou de gré à gré d'un bien indivis pour en permettre le partage du prix entre les indivisaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'heritiers_vendeurs',label:"Noms des héritiers vendeurs",type:'textarea',required:true},
      {key:'bien_vendu',label:"Description du bien à vendre",type:'textarea',required:true},
      {key:'valeur_estimee',label:"Valeur estimée (FCFA)",type:'text',required:true},
      {key:'mode_vente',label:"Mode de vente (enchères ou gré à gré)",type:'text',required:true},
      {key:'repartition_prix',label:"Répartition du prix entre indivisaires",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LICITATION D'UN BIEN INDIVIS</h1>
<h2>VENDEURS INDIVISAIRES</h2>
<p>{{heritiers_vendeurs}}</p>
<h2>BIEN VENDU</h2>
<p>{{bien_vendu}}</p>
<p>Valeur estimée : {{valeur_estimee}} FCFA</p>
<h2>MODE DE VENTE</h2>
<p>{{mode_vente}}</p>
<h2>RÉPARTITION DU PRIX</h2>
<p>{{repartition_prix}}</p>
<p>Signatures : _____________________</p></div>`,
  },
  {
    code: 'suc_succession_internationale',
    name: "Accord de règlement de succession internationale (biens à l'étranger)",
    category: 'juridique_admin',
    price: 15000, priceMax: 50000,
    description: "Convention réglant la dévolution et le partage d'une succession comprenant des biens situés hors de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_defunt',label:"Nom du défunt",type:'text',required:true},
      {key:'nationalite_defunt',label:"Nationalité du défunt",type:'text',required:true},
      {key:'biens_etranger',label:"Biens situés à l'étranger et pays concernés",type:'textarea',required:true},
      {key:'droit_applicable',label:"Droit applicable à la succession",type:'text',required:true},
      {key:'heritiers',label:"Héritiers et leurs nationalités",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE RÈGLEMENT DE SUCCESSION INTERNATIONALE</h1>
<p>Défunt : {{nom_defunt}} — Nationalité : {{nationalite_defunt}}</p>
<p>Droit applicable : {{droit_applicable}}</p>
<h2>BIENS À L'ÉTRANGER</h2>
<p>{{biens_etranger}}</p>
<h2>HÉRITIERS</h2>
<p>{{heritiers}}</p>
<h2>RÈGLES DE CONFLIT DE LOIS</h2>
<p>Le partage des biens immeubles est régi par la loi du lieu de situation de chaque bien. Les biens meubles sont soumis à la loi nationale du défunt.</p>
<p>Signatures : _____________________</p></div>`,
  },
  {
    code: 'suc_representation',
    name: "Accord de droit de représentation successorale",
    category: 'juridique_admin',
    price: 6000, priceMax: 18000,
    description: "Acte reconnaissant le droit de représentation d'un héritier prédécédé par ses descendants dans une succession.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 50,
    fieldsJson: F([
      {key:'representants',label:"Noms des héritiers représentants",type:'textarea',required:true},
      {key:'represente',label:"Nom de l'héritier représenté (prédécédé)",type:'text',required:true},
      {key:'nom_defunt_principal',label:"Nom du défunt de la succession principale",type:'text',required:true},
      {key:'part_recueillie',label:"Part successorale recueillie par représentation",type:'text',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACTE DE DROIT DE REPRÉSENTATION SUCCESSORALE</h1>
<p>Succession de : {{nom_defunt_principal}}</p>
<p>Héritier représenté (prédécédé) : {{represente}}</p>
<p>Représentants : {{representants}}</p>
<h2>PART RECUEILLIE</h2>
<p>{{part_recueillie}}</p>
<h2>FONDEMENT</h2>
<p>La représentation permet aux descendants de l'héritier prédécédé de prendre sa place dans la succession conformément aux articles du Code civil ivoirien relatifs à la représentation.</p>
<p>Date : {{date_acte}}</p>
<p>Signatures : _____________________</p></div>`,
  },
  {
    code: 'suc_executeur_testamentaire',
    name: "Accord de désignation d'un exécuteur testamentaire",
    category: 'juridique_admin',
    price: 6000, priceMax: 18000,
    description: "Disposition testamentaire ou acte séparé désignant et habilitant un exécuteur testamentaire chargé de veiller à l'exécution des dernières volontés.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'testateur',label:"Nom du testateur",type:'text',required:true},
      {key:'executeur',label:"Nom de l'exécuteur testamentaire désigné",type:'text',required:true},
      {key:'pouvoirs',label:"Pouvoirs conférés à l'exécuteur",type:'textarea',required:true},
      {key:'remuneration',label:"Rémunération ou honoraires prévus",type:'text',required:false},
      {key:'duree_mission',label:"Durée de la mission",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>DÉSIGNATION D'UN EXÉCUTEUR TESTAMENTAIRE</h1>
<p>Je soussigné(e) {{testateur}} désigne {{executeur}} en qualité d'exécuteur testamentaire.</p>
<h2>POUVOIRS CONFÉRÉS</h2>
<p>{{pouvoirs}}</p>
<h2>DURÉE DE LA MISSION</h2>
<p>{{duree_mission}}</p>
<h2>RÉMUNÉRATION</h2>
<p>{{remuneration}}</p>
<h2>OBLIGATIONS DE L'EXÉCUTEUR</h2>
<p>L'exécuteur s'engage à remplir sa mission avec diligence, à rendre compte aux héritiers et à respecter scrupuleusement les dernières volontés du testateur.</p>
<p>Le testateur : _____________________</p></div>`,
  },
  {
    code: 'suc_coutumiere_ci',
    name: "Accord de succession coutumière (droit traditionnel CI)",
    category: 'juridique_admin',
    price: 5000, priceMax: 15000,
    description: "Convention organisant le règlement d'une succession selon les règles coutumières ivoiriennes applicables au groupe ethnique du défunt.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_defunt',label:"Nom du défunt",type:'text',required:true},
      {key:'groupe_ethnique',label:"Groupe ethnique et coutume applicable",type:'text',required:true},
      {key:'autorite_coutumiere',label:"Autorité coutumière présidant le règlement",type:'text',required:true},
      {key:'heritiers_coutumiers',label:"Héritiers selon la coutume",type:'textarea',required:true},
      {key:'biens_repartis',label:"Répartition des biens selon la coutume",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SUCCESSION COUTUMIÈRE</h1>
<p>Succession de : {{nom_defunt}}</p>
<p>Coutume applicable : {{groupe_ethnique}}</p>
<p>Autorité coutumière : {{autorite_coutumiere}}</p>
<h2>HÉRITIERS COUTUMIERS</h2>
<p>{{heritiers_coutumiers}}</p>
<h2>RÉPARTITION DES BIENS</h2>
<p>{{biens_repartis}}</p>
<h2>VALEUR JURIDIQUE</h2>
<p>Le présent accord coutumier peut être homologué par le Tribunal pour lui conférer force exécutoire en droit positif ivoirien.</p>
<p>L'autorité coutumière : _____________________ &nbsp;&nbsp; Les héritiers : _____________________</p></div>`,
  },
  {
    code: 'suc_conversion_fonds_commerce',
    name: "Accord de conversion de succession (fonds de commerce)",
    category: 'juridique_admin',
    price: 10000, priceMax: 32000,
    description: "Convention organisée entre héritiers pour la reprise, la cession ou la liquidation d'un fonds de commerce hérité.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_defunt',label:"Nom du défunt entrepreneur",type:'text',required:true},
      {key:'fonds_commerce',label:"Description du fonds de commerce",type:'textarea',required:true},
      {key:'valeur_fonds',label:"Valeur du fonds (FCFA)",type:'text',required:true},
      {key:'option_retenue',label:"Option retenue (reprise, cession ou liquidation)",type:'text',required:true},
      {key:'heritiers_accord',label:"Héritiers parties à l'accord",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONVERSION DE SUCCESSION — FONDS DE COMMERCE</h1>
<p>Succession de : {{nom_defunt}}</p>
<h2>FONDS DE COMMERCE</h2>
<p>{{fonds_commerce}}</p>
<p>Valeur : {{valeur_fonds}} FCFA</p>
<h2>OPTION RETENUE</h2>
<p>{{option_retenue}}</p>
<h2>HÉRITIERS CONCERNÉS</h2>
<p>{{heritiers_accord}}</p>
<h2>CONDITIONS</h2>
<p>Les parties s'engagent à respecter les obligations fiscales, sociales et commerciales liées au fonds de commerce dans le cadre de l'option retenue.</p>
<p>Signatures : _____________________</p></div>`,
  },
  {
    code: 'suc_conjoint_survivant',
    name: "Accord de succession en présence d'un conjoint survivant",
    category: 'juridique_admin',
    price: 9000, priceMax: 28000,
    description: "Convention réglant les droits du conjoint survivant dans la succession, notamment ses droits au logement et à la pension de réversion.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'conjoint_survivant',label:"Nom du conjoint survivant",type:'text',required:true},
      {key:'nom_defunt',label:"Nom du défunt",type:'text',required:true},
      {key:'regime_matrimonial',label:"Régime matrimonial des époux",type:'text',required:true},
      {key:'droits_logement',label:"Droits sur le logement familial",type:'textarea',required:true},
      {key:'part_successorale',label:"Part successorale du conjoint survivant",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD SUCCESSORAL — CONJOINT SURVIVANT</h1>
<p>Conjoint survivant : {{conjoint_survivant}}</p>
<p>Défunt : {{nom_defunt}}</p>
<p>Régime matrimonial : {{regime_matrimonial}}</p>
<h2>DROITS SUR LE LOGEMENT</h2>
<p>{{droits_logement}}</p>
<h2>PART SUCCESSORALE</h2>
<p>{{part_successorale}}</p>
<h2>DROITS MINIMAUX GARANTIS</h2>
<p>Conformément au Code civil ivoirien, le conjoint survivant bénéficie au minimum d'un droit d'habitation et d'usage sur le logement familial pour une durée d'un an.</p>
<p>Le conjoint survivant : _____________________ &nbsp;&nbsp; Les héritiers : _____________________</p></div>`,
  },
  {
    code: 'suc_inventaire',
    name: "Rapport d'inventaire de succession",
    category: 'juridique_admin',
    price: 7000, priceMax: 20000,
    description: "Inventaire détaillé de l'actif et du passif d'une succession, dressé par un notaire ou un officier compétent, servant de base au partage.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_defunt',label:"Nom du défunt",type:'text',required:true},
      {key:'date_deces',label:"Date du décès",type:'date',required:true},
      {key:'actif_immobilier',label:"Actif immobilier (biens et valeurs)",type:'textarea',required:true},
      {key:'actif_mobilier',label:"Actif mobilier et comptes bancaires",type:'textarea',required:true},
      {key:'passif_dettes',label:"Passif — dettes et charges",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT D'INVENTAIRE DE SUCCESSION</h1>
<p>Défunt : {{nom_defunt}} — Décès le {{date_deces}}</p>
<h2>ACTIF IMMOBILIER</h2>
<p>{{actif_immobilier}}</p>
<h2>ACTIF MOBILIER ET COMPTES</h2>
<p>{{actif_mobilier}}</p>
<h2>PASSIF — DETTES ET CHARGES</h2>
<p>{{passif_dettes}}</p>
<h2>ACTIF NET SUCCESSORAL</h2>
<p>L'actif net est obtenu par déduction du passif de l'actif brut et constitue la masse partageable entre les héritiers.</p>
<p>L'officier instrumentaire : _____________________</p></div>`,
  },
  {
    code: 'suc_charte_transmission',
    name: "Charte de la transmission du patrimoine et des droits des héritiers",
    category: 'juridique_admin',
    price: 4000, priceMax: 12000,
    description: "Charte familiale établissant les principes de transmission du patrimoine, garantissant les droits de chaque héritier et prévenant les conflits.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_famille',label:"Nom de la famille",type:'text',required:true},
      {key:'fondateur',label:"Nom du fondateur ou testateur",type:'text',required:true},
      {key:'principes',label:"Principes de transmission du patrimoine",type:'textarea',required:true},
      {key:'droits_heritiers',label:"Droits garantis à chaque héritier",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE TRANSMISSION DU PATRIMOINE FAMILIAL</h1>
<h2>FAMILLE {{nom_famille}}</h2>
<p>Instituée par {{fondateur}}</p>
<h2>PRINCIPES DE TRANSMISSION</h2>
<p>{{principes}}</p>
<h2>DROITS DES HÉRITIERS</h2>
<p>{{droits_heritiers}}</p>
<h2>ENGAGEMENT COLLECTIF</h2>
<p>Les membres de la famille s'engagent à respecter les principes de la présente charte, adoptée le {{date_adoption}}, afin de préserver l'harmonie familiale et pérenniser le patrimoine transmis.</p>
<p>Signatures : _____________________</p></div>`,
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
  console.log(`Batch 100a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
