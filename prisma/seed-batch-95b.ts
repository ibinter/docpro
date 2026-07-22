import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── FORÊTS (25 templates) ──────────────────────────────────────────────────
  {
    code: 'for_pef_ci', name: "Accord de permis d'exploitation forestiere (PEF CI)",
    category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Accord encadrant l'attribution et les conditions d'un permis d'exploitation forestiere delivre par les autorites ivoiriennes (SODEFOR/MINEF).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'titulaire',label:"Titulaire du permis (raison sociale)",type:'text',required:true},
      {key:'zone_exploitation',label:"Zone forestiere concernee (departement/foret classee)",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie autorisee (hectares)",type:'text',required:true},
      {key:'date_debut',label:"Date de debut de validite",type:'date',required:true},
      {key:'date_fin',label:"Date d'expiration du permis",type:'date',required:true},
      {key:'volume_autorise',label:"Volume de bois autorise (m3)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PERMIS D'EXPLOITATION FORESTIERE</h1><h2>Republique de Cote d'Ivoire — SODEFOR / MINEF</h2><p><strong>Titulaire :</strong> {{titulaire}}</p><p><strong>Zone forestiere :</strong> {{zone_exploitation}}</p><p><strong>Superficie autorisee :</strong> {{superficie_ha}} hectares</p><p><strong>Periode de validite :</strong> du {{date_debut}} au {{date_fin}}</p><p><strong>Volume autorise :</strong> {{volume_autorise}} m3</p><h3>Article 1 — Objet</h3><p>Le present accord confere au titulaire le droit d'exploiter les ressources forestieres dans la zone delimitee, dans le strict respect du Code Forestier ivoirien et du plan d'amenagement approuve.</p><h3>Article 2 — Obligations du titulaire</h3><p>Le titulaire s'engage a respecter les quotas d'abattage, a effectuer les reboisements compensatoires imposes et a s'acquitter des taxes forestieres reglementaires.</p><h3>Article 3 — Controles</h3><p>Les agents de la SODEFOR et du MINEF disposent d'un droit d'acces permanent aux zones d'exploitation pour tout controle.</p><p class="signature">Fait a Abidjan, le ____________________</p><p>Le Directeur General de la SODEFOR &nbsp;&nbsp;&nbsp;&nbsp; Le Titulaire</p></div>`
  },
  {
    code: 'for_paf', name: "Accord de plan d'amenagement forestier (PAF)",
    category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Document contractuel definissant les orientations de gestion durable d'une unite forestiere sur une periode pluriannuelle conforme aux normes OHADA et MINEF.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'gestionnaire',label:"Organisme gestionnaire",type:'text',required:true},
      {key:'unite_forestiere',label:"Denomination de l'unite forestiere",type:'text',required:true},
      {key:'duree_plan',label:"Duree du plan (annees)",type:'text',required:true},
      {key:'date_approbation',label:"Date d'approbation ministerielle",type:'date',required:true},
      {key:'objectif_production',label:"Objectif de production annuelle (m3/an)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>PLAN D'AMENAGEMENT FORESTIER</h1><p><strong>Gestionnaire :</strong> {{gestionnaire}}</p><p><strong>Unite forestiere :</strong> {{unite_forestiere}}</p><p><strong>Duree du plan :</strong> {{duree_plan}} ans</p><p><strong>Date d'approbation :</strong> {{date_approbation}}</p><p><strong>Objectif de production :</strong> {{objectif_production}} m3/an</p><h3>Chapitre 1 — Diagnostic de l'etat de la foret</h3><p>Un inventaire exhaustif des essences, volumes et etats sanitaires a ete realise prealablement a la redaction du present plan.</p><h3>Chapitre 2 — Programmation des activites</h3><p>Le plan integre les rotations d'abattage, les mesures de regeneration naturelle assistee et les obligations de reboisement compensatoire.</p><h3>Chapitre 3 — Suivi et evaluation</h3><p>Un rapport annuel de suivi sera transmis au MINEF avant le 31 mars de chaque annee civile.</p><p class="signature">Approuve le {{date_approbation}}</p></div>`
  },
  {
    code: 'for_cfr_ci', name: "Accord de concession forestiere rurale (CFR CI)",
    category: 'agro_environnement', price: 9000, priceMax: 27000,
    description: "Contrat de concession attribuant a un operateur prive le droit d'exploiter une foret rurale en Cote d'Ivoire sur la base d'un cahier des charges strict.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'concessionnaire',label:"Nom du concessionnaire",type:'text',required:true},
      {key:'localite',label:"Localite / village riverain",type:'text',required:true},
      {key:'superficie',label:"Superficie concedee (ha)",type:'text',required:true},
      {key:'redevance_annuelle',label:"Redevance annuelle (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONCESSION FORESTIERE RURALE</h1><p><strong>Concessionnaire :</strong> {{concessionnaire}}</p><p><strong>Localite :</strong> {{localite}}</p><p><strong>Superficie :</strong> {{superficie}} ha</p><p><strong>Redevance annuelle :</strong> {{redevance_annuelle}} FCFA</p><p><strong>Date de signature :</strong> {{date_signature}}</p><h3>Article 1 — Objet de la concession</h3><p>L'Etat ivoirien accorde au concessionnaire le droit d'exploiter la zone forestiere rurale definie en annexe cadastrale, pour une duree renouvelable de 25 ans.</p><h3>Article 2 — Obligations sociales</h3><p>Le concessionnaire s'engage a employer en priorite la main-d'oeuvre locale et a reverser 10 % de la redevance aux communautes riveraines.</p><h3>Article 3 — Resiliation</h3><p>Tout non-respect du cahier des charges entraine la resiliation de plein droit apres mise en demeure restee sans suite pendant 30 jours.</p><p class="signature">Fait a Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'for_reboisement', name: "Accord de service de reboisement et plantation forestiere",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Contrat de prestation pour la realisation d'operations de reboisement et de plantation en zone forestiere ivoirienne, conforme aux normes SODEFOR.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'prestataire',label:"Entreprise prestataire",type:'text',required:true},
      {key:'commanditaire',label:"Commanditaire (SODEFOR / entreprise)",type:'text',required:true},
      {key:'essences',label:"Essences a planter",type:'text',required:true},
      {key:'superficie_reboisement',label:"Superficie a reboiser (ha)",type:'text',required:true},
      {key:'delai_execution',label:"Delai d'execution (mois)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE REBOISEMENT ET PLANTATION FORESTIERE</h1><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Commanditaire :</strong> {{commanditaire}}</p><p><strong>Essences :</strong> {{essences}}</p><p><strong>Superficie :</strong> {{superficie_reboisement}} ha</p><p><strong>Delai d'execution :</strong> {{delai_execution}} mois</p><h3>Article 1 — Objet</h3><p>Le prestataire s'engage a realiser les travaux de reboisement selon les specifications techniques jointes en annexe.</p><h3>Article 2 — Taux de reprise</h3><p>Un taux de reprise minimum de 85 % est exige a 12 mois. En cas d'echec, le prestataire procedera aux regarnissages a ses frais.</p><h3>Article 3 — Reception</h3><p>La reception definitive intervient apres constat contradictoire entre les parties et validation du taux de reprise.</p><p class="signature">Signatures des parties</p></div>`
  },
  {
    code: 'for_fsc', name: "Accord de service de certification FSC (foresterie durable)",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat d'accompagnement et de conseil en vue de l'obtention de la certification FSC pour une unite de gestion forestiere en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'cabinet_conseil',label:"Cabinet de conseil FSC",type:'text',required:true},
      {key:'operateur',label:"Operateur forestier candidat",type:'text',required:true},
      {key:'perimetre_certification',label:"Perimetre de certification (ha)",type:'text',required:true},
      {key:'duree_mission',label:"Duree de la mission (mois)",type:'text',required:true},
      {key:'honoraires',label:"Honoraires (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION FSC</h1><p><strong>Cabinet conseil :</strong> {{cabinet_conseil}}</p><p><strong>Operateur :</strong> {{operateur}}</p><p><strong>Perimetre :</strong> {{perimetre_certification}} ha</p><p><strong>Duree :</strong> {{duree_mission}} mois</p><p><strong>Honoraires :</strong> {{honoraires}} FCFA</p><h3>Article 1 — Prestations</h3><p>Le cabinet accompagne l'operateur dans la mise en conformite avec les 10 principes FSC, la preparation au pre-audit et l'audit de certification par un organisme accredite.</p><h3>Article 2 — Livrables</h3><p>Rapport de diagnostic, plan d'action correctif, dossier de demande de certification, rapport de suivi annuel.</p><h3>Article 3 — Responsabilite</h3><p>Le cabinet ne garantit pas l'obtention de la certification ; il garantit la qualite de l'accompagnement conforme aux referentiels FSC en vigueur.</p><p class="signature">Fait a Abidjan</p></div>`
  },
  {
    code: 'for_pefc', name: "Accord de service de certification PEFC",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat de prestation pour la mise en oeuvre du referentiel PEFC (Programme de Reconnaissance des Certifications Forestieres) en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'consultant',label:"Consultant PEFC",type:'text',required:true},
      {key:'beneficiaire',label:"Beneficiaire (cooperative / entreprise)",type:'text',required:true},
      {key:'foret_concernee',label:"Foret concernee",type:'text',required:true},
      {key:'budget_total',label:"Budget total (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION PEFC</h1><p><strong>Consultant :</strong> {{consultant}}</p><p><strong>Beneficiaire :</strong> {{beneficiaire}}</p><p><strong>Foret concernee :</strong> {{foret_concernee}}</p><p><strong>Budget total :</strong> {{budget_total}} FCFA</p><h3>Article 1 — Objet</h3><p>Le consultant accompagne le beneficiaire dans la mise en conformite avec le standard PEFC applicable en Afrique de l'Ouest, incluant la gestion durable, la tracabilite et l'engagement communautaire.</p><h3>Article 2 — Calendrier</h3><p>Les etapes cles (diagnostic, formation, audit interne, audit de certification) sont detaillees dans le plan de travail annex au present accord.</p><p class="signature">Fait a Abidjan</p></div>`
  },
  {
    code: 'for_inventaire', name: "Accord de service d'inventaire forestier (SODEFOR modele)",
    category: 'agro_environnement', price: 5000, priceMax: 16000,
    description: "Contrat de prestation d'inventaire forestier selon la methodologie SODEFOR, incluant dendrometrie, cartographie et base de donnees des ressources ligneuses.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'equipe_inventaire',label:"Equipe d'inventaire (chef de mission)",type:'text',required:true},
      {key:'zone_inventaire',label:"Zone d'inventaire",type:'text',required:true},
      {key:'methode',label:"Methode d'echantillonnage",type:'text',required:true},
      {key:'date_debut_terrain',label:"Date de debut des travaux terrain",type:'date',required:true},
      {key:'livraison_rapport',label:"Date de livraison du rapport final",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INVENTAIRE FORESTIER</h1><p><strong>Chef de mission :</strong> {{equipe_inventaire}}</p><p><strong>Zone :</strong> {{zone_inventaire}}</p><p><strong>Methode :</strong> {{methode}}</p><p><strong>Debut terrain :</strong> {{date_debut_terrain}}</p><p><strong>Livraison rapport :</strong> {{livraison_rapport}}</p><h3>Article 1 — Prestations</h3><p>L'inventaire comprend : installation des placettes, mesures dendrometriques (DHP, hauteur, qualite), identification botanique, saisie et traitement des donnees, cartographie des types de vegetation.</p><h3>Article 2 — Livrables</h3><p>Base de donnees SIG, rapport de synthese, tables de volume par essence et par classe de diametre.</p><p class="signature">Approuve par le Maître d'ouvrage</p></div>`
  },
  {
    code: 'for_scierie', name: "Accord de service de scierie et transformation du bois",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Contrat de prestation de sciage et de premiere transformation du bois d'oeuvre entre un exploitant forestier et une unite industrielle de scierie en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'scierie',label:"Denomination de la scierie",type:'text',required:true},
      {key:'fournisseur_bois',label:"Fournisseur de grumes",type:'text',required:true},
      {key:'volume_mensuel',label:"Volume mensuel traite (m3)",type:'text',required:true},
      {key:'essences_scies',label:"Essences concernees",type:'text',required:true},
      {key:'prix_sciage',label:"Prix de sciage (FCFA/m3)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SCIERIE ET TRANSFORMATION DU BOIS</h1><p><strong>Scierie :</strong> {{scierie}}</p><p><strong>Fournisseur :</strong> {{fournisseur_bois}}</p><p><strong>Volume mensuel :</strong> {{volume_mensuel}} m3</p><p><strong>Essences :</strong> {{essences_scies}}</p><p><strong>Prix de sciage :</strong> {{prix_sciage}} FCFA/m3</p><h3>Article 1 — Objet</h3><p>La scierie s'engage a transformer les grumes fournies en avivees, plots et chevrons selon les specifications dimensionnelles definies en annexe technique.</p><h3>Article 2 — Controle qualite</h3><p>Un controle contradictoire du rendement matiere est effectue mensuellement. Le rendement minimum garantit est de 45 %.</p><h3>Article 3 — Paiement</h3><p>Le fournisseur regle la prestation dans les 30 jours suivant la livraison de la production scaee.</p><p class="signature">Signatures des parties</p></div>`
  },
  {
    code: 'for_bois_oeuvre', name: "Accord de service d'exploitation de bois d'oeuvre (grume, plot, avivee)",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat encadrant les operations d'abattage, de debardage et de premiere transformation du bois d'oeuvre en Cote d'Ivoire dans le respect du code forestier OHADA.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'exploitant',label:"Exploitant forestier",type:'text',required:true},
      {key:'parcelle',label:"Parcelle / assiette de coupe",type:'text',required:true},
      {key:'essences_cibles',label:"Essences cibles (grumes)",type:'text',required:true},
      {key:'volume_prevu',label:"Volume previsionnel (m3)",type:'text',required:true},
      {key:'date_debut_abattage',label:"Date de debut d'abattage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXPLOITATION DE BOIS D'OEUVRE</h1><p><strong>Exploitant :</strong> {{exploitant}}</p><p><strong>Parcelle :</strong> {{parcelle}}</p><p><strong>Essences cibles :</strong> {{essences_cibles}}</p><p><strong>Volume previsionnel :</strong> {{volume_prevu}} m3</p><p><strong>Debut d'abattage :</strong> {{date_debut_abattage}}</p><h3>Article 1 — Conditions d'abattage</h3><p>L'abattage est realise selon la technique de l'abattage directionnel a faible impact (ADFI), avec marquage prealable des arbres a couper par un agent assermente.</p><h3>Article 2 — Tracabilite</h3><p>Chaque grume est numerotee et inscrite sur le carnet de chantier conforme au modele SODEFOR avant tout transport.</p><h3>Article 3 — Taxes et redevances</h3><p>L'exploitant s'acquitte de toutes les taxes forestieres avant chargement. Les documents fiscaux sont joints au bon de transport.</p><p class="signature">Fait sur site, date d'abattage {{date_debut_abattage}}</p></div>`
  },
  {
    code: 'for_bois_chauffe', name: "Accord de service d'exploitation de bois de chauffe et charbon",
    category: 'agro_environnement', price: 2500, priceMax: 7500,
    description: "Contrat encadrant la production et la commercialisation de bois de chauffe et de charbon de bois dans le respect des quotas environnementaux ivoiriens.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 50,
    fieldsJson: F([
      {key:'producteur',label:"Producteur / charbonnier",type:'text',required:true},
      {key:'zone_prelevement',label:"Zone de prelevement",type:'text',required:true},
      {key:'quota_mensuel',label:"Quota mensuel autorise (steres ou sacs)",type:'text',required:true},
      {key:'acheteur',label:"Acheteur principal",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXPLOITATION DE BOIS DE CHAUFFE ET CHARBON</h1><p><strong>Producteur :</strong> {{producteur}}</p><p><strong>Zone de prelevement :</strong> {{zone_prelevement}}</p><p><strong>Quota mensuel :</strong> {{quota_mensuel}}</p><p><strong>Acheteur :</strong> {{acheteur}}</p><h3>Article 1 — Especes autorisees</h3><p>Seules les especes non protegees et les arbres morts ou abattus lors des defrichements agricoles autorises sont exploitables.</p><h3>Article 2 — Interdictions</h3><p>Il est strictement interdit de prelevre dans les forets classees, les galeries forestieres et les zones tampons des aires protegees.</p><h3>Article 3 — Traçabilite</h3><p>Chaque chargement est accompagne d'un laissez-passer delivre par les Eaux et Forets de la circonscription competente.</p><p class="signature">Signatures des parties</p></div>`
  },
  {
    code: 'for_agroforesterie', name: "Accord de service d'agroforesterie (cacao-foret)",
    category: 'agro_environnement', price: 3500, priceMax: 10500,
    description: "Contrat de conseil et d'accompagnement technique pour la mise en place de systemes agroforestiers integrant cacao et arbres forestiers selon le modele cacao-foret de Cote d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'consultant_af',label:"Consultant agroforestier",type:'text',required:true},
      {key:'planteur',label:"Planteur / groupement de planteurs",type:'text',required:true},
      {key:'superficie_af',label:"Superficie a convertir (ha)",type:'text',required:true},
      {key:'essences_ombrage',label:"Essences d'ombrage prevues",type:'text',required:true},
      {key:'duree_accompagnement',label:"Duree d'accompagnement (ans)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AGROFORESTERIE CACAO-FORET</h1><p><strong>Consultant :</strong> {{consultant_af}}</p><p><strong>Planteur :</strong> {{planteur}}</p><p><strong>Superficie :</strong> {{superficie_af}} ha</p><p><strong>Essences d'ombrage :</strong> {{essences_ombrage}}</p><p><strong>Duree d'accompagnement :</strong> {{duree_accompagnement}} ans</p><h3>Article 1 — Objet</h3><p>Le consultant appuie le planteur dans la conversion de sa plantation cacaoyere vers un systeme agroforestier conforme au Plan National de Developpement (PND) et au dispositif Cacao-Foret de Cote d'Ivoire.</p><h3>Article 2 — Engagements du planteur</h3><p>Le planteur s'engage a ne pas abattre de nouveaux arbres forestiers et a integrer les essences d'ombrage prescrites dans le calendrier de plantation convenu.</p><h3>Article 3 — Suivi</h3><p>Deux visites de suivi par an sont realisees avec elaboration d'un rapport contradictoire remis au commanditaire.</p><p class="signature">Signatures des parties</p></div>`
  },
  {
    code: 'for_pfnl', name: "Accord de service de valorisation des produits forestiers non ligneux (PFNL)",
    category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Contrat de prestation pour la collecte, la transformation et la commercialisation des produits forestiers non ligneux (champignons, fruits, miel, resines, plantes medicinales) en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'collecteur',label:"Collecteur ou groupement de collecteurs",type:'text',required:true},
      {key:'pfnl_cibles',label:"PFNL cibles (types de produits)",type:'text',required:true},
      {key:'zone_collecte',label:"Zone de collecte autorisee",type:'text',required:true},
      {key:'quota_annuel',label:"Quota annuel estime (kg ou unites)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VALORISATION DES PRODUITS FORESTIERS NON LIGNEUX (PFNL)</h1><p><strong>Collecteur :</strong> {{collecteur}}</p><p><strong>PFNL cibles :</strong> {{pfnl_cibles}}</p><p><strong>Zone de collecte :</strong> {{zone_collecte}}</p><p><strong>Quota annuel :</strong> {{quota_annuel}}</p><h3>Article 1 — Objet</h3><p>Le present accord organise les conditions de collecte durable des PFNL dans la zone definie, en conformite avec les autorisations delivrees par les Eaux et Forets.</p><h3>Article 2 — Durabilite</h3><p>Les techniques de collecte respectent le renouvellement naturel des ressources. Tout prelevement destructif est interdit.</p><h3>Article 3 — Partage des benefices</h3><p>Un pourcentage des recettes nettes, defini en annexe financiere, est reverse au fonds de gestion communautaire de la foret.</p><p class="signature">Signatures des parties</p></div>`
  },
  {
    code: 'for_redd', name: "Accord de service de suivi de la REDD+ (reduction emissions deforestation)",
    category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Contrat de prestation technique pour la mise en oeuvre du suivi, du rapportage et de la verification (MRV) des activites REDD+ en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'operateur_mrv',label:"Operateur MRV (bureau d'etudes)",type:'text',required:true},
      {key:'porteur_projet',label:"Porteur de projet REDD+",type:'text',required:true},
      {key:'zone_redd',label:"Zone du projet REDD+ (ha)",type:'text',required:true},
      {key:'periode_suivi',label:"Periode de suivi (annees)",type:'text',required:true},
      {key:'standard_verification',label:"Standard de verification (VCS, Gold Standard...)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUIVI REDD+</h1><p><strong>Operateur MRV :</strong> {{operateur_mrv}}</p><p><strong>Porteur de projet :</strong> {{porteur_projet}}</p><p><strong>Zone du projet :</strong> {{zone_redd}} ha</p><p><strong>Periode de suivi :</strong> {{periode_suivi}} ans</p><p><strong>Standard de verification :</strong> {{standard_verification}}</p><h3>Article 1 — Prestations MRV</h3><p>L'operateur realise les mesures de stocks de carbone, le suivi de la couverture forestiere par teledetection, la collecte des donnees sociales et la redaction des rapports de verification selon le standard choisi.</p><h3>Article 2 — Reporting</h3><p>Les rapports annuels de suivi sont transmis au Fonds National REDD+ et au verificateur independant dans les delais contractuels.</p><h3>Article 3 — Confidentialite</h3><p>Les donnees collectees sont la propriete du porteur de projet. L'operateur s'engage a ne pas les divulguer a des tiers sans autorisation ecrite.</p><p class="signature">Signe a Abidjan</p></div>`
  },
  {
    code: 'for_vente_bois_certifie', name: "Accord de vente de bois certifie",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat de vente commerciale de bois certifie FSC ou PEFC entre un exploitant forestier certifie et un acheteur industriel ou distributeur en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'vendeur',label:"Vendeur (exploitant certifie)",type:'text',required:true},
      {key:'acheteur_bois',label:"Acheteur",type:'text',required:true},
      {key:'essence_vendue',label:"Essence et categorie de bois",type:'text',required:true},
      {key:'volume_vente',label:"Volume vendu (m3)",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix unitaire (FCFA/m3)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENTE DE BOIS CERTIFIE</h1><p><strong>Vendeur :</strong> {{vendeur}}</p><p><strong>Acheteur :</strong> {{acheteur_bois}}</p><p><strong>Essence / categorie :</strong> {{essence_vendue}}</p><p><strong>Volume :</strong> {{volume_vente}} m3</p><p><strong>Prix unitaire :</strong> {{prix_unitaire}} FCFA/m3</p><h3>Article 1 — Garantie de certification</h3><p>Le vendeur garantit que le bois objet du present contrat est issu d'une unite de gestion detenant un certificat FSC ou PEFC en cours de validite et fournit copie du certificat en annexe.</p><h3>Article 2 — Chaine de custodie</h3><p>L'acheteur s'engage a maintenir la chaine de custodie dans le cadre de sa propre certification et a ne pas melanger le bois certifie avec du bois non certifie.</p><h3>Article 3 — Conditions de paiement</h3><p>Le paiement est effectue par virement bancaire dans les 45 jours suivant la livraison et reception conforme.</p><p class="signature">Fait a Abidjan</p></div>`
  },
  {
    code: 'for_export_oibt', name: "Accord d'export de bois (agrements OIBT)",
    category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Contrat d'exportation de bois tropical conforme aux exigences de l'Organisation Internationale des Bois Tropicaux (OIBT) et aux reglementations FLEGT/UE.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'exportateur',label:"Exportateur agree",type:'text',required:true},
      {key:'importateur',label:"Importateur (pays destinataire)",type:'text',required:true},
      {key:'port_embarquement',label:"Port d'embarquement",type:'text',required:true},
      {key:'quantite_export',label:"Quantite exportee (m3 ou tonnes)",type:'text',required:true},
      {key:'numero_agrement',label:"Numero d'agrement d'exportation",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD D'EXPORTATION DE BOIS TROPICAL — AGREMENT OIBT</h1><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Importateur :</strong> {{importateur}}</p><p><strong>Port d'embarquement :</strong> {{port_embarquement}}</p><p><strong>Quantite :</strong> {{quantite_export}}</p><p><strong>Agrement n° :</strong> {{numero_agrement}}</p><h3>Article 1 — Conformite reglementaire</h3><p>L'exportateur atteste que le bois est legalement produit au sens du Reglement Bois de l'UE (RBUE) et du systeme FLEGT, avec fourniture des autorisations FLEGT et CITES le cas echeant.</p><h3>Article 2 — Documents d'accompagnement</h3><p>Le chargement est accompagne du certificat phytosanitaire, du permis d'exportation, du certificat d'origine et du certificat de controle OIBT.</p><h3>Article 3 — Garantie legale</h3><p>L'importateur dispose d'un recours en cas de non-conformite constatee dans les 60 jours apres reception au port de destination.</p><p class="signature">Fait a Abidjan / {{port_embarquement}}</p></div>`
  },
  {
    code: 'for_flegt', name: "Accord de service de lutte contre l'abattage illegal (FLEGT)",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat de prestation de conseil et de surveillance pour la mise en oeuvre du Plan d'Action FLEGT (Forest Law Enforcement, Governance and Trade) en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'organisme_surveillance',label:"Organisme de surveillance independant",type:'text',required:true},
      {key:'zone_surveillance',label:"Zone de surveillance",type:'text',required:true},
      {key:'duree_contrat',label:"Duree du contrat (mois)",type:'text',required:true},
      {key:'budget_surveillance',label:"Budget alloue (FCFA)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LUTTE CONTRE L'ABATTAGE ILLEGAL — FLEGT</h1><p><strong>Organisme de surveillance :</strong> {{organisme_surveillance}}</p><p><strong>Zone :</strong> {{zone_surveillance}}</p><p><strong>Duree :</strong> {{duree_contrat}} mois</p><p><strong>Budget :</strong> {{budget_surveillance}} FCFA</p><h3>Article 1 — Missions</h3><p>L'organisme assure la surveillance des titres d'exploitation, la verification de la legalite des abattages, le signalement des infractions et la coordination avec les forces de l'ordre forestieres.</p><h3>Article 2 — Rapportage</h3><p>Un rapport mensuel d'activite est transmis au MINEF et a la plateforme nationale FLEGT de Cote d'Ivoire.</p><h3>Article 3 — Independance</h3><p>L'organisme garantit son independance vis-a-vis des operateurs forestiers actifs dans la zone de surveillance.</p><p class="signature">Fait a Abidjan</p></div>`
  },
  {
    code: 'for_cartographie_sig', name: "Accord de service de cartographie forestiere (SIG)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat de prestation de cartographie et de systeme d'information geographique (SIG) applique a la gestion des ressources forestieres en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'prestataire_sig',label:"Prestataire SIG",type:'text',required:true},
      {key:'client_sig',label:"Client (SODEFOR / ONG / entreprise)",type:'text',required:true},
      {key:'etendue_cartographie',label:"Etendue a cartographier (ha ou km2)",type:'text',required:true},
      {key:'livrables_sig',label:"Livrables attendus (cartes, geodatabase...)",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison finale",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CARTOGRAPHIE FORESTIERE (SIG)</h1><p><strong>Prestataire SIG :</strong> {{prestataire_sig}}</p><p><strong>Client :</strong> {{client_sig}}</p><p><strong>Etendue :</strong> {{etendue_cartographie}}</p><p><strong>Livrables :</strong> {{livrables_sig}}</p><p><strong>Date de livraison :</strong> {{date_livraison}}</p><h3>Article 1 — Methodes</h3><p>La cartographie est realisee par teledetection satellitaire (images Sentinel-2 ou Landsat), validation terrain et traitement sous logiciel SIG certifie (ArcGIS / QGIS).</p><h3>Article 2 — Precision</h3><p>La precision geometrique des cartes livrees est de +/- 10 m pour les limites de foret classee et de +/- 25 m pour les types de vegetation.</p><h3>Article 3 — Propriete intellectuelle</h3><p>Les donnees et cartes produites sont la propriete exclusive du client. Le prestataire ne peut les exploiter a d'autres fins sans autorisation ecrite.</p><p class="signature">Signe le {{date_livraison}}</p></div>`
  },
  {
    code: 'for_formation_metiers', name: "Accord de service de formation aux metiers de la foret",
    category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Contrat de formation professionnelle aux metiers forestiers (bucheronnage, reboisement, inventaire, gestion durable) destine aux agents et operateurs en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 53,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'public_cible',label:"Public cible (nombre et profil)",type:'text',required:true},
      {key:'modules_formation',label:"Modules de formation",type:'textarea',required:true},
      {key:'duree_formation',label:"Duree totale (jours)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION AUX METIERS DE LA FORET</h1><p><strong>Organisme de formation :</strong> {{organisme_formation}}</p><p><strong>Public cible :</strong> {{public_cible}}</p><p><strong>Modules :</strong> {{modules_formation}}</p><p><strong>Duree :</strong> {{duree_formation}} jours</p><h3>Article 1 — Objectifs pedagogiques</h3><p>La formation vise a transmettre les competences techniques et reglementaires necessaires a l'exercice durable des metiers forestiers, conformement aux referentiels de l'EFCPC et du MINEF.</p><h3>Article 2 — Evaluations</h3><p>Une evaluation de debut et de fin de formation est realisee. Les stagiaires ayant obtenu la note minimale requise recoivent une attestation de formation.</p><h3>Article 3 — Modalites financieres</h3><p>Les frais de formation incluent les supports pedagogiques, la restauration et les deplacements des formateurs.</p><p class="signature">Fait a Abidjan</p></div>`
  },
  {
    code: 'for_gestion_participative', name: "Accord de service de gestion participative foret communautaire",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Contrat encadrant la mise en place d'une gestion participative d'une foret communautaire impliquant les populations riveraines et les autorites locales en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'communaute',label:"Communaute beneficiaire",type:'text',required:true},
      {key:'foret_communautaire',label:"Denomination de la foret communautaire",type:'text',required:true},
      {key:'comite_gestion',label:"President du comite de gestion",type:'text',required:true},
      {key:'partenaire_appui',label:"Partenaire d'appui technique (ONG / SODEFOR)",type:'text',required:false},
      {key:'superficie_com',label:"Superficie de la foret (ha)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GESTION PARTICIPATIVE — FORET COMMUNAUTAIRE</h1><p><strong>Communaute :</strong> {{communaute}}</p><p><strong>Foret :</strong> {{foret_communautaire}}</p><p><strong>President du comite :</strong> {{comite_gestion}}</p><p><strong>Partenaire d'appui :</strong> {{partenaire_appui}}</p><p><strong>Superficie :</strong> {{superficie_com}} ha</p><h3>Article 1 — Gouvernance</h3><p>Un comite de gestion paritaire (hommes/femmes, jeunes/anciens) est cree et reconnu par deliberation du conseil de village. Ses decisions sont valables a la majorite simple.</p><h3>Article 2 — Droits d'usage</h3><p>Les membres de la communaute conservent leurs droits d'usage traditionnels pour la cueillette, le bois de feu et la pharmacopee, dans les limites des quotas definis par le plan de gestion.</p><h3>Article 3 — Fonds communautaire</h3><p>70 % des recettes issues de l'exploitation durable alimentent le fonds de developpement communautaire, gere de maniere transparente et auditee annuellement.</p><p class="signature">Signe en assemblee de village</p></div>`
  },
  {
    code: 'for_pse', name: "Accord de service de paiement pour services environnementaux (PSE foret)",
    category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Contrat de paiement pour services environnementaux forestiers (sequestration carbone, biodiversite, eau) entre un fournisseur de services et un payeur public ou prive.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'fournisseur_services',label:"Fournisseur de services (communaute / gestionnaire)",type:'text',required:true},
      {key:'payeur_pse',label:"Payeur (entreprise / fonds carbone)",type:'text',required:true},
      {key:'service_env',label:"Service environnemental fourni",type:'text',required:true},
      {key:'montant_annuel_pse',label:"Montant annuel du PSE (FCFA ou USD)",type:'text',required:true},
      {key:'duree_pse',label:"Duree de l'accord PSE (ans)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PAIEMENT POUR SERVICES ENVIRONNEMENTAUX (PSE) — FORET</h1><p><strong>Fournisseur :</strong> {{fournisseur_services}}</p><p><strong>Payeur :</strong> {{payeur_pse}}</p><p><strong>Service environnemental :</strong> {{service_env}}</p><p><strong>Montant annuel :</strong> {{montant_annuel_pse}}</p><p><strong>Duree :</strong> {{duree_pse}} ans</p><h3>Article 1 — Objet</h3><p>Le present accord formalise l'engagement du fournisseur a maintenir et ameliorer les services ecosystemiques definis, en contrepartie d'un paiement annuel du payeur.</p><h3>Article 2 — Conditions de paiement</h3><p>Le paiement est conditionne a la verification independante annuelle de la realite des services fournis selon les indicateurs definis en annexe technique.</p><h3>Article 3 — Clause de non-conversion</h3><p>Le fournisseur s'engage a ne pas convertir les surfaces couvertes par le present accord en terres agricoles ou infrastructures pendant toute la duree du contrat.</p><p class="signature">Signe a Abidjan</p></div>`
  },
  {
    code: 'for_partenariat_onf_sodefor', name: "Accord de partenariat ONF-SODEFOR",
    category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Accord-cadre de cooperation technique et scientifique entre l'Office National des Forets (France/DOM) et la SODEFOR (Cote d'Ivoire) pour la gestion forestiere durable.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'representant_onf',label:"Representant ONF",type:'text',required:true},
      {key:'representant_sodefor',label:"Directeur General SODEFOR",type:'text',required:true},
      {key:'domaines_cooperation',label:"Domaines de cooperation",type:'textarea',required:true},
      {key:'duree_partenariat',label:"Duree du partenariat (ans)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ONF-SODEFOR</h1><p><strong>Representant ONF :</strong> {{representant_onf}}</p><p><strong>DG SODEFOR :</strong> {{representant_sodefor}}</p><p><strong>Domaines de cooperation :</strong> {{domaines_cooperation}}</p><p><strong>Duree :</strong> {{duree_partenariat}} ans</p><h3>Article 1 — Objectifs</h3><p>Le partenariat vise a renforcer les capacites techniques et institutionnelles de la SODEFOR en matiere de gestion forestiere durable, de formation et de recherche appliquee.</p><h3>Article 2 — Modalites</h3><p>La cooperation se traduit par des echanges d'experts, des formations communes, des projets de recherche conjoints et des publications scientifiques partagees.</p><h3>Article 3 — Financement</h3><p>Chaque partie prend en charge ses propres frais de personnel et de deplacement. Les projets communs font l'objet d'un budget specific approuve par les deux parties.</p><p class="signature">Fait en double exemplaire</p></div>`
  },
  {
    code: 'for_bilan_gestion', name: "Rapport de bilan de gestion forestiere",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Modele de rapport annuel de bilan de gestion forestiere a soumettre au MINEF conformement aux obligations des detenteurs de titres forestiers en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'structure_gestionnaire',label:"Structure gestionnaire",type:'text',required:true},
      {key:'annee_bilan',label:"Annee du bilan",type:'text',required:true},
      {key:'volume_exploite',label:"Volume total exploite (m3)",type:'text',required:true},
      {key:'superficie_reboisee_bilan',label:"Superficie reboisee dans l'annee (ha)",type:'text',required:true},
      {key:'incidents_constates',label:"Incidents ou infractions constates",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE BILAN DE GESTION FORESTIERE {{annee_bilan}}</h1><p><strong>Structure :</strong> {{structure_gestionnaire}}</p><h2>1. Bilan des exploitations</h2><p>Volume total exploite : <strong>{{volume_exploite}} m3</strong></p><h2>2. Bilan du reboisement</h2><p>Superficie reboisee : <strong>{{superficie_reboisee_bilan}} ha</strong></p><h2>3. Incidents et infractions</h2><p>{{incidents_constates}}</p><h2>4. Perspectives</h2><p>Les activites de l'annee suivante seront orientees vers l'intensification du reboisement et le renforcement de la surveillance anti-braconnage.</p><p class="signature">Le Directeur Technique — {{structure_gestionnaire}}</p></div>`
  },
  {
    code: 'for_plan_gestion_durable', name: "Plan de gestion forestiere durable",
    category: 'agro_environnement', price: 9000, priceMax: 27000,
    description: "Document-cadre de planification de la gestion durable d'un massif forestier sur 10-25 ans, conforme aux standards OHADA et aux referentiels FSC/PEFC.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'massif',label:"Denomination du massif forestier",type:'text',required:true},
      {key:'responsable_plan',label:"Responsable du plan de gestion",type:'text',required:true},
      {key:'duree_plan_gestion',label:"Duree du plan (ans)",type:'text',required:true},
      {key:'objectifs_production',label:"Objectifs de production",type:'textarea',required:true},
      {key:'date_adoption',label:"Date d'adoption du plan",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE GESTION FORESTIERE DURABLE</h1><p><strong>Massif :</strong> {{massif}}</p><p><strong>Responsable :</strong> {{responsable_plan}}</p><p><strong>Horizon de planification :</strong> {{duree_plan_gestion}} ans</p><p><strong>Date d'adoption :</strong> {{date_adoption}}</p><h2>Chapitre 1 — Etat des lieux</h2><p>Description exhaustive de l'etat du massif : composition floristique, stocks de carbone, biodiversite, pression anthropique.</p><h2>Chapitre 2 — Objectifs et strategie</h2><p>{{objectifs_production}}</p><h2>Chapitre 3 — Programme d'activites</h2><p>Programmation decennale des coupes, des reboisements, des inventaires et des suivis ecologiques.</p><h2>Chapitre 4 — Budget previsionnel</h2><p>Le budget detaille par activite et par annee est presente en annexe financiere.</p><p class="signature">Adopte le {{date_adoption}}</p></div>`
  },
  {
    code: 'for_ecotourisme', name: "Accord de service d'ecotourisme en foret",
    category: 'agro_environnement', price: 3500, priceMax: 10500,
    description: "Contrat de developpement et d'exploitation de circuits ecotouristiques en milieu forestier, associant les communautes locales et un operateur touristique en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'operateur_tourisme',label:"Operateur touristique",type:'text',required:true},
      {key:'communaute_hote',label:"Communaute hote",type:'text',required:true},
      {key:'foret_ecotourisme',label:"Foret / site ecotouristique",type:'text',required:true},
      {key:'capacite_accueil',label:"Capacite d'accueil (visiteurs/jour)",type:'text',required:true},
      {key:'retombees_communaute',label:"Part reversee a la communaute (%)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ECOTOURISME EN FORET</h1><p><strong>Operateur touristique :</strong> {{operateur_tourisme}}</p><p><strong>Communaute hote :</strong> {{communaute_hote}}</p><p><strong>Site :</strong> {{foret_ecotourisme}}</p><p><strong>Capacite d'accueil :</strong> {{capacite_accueil}} visiteurs/jour</p><p><strong>Retombees communautaires :</strong> {{retombees_communaute}} % des recettes</p><h3>Article 1 — Objet</h3><p>L'operateur developpe et commercialise des circuits ecotouristiques sur le site, en valorisant la biodiversite forestiere et les savoirs traditionnels de la communaute hote.</p><h3>Article 2 — Engagements environnementaux</h3><p>La frequentation est limitee a la capacite d'accueil definie. Les sentiers sont amenages sans modification du couvert forestier naturel.</p><h3>Article 3 — Partage des benefices</h3><p>Les retombees financieres sont partagees conformement au pourcentage defini, verse mensuellement a la caisse communautaire avec bordereau justificatif.</p><p class="signature">Signe entre les parties</p></div>`
  },
  {
    code: 'for_charte_gestion', name: "Charte de la gestion forestiere durable et des droits des communautes",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Document de reference enonçant les principes de gestion forestiere durable et les droits des communautes riveraines adoptes par les operateurs forestiers en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'signataires_charte',label:"Signataires de la charte",type:'textarea',required:true},
      {key:'date_adoption_charte',label:"Date d'adoption",type:'date',required:true},
      {key:'perimetre_application',label:"Perimetre d'application",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA GESTION FORESTIERE DURABLE ET DES DROITS DES COMMUNAUTES</h1><p><strong>Signataires :</strong> {{signataires_charte}}</p><p><strong>Date d'adoption :</strong> {{date_adoption_charte}}</p><p><strong>Perimetre :</strong> {{perimetre_application}}</p><h3>Principe 1 — Legalite</h3><p>Les signataires s'engagent a respecter l'ensemble des lois et reglementations forestieres nationales et internationales applicables.</p><h3>Principe 2 — Durabilite</h3><p>Les volumes exploites ne depassent pas le rendement soutenu calcule sur la base des inventaires periodiques.</p><h3>Principe 3 — Droits des communautes</h3><p>Les droits fonciers coutumiers et d'usage des communautes riveraines sont reconnus, documentes et respectes.</p><h3>Principe 4 — Transparence</h3><p>Les informations sur les volumes exploites, les taxes versees et les recrutements locaux sont rendues publiques annuellement.</p><p class="signature">Adopte le {{date_adoption_charte}} par les signataires</p></div>`
  },
  // ── CAFE / CACAO (25 templates) ────────────────────────────────────────────
  {
    code: 'cafe_achat_cacao_bord_champ', name: "Accord d'achat de cacao bord-champ (contrat producteur-pisteur)",
    category: 'agro_environnement', price: 2000, priceMax: 6000,
    description: "Contrat d'achat de cacao entre un planteur et un pisteur agree, definissant le prix bord-champ, les conditions de pesee et les modalites de paiement selon les baremes CCC Cote d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 78,
    fieldsJson: F([
      {key:'planteur_nom',label:"Nom du planteur",type:'text',required:true},
      {key:'pisteur_nom',label:"Nom du pisteur agree",type:'text',required:true},
      {key:'village',label:"Village / localite",type:'text',required:true},
      {key:'poids_kg',label:"Poids de cacao (kg)",type:'text',required:true},
      {key:'prix_bord_champ',label:"Prix bord-champ (FCFA/kg)",type:'text',required:true},
      {key:'date_achat',label:"Date de la transaction",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ACHAT DE CACAO BORD-CHAMP</h1><p><strong>Planteur :</strong> {{planteur_nom}}</p><p><strong>Pisteur agree :</strong> {{pisteur_nom}}</p><p><strong>Village :</strong> {{village}}</p><p><strong>Poids :</strong> {{poids_kg}} kg</p><p><strong>Prix bord-champ :</strong> {{prix_bord_champ}} FCFA/kg</p><p><strong>Date :</strong> {{date_achat}}</p><h3>Conditions de la transaction</h3><p>La pesee est effectuee sur balance etalonnee en presence des deux parties. Le cacao doit avoir un taux d'humidite inferieur a 8 % et un taux de feves defectueuses inferieur a 10 % selon les normes CCC CI.</p><h3>Paiement</h3><p>Le montant total de <strong>{{poids_kg}} kg x {{prix_bord_champ}} FCFA/kg</strong> est verse au comptant au moment de l'enlevement.</p><p>Le pisteur remet au planteur un recu de pesee signe et horodate.</p><p class="signature">Lu et approuve — {{planteur_nom}} / {{pisteur_nom}}</p></div>`
  },
  {
    code: 'cafe_achat_cafe_bord_champ', name: "Accord d'achat de cafe bord-champ",
    category: 'agro_environnement', price: 2000, priceMax: 6000,
    description: "Contrat d'achat de cafe robusta entre un producteur et un acheteur agree sur la base du prix bord-champ defini par le Conseil Cafe-Cacao de Cote d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'producteur_cafe',label:"Producteur de cafe",type:'text',required:true},
      {key:'acheteur_cafe',label:"Acheteur agree",type:'text',required:true},
      {key:'quantite_cafe',label:"Quantite (kg)",type:'text',required:true},
      {key:'prix_cafe',label:"Prix bord-champ (FCFA/kg)",type:'text',required:true},
      {key:'date_transaction_cafe',label:"Date de la transaction",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ACHAT DE CAFE BORD-CHAMP</h1><p><strong>Producteur :</strong> {{producteur_cafe}}</p><p><strong>Acheteur agree :</strong> {{acheteur_cafe}}</p><p><strong>Quantite :</strong> {{quantite_cafe}} kg</p><p><strong>Prix :</strong> {{prix_cafe}} FCFA/kg</p><p><strong>Date :</strong> {{date_transaction_cafe}}</p><h3>Qualite</h3><p>Le cafe objet du present contrat est du cafe robusta parche ou cerise conforme aux specifications qualite du Conseil Cafe-Cacao. Tout lot non conforme peut etre refuse apres controle contradictoire.</p><h3>Paiement</h3><p>Reglement immediat en especes ou par mobile money contre remise d'un recu numerote.</p><p class="signature">Signe entre les parties le {{date_transaction_cafe}}</p></div>`
  },
  {
    code: 'cafe_groupage_cooperative', name: "Accord de groupage et stockage de cacao en cooperative",
    category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Contrat organisant le groupage, le conditionnement et le stockage du cacao des membres d'une cooperative agricole en Cote d'Ivoire avant la vente groupee.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'cooperative',label:"Cooperative (denomination)",type:'text',required:true},
      {key:'president_coop',label:"President de la cooperative",type:'text',required:true},
      {key:'tonnage_groupe',label:"Tonnage groupe (tonnes)",type:'text',required:true},
      {key:'entrepot',label:"Lieu de stockage / entrepot agree",type:'text',required:true},
      {key:'duree_stockage',label:"Duree maximale de stockage (jours)",type:'text',required:false},
    ]),
    body: `<div class="doc"><h1>ACCORD DE GROUPAGE ET STOCKAGE DE CACAO EN COOPERATIVE</h1><p><strong>Cooperative :</strong> {{cooperative}}</p><p><strong>President :</strong> {{president_coop}}</p><p><strong>Tonnage groupe :</strong> {{tonnage_groupe}} t</p><p><strong>Entrepot :</strong> {{entrepot}}</p><p><strong>Duree max de stockage :</strong> {{duree_stockage}} jours</p><h3>Article 1 — Organisation du groupage</h3><p>Chaque membre livre son cacao au point de collecte designe. La reception est faite par un responsable qualite designe par la cooperative avec pesee contradictoire.</p><h3>Article 2 — Stockage</h3><p>Le cacao est stocke dans un entrepot agree, sous surveillance permanente. Les pertes en stock sont reparties entre les membres proportionnellement a leurs apports.</p><h3>Article 3 — Vente groupee</h3><p>La decision de vente est prise en assemblee de bureau a la majorite simple. Chaque membre est rembourse proportionnellement a son apport, deduction faite des frais communs.</p><p class="signature">Signe par le President de la cooperative</p></div>`
  },
  {
    code: 'cafe_vente_exportateur_ccc', name: "Accord de vente de cacao a un exportateur agree (CCC CI)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat de vente de cacao entre une cooperative ou un acheteur intermediaire et un exportateur titulaire d'un agrement CCC (Conseil Cafe-Cacao de Cote d'Ivoire).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'vendeur_ccc',label:"Vendeur (cooperative / traitant)",type:'text',required:true},
      {key:'exportateur_agree',label:"Exportateur agree CCC",type:'text',required:true},
      {key:'tonnage_vente',label:"Tonnage vendu (tonnes)",type:'text',required:true},
      {key:'prix_contrat',label:"Prix contractuel (FCFA/tonne)",type:'text',required:true},
      {key:'lieu_livraison',label:"Lieu de livraison (port / entrepot)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE DE CACAO A UN EXPORTATEUR AGREE CCC</h1><p><strong>Vendeur :</strong> {{vendeur_ccc}}</p><p><strong>Exportateur agree :</strong> {{exportateur_agree}}</p><p><strong>Tonnage :</strong> {{tonnage_vente}} t</p><p><strong>Prix contractuel :</strong> {{prix_contrat}} FCFA/t</p><p><strong>Lieu de livraison :</strong> {{lieu_livraison}}</p><h3>Article 1 — Qualite</h3><p>Le cacao livre est conforme aux grades definis par le CCC CI (Grade 1 ou Grade 2) avec attestation de controle qualite ANADER jointe.</p><h3>Article 2 — Livraison</h3><p>La livraison est realisee par le vendeur a ses frais jusqu'au lieu designe. Le transfert de risques s'opere au dechargement dans l'entrepot de l'exportateur.</p><h3>Article 3 — Paiement</h3><p>Le paiement est effectue par virement bancaire dans les 7 jours suivant la pesee definitive et la reception qualitative contradictoire.</p><p class="signature">Signe a Abidjan / San Pedro</p></div>`
  },
  {
    code: 'cafe_post_recolte', name: "Accord de service de traitement post-recolte du cacao (fermentation, sechage)",
    category: 'agro_environnement', price: 2500, priceMax: 7500,
    description: "Contrat de prestation de services de fermentation et de sechage du cacao selon les bonnes pratiques post-recolte recommandees par le Conseil Cafe-Cacao et l'ANADER.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire_post_recolte',label:"Prestataire de services post-recolte",type:'text',required:true},
      {key:'planteur_pr',label:"Planteur / groupement client",type:'text',required:true},
      {key:'volume_cacao_pr',label:"Volume a traiter (kg)",type:'text',required:true},
      {key:'duree_fermentation',label:"Duree de fermentation (jours)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEMENT POST-RECOLTE DU CACAO</h1><p><strong>Prestataire :</strong> {{prestataire_post_recolte}}</p><p><strong>Client :</strong> {{planteur_pr}}</p><p><strong>Volume :</strong> {{volume_cacao_pr}} kg</p><p><strong>Duree de fermentation :</strong> {{duree_fermentation}} jours</p><h3>Article 1 — Fermentation</h3><p>Le cacao est fermente en caisse en bois pendant {{duree_fermentation}} jours avec retournements quotidiens a partir du 2e jour. La temperature interne doit atteindre 45-50 degres Celsius.</p><h3>Article 2 — Sechage</h3><p>Apres fermentation, le cacao est seche sur claies ou tables de sechage pendant 7 a 10 jours jusqu'a un taux d'humidite de 7-8 %.</p><h3>Article 3 — Controle</h3><p>Un test a la coupe est realise avant livraison : taux de bonne fermentation minimum 75 % requis pour validation.</p><p class="signature">Signe entre les parties</p></div>`
  },
  {
    code: 'cafe_triage_calibrage', name: "Accord de service de triage et calibrage du cacao",
    category: 'agro_environnement', price: 2000, priceMax: 6000,
    description: "Contrat de prestation de triage, de nettoyage et de calibrage du cacao marchand en vue de sa commercialisation conforme aux normes d'exportation ivoiriennes.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 61,
    fieldsJson: F([
      {key:'centre_triage',label:"Centre de triage / entrepot",type:'text',required:true},
      {key:'lot_cacao',label:"Reference du lot de cacao",type:'text',required:true},
      {key:'volume_a_trier',label:"Volume a trier (sacs ou kg)",type:'text',required:true},
      {key:'grade_cible',label:"Grade qualite cible (Grade 1 / Grade 2)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRIAGE ET CALIBRAGE DU CACAO</h1><p><strong>Centre de triage :</strong> {{centre_triage}}</p><p><strong>Lot :</strong> {{lot_cacao}}</p><p><strong>Volume :</strong> {{volume_a_trier}}</p><p><strong>Grade cible :</strong> {{grade_cible}}</p><h3>Article 1 — Operations</h3><p>Les operations comprennent : nettoyage par tarare, extraction des feves plates, moities, germees et insectees, calibrage par taille selon les grilles CCC CI.</p><h3>Article 2 — Rendement</h3><p>Le taux de dechets et de pertes est documente dans le rapport de triage remis au client. Les dechets sont la propriete du client.</p><h3>Article 3 — Tarification</h3><p>La prestation est facturee au kilo de cacao traite conforme, selon le tarif annexe.</p><p class="signature">Signe entre les parties</p></div>`
  },
  {
    code: 'cafe_cert_rainforest', name: "Accord de certification cacao durable (Rainforest Alliance)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat d'accompagnement et de certification Rainforest Alliance pour les producteurs de cacao en Cote d'Ivoire, incluant audit initial, plan d'action et suivi.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'organisme_cert_ra',label:"Organisme de certification",type:'text',required:true},
      {key:'cooperative_ra',label:"Cooperative / groupement candidat",type:'text',required:true},
      {key:'nombre_membres',label:"Nombre de membres producteurs",type:'text',required:true},
      {key:'superficie_certifiee',label:"Superficie a certifier (ha)",type:'text',required:true},
      {key:'date_audit_initial',label:"Date d'audit initial prevu",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION CACAO DURABLE — RAINFOREST ALLIANCE</h1><p><strong>Organisme :</strong> {{organisme_cert_ra}}</p><p><strong>Cooperative :</strong> {{cooperative_ra}}</p><p><strong>Membres producteurs :</strong> {{nombre_membres}}</p><p><strong>Superficie :</strong> {{superficie_certifiee}} ha</p><p><strong>Audit initial :</strong> {{date_audit_initial}}</p><h3>Article 1 — Normes applicables</h3><p>La certification est delivree selon le referentiel Rainforest Alliance 2020 (Agriculture Durable), comprenant les criteres environnementaux, sociaux et de gouvernance.</p><h3>Article 2 — Plan d'action</h3><p>A l'issue de l'audit initial, un plan d'action correctif est etabli. La cooperative s'engage a atteindre les seuils de conformite dans les delais impartis.</p><h3>Article 3 — Surveillance</h3><p>Des audits de suivi annuels sont realises. La certification est suspendue en cas de non-conformite majeure non corrigee dans les 90 jours.</p><p class="signature">Signe a Abidjan</p></div>`
  },
  {
    code: 'cafe_cert_bio', name: "Accord de certification cacao biologique (AB)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Contrat d'accompagnement vers la certification cacao biologique (label AB / EU Organic) pour des producteurs ivoiriens souhaitant acceder aux marches biologiques europeens.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'organisme_bio',label:"Organisme certificateur bio",type:'text',required:true},
      {key:'producteur_bio',label:"Producteur / cooperative bio",type:'text',required:true},
      {key:'periode_conversion',label:"Periode de conversion (ans)",type:'text',required:true},
      {key:'superficie_bio',label:"Superficie en conversion (ha)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION CACAO BIOLOGIQUE (AB)</h1><p><strong>Organisme certificateur :</strong> {{organisme_bio}}</p><p><strong>Producteur :</strong> {{producteur_bio}}</p><p><strong>Periode de conversion :</strong> {{periode_conversion}} ans</p><p><strong>Superficie :</strong> {{superficie_bio}} ha</p><h3>Article 1 — Cahier des charges</h3><p>Le producteur s'engage a respecter le Reglement CE n°834/2007 et ses textes d'application, notamment l'interdiction des pesticides de synthese, des OGM et des engrais chimiques.</p><h3>Article 2 — Periode de conversion</h3><p>Pendant la periode de conversion de {{periode_conversion}} ans, le producteur beneficie d'un accompagnement technique mensuel et ne peut commercialiser sous le label AB.</p><h3>Article 3 — Audits</h3><p>Un audit de controle inopin peut etre effectue a tout moment par l'organisme ou ses sous-traitants accredites.</p><p class="signature">Signe entre les parties</p></div>`
  },
  {
    code: 'cafe_cert_utz', name: "Accord de certification UTZ/Rainforest Alliance cacao",
    category: 'agro_environnement', price: 4500, priceMax: 13500,
    description: "Contrat de mise en conformite et d'audit pour la certification UTZ (integree dans Rainforest Alliance depuis 2018) appliquee aux cooperatives cacaoyeres de Cote d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'auditeur_utz',label:"Auditeur certifie UTZ/RA",type:'text',required:true},
      {key:'coop_utz',label:"Cooperative candidate",type:'text',required:true},
      {key:'code_utz',label:"Code UTZ de la cooperative",type:'text',required:false},
      {key:'date_audit_utz',label:"Date d'audit de certification",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION UTZ/RAINFOREST ALLIANCE CACAO</h1><p><strong>Auditeur :</strong> {{auditeur_utz}}</p><p><strong>Cooperative :</strong> {{coop_utz}}</p><p><strong>Code UTZ :</strong> {{code_utz}}</p><p><strong>Date d'audit :</strong> {{date_audit_utz}}</p><h3>Article 1 — Referentiel</h3><p>L'audit est conduit selon le Code de Conduite UTZ (version integree Rainforest Alliance 2020), couvrant les pratiques agricoles, le travail des enfants, la traceabilite et la gestion environnementale.</p><h3>Article 2 — Resultats</h3><p>Le rapport d'audit indique le score par critere. Un score global minimum de 50 % est requis pour la certification initiale, avec absence de non-conformites majeures.</p><h3>Article 3 — Validite</h3><p>Le certificat est valable 3 ans avec audit de suivi annuel.</p><p class="signature">Signe le {{date_audit_utz}}</p></div>`
  },
  {
    code: 'cafe_prime_durabilite', name: "Accord de prime de durabilite (premium cacao certifie)",
    category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Contrat formalisant le versement d'une prime de durabilite (premium) aux producteurs de cacao certifie par un acheteur industriel ou un exportateur.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'acheteur_premium',label:"Acheteur versant le premium",type:'text',required:true},
      {key:'cooperative_premium',label:"Cooperative / groupement beneficiaire",type:'text',required:true},
      {key:'montant_premium',label:"Montant du premium (USD ou FCFA / tonne)",type:'text',required:true},
      {key:'tonnage_premium',label:"Tonnage concerne (tonnes)",type:'text',required:true},
      {key:'utilisation_premium',label:"Utilisation prevue du premium",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRIME DE DURABILITE — CACAO CERTIFIE</h1><p><strong>Acheteur :</strong> {{acheteur_premium}}</p><p><strong>Beneficiaire :</strong> {{cooperative_premium}}</p><p><strong>Premium :</strong> {{montant_premium}} par tonne</p><p><strong>Tonnage :</strong> {{tonnage_premium}} t</p><h3>Article 1 — Versement</h3><p>L'acheteur s'engage a verser le premium sur le compte bancaire de la cooperative dans les 30 jours suivant la livraison et la verification de la certification.</p><h3>Article 2 — Utilisation</h3><p>La cooperative s'engage a affecter le premium aux usages suivants : {{utilisation_premium}}</p><h3>Article 3 — Rapportage</h3><p>La cooperative transmet annuellement un rapport d'utilisation du premium a l'acheteur, conformement aux exigences des referentiels de certification.</p><p class="signature">Signe entre les parties</p></div>`
  },
  {
    code: 'cafe_financement_campagne', name: "Accord de financement de campagne agricole (cacao/cafe)",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Contrat de financement de campagne cacaoyere ou cafeiiere entre un etablissement financier ou un exportateur et une cooperative ou un groupement de producteurs ivoiriens.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'financeur',label:"Etablissement financier / exportateur financeur",type:'text',required:true},
      {key:'beneficiaire_financement',label:"Cooperative / groupement beneficiaire",type:'text',required:true},
      {key:'montant_financement',label:"Montant du financement (FCFA)",type:'text',required:true},
      {key:'taux_interet',label:"Taux d'interet (%)",type:'text',required:true},
      {key:'remboursement_mode',label:"Mode de remboursement",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT DE CAMPAGNE AGRICOLE CACAO/CAFE</h1><p><strong>Financeur :</strong> {{financeur}}</p><p><strong>Beneficiaire :</strong> {{beneficiaire_financement}}</p><p><strong>Montant :</strong> {{montant_financement}} FCFA</p><p><strong>Taux d'interet :</strong> {{taux_interet}} %</p><p><strong>Remboursement :</strong> {{remboursement_mode}}</p><h3>Article 1 — Affectation du financement</h3><p>Les fonds sont exclusivement destines au financement des achats bord-champ pendant la campagne cacaoyere / cafeiiere en cours.</p><h3>Article 2 — Garanties</h3><p>La cooperative apporte en garantie les stocks de cacao/cafe finances, conformement au nantissement de stocks formalise en acte notarie OHADA annexe.</p><h3>Article 3 — Remboursement</h3><p>Le remboursement est effectue selon les modalites suivantes : {{remboursement_mode}}, avec deduction automatique lors des paiements de livraison a l'exportateur.</p><p class="signature">Signe a Abidjan</p></div>`
  },
  {
    code: 'cafe_assurance_recolte', name: "Accord d'assurance recolte cacao (CNPS-CI)",
    category: 'agro_environnement', price: 3500, priceMax: 10500,
    description: "Contrat d'assurance agricole indexee couvrant les risques de perte de recolte de cacao ou de cafe en Cote d'Ivoire (secheresse, inondation, ravageurs).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'assure_recolte',label:"Assure (planteur / cooperative)",type:'text',required:true},
      {key:'assureur',label:"Compagnie d'assurance",type:'text',required:true},
      {key:'superficie_assuree',label:"Superficie assuree (ha)",type:'text',required:true},
      {key:'prime_annuelle',label:"Prime annuelle (FCFA)",type:'text',required:true},
      {key:'indemnite_max',label:"Indemnite maximale (FCFA/ha)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ASSURANCE RECOLTE CACAO</h1><p><strong>Assure :</strong> {{assure_recolte}}</p><p><strong>Assureur :</strong> {{assureur}}</p><p><strong>Superficie assuree :</strong> {{superficie_assuree}} ha</p><p><strong>Prime annuelle :</strong> {{prime_annuelle}} FCFA</p><p><strong>Indemnite maximale :</strong> {{indemnite_max}} FCFA/ha</p><h3>Article 1 — Risques couverts</h3><p>Le contrat couvre les pertes de recolte superieures a 30 % du rendement de reference dues a la secheresse (indice pluviometrique), aux inondations, aux attaques severes de capsides et aux epidemies de pourriture brune.</p><h3>Article 2 — Declenchement</h3><p>L'indemnisation est declenchee automatiquement lorsque l'indice meteorologique ou le constat de terrain depasse les seuils definis en annexe.</p><h3>Article 3 — Exclusions</h3><p>Sont exclus les pertes dues a une negligence averes du producteur, aux vols ou aux conflits armes.</p><p class="signature">Signe a Abidjan</p></div>`
  },
  {
    code: 'cafe_conseil_anader', name: "Accord de service de conseil agro cacao (ANADER)",
    category: 'agro_environnement', price: 2500, priceMax: 7500,
    description: "Contrat de prestation de conseil agricole sur la culture du cacao fourni par l'ANADER ou un agent agronome agree, incluant formation, demonstrations et suivi parcellaire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 63,
    fieldsJson: F([
      {key:'agronome',label:"Agronome / agent ANADER",type:'text',required:true},
      {key:'beneficiaire_conseil',label:"Beneficiaire (planteur / groupement)",type:'text',required:true},
      {key:'nb_visites',label:"Nombre de visites prevues par an",type:'text',required:true},
      {key:'themes_conseil',label:"Themes de conseil (taille, fertilisation...)",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL AGRICOLE CACAO — ANADER</h1><p><strong>Agronome :</strong> {{agronome}}</p><p><strong>Beneficiaire :</strong> {{beneficiaire_conseil}}</p><p><strong>Visites annuelles :</strong> {{nb_visites}}</p><p><strong>Themes :</strong> {{themes_conseil}}</p><h3>Article 1 — Contenu des prestations</h3><p>L'agronome realise des visites de conseil individuel et collectif, des demonstrations en parcelle et des formations pratiques sur les bonnes pratiques agricoles du cacao.</p><h3>Article 2 — Rapport de visite</h3><p>Chaque visite est documentee par une fiche de visite signee par le beneficiaire et transmise a l'ANADER et au commanditaire dans les 7 jours.</p><h3>Article 3 — Engagement du beneficiaire</h3><p>Le beneficiaire s'engage a mettre en oeuvre les recommandations techniques et a signaler tout probleme phytosanitaire dans les 48h.</p><p class="signature">Signe entre les parties</p></div>`
  },
  {
    code: 'cafe_intrant_engrais', name: "Accord d'intrant agricole (engrais pour cacao)",
    category: 'agro_environnement', price: 2500, priceMax: 7500,
    description: "Contrat de fourniture d'intrants agricoles (engrais, produits phytosanitaires) aux producteurs de cacao dans le cadre de programmes d'intensification durable en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 67,
    fieldsJson: F([
      {key:'fournisseur_intrant',label:"Fournisseur d'intrants",type:'text',required:true},
      {key:'beneficiaire_intrant',label:"Beneficiaire (cooperative / planteur)",type:'text',required:true},
      {key:'type_intrant',label:"Type d'intrant (engrais NPK, fongicide...)",type:'text',required:true},
      {key:'quantite_intrant',label:"Quantite (kg ou litres)",type:'text',required:true},
      {key:'mode_paiement_intrant',label:"Mode de paiement (cash / credit campagne)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FOURNITURE D'INTRANTS AGRICOLES POUR CACAO</h1><p><strong>Fournisseur :</strong> {{fournisseur_intrant}}</p><p><strong>Beneficiaire :</strong> {{beneficiaire_intrant}}</p><p><strong>Intrant :</strong> {{type_intrant}}</p><p><strong>Quantite :</strong> {{quantite_intrant}}</p><p><strong>Paiement :</strong> {{mode_paiement_intrant}}</p><h3>Article 1 — Qualite des intrants</h3><p>Les intrants fournis sont homologues par le Comite Pesticides de Cote d'Ivoire et accompagnes de leurs fiches techniques et fiches de securite.</p><h3>Article 2 — Utilisation</h3><p>Le beneficiaire s'engage a utiliser les intrants conformement aux recommandations de l'etiquette et aux conseils de l'ANADER.</p><h3>Article 3 — Responsabilite</h3><p>Toute utilisation non conforme engage la seule responsabilite du beneficiaire, sauf vice du produit prouve par analyse contradictoire.</p><p class="signature">Signe entre les parties</p></div>`
  },
  {
    code: 'cafe_formation_producteur', name: "Accord de service de formation producteur de cacao",
    category: 'agro_environnement', price: 2500, priceMax: 7500,
    description: "Contrat de formation technique et organisationnelle destine aux producteurs de cacao en Cote d'Ivoire (bonnes pratiques agricoles, qualite post-recolte, gestion cooperative).",
    templateType: 'pdf', classe: 'C', active: true, popularity: 64,
    fieldsJson: F([
      {key:'formateur_cacao',label:"Organisme formateur",type:'text',required:true},
      {key:'cible_formation',label:"Cible (nombre de producteurs / cooperative)",type:'text',required:true},
      {key:'modules_cacao',label:"Modules de formation",type:'textarea',required:true},
      {key:'lieu_formation',label:"Lieu de formation",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION PRODUCTEUR DE CACAO</h1><p><strong>Formateur :</strong> {{formateur_cacao}}</p><p><strong>Cible :</strong> {{cible_formation}}</p><p><strong>Modules :</strong> {{modules_cacao}}</p><p><strong>Lieu :</strong> {{lieu_formation}}</p><h3>Article 1 — Contenu</h3><p>La formation couvre les bonnes pratiques agricoles (BPA), la gestion integree des ravageurs, la post-recolte et les exigences des certifications durables.</p><h3>Article 2 — Pedagogie</h3><p>Les sessions combinent apports theoriques, demonstrations pratiques en champ-ecole et echanges entre producteurs.</p><h3>Article 3 — Evaluation et attestation</h3><p>Une feuille d'emargement est tenue. Les producteurs evaluent positivement la formation via questionnaire. Une attestation est remise aux participants.</p><p class="signature">Signe entre les parties</p></div>`
  },
  {
    code: 'cafe_pesage_echantillonnage', name: "Accord de service de pesage et echantillonnage cacao",
    category: 'agro_environnement', price: 2000, priceMax: 6000,
    description: "Contrat de prestation de pesage officiel et d'echantillonnage du cacao marchand par un peseur agree ou un laboratoire en Cote d'Ivoire avant vente ou exportation.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 59,
    fieldsJson: F([
      {key:'peseur_agree',label:"Peseur / laboratoire agree",type:'text',required:true},
      {key:'client_pesage',label:"Client (cooperative / exportateur)",type:'text',required:true},
      {key:'lot_pesage',label:"Reference du lot",type:'text',required:true},
      {key:'date_pesage',label:"Date de pesage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PESAGE ET ECHANTILLONNAGE CACAO</h1><p><strong>Peseur agree :</strong> {{peseur_agree}}</p><p><strong>Client :</strong> {{client_pesage}}</p><p><strong>Lot :</strong> {{lot_pesage}}</p><p><strong>Date :</strong> {{date_pesage}}</p><h3>Article 1 — Operations de pesage</h3><p>Le pesage est effectue sur balance etalonnee et verificiee par les services de metrologie de Cote d'Ivoire. Le poids net est calcule apres deduction de la tare et de l'emballage.</p><h3>Article 2 — Echantillonnage</h3><p>Les echantillons sont preleves conformement aux procedures ISO 2291 : au moins un echantillon primaire tous les 10 sacs, constitues en echantillon composite et divises en 3 parties pour le client, le peseur et le laboratoire.</p><h3>Article 3 — Valeur probatoire</h3><p>Le certificat de pesage et le rapport d'echantillonnage ont valeur probatoire pour la transaction commerciale.</p><p class="signature">Certifie conforme par le peseur agree</p></div>`
  },
  {
    code: 'cafe_export_connaissement', name: "Accord d'exportation de cacao (connaissement, credit documentaire)",
    category: 'agro_environnement', price: 7000, priceMax: 21000,
    description: "Contrat d'exportation de cacao encadrant les modalites logistiques (connaissement maritime) et financieres (credit documentaire SWIFT) entre un exportateur ivoirien et un importateur europeen.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'exportateur_cacao',label:"Exportateur ivoirien",type:'text',required:true},
      {key:'importateur_cacao',label:"Importateur (pays et denomination)",type:'text',required:true},
      {key:'tonnage_export_cacao',label:"Tonnage exporte (tonnes MT)",type:'text',required:true},
      {key:'port_embarquement_cacao',label:"Port d'embarquement (Abidjan / San Pedro)",type:'text',required:true},
      {key:'valeur_fob',label:"Valeur FOB (USD ou EUR)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT D'EXPORTATION DE CACAO — CREDIT DOCUMENTAIRE</h1><p><strong>Exportateur :</strong> {{exportateur_cacao}}</p><p><strong>Importateur :</strong> {{importateur_cacao}}</p><p><strong>Tonnage :</strong> {{tonnage_export_cacao}} t</p><p><strong>Port d'embarquement :</strong> {{port_embarquement_cacao}}</p><p><strong>Valeur FOB :</strong> {{valeur_fob}}</p><h3>Article 1 — Conditions de livraison</h3><p>La livraison est effectuee selon les Incoterms FOB {{port_embarquement_cacao}} (Incoterms 2020). Le risque est transfere a l'embarquement sur le navire designe par l'importateur.</p><h3>Article 2 — Credit documentaire</h3><p>Le paiement est effectue par credit documentaire irrevocable et confirme, ouvert par la banque de l'importateur en faveur de l'exportateur avant chargement.</p><h3>Article 3 — Documents</h3><p>Les documents requis pour la levee du credit comprennent : connaissement net a bord, certificat d'origine, certificat phytosanitaire, certificat de pesage CCC CI et certificat de qualite.</p><p class="signature">Signe a Abidjan / {{port_embarquement_cacao}}</p></div>`
  },
  {
    code: 'cafe_transformation_locale', name: "Accord de service de transformation locale de cacao (beurre, poudre, chocolat)",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat de prestation de transformation industrielle du cacao en semi-finis (beurre, poudre, liqueur) ou en chocolat fini, valorisant la transformation locale en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'transformateur',label:"Entreprise de transformation",type:'text',required:true},
      {key:'apporteur_cacao',label:"Apporteur de matiere premiere",type:'text',required:true},
      {key:'produits_finis',label:"Produits finis (beurre, poudre, chocolat...)",type:'text',required:true},
      {key:'volume_transformation',label:"Volume a transformer (tonnes/mois)",type:'text',required:true},
      {key:'prix_fa',label:"Prix de facon (FCFA/tonne transformee)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSFORMATION LOCALE DU CACAO</h1><p><strong>Transformateur :</strong> {{transformateur}}</p><p><strong>Apporteur :</strong> {{apporteur_cacao}}</p><p><strong>Produits finis :</strong> {{produits_finis}}</p><p><strong>Volume mensuel :</strong> {{volume_transformation}} t/mois</p><p><strong>Prix de facon :</strong> {{prix_fa}} FCFA/t</p><h3>Article 1 — Specifications techniques</h3><p>La transformation est realisee selon les specifications qualite jointes en annexe (taux de matieres grasses, degre de torrefaction, finesse de mouture).</p><h3>Article 2 — Tracabilite</h3><p>Le transformateur maintient la separation des lots par origine pour permettre la tracabilite et la certification des produits finis.</p><h3>Article 3 — Rendements garantis</h3><p>Le rendement minimum garanti par tonne de cacao brut est de : beurre 40 %, poudre 40 %, dechets 20 %. Tout ecart fait l'objet d'un audit contradictoire.</p><p class="signature">Signe a Abidjan</p></div>`
  },
  {
    code: 'cafe_phytosanitaire', name: "Accord de service de traitement phytosanitaire cacao (capsides)",
    category: 'agro_environnement', price: 2500, priceMax: 7500,
    description: "Contrat de prestation de lutte phytosanitaire contre les capsides et autres ravageurs du cacao, assuree par une equipe d'agents agrees ANADER en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 62,
    fieldsJson: F([
      {key:'equipe_phyto',label:"Equipe phytosanitaire / prestataire",type:'text',required:true},
      {key:'planteur_phyto',label:"Planteur / groupement client",type:'text',required:true},
      {key:'superficie_traitee',label:"Superficie a traiter (ha)",type:'text',required:true},
      {key:'produit_phyto',label:"Produit phytosanitaire utilise (homologue CI)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAITEMENT PHYTOSANITAIRE CACAO</h1><p><strong>Prestataire :</strong> {{equipe_phyto}}</p><p><strong>Client :</strong> {{planteur_phyto}}</p><p><strong>Superficie :</strong> {{superficie_traitee}} ha</p><p><strong>Produit :</strong> {{produit_phyto}}</p><h3>Article 1 — Protocole de traitement</h3><p>Le traitement est realise selon le protocole de lutte integree recommande par l'ANADER, avec respect des delais avant recolte (DAR) indiques sur l'etiquette du produit.</p><h3>Article 2 — Equipements de protection</h3><p>L'equipe phytosanitaire porte les equipements de protection individuelle (EPI) reglementaires. L'acces aux parcelles traitees est interdit pendant 24 heures apres traitement.</h3><h3>Article 3 — Rapport</h3><p>Un rapport de traitement (dates, doses, surfaces, conditions meteorologiques) est remis au client et conserve 5 ans.</p><p class="signature">Signe entre les parties</p></div>`
  },
  {
    code: 'cafe_partenariat_chocolatier', name: "Accord de partenariat producteur-chocolatier international",
    category: 'agro_environnement', price: 8000, priceMax: 24000,
    description: "Accord-cadre de partenariat long terme entre une cooperative de producteurs ivoiriens et un chocolatier international, integrant sourcing durable, prix garanti et investissements sociaux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'cooperative_partenariat',label:"Cooperative productrice ivoirienne",type:'text',required:true},
      {key:'chocolatier',label:"Chocolatier partenaire (pays et denomination)",type:'text',required:true},
      {key:'volume_annuel_partenariat',label:"Volume annuel garanti (tonnes)",type:'text',required:true},
      {key:'prix_garanti',label:"Prix garanti minimum (USD/tonne)",type:'text',required:true},
      {key:'investissement_social',label:"Engagement d'investissement social (USD/an)",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PRODUCTEUR-CHOCOLATIER INTERNATIONAL</h1><p><strong>Cooperative :</strong> {{cooperative_partenariat}}</p><p><strong>Chocolatier :</strong> {{chocolatier}}</p><p><strong>Volume annuel garanti :</strong> {{volume_annuel_partenariat}} t</p><p><strong>Prix garanti minimum :</strong> {{prix_garanti}} USD/t</p><p><strong>Investissement social annuel :</strong> {{investissement_social}} USD</p><h3>Article 1 — Engagement d'achat</h3><p>Le chocolatier s'engage a acheter le volume annuel garanti de cacao produit par la cooperative, au prix garanti minimum ou au prix du marche si celui-ci est superieur.</p><h3>Article 2 — Qualite et durabilite</h3><p>La cooperative maintient sa certification durable (Rainforest Alliance / Fairtrade) et fournit un cacao conforme aux specifications qualite du chocolatier.</p><h3>Article 3 — Programme d'investissement</h3><p>Le chocolatier investit annuellement le montant engage dans des projets sociaux definis conjointement (education, sante, infrastructure villageoise) et verifies par un auditeur independant.</p><p class="signature">Signe en double exemplaire</p></div>`
  },
  {
    code: 'cafe_tracabilite_blockchain', name: "Accord de service de tracabilite numerique cacao (Blockchain)",
    category: 'agro_environnement', price: 6000, priceMax: 18000,
    description: "Contrat de deploiement d'une solution de tracabilite numerique basee sur la blockchain pour le suivi du cacao de la parcelle productrice jusqu'au chocolatier, en Cote d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'fournisseur_blockchain',label:"Fournisseur de la solution blockchain",type:'text',required:true},
      {key:'client_blockchain',label:"Client (cooperative / exportateur)",type:'text',required:true},
      {key:'nb_producteurs_blockchain',label:"Nombre de producteurs a enregistrer",type:'text',required:true},
      {key:'date_deploiement',label:"Date de deploiement cible",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRACABILITE NUMERIQUE CACAO (BLOCKCHAIN)</h1><p><strong>Fournisseur :</strong> {{fournisseur_blockchain}}</p><p><strong>Client :</strong> {{client_blockchain}}</p><p><strong>Producteurs enregistres :</strong> {{nb_producteurs_blockchain}}</p><p><strong>Deploiement :</strong> {{date_deploiement}}</p><h3>Article 1 — Perimetre</h3><p>La solution couvre l'enregistrement des parcelles (coordonnees GPS), des producteurs (biometrie), des lots de cacao (pesee, qualite) et des transferts de propriete jusqu'a l'exportateur.</p><h3>Article 2 — Propriete des donnees</h3><p>Les donnees enregistrees sur la blockchain appartiennent au client. Le fournisseur dispose d'un droit d'usage limite a l'execution du contrat et a l'amelioration de la plateforme, sous accord ecrit.</p><h3>Article 3 — Formation et support</h3><p>Le fournisseur assure la formation des agents de collecte, le support technique et les mises a jour de la plateforme pendant la duree du contrat.</p><p class="signature">Signe a Abidjan le {{date_deploiement}}</p></div>`
  },
  {
    code: 'cafe_rapport_campagne', name: "Rapport de campagne cacao/cafe",
    category: 'agro_environnement', price: 3000, priceMax: 9000,
    description: "Modele de rapport annuel de campagne cacaoyere et cafeiiere a l'usage des cooperatives, traitants et exportateurs de Cote d'Ivoire, conforme aux exigences du Conseil Cafe-Cacao.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'structure_rapport',label:"Structure redactrice du rapport",type:'text',required:true},
      {key:'annee_campagne',label:"Annee de campagne (ex : 2024-2025)",type:'text',required:true},
      {key:'volume_collecte_rapport',label:"Volume collecte (tonnes)",type:'text',required:true},
      {key:'chiffre_affaires',label:"Chiffre d'affaires total (FCFA)",type:'text',required:true},
      {key:'faits_marquants',label:"Faits marquants de la campagne",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE CAMPAGNE CACAO/CAFE {{annee_campagne}}</h1><p><strong>Structure :</strong> {{structure_rapport}}</p><h2>1. Resultats de collecte</h2><p>Volume collecte : <strong>{{volume_collecte_rapport}} tonnes</strong></p><p>Chiffre d'affaires : <strong>{{chiffre_affaires}} FCFA</strong></p><h2>2. Qualite</h2><p>Repartition par grade et analyse des lots refuses ou decotes.</p><h2>3. Faits marquants</h2><p>{{faits_marquants}}</p><h2>4. Perspectives</h2><p>Recommandations pour la prochaine campagne : renforcement du suivi post-recolte, acces aux intrants, digitalisation de la tracabilite.</p><p class="signature">Le President / Directeur — {{structure_rapport}}</p></div>`
  },
  {
    code: 'cafe_plan_developpement_filiere', name: "Plan de developpement filiere cacao durable",
    category: 'agro_environnement', price: 9000, priceMax: 27000,
    description: "Document strategique de planification du developpement durable de la filiere cacao d'une cooperative ou d'un bassin de production, sur un horizon de 5 a 10 ans.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'porteur_plan',label:"Porteur du plan (cooperative / federation)",type:'text',required:true},
      {key:'bassin_production',label:"Bassin de production concerne",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (ans)",type:'text',required:true},
      {key:'objectif_volume',label:"Objectif de production a terme (t/an)",type:'text',required:true},
      {key:'partenaires_strategiques',label:"Partenaires strategiques",type:'textarea',required:false},
    ]),
    body: `<div class="doc"><h1>PLAN DE DEVELOPPEMENT DE LA FILIERE CACAO DURABLE</h1><p><strong>Porteur :</strong> {{porteur_plan}}</p><p><strong>Bassin de production :</strong> {{bassin_production}}</p><p><strong>Horizon :</strong> {{horizon_plan}} ans</p><p><strong>Objectif de production :</strong> {{objectif_volume}} t/an</p><p><strong>Partenaires strategiques :</strong> {{partenaires_strategiques}}</p><h2>Axe 1 — Amelioration de la productivite</h2><p>Renovation des vergers ages, diffusion de varietes tolerantes aux maladies, generalisation des bonnes pratiques agricoles.</p><h2>Axe 2 — Qualite et certification</h2><p>Renforcement des capacites de post-recolte, maintien des certifications durables, developpement du label d'origine.</p><h2>Axe 3 — Acces aux marches</h2><p>Consolidation des partenariats avec les acheteurs internationaux, developpement de la transformation locale, numerisation de la filiere.</h2><h2>Axe 4 — Developpement social</h2><p>Lutte contre le travail des enfants, autonomisation des femmes productrices, acces aux services financiers.</p><p class="signature">Adopte par le Conseil d'Administration</p></div>`
  },
  {
    code: 'cafe_achat_inclusif', name: "Accord de service d'achat inclusif (smallholder sourcing)",
    category: 'agro_environnement', price: 5000, priceMax: 15000,
    description: "Accord encadrant un programme d'achat inclusif destine aux petits producteurs de cacao ou de cafe (smallholders) en Cote d'Ivoire, integrant appui technique et prix premium.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'acheteur_inclusif',label:"Acheteur / entreprise donneur d'ordre",type:'text',required:true},
      {key:'groupement_smallholder',label:"Groupement de petits producteurs",type:'text',required:true},
      {key:'nb_smallholders',label:"Nombre de petits producteurs participants",type:'text',required:true},
      {key:'tonnage_programme',label:"Tonnage programme annuel (tonnes)",type:'text',required:true},
      {key:'appui_technique_prevu',label:"Appui technique prevu",type:'textarea',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ACHAT INCLUSIF — SMALLHOLDER SOURCING</h1><p><strong>Acheteur :</strong> {{acheteur_inclusif}}</p><p><strong>Groupement :</strong> {{groupement_smallholder}}</p><p><strong>Petits producteurs :</strong> {{nb_smallholders}}</p><p><strong>Tonnage annuel :</strong> {{tonnage_programme}} t</p><h3>Article 1 — Engagement d'achat</h3><p>L'acheteur s'engage a acquerir le tonnage annuel programme aupres du groupement, avec prix minimum garanti superieur au prix du marche d'au moins 5 %.</p><h3>Article 2 — Appui technique</h3><p>{{appui_technique_prevu}}</p><h3>Article 3 — Inclusion du genre</h3><p>Au moins 30 % des beneficiaires du programme sont des femmes productrices. Les outils de formation et de credit leur sont accessibles en priorite.</p><p class="signature">Signe entre les parties</p></div>`
  },
  {
    code: 'cafe_charte_durable', name: "Charte du cacao durable et du commerce equitable en Afrique",
    category: 'agro_environnement', price: 4000, priceMax: 12000,
    description: "Document de reference enonçant les engagements des acteurs de la filiere cacao en matiere de durabilite, de commerce equitable et de lutte contre le travail des enfants en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'signataires_charte_cacao',label:"Signataires de la charte",type:'textarea',required:true},
      {key:'date_charte_cacao',label:"Date d'adoption",type:'date',required:true},
      {key:'champ_application_cacao',label:"Champ d'application geographique",type:'text',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DU CACAO DURABLE ET DU COMMERCE EQUITABLE EN AFRIQUE</h1><p><strong>Signataires :</strong> {{signataires_charte_cacao}}</p><p><strong>Date :</strong> {{date_charte_cacao}}</p><p><strong>Champ d'application :</strong> {{champ_application_cacao}}</p><h3>Principe 1 — Prix equitable</h3><p>Les signataires s'engagent a payer aux producteurs un prix couvrant les couts de production durables et garantissant un revenu vital decent.</p><h3>Principe 2 — Travail des enfants</h3><p>Aucun signataire ne tolere le travail des enfants dans sa chaine d'approvisionnement. Des systemes de surveillance communautaires sont mis en place et finances.</p><h3>Principe 3 — Environnement</h3><p>Les pratiques agricoles des signataires respectent la biodiversite, n'entrainent pas de deforestation et visent la reduction des emissions de gaz a effet de serre.</p><h3>Principe 4 — Transparence</h3><p>Les signataires publient annuellement un rapport de durabilite verifie par un tiers independant.</p><p class="signature">Adopte le {{date_charte_cacao}}</p></div>`
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
  console.log(`Batch 95b OK — crees:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
