import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── 25 templates CACAO / CAFÉ (préfixe cacao_) ───────────────────────────
  {
    code: 'cacao_achat_bord_champ',
    name: "Contrat d'achat de cacao bord-champ (CCC)",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Contrat d'achat de cacao bord-champ conforme aux exigences du Conseil du Café-Cacao (CCC) de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 90,
    fieldsJson: F([
      {key:'nom_acheteur',label:"Nom de l'acheteur agréé",type:'text',required:true},
      {key:'nom_producteur',label:"Nom du producteur",type:'text',required:true},
      {key:'quantite_kg',label:"Quantité en kg",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix bord-champ (FCFA/kg)",type:'text',required:true},
      {key:'localite',label:"Localité / Village",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ACHAT DE CACAO BORD-CHAMP</h1><p>Conforme aux directives du Conseil du Café-Cacao (CCC) – République de Côte d'Ivoire</p><h2>PARTIES</h2><p><strong>Acheteur agréé :</strong> {{nom_acheteur}}</p><p><strong>Producteur :</strong> {{nom_producteur}}</p><h2>OBJET</h2><p>Le présent contrat porte sur l'achat de <strong>{{quantite_kg}} kg</strong> de cacao en fèves sèches au prix bord-champ de <strong>{{prix_unitaire}} FCFA/kg</strong>.</p><h2>LIEU ET DATE DE LIVRAISON</h2><p>Localité : {{localite}}</p><p>Date de livraison convenue : {{date_livraison}}</p><h2>CONDITIONS GÉNÉRALES</h2><p>Le cacao livré doit respecter les normes de qualité définies par le CCC (taux d'humidité, taux de fèves défectueuses). Tout différend sera soumis à la médiation du CCC avant tout recours judiciaire.</p><h2>SIGNATURES</h2><p>L'Acheteur agréé : _____________________ Date : ___________</p><p>Le Producteur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_vente_exportateur_fob',
    name: "Contrat de vente de cacao exportateur-acheteur (FOB Abidjan)",
    category: 'agro_environnement',
    price: 6000, priceMax: 18000,
    description: "Contrat international de vente de fèves de cacao en conditions FOB Port d'Abidjan, conforme aux Incoterms et aux règles CCC.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'exportateur',label:"Exportateur agréé CCC",type:'text',required:true},
      {key:'acheteur_international',label:"Acheteur international",type:'text',required:true},
      {key:'quantite_tonnes',label:"Quantité (tonnes métriques)",type:'text',required:true},
      {key:'prix_tonne',label:"Prix FOB (USD/tonne)",type:'text',required:true},
      {key:'date_expedition',label:"Date d'expédition",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE VENTE DE CACAO – FOB ABIDJAN</h1><h2>PARTIES</h2><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Acheteur international :</strong> {{acheteur_international}}</p><h2>MARCHANDISE</h2><p>Fèves de cacao sèches, origine Côte d'Ivoire, qualité CCC Grade I.</p><p>Quantité : <strong>{{quantite_tonnes}} tonnes métriques</strong></p><p>Prix : <strong>{{prix_tonne}} USD/tonne FOB Port d'Abidjan</strong></p><h2>CONDITIONS D'EXPÉDITION</h2><p>Date d'expédition prévue : {{date_expedition}}</p><p>Incoterms FOB – Port d'embarquement : Abidjan, Côte d'Ivoire.</p><h2>PAIEMENT</h2><p>Lettre de crédit irrévocable et confirmée, ouverture à la commande, documents contre paiement.</p><h2>LOI APPLICABLE</h2><p>Droit OHADA. Arbitrage CCJA en cas de litige.</p><h2>SIGNATURES</h2><p>Exportateur : _____________________ Date : ___________</p><p>Acheteur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_tracabilite_geo',
    name: "Accord de service de traçabilité cacao (géolocalisation)",
    category: 'agro_environnement',
    price: 3500, priceMax: 10000,
    description: "Accord de service pour la mise en place d'un système de traçabilité géolocalisée des parcelles et des lots de cacao, conforme aux exigences des règlements européens anti-déforestation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de traçabilité",type:'text',required:true},
      {key:'cooperative',label:"Coopérative / Exportateur",type:'text',required:true},
      {key:'nb_producteurs',label:"Nombre de producteurs couverts",type:'text',required:true},
      {key:'zone_geographique',label:"Zone géographique (département)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRAÇABILITÉ CACAO – GÉOLOCALISATION</h1><h2>PARTIES</h2><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Client :</strong> {{cooperative}}</p><h2>OBJET</h2><p>Le Prestataire s'engage à déployer un système de traçabilité géolocalisée pour <strong>{{nb_producteurs}} producteurs</strong> situés dans le département de <strong>{{zone_geographique}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>PRESTATIONS</h2><ul><li>Cartographie GPS des parcelles cacaoyères</li><li>Délivrance de codes QR par parcelle et par lot</li><li>Plateforme numérique de suivi des flux physiques</li><li>Rapports de traçabilité conformes au règlement UE 2023/1115</li></ul><h2>CONFIDENTIALITÉ</h2><p>Les données collectées sont propriété exclusive du Client. Le Prestataire s'interdit toute cession à des tiers.</p><h2>SIGNATURES</h2><p>Prestataire : _____________________ Date : ___________</p><p>Client : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_certification_durable',
    name: "Accord de service de certification durable cacao (Rainforest, UTZ, Fairtrade)",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Accord encadrant la prestation d'accompagnement vers la certification durable (Rainforest Alliance, UTZ, Fairtrade) pour une coopérative cacaoyère ivoirienne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'organisme_certif',label:"Organisme de certification",type:'text',required:true},
      {key:'cooperative',label:"Coopérative bénéficiaire",type:'text',required:true},
      {key:'type_certification',label:"Type de certification (RA / UTZ / Fairtrade)",type:'text',required:true},
      {key:'date_audit',label:"Date d'audit prévue",type:'date',required:true},
      {key:'cout_certification',label:"Coût de certification (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION DURABLE CACAO</h1><h2>PARTIES</h2><p><strong>Organisme :</strong> {{organisme_certif}}</p><p><strong>Coopérative :</strong> {{cooperative}}</p><h2>OBJET</h2><p>Le présent accord porte sur l'accompagnement à la certification <strong>{{type_certification}}</strong> pour la saison cacaoyère en cours.</p><h2>PROGRAMME D'ACCOMPAGNEMENT</h2><ul><li>Pré-audit interne et identification des écarts</li><li>Formation des agents et des producteurs aux critères de durabilité</li><li>Audit de certification prévu le : <strong>{{date_audit}}</strong></li><li>Coût de la certification : <strong>{{cout_certification}} FCFA</strong></li></ul><h2>OBLIGATIONS DES PARTIES</h2><p>La Coopérative s'engage à respecter les critères du référentiel choisi et à faciliter l'accès aux parcelles lors des audits.</p><h2>SIGNATURES</h2><p>Organisme : _____________________ Date : ___________</p><p>Coopérative : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_travail_enfants',
    name: "Accord de service de lutte contre le travail des enfants (cacao)",
    category: 'agro_environnement',
    price: 3000, priceMax: 9000,
    description: "Accord de partenariat pour la prévention et l'élimination du travail des enfants dans la filière cacao, conforme au CLMRS et aux engagements de l'industrie chocolatière.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'ong_partenaire',label:"ONG / Organisation partenaire",type:'text',required:true},
      {key:'cooperative',label:"Coopérative",type:'text',required:true},
      {key:'nb_menages',label:"Nombre de ménages ciblés",type:'text',required:true},
      {key:'zone',label:"Zone d'intervention",type:'text',required:true},
      {key:'date_debut',label:"Date de début du programme",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LUTTE CONTRE LE TRAVAIL DES ENFANTS – FILIÈRE CACAO</h1><h2>PARTIES</h2><p><strong>Organisation partenaire :</strong> {{ong_partenaire}}</p><p><strong>Coopérative :</strong> {{cooperative}}</p><h2>CONTEXTE</h2><p>Conformément aux engagements de la Déclaration de Washington et du cadre CLMRS (Child Labour Monitoring and Remediation System).</p><h2>OBJET</h2><p>Ce programme couvre <strong>{{nb_menages}} ménages</strong> dans la zone de <strong>{{zone}}</strong> à compter du <strong>{{date_debut}}</strong>.</p><h2>ACTIVITÉS</h2><ul><li>Identification et suivi des enfants à risque</li><li>Sensibilisation des producteurs et des communautés</li><li>Appui à la scolarisation et aux activités génératrices de revenus</li><li>Rapport semestriel de suivi transmis aux partenaires industriels</li></ul><h2>SIGNATURES</h2><p>Organisation : _____________________ Date : ___________</p><p>Coopérative : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_cooperative',
    name: "Accord de service de coopérative cacaoyère",
    category: 'agro_environnement',
    price: 3000, priceMax: 9000,
    description: "Accord de services entre une coopérative cacaoyère et ses membres producteurs, définissant les droits, obligations et modalités de commercialisation.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'nom_cooperative',label:"Nom de la coopérative",type:'text',required:true},
      {key:'num_agrement',label:"Numéro d'agrément CCC",type:'text',required:true},
      {key:'nom_membre',label:"Nom du membre producteur",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion",type:'date',required:true},
      {key:'quota_annuel',label:"Quota annuel estimé (kg)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – COOPÉRATIVE CACAOYÈRE</h1><h2>PARTIES</h2><p><strong>Coopérative :</strong> {{nom_cooperative}} – Agrément CCC N° {{num_agrement}}</p><p><strong>Membre producteur :</strong> {{nom_membre}}</p><h2>ADHÉSION</h2><p>Date d'adhésion : {{date_adhesion}} – Quota annuel estimé : {{quota_annuel}} kg</p><h2>ENGAGEMENTS DE LA COOPÉRATIVE</h2><ul><li>Collecte et commercialisation du cacao aux prix planchers CCC</li><li>Fourniture d'intrants subventionnés</li><li>Accompagnement technique et formation</li><li>Reversement du différentiel de qualité et de la prime de durabilité</li></ul><h2>ENGAGEMENTS DU MEMBRE</h2><ul><li>Livraison exclusive à la coopérative du quota déclaré</li><li>Respect des normes de qualité CCC</li><li>Participation aux assemblées générales</li></ul><h2>SIGNATURES</h2><p>Coopérative : _____________________ Date : ___________</p><p>Membre : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_groupement_producteurs',
    name: "Accord de service de groupement de producteurs cacao",
    category: 'agro_environnement',
    price: 2500, priceMax: 7500,
    description: "Accord constitutif et de fonctionnement d'un groupement informel de producteurs de cacao en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 65,
    fieldsJson: F([
      {key:'nom_groupement',label:"Nom du groupement",type:'text',required:true},
      {key:'village',label:"Village / Sous-préfecture",type:'text',required:true},
      {key:'president',label:"Nom du président",type:'text',required:true},
      {key:'nb_membres',label:"Nombre de membres",type:'text',required:true},
      {key:'date_creation',label:"Date de création",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – GROUPEMENT DE PRODUCTEURS CACAO</h1><h2>IDENTIFICATION</h2><p><strong>Groupement :</strong> {{nom_groupement}}</p><p><strong>Village / Sous-préfecture :</strong> {{village}}</p><p><strong>Président :</strong> {{president}} – <strong>Membres :</strong> {{nb_membres}} – <strong>Créé le :</strong> {{date_creation}}</p><h2>OBJET</h2><p>Le présent accord organise la mutualisation des moyens de production, le stockage commun et la vente groupée du cacao produit par les membres.</p><h2>FONCTIONNEMENT</h2><ul><li>Réunion mensuelle obligatoire</li><li>Caisse de solidarité alimentée par une cotisation annuelle</li><li>Vente groupée au meilleur prix négocié auprès des coopératives agréées CCC</li></ul><h2>SIGNATURES</h2><p>Président : _____________________ Date : ___________</p><p>Secrétaire : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_conseil_agricole_anader',
    name: "Accord de service de conseil agricole cacao (ANADER)",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Accord de prestation de conseil agricole entre l'ANADER et une coopérative cacaoyère pour l'appui technique aux producteurs.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'agence_anader',label:"Agence ANADER concernée",type:'text',required:true},
      {key:'cooperative',label:"Coopérative bénéficiaire",type:'text',required:true},
      {key:'nb_producteurs',label:"Nombre de producteurs",type:'text',required:true},
      {key:'thematiques',label:"Thématiques de conseil",type:'textarea',required:true},
      {key:'periode',label:"Période de prestation",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONSEIL AGRICOLE CACAO – ANADER</h1><h2>PARTIES</h2><p><strong>Prestataire :</strong> Agence Nationale d'Appui au Développement Rural (ANADER) – Agence de {{agence_anader}}</p><p><strong>Bénéficiaire :</strong> {{cooperative}}</p><h2>OBJET</h2><p>Fourniture de services de conseil agricole à <strong>{{nb_producteurs}} producteurs</strong> sur la période : <strong>{{periode}}</strong>.</p><h2>THÉMATIQUES</h2><p>{{thematiques}}</p><h2>MODALITÉS</h2><ul><li>Visites de parcelles et démonstrations pratiques</li><li>Formation en salle et travaux pratiques</li><li>Rapports de suivi trimestriels</li></ul><h2>SIGNATURES</h2><p>ANADER : _____________________ Date : ___________</p><p>Coopérative : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_recherche_varietale_cnra',
    name: "Accord de service de recherche variétale cacao (CNRA)",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Accord de partenariat de recherche variétale cacao entre le Centre National de Recherche Agronomique (CNRA) et un acteur de la filière.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'partenaire',label:"Partenaire (coopérative / exportateur)",type:'text',required:true},
      {key:'programme',label:"Programme de recherche",type:'text',required:true},
      {key:'zone_essais',label:"Zone d'essais",type:'text',required:true},
      {key:'duree',label:"Durée du partenariat",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RECHERCHE VARIÉTALE CACAO – CNRA</h1><h2>PARTIES</h2><p><strong>CNRA :</strong> Centre National de Recherche Agronomique, Abidjan</p><p><strong>Partenaire :</strong> {{partenaire}}</p><h2>OBJET</h2><p>Programme de recherche : <strong>{{programme}}</strong></p><p>Zone d'essais : <strong>{{zone_essais}}</strong> – Durée : <strong>{{duree}}</strong> – Début : <strong>{{date_debut}}</strong></p><h2>ACTIVITÉS</h2><ul><li>Mise en place de parcelles d'essais variétaux</li><li>Suivi agronomique et collecte de données</li><li>Diffusion des clones performants aux producteurs</li></ul><h2>PROPRIÉTÉ INTELLECTUELLE</h2><p>Les résultats de la recherche sont propriété conjointe des parties. Toute publication requiert l'accord des deux parties.</p><h2>SIGNATURES</h2><p>CNRA : _____________________ Date : ___________</p><p>Partenaire : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_plants_certifies',
    name: "Accord de service de plants certifiés cacao",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Contrat de fourniture de plants certifiés de cacao (clones hybrides CNRA) à une coopérative ou un producteur en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 68,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur de plants certifiés",type:'text',required:true},
      {key:'acheteur',label:"Coopérative / Producteur",type:'text',required:true},
      {key:'quantite_plants',label:"Quantité de plants",type:'text',required:true},
      {key:'clone',label:"Clone / Variété",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – FOURNITURE DE PLANTS CERTIFIÉS CACAO</h1><h2>PARTIES</h2><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>Acheteur :</strong> {{acheteur}}</p><h2>OBJET</h2><p>Fourniture de <strong>{{quantite_plants}} plants</strong> de la variété/clone <strong>{{clone}}</strong>, certifiés conformes aux normes CNRA.</p><p>Date de livraison : <strong>{{date_livraison}}</strong></p><h2>GARANTIES</h2><ul><li>Santé phytosanitaire garantie à la livraison</li><li>Certificat phytosanitaire MINADER fourni</li><li>Taux de reprise garanti à 90 % dans les 30 jours</li></ul><h2>SIGNATURES</h2><p>Fournisseur : _____________________ Date : ___________</p><p>Acheteur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_traitement_phytosanitaire',
    name: "Accord de service de traitement phytosanitaire cacao",
    category: 'agro_environnement',
    price: 3000, priceMax: 8000,
    description: "Contrat de prestation de traitement phytosanitaire (fongicides, insecticides) sur parcelles cacaoyères en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire phytosanitaire",type:'text',required:true},
      {key:'producteur',label:"Producteur / Coopérative",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie à traiter (ha)",type:'text',required:true},
      {key:'produits',label:"Produits phytosanitaires utilisés",type:'textarea',required:true},
      {key:'date_traitement',label:"Date de traitement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – TRAITEMENT PHYTOSANITAIRE CACAO</h1><h2>PARTIES</h2><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Client :</strong> {{producteur}}</p><h2>OBJET</h2><p>Réalisation de traitements phytosanitaires sur <strong>{{superficie_ha}} ha</strong> de cacaoyère.</p><p>Date d'intervention : <strong>{{date_traitement}}</strong></p><h2>PRODUITS UTILISÉS</h2><p>{{produits}}</p><h2>SÉCURITÉ</h2><ul><li>Tous les produits sont homologués par le MINADER</li><li>Port des EPI obligatoire pour les applicateurs</li><li>Respect des délais avant récolte (DAR)</li></ul><h2>SIGNATURES</h2><p>Prestataire : _____________________ Date : ___________</p><p>Client : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_fermentation_sechage',
    name: "Accord de service de fermentation et séchage cacao",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Accord de prestation de service pour la fermentation et le séchage des fèves de cacao frais, étapes déterminantes pour la qualité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire (centre de fermentation)",type:'text',required:true},
      {key:'producteur',label:"Producteur apporteur",type:'text',required:true},
      {key:'quantite_kg_frais',label:"Quantité de cacao frais (kg)",type:'text',required:true},
      {key:'cout_traitement',label:"Coût du traitement (FCFA/kg)",type:'text',required:true},
      {key:'date_apport',label:"Date d'apport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – FERMENTATION ET SÉCHAGE CACAO</h1><h2>PARTIES</h2><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Producteur apporteur :</strong> {{producteur}}</p><h2>OBJET</h2><p>Prise en charge de <strong>{{quantite_kg_frais}} kg</strong> de cacao frais pour fermentation et séchage au coût de <strong>{{cout_traitement}} FCFA/kg</strong>.</p><p>Date d'apport : <strong>{{date_apport}}</strong></p><h2>PROCESSUS</h2><ul><li>Fermentation en caisse pendant 5 à 7 jours</li><li>Séchage solaire ou artificiel jusqu'à 8 % d'humidité</li><li>Contrôle de qualité avant restitution</li></ul><h2>RESTITUTION</h2><p>Le prestataire restitue les fèves sèches pesées et classées selon les normes CCC dans un délai de 10 jours ouvrables.</p><h2>SIGNATURES</h2><p>Prestataire : _____________________ Date : ___________</p><p>Producteur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_magasinage_entrepot',
    name: "Accord de service de magasinage cacao (entrepôt)",
    category: 'agro_environnement',
    price: 3000, priceMax: 8000,
    description: "Contrat de magasinage et de gardiennage de fèves de cacao sèches dans un entrepôt agréé CCC en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'magasinier',label:"Magasinier / Entrepôt agréé",type:'text',required:true},
      {key:'deposant',label:"Déposant (coopérative / exportateur)",type:'text',required:true},
      {key:'quantite_sacs',label:"Quantité (sacs de 65 kg)",type:'text',required:true},
      {key:'duree_stockage',label:"Durée de stockage (semaines)",type:'text',required:true},
      {key:'date_entree',label:"Date d'entrée en entrepôt",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MAGASINAGE CACAO</h1><h2>PARTIES</h2><p><strong>Magasinier :</strong> {{magasinier}}</p><p><strong>Déposant :</strong> {{deposant}}</p><h2>OBJET</h2><p>Stockage de <strong>{{quantite_sacs}} sacs</strong> de fèves sèches pendant <strong>{{duree_stockage}} semaines</strong> à compter du <strong>{{date_entree}}</strong>.</p><h2>CONDITIONS DE STOCKAGE</h2><ul><li>Entrepôt sec, aéré, à l'abri des rongeurs et insectes</li><li>Taux d'humidité maintenu inférieur à 75 %</li><li>Assurance entrepôt souscrite par le magasinier</li></ul><h2>TARIFICATION</h2><p>Frais de magasinage conformes au barème CCC en vigueur.</p><h2>SIGNATURES</h2><p>Magasinier : _____________________ Date : ___________</p><p>Déposant : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_transport_camionneurs',
    name: "Accord de service de transport cacao (camionneurs)",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Contrat de transport routier de fèves de cacao entre le point de collecte et le magasin ou le port d'embarquement.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 67,
    fieldsJson: F([
      {key:'transporteur',label:"Transporteur (société / conducteur)",type:'text',required:true},
      {key:'donneur_ordre',label:"Donneur d'ordre (coopérative)",type:'text',required:true},
      {key:'origine',label:"Point d'origine",type:'text',required:true},
      {key:'destination',label:"Destination",type:'text',required:true},
      {key:'date_chargement',label:"Date de chargement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – TRANSPORT DE CACAO</h1><h2>PARTIES</h2><p><strong>Transporteur :</strong> {{transporteur}}</p><p><strong>Donneur d'ordre :</strong> {{donneur_ordre}}</p><h2>TRAJET</h2><p>De : <strong>{{origine}}</strong> à <strong>{{destination}}</strong></p><p>Date de chargement : <strong>{{date_chargement}}</strong></p><h2>CONDITIONS</h2><ul><li>Véhicule propre, bâché, conforme aux normes de transport de denrées agricoles</li><li>Bon de livraison signé à la réception</li><li>Transporteur responsable des pertes et avaries en cours de transport</li></ul><h2>RÉMUNÉRATION</h2><p>Conformément au barème de fret routier en vigueur sur l'axe concerné.</p><h2>SIGNATURES</h2><p>Transporteur : _____________________ Date : ___________</p><p>Donneur d'ordre : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_exportation_agree',
    name: "Contrat d'exportation de cacao (exportateur agréé CCC)",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Contrat-cadre d'exportation de fèves de cacao entre un exportateur agréé par le CCC et un acheteur international, incluant les clauses de qualité et de conformité réglementaire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'exportateur',label:"Exportateur agréé CCC",type:'text',required:true},
      {key:'acheteur',label:"Acheteur étranger",type:'text',required:true},
      {key:'contrat_ref',label:"Référence du contrat CCC",type:'text',required:true},
      {key:'volume_tonnes',label:"Volume contractuel (tonnes)",type:'text',required:true},
      {key:'date_validite',label:"Date de validité du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'EXPORTATION DE CACAO – EXPORTATEUR AGRÉÉ CCC</h1><h2>PARTIES</h2><p><strong>Exportateur agréé :</strong> {{exportateur}}</p><p><strong>Acheteur :</strong> {{acheteur}}</p><h2>RÉFÉRENCE CCC</h2><p>N° de contrat CCC : <strong>{{contrat_ref}}</strong> – Volume : <strong>{{volume_tonnes}} tonnes</strong> – Validité : <strong>{{date_validite}}</strong></p><h2>QUALITÉ ET NORMES</h2><ul><li>Grade I ou Grade II selon classification CCC</li><li>Certificat d'origine MINADER obligatoire</li><li>Pesée officielle à la bascule agréée CCC</li></ul><h2>PAIEMENT ET GARANTIES</h2><p>Paiement par lettre de crédit confirmée, irrévocable, domiciliée dans une banque agréée par la BCEAO.</p><h2>LOI APPLICABLE</h2><p>Droit OHADA. Toute contestation soumise à l'arbitrage de la CCJA d'Abidjan.</p><h2>SIGNATURES</h2><p>Exportateur : _____________________ Date : ___________</p><p>Acheteur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_vente_cafe',
    name: "Accord de vente de café (contrat arabica/robusta)",
    category: 'agro_environnement',
    price: 3500, priceMax: 10000,
    description: "Contrat de vente de café vert (arabica ou robusta), conforme aux règles du Conseil du Café-Cacao de Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'vendeur',label:"Vendeur (producteur / coopérative)",type:'text',required:true},
      {key:'acheteur',label:"Acheteur",type:'text',required:true},
      {key:'type_cafe',label:"Type de café (Arabica / Robusta)",type:'text',required:true},
      {key:'quantite_kg',label:"Quantité (kg)",type:'text',required:true},
      {key:'prix_kg',label:"Prix (FCFA/kg)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE VENTE DE CAFÉ</h1><h2>PARTIES</h2><p><strong>Vendeur :</strong> {{vendeur}}</p><p><strong>Acheteur :</strong> {{acheteur}}</p><h2>MARCHANDISE</h2><p>Type : <strong>{{type_cafe}}</strong> – Quantité : <strong>{{quantite_kg}} kg</strong> – Prix : <strong>{{prix_kg}} FCFA/kg</strong></p><h2>QUALITÉ</h2><ul><li>Café en parche ou café vert, humidité maximale 12 %</li><li>Conforme aux normes CCC en vigueur</li></ul><h2>PAIEMENT</h2><p>Paiement comptant à la livraison ou selon modalités annexées.</p><h2>SIGNATURES</h2><p>Vendeur : _____________________ Date : ___________</p><p>Acheteur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_cooperative_cafeiere',
    name: "Accord de service de coopérative caféière",
    category: 'agro_environnement',
    price: 3000, priceMax: 9000,
    description: "Accord de services entre une coopérative caféière et ses membres, portant sur la collecte, la commercialisation et l'appui technique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'cooperative',label:"Nom de la coopérative",type:'text',required:true},
      {key:'membre',label:"Nom du membre",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie caféière (ha)",type:'text',required:true},
      {key:'zone',label:"Zone de production",type:'text',required:true},
      {key:'date_adhesion',label:"Date d'adhésion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – COOPÉRATIVE CAFÉIÈRE</h1><h2>PARTIES</h2><p><strong>Coopérative :</strong> {{cooperative}}</p><p><strong>Membre :</strong> {{membre}} – Zone : {{zone}} – Surface : {{superficie_ha}} ha</p><p>Date d'adhésion : {{date_adhesion}}</p><h2>SERVICES FOURNIS</h2><ul><li>Collecte et commercialisation du café aux prix CCC garantis</li><li>Accès aux intrants subventionnés</li><li>Formation agronomique et renforcement des capacités</li></ul><h2>OBLIGATIONS DU MEMBRE</h2><ul><li>Livraison exclusive du quota à la coopérative</li><li>Paiement de la cotisation annuelle</li></ul><h2>SIGNATURES</h2><p>Coopérative : _____________________ Date : ___________</p><p>Membre : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_certification_cafe_4c',
    name: "Accord de certification café (4C, RFA)",
    category: 'agro_environnement',
    price: 3500, priceMax: 10000,
    description: "Accord d'accompagnement vers la certification café 4C (Common Code for the Coffee Community) ou Rainforest Alliance pour une coopérative caféière ivoirienne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisme',label:"Organisme de certification",type:'text',required:true},
      {key:'cooperative',label:"Coopérative caféière",type:'text',required:true},
      {key:'type_certif',label:"Type de certification (4C / RFA)",type:'text',required:true},
      {key:'nb_membres',label:"Nombre de membres",type:'text',required:true},
      {key:'date_audit',label:"Date d'audit prévu",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATION CAFÉ</h1><h2>PARTIES</h2><p><strong>Organisme :</strong> {{organisme}}</p><p><strong>Coopérative :</strong> {{cooperative}}</p><h2>CERTIFICATION VISÉE</h2><p><strong>{{type_certif}}</strong> – Membres concernés : <strong>{{nb_membres}}</strong> – Audit prévu : <strong>{{date_audit}}</strong></p><h2>PROGRAMME</h2><ul><li>Pré-audit et plan d'actions correctives</li><li>Formation des producteurs aux pratiques durables</li><li>Audit externe et délivrance du certificat</li><li>Suivi annuel de conformité</li></ul><h2>SIGNATURES</h2><p>Organisme : _____________________ Date : ___________</p><p>Coopérative : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_transformation_broyage',
    name: "Accord de service de transformation cacao (broyage, beurre, poudre)",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Contrat de service de transformation industrielle de fèves de cacao en masse, beurre et poudre de cacao en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'transformateur',label:"Transformateur industriel",type:'text',required:true},
      {key:'client',label:"Client (exportateur / industrie)",type:'text',required:true},
      {key:'quantite_tonnes',label:"Quantité de fèves à transformer (tonnes)",type:'text',required:true},
      {key:'produits_finis',label:"Produits finis attendus",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début de la campagne",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – TRANSFORMATION CACAO (BROYAGE, BEURRE, POUDRE)</h1><h2>PARTIES</h2><p><strong>Transformateur :</strong> {{transformateur}}</p><p><strong>Client :</strong> {{client}}</p><h2>OBJET</h2><p>Transformation de <strong>{{quantite_tonnes}} tonnes</strong> de fèves de cacao à compter du <strong>{{date_debut}}</strong>.</p><h2>PRODUITS FINIS</h2><p>{{produits_finis}}</p><h2>CONTRÔLE QUALITÉ</h2><ul><li>Analyses physico-chimiques en cours de production</li><li>Certification des produits finis conforme aux normes CODEX et UE</li></ul><h2>SIGNATURES</h2><p>Transformateur : _____________________ Date : ___________</p><p>Client : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_chocolaterie_artisanale',
    name: "Accord de service de chocolaterie artisanale",
    category: 'agro_environnement',
    price: 3000, priceMax: 9000,
    description: "Accord de prestation entre un artisan chocolatier ivoirien et un client (hôtel, restaurant, boutique) pour la fourniture de chocolat artisanal.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'chocolatier',label:"Artisan chocolatier",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'produits',label:"Produits commandés",type:'textarea',required:true},
      {key:'quantite',label:"Quantité (unités / kg)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CHOCOLATERIE ARTISANALE</h1><h2>PARTIES</h2><p><strong>Artisan chocolatier :</strong> {{chocolatier}}</p><p><strong>Client :</strong> {{client}}</p><h2>COMMANDE</h2><p>Produits : {{produits}}</p><p>Quantité : <strong>{{quantite}}</strong> – Livraison le : <strong>{{date_livraison}}</strong></p><h2>QUALITÉ</h2><ul><li>Cacao origin Côte d'Ivoire, certifié ou tracé</li><li>Absence de conservateurs artificiels</li><li>Étiquetage conforme aux réglementations en vigueur</li></ul><h2>SIGNATURES</h2><p>Chocolatier : _____________________ Date : ___________</p><p>Client : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_partenariat_producteur_exportateur',
    name: "Accord de partenariat producteur-exportateur cacao",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Accord-cadre de partenariat pluriannuel entre un exportateur agréé et un groupement de producteurs de cacao en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'exportateur',label:"Exportateur agréé",type:'text',required:true},
      {key:'groupement',label:"Groupement / Coopérative de producteurs",type:'text',required:true},
      {key:'volume_annuel',label:"Volume annuel garanti (tonnes)",type:'text',required:true},
      {key:'duree',label:"Durée du partenariat (années)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT PRODUCTEUR-EXPORTATEUR CACAO</h1><h2>PARTIES</h2><p><strong>Exportateur agréé :</strong> {{exportateur}}</p><p><strong>Groupement / Coopérative :</strong> {{groupement}}</p><h2>OBJET</h2><p>Partenariat pluriannuel de <strong>{{duree}} ans</strong> portant sur un volume annuel garanti de <strong>{{volume_annuel}} tonnes</strong>, signé le <strong>{{date_signature}}</strong>.</p><h2>ENGAGEMENTS DE L'EXPORTATEUR</h2><ul><li>Prix d'achat garanti au prix plancher CCC</li><li>Préfinancement des intrants agricoles</li><li>Appui technique et renforcement des capacités</li></ul><h2>ENGAGEMENTS DU GROUPEMENT</h2><ul><li>Livraison du volume garanti à l'exportateur</li><li>Respect des normes qualité CCC</li><li>Mise en œuvre des pratiques durables convenues</li></ul><h2>SIGNATURES</h2><p>Exportateur : _____________________ Date : ___________</p><p>Groupement : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_rapport_performance_filiere',
    name: "Rapport de performance filière cacao",
    category: 'agro_environnement',
    price: 3000, priceMax: 8000,
    description: "Modèle de rapport annuel de performance de la filière cacao pour une coopérative ou un exportateur ivoirien, incluant indicateurs économiques, sociaux et environnementaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'organisation',label:"Organisation (coopérative / exportateur)",type:'text',required:true},
      {key:'campagne',label:"Campagne cacaoyère (ex : 2024-2025)",type:'text',required:true},
      {key:'volume_collecte',label:"Volume collecté (tonnes)",type:'text',required:true},
      {key:'nb_producteurs',label:"Nombre de producteurs membres",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – FILIÈRE CACAO</h1><p><strong>Organisation :</strong> {{organisation}} – <strong>Campagne :</strong> {{campagne}} – <strong>Date :</strong> {{date_rapport}}</p><h2>INDICATEURS ÉCONOMIQUES</h2><p>Volume collecté : <strong>{{volume_collecte}} tonnes</strong> – Producteurs membres : <strong>{{nb_producteurs}}</strong></p><h2>QUALITÉ</h2><p>Taux de Grade I, taux de rejet, différentiel de qualité perçu.</p><h2>DURABILITÉ</h2><p>Superficies certifiées, nombre d'enfants scolarisés, superficie reboisée.</p><h2>PERSPECTIVES</h2><p>Objectifs pour la prochaine campagne et plan d'actions prioritaires.</p></div>`
  },
  {
    code: 'cacao_plan_developpement_durable',
    name: "Plan de développement durable filière cacao",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Modèle de plan de développement durable pour une coopérative cacaoyère ivoirienne, couvrant les dimensions économique, sociale et environnementale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'cooperative',label:"Coopérative",type:'text',required:true},
      {key:'periode',label:"Période du plan (ex : 2025-2030)",type:'text',required:true},
      {key:'vision',label:"Vision stratégique",type:'textarea',required:true},
      {key:'budget_global',label:"Budget global estimé (FCFA)",type:'text',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DURABLE – FILIÈRE CACAO</h1><p><strong>Coopérative :</strong> {{cooperative}} – <strong>Période :</strong> {{periode}} – <strong>Validé le :</strong> {{date_validation}}</p><h2>VISION</h2><p>{{vision}}</p><h2>AXES STRATÉGIQUES</h2><ul><li>Axe 1 : Amélioration de la productivité et de la qualité</li><li>Axe 2 : Renforcement de la durabilité environnementale (zéro déforestation)</li><li>Axe 3 : Inclusion sociale (femmes, jeunes, lutte contre le travail des enfants)</li><li>Axe 4 : Gouvernance et viabilité financière</li></ul><h2>BUDGET</h2><p>Budget global estimé : <strong>{{budget_global}} FCFA</strong></p></div>`
  },
  {
    code: 'cacao_partenariat_ccc_industrie',
    name: "Accord de partenariat CCC-industrie chocolatière",
    category: 'agro_environnement',
    price: 6000, priceMax: 18000,
    description: "Accord de partenariat public-privé entre le Conseil du Café-Cacao (CCC) de Côte d'Ivoire et un industriel chocolatier international pour la promotion du cacao durable.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'industriel',label:"Industriel chocolatier partenaire",type:'text',required:true},
      {key:'programme',label:"Programme de partenariat",type:'text',required:true},
      {key:'investissement_prevu',label:"Investissement prévu (USD)",type:'text',required:true},
      {key:'nb_producteurs_cibles',label:"Nombre de producteurs ciblés",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CCC – INDUSTRIE CHOCOLATIÈRE</h1><h2>PARTIES</h2><p><strong>Conseil du Café-Cacao (CCC) :</strong> Représenté par son Directeur Général</p><p><strong>Industriel partenaire :</strong> {{industriel}}</p><h2>PROGRAMME</h2><p>Programme : <strong>{{programme}}</strong> – Investissement prévu : <strong>{{investissement_prevu}} USD</strong> – Producteurs ciblés : <strong>{{nb_producteurs_cibles}}</strong></p><p>Signé le : <strong>{{date_signature}}</strong></p><h2>ENGAGEMENTS DU CCC</h2><ul><li>Facilitation de l'accès aux coopératives partenaires</li><li>Appui institutionnel et partage de données</li></ul><h2>ENGAGEMENTS DE L'INDUSTRIEL</h2><ul><li>Investissement dans la durabilité (formation, intrants, certification)</li><li>Achat à prime de durabilité</li><li>Publication de rapports annuels de progrès</li></ul><h2>SIGNATURES</h2><p>CCC : _____________________ Date : ___________</p><p>Industriel : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'cacao_charte_producteur_durable',
    name: "Charte du producteur de cacao durable",
    category: 'agro_environnement',
    price: 2000, priceMax: 6000,
    description: "Charte d'engagement individuel du producteur de cacao durable en Côte d'Ivoire, couvrant les bonnes pratiques agricoles, sociales et environnementales.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_producteur',label:"Nom et prénoms du producteur",type:'text',required:true},
      {key:'cooperative',label:"Coopérative d'appartenance",type:'text',required:true},
      {key:'village',label:"Village / Département",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie totale (ha)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DU PRODUCTEUR DE CACAO DURABLE</h1><p>Je soussigné(e) <strong>{{nom_producteur}}</strong>, membre de la coopérative <strong>{{cooperative}}</strong>, domicilié(e) à <strong>{{village}}</strong>, exploitant <strong>{{superficie_ha}} ha</strong> de cacaoyère, m'engage solennellement à :</p><h2>ENGAGEMENTS AGRICOLES</h2><ul><li>Appliquer les bonnes pratiques agricoles recommandées par l'ANADER</li><li>N'utiliser que des produits phytosanitaires homologués</li><li>Maintenir la productivité de mes parcelles par les soins culturaux appropriés</li></ul><h2>ENGAGEMENTS SOCIAUX</h2><ul><li>Ne pas employer d'enfants de moins de 18 ans aux travaux dangereux</li><li>Scolariser tous les enfants de mon ménage</li><li>Respecter les droits des travailleurs agricoles</li></ul><h2>ENGAGEMENTS ENVIRONNEMENTAUX</h2><ul><li>Ne pas défricher de nouvelles forêts après le 31/12/2020</li><li>Planter des arbres d'ombrage dans mes parcelles</li><li>Gérer les déchets agricoles de manière responsable</li></ul><p>Fait à {{village}}, le <strong>{{date_signature}}</strong></p><p>Signature du producteur : _____________________</p></div>`
  },

  // ─── 25 templates AGRO-INDUSTRIE / TRANSFORMATION (préfixe agrind2_) ────────
  {
    code: 'agrind2_decorticage_riz',
    name: "Contrat de service de décorticage de riz industriel",
    category: 'agro_environnement',
    price: 3000, priceMax: 8000,
    description: "Contrat de prestation de service de décorticage industriel de riz paddy en Côte d'Ivoire, conforme aux normes MINADER.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Rizerie / Prestataire",type:'text',required:true},
      {key:'client',label:"Client (producteur / coopérative)",type:'text',required:true},
      {key:'quantite_paddy',label:"Quantité de riz paddy (tonnes)",type:'text',required:true},
      {key:'taux_usinage',label:"Taux d'usinage garanti (%)",type:'text',required:true},
      {key:'date_traitement',label:"Date de traitement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE – DÉCORTICAGE DE RIZ INDUSTRIEL</h1><h2>PARTIES</h2><p><strong>Rizerie :</strong> {{prestataire}}</p><p><strong>Client :</strong> {{client}}</p><h2>OBJET</h2><p>Décorticage de <strong>{{quantite_paddy}} tonnes</strong> de riz paddy – Taux d'usinage garanti : <strong>{{taux_usinage}} %</strong></p><p>Date de traitement : <strong>{{date_traitement}}</strong></p><h2>CONDITIONS</h2><ul><li>Riz paddy livré propre, sec, conforme aux normes qualité</li><li>Sous-produits (son, balle) restitués au client</li><li>Tarif de prestation défini en annexe</li></ul><h2>SIGNATURES</h2><p>Rizerie : _____________________ Date : ___________</p><p>Client : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_mouture_cereales',
    name: "Accord de service de mouture de céréales (minoterie)",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Accord de service de mouture industrielle de céréales (maïs, mil, sorgho) dans une minoterie agréée en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'minoterie',label:"Minoterie / Moulin industriel",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'type_cereale',label:"Type de céréale",type:'text',required:true},
      {key:'quantite_tonnes',label:"Quantité (tonnes)",type:'text',required:true},
      {key:'date_prestation',label:"Date de prestation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MOUTURE DE CÉRÉALES (MINOTERIE)</h1><h2>PARTIES</h2><p><strong>Minoterie :</strong> {{minoterie}}</p><p><strong>Client :</strong> {{client}}</p><h2>OBJET</h2><p>Mouture de <strong>{{quantite_tonnes}} tonnes</strong> de <strong>{{type_cereale}}</strong> le <strong>{{date_prestation}}</strong>.</p><h2>MODALITÉS</h2><ul><li>Granulométrie selon spécifications du client</li><li>Farine rendue conditionnée en sacs étiquetés</li><li>Paiement à la réception du produit fini</li></ul><h2>SIGNATURES</h2><p>Minoterie : _____________________ Date : ___________</p><p>Client : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_trituration_palmci',
    name: "Accord de service de trituration d'huile de palme (PALMCI)",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Accord de service de trituration de régimes de noix de palme frais (RFF) entre un industriel (modèle PALMCI) et des producteurs de palmier à huile en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'huilerie',label:"Huilerie industrielle",type:'text',required:true},
      {key:'planteur',label:"Planteur / Coopérative",type:'text',required:true},
      {key:'quantite_rff',label:"Quantité de RFF (tonnes/semaine)",type:'text',required:true},
      {key:'prix_rff',label:"Prix d'achat des RFF (FCFA/tonne)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – TRITURATION D'HUILE DE PALME</h1><h2>PARTIES</h2><p><strong>Huilerie :</strong> {{huilerie}}</p><p><strong>Planteur / Coopérative :</strong> {{planteur}}</p><h2>OBJET</h2><p>Achat et trituration de <strong>{{quantite_rff}} tonnes/semaine</strong> de Régimes de Fruits Frais (RFF) au prix de <strong>{{prix_rff}} FCFA/tonne</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>CONDITIONS DE LIVRAISON</h2><ul><li>RFF livrés dans les 24 heures suivant la récolte</li><li>Pesée à la bascule agréée de l'huilerie</li><li>Rejet des régimes non conformes (pourris, verts)</li></ul><h2>PAIEMENT</h2><p>Paiement dans les 7 jours suivant la livraison.</p><h2>SIGNATURES</h2><p>Huilerie : _____________________ Date : ___________</p><p>Planteur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_huile_palme_raffinee',
    name: "Accord de service de production d'huile de palme raffinée",
    category: 'agro_environnement',
    price: 5000, priceMax: 14000,
    description: "Contrat de prestation de raffinage d'huile de palme brute (CPO) en huile raffinée, blanchie et désodorisée (RBD) pour le marché local et l'exportation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'raffineur',label:"Raffineur industriel",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'volume_cpo',label:"Volume de CPO à raffiner (tonnes)",type:'text',required:true},
      {key:'specifications',label:"Spécifications du produit fini",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PRODUCTION D'HUILE DE PALME RAFFINÉE</h1><h2>PARTIES</h2><p><strong>Raffineur :</strong> {{raffineur}}</p><p><strong>Client :</strong> {{client}}</p><h2>OBJET</h2><p>Raffinage de <strong>{{volume_cpo}} tonnes</strong> de CPO en huile RBD. Livraison prévue le <strong>{{date_livraison}}</strong>.</p><h2>SPÉCIFICATIONS</h2><p>{{specifications}}</p><h2>QUALITÉ ET CONTRÔLE</h2><ul><li>Analyses laboratoire systématiques (acidité, humidité, couleur)</li><li>Certificat de qualité délivré pour chaque lot</li></ul><h2>SIGNATURES</h2><p>Raffineur : _____________________ Date : ___________</p><p>Client : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_savon_palme',
    name: "Accord de service de production de savon industriel (palme)",
    category: 'agro_environnement',
    price: 3500, priceMax: 10000,
    description: "Accord de fabrication industrielle de savon à base d'huile de palme pour le marché ivoirien et sous-régional.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'fabricant',label:"Fabricant de savon",type:'text',required:true},
      {key:'client',label:"Client distributeur",type:'text',required:true},
      {key:'type_savon',label:"Type de savon (ménager / cosmétique)",type:'text',required:true},
      {key:'quantite_tonnes',label:"Quantité (tonnes)",type:'text',required:true},
      {key:'date_production',label:"Date de production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PRODUCTION DE SAVON INDUSTRIEL (PALME)</h1><h2>PARTIES</h2><p><strong>Fabricant :</strong> {{fabricant}}</p><p><strong>Client :</strong> {{client}}</p><h2>OBJET</h2><p>Production de <strong>{{quantite_tonnes}} tonnes</strong> de savon <strong>{{type_savon}}</strong> à base d'huile de palme ivoirienne.</p><p>Date de production : <strong>{{date_production}}</strong></p><h2>NORMES</h2><ul><li>Conformité aux normes CODINORM et ARSO</li><li>Étiquetage réglementaire (composition, date de fabrication)</li></ul><h2>SIGNATURES</h2><p>Fabricant : _____________________ Date : ___________</p><p>Client : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_caoutchouc_saph',
    name: "Accord de service de production de caoutchouc naturel (SAPH)",
    category: 'agro_environnement',
    price: 5000, priceMax: 14000,
    description: "Accord de collecte et de traitement du latex d'hévéa entre un industriel (modèle SAPH) et des planteurs villageois d'hévéa en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'industrie',label:"Société industrielle (ex : SAPH)",type:'text',required:true},
      {key:'planteur',label:"Planteur villageois / Coopérative",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie hévéicole (ha)",type:'text',required:true},
      {key:'prix_latex',label:"Prix d'achat du latex (FCFA/kg DRC)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PRODUCTION DE CAOUTCHOUC NATUREL</h1><h2>PARTIES</h2><p><strong>Industriel :</strong> {{industrie}}</p><p><strong>Planteur / Coopérative :</strong> {{planteur}}</p><h2>OBJET</h2><p>Collecte du latex produit sur <strong>{{superficie_ha}} ha</strong> d'hévéas, au prix de <strong>{{prix_latex}} FCFA/kg DRC</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>CONDITIONS</h2><ul><li>Collecte bi-hebdomadaire par camion citerne de l'industriel</li><li>Mesure du DRC (Dry Rubber Content) à la réception</li><li>Paiement dans les 15 jours suivant la livraison</li></ul><h2>SIGNATURES</h2><p>Industriel : _____________________ Date : ___________</p><p>Planteur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_cajou_sifca',
    name: "Accord de service de traitement de noix de cajou (SIFCA)",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Accord de collecte et de transformation industrielle de noix de cajou brutes (NRB) en amandes de cajou, conforme aux standards d'exportation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'transformateur',label:"Transformateur industriel",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur (coopérative / collecteur)",type:'text',required:true},
      {key:'quantite_tonnes',label:"Quantité de NRB (tonnes)",type:'text',required:true},
      {key:'prix_tonne',label:"Prix d'achat (FCFA/tonne)",type:'text',required:true},
      {key:'date_campagne',label:"Date de campagne",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – TRAITEMENT DE NOIX DE CAJOU</h1><h2>PARTIES</h2><p><strong>Transformateur :</strong> {{transformateur}}</p><p><strong>Fournisseur :</strong> {{fournisseur}}</p><h2>OBJET</h2><p>Achat et traitement de <strong>{{quantite_tonnes}} tonnes</strong> de NRB au prix de <strong>{{prix_tonne}} FCFA/tonne</strong>.</p><p>Campagne : <strong>{{date_campagne}}</strong></p><h2>QUALITÉ</h2><ul><li>NRB : humidité max 10 %, KOR minimum selon grade</li><li>Taux de transformation en amandes certifié par analyse</li></ul><h2>SIGNATURES</h2><p>Transformateur : _____________________ Date : ___________</p><p>Fournisseur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_egrenage_coton',
    name: "Accord de service d'égrenage de coton (Ivoire-Coton)",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Accord de prestation d'égrenage de coton-graine entre une égrenerie (modèle Ivoire-Coton) et des producteurs de coton ivoiriens.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'egrenerie',label:"Égrenerie industrielle",type:'text',required:true},
      {key:'producteur',label:"Producteur / Coopérative",type:'text',required:true},
      {key:'quantite_graine',label:"Quantité de coton-graine (tonnes)",type:'text',required:true},
      {key:'prix_graine',label:"Prix d'achat (FCFA/kg)",type:'text',required:true},
      {key:'date_collecte',label:"Date de collecte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – ÉGRENAGE DE COTON</h1><h2>PARTIES</h2><p><strong>Égrenerie :</strong> {{egrenerie}}</p><p><strong>Producteur / Coopérative :</strong> {{producteur}}</p><h2>OBJET</h2><p>Achat de <strong>{{quantite_graine}} tonnes</strong> de coton-graine à <strong>{{prix_graine}} FCFA/kg</strong>. Collecte prévue le <strong>{{date_collecte}}</strong>.</p><h2>CONDITIONS</h2><ul><li>Coton-graine propre, bien récolté, sans impuretés excessives</li><li>Pesée officielle à la bascule de l'égrenerie</li><li>Paiement dans les 10 jours suivant la collecte</li></ul><h2>SIGNATURES</h2><p>Égrenerie : _____________________ Date : ___________</p><p>Producteur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_ananas_conserve',
    name: "Accord de service de production d'ananas transformé (conserve)",
    category: 'agro_environnement',
    price: 4000, priceMax: 11000,
    description: "Accord de prestation de transformation industrielle d'ananas frais en conserves (tranches, jus, concentré) destinées à l'exportation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'usine',label:"Usine de transformation",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur d'ananas",type:'text',required:true},
      {key:'quantite_tonnes',label:"Quantité d'ananas frais (tonnes)",type:'text',required:true},
      {key:'produits_finis',label:"Produits finis (tranches, jus, concentré)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison des ananas",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PRODUCTION D'ANANAS TRANSFORMÉ</h1><h2>PARTIES</h2><p><strong>Usine :</strong> {{usine}}</p><p><strong>Fournisseur :</strong> {{fournisseur}}</p><h2>OBJET</h2><p>Transformation de <strong>{{quantite_tonnes}} tonnes</strong> d'ananas frais en <strong>{{produits_finis}}</strong>. Livraison des matières premières : <strong>{{date_livraison}}</strong>.</p><h2>QUALITÉ</h2><ul><li>Ananas variété Cayenne lisse, calibre export</li><li>Certification HACCP de l'usine obligatoire</li></ul><h2>SIGNATURES</h2><p>Usine : _____________________ Date : ___________</p><p>Fournisseur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_banane_export',
    name: "Accord de service de production de banane exportation (Chiquita modèle)",
    category: 'agro_environnement',
    price: 5000, priceMax: 14000,
    description: "Accord de production et de commercialisation de bananes dessert de qualité export en Côte d'Ivoire, sur le modèle des accords producteurs-exportateurs internationaux.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'exportateur',label:"Exportateur banane",type:'text',required:true},
      {key:'producteur',label:"Producteur / Plantation",type:'text',required:true},
      {key:'volume_semaine',label:"Volume hebdomadaire (palettes)",type:'text',required:true},
      {key:'prix_caisse',label:"Prix par caisse (USD)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PRODUCTION DE BANANE EXPORTATION</h1><h2>PARTIES</h2><p><strong>Exportateur :</strong> {{exportateur}}</p><p><strong>Producteur :</strong> {{producteur}}</p><h2>OBJET</h2><p>Production et livraison de <strong>{{volume_semaine}} palettes/semaine</strong> de bananes dessert qualité export au prix de <strong>{{prix_caisse}} USD/caisse</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>STANDARDS QUALITÉ</h2><ul><li>Calibre 11-13, longueur minimale 18 cm</li><li>Certification GlobalGAP obligatoire</li><li>Chaîne du froid maintenue de la récolte à l'embarquement</li></ul><h2>SIGNATURES</h2><p>Exportateur : _____________________ Date : ___________</p><p>Producteur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_jus_fruits_tropicaux',
    name: "Accord de service d'extraction de jus de fruits tropicaux",
    category: 'agro_environnement',
    price: 3500, priceMax: 10000,
    description: "Accord de prestation d'extraction industrielle de jus de fruits tropicaux (mangue, goyave, fruit de la passion, tamarin) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'extracteur',label:"Unité d'extraction",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'fruits',label:"Types de fruits",type:'text',required:true},
      {key:'quantite_litres',label:"Quantité de jus attendue (litres)",type:'text',required:true},
      {key:'date_production',label:"Date de production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – EXTRACTION DE JUS DE FRUITS TROPICAUX</h1><h2>PARTIES</h2><p><strong>Extracteur :</strong> {{extracteur}}</p><p><strong>Client :</strong> {{client}}</p><h2>OBJET</h2><p>Extraction de <strong>{{quantite_litres}} litres</strong> de jus de <strong>{{fruits}}</strong>. Date de production : <strong>{{date_production}}</strong>.</p><h2>PROCÉDÉ</h2><ul><li>Lavage et tri des fruits à la réception</li><li>Extraction mécanique sans ajout d'eau</li><li>Pasteurisation et conditionnement aseptique</li></ul><h2>SIGNATURES</h2><p>Extracteur : _____________________ Date : ___________</p><p>Client : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_sechage_solaire_fruits',
    name: "Accord de service de séchage solaire de fruits (mangue, ananas)",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Accord de prestation de séchage solaire artisanal ou semi-industriel de fruits tropicaux (mangue, ananas, banane) pour le marché local et l'export.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'prestataire',label:"Unité de séchage solaire",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'type_fruit',label:"Type de fruit",type:'text',required:true},
      {key:'quantite_frais',label:"Quantité de fruits frais (kg)",type:'text',required:true},
      {key:'date_sechage',label:"Date de début de séchage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – SÉCHAGE SOLAIRE DE FRUITS</h1><h2>PARTIES</h2><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Client :</strong> {{client}}</p><h2>OBJET</h2><p>Séchage de <strong>{{quantite_frais}} kg</strong> de <strong>{{type_fruit}}</strong> frais. Début : <strong>{{date_sechage}}</strong>.</p><h2>PROCÉDÉ</h2><ul><li>Découpe et prétraitement (blanchiment, anti-oxydant naturel)</li><li>Séchage solaire sur claies, durée 3 à 5 jours selon météo</li><li>Humidité finale : inférieure à 15 %</li><li>Conditionnement sous vide ou en sachets alimentaires</li></ul><h2>SIGNATURES</h2><p>Prestataire : _____________________ Date : ___________</p><p>Client : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_farine_manioc_attieke',
    name: "Accord de service de production de farine de manioc (ATTIÉKÉ exportation)",
    category: 'agro_environnement',
    price: 3500, priceMax: 10000,
    description: "Accord de production et de commercialisation de farine de manioc et d'attiéké conditionné pour l'exportation vers la diaspora africaine en Europe et en Amérique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'producteur',label:"Unité de production d'attiéké",type:'text',required:true},
      {key:'exportateur',label:"Exportateur partenaire",type:'text',required:true},
      {key:'volume_semaine',label:"Volume hebdomadaire (kg)",type:'text',required:true},
      {key:'conditionnement',label:"Type de conditionnement",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PRODUCTION DE FARINE DE MANIOC / ATTIÉKÉ EXPORTATION</h1><h2>PARTIES</h2><p><strong>Producteur :</strong> {{producteur}}</p><p><strong>Exportateur :</strong> {{exportateur}}</p><h2>OBJET</h2><p>Production de <strong>{{volume_semaine}} kg/semaine</strong> d'attiéké / farine de manioc, conditionné en <strong>{{conditionnement}}</strong>, à compter du <strong>{{date_debut}}</strong>.</p><h2>NORMES</h2><ul><li>Conformité aux normes phytosanitaires des pays destinataires (UE, USA)</li><li>Certificat sanitaire INHP et phytosanitaire MINADER obligatoires</li></ul><h2>SIGNATURES</h2><p>Producteur : _____________________ Date : ___________</p><p>Exportateur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_farine_poisson',
    name: "Accord de service de transformation de poisson (farine de poisson)",
    category: 'agro_environnement',
    price: 3500, priceMax: 10000,
    description: "Accord de prestation de production de farine et d'huile de poisson à partir de déchets de poisserie ou de poissons fourragers en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'usine',label:"Usine de farine de poisson",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur de poissons",type:'text',required:true},
      {key:'quantite_poisson',label:"Quantité de poissons (tonnes)",type:'text',required:true},
      {key:'taux_transformation',label:"Taux de transformation attendu (%)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison matière première",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – TRANSFORMATION DE POISSON (FARINE)</h1><h2>PARTIES</h2><p><strong>Usine :</strong> {{usine}}</p><p><strong>Fournisseur :</strong> {{fournisseur}}</p><h2>OBJET</h2><p>Transformation de <strong>{{quantite_poisson}} tonnes</strong> de poissons en farine. Taux attendu : <strong>{{taux_transformation}} %</strong>. Livraison MP : <strong>{{date_livraison}}</strong>.</p><h2>PROCESSUS</h2><ul><li>Cuisson vapeur, pressage, séchage, broyage</li><li>Teneur en protéines minimale : 65 %</li><li>Conditionnement en sacs de 25 ou 50 kg</li></ul><h2>SIGNATURES</h2><p>Usine : _____________________ Date : ___________</p><p>Fournisseur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_sel_marin_iode',
    name: "Accord de service de production de sel marin iodé",
    category: 'agro_environnement',
    price: 3000, priceMax: 8000,
    description: "Accord de production et de commercialisation de sel marin iodé conforme aux normes OMS et MINADER, pour la lutte contre les troubles dus à la carence en iode en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'salines',label:"Salines / Producteur de sel",type:'text',required:true},
      {key:'iodant',label:"Fournisseur d'iodant",type:'text',required:true},
      {key:'quantite_tonnes',label:"Quantité de sel à ioder (tonnes)",type:'text',required:true},
      {key:'teneur_iode',label:"Teneur en iode cible (ppm)",type:'text',required:true},
      {key:'date_production',label:"Date de production",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PRODUCTION DE SEL MARIN IODÉ</h1><h2>PARTIES</h2><p><strong>Salines :</strong> {{salines}}</p><p><strong>Fournisseur d'iodant :</strong> {{iodant}}</p><h2>OBJET</h2><p>Iodation de <strong>{{quantite_tonnes}} tonnes</strong> de sel marin à une teneur de <strong>{{teneur_iode}} ppm</strong> d'iode. Production prévue le : <strong>{{date_production}}</strong>.</p><h2>NORMES</h2><ul><li>Norme OMS : 20 à 40 ppm d'iode résiduel</li><li>Contrôle qualité par le laboratoire national de santé publique</li></ul><h2>SIGNATURES</h2><p>Salines : _____________________ Date : ___________</p><p>Fournisseur d'iodant : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_sucre_canne_sucaf',
    name: "Accord de service de production de sucre de canne (SUCAF)",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Accord de prestation entre une sucrerie (modèle SUCAF) et des planteurs sous-traitants de canne à sucre en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'sucrerie',label:"Sucrerie industrielle",type:'text',required:true},
      {key:'planteur',label:"Planteur de canne",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie cultivée (ha)",type:'text',required:true},
      {key:'prix_tonne_canne',label:"Prix d'achat de la canne (FCFA/tonne)",type:'text',required:true},
      {key:'date_coupe',label:"Date de coupe prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – PRODUCTION DE SUCRE DE CANNE</h1><h2>PARTIES</h2><p><strong>Sucrerie :</strong> {{sucrerie}}</p><p><strong>Planteur :</strong> {{planteur}}</p><h2>OBJET</h2><p>Achat de la canne récoltée sur <strong>{{superficie_ha}} ha</strong> au prix de <strong>{{prix_tonne_canne}} FCFA/tonne</strong>. Coupe prévue le : <strong>{{date_coupe}}</strong>.</p><h2>CONDITIONS</h2><ul><li>Canne livrée dans les 24 heures suivant la coupe</li><li>Richesse saccharimétrique minimum : 10 %</li><li>Pesée officielle à la sucrerie</li></ul><h2>SIGNATURES</h2><p>Sucrerie : _____________________ Date : ___________</p><p>Planteur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_bieres_boissons_solibra',
    name: "Accord de service de production de bières et boissons (SOLIBRA)",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Accord de contrat de fourniture de matières premières agricoles locales (sorgho, maïs) à une brasserie (modèle SOLIBRA) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 62,
    fieldsJson: F([
      {key:'brasserie',label:"Brasserie",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur de céréales",type:'text',required:true},
      {key:'type_cereale',label:"Type de céréale (sorgho / maïs)",type:'text',required:true},
      {key:'quantite_tonnes',label:"Quantité annuelle (tonnes)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – FOURNITURE DE MATIÈRES PREMIÈRES BRASSERIE</h1><h2>PARTIES</h2><p><strong>Brasserie :</strong> {{brasserie}}</p><p><strong>Fournisseur :</strong> {{fournisseur}}</p><h2>OBJET</h2><p>Fourniture annuelle de <strong>{{quantite_tonnes}} tonnes</strong> de <strong>{{type_cereale}}</strong> conformes aux spécifications brassicoles. Contrat du : <strong>{{date_contrat}}</strong>.</p><h2>QUALITÉ</h2><ul><li>Humidité maximale : 14 %</li><li>Absence d'aflatoxines (conforme aux seuils EU)</li><li>Teneur en amidon conforme aux spécifications brassicoles</li></ul><h2>SIGNATURES</h2><p>Brasserie : _____________________ Date : ___________</p><p>Fournisseur : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_partenariat_cooperative',
    name: "Accord de partenariat agro-industrie-coopérative producteurs",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Accord-cadre de partenariat entre une industrie agroalimentaire et une coopérative de producteurs, définissant les conditions de fourniture de matières premières agricoles locales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'industrie',label:"Industrie agroalimentaire",type:'text',required:true},
      {key:'cooperative',label:"Coopérative de producteurs",type:'text',required:true},
      {key:'matiere_premiere',label:"Matière première agricole",type:'text',required:true},
      {key:'volume_annuel',label:"Volume annuel garanti (tonnes)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT AGRO-INDUSTRIE – COOPÉRATIVE DE PRODUCTEURS</h1><h2>PARTIES</h2><p><strong>Industrie :</strong> {{industrie}}</p><p><strong>Coopérative :</strong> {{cooperative}}</p><h2>OBJET</h2><p>Partenariat d'approvisionnement en <strong>{{matiere_premiere}}</strong> – Volume garanti : <strong>{{volume_annuel}} tonnes/an</strong> – Signé le : <strong>{{date_signature}}</strong>.</p><h2>ENGAGEMENTS DE L'INDUSTRIE</h2><ul><li>Prix d'achat plancher garanti</li><li>Préfinancement des intrants et assistance technique</li><li>Paiement dans les 15 jours suivant livraison</li></ul><h2>ENGAGEMENTS DE LA COOPÉRATIVE</h2><ul><li>Livraison du volume garanti aux spécifications convenues</li><li>Exclusivité de livraison à l'industrie partenaire</li></ul><h2>SIGNATURES</h2><p>Industrie : _____________________ Date : ___________</p><p>Coopérative : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_certification_iso22000',
    name: "Accord de service de certification ISO 22000 (sécurité alimentaire)",
    category: 'agro_environnement',
    price: 5000, priceMax: 14000,
    description: "Accord d'accompagnement d'une industrie agroalimentaire ivoirienne vers la certification ISO 22000 (système de management de la sécurité des denrées alimentaires).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'cabinet',label:"Cabinet de conseil / Organisme certificateur",type:'text',required:true},
      {key:'industrie',label:"Industrie agroalimentaire",type:'text',required:true},
      {key:'perimetre',label:"Périmètre de certification",type:'textarea',required:true},
      {key:'duree_mois',label:"Durée de l'accompagnement (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – CERTIFICATION ISO 22000</h1><h2>PARTIES</h2><p><strong>Prestataire :</strong> {{cabinet}}</p><p><strong>Industrie :</strong> {{industrie}}</p><h2>PÉRIMÈTRE</h2><p>{{perimetre}}</p><h2>PROGRAMME</h2><p>Durée : <strong>{{duree_mois}} mois</strong> à compter du <strong>{{date_debut}}</strong></p><ul><li>Phase 1 : Diagnostic et analyse des écarts</li><li>Phase 2 : Mise en place du système de management</li><li>Phase 3 : Formation des équipes et audit interne</li><li>Phase 4 : Audit de certification par l'organisme tiers</li></ul><h2>SIGNATURES</h2><p>Prestataire : _____________________ Date : ___________</p><p>Industrie : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_haccp_agroalimentaire',
    name: "Accord de service de HACCP industrie agroalimentaire",
    category: 'agro_environnement',
    price: 4000, priceMax: 11000,
    description: "Accord de prestation de mise en place d'un système HACCP (Hazard Analysis and Critical Control Points) dans une unité de transformation agroalimentaire en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'consultant',label:"Consultant HACCP",type:'text',required:true},
      {key:'industrie',label:"Unité de transformation",type:'text',required:true},
      {key:'activite',label:"Type d'activité agroalimentaire",type:'text',required:true},
      {key:'duree_mois',label:"Durée de la mission (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de mission",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – MISE EN PLACE DU SYSTÈME HACCP</h1><h2>PARTIES</h2><p><strong>Consultant :</strong> {{consultant}}</p><p><strong>Unité :</strong> {{industrie}} – Activité : {{activite}}</p><h2>MISSION</h2><p>Durée : <strong>{{duree_mois}} mois</strong> à compter du <strong>{{date_debut}}</strong></p><h2>ÉTAPES</h2><ul><li>Constitution de l'équipe HACCP et formation initiale</li><li>Description des produits et de leur utilisation prévue</li><li>Analyse des dangers et identification des CCP</li><li>Établissement des limites critiques, surveillance et actions correctives</li><li>Documentation et validation du système</li></ul><h2>SIGNATURES</h2><p>Consultant : _____________________ Date : ___________</p><p>Industrie : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_rapport_performance_usine',
    name: "Rapport de performance usine agroalimentaire",
    category: 'agro_environnement',
    price: 3000, priceMax: 8000,
    description: "Modèle de rapport annuel de performance d'une usine agroalimentaire ivoirienne, couvrant les indicateurs de production, qualité, sécurité et durabilité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'usine',label:"Nom de l'usine",type:'text',required:true},
      {key:'exercice',label:"Exercice / Année",type:'text',required:true},
      {key:'activite',label:"Activité principale",type:'text',required:true},
      {key:'volume_produit',label:"Volume produit total (tonnes)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – USINE AGROALIMENTAIRE</h1><p><strong>Usine :</strong> {{usine}} – <strong>Activité :</strong> {{activite}} – <strong>Exercice :</strong> {{exercice}} – <strong>Date :</strong> {{date_rapport}}</p><h2>INDICATEURS DE PRODUCTION</h2><p>Volume produit total : <strong>{{volume_produit}} tonnes</strong></p><p>Taux d'utilisation des capacités, taux de rendement global (TRG), taux de déchets.</p><h2>QUALITÉ</h2><p>Nombre de non-conformités détectées, réclamations clients, taux de satisfaction.</p><h2>SÉCURITÉ ALIMENTAIRE</h2><p>Résultats des audits internes et externes, actions correctives mises en œuvre.</p><h2>ENVIRONNEMENT</h2><p>Consommation d'eau et d'énergie, gestion des effluents et des déchets industriels.</p></div>`
  },
  {
    code: 'agrind2_plan_developpement_agroind',
    name: "Plan de développement agro-industrie",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Modèle de plan stratégique de développement d'une entreprise agro-industrielle ivoirienne sur 3 à 5 ans, incluant objectifs de production, investissements et impact social.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise agro-industrielle",type:'text',required:true},
      {key:'periode',label:"Période du plan",type:'text',required:true},
      {key:'objectif_principal',label:"Objectif principal",type:'textarea',required:true},
      {key:'investissement_total',label:"Investissement total prévu (FCFA)",type:'text',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT AGRO-INDUSTRIE</h1><p><strong>Entreprise :</strong> {{entreprise}} – <strong>Période :</strong> {{periode}} – <strong>Validé le :</strong> {{date_validation}}</p><h2>OBJECTIF PRINCIPAL</h2><p>{{objectif_principal}}</p><h2>AXES STRATÉGIQUES</h2><ul><li>Modernisation et extension des capacités industrielles</li><li>Diversification des produits et des marchés</li><li>Développement de l'approvisionnement local durable</li><li>Amélioration de la performance environnementale</li></ul><h2>INVESTISSEMENTS</h2><p>Investissement total prévu : <strong>{{investissement_total}} FCFA</strong></p><h2>IMPACT SOCIAL</h2><p>Emplois directs et indirects créés, revenus des producteurs partenaires, contribution au PIB agricole.</p></div>`
  },
  {
    code: 'agrind2_tracabilite_codex',
    name: "Accord de service de traçabilité produits alimentaires (CODEX)",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Accord de mise en place d'un système de traçabilité des produits alimentaires transformés, conforme aux exigences du CODEX Alimentarius et des marchés d'exportation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de traçabilité",type:'text',required:true},
      {key:'industrie',label:"Industrie agroalimentaire",type:'text',required:true},
      {key:'produits',label:"Produits concernés",type:'textarea',required:true},
      {key:'standard',label:"Standard de référence (CODEX / EU / autre)",type:'text',required:true},
      {key:'date_mise_en_place',label:"Date de mise en place",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE – TRAÇABILITÉ PRODUITS ALIMENTAIRES (CODEX)</h1><h2>PARTIES</h2><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Industrie :</strong> {{industrie}}</p><h2>PÉRIMÈTRE</h2><p>Produits : {{produits}}</p><p>Standard : <strong>{{standard}}</strong> – Mise en place le : <strong>{{date_mise_en_place}}</strong></p><h2>PRESTATIONS</h2><ul><li>Cartographie de la chaîne d'approvisionnement</li><li>Déploiement du système informatique de traçabilité (ERP / logiciel dédié)</li><li>Formation des équipes et procédures de rappel produit</li><li>Audits de conformité annuels</li></ul><h2>SIGNATURES</h2><p>Prestataire : _____________________ Date : ___________</p><p>Industrie : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_partenariat_firca',
    name: "Accord de partenariat FIRCA-industrie",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Accord de partenariat entre le Fonds Interprofessionnel pour la Recherche et le Conseil Agricoles (FIRCA) et une industrie agroalimentaire ivoirienne pour le financement de projets de recherche appliquée.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'industrie',label:"Industrie partenaire",type:'text',required:true},
      {key:'programme',label:"Programme de recherche financé",type:'text',required:true},
      {key:'montant_firca',label:"Contribution FIRCA (FCFA)",type:'text',required:true},
      {key:'montant_industrie',label:"Contribution industrie (FCFA)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT FIRCA – INDUSTRIE AGROALIMENTAIRE</h1><h2>PARTIES</h2><p><strong>FIRCA :</strong> Fonds Interprofessionnel pour la Recherche et le Conseil Agricoles</p><p><strong>Industrie :</strong> {{industrie}}</p><h2>PROGRAMME</h2><p>{{programme}}</p><p>Contribution FIRCA : <strong>{{montant_firca}} FCFA</strong> – Contribution industrie : <strong>{{montant_industrie}} FCFA</strong></p><p>Signé le : <strong>{{date_signature}}</strong></p><h2>GOUVERNANCE</h2><ul><li>Comité de pilotage paritaire FIRCA-industrie</li><li>Rapports de progrès semestriels</li><li>Propriété conjointe des résultats</li></ul><h2>SIGNATURES</h2><p>FIRCA : _____________________ Date : ___________</p><p>Industrie : _____________________ Date : ___________</p></div>`
  },
  {
    code: 'agrind2_charte_transformation_responsable',
    name: "Charte de la transformation agroalimentaire responsable",
    category: 'agro_environnement',
    price: 2500, priceMax: 7000,
    description: "Charte d'engagement volontaire d'une entreprise de transformation agroalimentaire ivoirienne en faveur d'une industrie responsable, durable et inclusive.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'entreprise',label:"Entreprise signataire",type:'text',required:true},
      {key:'directeur',label:"Directeur Général",type:'text',required:true},
      {key:'activite',label:"Activité principale",type:'text',required:true},
      {key:'nb_employes',label:"Nombre d'employés",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA TRANSFORMATION AGROALIMENTAIRE RESPONSABLE</h1><p>L'entreprise <strong>{{entreprise}}</strong>, représentée par son Directeur Général <strong>{{directeur}}</strong>, active dans le domaine de <strong>{{activite}}</strong> et employant <strong>{{nb_employes}} personnes</strong>, s'engage solennellement, à compter du <strong>{{date_signature}}</strong>, à :</p><h2>DIMENSION ÉCONOMIQUE</h2><ul><li>Privilégier l'approvisionnement en matières premières agricoles locales</li><li>Payer les producteurs dans les délais contractuels</li><li>Investir dans la modernisation continue des équipements</li></ul><h2>DIMENSION SOCIALE</h2><ul><li>Respecter le Code du Travail ivoirien et les conventions de l'OIT</li><li>Assurer la santé et la sécurité de tous les employés</li><li>Promouvoir l'égalité des chances et la formation continue</li></ul><h2>DIMENSION ENVIRONNEMENTALE</h2><ul><li>Réduire la consommation d'eau et d'énergie de 10 % par an</li><li>Gérer les déchets industriels dans le respect de la réglementation</li><li>Réduire les émissions de gaz à effet de serre</li></ul><p>Fait à Abidjan, le <strong>{{date_signature}}</strong></p><p>Signature du Directeur Général : _____________________</p></div>`
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
  console.log(`Batch 67a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
