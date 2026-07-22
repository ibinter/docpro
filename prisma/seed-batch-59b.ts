import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 Capital-investissement (pe2_) ──
  {
    code: 'pe2_term_sheet',
    name: "Term Sheet Investissement en Fonds Propres",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Term sheet pour investissement en fonds propres dans une société cible en Afrique francophone, conforme aux standards OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      {key:'investisseur',label:"Nom de l'investisseur",type:'text',required:true},
      {key:'societe_cible',label:"Société cible",type:'text',required:true},
      {key:'montant_investissement',label:"Montant de l'investissement (FCFA)",type:'text',required:true},
      {key:'participation',label:"Pourcentage de participation visé (%)",type:'text',required:true},
      {key:'date_validite',label:"Date de validité du term sheet",type:'date',required:true},
      {key:'conditions_suspensives',label:"Conditions suspensives principales",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>TERM SHEET INVESTISSEMENT EN FONDS PROPRES</h1><h2>CONFIDENTIEL ET NON CONTRAIGNANT</h2><p>Entre <strong>{{investisseur}}</strong> (ci-après "l'Investisseur") et <strong>{{societe_cible}}</strong> (ci-après la "Société").</p><h3>1. MONTANT ET STRUCTURE</h3><p>Montant de l'investissement : <strong>{{montant_investissement}} FCFA</strong> pour une participation de <strong>{{participation}}%</strong> au capital de la Société.</p><h3>2. CONDITIONS SUSPENSIVES</h3><p>{{conditions_suspensives}}</p><h3>3. VALIDITÉ</h3><p>Le présent term sheet est valable jusqu'au {{date_validite}}. Il est non contraignant sauf les clauses de confidentialité et d'exclusivité.</p></div>`
  },
  {
    code: 'pe2_subscription_agreement',
    name: "Accord de Souscription d'Actions (Subscription Agreement)",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 60000,
    description: "Accord de souscription d'actions pour une levée de fonds en capital-investissement, droit OHADA applicable.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'souscripteur',label:"Nom du souscripteur",type:'text',required:true},
      {key:'societe',label:"Dénomination sociale de la société",type:'text',required:true},
      {key:'nombre_actions',label:"Nombre d'actions souscrites",type:'text',required:true},
      {key:'prix_action',label:"Prix par action (FCFA)",type:'text',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true},
      {key:'representations',label:"Déclarations et garanties du souscripteur",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUSCRIPTION D'ACTIONS</h1><p><strong>{{souscripteur}}</strong> (le "Souscripteur") et <strong>{{societe}}</strong> (la "Société") conviennent ce qui suit :</p><h3>1. SOUSCRIPTION</h3><p>Le Souscripteur souscrit à <strong>{{nombre_actions}}</strong> actions au prix unitaire de <strong>{{prix_action}} FCFA</strong>, soit un montant total de souscription calculé en conséquence.</p><h3>2. DECLARATIONS ET GARANTIES</h3><p>{{representations}}</p><h3>3. DATE D'EFFET</h3><p>Le présent accord prend effet à compter du {{date_souscription}}.</p></div>`
  },
  {
    code: 'pe2_shareholders_agreement',
    name: "Pacte d'Actionnaires (Shareholders Agreement)",
    category: 'commercial_financier',
    price: 25000,
    priceMax: 75000,
    description: "Pacte d'actionnaires régissant les droits et obligations des associés d'une société cible en portefeuille, droit OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'actionnaires',label:"Liste des actionnaires parties",type:'textarea',required:true},
      {key:'societe',label:"Société concernée",type:'text',required:true},
      {key:'gouvernance',label:"Dispositions de gouvernance",type:'textarea',required:true},
      {key:'duree_pacte',label:"Durée du pacte (années)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PACTE D'ACTIONNAIRES</h1><p>Entre les actionnaires suivants : {{actionnaires}} de la société <strong>{{societe}}</strong>.</p><h3>1. GOUVERNANCE</h3><p>{{gouvernance}}</p><h3>2. DUREE</h3><p>Le présent pacte est conclu pour une durée de <strong>{{duree_pacte}} ans</strong> à compter du {{date_signature}}.</p><h3>3. DROIT APPLICABLE</h3><p>Le présent pacte est soumis au droit OHADA et aux lois applicables en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'pe2_lpa',
    name: "Accord de Gestion de Fonds d'Investissement (LPA)",
    category: 'commercial_financier',
    price: 30000,
    priceMax: 90000,
    description: "Limited Partnership Agreement (LPA) pour la gestion d'un fonds d'investissement en Afrique francophone.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'gestionnaire',label:"Gestionnaire du fonds (GP)",type:'text',required:true},
      {key:'nom_fonds',label:"Dénomination du fonds",type:'text',required:true},
      {key:'taille_fonds',label:"Taille cible du fonds (FCFA)",type:'text',required:true},
      {key:'duree_fonds',label:"Durée du fonds (années)",type:'text',required:true},
      {key:'date_constitution',label:"Date de constitution",type:'date',required:true},
      {key:'strategie',label:"Stratégie d'investissement",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE FONDS D'INVESTISSEMENT (LPA)</h1><p>Fonds : <strong>{{nom_fonds}}</strong> géré par <strong>{{gestionnaire}}</strong>.</p><h3>1. STRATEGIE</h3><p>{{strategie}}</p><h3>2. CARACTERISTIQUES</h3><p>Taille cible : <strong>{{taille_fonds}} FCFA</strong> — Durée : <strong>{{duree_fonds}} ans</strong> à compter du {{date_constitution}}.</p><h3>3. GOUVERNANCE DU FONDS</h3><p>Le Gestionnaire dispose des pouvoirs de gestion et d'investissement dans le respect de la stratégie définie.</p></div>`
  },
  {
    code: 'pe2_co_invest',
    name: "Accord de Co-investissement (Co-invest)",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 54000,
    description: "Accord de co-investissement permettant à des investisseurs tiers de participer aux opérations d'un fonds principal.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'fonds_principal',label:"Fonds principal",type:'text',required:true},
      {key:'co_investisseur',label:"Co-investisseur",type:'text',required:true},
      {key:'societe_cible',label:"Société cible",type:'text',required:true},
      {key:'montant_co_invest',label:"Montant du co-investissement (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CO-INVESTISSEMENT</h1><p>Entre <strong>{{fonds_principal}}</strong> (le "Fonds Principal") et <strong>{{co_investisseur}}</strong> (le "Co-investisseur").</p><h3>1. OBJET</h3><p>Co-investissement dans <strong>{{societe_cible}}</strong> à hauteur de <strong>{{montant_co_invest}} FCFA</strong>.</p><h3>2. CONDITIONS</h3><p>Le Co-investisseur participe aux mêmes conditions économiques que le Fonds Principal, sans droits de gouvernance spécifiques supplémentaires.</p><h3>3. DATE D'EFFET</h3><p>Le présent accord prend effet le {{date_accord}}.</p></div>`
  },
  {
    code: 'pe2_carried_interest',
    name: "Accord de Carried Interest (Gestionnaire)",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 60000,
    description: "Accord définissant les modalités de carried interest du gestionnaire d'un fonds de capital-investissement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'gestionnaire',label:"Gestionnaire bénéficiaire",type:'text',required:true},
      {key:'nom_fonds',label:"Nom du fonds",type:'text',required:true},
      {key:'taux_carried',label:"Taux de carried interest (%)",type:'text',required:true},
      {key:'hurdle_rate',label:"Taux de rendement préférentiel (hurdle rate %)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'modalites_calcul',label:"Modalités de calcul et de distribution",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CARRIED INTEREST</h1><p>Entre <strong>{{nom_fonds}}</strong> et <strong>{{gestionnaire}}</strong> (le "Gestionnaire").</p><h3>1. CARRIED INTEREST</h3><p>Le Gestionnaire bénéficie d'un carried interest de <strong>{{taux_carried}}%</strong> sur les plus-values distribuées au-delà du hurdle rate de <strong>{{hurdle_rate}}%</strong>.</p><h3>2. MODALITES DE CALCUL</h3><p>{{modalites_calcul}}</p><h3>3. DATE D'EFFET</h3><p>Le présent accord prend effet le {{date_accord}}.</p></div>`
  },
  {
    code: 'pe2_liquidation_preference',
    name: "Accord de Clause de Liquidation Préférentielle",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Accord établissant une clause de liquidation préférentielle au profit d'investisseurs en capital-investissement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'investisseur',label:"Investisseur bénéficiaire",type:'text',required:true},
      {key:'societe',label:"Société concernée",type:'text',required:true},
      {key:'montant_prefere',label:"Montant préférentiel garanti (FCFA)",type:'text',required:true},
      {key:'multiple',label:"Multiple de liquidation (ex: 1x, 2x)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CLAUSE DE LIQUIDATION PREFERENTIELLE</h1><p>Entre <strong>{{investisseur}}</strong> et <strong>{{societe}}</strong>.</p><h3>1. LIQUIDATION PREFERENTIELLE</h3><p>En cas de liquidation, cession ou événement de liquidité, <strong>{{investisseur}}</strong> perçoit en priorité <strong>{{multiple}} x {{montant_prefere}} FCFA</strong> avant toute distribution aux autres actionnaires.</p><h3>2. RANG DE PRIORITE</h3><p>La préférence de liquidation est de premier rang sauf accord contraire entre les parties.</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'pe2_anti_dilution',
    name: "Accord de Clause Anti-dilution (Ratchet)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Accord de clause anti-dilution de type ratchet protégeant les investisseurs en cas de tour de financement à valorisation inférieure.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      {key:'investisseur',label:"Investisseur protégé",type:'text',required:true},
      {key:'societe',label:"Société concernée",type:'text',required:true},
      {key:'prix_reference',label:"Prix de référence par action (FCFA)",type:'text',required:true},
      {key:'type_ratchet',label:"Type de ratchet (full ratchet / broad-based weighted average)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CLAUSE ANTI-DILUTION (RATCHET)</h1><p>Entre <strong>{{investisseur}}</strong> et <strong>{{societe}}</strong>.</p><h3>1. MECANISME</h3><p>En cas d'émission de nouvelles actions à un prix inférieur à <strong>{{prix_reference}} FCFA</strong>, le mécanisme <strong>{{type_ratchet}}</strong> s'applique pour ajuster le prix de conversion des actions de l'Investisseur.</p><h3>2. CALCUL DE L'AJUSTEMENT</h3><p>L'ajustement est calculé conformément aux formules définies en annexe.</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'pe2_rofr',
    name: "Accord de Droit de Préemption (ROFR)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Accord de droit de préemption (Right of First Refusal) en faveur des actionnaires existants lors de toute cession de titres.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 73,
    fieldsJson: F([
      {key:'beneficiaires',label:"Bénéficiaires du droit de préemption",type:'textarea',required:true},
      {key:'societe',label:"Société concernée",type:'text',required:true},
      {key:'delai_exercice',label:"Délai d'exercice du droit (jours)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DROIT DE PREEMPTION (ROFR)</h1><p>Société : <strong>{{societe}}</strong>. Bénéficiaires : {{beneficiaires}}.</p><h3>1. DROIT DE PREEMPTION</h3><p>Toute cession de titres doit être notifiée aux bénéficiaires qui disposent d'un délai de <strong>{{delai_exercice}} jours</strong> pour exercer leur droit de préemption aux mêmes conditions.</p><h3>2. RENONCIATION</h3><p>L'absence de réponse dans le délai imparti vaut renonciation au droit de préemption pour l'opération considérée.</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'pe2_tag_along',
    name: "Accord de Droit de Suite (Tag-along)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Accord de droit de suite (tag-along) permettant aux actionnaires minoritaires de céder leurs titres aux mêmes conditions qu'un actionnaire majoritaire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      {key:'actionnaire_cedant',label:"Actionnaire cédant (majoritaire)",type:'text',required:true},
      {key:'beneficiaires_tag',label:"Bénéficiaires du tag-along (minoritaires)",type:'textarea',required:true},
      {key:'societe',label:"Société concernée",type:'text',required:true},
      {key:'seuil_declenchement',label:"Seuil de déclenchement (% du capital)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DROIT DE SUITE (TAG-ALONG)</h1><p>Société : <strong>{{societe}}</strong>. Actionnaire cédant : <strong>{{actionnaire_cedant}}</strong>.</p><h3>1. DROIT DE SUITE</h3><p>Lorsque <strong>{{actionnaire_cedant}}</strong> cède plus de <strong>{{seuil_declenchement}}%</strong> du capital, les bénéficiaires suivants ont le droit de participer à la cession aux mêmes conditions : {{beneficiaires_tag}}.</p><h3>2. PROCEDURE</h3><p>L'actionnaire cédant notifie les bénéficiaires au moins 30 jours avant la cession envisagée.</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'pe2_drag_along',
    name: "Accord de Droit d'Entraînement (Drag-along)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Accord de droit d'entraînement (drag-along) permettant à des actionnaires majoritaires de contraindre les minoritaires à céder leurs titres lors d'une cession globale.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 69,
    fieldsJson: F([
      {key:'actionnaires_majoritaires',label:"Actionnaires majoritaires porteurs du drag-along",type:'textarea',required:true},
      {key:'societe',label:"Société concernée",type:'text',required:true},
      {key:'seuil_declenchement',label:"Seuil de déclenchement (% du capital)",type:'text',required:true},
      {key:'conditions_exercice',label:"Conditions d'exercice du drag-along",type:'textarea',required:false},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DROIT D'ENTRAINEMENT (DRAG-ALONG)</h1><p>Société : <strong>{{societe}}</strong>.</p><h3>1. DROIT D'ENTRAINEMENT</h3><p>Si les actionnaires détenant plus de <strong>{{seuil_declenchement}}%</strong> du capital — à savoir : {{actionnaires_majoritaires}} — décident de céder la totalité des titres à un tiers, ils peuvent contraindre les actionnaires minoritaires à participer à la cession aux mêmes conditions.</p><h3>2. CONDITIONS D'EXERCICE</h3><p>{{conditions_exercice}}</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'pe2_exit_clause',
    name: "Accord de Clause de Sortie (Exit Clause)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Accord définissant les modalités et conditions de sortie des investisseurs d'une société en portefeuille.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'investisseur',label:"Investisseur",type:'text',required:true},
      {key:'societe',label:"Société concernée",type:'text',required:true},
      {key:'modalites_sortie',label:"Modalités de sortie (IPO, cession stratégique, rachat)",type:'textarea',required:true},
      {key:'horizon_sortie',label:"Horizon de sortie visé (années)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CLAUSE DE SORTIE</h1><p>Entre <strong>{{investisseur}}</strong> et <strong>{{societe}}</strong>.</p><h3>1. MODALITES DE SORTIE</h3><p>{{modalites_sortie}}</p><h3>2. HORIZON</h3><p>L'horizon de sortie visé est de <strong>{{horizon_sortie}} ans</strong> à compter de la date d'investissement.</p><h3>3. OBLIGATIONS DES PARTIES</h3><p>Les parties s'engagent à coopérer de bonne foi pour faciliter la réalisation d'une sortie dans les conditions définies.</p><h3>4. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'pe2_cession_parts_fonds',
    name: "Accord de Cession de Parts de Fonds",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 54000,
    description: "Accord de cession de parts dans un fonds d'investissement, incluant les conditions de transfert et les droits associés.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'cedant',label:"Cédant (vendeur des parts)",type:'text',required:true},
      {key:'cessionnaire',label:"Cessionnaire (acquéreur des parts)",type:'text',required:true},
      {key:'nom_fonds',label:"Nom du fonds",type:'text',required:true},
      {key:'nombre_parts',label:"Nombre de parts cédées",type:'text',required:true},
      {key:'prix_parts',label:"Prix global de cession (FCFA)",type:'text',required:true},
      {key:'date_cession',label:"Date de cession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE PARTS DE FONDS</h1><p><strong>{{cedant}}</strong> (le "Cédant") cède à <strong>{{cessionnaire}}</strong> (le "Cessionnaire") <strong>{{nombre_parts}}</strong> parts du fonds <strong>{{nom_fonds}}</strong> pour un prix global de <strong>{{prix_parts}} FCFA</strong>.</p><h3>1. TRANSFERT DES DROITS</h3><p>La cession emporte transfert de tous les droits patrimoniaux et extrapatrimoniaux attachés aux parts cédées.</p><h3>2. GARANTIES</h3><p>Le Cédant garantit être le plein propriétaire des parts cédées, libres de tout nantissement ou sûreté.</p><h3>3. DATE D'EFFET</h3><p>Cession effective le {{date_cession}}.</p></div>`
  },
  {
    code: 'pe2_series_a_b',
    name: "Accord de Deuxième Tour de Financement (Series A/B)",
    category: 'commercial_financier',
    price: 25000,
    priceMax: 75000,
    description: "Accord encadrant un tour de financement Series A ou B pour une startup ou PME africaine.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'societe',label:"Société bénéficiaire",type:'text',required:true},
      {key:'investisseurs',label:"Investisseurs participants",type:'textarea',required:true},
      {key:'serie',label:"Série du tour (A ou B)",type:'text',required:true},
      {key:'montant_total',label:"Montant total levé (FCFA)",type:'text',required:true},
      {key:'valorisation_pre',label:"Valorisation pre-money (FCFA)",type:'text',required:true},
      {key:'date_closing',label:"Date de closing",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE TOUR DE FINANCEMENT SERIE {{serie}}</h1><p>Société : <strong>{{societe}}</strong>. Investisseurs : {{investisseurs}}.</p><h3>1. TERMES FINANCIERS</h3><p>Montant levé : <strong>{{montant_total}} FCFA</strong> — Valorisation pre-money : <strong>{{valorisation_pre}} FCFA</strong>.</p><h3>2. DOCUMENTATION</h3><p>Le présent accord s'accompagne d'un pacte d'actionnaires, d'un accord de souscription et d'une mise à jour des statuts.</p><h3>3. CLOSING</h3><p>Le closing est prévu le {{date_closing}} sous réserve de la réalisation des conditions suspensives.</p></div>`
  },
  {
    code: 'pe2_side_letter',
    name: "Accord de Side Letter (Conditions Spéciales)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Side letter accordant des droits ou conditions spéciales à un investisseur spécifique dans un fonds ou une société.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'investisseur',label:"Investisseur bénéficiaire",type:'text',required:true},
      {key:'entite',label:"Fonds ou société concernée",type:'text',required:true},
      {key:'conditions_speciales',label:"Conditions spéciales accordées",type:'textarea',required:true},
      {key:'date_side_letter',label:"Date de la side letter",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>SIDE LETTER (CONDITIONS SPECIALES)</h1><p>Entre <strong>{{entite}}</strong> et <strong>{{investisseur}}</strong>.</p><h3>1. CONDITIONS SPECIALES</h3><p>Les conditions spéciales suivantes sont accordées à <strong>{{investisseur}}</strong> à titre de dérogation aux documents constitutifs standards :</p><p>{{conditions_speciales}}</p><h3>2. CONFIDENTIALITE</h3><p>La présente side letter est strictement confidentielle entre les parties signataires.</p><h3>3. DATE D'EFFET</h3><p>Side letter signée le {{date_side_letter}}.</p></div>`
  },
  {
    code: 'pe2_management_fees',
    name: "Accord de Management Fees (Fonds-Gestionnaire)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Accord définissant les frais de gestion (management fees) payables par un fonds à son gestionnaire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'fonds',label:"Nom du fonds",type:'text',required:true},
      {key:'gestionnaire',label:"Gestionnaire (GP)",type:'text',required:true},
      {key:'taux_frais',label:"Taux de frais de gestion annuels (%)",type:'text',required:true},
      {key:'base_calcul',label:"Base de calcul des frais (capital engagé / investi / NAV)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'modalites_paiement',label:"Modalités et fréquence de paiement",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MANAGEMENT FEES</h1><p>Fonds : <strong>{{fonds}}</strong> — Gestionnaire : <strong>{{gestionnaire}}</strong>.</p><h3>1. FRAIS DE GESTION</h3><p>Le Gestionnaire perçoit des frais de gestion annuels de <strong>{{taux_frais}}%</strong> calculés sur la base du <strong>{{base_calcul}}</strong>.</p><h3>2. MODALITES DE PAIEMENT</h3><p>{{modalites_paiement}}</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'pe2_escrow_account',
    name: "Accord d'Escrow Account (M&A)",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 54000,
    description: "Accord de séquestre (escrow) dans le cadre d'une opération de M&A, garantissant le paiement d'indemnités post-closing.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'acquereur',label:"Acquéreur",type:'text',required:true},
      {key:'vendeur',label:"Vendeur",type:'text',required:true},
      {key:'agent_sequestre',label:"Agent séquestre (banque ou notaire)",type:'text',required:true},
      {key:'montant_escrow',label:"Montant séquestré (FCFA)",type:'text',required:true},
      {key:'duree_sequestre',label:"Durée du séquestre (mois)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ESCROW ACCOUNT</h1><p>Entre <strong>{{acquereur}}</strong> et <strong>{{vendeur}}</strong>, avec <strong>{{agent_sequestre}}</strong> comme agent séquestre.</p><h3>1. MONTANT EN SEQUESTRE</h3><p>Un montant de <strong>{{montant_escrow}} FCFA</strong> est déposé en séquestre pour une durée de <strong>{{duree_sequestre}} mois</strong>.</p><h3>2. CONDITIONS DE LIBERATION</h3><p>Les fonds séquestrés seront libérés selon les conditions définies dans le contrat de cession principal.</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'pe2_guarantee_indemnity',
    name: "Accord de Guarantee and Indemnity (M&A)",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 60000,
    description: "Accord de garantie et indemnisation dans le cadre d'une opération de M&A, définissant les garanties données par le vendeur.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'garant',label:"Garant (vendeur)",type:'text',required:true},
      {key:'beneficiaire',label:"Bénéficiaire de la garantie (acquéreur)",type:'text',required:true},
      {key:'plafond_garantie',label:"Plafond de la garantie (FCFA)",type:'text',required:true},
      {key:'duree_garantie',label:"Durée de la garantie (années)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GUARANTEE AND INDEMNITY</h1><p>Garant : <strong>{{garant}}</strong> — Bénéficiaire : <strong>{{beneficiaire}}</strong>.</p><h3>1. GARANTIES</h3><p>Le Garant accorde au Bénéficiaire des garanties sur l'exactitude des déclarations et représentations faites dans le contrat de cession.</p><h3>2. PLAFOND ET DUREE</h3><p>La garantie est plafonnée à <strong>{{plafond_garantie}} FCFA</strong> et court pendant <strong>{{duree_garantie}} an(s)</strong> à compter du closing.</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'pe2_vendor_due_diligence',
    name: "Accord de Vendor Due Diligence",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Accord encadrant la réalisation d'une due diligence vendeur (VDD) préalable à une cession d'entreprise.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'mandant',label:"Mandant (vendeur)",type:'text',required:true},
      {key:'prestataire',label:"Cabinet en charge de la VDD",type:'text',required:true},
      {key:'societe_cible',label:"Société cible de la VDD",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de la due diligence",type:'textarea',required:true},
      {key:'date_remise',label:"Date de remise du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENDOR DUE DILIGENCE</h1><p><strong>{{mandant}}</strong> mandate <strong>{{prestataire}}</strong> pour réaliser une due diligence vendeur sur <strong>{{societe_cible}}</strong>.</p><h3>1. PERIMETRE</h3><p>{{perimetre}}</p><h3>2. LIVRABLE</h3><p>Un rapport de VDD sera remis au plus tard le {{date_remise}} et pourra être partagé avec les acquéreurs potentiels préqualifiés.</p><h3>3. RESPONSABILITE</h3><p>La responsabilité du prestataire est limitée aux destinataires expressément autorisés du rapport.</p></div>`
  },
  {
    code: 'pe2_spa',
    name: "Accord de SPA (Share Purchase Agreement)",
    category: 'commercial_financier',
    price: 30000,
    priceMax: 90000,
    description: "Contrat de cession d'actions (Share Purchase Agreement) pour l'acquisition de titres dans une société OHADA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 88,
    fieldsJson: F([
      {key:'acquereur',label:"Acquéreur",type:'text',required:true},
      {key:'vendeur',label:"Vendeur",type:'text',required:true},
      {key:'societe',label:"Société cible",type:'text',required:true},
      {key:'nombre_actions',label:"Nombre d'actions cédées",type:'text',required:true},
      {key:'prix_total',label:"Prix total de cession (FCFA)",type:'text',required:true},
      {key:'date_signing',label:"Date de signature (signing)",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CESSION D'ACTIONS (SPA)</h1><p><strong>{{vendeur}}</strong> (le "Vendeur") cède à <strong>{{acquereur}}</strong> (l'"Acquéreur") <strong>{{nombre_actions}}</strong> actions de <strong>{{societe}}</strong> pour un prix total de <strong>{{prix_total}} FCFA</strong>.</p><h3>1. CONDITIONS SUSPENSIVES</h3><p>La cession est conditionnée à l'obtention des autorisations réglementaires nécessaires et à la réalisation satisfaisante de la due diligence.</p><h3>2. GARANTIES VENDEUR</h3><p>Le Vendeur accorde à l'Acquéreur les garanties d'actif et de passif usuelles.</p><h3>3. DROIT APPLICABLE</h3><p>Le présent contrat est soumis au droit OHADA. Signé le {{date_signing}}.</p></div>`
  },
  {
    code: 'pe2_apa',
    name: "Accord de APA (Asset Purchase Agreement)",
    category: 'commercial_financier',
    price: 28000,
    priceMax: 84000,
    description: "Contrat de cession d'actifs (Asset Purchase Agreement) pour l'acquisition d'actifs d'une entreprise en Afrique francophone.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'acquereur',label:"Acquéreur",type:'text',required:true},
      {key:'cedant',label:"Cédant des actifs",type:'text',required:true},
      {key:'description_actifs',label:"Description des actifs cédés",type:'textarea',required:true},
      {key:'prix_actifs',label:"Prix de cession des actifs (FCFA)",type:'text',required:true},
      {key:'date_transfert',label:"Date de transfert des actifs",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CESSION D'ACTIFS (APA)</h1><p><strong>{{cedant}}</strong> cède à <strong>{{acquereur}}</strong> les actifs suivants pour un prix de <strong>{{prix_actifs}} FCFA</strong> :</p><p>{{description_actifs}}</p><h3>1. EXCLUSION DU PASSIF</h3><p>Sauf stipulation contraire, le passif associé aux actifs cédés demeure à la charge du Cédant.</p><h3>2. DATE DE TRANSFERT</h3><p>Le transfert de propriété des actifs interviendra le {{date_transfert}}.</p></div>`
  },
  {
    code: 'pe2_earn_out',
    name: "Accord de Earn-out (Complément de Prix)",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 54000,
    description: "Accord de earn-out définissant les modalités de versement d'un complément de prix basé sur les performances futures de la société acquise.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'acquereur',label:"Acquéreur",type:'text',required:true},
      {key:'vendeur',label:"Vendeur",type:'text',required:true},
      {key:'societe',label:"Société concernée",type:'text',required:true},
      {key:'montant_earn_out',label:"Montant maximum du earn-out (FCFA)",type:'text',required:true},
      {key:'indicateurs_performance',label:"Indicateurs de performance (KPIs)",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE EARN-OUT (COMPLEMENT DE PRIX)</h1><p>Entre <strong>{{acquereur}}</strong> et <strong>{{vendeur}}</strong> concernant <strong>{{societe}}</strong>.</p><h3>1. COMPLEMENT DE PRIX</h3><p>Un complément de prix pouvant aller jusqu'à <strong>{{montant_earn_out}} FCFA</strong> sera versé par l'Acquéreur au Vendeur en fonction des indicateurs de performance suivants :</p><p>{{indicateurs_performance}}</p><h3>2. PERIODE DE MESURE</h3><p>Les indicateurs sont mesurés sur les exercices suivant la date du closing.</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'pe2_rapport_activite_fonds',
    name: "Rapport d'Activité Fonds de Capital-investissement",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Modèle de rapport d'activité annuel ou semestriel d'un fonds de capital-investissement destiné aux investisseurs (LPs).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'nom_fonds',label:"Nom du fonds",type:'text',required:true},
      {key:'periode',label:"Période du rapport (ex: S1 2025)",type:'text',required:true},
      {key:'nav_total',label:"Valeur nette d'inventaire totale (FCFA)",type:'text',required:true},
      {key:'resume_activite',label:"Résumé des activités d'investissement",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'ACTIVITE — {{nom_fonds}}</h1><h2>Période : {{periode}}</h2><h3>1. RESUME</h3><p>{{resume_activite}}</p><h3>2. VALORISATION</h3><p>La valeur nette d'inventaire (NAV) totale du fonds s'établit à <strong>{{nav_total}} FCFA</strong> au {{date_rapport}}.</p><h3>3. PERSPECTIVES</h3><p>Le gestionnaire présente les perspectives d'investissement et de désinvestissement pour la période à venir.</p></div>`
  },
  {
    code: 'pe2_plan_dev_fonds_afrique',
    name: "Plan de Développement Fonds Afrique",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Plan de développement stratégique d'un fonds de capital-investissement focalisé sur l'Afrique subsaharienne francophone.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 61,
    fieldsJson: F([
      {key:'nom_fonds',label:"Nom du fonds",type:'text',required:true},
      {key:'gestionnaire',label:"Gestionnaire",type:'text',required:true},
      {key:'zones_geographiques',label:"Zones géographiques ciblées",type:'textarea',required:true},
      {key:'secteurs_cibles',label:"Secteurs d'investissement cibles",type:'textarea',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DEVELOPPEMENT — {{nom_fonds}}</h1><p>Gestionnaire : <strong>{{gestionnaire}}</strong></p><h3>1. ZONES GEOGRAPHIQUES</h3><p>{{zones_geographiques}}</p><h3>2. SECTEURS CIBLES</h3><p>{{secteurs_cibles}}</p><h3>3. OBJECTIFS</h3><p>Le fonds vise à déployer son capital sur des PME et ETI africaines à fort potentiel de croissance, en accompagnant leur développement sur 5 à 7 ans.</p><h3>4. DATE</h3><p>Plan établi le {{date_plan}}.</p></div>`
  },
  {
    code: 'pe2_charte_esg',
    name: "Charte ESG du Fonds d'Investissement Afrique",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Charte définissant les engagements environnementaux, sociaux et de gouvernance (ESG) d'un fonds d'investissement opérant en Afrique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      {key:'nom_fonds',label:"Nom du fonds",type:'text',required:true},
      {key:'gestionnaire',label:"Gestionnaire",type:'text',required:true},
      {key:'engagements_esg',label:"Principaux engagements ESG",type:'textarea',required:true},
      {key:'indicateurs_suivi',label:"Indicateurs de suivi ESG",type:'textarea',required:false},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE ESG — {{nom_fonds}}</h1><p>Gestionnaire : <strong>{{gestionnaire}}</strong></p><h3>1. ENGAGEMENTS ESG</h3><p>{{engagements_esg}}</p><h3>2. INDICATEURS DE SUIVI</h3><p>{{indicateurs_suivi}}</p><h3>3. REPORTING</h3><p>Le fonds publie annuellement un rapport ESG consolidé à destination de ses investisseurs et parties prenantes.</p><h3>4. DATE D'ADOPTION</h3><p>Charte adoptée le {{date_adoption}}.</p></div>`
  },

  // ── 25 Marché financier BRVM (brvm_) ──
  {
    code: 'brvm_accord_sgi',
    name: "Accord de Service de Société de Gestion et d'Intermédiation (SGI)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Contrat de service entre un client et une Société de Gestion et d'Intermédiation (SGI) agréée sur la BRVM.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'sgi',label:"Dénomination de la SGI",type:'text',required:true},
      {key:'services',label:"Services rendus par la SGI",type:'textarea',required:true},
      {key:'commission',label:"Commission de courtage (%)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE SGI — BRVM</h1><p>Entre <strong>{{client}}</strong> (le "Client") et <strong>{{sgi}}</strong> (la "SGI"), membre de la Bourse Régionale des Valeurs Mobilières (BRVM).</p><h3>1. SERVICES</h3><p>{{services}}</p><h3>2. COMMISSION</h3><p>Le Client rémunère la SGI par une commission de courtage de <strong>{{commission}}%</strong> sur chaque transaction exécutée.</p><h3>3. REGLEMENTATION</h3><p>Le présent accord est soumis à la réglementation de l'AMF-UMOA et aux règles de la BRVM.</p><h3>4. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_ouverture_compte_titres',
    name: "Accord d'Ouverture de Compte-titres BRVM",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Convention d'ouverture de compte-titres auprès d'une SGI pour opérer sur la BRVM.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'titulaire',label:"Titulaire du compte",type:'text',required:true},
      {key:'sgi',label:"SGI gestionnaire",type:'text',required:true},
      {key:'type_compte',label:"Type de compte (personne physique / morale)",type:'text',required:true},
      {key:'date_ouverture',label:"Date d'ouverture",type:'date',required:true},
      {key:'conditions',label:"Conditions particulières",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CONVENTION D'OUVERTURE DE COMPTE-TITRES BRVM</h1><p>La SGI <strong>{{sgi}}</strong> ouvre un compte-titres au nom de <strong>{{titulaire}}</strong> (compte de type : <strong>{{type_compte}}</strong>).</p><h3>1. FONCTIONNEMENT</h3><p>Le compte permet la détention et la négociation de valeurs mobilières cotées sur la BRVM et toute autre place autorisée par l'AMF-UMOA.</p><h3>2. CONDITIONS PARTICULIERES</h3><p>{{conditions}}</p><h3>3. DATE D'OUVERTURE</h3><p>Compte ouvert le {{date_ouverture}}.</p></div>`
  },
  {
    code: 'brvm_courtage_valeurs',
    name: "Accord de Service de Courtage en Valeurs Mobilières",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Accord de courtage en valeurs mobilières pour l'exécution d'ordres d'achat et de vente sur la BRVM.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'courtier',label:"Société de courtage (SGI)",type:'text',required:true},
      {key:'types_ordres',label:"Types d'ordres autorisés",type:'textarea',required:true},
      {key:'tarifs',label:"Grille tarifaire applicable",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COURTAGE EN VALEURS MOBILIERES</h1><p>Client : <strong>{{client}}</strong> — Courtier : <strong>{{courtier}}</strong>.</p><h3>1. ORDRES AUTORISES</h3><p>{{types_ordres}}</p><h3>2. TARIFICATION</h3><p>{{tarifs}}</p><h3>3. EXECUTION</h3><p>Le Courtier exécute les ordres dans les meilleures conditions possibles conformément aux règles de la BRVM.</p><h3>4. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_ipo',
    name: "Accord de Souscription à une Introduction en Bourse (IPO BRVM)",
    category: 'commercial_financier',
    price: 25000,
    priceMax: 75000,
    description: "Accord de souscription dans le cadre d'une introduction en bourse (IPO) sur la BRVM.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'souscripteur',label:"Souscripteur",type:'text',required:true},
      {key:'societe_emettrice',label:"Société émettrice",type:'text',required:true},
      {key:'nombre_actions_offertes',label:"Nombre d'actions souscrites",type:'text',required:true},
      {key:'prix_introduction',label:"Prix d'introduction par action (FCFA)",type:'text',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SOUSCRIPTION IPO BRVM</h1><p><strong>{{souscripteur}}</strong> souscrit à <strong>{{nombre_actions_offertes}}</strong> actions de <strong>{{societe_emettrice}}</strong> au prix d'introduction de <strong>{{prix_introduction}} FCFA</strong> par action.</p><h3>1. CONDITIONS</h3><p>La souscription est soumise à l'approbation du visa de l'AMF-UMOA et aux résultats du livre d'ordres.</p><h3>2. PAIEMENT</h3><p>Le montant total de souscription doit être versé à la date indiquée dans le prospectus d'introduction.</p><h3>3. DATE DE SOUSCRIPTION</h3><p>Souscription effectuée le {{date_souscription}}.</p></div>`
  },
  {
    code: 'brvm_ape',
    name: "Accord de Service d'Appel Public à l'Epargne (APE)",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 60000,
    description: "Accord encadrant une opération d'appel public à l'épargne (APE) sur le marché financier de l'UEMOA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'emetteur',label:"Emetteur",type:'text',required:true},
      {key:'chef_file',label:"Chef de file de l'opération (SGI)",type:'text',required:true},
      {key:'montant_ape',label:"Montant total de l'APE (FCFA)",type:'text',required:true},
      {key:'nature_titres',label:"Nature des titres offerts (actions, obligations)",type:'text',required:true},
      {key:'date_visa',label:"Date de visa AMF-UMOA",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'APPEL PUBLIC A L'EPARGNE (APE)</h1><p>Emetteur : <strong>{{emetteur}}</strong> — Chef de file : <strong>{{chef_file}}</strong>.</p><h3>1. OPERATION</h3><p>Offre publique portant sur <strong>{{nature_titres}}</strong> pour un montant total de <strong>{{montant_ape}} FCFA</strong>.</p><h3>2. VISA REGULATEUR</h3><p>L'opération est réalisée sous le visa de l'AMF-UMOA obtenu le {{date_visa}}.</p><h3>3. RESPONSABILITES</h3><p>Le Chef de file est responsable de la coordination de l'opération, de la constitution du syndicat de placement et du respect du calendrier.</p></div>`
  },
  {
    code: 'brvm_emprunt_obligataire',
    name: "Accord d'Emission d'Obligations (Emprunt Obligataire)",
    category: 'commercial_financier',
    price: 25000,
    priceMax: 75000,
    description: "Accord d'émission d'un emprunt obligataire sur le marché financier de l'UEMOA / BRVM.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      {key:'emetteur',label:"Emetteur des obligations",type:'text',required:true},
      {key:'montant_emprunt',label:"Montant de l'emprunt (FCFA)",type:'text',required:true},
      {key:'taux_interet',label:"Taux d'intérêt annuel (%)",type:'text',required:true},
      {key:'maturite',label:"Maturité des obligations (années)",type:'text',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true},
      {key:'utilisation_fonds',label:"Utilisation des fonds levés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'EMISSION D'OBLIGATIONS</h1><p>Emetteur : <strong>{{emetteur}}</strong>.</p><h3>1. CARACTERISTIQUES</h3><p>Montant : <strong>{{montant_emprunt}} FCFA</strong> — Taux : <strong>{{taux_interet}}%</strong> — Maturité : <strong>{{maturite}} ans</strong>.</p><h3>2. UTILISATION DES FONDS</h3><p>{{utilisation_fonds}}</p><h3>3. DATE D'EMISSION</h3><p>Obligations émises le {{date_emission}} sous le visa de l'AMF-UMOA.</p></div>`
  },
  {
    code: 'brvm_tenue_registre',
    name: "Accord de Service de Tenue de Registre (DC/BR)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Accord de service de tenue de registre des actionnaires et porteurs d'obligations auprès du Dépositaire Central / Banque de Règlement (DC/BR) de la BRVM.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'emetteur',label:"Emetteur (société cotée)",type:'text',required:true},
      {key:'dcbr',label:"DC/BR prestataire",type:'text',required:true},
      {key:'nature_titres',label:"Nature des titres (actions, obligations)",type:'text',required:true},
      {key:'nombre_porteurs',label:"Nombre estimé de porteurs",type:'text',required:false},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TENUE DE REGISTRE — DC/BR BRVM</h1><p>Emetteur : <strong>{{emetteur}}</strong> — Prestataire DC/BR : <strong>{{dcbr}}</strong>.</p><h3>1. OBJET</h3><p>Tenue du registre des porteurs de <strong>{{nature_titres}}</strong> de l'émetteur, incluant la gestion des transferts et le service des droits financiers.</p><h3>2. OBLIGATIONS</h3><p>Le DC/BR assure la tenue à jour du registre, la gestion des droits détachés et la transmission des informations réglementaires à l'AMF-UMOA.</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_gestion_fortune',
    name: "Accord de Service de Gestionnaire de Fortune (SGP)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Contrat de gestion de fortune entre un client et une Société de Gestion de Portefeuille (SGP) agréée par l'AMF-UMOA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'client',label:"Client (investisseur)",type:'text',required:true},
      {key:'sgp',label:"Société de Gestion de Portefeuille (SGP)",type:'text',required:true},
      {key:'montant_confie',label:"Montant confié en gestion (FCFA)",type:'text',required:true},
      {key:'profil_risque',label:"Profil de risque du client",type:'text',required:true},
      {key:'objectifs',label:"Objectifs de gestion",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTIONNAIRE DE FORTUNE</h1><p>Client : <strong>{{client}}</strong> — SGP : <strong>{{sgp}}</strong>.</p><h3>1. MISSION</h3><p>La SGP gère un portefeuille de <strong>{{montant_confie}} FCFA</strong> pour le compte du Client, selon un profil de risque <strong>{{profil_risque}}</strong>.</p><h3>2. OBJECTIFS</h3><p>{{objectifs}}</p><h3>3. REMUNERATION</h3><p>La SGP perçoit des frais de gestion définis en annexe tarifaire.</p><h3>4. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_opcvm',
    name: "Accord de Service d'OPCVM (Sicav, FCP)",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 54000,
    description: "Accord de souscription et de service relatif à un OPCVM (SICAV ou FCP) agréé par l'AMF-UMOA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'investisseur',label:"Investisseur souscripteur",type:'text',required:true},
      {key:'opcvm',label:"Dénomination de l'OPCVM",type:'text',required:true},
      {key:'societe_gestion',label:"Société de gestion de l'OPCVM",type:'text',required:true},
      {key:'montant_souscription',label:"Montant de souscription (FCFA)",type:'text',required:true},
      {key:'date_souscription',label:"Date de souscription",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE OPCVM — {{opcvm}}</h1><p>Investisseur : <strong>{{investisseur}}</strong> — Société de gestion : <strong>{{societe_gestion}}</strong>.</p><h3>1. SOUSCRIPTION</h3><p>Souscription de parts de l'OPCVM <strong>{{opcvm}}</strong> pour un montant de <strong>{{montant_souscription}} FCFA</strong> à la valeur liquidative du {{date_souscription}}.</p><h3>2. CONDITIONS DE RACHAT</h3><p>Le rachat des parts est possible aux conditions définies dans le prospectus de l'OPCVM, visé par l'AMF-UMOA.</p></div>`
  },
  {
    code: 'brvm_pension_livree',
    name: "Accord de Service de Pension Livrée (Repo)",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 54000,
    description: "Accord de pension livrée (repo) portant sur des valeurs mobilières cotées sur la BRVM.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'vendeur_repo',label:"Vendeur à terme (emprunteur de liquidités)",type:'text',required:true},
      {key:'acheteur_repo',label:"Acheteur à terme (prêteur de liquidités)",type:'text',required:true},
      {key:'titres',label:"Titres mis en pension",type:'text',required:true},
      {key:'montant',label:"Montant de la pension (FCFA)",type:'text',required:true},
      {key:'taux_repo',label:"Taux repo (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PENSION LIVREE (REPO)</h1><p>Entre <strong>{{vendeur_repo}}</strong> (Vendeur à terme) et <strong>{{acheteur_repo}}</strong> (Acheteur à terme).</p><h3>1. OBJET</h3><p>Cession temporaire de <strong>{{titres}}</strong> en contrepartie de <strong>{{montant}} FCFA</strong> au taux repo de <strong>{{taux_repo}}%</strong>.</p><h3>2. DATE D'EFFET</h3><p>Pension initiée le {{date_debut}} pour la durée convenue entre les parties.</p><h3>3. REGLEMENT</h3><p>Le règlement-livraison est assuré par le DC/BR de la BRVM.</p></div>`
  },
  {
    code: 'brvm_pret_titres',
    name: "Accord de Service de Prêt de Titres",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Accord de prêt de titres permettant à un investisseur de prêter temporairement ses valeurs mobilières en échange d'une rémunération.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'preteur',label:"Prêteur de titres",type:'text',required:true},
      {key:'emprunteur',label:"Emprunteur de titres",type:'text',required:true},
      {key:'titres_pretes',label:"Titres prêtés (nature et quantité)",type:'text',required:true},
      {key:'remuneration',label:"Rémunération annuelle du prêt (%)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRET DE TITRES</h1><p>Prêteur : <strong>{{preteur}}</strong> — Emprunteur : <strong>{{emprunteur}}</strong>.</p><h3>1. OBJET DU PRET</h3><p>Prêt de <strong>{{titres_pretes}}</strong> en contrepartie d'une rémunération annuelle de <strong>{{remuneration}}%</strong> de la valeur des titres.</p><h3>2. GARANTIE</h3><p>L'Emprunteur constitue une garantie en espèces ou en titres équivalents au profit du Prêteur pour la durée du prêt.</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_nantissement_titres',
    name: "Accord de Nantissement de Titres Financiers",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Accord de nantissement de valeurs mobilières cotées sur la BRVM en garantie d'un crédit ou d'une obligation.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'constituant',label:"Constituant du nantissement",type:'text',required:true},
      {key:'beneficiaire',label:"Bénéficiaire du nantissement (créancier)",type:'text',required:true},
      {key:'titres_nantis',label:"Titres nantis (nature, quantité, valeur estimée)",type:'textarea',required:true},
      {key:'dette_garantie',label:"Créance ou obligation garantie",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE NANTISSEMENT DE TITRES FINANCIERS</h1><p>Constituant : <strong>{{constituant}}</strong> — Bénéficiaire : <strong>{{beneficiaire}}</strong>.</p><h3>1. ASSIETTE DU NANTISSEMENT</h3><p>{{titres_nantis}}</p><h3>2. OBLIGATION GARANTIE</h3><p>{{dette_garantie}}</p><h3>3. REALISATION</h3><p>En cas de défaut, le bénéficiaire peut réaliser le nantissement dans les conditions prévues par le droit OHADA et l'acte uniforme portant organisation des sûretés.</p><h3>4. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_gestion_portefeuille',
    name: "Accord de Gestion de Portefeuille sous Mandat",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Mandat de gestion de portefeuille confié à une SGP agréée pour opérer sur les marchés financiers de l'UEMOA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'mandant',label:"Mandant (investisseur)",type:'text',required:true},
      {key:'mandataire',label:"Mandataire (SGP)",type:'text',required:true},
      {key:'actifs_confies',label:"Description des actifs confiés",type:'textarea',required:true},
      {key:'pouvoirs',label:"Etendue des pouvoirs du mandataire",type:'textarea',required:true},
      {key:'date_mandat',label:"Date du mandat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>MANDAT DE GESTION DE PORTEFEUILLE</h1><p>Mandant : <strong>{{mandant}}</strong> — Mandataire : <strong>{{mandataire}}</strong>.</p><h3>1. ACTIFS CONFIES</h3><p>{{actifs_confies}}</p><h3>2. ETENDUE DES POUVOIRS</h3><p>{{pouvoirs}}</p><h3>3. REPORTING</h3><p>Le Mandataire transmet un rapport de gestion trimestriel au Mandant.</p><h3>4. DATE D'EFFET</h3><p>Mandat signé le {{date_mandat}}.</p></div>`
  },
  {
    code: 'brvm_conseil_investissement',
    name: "Accord de Service de Conseil en Investissement (RTO)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Accord de conseil en investissement (Réception et Transmission d'Ordres) fourni par un prestataire de services d'investissement agréé.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      {key:'client',label:"Client",type:'text',required:true},
      {key:'conseiller',label:"Conseiller en investissement (PSI)",type:'text',required:true},
      {key:'univers_investissement',label:"Univers d'investissement conseillé",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires de conseil",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSEIL EN INVESTISSEMENT (RTO)</h1><p>Client : <strong>{{client}}</strong> — Conseiller PSI : <strong>{{conseiller}}</strong>.</p><h3>1. MISSION</h3><p>Le Conseiller fournit des recommandations personnalisées portant sur l'univers suivant : {{univers_investissement}}.</p><h3>2. HONORAIRES</h3><p>{{honoraires}}</p><h3>3. CONFORMITE</h3><p>Les recommandations tiennent compte du profil de risque, des objectifs et de la situation financière du Client, conformément aux exigences de l'AMF-UMOA.</p><h3>4. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_rating',
    name: "Accord de Service de Rating (Notation Financière)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Accord de service de notation financière (rating) entre un émetteur et une agence de notation opérant en Afrique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'emetteur',label:"Emetteur noté",type:'text',required:true},
      {key:'agence_notation',label:"Agence de notation",type:'text',required:true},
      {key:'type_notation',label:"Type de notation (émetteur, émission, programme)",type:'text',required:true},
      {key:'honoraires_rating',label:"Honoraires de notation (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NOTATION FINANCIERE</h1><p>Emetteur : <strong>{{emetteur}}</strong> — Agence : <strong>{{agence_notation}}</strong>.</p><h3>1. MISSION</h3><p>L'Agence de notation attribue et surveille une note de type <strong>{{type_notation}}</strong> à l'Emetteur.</p><h3>2. HONORAIRES</h3><p>Les honoraires de notation s'élèvent à <strong>{{honoraires_rating}} FCFA</strong>.</p><h3>3. INDEPENDANCE</h3><p>L'Agence garantit l'indépendance de son analyse et se conforme au code de conduite des agences de notation applicables en zone UEMOA.</p><h3>4. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_structuration_produits',
    name: "Accord de Service de Structuration de Produits Financiers",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 60000,
    description: "Accord de service de structuration de produits financiers sur mesure pour le marché UEMOA / BRVM.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'client',label:"Client donneur d'ordre",type:'text',required:true},
      {key:'arrangeur',label:"Arrangeur / structureur",type:'text',required:true},
      {key:'type_produit',label:"Type de produit financier structuré",type:'text',required:true},
      {key:'objectifs',label:"Objectifs de la structuration",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE STRUCTURATION DE PRODUITS FINANCIERS</h1><p>Client : <strong>{{client}}</strong> — Arrangeur : <strong>{{arrangeur}}</strong>.</p><h3>1. PRODUIT</h3><p>Type de produit : <strong>{{type_produit}}</strong>.</p><h3>2. OBJECTIFS</h3><p>{{objectifs}}</p><h3>3. LIVRABLE</h3><p>L'Arrangeur remet une term sheet détaillée, un mémorandum d'information et les documents de placement dans les délais convenus.</p><h3>4. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_syndication_prets',
    name: "Accord de Service de Syndication de Prêts",
    category: 'commercial_financier',
    price: 22000,
    priceMax: 66000,
    description: "Accord de syndication de prêts entre un agent arrangeur et les banques participantes pour un financement de grande envergure en Afrique.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'emprunteur',label:"Emprunteur",type:'text',required:true},
      {key:'agent_arrangeur',label:"Agent arrangeur (banque chef de file)",type:'text',required:true},
      {key:'montant_credit',label:"Montant total du crédit syndiqué (FCFA)",type:'text',required:true},
      {key:'taux_interet',label:"Taux d'intérêt (% + marge)",type:'text',required:true},
      {key:'maturite',label:"Maturité du prêt (années)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SYNDICATION DE PRETS</h1><p>Emprunteur : <strong>{{emprunteur}}</strong> — Agent arrangeur : <strong>{{agent_arrangeur}}</strong>.</p><h3>1. CREDIT SYNDIQUE</h3><p>Montant : <strong>{{montant_credit}} FCFA</strong> — Taux : <strong>{{taux_interet}}</strong> — Maturité : <strong>{{maturite}} ans</strong>.</p><h3>2. ROLE DE L'AGENT</h3><p>L'Agent arrangeur coordonne la syndication, gère les tirages et les remboursements, et assure la communication entre l'Emprunteur et les banques participantes.</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_billets_tresorerie',
    name: "Accord de Service d'Emission de Billets de Trésorerie",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 54000,
    description: "Accord d'émission de billets de trésorerie sur le marché monétaire de l'UMOA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'emetteur',label:"Emetteur des billets de trésorerie",type:'text',required:true},
      {key:'domiciliataire',label:"Domiciliataire (banque)",type:'text',required:true},
      {key:'montant_programme',label:"Montant du programme (FCFA)",type:'text',required:true},
      {key:'echeance_max',label:"Echéance maximale des billets (jours)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'EMISSION DE BILLETS DE TRESORERIE</h1><p>Emetteur : <strong>{{emetteur}}</strong> — Domiciliataire : <strong>{{domiciliataire}}</strong>.</p><h3>1. PROGRAMME</h3><p>Montant du programme : <strong>{{montant_programme}} FCFA</strong> — Echéance maximale : <strong>{{echeance_max}} jours</strong>.</p><h3>2. CONDITIONS D'EMISSION</h3><p>Chaque émission fait l'objet d'un bordereau d'émission précisant le montant, le taux d'escompte et la date d'échéance.</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_rachat_actions',
    name: "Accord de Service de Programme de Rachat d'Actions",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 54000,
    description: "Accord encadrant un programme de rachat d'actions propres sur la BRVM, conformément aux règles de l'AMF-UMOA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'societe',label:"Société émettrice",type:'text',required:true},
      {key:'sgi_mandataire',label:"SGI mandatée pour les rachats",type:'text',required:true},
      {key:'montant_programme_rachat',label:"Montant maximum du programme (FCFA)",type:'text',required:true},
      {key:'duree_programme',label:"Durée du programme (mois)",type:'text',required:true},
      {key:'date_autorisation',label:"Date d'autorisation par l'assemblée",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROGRAMME DE RACHAT D'ACTIONS</h1><p>Société : <strong>{{societe}}</strong> — SGI mandatée : <strong>{{sgi_mandataire}}</strong>.</p><h3>1. PROGRAMME</h3><p>Rachat d'actions propres pour un montant maximum de <strong>{{montant_programme_rachat}} FCFA</strong> sur une durée de <strong>{{duree_programme}} mois</strong>.</p><h3>2. OBJECTIFS</h3><p>Les rachats visent à animer le marché, à annuler des actions pour améliorer le résultat par action, ou à distribuer des actions aux salariés.</p><h3>3. DATE D'AUTORISATION</h3><p>Programme autorisé par l'assemblée générale du {{date_autorisation}}, visé par l'AMF-UMOA.</p></div>`
  },
  {
    code: 'brvm_depositaire_central',
    name: "Accord de Service de Dépositaire Central",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Accord de service entre un émetteur ou teneur de compte et le Dépositaire Central / Banque de Règlement de la BRVM.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'adherent',label:"Adhérent (SGI ou émetteur)",type:'text',required:true},
      {key:'dcbr',label:"DC/BR de la BRVM",type:'text',required:true},
      {key:'services_depots',label:"Services de dépôt et de règlement-livraison",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DEPOSITAIRE CENTRAL — DC/BR BRVM</h1><p>Adhérent : <strong>{{adherent}}</strong> — DC/BR : <strong>{{dcbr}}</strong>.</p><h3>1. SERVICES</h3><p>{{services_depots}}</p><h3>2. OBLIGATIONS DE L'ADHERENT</h3><p>L'Adhérent respecte les règles et procédures du DC/BR et s'acquitte des droits d'adhésion et des frais de service.</p><h3>3. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_rapport_gestion_portefeuille',
    name: "Rapport de Gestion de Portefeuille",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Modèle de rapport périodique de gestion de portefeuille transmis par une SGP à son client mandant.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'sgp',label:"Société de gestion (SGP)",type:'text',required:true},
      {key:'client',label:"Client mandant",type:'text',required:true},
      {key:'periode_rapport',label:"Période du rapport",type:'text',required:true},
      {key:'valeur_portefeuille',label:"Valeur du portefeuille au terme de la période (FCFA)",type:'text',required:true},
      {key:'commentaire_gestion',label:"Commentaire sur la gestion et les marchés",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE GESTION DE PORTEFEUILLE</h1><h2>{{sgp}} — Client : {{client}} — Période : {{periode_rapport}}</h2><h3>1. VALORISATION</h3><p>Valeur du portefeuille au {{date_rapport}} : <strong>{{valeur_portefeuille}} FCFA</strong>.</p><h3>2. ANALYSE DE GESTION</h3><p>{{commentaire_gestion}}</p><h3>3. PERSPECTIVES</h3><p>La SGP présente les orientations de gestion pour la prochaine période en fonction des conditions de marché anticipées sur la BRVM et les marchés de l'UEMOA.</p></div>`
  },
  {
    code: 'brvm_plan_dev_marches_uemoa',
    name: "Plan de Développement Marchés Financiers UEMOA",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Plan de développement stratégique d'une entité souhaitant se développer sur les marchés financiers de l'UEMOA / BRVM.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'entite',label:"Entité porteuse du plan",type:'text',required:true},
      {key:'objectifs_marche',label:"Objectifs de développement sur les marchés",type:'textarea',required:true},
      {key:'produits_services',label:"Produits et services ciblés",type:'textarea',required:true},
      {key:'horizon_plan',label:"Horizon du plan (années)",type:'text',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DEVELOPPEMENT — MARCHES FINANCIERS UEMOA</h1><p>Entité : <strong>{{entite}}</strong></p><h3>1. OBJECTIFS</h3><p>{{objectifs_marche}}</p><h3>2. PRODUITS ET SERVICES</h3><p>{{produits_services}}</p><h3>3. HORIZON</h3><p>Plan sur <strong>{{horizon_plan}} ans</strong> établi le {{date_plan}}, visant à renforcer la position de l'entité sur les marchés réglementés de l'UEMOA.</p></div>`
  },
  {
    code: 'brvm_conformite_amf_umoa',
    name: "Accord de Conformité AMF-UMOA",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Accord interne ou avec le régulateur définissant le dispositif de conformité d'un prestataire de services d'investissement vis-à-vis de l'AMF-UMOA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'psi',label:"Prestataire de Services d'Investissement (PSI)",type:'text',required:true},
      {key:'responsable_conformite',label:"Responsable de la conformité",type:'text',required:true},
      {key:'dispositif',label:"Description du dispositif de conformité",type:'textarea',required:true},
      {key:'date_mise_en_place',label:"Date de mise en place",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONFORMITE AMF-UMOA</h1><p>PSI : <strong>{{psi}}</strong> — Responsable Conformité : <strong>{{responsable_conformite}}</strong>.</p><h3>1. DISPOSITIF DE CONFORMITE</h3><p>{{dispositif}}</p><h3>2. OBLIGATIONS REGLEMENTAIRES</h3><p>Le PSI s'engage à respecter l'ensemble des textes réglementaires de l'AMF-UMOA, notamment les règlements généraux et les instructions en vigueur.</p><h3>3. DATE D'EFFET</h3><p>Dispositif mis en place le {{date_mise_en_place}}.</p></div>`
  },
  {
    code: 'brvm_compliance_financiere',
    name: "Accord de Service de Compliance Financière",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Accord de prestation de service de compliance financière (LCB-FT, conformité réglementaire) pour un acteur des marchés financiers.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'client_compliance',label:"Client bénéficiaire du service",type:'text',required:true},
      {key:'prestataire_compliance',label:"Prestataire de compliance",type:'text',required:true},
      {key:'perimetre_compliance',label:"Périmètre de la compliance (LCB-FT, abus de marché, MIF...)",type:'textarea',required:true},
      {key:'honoraires_compliance',label:"Honoraires annuels (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMPLIANCE FINANCIERE</h1><p>Client : <strong>{{client_compliance}}</strong> — Prestataire : <strong>{{prestataire_compliance}}</strong>.</p><h3>1. PERIMETRE</h3><p>{{perimetre_compliance}}</p><h3>2. HONORAIRES</h3><p>Honoraires annuels : <strong>{{honoraires_compliance}} FCFA</strong>.</p><h3>3. LIVRABLES</h3><p>Le Prestataire fournit des rapports de conformité, des formations et une veille réglementaire continue adaptée à l'environnement UEMOA.</p><h3>4. DATE D'EFFET</h3><p>Accord signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'brvm_charte_bonne_conduite',
    name: "Charte de Bonne Conduite sur les Marchés Financiers",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Charte de bonne conduite professionnelle sur les marchés financiers, à l'usage des acteurs agréés par l'AMF-UMOA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'entite',label:"Entité adoptant la charte",type:'text',required:true},
      {key:'dirigeant',label:"Représentant légal signataire",type:'text',required:true},
      {key:'principes',label:"Principaux principes de bonne conduite",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE BONNE CONDUITE SUR LES MARCHES FINANCIERS</h1><p>Entité : <strong>{{entite}}</strong> — Représentant légal : <strong>{{dirigeant}}</strong>.</p><h3>1. PRINCIPES</h3><p>{{principes}}</p><h3>2. CHAMP D'APPLICATION</h3><p>La présente charte s'applique à l'ensemble des collaborateurs et dirigeants de l'entité intervenant sur les marchés financiers de l'UEMOA.</p><h3>3. CONFORMITE</h3><p>L'adoption de cette charte traduit l'engagement de l'entité envers les standards d'intégrité et de transparence requis par l'AMF-UMOA.</p><h3>4. DATE D'ADOPTION</h3><p>Charte adoptée le {{date_adoption}}.</p></div>`
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
  console.log(`Batch 59b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
