import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 Banque d'affaires / M&A ──────────────────────────────────────────────
  {
    code: 'banq2_mandat_conseil_ma',
    name: "Accord de mandat de conseil en fusions-acquisitions (M&A)",
    category: 'commercial_financier',
    price: 25000,
    priceMax: 80000,
    description: "Contrat par lequel une entreprise mandate une banque d'affaires pour la conseiller dans une opération de fusion ou acquisition.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'mandant_nom',label:"Nom du mandant",type:'text',required:true},
      {key:'banque_nom',label:"Nom de la banque conseil",type:'text',required:true},
      {key:'objet_mission',label:"Objet de la mission",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires et success fee",type:'text',required:true},
      {key:'duree_mandat',label:"Durée du mandat",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MANDAT DE CONSEIL EN FUSIONS-ACQUISITIONS</h1>
<p>Entre <strong>{{mandant_nom}}</strong>, ci-après "le Mandant", et <strong>{{banque_nom}}</strong>, ci-après "le Conseil".</p>
<h2>Article 1 – Objet</h2>
<p>Le Mandant confie au Conseil une mission de conseil exclusif portant sur : {{objet_mission}}.</p>
<h2>Article 2 – Honoraires</h2>
<p>{{honoraires}}</p>
<h2>Article 3 – Durée</h2>
<p>Le présent mandat est conclu pour une durée de {{duree_mandat}} à compter de la date de signature.</p>
<h2>Article 4 – Confidentialité</h2>
<p>Les parties s'engagent à maintenir la stricte confidentialité des informations échangées dans le cadre de ce mandat.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Le présent accord est régi par le droit OHADA et les lois en vigueur en Côte d'Ivoire.</p>
<p>Fait le {{date_signature}}.</p></div>`
  },
  {
    code: 'banq2_nda_ma',
    name: "Accord de confidentialité dans le cadre d'un M&A (NDA)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Non-Disclosure Agreement spécifique aux opérations de fusion-acquisition, protégeant les informations sensibles échangées entre parties.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'partie_divulgatrice',label:"Partie divulgatrice",type:'text',required:true},
      {key:'partie_receptrice',label:"Partie réceptrice",type:'text',required:true},
      {key:'objet_transaction',label:"Objet de la transaction envisagée",type:'textarea',required:true},
      {key:'duree_confidentialite',label:"Durée de confidentialité (années)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONFIDENTIALITE (NDA) – OPERATION M&A</h1>
<p>Entre <strong>{{partie_divulgatrice}}</strong> et <strong>{{partie_receptrice}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Dans le cadre d'une transaction envisagée portant sur : {{objet_transaction}}, les parties conviennent de protéger les informations confidentielles échangées.</p>
<h2>Article 2 – Informations confidentielles</h2>
<p>Sont confidentielles toutes données financières, commerciales, techniques ou stratégiques communiquées dans le cadre des négociations.</p>
<h2>Article 3 – Obligations</h2>
<p>La partie réceptrice s'engage à ne pas divulguer, reproduire ou utiliser les informations à d'autres fins que l'évaluation de la transaction.</p>
<h2>Article 4 – Durée</h2>
<p>Les obligations de confidentialité s'appliquent pendant {{duree_confidentialite}} ans à compter de la date de signature.</p>
<p>Fait le {{date_signature}}.</p></div>`
  },
  {
    code: 'banq2_exclusivite_ma',
    name: "Accord d'exclusivité dans un processus M&A",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 55000,
    description: "Accord par lequel le vendeur s'engage à négocier exclusivement avec un acquéreur potentiel pendant une période déterminée.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'vendeur_nom',label:"Nom du vendeur",type:'text',required:true},
      {key:'acquereur_nom',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'cible_nom',label:"Nom de la société cible",type:'text',required:true},
      {key:'duree_exclusivite',label:"Durée d'exclusivité",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'EXCLUSIVITE – PROCESSUS M&A</h1>
<p>Entre <strong>{{vendeur_nom}}</strong>, ci-après "le Vendeur", et <strong>{{acquereur_nom}}</strong>, ci-après "l'Acquéreur".</p>
<h2>Article 1 – Objet</h2>
<p>Le Vendeur s'engage à négocier exclusivement avec l'Acquéreur concernant la cession de <strong>{{cible_nom}}</strong>.</p>
<h2>Article 2 – Durée</h2>
<p>La période d'exclusivité est de {{duree_exclusivite}} à compter du {{date_debut}}.</p>
<h2>Article 3 – Obligations du Vendeur</h2>
<p>Pendant la période d'exclusivité, le Vendeur s'abstient de solliciter ou d'entretenir toute discussion avec un tiers acquéreur potentiel.</p>
<h2>Article 4 – Rupture</h2>
<p>Toute rupture injustifiée de l'exclusivité engage la responsabilité du Vendeur.</p>
<p>Fait le {{date_debut}}.</p></div>`
  },
  {
    code: 'banq2_loi_acquisition',
    name: "Accord de lettre d'intention (LOI) d'acquisition",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 60000,
    description: "Letter of Intent formalisant l'intention d'un acquéreur de procéder à l'acquisition d'une cible, avec les principales conditions envisagées.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'acquereur_nom',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'cible_nom',label:"Nom de la société cible",type:'text',required:true},
      {key:'valeur_envisagee',label:"Valeur d'acquisition envisagée (FCFA)",type:'text',required:true},
      {key:'conditions_principales',label:"Conditions principales",type:'textarea',required:true},
      {key:'date_loi',label:"Date de la LOI",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>LETTRE D'INTENTION (LOI) D'ACQUISITION</h1>
<p><strong>{{acquereur_nom}}</strong> exprime par la présente sa ferme intention d'acquérir <strong>{{cible_nom}}</strong>.</p>
<h2>1. Valorisation envisagée</h2>
<p>{{valeur_envisagee}} FCFA, sous réserve de due diligence.</p>
<h2>2. Conditions principales</h2>
<p>{{conditions_principales}}</p>
<h2>3. Étapes suivantes</h2>
<p>Les parties s'engagent à conduire une due diligence dans les 60 jours suivant la signature et à finaliser un protocole d'acquisition (SPA).</p>
<h2>4. Non-engagement</h2>
<p>La présente LOI ne constitue pas un engagement ferme d'acquisition sauf stipulation contraire.</p>
<p>Fait le {{date_loi}}.</p></div>`
  },
  {
    code: 'banq2_spa',
    name: "Accord de protocole d'acquisition (SPA - Share Purchase Agreement)",
    category: 'commercial_financier',
    price: 30000,
    priceMax: 90000,
    description: "Protocole d'acquisition de titres réglementant le transfert de propriété d'actions ou parts sociales d'une société cible.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'vendeur_nom',label:"Nom du cédant",type:'text',required:true},
      {key:'acquereur_nom',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'cible_nom',label:"Société cible",type:'text',required:true},
      {key:'prix_cession',label:"Prix de cession (FCFA)",type:'text',required:true},
      {key:'nombre_actions',label:"Nombre de titres cédés",type:'text',required:true},
      {key:'date_closing',label:"Date de closing",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE D'ACQUISITION DE TITRES (SHARE PURCHASE AGREEMENT)</h1>
<p>Entre <strong>{{vendeur_nom}}</strong> (le Cédant) et <strong>{{acquereur_nom}}</strong> (le Cessionnaire).</p>
<h2>Article 1 – Objet</h2>
<p>Le Cédant cède à titre onéreux {{nombre_actions}} titres représentant le capital de <strong>{{cible_nom}}</strong>.</p>
<h2>Article 2 – Prix</h2>
<p>Le prix de cession est fixé à {{prix_cession}} FCFA, payable selon les modalités définies à l'annexe financière.</p>
<h2>Article 3 – Conditions suspensives</h2>
<p>La réalisation de la cession est soumise aux conditions suspensives listées en annexe, dont l'obtention des autorisations réglementaires.</p>
<h2>Article 4 – Closing</h2>
<p>Le closing interviendra le {{date_closing}} ou à toute autre date convenue entre les parties.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Le présent protocole est régi par l'Acte Uniforme OHADA relatif aux sociétés commerciales.</p></div>`
  },
  {
    code: 'banq2_apa',
    name: "Accord de protocole d'apport (Asset Purchase Agreement)",
    category: 'commercial_financier',
    price: 28000,
    priceMax: 85000,
    description: "Protocole d'acquisition d'actifs permettant le transfert sélectif d'actifs et de passifs d'une entité à une autre.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'cedant_nom',label:"Nom du cédant",type:'text',required:true},
      {key:'acquereur_nom',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'actifs_cedes',label:"Description des actifs cédés",type:'textarea',required:true},
      {key:'prix_actifs',label:"Prix des actifs (FCFA)",type:'text',required:true},
      {key:'date_transfert',label:"Date de transfert",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE D'ACQUISITION D'ACTIFS (ASSET PURCHASE AGREEMENT)</h1>
<p>Entre <strong>{{cedant_nom}}</strong> (le Cédant) et <strong>{{acquereur_nom}}</strong> (l'Acquéreur).</p>
<h2>Article 1 – Actifs cédés</h2>
<p>{{actifs_cedes}}</p>
<h2>Article 2 – Prix</h2>
<p>Le prix global de cession des actifs est de {{prix_actifs}} FCFA.</p>
<h2>Article 3 – Passifs exclus</h2>
<p>Sauf stipulation contraire, l'Acquéreur ne reprend aucun passif du Cédant antérieur à la date de transfert.</p>
<h2>Article 4 – Date de transfert</h2>
<p>Le transfert de propriété des actifs interviendra le {{date_transfert}}.</p>
<h2>Article 5 – Garanties</h2>
<p>Le Cédant garantit être propriétaire légitime des actifs cédés et qu'ils sont libres de tout engagement ou sûreté non déclarée.</p></div>`
  },
  {
    code: 'banq2_gpa',
    name: "Accord de garantie de passif et d'actif (GPA)",
    category: 'commercial_financier',
    price: 25000,
    priceMax: 75000,
    description: "Convention par laquelle le cédant garantit l'acquéreur contre les passifs non apparents et les actifs surévalués découverts après la cession.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'garant_nom',label:"Nom du garant (cédant)",type:'text',required:true},
      {key:'beneficiaire_nom',label:"Nom du bénéficiaire (acquéreur)",type:'text',required:true},
      {key:'societe_cible',label:"Société cible concernée",type:'text',required:true},
      {key:'plafond_garantie',label:"Plafond de la garantie (FCFA)",type:'text',required:true},
      {key:'duree_garantie',label:"Durée de la garantie",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>GARANTIE DE PASSIF ET D'ACTIF (GPA)</h1>
<p>Entre <strong>{{garant_nom}}</strong> (le Garant) et <strong>{{beneficiaire_nom}}</strong> (le Bénéficiaire), relative à <strong>{{societe_cible}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Le Garant garantit le Bénéficiaire contre tout passif non déclaré ou actif surévalué constaté postérieurement à la date de closing.</p>
<h2>Article 2 – Plafond</h2>
<p>La garantie est limitée à {{plafond_garantie}} FCFA.</p>
<h2>Article 3 – Durée</h2>
<p>La garantie est valable pour une durée de {{duree_garantie}} à compter de la date de closing.</p>
<h2>Article 4 – Mise en jeu</h2>
<p>La mise en jeu de la garantie doit être notifiée par écrit avec justification des préjudices allégués.</p>
<p>Fait le {{date_signature}}.</p></div>`
  },
  {
    code: 'banq2_earnout',
    name: "Accord de mécanisme de prix d'ajustement (earn-out)",
    category: 'commercial_financier',
    price: 22000,
    priceMax: 65000,
    description: "Mécanisme contractuel permettant d'ajuster le prix d'acquisition en fonction des performances futures de la société cible.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'vendeur_nom',label:"Nom du vendeur",type:'text',required:true},
      {key:'acquereur_nom',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'indicateurs_performance',label:"Indicateurs de performance (KPIs)",type:'textarea',required:true},
      {key:'montant_earnout',label:"Montant maximum de l'earn-out (FCFA)",type:'text',required:true},
      {key:'periode_earnout',label:"Période d'earn-out",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'EARN-OUT – MECANISME D'AJUSTEMENT DE PRIX</h1>
<p>Entre <strong>{{vendeur_nom}}</strong> et <strong>{{acquereur_nom}}</strong>.</p>
<h2>Article 1 – Principe</h2>
<p>En complément du prix de base, un complément de prix (earn-out) sera versé au Vendeur en fonction des performances réalisées.</p>
<h2>Article 2 – Indicateurs</h2>
<p>{{indicateurs_performance}}</p>
<h2>Article 3 – Montant maximum</h2>
<p>Le montant maximum de l'earn-out est de {{montant_earnout}} FCFA.</p>
<h2>Article 4 – Période</h2>
<p>L'earn-out est calculé sur la période {{periode_earnout}} suivant le closing.</p>
<h2>Article 5 – Calcul et paiement</h2>
<p>Les comptes certifiés par un auditeur indépendant serviront de base au calcul de l'earn-out, payable dans les 30 jours suivant certification.</p></div>`
  },
  {
    code: 'banq2_lockup_nonconcurrence',
    name: "Accord de lock-up et clause de non-concurrence post-acquisition",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 55000,
    description: "Accord encadrant la période de rétention des titres (lock-up) et l'interdiction de concurrence des cédants après une acquisition.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'cedant_nom',label:"Nom du cédant",type:'text',required:true},
      {key:'acquereur_nom',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'duree_lockup',label:"Durée du lock-up",type:'text',required:true},
      {key:'duree_non_concurrence',label:"Durée de non-concurrence",type:'text',required:true},
      {key:'perimetre_geo',label:"Périmètre géographique de non-concurrence",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LOCK-UP ET NON-CONCURRENCE POST-ACQUISITION</h1>
<p>Entre <strong>{{cedant_nom}}</strong> (le Cédant) et <strong>{{acquereur_nom}}</strong> (l'Acquéreur).</p>
<h2>Article 1 – Lock-up</h2>
<p>Le Cédant s'engage à ne pas céder les titres qu'il conserve pendant une période de {{duree_lockup}} suivant le closing.</p>
<h2>Article 2 – Non-concurrence</h2>
<p>Le Cédant s'interdit de créer, diriger ou participer à toute entité concurrente pendant {{duree_non_concurrence}}.</p>
<h2>Article 3 – Périmètre</h2>
<p>La clause de non-concurrence s'applique sur le périmètre géographique suivant : {{perimetre_geo}}.</p>
<h2>Article 4 – Sanction</h2>
<p>Toute violation donne lieu au paiement d'une indemnité forfaitaire convenue entre les parties.</p></div>`
  },
  {
    code: 'banq2_reps_warranties',
    name: "Accord de reps and warranties (déclarations et garanties)",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 60000,
    description: "Convention détaillant les déclarations et garanties du cédant sur l'état juridique, financier et fiscal de la société cible.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 71,
    fieldsJson: F([
      {key:'cedant_nom',label:"Nom du cédant",type:'text',required:true},
      {key:'acquereur_nom',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'societe_cible',label:"Société cible",type:'text',required:true},
      {key:'date_reference',label:"Date de référence des déclarations",type:'date',required:true},
      {key:'declarations_specifiques',label:"Déclarations spécifiques additionnelles",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>DECLARATIONS ET GARANTIES (REPS AND WARRANTIES)</h1>
<p>Le Cédant <strong>{{cedant_nom}}</strong> fait les déclarations et garanties suivantes à <strong>{{acquereur_nom}}</strong> concernant <strong>{{societe_cible}}</strong>, à la date du {{date_reference}}.</p>
<h2>1. Capacité juridique</h2>
<p>Le Cédant dispose de la pleine capacité juridique pour conclure la cession.</p>
<h2>2. Situation financière</h2>
<p>Les états financiers communiqués donnent une image fidèle de la situation de la cible.</p>
<h2>3. Situation fiscale</h2>
<p>Toutes les obligations fiscales et sociales ont été dûment remplies à la date de référence.</p>
<h2>4. Litiges</h2>
<p>Aucun litige significatif n'est en cours ou menacé à la connaissance du Cédant.</p>
<h2>5. Déclarations additionnelles</h2>
<p>{{declarations_specifiques}}</p></div>`
  },
  {
    code: 'banq2_retention_dirigeants',
    name: "Accord de retention des dirigeants post-acquisition",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Plan de rétention des dirigeants clés de la société cible après une acquisition, incluant bonus et avantages conditionnels.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'acquereur_nom',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'dirigeant_nom',label:"Nom du dirigeant concerné",type:'text',required:true},
      {key:'poste',label:"Poste du dirigeant",type:'text',required:true},
      {key:'bonus_retention',label:"Bonus de rétention (FCFA)",type:'text',required:true},
      {key:'duree_retention',label:"Durée de rétention requise",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RETENTION DE DIRIGEANT POST-ACQUISITION</h1>
<p>Entre <strong>{{acquereur_nom}}</strong> et <strong>{{dirigeant_nom}}</strong>, occupant le poste de {{poste}}.</p>
<h2>Article 1 – Objet</h2>
<p>Le présent accord vise à assurer la continuité du management en retenant {{dirigeant_nom}} pendant la période de transition post-acquisition.</p>
<h2>Article 2 – Bonus de rétention</h2>
<p>Un bonus de rétention de {{bonus_retention}} FCFA sera versé au terme d'une période de {{duree_retention}} suivant le closing.</p>
<h2>Article 3 – Conditions</h2>
<p>Le versement est conditionné au maintien du dirigeant dans ses fonctions et à la réalisation des objectifs fixés.</p>
<h2>Article 4 – Clause de remboursement</h2>
<p>En cas de départ volontaire avant le terme, le dirigeant remboursera le prorata du bonus perçu.</p></div>`
  },
  {
    code: 'banq2_ipo_brvm',
    name: "Accord d'introduction en bourse (IPO) BRVM",
    category: 'commercial_financier',
    price: 30000,
    priceMax: 90000,
    description: "Contrat de service encadrant l'introduction en bourse d'une entreprise sur la Bourse Régionale des Valeurs Mobilières (BRVM).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'emetteur_nom',label:"Nom de l'émetteur",type:'text',required:true},
      {key:'chef_file_nom',label:"Nom du chef de file (banque)",type:'text',required:true},
      {key:'montant_introduction',label:"Montant de l'introduction (FCFA)",type:'text',required:true},
      {key:'prix_action',label:"Prix d'introduction par action (FCFA)",type:'text',required:true},
      {key:'date_introduction',label:"Date d'introduction prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'INTRODUCTION EN BOURSE – BRVM</h1>
<p>Entre <strong>{{emetteur_nom}}</strong> (l'Emetteur) et <strong>{{chef_file_nom}}</strong> (le Chef de File).</p>
<h2>Article 1 – Mission</h2>
<p>Le Chef de File est chargé d'organiser et de coordonner l'introduction en bourse de l'Emetteur sur la BRVM.</p>
<h2>Article 2 – Montant et prix</h2>
<p>L'opération porte sur un montant de {{montant_introduction}} FCFA au prix de {{prix_action}} FCFA par action.</p>
<h2>Article 3 – Obligations du Chef de File</h2>
<p>Constitution du syndicat de placement, rédaction du prospectus, coordination avec le Conseil Régional de l'Epargne Publique (CREPMF) et la BRVM.</p>
<h2>Article 4 – Calendrier</h2>
<p>L'introduction est planifiée pour le {{date_introduction}} sous réserve des autorisations réglementaires.</p>
<h2>Article 5 – Rémunération</h2>
<p>Commission de placement et frais définis à l'annexe financière.</p></div>`
  },
  {
    code: 'banq2_augmentation_capital',
    name: "Accord de service d'augmentation de capital (émission d'actions)",
    category: 'commercial_financier',
    price: 25000,
    priceMax: 70000,
    description: "Contrat de service pour accompagner une société dans une opération d'augmentation de capital par émission de nouvelles actions.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'societe_nom',label:"Nom de la société",type:'text',required:true},
      {key:'banque_nom',label:"Banque conseil",type:'text',required:true},
      {key:'montant_augmentation',label:"Montant de l'augmentation (FCFA)",type:'text',required:true},
      {key:'type_investisseurs',label:"Type d'investisseurs ciblés",type:'text',required:true},
      {key:'date_operation',label:"Date prévue de l'opération",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – AUGMENTATION DE CAPITAL</h1>
<p>Entre <strong>{{societe_nom}}</strong> et <strong>{{banque_nom}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>La banque assiste la société dans son opération d'augmentation de capital de {{montant_augmentation}} FCFA par émission de nouvelles actions.</p>
<h2>Article 2 – Investisseurs ciblés</h2>
<p>{{type_investisseurs}}</p>
<h2>Article 3 – Prestations</h2>
<p>Préparation du mémorandum d'information, structuration de l'opération, placement auprès des investisseurs, et coordination juridique.</p>
<h2>Article 4 – Calendrier</h2>
<p>L'opération est planifiée pour le {{date_operation}}.</p>
<h2>Article 5 – Rémunération</h2>
<p>Commission de succès et retainer fee définis en annexe.</p></div>`
  },
  {
    code: 'banq2_obligations_convertibles',
    name: "Accord de service d'émission d'obligations convertibles (OC)",
    category: 'commercial_financier',
    price: 22000,
    priceMax: 65000,
    description: "Contrat de service pour structurer et placer une émission d'obligations convertibles en actions.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'emetteur_nom',label:"Nom de l'émetteur",type:'text',required:true},
      {key:'arrangeur_nom',label:"Nom de l'arrangeur",type:'text',required:true},
      {key:'montant_emission',label:"Montant de l'émission (FCFA)",type:'text',required:true},
      {key:'taux_interet',label:"Taux d'intérêt",type:'text',required:true},
      {key:'prix_conversion',label:"Prix de conversion",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – EMISSION D'OBLIGATIONS CONVERTIBLES (OC)</h1>
<p>Entre <strong>{{emetteur_nom}}</strong> et <strong>{{arrangeur_nom}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>L'arrangeur structure et place une émission d'obligations convertibles d'un montant de {{montant_emission}} FCFA.</p>
<h2>Article 2 – Caractéristiques</h2>
<p>Taux d'intérêt : {{taux_interet}} – Prix de conversion : {{prix_conversion}} FCFA par action.</p>
<h2>Article 3 – Prestations</h2>
<p>Structuration, rédaction du prospectus, placement, et accompagnement réglementaire.</p>
<h2>Article 4 – Conformité OHADA</h2>
<p>L'opération respecte les dispositions de l'Acte Uniforme OHADA relatif au droit des sociétés commerciales.</p></div>`
  },
  {
    code: 'banq2_bond_corporate',
    name: "Accord de service de bond (obligation simple) corporate",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 60000,
    description: "Contrat de service pour l'émission d'obligations simples (bonds) par une entreprise sur les marchés de capitaux UEMOA.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'emetteur_nom',label:"Nom de l'émetteur",type:'text',required:true},
      {key:'arrangeur_nom',label:"Arrangeur principal",type:'text',required:true},
      {key:'montant_bond',label:"Montant du bond (FCFA)",type:'text',required:true},
      {key:'maturite',label:"Maturité du bond",type:'text',required:true},
      {key:'taux_coupon',label:"Taux du coupon annuel",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – EMISSION D'OBLIGATIONS SIMPLES (BOND CORPORATE)</h1>
<p>Entre <strong>{{emetteur_nom}}</strong> et <strong>{{arrangeur_nom}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>L'arrangeur accompagne l'émetteur dans son émission d'obligations simples de {{montant_bond}} FCFA sur le marché UEMOA.</p>
<h2>Article 2 – Caractéristiques</h2>
<p>Maturité : {{maturite}} – Taux coupon annuel : {{taux_coupon}}.</p>
<h2>Article 3 – Prestations</h2>
<p>Structuration financière, notation, prospectus, placement et cotation BRVM.</p>
<h2>Article 4 – Remboursement</h2>
<p>Le capital est remboursé in fine à la date d'échéance selon le calendrier d'amortissement annexé.</p></div>`
  },
  {
    code: 'banq2_restructuration_dette',
    name: "Accord de service de restructuration de la dette",
    category: 'commercial_financier',
    price: 25000,
    priceMax: 75000,
    description: "Contrat de conseil pour accompagner une entreprise dans la restructuration de ses dettes bancaires et financières.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 67,
    fieldsJson: F([
      {key:'debiteur_nom',label:"Nom du débiteur",type:'text',required:true},
      {key:'conseil_nom',label:"Conseil en restructuration",type:'text',required:true},
      {key:'encours_dette',label:"Encours total de la dette (FCFA)",type:'text',required:true},
      {key:'creanciers_principaux',label:"Créanciers principaux",type:'textarea',required:true},
      {key:'date_debut_mission',label:"Date de début de mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – RESTRUCTURATION DE LA DETTE</h1>
<p>Entre <strong>{{debiteur_nom}}</strong> (le Client) et <strong>{{conseil_nom}}</strong> (le Conseil).</p>
<h2>Article 1 – Contexte</h2>
<p>Le Client fait face à un encours de dette de {{encours_dette}} FCFA auprès des créanciers suivants : {{creanciers_principaux}}.</p>
<h2>Article 2 – Mission</h2>
<p>Le Conseil est mandaté pour négocier avec les créanciers, élaborer un plan de restructuration viable et assister le Client dans sa mise en oeuvre.</p>
<h2>Article 3 – Livrables</h2>
<p>Diagnostic financier, plan de restructuration, accord de standstill, et accord de renégociation de la dette.</p>
<h2>Article 4 – Début de mission</h2>
<p>La mission démarre le {{date_debut_mission}}.</p></div>`
  },
  {
    code: 'banq2_lbo',
    name: "Accord de service de LBO (leveraged buy-out)",
    category: 'commercial_financier',
    price: 28000,
    priceMax: 85000,
    description: "Contrat de conseil pour structurer et financer une acquisition à effet de levier (LBO) d'une entreprise cible.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 64,
    fieldsJson: F([
      {key:'acquereur_nom',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'conseil_nom',label:"Banque conseil",type:'text',required:true},
      {key:'cible_nom',label:"Société cible",type:'text',required:true},
      {key:'valeur_acquisition',label:"Valeur d'acquisition (FCFA)",type:'text',required:true},
      {key:'ratio_leverage',label:"Ratio de levier envisagé (dette/fonds propres)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – LEVERAGED BUY-OUT (LBO)</h1>
<p>Entre <strong>{{acquereur_nom}}</strong> et <strong>{{conseil_nom}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Le Conseil structure l'acquisition à effet de levier de <strong>{{cible_nom}}</strong> pour un montant de {{valeur_acquisition}} FCFA.</p>
<h2>Article 2 – Structure financière</h2>
<p>Ratio de levier envisagé : {{ratio_leverage}}. La dette d'acquisition sera levée auprès de prêteurs senior et mezzanine.</p>
<h2>Article 3 – Prestations</h2>
<p>Structuration du financement, négociation avec les prêteurs, constitution de la holding d'acquisition, et coordination du closing.</p>
<h2>Article 4 – Droit applicable</h2>
<p>L'opération est structurée en conformité avec l'Acte Uniforme OHADA et les réglementations bancaires UEMOA.</p></div>`
  },
  {
    code: 'banq2_mbo',
    name: "Accord de service de MBO (management buy-out)",
    category: 'commercial_financier',
    price: 25000,
    priceMax: 75000,
    description: "Contrat de conseil pour accompagner une équipe dirigeante dans le rachat de leur entreprise (MBO).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'equipe_dirigeante',label:"Nom de l'équipe dirigeante",type:'text',required:true},
      {key:'conseil_nom',label:"Conseil financier",type:'text',required:true},
      {key:'societe_rachetee',label:"Société rachetée",type:'text',required:true},
      {key:'montant_rachat',label:"Montant du rachat (FCFA)",type:'text',required:true},
      {key:'apport_management',label:"Apport de l'équipe de management (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MANAGEMENT BUY-OUT (MBO)</h1>
<p>Entre <strong>{{equipe_dirigeante}}</strong> et <strong>{{conseil_nom}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>Le Conseil accompagne l'équipe de management dans le rachat de <strong>{{societe_rachetee}}</strong> pour un montant de {{montant_rachat}} FCFA.</p>
<h2>Article 2 – Financement</h2>
<p>L'apport en fonds propres de l'équipe de management est de {{apport_management}} FCFA, complété par une dette bancaire et/ou mezzanine.</p>
<h2>Article 3 – Prestations</h2>
<p>Structuration du MBO, négociation avec le cédant, levée de financement, et coordination juridique du closing.</p>
<h2>Article 4 – Gouvernance post-MBO</h2>
<p>Un pacte d'actionnaires sera conclu entre les dirigeants et les co-investisseurs financiers.</p></div>`
  },
  {
    code: 'banq2_venture_debt',
    name: "Accord de service de venture debt (dette mezzanine)",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 60000,
    description: "Contrat de service pour la mise en place d'une ligne de dette mezzanine (venture debt) en faveur d'une startup ou PME en croissance.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 55,
    fieldsJson: F([
      {key:'emprunteur_nom',label:"Nom de l'emprunteur",type:'text',required:true},
      {key:'preteur_nom',label:"Nom du prêteur",type:'text',required:true},
      {key:'montant_dette',label:"Montant de la dette (FCFA)",type:'text',required:true},
      {key:'taux_interet',label:"Taux d'intérêt",type:'text',required:true},
      {key:'warrant_details',label:"Conditions des warrants associés",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENTURE DEBT (DETTE MEZZANINE)</h1>
<p>Entre <strong>{{preteur_nom}}</strong> (le Prêteur) et <strong>{{emprunteur_nom}}</strong> (l'Emprunteur).</p>
<h2>Article 1 – Montant</h2>
<p>Le Prêteur met à disposition de l'Emprunteur une ligne de venture debt de {{montant_dette}} FCFA.</p>
<h2>Article 2 – Taux et remboursement</h2>
<p>Taux d'intérêt : {{taux_interet}}. Remboursement selon échéancier annexé.</p>
<h2>Article 3 – Warrants</h2>
<p>{{warrant_details}}</p>
<h2>Article 4 – Conditions</h2>
<p>L'octroi est conditionné au maintien de covenants financiers définis en annexe.</p></div>`
  },
  {
    code: 'banq2_syndication_credit',
    name: "Accord de syndication de crédit bancaire",
    category: 'commercial_financier',
    price: 25000,
    priceMax: 75000,
    description: "Convention de syndication permettant à plusieurs banques de participer conjointement à un crédit en faveur d'un emprunteur.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 63,
    fieldsJson: F([
      {key:'emprunteur_nom',label:"Nom de l'emprunteur",type:'text',required:true},
      {key:'chef_file_nom',label:"Banque chef de file",type:'text',required:true},
      {key:'montant_credit',label:"Montant total du crédit syndiqué (FCFA)",type:'text',required:true},
      {key:'banques_participantes',label:"Banques participantes et quotes-parts",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SYNDICATION DE CREDIT BANCAIRE</h1>
<p>Entre <strong>{{emprunteur_nom}}</strong> (l'Emprunteur), <strong>{{chef_file_nom}}</strong> (Chef de File), et les banques participantes.</p>
<h2>Article 1 – Montant</h2>
<p>Crédit syndiqué de {{montant_credit}} FCFA.</p>
<h2>Article 2 – Participants et quotes-parts</h2>
<p>{{banques_participantes}}</p>
<h2>Article 3 – Rôle du Chef de File</h2>
<p>Le Chef de File coordonne les relations avec l'Emprunteur, gère les tirages et les remboursements pour le compte du syndicat.</p>
<h2>Article 4 – Droit applicable</h2>
<p>Régi par les règles de la BCEAO et le droit bancaire UEMOA. Fait le {{date_signature}}.</p></div>`
  },
  {
    code: 'banq2_due_diligence_report',
    name: "Rapport de due diligence M&A",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 60000,
    description: "Modèle de rapport de due diligence couvrant les aspects juridiques, financiers, fiscaux et opérationnels d'une cible d'acquisition.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'cible_nom',label:"Nom de la société cible",type:'text',required:true},
      {key:'acquereur_nom',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'cabinet_audit',label:"Cabinet ayant réalisé la due diligence",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
      {key:'synthese_risques',label:"Synthèse des risques identifiés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE DUE DILIGENCE M&A</h1>
<p>Préparé par <strong>{{cabinet_audit}}</strong> pour <strong>{{acquereur_nom}}</strong> concernant <strong>{{cible_nom}}</strong>.</p>
<p>Date : {{date_rapport}}</p>
<h2>1. Due diligence juridique</h2>
<p>Vérification des statuts, des contrats significatifs, des litiges en cours et de la conformité réglementaire.</p>
<h2>2. Due diligence financière</h2>
<p>Analyse des états financiers des 3 derniers exercices, de la dette nette, du BFR et des projections.</p>
<h2>3. Due diligence fiscale</h2>
<p>Revue des obligations fiscales, des contrôles passés et des risques de redressement.</p>
<h2>4. Synthèse des risques</h2>
<p>{{synthese_risques}}</p>
<h2>5. Conclusion</h2>
<p>Recommandations et conditions suspensives suggérées au titre des risques identifiés.</p></div>`
  },
  {
    code: 'banq2_plan_100jours',
    name: "Plan de 100 jours post-acquisition",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Document de planification stratégique pour les 100 premiers jours suivant la finalisation d'une acquisition.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'acquereur_nom',label:"Nom de l'acquéreur",type:'text',required:true},
      {key:'cible_nom',label:"Société acquise",type:'text',required:true},
      {key:'date_closing',label:"Date de closing",type:'date',required:true},
      {key:'objectifs_prioritaires',label:"Objectifs prioritaires des 100 jours",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE 100 JOURS POST-ACQUISITION</h1>
<p>Acquisition de <strong>{{cible_nom}}</strong> par <strong>{{acquereur_nom}}</strong> – Closing le {{date_closing}}.</p>
<h2>Phase 1 : Jours 1-30 – Stabilisation</h2>
<p>Communication interne et externe, maintien des équipes clés, audit opérationnel rapide.</p>
<h2>Phase 2 : Jours 31-60 – Analyse</h2>
<p>Diagnostic approfondi des synergies, identification des quick wins, définition de la feuille de route d'intégration.</p>
<h2>Phase 3 : Jours 61-100 – Transformation</h2>
<p>Mise en oeuvre des synergies prioritaires, harmonisation des processus, reporting consolidé.</p>
<h2>Objectifs prioritaires</h2>
<p>{{objectifs_prioritaires}}</p></div>`
  },
  {
    code: 'banq2_integration_post_fusion',
    name: "Accord de gestion de l'intégration post-fusion",
    category: 'commercial_financier',
    price: 18000,
    priceMax: 55000,
    description: "Convention encadrant la gouvernance et la gestion du processus d'intégration après la réalisation d'une fusion.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'entite_absorbante',label:"Entité absorbante",type:'text',required:true},
      {key:'entite_absorbee',label:"Entité absorbée",type:'text',required:true},
      {key:'responsable_integration',label:"Responsable de l'intégration",type:'text',required:true},
      {key:'budget_integration',label:"Budget d'intégration (FCFA)",type:'text',required:true},
      {key:'date_fusion',label:"Date de la fusion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION DE L'INTEGRATION POST-FUSION</h1>
<p>Relatif à la fusion entre <strong>{{entite_absorbante}}</strong> et <strong>{{entite_absorbee}}</strong>, réalisée le {{date_fusion}}.</p>
<h2>Article 1 – Gouvernance de l'intégration</h2>
<p>Un Comité d'Intégration est constitué, placé sous la responsabilité de {{responsable_integration}}.</p>
<h2>Article 2 – Budget</h2>
<p>Un budget de {{budget_integration}} FCFA est alloué au processus d'intégration.</p>
<h2>Article 3 – Périmètre</h2>
<p>L'intégration couvre les systèmes d'information, les ressources humaines, les processus opérationnels et la culture d'entreprise.</p>
<h2>Article 4 – Reporting</h2>
<p>Le Comité d'Intégration rend compte mensuellement au Conseil d'Administration de l'avancement.</p></div>`
  },
  {
    code: 'banq2_conseil_cession',
    name: "Accord de service de conseil en cession d'entreprise",
    category: 'commercial_financier',
    price: 22000,
    priceMax: 65000,
    description: "Mandat de conseil pour accompagner un actionnaire ou groupe familial dans la cession de leur entreprise.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'cedant_nom',label:"Nom du cédant",type:'text',required:true},
      {key:'conseil_nom',label:"Banque conseil",type:'text',required:true},
      {key:'societe_a_ceder',label:"Société à céder",type:'text',required:true},
      {key:'valorisation_cible',label:"Fourchette de valorisation cible (FCFA)",type:'text',required:true},
      {key:'date_mandat',label:"Date du mandat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSEIL EN CESSION D'ENTREPRISE</h1>
<p>Entre <strong>{{cedant_nom}}</strong> (le Cédant) et <strong>{{conseil_nom}}</strong> (le Conseil).</p>
<h2>Article 1 – Objet</h2>
<p>Le Conseil est mandaté pour accompagner le Cédant dans la cession de <strong>{{societe_a_ceder}}</strong>.</p>
<h2>Article 2 – Valorisation</h2>
<p>La fourchette de valorisation cible est de {{valorisation_cible}} FCFA, à confirmer par les due diligences.</p>
<h2>Article 3 – Processus</h2>
<p>Préparation du mémorandum de vente, identification et approche d'acquéreurs potentiels, gestion des offres, négociation et closing.</p>
<h2>Article 4 – Exclusivité</h2>
<p>Le présent mandat est exclusif pour une durée de 12 mois à compter du {{date_mandat}}.</p></div>`
  },
  {
    code: 'banq2_charte_deontologie',
    name: "Charte de déontologie banque d'affaires",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Charte interne définissant les règles déontologiques et de bonne conduite applicables aux professionnels d'une banque d'affaires.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 58,
    fieldsJson: F([
      {key:'banque_nom',label:"Nom de la banque d'affaires",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'responsable_conformite',label:"Responsable conformité",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE DEONTOLOGIE – BANQUE D'AFFAIRES</h1>
<p><strong>{{banque_nom}}</strong> – Adoptée le {{date_adoption}} – Responsable conformité : {{responsable_conformite}}</p>
<h2>1. Intégrité et honnêteté</h2>
<p>Tous les professionnels s'engagent à agir avec intégrité, honnêteté et loyauté envers leurs clients.</p>
<h2>2. Gestion des conflits d'intérêts</h2>
<p>Identification, divulgation et gestion rigoureuse de tout conflit d'intérêt réel ou potentiel.</p>
<h2>3. Confidentialité</h2>
<p>Protection absolue des informations confidentielles des clients, y compris après la fin de la mission.</p>
<h2>4. Lutte anti-blanchiment</h2>
<p>Respect strict des procédures KYC et AML conformément aux directives de la BCEAO et du GIABA.</p>
<h2>5. Sanctions</h2>
<p>Tout manquement à la présente charte expose son auteur à des sanctions disciplinaires pouvant aller jusqu'au licenciement.</p></div>`
  },

  // ── 25 Capital risque / Startup ─────────────────────────────────────────────
  {
    code: 'cap_seed_investment',
    name: "Accord d'investissement seed (pre-seed round)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Contrat d'investissement pour un tour de financement seed ou pre-seed dans une startup en phase de démarrage.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 80,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'investisseur_nom',label:"Nom de l'investisseur",type:'text',required:true},
      {key:'montant_investissement',label:"Montant investi (FCFA)",type:'text',required:true},
      {key:'valorisation_pre_money',label:"Valorisation pre-money (FCFA)",type:'text',required:true},
      {key:'date_closing',label:"Date de closing",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'INVESTISSEMENT SEED</h1>
<p>Entre <strong>{{startup_nom}}</strong> (la Société) et <strong>{{investisseur_nom}}</strong> (l'Investisseur).</p>
<h2>Article 1 – Investissement</h2>
<p>L'Investisseur souscrit à une augmentation de capital de {{montant_investissement}} FCFA.</p>
<h2>Article 2 – Valorisation</h2>
<p>Valorisation pre-money : {{valorisation_pre_money}} FCFA.</p>
<h2>Article 3 – Droits de l'investisseur</h2>
<p>Droit d'information renforcé, droit de préemption sur les nouvelles émissions, et siège d'observateur au Conseil.</p>
<h2>Article 4 – Closing</h2>
<p>La réalisation de l'investissement est prévue pour le {{date_closing}}.</p>
<h2>Article 5 – Droit applicable</h2>
<p>Régi par l'Acte Uniforme OHADA relatif aux sociétés commerciales.</p></div>`
  },
  {
    code: 'cap_serie_a',
    name: "Accord d'investissement série A",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 60000,
    description: "Convention d'investissement pour un tour de financement de Série A dans une startup en phase de croissance.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 82,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'lead_investor',label:"Investisseur lead",type:'text',required:true},
      {key:'montant_serie_a',label:"Montant total Série A (FCFA)",type:'text',required:true},
      {key:'valorisation_pre_money',label:"Valorisation pre-money Série A (FCFA)",type:'text',required:true},
      {key:'date_closing',label:"Date de closing",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'INVESTISSEMENT SERIE A</h1>
<p>Entre <strong>{{startup_nom}}</strong> et <strong>{{lead_investor}}</strong> (Investisseur Lead), ainsi que les co-investisseurs listés en annexe.</p>
<h2>Article 1 – Tour de Série A</h2>
<p>Montant total du tour : {{montant_serie_a}} FCFA – Valorisation pre-money : {{valorisation_pre_money}} FCFA.</p>
<h2>Article 2 – Actions préférentielles</h2>
<p>L'investisseur reçoit des actions de préférence de Série A avec les droits définis au pacte d'actionnaires.</p>
<h2>Article 3 – Gouvernance</h2>
<p>Le Lead Investor dispose d'un siège au Conseil d'Administration et d'un droit de veto sur les décisions stratégiques majeures.</p>
<h2>Article 4 – Utilisation des fonds</h2>
<p>Les fonds seront utilisés conformément au budget approuvé par les investisseurs.</p>
<p>Closing prévu le {{date_closing}}.</p></div>`
  },
  {
    code: 'cap_serie_b',
    name: "Accord d'investissement série B",
    category: 'commercial_financier',
    price: 25000,
    priceMax: 75000,
    description: "Convention d'investissement pour un tour de financement de Série B dans une startup en phase d'expansion.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 75,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'lead_investor',label:"Investisseur lead Série B",type:'text',required:true},
      {key:'montant_serie_b',label:"Montant total Série B (FCFA)",type:'text',required:true},
      {key:'valorisation_pre_money',label:"Valorisation pre-money (FCFA)",type:'text',required:true},
      {key:'date_closing',label:"Date de closing",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'INVESTISSEMENT SERIE B</h1>
<p>Entre <strong>{{startup_nom}}</strong> et <strong>{{lead_investor}}</strong>, ainsi que les co-investisseurs.</p>
<h2>Article 1 – Tour de Série B</h2>
<p>Montant : {{montant_serie_b}} FCFA – Valorisation pre-money : {{valorisation_pre_money}} FCFA.</p>
<h2>Article 2 – Objectifs du financement</h2>
<p>Le financement Série B vise l'expansion géographique, le renforcement des équipes et l'accélération commerciale.</p>
<h2>Article 3 – Droits des investisseurs Série B</h2>
<p>Liquidation préférentielle non-participative, droit anti-dilution à cliquet complet, et information financière trimestrielle.</p>
<h2>Article 4 – Milestones</h2>
<p>Des jalons de performance convenus conditionnent le déblocage de tranches ultérieures.</p>
<p>Closing prévu le {{date_closing}}.</p></div>`
  },
  {
    code: 'cap_term_sheet',
    name: "Accord de term sheet de capital risque",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Term sheet de capital risque détaillant les conditions préliminaires d'un investissement dans une startup.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 88,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'investisseur_nom',label:"Nom de l'investisseur",type:'text',required:true},
      {key:'montant',label:"Montant envisagé (FCFA)",type:'text',required:true},
      {key:'valorisation',label:"Valorisation (FCFA)",type:'text',required:true},
      {key:'type_instrument',label:"Instrument financier (actions ordinaires, préférentielles...)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>TERM SHEET – CAPITAL RISQUE</h1>
<p>Proposé par <strong>{{investisseur_nom}}</strong> à <strong>{{startup_nom}}</strong>.</p>
<h2>Montant</h2><p>{{montant}} FCFA</p>
<h2>Valorisation</h2><p>{{valorisation}} FCFA (pre-money)</p>
<h2>Instrument</h2><p>{{type_instrument}}</p>
<h2>Droits clés proposés</h2>
<p>Liquidation préférentielle, anti-dilution, droit de préemption, information trimestrielle, siège observateur.</p>
<h2>Exclusivité</h2>
<p>Signature du présent term sheet emporte exclusivité de négociation de 60 jours.</p>
<h2>Non-contraignant</h2>
<p>Ce term sheet est non contraignant sauf les clauses de confidentialité et d'exclusivité.</p></div>`
  },
  {
    code: 'cap_sha_startup',
    name: "Accord de pacte d'actionnaires startup (SHA)",
    category: 'commercial_financier',
    price: 20000,
    priceMax: 60000,
    description: "Shareholders Agreement régissant les relations entre fondateurs et investisseurs d'une startup (droits, obligations, sortie).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 85,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'fondateurs',label:"Noms des fondateurs",type:'text',required:true},
      {key:'investisseurs',label:"Noms des investisseurs",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'duree_pacte',label:"Durée du pacte",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PACTE D'ACTIONNAIRES (SHA) – STARTUP</h1>
<p>Entre les fondateurs (<strong>{{fondateurs}}</strong>) et les investisseurs (<strong>{{investisseurs}}</strong>) de <strong>{{startup_nom}}</strong>.</p>
<h2>Article 1 – Gouvernance</h2>
<p>Composition du Conseil d'Administration, quorum, majorités requises pour les décisions réservées.</p>
<h2>Article 2 – Droits préférentiels</h2>
<p>Droit de préemption, droit de suite (tag-along), droit de forçage (drag-along).</p>
<h2>Article 3 – Vesting des fondateurs</h2>
<p>Les fondateurs sont soumis à un vesting sur 4 ans avec cliff d'un an.</p>
<h2>Article 4 – Anti-dilution</h2>
<p>Protection anti-dilution à cliquet complet pour les investisseurs.</p>
<h2>Article 5 – Sortie</h2>
<p>Modalités de sortie : introduction en bourse, cession industrielle, ou rachat secondaire.</p>
<p>Durée du pacte : {{duree_pacte}} – Signé le {{date_signature}}.</p></div>`
  },
  {
    code: 'cap_bsa',
    name: "Accord de BSA (bons de souscription d'actions) startup",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Convention d'émission de bons de souscription d'actions (BSA) permettant à des tiers de souscrire à des actions à un prix fixé.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 66,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'beneficiaire_nom',label:"Nom du bénéficiaire des BSA",type:'text',required:true},
      {key:'nombre_bsa',label:"Nombre de BSA émis",type:'text',required:true},
      {key:'prix_exercice',label:"Prix d'exercice par action (FCFA)",type:'text',required:true},
      {key:'duree_exercice',label:"Durée d'exercice",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'EMISSION DE BSA (BONS DE SOUSCRIPTION D'ACTIONS)</h1>
<p>Entre <strong>{{startup_nom}}</strong> (l'Emetteur) et <strong>{{beneficiaire_nom}}</strong> (le Bénéficiaire).</p>
<h2>Article 1 – Emission</h2>
<p>La Société émet {{nombre_bsa}} BSA donnant droit à la souscription d'un nombre équivalent d'actions nouvelles.</p>
<h2>Article 2 – Prix d'exercice</h2>
<p>Prix d'exercice : {{prix_exercice}} FCFA par action.</p>
<h2>Article 3 – Durée et conditions d'exercice</h2>
<p>Les BSA sont exerçables pendant {{duree_exercice}} à compter de la date d'émission.</p>
<h2>Article 4 – Incessibilité</h2>
<p>Les BSA sont personnels et ne peuvent être cédés sans l'accord préalable de la Société.</p></div>`
  },
  {
    code: 'cap_bspce',
    name: "Accord de BSPCE (bons de souscription de parts de créateur d'entreprise)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Convention d'attribution de BSPCE permettant aux salariés et dirigeants d'une startup de souscrire des actions à prix préférentiel.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'beneficiaire_nom',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'nombre_bspce',label:"Nombre de BSPCE attribués",type:'text',required:true},
      {key:'prix_exercice',label:"Prix d'exercice (FCFA)",type:'text',required:true},
      {key:'calendrier_vesting',label:"Calendrier de vesting",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ATTRIBUTION DE BSPCE</h1>
<p>Entre <strong>{{startup_nom}}</strong> et <strong>{{beneficiaire_nom}}</strong>.</p>
<h2>Article 1 – Attribution</h2>
<p>La Société attribue {{nombre_bspce}} BSPCE au bénéficiaire au prix d'exercice de {{prix_exercice}} FCFA par action.</p>
<h2>Article 2 – Vesting</h2>
<p>{{calendrier_vesting}}</p>
<h2>Article 3 – Conditions</h2>
<p>L'exercice des BSPCE est conditionné au maintien du bénéficiaire au sein de la Société.</p>
<h2>Article 4 – Caducité</h2>
<p>Les BSPCE non exercés dans le délai légal deviennent caducs de plein droit.</p></div>`
  },
  {
    code: 'cap_vesting_fondateurs',
    name: "Accord de vesting des fondateurs (actions)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Convention de vesting définissant le calendrier d'acquisition progressive des droits sur les actions des fondateurs d'une startup.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'fondateur_nom',label:"Nom du fondateur",type:'text',required:true},
      {key:'nombre_actions',label:"Nombre d'actions soumises au vesting",type:'text',required:true},
      {key:'duree_vesting',label:"Durée totale du vesting (mois)",type:'text',required:true},
      {key:'cliff',label:"Durée du cliff (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VESTING DES FONDATEURS</h1>
<p>Entre <strong>{{startup_nom}}</strong> et <strong>{{fondateur_nom}}</strong> (le Fondateur).</p>
<h2>Article 1 – Actions concernées</h2>
<p>{{nombre_actions}} actions détenues par le Fondateur sont soumises au présent calendrier de vesting.</p>
<h2>Article 2 – Calendrier</h2>
<p>Vesting sur {{duree_vesting}} mois avec cliff de {{cliff}} mois. Au terme du cliff, 1/4 des actions est immédiatement acquis, puis acquisition linéaire mensuelle.</p>
<h2>Article 3 – Départ volontaire</h2>
<p>En cas de départ volontaire avant le terme, les actions non acquises sont rachetées à leur valeur nominale.</p>
<h2>Article 4 – Départ forcé</h2>
<p>En cas de révocation sans faute grave, les modalités de rachat sont définies au pacte d'actionnaires.</p></div>`
  },
  {
    code: 'cap_co_investissement',
    name: "Accord de co-investissement (lead investor / follow-on)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Convention encadrant la participation de co-investisseurs à un tour de financement mené par un lead investor.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'lead_investor',label:"Investisseur lead",type:'text',required:true},
      {key:'co_investisseur',label:"Co-investisseur(s)",type:'text',required:true},
      {key:'montant_co_invest',label:"Montant du co-investissement (FCFA)",type:'text',required:true},
      {key:'date_closing',label:"Date de closing",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CO-INVESTISSEMENT</h1>
<p>Entre <strong>{{lead_investor}}</strong> (Lead), <strong>{{co_investisseur}}</strong> (Co-investisseur) dans <strong>{{startup_nom}}</strong>.</p>
<h2>Article 1 – Montant</h2>
<p>Le co-investisseur investit {{montant_co_invest}} FCFA aux mêmes conditions que le lead investor.</p>
<h2>Article 2 – Rôle du lead</h2>
<p>Le lead investor mène les négociations, réalise la due diligence et représente le syndicat dans les organes de gouvernance.</p>
<h2>Article 3 – Droits du co-investisseur</h2>
<p>Mêmes droits économiques que le lead au prorata de sa participation, sans siège au Conseil.</p>
<p>Closing prévu le {{date_closing}}.</p></div>`
  },
  {
    code: 'cap_rofr',
    name: "Accord de droit de préemption entre investisseurs (ROFR)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Convention de Right of First Refusal permettant aux investisseurs existants de préempter les cessions de titres par d'autres actionnaires.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 60,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'actionnaire_cedant',label:"Actionnaire cédant",type:'text',required:true},
      {key:'beneficiaires_rofr',label:"Bénéficiaires du ROFR",type:'text',required:true},
      {key:'delai_exercice',label:"Délai d'exercice du ROFR (jours)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DROIT DE PREEMPTION (ROFR)</h1>
<p>Applicable à <strong>{{startup_nom}}</strong> entre <strong>{{actionnaire_cedant}}</strong> (le Cédant potentiel) et <strong>{{beneficiaires_rofr}}</strong> (les Bénéficiaires).</p>
<h2>Article 1 – Principe</h2>
<p>Avant toute cession de titres à un tiers, le Cédant doit notifier les Bénéficiaires de son intention de céder.</p>
<h2>Article 2 – Délai d'exercice</h2>
<p>Les Bénéficiaires disposent de {{delai_exercice}} jours pour exercer leur droit de préemption aux mêmes conditions.</p>
<h2>Article 3 – Ordre de priorité</h2>
<p>La Société exerce en premier, puis les investisseurs pro rata de leur participation.</p>
<h2>Article 4 – Transfert libre</h2>
<p>À défaut d'exercice dans le délai, le Cédant est libre de céder aux mêmes conditions au tiers proposé.</p></div>`
  },
  {
    code: 'cap_liquidation_preference',
    name: "Accord de clause de liquidation préférentielle (liquidation preference)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Convention définissant les droits prioritaires des investisseurs sur le produit d'une cession ou liquidation de la startup.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'investisseur_nom',label:"Investisseur bénéficiaire",type:'text',required:true},
      {key:'montant_investi',label:"Montant investi (FCFA)",type:'text',required:true},
      {key:'multiple_preference',label:"Multiple de préférence (ex: 1x, 2x)",type:'text',required:true},
      {key:'type_preference',label:"Type (participative / non-participative)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CLAUSE DE LIQUIDATION PREFERENTIELLE</h1>
<p>Au bénéfice de <strong>{{investisseur_nom}}</strong> dans <strong>{{startup_nom}}</strong>.</p>
<h2>Article 1 – Principe</h2>
<p>En cas de liquidation ou de cession de la Société, l'Investisseur perçoit en priorité {{multiple_preference}} fois son investissement de {{montant_investi}} FCFA.</p>
<h2>Article 2 – Type</h2>
<p>La préférence est de type {{type_preference}}.</p>
<h2>Article 3 – Ordre de priorité</h2>
<p>La préférence s'applique avant toute distribution aux actionnaires ordinaires.</p>
<h2>Article 4 – Résiduel</h2>
<p>En cas de préférence non-participative, l'Investisseur choisit entre la préférence et sa quote-part prorata.</p></div>`
  },
  {
    code: 'cap_anti_dilution',
    name: "Accord de clause anti-dilution (ratchet)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Convention anti-dilution protégeant les investisseurs contre une émission de nouvelles actions à un prix inférieur à leur prix d'entrée.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'investisseur_nom',label:"Investisseur protégé",type:'text',required:true},
      {key:'prix_initial',label:"Prix d'entrée initial (FCFA/action)",type:'text',required:true},
      {key:'type_ratchet',label:"Type de ratchet (full ratchet / broad-based weighted average)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CLAUSE ANTI-DILUTION (RATCHET)</h1>
<p>Au bénéfice de <strong>{{investisseur_nom}}</strong> dans <strong>{{startup_nom}}</strong>.</p>
<h2>Article 1 – Principe</h2>
<p>En cas d'émission de nouvelles actions à un prix inférieur au prix d'entrée de {{prix_initial}} FCFA par action, l'Investisseur bénéficie d'un ajustement anti-dilutif.</p>
<h2>Article 2 – Mécanisme</h2>
<p>Type de ratchet : {{type_ratchet}}. Le prix de conversion des actions préférentielles est ajusté selon la formule convenue.</p>
<h2>Article 3 – Exclusions</h2>
<p>Les émissions dans le cadre de plans d'intéressement, de BSPCE et d'acquisitions stratégiques sont exclues du mécanisme anti-dilutif.</p></div>`
  },
  {
    code: 'cap_tag_along',
    name: "Accord de clause de sortie conjointe (tag-along)",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Convention de tag-along permettant aux actionnaires minoritaires de participer à une cession initiée par un actionnaire majoritaire.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'actionnaire_majoritaire',label:"Actionnaire majoritaire",type:'text',required:true},
      {key:'minoritaires_proteges',label:"Minoritaires bénéficiaires du tag-along",type:'text',required:true},
      {key:'seuil_declenchement',label:"Seuil de déclenchement (% du capital cédé)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CLAUSE DE TAG-ALONG (SORTIE CONJOINTE)</h1>
<p>Dans <strong>{{startup_nom}}</strong>, entre <strong>{{actionnaire_majoritaire}}</strong> et <strong>{{minoritaires_proteges}}</strong>.</p>
<h2>Article 1 – Principe</h2>
<p>Si l'actionnaire majoritaire cède plus de {{seuil_declenchement}}% du capital à un tiers, les minoritaires ont le droit de céder leurs titres au même acquéreur aux mêmes conditions.</p>
<h2>Article 2 – Notification</h2>
<p>Le majoritaire notifie les minoritaires de toute cession projetée au moins 20 jours avant sa réalisation.</p>
<h2>Article 3 – Exercice</h2>
<p>Les minoritaires disposent de 15 jours pour exercer leur droit de tag-along.</p></div>`
  },
  {
    code: 'cap_drag_along',
    name: "Accord de clause de sortie forcée (drag-along)",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Convention de drag-along permettant aux actionnaires majoritaires d'imposer la vente de leurs titres aux minoritaires lors d'une cession.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'actionnaires_initiant',label:"Actionnaires initiant le drag-along",type:'text',required:true},
      {key:'seuil_decision',label:"Seuil requis pour déclencher le drag (% du capital)",type:'text',required:true},
      {key:'conditions_prix',label:"Conditions de prix plancher",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CLAUSE DE DRAG-ALONG (SORTIE FORCEE)</h1>
<p>Dans <strong>{{startup_nom}}</strong>, initiée par <strong>{{actionnaires_initiant}}</strong>.</p>
<h2>Article 1 – Principe</h2>
<p>Les actionnaires représentant au moins {{seuil_decision}}% du capital peuvent obliger les autres actionnaires à céder leurs titres dans le cadre d'une cession globale de la Société.</p>
<h2>Article 2 – Conditions</h2>
<p>{{conditions_prix}}</p>
<h2>Article 3 – Garanties des minoritaires</h2>
<p>Les minoritaires drag-alongs reçoivent les mêmes conditions de prix et de paiement que les actionnaires initiateurs.</p>
<h2>Article 4 – Notification</h2>
<p>Une notification écrite de 30 jours est requise avant l'exercice du drag-along.</p></div>`
  },
  {
    code: 'cap_incubateur',
    name: "Accord de service d'incubateur (hébergement startup)",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Convention entre un incubateur et une startup pour la fourniture de services d'hébergement, d'accompagnement et de ressources partagées.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'incubateur_nom',label:"Nom de l'incubateur",type:'text',required:true},
      {key:'duree_incubation',label:"Durée d'incubation",type:'text',required:true},
      {key:'redevance_mensuelle',label:"Redevance mensuelle (FCFA)",type:'text',required:true},
      {key:'date_entree',label:"Date d'entrée en incubation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'INCUBATION</h1>
<p>Entre <strong>{{incubateur_nom}}</strong> (l'Incubateur) et <strong>{{startup_nom}}</strong> (la Startup).</p>
<h2>Article 1 – Services fournis</h2>
<p>Hébergement, connexion internet, salles de réunion, accès aux coachs et au réseau de l'incubateur.</p>
<h2>Article 2 – Durée</h2>
<p>{{duree_incubation}} à compter du {{date_entree}}.</p>
<h2>Article 3 – Redevance</h2>
<p>{{redevance_mensuelle}} FCFA/mois payable en début de mois.</p>
<h2>Article 4 – Equity</h2>
<p>L'incubateur ne prend aucune participation au capital sauf accord spécifique annexé.</p>
<h2>Article 5 – Propriété intellectuelle</h2>
<p>La startup conserve l'intégralité de ses droits de propriété intellectuelle.</p></div>`
  },
  {
    code: 'cap_accelerateur',
    name: "Accord de service d'accélérateur de startups (programme 12 semaines)",
    category: 'commercial_financier',
    price: 10000,
    priceMax: 30000,
    description: "Convention entre un programme d'accélération et une startup sélectionnée pour un programme intensif de 12 semaines.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 76,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'accelerateur_nom',label:"Nom du programme accélérateur",type:'text',required:true},
      {key:'date_demarrage',label:"Date de démarrage du programme",type:'date',required:true},
      {key:'participation_equity',label:"Participation equity prise par l'accélérateur (%)",type:'text',required:true},
      {key:'financement_octroye',label:"Financement octroyé (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ACCELERATION – PROGRAMME 12 SEMAINES</h1>
<p>Entre <strong>{{accelerateur_nom}}</strong> et <strong>{{startup_nom}}</strong>.</p>
<h2>Article 1 – Programme</h2>
<p>La startup intègre le programme d'accélération de 12 semaines démarrant le {{date_demarrage}}.</p>
<h2>Article 2 – Financement</h2>
<p>{{financement_octroye}} FCFA sont investis dans la startup en échange de {{participation_equity}}% du capital.</p>
<h2>Article 3 – Prestations</h2>
<p>Mentorat intensif, ateliers thématiques, mise en réseau avec des investisseurs, et Demo Day final.</p>
<h2>Article 4 – Obligations de la startup</h2>
<p>Participation active au programme, reporting mensuel, et présentation lors du Demo Day.</p></div>`
  },
  {
    code: 'cap_mentorat',
    name: "Accord de service de programme de mentorat startup",
    category: 'commercial_financier',
    price: 7000,
    priceMax: 21000,
    description: "Convention de mentorat entre un entrepreneur expérimenté et une startup pour un accompagnement personnalisé.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'mentor_nom',label:"Nom du mentor",type:'text',required:true},
      {key:'duree_mentorat',label:"Durée du programme de mentorat",type:'text',required:true},
      {key:'frequence_sessions',label:"Fréquence des sessions",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MENTORAT STARTUP</h1>
<p>Entre <strong>{{mentor_nom}}</strong> (le Mentor) et <strong>{{startup_nom}}</strong> (la Startup).</p>
<h2>Article 1 – Objet</h2>
<p>Le Mentor apporte son expertise et son réseau à la Startup dans le cadre d'un programme de mentorat personnalisé.</p>
<h2>Article 2 – Durée et fréquence</h2>
<p>Programme de {{duree_mentorat}} – Sessions {{frequence_sessions}} – Démarrage : {{date_debut}}.</p>
<h2>Article 3 – Confidentialité</h2>
<p>Le Mentor s'engage à la confidentialité absolue sur les informations de la Startup.</p>
<h2>Article 4 – Rémunération</h2>
<p>Le mentorat est réalisé à titre bénévole ou contre BSA selon les termes de l'annexe.</p></div>`
  },
  {
    code: 'cap_coworking',
    name: "Accord de service de coworking startup",
    category: 'commercial_financier',
    price: 6000,
    priceMax: 18000,
    description: "Convention d'accès à un espace de coworking dédié aux startups et entrepreneurs.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 74,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup / entrepreneur",type:'text',required:true},
      {key:'operateur_nom',label:"Nom de l'opérateur de coworking",type:'text',required:true},
      {key:'formule',label:"Formule choisie (flex, bureau fixe...)",type:'text',required:true},
      {key:'tarif_mensuel',label:"Tarif mensuel (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COWORKING</h1>
<p>Entre <strong>{{operateur_nom}}</strong> (l'Opérateur) et <strong>{{startup_nom}}</strong> (le Membre).</p>
<h2>Article 1 – Accès</h2>
<p>Le Membre bénéficie d'un accès à l'espace de coworking selon la formule {{formule}}.</p>
<h2>Article 2 – Tarif</h2>
<p>{{tarif_mensuel}} FCFA/mois, payable en début de mois.</p>
<h2>Article 3 – Services inclus</h2>
<p>Internet haut débit, électricité, accès aux salles de réunion (selon quota), domiciliation postale.</p>
<h2>Article 4 – Règlement intérieur</h2>
<p>Le Membre s'engage à respecter le règlement intérieur de l'espace affiché sur place.</p>
<p>Début d'accès : {{date_debut}}.</p></div>`
  },
  {
    code: 'cap_concours_innovation',
    name: "Accord de concours d'innovation et prix startup",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Règlement et convention de participation à un concours d'innovation ou prix startup organisé par un accélérateur ou institution.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'organisateur_nom',label:"Nom de l'organisateur",type:'text',required:true},
      {key:'startup_nom',label:"Nom de la startup participante",type:'text',required:true},
      {key:'nom_concours',label:"Nom du concours",type:'text',required:true},
      {key:'prix_total',label:"Montant total des prix (FCFA)",type:'text',required:true},
      {key:'date_finale',label:"Date de la finale",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTICIPATION – CONCOURS D'INNOVATION</h1>
<p>Entre <strong>{{organisateur_nom}}</strong> et <strong>{{startup_nom}}</strong> pour le concours <strong>{{nom_concours}}</strong>.</p>
<h2>Article 1 – Participation</h2>
<p>La startup s'engage à participer activement au concours et à soumettre tous les livrables requis.</p>
<h2>Article 2 – Prix</h2>
<p>Montant total des prix : {{prix_total}} FCFA, répartis selon le règlement du concours.</p>
<h2>Article 3 – Propriété intellectuelle</h2>
<p>La startup conserve ses droits de propriété intellectuelle. L'organisateur obtient uniquement le droit de communiquer sur la participation.</p>
<h2>Article 4 – Finale</h2>
<p>Date de la finale : {{date_finale}}.</p></div>`
  },
  {
    code: 'cap_partenariat_corporate_startup',
    name: "Accord de partenariat corporate-startup (CVC)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Convention de Corporate Venture Capital encadrant le partenariat entre une grande entreprise et une startup pour l'innovation ouverte.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 70,
    fieldsJson: F([
      {key:'corporate_nom',label:"Nom de l'entreprise corporate",type:'text',required:true},
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'investissement_cvc',label:"Investissement CVC (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CORPORATE-STARTUP (CVC)</h1>
<p>Entre <strong>{{corporate_nom}}</strong> et <strong>{{startup_nom}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>{{objet_partenariat}}</p>
<h2>Article 2 – Investissement</h2>
<p>{{corporate_nom}} investit {{investissement_cvc}} FCFA dans la startup en contrepartie d'une participation minoritaire.</p>
<h2>Article 3 – Collaboration</h2>
<p>Accès aux marchés du corporate, pilotes commerciaux, partage de ressources et co-développement de solutions.</p>
<h2>Article 4 – Propriété intellectuelle</h2>
<p>Les développements communs font l'objet d'une co-propriété selon les modalités définies en annexe.</p>
<p>Fait le {{date_signature}}.</p></div>`
  },
  {
    code: 'cap_vc_report',
    name: "Rapport de performance fonds de capital risque (VC report)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Rapport périodique de performance d'un fonds de capital risque destiné aux Limited Partners (LPs).",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 65,
    fieldsJson: F([
      {key:'fonds_nom',label:"Nom du fonds VC",type:'text',required:true},
      {key:'gp_nom',label:"Gestionnaire (General Partner)",type:'text',required:true},
      {key:'periode_rapport',label:"Période du rapport",type:'text',required:true},
      {key:'valeur_portefeuille',label:"Valeur du portefeuille (FCFA)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – FONDS DE CAPITAL RISQUE</h1>
<p><strong>{{fonds_nom}}</strong> – Géré par {{gp_nom}} – Période : {{periode_rapport}} – Date : {{date_rapport}}</p>
<h2>1. Résumé du portefeuille</h2>
<p>Valeur totale du portefeuille : {{valeur_portefeuille}} FCFA.</p>
<h2>2. Nouvelles participations</h2>
<p>Investissements réalisés durant la période et valorisations initiales.</p>
<h2>3. Sociétés en portefeuille</h2>
<p>Faits marquants, performances opérationnelles, et besoins de financement additionnel.</p>
<h2>4. Sorties réalisées</h2>
<p>Cessions et retours générés durant la période.</p>
<h2>5. Métriques clés</h2>
<p>TRI net, TVPI, DPI, RVPI et comparaisons avec les objectifs du fonds.</p></div>`
  },
  {
    code: 'cap_exit_strategy',
    name: "Plan de sortie investisseur (exit strategy)",
    category: 'commercial_financier',
    price: 12000,
    priceMax: 36000,
    description: "Document de planification des scénarios de sortie pour un investisseur VC dans une startup de son portefeuille.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 68,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'investisseur_nom',label:"Investisseur planifiant la sortie",type:'text',required:true},
      {key:'horizon_sortie',label:"Horizon de sortie visé",type:'text',required:true},
      {key:'scenarios_sortie',label:"Scénarios de sortie envisagés",type:'textarea',required:true},
      {key:'valorisation_cible',label:"Valorisation cible à la sortie (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE SORTIE INVESTISSEUR (EXIT STRATEGY)</h1>
<p>Pour <strong>{{investisseur_nom}}</strong> dans <strong>{{startup_nom}}</strong>.</p>
<h2>1. Horizon de sortie</h2>
<p>{{horizon_sortie}}</p>
<h2>2. Scénarios de sortie</h2>
<p>{{scenarios_sortie}}</p>
<h2>3. Valorisation cible</h2>
<p>{{valorisation_cible}} FCFA à la sortie.</p>
<h2>4. Conditions de marché</h2>
<p>Analyse des conditions nécessaires à une sortie optimale : maturité du marché, taille de la startup, intérêt des acquéreurs stratégiques.</p>
<h2>5. Actions préparatoires</h2>
<p>Mise en conformité, audit pré-cession, identification des acquéreurs potentiels, et optimisation de la gouvernance.</p></div>`
  },
  {
    code: 'cap_conseil_levee_fonds',
    name: "Accord de service de conseil en levée de fonds",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Contrat de conseil pour accompagner une startup dans sa démarche de levée de fonds auprès d'investisseurs.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 78,
    fieldsJson: F([
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'conseil_nom',label:"Conseil en levée de fonds",type:'text',required:true},
      {key:'montant_cible',label:"Montant cible à lever (FCFA)",type:'text',required:true},
      {key:'type_investisseurs',label:"Type d'investisseurs ciblés",type:'text',required:true},
      {key:'date_debut_mission',label:"Date de début de mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSEIL EN LEVEE DE FONDS</h1>
<p>Entre <strong>{{startup_nom}}</strong> et <strong>{{conseil_nom}}</strong>.</p>
<h2>Article 1 – Mission</h2>
<p>Le Conseil accompagne la startup dans sa levée de fonds de {{montant_cible}} FCFA auprès de {{type_investisseurs}}.</p>
<h2>Article 2 – Prestations</h2>
<p>Préparation du pitch deck, du mémorandum d'information, identification et approche d'investisseurs, négociation des term sheets, et coordination jusqu'au closing.</p>
<h2>Article 3 – Rémunération</h2>
<p>Retainer mensuel et success fee de 3-5% du montant levé selon la grille tarifaire annexée.</p>
<h2>Article 4 – Début de mission</h2>
<p>Mission démarrant le {{date_debut_mission}} pour une durée initiale de 6 mois.</p></div>`
  },
  {
    code: 'cap_partenariat_banque_startup',
    name: "Accord de partenariat banque-startup (financement innovant)",
    category: 'commercial_financier',
    price: 15000,
    priceMax: 45000,
    description: "Convention de partenariat entre une banque et une startup fintech ou innovante pour le développement de solutions de financement.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 72,
    fieldsJson: F([
      {key:'banque_nom',label:"Nom de la banque",type:'text',required:true},
      {key:'startup_nom',label:"Nom de la startup",type:'text',required:true},
      {key:'objet_partenariat',label:"Objet du partenariat",type:'textarea',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT BANQUE-STARTUP</h1>
<p>Entre <strong>{{banque_nom}}</strong> et <strong>{{startup_nom}}</strong>.</p>
<h2>Article 1 – Objet</h2>
<p>{{objet_partenariat}}</p>
<h2>Article 2 – Engagements de la banque</h2>
<p>Accès aux données clients anonymisées (sous réserve du RGPD/CEDEAO), ligne de crédit dédiée aux clients de la startup, et co-commercialisation des solutions.</p>
<h2>Article 3 – Engagements de la startup</h2>
<p>Développement et maintenance de la solution, conformité réglementaire, et reporting de performance.</p>
<h2>Article 4 – Durée</h2>
<p>Partenariat de {{duree_partenariat}} renouvelable. Signé le {{date_signature}}.</p></div>`
  },
  {
    code: 'cap_charte_investissement_responsable',
    name: "Charte de l'investissement responsable dans les startups africaines",
    category: 'commercial_financier',
    price: 8000,
    priceMax: 24000,
    description: "Charte définissant les principes ESG et d'investissement responsable applicables aux investissements dans les startups africaines.",
    templateType: 'pdf',
    classe: 'A',
    active: true,
    popularity: 62,
    fieldsJson: F([
      {key:'fonds_nom',label:"Nom du fonds ou investisseur",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true},
      {key:'engagements_esg',label:"Engagements ESG spécifiques",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'INVESTISSEMENT RESPONSABLE – STARTUPS AFRICAINES</h1>
<p><strong>{{fonds_nom}}</strong> – Adoptée le {{date_adoption}}</p>
<h2>1. Principes environnementaux</h2>
<p>Privilégier les startups proposant des solutions à impact environnemental positif et réduisant leur empreinte carbone.</p>
<h2>2. Principes sociaux</h2>
<p>Soutenir les startups créatrices d'emplois locaux, favorisant l'inclusion financière et l'accès aux services essentiels.</p>
<h2>3. Gouvernance</h2>
<p>Exiger des standards de gouvernance élevés : parité, transparence comptable, et conformité réglementaire.</p>
<h2>4. Engagements spécifiques</h2>
<p>{{engagements_esg}}</p>
<h2>5. Reporting</h2>
<p>Publication annuelle d'un rapport d'impact ESG pour toutes les participations du portefeuille.</p></div>`
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
  console.log(`Batch 78a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
