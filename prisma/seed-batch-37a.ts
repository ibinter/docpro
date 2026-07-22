import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // â”€â”€ BANQUE / SERVICES FINANCIERS (25) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    code: 'bank_convention_compte_pro',
    name: "Convention de compte bancaire professionnel",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Convention rÃ©gissant l'ouverture et le fonctionnement d'un compte bancaire professionnel pour une entreprise ou un commerÃ§ant en zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'nom_banque', label:"Nom de la banque", type:'text', required:true},
      {key:'nom_client', label:"DÃ©nomination du titulaire", type:'text', required:true},
      {key:'numero_compte', label:"NumÃ©ro de compte", type:'text', required:true},
      {key:'date_ouverture', label:"Date d\"ouverture du compte", type:'date', required:true},
      {key:'agence', label:"Agence domiciliataire", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE COMPTE BANCAIRE PROFESSIONNEL</h1>
<p>Entre <strong>{{nom_banque}}</strong>, ci-aprÃ¨s "la Banque", et <strong>{{nom_client}}</strong>, ci-aprÃ¨s "le Titulaire",</p>
<p>Il est convenu ce qui suit :</p>
<h2>Article 1 â€“ Ouverture du compte</h2>
<p>La Banque ouvre au Titulaire un compte bancaire professionnel numÃ©ro <strong>{{numero_compte}}</strong> Ã  l'agence de <strong>{{agence}}</strong>, en date du <strong>{{date_ouverture}}</strong>.</p>
<h2>Article 2 â€“ Fonctionnement</h2>
<p>Le compte fonctionne conformÃ©ment aux rÃ¨gles de l'UEMOA, aux dispositions lÃ©gales en vigueur et aux conditions gÃ©nÃ©rales de la Banque remises au Titulaire.</p>
<h2>Article 3 â€“ Obligations du Titulaire</h2>
<p>Le Titulaire s'engage Ã  maintenir un solde suffisant, Ã  informer la Banque de tout changement de situation juridique et Ã  respecter les conditions tarifaires applicables.</p>
<h2>Article 4 â€“ ClÃ´ture</h2>
<p>Chaque partie peut clÃ´turer le compte avec un prÃ©avis de 30 jours, sous rÃ©serve du remboursement de tout solde dÃ©biteur.</p>
<p>Fait Ã  {{agence}}, le {{date_ouverture}}</p></div>`
  },
  {
    code: 'bank_pret_moyen_terme',
    name: "Contrat de prÃªt bancaire Ã  moyen terme",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Contrat formalisant un prÃªt bancaire Ã  moyen terme (2 Ã  7 ans) accordÃ© Ã  une entreprise pour financer ses investissements, conforme aux normes OHADA et BCEAO.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'nom_banque', label:"Nom de la banque prÃªteuse", type:'text', required:true},
      {key:'nom_emprunteur', label:"Nom / dÃ©nomination de l\"emprunteur", type:'text', required:true},
      {key:'montant_pret', label:"Montant du prÃªt (FCFA)", type:'text', required:true},
      {key:'taux_interet', label:"Taux d\"intÃ©rÃªt annuel (%)", type:'text', required:true},
      {key:'duree_pret', label:"DurÃ©e du prÃªt (mois)", type:'text', required:true},
      {key:'date_contrat', label:"Date de signature", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÃŠT BANCAIRE Ã€ MOYEN TERME</h1>
<p><strong>PrÃªteur :</strong> {{nom_banque}}</p>
<p><strong>Emprunteur :</strong> {{nom_emprunteur}}</p>
<h2>Article 1 â€“ Objet</h2>
<p>Le PrÃªteur consent Ã  l'Emprunteur un prÃªt d'un montant de <strong>{{montant_pret}} FCFA</strong> pour une durÃ©e de <strong>{{duree_pret}} mois</strong>.</p>
<h2>Article 2 â€“ Taux et intÃ©rÃªts</h2>
<p>Le prÃªt est consenti au taux annuel de <strong>{{taux_interet}} %</strong>. Les intÃ©rÃªts sont calculÃ©s sur le capital restant dÃ».</p>
<h2>Article 3 â€“ Remboursement</h2>
<p>l'Emprunteur rembourse le prÃªt par Ã©chÃ©ances mensuelles constantes selon le tableau d'amortissement annexÃ©.</p>
<h2>Article 4 â€“ Garanties</h2>
<p>l'Emprunteur constitue les sÃ»retÃ©s prÃ©cisÃ©es en annexe en garantie du remboursement du prÃªt.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'bank_pret_long_terme',
    name: "Contrat de prÃªt bancaire Ã  long terme",
    category: 'commercial_financier',
    price: 9000, priceMax: 27000,
    description: "Contrat de prÃªt bancaire Ã  long terme (7 ans et plus) destinÃ© au financement d'investissements lourds ou immobiliers d'entreprise en zone UEMOA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque prÃªteuse", type:'text', required:true},
      {key:'nom_emprunteur', label:"Emprunteur", type:'text', required:true},
      {key:'montant_pret', label:"Montant du prÃªt (FCFA)", type:'text', required:true},
      {key:'duree_annees', label:"DurÃ©e (annÃ©es)", type:'text', required:true},
      {key:'objet_financement', label:"Objet du financement", type:'textarea', required:true},
      {key:'date_contrat', label:"Date de signature", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÃŠT BANCAIRE Ã€ LONG TERME</h1>
<p><strong>PrÃªteur :</strong> {{nom_banque}}</p>
<p><strong>Emprunteur :</strong> {{nom_emprunteur}}</p>
<h2>Article 1 â€“ Montant et durÃ©e</h2>
<p>PrÃªt de <strong>{{montant_pret}} FCFA</strong> sur <strong>{{duree_annees}} ans</strong>.</p>
<h2>Article 2 â€“ Objet du financement</h2>
<p>{{objet_financement}}</p>
<h2>Article 3 â€“ Conditions de dÃ©blocage</h2>
<p>Les fonds sont dÃ©bloquÃ©s selon un calendrier convenu entre les parties, subordonnÃ© Ã  la rÃ©alisation des conditions suspensives.</p>
<h2>Article 4 â€“ Remboursement anticipÃ©</h2>
<p>l'Emprunteur peut rembourser par anticipation moyennant une indemnitÃ© Ã©gale Ã  3 % du capital remboursÃ©.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'bank_credit_revolving',
    name: "Accord de crÃ©dit revolving",
    category: 'commercial_financier',
    price: 7000, priceMax: 21000,
    description: "Accord cadre de crÃ©dit revolving permettant Ã  une entreprise de tirer et rembourser des fonds dans la limite d'un plafond autorisÃ©, adaptÃ© au droit OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque", type:'text', required:true},
      {key:'nom_entreprise', label:"Entreprise bÃ©nÃ©ficiaire", type:'text', required:true},
      {key:'plafond_credit', label:"Plafond autorisÃ© (FCFA)", type:'text', required:true},
      {key:'duree_accord', label:"DurÃ©e de l\"accord (mois)", type:'text', required:true},
      {key:'date_accord', label:"Date de l\"accord", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CRÃ‰DIT REVOLVING</h1>
<p><strong>Banque :</strong> {{nom_banque}} | <strong>BÃ©nÃ©ficiaire :</strong> {{nom_entreprise}}</p>
<h2>Article 1 â€“ Plafond</h2>
<p>La Banque met Ã  disposition un crÃ©dit revolving d'un plafond de <strong>{{plafond_credit}} FCFA</strong> valable <strong>{{duree_accord}} mois</strong> Ã  compter du {{date_accord}}.</p>
<h2>Article 2 â€“ Tirages</h2>
<p>Le BÃ©nÃ©ficiaire peut effectuer des tirages Ã  tout moment dans la limite du plafond non utilisÃ©, avec un prÃ©avis de 48 heures.</p>
<h2>Article 3 â€“ Remboursement</h2>
<p>Les montants tirÃ©s sont remboursables Ã  tout moment, reconstituant automatiquement le disponible.</p>
<p>SignÃ© le {{date_accord}}</p></div>`
  },
  {
    code: 'bank_decouvert_autorise',
    name: "Contrat de dÃ©couvert bancaire autorisÃ©",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat autorisant un dÃ©couvert bancaire temporaire sur le compte professionnel d'une entreprise, avec plafond et conditions dÃ©finis.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque", type:'text', required:true},
      {key:'nom_client', label:"Titulaire du compte", type:'text', required:true},
      {key:'plafond_decouvert', label:"Plafond de dÃ©couvert (FCFA)", type:'text', required:true},
      {key:'taux_agios', label:"Taux d\"agios (%)", type:'text', required:true},
      {key:'date_accord', label:"Date d\"accord", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DÃ‰COUVERT BANCAIRE AUTORISÃ‰</h1>
<p>La Banque <strong>{{nom_banque}}</strong> autorise <strong>{{nom_client}}</strong> Ã  disposer d'un dÃ©couvert sur son compte, dans les conditions suivantes :</p>
<h2>Article 1 â€“ Plafond</h2>
<p>DÃ©couvert maximum autorisÃ© : <strong>{{plafond_decouvert}} FCFA</strong>.</p>
<h2>Article 2 â€“ CoÃ»t</h2>
<p>Des agios au taux de <strong>{{taux_agios}} %</strong> l'an sont prÃ©levÃ©s sur le solde dÃ©biteur moyen.</p>
<h2>Article 3 â€“ DurÃ©e</h2>
<p>Autorisation valable pour une durÃ©e d'un an renouvelable, Ã  compter du <strong>{{date_accord}}</strong>.</p>
<p>SignÃ© le {{date_accord}}</p></div>`
  },
  {
    code: 'bank_ligne_credit_confirmee',
    name: "Accord de ligne de crÃ©dit confirmÃ©e",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Accord de mise en place d'une ligne de crÃ©dit confirmÃ©e pour une entreprise, irrÃ©vocable pendant la durÃ©e convenue, conforme aux pratiques bancaires UEMOA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque", type:'text', required:true},
      {key:'nom_beneficiaire', label:"BÃ©nÃ©ficiaire", type:'text', required:true},
      {key:'montant_ligne', label:"Montant de la ligne (FCFA)", type:'text', required:true},
      {key:'duree_ligne', label:"DurÃ©e (mois)", type:'text', required:true},
      {key:'date_accord', label:"Date de l\"accord", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE LIGNE DE CRÃ‰DIT CONFIRMÃ‰E</h1>
<p><strong>Banque :</strong> {{nom_banque}} | <strong>BÃ©nÃ©ficiaire :</strong> {{nom_beneficiaire}}</p>
<h2>Article 1 â€“ Engagement irrÃ©vocable</h2>
<p>La Banque confirme irrÃ©vocablement la mise Ã  disposition d'une ligne de crÃ©dit de <strong>{{montant_ligne}} FCFA</strong> pour <strong>{{duree_ligne}} mois</strong>.</p>
<h2>Article 2 â€“ Commission d'engagement</h2>
<p>Une commission d'engagement est calculÃ©e sur la partie non utilisÃ©e de la ligne.</p>
<h2>Article 3 â€“ Conditions d'utilisation</h2>
<p>Les tirages sont effectuÃ©s sur prÃ©sentation des justificatifs convenus entre les parties.</p>
<p>SignÃ© le {{date_accord}}</p></div>`
  },
  {
    code: 'bank_garantie_caution',
    name: "Accord de garantie bancaire (caution)",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Acte par lequel une banque se porte caution pour le compte d'un client vis-Ã -vis d'un bÃ©nÃ©ficiaire tiers, en zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque garante", type:'text', required:true},
      {key:'nom_donneur_ordre', label:"Donneur d\"ordre", type:'text', required:true},
      {key:'nom_beneficiaire', label:"BÃ©nÃ©ficiaire de la garantie", type:'text', required:true},
      {key:'montant_garantie', label:"Montant garanti (FCFA)", type:'text', required:true},
      {key:'date_expiration', label:"Date d\"expiration", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GARANTIE BANCAIRE (CAUTION)</h1>
<p><strong>Banque garante :</strong> {{nom_banque}}</p>
<p><strong>Donneur d'ordre :</strong> {{nom_donneur_ordre}}</p>
<p><strong>BÃ©nÃ©ficiaire :</strong> {{nom_beneficiaire}}</p>
<h2>Article 1 â€“ Engagement de caution</h2>
<p>La Banque se porte caution solidaire du Donneur d'ordre Ã  hauteur de <strong>{{montant_garantie}} FCFA</strong>.</p>
<h2>Article 2 â€“ Appel en garantie</h2>
<p>Le BÃ©nÃ©ficiaire peut appeler la garantie sur simple demande Ã©crite motivÃ©e avant l'expiration du {{date_expiration}}.</p>
<h2>Article 3 â€“ CaractÃ¨re autonome</h2>
<p>La prÃ©sente garantie est indÃ©pendante du contrat de base entre le Donneur d'ordre et le BÃ©nÃ©ficiaire.</p></div>`
  },
  {
    code: 'bank_lettre_credit_documentaire',
    name: "Accord de lettre de crÃ©dit documentaire (LC)",
    category: 'commercial_financier',
    price: 9000, priceMax: 25000,
    description: "Convention d'ouverture d'une lettre de crÃ©dit documentaire irrÃ©vocable pour sÃ©curiser une transaction commerciale internationale depuis l'espace UEMOA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'banque_emettrice', label:"Banque Ã©mettrice", type:'text', required:true},
      {key:'nom_donneur', label:"Donneur d\"ordre (importateur)", type:'text', required:true},
      {key:'nom_beneficiaire', label:"BÃ©nÃ©ficiaire (exportateur)", type:'text', required:true},
      {key:'montant_lc', label:"Montant de la LC", type:'text', required:true},
      {key:'date_expiration', label:"Date d\"expiration", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>LETTRE DE CRÃ‰DIT DOCUMENTAIRE (LC)</h1>
<p><strong>Banque Ã©mettrice :</strong> {{banque_emettrice}}</p>
<p><strong>Donneur d'ordre :</strong> {{nom_donneur}} | <strong>BÃ©nÃ©ficiaire :</strong> {{nom_beneficiaire}}</p>
<h2>Article 1 â€“ Engagement irrÃ©vocable</h2>
<p>La Banque Ã©mettrice s'engage irrÃ©vocablement Ã  payer <strong>{{montant_lc}}</strong> au BÃ©nÃ©ficiaire sur prÃ©sentation des documents conformes avant le <strong>{{date_expiration}}</strong>.</p>
<h2>Article 2 â€“ Documents requis</h2>
<p>Facture commerciale, connaissement, liste de colisage, certificat d'origine, police d'assurance.</p>
<h2>Article 3 â€“ Droit applicable</h2>
<p>La prÃ©sente LC est soumise aux RÃ¨gles et Usances Uniformes (RUU 600) de la CCI.</p></div>`
  },
  {
    code: 'bank_remise_documentaire',
    name: "Accord de remise documentaire (CAD)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Convention de remise documentaire contre acceptation ou paiement (CAD) pour des Ã©changes commerciaux internationaux, conforme aux URC 522 de la CCI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'banque_remettante', label:"Banque remettante", type:'text', required:true},
      {key:'nom_tireur', label:"Tireur (vendeur)", type:'text', required:true},
      {key:'nom_tire', label:"TirÃ© (acheteur)", type:'text', required:true},
      {key:'montant_remise', label:"Montant de la remise", type:'text', required:true},
      {key:'type_remise', label:"Type : D/P ou D/A", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE REMISE DOCUMENTAIRE (CAD)</h1>
<p><strong>Banque remettante :</strong> {{banque_remettante}}</p>
<p><strong>Tireur :</strong> {{nom_tireur}} | <strong>TirÃ© :</strong> {{nom_tire}}</p>
<h2>Article 1 â€“ Objet</h2>
<p>La Banque est chargÃ©e de remettre les documents commerciaux au TirÃ© contre <strong>{{type_remise}}</strong> pour un montant de <strong>{{montant_remise}}</strong>.</p>
<h2>Article 2 â€“ Documents transmis</h2>
<p>Facture, documents de transport, liste de colisage et tout document prÃ©cisÃ© dans les instructions de remise.</p>
<h2>Article 3 â€“ Droit applicable</h2>
<p>Soumis aux RÃ¨gles Uniformes relatives aux Encaissements URC 522 de la CCI.</p></div>`
  },
  {
    code: 'bank_credit_bail_immobilier',
    name: "Contrat de crÃ©dit-bail immobilier (leasing immobilier)",
    category: 'commercial_financier',
    price: 10000, priceMax: 30000,
    description: "Contrat de crÃ©dit-bail immobilier (leasing) par lequel un Ã©tablissement financier finance un bien immobilier professionnel mis Ã  disposition d'une entreprise en zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_bailleur', label:"Ã‰tablissement bailleur", type:'text', required:true},
      {key:'nom_preneur', label:"Preneur (entreprise)", type:'text', required:true},
      {key:'description_bien', label:"Description du bien immobilier", type:'textarea', required:true},
      {key:'valeur_bien', label:"Valeur du bien (FCFA)", type:'text', required:true},
      {key:'duree_bail', label:"DurÃ©e du bail (mois)", type:'text', required:true},
      {key:'date_contrat', label:"Date du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CRÃ‰DIT-BAIL IMMOBILIER</h1>
<p><strong>Bailleur :</strong> {{nom_bailleur}} | <strong>Preneur :</strong> {{nom_preneur}}</p>
<h2>Article 1 â€“ Objet</h2>
<p>Le Bailleur acquiert et met Ã  disposition du Preneur le bien immobilier suivant : {{description_bien}}, d'une valeur de <strong>{{valeur_bien}} FCFA</strong>.</p>
<h2>Article 2 â€“ DurÃ©e et loyers</h2>
<p>Bail d'une durÃ©e de <strong>{{duree_bail}} mois</strong>. Les loyers sont payables mensuellement selon le tableau joint.</p>
<h2>Article 3 â€“ Option d'achat</h2>
<p>Ã€ l'issue du bail, le Preneur peut lever l'option d'achat Ã  la valeur rÃ©siduelle convenue.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'bank_affacturage',
    name: "Accord d\"affacturage (factoring)",
    category: 'commercial_financier',
    price: 7500, priceMax: 22000,
    description: "Convention d\"affacturage par laquelle un factor rachÃ¨te les crÃ©ances commerciales d\"une entreprise et assure leur recouvrement, en zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'nom_factor', label:"SociÃ©tÃ© d\"affacturage (factor)", type:'text', required:true},
      {key:'nom_adherent', label:"AdhÃ©rent (entreprise cÃ©dante)", type:'text', required:true},
      {key:'plafond_financement', label:"Plafond de financement (FCFA)", type:'text', required:true},
      {key:'taux_commission', label:"Taux de commission (%)", type:'text', required:true},
      {key:'date_accord', label:"Date de l\"accord", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD d'AFFACTURAGE (FACTORING)</h1>
<p><strong>Factor :</strong> {{nom_factor}} | <strong>AdhÃ©rent :</strong> {{nom_adherent}}</p>
<h2>Article 1 â€“ Cession de crÃ©ances</h2>
<p>l'AdhÃ©rent cÃ¨de au Factor ses crÃ©ances commerciales dans la limite d'un plafond de <strong>{{plafond_financement}} FCFA</strong>.</p>
<h2>Article 2 â€“ Financement</h2>
<p>Le Factor finance jusqu'Ã  80 % du montant des crÃ©ances cÃ©dÃ©es dans un dÃ©lai de 48 heures.</p>
<h2>Article 3 â€“ Commission</h2>
<p>l'AdhÃ©rent verse une commission de <strong>{{taux_commission}} %</strong> sur le montant des crÃ©ances cÃ©dÃ©es.</p>
<p>SignÃ© le {{date_accord}}</p></div>`
  },
  {
    code: 'bank_compte_joint_pro',
    name: "Contrat de compte joint professionnel",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Convention d\"ouverture et de fonctionnement d\"un compte joint professionnel entre co-titulaires, conforme aux rÃ¨gles BCEAO.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque", type:'text', required:true},
      {key:'titulaire_1', label:"Premier co-titulaire", type:'text', required:true},
      {key:'titulaire_2', label:"DeuxiÃ¨me co-titulaire", type:'text', required:true},
      {key:'numero_compte', label:"NumÃ©ro de compte", type:'text', required:true},
      {key:'date_ouverture', label:"Date d\"ouverture", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE COMPTE JOINT PROFESSIONNEL</h1>
<p><strong>Banque :</strong> {{nom_banque}}</p>
<p><strong>Co-titulaires :</strong> {{titulaire_1}} et {{titulaire_2}}</p>
<h2>Article 1 â€“ Ouverture</h2>
<p>Le compte joint numÃ©ro <strong>{{numero_compte}}</strong> est ouvert le <strong>{{date_ouverture}}</strong>.</p>
<h2>Article 2 â€“ SolidaritÃ© active</h2>
<p>Chaque co-titulaire peut seul faire fonctionner le compte et Ã©mettre des ordres de paiement.</p>
<h2>Article 3 â€“ SolidaritÃ© passive</h2>
<p>Les co-titulaires sont solidairement responsables du solde dÃ©biteur Ã©ventuel.</p></div>`
  },
  {
    code: 'bank_compte_courant_uemoa',
    name: "Accord d\"ouverture de compte courant UEMOA",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Accord d\"ouverture de compte courant pour une personne physique ou morale dans l\"espace UEMOA, avec les clauses rÃ©glementaires requises par la BCEAO.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'nom_banque', label:"Ã‰tablissement bancaire", type:'text', required:true},
      {key:'nom_titulaire', label:"Titulaire du compte", type:'text', required:true},
      {key:'pays_uemoa', label:"Pays membre UEMOA", type:'text', required:true},
      {key:'numero_compte', label:"NumÃ©ro RIB / compte", type:'text', required:true},
      {key:'date_accord', label:"Date de l\"accord", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD d'OUVERTURE DE COMPTE COURANT UEMOA</h1>
<p><strong>Banque :</strong> {{nom_banque}} | <strong>Titulaire :</strong> {{nom_titulaire}}</p>
<p><strong>Pays :</strong> {{pays_uemoa}} | <strong>Compte :</strong> {{numero_compte}}</p>
<h2>Article 1 â€“ Cadre rÃ©glementaire</h2>
<p>Le compte est ouvert conformÃ©ment aux instructions de la BCEAO et aux textes rÃ©glementaires de l'UEMOA en vigueur.</p>
<h2>Article 2 â€“ OpÃ©rations autorisÃ©es</h2>
<p>Le titulaire peut effectuer tout dÃ©pÃ´t, retrait, virement et paiement dans les limites fixÃ©es par la rÃ©glementation.</p>
<h2>Article 3 â€“ KYC</h2>
<p>Le titulaire fournit tous les documents d'identification requis par la rÃ©glementation sur la lutte contre le blanchiment.</p>
<p>SignÃ© le {{date_accord}}</p></div>`
  },
  {
    code: 'bank_coffre_fort',
    name: "Contrat de service de coffre-fort bancaire",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Contrat de location d\"un coffre-fort Ã  une banque pour la conservation de valeurs et documents importants.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque", type:'text', required:true},
      {key:'nom_locataire', label:"Locataire", type:'text', required:true},
      {key:'numero_coffre', label:"NumÃ©ro du coffre", type:'text', required:true},
      {key:'loyer_annuel', label:"Loyer annuel (FCFA)", type:'text', required:true},
      {key:'date_contrat', label:"Date du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE COFFRE-FORT BANCAIRE</h1>
<p><strong>Banque :</strong> {{nom_banque}} | <strong>Locataire :</strong> {{nom_locataire}}</p>
<h2>Article 1 â€“ Location</h2>
<p>La Banque loue au Locataire le coffre-fort numÃ©ro <strong>{{numero_coffre}}</strong> pour un loyer annuel de <strong>{{loyer_annuel}} FCFA</strong>.</p>
<h2>Article 2 â€“ AccÃ¨s</h2>
<p>l'accÃ¨s au coffre n'est autorisÃ© qu'aux personnes habilitÃ©es, en prÃ©sence d'un agent de la Banque, aux heures d'ouverture.</p>
<h2>Article 3 â€“ ResponsabilitÃ©</h2>
<p>La Banque n'est pas responsable du contenu du coffre et dÃ©cline toute responsabilitÃ© en cas de force majeure.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'bank_depot_a_terme',
    name: "Accord de service de dÃ©pÃ´t Ã  terme (DAT)",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Convention de dÃ©pÃ´t Ã  terme (DAT) entre une banque et un client souhaitant placer ses fonds Ã  taux garanti pour une durÃ©e dÃ©terminÃ©e.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque", type:'text', required:true},
      {key:'nom_deposant', label:"DÃ©posant", type:'text', required:true},
      {key:'montant_depot', label:"Montant du dÃ©pÃ´t (FCFA)", type:'text', required:true},
      {key:'taux_remuneration', label:"Taux de rÃ©munÃ©ration (%)", type:'text', required:true},
      {key:'echeance', label:"Date d\"Ã©chÃ©ance", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÃ‰PÃ”T Ã€ TERME (DAT)</h1>
<p><strong>Banque :</strong> {{nom_banque}} | <strong>DÃ©posant :</strong> {{nom_deposant}}</p>
<h2>Article 1 â€“ DÃ©pÃ´t</h2>
<p>Le DÃ©posant confie Ã  la Banque la somme de <strong>{{montant_depot}} FCFA</strong> Ã  titre de dÃ©pÃ´t Ã  terme.</p>
<h2>Article 2 â€“ RÃ©munÃ©ration</h2>
<p>Le dÃ©pÃ´t est rÃ©munÃ©rÃ© au taux annuel de <strong>{{taux_remuneration}} %</strong>, les intÃ©rÃªts Ã©tant versÃ©s Ã  l'Ã©chÃ©ance du <strong>{{echeance}}</strong>.</p>
<h2>Article 3 â€“ Blocage</h2>
<p>Les fonds sont indisponibles jusqu'Ã  l'Ã©chÃ©ance. Tout retrait anticipÃ© entraÃ®ne la perte des intÃ©rÃªts.</p></div>`
  },
  {
    code: 'bank_bon_de_caisse',
    name: "Accord de bon de caisse",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Ã‰mission d\"un bon de caisse nominatif par une banque, reprÃ©sentant un placement Ã  court terme au profit d\"un souscripteur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque Ã©mettrice", type:'text', required:true},
      {key:'nom_souscripteur', label:"Souscripteur", type:'text', required:true},
      {key:'montant_bc', label:"Montant nominal (FCFA)", type:'text', required:true},
      {key:'taux_bc', label:"Taux d\"intÃ©rÃªt (%)", type:'text', required:true},
      {key:'date_echeance', label:"Date d\"Ã©chÃ©ance", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>BON DE CAISSE</h1>
<p><strong>Ã‰metteur :</strong> {{nom_banque}} | <strong>Souscripteur :</strong> {{nom_souscripteur}}</p>
<h2>Article 1 â€“ Souscription</h2>
<p>Le Souscripteur remet Ã  la Banque la somme de <strong>{{montant_bc}} FCFA</strong> en contrepartie du prÃ©sent bon de caisse.</p>
<h2>Article 2 â€“ RÃ©munÃ©ration et remboursement</h2>
<p>Le bon est rÃ©munÃ©rÃ© au taux de <strong>{{taux_bc}} %</strong> et remboursÃ© en capital et intÃ©rÃªts Ã  la date d'Ã©chÃ©ance du <strong>{{date_echeance}}</strong>.</p>
<h2>Article 3 â€“ NÃ©gociabilitÃ©</h2>
<p>Le prÃ©sent bon est nominatif et non nÃ©gociable.</p></div>`
  },
  {
    code: 'bank_ebanking',
    name: "Convention de service bancaire en ligne (e-banking)",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Convention d\"accÃ¨s et d\"utilisation des services bancaires en ligne (e-banking) pour les entreprises clientes d\"une banque en zone UEMOA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque", type:'text', required:true},
      {key:'nom_entreprise', label:"Entreprise utilisatrice", type:'text', required:true},
      {key:'identifiant_acces', label:"Identifiant d\"accÃ¨s", type:'text', required:true},
      {key:'plafond_virement', label:"Plafond de virement journalier (FCFA)", type:'text', required:true},
      {key:'date_convention', label:"Date de la convention", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SERVICE BANCAIRE EN LIGNE (E-BANKING)</h1>
<p><strong>Banque :</strong> {{nom_banque}} | <strong>Entreprise :</strong> {{nom_entreprise}}</p>
<h2>Article 1 â€“ AccÃ¨s</h2>
<p>La Banque ouvre Ã  l'Entreprise un accÃ¨s e-banking sous l'identifiant <strong>{{identifiant_acces}}</strong>, Ã  compter du <strong>{{date_convention}}</strong>.</p>
<h2>Article 2 â€“ Plafonds</h2>
<p>Le plafond de virement journalier est fixÃ© Ã  <strong>{{plafond_virement}} FCFA</strong>.</p>
<h2>Article 3 â€“ SÃ©curitÃ©</h2>
<p>l'Entreprise est responsable de la confidentialitÃ© de ses codes d'accÃ¨s et s'engage Ã  notifier immÃ©diatement tout incident de sÃ©curitÃ©.</p></div>`
  },
  {
    code: 'bank_prelevement_auto',
    name: "Accord de prÃ©lÃ¨vement automatique",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Mandat de prÃ©lÃ¨vement automatique autorisant une banque Ã  dÃ©biter pÃ©riodiquement le compte d\"un client au profit d\"un crÃ©ancier dÃ©signÃ©.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque domiciliataire", type:'text', required:true},
      {key:'nom_debiteur', label:"DÃ©biteur (client)", type:'text', required:true},
      {key:'nom_creancier', label:"CrÃ©ancier bÃ©nÃ©ficiaire", type:'text', required:true},
      {key:'montant_prelevement', label:"Montant du prÃ©lÃ¨vement (FCFA)", type:'text', required:true},
      {key:'periodicite', label:"PÃ©riodicitÃ© (mensuelle / trimestrielle)", type:'text', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÃ‰LÃˆVEMENT AUTOMATIQUE</h1>
<p><strong>Banque :</strong> {{nom_banque}} | <strong>DÃ©biteur :</strong> {{nom_debiteur}}</p>
<p><strong>CrÃ©ancier :</strong> {{nom_creancier}}</p>
<h2>Article 1 â€“ Autorisation</h2>
<p>Le DÃ©biteur autorise irrÃ©vocablement la Banque Ã  prÃ©lever <strong>{{montant_prelevement}} FCFA</strong> de maniÃ¨re <strong>{{periodicite}}</strong> sur son compte au profit du CrÃ©ancier.</p>
<h2>Article 2 â€“ RÃ©vocation</h2>
<p>l'autorisation peut Ãªtre rÃ©voquÃ©e par Ã©crit avec un prÃ©avis de 15 jours.</p></div>`
  },
  {
    code: 'bank_domiciliation_salaires',
    name: "Convention de domiciliation de salaires",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Convention liant un employeur et une banque pour la domiciliation des salaires des employÃ©s, avec les avantages financiers associÃ©s.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque", type:'text', required:true},
      {key:'nom_employeur', label:"Employeur", type:'text', required:true},
      {key:'effectif_employes', label:"Nombre d\"employÃ©s concernÃ©s", type:'text', required:true},
      {key:'date_premiere_domiciliation', label:"Date de premiÃ¨re domiciliation", type:'date', required:true},
      {key:'avantages_octroyes', label:"Avantages octroyÃ©s aux employÃ©s", type:'textarea', required:false},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE DOMICILIATION DE SALAIRES</h1>
<p><strong>Banque :</strong> {{nom_banque}} | <strong>Employeur :</strong> {{nom_employeur}}</p>
<h2>Article 1 â€“ Objet</h2>
<p>l'Employeur s'engage Ã  verser les salaires de ses <strong>{{effectif_employes}}</strong> employÃ©s concernÃ©s par virement sur leurs comptes ouverts dans la Banque, Ã  compter du <strong>{{date_premiere_domiciliation}}</strong>.</p>
<h2>Article 2 â€“ Avantages</h2>
<p>{{avantages_octroyes}}</p>
<h2>Article 3 â€“ DurÃ©e</h2>
<p>Convention conclue pour un an renouvelable par tacite reconduction.</p></div>`
  },
  {
    code: 'bank_cheque_banque',
    name: "Accord de service de chÃ¨que de banque",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Convention rÃ©gissant l\"Ã©mission de chÃ¨ques de banque certifiÃ©s par une banque au bÃ©nÃ©fice d\"un client pour sÃ©curiser des paiements importants.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque", type:'text', required:true},
      {key:'nom_client', label:"Client demandeur", type:'text', required:true},
      {key:'montant_cheque', label:"Montant du chÃ¨que (FCFA)", type:'text', required:true},
      {key:'nom_beneficiaire', label:"BÃ©nÃ©ficiaire du chÃ¨que", type:'text', required:true},
      {key:'date_emission', label:"Date d\"Ã©mission", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CHÃˆQUE DE BANQUE</h1>
<p><strong>Banque :</strong> {{nom_banque}} | <strong>Client :</strong> {{nom_client}}</p>
<h2>Article 1 â€“ Ã‰mission</h2>
<p>La Banque Ã©met un chÃ¨que certifiÃ© de <strong>{{montant_cheque}} FCFA</strong> Ã  l'ordre de <strong>{{nom_beneficiaire}}</strong> le <strong>{{date_emission}}</strong>.</p>
<h2>Article 2 â€“ Provision</h2>
<p>Le montant correspondant est immÃ©diatement dÃ©bitÃ© du compte du Client et bloquÃ© jusqu'Ã  prÃ©sentation du chÃ¨que.</p>
<h2>Article 3 â€“ DÃ©lai de validitÃ©</h2>
<p>Le chÃ¨que de banque est valable un an Ã  compter de la date d'Ã©mission.</p></div>`
  },
  {
    code: 'bank_virement_swift',
    name: "Contrat de service de virement SWIFT",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Convention de service de virement international SWIFT pour les entreprises rÃ©alisant des opÃ©rations transfrontaliÃ¨res depuis la zone UEMOA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque expÃ©ditrice", type:'text', required:true},
      {key:'nom_client', label:"Client donneur d\"ordre", type:'text', required:true},
      {key:'banque_correspondante', label:"Banque correspondante (SWIFT)", type:'text', required:true},
      {key:'plafond_journalier', label:"Plafond journalier (devise)", type:'text', required:true},
      {key:'date_convention', label:"Date de la convention", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE VIREMENT SWIFT</h1>
<p><strong>Banque :</strong> {{nom_banque}} | <strong>Client :</strong> {{nom_client}}</p>
<h2>Article 1 â€“ Service</h2>
<p>La Banque fournit au Client un service de virements internationaux via le rÃ©seau SWIFT, en correspondance avec <strong>{{banque_correspondante}}</strong>.</p>
<h2>Article 2 â€“ Plafonds</h2>
<p>Plafond journalier : <strong>{{plafond_journalier}}</strong>, sous rÃ©serve des autorisations de change de la BCEAO.</p>
<h2>Article 3 â€“ DÃ©lais</h2>
<p>Les virements sont exÃ©cutÃ©s dans un dÃ©lai de 2 Ã  3 jours ouvrÃ©s selon les correspondants.</p>
<p>SignÃ© le {{date_convention}}</p></div>`
  },
  {
    code: 'bank_tresorerie_externalisee',
    name: "Accord de gestion de trÃ©sorerie externalisÃ©e",
    category: 'commercial_financier',
    price: 9000, priceMax: 26000,
    description: "Convention par laquelle une banque assure la gestion externalisÃ©e de la trÃ©sorerie d\"une entreprise, incluant le placement des excÃ©dents et le financement des besoins.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque gestionnaire", type:'text', required:true},
      {key:'nom_entreprise', label:"Entreprise cliente", type:'text', required:true},
      {key:'perimetre_gestion', label:"PÃ©rimÃ¨tre de gestion", type:'textarea', required:true},
      {key:'honoraires', label:"Honoraires annuels (FCFA)", type:'text', required:true},
      {key:'date_debut', label:"Date de dÃ©but", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE TRÃ‰SORERIE EXTERNALISÃ‰E</h1>
<p><strong>Banque gestionnaire :</strong> {{nom_banque}} | <strong>Entreprise :</strong> {{nom_entreprise}}</p>
<h2>Article 1 â€“ Mission</h2>
<p>La Banque prend en charge la gestion de trÃ©sorerie de l'Entreprise selon le pÃ©rimÃ¨tre dÃ©fini : {{perimetre_gestion}}.</p>
<h2>Article 2 â€“ Services inclus</h2>
<p>PrÃ©visions de trÃ©sorerie, placement des excÃ©dents, couverture des besoins de financement Ã  court terme.</p>
<h2>Article 3 â€“ RÃ©munÃ©ration</h2>
<p>Honoraires annuels de <strong>{{honoraires}} FCFA</strong>, facturÃ©s trimestriellement.</p>
<p>Prise d'effet : {{date_debut}}</p></div>`
  },
  {
    code: 'bank_evaluation_risque_pme',
    name: "Rapport d\"Ã©valuation risque crÃ©dit PME",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Rapport d\"analyse et d\"Ã©valuation du risque de crÃ©dit d\"une PME africaine, Ã©tabli par un analyste bancaire conformÃ©ment aux standards BCEAO.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'nom_pme', label:"Nom de la PME analysÃ©e", type:'text', required:true},
      {key:'analyste', label:"Analyste crÃ©dit", type:'text', required:true},
      {key:'montant_sollicite', label:"Montant de crÃ©dit sollicitÃ© (FCFA)", type:'text', required:true},
      {key:'note_risque', label:"Note de risque attribuÃ©e", type:'text', required:true},
      {key:'date_rapport', label:"Date du rapport", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT d'Ã‰VALUATION RISQUE CRÃ‰DIT PME</h1>
<p><strong>PME analysÃ©e :</strong> {{nom_pme}} | <strong>Analyste :</strong> {{analyste}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h2>1. PrÃ©sentation de la PME</h2>
<p>Description de l'activitÃ©, de la structure juridique et de l'historique bancaire.</p>
<h2>2. Analyse financiÃ¨re</h2>
<p>Ã‰tude des bilans et comptes de rÃ©sultat sur 3 exercices, ratios de liquiditÃ© et d'endettement.</p>
<h2>3. Ã‰valuation du risque</h2>
<p>Note de risque : <strong>{{note_risque}}</strong>. Montant sollicitÃ© : <strong>{{montant_sollicite}} FCFA</strong>.</p>
<h2>4. Recommandation</h2>
<p>Avis de l'analyste et conditions proposÃ©es pour l'octroi du crÃ©dit.</p></div>`
  },
  {
    code: 'bank_plan_financement',
    name: "Plan de financement d\"entreprise",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Document de plan de financement pluriannuel d\"une entreprise, prÃ©sentant les besoins, les ressources et l\"Ã©quilibre financier prÃ©visionnel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'nom_entreprise', label:"Nom de l\"entreprise", type:'text', required:true},
      {key:'secteur', label:"Secteur d\"activitÃ©", type:'text', required:true},
      {key:'horizon_plan', label:"Horizon du plan (annÃ©es)", type:'text', required:true},
      {key:'total_besoin', label:"Total des besoins Ã  financer (FCFA)", type:'text', required:true},
      {key:'date_plan', label:"Date d\"Ã©laboration", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE FINANCEMENT d'ENTREPRISE</h1>
<p><strong>Entreprise :</strong> {{nom_entreprise}} | <strong>Secteur :</strong> {{secteur}}</p>
<p><strong>Horizon :</strong> {{horizon_plan}} ans | <strong>Date :</strong> {{date_plan}}</p>
<h2>1. PrÃ©sentation du projet</h2>
<p>Description synthÃ©tique du projet d'entreprise et de ses objectifs de dÃ©veloppement.</p>
<h2>2. Besoins de financement</h2>
<p>Total des besoins : <strong>{{total_besoin}} FCFA</strong>, rÃ©partis entre investissements et fonds de roulement.</p>
<h2>3. Ressources mobilisÃ©es</h2>
<p>Apports en fonds propres, emprunts bancaires, subventions et autres ressources.</p>
<h2>4. Ã‰quilibre prÃ©visionnel</h2>
<p>Tableau de trÃ©sorerie prÃ©visionnelle sur {{horizon_plan}} exercices.</p></div>`
  },
  {
    code: 'bank_charte_relation',
    name: "Charte de relation banque-client",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Charte dÃ©finissant les engagements rÃ©ciproques de la banque et de ses clients professionnels, les standards de service et les modalitÃ©s de traitement des rÃ©clamations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'nom_banque', label:"Nom de la banque", type:'text', required:true},
      {key:'pays', label:"Pays d\"exercice", type:'text', required:true},
      {key:'date_entree_vigueur', label:"Date d\"entrÃ©e en vigueur", type:'date', required:true},
      {key:'responsable_relation', label:"Directeur relation client", type:'text', required:false},
    ]),
    body: `<div class="doc"><h1>CHARTE DE RELATION BANQUE-CLIENT</h1>
<p><strong>{{nom_banque}}</strong> â€“ {{pays}}</p>
<p>En vigueur Ã  compter du <strong>{{date_entree_vigueur}}</strong></p>
<h2>1. Nos engagements envers vous</h2>
<p>Accueil professionnel, rÃ©ponse aux demandes dans les 48 heures, transparence tarifaire, confidentialitÃ© absolue.</p>
<h2>2. Vos engagements</h2>
<p>Fournir des informations exactes, maintenir des fonds suffisants, respecter les dÃ©lais de remboursement.</p>
<h2>3. Traitement des rÃ©clamations</h2>
<p>Toute rÃ©clamation est traitÃ©e par le service client dans un dÃ©lai de 10 jours ouvrÃ©s.</p>
<h2>4. MÃ©diation</h2>
<p>En cas de litige persistant, les parties recourent au mÃ©diateur bancaire dÃ©signÃ© par l'autoritÃ© de supervision.</p>
<p>Contact : {{responsable_relation}}</p></div>`
  },

  // â”€â”€ MICROFINANCE / IMF (25) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    code: 'mfi_pret_groupe_solidaire',
    name: "Contrat de prÃªt de groupe solidaire (tontine formalisÃ©e)",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de prÃªt collectif accordÃ© Ã  un groupe solidaire formalisant les pratiques de tontine, avec caution mutuelle des membres, conforme aux rÃ¨gles IMF/BCEAO.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'nom_imf', label:"Institution de microfinance", type:'text', required:true},
      {key:'nom_groupe', label:"Nom du groupe solidaire", type:'text', required:true},
      {key:'montant_total', label:"Montant total du prÃªt (FCFA)", type:'text', required:true},
      {key:'nombre_membres', label:"Nombre de membres du groupe", type:'text', required:true},
      {key:'date_contrat', label:"Date du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÃŠT DE GROUPE SOLIDAIRE</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Groupe :</strong> {{nom_groupe}}</p>
<h2>Article 1 â€“ PrÃªt collectif</h2>
<p>l'IMF octroie au groupe un prÃªt collectif de <strong>{{montant_total}} FCFA</strong> rÃ©parti entre ses <strong>{{nombre_membres}}</strong> membres.</p>
<h2>Article 2 â€“ Caution mutuelle</h2>
<p>Les membres se portent mutuellement caution solidaire pour le remboursement intÃ©gral du prÃªt.</p>
<h2>Article 3 â€“ Remboursement</h2>
<p>Le groupe rembourse selon un calendrier hebdomadaire / mensuel convenu lors de l'assemblÃ©e de groupe.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'mfi_pret_individuel',
    name: "Contrat de prÃªt individuel microfinance",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Contrat de microcrÃ©dit individuel accordÃ© par une IMF Ã  un entrepreneur ou artisan pour financer une activitÃ© gÃ©nÃ©ratrice de revenus.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 88,
    fieldsJson: F([
      {key:'nom_imf', label:"Institution de microfinance", type:'text', required:true},
      {key:'nom_emprunteur', label:"Nom de l\"emprunteur", type:'text', required:true},
      {key:'montant_pret', label:"Montant du prÃªt (FCFA)", type:'text', required:true},
      {key:'duree_mois', label:"DurÃ©e (mois)", type:'text', required:true},
      {key:'objet_pret', label:"Objet du prÃªt", type:'textarea', required:true},
      {key:'date_contrat', label:"Date du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÃŠT INDIVIDUEL MICROFINANCE</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Emprunteur :</strong> {{nom_emprunteur}}</p>
<h2>Article 1 â€“ PrÃªt</h2>
<p>PrÃªt de <strong>{{montant_pret}} FCFA</strong> sur <strong>{{duree_mois}} mois</strong>.</p>
<h2>Article 2 â€“ Objet</h2>
<p>{{objet_pret}}</p>
<h2>Article 3 â€“ Remboursement</h2>
<p>Remboursement par versements selon tableau d'amortissement annexÃ©.</p>
<h2>Article 4 â€“ Garantie</h2>
<p>Caution personnelle et / ou nantissement de l'Ã©quipement financÃ©.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'mfi_pret_agricole_campagne',
    name: "Contrat de prÃªt agricole campagne",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Contrat de crÃ©dit agricole de campagne accordÃ© par une IMF Ã  un producteur pour financer les intrants et les travaux d\"une saison agricole.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_imf', label:"Institution de microfinance", type:'text', required:true},
      {key:'nom_agriculteur', label:"Nom de l\"agriculteur", type:'text', required:true},
      {key:'culture_concernee', label:"Culture concernÃ©e", type:'text', required:true},
      {key:'montant_pret', label:"Montant du prÃªt (FCFA)", type:'text', required:true},
      {key:'saison_agricole', label:"Saison agricole (ex : 2024-2025)", type:'text', required:true},
      {key:'date_contrat', label:"Date du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÃŠT AGRICOLE CAMPAGNE</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Agriculteur :</strong> {{nom_agriculteur}}</p>
<h2>Article 1 â€“ Objet</h2>
<p>Financement de la campagne de <strong>{{culture_concernee}}</strong> pour la saison <strong>{{saison_agricole}}</strong>.</p>
<h2>Article 2 â€“ Montant</h2>
<p>PrÃªt de <strong>{{montant_pret}} FCFA</strong> destinÃ© Ã  couvrir les intrants, la main-d'oeuvre et les travaux agricoles.</p>
<h2>Article 3 â€“ Remboursement</h2>
<p>Remboursement en une Ã©chÃ©ance unique Ã  la rÃ©colte, majorÃ©e des intÃ©rÃªts convenus.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'mfi_epargne_credit_coopec',
    name: "Accord d\"Ã©pargne et crÃ©dit COOPEC",
    category: 'commercial_financier',
    price: 4000, priceMax: 11000,
    description: "Accord d\"adhÃ©sion et de services d\"Ã©pargne-crÃ©dit au sein d\"une coopÃ©rative d\"Ã©pargne et de crÃ©dit (COOPEC) en zone UEMOA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'nom_coopec', label:"Nom de la COOPEC", type:'text', required:true},
      {key:'nom_membre', label:"Nom du membre", type:'text', required:true},
      {key:'numero_adhesion', label:"NumÃ©ro d\"adhÃ©sion", type:'text', required:true},
      {key:'part_sociale', label:"Montant de la part sociale (FCFA)", type:'text', required:true},
      {key:'date_adhesion', label:"Date d\"adhÃ©sion", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD d'Ã‰PARGNE ET CRÃ‰DIT COOPEC</h1>
<p><strong>COOPEC :</strong> {{nom_coopec}} | <strong>Membre :</strong> {{nom_membre}}</p>
<h2>Article 1 â€“ AdhÃ©sion</h2>
<p>Le Membre adhÃ¨re Ã  la COOPEC sous le numÃ©ro <strong>{{numero_adhesion}}</strong> le <strong>{{date_adhesion}}</strong>.</p>
<h2>Article 2 â€“ Part sociale</h2>
<p>Une part sociale de <strong>{{part_sociale}} FCFA</strong> est souscrite et libÃ©rÃ©e Ã  l'adhÃ©sion.</p>
<h2>Article 3 â€“ Droits et obligations</h2>
<p>Le Membre bÃ©nÃ©ficie des services d'Ã©pargne, de crÃ©dit et d'assurance de la COOPEC et participe aux assemblÃ©es gÃ©nÃ©rales.</p></div>`
  },
  {
    code: 'mfi_caisse_solidarite',
    name: "Convention de caisse de solidaritÃ©",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Convention dÃ©finissant le fonctionnement d\"une caisse de solidaritÃ© entre membres d\"un groupe ou d\"une association pour mutualiser l\"Ã©pargne et l\"entraide.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'nom_caisse', label:"Nom de la caisse de solidaritÃ©", type:'text', required:true},
      {key:'nom_president', label:"PrÃ©sident(e) de la caisse", type:'text', required:true},
      {key:'nombre_membres', label:"Nombre de membres fondateurs", type:'text', required:true},
      {key:'cotisation_mensuelle', label:"Cotisation mensuelle (FCFA)", type:'text', required:true},
      {key:'date_creation', label:"Date de crÃ©ation", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE CAISSE DE SOLIDARITÃ‰</h1>
<p><strong>Caisse :</strong> {{nom_caisse}} | <strong>PrÃ©sidente/PrÃ©sident :</strong> {{nom_president}}</p>
<h2>Article 1 â€“ Objet</h2>
<p>La caisse regroupe <strong>{{nombre_membres}}</strong> membres en vue de mutualiser l'Ã©pargne et de s'octroyer des prÃªts solidaires.</p>
<h2>Article 2 â€“ Cotisation</h2>
<p>Chaque membre verse <strong>{{cotisation_mensuelle}} FCFA</strong> par mois.</p>
<h2>Article 3 â€“ PrÃªts</h2>
<p>Les membres peuvent bÃ©nÃ©ficier de prÃªts Ã  faible taux sur dÃ©cision collÃ©giale.</p>
<p>FondÃ©e le {{date_creation}}</p></div>`
  },
  {
    code: 'mfi_microcredit_habitat',
    name: "Contrat de microcrÃ©dit habitat",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat de microcrÃ©dit destinÃ© Ã  financer l\"amÃ©lioration ou la construction d\"un logement pour des mÃ©nages Ã  revenus modestes en zone UEMOA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF prÃªteuse", type:'text', required:true},
      {key:'nom_emprunteur', label:"Emprunteur", type:'text', required:true},
      {key:'montant_credit', label:"Montant du crÃ©dit (FCFA)", type:'text', required:true},
      {key:'description_travaux', label:"Description des travaux", type:'textarea', required:true},
      {key:'duree_mois', label:"DurÃ©e (mois)", type:'text', required:true},
      {key:'date_contrat', label:"Date du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MICROCRÃ‰DIT HABITAT</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Emprunteur :</strong> {{nom_emprunteur}}</p>
<h2>Article 1 â€“ Objet</h2>
<p>Financement de : {{description_travaux}}</p>
<h2>Article 2 â€“ Montant et durÃ©e</h2>
<p>CrÃ©dit de <strong>{{montant_credit}} FCFA</strong> sur <strong>{{duree_mois}} mois</strong>.</p>
<h2>Article 3 â€“ Remboursement</h2>
<p>MensualitÃ©s constantes selon tableau d'amortissement annexÃ©.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'mfi_pret_urgence',
    name: "Accord de prÃªt d\"urgence IMF",
    category: 'commercial_financier',
    price: 3000, priceMax: 9000,
    description: "Contrat de prÃªt d\"urgence Ã  dÃ©caissement rapide accordÃ© par une IMF Ã  un membre confrontÃ© Ã  une situation imprÃ©vue (maladie, sinistre, funÃ©railles).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF", type:'text', required:true},
      {key:'nom_beneficiaire', label:"BÃ©nÃ©ficiaire", type:'text', required:true},
      {key:'motif_urgence', label:"Motif de l\"urgence", type:'text', required:true},
      {key:'montant_urgence', label:"Montant accordÃ© (FCFA)", type:'text', required:true},
      {key:'date_decaissement', label:"Date de dÃ©caissement", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÃŠT d'URGENCE IMF</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>BÃ©nÃ©ficiaire :</strong> {{nom_beneficiaire}}</p>
<h2>Article 1 â€“ Situation d'urgence</h2>
<p>Motif dÃ©clarÃ© : <strong>{{motif_urgence}}</strong>.</p>
<h2>Article 2 â€“ PrÃªt d'urgence</h2>
<p>l'IMF octroie un prÃªt d'urgence de <strong>{{montant_urgence}} FCFA</strong>, dÃ©caissÃ© le <strong>{{date_decaissement}}</strong>.</p>
<h2>Article 3 â€“ Remboursement simplifiÃ©</h2>
<p>Remboursement en 3 Ã©chÃ©ances mensuelles Ã©gales sans frais de dossier.</p></div>`
  },
  {
    code: 'mfi_pret_etudiant',
    name: "Contrat de prÃªt Ã©tudiant microfinance",
    category: 'commercial_financier',
    price: 3500, priceMax: 10000,
    description: "Contrat de microcrÃ©dit destinÃ© Ã  financer les frais de scolaritÃ© et de subsistance d\"un Ã©tudiant, avec remboursement diffÃ©rÃ© aprÃ¨s obtention du diplÃ´me.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF prÃªteuse", type:'text', required:true},
      {key:'nom_etudiant', label:"Nom de l\"Ã©tudiant", type:'text', required:true},
      {key:'etablissement', label:"Ã‰tablissement d\"enseignement", type:'text', required:true},
      {key:'montant_pret', label:"Montant du prÃªt (FCFA)", type:'text', required:true},
      {key:'date_contrat', label:"Date du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÃŠT Ã‰TUDIANT MICROFINANCE</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Ã‰tudiant :</strong> {{nom_etudiant}}</p>
<p><strong>Ã‰tablissement :</strong> {{etablissement}}</p>
<h2>Article 1 â€“ Objet du prÃªt</h2>
<p>Financement des frais de scolaritÃ© et de subsistance pour un montant de <strong>{{montant_pret}} FCFA</strong>.</p>
<h2>Article 2 â€“ DiffÃ©rÃ©</h2>
<p>Le remboursement est diffÃ©rÃ© de 12 mois aprÃ¨s la fin des Ã©tudes ou l'obtention du diplÃ´me.</p>
<h2>Article 3 â€“ Garantie</h2>
<p>Caution d'un parent ou tuteur lÃ©gal.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'mfi_pret_equipement_artisan',
    name: "Accord de prÃªt Ã©quipement artisan",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Contrat de prÃªt microfinance destinÃ© Ã  l\"acquisition d\"Ã©quipements professionnels par un artisan (couturiÃ¨re, mÃ©canicien, menuisier, etc.) en zone OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF", type:'text', required:true},
      {key:'nom_artisan', label:"Nom de l\"artisan", type:'text', required:true},
      {key:'metier_artisan', label:"MÃ©tier exercÃ©", type:'text', required:true},
      {key:'equipement_finance', label:"Ã‰quipement Ã  financer", type:'text', required:true},
      {key:'montant_pret', label:"Montant du prÃªt (FCFA)", type:'text', required:true},
      {key:'date_contrat', label:"Date du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÃŠT Ã‰QUIPEMENT ARTISAN</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Artisan :</strong> {{nom_artisan}} ({{metier_artisan}})</p>
<h2>Article 1 â€“ Objet</h2>
<p>Financement de l'acquisition de : <strong>{{equipement_finance}}</strong> pour un montant de <strong>{{montant_pret}} FCFA</strong>.</p>
<h2>Article 2 â€“ Nantissement</h2>
<p>l'Ã©quipement financÃ© est nanti en faveur de l'IMF jusqu'au remboursement intÃ©gral.</p>
<h2>Article 3 â€“ Remboursement</h2>
<p>Remboursement mensuel sur 12 Ã  24 mois selon tableau d'amortissement annexÃ©.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'mfi_pret_fonds_roulement_pme',
    name: "Contrat de prÃªt fonds de roulement PME",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat de microcrÃ©dit destinÃ© Ã  couvrir le besoin en fonds de roulement d\"une petite ou micro-entreprise, accordÃ© par une IMF.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 83,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF", type:'text', required:true},
      {key:'nom_entreprise', label:"Nom de l\"entreprise", type:'text', required:true},
      {key:'activite', label:"ActivitÃ© principale", type:'text', required:true},
      {key:'montant_fdr', label:"Montant du crÃ©dit FDR (FCFA)", type:'text', required:true},
      {key:'date_contrat', label:"Date du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRÃŠT FONDS DE ROULEMENT PME</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Entreprise :</strong> {{nom_entreprise}} ({{activite}})</p>
<h2>Article 1 â€“ Objet</h2>
<p>l'IMF accorde un crÃ©dit de fonds de roulement de <strong>{{montant_fdr}} FCFA</strong>.</p>
<h2>Article 2 â€“ Utilisation</h2>
<p>Les fonds sont exclusivement destinÃ©s au financement du cycle d'exploitation de l'entreprise.</p>
<h2>Article 3 â€“ DurÃ©e</h2>
<p>CrÃ©dit Ã  court terme de 3 Ã  12 mois, renouvelable sur justificatif.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'mfi_pret_femme_entrepreneur',
    name: "Accord de prÃªt femme entrepreneur",
    category: 'commercial_financier',
    price: 4000, priceMax: 11000,
    description: "Programme de microcrÃ©dit dÃ©diÃ© aux femmes entrepreneures africaines, avec des conditions prÃ©fÃ©rentielles pour favoriser l\"autonomisation Ã©conomique fÃ©minine.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 87,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF", type:'text', required:true},
      {key:'nom_beneficiaire', label:"Nom de la bÃ©nÃ©ficiaire", type:'text', required:true},
      {key:'activite_entreprise', label:"ActivitÃ© de l\"entreprise", type:'text', required:true},
      {key:'montant_pret', label:"Montant du prÃªt (FCFA)", type:'text', required:true},
      {key:'date_contrat', label:"Date du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÃŠT FEMME ENTREPRENEUR</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>BÃ©nÃ©ficiaire :</strong> {{nom_beneficiaire}}</p>
<h2>Article 1 â€“ Programme dÃ©diÃ©</h2>
<p>Ce prÃªt s'inscrit dans le programme d'autonomisation Ã©conomique des femmes de l'IMF.</p>
<h2>Article 2 â€“ ActivitÃ© financÃ©e</h2>
<p>{{activite_entreprise}} â€“ Montant : <strong>{{montant_pret}} FCFA</strong>.</p>
<h2>Article 3 â€“ Conditions prÃ©fÃ©rentielles</h2>
<p>Taux bonifiÃ©, dÃ©lai de grÃ¢ce d'un mois, accompagnement en gestion d'entreprise inclus.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'mfi_convention_sfd',
    name: "Convention de SFD (systÃ¨me financier dÃ©centralisÃ©)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Convention constitutive et de fonctionnement d\"un SystÃ¨me Financier DÃ©centralisÃ© (SFD) conforme Ã  la loi PARMEC et aux instructions de la BCEAO.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_sfd', label:"DÃ©nomination du SFD", type:'text', required:true},
      {key:'siege_social', label:"SiÃ¨ge social", type:'text', required:true},
      {key:'capital_social', label:"Capital social (FCFA)", type:'text', required:true},
      {key:'nombre_fondateurs', label:"Nombre de membres fondateurs", type:'text', required:true},
      {key:'date_creation', label:"Date de crÃ©ation", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SYSTÃˆME FINANCIER DÃ‰CENTRALISÃ‰ (SFD)</h1>
<p><strong>DÃ©nomination :</strong> {{nom_sfd}} | <strong>SiÃ¨ge :</strong> {{siege_social}}</p>
<h2>Article 1 â€“ Constitution</h2>
<p>Le SFD est constituÃ© le <strong>{{date_creation}}</strong> par <strong>{{nombre_fondateurs}}</strong> membres fondateurs avec un capital social de <strong>{{capital_social}} FCFA</strong>.</p>
<h2>Article 2 â€“ Objet</h2>
<p>Collecter l'Ã©pargne des membres et leur octroyer des crÃ©dits adaptÃ©s Ã  leurs besoins.</p>
<h2>Article 3 â€“ AgrÃ©ment</h2>
<p>Le SFD sollicite l'agrÃ©ment du MinistÃ¨re des Finances et de la BCEAO conformÃ©ment Ã  la loi PARMEC.</p></div>`
  },
  {
    code: 'mfi_plan_epargne_retraite',
    name: "Plan d\"Ã©pargne retraite IMF",
    category: 'commercial_financier',
    price: 5000, priceMax: 14000,
    description: "Contrat de plan d\"Ã©pargne retraite proposÃ© par une IMF Ã  ses membres, pour constituer une rente complÃ©mentaire Ã  la retraite.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF gestionnaire", type:'text', required:true},
      {key:'nom_adherent', label:"AdhÃ©rent", type:'text', required:true},
      {key:'versement_mensuel', label:"Versement mensuel (FCFA)", type:'text', required:true},
      {key:'age_depart_retraite', label:"Ã‚ge de dÃ©part en retraite prÃ©vu", type:'text', required:true},
      {key:'date_adhesion', label:"Date d\"adhÃ©sion", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>PLAN d'Ã‰PARGNE RETRAITE IMF</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>AdhÃ©rent :</strong> {{nom_adherent}}</p>
<h2>Article 1 â€“ Ã‰pargne rÃ©guliÃ¨re</h2>
<p>l'AdhÃ©rent s'engage Ã  verser <strong>{{versement_mensuel}} FCFA</strong> par mois Ã  compter du <strong>{{date_adhesion}}</strong>.</p>
<h2>Article 2 â€“ RÃ©munÃ©ration</h2>
<p>l'Ã©pargne est rÃ©munÃ©rÃ©e au taux garanti prÃ©cisÃ© dans les conditions gÃ©nÃ©rales.</p>
<h2>Article 3 â€“ Liquidation</h2>
<p>Ã€ l'Ã¢ge de <strong>{{age_depart_retraite}} ans</strong>, le capital constituÃ© peut Ãªtre converti en rente mensuelle ou perÃ§u en capital.</p></div>`
  },
  {
    code: 'mfi_pret_garantie_partielle',
    name: "Accord de prÃªt avec garantie partielle",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Contrat de prÃªt IMF adossÃ© Ã  un fonds de garantie partiel (FGP), permettant l\"accÃ¨s au crÃ©dit pour des emprunteurs sans garanties classiques suffisantes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF prÃªteuse", type:'text', required:true},
      {key:'nom_emprunteur', label:"Emprunteur", type:'text', required:true},
      {key:'nom_fonds_garantie', label:"Fonds de garantie partenaire", type:'text', required:true},
      {key:'montant_pret', label:"Montant du prÃªt (FCFA)", type:'text', required:true},
      {key:'taux_couverture', label:"Taux de couverture de la garantie (%)", type:'text', required:true},
      {key:'date_contrat', label:"Date du contrat", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÃŠT AVEC GARANTIE PARTIELLE</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Emprunteur :</strong> {{nom_emprunteur}}</p>
<p><strong>Fonds de garantie :</strong> {{nom_fonds_garantie}}</p>
<h2>Article 1 â€“ PrÃªt</h2>
<p>l'IMF accorde un prÃªt de <strong>{{montant_pret}} FCFA</strong>, couvert Ã  hauteur de <strong>{{taux_couverture}} %</strong> par le fonds de garantie.</p>
<h2>Article 2 â€“ Appel en garantie</h2>
<p>En cas de dÃ©faut de l'Emprunteur, l'IMF actionne la garantie auprÃ¨s du fonds selon la procÃ©dure convenue.</p>
<p>SignÃ© le {{date_contrat}}</p></div>`
  },
  {
    code: 'mfi_formation_financiere',
    name: "Contrat de formation financiÃ¨re membre",
    category: 'commercial_financier',
    price: 3000, priceMax: 8000,
    description: "Convention de formation Ã  l\"Ã©ducation financiÃ¨re dispensÃ©e par une IMF Ã  ses membres, incluant gestion budgÃ©taire, Ã©pargne et crÃ©dit responsable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF organisatrice", type:'text', required:true},
      {key:'nom_participant', label:"Participant", type:'text', required:true},
      {key:'modules_formation', label:"Modules de formation", type:'textarea', required:true},
      {key:'duree_formation', label:"DurÃ©e totale (heures)", type:'text', required:true},
      {key:'date_debut', label:"Date de dÃ©but", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FORMATION FINANCIÃˆRE MEMBRE</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Participant :</strong> {{nom_participant}}</p>
<h2>Article 1 â€“ Programme</h2>
<p>Modules couverts : {{modules_formation}}</p>
<h2>Article 2 â€“ DurÃ©e</h2>
<p>Formation de <strong>{{duree_formation}} heures</strong> rÃ©parties sur plusieurs sessions Ã  partir du <strong>{{date_debut}}</strong>.</p>
<h2>Article 3 â€“ Certification</h2>
<p>Ã€ l'issue, le participant reÃ§oit une attestation de formation financiÃ¨re dÃ©livrÃ©e par l'IMF.</p></div>`
  },
  {
    code: 'mfi_convention_supervision_bceao',
    name: "Convention de supervision BCEAO IMF",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Convention cadre rÃ©gissant les relations de supervision entre la BCEAO et une institution de microfinance agrÃ©Ã©e, dÃ©finissant les obligations de reporting et de conformitÃ©.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'nom_imf', label:"DÃ©nomination de l\"IMF", type:'text', required:true},
      {key:'numero_agrement', label:"NumÃ©ro d\"agrÃ©ment BCEAO", type:'text', required:true},
      {key:'pays_exercice', label:"Pays d\"exercice", type:'text', required:true},
      {key:'date_convention', label:"Date de la convention", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION DE SUPERVISION BCEAO â€“ IMF</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>AgrÃ©ment :</strong> {{numero_agrement}}</p>
<p><strong>Pays :</strong> {{pays_exercice}} | <strong>Date :</strong> {{date_convention}}</p>
<h2>Article 1 â€“ Cadre de supervision</h2>
<p>l'IMF reconnaÃ®t la compÃ©tence de la BCEAO et du MinistÃ¨re des Finances pour sa supervision prudentielle.</p>
<h2>Article 2 â€“ Obligations de reporting</h2>
<p>l'IMF transmet des Ã©tats financiers certifiÃ©s trimestriellement et un rapport annuel Ã  la BCEAO.</p>
<h2>Article 3 â€“ ConformitÃ©</h2>
<p>l'IMF s'engage Ã  respecter les ratios prudentiels, les rÃ¨gles de gouvernance et la rÃ©glementation PARMEC.</p></div>`
  },
  {
    code: 'mfi_rapport_par',
    name: "Rapport de performance portefeuille IMF (PAR)",
    category: 'commercial_financier',
    price: 6000, priceMax: 17000,
    description: "Rapport de suivi de la qualitÃ© du portefeuille de crÃ©dit d\"une IMF, incluant le calcul et l\"analyse du taux de portefeuille Ã  risque (PAR).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF", type:'text', required:true},
      {key:'periode_rapport', label:"PÃ©riode du rapport", type:'text', required:true},
      {key:'encours_total', label:"Encours total de crÃ©dit (FCFA)", type:'text', required:true},
      {key:'par30', label:"PAR > 30 jours (%)", type:'text', required:true},
      {key:'date_rapport', label:"Date du rapport", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE PORTEFEUILLE IMF (PAR)</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>PÃ©riode :</strong> {{periode_rapport}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h2>1. Indicateurs clÃ©s</h2>
<p>Encours total : <strong>{{encours_total}} FCFA</strong> | PAR {">"} 30 jours : <strong>{{par30}} %</strong></p>
<h2>2. Analyse de la qualitÃ©</h2>
<p>RÃ©partition des crÃ©dits par statut (sains, en retard, douteux, irrÃ©couvrables).</p>
<h2>3. Provisions</h2>
<p>Montant des provisions constituÃ©es conformÃ©ment aux normes BCEAO.</p>
<h2>4. Plan d'action</h2>
<p>Mesures correctives proposÃ©es pour amÃ©liorer la qualitÃ© du portefeuille.</p></div>`
  },
  {
    code: 'mfi_accord_refinancement',
    name: "Accord de refinancement IMF-banque",
    category: 'commercial_financier',
    price: 8000, priceMax: 22000,
    description: "Accord par lequel une banque commerciale accorde un refinancement Ã  une IMF pour lui permettre d\"Ã©largir son offre de crÃ©dit aux micro-entrepreneurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'nom_banque', label:"Banque refinanceur", type:'text', required:true},
      {key:'nom_imf', label:"IMF bÃ©nÃ©ficiaire", type:'text', required:true},
      {key:'montant_refinancement', label:"Montant du refinancement (FCFA)", type:'text', required:true},
      {key:'taux_refinancement', label:"Taux de refinancement (%)", type:'text', required:true},
      {key:'date_accord', label:"Date de l\"accord", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE REFINANCEMENT IMF â€“ BANQUE</h1>
<p><strong>Banque :</strong> {{nom_banque}} | <strong>IMF :</strong> {{nom_imf}}</p>
<h2>Article 1 â€“ Refinancement</h2>
<p>La Banque accorde Ã  l'IMF un refinancement de <strong>{{montant_refinancement}} FCFA</strong> au taux de <strong>{{taux_refinancement}} %</strong> l'an.</p>
<h2>Article 2 â€“ Utilisation des fonds</h2>
<p>Les fonds sont exclusivement destinÃ©s Ã  l'octroi de microcrÃ©dits aux membres de l'IMF.</p>
<h2>Article 3 â€“ Reporting</h2>
<p>l'IMF transmet trimestriellement Ã  la Banque un Ã©tat d'utilisation des fonds et un rapport de performance.</p>
<p>SignÃ© le {{date_accord}}</p></div>`
  },
  {
    code: 'mfi_service_transfert_argent',
    name: "Contrat de service de transfert d\"argent IMF",
    category: 'commercial_financier',
    price: 4500, priceMax: 13000,
    description: "Convention par laquelle une IMF propose Ã  ses membres des services de transfert d\"argent national et international en partenariat avec un opÃ©rateur agrÃ©Ã©.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF", type:'text', required:true},
      {key:'nom_operateur', label:"OpÃ©rateur de transfert partenaire", type:'text', required:true},
      {key:'zones_couverture', label:"Zones de couverture", type:'text', required:true},
      {key:'commission_transfert', label:"Commission de transfert (%)", type:'text', required:true},
      {key:'date_convention', label:"Date de la convention", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE TRANSFERT d'ARGENT IMF</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>OpÃ©rateur :</strong> {{nom_operateur}}</p>
<h2>Article 1 â€“ Service</h2>
<p>l'IMF propose via son rÃ©seau des services de transfert d'argent couvrant : <strong>{{zones_couverture}}</strong>.</p>
<h2>Article 2 â€“ Commissions</h2>
<p>Commission prÃ©levÃ©e : <strong>{{commission_transfert}} %</strong> du montant transfÃ©rÃ©, rÃ©partie entre l'IMF et l'opÃ©rateur.</p>
<h2>Article 3 â€“ ConformitÃ© LBC</h2>
<p>Toutes les transactions sont soumises aux procÃ©dures KYC et de lutte contre le blanchiment.</p>
<p>SignÃ© le {{date_convention}}</p></div>`
  },
  {
    code: 'mfi_rapport_gouvernance',
    name: "Rapport de gouvernance IMF",
    category: 'commercial_financier',
    price: 6000, priceMax: 17000,
    description: "Rapport annuel de gouvernance d\"une institution de microfinance couvrant la structure de contrÃ´le, les organes de direction et la conformitÃ© rÃ©glementaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF", type:'text', required:true},
      {key:'exercice', label:"Exercice concernÃ©", type:'text', required:true},
      {key:'nombre_administrateurs', label:"Nombre d\"administrateurs", type:'text', required:true},
      {key:'nombre_ag', label:"Nombre d\"AG tenues dans l\"annÃ©e", type:'text', required:true},
      {key:'date_rapport', label:"Date du rapport", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE GOUVERNANCE IMF</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Exercice :</strong> {{exercice}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h2>1. Structure de gouvernance</h2>
<p>Conseil d'administration composÃ© de <strong>{{nombre_administrateurs}}</strong> membres, comitÃ© de surveillance interne actif.</p>
<h2>2. Vie associative</h2>
<p><strong>{{nombre_ag}}</strong> assemblÃ©es gÃ©nÃ©rales ordinaires et extraordinaires tenues au cours de l'exercice.</p>
<h2>3. ContrÃ´le interne</h2>
<p>Ã‰tat des recommandations de l'audit interne et taux de mise en oeuvre des recommandations.</p>
<h2>4. ConformitÃ© rÃ©glementaire</h2>
<p>Respect des ratios prudentiels et des obligations dÃ©claratives envers la BCEAO.</p></div>`
  },
  {
    code: 'mfi_charte_ethique',
    name: "Charte Ã©thique IMF",
    category: 'commercial_financier',
    price: 4000, priceMax: 11000,
    description: "Charte des principes Ã©thiques et de protection des clients d\"une institution de microfinance, alignÃ©e sur les Smart Campaign Client Protection Principles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'nom_imf', label:"Nom de l\"IMF", type:'text', required:true},
      {key:'directeur_general', label:"Directeur GÃ©nÃ©ral", type:'text', required:true},
      {key:'date_adoption', label:"Date d\"adoption", type:'date', required:true},
      {key:'vision_imf', label:"Vision et mission de l\"IMF", type:'textarea', required:false},
    ]),
    body: `<div class="doc"><h1>CHARTE Ã‰THIQUE IMF</h1>
<p><strong>{{nom_imf}}</strong> â€“ AdoptÃ©e le <strong>{{date_adoption}}</strong></p>
<p>{{vision_imf}}</p>
<h2>Principe 1 â€“ Conception appropriÃ©e des produits</h2>
<p>Nos produits et services sont conÃ§us pour rÃ©pondre aux besoins rÃ©els de nos clients sans les exposer Ã  des risques excessifs.</p>
<h2>Principe 2 â€“ PrÃ©vention du surendettement</h2>
<p>Nous Ã©valuons rigoureusement la capacitÃ© de remboursement avant tout octroi de crÃ©dit.</p>
<h2>Principe 3 â€“ Transparence tarifaire</h2>
<p>Le coÃ»t total du crÃ©dit est communiquÃ© clairement en langage accessible.</p>
<h2>Principe 4 â€“ Traitement Ã©quitable des clients</h2>
<p>Aucune discrimination fondÃ©e sur le genre, l'ethnie ou la religion.</p>
<p>SignÃ© par : {{directeur_general}}</p></div>`
  },
  {
    code: 'mfi_accord_centrale_risques',
    name: "Accord de centrale des risques",
    category: 'commercial_financier',
    price: 5500, priceMax: 16000,
    description: "Convention d\"adhÃ©sion et d\"Ã©change de donnÃ©es entre une IMF et la centrale des risques de la BCEAO pour amÃ©liorer la gestion du risque de crÃ©dit.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF adhÃ©rente", type:'text', required:true},
      {key:'pays_adhesion', label:"Pays d\"adhÃ©sion", type:'text', required:true},
      {key:'identifiant_centrale', label:"Identifiant centrale des risques", type:'text', required:true},
      {key:'date_adhesion', label:"Date d\"adhÃ©sion", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD d'ADHÃ‰SION Ã€ LA CENTRALE DES RISQUES</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Pays :</strong> {{pays_adhesion}}</p>
<p><strong>Identifiant :</strong> {{identifiant_centrale}} | <strong>Date :</strong> {{date_adhesion}}</p>
<h2>Article 1 â€“ AdhÃ©sion</h2>
<p>l'IMF adhÃ¨re Ã  la centrale des risques de la BCEAO et s'engage Ã  dÃ©clarer l'ensemble de ses encours de crÃ©dit conformÃ©ment aux instructions en vigueur.</p>
<h2>Article 2 â€“ Consultation</h2>
<p>Avant tout octroi de crÃ©dit significatif, l'IMF consulte la centrale des risques pour vÃ©rifier l'endettement du candidat.</p>
<h2>Article 3 â€“ ConfidentialitÃ©</h2>
<p>Les donnÃ©es Ã©changÃ©es sont strictement confidentielles et utilisÃ©es uniquement Ã  des fins d'Ã©valuation du risque.</p></div>`
  },
  {
    code: 'mfi_convention_audit_externe',
    name: "Convention d\"audit externe IMF",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Convention annuelle liant une IMF Ã  un cabinet d\"audit externe pour la certification de ses Ã©tats financiers conformÃ©ment aux normes SYSCOHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF auditÃ©e", type:'text', required:true},
      {key:'nom_cabinet', label:"Cabinet d\"audit", type:'text', required:true},
      {key:'exercice_audite', label:"Exercice Ã  auditer", type:'text', required:true},
      {key:'honoraires_audit', label:"Honoraires d\"audit (FCFA)", type:'text', required:true},
      {key:'date_convention', label:"Date de la convention", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>CONVENTION d'AUDIT EXTERNE IMF</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Cabinet :</strong> {{nom_cabinet}}</p>
<h2>Article 1 â€“ Mission</h2>
<p>Le Cabinet est chargÃ© de certifier les Ã©tats financiers de l'IMF pour l'exercice <strong>{{exercice_audite}}</strong> selon les normes SYSCOHADA.</p>
<h2>Article 2 â€“ Honoraires</h2>
<p>Honoraires globaux : <strong>{{honoraires_audit}} FCFA</strong>, payables en deux tranches.</p>
<h2>Article 3 â€“ Livrables</h2>
<p>Rapport gÃ©nÃ©ral de commissariat aux comptes, rapport spÃ©cial et lettre de recommandations.</p>
<p>SignÃ© le {{date_convention}}</p></div>`
  },
  {
    code: 'mfi_plan_croissance',
    name: "Plan de croissance IMF",
    category: 'commercial_financier',
    price: 7500, priceMax: 22000,
    description: "Document stratÃ©gique de plan de croissance d\"une IMF sur 3 Ã  5 ans, dÃ©finissant les objectifs d\"expansion, de mobilisation de ressources et d\"impact social.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF", type:'text', required:true},
      {key:'horizon_plan', label:"Horizon du plan (annÃ©es)", type:'text', required:true},
      {key:'cible_clients', label:"Nombre cible de clients Ã  l\"horizon", type:'text', required:true},
      {key:'encours_cible', label:"Encours cible (FCFA)", type:'text', required:true},
      {key:'date_plan', label:"Date d\"Ã©laboration du plan", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE CROISSANCE IMF</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Horizon :</strong> {{horizon_plan}} ans</p>
<p><strong>Date d'Ã©laboration :</strong> {{date_plan}}</p>
<h2>1. Vision stratÃ©gique</h2>
<p>Atteindre <strong>{{cible_clients}}</strong> clients actifs et un encours de crÃ©dit de <strong>{{encours_cible}} FCFA</strong> Ã  l'horizon.</p>
<h2>2. Axes de dÃ©veloppement</h2>
<p>Extension gÃ©ographique, digitalisation des services, diversification des produits, renforcement des fonds propres.</p>
<h2>3. Plan de ressources</h2>
<p>Mobilisation de dÃ©pÃ´ts membres, refinancements bancaires, subventions de bailleurs de fonds.</p>
<h2>4. Indicateurs de performance</h2>
<p>PAR, OSS (autosuffisance opÃ©rationnelle), portÃ©e sociale, retour sur actifs.</p></div>`
  },
  {
    code: 'mfi_rapport_inclusion_financiere',
    name: "Rapport d\"inclusion financiÃ¨re",
    category: 'commercial_financier',
    price: 6500, priceMax: 18000,
    description: "Rapport d\"impact mesurant la contribution d\"une IMF Ã  l\"inclusion financiÃ¨re dans sa zone d\"intervention, selon les indicateurs standard de la BCEAO et des bailleurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'nom_imf', label:"IMF", type:'text', required:true},
      {key:'zone_intervention', label:"Zone d\"intervention", type:'text', required:true},
      {key:'nombre_clients_actifs', label:"Nombre de clients actifs", type:'text', required:true},
      {key:'taux_femmes', label:"Proportion de femmes clientes (%)", type:'text', required:true},
      {key:'date_rapport', label:"Date du rapport", type:'date', required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT d'INCLUSION FINANCIÃˆRE</h1>
<p><strong>IMF :</strong> {{nom_imf}} | <strong>Zone :</strong> {{zone_intervention}}</p>
<p><strong>Date :</strong> {{date_rapport}}</p>
<h2>1. PortÃ©e sociale</h2>
<p>Clients actifs : <strong>{{nombre_clients_actifs}}</strong> dont <strong>{{taux_femmes}} %</strong> de femmes.</p>
<h2>2. Impact Ã©conomique</h2>
<p>Revenu moyen des mÃ©nages clients avant et aprÃ¨s accÃ¨s aux services financiers.</p>
<h2>3. Innovation financiÃ¨re</h2>
<p>Services mobiles, points de service en zone rurale, produits d'assurance associÃ©s.</p>
<h2>4. Recommandations</h2>
<p>Pistes pour accroÃ®tre la portÃ©e vers les populations les plus vulnÃ©rables.</p></div>`
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
  console.log(`Batch 37a OK â€” crÃ©Ã©s:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
