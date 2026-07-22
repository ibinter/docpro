import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  {
    code: 'enrg_raccordement_reseau',
    name: "Contrat de Raccordement au Réseau Électrique",
    category: 'btp_construction',
    price: 8000, priceMax: 24000,
    description: "Contrat de raccordement d'un abonné au réseau électrique de distribution, conforme aux normes CIE et réglementation ANARE-CI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'nom_abonne',label:"Nom de l'abonné",type:'text',required:true},
      {key:'adresse_raccordement',label:"Adresse du raccordement",type:'text',required:true},
      {key:'puissance_souscrite',label:"Puissance souscrite (kVA)",type:'text',required:true},
      {key:'date_demande',label:"Date de la demande",type:'date',required:true},
      {key:'reference_dossier',label:"Référence du dossier",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RACCORDEMENT AU RÉSEAU ÉLECTRIQUE</h1><p>Entre la Compagnie Ivoirienne d'Électricité (CIE), concessionnaire du réseau de distribution, et :</p><p><strong>Nom de l'abonné :</strong> {{nom_abonne}}</p><p><strong>Adresse du raccordement :</strong> {{adresse_raccordement}}</p><p><strong>Puissance souscrite :</strong> {{puissance_souscrite}} kVA</p><p><strong>Date de la demande :</strong> {{date_demande}}</p><p><strong>Référence dossier :</strong> {{reference_dossier}}</p><h2>Article 1 - Objet</h2><p>Le présent contrat a pour objet de définir les conditions techniques et financières du raccordement au réseau électrique basse tension.</p><h2>Article 2 - Obligations de la CIE</h2><p>La CIE s'engage à réaliser les travaux de raccordement dans un délai de 30 jours ouvrables après paiement des frais de branchement.</p><h2>Article 3 - Obligations de l'abonné</h2><p>L'abonné s'engage à respecter les normes d'installation intérieure et à ne pas dépasser la puissance souscrite.</p><h2>Article 4 - Durée</h2><p>Le présent contrat est conclu pour une durée indéterminée.</p><p>Fait à Abidjan, le {{date_demande}}</p></div>`
  },
  {
    code: 'enrg_concession_distribution',
    name: "Contrat de Concession de Distribution d'Électricité",
    category: 'btp_construction',
    price: 15000, priceMax: 45000,
    description: "Contrat de concession accordé par l'État à un opérateur pour la distribution d'électricité dans une zone définie, selon le cadre légal ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'concessionnaire',label:"Dénomination du concessionnaire",type:'text',required:true},
      {key:'zone_concession',label:"Zone géographique de concession",type:'text',required:true},
      {key:'duree_concession',label:"Durée de la concession (années)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'autorite_concedante',label:"Autorité concédante",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE CONCESSION DE DISTRIBUTION D'ÉLECTRICITÉ</h1><p>Entre l'État de Côte d'Ivoire, représenté par le Ministère des Mines, du Pétrole et de l'Énergie, ci-après l'Autorité Concédante : {{autorite_concedante}}, et :</p><p><strong>Le Concessionnaire :</strong> {{concessionnaire}}</p><p><strong>Zone de concession :</strong> {{zone_concession}}</p><p><strong>Durée :</strong> {{duree_concession}} ans</p><p><strong>Date de signature :</strong> {{date_signature}}</p><h2>Article 1 - Objet de la concession</h2><p>L'État concède au Concessionnaire le droit exclusif de distribuer l'électricité dans la zone définie ci-dessus.</p><h2>Article 2 - Obligations du Concessionnaire</h2><p>Le Concessionnaire s'engage à maintenir et développer le réseau, à assurer la continuité du service et à respecter les tarifs homologués.</p><h2>Article 3 - Contrôle et régulation</h2><p>L'ANARE-CI exercera un contrôle permanent sur les activités du Concessionnaire.</p><p>Fait à Abidjan, le {{date_signature}}</p></div>`
  },
  {
    code: 'enrg_partenariat_cie_sopie',
    name: "Accord de Partenariat CIE/SOPIE",
    category: 'btp_construction',
    price: 12000, priceMax: 36000,
    description: "Accord cadre de partenariat entre la CIE et la SOPIE pour la gestion coordonnée du transport et de la distribution d'énergie électrique en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'objet_partenariat',label:"Objet spécifique du partenariat",type:'textarea',required:true},
      {key:'date_accord',label:"Date de l'accord",type:'date',required:true},
      {key:'duree_accord',label:"Durée de l'accord",type:'text',required:true},
      {key:'representant_cie',label:"Représentant CIE",type:'text',required:true},
      {key:'representant_sopie',label:"Représentant SOPIE",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT CIE / SOPIE</h1><p>Entre la Compagnie Ivoirienne d'Électricité (CIE), représentée par {{representant_cie}}, et la Société de Gestion du Patrimoine du Secteur de l'Électricité (SOPIE), représentée par {{representant_sopie}}.</p><p><strong>Date :</strong> {{date_accord}}</p><p><strong>Durée :</strong> {{duree_accord}}</p><h2>Article 1 - Objet</h2><p>{{objet_partenariat}}</p><h2>Article 2 - Engagements réciproques</h2><p>Les deux parties s'engagent à partager les informations techniques nécessaires à la bonne coordination des infrastructures de transport et de distribution.</p><h2>Article 3 - Comité de pilotage</h2><p>Un comité de pilotage paritaire se réunira trimestriellement pour évaluer la mise en oeuvre du présent accord.</p><p>Fait à Abidjan, le {{date_accord}}</p></div>`
  },
  {
    code: 'enrg_eclairage_public',
    name: "Contrat de Service d'Éclairage Public",
    category: 'btp_construction',
    price: 7000, priceMax: 21000,
    description: "Contrat de prestation de service pour l'installation, la gestion et la maintenance de l'éclairage public entre une commune et un prestataire spécialisé.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'commune',label:"Commune concernée",type:'text',required:true},
      {key:'prestataire',label:"Prestataire de service",type:'text',required:true},
      {key:'nombre_points',label:"Nombre de points lumineux",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'montant_annuel',label:"Montant annuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'ÉCLAIRAGE PUBLIC</h1><p>Entre la Commune de {{commune}}, ci-après le Client, et {{prestataire}}, ci-après le Prestataire.</p><p><strong>Nombre de points lumineux :</strong> {{nombre_points}}</p><p><strong>Date de début :</strong> {{date_debut}}</p><p><strong>Montant annuel :</strong> {{montant_annuel}} FCFA</p><h2>Article 1 - Objet</h2><p>Le Prestataire assure l'installation, l'exploitation et la maintenance de l'ensemble des points d'éclairage public de la Commune de {{commune}}.</p><h2>Article 2 - Niveaux de service</h2><p>Le taux de disponibilité des équipements d'éclairage doit être supérieur à 95% sur l'ensemble du réseau.</p><h2>Article 3 - Paiement</h2><p>Le Client paiera le montant annuel de {{montant_annuel}} FCFA en quatre versements trimestriels égaux.</p><p>Fait à {{commune}}, le {{date_debut}}</p></div>`
  },
  {
    code: 'enrg_maintenance_reseau',
    name: "Contrat de Maintenance du Réseau Électrique",
    category: 'btp_construction',
    price: 9000, priceMax: 27000,
    description: "Contrat de maintenance préventive et corrective d'un réseau électrique de distribution, incluant les obligations de réponse aux incidents.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client',label:"Client / Exploitant du réseau",type:'text',required:true},
      {key:'prestataire_maintenance',label:"Prestataire de maintenance",type:'text',required:true},
      {key:'perimetre_reseau',label:"Périmètre du réseau (km)",type:'text',required:true},
      {key:'date_contrat',label:"Date du contrat",type:'date',required:true},
      {key:'delai_intervention',label:"Délai d'intervention max (heures)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE MAINTENANCE DU RÉSEAU ÉLECTRIQUE</h1><p>Entre {{client}}, et {{prestataire_maintenance}}.</p><p><strong>Périmètre :</strong> {{perimetre_reseau}} km de réseau</p><p><strong>Date :</strong> {{date_contrat}}</p><p><strong>Délai d'intervention :</strong> {{delai_intervention}} heures maximum</p><h2>Article 1 - Prestations de maintenance préventive</h2><p>Le Prestataire effectuera des visites de contrôle mensuelles, des mesures d'isolement trimestrielles et une révision complète annuelle.</p><h2>Article 2 - Maintenance corrective</h2><p>En cas de panne, le Prestataire interviendra dans un délai de {{delai_intervention}} heures à compter de la notification.</p><h2>Article 3 - Rapports</h2><p>Un rapport mensuel de maintenance sera remis au Client dans les 5 jours ouvrables suivant la fin du mois.</p><p>Fait à Abidjan, le {{date_contrat}}</p></div>`
  },
  {
    code: 'enrg_centrale_bot',
    name: "Accord de Construction de Centrale Électrique (BOT)",
    category: 'btp_construction',
    price: 18000, priceMax: 54000,
    description: "Accord de type Build-Operate-Transfer pour la construction et l'exploitation d'une centrale électrique en Côte d'Ivoire, cadre OHADA.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'promoteur',label:"Promoteur / Développeur",type:'text',required:true},
      {key:'autorite',label:"Autorité publique partenaire",type:'text',required:true},
      {key:'capacite_mw',label:"Capacité installée (MW)",type:'text',required:true},
      {key:'duree_exploitation',label:"Durée d'exploitation (années)",type:'text',required:true},
      {key:'date_financial_close',label:"Date de clôture financière",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD BOT - CONSTRUCTION DE CENTRALE ÉLECTRIQUE</h1><p>Accord Build-Operate-Transfer entre {{autorite}} et {{promoteur}}.</p><p><strong>Capacité :</strong> {{capacite_mw}} MW</p><p><strong>Durée d'exploitation :</strong> {{duree_exploitation}} ans avant transfert</p><p><strong>Clôture financière :</strong> {{date_financial_close}}</p><h2>Article 1 - Phase Construction</h2><p>Le Promoteur financera, concevra et construira la centrale à ses propres frais et risques.</p><h2>Article 2 - Phase Exploitation</h2><p>Pendant {{duree_exploitation}} ans, le Promoteur exploitera la centrale et percevra les revenus de vente d'énergie.</p><h2>Article 3 - Transfert</h2><p>À l'échéance, la centrale sera transférée à l'Autorité publique en bon état de fonctionnement, sans contrepartie financière.</p><p>Fait à Abidjan, le {{date_financial_close}}</p></div>`
  },
  {
    code: 'enrg_ipp_production',
    name: "Accord de Production Indépendante d'Électricité (IPP)",
    category: 'btp_construction',
    price: 16000, priceMax: 48000,
    description: "Accord IPP (Independent Power Producer) encadrant la production privée d'électricité et l'injection dans le réseau national ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'producteur',label:"Producteur indépendant (IPP)",type:'text',required:true},
      {key:'acheteur',label:"Acheteur unique (off-taker)",type:'text',required:true},
      {key:'puissance_installee',label:"Puissance installée (MW)",type:'text',required:true},
      {key:'tarif_kwh',label:"Tarif d'achat (FCFA/kWh)",type:'text',required:true},
      {key:'date_mise_service',label:"Date de mise en service prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRODUCTION INDÉPENDANTE D'ÉLECTRICITÉ (IPP)</h1><p>Entre {{acheteur}}, ci-après l'Acheteur, et {{producteur}}, ci-après le Producteur.</p><p><strong>Puissance installée :</strong> {{puissance_installee}} MW</p><p><strong>Tarif d'achat :</strong> {{tarif_kwh}} FCFA/kWh</p><p><strong>Date de mise en service :</strong> {{date_mise_service}}</p><h2>Article 1 - Engagement de production</h2><p>Le Producteur s'engage à injecter l'énergie produite dans le réseau interconnecté au point de livraison convenu.</p><h2>Article 2 - Obligation d'achat</h2><p>L'Acheteur s'engage à acheter toute l'énergie disponible produite par le Producteur au tarif de {{tarif_kwh}} FCFA/kWh.</p><h2>Article 3 - Garanties de performance</h2><p>Le Producteur garantit un facteur de disponibilité annuel minimum de 85%.</p><p>Fait à Abidjan, le {{date_mise_service}}</p></div>`
  },
  {
    code: 'enrg_ppa_achat_energie',
    name: "Contrat d'Achat d'Énergie (PPA)",
    category: 'btp_construction',
    price: 14000, priceMax: 42000,
    description: "Power Purchase Agreement (PPA) entre un producteur d'énergie et un acheteur industriel ou institutionnel en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'vendeur_energie',label:"Vendeur d'énergie",type:'text',required:true},
      {key:'acheteur_energie',label:"Acheteur d'énergie",type:'text',required:true},
      {key:'volume_annuel_mwh',label:"Volume annuel contractuel (MWh)",type:'text',required:true},
      {key:'prix_unitaire',label:"Prix unitaire (FCFA/kWh)",type:'text',required:true},
      {key:'date_debut_ppa',label:"Date de début du PPA",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ACHAT D'ÉNERGIE (PPA)</h1><p>Power Purchase Agreement entre {{vendeur_energie}} et {{acheteur_energie}}.</p><p><strong>Volume annuel :</strong> {{volume_annuel_mwh}} MWh</p><p><strong>Prix unitaire :</strong> {{prix_unitaire}} FCFA/kWh</p><p><strong>Date de début :</strong> {{date_debut_ppa}}</p><h2>Article 1 - Objet</h2><p>Le Vendeur s'engage à fournir et l'Acheteur à acquérir le volume d'énergie convenu aux conditions du présent contrat.</p><h2>Article 2 - Modalités de livraison</h2><p>L'énergie sera livrée au point de connexion convenu, mesurée par des compteurs certifiés.</p><h2>Article 3 - Facturation</h2><p>La facturation interviendra mensuellement sur la base des relevés de comptage certifiés.</p><p>Fait à Abidjan, le {{date_debut_ppa}}</p></div>`
  },
  {
    code: 'enrg_hydroelectrique',
    name: "Accord de Développement de Centrale Hydroélectrique",
    category: 'btp_construction',
    price: 20000, priceMax: 60000,
    description: "Accord de développement d'une centrale hydroélectrique incluant études d'impact, financement et exploitation, cadre juridique OHADA / Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'developpeur',label:"Développeur du projet",type:'text',required:true},
      {key:'cours_eau',label:"Cours d'eau / Site",type:'text',required:true},
      {key:'puissance_mw',label:"Puissance prévue (MW)",type:'text',required:true},
      {key:'investissement_total',label:"Investissement total estimé (FCFA)",type:'text',required:true},
      {key:'date_etude_faisabilite',label:"Date début étude de faisabilité",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉVELOPPEMENT DE CENTRALE HYDROÉLECTRIQUE</h1><p>Accord entre l'État de Côte d'Ivoire et {{developpeur}} pour le développement du site de {{cours_eau}}.</p><p><strong>Puissance prévue :</strong> {{puissance_mw}} MW</p><p><strong>Investissement total :</strong> {{investissement_total}} FCFA</p><p><strong>Début des études :</strong> {{date_etude_faisabilite}}</p><h2>Article 1 - Études préliminaires</h2><p>Le Développeur financera les études hydrologiques, géotechniques et d'impact environnemental et social.</p><h2>Article 2 - Permis et autorisations</h2><p>L'État facilitera l'obtention des permis d'utilisation de l'eau et des droits fonciers nécessaires.</p><h2>Article 3 - Partage des revenus</h2><p>Un accord de partage des revenus sera négocié après validation des études de faisabilité.</p><p>Fait à Abidjan, le {{date_etude_faisabilite}}</p></div>`
  },
  {
    code: 'enrg_comptage_energie',
    name: "Contrat de Service de Comptage d'Énergie",
    category: 'btp_construction',
    price: 5000, priceMax: 15000,
    description: "Contrat de fourniture et de gestion de compteurs d'énergie intelligents pour industriels et institutionnels en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 63,
    fieldsJson: F([
      {key:'client_comptage',label:"Client",type:'text',required:true},
      {key:'fournisseur_comptage',label:"Fournisseur de comptage",type:'text',required:true},
      {key:'nombre_compteurs',label:"Nombre de compteurs",type:'text',required:true},
      {key:'type_compteur',label:"Type de compteur",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE DE COMPTAGE D'ÉNERGIE</h1><p>Entre {{client_comptage}} et {{fournisseur_comptage}}.</p><p><strong>Nombre de compteurs :</strong> {{nombre_compteurs}}</p><p><strong>Type :</strong> {{type_compteur}}</p><p><strong>Date d'installation :</strong> {{date_installation}}</p><h2>Article 1 - Fourniture et installation</h2><p>Le Fournisseur livrera et installera {{nombre_compteurs}} compteurs de type {{type_compteur}} conformément aux spécifications techniques annexées.</p><h2>Article 2 - Métrologie</h2><p>Les compteurs seront vérifiés et certifiés conformes aux normes UEMOA avant installation.</p><h2>Article 3 - Maintenance et télérelève</h2><p>Le Fournisseur assurera la maintenance préventive annuelle et la télérelève mensuelle des données.</p><p>Fait à Abidjan, le {{date_installation}}</p></div>`
  },
  {
    code: 'enrg_smart_grid',
    name: "Accord Réseau Intelligent (Smart Grid)",
    category: 'btp_construction',
    price: 18000, priceMax: 54000,
    description: "Accord de déploiement d'un réseau électrique intelligent (smart grid) intégrant la gestion numérique de l'énergie et la réponse à la demande.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 45,
    fieldsJson: F([
      {key:'operateur_reseau',label:"Opérateur du réseau",type:'text',required:true},
      {key:'fournisseur_technologie',label:"Fournisseur de technologie smart grid",type:'text',required:true},
      {key:'zone_deploiement',label:"Zone de déploiement",type:'text',required:true},
      {key:'budget_projet',label:"Budget du projet (FCFA)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD RÉSEAU INTELLIGENT (SMART GRID)</h1><p>Entre {{operateur_reseau}} et {{fournisseur_technologie}} pour le déploiement d'une infrastructure smart grid dans {{zone_deploiement}}.</p><p><strong>Budget :</strong> {{budget_projet}} FCFA</p><p><strong>Lancement :</strong> {{date_lancement}}</p><h2>Article 1 - Périmètre technologique</h2><p>Le projet inclut la pose de compteurs communicants AMI, la mise en place d'un système SCADA et le déploiement d'une plateforme de gestion de la demande.</p><h2>Article 2 - Cybersécurité</h2><p>Le Fournisseur garantit la conformité aux standards internationaux de cybersécurité IEC 62351.</p><h2>Article 3 - Formation</h2><p>Une formation du personnel de l'Opérateur sera assurée pendant 6 mois après déploiement.</p><p>Fait à Abidjan, le {{date_lancement}}</p></div>`
  },
  {
    code: 'enrg_installation_industrielle',
    name: "Contrat d'Installation Électrique Industrielle",
    category: 'btp_construction',
    price: 10000, priceMax: 30000,
    description: "Contrat de réalisation d'une installation électrique industrielle HTA/BT incluant postes de transformation, tableaux généraux et câblage.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'maitre_ouvrage',label:"Maître d'ouvrage",type:'text',required:true},
      {key:'entreprise_electrique',label:"Entreprise électrique",type:'text',required:true},
      {key:'site_travaux',label:"Site des travaux",type:'text',required:true},
      {key:'montant_travaux',label:"Montant des travaux (FCFA)",type:'text',required:true},
      {key:'delai_execution',label:"Délai d'exécution (jours)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'INSTALLATION ÉLECTRIQUE INDUSTRIELLE</h1><p>Entre {{maitre_ouvrage}} et {{entreprise_electrique}} pour les travaux d'installation électrique sur le site de {{site_travaux}}.</p><p><strong>Montant :</strong> {{montant_travaux}} FCFA</p><p><strong>Délai :</strong> {{delai_execution}} jours</p><h2>Article 1 - Étendue des travaux</h2><p>L'Entreprise réalisera l'ensemble des travaux d'installation électrique HTA et BT conformément aux plans et cahiers des charges techniques approuvés.</p><h2>Article 2 - Normes</h2><p>Les travaux seront réalisés conformément aux normes NF C 15-100, NF C 13-100 et aux règlements de la CIE.</p><h2>Article 3 - Réception des travaux</h2><p>La réception provisoire interviendra après vérification par un organisme de contrôle agréé.</p><p>Fait à {{site_travaux}}</p></div>`
  },
  {
    code: 'enrg_groupe_electrogene_service',
    name: "Accord de Service Groupe Électrogène",
    category: 'btp_construction',
    price: 6000, priceMax: 18000,
    description: "Accord de service complet pour un groupe électrogène incluant maintenance préventive, fourniture de pièces et intervention d'urgence.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 79,
    fieldsJson: F([
      {key:'proprietaire_ge',label:"Propriétaire du groupe électrogène",type:'text',required:true},
      {key:'prestataire_ge',label:"Prestataire de service",type:'text',required:true},
      {key:'marque_puissance',label:"Marque et puissance du GE (kVA)",type:'text',required:true},
      {key:'frequence_maintenance',label:"Fréquence de maintenance",type:'text',required:true},
      {key:'date_debut_service',label:"Date de début de service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE GROUPE ÉLECTROGÈNE</h1><p>Entre {{proprietaire_ge}} et {{prestataire_ge}}.</p><p><strong>Équipement :</strong> {{marque_puissance}}</p><p><strong>Fréquence de maintenance :</strong> {{frequence_maintenance}}</p><p><strong>Début :</strong> {{date_debut_service}}</p><h2>Article 1 - Prestations de maintenance</h2><p>Le Prestataire effectuera les vidanges, le remplacement des filtres, la vérification des batteries et le contrôle général selon la fréquence convenue.</p><h2>Article 2 - Intervention d'urgence</h2><p>En cas de panne, le Prestataire interviendra dans un délai de 4 heures maximum.</p><h2>Article 3 - Fourniture de pièces</h2><p>Les pièces de rechange originales seront fournies par le Prestataire aux tarifs convenus en annexe.</p><p>Fait à Abidjan, le {{date_debut_service}}</p></div>`
  },
  {
    code: 'enrg_location_groupe_electrogene',
    name: "Contrat de Location de Groupe Électrogène",
    category: 'btp_construction',
    price: 5000, priceMax: 15000,
    description: "Contrat de location de groupe électrogène pour chantier ou événement, incluant livraison, carburant et assistance technique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'locataire',label:"Locataire",type:'text',required:true},
      {key:'bailleur_ge',label:"Société de location",type:'text',required:true},
      {key:'puissance_kva',label:"Puissance du groupe (kVA)",type:'text',required:true},
      {key:'duree_location',label:"Durée de location",type:'text',required:true},
      {key:'loyer_journalier',label:"Loyer journalier (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE LOCATION DE GROUPE ÉLECTROGÈNE</h1><p>Entre {{bailleur_ge}}, bailleur, et {{locataire}}, locataire.</p><p><strong>Puissance :</strong> {{puissance_kva}} kVA</p><p><strong>Durée :</strong> {{duree_location}}</p><p><strong>Loyer journalier :</strong> {{loyer_journalier}} FCFA</p><h2>Article 1 - Mise à disposition</h2><p>Le Bailleur livrera le groupe électrogène en bon état de fonctionnement au lieu indiqué par le Locataire.</p><h2>Article 2 - Utilisation</h2><p>Le Locataire s'engage à utiliser l'équipement conformément aux instructions du constructeur et à ne pas le sous-louer.</p><h2>Article 3 - Responsabilités</h2><p>Le Locataire est responsable de tout dommage causé à l'équipement pendant la période de location.</p><p>Fait à Abidjan</p></div>`
  },
  {
    code: 'enrg_ups_onduleur',
    name: "Accord de Service UPS/Onduleur",
    category: 'btp_construction',
    price: 4000, priceMax: 12000,
    description: "Accord de fourniture, installation et maintenance d'onduleurs et systèmes UPS pour la protection des équipements sensibles.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'client_ups',label:"Client",type:'text',required:true},
      {key:'fournisseur_ups',label:"Fournisseur UPS",type:'text',required:true},
      {key:'capacite_ups',label:"Capacité UPS (kVA)",type:'text',required:true},
      {key:'autonomie',label:"Autonomie garantie (minutes)",type:'text',required:true},
      {key:'date_installation_ups',label:"Date d'installation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE UPS / ONDULEUR</h1><p>Entre {{client_ups}} et {{fournisseur_ups}}.</p><p><strong>Capacité :</strong> {{capacite_ups}} kVA</p><p><strong>Autonomie garantie :</strong> {{autonomie}} minutes</p><p><strong>Installation :</strong> {{date_installation_ups}}</p><h2>Article 1 - Fourniture et installation</h2><p>Le Fournisseur livrera et installera l'onduleur conformément aux spécifications techniques et assurera la mise en service.</p><h2>Article 2 - Garantie de performance</h2><p>L'onduleur garantit une autonomie de {{autonomie}} minutes à pleine charge et un rendement minimum de 92%.</p><h2>Article 3 - Maintenance</h2><p>Une visite de maintenance préventive semestrielle incluant le test des batteries sera réalisée par le Fournisseur.</p><p>Fait à Abidjan, le {{date_installation_ups}}</p></div>`
  },
  {
    code: 'enrg_audit_energetique',
    name: "Rapport d'Audit Énergétique",
    category: 'btp_construction',
    price: 12000, priceMax: 36000,
    description: "Rapport d'audit énergétique complet d'un site industriel ou tertiaire, avec identification des gisements d'économie et plan d'action.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'site_audite',label:"Site audité",type:'text',required:true},
      {key:'auditeur',label:"Cabinet / Auditeur",type:'text',required:true},
      {key:'consommation_annuelle',label:"Consommation annuelle (MWh)",type:'text',required:true},
      {key:'facture_annuelle',label:"Facture énergétique annuelle (FCFA)",type:'text',required:true},
      {key:'date_audit',label:"Date de l'audit",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT D'AUDIT ÉNERGÉTIQUE</h1><p><strong>Site :</strong> {{site_audite}}</p><p><strong>Auditeur :</strong> {{auditeur}}</p><p><strong>Date :</strong> {{date_audit}}</p><h2>1. Bilan énergétique</h2><p><strong>Consommation annuelle :</strong> {{consommation_annuelle}} MWh</p><p><strong>Facture annuelle :</strong> {{facture_annuelle}} FCFA</p><h2>2. Identification des gisements</h2><p>L'audit a permis d'identifier des opportunités d'économie d'énergie représentant 15 à 30% de la consommation actuelle.</p><h2>3. Actions prioritaires</h2><p>Les actions à retour sur investissement inférieur à 2 ans seront mises en oeuvre en priorité.</p><h2>4. Plan d'action</h2><p>Un plan d'action détaillé sur 3 ans est présenté en annexe avec les économies attendues et les coûts d'investissement.</p><p>Rapport établi le {{date_audit}} par {{auditeur}}</p></div>`
  },
  {
    code: 'enrg_plan_efficacite',
    name: "Plan d'Efficacité Énergétique",
    category: 'btp_construction',
    price: 10000, priceMax: 30000,
    description: "Plan d'efficacité énergétique pour entreprise, définissant les objectifs de réduction de consommation, les actions et le calendrier de mise en oeuvre.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 59,
    fieldsJson: F([
      {key:'entreprise_plan',label:"Entreprise",type:'text',required:true},
      {key:'objectif_reduction',label:"Objectif de réduction (%)",type:'text',required:true},
      {key:'horizon_plan',label:"Horizon du plan (années)",type:'text',required:true},
      {key:'investissement_prevu',label:"Investissement prévu (FCFA)",type:'text',required:true},
      {key:'date_validation',label:"Date de validation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN D'EFFICACITÉ ÉNERGÉTIQUE</h1><p><strong>Entreprise :</strong> {{entreprise_plan}}</p><p><strong>Objectif de réduction :</strong> {{objectif_reduction}}% sur {{horizon_plan}} ans</p><p><strong>Investissement prévu :</strong> {{investissement_prevu}} FCFA</p><p><strong>Validé le :</strong> {{date_validation}}</p><h2>1. Contexte et diagnostic</h2><p>Ce plan s'inscrit dans la politique de maîtrise de l'énergie de l'entreprise et répond aux exigences réglementaires en vigueur.</p><h2>2. Actions programmées</h2><p>Remplacement des équipements énergivores, isolation thermique des bâtiments, optimisation de la production d'air comprimé et sensibilisation des employés.</p><h2>3. Indicateurs de suivi</h2><p>L'intensité énergétique (kWh/unité produite) sera suivie mensuellement et reportée au comité de direction.</p><p>Validé le {{date_validation}} par la Direction de {{entreprise_plan}}</p></div>`
  },
  {
    code: 'enrg_certificats_economie',
    name: "Accord de Certificats d'Économie d'Énergie",
    category: 'btp_construction',
    price: 8000, priceMax: 24000,
    description: "Accord d'attribution et de valorisation de certificats d'économie d'énergie (CEE) entre un obligé et un délégataire en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 43,
    fieldsJson: F([
      {key:'oblige',label:"Entité obligée",type:'text',required:true},
      {key:'delegataire',label:"Délégataire / Mandataire",type:'text',required:true},
      {key:'volume_cee',label:"Volume de CEE (kWh cumac)",type:'text',required:true},
      {key:'valeur_cee',label:"Valeur des CEE (FCFA)",type:'text',required:true},
      {key:'date_accord_cee',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CERTIFICATS D'ÉCONOMIE D'ÉNERGIE</h1><p>Entre {{oblige}}, ci-après l'Obligé, et {{delegataire}}, ci-après le Délégataire.</p><p><strong>Volume CEE :</strong> {{volume_cee}} kWh cumac</p><p><strong>Valeur :</strong> {{valeur_cee}} FCFA</p><p><strong>Date :</strong> {{date_accord_cee}}</p><h2>Article 1 - Objet</h2><p>L'Obligé délègue au Délégataire la réalisation d'actions d'économies d'énergie permettant la génération de {{volume_cee}} kWh cumac de CEE.</p><h2>Article 2 - Obligations du Délégataire</h2><p>Le Délégataire financera et réalisera les actions d'efficacité énergétique et constituera le dossier de demande de CEE.</p><h2>Article 3 - Partage des CEE</h2><p>Les CEE obtenus seront partagés selon les modalités financières définies en annexe.</p><p>Fait à Abidjan, le {{date_accord_cee}}</p></div>`
  },
  {
    code: 'enrg_cpe_performance',
    name: "Contrat de Performance Énergétique (CPE)",
    category: 'btp_construction',
    price: 13000, priceMax: 39000,
    description: "Contrat de performance énergétique garantissant des économies d'énergie mesurables avec paiement à la performance pour bâtiments et industries.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 53,
    fieldsJson: F([
      {key:'client_cpe',label:"Client / Bénéficiaire",type:'text',required:true},
      {key:'esco',label:"ESCO (Société de services énergétiques)",type:'text',required:true},
      {key:'economies_garanties',label:"Économies garanties (%)",type:'text',required:true},
      {key:'duree_cpe',label:"Durée du CPE (années)",type:'text',required:true},
      {key:'date_signature_cpe',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE PERFORMANCE ÉNERGÉTIQUE (CPE)</h1><p>Entre {{client_cpe}} et {{esco}}, Société de Services Énergétiques (ESCO).</p><p><strong>Économies garanties :</strong> {{economies_garanties}}% de la consommation de référence</p><p><strong>Durée :</strong> {{duree_cpe}} ans</p><p><strong>Signature :</strong> {{date_signature_cpe}}</p><h2>Article 1 - Garantie de performance</h2><p>L'ESCO garantit une réduction de la facture énergétique d'au moins {{economies_garanties}}% par rapport à la consommation de référence établie.</p><h2>Article 2 - Méthode de mesure et vérification</h2><p>Un protocole M&V conforme aux standards IPMVP sera appliqué pour mesurer les économies réalisées.</p><h2>Article 3 - Pénalités</h2><p>En cas de sous-performance, l'ESCO compensera financièrement le déficit d'économies constaté.</p><p>Fait à Abidjan, le {{date_signature_cpe}}</p></div>`
  },
  {
    code: 'enrg_redd_carbone',
    name: "Accord de Financement Carbone (REDD+)",
    category: 'btp_construction',
    price: 16000, priceMax: 48000,
    description: "Accord de financement carbone dans le cadre du mécanisme REDD+ pour la réduction des émissions dues à la déforestation en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 41,
    fieldsJson: F([
      {key:'porteur_projet_redd',label:"Porteur de projet REDD+",type:'text',required:true},
      {key:'acheteur_credits',label:"Acheteur de crédits carbone",type:'text',required:true},
      {key:'superficie_ha',label:"Superficie du projet (ha)",type:'text',required:true},
      {key:'credits_annuels',label:"Crédits carbone annuels (tCO2e)",type:'text',required:true},
      {key:'prix_tonne_co2',label:"Prix par tonne CO2 (USD)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FINANCEMENT CARBONE (REDD+)</h1><p>Entre {{porteur_projet_redd}} et {{acheteur_credits}}.</p><p><strong>Superficie :</strong> {{superficie_ha}} ha</p><p><strong>Crédits carbone annuels :</strong> {{credits_annuels}} tCO2e</p><p><strong>Prix par tonne CO2 :</strong> {{prix_tonne_co2}} USD</p><h2>Article 1 - Cadre REDD+</h2><p>Le projet s'inscrit dans le cadre de la Convention-Cadre des Nations Unies sur les Changements Climatiques et des accords de Paris.</p><h2>Article 2 - Certification</h2><p>Les crédits carbone seront certifiés selon la méthodologie VCS (Verified Carbon Standard) ou Gold Standard.</p><h2>Article 3 - Partage des bénéfices</h2><p>Les communautés locales bénéficieront de 20% minimum des revenus carbone générés.</p></div>`
  },
  {
    code: 'enrg_electrification_rurale',
    name: "Contrat de Service d'Électrification Rurale",
    category: 'btp_construction',
    price: 11000, priceMax: 33000,
    description: "Contrat de déploiement d'un service d'électrification rurale dans le cadre du PRONER (Programme National d'Électrification Rurale) ivoirien.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 57,
    fieldsJson: F([
      {key:'operateur_rural',label:"Opérateur d'électrification rurale",type:'text',required:true},
      {key:'village_cible',label:"Village / Communauté cible",type:'text',required:true},
      {key:'nombre_menages',label:"Nombre de ménages à électrifier",type:'text',required:true},
      {key:'technologie',label:"Technologie retenue (réseau/off-grid)",type:'text',required:true},
      {key:'date_mise_en_service',label:"Date de mise en service prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE D'ÉLECTRIFICATION RURALE</h1><p>Dans le cadre du Programme National d'Électrification Rurale (PRONER), entre le Ministère en charge de l'Énergie et {{operateur_rural}}.</p><p><strong>Village :</strong> {{village_cible}}</p><p><strong>Ménages à électrifier :</strong> {{nombre_menages}}</p><p><strong>Technologie :</strong> {{technologie}}</p><p><strong>Mise en service :</strong> {{date_mise_en_service}}</p><h2>Article 1 - Obligations de service universel</h2><p>L'Opérateur s'engage à électrifier l'ensemble des ménages de {{village_cible}} au tarif social homologué.</p><h2>Article 2 - Subventions</h2><p>L'État accordera une subvention à l'investissement selon les modalités définies en annexe financière.</p><h2>Article 3 - Durée et renouvellement</h2><p>Le contrat est conclu pour une durée de 15 ans, renouvelable par accord des parties.</p><p>Fait à Abidjan, le {{date_mise_en_service}}</p></div>`
  },
  {
    code: 'enrg_plan_securite_ptss',
    name: "Plan de Sécurité Électrique (PTSS)",
    category: 'btp_construction',
    price: 7000, priceMax: 21000,
    description: "Plan de travail en sécurité sur les ouvrages électriques (PTSS) pour interventions sur installations HTA/BT, conforme aux normes IEC.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'entreprise_ptss',label:"Entreprise intervenante",type:'text',required:true},
      {key:'ouvrage_concerne',label:"Ouvrage / Installation concernée",type:'text',required:true},
      {key:'responsable_travaux',label:"Responsable des travaux",type:'text',required:true},
      {key:'date_travaux',label:"Date des travaux",type:'date',required:true},
      {key:'risques_identifies',label:"Risques identifiés",type:'textarea',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE TRAVAIL EN SÉCURITÉ SUR OUVRAGES ÉLECTRIQUES (PTSS)</h1><p><strong>Entreprise :</strong> {{entreprise_ptss}}</p><p><strong>Ouvrage :</strong> {{ouvrage_concerne}}</p><p><strong>Responsable travaux :</strong> {{responsable_travaux}}</p><p><strong>Date :</strong> {{date_travaux}}</p><h2>1. Identification des risques</h2><p>{{risques_identifies}}</p><h2>2. Mesures de prévention</h2><p>Consignation électrique, mise à la terre et en court-circuit, balisage de la zone, port des EPI adaptés (gants isolants, casque, écran facial).</p><h2>3. Procédure de consignation</h2><p>Séparation, condamnation, vérification d'absence de tension, mise à la terre et court-circuit, délimitation de la zone de travail.</p><h2>4. Attestation</h2><p>Les intervenants attestent avoir pris connaissance du présent PTSS et s'engagent à le respecter.</p><p>Responsable travaux : {{responsable_travaux}} - Date : {{date_travaux}}</p></div>`
  },
  {
    code: 'enrg_formation_electriciens',
    name: "Accord de Formation des Électriciens",
    category: 'btp_construction',
    price: 6000, priceMax: 18000,
    description: "Accord de formation professionnelle d'électriciens en Côte d'Ivoire, incluant habilitations électriques et certifications de compétences.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'entreprise_beneficiaire',label:"Entreprise bénéficiaire",type:'text',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'duree_formation',label:"Durée de la formation (jours)",type:'text',required:true},
      {key:'date_debut_formation',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION DES ÉLECTRICIENS</h1><p>Entre {{organisme_formation}} et {{entreprise_beneficiaire}}.</p><p><strong>Nombre de stagiaires :</strong> {{nombre_stagiaires}}</p><p><strong>Durée :</strong> {{duree_formation}} jours</p><p><strong>Début :</strong> {{date_debut_formation}}</p><h2>Article 1 - Programme de formation</h2><p>La formation couvre les habilitations électriques B1/B2/BR/BC/H1/H2, la sécurité électrique, les normes NF C 15-100 et les pratiques d'installation professionnelles.</p><h2>Article 2 - Certification</h2><p>À l'issue de la formation, les stagiaires recevront les habilitations électriques conformes à la réglementation en vigueur.</p><h2>Article 3 - Coût et financement</h2><p>Les frais de formation sont pris en charge selon les modalités convenues entre les parties.</p><p>Fait à Abidjan, le {{date_debut_formation}}</p></div>`
  },
  {
    code: 'enrg_fournisseur_materiel',
    name: "Contrat Fournisseur de Matériel Électrique",
    category: 'btp_construction',
    price: 8000, priceMax: 24000,
    description: "Contrat cadre de fourniture de matériel électrique (câbles, tableaux, transformateurs) entre un fournisseur et un client professionnel en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'fournisseur_materiel',label:"Fournisseur de matériel",type:'text',required:true},
      {key:'client_materiel',label:"Client",type:'text',required:true},
      {key:'categories_produits',label:"Catégories de produits",type:'textarea',required:true},
      {key:'remise_accordee',label:"Remise accordée (%)",type:'text',required:true},
      {key:'date_contrat_cadre',label:"Date du contrat cadre",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT CADRE FOURNISSEUR DE MATÉRIEL ÉLECTRIQUE</h1><p>Entre {{fournisseur_materiel}} et {{client_materiel}}.</p><p><strong>Catégories de produits :</strong> {{categories_produits}}</p><p><strong>Remise accordée :</strong> {{remise_accordee}}%</p><p><strong>Date :</strong> {{date_contrat_cadre}}</p><h2>Article 1 - Objet</h2><p>Le présent contrat cadre définit les conditions générales d'approvisionnement en matériel électrique entre les parties.</p><h2>Article 2 - Qualité et conformité</h2><p>Tout le matériel livré devra être certifié conforme aux normes IEC applicables et aux exigences de la CIE.</p><h2>Article 3 - Délais de livraison</h2><p>Le Fournisseur s'engage à livrer dans un délai de 5 jours ouvrables pour les articles en stock et 30 jours pour les articles sur commande spéciale.</p><p>Fait à Abidjan, le {{date_contrat_cadre}}</p></div>`
  },
  {
    code: 'enrg_charte_gestion_durable',
    name: "Charte de Gestion Durable de l'Énergie",
    category: 'btp_construction',
    price: 5000, priceMax: 15000,
    description: "Charte d'engagement pour une gestion durable de l'énergie, destinée aux entreprises et institutions souhaitant formaliser leur politique énergétique responsable.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 49,
    fieldsJson: F([
      {key:'signataire_charte',label:"Organisation signataire",type:'text',required:true},
      {key:'representant_charte',label:"Représentant légal",type:'text',required:true},
      {key:'objectifs_energie',label:"Objectifs énergétiques",type:'textarea',required:true},
      {key:'date_signature_charte',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE DE GESTION DURABLE DE L'ÉNERGIE</h1><p><strong>Organisation :</strong> {{signataire_charte}}</p><p><strong>Représentant :</strong> {{representant_charte}}</p><p><strong>Date :</strong> {{date_signature_charte}}</p><h2>Préambule</h2><p>Consciente des enjeux climatiques et de la nécessité de préserver les ressources énergétiques pour les générations futures, {{signataire_charte}} s'engage solennellement dans une démarche de gestion durable de l'énergie.</p><h2>Nos engagements</h2><p>{{objectifs_energie}}</p><h2>Principes directeurs</h2><p>1. Réduire notre consommation énergétique de manière continue. 2. Favoriser les énergies renouvelables. 3. Sensibiliser et former notre personnel. 4. Mesurer et publier nos performances énergétiques annuellement.</p><p>Signé à Abidjan, le {{date_signature_charte}}</p><p>{{representant_charte}}, au nom de {{signataire_charte}}</p></div>`
  },
  {
    code: 'sol_installation_panneaux',
    name: "Contrat d'Installation de Panneaux Solaires Photovoltaïques",
    category: 'btp_construction',
    price: 9000, priceMax: 27000,
    description: "Contrat de fourniture et d'installation d'une installation solaire photovoltaïque résidentielle ou commerciale en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 88,
    fieldsJson: F([
      {key:'client_solaire',label:"Client",type:'text',required:true},
      {key:'installateur',label:"Installateur certifié",type:'text',required:true},
      {key:'puissance_crete',label:"Puissance crête (Wc)",type:'text',required:true},
      {key:'cout_installation',label:"Coût total (FCFA)",type:'text',required:true},
      {key:'date_installation_solaire',label:"Date d'installation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'INSTALLATION DE PANNEAUX SOLAIRES PHOTOVOLTAÏQUES</h1><p>Entre {{installateur}} et {{client_solaire}}.</p><p><strong>Puissance crête :</strong> {{puissance_crete}} Wc</p><p><strong>Coût total :</strong> {{cout_installation}} FCFA</p><p><strong>Date d'installation :</strong> {{date_installation_solaire}}</p><h2>Article 1 - Fourniture et installation</h2><p>L'Installateur fournira et posera les panneaux solaires, l'onduleur, le câblage et les équipements de protection conformément aux normes IEC 61215 et IEC 62109.</p><h2>Article 2 - Production garantie</h2><p>La production annuelle garantie est calculée sur la base de l'irradiation solaire locale et sera indiquée dans l'étude de dimensionnement annexée.</p><h2>Article 3 - Garanties</h2><p>Les panneaux bénéficient d'une garantie de 25 ans sur la puissance et l'Installateur offre une garantie de 2 ans sur l'installation.</p><p>Fait à Abidjan, le {{date_installation_solaire}}</p></div>`
  },
  {
    code: 'sol_maintenance_solaire',
    name: "Accord de Maintenance d'Installation Solaire",
    category: 'btp_construction',
    price: 5000, priceMax: 15000,
    description: "Accord de maintenance préventive et corrective pour installation photovoltaïque avec suivi de performance et nettoyage des panneaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'proprietaire_installation',label:"Propriétaire de l'installation",type:'text',required:true},
      {key:'mainteneur_solaire',label:"Mainteneur certifié",type:'text',required:true},
      {key:'capacite_installee_kwc',label:"Capacité installée (kWc)",type:'text',required:true},
      {key:'frequence_nettoyage',label:"Fréquence de nettoyage",type:'text',required:true},
      {key:'date_debut_maintenance',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE MAINTENANCE D'INSTALLATION SOLAIRE</h1><p>Entre {{proprietaire_installation}} et {{mainteneur_solaire}}.</p><p><strong>Capacité :</strong> {{capacite_installee_kwc}} kWc</p><p><strong>Nettoyage :</strong> {{frequence_nettoyage}}</p><p><strong>Début :</strong> {{date_debut_maintenance}}</p><h2>Article 1 - Prestations de maintenance préventive</h2><p>Le Mainteneur effectuera le nettoyage des panneaux, le contrôle des connexions, la vérification des onduleurs et le rapport de performance selon la fréquence convenue.</p><h2>Article 2 - Monitoring</h2><p>Un système de monitoring à distance permettra la surveillance en temps réel de la production et l'alerte en cas d'anomalie.</p><h2>Article 3 - Interventions correctives</h2><p>En cas de panne, le Mainteneur interviendra dans un délai de 48 heures.</p><p>Fait à Abidjan, le {{date_debut_maintenance}}</p></div>`
  },
  {
    code: 'sol_pay_as_you_go',
    name: "Contrat de Location-Vente Pay-As-You-Go Solaire",
    category: 'btp_construction',
    price: 4000, priceMax: 12000,
    description: "Contrat PAYG (Pay-As-You-Go) pour l'accès à l'énergie solaire par paiements mobiles progressifs destiné aux ménages ruraux africains.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'client_payg',label:"Client bénéficiaire",type:'text',required:true},
      {key:'operateur_payg',label:"Opérateur PAYG",type:'text',required:true},
      {key:'kit_solaire',label:"Kit solaire (description)",type:'text',required:true},
      {key:'acompte_initial',label:"Acompte initial (FCFA)",type:'text',required:true},
      {key:'versement_mensuel',label:"Versement mensuel (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT PAY-AS-YOU-GO SOLAIRE</h1><p>Entre {{operateur_payg}} et {{client_payg}}.</p><p><strong>Kit solaire :</strong> {{kit_solaire}}</p><p><strong>Acompte initial :</strong> {{acompte_initial}} FCFA</p><p><strong>Versement mensuel :</strong> {{versement_mensuel}} FCFA par mobile money</p><h2>Article 1 - Fonctionnement PAYG</h2><p>Le kit solaire sera activé à réception de chaque paiement via mobile money. En cas de défaut de paiement, le système sera temporairement désactivé à distance.</p><h2>Article 2 - Transfert de propriété</h2><p>Après paiement intégral de toutes les mensualités, le kit solaire devient propriété définitive du Client sans frais supplémentaires.</p><h2>Article 3 - Garantie</h2><p>L'Opérateur garantit le matériel pendant 2 ans et assurera le remplacement gratuit en cas de défaut technique.</p></div>`
  },
  {
    code: 'sol_mini_grid',
    name: "Accord Micro-Réseau Solaire (Mini-Grid)",
    category: 'btp_construction',
    price: 14000, priceMax: 42000,
    description: "Accord de développement et d'exploitation d'un mini-réseau solaire hybride pour l'électrification de communautés rurales hors-réseau.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'developpeur_minigrid',label:"Développeur du mini-réseau",type:'text',required:true},
      {key:'communaute',label:"Communauté bénéficiaire",type:'text',required:true},
      {key:'capacite_solaire_kw',label:"Capacité solaire (kW)",type:'text',required:true},
      {key:'stockage_kwh',label:"Capacité de stockage (kWh)",type:'text',required:true},
      {key:'date_debut_exploitation',label:"Date de début d'exploitation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD MICRO-RÉSEAU SOLAIRE (MINI-GRID)</h1><p>Entre {{developpeur_minigrid}} et la communauté de {{communaute}}.</p><p><strong>Capacité solaire :</strong> {{capacite_solaire_kw}} kW</p><p><strong>Stockage :</strong> {{stockage_kwh}} kWh</p><p><strong>Exploitation :</strong> {{date_debut_exploitation}}</p><h2>Article 1 - Infrastructure</h2><p>Le Développeur financera, installera et exploitera le mini-réseau solaire hybride incluant les panneaux photovoltaïques, les batteries, l'onduleur et le réseau de distribution.</p><h2>Article 2 - Tarification</h2><p>Les tarifs d'électricité seront fixés à un niveau abordable pour les ménages ruraux et validés par le régulateur.</p><h2>Article 3 - Gouvernance communautaire</h2><p>Un comité communautaire participera à la gouvernance du mini-réseau et au recouvrement des paiements.</p><p>Fait à {{communaute}}, le {{date_debut_exploitation}}</p></div>`
  },
  {
    code: 'sol_eclairage_public_solaire',
    name: "Contrat d'Éclairage Solaire Public",
    category: 'btp_construction',
    price: 7000, priceMax: 21000,
    description: "Contrat de déploiement de lampadaires solaires autonomes pour l'éclairage public de voies, marchés et espaces communs en Afrique francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'collectivite',label:"Collectivité territoriale",type:'text',required:true},
      {key:'fournisseur_eclairage_sol',label:"Fournisseur de lampadaires solaires",type:'text',required:true},
      {key:'nombre_lampadaires',label:"Nombre de lampadaires",type:'text',required:true},
      {key:'zones_installation',label:"Zones d'installation",type:'textarea',required:true},
      {key:'date_livraison',label:"Date de livraison et installation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ÉCLAIRAGE SOLAIRE PUBLIC</h1><p>Entre {{collectivite}} et {{fournisseur_eclairage_sol}}.</p><p><strong>Nombre de lampadaires :</strong> {{nombre_lampadaires}}</p><p><strong>Zones :</strong> {{zones_installation}}</p><p><strong>Livraison :</strong> {{date_livraison}}</p><h2>Article 1 - Spécifications techniques</h2><p>Les lampadaires solaires autonomes incluront panneau solaire, batterie lithium, LED haute efficacité et contrôleur intelligent avec détection de présence.</p><h2>Article 2 - Garanties</h2><p>Le Fournisseur garantit un minimum de 5 heures d'éclairage par nuit et une autonomie de 3 jours sans ensoleillement.</p><h2>Article 3 - Maintenance post-installation</h2><p>Une maintenance annuelle pendant 3 ans est incluse dans le prix de fourniture.</p><p>Fait à {{collectivite}}, le {{date_livraison}}</p></div>`
  },
  {
    code: 'sol_pompage_solaire_agricole',
    name: "Accord de Pompage Solaire Agricole",
    category: 'btp_construction',
    price: 8000, priceMax: 24000,
    description: "Accord pour l'installation et l'exploitation d'un système de pompage solaire destiné à l'irrigation agricole en zones rurales d'Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'agriculteur_beneficiaire',label:"Agriculteur / Coopérative bénéficiaire",type:'text',required:true},
      {key:'fournisseur_pompage',label:"Fournisseur du système",type:'text',required:true},
      {key:'debit_pompe',label:"Débit de la pompe (m3/heure)",type:'text',required:true},
      {key:'superficie_irriguee',label:"Superficie irriguée (ha)",type:'text',required:true},
      {key:'date_mise_en_service_pompe',label:"Date de mise en service",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE POMPAGE SOLAIRE AGRICOLE</h1><p>Entre {{fournisseur_pompage}} et {{agriculteur_beneficiaire}}.</p><p><strong>Débit :</strong> {{debit_pompe}} m3/heure</p><p><strong>Superficie irriguée :</strong> {{superficie_irriguee}} ha</p><p><strong>Mise en service :</strong> {{date_mise_en_service_pompe}}</p><h2>Article 1 - Système de pompage solaire</h2><p>Le Fournisseur installera une pompe solaire immergée alimentée par des panneaux photovoltaïques, adaptée aux besoins en eau d'irrigation de {{superficie_irriguee}} ha.</p><h2>Article 2 - Formation</h2><p>Une formation pratique d'utilisation et de maintenance de base sera dispensée à l'agriculteur lors de la mise en service.</p><h2>Article 3 - Garantie</h2><p>Le système bénéficie d'une garantie de 3 ans sur la pompe et de 10 ans sur les panneaux.</p><p>Fait le {{date_mise_en_service_pompe}}</p></div>`
  },
  {
    code: 'sol_refrigerateur_medical',
    name: "Contrat de Réfrigérateur Solaire Médical",
    category: 'btp_construction',
    price: 9000, priceMax: 27000,
    description: "Contrat de fourniture de réfrigérateurs solaires pour la conservation des vaccins et médicaments dans les centres de santé ruraux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 69,
    fieldsJson: F([
      {key:'etablissement_sante',label:"Établissement de santé",type:'text',required:true},
      {key:'fournisseur_refrig',label:"Fournisseur",type:'text',required:true},
      {key:'modele_refrigerateur',label:"Modèle de réfrigérateur",type:'text',required:true},
      {key:'volume_utile',label:"Volume utile (litres)",type:'text',required:true},
      {key:'date_livraison_refrig',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE RÉFRIGÉRATEUR SOLAIRE MÉDICAL</h1><p>Entre {{fournisseur_refrig}} et {{etablissement_sante}}.</p><p><strong>Modèle :</strong> {{modele_refrigerateur}}</p><p><strong>Volume utile :</strong> {{volume_utile}} litres</p><p><strong>Livraison :</strong> {{date_livraison_refrig}}</p><h2>Article 1 - Spécifications techniques</h2><p>Le réfrigérateur solaire médical est conforme aux préqualifications OMS/UNICEF pour la conservation des vaccins entre +2°C et +8°C.</p><h2>Article 2 - Autonomie</h2><p>L'équipement garantit une autonomie de 72 heures sans ensoleillement pour maintenir la chaîne du froid.</p><h2>Article 3 - Formation et maintenance</h2><p>Le Fournisseur assure la formation du personnel soignant et une maintenance annuelle pendant 3 ans.</p><p>Fait à {{etablissement_sante}}, le {{date_livraison_refrig}}</p></div>`
  },
  {
    code: 'sol_shs_service',
    name: "Accord de Service Énergie Solaire SHS",
    category: 'btp_construction',
    price: 4000, priceMax: 12000,
    description: "Accord de service pour systèmes solaires domestiques (Solar Home Systems) destinés aux ménages ruraux non connectés au réseau.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 83,
    fieldsJson: F([
      {key:'menage_beneficiaire',label:"Ménage bénéficiaire",type:'text',required:true},
      {key:'operateur_shs',label:"Opérateur SHS",type:'text',required:true},
      {key:'puissance_shs',label:"Puissance du système (W)",type:'text',required:true},
      {key:'services_inclus',label:"Services inclus (lumière, chargeur, TV...)",type:'textarea',required:true},
      {key:'date_installation_shs',label:"Date d'installation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE ÉNERGIE SOLAIRE DOMESTIQUE (SHS)</h1><p>Entre {{operateur_shs}} et {{menage_beneficiaire}}.</p><p><strong>Puissance :</strong> {{puissance_shs}} W</p><p><strong>Services inclus :</strong> {{services_inclus}}</p><p><strong>Installation :</strong> {{date_installation_shs}}</p><h2>Article 1 - Service d'énergie</h2><p>L'Opérateur fournit un accès fiable à l'électricité solaire permettant l'éclairage, la recharge des téléphones et l'alimentation des équipements listés ci-dessus.</p><h2>Article 2 - Paiement</h2><p>Le paiement s'effectue par mobile money selon les modalités convenues, avec une période de grâce en cas de difficulté temporaire.</p><h2>Article 3 - Service client</h2><p>L'Opérateur met à disposition un service client accessible par téléphone pour toute assistance technique.</p><p>Fait le {{date_installation_shs}}</p></div>`
  },
  {
    code: 'sol_batteries_stockage',
    name: "Contrat de Fourniture de Batteries de Stockage",
    category: 'btp_construction',
    price: 10000, priceMax: 30000,
    description: "Contrat de fourniture de systèmes de batteries de stockage lithium-ion ou plomb-acide pour installations solaires et mini-réseaux en Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'acheteur_batteries',label:"Acheteur",type:'text',required:true},
      {key:'fournisseur_batteries',label:"Fournisseur de batteries",type:'text',required:true},
      {key:'technologie_batterie',label:"Technologie (Li-ion / Plomb-acide / LiFePO4)",type:'text',required:true},
      {key:'capacite_totale_kwh',label:"Capacité totale (kWh)",type:'text',required:true},
      {key:'date_livraison_batteries',label:"Date de livraison",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FOURNITURE DE BATTERIES DE STOCKAGE</h1><p>Entre {{fournisseur_batteries}} et {{acheteur_batteries}}.</p><p><strong>Technologie :</strong> {{technologie_batterie}}</p><p><strong>Capacité totale :</strong> {{capacite_totale_kwh}} kWh</p><p><strong>Livraison :</strong> {{date_livraison_batteries}}</p><h2>Article 1 - Spécifications</h2><p>Les batteries répondront aux spécifications techniques détaillées en annexe, notamment la profondeur de décharge maximale, le nombre de cycles garanti et la température de fonctionnement.</p><h2>Article 2 - Garantie de performance</h2><p>Le Fournisseur garantit 80% de la capacité nominale après le nombre de cycles garanti.</p><h2>Article 3 - Logistique</h2><p>La livraison inclut le transport, la manutention et l'assistance à la mise en service.</p><p>Fait à Abidjan, le {{date_livraison_batteries}}</p></div>`
  },
  {
    code: 'sol_recyclage_panneaux',
    name: "Accord de Recyclage de Panneaux Solaires",
    category: 'btp_construction',
    price: 6000, priceMax: 18000,
    description: "Accord de collecte, démontage et recyclage responsable des panneaux solaires en fin de vie, dans une logique d'économie circulaire en Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 44,
    fieldsJson: F([
      {key:'detenteur_panneaux',label:"Détenteur des panneaux en fin de vie",type:'text',required:true},
      {key:'recycleur',label:"Entreprise de recyclage",type:'text',required:true},
      {key:'quantite_panneaux',label:"Quantité de panneaux (unités)",type:'text',required:true},
      {key:'cout_recyclage',label:"Coût de recyclage (FCFA/panneau)",type:'text',required:true},
      {key:'date_collecte',label:"Date de collecte",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE RECYCLAGE DE PANNEAUX SOLAIRES</h1><p>Entre {{detenteur_panneaux}} et {{recycleur}}.</p><p><strong>Quantité :</strong> {{quantite_panneaux}} panneaux</p><p><strong>Coût unitaire :</strong> {{cout_recyclage}} FCFA/panneau</p><p><strong>Collecte :</strong> {{date_collecte}}</p><h2>Article 1 - Collecte et transport</h2><p>Le Recycleur organisera la collecte des panneaux en fin de vie au site du Détenteur et en assurera le transport jusqu'au centre de traitement.</p><h2>Article 2 - Traitement responsable</h2><p>Les panneaux seront démontés et les matériaux (verre, aluminium, silicium, métaux précieux) seront récupérés et valorisés conformément aux normes environnementales.</p><h2>Article 3 - Traçabilité</h2><p>Un certificat de recyclage sera délivré au Détenteur à l'issue du traitement.</p><p>Fait à Abidjan, le {{date_collecte}}</p></div>`
  },
  {
    code: 'sol_formation_techniciens',
    name: "Contrat de Formation de Techniciens Solaires",
    category: 'btp_construction',
    price: 7000, priceMax: 21000,
    description: "Contrat de formation pratique de techniciens en énergie solaire photovoltaïque, avec certification et accréditation professionnelle.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 71,
    fieldsJson: F([
      {key:'centre_formation_sol',label:"Centre de formation",type:'text',required:true},
      {key:'entreprise_beneficiaire_sol',label:"Entreprise bénéficiaire",type:'text',required:true},
      {key:'nombre_techniciens',label:"Nombre de techniciens à former",type:'text',required:true},
      {key:'niveau_certification',label:"Niveau de certification visé",type:'text',required:true},
      {key:'date_debut_formation_sol',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE FORMATION DE TECHNICIENS SOLAIRES</h1><p>Entre {{centre_formation_sol}} et {{entreprise_beneficiaire_sol}}.</p><p><strong>Techniciens à former :</strong> {{nombre_techniciens}}</p><p><strong>Certification visée :</strong> {{niveau_certification}}</p><p><strong>Début :</strong> {{date_debut_formation_sol}}</p><h2>Article 1 - Programme pédagogique</h2><p>La formation couvre la conception de systèmes PV, l'installation et le câblage, la maintenance, la sécurité électrique et le dimensionnement de batteries.</p><h2>Article 2 - Pratique terrain</h2><p>Au moins 40% du temps de formation sera consacré à des travaux pratiques sur installations réelles.</p><h2>Article 3 - Certification</h2><p>Les techniciens ayant réussi les évaluations recevront un certificat reconnu par les acteurs du secteur énergétique de la CEDEAO.</p><p>Fait à Abidjan, le {{date_debut_formation_sol}}</p></div>`
  },
  {
    code: 'sol_partenariat_ong',
    name: "Accord de Partenariat ONG-Solaire",
    category: 'btp_construction',
    price: 5000, priceMax: 15000,
    description: "Accord de partenariat entre une ONG humanitaire et un opérateur d'énergie solaire pour l'accès à l'énergie dans les zones défavorisées.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'ong_partenaire',label:"ONG partenaire",type:'text',required:true},
      {key:'operateur_solaire',label:"Opérateur solaire",type:'text',required:true},
      {key:'zone_intervention',label:"Zone d'intervention",type:'text',required:true},
      {key:'budget_partenariat',label:"Budget du partenariat (FCFA)",type:'text',required:true},
      {key:'date_accord_ong',label:"Date de l'accord",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT ONG-SOLAIRE</h1><p>Entre {{ong_partenaire}} et {{operateur_solaire}} pour l'électrification de {{zone_intervention}}.</p><p><strong>Budget :</strong> {{budget_partenariat}} FCFA</p><p><strong>Date :</strong> {{date_accord_ong}}</p><h2>Article 1 - Objectifs communs</h2><p>Les parties s'associent pour améliorer l'accès à l'énergie des populations vulnérables de {{zone_intervention}} à travers des solutions solaires adaptées et abordables.</p><h2>Article 2 - Rôles et responsabilités</h2><p>L'ONG mobilise les fonds, assure le lien communautaire et le suivi social. L'Opérateur fournit les équipements, l'installation et la maintenance technique.</p><h2>Article 3 - Rapportage</h2><p>Un rapport semestriel conjoint sera produit pour les bailleurs de fonds.</p><p>Fait à Abidjan, le {{date_accord_ong}}</p></div>`
  },
  {
    code: 'sol_developpement_parc',
    name: "Contrat de Développement de Parc Solaire",
    category: 'btp_construction',
    price: 20000, priceMax: 60000,
    description: "Contrat de développement d'un parc solaire photovoltaïque de grande capacité, couvrant les études, le financement et la construction en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 54,
    fieldsJson: F([
      {key:'developpeur_parc',label:"Développeur du parc solaire",type:'text',required:true},
      {key:'autorite_publique_sol',label:"Autorité publique partenaire",type:'text',required:true},
      {key:'puissance_mwc',label:"Puissance du parc (MWc)",type:'text',required:true},
      {key:'superficie_parc',label:"Superficie du site (ha)",type:'text',required:true},
      {key:'date_demarrage',label:"Date de démarrage des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE DÉVELOPPEMENT DE PARC SOLAIRE</h1><p>Entre {{autorite_publique_sol}} et {{developpeur_parc}}.</p><p><strong>Puissance :</strong> {{puissance_mwc}} MWc</p><p><strong>Superficie :</strong> {{superficie_parc}} ha</p><p><strong>Démarrage :</strong> {{date_demarrage}}</p><h2>Article 1 - Développement du projet</h2><p>Le Développeur réalisera l'ensemble des études (géotechniques, ombrage, raccordement, EIES) et obtiendra toutes les autorisations nécessaires.</p><h2>Article 2 - Financement</h2><p>Le Développeur mobilisera le financement nécessaire, incluant fonds propres et dette bancaire, selon un plan financier validé.</p><h2>Article 3 - Raccordement au réseau</h2><p>L'Autorité publique facilitera l'obtention des autorisations de raccordement au réseau de transport.</p><p>Fait à Abidjan, le {{date_demarrage}}</p></div>`
  },
  {
    code: 'sol_ppe_solaire',
    name: "Accord PPE Solaire",
    category: 'btp_construction',
    price: 11000, priceMax: 33000,
    description: "Accord de partage de l'énergie solaire entre producteurs et consommateurs d'un même quartier ou complexe immobilier.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 47,
    fieldsJson: F([
      {key:'gestionnaire_ppe',label:"Gestionnaire du système PPE",type:'text',required:true},
      {key:'participants',label:"Liste des participants",type:'textarea',required:true},
      {key:'capacite_commune',label:"Capacité solaire commune (kWc)",type:'text',required:true},
      {key:'cle_repartition',label:"Clé de répartition de l'énergie",type:'text',required:true},
      {key:'date_demarrage_ppe',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD PPE SOLAIRE</h1><p>Accord de partage de l'énergie solaire géré par {{gestionnaire_ppe}}.</p><p><strong>Capacité commune :</strong> {{capacite_commune}} kWc</p><p><strong>Clé de répartition :</strong> {{cle_repartition}}</p><p><strong>Démarrage :</strong> {{date_demarrage_ppe}}</p><h2>Participants</h2><p>{{participants}}</p><h2>Article 1 - Mécanisme de partage</h2><p>L'énergie solaire produite sera répartie entre les participants selon la clé de répartition définie, mesurée par des compteurs communicants.</p><h2>Article 2 - Surplus et déficit</h2><p>Les surplus d'énergie non consommés seront injectés dans le réseau ou stockés. Les déficits seront compensés par l'énergie du réseau au tarif CIE.</p><h2>Article 3 - Facturation</h2><p>Le Gestionnaire établira une facture mensuelle pour chaque participant.</p><p>Fait à Abidjan, le {{date_demarrage_ppe}}</p></div>`
  },
  {
    code: 'sol_biogaz_bioenergie',
    name: "Contrat de Service Bioénergie (Biogaz)",
    category: 'btp_construction',
    price: 9000, priceMax: 27000,
    description: "Contrat de développement et d'exploitation d'une unité de production de biogaz à partir de déchets agricoles ou ménagers en milieu rural africain.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 55,
    fieldsJson: F([
      {key:'client_biogaz',label:"Client / Communauté",type:'text',required:true},
      {key:'prestataire_biogaz',label:"Prestataire biogaz",type:'text',required:true},
      {key:'capacite_digesteur',label:"Capacité du digesteur (m3)",type:'text',required:true},
      {key:'intrants_biogaz',label:"Type d'intrants (déchets ménagers / agricoles)",type:'text',required:true},
      {key:'date_construction_biogaz',label:"Date de construction",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE BIOÉNERGIE (BIOGAZ)</h1><p>Entre {{prestataire_biogaz}} et {{client_biogaz}}.</p><p><strong>Capacité digesteur :</strong> {{capacite_digesteur}} m3</p><p><strong>Intrants :</strong> {{intrants_biogaz}}</p><p><strong>Construction :</strong> {{date_construction_biogaz}}</p><h2>Article 1 - Construction du digesteur</h2><p>Le Prestataire construira un digesteur anaérobie adapté aux intrants locaux disponibles, avec les équipements de collecte du biogaz et d'utilisation (cuisinière, lampe ou générateur).</p><h2>Article 2 - Formation</h2><p>Le Prestataire formera les utilisateurs à l'alimentation quotidienne du digesteur et à l'utilisation sécurisée du biogaz.</p><h2>Article 3 - Valorisation du digestat</h2><p>Le digestat produit sera utilisé comme engrais organique, constituant un bénéfice supplémentaire pour l'agriculture locale.</p><p>Fait le {{date_construction_biogaz}}</p></div>`
  },
  {
    code: 'sol_biomasse',
    name: "Accord de Production de Biomasse",
    category: 'btp_construction',
    price: 10000, priceMax: 30000,
    description: "Accord de production et de valorisation énergétique de la biomasse (bois, résidus agricoles, déchets organiques) pour la production d'énergie thermique ou électrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 48,
    fieldsJson: F([
      {key:'producteur_biomasse',label:"Producteur de biomasse",type:'text',required:true},
      {key:'acheteur_biomasse',label:"Acheteur / Valorisateur",type:'text',required:true},
      {key:'type_biomasse',label:"Type de biomasse",type:'text',required:true},
      {key:'volume_annuel_biomasse',label:"Volume annuel (tonnes/an)",type:'text',required:true},
      {key:'prix_tonne_biomasse',label:"Prix par tonne (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PRODUCTION DE BIOMASSE ÉNERGÉTIQUE</h1><p>Entre {{producteur_biomasse}} et {{acheteur_biomasse}}.</p><p><strong>Type de biomasse :</strong> {{type_biomasse}}</p><p><strong>Volume annuel :</strong> {{volume_annuel_biomasse}} tonnes/an</p><p><strong>Prix :</strong> {{prix_tonne_biomasse}} FCFA/tonne</p><h2>Article 1 - Approvisionnement durable</h2><p>Le Producteur garantit un approvisionnement durable en biomasse, sans déforestation, issu de plantations gérées de manière responsable ou de résidus agricoles.</p><h2>Article 2 - Spécifications qualité</h2><p>La biomasse devra présenter un taux d'humidité inférieur à 25% et un pouvoir calorifique minimum garanti.</p><h2>Article 3 - Livraison</h2><p>La livraison s'effectuera selon un calendrier mensuel convenu entre les parties.</p></div>`
  },
  {
    code: 'sol_installation_eolienne',
    name: "Contrat d'Installation d'Éolienne",
    category: 'btp_construction',
    price: 12000, priceMax: 36000,
    description: "Contrat de fourniture et d'installation d'éoliennes pour la production d'électricité en zone côtière ou sahélienne d'Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 42,
    fieldsJson: F([
      {key:'client_eolien',label:"Client / Maître d'ouvrage",type:'text',required:true},
      {key:'fournisseur_eolien',label:"Fournisseur d'éoliennes",type:'text',required:true},
      {key:'nombre_eoliennes',label:"Nombre d'éoliennes",type:'text',required:true},
      {key:'puissance_unitaire',label:"Puissance unitaire (kW)",type:'text',required:true},
      {key:'site_eolien',label:"Site d'installation",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'INSTALLATION D'ÉOLIENNES</h1><p>Entre {{fournisseur_eolien}} et {{client_eolien}}.</p><p><strong>Nombre d'éoliennes :</strong> {{nombre_eoliennes}}</p><p><strong>Puissance unitaire :</strong> {{puissance_unitaire}} kW</p><p><strong>Site :</strong> {{site_eolien}}</p><h2>Article 1 - Étude de vent préalable</h2><p>Le Fournisseur réalisera une étude de vent sur 12 mois pour valider le potentiel éolien du site avant installation.</p><h2>Article 2 - Fourniture et montage</h2><p>Le Fournisseur livrera les éoliennes, mâts, fondations et systèmes de contrôle, et assurera le montage et la mise en service.</p><h2>Article 3 - Garanties</h2><p>Les éoliennes bénéficient d'une garantie de 5 ans sur les pièces et la main-d'oeuvre.</p></div>`
  },
  {
    code: 'sol_hydroelectricite_offgrid',
    name: "Accord de Service Hydroélectricité Off-Grid",
    category: 'btp_construction',
    price: 13000, priceMax: 39000,
    description: "Accord pour le développement de micro-centrales hydroélectriques off-grid dans les zones à fort potentiel en eau, pour l'électrification rurale.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 46,
    fieldsJson: F([
      {key:'porteur_projet_hydro',label:"Porteur de projet",type:'text',required:true},
      {key:'site_hydraulique',label:"Site hydraulique",type:'text',required:true},
      {key:'puissance_hydro_kw',label:"Puissance installée (kW)",type:'text',required:true},
      {key:'population_desservie',label:"Population desservie",type:'text',required:true},
      {key:'date_debut_hydro',label:"Date de début des travaux",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE HYDROÉLECTRICITÉ OFF-GRID</h1><p>Accord pour la micro-centrale de {{site_hydraulique}}, développé par {{porteur_projet_hydro}}.</p><p><strong>Puissance :</strong> {{puissance_hydro_kw}} kW</p><p><strong>Population desservie :</strong> {{population_desservie}}</p><p><strong>Début des travaux :</strong> {{date_debut_hydro}}</p><h2>Article 1 - Études hydrologiques</h2><p>Une étude hydrologique complète sur au moins 2 ans de données sera réalisée pour confirmer le débit minimum garanti.</p><h2>Article 2 - Infrastructure civile</h2><p>La construction inclura la prise d'eau, le canal d'amenée, la chambre de mise en charge, la conduite forcée et le bâtiment des machines.</p><h2>Article 3 - Impact environnemental</h2><p>Un débit réservé sera maintenu pour préserver l'écosystème aquatique en aval.</p><p>Fait le {{date_debut_hydro}}</p></div>`
  },
  {
    code: 'sol_geothermique',
    name: "Contrat de Service Énergie Géothermique",
    category: 'btp_construction',
    price: 15000, priceMax: 45000,
    description: "Contrat de prospection et d'exploitation de ressources géothermiques pour la production d'énergie thermique ou électrique en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 38,
    fieldsJson: F([
      {key:'explorateur_geo',label:"Société d'exploration",type:'text',required:true},
      {key:'zone_prospection',label:"Zone de prospection",type:'text',required:true},
      {key:'superficie_concession_geo',label:"Superficie de la concession (km2)",type:'text',required:true},
      {key:'budget_exploration',label:"Budget d'exploration (FCFA)",type:'text',required:true},
      {key:'date_debut_exploration',label:"Date de début d'exploration",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT DE SERVICE ÉNERGIE GÉOTHERMIQUE</h1><p>Accord entre l'État et {{explorateur_geo}} pour la prospection géothermique de {{zone_prospection}}.</p><p><strong>Superficie :</strong> {{superficie_concession_geo}} km2</p><p><strong>Budget :</strong> {{budget_exploration}} FCFA</p><p><strong>Début :</strong> {{date_debut_exploration}}</p><h2>Article 1 - Phase de prospection</h2><p>L'Explorateur réalisera des études géologiques, géophysiques et géochimiques pour caractériser le potentiel géothermique de la zone.</p><h2>Article 2 - Forages exploratoires</h2><p>En cas de résultats favorables, des forages exploratoires seront réalisés pour confirmer le potentiel du gisement.</p><h2>Article 3 - Partage de la ressource</h2><p>Un accord de partage de production sera négocié avec l'État avant tout développement commercial.</p><p>Fait le {{date_debut_exploration}}</p></div>`
  },
  {
    code: 'sol_partage_revenus_verte',
    name: "Accord de Partage des Revenus Énergie Verte",
    category: 'btp_construction',
    price: 9000, priceMax: 27000,
    description: "Accord de partage des revenus entre un opérateur d'énergie verte et une communauté locale, assurant un bénéfice équitable pour les populations hôtes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'operateur_vert',label:"Opérateur d'énergie verte",type:'text',required:true},
      {key:'communaute_hote',label:"Communauté hôte",type:'text',required:true},
      {key:'type_projet_vert',label:"Type de projet (solaire / éolien / hydro)",type:'text',required:true},
      {key:'part_communaute',label:"Part de la communauté (%)",type:'text',required:true},
      {key:'date_premier_versement',label:"Date du premier versement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTAGE DES REVENUS ÉNERGIE VERTE</h1><p>Entre {{operateur_vert}} et la communauté de {{communaute_hote}} pour le projet {{type_projet_vert}}.</p><p><strong>Part de la communauté :</strong> {{part_communaute}}% des revenus nets</p><p><strong>Premier versement :</strong> {{date_premier_versement}}</p><h2>Article 1 - Mécanisme de partage</h2><p>La communauté percevra {{part_communaute}}% des revenus nets générés par le projet, versés annuellement dans un fonds de développement communautaire.</p><h2>Article 2 - Gouvernance du fonds</h2><p>Un comité communautaire élu gérera le fonds de développement et décidera de l'affectation des ressources.</p><h2>Article 3 - Transparence</h2><p>L'Opérateur publiera annuellement un rapport financier certifié indiquant les revenus générés et les montants reversés à la communauté.</p><p>Fait à {{communaute_hote}}, le {{date_premier_versement}}</p></div>`
  },
  {
    code: 'sol_certification_iso50001',
    name: "Contrat de Certification ISO 50001",
    category: 'btp_construction',
    price: 12000, priceMax: 36000,
    description: "Contrat d'accompagnement à la certification ISO 50001 (Système de Management de l'Énergie) pour entreprises et institutions en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 51,
    fieldsJson: F([
      {key:'entreprise_iso',label:"Entreprise candidate à la certification",type:'text',required:true},
      {key:'cabinet_certification',label:"Cabinet d'accompagnement",type:'text',required:true},
      {key:'organisme_certification',label:"Organisme de certification",type:'text',required:true},
      {key:'duree_accompagnement',label:"Durée d'accompagnement (mois)",type:'text',required:true},
      {key:'date_audit_certification',label:"Date d'audit de certification",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CONTRAT D'ACCOMPAGNEMENT À LA CERTIFICATION ISO 50001</h1><p>Entre {{cabinet_certification}} et {{entreprise_iso}}.</p><p><strong>Organisme certificateur :</strong> {{organisme_certification}}</p><p><strong>Durée d'accompagnement :</strong> {{duree_accompagnement}} mois</p><p><strong>Audit de certification :</strong> {{date_audit_certification}}</p><h2>Article 1 - Prestations d'accompagnement</h2><p>Le Cabinet accompagnera l'Entreprise dans la mise en place de son Système de Management de l'Énergie (SME) conforme aux exigences de la norme ISO 50001.</p><h2>Article 2 - Livrables</h2><p>Politique énergétique, revue énergétique, indicateurs de performance, plan d'action et documentation du SME.</p><h2>Article 3 - Audit à blanc</h2><p>Un audit à blanc sera réalisé 2 mois avant l'audit de certification pour valider le niveau de préparation.</p><p>Fait à Abidjan, le {{date_audit_certification}}</p></div>`
  },
  {
    code: 'sol_mdp_mecanisme',
    name: "Accord Mécanisme de Développement Propre (MDP)",
    category: 'btp_construction',
    price: 14000, priceMax: 42000,
    description: "Accord de développement d'un projet MDP (Mécanisme de Développement Propre) pour la réduction des émissions de gaz à effet de serre en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 40,
    fieldsJson: F([
      {key:'porteur_mdp',label:"Porteur du projet MDP",type:'text',required:true},
      {key:'acheteur_cer',label:"Acheteur de CER (Certified Emission Reductions)",type:'text',required:true},
      {key:'type_projet_mdp',label:"Type de projet (énergie renouvelable / efficacité)",type:'text',required:true},
      {key:'reductions_annuelles',label:"Réductions annuelles estimées (tCO2e)",type:'text',required:true},
      {key:'date_enregistrement',label:"Date d'enregistrement CCNUCC",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD MÉCANISME DE DÉVELOPPEMENT PROPRE (MDP)</h1><p>Entre {{porteur_mdp}} et {{acheteur_cer}} pour un projet MDP de type {{type_projet_mdp}}.</p><p><strong>Réductions annuelles :</strong> {{reductions_annuelles}} tCO2e</p><p><strong>Enregistrement CCNUCC :</strong> {{date_enregistrement}}</p><h2>Article 1 - Éligibilité MDP</h2><p>Le projet satisfait aux critères d'additionnalité et de durabilité requis par le Protocole de Kyoto et les règles du Conseil Exécutif du MDP.</p><h2>Article 2 - Vente des CER</h2><p>L'Acheteur acquerra les CER générés au prix convenu, avec livraison annuelle après vérification par un auditeur accrédité.</p><h2>Article 3 - Contribution au développement durable</h2><p>Le projet contribuera au développement durable de la Côte d'Ivoire selon les critères définis par l'Autorité Nationale Désignée (AND).</p><p>Fait à Abidjan, le {{date_enregistrement}}</p></div>`
  },
  {
    code: 'sol_rapport_performance_parc',
    name: "Rapport de Performance de Parc Solaire",
    category: 'btp_construction',
    price: 7000, priceMax: 21000,
    description: "Rapport annuel de performance technique et financière d'un parc solaire photovoltaïque, incluant analyse des écarts et recommandations.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'parc_solaire',label:"Nom du parc solaire",type:'text',required:true},
      {key:'exploitant_parc',label:"Exploitant",type:'text',required:true},
      {key:'production_reelle_mwh',label:"Production réelle (MWh/an)",type:'text',required:true},
      {key:'production_prevue_mwh',label:"Production prévue (MWh/an)",type:'text',required:true},
      {key:'annee_rapport',label:"Année du rapport",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE DE PARC SOLAIRE</h1><p><strong>Parc :</strong> {{parc_solaire}}</p><p><strong>Exploitant :</strong> {{exploitant_parc}}</p><p><strong>Année :</strong> {{annee_rapport}}</p><h2>1. Production énergétique</h2><p><strong>Production réelle :</strong> {{production_reelle_mwh}} MWh</p><p><strong>Production prévue :</strong> {{production_prevue_mwh}} MWh</p><p>Le ratio de performance (PR) est calculé par rapport à la production P90 contractuelle.</p><h2>2. Disponibilité</h2><p>La disponibilité des onduleurs et des équipements électriques est détaillée par sous-parc en annexe.</p><h2>3. Analyse des pertes</h2><p>Les pertes par encrassement, ombrage, dégradation des modules et indisponibilités techniques sont analysées et quantifiées.</p><h2>4. Recommandations</h2><p>Des actions correctives sont proposées pour améliorer la performance de {{parc_solaire}} lors de la prochaine période.</p></div>`
  },
  {
    code: 'sol_plan_transition_entreprise',
    name: "Plan de Transition Énergétique d'Entreprise",
    category: 'btp_construction',
    price: 11000, priceMax: 33000,
    description: "Plan de transition énergétique pour entreprise ivoirienne, définissant la feuille de route vers un mix énergétique renouvelable et une empreinte carbone réduite.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 56,
    fieldsJson: F([
      {key:'entreprise_transition',label:"Entreprise",type:'text',required:true},
      {key:'part_renouvelable_cible',label:"Part d'énergies renouvelables cible (%)",type:'text',required:true},
      {key:'reduction_carbone_cible',label:"Réduction carbone cible (%)",type:'text',required:true},
      {key:'horizon_transition',label:"Horizon de la transition (années)",type:'text',required:true},
      {key:'date_adoption_plan',label:"Date d'adoption du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE TRANSITION ÉNERGÉTIQUE D'ENTREPRISE</h1><p><strong>Entreprise :</strong> {{entreprise_transition}}</p><p><strong>Objectif renouvelable :</strong> {{part_renouvelable_cible}}% d'énergies renouvelables dans {{horizon_transition}} ans</p><p><strong>Réduction carbone :</strong> {{reduction_carbone_cible}}%</p><p><strong>Adopté le :</strong> {{date_adoption_plan}}</p><h2>1. Diagnostic énergétique</h2><p>Bilan complet de la consommation actuelle par source d'énergie et par usage (process, bâtiment, transport).</p><h2>2. Feuille de route</h2><p>Court terme (0-2 ans) : efficacité énergétique et LED. Moyen terme (2-5 ans) : installation solaire et optimisation. Long terme (5+ ans) : PPAs et décarbonation profonde.</p><h2>3. Financement de la transition</h2><p>Mobilisation de la finance verte (green bonds, prêts verts, fonds climat) pour financer les investissements de transition.</p><p>Adopté le {{date_adoption_plan}}</p></div>`
  },
  {
    code: 'sol_charte_energie_renouvelable',
    name: "Charte Énergie Renouvelable Afrique",
    category: 'btp_construction',
    price: 4000, priceMax: 12000,
    description: "Charte d'engagement collectif pour le développement des énergies renouvelables en Afrique, destinée aux entreprises, ONG et institutions publiques.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 52,
    fieldsJson: F([
      {key:'signataire_charte_sol',label:"Organisation signataire",type:'text',required:true},
      {key:'representant_charte_sol',label:"Représentant légal",type:'text',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques de l'organisation",type:'textarea',required:true},
      {key:'date_signature_charte_sol',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>CHARTE ÉNERGIE RENOUVELABLE AFRIQUE</h1><p><strong>Signataire :</strong> {{signataire_charte_sol}}</p><p><strong>Représentant :</strong> {{representant_charte_sol}}</p><p><strong>Date :</strong> {{date_signature_charte_sol}}</p><h2>Préambule</h2><p>L'Afrique dispose des ressources renouvelables les plus importantes du monde. {{signataire_charte_sol}} s'engage à contribuer activement au développement de ces ressources pour un continent africain prospère et résilient.</p><h2>Engagements</h2><p>{{engagements_specifiques}}</p><h2>Principes de la charte</h2><p>1. Promouvoir l'accès universel à une énergie propre et abordable. 2. Soutenir les solutions innovantes et adaptées aux contextes locaux. 3. Renforcer les compétences et l'industrie locale des énergies renouvelables. 4. Contribuer aux objectifs climatiques de l'Accord de Paris.</p><p>Signé à Abidjan, le {{date_signature_charte_sol}}</p><p>{{representant_charte_sol}}, au nom de {{signataire_charte_sol}}</p></div>`
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
  console.log(`Batch 36a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
