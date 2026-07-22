import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── PPP / CONCESSIONS (25) ──────────────────────────────────────────────────
  {
    code: 'ppp_partenariat_infrastructure',
    name: "Contrat de Partenariat Public-Privé (PPP) pour Infrastructure",
    category: 'juridique_admin', price: 25000, priceMax: 80000,
    description: "Contrat cadre de PPP pour la réalisation d'une infrastructure publique en Côte d'Ivoire, conforme au cadre OHADA et à la loi ivoirienne sur les PPP.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'autorite_contractante',label:"Autorité contractante (État/Collectivité)",type:'text',required:true},
      {key:'partenaire_prive',label:"Partenaire privé (dénomination sociale)",type:'text',required:true},
      {key:'objet_infrastructure',label:"Objet de l'infrastructure",type:'textarea',required:true},
      {key:'duree_contrat',label:"Durée du contrat (années)",type:'text',required:true},
      {key:'montant_investissement',label:"Montant total de l'investissement (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PARTENARIAT PUBLIC-PRIVÉ POUR INFRASTRUCTURE</h1><p><strong>Entre :</strong> {{autorite_contractante}}, ci-après dénommée l'Autorité Contractante,</p><p><strong>Et :</strong> {{partenaire_prive}}, ci-après dénommé le Partenaire Privé.</p><h2>Article 1 – Objet</h2><p>Le présent contrat a pour objet la réalisation de l'infrastructure suivante : {{objet_infrastructure}}</p><h2>Article 2 – Durée</h2><p>Le contrat est conclu pour une durée de {{duree_contrat}} ans à compter de la date de signature.</p><h2>Article 3 – Investissement</h2><p>Le montant total de l'investissement est fixé à {{montant_investissement}} FCFA.</p><h2>Article 4 – Loi applicable</h2><p>Le présent contrat est régi par la législation ivoirienne et le droit OHADA.</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'ppp_concession_eau',
    name: "Accord de Concession de Service Public – Eau Potable",
    category: 'juridique_admin', price: 20000, priceMax: 60000,
    description: "Convention de concession pour la production, le transport et la distribution d'eau potable à une collectivité ou un périmètre défini.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'autorite_concedante',label:"Autorité concédante",type:'text',required:true},
      {key:'concessionnaire',label:"Concessionnaire (société)",type:'text',required:true},
      {key:'perimetre_concession',label:"Périmètre géographique de la concession",type:'textarea',required:true},
      {key:'duree_annees',label:"Durée de la concession (années)",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCESSION DE SERVICE PUBLIC DE L'EAU POTABLE</h1><p><strong>Concédant :</strong> {{autorite_concedante}}</p><p><strong>Concessionnaire :</strong> {{concessionnaire}}</p><h2>Article 1 – Objet</h2><p>Le présent accord confère au Concessionnaire le droit exclusif d'assurer le service public de l'eau potable sur le périmètre suivant : {{perimetre_concession}}</p><h2>Article 2 – Durée</h2><p>La concession est accordée pour {{duree_annees}} ans à compter du {{date_prise_effet}}.</p><h2>Article 3 – Obligations du concessionnaire</h2><p>Le Concessionnaire s'engage à assurer la continuité, l'égalité d'accès et l'adaptabilité du service public de l'eau.</p><h2>Article 4 – Contrôle</h2><p>L'Autorité concédante exerce un contrôle permanent sur les conditions d'exécution du service.</p></div>`
  },
  {
    code: 'ppp_concession_electricite',
    name: "Accord de Concession de Service Public – Électricité",
    category: 'juridique_admin', price: 20000, priceMax: 65000,
    description: "Convention de concession pour la production, le transport et la distribution d'électricité, conforme à la réglementation sectorielle ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'ministere_tutelle',label:"Ministère de tutelle",type:'text',required:true},
      {key:'concessionnaire',label:"Concessionnaire (société)",type:'text',required:true},
      {key:'zone_desserte',label:"Zone de desserte",type:'textarea',required:true},
      {key:'puissance_installee',label:"Puissance installée (MW)",type:'text',required:true},
      {key:'duree_concession',label:"Durée de la concession (années)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCESSION DE SERVICE PUBLIC D'ÉLECTRICITÉ</h1><p><strong>Concédant :</strong> {{ministere_tutelle}}</p><p><strong>Concessionnaire :</strong> {{concessionnaire}}</p><h2>Article 1 – Objet</h2><p>La concession porte sur la production, le transport et la distribution d'électricité dans la zone : {{zone_desserte}}, pour une puissance installée de {{puissance_installee}} MW.</p><h2>Article 2 – Durée</h2><p>La concession est accordée pour {{duree_concession}} ans à compter du {{date_debut}}.</p><h2>Article 3 – Tarification</h2><p>Les tarifs sont fixés par l'Autorité de régulation et révisés périodiquement selon les modalités définies en annexe.</p><h2>Article 4 – Fin de concession</h2><p>À l'expiration, les actifs de la concession sont transférés à l'État sans indemnité.</p></div>`
  },
  {
    code: 'ppp_concession_routiere',
    name: "Contrat de Concession Routière (Péage)",
    category: 'juridique_admin', price: 22000, priceMax: 70000,
    description: "Contrat de concession pour la construction, l'exploitation et la maintenance d'une infrastructure routière à péage en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'etat_representant',label:"Représentant de l'État (Ministre)",type:'text',required:true},
      {key:'concessionnaire_route',label:"Concessionnaire routier",type:'text',required:true},
      {key:'troncon_routier',label:"Tronçon routier concerné",type:'textarea',required:true},
      {key:'longueur_km',label:"Longueur du tronçon (km)",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat (années)",type:'text',required:true},
      {key:'date_concession',label:"Date de la concession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONCESSION ROUTIÈRE À PÉAGE</h1><p><strong>Concédant :</strong> L'État de Côte d'Ivoire, représenté par {{etat_representant}}</p><p><strong>Concessionnaire :</strong> {{concessionnaire_route}}</p><h2>Article 1 – Objet</h2><p>Le présent contrat porte sur la construction, l'exploitation et la maintenance du tronçon routier : {{troncon_routier}}, d'une longueur de {{longueur_km}} km.</p><h2>Article 2 – Durée</h2><p>La concession est accordée pour {{duree_contrat}} ans à compter du {{date_concession}}.</p><h2>Article 3 – Péage</h2><p>Le Concessionnaire est autorisé à percevoir des redevances de péage selon le barème approuvé par l'État.</p><h2>Article 4 – Entretien</h2><p>Le Concessionnaire assure l'entretien permanent de l'infrastructure selon les normes techniques définies en annexe.</p></div>`
  },
  {
    code: 'ppp_bot_port',
    name: "Accord de BOT (Build-Operate-Transfer) – Port",
    category: 'juridique_admin', price: 28000, priceMax: 90000,
    description: "Accord BOT pour la construction, l'exploitation et le transfert d'une infrastructure portuaire, conforme aux pratiques internationales et au droit ivoirien.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'autorite_portuaire',label:"Autorité portuaire concédante",type:'text',required:true},
      {key:'operateur_bot',label:"Opérateur BOT (société)",type:'text',required:true},
      {key:'infrastructure_portuaire',label:"Infrastructure portuaire concernée",type:'textarea',required:true},
      {key:'duree_exploitation',label:"Durée d'exploitation avant transfert (années)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD BOT – BUILD-OPERATE-TRANSFER – INFRASTRUCTURE PORTUAIRE</h1><p><strong>Autorité concédante :</strong> {{autorite_portuaire}}</p><p><strong>Opérateur BOT :</strong> {{operateur_bot}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la construction, l'exploitation et le transfert de : {{infrastructure_portuaire}}</p><h2>Article 2 – Phases</h2><p><strong>Phase 1 – Construction :</strong> l'Opérateur finance et réalise l'infrastructure.</p><p><strong>Phase 2 – Exploitation :</strong> l'Opérateur exploite l'infrastructure pendant {{duree_exploitation}} ans.</p><p><strong>Phase 3 – Transfert :</strong> l'infrastructure est transférée à l'État en bon état de fonctionnement.</p><p>Fait le {{date_accord}}</p></div>`
  },
  {
    code: 'ppp_boo_centrale',
    name: "Accord de BOO (Build-Own-Operate) – Centrale Électrique",
    category: 'juridique_admin', price: 26000, priceMax: 85000,
    description: "Accord BOO pour la construction, la propriété et l'exploitation d'une centrale électrique par un opérateur privé en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'ministere_energie',label:"Ministère de l'Énergie",type:'text',required:true},
      {key:'investisseur_boo',label:"Investisseur/Producteur indépendant (IPP)",type:'text',required:true},
      {key:'type_centrale',label:"Type et capacité de la centrale",type:'textarea',required:true},
      {key:'site_implantation',label:"Site d'implantation",type:'text',required:true},
      {key:'duree_ppa',label:"Durée du contrat PPA (années)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD BOO – BUILD-OWN-OPERATE – CENTRALE ÉLECTRIQUE</h1><p><strong>État représenté par :</strong> {{ministere_energie}}</p><p><strong>Producteur Indépendant (IPP) :</strong> {{investisseur_boo}}</p><h2>Article 1 – Objet</h2><p>L'IPP s'engage à construire, posséder et exploiter la centrale suivante : {{type_centrale}}, sur le site de {{site_implantation}}.</p><h2>Article 2 – Contrat d'Achat d'Électricité (PPA)</h2><p>L'État s'engage à acheter l'électricité produite pendant {{duree_ppa}} ans selon les termes du contrat PPA joint en annexe.</p><h2>Article 3 – Propriété</h2><p>La centrale demeure la propriété de l'IPP pendant toute la durée du contrat.</p><p>Fait le {{date_signature}}</p></div>`
  },
  {
    code: 'ppp_bto_hopital',
    name: "Contrat de BTO (Build-Transfer-Operate) – Hôpital",
    category: 'juridique_admin', price: 24000, priceMax: 75000,
    description: "Contrat BTO pour la construction et le transfert immédiat d'un hôpital à l'État, suivi de son exploitation par le partenaire privé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'ministere_sante',label:"Ministère de la Santé",type:'text',required:true},
      {key:'constructeur_operateur',label:"Constructeur/Opérateur privé",type:'text',required:true},
      {key:'capacite_hopital',label:"Capacité et spécialités de l'hôpital",type:'textarea',required:true},
      {key:'lieu_construction',label:"Lieu de construction",type:'text',required:true},
      {key:'duree_exploitation',label:"Durée d'exploitation (années)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT BTO – BUILD-TRANSFER-OPERATE – HÔPITAL</h1><p><strong>Autorité publique :</strong> {{ministere_sante}}</p><p><strong>Partenaire privé :</strong> {{constructeur_operateur}}</p><h2>Article 1 – Objet</h2><p>Le Partenaire privé s'engage à construire un hôpital de {{capacite_hopital}} à {{lieu_construction}}.</p><h2>Article 2 – Transfert immédiat</h2><p>À l'achèvement de la construction, l'infrastructure est transférée immédiatement à l'État.</p><h2>Article 3 – Exploitation</h2><p>Le Partenaire privé exploite l'hôpital pendant {{duree_exploitation}} ans selon un cahier des charges défini par l'État.</p><p>Fait le {{date_contrat}}</p></div>`
  },
  {
    code: 'ppp_dbfm',
    name: "Accord de DBFM (Design-Build-Finance-Maintain)",
    category: 'juridique_admin', price: 27000, priceMax: 88000,
    description: "Accord DBFM par lequel le partenaire privé prend en charge la conception, la construction, le financement et la maintenance d'une infrastructure publique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'entite_publique',label:"Entité publique contractante",type:'text',required:true},
      {key:'partenaire_dbfm',label:"Partenaire DBFM (consortium)",type:'text',required:true},
      {key:'infrastructure_dbfm',label:"Infrastructure à réaliser",type:'textarea',required:true},
      {key:'duree_maintenance',label:"Durée de la période de maintenance (années)",type:'text',required:true},
      {key:'montant_paiement_disponibilite',label:"Montant du paiement de disponibilité (FCFA/an)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DBFM – DESIGN-BUILD-FINANCE-MAINTAIN</h1><p><strong>Entité publique :</strong> {{entite_publique}}</p><p><strong>Partenaire DBFM :</strong> {{partenaire_dbfm}}</p><h2>Article 1 – Périmètre</h2><p>Le Partenaire assure la conception, la construction, le financement et la maintenance de : {{infrastructure_dbfm}}</p><h2>Article 2 – Paiement</h2><p>L'entité publique verse un paiement de disponibilité de {{montant_paiement_disponibilite}} FCFA par an pendant {{duree_maintenance}} ans, conditionné à la disponibilité de l'infrastructure.</p><h2>Article 3 – Performance</h2><p>Des pénalités de non-disponibilité s'appliquent en cas de défaillance du Partenaire selon le mécanisme de paiement défini en annexe.</p><p>Fait le {{date_accord}}</p></div>`
  },
  {
    code: 'ppp_concession_aeroport',
    name: "Accord de Concession Aéroportuaire",
    category: 'juridique_admin', price: 30000, priceMax: 95000,
    description: "Convention de concession pour l'exploitation, la gestion et le développement d'un aéroport international en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'autorite_aviation',label:"Autorité de l'aviation civile",type:'text',required:true},
      {key:'operateur_aeroport',label:"Opérateur aéroportuaire concessionnaire",type:'text',required:true},
      {key:'nom_aeroport',label:"Nom et localisation de l'aéroport",type:'text',required:true},
      {key:'duree_concession',label:"Durée de la concession (années)",type:'text',required:true},
      {key:'redevance_annuelle',label:"Redevance annuelle à l'État (FCFA)",type:'text',required:true},
      {key:'date_prise_effet',label:"Date de prise d'effet",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCESSION AÉROPORTUAIRE</h1><p><strong>Concédant :</strong> {{autorite_aviation}}</p><p><strong>Concessionnaire :</strong> {{operateur_aeroport}}</p><h2>Article 1 – Objet</h2><p>La concession porte sur l'exploitation, la gestion et le développement de l'aéroport : {{nom_aeroport}}.</p><h2>Article 2 – Durée</h2><p>La concession est accordée pour {{duree_concession}} ans à compter du {{date_prise_effet}}.</p><h2>Article 3 – Redevance</h2><p>Le Concessionnaire verse à l'État une redevance annuelle de {{redevance_annuelle}} FCFA, révisable tous les cinq ans.</p><h2>Article 4 – Investissements</h2><p>Le Concessionnaire s'engage à réaliser un programme d'investissements défini en annexe pour moderniser les infrastructures aéroportuaires.</p></div>`
  },
  {
    code: 'ppp_gestion_assainissement',
    name: "Contrat de Gestion Déléguée – Assainissement",
    category: 'juridique_admin', price: 18000, priceMax: 55000,
    description: "Contrat de gestion déléguée pour la collecte, le transport et le traitement des eaux usées et déchets solides d'une commune ivoirienne.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'commune_delegante',label:"Commune déléguante",type:'text',required:true},
      {key:'gestionnaire_delegue',label:"Gestionnaire délégué (société)",type:'text',required:true},
      {key:'perimetre_service',label:"Périmètre du service d'assainissement",type:'textarea',required:true},
      {key:'duree_gestion',label:"Durée de la gestion déléguée (années)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE GESTION DÉLÉGUÉE DU SERVICE D'ASSAINISSEMENT</h1><p><strong>Commune déléguante :</strong> {{commune_delegante}}</p><p><strong>Gestionnaire délégué :</strong> {{gestionnaire_delegue}}</p><h2>Article 1 – Objet</h2><p>La Commune confie au Gestionnaire délégué la gestion du service d'assainissement sur le périmètre : {{perimetre_service}}</p><h2>Article 2 – Durée</h2><p>Le contrat est conclu pour {{duree_gestion}} ans à compter du {{date_debut}}.</p><h2>Article 3 – Obligations</h2><p>Le Gestionnaire assure la collecte, le transport et le traitement des eaux usées et déchets selon les normes environnementales en vigueur.</p><h2>Article 4 – Contrôle et rapports</h2><p>Un rapport semestriel de performance est transmis à la Commune.</p></div>`
  },
  {
    code: 'ppp_bail_emphyteotique_admin',
    name: "Contrat de Bail Emphytéotique Administratif",
    category: 'juridique_admin', price: 15000, priceMax: 45000,
    description: "Bail emphytéotique administratif par lequel une personne publique concède un terrain du domaine public à un investisseur privé pour une longue durée.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'personne_publique',label:"Personne publique bailleresse",type:'text',required:true},
      {key:'preneur_emphyteote',label:"Preneur emphytéote (société/personne physique)",type:'text',required:true},
      {key:'description_terrain',label:"Description du terrain (superficie, localisation)",type:'textarea',required:true},
      {key:'duree_bail',label:"Durée du bail (18 à 99 ans)",type:'text',required:true},
      {key:'redevance_annuelle',label:"Redevance annuelle (FCFA)",type:'text',required:true},
      {key:'date_bail',label:"Date du bail",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE BAIL EMPHYTÉOTIQUE ADMINISTRATIF</h1><p><strong>Bailleresse :</strong> {{personne_publique}}</p><p><strong>Preneur emphytéote :</strong> {{preneur_emphyteote}}</p><h2>Article 1 – Objet</h2><p>La bailleresse concède au Preneur emphytéote, qui accepte, la jouissance du terrain suivant : {{description_terrain}}</p><h2>Article 2 – Durée</h2><p>Le bail est consenti pour une durée de {{duree_bail}} ans à compter du {{date_bail}}.</p><h2>Article 3 – Redevance</h2><p>Le Preneur versera annuellement une redevance de {{redevance_annuelle}} FCFA.</p><h2>Article 4 – Obligations du preneur</h2><p>Le Preneur s'engage à réaliser les constructions et améliorations définies en annexe, lesquelles reviendront à la bailleresse à l'expiration du bail.</p></div>`
  },
  {
    code: 'ppp_cession_participation_etat',
    name: "Accord de Cession de Participation de l'État",
    category: 'juridique_admin', price: 28000, priceMax: 90000,
    description: "Accord encadrant la cession par l'État ivoirien de sa participation dans le capital d'une entreprise publique ou d'économie mixte à un investisseur privé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'etat_cedant',label:"État cédant (représentant)",type:'text',required:true},
      {key:'acquereur',label:"Acquéreur (société/consortium)",type:'text',required:true},
      {key:'entreprise_concernee',label:"Entreprise concernée",type:'text',required:true},
      {key:'pourcentage_cede',label:"Pourcentage du capital cédé (%)",type:'text',required:true},
      {key:'prix_cession',label:"Prix de cession (FCFA)",type:'text',required:true},
      {key:'date_cession',label:"Date de cession",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CESSION DE PARTICIPATION DE L'ÉTAT</h1><p><strong>Cédant :</strong> {{etat_cedant}}</p><p><strong>Acquéreur :</strong> {{acquereur}}</p><h2>Article 1 – Objet</h2><p>L'État cède à l'Acquéreur {{pourcentage_cede}}% du capital de {{entreprise_concernee}}.</p><h2>Article 2 – Prix</h2><p>Le prix de cession est fixé à {{prix_cession}} FCFA, payable selon les modalités définies en annexe.</p><h2>Article 3 – Engagements de l'acquéreur</h2><p>L'Acquéreur s'engage à maintenir l'activité, les emplois et à réaliser les investissements prévus au plan d'affaires annexé.</p><p>Fait le {{date_cession}}</p></div>`
  },
  {
    code: 'ppp_privatisation_partielle',
    name: "Contrat de Privatisation Partielle d'Entreprise Publique",
    category: 'juridique_admin', price: 28000, priceMax: 90000,
    description: "Contrat organisant la privatisation partielle d'une entreprise publique ivoirienne, incluant les engagements sociaux et les conditions de reprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'etat_privatisant',label:"État privatisant (représentant)",type:'text',required:true},
      {key:'repreneur',label:"Repreneur stratégique",type:'text',required:true},
      {key:'entreprise_privatisee',label:"Entreprise à privatiser",type:'text',required:true},
      {key:'quote_part_cedee',label:"Quote-part cédée au repreneur (%)",type:'text',required:true},
      {key:'date_operation',label:"Date de l'opération",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRIVATISATION PARTIELLE</h1><p><strong>État :</strong> {{etat_privatisant}}</p><p><strong>Repreneur :</strong> {{repreneur}}</p><h2>Article 1 – Objet</h2><p>Le présent contrat organise la privatisation partielle de {{entreprise_privatisee}}, par la cession de {{quote_part_cedee}}% du capital au Repreneur.</p><h2>Article 2 – Engagements sociaux</h2><p>Le Repreneur s'engage à maintenir les emplois existants pendant au moins cinq ans et à respecter les conventions collectives applicables.</p><h2>Article 3 – Plan d'investissement</h2><p>Un plan d'investissement sur cinq ans est annexé et constitue une obligation contractuelle du Repreneur.</p><p>Fait le {{date_operation}}</p></div>`
  },
  {
    code: 'ppp_recapitalisation_ep',
    name: "Accord de Recapitalisation d'Entreprise Publique",
    category: 'juridique_admin', price: 22000, priceMax: 70000,
    description: "Accord entre l'État et des investisseurs privés pour la recapitalisation d'une entreprise publique ivoirienne en difficulté ou en développement.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'etat_actionnaire',label:"État actionnaire (représentant)",type:'text',required:true},
      {key:'investisseur_nouveau',label:"Nouvel investisseur (société)",type:'text',required:true},
      {key:'entreprise_recapitalisee',label:"Entreprise à recapitaliser",type:'text',required:true},
      {key:'montant_recapitalisation',label:"Montant de la recapitalisation (FCFA)",type:'text',required:true},
      {key:'nouvelle_repartition',label:"Nouvelle répartition du capital (%)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RECAPITALISATION D'ENTREPRISE PUBLIQUE</h1><p><strong>État actionnaire :</strong> {{etat_actionnaire}}</p><p><strong>Nouvel investisseur :</strong> {{investisseur_nouveau}}</p><h2>Article 1 – Objet</h2><p>Le présent accord organise la recapitalisation de {{entreprise_recapitalisee}} à hauteur de {{montant_recapitalisation}} FCFA.</p><h2>Article 2 – Nouvelle structure du capital</h2><p>Après recapitalisation, le capital est réparti comme suit : {{nouvelle_repartition}}</p><h2>Article 3 – Gouvernance</h2><p>La nouvelle structure de gouvernance, incluant la composition du Conseil d'Administration, est définie en annexe.</p><p>Fait le {{date_accord}}</p></div>`
  },
  {
    code: 'ppp_garantie_souveraine',
    name: "Convention de Garantie Souveraine (État-Investisseur)",
    category: 'juridique_admin', price: 25000, priceMax: 80000,
    description: "Convention par laquelle l'État ivoirien accorde une garantie souveraine à un investisseur ou créancier dans le cadre d'un projet PPP.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'etat_garant',label:"État garant (représentant)",type:'text',required:true},
      {key:'beneficiaire_garantie',label:"Bénéficiaire de la garantie",type:'text',required:true},
      {key:'objet_garanti',label:"Obligation garantie (projet/montant)",type:'textarea',required:true},
      {key:'montant_garanti',label:"Montant garanti (FCFA)",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE GARANTIE SOUVERAINE</h1><p><strong>État garant :</strong> {{etat_garant}}</p><p><strong>Bénéficiaire :</strong> {{beneficiaire_garantie}}</p><h2>Article 1 – Objet de la garantie</h2><p>L'État garantit irrévocablement les obligations suivantes : {{objet_garanti}}, à hauteur de {{montant_garanti}} FCFA.</p><h2>Article 2 – Conditions de mise en jeu</h2><p>La garantie peut être mise en jeu en cas de défaillance de l'entité garantie selon les modalités définies à l'article 5.</p><h2>Article 3 – Droit de recours</h2><p>L'État dispose d'un droit de recours contre l'entité défaillante à concurrence des sommes versées.</p><p>Fait le {{date_convention}}</p></div>`
  },
  {
    code: 'ppp_stabilisation_fiscale',
    name: "Accord de Stabilisation Fiscale pour Investisseur",
    category: 'juridique_admin', price: 20000, priceMax: 60000,
    description: "Accord de stabilisation des conditions fiscales accordé par l'État ivoirien à un investisseur étranger ou local dans le cadre du Code des investissements.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'etat_stabilisant',label:"État (représentant du Ministère des Finances)",type:'text',required:true},
      {key:'investisseur_beneficiaire',label:"Investisseur bénéficiaire",type:'text',required:true},
      {key:'projet_investissement',label:"Projet d'investissement concerné",type:'textarea',required:true},
      {key:'duree_stabilisation',label:"Durée de stabilisation fiscale (années)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE STABILISATION FISCALE</h1><p><strong>État de Côte d'Ivoire :</strong> {{etat_stabilisant}}</p><p><strong>Investisseur :</strong> {{investisseur_beneficiaire}}</p><h2>Article 1 – Objet</h2><p>Le présent accord garantit à l'Investisseur la stabilité du régime fiscal applicable au projet : {{projet_investissement}}, pendant {{duree_stabilisation}} ans.</p><h2>Article 2 – Portée</h2><p>Toute modification législative ou réglementaire défavorable à l'Investisseur pendant la période de stabilisation sera neutralisée par l'application du régime en vigueur à la date du présent accord.</p><p>Fait le {{date_accord}}</p></div>`
  },
  {
    code: 'ppp_protection_investissement_bit',
    name: "Accord de Protection de l'Investissement (BIT)",
    category: 'juridique_admin', price: 22000, priceMax: 68000,
    description: "Accord bilatéral d'investissement (BIT) ou clause de protection de l'investissement entre l'État et un investisseur étranger.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'etat_hote',label:"État hôte (Côte d'Ivoire – représentant)",type:'text',required:true},
      {key:'investisseur_etranger',label:"Investisseur étranger (nationalité et dénomination)",type:'text',required:true},
      {key:'secteur_investissement',label:"Secteur et nature de l'investissement",type:'textarea',required:true},
      {key:'montant_investissement',label:"Montant de l'investissement (FCFA ou USD)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PROTECTION DE L'INVESTISSEMENT (BIT)</h1><p><strong>État hôte :</strong> {{etat_hote}}</p><p><strong>Investisseur étranger :</strong> {{investisseur_etranger}}</p><h2>Article 1 – Objet et investissement protégé</h2><p>Le présent accord protège l'investissement de {{montant_investissement}} réalisé dans le secteur : {{secteur_investissement}}</p><h2>Article 2 – Traitement juste et équitable</h2><p>L'État garantit un traitement juste et équitable, la non-discrimination et la protection contre l'expropriation sans indemnisation adéquate.</p><h2>Article 3 – Règlement des différends</h2><p>Tout différend est soumis à l'arbitrage CIRDI ou CCJA-OHADA selon le choix de l'investisseur.</p><p>Fait le {{date_accord}}</p></div>`
  },
  {
    code: 'ppp_zone_economique_speciale',
    name: "Contrat de Zone Économique Spéciale (ZES)",
    category: 'juridique_admin', price: 25000, priceMax: 80000,
    description: "Contrat d'établissement dans une Zone Économique Spéciale (ZES) en Côte d'Ivoire, définissant les droits, avantages et obligations de l'entreprise.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'autorite_zes',label:"Autorité de gestion de la ZES",type:'text',required:true},
      {key:'entreprise_zes',label:"Entreprise s'établissant dans la ZES",type:'text',required:true},
      {key:'activite_zes',label:"Nature de l'activité",type:'textarea',required:true},
      {key:'duree_contrat',label:"Durée du contrat d'établissement (années)",type:'text',required:true},
      {key:'avantages_fiscaux',label:"Avantages fiscaux et douaniers accordés",type:'textarea',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ÉTABLISSEMENT EN ZONE ÉCONOMIQUE SPÉCIALE (ZES)</h1><p><strong>Autorité de la ZES :</strong> {{autorite_zes}}</p><p><strong>Entreprise :</strong> {{entreprise_zes}}</p><h2>Article 1 – Objet</h2><p>Le présent contrat autorise {{entreprise_zes}} à exercer l'activité suivante dans la ZES : {{activite_zes}}</p><h2>Article 2 – Durée</h2><p>Le contrat est consenti pour {{duree_contrat}} ans à compter du {{date_contrat}}.</p><h2>Article 3 – Avantages</h2><p>L'Entreprise bénéficie des avantages suivants : {{avantages_fiscaux}}</p><h2>Article 4 – Obligations</h2><p>L'Entreprise s'engage à respecter le règlement intérieur de la ZES et les objectifs de création d'emplois définis en annexe.</p></div>`
  },
  {
    code: 'ppp_zone_franche_industrielle',
    name: "Accord de Zone Franche Industrielle",
    category: 'juridique_admin', price: 23000, priceMax: 72000,
    description: "Accord d'implantation dans une zone franche industrielle ivoirienne avec les avantages douaniers, fiscaux et les obligations de l'entreprise franche.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'autorite_zone_franche',label:"Autorité de la Zone Franche",type:'text',required:true},
      {key:'entreprise_franche',label:"Entreprise franche (dénomination)",type:'text',required:true},
      {key:'activite_industrielle',label:"Activité industrielle exercée",type:'textarea',required:true},
      {key:'duree_agrement',label:"Durée de l'agrément (années)",type:'text',required:true},
      {key:'date_agrement',label:"Date d'agrément",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'IMPLANTATION EN ZONE FRANCHE INDUSTRIELLE</h1><p><strong>Autorité de la Zone Franche :</strong> {{autorite_zone_franche}}</p><p><strong>Entreprise franche :</strong> {{entreprise_franche}}</p><h2>Article 1 – Agrément</h2><p>L'Entreprise est agréée au statut d'entreprise franche pour exercer l'activité : {{activite_industrielle}}</p><h2>Article 2 – Durée</h2><p>L'agrément est accordé pour {{duree_agrement}} ans à compter du {{date_agrement}}.</p><h2>Article 3 – Régime douanier et fiscal</h2><p>L'Entreprise franche bénéficie de l'exonération totale des droits de douane sur les importations de matières premières et équipements destinés à la production exportée.</p><h2>Article 4 – Obligations d'exportation</h2><p>L'Entreprise s'engage à exporter au moins 80% de sa production.</p></div>`
  },
  {
    code: 'ppp_zone_franche_portuaire',
    name: "Contrat de Zone Franche Industrielle et de Services (ZFIS) – Abidjan",
    category: 'juridique_admin', price: 24000, priceMax: 75000,
    description: "Contrat spécifique à la Zone Franche Industrielle et de Services (ZFIS) du Port d'Abidjan pour l'implantation d'une entreprise logistique ou industrielle.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'paa_autorite',label:"Port Autonome d'Abidjan / Autorité de la ZFIS",type:'text',required:true},
      {key:'entreprise_zfis',label:"Entreprise s'établissant dans la ZFIS",type:'text',required:true},
      {key:'type_activite',label:"Type d'activité (logistique/industrie/services)",type:'textarea',required:true},
      {key:'superficie_lot',label:"Superficie du lot (m²)",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat (années)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ÉTABLISSEMENT EN ZONE FRANCHE INDUSTRIELLE ET DE SERVICES (ZFIS) – PORT D'ABIDJAN</h1><p><strong>Autorité ZFIS :</strong> {{paa_autorite}}</p><p><strong>Entreprise :</strong> {{entreprise_zfis}}</p><h2>Article 1 – Objet</h2><p>L'Autorité met à disposition de l'Entreprise un lot de {{superficie_lot}} m² dans la ZFIS du Port d'Abidjan pour l'exercice de l'activité : {{type_activite}}</p><h2>Article 2 – Durée</h2><p>Le contrat est conclu pour {{duree_contrat}} ans à compter du {{date_contrat}}.</p><h2>Article 3 – Avantages spécifiques ZFIS</h2><p>L'Entreprise bénéficie des avantages douaniers, fiscaux et de la simplification des procédures prévus par le statut ZFIS.</p></div>`
  },
  {
    code: 'ppp_plateforme_industrielle',
    name: "Accord de Plateforme Industrielle Intégrée (P2I)",
    category: 'juridique_admin', price: 26000, priceMax: 82000,
    description: "Accord d'établissement dans une Plateforme Industrielle Intégrée (P2I) ivoirienne, écosystème regroupant industries, services et infrastructures.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'gestionnaire_p2i',label:"Gestionnaire de la P2I",type:'text',required:true},
      {key:'entreprise_p2i',label:"Entreprise s'établissant dans la P2I",type:'text',required:true},
      {key:'filiere_industrie',label:"Filière industrielle et produits",type:'textarea',required:true},
      {key:'emplois_crees',label:"Nombre d'emplois à créer",type:'text',required:true},
      {key:'duree_accord',label:"Durée de l'accord (années)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'ÉTABLISSEMENT EN PLATEFORME INDUSTRIELLE INTÉGRÉE (P2I)</h1><p><strong>Gestionnaire P2I :</strong> {{gestionnaire_p2i}}</p><p><strong>Entreprise :</strong> {{entreprise_p2i}}</p><h2>Article 1 – Objet</h2><p>L'Entreprise s'établit dans la P2I pour développer la filière : {{filiere_industrie}}</p><h2>Article 2 – Engagements emploi</h2><p>L'Entreprise s'engage à créer {{emplois_crees}} emplois locaux dans les trois ans suivant le {{date_accord}}.</p><h2>Article 3 – Durée</h2><p>Le présent accord est conclu pour {{duree_accord}} ans.</p><h2>Article 4 – Accès aux services communs</h2><p>L'Entreprise bénéficie de l'accès aux services mutualisés de la P2I (énergie, eau, logistique, sécurité) selon le tarif préférentiel en vigueur.</p></div>`
  },
  {
    code: 'ppp_rapport_performance',
    name: "Rapport de Performance PPP",
    category: 'juridique_admin', price: 8000, priceMax: 25000,
    description: "Rapport périodique d'évaluation de la performance d'un contrat PPP, mesurant les indicateurs clés et le respect des engagements contractuels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'projet_ppp',label:"Projet PPP concerné",type:'text',required:true},
      {key:'partenaire_prive',label:"Partenaire privé",type:'text',required:true},
      {key:'periode_rapport',label:"Période couverte par le rapport",type:'text',required:true},
      {key:'indicateurs_performance',label:"Principaux indicateurs de performance (KPI)",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE PPP</h1><p><strong>Projet :</strong> {{projet_ppp}}</p><p><strong>Partenaire privé :</strong> {{partenaire_prive}}</p><p><strong>Période :</strong> {{periode_rapport}}</p><h2>1. Résumé exécutif</h2><p>Le présent rapport évalue la performance du projet PPP pour la période indiquée.</p><h2>2. Indicateurs clés de performance</h2><p>{{indicateurs_performance}}</p><h2>3. Écarts et mesures correctives</h2><p>[Tableau des écarts entre objectifs et réalisations à compléter]</p><h2>4. Recommandations</h2><p>[Recommandations pour la période suivante à compléter]</p><p>Rapport établi le {{date_rapport}}</p></div>`
  },
  {
    code: 'ppp_rapport_controle_concession',
    name: "Rapport de Contrôle de Concession",
    category: 'juridique_admin', price: 8000, priceMax: 22000,
    description: "Rapport de contrôle technique et financier d'une concession de service public, établi par l'autorité de régulation ou le concédant.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'concession_concernee',label:"Concession concernée",type:'text',required:true},
      {key:'autorite_controle',label:"Autorité de contrôle",type:'text',required:true},
      {key:'concessionnaire',label:"Concessionnaire contrôlé",type:'text',required:true},
      {key:'periode_controle',label:"Période de contrôle",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CONTRÔLE DE CONCESSION</h1><p><strong>Concession :</strong> {{concession_concernee}}</p><p><strong>Autorité de contrôle :</strong> {{autorite_controle}}</p><p><strong>Concessionnaire :</strong> {{concessionnaire}}</p><p><strong>Période :</strong> {{periode_controle}}</p><h2>1. Contrôle technique</h2><p>[État des infrastructures, niveau de service, conformité aux normes techniques – à compléter]</p><h2>2. Contrôle financier</h2><p>[Analyse des comptes, tarifs pratiqués, redevances versées – à compléter]</p><h2>3. Respect des obligations contractuelles</h2><p>[Tableau de conformité aux clauses contractuelles – à compléter]</p><h2>4. Conclusions et recommandations</h2><p>[À compléter]</p><p>Rapport établi le {{date_rapport}}</p></div>`
  },
  {
    code: 'ppp_plan_regulation_tarifaire',
    name: "Plan de Régulation Tarifaire de Concession",
    category: 'juridique_admin', price: 12000, priceMax: 38000,
    description: "Plan définissant la méthode de calcul, de révision et de contrôle des tarifs d'une concession de service public en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 61,
    fieldsJson: F([
      {key:'service_concede',label:"Service public concédé",type:'text',required:true},
      {key:'autorite_regulation',label:"Autorité de régulation",type:'text',required:true},
      {key:'methode_tarification',label:"Méthode de tarification retenue",type:'textarea',required:true},
      {key:'periodicite_revision',label:"Périodicité de révision tarifaire",type:'text',required:true},
      {key:'date_plan',label:"Date d'établissement du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE RÉGULATION TARIFAIRE DE CONCESSION</h1><p><strong>Service concédé :</strong> {{service_concede}}</p><p><strong>Autorité de régulation :</strong> {{autorite_regulation}}</p><h2>1. Méthode de tarification</h2><p>{{methode_tarification}}</p><h2>2. Structure tarifaire</h2><p>[Tableau des tarifs par catégorie d'usagers et par tranche de consommation – à compléter]</p><h2>3. Révision tarifaire</h2><p>Les tarifs sont révisés {{periodicite_revision}} selon la formule d'indexation définie en annexe.</p><h2>4. Mécanisme de contrôle</h2><p>L'Autorité de régulation vérifie l'application des tarifs et peut imposer des corrections en cas de dérapage.</p><p>Plan établi le {{date_plan}}</p></div>`
  },
  {
    code: 'ppp_charte_partenariat',
    name: "Charte du Partenariat Public-Privé",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Charte définissant les principes directeurs, les valeurs et les engagements mutuels des partenaires dans le cadre d'un PPP en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'titre_projet',label:"Titre du projet PPP",type:'text',required:true},
      {key:'parties_signataires',label:"Parties signataires de la charte",type:'textarea',required:true},
      {key:'valeurs_partenariat',label:"Valeurs et principes du partenariat",type:'textarea',required:true},
      {key:'date_charte',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU PARTENARIAT PUBLIC-PRIVÉ</h1><h2>Projet : {{titre_projet}}</h2><p><strong>Parties signataires :</strong> {{parties_signataires}}</p><h2>Préambule</h2><p>Les parties reconnaissent que le succès du partenariat repose sur la confiance mutuelle, la transparence et la responsabilité partagée.</p><h2>Article 1 – Valeurs et principes</h2><p>{{valeurs_partenariat}}</p><h2>Article 2 – Engagements mutuels</h2><p>Chaque partie s'engage à respecter ses obligations contractuelles, à communiquer de bonne foi et à œuvrer pour l'intérêt général et la viabilité du projet.</p><h2>Article 3 – Révision</h2><p>La présente charte est révisable par accord mutuel des parties.</p><p>Adoptée le {{date_charte}}</p></div>`
  },

  // ── FONCIER / DROIT DE LA TERRE (25) ────────────────────────────────────────
  {
    code: 'fonc_acte_vente_titre_foncier',
    name: "Acte de Vente de Terrain (Titre Foncier)",
    category: 'juridique_admin', price: 15000, priceMax: 45000,
    description: "Acte notarié de vente d'un terrain immatriculé au livre foncier de Côte d'Ivoire, conforme à la loi n°98-750 du 23 décembre 1998 sur le domaine foncier rural.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'vendeur',label:"Vendeur (nom, prénom, CNI)",type:'text',required:true},
      {key:'acquereur',label:"Acquéreur (nom, prénom, CNI)",type:'text',required:true},
      {key:'numero_titre_foncier',label:"Numéro du titre foncier",type:'text',required:true},
      {key:'superficie_m2',label:"Superficie (m²)",type:'text',required:true},
      {key:'prix_vente',label:"Prix de vente (FCFA)",type:'text',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE VENTE DE TERRAIN (TITRE FONCIER)</h1><p><strong>Vendeur :</strong> {{vendeur}}</p><p><strong>Acquéreur :</strong> {{acquereur}}</p><h2>Désignation du bien</h2><p>Terrain immatriculé sous le titre foncier n° {{numero_titre_foncier}}, d'une superficie de {{superficie_m2}} m², situé conformément aux références cadastrales mentionnées au titre.</p><h2>Prix</h2><p>La vente est consentie et acceptée moyennant le prix de {{prix_vente}} FCFA, dont l'Acquéreur reconnaît avoir reçu paiement intégral.</p><h2>Garanties</h2><p>Le Vendeur garantit l'Acquéreur contre tout trouble de jouissance, éviction et vices cachés. Le terrain est vendu libre de toute hypothèque et servitude non mentionnée au titre.</p><h2>Mutations</h2><p>La mutation au livre foncier sera effectuée à la diligence de l'Acquéreur auprès de la Conservation Foncière compétente.</p><p>Fait le {{date_acte}}</p></div>`
  },
  {
    code: 'fonc_cession_droit_coutumier',
    name: "Acte de Cession de Droit Coutumier",
    category: 'juridique_admin', price: 8000, priceMax: 25000,
    description: "Acte de cession d'un droit coutumier sur une terre en Côte d'Ivoire, établi conformément aux procédures de confirmation des droits coutumiers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'cedant_coutumier',label:"Cédant (chef de famille/propriétaire coutumier)",type:'text',required:true},
      {key:'cessionnaire',label:"Cessionnaire",type:'text',required:true},
      {key:'description_terre',label:"Description de la terre (localisation, superficie approximative)",type:'textarea',required:true},
      {key:'contrepartie',label:"Contrepartie versée (FCFA ou nature)",type:'text',required:true},
      {key:'temoins',label:"Témoins présents (noms et qualités)",type:'textarea',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE CESSION DE DROIT COUTUMIER</h1><p><strong>Cédant :</strong> {{cedant_coutumier}}</p><p><strong>Cessionnaire :</strong> {{cessionnaire}}</p><h2>Article 1 – Objet</h2><p>Le Cédant cède au Cessionnaire ses droits coutumiers sur la terre suivante : {{description_terre}}</p><h2>Article 2 – Contrepartie</h2><p>La cession est consentie contre la contrepartie suivante : {{contrepartie}}, dont le Cédant reconnaît avoir reçu paiement intégral.</p><h2>Article 3 – Témoignage</h2><p>Les témoins suivants certifient la réalité de la cession : {{temoins}}</p><h2>Article 4 – Procédure de confirmation</h2><p>Le Cessionnaire s'engage à initier la procédure de certificat foncier rural conformément à la loi n°98-750.</p><p>Fait le {{date_acte}}</p></div>`
  },
  {
    code: 'fonc_certificat_foncier_rural',
    name: "Certificat Foncier Rural (Côte d'Ivoire)",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Certificat foncier rural délivré conformément à la loi ivoirienne n°98-750 du 23 décembre 1998, attestant les droits coutumiers confirmés sur une terre rurale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'titulaire_cfr',label:"Titulaire du CFR (nom, prénom)",type:'text',required:true},
      {key:'village_localisation',label:"Village et sous-préfecture de localisation",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie (hectares)",type:'text',required:true},
      {key:'references_bornage',label:"Références du bornage (PV n°)",type:'text',required:true},
      {key:'date_delivrance',label:"Date de délivrance",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CERTIFICAT FONCIER RURAL</h1><p><em>République de Côte d'Ivoire – Ministère de l'Agriculture et du Développement Rural</em></p><h2>ATTESTATION</h2><p>Il est certifié que <strong>{{titulaire_cfr}}</strong> est titulaire des droits coutumiers confirmés sur la parcelle de terre rurale ci-après désignée :</p><ul><li>Localisation : {{village_localisation}}</li><li>Superficie : {{superficie_ha}} hectares</li><li>Références de bornage : PV n° {{references_bornage}}</li></ul><p>Le présent Certificat Foncier Rural a été délivré conformément à la loi n°98-750 du 23 décembre 1998 relative au domaine foncier rural.</p><p>Délivré le {{date_delivrance}}</p></div>`
  },
  {
    code: 'fonc_demande_certificat_foncier',
    name: "Demande de Certificat Foncier",
    category: 'juridique_admin', price: 5000, priceMax: 15000,
    description: "Formulaire de demande de certificat foncier rural à adresser au Sous-Préfet ou à l'autorité compétente en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 80,
    fieldsJson: F([
      {key:'demandeur_nom',label:"Nom et prénom du demandeur",type:'text',required:true},
      {key:'demandeur_contact',label:"Contact et adresse du demandeur",type:'text',required:true},
      {key:'localisation_terre',label:"Localisation de la terre (village, sous-préfecture, département)",type:'textarea',required:true},
      {key:'superficie_estimee',label:"Superficie estimée (ha)",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DEMANDE DE CERTIFICAT FONCIER RURAL</h1><p><strong>À Monsieur le Sous-Préfet</strong></p><p>Je soussigné(e), <strong>{{demandeur_nom}}</strong>, demeurant à {{demandeur_contact}}, sollicite respectueusement la délivrance d'un Certificat Foncier Rural pour la terre suivante :</p><h2>Description de la terre</h2><p>{{localisation_terre}}</p><p>Superficie estimée : {{superficie_estimee}} hectares.</p><h2>Fondement du droit</h2><p>Je détiens des droits coutumiers sur cette terre, hérités de mes ascendants / acquis par voie de cession coutumière (cocher et préciser).</p><h2>Documents joints</h2><ul><li>Copie de la CNI</li><li>Témoignages écrits des voisins et du chef de village</li><li>Croquis de la parcelle</li></ul><p>Fait le {{date_demande}}</p><p>Signature du demandeur : _______________</p></div>`
  },
  {
    code: 'fonc_lettre_attribution_terrain',
    name: "Lettre d'Attribution de Terrain (Domaine de l'État)",
    category: 'juridique_admin', price: 8000, priceMax: 22000,
    description: "Lettre officielle d'attribution d'un terrain du domaine de l'État ou d'une collectivité territoriale à un particulier ou une entreprise en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'autorite_attribuante',label:"Autorité attribuante (Ministère/Mairie/District)",type:'text',required:true},
      {key:'beneficiaire_attribution',label:"Bénéficiaire de l'attribution",type:'text',required:true},
      {key:'references_parcelle',label:"Références cadastrales de la parcelle",type:'text',required:true},
      {key:'superficie_m2',label:"Superficie (m²)",type:'text',required:true},
      {key:'usage_prevu',label:"Usage prévu (habitat/commerce/industrie)",type:'text',required:true},
      {key:'date_lettre',label:"Date de la lettre",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>LETTRE D'ATTRIBUTION DE TERRAIN</h1><p><em>{{autorite_attribuante}}</em></p><p><strong>À :</strong> {{beneficiaire_attribution}}</p><h2>Objet : Attribution de terrain</h2><p>Nous avons l'honneur de vous informer que la parcelle référencée {{references_parcelle}}, d'une superficie de {{superficie_m2}} m², vous est attribuée pour usage : {{usage_prevu}}.</p><h2>Conditions</h2><p>Cette attribution est faite à titre provisoire. Elle sera confirmée par un acte de concession après accomplissement des formalités requises et paiement des taxes d'attribution.</p><h2>Délai de mise en valeur</h2><p>Le bénéficiaire dispose de 24 mois pour mettre le terrain en valeur, sous peine de retrait de l'attribution.</p><p>Fait le {{date_lettre}}</p></div>`
  },
  {
    code: 'fonc_bail_emphyteotique_terrain',
    name: "Bail Emphytéotique de Terrain",
    category: 'juridique_admin', price: 12000, priceMax: 38000,
    description: "Bail emphytéotique entre particuliers ou entre une collectivité et un particulier pour un terrain en Côte d'Ivoire, d'une durée de 18 à 99 ans.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'bailleur_emphyteotique',label:"Bailleur",type:'text',required:true},
      {key:'preneur_emphyteotique',label:"Preneur emphytéote",type:'text',required:true},
      {key:'description_bien',label:"Description du terrain (superficie, localisation, références)",type:'textarea',required:true},
      {key:'duree_bail_ans',label:"Durée du bail (années)",type:'text',required:true},
      {key:'redevance_fcfa',label:"Redevance annuelle (FCFA)",type:'text',required:true},
      {key:'date_bail',label:"Date du bail",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BAIL EMPHYTÉOTIQUE DE TERRAIN</h1><p><strong>Bailleur :</strong> {{bailleur_emphyteotique}}</p><p><strong>Preneur emphytéote :</strong> {{preneur_emphyteotique}}</p><h2>Article 1 – Bien loué</h2><p>Le Bailleur donne à bail emphytéotique au Preneur le terrain suivant : {{description_bien}}</p><h2>Article 2 – Durée</h2><p>Le bail est consenti pour {{duree_bail_ans}} ans à compter du {{date_bail}}.</p><h2>Article 3 – Redevance</h2><p>Le Preneur versera annuellement une redevance de {{redevance_fcfa}} FCFA.</p><h2>Article 4 – Constructions</h2><p>Le Preneur peut construire sur le terrain. Les constructions deviendront la propriété du Bailleur à l'expiration du bail sans indemnité, sauf stipulation contraire.</p><h2>Article 5 – Publicité foncière</h2><p>Le présent bail sera publié à la Conservation Foncière à la diligence du Preneur.</p></div>`
  },
  {
    code: 'fonc_bail_superficie',
    name: "Bail de Superficie",
    category: 'juridique_admin', price: 10000, priceMax: 32000,
    description: "Contrat de bail de superficie conférant au preneur le droit de construire et de jouir des constructions sur le terrain d'autrui en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'proprietaire_foncier',label:"Propriétaire foncier",type:'text',required:true},
      {key:'superficiaire',label:"Superficiaire (preneur)",type:'text',required:true},
      {key:'terrain_superficie',label:"Description du terrain",type:'textarea',required:true},
      {key:'duree_bail',label:"Durée du bail de superficie (années)",type:'text',required:true},
      {key:'loyer_annuel',label:"Loyer annuel (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>BAIL DE SUPERFICIE</h1><p><strong>Propriétaire foncier :</strong> {{proprietaire_foncier}}</p><p><strong>Superficiaire :</strong> {{superficiaire}}</p><h2>Article 1 – Objet</h2><p>Le Propriétaire concède au Superficiaire le droit de superficie sur le terrain suivant : {{terrain_superficie}}</p><h2>Article 2 – Droits du superficiaire</h2><p>Le Superficiaire peut construire, entretenir et exploiter des ouvrages sur le terrain pendant {{duree_bail}} ans à compter du {{date_contrat}}.</p><h2>Article 3 – Loyer</h2><p>Le Superficiaire versera un loyer annuel de {{loyer_annuel}} FCFA.</p><h2>Article 4 – Fin du bail</h2><p>À l'expiration, le Superficiaire peut lever les constructions ou les laisser au Propriétaire selon les modalités convenues.</p></div>`
  },
  {
    code: 'fonc_contrat_metayage',
    name: "Contrat de Métayage Foncier",
    category: 'juridique_admin', price: 5000, priceMax: 15000,
    description: "Contrat de métayage agricole par lequel le propriétaire d'une terre et le métayer partagent les fruits de la récolte selon des proportions définies.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'proprietaire_metayage',label:"Propriétaire de la terre",type:'text',required:true},
      {key:'metayer',label:"Métayer",type:'text',required:true},
      {key:'parcelle_exploitee',label:"Description de la parcelle exploitée",type:'textarea',required:true},
      {key:'cultures_prevues',label:"Cultures prévues",type:'text',required:true},
      {key:'quote_part_metayer',label:"Quote-part du métayer sur la récolte (%)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MÉTAYAGE FONCIER</h1><p><strong>Propriétaire :</strong> {{proprietaire_metayage}}</p><p><strong>Métayer :</strong> {{metayer}}</p><h2>Article 1 – Terre mise à disposition</h2><p>Le Propriétaire met à disposition du Métayer la parcelle suivante pour son exploitation : {{parcelle_exploitee}}</p><h2>Article 2 – Cultures</h2><p>Le Métayer s'engage à cultiver : {{cultures_prevues}}, selon les règles de bonne culture.</p><h2>Article 3 – Partage des récoltes</h2><p>Le Métayer perçoit {{quote_part_metayer}}% de la récolte nette, le solde revenant au Propriétaire.</p><h2>Article 4 – Durée</h2><p>Le présent contrat est conclu pour une campagne agricole à compter du {{date_contrat}}, renouvelable par accord mutuel.</p></div>`
  },
  {
    code: 'fonc_accord_fermage',
    name: "Accord de Fermage Agricole",
    category: 'juridique_admin', price: 6000, priceMax: 18000,
    description: "Contrat de fermage par lequel le propriétaire d'une terre agricole la loue à un fermier moyennant un fermage fixe en numéraire ou en nature.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'bailleur_fermage',label:"Propriétaire bailleur",type:'text',required:true},
      {key:'fermier',label:"Fermier preneur",type:'text',required:true},
      {key:'terre_louee',label:"Description de la terre louée (superficie, localisation)",type:'textarea',required:true},
      {key:'montant_fermage',label:"Montant du fermage annuel (FCFA ou kg de produit)",type:'text',required:true},
      {key:'duree_fermage',label:"Durée du fermage (années)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FERMAGE AGRICOLE</h1><p><strong>Bailleur :</strong> {{bailleur_fermage}}</p><p><strong>Fermier :</strong> {{fermier}}</p><h2>Article 1 – Bien loué</h2><p>Le Bailleur loue au Fermier la terre agricole suivante : {{terre_louee}}</p><h2>Article 2 – Fermage</h2><p>Le Fermier versera annuellement un fermage de {{montant_fermage}}.</p><h2>Article 3 – Durée</h2><p>Le bail est conclu pour {{duree_fermage}} ans à compter du {{date_contrat}}.</p><h2>Article 4 – Obligations du fermier</h2><p>Le Fermier s'engage à exploiter la terre en bon père de famille, à entretenir les équipements existants et à restituer le bien en bon état à l'expiration du bail.</p></div>`
  },
  {
    code: 'fonc_acte_bornage',
    name: "Acte de Bornage de Terrain",
    category: 'juridique_admin', price: 8000, priceMax: 25000,
    description: "Acte officialisant le bornage d'un terrain en Côte d'Ivoire, établi à la suite des opérations de délimitation par un géomètre agréé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 73,
    fieldsJson: F([
      {key:'proprietaire_bornage',label:"Propriétaire du terrain borné",type:'text',required:true},
      {key:'geometre_agree',label:"Géomètre agréé ayant effectué le bornage",type:'text',required:true},
      {key:'localisation_terrain',label:"Localisation du terrain (commune, lotissement, îlot)",type:'textarea',required:true},
      {key:'superficie_bornee',label:"Superficie bornée (m²)",type:'text',required:true},
      {key:'date_bornage',label:"Date du bornage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE BORNAGE DE TERRAIN</h1><p><strong>Propriétaire :</strong> {{proprietaire_bornage}}</p><p><strong>Géomètre agréé :</strong> {{geometre_agree}}</p><h2>1. Identification du terrain</h2><p>Terrain situé à : {{localisation_terrain}}</p><p>Superficie bornée : {{superficie_bornee}} m²</p><h2>2. Description des bornes</h2><p>[Description des bornes posées (matériaux, repères) – à compléter par le géomètre]</p><h2>3. Liste des points de bornage</h2><p>[Tableau de coordonnées des points de bornage (X, Y, Z) – à compléter]</p><h2>4. Certification</h2><p>Je soussigné, {{geometre_agree}}, certifie avoir procédé aux opérations de bornage décrites ci-dessus le {{date_bornage}}.</p></div>`
  },
  {
    code: 'fonc_pv_bornage_contradictoire',
    name: "Procès-Verbal de Bornage Contradictoire",
    category: 'juridique_admin', price: 8000, priceMax: 24000,
    description: "Procès-verbal constatant le bornage effectué contradictoirement en présence des propriétaires riverains et du géomètre, en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'demandeur_bornage',label:"Demandeur du bornage",type:'text',required:true},
      {key:'riverains_presents',label:"Propriétaires riverains présents",type:'textarea',required:true},
      {key:'geometre_operateur',label:"Géomètre opérateur",type:'text',required:true},
      {key:'lieu_bornage',label:"Lieu du bornage",type:'text',required:true},
      {key:'date_pv',label:"Date du procès-verbal",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÈS-VERBAL DE BORNAGE CONTRADICTOIRE</h1><p><strong>Demandeur :</strong> {{demandeur_bornage}}</p><p><strong>Lieu :</strong> {{lieu_bornage}}</p><p><strong>Date :</strong> {{date_pv}}</p><h2>Comparants</h2><p>Propriétaires riverains présents : {{riverains_presents}}</p><p>Géomètre opérateur : {{geometre_operateur}}</p><h2>Opérations de bornage</h2><p>Les parties ont procédé contradictoirement à la délimitation des propriétés par la pose de bornes aux points définis par les coordonnées en annexe.</p><h2>Accord des parties</h2><p>Les parties déclarent accepter les limites ainsi définies et s'engagent à ne pas les modifier.</p><h2>Signatures</h2><p>Demandeur : _______________ Riverains : _______________ Géomètre : _______________</p></div>`
  },
  {
    code: 'fonc_rapport_expertise_fonciere',
    name: "Rapport d'Expertise Foncière",
    category: 'juridique_admin', price: 12000, priceMax: 35000,
    description: "Rapport d'expertise évaluant la valeur vénale ou locative d'un bien foncier en Côte d'Ivoire, établi par un expert immobilier agréé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'expert_foncier',label:"Expert foncier agréé",type:'text',required:true},
      {key:'donneurs_ordre',label:"Donneur(s) d'ordre",type:'text',required:true},
      {key:'bien_expertise',label:"Bien expertisé (description, localisation)",type:'textarea',required:true},
      {key:'valeur_venale',label:"Valeur vénale estimée (FCFA)",type:'text',required:true},
      {key:'date_expertise',label:"Date de l'expertise",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'EXPERTISE FONCIÈRE</h1><p><strong>Expert :</strong> {{expert_foncier}}</p><p><strong>Donneur d'ordre :</strong> {{donneurs_ordre}}</p><h2>1. Mission</h2><p>L'Expert a reçu mission d'estimer la valeur vénale du bien suivant : {{bien_expertise}}</p><h2>2. Méthode d'évaluation</h2><p>L'évaluation a été réalisée par la méthode comparative (analyse des transactions similaires) et par la méthode par le revenu.</p><h2>3. Valeur estimée</h2><p>La valeur vénale du bien est estimée à <strong>{{valeur_venale}} FCFA</strong> à la date du {{date_expertise}}.</p><h2>4. Réserves et conditions</h2><p>La présente estimation est valable 6 mois et sous réserve de l'absence de servitudes non connues.</p></div>`
  },
  {
    code: 'fonc_rapport_geometre_expert',
    name: "Rapport de Géomètre-Expert",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Rapport technique établi par un géomètre-expert agréé en Côte d'Ivoire, comprenant les levés topographiques et les données cadastrales d'une parcelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'geometre_expert',label:"Géomètre-expert (nom, numéro d'agrément)",type:'text',required:true},
      {key:'client_geometre',label:"Client (donneur d'ordre)",type:'text',required:true},
      {key:'parcelle_etudiee',label:"Parcelle étudiée (références, localisation)",type:'textarea',required:true},
      {key:'travaux_realises',label:"Travaux réalisés (levés, calculs, plans)",type:'textarea',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE GÉOMÈTRE-EXPERT</h1><p><strong>Géomètre-Expert :</strong> {{geometre_expert}}</p><p><strong>Client :</strong> {{client_geometre}}</p><h2>1. Objet de la mission</h2><p>Parcelle concernée : {{parcelle_etudiee}}</p><h2>2. Travaux réalisés</h2><p>{{travaux_realises}}</p><h2>3. Résultats</h2><p>[Tableau des surfaces et coordonnées des points – à compléter avec les annexes graphiques]</p><h2>4. Certification</h2><p>Je soussigné, {{geometre_expert}}, certifie l'exactitude des mesures et calculs présentés dans ce rapport établi le {{date_rapport}}.</p></div>`
  },
  {
    code: 'fonc_convention_morcellement',
    name: "Convention de Morcellement Parcellaire",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Convention organisant le morcellement d'une parcelle en plusieurs lots distincts en Côte d'Ivoire, avec répartition entre co-propriétaires ou acquéreurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'proprietaire_parcelle',label:"Propriétaire de la parcelle initiale",type:'text',required:true},
      {key:'beneficiaires_lots',label:"Bénéficiaires des lots issus du morcellement",type:'textarea',required:true},
      {key:'parcelle_initiale',label:"Références de la parcelle initiale",type:'text',required:true},
      {key:'nombre_lots',label:"Nombre de lots issus du morcellement",type:'text',required:true},
      {key:'date_convention',label:"Date de la convention",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONVENTION DE MORCELLEMENT PARCELLAIRE</h1><p><strong>Propriétaire initial :</strong> {{proprietaire_parcelle}}</p><h2>Article 1 – Parcelle initiale</h2><p>La parcelle référencée {{parcelle_initiale}} est morcelée en {{nombre_lots}} lots distincts.</p><h2>Article 2 – Attribution des lots</h2><p>Les lots sont attribués aux bénéficiaires suivants selon le plan de morcellement annexé : {{beneficiaires_lots}}</p><h2>Article 3 – Formalités</h2><p>Chaque lot fera l'objet d'un titre distinct après accomplissement des formalités administratives et foncières requises.</p><h2>Article 4 – Frais</h2><p>Les frais de morcellement, de bornage et de mutation sont répartis entre les bénéficiaires à proportion de la superficie de leur lot respectif.</p><p>Fait le {{date_convention}}</p></div>`
  },
  {
    code: 'fonc_accord_lotissement_prive',
    name: "Accord de Lotissement Privé",
    category: 'juridique_admin', price: 15000, priceMax: 45000,
    description: "Accord encadrant la réalisation d'un lotissement privé en Côte d'Ivoire, incluant les obligations du lotisseur et les droits des acquéreurs de lots.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'lotisseur',label:"Lotisseur (société ou promoteur)",type:'text',required:true},
      {key:'autorite_approbatrice',label:"Autorité ayant approuvé le lotissement",type:'text',required:true},
      {key:'nom_lotissement',label:"Nom et localisation du lotissement",type:'textarea',required:true},
      {key:'nombre_lots_total',label:"Nombre total de lots",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE LOTISSEMENT PRIVÉ</h1><p><strong>Lotisseur :</strong> {{lotisseur}}</p><p><strong>Autorité approbatrice :</strong> {{autorite_approbatrice}}</p><h2>Article 1 – Présentation du lotissement</h2><p>Le lotissement {{nom_lotissement}} comprend {{nombre_lots_total}} lots à usage résidentiel/commercial selon le plan approuvé.</p><h2>Article 2 – Obligations du lotisseur</h2><p>Le Lotisseur s'engage à réaliser les voiries, réseaux divers (VRD), espaces verts et équipements collectifs conformément au dossier de lotissement approuvé.</p><h2>Article 3 – Cession des lots</h2><p>Chaque lot sera cédé à un acquéreur par acte notarié, après obtention du titre foncier de chaque lot par le Lotisseur.</p><p>Fait le {{date_accord}}</p></div>`
  },
  {
    code: 'fonc_plan_remembrement',
    name: "Plan de Remembrement Foncier",
    category: 'juridique_admin', price: 12000, priceMax: 38000,
    description: "Plan de remembrement foncier rural visant à regrouper des parcelles morcelées pour constituer des exploitations agricoles viables en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'autorite_amenagement',label:"Autorité d'aménagement foncier",type:'text',required:true},
      {key:'zone_remembrement',label:"Zone de remembrement (commune/village)",type:'text',required:true},
      {key:'superficie_totale',label:"Superficie totale concernée (ha)",type:'text',required:true},
      {key:'proprietaires_concernes',label:"Nombre de propriétaires concernés",type:'text',required:true},
      {key:'date_plan',label:"Date d'établissement du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE REMEMBREMENT FONCIER</h1><p><strong>Autorité d'aménagement :</strong> {{autorite_amenagement}}</p><p><strong>Zone concernée :</strong> {{zone_remembrement}}</p><h2>1. Contexte et objectifs</h2><p>Le présent plan de remembrement porte sur {{superficie_totale}} ha et concerne {{proprietaires_concernes}} propriétaires. Il vise à restructurer le parcellaire agricole pour améliorer la productivité.</p><h2>2. Modalités de remembrement</h2><p>Chaque propriétaire reçoit un lot remembré d'une valeur équivalente à la somme de ses parcelles initiales, évaluée par la commission foncière.</p><h2>3. Plan graphique</h2><p>[Carte du parcellaire avant/après remembrement – à joindre en annexe]</p><h2>4. Approbation</h2><p>Plan approuvé le {{date_plan}} par l'Autorité d'aménagement foncier.</p></div>`
  },
  {
    code: 'fonc_accord_amenagement_foncier_rural',
    name: "Accord d'Aménagement Foncier Rural (AFR)",
    category: 'juridique_admin', price: 14000, priceMax: 42000,
    description: "Accord d'aménagement foncier rural regroupant les propriétaires fonciers et les exploitants d'une zone rurale pour optimiser l'usage des terres.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 58,
    fieldsJson: F([
      {key:'commission_afr',label:"Commission d'aménagement foncier rural",type:'text',required:true},
      {key:'zone_afr',label:"Zone d'aménagement foncier rural",type:'text',required:true},
      {key:'objectifs_afr',label:"Objectifs de l'aménagement",type:'textarea',required:true},
      {key:'superficie_afr',label:"Superficie totale de la zone AFR (ha)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD D'AMÉNAGEMENT FONCIER RURAL (AFR)</h1><p><strong>Commission AFR :</strong> {{commission_afr}}</p><p><strong>Zone :</strong> {{zone_afr}} – {{superficie_afr}} ha</p><h2>Article 1 – Objectifs</h2><p>{{objectifs_afr}}</p><h2>Article 2 – Périmètre</h2><p>L'accord s'applique à l'ensemble des parcelles comprises dans la zone AFR délimitée par le plan annexé.</p><h2>Article 3 – Engagements des propriétaires</h2><p>Les propriétaires s'engagent à mettre leurs terres en valeur conformément aux orientations du plan d'aménagement et à participer aux travaux d'infrastructure collective.</p><p>Fait le {{date_accord}}</p></div>`
  },
  {
    code: 'fonc_contrat_prestation_geometre',
    name: "Contrat de Prestation de Géomètre",
    category: 'juridique_admin', price: 7000, priceMax: 20000,
    description: "Contrat de prestation de services topographiques et fonciers entre un géomètre agréé et son client en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 66,
    fieldsJson: F([
      {key:'geometre_prestataire',label:"Géomètre prestataire (nom, agrément)",type:'text',required:true},
      {key:'client_foncier',label:"Client",type:'text',required:true},
      {key:'prestations_demandees',label:"Prestations demandées (levés, bornage, plan, etc.)",type:'textarea',required:true},
      {key:'honoraires_htva',label:"Honoraires HT (FCFA)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PRESTATION DE GÉOMÈTRE</h1><p><strong>Géomètre prestataire :</strong> {{geometre_prestataire}}</p><p><strong>Client :</strong> {{client_foncier}}</p><h2>Article 1 – Prestations</h2><p>Le Géomètre s'engage à réaliser les prestations suivantes : {{prestations_demandees}}</p><h2>Article 2 – Honoraires</h2><p>Les honoraires sont fixés à {{honoraires_htva}} FCFA HT, auxquels s'ajoute la TVA au taux légal en vigueur.</p><h2>Article 3 – Délai</h2><p>Les prestations seront livrées dans un délai défini en annexe technique à compter de la réception de l'acompte de 50%.</p><p>Fait le {{date_contrat}}</p></div>`
  },
  {
    code: 'fonc_acte_division_parcelle',
    name: "Acte de Division de Parcelle",
    category: 'juridique_admin', price: 9000, priceMax: 27000,
    description: "Acte officiel de division d'une parcelle en deux ou plusieurs lots distincts en Côte d'Ivoire, établi après bornage et conformité administrative.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'proprietaire_division',label:"Propriétaire de la parcelle à diviser",type:'text',required:true},
      {key:'references_parcelle_mere',label:"Références de la parcelle mère",type:'text',required:true},
      {key:'lots_resultants',label:"Description des lots résultants (superficie, références)",type:'textarea',required:true},
      {key:'geometre_division',label:"Géomètre ayant procédé à la division",type:'text',required:true},
      {key:'date_acte',label:"Date de l'acte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACTE DE DIVISION DE PARCELLE</h1><p><strong>Propriétaire :</strong> {{proprietaire_division}}</p><p><strong>Parcelle mère :</strong> {{references_parcelle_mere}}</p><h2>Article 1 – Division</h2><p>La parcelle mère est divisée en plusieurs lots selon le plan établi par {{geometre_division}} :</p><p>{{lots_resultants}}</p><h2>Article 2 – Conformité</h2><p>La division a été effectuée conformément à la réglementation d'urbanisme applicable et aux prescriptions du service compétent.</p><h2>Article 3 – Formalités</h2><p>Chaque lot fera l'objet d'une immatriculation distincte au livre foncier.</p><p>Fait le {{date_acte}}</p></div>`
  },
  {
    code: 'fonc_accord_preemption_fonciere',
    name: "Accord de Préemption Foncière",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Accord par lequel un bénéficiaire exerce ou renonce à son droit de préemption sur un bien foncier mis en vente en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'vendeur_preemption',label:"Vendeur du bien",type:'text',required:true},
      {key:'titulaire_preemption',label:"Titulaire du droit de préemption",type:'text',required:true},
      {key:'bien_preempte',label:"Description du bien mis en vente",type:'textarea',required:true},
      {key:'prix_vente_notifie',label:"Prix de vente notifié (FCFA)",type:'text',required:true},
      {key:'decision_preemption',label:"Décision : exercice ou renonciation au droit de préemption",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRÉEMPTION FONCIÈRE</h1><p><strong>Vendeur :</strong> {{vendeur_preemption}}</p><p><strong>Titulaire du droit de préemption :</strong> {{titulaire_preemption}}</p><h2>Article 1 – Bien concerné</h2><p>{{bien_preempte}} est mis en vente au prix de {{prix_vente_notifie}} FCFA.</p><h2>Article 2 – Décision</h2><p>Le Titulaire du droit de préemption décide : {{decision_preemption}}</p><h2>Article 3 – Effets</h2><p>En cas d'exercice du droit de préemption, le Titulaire se substitue à l'acquéreur pressenti aux mêmes prix et conditions. En cas de renonciation, le Vendeur est libre de vendre à tout tiers.</p><p>Fait le {{date_accord}}</p></div>`
  },
  {
    code: 'fonc_demande_immatriculation',
    name: "Demande d'Immatriculation au Livre Foncier",
    category: 'juridique_admin', price: 7000, priceMax: 20000,
    description: "Demande d'immatriculation d'une propriété immobilière au livre foncier de Côte d'Ivoire, auprès de la Conservation Foncière compétente.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 82,
    fieldsJson: F([
      {key:'requerant_immatriculation',label:"Requérant (nom, prénom, qualité)",type:'text',required:true},
      {key:'conservation_fonciere',label:"Conservation Foncière compétente",type:'text',required:true},
      {key:'immeuble_immatriculer',label:"Description de l'immeuble à immatriculer",type:'textarea',required:true},
      {key:'titre_detenu',label:"Titre de propriété ou droit invoqué",type:'textarea',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>DEMANDE D'IMMATRICULATION AU LIVRE FONCIER</h1><p><strong>À Monsieur le Conservateur Foncier</strong><br>{{conservation_fonciere}}</p><p>Je soussigné(e), <strong>{{requerant_immatriculation}}</strong>, sollicite l'immatriculation au Livre Foncier de l'immeuble suivant :</p><h2>Description de l'immeuble</h2><p>{{immeuble_immatriculer}}</p><h2>Titre invoqué</h2><p>{{titre_detenu}}</p><h2>Documents joints</h2><ul><li>Plan de bornage certifié par géomètre agréé</li><li>Procès-verbal de bornage contradictoire</li><li>Avis de mise en demeure des riverains</li><li>Pièces d'état civil du requérant</li><li>Tout document prouvant le droit invoqué</li></ul><p>Fait le {{date_demande}}</p><p>Signature du requérant : _______________</p></div>`
  },
  {
    code: 'fonc_purge_droits_coutumiers',
    name: "Procédure de Purge des Droits Coutumiers",
    category: 'juridique_admin', price: 12000, priceMax: 38000,
    description: "Document encadrant la procédure de purge des droits coutumiers préalable à l'immatriculation d'une terre au livre foncier en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'initiateur_purge',label:"Initiateur de la procédure de purge",type:'text',required:true},
      {key:'terre_concernee',label:"Terre concernée (localisation, superficie)",type:'textarea',required:true},
      {key:'detenteurs_droits',label:"Détenteurs de droits coutumiers identifiés",type:'textarea',required:true},
      {key:'indemnisation_prevue',label:"Indemnisation prévue (FCFA ou autre)",type:'text',required:true},
      {key:'date_procedure',label:"Date de la procédure",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PROCÉDURE DE PURGE DES DROITS COUTUMIERS</h1><p><strong>Initiateur :</strong> {{initiateur_purge}}</p><h2>1. Terre concernée</h2><p>{{terre_concernee}}</p><h2>2. Identification des détenteurs de droits coutumiers</h2><p>{{detenteurs_droits}}</p><h2>3. Notification et consultation</h2><p>Les détenteurs de droits ont été notifiés et consultés conformément aux procédures en vigueur. Un procès-verbal de consultation est annexé.</p><h2>4. Indemnisation</h2><p>Une indemnisation de {{indemnisation_prevue}} a été proposée et acceptée/refusée (préciser) par les détenteurs.</p><h2>5. Conclusion</h2><p>À l'issue de la procédure de purge, la voie est libre pour l'immatriculation de la terre au Livre Foncier.</p><p>Fait le {{date_procedure}}</p></div>`
  },
  {
    code: 'fonc_accord_compensation_fonciere',
    name: "Accord de Compensation Foncière (Expropriation)",
    category: 'juridique_admin', price: 14000, priceMax: 42000,
    description: "Accord fixant les modalités de compensation des propriétaires et occupants d'un terrain exproprié pour cause d'utilité publique en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'autorite_expropriante',label:"Autorité expropriante",type:'text',required:true},
      {key:'exproprie',label:"Propriétaire/Occupant exproprié",type:'text',required:true},
      {key:'bien_exproprie',label:"Bien exproprié (description, superficie)",type:'textarea',required:true},
      {key:'montant_indemnite',label:"Montant de l'indemnité de compensation (FCFA)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord de compensation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE COMPENSATION FONCIÈRE – EXPROPRIATION POUR CAUSE D'UTILITÉ PUBLIQUE</h1><p><strong>Autorité expropriante :</strong> {{autorite_expropriante}}</p><p><strong>Exproprié :</strong> {{exproprie}}</p><h2>Article 1 – Bien exproprié</h2><p>{{bien_exproprie}}</p><h2>Article 2 – Indemnité de compensation</h2><p>L'Autorité expropriante verse à l'Exproprié une indemnité de {{montant_indemnite}} FCFA, représentant la valeur vénale du bien et les préjudices accessoires.</p><h2>Article 3 – Prise de possession</h2><p>L'Exproprié s'engage à libérer le bien dans un délai de 90 jours à compter du versement de l'indemnité.</p><h2>Article 4 – Renonciation aux recours</h2><p>Moyennant le versement de l'indemnité convenue, l'Exproprié renonce à tout recours contentieux relatif à la présente expropriation.</p><p>Fait le {{date_accord}}</p></div>`
  },
  {
    code: 'fonc_recours_decision_fonciere',
    name: "Recours contre une Décision Foncière",
    category: 'juridique_admin', price: 8000, priceMax: 22000,
    description: "Modèle de recours administratif ou contentieux formé contre une décision d'attribution, d'annulation ou de refus relative à un droit foncier en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'requerant_recours',label:"Requérant (nom, qualité)",type:'text',required:true},
      {key:'autorite_saisie',label:"Autorité saisie du recours",type:'text',required:true},
      {key:'decision_contestee',label:"Décision contestée (référence, date, objet)",type:'textarea',required:true},
      {key:'moyens_recours',label:"Moyens et arguments du recours",type:'textarea',required:true},
      {key:'date_recours',label:"Date du recours",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RECOURS CONTRE UNE DÉCISION FONCIÈRE</h1><p><strong>Requérant :</strong> {{requerant_recours}}</p><p><strong>À :</strong> {{autorite_saisie}}</p><h2>Objet : Recours contre la décision foncière</h2><p>Je, soussigné(e) {{requerant_recours}}, conteste la décision suivante : {{decision_contestee}}</p><h2>Moyens du recours</h2><p>{{moyens_recours}}</p><h2>Demande</h2><p>En conséquence, je sollicite l'annulation/la modification (préciser) de ladite décision et la reconnaissance de mes droits fonciers.</p><p>Fait le {{date_recours}}</p><p>Signature : _______________</p></div>`
  },
  {
    code: 'fonc_charte_fonciere_locale',
    name: "Charte Foncière Locale (CFL)",
    category: 'juridique_admin', price: 10000, priceMax: 30000,
    description: "Charte foncière locale élaborée par les acteurs d'un terroir villageois ivoirien pour réguler l'accès à la terre et prévenir les conflits fonciers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'village_terroir',label:"Village ou terroir concerné",type:'text',required:true},
      {key:'acteurs_signataires',label:"Acteurs signataires de la charte",type:'textarea',required:true},
      {key:'regles_acces_terre',label:"Règles d'accès à la terre définies",type:'textarea',required:true},
      {key:'mecanisme_resolution',label:"Mécanisme local de résolution des conflits",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption de la charte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE FONCIÈRE LOCALE (CFL)</h1><h2>Terroir de {{village_terroir}}</h2><p><strong>Acteurs signataires :</strong> {{acteurs_signataires}}</p><h2>Préambule</h2><p>Les acteurs du terroir de {{village_terroir}}, conscients de l'importance de la sécurité foncière pour la paix sociale et le développement agricole, adoptent la présente Charte Foncière Locale.</p><h2>Article 1 – Règles d'accès à la terre</h2><p>{{regles_acces_terre}}</p><h2>Article 2 – Droits des autochtones et des allochtones</h2><p>La charte définit les droits respectifs des propriétaires coutumiers autochtones et des exploitants allochtones ou étrangers, dans le respect de la loi nationale.</p><h2>Article 3 – Résolution des conflits</h2><p>{{mecanisme_resolution}}</p><h2>Article 4 – Révision</h2><p>La présente charte est révisable par consensus des acteurs signataires.</p><p>Adoptée le {{date_adoption}}</p></div>`
  }
];
async function main() {
  let created = 0, updated = 0;
  for (const t of templates) {
    const ex = await prisma.documentTemplate.findUnique({ where: { code: t.code } });
    await prisma.documentTemplate.upsert({ where: { code: t.code }, update: t, create: t });
    if (ex) updated++; else created++;
  }
  const total = await prisma.documentTemplate.count();
  console.log(`Batch 44a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
