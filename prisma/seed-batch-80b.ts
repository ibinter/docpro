import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ─── ÉNERGIE SOLAIRE / RENOUVELABLE (ene2_) – catégorie btp_construction ───
  {
    code: 'ene2_ipp_solaire',
    name: "Accord de service de centrale solaire photovoltaïque (IPP)",
    category: 'btp_construction',
    price: 12000, priceMax: 36000,
    description: "Accord encadrant la construction, l'exploitation et la maintenance d'une centrale solaire photovoltaïque par un producteur indépendant (IPP) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 88,
    fieldsJson: F([
      {key:'nom_producteur',label:"Nom du producteur indépendant (IPP)",type:'text',required:true},
      {key:'puissance_mw',label:"Puissance installée (MW)",type:'text',required:true},
      {key:'localisation',label:"Localisation de la centrale",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat (années)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CENTRALE SOLAIRE PHOTOVOLTAÏQUE (IPP)</h1><p><strong>Entre :</strong> {{nom_producteur}}, ci-après dénommé le Producteur Indépendant,</p><p><strong>Et :</strong> le Ministère des Mines, du Pétrole et de l'Énergie de la République de Côte d'Ivoire.</p><h2>Article 1 – Objet</h2><p>Le présent accord a pour objet de définir les conditions de construction, d'exploitation et de maintenance d'une centrale solaire photovoltaïque d'une puissance de {{puissance_mw}} MW, située à {{localisation}}.</p><h2>Article 2 – Durée</h2><p>Le présent accord est conclu pour une durée de {{duree_contrat}} années à compter de la date de signature.</p><h2>Article 3 – Obligations des parties</h2><p>Le Producteur s'engage à respecter les normes OHADA, les exigences techniques de la CIE et les standards environnementaux en vigueur.</p><h2>Article 4 – Tarif et paiement</h2><p>Le tarif d'achat de l'énergie produite est fixé conformément au décret tarifaire en vigueur.</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'ene2_ppa_solaire',
    name: "Accord de Power Purchase Agreement (PPA) solaire",
    category: 'btp_construction',
    price: 14000, priceMax: 42000,
    description: "Contrat d'achat d'énergie solaire (PPA) entre un producteur d'énergie renouvelable et un acheteur institutionnel ou industriel.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 85,
    fieldsJson: F([
      {key:'vendeur_energie',label:"Nom du vendeur d'énergie",type:'text',required:true},
      {key:'acheteur_energie',label:"Nom de l'acheteur d'énergie",type:'text',required:true},
      {key:'volume_kwh',label:"Volume annuel d'énergie (kWh)",type:'text',required:true},
      {key:'prix_kwh',label:"Prix par kWh (FCFA)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>POWER PURCHASE AGREEMENT (PPA) SOLAIRE</h1><p><strong>Vendeur :</strong> {{vendeur_energie}}</p><p><strong>Acheteur :</strong> {{acheteur_energie}}</p><h2>Article 1 – Objet</h2><p>Le présent PPA définit les conditions d'achat et de vente de l'énergie solaire produite, à hauteur de {{volume_kwh}} kWh par an, au prix de {{prix_kwh}} FCFA par kWh.</p><h2>Article 2 – Livraison de l'énergie</h2><p>Le Vendeur s'engage à livrer l'énergie convenue au point de raccordement défini en annexe technique.</p><h2>Article 3 – Garanties</h2><p>Le Vendeur fournit une garantie de performance minimale de 80 % de la production contractuelle.</p><h2>Article 4 – Résolution des différends</h2><p>Tout litige sera soumis à l'arbitrage de la CCJA conformément au Traité OHADA.</p><p>Signé le {{date_debut}}</p></div>`
  },
  {
    code: 'ene2_minigrid_rural',
    name: "Accord de service de mini-réseau solaire rural (off-grid)",
    category: 'btp_construction',
    price: 8000, priceMax: 24000,
    description: "Accord de déploiement et d'exploitation d'un mini-réseau solaire hors-réseau pour l'électrification rurale en zone isolée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'operateur',label:"Nom de l'opérateur du mini-réseau",type:'text',required:true},
      {key:'village',label:"Village ou communauté bénéficiaire",type:'text',required:true},
      {key:'nombre_menages',label:"Nombre de ménages raccordés",type:'text',required:true},
      {key:'puissance_kw',label:"Puissance du mini-réseau (kW)",type:'text',required:true},
      {key:'date_mise_service',label:"Date de mise en service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MINI-RÉSEAU SOLAIRE RURAL (OFF-GRID)</h1><p><strong>Opérateur :</strong> {{operateur}}</p><p><strong>Communauté bénéficiaire :</strong> {{village}}</p><h2>Article 1 – Objet</h2><p>Le présent accord définit les conditions de déploiement d'un mini-réseau solaire de {{puissance_kw}} kW desservant {{nombre_menages}} ménages au sein du village de {{village}}.</p><h2>Article 2 – Mise en service</h2><p>La mise en service est prévue pour le {{date_mise_service}}.</p><h2>Article 3 – Tarification</h2><p>Le tarif appliqué aux abonnés est conforme à la grille tarifaire approuvée par l'Autorité Nationale de Régulation du Secteur de l'Électricité (ANARE-CI).</p><h2>Article 4 – Maintenance</h2><p>L'opérateur assure la maintenance préventive et curative du mini-réseau pendant toute la durée du contrat.</p><p>Fait à Abidjan, le {{date_mise_service}}</p></div>`
  },
  {
    code: 'ene2_shs_domestique',
    name: "Accord de service de système solaire domestique (SHS)",
    category: 'btp_construction',
    price: 5000, priceMax: 15000,
    description: "Contrat de fourniture et d'installation d'un système solaire domestique (SHS) pour usage résidentiel en zone rurale ou périurbaine.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 72,
    fieldsJson: F([
      {key:'fournisseur',label:"Nom du fournisseur SHS",type:'text',required:true},
      {key:'beneficiaire',label:"Nom du bénéficiaire",type:'text',required:true},
      {key:'type_kit',label:"Type de kit solaire (Wp)",type:'text',required:true},
      {key:'adresse_installation',label:"Adresse d'installation",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SYSTÈME SOLAIRE DOMESTIQUE (SHS)</h1><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>Bénéficiaire :</strong> {{beneficiaire}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la fourniture, l'installation et la maintenance d'un kit solaire domestique de {{type_kit}} à l'adresse suivante : {{adresse_installation}}.</p><h2>Article 2 – Installation</h2><p>L'installation sera réalisée le {{date_installation}} par une équipe technique certifiée du fournisseur.</p><h2>Article 3 – Garantie</h2><p>Le fournisseur garantit le matériel pendant 2 ans et les panneaux solaires pendant 10 ans.</p><h2>Article 4 – Paiement</h2><p>Le paiement peut s'effectuer en espèces ou via mobile money (Orange Money, MTN Mobile Money).</p></div>`
  },
  {
    code: 'ene2_pompage_agricole',
    name: "Accord de service de pompage solaire agricole",
    category: 'btp_construction',
    price: 7000, priceMax: 21000,
    description: "Accord encadrant l'installation et la maintenance de systèmes de pompage solaire pour l'irrigation agricole.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire technique",type:'text',required:true},
      {key:'exploitant_agricole',label:"Nom de l'exploitant agricole",type:'text',required:true},
      {key:'superficie_hectares',label:"Superficie irriguée (hectares)",type:'text',required:true},
      {key:'debit_m3h',label:"Débit de la pompe (m³/h)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE POMPAGE SOLAIRE AGRICOLE</h1><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Exploitant agricole :</strong> {{exploitant_agricole}}</p><h2>Article 1 – Objet</h2><p>Le présent accord a pour objet l'installation d'un système de pompage solaire d'un débit de {{debit_m3h}} m³/h pour l'irrigation d'une superficie de {{superficie_hectares}} hectares.</p><h2>Article 2 – Spécifications techniques</h2><p>Le système comprend les panneaux photovoltaïques, la pompe immergée, le système de contrôle et les tuyauteries de distribution.</p><h2>Article 3 – Formation</h2><p>Le prestataire s'engage à former l'exploitant à l'utilisation et à l'entretien de base du système.</p><p>Signé le {{date_contrat}}</p></div>`
  },
  {
    code: 'ene2_clim_solaire',
    name: "Accord de service de climatisation solaire",
    category: 'btp_construction',
    price: 9000, priceMax: 27000,
    description: "Contrat d'installation et de maintenance de systèmes de climatisation alimentés par énergie solaire photovoltaïque.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'installateur',label:"Nom de l'installateur",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'surface_climatisee',label:"Surface climatisée (m²)",type:'text',required:true},
      {key:'puissance_frigorifique',label:"Puissance frigorifique (BTU)",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation prévue",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CLIMATISATION SOLAIRE</h1><p><strong>Installateur :</strong> {{installateur}}</p><p><strong>Client :</strong> {{client}}</p><h2>Article 1 – Objet</h2><p>Installation d'un système de climatisation solaire de {{puissance_frigorifique}} BTU pour une surface de {{surface_climatisee}} m².</p><h2>Article 2 – Composants</h2><p>Le système comprend les panneaux PV, l'onduleur, la climatisation DC/AC et le câblage.</p><h2>Article 3 – Performance</h2><p>Le système est dimensionné pour couvrir 100 % des besoins en climatisation en journée et 60 % en soirée via batterie.</p><h2>Article 4 – Maintenance annuelle</h2><p>Une visite de maintenance est prévue chaque année à la charge de l'installateur.</p><p>Fait le {{date_installation}}</p></div>`
  },
  {
    code: 'ene2_refrig_vaccins',
    name: "Accord de service de réfrigération solaire (vaccins)",
    category: 'btp_construction',
    price: 10000, priceMax: 30000,
    description: "Accord de fourniture et de maintenance de chaînes du froid solaires pour la conservation des vaccins et médicaments thermosensibles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 82,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur du système",type:'text',required:true},
      {key:'etablissement_sante',label:"Établissement de santé bénéficiaire",type:'text',required:true},
      {key:'capacite_litres',label:"Capacité de stockage (litres)",type:'text',required:true},
      {key:'plage_temperature',label:"Plage de température requise (°C)",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE RÉFRIGÉRATION SOLAIRE (VACCINS)</h1><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>Établissement de santé :</strong> {{etablissement_sante}}</p><h2>Article 1 – Objet</h2><p>Fourniture d'un système de réfrigération solaire de {{capacite_litres}} litres maintenant une température de {{plage_temperature}}°C pour la conservation des vaccins.</p><h2>Article 2 – Normes applicables</h2><p>Le matériel est conforme aux normes OMS pour la chaîne du froid et aux standards de l'ONMSP.</p><h2>Article 3 – Formation</h2><p>Le personnel soignant sera formé à l'utilisation et à la surveillance du système.</p><h2>Article 4 – Livraison et mise en service</h2><p>La livraison et la mise en service sont prévues pour le {{date_livraison}}.</p></div>`
  },
  {
    code: 'ene2_cuisson_solaire',
    name: "Accord de service de cuisson solaire",
    category: 'btp_construction',
    price: 4500, priceMax: 13500,
    description: "Contrat de fourniture et de déploiement de cuiseurs solaires et de fours solaires pour ménages et collectivités.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'fournisseur',label:"Nom du fournisseur",type:'text',required:true},
      {key:'communaute',label:"Communauté ou ménage bénéficiaire",type:'text',required:true},
      {key:'nombre_cuiseurs',label:"Nombre de cuiseurs fournis",type:'text',required:true},
      {key:'type_cuiseur',label:"Type de cuiseur solaire",type:'text',required:true},
      {key:'date_livraison',label:"Date de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CUISSON SOLAIRE</h1><p><strong>Fournisseur :</strong> {{fournisseur}}</p><p><strong>Bénéficiaire :</strong> {{communaute}}</p><h2>Article 1 – Objet</h2><p>Fourniture de {{nombre_cuiseurs}} cuiseur(s) solaire(s) de type {{type_cuiseur}} à la communauté bénéficiaire.</p><h2>Article 2 – Avantages environnementaux</h2><p>Ce dispositif contribue à réduire la déforestation et les émissions de CO2 liées à l'usage du bois de chauffe.</p><h2>Article 3 – Formation à l'utilisation</h2><p>Une session de formation pratique sera organisée le jour de la livraison prévue le {{date_livraison}}.</p><h2>Article 4 – Garantie</h2><p>Le cuiseur solaire est garanti 3 ans contre tout défaut de fabrication.</p></div>`
  },
  {
    code: 'ene2_chauffe_eau_solaire',
    name: "Accord de service de chauffe-eau solaire thermique",
    category: 'btp_construction',
    price: 6000, priceMax: 18000,
    description: "Accord d'installation et de maintenance de chauffe-eau solaires thermiques pour établissements hôteliers, résidentiels ou industriels.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'installateur',label:"Installateur certifié",type:'text',required:true},
      {key:'client',label:"Nom du client",type:'text',required:true},
      {key:'capacite_litres',label:"Capacité du ballon (litres)",type:'text',required:true},
      {key:'nombre_capteurs',label:"Nombre de capteurs solaires",type:'text',required:true},
      {key:'date_pose',label:"Date de pose",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CHAUFFE-EAU SOLAIRE THERMIQUE</h1><p><strong>Installateur :</strong> {{installateur}}</p><p><strong>Client :</strong> {{client}}</p><h2>Article 1 – Objet</h2><p>Installation d'un chauffe-eau solaire thermique d'une capacité de {{capacite_litres}} litres avec {{nombre_capteurs}} capteur(s) solaire(s).</p><h2>Article 2 – Rendement garanti</h2><p>Le système garantit un taux de couverture solaire d'au moins 70 % des besoins en eau chaude sanitaire.</p><h2>Article 3 – Garanties</h2><p>Garantie 5 ans sur les capteurs et 2 ans sur le ballon de stockage.</p><h2>Article 4 – Exécution</h2><p>Les travaux d'installation débuteront le {{date_pose}}.</p></div>`
  },
  {
    code: 'ene2_eclairage_public',
    name: "Accord de service d'éclairage solaire public",
    category: 'btp_construction',
    price: 8000, priceMax: 24000,
    description: "Accord de déploiement de lampadaires solaires autonomes pour l'éclairage public des communes et quartiers.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'prestataire',label:"Nom du prestataire",type:'text',required:true},
      {key:'mairie',label:"Mairie ou collectivité locale",type:'text',required:true},
      {key:'nombre_lampadaires',label:"Nombre de lampadaires à installer",type:'text',required:true},
      {key:'axes_concernes',label:"Axes ou rues concernés",type:'text',required:true},
      {key:'date_debut_travaux',label:"Date de début des travaux",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉCLAIRAGE SOLAIRE PUBLIC</h1><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Collectivité locale :</strong> {{mairie}}</p><h2>Article 1 – Objet</h2><p>Installation de {{nombre_lampadaires}} lampadaires solaires autonomes sur les axes suivants : {{axes_concernes}}.</p><h2>Article 2 – Spécifications</h2><p>Chaque lampadaire est équipé d'un panneau solaire, d'une batterie lithium et d'une LED haute performance avec détecteur de mouvement.</p><h2>Article 3 – Garantie de fonctionnement</h2><p>Le prestataire garantit un taux de disponibilité de 95 % sur 5 ans.</p><h2>Article 4 – Démarrage</h2><p>Les travaux débutent le {{date_debut_travaux}}.</p></div>`
  },
  {
    code: 'ene2_small_hydro',
    name: "Accord de service de centrale hydroélectrique (small hydro)",
    category: 'btp_construction',
    price: 18000, priceMax: 54000,
    description: "Accord encadrant le développement, la construction et l'exploitation d'une petite centrale hydroélectrique (small hydro) en milieu rural.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'developpeur',label:"Développeur du projet",type:'text',required:true},
      {key:'cours_eau',label:"Cours d'eau exploité",type:'text',required:true},
      {key:'puissance_kw',label:"Puissance installée (kW)",type:'text',required:true},
      {key:'region',label:"Région d'implantation",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CENTRALE HYDROÉLECTRIQUE (SMALL HYDRO)</h1><p><strong>Développeur :</strong> {{developpeur}}</p><p><strong>Cours d'eau :</strong> {{cours_eau}}</p><h2>Article 1 – Objet</h2><p>Développement d'une centrale hydroélectrique de {{puissance_kw}} kW dans la région de {{region}}.</p><h2>Article 2 – Étude d'impact</h2><p>Une étude d'impact environnemental et social (EIES) sera conduite conformément au Code de l'Environnement ivoirien.</p><h2>Article 3 – Concession</h2><p>L'exploitation du cours d'eau est soumise à l'obtention d'une concession hydraulique auprès du Ministère compétent.</p><h2>Article 4 – Durée et renouvellement</h2><p>Le présent accord est signé le {{date_signature}} pour une durée initiale de 25 ans renouvelable.</p></div>`
  },
  {
    code: 'ene2_eolienne_rurale',
    name: "Accord de service d'éolienne rurale (wind power)",
    category: 'btp_construction',
    price: 10000, priceMax: 30000,
    description: "Accord de déploiement et d'exploitation d'éoliennes pour l'électrification rurale dans les zones à bon potentiel éolien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'operateur_eolien',label:"Opérateur éolien",type:'text',required:true},
      {key:'localisation',label:"Site d'implantation",type:'text',required:true},
      {key:'nombre_eoliennes',label:"Nombre d'éoliennes",type:'text',required:true},
      {key:'puissance_unitaire',label:"Puissance unitaire (kW)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'ÉOLIENNE RURALE (WIND POWER)</h1><p><strong>Opérateur éolien :</strong> {{operateur_eolien}}</p><p><strong>Site :</strong> {{localisation}}</p><h2>Article 1 – Objet</h2><p>Déploiement de {{nombre_eoliennes}} éolienne(s) d'une puissance unitaire de {{puissance_unitaire}} kW sur le site de {{localisation}}.</p><h2>Article 2 – Étude de vent</h2><p>Une étude anémométrique d'au moins 12 mois a été réalisée préalablement pour valider le potentiel du site.</p><h2>Article 3 – Raccordement</h2><p>L'énergie produite sera injectée dans le mini-réseau local ou vendue via un PPA dédié.</p><p>Signé le {{date_contrat}}</p></div>`
  },
  {
    code: 'ene2_geothermie',
    name: "Accord de service de géothermie",
    category: 'btp_construction',
    price: 20000, priceMax: 60000,
    description: "Accord de prospection, de forage et d'exploitation d'une ressource géothermique pour la production d'énergie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 55,
    fieldsJson: F([
      {key:'promoteur',label:"Promoteur du projet géothermique",type:'text',required:true},
      {key:'zone_exploration',label:"Zone d'exploration",type:'text',required:true},
      {key:'profondeur_forage',label:"Profondeur de forage prévue (m)",type:'text',required:true},
      {key:'puissance_cible',label:"Puissance cible (MW)",type:'text',required:true},
      {key:'date_debut',label:"Date de début d'exploration",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GÉOTHERMIE</h1><p><strong>Promoteur :</strong> {{promoteur}}</p><p><strong>Zone d'exploration :</strong> {{zone_exploration}}</p><h2>Article 1 – Objet</h2><p>Le présent accord porte sur la prospection géothermique, le forage jusqu'à {{profondeur_forage}} m et l'exploitation d'une ressource géothermique d'une capacité cible de {{puissance_cible}} MW.</p><h2>Article 2 – Autorisations</h2><p>Le promoteur est tenu d'obtenir toutes les autorisations minières et environnementales requises par la législation nationale.</p><h2>Article 3 – Démarrage</h2><p>La phase d'exploration débute le {{date_debut}}.</p></div>`
  },
  {
    code: 'ene2_stockage_batterie',
    name: "Accord de service de stockage d'énergie (batterie lithium)",
    category: 'btp_construction',
    price: 12000, priceMax: 36000,
    description: "Contrat de fourniture, d'installation et de maintenance de systèmes de stockage d'énergie par batteries lithium-ion.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 79,
    fieldsJson: F([
      {key:'fournisseur_batterie',label:"Fournisseur du système de stockage",type:'text',required:true},
      {key:'client',label:"Client final",type:'text',required:true},
      {key:'capacite_kwh',label:"Capacité de stockage (kWh)",type:'text',required:true},
      {key:'puissance_kw',label:"Puissance de charge/décharge (kW)",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE STOCKAGE D'ÉNERGIE (BATTERIE LITHIUM)</h1><p><strong>Fournisseur :</strong> {{fournisseur_batterie}}</p><p><strong>Client :</strong> {{client}}</p><h2>Article 1 – Objet</h2><p>Fourniture et installation d'un système de stockage de {{capacite_kwh}} kWh avec une puissance de charge/décharge de {{puissance_kw}} kW.</p><h2>Article 2 – Garantie de performance</h2><p>Le fournisseur garantit une capacité résiduelle de 80 % après 10 ans d'utilisation.</p><h2>Article 3 – Sécurité</h2><p>Le système est conforme aux normes IEC 62619 et dispose de protections BMS intégrées.</p><h2>Article 4 – Installation</h2><p>La mise en service est prévue le {{date_installation}}.</p></div>`
  },
  {
    code: 'ene2_microgrid_intelligent',
    name: "Accord de service de microgrid intelligent",
    category: 'btp_construction',
    price: 16000, priceMax: 48000,
    description: "Accord de conception, de déploiement et d'exploitation d'un microgrid intelligent intégrant solaire, stockage et gestion numérique de l'énergie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 83,
    fieldsJson: F([
      {key:'integrateur',label:"Intégrateur du microgrid",type:'text',required:true},
      {key:'site_pilote',label:"Site pilote d'implantation",type:'text',required:true},
      {key:'sources_energie',label:"Sources d'énergie intégrées",type:'text',required:true},
      {key:'nombre_abonnes',label:"Nombre d'abonnés",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MICROGRID INTELLIGENT</h1><p><strong>Intégrateur :</strong> {{integrateur}}</p><p><strong>Site pilote :</strong> {{site_pilote}}</p><h2>Article 1 – Objet</h2><p>Déploiement d'un microgrid intelligent intégrant {{sources_energie}} pour desservir {{nombre_abonnes}} abonnés sur le site de {{site_pilote}}.</p><h2>Article 2 – Système de gestion</h2><p>Un Energy Management System (EMS) pilote automatiquement l'optimisation de la production, du stockage et de la consommation.</p><h2>Article 3 – Connectivité</h2><p>Le microgrid est doté d'une connexion IoT permettant le monitoring en temps réel depuis un tableau de bord centralisé.</p><p>Signé le {{date_signature}}</p></div>`
  },
  {
    code: 'ene2_audit_energetique',
    name: "Accord de service d'audit énergétique bâtiment",
    category: 'btp_construction',
    price: 6000, priceMax: 18000,
    description: "Contrat de réalisation d'un audit énergétique complet d'un bâtiment en vue d'identifier les gisements d'économies d'énergie.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'auditeur',label:"Bureau d'étude auditeur",type:'text',required:true},
      {key:'proprietaire',label:"Propriétaire du bâtiment",type:'text',required:true},
      {key:'adresse_batiment',label:"Adresse du bâtiment",type:'text',required:true},
      {key:'surface_m2',label:"Surface totale du bâtiment (m²)",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AUDIT ÉNERGÉTIQUE BÂTIMENT</h1><p><strong>Auditeur :</strong> {{auditeur}}</p><p><strong>Propriétaire :</strong> {{proprietaire}}</p><h2>Article 1 – Objet</h2><p>Réalisation d'un audit énergétique du bâtiment situé à {{adresse_batiment}}, d'une superficie de {{surface_m2}} m².</p><h2>Article 2 – Méthodologie</h2><p>L'audit comprend l'analyse des consommations, la thermographie infrarouge, le bilan carbone et la recommandation de mesures d'efficacité énergétique.</p><h2>Article 3 – Livrables</h2><p>Un rapport d'audit avec plan d'action priorisé sera remis dans les 30 jours suivant la visite du {{date_audit}}.</p></div>`
  },
  {
    code: 'ene2_cpe_epc',
    name: "Accord de service de performance énergétique (CPE/EPC)",
    category: 'btp_construction',
    price: 14000, priceMax: 42000,
    description: "Contrat de performance énergétique (CPE) garantissant des économies d'énergie mesurables en échange d'un investissement partagé.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 74,
    fieldsJson: F([
      {key:'esco',label:"Société de services énergétiques (ESCO)",type:'text',required:true},
      {key:'client',label:"Client bénéficiaire",type:'text',required:true},
      {key:'economie_garantie',label:"Économie d'énergie garantie (%)",type:'text',required:true},
      {key:'duree_cpe',label:"Durée du CPE (années)",type:'text',required:true},
      {key:'date_debut',label:"Date de début du CPE",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PERFORMANCE ÉNERGÉTIQUE (CPE/EPC)</h1><p><strong>ESCO :</strong> {{esco}}</p><p><strong>Client :</strong> {{client}}</p><h2>Article 1 – Objet</h2><p>Le présent CPE garantit une réduction des consommations énergétiques d'au moins {{economie_garantie}} % sur une durée de {{duree_cpe}} ans.</p><h2>Article 2 – Financement</h2><p>L'ESCO prend en charge l'investissement initial, remboursé par les économies réalisées sur la facture énergétique.</p><h2>Article 3 – Mesure et vérification</h2><p>Un protocole M&V conforme à l'IPMVP sera mis en place dès le {{date_debut}}.</p></div>`
  },
  {
    code: 'ene2_sgeb',
    name: "Accord de service de gestion de l'énergie (SGÉB)",
    category: 'btp_construction',
    price: 9000, priceMax: 27000,
    description: "Accord de déploiement d'un Système de Gestion de l'Énergie du Bâtiment (SGÉB/BMS) pour optimiser les consommations énergétiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'fournisseur_bms',label:"Fournisseur du SGÉB/BMS",type:'text',required:true},
      {key:'batiment',label:"Nom et adresse du bâtiment",type:'text',required:true},
      {key:'nombre_points_mesure',label:"Nombre de points de mesure",type:'text',required:true},
      {key:'protocole_comm',label:"Protocole de communication (BACnet, Modbus…)",type:'text',required:true},
      {key:'date_mise_en_oeuvre',label:"Date de mise en œuvre",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GESTION DE L'ÉNERGIE (SGÉB)</h1><p><strong>Fournisseur SGÉB :</strong> {{fournisseur_bms}}</p><p><strong>Bâtiment :</strong> {{batiment}}</p><h2>Article 1 – Objet</h2><p>Déploiement d'un SGÉB avec {{nombre_points_mesure}} points de mesure et de contrôle via le protocole {{protocole_comm}}.</p><h2>Article 2 – Fonctionnalités</h2><p>Le système assure le monitoring en temps réel, l'automatisation du pilotage et la génération de rapports d'analyse.</p><h2>Article 3 – Formation</h2><p>Une formation des équipes techniques est incluse lors de la mise en œuvre prévue le {{date_mise_en_oeuvre}}.</p></div>`
  },
  {
    code: 'ene2_cert_batiment_vert',
    name: "Accord de service de certification bâtiment vert (HQE, BREEAM)",
    category: 'btp_construction',
    price: 11000, priceMax: 33000,
    description: "Contrat d'accompagnement à la certification bâtiment vert selon les référentiels HQE ou BREEAM pour les projets immobiliers en Afrique.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 71,
    fieldsJson: F([
      {key:'bureau_conseil',label:"Bureau de conseil en certification",type:'text',required:true},
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'projet',label:"Nom du projet immobilier",type:'text',required:true},
      {key:'referentiel',label:"Référentiel de certification (HQE, BREEAM…)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION BÂTIMENT VERT (HQE / BREEAM)</h1><p><strong>Bureau de conseil :</strong> {{bureau_conseil}}</p><p><strong>Maître d'ouvrage :</strong> {{maitre_ouvrage}}</p><h2>Article 1 – Objet</h2><p>Accompagnement du projet {{projet}} dans l'obtention de la certification {{referentiel}}.</p><h2>Article 2 – Missions</h2><p>Le bureau de conseil assure l'analyse des critères, le suivi de conception et la préparation des dossiers de certification.</p><h2>Article 3 – Engagement de résultat</h2><p>Le bureau s'engage à viser au minimum le niveau TRÈS BON (HQE) ou GOOD (BREEAM).</p><p>Signé le {{date_contrat}}</p></div>`
  },
  {
    code: 'ene2_green_bond',
    name: "Accord de financement vert de projet d'énergie (green bond)",
    category: 'btp_construction',
    price: 18000, priceMax: 54000,
    description: "Accord de financement vert (green bond ou green loan) pour soutenir des projets d'énergie renouvelable conformes aux Principes des obligations vertes.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'emetteur',label:"Émetteur de l'obligation verte",type:'text',required:true},
      {key:'investisseur',label:"Investisseur ou bailleur de fonds",type:'text',required:true},
      {key:'montant_fcfa',label:"Montant du financement (FCFA)",type:'text',required:true},
      {key:'projet_finance',label:"Projet financé",type:'text',required:true},
      {key:'date_emission',label:"Date d'émission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT VERT DE PROJET D'ÉNERGIE (GREEN BOND)</h1><p><strong>Émetteur :</strong> {{emetteur}}</p><p><strong>Investisseur :</strong> {{investisseur}}</p><h2>Article 1 – Objet</h2><p>Émission d'une obligation verte d'un montant de {{montant_fcfa}} FCFA destinée au financement du projet {{projet_finance}}.</p><h2>Article 2 – Conformité aux principes GBP</h2><p>L'émission respecte les Green Bond Principles (GBP) de l'ICMA et les guidelines de la BOAD.</p><h2>Article 3 – Reporting</h2><p>Un rapport d'impact annuel sera publié pour démontrer l'utilisation des fonds et les bénéfices environnementaux.</p><p>Émis le {{date_emission}}</p></div>`
  },
  {
    code: 'ene2_partenariat_cie_ipp',
    name: "Accord de partenariat CIE-producteur indépendant (IPP)",
    category: 'btp_construction',
    price: 16000, priceMax: 48000,
    description: "Accord de partenariat entre la Compagnie Ivoirienne d'Électricité (CIE) et un producteur d'énergie indépendant pour l'injection dans le réseau national.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 86,
    fieldsJson: F([
      {key:'ipp',label:"Nom du producteur indépendant",type:'text',required:true},
      {key:'puissance_injectee',label:"Puissance injectée (MW)",type:'text',required:true},
      {key:'point_injection',label:"Point d'injection réseau",type:'text',required:true},
      {key:'tarif_rachat',label:"Tarif de rachat (FCFA/kWh)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CIE – PRODUCTEUR INDÉPENDANT (IPP)</h1><p><strong>Producteur indépendant :</strong> {{ipp}}</p><p><strong>Partenaire réseau :</strong> Compagnie Ivoirienne d'Électricité (CIE)</p><h2>Article 1 – Objet</h2><p>Injection dans le réseau national de {{puissance_injectee}} MW au point {{point_injection}} au tarif de {{tarif_rachat}} FCFA/kWh.</p><h2>Article 2 – Obligations du producteur</h2><p>Le producteur s'engage à maintenir la qualité de l'énergie injectée conforme aux normes techniques de la CIE.</p><h2>Article 3 – Paiement</h2><p>La CIE procède au paiement mensuel sur la base des relevés de comptage certifiés.</p><p>Signé le {{date_accord}}</p></div>`
  },
  {
    code: 'ene2_rapport_perf_solaire',
    name: "Rapport de performance centrale solaire",
    category: 'btp_construction',
    price: 5000, priceMax: 15000,
    description: "Modèle de rapport périodique de performance technique et financière d'une centrale solaire photovoltaïque.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'centrale',label:"Nom de la centrale solaire",type:'text',required:true},
      {key:'periode_rapport',label:"Période du rapport (ex: T1 2025)",type:'text',required:true},
      {key:'production_kwh',label:"Production réelle (kWh)",type:'text',required:true},
      {key:'production_prevue',label:"Production prévue (kWh)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – CENTRALE SOLAIRE {{centrale}}</h1><p><strong>Période :</strong> {{periode_rapport}}</p><p><strong>Date :</strong> {{date_rapport}}</p><h2>1. Résumé exécutif</h2><p>Production réelle : {{production_kwh}} kWh / Production prévue : {{production_prevue}} kWh.</p><h2>2. Analyse des performances</h2><p>Le Performance Ratio (PR) et le taux de disponibilité sont calculés et comparés aux valeurs contractuelles.</p><h2>3. Incidents et maintenance</h2><p>Liste des incidents survenus, durées d'interruption et actions correctives effectuées.</h2><h2>4. Recommandations</h2><p>Actions préventives proposées pour la prochaine période.</p></div>`
  },
  {
    code: 'ene2_plan_dev_enr',
    name: "Plan de développement des énergies renouvelables",
    category: 'btp_construction',
    price: 15000, priceMax: 45000,
    description: "Document cadre définissant la stratégie et le plan d'action pour le développement des énergies renouvelables d'une entreprise ou d'une collectivité.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation",type:'text',required:true},
      {key:'horizon_annees',label:"Horizon du plan (années)",type:'text',required:true},
      {key:'objectif_enr',label:"Objectif part EnR (%)",type:'text',required:true},
      {key:'investissement_total',label:"Investissement total prévu (FCFA)",type:'text',required:true},
      {key:'date_validation',label:"Date de validation du plan",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DES ÉNERGIES RENOUVELABLES</h1><p><strong>Organisation :</strong> {{organisation}}</p><p><strong>Validé le :</strong> {{date_validation}}</p><h2>1. Contexte et ambition</h2><p>Atteindre {{objectif_enr}} % d'énergies renouvelables dans le mix énergétique à l'horizon {{horizon_annees}} ans.</p><h2>2. Projets prioritaires</h2><p>Solaire photovoltaïque, efficacité énergétique des bâtiments, mobilité électrique et stockage distribué.</p><h2>3. Plan d'investissement</h2><p>Investissement total prévu : {{investissement_total}} FCFA sur la période du plan.</p><h2>4. Gouvernance et suivi</h2><p>Un comité de pilotage se réunira trimestriellement pour suivre l'avancement des projets.</p></div>`
  },
  {
    code: 'ene2_formation_enr',
    name: "Accord de service de formation en énergie renouvelable",
    category: 'btp_construction',
    price: 5000, priceMax: 15000,
    description: "Contrat de formation professionnelle aux métiers et techniques des énergies renouvelables pour techniciens et ingénieurs.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'entreprise_cliente',label:"Entreprise cliente",type:'text',required:true},
      {key:'thematique',label:"Thématique de la formation",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'date_formation',label:"Date de la formation",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN ÉNERGIE RENOUVELABLE</h1><p><strong>Organisme de formation :</strong> {{organisme_formation}}</p><p><strong>Entreprise cliente :</strong> {{entreprise_cliente}}</p><h2>Article 1 – Objet</h2><p>Formation de {{nombre_stagiaires}} stagiaires sur la thématique : {{thematique}}.</p><h2>Article 2 – Programme</h2><p>La formation combine des modules théoriques et des travaux pratiques sur équipements réels.</p><h2>Article 3 – Certification</h2><p>Une attestation de formation sera remise à chaque participant ayant validé l'évaluation finale.</p><h2>Article 4 – Date</h2><p>La formation se déroule le {{date_formation}}.</p></div>`
  },
  {
    code: 'ene2_charte_energie_propre',
    name: "Charte de l'énergie propre et accessible",
    category: 'btp_construction',
    price: 4000, priceMax: 12000,
    description: "Charte d'engagement collectif pour la promotion de l'accès universel à une énergie propre, durable et abordable, conforme à l'ODD 7.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'signataire',label:"Nom du signataire ou de l'organisation",type:'text',required:true},
      {key:'engagement_cle',label:"Engagement principal pris",type:'textarea',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'date_signature',label:"Date de signature de la charte",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'ÉNERGIE PROPRE ET ACCESSIBLE</h1><p><strong>Signataire :</strong> {{signataire}}</p><p><strong>Zone d'intervention :</strong> {{zone_intervention}}</p><h2>Préambule</h2><p>Convaincu que l'accès à une énergie propre est un droit fondamental, le signataire s'engage à contribuer activement à l'atteinte de l'ODD 7 en Afrique.</p><h2>Nos engagements</h2><p>{{engagement_cle}}</p><h2>Principes directeurs</h2><p>Accessibilité financière, durabilité environnementale, inclusion sociale et souveraineté énergétique guident toutes nos actions.</p><p>Signé le {{date_signature}}</p></div>`
  },

  // ─── BIOÉNERGIE / BIOMASSE (bio3_) – catégorie agro_environnement ───
  {
    code: 'bio3_bioethanol_canne',
    name: "Accord de service de production de bioéthanol (canne à sucre)",
    category: 'agro_environnement',
    price: 14000, priceMax: 42000,
    description: "Accord encadrant la production de bioéthanol à partir de la canne à sucre entre un producteur agricole et une unité de transformation.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 76,
    fieldsJson: F([
      {key:'producteur_agricole',label:"Producteur de canne à sucre",type:'text',required:true},
      {key:'unite_transformation',label:"Unité de transformation",type:'text',required:true},
      {key:'tonnage_canne',label:"Tonnage annuel de canne (tonnes)",type:'text',required:true},
      {key:'volume_ethanol',label:"Volume d'éthanol produit (litres/an)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE BIOÉTHANOL (CANNE À SUCRE)</h1><p><strong>Producteur :</strong> {{producteur_agricole}}</p><p><strong>Unité de transformation :</strong> {{unite_transformation}}</p><h2>Article 1 – Objet</h2><p>Fourniture annuelle de {{tonnage_canne}} tonnes de canne à sucre pour la production de {{volume_ethanol}} litres de bioéthanol.</p><h2>Article 2 – Qualité de la matière première</h2><p>La canne doit respecter un taux de saccharose minimal fixé en annexe technique.</p><h2>Article 3 – Prix et paiement</h2><p>Le prix de la canne est fixé sur la base du cours officiel et révisé trimestriellement.</p><p>Signé le {{date_contrat}}</p></div>`
  },
  {
    code: 'bio3_biodiesel_jatropha',
    name: "Accord de service de production de biodiesel (jatropha, palme)",
    category: 'agro_environnement',
    price: 12000, priceMax: 36000,
    description: "Accord de production de biodiesel à partir de jatropha ou d'huile de palme brute entre agriculteurs et huilerie.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'fournisseur_oleagineux',label:"Fournisseur d'oléagineux",type:'text',required:true},
      {key:'huilerie',label:"Huilerie transformatrice",type:'text',required:true},
      {key:'matiere_premiere',label:"Matière première (jatropha ou palme)",type:'text',required:true},
      {key:'volume_biodiesel',label:"Volume de biodiesel prévu (litres/an)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de production",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE BIODIESEL ({{matiere_premiere}})</h1><p><strong>Fournisseur :</strong> {{fournisseur_oleagineux}}</p><p><strong>Huilerie :</strong> {{huilerie}}</p><h2>Article 1 – Objet</h2><p>Production de {{volume_biodiesel}} litres/an de biodiesel à partir de {{matiere_premiere}}.</p><h2>Article 2 – Normes qualité</h2><p>Le biodiesel doit être conforme à la norme EN 14214 ou équivalente reconnue en zone OHADA.</p><h2>Article 3 – Traçabilité</h2><p>Un système de traçabilité de la matière première sera mis en place dès le {{date_debut}}.</p></div>`
  },
  {
    code: 'bio3_biogaz_dechets',
    name: "Accord de service de production de biogaz (déchets organiques)",
    category: 'agro_environnement',
    price: 10000, priceMax: 30000,
    description: "Accord de collecte et de valorisation des déchets organiques pour la production de biogaz destiné à la cuisson ou à la production d'électricité.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'operateur_biogaz',label:"Opérateur biogaz",type:'text',required:true},
      {key:'fournisseur_dechets',label:"Fournisseur de déchets organiques",type:'text',required:true},
      {key:'tonnage_dechets',label:"Tonnage de déchets traités/an",type:'text',required:true},
      {key:'production_m3',label:"Production de biogaz (m³/an)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE BIOGAZ (DÉCHETS ORGANIQUES)</h1><p><strong>Opérateur :</strong> {{operateur_biogaz}}</p><p><strong>Fournisseur de déchets :</strong> {{fournisseur_dechets}}</p><h2>Article 1 – Objet</h2><p>Collecte et valorisation de {{tonnage_dechets}} tonnes/an de déchets organiques pour produire {{production_m3}} m³ de biogaz par an.</p><h2>Article 2 – Traitement des déchets</h2><p>Les déchets sont traités par méthanisation anaérobie en digesteur fermé.</p><h2>Article 3 – Valorisation du digestat</h2><p>Le digestat issu du processus est valorisé comme engrais organique de qualité certifiée.</p><p>Signé le {{date_contrat}}</p></div>`
  },
  {
    code: 'bio3_methanisation_agricole',
    name: "Accord de service de méthanisation agricole",
    category: 'agro_environnement',
    price: 12000, priceMax: 36000,
    description: "Contrat d'installation et d'exploitation d'une unité de méthanisation agricole pour valoriser les effluents d'élevage.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'exploitant',label:"Exploitant agricole",type:'text',required:true},
      {key:'constructeur_digesteur',label:"Constructeur du digesteur",type:'text',required:true},
      {key:'volume_digesteur',label:"Volume du digesteur (m³)",type:'text',required:true},
      {key:'intrants',label:"Types d'intrants (lisier, fumier…)",type:'text',required:true},
      {key:'date_mise_en_service',label:"Date de mise en service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MÉTHANISATION AGRICOLE</h1><p><strong>Exploitant agricole :</strong> {{exploitant}}</p><p><strong>Constructeur :</strong> {{constructeur_digesteur}}</p><h2>Article 1 – Objet</h2><p>Construction et mise en service d'un digesteur de {{volume_digesteur}} m³ valorisant les intrants suivants : {{intrants}}.</p><h2>Article 2 – Production attendue</h2><p>Le système est dimensionné pour produire du biogaz alimentant un groupe électrogène ou des cuisinières à gaz.</p><h2>Article 3 – Mise en service</h2><p>La mise en service est prévue le {{date_mise_en_service}}.</p></div>`
  },
  {
    code: 'bio3_biogaz_menagers',
    name: "Accord de service de valorisation des déchets ménagers (biogaz)",
    category: 'agro_environnement',
    price: 11000, priceMax: 33000,
    description: "Accord municipal de valorisation des déchets ménagers pour la production de biogaz destiné aux ménages urbains.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'mairie',label:"Municipalité ou mairie",type:'text',required:true},
      {key:'operateur',label:"Opérateur privé",type:'text',required:true},
      {key:'volume_dechets_jour',label:"Volume de déchets traités/jour (tonnes)",type:'text',required:true},
      {key:'nombre_menages',label:"Nombre de ménages approvisionnés",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE VALORISATION DES DÉCHETS MÉNAGERS EN BIOGAZ</h1><p><strong>Municipalité :</strong> {{mairie}}</p><p><strong>Opérateur :</strong> {{operateur}}</p><h2>Article 1 – Objet</h2><p>Traitement de {{volume_dechets_jour}} tonnes/jour de déchets ménagers pour la production de biogaz approvisionnant {{nombre_menages}} ménages.</p><h2>Article 2 – Gestion du site</h2><p>L'opérateur gère le site de méthanisation et assure la distribution du biogaz via réseau ou bonbonnes.</p><h2>Article 3 – Redevance municipale</h2><p>La mairie verse une redevance de traitement et perçoit une part des recettes de vente du biogaz.</p><p>Signé le {{date_accord}}</p></div>`
  },
  {
    code: 'bio3_charbon_vert',
    name: "Accord de service de production de charbon vert (biocharbon)",
    category: 'agro_environnement',
    price: 7000, priceMax: 21000,
    description: "Accord de production de biocharbon (charbon vert) par carbonisation de résidus végétaux comme alternative au charbon de bois traditionnel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'producteur',label:"Producteur de biocharbon",type:'text',required:true},
      {key:'type_biomasse',label:"Type de biomasse utilisée",type:'text',required:true},
      {key:'production_tonnes',label:"Production annuelle (tonnes)",type:'text',required:true},
      {key:'distributeur',label:"Distributeur ou acheteur",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE CHARBON VERT (BIOCHARBON)</h1><p><strong>Producteur :</strong> {{producteur}}</p><p><strong>Distributeur :</strong> {{distributeur}}</p><h2>Article 1 – Objet</h2><p>Production de {{production_tonnes}} tonnes/an de biocharbon à partir de {{type_biomasse}}.</p><h2>Article 2 – Avantages environnementaux</h2><p>Le biocharbon réduit la déforestation, améliore la qualité de l'air intérieur et séquestre le carbone dans les sols.</p><h2>Article 3 – Qualité et conditionnement</h2><p>Le produit fini est conditionné en sacs de 5 kg et 25 kg selon les spécifications du distributeur.</p><p>Signé le {{date_contrat}}</p></div>`
  },
  {
    code: 'bio3_briquettes_bois',
    name: "Accord de service de production de briquettes végétales (déchets bois)",
    category: 'agro_environnement',
    price: 6000, priceMax: 18000,
    description: "Contrat de production et de distribution de briquettes de biomasse compressée à partir de déchets de bois et résidus agricoles.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 64,
    fieldsJson: F([
      {key:'fabricant',label:"Fabricant de briquettes",type:'text',required:true},
      {key:'client_distributeur',label:"Client ou distributeur",type:'text',required:true},
      {key:'matiere_premiere',label:"Matière première (sciure, coques…)",type:'text',required:true},
      {key:'capacite_production',label:"Capacité de production (tonnes/mois)",type:'text',required:true},
      {key:'date_demarrage',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE BRIQUETTES VÉGÉTALES</h1><p><strong>Fabricant :</strong> {{fabricant}}</p><p><strong>Client / Distributeur :</strong> {{client_distributeur}}</p><h2>Article 1 – Objet</h2><p>Production de briquettes à partir de {{matiere_premiere}} à raison de {{capacite_production}} tonnes/mois.</p><h2>Article 2 – Spécifications</h2><p>Pouvoir calorifique minimal garanti : 4 000 kcal/kg. Taux d'humidité inférieur à 12 %.</p><h2>Article 3 – Livraison</h2><p>La première livraison est prévue à partir du {{date_demarrage}}.</p></div>`
  },
  {
    code: 'bio3_carbonisation_meule',
    name: "Accord de service de carbonisation améliorée (meule)",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Accord de déploiement de meules de carbonisation améliorées pour une production de charbon de bois plus efficace et moins polluante.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 58,
    fieldsJson: F([
      {key:'fournisseur_tech',label:"Fournisseur de technologie",type:'text',required:true},
      {key:'groupement_charbonniers',label:"Groupement de charbonniers",type:'text',required:true},
      {key:'nombre_meules',label:"Nombre de meules déployées",type:'text',required:true},
      {key:'region',label:"Région d'intervention",type:'text',required:true},
      {key:'date_formation',label:"Date de formation des charbonniers",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CARBONISATION AMÉLIORÉE (MEULE)</h1><p><strong>Fournisseur :</strong> {{fournisseur_tech}}</p><p><strong>Groupement bénéficiaire :</strong> {{groupement_charbonniers}}</p><h2>Article 1 – Objet</h2><p>Déploiement de {{nombre_meules}} meule(s) de carbonisation améliorée dans la région de {{region}}.</p><h2>Article 2 – Avantages</h2><p>La technologie améliore le taux de rendement de 15 % à 30 % et réduit les émissions de fumée et de CO.</p><h2>Article 3 – Formation</h2><p>Les charbonniers bénéficieront d'une formation pratique le {{date_formation}}.</p></div>`
  },
  {
    code: 'bio3_gazeification_biomasse',
    name: "Accord de service de gazéification de la biomasse",
    category: 'agro_environnement',
    price: 13000, priceMax: 39000,
    description: "Accord de déploiement d'unités de gazéification de la biomasse pour la production de syngas utilisé en cogénération.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'fournisseur_gazogene',label:"Fournisseur du gazogène",type:'text',required:true},
      {key:'client_industriel',label:"Client industriel",type:'text',required:true},
      {key:'type_biomasse',label:"Type de biomasse (coques, paille…)",type:'text',required:true},
      {key:'puissance_kw',label:"Puissance électrique (kW)",type:'text',required:true},
      {key:'date_mise_en_service',label:"Date de mise en service",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE GAZÉIFICATION DE LA BIOMASSE</h1><p><strong>Fournisseur :</strong> {{fournisseur_gazogene}}</p><p><strong>Client industriel :</strong> {{client_industriel}}</p><h2>Article 1 – Objet</h2><p>Installation d'une unité de gazéification de {{type_biomasse}} produisant {{puissance_kw}} kW d'électricité via cogénération.</p><h2>Article 2 – Performance</h2><p>Le taux de conversion énergétique garanti est d'au moins 75 %.</p><h2>Article 3 – Mise en service</h2><p>La mise en service industrielle est prévue le {{date_mise_en_service}}.</p></div>`
  },
  {
    code: 'bio3_cogeneration_biomasse',
    name: "Accord de service de cogénération biomasse (chaleur + électricité)",
    category: 'agro_environnement',
    price: 16000, priceMax: 48000,
    description: "Contrat de construction et d'exploitation d'une centrale de cogénération biomasse produisant simultanément chaleur et électricité.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur de la centrale",type:'text',required:true},
      {key:'site_industriel',label:"Site industriel bénéficiaire",type:'text',required:true},
      {key:'puissance_elec_kw',label:"Puissance électrique (kW)",type:'text',required:true},
      {key:'puissance_thermique_kw',label:"Puissance thermique (kW)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COGÉNÉRATION BIOMASSE</h1><p><strong>Opérateur :</strong> {{operateur}}</p><p><strong>Site bénéficiaire :</strong> {{site_industriel}}</p><h2>Article 1 – Objet</h2><p>Exploitation d'une centrale de cogénération biomasse produisant {{puissance_elec_kw}} kW électriques et {{puissance_thermique_kw}} kW thermiques.</p><h2>Article 2 – Efficacité globale</h2><p>Le rendement global de cogénération est garanti à 80 % minimum.</p><h2>Article 3 – Fourniture de biomasse</h2><p>La biomasse est approvisionnée selon un plan d'approvisionnement durable annexé au présent accord.</p><p>Signé le {{date_signature}}</p></div>`
  },
  {
    code: 'bio3_torrefaction_biomasse',
    name: "Accord de service de torréfaction de la biomasse",
    category: 'agro_environnement',
    price: 11000, priceMax: 33000,
    description: "Accord de traitement thermique (torréfaction) de la biomasse lignocellulosique pour produire un combustible solide dense et hydrophobe.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'prestataire',label:"Prestataire de torréfaction",type:'text',required:true},
      {key:'client',label:"Client final",type:'text',required:true},
      {key:'biomasse_entree',label:"Type de biomasse en entrée",type:'text',required:true},
      {key:'capacite_tonnes_h',label:"Capacité de traitement (tonnes/h)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TORRÉFACTION DE LA BIOMASSE</h1><p><strong>Prestataire :</strong> {{prestataire}}</p><p><strong>Client :</strong> {{client}}</p><h2>Article 1 – Objet</h2><p>Torréfaction de {{biomasse_entree}} à une capacité de {{capacite_tonnes_h}} tonnes/h pour produire un biocharbon torréfié de haute densité énergétique.</p><h2>Article 2 – Paramètres du procédé</h2><p>Température de torréfaction : 250-300 °C. Durée de traitement : 30 à 60 minutes.</p><h2>Article 3 – Qualité du produit</h2><p>Pouvoir calorifique supérieur (PCS) garanti à 20 MJ/kg minimum.</p><p>Signé le {{date_contrat}}</p></div>`
  },
  {
    code: 'bio3_pellets_biomasse',
    name: "Accord de service de pellets de biomasse",
    category: 'agro_environnement',
    price: 9000, priceMax: 27000,
    description: "Accord de production et de commercialisation de pellets de biomasse pour usage thermique industriel et résidentiel.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'pellétiseur',label:"Producteur de pellets",type:'text',required:true},
      {key:'acheteur',label:"Acheteur ou distributeur",type:'text',required:true},
      {key:'matiere_premiere',label:"Matière première (bois, paille…)",type:'text',required:true},
      {key:'volume_tonnes_an',label:"Volume annuel (tonnes/an)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PELLETS DE BIOMASSE</h1><p><strong>Producteur :</strong> {{pellétiseur}}</p><p><strong>Acheteur :</strong> {{acheteur}}</p><h2>Article 1 – Objet</h2><p>Production et livraison de {{volume_tonnes_an}} tonnes/an de pellets de biomasse à base de {{matiere_premiere}}.</p><h2>Article 2 – Certification</h2><p>Les pellets sont conformes à la norme ISO 17225-2 (classe A1) ou EN PLUS A1.</p><h2>Article 3 – Conditions de livraison</h2><p>Livraison en vrac ou en sacs de 15 kg selon les modalités définies en annexe.</p><p>Signé le {{date_contrat}}</p></div>`
  },
  {
    code: 'bio3_engrais_organiques',
    name: "Accord de service de production d'engrais organiques (compost)",
    category: 'agro_environnement',
    price: 6000, priceMax: 18000,
    description: "Accord de production et de commercialisation de compost et d'engrais organiques issus de déchets agricoles et ménagers.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 70,
    fieldsJson: F([
      {key:'producteur_compost',label:"Producteur de compost",type:'text',required:true},
      {key:'client_agricole',label:"Agriculteur ou coopérative cliente",type:'text',required:true},
      {key:'intrants_compost',label:"Intrants utilisés (déchets verts, fumier…)",type:'text',required:true},
      {key:'production_tonnes',label:"Production annuelle (tonnes)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de fourniture",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION D'ENGRAIS ORGANIQUES (COMPOST)</h1><p><strong>Producteur :</strong> {{producteur_compost}}</p><p><strong>Client agricole :</strong> {{client_agricole}}</p><h2>Article 1 – Objet</h2><p>Production et livraison de {{production_tonnes}} tonnes/an de compost mûr à partir de {{intrants_compost}}.</p><h2>Article 2 – Qualité</h2><p>Le compost respecte les normes NFU 44-051 ou équivalentes : rapport C/N entre 10 et 15, matière sèche supérieure à 30 %.</p><h2>Article 3 – Première livraison</h2><p>La première livraison est prévue à compter du {{date_debut}}.</p></div>`
  },
  {
    code: 'bio3_biofertilisants',
    name: "Accord de service de production de biofertilisants (inoculants)",
    category: 'agro_environnement',
    price: 7000, priceMax: 21000,
    description: "Accord de production et de distribution de biofertilisants microbiens (rhizobiums, mycorhizes) pour améliorer naturellement la fertilité des sols.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'laboratoire',label:"Laboratoire producteur",type:'text',required:true},
      {key:'distributeur',label:"Distributeur agricole",type:'text',required:true},
      {key:'type_inoculant',label:"Type d'inoculant (rhizobium, mycorhize…)",type:'text',required:true},
      {key:'volume_litres',label:"Volume à produire (litres/an)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE BIOFERTILISANTS (INOCULANTS)</h1><p><strong>Laboratoire :</strong> {{laboratoire}}</p><p><strong>Distributeur :</strong> {{distributeur}}</p><h2>Article 1 – Objet</h2><p>Production de {{volume_litres}} litres/an de biofertilisant de type {{type_inoculant}} pour application agricole.</p><h2>Article 2 – Garantie microbiologique</h2><p>Le produit contient une concentration minimale de 10^8 UFC/ml à la date de livraison.</p><h2>Article 3 – Conservation et distribution</h2><p>Le produit doit être conservé entre 4 et 8 °C et distribué avant la date de péremption indiquée.</p><p>Signé le {{date_accord}}</p></div>`
  },
  {
    code: 'bio3_biopesticides',
    name: "Accord de service de production de biopesticides",
    category: 'agro_environnement',
    price: 8000, priceMax: 24000,
    description: "Accord de production et de commercialisation de biopesticides d'origine naturelle (Bacillus thuringiensis, neem, trichoderma) pour l'agriculture durable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'fabricant',label:"Fabricant de biopesticides",type:'text',required:true},
      {key:'cooperative',label:"Coopérative ou groupement agricole",type:'text',required:true},
      {key:'type_biopesticide',label:"Type de biopesticide",type:'text',required:true},
      {key:'superficie_cible',label:"Superficie agricole cible (hectares)",type:'text',required:true},
      {key:'date_debut_livraison',label:"Date de début de livraison",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION DE BIOPESTICIDES</h1><p><strong>Fabricant :</strong> {{fabricant}}</p><p><strong>Coopérative :</strong> {{cooperative}}</p><h2>Article 1 – Objet</h2><p>Production et livraison de biopesticide de type {{type_biopesticide}} pour la protection de {{superficie_cible}} hectares de cultures.</p><h2>Article 2 – Homologation</h2><p>Le biopesticide est homologué par le Comité Sahélien des Pesticides (CSP) ou l'autorité nationale compétente.</p><h2>Article 3 – Formation des applicateurs</h2><p>Une formation à l'application est dispensée lors de la première livraison prévue le {{date_debut_livraison}}.</p></div>`
  },
  {
    code: 'bio3_bioraffinerie',
    name: "Accord de service de bioraffinerie (valorisation totale de la biomasse)",
    category: 'agro_environnement',
    price: 20000, priceMax: 60000,
    description: "Accord de développement d'une bioraffinerie valorisant l'intégralité des fractions d'une biomasse en produits énergétiques, chimiques et alimentaires.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 77,
    fieldsJson: F([
      {key:'investisseur',label:"Investisseur ou promoteur",type:'text',required:true},
      {key:'site_bioraffinerie',label:"Site de la bioraffinerie",type:'text',required:true},
      {key:'biomasse_principale',label:"Biomasse principale valorisée",type:'text',required:true},
      {key:'produits_valorises',label:"Produits issus de la valorisation",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE BIORAFFINERIE</h1><p><strong>Promoteur :</strong> {{investisseur}}</p><p><strong>Site :</strong> {{site_bioraffinerie}}</p><h2>Article 1 – Objet</h2><p>Développement d'une bioraffinerie valorisant la {{biomasse_principale}} en : {{produits_valorises}}.</p><h2>Article 2 – Concept de valorisation totale (zero waste)</h2><p>La bioraffinerie vise un taux de valorisation de 95 % de la biomasse entrante en produits commercialisables.</p><h2>Article 3 – Impact environnemental</h2><p>Une analyse du cycle de vie (ACV) sera réalisée annuellement pour quantifier les bénéfices environnementaux.</p><p>Signé le {{date_accord}}</p></div>`
  },
  {
    code: 'bio3_algues_energetiques',
    name: "Accord de service de production d'algues énergétiques",
    category: 'agro_environnement',
    price: 15000, priceMax: 45000,
    description: "Accord de développement d'une unité de production de microalgues à fort potentiel énergétique et nutritionnel.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 60,
    fieldsJson: F([
      {key:'laboratoire_algues',label:"Laboratoire ou entreprise algoproductrice",type:'text',required:true},
      {key:'partenaire',label:"Partenaire industriel ou bailleur",type:'text',required:true},
      {key:'espece_algue',label:"Espèce cultivée (Spiruline, Chlorella…)",type:'text',required:true},
      {key:'capacite_kg_an',label:"Capacité de production (kg/an)",type:'text',required:true},
      {key:'date_demarrage',label:"Date de démarrage",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE PRODUCTION D'ALGUES ÉNERGÉTIQUES</h1><p><strong>Algoproducteur :</strong> {{laboratoire_algues}}</p><p><strong>Partenaire :</strong> {{partenaire}}</p><h2>Article 1 – Objet</h2><p>Production de {{capacite_kg_an}} kg/an de {{espece_algue}} destinée à la production de biocarburant et/ou de protéines alimentaires.</p><h2>Article 2 – Système de culture</h2><p>Photobioréacteurs ou bassins ouverts dimensionnés selon les conditions climatiques locales.</p><h2>Article 3 – Démarrage de la production</h2><p>Le démarrage de la production est fixé au {{date_demarrage}}.</p></div>`
  },
  {
    code: 'bio3_redd_bioenergy',
    name: "Accord de service de REDD+ bioénergie",
    category: 'agro_environnement',
    price: 18000, priceMax: 54000,
    description: "Accord de mise en œuvre de projets REDD+ couplés à la bioénergie pour réduire la déforestation et générer des crédits carbone.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'porteur_projet',label:"Porteur de projet REDD+",type:'text',required:true},
      {key:'etat_ou_collectivite',label:"État ou collectivité partenaire",type:'text',required:true},
      {key:'superficie_foret',label:"Superficie forestière protégée (ha)",type:'text',required:true},
      {key:'credits_carbone_an',label:"Crédits carbone attendus (tCO2/an)",type:'text',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE REDD+ BIOÉNERGIE</h1><p><strong>Porteur de projet :</strong> {{porteur_projet}}</p><p><strong>Partenaire public :</strong> {{etat_ou_collectivite}}</p><h2>Article 1 – Objet</h2><p>Protection de {{superficie_foret}} ha de forêt et génération de {{credits_carbone_an}} tCO2/an de crédits carbone via la promotion de la bioénergie durable.</p><h2>Article 2 – Certification des crédits</h2><p>Les crédits carbone seront certifiés selon le standard VCS (Verified Carbon Standard) ou Gold Standard.</p><h2>Article 3 – Partage des bénéfices</h2><p>Les recettes des crédits carbone sont partagées entre le porteur, les communautés locales et l'État.</p><p>Signé le {{date_accord}}</p></div>`
  },
  {
    code: 'bio3_partenariat_biogaz_collectivite',
    name: "Accord de partenariat collectivité-producteur biogaz",
    category: 'agro_environnement',
    price: 10000, priceMax: 30000,
    description: "Accord de partenariat public-privé entre une collectivité locale et un producteur privé de biogaz pour l'approvisionnement énergétique local.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'collectivite',label:"Collectivité locale",type:'text',required:true},
      {key:'producteur_biogaz',label:"Producteur privé de biogaz",type:'text',required:true},
      {key:'volume_biogaz_an',label:"Volume de biogaz fourni (m³/an)",type:'text',required:true},
      {key:'duree_partenariat',label:"Durée du partenariat (années)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT COLLECTIVITÉ – PRODUCTEUR BIOGAZ</h1><p><strong>Collectivité :</strong> {{collectivite}}</p><p><strong>Producteur biogaz :</strong> {{producteur_biogaz}}</p><h2>Article 1 – Objet</h2><p>Fourniture de {{volume_biogaz_an}} m³/an de biogaz à la collectivité pour une durée de {{duree_partenariat}} ans.</p><h2>Article 2 – Infrastructures</h2><p>Le réseau de distribution est cofinancé par les deux parties selon les modalités définies en annexe financière.</p><h2>Article 3 – Clause de révision tarifaire</h2><p>Le tarif est révisé annuellement sur la base de l'indice des prix à la consommation (IPC) de l'UEMOA.</p><p>Signé le {{date_signature}}</p></div>`
  },
  {
    code: 'bio3_formation_bioenergy',
    name: "Accord de service de formation en bioénergie",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Contrat de formation professionnelle aux technologies et aux métiers de la bioénergie pour techniciens agricoles et agents ruraux.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 57,
    fieldsJson: F([
      {key:'centre_formation',label:"Centre de formation",type:'text',required:true},
      {key:'commanditaire',label:"Commanditaire de la formation",type:'text',required:true},
      {key:'module_forme',label:"Module de formation",type:'text',required:true},
      {key:'nombre_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'date_session',label:"Date de la session",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE FORMATION EN BIOÉNERGIE</h1><p><strong>Centre de formation :</strong> {{centre_formation}}</p><p><strong>Commanditaire :</strong> {{commanditaire}}</p><h2>Article 1 – Objet</h2><p>Organisation d'une session de formation de {{nombre_participants}} participants sur le module : {{module_forme}}.</p><h2>Article 2 – Méthode pédagogique</h2><p>La formation alterne cours magistraux, études de cas et visites de sites de production de bioénergie.</p><h2>Article 3 – Attestation</h2><p>Une attestation de participation est remise à l'issue de la session du {{date_session}}.</p></div>`
  },
  {
    code: 'bio3_rapport_perf_bioenergie',
    name: "Rapport de performance unité bioénergie",
    category: 'agro_environnement',
    price: 5000, priceMax: 15000,
    description: "Modèle de rapport périodique de suivi des performances d'une unité de production de bioénergie (biogaz, bioéthanol, biomasse).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'unite_bioenergie',label:"Nom de l'unité de bioénergie",type:'text',required:true},
      {key:'periode',label:"Période du rapport",type:'text',required:true},
      {key:'production_reelle',label:"Production réelle (unité)",type:'text',required:true},
      {key:'production_cible',label:"Production cible (unité)",type:'text',required:true},
      {key:'date_rapport',label:"Date du rapport",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE – UNITÉ BIOÉNERGIE {{unite_bioenergie}}</h1><p><strong>Période :</strong> {{periode}}</p><p><strong>Date :</strong> {{date_rapport}}</p><h2>1. Indicateurs de production</h2><p>Production réelle : {{production_reelle}} / Production cible : {{production_cible}}.</p><h2>2. Efficacité du processus</h2><p>Analyse des taux de conversion, rendements et consommations spécifiques de la période.</p><h2>3. Qualité du produit</h2><p>Résultats des analyses qualité et conformité aux normes applicables.</p><h2>4. Perspectives</h2><p>Recommandations pour l'optimisation de la période suivante.</p></div>`
  },
  {
    code: 'bio3_plan_dev_bioenergy',
    name: "Plan de développement bioénergie nationale",
    category: 'agro_environnement',
    price: 15000, priceMax: 45000,
    description: "Document de planification stratégique pour le développement de la filière bioénergie à l'échelle nationale ou régionale.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'pays_region',label:"Pays ou région concernée",type:'text',required:true},
      {key:'autorite',label:"Autorité ou ministère responsable",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (années)",type:'text',required:true},
      {key:'objectif_bioenrgie',label:"Objectif de part de bioénergie (%)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption du plan",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT BIOÉNERGIE NATIONALE</h1><p><strong>Pays / Région :</strong> {{pays_region}}</p><p><strong>Autorité responsable :</strong> {{autorite}}</p><p><strong>Adopté le :</strong> {{date_adoption}}</p><h2>1. Diagnostic de la situation actuelle</h2><p>Analyse du mix énergétique, des ressources en biomasse disponibles et des politiques existantes.</p><h2>2. Objectifs stratégiques</h2><p>Atteindre {{objectif_bioenrgie}} % de bioénergie dans le mix énergétique à {{horizon_plan}} ans.</p><h2>3. Projets phares et feuille de route</h2><p>Identification des projets structurants, des acteurs clés et du calendrier de mise en œuvre.</p><h2>4. Financement et gouvernance</h2><p>Mobilisation des financements climatiques (FVC, BOAD, BEI) et mise en place du cadre de gouvernance.</p></div>`
  },
  {
    code: 'bio3_financement_boad',
    name: "Accord de service de financement bioénergie (BOAD/BEI)",
    category: 'agro_environnement',
    price: 18000, priceMax: 54000,
    description: "Accord de financement de projet bioénergie auprès d'institutions financières de développement (BOAD, BEI, AFD).",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'porteur_projet',label:"Porteur de projet",type:'text',required:true},
      {key:'bailleur',label:"Bailleur de fonds (BOAD, BEI, AFD…)",type:'text',required:true},
      {key:'montant_financement',label:"Montant du financement (FCFA)",type:'text',required:true},
      {key:'projet_description',label:"Description succincte du projet",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord de financement",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT BIOÉNERGIE</h1><p><strong>Porteur de projet :</strong> {{porteur_projet}}</p><p><strong>Bailleur :</strong> {{bailleur}}</p><h2>Article 1 – Objet</h2><p>Le {{bailleur}} accorde un financement de {{montant_financement}} FCFA pour le projet suivant : {{projet_description}}</p><h2>Article 2 – Conditions de financement</h2><p>Le financement est soumis aux conditions de la politique de crédit vert du bailleur et aux critères de durabilité de la bioénergie.</p><h2>Article 3 – Reporting et suivi</h2><p>Des rapports de suivi semestriels seront transmis au bailleur.</p><p>Signé le {{date_accord}}</p></div>`
  },
  {
    code: 'bio3_certification_rsb',
    name: "Accord de service de certification bioénergie durable (RSB)",
    category: 'agro_environnement',
    price: 12000, priceMax: 36000,
    description: "Contrat d'accompagnement à la certification RSB (Roundtable on Sustainable Biomaterials) pour les producteurs de biocarburants et de biomasse.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 64,
    fieldsJson: F([
      {key:'organisme_cert',label:"Organisme de certification accrédité",type:'text',required:true},
      {key:'entreprise_certifiee',label:"Entreprise à certifier",type:'text',required:true},
      {key:'scope_certification',label:"Périmètre de certification",type:'text',required:true},
      {key:'duree_mission',label:"Durée de la mission d'accompagnement (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la mission",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CERTIFICATION BIOÉNERGIE DURABLE (RSB)</h1><p><strong>Organisme de certification :</strong> {{organisme_cert}}</p><p><strong>Entreprise à certifier :</strong> {{entreprise_certifiee}}</p><h2>Article 1 – Objet</h2><p>Accompagnement de {{entreprise_certifiee}} pour l'obtention de la certification RSB sur le périmètre : {{scope_certification}}</p><h2>Article 2 – Principes RSB</h2><p>L'accompagnement couvre les 12 principes RSB : légalité, planification, GES, droits humains, eau, sol, air, biodiversité, alimentation, développement local, énergie, droits des travailleurs.</p><h2>Article 3 – Calendrier</h2><p>La mission débute le {{date_debut}} pour une durée de {{duree_mission}} mois.</p></div>`
  },
  {
    code: 'bio3_charte_bioenergy_durable',
    name: "Charte de la bioénergie durable et inclusive",
    category: 'agro_environnement',
    price: 4000, priceMax: 12000,
    description: "Charte d'engagement des acteurs de la filière bioénergie pour un développement durable, inclusif et respectueux des droits communautaires.",
    templateType: 'pdf', classe: 'C', active: true, popularity: 56,
    fieldsJson: F([
      {key:'signataire',label:"Nom du signataire ou de l'organisation",type:'text',required:true},
      {key:'role_filiere',label:"Rôle dans la filière bioénergie",type:'text',required:true},
      {key:'engagements',label:"Engagements spécifiques pris",type:'textarea',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
    ]),
    body: `<div class="doc"><h1>CHARTE DE LA BIOÉNERGIE DURABLE ET INCLUSIVE</h1><p><strong>Signataire :</strong> {{signataire}}</p><p><strong>Rôle dans la filière :</strong> {{role_filiere}}</p><h2>Préambule</h2><p>Engagé dans le développement d'une bioénergie qui respecte les hommes, les territoires et les écosystèmes, le signataire adhère aux principes de la présente charte.</p><h2>Nos engagements</h2><p>{{engagements}}</p><h2>Valeurs communes</h2><p>Durabilité, équité, transparence, participation communautaire et respect des droits fonciers traditionnels guident toutes nos décisions.</p><p>Signé le {{date_signature}}</p></div>`
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
  console.log(`Batch 80b OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
