import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── 25 Procédures collectives OHADA ──────────────────────────────────────
  {
    code: 'proc_conciliation_ohada',
    name: "Demande de conciliation OHADA (AUPC révisé)",
    category: 'juridique_admin', price: 12000, priceMax: 36000,
    description: "Requête adressée au président du tribunal compétent pour l'ouverture d'une procédure de conciliation selon l'AUPC révisé OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'raison_sociale',label:"Raison sociale du débiteur",type:'text',required:true},
      {key:'tribunal',label:"Tribunal compétent",type:'text',required:true},
      {key:'date_cessation',label:"Date de cessation des paiements",type:'date',required:false},
      {key:'montant_passif',label:"Montant total du passif (FCFA)",type:'text',required:true},
      {key:'nom_dirigeant',label:"Nom du dirigeant",type:'text',required:true},
      {key:'motif',label:"Motif de la demande",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>DEMANDE DE CONCILIATION OHADA</h1><h2>AUPC RÉVISÉ — Article 5-1 et suivants</h2><p><strong>Débiteur :</strong> {{raison_sociale}}</p><p><strong>Représenté par :</strong> {{nom_dirigeant}}</p><p><strong>Tribunal saisi :</strong> {{tribunal}}</p><p><strong>Montant total du passif :</strong> {{montant_passif}} FCFA</p><p><strong>Date de cessation des paiements :</strong> {{date_cessation}}</p><h3>EXPOSÉ DES MOTIFS</h3><p>{{motif}}</p><p>En application des dispositions de l'Acte Uniforme portant organisation des Procédures Collectives d'Apurement du Passif (AUPC) révisé, le débiteur sollicite l'ouverture d'une procédure de conciliation afin de parvenir à un accord amiable avec ses créanciers principaux.</p><p>Fait à ____________, le {{date_cessation}}</p><p>Signature du débiteur : ___________________</p></div>`
  },
  {
    code: 'proc_accord_conciliation',
    name: "Accord de conciliation homologué",
    category: 'juridique_admin', price: 15000, priceMax: 45000,
    description: "Accord de conciliation entre le débiteur et ses créanciers, soumis à homologation judiciaire conformément à l'AUPC révisé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'debiteur',label:"Dénomination du débiteur",type:'text',required:true},
      {key:'creanciers',label:"Liste des créanciers signataires",type:'textarea',required:true},
      {key:'montant_accord',label:"Montant total de l'accord (FCFA)",type:'text',required:true},
      {key:'duree_moratoire',label:"Durée du moratoire (mois)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCILIATION</h1><h2>Soumis à homologation — AUPC révisé Art. 15</h2><p><strong>Entre :</strong> {{debiteur}} (ci-après « le Débiteur »)</p><p><strong>Et :</strong> {{creanciers}}</p><h3>TERMES DE L'ACCORD</h3><p><strong>Montant total de l'accord :</strong> {{montant_accord}} FCFA</p><p><strong>Durée du moratoire :</strong> {{duree_moratoire}} mois</p><p>Les parties conviennent des modalités de remboursement échelonné ci-annexées. Le présent accord sera soumis à homologation du président du tribunal compétent dans les meilleurs délais.</p><p>Signé à ____________, le {{date_signature}}</p><p>Le Débiteur : _____________________ Les Créanciers : _____________________</p></div>`
  },
  {
    code: 'proc_reglement_preventif',
    name: "Requête en règlement préventif",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Requête aux fins d'ouverture d'un règlement préventif permettant au débiteur en difficulté d'obtenir un concordat préventif.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'debiteur',label:"Dénomination sociale",type:'text',required:true},
      {key:'siege_social',label:"Siège social",type:'text',required:true},
      {key:'nature_activite',label:"Nature de l'activité",type:'text',required:true},
      {key:'difficultes',label:"Description des difficultés",type:'textarea',required:true},
      {key:'date_depot',label:"Date de dépôt de la requête",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN RÈGLEMENT PRÉVENTIF</h1><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>Siège social :</strong> {{siege_social}}</p><p><strong>Activité :</strong> {{nature_activite}}</p><h3>EXPOSÉ DE LA SITUATION</h3><p>{{difficultes}}</p><p>Le débiteur, en application de l'article 6 de l'AUPC révisé, sollicite l'ouverture d'un règlement préventif en vue de l'élaboration d'un concordat préventif permettant l'apurement de son passif et la poursuite de son activité.</p><p>Déposé le {{date_depot}}</p></div>`
  },
  {
    code: 'proc_plan_redressement',
    name: "Plan de redressement entreprise",
    category: 'juridique_admin', price: 18000, priceMax: 54000,
    description: "Document formalisant le plan de redressement d'une entreprise en difficulté, présenté aux créanciers et au tribunal.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'syndic',label:"Nom du syndic/administrateur",type:'text',required:true},
      {key:'duree_plan',label:"Durée du plan (années)",type:'text',required:true},
      {key:'mesures_redressement',label:"Mesures de redressement prévues",type:'textarea',required:true},
      {key:'date_approbation',label:"Date d'approbation du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE REDRESSEMENT</h1><h2>{{entreprise}}</h2><p><strong>Administrateur judiciaire :</strong> {{syndic}}</p><p><strong>Durée du plan :</strong> {{duree_plan}} ans</p><h3>MESURES DE REDRESSEMENT</h3><p>{{mesures_redressement}}</p><p>Le présent plan, approuvé par l'assemblée des créanciers et homologué par le tribunal, engage l'entreprise à respecter les échéances fixées sous peine de résolution du concordat.</p><p>Approuvé le {{date_approbation}}</p></div>`
  },
  {
    code: 'proc_requete_redressement_jud',
    name: "Requête en redressement judiciaire",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Requête aux fins d'ouverture d'un redressement judiciaire pour une entreprise en état de cessation des paiements.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'debiteur',label:"Dénomination du débiteur",type:'text',required:true},
      {key:'numero_rccm',label:"Numéro RCCM",type:'text',required:true},
      {key:'date_cessation',label:"Date de cessation des paiements",type:'date',required:true},
      {key:'passif_exigible',label:"Passif exigible total (FCFA)",type:'text',required:true},
      {key:'actif_disponible',label:"Actif disponible (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN REDRESSEMENT JUDICIAIRE</h1><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>RCCM :</strong> {{numero_rccm}}</p><p><strong>Date de cessation des paiements :</strong> {{date_cessation}}</p><p><strong>Passif exigible :</strong> {{passif_exigible}} FCFA</p><p><strong>Actif disponible :</strong> {{actif_disponible}} FCFA</p><p>Le débiteur, en état avéré de cessation des paiements, sollicite l'ouverture d'un redressement judiciaire conformément aux articles 25 et suivants de l'AUPC révisé, en vue de permettre la continuation de l'entreprise et l'apurement du passif.</p></div>`
  },
  {
    code: 'proc_jugement_ouverture_rj',
    name: "Jugement d'ouverture redressement judiciaire",
    category: 'juridique_admin', price: 8000, priceMax: 24000,
    description: "Modèle de jugement d'ouverture de la procédure de redressement judiciaire rendu par le tribunal compétent.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'tribunal',label:"Tribunal compétent",type:'text',required:true},
      {key:'debiteur',label:"Dénomination du débiteur",type:'text',required:true},
      {key:'date_jugement',label:"Date du jugement",type:'date',required:true},
      {key:'nom_syndic',label:"Nom du syndic désigné",type:'text',required:true},
      {key:'periode_observation',label:"Durée de la période d'observation (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>JUGEMENT D'OUVERTURE DE REDRESSEMENT JUDICIAIRE</h1><p><strong>Tribunal :</strong> {{tribunal}}</p><p><strong>Date :</strong> {{date_jugement}}</p><h3>DISPOSITIF</h3><p>Le Tribunal, statuant publiquement, contradictoirement et en premier ressort :</p><p>— OUVRE la procédure de redressement judiciaire à l'égard de : <strong>{{debiteur}}</strong></p><p>— DÉSIGNE en qualité de syndic : <strong>{{nom_syndic}}</strong></p><p>— FIXE la période d'observation à : <strong>{{periode_observation}} mois</strong></p><p>— ORDONNE la publication du présent jugement au RCCM et dans un journal d'annonces légales.</p></div>`
  },
  {
    code: 'proc_rapport_syndic',
    name: "Rapport du syndic (administrateur judiciaire)",
    category: 'juridique_admin', price: 12000, priceMax: 36000,
    description: "Rapport périodique établi par le syndic sur la situation de l'entreprise en procédure collective OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'syndic',label:"Nom du syndic",type:'text',required:true},
      {key:'debiteur',label:"Dénomination du débiteur",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte par le rapport",type:'text',required:true},
      {key:'situation_financiere',label:"Situation financière constatée",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DU SYNDIC</h1><p><strong>Syndic :</strong> {{syndic}}</p><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>Période couverte :</strong> {{periode_rapport}}</p><p><strong>Date du rapport :</strong> {{date_rapport}}</p><h3>SITUATION FINANCIÈRE</h3><p>{{situation_financiere}}</p><p>Le syndic certifie l'exactitude des informations contenues dans le présent rapport et s'engage à tenir le tribunal informé de toute évolution significative.</p><p>Signature du syndic : ___________________</p></div>`
  },
  {
    code: 'proc_plan_continuation',
    name: "Plan de continuation (redressement)",
    category: 'juridique_admin', price: 15000, priceMax: 45000,
    description: "Plan de continuation de l'activité adopté dans le cadre d'un redressement judiciaire OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'duree_plan',label:"Durée du plan (années)",type:'text',required:true},
      {key:'echeancier',label:"Échéancier de remboursement",type:'textarea',required:true},
      {key:'engagements',label:"Engagements du débiteur",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CONTINUATION</h1><h2>{{entreprise}}</h2><p><strong>Durée :</strong> {{duree_plan}} ans</p><h3>ÉCHÉANCIER DE REMBOURSEMENT</h3><p>{{echeancier}}</p><h3>ENGAGEMENTS DU DÉBITEUR</h3><p>{{engagements}}</p><p>Le débiteur s'engage à respecter scrupuleusement les termes du présent plan sous peine de conversion en liquidation des biens. Adopté le {{date_adoption}}.</p></div>`
  },
  {
    code: 'proc_plan_cession_actifs',
    name: "Plan de cession partielle d'actifs",
    category: 'juridique_admin', price: 14000, priceMax: 42000,
    description: "Plan organisant la cession partielle d'actifs dans le cadre d'un redressement judiciaire OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'debiteur',label:"Débiteur cédant",type:'text',required:true},
      {key:'cessionnaire',label:"Cessionnaire",type:'text',required:true},
      {key:'actifs_cedes',label:"Description des actifs cédés",type:'textarea',required:true},
      {key:'prix_cession',label:"Prix de cession total (FCFA)",type:'text',required:true},
      {key:'date_cession',label:"Date de la cession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE CESSION PARTIELLE D'ACTIFS</h1><p><strong>Cédant :</strong> {{debiteur}}</p><p><strong>Cessionnaire :</strong> {{cessionnaire}}</p><h3>ACTIFS CÉDÉS</h3><p>{{actifs_cedes}}</p><p><strong>Prix de cession :</strong> {{prix_cession}} FCFA</p><p>La cession est réalisée dans le cadre de la procédure de redressement judiciaire, sous le contrôle du syndic et avec l'autorisation du tribunal. Date de réalisation : {{date_cession}}.</p></div>`
  },
  {
    code: 'proc_requete_liquidation',
    name: "Requête en liquidation des biens",
    category: 'juridique_admin', price: 9000, priceMax: 27000,
    description: "Requête aux fins d'ouverture d'une procédure de liquidation des biens d'un débiteur en cessation des paiements irrémédiable.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'debiteur',label:"Dénomination du débiteur",type:'text',required:true},
      {key:'requérant',label:"Nom du requérant",type:'text',required:true},
      {key:'motif_liquidation',label:"Motif de la demande de liquidation",type:'textarea',required:true},
      {key:'date_requete',label:"Date de la requête",type:'date',required:true},
      {key:'tribunal',label:"Tribunal saisi",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN LIQUIDATION DES BIENS</h1><p><strong>Requérant :</strong> {{requérant}}</p><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>Tribunal saisi :</strong> {{tribunal}}</p><h3>MOTIFS DE LA DEMANDE</h3><p>{{motif_liquidation}}</p><p>Eu égard à la situation irrémédiablement compromise du débiteur, le requérant sollicite l'ouverture d'une procédure de liquidation des biens conformément aux articles 88 et suivants de l'AUPC révisé.</p><p>Fait le {{date_requete}}</p></div>`
  },
  {
    code: 'proc_jugement_cloture_insuffisance',
    name: "Jugement de clôture pour insuffisance d'actif",
    category: 'juridique_admin', price: 7000, priceMax: 21000,
    description: "Modèle de jugement de clôture de la procédure collective pour insuffisance d'actif à répartir.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'tribunal',label:"Tribunal",type:'text',required:true},
      {key:'debiteur',label:"Débiteur",type:'text',required:true},
      {key:'syndic',label:"Syndic de la procédure",type:'text',required:true},
      {key:'date_cloture',label:"Date de clôture",type:'date',required:true},
      {key:'motif',label:"Motif de la clôture",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>JUGEMENT DE CLÔTURE POUR INSUFFISANCE D'ACTIF</h1><p><strong>Tribunal :</strong> {{tribunal}}</p><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>Syndic :</strong> {{syndic}}</p><p>Le Tribunal, après examen du rapport final du syndic et constatant l'insuffisance d'actif pour désintéresser l'ensemble des créanciers, prononce la clôture de la procédure collective.</p><p>{{motif}}</p><p>Prononcé le {{date_cloture}}</p></div>`
  },
  {
    code: 'proc_jugement_liquidation',
    name: "Jugement de liquidation des biens",
    category: 'juridique_admin', price: 8000, priceMax: 24000,
    description: "Modèle de jugement prononçant la liquidation des biens d'un débiteur en procédure collective OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'tribunal',label:"Tribunal compétent",type:'text',required:true},
      {key:'debiteur',label:"Dénomination du débiteur",type:'text',required:true},
      {key:'date_jugement',label:"Date du jugement",type:'date',required:true},
      {key:'nom_syndic',label:"Syndic désigné",type:'text',required:true},
      {key:'date_cessation',label:"Date de cessation des paiements retenue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>JUGEMENT DE LIQUIDATION DES BIENS</h1><p><strong>Tribunal :</strong> {{tribunal}} — <strong>Date :</strong> {{date_jugement}}</p><p><strong>Débiteur :</strong> {{debiteur}}</p><h3>DISPOSITIF</h3><p>Le Tribunal PRONONCE la liquidation des biens de {{debiteur}}.</p><p>FIXE la date de cessation des paiements au {{date_cessation}}.</p><p>DÉSIGNE comme syndic : {{nom_syndic}}.</p><p>ORDONNE la publication du présent jugement conformément à l'AUPC révisé.</p></div>`
  },
  {
    code: 'proc_declaration_creance',
    name: "Déclaration de créance (procédure collective)",
    category: 'juridique_admin', price: 5000, priceMax: 15000,
    description: "Formulaire de déclaration de créance à produire dans le délai légal auprès du syndic lors d'une procédure collective OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'creancier',label:"Nom/Raison sociale du créancier",type:'text',required:true},
      {key:'debiteur',label:"Débiteur en procédure",type:'text',required:true},
      {key:'montant_creance',label:"Montant de la créance (FCFA)",type:'text',required:true},
      {key:'nature_creance',label:"Nature de la créance",type:'text',required:true},
      {key:'date_declaration',label:"Date de déclaration",type:'date',required:true},
      {key:'pieces_justificatives',label:"Pièces justificatives jointes",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE CRÉANCE</h1><p><strong>Créancier :</strong> {{creancier}}</p><p><strong>Débiteur en procédure :</strong> {{debiteur}}</p><p><strong>Montant de la créance :</strong> {{montant_creance}} FCFA</p><p><strong>Nature de la créance :</strong> {{nature_creance}}</p><p><strong>Pièces jointes :</strong> {{pieces_justificatives}}</p><p>Le soussigné déclare la créance ci-dessus dans le délai légal prévu par l'AUPC révisé et s'engage à fournir toute pièce complémentaire à la demande du syndic.</p><p>Fait le {{date_declaration}} — Signature : ___________________</p></div>`
  },
  {
    code: 'proc_releve_forclusion',
    name: "Relevé de forclusion (créance tardive)",
    category: 'juridique_admin', price: 7000, priceMax: 21000,
    description: "Requête en relevé de forclusion permettant à un créancier d'être admis tardivement à la procédure collective.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 52,
    fieldsJson: F([
      {key:'creancier',label:"Créancier requérant",type:'text',required:true},
      {key:'debiteur',label:"Débiteur en procédure",type:'text',required:true},
      {key:'motif_tardivete',label:"Motif justifiant la tardiveté",type:'textarea',required:true},
      {key:'montant_creance',label:"Montant de la créance (FCFA)",type:'text',required:true},
      {key:'date_requete',label:"Date de la requête",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>REQUÊTE EN RELEVÉ DE FORCLUSION</h1><p><strong>Créancier :</strong> {{creancier}}</p><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>Créance :</strong> {{montant_creance}} FCFA</p><h3>JUSTIFICATION DE LA TARDIVETÉ</h3><p>{{motif_tardivete}}</p><p>En application de l'article 85 de l'AUPC révisé, le créancier sollicite son relevé de forclusion et l'admission de sa créance à la procédure collective.</p><p>Déposé le {{date_requete}}</p></div>`
  },
  {
    code: 'proc_accord_verification_creances',
    name: "Accord de vérification des créances",
    category: 'juridique_admin', price: 9000, priceMax: 27000,
    description: "Procès-verbal d'accord issu des opérations de vérification des créances entre le syndic et les créanciers.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'syndic',label:"Syndic",type:'text',required:true},
      {key:'debiteur',label:"Débiteur",type:'text',required:true},
      {key:'creances_admises',label:"Créances admises (description)",type:'textarea',required:true},
      {key:'creances_rejetees',label:"Créances rejetées (description)",type:'textarea',required:false},
      {key:'date_pv',label:"Date du procès-verbal",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL DE VÉRIFICATION DES CRÉANCES</h1><p><strong>Syndic :</strong> {{syndic}}</p><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>Date :</strong> {{date_pv}}</p><h3>CRÉANCES ADMISES</h3><p>{{creances_admises}}</p><h3>CRÉANCES REJETÉES</h3><p>{{creances_rejetees}}</p><p>Le présent procès-verbal de vérification est dressé conformément aux articles 78 et suivants de l'AUPC révisé. Les créanciers disposent d'un délai de contestation conformément aux dispositions légales.</p></div>`
  },
  {
    code: 'proc_accord_repartition_deniers',
    name: "Accord de répartition des deniers (dividende)",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Document organisant la répartition des deniers disponibles entre les créanciers admis dans une procédure collective.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 57,
    fieldsJson: F([
      {key:'syndic',label:"Syndic",type:'text',required:true},
      {key:'total_deniers',label:"Total des deniers à répartir (FCFA)",type:'text',required:true},
      {key:'taux_dividende',label:"Taux de dividende (%)",type:'text',required:true},
      {key:'creanciers_beneficiaires',label:"Créanciers bénéficiaires",type:'textarea',required:true},
      {key:'date_repartition',label:"Date de répartition",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ÉTAT DE RÉPARTITION DES DENIERS</h1><p><strong>Syndic :</strong> {{syndic}}</p><p><strong>Total disponible :</strong> {{total_deniers}} FCFA</p><p><strong>Dividende :</strong> {{taux_dividende}}%</p><h3>BÉNÉFICIAIRES</h3><p>{{creanciers_beneficiaires}}</p><p>La présente répartition est effectuée conformément à l'ordre de priorité établi par l'AUPC révisé. Date d'exécution : {{date_repartition}}.</p></div>`
  },
  {
    code: 'proc_accord_mainlevee_saisie',
    name: "Accord de mainlevée de saisie (procédure collective)",
    category: 'juridique_admin', price: 8000, priceMax: 24000,
    description: "Accord de mainlevée des saisies pratiquées avant l'ouverture de la procédure collective OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'debiteur',label:"Débiteur",type:'text',required:true},
      {key:'creancier_saisissant',label:"Créancier saisissant",type:'text',required:true},
      {key:'bien_saisi',label:"Bien(s) saisi(s)",type:'textarea',required:true},
      {key:'date_mainlevee',label:"Date de mainlevée",type:'date',required:true},
      {key:'syndic',label:"Syndic de la procédure",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAINLEVÉE DE SAISIE</h1><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>Créancier saisissant :</strong> {{creancier_saisissant}}</p><p><strong>Syndic :</strong> {{syndic}}</p><h3>BIENS CONCERNÉS</h3><p>{{bien_saisi}}</p><p>Conformément au principe de suspension des poursuites individuelles issu de l'ouverture de la procédure collective (AUPC révisé, art. 75), mainlevée est accordée des saisies susmentionnées à compter du {{date_mainlevee}}.</p></div>`
  },
  {
    code: 'proc_rapport_cloture_collective',
    name: "Rapport de clôture de la procédure collective",
    category: 'juridique_admin', price: 12000, priceMax: 36000,
    description: "Rapport final du syndic résumant le déroulement et les résultats de la procédure collective OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 53,
    fieldsJson: F([
      {key:'syndic',label:"Syndic",type:'text',required:true},
      {key:'debiteur',label:"Débiteur",type:'text',required:true},
      {key:'bilan_procedure',label:"Bilan de la procédure",type:'textarea',required:true},
      {key:'total_recouvre',label:"Total recouvré (FCFA)",type:'text',required:true},
      {key:'date_cloture',label:"Date de clôture",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CLÔTURE DE PROCÉDURE COLLECTIVE</h1><p><strong>Syndic :</strong> {{syndic}}</p><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>Date de clôture :</strong> {{date_cloture}}</p><h3>BILAN DE LA PROCÉDURE</h3><p>{{bilan_procedure}}</p><p><strong>Total recouvré et réparti :</strong> {{total_recouvre}} FCFA</p><p>Le syndic certifie avoir accompli sa mission conformément aux dispositions de l'AUPC révisé et dépose le présent rapport au greffe du tribunal compétent.</p></div>`
  },
  {
    code: 'proc_accord_rehabilitation',
    name: "Accord de réhabilitation du débiteur",
    category: 'juridique_admin', price: 7000, priceMax: 21000,
    description: "Acte constatant la réhabilitation du débiteur après exécution complète de ses engagements dans la procédure collective.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 45,
    fieldsJson: F([
      {key:'debiteur',label:"Débiteur réhabilité",type:'text',required:true},
      {key:'tribunal',label:"Tribunal ayant prononcé la réhabilitation",type:'text',required:true},
      {key:'date_rehabilitation',label:"Date de réhabilitation",type:'date',required:true},
      {key:'reference_jugement',label:"Référence du jugement de clôture",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE RÉHABILITATION DU DÉBITEUR</h1><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>Tribunal :</strong> {{tribunal}}</p><p><strong>Référence jugement :</strong> {{reference_jugement}}</p><p>Le débiteur ayant satisfait à l'ensemble de ses obligations issues de la procédure collective, et conformément aux dispositions de l'AUPC révisé, il est prononcé sa réhabilitation avec toutes les conséquences de droit attachées.</p><p>Date d'effet : {{date_rehabilitation}}</p></div>`
  },
  {
    code: 'proc_plan_apurement_passif',
    name: "Plan d'apurement du passif",
    category: 'juridique_admin', price: 13000, priceMax: 39000,
    description: "Plan détaillé d'apurement du passif d'une entreprise en difficulté, avec échéancier et modalités de remboursement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'debiteur',label:"Débiteur",type:'text',required:true},
      {key:'passif_total',label:"Passif total (FCFA)",type:'text',required:true},
      {key:'echeancier_apurement',label:"Échéancier d'apurement",type:'textarea',required:true},
      {key:'garanties',label:"Garanties offertes",type:'textarea',required:false},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN D'APUREMENT DU PASSIF</h1><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>Passif total :</strong> {{passif_total}} FCFA</p><h3>ÉCHÉANCIER D'APUREMENT</h3><p>{{echeancier_apurement}}</p><h3>GARANTIES OFFERTES</h3><p>{{garanties}}</p><p>Le présent plan est soumis à l'approbation de l'assemblée concordataire et à l'homologation du tribunal. Adopté le {{date_adoption}}.</p></div>`
  },
  {
    code: 'proc_rapport_performance_redressement',
    name: "Rapport de performance du redressement",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Rapport périodique évaluant l'exécution du plan de redressement et les indicateurs de performance de l'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'syndic',label:"Syndic/Commissaire à l'exécution",type:'text',required:true},
      {key:'periode',label:"Période évaluée",type:'text',required:true},
      {key:'indicateurs',label:"Indicateurs de performance",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE DU REDRESSEMENT</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Commissaire :</strong> {{syndic}}</p><p><strong>Période :</strong> {{periode}}</p><p><strong>Date :</strong> {{date_rapport}}</p><h3>INDICATEURS DE PERFORMANCE</h3><p>{{indicateurs}}</p><p>Le présent rapport est déposé au greffe du tribunal compétent conformément aux dispositions régissant l'exécution du plan de redressement.</p></div>`
  },
  {
    code: 'proc_protocole_vente_actifs',
    name: "Protocole de vente des actifs (liquidation)",
    category: 'juridique_admin', price: 14000, priceMax: 42000,
    description: "Protocole organisant la vente des actifs d'une entreprise en liquidation des biens OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'syndic',label:"Syndic liquidateur",type:'text',required:true},
      {key:'actifs',label:"Description des actifs à vendre",type:'textarea',required:true},
      {key:'mode_vente',label:"Mode de vente (gré à gré / enchères)",type:'text',required:true},
      {key:'prix_reserve',label:"Prix de réserve total (FCFA)",type:'text',required:true},
      {key:'date_vente',label:"Date prévue de la vente",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROTOCOLE DE VENTE DES ACTIFS</h1><p><strong>Syndic liquidateur :</strong> {{syndic}}</p><p><strong>Mode de vente :</strong> {{mode_vente}}</p><p><strong>Prix de réserve :</strong> {{prix_reserve}} FCFA</p><h3>ACTIFS MIS EN VENTE</h3><p>{{actifs}}</p><p>La vente sera réalisée sous le contrôle du tribunal compétent le {{date_vente}}, conformément aux règles de la liquidation des biens prévues par l'AUPC révisé.</p></div>`
  },
  {
    code: 'proc_accord_continuation_repreneur',
    name: "Accord de continuation par repreneur",
    category: 'juridique_admin', price: 16000, priceMax: 48000,
    description: "Accord organisant la reprise de l'activité d'une entreprise en redressement judiciaire par un tiers repreneur.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'debiteur',label:"Entreprise reprise",type:'text',required:true},
      {key:'repreneur',label:"Nom du repreneur",type:'text',required:true},
      {key:'actifs_repris',label:"Actifs et activités repris",type:'textarea',required:true},
      {key:'prix_reprise',label:"Prix de reprise (FCFA)",type:'text',required:true},
      {key:'emplois_maintenus',label:"Nombre d'emplois maintenus",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONTINUATION PAR REPRENEUR</h1><p><strong>Entreprise reprise :</strong> {{debiteur}}</p><p><strong>Repreneur :</strong> {{repreneur}}</p><p><strong>Prix de reprise :</strong> {{prix_reprise}} FCFA</p><p><strong>Emplois maintenus :</strong> {{emplois_maintenus}}</p><h3>ÉLÉMENTS REPRIS</h3><p>{{actifs_repris}}</p><p>Le présent accord, homologué par le tribunal, prend effet le {{date_prise_effet}}. Le repreneur s'engage à maintenir l'activité et les emplois convenus pendant la durée stipulée dans le plan.</p></div>`
  },
  {
    code: 'proc_declaration_cessation_paiements',
    name: "Déclaration de cessation des paiements",
    category: 'juridique_admin', price: 6000, priceMax: 18000,
    description: "Déclaration formelle de cessation des paiements déposée par le débiteur auprès du tribunal compétent.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'debiteur',label:"Dénomination sociale",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'date_cessation',label:"Date de cessation des paiements",type:'date',required:true},
      {key:'actif_disponible',label:"Actif disponible (FCFA)",type:'text',required:true},
      {key:'passif_exigible',label:"Passif exigible (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>DÉCLARATION DE CESSATION DES PAIEMENTS</h1><p><strong>Débiteur :</strong> {{debiteur}}</p><p><strong>Représentant légal :</strong> {{representant}}</p><p>Je soussigné(e), représentant légal de {{debiteur}}, déclare que la société se trouve en état de cessation des paiements depuis le {{date_cessation}}.</p><p><strong>Actif disponible :</strong> {{actif_disponible}} FCFA</p><p><strong>Passif exigible :</strong> {{passif_exigible}} FCFA</p><p>Conformément à l'article 25 de l'AUPC révisé, cette déclaration est déposée dans le délai légal de trente (30) jours suivant la cessation des paiements.</p><p>Signature : ___________________</p></div>`
  },
  {
    code: 'proc_charte_mandataire_justice',
    name: "Charte de conduite du mandataire de justice",
    category: 'juridique_admin', price: 8000, priceMax: 24000,
    description: "Charte déontologique et opérationnelle encadrant la mission du mandataire de justice dans une procédure collective OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 42,
    fieldsJson: F([
      {key:'mandataire',label:"Nom du mandataire de justice",type:'text',required:true},
      {key:'qualification',label:"Qualité (syndic / administrateur / liquidateur)",type:'text',required:true},
      {key:'procedure',label:"Procédure concernée",type:'text',required:true},
      {key:'date_nomination',label:"Date de nomination",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE CONDUITE DU MANDATAIRE DE JUSTICE</h1><p><strong>Mandataire :</strong> {{mandataire}}</p><p><strong>Qualité :</strong> {{qualification}}</p><p><strong>Procédure :</strong> {{procedure}}</p><p><strong>Date de nomination :</strong> {{date_nomination}}</p><h3>PRINCIPES DIRECTEURS</h3><p>1. Indépendance et impartialité dans l'exercice de la mission.</p><p>2. Diligence et célérité dans la conduite des opérations.</p><p>3. Transparence dans la reddition des comptes.</p><p>4. Respect des droits des créanciers et du débiteur.</p><p>5. Conformité aux dispositions de l'AUPC révisé et aux règles de l'Espace OHADA.</p><p>Le mandataire s'engage à respecter la présente charte sous sa responsabilité professionnelle.</p></div>`
  },

  // ── 25 Gestion de crise / Retournement ────────────────────────────────────
  {
    code: 'crise_plan_retournement',
    name: "Plan de retournement (turnaround plan)",
    category: 'commercial_financier', price: 20000, priceMax: 60000,
    description: "Plan stratégique de retournement d'une entreprise en difficulté, couvrant diagnostic, mesures d'urgence et vision à moyen terme.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'dirigeant',label:"Nom du dirigeant",type:'text',required:true},
      {key:'diagnostic',label:"Diagnostic de la situation",type:'textarea',required:true},
      {key:'mesures_urgence',label:"Mesures d'urgence",type:'textarea',required:true},
      {key:'horizon_retour',label:"Horizon de retour à l'équilibre",type:'text',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE RETOURNEMENT</h1><h2>{{entreprise}}</h2><p><strong>Dirigeant :</strong> {{dirigeant}} — <strong>Date :</strong> {{date_plan}}</p><h3>1. DIAGNOSTIC</h3><p>{{diagnostic}}</p><h3>2. MESURES D'URGENCE</h3><p>{{mesures_urgence}}</p><h3>3. HORIZON DE RETOUR À L'ÉQUILIBRE</h3><p>{{horizon_retour}}</p><p>Le présent plan engage la direction et sera soumis à l'approbation des parties prenantes (actionnaires, banquiers, créanciers stratégiques).</p></div>`
  },
  {
    code: 'crise_accord_administrateur_crise',
    name: "Accord de mission d'administrateur de crise",
    category: 'commercial_financier', price: 15000, priceMax: 45000,
    description: "Convention définissant la mission, les pouvoirs et la rémunération d'un administrateur de crise nommé par les actionnaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise mandante",type:'text',required:true},
      {key:'administrateur',label:"Nom de l'administrateur de crise",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission (mois)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires mensuels (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISSION D'ADMINISTRATEUR DE CRISE</h1><p><strong>Mandante :</strong> {{entreprise}}</p><p><strong>Administrateur :</strong> {{administrateur}}</p><p><strong>Durée :</strong> {{duree_mission}} mois à compter du {{date_debut}}</p><p><strong>Honoraires :</strong> {{honoraires}} FCFA/mois</p><h3>MISSION</h3><p>L'administrateur est chargé de la gestion opérationnelle de crise, de la mise en oeuvre du plan de retournement et de la représentation de l'entreprise auprès de ses créanciers et partenaires.</p><p>Signé le {{date_debut}}</p></div>`
  },
  {
    code: 'crise_rapport_diagnostic',
    name: "Rapport de diagnostic de crise",
    category: 'commercial_financier', price: 18000, priceMax: 54000,
    description: "Rapport d'audit opérationnel et financier établi en situation de crise pour identifier les causes et proposer des solutions.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise auditée",type:'text',required:true},
      {key:'auditeur',label:"Cabinet ou auditeur",type:'text',required:true},
      {key:'causes_crise',label:"Causes identifiées de la crise",type:'textarea',required:true},
      {key:'recommandations',label:"Recommandations prioritaires",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE DIAGNOSTIC DE CRISE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Auditeur :</strong> {{auditeur}}</p><p><strong>Date :</strong> {{date_rapport}}</p><h3>CAUSES DE LA CRISE</h3><p>{{causes_crise}}</p><h3>RECOMMANDATIONS</h3><p>{{recommandations}}</p><p>Le présent diagnostic est confidentiel et destiné exclusivement aux organes de direction et aux partenaires financiers de l'entreprise.</p></div>`
  },
  {
    code: 'crise_plan_reduction_couts',
    name: "Plan de réduction urgente des coûts",
    category: 'commercial_financier', price: 12000, priceMax: 36000,
    description: "Plan opérationnel de réduction immédiate des charges fixes et variables pour restaurer la trésorerie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'economies_ciblees',label:"Économies cibles (FCFA/mois)",type:'text',required:true},
      {key:'postes_reduction',label:"Postes de réduction des coûts",type:'textarea',required:true},
      {key:'calendrier',label:"Calendrier de mise en oeuvre",type:'textarea',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE RÉDUCTION URGENTE DES COÛTS</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Date :</strong> {{date_plan}}</p><p><strong>Économies mensuelles cibles :</strong> {{economies_ciblees}} FCFA</p><h3>POSTES DE RÉDUCTION</h3><p>{{postes_reduction}}</p><h3>CALENDRIER</h3><p>{{calendrier}}</p><p>Ce plan est d'application immédiate et fera l'objet d'un suivi hebdomadaire par la direction générale.</p></div>`
  },
  {
    code: 'crise_accord_moratoire_bancaire',
    name: "Accord de moratoire bancaire",
    category: 'commercial_financier', price: 14000, priceMax: 42000,
    description: "Convention de moratoire négociée avec les banques créancières pour suspendre temporairement le service de la dette.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise débitrice",type:'text',required:true},
      {key:'banque',label:"Banque(s) créancière(s)",type:'text',required:true},
      {key:'montant_dette',label:"Montant de la dette concernée (FCFA)",type:'text',required:true},
      {key:'duree_moratoire',label:"Durée du moratoire (mois)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'conditions',label:"Conditions du moratoire",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MORATOIRE BANCAIRE</h1><p><strong>Débiteur :</strong> {{entreprise}}</p><p><strong>Banque(s) :</strong> {{banque}}</p><p><strong>Montant concerné :</strong> {{montant_dette}} FCFA</p><p><strong>Durée du moratoire :</strong> {{duree_moratoire}} mois</p><p><strong>Date :</strong> {{date_accord}}</p><h3>CONDITIONS</h3><p>{{conditions}}</p><p>Pendant la durée du moratoire, la banque s'abstient d'exercer toute poursuite sur les créances visées. L'entreprise s'engage à respecter les conditions annexes et à communiquer mensuellement ses états financiers.</p></div>`
  },
  {
    code: 'crise_accord_reneg_dette_fournisseur',
    name: "Accord de renégociation dette fournisseur",
    category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Accord bilatéral de renégociation de la dette commerciale auprès d'un fournisseur stratégique en période de crise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise débitrice",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur créancier",type:'text',required:true},
      {key:'montant_dette',label:"Montant de la dette (FCFA)",type:'text',required:true},
      {key:'nouvelles_modalites',label:"Nouvelles modalités de paiement",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RENÉGOCIATION DETTE FOURNISSEUR</h1><p><strong>Débiteur :</strong> {{entreprise}}</p><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>Dette renégociée :</strong> {{montant_dette}} FCFA</p><h3>NOUVELLES MODALITÉS</h3><p>{{nouvelles_modalites}}</p><p>Le fournisseur accepte les nouvelles conditions de règlement et s'engage à maintenir ses livraisons selon les termes commerciaux habituels pendant la durée de l'accord. Signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'crise_accord_plan_social_urgence',
    name: "Accord de plan social d'urgence",
    category: 'commercial_financier', price: 16000, priceMax: 48000,
    description: "Accord collectif organisant les mesures sociales d'urgence (licenciements économiques, préretraites, formation) en situation de crise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'entreprise',label:"Nom de l'entreprise",type:'text',required:true},
      {key:'representants_salaries',label:"Représentants des salariés",type:'text',required:true},
      {key:'postes_supprimes',label:"Nombre de postes supprimés",type:'text',required:true},
      {key:'mesures_accompagnement',label:"Mesures d'accompagnement",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PLAN SOCIAL D'URGENCE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Représentants des salariés :</strong> {{representants_salaries}}</p><p><strong>Postes supprimés :</strong> {{postes_supprimes}}</p><h3>MESURES D'ACCOMPAGNEMENT</h3><p>{{mesures_accompagnement}}</p><p>Le présent accord est conclu dans le respect des dispositions du Code du Travail en vigueur et après consultation des représentants du personnel. Il entre en vigueur à compter du {{date_signature}}.</p></div>`
  },
  {
    code: 'crise_accord_cession_carveout',
    name: "Accord de cession d'activité non stratégique (carve-out)",
    category: 'commercial_financier', price: 20000, priceMax: 60000,
    description: "Convention organisant la cession d'une activité ou d'une entité non stratégique afin de renforcer la trésorerie du groupe.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'cedant',label:"Cédant",type:'text',required:true},
      {key:'cessionnaire',label:"Cessionnaire",type:'text',required:true},
      {key:'activite_cedee',label:"Activité/entité cédée",type:'text',required:true},
      {key:'prix_cession',label:"Prix de cession (FCFA)",type:'text',required:true},
      {key:'date_realisation',label:"Date de réalisation",type:'date',required:true},
      {key:'conditions_suspensives',label:"Conditions suspensives",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION D'ACTIVITÉ NON STRATÉGIQUE</h1><p><strong>Cédant :</strong> {{cedant}}</p><p><strong>Cessionnaire :</strong> {{cessionnaire}}</p><p><strong>Activité cédée :</strong> {{activite_cedee}}</p><p><strong>Prix :</strong> {{prix_cession}} FCFA</p><h3>CONDITIONS SUSPENSIVES</h3><p>{{conditions_suspensives}}</p><p>La cession sera réalisée le {{date_realisation}} sous réserve de la levée des conditions suspensives et de l'obtention des autorisations réglementaires nécessaires.</p></div>`
  },
  {
    code: 'crise_contrat_manager_transition',
    name: "Contrat de manager de transition",
    category: 'commercial_financier', price: 15000, priceMax: 45000,
    description: "Contrat de prestation encadrant la mission d'un manager de transition chargé de piloter le redressement opérationnel.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise cliente",type:'text',required:true},
      {key:'manager',label:"Manager de transition",type:'text',required:true},
      {key:'mission',label:"Périmètre de la mission",type:'textarea',required:true},
      {key:'taux_journalier',label:"Taux journalier (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'duree_contrat',label:"Durée estimée du contrat (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MANAGER DE TRANSITION</h1><p><strong>Client :</strong> {{entreprise}}</p><p><strong>Manager :</strong> {{manager}}</p><p><strong>Durée :</strong> {{duree_contrat}} mois — <strong>Début :</strong> {{date_debut}}</p><p><strong>Taux journalier :</strong> {{taux_journalier}} FCFA</p><h3>PÉRIMÈTRE DE MISSION</h3><p>{{mission}}</p><p>Le manager de transition intervient en tant que prestataire indépendant et ne saurait être requalifié en contrat de travail. Il rend compte directement au conseil d'administration.</p></div>`
  },
  {
    code: 'crise_accord_refinancement_urgence',
    name: "Accord de refinancement d'urgence",
    category: 'commercial_financier', price: 18000, priceMax: 54000,
    description: "Convention de refinancement d'urgence permettant à l'entreprise d'obtenir des liquidités pour faire face à ses obligations immédiates.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'emprunteur',label:"Emprunteur",type:'text',required:true},
      {key:'preteur',label:"Prêteur",type:'text',required:true},
      {key:'montant_credit',label:"Montant du crédit (FCFA)",type:'text',required:true},
      {key:'taux_interet',label:"Taux d'intérêt annuel (%)",type:'text',required:true},
      {key:'duree_credit',label:"Durée du crédit (mois)",type:'text',required:true},
      {key:'date_decaissement',label:"Date de décaissement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE REFINANCEMENT D'URGENCE</h1><p><strong>Emprunteur :</strong> {{emprunteur}}</p><p><strong>Prêteur :</strong> {{preteur}}</p><p><strong>Montant :</strong> {{montant_credit}} FCFA</p><p><strong>Taux :</strong> {{taux_interet}}% l'an</p><p><strong>Durée :</strong> {{duree_credit}} mois</p><p><strong>Décaissement :</strong> {{date_decaissement}}</p><p>Le présent crédit est accordé à titre de financement d'urgence et devra être remboursé selon l'échéancier annexé. Des garanties réelles ou personnelles pourront être exigées par le prêteur.</p></div>`
  },
  {
    code: 'crise_plan_communication_crise',
    name: "Plan de communication de crise",
    category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Plan structurant la communication externe de l'entreprise en situation de crise vis-à-vis des médias, clients et partenaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'nature_crise',label:"Nature de la crise",type:'text',required:true},
      {key:'messages_cles',label:"Messages clés à communiquer",type:'textarea',required:true},
      {key:'cibles',label:"Parties prenantes ciblées",type:'textarea',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE COMMUNICATION DE CRISE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Nature de la crise :</strong> {{nature_crise}}</p><p><strong>Date :</strong> {{date_plan}}</p><h3>MESSAGES CLÉS</h3><p>{{messages_cles}}</p><h3>PARTIES PRENANTES CIBLÉES</h3><p>{{cibles}}</p><p>Ce plan est activé dès l'entrée en crise et sera actualisé toutes les 48 heures par le comité de crise. Toute communication externe doit être validée par la direction générale.</p></div>`
  },
  {
    code: 'crise_accord_gel_dettes_fiscales',
    name: "Accord de gel des dettes fiscales (délai DGI)",
    category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Convention de délai de paiement négociée avec la Direction Générale des Impôts pour le gel temporaire des dettes fiscales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'contribuable',label:"Contribuable",type:'text',required:true},
      {key:'montant_dette_fiscale',label:"Montant de la dette fiscale (FCFA)",type:'text',required:true},
      {key:'duree_gel',label:"Durée du gel (mois)",type:'text',required:true},
      {key:'echeancier_fiscal',label:"Échéancier de règlement proposé",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉLAI DE PAIEMENT — DGI</h1><p><strong>Contribuable :</strong> {{contribuable}}</p><p><strong>Dette fiscale totale :</strong> {{montant_dette_fiscale}} FCFA</p><p><strong>Durée du gel :</strong> {{duree_gel}} mois</p><h3>ÉCHÉANCIER PROPOSÉ</h3><p>{{echeancier_fiscal}}</p><p>Le contribuable s'engage à respecter scrupuleusement cet échéancier. Tout défaut de paiement entraînera la déchéance du terme et le recouvrement forcé de la totalité de la dette. Signé le {{date_accord}}.</p></div>`
  },
  {
    code: 'crise_rapport_tresorerie_crise',
    name: "Rapport de gestion de la trésorerie de crise",
    category: 'commercial_financier', price: 10000, priceMax: 30000,
    description: "Rapport hebdomadaire ou mensuel de suivi de la trésorerie en situation de crise, avec prévisions de flux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'responsable_finance',label:"Directeur financier",type:'text',required:true},
      {key:'periode',label:"Période de reporting",type:'text',required:true},
      {key:'solde_ouverture',label:"Solde d'ouverture (FCFA)",type:'text',required:true},
      {key:'flux_prevus',label:"Flux prévisionnels (encaissements/décaissements)",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE TRÉSORERIE DE CRISE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>DAF :</strong> {{responsable_finance}}</p><p><strong>Période :</strong> {{periode}}</p><p><strong>Solde d'ouverture :</strong> {{solde_ouverture}} FCFA</p><h3>FLUX PRÉVISIONNELS</h3><p>{{flux_prevus}}</p><p>Ce rapport est produit le {{date_rapport}} et soumis quotidiennement au comité de crise. Toute déviation significative sera signalée en temps réel.</p></div>`
  },
  {
    code: 'crise_accord_mise_sommeil',
    name: "Accord de mise en sommeil temporaire d'activité",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Accord organisant la suspension temporaire d'une activité ou d'une entité dans le cadre d'une restructuration de crise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'activite_suspendue',label:"Activité suspendue",type:'text',required:true},
      {key:'duree_sommeil',label:"Durée de la mise en sommeil (mois)",type:'text',required:true},
      {key:'conditions_reactivation',label:"Conditions de réactivation",type:'textarea',required:false},
      {key:'date_effet',label:"Date d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISE EN SOMMEIL TEMPORAIRE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Activité concernée :</strong> {{activite_suspendue}}</p><p><strong>Durée :</strong> {{duree_sommeil}} mois à compter du {{date_effet}}</p><h3>CONDITIONS DE RÉACTIVATION</h3><p>{{conditions_reactivation}}</p><p>La mise en sommeil ne constitue pas une cessation définitive d'activité. L'entreprise conserve ses obligations légales et réglementaires en matière de déclarations périodiques.</p></div>`
  },
  {
    code: 'crise_accord_fermeture_site',
    name: "Accord de fermeture de site industriel",
    category: 'commercial_financier', price: 16000, priceMax: 48000,
    description: "Accord encadrant la fermeture d'un site industriel dans un contexte de restructuration ou de crise économique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'site',label:"Localisation du site",type:'text',required:true},
      {key:'date_fermeture',label:"Date de fermeture prévue",type:'date',required:true},
      {key:'salaries_concernes',label:"Nombre de salariés concernés",type:'text',required:true},
      {key:'mesures_sociales',label:"Mesures sociales d'accompagnement",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FERMETURE DE SITE INDUSTRIEL</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Site :</strong> {{site}}</p><p><strong>Date de fermeture :</strong> {{date_fermeture}}</p><p><strong>Salariés concernés :</strong> {{salaries_concernes}}</p><h3>MESURES SOCIALES</h3><p>{{mesures_sociales}}</p><p>La fermeture sera réalisée dans le respect des dispositions du Code du Travail et après information et consultation des représentants du personnel. Un accompagnement individualisé sera proposé à chaque salarié.</p></div>`
  },
  {
    code: 'crise_rapport_performance_retournement',
    name: "Rapport de performance après retournement",
    category: 'commercial_financier', price: 12000, priceMax: 36000,
    description: "Rapport bilan évaluant les résultats obtenus après exécution du plan de retournement de l'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'periode_retournement',label:"Période de retournement",type:'text',required:true},
      {key:'objectifs_atteints',label:"Objectifs atteints",type:'textarea',required:true},
      {key:'ecarts',label:"Écarts et explications",type:'textarea',required:false},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE POST-RETOURNEMENT</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Période :</strong> {{periode_retournement}}</p><p><strong>Date :</strong> {{date_rapport}}</p><h3>OBJECTIFS ATTEINTS</h3><p>{{objectifs_atteints}}</p><h3>ÉCARTS ET ANALYSES</h3><p>{{ecarts}}</p><p>Ce rapport est soumis au conseil d'administration et aux actionnaires pour validation de la sortie formelle de la phase de crise.</p></div>`
  },
  {
    code: 'crise_plan_relance_post_crise',
    name: "Plan de relance post-crise",
    category: 'commercial_financier', price: 15000, priceMax: 45000,
    description: "Plan stratégique et opérationnel de relance de l'entreprise après sortie de crise, avec objectifs de croissance à court et moyen terme.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'axes_relance',label:"Axes stratégiques de relance",type:'textarea',required:true},
      {key:'investissements',label:"Investissements prévus (FCFA)",type:'text',required:true},
      {key:'objectifs_ca',label:"Objectifs de chiffre d'affaires",type:'text',required:true},
      {key:'horizon',label:"Horizon du plan (années)",type:'text',required:true},
      {key:'date_plan',label:"Date du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE RELANCE POST-CRISE</h1><h2>{{entreprise}}</h2><p><strong>Horizon :</strong> {{horizon}} ans — <strong>Date :</strong> {{date_plan}}</p><h3>AXES STRATÉGIQUES</h3><p>{{axes_relance}}</p><p><strong>Investissements prévus :</strong> {{investissements}} FCFA</p><p><strong>Objectifs CA :</strong> {{objectifs_ca}}</p><p>Ce plan de relance marque la sortie officielle de la phase de crise et le début d'un nouveau cycle de développement pour l'entreprise.</p></div>`
  },
  {
    code: 'crise_accord_revue_actifs',
    name: "Accord de revue stratégique actifs",
    category: 'commercial_financier', price: 13000, priceMax: 39000,
    description: "Accord mandatant un conseil ou un auditeur pour conduire une revue stratégique du portefeuille d'actifs en vue d'une restructuration.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'mandant',label:"Entreprise mandante",type:'text',required:true},
      {key:'conseil',label:"Conseil mandaté",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de la revue",type:'textarea',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
      {key:'date_remise',label:"Date de remise du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE REVUE STRATÉGIQUE DES ACTIFS</h1><p><strong>Mandant :</strong> {{mandant}}</p><p><strong>Conseil :</strong> {{conseil}}</p><p><strong>Honoraires :</strong> {{honoraires}} FCFA</p><h3>PÉRIMÈTRE</h3><p>{{perimetre}}</p><p>Le conseil remettra ses conclusions et recommandations au plus tard le {{date_remise}}. Ses travaux sont couverts par une obligation de confidentialité absolue.</p></div>`
  },
  {
    code: 'crise_accord_cession_filiale',
    name: "Accord de cession de filiale en difficulté",
    category: 'commercial_financier', price: 20000, priceMax: 60000,
    description: "Convention de cession d'une filiale en difficulté financière à un repreneur tiers, dans le cadre d'une restructuration de groupe.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'cedant',label:"Société cédante (maison mère)",type:'text',required:true},
      {key:'filiale',label:"Filiale cédée",type:'text',required:true},
      {key:'cessionnaire',label:"Cessionnaire",type:'text',required:true},
      {key:'prix',label:"Prix de cession (FCFA)",type:'text',required:true},
      {key:'date_realisation',label:"Date de réalisation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE FILIALE EN DIFFICULTÉ</h1><p><strong>Cédant :</strong> {{cedant}}</p><p><strong>Filiale :</strong> {{filiale}}</p><p><strong>Cessionnaire :</strong> {{cessionnaire}}</p><p><strong>Prix :</strong> {{prix}} FCFA</p><p>La cession porte sur l'intégralité des titres de la filiale, libre de tout nantissement. Elle sera réalisée le {{date_realisation}} après obtention des autorisations requises et levée des conditions suspensives.</p></div>`
  },
  {
    code: 'crise_plan_reduction_masse_salariale',
    name: "Plan de réduction de la masse salariale",
    category: 'commercial_financier', price: 14000, priceMax: 42000,
    description: "Plan structuré de réduction de la masse salariale en situation de crise, incluant les mesures de gel, réduction et suppression de postes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'masse_salariale_actuelle',label:"Masse salariale actuelle (FCFA/mois)",type:'text',required:true},
      {key:'objectif_reduction',label:"Objectif de réduction (%)",type:'text',required:true},
      {key:'mesures',label:"Mesures de réduction prévues",type:'textarea',required:true},
      {key:'date_application',label:"Date d'application",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE RÉDUCTION DE LA MASSE SALARIALE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Masse salariale actuelle :</strong> {{masse_salariale_actuelle}} FCFA/mois</p><p><strong>Objectif de réduction :</strong> {{objectif_reduction}}%</p><h3>MESURES PRÉVUES</h3><p>{{mesures}}</p><p>Ce plan est mis en oeuvre dans le respect du droit du travail applicable et après information des représentants du personnel. Entrée en vigueur : {{date_application}}.</p></div>`
  },
  {
    code: 'crise_accord_pdv',
    name: "Accord de plan de départs volontaires (PDV)",
    category: 'commercial_financier', price: 14000, priceMax: 42000,
    description: "Accord collectif organisant un plan de départs volontaires pour réduire les effectifs sans licenciements contraints.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'nombre_departs',label:"Nombre de départs ciblés",type:'text',required:true},
      {key:'indemnites_supra',label:"Indemnités supra-légales (FCFA)",type:'text',required:true},
      {key:'date_ouverture',label:"Date d'ouverture du plan",type:'date',required:true},
      {key:'conditions_eligibilite',label:"Conditions d'éligibilité",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PLAN DE DÉPARTS VOLONTAIRES</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Départs ciblés :</strong> {{nombre_departs}}</p><p><strong>Indemnités supra-légales :</strong> {{indemnites_supra}} FCFA par départ</p><p><strong>Ouverture du plan :</strong> {{date_ouverture}}</p><h3>CONDITIONS D'ÉLIGIBILITÉ</h3><p>{{conditions_eligibilite}}</p><p>Le présent accord est conclu sur la base du volontariat exclusif des salariés. Aucun salarié ne saurait être contraint à solliciter son départ.</p></div>`
  },
  {
    code: 'crise_accord_preretraite_urgence',
    name: "Accord de préretraite d'urgence",
    category: 'commercial_financier', price: 12000, priceMax: 36000,
    description: "Accord organisant des départs anticipés en préretraite dans un contexte de restructuration d'urgence.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 50,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'salaries_concernes',label:"Salariés concernés (critères d'âge)",type:'text',required:true},
      {key:'complement_retraite',label:"Complément de retraite versé (FCFA/mois)",type:'text',required:true},
      {key:'date_effet',label:"Date d'effet des départs",type:'date',required:true},
      {key:'conditions',label:"Conditions et modalités",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÉRETRAITE D'URGENCE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Salariés éligibles :</strong> {{salaries_concernes}}</p><p><strong>Complément mensuel :</strong> {{complement_retraite}} FCFA</p><p><strong>Date d'effet :</strong> {{date_effet}}</p><h3>CONDITIONS ET MODALITÉS</h3><p>{{conditions}}</p><p>Le présent accord est conclu en conformité avec la réglementation nationale relative à la retraite et ne peut être remis en cause par l'employeur une fois signé.</p></div>`
  },
  {
    code: 'crise_accord_chomage_technique',
    name: "Accord de mise en chômage technique",
    category: 'commercial_financier', price: 8000, priceMax: 24000,
    description: "Convention organisant la mise en chômage technique (activité partielle) des salariés en période de crise économique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'salaries_concernes',label:"Salariés concernés",type:'text',required:true},
      {key:'duree_chomage',label:"Durée du chômage technique (semaines)",type:'text',required:true},
      {key:'taux_maintien_salaire',label:"Taux de maintien du salaire (%)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MISE EN CHÔMAGE TECHNIQUE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Salariés concernés :</strong> {{salaries_concernes}}</p><p><strong>Durée :</strong> {{duree_chomage}} semaines à compter du {{date_debut}}</p><p><strong>Maintien de salaire :</strong> {{taux_maintien_salaire}}%</p><p>La mise en chômage technique est notifiée à l'Inspection du Travail conformément aux dispositions du Code du Travail. L'employeur s'engage à rappeler les salariés dès la reprise de l'activité normale.</p></div>`
  },
  {
    code: 'crise_plan_communication_interne',
    name: "Plan de communication interne de crise sociale",
    category: 'commercial_financier', price: 9000, priceMax: 27000,
    description: "Plan structurant la communication interne de l'entreprise vers ses salariés en période de crise sociale ou économique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'nature_crise',label:"Nature de la crise sociale",type:'text',required:true},
      {key:'messages_direction',label:"Messages de la direction",type:'textarea',required:true},
      {key:'calendrier_reunions',label:"Calendrier des réunions d'information",type:'textarea',required:true},
      {key:'date_premiere_communication',label:"Date de première communication",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE COMMUNICATION INTERNE DE CRISE SOCIALE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Nature de la crise :</strong> {{nature_crise}}</p><p><strong>Première communication :</strong> {{date_premiere_communication}}</p><h3>MESSAGES DE LA DIRECTION</h3><p>{{messages_direction}}</p><h3>CALENDRIER DES RÉUNIONS</h3><p>{{calendrier_reunions}}</p><p>La communication interne est pilotée par la DRH en lien direct avec la Direction Générale. Toute information non validée est susceptible d'être démentie officiellement.</p></div>`
  },
  {
    code: 'crise_charte_gestion_responsable',
    name: "Charte de gestion responsable de la crise",
    category: 'commercial_financier', price: 7000, priceMax: 21000,
    description: "Charte énonçant les principes de gouvernance responsable et éthique que la direction s'engage à respecter pendant la gestion de la crise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 48,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise",type:'text',required:true},
      {key:'president',label:"Président-directeur général",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption",type:'date',required:true},
      {key:'engagements',label:"Engagements de gouvernance responsable",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE GESTION RESPONSABLE DE LA CRISE</h1><p><strong>Entreprise :</strong> {{entreprise}}</p><p><strong>Signataire :</strong> {{president}}</p><p><strong>Date d'adoption :</strong> {{date_adoption}}</p><h3>ENGAGEMENTS</h3><p>{{engagements}}</p><h3>PRINCIPES DIRECTEURS</h3><p>1. Transparence vis-à-vis de toutes les parties prenantes.</p><p>2. Équité dans le traitement des salariés, créanciers et actionnaires.</p><p>3. Responsabilité sociale et environnementale maintenue même en période de crise.</p><p>4. Prise de décision collégiale et documentée.</p><p>5. Respect strict des obligations légales et réglementaires.</p><p>La direction s'engage sur l'honneur à respecter la présente charte tout au long de la période de crise.</p></div>`
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
  console.log(`Batch 53a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
