import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const F = (f: object[]) => JSON.stringify(f);
const templates = [
  // ── TÉLÉCOMS / 5G (25 templates, préfixe tel3_) ──────────────────────────
  {
    code: 'tel3_5g_deploy',
    name: "Accord de service de déploiement réseau 5G",
    category: 'commercial_financier',
    price: 12000, priceMax: 40000,
    description: "Contrat encadrant le déploiement d'un réseau 5G entre un opérateur télécom et un prestataire technique, conforme à la réglementation ARTCI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 85,
    fieldsJson: F([
      {key:'operateur',label:"Nom de l'opérateur télécom",type:'text',required:true},
      {key:'prestataire',label:"Nom du prestataire technique",type:'text',required:true},
      {key:'zone_couverture',label:"Zone de couverture cible",type:'text',required:true},
      {key:'date_debut',label:"Date de début des travaux",type:'date',required:true},
      {key:'date_fin',label:"Date de fin prévue",type:'date',required:true},
      {key:'specifications',label:"Spécifications techniques principales",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPLOIEMENT RÉSEAU 5G</h1>
<p>Entre <strong>{{operateur}}</strong> (ci-après «&nbsp;l'Opérateur&nbsp;») et <strong>{{prestataire}}</strong> (ci-après «&nbsp;le Prestataire&nbsp;»), il est convenu ce qui suit :</p>
<h2>Article 1 — Objet</h2>
<p>Le présent accord a pour objet de définir les conditions de déploiement du réseau 5G sur la zone : <strong>{{zone_couverture}}</strong>, conformément aux licences délivrées par l'ARTCI.</p>
<h2>Article 2 — Durée</h2>
<p>Les travaux débuteront le <strong>{{date_debut}}</strong> et devront être achevés au plus tard le <strong>{{date_fin}}</strong>.</p>
<h2>Article 3 — Spécifications techniques</h2>
<p>{{specifications}}</p>
<h2>Article 4 — Obligations des parties</h2>
<p>L'Opérateur met à disposition les autorisations administratives. Le Prestataire assure le déploiement des équipements dans le respect des normes IMT-2020 de l'UIT.</p>
<h2>Article 5 — Droit applicable</h2>
<p>Le présent accord est régi par le droit ivoirien et les dispositions du cadre OHADA.</p></div>`
  },
  {
    code: 'tel3_ftth_deploy',
    name: "Accord de service de déploiement fibre optique FTTH",
    category: 'commercial_financier',
    price: 10000, priceMax: 35000,
    description: "Contrat de déploiement d'infrastructure fibre optique Fiber-to-the-Home entre opérateur et sous-traitant, zones urbaines et périurbaines ivoiriennes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur mandant",type:'text',required:true},
      {key:'sous_traitant',label:"Sous-traitant déploiement",type:'text',required:true},
      {key:'quartiers',label:"Quartiers / communes concernés",type:'text',required:true},
      {key:'longueur_reseau',label:"Longueur totale de réseau (km)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement",type:'date',required:true},
      {key:'remarques',label:"Remarques techniques",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPLOIEMENT FIBRE OPTIQUE FTTH</h1>
<p>Entre <strong>{{operateur}}</strong> et <strong>{{sous_traitant}}</strong> :</p>
<h2>Article 1 — Objet</h2>
<p>Déploiement d'un réseau FTTH (Fiber-to-the-Home) dans les zones : <strong>{{quartiers}}</strong> pour une longueur totale de <strong>{{longueur_reseau}}</strong> km.</p>
<h2>Article 2 — Date de lancement</h2>
<p>Le projet prend effet au <strong>{{date_lancement}}</strong>.</p>
<h2>Article 3 — Normes</h2>
<p>Les travaux respecteront les normes ITU-T G.984 (GPON) et les prescriptions de l'ARTCI.</p>
<h2>Article 4 — Remarques</h2>
<p>{{remarques}}</p></div>`
  },
  {
    code: 'tel3_cable_sous_marin',
    name: "Accord de service de déploiement câble sous-marin",
    category: 'commercial_financier',
    price: 20000, priceMax: 60000,
    description: "Contrat de déploiement et maintenance de câble sous-marin à fibre optique reliant la Côte d'Ivoire au réseau mondial de télécommunications.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 72,
    fieldsJson: F([
      {key:'consortium',label:"Nom du consortium câblier",type:'text',required:true},
      {key:'point_atterrissage',label:"Point d'atterrissage (ville/port)",type:'text',required:true},
      {key:'longueur_cable',label:"Longueur du câble (km)",type:'text',required:true},
      {key:'capacite',label:"Capacité de transmission (Tbps)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPLOIEMENT CÂBLE SOUS-MARIN</h1>
<p>Le consortium <strong>{{consortium}}</strong> s'engage à déployer un câble sous-marin à fibre optique avec atterrissage à <strong>{{point_atterrissage}}</strong>.</p>
<h2>Caractéristiques</h2>
<p>Longueur : <strong>{{longueur_cable}}</strong> km — Capacité : <strong>{{capacite}}</strong> Tbps.</p>
<h2>Date de signature</h2>
<p><strong>{{date_signature}}</strong></p>
<h2>Réglementation</h2>
<p>Accord soumis à la loi ivoirienne, à la Convention UNCLOS et aux directives ARTCI sur les câbles sous-marins.</p></div>`
  },
  {
    code: 'tel3_ran_sharing',
    name: "Accord de partage d'infrastructures mobiles (RAN sharing)",
    category: 'commercial_financier',
    price: 8000, priceMax: 25000,
    description: "Accord de mutualisation d'infrastructures radio (RAN) entre opérateurs mobiles ivoiriens, conforme aux dispositions ARTCI sur le partage passif et actif.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 75,
    fieldsJson: F([
      {key:'operateur_a',label:"Opérateur A",type:'text',required:true},
      {key:'operateur_b',label:"Opérateur B",type:'text',required:true},
      {key:'type_partage',label:"Type de partage (passif / actif / MOCN)",type:'text',required:true},
      {key:'zones',label:"Zones géographiques couvertes",type:'textarea',required:true},
      {key:'duree',label:"Durée de l'accord (années)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTAGE D'INFRASTRUCTURES MOBILES (RAN SHARING)</h1>
<p>Entre <strong>{{operateur_a}}</strong> et <strong>{{operateur_b}}</strong>, il est convenu un partage de type <strong>{{type_partage}}</strong>.</p>
<h2>Zones</h2><p>{{zones}}</p>
<h2>Durée</h2><p><strong>{{duree}}</strong> ans à compter de la signature.</p>
<h2>Conformité</h2><p>Accord notifié à l'ARTCI conformément à l'article 27 de la loi n°2012-293 relative aux télécommunications.</p></div>`
  },
  {
    code: 'tel3_bts_deploy',
    name: "Accord de service de déploiement antenne BTS/NodeB",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat de déploiement de stations de base (BTS/NodeB/eNodeB/gNodeB) incluant génie civil, installation et mise en service.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur",type:'text',required:true},
      {key:'fournisseur',label:"Fournisseur d'équipements",type:'text',required:true},
      {key:'nombre_sites',label:"Nombre de sites à déployer",type:'text',required:true},
      {key:'technologie',label:"Technologie (2G/3G/4G/5G)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true},
      {key:'conditions',label:"Conditions particulières",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPLOIEMENT ANTENNE BTS/NODEB</h1>
<p><strong>{{operateur}}</strong> confie à <strong>{{fournisseur}}</strong> le déploiement de <strong>{{nombre_sites}}</strong> sites en technologie <strong>{{technologie}}</strong>.</p>
<h2>Calendrier</h2><p>Début des travaux : <strong>{{date_debut}}</strong>.</p>
<h2>Conditions particulières</h2><p>{{conditions}}</p></div>`
  },
  {
    code: 'tel3_maintenance_reseau',
    name: "Accord de service de maintenance réseau mobile",
    category: 'commercial_financier',
    price: 7000, priceMax: 22000,
    description: "Contrat de maintenance préventive et corrective du réseau mobile (BTS, BSC, MSC, cœur de réseau) avec engagements de niveau de service (SLA).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur bénéficiaire",type:'text',required:true},
      {key:'prestataire',label:"Prestataire maintenance",type:'text',required:true},
      {key:'perimetre',label:"Périmètre des équipements maintenus",type:'textarea',required:true},
      {key:'sla_disponibilite',label:"SLA disponibilité réseau (%)",type:'text',required:true},
      {key:'duree_contrat',label:"Durée du contrat (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MAINTENANCE RÉSEAU MOBILE</h1>
<p><strong>{{prestataire}}</strong> assure la maintenance du réseau mobile de <strong>{{operateur}}</strong>.</p>
<h2>Périmètre</h2><p>{{perimetre}}</p>
<h2>Engagements SLA</h2><p>Disponibilité garantie : <strong>{{sla_disponibilite}}</strong>% — Durée : <strong>{{duree_contrat}}</strong> mois.</p></div>`
  },
  {
    code: 'tel3_roaming',
    name: "Accord de service de roaming national et international",
    category: 'commercial_financier',
    price: 9000, priceMax: 28000,
    description: "Accord d'itinérance (roaming) entre opérateurs mobiles définissant les conditions techniques et financières d'accès réciproque aux réseaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'operateur_home',label:"Opérateur Home (réseau visité)",type:'text',required:true},
      {key:'operateur_visited',label:"Opérateur Visited",type:'text',required:true},
      {key:'type_roaming',label:"Type de roaming (national / international / data)",type:'text',required:true},
      {key:'tarifs',label:"Conditions tarifaires (IOT/TAP)",type:'textarea',required:true},
      {key:'date_effet',label:"Date d'entrée en vigueur",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE ROAMING</h1>
<p>Entre <strong>{{operateur_home}}</strong> et <strong>{{operateur_visited}}</strong> pour le roaming de type : <strong>{{type_roaming}}</strong>.</p>
<h2>Conditions tarifaires</h2><p>{{tarifs}}</p>
<h2>Entrée en vigueur</h2><p><strong>{{date_effet}}</strong></p>
<h2>Conformité</h2><p>Accord conforme aux recommandations UIT-T Q.1001 et aux directives ARTCI.</p></div>`
  },
  {
    code: 'tel3_wifi_public',
    name: "Accord de service de déploiement réseau Wi-Fi public",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat de déploiement et exploitation d'un réseau Wi-Fi public dans les espaces collectifs (aéroports, gares, marchés, centres administratifs) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur Wi-Fi",type:'text',required:true},
      {key:'gestionnaire_site',label:"Gestionnaire du site d'accueil",type:'text',required:true},
      {key:'sites',label:"Sites concernés",type:'textarea',required:true},
      {key:'nombre_bornes',label:"Nombre de bornes Wi-Fi",type:'text',required:true},
      {key:'duree',label:"Durée de la convention (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DÉPLOIEMENT RÉSEAU WI-FI PUBLIC</h1>
<p><strong>{{operateur}}</strong> et <strong>{{gestionnaire_site}}</strong> conviennent du déploiement de <strong>{{nombre_bornes}}</strong> bornes Wi-Fi sur les sites : {{sites}}.</p>
<h2>Durée</h2><p><strong>{{duree}}</strong> ans.</p>
<h2>Conditions d'usage</h2><p>Accès gratuit ou payant selon la politique tarifaire de l'opérateur, dans le respect de la législation sur la cybersécurité.</p></div>`
  },
  {
    code: 'tel3_iot_m2m',
    name: "Accord de service d'Internet des Objets (IoT/M2M)",
    category: 'commercial_financier',
    price: 7000, priceMax: 22000,
    description: "Contrat de service IoT/M2M entre opérateur et entreprise cliente pour la connectivité de capteurs et objets connectés sur les réseaux mobiles en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur IoT",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'nombre_sim',label:"Nombre de SIM/eSIM IoT",type:'text',required:true},
      {key:'cas_usage',label:"Cas d'usage principal (smart city, agriculture, logistique…)",type:'text',required:true},
      {key:'protocole',label:"Protocole réseau (NB-IoT, LTE-M, LPWAN…)",type:'text',required:true},
      {key:'sla',label:"Engagements de service (SLA)",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE IoT/M2M</h1>
<p><strong>{{operateur}}</strong> fournit des services IoT/M2M à <strong>{{client}}</strong> pour <strong>{{nombre_sim}}</strong> terminaux en protocole <strong>{{protocole}}</strong>.</p>
<h2>Cas d'usage</h2><p>{{cas_usage}}</p>
<h2>SLA</h2><p>{{sla}}</p></div>`
  },
  {
    code: 'tel3_cloud_souverain',
    name: "Accord de service de cloud computing souverain",
    category: 'commercial_financier',
    price: 11000, priceMax: 35000,
    description: "Contrat de service cloud souverain hébergé sur le territoire ivoirien, garantissant la résidence des données et la conformité à la loi n°2013-450 sur la protection des données personnelles.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 80,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur cloud",type:'text',required:true},
      {key:'client',label:"Client (entreprise ou administration)",type:'text',required:true},
      {key:'services',label:"Services cloud souscrits (IaaS / PaaS / SaaS)",type:'text',required:true},
      {key:'localisation',label:"Localisation du data center (ville)",type:'text',required:true},
      {key:'volume_stockage',label:"Volume de stockage alloué (To)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CLOUD COMPUTING SOUVERAIN</h1>
<p><strong>{{fournisseur}}</strong> fournit des services cloud (<strong>{{services}}</strong>) à <strong>{{client}}</strong> depuis le data center localisé à <strong>{{localisation}}</strong>.</p>
<h2>Capacité</h2><p>Volume de stockage : <strong>{{volume_stockage}}</strong> To.</p>
<h2>Souveraineté des données</h2><p>Toutes les données restent hébergées sur le territoire ivoirien conformément à la loi n°2013-450.</p>
<h2>Entrée en vigueur</h2><p><strong>{{date_debut}}</strong></p></div>`
  },
  {
    code: 'tel3_datacenter',
    name: "Accord de service de data center (colocation, hébergement)",
    category: 'commercial_financier',
    price: 9000, priceMax: 30000,
    description: "Contrat d'hébergement en colocation dans un data center ivoirien : espace rack, alimentation électrique, connectivité, climatisation et sécurité physique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 76,
    fieldsJson: F([
      {key:'datacenter',label:"Nom du data center",type:'text',required:true},
      {key:'client',label:"Client hébergé",type:'text',required:true},
      {key:'nombre_racks',label:"Nombre de racks / unités U",type:'text',required:true},
      {key:'puissance',label:"Puissance électrique allouée (kW)",type:'text',required:true},
      {key:'niveau_tier',label:"Niveau Tier (I à IV)",type:'text',required:true},
      {key:'date_debut',label:"Date de début d'hébergement",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE DATA CENTER — COLOCATION</h1>
<p><strong>{{datacenter}}</strong> héberge les équipements de <strong>{{client}}</strong> dans <strong>{{nombre_racks}}</strong> racks Tier <strong>{{niveau_tier}}</strong> avec une puissance de <strong>{{puissance}}</strong> kW.</p>
<h2>Date d'entrée</h2><p><strong>{{date_debut}}</strong></p>
<h2>Garanties</h2><p>Disponibilité électrique conforme au niveau Tier contractualisé, sécurité physique 24h/24.</p></div>`
  },
  {
    code: 'tel3_cdn',
    name: "Accord de service de CDN (réseau de distribution de contenu)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat de service CDN pour la distribution accélérée de contenus numériques (vidéo, web, médias) en Afrique de l'Ouest francophone.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'fournisseur_cdn',label:"Fournisseur CDN",type:'text',required:true},
      {key:'client',label:"Client éditeur de contenu",type:'text',required:true},
      {key:'volume_trafic',label:"Volume de trafic mensuel (To)",type:'text',required:true},
      {key:'zones',label:"Zones de distribution géographiques",type:'text',required:true},
      {key:'date_debut',label:"Date de démarrage",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE CDN</h1>
<p><strong>{{fournisseur_cdn}}</strong> fournit un service de distribution de contenu à <strong>{{client}}</strong> pour un volume de <strong>{{volume_trafic}}</strong> To/mois sur les zones : <strong>{{zones}}</strong>.</p>
<h2>Démarrage</h2><p><strong>{{date_debut}}</strong></p>
<h2>Qualité de service</h2><p>Latence inférieure à 50 ms pour les points de présence (PoP) en Afrique de l'Ouest.</p></div>`
  },
  {
    code: 'tel3_visioconf',
    name: "Accord de service de visioconférence sécurisée",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Contrat de service de visioconférence chiffrée de bout en bout pour entreprises et administrations ivoiriennes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur du service",type:'text',required:true},
      {key:'client',label:"Organisation cliente",type:'text',required:true},
      {key:'nombre_licences',label:"Nombre de licences utilisateurs",type:'text',required:true},
      {key:'niveau_chiffrement',label:"Niveau de chiffrement (AES-256, E2EE…)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE VISIOCONFÉRENCE SÉCURISÉE</h1>
<p><strong>{{fournisseur}}</strong> met à disposition de <strong>{{client}}</strong> un service de visioconférence sécurisée pour <strong>{{nombre_licences}}</strong> utilisateurs, avec chiffrement <strong>{{niveau_chiffrement}}</strong>.</p>
<h2>Entrée en vigueur</h2><p><strong>{{date_debut}}</strong></p>
<h2>Sécurité</h2><p>Conforme aux exigences de l'ANSSI et à la politique de sécurité des systèmes d'information de l'État de Côte d'Ivoire.</p></div>`
  },
  {
    code: 'tel3_vpn_entreprise',
    name: "Accord de service de VPN d'entreprise",
    category: 'commercial_financier',
    price: 5000, priceMax: 16000,
    description: "Contrat de service VPN dédié pour la connexion sécurisée des sites distants et des collaborateurs mobiles d'une entreprise ivoirienne.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur VPN",type:'text',required:true},
      {key:'client',label:"Entreprise cliente",type:'text',required:true},
      {key:'nombre_sites',label:"Nombre de sites interconnectés",type:'text',required:true},
      {key:'bande_passante',label:"Bande passante garantie (Mbps)",type:'text',required:true},
      {key:'duree',label:"Durée du contrat (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE VPN D'ENTREPRISE</h1>
<p><strong>{{fournisseur}}</strong> fournit un service VPN à <strong>{{client}}</strong> pour l'interconnexion de <strong>{{nombre_sites}}</strong> sites avec une bande passante garantie de <strong>{{bande_passante}}</strong> Mbps.</p>
<h2>Durée</h2><p><strong>{{duree}}</strong> mois.</p>
<h2>Protocoles</h2><p>IPSec / MPLS / SSL-VPN selon configuration retenue.</p></div>`
  },
  {
    code: 'tel3_sdwan',
    name: "Accord de service de SD-WAN (réseau défini par logiciel)",
    category: 'commercial_financier',
    price: 8000, priceMax: 25000,
    description: "Contrat de service SD-WAN pour l'optimisation et la gestion centralisée du réseau étendu d'une organisation, avec basculement automatique entre liens.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur SD-WAN",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'nombre_branches',label:"Nombre de branches / agences",type:'text',required:true},
      {key:'liens_wan',label:"Types de liens WAN utilisés",type:'text',required:true},
      {key:'date_deploiement',label:"Date de déploiement",type:'date',required:true},
      {key:'sla',label:"SLA de disponibilité",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE SD-WAN</h1>
<p><strong>{{fournisseur}}</strong> déploie une solution SD-WAN pour <strong>{{client}}</strong> couvrant <strong>{{nombre_branches}}</strong> branches via les liens : <strong>{{liens_wan}}</strong>.</p>
<h2>Déploiement</h2><p><strong>{{date_deploiement}}</strong></p>
<h2>SLA</h2><p>{{sla}}</p></div>`
  },
  {
    code: 'tel3_ucaas',
    name: "Accord de service de communications unifiées (UCaaS)",
    category: 'commercial_financier',
    price: 7000, priceMax: 22000,
    description: "Contrat de service UCaaS intégrant voix, vidéo, messagerie instantanée et collaboration pour les entreprises en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur UCaaS",type:'text',required:true},
      {key:'client',label:"Organisation cliente",type:'text',required:true},
      {key:'nombre_utilisateurs',label:"Nombre d'utilisateurs",type:'text',required:true},
      {key:'modules',label:"Modules souscrits (voix, vidéo, chat, collaboration)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE COMMUNICATIONS UNIFIÉES (UCaaS)</h1>
<p><strong>{{fournisseur}}</strong> délivre des services UCaaS à <strong>{{client}}</strong> pour <strong>{{nombre_utilisateurs}}</strong> utilisateurs.</p>
<h2>Modules</h2><p>{{modules}}</p>
<h2>Date de début</h2><p><strong>{{date_debut}}</strong></p></div>`
  },
  {
    code: 'tel3_mvno',
    name: "Accord de service de MVNO (opérateur réseau mobile virtuel)",
    category: 'commercial_financier',
    price: 15000, priceMax: 45000,
    description: "Accord d'hébergement MVNO entre un opérateur hôte (MNO) et un opérateur virtuel (MVNO) en Côte d'Ivoire, conforme à la réglementation ARTCI.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 73,
    fieldsJson: F([
      {key:'mno',label:"Opérateur hôte (MNO)",type:'text',required:true},
      {key:'mvno',label:"Opérateur virtuel (MVNO)",type:'text',required:true},
      {key:'type_mvno',label:"Type MVNO (Light / Full / Enhanced)",type:'text',required:true},
      {key:'plage_numerotation',label:"Plage de numérotation attribuée",type:'text',required:true},
      {key:'duree',label:"Durée de l'accord (ans)",type:'text',required:true},
      {key:'conditions_acces',label:"Conditions d'accès réseau et tarifs de gros",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE MVNO</h1>
<p><strong>{{mno}}</strong> héberge l'opérateur virtuel <strong>{{mvno}}</strong> (type : <strong>{{type_mvno}}</strong>) sur sa plage de numérotation <strong>{{plage_numerotation}}</strong>.</p>
<h2>Durée</h2><p><strong>{{duree}}</strong> ans.</p>
<h2>Conditions d'accès</h2><p>{{conditions_acces}}</p>
<h2>Autorisation ARTCI</h2><p>Le présent accord est conditionné à l'obtention de l'autorisation MVNO délivrée par l'ARTCI.</p></div>`
  },
  {
    code: 'tel3_numerotation_artci',
    name: "Accord de service de numérotation téléphonique (ARTCI-CI)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Convention d'attribution et de gestion de ressources de numérotation téléphonique en Côte d'Ivoire, régie par le Plan National de Numérotation de l'ARTCI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur bénéficiaire",type:'text',required:true},
      {key:'type_ressource',label:"Type de ressource (préfixe, bloc de numéros…)",type:'text',required:true},
      {key:'plage',label:"Plage de numéros attribuée",type:'text',required:true},
      {key:'date_attribution',label:"Date d'attribution",type:'date',required:true},
      {key:'duree',label:"Durée de l'attribution (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE NUMÉROTATION TÉLÉPHONIQUE — ARTCI</h1>
<p>L'ARTCI attribue à <strong>{{operateur}}</strong> la ressource de numérotation suivante : <strong>{{type_ressource}}</strong> — plage : <strong>{{plage}}</strong>.</p>
<h2>Durée</h2><p>Attribution valable <strong>{{duree}}</strong> ans à compter du <strong>{{date_attribution}}</strong>, renouvelable sous conditions.</p>
<h2>Obligations</h2><p>L'opérateur s'engage à utiliser ces ressources conformément au Plan National de Numérotation et à notifier tout changement à l'ARTCI.</p></div>`
  },
  {
    code: 'tel3_licence_operateur',
    name: "Accord de licence d'opérateur télécom (ARTCI)",
    category: 'commercial_financier',
    price: 18000, priceMax: 55000,
    description: "Convention de licence d'exploitation de réseau et services de communications électroniques délivrée par l'ARTCI en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 78,
    fieldsJson: F([
      {key:'titulaire',label:"Titulaire de la licence",type:'text',required:true},
      {key:'type_licence',label:"Type de licence (GSM, fixe, VSAT, ISP…)",type:'text',required:true},
      {key:'frequences',label:"Fréquences attribuées (MHz)",type:'text',required:false},
      {key:'date_delivrance',label:"Date de délivrance",type:'date',required:true},
      {key:'duree_validite',label:"Durée de validité (ans)",type:'text',required:true},
      {key:'redevance',label:"Redevance annuelle (FCFA)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>LICENCE D'OPÉRATEUR TÉLÉCOM — ARTCI</h1>
<p>L'Autorité de Régulation des Télécommunications / TIC de Côte d'Ivoire (ARTCI) délivre à <strong>{{titulaire}}</strong> une licence de type <strong>{{type_licence}}</strong>.</p>
<h2>Fréquences</h2><p>{{frequences}}</p>
<h2>Validité et redevance</h2><p>Durée : <strong>{{duree_validite}}</strong> ans à compter du <strong>{{date_delivrance}}</strong> — Redevance : <strong>{{redevance}}</strong> FCFA/an.</p>
<h2>Fondement juridique</h2><p>Loi n°2012-293 du 26 mars 2012 relative aux télécommunications et aux TIC en Côte d'Ivoire.</p></div>`
  },
  {
    code: 'tel3_conformite_reglementaire',
    name: "Accord de conformité réglementaire télécom",
    category: 'commercial_financier',
    price: 7000, priceMax: 20000,
    description: "Plan de mise en conformité réglementaire d'un opérateur télécom ivoirien vis-à-vis des obligations ARTCI (qualité de service, couverture, interopérabilité).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 64,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur concerné",type:'text',required:true},
      {key:'obligations',label:"Obligations réglementaires à satisfaire",type:'textarea',required:true},
      {key:'plan_actions',label:"Plan d'actions correctives",type:'textarea',required:true},
      {key:'echeance',label:"Échéance de mise en conformité",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONFORMITÉ RÉGLEMENTAIRE TÉLÉCOM</h1>
<p><strong>{{operateur}}</strong> s'engage auprès de l'ARTCI à satisfaire aux obligations réglementaires suivantes :</p>
<h2>Obligations</h2><p>{{obligations}}</p>
<h2>Plan d'actions</h2><p>{{plan_actions}}</p>
<h2>Échéance</h2><p><strong>{{echeance}}</strong></p></div>`
  },
  {
    code: 'tel3_partenariat_b2b',
    name: "Accord de partenariat opérateur-entreprise (B2B)",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Convention de partenariat entre un opérateur télécom et une entreprise cliente pour la fourniture de solutions de connectivité B2B personnalisées en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 77,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur télécom",type:'text',required:true},
      {key:'entreprise',label:"Entreprise partenaire",type:'text',required:true},
      {key:'solutions',label:"Solutions télécom fournies",type:'textarea',required:true},
      {key:'engagement_duree',label:"Durée d'engagement (mois)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT OPÉRATEUR-ENTREPRISE (B2B)</h1>
<p><strong>{{operateur}}</strong> et <strong>{{entreprise}}</strong> concluent un partenariat télécom B2B pour les solutions suivantes :</p>
<h2>Solutions</h2><p>{{solutions}}</p>
<h2>Engagement</h2><p><strong>{{engagement_duree}}</strong> mois à compter du <strong>{{date_signature}}</strong>.</p></div>`
  },
  {
    code: 'tel3_rapport_performance',
    name: "Rapport de performance réseau télécom",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Rapport périodique de performance réseau télécom (KPI QoS) pour opérateurs mobiles et fixes en Côte d'Ivoire, conforme aux exigences de reporting ARTCI.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur",type:'text',required:true},
      {key:'periode',label:"Période du rapport (mois/année)",type:'text',required:true},
      {key:'kpi_disponibilite',label:"KPI Disponibilité réseau (%)",type:'text',required:true},
      {key:'kpi_qualite_voix',label:"KPI Qualité voix (MOS)",type:'text',required:true},
      {key:'observations',label:"Observations et plan d'amélioration",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE RÉSEAU TÉLÉCOM</h1>
<p>Opérateur : <strong>{{operateur}}</strong> — Période : <strong>{{periode}}</strong></p>
<h2>Indicateurs clés</h2>
<p>Disponibilité réseau : <strong>{{kpi_disponibilite}}</strong>% | Qualité voix (MOS) : <strong>{{kpi_qualite_voix}}</strong></p>
<h2>Observations</h2><p>{{observations}}</p>
<h2>Transmission</h2><p>Ce rapport est transmis à l'ARTCI dans le cadre des obligations de reporting trimestriel.</p></div>`
  },
  {
    code: 'tel3_plan_couverture',
    name: "Plan de couverture réseau national",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Document de planification de la couverture réseau mobile national d'un opérateur ivoirien incluant cartographie, objectifs et jalons réglementaires.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 66,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur",type:'text',required:true},
      {key:'annee_cible',label:"Année cible du plan",type:'text',required:true},
      {key:'taux_couverture_actuel',label:"Taux de couverture actuel (%)",type:'text',required:true},
      {key:'taux_couverture_vise',label:"Taux de couverture visé (%)",type:'text',required:true},
      {key:'zones_prioritaires',label:"Zones prioritaires de déploiement",type:'textarea',required:true},
      {key:'investissement',label:"Investissement prévu (FCFA)",type:'text',required:false}
    ]),
    body: `<div class="doc"><h1>PLAN DE COUVERTURE RÉSEAU NATIONAL</h1>
<p>Opérateur : <strong>{{operateur}}</strong> — Horizon : <strong>{{annee_cible}}</strong></p>
<h2>Objectifs</h2>
<p>Taux actuel : <strong>{{taux_couverture_actuel}}</strong>% → Taux visé : <strong>{{taux_couverture_vise}}</strong>%</p>
<h2>Zones prioritaires</h2><p>{{zones_prioritaires}}</p>
<h2>Investissement</h2><p><strong>{{investissement}}</strong> FCFA</p></div>`
  },
  {
    code: 'tel3_formation_telecom',
    name: "Accord de service de formation en télécom (ingénieurs réseaux)",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Convention de formation professionnelle certifiante pour ingénieurs et techniciens réseaux télécoms en Côte d'Ivoire (4G/5G, IP, fibre, sécurité).",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation",type:'text',required:true},
      {key:'entreprise',label:"Entreprise commanditaire",type:'text',required:true},
      {key:'programme',label:"Programme de formation",type:'textarea',required:true},
      {key:'nombre_stagiaires',label:"Nombre de stagiaires",type:'text',required:true},
      {key:'duree_formation',label:"Durée de la formation (jours)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION EN TÉLÉCOM</h1>
<p><strong>{{organisme_formation}}</strong> dispense une formation au profit de <strong>{{entreprise}}</strong> pour <strong>{{nombre_stagiaires}}</strong> stagiaires sur <strong>{{duree_formation}}</strong> jours à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Programme</h2><p>{{programme}}</p>
<h2>Certification</h2><p>Une attestation de formation est délivrée à chaque stagiaire à l'issue du programme.</p></div>`
  },
  {
    code: 'tel3_charte_numerique',
    name: "Charte du numérique responsable et inclusif",
    category: 'commercial_financier',
    price: 4000, priceMax: 12000,
    description: "Charte engageant un opérateur télécom ou une organisation à des pratiques numériques responsables, inclusives et durables en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'organisation',label:"Nom de l'organisation signataire",type:'text',required:true},
      {key:'representant',label:"Représentant légal",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'engagements',label:"Engagements spécifiques de l'organisation",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CHARTE DU NUMÉRIQUE RESPONSABLE ET INCLUSIF</h1>
<p><strong>{{organisation}}</strong>, représentée par <strong>{{representant}}</strong>, s'engage ce <strong>{{date_signature}}</strong> à respecter les principes du numérique responsable et inclusif.</p>
<h2>Principes</h2>
<p>1. Réduire l'empreinte environnementale du numérique.<br/>2. Garantir l'accessibilité numérique pour tous.<br/>3. Protéger les données personnelles des utilisateurs.<br/>4. Lutter contre la fracture numérique en zones rurales.</p>
<h2>Engagements spécifiques</h2><p>{{engagements}}</p></div>`
  },

  // ── SATELLITE / ESPACE (25 templates, préfixe sat_) ──────────────────────
  {
    code: 'sat_capacite_satellite',
    name: "Accord de service de capacité satellite (bande Ku, Ka)",
    category: 'commercial_financier',
    price: 14000, priceMax: 45000,
    description: "Contrat de location de capacité transpondeur satellite en bandes Ku et Ka pour services de télécommunications et diffusion en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 75,
    fieldsJson: F([
      {key:'operateur_satellite',label:"Opérateur satellite (ex. Intelsat, SES…)",type:'text',required:true},
      {key:'client',label:"Client locataire",type:'text',required:true},
      {key:'satellite',label:"Satellite et position orbitale",type:'text',required:true},
      {key:'bande',label:"Bande de fréquence (Ku / Ka)",type:'text',required:true},
      {key:'bande_passante',label:"Bande passante louée (MHz)",type:'text',required:true},
      {key:'duree',label:"Durée du contrat (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CAPACITÉ SATELLITE</h1>
<p><strong>{{operateur_satellite}}</strong> loue à <strong>{{client}}</strong> une capacité de <strong>{{bande_passante}}</strong> MHz en bande <strong>{{bande}}</strong> sur le satellite <strong>{{satellite}}</strong>.</p>
<h2>Durée</h2><p><strong>{{duree}}</strong> ans.</p>
<h2>Coordination des fréquences</h2><p>L'utilisation des fréquences est coordonnée auprès de l'ARTCI et de l'UIT conformément au Règlement des Radiocommunications.</p></div>`
  },
  {
    code: 'sat_vsat',
    name: "Accord de service de VSAT (internet par satellite)",
    category: 'commercial_financier',
    price: 8000, priceMax: 25000,
    description: "Contrat de fourniture de service internet VSAT pour la connexion d'entreprises et d'organisations en zones non couvertes par les réseaux terrestres en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 78,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur VSAT",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'nombre_sites',label:"Nombre de sites VSAT",type:'text',required:true},
      {key:'debit',label:"Débit garanti par site (Mbps)",type:'text',required:true},
      {key:'date_installation',label:"Date d'installation",type:'date',required:true},
      {key:'localisation',label:"Localisation des sites",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE VSAT</h1>
<p><strong>{{fournisseur}}</strong> installe et exploite <strong>{{nombre_sites}}</strong> terminaux VSAT pour <strong>{{client}}</strong> avec un débit garanti de <strong>{{debit}}</strong> Mbps par site.</p>
<h2>Sites</h2><p>{{localisation}}</p>
<h2>Installation</h2><p><strong>{{date_installation}}</strong></p></div>`
  },
  {
    code: 'sat_teledetection',
    name: "Accord de service de télédétection satellite (images)",
    category: 'commercial_financier',
    price: 10000, priceMax: 32000,
    description: "Contrat de fourniture d'images satellite de télédétection (optique, radar SAR) pour des applications agricoles, forestières, urbaines ou sécuritaires en Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 72,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur d'images satellite",type:'text',required:true},
      {key:'client',label:"Organisation cliente",type:'text',required:true},
      {key:'zone_interet',label:"Zone d'intérêt géographique",type:'text',required:true},
      {key:'resolution',label:"Résolution spatiale requise (m)",type:'text',required:true},
      {key:'type_capteur',label:"Type de capteur (optique / SAR / multispectral)",type:'text',required:true},
      {key:'periode',label:"Période de couverture",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TÉLÉDÉTECTION SATELLITE</h1>
<p><strong>{{fournisseur}}</strong> livre à <strong>{{client}}</strong> des images satellite (capteur : <strong>{{type_capteur}}</strong>, résolution : <strong>{{resolution}}</strong> m) sur la zone <strong>{{zone_interet}}</strong> pour la période <strong>{{periode}}</strong>.</p>
<h2>Droits d'usage</h2><p>Les images sont fournies pour usage interne uniquement. Toute redistribution requiert l'autorisation écrite du fournisseur.</p></div>`
  },
  {
    code: 'sat_gps_gnss',
    name: "Accord de service de navigation GPS/GNSS",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Contrat de service de positionnement et navigation satellitaire (GPS, GALILEO, GLONASS) pour applications de transport, logistique et agriculture en Afrique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 70,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur de service GNSS",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'application',label:"Application principale (transport, agriculture, SIG…)",type:'text',required:true},
      {key:'precision',label:"Précision de positionnement requise (m)",type:'text',required:true},
      {key:'nombre_terminaux',label:"Nombre de terminaux GNSS",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE NAVIGATION GPS/GNSS</h1>
<p><strong>{{fournisseur}}</strong> fournit un service GNSS à <strong>{{client}}</strong> pour l'application <strong>{{application}}</strong> sur <strong>{{nombre_terminaux}}</strong> terminaux avec une précision de <strong>{{precision}}</strong> m.</p>
<h2>Constellations</h2><p>GPS (USA), GALILEO (UE) et/ou GLONASS (Russie) selon disponibilité.</p></div>`
  },
  {
    code: 'sat_meteorologie',
    name: "Accord de service de météorologie satellite",
    category: 'commercial_financier',
    price: 9000, priceMax: 28000,
    description: "Contrat de fourniture de données météorologiques satellite (METEOSAT, MSG) pour des services d'alerte précoce, d'agriculture et de gestion des risques climatiques en Afrique de l'Ouest.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 68,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur de données météo satellite",type:'text',required:true},
      {key:'client',label:"Organisation bénéficiaire",type:'text',required:true},
      {key:'produits',label:"Produits météo fournis (températures, précipitations, vents…)",type:'textarea',required:true},
      {key:'frequence_livraison',label:"Fréquence de livraison des données",type:'text',required:true},
      {key:'duree',label:"Durée du contrat (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE MÉTÉOROLOGIE SATELLITE</h1>
<p><strong>{{fournisseur}}</strong> livre à <strong>{{client}}</strong> des données météorologiques satellite à fréquence <strong>{{frequence_livraison}}</strong> pour <strong>{{duree}}</strong> ans.</p>
<h2>Produits</h2><p>{{produits}}</p>
<h2>Usage</h2><p>Données utilisées pour la prévision météorologique, l'agriculture de précision et la gestion des catastrophes naturelles.</p></div>`
  },
  {
    code: 'sat_dth_television',
    name: "Accord de service de télévision par satellite (DTH)",
    category: 'commercial_financier',
    price: 8000, priceMax: 25000,
    description: "Contrat de diffusion directe par satellite (DTH) pour opérateurs audiovisuels en Côte d'Ivoire : capacité transpondeur, conditions de diffusion et droits voisins.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'operateur_satellite',label:"Opérateur satellite",type:'text',required:true},
      {key:'diffuseur',label:"Diffuseur audiovisuel",type:'text',required:true},
      {key:'chaines',label:"Chaînes diffusées",type:'textarea',required:true},
      {key:'satellite',label:"Satellite et position orbitale",type:'text',required:true},
      {key:'duree',label:"Durée du contrat (ans)",type:'text',required:true},
      {key:'date_debut',label:"Date de début de diffusion",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TÉLÉVISION PAR SATELLITE (DTH)</h1>
<p><strong>{{operateur_satellite}}</strong> assure la diffusion satellite DTH des chaînes de <strong>{{diffuseur}}</strong> via le satellite <strong>{{satellite}}</strong>.</p>
<h2>Chaînes</h2><p>{{chaines}}</p>
<h2>Durée</h2><p><strong>{{duree}}</strong> ans à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Conformité HACA</h2><p>La diffusion est soumise à l'autorisation du Conseil National de la Communication Audiovisuelle (CNCA) de Côte d'Ivoire.</p></div>`
  },
  {
    code: 'sat_liaison_montante',
    name: "Accord de service de liaison montante (uplink) satellite",
    category: 'commercial_financier',
    price: 7000, priceMax: 22000,
    description: "Contrat de service de liaison montante (uplink) satellite pour la transmission de signaux depuis un téléport africain vers un satellite géostationnaire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 62,
    fieldsJson: F([
      {key:'fournisseur_uplink',label:"Fournisseur du service uplink",type:'text',required:true},
      {key:'client',label:"Client émetteur",type:'text',required:true},
      {key:'teleport',label:"Téléport d'émission",type:'text',required:true},
      {key:'satellite',label:"Satellite cible",type:'text',required:true},
      {key:'bande_passante',label:"Bande passante allouée (MHz)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE LIAISON MONTANTE (UPLINK) SATELLITE</h1>
<p><strong>{{fournisseur_uplink}}</strong> fournit à <strong>{{client}}</strong> un service de liaison montante depuis le téléport <strong>{{teleport}}</strong> vers le satellite <strong>{{satellite}}</strong> avec <strong>{{bande_passante}}</strong> MHz alloués.</p>
<h2>Entrée en vigueur</h2><p><strong>{{date_debut}}</strong></p></div>`
  },
  {
    code: 'sat_teleport',
    name: "Accord de service de téléport",
    category: 'commercial_financier',
    price: 12000, priceMax: 38000,
    description: "Convention d'accès et d'exploitation d'un téléport (station terrestre satellite) pour opérateurs et fournisseurs de services télécom en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'gestionnaire_teleport',label:"Gestionnaire du téléport",type:'text',required:true},
      {key:'client',label:"Opérateur client",type:'text',required:true},
      {key:'localisation',label:"Localisation du téléport",type:'text',required:true},
      {key:'services',label:"Services fournis (uplink, downlink, colocation antenne…)",type:'textarea',required:true},
      {key:'duree',label:"Durée de la convention (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TÉLÉPORT</h1>
<p><strong>{{gestionnaire_teleport}}</strong> accorde à <strong>{{client}}</strong> l'accès au téléport de <strong>{{localisation}}</strong> pour les services suivants :</p>
<h2>Services</h2><p>{{services}}</p>
<h2>Durée</h2><p><strong>{{duree}}</strong> ans.</p>
<h2>Autorisation</h2><p>Exploitation soumise à l'autorisation de l'ARTCI et à la coordination UIT des fréquences.</p></div>`
  },
  {
    code: 'sat_imagerie_securite',
    name: "Accord de service d'imagerie de sécurité (surveillance territoriale)",
    category: 'commercial_financier',
    price: 16000, priceMax: 50000,
    description: "Contrat de fourniture d'images satellite haute résolution pour la surveillance territoriale, le contrôle des frontières et la sécurité nationale en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur d'imagerie sécurisée",type:'text',required:true},
      {key:'autorite',label:"Autorité gouvernementale bénéficiaire",type:'text',required:true},
      {key:'zones_surveillance',label:"Zones de surveillance prioritaires",type:'textarea',required:true},
      {key:'resolution',label:"Résolution des images (m)",type:'text',required:true},
      {key:'frequence',label:"Fréquence de revisite satellite",type:'text',required:true},
      {key:'duree',label:"Durée du contrat (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'IMAGERIE DE SÉCURITÉ SATELLITE</h1>
<p>CONFIDENTIEL — <strong>{{fournisseur}}</strong> fournit à <strong>{{autorite}}</strong> des images satellite à <strong>{{resolution}}</strong> m de résolution avec une fréquence de revisite <strong>{{frequence}}</strong>.</p>
<h2>Zones de surveillance</h2><p>{{zones_surveillance}}</p>
<h2>Durée</h2><p><strong>{{duree}}</strong> ans — Accord classifié et soumis aux dispositions du secret défense.</p></div>`
  },
  {
    code: 'sat_ais_maritime',
    name: "Accord de service d'AIS maritime par satellite",
    category: 'commercial_financier',
    price: 8000, priceMax: 24000,
    description: "Contrat de service de détection AIS (Automatic Identification System) par satellite pour la surveillance du trafic maritime dans les eaux ivoiriennes et le Golfe de Guinée.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 67,
    fieldsJson: F([
      {key:'fournisseur_ais',label:"Fournisseur de service AIS satellite",type:'text',required:true},
      {key:'autorite_maritime',label:"Autorité maritime bénéficiaire",type:'text',required:true},
      {key:'zone_couverte',label:"Zone maritime couverte",type:'text',required:true},
      {key:'nombre_navires',label:"Capacité de suivi simultané (navires)",type:'text',required:true},
      {key:'duree',label:"Durée du contrat (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE AIS MARITIME PAR SATELLITE</h1>
<p><strong>{{fournisseur_ais}}</strong> fournit à <strong>{{autorite_maritime}}</strong> un service de détection AIS satellite couvrant <strong>{{zone_couverte}}</strong> pour le suivi de <strong>{{nombre_navires}}</strong> navires simultanément.</p>
<h2>Durée</h2><p><strong>{{duree}}</strong> ans.</p>
<h2>Conformité</h2><p>Conforme aux conventions SOLAS de l'OMI et à la réglementation maritime ivoirienne.</p></div>`
  },
  {
    code: 'sat_suivi_flotte',
    name: "Accord de service de suivi de flotte par satellite",
    category: 'commercial_financier',
    price: 5000, priceMax: 16000,
    description: "Contrat de service de géolocalisation et suivi de flotte de véhicules, engins ou navires par satellite pour entreprises de transport en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 80,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur de service de suivi",type:'text',required:true},
      {key:'client',label:"Entreprise de transport cliente",type:'text',required:true},
      {key:'nombre_vehicules',label:"Nombre de véhicules / engins suivis",type:'text',required:true},
      {key:'technologie',label:"Technologie de suivi (GPS/GNSS, satellite LEO…)",type:'text',required:true},
      {key:'fonctionnalites',label:"Fonctionnalités souscrites",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE SUIVI DE FLOTTE PAR SATELLITE</h1>
<p><strong>{{fournisseur}}</strong> assure le suivi satellite de <strong>{{nombre_vehicules}}</strong> véhicules de <strong>{{client}}</strong> via technologie <strong>{{technologie}}</strong>.</p>
<h2>Fonctionnalités</h2><p>{{fonctionnalites}}</p>
<h2>Données</h2><p>Les données de localisation sont conservées 12 mois conformément à la réglementation ivoirienne sur la protection des données.</p></div>`
  },
  {
    code: 'sat_agriculture_precision',
    name: "Accord de service d'agriculture de précision satellite",
    category: 'commercial_financier',
    price: 7000, priceMax: 22000,
    description: "Contrat de service d'agriculture de précision basé sur des données satellite (NDVI, humidité des sols, cartographie parcellaire) pour coopératives agricoles et agro-industries ivoiriennes.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 74,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur de services agro-satellites",type:'text',required:true},
      {key:'client',label:"Coopérative ou agro-industrie cliente",type:'text',required:true},
      {key:'superficie',label:"Superficie agricole couverte (ha)",type:'text',required:true},
      {key:'cultures',label:"Types de cultures concernées",type:'text',required:true},
      {key:'services_fournis',label:"Services fournis (NDVI, alertes, cartographie…)",type:'textarea',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'AGRICULTURE DE PRÉCISION SATELLITE</h1>
<p><strong>{{fournisseur}}</strong> fournit des services d'agriculture de précision à <strong>{{client}}</strong> pour <strong>{{superficie}}</strong> ha de cultures (<strong>{{cultures}}</strong>) à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Services</h2><p>{{services_fournis}}</p>
<h2>Partenariat</h2><p>Ce service s'inscrit dans le cadre du Plan National de Développement Agricole de Côte d'Ivoire.</p></div>`
  },
  {
    code: 'sat_exploration_geologique',
    name: "Accord de service d'exploration géologique satellite",
    category: 'commercial_financier',
    price: 12000, priceMax: 40000,
    description: "Contrat de service d'exploration minière et géologique utilisant des données satellite (hyperspectral, radar) pour la cartographie des ressources naturelles en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 66,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur de données géologiques satellite",type:'text',required:true},
      {key:'client',label:"Société minière cliente",type:'text',required:true},
      {key:'zone_exploration',label:"Zone d'exploration",type:'text',required:true},
      {key:'type_donnees',label:"Type de données satellite (hyperspectral, SAR, LiDAR…)",type:'text',required:true},
      {key:'objectif',label:"Objectif géologique (minerais, hydrocarbures, eaux…)",type:'text',required:true},
      {key:'duree',label:"Durée de la mission (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'EXPLORATION GÉOLOGIQUE SATELLITE</h1>
<p><strong>{{fournisseur}}</strong> réalise une exploration géologique par satellite (<strong>{{type_donnees}}</strong>) pour <strong>{{client}}</strong> sur la zone <strong>{{zone_exploration}}</strong> pendant <strong>{{duree}}</strong> mois.</p>
<h2>Objectif</h2><p>{{objectif}}</p>
<h2>Conformité</h2><p>Les activités sont menées en conformité avec le Code Minier ivoirien et les autorisations du Ministère des Mines.</p></div>`
  },
  {
    code: 'sat_internet_rural',
    name: "Accord de service de couverture internet rural par satellite (Starlink modèle)",
    category: 'commercial_financier',
    price: 9000, priceMax: 28000,
    description: "Contrat de déploiement d'internet rural par satellite à orbite basse (LEO) pour la connexion des zones non desservies en Côte d'Ivoire, sur le modèle des constellations LEO.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 82,
    fieldsJson: F([
      {key:'operateur_satellite',label:"Opérateur satellite LEO",type:'text',required:true},
      {key:'partenaire_local',label:"Partenaire de distribution local",type:'text',required:true},
      {key:'zones_rurales',label:"Zones rurales à couvrir",type:'textarea',required:true},
      {key:'nombre_terminaux',label:"Nombre de terminaux déployés",type:'text',required:true},
      {key:'debit',label:"Débit moyen par terminal (Mbps)",type:'text',required:true},
      {key:'date_lancement',label:"Date de lancement commercial",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE D'INTERNET RURAL PAR SATELLITE (LEO)</h1>
<p><strong>{{operateur_satellite}}</strong> et son partenaire local <strong>{{partenaire_local}}</strong> déploient <strong>{{nombre_terminaux}}</strong> terminaux satellite dans les zones rurales suivantes :</p>
<h2>Zones</h2><p>{{zones_rurales}}</p>
<h2>Performances</h2><p>Débit moyen : <strong>{{debit}}</strong> Mbps — Lancement commercial : <strong>{{date_lancement}}</strong>.</p>
<h2>Conformité ARTCI</h2><p>Accord soumis à l'homologation des terminaux et à l'autorisation de l'ARTCI.</p></div>`
  },
  {
    code: 'sat_nanosatellite',
    name: "Accord de service de déploiement nanosatellite (CubeSat)",
    category: 'commercial_financier',
    price: 18000, priceMax: 55000,
    description: "Contrat de développement, lancement et opération d'un nanosatellite (CubeSat) pour une institution ivoirienne ou africaine à des fins scientifiques, éducatives ou commerciales.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 70,
    fieldsJson: F([
      {key:'client_institutionnel',label:"Institution cliente (université, agence, entreprise)",type:'text',required:true},
      {key:'constructeur',label:"Constructeur du CubeSat",type:'text',required:true},
      {key:'mission',label:"Mission principale du satellite",type:'text',required:true},
      {key:'format',label:"Format CubeSat (1U, 3U, 6U…)",type:'text',required:true},
      {key:'lanceur',label:"Lanceur spatial prévu (Ariane, Vega, Falcon…)",type:'text',required:true},
      {key:'date_lancement_prevu',label:"Date de lancement prévue",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE DÉPLOIEMENT NANOSATELLITE (CUBESAT)</h1>
<p><strong>{{constructeur}}</strong> développe et lance un CubeSat format <strong>{{format}}</strong> pour <strong>{{client_institutionnel}}</strong> via le lanceur <strong>{{lanceur}}</strong>.</p>
<h2>Mission</h2><p>{{mission}}</p>
<h2>Date de lancement</h2><p><strong>{{date_lancement_prevu}}</strong></p>
<h2>Enregistrement</h2><p>Le satellite sera enregistré auprès de l'UIT et du Registre des objets spatiaux conformément à la Convention de 1975.</p></div>`
  },
  {
    code: 'sat_transfert_donnees',
    name: "Accord de service de transfert de données satellite sécurisé",
    category: 'commercial_financier',
    price: 9000, priceMax: 28000,
    description: "Contrat de service de transfert de données sécurisé par satellite pour organisations critiques (banques, administrations, défense) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 68,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur de service satellite sécurisé",type:'text',required:true},
      {key:'client',label:"Organisation cliente",type:'text',required:true},
      {key:'niveau_securite',label:"Niveau de sécurité (chiffrement, authentification)",type:'text',required:true},
      {key:'volume_donnees',label:"Volume de données transférées (Go/mois)",type:'text',required:true},
      {key:'duree',label:"Durée du contrat (mois)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE TRANSFERT DE DONNÉES SATELLITE SÉCURISÉ</h1>
<p><strong>{{fournisseur}}</strong> assure le transfert sécurisé de données (<strong>{{niveau_securite}}</strong>) par satellite pour <strong>{{client}}</strong>, volume : <strong>{{volume_donnees}}</strong> Go/mois sur <strong>{{duree}}</strong> mois.</p>
<h2>Sécurité</h2><p>Chiffrement de bout en bout, authentification à deux facteurs et journalisation des accès.</p></div>`
  },
  {
    code: 'sat_continuite_service',
    name: "Accord de service de continuité de service satellite (backup)",
    category: 'commercial_financier',
    price: 8000, priceMax: 25000,
    description: "Contrat de service satellite de secours (backup) pour garantir la continuité des communications en cas de défaillance des réseaux terrestres principaux.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'fournisseur',label:"Fournisseur de backup satellite",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'reseau_principal',label:"Réseau principal concerné",type:'text',required:true},
      {key:'rto',label:"Objectif de temps de reprise (RTO en minutes)",type:'text',required:true},
      {key:'bande_passante_backup',label:"Bande passante de secours (Mbps)",type:'text',required:true},
      {key:'duree',label:"Durée du contrat (ans)",type:'text',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE SERVICE DE CONTINUITÉ SATELLITE (BACKUP)</h1>
<p><strong>{{fournisseur}}</strong> fournit à <strong>{{client}}</strong> un service de backup satellite pour le réseau <strong>{{reseau_principal}}</strong> avec un RTO de <strong>{{rto}}</strong> minutes et une bande passante de secours de <strong>{{bande_passante_backup}}</strong> Mbps.</p>
<h2>Durée</h2><p><strong>{{duree}}</strong> ans.</p>
<h2>Basculement</h2><p>Le basculement automatique est déclenché en cas d'indisponibilité du lien principal pendant plus de 5 minutes.</p></div>`
  },
  {
    code: 'sat_partenariat_gouvernement',
    name: "Accord de partenariat opérateur satellite-gouvernement (ANADER/SODEXAM)",
    category: 'commercial_financier',
    price: 12000, priceMax: 38000,
    description: "Convention de partenariat entre un opérateur satellite et une agence gouvernementale ivoirienne (ANADER, SODEXAM, CIAPOL) pour l'intégration de données spatiales dans les politiques publiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 69,
    fieldsJson: F([
      {key:'operateur_satellite',label:"Opérateur satellite partenaire",type:'text',required:true},
      {key:'agence_gouvernementale',label:"Agence gouvernementale (ANADER, SODEXAM…)",type:'text',required:true},
      {key:'domaine_cooperation',label:"Domaine de coopération",type:'textarea',required:true},
      {key:'duree',label:"Durée du partenariat (ans)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT SATELLITE-GOUVERNEMENT</h1>
<p><strong>{{operateur_satellite}}</strong> et <strong>{{agence_gouvernementale}}</strong> concluent un partenariat stratégique pour <strong>{{duree}}</strong> ans à compter du <strong>{{date_signature}}</strong>.</p>
<h2>Domaine de coopération</h2><p>{{domaine_cooperation}}</p>
<h2>Engagements</h2><p>Partage de données, renforcement des capacités et co-développement d'applications au service des populations ivoiriennes.</p></div>`
  },
  {
    code: 'sat_formation_spatiale',
    name: "Accord de service de formation en technologies spatiales",
    category: 'commercial_financier',
    price: 6000, priceMax: 18000,
    description: "Convention de formation aux technologies spatiales (télédétection, GNSS, conception de satellites) pour ingénieurs et techniciens ivoiriens et africains.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 65,
    fieldsJson: F([
      {key:'organisme_formation',label:"Organisme de formation spatial",type:'text',required:true},
      {key:'institution',label:"Institution bénéficiaire",type:'text',required:true},
      {key:'modules',label:"Modules de formation (télédétection, GNSS, CubeSat…)",type:'textarea',required:true},
      {key:'nombre_participants',label:"Nombre de participants",type:'text',required:true},
      {key:'date_debut',label:"Date de début de la formation",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE FORMATION EN TECHNOLOGIES SPATIALES</h1>
<p><strong>{{organisme_formation}}</strong> dispense une formation spatiale à <strong>{{nombre_participants}}</strong> participants de <strong>{{institution}}</strong> à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Modules</h2><p>{{modules}}</p>
<h2>Certification</h2><p>Les participants reçoivent un certificat reconnu par l'ASUPMA (Agence Spatiale Africaine) à l'issue du programme.</p></div>`
  },
  {
    code: 'sat_conseil_strategie_spatiale',
    name: "Accord de service de conseil en stratégie spatiale (ASUPMA)",
    category: 'commercial_financier',
    price: 10000, priceMax: 32000,
    description: "Contrat de conseil en stratégie et politique spatiale pour gouvernements et organisations africaines, en lien avec les objectifs de l'Agence Spatiale Africaine.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 63,
    fieldsJson: F([
      {key:'cabinet_conseil',label:"Cabinet de conseil spatial",type:'text',required:true},
      {key:'client',label:"Gouvernement ou organisation cliente",type:'text',required:true},
      {key:'mission',label:"Mission de conseil (stratégie nationale spatiale, réglementation, etc.)",type:'textarea',required:true},
      {key:'duree_mission',label:"Durée de la mission (mois)",type:'text',required:true},
      {key:'date_debut',label:"Date de début",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE CONSEIL EN STRATÉGIE SPATIALE</h1>
<p><strong>{{cabinet_conseil}}</strong> accompagne <strong>{{client}}</strong> dans sa mission de conseil spatial pendant <strong>{{duree_mission}}</strong> mois à compter du <strong>{{date_debut}}</strong>.</p>
<h2>Mission</h2><p>{{mission}}</p>
<h2>Références</h2><p>Travaux alignés sur l'Agenda 2063 de l'Union Africaine et la Politique Spatiale Africaine adoptée en 2016.</p></div>`
  },
  {
    code: 'sat_rapport_performance',
    name: "Rapport de performance réseau satellite",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Rapport périodique de performance du réseau satellite (disponibilité, latence, débit, taux d'erreur) pour opérateurs et clients en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 60,
    fieldsJson: F([
      {key:'operateur',label:"Opérateur satellite",type:'text',required:true},
      {key:'client',label:"Client",type:'text',required:true},
      {key:'periode',label:"Période du rapport",type:'text',required:true},
      {key:'disponibilite',label:"Disponibilité du service (%)",type:'text',required:true},
      {key:'latence_moyenne',label:"Latence moyenne (ms)",type:'text',required:true},
      {key:'observations',label:"Observations et recommandations",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>RAPPORT DE PERFORMANCE RÉSEAU SATELLITE</h1>
<p>Opérateur : <strong>{{operateur}}</strong> — Client : <strong>{{client}}</strong> — Période : <strong>{{periode}}</strong></p>
<h2>KPI</h2>
<p>Disponibilité : <strong>{{disponibilite}}</strong>% | Latence moyenne : <strong>{{latence_moyenne}}</strong> ms</p>
<h2>Observations</h2><p>{{observations}}</p></div>`
  },
  {
    code: 'sat_plan_infra_spatiales',
    name: "Plan de développement des infrastructures spatiales",
    category: 'commercial_financier',
    price: 12000, priceMax: 38000,
    description: "Document de planification stratégique pour le développement des infrastructures spatiales nationales (téléports, stations de contrôle, centres de données) en Côte d'Ivoire.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 65,
    fieldsJson: F([
      {key:'autorite',label:"Autorité ou ministère rédacteur",type:'text',required:true},
      {key:'horizon_planification',label:"Horizon de planification (année)",type:'text',required:true},
      {key:'infrastructures_prevues',label:"Infrastructures prévues",type:'textarea',required:true},
      {key:'budget_estime',label:"Budget estimé (FCFA)",type:'text',required:true},
      {key:'date_adoption',label:"Date d'adoption du plan",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>PLAN DE DÉVELOPPEMENT DES INFRASTRUCTURES SPATIALES</h1>
<p>Rédigé par <strong>{{autorite}}</strong> — Horizon : <strong>{{horizon_planification}}</strong> — Adopté le <strong>{{date_adoption}}</strong></p>
<h2>Infrastructures prévues</h2><p>{{infrastructures_prevues}}</p>
<h2>Budget</h2><p><strong>{{budget_estime}}</strong> FCFA</p>
<h2>Cadre stratégique</h2><p>Ce plan s'inscrit dans la Stratégie Nationale de l'Économie Numérique et la Vision Côte d'Ivoire 2030.</p></div>`
  },
  {
    code: 'sat_gestion_frequences',
    name: "Accord de service de gestion de fréquences radioélectriques (ARTCI)",
    category: 'commercial_financier',
    price: 8000, priceMax: 25000,
    description: "Convention de coordination et d'attribution de fréquences radioélectriques pour services satellite en Côte d'Ivoire, gérée par l'ARTCI conformément au Règlement des Radiocommunications de l'UIT.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 61,
    fieldsJson: F([
      {key:'demandeur',label:"Opérateur demandeur",type:'text',required:true},
      {key:'bandes_frequences',label:"Bandes de fréquences demandées",type:'text',required:true},
      {key:'usage_prevu',label:"Usage prévu des fréquences",type:'text',required:true},
      {key:'service_satellite',label:"Service satellite concerné (FSS, BSS, MSS…)",type:'text',required:true},
      {key:'date_demande',label:"Date de dépôt de la demande",type:'date',required:true},
      {key:'observations',label:"Observations techniques",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>DEMANDE DE GESTION DE FRÉQUENCES RADIOÉLECTRIQUES — ARTCI</h1>
<p><strong>{{demandeur}}</strong> sollicite auprès de l'ARTCI l'attribution des fréquences <strong>{{bandes_frequences}}</strong> pour le service <strong>{{service_satellite}}</strong> (usage : <strong>{{usage_prevu}}</strong>).</p>
<h2>Date de dépôt</h2><p><strong>{{date_demande}}</strong></p>
<h2>Observations techniques</h2><p>{{observations}}</p>
<h2>Cadre réglementaire</h2><p>Traitement conforme au Règlement des Radiocommunications de l'UIT et à la loi ivoirienne n°2012-293.</p></div>`
  },
  {
    code: 'sat_partenariat_asa',
    name: "Accord de partenariat Agence Spatiale Africaine (ASA)",
    category: 'commercial_financier',
    price: 14000, priceMax: 45000,
    description: "Convention de partenariat entre la Côte d'Ivoire (ou une organisation ivoirienne) et l'Agence Spatiale Africaine pour la coopération spatiale, le renforcement des capacités et les missions scientifiques.",
    templateType: 'pdf', classe: 'A', active: true, popularity: 67,
    fieldsJson: F([
      {key:'partie_ivoirienne',label:"Partie ivoirienne (État, institution, entreprise)",type:'text',required:true},
      {key:'asa',label:"Représentant de l'Agence Spatiale Africaine",type:'text',required:true},
      {key:'axes_cooperation',label:"Axes de coopération",type:'textarea',required:true},
      {key:'duree',label:"Durée du partenariat (ans)",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true}
    ]),
    body: `<div class="doc"><h1>ACCORD DE PARTENARIAT — AGENCE SPATIALE AFRICAINE (ASA)</h1>
<p>La <strong>{{partie_ivoirienne}}</strong> et <strong>{{asa}}</strong> concluent un accord de partenariat spatial pour <strong>{{duree}}</strong> ans, signé le <strong>{{date_signature}}</strong>.</p>
<h2>Axes de coopération</h2><p>{{axes_cooperation}}</p>
<h2>Fondements</h2><p>Accord conforme au Traité de l'Union Africaine sur l'espace et à la Politique Spatiale Africaine 2016-2025.</p></div>`
  },
  {
    code: 'sat_charte_espace_pacifique',
    name: "Charte de l'usage pacifique de l'espace par l'Afrique",
    category: 'commercial_financier',
    price: 5000, priceMax: 15000,
    description: "Charte d'adhésion d'une organisation ou d'un État africain aux principes de l'utilisation pacifique, équitable et durable de l'espace extra-atmosphérique.",
    templateType: 'pdf', classe: 'B', active: true, popularity: 58,
    fieldsJson: F([
      {key:'signataire',label:"Organisation ou État signataire",type:'text',required:true},
      {key:'representant',label:"Représentant habilité",type:'text',required:true},
      {key:'date_signature',label:"Date de signature",type:'date',required:true},
      {key:'engagements_specifiques',label:"Engagements spécifiques de l'organisation",type:'textarea',required:false}
    ]),
    body: `<div class="doc"><h1>CHARTE DE L'USAGE PACIFIQUE DE L'ESPACE PAR L'AFRIQUE</h1>
<p><strong>{{signataire}}</strong>, représenté par <strong>{{representant}}</strong>, adhère ce <strong>{{date_signature}}</strong> aux principes suivants :</p>
<h2>Principes fondamentaux</h2>
<p>1. L'espace extra-atmosphérique est patrimoine commun de l'humanité.<br/>
2. L'exploration et l'utilisation de l'espace sont conduites au bénéfice de tous les peuples.<br/>
3. L'Afrique promeut la coopération spatiale internationale équitable.<br/>
4. Les technologies spatiales sont mises au service du développement durable.<br/>
5. L'usage militaire agressif de l'espace est prohibé.</p>
<h2>Engagements spécifiques</h2><p>{{engagements_specifiques}}</p>
<h2>Fondements</h2><p>Charte alignée sur le Traité de l'espace de 1967, la Déclaration de l'ONU sur l'espace de 1963 et l'Agenda 2063 de l'Union Africaine.</p></div>`
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
  console.log(`Batch 80a OK — créés:${created} maj:${updated} TOTAL:${total}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
